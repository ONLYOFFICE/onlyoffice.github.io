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
