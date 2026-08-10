import type { WordApi } from "./src/editors/word";
import type { CellApi } from "./src/editors/cell";
import type { SlideApi } from "./src/editors/slide";
import type { PdfApi } from "./src/editors/pdf";

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
    T extends "word" ? WordApi :
    T extends "cell" ? CellApi :
    T extends "slide" ? SlideApi :
    T extends "pdf" ? PdfApi :
    never;

export type * from "./src/generated/forms";

export type * from "./src/editors/word";
export type * from "./src/editors/cell";
export type * from "./src/editors/slide";
export type * from "./src/editors/pdf";

export type * from "./src/word-methods";
export type * from "./src/cell-methods";
export type * from "./src/slide-methods";
export type * from "./src/pdf-methods";

export type * from "./src/services";
export type * from "./src/config";
export type * from "./src/theme";
export type * from "./src/plugin";
