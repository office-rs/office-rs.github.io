# rofd JS SDK usage

`@office-rs/rofd` is the web TypeScript SDK for rofd.

## Installation

```bash
npm install @office-rs/rofd
```

## Minimal example

```ts
import { Editor } from '@office-rs/rofd';

const container = document.getElementById('container') as HTMLElement;

const editor = await Editor.init(container, {
    fonts: [
        { url: '/fonts/NotoSans-Regular.ttf' },
        { url: '/fonts/NotoSansCJKsc-Regular.otf' },
        { url: '/fonts/NotoSerifCJKsc-Regular.otf' }
    ],
    onContextMenu: (x, y, annotationId) => {
        // callback when the user right-clicks on the document
    }
});

editor.setClock('rofd', Date.now());

// load an OFD byte sequence
editor.loadOfd(bytes);
```

## Key API

| Method | Purpose |
|---|---|
| `Editor.init(el, config)` | Initialize the editor on the given DOM element |
| `editor.loadOfd(bytes)` | Load an OFD byte sequence |
| `editor.setClock(name, ts)` | Set the clock (used for signature timestamps) |
| `config.onContextMenu(x, y, annotationId)` | Right-click menu callback |
| `config.fonts` | Font loading configuration (including CJK) |

See `crates/web-view` in the rofd repository for the full API.
