---
layout: home

hero:
  name: office-rs
  text: High-performance Rust Office component libraries
  tagline: rword and rofd — pure-Rust implementations of OOXML/OFD. One core, two targets (native + WebAssembly/WebGPU).
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
    title: rword · Editor
    details: OOXML (.docx) document editing library. Native via Vello+Parley+masonry/xilem, web via WASM+WebGPU — one core, two outputs.
    link: /rword/intro
    linkText: View rword →
  - icon: 📄
    title: rofd · Viewer + Annotation
    details: OFD (GB/T 33190) viewer and annotation editing library. Dual-target Rust native and WASM, rendered with WebGPU.
    link: /rofd/intro
    linkText: View rofd →
  - icon: 🎨
    title: WebGPU rendering
    details: Both libraries render via Vello GPU scenes with no Canvas2D software fallback — wgpu on desktop, WebGPU in the browser (Chrome/Edge 113+).
  - icon: 🔌
    title: Plug-and-play JS SDK
    details: npm packages @office-rs/rword and @office-rs/rofd load WASM via fetch(), with no special bundler plugins required.
  - icon: 🖥️
    title: Desktop integration
    details: The xilem-view adapter wraps the editor as a masonry Widget + xilem View, so native hosts need only a single view function.
  - icon: ⚖️
    title: Apache 2.0
    details: Both libraries ship under the Apache License 2.0, with source fully open and commercial closed-source derivatives permitted.
---
