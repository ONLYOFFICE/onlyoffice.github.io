// The keys of the cited items, read from a document that counts its readings.
import { afterEach, describe, expect, it, vi } from "vitest";
import { CitedItemKeys, collectItemKeys } from "./item-keys.js";

afterEach(() => {
    vi.useRealTimers();
});

/**
 * @param {Array<Array<string>>} citations - the ids of each citation's items
 */
function documentCiting(citations) {
    const doc = {
        readings: 0,
        /** @type {Promise<void> | null} */
        delay: null,
        async readCitationData() {
            doc.readings++;
            if (doc.delay) await doc.delay;
            return citations.map((ids) => ({ citationItems: ids.map((id) => ({ id: id })) }));
        },
    };
    return doc;
}

describe("collectItemKeys", () => {
    it("knows an item by its id and by the last part of its URIs", () => {
        expect(collectItemKeys({ id: "ABC", uris: ["http://zotero.org/users/1/items/XYZ"] })).toEqual(["ABC", "XYZ"]);
    });
});

describe("CitedItemKeys", () => {
    it("reads the keys of the cited items once for a while", async () => {
        const doc = documentCiting([["A1", "B2"], ["A1"]]);
        const cited = new CitedItemKeys(doc);

        expect(Array.from(await cited.read())).toEqual(["A1", "B2"]);
        await cited.read();

        expect(doc.readings).toBe(1);
        expect(Array.from(cited.known)).toEqual(["A1", "B2"]);
    });

    it("reads them again once told the document changed", async () => {
        const doc = documentCiting([["A1"]]);
        const cited = new CitedItemKeys(doc);
        await cited.read();

        cited.invalidate();
        await cited.read();

        expect(doc.readings).toBe(2);
    });

    it("reads them again after a while", async () => {
        vi.useFakeTimers();
        const doc = documentCiting([["A1"]]);
        const cited = new CitedItemKeys(doc, { ttl: 5000 });
        await cited.read();

        vi.advanceTimersByTime(5001);
        await cited.read();

        expect(doc.readings).toBe(2);
    });

    it("does not wait for a late reading, giving the keys read before", async () => {
        vi.useFakeTimers();
        const doc = documentCiting([["B2"]]);
        const cited = new CitedItemKeys(doc, { timeout: 1000 });
        /** @type {() => void} */
        let answer = () => {};
        doc.delay = new Promise((resolve) => (answer = resolve));

        const reading = cited.read();
        vi.advanceTimersByTime(1001);

        expect(Array.from(await reading)).toEqual([]);
        answer();
        await vi.waitFor(() => expect(Array.from(cited.known)).toEqual(["B2"]));
    });

    it("gives the late answer to the next search", async () => {
        vi.useFakeTimers();
        const doc = documentCiting([["B2"]]);
        const cited = new CitedItemKeys(doc, { timeout: 1000, ttl: 5000 });
        /** @type {() => void} */
        let answer = () => {};
        doc.delay = new Promise((resolve) => (answer = resolve));

        const reading = cited.read();
        vi.advanceTimersByTime(1001);
        await reading;
        answer();
        await vi.waitFor(() => expect(Array.from(cited.known)).toEqual(["B2"]));

        expect(Array.from(await cited.read())).toEqual(["B2"]);
        expect(doc.readings).toBe(1);
    });
});
