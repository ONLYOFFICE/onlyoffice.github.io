import type { Word } from "./src/generated/word";
import type { Cell } from "./src/generated/cell";
import type { Slide } from "./src/generated/slide";
import type { Pdf } from "./src/generated/pdf";

import type { EditorType } from "./src/config";
import type { Asc } from "./src/plugin";
import type { AscDesktopEditor, AscSimpleRequest } from "./src/services";

declare global {
    interface Window {
        Asc: Asc;
        AscDesktopEditor?: AscDesktopEditor;
        AscSimpleRequest?: AscSimpleRequest;
    }
    var Asc: Asc;
    var AscDesktopEditor: AscDesktopEditor | undefined;
    var AscSimpleRequest: AscSimpleRequest | undefined;
}

export type Api<T extends EditorType> =
    T extends "word" ? Word.Api :
    T extends "cell" ? Cell.Api :
    T extends "slide" ? Slide.Api :
    T extends "pdf" ? Pdf.Api :
    never;

export type * from "./src/generated/forms";
export type * from "./src/generated/word";
export type * from "./src/generated/cell";
export type * from "./src/generated/slide";
export type * from "./src/generated/pdf";

export type * from "./src/word-methods";
export type * from "./src/cell-methods";
export type * from "./src/slide-methods";
export type * from "./src/pdf-methods";

export type * from "./src/services";
export type * from "./src/config";
export type * from "./src/theme";
export type * from "./src/plugin";
