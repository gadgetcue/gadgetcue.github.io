# Connect gadgetcue.in (do this only when you want the site live)

GitHub Pages is OFF and the site is private. Nothing below happens until you do it.

## 1. DNS records (registrar > DNS zone, e.g. Hostinger)
Delete any default parking/redirect records for the root first.

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | gadgetcue.github.io |

(Check these IPs against GitHub's "Managing a custom domain" docs before using.)

## 2. Turn on GitHub Pages (when going live)
Repo gadgetcue/gadgetcue.github.io > Settings > Pages > Source: Deploy from branch `main` / root.
Custom domain: `gadgetcue.in` (the CNAME file is already in the repo). Tick "Enforce HTTPS" once the certificate is issued (can take up to an hour).
Note: Pages on a private repo needs a paid GitHub plan; a public repo is free.

## 3. Downloads
Each app page's Download button opens its GitHub Releases page:
- MacDock: github.com/gadgetcue/MacDock/releases/latest
- Gallery for Windows: github.com/gadgetcue/Gallery-Windows/releases/latest
- File Manager TV: github.com/gadgetcue/modern-file-manager-tv/releases/latest
For a one-click direct download, name the release file the same every time and link
`https://github.com/gadgetcue/<repo>/releases/latest/download/<file name>`.
