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

/// <reference path="./confirm-protocol.js" />

/**
 * A window that asks the user to confirm something, with the editor's buttons in its footer. One
 * question at a time: asking again answers the open one as closed.
 */
class ConfirmWindow {

	/** the window's width; its height follows the text */
	static _width = 380;

	constructor() {
		/** @type {PluginWindow | null} */
		this._window = null;
		/** @type {((answer: number) => void) | null} */
		this._resolve = null;
	}

	/**
	 * @param {string} title - the window's caption, translated
	 * @param {string[]} paragraphs - the question, translated
	 * @param {string[]} buttons - captions, translated; the first is the main one
	 * @returns {Promise<number>} the index of the button pressed; -1 when the window was closed
	 */
	ask(title, paragraphs, buttons) {
		this._finish(-1);

		const window_ = /** @type {PluginWindow} */ (new window.Asc.PluginWindow());
		/** @type {ConfirmData} */
		const data = { paragraphs: paragraphs };
		window_.attachEvent(ConfirmProtocol.ready, () => window_.command(ConfirmProtocol.data, data));
		window_.attachEvent(ConfirmProtocol.height, (height) => {
			// 2 is the window's border
			window.Asc.plugin.executeMethod("ResizeWindow", [window_.id, [ConfirmWindow._width - 2, Number(height)]], () => {});
		});
		window_.show({
			url            : "confirm.html",
			description    : title,
			isVisual       : true,
			isModal        : true,
			EditorsSupport : ["word"],
			buttons        : buttons.map((text, i) => ({ text: text, primary: i === 0 })),
			size           : [ConfirmWindow._width, 120],
		});
		this._window = window_;
		return new Promise((resolve) => {
			this._resolve = resolve;
		});
	}

	/**
	 * A footer button or the close cross of a window reaches the plugin with the window's id; the
	 * plugin has to close the window itself.
	 * @param {number} id - the button's index; -1 for the cross
	 * @param {string} windowId
	 * @returns {boolean} whether it was this window
	 */
	onButton(id, windowId) {
		if (!this._window || this._window.id !== windowId)
			return false;
		this._finish(id);
		return true;
	}

	/**
	 * @param {AscTheme} theme
	 */
	onThemeChanged(theme) {
		if (this._window)
			this._window.command("onThemeChanged", theme);
	}

	/**
	 * @param {number} answer
	 * @private
	 */
	_finish(answer) {
		if (this._window)
			this._window.close();
		this._window = null;
		const resolve = this._resolve;
		this._resolve = null;
		if (resolve)
			resolve(answer);
	}
}
