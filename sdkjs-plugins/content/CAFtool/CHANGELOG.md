# Changelog

## [1.0.0] - 2025-10-08

### Added

- Spacing strategy: two optional toggles — **insert a space between CJK and Latin/digits**, and **insert a space between numbers and units/symbols**.
- Bidirectional full-width/half-width toggle for numbers and Latin letters.
- Expanded punctuation normalization coverage: brackets, book-title marks (《》), quotation marks, enumeration comma (、), ellipsis, currency symbols, percent sign, etc.
- Ellipsis normalization: `...` / `…` → standard Chinese `……`.

### Changed

- Moved **Confirm** from `space-options.html` to `code.js` (now handled uniformly by `Asc.PluginWindow` buttons).
- Consecutive spaces: collapse **CJK–CJK** boundaries to **no space**; collapse other cases to a single space.
- Unified wording and button labels on the report page.

### Fixed

- `space-options.html` “Confirm” click not responding on first plugin open.
- Occasional cache issue where code changes did not take effect.

**Files:** `code.js`, `panels/space-options.html`, `panels/report.html`

