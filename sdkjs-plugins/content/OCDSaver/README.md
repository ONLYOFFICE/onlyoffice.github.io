# 强迫症救星（OCD Saver）

✨ 一个专为中文写作而设计的 ONLYOFFICE 插件，用于自动校验和格式化常见的书写规范问题。包括标点样式、中西文间距、空格清理等，帮助写作者强迫症治愈！

## 🚀 功能概览

- **智能转换**：自动检测并修复中文文本中的格式问题
  - 中英文之间缺少空格
  - 数字与单位之间缺少空格（如“10kg” → “10 kg”）
  - 百分号前缺少空格（如“30%” → “30 %”）
  - 半角标点统一替换为全角（如“,” → “，”）
  - 连续多余空格清理
- **强制全角**：将选中文本中的标点全部转换为全角符号
- **强制半角**：将选中文本中的标点全部转换为半角符号
- **格式报告**：提供可视化的错误列表与用户选择替换操作
- **可自定义规则**：用户可以在设置界面自由选择需要转换的标点类型

## 🖼️ 界面预览

📌 工具栏按钮界面  
👉插件在 ONLYOFFICE 工具栏中的“强迫症救星”标签  

📋 设置界面 
👉 用户可选择希望转换的符号_  
![](resources/screen3.png)

📝 格式报告
![](resources/screen1.png)
![](resources/screen2.png)



## 🛠️ 使用方式

1. 克隆项目并部署到支持插件的 ONLYOFFICE 实例
2. 打开 Word 文档，点击工具栏中的 **强迫症救星**
3. 使用以下功能按钮进行格式化操作：
   - `智能转换`
   - `强制转全角`
   - `强制转半角`
   - `设置`（可自定义转换内容）


## ✅ 格式检测规则一览（由 formatChecker.js 定义）

- `spaceBetweenMixedLang`：中英文或数字间未加空格
- `numberUnitSpacing`：数字后紧跟单位
- `percentSpacing`：百分号前未加空格
- `fullwidthPunctuation`：使用了不规范的半角标点
- `trimExtraSpaces`：多余空格（两个以上）

## 💡 开发者须知

- 插件使用 ONLYOFFICE 插件框架 (`sdkjs-plugins`)
- 与文档交互使用 `Api.GetSelectedText()` / `Api.ReplaceTextSmart()`
- 配置项 `config.json` 中，guid 为 `asc.{c3a4b670-9e25-41f8-9d6e-4f7d7d5e1c33}`，支持 Word 编辑器

## 📦 兼容环境

- ✅ ONLYOFFICE Desktop Editors / Web Document Server
- ✅ 插件面板支持响应式界面，适配不同窗口大小

## 📜 开源协议

本项目基于 [MIT License](LICENSE) 开源发布，欢迎学习与二次开发。

---

如果你觉得这个插件有用，欢迎 Star ⭐、Fork 🍴、提 Issue！



