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
 * @typedef {Object} RtfStyle
 * @property {boolean} italic
 * @property {boolean} bold
 * @property {boolean} underline
 * @property {boolean} smallCaps
 * @property {"" | "sup" | "sub"} vertAlign
 */

/**
 * The text of a bibliography entry rewritten in Zotero's bibliography
 * editor, as HTML like the entries citeproc makes. Zotero keeps it in the
 * format of the word processor it was edited in: RTF for Word and
 * LibreOffice, HTML for Google Docs.
 * @param {string} text
 * @returns {string}
 */
function customEntryToHtml(text) {
    if (/^\s*\{\\rtf/.test(text) || /\\[a-z]+-?\d*|\\[\\{}'~]/i.test(text)) {
        return rtfToHtml(text);
    }
    if (/<[a-z][^>]*>/i.test(text)) {
        return text;
    }
    return escapeHtml(text);
}

/**
 * Converts the RTF that citeproc and Zotero write - character formatting,
 * escapes and Unicode characters - to HTML. Anything else, such as fonts
 * and paragraph settings, is left out.
 * @param {string} rtf
 * @returns {string}
 */
function rtfToHtml(rtf) {
    /** @type {Array<{text: string, style: RtfStyle}>} */
    const runs = [];
    /** @type {RtfStyle} */
    let style = {
        italic: false,
        bold: false,
        underline: false,
        smallCaps: false,
        vertAlign: "",
    };
    /** @type {Array<RtfStyle>} */
    const groups = [];
    // How many characters stand in for a \u character in older readers.
    let unicodeSkip = 1;

    /** @param {string} text */
    const emit = (text) => {
        const last = runs[runs.length - 1];
        if (last && sameStyle(last.style, style)) {
            last.text += text;
        } else {
            runs.push({ text: text, style: Object.assign({}, style) });
        }
    };

    let i = 0;
    while (i < rtf.length) {
        const c = rtf[i];
        if (c === "{") {
            groups.push(Object.assign({}, style));
            i++;
        } else if (c === "}") {
            style = groups.pop() || style;
            i++;
        } else if (c === "\r" || c === "\n") {
            // Line breaks only lay out the RTF itself.
            i++;
        } else if (c !== "\\") {
            emit(c);
            i++;
        } else {
            const next = rtf[i + 1];
            if (next === "\\" || next === "{" || next === "}") {
                emit(next);
                i += 2;
            } else if (next === "'") {
                emit(String.fromCharCode(parseInt(rtf.substr(i + 2, 2), 16)));
                i += 4;
            } else if (next === "~") {
                emit(" ");
                i += 2;
            } else if (next === "_") {
                emit("‑");
                i += 2;
            } else if (next && /[a-z]/i.test(next)) {
                const word = rtf.slice(i + 1).match(/^([a-z]+)(-?\d+)?( ?)/i);
                if (!word) {
                    i += 2;
                    continue;
                }
                i += 1 + word[0].length;
                const name = word[1].toLowerCase();
                const param = word[2] === undefined ? null : Number(word[2]);
                const on = param !== 0;
                switch (name) {
                    case "i":
                        style.italic = on;
                        break;
                    case "b":
                        style.bold = on;
                        break;
                    case "ul":
                        style.underline = on;
                        break;
                    case "ulnone":
                        style.underline = false;
                        break;
                    case "scaps":
                        style.smallCaps = on;
                        break;
                    case "super":
                        style.vertAlign = "sup";
                        break;
                    case "sub":
                        style.vertAlign = "sub";
                        break;
                    case "nosupersub":
                        style.vertAlign = "";
                        break;
                    case "plain":
                        style = {
                            italic: false,
                            bold: false,
                            underline: false,
                            smallCaps: false,
                            vertAlign: "",
                        };
                        break;
                    case "tab":
                        emit("\t");
                        break;
                    case "line":
                    case "par":
                        emit(" ");
                        break;
                    case "uc":
                        unicodeSkip = param === null ? 1 : param;
                        break;
                    case "u": {
                        if (param !== null) {
                            emit(String.fromCharCode(param < 0 ? param + 65536 : param));
                            // Skip the stand-in characters that follow.
                            for (let n = 0; n < unicodeSkip && i < rtf.length; n++) {
                                if (rtf[i] === "\\" || rtf[i] === "{" || rtf[i] === "}") break;
                                i++;
                            }
                        }
                        break;
                    }
                    default:
                        // Fonts, colours, the header and the like.
                        break;
                }
            } else {
                i += 2;
            }
        }
    }

    return runs.map((run) => wrap(escapeHtml(run.text), run.style)).join("");
}

/**
 * @param {RtfStyle} a
 * @param {RtfStyle} b
 * @returns {boolean}
 */
function sameStyle(a, b) {
    return (
        a.italic === b.italic &&
        a.bold === b.bold &&
        a.underline === b.underline &&
        a.smallCaps === b.smallCaps &&
        a.vertAlign === b.vertAlign
    );
}

/**
 * Wraps the text in the markup citeproc uses for the same formatting.
 * @param {string} html
 * @param {RtfStyle} style
 * @returns {string}
 */
function wrap(html, style) {
    if (style.italic) html = "<i>" + html + "</i>";
    if (style.bold) html = "<b>" + html + "</b>";
    if (style.underline) {
        html = '<span style="text-decoration:underline;">' + html + "</span>";
    }
    if (style.smallCaps) {
        html = '<span style="font-variant:small-caps;">' + html + "</span>";
    }
    if (style.vertAlign) {
        html = "<" + style.vertAlign + ">" + html + "</" + style.vertAlign + ">";
    }
    return html;
}

/**
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export { customEntryToHtml, rtfToHtml };
