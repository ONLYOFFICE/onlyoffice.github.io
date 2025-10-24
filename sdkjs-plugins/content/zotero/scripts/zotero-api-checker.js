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
    _callback: function () {},
    _desktopVersion: (function () {
        if (
            window.navigator &&
            window.navigator.userAgent
                .toLowerCase()
                .indexOf("ascdesktopeditor") < 0
        )
            return false;
        if (window.location && window.location.protocol == "file:") return true;
        if (
            window.document &&
            window.document.currentScript &&
            0 == window.document.currentScript.src.indexOf("file:///")
        )
            return true;
        return false;
    })(),

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
            subscribe: function (callbackFn) {
                self._callback = callbackFn;
            },
            unsubscribe: function () {
                done = true;
                callback = function () {};
            },
        };
    },
    checkStatus: function (sdk) {
        return this._checkApiAvailable(sdk);
    },
    stopApisChecker: function () {
        this._done = true;
    },

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
                complete: function (e) {
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
                error: function (e) {
                    if (e.statusCode == -102) e.statusCode = 404;
                    reject(e);
                },
            });
        });
    },
};
