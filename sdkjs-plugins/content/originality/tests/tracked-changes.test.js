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

const { TrackedChanges, ReviewReader } = loadScripts(
	["domain/tracked-changes", "editor/review-reader"],
	["TrackedChanges", "ReviewReader"]);

// one recorded session from 10:00 to 10:30
const at = (/** @type {number} */ minutes) => Date.UTC(2026, 9, 14, 10, minutes);
const sessions = [{ startedAt: at(0), endedAt: at(30) }];

const records = [
	{ author: "Ann", type: "TextAdd", text: "Typed with the panel open.", date: at(10) },
	{ author: "Ann", type: "TextRem", text: "old", date: at(12) },
	{ author: "Bob", type: "TextAdd", text: "A long paragraph added later, while no panel was open.", date: at(45) },
	{ author: "Bob", type: "TextPr", text: "", date: at(46) },
	{ author: "Bob", type: "ParaAdd", text: "", date: at(46) },
	{ author: "Bob", type: "TextAdd", text: "   ", date: at(47) },
	{ author: "Cid", type: "TextAdd", text: "No date", date: 0 },
];

test("changes are counted per author, the most text first", () => {
	const summary = TrackedChanges.summarize(records, sessions);
	assert.strictEqual(summary.changes, 7);
	assert.deepStrictEqual(summary.authors.map((a) => [a.name, a.insertedChars, a.deletedChars, a.formatting, a.changes]), [
		["Bob", 57, 0, 1, 4],
		["Ann", 26, 3, 0, 2],
		["Cid", 7, 0, 0, 1],
	]);
	assert.deepStrictEqual([summary.authors[1].firstAt, summary.authors[1].lastAt], [at(10), at(12)]);
	assert.deepStrictEqual([summary.authors[2].firstAt, summary.authors[2].lastAt], [null, null]);
});

test("changes outside every recorded session are marked; undated ones are not", () => {
	const summary = TrackedChanges.summarize(records, sessions);
	// all four of Bob's changes come after 10:30; only his paragraph counts as inserted text
	assert.strictEqual(summary.unrecordedChanges, 4);
	assert.strictEqual(summary.unrecordedChars, 54);
	assert.deepStrictEqual(summary.insertions.map((i) => [i.author, i.unrecorded]), [
		["Bob", true], ["Ann", false], ["Cid", false],
	]);
});

test("a change just past the end of a session still counts as recorded", () => {
	const late = [{ author: "Ann", type: "TextAdd", text: "x", date: at(30) + TrackedChanges.toleranceMs }];
	assert.strictEqual(TrackedChanges.summarize(late, sessions).unrecordedChanges, 0);
	assert.strictEqual(TrackedChanges.summarize(late, []).unrecordedChanges, 1);
});

test("the editor's answer is reduced to plain records", () => {
	assert.deepStrictEqual(ReviewReader._records(undefined), []);
	assert.deepStrictEqual(ReviewReader._records([
		{ author: "Ann", type: "TextAdd", text: "a", date: at(1) },
		{ author: "Ann", type: "TextAdd", text: "b", date: "2026-10-14T10:02:00Z" },
		{ author: null, type: "Unknown", date: "not a date" },
	]), [
		{ author: "Ann", type: "TextAdd", text: "a", date: at(1) },
		{ author: "Ann", type: "TextAdd", text: "b", date: at(2) },
		{ author: "", type: "Unknown", text: "", date: 0 },
	]);
});

