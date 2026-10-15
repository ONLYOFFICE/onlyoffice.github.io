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

/// <reference path="./editor-commands.js" />

/**
 * Selects a piece of text in the document by searching for it. Works in every edition of the
 * editor; where text annotations exist, selecting an annotation is more exact (see
 * {@link AnnotationRenderer.select}).
 */
class TextSelector {

	/** the shortest beginning of a text worth searching for on its own */
	static _minPrefix = 15;

	/**
	 * Selects the first occurrence of the text. A text that covers several paragraphs is looked up
	 * by its first line, since a search does not cross paragraphs.
	 *
	 * The scanned text can come back from Originality.ai with quotes and apostrophes straightened,
	 * and a search for `didn't` does not find `didn’t`; when the whole text is not found, the part
	 * before the first quote mark is tried.
	 * @param {string} text
	 * @returns {Promise<boolean>} whether it was found
	 */
	select(text) {
		const firstLine = text.split(/\n/).map((line) => line.trim()).find((line) => line !== "") || "";
		if (!firstLine)
			return Promise.resolve(false);

		const quote = firstLine.search(/['"‘’“”]/);
		const prefix = quote >= TextSelector._minPrefix ? firstLine.slice(0, quote) : "";

		return EditorCommands.run(function() {
			const document = Api.GetDocument();
			const candidates = /** @type {string[]} */ (Asc.scope.originalitySearch);
			for (let i = 0; i < candidates.length; ++i) {
				const found = document.Search(candidates[i], true);
				if (found.length > 0)
					return found[0].Select();
			}
			return false;
		}, { originalitySearch: prefix ? [firstLine, prefix] : [firstLine] }).then((selected) => selected === true);
	}
}
