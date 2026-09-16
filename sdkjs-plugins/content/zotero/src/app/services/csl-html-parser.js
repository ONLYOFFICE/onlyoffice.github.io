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

class CslHtmlParser {
    /** @type {Set<AllowedTags>} */
    static #allowedTags = new Set([
        "i",
        "u",
        "b",
        "p",
        "sc",
        "sup",
        "sub",
        "em",
        "div",
        "span",
    ]);

    /**
     * Names of attributes whose value is treated as a URL and therefore must
     * not contain `javascript:` / `vbscript:` / `data:` schemes.
     * @type {Set<string>}
     */
    static #dangerousAttributes = new Set([
        "href", "src", "xlink:href", "action", "formaction",
        "background", "poster", "srcdoc", "ping", "data"
    ]);

    /**
     * Remove attributes that may introduce XSS:
     *  - any `on*` event handler (e.g. `onclick`, `onerror`);
     *  - URL-like attributes pointing to `javascript:` / `vbscript:` /
     *    `data:` schemes;
     *  - inline `style` containing `expression(` or `javascript:`.
     * @param {Element} el
     */
    static #stripDangerousAttributes(el) {
        const dangerousScheme = /^\s*(javascript|vbscript|data)\s*:/i;
        for (const attr of Array.from(el.attributes)) {
            const name = attr.name.toLowerCase();
            const value = attr.value || "";

            if (name.startsWith("on")) {
                el.removeAttribute(attr.name);
                continue;
            }

            if (CslHtmlParser.#dangerousAttributes.has(name)) {
                // Strip control chars/whitespace that browsers ignore when resolving URLs.
                const normalized = value.replace(/[\u0000-\u001F\u007F]/g, "");
                if (dangerousScheme.test(normalized)) {
                    el.removeAttribute(attr.name);
                    continue;
                }
            }

            if (name === "style" && /expression\s*\(|javascript\s*:/i.test(value)) {
                el.removeAttribute(attr.name);
            }
        }
    }

    /**
     * Strip every tag that is not in {@link CslHtmlParser.#allowedTags},
     * preserving its text content and any allowed descendants.
     * Allowed tags keep their attributes, except those that can lead to XSS
     * (event handlers, javascript:/vbscript:/data: URLs in href/src-like attrs).
     * @param {string} html - HTML string to sanitize
     * @returns {string} Sanitized HTML string
     */
    static purifyHtml(html) {
        if (typeof html !== "string" || html.length === 0) return "";

        const allowed = this.#allowedTags;
        // Wrap into a single root so DOMParser preserves leading/trailing text nodes verbatim.
        const doc = new DOMParser().parseFromString(
            "<div id=\"__purify_root__\">" + html + "</div>",
            "text/html"
        );
        const root = doc.getElementById("__purify_root__");
        if (!root) return "";

        /**
         * Replace `el` with its child nodes in place.
         * @param {Element} el
         */
        const unwrap = (el) => {
            const parent = el.parentNode;
            if (!parent) return;
            while (el.firstChild) {
                parent.insertBefore(el.firstChild, el);
            }
            parent.removeChild(el);
        };

        // Snapshot first — the live HTMLCollection mutates as we unwrap nodes.
        const all = Array.from(root.getElementsByTagName("*"));
        for (const el of all) {
            const tag = el.tagName.toLowerCase();
            if (!allowed.has(/** @type {AllowedTags} */ (tag))) {
                unwrap(el);
            } else {
                CslHtmlParser.#stripDangerousAttributes(el);
            }
        }

        return root.innerHTML;
    }

    /**
     * Parse HTML string to extract plain text and formatting information.
     * Only supports: <sub>, <sup>, <sc>, <i>, <u>, <b> tags
     * @param {string} htmlString - HTML string to parse
     * @returns {{text: string, formatting: Array<FormattingPositions>}} Object with text and formatting array
     */
    static parseHtmlFormatting(htmlString) {

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

                const loverCaseTagName = tagParts[0].toLowerCase();
                if (loverCaseTagName === "br") {
                    // <br> is a special case - add a newline
                    result.text += "\n";
                    i = tagEnd + 1;
                    continue;
                }

                let styleTag = loverCaseTagName;
                if (tag.indexOf("font-variant:small-caps") !== -1) {
                    styleTag = "sc";
                } else if (tag.indexOf("text-decoration:underline") !== -1) {
                    styleTag = "u";
                }

                // Only process allowed tags
                if (this.#allowedTags.has(loverCaseTagName)) {
                    if (isClosingTag) {
                        // Closing tag - find matching opening tag
                        // Search from the end of stack (LIFO order)
                        for (let j = stack.length - 1; j >= 0; j--) {
                            if (stack[j].tag === loverCaseTagName) {
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
                            tag: loverCaseTagName,
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
                return b.end - a.end;
            }
            return a.start - b.start;
        });

        return result;
    }
}

export { CslHtmlParser };
