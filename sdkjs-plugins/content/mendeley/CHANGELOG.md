# Change Log

## Unreleased

## 1.1.5

- Fix Linux installer archive to include compiled Rust helpers for x86_64 and aarch64, exclude the legacy Python helper, and verify the packaged installer lifecycle.
- Skip Windows builds and Windows release assets for this release.

## 1.1.4

- Check Mendeley Desktop first and automatically start web sign-in when no desktop session is available; ignore late desktop checks so they cannot replace the web session.
- Fix Mendeley desktop refresh-cookie token extraction by importing `urllib.request` explicitly.
- Build Linux packages with the Rust loopback helper; ship x86_64 and aarch64 Rust helpers in the one-step installer and start/stop them through installer lifecycle scripts.
- Add Rust loopback helper lifecycle with safe reuse and shutdown of the matching service, health endpoint, and JSON event logging.
- Port OAuth callback, token storage, retrieval, deletion, CORS, and request validation to the Rust loopback helper.
- Recover and persist Mendeley Desktop access tokens from application cookies and Service Worker cache in the Rust helper.
- Build and publish Windows x64 and ARM64 setup packages with the Rust helper; installer starts it after setup and stops it on uninstall.

## 1.1.3

- Fixed entity decoding when refreshing citations so HTML entities render as text.

## 1.1.2

- Fixed normal citations creating block content controls; insert unlocked inline controls into the current paragraph.

## 1.1.1
- Auto-synced active Mendeley Reference Manager session token across Linux, Windows, and macOS, allowing seamless zero-config login without manual Application ID input.
- Fixed Linux and Windows installers to target official ONLYOFFICE plugin GUID `{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}` with compatibility symlinks for Flatpak and desktop editors.
- Fixed ONLYOFFICE `file://` login requests rejected by Helper CORS; allow file and loopback origins, keep remote origins blocked, and clear stale login errors on retry.

- Waited for citation and existing bibliography refresh to finish after style changes before allowing bibliography commands, preventing overlapping document writes.
- Fixed duplicate journal names in bibliography output by mapping Mendeley source and series to separate CSL fields.
- Explicitly set italic and bold on every bibliography run from CSL markup, preventing Word insertion formatting from leaking into unformatted text.
- Set citation and bibliography content controls to full access and unlock existing Mendeley controls when plugin starts, enabling manual formatting in ONLYOFFICE.
- Refreshed README demo media and authentication diagram; added contributor profile avatars.

## 1.1.0
- Added per-user Linux `.deb`/`.rpm` and Windows installers with x64/ARM64 build matrix.
- Bundled OAuth loopback helper so end users do not install Python or run the server manually.
- Added per-user XDG Autostart and Windows `HKCU\...\Run` startup, immediate start after setup, and stop-on-uninstall.
- Added helper health, safe reuse on port `8080`, conflict errors, owner-only token storage, and JSON log file.
- Added plugin target selection and per-user setup/removal scripts.

## 1.0.5
- Fixed empty bibliography Content Control bug by rendering formatted bibliography via ONLYOFFICE DocumentBuilder API (`InsertAndReplaceContentControls`).
- Created `scripts/docbuilder-helper.js` for modular HTML-to-DocBuilder script parsing with italic/bold runs, entity decoding, and plain text fallback.
- Added dynamic hanging indent formatting according to CSL style metadata (`params.hangingindent`).
- Supported atomic in-place updating of existing `MENDELEY_BIBLIOGRAPHY` Content Controls.
- Added unit test suite in `tests/docbuilder.test.js`.
- Fixed note/footnote citations: append inline content control (`ApiInlineLvlSdt`) directly to footnote paragraph (`GetFootnotesFirstParagraphs`) so citation text appears immediately beside footnote number without line break.
- Preserved CSL italic and bold formatting in note/footnote citations by rendering each CSL text run as an `ApiRun` inside inline Content Control.
- Decoded CSL HTML/XML entities before inserting normal citations, fixing APA `&#38;` output to render as `&`.

## 1.0.4
- Refactored and modularized monolithic `scripts/code.js` (2,250 lines) into 19 single-responsibility modules.
- Implemented max 300 lines of code limit per file across all modules.
- Added Redux state management store (`scripts/store.js`) and JSON structured logger (`scripts/logger.js`).
- Separated concerns into helpers, constants, CSL converters, CSL loaders, auth, UI controls, citation drawers, document card builder, and event bindings.
- Added unit test suite in `tests/modules.test.js`.

## 1.0.3
- Fixed content control placeholder bug: pass `PlaceHolderText` with rendered citation text directly to `AddContentControl` (derived from ONLYOFFICE SDK `readContentControlCommonPr`), preventing default "Your text here".
- Replaced invalid `ctrl.GetRange()` calls on `ApiInlineLvlSdt` inside `callCommand` with official `InsertAndReplaceContentControls` targeting `InternalId`.
- Switched bibliography HTML updates to `SelectContentControl` + `PasteHtml`.
- Added regression test in `tests/document.test.js` asserting `PlaceHolderText` propagation.

## 1.0.2
- Deep DocumentModule introduced at Document Seam (`scripts/document.js`).
- Added OnlyOfficeAdapter and InMemoryAdapter for automated testability outside Document Server.
- Encapsulated Base64 citation metadata serialization (v3 schema) and script commands.
- Rewired `scripts/code.js` citation insertion, update, and unlink workflows to use DocumentModule.
- Added unit test suite in `tests/document.test.js`.
- Replaced all UI emojis and text arrows across menus, toolbars, and drawers with scalable SVG icons.
- Fixed infinite scroll for library and filter views (targeted scrollable `#docsWrapper` container with threshold check and native scroll events).
- Removed phantom `docsThumb` spacer div that caused empty blank space below list and resolved self-lockout in debounce timer.
- Fixed OAuth token handling: robust parameter parsing in `oauth.html`, automatic 401 session reset, eliminated duplicate startup calls, and prevented stale token lockout.
- Fixed "Insert Bibliography" detection: query both `GetAllAddinFields` and `GetAllContentControls` in ONLYOFFICE, add lazy adapter binding, and implement fallback text scanner matching Mendeley library documents.
- Switched citations to native inline Content Controls (`AddContentControl` type 2) with visible bounding block/brackets instead of Addin Field hover shading.
- Fixed bibliography rendering: wrap bibliography in block Content Control (`AddContentControl` type 1) and use `PasteHtml` to render rich typography (italics, formatting) without raw `<div class="csl-entry">` tags.

## 1.0.0
- Initial release