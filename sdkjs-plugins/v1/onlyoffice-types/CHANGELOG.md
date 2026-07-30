# Changelog

## 0.8.0

Initial public release.

- The root package no longer declares a cross-editor global `Api` intersection. Editor-specific entry points (`/word`, `/cell`, `/slide`, `/pdf`) now declare the matching `Api` type for `callCommand`.
- Added public plugin menu APIs: context menu, toolbar, window header, and content-control button registration plus click handlers.
- Added a typed plugin event map for common events, with an `unknown[]` fallback for undocumented event names.
- Added a separate `Pdf` namespace and PDF Plugin API method definitions, including `GetPageImage`, `GoToPage`, and `ReplacePageContent`; `Forms` remains the Form API namespace.
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
