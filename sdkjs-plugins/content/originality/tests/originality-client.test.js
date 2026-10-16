/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

const test = require("node:test");
const assert = require("node:assert");
const { loadScripts } = require("./load-scripts");

const { OriginalityClient, OriginalityApiError } = loadScripts(
	["settings/settings-store", "service/originality-client"],
	["OriginalityClient", "OriginalityApiError"]);

const request = {
	title: "t", content: "text", checkAi: true, checkPlagiarism: true, checkReadability: false, checkFacts: false,
	aiModel: "standard", aiAllowance: 15, storeScan: true, excludedUrls: [],
};

/**
 * Runs a scan against a stand-in for the network.
 * @param {(url: string, init: RequestInit) => Promise<Response>} answer
 * @param {number} [elapsedMs] - how long the request seems to take
 * @returns {Promise<any>} the error the scan failed with
 */
async function failure(answer, elapsedMs) {
	const realFetch = globalThis.fetch;
	const realNow = Date.now;
	const start = realNow();
	let calls = 0;
	globalThis.fetch = (url, init) => {
		calls++;
		Date.now = () => start + (elapsedMs || 0);
		return answer(String(url), /** @type {RequestInit} */ (init));
	};
	try {
		await new OriginalityClient().scan("key", request);
		assert.fail("the scan should have failed");
	} catch (error) {
		assert.ok(error instanceof OriginalityApiError, String(error));
		assert.strictEqual(calls, 1, "a failed scan is not sent again");
		return error;
	} finally {
		globalThis.fetch = realFetch;
		Date.now = realNow;
	}
}

const json = (status, body) => new Response(JSON.stringify(body), { status: status, headers: { "Content-Type": "application/json" } });

test("an error the API answered with did not run the scan", async () => {
	const error = await failure(async () => json(422, { error: "Enterprise Subscription Required to use the Originality.ai API" }));
	assert.deepStrictEqual([error.status, error.message, error.mayHaveRun],
		[422, "Enterprise Subscription Required to use the Originality.ai API", false]);
});

test("a gateway error may have run the scan", async () => {
	for (const status of [502, 503, 504, 524]) {
		const error = await failure(async () => new Response("<html>Gateway Timeout</html>", { status: status }));
		assert.strictEqual(error.mayHaveRun, true, String(status));
	}
});

test("a connection that fails at once never got through", async () => {
	const error = await failure(async () => { throw new TypeError("Failed to fetch"); }, 300);
	assert.deepStrictEqual([error.status, error.message, error.mayHaveRun], [0, "Could not reach Originality.ai", false]);
});

test("a connection that fails after a long wait was lost while the API worked", async () => {
	const error = await failure(async () => { throw new TypeError("Failed to fetch"); }, 61000);
	assert.deepStrictEqual([error.status, error.message, error.mayHaveRun], [0, "Originality.ai did not answer in time", true]);
});

test("the plugin's own time limit may have cut a running scan short", async () => {
	const limit = OriginalityClient._timeoutMs;
	OriginalityClient._timeoutMs = 20;
	try {
		const error = await failure((url, init) => new Promise((resolve, reject) => {
			init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
		}));
		assert.deepStrictEqual([error.message, error.mayHaveRun], ["The request timed out", true]);
	} finally {
		OriginalityClient._timeoutMs = limit;
	}
});


test("a key with anything but printable Latin characters is refused before any request", async () => {
	assert.strictEqual(OriginalityClient.acceptsKey("0123abcdEF-_"), true);
	assert.strictEqual(OriginalityClient.acceptsKey("ключ"), false);
	assert.strictEqual(OriginalityClient.acceptsKey("abc def"), false);
	assert.strictEqual(OriginalityClient.acceptsKey(""), false);
	await assert.rejects(new OriginalityClient().getBalance("ключ"), (e) => e instanceof OriginalityApiError && e.status === 0 && !e.mayHaveRun);
});
