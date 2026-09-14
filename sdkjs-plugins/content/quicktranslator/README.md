# QuickTranslator - OnlyOffice Plugin

**QuickTranslator** is a lightweight, universal translation extension for **OnlyOffice Workspace**, **OnlyOffice Desktop Editors**, and **OnlyOffice Docs Server**.

Compatible with:
- 📄 **Document Editor** (`word`)
- 📊 **Spreadsheet Editor** (`cell`)
- 📑 **Presentation Editor** (`slide`)

---

## ✨ Features

- ⚡ **Auto-Translation on Open/Selection**: Instantly detects and translates selected text as soon as the panel opens.
- 💾 **Smart Target Language Memory**: Remembers your preferred target language across sessions using `localStorage`.
- ⇄ **One-Click Language Swap**: Swaps source and target with smart fallback rules (AUTO -> IT & DA).
- 📥 **One-Click Document Insertion**: Inserts translated text directly at current selection/cursor in Docs, Sheets, and Slides.
- 🌍 **Comprehensive Language Support**: European, Nordic, and Asian languages sorted alphabetically.
- 🛡️ **GPL v3 Open Source**: Free and open source license.

---

## 📦 Installation Guide

### Option 1: OnlyOffice Desktop Editors (GUI)
1. Download `QuickTranslator.plugin` or `QuickTranslator.zip`.
2. Open OnlyOffice Desktop Editors.
3. Go to the **Plugins** tab on the top ribbon.
4. Click **Settings** > **Add Plugin**.
5. Select the `QuickTranslator.plugin` file (or extract the zip into `sdkjs-plugins/quicktranslator`).
6. The **QuickTranslator** button will appear on your Plugins tab!

### Option 2: Desktop Editors Directory
- **Windows**: `%LocalAppData%\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\quicktranslator`
- **Linux**: `/opt/onlyoffice/desktopeditors/editors/sdkjs-plugins/quicktranslator`
- **macOS**: `~/Library/Application Support/asc.onlyoffice.DesktopEditors/data/sdkjs-plugins/quicktranslator`

### Option 3: OnlyOffice Docs / Workspace Server
1. Copy the plugin folder to the `sdkjs-plugins/` directory on your Document Server:
   ```bash
   cp -r quicktranslator /var/www/onlyoffice/documentserver/sdkjs-plugins/
   ```
2. Restart the document server services if required.

---

## 📄 File Structure

```
QuickTranslator/
├── config.json       # OnlyOffice Manifest configuration
├── index.html        # Side panel HTML markup
├── plugin.js         # Core logic & OnlyOffice Asc.plugin bridge
├── style.css         # Responsive styling for OnlyOffice side panel
├── LICENSE           # GNU General Public License v3
├── README.md         # Documentation & installation instructions
└── resources/
    ├── icon.svg      # Scalable vector icon
    ├── icon.png      # 32x32 standard icon
    └── icon@2x.png   # 48x48 high-DPI icon
```
