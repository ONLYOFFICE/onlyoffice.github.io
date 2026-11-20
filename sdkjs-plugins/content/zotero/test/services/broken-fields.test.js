// Fields whose code turned into plain text, as found by "Repair broken
// citations". The scan ran over the notes twice, so a citation in a note
// was repaired twice, and it never took a bibliography for one.
import { afterEach, expect, it } from "vitest";
import { CitationDocService } from "../../src/app/services/citation-doc-service.js";

afterEach(() => {
    delete globalThis.Api;
});

/** @param {Array<string>} texts */
const paragraphs = (texts) => texts.map((text) => ({ GetText: () => text }));

/**
 * The builder API of a document; GetAllParagraphs gives the paragraphs of
 * the notes too, as sdkjs does.
 * @param {{body: Array<string>, footnotes: Array<string>}} document
 */
function useDocument(document) {
    globalThis.Api = {
        GetDocument: () => ({
            GetAllParagraphs: () => paragraphs(document.body.concat(document.footnotes)),
            GetFootnotesFirstParagraphs: () => paragraphs(document.footnotes),
            GetEndNotesFirstParagraphs: () => [],
        }),
    };
    // The command runs here, against the API above.
    window.Asc.plugin.callCommand = (fn, isClose, isCalc, callback) => callback(fn());
}

const citationCode = 'ADDIN ZOTERO_ITEM CSL_CITATION {"citationID":"x","citationItems":[]}';
const bibliographyCode = 'ADDIN ZOTERO_BIBL {"uncited":[],"omitted":[],"custom":[]} CSL_BIBLIOGRAPHY';

it("finds a citation in a footnote once", async () => {
    useDocument({ body: ["Text."], footnotes: [citationCode] });

    const found = await new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY").scanForBrokenFields();

    expect(found).toHaveLength(1);
    expect(found[0].rawValue).toBe(citationCode);
});

it("finds a bibliography", async () => {
    useDocument({ body: [citationCode, bibliographyCode], footnotes: [] });

    const found = await new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY").scanForBrokenFields();

    expect(found.map((match) => match.rawValue)).toEqual([citationCode, bibliographyCode]);
});

it("leaves a paragraph that only mentions Zotero", async () => {
    useDocument({ body: ["ADDIN ZOTERO_ITEM is how Zotero marks a field {see the manual}, as here."], footnotes: [] });

    const found = await new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY").scanForBrokenFields();

    expect(found).toHaveLength(0);
});
