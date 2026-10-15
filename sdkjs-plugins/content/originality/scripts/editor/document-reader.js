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
 * Reads the text of the open document out of the editor. Read-only: nothing here changes the
 * document or its undo history.
 */
class DocumentReader {

	/**
	 * Every paragraph of the document body, tables included, one per line.
	 * @returns {Promise<string>}
	 */
	readDocument() {
		return EditorCommands.run(function() {
			return Api.GetDocument().GetAllParagraphs().map(function(paragraph) {
				return paragraph.GetText({ "Numbering": false, "Math": false });
			}).join("\n");
		}).then((text) => (typeof text === "string" ? text : ""));
	}

	/**
	 * The paragraphs of the document body, tables included: the ids of all of them in document
	 * order, and the text of the ones asked for — the same text {@link DocumentReader.readDocument}
	 * joins, so the two can be mixed.
	 * @param {string[] | null} ids - whose text to read; null for every paragraph
	 * @returns {Promise<{ ids: string[], texts: Record<string, string> }>}
	 */
	readParagraphs(ids) {
		return EditorCommands.run(function() {
			const wanted = /** @type {string[] | null} */ (Asc.scope.originalityIds);
			/** @type {Record<string, boolean>} */
			const asked = {};
			if (wanted)
				wanted.forEach(function(id) { asked[id] = true; });
			/** @type {{ ids: string[], texts: Record<string, string> }} */
			const result = { ids: [], texts: {} };
			Api.GetDocument().GetAllParagraphs().forEach(function(paragraph) {
				const id = paragraph.GetInternalId();
				result.ids.push(id);
				if (!wanted || asked[id])
					result.texts[id] = paragraph.GetText({ "Numbering": false, "Math": false });
			});
			return result;
		}, { originalityIds: ids }).then((read) => {
			const r = /** @type {{ ids?: unknown, texts?: unknown }} */ (read || {});
			return {
				ids   : Array.isArray(r.ids) ? r.ids.map(String) : [],
				texts : r.texts && typeof r.texts === "object" ? /** @type {Record<string, string>} */ (r.texts) : {},
			};
		});
	}

	/**
	 * The ids of every paragraph of the document body, tables included, in document order — the
	 * ids `onParagraphText` reports paragraphs by.
	 * @returns {Promise<string[]>}
	 */
	readParagraphIds() {
		return EditorCommands.run(function() {
			return Api.GetDocument().GetAllParagraphs().map(function(paragraph) {
				return paragraph.GetInternalId();
			});
		}).then((ids) => (Array.isArray(ids) ? ids : []));
	}

	/**
	 * The selected text, paragraphs and table cells one per line; empty when nothing is selected.
	 * @returns {Promise<string>}
	 */
	readSelection() {
		return new Promise((resolve) => {
			window.Asc.plugin.executeMethod("GetSelectedText", [{
				"Numbering"          : false,
				"Math"               : false,
				"TableCellSeparator" : "\n",
				"TableRowSeparator"  : "\n",
				"ParaSeparator"      : "\n",
				"TabSymbol"          : "\t",
				"NewLineSeparator"   : "\n",
			}], (text) => resolve(typeof text === "string" ? text : ""));
		});
	}
}
