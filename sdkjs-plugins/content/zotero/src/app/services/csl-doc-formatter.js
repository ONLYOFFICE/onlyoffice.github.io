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
                        if ("sup" === pos.type) {
                            range.SetVertAlign("superscript");
                        } else if ("sub" === pos.type) {
                            range.SetVertAlign("subscript");
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
     * @param {Map<string, {text: string, formatting: Array<FormattingPositions>}>} formatMap
     * @returns {Promise<void>}
     */
    static async formatAfterUpdate(formatMap) {
        const self = this;
        const isCalc = true;
        const isClose = false;

        for (const [fieldId, formattingPositions] of formatMap) {
            Asc.scope.fieldId = fieldId;
            Asc.scope.text = formattingPositions.text;
            Asc.scope.formatting = formattingPositions.formatting;

            await self.#selectField(fieldId);
            await new Promise(function (resolve) {
                Asc.plugin.callCommand(
                    function () {
                        const doc = Api.GetDocument();
                        const selRange = doc.GetRangeBySelect();
                        doc.MoveCursorToPos(
                            selRange.GetEndPos() - Asc.scope.text.length
                        );
                        let run = doc.GetCurrentRun();
                        for (
                            let i = Asc.scope.formatting.length - 1;
                            i >= 0;
                            i--
                        ) {
                            const pos = Asc.scope.formatting[i];
                            let range = run.GetRange(pos.start, pos.end);
                            //if (!range) continue;
                            if ("sup" === pos.type) {
                                range.SetVertAlign("superscript");
                            } else if ("sub" === pos.type) {
                                range.SetVertAlign("subscript");
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
            await new Promise(function (resolve) {
                setTimeout(resolve, 300);
            });
        }
    }

    /**
     * @param {string} fieldId
     * @returns
     */
    static #selectField(fieldId) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod(
                "SelectAddinField",
                [fieldId],
                resolve
            );
        });
    }
}

export { CslDocFormatter };
