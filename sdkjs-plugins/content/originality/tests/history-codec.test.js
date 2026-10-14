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

const { TextDiff, WritingRecorder, SessionText, HistoryCodec } = loadScripts(
	["domain/text-diff", "domain/writing-recorder", "domain/session-text", "domain/history-codec"],
	["TextDiff", "WritingRecorder", "SessionText", "HistoryCodec"]);

test("a history survives encoding, including what changed between sessions", () => {
	const first = new WritingRecorder({ id: "u1", name: "Ann" }, "Title", 1000, null);
	[1, 2, 3].forEach((i) => first.addKeystroke({ time: 1000 + i * 150, kind: "char" }));
	first.addSnapshot("Title abc", 1500);
	first.addKeystroke({ time: 1600, kind: "backspace" });
	first.addSnapshot("Title ab", 1700);
	first.addKeystroke({ time: 1800, kind: "paste" });
	first.addSnapshot("Title ab" + "Z".repeat(200), 1900);

	const end = SessionText.final(first.session);
	assert.strictEqual(end, first.text);

	const reopened = end + " edited elsewhere";
	const second = new WritingRecorder({ id: "u1", name: "Ann" }, reopened, 50000, TextDiff.between(end, reopened));
	second.addKeystroke({ time: 50100, kind: "char" });
	second.addSnapshot(reopened + "!", 50200);

	const history = { userId: "u1", userName: "Ann", sessions: [first.session, second.session] };
	const encoded = HistoryCodec.encode(history);
	assert.deepStrictEqual(HistoryCodec.decode(encoded), history);
	// the second session keeps a diff against the first one's end, not a copy of the text
	assert.ok(!("b" in JSON.parse(encoded).s[1]));
});

test("an unknown format or broken data reads as no history", () => {
	assert.strictEqual(HistoryCodec.decode('{"v":2,"s":[]}'), null);
	assert.strictEqual(HistoryCodec.decode("not json"), null);
});
