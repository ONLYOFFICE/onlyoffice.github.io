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
(function () {
    if (!window.Asc.plugin.zotero) window.Asc.plugin.zotero = {};

    window.Asc.plugin.zotero.isLocalDesktop = (function(){
		if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0)
			return false;
		if (window.location && window.location.protocol == "file:")
			return true;
		if (window.document && window.document.currentScript && 0 == window.document.currentScript.src.indexOf("file:///"))
			return true;
		return false;
	})();
    window.Asc.plugin.zotero.isOnlineAvailable = !window.Asc.plugin.zotero.isLocalDesktop;

    window.Asc.plugin.zotero.api = function (cfg) {
        var apiKey;
        var userId = 0;
        var userGroups = [];
        var restApiUrl = "https://api.zotero.org/";
        var desktopApiUrl = "http://127.0.0.1:23119/api/"; // users/0/items"
        var baseUrl = cfg.baseUrl || restApiUrl;
        // https://raw.githubusercontent.com/citation-style-language/locales/master/locales-af-ZA.xml
        // https://cdn.jsdelivr.net/gh/citation-style-language/locales@master/locales-
        var LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/";
        var LOCALES_LOCAL_URL = "./resources/csl/locales/";

        function getRequestWithOfflineSupport(url) {
            if (window.Asc.plugin.zotero.isOnlineAvailable) {
                return getRequest(url);
            } else {
                return getDesktopRequest(url.href);
            }
        }

        /**
         * Make a GET request to the local Zotero API.
         * @param {string} url - URL of the request.
         * @returns {Promise<{responseStatus: number, responseText: string, status: string, statusCode: number}>}
         */
        function getDesktopRequest(url) {
            return new Promise(function (resolve, reject) {
                window.AscSimpleRequest.createRequest({
                    url: url,
                    method: "GET",
                    headers: {
                        "Zotero-API-Version": "3",
                        "User-Agent": "AscDesktopEditor",
                    },
                    complete: function(e) {
                        resolve(e);
                    },
                    error: function(e) {
                        if ( e.statusCode == -102 ) e.statusCode = 404;
                        reject(e);
                    }
                }); 
            });
        }

        /**
         * Make a GET request to the online Zotero API.
         * @param {string} url - URL of the request.
         * @returns {Promise<{body: ReadableStream, bodyUsed: boolean, headers: Headers, ok: boolean, redirected: boolean, status: string, statusText: string, type: string, url: string}>}
         */
        function getRequest(url) {
            return new Promise(function (resolve, reject) {
                var headers = {
                    "Zotero-API-Version": "3"
                };
                if (apiKey) headers["Zotero-API-Key"] = apiKey;
                fetch(url, {
                    headers: headers
                }).then(function (res) {
                    if (!res.ok) { 
                        reject(new Error(res.status + " " + res.statusText));
                        return;
                    };
                    resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
            });
        }

        function buildGetRequest(path, query) {
            var url = new URL(path, baseUrl);
            if (!window.Asc.plugin.zotero.isOnlineAvailable) {
                url = new URL(path, desktopApiUrl);
            }
            for (var key in query) url.searchParams.append(key, query[key]);
            return getRequestWithOfflineSupport(url);
        }

        function items(search, itemsID) {
            return new Promise(function (resolve, reject) {
				var props = {
					format: "csljson"
                };
				if (search) {
					props.q = search;
				} else if (itemsID) {
					props.itemKey = itemsID.join(',');
				}
                if (window.Asc.plugin.zotero.isOnlineAvailable) {
                    parseItemsResponse(buildGetRequest("users/" + userId + "/items", props), resolve, reject, userId);
                } else {
                    parseDesktopItemsResponse(buildGetRequest("users/" + userId + "/items", props), resolve, reject, userId);
                }
                
            });
        }

		function groups(search, groupId, itemsID) {
            return new Promise(function (resolve, reject) {
				var props = {
					format: "csljson"
                };
				if (search) {
					props.q = search;
				} else if (itemsID) {
					props.itemKey = itemsID.join(',');
				}
                if (window.Asc.plugin.zotero.isOnlineAvailable) {
                    parseItemsResponse(buildGetRequest("groups/" + groupId + "/items", props), resolve, reject, groupId);
                } else {
                    parseDesktopItemsResponse(buildGetRequest("groups/" + groupId + "/items", props), resolve, reject, groupId);
                }
            });
        }

        function getLocale(langTag) {
            let url = LOCALES_LOCAL_URL;
            if (window.Asc.plugin.zotero.isOnlineAvailable) {
                url = LOCALES_URL;
            }
            return fetch(url + "locales-" + langTag + ".xml")
                .then(function (resp) { return resp.text(); });
        }

		function getUserGroups() {
			return userGroups;
		}

		function getUserId() {
			return userId;
		}

        function format(ids, key, style, locale) {
            return new Promise(function (resolve, reject) {
				var request;
				if (key) {
					request = buildGetRequest("groups/" + key + "/items", {
						format: "bib",
						style: style,
						locale: locale,
						itemKey: ids.join(",")
					})
				} else {
					request = buildGetRequest("users/" + userId + "/items", {
						format: "bib",
						style: style,
						locale: locale,
						itemKey: ids.join(",")
					})
				}
                request.then(function (res) {
                    resolve(res.text());
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function setApiKey(key) {
            return new Promise(function (resolve, reject) {
                buildGetRequest("keys/" + key)
                    .then(function (res) {
                        if (!res.ok) throw new Error(res.status + " " + res.statusText);
                        return res.json();
                    }).then(function (res) {
                        saveSettings(res.userID, key);
                        resolve(true);
                    }).catch(function (err) {
                        reject(err);
                    });
            });
        }

        function applySettings(id, key) {
            userId = id;
            apiKey = key;
        }

        function saveSettings(id, key) {
			applySettings(id, key);
            localStorage.setItem("zoteroUserId", id);
            localStorage.setItem("zoteroApiKey", key);
			buildGetRequest("users/" + id + "/groups")
			.then(function (res) {
				if (!res.ok) throw new Error(res.status + " " + res.statusText);
				return res.json();
			}).then(function (res) {
				res.forEach(function(el) {
					userGroups.push(el.id);
				});
				localStorage.setItem("zoteroUserGroups", userGroups.join(';'));
			}).catch(function (err) {
				throw new Error(err)
			});
        }

        function getSettings() {
            var uid = localStorage.getItem("zoteroUserId");
            var key = localStorage.getItem("zoteroApiKey");
			var groups = localStorage.getItem("zoteroUserGroups");
			if (groups)
            	userGroups = groups.split(';');

            var configured = !(!uid || !key);
            if (configured) applySettings(uid, key);
            return configured;
        }

        function clearSettings() {
            localStorage.removeItem("zoteroUserId");
            localStorage.removeItem("zoteroApiKey");
            localStorage.removeItem("zoteroUserGroups");
			userGroups = [];
        }

        /**
         * @param {Promise} promise - promise from items request
         * @param {function} resolve - resolve function for returned promise
         * @param {function} reject - reject function for returned promise
         * @param {string} id - id of request
         * @returns {Promise<{items: {items: Array<Object>}, id: string}}>} promise with items and optional next function
         */
        function parseDesktopItemsResponse(promise, resolve, reject, id) {
            promise.then(function (res) {
                var obj = {
                    items: {items: JSON.parse(res.responseText)},
                    id: id
                };
                resolve(obj);
            }).catch(function (err) {
                reject(err);
            });
        }

        /**
         * @param {Promise} promise - promise from items request
         * @param {function} resolve - resolve function for returned promise
         * @param {function} reject - reject function for returned promise
         * @param {string} id - id of request
         * @returns {Promise<{items: {items: Array<Object>}, id: string}}>} promise with items and optional next function
         */
        function parseItemsResponse(promise, resolve, reject, id) {
            promise.then(function (res) {
                res.json().then(function (json) {
                    var links = parseLinkHeader(res.headers.get("Link"));
                    var obj = {
                        items: json,
						id: id
                    };
                    if (links.next) {
                        console.error('next', links.next);
                        obj.next = function () {
                            return new Promise(function (rs, rj) {
                                parseItemsResponse(getRequest(links.next), rs, rj, id);
                            });
                        }
                    }
                    resolve(obj);
                });
            }).catch(function (err) {
                reject(err);
            });
        }

        var linkHeaderRegex = /<(.*?)>; rel="(.*?)"/g;
        function parseLinkHeader(headerValue) {
            var links = {};
            if (!headerValue) return links;
            headerValue = headerValue.trim();
            if (!headerValue) return links;

            var match;
            while ((match = linkHeaderRegex.exec(headerValue)) !== null) {
                links[match[2]] = match[1];
            }

            return links;
        }

        /**
         * @returns {Promise<{desktop: boolean, online: boolean, permissionNeeded: boolean}>}
         */
        function isApiAvailable() {
            return new Promise(function (resolve) {
                let apiAvailable = {
                    desktop: false,
                    online: navigator.onLine,
                    permissionNeeded: false
                };
                getDesktopRequest(desktopApiUrl).then(function (res) {
                    if (res.responseStatus == 403) {
                        apiAvailable.permissionNeeded = true;
                    } 
                    return res.responseStatus === 200;
                }).catch(function() {
                    return false;
                }).then(function (isDesktopAvailable) {
                    apiAvailable.desktop = isDesktopAvailable;
                    window.Asc.plugin.zotero.isLocalDesktop = apiAvailable.desktop;
                    window.Asc.plugin.zotero.isOnlineAvailable = apiAvailable.online;
                    resolve(apiAvailable);
                });
            });
            
        }

        return {
            items: items,
			groups: groups,
			getUserGroups: getUserGroups,
            format: format,
            hasSettings: getSettings,
            clearSettings: clearSettings,
            setApiKey: setApiKey,
			getUserId: getUserId,
            isApiAvailable: isApiAvailable,
            getLocale: getLocale,
        }
    }
})();
