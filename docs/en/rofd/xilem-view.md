# rofd native-view usage

rofd provides native integration via `rofd-native-view`, similar to rword's xilem-view, wrapping the editor as a masonry widget.

## Dependencies

```toml
# Cargo.toml
[dependencies]
rofd-native-view = { git = "https://github.com/office-rs/rofd", branch = "main" }
# xilem must be pinned to the same Linebender rev used by the rofd workspace
xilem = { git = "https://github.com/linebender/xilem", rev = "bf81712d44e3" }
```

> Note: the rofd workspace currently pins xilem rev `bf81712d44e3`, which **differs** from rword's `271a27a6d4a9` — the two projects currently track different xilem main snapshots, so do not mix them in the same Cargo workspace.

## Reference implementation

rofd's native reference app lives in `crates/native-app`, and its Tauri desktop shell in `crates/tauri-app`. For the full view integration API and examples, see the rofd repository source.
