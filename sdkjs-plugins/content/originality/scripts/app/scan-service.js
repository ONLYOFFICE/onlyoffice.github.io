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

/// <reference path="../editor/document-reader.js" />
/// <reference path="../service/originality-client.js" />
/// <reference path="../settings/settings-store.js" />
/// <reference path="../domain/scan-result.js" />

/**
 * @typedef {"document" | "selection"} ScanScope
 */

/**
 * @typedef {"noApiKey" | "nothingToCheck" | "emptySelection" | "tooShort"} ScanInputProblem
 */

/**
 * @typedef {Object} ScanText
 * @property {ScanScope} scope
 * @property {string} text
 * @property {number} words
 */

/**
 * A scan that was not sent, because what it would scan or how is not acceptable. The message is
 * the untranslated text to show; `problem` says which case it is.
 */
class ScanInputError extends Error {

	/**
	 * @param {ScanInputProblem} problem
	 * @param {string} message
	 */
	constructor(problem, message) {
		super(message);
		this.name = "ScanInputError";
		this.problem = problem;
	}
}

/**
 * Runs one scan in two steps: reads the text and checks it can be scanned with the current
 * settings, then sends it to Originality.ai and returns what came back. Between the two the
 * caller may ask the user, e.g. whether a text over {@link ScanService.maxWords} may be cut.
 */
class ScanService {

	/** shorter texts give unreliable results; the Originality.ai extension asks for as many */
	static minWords = 100;
	/** longer texts are cut, as the Originality.ai extension does: one request has to answer in time */
	static maxWords = 10000;

	/**
	 * @param {DocumentReader} reader
	 * @param {OriginalityClient} client
	 * @param {SettingsStore} settings
	 */
	constructor(reader, client, settings) {
		this._reader = reader;
		this._client = client;
		this._settings = settings;
	}

	/**
	 * @param {ScanScope} scope
	 * @returns {Promise<ScanText>}
	 * @throws {ScanInputError}
	 */
	async read(scope) {
		const settings = this._settings.load();
		if (!settings.apiKey)
			throw new ScanInputError("noApiKey", "Add your Originality.ai API key in Settings.");
		if (!settings.checkAi && !settings.checkPlagiarism && !settings.checkReadability && !settings.checkFacts)
			throw new ScanInputError("nothingToCheck", "Choose at least one check in Settings.");

		const text = (scope === "selection" ? await this._reader.readSelection() : await this._reader.readDocument()).trim();
		if (!text && scope === "selection")
			throw new ScanInputError("emptySelection", "Select the text to scan first.");
		const words = ScanService._countWords(text);
		if (words < ScanService.minWords)
			throw new ScanInputError("tooShort", "The text is too short: the scan needs at least 100 words.");
		return { scope: scope, text: text, words: words };
	}

	/**
	 * @param {ScanText} text - as {@link ScanService.read} gave it; cut to the first
	 *   {@link ScanService.maxWords} words when longer
	 * @returns {Promise<ScanResult>}
	 * @throws {OriginalityApiError}
	 */
	async scan(text) {
		const settings = this._settings.load();
		const content = text.words > ScanService.maxWords ? ScanService._firstWords(text.text, ScanService.maxWords) : text.text;
		const response = await this._client.scan(settings.apiKey, {
			title            : this._title(),
			content          : content,
			checkAi          : settings.checkAi,
			checkPlagiarism  : settings.checkPlagiarism,
			checkReadability : settings.checkReadability,
			checkFacts       : settings.checkFacts,
			aiModel          : settings.aiModel,
			aiAllowance      : settings.aiAllowance,
			storeScan        : settings.storeScan,
			excludedUrls     : settings.excludedUrls,
		});

		const allowance = settings.checkAi && settings.aiModel === "standard" ? settings.aiAllowance : null;
		return ScanResult.fromResponse(response, allowance);
	}

	/**
	 * @returns {string} how the scan is named in the user's Originality.ai account
	 * @private
	 */
	_title() {
		const title = window.Asc.plugin.info && window.Asc.plugin.info.documentTitle;
		return title ? "ONLYOFFICE: " + title : "ONLYOFFICE document";
	}

	/**
	 * @param {string} text
	 * @returns {number}
	 * @private
	 */
	static _countWords(text) {
		return text ? text.split(/\s+/).filter(Boolean).length : 0;
	}

	/**
	 * @param {string} text
	 * @param {number} count
	 * @returns {string} the text up to the end of its `count`-th word, spacing kept
	 * @private
	 */
	static _firstWords(text, count) {
		const word = /\S+/g;
		let end = 0;
		for (let i = 0; i < count && word.exec(text); i++)
			end = word.lastIndex;
		return text.slice(0, end);
	}
}
