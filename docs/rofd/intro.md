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

## 在线 Demo

部署在 [office-rs.github.io/rofd/](https://office-rs.github.io/rofd/)（由 rofd 仓库独立维护）。
