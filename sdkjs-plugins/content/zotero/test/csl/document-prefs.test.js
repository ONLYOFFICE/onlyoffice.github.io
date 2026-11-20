// ZOTERO_PREF: the plugin sets its own choice and leaves what Zotero in
// Word keeps there. 1.2.x overwrote the whole record.
import { describe, expect, it } from "vitest";
import { updateDocumentPrefs } from "../../src/app/csl/document-prefs.js";

const wordPrefs =
    '<data data-version="3" zotero-version="7.0.11"><session id="Ab12Cd34"/>' +
    '<style id="http://www.zotero.org/styles/apa" locale="en-US" hasBibliography="1" bibliographyStyleHasBeenSet="1"/>' +
    '<prefs><pref name="fieldType" value="Bookmark"/><pref name="delayCitationUpdates" value="true"/>' +
    '<pref name="automaticJournalAbbreviations" value="true"/></prefs></data>';

/** @param {Object} [changes] */
const values = (changes) =>
    Object.assign({ styleId: "apa", locale: "en-US", hasBibliography: true, noteType: 0 }, changes);

/** @param {string} xml */
const parse = (xml) => new DOMParser().parseFromString(xml, "application/xml");

describe("updateDocumentPrefs", () => {
    it("leaves the record of Word alone when it says the same", () => {
        expect(updateDocumentPrefs(wordPrefs, values())).toBeNull();
    });

    it("keeps Word's own preferences when the style changes", () => {
        const xml = updateDocumentPrefs(wordPrefs, values({ styleId: "chicago-notes-bibliography", noteType: 1 }));
        const doc = parse(/** @type {string} */ (xml));
        const style = doc.querySelector("style");
        expect(style.getAttribute("id")).toBe("http://www.zotero.org/styles/chicago-notes-bibliography");
        expect(doc.querySelector("session").getAttribute("id")).toBe("Ab12Cd34");
        expect(doc.querySelector('pref[name="fieldType"]').getAttribute("value")).toBe("Bookmark");
        expect(doc.querySelector('pref[name="delayCitationUpdates"]').getAttribute("value")).toBe("true");
        expect(doc.querySelector('pref[name="noteType"]').getAttribute("value")).toBe("1");
    });

    it("lets Word set the bibliography paragraph style again for a new style", () => {
        const xml = updateDocumentPrefs(wordPrefs, values({ styleId: "ieee" }));
        expect(parse(/** @type {string} */ (xml)).querySelector("style").getAttribute("bibliographyStyleHasBeenSet")).toBe("0");
    });

    it("keeps the flag Word set while the style stays", () => {
        const xml = updateDocumentPrefs(wordPrefs, values({ locale: "de-DE" }));
        const style = parse(/** @type {string} */ (xml)).querySelector("style");
        expect(style.getAttribute("locale")).toBe("de-DE");
        expect(style.getAttribute("bibliographyStyleHasBeenSet")).toBe("1");
    });

    it("keeps a custom style address that names the same style", () => {
        const custom = wordPrefs.replace("http://www.zotero.org/styles/apa", "file:///C:/styles/apa");
        expect(updateDocumentPrefs(custom, values())).toBeNull();
    });

    it("clears the flag earlier plugin versions set wrongly, once", () => {
        const earlier =
            '<data data-version="3" zotero-version="5.0.96">' +
            '<style id="http://www.zotero.org/styles/apa" locale="en-US" hasBibliography="1" bibliographyStyleHasBeenSet="1"/>' +
            '<prefs><pref name="fieldType" value="Field"/><pref name="noteType" value="0"/></prefs></data>';
        const once = /** @type {string} */ (updateDocumentPrefs(earlier, values()));
        expect(parse(once).querySelector("style").getAttribute("bibliographyStyleHasBeenSet")).toBe("0");
        expect(updateDocumentPrefs(once, values())).toBeNull();
    });

    it("writes a new record where there is none or it cannot be read", () => {
        for (const saved of ["", "not xml"]) {
            const style = parse(/** @type {string} */ (updateDocumentPrefs(saved, values()))).querySelector("style");
            expect(style.getAttribute("id")).toBe("http://www.zotero.org/styles/apa");
            expect(style.getAttribute("bibliographyStyleHasBeenSet")).toBe("0");
        }
    });

    it("keeps a JSON record JSON", () => {
        const json = JSON.stringify({
            style: { styleID: "http://www.zotero.org/styles/apa", locale: "en-US", hasBibliography: true, bibliographyStyleHasBeenSet: true },
            prefs: { fieldType: "Http", noteType: 0 },
            dataVersion: 4,
        });
        expect(updateDocumentPrefs(json, values())).toBeNull();
        const updated = JSON.parse(/** @type {string} */ (updateDocumentPrefs(json, values({ styleId: "ieee" }))));
        expect(updated.style.styleID).toBe("http://www.zotero.org/styles/ieee");
        expect(updated.style.bibliographyStyleHasBeenSet).toBe(false);
        expect(updated.prefs.fieldType).toBe("Http");
    });
});
