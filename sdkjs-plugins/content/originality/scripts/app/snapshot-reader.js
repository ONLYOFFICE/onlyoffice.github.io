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

/// <reference path="../editor/document-reader.js" />

/**
 * Reads the document text for the recording's snapshots, the way {@link DocumentReader.readDocument}
 * has it: paragraphs joined by line breaks.
 *
 * At first every read reads every paragraph. Where the editor names the paragraphs that changed
 * (`onParagraphText`, in the editions with text annotations), the caller switches to
 * {@link SnapshotReader.readChangedOnly}: the text of the others is kept from before, and only the
 * order of the paragraphs and the text of the changed ones are read again.
 */
class SnapshotReader {

	/**
	 * @param {DocumentReader} reader
	 */
	constructor(reader) {
		this._reader = reader;
		/** @type {Map<string, string>} the text of every paragraph as of the last read */
		this._texts = new Map();
		/** @type {Set<string>} paragraphs reported changed since the last read */
		this._changed = new Set();
		this._changedOnly = false;
	}

	/**
	 * From now on, read only the paragraphs reported through {@link SnapshotReader.markChanged}.
	 */
	readChangedOnly() {
		this._changedOnly = true;
	}

	/**
	 * @param {string} paragraphId
	 */
	markChanged(paragraphId) {
		this._changed.add(paragraphId);
	}

	/**
	 * @returns {Promise<string>} the document text
	 */
	read() {
		return this._read(!this._changedOnly || this._texts.size === 0);
	}

	/**
	 * Reads every paragraph whatever has been reported, to catch a change no event announced.
	 * @returns {Promise<string>} the document text
	 */
	readAll() {
		return this._read(true);
	}

	/**
	 * @param {boolean} all
	 * @returns {Promise<string>}
	 * @private
	 */
	async _read(all) {
		// what is reported from here on belongs to the next read
		const changed = Array.from(this._changed);
		this._changed.clear();

		const read = await this._reader.readParagraphs(all ? null : changed);
		let texts = read.texts;
		// paragraphs that came in since the last read and have not been reported yet
		const unknown = all ? [] : read.ids.filter((id) => !this._texts.has(id) && !(id in texts));
		if (unknown.length)
			texts = Object.assign({}, texts, (await this._reader.readParagraphs(unknown)).texts);

		/** @type {Map<string, string>} */
		const next = new Map();
		read.ids.forEach((id) => next.set(id, id in texts ? texts[id] : (this._texts.get(id) || "")));
		this._texts = next;
		return read.ids.map((id) => next.get(id)).join("\n");
	}
}

