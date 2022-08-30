// Spellchecker
// Wrapper for the IBDAWG class.
// Useful to check several dictionaries at once.

// To avoid iterating over a pile of dictionaries, it is assumed that 3 are enough:
// - the main dictionary, bundled with the package
// - the community dictionary, a merge of different external dictionaries
// - the personal dictionary, created by the user for its own convenience

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console, IBDAWG, Tokenizer */

"use strict";


// Map
/*jslint esversion: 6*/

if (Map.prototype.grammalecte === undefined) {
    Map.prototype.gl_shallowCopy = function () {
        let oNewMap = new Map();
        for (let [key, val] of this.entries()) {
            oNewMap.set(key, val);
        }
        return oNewMap;
    };

    Map.prototype.gl_get = function (key, defaultValue) {
        let res = this.get(key);
        if (res !== undefined) {
            return res;
        }
        return defaultValue;
    };

    Map.prototype.gl_toString = function () {
        // Default .toString() gives nothing useful
        let sRes = "{ ";
        for (let [k, v] of this.entries()) {
            sRes += (typeof k === "string") ? '"' + k + '": ' : k.toString() + ": ";
            sRes += (typeof v === "string") ? '"' + v + '", ' : v.toString() + ", ";
        }
        sRes = sRes.slice(0, -2) + " }";
        return sRes;
    };

    Map.prototype.gl_update = function (dDict) {
        for (let [k, v] of dDict.entries()) {
            this.set(k, v);
        }
    };

    Map.prototype.gl_updateOnlyExistingKeys = function (dDict) {
        for (let [k, v] of dDict.entries()) {
            if (this.has(k)){
                this.set(k, v);
            }
        }
    };

    Map.prototype.gl_reverse = function () {
        let dNewMap = new Map();
        this.forEach((val, key) => {
            dNewMap.set(val, key);
        });
        return dNewMap;
    };

    Map.prototype.grammalecte = true;
}


// String
/*jslint esversion: 6*/

if (String.prototype.grammalecte === undefined) {
    String.prototype.gl_count = function (sSearch, bOverlapping) {
        // http://jsperf.com/string-ocurrence-split-vs-match/8
        if (sSearch.length <= 0) {
            return this.length + 1;
        }
        let nOccur = 0;
        let iPos = 0;
        let nStep = (bOverlapping) ? 1 : sSearch.length;
        while ((iPos = this.indexOf(sSearch, iPos)) >= 0) {
            nOccur++;
            iPos += nStep;
        }
        return nOccur;
    };
    String.prototype.gl_isDigit = function () {
        return (this.search(/^[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]+$/) !== -1);
    };
    String.prototype.gl_isAlpha = function () {
        return (this.search(/^[a-zà-öA-Zø-ÿÀ-ÖØ-ßĀ-ʯﬀ-ﬆᴀ-ᶿ]+$/) !== -1);
    };
    String.prototype.gl_isLowerCase = function () {
        return (this.search(/^[a-zà-öø-ÿﬀ-ﬆ0-9 '’-]+$/) !== -1);
    };
    String.prototype.gl_isUpperCase = function () {
        return (this.search(/^[A-ZÀ-ÖØ-ßŒ0-9 '’-]+$/) !== -1  &&  this.search(/^[0-9]+$/) === -1);
    };
    String.prototype.gl_isTitle = function () {
        return (this.search(/^[A-ZÀ-ÖØ-ßŒ][a-zà-öø-ÿﬀ-ﬆ '’-]+$/) !== -1);
    };
    String.prototype.gl_toCapitalize = function () {
        return this.slice(0,1).toUpperCase() + this.slice(1).toLowerCase();
    };
    String.prototype.gl_expand = function (oMatch) {
        let sNew = this;
        for (let i = 0; i < oMatch.length ; i++) {
            let z = new RegExp("\\\\"+parseInt(i), "g");
            sNew = sNew.replace(z, oMatch[i]);
        }
        return sNew;
    };
    String.prototype.gl_trimRight = function (sChars) {
        let z = new RegExp("["+sChars+"]+$");
        return this.replace(z, "");
    };
    String.prototype.gl_trimLeft = function (sChars) {
        let z = new RegExp("^["+sChars+"]+");
        return this.replace(z, "");
    };
    String.prototype.gl_trim = function (sChars) {
        let z1 = new RegExp("^["+sChars+"]+");
        let z2 = new RegExp("["+sChars+"]+$");
        return this.replace(z1, "").replace(z2, "");
    };

    String.prototype.grammalecte = true;
}




const dDefaultDictionaries = new Map([
    ["fr", "fr-allvars.json"],
    ["en", "en.json"]
]);


class SpellChecker {

    constructor (sLangCode, sPath="", mainDic="", communityDic="", personalDic="") {
        // returns true if the main dictionary is loaded
        this.sLangCode = sLangCode;
        if (!mainDic) {
            mainDic = dDefaultDictionaries.gl_get(sLangCode, "");
        }
        this.oMainDic = this._loadDictionary(mainDic, sPath, true);
        this.oCommunityDic = this._loadDictionary(communityDic, sPath);
        this.oPersonalDic = this._loadDictionary(personalDic, sPath);
        this.bCommunityDic = Boolean(this.oCommunityDic);
        this.bPersonalDic = Boolean(this.oPersonalDic);
        this.oTokenizer = null;
        // Lexicographer
        this.lexicographer = null;
        this.loadLexicographer(sLangCode)
        // storage
        this.bStorage = false;
        this._dMorphologies = new Map();            // key: flexion, value: list of morphologies
        this._dLemmas = new Map();                  // key: flexion, value: list of lemmas
    }

    _loadDictionary (dictionary, sPath="", bNecessary=false) {
        // <dictionary> can be a filename or a JSON object, returns an IBDAWG object
        if (!dictionary) {
            return null;
        }
        try {
            if (typeof(ibdawg) !== 'undefined') {
                return new ibdawg.IBDAWG(dictionary, sPath);
            } else {
                return new IBDAWG(dictionary, sPath);
            }
        }
        catch (e) {
            let sfDictionary = (typeof(dictionary) == "string") ? dictionary : dictionary.sLangName + "/" + dictionary.sFileName;
            let sErrorMessage = "Error [" + this.sLangCode + "]: <" + sfDictionary + "> not loaded.";
            if (bNecessary) {
                throw sErrorMessage + " | " + e.message;
            }
            console.log(sErrorMessage);
            console.log(e.message);
            return null;
        }
    }

    loadTokenizer () {
        if (typeof(tokenizer) !== 'undefined') {
            this.oTokenizer = new tokenizer.Tokenizer(this.sLangCode);
        } else {
            this.oTokenizer = new Tokenizer(this.sLangCode);
        }
    }

    getTokenizer () {
        if (!this.oTokenizer) {
            this.loadTokenizer();
        }
        return this.oTokenizer;
    }

    setMainDictionary (dictionary, sPath="") {
        // returns true if the dictionary is loaded
        this.oMainDic = this._loadDictionary(dictionary, sPath, true);
        return Boolean(this.oMainDic);
    }

    setCommunityDictionary (dictionary, sPath="", bActivate=true) {
        // returns true if the dictionary is loaded
        this.oCommunityDic = this._loadDictionary(dictionary, sPath);
        this.bCommunityDic = (bActivate) ? Boolean(this.oCommunityDic) : false;
        return Boolean(this.oCommunityDic);
    }

    setPersonalDictionary (dictionary, sPath="", bActivate=true) {
        // returns true if the dictionary is loaded
        this.oPersonalDic = this._loadDictionary(dictionary, sPath);
        this.bPersonalDic = (bActivate) ? Boolean(this.oPersonalDic) : false;
        return Boolean(this.oPersonalDic);
    }

    activateCommunityDictionary () {
        this.bCommunityDic = Boolean(this.oCommunityDic);
    }

    activatePersonalDictionary () {
        this.bPersonalDic = Boolean(this.oPersonalDic);
    }

    deactivateCommunityDictionary () {
        this.bCommunityDic = false;
    }

    deactivatePersonalDictionary () {
        this.bPersonalDic = false;
    }


    // Lexicographer

    loadLexicographer (sLangCode) {
        // load default suggestion module for <sLangCode>
        if (typeof(process) !== 'undefined') {
            this.lexicographer = require('./lexgraph_${sLangCode}.js');
        }
        else {
            this.lexicographer = window.grammalecte["lexgraph_" + sLangCode];
        }
    }

    analyze (sWord) {
        // returns a list of words and their morphologies
        if (!this.lexicographer) {
            return [];
        }
        let lWordAndMorph = [];
        for (let sElem of this.lexicographer.split(sWord)) {
            if (sElem) {
                let lMorph = this.getMorph(sElem);
                let sLex = this.lexicographer.analyze(sElem);
                let aRes = [];
                if (sLex) {
                    aRes = [ [lMorph.join(" | "), sLex] ];
                } else {
                    for (let sMorph of lMorph) {
                        aRes.push([sMorph, this.lexicographer.readableMorph(sMorph)]);
                    }
                }
                if (aRes.length > 0) {
                    lWordAndMorph.push([sElem, aRes]);
                }
            }
        }
        return lWordAndMorph;
    }

    readableMorph (sMorph) {
        if (!this.lexicographer) {
            return [];
        }
        return this.lexicographer.readableMorph(sMorph);
    }

    setLabelsOnToken (oToken) {
        if (!this.lexicographer) {
            return;
        }
        if (oToken["sType"].startsWith("WORD")) {
            oToken["bValidToken"] = (oToken.hasOwnProperty("lMorph")) ? true : this.isValidToken(oToken["sValue"]);
        }
        if (!oToken.hasOwnProperty("lMorph")) {
            oToken["lMorph"] = this.getMorph(oToken["sValue"]);
        }
        if (oToken["sType"].startsWith("WORD")) {
            let [sPrefix, sStem, sSuffix] = this.lexicographer.split(oToken["sValue"]);
            if (sStem != oToken["sValue"]) {
                oToken["lSubTokens"] = [
                    { "sType": "WORD", "sValue": sPrefix, "lMorph": this.getMorph(sPrefix) },
                    { "sType": "WORD", "sValue": sStem,   "lMorph": this.getMorph(sStem)   },
                    { "sType": "WORD", "sValue": sSuffix, "lMorph": this.getMorph(sSuffix) }
                ];
            }
        }
        this.lexicographer.setLabelsOnToken(oToken);
    }


    // Storage

    activateStorage () {
        this.bStorage = true;
    }

    deactivateStorage () {
        this.bStorage = false;
    }

    clearStorage () {
        this._dLemmas.clear();
        this._dMorphologies.clear();
    }


    // parse text functions

    parseParagraph (sText) {
        if (!this.oTokenizer) {
            this.loadTokenizer();
        }
        let aSpellErr = [];
        for (let oToken of this.oTokenizer.genTokens(sText)) {
            if (oToken.sType === 'WORD' && !this.isValidToken(oToken.sValue)) {
                aSpellErr.push(oToken);
            }
        }
        return aSpellErr;
    }

    // IBDAWG functions

    isValidToken (sToken) {
        // checks if sToken is valid (if there is hyphens in sToken, sToken is split, each part is checked)
        if (this.oMainDic.isValidToken(sToken)) {
            return true;
        }
        if (this.bCommunityDic && this.oCommunityDic.isValidToken(sToken)) {
            return true;
        }
        if (this.bPersonalDic && this.oPersonalDic.isValidToken(sToken)) {
            return true;
        }
        return false;
    }

    isValid (sWord) {
        // checks if sWord is valid (different casing tested if the first letter is a capital)
        if (this.oMainDic.isValid(sWord)) {
            return true;
        }
        if (this.bCommunityDic && this.oCommunityDic.isValid(sWord)) {
            return true;
        }
        if (this.bPersonalDic && this.oPersonalDic.isValid(sWord)) {
            return true;
        }
        return false;
    }

    lookup (sWord) {
        // checks if sWord is in dictionary as is (strict verification)
        if (this.oMainDic.lookup(sWord)) {
            return true;
        }
        if (this.bCommunityDic && this.oCommunityDic.lookup(sWord)) {
            return true;
        }
        if (this.bPersonalDic && this.oPersonalDic.lookup(sWord)) {
            return true;
        }
        return false;
    }

    getMorph (sWord) {
        // retrieves morphologies list, different casing allowed
        if (this.bStorage && this._dMorphologies.has(sWord)) {
            return this._dMorphologies.get(sWord);
        }
        let lMorph = this.oMainDic.getMorph(sWord);
        if (this.bCommunityDic) {
            lMorph.push(...this.oCommunityDic.getMorph(sWord));
        }
        if (this.bPersonalDic) {
            lMorph.push(...this.oPersonalDic.getMorph(sWord));
        }
        if (this.bStorage) {
            this._dMorphologies.set(sWord, lMorph);
            this._dLemmas.set(sWord, Array.from(new Set(this.getMorph(sWord).map((sMorph) => { return sMorph.slice(1, sMorph.indexOf("/")); }))));
            //console.log(sWord, this._dLemmas.get(sWord));
        }
        return lMorph;
    }

    morph (sWord, sPattern, sNegPattern="") {
        // analyse a token, return True if <sNegPattern> not in morphologies and <sPattern> in morphologies
        let lMorph = this.getMorph(sWord);
        if (lMorph.length == 0) {
            return false;
        }
        // check negative condition
        if (sNegPattern) {
            if (sNegPattern == "*") {
                // all morph must match sPattern
                return lMorph.every(sMorph  =>  (sMorph.search(sPattern) !== -1));
            }
            else {
                if (lMorph.some(sMorph  =>  (sMorph.search(sNegPattern) !== -1))) {
                    return false;
                }
            }
        }
        // search sPattern
        return lMorph.some(sMorph  =>  (sMorph.search(sPattern) !== -1));
    }

    getLemma (sWord) {
        // retrieves lemmas
        if (this.bStorage) {
            if (!this._dLemmas.has(sWord)) {
                this.getMorph(sWord);
            }
            return this._dLemmas.get(sWord);
        }
        return Array.from(new Set(this.getMorph(sWord).map((sMorph) => { return sMorph.slice(1, sMorph.indexOf("/")); })));
    }

    * suggest (sWord, nSuggLimit=10) {
        // generator: returns 1, 2 or 3 lists of suggestions
        if (this.lexicographer) {
            if (this.lexicographer.dSugg.has(sWord)) {
                yield this.lexicographer.dSugg.get(sWord).split("|");
            } else if (sWord.gl_isTitle() && this.lexicographer.dSugg.has(sWord.toLowerCase())) {
                let lSuggs = this.lexicographer.dSugg.get(sWord.toLowerCase()).split("|");
                yield lSuggs.map((sSugg) => { return sSugg.slice(0,1).toUpperCase() + sSugg.slice(1); });
            } else {
                let lSuggs = this.oMainDic.suggest(sWord, nSuggLimit, true);
                lSuggs = lSuggs.filter((sSugg) => this.lexicographer.isValidSugg(sSugg, this));
                yield lSuggs;
            }
        } else {
            yield this.oMainDic.suggest(sWord, nSuggLimit, true);
        }
        if (this.bCommunityDic) {
            yield this.oCommunityDic.suggest(sWord, Math.floor(nSuggLimit/2)+1);
        }
        if (this.bPersonalDic) {
            yield this.oPersonalDic.suggest(sWord, Math.floor(nSuggLimit/2)+1);
        }
    }

    * select (sFlexPattern="", sTagsPattern="") {
        // generator: returns all entries which flexion fits <sFlexPattern> and morphology fits <sTagsPattern>
        yield* this.oMainDic.select(sFlexPattern, sTagsPattern);
        if (this.bCommunityDic) {
            yield* this.oCommunityDic.select(sFlexPattern, sTagsPattern);
        }
        if (this.bPersonalDic) {
            yield* this.oPersonalDic.select(sFlexPattern, sTagsPattern);
        }
    }

    getSimilarEntries (sWord, nSuggLimit=10) {
        // return a list of tuples (similar word, stem, morphology)
        let lResult = this.oMainDic.getSimilarEntries(sWord, nSuggLimit);
        if (this.bCommunityDic) {
            lResult.push(...this.oCommunityDic.getSimilarEntries(sWord, nSuggLimit));
        }
        if (this.bPersonalDic) {
            lResult.push(...this.oPersonalDic.getSimilarEntries(sWord, nSuggLimit));
        }
        return lResult;
    }
}

if (typeof(exports) !== 'undefined') {
    exports.SpellChecker = SpellChecker;
}
