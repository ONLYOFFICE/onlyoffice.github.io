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
/// <reference path="../domain/tracked-changes.js" />

/**
 * Reads the changes the editor tracks in review mode. Read-only: nothing here changes the
 * document or its undo history.
 */
class ReviewReader {

	/**
	 * @returns {Promise<ReviewRecord[]>}
	 */
	read() {
		return EditorCommands.run(function() {
			// the report holds the reviewed paragraphs as API objects, which cannot leave the
			// command; only plain values go back. It maps author names straight to arrays of
			// records (sdkjs apiBuilder.js), not to `{ reviews }` as its JSDoc and the types say.
			var report = /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (Api.GetDocument().GetReviewReport()));
			var records = [];
			for (var author in report) {
				var changes = report[author];
				if (!Array.isArray(changes))
					continue;
				for (var i = 0; i < changes.length; i++) {
					var change = changes[i];
					records.push({
						"author" : author,
						"type"   : String(change["Type"]),
						// an image or a chart comes as a number
						"text"   : typeof change["Value"] === "string" ? change["Value"] : "",
						"date"   : change["Date"],
					});
				}
			}
			return records;
		}).then((records) => ReviewReader._records(records));
	}

	/**
	 * @param {unknown} raw
	 * @returns {ReviewRecord[]}
	 * @private
	 */
	static _records(raw) {
		if (!Array.isArray(raw))
			return [];
		return raw.map((r) => {
			// a date from a loaded file can come as text
			const date = typeof r.date === "number" ? r.date : Date.parse(String(r.date));
			return {
				author : String(r.author || ""),
				type   : String(r.type || ""),
				text   : String(r.text || ""),
				date   : isFinite(date) && date > 0 ? date : 0,
			};
		});
	}
}

