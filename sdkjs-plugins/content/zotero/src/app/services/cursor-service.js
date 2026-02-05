// @ts-check

/// <reference path="../types-global.js" />

class CursorService {
    
    /** @returns {Promise<number>} */
    static getCursorPosition() {
        return new Promise(function (resolve) {
            const isCalc = false;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const canSelectWord = doc.SelectCurrentWord();
                    const endPos = doc.GetRangeBySelect().GetEndPos();
                    if (canSelectWord) {
                        return endPos;
                    }
                    const currentParagraphText = doc.GetCurrentParagraph().GetText();
                    const runText = doc.GetCurrentRun().GetText();
                    if (runText && currentParagraphText.indexOf(runText) !== -1) {
                        return endPos + currentParagraphText.indexOf(runText);
                    }
                    const sentenceText = doc.GetCurrentSentence();
                    if (sentenceText && currentParagraphText.indexOf(sentenceText) !== -1) {
                        return endPos + currentParagraphText.indexOf(sentenceText);
                    }
                    return endPos;
                },
                isClose,
                isCalc,
                resolve,
            );
        });
    }

    /**
     * @param {number} pos 
     * @returns {Promise<void>}
     */
    static setCursorPosition(pos) {
        return new Promise(function (resolve) {
            const isCalc = false;
            const isClose = false;
            Asc.scope.pos = pos;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    doc.MoveCursorToPos(Asc.scope.pos);
                },
                isClose,
                isCalc,
                resolve,
            );
        });
    }

}

export { CursorService };
