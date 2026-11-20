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

/// <reference path="./document-reader.js" />

/**
 * Follows the selected text. The text editor tells plugins of no selection change: `onClick` comes
 * only for a click without a drag, and `onTargetPositionChanged` for the caret. So both make it
 * read the selection soon, and a slow poll catches what neither tells: selecting with the mouse
 * or the keyboard.
 */
class SelectionWatcher {

	static _pollMs = 2000;
	static _settleMs = 300;

	/**
	 * @param {DocumentReader} reader
	 */
	constructor(reader) {
		this._reader = reader;
		/** @type {((text: string) => void)[]} */
		this._listeners = [];
		this._text = "";
		/** @type {ReturnType<typeof setTimeout> | null} */
		this._timer = null;
		this._isReading = false;
	}

	attach() {
		const soon = () => this._readSoon();
		window.Asc.plugin.attachEditorEvent("onClick", soon);
		window.Asc.plugin.attachEditorEvent("onTargetPositionChanged", soon);
		this._poll();
	}

	/**
	 * @param {(text: string) => void} listener - gets the selected text now and whenever it changes;
	 *   empty when nothing is selected
	 */
	onChange(listener) {
		this._listeners.push(listener);
		listener(this._text);
	}

	/**
	 * Reads now, and again a while after the read is done.
	 * @private
	 */
	_poll() {
		this._read().finally(() => setTimeout(() => this._poll(), SelectionWatcher._pollMs));
	}

	/** @private */
	_readSoon() {
		if (!this._timer) {
			this._timer = setTimeout(() => {
				this._timer = null;
				this._read();
			}, SelectionWatcher._settleMs);
		}
	}

	/** @private */
	async _read() {
		if (this._isReading)
			return;
		this._isReading = true;
		try {
			const text = (await this._reader.readSelection()).trim();
			if (text !== this._text) {
				this._text = text;
				this._listeners.forEach((listener) => listener(text));
			}
		} finally {
			this._isReading = false;
		}
	}
}
