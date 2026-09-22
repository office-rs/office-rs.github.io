# 跨源隔离响应头（自托管场景）

WebGPU 与 WASM 线程在浏览器中需要 `crossOriginIsolated` 上下文，自托管部署时需配置以下响应头：

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

::: warning GitHub Pages 限制
GitHub Pages 不支持自定义响应头，无法配置 COOP/COEP。本仓库 GitHub Pages 部署的 Demo 在无 `crossOriginIsolated` 状态下运行；如需完整隔离能力，请自托管或使用 Tauri 桌面客户端。
:::
