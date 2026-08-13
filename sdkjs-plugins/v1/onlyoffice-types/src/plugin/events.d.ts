// Plugin-window-level events (Asc.plugin.attachEvent/onContextMenuShow/onWindowResize/...) - a
// distinct registry from the per-editor content events (paragraph/page changes) declared in
// ./plugin.d.ts alongside attachEditorEvent/detachEditorEvent. Self-contained: no cross-module imports.

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
    /** `isSelectionUse` - defines if the selection is used or not. */
    onClick: [isSelectionUse: boolean];
    /** Payload shape is not documented consistently across editor versions. */
    onKeyDown: [event: unknown];
    /** `isEnabled` - whether the mouse or touchpad is enabled (true) or not (false). */
    onEnableMouseEvent: [isEnabled: boolean];
    /** `value` - the restrictions value. */
    onChangeRestrictions: [value: number];
};

type PluginEventName = keyof PluginEventMap | (string & {});
type PluginEventCallback<T = unknown> = (...args: T[]) => void;
type PluginEventHandler<K extends keyof PluginEventMap> = (...args: PluginEventMap[K]) => void;

/** Editor content events (paragraph/page changes) - a distinct registry from PluginEventName, which covers plugin-window-level events (theme, resize, ...) */
type PluginEditorEventName = 'onChangeCurrentPage' | 'onParagraphText' | 'onPargraphAdd' | 'onParagraphRemove' | string;

type PluginEditorEventCallback<T = unknown> = (...args: T[]) => void;

export type {
    ContextMenuShowEvent,
    PluginEventMap,
    PluginEventName,
    PluginEventCallback,
    PluginEventHandler,
    PluginEditorEventName,
    PluginEditorEventCallback,
};
