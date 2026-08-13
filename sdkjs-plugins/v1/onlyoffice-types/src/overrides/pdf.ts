// Manual override for a Pdf-referenced typedef that generate-types.js can't resolve from this
// package's own sources. See src/overrides/word.ts for the general rationale.

/**
 * A paragraph numbering bullet type, referenced by a `word/apiBuilder.js` method also tagged for
 * Pdf - genuinely declared in `slide/apiBuilder.js`, not one of Pdf's own sources
 * (`word/apiBuilder.js`, `pdf/apiBuilder.js`, `pdf/plugin-events.js`). Adding all of
 * `slide/apiBuilder.js` as a Pdf source to resolve this one typedef would pull Slide's entire class
 * set into the Pdf namespace, so it's a one-line override instead.
 */
export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";
