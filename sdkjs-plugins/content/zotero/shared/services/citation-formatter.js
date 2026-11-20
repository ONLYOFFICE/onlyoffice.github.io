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

/// <reference path="../types-global.js" />

import { CslHtmlParser } from "./csl-html-parser";

/**
 * @typedef {import("../csl/citation").CSLCitation} CSLCitation
 * @typedef {import("../csl/citation").CSLCitationStorage} CSLCitationStorage
 * @typedef {import("../csl/citation/citation-item").CitationItem} CitationItem
 * @typedef {import("../csl/styles").CslStylesManager} CslStylesManager
 * @typedef {import("../csl/locales").LocalesManager} LocalesManager
 * @typedef {import("../csl/abbreviations").AbbreviationsManager} AbbreviationsManager
 */

/**
 * The citeproc engine of the citations in the storage: kept as long as the
 * style, language and abbreviations it was built for stay, and fed the items
 * of the storage.
 */
class CitationFormatter {
    /** @type {CSLCitationStorage} */
    #storage;
    /** @type {LocalesManager} */
    #localesManager;
    /** @type {CslStylesManager} */
    #cslStylesManager;
    /** @type {AbbreviationsManager} */
    #abbreviationsManager;
    /** @type {(id: string) => CitationItem | null} */
    #extraItem;
    /** @type {any} CSL.Engine */
    #engine = null;
    /**
     * What the engine was built for, so an engine that is still valid is
     * reused instead of recompiling the whole CSL style.
     * @type {string|null}
     */
    #engineKey = null;
    /**
     * Parsed CSL/locale XML, keyed by the source string, in the form
     * citeproc-js makes of a string itself (CSL.parseXml). null marks XML
     * it could not parse.
     * @type {Map<string, Object|null>}
     */
    #parsedXmlCache = new Map();
    /** Whether the items are given without the URL of a paper article. */
    #skipUrlForPaperArticles = false;

    /**
     * @param {Object} options
     * @param {CSLCitationStorage} options.storage
     * @param {LocalesManager} options.localesManager
     * @param {CslStylesManager} options.cslStylesManager
     * @param {AbbreviationsManager} options.abbreviationsManager
     * @param {(id: string) => CitationItem | null} [options.extraItem] - an
     *  item the citations do not cite, such as one the bibliography lists
     *  without a citation
     */
    constructor(options) {
        this.#storage = options.storage;
        this.#localesManager = options.localesManager;
        this.#cslStylesManager = options.cslStylesManager;
        this.#abbreviationsManager = options.abbreviationsManager;
        this.#extraItem = options.extraItem || (() => null);
    }

    /**
     * Has the engine built anew on the next update: citeproc keeps item data
     * in its own registry and does not re-read items it already knows.
     */
    invalidate() {
        this.#engineKey = null;
    }

    /**
     * Gives the engine the items of the storage, building it first if the
     * style, the language or the abbreviations changed.
     */
    update() {
        const self = this;

        /** @type {string[]} */
        const arrIds = [];
        this.#storage.forEachItem(function (item, id) {
            arrIds.push(id);
        });

        const styleId = this.#cslStylesManager.getLastUsedStyleIdOrDefault();
        const language = this.#localesManager.getLastUsedLanguage();
        const styleContent = this.#cslStylesManager.cached(styleId);
        const bAbbreviate =
            this.#abbreviationsManager.isLoaded() &&
            this.#cslStylesManager.getAbbreviateJournalTitles();
        // Building a CSL.Engine compiles the whole style XML into a token
        // tree, a fixed cost paid on every citation action. citeproc-js is
        // meant to keep one engine per session and be fed updateItems(), so
        // only rebuild when something the engine baked in has changed. The
        // style content length is part of the key so that re-uploading a
        // custom style under the same id still invalidates it, and the
        // abbreviation flag is there because the hook below is bound once,
        // at construction.
        const engineKey =
            styleId +
            " " +
            language +
            " " +
            (styleContent ? styleContent.length : 0) +
            " " +
            bAbbreviate;

        if (this.#engine && this.#engineKey === engineKey) {
            // citeproc reads only the items it does not know yet, and keeps
            // what it worked out for the others: year suffixes, which
            // names tell authors apart, sort keys. The items may have
            // changed since - fetched from the library, read with the other
            // URL setting, edited by a co-author, taken back by an undo - so
            // it forgets them first. This costs far less than building a
            // new engine.
            this.#engine.updateItems([]);
            if (arrIds.length) {
                this.#engine.updateItems(arrIds);
            }
            return;
        }

        /** @type {Object<string, any>} */
        const sys = {
            /** @param {string} id */
            retrieveLocale: function (id) {
                const localeContent =
                    self.#localesManager.getLocale(id) ||
                    self.#localesManager.getLocale();
                return localeContent
                    ? self.#parseXmlCached(localeContent)
                    : localeContent;
            },
            /** @param {string} id */
            retrieveItem: function (id) {
                const item = self.#storage.getItem(id);
                if (!item) {
                    const extra = self.#extraItem(String(id));
                    return extra
                        ? extra.toFlatJSON(0, self.#skipUrlForPaperArticles)
                        : null;
                }
                const index = self.#storage.getItemIndex(id);
                return item.toFlatJSON(index, self.#skipUrlForPaperArticles);
            },
        };

        if (bAbbreviate) {
            sys.getAbbreviation = this.#abbreviationsManager.createCiteprocHook();
        }

        // @ts-ignore
        this.#engine = new CSL.Engine(
            sys,
            styleContent ? this.#parseXmlCached(styleContent) : styleContent,
            language,
            true,
        );
        this.#engineKey = engineKey;
        if (arrIds.length) {
            this.#engine.updateItems(arrIds);
        }
    }

    /**
     * Gives the engine the items of a citation that it does not know yet.
     * @param {CSLCitation} cslCitation
     */
    addItemsOf(cslCitation) {
        const storage = this.#storage;
        const isNew = cslCitation
            .getCitationItems()
            .some(function (/** @type {CitationItem} */ item) {
                return !storage.hasItem(item.id);
            });
        if (!isNew) {
            return;
        }
        /** @type {string[]} */
        const arrIds = [];
        storage.forEachItem(function (item, id) {
            arrIds.push(id);
        });
        this.#engine.updateItems(arrIds);
    }

    /**
     * The citation formatted where it stands among the stored ones. Its plain
     * text is kept with it.
     * @param {CSLCitation} cslCitation
     * @returns {string}
     */
    formatCitation(cslCitation) {
        const citationsPre = this.#storage.getCitationsPre(cslCitation.citationID);
        const citationsPost = this.#storage.getCitationsPost(cslCitation.citationID);

        this.#engine.rebuildProcessorState(this.#storage.getAllCitationsInJson());

        const formattedCitationObj = this.#engine.processCitationCluster(
            cslCitation.toJSON(),
            citationsPre,
            citationsPost,
        );

        const htmlCitation = unEscapeHtml(formattedCitationObj[1][0][1]);
        const tempElement = document.createElement("div");
        document.createDocumentFragment().appendChild(tempElement);
        tempElement.innerHTML = CslHtmlParser.purifyHtml(htmlCitation);
        cslCitation.setPlainCitation(tempElement.innerText);

        return htmlCitation;
    }

    /**
     * Every stored citation formatted, in one pass: citeproc formats them
     * all knowing the ones before each.
     * @returns {Map<string, string>} the HTML by citationID
     */
    formatAll() {
        /** @type {Map<string, string>} */
        const formattedById = new Map();
        this.#engine
            .rebuildProcessorState(this.#storage.getAllCitationsInJson())
            // Each as [citationID, noteIndex, text].
            .forEach(function (/** @type {Array<any>} */ result) {
                formattedById.set(String(result[0]), unEscapeHtml(String(result[2])));
            });
        return formattedById;
    }

    /**
     * citeproc's bibliography of the stored citations.
     * @param {Array<string>} uncitedIds - items listed without a citation
     * @param {boolean} skipUrlForPaperArticles
     * @returns {any} as makeBibliography() gives it
     */
    makeBibliography(uncitedIds, skipUrlForPaperArticles) {
        if (skipUrlForPaperArticles) {
            this.#skipUrlForPaperArticles = true;
            this.update();
        }
        try {
            // The citations of the document as they are now: the engine may
            // still hold those of an earlier action, and updateUncitedItems
            // drops every item they do not cite - a citation pasted in or
            // added by a co-author since would miss from the bibliography.
            this.#engine.rebuildProcessorState(this.#storage.getAllCitationsInJson());
            // Given anew each time: citeproc keeps the uncited items of the
            // previous bibliography otherwise.
            this.#engine.updateUncitedItems(uncitedIds);
            return this.#engine.makeBibliography();
        } finally {
            if (skipUrlForPaperArticles) {
                this.#skipUrlForPaperArticles = false;
                this.update();
            }
        }
    }

    /**
     * Parses CSL/locale XML the way citeproc-js parses a string itself, once
     * per string. Returns the original string if parsing fails, which
     * citeproc still handles.
     *
     * Not a DOM Element: with one, citeproc takes its CSL.XmlDOM path, which
     * fails on a style with a <names> that has no <name> outside
     * <substitute>, such as "AMA Manual of Style 11th edition" - it climbs
     * to the document node, which has no tagName.
     * @param {string} xmlString
     * @returns {Object|string}
     */
    #parseXmlCached(xmlString) {
        let parsed = this.#parsedXmlCache.get(xmlString);
        if (parsed === undefined) {
            parsed = null;
            try {
                // @ts-ignore citeproc does not declare its parser.
                parsed = CSL.parseXml(xmlString);
            } catch (e) {
                console.error(
                    "Failed to pre-parse CSL/locale XML, falling back to citeproc's string parser:",
                    e,
                );
            }
            this.#parsedXmlCache.set(xmlString, parsed);
        }
        // citeproc changes what it is given, so each engine gets its own
        // copy. Copying takes a millisecond or so; parsing a large style
        // several times more, and building the engine far more still.
        return parsed ? JSON.parse(JSON.stringify(parsed)) : xmlString;
    }
}

/**
 * @param {string} htmlString
 * @returns {string}
 */
function unEscapeHtml(htmlString) {
    return htmlString
        .replace(/ /g, " ")
        .replace(/&#60;/g, "<")
        .replace(/&#62;/g, ">")
        .replace(/&#38;/g, "&");
}

export { CitationFormatter, unEscapeHtml };
