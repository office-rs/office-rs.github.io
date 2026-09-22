# office-rs.github.io

Organization landing page for [office-rs](https://github.com/office-rs) — a VitePress static site hosting documentation and demo entry points for the [rword](https://github.com/office-rs/rword) and [rofd](https://github.com/office-rs/rofd) Rust office-component libraries.

## Live site

**👉 [https://office-rs.github.io/](https://office-rs.github.io/)**

- [rword docs](https://office-rs.github.io/rword/intro) — OOXML (.docx) editor library
- [rword live demo](https://office-rs.github.io/rword/) — hosted from rword's release-built `web-app/dist` artifact, pulled cross-repo by CI
- [rofd docs](https://office-rs.github.io/rofd/intro) — OFD viewer + annotation library
- [rofd live demo](https://office-rs.github.io/rofd/) — hosted separately by the rofd repository

## What's in this repo

- `docs/` — VitePress source (Markdown pages, shared snippets, landing page)
- `.github/workflows/deploy.yml` — builds VitePress, pulls rword's web-app dist artifact cross-repo via a fine-grained PAT (`RWORD_REPO_TOKEN`), and deploys the merged output to GitHub Pages
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — design and implementation notes

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:5173/
```

The `/rword/` demo path is empty locally — that directory is populated by CI from rword's release artifact, not by the VitePress build.

## License

Apache License 2.0. See [LICENSE](LICENSE) for details.
