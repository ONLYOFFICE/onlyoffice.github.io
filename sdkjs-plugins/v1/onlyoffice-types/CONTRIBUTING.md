# Contributing

This document covers the generator pipeline, type-checking scripts, and internal layout for anyone
working on `@onlyoffice/plugins-types` itself (as opposed to consuming it in a plugin - see
[README.md](README.md) for that). See also [AGENTS.md](AGENTS.md) for a condensed version aimed at
coding agents.

## Moving out of the monorepo

The published metadata already points at the package's own repository
(`github.com/ONLYOFFICE/plugins-types`, package at the root, `master` branch), matching how
`@onlyoffice/doceditor-types` is laid out. Two checks still read sibling directories of the
monorepo and are the real work of the move:

- `check-runtime-contract.js` reads `../plugins.dev.js` - the vendored plugin runtime.
- `validate-config-schema.js` reads `../../content/*/config.json` - the 52 real plugin configs the
  schema is validated against.

Both currently get their input for free by sitting next to the thing they validate. After the move
they need either a vendored copy inside the package (and then a freshness check of their own, or
they quietly validate against a stale snapshot) or a checkout path passed in the way `SDKJS_PATH`
already is for the generators. Everything else - generation, the type checks, the ambient bundle,
the index - is already location-independent.

## Releasing

The package version mirrors the editor version the types were generated from (the consumer-facing
side of this is the [Versioning](README.md#versioning) table). To cut a release:

1. Check out the sdkjs tag you are releasing against and confirm it: `git -C <sdkjs> describe --tags`
   prints e.g. `v9.5.0.150`. The **first three segments** are the package version - `9.5.0`. The
   fourth is a build number and is not part of it. A trailing `-<n>-g<sha>` (e.g.
   `v9.5.0.150-2-g586ec09e`) means the checkout is *n* commits past that tag: fine while developing,
   but not for a release, or the manifest records a version the types were not generated from.
   `npm run check-release-sources` enforces this - it regenerates with `--require-clean-sources
   --require-release-tag` and fails if any source checkout is dirty or sits off a tag. Run it
   instead of `check-generated` when cutting a release; do not rely on remembering the rule, which
   is how `9.5.0` came to record `v9.5.0.150-2-g586ec09e2d`.
2. Regenerate (`npm run generate`) and run the checks below. `src/generated/generation-manifest.json`
   records the commit *and* that `describe` string, so the mapping from a published version back to
   its source is auditable later - do not hand-edit it.
3. Set `version` in `package.json` to those three segments, add a `## <version>` changelog section
   naming the sdkjs tag, and add the row to the README table.

Two consequences of product versioning worth being deliberate about:

- **The version is not semver over the type surface.** If an editor patch release renames an API,
  that rename ships in a package patch. Say so in the changelog rather than trying to encode it in
  the version.
- **Republishing the same editor version needs a fourth segment.** If a packaging fix has to go out
  against an unchanged sdkjs tag, use `9.5.0.1`-style suffixes rather than bumping to `9.5.1`, which
  would falsely claim a different editor release.

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

`scripts/generate-types.js` (the Api object model generator) has an analogous but separate mechanism
for classes/typedefs it can't resolve at all - not a signature correction, but a whole missing
declaration (the class is fully documented in sdkjs, but the individual source file that declares it
only exists in ONLYOFFICE's prebuilt deploy bundle, not a plain checkout). `src/overrides/<editor>.ts`
holds hand-written `export interface`/`export type` declarations for exactly those names, the same
pattern DefinitelyTyped uses for undocumented corners of a real-world API; the generator splices an
override in wherever it would otherwise emit a blind `export type X = unknown;` stub, and warns if an
override is no longer needed (a later sdkjs checkout resolved the same name from a real source too).

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
npm run check-runtime       # checks Asc.plugin/Asc.Buttons against plugins.dev.js + sdkjs (needs SDKJS_PATH)
npm run check-plugin-events # checks attachEvent/event_on* names against sdkjs's own JSDoc (needs SDKJS_PATH)
npm run check-generated     # regenerates src/generated and fails if the checked-in output differs (needs SDKJS_PATH, a git checkout)
npm run typecheck           # checks index.d.ts + src/generated/*.ts + src/*.d.ts
npm test                    # five programs: shared + one per editor (see below)
npm run test:word           # a single editor's program, for a faster edit/check loop
```

`npm test` compiles **five** TypeScript programs, not one. The four editor entry points each declare
the same global `Api` with a different type, so putting two of them in one program is an immediate
`TS2403` collision - which is why a shared `declare var Api: any` stub used to sit in `test/`,
silently reducing every `Api.*` call in the copied documentation examples to `any`. Now
`tsconfig.test.<editor>.json` gives each editor's examples the real `Word.Api`/`Cell.Api`/... global,
and `tsconfig.typecheck.json` keeps the editor-agnostic files (`example.js`, which is a deliberately
multi-editor sampler with its own `any`, and the plugin-runtime tests). Each editor program also
compiles `test/<editor>-api-global.js`, whose `@ts-expect-error` on another editor's entry method
only holds while that program's `Api` is genuinely typed - so the stub cannot creep back unnoticed.

`check-runtime` is a static Level 2 check with two halves, against two sources:

- *Bootstrap assignments* - `Asc.plugin`'s `guid`/`windowID`/event handlers/registration methods,
  `Asc.Buttons`, the button constructors and `Asc.scope.prototype.clear`, verified in both
  directions against the checked-in `sdkjs-plugins/v1/plugins.dev.js` (the unminified runtime - its
  qualified names like `window.Asc.plugin.X` stay stable across rebuilds, unlike the minified
  `plugins.js`'s single-letter aliases).
- *API completeness* - every member sdkjs's own JSDoc documents with `@memberof Plugin` /
  `@memberof InputHelper` in `common/plugins/plugin_base_api.js` must be declared by us. This half
  needs `SDKJS_PATH` (same as `generate`). It exists because the bulk of the API - `callCommand`,
  `executeMethod`, `callModule`, `createInputHelper`, ... - is installed by `startPluginApi()` and
  never appears in `plugins.dev.js` at all; checking only that file previously let ~10 documented
  members go undeclared while this script still reported success. A documented `onFoo` satisfies the
  check when declared as either `onFoo` or `event_onFoo`, since editor-dispatched events reach the
  plugin as `Asc.plugin["event_" + name]`.

Note that `@undocumented` is deliberately *not* filtered in this second half: in
`plugin_base_api.js` that tag happens to sit on every method (`callCommand`, `executeMethod`, ...)
rather than marking non-public members the way it does in the method/event sources.

Neither half launches an editor or verifies host-provided `executeMethod` behavior; those require a
real browser/Desktop Editor smoke test.

`check-plugin-events` is a drift check, not a generator: plugin-window events (`attachEvent`,
`event_on*`) are hand-curated in `src/plugin/events.d.ts` rather than generated, since their payload
shapes need richer modeling than a mechanical `@param`-to-tuple conversion gives. The script diffs
`@alias` names documented in `sdkjs/common/base-plugin-events.js` (shared across editors, filtered by
`@typeofeditors`) plus each editor's own `<editor>/plugin-events.js` / `sdkjs-forms/plugin-events.js`
against that file and fails if anything documented (and not tagged `@undocumented`) is missing.
Requires `SDKJS_PATH` (same as `generate`). The equivalent check for `executeMethod` names doesn't
need a separate drift check: `generate-plugin-methods.js` generates the full body directly, and
`check-generated` already fails CI if regenerating produces anything different from what's checked in.

Run these after editing any `.d.ts` file or regenerating types - `skipLibCheck` is intentionally
off in `tsconfig.json` so mistakes in the declaration files themselves (e.g. a type that isn't
actually exported) surface immediately instead of being silently ignored.

`peerDependencies` declares `typescript: >=5.0.0`, and that floor is real, not cautious: `index.d.ts`
re-exports every editor namespace with `export type * from "..."`, which TypeScript only parses from
5.0 on (4.9 rejects it with `TS1383: Only named exports may use 'export type'`). Lowering the floor
without first rewriting those 14 re-exports as named `export type { ... }` lists ships a package that
fails to parse on the very first file.

`npm run check-schema` regenerates `schemas/config.schema.json` from the types and fails if the
checked-in copy differs. It exists because the schema is a build artifact with no other guard:
it silently went stale once, still requiring only `variations` while `PluginConfig` had grown two
more required fields, so `validate-schema` was passing against an outdated schema rather than
against the types it claims to mirror. Run it after touching anything under `src/config/`.

`npm run validate-schema` checks `schemas/config.schema.json` against every real `config.json`
already in this monorepo (`sdkjs-plugins/content/*/config.json`) - not part of `npm test` since it
needs that sibling directory, which only exists inside this checkout. A small `KNOWN_ISSUES`
allowlist in the script tracks the couple of plugins whose `config.json` has a genuine mistake (a
misplaced field, a typo) rather than a schema gap; anything else that fails is a real regression.

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

Alongside `editors` there is a `runtime` section covering the other half of the API - how you write
a plugin at all, rather than what you do inside a `callCommand` body. It is grouped as
`runtime.plugin` (`AscPlugin`, `Asc`, events, buttons), `runtime.config` (the `config.json` types)
and `runtime.services`, and carries each member's real declared signature plus its JSDoc:

```json
"callCommand": {
  "signature": "callCommand: <T>(command: () => T & CommandSerializable<T>, isClose?: boolean, ...) => void",
  "description": "Runs `command` inside the editor's process, where the global `Api` is the entry point. ..."
}
```

Three ways to get the file: read it from an installed copy of the package
(`require.resolve("@onlyoffice/plugins-types/api-index.json")` - it's in the published `files`),
fetch the git-tracked file from raw.githubusercontent.com, or regenerate it locally with
`npm run generate`. Written by `generate-types.js` (object model + events),
`generate-plugin-methods.js` (executeMethod surface) and `generate-runtime-index.js` (the `runtime`
section); each replaces its own section wholesale, so removed members disappear instead of going
stale.

`generate-runtime-index.js` is the one generator that reads *this package's* declarations rather
than sdkjs - via the TypeScript compiler API, so the published signature is the one we actually
authored (`callCommand`'s serializability constraint, `executeMethod`'s overload chain) rather than
a re-transcription of sdkjs's looser `@param {Function}` JSDoc. Because its inputs are hand-written
files that change without a regeneration, it needs no `SDKJS_PATH` and has its own drift guard:
`npm run check-runtime-index` regenerates and fails if the checked-in `dist/api-index.json` differs.
Run it after editing anything under `src/plugin/`, `src/config/` or `src/services/`. `AGENTS.md` in this directory condenses the
plugin-authoring contract (`callCommand` serialization, `Asc.scope`, the three channels) plus these
lookup pointers for coding agents.

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
│   ├── overrides/          # Hand-maintained declarations for the handful of classes/typedefs
│   │   │                   # generate-types.js can't resolve from a plain sdkjs checkout
│   │   ├── word.ts
│   │   ├── cell.ts
│   │   └── pdf.ts
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
├── tsconfig.typecheck.json # editor-agnostic test program (example.js + runtime tests)
├── tsconfig.test.word.json # one program per editor - each declares the global Api differently
├── tsconfig.test.cell.json
├── tsconfig.test.slide.json
├── tsconfig.test.pdf.json
├── example.js             # Usage examples
├── test/                  # Call-shape smoke tests copied from the official docs
├── AGENTS.md              # authoring contract + lookup pointers for coding agents
└── package.json
```

Each interface/type is physically declared in exactly one module (e.g. `AscPlugin` lives in
`src/plugin/plugin.d.ts`, `AscTheme` in `src/theme/index.d.ts`); `index.d.ts` only imports and
re-exports them, so it stays a genuine barrel file rather than a second copy of the same content.
Each of `src/plugin/`, `src/config/`, `src/services/`, and `src/theme/` has its own `index.d.ts` that
re-exports everything in that directory - that's what the root package's `/plugin`, `/config`,
`/services` entry points (see [README.md](README.md#modular-entry-points)) resolve to;
`@onlyoffice/plugins-types/plugin/*` resolves directly to the individual file (e.g. `/plugin/events`
→ `src/plugin/events.d.ts`).
