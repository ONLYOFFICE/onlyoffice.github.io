// What every CitationDocument has to do, whatever the editor keeps the
// citations in. Each plugin runs it on its own implementation over a stand-in
// for the editor:
//
//   describeCitationDocument("FieldCitationDocument", () => new FieldCitationDocument(new FakeFields()));
//
// The stand-in keeps the text it is given as the text of the element, so the
// citations here are plain text.
import { describe, expect, it } from "vitest";
import { CSLCitation } from "../csl/citation/index.js";

const SMITH = {
    citationID: "c1",
    citationItems: [{ id: "SMITH", itemData: { id: "SMITH", type: "book", title: "Ünïcödé — тест" } }],
    properties: { noteIndex: 0, plainCitation: "(Smith, 2020)" },
};
const BROWN = {
    citationID: "c2",
    citationItems: [{ id: "BROWN", itemData: { id: "BROWN", type: "book", title: "Brown" } }],
    properties: { noteIndex: 0, plainCitation: "(Brown, 2018)" },
};

/**
 * @param {string} name
 * @param {function(): import("./citation-document").CitationDocument} makeDocument
 *  a new document over an empty stand-in editor
 */
export function describeCitationDocument(name, makeDocument) {
    describe(name + " as a CitationDocument", () => {
        it("reads nothing from an empty document", async () => {
            const doc = makeDocument();

            expect(await doc.readCitations()).toEqual({ citations: [], bibliography: null });
        });

        it("reads back the citations it inserted, in order", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            await doc.insertCitation("(Brown, 2018)", BROWN, null);

            const { citations } = await doc.readCitations();

            expect(citations.map((c) => c.kind)).toEqual(["citation", "citation"]);
            expect(citations.map((c) => c.data)).toEqual([SMITH, BROWN]);
            expect(citations.map((c) => c.text)).toEqual(["(Smith, 2020)", "(Brown, 2018)"]);
            expect(citations.every((c) => typeof c.id === "string" && c.id !== "")).toBe(true);
            expect(citations.every((c) => c.legacy === false)).toBe(true);
        });

        it("reads the data of its citations without their text", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            await doc.insertCitation("(Brown, 2018)", BROWN, null);
            await doc.insertBibliography("Smith, J. (2020).", null);

            expect(await doc.readCitationData()).toEqual([SMITH, BROWN]);
        });

        it("tells a citation inserted into a note", async () => {
            const doc = makeDocument();

            expect((await doc.insertCitation("(Smith, 2020)", SMITH, "footnotes")).inNote).toBe(true);
            expect((await doc.insertCitation("(Brown, 2018)", BROWN, null)).inNote).toBe(false);
        });

        it("writes new data and text where a citation stands", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            const [read] = (await doc.readCitations()).citations;
            const data = Object.assign({}, SMITH, { properties: { noteIndex: 0, plainCitation: "Smith 2020" } });

            const ids = await doc.updateCitations([{ citation: read, data: data, html: "Smith 2020" }]);

            expect(ids).toContain(read.id);
            const [after] = (await doc.readCitations()).citations;
            expect(after.data).toEqual(data);
            expect(after.text).toBe("Smith 2020");
        });

        it("keeps the text in the document when told to, writing the data", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            const [read] = (await doc.readCitations()).citations;
            const data = Object.assign({}, SMITH, { citationID: "c1-kept" });

            await doc.updateCitations([{ citation: read, data: data, html: null }]);

            const [after] = (await doc.readCitations()).citations;
            expect(after.data).toEqual(data);
            expect(after.text).toBe("(Smith, 2020)");
        });

        it("inserts the bibliography and rewrites its text", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            await doc.insertBibliography("Smith, J. (2020).", null);

            const first = await doc.readCitations();
            expect(first.citations).toHaveLength(1);
            expect(first.bibliography && first.bibliography.kind).toBe("bibliography");
            expect(first.bibliography && first.bibliography.text).toBe("Smith, J. (2020).");

            await doc.updateCitations([], {
                bibliography: /** @type {any} */ (first.bibliography),
                html: "Smith, Jane. 2020.",
            });
            const second = await doc.readCitations();
            expect(second.bibliography && second.bibliography.text).toBe("Smith, Jane. 2020.");
        });

        it("tells the citation at the cursor", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);

            const current = await doc.getCurrent();

            expect(current && current.kind).toBe("citation");
            expect(current && current.data).toEqual(SMITH);
        });

        it("moves citations into notes and back, keeping their data", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);
            let [read] = (await doc.readCitations()).citations;

            await doc.convertTextToNotes([{ citation: read, data: SMITH, html: "Smith, Book." }], "footnotes");
            [read] = (await doc.readCitations("footnotes")).citations;
            expect(read.data).toEqual(SMITH);
            expect(read.text).toBe("Smith, Book.");

            await doc.convertNotesToText([{ citation: read, data: SMITH, html: "(Smith, 2020)" }]);
            [read] = (await doc.readCitations()).citations;
            expect(read.data).toEqual(SMITH);
            expect(read.text).toBe("(Smith, 2020)");
        });

        it("refuses to write a citation it did not read", async () => {
            const doc = makeDocument();
            /** @type {any} */
            const stranger = { kind: "citation", id: "1", data: SMITH, text: "", noteIndex: null, legacy: false };

            await expect(
                Promise.resolve().then(() => doc.updateCitations([{ citation: stranger, data: SMITH, html: "x" }])),
            ).rejects.toThrow();
        });

        it("records the text a citation was formatted to, and a manual edit", () => {
            const doc = makeDocument();
            const citation = new CSLCitation("c1");
            citation.fillFromObject(SMITH);

            doc.recordText(citation, "Smith, Book.", "(Smith, 2020)");
            // What a later update compares the document's text with.
            expect(citation.getPlainCitation()).toBe("Smith, Book.");
            expect(citation.getDoNotUpdate()).toBe(false);

            doc.recordManualEdit(citation, "Smith, Book.", "Smith, my edit.");
            expect(citation.getDoNotUpdate()).toBe(true);
        });

        it("gives up a manual edit, taking the edited text for the formatted one", () => {
            const doc = makeDocument();
            const citation = new CSLCitation("c1");
            citation.fillFromObject(SMITH);
            doc.recordManualEdit(citation, "Smith, Book.", "Smith, my edit.");

            doc.discardManualEdit(citation, "Smith, my edit.");
            expect(citation.getDoNotUpdate()).toBe(false);
            // So an update overwrites it without asking whether to keep it.
            expect(citation.getPlainCitation()).toBe("Smith, my edit.");
        });

        it("turns its citations into text", async () => {
            const doc = makeDocument();
            await doc.insertCitation("(Smith, 2020)", SMITH, null);

            expect(await doc.saveAsText()).toBe(true);
            expect((await doc.readCitations()).citations).toEqual([]);
        });
    });
}
