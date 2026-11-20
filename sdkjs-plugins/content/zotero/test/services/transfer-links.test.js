// The links of a document Zotero converted for another word processor.
// The scan ran over the notes twice, so a citation in a note was found twice
// and its second import counted as a failure.
import { afterEach, expect, it } from "vitest";
import { CitationDocService } from "../../src/app/services/citation-doc-service.js";

afterEach(() => {
    delete globalThis.Api;
});

/** @param {Array<Array<string>>} texts - the links of each paragraph */
const paragraphs = (texts) =>
    texts.map((links) => ({
        GetElementsCount: () => links.length,
        GetElement: (/** @type {number} */ index) => ({
            GetClassType: () => "hyperlink",
            GetDisplayedText: () => links[index],
        }),
    }));

/**
 * The builder API of a document; GetAllParagraphs gives the paragraphs of
 * the notes too, as sdkjs does.
 * @param {{body: Array<Array<string>>, footnotes: Array<Array<string>>}} document
 */
function useDocument(document) {
    globalThis.Api = {
        GetDocument: () => ({
            GetAllParagraphs: () => paragraphs(document.body.concat(document.footnotes)),
            GetFootnotesFirstParagraphs: () => paragraphs(document.footnotes),
            GetEndNotesFirstParagraphs: () => [],
        }),
    };
    window.Asc.plugin.callCommand = (fn, isClose, isCalc, callback) => callback(fn());
}

const service = () => new CitationDocService("ZOTERO_ITEM", "CSL_CITATION", "ZOTERO_BIBL", "CSL_BIBLIOGRAPHY");

it("finds a link in a footnote once", async () => {
    useDocument({
        body: [["DOCUMENT_PREFERENCES <data/>"], ["ITEM CSL_CITATION {\"citationID\":\"a\"}"]],
        footnotes: [["ITEM CSL_CITATION {\"citationID\":\"b\"}"]],
    });

    const links = await service().findTransferLinks();

    expect(links.map((link) => link.text)).toEqual([
        "DOCUMENT_PREFERENCES <data/>",
        "ITEM CSL_CITATION {\"citationID\":\"a\"}",
        "ITEM CSL_CITATION {\"citationID\":\"b\"}",
    ]);
});

it("leaves links that are not Zotero's", async () => {
    useDocument({ body: [["https://example.com"]], footnotes: [] });

    expect(await service().findTransferLinks()).toEqual([]);
});
