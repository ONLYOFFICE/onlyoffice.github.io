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
 * Translates a plugin page drawn before its dictionary came. The page and its components are
 * drawn at once in English, the language the texts are written in; once the dictionary is in,
 * every text, title, placeholder and label whose whole wording is a phrase of the dictionary is
 * put in the user's language — in the markup and in what components drew alike. Text put
 * together from parts ("Credits: 42") is not a phrase: whoever drew it draws it again. Nothing
 * inside an element marked `translate="no"` is touched, e.g. text taken from the document.
 *
 * Until the dictionary comes the words can be kept out of sight, the page laid out without them,
 * so that they do not change language before the user's eyes.
 */
class PageTranslator {

	static _attributes = Object.freeze(["title", "placeholder", "aria-label"]);
	/** the class that keeps the words out of sight (panel.css, replay.css) */
	static _pendingClass = "texts-pending";

	/**
	 * @param {HTMLElement} root
	 */
	constructor(root) {
		this._root = root;
		/** the English wording of what was translated, so that a later pass starts from it again */
		/** @type {WeakMap<Node, string>} */
		this._texts = new WeakMap();
		/** @type {WeakMap<Element, Record<string, string>>} */
		this._attributeTexts = new WeakMap();
		this._isTranslated = false;
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._waitTimer = null;
	}

	/**
	 * Keeps the words out of sight until the dictionary comes, and shows them in English if it has
	 * not come within the time given: it may never come, when its file fails to load. Does nothing
	 * once the page is translated.
	 * @param {number} ms
	 */
	hideUntilTranslated(ms) {
		if (this._isTranslated || this._waitTimer)
			return;
		this._root.classList.add(PageTranslator._pendingClass);
		this._waitTimer = setTimeout(() => this._showTexts(), ms);
	}

	translate() {
		this._isTranslated = true;
		this._translateTexts();
		this._showTexts();
	}

	/** @private */
	_showTexts() {
		if (this._waitTimer)
			clearTimeout(this._waitTimer);
		this._waitTimer = null;
		this._root.classList.remove(PageTranslator._pendingClass);
	}

	/** @private */
	_translateTexts() {
		const walker = document.createTreeWalker(this._root, NodeFilter.SHOW_TEXT, {
			acceptNode: (node) => (PageTranslator._isTranslatable(node.parentElement)
				? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
		});
		for (let node = walker.nextNode(); node; node = walker.nextNode()) {
			const english = this._texts.get(node) ?? node.nodeValue ?? "";
			const translated = PageTranslator._translatePhrase(english);
			if (translated !== null) {
				this._texts.set(node, english);
				node.nodeValue = translated;
			}
		}

		const selector = PageTranslator._attributes.map((name) => "[" + name + "]").join(",");
		this._root.querySelectorAll(selector).forEach((element) => {
			if (!PageTranslator._isTranslatable(element))
				return;
			const english = this._attributeTexts.get(element) || {};
			PageTranslator._attributes.forEach((name) => {
				const value = english[name] ?? element.getAttribute(name);
				const translated = value === null ? null : PageTranslator._translatePhrase(value);
				if (value !== null && translated !== null) {
					english[name] = value;
					element.setAttribute(name, translated);
				}
			});
			this._attributeTexts.set(element, english);
		});
	}

	/**
	 * @param {string} text
	 * @returns {string | null} the text in the user's language, its spacing kept; null when it is
	 *   no phrase of the dictionary
	 * @private
	 */
	static _translatePhrase(text) {
		const phrase = text.trim();
		if (!phrase)
			return null;
		const translated = window.Asc.plugin.tr(phrase);
		return translated === phrase ? null : text.replace(phrase, translated);
	}

	/**
	 * @param {Element | null} element
	 * @returns {boolean}
	 * @private
	 */
	static _isTranslatable(element) {
		return !!element && !element.closest("script, style, [translate='no']");
	}
}
