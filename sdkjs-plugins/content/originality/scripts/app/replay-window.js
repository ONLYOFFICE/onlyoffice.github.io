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

/// <reference path="../domain/writing-recorder.js" />
/// <reference path="./replay-protocol.js" />

/**
 * The Writer Replay window: opens it, hands it the sessions to play once its page is ready, and
 * closes it. One window at a time; opening again brings the same one forward with fresh data.
 */
class ReplayWindow {

	constructor() {
		/** @type {PluginWindow | null} */
		this._window = null;
		/** @type {ReplayData} */
		this._data = { sessions: [], writerId: null };
	}

	/**
	 * @param {WritingSession[]} sessions - every recorded session, oldest first
	 * @param {string | null} writerId - the writer to play first
	 */
	show(sessions, writerId) {
		this._data = { sessions: sessions, writerId: writerId };
		if (this._window) {
			this._send();
			this._window.activate();
			return;
		}

		const window_ = /** @type {PluginWindow} */ (new window.Asc.PluginWindow());
		window_.attachEvent(ReplayProtocol.ready, () => this._send());
		window_.show({
			url            : "replay.html",
			description    : window.Asc.plugin.tr("Writer Replay"),
			isVisual       : true,
			isModal        : false,
			EditorsSupport : ["word"],
			buttons        : [],
			size           : [820, 600],
		});
		this._window = window_;
	}

	/**
	 * The window's close cross reaches the plugin as a button with the window's id; the plugin has
	 * to close the window itself.
	 * @param {string} windowId
	 * @returns {boolean} whether it was this window
	 */
	onButton(windowId) {
		if (!this._window || this._window.id !== windowId)
			return false;

		this._window.close();
		this._window = null;
		return true;
	}

	/**
	 * @param {AscTheme} theme
	 */
	onThemeChanged(theme) {
		if (this._window)
			this._window.command("onThemeChanged", theme);
	}

	/** @private */
	_send() {
		if (this._window)
			this._window.command(ReplayProtocol.data, this._data);
	}
}
