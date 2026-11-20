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

const { WritingRecorder, TypingAnalysis } = loadScripts(
	["domain/text-diff", "domain/writing-recorder", "domain/typing-analysis"],
	["WritingRecorder", "TypingAnalysis"]);

// a fixed seed, so a failure is the same failure on every run
let seed = 7;
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const gauss = () => Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());

/**
 * @param {(i: number) => number} interval - ms before keystroke i
 * @param {number} count
 * @param {number} correctEvery - a backspace after every that many characters; 0 for none
 */
function keystrokes(interval, count, correctEvery) {
	const keys = [];
	let time = 0;
	for (let i = 0; i < count; i++) {
		time += interval(i);
		keys.push({ time: time, kind: "char" });
		if (correctEvery && i % correctEvery === correctEvery - 1) {
			time += interval(i);
			keys.push({ time: time, kind: "backspace" });
		}
	}
	return keys;
}

const human = keystrokes(() => (random() < 0.04 ? 800 + random() * 3000 : Math.exp(Math.log(170) + 0.55 * gauss())), 800, 18);

test("a person typing reads as natural", () => {
	assert.strictEqual(TypingAnalysis.autoTyping(human, 800, 0).verdict, "natural");
	const fastTypist = keystrokes(() => Math.exp(Math.log(95) + 0.45 * gauss()), 800, 25);
	assert.strictEqual(TypingAnalysis.autoTyping(fastTypist, 800, 0).verdict, "natural");
});

test("typing without a single correction is only a doubt", () => {
	const noFixes = keystrokes(() => Math.exp(Math.log(170) + 0.55 * gauss()), 800, 0);
	const result = TypingAnalysis.autoTyping(noFixes, 800, 0);
	assert.strictEqual(result.verdict, "mixed");
	assert.deepStrictEqual(result.reasons, ["Almost nothing was corrected while typing."]);
});

test("auto-typers read as robotic", () => {
	const typers = {
		steady        : keystrokes(() => 100 + (random() * 6 - 3), 800, 0),
		twoSpeeds     : keystrokes((i) => (i % 2 ? 80 : 120), 800, 0),
		randomUniform : keystrokes(() => 60 + random() * 80, 800, 0),
		fast          : keystrokes(() => 15 + random() * 20, 800, 0),
	};
	for (const [name, keys] of Object.entries(typers))
		assert.strictEqual(TypingAnalysis.autoTyping(keys, 800, 0).verdict, "robotic", name);
});

test("too few keystrokes give no verdict", () => {
	const result = TypingAnalysis.autoTyping(keystrokes(() => 150, 30, 0), 30, 0);
	assert.strictEqual(result.score, null);
	assert.strictEqual(result.verdict, "unknown");
});

test("pasting is named but does not make the typing robotic", () => {
	const result = TypingAnalysis.autoTyping(human, 800, 1600);
	assert.strictEqual(result.verdict, "natural");
	assert.deepStrictEqual(result.reasons, ["A large part of the text was pasted rather than typed."]);
});

test("the recorder tells where inserted text came from", () => {
	const recorder = new WritingRecorder({ id: "u1", name: "Ann" }, "Hello world.", 0, null);
	const changes = (/** @type {string} */ text, /** @type {number} */ time) =>
		recorder.addSnapshot(text, time).map((e) => [e.type, e.source, e.text.length]);

	[1, 2, 3, 4, 5, 6].forEach((i) => recorder.addKeystroke({ time: i * 100, kind: "char" }));
	assert.deepStrictEqual(changes("Hello world. Abcde", 650), [["insert", "typed", 6]]);

	const block = "P".repeat(300);
	recorder.addKeystroke({ time: 700, kind: "paste" });
	assert.deepStrictEqual(changes("Hello world. Abcde" + block, 800), [["insert", "pasted", 300]]);

	recorder.addKeystroke({ time: 900, kind: "cut" });
	assert.deepStrictEqual(changes("Hello world. Abcde", 1000), [["delete", "own", 300]]);

	recorder.addKeystroke({ time: 1100, kind: "paste" });
	assert.deepStrictEqual(changes(block + "Hello world. Abcde", 1200), [["insert", "moved", 300]]);

	// no keystroke before it: a co-author's change
	assert.deepStrictEqual(changes(block + "Hello world. Abcde XYZ", 1300), [["insert", "other", 4]]);

	const summary = TypingAnalysis.summarize([recorder.session]);
	assert.deepStrictEqual(
		[summary.typedChars, summary.pastedChars, summary.movedChars, summary.otherChars, summary.deletedChars, summary.pastes.length],
		[6, 300, 300, 4, 300, 1]);
});

test("with a co-author writing elsewhere, only the edit the keys made is the user's", () => {
	const start = "Intro.\nMiddle.\nThe end";
	const recorder = new WritingRecorder({ id: "ann", name: "Ann" }, start, 0, null);
	const typed = (/** @type {number} */ count, /** @type {number} */ from) => {
		for (let i = 1; i <= count; i++)
			recorder.addKeystroke({ time: from + i * 100, kind: "char" });
	};
	const events = (/** @type {string} */ text, /** @type {number} */ time) =>
		recorder.addSnapshot(text, time).map((e) => [e.source, e.text]);

	// Ann types at the end while Bob adds a sentence at the start: before Ann has edited anywhere,
	// her edit is the one her keys fit
	typed(6, 0);
	assert.deepStrictEqual(events("Intro. Bob wrote this long sentence here.\nMiddle.\nThe end. Ann.", 1000),
		[["other", " Bob wrote this long sentence here."], ["typed", ". Ann."]]);

	// from then on, the edit nearest to where she last edited — even when Bob's is the same size
	typed(4, 1000);
	assert.deepStrictEqual(events("Intro. Bob wrote this long sentence here. Bob\nMiddle.\nThe end. Ann. Ann", 2000),
		[["other", " Bob"], ["typed", " Ann"]]);

	// Bob alone, while Ann types nothing
	assert.deepStrictEqual(events("Intro. Bob wrote this long sentence here. Bob\nMiddle, by Bob.\nThe end. Ann. Ann", 3000),
		[["other", ", by Bob"]]);

	// Ann's place moved with Bob's text before it, so her next edit is still found
	typed(3, 3000);
	assert.deepStrictEqual(events("Bob: Intro. Bob wrote this long sentence here. Bob\nMiddle, by Bob.\nThe end. Ann. Ann!!!", 4000),
		[["other", "Bob: "], ["typed", "!!!"]]);
});

test("a co-author's paste next to the user's typing is not taken for the user's paste", () => {
	const recorder = new WritingRecorder({ id: "ann", name: "Ann" }, "First.\nSecond.", 0, null);
	recorder.addKeystroke({ time: 100, kind: "char" });
	recorder.addSnapshot("First.\nSecond.!", 200);
	const block = "B".repeat(400);
	[300, 400].forEach((t) => recorder.addKeystroke({ time: t, kind: "char" }));
	const events = recorder.addSnapshot(block + "\nFirst.\nSecond.!!!", 500).map((e) => [e.source, e.text.length]);
	assert.deepStrictEqual(events, [["other", 401], ["typed", 2]]);
	assert.strictEqual(TypingAnalysis.summarize([recorder.session]).pastes.length, 0);
});
