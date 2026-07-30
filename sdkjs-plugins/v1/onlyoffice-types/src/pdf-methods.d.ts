/**
 * ONLYOFFICE PDF Plugin API method definitions.
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/pdf-api/Methods/
 */

interface PdfPageImageOptions {
    maxSize?: number;
    annotations?: boolean;
    fields?: boolean;
    drawings?: boolean;
}

interface PdfReplaceXmlOptions {
    content: string[];
}

interface PdfReplaceHtmlOptions {
    content: string;
    separateParagraphs: boolean;
}

interface PdfReplacePageContentOptions {
    type: "xml" | "html";
    options: PdfReplaceXmlOptions | PdfReplaceHtmlOptions;
}

type PdfMethodArgs = {
    CoAuthoringChatSendMessage: [message: unknown];
    EndAction: [type: string, description?: string | {scrollToTarget?: boolean}, customMessage?: string];
    FocusEditor: [];
    GetAllComments: [null?];
    GetCurrentPage: [];
    GetFileToDownload: [format?: string];
    GetFontList: [null?];
    GetInstalledPlugins: [null?];
    GetMacros: [content?: string];
    GetPageImage: [page: number, options?: PdfPageImageOptions];
    GetSelectedText: [options?: {
        Numbering?: boolean;
        Math?: boolean;
        TableCellSeparator?: string;
        TableRowSeparator?: string;
        ParaSeparator?: string;
        TabSymbol?: string;
        NewLineSeparator?: string;
    }];
    GetVersion: [];
    GoToPage: [page: number, rect?: number[]];
    InstallPlugin: [config?: Record<string, unknown>];
    MouseMoveWindow: [guid: string, x: number, y: number];
    MouseUpWindow: [guid: string, x: number, y: number];
    OnDropEvent: [data: Record<string, unknown>];
    PasteHtml: [html: string];
    PasteText: [text: string];
    RemovePlugin: [guid: string, backup: string];
    ReplacePageContent: [page: number, options: PdfReplacePageContentOptions];
    SetMacros: [data: string];
    SetPluginsOptions: [data: unknown];
    SetProperties: [properties: unknown];
    ShowButton: [button: string, visible: boolean, align?: string];
    ShowError: [error: string, level: number];
    ShowInputHelper: [guid: string, width: number, height: number, isKeyboardTake: boolean];
    StartAction: [type: string, description?: string | {lockScroll?: boolean; keepSelection?: boolean}];
    UnShowInputHelper: [guid: string, isKeyboardTake?: boolean];
    UpdatePlugin: [config?: Record<string, unknown>];
};

type PdfMethodName = keyof PdfMethodArgs;

type PdfMethodReturn<T extends PdfMethodName> =
    T extends "GetCurrentPage" ? number :
    T extends "GetFileToDownload" | "GetSelectedText" | "GetVersion" ? string :
    T extends "GetPageImage" ? HTMLCanvasElement :
    T extends "GoToPage" | "ReplacePageContent" ? boolean :
    T extends "GetAllComments" | "GetFontList" | "GetInstalledPlugins" ? unknown[] :
    T extends "GetMacros" ? string :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    unknown;

export {
    PdfMethodArgs,
    PdfMethodName,
    PdfMethodReturn,
    PdfPageImageOptions,
    PdfReplacePageContentOptions,
    PdfReplaceXmlOptions,
    PdfReplaceHtmlOptions,
};
