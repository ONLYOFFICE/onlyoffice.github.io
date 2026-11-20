// The user's groups. 1.2.x kept an empty list until the plugin restarted,
// so a group joined meanwhile was never searched; 1.1.0 asked again.
import { afterEach, expect, it, vi } from "vitest";
import { ZoteroSdk } from "../../src/app/zotero/zotero.js";

afterEach(() => {
    vi.unstubAllGlobals();
});

/** @param {Array<Array<Object>>} answers - what Zotero gives, call by call */
function zoteroAnswering(answers) {
    const fetch = vi.fn(async () => {
        const body = answers.length > 1 ? answers.shift() : answers[0];
        return new Response(JSON.stringify(body), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    });
    vi.stubGlobal("fetch", fetch);
    const sdk = new ZoteroSdk();
    sdk._userId = 1;
    sdk._apiKey = "test";
    sdk.setIsOnlineAvailable(true);
    return { sdk, fetch };
}

it("asks for the groups again while the user has none", async () => {
    const { sdk, fetch } = zoteroAnswering([[], [{ id: 7, data: { name: "Lab" } }]]);

    expect(await sdk.getUserGroups()).toEqual([]);
    expect(await sdk.getUserGroups()).toEqual([{ id: 7, name: "Lab" }]);
    expect(fetch).toHaveBeenCalledTimes(2);
});

it("keeps the groups once there are some", async () => {
    const { sdk, fetch } = zoteroAnswering([[{ id: 7, data: { name: "Lab" } }]]);

    await sdk.getUserGroups();
    await sdk.getUserGroups();
    expect(fetch).toHaveBeenCalledTimes(1);
});
