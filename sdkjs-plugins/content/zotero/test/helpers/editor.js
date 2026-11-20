// A stand-in for the editor under CitationDocService: it knows which note
// each field is in and whether the note holds anything else, and records
// what the plugin asks it to do, with the field selected at the time.
//
// It follows the editor as the plugin expects it to behave, read from
// sdkjs; it is not the editor. What it cannot tell - how sdkjs lays out a
// note added over a selection, say - needs a check in a real editor.

/**
 * @param {Object} document
 * @param {Array<{FieldId: string, Content: string, Value: string}>} document.fields
 * @param {Object<string, "footnotes"|"endnotes"|null>} document.notes - the
 *  kind of note each field is in, null in the text
 * @param {Object<string, boolean>} [document.alone] - whether a field's note
 *  holds nothing but it
 * @returns {{ops: Array<string>}}
 */
export function installEditor(document) {
    const editor = { ops: /** @type {Array<string>} */ ([]) };
    /** @type {string|null} */
    let selected = null;
    const notes = Object.assign({}, document.notes);
    const alone = Object.assign({}, document.alone);
    const record = (/** @type {string} */ op) => editor.ops.push(selected + ": " + op);

    window.Asc.plugin.callCommand = (fn, isClose, isCalc, callback) => {
        const code = String(fn);
        /** @type {any} */
        let result;
        if (code.includes("IsEndnote") && code.includes("IsFootnote")) {
            result = selected === null ? null : notes[selected] || null;
        } else if (code.includes("noteText")) {
            result = alone[/** @type {string} */ (selected)] !== false;
            record("alone=" + result);
        } else if (code.includes("SelectNoteReference")) {
            record("selectReference");
        } else if (code.includes("AddFootnote") || code.includes("AddEndnote")) {
            record("addNote " + window.Asc.scope.notesStyle);
        } else if (code.includes('SetVertAlign("baseline")')) {
            record("removeSuperscript");
        } else if (code.includes("SetVertAlign(unset)")) {
            record("clearFormatting");
        }
        setTimeout(() => callback && callback(result), 0);
    };

    window.Asc.plugin.executeMethod = (name, args, callback) => {
        /** @type {any} */
        let result;
        if (name === "SelectAddinField") {
            selected = args[0];
            result = true;
        } else if (name === "RemoveSelectedContent") {
            record("removeSelected");
        } else if (name === "AddAddinField") {
            record("addField");
            result = Object.assign({}, args[0]);
        } else if (name === "GetAllAddinFields") {
            result = JSON.parse(JSON.stringify(document.fields));
        } else if (name === "UpdateAddinFields") {
            editor.ops.push("update [" + args[0].map((/** @type {any} */ f) => f.FieldId).join(",") + "]");
        }
        setTimeout(() => callback && callback(result), 0);
        return true;
    };
    return editor;
}

/**
 * The calls made for one field, in order, without the field's id.
 * @param {Array<string>} ops
 * @param {string} fieldId
 */
export function opsOf(ops, fieldId) {
    return ops
        .filter((op) => op.startsWith(fieldId + ": "))
        .map((op) => op.slice(fieldId.length + 2));
}
