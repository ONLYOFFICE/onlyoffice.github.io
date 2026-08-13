// The plugin runtime itself: Asc (the window.Asc entry point), AscPlugin (window.Asc.plugin),
// PluginWindow, PluginScope, and PluginInfo. This is the hub module - it cross-imports the
// per-editor namespaces/method types, theme, config, events, and buttons to assemble AscPlugin's
// executeMethod/attachEditorEvent overloads and Asc's button constructors.

import type { Word } from "../generated/word";
import type { Cell } from "../generated/cell";
import type { Slide } from "../generated/slide";
import type { Forms } from "../generated/forms";
import type { Pdf } from "../generated/pdf";

import type { WordMethodName, WordMethodArgs, WordMethodReturn } from "../generated/word-methods";
import type { CellMethodName, CellMethodArgs, CellMethodReturn } from "../generated/cell-methods";
import type { SlideMethodName, SlideMethodArgs, SlideMethodReturn } from "../generated/slide-methods";
import type { PdfMethodName, PdfMethodArgs, PdfMethodReturn } from "../generated/pdf-methods";
import type { FormsMethodName, FormsMethodArgs, FormsMethodReturn } from "../generated/forms-methods";

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

/**
 * Rejects anything a `callCommand` result can't survive.
 *
 * The command body is serialized with `Function.prototype.toString()` and re-run inside the
 * editor's own process, so its return value has to cross a process boundary. The editor filters it
 * through `Asc.checkReturnCommand`, which walks the value up to 10 levels deep and replaces
 * anything carrying methods - an `ApiParagraph`, an `ApiDocument`, any other `Api.*` object - with
 * `undefined`. Mapping function-valued properties to `never` turns that silent data loss into a
 * compile error, while plain data (object literals, interfaces, arrays, unions, nested
 * combinations) passes through untouched.
 */
type CommandSerializable<T> =
    T extends Function ? never :
    T extends object ? { [K in keyof T]: CommandSerializable<T[K]> } :
    T;

/** An item of the input helper list. */
interface InputHelperItem {
    /**
     * The item index. Optional when setting items - the runtime assigns the array position as the
     * id for any item that omits it - and always present on items read back via `getItems`.
     */
    id?: string;
    /** The item text. */
    text: string;
}

/**
 * A window that appears and disappears as the user types, positioned against the cursor. Obtained
 * from `Asc.plugin.getInputHelper()` after `Asc.plugin.createInputHelper()`.
 */
interface InputHelper {
    /** Creates the input helper window. */
    createWindow(): void;
    /** Returns all items currently in the input helper. */
    getItems(): InputHelperItem[];
    /** Sets the items shown in the input helper. */
    setItems(items: InputHelperItem[]): void;
    /** Shows the input helper at the given size, optionally capturing the keyboard. */
    show(width: number, height: number, isCaptureKeyboard?: boolean): void;
    /** Hides the input helper. */
    unShow(): void;
    /**
     * Returns the scrollable size of the input helper window.
     *
     * Keyed `w`/`h`, not `width`/`height`: sdkjs's own JSDoc declares this `@returns {number}` and
     * describes it as "width and height", but the implementation returns `{ w, h }` - the shape
     * here follows the implementation.
     */
    getScrollSizes(): { w: number; h: number };
}

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
    /**
     * Runs `command` inside the editor's process, where the global `Api` is the entry point.
     *
     * The function is serialized with `Function.prototype.toString()`, so it is **not a closure**:
     * nothing from the surrounding scope is visible inside it. Pass data in through
     * `Asc.scope` (JSON-serialized into the command's context and readable there as `Asc.scope` or
     * the bare `scope`) rather than by capturing variables.
     *
     * `command`'s return value is delivered to `callback`. It must be plain data - see
     * {@link CommandSerializable}; returning an `Api.*` object yields `undefined` at runtime and is
     * rejected here at compile time.
     *
     * @param isClose - Close the plugin window once the command has run.
     * @param isCalc - Recalculate the document afterwards (default `true`; pass `false` only when
     * the edits certainly cannot affect recalculation).
     */
    callCommand: <T>(
        command: () => T & CommandSerializable<T>,
        isClose?: boolean,
        isCalc?: boolean,
        callback?: (value: T) => void,
    ) => void;
    /**
     * Promise-returning {@link AscPlugin.callCommand}, available when the host supports async
     * functions. Always runs with `isClose: false` and `isCalc: true`; use `callCommand` directly
     * when you need either of those to differ.
     */
    callCommandAsync: <T>(command: () => T & CommandSerializable<T>) => Promise<T>;
    /** Promise-returning {@link AscPlugin.executeMethod}, typed per editor the same way. */
    callMethodAsync: (<T extends WordMethodName>(methodName: T, args?: WordMethodArgs[T]) => Promise<WordMethodReturn<T>>) &
        (<T extends CellMethodName>(methodName: T, args?: CellMethodArgs[T]) => Promise<CellMethodReturn<T>>) &
        (<T extends SlideMethodName>(methodName: T, args?: SlideMethodArgs[T]) => Promise<SlideMethodReturn<T>>) &
        (<T extends PdfMethodName>(methodName: T, args?: PdfMethodArgs[T]) => Promise<PdfMethodReturn<T>>) &
        (<T extends FormsMethodName>(methodName: T, args?: FormsMethodArgs[T]) => Promise<FormsMethodReturn<T>>);
    /**
     * Fetches a remotely located script and executes it as a command, the same way
     * {@link AscPlugin.callCommand} executes an inline function. The callback receives the fetched
     * source text, not the command's return value.
     */
    callModule: (url: string, callback?: (response: string) => void, isClose?: boolean) => void;
    /** Fetches a remotely located text resource without executing it. */
    loadModule: (url: string, callback?: (response: string) => void) => void;
    /** Creates the {@link InputHelper} - a window that tracks the cursor as the user types. */
    createInputHelper: () => void;
    /** Returns the {@link InputHelper} created by {@link AscPlugin.createInputHelper}. */
    getInputHelper: () => InputHelper;
    /** Called when the user picks an item from the input helper. */
    inputHelper_onSelectItem?: (item: InputHelperItem) => void;
    /**
     * Fallback for a {@link AscPlugin.callCommand} result when that call was made without its own
     * `callback` argument.
     */
    onCommandCallback?: (returnValue: unknown) => void;
    /**
     * Fallback for an {@link AscPlugin.executeMethod} result when that call was made without its
     * own `callback` argument.
     */
    onMethodReturn?: (returnValue: unknown) => void;
    /** Called when the editor integrator sends the plugin a message. */
    onExternalPluginMessage?: (data: { type: string; [key: string]: unknown }) => void;
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
    event_onEnableMouseEvent?: PluginEventHandler<"onEnableMouseEvent">;
    event_onChangeRestrictions?: PluginEventHandler<"onChangeRestrictions">;
    onDestroy?: () => void;
    onEvent: (eventName: string, payload?: unknown) => void;
    executeMethod: ((methodName: 'CloseWindow', args?: [windowId: number]) => void) &
        ((methodName: 'ShowButton', args?: [buttonId: string, visible: boolean, align?: string]) => void) &
        /**
         * Like CloseWindow/ShowButton, undocumented on api.onlyoffice.com but real and callable -
         * `common/apiBase_plugins.js`'s own `pluginMethod_ResizeWindow` takes exactly these 4
         * params (frameId, size, minSize, maxSize), not the single `aSize: number[]` this used to
         * be typed as here.
         */
        ((methodName: 'ResizeWindow', args?: [frameId: string, size: number, minSize: number, maxSize: number]) => void) &
        (<T extends WordMethodName>(methodName: T, args?: WordMethodArgs[T], callback?: (result: WordMethodReturn<T>) => void) => void) &
        (<T extends CellMethodName>(methodName: T, args?: CellMethodArgs[T], callback?: (result: CellMethodReturn<T>) => void) => void) &
        (<T extends SlideMethodName>(methodName: T, args?: SlideMethodArgs[T], callback?: (result: SlideMethodReturn<T>) => void) => void) &
        (<T extends PdfMethodName>(methodName: T, args?: PdfMethodArgs[T], callback?: (result: PdfMethodReturn<T>) => void) => void) &
        (<T extends FormsMethodName>(methodName: T, args?: FormsMethodArgs[T], callback?: (result: FormsMethodReturn<T>) => void) => void);
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

export type {
    PluginScope,
    Asc,
    AscPlugin,
    PluginWindow,
    ExecuteCommandCallback,
    PluginInfo,
    CommandSerializable,
    InputHelper,
    InputHelperItem,
};
