// The Zotero plugin's document: citations in addin fields, written with the
// field codes of the Zotero plugin for Word.
import { describe, expect, it } from "vitest";
import { describeCitationDocument } from "@shared/document/citation-document.contract.js";
import { FieldCitationDocument } from "../../src/app/document/field-citation-document.js";
import { CitationDocService } from "../../src/app/services/citation-doc-service.js";

/**
 * A stand-in for CitationDocService over fields kept in memory; it writes the
 * field codes the way the service does.
 */
class FakeFields {
    constructor() {
        /** @type {Array<{FieldId: string, Value: string, Content: string}>} */
        this.fields = [];
        /** @type {Object<string, number>} */
        this.notes = {};
        this.nextId = 1;
        this.noteCount = 0;
        /** @type {string|null} */
        this.current = null;
    }
    #copy(/** @type {any} */ f) {
        return Object.assign({}, f);
    }
    #apply(/** @type {Array<any>} */ fields) {
        fields.forEach((f) => {
            const stored = this.fields.find((s) => s.FieldId === f.FieldId);
            if (!stored) throw new Error("no field " + f.FieldId);
            stored.Value = f.Value;
            if (Object.prototype.hasOwnProperty.call(f, "Content")) stored.Content = f.Content;
        });
        return fields.map((f) => f.FieldId);
    }
    getAddinZoteroFields() {
        return Promise.resolve(this.fields.map(this.#copy));
    }
    getNoteNumbers(/** @type {Array<any>} */ fields) {
        return Promise.resolve(fields.map((f) => this.notes[f.FieldId] || 0));
    }
    getCurrentField() {
        const f = this.fields.find((s) => s.FieldId === this.current);
        return Promise.resolve(f ? this.#copy(f) : null);
    }
    addCitation(/** @type {string} */ text, /** @type {string} */ value, /** @type {any} */ notesStyle) {
        const id = String(this.nextId++);
        this.fields.push({ FieldId: id, Value: "ZOTERO_ITEM CSL_CITATION " + value, Content: text });
        if (notesStyle) this.notes[id] = ++this.noteCount;
        this.current = id;
        return Promise.resolve(!!notesStyle);
    }
    addBibliography(/** @type {string} */ text, /** @type {string} */ value) {
        const id = String(this.nextId++);
        const code = ["ZOTERO_BIBL", value.trim(), "CSL_BIBLIOGRAPHY"].filter((p) => p !== "").join(" ");
        this.fields.push({ FieldId: id, Value: code, Content: text });
        this.current = id;
        return Promise.resolve(id);
    }
    updateAddinFields(/** @type {Array<any>} */ fields) {
        return Promise.resolve(this.#apply(fields));
    }
    convertTextToNotes(/** @type {Array<any>} */ fields) {
        this.#apply(fields).forEach((id) => (this.notes[id] = ++this.noteCount));
        return Promise.resolve();
    }
    convertNotesToText(/** @type {Array<any>} */ fields) {
        this.#apply(fields).forEach((id) => delete this.notes[id]);
        return Promise.resolve();
    }
    convertNotesStyle(/** @type {Array<any>} */ fields) {
        this.#apply(fields);
        return Promise.resolve();
    }
    moveCursorOutsideField() {
        this.current = null;
        return Promise.resolve();
    }
    saveAsText() {
        const had = this.fields.length > 0;
        this.fields = [];
        return Promise.resolve(had);
    }
}

describeCitationDocument("FieldCitationDocument", () => new FieldCitationDocument(/** @type {any} */ (new FakeFields())));

describe("FieldCitationDocument reading fields", () => {
    it("tells the note numbers, the old citations and the bibliography's data", async () => {
        const fake = new FakeFields();
        fake.fields = [
            { FieldId: "1", Value: 'ZOTERO_ITEM CSL_CITATION {"citationID":"a"}', Content: "(A)" },
            { FieldId: "2", Value: 'ZOTERO_CITATION {"citationID":"b"}', Content: "(B)" },
            { FieldId: "3", Value: 'ZOTERO_BIBL {"uncited":[["http://zotero.org/users/1/items/X"]]} CSL_BIBLIOGRAPHY', Content: "Bib" },
            { FieldId: "4", Value: "ZOTERO_ITEM CSL_CITATION {broken", Content: "(C)" },
        ];
        fake.notes = { "2": 3 };
        const doc = new FieldCitationDocument(/** @type {any} */ (fake));

        const { citations, bibliography } = await doc.readCitations();

        expect(citations.map((c) => [c.id, c.noteIndex, c.legacy])).toEqual([
            ["1", 0, false],
            ["2", 3, true],
            ["4", 0, false],
        ]);
        expect(citations[2].data).toBeNull();
        expect(bibliography && bibliography.data).toEqual({ uncited: [["http://zotero.org/users/1/items/X"]] });
    });

    it("gives a bibliography that stores nothing no data, and inserts it with an empty code", async () => {
        const fake = new FakeFields();
        const doc = new FieldCitationDocument(/** @type {any} */ (fake));

        await doc.insertBibliography("Bib", null);

        expect(fake.fields[0].Value).toBe("ZOTERO_BIBL CSL_BIBLIOGRAPHY");
        expect((await doc.readCitations()).bibliography).toEqual(
            expect.objectContaining({ data: null, text: "Bib" }),
        );
    });
});

describe("FieldCitationDocument over the editor", () => {
    /** Records what the plugin hands the editor's field methods. */
    function spyEditor(/** @type {Array<any>} */ fields) {
        /** @type {Array<{name: string, args: any}>} */
        const calls = [];
        window.Asc.plugin.executeMethod = (name, args, callback) => {
            calls.push({ name: name, args: JSON.parse(JSON.stringify(args === undefined ? null : args)) });
            /** @type {any} */
            let result;
            if (name === "GetAllAddinFields") result = JSON.parse(JSON.stringify(fields));
            if (name === "AddAddinField") result = args[0];
            setTimeout(() => callback && callback(result), 0);
            return true;
        };
        return calls;
    }
    const service = () =>
        new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY");
    const data = { citationID: "x", citationItems: [{ id: "K", uris: ["http://zotero.org/users/5/items/K"] }] };

    it("writes the field code of the Zotero plugin for Word for a new citation", async () => {
        const calls = spyEditor([]);

        await new FieldCitationDocument(service()).insertCitation("(K, 2020)", data, null);

        const add = calls.find((c) => c.name === "AddAddinField");
        expect(add && add.args[0].Value).toBe("ZOTERO_ITEM CSL_CITATION " + JSON.stringify(data));
        expect(add && add.args[0].Content).toBe("(K, 2020)");
    });

    it("rewrites the code and the text of a field, or the code alone", async () => {
        const stored = [
            { FieldId: "7", Value: 'ZOTERO_ITEM CSL_CITATION {"citationID":"x"}', Content: "(old)" },
            { FieldId: "8", Value: 'ZOTERO_ITEM CSL_CITATION {"citationID":"y"}', Content: "(edited)" },
        ];
        const doc = new FieldCitationDocument(service());
        spyEditor(stored);
        const [first, second] = (await doc.readCitations()).citations;
        const calls = spyEditor(stored);

        await doc.updateCitations([
            { citation: first, data: data, html: "(K, 2020)" },
            { citation: second, data: data, html: null },
        ]);

        const update = calls.find((c) => c.name === "UpdateAddinFields");
        expect(update && update.args[0]).toEqual([
            { FieldId: "7", Value: "ZOTERO_ITEM CSL_CITATION " + JSON.stringify(data), Content: "(K, 2020)" },
            { FieldId: "8", Value: "ZOTERO_ITEM CSL_CITATION " + JSON.stringify(data) },
        ]);
    });
});
