# Changelog

## 0.9.0

### Breaking

- Package renamed `onlyoffice-plugins-api` → `@onlyoffice/plugins-types` (the old name was never
  published; update `types` in `tsconfig.json` and import paths).
- Relicensed AGPL-3.0-or-later → Apache-2.0, matching `@onlyoffice/doceditor-types`. The editors
  themselves (`sdkjs`) stay AGPL-3.0-or-later.
- Ambient bundles are now one base `onlyoffice-plugins-types.ambient.d.ts` plus ~10-line per-editor
  `...<editor>-api.ambient.d.ts` addons instead of five self-contained copies. Load the base first,
  then exactly one addon.
- Hand-written `src/*-methods.d.ts` replaced by generated `src/generated/*-methods.ts`.

### Added

- JSDoc on every generated member: description, `@param`/`@returns`, `@since`, `@example` (from the
  docs' "Try it" snippets) and `@see` → api.onlyoffice.com. The 2012 methods previously had no
  documentation at all; class/typedef comments were single-line and unreadable in hovers.
- `dist/api-index.json` - the whole API surface (classes, typedefs, events, `executeMethod`s) as
  JSON with signatures, docs, examples and `docsUrl`, for search/RAG/coding agents. Shipped in the
  package (`@onlyoffice/plugins-types/api-index.json`) and tracked in git.
- `AGENTS.md` - the plugin-authoring contract and development invariants, for coding agents.
- The `executeMethod` surface is now generated from sdkjs JSDoc
  (`scripts/generate-plugin-methods.js`), adding the entire missing `FormsMethodArgs` family and
  per-editor gaps (`SetButtonDisabled`, `IsFillingForm`/`IsFillingPdfForm`, `SetParagraphHtml`,
  `InsertPresentationFromUrl`, ...). JSDoc/signature contradictions are resolved via documented
  override tables in the generator.
- `onEnableMouseEvent`/`onChangeRestrictions` in `PluginEventMap`; `onClick` payload typed as
  `isSelectionUse: boolean`.
- 23 more `PluginEventMap` entries, sourced from each editor's own `<editor>/plugin-events.js` /
  `sdkjs-forms/plugin-events.js` (previously only `common/base-plugin-events.js` was checked):
  Word's `onAddComment`, `onChangeCommentData`, `onChangeCurrentPage`, `onRemoveComment`,
  `onSubmitForm`, `onFocusContentControl`, `onBlurContentControl`, `onChangeContentControl`,
  `onHideContentControlTrack`, `onShowContentControlTrack`, `onInsertOleObjects`,
  `onBlurAnnotation`, `onFocusAnnotation`, `onClickAnnotation`, `onParagraphText`; Cell's
  `onChangeCurrentSheet`; Slide's `onChangeCurrentSlide`, `onSlideShowBegin`, `onSlideShowEnd`,
  `onSlideShowNextSlide`, `onSlideShowSlideChanged`; Pdf's `onSelectionEnd`, `onSelectionCancel`.
  The Word-only payloads reuse `ContentControl`/`comment`/`TextAnnotation`/`TextAnnotationRange`
  from `src/generated/word-methods.ts` rather than duplicating those shapes by hand.

### Fixed

- JSDoc's `{*}` wildcard now maps to `unknown` instead of invalid `*` in the output.
- The ambient bundle resolves shared/cross-file typedefs (`comment`, `FormsMethodArgs`, per-editor
  `CommentData`) into the global scope instead of missing or duplicating them.

### Changed

- `check-plugin-methods.js` → `check-plugin-events.js`: the `executeMethod`-name half is superseded
  by the generator plus `check-generated`; the surviving events check now also reads every editor's
  own `plugin-events.js` (previously only the common file), which is what surfaced the 23 events
  added above.

## 0.8.0

Initial public release.

### Breaking

- The root package no longer declares a cross-editor global `Api`. Each editor entry point (`/word`,
  `/cell`, `/slide`, `/pdf`) declares its own. If you referenced the bare global `Api`, add
  `declare const Api: Word.Api;` (or Cell/Slide/Pdf) per file, or `import ".../<editor>"` once.
- `PluginScope.prototype` is optional - plugins routinely replace `Asc.scope` with a plain payload.

### Added

- One namespace per editor (`Word`, `Cell`, `Slide`, `Forms`), so same-named classes never collide.
- `Pdf` namespace and PDF plugin API methods (`GetPageImage`, `GoToPage`, `ReplacePageContent`).
- Plugin menu APIs: context menu, toolbar, window header, content-control buttons, click handlers.
- Typed plugin event map with an `unknown[]` fallback for undocumented event names.
- `executeMethod` typed per method name/argument tuple (Word/Cell/Slide);
  `attachEditorEvent`/`detachEditorEvent` typed per editor event (including Pdf `onSelectionEnd`/
  `onSelectionCancel`).
- `Asc.plugin.guid`, `windowID` and custom menu click handler declarations.
- Modular entry points `/plugin`, `/config`, `/services`; `index.d.ts` is now a pure barrel file
  (1031 → 127 lines).
- `schemas/config.schema.json` generated from the `PluginConfig` types (`npm run generate-schema`),
  validated against every real `config.json` in this monorepo (`npm run validate-schema`).
- Pinned offline documentation snapshots, `generation-manifest.json` and `check-generated` -
  generation no longer needs the network.
- `npm run check-runtime`: static contract check of `Asc.plugin`/`Asc.Buttons`/button constructors
  against `plugins.dev.js`.
- Regression tests type-checking the official docs' own examples
  (`test/*-methods-original-examples.js`).

### Fixed

- Class inheritance modeled as real `interface ... extends ...` - ~100 subclasses (drawings, forms,
  ...) previously missed their entire base class's members.
- String enum values and object property names no longer produce fake type stubs; generated files
  contain no `any` (tracked in `src/generated/api-report.json`).
- Signature mismatches against the live docs (`Slide.ShowError` params, `GetSelectedText` options,
  `GetImageDataFromSelection` return shape for Cell/Slide).
