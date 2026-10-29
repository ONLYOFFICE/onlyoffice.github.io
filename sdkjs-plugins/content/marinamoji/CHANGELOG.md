# Changelog — marinaMoji (ONLYOFFICE)

Version history for the ONLYOFFICE Document Editor plugin. Marketplace updates require a new `config.json` `version` and an entry here.

## 0.1.15 - 2026-10-29

* Fix: panel close (X) button did nothing; remove the empty `Asc.plugin.button` handler so the SDK closes the panel.

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
