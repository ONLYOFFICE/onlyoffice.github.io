// The URIs written with an item: its own portable ones, else whatever the
// plugin builds for it; a plugin that builds none writes none.
import { expect, it } from "vitest";
import { CitationItem } from "./citation-item.js";

it("writes no URIs for an item without any when the plugin builds none", () => {
    const item = new CitationItem("KEY1");

    expect(item.toJSON()).not.toHaveProperty("uris");
});

it("drops the URIs local to a machine and builds them instead", () => {
    CitationItem.setFallbackUris((id) => ["http://example.org/items/" + id]);
    const item = new CitationItem("KEY2");
    item.addUri("http://localhost:23119/api/users/0/items/KEY2");

    expect(item.toJSON().uris).toEqual(["http://example.org/items/KEY2"]);
});

it("keeps the item's own portable URIs", () => {
    CitationItem.setFallbackUris(() => ["http://example.org/unused"]);
    const item = new CitationItem("KEY3");
    item.addUri("http://www.mendeley.com/documents/?uuid=1234");

    expect(item.toJSON().uris).toEqual(["http://www.mendeley.com/documents/?uuid=1234"]);
});

// An item of the Zotero API in json format: its links are the API address
// and a page under the user's name, neither of them a Zotero URI.
const apiItem = (/** @type {any} */ library) => ({
    key: "KEY4",
    version: 3,
    library: library,
    links: {
        self: { href: "https://api.zotero.org/users/123/items/KEY4" },
        alternate: { href: "https://www.zotero.org/someone/items/KEY4" },
    },
    data: { key: "KEY4", itemType: "book", title: "A Book" },
});

it("names an item of the Zotero API by its Zotero URI, as Zotero in Word does", () => {
    const item = new CitationItem("KEY4");
    item.fillFromObject(apiItem({ type: "user", id: 123 }));

    expect(item.toJSON().uris[0]).toBe("http://zotero.org/users/123/items/KEY4");
});

it("names an item of a group library by the group's Zotero URI", () => {
    const item = new CitationItem("KEY4");
    item.fillFromObject(apiItem({ type: "group", id: 77 }));

    expect(item.toJSON().uris[0]).toBe("http://zotero.org/groups/77/items/KEY4");
});

it("builds no Zotero URI for a library without an id on zotero.org", () => {
    CitationItem.setFallbackUris(() => []);
    const item = new CitationItem("KEY4");
    item.fillFromObject(apiItem({ type: "user", id: 0 }));

    expect(item.toJSON().uris).toEqual(["https://www.zotero.org/someone/items/KEY4"]);
});
