# rofd introduction

rofd is an OFD (GB/T 33190) **viewer + annotation** editing library written in Rust, targeting both native and WASM.

## Platform support

| Platform | Render backend | Status |
|---|---|---|
| Desktop (Windows / Linux) | wgpu (Vulkan/Metal/DX12) | Available |
| Web | WebGPU (Chrome/Edge 113+, no Canvas2D fallback) | Available |

## Integration entry points

| Scenario | Entry point | Notes |
|---|---|---|
| Web SPA / framework app | `@office-rs/rofd` npm package | TypeScript SDK |
| Desktop Tauri | rofd `tauri-app` reference implementation | Windows NSIS / MSI installers, [Releases](https://github.com/office-rs/rofd/releases) |

## Browser requirements

<!--@include: ../shared/webgpu-requirement.md-->

## Live demo

Deployed at [office-rs.github.io/rofd/](https://office-rs.github.io/rofd/) (maintained independently by the rofd repository).
