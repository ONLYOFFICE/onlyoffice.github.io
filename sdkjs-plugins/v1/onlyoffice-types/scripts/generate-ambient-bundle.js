// A file with no top-level import/export is a "script" in TypeScript's sense:
// every interface/type/namespace declared in it is automatically global, and
// `declare global { ... }` is invalid there (it's only legal inside a module) - so that block gets
// unwrapped into plain top-level declarations instead.
//
// Produces:
//   dist/ambient/onlyoffice-plugins-types.ambient.d.ts             - Asc/AscPlugin/events/buttons/
//                                                                    config/theme/services + all 5
//                                                                    editor namespaces, WITHOUT a
//                                                                    global `Api` (matches the root
//                                                                    package - no cross-editor Api).
//   dist/ambient/onlyoffice-plugins-types.<editor>-api.ambient.d.ts - a few lines declaring that one
//                                                                    editor's global `Api`, to load
//                                                                    on top of the base bundle.
//
// The per-editor part is a separate small addon rather than four more self-contained copies of the
// base bundle: with per-method JSDoc the base bundle is several megabytes, and five near-identical
// copies of it would be that much duplicated text in git (rewritten in full on every regeneration)
// and in whatever a Monaco consumer downloads. `addExtraLib()` takes any number of files, so loading
// the base bundle plus one addon is no harder than loading a single blob.

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
  'src/generated/word-methods.ts',
  'src/generated/cell-methods.ts',
  'src/generated/slide-methods.ts',
  'src/generated/pdf-methods.ts',
  'src/generated/forms-methods.ts',
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

// The generated `src/generated/*-methods.ts` files each declare their own local copy of every
// shared typedef they reference (Color, EventType, SelectionType, unresolved-ref stubs like
// `localeTranslate`, ...) rather than importing a common module - deliberate, since as real ES
// modules those names are file-scoped and importing/exporting them between the 5 files would
// reintroduce the TS2308 ambiguous-export collisions `generate-plugin-methods.js` was built to
// avoid. Flattening all 5 files into one global-scope bundle turns those same file-scoped
// identically-named identifiers into duplicate GLOBAL ones, which TypeScript rejects - so the
// bundle keeps only the first copy of each, and only after verifying every later copy is textually
// identical (a name collision between two genuinely different shapes must fail loudly, not be
// silently papered over).
function popTrailingJsDocComment(output) {
  let end = output.length;
  while (end > 0 && output[end - 1].trim() === '') end -= 1;
  if (end === 0 || !/^\s*\*\/\s*$/.test(output[end - 1])) return null;
  let start = end - 1;
  while (start >= 0 && !/^\s*\/\*\*/.test(output[start])) start -= 1;
  if (start < 0) return null;
  const comment = output.slice(start, end);
  output.length = start;
  return comment;
}

// Splits the lines strictly between an interface's `{` and closing `}` into per-member chunks
// (each chunk is a member's own leading `/** ... */` comment, if any, plus its `name[?]: type;`
// line) by tracking brace depth so a member whose type is itself an inline `{ ... }` object still
// ends up as one chunk instead of being cut mid-type.
function splitInterfaceMembers(bodyLines) {
  const members = [];
  let depth = 0;
  let current = [];
  for (const line of bodyLines) {
    current.push(line);
    for (const ch of line) {
      if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
    }
    if (depth === 0 && /;\s*$/.test(line)) {
      members.push(current);
      current = [];
    }
  }
  if (current.some((l) => l.trim() !== '')) members.push(current);
  return members;
}

function memberNameAndSignature(memberLines) {
  for (const line of memberLines) {
    const m = line.match(/^\s*(?:\[?['"]?([A-Za-z_$][A-Za-z0-9_$-]*)['"]?\]?)(\??)\s*:\s*(.*)$/);
    if (m) return { name: m[1], optional: m[2] === '?', typeAndRest: m[3] };
  }
  return null;
}

// Two same-named `interface` bodies from different editors' generated files can legitimately
// differ - sdkjs's own JSDoc for a nominally "shared" typedef (CommentData, ...) isn't always
// identical across editors (e.g. word's CommentData documents `UserId`, other editors' don't).
// Flattened into one ambient global, the more permissive shape (member present in every body,
// with the same type, wins as-is; a member missing from or optional in ANY body is kept but forced
// optional in the merge) is the only one that stays assignable from every editor's real result
// object. Returns null (caller falls back to a hard error) if either body isn't a plain interface
// or a member's underlying type genuinely disagrees across bodies - that's a real conflict, not a
// benign optionality difference, and must not be silently guessed at.
function mergeInterfaceBodies(nameForErrors, blockA, blockB) {
  const linesA = blockA.split('\n');
  const linesB = blockB.split('\n');
  const openA = linesA[0].match(/\{\s*$/);
  const openB = linesB[0].match(/\{\s*$/);
  if (!openA || !openB || linesA[linesA.length - 1].trim() !== '}' || linesB[linesB.length - 1].trim() !== '}') {
    return null;
  }
  const membersA = splitInterfaceMembers(linesA.slice(1, -1));
  const membersB = splitInterfaceMembers(linesB.slice(1, -1));
  const sigB = new Map(membersB.map((m) => [memberNameAndSignature(m)?.name, m]));
  const seenNamesB = new Set();

  const mergedMembers = membersA.map((memberLines) => {
    const sigA = memberNameAndSignature(memberLines);
    if (!sigA) return memberLines;
    const other = sigB.get(sigA.name);
    if (!other) return forceOptional(memberLines, sigA);
    seenNamesB.add(sigA.name);
    const sigOther = memberNameAndSignature(other);
    if (sigOther.typeAndRest !== sigA.typeAndRest) return null; // real type conflict
    return sigA.optional || sigOther.optional ? forceOptional(memberLines, sigA) : memberLines;
  });
  if (mergedMembers.includes(null)) return null;

  const extraFromB = membersB.filter((m) => {
    const sig = memberNameAndSignature(m);
    return sig && !seenNamesB.has(sig.name);
  }).map((m) => forceOptional(m, memberNameAndSignature(m)));

  const body = [...mergedMembers, ...extraFromB].flat();
  return [linesA[0], ...body, '}'].join('\n');
}

function forceOptional(memberLines, sig) {
  if (sig.optional) return memberLines;
  const idx = memberLines.findIndex((l) => memberNameAndSignature([l])?.name === sig.name);
  if (idx === -1) return memberLines;
  const out = memberLines.slice();
  out[idx] = out[idx].replace(/^(\s*(?:\[?['"]?[A-Za-z_$][A-Za-z0-9_$-]*['"]?\]?))(\s*:)/, '$1?$2');
  return out;
}

function dedupeTopLevelDeclarations(source) {
  const lines = source.split('\n');
  const declRe = /^(?:export\s+)?(?:interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b/;
  const seen = new Map();
  const output = [];
  let i = 0;
  while (i < lines.length) {
    const match = lines[i].match(declRe);
    if (!match) {
      output.push(lines[i]);
      i += 1;
      continue;
    }
    const name = match[1];
    let depth = 0;
    let sawBrace = false;
    let j = i;
    for (; j < lines.length; j += 1) {
      for (const ch of lines[j]) {
        if (ch === '{') { depth += 1; sawBrace = true; }
        else if (ch === '}') depth -= 1;
      }
      const closed = sawBrace ? depth === 0 : /;\s*$/.test(lines[j]);
      if (closed) { j += 1; break; }
    }
    const block = lines.slice(i, j).join('\n');
    const comment = popTrailingJsDocComment(output);
    if (seen.has(name)) {
      const existing = seen.get(name);
      if (existing !== block) {
        // `type NAME = unknown;` is generate-plugin-methods.js's stub for a type ref it couldn't
        // resolve FROM THAT EDITOR'S OWN source files - not evidence the name has no real shape,
        // just that whichever file declares it wasn't in that editor's source list (`comment` is a
        // real word/forms typedef a Pdf method also references, but pdf/api_plugins.js never
        // declares it). Prefer the real declared shape another editor's parse already found.
        const stubRe = new RegExp(`^type ${name} = unknown;$`);
        if (stubRe.test(existing) && !stubRe.test(block)) { seen.set(name, block); output[output.indexOf(existing)] = block; i = j; continue; }
        if (stubRe.test(block) && !stubRe.test(existing)) { i = j; continue; }
        const merged = mergeInterfaceBodies(name, existing, block);
        if (merged === null) {
          throw new Error(`Ambient bundle: '${name}' is declared twice with different bodies - cannot flatten into one global scope. First:\n${existing}\n\nSecond:\n${block}`);
        }
        seen.set(name, merged);
        const idx = output.indexOf(existing);
        if (idx !== -1) output[idx] = merged;
      }
      // Otherwise an identical duplicate (and its doc-comment, just popped) - drop both.
    } else {
      seen.set(name, block);
      if (comment) output.push(...comment);
      output.push(block);
    }
    i = j;
  }
  return output.join('\n');
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
  // Everything inside the block carries the wrapper's indentation; unwrapped to the top level it
  // would read as if it were still nested, so the whole block is shifted left by its own common
  // indentation instead of just having its first line trimmed.
  const raw = source.slice(start, end).replace(/^\n+/, '').replace(/\s+$/, '');
  const indentWidths = raw.split('\n').filter((line) => line.trim()).map((line) => line.match(/^[ \t]*/)[0].length);
  const commonIndent = Math.min(...indentWidths);
  const inner = raw.split('\n').map((line) => line.slice(commonIndent)).join('\n');
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
// A flattened, non-module ambient bundle of @onlyoffice/plugins-types for tools (e.g. a Monaco
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

  const body = dedupeTopLevelDeclarations(sections.join('\n'));

  return [header, body, `// ---- window.Asc / window.AscDesktopEditor / window.AscSimpleRequest ----\n${globalBlock}\n`].join('\n');
}

function buildEditorAddon(editorFile) {
  const stripped = readStripped(editorFile);
  // The editor entry point files only ever contain a declare global {} block (the per-editor Api
  // global) plus type-only re-exports already dropped by stripModuleSyntax - unwrap it directly.
  return unwrapDeclareGlobal(stripped);
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  fs.writeFileSync(path.join(OUT_DIR, 'onlyoffice-plugins-types.ambient.d.ts'), buildBaseBundle());
  console.log('Generated dist/ambient/onlyoffice-plugins-types.ambient.d.ts');

  for (const [editorName, editorFile] of Object.entries(EDITOR_FILES)) {
    const header = `// AUTO-GENERATED - do not edit by hand. Run \`npm run generate-ambient\` to regenerate.
// Declares the global \`Api\` of the "${editorName}" editor (${editorFile}). Load this AFTER
// onlyoffice-plugins-types.ambient.d.ts, which declares the namespace it refers to; load exactly one
// editor addon, since the four declare the same \`Api\` global with a different type.
`;
    const outPath = path.join(OUT_DIR, `onlyoffice-plugins-types.${editorName}-api.ambient.d.ts`);
    fs.writeFileSync(outPath, `${header}\n${buildEditorAddon(editorFile)}\n`);
    console.log(`Generated dist/ambient/onlyoffice-plugins-types.${editorName}-api.ambient.d.ts`);
  }
}

main();
