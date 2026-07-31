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

import type { AscTheme } from "./src/theme/theme";
import type {
    EditorType,
    VariationConfig,
    VariationType,
    PluginConfig,
    InstalledPluginInfo,
    ButtonConfig,
    StoreConfig,
    IconConfig,
    IconScale,
} from "./src/config/plugin-config";
import type {
    ContextMenuShowEvent,
    PluginEventMap,
    PluginEventName,
    PluginEventCallback,
    PluginEventHandler,
    PluginEditorEventName,
    PluginEditorEventCallback,
} from "./src/plugin/events";
import type {
    CustomMenuClickCallback,
    ToolbarButtonType,
    ButtonMenuItem,
    ButtonBase,
    ButtonContextMenu,
    ButtonToolbar,
    ButtonContentControl,
    ButtonWindowHeader,
    Buttons,
    WindowHeaderFrameOptions,
} from "./src/plugin/buttons";
import type { Asc, AscPlugin, PluginWindow, PluginScope } from "./src/plugin/plugin";
import type { AscDesktopEditor } from "./src/services/desktop-editor";
import type { AscSimpleRequest, AscSimpleRequestOptions } from "./src/services/simple-request";

export type { Word, Cell, Slide, Forms, Pdf };



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
