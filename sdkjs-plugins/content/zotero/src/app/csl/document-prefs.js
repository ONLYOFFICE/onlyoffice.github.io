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
 * Zotero's preferences of a document, as it keeps them in ZOTERO_PREF: XML
 * (data-version 3), as Zotero in Word writes them, or JSON (data-version 4)
 * where a document came with that. Only what this plugin chooses is set;
 * the rest, Word's own preferences among it, stays as it is.
 */

/**
 * @typedef {Object} DocumentPrefsValues
 * @property {string} styleId - as in the style repository, such as "apa"
 * @property {string} locale
 * @property {boolean} hasBibliography
 * @property {number} noteType - 0 citations in the text, 1 footnotes,
 *  2 endnotes
 */

const STYLE_URL_PREFIX = "http://www.zotero.org/styles/";

/**
 * @param {string} styleUrl
 * @returns {string} the style id the plugin knows it by
 */
function styleIdOf(styleUrl) {
    return String(styleUrl || "").replace(/^.*\/styles\//, "");
}

/**
 * The preferences of a document with the plugin's choice in them.
 * @param {string} saved - ZOTERO_PREF of the document, "" if it has none
 * @param {DocumentPrefsValues} values
 * @returns {string|null} what to write, null if the document has it already
 */
function updateDocumentPrefs(saved, values) {
    const text = String(saved || "").trim();
    /** @type {string|null|undefined} */
    let updated;
    if (text.charAt(0) === "{") {
        updated = updateJsonPrefs(text, values);
    } else if (text.charAt(0) === "<") {
        updated = updateXmlPrefs(text, values);
    }
    // None yet, or ones that cannot be read: written anew.
    return updated === undefined ? makeXmlPrefs(values) : updated;
}

/**
 * @param {string} xml
 * @param {DocumentPrefsValues} values
 * @returns {string|null|undefined} undefined if the XML cannot be read
 */
function updateXmlPrefs(xml, values) {
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    const data = doc.documentElement;
    if (
        !data ||
        data.nodeName !== "data" ||
        doc.getElementsByTagName("parsererror").length
    ) {
        return undefined;
    }

    let changed = false;
    /**
     * @param {Element} element
     * @param {string} name
     * @param {string} value
     */
    const setAttribute = (element, name, value) => {
        if (element.getAttribute(name) !== value) {
            element.setAttribute(name, value);
            changed = true;
        }
    };
    /**
     * @param {Element} parent
     * @param {string} name
     * @returns {Element|null}
     */
    const childNamed = (parent, name) => {
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].nodeName === name) return parent.children[i];
        }
        return null;
    };

    let prefs = childNamed(data, "prefs");
    let style = childNamed(data, "style");
    if (!style) {
        style = doc.createElement("style");
        data.insertBefore(style, prefs);
        changed = true;
    }
    if (styleIdOf(style.getAttribute("id") || "") !== values.styleId) {
        setAttribute(style, "id", STYLE_URL_PREFIX + values.styleId);
        // As Zotero does for a new style: it formats the paragraphs of the
        // bibliography for it once more.
        setAttribute(style, "bibliographyStyleHasBeenSet", "0");
    }
    if (values.locale) {
        setAttribute(style, "locale", values.locale);
    }
    setAttribute(style, "hasBibliography", values.hasBibliography ? "1" : "0");
    // Earlier versions of this plugin marked it set though they set no
    // paragraph style; Zotero, which does, always writes its session.
    if (
        !style.hasAttribute("bibliographyStyleHasBeenSet") ||
        !childNamed(data, "session")
    ) {
        setAttribute(style, "bibliographyStyleHasBeenSet", "0");
    }

    if (!prefs) {
        prefs = doc.createElement("prefs");
        data.appendChild(prefs);
        changed = true;
    }
    let noteType = null;
    for (let i = 0; i < prefs.children.length; i++) {
        if (prefs.children[i].getAttribute("name") === "noteType") {
            noteType = prefs.children[i];
        }
    }
    // Zotero leaves out a preference that is 0 or false.
    if (noteType || values.noteType) {
        if (!noteType) {
            noteType = doc.createElement("pref");
            noteType.setAttribute("name", "noteType");
            prefs.appendChild(noteType);
        }
        setAttribute(noteType, "value", String(values.noteType));
    }

    return changed ? new XMLSerializer().serializeToString(doc) : null;
}

/**
 * @param {string} json
 * @param {DocumentPrefsValues} values
 * @returns {string|null|undefined} undefined if the JSON cannot be read
 */
function updateJsonPrefs(json, values) {
    /** @type {any} */
    let data;
    try {
        data = JSON.parse(json);
    } catch (e) {
        return undefined;
    }
    if (!data || typeof data !== "object") return undefined;

    const before = JSON.stringify(data);
    data.style = data.style || {};
    data.prefs = data.prefs || {};
    if (styleIdOf(data.style.styleID) !== values.styleId) {
        data.style.styleID = STYLE_URL_PREFIX + values.styleId;
        data.style.bibliographyStyleHasBeenSet = false;
    }
    if (values.locale) {
        data.style.locale = values.locale;
    }
    data.style.hasBibliography = values.hasBibliography;
    if (data.style.bibliographyStyleHasBeenSet === undefined) {
        data.style.bibliographyStyleHasBeenSet = false;
    }
    data.prefs.noteType = values.noteType;

    const after = JSON.stringify(data);
    return after === before ? null : after;
}

/**
 * @param {DocumentPrefsValues} values
 * @returns {string}
 */
function makeXmlPrefs(values) {
    /** @param {string} value */
    const escape = (value) =>
        value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return '<data data-version="3" zotero-version="5.0.96">' +
        '<style id="' + escape(STYLE_URL_PREFIX + values.styleId) + '"' +
        (values.locale ? ' locale="' + escape(values.locale) + '"' : "") +
        ' hasBibliography="' + (values.hasBibliography ? "1" : "0") + '"' +
        ' bibliographyStyleHasBeenSet="0"/>' +
        '<prefs>' +
        '<pref name="fieldType" value="Field"/>' +
        '<pref name="automaticJournalAbbreviations" value="true"/>' +
        '<pref name="noteType" value="' + values.noteType + '"/>' +
        '</prefs>' +
        '</data>';
}

export { updateDocumentPrefs };
