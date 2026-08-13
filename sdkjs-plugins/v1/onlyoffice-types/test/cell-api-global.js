// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Proves the `/cell` entry point really types the global `Api` in this program - see
 * `word-api-global.js` for why this assertion exists.
 */

/** @type {import("../src/generated/cell").Cell.ApiWorksheet} */
const sheet = Api.GetActiveSheet();

// @ts-expect-error GetDocument is Word.Api's entry point, not Cell.Api's
Api.GetDocument();

void sheet;
