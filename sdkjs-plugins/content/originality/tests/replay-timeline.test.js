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

const { TextDiff, WritingRecorder, SessionText, ReplayTimeline } = loadScripts(
	["domain/text-diff", "domain/writing-recorder", "domain/session-text", "domain/replay-timeline"],
	["TextDiff", "WritingRecorder", "SessionText", "ReplayTimeline"]);

let seed = 11;
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// two sessions a day apart: typing in bursts with an emoji, a long pause, a paste, a delete;
// then someone else's edit before the second session
const first = new WritingRecorder({ id: "u", name: "A" }, "Start.", 1000, null);
let text = "Start.";
let time = 1000;
for (let i = 0; i < 1200; i++) {
	time += 120 + random() * 200;
	first.addKeystroke({ time: time, kind: "char" });
	text += i === 500 ? "😀" : "abcdefgh "[i % 9];
	if (i % 37 === 36)
		first.addSnapshot(text, time + 1);
}
first.addSnapshot(text, time + 1);
time += 600000;
first.addKeystroke({ time: time, kind: "paste" });
text = text.slice(0, 10) + "PASTED".repeat(30) + text.slice(10);
first.addSnapshot(text, time + 1);
time += 1000;
first.addKeystroke({ time: time, kind: "backspace" });
text = text.slice(0, -5);
first.addSnapshot(text, time + 1);

const end = SessionText.final(first.session);
const reopened = end.replace("Start.", "Start (edited).");
const second = new WritingRecorder({ id: "u", name: "A" }, reopened, time + 86400000, TextDiff.between(end, reopened));
let finalText = reopened;
let time2 = time + 86400000;
for (let i = 0; i < 50; i++) {
	time2 += 150;
	second.addKeystroke({ time: time2, kind: "char" });
	finalText += "z";
}
second.addSnapshot(finalText, time2 + 1);

for (const skipPauses of [true, false]) {
	test("replay " + (skipPauses ? "skipping" : "keeping") + " pauses", () => {
		assert.strictEqual(end, text);
		const timeline = new ReplayTimeline([first.session, second.session], { skipPauses: skipPauses });
		assert.strictEqual(timeline.frameAfter(timeline.steps.length).text, finalText);

		// seeking lands on the same text as playing through
		let played = timeline.initialText;
		timeline.steps.forEach((step, i) => {
			played = played.slice(0, step.index) + step.insert + played.slice(step.index + step.remove);
			if (i % 97 === 0)
				assert.strictEqual(timeline.frameAfter(i + 1).text, played, "seek to " + i);
			if (i > 0)
				assert.ok(step.t >= timeline.steps[i - 1].t, "time goes forward at " + i);
		});

		assert.strictEqual(timeline.countAt(timeline.duration), timeline.steps.length);
		assert.strictEqual(timeline.countAt(-1), 0);
		assert.strictEqual(timeline.pasteSteps.length, 1);
		assert.strictEqual(timeline.steps.filter((/** @type {{ kind: string }} */ s) => s.kind === "jump").length, 1);
	});
}

test("skipping pauses shortens the replay", () => {
	const skipping = new ReplayTimeline([first.session, second.session], { skipPauses: true });
	const keeping = new ReplayTimeline([first.session, second.session], { skipPauses: false });
	assert.ok(skipping.duration < keeping.duration);
});
