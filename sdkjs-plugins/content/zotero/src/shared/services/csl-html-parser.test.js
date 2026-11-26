// The text and formatting of citeproc's HTML, as written to the document.
// citeproc writes a "<" of the text as "&#60;": decoded only here, it stays
// text - decoded before, it was read as the start of a tag and dropped, so
// a URL in angle brackets vanished.
import { describe, expect, it } from "vitest";
import { CslHtmlParser } from "./csl-html-parser.js";

describe("parseHtmlFormatting", () => {
    it("keeps text in angle brackets", () => {
        const result = CslHtmlParser.parseHtmlFormatting(
            "Available at: &#60;https://example.org/a?x=1&#38;y=2&#62;.",
        );
        expect(result.text).toBe("Available at: <https://example.org/a?x=1&y=2>.");
    });

    it("decodes named and hexadecimal references", () => {
        expect(CslHtmlParser.parseHtmlFormatting("R&amp;D &lt;x&gt; &#x3C;y&#x3E; &quot;q&quot;").text)
            .toBe("R&D <x> <y> \"q\"");
    });

    it("leaves an ampersand that starts no reference", () => {
        expect(CslHtmlParser.parseHtmlFormatting("Smith & Sons &unknown; &").text)
            .toBe("Smith & Sons &unknown; &");
    });

    it("places formatting after a reference by the decoded text", () => {
        const result = CslHtmlParser.parseHtmlFormatting("A &#38; B <i>Title</i>");
        expect(result.text).toBe("A & B Title");
        expect(result.formatting).toEqual([{ type: "i", start: 6, end: 11 }]);
    });

    it("counts a line break in the positions", () => {
        const result = CslHtmlParser.parseHtmlFormatting("a<br>b <i>c</i>");
        expect(result.text).toBe("a\nb c");
        expect(result.formatting).toEqual([{ type: "i", start: 4, end: 5 }]);

        // No ">" after it: text.
        expect(CslHtmlParser.parseHtmlFormatting("1 < 2").text).toBe("1 < 2");
    });
});

describe("purifyHtml", () => {
    it("keeps of an inline style only the formatting citeproc writes", () => {
        // A bibliography entry rewritten in Google Docs is pasted as it is.
        const html = CslHtmlParser.purifyHtml(
            '<span style="font-size:72pt;color:red">BIG</span> '
                + '<span style="font-variant: small-caps; font-family: Comic Sans MS">Caps</span>',
        );
        expect(html).toBe('<span>BIG</span> <span style="font-variant:small-caps;">Caps</span>');
    });

    it("leaves citeproc's own styles as they are", () => {
        const html = '<span style="font-variant:small-caps;">A</span>'
            + '<span style="text-decoration:underline;">B</span>'
            + '<span style="white-space:nowrap">&thinsp;</span>';
        expect(CslHtmlParser.purifyHtml(html)).toBe(html.replace("nowrap\"", "nowrap;\"").replace("&thinsp;", " "));
    });

    it("drops a style that hides something in a value", () => {
        expect(CslHtmlParser.purifyHtml('<div style="font-weight:expression(alert(1))">x</div>')).toBe("<div>x</div>");
    });
});
