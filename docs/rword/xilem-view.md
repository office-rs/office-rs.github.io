# rword xilem-view 使用

`rword-xilem-view` 把 rword 编辑器封装为 masonry `Widget` + xilem `View`，原生宿主只需一条 view 函数即可集成。

## 依赖

```toml
# Cargo.toml
[dependencies]
rword-xilem-view = { git = "https://github.com/office-rs/rword", branch = "main" }
# xilem 必须钉到 workspace 使用的同一 Linebender rev
xilem = { git = "https://github.com/linebender/xilem", rev = "271a27a6d4a9" }
```

## 最小示例

```rust
use std::sync::Arc;
use rword_xilem_view::{command_queue, word, WordCommandQueue};
use xilem::view::{flex_col, text_button, FlexExt};
use xilem::{EventLoop, WidgetView, WindowOptions, Xilem};

struct AppState {
    commands: WordCommandQueue,
    modified: bool,
}

fn app_logic(state: &mut AppState) -> impl WidgetView<AppState> + use<> {
    let commands = state.commands.clone();
    flex_col((
        text_button("Bold", move |_: &mut AppState| {
            // 宿主 → 编辑器：推入命令；view rebuild 时会执行
            // 针对当前活跃的 component
            commands.lock().unwrap().push(Arc::new(|c| c.toggle_bold()));
        }),
        word(state.commands.clone())
            .on_change(|s: &mut AppState| s.modified = true) // 编辑器 → 宿主
            .flex(1.0),
    ))
}

fn main() -> Result<(), xilem::winit::error::EventLoopError> {
    Xilem::new_simple(
        AppState { commands: command_queue(), modified: false },
        app_logic,
        WindowOptions::new("Rword"),
    )
    .run_in(EventLoop::with_user_event())
}
```

## 宿主与编辑器的两条通道

编辑器是一等 masonry widget：焦点、指针捕获、IME 会话、剪贴板快捷键、Ctrl+滚轮缩放均在内部处理——宿主**不接触 winit**。

| 方向 | 通道 | 用法 |
|---|---|---|
| 编辑器 → 宿主 | 链式 `.on_change` / `.on_context_menu` / `.on_format_change` 等 | 接收编辑器状态变化事件 |
| 宿主 → 编辑器 | `Arc<dyn Fn(&mut WordComponent)>` 命令队列 | 推送命令，view rebuild 时执行 |

完整参考实现（工具栏、上下文菜单、文件 I/O、查找替换）见 rword 仓库的 `crates/xilem-app`。
