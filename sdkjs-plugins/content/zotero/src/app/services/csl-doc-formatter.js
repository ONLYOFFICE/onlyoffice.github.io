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

class CslDocFormatter {
    /**
     * @param {Array<FormattingPositions>} positions
     * @returns {Promise<void>}
     */
    static formatAfterInsert(positions) {
        return new Promise(function (resolve) {
            const isCalc = true;
            const isClose = false;
            Asc.scope.formatting = positions;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    let run = doc.GetCurrentRun();
                    for (let i = Asc.scope.formatting.length - 1; i >= 0; i--) {
                        const pos = Asc.scope.formatting[i];
                        let range = run.GetRange(pos.start, pos.end);
                        if (!range) continue;
                        if ("sup" === pos.type) {
                            range.SetVertAlign("superscript");
                        } else if ("sub" === pos.type) {
                            range.SetVertAlign("subscript");
                        } else if ("sc" === pos.type) {
                            range.SetSmallCaps(true);
                        } else if ("u" === pos.type) {
                            range.SetUnderline(true);
                        } else if ("b" === pos.type) {
                            range.SetBold(true);
                        } else if ("i" === pos.type || "em" === pos.type) {
                            range.SetItalic(true);
                        }
                    }
                },
                isClose,
                isCalc,
                resolve
            );
        });
    }
    /**
     * @param {string} fieldId
     * @param {{text: string, formatting: Array<FormattingPositions>}} formattingPositions
     * @returns {Promise<void>}
     */
    static formatAfterUpdate(fieldId, formattingPositions) {
        const isCalc = true;
        const isClose = false;

        Asc.scope.fieldId = fieldId;
        Asc.scope.text = formattingPositions.text;
        Asc.scope.formatting = formattingPositions.formatting;

        return new Promise(function (resolve) {
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    const selRange = doc.GetRangeBySelect();
                    if (!selRange) {
                        return;
                    }
                    /**
                     * @param {ApiRange} range 
                     * @param {string} type 
                     */
                    function applyFormatting(range, type) {
                        if ("sup" === type) {
                            range.SetVertAlign("superscript");
                        } else if ("sub" === type) {
                            range.SetVertAlign("subscript");
                        } else if ("sc" === type) {
                            range.SetSmallCaps(true);
                        } else if ("u" === type) {
                            range.SetUnderline(true);
                        } else if ("b" === type) {
                            range.SetBold(true);
                        } else if ("i" === type || "em" === type) {
                            range.SetItalic(true);
                        }
                    }

                    if (Asc.scope.formatting.length === 1) {
                        const pos = Asc.scope.formatting[0];
                        if (pos.start === 0 && pos.end === selRange.GetText().length) {
                            applyFormatting(selRange, pos.type);
                            return;
                        }
                    }
                    
                    doc.MoveCursorToPos(
                        selRange.GetEndPos() - Asc.scope.text.length,
                    );
                    let run = doc.GetCurrentRun();

                    for (let i = Asc.scope.formatting.length - 1; i >= 0; i--) {
                        const pos = Asc.scope.formatting[i];
                        let range = run.GetRange(pos.start, pos.end);
                        if (!range) continue;
                        applyFormatting(range, pos.type)
                    }
                },
                isClose,
                isCalc,
                resolve,
            );
        });
    }
}

export { CslDocFormatter };
