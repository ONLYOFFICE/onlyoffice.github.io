// Validates schemas/config.schema.json against every real plugin config.json in this monorepo
// (not part of `npm test` - unlike everything else in this package, it needs the sibling
// `sdkjs-plugins/content/*/config.json` files, which only exist inside this checkout, not for
// someone consuming the published package standalone).
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const PACKAGE_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PACKAGE_ROOT, '..', '..', 'content');

// Confirmed real mistakes in these specific plugins' own config.json (not gaps in the schema) -
// tracked here instead of silently ignored, so a NEW, unexpected failure elsewhere still fails
// the check. Re-verify against the live file before removing an entry.
const KNOWN_ISSUES = {
  datepicker: 'root-level `type`/`icons` - these belong inside `variations[i]`, not at the root (every other plugin does it correctly).',
  pomodoro: '`buttons[].isviewer` - typo of `isViewer` (lowercase v).',
};

function main() {
  const schema = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'schemas', 'config.schema.json'), 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let pass = 0;
  const unexpectedFailures = [];

  for (const dir of dirs) {
    const configPath = path.join(CONTENT_DIR, dir, 'config.json');
    if (!fs.existsSync(configPath)) continue;

    let data;
    try {
      data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (err) {
      console.log(`${dir}: SKIP (invalid JSON: ${err.message})`);
      continue;
    }

    if (validate(data)) {
      pass += 1;
      continue;
    }

    if (dir in KNOWN_ISSUES) {
      console.log(`${dir}: known issue - ${KNOWN_ISSUES[dir]}`);
      continue;
    }

    unexpectedFailures.push(dir);
    console.log(`${dir}: FAIL`);
    for (const err of validate.errors) {
      console.log(`  ${err.instancePath || '(root)'} ${err.message}`);
    }
  }

  console.log(`\n${pass} passed, ${unexpectedFailures.length} unexpected failures, ${Object.keys(KNOWN_ISSUES).length} known issues.`);

  if (unexpectedFailures.length > 0) {
    console.error(`\nSchema rejected config.json files not in KNOWN_ISSUES: ${unexpectedFailures.join(', ')}`);
    process.exitCode = 1;
  }
}

main();
