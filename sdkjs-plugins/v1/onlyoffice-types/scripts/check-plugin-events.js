// Drift checker for the plugin-window event surface: sdkjs documents `attachEvent`/`event_on*` names
// via `@alias` doclets in common/base-plugin-events.js. This script diffs that source against our
// hand-maintained `src/plugin/events.d.ts` so an event ONLYOFFICE adds later doesn't silently go
// untyped - it fails CI instead.
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
  return { sdkjs: resolvedSdkjs };
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
