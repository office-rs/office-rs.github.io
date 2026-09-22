# office-rs.github.io

[office-rs](https://github.com/office-rs) 组织落地页——一个 VitePress 静态站点，托管 [rword](https://github.com/office-rs/rword) 与 [rofd](https://github.com/office-rs/rofd) 两个 Rust office 组件库的文档与 Demo 入口。

## 线上站点

**👉 [https://office-rs.github.io/](https://office-rs.github.io/)**

- [rword 文档](https://office-rs.github.io/rword/intro) —— OOXML (.docx) 文档编辑库
- [rword 在线 Demo](https://office-rs.github.io/rword/) —— 由 rword release 构建的 `web-app/dist` 产物经 CI 跨仓拉取后托管
- [rofd 文档](https://office-rs.github.io/rofd/intro) —— OFD 视图 + 标注库
- [rofd 在线 Demo](https://office-rs.github.io/rofd/) —— 由 rofd 仓库独立部署

## 仓库内容

- `docs/` —— VitePress 源码（Markdown 页面、共享片段、落地页）
- `.github/workflows/deploy.yml` —— 构建 VitePress，通过 fine-grained PAT（`RWORD_REPO_TOKEN`）跨私有仓拉取 rword 的 web-app dist 产物，与 VitePress 输出合并后部署到 GitHub Pages
- `docs/superpowers/specs/` 与 `docs/superpowers/plans/` —— 设计与实施记录

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:5173/
```

本地访问 `/rword/` 路径会是 404——该目录由 CI 从 rword release 产物填入，VitePress 构建本身不生成。

## 开源协议

Apache License 2.0。详见 [LICENSE](LICENSE)。
