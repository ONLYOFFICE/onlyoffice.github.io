// @ts-check
/// <reference path="../types-global.js" />
/// <reference path="./zotero.js" />
/// <reference path="./zotero-environment.js" />

/**
 * @typedef {Object} AvailableApis
 * @property {boolean} desktop
 * @property {boolean} hasPermission
 * @property {boolean} desktopVersion
 * @property {boolean} online
 * @property {boolean} hasKey
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
        return new Promise(function (resolve) {
            Promise.all([
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
                resolve({
                    online: self._online,
                    hasKey: self._hasKey,
                    desktop: self._desktop,
                    hasPermission: self._hasPermission,
                    desktopVersion: self._desktopVersion,
                });
            });
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
                    console.warn(e);
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
