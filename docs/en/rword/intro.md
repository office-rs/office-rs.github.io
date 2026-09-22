# rword introduction

rword is a GPU-accelerated OOXML (.docx) document **editing library** written in Rust. A single editing core runs on both native (Vello + Parley + masonry/xilem) and the browser (WebAssembly + WebGPU), producing **byte-identical layouts** on both ends.

rword is a **library**, not an application: it exposes a single `WordComponent` — you can think of it as a rich-text `<textarea>`. The host owns the window and event loop and forwards input events; rword owns document state, layout, and rendering.

## Core capabilities

- **Native .docx support** — read/write ISO/IEC 29500: nested tables, styles, numbering, headers/footers, sections, images, content controls; a stack-based parser handles arbitrarily deep nesting
- **One core, two outputs** — native and WebAssembly share the same document model, editor, layout engine (Parley), and GPU renderer (Vello), with no platform branching
- **Pure GPU rendering** — Vello on desktop + WebGPU in the browser, no Canvas2D software fallback; page size comes from the document itself (paper-desktop model), not the viewport
- **Full editing model** — cursor and selection, CJK IME composition, undo/redo (command pattern), find-and-replace across body and headers, tables (split/merge/shading), lists, sections, headers/footers
- **Structured document tags (SDT)** — form controls span every layer: text, dropdown, multi-select, checkbox, date, number; with dictionaries, data binding, validation, and locking
- **Ready-made integration entry points** — web: [`@office-rs/rword`](https://www.npmjs.com/package/@office-rs/rword) TypeScript SDK (no special bundler plugin), desktop: `rword-xilem-view` (masonry `Widget` + xilem `View` wrapper)

## Integration entry points

| Scenario | Entry point | Notes |
|---|---|---|
| Web SPA / framework app | `@office-rs/rword` npm package | `wasm-pack --target web` artifact, loaded via `fetch()`, no Vite WASM plugin |
| Desktop xilem app | `rword-xilem-view` crate | masonry `WordWidget` + xilem `word()` view |
| Desktop Tauri | rword `tauri-app` reference implementation | Windows NSIS / MSI installers, [Releases](https://github.com/office-rs/rword/releases/latest) |

## Browser requirements

<!--@include: ../shared/webgpu-requirement.md-->

## Live demo

Deployed at [/rword/](https://office-rs.github.io/rword/) (requires a WebGPU-capable browser).
