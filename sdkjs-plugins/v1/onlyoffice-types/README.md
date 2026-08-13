# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

For the official plugin API reference, guides, and examples (not TypeScript-specific), see
[api.onlyoffice.com/docs/plugins/get-started](https://api.onlyoffice.com/docs/plugins/get-started/).
This package only adds TypeScript types on top of that API.

## Installation

```bash
npm install @onlyoffice/plugins-types
```

## Usage

### For Plugins

Add the root package and the entry point for the editor your plugin supports to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@onlyoffice/plugins-types", "@onlyoffice/plugins-types/word"]
  }
}
```

Use `/word`, `/cell`, `/slide`, or `/pdf`. The editor entry point declares the matching global `Api` type inside `callCommand`; the root package intentionally does not declare a cross-editor `Api` intersection.

Alternatively, reference the entry point directly in a TypeScript file:

```typescript
/// <reference types="@onlyoffice/plugins-types/word" />
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
same-named classes across editors don't collide, so the same `@onlyoffice/plugins-types` import
works no matter which editor entry point your `tsconfig.json` declares. Each snippet below is a
separate plugin/file targeting its own editor - only include the matching entry point
(`/word`, `/cell`, `/slide`, or `/pdf`) in a given `tsconfig.json`; combining more than one in the
same project makes the global `Api` declarations collide.

```typescript
import type { Word } from "@onlyoffice/plugins-types/word";

window.Asc.plugin.callCommand(function() {
    const wordApi: Word.Api = Api;
    const paragraphs = wordApi.GetDocument().GetAllParagraphs();
    console.log(paragraphs[0].GetText());
});
```

```typescript
import type { Cell } from "@onlyoffice/plugins-types/cell";

window.Asc.plugin.callCommand(function() {
    const cellApi: Cell.Api = Api;
    const cell = cellApi.GetActiveSheet().GetRangeByNumber(0, 0);
    console.log(cell.GetValue());
});
```

```typescript
import type { Slide } from "@onlyoffice/plugins-types/slide";

window.Asc.plugin.callCommand(function() {
    const slideApi: Slide.Api = Api;
    const slide = slideApi.GetPresentation().GetCurrentSlide();
    console.log(slide.GetSlideIndex());
});
```

```typescript
import type { Pdf } from "@onlyoffice/plugins-types/pdf";

window.Asc.plugin.callCommand(function() {
    const doc: Pdf.ApiDocument = Api.GetDocument();
    console.log(doc.GetPagesCount());
});
```

`Api<T>` resolves the entry-point class for a given editor kind (`"word" | "cell" | "slide" | "pdf"`),
equivalent to `Word.Api`/`Cell.Api`/`Slide.Api`/`Pdf.Api`:

```typescript
// Word plugin - include `@onlyoffice/plugins-types/word` in tsconfig.json.
import type { Api } from "@onlyoffice/plugins-types";

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

`npm run generate` only regenerates the Api object model (`src/generated/{word,cell,slide,pdf,forms}.ts`).
The `Asc.plugin.executeMethod` surface (`src/generated/*-methods.ts` - `<Editor>MethodArgs`/
`MethodName`/`MethodReturn`) is a separate generator, `scripts/generate-plugin-methods.js`, parsing
`Api.prototype["pluginMethod_<Name>"]` doclets from the same sdkjs/sdkjs-forms checkout plus
`sdkjs-ext` (`SDKJS_EXT_PATH`, defaults to `SDKJS_PATH/../sdkjs-ext`, for the handful of methods only
sdkjs-ext documents for word/slide):

```bash
SDKJS_PATH=/path/to/sdkjs npm run generate-plugin-methods
```

It runs automatically as part of `postgenerate` (see [Ambient bundle](#ambient-bundle-non-npm-consumers)
below), so a plain `npm run generate` regenerates both halves together. Where sdkjs's own JSDoc gives
no usable signal at all, or contradicts real, documented `executeMethod` call examples, a small set of
override tables at the top of the script (`OPTIONAL_PROPERTY_OVERRIDES`, `TYPE_OVERRIDES`,
`TYPEDEF_TYPE_OVERRIDES`, `METHOD_OVERRIDES`) correct the generated shape - each entry is commented
with the specific example it was derived from, so before adding a new one, check whether the
mismatch is already covered.

The legacy documentation snapshots are stored in `scripts/legacy-api/` and pinned to the commit
recorded in `src/generated/generation-manifest.json`. Generation is fully offline and fails if a
snapshot is missing or invalid. To update the snapshots, download the four JSON files from the new
pinned commit, review the diff, regenerate the types, and commit the snapshots together with the
updated manifest.

sdkjs is the structural source of truth (classes, methods, params - it can't drift from the actual
runtime), while the local `office-js-api-declarations` snapshots provide richer descriptions and
runnable examples wherever a class/method name matches.

### Documentation carried by the types

Every generated class, typedef, property and method carries a real multi-line JSDoc block, so a hover
in the editor shows what the reference site shows:

````typescript
/**
 * Adds a comment to the current document selection, or to the current word if no text is selected.
 *
 * @param sText - The comment text (required).
 * @param sAuthor - The author's name (optional).
 * @returns Returns null if the comment was not added.
 *
 * @example
 * ```js
 * let doc = Api.GetDocument();
 * doc.AddComment("This is a comment to the document.", "Jane");
 * ```
 *
 * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddComment/
 */
AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
````

Everything in that block comes from the sources above, not from hand-written prose:

- the description, with the docs' inline HTML (`<b>"tile"</b>`) translated to markdown;
- `@param`/`@returns` from the documented arguments and return value - param prose is merged by
  parameter *name*, since the snapshot occasionally documents a different arity than current sdkjs;
- `@since`, where sdkjs records the editor version a member first appeared in;
- `@example`, from the docs' "## Try it" snippet (its `document-builder={...}` fence directive, which
  means nothing outside the docs site, is dropped);
- `@see`, derived from the `@see office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js` path
  already present in the JSDoc - the same three segments address the public reference page, so the
  link is data-driven rather than guessed and can't point at a page that doesn't exist.

## Type-checking

```bash
npm run check-runtime       # checks Asc.plugin/Asc.Buttons declarations against plugins.dev.js
npm run check-plugin-events # checks attachEvent/event_on* names against sdkjs's own JSDoc (needs SDKJS_PATH)
npm run check-generated     # regenerates src/generated and fails if the checked-in output differs (needs SDKJS_PATH, a git checkout)
npm run typecheck           # checks index.d.ts + src/generated/*.ts + src/*.d.ts
npm test                    # also type-checks example.js and test/*.js against the library
```

`check-runtime` is a static Level 2 check: it verifies public `Asc.plugin` members (`guid`,
`windowID`, event handlers, and registration methods), `Asc.Buttons`, button constructors, and
`Asc.scope.prototype.clear` against the checked-in `sdkjs-plugins/v1/plugins.dev.js` (the
unminified runtime - its qualified names like `window.Asc.plugin.X` stay stable across rebuilds,
unlike the minified `plugins.js`'s single-letter aliases). It does not launch an editor or verify
host-provided `executeMethod` behavior; those require a real browser/Desktop Editor smoke test.

`check-plugin-events` is a drift check, not a generator: plugin-window events (`attachEvent`,
`event_on*`) are hand-curated in `src/plugin/events.d.ts` rather than generated, since their payload
shapes need richer modeling than a mechanical `@param`-to-tuple conversion gives. The script diffs
`@alias` names documented in `sdkjs/common/base-plugin-events.js` (shared across editors, filtered by
`@typeofeditors`) plus each editor's own `<editor>/plugin-events.js` / `sdkjs-forms/plugin-events.js`
against that file and fails if anything documented (and not tagged `@undocumented`) is missing.
Requires `SDKJS_PATH` (same as
`generate`). The equivalent check for `executeMethod` names doesn't need a separate drift check:
`generate-plugin-methods.js` generates the full body directly, and `check-generated` already fails
CI if regenerating produces anything different from what's checked in.

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

## Ambient bundle (non-npm consumers)

`npm run generate-ambient` flattens the modular sources into a single, import/export-free
`.d.ts` blob - the format tools that don't install npm packages expect, such as a Monaco editor's
`addExtraLib()` (the same mechanism used by the ONLYOFFICE plugin playground for its `Api.*`
autocomplete). It also runs automatically as a `postgenerate` step whenever `npm run generate`
regenerates the types from `sdkjs`, so the ambient bundle can't silently go stale relative to the
modular package. It writes to `dist/ambient/` - tracked in git (unlike the rest of `dist/`) so the
generated files themselves are directly linkable/reviewable, but excluded from the npm package
(`package.json`'s `files`) since npm consumers get the modular package instead:

```text
dist/ambient/onlyoffice-plugins-types.ambient.d.ts           # Asc/AscPlugin/events/buttons/config/
                                                             # theme/services + all 5 editor
                                                             # namespaces, no global Api (matches
                                                             # the root package)
dist/ambient/onlyoffice-plugins-types.word-api.ambient.d.ts   # +10 lines: a global `Api: Word.Api`
dist/ambient/onlyoffice-plugins-types.cell-api.ambient.d.ts   # ...same, for Cell
dist/ambient/onlyoffice-plugins-types.slide-api.ambient.d.ts  # ...same, for Slide
dist/ambient/onlyoffice-plugins-types.pdf-api.ambient.d.ts    # ...same, for Pdf
```

Load the base bundle plus exactly one editor addon (in that order - the addon refers to the
namespace the base bundle declares, and the four addons declare the same `Api` global with a
different type):

```js
monaco.languages.typescript.javascriptDefaults.addExtraLib(baseBundleText, "onlyoffice.d.ts");
monaco.languages.typescript.javascriptDefaults.addExtraLib(wordApiAddonText, "onlyoffice.word.d.ts");
```

The per-editor part is a small addon rather than four more self-contained copies of the base bundle:
with per-method JSDoc the base bundle is a few megabytes, and five near-identical copies of it would
be that much duplicated text rewritten in full in git on every regeneration, plus a needlessly large
download for a Monaco consumer.

A file with no top-level `import`/`export` is a TypeScript "script": every `interface`/`type`/
`namespace` in it is automatically global, so this is what a `declare global {}` block would need
to look like if it weren't wrapped in a module - unlike the modular npm package, it doesn't need
installing, only loading as text.

## Machine-readable index (AI agents, search, RAG)

`dist/api-index.json` is the same API surface as the `.d.ts` files - every class, method, typedef,
editor event and `executeMethod` - but as plain JSON for tools that don't parse TypeScript. Each
entry carries its signature, markdown description, parameter list, return type, runnable `examples`,
`since` version and the verified `docsUrl` (derived from the sources, never guessed):

```json
"AddComment": {
  "signature": "AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment",
  "description": "Adds a comment to the current range.",
  "docsUrl": "https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddComment/",
  "examples": ["let doc = Api.GetDocument(); ..."],
  "params": [{ "name": "sText", "type": "string", "description": "The comment text (required.)" }, ...],
  "returns": { "type": "ApiComment", "description": "Returns null if the comment was not added." }
}
```

Three ways to get it: read it from an installed copy of the package
(`require.resolve("@onlyoffice/plugins-types/api-index.json")` - it's in the published `files`),
fetch the git-tracked file from raw.githubusercontent.com, or regenerate it locally with
`npm run generate`. Written by `generate-types.js` (object model + events) and
`generate-plugin-methods.js` (executeMethod surface); each replaces its own section wholesale, so
removed members disappear instead of going stale. `AGENTS.md` in this directory condenses the
plugin-authoring contract (`callCommand` serialization, `Asc.scope`, the three channels) plus these
lookup pointers for coding agents.

## Modular entry points

The root package remains the compatibility entry point. The same runtime types are also available by
layer for better discoverability and smaller imports:

```typescript
import type { AscPlugin } from "@onlyoffice/plugins-types/plugin/plugin";
import type { PluginEventMap } from "@onlyoffice/plugins-types/plugin/events";
import type { Buttons } from "@onlyoffice/plugins-types/plugin/buttons";
import type { PluginConfig } from "@onlyoffice/plugins-types/config";
import type { AscDesktopEditor } from "@onlyoffice/plugins-types/services";
```

Available layer entry points:

```text
@onlyoffice/plugins-types/plugin           # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo, events, buttons (everything)
@onlyoffice/plugins-types/plugin/plugin    # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo only
@onlyoffice/plugins-types/plugin/events    # PluginEventMap and plugin-window-level event types only
@onlyoffice/plugins-types/plugin/buttons   # Buttons and its ButtonBase subtypes only
@onlyoffice/plugins-types/config           # PluginConfig, VariationConfig, ButtonConfig, IconConfig, ...
@onlyoffice/plugins-types/services         # AscDesktopEditor, AscSimpleRequest
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
│   │   ├── word-methods.ts  # executeMethod names/args/returns for Word
│   │   ├── cell-methods.ts  # executeMethod names/args/returns for Cell
│   │   ├── slide-methods.ts # executeMethod names/args/returns for Slide
│   │   ├── pdf-methods.ts   # executeMethod names/args/returns for PDF
│   │   ├── forms-methods.ts # executeMethod names/args/returns for Forms
│   │   └── api-report.json # unresolved type and any report
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
├── dist/                  # tracked in git: directly linkable build artifacts
│   ├── api-index.json      # machine-readable API index (signatures, docs, examples) for agents/RAG
│   └── ambient/            # flattened no-import .d.ts bundle + per-editor Api addons (Monaco etc.)
├── scripts/
│   ├── generate-types.js          # Api object model generator (src/generated/{word,cell,slide,pdf,forms}.ts)
│   ├── generate-plugin-methods.js # executeMethod surface generator (src/generated/*-methods.ts)
│   ├── api-index.js               # shared section-merging writer for dist/api-index.json
│   ├── generate-ambient-bundle.js
│   ├── generate-config-schema.js
│   ├── check-runtime-contract.js
│   ├── check-plugin-events.js
│   └── validate-config-schema.js
├── tsconfig.json           # builds/typechecks the library itself
├── tsconfig.typecheck.json # also typechecks example.js + test/*.js
├── example.js             # Usage examples
├── test/                  # Call-shape smoke tests copied from the official docs
├── AGENTS.md              # authoring contract + lookup pointers for coding agents
└── package.json
```

Each interface/type is physically declared in exactly one module (e.g. `AscPlugin` lives in
`src/plugin/plugin.d.ts`, `AscTheme` in `src/theme/index.d.ts`); `index.d.ts` only imports and
re-exports them, so it stays a genuine barrel file rather than a second copy of the same content.
Each of `src/plugin/`, `src/config/`, `src/services/`, and `src/theme/` has its own `index.d.ts` that
re-exports everything in that directory - that's what the [modular entry points](#modular-entry-points)
(`@onlyoffice/plugins-types/plugin`, `/config`, `/services`) resolve to; `@onlyoffice/plugins-types/plugin/*`
resolves directly to the individual file (e.g. `/plugin/events` → `src/plugin/events.d.ts`).

## License

[Apache-2.0](LICENSE), Copyright 2026 Ascensio System SIA - the same license as
[`@onlyoffice/doceditor-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-types), so these
declarations can be consumed by plugins under any license. Note that this covers the type
declarations only; the ONLYOFFICE editors themselves (`sdkjs`, from whose JSDoc these types are
generated) remain under AGPL-3.0-or-later.
