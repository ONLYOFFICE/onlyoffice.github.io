/**
 * ONLYOFFICE Form API Methods Type Definitions
 * Source: common/apiBase_plugins.js (untagged entries apply to every editor, including Forms),
 * sdkjs-forms/apiPlugins.js (`@typeofeditors ["CDE", "CFE"]`), and sdkjs/word/api_plugins.js's
 * IsFillingForm/IsFillingPdfForm/IsEditingPdfForm (`@typeofeditors ["CDE", "CFE"]`) - CFE is the Form
 * editor's `@typeofeditors` code, mirroring the pattern documented at
 * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/form-api/Methods/
 */

interface FormContentControl {
    Tag: string;
    Id: string;
    InternalId: string;
    Alias?: string;
    /** The visualization type of the content control: 1 - frame (bounding box), 2 - hidden. */
    Appearance?: 1 | 2;
    FormKey?: string;
    RadioGroup?: string;
    FormValue?: string | boolean | Date;
}

interface OLEProperties {
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
    ParaDrawingId?: string;
    Width?: number;
    Height?: number;
    WidthPix?: number;
    HeightPix?: number;
}

type FormsMethodArgs = {
    // Common plugin API methods (untagged in common/apiBase_plugins.js - apply to every editor)
    AddOleObject: [data: OLEProperties];
    CoAuthoringChatSendMessage: [message: any];
    ConvertDocument: [sConvertType: "markdown" | "html", bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean];
    EditOleObject: [data: OLEProperties];
    EndAction: [sType: string, description?: string | { scrollToTarget?: boolean }, sCustomMessage?: string];
    FocusEditor: [];
    GetDocumentLang: [];
    GetFileToDownload: [sFormat: string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?] | null;
    GetMacros: [];
    GetSelectedContent: [];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; ParaSeparator?: string; TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [] | null;
    InputText: [sText: string, sText2?: string];
    InstallPlugin: [oConfig?: any];
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];
    RemovePlugin: [sGuid: string, sBackup: string];
    ReplaceTextSmart: [aStrings: string[], sParaSeparator?: string, sTabSymbol?: string];
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: string, description: string | { lockScroll?: boolean, keepSelection?: boolean }];
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    UpdatePlugin: [oConfig?: any];

    // Form-specific methods (sdkjs-forms/apiPlugins.js and word/api_plugins.js, @typeofeditors CFE)
    /** Returns information about all the forms that have been added to the document. */
    GetAllForms: [];
    /** Returns information about all the forms that have been added to the document with the specified tag. */
    GetFormsByTag: [tag: string];
    /** Returns a value of the specified form. */
    GetFormValue: [internalId: string];
    /** Sets a value to the specified form. */
    SetFormValue: [internalId: string, value: string | boolean];
    /** Checks whether the specified form has been digitally signed. */
    IsFormSigned: [];
    /** Returns the current role name for the OForm document, or an empty string if no role is set. */
    GetOFormRole: [];
    /** Checks if the document is in the filling form mode. */
    IsFillingForm: [];
    /** Checks if the document is in the filling PDF form mode. */
    IsFillingPdfForm: [];
    /** Checks if the document is in the editing PDF form mode. */
    IsEditingPdfForm: [];

    // Common plugin methods
    CloseWindow: [windowId: string | number];
};

type FormsMethodName = keyof FormsMethodArgs;

type FormsMethodReturn<T extends FormsMethodName> =
    T extends "GetAllForms" | "GetFormsByTag" ? FormContentControl[] :
    T extends "GetFormValue" ? null | string | boolean :
    T extends "IsFormSigned" | "IsFillingForm" | "IsFillingPdfForm" | "IsEditingPdfForm" ? boolean :
    T extends "GetOFormRole" | "GetVersion" | "GetSelectedText" | "GetSelectedContent" | "GetVBAMacros" | "GetDocumentLang" | "ConvertDocument" | "GetFileToDownload" ? string :
    any;

export type { FormContentControl, FormsMethodArgs, FormsMethodName, FormsMethodReturn };
