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

import { unEscapeHtml } from "./citation-formatter";

/**
 * The bibliography citeproc made, as HTML for the document: one paragraph an
 * entry, or the entries' own layout where the style aligns a second field.
 * @param {any} bibObject - as citeproc's makeBibliography() gives it
 * @param {number | undefined} editorVersion - Asc.scope.editorVersion
 * @returns {string}
 */
function bibliographyHtml(bibObject, editorVersion) {
    /** @type {Array<string>} */
    const bibItems = [];
    for (let i = 0; i < bibObject[1].length; i++) {
        let bibText = unEscapeHtml(bibObject[1][i])
            .replaceAll("\n", "")
            .replaceAll("\r", "")
            .replace(/\s+/g, " ")
            .trim();

        const paragraphStart = '<div class="csl-entry">';
        const paragraphEnd = "</div>";
        if (bibText.indexOf(paragraphStart) === 0 && bibText.endsWith(paragraphEnd)) {
            bibText =
                paragraphStart +
                bibText.substring(paragraphStart.length, bibText.length - paragraphEnd.length).trim() +
                paragraphEnd;
        }

        if (!bibObject[0]["second-field-align"]) {
            bibText = bibText.replace(/<div class=\"csl-left-margin\">([\s\S]*?)<\/div>/, "$1\t");
            bibText = bibText.replace(/<div class=\"csl-block\">([\s\S]*?)<\/div>/, "$1\n\r");
            bibText = bibText.replace(/<\/?div[^>]*>/g, " ");
            bibText = "<p>" + bibText.trim() + "</p>";
        }
        bibText = bibText
            .split("\n")
            .map((line) => line.replace(/[ ]{2,}/g, " ").trim())
            .join("\n");

        // @ts-ignore an undefined version compares false, as before
        if (editorVersion < 9004000) {
            bibText += "\n";
        }
        bibItems.push(bibText);
    }
    return bibItems.join("").trim();
}

export { bibliographyHtml };
