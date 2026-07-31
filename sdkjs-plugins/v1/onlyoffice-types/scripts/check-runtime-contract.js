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

  console.log(`${name}: ${expected.length} runtime members verified`);
}

function main() {
  const runtimePath = path.resolve(readOption('runtime', DEFAULT_RUNTIME));
  if (!fs.existsSync(runtimePath)) throw new Error(`Runtime file does not exist: ${runtimePath}`);
  if (!fs.existsSync(DECLARATIONS)) throw new Error(`Declarations file does not exist: ${DECLARATIONS}`);

  const runtime = fs.readFileSync(runtimePath, 'utf8');
  const declarations = readAllDeclarations();

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
