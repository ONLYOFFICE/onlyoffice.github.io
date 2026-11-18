// CitationService with real citeproc and styles, the document replaced.
// Each case was a regression of 1.2.x against 1.1.0.
import { describe, expect, it } from "vitest";
import {
    bibliographyField,
    citationField,
    citationOf,
    item,
    makeService,
} from "../helpers/citation-service.js";

const alpha = item("ALPHA", { author: [{ family: "Alpha", given: "A." }], title: "First Book" });
const beta = item("BETA", { author: [{ family: "Beta", given: "B." }], title: "Second Book" });
const gamma = item("GAMMA", { author: [{ family: "Gamma", given: "C." }], title: "Third Book" });

describe("bibliography", () => {
    it("lists a citation that came into the document since the last action", async () => {
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [citationField("1", "c1", [alpha]), bibliographyField("9")],
        });
        // An action of the plugin while only Alpha was cited.
        await service.updateCslItems(false);
        // Beta then came in by paste, or from a co-author.
        doc.fields = [
            citationField("1", "c1", [alpha]),
            citationField("2", "c2", [beta]),
            bibliographyField("9"),
        ];
        doc.written = [];

        await service.insertBibliography();

        const bibliography = doc.written.find((field) => field.FieldId === "9");
        expect(bibliography.Content).toContain("Alpha");
        expect(bibliography.Content).toContain("Beta");
    });
});

describe("note styles", () => {
    it("refers back to the note a source was first cited in", async () => {
        // Note 1 holds Beta and Gamma, note 2 Alpha, note 3 Beta, note 4
        // Alpha: counting citations would give Alpha's first note as 3.
        const { service, doc } = makeService({
            styleId: "supra-test",
            format: "note",
            fields: [
                citationField("1", "c1", [beta]),
                citationField("2", "c2", [gamma]),
                citationField("3", "c3", [alpha]),
                citationField("4", "c4", [beta]),
                citationField("5", "c5", [alpha]),
            ],
            noteNumbers: [1, 1, 2, 3, 4],
        });

        await service.updateCslItemsInNotes("footnotes");

        const text = Object.fromEntries(doc.written.map((field) => [field.FieldId, field.Content]));
        expect(text["4"]).toBe("Beta (n 1)");
        expect(text["5"]).toBe("Alpha (n 2)");
        expect(citationOf(doc.written.find((field) => field.FieldId === "5")).properties.noteIndex).toBe(4);
    });

    it("numbers citations in the text as the notes they are moved to", async () => {
        const { service, doc } = makeService({
            styleId: "supra-test",
            format: "note",
            fields: [
                citationField("1", "c1", [alpha]),
                citationField("2", "c2", [beta]),
                citationField("3", "c3", [alpha]),
            ],
            // Alpha in the text, Beta in note 1, Alpha again in the text.
            noteNumbers: [0, 1, 0],
        });

        await service.updateCslItemsInNotes("footnotes");

        const notes = doc.written.map((field) => citationOf(field).properties.noteIndex).sort();
        expect(notes).toEqual([1, 2, 3]);
        expect(doc.written.find((field) => field.FieldId === "3").Content).toBe("Alpha (n 1)");
    });
});

describe("inserting with the other citations not updated", () => {
    it("formats the new citation where it is in the document", async () => {
        // [1] and [2] are in the text; the new citation went between them.
        const { service, doc } = makeService({
            styleId: "ieee",
            format: "numeric",
            fields: [
                citationField("1", "c1", [alpha], "[1]"),
                citationField("9", "cNew", [gamma], "[3]"),
                citationField("2", "c2", [beta], "[2]"),
            ],
        });

        await service.updateCslItems(undefined, {
            skipCitations: true,
            insertedCitationID: "cNew",
        });

        expect(doc.written.map((field) => field.FieldId)).toEqual(["9"]);
        expect(doc.written[0].Content).toBe("[2]");
    });
});

describe("field data", () => {
    it("keeps the version and the abstract a style does not print", async () => {
        const program = item("PROG", {
            type: "software",
            title: "Toolkit",
            author: [{ family: "Coder", given: "C." }],
            version: "3.1",
            abstract: "A toolkit.",
        });
        const { service, doc } = makeService({
            styleId: "ieee",
            format: "numeric",
            fields: [citationField("1", "c1", [program])],
        });

        await service.updateCslItems(true);

        const itemData = citationOf(doc.written[0]).citationItems[0].itemData;
        expect(itemData.version).toBe("3.1");
        expect(itemData.abstract).toBe("A toolkit.");
    });
});

describe("styles", () => {
    it("formats with AMA, whose layout crashed the XML DOM path", async () => {
        const { service, doc } = makeService({
            styleId: "american-medical-association",
            format: "numeric",
            fields: [citationField("1", "c1", [alpha])],
        });

        await service.updateCslItems(true);

        expect(doc.written[0].Content).toMatch(/1/);
    });
});

describe("the style of a document from Word", () => {
    /** @param {string} styleId */
    const prefs = (styleId) =>
        '<data data-version="3" zotero-version="7.0.11"><session id="S"/>' +
        '<style id="http://www.zotero.org/styles/' + styleId + '" locale="en-US" hasBibliography="1" bibliographyStyleHasBeenSet="1"/>' +
        "<prefs/></data>";
    const repository = async (/** @type {string} */ id) => {
        if (id === "chicago-author-date") return { content: "<style/>" };
        throw "The style " + id + " was not found.";
    };

    it("takes a style it can have", async () => {
        localStorage.setItem("zoteroStyleId", "apa");
        const { service } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [],
            getStyle: repository,
            documentPrefs: prefs("chicago-author-date"),
        });

        await service.loadStyleFromDocument(/** @type {any} */ (service._cslStylesManager));

        expect(localStorage.getItem("zoteroStyleId")).toBe("chicago-author-date");
        expect(window.__shownWindows).toHaveLength(0);
    });

    it("keeps the user's style, and says so, for one it cannot have", async () => {
        localStorage.setItem("zoteroStyleId", "apa");
        const { service } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [],
            getStyle: repository,
            documentPrefs: prefs("apa-modified"),
        });

        await service.loadStyleFromDocument(/** @type {any} */ (service._cslStylesManager));

        expect(localStorage.getItem("zoteroStyleId")).toBe("apa");
        expect(window.__shownWindows).toHaveLength(1);
    });
});
