# rword xilem-view usage

`rword-xilem-view` wraps the rword editor as a masonry `Widget` + xilem `View`, so a native host can integrate it with a single view function.

## Dependencies

```toml
# Cargo.toml
[dependencies]
rword-xilem-view = { git = "https://github.com/office-rs/rword", branch = "main" }
# xilem must be pinned to the same Linebender rev used by the workspace
xilem = { git = "https://github.com/linebender/xilem", rev = "271a27a6d4a9" }
```

## Minimal example

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
            // host → editor: push a command; executed on view rebuild
            // targeting the currently active component
            commands.lock().unwrap().push(Arc::new(|c| c.toggle_bold()));
        }),
        word(state.commands.clone())
            .on_change(|s: &mut AppState| s.modified = true) // editor → host
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

## The two channels between host and editor

The editor is a first-class masonry widget: focus, pointer capture, IME sessions, clipboard shortcuts, and Ctrl+wheel zoom are all handled internally — the host **never touches winit**.

| Direction | Channel | Usage |
|---|---|---|
| Editor → host | Chained `.on_change` / `.on_context_menu` / `.on_format_change` etc. | Receive editor state-change events |
| Host → editor | `Arc<dyn Fn(&mut WordComponent)>` command queue | Push commands, executed on view rebuild |

See `crates/xilem-app` in the rword repository for the full reference implementation (toolbar, context menu, file I/O, find-and-replace).
