/*
 * (c) Copyright Ascensio System SIA 2010-2025
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
/// <reference path="./types.js" />

import { zoteroEnvironment } from "./zotero-environment";

/**
 * @typedef {import('./zotero').ZoteroSdk} ZoteroSdk
 */

var ZoteroApiChecker = {
    _done: false,
    _desktop: false,
    _hasPermission: true,
    _online: false,
    _hasKey: false,
    _timeout: 1000, // 1 second
    /** @type {function(AvailableApis): void} */
    _callback: function (e) {},
    _desktopVersion: (function () {
        if (
            window.navigator &&
            window.navigator.userAgent
                .toLowerCase()
                .indexOf("ascdesktopeditor") < 0
        )
            return false;
        if (window.location && window.location.protocol == "file:") return true;
        const src = window.document.currentScript
            ? window.document.currentScript.getAttribute("src")
            : "";
        if (src && 0 == src.indexOf("file:///")) return true;
        return false;
    })(),

    /**
     * @param {ZoteroSdk} sdk
     * @returns
     */
    runApisChecker: function (sdk) {
        const self = this;
        self._done = false;

        function attemptCheck() {
            if (self._done) return;

            self._checkApiAvailable(sdk).then(function (
                /** @type {AvailableApis} */ res
            ) {
                if (self._done) return;
                if (res.online && res.hasKey) {
                    self._done = true;
                } else if (res.desktop && res.hasPermission) {
                    self._done = true;
                }
                self._callback(res);
                setTimeout(attemptCheck, self._timeout);
            });
        }
        attemptCheck();

        return {
            subscribe: function (
                /** @type {function(AvailableApis): void} */ callbackFn
            ) {
                self._callback = callbackFn;
            },
            unsubscribe: function () {
                self._done = true;
                self._callback = function () {};
            },
        };
    },
    /**
     * @param {ZoteroSdk} sdk
     * @returns
     */
    checkStatus: function (sdk) {
        return this._checkApiAvailable(sdk);
    },
    successfullyLoggedInUsingApiKey: function () {
        this._done = true;
        this._callback({
            online: true,
            hasKey: true,
            desktop: this._desktop,
            hasPermission: this._hasPermission,
            desktopVersion: this._desktopVersion,
        });
    },
    /**
     * @param {ZoteroSdk} sdk
     * @returns
     */
    _checkApiAvailable: function (sdk) {
        const self = this;
        return Promise.all([
            fetch(zoteroEnvironment.restApiUrl, {
                method: "GET",
                cache: "no-cache",
            })
                .then(function (res) {
                    return res.status === 200;
                })
                .catch(function () {
                    return false;
                }),
            self
                ._sendDesktopRequest(zoteroEnvironment.desktopApiUrl)
                .then(function (res) {
                    self._hasPermission = res.hasPermission;
                    return res.isZoteroRunning;
                })
                .catch(function () {
                    return false;
                }),
        ]).then(function (apisAvailable) {
            self._online = apisAvailable[0];
            self._desktop = apisAvailable[1];
            self._hasKey = sdk.hasSettings();
            return {
                online: self._online,
                hasKey: self._hasKey,
                desktop: self._desktop,
                hasPermission: self._hasPermission,
                desktopVersion: self._desktopVersion,
            };
        });
    },
    /**
     * @param {string} url
     * @returns
     */
    _sendDesktopRequest: function (url) {
        const self = this;
        return new Promise(function (resolve, reject) {
            if (!self._desktopVersion) {
                resolve({
                    hasPermission: false,
                    isZoteroRunning: false,
                });
                return;
            }
            window.AscSimpleRequest.createRequest({
                url: url,
                method: "GET",
                headers: {
                    "Zotero-API-Version": "3",
                    "User-Agent": "AscDesktopEditor",
                },
                complete: function (/** @type {AscSimpleResponse} */ e) {
                    let hasPermission = false;
                    let isZoteroRunning = false;
                    if (e.responseStatus == 403) {
                        hasPermission = false;
                        isZoteroRunning = true;
                    } else if (e.responseStatus === 200) {
                        isZoteroRunning = true;
                        hasPermission = true;
                    }
                    resolve({
                        hasPermission: hasPermission,
                        isZoteroRunning: isZoteroRunning,
                    });
                },
                error: function (/** @type {AscSimpleResponse} */ e) {
                    if (e.statusCode == -102) e.statusCode = 404;
                    reject(e);
                },
            });
        });
    },
};

export { ZoteroApiChecker };
