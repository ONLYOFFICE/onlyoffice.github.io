/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

/** @typedef {import('./citation').CSLCitation} CSLCitation */
/** @typedef {import('./citation-item').CitationItem} CitationItem */

class CSLCitationStorage {
    /** @type {Array<CitationItem>} */
    #items;
    /** @type {Array<string>} */
    #itemIds;
    /** @type {Array<CSLCitation>} */
    #citations;

    constructor() {
        this.#items = [];
        this.#itemIds = [];
        this.#citations = [];
        this.size = 0;
    }

    /** @returns {CitationItem} */
    /**
     * @param {string|number} id
     * @returns {CitationItem|null}
     **/
    getItem(id) {
        id = id.toString();
        const index = this.#itemIds.indexOf(id);
        if (index >= 0) return this.#items[index];
        return null;
    }
    /**
     *
     * @param {string|number} id
     * @returns {number}
     */
    getItemIndex(id) {
        id = id.toString();
        return this.#itemIds.indexOf(id);
    }
    clear() {
        this.#items = [];
        this.#citations = [];
        this.#itemIds = [];
        this.size = 0;
        return this;
    }
    /**
     * @param {string|number} id
     * @returns {CSLCitationStorage}
     */
    deleteItem(id) {
        id = id.toString();
        const index = this.#itemIds.indexOf(id);
        if (index >= 0) {
            this.#items.splice(index, 1);
            this.#itemIds.splice(index, 1);
            this.size--;
        }
        return this;
    }
    /**
     * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
     */
    forEachItem(callback) {
        for (var i = 0; i < this.size; i++) {
            callback(this.#items[i], this.#itemIds[i], this);
        }
    }
    /**
     * @param {string|number} id
     * @returns {boolean}
     */
    hasItem(id) {
        id = id.toString();
        return this.#itemIds.indexOf(id) >= 0;
    }
    /**
     * @param {string|number} id
     * @param {CitationItem} item
     * @returns {CSLCitationStorage}
     */
    #setItem(id, item) {
        id = id.toString();
        const index = this.#itemIds.indexOf(id);
        if (index >= 0) {
            this.#items[index] = item;
            return this;
        }
        this.#items.push(item);
        this.#itemIds.push(id);
        this.size++;
        return this;
    }
    /**
     * @param {CSLCitation} cslCitation
     * @returns {CSLCitationStorage}
     */
    addCitation(cslCitation) {
        this.#citations.push(cslCitation);
        cslCitation.setNoteIndex(this.#citations.length);
        
        cslCitation.getCitationItems().forEach((item) => {
            this.#setItem(item.id, item);
        });
        return this;
    }
    getAllCitationsInJson() {
        return this.#citations.map(citation => citation.toJSON());
    }
    /**
     * @param {string} id 
     * @returns {CSLCitation|undefined}
     */
    getCitation(id) {
        return this.#citations.find(citation => 
            citation.citationID === id
        );
    }
    /**
     * @param {string} id 
     * @returns {number}
     */
    getCitationIndex(id) {
        return this.#citations.findIndex(citation => citation.citationID === id)
    }
    /**
     * @param {string} id 
     * @returns {Array<[string, number]>}
     */
    getCitationsPre(id) {
        /** @type {Array<[string, number]>} */
        const citationsPre = [];
        this.#citations.find((citation, index) => {
            if (citation.citationID === id) {
                return true;
            }
            citationsPre.push([citation.citationID, index + 1]);
            return false;
        });
        return citationsPre;
    }
    /**
     * @param {string} id 
     * @returns {Array<[string, number]>}
     */
    getCitationsPost(id) {
        /** @type {Array<[string, number]>} */
        const citationsPost = [];
        const citationIndex = this.getCitationIndex(id);
        for (let i = citationIndex + 1; i < this.#citations.length; i++) {
            const citation = this.#citations[i];
            citationsPost.push([citation.citationID, i + 1]);
        }
        
        return citationsPost;
    }

}

export { CSLCitationStorage };
