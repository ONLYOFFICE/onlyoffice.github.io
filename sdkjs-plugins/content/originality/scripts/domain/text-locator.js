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
 * @typedef {Object} LocatedRange
 * @property {number} phraseIndex - which of the phrases this is a part of
 * @property {number} partIndex - which line of the phrase, when it spans paragraphs
 * @property {string} paragraphId
 * @property {number} start - UTF-16 offset in the paragraph text
 * @property {number} length - in UTF-16 code units
 * @property {string} text - the part of the phrase that was looked for
 */

/**
 * Finds phrases of a scanned text in the document's paragraphs.
 *
 * The API returns the text it scanned, cut into blocks, and does not always return it verbatim:
 * quotes and apostrophes come back straightened, spacing collapsed. So the search treats typographic
 * and straight quotes, and every kind of space, as equal. A phrase that covers several paragraphs
 * is found line by line.
 */
class TextLocator {

	/**
	 * @param {Array<{ id: string, text: string }>} paragraphs - in document order
	 * @param {string[]} phrases
	 * @param {{ sequential: boolean }} options - `sequential` when the phrases follow the text in
	 *   order (the AI blocks), so that a repeated sentence is matched where it belongs
	 * @returns {LocatedRange[]}
	 */
	static locate(paragraphs, phrases, options) {
		const folded = paragraphs.map((p) => TextLocator.fold(p.text));
		/** @type {LocatedRange[]} */
		const located = [];
		let cursor = { paragraph: 0, offset: 0 };

		phrases.forEach((phrase, phraseIndex) => {
			const parts = phrase.split(/\n+/).map((part) => part.trim()).filter((part) => part !== "");
			parts.forEach((part, partIndex) => {
				const from = options.sequential ? cursor : { paragraph: 0, offset: 0 };
				const found = TextLocator._find(folded, TextLocator.fold(part), from)
					|| (options.sequential ? TextLocator._find(folded, TextLocator.fold(part), { paragraph: 0, offset: 0 }) : null);
				if (!found)
					return;

				located.push({
					phraseIndex : phraseIndex,
					partIndex   : partIndex,
					paragraphId : paragraphs[found.paragraph].id,
					start       : found.start,
					length      : found.length,
					text        : part,
				});
				if (options.sequential)
					cursor = { paragraph: found.paragraph, offset: found.start + found.length };
			});
		});

		return located;
	}

	/**
	 * Makes two texts comparable without changing their length, so offsets in the folded text are
	 * offsets in the original.
	 * @param {string} text
	 * @returns {string}
	 */
	static fold(text) {
		return text
			.replace(/[‘’‚‛`´]/g, "'")
			.replace(/[“”„‟]/g, "\"")
			.replace(/[   \t]/g, " ");
	}

	/**
	 * @param {string[]} paragraphs - folded
	 * @param {string} needle - folded
	 * @param {{ paragraph: number, offset: number }} from
	 * @returns {{ paragraph: number, start: number, length: number } | null}
	 * @private
	 */
	static _find(paragraphs, needle, from) {
		if (!needle)
			return null;

		const flexible = new RegExp(needle.split(/\s+/).map(TextLocator._escape).join("\\s+"), "g");
		for (let p = from.paragraph; p < paragraphs.length; ++p) {
			const offset = p === from.paragraph ? from.offset : 0;
			const exact = paragraphs[p].indexOf(needle, offset);
			if (exact !== -1)
				return { paragraph: p, start: exact, length: needle.length };

			flexible.lastIndex = offset;
			const match = flexible.exec(paragraphs[p]);
			if (match)
				return { paragraph: p, start: match.index, length: match[0].length };
		}
		return null;
	}

	/**
	 * @param {string} text
	 * @returns {string}
	 * @private
	 */
	static _escape(text) {
		return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
}
