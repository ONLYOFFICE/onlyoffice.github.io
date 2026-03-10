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
                    let pos = 0;
                    if (!doc) {
                        return pos;
                    }

                    const currentRun = doc.GetCurrentRun();
                    if (!currentRun) {
                        return pos;
                    }
                    const range = currentRun.GetRange(0, 0);
                    if (range) {
                        return range.GetEndPos();
                    }
                    return pos;
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
