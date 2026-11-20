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

/**
 * @typedef {Object} TextChange
 * @property {number} index - where the change starts, in the text before it
 * @property {string} deleted - the text that was there
 * @property {string} inserted - the text that is there now
 */

/**
 * @typedef {Object} TextEdit
 * @property {number} index - where it applies once the edits before it are applied, i.e. its
 *   place in the text after all of them
 * @property {number} at - where it is in the text before any of them
 * @property {string} deleted
 * @property {string} inserted
 */

/**
 * The difference between two versions of a text: as one changed stretch ({@link TextDiff.between}),
 * or as separate edits in separate places ({@link TextDiff.edits}).
 *
 * Two snapshots taken a moment apart by one writer nearly always differ by one edit. When several
 * people write at once they differ in several places, and one stretch spanning all of them would
 * hand everyone's text to whoever typed last.
 */
const TextDiff = Object.freeze({

	/** past this many differing paragraphs the comparison stops and reports one stretch */
	maxParagraphEdits: 500,

	/**
	 * @param {string} before
	 * @param {string} after
	 * @returns {TextChange | null} null when the texts are equal
	 */
	between(before, after) {
		if (before === after)
			return null;

		const limit = Math.min(before.length, after.length);
		let start = 0;
		while (start < limit && before.charCodeAt(start) === after.charCodeAt(start))
			++start;

		let endBefore = before.length;
		let endAfter = after.length;
		while (endBefore > start && endAfter > start && before.charCodeAt(endBefore - 1) === after.charCodeAt(endAfter - 1)) {
			--endBefore;
			--endAfter;
		}

		return {
			index    : start,
			deleted  : before.slice(start, endBefore),
			inserted : after.slice(start, endAfter),
		};
	},

	/**
	 * The edits that turn one text into the other, each in a place of its own, in text order.
	 * Paragraphs (lines) are compared first, so edits in different paragraphs stay apart; within
	 * a run of changed paragraphs the edit is narrowed to the characters that differ. Two edits in
	 * one paragraph come out as one.
	 * @param {string} before
	 * @param {string} after
	 * @returns {TextEdit[]} empty when the texts are equal
	 */
	edits(before, after) {
		if (before === after)
			return [];

		const a = TextDiff._paragraphs(before);
		const b = TextDiff._paragraphs(after);
		const runs = TextDiff._changedRuns(a, b);
		if (!runs) {
			const change = /** @type {TextChange} */ (TextDiff.between(before, after));
			return [{ index: change.index, at: change.index, deleted: change.deleted, inserted: change.inserted }];
		}

		const startsA = TextDiff._starts(a);
		const startsB = TextDiff._starts(b);
		return runs.map((run) => {
			const fromA = startsA[run.a0];
			const fromB = startsB[run.b0];
			const change = /** @type {TextChange} */ (TextDiff.between(
				before.slice(fromA, startsA[run.a1]),
				after.slice(fromB, startsB[run.b1])));
			return {
				index    : fromB + change.index,
				at       : fromA + change.index,
				deleted  : change.deleted,
				inserted : change.inserted,
			};
		}).filter((edit) => edit.deleted !== "" || edit.inserted !== "");
	},

	/**
	 * Paragraphs with the line break that ends them, so that joined they are the text again.
	 * @param {string} text
	 * @returns {string[]}
	 * @private
	 */
	_paragraphs(text) {
		const lines = text.split("\n");
		return lines.map((line, i) => (i < lines.length - 1 ? line + "\n" : line));
	},

	/**
	 * @param {string[]} parts
	 * @returns {number[]} where each part starts, and one more entry for the end of the text
	 * @private
	 */
	_starts(parts) {
		const starts = [0];
		parts.forEach((part, i) => starts.push(starts[i] + part.length));
		return starts;
	},

	/**
	 * The runs of paragraphs that differ, by Myers' diff over the paragraphs.
	 * @param {string[]} a
	 * @param {string[]} b
	 * @returns {Array<{ a0: number, a1: number, b0: number, b1: number }> | null} each run as
	 *   `a[a0..a1)` replaced by `b[b0..b1)`; null when the texts differ in too many places
	 * @private
	 */
	_changedRuns(a, b) {
		// paragraphs as numbers, so that comparing them is cheap
		/** @type {Map<string, number>} */
		const codes = new Map();
		const code = (/** @type {string} */ s) => {
			let c = codes.get(s);
			if (c === undefined) {
				c = codes.size;
				codes.set(s, c);
			}
			return c;
		};
		const x = a.map(code);
		const y = b.map(code);

		const n = x.length;
		const m = y.length;
		const max = Math.min(n + m, TextDiff.maxParagraphEdits);
		const offset = max + 1;
		const v = new Int32Array(2 * max + 3);
		/** @type {Int32Array[]} */
		const trace = [];

		let found = false;
		for (let d = 0; d <= max && !found; d++) {
			trace.push(v.slice());
			for (let k = -d; k <= d; k += 2) {
				let i = k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1])
					? v[offset + k + 1]
					: v[offset + k - 1] + 1;
				let j = i - k;
				while (i < n && j < m && x[i] === y[j]) {
					i++;
					j++;
				}
				v[offset + k] = i;
				if (i >= n && j >= m) {
					found = true;
					break;
				}
			}
		}
		if (!found)
			return null;

		// walk back through the trace, collecting the paragraphs that are kept
		/** @type {Array<[number, number]>} */
		const kept = [];
		let i = n;
		let j = m;
		for (let d = trace.length - 1; d >= 0 && (i > 0 || j > 0); d--) {
			const vd = trace[d];
			const k = i - j;
			const prevK = k === -d || (k !== d && vd[offset + k - 1] < vd[offset + k + 1]) ? k + 1 : k - 1;
			const prevI = d === 0 ? 0 : vd[offset + prevK];
			const prevJ = prevI - prevK;
			while (i > prevI && j > prevJ) {
				kept.push([i - 1, j - 1]);
				i--;
				j--;
			}
			if (d > 0) {
				i = prevI;
				j = prevJ;
			}
		}
		kept.reverse();

		// what lies between two kept paragraphs is a changed run
		/** @type {Array<{ a0: number, a1: number, b0: number, b1: number }>} */
		const runs = [];
		let lastA = 0;
		let lastB = 0;
		kept.concat([[n, m]]).forEach(([ka, kb]) => {
			if (ka > lastA || kb > lastB)
				runs.push({ a0: lastA, a1: ka, b0: lastB, b1: kb });
			lastA = ka + 1;
			lastB = kb + 1;
		});
		return runs;
	},

	/**
	 * Applies a change to the text it was computed against.
	 * @param {string} text
	 * @param {TextChange} change
	 * @returns {string}
	 */
	apply(text, change) {
		return text.slice(0, change.index) + change.inserted + text.slice(change.index + change.deleted.length);
	},
});
