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
 * Looks up MEDLINE (Index Medicus) journal title abbreviations, mirroring
 * the "Automatically abbreviate journal titles" option in Zotero's own
 * word-processor Document Preferences. Backed by a bundled JSON table
 * derived from JabRef's abbrv.jabref.org journal_abbreviations_medicus.csv
 * (CC0-1.0) - see 3rd-party.txt.
 */
function AbbreviationsManager() {
    this._ABBREVIATIONS_PATH =
        "./resources/csl/abbreviations/medline-abbreviations.json";

    /** @type {Object<string, string> | null} */
    this._map = null;

    /** @type {Promise<void> | null} */
    this._loadingPromise = null;
}

/**
 * Loads the abbreviation table. Safe to call more than once; the fetch
 * itself only happens once. Never rejects - on failure the table is left
 * empty so lookups just return no match.
 * @returns {Promise<void>}
 */
AbbreviationsManager.prototype.load = function () {
    if (this._map) {
        return Promise.resolve();
    }
    if (this._loadingPromise) {
        return this._loadingPromise;
    }
    const self = this;
    this._loadingPromise = fetch(this._ABBREVIATIONS_PATH)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            self._map = data;
        })
        .catch(function (err) {
            console.error(
                "Failed to load MEDLINE journal abbreviations:",
                err
            );
            self._map = {};
        });
    return this._loadingPromise;
};

/**
 * @returns {boolean}
 */
AbbreviationsManager.prototype.isLoaded = function () {
    return this._map !== null;
};

/**
 * @param {string} title - Full journal title (container-title).
 * @returns {string|null} The MEDLINE abbreviation, or null if unknown/not loaded.
 */
AbbreviationsManager.prototype.getJournalAbbreviation = function (title) {
    if (!this._map || !title) {
        return null;
    }
    return this._map[title.trim().toLowerCase()] || null;
};

/**
 * Builds the citeproc `sys.getAbbreviation` hook. Per citeproc-js's contract
 * (see `loadAbbreviation` in vendor/citeproc/citeproc_commonjs.js), citeproc
 * invokes this as `state.sys.getAbbreviation(styleID, abbrevs, jurisdiction,
 * category, orig)` and expects it to mutate `abbrevs` in place with any
 * match, then return `jurisdiction` unchanged. Must stay a plain function
 * (not an arrow) - `this` at the call site is `state.sys`, which is where
 * `AbbreviationSegments` lives.
 * @returns {function(string, Object<string, any>, string, string, string): string}
 */
AbbreviationsManager.prototype.createCiteprocHook = function () {
    const self = this;
    return function (styleID, abbrevs, jurisdiction, category, orig) {
        if (category === "container-title") {
            const abbreviation = self.getJournalAbbreviation(orig);
            if (abbreviation) {
                if (!abbrevs[jurisdiction]) {
                    // @ts-ignore
                    abbrevs[jurisdiction] = new this.AbbreviationSegments();
                }
                if (!abbrevs[jurisdiction][category]) {
                    abbrevs[jurisdiction][category] = {};
                }
                abbrevs[jurisdiction][category][orig] = abbreviation;
            }
        }
        return jurisdiction;
    };
};

export { AbbreviationsManager };
