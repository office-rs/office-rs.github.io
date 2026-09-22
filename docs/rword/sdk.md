# rword JS SDK 使用

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
