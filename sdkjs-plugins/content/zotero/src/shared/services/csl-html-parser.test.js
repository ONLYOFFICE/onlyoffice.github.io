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
