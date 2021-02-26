/*
 * (c) Copyright Ascensio System SIA 2010
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


var storageManagerPrototype = function (storage) {
    var isAvailable;
    try {
        if (storage == localStorage) {
            isAvailable = "localStorage" in window && window["localStorage"] !== null;
        } else if (storage == sessionStorage) {
            isAvailable = "sessionStorage" in window && window["sessionStorage"] !== null;
        } else {
            throw "Unknown storage " + storage;
        }
    } catch (ex) {
        if (typeof console != "undefined" && console.log) {
            console.log(ex);
        }
        isAvailable = false;
    }

    var getItem = function (key) {
        if (!key || !isAvailable) {
            return null;
        }
        try {
            return JSON.parse(storage.getItem(key));
        } catch (e) {
            removeItem(key);
            if (typeof console != "undefined" && console.log) {
                console.log(e);
            }
            return null;
        }
    };

    var setItem = function (key, value) {
        if (!key || !isAvailable) {
            return;
        }
        if (value === undefined) {
            removeItem(key);
        }
        try {
            storage.setItem(key, JSON.stringify(value));
        } catch (e) {
            if (typeof QUOTA_EXCEEDED_ERR != "undefined" && e == QUOTA_EXCEEDED_ERR) {
                if (typeof console != "undefined" && console.log) {
                    console.log("Local storage is full");
                } else {
                    throw "Local storage is full";
                }
            }
        }
    };

    var removeItem = function (key) {
        if (!key || !isAvailable) {
            return;
        }
        storage.removeItem(key);
    };

    var clear = function () {
        if (!isAvailable) {
            return;
        }
        storage.clear();
    };

    return {
        isAvailable: isAvailable,

        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear
    };
};

var localStorageManager;
try {
    localStorageManager = storageManagerPrototype(localStorage);
} catch (e) { }

var sessionStorageManager;
try {
    sessionStorageManager = storageManagerPrototype(sessionStorage);
} catch (e) { }
