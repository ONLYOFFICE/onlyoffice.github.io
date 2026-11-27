// The Zotero plugin for Word finds an item by its zotero.org URI, built from
// the library the item was taken from.
import { expect, it } from "vitest";
import { zoteroItemUris } from "../../src/app/zotero/zotero-item-uris.js";

/** @param {Object<string, string>} props */
function itemData(props) {
    return { getCustomProperty: (/** @type {string} */ key) => props[key] || null };
}

it("builds the URI of an item of the user library", () => {
    expect(zoteroItemUris("ABCD", itemData({ userID: "123" }))).toEqual([
        "http://zotero.org/users/123/items/ABCD",
    ]);
});

it("builds the URI of an item of a group library", () => {
    expect(zoteroItemUris("ABCD", itemData({ groupID: "77" }))).toEqual([
        "http://zotero.org/groups/77/items/ABCD",
    ]);
});

it("gives an empty list without a library", () => {
    expect(zoteroItemUris("ABCD", itemData({}))).toEqual([]);
});
