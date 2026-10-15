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
 * The document's custom XML parts — data stored in the file next to its text, kept with the
 * document through saving and co-editing. Reads, replaces and removes them, nothing else.
 */
class CustomXmlParts {

	/**
	 * @param {string} marker - a string every part of interest contains, e.g. its namespace
	 * @returns {Promise<string[]>} the XML of each such part
	 */
	read(marker) {
		return EditorCommands.run(function() {
			const parts = Api.GetDocument().GetCustomXmlParts();
			if (!parts)
				return [];
			const marker = String(Asc.scope.originalityMarker);
			return parts.GetAll()
				.map(function(part) { return part.GetXml(); })
				.filter(function(xml) { return xml.indexOf(marker) !== -1; });
		}, { originalityMarker: marker }).then((xmls) => (Array.isArray(xmls) ? xmls : []));
	}

	/**
	 * Replaces the parts that contain `key` with one part holding `xml` — one change in the
	 * document's undo history.
	 * @param {string} key - a string only the part being replaced contains
	 * @param {string} xml
	 * @returns {Promise<boolean>} whether the part is in the document now; false in a viewer, where
	 *   the editor discards changes
	 */
	write(key, xml) {
		return EditorCommands.run(function() {
			const parts = Api.GetDocument().GetCustomXmlParts();
			if (!parts)
				return false;
			const key = String(Asc.scope.originalityKey);
			parts.GetAll().forEach(function(part) {
				if (part.GetXml().indexOf(key) !== -1)
					part.Delete();
			});
			return !!parts.Add(String(Asc.scope.originalityXml));
		}, { originalityKey: key, originalityXml: xml }).then((written) => written === true);
	}

	/**
	 * Removes the parts that contain `marker` — one change in the document's undo history.
	 * @param {string} marker
	 * @returns {Promise<boolean>} whether they are gone; false in a viewer, where the editor
	 *   discards changes
	 */
	remove(marker) {
		return EditorCommands.run(function() {
			const parts = Api.GetDocument().GetCustomXmlParts();
			if (!parts)
				return true;
			const marker = String(Asc.scope.originalityMarker);
			parts.GetAll().forEach(function(part) {
				if (part.GetXml().indexOf(marker) !== -1)
					part.Delete();
			});
			return true;
		}, { originalityMarker: marker }).then((removed) => removed === true);
	}
}
