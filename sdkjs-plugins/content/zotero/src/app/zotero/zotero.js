/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// @ts-check

/// <reference path="../types-global.js" />
/// <reference path="./types.js" />

import { zoteroEnvironment } from "./zotero-environment";
import { RateLimitedFetcher } from "./zotero-api-fetcher";

const ZoteroSdk = function () {
    this._apiKey = null;
    this._userId = 0;
    /** @type {Array<UserGroupInfo>}} */
    this._userGroups = [];
    this._isOnlineAvailable = true;

    this._fetcher = new RateLimitedFetcher({
        maxRetries: 5,
        initialDelay: 5000,
    });
};

// Constants
ZoteroSdk.prototype.ZOTERO_API_VERSION = "3";
ZoteroSdk.prototype.USER_AGENT = "AscDesktopEditor";
/** @type {"csljson"|"json"} */
ZoteroSdk.prototype.DEFAULT_FORMAT = "csljson";
ZoteroSdk.prototype.STORAGE_KEYS = {
    USER_ID: "zoteroUserId",
    API_KEY: "zoteroApiKey",
};
ZoteroSdk.prototype.API_PATHS = {
    USERS: "users",
    GROUPS: "groups",
    ITEMS: "items",
    KEYS: "keys",
};

/**
 * Get appropriate base URL based on online/offline mode
 */
ZoteroSdk.prototype._getBaseUrl = function () {
    return this._isOnlineAvailable
        ? zoteroEnvironment.restApiUrl
        : zoteroEnvironment.desktopApiUrl;
};

/**
 * Make a GET request to the local Zotero API (offline mode)
 * @param {string} url
 * @returns {Promise<AscSimpleResponse>}
 */
ZoteroSdk.prototype._getDesktopRequest = function (url) {
    var self = this;
    return new Promise(function (resolve, reject) {
        window.AscSimpleRequest.createRequest({
            url: url,
            method: "GET",
            headers: {
                "Zotero-API-Version": self.ZOTERO_API_VERSION,
                "User-Agent": self.USER_AGENT,
            },
            complete: resolve,
            error: function (/** @type {AscSimpleResponse} */ error) {
                if (error.statusCode === -102) {
                    error.statusCode = 404;
                    error.message =
                        "Connection to Zotero failed. Make sure Zotero is running";
                }
                reject(error);
            },
        });
    });
};

/**
 * Make a GET request to the online Zotero API
 * @param {URL} url
 * @returns {Promise<FetchResponse>}
 */
ZoteroSdk.prototype._getOnlineRequest = function (url) {
    const headers = {
        "Zotero-API-Version": this.ZOTERO_API_VERSION,
        "Zotero-API-Key": this._apiKey || "",
    };

    //return this._fetcher.fetchWithRetry(url, headers, 9);

    return fetch(url, { headers: headers })
        .then(function (response) {
            if (!response.ok) {
                const message = response.status + " " + response.statusText;
                console.error(message);
                throw new Error(message);
            }
            return response;
        })
        .catch(function (error) {
            if (typeof error === "object") {
                error.message = "Connection to Zotero failed";
            }
            throw error;
        });
};

/**
 * Universal request handler with offline support
 * @param {URL} url
 * @returns {Promise<AscSimpleResponse | FetchResponse>}
 */
ZoteroSdk.prototype._getRequestWithOfflineSupport = function (url) {
    return this._isOnlineAvailable
        ? this._getOnlineRequest(url)
        : this._getDesktopRequest(url.href);
};

/**
 * Build URL and make GET request
 * @param {string} path
 * @param {*} [queryParams]
 * @returns {Promise<AscSimpleResponse | FetchResponse>}
 */
ZoteroSdk.prototype._buildGetRequest = function (path, queryParams) {
    queryParams = queryParams || {};
    var url = new URL(path, this._getBaseUrl());

    Object.keys(queryParams).forEach(function (key) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            url.searchParams.append(key, queryParams[key]);
        }
    });

    return this._getRequestWithOfflineSupport(url);
};

/**
 * Parse link header for pagination
 * @param {string} headerValue
 * @returns {{[key: string]: string}}
 */
ZoteroSdk.prototype._parseLinkHeader = function (headerValue) {
    /** @type {{[key: string]: string}} */
    var links = {};
    var linkHeaderRegex = /<(.*?)>; rel="(.*?)"/g;

    if (!headerValue) return links;

    var match;
    while ((match = linkHeaderRegex.exec(headerValue.trim())) !== null) {
        links[match[2]] = match[1];
    }

    return links;
};

/**
 * Parse response for desktop (offline) mode
 * @param {Promise<AscSimpleResponse>} promise
 * @param {function(any): void} resolve
 * @param {function(any): void} reject
 * @param {number|string} id
 * @returns {Promise<void>}
 */
ZoteroSdk.prototype._parseDesktopItemsResponse = function (
    promise,
    resolve,
    reject,
    id
) {
    return promise
        .then(function (response) {
            return {
                items: JSON.parse(response.responseText),
                id: id,
            };
        })
        .then(resolve)
        .catch(reject);
};

/**
 * Parse response for online mode with pagination support
 * @param {Promise<FetchResponse>} promise
 * @param {function(any): void} resolve
 * @param {function(any): void} reject
 * @param {number|string} id
 * @returns {Promise<void>}
 */
ZoteroSdk.prototype._parseItemsResponse = function (
    promise,
    resolve,
    reject,
    id
) {
    var self = this;
    return promise
        .then(function (response) {
            return Promise.all([response.json(), response]);
        })
        .then(function (results) {
            var json = results[0];
            var response = results[1];
            var links = self._parseLinkHeader(
                response.headers.get("Link") || ""
            );
            /** @type {SearchResult} */
            var result = {
                items: json,
                id: id,
            };
            if (typeof json === "object" && json.items) {
                result.items = json.items;
            }

            if (links.next) {
                result.next = function () {
                    return new Promise(function (rs, rj) {
                        self._parseItemsResponse(
                            self._getOnlineRequest(new URL(links.next)),
                            rs,
                            rj,
                            id
                        );
                    });
                };
            }

            resolve(result);
        })
        .catch(reject);
};

/**
 * Universal items response parser
 * @param {Promise<AscSimpleResponse | FetchResponse>} promise
 * @param {function(any): void} resolve
 * @param {function(any): void} reject
 * @param {number|string} id
 */
ZoteroSdk.prototype._parseResponse = function (promise, resolve, reject, id) {
    if (this._isOnlineAvailable) {
        const fetchPromise = /** @type {Promise<FetchResponse>} */ (promise);
        this._parseItemsResponse(fetchPromise, resolve, reject, id);
    } else {
        const ascSimplePromise = /** @type {Promise<AscSimpleResponse>} */ (
            promise
        );
        this._parseDesktopItemsResponse(
            /** @type {Promise<AscSimpleResponse>} */ ascSimplePromise,
            resolve,
            reject,
            id
        );
    }
};

/**
 * Get items from user library
 * @param {string|null} search
 * @param {string[]} [itemsID]
 * @param {"csljson"|"json"} [format]
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getItems = function (search, itemsID, format) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;

    return new Promise(function (resolve, reject) {
        var queryParams =
            /** @type {{format: string, q?: string, itemKey?: string}} */ ({
                format: format,
            });

        if (search) {
            queryParams.q = search;
        } else if (itemsID) {
            queryParams.itemKey = itemsID.join(",");
        }

        var path =
            self.API_PATHS.USERS +
            "/" +
            self._userId +
            "/" +
            self.API_PATHS.ITEMS;
        var request = self._buildGetRequest(path, queryParams);

        return self._parseResponse(request, resolve, reject, self._userId);
    });
};

/**
 * Get items from group library
 * @param {string | null} search
 * @param {number|string} groupId
 * @param {string[]} [itemsID]
 * @param {"csljson"|"json"} [format]
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getGroupItems = function (
    search,
    groupId,
    itemsID,
    format
) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;

    return new Promise(function (resolve, reject) {
        var queryParams =
            /** @type {{format: string, q?: string, itemKey?: string}} */ ({
                format: format,
            });

        if (search) {
            queryParams.q = search;
        } else if (itemsID) {
            queryParams.itemKey = itemsID.join(",");
        }

        var path =
            self.API_PATHS.GROUPS + "/" + groupId + "/" + self.API_PATHS.ITEMS;
        var request = self._buildGetRequest(path, queryParams);
        return self._parseResponse(request, resolve, reject, groupId);
    });
};

/**
 * Get user groups
 * @returns {Promise<Array<UserGroupInfo>>}
 */
ZoteroSdk.prototype.getUserGroups = function () {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (self._userGroups.length > 0) {
            resolve(self._userGroups);
            return;
        }

        var path = self.API_PATHS.USERS + "/" + self._userId + "/groups";

        self._buildGetRequest(path)
            .then(function (
                /** @type {FetchResponse | AscSimpleResponse} */ response
            ) {
                if (self._isOnlineAvailable) {
                    var fetchResponse = /** @type {FetchResponse} */ (response);
                    if (!fetchResponse.ok) {
                        throw new Error(
                            fetchResponse.status +
                                " " +
                                fetchResponse.statusText
                        );
                    }
                    return fetchResponse.json();
                }
                var ascSimpleResponse = /** @type {AscSimpleResponse} */ (
                    response
                );
                return JSON.parse(ascSimpleResponse.responseText);
            })
            .then(function (groups) {
                self._userGroups = groups.map(function (
                    /** @type {ZoteroGroupInfo} */ group
                ) {
                    return {
                        id: group.id,
                        name: group.data.name,
                    };
                });
                resolve(self._userGroups);
            })
            .catch(reject);
    });
};

/**
 * Format citations
 */
/*ZoteroSdk.prototype.format = function (ids, groupKey, style, locale) {
    var queryParams = {
        format: "bib",
        style: style,
        locale: locale,
        itemKey: ids.join(","),
    };

    var path = groupKey
        ? this.API_PATHS.GROUPS + "/" + groupKey + "/" + this.API_PATHS.ITEMS
        : this.API_PATHS.USERS +
          "/" +
          this._userId +
          "/" +
          this.API_PATHS.ITEMS;

    return this._buildGetRequest(path, queryParams).then(function (response) {
        return response.text();
    });
};*/

/**
 * Set API key and validate it
 * @param {string} key
 */
ZoteroSdk.prototype.setApiKey = function (key) {
    var self = this;
    var path = this.API_PATHS.KEYS + "/" + key;

    return this._buildGetRequest(path)
        .then(function (response) {
            var fetchResponse = /** @type {FetchResponse} */ (response);
            if (!fetchResponse.ok) {
                throw new Error(
                    fetchResponse.status + " " + fetchResponse.statusText
                );
            }
            return fetchResponse.json();
        })
        .then(function (/** @type {any} */ keyData) {
            self._saveSettings(keyData.userID, key);
            return true;
        });
};

/**
 * Apply settings to current session
 * @param {number} userId
 * @param {string} apiKey
 */
ZoteroSdk.prototype._applySettings = function (userId, apiKey) {
    this._userId = userId;
    this._apiKey = apiKey;
};

/**
 * Save settings to localStorage
 * @param {number} userId
 * @param {string} apiKey
 */
ZoteroSdk.prototype._saveSettings = function (userId, apiKey) {
    this._applySettings(userId, apiKey);
    localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(userId));
    localStorage.setItem(this.STORAGE_KEYS.API_KEY, apiKey);
};

/**
 * Load settings from localStorage
 */
ZoteroSdk.prototype.hasSettings = function () {
    var userId = localStorage.getItem(this.STORAGE_KEYS.USER_ID);
    var apiKey = localStorage.getItem(this.STORAGE_KEYS.API_KEY);

    if (userId && apiKey) {
        this._applySettings(Number(userId), apiKey);
        return true;
    }

    return false;
};

/**
 * Clear stored settings
 */
ZoteroSdk.prototype.clearSettings = function () {
    localStorage.removeItem(this.STORAGE_KEYS.USER_ID);
    localStorage.removeItem(this.STORAGE_KEYS.API_KEY);
    this._userGroups = [];
    this._userId = 0;
    this._apiKey = null;
};

/**
 * Get user ID
 */
ZoteroSdk.prototype.getUserId = function () {
    return this._userId;
};

/**
 * Set online availability
 * @param {boolean} isOnline
 */
ZoteroSdk.prototype.setIsOnlineAvailable = function (isOnline) {
    this._isOnlineAvailable = isOnline;
};

export { ZoteroSdk };
