// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Proves the `/pdf` entry point really types the global `Api` in this program - see
 * `word-api-global.js` for why this assertion exists.
 *
 * Pdf and Word both expose `GetDocument`, so the negative assertion alone would not tell them
 * apart; annotating the result as `Pdf.ApiDocument` is what pins this program to the Pdf entry
 * point specifically.
 */

/** @type {import("../src/generated/pdf").Pdf.ApiDocument} */
const document_ = Api.GetDocument();

// @ts-expect-error GetActiveSheet is Cell.Api's entry point, not Pdf.Api's
Api.GetActiveSheet();

void document_;
