/**
 * ONLYOFFICE Spreadsheet API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/spreadsheet-api/Methods/
 */

interface CellCommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: CellCommentReply[];
}

interface CellCommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface CellOLEProperties {
    data?: string;
    imgSrc?: string;
    guid?: string;
    width?: number;
    height?: number;
    widthPix?: number;
    heightPix?: number;
    Data?: string;
    ImageData?: string;
    ApplicationId?: string;
    InternalId?: string;
    Width?: number;
    Height?: number;
    WidthPix?: number;
    HeightPix?: number;
}

interface CellInstallPluginConfig {
    guid: string;
    name: string;
    nameLocale?: Record<string, string>;
    description?: string;
    descriptionLocale?: Record<string, string>;
    version?: string;
    url?: string;
    icons?: string;
    isVisual?: boolean;
    isModal?: boolean;
    isInsideMode?: boolean;
    Variations?: any[];
}

interface CellImageData {
    Data: string;
    Width?: number;
    Height?: number;
    FromUrl?: boolean;
}

/** "none" - nothing selected, "text" - cell(s) selected, "drawing" - drawing selected */
type CellSelectionType = "none" | "text" | "drawing";

type CellMethodArgs = {
    // Methods A
    AddComment: [oCommentData: CellCommentData];
    AddOleObject: [data: CellOLEProperties];

    // Methods C
    ChangeComment: [sCommentId: string, oCommentData: CellCommentData];
    CoAuthoringChatSendMessage: [message: any];

    // Methods E
    EditOleObject: [data: CellOLEProperties];
    EndAction: [sType: string, description?: string | {scrollToTarget?: boolean}, sCustomMessage?: string];

    // Methods F
    FocusEditor: [];

    // Methods G
    GetAllComments: [null?];
    GetCustomFunctions: [];
    GetFileToDownload: [sFormat: "xlsx" | "pdf" | "csv" | "ods" | "xls" | "txt" | "html" | string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    GetMacros: [];
    GetSelectedContent: [];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [];

    // Methods I
    InputText: [sText: string, sText2?: string];
    InstallPlugin: [oConfig: CellInstallPluginConfig];

    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];

    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];
    OpenFile: [aBytes: any, aParams: any[]];

    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];

    // Methods R
    RemoveComments: [aIds: string[]];
    RemoveOleObject: [sInternalId: string];
    RemovePlugin: [sGuid: string, bBackup?: boolean];
    ReplaceTextSmart: [aStrings: string[], sTabSymbol?: string, sNewLineSeparator?: string];
    ResizeWindow: [sWindowId: string, aSize: number[]];

    // Methods S
    SetCustomFunctions: [sCode: string];
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: "Information" | "Block" | "GroupActions", description?: string | { lockScroll?: boolean; keepSelection?: boolean }];

    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    UpdatePlugin: [oConfig: CellInstallPluginConfig];
};

type CellMethodName = keyof CellMethodArgs;

type CellMethodReturn<T extends CellMethodName> =
    T extends "AddComment" ? string | null :
    T extends "ChangeComment" ? boolean :
    T extends "GetSelectedText" | "GetCustomFunctions" | "GetFileToDownload" | "GetVersion" | "GetSelectedContent" ? string :
    T extends "GetVBAMacros" ? string | null :
    T extends "GetSelectionType" ? CellSelectionType :
    T extends "GetMacros" ? { current: number; macrosArray: string[] } :
    T extends "GetImageDataFromSelection" ? CellImageData :
    T extends "GetSelectedOleObjects" ? CellOLEProperties[] :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    T extends "ReplaceTextSmart" ? boolean :
    any;

    export {
        CellMethodArgs,
        CellMethodName,
        CellMethodReturn,
    }

    export {
        CellCommentData,
        CellOLEProperties,
    }
