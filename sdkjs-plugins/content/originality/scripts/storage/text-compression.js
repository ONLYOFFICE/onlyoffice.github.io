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
 * Packs text into base64 for storing inside the document, deflated where the browser can
 * (`CompressionStream`, Chromium 80+). The packed form names its encoding, so either side reads
 * what the other wrote.
 */
const TextCompression = Object.freeze({

	/**
	 * @param {string} text
	 * @returns {Promise<{ encoding: "deflate" | "plain", data: string }>}
	 */
	async pack(text) {
		const bytes = new TextEncoder().encode(text);
		if (typeof CompressionStream === "undefined")
			return { encoding: "plain", data: TextCompression._toBase64(bytes) };

		const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"));
		const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
		return { encoding: "deflate", data: TextCompression._toBase64(compressed) };
	},

	/**
	 * @param {string} encoding
	 * @param {string} data
	 * @returns {Promise<string | null>} null when it cannot be unpacked here
	 */
	async unpack(encoding, data) {
		try {
			const bytes = TextCompression._fromBase64(data);
			if (encoding === "plain")
				return new TextDecoder().decode(bytes);
			if (encoding !== "deflate" || typeof DecompressionStream === "undefined")
				return null;

			const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
			return await new Response(stream).text();
		} catch (e) {
			return null;
		}
	},

	/**
	 * @param {Uint8Array} bytes
	 * @returns {string}
	 * @private
	 */
	_toBase64(bytes) {
		let binary = "";
		const chunk = 0x8000;
		for (let i = 0; i < bytes.length; i += chunk)
			binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
		return btoa(binary);
	},

	/**
	 * @param {string} base64
	 * @returns {Uint8Array<ArrayBuffer>}
	 * @private
	 */
	_fromBase64(base64) {
		const binary = atob(base64);
		const bytes = new Uint8Array(new ArrayBuffer(binary.length));
		for (let i = 0; i < binary.length; ++i)
			bytes[i] = binary.charCodeAt(i);
		return bytes;
	},
});
