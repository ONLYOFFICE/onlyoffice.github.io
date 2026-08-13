// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Proves the `/word` entry point really types the global `Api` inside this program.
 *
 * Without this, a regression that dropped the entry point (or reintroduced an `any` stub for `Api`)
 * would silently reduce every `Api.*` call in `word-methods-original-examples.js` to `any`, and
 * those examples would keep "passing" while checking nothing. The `@ts-expect-error` below is the
 * load-bearing half: it only compiles while `Api` is genuinely `Word.Api`.
 */

/** @type {import("../src/generated/word").Word.ApiDocument} */
const document_ = Api.GetDocument();

/** @type {import("../src/generated/word").Word.ApiParagraph} */
const paragraph = Api.CreateParagraph();

// @ts-expect-error GetActiveSheet is Cell.Api's entry point, not Word.Api's
Api.GetActiveSheet();

void document_;
void paragraph;
