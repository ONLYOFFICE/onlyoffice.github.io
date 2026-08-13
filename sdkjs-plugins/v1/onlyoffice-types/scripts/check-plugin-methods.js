// Drift checker for the executeMethod/plugin-event surface: sdkjs documents `Asc.plugin.executeMethod`
// names via `Api.prototype["pluginMethod_<Name>"]` doclets (common/apiBase_plugins.js, shared across
// editors and filtered by @typeofeditors, plus each editor's own <editor>/api_plugins.js /
// sdkjs-forms/apiPlugins.js / sdkjs-ext/<editor>/api_plugins.js) and plugin-window events via
// common/base-plugin-events.js. This script diffs that source against our *-methods.d.ts/events.d.ts
// so a method/event ONLYOFFICE adds later doesn't silently go untyped - it fails CI instead.
//
// Deliberately does NOT generate .d.ts bodies: the parameter/return shapes here are hand-curated
// against ONLYOFFICE's own documented examples (richer than a mechanical @param->tuple conversion
// would produce), and regenerating them wholesale would risk losing that curation. This only answers
// "is anything documented but missing from our types" - a human still writes the actual addition.

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
  const sdkjsExt = readOption('sdkjs-ext') || process.env.SDKJS_EXT_PATH || path.resolve(resolvedSdkjs, '..', 'sdkjs-ext');

  return {
    sdkjs: resolvedSdkjs,
    sdkjsForms: path.resolve(sdkjsForms),
    sdkjsExt: path.resolve(sdkjsExt),
  };
}

// `@typeofeditors` codes, as used throughout sdkjs's own JSDoc.
const EDITOR_CODES = { word: 'CDE', cell: 'CSE', slide: 'CPE', pdf: 'PDFE', forms: 'CFE' };

// Mirrors tools/docs/plugins/config/methods/<editor>.json in the ONLYOFFICE/onlyoffice super-repo:
// the common file (filtered by @typeofeditors) plus each editor's own source(s).
function methodSources(paths, editor) {
  const common = path.join(paths.sdkjs, 'common', 'apiBase_plugins.js');
  switch (editor) {
    case 'word':
      return [common, path.join(paths.sdkjs, 'word', 'api_plugins.js'), path.join(paths.sdkjsExt, 'word', 'api_plugins.js')];
    case 'cell':
      return [common, path.join(paths.sdkjs, 'cell', 'api_plugins.js')];
    case 'slide':
      return [common, path.join(paths.sdkjs, 'slide', 'api_plugins.js'), path.join(paths.sdkjsExt, 'slide', 'api_plugins.js')];
    case 'pdf':
      return [common, path.join(paths.sdkjs, 'pdf', 'api_plugins.js')];
    case 'forms':
      return [common, path.join(paths.sdkjs, 'word', 'api_plugins.js'), path.join(paths.sdkjsForms, 'apiPlugins.js')];
    default:
      throw new Error(`Unknown editor: ${editor}`);
  }
}

// Splits on `/**` rather than using a JSDoc parser: these blocks are simple enough (a handful of
// single-line tags) that a full parse isn't needed, and this stays dependency-free.
function extractDocumentedAliases(filePath, editorCode) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const blocks = text.split(/\/\*\*/).slice(1);
  const names = [];
  for (const block of blocks) {
    const head = block.split('*/')[0];
    const aliasMatch = head.match(/@alias\s+(\w+)/);
    if (!aliasMatch) continue;
    if (/@undocumented/.test(head)) continue;
    // The common file's methods are shared across several editors - only the ones whose
    // @typeofeditors tag actually includes this editor's code apply here.
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

function extractDocumentedEvents(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const blocks = text.split(/\/\*\*/).slice(1);
  const names = [];
  for (const block of blocks) {
    const head = block.split('*/')[0];
    const aliasMatch = head.match(/@alias\s+(\w+)/);
    if (!aliasMatch || /@undocumented/.test(head)) continue;
    names.push(aliasMatch[1]);
  }
  return names;
}

const METHOD_FILES = {
  word: 'src/word-methods.d.ts',
  cell: 'src/cell-methods.d.ts',
  slide: 'src/slide-methods.d.ts',
  pdf: 'src/pdf-methods.d.ts',
  forms: 'src/forms-methods.d.ts',
};

function checkMethods(paths) {
  let missingTotal = 0;
  for (const editor of Object.keys(EDITOR_CODES)) {
    const editorCode = EDITOR_CODES[editor];
    const documented = new Set();
    for (const source of methodSources(paths, editor)) {
      for (const name of extractDocumentedAliases(source, editorCode)) documented.add(name);
    }

    const oursPath = path.join(PACKAGE_ROOT, METHOD_FILES[editor]);
    const ours = fs.existsSync(oursPath) ? fs.readFileSync(oursPath, 'utf8') : '';
    const missing = [...documented].filter((name) => !new RegExp(`\\b${name}\\b`).test(ours));

    if (missing.length > 0) {
      missingTotal += missing.length;
      console.error(`${editor}: missing documented executeMethod name(s): ${missing.join(', ')}`);
    } else {
      console.log(`${editor}: ${documented.size} documented executeMethod names all present`);
    }
  }
  return missingTotal;
}

function checkEvents(paths) {
  const source = path.join(paths.sdkjs, 'common', 'base-plugin-events.js');
  const documented = extractDocumentedEvents(source);
  const eventsPath = path.join(PACKAGE_ROOT, 'src', 'plugin', 'events.d.ts');
  const ours = fs.readFileSync(eventsPath, 'utf8');
  const missing = documented.filter((name) => !new RegExp(`\\b${name}\\b`).test(ours));

  if (missing.length > 0) {
    console.error(`events: missing documented plugin event(s): ${missing.join(', ')}`);
    return missing.length;
  }
  console.log(`events: ${documented.length} documented base plugin events all present`);
  return 0;
}

function main() {
  const paths = resolvePaths();
  const missingMethods = checkMethods(paths);
  const missingEvents = checkEvents(paths);
  const total = missingMethods + missingEvents;
  if (total > 0) {
    throw new Error(`${total} documented executeMethod name(s)/event(s) are missing from the package - see above.`);
  }
}

try {
  main();
} catch (error) {
  console.error(`Plugin-method drift check failed: ${error.message}`);
  process.exitCode = 1;
}
