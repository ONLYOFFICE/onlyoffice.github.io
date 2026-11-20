// getStyle rejects a style it cannot have, so its callers can tell; the
// style of a document is checked this way before it is taken (see
// test/services/citation-service.test.js).
import { afterEach, describe, expect, it, vi } from "vitest";
import { CslStylesManager } from "../../src/app/csl/styles/styles-manager.js";

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

    it("rejects a style that is out of reach offline", async () => {
        const manager = new CslStylesManager("zoteroStyleId");
        manager.setRestApiAvailable(false);

        await expect(manager.getStyle("apa-modified", false)).rejects.toBeTruthy();
    });
});
