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

/// <reference path="./paragraph-texts.js" />

/**
 * @typedef {Object} AnnotationRange
 * @property {string} id
 * @property {number} start - UTF-16 offset in the paragraph text
 * @property {number} length - in UTF-16 code units
 */

/**
 * Draws and removes text annotations — the editor's own underlining, which is not part of the
 * document and not in its undo history. Needs an editor with text annotations
 * (see {@link ParagraphTexts.isSupported}).
 *
 * The plugin works in UTF-16 offsets like any JavaScript string; the editor counts code points,
 * so a character outside the Basic Multilingual Plane is one unit there and two here. The
 * conversion happens in this class and nowhere else.
 */
class AnnotationRenderer {

	/**
	 * Replaces the plugin's annotations named `name` in the paragraph.
	 * @param {string} paragraphId
	 * @param {ParagraphText} paragraph - the version the ranges were found in
	 * @param {string} name
	 * @param {AnnotationRange[]} ranges
	 * @returns {Promise<void>}
	 */
	annotate(paragraphId, paragraph, name, ranges) {
		const data = {
			"type"        : "highlightText",
			"name"        : name,
			"paragraphId" : paragraphId,
			"recalcId"    : paragraph.recalcId,
			"ranges"      : ranges.map((range) => {
				const start = AnnotationRenderer._toCodePoints(paragraph.text, range.start);
				const end = AnnotationRenderer._toCodePoints(paragraph.text, range.start + range.length);
				return { "id": range.id, "start": start, "length": end - start, "name": name };
			}),
		};
		return new Promise((resolve) => window.Asc.plugin.executeMethod("AnnotateParagraph", [data], () => resolve()));
	}

	/**
	 * @param {string} paragraphId
	 * @param {string} name
	 * @param {string} rangeId
	 * @returns {Promise<void>}
	 */
	remove(paragraphId, name, rangeId) {
		const range = { "paragraphId": paragraphId, "rangeId": rangeId, "name": name };
		return new Promise((resolve) => window.Asc.plugin.executeMethod("RemoveAnnotationRange", [range], () => resolve()));
	}

	/**
	 * @param {string} paragraphId
	 * @param {string} name
	 * @returns {Promise<void>}
	 */
	removeAll(paragraphId, name) {
		const range = { "paragraphId": paragraphId, "rangeId": "", "name": name, "all": true };
		return new Promise((resolve) => window.Asc.plugin.executeMethod("RemoveAnnotationRange", [range], () => resolve()));
	}

	/**
	 * Selects the annotated text in the document.
	 * @param {string} paragraphId
	 * @param {string} name
	 * @param {string} rangeId
	 * @returns {Promise<void>}
	 */
	select(paragraphId, name, rangeId) {
		const range = { "paragraphId": paragraphId, "rangeId": rangeId, "name": name };
		return new Promise((resolve) => window.Asc.plugin.executeMethod("SelectAnnotationRange", [range], () => resolve()));
	}

	/**
	 * The text an annotation the editor reports now covers.
	 * @param {string} text - the paragraph text
	 * @param {AnnotationPosition} position - in code points
	 * @returns {string}
	 */
	static textAt(text, position) {
		const chars = Array.from(text);
		return chars.slice(position.start, position.start + position.length).join("");
	}

	/**
	 * @param {string} text
	 * @param {number} utf16Offset
	 * @returns {number}
	 * @private
	 */
	static _toCodePoints(text, utf16Offset) {
		let surrogates = 0;
		for (let i = 0; i < utf16Offset && i < text.length; ++i) {
			const code = text.charCodeAt(i);
			if (code >= 0xDC00 && code <= 0xDFFF)
				++surrogates;
		}
		return utf16Offset - surrogates;
	}
}
