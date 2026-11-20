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

import { updateDocumentPrefs } from "../csl/document-prefs";

/**
 * @typedef {import("@shared/csl/styles").CslStylesManager} CslStylesManager
 * @typedef {import("@shared/csl/locales").LocalesManager} LocalesManager
 * @typedef {import("../services/citation-doc-service").CitationDocService} CitationDocService
 */

/**
 * Zotero's document preferences, kept in the document as Zotero in Word keeps
 * them (ZOTERO_PREF), and the style the document carries for offline use.
 */
class ZoteroDocumentPreferences {
    /** @type {CitationDocService} */
    #fields;
    /** @type {LocalesManager} */
    #localesManager;

    /**
     * @param {CitationDocService} fields - the document's fields and properties
     * @param {LocalesManager} localesManager
     */
    constructor(fields, localesManager) {
        this.#fields = fields;
        this.#localesManager = localesManager;
    }

    /**
     * Takes up the document's preferences, unconditionally: this document's
     * own saved style wins over whatever was last used elsewhere, since
     * save() keeps ZOTERO_PREF in sync with every citation change made here.
     * This preserves the citation style of a DOCX made by the Word Zotero
     * plugin, or by a previous session of this plugin.
     * @param {CslStylesManager} styleManager
     * @returns {Promise<{unavailableStyle: boolean}>} whether the document's
     *  style could not be had and the user's stays
     */
    async load(styleManager) {
        await this.#fields
            .loadEmbeddedStyle()
            .then((style) => {
                styleManager.setDocumentStyle(style);
            })
            .catch((e) => console.error("Failed to read the document style:", e));

        const prefXml = await this.#fields.loadStyleFromDocument();
        if (!prefXml) {
            return { unavailableStyle: false };
        }
        return this.apply(prefXml, styleManager);
    }

    /**
     * Saves the style, the language and the note type of Zotero's document
     * preferences as the ones to use. A style that cannot be had - one made
     * or changed in Zotero that the repository does not know, or one out of
     * reach offline - is not taken: the style in use stays.
     * @param {string} prefXml - as Zotero writes it in ZOTERO_PREF
     * @param {CslStylesManager} styleManager
     * @returns {Promise<{unavailableStyle: boolean}>} whether the style could
     *  not be had and differs from the one in use
     */
    async apply(prefXml, styleManager) {
        let unavailableStyle = false;
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(prefXml, "text/xml");
            const styleEl = xmlDoc.querySelector("style");
            if (styleEl) {
                const styleUrl = styleEl.getAttribute("id") || "";
                const locale = styleEl.getAttribute("locale") || "";
                if (styleUrl) {
                    const styleId = styleUrl.replace(/^.*\/styles\//, "");
                    const isAvailable = !!styleId && await styleManager
                        .getStyle(styleId, false)
                        .then(
                            (style) => !!style.content,
                            () => false,
                        );
                    if (isAvailable) {
                        localStorage.setItem("zoteroStyleId", styleId);
                    } else if (styleId !== styleManager.getLastUsedStyleId()) {
                        unavailableStyle = true;
                    }
                }
                if (locale) {
                    this.#localesManager.saveLastUsedLanguage(locale);
                }
            }
            const noteTypePref = xmlDoc.querySelector('pref[name="noteType"]');
            if (noteTypePref) {
                const noteType = noteTypePref.getAttribute("value");
                if (noteType === "1") {
                    styleManager.saveLastUsedNotesStyle("footnotes");
                } else if (noteType === "2") {
                    styleManager.saveLastUsedNotesStyle("endnotes");
                }
            }
        } catch (e) {
            console.error("Failed to parse ZOTERO_PREF XML:", e);
        }
        return { unavailableStyle: unavailableStyle };
    }

    /**
     * Writes ZOTERO_PREF_{n} to the document's custom properties so that
     * Word/Zotero can read the chosen citation style when the file is opened
     * there, and keeps the style itself in the document.
     * @param {CslStylesManager} styleManager
     * @param {string} locale
     * @returns {Promise<void>}
     */
    async save(styleManager, locale) {
        const styleId = styleManager.getLastUsedStyleId();
        if (!styleId) return;

        const format = styleManager.getLastUsedFormat();
        const notesStyle = styleManager.getLastUsedNotesStyle();

        let noteType = 0;
        if (format === "note") {
            noteType = notesStyle === "endnotes" ? 2 : 1;
        }

        // What Zotero in Word keeps there of its own stays as it is.
        const savedPrefXml = await this.#fields.loadStyleFromDocument();
        const prefXml = updateDocumentPrefs(savedPrefXml, {
            styleId: styleId,
            locale: locale,
            hasBibliography: styleManager.isLastUsedStyleContainBibliography(),
            noteType: noteType,
        });
        if (prefXml !== null) {
            await this.#savePrefXml(prefXml);
        }
        await this.#saveEmbeddedStyle(styleManager);
    }

    /**
     * The XML is chunked into 255-char segments across several properties,
     * the OOXML limit of a custom property value.
     * @param {string} prefXml
     * @returns {Promise<void>}
     */
    #savePrefXml(prefXml) {
        /** @type {Array<string>} */
        const chunks = [];
        for (let i = 0; i < prefXml.length; i += 255) {
            chunks.push(prefXml.substring(i, i + 255));
        }
        return this.#fields.saveStyleToDocument(chunks);
    }

    /**
     * Keeps the CSL of the style in use inside the document, so the document
     * can be formatted where the style repository is out of reach. A style
     * the repository updated replaces the stored one on the next save, once
     * the citations have been formatted with it.
     * @param {CslStylesManager} styleManager
     * @returns {Promise<void>}
     */
    async #saveEmbeddedStyle(styleManager) {
        const style = styleManager.getStyleToEmbed();
        const key = embeddedStyleKey(style);
        try {
            const stored = await this.#fields.loadEmbeddedStyleVersion();
            if (key === embeddedStyleKey(stored)) {
                return;
            }
            if (style) {
                await this.#fields.saveEmbeddedStyle(style);
            } else {
                await this.#fields.removeEmbeddedStyle();
            }
        } catch (e) {
            console.error("Failed to store the style in the document:", e);
        }
    }
}

/**
 * @param {{styleId: string, updated: string} | null} style
 * @returns {string}
 */
function embeddedStyleKey(style) {
    return style ? style.styleId + "\n" + style.updated : "";
}

export { ZoteroDocumentPreferences };
