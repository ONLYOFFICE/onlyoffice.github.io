// A field written by another program, read and written again by the
// plugin: whatever it says about its sources must come through unchanged.
import { describe, expect, it } from "vitest";
import { CSLCitation } from "../../src/app/csl/citation/index.js";
import { mendeleyCitation, zoteroWordCitation } from "../fixtures/fields.js";

/** @param {any} source */
function roundTrip(source) {
    CSLCitation.resetUsedIDs();
    const citation = new CSLCitation(source.citationID);
    citation.fillFromObject(JSON.parse(JSON.stringify(source)));
    return citation.toJSON();
}

const CITATION_ITEM_KEYS = ["id", "locator", "label", "prefix", "suffix", "suppress-author", "author-only", "uris"];

/** @param {any} citationItem */
const itemProperties = (citationItem) =>
    Object.fromEntries(
        CITATION_ITEM_KEYS.filter((key) => key in citationItem).map((key) => [key, citationItem[key]]),
    );

describe("a field of Zotero for Word", () => {
    const result = roundTrip(zoteroWordCitation);

    it("keeps the citation's id and properties", () => {
        expect(result.citationID).toBe(zoteroWordCitation.citationID);
        expect(result.properties).toEqual(zoteroWordCitation.properties);
    });

    it("keeps page, label, prefix, suffix, author left out and URIs", () => {
        expect(result.citationItems.map(itemProperties)).toEqual(
            zoteroWordCitation.citationItems.map(itemProperties),
        );
    });

    it("keeps the data of each source", () => {
        expect(result.citationItems.map((/** @type {any} */ i) => i.itemData)).toEqual(
            zoteroWordCitation.citationItems.map((i) => i.itemData),
        );
    });
});

describe("citation JSON with a manual override, as Mendeley writes it", () => {
    const result = roundTrip(mendeleyCitation);

    it("keeps the text the user wrote over the citation", () => {
        expect(result.manualOverride).toEqual(mendeleyCitation.manualOverride);
    });

    it("keeps the data of the source", () => {
        expect(result.citationItems[0].id).toBe(mendeleyCitation.citationItems[0].id);
        expect(result.citationItems[0].itemData).toEqual(mendeleyCitation.citationItems[0].itemData);
    });
});

it("keeps the order of sources set by hand", () => {
    const unsorted = Object.assign({}, zoteroWordCitation, {
        properties: Object.assign({}, zoteroWordCitation.properties, { unsorted: true }),
    });
    expect(roundTrip(unsorted).properties.unsorted).toBe(true);
});
