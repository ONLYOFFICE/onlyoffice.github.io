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
        const Api = (window as any).Api;
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
window.Asc.plugin.getSelectedText(function(text) {
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
same-named classes across editors don't collide, and you
can reference another editor's types from shared/helper code:

```typescript
import type { Word, Cell, Slide, Pdf } from "onlyoffice-plugins-api";

function logParagraph(p: Word.ApiParagraph) { /* ... */ }
function fillCell(r: Cell.ApiRange) { /* ... */ }
function firstSlide(pres: Slide.ApiPresentation): Slide.ApiSlide { /* ... */ }
function usePdfApi(api: Pdf.Api) { return api.GetDocument(); }
```

`Api<T>` resolves the entry-point class for a given editor kind (`"word" | "cell" | "slide" | "pdf"`),
equivalent to `Word.Api`/`Cell.Api`/`Slide.Api`/`Pdf.Api`:

```typescript
import type { Api } from "onlyoffice-plugins-api";

function useWordApi(api: Api<"word">) {
    const doc = api.GetDocument();
}
```

`window.Asc.plugin.executeMethod` is typed for Word, Cell, and Slide method
names and their argument tuples (`WordMethodArgs`/`CellMethodArgs`/`SlideMethodArgs` in `src/`).

> `GetMacros` (all three editors) returns a raw JSON **string** - parse it yourself with
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
import type { AscPlugin } from "onlyoffice-plugins-api/plugin/asc-plugin";
import type { PluginEventMap } from "onlyoffice-plugins-api/plugin/events";
import type { PluginConfig } from "onlyoffice-plugins-api/config";
import type { AscDesktopEditor } from "onlyoffice-plugins-api/services/desktop-editor";
```

Available layer entry points:

```text
onlyoffice-plugins-api/plugin
onlyoffice-plugins-api/plugin/events
onlyoffice-plugins-api/plugin/menus
onlyoffice-plugins-api/plugin/windows
onlyoffice-plugins-api/config
onlyoffice-plugins-api/services
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
│   ├── theme/
│   │   └── index.d.ts      # AscTheme, KnownThemeName
│   ├── config/
│   │   └── plugin-config.d.ts # PluginConfig, VariationConfig, ButtonConfig, IconConfig, ...
│   ├── plugin/
│   │   ├── events.d.ts     # PluginEventMap and plugin-window-level event types
│   │   ├── buttons.d.ts    # Buttons, ButtonBase and its Toolbar/ContextMenu/... subtypes
│   │   ├── plugin.d.ts     # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo (the hub module)
│   │   └── index.d.ts, asc.d.ts, asc-plugin.d.ts, menus.d.ts, windows.d.ts # modular entry-point facades (see below)
│   └── services/
│       ├── desktop-editor.d.ts  # AscDesktopEditor
│       ├── simple-request.d.ts  # AscSimpleRequest
│       └── index.d.ts           # modular entry-point facade
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
The `src/plugin/asc.d.ts`/`asc-plugin.d.ts`/`menus.d.ts`/`windows.d.ts`/`services/index.d.ts` files
are the pre-existing [modular entry points](#modular-entry-points) - thin facades kept for the
`onlyoffice-plugins-api/plugin/*` import paths, re-exporting from the modules above.
