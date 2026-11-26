// CitationService with real citeproc and real styles, its document and
// Zotero replaced: what the document holds is given, what is written to it
// is recorded.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CitationService } from "@shared/services/citation-service.js";
import { FieldCitationDocument } from "../../src/app/document/field-citation-document.js";
import { ZoteroLibrary } from "../../src/app/zotero/zotero-library.js";
import { ZoteroBibliographyEditor } from "../../src/app/zotero/zotero-bibliography-editor.js";
import { ZoteroDocumentPreferences } from "../../src/app/zotero/zotero-document-preferences.js";

// Not new URL(): happy-dom's URL is no file URL to node.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..") + "/";

/** @param {string} styleId - a style of resources/csl/styles or test/fixtures */
export function readStyle(styleId) {
    try {
        return readFileSync(root + "resources/csl/styles/" + styleId + ".csl", "utf8");
    } catch (e) {
        return readFileSync(root + "test/fixtures/" + styleId + ".csl", "utf8");
    }
}

const enUS = readFileSync(root + "resources/csl/locales/locales-en-US.xml", "utf8");

/**
 * @param {string} id
 * @param {Object} data - CSL item data, merged over a book by "Family"
 */
export function item(id, data) {
    return {
        id: id,
        uris: ["http://zotero.org/users/1/items/" + id],
        itemData: Object.assign(
            { id: id, type: "book", title: id + " title", issued: { "date-parts": [[2020]] } },
            data,
        ),
    };
}

/**
 * A citation field as Zotero writes it, its text unchanged since.
 * @param {string} fieldId
 * @param {string} citationID
 * @param {Array<Object>} items
 * @param {string} [text]
 */
export function citationField(fieldId, citationID, items, text) {
    const content = text || "Old " + fieldId;
    const citation = {
        citationID: citationID,
        properties: { plainCitation: content, noteIndex: 0 },
        citationItems: items,
    };
    return {
        FieldId: fieldId,
        Content: content,
        Value: "ZOTERO_ITEM CSL_CITATION " + JSON.stringify(citation),
    };
}

/**
 * @param {string} fieldId
 * @param {Object} [edits] - what Zotero's bibliography editor keeps in the
 *  field code: uncited, omitted, custom
 */
export function bibliographyField(fieldId, edits) {
    return {
        FieldId: fieldId,
        Content: "Bibliography",
        Value: "ZOTERO_BIBL " + JSON.stringify(edits || {}) + " CSL_BIBLIOGRAPHY",
    };
}

/** @param {{Value: string}} field */
export function citationOf(field) {
    return JSON.parse(field.Value.slice(field.Value.indexOf("{")));
}

/**
 * @param {Object} options
 * @param {string} options.styleId
 * @param {"numeric"|"note"|"author-date"} options.format
 * @param {Array<Object>} options.fields - what the document holds
 * @param {Array<number>} [options.noteNumbers] - of the citation fields
 * @param {(styleId: string) => Promise<any>} [options.getStyle]
 * @param {string} [options.documentPrefs] - ZOTERO_PREF of the document
 * @param {Object<string, Object>} [options.zoteroItems] - the CSL data of
 *  the items Zotero has, by item key
 */
export function makeService(options) {
    const doc = {
        fields: options.fields,
        noteNumbers: options.noteNumbers,
        /** @type {Array<Object>} what was written to the document */
        written: [],
    };

    const localesManager = {
        getLastUsedLanguage: () => "en-US",
        saveLastUsedLanguage: () => {},
        getLocale: () => enUS,
    };
    const stylesManager = {
        getLastUsedStyleIdOrDefault: () => options.styleId,
        getLastUsedStyleId: () => localStorage.getItem("zoteroStyleId"),
        cached: (/** @type {string} */ id) => readStyle(id),
        getAbbreviateJournalTitles: () => false,
        getIncludeUrlForPaperArticles: () => true,
        getLastUsedFormat: () => options.format,
        getLastUsedNotesStyle: () => "footnotes",
        isLastUsedStyleContainBibliography: () => true,
        getStyle: options.getStyle || (async (/** @type {string} */ id) => ({ content: readStyle(id) })),
        setDocumentStyle: () => {},
        saveLastUsedNotesStyle: () => {},
    };
    const sdk = {
        MAX_KEYS_PER_REQUEST: 50,
        getItemByKey: async () => null,
        searchUserItemsEverything: async () => ({ items: [] }),
        getItemsByKeys: async (/** @type {Array<string>} */ keys) =>
            keys
                .filter((key) => options.zoteroItems && options.zoteroItems[key])
                .map((key) => ({
                    key: key,
                    data: options.zoteroItems[key],
                    uri: "http://zotero.org/users/1/items/" + key,
                })),
    };
    const abbreviationsManager = {
        load: () => {},
        isLoaded: () => false,
        createCiteprocHook: () => () => {},
    };

    const copy = (/** @type {any} */ value) => JSON.parse(JSON.stringify(value));
    const fields = /** @type {any} */ ({
        getAddinZoteroFields: async () => copy(doc.fields),
        getNoteNumbers: async (/** @type {Array<any>} */ fields) =>
            doc.noteNumbers ? doc.noteNumbers.slice() : fields.map(() => 0),
        updateAddinFields: async (/** @type {Array<any>} */ fields) => {
            doc.written.push(...copy(fields));
            return fields.map((field) => field.FieldId);
        },
        convertNotesStyle: async (/** @type {Array<any>} */ fields) => {
            doc.written.push(...copy(fields));
        },
        addBibliography: async (/** @type {string} */ html) => {
            doc.written.push({ FieldId: "new-bibliography", Content: html });
            return "new-bibliography";
        },
        loadStyleFromDocument: async () => options.documentPrefs || "",
        loadEmbeddedStyle: async () => null,
    });
    const service = new CitationService({
        name: "Zotero",
        document: new FieldCitationDocument(fields),
        localesManager: /** @type {any} */ (localesManager),
        cslStylesManager: /** @type {any} */ (stylesManager),
        abbreviationsManager: /** @type {any} */ (abbreviationsManager),
        library: new ZoteroLibrary(/** @type {any} */ (sdk), /** @type {any} */ (stylesManager)),
        bibliographyEditor: new ZoteroBibliographyEditor(/** @type {any} */ (sdk)),
    });
    const preferences = new ZoteroDocumentPreferences(fields, /** @type {any} */ (localesManager));
    return { service, doc, preferences, stylesManager };
}
