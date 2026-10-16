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
 * @typedef {"main" | "writing" | "settings"} PanelPage
 */

/**
 * The pages of the panel, one shown at a time: the scan, which is where the panel starts; the
 * writing record; the settings. The scan page has the buttons that open the other two, and each
 * of those has a back arrow by its name, and its whole header goes back. Settings are stored as they change, so leaving a page
 * needs nothing more.
 */
class PanelPages {

	constructor() {
		const tr = window.Asc.plugin.tr;
		/** @type {Record<PanelPage, HTMLElement>} */
		this._pages = {
			main     : /** @type {HTMLElement} */ (document.getElementById("main-page")),
			writing  : /** @type {HTMLElement} */ (document.getElementById("writing-page")),
			settings : /** @type {HTMLElement} */ (document.getElementById("settings-page")),
		};

		this._link(new Button("open-settings", { variant: "icon-only", size: "small", tooltip: tr("Settings") }), "settings");
		this._back("close-settings");
		// the dot blinks while the writing is recorded, as on the writing page itself
		this._writingButton = /** @type {HTMLElement} */ (document.getElementById("open-writing"));
		this._link(new Button("open-writing", {
			variant : "secondary",
			text    : tr("Writing record"),
			icon    : "<span class=\"recording__dot\"></span>",
		}), "writing");
		this._back("close-writing");
		this.showRecording(false);
	}

	showMain() {
		this._show("main");
	}

	showSettings() {
		this._show("settings");
	}

	/**
	 * @param {boolean} on - whether the user's writing is being recorded
	 */
	showRecording(on) {
		this._writingButton.classList.toggle("open-writing--recording", on);
	}

	/**
	 * @param {Button} button
	 * @param {PanelPage} page - the page the button opens
	 * @private
	 */
	_link(button, page) {
		button.subscribe((event) => {
			if (event.type === "button:click")
				this._show(page);
		});
	}

	/**
	 * The back arrow, and the header it is in: a click anywhere on the header goes back, the
	 * arrow's own click included, since it reaches the header too.
	 * @param {string} id - the arrow's
	 * @private
	 */
	_back(id) {
		new Button(id, { variant: "icon-only", size: "small", tooltip: window.Asc.plugin.tr("Back") });
		const header = /** @type {HTMLElement} */ (/** @type {HTMLElement} */ (document.getElementById(id)).closest(".page__header"));
		header.addEventListener("click", () => this._show("main"));
	}

	/**
	 * @param {PanelPage} page
	 * @private
	 */
	_show(page) {
		Object.entries(this._pages).forEach(([name, element]) => element.classList.toggle("hidden", name !== page));
	}
}
