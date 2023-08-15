// IBDAWG

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console, __dirname */

"use strict";

// Don’t remove <string>. Necessary in TB.

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


// Set
/*jslint esversion: 6*/

if (Set.prototype.grammalecte === undefined) {
    Set.prototype.gl_update = function (aSet) {
        for (let elem of aSet) {
            this.add(elem);
        }
    };

    Set.prototype.grammalecte = true;
}


var helpers = window.grammalecte.helpers;
var str_transform = window.grammalecte.str_transform;
var char_player = window.grammalecte.char_player;

class SuggResult {
    // Structure for storing, classifying and filtering suggestions

    constructor (sWord, nSuggLimit=10, nDistLimit=-1) {
        this.sWord = sWord;
        this.sSimplifiedWord = str_transform.simplifyWord(sWord);
        this.nDistLimit = (nDistLimit >= 0) ? nDistLimit :  Math.floor(sWord.length / 3) + 1;
        this.nMinDist = 1000;
        // Temporary sets
        this.aAllSugg = new Set();  // All suggestions, even the one rejected
        this.dGoodSugg = new Map(); // Acceptable suggestions
        this.dBestSugg = new Map(); // Best suggestions
        // Parameters
        this.nSuggLimit = nSuggLimit;
        this.nSuggLimitExt = nSuggLimit + 2;                // we add few entries in case suggestions merge after casing modifications
        this.nBestSuggLimit = Math.floor(nSuggLimit * 2);   // n times the requested limit
        this.nGoodSuggLimit = nSuggLimit * 15;              // n times the requested limit
    }

    addSugg (sSugg) {
        // add a suggestion
        if (this.aAllSugg.has(sSugg)) {
            return;
        }
        this.aAllSugg.add(sSugg);
        // jaro 0->1 1 les chaines sont égale
        let nDistJaro = 1 - str_transform.distanceJaroWinkler(this.sSimplifiedWord, str_transform.simplifyWord(sSugg));
        let nDist = Math.floor(nDistJaro * 10);
        if (nDist < this.nMinDist) {
            this.nMinDist = nDist;
        }
        if (nDistJaro < .11) {        // Best suggestions
            this.dBestSugg.set(sSugg, Math.round(nDistJaro*1000));
            if (this.dBestSugg.size > this.nBestSuggLimit) {
                this.nDistLimit = -1; // make suggest() to end search
            }
        } else if (nDistJaro < .33) { // Good suggestions
            this.dGoodSugg.set(sSugg, Math.round(nDistJaro*1000));
            if (this.dGoodSugg.size > this.nGoodSuggLimit) {
                this.nDistLimit = -1; // make suggest() to end search
            }
        }
        this.nDistLimit = Math.min(this.nDistLimit, this.nMinDist+1);
    }

    getSuggestions () {
        // return a list of suggestions
        let lRes = [];
        if (this.dBestSugg.size > 0) {
            // sort only with simplified words
            let lResTmp = [...this.dBestSugg.entries()].sort((a, b) => { return a[1] - b[1]; });
            let nSize = Math.min(this.nSuggLimitExt, lResTmp.length);
            for (let i=0;  i < nSize;  i++){
                lRes.push(lResTmp[i][0]);
            }
        }
        if (lRes.length < this.nSuggLimitExt) {
            // sort with simplified words and original word
            let lResTmp = [...this.dGoodSugg.entries()].sort((a, b) => {
                // Low precision to rely more on simplified words
                let nJaroA = Math.round(str_transform.distanceJaroWinkler(this.sWord, a[0]) * 10);
                let nJaroB = Math.round(str_transform.distanceJaroWinkler(this.sWord, b[0]) * 10);
                if (nJaroA == nJaroB) {
                    return a[1] - b[1];     // warning: both lists are NOT sorted the same way (key: a-b)
                } else {
                    return nJaroB - nJaroA; // warning: both lists are NOT sorted the same way (key: b-a)
                }
            }).slice(0, this.nSuggLimitExt);
            let nSize = Math.min(this.nSuggLimitExt, lResTmp.length);
            for (let i=0;  i < nSize;  i++){
                lRes.push(lResTmp[i][0]);
            }
        }
        // casing
        if (this.sWord.gl_isUpperCase()) {
            lRes = lRes.map((sSugg) => { return sSugg.toUpperCase(); });
            lRes = [...new Set(lRes)];
        }
        else if (this.sWord.slice(0,1).gl_isUpperCase()) {
            lRes = lRes.map((sSugg) => { return sSugg.slice(0,1).toUpperCase() + sSugg.slice(1); });
            lRes = [...new Set(lRes)];
        }
        return lRes.slice(0, this.nSuggLimit);
    }
}


class IBDAWG {
    // INDEXABLE BINARY DIRECT ACYCLIC WORD GRAPH

    constructor (source, sPath="") {
        // <source> can be a filename or a object with all the necessary data.
        try {
            let oData = null;
            if (typeof(source) == "string") {
                let sURL;
                if (typeof(process) !== 'undefined') {
                    sURL = (sPath !== "") ? sPath + "/" + source : __dirname + "/dictionaries/"+source;
                } else {
                    sURL = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "vendor/grammalecte-sdk") + "/grammalecte/graphspell/dictionaries/"+source;
                }
                oData = JSON.parse(helpers.loadFile(sURL));
            } else {
                oData = source;
            }
            Object.assign(this, oData);
        }
        catch (e) {
            console.error(e);
            console.log("path: " + sPath);
            console.log("dic:" + source.slice(0, 1000));
            throw Error("# Error. File not found or not loadable.\n" + e.message + "\n");
        }
        /*
            Properties:
            sName, sHeader, lArcVal, nArcVal, sByDic, sLang, nChar, nBytesArc, nBytesNodeAddress,
            nEntry, nNode, nArc, nAff, cStemming, nTag, dChar, nBytesOffset,
        */

        if (!(this.sHeader.startsWith("/grammalecte-fsa/") || this.sHeader.startsWith("/pyfsa/"))) {
            throw TypeError("# Error. Not a grammalecte-fsa binary dictionary. Header: " + this.sHeader);
        }
        // <dChar> to get the value of an arc, <dCharVal> to get the char of an arc with its value
        this.dChar = helpers.objectToMap(this.dChar);
        this.dCharVal = this.dChar.gl_reverse();
        this.a2grams = (this.l2grams) ? new Set(this.l2grams) : null;

        if (!this.hasOwnProperty("lByDic")) {
            // old dictionary version
            if (!this.hasOwnProperty("sByDic")) {
                throw TypeError("# Error. No usable data in the dictionary.");
            }
            this.lByDic = [];
            let nAcc = 0;
            let lBytesBuffer = [];
            let nDivisor = (this.nBytesArc + this.nBytesNodeAddress) / 2;
            for (let i = 0;  i < this.sByDic.length;  i+=2) {
                lBytesBuffer.push(parseInt(this.sByDic.slice(i, i+2), 16));
                if (nAcc == (this.nBytesArc - 1)) {
                    this.lByDic.push(this._convBytesToInteger(lBytesBuffer));
                    lBytesBuffer = [];
                }
                else if (nAcc == (this.nBytesArc + this.nBytesNodeAddress - 1)) {
                    this.lByDic.push(Math.round(this._convBytesToInteger(lBytesBuffer) / nDivisor));  // Math.round should be useless, BUT with JS who knowns what can happen…
                    lBytesBuffer = [];
                    nAcc = -1;
                }
                nAcc = nAcc + 1;
            }
        }

        // masks
        this._arcMask = (2 ** ((this.nBytesArc * 8) - 3)) - 1;
        this._finalNodeMask = 1 << ((this.nBytesArc * 8) - 1);
        this._lastArcMask = 1 << ((this.nBytesArc * 8) - 2);

        // function to decode the affix/suffix code
        if (this.cStemming == "S") {
            this.funcStemming = str_transform.changeWordWithSuffixCode;
        } else if (this.cStemming == "A") {
            this.funcStemming = str_transform.changeWordWithAffixCode;
        } else {
            this.funcStemming = str_transform.noStemming;
        }

        //console.log(this.getInfo());
        this.bAcronymValid = true;
        this.bNumAtLastValid = false;

        // lexicographer module ?
        this.lexicographer = null;
        // JS still sucks: we’ll try importation when importation will be available in Workers. Still waiting...
        if (window && window.grammalecte.hasOwnProperty("lexgraph_" + this.sLangCode)) { // self is the Worker
            this.lexicographer = window.grammalecte["lexgraph_" + this.sLangCode];
        }
    }

    getInfo () {
        return  `  Language: ${this.sLangName}   Lang code: ${this.sLangCode}   Dictionary name: ${this.sDicName}\n` +
                `  Date: ${this.sDate}   Stemming: ${this.cStemming}FX\n` +
                `  Arcs values:  ${this.nArcVal} = ${this.nChar} characters,  ${this.nAff} affixes,  ${this.nTag} tags\n` +
                `  Dictionary: ${this.nEntry} entries,    ${this.nNode} nodes,   ${this.nArc} arcs\n` +
                `  Address size: ${this.nBytesNodeAddress} bytes,  Arc size: ${this.nBytesArc} bytes\n`;
    }

    getJSON () {
        let oJSON = {
            "sHeader": "/grammalecte-fsa/",
            "sLangCode": this.sLangCode,
            "sLangName": this.sLangName,
            "sDicName": this.sDicName,
            "sDescription": this.sDescription,
            "sFileName": this.sFileName,
            "sDate": this.sDate,
            "nEntry": this.nEntry,
            "nChar": this.nChar,
            "nAff": this.nAff,
            "nTag": this.nTag,
            "cStemming": this.cStemming,
            "dChar": helpers.mapToObject(this.dChar),
            "nNode": this.nNode,
            "nArc": this.nArc,
            "lArcVal": this.lArcVal,
            "nArcVal": this.nArcVal,
            "nBytesArc": this.nBytesArc,
            "nBytesNodeAddress": this.nBytesNodeAddress,
            "nBytesOffset": this.nBytesOffset,
            "sByDic": this.sByDic,  // binary word graph
            "l2grams": this.l2grams
        };
        return oJSON;
    }

    isValidToken (sToken) {
        // checks if sToken is valid (if there is hyphens in sToken, sToken is split, each part is checked)
        sToken = str_transform.spellingNormalization(sToken);
        if (this.isValid(sToken)) {
            return true;
        }
        if (sToken.includes("-")) {
            if (sToken.gl_count("-") > 4) {
                return true;
            }
            return sToken.split("-").every(sWord  =>  this.isValid(sWord));
        }
        if (sToken.includes(".") || sToken.includes("·")) {
            return true;
        }
        return false;
    }

    isValid (sWord) {
        // checks if sWord is valid (different casing tested if the first letter is a capital)
        if (!sWord) {
            return true;
        }
        if (this.lookup(sWord)) {
            return true;
        }
        if (sWord.charAt(0).gl_isUpperCase()) {
            if (sWord.length > 1) {
                if (sWord.gl_isTitle()) {
                    return !!this.lookup(sWord.toLowerCase());
                }
                if (sWord.gl_isUpperCase()) {
                    return !!(this.bAcronymValid || this.lookup(sWord.toLowerCase()) || this.lookup(sWord.gl_toCapitalize()));
                }
                return !!this.lookup(sWord.slice(0, 1).toLowerCase() + sWord.slice(1));
            }
            return !!this.lookup(sWord.toLowerCase());
        }
        if (sWord.slice(0,1).gl_isDigit()) {
            return true;
        }
        return false;
    }

    _convBytesToInteger (aBytes) {
        // Byte order = Big Endian (bigger first)
        let nVal = 0;
        let nWeight = (aBytes.length - 1) * 8;
        for (let n of aBytes) {
            nVal += n << nWeight;
            nWeight = nWeight - 8;
        }
        return nVal;
    }

    lookup (sWord) {
        // returns true if sWord in dictionary (strict verification)
        let iAddr = 0;
        for (let c of sWord) {
            if (!this.dChar.has(c)) {
                return false;
            }
            iAddr = this._lookupArcNode(this.dChar.get(c), iAddr);
            if (iAddr === null) {
                return false;
            }
        }
        return Boolean(this.lByDic[iAddr] & this._finalNodeMask);
    }

    getMorph (sWord) {
        // retrieves morphologies list, different casing allowed
        if (!sWord) {
            return [];
        }
        sWord = str_transform.spellingNormalization(sWord);
        let l = this._morph(sWord);
        if (sWord[0].gl_isUpperCase()) {
            l.push(...this._morph(sWord.toLowerCase()));
            if (sWord.gl_isUpperCase() && sWord.length > 1) {
                l.push(...this._morph(sWord.gl_toCapitalize()));
            }
        }
        return l;
    }

    suggest (sWord, nSuggLimit=10, bSplitTrailingNumbers=false) {
        // returns a array of suggestions for <sWord>
        //console.time("Suggestions for " + sWord);
        sWord = str_transform.spellingNormalization(sWord);
        let sPfx = "";
        let sSfx = "";
        if (this.lexicographer) {
            [sPfx, sWord, sSfx] = this.lexicographer.split(sWord);
        }
        let nMaxSwitch = Math.max(Math.floor(sWord.length / 3), 1);
        let nMaxDel = Math.floor(sWord.length / 5);
        let nMaxHardRepl = Math.max(Math.floor((sWord.length - 5) / 4), 1);
        let nMaxJump = Math.max(Math.floor(sWord.length / 4), 1);
        let oSuggResult = new SuggResult(sWord, nSuggLimit);
        sWord = str_transform.cleanWord(sWord);
        if (bSplitTrailingNumbers) {
            this._splitTrailingNumbers(oSuggResult, sWord);
        }
        this._splitSuggest(oSuggResult, sWord);
        this._suggest(oSuggResult, sWord);
        this._suggest(oSuggResult, sWord, nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump);
        let aSugg = oSuggResult.getSuggestions();
        if (sSfx || sPfx) {
            // we add what we removed
            return aSugg.map( (sSugg) => { return sPfx + sSugg + sSfx; } );
        }
        //console.timeEnd("Suggestions for " + sWord);
        return aSugg;
    }

    _splitTrailingNumbers (oSuggResult, sWord) {
        let m = /^([a-zA-Zà-öÀ-Ö_ø-ÿØ-ßĀ-ʯﬁ-ﬆ][a-zA-Zà-öÀ-Ö_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)([0-9]+)$/.exec(sWord);
        if (m  &&  !m[1].endsWith("-")  &&  !m[1].endsWith("_")) {
            oSuggResult.addSugg(m[1] + " " + str_transform.numbersToExponent(m[2]));
        }
    }

    _splitSuggest (oSuggResult, sWord) {
        // split at apostrophes
        for (let cSplitter of "'’") {
            if (sWord.includes(cSplitter)) {
                let [sWord1, sWord2] = sWord.split(cSplitter, 2);
                if (this.isValid(sWord1) && this.isValid(sWord2)) {
                    oSuggResult.addSugg(sWord1+" "+sWord2);
                }
            }
        }
    }

    _suggest (oSuggResult, sRemain, nMaxSwitch=0, nMaxDel=0, nMaxHardRepl=0, nMaxJump=0, nDist=0, nDeep=0, iAddr=0, sNewWord="", bAvoidLoop=false) {
        // returns a set of suggestions
        // recursive function
        if (this.lByDic[iAddr] & this._finalNodeMask) {
            if (sRemain == "") {
                oSuggResult.addSugg(sNewWord);
                for (let sTail of this._getTails(iAddr)) {
                    oSuggResult.addSugg(sNewWord+sTail);
                }
                return;
            }
            else if ( (sNewWord.length + sRemain.length == oSuggResult.sWord.length) && oSuggResult.sWord.toLowerCase().startsWith(sNewWord.toLowerCase()) && this.isValid(sRemain) ) {
                if (this.sLangCode == "fr"
                    && ["l", "d", "n", "m", "t", "s", "c", "j", "qu", "lorsqu", "puisqu", "quoiqu", "jusqu", "quelqu"].includes(sNewWord.toLowerCase()) && char_player.aVowel.has(sRemain.slice(0,1))) {
                    oSuggResult.addSugg(sNewWord+"’"+sRemain);
                }
                if ((sNewWord.length > 1 && sRemain.length > 1) || ["a", "à", "y"].includes(sNewWord) || ["a", "à", "y"].includes(sRemain)) {
                    oSuggResult.addSugg(sNewWord+" "+sRemain);
                }
            }
        }
        if (nDist > oSuggResult.nDistLimit) {
            return;
        }
        let cCurrent = sRemain.slice(0, 1);
        for (let [cChar, jAddr] of this._getCharArcs(iAddr)) {
            if (char_player.d1to1.gl_get(cCurrent, cCurrent).indexOf(cChar) != -1) {
                this._suggest(oSuggResult, sRemain.slice(1), nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, jAddr, sNewWord+cChar);
            }
            else if (!bAvoidLoop) {
                if (nMaxHardRepl  &&  this.isNgramsOK(cChar+sRemain.slice(1,2))) {
                    this._suggest(oSuggResult, sRemain.slice(1), nMaxSwitch, nMaxDel, nMaxHardRepl-1, nMaxJump, nDist+1, nDeep+1, jAddr, sNewWord+cChar, true);
                }
                if (nMaxJump) {
                    this._suggest(oSuggResult, sRemain, nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump-1, nDist+1, nDeep+1, jAddr, sNewWord+cChar, true); // true for avoiding loop?
                }
            }
        }
        if (!bAvoidLoop) { // avoid infinite loop
            if (sRemain.length > 1) {
                if (cCurrent == sRemain.slice(1, 2)) {
                    // same char, we remove 1 char without adding 1 to <sNewWord>
                    this._suggest(oSuggResult, sRemain.slice(1), nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord);
                }
                else {
                    // switching chars
                    if (nMaxSwitch > 0  &&  this.isNgramsOK(sNewWord.slice(-1)+sRemain.slice(1,2))  &&  this.isNgramsOK(sRemain.slice(1,2)+sRemain.slice(0,1))) {
                        this._suggest(oSuggResult, sRemain.slice(1, 2)+sRemain.slice(0, 1)+sRemain.slice(2), nMaxSwitch-1, nMaxDel, nMaxHardRepl, nMaxJump, nDist+1, nDeep+1, iAddr, sNewWord, true);
                    }
                    // delete char
                    if (nMaxDel > 0  &&  this.isNgramsOK(sNewWord.slice(-1)+sRemain.slice(1,2))) {
                        this._suggest(oSuggResult, sRemain.slice(1), nMaxSwitch, nMaxDel-1, nMaxHardRepl, nMaxJump, nDist+1, nDeep+1, iAddr, sNewWord, true);
                    }
                }
                // Phonetic replacements
                for (let sRepl of char_player.get1toXReplacement(sNewWord.slice(-1), cCurrent, sRemain.slice(1,2))) {
                    this._suggest(oSuggResult, sRepl + sRemain.slice(1), nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord, true);
                }
                for (let sRepl of char_player.d2toX.gl_get(sRemain.slice(0, 2), [])) {
                    this._suggest(oSuggResult, sRepl + sRemain.slice(2), nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord, true);
                }
            }
            // end of word
            if (sRemain.length == 2) {
                for (let sRepl of char_player.dFinal2.gl_get(sRemain, [])) {
                    this._suggest(oSuggResult, sRepl, nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord, true);
                }
            }
            else if (sRemain.length == 1) {
                this._suggest(oSuggResult, "", nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord, true); // remove last char and go on
                for (let sRepl of char_player.dFinal1.gl_get(sRemain, [])) {
                    this._suggest(oSuggResult, sRepl, nMaxSwitch, nMaxDel, nMaxHardRepl, nMaxJump, nDist, nDeep+1, iAddr, sNewWord, true);
                }
            }
        }
    }

    isNgramsOK (sChars) {
        if (sChars.length != 2) {
            return true;
        }
        if (!this.a2grams) {
            return true;
        }
        return this.a2grams.has(sChars);
    }

    * _getCharArcs (iAddr) {
        // generator: yield all chars and addresses from node at address <iAddr>
        for (let [nVal, jAddr] of this._getArcs(iAddr)) {
            if (nVal <= this.nChar) {
                yield [this.dCharVal.get(nVal), jAddr];
            }
        }
    }

    * _getSimilarCharArcs (cChar, iAddr) {
        // generator: yield similar char of <cChar> and address of the following node
        for (let c of char_player.d1to1.gl_get(cChar, [cChar])) {
            if (this.dChar.has(c)) {
                let jAddr = this._lookupArcNode(this.dChar.get(c), iAddr);
                if (jAddr) {
                    yield [c, jAddr];
                }
            }
        }
    }

    _getTails (iAddr, sTail="", n=2) {
        // return a list of suffixes ending at a distance of <n> from <iAddr>
        let aTails = new Set();
        for (let [nVal, jAddr] of this._getArcs(iAddr)) {
            if (nVal <= this.nChar) {
                if (this.lByDic[jAddr] & this._finalNodeMask) {
                    aTails.add(sTail + this.dCharVal.get(nVal));
                }
                if (n && aTails.size == 0) {
                    aTails.gl_update(this._getTails(jAddr, sTail+this.dCharVal.get(nVal), n-1));
                }
            }
        }
        return aTails;
    }

    getSimilarEntries (sWord, nSuggLimit=10) {
        // return a list of tuples (similar word, stem, morphology)
        if (sWord == "") {
            return [];
        }
        let lResult = [];
        for (let sSimilar of this.suggest(sWord, nSuggLimit)) {
            for (let sMorph of this.getMorph(sSimilar)) {
                let nCut = sMorph.indexOf("/");
                lResult.push( [sSimilar, sMorph.slice(1, nCut), sMorph.slice(nCut+1)] );
            }
        }
        return lResult;
    }

    * select (sFlexPattern="", sTagsPattern="") {
        // generator: returns all entries which flexion fits <sFlexPattern> and morphology fits <sTagsPattern>
        let zFlexPattern = null;
        let zTagsPattern = null;
        try {
            zFlexPattern = (sFlexPattern !== "") ? new RegExp(sFlexPattern) : null;
            zTagsPattern = (sTagsPattern !== "") ? new RegExp(sTagsPattern) : null;
        }
        catch (e) {
            console.log("Error in regex pattern");
            console.log(e.message);
        }
        yield* this._select(zFlexPattern, zTagsPattern, 0, "");
    }

    * _select (zFlexPattern, zTagsPattern, iAddr, sWord) {
        // recursive generator
        for (let [nVal, jAddr] of this._getArcs(iAddr)) {
            if (nVal <= this.nChar) {
                // simple character
                yield* this._select(zFlexPattern, zTagsPattern, jAddr, sWord + this.lArcVal[nVal]);
            } else {
                if (!zFlexPattern || zFlexPattern.test(sWord)) {
                    let sStem = this.funcStemming(sWord, this.lArcVal[nVal]);
                    for (let [nMorphVal, _] of this._getArcs(jAddr)) {
                        if (!zTagsPattern || zTagsPattern.test(this.lArcVal[nMorphVal])) {
                            yield [sWord, sStem, this.lArcVal[nMorphVal]];
                        }
                    }
                }
            }
        }
    }

    _morph (sWord) {
        // returns morphologies of sWord
        let iAddr = 0;
        for (let c of sWord) {
            if (!this.dChar.has(c)) {
                return [];
            }
            iAddr = this._lookupArcNode(this.dChar.get(c), iAddr);
            if (iAddr === null) {
                return [];
            }
        }
        if (this.lByDic[iAddr] & this._finalNodeMask) {
            let l = [];
            let nRawArc = 0;
            while (!(nRawArc & this._lastArcMask)) {
                let iEndArcAddr = iAddr + 1;
                nRawArc = this.lByDic[iAddr];
                let nArc = nRawArc & this._arcMask;
                if (nArc > this.nChar) {
                    // This value is not a char, this is a stemming code
                    let sStem = ">" + this.funcStemming(sWord, this.lArcVal[nArc]);
                    // Now , we go to the next node and retrieve all following arcs values, all of them are tags
                    let iAddr2 = this.lByDic[iEndArcAddr];
                    let nRawArc2 = 0;
                    while (!(nRawArc2 & this._lastArcMask)) {
                        let iEndArcAddr2 = iAddr2 + 1;
                        nRawArc2 = this.lByDic[iAddr2];
                        l.push(sStem + "/" + this.lArcVal[nRawArc2 & this._arcMask]);
                        iAddr2 = iEndArcAddr2 + 1;
                    }
                }
                iAddr = iEndArcAddr + 1;
            }
            return l;
        }
        return [];
    }

    _stem (sWord) {
        // returns stems list of sWord
        let iAddr = 0;
        for (let c of sWord) {
            if (!this.dChar.has(c)) {
                return [];
            }
            iAddr = this._lookupArcNode(this.dChar.get(c), iAddr);
            if (iAddr === null) {
                return [];
            }
        }
        if (this.lByDic[iAddr] & this._finalNodeMask) {
            let l = [];
            let nRawArc = 0;
            while (!(nRawArc & this._lastArcMask)) {
                let iEndArcAddr = iAddr + 1;
                nRawArc = this.lByDic[iAddr];
                let nArc = nRawArc & this._arcMask;
                if (nArc > this.nChar) {
                    // This value is not a char, this is a stemming code
                    l.push(this.funcStemming(sWord, this.lArcVal[nArc]));
                }
                iAddr = iEndArcAddr + 1;
            }
            return l;
        }
        return [];
    }

    _lookupArcNode (nVal, iAddr) {
        // looks if nVal is an arc at the node at iAddr, if yes, returns address of next node else None
        while (true) {
            let iEndArcAddr = iAddr+1;
            let nRawArc = this.lByDic[iAddr];
            if (nVal == (nRawArc & this._arcMask)) {
                // the value we are looking for
                // we return the address of the next node
                return this.lByDic[iEndArcAddr];
            }
            else {
                // value not found
                if (nRawArc & this._lastArcMask) {
                    return null;
                }
                iAddr = iEndArcAddr + 1;
            }
        }
    }

    * _getArcs (iAddr) {
        // generator: return all arcs at <iAddr> as tuples of (nVal, iAddr)
        while (true) {
            let iEndArcAddr = iAddr+1;
            let nRawArc = this.lByDic[iAddr];
            yield [nRawArc & this._arcMask, this.lByDic[iEndArcAddr]];
            if (nRawArc & this._lastArcMask) {
                break;
            }
            iAddr = iEndArcAddr+1;
        }
    }
}


if (typeof(exports) !== 'undefined') {
    exports.IBDAWG = IBDAWG;
}
