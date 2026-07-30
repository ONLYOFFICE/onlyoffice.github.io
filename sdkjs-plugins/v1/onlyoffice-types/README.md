# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

## Installation

```bash
npm install onlyoffice-plugins-api
```

## Usage

### For Plugins

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["onlyoffice-plugins-api"]
  }
}
```

Or reference directly in your TypeScript files:

```typescript
/// <reference types="onlyoffice-plugins-api" />
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
- **Word namespace**: Types for text documents (generated from the ONLYOFFICE `sdkjs` JSDoc)
- **Cell namespace**: Types for spreadsheets
- **Slide namespace**: Types for presentations
- **Forms namespace**: Types for PDF/OForm form fields

Every editor's API is generated into its own TypeScript `namespace` (`Word`, `Cell`, `Slide`, `Forms`),
so any type from any editor is importable regardless of which editor the current plugin targets -
same-named classes across editors (e.g. `ApiParagraph` exists in all four) don't collide, and you
can reference another editor's types from shared/helper code:

```typescript
import type { Word, Cell, Slide } from "onlyoffice-plugins-api";

function logParagraph(p: Word.ApiParagraph) { /* ... */ }
function fillCell(r: Cell.ApiRange) { /* ... */ }
function firstSlide(pres: Slide.ApiPresentation): Slide.ApiSlide { /* ... */ }
```

`Api<T>` resolves the entry-point class for a given editor kind (`"word" | "cell" | "slide" | "pdf"`),
equivalent to `Word.Api`/`Cell.Api`/`Slide.Api`/`Forms.Api`:

```typescript
import type { Api } from "onlyoffice-plugins-api";

function useWordApi(api: Api<"word">) {
    const doc = api.GetDocument();
}
```

`window.Asc.plugin.executeMethod`/`executeMethodAsync` are typed for Word, Cell, and Slide method
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

Events not modeled yet (the low-level common/UI ones shared across editors - `onContextMenuShow`,
`onClick`, `onKeyDown`, ...) fall back to a loose `(eventName: string, callback: (...args) => void)`
overload.

## Generating Types

The generator parses the JSDoc comments straight out of a local `sdkjs` (and `sdkjs-forms`) checkout
using the `jsdoc` package, rather than fetching a prebuilt snapshot over the network - this picks up
API changes immediately and avoids a few data-quality bugs in stale snapshots (e.g. duplicated method
entries with a corrupted return type).

```bash
SDKJS_PATH=/path/to/sdkjs npm run generate
```

`sdkjs-forms` is expected next to `sdkjs` by default (`SDKJS_PATH/../sdkjs-forms`); override with
`SDKJS_FORMS_PATH` or `--sdkjs-forms <path>` if it lives elsewhere. `--sdkjs <path>` works instead of
the env var too.

## Type-checking

```bash
npm run typecheck   # checks index.d.ts + src/generated/*.ts + src/*.d.ts
npm test            # also type-checks example.js and test/*.js against the library
```

Run these after editing any `.d.ts` file or regenerating types - `skipLibCheck` is intentionally
**off** in `tsconfig.json` so mistakes in the declaration files themselves (e.g. a type that isn't
actually exported) surface immediately instead of being silently ignored.

## Project Structure

```
onlyoffice-types/
├── index.d.ts            # Main plugin API types (Asc, Api global, Word/Cell/Slide/Forms exports)
├── src/
│   ├── generated/        # Auto-generated Office API types, one namespace per editor
│   │   ├── word.ts        # namespace Word { ... }
│   │   ├── cell.ts        # namespace Cell { ... }
│   │   ├── slide.ts       # namespace Slide { ... }
│   │   └── forms.ts       # namespace Forms { ... }
│   ├── word-methods.d.ts  # executeMethod names/args/returns for Word
│   ├── cell-methods.d.ts  # executeMethod names/args/returns for Cell
│   └── slide-methods.d.ts # executeMethod names/args/returns for Slide
├── scripts/
│   └── generate-types.js
├── tsconfig.json           # builds/typechecks the library itself
├── tsconfig.typecheck.json # also typechecks example.js + test/*.js
├── example.js             # Usage examples
├── test/                  # Call-shape smoke tests copied from the official docs
└── package.json
```
