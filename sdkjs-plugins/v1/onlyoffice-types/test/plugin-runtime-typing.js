// @ts-check
/// <reference path="../index.d.ts" />

/**
 * Locks in the typing rules for the plugin runtime API that no other test covers, in both
 * directions: the `@ts-expect-error` lines fail the build if the error they expect ever stops being
 * reported, so a regression that loosens `callCommand` back to `any` breaks here instead of shipping.
 *
 * The rule under test: a `callCommand` body runs in the editor's own process, and the editor
 * filters its return value through `Asc.checkReturnCommand`, replacing anything carrying methods
 * with `undefined`. That silent data loss must be a compile error.
 *
 * The object-model values below come from explicitly annotated locals rather than the global `Api`.
 * This file is editor-agnostic - it tests the plugin runtime, not one editor's object model - so it
 * lives in the shared program, which deliberately has no editor entry point and therefore no global
 * `Api`. Per-editor `Api` typing is asserted in `<editor>-api-global.js` instead.
 */

/** @type {import("../src/generated/word").Word.ApiDocument} */
let doc;
/** @type {import("../src/generated/word").Word.ApiParagraph[]} */
let paragraphs;

// ============================================================================
// callCommand - values that must be accepted
// ============================================================================

// No return value at all.
window.Asc.plugin.callCommand(function () {
    doc.InsertContent([]);
});

// A primitive, with the callback parameter inferred (not `any`).
window.Asc.plugin.callCommand(
    function () {
        return paragraphs.length;
    },
    false,
    true,
    function (count) {
        /** @type {number} */
        const typed = count;
        console.log(typed.toFixed(0));
    },
);

// A plain object, an array, and a nested combination of both.
window.Asc.plugin.callCommand(function () {
    return { text: paragraphs[0].GetText(), index: 0 };
});
window.Asc.plugin.callCommand(function () {
    return paragraphs.map(function (p) {
        return { text: p.GetText(), tags: ["a", "b"] };
    });
});

// ============================================================================
// callCommand - values the process boundary would silently drop
// ============================================================================

// @ts-expect-error an Api object cannot cross the process boundary - it arrives as `undefined`
window.Asc.plugin.callCommand(function () {
    return doc;
});

// @ts-expect-error ...nor inside an array
window.Asc.plugin.callCommand(function () {
    return paragraphs;
});

// @ts-expect-error ...nor nested in a plain object
window.Asc.plugin.callCommand(function () {
    return { document: doc, ok: true };
});

// @ts-expect-error ...and neither can a bare function
window.Asc.plugin.callCommand(function () {
    return function () {};
});

// ============================================================================
// Async variants
// ============================================================================

async function asyncUsage() {
    /** @type {number} */
    const count = await window.Asc.plugin.callCommandAsync(function () {
        return paragraphs.length;
    });

    /** @type {string} */
    const selected = await window.Asc.plugin.callMethodAsync("GetSelectedText");

    console.log(count, selected);
}

// ============================================================================
// Members that exist in the runtime and were previously undeclared
// ============================================================================

window.Asc.plugin.loadModule("./snippet.js", function (source) {
    console.log(source.length);
});

window.Asc.plugin.callModule("./command.js", function (source) {
    console.log(source.length);
}, false);

window.Asc.plugin.createInputHelper();
const helper = window.Asc.plugin.getInputHelper();
helper.setItems([{ text: "first" }, { id: "2", text: "second" }]);
helper.show(200, 100, true);
const sizes = helper.getScrollSizes();
console.log(sizes.w + sizes.h);
helper.unShow();

window.Asc.plugin.inputHelper_onSelectItem = function (item) {
    console.log(item.text);
};

void asyncUsage;
