/**
 * ONLYOFFICE Text Document API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/
 */

interface CommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: CommentReply[];
}

interface CommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface Color {
    A: number;
    B: number;
    G: number;
    R: number;
}

type ContentControlLock = 0 | 1 | 2 | 3;

interface ContentControlProperties {
    Id?: number;
    Tag: string;
    Lock?: number;
    Remove?: number;
    Alias?: string;
    Appearance?: number;
    Border?: {Color: Color};
    Color?: Color;
    InternalId?: string;
    Lock?: ContentControlLock;
    PlaceHolderText: string;
    Shd?: {Color: Color};
}

interface ContentControlListItem {
    Text: string;
    Value: string;
}

export interface ContentControlCheckBoxProperties {
    Checked?: boolean;
    CheckedSymbol?: number;
    UncheckedSymbol?: number;
    Id?: number;
    Tag?: string;
    Lock?: number;
}

export interface ContentControlDatePickerProperties {
    DateFormat?: string;
    Date?: string | Date;
    Id?: number;
    Tag?: string;
    Lock?: number;
}

interface AddinFieldData {
    FieldId: string;
    Value: string;
    Content: string;
}

interface ContentControlListElement {
    Display: string;
    Value: string;
}

interface TextAnnotationRange {
    start: number;
    length: number;
    id: string;
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

interface InstallPluginConfig {
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

interface OleObjectData {
    Data: string;
    InternalId: string;
    Width?: number;
    Height?: number;
    ImageUrl?: string;
    AppId?: string;
}

interface SearchAndReplaceOptions {
    ReplaceStr?: string;
    IsMatchCase?: boolean;
    IsWholeWord?: boolean;
}

interface SetEditingRestrictionsOptions {
    Type: "readOnly" | "comments" | "formFields" | "trackedChanges" | "contentTypes" | "nothing";
}

interface SetPropertiesOptions {
    Title?: string;
    Author?: string;
    Creator?: string;
    Description?: string;
    Keywords?: string;
    Subject?: string;
    Category?: string;
    Version?: string;
}

interface InputTextOptions {
    Text: string;
}

interface GetFileToDownloadOptions {
    Url?: string;
    Format?: "docx" | "pdf" | "odt" | "rtf" | "txt" | "html" | "doc" | "xlsx" | "pptx";
    Name?: string;
}

interface ConvertDocumentOptions {
    To: "html" | "markdown";
    async?: boolean;
}

interface GetFormValueOptions {
    Tag: string;
    CheckBoxValue?: boolean;
    DatePickerValue?: string;
    DropDownValue?: string;
    TextValue?: string;
}

interface SetFormValueOptions {
    Tag: string;
    CheckBoxValue?: boolean;
    DatePickerValue?: string;
    DropDownValue?: string;
    TextValue?: string;
}

interface InsertAndReplaceContentControlsOptions {
    Items: ContentControlProperties[];
}

interface GetFormsByTagOptions {
    Tag: string;
}

interface ChangeOleObjectOptions {
    Data: string;
    InternalId: string;
}

interface ChangeCommentOptions {
    Id: string;
    CommentData: CommentData;
}

interface MoveToCommentOptions {
    Id: string;
}

interface RemoveCommentsOptions {
    Id?: string;
}

interface ReplaceTextSmartOptions {
    Text: string[];
}

interface MouseMoveWindowOptions {
    X: number;
    Y: number;
    Event: MouseEvent;
}

interface MouseUpWindowOptions {
    X: number;
    Y: number;
    Event: MouseEvent;
}

interface OnDropEventOptions {
    X: number;
    Y: number;
    Effect: number;
    DropAction: number;
    Html: string;
    Text: string;
    Files: any[];
}

interface ShowInputHelperOptions {
    Name: string;
    Items: InputHelperItem[];
    AtX?: number;
    AtY?: number;
}

interface InputHelperItem {
    Name: string;
    Text: string;
    Value?: string;
    id?: string;
}

interface SetPluginsOptions {
    plugins?: Record<string, any>;
    pluginName?: string;
}

interface SetMacrosOptions {
    Libs?: string[];
    Name?: string;
    Macros?: string;
}

interface InstallPluginOptions {
    guid: string;
    Variations?: any[];
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
}

interface RemovePluginOptions {
    guid: string;
}

interface StartActionOptions {
    Type: "StartFilling" | "StopFilling";
}

interface ShowButtonOptions {
    Name: string;
    Visible: boolean;
}

interface ShowErrorOptions {
    Type: "info" | "warning" | "error";
    Description: string;
    Method?: string;
}

interface OpenFileOptions {
    Url: string;
}

interface OnEncryptionOptions {
    Type: "encrypt" | "decrypt" | "protect" | "unprotect";
    Password?: string;
}

interface PutImageDataToSelectionOptions {
    ImageData: ImageData;
    Width?: number;
    Height?: number;
}

interface ImageData {
    Data: string;
    Width?: number;
    Height?: number;
    FromUrl?: boolean;
}

interface AnnotateParagraphOptions {
    Text: string;
    Username?: string;
    UserId?: string;
}

interface SetDisplayModeInReviewOptions {
    Mode: "final" | "original" | "markup";
}

interface RemoveAnnotationRangeOptions {
    Id: string;
    Start: number;
    End: number;
}

interface SelectAnnotationRangeOptions {
    Id: string;
    Start: number;
    End: number;
}

interface UpdateAddinFieldsOptions {
    Data: Record<string, any>;
}

export type WordMethodArgs = {
    // Methods A
    AcceptReviewChanges: [boolean?];
    AddAddinField: [AddinFieldData];
    AddComment: [CommentData];
    AddContentControl: [type: 1 | 2 | 3 | 4, commonPr?: ContentControlProperties];
    AddContentControlCheckBox: [checkBoxPr?: ContentControlCheckBoxProperties, commonPr?: ContentControlProperties];
    AddContentControlDatePicker: [datePickerPr?: ContentControlDatePickerProperties, commonPr?: ContentControlProperties];
    AddContentControlList: [type: 0 | 1, List?: ContentControlListElement[], commonPr?: ContentControlProperties];
    AddContentControlPicture: [commonPr?: ContentControlProperties];
    AddOleObject: [data: OLEProperties];
    AnnotateParagraph: [data: {
        type: string;
        name?: string;
        paragraphId: string;
        recalcId: string;
        ranges?: TextAnnotationRange[];
    }];
    
    // Methods C
    CanRedo: [];
    CanUndo: [];
    ChangeComment: [id: string, commentData: CommentData];
    ChangeOleObject: [data: OLEProperties];
    ChangeOleObjects: [data: OLEProperties[]];
    CoAuthoringChatSendMessage: [message: any];
    ConvertDocument: [sConvertType: "markdown" | "html", bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean];
    
    // Methods E
    EditOleObject: [data: OLEProperties];
    EndAction: [sType: string, description: string | {scrollToTarget?: boolean}, sCustomMessage?: string];
    
    // Methods F
    FocusEditor: [];
    
    // Methods G
    GetAllAddinFields: [];
    GetAllComments: [null?];
    GetAllContentControls: [];
    GetAllForms: [];
    GetAllOleObjects: [sPluginId: string];
    GetCurrentAddinField: [];
    GetCurrentBookmark: [];
    GetCurrentContentControl: [];
    GetCurrentContentControlPr: [];
    GetCurrentSentence: [sScope?: string];
    GetCurrentWord: [sScope?: string];
    GetDocumentLang: [];
    GetFields: [null?];
    GetFileHTML: [null?];
    GetFileToDownload: [sFormat: string];
    GetFontList: [null?];
    GetFormValue: [sInternalId: string];
    GetFormsByTag: [sTag: string];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    GetMacros: [];
    GetSelectedContent: [];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; ParaSeparator?: string; TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [];
    
    // Methods I
    InputText: [sText: string, sText2?: string];
    InsertAndReplaceContentControls: [aDocuments: any[]];
    InsertOleObject: [oOleObj: OLEProperties, bIsAdd?: boolean];
    InstallPlugin: [oConfig: any];
    
    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];
    MoveCursorOutsideField: [fieldId: string, isBegin?: boolean];
    MoveCursorToContentControl: [sInternalId: string, bMoveToContentControl?: boolean];
    MoveCursorToEnd: [bMoveToEnd?: boolean];
    MoveCursorToField: [fieldId: string, isBegin?: boolean];
    MoveCursorToStart: [bMoveToStart?: boolean];
    MoveToComment: [sId: string];
    MoveToNextReviewChange: [bAccept?: boolean];
    
    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];
    OpenFile: [aBytes: any, aParams: any[]];
    
    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];
    
    // Methods R
    Redo: [];
    RejectReviewChanges: [bIsAll?: boolean];
    RemoveAnnotationRange: [oData: { paragraphId: string; rangeId: string; name: string }];
    RemoveComments: [aIds: string[]];
    RemoveContentControl: [sInternalId: string];
    RemoveContentControls: [aIds: any[]];
    RemoveFieldWrapper: [sFieldId: string];
    RemoveOleObject: [sInternalId: string];
    RemoveOleObjects: [aIds: any[]];
    RemovePlugin: [sGuid: string, bBackup?: boolean];
    RemoveSelectedContent: [];
    ReplaceCurrentSentence: [sText: string, sScope?: string];
    ReplaceCurrentWord: [sText: string, sScope?: string];
    ReplaceTextSmart: [aStrings: string[], sParaSeparator?: string, sTabSymbol?: string];
    
    // Methods S
    SearchAndReplace: [oProps: { searchString: string; replaceString: string; matchCase?: boolean }];
    SearchNext: [oProps: { searchString: string; matchCase?: boolean }, bSelect?: boolean];
    SelectAddinField: [sInternalId: string];
    SelectAnnotationRange: [oData: { paragraphId: string; rangeId: string; name: string }];
    SelectContentControl: [sInternalId: string];
    SelectOleObject: [sInternalId: string];
    SetDisplayModeInReview: [sMode: string];
    SetEditingRestrictions: [sType: string];
    SetFormValue: [sInternalId: string, value: string | boolean];
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: string, description: string | { lockScroll?: boolean }];
    
    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    Undo: [];
    UpdateAddinFields: [aData: AddinFieldData[]];
    UpdatePlugin: [oConfig: any];
};

type WordMethodName = keyof WordMethodArgs;

type WordMethodReturn<T extends WordMethodName> = 
    T extends "AddComment" ? string | null :
    T extends "CanRedo" | "CanUndo" | "SearchNext" | "ReplaceTextSmart" ? boolean :
    T extends "GetSelectedText" | "GetCurrentWord" | "GetCurrentSentence" | "GetDocumentLang" | "GetFields" | "GetFileHTML" | "GetFileToDownload" | "ConvertDocument" | "GetSelectedContent" | "GetVBAMacros" | "GetVersion" ? string :
    T extends "GetFormValue" ? null | string | boolean :
    T extends "GetCurrentContentControl" ? string :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    T extends "RemoveContentControl" ? any :
    T extends "InsertAndReplaceContentControls" ? any[] :
    T extends "GetMacros" ? {current: number, macrosArray: string[]} : any;


    export {
        WordMethodArgs,
        WordMethodName,
        WordMethodReturn
    }

    export {
        ContentControlProperties,
        AddinFieldData
    }