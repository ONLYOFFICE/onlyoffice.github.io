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

/// <reference path="../zotero/types.js" />

/**
 * A Zotero item is referred to by several different strings depending on where
 * it comes from: a bare item key from the web API, a citation key (desktop
 * mode, e.g. a Better BibTeX key) or a full item URI stored inside a document
 * field. Everything is reduced to its last path segment so that an id read
 * from the document can be compared with an id read from a search result.
 * @param {string|number|null|undefined} value
 * @returns {string}
 */
function normalizeItemKey(value) {
    if (value === null || value === undefined) {
        return "";
    }
    let key = String(value).trim();
    const paramsIndex = key.search(/[?#]/);
    if (paramsIndex !== -1) {
        key = key.slice(0, paramsIndex);
    }
    const slashIndex = key.lastIndexOf("/");
    if (slashIndex !== -1) {
        key = key.slice(slashIndex + 1);
    }
    return key;
}

/**
 * Every key the item can be recognized by: its own id plus the keys of all of
 * its URIs, because the id under which a citation was stored is not always the
 * id the same item is found under later.
 * @param {{id?: string|number, uris?: Array<string>, itemData?: {id?: string|number}}} item
 * @returns {Array<string>}
 */
function collectItemKeys(item) {
    /** @type {Array<string>} */
    const keys = [];
    /** @param {string|number|null|undefined} value */
    const add = function (value) {
        const key = normalizeItemKey(value);
        if (key && keys.indexOf(key) === -1) {
            keys.push(key);
        }
    };
    if (!item) {
        return keys;
    }
    add(item.id);
    if (item.itemData) {
        add(item.itemData.id);
    }
    if (Array.isArray(item.uris)) {
        item.uris.forEach(add);
    }
    return keys;
}

export { normalizeItemKey, collectItemKeys };
