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

// @ts-check

/// <reference path="../types-global.js" />
/// <reference path="./types.js" />

import { zoteroEnvironment } from "./zotero-environment";
import { RateLimitedFetcher } from "./zotero-api-fetcher";
import { ZOTERO_TYPE_TO_CSL } from "../csl/zotero-type-map";

const ZoteroSdk = function () {
    this._apiKey = null;
    this._userId = 0;
    /** @type {Array<UserGroupInfo>}} */
    this._userGroups = [];
    this._userGroupsLoaded = false;
    this._isOnlineAvailable = true;

    this._fetcher = new RateLimitedFetcher({
        maxRetries: 5,
        initialDelay: 5000,
    });
    
    this.MAX_KEYS_PER_REQUEST = 50;

    
    // Zotero creatorType -> CSL name variable. Only maps to variables this
    // plugin's own CitationItemData actually recognizes (see its
    // fillFromObject); anything not listed here falls back to "author".
    this._zoteroCreatorTypeToCsl = {
        "author": "author",
        "bookAuthor": "container-author",
        "castMember": "performer",
        "chair": "chair",
        "compiler": "compiler",
        "composer": "composer",
        "contributor": "contributor",
        "curator": "curator",
        "director": "director",
        "editor": "editor",
        "editorialDirector": "editorial-director",
        "executiveProducer": "executive-producer",
        "guest": "guest",
        "host": "host",
        "illustrator": "illustrator",
        "interviewee": "author",
        "narrator": "narrator",
        "organizer": "organizer",
        "originalAuthor": "original-author",
        "performer": "performer",
        "podcaster": "host",
        "producer": "producer",
        "recipient": "recipient",
        "reviewedAuthor": "reviewed-author",
        "seriesCreator": "series-creator",
        "seriesEditor": "collection-editor",
        "translator": "translator",
    };

};

// Constants
ZoteroSdk.prototype.ZOTERO_API_VERSION = "3";
ZoteroSdk.prototype.USER_AGENT = "AscDesktopEditor";
/** @type {"csljson"|"json"} */
ZoteroSdk.prototype.DEFAULT_FORMAT = "csljson";
/**
 * Page size of a search against the local Zotero API. Unlike the web API it
 * answers with every match at once when no limit is given.
 */
ZoteroSdk.prototype.DESKTOP_PAGE_SIZE = 25;
ZoteroSdk.prototype.STORAGE_KEYS = {
    USER_ID: "zoteroUserId",
    API_KEY: "zoteroApiKey",
};
ZoteroSdk.prototype.API_PATHS = {
    USERS: "users",
    GROUPS: "groups",
    ITEMS: "items",
    TOP: "top",
    COLLECTIONS: "collections",
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
                "Cache-Control": "no-cache",
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
 * @param {AbortSignal} [signal] - cancels the request, see RateLimitedFetcher
 * @returns {Promise<FetchResponse>}
 */
ZoteroSdk.prototype._getOnlineRequest = function (url, signal) {
    const headers = {
        "Zotero-API-Version": this.ZOTERO_API_VERSION,
        "Zotero-API-Key": this._apiKey || "",
    };

    // Queued: a search over several libraries must not reach the API as a
    // burst of parallel requests.
    return this._fetcher
        .fetchWithRetry(url, headers, signal)
        .then(function (response) {
            if (!response.ok) {
                const message = response.status + " " + response.statusText;
                console.error(message);
                throw new Error(message);
            }
            return response;
        })
        .catch(function (error) {
            // A cancelled request is not a failed connection.
            if (typeof error === "object" && error.name !== "AbortError") {
                error.message = "Connection to Zotero failed";
            }
            throw error;
        });
};

/**
 * Universal request handler with offline support
 * @param {URL} url
 * @param {AbortSignal} [signal] - cancels an online request
 * @returns {Promise<AscSimpleResponse | FetchResponse>}
 */
ZoteroSdk.prototype._getRequestWithOfflineSupport = function (url, signal) {
    return this._isOnlineAvailable
        ? this._getOnlineRequest(url, signal)
        : this._getDesktopRequest(url.href);
};

/**
 * Build URL and make GET request
 * @param {string} path
 * @param {Object<string, string>} [queryParams]
 * @param {AbortSignal} [signal] - cancels an online request
 * @returns {Promise<AscSimpleResponse | FetchResponse>}
 */
ZoteroSdk.prototype._buildGetRequest = function (path, queryParams, signal) {
    queryParams = queryParams || {};
    var url = new URL(path, this._getBaseUrl());

    Object.keys(queryParams).forEach(function (key) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            url.searchParams.append(key, queryParams[key]);
        }
    });

    return this._getRequestWithOfflineSupport(url, signal);
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
 * @param {number|string} id
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._parseDesktopItemsResponse = function (
    promise,
    id
) {
    
    return promise
        .then(function (response) {
            return {
                items: JSON.parse(response.responseText),
                id: id,
            };
        })
};

/**
 * Parse response for online mode with pagination support
 * @param {Promise<FetchResponse>} promise
 * @param {number|string} id
 * @param {AbortSignal} [signal] - the next page is cancelled with the first
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._parseItemsResponse = function (
    promise,
    id,
    signal
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
                    return self._parseItemsResponse(
                        self._getOnlineRequest(new URL(links.next), signal),
                        id,
                        signal
                    );
                };
            }

            return result;
        });
};

/**
 * Universal items response parser
 * @param {Promise<AscSimpleResponse | FetchResponse>} promise
 * @param {number|string} id
 * @param {AbortSignal} [signal] - cancels the further pages of an online answer
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._parseResponse = function (promise, id, signal) {
    /** @type {Promise<SearchResult>} */
    let result = Promise.resolve({items:[], id: 0});
    if (this._isOnlineAvailable) {
        const fetchPromise = /** @type {Promise<FetchResponse>} */ (promise);
        result = this._parseItemsResponse(fetchPromise, id, signal);
    } else {
        const ascSimplePromise = /** @type {Promise<AscSimpleResponse>} */ (
            promise
        );
        result = this._parseDesktopItemsResponse(
            /** @type {Promise<AscSimpleResponse>} */ ascSimplePromise,
            id
        );
    }
    return result;
};

/**
 * One page of a search against the local Zotero API. Its answers reach the
 * plugin without headers, so there is no Link to follow: a full page stands
 * for "there may be more"
 * @param {string} path - of the items to search, see _getListPath
 * @param {{format: "csljson"|"json", q?: string, itemKey?: string, itemType?: string}} queryParams
 * @param {number|string} id
 * @param {number} start
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._getDesktopSearchPage = function (path, queryParams, id, start) {
    const self = this;
    const limit = this.DESKTOP_PAGE_SIZE;
    const withCsl = queryParams.format === "csljson";
    /** @type {Object<string, string>} */
    const pageParams = {
        format: queryParams.format,
        limit: String(limit),
        start: String(start),
    };
    if (queryParams.q) pageParams.q = queryParams.q;
    if (queryParams.itemType) pageParams.itemType = queryParams.itemType;
    if (withCsl) {
        // Zotero answers local requests one at a time and each search costs
        // the same whatever the format, so the CSL comes along with the
        // json answer instead of in a request of its own.
        pageParams.format = "json";
        pageParams.include = "csljson";
    }
    const response = this._parseResponse(
        this._buildGetRequest(path, pageParams),
        id
    );
    return response.then(function (res) {
        if (withCsl && Array.isArray(res.items)) {
            res.items = res.items.map(function (/** @type {any} */ item) {
                return (
                    self._parseIncludedCsl(item.csljson) ||
                    self._convertJsonToCsl(item)
                );
            });
        }
        if (Array.isArray(res.items) && res.items.length === limit) {
            res.next = function () {
                return self._getDesktopSearchPage(
                    path,
                    queryParams,
                    id,
                    start + limit
                );
            };
        }
        return res;
    });
};

/**
 * The CSL item Zotero put next to an API item on include=csljson. The local
 * API sends it as the text of a one-item array, the web API as the object
 * itself. Its id is the item's zotero.org URI, as in a csljson answer.
 * @param {any} included
 * @returns {SearchResultItem|null} null if there is none or it cannot be read
 */
ZoteroSdk.prototype._parseIncludedCsl = function (included) {
    let csl = included;
    if (typeof csl === "string") {
        try {
            csl = JSON.parse(csl);
        } catch (e) {
            return null;
        }
    }
    if (Array.isArray(csl)) {
        csl = csl[0];
    }
    return csl && typeof csl === "object" && csl.id ? csl : null;
};

/**
 * The path a search or the list of recent items is read from: top-level
 * items only. Child notes and attachments cannot be cited, would fill the
 * pages of results, and leaving them out makes the local search several
 * times faster.
 * @param {string} itemsPath - the items path of a library
 * @returns {string}
 */
ZoteroSdk.prototype._getListPath = function (itemsPath) {
    return itemsPath + "/" + this.API_PATHS.TOP;
};

/**
 * Get items from user library
 * @param {string|null} search
 * @param {string[]|null} [itemsID]
 * @param {"csljson"|"json"} [format]
 * @param {AbortSignal} [signal] - cancels the search and its further pages
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getItems = function (search, itemsID, format, signal) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;

    /** @type {{format: "csljson"|"json", q?: string, itemKey?: string, limit?: number, itemType?: string}} */
    let queryParams = {
        format: format,
    };

    if (search) {
        queryParams.q = search;
        queryParams.itemType = "-attachment"; // skip attachments (pdf, docx, etc.)
    } else if (itemsID) {
        queryParams.itemKey = itemsID.join(",");
        // No itemType filter here on purpose: a negated itemType makes the
        // local Zotero API search the whole library instead of addressing
        // the keys directly, and it is pointless when the keys are known.
    } else {
        queryParams.limit = 20;
        queryParams.itemType = "-attachment"; // skip attachments (pdf, docx, etc.)
    }

    var path =
        self.API_PATHS.USERS +
        "/" +
        self._userId +
        "/" +
        self.API_PATHS.ITEMS;
    if (!itemsID) {
        path = self._getListPath(path);
    }
    if (search && !this._isOnlineAvailable) {
        return this._getDesktopSearchPage(path, queryParams, self._userId, 0);
    }
    const request = self._buildGetRequest(path, queryParams, signal);
    const response = self._parseResponse(request, self._userId, signal);
    
    if (!this._isOnlineAvailable && format === "csljson") {
        return this._addJsonToClsJsonItemsResponse(response, path, queryParams);
    }
    return response;
};

/**
 * Get items from group library
 * @param {string | null} search
 * @param {number|string} groupId
 * @param {string[]} [itemsID]
 * @param {"csljson"|"json"} [format]
 * @param {AbortSignal} [signal] - cancels the search and its further pages
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getGroupItems = function (
    search,
    groupId,
    itemsID,
    format,
    signal
) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;

    var queryParams =
        /** @type {{format: "csljson"|"json", q?: string, itemKey?: string, itemType?: string}} */ ({
            format: format,
        });

    if (search) {
        queryParams.q = search;
        queryParams.itemType = "-attachment"; // as in getItems
    } else if (itemsID) {
        queryParams.itemKey = itemsID.join(",");
    }

    var path =
        self.API_PATHS.GROUPS + "/" + groupId + "/" + self.API_PATHS.ITEMS;
    if (!itemsID) {
        path = self._getListPath(path);
    }
    if (search && !this._isOnlineAvailable) {
        return this._getDesktopSearchPage(path, queryParams, groupId, 0);
    }
    var request = self._buildGetRequest(path, queryParams, signal);
    var response = self._parseResponse(request, groupId, signal);

    // As in getItems: local csljson results cannot be traced back to the
    // library, and plain json ones carry no title the result list can show,
    // so the two are merged.
    if (!this._isOnlineAvailable && format === "csljson") {
        return this._addJsonToClsJsonItemsResponse(response, path, queryParams);
    }
    return response;

};

/**
 * The path of a library: the user's or a group's.
 * @param {number|string|null} groupId - null for the user library
 * @returns {string}
 */
ZoteroSdk.prototype._getLibraryPath = function (groupId) {
    return groupId
        ? this.API_PATHS.GROUPS + "/" + groupId
        : this.API_PATHS.USERS + "/" + this._userId;
};

/**
 * Every collection of a library, subcollections included.
 * @param {number|string|null} groupId - null for the user library
 * @returns {Promise<Array<ZoteroCollection>>}
 */
ZoteroSdk.prototype.getCollections = function (groupId) {
    const path =
        this._getLibraryPath(groupId) + "/" + this.API_PATHS.COLLECTIONS;
    /** @type {Object<string, string>} */
    const queryParams = { format: "json" };
    // The web API answers 25 at a time unless asked for more; the local one
    // sends them all.
    if (this._isOnlineAvailable) {
        queryParams.limit = "100";
    }
    /** @type {Array<ZoteroCollection>} */
    const collections = [];
    /**
     * @param {SearchResult} res
     * @returns {Promise<Array<ZoteroCollection>>|Array<ZoteroCollection>}
     */
    const collect = function (res) {
        const items = Array.isArray(res.items) ? res.items : [];
        items.forEach(function (/** @type {any} */ item) {
            const data = item && item.data;
            if (!data || !item.key) {
                return;
            }
            collections.push({
                key: item.key,
                name: data.name || "",
                parentCollection: data.parentCollection || null,
                numItems: item.meta ? item.meta.numItems : undefined,
            });
        });
        return res.next ? res.next().then(collect) : collections;
    };
    return this._parseResponse(
        this._buildGetRequest(path, queryParams),
        groupId || this._userId
    ).then(collect);
};

/** The fewest results a page of searchCollections holds, unless no more. */
ZoteroSdk.prototype.COLLECTIONS_PAGE_SIZE = 25;

/**
 * Searches some collections of one library: the items right in them, top
 * level only, each item once. The collections are read one after another,
 * the next one when the previous has no more results, and a page goes on
 * into the next collections until it holds COLLECTIONS_PAGE_SIZE results:
 * the list loads more only when scrolled, and a short one cannot be.
 * @param {string} search
 * @param {number|string|null} groupId - null for the user library
 * @param {Array<string>} collectionKeys
 * @param {AbortSignal} [signal] - cancels the search and its further pages
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.searchCollections = function (
    search,
    groupId,
    collectionKeys,
    signal
) {
    const self = this;
    const id = groupId || this._userId;
    if (collectionKeys.length === 0) {
        return Promise.resolve({ items: [], id: id });
    }
    /** @type {Set<string>} */
    const seen = new Set();
    /**
     * @param {number} index - of the collection to read
     * @param {(function(): Promise<SearchResult>)|null} nextPage - of that
     *  collection; its first page when null
     * @param {Array<SearchResultItem>} found - the results of this page so
     *  far
     * @returns {Promise<SearchResult>}
     */
    const read = function (index, nextPage, found) {
        const page = nextPage
            ? nextPage()
            : self._searchCollection(
                  search,
                  groupId,
                  collectionKeys[index],
                  signal
              );
        return page.then(function (res) {
            // An item can be in several of the collections.
            const fresh = (res.items || []).filter(function (item) {
                if (seen.has(item.id)) {
                    return false;
                }
                seen.add(item.id);
                return true;
            });
            const items = found.concat(fresh);
            const pageAfter = res.next || null;
            const nextIndex = pageAfter ? index : index + 1;
            /** @type {SearchResult} */
            const result = { items: items, id: id };
            if (nextIndex >= collectionKeys.length) {
                return result;
            }
            if (items.length >= self.COLLECTIONS_PAGE_SIZE) {
                result.next = function () {
                    return read(nextIndex, pageAfter, []);
                };
                return result;
            }
            return read(nextIndex, pageAfter, items);
        });
    };
    return read(0, null, []);
};

/**
 * The first page of a search in one collection.
 * @param {string} search
 * @param {number|string|null} groupId - null for the user library
 * @param {string} collectionKey
 * @param {AbortSignal} [signal]
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._searchCollection = function (
    search,
    groupId,
    collectionKey,
    signal
) {
    const id = groupId || this._userId;
    const path = this._getListPath(
        this._getLibraryPath(groupId) +
            "/" +
            this.API_PATHS.COLLECTIONS +
            "/" +
            collectionKey +
            "/" +
            this.API_PATHS.ITEMS
    );
    /** @type {{format: "csljson"|"json", q?: string, itemType?: string}} */
    const queryParams = {
        format: this.DEFAULT_FORMAT,
        q: search,
        itemType: "-attachment", // as in getItems
    };
    if (!this._isOnlineAvailable) {
        return this._getDesktopSearchPage(path, queryParams, id, 0);
    }
    return this._parseResponse(
        this._buildGetRequest(path, queryParams, signal),
        id,
        signal
    );
};

/**
 * Searches the user library across all fields, which also matches CSL
 * citation keys such as the ones Better BibTeX pins. Used to re-link a
 * citation whose stored id is a citation key rather than a Zotero item key.
 * @param {string} query
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.searchUserItemsEverything = function (query) {
    var path =
        this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS;
    var request = this._buildGetRequest(path, {
        format: "json",
        q: query,
        qmode: "everything",
        itemType: "-attachment",
        limit: 10,
    });
    return this._parseResponse(request, this._userId);
};

/**
 * Gets one item of the user library by key. Uses the single-item endpoint
 * rather than the list endpoint with itemKey, because the list also returns
 * the item's child notes and attachments, and in csljson format entries are
 * identified by CSL citation key, so a multi-entry answer cannot be matched
 * back to what was asked for.
 * @param {string} itemKey
 * @param {"csljson"|"json"} [format]
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getItemByKey = function (itemKey, format) {
    var path =
        this.API_PATHS.USERS +
        "/" +
        this._userId +
        "/" +
        this.API_PATHS.ITEMS +
        "/" +
        itemKey;
    var request = this._buildGetRequest(path, {
        format: format || this.DEFAULT_FORMAT,
    });
    return this._parseResponse(request, this._userId);
};

/**
 * @param {Array<string>} keys - at most MAX_KEYS_PER_REQUEST
 * @param {number|string|null} groupId - null for the user library
 * @param {"csljson"|"json"} format - what `data` holds: the CSL item or the
 *  API item
 * @returns {Promise<Array<{key: string, data: any}>>} the items found
 */
ZoteroSdk.prototype.getItemsByKeys = function (keys, groupId, format) {
    var self = this;
    if (!this._isOnlineAvailable) {
        return Promise.all(
            keys.map(function (key) {
                var request = groupId
                    ? self.getGroupItemByKey(groupId, key, format)
                    : self.getItemByKey(key, format);
                return request.then(
                    function (res) {
                        // The local API's answers are not always the array
                        // SearchResult declares.
                        var items = /** @type {any} */ (res && res.items);
                        // A csljson answer may come in the web API's
                        // {items: [...]} container or as a bare array.
                        if (items && !Array.isArray(items) && Array.isArray(items.items)) {
                            items = items.items;
                        }
                        if (!Array.isArray(items)) {
                            items = items ? [items] : [];
                        }
                        return items.length === 1
                            ? { key: key, data: items[0] }
                            : null;
                    },
                    function (error) {
                        console.warn("Failed to read item " + key + ":", error);
                        return null;
                    }
                );
            })
        ).then(function (found) {
            return found.filter(function (item) {
                return item !== null;
            });
        });
    }

    var path = groupId
        ? this.API_PATHS.GROUPS + "/" + groupId + "/" + this.API_PATHS.ITEMS
        : this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS;
    /** @type {Object<string, string>} */
    var queryParams = {
        format: "json",
        itemKey: keys.join(","),
        limit: String(this.MAX_KEYS_PER_REQUEST),
    };
    if (format === "csljson") {
        queryParams.include = "csljson";
    }
    var request = this._buildGetRequest(path, queryParams);
    return this._parseResponse(request, groupId || this._userId).then(
        function (res) {
            var items = Array.isArray(res.items) ? res.items : [];
            return items
                .filter(function (/** @type {any} */ item) {
                    return item && item.key;
                })
                .map(function (/** @type {any} */ item) {
                    return {
                        key: item.key,
                        data: format === "csljson"
                            ? self._parseIncludedCsl(item.csljson)
                            : item,
                    };
                });
        }
    );
};

/**
 * Gets one item of a group library by key. See getItemByKey.
 * @param {number|string} groupId
 * @param {string} itemKey
 * @param {"csljson"|"json"} [format]
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype.getGroupItemByKey = function (groupId, itemKey, format) {
    var path =
        this.API_PATHS.GROUPS +
        "/" +
        groupId +
        "/" +
        this.API_PATHS.ITEMS +
        "/" +
        itemKey;
    var request = this._buildGetRequest(path, {
        format: format || this.DEFAULT_FORMAT,
    });
    return this._parseResponse(request, groupId);
};

/**
 * Get user groups
 * @returns {Promise<Array<UserGroupInfo>>}
 */
ZoteroSdk.prototype.getUserGroups = function () {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (self._userGroupsLoaded) {
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
                self._userGroupsLoaded = true;
                resolve(self._userGroups);
            })
            .catch(reject);
    });
};

/**
 * @param {Promise<SearchResult>} response 
 * @param {string} path 
 * @param {{format: "csljson"|"json", q?: string, itemKey?: string, limit?: number|string, start?: string, itemType?: string}} queryParams 
 * @returns {Promise<SearchResult>}
 */
ZoteroSdk.prototype._addJsonToClsJsonItemsResponse = function (response, path, queryParams) {
    queryParams.format = "json";
    const requestJson = this._buildGetRequest(path, queryParams);
    const responseJson = this._parseResponse(requestJson, this._userId).then(
        (res) => {
            res.items = res.items.map((item) => this._convertJsonToCsl(item));
            return res;
        }
    );
    return Promise.all([response, responseJson])
            .then(([csljsonResult, jsonResult]) => {
                const jsonItems = jsonResult.items;
                csljsonResult.items = csljsonResult.items.map((cslItem) => {
                    let key = cslItem.id;
                    const slashIndex = key.indexOf("/");
                    if (slashIndex !== -1) {
                        key = key.substring(slashIndex + 1);
                    }
                    const jsonItem = jsonItems.find(
                        (item) => key === item.id
                    );
                    
                    if (!jsonItem) {
                        return cslItem;
                    }
                    const merged = { ...cslItem, id: jsonItem.id };
                    // Union, not replacement: the two answers describe the
                    // same item through different links, and either side may
                    // know a uri the other does not.
                    const uris = (cslItem.uris || []).concat(
                        jsonItem.uris || []
                    );
                    if (uris.length) {
                        merged.uris = uris.filter(function (uri, i) {
                            return uris.indexOf(uri) === i;
                        });
                    }
                    return merged;
                });
                return csljsonResult;
            });
}

/**
 * @param {any} item 
 * @returns {SearchResultItem}
 */
ZoteroSdk.prototype._convertJsonToCsl = function (item) {
    const self = this;
    if (item.id || !item.key) return item;
    var d = item.data || {};
    /** @type {SearchResultItem} */
    const res = {
        id: item.key,
        title: d.title || "",
        type: ZOTERO_TYPE_TO_CSL[d.itemType] || d.itemType || "",
    };

    // creators → CSL name variables. Zotero's creatorType values don't
    // match CSL's variable names 1:1 (e.g. "seriesEditor" -> "collection-editor",
    // "bookAuthor" -> "container-author") - unmapped/unrecognized types
    // fall back to "author" so the person isn't silently dropped.
    if (Array.isArray(d.creators)) {
        d.creators.forEach(function (/** @type {any} */ c) {
            var name = {};
            if (c.firstName) name.given = c.firstName;
            if (c.lastName) name.family = c.lastName;
            if (c.name) name.literal = c.name;
            var cslRole = self._zoteroCreatorTypeToCsl[c.creatorType] || "author";
            if (!res[cslRole]) res[cslRole] = [];
            if (Object.keys(name).length > 0) {
                res[cslRole].push(name);
            }
        });
    }

    // date → issued. Zotero's "date" is free text; only a plain
    // "YYYY", "YYYY-MM" or "YYYY-MM-DD" (or "/"-separated) shape can be
    // safely turned into date-parts here - year ranges ("2019-2020"),
    // circa dates, season names etc. are left unset rather than
    // mangled (the old `.split("-").map(Number)` read "2019-2020" as
    // year 2019/month 2020, and dropped the sign off BCE dates like "-0099").
    if (d.date) {
        var dateMatch = /^(-?\d{1,4})(?:[-/](\d{1,2}))?(?:[-/](\d{1,2}))?$/.exec(d.date.trim());
        if (dateMatch) {
            var parts = [Number(dateMatch[1])];
            if (dateMatch[2]) parts.push(Number(dateMatch[2]));
            if (dateMatch[3]) parts.push(Number(dateMatch[3]));
            res.issued = { "date-parts": [parts] };
        }
    }

    // simple 1-to-1 fields (Zotero name → CSL name)
    if (d.url) res.URL = d.url;
    if (d.volume) res.volume = d.volume;
    if (d.issue) res.issue = d.issue;
    if (d.pages) res.page = d.pages;
    if (d.edition) res.edition = d.edition;
    if (d.language) res.language = d.language;
    if (d.abstractNote) res.abstract = d.abstractNote;
    if (d.note) res.note = d.note;
    if (d.shortTitle) res.shortTitle = d.shortTitle;
    if (d.publisher) res.publisher = d.publisher;
    if (d.place) res["publisher-place"] = d.place;
    if (d.DOI) res.DOI = d.DOI;
    if (d.ISBN) res.ISBN = d.ISBN;
    if (d.ISSN) res.ISSN = d.ISSN;
    if (d.publicationTitle) res["container-title"] = d.publicationTitle;
    if (d.bookTitle) res["container-title"] = d.bookTitle;
    if (d.series) res["collection-title"] = d.series;
    if (d.seriesNumber) res["collection-number"] = d.seriesNumber;
    if (d.numberOfVolumes) res["number-of-volumes"] = d.numberOfVolumes;
    if (d.numPages) res["number-of-pages"] = d.numPages;

    // uris from links
    if (item.links) {
        res.uris = [];
        if (item.links.self) res.uris.push(item.links.self.href);
        if (item.links.alternate) res.uris.push(item.links.alternate.href);
    }

    return res;
}


/**
 * Set API key and validate it
 * @param {string} key
 */
ZoteroSdk.prototype.setApiKey = function (key) {
    var self = this;
    var path = this.API_PATHS.KEYS + "/" + key;

    var url = new URL(path, zoteroEnvironment.restApiUrl);

    return this._getOnlineRequest(url)
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
    this._userGroupsLoaded = false;
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
