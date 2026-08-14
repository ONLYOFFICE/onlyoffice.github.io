// Indexes the *plugin runtime* half of the API into dist/api/runtime.json.
//
// The other generators index what you can do INSIDE a `callCommand` body - the editor object model,
// per-editor `executeMethod` names, editor events. None of them cover how you write a plugin in the
// first place: `Asc.plugin.callCommand` itself, the async variants, the button registries, the
// `config.json` shape. Searching the index for `callCommand` or `PluginConfig` used to return
// nothing at all, which is precisely the lookup an agent starting a plugin performs first.
//
// Unlike the sdkjs-driven generators, the source here is this package's own hand-written
// declarations, read through the TypeScript compiler API rather than regexed. That matters because
// the signatures worth publishing are the ones we authored - `callCommand`'s serializability
// constraint, `executeMethod`'s per-editor overload chain - which no amount of parsing sdkjs's
// looser `@param {Function}` JSDoc would reproduce.

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { mergeRuntimeIndex } = require('./api-index.js');

const PACKAGE_ROOT = path.join(__dirname, '..');

// Grouped the way a plugin author encounters them, not by file: `plugin` is the runtime object,
// `config` is config.json, `services` is the desktop/request bridge.
const GROUPS = {
  plugin: ['src/plugin/plugin.d.ts', 'src/plugin/events.d.ts', 'src/plugin/buttons.d.ts'],
  config: ['src/config/plugin-config.d.ts'],
  services: ['src/services/desktop-editor.d.ts', 'src/services/simple-request.d.ts'],
};

function jsDocText(node) {
  const parts = ts.getJSDocCommentsAndTags(node)
    .filter(ts.isJSDoc)
    .map((doc) => (typeof doc.comment === 'string' ? doc.comment : ts.getTextOfJSDocComment(doc.comment) || ''))
    .filter(Boolean);
  return parts.join('\n\n').trim();
}

// A member's `@see`/`@deprecated`/`@since` tags, kept as data rather than folded into the prose so a
// consumer can filter on them.
function jsDocTags(node) {
  const out = {};
  for (const tag of ts.getJSDocTags(node)) {
    const name = tag.tagName.text;
    if (!['see', 'since', 'deprecated'].includes(name)) continue;
    const text = (ts.getTextOfJSDocComment(tag.comment) || '').trim();
    if (name === 'deprecated') out.deprecated = text || true;
    else out[name] = text;
  }
  return out;
}

// The declaration's own source text, whitespace-collapsed: for these hand-written members the
// declared signature *is* the documentation (`callCommand: <T>(command: () => T & ...) => void`),
// and reprinting it from the type checker would lose the parameter names.
function signatureOf(member, source) {
  return member.getText(source).replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
}

function describeMembers(node, source) {
  const members = {};
  for (const member of node.members || []) {
    const name = member.name && ts.isIdentifier(member.name) ? member.name.text
      : member.name && ts.isStringLiteral(member.name) ? member.name.text
        : null;
    if (!name) continue;
    const description = jsDocText(member);
    members[name] = {
      signature: signatureOf(member, source),
      ...(description ? { description } : {}),
      ...jsDocTags(member),
      ...(member.questionToken ? { optional: true } : {}),
    };
  }
  return members;
}

function collectFromFile(relPath) {
  const absPath = path.join(PACKAGE_ROOT, relPath);
  const text = fs.readFileSync(absPath, 'utf8');
  const source = ts.createSourceFile(absPath, text, ts.ScriptTarget.ES2020, true);
  const entries = {};

  for (const statement of source.statements) {
    if (ts.isInterfaceDeclaration(statement)) {
      const description = jsDocText(statement);
      const members = describeMembers(statement, source);
      entries[statement.name.text] = {
        kind: 'interface',
        ...(description ? { description } : {}),
        ...jsDocTags(statement),
        ...(Object.keys(members).length > 0 ? { members } : {}),
      };
    } else if (ts.isTypeAliasDeclaration(statement)) {
      const description = jsDocText(statement);
      entries[statement.name.text] = {
        kind: 'type',
        type: statement.type.getText(source).replace(/\s+/g, ' ').trim(),
        ...(description ? { description } : {}),
        ...jsDocTags(statement),
      };
    }
  }
  return entries;
}

function main() {
  const sections = {};
  let totalTypes = 0;

  for (const [group, files] of Object.entries(GROUPS)) {
    const entries = {};
    for (const relPath of files) {
      if (!fs.existsSync(path.join(PACKAGE_ROOT, relPath))) {
        throw new Error(`Runtime index source is missing: ${relPath}`);
      }
      Object.assign(entries, collectFromFile(relPath));
    }
    sections[group] = entries;
    totalTypes += Object.keys(entries).length;
    console.log(`[runtime/${group}] indexed ${Object.keys(entries).length} types from ${files.length} file(s)`);
  }

  mergeRuntimeIndex(sections);
  console.log(`Wrote dist/api/runtime.json (${totalTypes} types)`);
}

main();
