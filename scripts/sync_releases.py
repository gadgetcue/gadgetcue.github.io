#!/usr/bin/env python3
"""Sync the latest GitHub release installers of each app repo into this website.

Run by .github/workflows/sync-installers.yml (needs env GH_TOKEN = APP_REPOS_TOKEN
with read access to the app repos). Safe to run locally too.

For every app in scripts/apps.json it:
  1. reads the latest non-draft, non-prerelease release,
  2. for host=downloads: downloads the matching assets into downloads/ and deletes
     older versions of the same file,
  3. rewrites file names (and version/size text) in the HTML/JS files,
  4. writes versions.json (version, file names, byte sizes, release date),
  5. rewrites the <!--CHANGELOG--> block of pages with "changelog": true from release notes,
  6. bumps the ?v= cache tag when anything changed.
Assets over MAX_BYTES are skipped (GitHub's file limit is 100 MB) and reported.
"""
import json, os, re, sys, glob, html, datetime, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKEN = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN") or ""
MAX_BYTES = 95 * 1024 * 1024
API = "https://api.github.com"

def api(path, accept="application/vnd.github+json", raw=False):
    req = urllib.request.Request(path if path.startswith("http") else API + path)
    req.add_header("Accept", accept)
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if TOKEN:
        req.add_header("Authorization", "Bearer " + TOKEN)
    with urllib.request.urlopen(req, timeout=300) as r:
        return r.read() if raw else json.load(r)

def latest_release(repo):
    try:
        for rel in api(f"/repos/{repo}/releases?per_page=10"):
            if not rel["draft"] and not rel["prerelease"]:
                return rel
    except urllib.error.HTTPError as e:
        print(f"::warning::{repo}: cannot read releases (HTTP {e.code}). Token missing or no access?")
    return None


def md_inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
    return re.sub(r"(?<![\w*])\*([^*]+)\*(?![\w*])", r"<i>\1</i>", t)

# Install/download boilerplate in release bodies is not a changelog; skip it.
SKIP_SECTION = re.compile(r"^(downloads?|install(ation)?)\b", re.I)
SKIP_LINE = re.compile(r"sha-?256|^\*{0,2}download|^latest build|^silent install|smartscreen|windows protected your pc|^full history|^see the \[|^install guide|code-signed|^!\[|^\||^-{3,}$|no signing keys", re.I)

def md_block(body):
    """Tiny markdown -> HTML for GitHub release notes (headings, bullets, paragraphs)."""
    lines = []
    for raw in (body or "").replace("\ufeff", "").replace("\r", "").split("\n"):
        if raw[:1] in " \t" and raw.strip() and lines and lines[-1].strip():
            lines[-1] += " " + raw.strip()  # wrapped continuation of a bullet or paragraph
        else:
            lines.append(raw.rstrip())
    out, in_ul, skip = [], False, False
    for line in lines:
        h = re.match(r"^(#{1,6})\s+(.*)$", line)
        if h:
            if in_ul: out.append("</ul>"); in_ul = False
            skip = bool(SKIP_SECTION.match(h.group(2).strip()))
            if len(h.group(1)) > 2 and not skip:
                out.append("<h4>" + md_inline(h.group(2)) + "</h4>")
            continue
        if skip: continue
        m = re.match(r"^\s*[-*]\s+(.*)$", line)
        if m:
            if not in_ul: out.append("<ul>"); in_ul = True
            out.append("<li>" + md_inline(m.group(1)) + "</li>"); continue
        if in_ul: out.append("</ul>"); in_ul = False
        if line.strip() and not SKIP_LINE.search(line.strip()):
            out.append("<p>" + md_inline(line) + "</p>")
    if in_ul: out.append("</ul>")
    return "".join(out)

def cl_div(rel):
    b = md_block(rel.get("body"))
    return f'<div class="cl">{b}</div>' if b else ""

def insert_changelog(s, block):
    """Place the changelog before the FAQ (or the closing CTA) when the page has no marker yet."""
    for anchor in ('<section class="ap-sec" id="faq">', '<section class="ap-end">'):
        if anchor in s:
            return s.replace(anchor, block + anchor, 1)
    return s

def changelog_html(repo, rels, app_name):
    items = []
    for i, rel in enumerate(rels):
        ver = rel["tag_name"].lstrip("vV")
        d = datetime.datetime.strptime(rel["published_at"], "%Y-%m-%dT%H:%M:%SZ")
        date = f"{d.strftime('%b')} {d.day}, {d.year}"
        items.append(f'<details{" open" if i == 0 else ""}><summary>Version {html.escape(ver)} \u00b7 {date}</summary>{cl_div(rel)}</details>')
    return '<section class="ap-sec" id="changelog"><div class="w"><div class="ap-h"><h2>What\'s new</h2><p>Release notes for ' + html.escape(app_name) + '.</p></div><div class="faq ap-faq">' + "".join(items) + '</div></div></section>'

def recent_releases(repo, n=None):
    try:
        return [r for r in api(f"/repos/{repo}/releases?per_page=100") if not r["draft"] and not r["prerelease"]][:n]
    except urllib.error.HTTPError:
        return []

def site_files():
    out = []
    for ext in ("html", "js"):
        out += glob.glob(os.path.join(ROOT, f"*.{ext}"))
    return out

def read(p):
    with open(p, encoding="utf-8") as f: return f.read()
def write(p, s):
    with open(p, "w", encoding="utf-8", newline="") as f: f.write(s)

def mb(n): return f"{n/1048576:.1f}"

def main():
    cfg = json.load(open(os.path.join(ROOT, "scripts", "apps.json")))
    vpath = os.path.join(ROOT, "versions.json")
    old = json.load(open(vpath)) if os.path.exists(vpath) else {}
    new = {}
    changed, notes = [], []
    os.makedirs(os.path.join(ROOT, "downloads"), exist_ok=True)

    for app in cfg["apps"]:
        slug, repo = app["slug"], app["repo"]
        prev = old.get(slug, {})
        rel = latest_release(repo)
        if not rel:
            new[slug] = prev; continue
        ver = rel["tag_name"].lstrip("vV")
        entry = {"repo": repo, "version": ver, "tag": rel["tag_name"],
                 "released": rel["published_at"], "files": {}}
        page = os.path.join(ROOT, app["page"])
        for pat in app["files"]:
            rx = re.compile(pat)
            asset = next((a for a in rel["assets"] if rx.search(a["name"])), None)
            if not asset:
                notes.append(f"{slug}: no asset matching {pat} in {rel['tag_name']}")
                if prev.get("files"):
                    entry["files"].update({k: v for k, v in prev["files"].items() if rx.search(k)})
                continue
            name, size = asset["name"], asset["size"]
            entry["files"][name] = size
            old_names = [k for k in prev.get("files", {}) if rx.search(k)]
            # also catch files already present in downloads/ (first run)
            local = [os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "downloads", "*")) if rx.search(os.path.basename(p))]
            old_names = sorted(set(old_names + local) - {name})
            dest = os.path.join(ROOT, "downloads", name)
            if app["host"] == "downloads":
                if size > MAX_BYTES:
                    notes.append(f"{slug}: {name} is {mb(size)} MB, over the 95 MB limit, NOT committed")
                    entry["files"].pop(name, None)
                    continue
                if not (os.path.exists(dest) and os.path.getsize(dest) == size):
                    print(f"downloading {repo} {name} ({mb(size)} MB)")
                    data = api(f"/repos/{repo}/releases/assets/{asset['id']}", accept="application/octet-stream", raw=True)
                    if len(data) != size:
                        notes.append(f"{slug}: {name} size mismatch, skipped"); continue
                    write_bin = open(dest, "wb"); write_bin.write(data); write_bin.close()
                    changed.append(f"{slug}: {name}")
                for o in old_names:
                    p = os.path.join(ROOT, "downloads", o)
                    if os.path.exists(p):
                        os.remove(p); changed.append(f"{slug}: removed {o}")
            else:
                if name not in prev.get("files", {}) and old_names:
                    changed.append(f"{slug}: {name}")
            # rewrite file names in pages
            for o in old_names:
                for fp in site_files():
                    s = read(fp)
                    if o in s:
                        write(fp, s.replace(o, name)); changed.append(f"{slug}: link {o} -> {name}")
        # version / size text on the app page
        pv = prev.get("version")
        if app.get("update_text") and pv and pv != ver and os.path.exists(page):
            s = read(page)
            s2 = s.replace(f"Version {pv}", f"Version {ver}").replace(f"<dt>Version</dt><dd>{pv}</dd>", f"<dt>Version</dt><dd>{ver}</dd>")
            if s2 != s:
                write(page, s2); changed.append(f"{slug}: version {pv} -> {ver}")
        main_size = max(entry["files"].values(), default=0)
        if app.get("update_text") and main_size and os.path.exists(page):
            s = read(page)
            s2 = re.sub(r"(<dt>Size</dt><dd>About )[0-9.]+( MB</dd>)", lambda m: f"{m.group(1)}{mb(main_size)}{m.group(2)}", s)
            if s2 != s: write(page, s2); changed.append(f"{slug}: size text")
        new[slug] = entry
        if app.get("changelog") and os.path.exists(page):
            s = read(page)
            block = "<!--CHANGELOG-->" + changelog_html(repo, recent_releases(repo), app.get("name", slug)) + "<!--/CHANGELOG-->"
            if "<!--CHANGELOG-->" in s:
                s2 = re.sub(r"<!--CHANGELOG-->.*?<!--/CHANGELOG-->", lambda m: block, s, flags=re.S)
            else:
                s2 = insert_changelog(s, block)
            if s2 != s: write(page, s2); changed.append(f"{slug}: changelog")
        if pv and pv != ver: changed.append(f"{slug}: {pv} -> {ver}")

    out = json.dumps(new, indent=2, sort_keys=True) + "\n"
    if not os.path.exists(vpath) or read(vpath) != out:
        write(vpath, out)
        if os.path.exists(vpath) and old != new: changed.append("versions.json")
    real = [c for c in changed if c != "versions.json"]
    if real:  # bump cache tag
        pages = site_files()
        tags = [int(t) for fp in pages for t in re.findall(r"\?v=(\d{8,})", read(fp))]
        if tags:
            nv = str(max(tags) + 1)
            for fp in pages:
                s = read(fp); s2 = re.sub(r"\?v=\d{8,}", "?v=" + nv, s)
                if s2 != s: write(fp, s2)
    summary = "\n".join(sorted(set(changed))) or "No changes."
    if notes: summary += "\n\nNotes:\n" + "\n".join(notes)
    print(summary)
    ghs = os.environ.get("GITHUB_STEP_SUMMARY")
    if ghs: open(ghs, "a").write("### Installer sync\n```\n" + summary + "\n```\n")
    gho = os.environ.get("GITHUB_OUTPUT")
    if gho: open(gho, "a").write(f"changed={'true' if real or 'versions.json' in changed else 'false'}\n")

if __name__ == "__main__":
    main()
