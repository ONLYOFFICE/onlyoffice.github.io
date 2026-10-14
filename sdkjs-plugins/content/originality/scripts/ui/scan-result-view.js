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

/// <reference path="../domain/scan-result.js" />
/// <reference path="../domain/scan-findings.js" />
/// <reference path="./cards.js" />

/**
 * Draws a {@link ScanResult} as a column of cards: AI detection, plagiarism, readability, fact
 * check, then what the scan cost and where its report is. The AI and plagiarism cards list their
 * findings; choosing one is reported through `onSelect`. Everything that comes from the API is
 * set as text, never as HTML.
 */
class ScanResultView {

	/**
	 * @param {HTMLElement} root
	 * @param {{ onSelect: (finding: ScanFinding) => void }} callbacks
	 */
	constructor(root, callbacks) {
		this._root = root;
		this._onSelect = callbacks.onSelect;
		/** @type {ScanFindings} */
		this._findings = new ScanFindings([], []);
	}

	clear() {
		this._root.textContent = "";
		this._findings = new ScanFindings([], []);
	}

	/**
	 * @param {ScanResult} result
	 * @param {ScanFindings} findings
	 */
	show(result, findings) {
		this.clear();
		this._findings = findings;

		if (result.ai || result.errors.ai)
			this._root.appendChild(this._aiCard(result));
		if (result.plagiarism || result.errors.plagiarism)
			this._root.appendChild(this._plagiarismCard(result));
		if (result.readability || result.errors.readability)
			this._root.appendChild(this._readabilityCard(result));
		if (result.facts || result.errors.facts)
			this._root.appendChild(this._factsCard(result));

		this._root.appendChild(this._footer(result));
	}

	/**
	 * @param {ScanResult} result
	 * @returns {HTMLElement}
	 * @private
	 */
	_aiCard(result) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("AI detection"));
		const ai = result.ai;
		if (!ai) {
			card.appendChild(this._error(result.errors.ai || ""));
			return card;
		}

		const aiPercent = Math.round(ai.ai * 100);
		const originalPercent = 100 - aiPercent;
		const isLikelyAi = ai.ai >= 0.5;

		card.appendChild(this._verdict(
			isLikelyAi ? tr("Likely AI-generated") : tr("Likely original"),
			isLikelyAi ? "verdict--ai" : "verdict--original"));

		const scores = Cards.element("div", "score");
		scores.appendChild(this._scoreLabel(originalPercent + "%", tr("Original"), "score__label--original"));
		scores.appendChild(this._scoreLabel(aiPercent + "%", tr("AI"), "score__label--ai"));
		card.appendChild(scores);

		const bar = Cards.element("div", "score__bar");
		const fill = Cards.element("div", "score__fill");
		fill.style.width = originalPercent + "%";
		bar.appendChild(fill);
		card.appendChild(bar);

		card.appendChild(Cards.note(ai.allowance !== null
			? tr("AI allowance") + ": " + ai.allowance + "%"
			: tr("Score without an AI allowance")));

		const flagged = this._findings.ai.filter((finding) => finding.flagged);
		if (this._findings.ai.length) {
			card.appendChild(Cards.note(tr("Sentences that look AI-generated") + ": " + flagged.length + " / " + this._findings.ai.length));
			if (flagged.length)
				card.appendChild(this._findingList(flagged, (finding) => Math.round(/** @type {AiFinding} */ (finding).ai * 100) + "%"));
		}

		return card;
	}

	/**
	 * @param {ScanResult} result
	 * @returns {HTMLElement}
	 * @private
	 */
	_plagiarismCard(result) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Plagiarism"));
		const plagiarism = result.plagiarism;
		if (!plagiarism) {
			card.appendChild(this._error(result.errors.plagiarism || ""));
			return card;
		}

		const score = Math.round(plagiarism.score);
		card.appendChild(this._verdict(
			score + "% " + tr("matching text"),
			score > 0 ? "verdict--ai" : "verdict--original"));

		if (!plagiarism.sources.length) {
			card.appendChild(Cards.note(tr("No matching sources found.")));
			return card;
		}

		if (this._findings.plagiarism.length) {
			card.appendChild(Cards.element("h4", "result-card__subtitle", tr("Matching phrases")));
			card.appendChild(this._findingList(this._findings.plagiarism,
				(finding) => "×" + /** @type {PlagiarismFinding} */ (finding).sources.length,
				(finding) => /** @type {PlagiarismFinding} */ (finding).sources.map((source) => source.title).join("\n")));
			card.appendChild(Cards.element("h4", "result-card__subtitle", tr("Sources")));
		}

		const list = Cards.element("ul", "source-list");
		plagiarism.sources.forEach((source) => {
			const item = Cards.element("li", "source-list__item");
			const link = /** @type {HTMLAnchorElement} */ (Cards.element("a", "source-list__link"));
			link.href = source.url;
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			link.textContent = source.title;
			link.title = source.url;
			item.appendChild(link);
			item.appendChild(Cards.element("span", "source-list__count",
				tr("Matches") + ": " + source.matches.length));
			list.appendChild(item);
		});
		card.appendChild(list);
		return card;
	}

	/**
	 * @param {ScanResult} result
	 * @returns {HTMLElement}
	 * @private
	 */
	_readabilityCard(result) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Readability"));
		const readability = result.readability;
		if (!readability) {
			card.appendChild(this._error(result.errors.readability || ""));
			return card;
		}

		if (readability.fleschReadingEase !== null) {
			card.appendChild(Cards.row(tr("Flesch reading ease"),
				readability.fleschReadingEase + " — " + tr(ScanResultView._easeLevel(readability.fleschReadingEase))));
		}
		if (readability.fleschGradeLevel !== null)
			card.appendChild(Cards.row(tr("Grade level"), String(readability.fleschGradeLevel)));
		if (readability.sentenceCount !== null)
			card.appendChild(Cards.row(tr("Sentences"), String(readability.sentenceCount)));
		return card;
	}

	/**
	 * @param {ScanResult} result
	 * @returns {HTMLElement}
	 * @private
	 */
	_factsCard(result) {
		const tr = window.Asc.plugin.tr;
		const card = Cards.card(tr("Fact check"));
		const facts = result.facts;
		if (!facts) {
			card.appendChild(this._error(result.errors.facts || ""));
			return card;
		}
		if (!facts.length) {
			card.appendChild(Cards.note(tr("No statements to check.")));
			return card;
		}

		const list = Cards.element("ul", "fact-list");
		facts.forEach((fact) => {
			const item = Cards.element("li", "fact-list__item");
			item.appendChild(Cards.element("span", "fact-list__truth", fact.truthfulness));
			const text = Cards.element("span", "fact-list__text", fact.fact);
			text.title = fact.explanation;
			item.appendChild(text);
			list.appendChild(item);
		});
		card.appendChild(list);
		return card;
	}

	/**
	 * @param {ScanResult} result
	 * @returns {HTMLElement}
	 * @private
	 */
	_footer(result) {
		const tr = window.Asc.plugin.tr;
		const footer = Cards.element("div", "result-footer");
		if (result.creditsUsed !== null)
			footer.appendChild(Cards.note(tr("Credits used") + ": " + result.creditsUsed));
		if (result.publicLink) {
			const link = /** @type {HTMLAnchorElement} */ (Cards.element("a", "result-footer__link", tr("Open the report on Originality.ai")));
			link.href = result.publicLink;
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			footer.appendChild(link);
		}
		return footer;
	}

	/**
	 * The usual bands of the Flesch reading-ease score.
	 * @param {number} score
	 * @returns {string} untranslated
	 * @private
	 */
	static _easeLevel(score) {
		if (score >= 90) return "very easy";
		if (score >= 80) return "easy";
		if (score >= 70) return "fairly easy";
		if (score >= 60) return "standard";
		if (score >= 50) return "fairly difficult";
		if (score >= 30) return "difficult";
		return "very difficult";
	}

	/**
	 * Brings a finding forward in the list, e.g. when its mark is clicked in the document.
	 * @param {string} findingId
	 */
	markActive(findingId) {
		this._root.querySelectorAll(".finding-list__item").forEach((element) => {
			const item = /** @type {HTMLElement} */ (element);
			const isActive = item.dataset.findingId === findingId;
			item.classList.toggle("finding-list__item--active", isActive);
			if (isActive)
				item.scrollIntoView({ block: "nearest" });
		});
	}

	/**
	 * @param {ScanFinding[]} findings
	 * @param {(finding: ScanFinding) => string} badge - the short figure next to each
	 * @param {(finding: ScanFinding) => string} [tooltip]
	 * @returns {HTMLElement}
	 * @private
	 */
	_findingList(findings, badge, tooltip) {
		const list = Cards.element("ul", "finding-list");
		findings.forEach((finding) => {
			const item = Cards.element("li", "finding-list__item");
			item.dataset.findingId = finding.id;
			if (tooltip)
				item.title = tooltip(finding);
			item.appendChild(Cards.element("span", "finding-list__badge", badge(finding)));
			item.appendChild(Cards.element("span", "finding-list__text", finding.text.trim()));

			Cards.clickable(item, () => {
				this.markActive(finding.id);
				this._onSelect(finding);
			});
			list.appendChild(item);
		});
		return list;
	}

	/**
	 * @param {string} text
	 * @param {string} modifier
	 * @returns {HTMLElement}
	 * @private
	 */
	_verdict(text, modifier) {
		return Cards.element("div", "verdict " + modifier, text);
	}

	/**
	 * @param {string} value
	 * @param {string} label
	 * @param {string} modifier
	 * @returns {HTMLElement}
	 * @private
	 */
	_scoreLabel(value, label, modifier) {
		const element = Cards.element("div", "score__label " + modifier);
		element.appendChild(Cards.element("span", "score__value", value));
		element.appendChild(Cards.element("span", "score__name", label));
		return element;
	}

	/**
	 * @param {string} apiMessage - as the API worded it
	 * @returns {HTMLElement}
	 * @private
	 */
	_error(apiMessage) {
		const tr = window.Asc.plugin.tr;
		return Cards.element("p", "result-note result-note--error",
			tr("This check failed") + (apiMessage ? ": " + apiMessage : "."));
	}
}
