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
 * @typedef {"standard" | "multilang"} AiModel
 * `standard` is Originality's current English model, tuned by the AI allowance; `multilang` is
 * their multilingual model, which takes no allowance.
 */

/**
 * @typedef {Object} ScanSettings
 * @property {string} apiKey
 * @property {AiModel} aiModel
 * @property {number} aiAllowance - per cent of AI-assisted text tolerated: 0, 5, 15, 25 or 40
 * @property {boolean} checkAi
 * @property {boolean} checkPlagiarism
 * @property {boolean} checkReadability
 * @property {boolean} checkFacts
 * @property {boolean} storeScan - keep the scan on Originality.ai, which the shareable link needs
 * @property {string[]} excludedUrls - sources the plagiarism check ignores
 */

/**
 * Keeps the user's settings in the plugin's local storage. It knows how they are stored and
 * what a missing or broken value falls back to, nothing about what they mean.
 */
class SettingsStore {

	/** the AI allowance levels Originality.ai documents */
	static allowanceLevels = Object.freeze([0, 5, 15, 25, 40]);

	/** @type {Readonly<ScanSettings>} */
	static defaults = Object.freeze({
		apiKey           : "",
		aiModel          : /** @type {AiModel} */ ("standard"),
		aiAllowance      : 15,
		checkAi          : true,
		checkPlagiarism  : true,
		checkReadability : false,
		checkFacts       : false,
		storeScan        : true,
		excludedUrls     : [],
	});

	/** @private */
	static _key = "onlyoffice_originality_settings";

	/**
	 * @returns {ScanSettings}
	 */
	load() {
		/** @type {Partial<ScanSettings>} */
		let stored = {};
		try {
			const raw = window.localStorage.getItem(SettingsStore._key);
			if (raw)
				stored = JSON.parse(raw) || {};
		} catch (e) {
			stored = {};
		}
		return this._normalize(stored);
	}

	/**
	 * @param {ScanSettings} settings
	 */
	save(settings) {
		try {
			window.localStorage.setItem(SettingsStore._key, JSON.stringify(this._normalize(settings)));
		} catch (e) {
			// storage unavailable (private mode, quota): the settings live for this session only
		}
	}

	/**
	 * @param {Partial<ScanSettings>} value
	 * @returns {ScanSettings}
	 * @private
	 */
	_normalize(value) {
		const d = SettingsStore.defaults;
		/** @param {unknown} v @param {boolean} fallback */
		const bool = (v, fallback) => (typeof v === "boolean" ? v : fallback);

		return {
			apiKey           : typeof value.apiKey === "string" ? value.apiKey.trim() : d.apiKey,
			aiModel          : value.aiModel === "multilang" ? "multilang" : "standard",
			aiAllowance      : SettingsStore.allowanceLevels.indexOf(Number(value.aiAllowance)) !== -1
				? Number(value.aiAllowance) : d.aiAllowance,
			checkAi          : bool(value.checkAi, d.checkAi),
			checkPlagiarism  : bool(value.checkPlagiarism, d.checkPlagiarism),
			checkReadability : bool(value.checkReadability, d.checkReadability),
			checkFacts       : bool(value.checkFacts, d.checkFacts),
			storeScan        : bool(value.storeScan, d.storeScan),
			excludedUrls     : Array.isArray(value.excludedUrls)
				? value.excludedUrls.filter((url) => typeof url === "string" && url.trim() !== "").map((url) => url.trim())
				: [],
		};
	}
}
