// What Zotero's bibliography editor keeps in the bibliography field, read
// back: added and removed sources, and entries whose text was rewritten in
// Word (RTF), LibreOffice (RTF) or Google Docs (HTML).
import { describe, expect, it } from "vitest";
import { BibliographyEdits } from "../../src/app/csl/bibliography/bibliography-edits.js";
import { customEntryToHtml, rtfToHtml } from "../../src/app/csl/bibliography/custom-entry.js";

describe("BibliographyEdits", () => {
    it("reads the lists Zotero writes", () => {
        const edits = new BibliographyEdits({
            uncited: [["http://zotero.org/users/1/items/AAA"]],
            omitted: [["http://zotero.org/users/1/items/BBB", "http://zotero.org/users/local/x1/items/BBB"]],
            custom: [[["http://zotero.org/groups/7/items/CCC"], "{\\rtf Text}"]],
        });
        expect(edits.uncited).toEqual([["http://zotero.org/users/1/items/AAA"]]);
        expect(edits.omitted[0]).toHaveLength(2);
        expect(edits.custom).toEqual([{ uris: ["http://zotero.org/groups/7/items/CCC"], text: "{\\rtf Text}" }]);
        expect(edits.isEmpty()).toBe(false);
    });

    it("ignores the old format keyed by local item ids", () => {
        const edits = new BibliographyEdits({ uncited: { 12: true }, omitted: { 7: true }, custom: { 3: "x" } });
        expect(edits.isEmpty()).toBe(true);
    });

    it("names one item alike by its synced, local and group URIs", () => {
        expect(BibliographyEdits.itemKey("http://zotero.org/users/123/items/ABCD")).toBe("users/ABCD");
        expect(BibliographyEdits.itemKey("http://zotero.org/users/local/k3y/items/ABCD")).toBe("users/ABCD");
        expect(BibliographyEdits.itemKey("http://zotero.org/groups/77/items/ABCD")).toBe("groups/77/ABCD");
        expect(BibliographyEdits.itemKey("https://example.com/whatever")).toBeNull();
    });
});

describe("customEntryToHtml", () => {
    it("turns Word's RTF into the markup citeproc uses", () => {
        const rtf = "{\\rtf Smith, J. {\\i{}Title of the Book}. Publisher, 2020.}";
        expect(customEntryToHtml(rtf)).toBe("Smith, J. <i>Title of the Book</i>. Publisher, 2020.");
    });

    it("keeps bold, small caps, superscript and their ends", () => {
        expect(rtfToHtml("{\\b Bold}\\b0  {\\scaps Caps} x{\\super 2}")).toBe(
            '<b>Bold</b> <span style="font-variant:small-caps;">Caps</span> x<sup>2</sup>',
        );
    });

    it("reads escapes and Unicode characters", () => {
        expect(rtfToHtml("M\\uc0\\u252{}ller \\'e9t\\'e9 \\{x\\}")).toBe("Müller été {x}");
        expect(rtfToHtml("\\u8212? dash")).toBe("— dash");
    });

    it("escapes text that would be read as markup", () => {
        expect(rtfToHtml("{\\rtf a < b & c}")).toBe("a &lt; b &amp; c");
        expect(customEntryToHtml("Plain & simple")).toBe("Plain &amp; simple");
    });

    it("keeps the HTML of Google Docs", () => {
        expect(customEntryToHtml("Smith, <i>Title</i>.")).toBe("Smith, <i>Title</i>.");
    });
});
