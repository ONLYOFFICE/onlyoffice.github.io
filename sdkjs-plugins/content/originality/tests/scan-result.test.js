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

const { ScanResult, ScanFindings } = loadScripts(
	["domain/scan-result", "domain/scan-findings"],
	["ScanResult", "ScanFindings"]);

// the shape of `POST /api/v3/scan`, cut down to what the plugin reads
const response = {
	results: {
		properties : { publicLink: "https://app.originality.ai/share/abc" },
		credits    : { used: 9 },
		ai         : {
			confidence : { AI: 0.95, Original: 0.05 },
			blocks     : [
				{ text: "First sentence. ", result: { fake: 0.9, real: 0.1 } },
				{ text: "Second sentence.", result: { fake: 0.2, real: 0.8 } },
			],
		},
		aiAllowance : { 15: { confidence: { AI: 0.03, Original: 0.97 }, blocks: [] } },
		plagiarism  : {
			score   : 50,
			results : [
				{ phrase: "First sentence.", results: [
					{ link: "https://example.com/a", title: "A", scores: [{ score: 1, sentence: "First sentence." }] },
					{ link: "javascript:alert(1)", title: "B", scores: [{ score: 1, sentence: "First sentence." }] },
				] },
				{ phrase: "Second sentence.", results: [
					{ link: "https://example.com/a", title: "A", scores: [{ score: 0.8, sentence: "Second one." }] },
				] },
			],
		},
		readability : { readability: { fleschReadingEase: 61.2, fleschGradeLevel: 8.1 }, text_stats: { sentenceCount: 2 } },
		facts       : { error: "not selected" },
	},
};

test("the AI score follows the requested allowance", () => {
	assert.strictEqual(ScanResult.fromResponse(response, null).ai.ai, 0.95);
	const allowed = ScanResult.fromResponse(response, 15).ai;
	assert.strictEqual(allowed.ai, 0.03);
	assert.strictEqual(allowed.allowance, 15);
	// an allowance the API did not answer for falls back to the plain score
	assert.strictEqual(ScanResult.fromResponse(response, 40).ai.allowance, null);
});

test("plagiarism is grouped by source, and only web pages become sources", () => {
	const plagiarism = ScanResult.fromResponse(response, null).plagiarism;
	assert.strictEqual(plagiarism.score, 50);
	assert.deepStrictEqual(plagiarism.sources.map((s) => [s.url, s.matches.length]), [["https://example.com/a", 2]]);
});

test("a feature that was not asked for is neither a result nor an error", () => {
	const result = ScanResult.fromResponse(response, null);
	assert.strictEqual(result.facts, null);
	assert.deepStrictEqual(result.errors, {});
	assert.deepStrictEqual(ScanResult.fromResponse({ results: { ai: { error: "quota" } } }, null).errors, { ai: "quota" });
});

test("readability, credits and the report link are read", () => {
	const result = ScanResult.fromResponse(response, null);
	assert.deepStrictEqual(result.readability, { fleschReadingEase: 61.2, fleschGradeLevel: 8.1, sentenceCount: 2 });
	assert.strictEqual(result.creditsUsed, 9);
	assert.strictEqual(result.publicLink, "https://app.originality.ai/share/abc");
	assert.strictEqual(ScanResult.fromResponse({ results: { properties: { publicLink: "removed" } } }, null).publicLink, null);
});

test("findings flag AI sentences and list each plagiarised phrase once", () => {
	const findings = ScanFindings.fromResult(ScanResult.fromResponse(response, null));
	assert.deepStrictEqual(findings.ai.map((f) => f.flagged), [true, false]);
	assert.deepStrictEqual(findings.plagiarism.map((f) => [f.text, f.sources.length]),
		[["First sentence.", 1], ["Second sentence.", 1]]);
	assert.strictEqual(findings.find(findings.ai[0].id), findings.ai[0]);
	assert.strictEqual(findings.find("missing"), null);
});
