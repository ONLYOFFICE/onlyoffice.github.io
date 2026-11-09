# marinaMoji

**Make room for character.**

ONLYOFFICE Document Editor (Writer) plugin that formats **Kanbun kaeriten** marks typed as Unicode with the [marinaMoji](https://github.com/marinaMoji/marinaMoji) input method.

## What it does

Kanbun reading marks live in the document as visible Unicode (for example `說㆒㆑者`). This plugin turns those marks into small stacked views next to the character, and can turn the views back into Unicode for editing or export.

It does **not** type the marks for you — install marinaMoji (or another IME) first, then use this plugin to format them in Writer.

## How to enter marks

1. Install the marinaMoji IME from the [marinaMoji project](https://github.com/marinaMoji/marinaMoji).
2. In Writer, type Classical Chinese and insert kaeriten with the IME shortcuts (for example `;1` → `㆒`, `;r` → `㆑`).
3. A typical cluster looks like: base character, then one or more marks with **no space** between them: `說㆒㆑者`.

## Commands

| Button | Action |
|--------|--------|
| **Render** | Finds paragraphs that contain kaeriten (or existing marinaMoji views) and builds stacked inline views from the Unicode source. |
| **Unrender** | Removes those views and puts the Unicode marks back so you can edit the source. |
| **Plain text** | Copies the canonical Unicode source (selection if any, otherwise the whole document) to the clipboard. |

**Tip:** Edit the Unicode source, not the rendered images. After changes, click **Render** again.

## Requirements

- ONLYOFFICE Desktop Editors or Document Server **9.3+** (Document Editor / Writer)
- marinaMoji IME (or any way to enter U+3190–U+319F marks)

## Where the button is (after install)

ONLYOFFICE does **not** put marinaMoji on the Home / Insert ribbon the way Word does.

1. Open a **Document** (`.docx` / Writer) — not a spreadsheet or presentation. This plugin is Document-only.
2. Open the **Plugins** tab on the ribbon.
3. Click the **marinaMoji** icon (sidebar with Render / Unrender / Plain text).

If Plugin Manager lists it as installed but you see no icon:

| Check | Why |
|-------|-----|
| You are in Document editor | Spreadsheet / Presentation never show this plugin |
| Desktop is **9.3 or newer** | `minVersion` is 9.3.0; older builds can list it without enabling it |
| You used the **`.plugin`** file | Prefer Plugin Manager → *Install plugin manually* → `marinamoji-kaeriten.plugin` (same bytes as the zip, correct extension) |
| Fully quit and reopen | Desktop caches the plugin list until restart |

## Authorship

This is the **official** ONLYOFFICE plugin for the marinaMoji project, maintained by the marinaMoji maintainers. Name and branding are used with the project’s permission (we are the project).

## Licence

Source lives in [marinaMoji/plugin](https://github.com/marinaMoji/plugin) under the **GNU GPL v3**. When this plugin is distributed through the ONLYOFFICE Plugin Marketplace repository, it is also offered under the **GNU AGPL v3**, which is the licence of that repository.

`scripts/exportCore.js` is a JavaScript port of `libreoffice/marinamoji_kaeriten/export_core.py` in the **same** plugin repository (GPL-3.0). It is **not** taken from the BSD-3-Clause marinaMoji IME repository.

## Support

- Project: https://github.com/marinaMoji/marinaMoji  
- Plugin issues: https://github.com/marinaMoji/plugin/issues  

## Developers

```bash
cd onlyoffice
./build.sh
./install-mac.sh      # macOS Desktop Editors
./install-linux.sh    # Linux → ~/.local/share/onlyoffice/desktopeditors/sdkjs-plugins/{GUID}/
```

Keep the marinaMoji sidebar open when inserting a composed character from the character composer (the panel polls `composer_result.js`).

Build, sideload, and packaging notes: [docs/ONLYOFFICE.md](../docs/ONLYOFFICE.md) and [docs/ONLYOFFICE_MARKETPLACE.md](../docs/ONLYOFFICE_MARKETPLACE.md).

