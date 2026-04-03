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
/// <reference path="../../../vendor/mendeley-sdk/standalone.min.js" />
/// <reference path="./types.js" />

import { MendeleyToCls } from "./mendeley-to-csl";

class Sdk {
    /** @param {{authFlow: any}} authFlow */
    constructor(authFlow) {
        // @ts-ignore
        this._mendeleySdk = MendeleySDK(authFlow);
        this._userId = 0;
        /** @type {Array<UserGroupInfo>}} */
        this._userGroups = [];
    }

    /**
     * Get items from user library
     * @param {string|null} search
     * @param {string[]} [itemsID]
     * @param {string} [format]
     * @returns {Promise<SearchResult>}
     */
    getItems(search, itemsID, format) {
        let promise = Promise.resolve({items: []});

         /*this._mendeleySdk.documents.list({
                limit: 6,
                view: "all",
            }).then((response) => {
                console.error(response);
            });
         */
        if (search) {
            promise = this._mendeleySdk.documents.search({
                query: search,
                limit: 20,
                view: "bib",
            });
        } else if (itemsID || format) {
            // In mendeley sdk this way doesn't work (But for zotero it does)
        } else {
            promise = this._mendeleySdk.documents.list({
                limit: 16,
                view: "bib",
                sort: "last_modified",
                order: "desc"
            });
        }
        return promise.then((response) => {
            response.items.forEach(MendeleyToCls.transform.bind(MendeleyToCls));
            return response;
        });
    }

    /**
     * Get items from group library
     * @param {string | null} search
     * @param {number|string} groupId
     * @param {string[]} [itemsID]
     * @returns {Promise<SearchResult>}
     */
    getGroupItems(search, groupId, itemsID) {
        var self = this;

        return new Promise(function (resolve, reject) {
            resolve({items: []});
        });
    }

    /**
     * Get user groups
     * @returns {Promise<Array<UserGroupInfo>>}
     */
    getUserGroups() {
        var self = this;

        return this._mendeleySdk.folders.list({
                limit: 6
            }).then((/** @type {{items: Array<{id: string, name: string}>}} */response) => {
                if (response && response.items && response.items.length) {
                    return response.items;
                }
                return [];
            });
    }

}

export { Sdk };
