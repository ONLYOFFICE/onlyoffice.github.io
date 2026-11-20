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

/// <reference path="../domain/replay-timeline.js" />

/**
 * Draws one frame of the replay: the text as it was at that moment, the caret where it was being
 * written, and, for a while after it arrived, text that was not typed marked by where it came from.
 */
class ReplayDocumentView {

	/** how long, in play time, arrived text stays marked */
	static markMs = 1500;

	/**
	 * @param {HTMLElement} root
	 */
	constructor(root) {
		this._root = root;
		this._before = document.createTextNode("");
		this._mark = document.createElement("span");
		this._caret = document.createElement("span");
		this._caret.className = "replay__caret";
		this._after = document.createTextNode("");
		root.append(this._before, this._mark, this._caret, this._after);
	}

	/**
	 * @param {ReplayFrame} frame
	 * @param {number} playTime - the current play time, to fade the mark
	 */
	show(frame, playTime) {
		const step = frame.step;
		const text = frame.text;
		if (!step) {
			this._set(text, "", "", "");
			return;
		}

		const end = step.index + step.insert.length;
		const marked = step.kind !== "typed" && step.kind !== "deleted" && playTime - step.t < ReplayDocumentView.markMs;
		if (marked)
			this._set(text.slice(0, step.index), text.slice(step.index, end), "replay__mark replay__mark--" + step.kind, text.slice(end));
		else
			this._set(text.slice(0, end), "", "", text.slice(end));

		this._caret.scrollIntoView({ block: "nearest" });
	}

	/**
	 * @param {string} before
	 * @param {string} mark
	 * @param {string} markClass
	 * @param {string} after
	 * @private
	 */
	_set(before, mark, markClass, after) {
		if (this._before.data !== before)
			this._before.data = before;
		this._mark.textContent = mark;
		this._mark.className = markClass;
		if (this._after.data !== after)
			this._after.data = after;
	}
}
