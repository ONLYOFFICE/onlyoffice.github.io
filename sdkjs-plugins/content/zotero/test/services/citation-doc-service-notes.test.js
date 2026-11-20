// Citations moved between the text, footnotes and endnotes. Two of these
// were regressions of 1.2.x: a citation in the text was doubled by Refresh
// in a notes style, and switching to an in-text style deleted whole notes
// with the user's text in them.
import { describe, expect, it } from "vitest";
import { CitationDocService } from "../../src/app/services/citation-doc-service.js";
import { installEditor, opsOf } from "../helpers/editor.js";

/** @param {string} id */
const field = (id) => ({
    FieldId: id,
    Content: "Citation " + id,
    Value: "ZOTERO_ITEM CSL_CITATION {\"citationID\":\"c" + id + "\"}",
});

const service = () => new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY");

describe("refreshing in a footnote style", () => {
    it("moves a citation in the text into a note of its own, taking it out first", async () => {
        const fields = [field("1"), field("2")];
        const editor = installEditor({ fields: fields, notes: { "1": null, "2": "footnotes" } });

        await service().convertNotesStyle(fields.map((f) => Object.assign({}, f)), "footnotes");

        // Taken out before the note is made: a note added over the
        // selection would follow it, and the citation would stay as well.
        expect(opsOf(editor.ops, "1")).toEqual(["removeSuperscript", "removeSelected", "addNote footnotes", "addField"]);
    });

    it("updates a citation already in a footnote where it is", async () => {
        const fields = [field("1"), field("2")];
        const editor = installEditor({ fields: fields, notes: { "1": null, "2": "footnotes" } });

        await service().convertNotesStyle(fields.map((f) => Object.assign({}, f)), "footnotes");

        expect(opsOf(editor.ops, "2")).not.toContain("removeSelected");
        expect(editor.ops).toContain("update [2]");
    });
});

describe("switching footnotes to endnotes", () => {
    it("remakes a note that holds only its citation", async () => {
        const fields = [field("1")];
        const editor = installEditor({ fields: fields, notes: { "1": "footnotes" }, alone: { "1": true } });

        await service().convertNotesStyle(fields.map((f) => Object.assign({}, f)), "endnotes");

        expect(opsOf(editor.ops, "1")).toEqual([
            "alone=true", "selectReference", "removeSuperscript", "removeSelected", "addNote endnotes", "addField",
        ]);
    });

    it("leaves a note that holds the user's text too", async () => {
        const fields = [field("1")];
        const editor = installEditor({ fields: fields, notes: { "1": "footnotes" }, alone: { "1": false } });

        await service().convertNotesStyle(fields.map((f) => Object.assign({}, f)), "endnotes");

        expect(opsOf(editor.ops, "1")).not.toContain("removeSelected");
        expect(editor.ops).toContain("update [1]");
    });
});

describe("switching to an in-text style", () => {
    it("brings a citation alone in its note into the text", async () => {
        const fields = [field("1")];
        const editor = installEditor({ fields: fields, notes: { "1": "footnotes" }, alone: { "1": true } });

        await service().convertNotesToText(fields.map((f) => Object.assign({}, f)));

        expect(opsOf(editor.ops, "1")).toEqual(["alone=true", "selectReference", "removeSuperscript", "removeSelected", "addField"]);
    });

    it("keeps a note with the user's text, updating the citation in it", async () => {
        const fields = [field("1"), field("2")];
        const editor = installEditor({
            fields: fields,
            notes: { "1": null, "2": "footnotes" },
            alone: { "2": false },
        });

        await service().convertNotesToText(fields.map((f) => Object.assign({}, f)));

        expect(opsOf(editor.ops, "2")).not.toContain("removeSelected");
        expect(editor.ops).toContain("update [2]");
        expect(opsOf(editor.ops, "1")).toEqual(["removeSuperscript", "removeSelected", "addField"]);
    });
});
