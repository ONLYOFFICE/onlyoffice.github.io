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
    /** Used by EditOleObject's example to reference the existing OLE object being edited. */
    objectId?: string;
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

/**
 * Shape returned by GetImageDataFromSelection - verified against
 * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/GetImageDataFromSelection/
 * whose example reads `result.src`/`result.width`/`result.height` (lowercase),
 * matching PutImageDataToSelection's input shape - not the capitalized
 * Data/Width/Height/FromUrl this interface previously declared.
 */
interface SlideImageData {
    src: string;
    width?: number;
    height?: number;
    fromUrl?: boolean;
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
    /** format is Optional per docs (default " "), not Required as previously declared - see GetFileToDownload doc page. */
    GetFileToDownload: [sFormat?: "pptx" | "pdf" | "odp" | "png" | "jpg" | string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    /**
     * The Parameters table says "no parameters", but the doc page's own example calls
     * `executeMethod("GetMacros", [JSON.stringify(Content)], ...)` - widened to accept
     * that optional arg so the real example type-checks. See:
     * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/GetMacros/
     */
    GetMacros: [oContent?: string];
    /**
     * Parameters table on the doc page requires a `prop` object (`{ type?: "text" | "html" }`);
     * previously declared with no params at all. No live example exists for this method.
     */
    GetSelectedContent: [prop: { type?: "text" | "html" }];
    GetSelectedOleObjects: [];
    /**
     * Widened to match all fields shown in the doc page's Parameters table and used by its
     * example object literal (Numbering, Math, TableCellSeparator, etc.) - the previous shape
     * only had ParaSeparator/TabSymbol, which caused excess-property errors on the real example.
     */
    GetSelectedText: [oPr?: {
        Numbering?: boolean;
        Math?: boolean;
        TableCellSeparator?: string;
        TableRowSeparator?: string;
        ParaSeparator?: string;
        TabSymbol?: string;
        NewLineSeparator?: string;
    }];
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
    /** Param order/names per doc page: arrString, then tab separator, then paragraph/newline separator. */
    ReplaceTextSmart: [aStrings: string[], sParaTab?: string, sParaNewLine?: string];
    ResumeSlideShow: [];

    // Methods S
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    /**
     * Previous shape (sType, sDescription, sMethod?) didn't match the docs at all - the real
     * signature is (error message string, numeric level: -1 or 0). See:
     * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/ShowError/
     */
    ShowError: [sError: string, nLevel: number];
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
