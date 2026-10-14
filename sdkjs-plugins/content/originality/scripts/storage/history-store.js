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

/// <reference path="../domain/history-codec.js" />
/// <reference path="../editor/custom-xml-parts.js" />
/// <reference path="./text-compression.js" />

/**
 * Keeps the writing histories in the document itself, one custom XML part per user:
 *
 *     <originality-history-1a2b3c4d xmlns="urn:onlyoffice:originality:history" user="…" name="…"
 *         format="1" encoding="deflate">base64 of the deflated HistoryCodec JSON</…>
 *
 * The user's part is told apart by its element name, which carries a hash of the user id: element
 * names survive the editor re-serialising the XML, attribute order and quoting may not.
 */
class HistoryStore {

	static namespace = "urn:onlyoffice:originality:history";
	static _rootPrefix = "originality-history-";

	/**
	 * @param {CustomXmlParts} parts
	 */
	constructor(parts) {
		this._parts = parts;
	}

	/**
	 * Every user's history in the document; parts that cannot be read are left out.
	 * @returns {Promise<WritingHistory[]>}
	 */
	async loadAll() {
		const xmls = await this._parts.read(HistoryStore.namespace);
		/** @type {WritingHistory[]} */
		const histories = [];
		for (const xml of xmls) {
			const history = await this._parse(xml);
			if (history)
				histories.push(history);
		}
		return histories;
	}

	/**
	 * Writes the user's history, replacing what was stored for them.
	 * @param {WritingHistory} history
	 * @returns {Promise<boolean>} whether it is in the document now
	 */
	async save(history) {
		const packed = await TextCompression.pack(HistoryCodec.encode(history));
		const root = HistoryStore._rootName(history.userId);
		const xml = "<" + root
			+ " xmlns=\"" + HistoryStore.namespace + "\""
			+ " user=\"" + HistoryStore._escape(history.userId) + "\""
			+ " name=\"" + HistoryStore._escape(history.userName) + "\""
			+ " format=\"" + HistoryCodec.version + "\""
			+ " encoding=\"" + packed.encoding + "\">"
			+ packed.data
			+ "</" + root + ">";
		// the bare name, without "<": a re-serialised root may come back with a namespace prefix
		return this._parts.write(root, xml);
	}

	/**
	 * @param {string} xml
	 * @returns {Promise<WritingHistory | null>}
	 * @private
	 */
	async _parse(xml) {
		const doc = new DOMParser().parseFromString(xml, "application/xml");
		const root = doc.documentElement;
		if (!root || root.getElementsByTagName("parsererror").length || root.localName.indexOf(HistoryStore._rootPrefix) !== 0)
			return null;

		const json = await TextCompression.unpack(root.getAttribute("encoding") || "", (root.textContent || "").trim());
		return json === null ? null : HistoryCodec.decode(json);
	}

	/**
	 * An element name that is the same for the same user: the prefix and an FNV-1a hash of the id.
	 * @param {string} userId
	 * @returns {string}
	 * @private
	 */
	static _rootName(userId) {
		let hash = 0x811c9dc5;
		for (let i = 0; i < userId.length; ++i) {
			hash ^= userId.charCodeAt(i);
			hash = Math.imul(hash, 0x01000193) >>> 0;
		}
		return HistoryStore._rootPrefix + hash.toString(16).padStart(8, "0");
	}

	/**
	 * @param {string} value
	 * @returns {string}
	 * @private
	 */
	static _escape(value) {
		return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	}
}
