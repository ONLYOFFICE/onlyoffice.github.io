// Dictionaries merger

"use strict";

if (typeof(process) !== 'undefined') {
    var dawg = require("./dawg.js");
    var ibdawg = require("./ibdawg.js");
}


const dic_merger = {

    merge: function (lDict, cStemming, sLangCode, sLangName, sDicName, sDescription, xProgressBar=null) {
        // merge a list of dictionaries (given as JSON objects)
        // return a merged dictionary as JSON object.
        if (xProgressBar) {
            xProgressBar.max = lDict.length;
            xProgressBar.value = 0;
        }
        let lEntry = [];
        for (let oDict of lDict) {
            // generate words list from selected dictionaries
            if (xProgressBar) {
                xProgressBar.value += 1;
            }
            try {
                let oIBDAWG = new IBDAWG(oDict);
                for (let aRes of oIBDAWG.select()) {
                    lEntry.push(aRes);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (xProgressBar) {
            xProgressBar.value = xProgressBar.max;
        }
        try {
            let oDAWG = new DAWG(lEntry, cStemming, sLangCode, sLangName, sDicName, sDescription, xProgressBar);
            let oDict = oDAWG.createBinaryJSON();
            return oDict;
        }
        catch (e) {
            console.log("Dictionaries merger: unable to generate merged dictionary");
            console.error(e);
            return null;
        }
    }
}
