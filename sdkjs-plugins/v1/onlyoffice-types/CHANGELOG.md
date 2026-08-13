# Changelog

## 0.9.0

- Added `SetButtonDisabled` (Word/Cell/Slide), `RemoveAddinField`, `IsFillingForm`,
  `IsFillingPdfForm`, `IsEditingPdfForm`, `IsFormSigned`, `GetOFormRole`, `MoveCursorToAnnotationRange`,
  `SetParagraphHtml` (Word), and `InsertPresentationFromUrl`/`AnnotateParagraph`/
  `SelectAnnotationRange`/`RemoveAnnotationRange` (Slide) to `executeMethod` - all documented via
  `@alias` in sdkjs's own JSDoc (`common/apiBase_plugins.js`, `<editor>/api_plugins.js`,
  `sdkjs-ext/<editor>/api_plugins.js`) but missing from the hand-maintained method-arg types.
- Added `src/forms-methods.d.ts` (`FormsMethodArgs`/`FormsMethodName`/`FormsMethodReturn`) - the Form
  editor's `executeMethod` surface had no types at all before this, including the common
  cross-editor methods (`PasteHtml`, `ShowButton`, `GetVersion`, ...) that apply to every editor via
  `common/apiBase_plugins.js`.
- Added `onEnableMouseEvent`/`onChangeRestrictions` to `PluginEventMap`, and typed `onClick`'s payload
  as `isSelectionUse: boolean` instead of `unknown` - per `common/base-plugin-events.js`'s JSDoc.
- Added `scripts/check-plugin-methods.js` (`npm run check-plugin-methods`) - a drift check (not a
  generator) that diffs sdkjs's own documented `executeMethod` names/plugin events against
  `src/*-methods.d.ts`/`PluginEventMap`, so a method or event ONLYOFFICE documents later doesn't
  silently stay untyped. Deliberately excludes anything sdkjs itself marks `@undocumented`.

- **Every generated member is now documented.** The generator collected method, parameter and return
  descriptions all along and then emitted a bare signature: 2012 methods across the five editor
  namespaces had no JSDoc at all, and the only comments present - on classes and typedefs - were the
  whole description flattened into a single line, runnable example and all, which no editor could
  render usefully. Members now carry a multi-line block with the description, `@param`/`@returns`,
  `@since` where sdkjs records it, `@example` from the docs' "## Try it" snippet, and `@see` linking
  to the member's page on api.onlyoffice.com. The link is derived from the `@see
  office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js` path already in the JSDoc rather than
  assembled from a hand-written table, so it can't point at a page that doesn't exist. Inline HTML in
  the prose (`<b>"tile"</b>`) is translated to markdown, and a `*/` occurring in a description or
  example is escaped instead of ending the comment early.
- Parameter prose is merged from the `office-js-api-declarations` snapshot by parameter *name*: the
  snapshot occasionally documents a different arity than the current sdkjs signature has, and a
  positional merge would then attach one parameter's description to another.
- JSDoc's `{*}` wildcard type (as in `@property {*} FormValue`) now maps to `unknown` instead of being
  emitted verbatim as `*`, which was not valid TypeScript.
- The ambient bundle is now one base file plus four ~10-line per-editor `Api` addons
  (`onlyoffice-plugins-types.<editor>-api.ambient.d.ts`) instead of five near-identical
  self-contained copies. With per-method JSDoc each copy is a few megabytes, so the five-copy layout
  meant ~21 MB rewritten in git on every regeneration for content that differs by ten lines. Load the
  base bundle first, then exactly one addon. The unwrapped `declare global` block is also dedented now
  rather than keeping the wrapper's indentation.

## 0.8.0

Initial public release.

- The root package no longer declares a cross-editor global `Api` intersection. Editor-specific entry points (`/word`, `/cell`, `/slide`, `/pdf`) now declare the matching `Api` type for `callCommand`. **If your code referenced the bare global `Api`, add a local `declare const Api: Word.Api;` (or Cell/Slide/Pdf) to each file that uses it, or `import "onlyoffice-plugins-api/<editor>"` once for its ambient global.**
- `PluginScope.prototype` is optional, not required - plugins routinely replace `Asc.scope` wholesale with a plain data payload before `callCommand` (`window.Asc.scope = { foo: 1 }`), and that payload has no reason to carry `prototype.clear` (it's only ever set once at runtime bootstrap as an author convenience, never read back by the runtime itself).
- Added public plugin menu APIs: context menu, toolbar, window header, and content-control button registration plus click handlers.
- Added a typed plugin event map for common events, with an `unknown[]` fallback for undocumented event names.
- Added a separate `Pdf` namespace and PDF Plugin API method definitions, including `GetPageImage`, `GoToPage`, and `ReplacePageContent`; `Forms` remains the Form API namespace.
- Fixed generated type reference detection so string enum values and object property names no longer produce fake type stubs. Generated files now contain no `any` occurrences; unresolved references are reported in `src/generated/api-report.json`.
- PDF is now included in the generator and shared Word API sources are loaded for PDF cross-references.
- Added pinned local legacy documentation snapshots, `generation-manifest.json`, and `check-generated`; generation no longer depends on network availability.
- Added a static Level 2 runtime contract checker for public `Asc.plugin`, `Asc.Buttons`, button constructors, and `Asc.scope.prototype.clear` against `plugins.dev.js` (the unminified runtime - its qualified names like `window.Asc.plugin.X` stay stable across rebuilds, unlike the minified `plugins.js`'s single-letter aliases).
- Added `Asc.plugin.guid`, `windowID`, and custom menu click handler properties to the runtime declarations.
- Added modular type-only entry points for `plugin`, `config`, and `services` while preserving the root API.
- Types generated from ONLYOFFICE's own `sdkjs` JSDoc (`Api`, document/spreadsheet/presentation/
  form object models), enriched with `office-js-api-declarations`' richer descriptions and
  runnable examples where a class/method name matches.
- Word, Cell, Slide, and Forms are each namespaced (`Word.*`, `Cell.*`, `Slide.*`, `Forms.*`), so
  every type is reachable and disambiguated regardless of which editor a plugin targets.
- `window.Asc.plugin.executeMethod` typed per method name and argument tuple
  for Word, Cell, and Slide (`WordMethodArgs`/`CellMethodArgs`/`SlideMethodArgs`).
- `window.Asc.plugin.attachEditorEvent`/`detachEditorEvent` typed per editor event name and payload
  (`Word.EditorEventArgs`/`Cell.EditorEventArgs`/`Slide.EditorEventArgs`/`Forms.EditorEventArgs`),
  parsed from each editor's own `plugin-events.js`.
- Class inheritance (`@extends`, e.g. `ApiOleObject`/`ApiShape`/`ApiImage` extending `ApiDrawing`)
  is now modeled as real TS `interface ... extends ...` - previously every drawing/color/text-run
  subclass across all four editors was silently missing its entire base class's members (~100
  interfaces affected).
- Real-example regression tests for every method in `WordMethodArgs`/`CellMethodArgs`/
  `SlideMethodArgs`, copied from ONLYOFFICE's own docs and type-checked (`test/*-methods-original-
  examples.js`) - caught and fixed several signature mismatches against the live docs along the way
  (e.g. `Slide.ShowError`'s params, `GetSelectedText`'s options shape, `GetImageDataFromSelection`'s
  return shape for Cell and Slide).
- Added `attachEditorEvent`/`detachEditorEvent` overloads for `Pdf.EditorEventName` (`onSelectionEnd`,
  `onSelectionCancel`) - previously only Word/Cell/Slide/Forms were covered, so PDF fell through to
  the untyped fallback.
- Physically split `AscPlugin`, `PluginEventMap`, `PluginWindow`, `Buttons`, `PluginConfig`,
  `VariationConfig`, `AscDesktopEditor`, `AscSimpleRequest`, and `AscTheme` (and their supporting
  types) out of `index.d.ts` into dedicated modules (`src/plugin/plugin.d.ts`, `src/plugin/events.d.ts`,
  `src/plugin/buttons.d.ts`, `src/config/plugin-config.d.ts`, `src/theme/index.d.ts`,
  `src/services/desktop-editor.d.ts`, `src/services/simple-request.d.ts`). `index.d.ts` is now a
  genuine barrel file (127 lines, down from 1031) that only imports and re-exports; each type has
  exactly one physical home instead of being declared inline with the earlier modules re-exporting it.
- Added `schemas/config.schema.json`, a JSON Schema for `config.json` generated from
  `PluginConfig`/`VariationConfig`/`ButtonConfig`/`IconConfig` (`npm run generate-schema`). Validating
  it against every real `config.json` in this monorepo (`npm run validate-schema`) surfaced and fixed
  real gaps in those types: `VariationConfig.buttons`/`isVisual` are optional (routinely omitted in
  practice), `icons2` entries can carry `style`/`theme`/`default`, `VariationConfig` can carry
  `methods`/`screens`/`isNeedNumbering`, `icons` can hold the same rich per-scale shape as `icons2`,
  and `PluginConfig` can carry `help`/`onlyofficeScheme`/`manifestVersion`. 51/53 real config.json
  files now validate cleanly; the remaining 2 have genuine mistakes in those specific plugins,
  tracked in `validate-config-schema.js`'s `KNOWN_ISSUES`.
