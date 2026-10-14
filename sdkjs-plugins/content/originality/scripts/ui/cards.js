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
 * The building blocks of the result cards both tabs draw. Text is always set as text, never as
 * HTML: much of it comes from the API or the document.
 */
const Cards = Object.freeze({

	/**
	 * @param {string} tag
	 * @param {string} className
	 * @param {string} [text]
	 * @returns {HTMLElement}
	 */
	element(tag, className, text) {
		const element = document.createElement(tag);
		element.className = className;
		if (text !== undefined)
			element.textContent = text;
		return element;
	},

	/**
	 * @param {string} title
	 * @returns {HTMLElement}
	 */
	card(title) {
		const card = Cards.element("section", "result-card");
		card.appendChild(Cards.element("h3", "result-card__title", title));
		return card;
	},

	/**
	 * @param {string} label
	 * @param {string} value
	 * @returns {HTMLElement}
	 */
	row(label, value) {
		const row = Cards.element("div", "result-row");
		row.appendChild(Cards.element("span", "result-row__label", label));
		row.appendChild(Cards.element("span", "result-row__value", value));
		return row;
	},

	/**
	 * @param {string} text
	 * @returns {HTMLElement}
	 */
	note(text) {
		return Cards.element("p", "result-note", text);
	},

	/**
	 * Makes an element act as a button: click, Enter and Space.
	 * @param {HTMLElement} element
	 * @param {() => void} action
	 */
	clickable(element, action) {
		element.tabIndex = 0;
		element.setAttribute("role", "button");
		element.addEventListener("click", action);
		element.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				action();
			}
		});
	},
});
