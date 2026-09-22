# rword JS SDK usage

`@office-rs/rword` is the web TypeScript SDK for rword. It is built with `wasm-pack --target web`, loads its WASM via `fetch()`, and needs **no Vite WASM plugin** or special bundler configuration.

## Installation

```bash
npm install @office-rs/rword
```

## Minimal example

```html
<div id="editor" style="width: 100%; height: 600px;"></div>
```

```js
import { Rword } from '@office-rs/rword';

const word = await Rword.init(document.getElementById('editor'), {
  onSaveRequest: () => {
    const bytes = word.saveDocx(); // Uint8Array — a .docx file
    // upload bytes, or trigger a browser download
  },
});

// open an existing .docx
const res = await fetch('/example.docx');
word.loadDocx(new Uint8Array(await res.arrayBuffer()));
```

## Browser requirements

The SDK requires:

- WebGPU (Chrome / Edge 113+)
- `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` (for self-hosted deployments; GitHub Pages does not support this)

Default fonts (including CJK) are loaded from a CDN and can be overridden via `config.fonts` / `config.cjkFonts`.

## Key API

| Method | Purpose |
|---|---|
| `Rword.init(el, config)` | Initialize the editor on the given DOM element |
| `word.loadDocx(bytes: Uint8Array)` | Load a .docx byte sequence |
| `word.saveDocx(): Uint8Array` | Export the current document as .docx bytes |
| `word.setFont(...)` / `word.toggleBold()` etc. | Imperative formatting operations |
| `config.onSaveRequest` | Callback when the user triggers a save |
| `config.onContextMenu` / `config.onFormatChange` | Editor → host events |

See `crates/web-view/sdk/README.md` in the rword repository for the full API.
