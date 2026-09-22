# office-rs 组织落地页 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 VitePress 搭起 https://office-rs.github.io/ 组织落地页，介绍 rword 与 rofd 两个项目；rword 在线 Demo 由本仓库 CI 跨私有仓拉取 rword 仓库的 web-app dist artifact 后托管在 `/rword/` 子路径。

**Architecture:** VitePress 静态站（Markdown 源码 + 默认主题），单仓库单部署源；CI 单 workflow `deploy.yml` 三触发源（push / schedule / workflow_dispatch），跨仓拉取使用 PAT `RWORD_REPO_TOKEN`（fine-grained，仅 `office-rs/rword` 的 Actions Read）。

**Tech Stack:** VitePress 1.x（Vue 3 + Vite 5 内置），pnpm 9，Node 22 LTS，GitHub Actions + Pages。

**前置条件（用户一次性手动配置，不在本计划任务内）：**
- 在 GitHub 创建 fine-grained PAT，权限为 `office-rs/rword` 的 `Actions: Read` + `Metadata: Read`，存为本仓库 Secret `RWORD_REPO_TOKEN`
- 本仓库 Settings → Pages → Source 选 "GitHub Actions"
- 本仓库 Settings → Actions → General → Workflow permissions 选 "Read and write"
- 在 rword 仓库 Settings → Pages → Source 选 "Disabled"（关闭 rword 自身部署）
- rword 仓库的 `deploy-pages.yml` 改造为 `build-web-app.yml`（删除 deploy job + 新增 `actions/upload-artifact@v4` 上传 `rword-web-app-dist`），由 rword 仓库负责人实施

**Reference Spec:** [docs/superpowers/specs/2026-09-22-org-landing-page-design.md](../specs/2026-09-22-org-landing-page-design.md)

---

## File Structure

| 路径 | 责任 |
|---|---|
| `package.json` | VitePress 依赖声明 + scripts |
| `pnpm-lock.yaml` | 锁文件（由 install 生成） |
| `.nvmrc` | Node 版本固定 |
| `.gitignore` | 忽略 `node_modules/`、`dist/`、`cache/` 等 |
| `docs/.vitepress/config.ts` | 站点配置：title/nav/sidebar/theme/search |
| `docs/index.md` | 落地页（hero + 项目卡片 + 特性对比） |
| `docs/shared/webgpu-requirement.md` | WebGPU 浏览器要求片段（include 复用） |
| `docs/shared/coep-coop-headers.md` | COEP/COOP 头说明片段（include 复用） |
| `docs/rword/intro.md` | rword 简介 |
| `docs/rword/sdk.md` | rword JS SDK 使用 |
| `docs/rword/xilem-view.md` | rword xilem-view 使用 |
| `docs/rofd/intro.md` | rofd 简介 |
| `docs/rofd/sdk.md` | rofd JS SDK 使用 |
| `docs/rofd/xilem-view.md` | rofd xilem-view 使用 |
| `.github/workflows/deploy.yml` | 构建 VitePress + 拉取 rword dist + 部署 Pages |

---

## Task 1: 项目骨架与 VitePress 安装

**Files:**
- Create: `package.json`
- Create: `.nvmrc`
- Create: `.gitignore`

- [ ] **Step 1: 创建 `.nvmrc`**

写入文件 `.nvmrc`：

```
22
```

- [ ] **Step 2: 创建 `.gitignore`**

写入文件 `.gitignore`：

```
node_modules/
docs/.vitepress/dist/
docs/.vitepress/cache/
*.log
.DS_Store
.idea/
.vscode/
tmp/
```

- [ ] **Step 3: 创建 `package.json`**

写入文件 `package.json`：

```json
{
  "name": "office-rs-landing",
  "version": "0.1.0",
  "private": true,
  "description": "office-rs 组织落地页 - rword 与 rofd 文档与 Demo 入口",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.5.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

- [ ] **Step 4: 安装依赖**

Run: `pnpm install`
Expected: 输出 `Done in <N>s`，无错误；生成 `pnpm-lock.yaml` 与 `node_modules/`

- [ ] **Step 5: 验证 VitePress CLI 可用**

Run: `pnpm exec vitepress --version`
Expected: 输出 `vitepress/1.x.x`，无 "command not found"

- [ ] **Step 6: 提交**

```bash
git add .nvmrc .gitignore package.json pnpm-lock.yaml
git commit -m "chore: scaffold vitepress project skeleton"
```

---

## Task 2: VitePress 配置（nav + sidebar + 搜索）

**Files:**
- Create: `docs/.vitepress/config.ts`

- [ ] **Step 1: 创建 `docs/.vitepress/config.ts`**

写入文件 `docs/.vitepress/config.ts`：

```ts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'office-rs',
  description: 'Rust 文档处理库集合 - rword 与 rofd',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3aa675' }]
  ],
  themeConfig: {
    siteTitle: 'office-rs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Rword', link: '/rword/intro', activeMatch: '/rword/' },
      { text: 'rofd', link: '/rofd/intro', activeMatch: '/rofd/' },
      { text: 'GitHub', link: 'https://github.com/office-rs' }
    ],
    sidebar: {
      '/rword/': [
        {
          text: 'Rword',
          items: [
            { text: '简介', link: '/rword/intro' },
            { text: 'JS SDK', link: '/rword/sdk' },
            { text: 'xilem-view', link: '/rword/xilem-view' },
            { text: '在线 Demo ↗', link: 'https://office-rs.github.io/rword/' }
          ]
        }
      ],
      '/rofd/': [
        {
          text: 'rofd',
          items: [
            { text: '简介', link: '/rofd/intro' },
            { text: 'JS SDK', link: '/rofd/sdk' },
            { text: 'xilem-view', link: '/rofd/xilem-view' },
            { text: '在线 Demo ↗', link: 'https://office-rs.github.io/rofd/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/office-rs' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: { noResults: '无匹配结果', resetButtonTitle: '清除查询' }
        }
      }
    },
    footer: {
      message: 'Released under the GPL-3.0 License.'
    }
  }
});
```

- [ ] **Step 2: 验证配置语法**

Run: `pnpm exec vitepress build docs`
Expected: 退出码 0，输出 `building client + server bundles...`；可能有 warning 提示找不到入口页面（`/rword/intro` 等），这是正常的（任务 5、6 才创建这些页面）。如出现 TS 类型错误（如 `themeConfig` 字段名错）则修复后重跑。

- [ ] **Step 3: 提交**

```bash
git add docs/.vitepress/config.ts
git commit -m "feat: add vitepress config with nav, sidebar, local search"
```

---

## Task 3: 落地页 docs/index.md

**Files:**
- Create: `docs/index.md`

- [ ] **Step 1: 创建 `docs/index.md`**

写入文件 `docs/index.md`：

```markdown
---
layout: home

hero:
  name: office-rs
  text: Rust 文档处理库集合
  tagline: rword 与 rofd —— OOXML/OFD 的纯 Rust 实现，一份核心双端（原生 + WebAssembly/WebGPU）。
  actions:
    - theme: brand
      text: Rword 文档
      link: /rword/intro
    - theme: alt
      text: rofd 文档
      link: /rofd/intro

features:
  - icon: 📝
    title: rword · 编辑器
    details: OOXML (.docx) 文档编辑库，原生 Vello+Parley+masonry/xilem，Web 端 WASM+WebGPU，一份核心两份输出。
    link: /rword/intro
    linkText: 查看 rword →
  - icon: 📄
    title: rofd · 视图 + 标注
    details: OFD (GB/T 33190) 视图与标注编辑库，Rust 原生与 WASM 双端，WebGPU 渲染。
    link: /rofd/intro
    linkText: 查看 rofd →
  - icon: 🎨
    title: WebGPU 渲染
    details: 两库均以 Vello GPU 场景渲染，无 Canvas2D 软件回退，桌面端 wgpu，浏览器端 WebGPU（Chrome/Edge 113+）。
  - icon: 🔌
    title: JS SDK 即装即用
    details: npm 包 @office-rs/rword 与 @office-rs/rofd，fetch() 加载 WASM，无需特殊打包插件。
  - icon: 🖥️
    title: 桌面集成
    details: xilem-view 适配层把编辑器封装为 masonry Widget + xilem View，原生宿主只需一条 view 函数。
  - icon: ⚖️
    title: GPL-3.0
    details: 两库均以 GNU General Public License v3.0 发布，源码完整开放。
---

## 项目对比

| 维度 | rword | rofd |
|---|---|---|
| 文档格式 | OOXML (.docx)，ISO/IEC 29500 | OFD (GB/T 33190) |
| 角色 | 编辑器（读 + 写 + 编辑） | 视图 + 标注 |
| Web SDK | `@office-rs/rword` | `@office-rs/rofd` |
| 桌面适配 | `rword-xilem-view` | `rofd-native-view` |
| 桌面预编译 | Tauri Windows 安装包 | Tauri Windows 安装包 |
| 在线 Demo | [/rword/](https://office-rs.github.io/rword/) | [office-rs.github.io/rofd/](https://office-rs.github.io/rofd/) |
```

- [ ] **Step 2: 验证落地页可渲染**

Run: `pnpm dev`
打开浏览器访问 `http://localhost:5173/`（VitePress 默认端口；如不同以 CLI 输出为准）。
Expected: hero 区显示 "office-rs / Rust 文档处理库集合"；下方 6 张 features 卡片正常排布；底部项目对比表格渲染正确。
按 Ctrl+C 停止 dev server。

- [ ] **Step 3: 验证构建产物**

Run: `pnpm build`
Expected: 退出码 0；输出 `docs/.vitepress/dist/index.html`、`docs/.vitepress/dist/assets/` 等；无 error。

- [ ] **Step 4: 提交**

```bash
git add docs/index.md
git commit -m "feat: author landing page hero, features grid, comparison table"
```

---

## Task 4: 跨项目共享片段

**Files:**
- Create: `docs/shared/webgpu-requirement.md`
- Create: `docs/shared/coep-coop-headers.md`

- [ ] **Step 1: 创建 `docs/shared/webgpu-requirement.md`**

写入文件 `docs/shared/webgpu-requirement.md`：

```markdown
# WebGPU 浏览器要求

两库的 Web 端均依赖 WebGPU，无 Canvas2D / 软件回退。

| 浏览器 | 最低版本 | 备注 |
|---|---|---|
| Chrome / Edge | 113+ | 桌面端开箱即用 |
| Firefox | 未发布稳定 | 需手动启用 `dom.webgpu.enabled` |
| Safari | 不支持 | 暂无回退路径 |

如浏览器不支持 WebGPU，编辑器区域会显示空白或加载失败提示。

可以通过 [WebGPU Report](https://webgpureport.org/) 检测当前浏览器能力。
```

- [ ] **Step 2: 创建 `docs/shared/coep-coop-headers.md`**

写入文件 `docs/shared/coep-coop-headers.md`：

```markdown
# 跨源隔离响应头（自托管场景）

WebGPU 与 WASM 线程在浏览器中需要 `crossOriginIsolated` 上下文，自托管部署时需配置以下响应头：

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

::: warning GitHub Pages 限制
GitHub Pages 不支持自定义响应头，无法配置 COOP/COEP。本仓库 GitHub Pages 部署的 Demo 在无 `crossOriginIsolated` 状态下运行；如需完整隔离能力，请自托管或使用 Tauri 桌面客户端。
:::
```

- [ ] **Step 3: 验证片段可被 include**

Run: `pnpm dev`
打开浏览器访问任一已存在页面（如首页），无报错（片段本身不参与路由，但要确保文件无 markdown 语法错误）。
按 Ctrl+C 停止。

- [ ] **Step 4: 提交**

```bash
git add docs/shared/
git commit -m "docs: add shared webgpu-requirement and coep-coop-headers snippets"
```

---

## Task 5: rword 文档页

**Files:**
- Create: `docs/rword/intro.md`
- Create: `docs/rword/sdk.md`
- Create: `docs/rword/xilem-view.md`

- [ ] **Step 1: 创建 `docs/rword/intro.md`**

写入文件 `docs/rword/intro.md`：

```markdown
# Rword 简介

Rword 是一个用 Rust 编写的 GPU 加速 OOXML (.docx) 文档**编辑库**。一份编辑核心同时运行在原生端（Vello + Parley + masonry/xilem）与浏览器端（WebAssembly + WebGPU），两端产出**完全相同的版式**。

Rword 是**库**而非应用：对外暴露单一的 `WordComponent`——你可以把它当成一个富文本版的 `<textarea>`。宿主拥有窗口与消息循环并转发输入事件；Rword 负责文档状态、版式与渲染。

## 核心能力

- **原生 .docx 支持** —— 读 / 写 ISO/IEC 29500：嵌套表格、样式、编号、页眉页脚、分节、图片、内容控件；栈式解析器处理任意深度嵌套
- **一份核心两份输出** —— 原生与 WebAssembly 共享同一份文档模型、编辑器、版式引擎（Parley）与 GPU 渲染器（Vello），无平台分支
- **纯 GPU 渲染** —— 桌面 Vello + 浏览器 WebGPU，无 Canvas2D 软件回退；纸张尺寸来自文档本身（纸-桌模型），而非视口
- **完整编辑模型** —— 光标与选区、CJK IME 合成、撤销/重做（命令模式）、跨正文与页眉的查找替换、表格（拆分/合并/底纹）、列表、分节、页眉页脚
- **结构化文档标签（SDT）** —— 表单控件贯穿各层：文本、下拉、多选、复选框、日期、数字；含字典、数据绑定、校验、锁定
- **现成集成入口** —— Web 端 [`@office-rs/rword`](https://www.npmjs.com/package/@office-rs/rword) TypeScript SDK（无需特殊打包插件），桌面端 `rword-xilem-view`（masonry `Widget` + xilem `View` 包装）

## 集成入口

| 场景 | 入口 | 说明 |
|---|---|---|
| Web SPA / 框架应用 | `@office-rs/rword` npm 包 | `wasm-pack --target web` 产物，`fetch()` 加载，无 Vite WASM 插件 |
| 桌面 xilem 应用 | `rword-xilem-view` crate | masonry `WordWidget` + xilem `word()` view |
| 桌面 Tauri | rword `tauri-app` 参考实现 | Windows NSIS / MSI 安装包，[Releases](https://github.com/office-rs/rword/releases/latest) |

## 浏览器要求

<!--@include: ../shared/webgpu-requirement.md-->

## 自托管响应头

<!--@include: ../shared/coep-coop-headers.md-->

## 在线 Demo

部署在 [/rword/](https://office-rs.github.io/rword/)（需 WebGPU 浏览器）。
```

- [ ] **Step 2: 创建 `docs/rword/sdk.md`**

写入文件 `docs/rword/sdk.md`：

```markdown
# Rword JS SDK 使用

`@office-rs/rword` 是 rword 的 Web 端 TypeScript SDK，基于 `wasm-pack --target web` 构建，通过 `fetch()` 加载 WASM，**无需 Vite WASM 插件**或特殊打包配置。

## 安装

```bash
npm install @office-rs/rword
```

## 最小示例

```html
<div id="editor" style="width: 100%; height: 600px;"></div>
```

```js
import { Rword } from '@office-rs/rword';

const word = await Rword.init(document.getElementById('editor'), {
  onSaveRequest: () => {
    const bytes = word.saveDocx(); // Uint8Array —— 一个 .docx 文件
    // 上传 bytes，或触发浏览器下载
  },
});

// 打开已有 .docx
const res = await fetch('/example.docx');
word.loadDocx(new Uint8Array(await res.arrayBuffer()));
```

## 浏览器要求

SDK 需要：

- WebGPU（Chrome / Edge 113+）
- `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp`（自托管场景，GitHub Pages 不支持）

默认字体（含 CJK）从 CDN 加载，可通过 `config.fonts` / `config.cjkFonts` 覆盖。

## 关键 API

| 方法 | 用途 |
|---|---|
| `Rword.init(el, config)` | 在指定 DOM 元素上初始化编辑器 |
| `word.loadDocx(bytes: Uint8Array)` | 加载 .docx 字节序列 |
| `word.saveDocx(): Uint8Array` | 导出当前文档为 .docx 字节 |
| `word.setFont(...)` / `word.toggleBold()` 等 | 命令式格式操作 |
| `config.onSaveRequest` | 用户触发保存时回调 |
| `config.onContextMenu` / `config.onFormatChange` | 编辑器→宿主事件 |

完整 API 见 rword 仓库的 `crates/web-view/sdk/README.md`。
```

- [ ] **Step 3: 创建 `docs/rword/xilem-view.md`**

写入文件 `docs/rword/xilem-view.md`：

```markdown
# Rword xilem-view 使用

`rword-xilem-view` 把 rword 编辑器封装为 masonry `Widget` + xilem `View`，原生宿主只需一条 view 函数即可集成。

## 依赖

```toml
# Cargo.toml
[dependencies]
rword-xilem-view = { git = "https://github.com/office-rs/rword", branch = "main" }
# xilem 必须钉到 workspace 使用的同一 Linebender rev
xilem = { git = "https://github.com/linebender/xilem", rev = "271a27a6d4a9" }
```

## 最小示例

```rust
use std::sync::Arc;
use rword_xilem_view::{command_queue, word, WordCommandQueue};
use xilem::view::{flex_col, text_button, FlexExt};
use xilem::{EventLoop, WidgetView, WindowOptions, Xilem};

struct AppState {
    commands: WordCommandQueue,
    modified: bool,
}

fn app_logic(state: &mut AppState) -> impl WidgetView<AppState> + use<> {
    let commands = state.commands.clone();
    flex_col((
        text_button("Bold", move |_: &mut AppState| {
            // 宿主 → 编辑器：推入命令；view rebuild 时会执行
            // 针对当前活跃的 component
            commands.lock().unwrap().push(Arc::new(|c| c.toggle_bold()));
        }),
        word(state.commands.clone())
            .on_change(|s: &mut AppState| s.modified = true) // 编辑器 → 宿主
            .flex(1.0),
    ))
}

fn main() -> Result<(), xilem::winit::error::EventLoopError> {
    Xilem::new_simple(
        AppState { commands: command_queue(), modified: false },
        app_logic,
        WindowOptions::new("Rword"),
    )
    .run_in(EventLoop::with_user_event())
}
```

## 宿主与编辑器的两条通道

编辑器是一等 masonry widget：焦点、指针捕获、IME 会话、剪贴板快捷键、Ctrl+滚轮缩放均在内部处理——宿主**不接触 winit**。

| 方向 | 通道 | 用法 |
|---|---|---|
| 编辑器 → 宿主 | 链式 `.on_change` / `.on_context_menu` / `.on_format_change` 等 | 接收编辑器状态变化事件 |
| 宿主 → 编辑器 | `Arc<dyn Fn(&mut WordComponent)>` 命令队列 | 推送命令，view rebuild 时执行 |

完整参考实现（工具栏、上下文菜单、文件 I/O、查找替换）见 rword 仓库的 `crates/xilem-app`。
```

- [ ] **Step 4: 验证 rword 文档页可渲染**

Run: `pnpm dev`
浏览器访问 `http://localhost:5173/rword/intro.html`（cleanUrls 启用后也可用 `/rword/intro`）。
Expected: 简介页渲染，"WebGPU 浏览器要求" 与 "自托管响应头" 两段通过 `<!--@include:-->` 正确内嵌共享片段内容。
依次访问 `/rword/sdk.html` 与 `/rword/xilem-view.html`，代码块语法高亮正常（Rust、TypeScript、TOML 均着色）。
按 Ctrl+C 停止。

- [ ] **Step 5: 提交**

```bash
git add docs/rword/
git commit -m "docs: author rword intro, sdk, xilem-view pages"
```

---

## Task 6: rofd 文档页

**Files:**
- Create: `docs/rofd/intro.md`
- Create: `docs/rofd/sdk.md`
- Create: `docs/rofd/xilem-view.md`

- [ ] **Step 1: 创建 `docs/rofd/intro.md`**

写入文件 `docs/rofd/intro.md`：

```markdown
# rofd 简介

rofd 是一个用 Rust 编写的 OFD (GB/T 33190) **视图 + 标注**编辑库，双平台（原生 + WASM）。

## 平台支持

| 平台 | 渲染后端 | 状态 |
|---|---|---|
| 桌面（Windows / Linux） | wgpu（Vulkan/Metal/DX12） | 可用 |
| Web | WebGPU（Chrome/Edge 113+，无 Canvas2D 回退） | 可用 |

## 集成入口

| 场景 | 入口 | 说明 |
|---|---|---|
| Web SPA / 框架应用 | `@office-rs/rofd` npm 包 | TypeScript SDK |
| 桌面 Tauri | rofd `tauri-app` 参考实现 | Windows NSIS / MSI 安装包，[Releases](https://github.com/office-rs/rofd/releases) |

## 浏览器要求

<!--@include: ../shared/webgpu-requirement.md-->

## 自托管响应头

<!--@include: ../shared/coep-coop-headers.md-->

## 在线 Demo

部署在 [office-rs.github.io/rofd/](https://office-rs.github.io/rofd/)（由 rofd 仓库独立维护）。
```

- [ ] **Step 2: 创建 `docs/rofd/sdk.md`**

写入文件 `docs/rofd/sdk.md`：

```markdown
# rofd JS SDK 使用

`@office-rs/rofd` 是 rofd 的 Web 端 TypeScript SDK。

## 安装

```bash
npm install @office-rs/rofd
```

## 最小示例

```ts
import { Editor } from '@office-rs/rofd';

const container = document.getElementById('container') as HTMLElement;

const editor = await Editor.init(container, {
    fonts: [
        { url: '/fonts/NotoSans-Regular.ttf' },
        { url: '/fonts/NotoSansCJKsc-Regular.otf' },
        { url: '/fonts/NotoSerifCJKsc-Regular.otf' }
    ],
    onContextMenu: (x, y, annotationId) => {
        // 用户在文档上右键时的回调
    }
});

editor.setClock('rofd', Date.now());

// 加载 OFD 字节序列
editor.loadOfd(bytes);
```

## 关键 API

| 方法 | 用途 |
|---|---|
| `Editor.init(el, config)` | 在指定 DOM 元素上初始化编辑器 |
| `editor.loadOfd(bytes)` | 加载 OFD 字节序列 |
| `editor.setClock(name, ts)` | 设置时钟（用于签章时间戳） |
| `config.onContextMenu(x, y, annotationId)` | 右键菜单回调 |
| `config.fonts` | 字体加载配置（含 CJK） |

完整 API 见 rofd 仓库的 `crates/web-view`。
```

- [ ] **Step 3: 创建 `docs/rofd/xilem-view.md`**

写入文件 `docs/rofd/xilem-view.md`：

```markdown
# rofd native-view 使用

rofd 通过 `rofd-native-view` 提供原生端集成，与 rword 的 xilem-view 类似，把编辑器封装为 masonry widget。

## 依赖

```toml
# Cargo.toml
[dependencies]
rofd-native-view = { git = "https://github.com/office-rs/rofd", branch = "main" }
# xilem 必须钉到 rofd workspace 使用的同一 Linebender rev
xilem = { git = "https://github.com/linebender/xilem", rev = "bf81712d44e3" }
```

> 注：rofd workspace 当前 pin 的 xilem rev 是 `bf81712d44e3`，与 rword 的 `271a27a6d4a9` **不同**——两个项目目前跟踪不同的 xilem main 快照，请勿在同一 Cargo 工作区混用。

## 参考实现

rofd 的原生参考应用在 `crates/native-app`，Tauri 桌面壳在 `crates/tauri-app`。完整 view 集成 API 与示例请参考 rofd 仓库源码。
```

- [ ] **Step 4: 验证 rofd 文档页可渲染**

Run: `pnpm dev`
浏览器访问 `http://localhost:5173/rofd/intro.html`、`/rofd/sdk.html`、`/rofd/xilem-view.html`。
Expected: 三页均正常渲染；共享片段正确内嵌；侧边栏导航在 rword/rofd 两组间正确切换（`activeMatch` 生效）。
按 Ctrl+C 停止。

- [ ] **Step 5: 提交**

```bash
git add docs/rofd/
git commit -m "docs: author rofd intro, sdk, xilem-view pages"
```

---

## Task 7: CI workflow `.github/workflows/deploy.yml`

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建 `.github/workflows/deploy.yml`**

写入文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Org Site

# 构建 VitePress 站点 + 跨仓拉取 rword web-app dist + 部署到 GitHub Pages。
# 部署 URL: https://office-rs.github.io/
#
# 触发:
#   1. push 到 main (落地页文档变更)
#   2. schedule 每 6 小时 (同步 rword 最新 dist)
#   3. workflow_dispatch (手动 / 外部触发)
#
# 前置 (用户一次性手动配置):
#   - 仓库 Settings → Pages → Source 选 "GitHub Actions"
#   - 仓库 Settings → Actions → General → Workflow permissions 选 "Read and write"
#   - 仓库 Secrets 新增 RWORD_REPO_TOKEN (fine-grained PAT, scope=office-rs/rword, Actions Read)

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
      - '.github/workflows/deploy.yml'
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

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
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: pnpm

      - name: Install deps
        run: pnpm install --frozen-lockfile

      - name: Build VitePress
        run: pnpm build

      - name: Fetch rword web-app dist (cross-repo, private)
        env:
          GH_TOKEN: ${{ secrets.RWORD_REPO_TOKEN }}
        run: |
          set -euo pipefail
          RUN_ID=$(gh run list \
            --repo office-rs/rword \
            --workflow=build-web-app.yml \
            --status=success \
            --limit=1 \
            --json databaseId -q '.[0].databaseId')
          if [ -z "${RUN_ID:-}" ]; then
            echo "::warning::No successful rword build found; skipping rword demo"
            exit 0
          fi
          echo "Fetching rword dist from run $RUN_ID"
          gh run download "$RUN_ID" \
            --repo office-rs/rword \
            --name rword-web-app-dist \
            --dir rword-dist-tmp

      - name: Merge rword dist into VitePress output
        run: |
          set -euo pipefail
          rm -rf docs/.vitepress/dist/rword
          if [ -d rword-dist-tmp ]; then
            mv rword-dist-tmp docs/.vitepress/dist/rword
            echo "rword dist merged under /rword/"
          else
            echo "rword dist missing, /rword/ will 404 until next sync"
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
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 验证 YAML 语法**

Run: `pnpm exec js-yaml .github/workflows/deploy.yml > /dev/null`（如未安装 js-yaml，可用 `node -e "console.log(require('js-yaml').load(require('fs').readFileSync('.github/workflows/deploy.yml','utf8')))"`，或跳过此步依赖 actions 自身的校验）
Expected: 退出码 0，无 YAML 解析错误。

如本机无可用 YAML linter，跳过本地校验，依赖后续 GitHub Actions 触发时的 syntax 检查。

- [ ] **Step 3: 验证 gh run list 命令形状（不实际调用 API）**

Run: `gh run list --repo office-rs/rword --workflow=build-web-app.yml --status=success --limit=1 --json databaseId -q '.[0].databaseId'`
Expected: 因 rword 仓库尚未完成 build-web-app.yml 改造（前置条件未完成），可能输出空或 `could not find workflow`，属正常；只要命令本身参数无错即可。如本地未配置 gh，跳过。

- [ ] **Step 4: 提交**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add deploy workflow with cross-repo rword dist ingestion"
```

---

## Task 8: VitePress SPA 路由拦截风险验证（P0）

**Files:** 无创建 / 修改——本任务是验证 + 文档化结论。

- [ ] **Step 1: 模拟 rword dist 占位**

本地构造一个最小 `rword/index.html`：

```bash
mkdir -p docs/.vitepress/dist/rword
echo '<!DOCTYPE html><html><head><title>rword stub</title></head><body><h1>rword demo stub</h1></body></html>' > docs/.vitepress/dist/rword/index.html
```

- [ ] **Step 2: 启动 preview server 验证静态优先**

Run: `pnpm build && pnpm preview --port 4173`
浏览器访问 `http://localhost:4173/rword/`。
Expected：浏览器加载 stub HTML（显示 "rword demo stub"），而不是 VitePress 的 SPA 404 页面。这表明 GitHub Pages 部署后静态文件优先，路由拦截风险**不存在**。

- [ ] **Step 3: 文档化结论**

在 `docs/superpowers/specs/2026-09-22-org-landing-page-design.md` §8.1 末尾追加一行验证记录（如该任务由实施者执行）：

```markdown
**验证结果（YYYY-MM-DD）**：本地 preview 实测，`/rword/` 路径直接加载 `docs/.vitepress/dist/rword/index.html` 静态文件，未触发 VitePress SPA 路由拦截。GitHub Pages 部署后行为预期一致。
```

（如果 Step 2 观察到的是 SPA 拦截——显示 VitePress 404 页面——则按 spec §8.1 备选方案 1 / 2 / 3 依次排查，并在本步骤记录最终采用的方案。）

- [ ] **Step 4: 清理 stub 并提交（如有 spec 更新）**

```bash
rm -rf docs/.vitepress/dist/rword
# 如果 §8.1 加了验证记录:
git add docs/superpowers/specs/2026-09-22-org-landing-page-design.md
git commit -m "docs(spec): verify vitepress does not intercept /rword/ static path"
```

如未修改 spec，跳过 commit。

---

## Task 9: 最终构建与产物结构验证

**Files:** 无创建 / 修改——本任务是端到端 sanity check。

- [ ] **Step 1: 全量构建**

Run: `pnpm build`
Expected: 退出码 0；输出包含 `building client + server bundles...` 与 `rendering chunks...`；最终 `docs/.vitepress/dist/` 下含 `index.html` 与 `assets/` 子目录。

- [ ] **Step 2: 验证 dist 结构**

Run: `pnpm exec ls docs/.vitepress/dist`（Windows: `dir docs\.vitepress\dist`）
Expected: 至少包含：
- `index.html`（落地页）
- `rword/intro.html`、`rword/sdk.html`、`rword/xilem-view.html`
- `rofd/intro.html`、`rofd/sdk.html`、`rofd/xilem-view.html`
- `assets/`（CSS/JS 资源）
- 不应包含 `rword/index.html`（该文件由 CI 从 rword 仓库拉取后填入，本地构建无）

- [ ] **Step 3: 启动 preview 浏览全部页面**

Run: `pnpm preview --port 4173`
浏览器依次访问：
- `http://localhost:4173/` — 落地页 hero + features + 对比表
- `http://localhost:4173/rword/intro.html` — rword 简介含 include 片段
- `http://localhost:4173/rword/sdk.html` — SDK 代码示例
- `http://localhost:4173/rword/xilem-view.html` — xilem 示例
- `http://localhost:4173/rofd/intro.html`、`/rofd/sdk.html`、`/rofd/xilem-view.html`
- 顶部 nav 切换、左侧 sidebar 分组、搜索框（Ctrl+K）均可工作
按 Ctrl+C 停止。

- [ ] **Step 4: 推送触发首次 CI 部署（需用户显式确认后由用户执行）**

> ⚠️ 本步骤由**用户本人**执行，agent 不得自动 push。前置：如未配置 remote，需先 `git remote add origin https://github.com/office-rs/office-rs.github.io.git`。

用户执行：`git push -u origin main`
Expected: GitHub Actions 触发 `Deploy Org Site` workflow；build job 因 rword 仓库尚未完成 `build-web-app.yml` 改造会打 warning（无 rword artifact 可拉取），但部署成功；访问 https://office-rs.github.io/ 落地页可访问，`/rword/` 暂时 404。

- [ ] **Step 5: 标记 spec 验证清单完成**

在前置条件清单与 §8.1 风险项旁打勾。如 spec 已 commit 过，本次无需再 commit。

---

## 完成标准

- [ ] 仓库结构符合 spec §4
- [ ] 落地页 + 6 篇文档页全部可渲染（Task 3 / 5 / 6）
- [ ] CI workflow 语法正确，首次推送后 GitHub Actions 运行成功（Task 7 + Task 9 Step 4）
- [ ] VitePress SPA 路由拦截风险已实测验证（Task 8）
- [ ] rword demo 在 rword 仓库完成改造 + 第一次 artifact 上传后，本仓库 schedule 或手动触发 workflow 可拉到 dist 并部署到 `/rword/`（依赖外部前置条件，本计划范围内不强制）

## 后续 / 越界项

- rword 仓库 `build-web-app.yml` 改造（由 rword 仓库负责人实施）
- PAT 创建与仓库 Secret 配置（用户一次性手动）
- 如需 rword 改动后立即触发本仓库部署，按 spec §7.5 在 rword 仓库 `build-web-app.yml` 末尾追加 `gh workflow run deploy.yml --repo office-rs/office-rs.github.io`，需另配置 `ORG_REPO_TOKEN`
