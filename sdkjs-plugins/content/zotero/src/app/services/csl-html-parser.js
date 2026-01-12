// @ts-check

/// <reference path="../types-global.js" />

class CslHtmlParser {
    /** @type {Set<AllowedTags>} */
    static #allowedTags = new Set([
        "i",
        "u",
        "b",
        "sc",
        "sup",
        "sub",
        "em",
        "div",
        "span",
    ]);

    /**
     * Parse HTML string to extract plain text and formatting information.
     * Only supports: <sub>, <sup>, <sc>, <i>, <u>, <b> tags
     * @param {string} htmlString - HTML string to parse
     * @returns {{text: string, formatting: Array<FormattingPositions>}} Object with text and formatting array
     */
    static parseHtmlFormatting(htmlString) {
        console.warn("parseHtmlFormatting", htmlString);

        /** @type {{text: string, formatting: Array<FormattingPositions>}} */
        const result = {
            text: "",
            formatting: [],
        };

        // Stack to track opened tags and their start positions
        const stack = [];

        // Current position in the resulting plain text
        let textPosition = 0;

        // Current position in the original HTML string
        let i = 0;

        while (i < htmlString.length) {
            // Check for opening tag
            if (htmlString[i] === "<" && i + 1 < htmlString.length) {
                // Check if it's a closing tag
                const isClosingTag = htmlString[i + 1] === "/";

                // Find the end of the tag
                const tagEnd = htmlString.indexOf(">", i);
                if (tagEnd === -1) {
                    // No closing '>', treat as regular text
                    result.text += htmlString[i];
                    i++;
                    continue;
                }

                // Extract tag name (remove '/' for closing tags)
                const tag = htmlString
                    .substring(isClosingTag ? i + 2 : i + 1, tagEnd)
                    .trim();
                const tagParts = tag.split(" ");
                if (tagParts.length === 0) {
                    // No tag name, treat as regular text
                    result.text += htmlString[i];
                    i++;
                    continue;
                }

                const tagName = tagParts[0];

                let styleTag = tagName;
                if (tag.indexOf("font-variant:small-caps") !== -1) {
                    styleTag = "sc";
                } else if (tag.indexOf("text-decoration:underline") !== -1) {
                    styleTag = "u";
                }

                // Only process allowed tags
                if (this.#allowedTags.has(tagName)) {
                    if (isClosingTag) {
                        // Closing tag - find matching opening tag
                        // Search from the end of stack (LIFO order)
                        for (let j = stack.length - 1; j >= 0; j--) {
                            if (stack[j].tag === tagName) {
                                // Found matching opening tag
                                const { start, styleTag } = stack.splice(
                                    j,
                                    1
                                )[0];
                                result.formatting.push({
                                    type: styleTag,
                                    start: start,
                                    end: textPosition,
                                });
                                break;
                            }
                        }
                    } else {
                        // Opening tag - push to stack with current position
                        stack.push({
                            tag: tagName,
                            start: textPosition,
                            styleTag: styleTag,
                        });
                    }
                }

                // Skip the entire tag
                i = tagEnd + 1;
            } else {
                // Regular character - add to plain text
                result.text += htmlString[i];
                textPosition++;
                i++;
            }
        }

        // Sort formatting for consistent output (by start position, then by end)
        result.formatting.sort((a, b) => {
            if (a.start === b.start) {
                return a.end - b.end;
            }
            return a.start - b.start;
        });

        return result;
    }
}

export { CslHtmlParser };
