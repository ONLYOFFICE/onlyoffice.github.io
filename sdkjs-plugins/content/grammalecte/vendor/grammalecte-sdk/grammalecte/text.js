// JavaScript

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console */

"use strict";


window.grammalecte["text"] = {

    _zEndOfSentence: new RegExp ('[.?!…]+[»”’)]?[   ]+[»”’]?(?=[«"“‘–—   ]*[A-ZÀÂÉÈÊÎÔÇ])|[:;][   ]+', "g"),

    getSentenceBoundaries: function* (sText) {
        // generator: returns start and end of sentences found in <sText>
        let iStart = 0;
        let m;
        while ((m = this._zEndOfSentence.exec(sText)) !== null) {
            yield [iStart, this._zEndOfSentence.lastIndex];
            iStart = this._zEndOfSentence.lastIndex;
        }
        yield [iStart, sText.length];
    },

    getSentence: function* (sText) {
        // generator: returns sentences found in <sText>
        for (let [iStart, iEnd] of this.getSentenceBoundaries(sText)) {
            yield sText.slice(iStart, iEnd);
        }
    },

    getParagraph: function* (sText, sSepParagraph = "\n") {
        // generator: returns paragraphs of text
        let iStart = 0;
        let iEnd = 0;
        sText = sText.replace("\r\n", "\n").replace("\r", "\n");
        while ((iEnd = sText.indexOf(sSepParagraph, iStart)) !== -1) {
            yield sText.slice(iStart, iEnd);
            iStart = iEnd + 1;
        }
        yield sText.slice(iStart);
    },

    wrap: function* (sText, nWidth=80) {
        // generator: returns text line by line
        while (sText) {
            if (sText.length >= nWidth) {
                let nEnd = sText.lastIndexOf(" ", nWidth) + 1;
                if (nEnd > 0) {
                    yield sText.slice(0, nEnd);
                    sText = sText.slice(nEnd);
                } else {
                    yield sText.slice(0, nWidth);
                    sText = sText.slice(nWidth);
                }
            } else {
                break;
            }
        }
        yield sText;
    },

    getReadableError: function (oErr) {
        // Returns an error oErr as a readable error
        try {
            let sResult = "\n* " + oErr['nStart'] + ":" + oErr['nEnd']
                        + "  # " + oErr['sLineId'] + "  # " + oErr['sRuleId'] + ":\n";
            sResult += "  " + oErr["sMessage"];
            if (oErr["aSuggestions"].length > 0) {
                sResult += "\n  > Suggestions : " + oErr["aSuggestions"].join(" | ");
            }
            if (oErr["URL"] !== "") {
                sResult += "\n  > URL: " + oErr["URL"];
            }
            return sResult;
        }
        catch (e) {
            console.error(e);
            return "\n# Error. Data: " + oErr.toString();
        }
    }
};


if (typeof(exports) !== 'undefined') {
    exports._zEndOfSentence = text._zEndOfSentence;
    exports.getSentenceBoundaries = text.getSentenceBoundaries;
    exports.getSentence = text.getSentence;
    exports.getParagraph = text.getParagraph;
    exports.wrap = text.wrap;
    exports.getReadableError = text.getReadableError;
}
