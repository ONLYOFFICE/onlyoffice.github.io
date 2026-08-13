// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Proves the `/slide` entry point really types the global `Api` in this program - see
 * `word-api-global.js` for why this assertion exists.
 */

/** @type {import("../src/generated/slide").Slide.ApiPresentation} */
const presentation = Api.GetPresentation();

// @ts-expect-error GetActiveSheet is Cell.Api's entry point, not Slide.Api's
Api.GetActiveSheet();

void presentation;
