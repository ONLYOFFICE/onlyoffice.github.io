import type { Forms } from "../generated/forms";

declare global {
    interface Window {
        Api: Forms.Api;
    }

    var Api: Forms.Api;
}

export type PdfApi = Forms.Api;
export type FormsApi = Forms.Api;
export type { Forms };

export {};
