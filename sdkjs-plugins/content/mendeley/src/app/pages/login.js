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
 */

import { InputField, Button, Message } from "../shared/components";
import { translate } from "../services";

class LoginPage {
    /**
     * @param {Router} router
     */
    constructor(router) {
        this._router = router;
        this._redirectConfigField = new InputField("redirectConfig", {
            readonly: true,
            showClear: false
        });
        this._redirectUrlCopyBtn = new Button("redirectUrlCopy", {
            variant: "secondary",
        });
        this._appIdField = new InputField("appIdField", {
            autofocus: true,
            autocomplete: "on",
        });

        this._loginBtn = new Button("loginBtn", {
            variant: "primary",
        });

        this._loginMessage = new Message("loginMessage", {
            type: "error",
        });

        this._logoutLink = document.getElementById("logoutLink");
        if (!this._logoutLink) {
            throw new Error("logoutLink not found");
        }

        this._loginStateHash = "";
        this._mendAppId = "";

        this._onAuthorized = function () {};
        this._onOpen = function () {};
    }

    init() {
        const self = this;
        const redirectUrl =
            document.location.protocol +
            "//" +
            document.location.host +
            document.location.pathname.replace("index.html", "oauth.html");
        this._redirectConfigField.setValue(redirectUrl);

        this._addEventListeners();

        this._mendAppId = localStorage.getItem("mendAppId") || "";

        const triggers = {
            /**
             * @param {function(): void} callbackFn
             */
            onOpen: function (callbackFn) {
                self._onOpen = callbackFn;
                return triggers;
            },
            /**
             * @param {function(): void} callbackFn
             */
            onAuthorized: function (callbackFn) {
                self._onAuthorized = callbackFn;
                return triggers;
            },
        };

        if (this._mendAppId) {
            this._appIdField.setValue(this._mendAppId);
            const token = localStorage.getItem("mendToken");
            if (token) {
                self._hide();
                Promise.resolve().then(() => {
                    self._onAuthorized();
                });
                return triggers;
            }
        }

        self._show();
        Promise.resolve().then(() => {
            self._onOpen();
        });

        return triggers;
    }

    /**
     * @param {string} answer
     * @param {string} [state]
     */
    onAuthCallback(answer, state) {
        console.log("onAuthCallback");
        if (!state) {
            this._loginMessage.show(translate(answer));
            return false;
        }
        if (state != this._loginStateHash) {
            this._loginMessage.show(
                translate("State validation failed. Possible CSRF attack."),
            );
            return false;
        }
        localStorage.setItem("mendToken", answer);
        this._onAuthorized();
        this._hideLoader();
        this._hide();
        return true;
    }

    getAuthFlow() {
        return {
            authenticate: () => {
                this._show();
                this._authenticate();
            },
            getToken: function () {
                return localStorage.getItem("mendToken");
            },
            refreshToken: function () {
                return false;
            },
        };
    }

    _addEventListeners() {
        const self = this;
        this._appIdField.subscribe(function (event) {
            if (event.type !== "inputfield:submit") {
                // self._tryToApplyKey();
            }
            if (event.type === "inputfield:input") {
                if (self._appIdField.getValue()) {
                    self._loginBtn.enable();
                } else {
                    self._loginBtn.disable();
                }
            }
        });
        this._redirectUrlCopyBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            navigator.clipboard.writeText(self._redirectConfigField.getValue());
            window.open("https://dev.mendeley.com/myapps.html", "_blank");
        });

        this._loginBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            self._authenticate();
        });
        this._logoutLink.onclick = function (e) {
            document.cookie = "mendToken=; max-age=0";
            localStorage.removeItem("mendToken");
            self._show();
            return true;
        };
    }

    _authenticate() {
        var appid = this._appIdField.getValue();
        if (!appid) {
            this._loginMessage.show(translate("AppId is empty"));
            return;
        }
        this._mendAppId = appid;
        localStorage.setItem("mendAppId", appid);


        if (!this._mendAppId) {
            this._loginMessage.show(
                translate("Please enter your Mendeley App ID"),
            );
            return;
        }

        this._showLoader();

        this._loginStateHash = new Date().getTime().toString();

        const link =
            "https://api.mendeley.com/oauth/authorize?client_id=" +
            this._mendAppId +
            "&redirect_uri=" +
            encodeURI(this._redirectConfigField.getValue()) +
            "&response_type=token&scope=all&state=" +
            this._loginStateHash;

        const wnd = window.open(link, undefined, "width=500,height=700");
        if (!wnd) {
            this._hideLoader();
            return;
        }
        var timer = setInterval(() => {
            if (!wnd || wnd.closed) {
                clearInterval(timer);
                this._hideLoader();
            }
        }, 500);
    }

    _hideAllMessages() {}

    _hide() {
        this._router.openMain();
        this._logoutLink.classList.remove("hidden");
    }

    _show() {
        this._router.openLogin();
        this._logoutLink.classList.add("hidden");
    }

    _showLoader() {
        this._loginBtn.disable();
        this._appIdField.disable();
        //Loader.show();
    }
    _hideLoader() {
        this._loginBtn.enable();
        this._appIdField.enable();
        //Loader.hide();
    }
}

export { LoginPage };
