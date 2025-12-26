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

/**
 * @typedef {import('../router').Router} Router
 * @typedef {import('../zotero').ZoteroSdk} ZoteroSdk
 */

import { InputField, Button, Message } from "../shared/components";
import { translate } from "../services";
import { ZoteroApiChecker } from "../zotero";

/**
 * @param {Router} router
 * @param {ZoteroSdk} sdk
 */
function LoginPage(router, sdk) {
    this._router = router;
    this._sdk = sdk;
    this._apiKeyLoginField = new InputField("apiKeyField", {
        autofocus: true,
        autocomplete: "on",
    });
    this._saveApiKeyBtn = new Button("saveApiKeyBtn", {
        disabled: true,
    });
    this._apiKeyMessage = new Message("apiKeyMessage", { type: "error" });
    this._useDesktopMessage = new Message("useDesktopMessage", {
        type: "error",
    });
    this._connectToLocalZotero = new Button("connectToLocalZotero", {
        variant: "secondary",
    });
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

LoginPage.prototype.init = function () {
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

    const triggers = {
        /**
         * @param {function(): void} callbackFn
         */
        onOpen: function (callbackFn) {
            self._onOpen = callbackFn;
            return triggers;
        },
        /**
         * @param {function(AvailableApis): void} callbackFn
         */
        onChangeState: function (callbackFn) {
            self._onChangeState = callbackFn;
            return triggers;
        },
        /**
         * @param {function(AvailableApis): void} callbackFn
         */
        onAuthorized: function (callbackFn) {
            self._onAuthorized = callbackFn;
            return triggers;
        },
    };

    return triggers;
};

LoginPage.prototype._addEventListeners = function () {
    const self = this;
    this._apiKeyLoginField.subscribe(function (event) {
        if (event.type !== "inputfield:submit") {
            // self._tryToApplyKey();
        }
        if (event.type === "inputfield:input") {
            if (self._apiKeyLoginField.getValue()) {
                self._saveApiKeyBtn.enable();
            } else {
                self._saveApiKeyBtn.disable();
            }
        }
    });
    this._saveApiKeyBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        self._tryToApplyKey();
    });
    this._connectToLocalZotero.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        self._showLoader();
        ZoteroApiChecker.checkStatus(self._sdk)
            .then(function (/** @type {AvailableApis} */ apis) {
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
            })
            .finally(function () {
                self._hideLoader();
            });
    });
    this._logoutLink.onclick = function (e) {
        self._sdk.clearSettings();
        self._show();
        return true;
    };
};

LoginPage.prototype._tryToApplyKey = function () {
    const self = this;
    const apiKey = self._apiKeyLoginField.getValue();
    if (apiKey) {
        self._showLoader();
        self._sdk
            .setApiKey(apiKey)
            .then(function () {
                ZoteroApiChecker.successfullyLoggedInUsingApiKey();
                self._hide(true);
            })
            .catch(function (err) {
                console.error(err);
                self._apiKeyMessage.show(translate("Invalid API key"));
            })
            .finally(function () {
                self._hideLoader();
            });
    }
};

LoginPage.prototype._hideAllMessages = function () {
    this._apiKeyMessage.close();
};

/** @param {boolean} [bShowLogoutLink] */
LoginPage.prototype._hide = function (bShowLogoutLink) {
    this._router.openMain();
    if (bShowLogoutLink) {
        this._logoutLink.classList.remove("hidden");
    }
};

LoginPage.prototype._show = function () {
    this._router.openLogin();
    this._logoutLink.classList.add("hidden");
};

LoginPage.prototype._showLoader = function () {
    this._saveApiKeyBtn.disable();
    this._connectToLocalZotero.disable();
    this._apiKeyLoginField.disable();
    //Loader.show();
};
LoginPage.prototype._hideLoader = function () {
    this._saveApiKeyBtn.enable();
    this._connectToLocalZotero.enable();
    this._apiKeyLoginField.enable();
    //Loader.hide();
};

export { LoginPage };
