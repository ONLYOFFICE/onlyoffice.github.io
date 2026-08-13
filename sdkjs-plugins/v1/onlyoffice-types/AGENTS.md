# Guidance for AI agents

This package is the TypeScript definition set for the ONLYOFFICE Plugin API. Two audiences: agents
**authoring a plugin** with these types, and agents **working on this package** itself.

## Authoring a plugin

### Mental model of the runtime

A plugin runs in an iframe and talks to the editor through `window.Asc.plugin`. There are exactly
three channels, and confusing them is the most common source of broken plugin code:

1. **`callCommand(fn, isClose)`** — the ONLY way to touch the document object model (`Api.*`). The
   editor serializes `fn`'s source with `Function.prototype.toString()` and re-runs it inside the
   editor process. Consequences:
   - the callback is a fresh scope: no closures, no variables from the plugin page, no imports —
     everything it references must be declared inside it. **The types cannot catch this** (TypeScript
     has no notion of closure capture); it is the one rule you must hold yourself;
   - pass data in via `window.Asc.scope` (a plain JSON-able object) before the call, read it inside
     as `Asc.scope.<key>` or the bare `scope` the runtime injects;
   - `fn` runs in the editor's context, where the global `Api` (not `Asc.plugin`) is the entry point;
   - whatever `fn` returns is delivered to the callback, but only if it survives the process
     boundary — the editor drops anything carrying methods to `undefined`. **The types do catch
     this**: returning an `Api.*` object is a compile error, so `return doc` fails and
     `return doc.GetAllParagraphs().map(p => p.GetText())` is what you want.
   - prefer `await callCommandAsync(fn)` over the callback form; `callMethodAsync(name, args)` is
     the same for `executeMethod`.
2. **`executeMethod("Name", [args], callback)`** — editor-provided utility methods (get selected
   text, insert content, show input helpers, ...). Typed per editor: a known method name gives its
   argument tuple and callback result type; an unknown name falls back to a loosely typed overload.
   `GetMacros`/`SetMacros` are the known trap: the wire format is a raw JSON **string** —
   `JSON.parse`/`JSON.stringify` it yourself.
3. **Events** — `Asc.plugin.attachEditorEvent("onName", cb)` for editor events (typed per editor via
   `EditorEventArgs`), plus plugin-window-level handlers assigned as properties
   (`Asc.plugin.init`, `.button`, `.onMethodReturn`, ...).

### Consuming these types

- Add the root package plus exactly ONE editor entry point to `tsconfig.json`:
  `"types": ["@onlyoffice/plugins-types", "@onlyoffice/plugins-types/word"]`
  (`/word`, `/cell`, `/slide`, `/pdf`). Two editor entry points in one project make the global `Api`
  declarations collide — that is intentional, a plugin's `callCommand` code runs in one editor.
- Any type from any editor remains importable regardless (`import type { Cell } from
  "@onlyoffice/plugins-types/cell"`), because each editor's object model lives in its own namespace
  (`Word`, `Cell`, `Slide`, `Forms`, `Pdf`) and same-named classes don't collide.
- `import type { Api } from "@onlyoffice/plugins-types"` + `Api<"word">` resolves the entry-point
  class generically.
- A plugin's `config.json` can be validated against `schemas/config.schema.json` (add a `$schema`
  field pointing at the raw GitHub URL or map `sdkjs-plugins/content/*/config.json` in the editor).

### Looking up the API without guessing

- `dist/api-index.json` (npm: `@onlyoffice/plugins-types/api-index.json`; raw:
  `https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/sdkjs-plugins/v1/onlyoffice-types/dist/api-index.json`)
  — every class/method/typedef/event/executeMethod with signature, markdown description, parameter
  list, return type, runnable `examples`, `since` version and a verified `docsUrl`. Search this
  before inventing a method name; if a member isn't in the index, it isn't public API.
  Two top-level sections, and which one to search depends on the question:
  `editors.<editor>` for what you do *inside* a `callCommand` body (`Api.*` classes, typedefs,
  editor events, `executeMethod` names); `runtime` for how you write the plugin around it -
  `runtime.plugin` (`AscPlugin.callCommand`, the async variants, `Asc`, buttons, plugin events),
  `runtime.config` (`config.json`), `runtime.services`.
- Every generated member's JSDoc carries the same information (hover in the editor), including an
  `@example` snippet and an `@see` link to api.onlyoffice.com.
- `dist/ambient/` holds a flattened no-import `.d.ts` bundle for Monaco-style tooling
  (`addExtraLib()`): load `onlyoffice-plugins-types.ambient.d.ts` plus exactly one
  `onlyoffice-plugins-types.<editor>-api.ambient.d.ts` addon, in that order.

## Working on this package

### Commands

```bash
npm test                 # tsc over the package + example.js + test/*.js (skipLibCheck off)
npm run typecheck        # package only
npm run check-runtime    # Asc.plugin/Asc.Buttons vs plugins.dev.js + full API surface vs sdkjs (SDKJS_PATH)
npm run check-plugin-events  # plugin-window event map vs sdkjs event sources (SDKJS_PATH)
npm run validate-schema  # schemas/config.schema.json vs every real config.json in this monorepo
npm run generate         # regenerate src/generated from sdkjs + merge dist/api-index.json
                         # (postgenerate also regenerates executeMethod types and dist/ambient)
```

`generate` needs a local sdkjs checkout (`SDKJS_PATH` env or `--sdkjs`), plus `sdkjs-forms` and
`sdkjs-ext` next to it (override with `SDKJS_FORMS_PATH`/`SDKJS_EXT_PATH`). The exact expected source
commits are pinned in `src/generated/generation-manifest.json`; regenerating from those commits must
produce a byte-identical tree (`npm run check-generated`).

### Invariants worth knowing

- `src/generated/api-report.json` tracks `anyOccurrences` (must stay 0) and `unresolvedTypes` (a
  short list of types sdkjs references but never documents). A regeneration that only changes
  documentation leaves this file untouched — a diff here means the sdkjs sources moved, not the
  docs.
- Correctness fixes that contradict sdkjs's own JSDoc (a parameter that real calls omit, a wire
  type that differs from the declared one) belong in the override tables in
  `scripts/generate-plugin-methods.js` with a comment citing the real usage — never as hand edits
  to `src/generated/*`, which the next regeneration would silently revert.
- The same hand-edit rule applies to `dist/api-index.json` and `dist/ambient/*`: both are build
  artifacts of the generators, tracked in git only so they are directly linkable/reviewable.
- JSDoc prose goes through `htmlToMarkdown`/`cleanProse`/`splitDescription` in
  `scripts/generate-types.js`; docs-site links are derived from the `@see
  office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js` paths in the source doclets, so a
  link is never emitted for a member the docs site doesn't document.
