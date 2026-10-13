/*
 * Asyntai AI Assistant for ONLYOFFICE
 * Copyright (c) Asyntai. Licensed under the GNU AGPL v3.
 *
 * Thin client for the Asyntai public API. Every call in the plugin goes
 * through here, so the base URL, the auth header and the error wording exist
 * in one place. It has no editor dependency, so the tests run it in Node.
 */
(function (root) {
	"use strict";

	var DEFAULT_BASE = "https://asyntai.com";
	var TIMEOUT_MS = 60000;

	function AsyntaiError(message, status) {
		this.name = "AsyntaiError";
		this.message = message;
		this.status = status || 0;
	}
	AsyntaiError.prototype = Object.create(Error.prototype);
	AsyntaiError.prototype.constructor = AsyntaiError;

	function baseUrl() {
		// The test rig sets ASYNTAI_API_BASE to point the panel at a local
		// stand-in API. In the editor it is never set.
		var custom = root && root.ASYNTAI_API_BASE;
		return (typeof custom === "string" && /^https?:\/\//.test(custom))
			? custom.replace(/\/+$/, "")
			: DEFAULT_BASE;
	}

	// The API answers 401 for a bad key and 403 when the plan has no API
	// access. Both are settings problems, so the message names the fix.
	function errorFor(status, body) {
		if (status === 401) {
			return new AsyntaiError("Asyntai did not accept this API key. Copy it again from https://asyntai.com/settings/api/.", status);
		}
		if (status === 403) {
			return new AsyntaiError("The Asyntai API needs the Starter plan or higher.", status);
		}
		if (status === 429) {
			return new AsyntaiError("This Asyntai account reached its monthly message limit.", status);
		}
		var text = body && typeof body.error === "string" ? body.error : "";
		return new AsyntaiError(text || ("Asyntai answered with HTTP " + status + "."), status);
	}

	function request(fetchImpl, method, path, apiKey, body) {
		if (!apiKey) {
			return Promise.reject(new AsyntaiError("Enter your Asyntai API key first."));
		}
		var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
		var timer = controller ? setTimeout(function () { controller.abort(); }, TIMEOUT_MS) : null;
		var options = {
			method: method,
			headers: {
				"Authorization": "Bearer " + apiKey,
				"Content-Type": "application/json"
			}
		};
		if (body) {
			options.body = JSON.stringify(body);
		}
		if (controller) {
			options.signal = controller.signal;
		}

		return fetchImpl(baseUrl() + path, options).then(function (response) {
			return response.text().then(function (raw) {
				var data = null;
				try {
					data = raw ? JSON.parse(raw) : null;
				} catch (e) {
					data = null;
				}
				if (!response.ok) {
					throw errorFor(response.status, data);
				}
				if (!data || typeof data !== "object") {
					throw new AsyntaiError("Asyntai sent a response the plugin cannot read.");
				}
				// A 200 can still carry success=false, so the body decides too.
				if (data.success === false) {
					throw new AsyntaiError(data.error || "Asyntai reported a failure.");
				}
				return data;
			});
		}, function (err) {
			if (err && err.name === "AbortError") {
				throw new AsyntaiError("Asyntai did not answer in time. Try again.");
			}
			throw new AsyntaiError("The plugin could not reach Asyntai. Check the internet connection.");
		}).then(function (data) {
			if (timer) { clearTimeout(timer); }
			return data;
		}, function (err) {
			if (timer) { clearTimeout(timer); }
			throw err;
		});
	}

	function createClient(apiKey, fetchImpl) {
		var doFetch = fetchImpl || (typeof fetch !== "undefined" ? fetch.bind(root) : null);

		return {
			// Validates the key and returns the account.
			account: function () {
				return request(doFetch, "GET", "/api/v1/account/", apiKey);
			},

			// Returns the websites of the account, primary first.
			websites: function () {
				return request(doFetch, "GET", "/api/v1/websites/", apiKey).then(function (data) {
					var list = Array.isArray(data.websites) ? data.websites.slice() : [];
					list.sort(function (a, b) {
						return (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0);
					});
					return list;
				});
			},

			// Asks the knowledge base of one website.
			ask: function (question, websiteId, sessionId) {
				var text = (question || "").trim();
				if (!text) {
					return Promise.reject(new AsyntaiError("Write a question first."));
				}
				var body = { message: text };
				if (websiteId) { body.website_id = websiteId; }
				if (sessionId) { body.session_id = sessionId; }
				return request(doFetch, "POST", "/api/v1/chat/", apiKey, body).then(function (data) {
					return {
						answer: typeof data.response === "string" ? data.response : "",
						sessionId: data.session_id || sessionId || "",
						disclosure: typeof data.ai_disclosure === "string" ? data.ai_disclosure : ""
					};
				});
			},

			// Adds text to the knowledge base of one website.
			addText: function (title, content, websiteId) {
				var cleanTitle = (title || "").trim();
				var cleanContent = (content || "").trim();
				if (!cleanTitle) {
					return Promise.reject(new AsyntaiError("Give the document a title."));
				}
				if (cleanContent.length < 10) {
					return Promise.reject(new AsyntaiError("There is not enough text. Select at least 10 characters."));
				}
				var body = { title: cleanTitle.slice(0, 200), content: cleanContent };
				if (websiteId) { body.website_id = websiteId; }
				return request(doFetch, "POST", "/api/v1/knowledge/text/", apiKey, body);
			}
		};
	}

	var api = {
		createClient: createClient,
		AsyntaiError: AsyntaiError,
		baseUrl: baseUrl
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = api;
	} else {
		root.AsyntaiApi = api;
	}
})(typeof window !== "undefined" ? window : globalThis);
