// AUTO-GENERATED - do not edit by hand. Run `npm run generate-ambient` to regenerate.
// Declares the global `Api` of the "pdf" editor (src/editors/pdf.d.ts). Load this AFTER
// onlyoffice-plugins-types.ambient.d.ts, which declares the namespace it refers to; load exactly one
// editor addon, since the four declare the same `Api` global with a different type.

interface Window {
    Api: Pdf.Api;
}

declare var Api: Pdf.Api;
