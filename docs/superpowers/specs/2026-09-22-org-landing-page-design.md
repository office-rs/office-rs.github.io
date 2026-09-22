# office-rs.github.io 组织落地页设计

- 状态：待实施
- 创建日期：2026-09-22
- 仓库：[office-rs/office-rs.github.io](https://github.com/office-rs/office-rs.github.io)
- 部署目标：https://office-rs.github.io/

## 1. 项目背景与目标

`office-rs` 组织需要一处对外展示窗口，统一介绍旗下两个 Rust 文档处理库：

| 项目 | 性质 | 仓库可见性 | 现状 |
|---|---|---|---|
| **rword** | OOXML (.docx) 编辑器库（Rust + WASM/WebGPU） | 私有 | 已有 `crates/web-app`（Vite + Vue 3 SPA），原由 rword 仓库自身部署到 https://office-rs.github.io/rword/ |
| **rofd** | OFD (GB/T 33190) 视图+标注库（Rust + WASM） | 公开 | 已部署到 https://office-rs.github.io/rofd/，由 rofd 仓库独立维护 |

本仓库 `office-rs.github.io` 作为组织根仓库，部署在 https://office-rs.github.io/ 根路径，承担两个职责：

1. **组织落地页**：介绍 rword 与 rofd，提供简介、JS SDK 使用、xilem-view 使用文档
2. **rword 在线 Demo 宿主**：rword 仓库的 web-app 打包产物（`crates/web-app/dist`）通过 GitHub Actions artifact 跨仓流转，由本仓库 CI 拉取并托管在 `/rword/` 子路径

rofd 不做托管，仅在外链卡片跳转到 https://office-rs.github.io/rofd/。

## 2. 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 站点框架 | **VitePress 1.x** | Markdown 优先的文档生成器，原生支持代码块/侧边栏/全文搜索；Vue 团队官方，与 rword web-app 同源生态 |
| 包管理 | pnpm 9 | 安装快、磁盘占用小、与 monorepo 友好 |
| 内容格式 | Markdown + frontmatter | 每页一个 `.md`，便于非工程人员维护 |
| 代码高亮 | Shiki（VitePress 内置） | 原生支持 Rust/TS/JS |
| 搜索 | VitePress 内置本地搜索 | 无后端依赖 |
| 部署 | GitHub Actions → GitHub Pages | 标准方案 |
| Node 版本 | 22 LTS | 与 rword web-app 一致 |

## 3. 整体架构

```
                ┌─────────────────────────────────────────┐
                │  仓库 office-rs.github.io (本仓库, public) │
                │                                          │
                │  ┌──────────────────────────────────┐   │
                │  │ VitePress 源码 (docs/)            │   │
                │  │  - index.md (落地页)              │   │
                │  │  - rword/{intro,sdk,xilem-view}  │   │
                │  │  - rofd/{intro,sdk,xilem-view}   │   │
                │  └────────────┬─────────────────────┘   │
                │               │ pnpm build              │
                │               ▼                          │
                │  ┌──────────────────────────────────┐   │
                │  │ 产物 docs/.vitepress/dist/        │   │
                │  │  ├── index.html + assets/ (落地页)│   │
                │  │  └── rword/ ← rword web-app dist  │   │
                │  │                (CI 拉取后合并)    │   │
                │  └────────────┬─────────────────────┘   │
                └───────────────┼─────────────────────────┘
                                │ actions/upload-pages-artifact
                                ▼
                       GitHub Pages (https://office-rs.github.io/)
                                │
                                ├── /           ← VitePress 落地页
                                ├── /rword/*    ← 复用的 rword web-app
                                └── (rofd/ 由 rofd 仓库独立部署, 本仓库不涉及)
```

关键点：**rword 的 web-app dist 与 VitePress 产物合并为同一份 Pages artifact**，单一部署源，路径不冲突。rofd 完全独立，本仓库只在落地页放跳转链接。

## 4. 仓库目录结构

```
office-rs.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # 构建 VitePress + 拉取 rword dist + 部署
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts                # 站点配置: nav/sidebar/theme/search
│   │   └── theme/
│   │       └── index.ts             # 默认主题 + 必要 override
│   ├── public/                      # 静态资源 (logo, og 图等)
│   ├── index.md                     # 落地页 (双项目卡片 + 跳转)
│   ├── rword/
│   │   ├── intro.md                 # 简介
│   │   ├── sdk.md                   # JS SDK 使用 (含 @office-rs/rword 示例)
│   │   └── xilem-view.md            # xilem-view 使用 (含 Rust 嵌入示例)
│   ├── rofd/
│   │   ├── intro.md
│   │   ├── sdk.md
│   │   └── xilem-view.md
│   └── shared/                      # 跨项目复用片段 (如 CJK 字体说明、WebGPU 要求)
│       ├── webgpu-requirement.md
│       └── coep-coop-headers.md
├── package.json                     # vitepress 依赖
├── pnpm-lock.yaml
├── .gitignore
├── .nvmrc                            # pin Node LTS
└── README.md
```

## 5. 页面信息架构 (IA)

**Top nav**: `Home | Rword | rofd | GitHub`

**Sidebar 分组**:
- Rword
  - 简介 → `/rword/intro`
  - JS SDK → `/rword/sdk`
  - xilem-view → `/rword/xilem-view`
  - 在线 Demo（外链）→ `/rword/` 实际托管路径
- rofd
  - 简介 → `/rofd/intro`
  - JS SDK → `/rofd/sdk`
  - xilem-view → `/rofd/xilem-view`
  - 在线 Demo（外链）→ `https://office-rs.github.io/rofd/`

**落地页 (index.md) 内容骨架**:
1. Hero：组织 slogan + WebGPU 浏览器要求提示
2. Projects grid：两张卡片（rword / rofd），各含简介 + 「查看 Demo」+ 「查看文档」按钮
3. 特性对比：rword（编辑器）vs rofd（查看+标注）
4. Footer：组织 GitHub 链接、各项目仓库链接、License

## 6. 关键设计决策

1. **rword 在线 Demo 路径**：仍走 `/rword/`，但部署源从 rword 仓库迁移到本仓库（rword 仓库的 Pages 部署禁用）。落地页 `/rword/*` 文档与 demo `/rword/` 路径在同域名下，跳转自然
2. **rofd 不托管**：直接外链到 rofd 仓库已部署的 `https://office-rs.github.io/rofd/`，本仓库 `/rofd/` 仅放文档页
3. **共享片段提取**：WebGPU 要求、COEP/COOP 头说明在两个项目都用到，抽到 `shared/` 通过 VitePress includes 复用，避免内容漂移
4. **主题**：默认 VitePress default theme，必要时只 override 配色和 logo，不写自定义主题组件
5. **私有仓鉴权**：rword 是私有仓库，跨仓拉取 artifact 必须用专门 PAT（详见 §8）
6. **rword "View Source" 按钮**：因 rword 私有，落地页不放直链到 rword 仓库源码的按钮；rword 项目卡片只放「在线 Demo」+「文档」按钮；如需源码入口仅链到 `https://github.com/office-rs` 组织页

## 7. CI 编排与 rword 产物接收流程

### 7.1 鉴权策略

rword 私有仓库跨仓拉取 artifact 必须用 fine-grained PAT。本仓库 Secrets 新增 `RWORD_REPO_TOKEN`。

**PAT 配置要点**：
- 类型：Fine-grained personal access token
- Resource owner：`office-rs`
- Repository access：仅选 `office-rs/rword`
- Permissions：`Actions` → `Read-only`，`Metadata` → `Read-only`（自动必选）
- 有效期：建议 1 年，到期前轮换

### 7.2 rword 仓库侧改造

`deploy-pages.yml` 重命名为 `build-web-app.yml`，**删除 deploy job**，新增 artifact upload 步骤：

```yaml
# rword 仓库: .github/workflows/build-web-app.yml
name: Build Web App

on:
  push:
    branches: [main]
    paths:
      - 'crates/web-app/**'
      - 'crates/web-view/**'
      - 'crates/dom/**'
      - 'crates/ooxml/**'
      - 'crates/editor/**'
      - 'crates/layout/**'
      - 'crates/renderer/**'
      - 'crates/component/**'
      - '.github/workflows/build-web-app.yml'
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: dtolnay/rust-toolchain@stable
        with:
          targets: wasm32-unknown-unknown

      - uses: jetli/wasm-pack-action@v0.4.0

      - name: Install system dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y libfontconfig1-dev libfreetype6-dev

      - uses: actions/setup-node@v4
        with: { node-version: '22' }

      - working-directory: crates/web-view/sdk
        run: npm ci --no-audit --no-fund

      - working-directory: crates/web-app
        run: npm ci --no-audit --no-fund

      - working-directory: crates/web-app
        run: npm run build:sdk

      - working-directory: crates/web-app
        run: npm run build:pages        # --base=/rword/ 不变

      - uses: actions/upload-artifact@v4
        with:
          name: rword-web-app-dist
          path: crates/web-app/dist
          retention-days: 90
```

仓库 Settings → Pages → Source 改为 **Disabled**（关闭 rword 自身的 Pages）。

### 7.3 本仓库 CI：deploy.yml

单 workflow，三个触发源：push 到 main（落地页变更）、schedule（每 6 小时同步 rword 最新 dist）、workflow_dispatch（手动或外部触发）。

```yaml
# office-rs.github.io/.github/workflows/deploy.yml
name: Deploy Org Site

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
      - '.github/workflows/deploy.yml'
  schedule:
    - cron: '0 */6 * * *'              # 每 6 小时同步 rword 最新 dist
  workflow_dispatch:                    # 手动触发

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with: { version: 9 }

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Build VitePress
        run: pnpm build               # 输出 docs/.vitepress/dist

      - name: Fetch rword web-app dist (跨私有仓)
        env:
          GH_TOKEN: ${{ secrets.RWORD_REPO_TOKEN }}
        run: |
          RUN_ID=$(gh run list \
            --repo office-rs/rword \
            --workflow=build-web-app.yml \
            --status=success \
            --limit=1 \
            --json databaseId -q '.[0].databaseId')
          if [ -z "$RUN_ID" ]; then
            echo "::warning::No successful rword build found; skipping rword demo"
            exit 0
          fi
          gh run download "$RUN_ID" \
            --repo office-rs/rword \
            --name rword-web-app-dist \
            --dir rword-dist-tmp

      - name: Merge rword dist into VitePress output
        run: |
          rm -rf docs/.vitepress/dist/rword
          if [ -d rword-dist-tmp ]; then
            mv rword-dist-tmp docs/.vitepress/dist/rword
          fi

      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 7.4 失败兜底

- rword 无可用 artifact 时不阻断部署，仅打 `::warning::`；落地页文档正常上线，rword demo 路径返回 404 直到下次同步
- 跨仓拉取失败不抛错，确保落地页文档始终可访问

### 7.5 未来可选升级（不进本期实施）

如需 rword 改动后**立即**触发本仓库部署，可在 rword 的 `build-web-app.yml` 末尾追加：

```yaml
- name: Trigger org site deploy
  env:
    GH_TOKEN: ${{ secrets.ORG_REPO_TOKEN }}   # 另一个 PAT, scope=office-rs.github.io, actions: write
  run: gh workflow run deploy.yml --repo office-rs/office-rs.github.io
```

当前 schedule 6h 同步够用，留作未来优化项。

## 8. 待验证风险项

### 8.1 VitePress SPA 路由拦截（实施第一周优先验证）

VitePress 是 SPA，访问 `/rword/` 时浏览器会先命中根 `index.html` 的 SPA 路由，可能不会真正加载 `/rword/index.html`。

**备选方案**（如确实发生拦截，按以下顺序尝试）：
1. 在 `docs/.vitepress/config.ts` 用 head 标签注入 redirect meta
2. 写一个 404.html 兜底（GitHub Pages 404 机制）
3. 让 rword 文档页前缀改为 `/docs/rword/`，把 `/rword/` 完全让给 demo（要求 VitePress `rewrites` 配置）

实测浏览器访问 `/rword/` 是否加载 rword demo（非 SPA 路由），作为 spec 验证清单第一项。

**验证结果 (2026-09-22)**：PASS — 本地 preview 实测，访问 /rword/ 直接加载 docs/.vitepress/dist/rword/index.html 静态文件，未触发 VitePress SPA 路由拦截。GitHub Pages 部署后行为预期一致。

### 8.2 npm 包可见性

`@office-rs/rword` 与 `@office-rs/rofd` 的 npm 包是否公开？落地页 SDK 安装命令 `npm install @office-rs/rword` 需在实施时确认包是 public 还是 private（私有 npm scope 需配置 `.npmrc` 凭据，外部访问者无法直接 install）。

## 9. 验证策略

| 层 | 方式 |
|---|---|
| 文档内容 | VitePress 本地 `pnpm dev` 预览 |
| 构建 | `pnpm build` 产物完整、无错 |
| 跨仓拉取 | 在 PR 中用 `--dry-run` 或人工触发 `workflow_dispatch` 观察 `gh` CLI 输出 |
| 部署 | 推到 main，访问 https://office-rs.github.io 验证落地页；访问 `/rword/` 验证 demo；访问 `/rofd/` 验证跳转 |
| 路由冲突（§8.1） | 实测浏览器访问 `/rword/` 是否加载 rword demo（非 SPA 路由） |

## 10. 不在本期范围

- rword 的 `build-web-app.yml` 改造由 rword 仓库负责，本仓库不实施
- rofd 仓库的 Pages 部署不动
- 不做 i18n（仅中文站，未来如需双语再加 VitePress i18n 配置）
- 不做组织博客 / News
- 不做用户反馈表单 / 邮件订阅
- 不做自定义主题组件（仅 override 配色 logo）

## 11. 一次性前置配置清单

- [ ] 在 GitHub 上创建 fine-grained PAT，权限为 `office-rs/rword` 的 `Actions: Read` + `Metadata: Read`，存为本仓库 Secret `RWORD_REPO_TOKEN`
- [ ] 在 rword 仓库 Settings → Pages → Source 选 "Disabled"
- [ ] 在本仓库 Settings → Pages → Build and deployment → Source 选 "GitHub Actions"
- [ ] 在本仓库 Settings → Actions → General → Workflow permissions 选 "Read and write"
