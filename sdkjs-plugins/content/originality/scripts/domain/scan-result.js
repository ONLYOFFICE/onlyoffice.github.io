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
 * @property {string} text - a sentence of the scanned text
 * @property {number} ai - how likely it is AI-written, 0..1
 */

/**
 * @typedef {"original" | "mixed" | "ai"} AiVerdict
 */

/**
 * @typedef {Object} AiDetection
 * @property {number} ai - the share of the text that involves AI, 0..1
 * @property {number} original - the rest, 0..1
 * @property {AiVerdict} verdict
 * @property {string} model - the model that scored it, as the API names it
 * @property {AiBlock[]} blocks
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
 * @typedef {Object} FactSource
 * @property {string} title
 * @property {string} url
 */

/**
 * @typedef {Object} FactCheck
 * @property {string} claim
 * @property {string} classification - as the API words it, e.g. "True"
 * @property {number | null} confidence - 0..1
 * @property {string} explanation
 * @property {FactSource[]} sources - web pages only
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

	/**
	 * Where the share of AI moves the verdict, as Originality.ai puts it for its 5.0 models:
	 * under 10% likely original, up to 80% mixed, above that likely AI.
	 */
	static mixedFrom = 0.1;
	static aiAbove = 0.8;

	/** the error of a requested check the answer has neither a result nor an error for */
	static unreadable = "Originality.ai answered in a form the plugin could not read.";

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
	 * @param {ScanFeature[]} requested - the checks that were asked for: one the answer says
	 *   nothing readable about gets {@link ScanResult.unreadable} as its error
	 * @returns {ScanResult}
	 */
	static fromResponse(response, requested) {
		const result = new ScanResult();
		const results = ScanResult._object(ScanResult._object(response).results);

		const properties = ScanResult._object(results.properties);
		const link = properties.publicLink;
		if (typeof link === "string" && /^https?:\/\//.test(link))
			result.publicLink = link;

		const credits = ScanResult._object(results.credits);
		if (typeof credits.used === "number")
			result.creditsUsed = credits.used;

		result._readAi(results.ai);
		result._readPlagiarism(results.plagiarism);
		result._readReadability(results.readability);
		result._readFacts(results.facts);

		requested.forEach((feature) => {
			if (result[feature] === null && result.errors[feature] === undefined)
				result.errors[feature] = ScanResult.unreadable;
		});
		return result;
	}

	/**
	 * @param {number} ai - the share of the text that involves AI, 0..1
	 * @returns {AiVerdict}
	 */
	static verdictOf(ai) {
		if (ai > ScanResult.aiAbove)
			return "ai";
		return ai >= ScanResult.mixedFrom ? "mixed" : "original";
	}

	/**
	 * The 5.0 models give the share of AI in per cent and a score for each sentence; a sentence
	 * without a score is taken as human.
	 * @param {unknown} source
	 * @private
	 */
	_readAi(source) {
		if (this._recordError("ai", source))
			return;

		const ai = ScanResult._object(source);
		if (typeof ai.ai_assisted_percent !== "number" || !isFinite(ai.ai_assisted_percent))
			return;

		const share = Math.min(1, Math.max(0, ai.ai_assisted_percent / 100));
		this.ai = {
			ai       : share,
			original : 1 - share,
			verdict  : ScanResult.verdictOf(share),
			model    : String(ai.model || ""),
			blocks   : ScanResult._array(ai.sentences).map((sentence) => {
				const s = ScanResult._object(sentence);
				return { text: String(s.text || ""), ai: ScanResult._number(s.ai_score, 0) };
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
	 * The documentation shows the claims as a list keyed by number, so a list and an object of
	 * them are read alike.
	 * @param {unknown} source
	 * @private
	 */
	_readFacts(source) {
		if (this._recordError("facts", source))
			return;
		if (!source || typeof source !== "object")
			return;

		const entries = Array.isArray(source) ? source : Object.values(source);
		this.facts = entries.map((entry) => {
			const f = ScanResult._object(entry);
			return {
				claim          : String(f.claim || ""),
				classification : String(f.classification || ""),
				confidence     : typeof f.confidence === "number" && isFinite(f.confidence) ? f.confidence : null,
				explanation    : String(f.explanation || ""),
				sources        : ScanResult._array(f.sources)
					.map((s) => {
						const o = ScanResult._object(s);
						return { title: String(o.title || o.url || ""), url: String(o.url || "") };
					})
					// a source is a web page; anything else is not shown as a link
					.filter((s) => /^https?:\/\//i.test(s.url)),
			};
		}).filter((fact) => fact.claim !== "");
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
