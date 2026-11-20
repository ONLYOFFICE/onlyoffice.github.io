// An inserted item is read twice: from Zotero's CSL copy, then from its
// json copy merged over it. The json copy must not spoil what the CSL copy
// says - each case here was a regression of 1.2.x against 1.1.0.
import { describe, expect, it } from "vitest";
import { CitationItemData } from "../../src/app/csl/citation/citation-item-data.js";

/** @param {...Object} copies - CSL, then json data, as the plugin reads them */
function read(...copies) {
    const itemData = new CitationItemData("X");
    copies.forEach((copy) => itemData.fillFromObject(copy));
    return itemData.toJSON();
}

describe("date", () => {
    it("keeps the date of the CSL copy over a month/year one in json", () => {
        const result = read(
            { type: "report", issued: { "date-parts": [[2022, 11]] } },
            { itemType: "report", date: "11/2022" },
        );
        expect(result.issued).toEqual({ "date-parts": [[2022, 11]] });
    });

    it("does not read 11/2022 as the year 11", () => {
        const result = read({ itemType: "report", date: "11/2022" });
        expect(result.issued).toBeUndefined();
    });

    it("reads an ISO date from json when there is no other", () => {
        const result = read({ itemType: "book", date: "2023-05-04" });
        expect(result.issued).toEqual({ "date-parts": [[2023, 5, 4]] });
    });
});

describe("type", () => {
    it("keeps the type of the CSL copy over the json item type", () => {
        expect(read({ type: "article" }, { itemType: "preprint" }).type).toBe("article");
        expect(read({ type: "broadcast" }, { itemType: "podcast" }).type).toBe("broadcast");
        // "Type: article-journal" in Extra: Zotero's CSL copy follows it.
        const overridden = read(
            { type: "article-journal" },
            { itemType: "preprint", extra: "Type: article-journal" },
        );
        expect(overridden.type).toBe("article-journal");
    });

    it.each([
        ["preprint", "article"],
        ["podcast", "broadcast"],
        ["encyclopediaArticle", "entry-encyclopedia"],
        ["dataset", "dataset"],
        ["standard", "standard"],
    ])("maps the json item type %s to %s as Zotero does", (itemType, cslType) => {
        expect(read({ itemType: itemType }).type).toBe(cslType);
    });
});

describe("creators", () => {
    it("does not add the main creator again in another role", () => {
        const result = read(
            { type: "song", author: [{ family: "Davis", given: "Miles" }] },
            {
                itemType: "audioRecording",
                creators: [{ creatorType: "performer", firstName: "Miles", lastName: "Davis" }],
            },
        );
        expect(result.author).toEqual([{ family: "Davis", given: "Miles" }]);
        expect(result.performer).toBeUndefined();
    });

    it("does not repeat a name with a particle", () => {
        const result = read(
            {
                type: "book",
                editor: [
                    { family: "Dijk", given: "J.", "non-dropping-particle": "van" },
                    { family: "Smith", given: "J." },
                ],
            },
            {
                itemType: "book",
                creators: [
                    { creatorType: "editor", firstName: "J.", lastName: "van Dijk" },
                    { creatorType: "editor", firstName: "J.", lastName: "Smith" },
                ],
            },
        );
        expect(result.editor).toHaveLength(2);
    });

    it("takes the json creators when the CSL copy has none", () => {
        const result = read({
            itemType: "book",
            creators: [{ creatorType: "author", firstName: "Ada", lastName: "Lovelace" }],
        });
        expect(result.author).toEqual([{ given: "Ada", family: "Lovelace" }]);
    });
});

describe("version", () => {
    it("keeps the version of the work from CSL", () => {
        expect(read({ type: "software", version: "2.0" }).version).toBe("2.0");
    });

    it("takes versionNumber from json, not its sync version", () => {
        const fromJsonOnly = read({ itemType: "computerProgram", version: 4521, versionNumber: "3.1" });
        expect(fromJsonOnly.version).toBe("3.1");

        const merged = read(
            { type: "software", version: "2.0" },
            { itemType: "computerProgram", version: 4521, versionNumber: "2.0" },
        );
        expect(merged.version).toBe("2.0");
    });

    it("drops the sync version earlier versions stored in fields", () => {
        expect(read({ type: "software", version: 4521 }).version).toBeUndefined();
    });
});

describe("abstract", () => {
    it("keeps the abstract", () => {
        expect(read({ type: "book", abstract: "About it." }).abstract).toBe("About it.");
        expect(read({ itemType: "book", abstractNote: "About it." }).abstract).toBe("About it.");
    });
});
