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

/// <reference path="../types-global.js" />

/**
 * @typedef {import("../csl/citation").CSLCitationStorage} CSLCitationStorage
 * @typedef {(progress: {phase: "fetch"|"apply", completed: number, total: number}) => void} RefreshProgressCallback
 * @typedef {{refreshItems?: boolean, onProgress?: RefreshProgressCallback}} PrepareOptions
 */

/**
 * The reference library the cited items come from, as far as the citation
 * service asks it for item data. This one adds nothing: the items are
 * formatted with the data the document stores.
 */
class CitationLibrary {
    /**
     * More data of the items picked for a new citation, to fill it with.
     * @param {Object<string, SearchResultItem>} items - by id
     * @returns {Promise<Array<Object>>}
     */
    completeSelected(items) {
        return Promise.resolve([]);
    }

    /**
     * Brings the data of the stored items up to date before they are
     * formatted.
     * @param {CSLCitationStorage} storage
     * @param {PrepareOptions} [options] - refreshItems re-reads every item
     * @returns {Promise<boolean>} whether the data of an item changed
     */
    prepare(storage, options) {
        return Promise.resolve(false);
    }

    /**
     * Fetches fresh copies of the stored items ahead of a refresh, for the
     * refresh to use.
     * @param {CSLCitationStorage} storage
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<void>}
     */
    prefetch(storage, onProgress) {
        return Promise.resolve();
    }
}

export { CitationLibrary };
