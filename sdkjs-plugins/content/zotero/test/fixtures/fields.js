// Citation field codes as other programs write them.

/** Zotero for Word: two sources, page, prefix, suffix, author left out. */
export const zoteroWordCitation = {
    citationID: "a1b2c3d4",
    properties: {
        formattedCitation: "(see Smith, 2020, p. 15; Doe, 2019, ch. 2, with notes)",
        plainCitation: "(see Smith, 2020, p. 15; Doe, 2019, ch. 2, with notes)",
        noteIndex: 0,
    },
    citationItems: [
        {
            id: 1234,
            uris: ["http://zotero.org/users/5555/items/SMITHKEY"],
            itemData: {
                id: 1234,
                type: "article-journal",
                title: "A Study",
                "container-title": "Journal of Studies",
                volume: "12",
                page: "10-20",
                author: [{ family: "Smith", given: "Jane" }],
                issued: { "date-parts": [["2020"]] },
            },
            locator: "15",
            label: "page",
            prefix: "see",
        },
        {
            id: 5678,
            uris: ["http://zotero.org/groups/77/items/DOEKEY"],
            itemData: {
                id: 5678,
                type: "book",
                title: "A Book",
                publisher: "Press",
                author: [{ family: "Doe", given: "John" }],
                issued: { "date-parts": [["2019"]] },
            },
            locator: "2",
            label: "chapter",
            suffix: "with notes",
            "suppress-author": true,
        },
    ],
    schema: "https://github.com/citation-style-language/schema/raw/master/csl-citation.json",
};

/**
 * Citation JSON in the shape Mendeley Desktop writes: an item with its own
 * id scheme and a manual override. The plugin reads such JSON only inside a
 * Zotero field: Mendeley's own fields ("ADDIN CSL_CITATION") and Mendeley
 * Cite's content controls are not read at all.
 */
export const mendeleyCitation = {
    citationID: "MENDELEY_CITATION_0b3f",
    properties: { noteIndex: 0 },
    isEdited: false,
    manualOverride: {
        isManuallyOverridden: true,
        citeprocText: "(Roe, 2018)",
        manualOverrideText: "(Roe 2018, my words)",
    },
    citationItems: [
        {
            id: "4d1c9f2e-0000-3b1a-9e1d-5a6f7b8c9d0e",
            itemData: {
                type: "article-journal",
                id: "4d1c9f2e-0000-3b1a-9e1d-5a6f7b8c9d0e",
                title: "Mendeley Paper",
                author: [{ family: "Roe", given: "Richard", "parse-names": false, "dropping-particle": "", "non-dropping-particle": "" }],
                issued: { "date-parts": [[2018]] },
            },
            isTemporary: false,
        },
    ],
};
