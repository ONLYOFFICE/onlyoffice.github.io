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
 * @typedef {Object} ParagraphText
 * @property {string} text - as the editor's text annotator sees it; annotation offsets refer to it
 * @property {string} recalcId - the editor accepts annotations for this version of the paragraph only
 */

/**
 * @typedef {Object} AnnotationPosition
 * @property {string} id - the range id the plugin gave it
 * @property {string} name - the annotation name the plugin gave it
 * @property {number} start - in the editor's units (code points)
 * @property {number} length
 */

/**
 * The text of each paragraph as the editor reports it through `onParagraphText`: once for every
 * paragraph when the plugin starts listening, then again a moment after a paragraph changes.
 *
 * The event exists where the editor has text annotations (Developer Edition, Desktop Editors);
 * elsewhere it never comes, and `isSupported` resolves to false.
 */
class ParagraphTexts {

	/** how long to wait for the first event before deciding the editor has none */
	static _supportTimeoutMs = 4000;

	constructor() {
		/** @type {Map<string, ParagraphText>} */
		this._paragraphs = new Map();
		/** @type {Array<(paragraphId: string, paragraph: ParagraphText, annotations: AnnotationPosition[]) => void>} */
		this._listeners = [];

		/** @type {(supported: boolean) => void} */
		let settle = () => {};
		/** @type {Promise<boolean>} */
		this._supported = new Promise((resolve) => { settle = resolve; });
		this._settle = settle;
	}

	/**
	 * Starts listening. The editor answers with every paragraph of the document.
	 */
	attach() {
		window.Asc.plugin.attachEditorEvent("onParagraphText", (data) => this._receive(data));
		setTimeout(() => this._settle(false), ParagraphTexts._supportTimeoutMs);
	}

	/**
	 * @returns {Promise<boolean>} whether the editor reports paragraph texts, and so supports text
	 *   annotations
	 */
	isSupported() {
		return this._supported;
	}

	/**
	 * @param {string} paragraphId
	 * @returns {ParagraphText | undefined}
	 */
	get(paragraphId) {
		return this._paragraphs.get(paragraphId);
	}

	/**
	 * @param {(paragraphId: string, paragraph: ParagraphText, annotations: AnnotationPosition[]) => void} listener
	 */
	onChange(listener) {
		this._listeners.push(listener);
	}

	/**
	 * @param {unknown} data
	 * @private
	 */
	_receive(data) {
		const event = /** @type {{ paragraphId?: unknown, recalcId?: unknown, text?: unknown, annotations?: unknown }} */ (data);
		if (!event || typeof event.paragraphId !== "string")
			return;

		this._settle(true);

		/** @type {ParagraphText} */
		const paragraph = { text: String(event.text || ""), recalcId: String(event.recalcId || "") };
		this._paragraphs.set(event.paragraphId, paragraph);

		const annotations = Array.isArray(event.annotations)
			? event.annotations.map((a) => ({
				id     : String(a.id),
				name   : String(a.name || ""),
				start  : Number(a.start) || 0,
				length : Number(a.length) || 0,
			}))
			: [];

		const paragraphId = event.paragraphId;
		this._listeners.forEach((listener) => listener(paragraphId, paragraph, annotations));
	}
}
