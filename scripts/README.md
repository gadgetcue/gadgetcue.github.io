# Installer sync

`sync_releases.py` + `.github/workflows/sync-installers.yml` keep `downloads/`, file names,
version text and `versions.json` in step with each app repo's latest GitHub release.
The app list lives in `apps.json`. Setup steps for the `APP_REPOS_TOKEN` secret are in the
pull request that added this.

Limits: installers over 95 MB are skipped (GitHub's 100 MB file limit); every new installer
adds its size to git history (Pages repo soft limit ~1 GB); the asset names must match the
patterns in `apps.json`.
