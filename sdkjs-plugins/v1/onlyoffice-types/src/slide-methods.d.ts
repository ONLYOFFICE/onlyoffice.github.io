/**
 * ONLYOFFICE Presentation API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/
 */

interface SlideCommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: SlideCommentReply[];
}

interface SlideCommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface SlideOLEProperties {
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

interface SlideInstallPluginConfig {
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

interface SlideImageData {
    Data: string;
    Width?: number;
    Height?: number;
    FromUrl?: boolean;
}

/** "none" - nothing selected, "text" - text selected, "shape"/"image"/"chart"/"table" - drawing selected */
type SlideSelectionType = "none" | "text" | "shape" | "image" | "chart" | "table" | string;

type SlideMethodArgs = {
    // Methods A
    AddComment: [oCommentData: SlideCommentData];
    AddOleObject: [data: SlideOLEProperties];
    ApplyTheme: [themeIndexOrName: number | string];

    // Methods C
    ChangeComment: [sCommentId: string, oCommentData: SlideCommentData];
    CoAuthoringChatSendMessage: [message: any];

    // Methods E
    EditOleObject: [data: SlideOLEProperties];
    EndAction: [sType: string, description?: string | { scrollToTarget?: boolean }, sCustomMessage?: string];
    EndSlideShow: [];

    // Methods F
    FocusEditor: [];

    // Methods G
    GetAllComments: [null?];
    GetDocumentLang: [];
    GetEditorThemes: [null?];
    GetFileToDownload: [sFormat: "pptx" | "pdf" | "odp" | "png" | "jpg" | string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    GetMacros: [];
    GetSelectedContent: [];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { ParaSeparator?: string; TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [];
    GoToNextSlideInSlideShow: [];
    GoToPreviousSlideInSlideShow: [];
    GoToSlide: [slideNumber: number];
    GoToSlideInSlideShow: [nSlideIndex: number];

    // Methods I
    InputText: [sText: string, sText2?: string];
    InstallPlugin: [oConfig?: SlideInstallPluginConfig];

    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];

    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];

    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PauseSlideShow: [];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];

    // Methods R
    RemoveComments: [aIds: string[]];
    RemoveOleObject: [sInternalId: string];
    RemovePlugin: [sGuid: string, sBackup: string];
    ReplaceTextSmart: [aStrings: string[], sParaSeparator?: string, sTabSymbol?: string];
    ResumeSlideShow: [];

    // Methods S
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: string, description?: string | { lockScroll?: boolean; keepSelection?: boolean }];
    StartSlideShow: [];

    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    UpdatePlugin: [oConfig?: SlideInstallPluginConfig];
};

type SlideMethodName = keyof SlideMethodArgs;

type SlideMethodReturn<T extends SlideMethodName> =
    T extends "AddComment" ? string | null :
    T extends "ApplyTheme" | "ReplaceTextSmart" ? boolean :
    T extends "ChangeComment" ? boolean :
    T extends "GetSelectedText" | "GetFileToDownload" | "GetVersion" | "GetSelectedContent" | "GetDocumentLang" ? string :
    T extends "GetVBAMacros" ? string | null :
    T extends "GetSelectionType" ? SlideSelectionType :
    /** Raw JSON string - the caller must JSON.parse() it into { current: number, macrosArray: {...}[] } */
    T extends "GetMacros" ? string :
    T extends "GetImageDataFromSelection" ? SlideImageData :
    T extends "GetSelectedOleObjects" ? SlideOLEProperties[] :
    T extends "GetAllComments" ? SlideCommentData[] :
    T extends "GetEditorThemes" ? object[] :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    any;

export {
    SlideMethodArgs,
    SlideMethodName,
    SlideMethodReturn,
}

export {
    SlideCommentData,
    SlideOLEProperties,
}
