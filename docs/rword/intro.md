# rword 简介

rword 是一个用 Rust 编写的 GPU 加速 OOXML (.docx) 文档**编辑库**。一份编辑核心同时运行在原生端（Vello + Parley + masonry/xilem）与浏览器端（WebAssembly + WebGPU），两端产出**完全相同的版式**。

rword 是**库**而非应用：对外暴露单一的 `WordComponent`——你可以把它当成一个富文本版的 `<textarea>`。宿主拥有窗口与消息循环并转发输入事件；rword 负责文档状态、版式与渲染。

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

## 在线 Demo

部署在 [/rword/](https://office-rs.github.io/rword/)（需 WebGPU 浏览器）。
