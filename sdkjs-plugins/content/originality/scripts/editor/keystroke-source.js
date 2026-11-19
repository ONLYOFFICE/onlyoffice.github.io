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

/**
 * The keys the user presses in the document, reduced to what they do. The character a key typed
 * is dropped here and never leaves this class: the writing record keeps only when a key was
 * pressed and whether it typed, deleted, pasted, cut, undid or redid.
 *
 * The plugin holds the editor's only `onKeyDown` handler; anything else that needs keys listens
 * here.
 */
class KeystrokeSource {

	constructor() {
		/** @type {Array<(keystroke: Keystroke) => void>} */
		this._listeners = [];
	}

	attach() {
		window.Asc.plugin.attachEditorEvent("onKeyDown", (data) => {
			const kind = KeystrokeSource._kindOf(/** @type {KeyEventData} */ (data));
			if (kind) {
				const keystroke = { time: Date.now(), kind: kind };
				this._listeners.forEach((listener) => listener(keystroke));
			}
		});
	}

	/**
	 * @param {(keystroke: Keystroke) => void} listener
	 */
	onKeystroke(listener) {
		this._listeners.push(listener);
	}

	/**
	 * @typedef {{ key?: string, keyCode?: number, ctrlKey?: boolean, metaKey?: boolean, altKey?: boolean, shiftKey?: boolean }} KeyEventData
	 */

	/**
	 * @param {KeyEventData} e
	 * @returns {KeystrokeKind | null} null for keys that change nothing (arrows, modifiers, shortcuts)
	 * @private
	 */
	static _kindOf(e) {
		if (!e)
			return null;

		const key = typeof e.key === "string" ? e.key : "";
		// AltGr arrives as Ctrl+Alt on Windows and types characters, so it is not a shortcut
		const isAltGr = e.ctrlKey && e.altKey && !e.metaKey;
		if ((e.ctrlKey || e.metaKey) && !isAltGr) {
			// the letter by key code, which does not depend on the layout: Ctrl+V is "м" in Russian
			const letter = typeof e.keyCode === "number" && e.keyCode >= 65 && e.keyCode <= 90
				? String.fromCharCode(e.keyCode).toLowerCase() : key.toLowerCase();
			switch (letter) {
				case "v": return "paste";
				case "x": return "cut";
				case "z": return e.shiftKey ? "redo" : "undo";
				case "y": return "redo";
				default: return null;
			}
		}

		switch (key) {
			case "Backspace": return "backspace";
			case "Delete": return "delete";
			case "Enter": return "enter";
			case "Tab": return "char";
		}

		// one printable character; 229 / "Process" is a key an input method composes text with
		if (key.length === 1 || e.keyCode === 229 || key === "Process")
			return "char";
		return null;
	}
}
