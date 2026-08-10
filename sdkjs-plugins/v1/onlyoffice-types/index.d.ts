import type { Cell } from "./src/generated/cell";
import type { Slide } from "./src/generated/slide";
import type { Word } from "./src/generated/word";
import type { Forms } from "./src/generated/forms";
import type { Pdf } from "./src/pdf";

import type { WordMethodName, WordMethodArgs, WordMethodReturn } from "./src/word-methods";
import type { CellMethodName, CellMethodArgs, CellMethodReturn } from "./src/cell-methods";
import type { SlideMethodName, SlideMethodArgs, SlideMethodReturn } from "./src/slide-methods";


import type { EditorType } from "./src/config/plugin-config";
import type { Asc } from "./src/plugin/plugin";
import type { AscDesktopEditor, AscSimpleRequest } from "./src/services";

export type { Word, Cell, Slide, Forms, Pdf };

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


export type * from "./src/services";
export type * from "./src/config";
export type * from "./src/theme";
export type * from "./src/plugin";
export type * from "./src/pdf-methods";

export type Api<T extends EditorType> =
    T extends "cell" ? Cell.Api :
    T extends "slide" ? Slide.Api :
    T extends "word" ? Word.Api :
    T extends "pdf" ? Pdf.Api :
    never;
