// The queue of requests to the Zotero web API: one at a time, the requests
// of an action the user waits on before those of a search.
import { afterEach, describe, expect, it, vi } from "vitest";
import { RateLimitedFetcher } from "../../src/app/zotero/zotero-api-fetcher.js";

const headers = { "Zotero-API-Version": "3", "Zotero-API-Key": "" };

/** Answers each request when told, recording the order they were sent in. */
function fakeServer() {
    /** @type {Array<string>} */
    const sent = [];
    /** @type {Array<() => void>} */
    const answers = [];
    vi.stubGlobal("fetch", (/** @type {URL} */ url) => {
        sent.push(url.pathname);
        return new Promise((resolve) => {
            answers.push(() => resolve(new Response("[]", { status: 200 })));
        });
    });
    return {
        sent,
        /** Answers the request being sent, once it is. */
        async answer() {
            await vi.waitFor(() => expect(answers.length).toBeGreaterThan(0));
            /** @type {() => void} */ (answers.shift())();
        },
    };
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("RateLimitedFetcher", () => {
    it("sends one request at a time, in the order they came", async () => {
        const server = fakeServer();
        const fetcher = new RateLimitedFetcher({ minInterval: 0 });
        const signal = new AbortController().signal;

        const first = fetcher.fetchWithRetry(new URL("https://api/search1"), headers, signal);
        const second = fetcher.fetchWithRetry(new URL("https://api/search2"), headers, signal);
        await server.answer();
        await server.answer();
        await Promise.all([first, second]);

        expect(server.sent).toEqual(["/search1", "/search2"]);
    });

    it("sends the request of an action before the searches waiting", async () => {
        const server = fakeServer();
        const fetcher = new RateLimitedFetcher({ minInterval: 0 });
        const signal = new AbortController().signal;

        const requests = [
            fetcher.fetchWithRetry(new URL("https://api/search1"), headers, signal),
            fetcher.fetchWithRetry(new URL("https://api/search2"), headers, signal),
            fetcher.fetchWithRetry(new URL("https://api/search3"), headers, signal),
        ];
        await vi.waitFor(() => expect(server.sent).toHaveLength(1));
        requests.push(fetcher.fetchWithRetry(new URL("https://api/insert"), headers));
        for (let i = 0; i < requests.length; i++) {
            await server.answer();
        }
        await Promise.all(requests);

        // The search being sent is not interrupted.
        expect(server.sent).toEqual(["/search1", "/insert", "/search2", "/search3"]);
    });
});
