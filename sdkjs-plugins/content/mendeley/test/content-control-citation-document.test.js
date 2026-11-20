// The Mendeley plugin's document: citations in content controls, tagged as
// Mendeley Cite for Word tags them.
import { describe, expect, it } from "vitest";
import { describeCitationDocument } from "@shared/document/citation-document.contract.js";
import { ContentControlCitationDocument } from "../src/app/document/content-control-citation-document.js";

/**
 * A stand-in for CitationDocService over controls kept in memory; it writes
 * text and tags the way the service does.
 */
class FakeControls {
    constructor() {
        /** @type {Array<{InternalId: string, Tag: string, PlaceHolderText: string}>} */
        this.controls = [];
        /** @type {Object<string, "footnotes"|"endnotes">} */
        this.notes = {};
        this.nextId = 1;
        /** @type {string|null} */
        this.current = null;
        /** @type {Array<string>} */
        this.tagsWritten = [];
    }
    #copy(/** @type {any} */ c) {
        return Object.assign({}, c);
    }
    #apply(/** @type {Array<any>} */ controls) {
        controls.forEach((c) => {
            const stored = this.controls.find((s) => s.InternalId === c.InternalId);
            if (!stored) throw new Error("no control " + c.InternalId);
            stored.Tag = c.Tag;
            this.tagsWritten.push(c.Tag);
            // An empty text leaves the one in the document.
            if (c.PlaceHolderText) stored.PlaceHolderText = c.PlaceHolderText;
        });
        return controls.map((c) => c.InternalId);
    }
    getAddinMendeleyControls() {
        return Promise.resolve(this.controls.map(this.#copy));
    }
    getFootnotesControls(/** @type {Array<string>} */ ids, /** @type {string} */ notesStyle) {
        return Promise.resolve(
            ids.map((id) => {
                const c = this.controls.find((s) => s.InternalId === id);
                return c && this.notes[id] === notesStyle ? c.PlaceHolderText : undefined;
            }),
        );
    }
    getCurrentContentControlPr() {
        const c = this.controls.find((s) => s.InternalId === this.current);
        return Promise.resolve(c ? this.#copy(c) : null);
    }
    addCitation(/** @type {string} */ text, /** @type {string} */ tag, /** @type {any} */ notesStyle) {
        const id = "1_" + this.nextId++;
        this.controls.push({ InternalId: id, Tag: tag, PlaceHolderText: text });
        this.tagsWritten.push(tag);
        if (notesStyle) this.notes[id] = notesStyle;
        this.current = id;
        return Promise.resolve(id);
    }
    addBibliography(/** @type {string} */ text) {
        const id = "1_" + this.nextId++;
        this.controls.push({ InternalId: id, Tag: "MENDELEY_BIBLIOGRAPHY", PlaceHolderText: text });
        this.current = id;
        return Promise.resolve(id);
    }
    updateContentControls(/** @type {Array<any>} */ controls) {
        return Promise.resolve(this.#apply(controls));
    }
    convertTextToNotes(/** @type {Array<any>} */ controls, /** @type {any} */ notesStyle) {
        this.#apply(controls).forEach((id) => (this.notes[id] = notesStyle));
        return Promise.resolve();
    }
    convertNotesToText(/** @type {Array<any>} */ controls) {
        this.#apply(controls).forEach((id) => delete this.notes[id]);
        return Promise.resolve();
    }
    convertNotesStyle(/** @type {Array<any>} */ controls, /** @type {any} */ notesStyle) {
        this.#apply(controls).forEach((id) => (this.notes[id] = notesStyle));
        return Promise.resolve();
    }
    moveCursorOutsideControl() {
        this.current = null;
        return Promise.resolve();
    }
    saveAsText() {
        this.controls = [];
        return Promise.resolve(undefined);
    }
}

describeCitationDocument("ContentControlCitationDocument", () =>
    new ContentControlCitationDocument(/** @type {any} */ (new FakeControls())),
);

// The tag of Mendeley Cite: MENDELEY_CITATION_v3_ and the citation's JSON as
// UTF-8 in base64, computed apart from the plugin.
const DATA = {
    citationID: "MENDELEY_CITATION_1",
    citationItems: [{ id: "u1", itemData: { title: "Ünïcödé — тест", type: "book" } }],
    properties: { noteIndex: 1 },
    manualOverride: { isManuallyOverridden: false, citeprocText: "(Müller, 2020)", manualOverrideText: "" },
};
const TAG =
    "MENDELEY_CITATION_v3_eyJjaXRhdGlvbklEIjoiTUVOREVMRVlfQ0lUQVRJT05fMSIsImNpdGF0aW9uSXRlbXMiOlt7ImlkIjoidTEiLCJpdGVtRGF0YSI6eyJ0aXRsZSI6IsOcbsOvY8O2ZMOpIOKAlCDRgtC10YHRgiIsInR5cGUiOiJib29rIn19XSwicHJvcGVydGllcyI6eyJub3RlSW5kZXgiOjF9LCJtYW51YWxPdmVycmlkZSI6eyJpc01hbnVhbGx5T3ZlcnJpZGRlbiI6ZmFsc2UsImNpdGVwcm9jVGV4dCI6IihNw7xsbGVyLCAyMDIwKSIsIm1hbnVhbE92ZXJyaWRlVGV4dCI6IiJ9fQ==";

describe("ContentControlCitationDocument tags", () => {
    it("writes the tag of Mendeley Cite", async () => {
        const fake = new FakeControls();

        await new ContentControlCitationDocument(/** @type {any} */ (fake)).insertCitation("(Müller, 2020)", DATA, null);

        expect(fake.tagsWritten).toEqual([TAG]);
    });

    it("reads the tag of Mendeley Cite", async () => {
        const fake = new FakeControls();
        fake.controls = [
            { InternalId: "1_1", Tag: TAG, PlaceHolderText: "(Müller, 2020)" },
            { InternalId: "1_2", Tag: "MENDELEY_CITATION_v3_not-base64!", PlaceHolderText: "(X)" },
            { InternalId: "1_3", Tag: "SOMETHING_ELSE", PlaceHolderText: "other" },
        ];

        const { citations } = await new ContentControlCitationDocument(/** @type {any} */ (fake)).readCitations();

        expect(citations.map((c) => c.data)).toEqual([DATA, null]);
        expect(citations.map((c) => c.noteIndex)).toEqual([null, null]);
    });

    it("writes an empty text to keep the one the user edited", async () => {
        const fake = new FakeControls();
        fake.controls = [{ InternalId: "1_1", Tag: TAG, PlaceHolderText: "(edited)" }];
        const doc = new ContentControlCitationDocument(/** @type {any} */ (fake));
        const [read] = (await doc.readCitations()).citations;
        /** @type {Array<any>} */
        let written = [];
        fake.updateContentControls = (controls) => {
            written = controls;
            return Promise.resolve([]);
        };

        await doc.updateCitations([{ citation: read, data: DATA, html: null }]);

        expect(written).toEqual([{ InternalId: "1_1", Tag: TAG, PlaceHolderText: "" }]);
    });
});
