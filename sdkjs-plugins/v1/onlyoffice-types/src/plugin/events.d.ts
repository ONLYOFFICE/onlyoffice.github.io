// Plugin-window-level events (Asc.plugin.attachEvent/onContextMenuShow/onWindowResize/...) - a
// distinct registry from the per-editor content events (paragraph/page changes) declared in
// ./plugin.d.ts alongside attachEditorEvent/detachEditorEvent.

// A handful of Word-only events reuse ContentControl/comment/TextAnnotation/TextAnnotationRange -
// the same shapes `executeMethod`'s Word surface already models (with real-example-verified
// optionality) - rather than duplicating them by hand and letting the copies drift.
import type { ContentControl, comment, TextAnnotation, TextAnnotationRange } from "../generated/word-methods";

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

    // Word only (per sdkjs/word/plugin-events.js's own `@typeofeditors ["CDE"]`) - firing an
    // attachEvent for one of these outside Word is not documented and won't happen in practice.
    /** Word only. Fired when a comment is added via `AddComment`. */
    onAddComment: [comment: comment];
    /** Word only. Fired when a comment is changed via `ChangeComment`. */
    onChangeCommentData: [comment: comment];
    /** Word only. Fired when the current page changes. `index` is the newly activated page. */
    onChangeCurrentPage: [index: number];
    /** Word only. Fired when a comment is removed via `RemoveComments`. */
    onRemoveComment: [comment: comment];
    /** Word only. Fired when the user clicks the "Complete & Submit" button on a form. */
    onSubmitForm: [];
    /** Word only. Fired when a content control receives focus. */
    onFocusContentControl: [control: ContentControl];
    /** Word only. Fired when a content control loses focus. */
    onBlurContentControl: [control: ContentControl];
    /** Word only. Fired when a content control changes. */
    onChangeContentControl: [control: ContentControl];
    /** Word only. Fired with the IDs of content control(s) that lost focus tracking in the document. */
    onHideContentControlTrack: [ids: string[]];
    /** Word only. Fired with the IDs of content control(s) that gained focus tracking in the document. */
    onShowContentControlTrack: [ids: string[]];
    /** Word only. Fired when one or more OLE objects are inserted into the document. */
    onInsertOleObjects: [data: object[]];
    /** Word only. Fired when a text annotation (e.g. a grammar/spellcheck range) loses focus. Since 9.2.0. */
    onBlurAnnotation: [annotation: TextAnnotation];
    /** Word only. Fired when a text annotation receives focus. Since 9.2.0. */
    onFocusAnnotation: [annotation: TextAnnotation];
    /** Word only. Fired when the user clicks a text annotation. Since 9.2.0. */
    onClickAnnotation: [annotation: TextAnnotation];
    /** Word only. Fired when a paragraph's text is updated in the document. Since 9.2.0. */
    onParagraphText: [data: { paragraphId: string; recalcId: string; text: string; annotations: TextAnnotationRange[] }];

    // Cell only.
    /** Cell only. Fired when the current worksheet changes. `index` is the newly activated sheet. */
    onChangeCurrentSheet: [index: number];

    // Slide only.
    /** Slide only. Fired when the current slide changes. `index` is the newly activated slide. */
    onChangeCurrentSlide: [index: number];
    /** Slide only. Fired when a slide show presentation starts. */
    onSlideShowBegin: [];
    /** Slide only. Fired when a slide show presentation ends. */
    onSlideShowEnd: [];
    /** Slide only. Fired after the slide changes during a slide show, before its content is displayed. */
    onSlideShowNextSlide: [];
    /** Slide only. Fired when the slide changes during a slide show, with the current and previous indices (`previousSlideIndex` is `-1` for the first slide). */
    onSlideShowSlideChanged: [data: { slideIndex: number; previousSlideIndex: number }];

    // Pdf only.
    /** Pdf only. Fired when a text selection ends, at the page and point where it ended. */
    onSelectionEnd: [page: number, x: number, y: number];
    /** Pdf only. Fired when a text selection is canceled. */
    onSelectionCancel: [];
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
