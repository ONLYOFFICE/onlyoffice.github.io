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

/// <reference path="../settings/settings-store.js" />

/**
 * @typedef {Object} ScanRequest
 * @property {string} title
 * @property {string} content - plain text
 * @property {boolean} checkAi
 * @property {boolean} checkPlagiarism
 * @property {boolean} checkReadability
 * @property {boolean} checkFacts
 * @property {AiModel} aiModel
 * @property {number} aiAllowance - ignored by the multilingual model
 * @property {boolean} storeScan
 * @property {string[]} excludedUrls
 */

/**
 * @typedef {Object} CreditBalance
 * @property {number} credits
 * @property {number} subscriptionCredits
 */

/**
 * A request the Originality.ai API answered with an error, or could not answer at all.
 */
class OriginalityApiError extends Error {

	/**
	 * @param {string} message - what the API said, or what went wrong on the way
	 * @param {number} status - the HTTP status; 0 when no answer came
	 * @param {boolean} [mayHaveRun] - the request reached the API but its answer did not come back,
	 *   so the API may have done the work, and charged for it, all the same
	 */
	constructor(message, status, mayHaveRun) {
		super(message);
		this.name = "OriginalityApiError";
		this.status = status;
		this.mayHaveRun = !!mayHaveRun;
	}
}

/**
 * The Originality.ai REST API (v3): turns the plugin's requests into its wire format and back
 * into plain data. It does not interpret the scan results.
 *
 * The API allows calls from any origin (`Access-Control-Allow-Origin: *`), so the plugin page
 * calls it directly.
 *
 * A failed request is never sent again on its own: a scan is paid for, and one whose answer was
 * lost may have run, so a second try could charge twice. Trying again is the user's call.
 */
class OriginalityClient {

	/** @private */
	static _baseUrl = "https://api.originality.ai/api/v3";
	/** plagiarism checks can take up to a minute, per the API documentation */
	static _timeoutMs = 120000;
	/**
	 * A connection that fails after this long failed while the API was at work, most likely at its
	 * gateway's time limit, whose error answer the browser cannot read: it comes without CORS
	 * headers. One that fails sooner never got through.
	 */
	static _workingMs = 25000;
	/** gateway errors: the API behind it may have run the request */
	static _gatewayStatuses = [502, 503, 504, 524];

	/**
	 * @param {string} apiKey
	 * @param {ScanRequest} request
	 * @returns {Promise<unknown>} the response body as the API sent it
	 */
	scan(apiKey, request) {
		return this._request("POST", "/scan", apiKey, this._toWire(request));
	}

	/**
	 * @param {string} apiKey
	 * @returns {Promise<CreditBalance>}
	 */
	async getBalance(apiKey) {
		const body = /** @type {Record<string, unknown>} */ (await this._request("GET", "/account/balance", apiKey));
		return {
			credits             : Number(body.credits) || 0,
			subscriptionCredits : Number(body.subscriptionCredits) || 0,
		};
	}

	/**
	 * @param {ScanRequest} request
	 * @returns {Record<string, unknown>}
	 * @private
	 */
	_toWire(request) {
		const isMultilang = request.aiModel === "multilang";

		/** @type {Record<string, unknown>} */
		const body = {
			title                : request.title,
			content              : request.content,
			check_ai             : request.checkAi,
			check_plagiarism     : request.checkPlagiarism,
			check_facts          : request.checkFacts,
			check_readability    : request.checkReadability,
			check_grammar        : false,
			check_contentQuality : false,
			storeScan            : request.storeScan,
			// the English models are retired in favour of the AI allowance; "lite" is what the
			// documentation's own example still sends next to an allowance threshold
			aiModelVersion       : isMultilang ? "multilang" : "lite",
		};

		if (request.checkAi && !isMultilang) {
			body.check_ai_allowance = true;
			body.ai_allowance_threshold = request.aiAllowance;
		}
		if (request.checkPlagiarism && request.excludedUrls.length)
			body.excludedUrls = request.excludedUrls;

		return body;
	}

	/**
	 * @param {"GET" | "POST"} method
	 * @param {string} path
	 * @param {string} apiKey
	 * @param {Record<string, unknown>} [body]
	 * @returns {Promise<unknown>}
	 * @private
	 */
	async _request(method, path, apiKey, body) {
		/** @type {Record<string, string>} */
		const headers = { "X-OAI-API-KEY": apiKey };
		if (body)
			headers["Content-Type"] = "application/json";

		const abort = new AbortController();
		const timer = setTimeout(() => abort.abort(), OriginalityClient._timeoutMs);
		const startedAt = Date.now();

		/** @type {Response} */
		let response;
		try {
			response = await fetch(OriginalityClient._baseUrl + path, {
				method  : method,
				headers : headers,
				body    : body ? JSON.stringify(body) : undefined,
				signal  : abort.signal,
			});
		} catch (e) {
			if (abort.signal.aborted)
				throw new OriginalityApiError("The request timed out", 0, true);
			if (Date.now() - startedAt >= OriginalityClient._workingMs)
				throw new OriginalityApiError("Originality.ai did not answer in time", 0, true);
			throw new OriginalityApiError("Could not reach Originality.ai", 0);
		} finally {
			clearTimeout(timer);
		}

		/** @type {unknown} */
		let payload = null;
		try {
			payload = await response.json();
		} catch (e) {
			payload = null;
		}

		if (!response.ok) {
			const error = payload && typeof payload === "object" && "error" in payload
				? String(/** @type {{ error: unknown }} */ (payload).error)
				: response.statusText || "Request failed";
			throw new OriginalityApiError(error, response.status, OriginalityClient._gatewayStatuses.includes(response.status));
		}

		return payload;
	}
}
