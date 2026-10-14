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
 * A message box in a container, built on the shared `Message` component. One notice per
 * container: showing a new one replaces the previous.
 *
 * Two things about `Message` this takes care of: it renders title and text as HTML, so they are
 * escaped here; and its options object lives on the prototype and is shared by every instance,
 * so every option is passed each time rather than relying on a default.
 */
class Notice {

	/**
	 * @param {string} containerId
	 */
	constructor(containerId) {
		this._containerId = containerId;
		/** @type {{ close: () => void } | null} */
		this._message = null;
	}

	/**
	 * @param {"error" | "warning" | "info" | "success"} type
	 * @param {string} title - already translated
	 * @param {string} text - already translated
	 */
	show(type, title, text) {
		this.hide();
		this._message = new Message(this._containerId, {
			type                : type,
			title               : Notice._escape(title),
			text                : Notice._escape(text),
			duration            : 0,
			closeButton         : false,
			autoClose           : false,
			closeOnClickOutside : false,
		}).show();
	}

	hide() {
		if (this._message)
			this._message.close();
		this._message = null;
	}

	/**
	 * @param {string} value
	 * @returns {string}
	 * @private
	 */
	static _escape(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	}
}
