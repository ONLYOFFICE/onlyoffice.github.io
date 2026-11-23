// getStyle rejects a style it cannot have, so its callers can tell; the
// style of a document is checked this way before it is taken (see
// test/services/citation-service.test.js).
import { afterEach, describe, expect, it, vi } from "vitest";
import { CslStylesManager } from "./styles-manager.js";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("getStyle", () => {
    it("rejects a style the repository does not have", async () => {
        vi.stubGlobal("fetch", async () => new Response("<html>Not Found</html>", { status: 404 }));
        const manager = new CslStylesManager("zoteroStyleId");
        manager.setRestApiAvailable(true);

        await expect(manager.getStyle("apa-modified", false)).rejects.toBeTruthy();
    });

    it("takes a bundled style from the plugin when the repository is out of reach", async () => {
        const csl = '<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text"><info><category citation-format="author-date"/></info></style>';
        /** @type {Array<string>} */
        const urls = [];
        vi.stubGlobal("fetch", async (/** @type {string} */ url) => {
            urls.push(url);
            if (url.indexOf("https://") === 0) throw new TypeError("Failed to fetch");
            return new Response(csl, { status: 200 });
        });
        const manager = new CslStylesManager("zoteroStyleId");
        manager.setRestApiAvailable(true);

        const style = await manager.getStyle("apa", false);

        expect(style.content).toBe(csl);
        expect(urls).toEqual(["https://www.zotero.org/styles/apa", "./resources/csl/styles/apa.csl"]);
    });

    it("does not look in the plugin for a style it does not ship", async () => {
        /** @type {Array<string>} */
        const urls = [];
        vi.stubGlobal("fetch", async (/** @type {string} */ url) => {
            urls.push(url);
            throw new TypeError("Failed to fetch");
        });
        const manager = new CslStylesManager("zoteroStyleId");
        manager.setRestApiAvailable(true);

        await expect(manager.getStyle("apa-modified", false)).rejects.toBeTruthy();
        expect(urls).toEqual(["https://www.zotero.org/styles/apa-modified"]);
    });

    it("rejects a style that is out of reach offline", async () => {
        const manager = new CslStylesManager("zoteroStyleId");
        manager.setRestApiAvailable(false);

        await expect(manager.getStyle("apa-modified", false)).rejects.toBeTruthy();
    });
});
