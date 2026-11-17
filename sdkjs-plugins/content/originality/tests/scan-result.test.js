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

const all = ["ai", "plagiarism", "readability", "facts"];

// the shape of `POST /api/v3/scan` with the 5.0 models, as the API documentation shows it, cut down
// to what the plugin reads
const response = {
	results: {
		properties : { publicLink: "https://app.originality.ai/share/abc" },
		credits    : { used: 9 },
		ai         : {
			model               : "model-5.0",
			prediction_label    : "human",
			ai_assisted_percent : 35,
			sentences           : [
				{ start_index: 0, end_index: 16, text: "First sentence. ", ai_score: 0.9 },
				{ start_index: 16, end_index: 32, text: "Second sentence." },
			],
		},
		plagiarism : {
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
		facts       : { 0: {
			claim          : "Water boils at 100 °C at sea level.",
			classification : "True",
			confidence     : 0.72,
			explanation    : "At standard pressure.",
			sources        : [
				{ title: "Boiling point", url: "https://example.com/boiling", date: "2026-01-01" },
				{ title: "Not a page", url: "file:///etc/passwd" },
			],
			rewrite        : null,
		} },
		aiAllowance : { error: "not selected" },
	},
};

test("the AI share is read from the 5.0 answer, with a score for each sentence", () => {
	const ai = ScanResult.fromResponse(response, all).ai;
	assert.strictEqual(ai.ai, 0.35);
	assert.strictEqual(ai.original, 0.65);
	assert.strictEqual(ai.verdict, "mixed");
	assert.strictEqual(ai.model, "model-5.0");
	// a sentence without a score is taken as human
	assert.deepStrictEqual(ai.blocks.map((b) => b.ai), [0.9, 0]);
});

test("the verdict follows Originality's bands: under 10% original, over 80% AI", () => {
	assert.strictEqual(ScanResult.verdictOf(0.09), "original");
	assert.strictEqual(ScanResult.verdictOf(0.1), "mixed");
	assert.strictEqual(ScanResult.verdictOf(0.8), "mixed");
	assert.strictEqual(ScanResult.verdictOf(0.81), "ai");
});

test("plagiarism is grouped by source, and only web pages become sources", () => {
	const plagiarism = ScanResult.fromResponse(response, all).plagiarism;
	assert.strictEqual(plagiarism.score, 50);
	assert.deepStrictEqual(plagiarism.sources.map((s) => [s.url, s.matches.length]), [["https://example.com/a", 2]]);
});

test("fact checks are read from the numbered list, with web sources only", () => {
	const facts = ScanResult.fromResponse(response, all).facts;
	assert.deepStrictEqual(facts, [{
		claim          : "Water boils at 100 °C at sea level.",
		classification : "True",
		confidence     : 0.72,
		explanation    : "At standard pressure.",
		sources        : [{ title: "Boiling point", url: "https://example.com/boiling" }],
	}]);
	assert.strictEqual(ScanResult.fromResponse({ results: { facts: [] } }, ["facts"]).facts.length, 0);
});

test("a check that was not asked for is neither a result nor an error", () => {
	const result = ScanResult.fromResponse({ results: { facts: { error: "not selected" } } }, []);
	assert.strictEqual(result.facts, null);
	assert.deepStrictEqual(result.errors, {});
	assert.deepStrictEqual(ScanResult.fromResponse({ results: { ai: { error: "quota" } } }, ["ai"]).errors, { ai: "quota" });
});

test("a requested check the answer says nothing readable about is reported, not left blank", () => {
	// the answer of a model before 5.0: no share of AI the plugin can read
	const old = { results: { ai: { confidence: { AI: 0.95, Original: 0.05 } }, plagiarism: {} } };
	const result = ScanResult.fromResponse(old, ["ai", "plagiarism", "readability"]);
	assert.strictEqual(result.ai, null);
	assert.deepStrictEqual(result.errors, {
		ai          : ScanResult.unreadable,
		plagiarism  : ScanResult.unreadable,
		readability : ScanResult.unreadable,
	});
	assert.deepStrictEqual(ScanResult.fromResponse(null, ["facts"]).errors, { facts: ScanResult.unreadable });
});

test("readability, credits and the report link are read", () => {
	const result = ScanResult.fromResponse(response, all);
	assert.deepStrictEqual(result.readability, { fleschReadingEase: 61.2, fleschGradeLevel: 8.1, sentenceCount: 2 });
	assert.strictEqual(result.creditsUsed, 9);
	assert.strictEqual(result.publicLink, "https://app.originality.ai/share/abc");
	assert.strictEqual(ScanResult.fromResponse({ results: { properties: { publicLink: "removed" } } }, []).publicLink, null);
});

test("findings flag AI sentences and list each plagiarised phrase once", () => {
	const findings = ScanFindings.fromResult(ScanResult.fromResponse(response, all));
	assert.deepStrictEqual(findings.ai.map((f) => f.flagged), [true, false]);
	assert.deepStrictEqual(findings.plagiarism.map((f) => [f.text, f.sources.length]),
		[["First sentence.", 1], ["Second sentence.", 1]]);
	assert.strictEqual(findings.find(findings.ai[0].id), findings.ai[0]);
	assert.strictEqual(findings.find("missing"), null);
});
