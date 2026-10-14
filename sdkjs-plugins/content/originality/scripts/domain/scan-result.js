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
 * @typedef {Object} AiBlock
 * @property {string} text - a stretch of the scanned text, about a sentence, with its trailing space
 * @property {number} ai - how likely it is AI-written, 0..1
 */

/**
 * @typedef {Object} AiDetection
 * @property {number} original - confidence the text is original, 0..1
 * @property {number} ai - confidence the text is AI-written, 0..1
 * @property {AiBlock[]} blocks
 * @property {number | null} allowance - the AI allowance the score was computed with, if any
 */

/**
 * @typedef {Object} PlagiarismMatch
 * @property {string} phrase - the scanned phrase
 * @property {string} sentence - the matching sentence of the source
 * @property {number} score - 0..1
 */

/**
 * @typedef {Object} PlagiarismSource
 * @property {string} url
 * @property {string} title
 * @property {PlagiarismMatch[]} matches
 */

/**
 * @typedef {Object} Plagiarism
 * @property {number} score - share of the text found elsewhere, 0..100
 * @property {PlagiarismSource[]} sources - most matches first
 */

/**
 * @typedef {Object} Readability
 * @property {number | null} fleschReadingEase
 * @property {number | null} fleschGradeLevel
 * @property {number | null} sentenceCount
 */

/**
 * @typedef {Object} FactCheck
 * @property {string} fact
 * @property {string} truthfulness - as the API words it, e.g. "85%"
 * @property {string} explanation
 * @property {string[]} links
 */

/**
 * @typedef {"ai" | "plagiarism" | "readability" | "facts"} ScanFeature
 */

/**
 * What one scan found, in the plugin's own terms. Built from the API response by
 * {@link ScanResult.fromResponse}; a feature that was not requested, or that failed, is `null`
 * and, if it failed, has an entry in `errors`.
 */
class ScanResult {

	constructor() {
		/** @type {AiDetection | null} */
		this.ai = null;
		/** @type {Plagiarism | null} */
		this.plagiarism = null;
		/** @type {Readability | null} */
		this.readability = null;
		/** @type {FactCheck[] | null} */
		this.facts = null;
		/** @type {Partial<Record<ScanFeature, string>>} */
		this.errors = {};
		/** @type {number | null} */
		this.creditsUsed = null;
		/** @type {string | null} the shareable report, when the scan was stored */
		this.publicLink = null;
	}

	/**
	 * @param {unknown} response - the body of `POST /scan`
	 * @param {number | null} allowance - the AI allowance that was requested, if any
	 * @returns {ScanResult}
	 */
	static fromResponse(response, allowance) {
		const result = new ScanResult();
		const results = ScanResult._object(ScanResult._object(response).results);

		const properties = ScanResult._object(results.properties);
		const link = properties.publicLink;
		if (typeof link === "string" && /^https?:\/\//.test(link))
			result.publicLink = link;

		const credits = ScanResult._object(results.credits);
		if (typeof credits.used === "number")
			result.creditsUsed = credits.used;

		result._readAi(results, allowance);
		result._readPlagiarism(results.plagiarism);
		result._readReadability(results.readability);
		result._readFacts(results.facts);

		return result;
	}

	/**
	 * The allowance result replaces the plain one when it is there: that is the score the user
	 * asked for.
	 * @param {Record<string, unknown>} results
	 * @param {number | null} allowance
	 * @private
	 */
	_readAi(results, allowance) {
		const byAllowance = ScanResult._object(results.aiAllowance);
		const allowanceKey = allowance === null ? null : String(allowance);
		const source = allowanceKey !== null && byAllowance[allowanceKey] !== undefined
			? byAllowance[allowanceKey]
			: results.ai;

		if (this._recordError("ai", source))
			return;

		const ai = ScanResult._object(source);
		const confidence = ScanResult._object(ai.confidence);
		if (typeof confidence.AI !== "number" && typeof confidence.Original !== "number")
			return;

		const aiScore = ScanResult._number(confidence.AI, 1 - ScanResult._number(confidence.Original, 1));
		this.ai = {
			ai        : aiScore,
			original  : ScanResult._number(confidence.Original, 1 - aiScore),
			allowance : source === results.ai ? null : allowance,
			blocks    : ScanResult._array(ai.blocks).map((block) => {
				const b = ScanResult._object(block);
				const r = ScanResult._object(b.result);
				return { text: String(b.text || ""), ai: ScanResult._number(r.fake, 0) };
			}),
		};
	}

	/**
	 * The API groups matches by scanned phrase; the plugin shows them by source.
	 * @param {unknown} source
	 * @private
	 */
	_readPlagiarism(source) {
		if (this._recordError("plagiarism", source))
			return;

		const plagiarism = ScanResult._object(source);
		if (typeof plagiarism.score !== "number")
			return;

		/** @type {Map<string, PlagiarismSource>} */
		const byUrl = new Map();
		ScanResult._array(plagiarism.results).forEach((entry) => {
			const phraseEntry = ScanResult._object(entry);
			const phrase = String(phraseEntry.phrase || "");

			ScanResult._array(phraseEntry.results).forEach((found) => {
				const f = ScanResult._object(found);
				// a source is a web page; anything else is not shown as a link
				const url = String(f.link || "");
				if (!/^https?:\/\//i.test(url))
					return;

				let item = byUrl.get(url);
				if (!item) {
					item = { url: url, title: String(f.title || url), matches: [] };
					byUrl.set(url, item);
				}
				const target = item;
				ScanResult._array(f.scores).forEach((score) => {
					const s = ScanResult._object(score);
					target.matches.push({
						phrase   : phrase,
						sentence : String(s.sentence || ""),
						score    : ScanResult._number(s.score, 0),
					});
				});
			});
		});

		this.plagiarism = {
			score   : plagiarism.score,
			sources : Array.from(byUrl.values()).sort((a, b) => b.matches.length - a.matches.length),
		};
	}

	/**
	 * @param {unknown} source
	 * @private
	 */
	_readReadability(source) {
		if (this._recordError("readability", source))
			return;

		const readability = ScanResult._object(source);
		const scores = ScanResult._object(readability.readability);
		const stats = ScanResult._object(readability.text_stats);
		if (!Object.keys(scores).length)
			return;

		/** @param {unknown} v */
		const numberOrNull = (v) => (typeof v === "number" ? v : null);
		this.readability = {
			fleschReadingEase : numberOrNull(scores.fleschReadingEase),
			fleschGradeLevel  : numberOrNull(scores.fleschGradeLevel),
			sentenceCount     : numberOrNull(stats.sentenceCount),
		};
	}

	/**
	 * @param {unknown} source
	 * @private
	 */
	_readFacts(source) {
		if (this._recordError("facts", source))
			return;
		if (!Array.isArray(source))
			return;

		this.facts = source.map((entry) => {
			const f = ScanResult._object(entry);
			return {
				fact         : String(f.fact || ""),
				truthfulness : String(f.truthfulness || ""),
				explanation  : String(f.explanation || ""),
				links        : ScanResult._array(f.links).map(String),
			};
		});
	}

	/**
	 * A feature the API reports as `{ "error": "..." }`. "not selected" is the API's way of
	 * saying it was not asked for, which is not an error.
	 * @param {ScanFeature} feature
	 * @param {unknown} source
	 * @returns {boolean} whether the feature carries no result
	 * @private
	 */
	_recordError(feature, source) {
		const value = ScanResult._object(source);
		if (typeof value.error !== "string")
			return false;

		if (value.error !== "not selected")
			this.errors[feature] = value.error;
		return true;
	}

	/**
	 * @param {unknown} value
	 * @returns {Record<string, unknown>}
	 * @private
	 */
	static _object(value) {
		return value && typeof value === "object" && !Array.isArray(value)
			? /** @type {Record<string, unknown>} */ (value)
			: {};
	}

	/**
	 * @param {unknown} value
	 * @returns {unknown[]}
	 * @private
	 */
	static _array(value) {
		return Array.isArray(value) ? value : [];
	}

	/**
	 * @param {unknown} value
	 * @param {number} fallback
	 * @returns {number}
	 * @private
	 */
	static _number(value, fallback) {
		return typeof value === "number" && isFinite(value) ? value : fallback;
	}
}
