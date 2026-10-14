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
 * @typedef {"scan" | "writing" | "settings"} PanelTab
 */

/**
 * The tab strip of the plugin panel and the sections it switches between. It knows the markup of
 * `index.html` (`[data-tab]` buttons, `[data-section]` sections) and nothing about what the
 * sections hold.
 */
class TabView {

	/** the sections of the panel, in the order of its tabs */
	static tabs = Object.freeze({
		scan     : /** @type {PanelTab} */ ("scan"),
		writing  : /** @type {PanelTab} */ ("writing"),
		settings : /** @type {PanelTab} */ ("settings"),
	});

	/**
	 * @param {HTMLElement} root - the element that holds both the strip and the sections
	 */
	constructor(root) {
		/** @type {HTMLButtonElement[]} */
		this._tabs = Array.from(root.querySelectorAll("[data-tab]"));
		/** @type {HTMLElement[]} */
		this._sections = Array.from(root.querySelectorAll("[data-section]"));

		this._tabs.forEach((tab) => {
			tab.addEventListener("click", () => this.show(/** @type {PanelTab} */ (tab.dataset.tab)));
		});
	}

	/**
	 * @param {PanelTab} name
	 */
	show(name) {
		this._tabs.forEach((tab) => {
			const isActive = tab.dataset.tab === name;
			tab.classList.toggle("tabs__tab--active", isActive);
			tab.setAttribute("aria-selected", String(isActive));
		});
		this._sections.forEach((section) => {
			section.hidden = section.dataset.section !== name;
		});
	}
}
