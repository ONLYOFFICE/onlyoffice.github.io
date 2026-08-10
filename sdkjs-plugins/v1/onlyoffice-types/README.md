# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

For the official plugin API reference, guides, and examples (not TypeScript-specific), see
[api.onlyoffice.com/docs/plugins/get-started](https://api.onlyoffice.com/docs/plugins/get-started/).
This package only adds TypeScript types on top of that API.

## Installation

```bash
npm install onlyoffice-plugins-api
```

## Usage

### For Plugins

Add the root package and the entry point for the editor your plugin supports to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["onlyoffice-plugins-api", "onlyoffice-plugins-api/word"]
  }
}
```

Use `/word`, `/cell`, `/slide`, or `/pdf`. The editor entry point declares the matching global `Api` type inside `callCommand`; the root package intentionally does not declare a cross-editor `Api` intersection.

Alternatively, reference the entry point directly in a TypeScript file:

```typescript
/// <reference types="onlyoffice-plugins-api/word" />
```

### Example Plugin

```typescript
// plugin.ts
window.Asc.plugin.init = function() {
    console.log('Plugin initialized');
    
    // Use Document API
    window.Asc.plugin.callCommand(function() {
        const doc = Api.GetDocument();
        const para = Api.CreateParagraph();
        para.AddText('Hello from plugin!');
        doc.InsertContent([para]);
    }, true);
};

window.Asc.plugin.button = function(id) {
    console.log('Button clicked:', id);
};

// Get selected text
window.Asc.plugin.executeMethod("GetSelectedText", [], function (text) {
    console.log('Selected:', text);
});
```

## API Types

- **Plugin API**: `window.Asc.plugin` - Main plugin interface (`window.Api` inside `callCommand`)
- **Plugin menus**: `Asc.Buttons`, `ButtonContextMenu`, `ButtonToolbar`, `ButtonContentControl`, and `ButtonWindowHeader`
- **Word namespace**: Types for text documents (generated from the ONLYOFFICE `sdkjs` JSDoc)
- **Cell namespace**: Types for spreadsheets
- **Slide namespace**: Types for presentations
- **Forms namespace**: Types for form fields and Form API objects
- **PDF namespace**: PDF Editor object model and PDF-specific `executeMethod` methods

Every editor's API is generated into its own TypeScript `namespace` (`Word`, `Cell`, `Slide`, `Forms`, `Pdf`). The root package does not declare a global `Api`; select the editor-specific entry point (`/word`, `/cell`, `/slide`, or `/pdf`) for that global inside `callCommand`.

Any type from any editor is importable regardless of which editor the current plugin targets -
same-named classes across editors don't collide, so the same `onlyoffice-plugins-api` import
works no matter which editor entry point your `tsconfig.json` declares. Each snippet below is a
separate plugin/file targeting its own editor - only include the matching entry point
(`/word`, `/cell`, `/slide`, or `/pdf`) in a given `tsconfig.json`; combining more than one in the
same project makes the global `Api` declarations collide.

```typescript
import type { Word } from "onlyoffice-plugins-api/word";

window.Asc.plugin.callCommand(function() {
    const wordApi: Word.Api = Api;
    const paragraphs = wordApi.GetDocument().GetAllParagraphs();
    console.log(paragraphs[0].GetText());
});
```

```typescript
import type { Cell } from "onlyoffice-plugins-api/cell";

window.Asc.plugin.callCommand(function() {
    const cellApi: Cell.Api = Api;
    const cell = cellApi.GetActiveSheet().GetRangeByNumber(0, 0);
    console.log(cell.GetValue());
});
```

```typescript
import type { Slide } from "onlyoffice-plugins-api/slide";

window.Asc.plugin.callCommand(function() {
    const slideApi: Slide.Api = Api;
    const slide = slideApi.GetPresentation().GetCurrentSlide();
    console.log(slide.GetSlideIndex());
});
```

```typescript
import type { Pdf } from "onlyoffice-plugins-api/pdf";

window.Asc.plugin.callCommand(function() {
    const doc: Pdf.ApiDocument = Api.GetDocument();
    console.log(doc.GetPagesCount());
});
```

`Api<T>` resolves the entry-point class for a given editor kind (`"word" | "cell" | "slide" | "pdf"`),
equivalent to `Word.Api`/`Cell.Api`/`Slide.Api`/`Pdf.Api`:

```typescript
// Word plugin - include `onlyoffice-plugins-api/word` in tsconfig.json.
import type { Api } from "onlyoffice-plugins-api";

window.Asc.plugin.callCommand(function() {
    const wordApi: Api<"word"> = Api;
    const doc = wordApi.GetDocument();
});
```

`window.Asc.plugin.executeMethod` is typed for Word, Cell, Slide, and PDF method
names and their argument tuples (`WordMethodArgs`/`CellMethodArgs`/`SlideMethodArgs`/`PdfMethodArgs` in `src/`).

> `GetMacros` (all four editors) returns a raw JSON **string** - parse it yourself with
> `JSON.parse(result)` to get `{ current: number, macrosArray: {...}[] }`, matching the official
> docs example.

`window.Asc.plugin.attachEditorEvent`/`detachEditorEvent` are typed the same way, per editor, from
each editor's own `plugin-events.js` (`Word.EditorEventArgs`/`Cell.EditorEventArgs`/
`Slide.EditorEventArgs`/`Forms.EditorEventArgs`) - a known event name gives its callback the real
payload shape instead of `any`:

```typescript
window.Asc.plugin.attachEditorEvent("onParagraphAdd", (data) => {
    console.log(data.InternalId); // data: { InternalId: string }
});
```

Common plugin event names such as `onContextMenuShow`, `onWindowResize`, and input-helper events
are represented in `PluginEventMap`. `onContextMenuShow` has a documented payload shape; events whose
payload varies by editor version use `unknown` until their runtime contract is confirmed. Unknown
event names retain a fallback overload with `unknown[]` arguments rather than `any`.

## Generating Types

The generator parses the JSDoc comments straight out of a local `sdkjs` (and `sdkjs-forms`) checkout
using the `jsdoc` package, rather than fetching a prebuilt snapshot over the network - this picks up
API changes immediately and avoids a few data-quality bugs in stale snapshots (e.g. duplicated method
entries with a corrupted return type).

```bash
SDKJS_PATH=/path/to/sdkjs npm run generate
```

PowerShell:

```powershell
$env:SDKJS_PATH = "C:\path\to\sdkjs"
$env:SDKJS_FORMS_PATH = "C:\path\to\sdkjs-forms"
npm run generate
```

`sdkjs-forms` is expected next to `sdkjs` by default (`SDKJS_PATH/../sdkjs-forms`); override with
`SDKJS_FORMS_PATH` or `--sdkjs-forms <path>` if it lives elsewhere. `--sdkjs <path>` works instead of
the env var too. The generator records source commits and file hashes in
`src/generated/generation-manifest.json`.

The legacy documentation snapshots are stored in `scripts/legacy-api/` and pinned to the commit
recorded in `src/generated/generation-manifest.json`. Generation is fully offline and fails if a
snapshot is missing or invalid. To update the snapshots, download the four JSON files from the new
pinned commit, review the diff, regenerate the types, and commit the snapshots together with the
updated manifest.

sdkjs is the structural source of truth (classes, methods, params - it can't drift from the actual
runtime), while the local `office-js-api-declarations` snapshots provide richer descriptions and
runnable examples wherever a class/method name matches.

## Type-checking

```bash
npm run check-runtime # checks Asc.plugin/Asc.Buttons declarations against plugins.dev.js
npm run typecheck      # checks index.d.ts + src/generated/*.ts + src/*.d.ts
npm test               # also type-checks example.js and test/*.js against the library
```

`check-runtime` is a static Level 2 check: it verifies public `Asc.plugin` members (`guid`,
`windowID`, event handlers, and registration methods), `Asc.Buttons`, button constructors, and
`Asc.scope.prototype.clear` against the checked-in `sdkjs-plugins/v1/plugins.dev.js` (the
unminified runtime - its qualified names like `window.Asc.plugin.X` stay stable across rebuilds,
unlike the minified `plugins.js`'s single-letter aliases). It does not launch an editor or verify
host-provided `executeMethod` behavior; those require a real browser/Desktop Editor smoke test.

Run these after editing any `.d.ts` file or regenerating types - `skipLibCheck` is intentionally
off in `tsconfig.json` so mistakes in the declaration files themselves (e.g. a type that isn't
actually exported) surface immediately instead of being silently ignored.

## config.json Schema

`schemas/config.schema.json` is a JSON Schema for a plugin's `config.json`, generated straight from
`PluginConfig`/`VariationConfig`/`ButtonConfig`/etc. in `index.d.ts` (`npm run generate-schema`) -
it can't drift from the TS types describing the same shape. Point your editor at it for validation
and autocomplete by adding a `$schema` field to your `config.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/sdkjs-plugins/v1/onlyoffice-types/schemas/config.schema.json",
  "name": "My Plugin",
  ...
}
```

or, without editing every `config.json`, map the pattern once in your editor's settings (VS Code:
`json.schemas` in `settings.json`, pointing the schema at `sdkjs-plugins/content/*/config.json`).

`npm run validate-schema` checks the schema against every real `config.json` already in this
monorepo (`sdkjs-plugins/content/*/config.json`) - not part of `npm test` since it needs that
sibling directory, which only exists inside this checkout. A small `KNOWN_ISSUES` allowlist in the
script tracks the couple of plugins whose `config.json` has a genuine mistake (a misplaced field, a
typo) rather than a schema gap; anything else that fails is a real regression.

## Modular entry points

The root package remains the compatibility entry point. The same runtime types are also available by
layer for better discoverability and smaller imports:

```typescript
import type { AscPlugin } from "onlyoffice-plugins-api/plugin/plugin";
import type { PluginEventMap } from "onlyoffice-plugins-api/plugin/events";
import type { Buttons } from "onlyoffice-plugins-api/plugin/buttons";
import type { PluginConfig } from "onlyoffice-plugins-api/config";
import type { AscDesktopEditor } from "onlyoffice-plugins-api/services";
```

Available layer entry points:

```text
onlyoffice-plugins-api/plugin           # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo, events, buttons (everything)
onlyoffice-plugins-api/plugin/plugin    # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo only
onlyoffice-plugins-api/plugin/events    # PluginEventMap and plugin-window-level event types only
onlyoffice-plugins-api/plugin/buttons   # Buttons and its ButtonBase subtypes only
onlyoffice-plugins-api/config           # PluginConfig, VariationConfig, ButtonConfig, IconConfig, ...
onlyoffice-plugins-api/services         # AscDesktopEditor, AscSimpleRequest
```

These are type-only re-exports of the same declarations used by the root package, so existing root
imports remain compatible.

## Project Structure

```
onlyoffice-types/
├── index.d.ts            # Barrel file: imports every module below and re-exports the public API
├── src/
│   ├── generated/        # Auto-generated Office API types, one namespace per editor
│   │   ├── word.ts        # namespace Word { ... }
│   │   ├── cell.ts        # namespace Cell { ... }
│   │   ├── slide.ts       # namespace Slide { ... }
│   │   ├── forms.ts       # namespace Forms { ... }
│   │   ├── pdf.ts         # namespace Pdf { ... }
│   │   └── api-report.json # unresolved type and any report
│   ├── word-methods.d.ts  # executeMethod names/args/returns for Word
│   ├── cell-methods.d.ts  # executeMethod names/args/returns for Cell
│   ├── slide-methods.d.ts # executeMethod names/args/returns for Slide
│   ├── pdf-methods.d.ts   # executeMethod names/args/returns for PDF
│   ├── editors/            # /word, /cell, /slide, /pdf entry points (declare each editor's global Api)
│   │   ├── word.d.ts
│   │   ├── cell.d.ts
│   │   ├── slide.d.ts
│   │   └── pdf.d.ts
│   ├── theme/
│   │   └── index.d.ts      # AscTheme, KnownThemeName
│   ├── config/
│   │   ├── plugin-config.d.ts # PluginConfig, VariationConfig, ButtonConfig, IconConfig, ...
│   │   └── index.d.ts         # re-exports plugin-config.d.ts - the /config entry point
│   ├── plugin/
│   │   ├── plugin.d.ts     # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo (the hub module)
│   │   ├── events.d.ts     # PluginEventMap and plugin-window-level event types
│   │   ├── buttons.d.ts    # Buttons, ButtonBase and its Toolbar/ContextMenu/... subtypes
│   │   └── index.d.ts      # re-exports the three files above - the /plugin entry point
│   └── services/
│       ├── desktop-editor.d.ts  # AscDesktopEditor
│       ├── simple-request.d.ts  # AscSimpleRequest
│       └── index.d.ts           # re-exports both - the /services entry point
├── schemas/
│   └── config.schema.json
├── scripts/
│   └── generate-types.js
├── tsconfig.json           # builds/typechecks the library itself
├── tsconfig.typecheck.json # also typechecks example.js + test/*.js
├── example.js             # Usage examples
├── test/                  # Call-shape smoke tests copied from the official docs
└── package.json
```

Each interface/type is physically declared in exactly one module (e.g. `AscPlugin` lives in
`src/plugin/plugin.d.ts`, `AscTheme` in `src/theme/index.d.ts`); `index.d.ts` only imports and
re-exports them, so it stays a genuine barrel file rather than a second copy of the same content.
Each of `src/plugin/`, `src/config/`, `src/services/`, and `src/theme/` has its own `index.d.ts` that
re-exports everything in that directory - that's what the [modular entry points](#modular-entry-points)
(`onlyoffice-plugins-api/plugin`, `/config`, `/services`) resolve to; `onlyoffice-plugins-api/plugin/*`
resolves directly to the individual file (e.g. `/plugin/events` → `src/plugin/events.d.ts`).
