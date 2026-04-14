// @ts-check

/// <reference path="../types-global.js" />

class CslDocFormatter {
    /**
     * @param {Array<FormattingPositions>} positions
     * @returns {Promise<void>}
     */
    static formatAfterInsert(positions, text) {
        return new Promise(function (resolve) {
            const isCalc = true;
            const isClose = false;
            Asc.scope.formatting = positions;
            Asc.scope.textToMatch = text || "";
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();

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

                    // Try to find the run inside footnote via paragraph elements
                    var run = null;
                    var note = doc.GetCurrentFootEndnote();
                    if (note && Asc.scope.textToMatch) {
                        var paraCount = note.GetElementsCount();
                        for (var p = 0; p < paraCount; p++) {
                            var para = note.GetElement(p);
                            if (!para) continue;
                            var count = para.GetElementsCount ? para.GetElementsCount() : 0;
                            for (var e = 0; e < count; e++) {
                                var elem = para.GetElement(e);
                                if (!elem || typeof elem.GetRange !== "function") continue;
                                var elemText = elem.GetText ? elem.GetText() : "";
                                if (elemText === Asc.scope.textToMatch) {
                                    run = elem;
                                    break;
                                }
                            }
                            if (run) break;
                        }
                    }

                    if (!run) {
                        run = doc.GetCurrentRun();
                    }

                    if (!run) return;

                    for (let i = Asc.scope.formatting.length - 1; i >= 0; i--) {
                        const pos = Asc.scope.formatting[i];
                        let range = run.GetRange(pos.start, pos.end);
                        if (!range) continue;
                        applyFormatting(range, pos.type);
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

                    // Find the run containing our text by iterating paragraphs
                    // from the selected range. This works inside footnotes where
                    // MoveCursorToPos + GetCurrentRun does not.
                    var run = null;
                    var paragraphs = selRange.GetAllParagraphs();
                    if (paragraphs && paragraphs.length) {
                        for (var p = 0; p < paragraphs.length; p++) {
                            var para = paragraphs[p];
                            if (!para) continue;
                            var count = para.GetElementsCount();
                            for (var e = 0; e < count; e++) {
                                var elem = para.GetElement(e);
                                if (!elem || typeof elem.GetRange !== "function") continue;
                                var elemText = elem.GetText ? elem.GetText() : "";
                                if (elemText === Asc.scope.text) {
                                    run = elem;
                                    break;
                                }
                            }
                            if (run) break;
                        }
                    }

                    if (!run) {
                        // Fallback: original approach for main document body
                        doc.MoveCursorToPos(
                            selRange.GetEndPos() - Asc.scope.text.length,
                        );
                        run = doc.GetCurrentRun();
                    }

                    if (!run) return;

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
