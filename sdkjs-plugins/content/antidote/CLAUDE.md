# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An ONLYOFFICE plugin that integrates Antidote (Druide informatique's French/English grammar,
spelling, and style corrector) into ONLYOFFICE Docs/Desktop editors. It exposes Antidote's three
tools — Corrector, Dictionaries, Guides — from a side panel, talking to the locally-installed
Antidote 12's `AgentConnectix` daemon over a WebSocket, via the official
`@druide-informatique/antidote-api-js` npm package (not Antidote's browser-extension JS-Connect
API, which doesn't exist inside ONLYOFFICE's embedded webview).

Requires ONLYOFFICE 9.3.0+ and Antidote 12 installed and running locally.

## Commands

```bash
npm install
npm run dev        # vite build --watch
npm run build       # tsc --noEmit && vite build -> dist/index.js + dist/index.css
npm run lint
npm run lint:fix    # also normalizes CRLF -> LF, see "Windows line endings" below
npm run typecheck   # tsc --noEmit only
npm run preview
npm run clean       # rm -rf dist
```

There is no test suite in this package.

`npm run lint` requires a `.gitignore` file to exist in this directory — ESLint's
`includeIgnoreFile()` resolves it relative to the current working directory, not the monorepo
root. If it's ever missing, `lint` crashes with `ENOENT` instead of reporting lint errors.

### Windows line endings

The ESLint config (`eslint-config-airbnb-extended`) enforces LF line endings. Editors/tools on a
Windows checkout tend to write CRLF, which then shows up as thousands of
`@stylistic/linebreak-style` errors that drown out anything real. If `npm run lint` reports an
implausibly large error count, run `npm run lint:fix` first — it silently normalizes line endings
along with any other auto-fixable issues, then re-run `lint` to see what's actually wrong.

## Architecture

### Plugin shell vs. app

`config.json` is the ONLYOFFICE plugin manifest (one `panel`-type variation,
`EditorsSupport: ["word", "cell", "pdf"]`). `index.html` boots the plugin: it loads the ONLYOFFICE
SDK (`sdkjs-plugins/v1/plugins.js` / `plugins-ui.js`), sets theme classes before the app mounts,
then loads `dist/index.js` / `dist/index.css` — the built Preact app, entry point
`src/index.tsx`. **`dist/` is committed to git**; the built output is part of what ships with the
plugin, so a change isn't "done" until `npm run build` has been re-run.

- `src/api/document.ts` — all ONLYOFFICE document access: selection text, whole-document
  paragraphs, per-run style ranges.
- `src/api/antidote.ts` — resolves the Connectix WebSocket port.
- `src/features/correction` — the "Corrector" flow: `DocumentCorrectionAgent` (whole document,
  word editor type only) and `SelectionCorrectionAgent` (selection, any editor type), both
  implementing `@druide-informatique/antidote-api-js`'s `WordProcessorAgent`.
- `src/features/lookup` — the "Dictionaries"/"Guides" flow: a read-only `LookupAgent`; the text to
  look up is taken from the current document selection first, falling back to a manual input field
  only when nothing is selected.
- `src/pages` — `Main` (the three tool buttons, plus scope/lookup as secondary controls below
  them) and `Settings` (manual Connectix port override).
- `src/components` — a small owned UI kit styled against `sdkjs-plugins/v1/plugins.css`.

### The `callCommand` sandbox boundary

`window.Asc.plugin.callCommand(fn, ...)` does not run `fn` as a normal closure inside the
plugin's own JS realm — it runs in the document's separate, sandboxed object-model context (where
the global `Api` lives), and by all observable evidence serializes/re-evaluates the passed
function there. Concretely: **anything the passed function references from outside its own body
— module-level helpers, outer variables — is invisible at runtime**, even though it type-checks
fine at compile time.

Two consequences already baked into the code, worth preserving the pattern for:
- `runCommand()` in `document.ts` smuggles arguments through `window.Asc.scope` rather than a
  normal closure.
- The paragraph/run-walking helpers (`walkStyledContent`, `isRun`, `isHyperlink`) are declared
  *inside* each `callCommand` callback and duplicated between `getDocumentParagraphs` and
  `getSelectedTextWithStyle` — there's no way to share them across two separate `callCommand`
  calls. TypeScript *types* imported from outside are fine (they're erased at compile time and
  never need to survive into the serialized runtime function); runtime values and functions are
  not.

Any new `callCommand`-based query needs to keep its entire logic self-contained inside the passed
function.

### Antidote integration specifics

- The Connectix WebSocket protocol (v2: `{api_version: 2, message: "LaunchTool", tool_api:
  "Corrector" | "Dictionaries" | "Guides"}`, etc.) is fully wrapped by
  `@druide-informatique/antidote-api-js` — there should be no reason to hand-roll it. Other
  references to this protocol found online (e.g. the Obsidian Antidote plugin) speak a stale
  v1/French-named variant (`LanceOutil` / `outilApi`) that isn't what this npm package uses.
- **There is no deterministic way to discover Connectix's WebSocket port from inside the plugin's
  browser sandbox.** The only reliable method — running `AgentConnectixConsole --api`, or reading
  `HKLM\SOFTWARE\Druide informatique inc.\Connectix` on Windows — needs Node's
  `child_process`/registry access, which isn't available here. `src/api/antidote.ts` falls back to
  probing the ephemeral port range Connectix binds to (`49152` + 13 ports) plus a manual override
  in Settings — that's the documented ceiling for this environment, not a stopgap to keep trying to
  improve.
- `styleInfo` (bold/italic/strike/superscript/subscript ranges Antidote can render) is populated
  with a **verify-then-attach** pattern: walk a paragraph's runs (recursing into hyperlinks) via
  the object model to reconstruct both text and style ranges, then only attach `styleInfo` if that
  reconstruction matches the already-trusted plain text *exactly*. Anything unwalkable (forms,
  fields, footnotes, math, tables, a selection that starts/ends mid-paragraph) silently falls back
  to plain text with no `styleInfo`. This is safe specifically because `styleInfo` is cosmetic
  only — it never affects correction positions — so dropping it is always a safe degradation, never
  a correctness risk.
- Whole-document paragraph access (`Api.GetDocument().GetAllParagraphs()`) only works for
  `editorType === "word"`; cell/pdf don't expose that object model. Selection text/replacement via
  the `GetSelectedText`/`ReplaceTextSmart` host methods works uniformly across word/cell/pdf — this
  is why `SelectionCorrectionAgent` is the one agent usable outside Word.

### `sdkjs-plugins/v1/onlyoffice-types` (sibling package)

A local `file:`-linked devDependency (imported as `onlyoffice-plugins-api`, symlinked into
`node_modules`) that provides the ambient global `Api`/`Asc` types, mechanically generated
(`npm run generate`, run from that package's own directory) from
`ONLYOFFICE/office-js-api-declarations`. That upstream data has a known quality issue: some
methods (`GetClassType()` on several classes, some `ToJSON()` overloads) are listed twice — a
correct entry followed by a malformed one whose type was actually scraped from an unrelated
method — and the malformed one used to silently win. `generate-types.js` now prefers the first,
cleanly-parsed entry when this happens. If a future regeneration reintroduces an obviously-wrong
literal type (e.g. `ApiRun.GetClassType()` returning anything other than `"run"`), suspect this
upstream duplication before assuming the local fix regressed.
