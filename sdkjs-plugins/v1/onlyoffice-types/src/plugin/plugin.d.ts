// The plugin runtime itself: Asc (the window.Asc entry point), AscPlugin (window.Asc.plugin),
// PluginWindow, PluginScope, and PluginInfo. This is the hub module - it cross-imports the
// per-editor namespaces/method types, theme, config, events, and buttons to assemble AscPlugin's
// executeMethod/attachEditorEvent overloads and Asc's button constructors.

import type { Word } from "../generated/word";
import type { Cell } from "../generated/cell";
import type { Slide } from "../generated/slide";
import type { Forms } from "../generated/forms";
import type { Pdf } from "../generated/pdf";

import type { WordMethodName, WordMethodArgs, WordMethodReturn } from "../word-methods";
import type { CellMethodName, CellMethodArgs, CellMethodReturn } from "../cell-methods";
import type { SlideMethodName, SlideMethodArgs, SlideMethodReturn } from "../slide-methods";
import type { PdfMethodName, PdfMethodArgs, PdfMethodReturn } from "../pdf-methods";

import type { AscTheme } from "../theme";
import type { EditorType, VariationConfig } from "../config/plugin-config";
import type {
    PluginEventMap,
    PluginEventCallback,
    PluginEventHandler,
    PluginEditorEventName,
    PluginEditorEventCallback,
} from "./events";
import type {
    CustomMenuClickCallback,
    ButtonBase,
    ButtonContextMenu,
    ButtonToolbar,
    ButtonContentControl,
    ButtonWindowHeader,
    Buttons,
} from "./buttons";

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

interface ExecuteCommandCallback {
    (command: string, value?: unknown, callback?: () => void): void;
}

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

export type { PluginScope, Asc, AscPlugin, PluginWindow, ExecuteCommandCallback, PluginInfo };
