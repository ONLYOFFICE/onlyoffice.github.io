// checkLangsExists.js
// usage: node checkLangsExists.js [langs.json] [folder]
// defaults: langs.json , current folder

const fs = require('fs');
const path = require('path');

const langsFile = process.argv[2] || 'langs.json';
const folder = process.argv[3] || '.';

function exitWith(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

if (!fs.existsSync(langsFile)) {
  exitWith(`langs file not found: ${langsFile}`);
}

let raw;
try {
  raw = fs.readFileSync(langsFile, 'utf8');
} catch (e) {
  exitWith(`Error reading ${langsFile}: ${e.message}`);
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  exitWith(`Error parsing ${langsFile} as JSON: ${e.message}`);
}

// Determine list of language codes
let codes = [];
if (Array.isArray(parsed)) {
  codes = parsed.slice();
} else if (typeof parsed === 'object' && parsed !== null) {
  // if object, take keys (could be { "en-US": {...}, ... } or { "en-US": "MDParser", ... })
  // If object values are strings and keys are language codes, or values are nested objects.
  // Choose keys.
  codes = Object.keys(parsed);
} else {
  exitWith(`Unexpected JSON structure in ${langsFile}. Expected array or object.`);
}

// normalize codes (trim)
codes = codes.map(c => String(c).trim()).filter(Boolean);

// Check existence
const missing = [];
const found = [];
const notReadable = [];

codes.forEach(code => {
  const fileName = `${code}.json`;
  const filePath = path.join(folder, fileName);
  if (fs.existsSync(filePath)) {
    // try to read to ensure it's accessible and valid JSON (optional)
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      found.push(fileName);
    } catch (e) {
      notReadable.push({ file: fileName, error: e.message });
    }
  } else {
    missing.push(fileName);
  }
});

// Optionally detect extra translation files in folder (matching *.json)
let extras = [];
try {
  const allFiles = fs.readdirSync(folder);
  // consider .json files that look like language files (simple heuristic)
  extras = allFiles
    .filter(f => f.toLowerCase().endsWith('.json'))
    .filter(f => !codes.includes(f.replace(/\.json$/i, '')))
    .sort();
} catch (e) {
  console.warn(`Could not read folder ${folder}: ${e.message}`);
}

console.log('=== langs.json check ===');
console.log(`langs file: ${path.resolve(langsFile)}`);
console.log(`folder: ${path.resolve(folder)}`);
console.log(`expected codes: ${codes.length}`);
console.log(`found files: ${found.length}`);
console.log(`missing files: ${missing.length}`);
if (notReadable.length) {
  console.log(`not readable: ${notReadable.length}`);
}

if (missing.length) {
  console.log('\nMissing files:');
  missing.forEach(m => console.log('  -', m));
}

if (notReadable.length) {
  console.log('\nFiles present but not readable:');
  notReadable.forEach(n => console.log('  -', n.file, '-', n.error));
}

if (extras.length) {
  console.log('\nOther .json files in folder (not in langs.json):');
  extras.forEach(e => console.log('  -', e));
}

console.log('\nSummary:');
console.log(`  total expected: ${codes.length}`);
console.log(`  existing: ${found.length}`);
console.log(`  missing: ${missing.length}`);
console.log(`  unreadable: ${notReadable.length}`);
console.log(`  extras: ${extras.length}`);

process.exit(missing.length > 0 ? 2 : 0);
