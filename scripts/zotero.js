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
(function () {
    if (!window.Asc.plugin.zotero) window.Asc.plugin.zotero = {};
    window.Asc.plugin.zotero.api = function (cfg) {
        var apiKey;
        var userId;
        var userGroups = [];
        var baseUrl = cfg.baseUrl || "https://api.zotero.org/";

        function getRequest(url) {
            return new Promise(function (resolve, reject) {
                var headers = {
                    "Zotero-API-Version": "3"
                };
                if (apiKey) headers["Zotero-API-Key"] = apiKey;
                fetch(url, {
                    headers: headers
                }).then(function (res) {
                    if (!res.ok) throw new Error(res.status + " " + res.statusText);
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        function buildGetRequest(path, query) {
            var url = new URL(path, baseUrl);
            for (var key in query) url.searchParams.append(key, query[key]);
            return getRequest(url);
        }

        function items(search) {
            return new Promise(function (resolve, reject) {
                parseItemsResponse(buildGetRequest("users/" + userId + "/items", {
                    q: search
                }), resolve, reject);
            });
        }

		function groups(search, groupId) {
            return new Promise(function (resolve, reject) {
				parseItemsResponse(buildGetRequest("groups/" + groupId + "/items", {
					q: search
				}), resolve, reject);
            });
        }

		function getUserGropus() {
			return userGroups;
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

        function getUserId(key) {
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

        function parseItemsResponse(promise, resolve, reject) {
            promise.then(function (res) {
                res.json().then(function (json) {
                    var links = parseLinkHeader(res.headers.get("Link"));
                    var obj = {
                        items: json
                    };
                    if (links.next) {
                        obj.next = function () {
                            return new Promise(function (rs, rj) {
                                parseItemsResponse(getRequest(links.next), rs, rj);
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

        return {
            items: items,
			groups: groups,
			getUserGropus: getUserGropus,
            format: format,
            hasSettings: getSettings,
            clearSettings: clearSettings,
            setApiKey: getUserId
        }
    }
})();
