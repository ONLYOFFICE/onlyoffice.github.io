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

const { ScanService, ScanInputError } = loadScripts(["domain/scan-result", "app/scan-service"], ["ScanService", "ScanInputError"]);

/** @type {any} */ (globalThis).window = { Asc: { plugin: { info: { documentTitle: "Essay" } } } };

/**
 * @param {string} text - the document's text
 * @returns {{ service: any, sent: string[] }} a service over that text, and what it sends
 */
function serviceOver(text) {
	/** @type {string[]} */
	const sent = [];
	const reader = { readDocument: async () => text, readSelection: async () => text };
	const client = { scan: async (/** @type {string} */ key, /** @type {{ content: string }} */ request) => (sent.push(request.content), {}) };
	const settings = { load: () => ({ apiKey: "key", checkAi: true, checkPlagiarism: false, checkReadability: false, checkFacts: false,
		aiModel: "standard", aiAllowance: 0, storeScan: false, excludedUrls: [] }) };
	return { service: new ScanService(reader, client, settings), sent: sent };
}

const words = (/** @type {number} */ count) => Array.from({ length: count }, (_, i) => "w" + i).join(" \n");

test("a text under 100 words is not accepted", async () => {
	const { service } = serviceOver(words(99));
	await assert.rejects(service.read("document"), (e) => e instanceof ScanInputError && e.problem === "tooShort");
});

test("reading tells how long the text is, so the caller can ask before it is cut", async () => {
	const { service, sent } = serviceOver(words(ScanService.maxWords + 5));
	const text = await service.read("document");
	assert.strictEqual(text.words, ScanService.maxWords + 5);
	assert.strictEqual(sent.length, 0);
});

test("a text over the limit is sent cut to its first words, spacing kept", async () => {
	const { service, sent } = serviceOver(words(ScanService.maxWords + 5));
	await service.scan(await service.read("document"));
	assert.strictEqual(sent[0], words(ScanService.maxWords));
});

test("a text within the limit is sent whole", async () => {
	const { service, sent } = serviceOver(words(150));
	await service.scan(await service.read("selection"));
	assert.strictEqual(sent[0], words(150));
});
