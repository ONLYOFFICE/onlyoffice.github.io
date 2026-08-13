// dist/api-index.json is the machine-readable companion to the types: the same signatures,
// descriptions, runnable examples and docs links that the .d.ts JSDoc carries, but as plain JSON so
// tools that don't parse TypeScript (search indexes, RAG pipelines, AI agents) can consume the API
// surface directly. It's also resolvable from an installed copy of the package
// (`@onlyoffice/plugins-types/api-index.json`) and fetchable as a raw git-tracked file.
//
// Two generators each own one section per editor and run back-to-back under `npm run generate`
// (generate-types.js, then generate-plugin-methods.js via `postgenerate`):
//
//   generate-types.js           -> editors.<editor>.{classes, typedefs, events}
//   generate-plugin-methods.js  -> editors.<editor>.executeMethods
//
// Each generator REPLACES its whole section rather than merging member by member, so a renamed or
// removed sdkjs member disappears from the index on the next run instead of going stale.

const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '..', 'dist', 'api-index.json');

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, sortKeysDeep(value[key])])
    );
  }
  return value;
}

function readIndex() {
  if (!fs.existsSync(INDEX_PATH)) return { editors: {} };
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  } catch (err) {
    throw new Error(`Could not parse existing ${INDEX_PATH} (delete it and regenerate): ${err.message}`);
  }
}

function mergeApiIndex(editor, sections) {
  const index = readIndex();
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  index.package = pkg.name;
  index.version = pkg.version;
  index.editors = index.editors || {};
  index.editors[editor] = { ...index.editors[editor], ...sections };

  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(sortKeysDeep(index), null, 2)}\n`);
}

module.exports = { mergeApiIndex };
