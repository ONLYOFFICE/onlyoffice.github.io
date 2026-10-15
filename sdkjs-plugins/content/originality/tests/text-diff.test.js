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

const { TextDiff } = loadScripts(["domain/text-diff"], ["TextDiff"]);

/**
 * @param {string} before
 * @param {Array<{ index: number, at: number, deleted: string, inserted: string }>} edits
 */
function applyAll(before, edits) {
	let text = before;
	for (const e of edits) {
		assert.strictEqual(text.slice(e.index, e.index + e.deleted.length), e.deleted, "deleted text at index");
		assert.strictEqual(before.slice(e.at, e.at + e.deleted.length), e.deleted, "deleted text at its place before");
		text = text.slice(0, e.index) + e.inserted + text.slice(e.index + e.deleted.length);
	}
	return text;
}

test("edits in different paragraphs stay apart", () => {
	const before = "Intro paragraph.\nMiddle stays.\nThe end";
	const after = "Intro paragraph by Bob.\nMiddle stays.\nThe end, typed by Ann";
	const edits = TextDiff.edits(before, after);
	assert.deepStrictEqual(edits.map((e) => [e.at, e.deleted, e.inserted]), [[15, "", " by Bob"], [38, "", ", typed by Ann"]]);
	assert.strictEqual(applyAll(before, edits), after);
});

test("paragraphs added and removed at the edges", () => {
	assert.deepStrictEqual(TextDiff.edits("A", "A\nB").map((e) => [e.index, e.deleted, e.inserted]), [[1, "", "\nB"]]);
	assert.deepStrictEqual(TextDiff.edits("A\nB\nC", "A\nC").map((e) => [e.index, e.deleted, e.inserted]), [[2, "B\n", ""]]);
	assert.deepStrictEqual(TextDiff.edits("", "x").map((e) => [e.index, e.inserted]), [[0, "x"]]);
	assert.deepStrictEqual(TextDiff.edits("same", "same"), []);
});

test("two edits in one paragraph come out as one", () => {
	assert.strictEqual(TextDiff.edits("one two three", "ONE two THREE").length, 1);
});

test("random edits always rebuild the new text", () => {
	let seed = 3;
	const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
	const word = () => Array.from({ length: 1 + Math.floor(random() * 6) }, () => "abcdefgh "[Math.floor(random() * 9)]).join("");
	let several = 0;
	for (let round = 0; round < 2000; round++) {
		const before = Array.from({ length: Math.floor(random() * 12) }, word).join("\n");
		let after = before;
		for (let i = 1 + Math.floor(random() * 4); i > 0; i--) {
			const at = Math.floor(random() * (after.length + 1));
			const r = random();
			after = r < 0.4 ? after.slice(0, at) + word() + after.slice(at)
				: r < 0.6 ? after.slice(0, at) + "\n" + word() + after.slice(at)
				: r < 0.8 ? after.slice(0, at) + after.slice(at + Math.floor(random() * 8))
				: after.slice(0, at) + "\n" + after.slice(at + Math.floor(random() * 3));
		}
		const edits = TextDiff.edits(before, after);
		assert.strictEqual(applyAll(before, edits), after);
		if (edits.length > 1)
			several++;
	}
	assert.ok(several > 100, "the cases include several edits at once");
});

test("a text changed all over comes out as one edit", () => {
	const paragraphs = Array.from({ length: 1200 }, (_, i) => "Paragraph " + i);
	const before = paragraphs.join("\n");
	const after = paragraphs.map((p, i) => (i % 2 ? p + "!" : p)).join("\n");
	const edits = TextDiff.edits(before, after);
	assert.strictEqual(edits.length, 1);
	assert.strictEqual(applyAll(before, edits), after);
});

