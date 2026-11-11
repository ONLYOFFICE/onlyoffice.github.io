/*
 * Writes vendor/citeproc/citeproc_commonjs.min.js, the copy of citeproc-js
 * that index.html loads, from vendor/citeproc/citeproc_commonjs.js.
 *
 * Only whitespace goes and local names get shorter: the code is not
 * rewritten, so its syntax level stays, and CSL stays a global. The license
 * header is not a comment minifiers keep, so it is put back in front.
 *
 * Run after updating citeproc: npm run build:vendor
 */

import { minifySync } from "rolldown/experimental";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../vendor/citeproc/", import.meta.url));
const source = dir + "citeproc_commonjs.js";
const target = dir + "citeproc_commonjs.min.js";

const code = readFileSync(source, "utf8");
const header = code.match(/^\/\*[\s\S]*?\*\//);
if (!header) {
    throw new Error("No license header at the start of " + source);
}

const result = minifySync("citeproc_commonjs.js", code, {
    module: false,
    compress: false,
    mangle: { toplevel: false },
    codegen: { removeWhitespace: true },
});
if (result.errors && result.errors.length) {
    console.error(result.errors);
    process.exit(1);
}

writeFileSync(target, header[0] + "\n" + result.code);
console.log("Written " + target);
