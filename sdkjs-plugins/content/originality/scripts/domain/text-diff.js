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
 * The difference between two versions of a text as one changed stretch: everything before
 * `index` and everything after the changed stretch is the same in both.
 *
 * Two snapshots taken a moment apart nearly always differ by one edit, which this describes
 * exactly; edits in two places between snapshots come out as one change spanning both.
 */
const TextDiff = Object.freeze({

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
	 * Applies a change to the text it was computed against.
	 * @param {string} text
	 * @param {TextChange} change
	 * @returns {string}
	 */
	apply(text, change) {
		return text.slice(0, change.index) + change.inserted + text.slice(change.index + change.deleted.length);
	},
});
