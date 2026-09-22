# rofd JS SDK 使用

`@office-rs/rofd` 是 rofd 的 Web 端 TypeScript SDK。

## 安装

```bash
npm install @office-rs/rofd
```

## 最小示例

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
        // 用户在文档上右键时的回调
    }
});

editor.setClock('rofd', Date.now());

// 加载 OFD 字节序列
editor.loadOfd(bytes);
```

## 关键 API

| 方法 | 用途 |
|---|---|
| `Editor.init(el, config)` | 在指定 DOM 元素上初始化编辑器 |
| `editor.loadOfd(bytes)` | 加载 OFD 字节序列 |
| `editor.setClock(name, ts)` | 设置时钟（用于签章时间戳） |
| `config.onContextMenu(x, y, annotationId)` | 右键菜单回调 |
| `config.fonts` | 字体加载配置（含 CJK） |

完整 API 见 rofd 仓库的 `crates/web-view`。
