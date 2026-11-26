// CitationService with real citeproc and styles, the document replaced.
// Each case was a regression of 1.2.x against 1.1.0.
import { describe, expect, it, vi } from "vitest";
import {
    bibliographyField,
    citationField,
    citationOf,
    item,
    makeService,
} from "../helpers/citation-service.js";
import { zoteroWordCitation } from "../fixtures/fields.js";

const alpha = item("ALPHA", { author: [{ family: "Alpha", given: "A." }], title: "First Book" });
const beta = item("BETA", { author: [{ family: "Beta", given: "B." }], title: "Second Book" });
const gamma = item("GAMMA", { author: [{ family: "Gamma", given: "C." }], title: "Third Book" });

describe("bibliography", () => {
    it("keeps a URL a style puts in angle brackets", async () => {
        // As ISO-690 (numeric, Slovenčina) does: "Dostupné na internete: <URL>."
        const page = item("PAGE", {
            type: "webpage",
            author: [{ family: "Wruck", given: "W." }],
            title: "Data management strategies",
            URL: "https://academic.oup.com/bib/article-lookup/doi/10.1093/bib/bbs064",
        });
        const { service, doc } = makeService({
            styleId: "url-in-angle-brackets",
            format: "numeric",
            fields: [citationField("1", "c1", [page]), bibliographyField("9")],
        });

        await service.insertBibliography();

        const html = doc.written.find((field) => field.FieldId === "9").Content;
        const element = document.createElement("div");
        element.innerHTML = html;
        expect(element.textContent).toContain(
            "Available at: <https://academic.oup.com/bib/article-lookup/doi/10.1093/bib/bbs064>.",
        );
    });

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

    it("keeps the edits made with Zotero's bibliography editor in Word", async () => {
        const uri = (/** @type {string} */ key) => "http://zotero.org/users/1/items/" + key;
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [
                citationField("1", "c1", [alpha]),
                citationField("2", "c2", [beta]),
                bibliographyField("9", {
                    uncited: [[uri("DELTA")]],
                    omitted: [[uri("BETA")]],
                    custom: [[[uri("ALPHA")], "{\\rtf Alpha, A. {\\i Rewritten by hand}.}"]],
                }),
            ],
            zoteroItems: {
                DELTA: { id: "1/DELTA", type: "book", title: "Listed Without Citation", author: [{ family: "Delta", given: "D." }], issued: { "date-parts": [[2019]] } },
            },
        });

        await service.insertBibliography();

        const bibliography = doc.written.find((field) => field.FieldId === "9").Content;
        expect(bibliography).toContain("<i>Rewritten by hand</i>");
        expect(bibliography).not.toContain("First Book");
        expect(bibliography).not.toContain("Beta");
        expect(bibliography).toContain("Delta");
    });
    it("keeps those edits for citations an earlier version took from the web API", async () => {
        // Such a citation names its item only by the item's page on zotero.org.
        const page = (/** @type {Object} */ source) =>
            Object.assign({}, source, { uris: ["https://www.zotero.org/someone/items/" + source.id] });
        const uri = (/** @type {string} */ key) => "http://zotero.org/users/123/items/" + key;
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [
                citationField("1", "c1", [page(alpha)]),
                citationField("2", "c2", [page(beta)]),
                bibliographyField("9", {
                    uncited: [],
                    omitted: [[uri("BETA")]],
                    custom: [[[uri("ALPHA")], "CUSTOM <b>bold</b> end"]],
                }),
            ],
        });

        await service.insertBibliography();

        const bibliography = doc.written.find((field) => field.FieldId === "9").Content;
        expect(bibliography).toContain("CUSTOM <b>bold</b> end");
        expect(bibliography).not.toContain("First Book");
        expect(bibliography).not.toContain("Beta");
    });
});

describe("a document whose citations cannot be read", () => {
    it("keeps its bibliography rather than emptying it", async () => {
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [
                { FieldId: "1", Content: "(Alpha, 2020)", Value: "ZOTERO_ITEM CSL_CITATION {broken" },
                bibliographyField("9"),
            ],
        });

        await service.updateCslItems(false);

        expect(doc.written.find((field) => field.FieldId === "9")).toBeUndefined();
    });

    it("empties the bibliography of a document with no citations", async () => {
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [bibliographyField("9")],
        });

        await service.updateCslItems(false);

        expect(doc.written.find((field) => field.FieldId === "9")).toBeDefined();
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
    it("rewrites a field of Zotero for Word without losing what it says", async () => {
        const word = zoteroWordCitation;
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [{
                FieldId: "1",
                Content: word.properties.plainCitation,
                Value: "ZOTERO_ITEM CSL_CITATION " + JSON.stringify(word),
            }],
        });

        await service.updateCslItems(false);

        const written = citationOf(doc.written[0]);
        expect(doc.written[0].Content).toContain("see Smith");
        expect(doc.written[0].Content).toContain("p. 15");
        expect(doc.written[0].Content).not.toContain("Doe");
        expect(written.citationItems.map((/** @type {any} */ i) => [i.locator, i.label, i.prefix, i.suffix, i["suppress-author"], i.uris])).toEqual(
            word.citationItems.map((i) => [i.locator, i.label, i.prefix, i.suffix, i["suppress-author"], i.uris]),
        );
    });

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

describe("refresh", () => {
    it("re-reads a source an earlier version took from the web API", async () => {
        // Such a citation names its item only by the item's page on zotero.org.
        const old = Object.assign({}, alpha, { uris: ["https://www.zotero.org/someone/items/ALPHA"] });
        const { service, doc } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [citationField("1", "c1", [old]), bibliographyField("9")],
            zoteroItems: {
                ALPHA: { id: "123/ALPHA", type: "book", title: "Renamed in Zotero", author: [{ family: "Alpha", given: "A." }], issued: { "date-parts": [[2020]] } },
            },
        });

        await service.updateCslItems(true, { refreshItems: true });

        const bibliography = doc.written.find((field) => field.FieldId === "9").Content;
        expect(bibliography).toContain("Renamed in Zotero");
        // Named now as Zotero in Word knows it.
        const citation = citationOf(doc.written.find((field) => field.FieldId === "1"));
        expect(citation.citationItems[0].uris).toContain("http://zotero.org/users/1/items/ALPHA");
    });
});

describe("speed", () => {
    it("formats all citations of a refresh in one pass of citeproc", async () => {
        // Rebuilt for each citation in turn, the work grew with the square
        // of their number: minutes for a few hundred notes.
        const fields = [];
        for (let i = 0; i < 30; i++) {
            fields.push(citationField(String(i + 1), "c" + i, [i % 2 ? alpha : beta]));
        }
        const { service, doc } = makeService({ styleId: "ieee", format: "numeric", fields });
        const rebuild = vi.spyOn(CSL.Engine.prototype, "rebuildProcessorState");

        await service.updateCslItems(true);

        expect(doc.written).toHaveLength(30);
        expect(rebuild).toHaveBeenCalledTimes(1);
        rebuild.mockRestore();
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
        const { preferences, stylesManager } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [],
            getStyle: repository,
            documentPrefs: prefs("chicago-author-date"),
        });

        const result = await preferences.load(/** @type {any} */ (stylesManager));

        expect(localStorage.getItem("zoteroStyleId")).toBe("chicago-author-date");
        expect(result.unavailableStyle).toBe(false);
    });

    it("keeps the user's style, and tells it, for one it cannot have", async () => {
        localStorage.setItem("zoteroStyleId", "apa");
        const { preferences, stylesManager } = makeService({
            styleId: "apa",
            format: "author-date",
            fields: [],
            getStyle: repository,
            documentPrefs: prefs("apa-modified"),
        });

        const result = await preferences.load(/** @type {any} */ (stylesManager));

        expect(localStorage.getItem("zoteroStyleId")).toBe("apa");
        // The caller shows the warning.
        expect(result.unavailableStyle).toBe(true);
        expect(window.__shownWindows).toHaveLength(0);
    });
});

describe("the citation edit window", () => {
    /**
     * A window that answers "Save" with `reply`: the edited data, or null
     * for none edited.
     * @param {any} reply
     */
    function windowReplying(reply) {
        window.Asc.PluginWindow = function () {
            /** @type {Object<string, Function>} */
            const events = {};
            this.show = () => {};
            this.close = () => {};
            this.attachEvent = (/** @type {string} */ name, /** @type {Function} */ fn) => (events[name] = fn);
            this.command = () => events.onSaveFields(reply);
        };
    }

    /** @param {number} buttonId */
    async function press(buttonId) {
        await vi.waitFor(() => expect(window.Asc.plugin.button).toBeTypeOf("function"));
        window.Asc.plugin.button(buttonId);
    }

    const added = { citationID: "c1", citationItems: [{ id: "ALPHA" }, { id: "BETA" }] };

    it("saves sources just added when nothing else is edited", async () => {
        windowReplying(null);
        const { service } = makeService({ styleId: "apa", format: "author-date", fields: [] });

        const shown = service.showEditCitationWindow(added, true);
        await press(0);

        expect(await shown).toBe(added);
    });

    it("saves nothing for a citation saved as it was", async () => {
        windowReplying(null);
        const { service } = makeService({ styleId: "apa", format: "author-date", fields: [] });

        const shown = service.showEditCitationWindow(added);
        await press(0);

        expect(await shown).toBe(null);
    });

    it("adds no source when cancelled", async () => {
        windowReplying(null);
        const { service } = makeService({ styleId: "apa", format: "author-date", fields: [] });

        const shown = service.showEditCitationWindow(added, true);
        await press(1);

        expect(await shown).toBe(null);
    });
});
