# rofd native-view 使用

rofd 通过 `rofd-native-view` 提供原生端集成，与 rword 的 xilem-view 类似，把编辑器封装为 masonry widget。

## 依赖

```toml
# Cargo.toml
[dependencies]
rofd-native-view = { git = "https://github.com/office-rs/rofd", branch = "main" }
# xilem 必须钉到 rofd workspace 使用的同一 Linebender rev
xilem = { git = "https://github.com/linebender/xilem", rev = "bf81712d44e3" }
```

> 注：rofd workspace 当前 pin 的 xilem rev 是 `bf81712d44e3`，与 rword 的 `271a27a6d4a9` **不同**——两个项目目前跟踪不同的 xilem main 快照，请勿在同一 Cargo 工作区混用。

## 参考实现

rofd 的原生参考应用在 `crates/native-app`，Tauri 桌面壳在 `crates/tauri-app`。完整 view 集成 API 与示例请参考 rofd 仓库源码。
