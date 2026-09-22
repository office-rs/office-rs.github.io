---
layout: home

hero:
  name: office-rs
  text: Rust 高性能 Office 组件库
  tagline: 面向上层 Office 类应用的 Office 组件库，纯 Rust 实现，提供 native crate 与 JavaScript SDK 双端接入。
  actions:
    - theme: brand
      text: rword Live Demo
      link: https://office-rs.github.io/rword/
      target: _blank
      rel: noreferrer
    - theme: alt
      text: rofd Live Demo
      link: https://office-rs.github.io/rofd/
      target: _blank
      rel: noreferrer

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
    title: Apache 2.0
    details: 两库均以 Apache License 2.0 发布，源码完整开放，允许商业闭源衍生。
---
