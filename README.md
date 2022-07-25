# Wiki

This repo implements a live tracking utility for software tasks. It uses emacs
org mode both for task management, and for rendering the status tracker, which
is available at [status.visinodaodev.com](https://status.visiondaodev.com).

## Development

Org files for this repo are available in the
[`content directory`](https://github.com/Vision-DAO/wiki/tree/main/content).
Edit these files however you wish. Changes are not reflected until published
until the corresponding HTML files are updated by running
`M-x org-publish-current-project`, and pushing to the master branch of this repo.
Builds are handled by Vercel's edge deployment platform. Users are authenticated
via a hard-coded list of "allowed" ethereum addresses in the
[`middleware.ts`](https://github.com/Vision-DAO/wiki/blob/main/middleware.ts)
file.
