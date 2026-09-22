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
