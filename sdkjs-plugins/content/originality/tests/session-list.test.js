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

const { SessionList } = loadScripts(["domain/session-list"], ["SessionList"]);

const session = (/** @type {number} */ startedAt, /** @type {number} */ keys) => ({
	userId: "ann", userName: "Ann", startedAt: startedAt, endedAt: startedAt + keys, baseText: "", unrecorded: null,
	events: [], keystrokes: Array.from({ length: keys }, (_, i) => ({ time: startedAt + i, kind: "char" })),
});

test("two tabs of one user keep each other's sessions", () => {
	const old = session(1000, 5);
	// each tab knows the old session and its own
	const tabA = [old, session(2000, 10)];
	const tabB = [old, session(3000, 7)];
	// tab B saved last; tab A merges what is stored with what it has
	const merged = SessionList.merge(tabB, tabA);
	assert.deepStrictEqual(merged.map((s) => s.startedAt), [1000, 2000, 3000]);
});

test("of two copies of a session the one that recorded more is kept", () => {
	const stored = session(2000, 10);
	const current = session(2000, 25);
	assert.strictEqual(SessionList.merge([stored], [current])[0].keystrokes.length, 25);
	assert.strictEqual(SessionList.merge([current], [stored])[0].keystrokes.length, 25);
});

