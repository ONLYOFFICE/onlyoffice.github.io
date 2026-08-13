// Drift checker for the plugin-window event surface: sdkjs documents `attachEvent`/`event_on*` names
// via `@alias` doclets (all `@memberof Plugin`) in common/base-plugin-events.js, plus each editor's
// own <editor>/plugin-events.js / sdkjs-forms/plugin-events.js (mirrors
// tools/docs/plugins/config/events/<editor>.json in the ONLYOFFICE/onlyoffice super-repo). This
// script diffs that source against our hand-maintained `src/plugin/events.d.ts` so an event
// ONLYOFFICE adds later doesn't silently go untyped - it fails CI instead.
//
// The equivalent check for executeMethod names (word/cell/slide/pdf/forms) no longer lives here:
// `scripts/generate-plugin-methods.js` now generates `src/generated/*-methods.ts` directly from the
// same sdkjs JSDoc, and `npm run check-generated` (a `git diff --exit-code` against `src/generated`
// after a fresh regeneration) already catches drift there - a separate name-only diff would be
// redundant with a generator that reproduces the full body anyway.
//
// Deliberately does NOT generate events.d.ts: PluginEventMap's payload shapes are hand-curated
// against ONLYOFFICE's own documented examples. This only answers "is anything documented but
// missing from our types" - a human still writes the actual addition.

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');

function readOption(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function resolvePaths() {
  const sdkjs = readOption('sdkjs') || process.env.SDKJS_PATH;
  if (!sdkjs) throw new Error('Set SDKJS_PATH or pass --sdkjs <path-to-sdkjs>.');
  const resolvedSdkjs = path.resolve(sdkjs);
  if (!fs.existsSync(resolvedSdkjs)) throw new Error(`sdkjs directory does not exist: ${resolvedSdkjs}`);

  const sdkjsForms = readOption('sdkjs-forms') || process.env.SDKJS_FORMS_PATH || path.resolve(resolvedSdkjs, '..', 'sdkjs-forms');

  return { sdkjs: resolvedSdkjs, sdkjsForms: path.resolve(sdkjsForms) };
}

// `@typeofeditors` codes, as used throughout sdkjs's own JSDoc.
const EDITOR_CODES = { word: 'CDE', cell: 'CSE', slide: 'CPE', pdf: 'PDFE', forms: 'CFE' };

// Mirrors tools/docs/plugins/config/events/<editor>.json in the ONLYOFFICE/onlyoffice super-repo:
// the common file (filtered by @typeofeditors) plus each editor's own event source.
function eventSources(paths, editor) {
  const common = path.join(paths.sdkjs, 'common', 'base-plugin-events.js');
  switch (editor) {
    case 'word': return [common, path.join(paths.sdkjs, 'word', 'plugin-events.js')];
    case 'cell': return [common, path.join(paths.sdkjs, 'cell', 'plugin-events.js')];
    case 'slide': return [common, path.join(paths.sdkjs, 'slide', 'plugin-events.js')];
    case 'pdf': return [common, path.join(paths.sdkjs, 'pdf', 'plugin-events.js')];
    case 'forms': return [common, path.join(paths.sdkjsForms, 'plugin-events.js')];
    default: throw new Error(`Unknown editor: ${editor}`);
  }
}

// Splits on `/**` rather than using a JSDoc parser: these blocks are simple enough (a handful of
// single-line tags) that a full parse isn't needed, and this stays dependency-free.
function extractDocumentedEvents(filePath, editorCode) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const blocks = text.split(/\/\*\*/).slice(1);
  const names = [];
  for (const block of blocks) {
    const head = block.split('*/')[0];
    const aliasMatch = head.match(/@alias\s+(\w+)/);
    if (!aliasMatch || /@undocumented/.test(head)) continue;
    // The common file's events are shared across several editors - only the ones whose
    // @typeofeditors tag actually includes this editor's code apply here. No tag at all means
    // "applies to every editor".
    const editorsTag = head.match(/@typeofeditors\s*(\[[^\]]*\])/);
    if (editorsTag) {
      let codes;
      try { codes = JSON.parse(editorsTag[1].replace(/'/g, '"')); } catch { codes = []; }
      if (!codes.includes(editorCode)) continue;
    }
    names.push(aliasMatch[1]);
  }
  return names;
}

function checkEvents(paths) {
  const documented = new Set();
  for (const editor of Object.keys(EDITOR_CODES)) {
    for (const source of eventSources(paths, editor)) {
      for (const name of extractDocumentedEvents(source, EDITOR_CODES[editor])) documented.add(name);
    }
  }

  const eventsPath = path.join(PACKAGE_ROOT, 'src', 'plugin', 'events.d.ts');
  const ours = fs.readFileSync(eventsPath, 'utf8');
  const missing = [...documented].filter((name) => !new RegExp(`\\b${name}\\b`).test(ours));

  if (missing.length > 0) {
    console.error(`events: missing documented plugin event(s): ${missing.join(', ')}`);
    return missing.length;
  }
  console.log(`events: ${documented.size} documented plugin events (common + per-editor) all present`);
  return 0;
}

function main() {
  const paths = resolvePaths();
  const missingEvents = checkEvents(paths);
  if (missingEvents > 0) {
    throw new Error(`${missingEvents} documented plugin event(s) are missing from the package - see above.`);
  }
}

try {
  main();
} catch (error) {
  console.error(`Plugin-event drift check failed: ${error.message}`);
  process.exitCode = 1;
}
