// dist/api/ is the machine-readable companion to the types: the same signatures, descriptions,
// runnable examples and docs links the .d.ts JSDoc carries, but as JSON for tools that don't parse
// TypeScript (search indexes, RAG pipelines, AI agents).
//
// It is a TREE, not one file, and that is the whole point. The previous single
// `dist/api-index.json` reached 6.3 MB / ~1.6M tokens - eight times a typical model context - so the
// one consumer it was built for could not actually read it, only grep fragments out of it. The
// layout below is sized for how an agent works: load a small index, then read exactly one detail
// file.
//
//   dist/api/index.json                     manifest: editors, counts, how to navigate (~1 KB)
//   dist/api/<editor>/index.json            every name -> signature for that editor (~20-40k tokens)
//   dist/api/<editor>/classes/<Class>.json  full detail for one class: docs, params, examples
//   dist/api/<editor>/classes/<Class>/      ...instead sharded per method when a class is huge
//   dist/api/<editor>/typedefs.json
//   dist/api/<editor>/events.json
//   dist/api/<editor>/executeMethods.json
//   dist/api/runtime.json                   AscPlugin/config/services (not per-editor)
//
// Each generator replaces its own section wholesale, so a renamed or removed member disappears on
// the next run instead of going stale.

const fs = require('fs');
const path = require('path');

const API_DIR = path.join(__dirname, '..', 'dist', 'api');

// A class detail file above this stops being "one small read" and gets sharded into per-method
// files. Only a handful of classes hit it - `ApiWorksheetFunction` is the Excel formula library with
// hundreds of members - but without the rule those few reintroduce exactly the problem this layout
// exists to solve.
const SHARD_THRESHOLD_BYTES = 80 * 1024;

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortKeysDeep(value[key])]));
  }
  return value;
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(sortKeysDeep(value), null, 2)}\n`);
}

function removeIfExists(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function packageMeta() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return { package: pkg.name, version: pkg.version };
}

// Signatures only - this is the file an agent is expected to hold in context, so it carries nothing
// it doesn't need to answer "does this member exist, and what is its shape".
function buildEditorIndex(editorDir) {
  const entries = {};

  const classesDir = path.join(editorDir, 'classes');
  if (fs.existsSync(classesDir)) {
    for (const name of fs.readdirSync(classesDir)) {
      const full = path.join(classesDir, name);
      if (name.endsWith('.json')) {
        const cls = name.replace(/\.json$/, '');
        const data = JSON.parse(fs.readFileSync(full, 'utf8'));
        for (const [method, m] of Object.entries(data.methods || {})) {
          entries[`${cls}.${method}`] = m.signature || '';
        }
      } else if (fs.statSync(full).isDirectory()) {
        for (const methodFile of fs.readdirSync(full)) {
          // `_class.json` holds the class's own prose, not a member - counting it would add one
          // phantom entry per sharded class to the index.
          if (methodFile === '_class.json') continue;
          const data = JSON.parse(fs.readFileSync(path.join(full, methodFile), 'utf8'));
          entries[`${name}.${methodFile.replace(/\.json$/, '')}`] = data.signature || '';
        }
      }
    }
  }

  const executeMethods = path.join(editorDir, 'executeMethods.json');
  if (fs.existsSync(executeMethods)) {
    for (const [name, m] of Object.entries(JSON.parse(fs.readFileSync(executeMethods, 'utf8')))) {
      entries[`executeMethod:${name}`] = m.signature || m.args || '';
    }
  }

  return entries;
}

function rebuildRootIndex() {
  const editors = {};
  if (fs.existsSync(API_DIR)) {
    for (const editor of fs.readdirSync(API_DIR)) {
      const dir = path.join(API_DIR, editor);
      if (!fs.statSync(dir).isDirectory()) continue;
      const indexFile = path.join(dir, 'index.json');
      if (!fs.existsSync(indexFile)) continue;
      editors[editor] = { members: Object.keys(JSON.parse(fs.readFileSync(indexFile, 'utf8'))).length };
    }
  }

  writeJson(path.join(API_DIR, 'index.json'), {
    ...packageMeta(),
    howToUse: [
      'Load <editor>/index.json for every member name and signature in that editor.',
      'Then read one detail file: <editor>/classes/<Class>.json, or <editor>/classes/<Class>/<Method>.json when the class was sharded.',
      'executeMethod names live in <editor>/executeMethods.json; the plugin runtime (Asc.plugin, config.json) in runtime.json.',
      'Do not concatenate the tree - it is deliberately split so no single read is large.',
    ],
    editors,
  });
}

function writeClasses(editorDir, classes) {
  const classesDir = path.join(editorDir, 'classes');
  removeIfExists(classesDir);

  for (const [name, data] of Object.entries(classes)) {
    const asOneFile = `${JSON.stringify(sortKeysDeep(data), null, 2)}\n`;
    if (Buffer.byteLength(asOneFile) <= SHARD_THRESHOLD_BYTES) {
      writeJson(path.join(classesDir, `${name}.json`), data);
      continue;
    }
    // Sharded: the class's own prose goes to _class.json, each method to its own file.
    const { methods = {}, ...classOwn } = data;
    writeJson(path.join(classesDir, name, '_class.json'), {
      ...classOwn,
      sharded: true,
      methodCount: Object.keys(methods).length,
    });
    for (const [method, m] of Object.entries(methods)) {
      writeJson(path.join(classesDir, name, `${method}.json`), m);
    }
  }
}

function mergeApiIndex(editor, sections) {
  const editorDir = path.join(API_DIR, editor);

  if (sections.classes) writeClasses(editorDir, sections.classes);
  for (const key of ['typedefs', 'events', 'executeMethods']) {
    if (!sections[key]) continue;
    writeJson(path.join(editorDir, `${key}.json`), sections[key]);
  }

  writeJson(path.join(editorDir, 'index.json'), buildEditorIndex(editorDir));
  rebuildRootIndex();
}

// The plugin runtime surface (Asc.plugin, config.json, the services bridge) is not per-editor, so it
// sits beside the editor directories rather than inside one.
function mergeRuntimeIndex(sections) {
  writeJson(path.join(API_DIR, 'runtime.json'), sections);
  rebuildRootIndex();
}

module.exports = { mergeApiIndex, mergeRuntimeIndex, API_DIR };
