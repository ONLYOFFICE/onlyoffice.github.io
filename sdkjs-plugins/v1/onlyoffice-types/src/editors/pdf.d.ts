import type { Pdf } from "../generated/pdf";

declare global {
    interface Window {
        Api: Pdf.Api;
    }

    var Api: Pdf.Api;
}

export type PdfApi = Pdf.Api;
export type { Pdf };

export {};
