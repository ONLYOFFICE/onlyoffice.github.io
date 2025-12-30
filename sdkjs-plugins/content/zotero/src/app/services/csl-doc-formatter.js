// @ts-check

/// <reference path="../types-global.js" />

class CslDocFormatter {
    /**
     * @param {Array<FormattingPositions>} positions
     * @returns {Promise<void>}
     */
    static format(positions) {
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
}

export { CslDocFormatter };
