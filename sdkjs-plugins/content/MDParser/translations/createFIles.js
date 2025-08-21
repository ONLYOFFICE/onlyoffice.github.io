// splitLangs.js
const fs = require('fs');
const path = require('path');

const inputFile = 'translations.txt';
const outputDir = 'langs';

// ensure input exists
if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`);
  process.exit(1);
}

// create output dir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let content = fs.readFileSync(inputFile, 'utf8');
// normalize line endings
content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// split by a line that contains only 5 or more asterisks (allow spaces around)
const blocks = content.split(/\n\s*\*{5,}\s*\n/);

const headerRe = /^#\s*([A-Za-z0-9._\-]+\.json)\s*$/m; // flexible filename capture
let created = 0;
let failed = 0;

blocks.forEach((block, idx) => {
  const trimmed = block.trim();
  if (!trimmed) return;

  // find header line like: "# sr-Cyrl-RS.json"
  const headerMatch = trimmed.match(headerRe);
  if (!headerMatch) {
    console.warn(`[${idx}] No header found. Skipping block. First 80 chars:`, trimmed.slice(0, 80));
    failed++;
    return;
  }

  let fileName = headerMatch[1].trim();
  // sanitize filename (remove accidental spaces)
  fileName = fileName.replace(/\s+/g, '');

  // extract json after header line
  // remove the header line from block
  const jsonStartIndex = trimmed.indexOf('\n');
  const jsonContent = (jsonStartIndex === -1) ? '' : trimmed.slice(jsonStartIndex + 1).trim();

  if (!jsonContent) {
    console.warn(`[${fileName}] Empty JSON content. Skipping.`);
    failed++;
    return;
  }

  // try parse JSON
  try {
    JSON.parse(jsonContent);
  } catch (e) {
    console.error(`[${fileName}] JSON parse error: ${e.message}`);
    console.error('First 300 chars of JSON content for debug:\n', jsonContent.slice(0, 300));
    failed++;
    return;
  }

  // write file
  const outPath = path.join(outputDir, fileName);
  try {
    fs.writeFileSync(outPath, jsonContent, 'utf8');
    console.log(`Created: ${outPath}`);
    created++;
  } catch (e) {
    console.error(`Failed to write ${outPath}:`, e.message);
    failed++;
  }
});

console.log(`\nDone. Created: ${created}. Failed/skipped: ${failed}.`);
