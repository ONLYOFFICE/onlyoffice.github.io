import type { Cell } from "./src/generated/cell";
import type { Slide } from "./src/generated/slide";
import type { Word } from "./src/generated/word";
import type { Forms } from "./src/generated/forms";
import type { Pdf } from "./src/pdf";

import type { WordMethodName, WordMethodArgs, WordMethodReturn } from "./src/word-methods";
import type { CellMethodName, CellMethodArgs, CellMethodReturn } from "./src/cell-methods";
import type { SlideMethodName, SlideMethodArgs, SlideMethodReturn } from "./src/slide-methods";
import type {
    PdfMethodName,
    PdfMethodArgs,
    PdfMethodReturn,
    PdfPageImageOptions,
    PdfReplacePageContentOptions,
    PdfReplaceXmlOptions,
    PdfReplaceHtmlOptions,
} from "./src/pdf-methods";

export type { Word, Cell, Slide, Forms, Pdf };



type DesktopDialogType = 'plugin' | 'images' | 'cell' | 'word' | 'slide';

/** Native C++ object injected by OnlyOffice Desktop Editor into the browser window */
interface AscDesktopEditor {
    // Plugin management
    GetInstallPlugins(): string;
    GetBackupPlugins(): string;
    PluginInstall(path: string): boolean;

    // File dialogs
    OpenFilenameDialog(type: DesktopDialogType, multiple: boolean, callback: (file: string | string[]) => void): void;

    // Local file operations
    LocalStartOpen(): void;
    LocalFileSave(params: string, password: string, docinfo?: unknown, fileType?: number, jsonOptions?: string, passwordOld?: string): void;
    LocalFileSaveChanges(changes: string, deleteIndex: number, count: number): void;
    LocalFileGetSaved(): boolean;
    LocalFileGetSourcePath(): string;
    LocalFileGetRelativePath(path: string): string;
    LocalFileGetOpenChangesCount(): number;
    LocalFileGetImageUrl(path: string): string;
    LocalFileGetImageUrlCorrect(path: string): string;
    IsLocalFileExist(path: string): boolean;
    GetOpenedFile(path: string): ArrayBuffer | null;
    AddChanges(type: number, base64: string): void;

    // Document state
    SetDocumentName(name: string): void;
    onDocumentModifiedChanged(isModified: boolean): void;
    SetLocalRestrictions(value: number): void;
    SetAdvancedOptions(xml: string): void;
    NativeViewerOpen(password: string): void;
    CheckUserId(): string;

    // Encryption
    buildCryptedEnd(success: boolean): void;

    // External conversions
    startExternalConvertation(type: string, params: string): void;
}

interface AscSimpleRequestOptions {
    url: string;
    crossOrigin?: boolean;
    crossDomain?: boolean;
    timeout?: number;
    headers?: string;
    complete?: (response: any, status: string) => void;
    error?: (response: any, status: string, error: any) => void;
}

interface AscSimpleRequest {
    createRequest(options: AscSimpleRequestOptions): void;
}

declare global {
    interface Window {
        Asc: Asc;
        AscDesktopEditor?: AscDesktopEditor;
        AscSimpleRequest?: AscSimpleRequest;
    }
    var Asc: Asc;
    var AscDesktopEditor: AscDesktopEditor | undefined;
    var AscSimpleRequest: AscSimpleRequest | undefined;
    /**
     * The editor API is declared by an editor-specific entry point:
     * `onlyoffice-plugins-api/word`, `/cell`, `/slide`, or `/pdf`.
     * It is intentionally not declared by the root package because the runtime
     * shape depends on the editor hosting the plugin.
     */
}

export {};

interface PluginScope {
    [key: string]: any;
    /**
     * Only present on the initial `Asc.scope` the runtime bootstraps (`plugins.dev.js` sets it once
     * at startup as a convenience for plugin authors - the runtime itself never calls it). Plugins
     * routinely replace `Asc.scope` wholesale with a plain data payload before `callCommand`
     * (`window.Asc.scope = { foo: 1 }`) so that data is readable inside the sandboxed callback -
     * that payload has no reason to carry `prototype.clear`, so it must stay optional here.
     */
    prototype?: {
        clear(): void;
    };
}

interface ContextMenuShowEvent {
    /** The context type used by the editor, for example `All`. */
    type: string;
}

/** Event arguments are tuples so events with no payload can be represented as `[]`. */
type PluginEventMap = {
    onContextMenuShow: [event: ContextMenuShowEvent];
    /** Payload is not documented consistently across editor versions. */
    onWindowResize: [event: unknown];
    /** Payload is not documented consistently across editor versions. */
    onInputHelperInput: [event: unknown];
    onInputHelperClear: [];
    onExternalMouseUp: [];
    onClickBack: [];
    onDocumentContentReady: [];
    onTargetPositionChanged: [];
    /** Payload shape is not documented consistently across editor versions. */
    onClick: [event: unknown];
    /** Payload shape is not documented consistently across editor versions. */
    onKeyDown: [event: unknown];
};

type PluginEventName = keyof PluginEventMap | (string & {});
type PluginEventCallback<T = unknown> = (...args: T[]) => void;
type PluginEventHandler<K extends keyof PluginEventMap> = (...args: PluginEventMap[K]) => void;

/** Editor content events (paragraph/page changes) - a distinct registry from PluginEventName, which covers plugin-window-level events (theme, resize, ...) */
type PluginEditorEventName = 'onChangeCurrentPage' | 'onParagraphText' | 'onPargraphAdd' | 'onParagraphRemove' | string;

type PluginEditorEventCallback<T = unknown> = (...args: T[]) => void;

interface Asc {
    plugin: AscPlugin;
    scope: PluginScope;
    PluginWindow: new () => PluginWindow;
    ButtonContextMenu: new (parent?: ButtonBase | null, id?: string) => ButtonContextMenu;
    ButtonToolbar: new (parent?: ButtonBase | null, id?: string) => ButtonToolbar;
    ButtonContentControl: new (parent?: ButtonBase | null, id?: string) => ButtonContentControl;
    ButtonWindowHeader: new (parent?: ButtonBase | null, id?: string) => ButtonWindowHeader;
    Buttons: Buttons;
}

interface AscPlugin {
    /** Plugin GUID from config.json. */
    guid?: string;
    /** Window identifier assigned when the plugin is opened in a separate window. */
    windowID?: string;
    /** Handler for context-menu item clicks registered with attachContextMenuClickEvent. */
    event_onContextMenuClick?: (id?: string) => void;
    /** Handler for toolbar-menu item clicks registered with attachToolbarMenuClickEvent. */
    event_onToolbarMenuClick?: (id?: string) => void;
    /** Handler for window-header item clicks registered with attachWindowHeaderMenuClickEvent. */
    event_onWindowHeaderMenuClick?: (id?: string) => void;
    /**

     * Per-editor overloads (typed from each editor's own plugin-events.js) come first so a known
     * event name gets its real payload type; the final overload is a loose fallback for events
     * not modeled yet (e.g. the low-level common/UI ones - onContextMenuShow, onClick, onKeyDown, ...).
     */
    attachEditorEvent: (<T extends Word.EditorEventName>(eventName: T, callback: (...args: Word.EditorEventArgs[T]) => void) => void) &
        (<T extends Cell.EditorEventName>(eventName: T, callback: (...args: Cell.EditorEventArgs[T]) => void) => void) &
        (<T extends Slide.EditorEventName>(eventName: T, callback: (...args: Slide.EditorEventArgs[T]) => void) => void) &
        (<T extends Forms.EditorEventName>(eventName: T, callback: (...args: Forms.EditorEventArgs[T]) => void) => void) &
        (<T extends Pdf.EditorEventName>(eventName: T, callback: (...args: Pdf.EditorEventArgs[T]) => void) => void) &
        ((eventName: PluginEditorEventName, callback: PluginEditorEventCallback) => void);
    attachContextMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachEvent: (<T extends keyof PluginEventMap>(eventName: T, callback: (...args: PluginEventMap[T]) => void) => void) &
        ((eventName: string, callback: (...args: unknown[]) => void) => void);
    attachToolbarMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachWindowHeaderMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    button: (id: number, text: string) => void;
    callCommand: (command: () => void, isClose?: boolean, isCalc?: boolean, callback?: (value?: any) => void) => void;
    detachEditorEvent: (<T extends Word.EditorEventName>(eventName: T) => void) &
        (<T extends Cell.EditorEventName>(eventName: T) => void) &
        (<T extends Slide.EditorEventName>(eventName: T) => void) &
        (<T extends Forms.EditorEventName>(eventName: T) => void) &
        (<T extends Pdf.EditorEventName>(eventName: T) => void) &
        ((eventName: PluginEditorEventName) => void);
    detachEvent: (<T extends keyof PluginEventMap>(eventName: T) => void) &
        ((eventName: string) => void);
    event_onContextMenuShow?: PluginEventHandler<"onContextMenuShow">;
    event_onWindowResize?: PluginEventHandler<"onWindowResize">;
    event_onInputHelperInput?: PluginEventHandler<"onInputHelperInput">;
    event_onInputHelperClear?: PluginEventHandler<"onInputHelperClear">;
    event_onExternalMouseUp?: PluginEventHandler<"onExternalMouseUp">;
    event_onClickBack?: PluginEventHandler<"onClickBack">;
    event_onDocumentContentReady?: PluginEventHandler<"onDocumentContentReady">;
    event_onTargetPositionChanged?: PluginEventHandler<"onTargetPositionChanged">;
    event_onClick?: PluginEventHandler<"onClick">;
    event_onKeyDown?: PluginEventHandler<"onKeyDown">;
    onDestroy?: () => void;
    onEvent: (eventName: string, payload?: unknown) => void;
    executeMethod: ((methodName: 'CloseWindow', args?: [windowId: number]) => void) &
        ((methodName: 'ShowButton', args?: [buttonId: string, visible: boolean, align?: string]) => void) &
        (<T extends WordMethodName>(methodName: T, args?: WordMethodArgs[T], callback?: (result: WordMethodReturn<T>) => void) => void) &
        (<T extends CellMethodName>(methodName: T, args?: CellMethodArgs[T], callback?: (result: CellMethodReturn<T>) => void) => void) &
        (<T extends SlideMethodName>(methodName: T, args?: SlideMethodArgs[T], callback?: (result: SlideMethodReturn<T>) => void) => void) &
        (<T extends PdfMethodName>(methodName: T, args?: PdfMethodArgs[T], callback?: (result: PdfMethodReturn<T>) => void) => void);
    executeCommand: ExecuteCommandCallback;
    info: PluginInfo;
    init: () => void;
    onExternalMouseUp: () => void;
    onThemeChanged: (theme: AscTheme) => void;
    onThemeChangedBase: (theme: AscTheme) => void;
    onTranslate(): void;
    resizeWindow: (width: number, height: number, minWidth?: number, minHeight?: number, maxWidth?: number, maxHeight?: number) => void;
    sendEvent: (eventName: string, eventData?: unknown) => void;
    sendToPlugin(message: string, payload?: unknown): void;
    theme: AscTheme;
    tr: (key: string) => string;
    /** Set to `true` after `tr` is first initialized */
    tr_init?: boolean;
    /** Translation map for the current language, populated by `pluginInitTranslateManager` */
    translateManager?: Record<string, string>;
    trigger: (eventName: string, eventData?: unknown) => void;
    version: string;
}

interface PluginWindow {
    id: string;
    show: (variation: VariationConfig) => void;
    close: () => void;
    attachEvent: (eventName: string, callback: PluginEventCallback) => void;
    // detachEvent: (eventName: string) => void;
    command: (methodName: string, payload?: unknown) => void;
}

type CustomMenuClickCallback = (data?: string) => void;

type ToolbarButtonType = "button" | "big-button";

interface ButtonMenuItem {
    id: string;
    text: string;
    hint?: string;
    items?: ButtonMenuItem[];
    onclick?: CustomMenuClickCallback;
}

interface ButtonBase {
    id: string;
    editors: EditorType[];
    icons: IconConfig | string[] | string | null;
    text: string;
    hint: string | null;
    data: string;
    separator: boolean;
    lockInViewMode: boolean;
    enableToggle: boolean;
    disabled: boolean;
    removed: boolean;
    parent: ButtonBase | null;
    childs: ButtonBase[] | null;
    menu?: ButtonMenuItem[];
    split?: boolean;
    pressed?: boolean;
    attachOnClick: (callback: CustomMenuClickCallback) => void;
    copy?: () => ButtonBase;
}

interface ButtonContextMenu extends ButtonBase {
    showOnOptionsType: string[];
    addCheckers: (...keys: string[]) => void;
}

interface ButtonToolbar extends ButtonBase {
    type: ToolbarButtonType;
    tab: string;
}

interface ButtonContentControl extends ButtonBase {
    checker?: (contentControlId: string) => boolean | Promise<boolean>;
    addChecker: (checker: (contentControlId: string) => boolean | Promise<boolean>) => void;
}

interface ButtonWindowHeader extends ButtonBase {
    align: "left" | "center" | "right" | string;
    isLabel: boolean;
    isTitle: boolean;
}

interface Buttons {
    registerContextMenu: () => void;
    registerToolbarMenu: () => void;
    updateToolbarMenu: (id: string, text: string, buttons: ButtonToolbar[]) => void;
    registerWindowHeader: (id: string, buttons: ButtonWindowHeader[], frame?: WindowHeaderFrameOptions) => void;
    updateWindowHeader: (id: string, buttons: ButtonWindowHeader[], add?: boolean, frame?: WindowHeaderFrameOptions) => void;
    registerContentControl: () => void;
}

interface WindowHeaderFrameOptions {
    align?: "left" | "center" | "right" | string;
    isLabel?: boolean;
    isTitle?: boolean;
}

interface ExecuteCommandCallback {
    (command: string, value?: unknown, callback?: () => void): void;
}

interface ButtonConfig {
    isViewer?: boolean;
    primary?: boolean;
    text: string;
    textLocale?: Record<string, string>;
}

type EditorType = 'word' | 'cell' | 'slide' | 'pdf';

type IconScale = '100%' | '125%' | '150%' | '175%' | '200%';

type IconScaleEntry = {
    active?: string;
    hover?: string;
    normal: string;
};

type IconConfig = {
    [K in IconScale]?: IconScaleEntry;
} & {
    /** Light/dark icon set variant - real-world config.json files pair this with `theme`. */
    style?: 'light' | 'dark';
    /** Icon theme name, e.g. `"flat"`/`"flatDark"` - not a fixed enum in practice. */
    theme?: string;
    /** Fallback used for any scale not otherwise listed. */
    default?: IconScaleEntry;
};

type InitDataType = 'text' | 'html' | 'ole' | 'desktop' | 'desktop-external' | 'none' | 'sign';

type MenuType = 'left' | 'right';

interface PluginInfo {
    editorType: EditorType;
    documentCallbackUrl: string;
    documentId: string;
    documentTitle: string;
    guid: string;
    isEmbedMode: boolean;
    isMobileMode: boolean;
    isViewMode: boolean;
    jwt: string;
    lang: string;
    mmToPx: number;
    theme: AscTheme;
    userId: string;
    userName: string;
}

interface PluginConfig {
    baseUrl?: string;
    description?: string;
    discussion?: string;
    guid: string;
    /** A help/support link for the plugin. */
    help?: string;
    /** Marks the plugin as belonging to ONLYOFFICE's own scheme/catalog rather than a third party. */
    onlyofficeScheme?: boolean;
    /** Version of the config.json format itself, distinct from the plugin's own `version`. */
    manifestVersion?: string;
    minVersion?: string;
    name: string;
    nameLocale?: Record<string, string>;
    offered?: string;
    url?: string;
    variations: VariationConfig[];
    version?: string;
}

interface InstalledPluginInfo {
    baseUrl: string;
    canRemoved: boolean;
    guid: string;
    obj: PluginConfig;
    removed?: boolean;
}

interface StoreConfig {
    background?: {
        dark: string;
        light: string;
    };
    categories?: string[];
    icons?: {
        dark: string;
        light: string;
    };
    screenshots?: string[];
}

type KnownThemeName = "theme-night" | "theme-light" | "theme-dark" | "theme-gray" | "theme-white" | "theme-classic-light" | "theme-contrast-dark";

interface AscTheme {
    /** Theme name */
    Name: KnownThemeName | string;
    /** @deprecated Theme name (duplicate for compatibility) */
    name: KnownThemeName | string;
    /** Theme type (light/dark) */
    Type: "light" | "dark";
    /** @deprecated Theme type (light/dark) */
    type: "light" | "dark";
    /** Show rulers button */
    RulersButton: boolean;
    /** Show navigation buttons */
    NavigationButtons: boolean;
    /** Set thumbnail scroll width to null if no scrolling */
    ThumbnailScrollWidthNullIfNoScrolling: boolean;
    /** Need to invert on active */
    isNeedInvertOnActive: boolean;
    /** Support notes */
    SupportNotes: boolean;
    /** Style thumbnail width */
    STYLE_THUMBNAIL_WIDTH: number;
    /** Style thumbnail height */
    STYLE_THUMBNAIL_HEIGHT: number;
    /** Forms content controls outline border radius hover */
    FormsContentControlsOutlineBorderRadiusHover: number;
    /** Forms content controls outline border radius active */
    FormsContentControlsOutlineBorderRadiusActive: number;
    /** Themes thumbnail width */
    THEMES_THUMBNAIL_WIDTH: number;
    /** Themes thumbnail height */
    THEMES_THUMBNAIL_HEIGHT: number;
    /** Themes layout thumbnail height */
    THEMES_LAYOUT_THUMBNAIL_HEIGHT: number;
    /** Splitter width in mm */
    SplitterWidthMM: number;
    /** Animation pane timeline scroller opacity */
    AnimPaneTimelineScrollerOpacity: number;
    /** Animation pane timeline scroller hover opacity */
    AnimPaneTimelineScrollerOpacityHovered: number;
    /** Animation pane timeline scroller active opacity */
    AnimPaneTimelineScrollerOpacityActive: number;
    /** Background color */
    BackgroundColor: string;
    /** Page outline color */
    PageOutline: string;
    /** Dark ruler color */
    RulerDark: string;
    /** Light ruler color */
    RulerLight: string;
    /** Ruler outline color */
    RulerOutline: string;
    /** Ruler markers outline color */
    RulerMarkersOutlineColor: string;
    /** Old ruler markers outline color */
    RulerMarkersOutlineColorOld: string;
    /** Ruler markers fill color */
    RulerMarkersFillColor: string;
    /** Old ruler markers fill color */
    RulerMarkersFillColorOld: string;
    /** Ruler text color */
    RulerTextColor: string;
    /** Ruler tabs color */
    RulerTabsColor: string;
    /** Old ruler tabs color */
    RulerTabsColorOld: string;
    /** Ruler table color 1 */
    RulerTableColor1: string;
    /** Ruler table color 2 */
    RulerTableColor2: string;
    /** Scroll background color */
    ScrollBackgroundColor: string;
    /** Scroll outline color */
    ScrollOutlineColor: string;
    /** Scroll outline hover color */
    ScrollOutlineHoverColor: string;
    /** Scroll outline active color */
    ScrollOutlineActiveColor: string;
    /** Scroller color */
    ScrollerColor: string;
    /** Scroller hover color */
    ScrollerHoverColor: string;
    /** Scroller active color */
    ScrollerActiveColor: string;
    /** Scroll arrow color */
    ScrollArrowColor: string;
    /** Scroll arrow hover color */
    ScrollArrowHoverColor: string;
    /** Scroll arrow active color */
    ScrollArrowActiveColor: string;
    /** Scroller target color */
    ScrollerTargetColor: string;
    /** Scroller target hover color */
    ScrollerTargetHoverColor: string;
    /** Scroller target active color */
    ScrollerTargetActiveColor: string;
    /** Content controls background */
    ContentControlsBack: string;
    /** Content controls hover background */
    ContentControlsHover: string;
    /** Content controls active background */
    ContentControlsActive: string;
    /** Content controls text color */
    ContentControlsText: string;
    /** Content controls active text color */
    ContentControlsTextActive: string;
    /** Content controls anchor active color */
    ContentControlsAnchorActive: string;
    /** Forms content controls outline hover */
    FormsContentControlsOutlineHover: string;
    /** Forms content controls outline active */
    FormsContentControlsOutlineActive: string;
    /** Forms content controls markers background */
    FormsContentControlsMarkersBackground: string;
    /** Forms content controls markers background hover */
    FormsContentControlsMarkersBackgroundHover: string;
    /** Forms content controls markers background active */
    FormsContentControlsMarkersBackgroundActive: string;
    /** Forms content controls outline mover hover */
    FormsContentControlsOutlineMoverHover: string;
    /** Forms content controls outline mover active */
    FormsContentControlsOutlineMoverActive: string;
    /** Thumbnails background color */
    BackgroundColorThumbnails: string;
    /** Thumbnails active background color */
    BackgroundColorThumbnailsActive: string;
    /** Thumbnails hover background color */
    BackgroundColorThumbnailsHover: string;
    /** Thumbnails page active outline color */
    ThumbnailsPageOutlineActive: string;
    /** Thumbnails page hover outline color */
    ThumbnailsPageOutlineHover: string;
    /** Thumbnails page number text color */
    ThumbnailsPageNumberText: string;
    /** Thumbnails page number active text color */
    ThumbnailsPageNumberTextActive: string;
    /** Thumbnails page number hover text color */
    ThumbnailsPageNumberTextHover: string;
    /** Thumbnails lock color */
    ThumbnailsLockColor: string;
    /** Notes background color */
    BackgroundColorNotes: string;
    /** Border splitter color */
    BorderSplitterColor: string;
    /** Animation pane background */
    AnimPaneBackground: string;
    /** Animation pane selected item fill */
    AnimPaneItemFillSelected: string;
    /** Animation pane hovered item fill */
    AnimPaneItemFillHovered: string;
    /** Animation pane button fill */
    AnimPaneButtonFill: string;
    /** Animation pane button hover fill */
    AnimPaneButtonFillHovered: string;
    /** Animation pane button disabled fill */
    AnimPaneButtonFillDisabled: string;
    /** Animation pane play button fill */
    AnimPanePlayButtonFill: string;
    /** Animation pane play button outline */
    AnimPanePlayButtonOutline: string;
    /** Animation pane entrance effect bar fill */
    AnimPaneEffectBarFillEntrance: string;
    /** Animation pane entrance effect bar outline */
    AnimPaneEffectBarOutlineEntrance: string;
    /** Animation pane emphasis effect bar fill */
    AnimPaneEffectBarFillEmphasis: string;
    /** Animation pane emphasis effect bar outline */
    AnimPaneEffectBarOutlineEmphasis: string;
    /** Animation pane exit effect bar fill */
    AnimPaneEffectBarFillExit: string;
    /** Animation pane exit effect bar outline */
    AnimPaneEffectBarOutlineExit: string;
    /** Animation pane path effect bar fill */
    AnimPaneEffectBarFillPath: string;
    /** Animation pane path effect bar outline */
    AnimPaneEffectBarOutlinePath: string;
    /** Animation pane timeline ruler outline */
    AnimPaneTimelineRulerOutline: string;
    /** Animation pane timeline ruler tick */
    AnimPaneTimelineRulerTick: string;
    /** Animation pane timeline scroller fill */
    AnimPaneTimelineScrollerFill: string;
    /** Animation pane timeline scroller outline */
    AnimPaneTimelineScrollerOutline: string;
    /** Animation pane text color */
    AnimPaneText: string;
    /** Animation pane active text color */
    AnimPaneTextActive: string;
    /** Animation pane hover text color */
    AnimPaneTextHover: string;
    /** DEM background color */
    DemBackgroundColor: string;
    /** DEM button background color */
    DemButtonBackgroundColor: string;
    /** DEM button hover background color */
    DemButtonBackgroundColorHover: string;
    /** DEM button active background color */
    DemButtonBackgroundColorActive: string;
    /** DEM button border color */
    DemButtonBorderColor: string;
    /** DEM button text color */
    DemButtonTextColor: string;
    /** DEM button active text color */
    DemButtonTextColorActive: string;
    /** DEM splitter color */
    DemSplitterColor: string;
    /** DEM text color */
    DemTextColor: string;
    /** General background color */
    Background: string;
    /** Active background color */
    BackgroundActive: string;
    /** Highlighted background color */
    BackgroundHighlighted: string;
    /** General border color */
    Border: string;
    /** Active border color */
    BorderActive: string;
    /** Highlighted border color */
    BorderHighlighted: string;
    /** General text color */
    Color: string;
    /** Active text color */
    ColorActive: string;
    /** Highlighted text color */
    ColorHighlighted: string;
    /** Filtering text color */
    ColorFiltering: string;
    /** Sheet view cell background */
    SheetViewCellBackground: string;
    /** Sheet view cell pressed background */
    SheetViewCellBackgroundPressed: string;
    /** Sheet view cell hover background */
    SheetViewCellBackgroundHover: string;
    /** Sheet view cell title label color */
    SheetViewCellTitleLabel: string;
    /** Dark text color */
    ColorDark: string;
    /** Dark active text color */
    ColorDarkActive: string;
    /** Dark highlighted text color */
    ColorDarkHighlighted: string;
    /** Dark filtering text color */
    ColorDarkFiltering: string;
    /** Group data border color */
    GroupDataBorder: string;
    /** Editor border color */
    EditorBorder: string;
    /** Select all icon color */
    SelectAllIcon: string;
    /** Sheet view select all icon color */
    SheetViewSelectAllIcon: string;
    /** Document toolbar header background */
    "toolbar-header-document": string;
    /** Spreadsheet toolbar header background */
    "toolbar-header-spreadsheet": string;
    /** Presentation toolbar header background */
    "toolbar-header-presentation": string;
    /** PDF toolbar header background */
    "toolbar-header-pdf": string;
    /** Visio toolbar header background */
    "toolbar-header-visio": string;
    /** Document toolbar header text on background */
    "text-toolbar-header-on-background-document": string;
    /** Spreadsheet toolbar header text on background */
    "text-toolbar-header-on-background-spreadsheet": string;
    /** Presentation toolbar header text on background */
    "text-toolbar-header-on-background-presentation": string;
    /** PDF toolbar header text on background */
    "text-toolbar-header-on-background-pdf": string;
    /** Visio toolbar header text on background */
    "text-toolbar-header-on-background-visio": string;
    /** Normal background color */
    "background-normal": string;
    /** Toolbar background color */
    "background-toolbar": string;
    /** Additional toolbar background color */
    "background-toolbar-additional": string;
    /** Primary dialog button background color */
    "background-primary-dialog-button": string;
    /** Notification popover background color */
    "background-notification-popover": string;
    /** Notification badge background color */
    "background-notification-badge": string;
    /** Scrim background color */
    "background-scrim": string;
    /** Loader background color */
    "background-loader": string;
    /** Accent button background color */
    "background-accent-button": string;
    /** Contrast popover background color */
    "background-contrast-popover": string;
    /** Contrast popover shadow */
    "shadow-contrast-popover": string;
    /** Button hover highlight */
    "highlight-button-hover": string;
    /** Button pressed highlight */
    "highlight-button-pressed": string;
    /** Button pressed hover highlight */
    "highlight-button-pressed-hover": string;
    /** Primary dialog button hover highlight */
    "highlight-primary-dialog-button-hover": string;
    /** Header button hover highlight */
    "highlight-header-button-hover": string;
    /** Header button pressed highlight */
    "highlight-header-button-pressed": string;
    /** Text select highlight */
    "highlight-text-select": string;
    /** Accent button hover highlight */
    "highlight-accent-button-hover": string;
    /** Accent button pressed highlight */
    "highlight-accent-button-pressed": string;
    /** Document toolbar tab underline */
    "highlight-toolbar-tab-underline-document": string;
    /** Spreadsheet toolbar tab underline */
    "highlight-toolbar-tab-underline-spreadsheet": string;
    /** Presentation toolbar tab underline */
    "highlight-toolbar-tab-underline-presentation": string;
    /** PDF toolbar tab underline */
    "highlight-toolbar-tab-underline-pdf": string;
    /** Visio toolbar tab underline */
    "highlight-toolbar-tab-underline-visio": string;
    /** Document header tab underline */
    "highlight-header-tab-underline-document": string;
    /** Spreadsheet header tab underline */
    "highlight-header-tab-underline-spreadsheet": string;
    /** Presentation header tab underline */
    "highlight-header-tab-underline-presentation": string;
    /** PDF header tab underline */
    "highlight-header-tab-underline-pdf": string;
    /** Visio header tab underline */
    "highlight-header-tab-underline-visio": string;
    /** Toolbar border color */
    "border-toolbar": string;
    /** Divider border color */
    "border-divider": string;
    /** Regular control border color */
    "border-regular-control": string;
    /** Toolbar button hover border */
    "border-toolbar-button-hover": string;
    /** Preview hover border */
    "border-preview-hover": string;
    /** Preview select border */
    "border-preview-select": string;
    /** Control focus border */
    "border-control-focus": string;
    /** Color shading border */
    "border-color-shading": string;
    /** Error border color */
    "border-error": string;
    /** Contrast popover border */
    "border-contrast-popover": string;
    /** Normal text color */
    "text-normal": string;
    /** Normal pressed text color */
    "text-normal-pressed": string;
    /** Secondary text color */
    "text-secondary": string;
    /** Tertiary text color */
    "text-tertiary": string;
    /** Link text color */
    "text-link": string;
    /** Link hover text color */
    "text-link-hover": string;
    /** Link active text color */
    "text-link-active": string;
    /** Link visited text color */
    "text-link-visited": string;
    /** Inverse text color */
    "text-inverse": string;
    /** Toolbar header text color */
    "text-toolbar-header": string;
    /** Contrast background text color */
    "text-contrast-background": string;
    /** Alt key hint text color */
    "text-alt-key-hint": string;
    /** Normal icon color */
    "icon-normal": string;
    /** Normal pressed icon color */
    "icon-normal-pressed": string;
    /** Inverse icon color */
    "icon-inverse": string;
    /** Toolbar header icon color */
    "icon-toolbar-header": string;
    /** Notification badge icon color */
    "icon-notification-badge": string;
    /** Contrast popover icon color */
    "icon-contrast-popover": string;
    /** Success icon color */
    "icon-success": string;
    /** Canvas background color */
    "canvas-background": string;
    /** Canvas content background color */
    "canvas-content-background": string;
    /** Canvas page border color */
    "canvas-page-border": string;
    /** Canvas ruler background color */
    "canvas-ruler-background": string;
    /** Canvas ruler border color */
    "canvas-ruler-border": string;
    /** Canvas ruler margins background color */
    "canvas-ruler-margins-background": string;
    /** Canvas ruler mark color */
    "canvas-ruler-mark": string;
    /** Canvas ruler handle border color */
    "canvas-ruler-handle-border": string;
    /** Canvas ruler disabled handle border color */
    "canvas-ruler-handle-border-disabled": string;
    /** Canvas high contrast color */
    "canvas-high-contrast": string;
    /** Canvas disabled high contrast color */
    "canvas-high-contrast-disabled": string;
    /** Canvas cell border color */
    "canvas-cell-border": string;
    /** Canvas cell title background color */
    "canvas-cell-title-background": string;
    /** Canvas cell title hover background color */
    "canvas-cell-title-background-hover": string;
    /** Canvas cell title selected background color */
    "canvas-cell-title-background-selected": string;
    /** Canvas cell title border color */
    "canvas-cell-title-border": string;
    /** Canvas cell title hover border color */
    "canvas-cell-title-border-hover": string;
    /** Canvas cell title selected border color */
    "canvas-cell-title-border-selected": string;
    /** Canvas cell title text color */
    "canvas-cell-title-text": string;
    /** Canvas dark cell title color */
    "canvas-dark-cell-title": string;
    /** Canvas dark cell title hover color */
    "canvas-dark-cell-title-hover": string;
    /** Canvas dark cell title selected color */
    "canvas-dark-cell-title-selected": string;
    /** Canvas dark cell title border color */
    "canvas-dark-cell-title-border": string;
    /** Canvas dark cell title hover border color */
    "canvas-dark-cell-title-border-hover": string;
    /** Canvas dark cell title selected border color */
    "canvas-dark-cell-title-border-selected": string;
    /** Canvas dark content background color */
    "canvas-dark-content-background": string;
    /** Canvas dark page border color */
    "canvas-dark-page-border": string;
    /** Canvas scroll thumb color */
    "canvas-scroll-thumb": string;
    /** Canvas scroll thumb hover color */
    "canvas-scroll-thumb-hover": string;
    /** Canvas scroll thumb pressed color */
    "canvas-scroll-thumb-pressed": string;
    /** Canvas scroll thumb border color */
    "canvas-scroll-thumb-border": string;
    /** Canvas scroll thumb hover border color */
    "canvas-scroll-thumb-border-hover": string;
    /** Canvas scroll thumb pressed border color */
    "canvas-scroll-thumb-border-pressed": string;
    /** Canvas scroll arrow color */
    "canvas-scroll-arrow": string;
    /** Canvas scroll arrow hover color */
    "canvas-scroll-arrow-hover": string;
    /** Canvas scroll arrow pressed color */
    "canvas-scroll-arrow-pressed": string;
    /** Canvas scroll thumb target color */
    "canvas-scroll-thumb-target": string;
    /** Canvas scroll thumb target hover color */
    "canvas-scroll-thumb-target-hover": string;
    /** Canvas scroll thumb target pressed color */
    "canvas-scroll-thumb-target-pressed": string;
    /** Canvas sheet view cell background color */
    "canvas-sheet-view-cell-background": string;
    /** Canvas sheet view cell hover background color */
    "canvas-sheet-view-cell-background-hover": string;
    /** Canvas sheet view cell pressed background color */
    "canvas-sheet-view-cell-background-pressed": string;
    /** Canvas sheet view cell title label color */
    "canvas-sheet-view-cell-title-label": string;
    /** Canvas 1px freeze line color */
    "canvas-freeze-line-1px": string;
    /** Canvas 2px freeze line color */
    "canvas-freeze-line-2px": string;
    /** Canvas select all icon color */
    "canvas-select-all-icon": string;
    /** Canvas animation pane background color */
    "canvas-anim-pane-background": string;
    /** Canvas animation pane selected item fill color */
    "canvas-anim-pane-item-fill-selected": string;
    /** Canvas animation pane hovered item fill color */
    "canvas-anim-pane-item-fill-hovered": string;
    /** Canvas animation pane button fill color */
    "canvas-anim-pane-button-fill": string;
    /** Canvas animation pane button hover fill color */
    "canvas-anim-pane-button-fill-hovered": string;
    /** Canvas animation pane button disabled fill color */
    "canvas-anim-pane-button-fill-disabled": string;
    /** Canvas animation pane play button fill color */
    "canvas-anim-pane-play-button-fill": string;
    /** Canvas animation pane play button outline color */
    "canvas-anim-pane-play-button-outline": string;
    /** Canvas animation pane entrance effect bar fill color */
    "canvas-anim-pane-effect-bar-entrance-fill": string;
    /** Canvas animation pane entrance effect bar outline color */
    "canvas-anim-pane-effect-bar-entrance-outline": string;
    /** Canvas animation pane emphasis effect bar fill color */
    "canvas-anim-pane-effect-bar-emphasis-fill": string;
    /** Canvas animation pane emphasis effect bar outline color */
    "canvas-anim-pane-effect-bar-emphasis-outline": string;
    /** Canvas animation pane exit effect bar fill color */
    "canvas-anim-pane-effect-bar-exit-fill": string;
    /** Canvas animation pane exit effect bar outline color */
    "canvas-anim-pane-effect-bar-exit-outline": string;
    /** Canvas animation pane path effect bar fill color */
    "canvas-anim-pane-effect-bar-path-fill": string;
    /** Canvas animation pane path effect bar outline color */
    "canvas-anim-pane-effect-bar-path-outline": string;
    /** Canvas animation pane timeline ruler outline color */
    "canvas-anim-pane-timeline-ruler-outline": string;
    /** Canvas animation pane timeline ruler tick color */
    "canvas-anim-pane-timeline-ruler-tick": string;
    /** Canvas animation pane timeline scroller fill color */
    "canvas-anim-pane-timeline-scroller-fill": string;
    /** Canvas animation pane timeline scroller outline color */
    "canvas-anim-pane-timeline-scroller-outline": string;
    /** Canvas animation pane timeline scroller opacity */
    "canvas-anim-pane-timeline-scroller-opacity": string;
    /** Canvas animation pane timeline scroller hover opacity */
    "canvas-anim-pane-timeline-scroller-opacity-hovered": string;
    /** Canvas animation pane timeline scroller active opacity */
    "canvas-anim-pane-timeline-scroller-opacity-active": string;
    /** Toolbar height controls value */
    "toolbar-height-controls": string;
    /** Sprite button icons UID */
    "sprite-button-icons-uid": string;
}

interface VariationConfig {
    /** Defaults to no buttons (an empty toolbar) when omitted - routinely omitted in practice. */
    buttons?: ButtonConfig[];
    cryptoDisabledForExternalCloud?: string;
    cryptoDisabledForInternalCloud?: string;
    cryptoDisabledOnStart?: string;
    cryptoMode?: string;
    description: string;
    descriptionLocale?: Record<string, string>;
    EditorsSupport: EditorType[];
    events?: string[];
    fixedSize?: boolean;
    /** Some plugins use the same rich per-scale shape here as `icons2` instead of a plain path/map. */
    icons?: Record<string, string> | string[] | string | IconConfig[];
    icons2?: IconConfig[];
    initData?: string;
    initDataType?: InitDataType;
    initOnSelectionChanged?: boolean;
    isCanDocked?: boolean;
    isCustomWindow?: boolean;
    isDisplayedInViewer?: boolean;
    isInsideMode?: boolean;
    isModal?: boolean;
    /** Whether the variation's content needs sequential numbering (used by some panel plugins). */
    isNeedNumbering?: boolean;
    isSystem?: boolean;
    isTargeted?: boolean;
    isUpdateOleOnResize?: boolean;
    isViewer?: boolean;
    /** Omitted in practice about as often as it's set explicitly. */
    isVisual?: boolean;
    menu?: MenuType;
    /** executeMethod names this variation calls - purely descriptive/documentation, not enforced. */
    methods?: string[];
    name?: string;
    nameLocale?: Record<string, string>;
    /** Store listing screenshots for this specific variation (see also StoreConfig.screenshots). */
    screens?: string[];
    size?: number[];
    store?: StoreConfig;
    type?: VariationType;
    url: string;
}

type VariationType = 'window' | 'panel' | 'panelRight' | 'background' | 'system';

export type {
    Asc,
    AscPlugin,
    AscDesktopEditor,
    AscSimpleRequest,
    AscSimpleRequestOptions,
    EditorType,
    AscTheme,
    VariationConfig,
    VariationType,
    PluginWindow,
    PluginConfig,
    InstalledPluginInfo,
    PluginScope,
    PluginEventMap,
    PluginEventHandler,
    ContextMenuShowEvent,
    PluginEventName,
    PluginEventCallback,
    PluginEditorEventName,
    PluginEditorEventCallback,
    ButtonConfig,
    ButtonBase,
    ButtonContextMenu,
    ButtonToolbar,
    ButtonContentControl,
    ButtonWindowHeader,
    ButtonMenuItem,
    Buttons,
    WindowHeaderFrameOptions,
    PdfMethodArgs,
    PdfMethodName,
    PdfMethodReturn,
    PdfPageImageOptions,
    PdfReplacePageContentOptions,
    PdfReplaceXmlOptions,
    PdfReplaceHtmlOptions,
    StoreConfig,
    IconConfig,
    IconScale
};

export type Api<T extends EditorType> =
    T extends "cell" ? Cell.Api :
    T extends "slide" ? Slide.Api :
    T extends "word" ? Word.Api :
    T extends "pdf" ? Pdf.Api :
    never;
