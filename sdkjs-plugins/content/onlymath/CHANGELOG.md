# Changelog

All notable changes to the OnlyMath plugin are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## 1.0.2

- The **X** on the Settings panel now closes it. Previously nothing happened,
  because the editor asks the plugin to handle its own window-header buttons and
  OnlyMath had no handler for them.
- Closing the Settings panel no longer affects anything else: the shortcuts, the
  toolbar menu and the computer-algebra engine keep running, so reopening
  Settings is instant and closing it never interrupts your work.
- Moved the **OnlyMath** button from the Insert tab to the **Plugins** tab, where
  ONLYOFFICE groups plugin commands. The shortcuts and the right-click menu are
  unchanged, and remain the quickest way to work.

## 1.0.1

- Decimal comma now applies to every result, including symbolic ones such as √20.
  Where Giac returns an exact value and a decimal approximation, they are joined
  with **≈** rather than **=**. Mathematical mode reuses the last chosen decimal
  precision (default 3).
- Rewrote the README for people deciding whether to install, documented the
  **OnlyMath** toolbar button on the Insert tab, and replaced the store
  screenshots (the previous set still showed the retired Alt+B shortcut).
- Added `translations/langs.json` so the plugin manager and store card can report
  the supported languages. The interface is English; no additional translations
  are bundled yet.
- Added `3rd-Party.txt` and a `licenses/` folder listing the bundled third-party
  components (Giac/Xcas and the Emscripten runtime) with their full licence texts.
  Giac's own licence continues to ship at `cas/giac/LICENSE`.

## 1.0.0

Initial public release.

- Insert a math field with **Alt+M** and evaluate mathematics directly in the document.
- **Calculate** (`Alt+C`) expressions, **solve** (`Alt+L`) equations, **differentiate**
  and **integrate** using a built-in Giac/Xcas computer-algebra engine
  (WebAssembly, runs client-side).
- Reach every action three ways: keyboard shortcuts, the **OnlyMath** button on the
  Insert tab, or the right-click menu inside a math field.
- Right-side **Settings** panel with output precision control (including a symbolic
  "Mathematical" mode that keeps results like π and √2 exact).
- Danish high-school notation and locale: decimal comma, integration constant `k`,
  Scandinavian solution formatting.
- Works fully offline; the CAS engine is bundled with the plugin.
