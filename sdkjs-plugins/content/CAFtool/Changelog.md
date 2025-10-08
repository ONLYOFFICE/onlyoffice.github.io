# Changelog

## [2.1.0] - 2025-10-08

### Added

- 空格策略新增两个可选开关：**中文与英/数字相邻加空格**、**数字与单位/符号前加空格**。
- 半角/全角转换的双向开关（数字与拉丁字母）。
- 标点规范覆盖面扩充：括号、书名号、引号、顿号、省略号、货币符号、百分号等。
- 省略号统一规则：`...` / `…` → `……`。

### Changed

- 将“确认（Confirm）”从 `space-options.html` 迁移到 `code.js`（由 `Asc.PluginWindow` 按钮统一托管）。
- 连续空格处理：**CJK–CJK** 之间收敛为**无空格**，其他场景收敛为单空格。
- 报告页用语与按钮文案统一。

### Fixed

- 首次打开插件时 `space-options.html` 的“Confirm”点击无效。
- 偶发修改代码后不生效的缓存问题。

**Files:** `code.js`, `panels/space-options.html`, `panels/report.html`,
