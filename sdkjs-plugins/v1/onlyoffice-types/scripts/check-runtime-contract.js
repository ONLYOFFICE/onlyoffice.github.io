const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
const DEFAULT_RUNTIME = path.resolve(PACKAGE_ROOT, '..', 'plugins.js');
const DECLARATIONS = path.join(PACKAGE_ROOT, 'index.d.ts');

const RUNTIME_PLUGIN_MEMBERS = [
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

function extractInterfaceBody(source, name) {
  const match = source.match(new RegExp(`interface\\s+${name}\\s*\\{`));
  if (!match) throw new Error(`Could not find interface ${name} in ${DECLARATIONS}`);

  let depth = 1;
  for (let index = match.index + match[0].length; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(match.index + match[0].length, index);
  }
  throw new Error(`Unclosed interface ${name} in ${DECLARATIONS}`);
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
    throw new Error(`${name}: missing runtime assignments in plugins.js: ${missingRuntime.join(', ')}`);
  }

  console.log(`${name}: ${expected.length} runtime members verified`);
}

function main() {
  const runtimePath = path.resolve(readOption('runtime', DEFAULT_RUNTIME));
  if (!fs.existsSync(runtimePath)) throw new Error(`Runtime file does not exist: ${runtimePath}`);
  if (!fs.existsSync(DECLARATIONS)) throw new Error(`Declarations file does not exist: ${DECLARATIONS}`);

  const runtime = fs.readFileSync(runtimePath, 'utf8');
  const declarations = fs.readFileSync(DECLARATIONS, 'utf8');

  checkGroup({
    name: 'Asc.plugin',
    expected: RUNTIME_PLUGIN_MEMBERS,
    declared: declaredMembers(declarations, 'AscPlugin'),
    runtime,
    runtimeObject: 'b\\.Asc\\.plugin',
  });
  checkGroup({
    name: 'Asc.Buttons',
    expected: RUNTIME_BUTTON_MEMBERS,
    declared: declaredMembers(declarations, 'Buttons'),
    runtime,
    runtimeObject: 'e\\.Buttons',
  });

  const ascBody = extractInterfaceBody(declarations, 'Asc');
  for (const constructor of RUNTIME_CONSTRUCTORS) {
    if (!new RegExp(`\\b${escapeRegExp(constructor)}\\s*:`).test(ascBody)) {
      throw new Error(`Asc: missing constructor declaration: ${constructor}`);
    }
    if (!new RegExp(`e\\.${escapeRegExp(constructor)}\\s*=`).test(runtime)) {
      throw new Error(`Asc: missing runtime constructor assignment in plugins.js: ${constructor}`);
    }
  }
  console.log(`Asc constructors: ${RUNTIME_CONSTRUCTORS.length} runtime constructors verified`);
}

try {
  main();
} catch (error) {
  console.error(`Runtime contract check failed: ${error.message}`);
  process.exitCode = 1;
}
