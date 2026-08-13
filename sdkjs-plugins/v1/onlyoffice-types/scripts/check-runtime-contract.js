// Two complementary checks, against two different sources:
//
// 1. *Bootstrap assignments* - a fixed set of members that the vendored `plugins.dev.js` harness
//    assigns directly (guid, attachEvent, the custom-menu click handlers, ...). Verified in both
//    directions: present in the runtime file AND declared by us.
// 2. *API completeness* - every member sdkjs's own JSDoc documents on the plugin object must be
//    declared by us. This half is NOT in plugins.dev.js: the bulk of the API (callCommand,
//    executeMethod, callModule, createInputHelper, ...) is installed by `startPluginApi()`, whose
//    real source is sdkjs `common/plugins/plugin_base_api.js`. Checking only plugins.dev.js is what
//    previously let ~10 documented members go undeclared while this script still reported success.
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
// plugins.dev.js, not the minified plugins.js: the minifier assigns short variable names
// (`b.Asc.plugin`, `e.Buttons`, ...) that shift on every rebuild, which makes matching against
// them by hardcoded prefix fragile - plugins.dev.js keeps the real `window.Asc.plugin`/`Asc.Buttons`
// qualified names stable across rebuilds.
const DEFAULT_RUNTIME = path.resolve(PACKAGE_ROOT, '..', 'plugins.dev.js');
const DECLARATIONS = path.join(PACKAGE_ROOT, 'index.d.ts');
// AscPlugin/Buttons/Asc/PluginScope live in src/plugin/*.d.ts, not index.d.ts itself -
// index.d.ts is just a barrel that re-exports them. Concatenate every .d.ts module so the
// interface lookup below doesn't care which physical file declares a given interface.
const DECLARATION_GLOB_DIRS = ['src/plugin', 'src/config', 'src/theme', 'src/services'];

// sdkjs documents the plugin-side API with `@memberof Plugin` / `@memberof InputHelper` plus an
// `@alias` giving the real member name - the same convention the method/event generators already
// read. `plugin_base.js` carries no @alias blocks today, but it is the other half of the same
// runtime and is read too so a future move between the files can't silently drop a member.
const API_SOURCE_FILES = ['plugin_base_api.js', 'plugin_base.js'];

// The interface each `@memberof` maps onto in our declarations.
const MEMBEROF_TO_INTERFACE = { Plugin: 'AscPlugin', InputHelper: 'InputHelper' };

const RUNTIME_PLUGIN_MEMBERS = [
  'guid',
  'windowID',
  'event_onContextMenuClick',
  'event_onToolbarMenuClick',
  'event_onWindowHeaderMenuClick',
  'attachContextMenuClickEvent',
  'attachEvent',
  'attachEditorEvent',
  'attachToolbarMenuClickEvent',
  'attachWindowHeaderMenuClickEvent',
  'detachEvent',
  'detachEditorEvent',
  'onEvent',
];

const RUNTIME_BUTTON_MEMBERS = [
  'registerContextMenu',
  'registerToolbarMenu',
  'updateToolbarMenu',
  'registerWindowHeader',
  'updateWindowHeader',
  'registerContentControl',
];

const RUNTIME_CONSTRUCTORS = [
  'ButtonContextMenu',
  'ButtonToolbar',
  'ButtonContentControl',
  'ButtonWindowHeader',
];

function readOption(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

function resolveApiSources() {
  const sdkjs = readOption('sdkjs', process.env.SDKJS_PATH);
  if (!sdkjs) {
    throw new Error('Set SDKJS_PATH or pass --sdkjs <path-to-sdkjs> (needed to verify the plugin API surface is completely declared).');
  }
  const dir = path.join(path.resolve(sdkjs), 'common', 'plugins');
  if (!fs.existsSync(dir)) throw new Error(`sdkjs plugin sources not found: ${dir}`);
  return API_SOURCE_FILES.map((file) => path.join(dir, file)).filter((file) => fs.existsSync(file));
}

// Splits on `/**` rather than running a JSDoc parser: these blocks only ever carry single-line tags,
// so a full parse would be a dependency for no extra signal - the same approach check-plugin-events
// takes against the event sources.
function documentedApiMembers(files) {
  const byInterface = {};
  for (const file of files) {
    for (const block of fs.readFileSync(file, 'utf8').split('/**').slice(1)) {
      const head = block.split('*/')[0];
      const alias = head.match(/@alias\s+(\w+)/);
      const memberof = head.match(/@memberof\s+(\w+)/);
      // NOTE: unlike the method/event sources - where `@undocumented` marks members deliberately
      // kept out of the public API - in this file it happens to tag every *method* (callCommand,
      // executeMethod, attachEvent, resizeWindow, ...) while leaving the event-handler properties
      // (init, button, onMethodReturn, ...) untagged. Those methods are unambiguously public: they
      // are on api.onlyoffice.com and half of them are already declared here. So this check must
      // NOT filter on `@undocumented`, or it would skip the very members most worth verifying.
      if (!alias || !memberof) continue;
      const target = MEMBEROF_TO_INTERFACE[memberof[1]];
      if (!target) continue; // a @memberof we don't model as an interface (e.g. PluginWindow docs)
      (byInterface[target] = byInterface[target] || new Set()).add(alias[1]);
    }
  }
  return byInterface;
}

// Editor-dispatched events reach the plugin as `Asc.plugin["event_" + name]` (see the onEvent
// branch in plugins.dev.js), so a documented `onFoo` may legitimately be declared as either
// `onFoo` or `event_onFoo` - both satisfy the contract.
function isDeclared(declared, member) {
  return declared.has(member) || declared.has(`event_${member}`);
}

function checkApiCompleteness(declarations, files) {
  const documented = documentedApiMembers(files);
  const failures = [];
  let total = 0;

  for (const [interfaceName, members] of Object.entries(documented)) {
    total += members.size;
    let declared;
    try {
      declared = declaredMembers(declarations, interfaceName);
    } catch {
      failures.push(`${interfaceName}: interface is not declared at all (documents ${members.size} member(s): ${[...members].sort().join(', ')})`);
      continue;
    }
    const missing = [...members].filter((member) => !isDeclared(declared, member)).sort();
    if (missing.length > 0) failures.push(`${interfaceName}: missing declarations: ${missing.join(', ')}`);
  }

  if (failures.length > 0) {
    throw new Error(`documented plugin API members are not declared -\n  ${failures.join('\n  ')}`);
  }
  console.log(`Plugin API surface: ${total} documented members all declared`);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasAssignment(source, objectExpression, member) {
  return new RegExp(`${objectExpression}\\.${escapeRegExp(member)}\\s*=`).test(source);
}

function collectDeclarationFiles() {
  const files = [DECLARATIONS];
  for (const dir of DECLARATION_GLOB_DIRS) {
    const absDir = path.join(PACKAGE_ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    for (const entry of fs.readdirSync(absDir)) {
      if (entry.endsWith('.d.ts')) files.push(path.join(absDir, entry));
    }
  }
  return files;
}

function readAllDeclarations() {
  return collectDeclarationFiles()
    .map(file => fs.readFileSync(file, 'utf8'))
    .join('\n');
}

function extractInterfaceBody(source, name) {
  const match = source.match(new RegExp(`interface\\s+${name}\\s*\\{`));
  if (!match) throw new Error(`Could not find interface ${name} in index.d.ts or ${DECLARATION_GLOB_DIRS.join(', ')}`);

  let depth = 1;
  for (let index = match.index + match[0].length; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(match.index + match[0].length, index);
  }
  throw new Error(`Unclosed interface ${name}`);
}

function declaredMembers(source, interfaceName) {
  const body = extractInterfaceBody(source, interfaceName);
  return new Set([...body.matchAll(/^\s*([A-Za-z_$][A-Za-z0-9_$]*)\??\s*(?::|\()/gm)].map(match => match[1]));
}

function checkGroup({name, expected, declared, runtime, runtimeObject}) {
  const missingDeclarations = expected.filter(member => !declared.has(member));
  const missingRuntime = expected.filter(member => !hasAssignment(runtime, runtimeObject, member));

  if (missingDeclarations.length > 0) {
    throw new Error(`${name}: missing declarations: ${missingDeclarations.join(', ')}`);
  }
  if (missingRuntime.length > 0) {
    throw new Error(`${name}: missing runtime assignments in plugins.dev.js: ${missingRuntime.join(', ')}`);
  }

  // Deliberately says "bootstrap members", not "runtime members": this group is a fixed list of
  // what plugins.dev.js itself assigns, which is only part of the API - completeness of the whole
  // surface is checkApiCompleteness's job, against sdkjs.
  console.log(`${name}: ${expected.length} bootstrap members verified`);
}

function main() {
  const runtimePath = path.resolve(readOption('runtime', DEFAULT_RUNTIME));
  if (!fs.existsSync(runtimePath)) throw new Error(`Runtime file does not exist: ${runtimePath}`);
  if (!fs.existsSync(DECLARATIONS)) throw new Error(`Declarations file does not exist: ${DECLARATIONS}`);

  const apiSources = resolveApiSources();
  const runtime = fs.readFileSync(runtimePath, 'utf8');
  const declarations = readAllDeclarations();

  checkApiCompleteness(declarations, apiSources);

  checkGroup({
    name: 'Asc.plugin',
    expected: RUNTIME_PLUGIN_MEMBERS,
    declared: declaredMembers(declarations, 'AscPlugin'),
    runtime,
    runtimeObject: '(?:window\\.)?Asc\\.plugin',
  });
  checkGroup({
    name: 'Asc.Buttons',
    expected: RUNTIME_BUTTON_MEMBERS,
    declared: declaredMembers(declarations, 'Buttons'),
    runtime,
    runtimeObject: '(?:window\\.)?Asc\\.Buttons',
  });

  const ascBody = extractInterfaceBody(declarations, 'Asc');
  for (const constructor of RUNTIME_CONSTRUCTORS) {
    if (!new RegExp(`\\b${escapeRegExp(constructor)}\\s*:`).test(ascBody)) {
      throw new Error(`Asc: missing constructor declaration: ${constructor}`);
    }
    if (!new RegExp(`(?:window\\.)?Asc\\.${escapeRegExp(constructor)}\\s*=`).test(runtime)) {
      throw new Error(`Asc: missing runtime constructor assignment in plugins.dev.js: ${constructor}`);
    }
  }
  console.log(`Asc constructors: ${RUNTIME_CONSTRUCTORS.length} runtime constructors verified`);

  const scopeBody = extractInterfaceBody(declarations, 'PluginScope');
  if (!/prototype\??\s*:\s*\{[\s\S]*?\bclear\s*\(\s*\)\s*:\s*\(?.*?\)?\s*void/.test(scopeBody)) {
    throw new Error('PluginScope: missing prototype.clear declaration');
  }
  if (!/(?:window\.)?Asc\.scope\.prototype\s*=\s*\{[^}]*\bclear\s*:/.test(runtime)) {
    throw new Error('PluginScope: missing runtime prototype.clear assignment in plugins.dev.js');
  }
  console.log('Asc.scope.prototype.clear: runtime member verified');
}

try {
  main();
} catch (error) {
  console.error(`Runtime contract check failed: ${error.message}`);
  process.exitCode = 1;
}
