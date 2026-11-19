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

// @ts-check

/// <reference path="./writing-recorder.js" />
/// <reference path="./text-diff.js" />
/// <reference path="./session-text.js" />

/**
 * @typedef {Object} WritingHistory
 * @property {string} userId
 * @property {string} userName
 * @property {WritingSession[]} sessions - oldest first
 */

/**
 * Turns one user's writing history into a compact JSON string and back. What makes it compact:
 * times are stored relative to the session start or to the previous keystroke, kinds and sources
 * as single characters, and the starting text of a session as its difference from where the
 * previous session ended — usually nothing at all.
 *
 * Format version 1; a history in an unknown version is not read.
 */
const HistoryCodec = Object.freeze({

	version: 1,

	/** @type {Record<KeystrokeKind, string>} */
	_kindCodes: Object.freeze({ char: "c", backspace: "b", delete: "d", enter: "e", paste: "v", cut: "x", undo: "z", redo: "y" }),
	/** @type {Record<InsertSource, string>} */
	_insertCodes: Object.freeze({ typed: "t", pasted: "p", moved: "m", restored: "r", other: "o" }),
	/** @type {Record<"own" | "other", string>} */
	_deleteCodes: Object.freeze({ own: "t", other: "o" }),

	/**
	 * @param {WritingHistory} history
	 * @returns {string}
	 */
	encode(history) {
		/** @type {string | null} */
		let previousEnd = null;
		const sessions = history.sessions.map((session) => {
			/** @type {Record<string, unknown>} */
			const encoded = {
				"t" : session.startedAt,
				"d" : session.endedAt - session.startedAt,
				"x" : session.unrecorded ? HistoryCodec._change(session.unrecorded) : 0,
				"ev": session.events.map((event) => [
					event.time - session.startedAt,
					event.type === "insert" ? "i" : "d",
					event.index,
					event.text,
					event.type === "insert" ? HistoryCodec._insertCodes[event.source] : HistoryCodec._deleteCodes[event.source],
				]),
				"k" : HistoryCodec._deltas(session.keystrokes.map((k) => k.time), session.startedAt),
				"kk": session.keystrokes.map((k) => HistoryCodec._kindCodes[k.kind]).join(""),
			};

			const baseChange = previousEnd === null ? null : TextDiff.between(previousEnd, session.baseText);
			if (previousEnd === null)
				encoded["b"] = session.baseText;
			else if (baseChange)
				encoded["bd"] = HistoryCodec._change(baseChange);

			previousEnd = SessionText.final(session);
			return encoded;
		});

		return JSON.stringify({ "v": HistoryCodec.version, "u": history.userId, "n": history.userName, "s": sessions });
	},

	/**
	 * @param {string} json
	 * @returns {WritingHistory | null} null when it is not a history this version can read
	 */
	decode(json) {
		/** @type {any} */
		let data;
		try {
			data = JSON.parse(json);
		} catch (e) {
			return null;
		}
		if (!data || data["v"] !== HistoryCodec.version || !Array.isArray(data["s"]))
			return null;

		const userId = String(data["u"] || "");
		const userName = String(data["n"] || "");
		const kinds = HistoryCodec._invert(HistoryCodec._kindCodes);
		const inserts = HistoryCodec._invert(HistoryCodec._insertCodes);
		const deletes = HistoryCodec._invert(HistoryCodec._deleteCodes);

		/** @type {WritingSession[]} */
		const sessions = [];
		/** @type {string} */
		let previousEnd = "";
		for (const s of data["s"]) {
			const startedAt = Number(s["t"]) || 0;
			const baseText = typeof s["b"] === "string"
				? s["b"]
				: Array.isArray(s["bd"]) ? TextDiff.apply(previousEnd, HistoryCodec._unchange(s["bd"])) : previousEnd;

			const times = HistoryCodec._undeltas(Array.isArray(s["k"]) ? s["k"] : [], startedAt);
			const kindString = String(s["kk"] || "");

			/** @type {WritingSession} */
			const session = {
				userId     : userId,
				userName   : userName,
				startedAt  : startedAt,
				endedAt    : startedAt + (Number(s["d"]) || 0),
				baseText   : baseText,
				unrecorded : Array.isArray(s["x"]) ? HistoryCodec._unchange(s["x"]) : null,
				events     : (Array.isArray(s["ev"]) ? s["ev"] : []).map((/** @type {any[]} */ e) => e[1] === "i"
					? { type: "insert", time: startedAt + Number(e[0]), index: Number(e[2]), text: String(e[3]), source: /** @type {InsertSource} */ (inserts[e[4]] || "other") }
					: { type: "delete", time: startedAt + Number(e[0]), index: Number(e[2]), text: String(e[3]), source: /** @type {"own" | "other"} */ (deletes[e[4]] || "other") }),
				keystrokes : times.map((time, i) => ({ time: time, kind: /** @type {KeystrokeKind} */ (kinds[kindString.charAt(i)] || "char") })),
			};
			sessions.push(session);
			previousEnd = SessionText.final(session);
		}

		return { userId: userId, userName: userName, sessions: sessions };
	},

	/**
	 * @param {TextChange} change
	 * @returns {Array<number | string>}
	 * @private
	 */
	_change(change) {
		return [change.index, change.deleted, change.inserted];
	},

	/**
	 * @param {any[]} encoded
	 * @returns {TextChange}
	 * @private
	 */
	_unchange(encoded) {
		return { index: Number(encoded[0]) || 0, deleted: String(encoded[1] || ""), inserted: String(encoded[2] || "") };
	},

	/**
	 * @param {number[]} times
	 * @param {number} start
	 * @returns {number[]} each time as its distance from the one before, the first from `start`
	 * @private
	 */
	_deltas(times, start) {
		let previous = start;
		return times.map((time) => {
			const delta = time - previous;
			previous = time;
			return delta;
		});
	},

	/**
	 * @param {any[]} deltas
	 * @param {number} start
	 * @returns {number[]}
	 * @private
	 */
	_undeltas(deltas, start) {
		let time = start;
		return deltas.map((delta) => (time += Number(delta) || 0));
	},

	/**
	 * @param {Record<string, string>} codes
	 * @returns {Record<string, string>}
	 * @private
	 */
	_invert(codes) {
		/** @type {Record<string, string>} */
		const inverted = {};
		Object.keys(codes).forEach((key) => { inverted[codes[key]] = key; });
		return inverted;
	},
});
