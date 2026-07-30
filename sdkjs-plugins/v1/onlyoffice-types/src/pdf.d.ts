import type { Forms } from "./generated/forms";

/**
 * PDF editor Office API object model.
 *
 * The PDF plugin methods themselves are exposed through executeMethod and are
 * declared in pdf-methods.d.ts. The callCommand object model currently shares
 * the forms/document-builder model supplied by sdkjs-forms.
 */
export namespace Pdf {
    export interface Api extends Forms.Api {}
}

export type {
    PdfMethodArgs,
    PdfMethodName,
    PdfMethodReturn,
    PdfPageImageOptions,
    PdfReplacePageContentOptions,
    PdfReplaceXmlOptions,
    PdfReplaceHtmlOptions,
} from "./pdf-methods";
