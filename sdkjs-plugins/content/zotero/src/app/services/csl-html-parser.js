// @ts-check

/// <reference path="../types-global.js" />

class CslHtmlParser {
    /**
     * Parse HTML string to extract plain text and formatting information.
     * Only supports: <sub>, <sup>, <i>, <u>, <b> tags
     * @param {string} htmlString - HTML string to parse
     * @returns {{text: string, formatting: Array<FormattingPositions>}} Object with text and formatting array
     */
    static parseHtmlFormatting(htmlString) {
        /** @type {Set<AllowedTags>} */
        const allowedTags = new Set([
            "i",
            "u",
            "b",
            "sup",
            "sub",
            "em",
            "div",
            "span",
        ]);

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
                const tagName = htmlString
                    .substring(isClosingTag ? i + 2 : i + 1, tagEnd)
                    .trim();

                // Only process allowed tags
                if (allowedTags.has(tagName)) {
                    if (isClosingTag) {
                        // Closing tag - find matching opening tag
                        // Search from the end of stack (LIFO order)
                        for (let j = stack.length - 1; j >= 0; j--) {
                            if (stack[j].tag === tagName) {
                                // Found matching opening tag
                                const { tag, start } = stack.splice(j, 1)[0];
                                result.formatting.push({
                                    type: tag,
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

    // Alternative version using regular expressions
    /**
     * Alternative implementation using regex for tag matching
     * @param {string} htmlString - HTML string to parse
     * @returns {Object} Object with text and formatting array
     */
    static parseHtmlFormattingRegex(htmlString) {
        // Allowed tags for formatting
        const allowedTags = new Set(["i", "u", "b", "sup", "sub"]);

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
        let pos = 0;

        // Regex pattern to find HTML tags (opening or closing)
        const tagPattern = /<\/?([a-z]+)>/gi;

        while (pos < htmlString.length) {
            // Create a substring from current position to search for tags
            const substring = htmlString.substring(pos);
            const match = tagPattern.exec(substring);

            if (match) {
                // Add text before the tag
                const textBefore = htmlString.substring(pos, pos + match.index);
                result.text += textBefore;
                textPosition += textBefore.length;

                // Process the tag
                const fullTag = match[0]; // Full tag like '<i>' or '</i>'
                const tagName = match[1]; // Tag name without brackets

                if (allowedTags.has(tagName)) {
                    if (fullTag.startsWith("</")) {
                        // Closing tag - find matching opening tag
                        for (let i = stack.length - 1; i >= 0; i--) {
                            if (stack[i].tag === tagName) {
                                const { tag, start } = stack.splice(i, 1)[0];
                                result.formatting.push({
                                    type: tag,
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
                        });
                    }
                }

                // Move position past the tag
                pos += match.index + match[0].length;

                // Reset regex lastIndex for next iteration
                tagPattern.lastIndex = 0;
            } else {
                // No more tags, add remaining text
                const remainingText = htmlString.substring(pos);
                result.text += remainingText;
                break;
            }
        }

        // Sort formatting for consistent output
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
