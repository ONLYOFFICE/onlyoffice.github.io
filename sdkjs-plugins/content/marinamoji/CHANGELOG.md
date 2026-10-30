# Changelog — marinaMoji (ONLYOFFICE)

Version history for the ONLYOFFICE Document Editor plugin. Marketplace updates require a new `config.json` `version` and an entry here.

## Unreleased

## 0.1.19 - 2026-10-30

* Render on an already rendered paragraph now replaces only the existing marinaMoji views (matched by tag) and the raw marks, and leaves the rest of the paragraph alone. Before, a second Render rebuilt the whole paragraph: a hyperlink inside it was lost (Unrender could not bring it back) and bold/colour were reset to the first run's style. A paragraph that holds other content (hyperlinks, fields) is never rebuilt, and hyperlink text now counts as part of the paragraph's canonical text. Reported by the ONLYOFFICE Marketplace reviewer. Checked on the reviewer's example (hyperlink, bold, colour; Render, Render, Unrender) in ONLYOFFICE Desktop, and with an in-memory model of the document API (`tests/render_refresh.test.js`).

## 0.1.18 - 2026-10-28

* Composed drawings inserted from the composer are lowered 0.15 em (`DROP_EM`) instead of 0, so they sit on the text's baseline instead of riding high. Chosen by rendering a test document through ONLYOFFICE's converter (`x2t`): 0 left the ink about 0.15 em too high, 0.19 about 0.035 em too low. Not yet checked with a real insert in Desktop.

## 0.1.17 - 2026-10-28

* Composer hand-off: load `composer_result.js` via XHR first (script-tag fallback),
  show status when a result is skipped (already seen / stale / busy), let
  **Insert composed** force a retry, and time out `callCommand` so a hung insert
  cannot leave the panel stuck. Addresses “IME wrote the file but nothing
  happens” on Linux Desktop (Ubuntu ARM .deb verified to receive the file).

* Docs: Windows Desktop hand-off path is
  `%LOCALAPPDATA%\ONLYOFFICE\DesktopEditors\data\sdkjs-plugins\{GUID}\`.
  The panel already polls `composer_result.js`; Insert failed on Win11 because
  the IME returned an empty plugin directory (fixed in marinaMoji, not in this
  package). Keep the panel open. Not yet verified on Windows.

## 0.1.16 - 2026-10-28

* Composer hand-off also accepts a Unicode `text` field in `composer_result.js` (not only SVG drawings), so Insert of a real character can land via the panel when IBus FocusIn is late.

* Composed-character hand-off on Desktop: keep the marinaMoji panel open, then Insert from the composer (also **Insert composed**). Insert at the caret with baseline alignment; poll `composer_result.js` and the clipboard. Load `../v1/plugins.js`. Linux Desktop verified.

* Desktop install: load `../v1/plugins.js` like stock plugins. Composer hand-off: load `composer_result.js` with a `#` cache-bust (a `?query` breaks `file://` on Linux Desktop), only mark a result seen after a successful insert, and add an **Insert composed** button as a manual retry. Keep the marinaMoji panel open.

* Render also resizes inserted composed characters to the font size of their paragraph, so they follow font and size changes (the composed drawing keeps its aspect ratio). Not yet verified in ONLYOFFICE Desktop.

* Composer hand-off: while the panel is open, a drawing made in the marinaMoji character composer (a structure with no Unicode character) is inserted at the cursor when you press Insert in the composer. No button. The composer (macOS / Linux) writes `composer_result.js` into this plugin's folder; the panel loads it about once a second, rasterises the SVG to PNG and inserts it inline at the cursor through the document API (as Render does; `PasteHtml` only as a fallback). Results older than two minutes are ignored, and each is inserted once. Linux install: `./install-linux.sh`. Not yet verified in ONLYOFFICE Desktop.

* Horizontal text: marks sit on the characters' bottom line instead of hanging below them. The picture is lowered by `(bottom line + ink inset) × font size` (`bottom_line_em`, `font_bottom_line_em`, `ink_inset_em` in `mapping.json`); the per-font bottom line is read from the paragraph's font (Songti SC differs). The old fixed `position_hps_per_pt` remains as the fallback. Checked against ONLYOFFICE's converter at 24–48 pt (within 0.012 em) and in ONLYOFFICE Desktop.
* The render fingerprint now includes the paragraph's font, so existing marks redraw when the font changes.
* Known: ONLYOFFICE enforces a minimum picture size of about 10 pt, so marks look larger than the mapping asks for below about 24 pt body text. Writer has no vertical page flow, so there is no vertical rule.

## 0.1.15 - 2026-10-27

* Set `variations[0].type` to `panel` (keeps deprecated `isInsideMode` for older Desktop).
* Ship `translations/fr-FR.json` and `ja-JA.json` so `langs.json` entries resolve.
* Docs: the plugin icon lives on the **Plugins** tab in a **Document** (Writer), not on Home like Word; Plugin Manager install should use the `.plugin` file; Desktop **9.3+** required.

## 0.1.14 - 2026-10-16

* Marketplace review: user `README.md`, `translations/langs.json`, remove `group`, `minVersion` 9.3.0.
* Dark theme via `onThemeChanged` (CSS variables + light/dark sidebar logo).
* Clipboard: fall back to hidden textarea + `execCommand("copy")` (no `PasteText`).
* Render: replace mark characters in place when possible so paragraph formatting is kept.
* Licensing headers + AGPL dual-offer note; drop unused store screenshot duplicates.
* Clarify authorship (official marinaMoji plugin) and exportCore origin (plugin repo, not IME BSD tree).

## 0.1.13 - 2026-10-16

* Add approved Desktop screenshot for Plugin Marketplace listing (`screen_1.png`).
* Point `store.screenshots` at the real capture; stop regenerating mock install/uninstall PNGs on build.

## 0.1.12 - 2026-10-16

* Marketplace preparation: `offered` field, store listing descriptions, sidebar slogan.
* Keep GUID and display name unchanged for future Plugin Manager updates.

## 0.1.11

* Inline-image Render / Unrender / Plain text workflow.
* Shared `mapping.json` sync on build; multi-scale light/dark and store icons.
