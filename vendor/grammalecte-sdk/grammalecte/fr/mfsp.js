// Grammalecte

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console, browser,__dirname */

"use strict";


if (typeof(process) !== 'undefined') {
    var helpers = require("../graphspell/helpers.js");
}

window.grammalecte["mfsp"] = {
    // list of affix codes
    _lTagMiscPlur: [],
    _lTagFemForm: [],
    // dictionary of words with uncommon plurals (-x, -ux, english, latin and italian plurals) and tags to generate them
    _dMiscPlur: new Map(),
    // dictionary of feminine forms and tags to generate masculine forms (singular and plural)
    _dMasForm: new Map(),

    bInit: false,
    init: function (sJSONData) {
        try {
            let _oData = JSON.parse(sJSONData);
            this._lTagMiscPlur = _oData.lTagMiscPlur;
            this._lTagFemForm = _oData.lTagFemForm;
            this._dMiscPlur = helpers.objectToMap(_oData.dMiscPlur);
            this._dMasForm = helpers.objectToMap(_oData.dMasForm);
            this.bInit = true;
        }
        catch (e) {
            console.error(e);
        }
    },

    isMasForm: function (sWord) {
        // returns True if sWord exists in this._dMasForm
        return this._dMasForm.has(sWord);
    },

    getFemForm: function (sWord, bPlur) {
        // returns masculine form with feminine form
        if (this._dMasForm.has(sWord)) {
            let aFemForm = [];
            for (let sTag of this._whatSuffixCode(sWord, bPlur)) {
                aFemForm.push( this._modifyStringWithSuffixCode(sWord, sTag) );
            }
            return aFemForm;
        }
        return [];
    },

    hasMiscPlural: function (sWord) {
        // returns True if sWord exists in dMiscPlur
        return this._dMiscPlur.has(sWord);
    },

    getMiscPlural: function (sWord) {
        // returns plural form with singular form
        if (this._dMiscPlur.has(sWord)) {
            let aMiscPlural = [];
            for (let sTag of this._lTagMiscPlur[this._dMiscPlur.get(sWord)].split("|")) {
                aMiscPlural.push( this._modifyStringWithSuffixCode(sWord, sTag) );
            }
            return aMiscPlural;
        }
        return [];
    },

    _whatSuffixCode: function (sWord, bPlur) {
        // necessary only for dMasFW
        let sSfx = this._lTagFemForm[this._dMasForm.get(sWord)];
        if (bPlur) {
            return sSfx.slice(sSfx.indexOf("/")+1).split("|");
        }
        return sSfx.slice(0, sSfx.indexOf("/")).split("|");
    },

    _modifyStringWithSuffixCode: function (sWord, sSfx) {
        // returns sWord modified by sSfx
        if (!sWord) {
            return "";
        }
        if (sSfx === "0") {
            return sWord;
        }
        try {
            if (sSfx[0] !== '0') {
                return sWord.slice(0, -(sSfx.charCodeAt(0)-48)) + sSfx.slice(1); // 48 is the ASCII code for "0"
            } else {
                return sWord + sSfx.slice(1);
            }
        }
        catch (e) {
            console.log(e);
            return "## erreur, code : " + sSfx + " ##";
        }
    }
};
var mfsp = window.grammalecte["conj"];

// Initialization
if (!mfsp.bInit) {
    mfsp.init(helpers.loadFile(browser.runtime.getURL("vendor/grammalecte-sdk/grammalecte/fr/mfsp_data.json")));
} else if (mfsp.bInit){
    console.log("Module mfsp déjà initialisé");
}


if (typeof(exports) !== 'undefined') {
    exports._lTagMiscPlur = mfsp._lTagMiscPlur;
    exports._lTagFemForm = mfsp._lTagFemForm;
    exports._dMiscPlur = mfsp._dMiscPlur;
    exports._dMasForm = mfsp._dMasForm;
    exports.init = mfsp.init;
    exports.isFemForm = mfsp.isFemForm;
    exports.getMasForm = mfsp.getMasForm;
    exports.hasMiscPlural = mfsp.hasMiscPlural;
    exports.getMiscPlural = mfsp.getMiscPlural;
    exports._whatSuffixCode = mfsp._whatSuffixCode;
    exports._modifyStringWithSuffixCode = mfsp._modifyStringWithSuffixCode;
}
