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
 * What was changed in a bibliography with Zotero's bibliography editor, as
 * the code of the bibliography field keeps it: items listed without being
 * cited, entries left out and entries whose text was rewritten. Each item
 * is named by its URIs.
 */
class BibliographyEdits {
    /**
     * @param {any} [code] - the JSON of the bibliography field code
     */
    constructor(code) {
        /**
         * Items in the bibliography that no citation names.
         * @type {Array<Array<string>>}
         */
        this.uncited = BibliographyEdits.#toUriLists(code && code.uncited);
        /**
         * Cited items whose entries are left out.
         * @type {Array<Array<string>>}
         */
        this.omitted = BibliographyEdits.#toUriLists(code && code.omitted);
        /**
         * Entries whose text was rewritten, in the format of the word
         * processor the edit was made in: RTF for Word and LibreOffice.
         * @type {Array<{uris: Array<string>, text: string}>}
         */
        this.custom = [];
        if (code && Array.isArray(code.custom)) {
            for (const entry of code.custom) {
                if (
                    Array.isArray(entry) &&
                    Array.isArray(entry[0]) &&
                    typeof entry[1] === "string"
                ) {
                    this.custom.push({
                        uris: BibliographyEdits.#toUris(entry[0]),
                        text: entry[1],
                    });
                }
            }
        }
    }

    /** @returns {boolean} */
    isEmpty() {
        return !this.uncited.length && !this.omitted.length && !this.custom.length;
    }

    /**
     * The item a Zotero URI names, as one string: "users/KEY" for the
     * user's own library, synced or local, and "groups/ID/KEY" for a group.
     * The URIs of one item in different places then give the same string.
     * @param {string} uri
     * @returns {string | null} null for something else than an item URI
     */
    static itemKey(uri) {
        const match = String(uri).match(
            /zotero\.org\/(users|groups)\/(\d+|local\/[^/]+)\/items\/([^/?#]+)/i
        );
        if (!match) {
            return null;
        }
        return match[1].toLowerCase() === "groups"
            ? "groups/" + match[2] + "/" + match[3]
            : "users/" + match[3];
    }

    /**
     * @param {any} value
     * @returns {Array<Array<string>>}
     */
    static #toUriLists(value) {
        // Zotero writes lists of URIs; an older format kept an object
        // keyed by local item ids, which mean nothing outside that Zotero.
        if (!Array.isArray(value)) {
            return [];
        }
        return value
            .filter(Array.isArray)
            .map(BibliographyEdits.#toUris)
            .filter((uris) => uris.length > 0);
    }

    /**
     * @param {Array<any>} value
     * @returns {Array<string>}
     */
    static #toUris(value) {
        return value.filter((uri) => typeof uri === "string");
    }
}

export { BibliographyEdits };
