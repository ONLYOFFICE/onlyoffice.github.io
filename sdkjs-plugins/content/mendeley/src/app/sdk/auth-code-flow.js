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

/**
 * @typedef {Object} AuthCodeTokens
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {number} expiresIn - lifetime of the access token in milliseconds
 */

/**
 * Mendeley authorization code flow: builds the authorize link and exchanges
 * the code (or a refresh token) for tokens at the token endpoint.
 */
class AuthCodeFlow {
    /**
     * @param {string} appId
     * @param {string} secret
     * @param {string} redirectUrl
     */
    constructor(appId, secret, redirectUrl) {
        this._appId = appId;
        this._secret = secret;
        this._redirectUrl = redirectUrl;
    }

    /**
     * @param {string} state
     * @returns {string}
     */
    getAuthorizeUrl(state) {
        return (
            "https://api.mendeley.com/oauth/authorize?client_id=" +
            encodeURIComponent(this._appId) +
            "&redirect_uri=" +
            encodeURIComponent(this._redirectUrl) +
            "&response_type=code&scope=all&state=" +
            encodeURIComponent(state)
        );
    }

    /**
     * @param {string} code
     * @returns {Promise<AuthCodeTokens>}
     */
    exchangeCode(code) {
        return this._requestTokens({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: this._redirectUrl,
        });
    }

    /**
     * @param {string} refreshToken
     * @returns {Promise<AuthCodeTokens>}
     */
    refresh(refreshToken) {
        return this._requestTokens({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            redirect_uri: this._redirectUrl,
        });
    }

    /**
     * @param {Object.<string, string>} params
     * @returns {Promise<AuthCodeTokens>}
     */
    _requestTokens(params) {
        const body = Object.keys(params)
            .map(function (key) {
                return (
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(params[key])
                );
            })
            .join("&");

        return fetch("https://api.mendeley.com/oauth/token", {
            method: "POST",
            headers: {
                "Authorization":
                    "Basic " + btoa(this._appId + ":" + this._secret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Token request failed with status " + response.status,
                    );
                }
                return response.json();
            })
            .then(function (data) {
                if (!data || !data.access_token) {
                    throw new Error("Token response has no access token");
                }
                return {
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token || params.refresh_token,
                    expiresIn: (Number(data.expires_in) || 3600) * 1000,
                };
            });
    }
}

export { AuthCodeFlow };
