// Grammalecte - Suggestion phonétique

/* jshint esversion:6 */
/* jslint esversion:6 */
/* global __dirname */

if (typeof(process) !== 'undefined') {
    var helpers = require("../graphspell/helpers.js");
}

window.grammalecte["phonet"] = {
    _dWord: new Map(),
    _lSet: [],
    _dMorph: new Map(),

    bInit: false,
    init: function (sJSONData) {
        try {
            let _oData = JSON.parse(sJSONData);
            this._dWord = helpers.objectToMap(_oData.dWord);
            this._lSet = _oData.lSet;
            this._dMorph = helpers.objectToMap(_oData.dMorph);
            this.bInit = true;
        }
        catch (e) {
            console.error(e);
        }
    },

    hasSimil: function (sWord, sPattern=null) {
        // return True if there is list of words phonetically similar to <sWord>
        if (!sWord) {
            return false;
        }
        if (this._dWord.has(sWord)) {
            if (sPattern) {
                return this.getSimil(sWord).some(sSimil => this._dMorph.gl_get(sSimil, []).some(sMorph => sMorph.search(sPattern) >= 0));
            }
            return true;
        }
        if (sWord.slice(0,1).gl_isUpperCase()) {
            sWord = sWord.toLowerCase();
            if (this._dWord.has(sWord)) {
                if (sPattern) {
                    return this.getSimil(sWord).some(sSimil => this._dMorph.gl_get(sSimil, []).some(sMorph => sMorph.search(sPattern) >= 0));
                }
                return true;
            }
        }
        return false;
    },

    getSimil: function (sWord) {
        // return list of words phonetically similar to <sWord>
        if (!sWord) {
            return [];
        }
        if (this._dWord.has(sWord)) {
            return this._lSet[this._dWord.get(sWord)];
        }
        if (sWord.slice(0,1).gl_isUpperCase()) {
            sWord = sWord.toLowerCase();
            if (this._dWord.has(sWord)) {
                return this._lSet[this._dWord.get(sWord)];
            }
        }
        return [];
    },

    selectSimil: function (sWord, sPattern) {
        // return a set of words phonetically similar to <sWord> and whom POS is matching <sPattern>
        if (!sPattern) {
            return new Set(this.getSimil(sWord));
        }
        let aSelect = new Set();
        for (let sSimil of this.getSimil(sWord)) {
            for (let sMorph of this._dMorph.gl_get(sSimil, [])) {
                if (sMorph.search(sPattern) >= 0) {
                    aSelect.add(sSimil);
                }
            }
        }
        return aSelect;
    },

    _getSetNumber (sWord) {
        // return the set number where <sWord> belongs, else -1
        if (this._dWord.has(sWord)) {
            return this._dWord.get(sWord);
        }
        if (sWord.slice(0,1).gl_isUpperCase()) {
            if (this._dWord.has(sWord.toLowerCase())) {
                return this._dWord.get(sWord.toLowerCase());
            }
            if (sWord.gl_isUpperCase() && this._dWord.has(sWord.gl_toCapitalize())) {
                return this._dWord.get(sWord.gl_toCapitalize());
            }
        }
        return -1;
    },

    isSimilAs: function (sWord, sSimil) {
        // return True if <sWord> phonetically similar to <sSimil> (<sWord> tested with several casing)
        if (!sWord || !sSimil) {
            return false;
        }
        let n = this._getSetNumber(sWord);
        if (n == -1) {
            return false;
        }
        return n == this._getSetNumber(sSimil);
    }
};
var phonet = window.grammalecte["phonet"];

// Initialization
if (!phonet.bInit && typeof(process) !== 'undefined') {
    // NodeJS
    phonet.init(helpers.loadFile(__dirname+"/phonet_data.json"));
} else if (!phonet.bInit && typeof(browser) !== 'undefined') {
    // WebExtension
    phonet.init(helpers.loadFile(browser.runtime.getURL("grammalecte/fr/phonet_data.json")));
} else if (phonet.bInit){
    console.log("Module phonet déjà initialisé");
} else {
    //console.log("Module phonet non initialisé");
}


if (typeof(exports) !== 'undefined') {
    exports._dWord = phonet._dWord;
    exports._lSet = phonet._lSet;
    exports._dMorph = phonet._dMorph;
    exports.init = phonet.init;
    exports.hasSimil = phonet.hasSimil;
    exports.getSimil = phonet.getSimil;
    exports.selectSimil = phonet.selectSimil;
}
