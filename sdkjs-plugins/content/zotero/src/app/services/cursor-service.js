// @ts-check

/// <reference path="../types-global.js" />

class CursorService {
    
    /** @returns {Promise<number>} */
    static getCursorPosition() {
        return new Promise(function (resolve) {
            const isCalc = false;
            const isClose = false;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    const selRange = doc.GetRangeBySelect();
                    const endPos = selRange.GetEndPos();
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
