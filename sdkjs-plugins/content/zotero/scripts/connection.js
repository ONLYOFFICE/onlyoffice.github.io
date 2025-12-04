// @ts-check

/// <reference path="./router.js" />
/// <reference path="./shared/ui/input.js" />
/// <reference path="./shared/ui/button.js" />
/// <reference path="./shared/ui/message.js" />
/// <reference path="./shared/ui/types.js" />
/// <reference path="./services/translate-service.js" />
/// <reference path="./zotero/zotero.js" />
/// <reference path="./zotero/zotero-api-checker.js" />

/**
 * @param {Router} router
 * @param {ZoteroSdk} sdk
 */
function ConnectingToApi(router, sdk) {
    this._router = router;
    this._sdk = sdk;
    this._apiKeyConfigField = new InputField("apiKeyField", {
        autofocus: true,
        autocomplete: "on",
    });
    this._saveConfigBtn = new Button("saveConfigBtn", {
        disabled: true,
    });
    this._apiKeyMessage = new Message("apiKeyMessage", { type: "error" });
    this._useDesktopMessage = new Message("useDesktopMessage", {
        type: "error",
    });
    this._connectToLocalZotero = new Button("connectToLocalZotero");
    this._useDesktopApp = document.getElementById("useDesktopApp");
    if (!this._useDesktopApp) {
        throw new Error("useDesktopApp not found");
    }
    this._logoutLink = document.getElementById("logoutLink");
    if (!this._logoutLink) {
        throw new Error("logoutLink not found");
    }

    /**
     * @param {AvailableApis} e
     */
    this._onAuthorized = function (e) {};
    /**
     * @param {AvailableApis} e
     */
    this._onChangeState = function (e) {};
    this._onOpen = function () {};
}

ConnectingToApi.prototype.init = function () {
    const self = this;
    this._addEventListeners();
    let hasFirstAnswer = false;
    let onlineZoteroElements = document.querySelectorAll(".for-zotero-online");

    const apisChecker = ZoteroApiChecker.runApisChecker(self._sdk);

    apisChecker.subscribe(function (/** @type {AvailableApis} */ apis) {
        self._onChangeState(apis);
        if (!hasFirstAnswer) {
            hasFirstAnswer = true;
            if (!apis.desktopVersion && self._useDesktopApp) {
                self._useDesktopApp.classList.add("hidden");
            }
            self._onOpen();
            self._show();
        }

        if (apis.online) {
            onlineZoteroElements.forEach(function (element) {
                element.classList.remove("hidden");
            });
        } else {
            onlineZoteroElements.forEach(function (element) {
                element.classList.add("hidden");
            });
        }
        if (apis.online && apis.hasKey) {
            self._sdk.setIsOnlineAvailable(true);
            self._hide(true);
            self._onAuthorized(apis);
            return;
        } else if (apis.desktop && apis.hasPermission) {
            self._sdk.setIsOnlineAvailable(false);
            self._hide();
            self._hideAllMessages();
            self._onAuthorized(apis);
            return;
        }
    });

    return {
        /**
         * @param {function(AvailableApis): void} callbackFn
         */
        onAuthorized: function (callbackFn) {
            self._onAuthorized = callbackFn;
        },
        /**
         * @param {function(AvailableApis): void} callbackFn
         */
        onChangeState: function (callbackFn) {
            self._onChangeState = callbackFn;
        },
        /**
         * @param {function(): void} callbackFn
         */
        onOpen: function (callbackFn) {
            self._onOpen = callbackFn;
        },
    };
};

ConnectingToApi.prototype._addEventListeners = function () {
    const self = this;
    this._apiKeyConfigField.subscribe(function (event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        if (self._apiKeyConfigField.getValue()) {
            self._saveConfigBtn.enable();
        } else {
            self._saveConfigBtn.disable();
        }
    });
    this._saveConfigBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        const apiKey = self._apiKeyConfigField.getValue();
        if (apiKey) {
            self._sdk
                .setApiKey(apiKey)
                .then(function () {
                    ZoteroApiChecker.successfullyLoggedInUsingApiKey();
                    self._hide(true);
                })
                .catch(function (err) {
                    console.error(err);
                    self._apiKeyMessage.show(translate("Invalid API key"));
                });
        }
    });
    this._connectToLocalZotero.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        ZoteroApiChecker.checkStatus(self._sdk).then(function (
            /** @type {AvailableApis} */ apis
        ) {
            if (apis.desktop && apis.hasPermission) {
                self._sdk.setIsOnlineAvailable(false);
                self._hide();
                self._hideAllMessages();
            } else if (apis.desktop && !apis.hasPermission) {
                const errorMessage =
                    "Connection to Zotero failed. " +
                    "Please enable external connections in Zotero: " +
                    'Edit → Settings → Advanced → Check "Allow other ' +
                    'applications on this computer to communicate with Zotero"';
                self._useDesktopMessage.show(translate(errorMessage));
            } else if (!apis.desktop) {
                self._useDesktopMessage.show(
                    translate(
                        "Connection to Zotero failed. Make sure Zotero is running."
                    )
                );
            }
        });
    });
    this._logoutLink.onclick = function (e) {
        self._sdk.clearSettings();
        self._show();
        return true;
    };
};

ConnectingToApi.prototype._hideAllMessages = function () {
    this._apiKeyMessage.close();
};

/** @param {string} apiKey */
ConnectingToApi.prototype._onClickSave = function (apiKey) {};

/** @param {boolean} [bShowLogoutLink] */
ConnectingToApi.prototype._hide = function (bShowLogoutLink) {
    this._router.openMain();
    if (bShowLogoutLink) {
        this._logoutLink.classList.remove("hidden");
    }
};

ConnectingToApi.prototype._show = function () {
    this._router.openConfig();
    this._logoutLink.classList.add("hidden");
};
