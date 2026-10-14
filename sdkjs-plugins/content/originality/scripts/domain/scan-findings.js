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

/// <reference path="./scan-result.js" />

/**
 * @typedef {Object} AiFinding
 * @property {string} id
 * @property {string} text - a block of the scanned text, about a sentence
 * @property {number} ai - how likely it is AI-written, 0..1
 * @property {boolean} flagged - whether it counts as AI-written
 */

/**
 * @typedef {Object} PlagiarismFinding
 * @property {string} id
 * @property {string} text - the scanned phrase found elsewhere
 * @property {Array<{ url: string, title: string }>} sources
 */

/**
 * @typedef {AiFinding | PlagiarismFinding} ScanFinding
 */

/**
 * The places in the scanned text a scan points at: every AI-scored block, in text order, and
 * every phrase found in other sources. Each has an id the panel and the document highlights share.
 */
class ScanFindings {

	/** a block at or above this AI likelihood counts as AI-written */
	static aiThreshold = 0.5;

	/**
	 * @param {AiFinding[]} ai
	 * @param {PlagiarismFinding[]} plagiarism
	 */
	constructor(ai, plagiarism) {
		this.ai = ai;
		this.plagiarism = plagiarism;
	}

	/**
	 * @param {ScanResult} result
	 * @returns {ScanFindings}
	 */
	static fromResult(result) {
		const ai = result.ai
			? result.ai.blocks
				.filter((block) => block.text.trim() !== "")
				.map((block, index) => ({
					id      : "ai" + index,
					text    : block.text,
					ai      : block.ai,
					flagged : block.ai >= ScanFindings.aiThreshold,
				}))
			: [];

		/** @type {Map<string, PlagiarismFinding>} */
		const byPhrase = new Map();
		if (result.plagiarism) {
			result.plagiarism.sources.forEach((source) => {
				source.matches.forEach((match) => {
					const phrase = match.phrase.trim();
					if (!phrase)
						return;
					let finding = byPhrase.get(phrase);
					if (!finding) {
						finding = { id: "pl" + byPhrase.size, text: phrase, sources: [] };
						byPhrase.set(phrase, finding);
					}
					if (!finding.sources.some((s) => s.url === source.url))
						finding.sources.push({ url: source.url, title: source.title });
				});
			});
		}

		return new ScanFindings(ai, Array.from(byPhrase.values()));
	}

	/**
	 * @param {string} id
	 * @returns {ScanFinding | null}
	 */
	find(id) {
		return this.ai.find((f) => f.id === id) || this.plagiarism.find((f) => f.id === id) || null;
	}
}
