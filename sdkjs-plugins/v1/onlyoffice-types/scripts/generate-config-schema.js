const fs = require('fs');
const path = require('path');
const { createGenerator } = require('ts-json-schema-generator');

const PACKAGE_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'schemas');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'config.schema.json');

// Generated straight from PluginConfig/VariationConfig/ButtonConfig/etc. in index.d.ts, so the
// schema can never drift from the TS types describing the same config.json shape - re-run
// `npm run generate-schema` after editing any of those interfaces.
const config = {
  path: path.join(PACKAGE_ROOT, 'index.d.ts'),
  tsconfig: path.join(PACKAGE_ROOT, 'tsconfig.json'),
  type: 'PluginConfig',
  // PluginConfig is re-exported (`export type { PluginConfig }` at the bottom of index.d.ts, not
  // declared inline as `export interface`) - ts-json-schema-generator's `expose: 'export'` mode
  // only follows direct declarations, not re-exports, so it can't find it that way. `'all'` still
  // only pulls in PluginConfig's actual transitive closure (ButtonConfig, EditorType, ...), not
  // every type in the file - the schema's `definitions` come out identical either way once the
  // root type is reachable.
  expose: 'all',
  topRef: false,
  skipTypeCheck: false,
  additionalProperties: false,
};

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const schema = createGenerator(config).createSchema(config.type);
  schema.$id = 'https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/sdkjs-plugins/v1/onlyoffice-types/schemas/config.schema.json';
  schema.title = 'ONLYOFFICE Plugin config.json';
  schema.description = 'Generated from PluginConfig (and the types it references) in index.d.ts - do not hand-edit, run `npm run generate-schema` instead.';

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`Generated ${path.relative(PACKAGE_ROOT, OUTPUT_FILE)}`);
}

main();
