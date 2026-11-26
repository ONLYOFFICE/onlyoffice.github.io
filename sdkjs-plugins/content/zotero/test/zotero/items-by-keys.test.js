// The items a refresh reads again come with the URI Zotero names them by:
// earlier versions wrote the items of the web API with their page on
// zotero.org instead, which Zotero in Word does not know.
import { afterEach, expect, it, vi } from "vitest";
import { ZoteroSdk } from "../../src/app/zotero/zotero.js";

afterEach(() => {
    vi.unstubAllGlobals();
});

it("gives each item of the web API with its Zotero URI", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify([
        {
            key: "ALPHA",
            library: { type: "user", id: 123 },
            links: { alternate: { href: "https://www.zotero.org/someone/items/ALPHA" } },
            csljson: { id: "123/ALPHA", type: "book", title: "A Book" },
        },
    ]), { status: 200, headers: { "Content-Type": "application/json" } })));
    const sdk = new ZoteroSdk();
    sdk._userId = 123;
    sdk._apiKey = "test";
    sdk.setIsOnlineAvailable(true);

    const found = await sdk.getItemsByKeys(["ALPHA"], null, "csljson");

    expect(found).toEqual([{
        key: "ALPHA",
        data: { id: "123/ALPHA", type: "book", title: "A Book" },
        uri: "http://zotero.org/users/123/items/ALPHA",
    }]);
});
