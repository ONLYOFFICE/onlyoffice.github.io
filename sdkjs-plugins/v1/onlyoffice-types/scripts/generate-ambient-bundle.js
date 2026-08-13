// A file with no top-level import/export is a "script" in TypeScript's sense:
// every interface/type/namespace declared in it is automatically global, and
// `declare global { ... }` is invalid there (it's only legal inside a module) - so that block gets
// unwrapped into plain top-level declarations instead.
//
// Produces:
//   dist/ambient/onlyoffice-plugins-api.ambient.d.ts        - Asc/AscPlugin/events/buttons/config/
//                                                              theme/services + all 5 editor namespaces,
//                                                              WITHOUT a global `Api` (matches the root
//                                                              package - no cross-editor Api global).
//   dist/ambient/onlyoffice-plugins-api.<editor>.ambient.d.ts - the base bundle above PLUS that one
//                                                              editor's global `Api`, for consumers
//                                                              (like a Monaco playground) that already
//                                                              know which editor they're targeting.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'ambient');

const BASE_FILES = [
  'src/generated/word.ts',
  'src/generated/cell.ts',
  'src/generated/slide.ts',
  'src/generated/forms.ts',
  'src/generated/pdf.ts',
  'src/word-methods.d.ts',
  'src/cell-methods.d.ts',
  'src/slide-methods.d.ts',
  'src/pdf-methods.d.ts',
  'src/theme/index.d.ts',
  'src/config/plugin-config.d.ts',
  'src/plugin/events.d.ts',
  'src/plugin/buttons.d.ts',
  'src/plugin/plugin.d.ts',
  'src/services/desktop-editor.d.ts',
  'src/services/simple-request.d.ts',
];

const EDITOR_FILES = {
  word: 'src/editors/word.d.ts',
  cell: 'src/editors/cell.d.ts',
  slide: 'src/editors/slide.d.ts',
  pdf: 'src/editors/pdf.d.ts',
};

function stripModuleSyntax(source) {
  return source
    // import type { A, B } from "..."; (single- or multi-line)
    .replace(/^\s*import\s+type\s*\{[\s\S]*?\}\s*from\s*["'][^"']+["'];?\s*$/gm, '')
    // export type { A, B } from "..."; / export type { A, B };
    .replace(/^\s*export\s+type\s*\{[\s\S]*?\}\s*(?:from\s*["'][^"']+["'])?;?\s*$/gm, '')
    // export type * from "...";
    .replace(/^\s*export\s+type\s*\*\s*from\s*["'][^"']+["'];?\s*$/gm, '')
    // bare export { A, B }; re-export lists (word/cell/slide/pdf-methods.d.ts use this form
    // without the `type` keyword, at varying indentation) - never nested inside a namespace in
    // these sources, so stripping any indentation level is safe.
    .replace(/^[ \t]*export\s*\{[\s\S]*?\}\s*;?\s*$/gm, '')
    // export namespace X { ... } -> declare namespace X { ... } (needed once the file has no
    // other import/export left, or `export` here would have nothing to attach to as a module)
    .replace(/^export\s+namespace\s+/gm, 'declare namespace ')
    // Any other top-level `export interface/type/enum/class/const/...` is a real declaration
    // (not a re-export list) - drop just the `export` keyword. A single leftover top-level
    // `export` anywhere would make TypeScript treat the whole bundle as a module again, silently
    // scoping every other bare `interface`/`type` in it to that module instead of the global
    // scope - so this must catch every declaration keyword, not just the ones seen so far.
    .replace(/^export\s+(?=(?:interface|type|enum|class|abstract\s+class|function|const|let|var)\b)/gm, '')
    .trim();
}

function unwrapDeclareGlobal(source) {
  const match = source.match(/declare\s+global\s*\{/);
  if (!match) throw new Error('Expected a declare global {} block');
  let depth = 1;
  const start = match.index + match[0].length;
  let end = start;
  for (; end < source.length; end += 1) {
    if (source[end] === '{') depth += 1;
    if (source[end] === '}') depth -= 1;
    if (depth === 0) break;
  }
  const inner = source.slice(start, end).trim();
  // `declare global { var X: Y; }` doesn't need `declare` on `var` (it's implied by the wrapper),
  // but once unwrapped to bare top level, `var`/`function`/`const`/`let`/`class` all need an
  // explicit `declare` - unlike `interface`/`type`/`namespace`, which are ambient either way.
  return inner.replace(/^(\s*)(var|function|const|let|class)\s/gm, '$1declare $2 ');
}

function readStripped(relPath) {
  const raw = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  return stripModuleSyntax(raw);
}

function buildBaseBundle() {
  const header = `// AUTO-GENERATED - do not edit by hand. Run \`npm run generate-ambient\` to regenerate.
// A flattened, non-module ambient bundle of onlyoffice-plugins-api for tools (e.g. a Monaco
// editor's addExtraLib()) that want one global-scope .d.ts blob instead of an installable,
// module-based npm package. Source of truth is still the modular package under src/ - this is a
// build artifact, not something to hand-edit.
`;

  const indexRaw = fs.readFileSync(path.join(ROOT, 'index.d.ts'), 'utf8');
  const globalBlock = unwrapDeclareGlobal(indexRaw);

  const sections = BASE_FILES.map((relPath) => {
    const content = readStripped(relPath);
    return `// ---- ${relPath} ----\n${content}\n`;
  });

  return [header, ...sections, `// ---- window.Asc / window.AscDesktopEditor / window.AscSimpleRequest ----\n${globalBlock}\n`].join('\n');
}

function buildEditorAddon(editorFile) {
  const stripped = readStripped(editorFile);
  // The editor entry point files only ever contain a declare global {} block (the per-editor Api
  // global) plus type-only re-exports already dropped by stripModuleSyntax - unwrap it directly.
  return unwrapDeclareGlobal(stripped);
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const base = buildBaseBundle();
  fs.writeFileSync(path.join(OUT_DIR, 'onlyoffice-plugins-api.ambient.d.ts'), base);
  console.log('Generated dist/ambient/onlyoffice-plugins-api.ambient.d.ts');

  for (const [editorName, editorFile] of Object.entries(EDITOR_FILES)) {
    const addon = buildEditorAddon(editorFile);
    const combined = `${base}\n// ---- ${editorFile} (global Api for the "${editorName}" editor) ----\n${addon}\n`;
    const outPath = path.join(OUT_DIR, `onlyoffice-plugins-api.${editorName}.ambient.d.ts`);
    fs.writeFileSync(outPath, combined);
    console.log(`Generated dist/ambient/onlyoffice-plugins-api.${editorName}.ambient.d.ts`);
  }
}

main();
