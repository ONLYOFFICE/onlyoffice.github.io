// The citations of the old Mendeley Desktop plugin, rewritten as Mendeley
// Cite's content controls.
import { describe, expect, it } from "vitest";
import { MendeleyDesktopFields } from "../src/app/document/mendeley-desktop-fields.js";

/**
 * A field as the old plugin wrote it.
 * @param {number} id
 * @param {string} json - the citation, or whatever the field holds instead
 */
const field = (id, json) => ({
    FieldId: String(id),
    Value: "ADDIN CSL_CITATION " + json,
    Content: "(Author " + id + ")",
});

/** @param {string} uuid */
const citation = (uuid) =>
    JSON.stringify({
        citationID: "c" + uuid,
        citationItems: [
            {
                id: "ITEM-1",
                uris: ["http://www.mendeley.com/documents/?uuid=" + uuid],
                itemData: { id: "ITEM-1", type: "book", title: "T" + uuid },
            },
        ],
        properties: { noteIndex: 0 },
    });

/** A stand-in for CitationDocService that records what it was asked to rewrite. */
const controls = () => {
    const rewritten = /** @type {Array<{field: any, newValue: string}>} */ ([]);
    return {
        rewritten: rewritten,
        upgradeCslItems(/** @type {any} */ info) {
            rewritten.push(...info);
            return Promise.resolve();
        },
    };
};

describe("the fields of Mendeley Desktop", () => {
    it("are rewritten but for those whose citation cannot be read", async () => {
        const fake = controls();
        const fields = new MendeleyDesktopFields(/** @type {any} */ (fake));

        const result = await fields.upgrade([
            field(1, citation("aaa")),
            field(2, '{"citationItems": [{"id": "ITEM-1",'),
            field(3, citation("bbb")),
        ]);

        expect(result.unreadable).toBe(1);
        expect(fake.rewritten.map((info) => info.field.FieldId)).toEqual(["1", "3"]);
        // The tag is the citation's JSON in base64; this one is all ASCII.
        const tag = fake.rewritten[1].newValue;
        const rewritten = JSON.parse(atob(tag.slice(tag.lastIndexOf("_") + 1)));
        expect(rewritten.citationItems[0].id).toBe("bbb");
        // The broken field does not take a number of its own.
        expect(rewritten.properties.noteIndex).toBe(2);
    });
});
