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
 * @typedef {import("../csl/citation").CSLCitationStorage} CSLCitationStorage
 * @typedef {import("../csl/citation/citation-item").CitationItem} CitationItem
 * @typedef {import("./citation-library").PrepareOptions} PrepareOptions
 */

/**
 * What changes the bibliography citeproc makes of the cited items, kept with
 * the document's bibliography. This one changes nothing: the bibliography
 * lists the cited items, as the style has them.
 */
class BibliographyEditor {
    /**
     * Takes up what the document's bibliography stores besides its text.
     * @param {Object | null} data
     */
    read(data) {}

    /**
     * Gets ready what the bibliography needs besides the stored items.
     * @param {CSLCitationStorage} storage
     * @param {PrepareOptions} [options]
     * @returns {Promise<void>}
     */
    prepare(storage, options) {
        return Promise.resolve();
    }

    /**
     * The items the bibliography lists without a citation.
     * @param {CSLCitationStorage} storage
     * @returns {Array<string>} their ids
     */
    uncitedItemIds(storage) {
        return [];
    }

    /**
     * @param {string} id - one of uncitedItemIds()
     * @returns {CitationItem | null}
     */
    uncitedItem(id) {
        return null;
    }

    /**
     * Changes citeproc's bibliography in place.
     * @param {any} bibObject - as citeproc's makeBibliography() gives it
     * @param {CSLCitationStorage} storage
     */
    apply(bibObject, storage) {}
}

export { BibliographyEditor };
