// JavaScript
// Grammar checker engine functions


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


// regex
/*jslint esversion: 6*/

if (RegExp.prototype.grammalecte === undefined) {
    RegExp.prototype.gl_exec2 = function (sText, aGroupsPos, aNegLookBefore=null) {
        let m;
        while ((m = this.exec(sText)) !== null) {
            // we have to iterate over sText here too
            // because first match doesn’t imply it’s a valid match according to negative lookbefore assertions,
            // and even if first match is finally invalid, it doesn’t mean the following eligible matchs would be invalid too.
            if (aNegLookBefore !== null) {
                // check negative look before assertions
                if ( !aNegLookBefore.some(sRegEx  =>  (RegExp.leftContext.search(sRegEx) >= 0)) ) {
                    break;
                }
            } else {
                break;
            }
        }
        if (m === null) {
            return null;
        }

        let codePos;
        let iPos = 0;
        m.start = [m.index];
        m.end = [this.lastIndex];
        try {
            if (m.length > 1) {
                // there is subgroup(s)
                if (aGroupsPos !== null) {
                    // aGroupsPos is defined
                    for (let i = 1; i <= m.length-1; i++) {
                        codePos = aGroupsPos[i-1];
                        if (typeof codePos === "number") {
                            // position as a number
                            m.start.push(m.index + codePos);
                            m.end.push(m.index + codePos + m[i].length);
                        } else if (codePos === "$") {
                            // at the end of the pattern
                            m.start.push(this.lastIndex - m[i].length);
                            m.end.push(this.lastIndex);
                        } else if (codePos === "w") {
                            // word in the middle of the pattern
                            iPos = m[0].search("[ ’,()«»“”]"+m[i]+"[ ,’()«»“”]") + 1 + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos === "*") {
                            // anywhere
                            iPos = m[0].indexOf(m[i]) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos === "**") {
                            // anywhere after previous group
                            iPos = m[0].indexOf(m[i], m.end[i-1]-m.index) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos.startsWith(">")) {
                            // >x:_
                            // todo: look in substring x
                            iPos = m[0].indexOf(m[i]) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else {
                            console.error("# Error: unknown positioning code in regex [" + this.source + "], for group[" + i.toString() +"], code: [" + codePos + "]");
                        }
                    }
                } else {
                    // no aGroupsPos
                    for (let subm of m.slice(1)) {
                        iPos = m[0].indexOf(subm) + m.index;
                        m.start.push(iPos);
                        m.end.push(iPos + subm.length);
                    }
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        return m;
    };

    RegExp.prototype.grammalecte = true;
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



var gc_options = window.grammalecte["gc_options"];

let _sAppContext = "JavaScript";        // what software is running
let _oSpellChecker = null;


//////// Common functions

function option (sOpt) {
    // return true if option sOpt is active
    return gc_options.dOptions.gl_get(sOpt, false);
}

function echo (x) {
    console.log(x);
    return true;
}

var re = {
    search: function (sRegex, sText) {
        if (sRegex.startsWith("(?i)")) {
            return sText.search(new RegExp(sRegex.slice(4), "i")) !== -1;
        } else {
            return sText.search(sRegex) !== -1;
        }
    },

    createRegExp: function (sRegex) {
        if (sRegex.startsWith("(?i)")) {
            return new RegExp(sRegex.slice(4), "i");
        } else {
            return new RegExp(sRegex);
        }
    }
}


//////// functions to get text outside pattern scope

// warning: check compile_rules.py to understand how it works

function nextword (s, iStart, n) {
    // get the nth word of the input string or empty string
    let z = new RegExp("^(?: +[a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ%_-]+){" + (n-1).toString() + "} +([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ%_-]+)", "ig");
    let m = z.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + z.lastIndex - m[1].length, m[1]];
}

function prevword (s, iEnd, n) {
    // get the (-)nth word of the input string or empty string
    let z = new RegExp("([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ%_-]+) +(?:[a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ%_-]+ +){" + (n-1).toString() + "}$", "i");
    let m = z.exec(s.slice(0, iEnd));
    if (!m) {
        return null;
    }
    return [m.index, m[1]];
}

function nextword1 (s, iStart) {
    // get next word (optimization)
    let _zNextWord = new RegExp ("^ +([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ_][a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ_-]*)", "ig");
    let m = _zNextWord.exec(s.slice(iStart));
    if (!m) {
        return null;
    }
    return [iStart + _zNextWord.lastIndex - m[1].length, m[1]];
}

const _zPrevWord = new RegExp ("([a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ_][a-zà-öA-Zø-ÿÀ-Ö0-9Ø-ßĀ-ʯﬀ-ﬆᴀ-ᶿ_-]*) +$", "i");

function prevword1 (s, iEnd) {
    // get previous word (optimization)
    let m = _zPrevWord.exec(s.slice(0, iEnd));
    if (!m) {
        return null;
    }
    return [m.index, m[1]];
}

function look (s, sPattern, sNegPattern=null) {
    // seek sPattern in s (before/after/fulltext), if antipattern sNegPattern not in s
    try {
        if (sNegPattern && re.search(sNegPattern, s)) {
            return false;
        }
        return re.search(sPattern, s);
    }
    catch (e) {
        console.error(e);
    }
    return false;
}


//////// Analyse groups for regex rules

function info (dTokenPos, aWord) {
    // for debugging: info of word
    if (!aWord) {
        console.log("> nothing to find");
        return true;
    }
    let lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(aWord[1]);
    if (lMorph.length === 0) {
        console.log("> not in dictionary");
        return true;
    }
    if (dTokenPos.has(aWord[0])) {
        console.log("DA: " + dTokenPos.get(aWord[0]));
    }
    console.log("FSA: " + lMorph);
    return true;
}

function morph (dTokenPos, aWord, sPattern, sNegPattern, bNoWord=false) {
    // analyse a tuple (position, word), returns true if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation on)
    if (!aWord) {
        return bNoWord;
    }
    let lMorph = (dTokenPos.has(aWord[0])  &&  dTokenPos.get(aWord[0]))["lMorph"] ? dTokenPos.get(aWord[0])["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(aWord[1]);
    if (lMorph.length === 0) {
        return false;
    }
    if (sNegPattern) {
        // check negative condition
        if (sNegPattern === "*") {
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

function analyse (sWord, sPattern, sNegPattern) {
    // analyse a word, returns True if not sNegPattern in word morphologies and sPattern in word morphologies (disambiguation off)
    let lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord);
    if (lMorph.length === 0) {
        return false;
    }
    if (sNegPattern) {
        // check negative condition
        if (sNegPattern === "*") {
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


//// Analyse tokens for graph rules

function g_value (oToken, sValues, nLeft=null, nRight=null) {
    // test if <oToken['sValue']> is in sValues (each value should be separated with |)
    let sValue = (nLeft === null) ? "|"+oToken["sValue"]+"|" : "|"+oToken["sValue"].slice(nLeft, nRight)+"|";
    if (sValues.includes(sValue)) {
        return true;
    }
    if (oToken["sValue"].slice(0,2).gl_isTitle()) {
        if (sValues.includes(sValue.toLowerCase())) {
            return true;
        }
    }
    else if (oToken["sValue"].gl_isUpperCase()) {
        //if sValue.lower() in sValues:
        //    return true;
        sValue = "|"+sValue.slice(1).gl_toCapitalize();
        if (sValues.includes(sValue)) {
            return true;
        }
        sValue = sValue.toLowerCase();
        if (sValues.includes(sValue)) {
            return true;
        }
    }
    return false;
}

function g_morph (oToken, sPattern, sNegPattern="", nLeft=null, nRight=null, bMemorizeMorph=true) {
    // analyse a token, return True if <sNegPattern> not in morphologies and <sPattern> in morphologies
    let lMorph;
    if (oToken.hasOwnProperty("lMorph")) {
        lMorph = oToken["lMorph"];
    }
    else {
        if (nLeft !== null) {
            let sValue = (nRight !== null) ? oToken["sValue"].slice(nLeft, nRight) : oToken["sValue"].slice(nLeft);
            lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(sValue);
            if (bMemorizeMorph) {
                oToken["lMorph"] = lMorph;
            }
        } else {
            lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
        }
    }
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

function g_morph0 (oToken, sPattern, sNegPattern="", nLeft=null, nRight=null, bMemorizeMorph=true) {
    // analyse a token, return True if <sNegPattern> not in morphologies and <sPattern> in morphologies
    let lMorph;
    if (nLeft !== null) {
        let sValue = (nRight !== null) ? oToken["sValue"].slice(nLeft, nRight) : oToken["sValue"].slice(nLeft);
        lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(sValue);
        if (bMemorizeMorph) {
            oToken["lMorph"] = lMorph;
        }
    } else {
        lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
    }
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

function g_morph2 (oToken1, oToken2, cMerger, sPattern, sNegPattern="", bSetMorph=true) {
    // merge two token values, return True if <sNegPattern> not in morphologies and <sPattern> in morphologies (disambiguation off)
    let lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken1["sValue"] + cMerger + oToken2["sValue"]);
    if (lMorph.length == 0) {
        return false;
    }
    // check negative condition
    if (sNegPattern) {
        if (sNegPattern == "*") {
            // all morph must match sPattern
            let bResult = lMorph.every(sMorph  =>  (sMorph.search(sPattern) !== -1));
            if (bResult && bSetMorph) {
                oToken1["lMorph"] = lMorph;
            }
            return bResult;
        }
        else {
            if (lMorph.some(sMorph  =>  (sMorph.search(sNegPattern) !== -1))) {
                return false;
            }
        }
    }
    // search sPattern
    let bResult = lMorph.some(sMorph  =>  (sMorph.search(sPattern) !== -1));
    if (bResult && bSetMorph) {
        oToken1["lMorph"] = lMorph;
    }
    return bResult;
}

function g_tagbefore (oToken, dTags, sTag) {
    if (!dTags.has(sTag)) {
        return false;
    }
    if (oToken["i"] > dTags.get(sTag)[0]) {
        return true;
    }
    return false;
}

function g_tagafter (oToken, dTags, sTag) {
    if (!dTags.has(sTag)) {
        return false;
    }
    if (oToken["i"] < dTags.get(sTag)[1]) {
        return true;
    }
    return false;
}

function g_tag (oToken, sTag) {
    return oToken.hasOwnProperty("aTags") && oToken["aTags"].has(sTag);
}

function g_meta (oToken, sType) {
    return oToken["sType"] == sType;
}

function g_space (oToken1, oToken2, nMin, nMax=null) {
    let nSpace = oToken2["nStart"] - oToken1["nEnd"]
    if (nSpace < nMin) {
        return false;
    }
    if (nMax !== null && nSpace > nMax) {
        return false;
    }
    return true;
}

function g_token (lToken, i) {
    if (i < 0) {
        return lToken[0];
    }
    if (i >= lToken.length) {
        return lToken[lToken.length-1];
    }
    return lToken[i];
}


//////// Disambiguator for regex rules

function select (dTokenPos, nPos, sWord, sPattern, sNegPattern="") {
    if (!sWord) {
        return true;
    }
    if (!dTokenPos.has(nPos)) {
        console.log("Error. There should be a token at this position: ", nPos);
        return true;
    }
    let lMorph = window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord);
    if (lMorph.length === 0  ||  lMorph.length === 1) {
        return true;
    }
    let lSelect;
    if (sPattern) {
        if (sNegPattern) {
            lSelect = lMorph.filter( sMorph => sMorph.search(sPattern) !== -1 && sMorph.search(sNegPattern) === -1 );
        }
        else {
            lSelect = lMorph.filter( sMorph => sMorph.search(sPattern) !== -1 );
        }
    }
    else if (sNegPattern) {
        lSelect = lMorph.filter( sMorph => sMorph.search(sNegPattern) === -1 );
    }
    else {
        console.log("[Grammalecte] Error: missing pattern for disambiguation selection...");
        return true;
    }
    if (lSelect.length > 0 && lSelect.length != lMorph.length) {
        dTokenPos.get(nPos)["lMorph"] = lSelect;
    }
    return true;
}

function define (dTokenPos, nPos, sMorphs) {
    dTokenPos.get(nPos)["lMorph"] = sMorphs.split("|");
    return true;
}


//// Disambiguation for graph rules

function g_select (oToken, sPattern, sNegPattern="") {
    // select morphologies for <oToken> according to <sPattern>, always return true
    let lMorph = (oToken.hasOwnProperty("lMorph")) ? oToken["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
    if (lMorph.length === 0  || lMorph.length === 1) {
        return true;
    }
    let lSelect;
    if (sPattern) {
        if (sNegPattern) {
            lSelect = lMorph.filter( sMorph => sMorph.search(sPattern) !== -1 && sMorph.search(sNegPattern) === -1 );
        }
        else {
            lSelect = lMorph.filter( sMorph => sMorph.search(sPattern) !== -1 );
        }
    }
    else if (sNegPattern) {
        lSelect = lMorph.filter( sMorph => sMorph.search(sNegPattern) === -1 );
    }
    else {
        console.log("[Grammalecte] Error: missing pattern for disambiguation selection...");
        return true;
    }
    if (lSelect.length > 0 && lSelect.length != lMorph.length) {
        oToken["lMorph"] = lSelect;
    }
    return true;
}

function g_addmorph (oToken, sNewMorph) {
    // Disambiguation: add a morphology to a token
    let lMorph = (oToken.hasOwnProperty("lMorph")) ? oToken["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
    lMorph.push(...sNewMorph.split("|"));
    oToken["lMorph"] = lMorph;
    return true;
}

function g_rewrite (oToken, sToReplace, sReplace, bRegEx=false) {
    // Disambiguation: rewrite morphologies
    let lMorph = (oToken.hasOwnProperty("lMorph")) ? oToken["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
    if (bRegEx) {
        oToken["lMorph"] = lMorph.map(sMorph => sMorph.replace(new RegExp(sToReplace), sReplace));
    }
    else {
        oToken["lMorph"] = lMorph.map(sMorph => sMorph.replace(sToReplace, sReplace));
    }
    return true;
}

function g_define (oToken, sMorphs) {
    // set morphologies of <oToken>, always return true
    oToken["lMorph"] = sMorphs.split("|");
    return true;
}

function g_definefrom (oToken, nLeft=null, nRight=null) {
    let sValue = oToken["sValue"];
    if (nLeft !== null) {
        sValue = (nRight !== null) ? sValue.slice(nLeft, nRight) : sValue.slice(nLeft);
    }
    oToken["lMorph"] = window.grammalecte.gc_engine.oSpellChecker.getMorph(sValue);
    return true;
}

function g_setmeta (oToken, sType) {
    // Disambiguation: change type of token
    oToken["sType"] = sType;
    return true;
}



//////// GRAMMAR CHECKER PLUGINS



// GRAMMAR CHECKING ENGINE PLUGIN: Parsing functions for French language

/* jshint esversion:6 */
/* jslint esversion:6 */

function g_morphVC (oToken, sPattern, sNegPattern="") {
    let nEnd = oToken["sValue"].lastIndexOf("-");
    if (oToken["sValue"].gl_count("-") > 1) {
        if (oToken["sValue"].includes("-t-")) {
            nEnd = nEnd - 2;
        }
        else if (oToken["sValue"].search(/-l(?:es?|a)-(?:[mt]oi|nous|leur)$|(?:[nv]ous|lui|leur)-en$/) != -1) {
            nEnd = oToken["sValue"].slice(0,nEnd).lastIndexOf("-");
        }
    }
    return g_morph(oToken, sPattern, sNegPattern, 0, nEnd, false);
}

function apposition (sWord1, sWord2) {
    // returns true if nom + nom (no agreement required)
    return sWord2.length < 2 || (window.grammalecte["cregex"].mbNomNotAdj(window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord2)) && window.grammalecte["cregex"].mbPpasNomNotAdj(window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord1)));
}

function g_agreement (oToken1, oToken2, bNotOnlyNames=true) {
    // check agreement between <oToken1> and <oToken2>
    let lMorph1 = oToken1.hasOwnProperty("lMorph") ? oToken1["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken1["sValue"]);
    if (lMorph1.length === 0) {
        return true;
    }
    let lMorph2 = oToken2.hasOwnProperty("lMorph") ? oToken2["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken2["sValue"]);
    if (lMorph2.length === 0) {
        return true;
    }
    if (bNotOnlyNames && !(window.grammalecte["cregex"].mbAdj(lMorph2) || window.grammalecte["cregex"].mbAdjNb(lMorph1))) {
        return false;
    }
    return window.grammalecte["cregex"].agreement(lMorph1, lMorph2);
}

function mbUnit (s) {
    if (/[µ\/⁰¹²³⁴⁵⁶⁷⁸⁹Ωℓ·]/.test(s)) {
        return true;
    }
    if (s.length > 1 && s.length < 16 && s.slice(0, 1).gl_isLowerCase() && (!s.slice(1).gl_isLowerCase() || /[0-9]/.test(s))) {
        return true;
    }
    return false;
}

function queryNamesPOS (sWord1, sWord2) {
    let lMorph1 = window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord1);
    let lMorph2 = window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord2);
    if (lMorph1.length == 0 || lMorph2.length == 0) {
        return ":N:e:p";
    }
    let [sGender1, ] = window.grammalecte["cregex"].getGenderNumber(lMorph1);
    let [sGender2, ] = window.grammalecte["cregex"].getGenderNumber(lMorph2);
    if (sGender1 == ":m" || sGender2 == ":m") {
        return ":N:m:p";
    }
    if (sGender1 == ":f" || sGender2 == ":f") {
        return ":N:f:p";
    }
    return ":N:e:p";
}


// GRAMMAR CHECKING ENGINE PLUGIN

// Check date validity
// WARNING: when creating a Date, month must be between 0 and 11

/* jshint esversion:6 */
/* jslint esversion:6 */


const _lDay = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const _dMonth = new Map ([
    ["janvier", 1], ["février", 2], ["mars", 3], ["avril", 4], ["mai", 5], ["juin", 6], ["juillet", 7],
    ["août", 8], ["aout", 8], ["septembre", 9], ["octobre", 10], ["novembre", 11], ["décembre", 12]
]);
const _dDaysInMonth = new Map ([
    [1, 31], [2, 28], [3, 31], [4, 30], [5, 31], [6, 30], [7, 31],
    [8, 31], [8, 31], [9, 30], [10, 31], [11, 30], [12, 31]
]);

// Dans Python, datetime.weekday() envoie le résultat comme si nous étions dans un calendrier grégorien universal.
// https://fr.wikipedia.org/wiki/Passage_du_calendrier_julien_au_calendrier_gr%C3%A9gorien
// Selon Grégoire, le jeudi 4 octobre 1582 est immédiatement suivi par le vendredi 15 octobre.
// En France, la bascule eut lieu le 9 décembre 1582 qui fut suivi par le 20 décembre 1582.
// C’est la date retenue pour la bascule dans Grammalecte, mais le calendrier grégorien fut adopté dans le monde diversement.
// Il fallut des siècles pour qu’il soit adopté par l’Occident et une grande partie du reste du monde.
const _dGregorianToJulian = new Map ([
    ["lundi",    "jeudi"],
    ["mardi",    "vendredi"],
    ["mercredi", "samedi"],
    ["jeudi",    "dimanche"],
    ["vendredi", "lundi"],
    ["samedi",   "mardi"],
    ["dimanche", "mercredi"]
]);

function _checkDate (nDay, nMonth, nYear) {
    // returns true or false
    if (nMonth > 12 || nMonth < 1 || nDay > 31 || nDay < 1) {
        return false;
    }
    if (nDay <= _dDaysInMonth.get(nMonth)) {
        return true;
    }
    if (nDay === 29) {
        // leap years, http://jsperf.com/ily/15
        return !(nYear & 3 || !(nYear % 25) && nYear & 15);
    }
    return false;
}

function checkDate (sDay, sMonth, sYear) {
    // return True if the date is valid
    if (!sMonth.gl_isDigit()) {
        sMonth = _dMonth.get(sMonth.toLowerCase());
    }
    if (_checkDate(parseInt(sDay, 10), parseInt(sMonth, 10), parseInt(sYear, 10))) {
        return new Date(parseInt(sYear, 10), parseInt(sMonth, 10)-1, parseInt(sDay, 10));
    }
    return false;
}

function checkDay (sWeekday, sDay, sMonth, sYear) {
    // return True if sWeekday is valid according to the given date
    let xDate = checkDate(sDay, sMonth, sYear);
    if (xDate  &&  _getDay(xDate) != sWeekday.toLowerCase()) {
        return false;
    }
    // if the date isn’t valid, any day is valid.
    return true;
}

function getDay (sDay, sMonth, sYear) {
    // return the day of the date (in Gregorian calendar after 1582-12-20, in Julian calendar before 1582-12-09)
    let xDate = checkDate(sDay, sMonth, sYear);
    if (xDate) {
        return _getDay(xDate);
    }
    return ""
}

function _getDay (xDate) {
    // return the day of the date (in Gregorian calendar after 1582-12-20, in Julian calendar before 1582-12-09)
    if (xDate.getFullYear() > 1582) {
        // Calendrier grégorien
        return _lDay[xDate.getDay()];
    }
    if (xDate.getFullYear() < 1582) {
        // Calendrier julien
        let sGregorianDay = _lDay[xDate.getDay()];
        return _dGregorianToJulian.get(sGregorianDay, "Erreur: jour inconnu")
    }
    // 1582
    if ((xDate.getMonth()+1) < 12  || xDate.getDate() <= 9) {
        // Calendrier julien
        let sGregorianDay = _lDay[xDate.getDay()];
        return _dGregorianToJulian.get(sGregorianDay, "Erreur: jour inconnu");
    }
    else if (xDate.getDate() >= 20) {
        // Calendrier grégorien
        return _lDay[xDate.getDay()];
    }
    else {
        // 10 - 19 décembre 1582: jours inexistants en France.
        return "";
    }
}


// GRAMMAR CHECKING ENGINE PLUGIN: Suggestion mechanisms

/* jshint esversion:6 */
/* jslint esversion:6 */
/* global require */


var conj = window.grammalecte["conj"];
var mfsp = window.grammalecte["mfsp"];
var phonet = window.grammalecte["phonet"];

//// verbs

function splitVerb (sVerb) {
    // renvoie le verbe et les pronoms séparément
    let iRight = sVerb.lastIndexOf("-");
    let sSuffix = sVerb.slice(iRight);
    sVerb = sVerb.slice(0, iRight);
    if (sVerb.endsWith("-t") || sVerb.endsWith("-le") || sVerb.endsWith("-la") || sVerb.endsWith("-les") || sVerb.endsWith("-nous") || sVerb.endsWith("-vous") || sVerb.endsWith("-leur") || sVerb.endsWith("-lui")) {
        iRight = sVerb.lastIndexOf("-");
        sSuffix = sVerb.slice(iRight) + sSuffix;
        sVerb = sVerb.slice(0, iRight);
    }
    return [sVerb, sSuffix];
}

function suggVerb (sFlex, sWho, bVC=false, funcSugg2=null, ...args) {
    let sSfx;
    if (bVC) {
        [sFlex, sSfx] = splitVerb(sFlex);
    }
    let aSugg = new Set();
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            // we get the tense
            let aTense = new Set();
            for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
                let m;
                let zVerb = new RegExp (">"+sStem+"/.*?(:(?:Y|I[pqsf]|S[pq]|K|P|Q))", "g");
                while ((m = zVerb.exec(sMorph)) !== null) {
                    // stem must be used in regex to prevent confusion between different verbs (e.g. sauras has 2 stems: savoir and saurer)
                    if (m) {
                        if (m[1] === ":Y" || m[1] == ":Q") {
                            aTense.add(":Ip");
                            aTense.add(":Iq");
                            aTense.add(":Is");
                        } else if (m[1] === ":P") {
                            aTense.add(":Ip");
                        } else {
                            aTense.add(m[1]);
                        }
                    }
                }
            }
            for (let sTense of aTense) {
                if (sWho === ":1ś" && !conj._hasConjWithTags(tTags, sTense, ":1ś")) {
                    sWho = ":1s";
                }
                if (conj._hasConjWithTags(tTags, sTense, sWho)) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, sTense, sWho));
                }
            }
        }
    }
    if (funcSugg2) {
        let sSugg2 = (args.length > 0) ? funcSugg2(...args) : funcSugg2(sFlex);
        if (sSugg2.length > 0) {
            aSugg.add(sSugg2);
        }
    }
    if (aSugg.size > 0) {
        if (bVC) {
            return Array.from(aSugg).map((sSugg) => joinVerbAndSuffix(sSugg, sSfx)).join("|");
        }
        return Array.from(aSugg).join("|");
    }
    return "";
}

function joinVerbAndSuffix (sFlex, sSfx) {
    if (/^-t-/i.test(sSfx) && /[td]$/i.test(sFlex)) {
        return sFlex + sSfx.slice(2);
    }
    if (/[eac]$/i.test(sFlex)) {
        if (/^-(?:en|y)$/i.test(sSfx)) {
            return sFlex + "s" + sSfx;
        }
        if (/^-(?:ie?l|elle|on)$/i.test(sSfx)) {
            return sFlex + "-t" + sSfx;
        }
    }
    return sFlex + sSfx;
}

function suggVerbPpas (sFlex, sWhat=null) {
    let aSugg = new Set();
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            if (!sWhat) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:p"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:s"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:p"));
                aSugg.delete("");
            } else if (sWhat === ":m:s") {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
            } else if (sWhat === ":m:p") {
                if (conj._hasConjWithTags(tTags, ":Q", ":m:p")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:p"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
                }
            } else if (sWhat === ":f:s") {
                if (conj._hasConjWithTags(tTags, ":Q", ":f:s")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:s"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
                }
            } else if (sWhat === ":f:p") {
                if (conj._hasConjWithTags(tTags, ":Q", ":f:p")) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:p"));
                } else {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
                }
            } else if (sWhat === ":s") {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:s"));
                aSugg.delete("");
            } else if (sWhat === ":p") {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:p"));
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":f:p"));
                aSugg.delete("");
            } else {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":Q", ":m:s"));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbTense (sFlex, sTense, sWho) {
    let aSugg = new Set();
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        if (conj.hasConj(sStem, sTense, sWho)) {
            aSugg.add(conj.getConj(sStem, sTense, sWho));
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbFrom (sStem, sFlex, sWho="") {
    "conjugate <sStem> according to <sFlex> (and eventually <sWho>)"
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        let lTenses = [ ...sMorph.matchAll(/:(?:Y|I[pqsf]|S[pq]|K|P)/g) ];
        if (sWho) {
            for (let [sTense, ] of lTenses) {
                if (conj.hasConj(sStem, sTense, sWho)) {
                    aSugg.add(conj.getConj(sStem, sTense, sWho));
                }
            }
        }
        else {
            for (let [sTense, ] of lTenses) {
                for (let [sWho2, ] of [ ...sMorph.matchAll(/:(?:[123][sp]|P|Y)/g) ]) {
                    if (conj.hasConj(sStem, sTense, sWho2)) {
                        aSugg.add(conj.getConj(sStem, sTense, sWho2));
                    }
                }
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}


function suggVerbImpe (sFlex, bVC=false) {
    let sSfx;
    if (bVC) {
        [sFlex, sSfx] = splitVerb(sFlex);
    }
    let aSugg = new Set();
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            if (conj._hasConjWithTags(tTags, ":E", ":2s")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":2s"));
            }
            if (conj._hasConjWithTags(tTags, ":E", ":1p")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":1p"));
            }
            if (conj._hasConjWithTags(tTags, ":E", ":2p")) {
                aSugg.add(conj._getConjWithTags(sStem, tTags, ":E", ":2p"));
            }
        }
    }
    if (aSugg.size > 0) {
        if (bVC) {
            return Array.from(aSugg).map((sSugg) => joinVerbAndSuffix(sSugg, sSfx)).join("|");
        }
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggVerbInfi (sFlex) {
    return window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex).filter(sStem => conj.isVerb(sStem)).join("|");
}


const _dQuiEst = new Map ([
    ["je", ":1s"], ["j’", ":1s"], ["tu", ":2s"], ["il", ":3s"], ["on", ":3s"], ["elle", ":3s"], ["iel", ":3s"],
    ["nous", ":1p"], ["vous", ":2p"], ["ils", ":3p"], ["elles", ":3p"], ["iels", ":3p"]
]);

const _dModeSugg = new Map([ ["es", "aies"], ["aies", "es"], ["est", "ait"], ["ait", "est"] ]);

function suggVerbMode (sFlex, cMode, sSuj) {
    let lMode;
    if (cMode == ":I") {
        lMode = [":Ip", ":Iq", ":Is", ":If"];
    } else if (cMode == ":S") {
        lMode = [":Sp", ":Sq"];
    } else if (cMode.startsWith(":I") || cMode.startsWith(":S")) {
        lMode = [cMode];
    } else {
        return "";
    }
    let sWho = _dQuiEst.gl_get(sSuj.toLowerCase(), sSuj);
    let aSugg = new Set();
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        let tTags = conj._getTags(sStem);
        if (tTags) {
            for (let sTense of lMode) {
                if (conj._hasConjWithTags(tTags, sTense, sWho)) {
                    aSugg.add(conj._getConjWithTags(sStem, tTags, sTense, sWho));
                }
            }
        }
    }
    if (_dModeSugg.has(sFlex)) {
        aSugg.add(_dModeSugg.get(sFlex));
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

//// Nouns and adjectives

function suggPlur (sFlex, bSelfSugg=false) {
    // returns plural forms assuming sFlex is singular
    let aSugg = new Set();
    if (sFlex.endsWith("l")) {
        if (sFlex.endsWith("al") && sFlex.length > 2 && window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-1)+"ux")) {
            aSugg.add(sFlex.slice(0,-1)+"ux");
        }
        if (sFlex.endsWith("ail") && sFlex.length > 3 && window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"ux")) {
            aSugg.add(sFlex.slice(0,-2)+"ux");
        }
    }
    if (sFlex.endsWith("L")) {
        if (sFlex.endsWith("AL") && sFlex.length > 2 && window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-1)+"UX")) {
            aSugg.add(sFlex.slice(0,-1)+"UX");
        }
        if (sFlex.endsWith("AIL") && sFlex.length > 3 && window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"UX")) {
            aSugg.add(sFlex.slice(0,-2)+"UX");
        }
    }
    if (sFlex.slice(-1).gl_isLowerCase()) {
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex+"s")) {
            aSugg.add(sFlex+"s");
        }
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex+"x")) {
            aSugg.add(sFlex+"x");
        }
    } else {
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex+"S")) {
            aSugg.add(sFlex+"S");
        }
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex+"X")) {
            aSugg.add(sFlex+"X");
        }
    }
    if (mfsp.hasMiscPlural(sFlex)) {
        mfsp.getMiscPlural(sFlex).forEach(function(x) { aSugg.add(x); });
    }
    if (aSugg.size == 0 && bSelfSugg && (sFlex.endsWith("s") || sFlex.endsWith("x") || sFlex.endsWith("S") || sFlex.endsWith("X"))) {
        aSugg.add(sFlex);
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggSing (sFlex, bSelfSugg=true) {
    // returns singular forms assuming sFlex is plural
    let aSugg = new Set();
    if (sFlex.endsWith("ux")) {
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"l")) {
            aSugg.add(sFlex.slice(0,-2)+"l");
        }
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"il")) {
            aSugg.add(sFlex.slice(0,-2)+"il");
        }
    }
    if (sFlex.endsWith("UX")) {
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"L")) {
            aSugg.add(sFlex.slice(0,-2)+"L");
        }
        if (window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-2)+"IL")) {
            aSugg.add(sFlex.slice(0,-2)+"IL");
        }
    }
    if ((sFlex.endsWith("s") || sFlex.endsWith("x") || sFlex.endsWith("S") || sFlex.endsWith("X")) && window.grammalecte.gc_engine.oSpellChecker.isValid(sFlex.slice(0,-1))) {
        aSugg.add(sFlex.slice(0,-1));
    }
    if (bSelfSugg && aSugg.size == 0) {
        aSugg.add(sFlex);
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggMasSing (sFlex, bSuggSimil=false) {
    // returns masculine singular forms
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":m") || sMorph.includes(":e")) {
                aSugg.add(suggSing(sFlex));
            } else {
                let sStem = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
                if (mfsp.isMasForm(sStem)) {
                    aSugg.add(sStem);
                }
            }
        } else {
            // a verb
            let sVerb = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":Q", ":m:s") && conj.hasConj(sVerb, ":Q", ":f:s")) {
                // We also check if the verb has a feminine form.
                // If not, we consider it’s better to not suggest the masculine one, as it can be considered invariable.
                aSugg.add(conj.getConj(sVerb, ":Q", ":m:s"));
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":m:[si]")) {
            aSugg.add(e);
        }
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggMasPlur (sFlex, bSuggSimil=false) {
    // returns masculine plural forms
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":m") || sMorph.includes(":e")) {
                aSugg.add(suggPlur(sFlex));
            } else {
                let sStem = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
                if (mfsp.isMasForm(sStem)) {
                    aSugg.add(suggPlur(sStem, true));
                }
            }
        } else {
            // a verb
            let sVerb = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":Q", ":m:p")) {
                aSugg.add(conj.getConj(sVerb, ":Q", ":m:p"));
            } else if (conj.hasConj(sVerb, ":Q", ":m:s")) {
                let sSugg = conj.getConj(sVerb, ":Q", ":m:s");
                // it is necessary to filter these flexions, like “succédé” or “agi” that are not masculine plural
                if (sSugg.endsWith("s")) {
                    aSugg.add(sSugg);
                }
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":m:[pi]")) {
            aSugg.add(e);
        }
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}


function suggFemSing (sFlex, bSuggSimil=false) {
    // returns feminine singular forms
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":f") || sMorph.includes(":e")) {
                aSugg.add(suggSing(sFlex));
            } else {
                let sStem = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
                if (mfsp.isMasForm(sStem)) {
                    mfsp.getFemForm(sStem, false).forEach(function(x) { aSugg.add(x); });
                }
            }
        } else {
            // a verb
            let sVerb = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":Q", ":f:s")) {
                aSugg.add(conj.getConj(sVerb, ":Q", ":f:s"));
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":f:[si]")) {
            aSugg.add(e);
        }
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggFemPlur (sFlex, bSuggSimil=false) {
    // returns feminine plural forms
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        if (!sMorph.includes(":V")) {
            // not a verb
            if (sMorph.includes(":f") || sMorph.includes(":e")) {
                aSugg.add(suggPlur(sFlex));
            } else {
                let sStem = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
                if (mfsp.isMasForm(sStem)) {
                    mfsp.getFemForm(sStem, true).forEach(function(x) { aSugg.add(x); });
                }
            }
        } else {
            // a verb
            let sVerb = window.grammalecte["cregex"].getLemmaOfMorph(sMorph);
            if (conj.hasConj(sVerb, ":Q", ":f:p")) {
                aSugg.add(conj.getConj(sVerb, ":Q", ":f:p"));
            }
        }
    }
    if (bSuggSimil) {
        for (let e of phonet.selectSimil(sFlex, ":f:[pi]")) {
            aSugg.add(e);
        }
    }
    aSugg.delete("");
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggAgree (sFlexDst, sFlexSrc) {
    // returns suggestions for <sFlexDst> that matches agreement with <sFlexSrc>
    let lMorphSrc = window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlexSrc);
    if (lMorphSrc.length === 0) {
        return "";
    }
    let [sGender, sNumber] = window.grammalecte["cregex"].getGenderNumber(lMorphSrc);
    if (sGender == ":m") {
        if (sNumber == ":s") {
            return suggMasSing(sFlexDst);
        }
        else if (sNumber == ":p") {
            return suggMasPlur(sFlexDst);
        }
        return suggMasSing(sFlexDst);
    }
    else if (sGender == ":f") {
        if (sNumber == ":s") {
            return suggFemSing(sFlexDst);
        }
        else if (sNumber == ":p") {
            return suggFemPlur(sFlexDst);
        }
        return suggFemSing(sFlexDst);
    }
    else if (sGender == ":e") {
        if (sNumber == ":s") {
            return suggSing(sFlexDst);
        }
        else if (sNumber == ":p") {
            return suggPlur(sFlexDst);
        }
        return sFlexDst;
    }
    return "";
}

function g_suggAgree (oTokenDst, oTokenSrc) {
    // returns suggestions for <oTokenDst> that matches agreement with <oTokenSrc>
    let lMorphSrc = oTokenSrc.hasOwnProperty("lMorph") ? oTokenSrc["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oTokenSrc["sValue"]);
    if (lMorphSrc.length === 0) {
        return "";
    }
    let [sGender, sNumber] = window.grammalecte["cregex"].getGenderNumber(lMorphSrc);
    if (sGender == ":m") {
        if (sNumber == ":s") {
            return suggMasSing(oTokenDst["sValue"]);
        }
        else if (sNumber == ":p") {
            return suggMasPlur(oTokenDst["sValue"]);
        }
        return suggMasSing(oTokenDst["sValue"]);
    }
    else if (sGender == ":f") {
        if (sNumber == ":s") {
            return suggFemSing(oTokenDst["sValue"]);
        }
        else if (sNumber == ":p") {
            return suggFemPlur(oTokenDst["sValue"]);
        }
        return suggFemSing(oTokenDst["sValue"]);
    }
    else if (sGender == ":e") {
        if (sNumber == ":s") {
            return suggSing(oTokenDst["sValue"]);
        }
        else if (sNumber == ":p") {
            return suggPlur(oTokenDst["sValue"]);
        }
        return oTokenDst["sValue"];
    }
    return "";
}

function hasFemForm (sFlex) {
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        if (mfsp.isMasForm(sStem) || conj.hasConj(sStem, ":Q", ":f:s")) {
            return true;
        }
    }
    if (phonet.hasSimil(sFlex, ":f")) {
        return true;
    }
    return false;
}

function hasMasForm (sFlex) {
    for (let sStem of window.grammalecte.gc_engine.oSpellChecker.getLemma(sFlex)) {
        if (mfsp.isMasForm(sStem) || conj.hasConj(sStem, ":Q", ":m:s")) {
            // what has a feminine form also has a masculine form
            return true;
        }
    }
    if (phonet.hasSimil(sFlex, ":m")) {
        return true;
    }
    return false;
}

function switchGender (sFlex, bPlur=null) {
    let aSugg = new Set();
    if (bPlur === null) {
        for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
            if (sMorph.includes(":f")) {
                if (sMorph.includes(":s")) {
                    aSugg.add(suggMasSing(sFlex));
                } else if (sMorph.includes(":p")) {
                    aSugg.add(suggMasPlur(sFlex));
                } else {
                    aSugg.add(suggMasSing(sFlex));
                    aSugg.add(suggMasPlur(sFlex));
                }
            } else if (sMorph.includes(":m")) {
                if (sMorph.includes(":s")) {
                    aSugg.add(suggFemSing(sFlex));
                } else if (sMorph.includes(":p")) {
                    aSugg.add(suggFemPlur(sFlex));
                } else {
                    aSugg.add(suggFemSing(sFlex));
                    aSugg.add(suggFemPlur(sFlex));
                }
            }
        }
    } else if (bPlur) {
        for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
            if (sMorph.includes(":f")) {
                aSugg.add(suggMasPlur(sFlex));
            } else if (sMorph.includes(":m")) {
                aSugg.add(suggFemPlur(sFlex));
            }
        }
    } else {
        for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
            if (sMorph.includes(":f")) {
                aSugg.add(suggMasSing(sFlex));
            } else if (sMorph.includes(":m")) {
                aSugg.add(suggFemSing(sFlex));
            }
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function switchPlural (sFlex) {
    let aSugg = new Set();
    for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sFlex)) {
        if (sMorph.includes(":s")) {
            aSugg.add(suggPlur(sFlex));
        } else if (sMorph.includes(":p")) {
            aSugg.add(suggSing(sFlex));
        }
    }
    if (aSugg.size > 0) {
        return Array.from(aSugg).join("|");
    }
    return "";
}

function hasSimil (sWord, sPattern=null) {
    return phonet.hasSimil(sWord, sPattern);
}

function suggSimil (sWord, sPattern=null, bSubst=false, bVC=false) {
    // return list of words phonetically similar to <sWord> and whom POS is matching <sPattern>
    let sSfx;
    if (bVC) {
        [sWord, sSfx] = splitVerb(sWord);
    }
    let aSugg = phonet.selectSimil(sWord, sPattern);
    if (aSugg.size === 0 && bSubst) {
        for (let sMorph of window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord)) {
            if (sMorph.includes(":V")) {
                let sInfi = sMorph.slice(1, sMorph.indexOf("/"));
                if (sPattern) {
                    for (let sName of conj.getNamesFrom(sInfi)) {
                        if (_oSpellChecker.getMorph(sName).some(sMorph => (sMorph.search(sPattern) !== -1))) {
                            aSugg.add(sName);
                        }
                    }
                }
                else {
                    conj.getNamesFrom(sInfi).forEach(sName => aSugg.add(sName));
                }
                break;
            }
        }
    }
    if (aSugg.size > 0) {
        if (bVC) {
            return Array.from(aSugg).map((sSugg) => joinVerbAndSuffix(sSugg, sSfx)).join("|");
        }
        return Array.from(aSugg).join("|");
    }
    return "";
}

function suggCeOrCet (sWord) {
    if (/^[aeéèêiouyâîï]/i.test(sWord)) {
        return "cet";
    }
    if (sWord[0] == "h" || sWord[0] == "H") {
        return "ce|cet";
    }
    return "ce";
}

function suggLesLa (sWord) {
    if (window.grammalecte.gc_engine.oSpellChecker.getMorph(sWord).some(s  =>  s.includes(":p"))) {
        return "les|la";
    }
    return "la";
}

function formatNumber (sNumber, bOnlySimpleFormat=false) {
    let nLen = sNumber.length;
    if (nLen < 4 ) {
        return sNumber;
    }
    let sRes = "";
    if (!sNumber.includes(",")) {
        // Nombre entier
        sRes = _formatNumber(sNumber, 3);
        if (!bOnlySimpleFormat) {
            // binaire
            if (/^[01]+$/.test(sNumber)) {
                sRes += "|" + _formatNumber(sNumber, 4);
            }
            // numéros de téléphone
            if (nLen == 10) {
                if (sNumber.startsWith("0")) {
                    sRes += "|" + _formatNumber(sNumber, 2);                                                                           // téléphone français
                    if (sNumber[1] == "4" && (sNumber[2]=="7" || sNumber[2]=="8" || sNumber[2]=="9")) {
                        sRes += "|" + sNumber.slice(0,4) + " " + sNumber.slice(4,6) + " " + sNumber.slice(6,8) + " " + sNumber.slice(8); // mobile belge
                    }
                    sRes += "|" + sNumber.slice(0,3) + " " + sNumber.slice(3,6) + " " + sNumber.slice(6,8) + " " + sNumber.slice(8);     // téléphone suisse
                }
                sRes += "|" + sNumber.slice(0,4) + " " + sNumber.slice(4,7) + "-" + sNumber.slice(7);                                   // téléphone canadien ou américain
            } else if (nLen == 9 && sNumber.startsWith("0")) {
                sRes += "|" + sNumber.slice(0,3) + " " + sNumber.slice(3,5) + " " + sNumber.slice(5,7) + " " + sNumber.slice(7,9);       // fixe belge 1
                sRes += "|" + sNumber.slice(0,2) + " " + sNumber.slice(2,5) + " " + sNumber.slice(5,7) + " " + sNumber.slice(7,9);       // fixe belge 2
            }
        }
    } else {
        // Nombre réel
        let [sInt, sFloat] = sNumber.split(",", 2);
        sRes = _formatNumber(sInt, 3) + "," + sFloat;
    }
    return sRes;
}

function _formatNumber (sNumber, nGroup=3) {
    let sRes = "";
    let nEnd = sNumber.length;
    while (nEnd > 0) {
        let nStart = Math.max(nEnd-nGroup, 0);
        sRes = sRes ? sNumber.slice(nStart, nEnd) + " " + sRes : sRes = sNumber.slice(nStart, nEnd);
        nEnd = nEnd - nGroup;
    }
    return sRes;
}

function formatNF (s) {
    try {
        let m = /NF[  -]?(C|E|P|Q|S|X|Z|EN(?:[  -]ISO|))[  -]?([0-9]+(?:[\/‑-][0-9]+|))/i.exec(s);
        if (!m) {
            return "";
        }
        return "NF " + m[1].toUpperCase().replace(/ /g, " ").replace(/-/g, " ") + " " + m[2].replace(/\//g, "‑").replace(/-/g, "‑");
    }
    catch (e) {
        console.error(e);
        return "# erreur #";
    }
}

function undoLigature (c) {
    if (c == "ﬁ") {
        return "fi";
    } else if (c == "ﬂ") {
        return "fl";
    } else if (c == "ﬀ") {
        return "ff";
    } else if (c == "ﬃ") {
        return "ffi";
    } else if (c == "ﬄ") {
        return "ffl";
    } else if (c == "ﬅ") {
        return "ft";
    } else if (c == "ﬆ") {
        return "st";
    }
    return "_";
}


const _dNormalizedCharsForInclusiveWriting = new Map([
    ['(', '·'],  [')', '·'],
    ['.', '·'],  ['·', '·'],  ['•', '·'],
    ['–', '·'],  ['—', '·'],
    ['/', '·']
]);

function normalizeInclusiveWriting (sToken) {
    let sRes = "";
    for (let c of sToken) {
        if (_dNormalizedCharsForInclusiveWriting.has(c)) {
            sRes += _dNormalizedCharsForInclusiveWriting.get(c);
        } else {
            sRes += c;
        }
    }
    sRes = sRes.replace("èr·", "er·").replace("ÈR·", "ER·");
    return sRes;
}



// generated code, do not edit
window.grammalecte["gc_functions"] = {

    load: function (sContext, oSpellChecker) {
        _sAppContext = sContext
        _oSpellChecker = oSpellChecker
    },

    // callables for regex rules
    _c_esp_avant_après_tiret_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! m[1].endsWith("-t") && m[3] != "t" && ! (m[2] == " -" && m[3].gl_isDigit());
    },
    _c_esp_avant_après_tiret_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return (m[3] == "je" && morph(dTokenPos, [m.start[1], m[1]], ":1s")) || (m[3] == "tu" && morph(dTokenPos, [m.start[1], m[1]], ":2s")) || (m[3] == "il" && morph(dTokenPos, [m.start[1], m[1]], ":3s")) || (m[3] == "elle" && morph(dTokenPos, [m.start[1], m[1]], ":3s")) || (m[3] == "on" && morph(dTokenPos, [m.start[1], m[1]], ":3s")) || (m[3] == "nous" && morph(dTokenPos, [m.start[1], m[1]], ":1p")) || (m[3] == "vous" && morph(dTokenPos, [m.start[1], m[1]], ":2P")) || (m[3] == "ils" && morph(dTokenPos, [m.start[1], m[1]], ":3p")) || (m[3] == "elles" && morph(dTokenPos, [m.start[1], m[1]], ":3p"));
    },
    _c_esp_avant_après_tiret_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_typo_parenthèse_fermante_collée_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "\\((?:[rR][eéEÉ]|[qQ][uU]’|[nNmMtTsSdDlL]’)$");
    },
    _p_p_URL2_2: function (sSentence, m) {
        return m[2].gl_toCapitalize();
    },
    _p_p_sigle1_1: function (sSentence, m) {
        return m[1].replace(/\./g, "")+".";
    },
    _c_p_sigle2_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! re.search("(?i)^(?:i\\.e\\.|s\\.[tv]\\.p\\.|e\\.g\\.|a\\.k\\.a\\.|c\\.q\\.f\\.d\\.|b\\.a\\.|n\\.b\\.)$", m[0]);
    },
    _c_p_sigle2_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].length == 4;
    },
    _s_p_sigle2_2: function (sSentence, m) {
        return m[0].replace(/\./g, "").toUpperCase() + "|" + m[0].slice(0,2) + " " + m[0].slice(2,4);
    },
    _c_p_sigle2_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _s_p_sigle2_3: function (sSentence, m) {
        return m[0].replace(/\./g, "").toUpperCase();
    },
    _c_p_sigle2_4: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0] != "b.a.";
    },
    _p_p_sigle2_4: function (sSentence, m) {
        return m[0].replace(/\./g, "-");
    },
    _p_p_sigle3_1: function (sSentence, m) {
        return m[0].replace(/\./g, "").replace(/-/g,"");
    },
    _c_p_prénom_lettre_point_patronyme_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return morph(dTokenPos, [m.start[1], m[1]], ":M[12]") && (morph(dTokenPos, [m.start[3], m[3]], ":(?:M[12]|V)") || ! window.grammalecte.gc_engine.oSpellChecker.isValid(m[3]));
    },
    _c_p_prénom_lettre_point_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return morph(dTokenPos, [m.start[1], m[1]], ":M[12]") && look(sSentence.slice(m.end[0]), "^\\W+[a-zéèêîïâ]");
    },
    _p_p_patronyme_composé_avec_le_la_les_1: function (sSentence, m) {
        return m[0].replace(/ /g, "-");
    },
    _c_typo_apostrophe_incorrecte_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! (m[2].length == 1  &&  m[1].endsWith("′ "));
    },
    _s_typo_apostrophe_manquante_prudence1_1: function (sSentence, m) {
        return m[1].slice(0,-1)+"’";
    },
    _c_typo_apostrophe_manquante_prudence2_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! option("mapos") && (m[2] == "<" || morph(dTokenPos, [m.start[2], m[2]], ":V"));
    },
    _s_typo_apostrophe_manquante_prudence2_1: function (sSentence, m) {
        return m[1].slice(0,-1)+"’";
    },
    _c_typo_apostrophe_manquante_audace1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("mapos") && ! look(sSentence.slice(0,m.index), "(?i)(?:lettre|caractère|glyphe|dimension|variable|fonction|point) *$");
    },
    _s_typo_apostrophe_manquante_audace1_1: function (sSentence, m) {
        return m[1].slice(0,-1)+"’";
    },
    _c_typo_guillemets_typographiques_doubles_ouvrants_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zéïîùàâäôö]$");
    },
    _c_eepi_écriture_épicène_tous_toutes_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi");
    },
    _p_eepi_écriture_épicène_tous_toutes_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_ceux_celles_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi");
    },
    _p_eepi_écriture_épicène_ceux_celles_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_eur_divers_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi") && m[2] != "se";
    },
    _c_eepi_écriture_épicène_pluriel_eur_divers_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi") && m[2] == "se";
    },
    _p_eepi_écriture_épicène_pluriel_eur_divers_3: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_eux_euses_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi");
    },
    _p_eepi_écriture_épicène_pluriel_eux_euses_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_if_ive_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi");
    },
    _p_eepi_écriture_épicène_pluriel_if_ive_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_er_ère_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi") && ! re.search("[eE][rR]·[eE]·[sS]$", m[0]);
    },
    _p_eepi_écriture_épicène_pluriel_er_ère_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_aux_ales_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi");
    },
    _p_eepi_écriture_épicène_pluriel_aux_ales_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_e_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! (m[0].endsWith(".Les") || m[0].endsWith(".Tes")) && morph(dTokenPos, [m.start[1], m[1]], ":[NA]|>quel/");
    },
    _p_eepi_écriture_épicène_pluriel_e_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_e_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi") && ! m[0].endsWith("les") && ! m[0].endsWith("LES") && ! re.search("·[ntlfNTLF]?[eE]·[sS]$", m[0]);
    },
    _c_eepi_écriture_épicène_pluriel_e_4: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[1].endsWith("s") || m[1].endsWith("S");
    },
    _c_eepi_écriture_épicène_pluriel_e_5: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_eepi_écriture_épicène_singulier_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! (m[0].endsWith(".Le") || m[0].endsWith(".Ne") || m[0].endsWith(".De")) && ! ((m[0].endsWith("-le") || m[0].endsWith("-Le") || m[0].endsWith("-LE")) && ! (m[1].endsWith("l") || m[1].endsWith("L")));
    },
    _p_eepi_écriture_épicène_singulier_2: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_eepi_écriture_épicène_singulier_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("eepi") && re.search("^[uU][nN][-–—.•⋅/][eE]$", m[0]);
    },
    _c_eepi_écriture_épicène_singulier_4: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && option("eepi") && ! re.search("(?i)·[ntl]?e$", m[2]);
    },
    _s_eepi_écriture_épicène_singulier_4: function (sSentence, m) {
        return m[1]+"·"+m[2].slice(1).gl_trimRight(")");
    },
    _c_typo_écriture_invariable_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! (m[0].endsWith("/s") && morph(dTokenPos, [m.start[1], m[1]], ";S"));
    },
    _p_typo_écriture_invariable_1: function (sSentence, m) {
        return normalizeInclusiveWriting(m[0]);
    },
    _c_typo_écriture_invariable_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return bCondMemo && option("typo") && option("eepi") && ! m[0].endsWith("·s");
    },
    _c_majuscule_après_point_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! re.search("(?i)^(?:etc|[A-Z]|chap|cf|ex|fig|hab|litt|circ|coll|parag|r[eé]f|étym|suppl|bibl|bibliogr|cit|op|vol|déc|nov|oct|janv|juil|avr|sept|sg|pl|pers)$", m[1]) && morph(dTokenPos, [m.start[1], m[1]], ":") && morph(dTokenPos, [m.start[2], m[2]], ":");
    },
    _s_majuscule_après_point_1: function (sSentence, m) {
        return m[2].gl_toCapitalize();
    },
    _c_majuscule_début_paragraphe_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return look(sSentence.slice(m.end[0]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ][.] +[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]+");
    },
    _s_majuscule_début_paragraphe_1: function (sSentence, m) {
        return m[1].gl_toCapitalize();
    },
    _c_poncfin_règle1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]+(?:[.]|[   ][!?]) +(?:[A-ZÉÈÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]+|[ÀÔ])") || (m[1].gl_isTitle() && look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]+(?:[.]|[   ][!?]) +$"));
    },
    _c_typo_espace_manquant_après1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! m[1].gl_isDigit();
    },
    _c_typo_espace_manquant_après3_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return (m[1].length > 1 && ! m[1].slice(0,1).gl_isDigit() && window.grammalecte.gc_engine.oSpellChecker.isValid(m[1])) || look(sSentence.slice(m.end[0]), "^’");
    },
    _c_typo_espace_manquant_après4_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[1].slice(0,1).gl_isUpperCase() || m[1].length > 5 || ! m[1].gl_isAlpha() || (m[1].length > 1 && window.grammalecte.gc_engine.oSpellChecker.isValid(m[1]));
    },
    _s_typo_point_après_titre_1: function (sSentence, m) {
        return m[1].slice(0,-1);
    },
    _c_typo_point_après_numéro_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[1].slice(1,3) == "os";
    },
    _c_typo_point_après_numéro_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_typo_points_suspension1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "(?i)etc$");
    },
    _s_typo_points_suspension2_1: function (sSentence, m) {
        return m[0].replace(/\.\.\./g, "…").gl_trimRight(".");
    },
    _s_typo_virgules_points_1: function (sSentence, m) {
        return m[0].replace(/,/g, ".").replace(/\.\.\./g, "…");
    },
    _s_typo_ponctuation_superflue1_1: function (sSentence, m) {
        return ",|" + m[1];
    },
    _s_typo_ponctuation_superflue2_1: function (sSentence, m) {
        return ";|" + m[1];
    },
    _s_typo_ponctuation_superflue3_1: function (sSentence, m) {
        return ":|" + m[0].slice(1,2);
    },
    _s_typo_ponctuation_superflue4_1: function (sSentence, m) {
        return m[0].slice(0,1);
    },
    _c_nbsp_ajout_avant_double_ponctuation_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return sCountry != "CA";
    },
    _s_nbsp_ajout_avant_double_ponctuation_1: function (sSentence, m) {
        return " "+m[0];
    },
    _c_unit_nbsp_avant_unités1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("num");
    },
    _s_unit_nbsp_avant_unités1_1: function (sSentence, m) {
        return formatNumber(m[2], true) + " " + m[3];
    },
    _c_unit_nbsp_avant_unités1_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_unit_nbsp_avant_unités2_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return morph(dTokenPos, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]) || ! window.grammalecte.gc_engine.oSpellChecker.isValid(m[3]);
    },
    _c_unit_nbsp_avant_unités2_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("num");
    },
    _s_unit_nbsp_avant_unités2_2: function (sSentence, m) {
        return formatNumber(m[2], true) + " " + m[3];
    },
    _c_unit_nbsp_avant_unités2_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_unit_nbsp_avant_unités3_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return (m[2].length > 4 && ! window.grammalecte.gc_engine.oSpellChecker.isValid(m[3])) || morph(dTokenPos, [m.start[3], m[3]], ";S", ":[VCR]") || mbUnit(m[3]);
    },
    _c_unit_nbsp_avant_unités3_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("num");
    },
    _s_unit_nbsp_avant_unités3_2: function (sSentence, m) {
        return formatNumber(m[2], true) + " " + m[3];
    },
    _c_unit_nbsp_avant_unités3_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _s_typo_math_1: function (sSentence, m) {
        return m[0].replace(/ /g, "(")+")|"+m[0].replace(/ /g, " ");
    },
    _c_typo_signe_moins_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]$");
    },
    _c_typo_signe_multiplication_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! m[0].startsWith("0x");
    },
    _s_ligatures_typographiques_1: function (sSentence, m) {
        return undoLigature(m[0]);
    },
    _c_nf_norme_française_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! re.search("^NF (?:C|E|P|Q|S|X|Z|EN(?: ISO|)) [0-9]+(?:‑[0-9]+|)", m[0]);
    },
    _s_nf_norme_française_1: function (sSentence, m) {
        return formatNF(m[0]);
    },
    _c_typo_cohérence_guillemets_chevrons_ouvrants_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]$");
    },
    _c_typo_cohérence_guillemets_chevrons_ouvrants_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(m.end[0]), "^[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]");
    },
    _c_typo_cohérence_guillemets_chevrons_fermants_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]$");
    },
    _c_typo_cohérence_guillemets_chevrons_fermants_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(m.end[0]), "^[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]");
    },
    _c_typo_cohérence_guillemets_doubles_ouvrants_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! ( look(sSentence.slice(m.end[0]), "^”") && re.search("“(?:l|d|c|ç|n|m|t|s|j|z|[A-ZÇ]|qu|jusqu|puisqu|lorsqu|quoiqu|quelqu)’", m[0]) );
    },
    _c_typo_cohérence_guillemets_doubles_ouvrants_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]$");
    },
    _c_typo_cohérence_guillemets_doubles_ouvrants_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return bCondMemo;
    },
    _c_typo_cohérence_guillemets_doubles_fermants_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]$");
    },
    _c_typo_cohérence_guillemets_doubles_fermants_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(m.end[0]), "^[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]");
    },
    _c_typo_guillemet_simple_ouvrant_non_fermé_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return look(sSentence.slice(0,m.index), " $") || look(sSentence.slice(0,m.index), "^ *$|, *$");
    },
    _c_typo_guillemet_simple_fermant_non_ouvert_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return look(sSentence.slice(m.end[0]), "^ ") || look(sSentence.slice(m.end[0]), "^ *$|^,");
    },
    _c_num_grand_nombre_soudé_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! look(sSentence.slice(0,m.index), "NF[  -]?(C|E|P|Q|X|Z|EN(?:[  -]ISO|)) *$");
    },
    _c_num_grand_nombre_soudé_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return (look(sSentence.slice(m.end[0]), "^(?:,[0-9]+[⁰¹²³⁴⁵⁶⁷⁸⁹]?|[⁰¹²³⁴⁵⁶⁷⁸⁹])") && ! (re.search("^[01]+$", m[0]) && look(sSentence.slice(m.end[0]), "^,[01]+\\b"))) || look(sSentence.slice(m.end[0]), "^[    ]*(?:[kcmµn]?(?:[slgJKΩ]|m[²³]?|Wh?|Hz|dB)|[%‰€$£¥Åℓhj]|min|°C|℃)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ’'])");
    },
    _s_num_grand_nombre_soudé_2: function (sSentence, m) {
        return formatNumber(m[0], true);
    },
    _c_num_grand_nombre_soudé_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && m[0].length > 4;
    },
    _s_num_grand_nombre_soudé_3: function (sSentence, m) {
        return formatNumber(m[0]);
    },
    _c_num_nombre_quatre_chiffres_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return (morph(dTokenPos, [m.start[2], m[2]], ";S", ":[VCR]") || mbUnit(m[2]));
    },
    _s_num_nombre_quatre_chiffres_1: function (sSentence, m) {
        return formatNumber(m[1], true);
    },
    _c_num_grand_nombre_avec_points_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("num");
    },
    _s_num_grand_nombre_avec_points_1: function (sSentence, m) {
        return m[0].replace(/\./g, " ");
    },
    _p_num_grand_nombre_avec_points_2: function (sSentence, m) {
        return m[0].replace(/\./g, "_");
    },
    _c_num_grand_nombre_avec_espaces_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return option("num");
    },
    _s_num_grand_nombre_avec_espaces_1: function (sSentence, m) {
        return m[0].replace(/ /g, " ");
    },
    _p_num_grand_nombre_avec_espaces_2: function (sSentence, m) {
        return m[0].replace(/ /g, "_");
    },
    _c_date_nombres_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[2] == m[4] && ! checkDate(m[1], m[3], m[5]) && ! look(sSentence.slice(0,m.index), "(?i)\\b(?:version|article|référence)s? +$");
    },
    _c_redondances_paragraphe_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! morph(dTokenPos, [m.start[1], m[1]], ":(?:G|V0)|>(?:t(?:antôt|emps|rès)|loin|souvent|parfois|quelquefois|côte|petit|même)/") && ! m[1][0].gl_isUpperCase();
    },
    _c_redondances_paragraphe_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return bCondMemo;
    },
    _c_ocr_point_interrogation_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return look(sSentence0.slice(m.end[0]), "^(?: +[A-ZÉÈÂ(]|…|[.][.]+| *$)");
    },
    _c_ocr_exclamation2_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! morph(dTokenPos, nextword1(sSentence, m.end[0]), ";S") && ! morph(dTokenPos, prevword1(sSentence, m.index), ":R");
    },
    _c_ocr_nombres_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0] == "II";
    },
    _c_ocr_nombres_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && ! m[0].gl_isDigit();
    },
    _s_ocr_nombres_2: function (sSentence, m) {
        return m[0].replace(/O/g, "0").replace(/I/g, "1");
    },
    _s_ocr_casse_pronom_vconj_1: function (sSentence, m) {
        return m[1].toLowerCase();
    },
    _c_mots_composés_inconnus_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! window.grammalecte.gc_engine.oSpellChecker.isValid(m[0]) && ! re.search("(?i)-(?:je|tu|on|nous|vous|ie?ls?|elles?|ce|là|ci|les?|la|leur|une?s|moi|toi|en|y)$", m[0]);
    },
    _c_ocr_caractères_rares_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0] != "<" && m[0] != ">";
    },
    _c_ocr_le_la_les_regex_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].endsWith("e");
    },
    _c_ocr_le_la_les_regex_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && m[0].endsWith("a");
    },
    _c_ocr_le_la_les_regex_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && m[0].endsWith("à");
    },
    _c_ocr_le_la_les_regex_4: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _c_conf_1e_1a_1es_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].endsWith("e") && (morph(dTokenPos, nextword1(sSentence, m.end[0]), ":(?:[NA].*:[me]:[si]|V)", ":G") || morph(dTokenPos, prevword1(sSentence, m.index), ">ne/"));
    },
    _c_conf_1e_1a_1es_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].endsWith("a") && (morph(dTokenPos, nextword1(sSentence, m.end[0]), ":(?:[NA].*:[fe]:[si]|V)", ":G") || morph(dTokenPos, prevword1(sSentence, m.index), ">ne/"));
    },
    _c_conf_1e_1a_1es_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].endsWith("es") && (morph(dTokenPos, nextword1(sSentence, m.end[0]), ":(?:[NA].*:[pi]|V)", ":G") || morph(dTokenPos, prevword1(sSentence, m.index), ">ne/"));
    },
    _c_ocr_il_regex_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[0].endsWith("s");
    },
    _c_ocr_il_regex_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo;
    },
    _p_p_trait_union_conditionnel1_1: function (sSentence, m) {
        return m[0].replace(/‑/g, "");
    },
    _p_p_trait_union_conditionnel2_1: function (sSentence, m) {
        return m[0].replace(/‑/g, "");
    },
    _c_doublon_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! re.search("(?i)^([nv]ous|faire|en|la|lui|donnant|œuvre|h[éoa]|hou|olé|joli|Bora|couvent|dément|sapiens|très|vroum|[0-9]+)$", m[1]) && ! (re.search("^(?:est|une?)$", m[1]) && look(sSentence.slice(0,m.index), "[’']$")) && ! (m[1] == "mieux" && look(sSentence.slice(0,m.index), "(?i)qui +$"));
    },
    _c_num_lettre_O_zéro1_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! option("ocr");
    },
    _s_num_lettre_O_zéro1_1: function (sSentence, m) {
        return m[0].replace(/O/g, "0");
    },
    _c_num_lettre_O_zéro2_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! option("ocr");
    },
    _s_num_lettre_O_zéro2_1: function (sSentence, m) {
        return m[0].replace(/O/g, "0");
    },
    _c_p_références_aux_notes_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! morph(dTokenPos, [m.start[0], m[0]], ":") && morph(dTokenPos, [m.start[1], m[1]], ":");
    },
    _c_tu_trait_union_douteux_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return window.grammalecte.gc_engine.oSpellChecker.isValid(m[1]+"-"+m[2]) && analyse(m[1]+"-"+m[2], ":");
    },
    _c_tu_t_euphonique_incorrect_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return re.search("(?i)^(?:ie?ls|elles|tu)$", m[2]);
    },
    _c_tu_t_euphonique_incorrect_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && m[1] != "-t-" && m[1] != "-T-";
    },
    _c_tu_t_euphonique_incorrect_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[1] != "-t-";
    },
    _c_tu_t_euphonique_superflu_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return m[1] != "-t-";
    },
    _c_redondances_phrase_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! morph(dTokenPos, [m.start[1], m[1]], ":(?:G|V0)|>même/");
    },
    _c_redondances_phrase_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return bCondMemo;
    },
    _c_mc_mot_composé_1: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! m[1].gl_isDigit() && ! m[2].gl_isDigit() && ! morph(dTokenPos, [m.start[2], m[2]], ">là|:G") && ! morph(dTokenPos, [m.start[0], m[0]], ":");
    },
    _c_mc_mot_composé_2: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return window.grammalecte.gc_engine.oSpellChecker.isValid(m[1]+m[2]);
    },
    _c_mc_mot_composé_3: function (sSentence, sSentence0, m, dTokenPos, sCountry, bCondMemo) {
        return ! bCondMemo && ! re.search("(?i)^(?:ex|mi|quasi|semi|non|demi|pro|anti|multi|pseudo|proto|extra)$", m[1]);
    },


    // callables for graph rules
    _g_cond_g0_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 1) && g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 1);
    },
    _g_cond_g0_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 1);
    },
    _g_cond_g0_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 1);
    },
    _g_cond_g0_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0);
    },
    _g_cond_g0_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0);
    },
    _g_cond_g0_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0);
    },
    _g_cond_g0_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset], lToken[nTokenOffset+1], 1) && g_space(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], 0, 0);
    },
    _g_cond_g0_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset], lToken[nTokenOffset+1], 1, 3) && g_space(lToken[nLastToken-1+1], lToken[nLastToken-1+2], 1, 3);
    },
    _g_cond_g0_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":G");
    },
    _g_cond_g0_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_cond_g0_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":[DR]");
    },
    _g_cond_g0_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":D.*:[me]:[si]");
    },
    _g_cond_g0_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":[VG]");
    },
    _g_cond_g0_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0) && ! g_value(lToken[nTokenOffset+1], "|etc|fig|hab|litt|fig|hab|litt|circ|coll|ref|réf|étym|suppl|bibl|bibliogr|cit|vol|déc|nov|oct|janv|juil|avr|sept|pp|") && lToken[nTokenOffset+1]["sValue"].length > 1 && ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase();
    },
    _g_cond_g0_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|appeler|") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_comme_");
    },
    _g_cond_g0_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ">appeler/|:[NA]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_comme_");
    },
    _g_cond_g0_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[NAQ]", ":G");
    },
    _g_da_g0_1: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":N:A:Q:e:p");
    },
    _g_cond_g0_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|·|");
    },
    _g_da_g0_2: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":N:A:Q:e:s");
    },
    _g_cond_g0_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|·|");
    },
    _g_cond_g0_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-2+1]["sValue"].length == 1;
    },
    _g_cond_g0_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-2+1]["sValue"].length == 1 && lToken[nLastToken-6+1]["sValue"].length == 1;
    },
    _g_da_g0_3: function (lToken, nTokenOffset, nLastToken) {
        return g_definefrom(lToken[nTokenOffset+1], 0, -3) && g_select(lToken[nTokenOffset+1], ":[NA]");
    },
    _g_cond_g0_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isUpperCase();
    },
    _g_cond_g0_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":1[sśŝ]");
    },
    _g_sugg_g0_1: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":1ś", true);
    },
    _g_cond_g0_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_morphVC(lToken[nTokenOffset+1], ":V");
    },
    _g_sugg_g0_2: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":1[sśŝ]", false, true);
    },
    _g_cond_g0_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|me|m’|");
    },
    _g_cond_g0_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":[ISK].*:2s");
    },
    _g_sugg_g0_3: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":2s", true);
    },
    _g_sugg_g0_4: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":2s", false, true);
    },
    _g_cond_g0_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|te|t’|");
    },
    _g_cond_g0_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":3p", ":3s");
    },
    _g_sugg_g0_5: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":3s", true) + "|" + lToken[nTokenOffset+1]["sValue"]+"s";
    },
    _g_cond_g0_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":V", ":3s");
    },
    _g_sugg_g0_6: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":3s", true);
    },
    _g_cond_g0_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":", ":V|>(?:t|voilà)/");
    },
    _g_sugg_g0_7: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":3s", false, true);
    },
    _g_cond_g0_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|se|s’|");
    },
    _g_cond_g0_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":", ":V|>t/");
    },
    _g_cond_g0_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":3s");
    },
    _g_cond_g0_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":(?:3s|V0e.*:3p)");
    },
    _g_cond_g0_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":", ":V");
    },
    _g_cond_g0_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].endsWith("se");
    },
    _g_sugg_g0_8: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-2)+"ce";
    },
    _g_cond_g0_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":3p");
    },
    _g_sugg_g0_9: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":3p", true);
    },
    _g_sugg_g0_10: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":3p", false, true);
    },
    _g_cond_g0_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! re.search("-[lL](?:es?|a)-[nN]ous$", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g0_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":(?:1p|E:2[sp])");
    },
    _g_sugg_g0_11: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":1p", true)+"|"+suggVerbImpe(lToken[nTokenOffset+1]["sValue"], true);
    },
    _g_cond_g0_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":", ":V|>(?:chez|malgré)/");
    },
    _g_sugg_g0_12: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":1p", false, true);
    },
    _g_cond_g0_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! re.search("-[lL](?:es?|a)-[vV]ous$", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g0_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":2p");
    },
    _g_sugg_g0_13: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":2p", true);
    },
    _g_cond_g0_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":", ":V|>chez/");
    },
    _g_sugg_g0_14: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":2p", false, true);
    },
    _g_da_g0_4: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nLastToken-1+1], ":VCi1:2p");
    },
    _g_cond_g0_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":E");
    },
    _g_sugg_g0_15: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbImpe(lToken[nTokenOffset+1]["sValue"], true);
    },
    _g_sugg_g0_16: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":E", false, true);
    },
    _g_sugg_g0_17: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/-là-/g, "-la-");
    },
    _g_cond_g0_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_value(lToken[nTokenOffset], "|se|ce|cet|cette|ces|") && g_morphVC(lToken[nTokenOffset+1], ":", ":V") && ! g_value(lToken[nTokenOffset+1], "|par-la|de-la|jusque-la|celui-la|celle-la|ceux-la|celles-la|");
    },
    _g_sugg_g0_18: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+1]["sValue"], ":E", false, true)+"|"+lToken[nTokenOffset+1]["sValue"].slice(0,-3)+" là";
    },
    _g_cond_g0_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_value(lToken[nTokenOffset], "|se|ce|cet|cette|ces|") && g_morphVC(lToken[nTokenOffset+1], ":[NA]") && ! g_value(lToken[nTokenOffset+1], "|par-la|de-la|jusque-la|celui-la|celle-la|ceux-la|celles-la|");
    },
    _g_sugg_g0_19: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-2)+"là";
    },
    _g_sugg_g0_20: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1);
    },
    _g_cond_g0_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V1.*:Ip.*:3s");
    },
    _g_sugg_g0_21: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/e-y/g, "es-y").replace(/a-y/g, "as-y");
    },
    _g_cond_g0_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V", ":(?:E|V1.*:Ip.*:2s)");
    },
    _g_cond_g0_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V1.*:Ip.*:3s", ">aller/");
    },
    _g_sugg_g0_22: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/e-en/g, "es-en");
    },
    _g_cond_g1_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":1s");
    },
    _g_da_g1_1: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Ov");
    },
    _g_cond_g1_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2s|V0)");
    },
    _g_cond_g1_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s");
    },
    _g_cond_g1_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)");
    },
    _g_cond_g1_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)");
    },
    _g_cond_g1_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)");
    },
    _g_cond_g1_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p");
    },
    _g_cond_g1_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)");
    },
    _g_cond_g1_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|j’|il|on|elle|nous|vous|ils|elles|iel|iels|ne|n’|me|m’|te|t’|se|s’|") && (g_morph(lToken[nTokenOffset+2], ":[NABWM]", "*") || g_value(lToken[nTokenOffset+2], "|plus|moins|"));
    },
    _g_da_g1_2: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":D");
    },
    _g_cond_g1_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[ISKYPE]", "*");
    },
    _g_da_g1_3: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":Ov");
    },
    _g_da_g1_4: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ">l/:HEL");
    },
    _g_cond_g1_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|n’|me|m’|te|t’|nous|vous|ils|elles|iels|");
    },
    _g_cond_g1_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|j’|il|on|elle|nous|vous|ils|elles|iel|iels|ne|n’|me|m’|te|t’|se|s’|") && (g_morph(lToken[nTokenOffset+2], ":[NABWM]", "*") || g_value(lToken[nTokenOffset+2], "|plus|moins|plupart|"));
    },
    _g_cond_g1_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_value(lToken[nTokenOffset], "|le|ce|du|");
    },
    _g_da_g1_5: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":N");
    },
    _g_cond_g1_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|du|");
    },
    _g_cond_g1_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|les|des|");
    },
    _g_da_g1_6: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":R");
    },
    _g_cond_g1_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|j’|n’|m’|t’|s’|l’|c’|") || g_morph(lToken[nTokenOffset+2], ":[ISKYPE]", "*");
    },
    _g_cond_g1_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_morph(lToken[nTokenOffset], ":O[sv]") && g_morph(lToken[nTokenOffset+2], ":", ":[ISKYPE]");
    },
    _g_cond_g1_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|j’|n’|m’|t’|s’|l’|c’|") || g_morph(lToken[nTokenOffset+2], ":(?:[123][sp]|P|Y)");
    },
    _g_cond_g1_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]", ":Y");
    },
    _g_da_g1_7: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_da_g1_8: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":Os");
    },
    _g_cond_g1_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":1p");
    },
    _g_da_g1_9: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":Os");
    },
    _g_cond_g1_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":2p");
    },
    _g_da_g1_10: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":[ISKYPE]");
    },
    _g_cond_g1_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":R");
    },
    _g_da_g1_11: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":(?:Q|Os)");
    },
    _g_da_g1_12: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":[ISKYP]");
    },
    _g_da_g1_13: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":V");
    },
    _g_cond_g1_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|il|ils|iel|iels");
    },
    _g_cond_g1_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_da_g1_14: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":C");
    },
    _g_da_g1_15: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], ":[ISKYPE]");
    },
    _g_da_g1_16: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":[ISKYPE]");
    },
    _g_da_g1_17: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":[ISKP]");
    },
    _g_cond_g1_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_g1_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V0");
    },
    _g_da_g1_18: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":(?:[123][sp]|P|Y)");
    },
    _g_cond_g1_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset], ":Cs|<start>");
    },
    _g_da_g1_19: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":[123][sp]");
    },
    _g_da_g1_20: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":M");
    },
    _g_da_g1_21: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], "", ":E");
    },
    _g_da_g1_22: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+4], "", ":N");
    },
    _g_da_g1_23: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], "", ":N");
    },
    _g_da_g1_24: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":V0");
    },
    _g_da_g1_25: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":Oo");
    },
    _g_da_g1_26: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":N");
    },
    _g_cond_g1_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[me]:[si]");
    },
    _g_da_g1_27: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":W");
    },
    _g_da_g1_28: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":V");
    },
    _g_da_g1_29: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":N");
    },
    _g_cond_g1_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_cond_g1_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|l’|d’|cet|quel|mon|notre|votre|");
    },
    _g_da_g1_30: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":G");
    },
    _g_cond_g1_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|quel|cet|un|mon|ton|son|notre|votre|leur|");
    },
    _g_cond_g1_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|droit|cause|") && g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_cond_g1_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_da_g1_31: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ">ayant/:LN:e:s");
    },
    _g_da_g1_32: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":V");
    },
    _g_cond_g1_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_da_g1_33: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ">ayant/:LN:e:p");
    },
    _g_cond_g1_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DNA].*:[me]:[si]");
    },
    _g_da_g1_34: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":[AW]");
    },
    _g_cond_g1_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|que|qu’|");
    },
    _g_da_g1_35: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":G");
    },
    _g_da_g1_36: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":O");
    },
    _g_cond_g1_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|ils|on|ne|n’|");
    },
    _g_da_g1_37: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":D") && g_select(lToken[nTokenOffset+2], ":[NA]");
    },
    _g_da_g1_38: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":D");
    },
    _g_da_g1_39: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":V");
    },
    _g_da_g1_40: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":O");
    },
    _g_cond_g1_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[NAD].*:[me]:[pi]");
    },
    _g_cond_g1_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[NAD].*:[fe]:[pi]");
    },
    _g_da_g1_41: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":R");
    },
    _g_cond_g1_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:p|>[a-zé-]+ième/");
    },
    _g_cond_g1_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].slice(0,1).gl_isUpperCase();
    },
    _g_cond_g1_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]:[si]");
    },
    _g_cond_g1_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V|<start>|>[(,]", ":G");
    },
    _g_cond_g1_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V");
    },
    _g_cond_g1_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset], ":D", ">la/");
    },
    _g_cond_g1_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return (g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+4], ":[NA]")) || (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+4], ":Y")) || (g_morph(lToken[nTokenOffset+2], ":M") && g_morph(lToken[nTokenOffset+4], ":M"));
    },
    _g_da_g1_42: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":R");
    },
    _g_cond_g1_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]") && g_morph(lToken[nTokenOffset+6], ":[NA]");
    },
    _g_cond_g1_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|un|cet|quel|");
    },
    _g_da_g1_43: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":V0") && g_select(lToken[nLastToken-1+1], ":Q");
    },
    _g_da_g1_44: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":N");
    },
    _g_cond_g1_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:D|A.*:[fe]:[si])");
    },
    _g_cond_g1_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[fe]");
    },
    _g_cond_g1_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D");
    },
    _g_da_g1_45: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":W");
    },
    _g_cond_g1_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|les|ces|des|mes|tes|ses|nos|vos|leurs|quelques|");
    },
    _g_da_g1_46: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nLastToken-1+1], ">mais/:W");
    },
    _g_da_g1_47: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":W");
    },
    _g_cond_g1_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NV]", ":D.*:[me]:[si]");
    },
    _g_cond_g1_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>,|:[ISKYP]", "*");
    },
    _g_da_g1_48: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":A");
    },
    _g_cond_g1_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:(?:C|Or)|>[(,]/");
    },
    _g_da_g1_49: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":V");
    },
    _g_da_g1_50: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":G");
    },
    _g_cond_g1_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|on|elle|iel|n’|l’|");
    },
    _g_da_g1_51: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":R") && g_select(lToken[nTokenOffset+2], ":N");
    },
    _g_da_g1_52: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":N");
    },
    _g_cond_g1_57: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V|<start>", ":[GA]");
    },
    _g_da_g1_53: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_g1_58: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VWX]");
    },
    _g_da_g1_54: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":X");
    },
    _g_cond_g1_59: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[fe]:[si]");
    },
    _g_cond_g1_60: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|le|la|l’|les|leur|");
    },
    _g_da_g1_55: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":[NW]");
    },
    _g_cond_g1_61: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset], ":V");
    },
    _g_da_g1_56: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":W") && g_select(lToken[nLastToken-1+1], ":W");
    },
    _g_cond_g1_62: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":Ov");
    },
    _g_cond_g1_63: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|ne|n’|");
    },
    _g_cond_g1_64: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|que|qu’|");
    },
    _g_cond_g1_65: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[me]:[si]");
    },
    _g_cond_g1_66: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|ne|n’|le|l’|leur|");
    },
    _g_da_g1_57: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":W") && g_select(lToken[nTokenOffset+2], ":W");
    },
    _g_cond_g1_67: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":D");
    },
    _g_da_g1_58: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":D");
    },
    _g_cond_g1_68: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":G", ":[NA]") || g_value(lToken[nTokenOffset], "|du|le|ce|un|quel|mon|");
    },
    _g_cond_g1_69: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":N", "*");
    },
    _g_cond_g1_70: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[me]:[pi]");
    },
    _g_cond_g1_71: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:V[0123]e|[DN].*:[me]:[si])");
    },
    _g_cond_g1_72: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>[(,]");
    },
    _g_da_g1_59: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":W") && g_select(lToken[nTokenOffset+2], ":D") && g_select(lToken[nLastToken-1+1], ":N");
    },
    _g_cond_g1_73: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:R|D.*:[me]:[si])");
    },
    _g_cond_g1_74: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|de|ce|quel|");
    },
    _g_cond_g1_75: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|la|de|cette|quelle|une|ma|ta|sa|notre|votre|leur|");
    },
    _g_cond_g1_76: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[DA].*:[me]|R)");
    },
    _g_cond_g1_77: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|n’|j’|tu|t’|m’|s’|");
    },
    _g_da_g1_60: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":G:R:LR");
    },
    _g_da_g1_61: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":N:m:s");
    },
    _g_cond_g1_78: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">entre/|:D");
    },
    _g_da_g1_62: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":G");
    },
    _g_da_g1_63: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], "", ":V");
    },
    _g_da_g1_64: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":D") && g_select(lToken[nTokenOffset+2], ":N");
    },
    _g_da_g1_65: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":D") && g_select(lToken[nTokenOffset+3], "", ":V");
    },
    _g_cond_g1_79: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|plus|");
    },
    _g_da_g1_66: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], ":[123][sp]");
    },
    _g_cond_g1_80: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|elle|on|iel|ils|elles|iels|ne|n’|");
    },
    _g_da_g1_67: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":[NA]");
    },
    _g_cond_g1_81: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tu|ne|n’|me|m’|te|t’|se|s’|nous|vous|") && g_morph(lToken[nTokenOffset+2], ":V1.*Ip.*:2s") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && ! g_value(lToken[nLastToken+1], "|tu|pas|jamais|");
    },
    _g_cond_g1_82: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|quelqu’|quelqu|") && ! g_value(lToken[nTokenOffset+2], "|a|fut|fût|est|fait|") && ! g_morph(lToken[nTokenOffset+2], ":P");
    },
    _g_da_g1_68: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":D");
    },
    _g_cond_g1_83: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|semblant|");
    },
    _g_da_g1_69: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], "", ":V");
    },
    _g_da_g1_70: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+4], ":[NA]");
    },
    _g_cond_g1_84: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase();
    },
    _g_da_g1_71: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":[NA]");
    },
    _g_cond_g1_85: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|tu|il|on|elle|iel|nous|vous|ils|elles|iels|") && ! (g_value(lToken[nTokenOffset], "|des|les|") && g_morph(lToken[nLastToken-1+1], ":G"));
    },
    _g_cond_g1_86: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|du|le|la|l’|les|des|");
    },
    _g_cond_g1_87: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VR]|<start>|>[(,]");
    },
    _g_da_g1_72: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":[123][sp]");
    },
    _g_cond_g1_88: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:D.*:m|V[0-3]e)");
    },
    _g_cond_g1_89: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V[0-3]e");
    },
    _g_da_g1_73: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":ÉV");
    },
    _g_cond_g1_90: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1p_") && ! g_value(lToken[nTokenOffset], "|n’|") && ! g_value(lToken[nLastToken+1], "|nous|");
    },
    _g_cond_g1_91: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Y");
    },
    _g_da_g1_74: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":N:e:i");
    },
    _g_da_g1_75: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":GN:m:p");
    },
    _g_da_g1_76: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":GN:f:p");
    },
    _g_cond_g1_92: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|n’|j’|on|il|elle|iel|");
    },
    _g_da_g1_77: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":A:e:i");
    },
    _g_cond_g1_93: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":(?:D.*:p|B)");
    },
    _g_da_g1_78: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":A:e:i");
    },
    _g_cond_g1_94: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:f");
    },
    _g_da_g1_79: function (lToken, nTokenOffset, nLastToken) {
        return g_addmorph(lToken[nTokenOffset+1], ">Concorde/:MP:m:i");
    },
    _g_cond_g1_95: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m");
    },
    _g_da_g1_80: function (lToken, nTokenOffset, nLastToken) {
        return g_addmorph(lToken[nTokenOffset+1], ">Mustang/:MP:f:i");
    },
    _g_cond_g1_96: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">ne/|:R");
    },
    _g_da_g1_81: function (lToken, nTokenOffset, nLastToken) {
        return g_setmeta(lToken[nTokenOffset+1], "WORD");
    },
    _g_cond_g1_97: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[NA]");
    },
    _g_da_g1_82: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":Cs");
    },
    _g_cond_g1_98: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0) && g_space(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], 0, 0);
    },
    _g_da_g1_83: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":N:m:i");
    },
    _g_da_g1_84: function (lToken, nTokenOffset, nLastToken) {
        return g_setmeta(lToken[nTokenOffset+1], "WORD") && g_define(lToken[nTokenOffset+1], ":LO");
    },
    _g_da_g1_85: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":N:f:p");
    },
    _g_cond_g1_99: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[mp]");
    },
    _g_cond_g1_100: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0);
    },
    _g_cond_g1_101: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0);
    },
    _g_da_g1_86: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":LN:e:p");
    },
    _g_cond_g1_102: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 1) && g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 1) && g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nLastToken-1+1], ":N") && ! (g_morph(lToken[nTokenOffset+1], "[123][sp]") && g_morph(lToken[nTokenOffset], ":O[vs]"));
    },
    _g_da_g1_87: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":M2:e:i");
    },
    _g_da_g1_88: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":MP:e:i");
    },
    _g_da_g1_89: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":MP:m:i");
    },
    _g_cond_g1_103: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], " ", ":");
    },
    _g_cond_g1_104: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+1], ":M") && g_morph(lToken[nTokenOffset+2], ":V", ":[GM]");
    },
    _g_da_g1_90: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":M2");
    },
    _g_da_g1_91: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":T");
    },
    _g_da_g1_92: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":MP:f:s");
    },
    _g_da_g1_93: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":MP:m:s");
    },
    _g_da_g1_94: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":MP:e:i");
    },
    _g_cond_g1_105: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V");
    },
    _g_cond_g1_106: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V");
    },
    _g_cond_g1_107: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":V");
    },
    _g_cond_g1_108: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ">[iî]le/");
    },
    _g_cond_g1_109: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|un|une|");
    },
    _g_cond_ocr_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]") && (g_morph(lToken[nTokenOffset+1], ":G", ":M") || g_morph(lToken[nTokenOffset+1], ":[123][sp]", ":[MNA]|>Est/"));
    },
    _g_sugg_ocr_1: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].toLowerCase();
    },
    _g_cond_ocr_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]") && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase();
    },
    _g_cond_ocr_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return re.search("^[aâeéèêiîouyh]", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_ocr_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[   ]$") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "\\d[   ]+$") && ! (lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && g_value(lToken[nLastToken+1], "|.|<end>|"));
    },
    _g_cond_ocr_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[   ]$") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "\\d[   ]+$") && lToken[nTokenOffset+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_ocr_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() || g_value(lToken[nTokenOffset+1], "|à|");
    },
    _g_cond_ocr_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|<start>|—|–|");
    },
    _g_sugg_ocr_2: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_sugg_ocr_3: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/n/g, "u");
    },
    _g_cond_ocr_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|ne|n’|âne|ânesse|");
    },
    _g_cond_ocr_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|ne|elle|");
    },
    _g_cond_ocr_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|ne|le|la|les|");
    },
    _g_cond_ocr_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:f:[si]");
    },
    _g_cond_ocr_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|j’|n’|l’|m’|t’|s’|il|on|elle|ça|cela|ceci|");
    },
    _g_cond_ocr_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|où|");
    },
    _g_cond_ocr_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:p");
    },
    _g_cond_ocr_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset], "|grand|") && g_value(g_token(lToken, nTokenOffset+1-2), "|au|"));
    },
    _g_sugg_ocr_4: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/rn/g, "m").replace(/in/g, "m").replace(/RN/g, "M").replace(/IN/g, "M");
    },
    _g_cond_ocr_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m:[si]");
    },
    _g_cond_ocr_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m:p");
    },
    _g_cond_ocr_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_cond_ocr_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|au|de|en|par|");
    },
    _g_cond_ocr_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[RC]|<start>|>[(,]");
    },
    _g_cond_ocr_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[0-9] +$");
    },
    _g_cond_ocr_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tu|");
    },
    _g_sugg_ocr_5: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ess/g, "ass").replace(/ESS/g, "ASS");
    },
    _g_sugg_ocr_6: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/l/g, "i").replace(/L/g, "I");
    },
    _g_cond_ocr_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|elle|on|") && ! g_value(g_token(lToken, nTokenOffset+1-2), "|il|elle|on|");
    },
    _g_cond_ocr_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken+1], ":(?:Ov|Y|W)");
    },
    _g_cond_ocr_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":(?:O[on]|3s)");
    },
    _g_cond_ocr_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":N", "*");
    },
    _g_sugg_ocr_7: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/o/g, "e");
    },
    _g_sugg_ocr_8: function (lToken, nTokenOffset, nLastToken) {
        return "l’"+lToken[nTokenOffset+1]["sValue"].slice(2) + "|L’"+lToken[nTokenOffset+1]["sValue"].slice(2) + "|j’"+lToken[nTokenOffset+1]["sValue"].slice(2) + "|J’"+lToken[nTokenOffset+1]["sValue"].slice(2);
    },
    _g_cond_ocr_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]") && ! g_morph(lToken[nTokenOffset+2], ":Y");
    },
    _g_cond_ocr_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]") && ! g_morph(lToken[nTokenOffset+1], ">V");
    },
    _g_cond_ocr_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return window.grammalecte.gc_engine.oSpellChecker.isValid(lToken[nTokenOffset+1]["sValue"]) && window.grammalecte.gc_engine.oSpellChecker.isValid(lToken[nTokenOffset+1]["sValue"].slice(1));
    },
    _g_sugg_ocr_9: function (lToken, nTokenOffset, nLastToken) {
        return "v"+lToken[nTokenOffset+1]["sValue"].slice(1) + "|l’"+lToken[nTokenOffset+1]["sValue"].slice(1);
    },
    _g_cond_ocr_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && window.grammalecte.gc_engine.oSpellChecker.isValid(lToken[nTokenOffset+1]["sValue"].slice(1));
    },
    _g_sugg_ocr_10: function (lToken, nTokenOffset, nLastToken) {
        return "l’"+lToken[nTokenOffset+1]["sValue"].slice(1);
    },
    _g_cond_ocr_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && window.grammalecte.gc_engine.oSpellChecker.isValid(lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_ocr_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]") && ! g_morph(lToken[nTokenOffset+1], ">P");
    },
    _g_sugg_ocr_11: function (lToken, nTokenOffset, nLastToken) {
        return "l’"+lToken[nTokenOffset+1]["sValue"].slice(1) + "|p"+lToken[nTokenOffset+1]["sValue"].slice(1);
    },
    _g_cond_ocr_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]:[si]");
    },
    _g_sugg_ocr_12: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/é/g, "e").replace(/É/g, "E");
    },
    _g_cond_ocr_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:V0|N.*:m:[si])");
    },
    _g_cond_ocr_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 1);
    },
    _g_cond_ocr_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D:[me]:p");
    },
    _g_cond_ocr_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D:(?:m:s|e:p)");
    },
    _g_cond_ocr_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:homme|ce|quel|être)/");
    },
    _g_sugg_ocr_13: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/â/g, "a").replace(/Â/g, "A");
    },
    _g_sugg_ocr_14: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ô/g, "ê").replace(/Ô/g, "Ê");
    },
    _g_sugg_ocr_15: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    _g_sugg_ocr_16: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/é/g, "ê").replace(/É/g, "Ê").replace(/o/g, "e").replace(/O/g, "E");
    },
    _g_cond_ocr_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tu|ne|n’|");
    },
    _g_sugg_ocr_17: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/l/g, "t").replace(/L/g, "T")+"|"+lToken[nTokenOffset+1]["sValue"].replace(/l/g, "i").replace(/L/g, "I");
    },
    _g_sugg_ocr_18: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/u/g, "n").replace(/U/g, "N");
    },
    _g_cond_ocr_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>,|:(?:R|Os|X)");
    },
    _g_cond_ocr_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|il|on|elle|je|");
    },
    _g_cond_ocr_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|il|on|elle|");
    },
    _g_cond_ocr_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|tu|");
    },
    _g_cond_ocr_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m:s");
    },
    _g_cond_ocr_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:f:s");
    },
    _g_cond_ocr_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]:p");
    },
    _g_cond_ocr_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|sine|");
    },
    _g_cond_ocr_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|statu|");
    },
    _g_cond_ocr_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+1], "|raine|raines|");
    },
    _g_sugg_ocr_19: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/a/g, "u").replace(/A/g, "U")+"|"+lToken[nTokenOffset+1]["sValue"].replace(/a/g, "e").replace(/A/g, "E");
    },
    _g_cond_ocr_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_sugg_ocr_20: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ain/g, "uin").replace(/AIN/g, "UIN");
    },
    _g_cond_ocr_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|generis|");
    },
    _g_cond_ocr_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|ce|mon|ton|son|du|un|");
    },
    _g_cond_ocr_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]");
    },
    _g_cond_ocr_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|il|elle|on|ne|ça|");
    },
    _g_sugg_ocr_21: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/a/g, "o").replace(/A/g, "O");
    },
    _g_sugg_ocr_22: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/n/g, "u").replace(/N/g, "U");
    },
    _g_cond_ocr_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:N.*:f:p|V0e.*:3p)|>(?:tu|ne)/");
    },
    _g_cond_ocr_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ce|de|du|un|quel|leur|le|");
    },
    _g_sugg_ocr_23: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/l/g, "t").replace(/L/g, "T");
    },
    _g_cond_g2_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_tag(lToken[nTokenOffset+2], "_CAP_") && ! re.search("(?i)^(?:I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))", lToken[nTokenOffset+2]["sValue"]) && (g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuûyœæhAÂEÉÈÊIÎOÔUÛYŒÆ].*:[si]", ">une?/|:[Gp]|;é") || g_morph(lToken[nTokenOffset+2], ">H.*;É")) && ! re.search("^[hH]aute?", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_1: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,1)+"’";
    },
    _g_cond_g2_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_tag(lToken[nTokenOffset+2], "_CAP_") && ! re.search("(?i)^(?:I(?:I|V|X|er|ᵉʳ|ʳᵉ|è?re))", lToken[nTokenOffset+2]["sValue"]) && (g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuûyœæhAÂEÉÈÊIÎOÔUÛYŒÆ]", ">une?/|:G|;é") || g_morph(lToken[nTokenOffset+2], ">H.*;É")) && ! re.search("^[hH]aute?", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1);
    },
    _g_cond_g2_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V", ":Q|;é") && ! re.search("^haute?", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":(?:[123][sp]|[NA].*:e)");
    },
    _g_cond_g2_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:m");
    },
    _g_cond_g2_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f");
    },
    _g_sugg_g2_2: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1)+"e ";
    },
    _g_cond_g2_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! re.search("(?i)^(?:I(?:I|V|X|er|ᵉʳ))", lToken[nTokenOffset+2]["sValue"]) && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]", ":G|;é");
    },
    _g_cond_g2_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], "V1.*:1s") && lToken[nTokenOffset+1]["sValue"].endsWith("e-je");
    },
    _g_sugg_g2_3: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/e-je/g, "é-je")+"|"+lToken[nTokenOffset+1]["sValue"].replace(/e-je/g, "è-je");
    },
    _g_cond_g2_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot") && g_morph(lToken[nTokenOffset+2], ":[NA]", ":G|;é") && ! re.search("(?i)^(?:I(?:I|V|X|i?[eè]?re|ʳᵉ))", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_4: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,1)+"on";
    },
    _g_cond_g2_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && g_morph(lToken[nTokenOffset+2], ":[NA]", ":G|;é") && ! re.search("(?i)^(?:I(?:I|V|X|i?[eè]?re|ʳᵉ))", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]");
    },
    _g_sugg_g2_5: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,1)+"on|ça";
    },
    _g_cond_g2_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_sugg_g2_6: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-2+1]["sValue"].replace(/eau/g, "el").replace(/EAU/g, "EL");
    },
    _g_cond_g2_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[NA].*:[me]:s", ":[123][sp]");
    },
    _g_cond_g2_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:s", ":[123][sp]");
    },
    _g_cond_g2_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagafter(lToken[nLastToken-1+1], dTags, "_que_") && ! g_value(lToken[nTokenOffset], "|jamais|guère|");
    },
    _g_cond_g2_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return _sAppContext != "Writer";
    },
    _g_cond_g2_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] != "1e" && _sAppContext != "Writer";
    },
    _g_sugg_g2_7: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1)+"ᵉ";
    },
    _g_cond_g2_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] != "1es" && _sAppContext != "Writer";
    },
    _g_sugg_g2_8: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-2)+"ᵉˢ";
    },
    _g_cond_g2_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].endsWith("s");
    },
    _g_sugg_g2_9: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/mes/g, "").replace(/è/g, "").replace(/e/g, "").replace(/i/g, "") + "ᵉˢ";
    },
    _g_sugg_g2_10: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/me/g, "").replace(/è/g, "").replace(/e/g, "").replace(/i/g, "") + "ᵉ";
    },
    _g_cond_g2_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return _sAppContext != "Writer" && ! option("romain");
    },
    _g_cond_g2_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":G");
    },
    _g_cond_g2_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].endsWith("s") || lToken[nTokenOffset+1]["sValue"].endsWith("S");
    },
    _g_sugg_g2_11: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/1/g, "₁").replace(/2/g, "₂").replace(/3/g, "₃").replace(/4/g, "₄").replace(/5/g, "₅").replace(/6/g, "₆").replace(/7/g, "₇").replace(/8/g, "₈").replace(/9/g, "₉").replace(/0/g, "₀");
    },
    _g_cond_g2_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isDigit();
    },
    _g_da_g2_1: function (lToken, nTokenOffset, nLastToken) {
        return g_setmeta(lToken[nTokenOffset+1], "DATE");
    },
    _g_cond_g2_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! checkDate(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g2_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (lToken[nTokenOffset+1]["sValue"] == "29" && g_value(lToken[nTokenOffset+2], "|février|")) && ! checkDate(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g2_12: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].slice(0,-1);
    },
    _g_cond_g2_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+6]["sValue"]);
    },
    _g_sugg_g2_13: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+6]["sValue"]);
    },
    _g_cond_g2_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+5]["sValue"], lToken[nTokenOffset+7]["sValue"]);
    },
    _g_sugg_g2_14: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+5]["sValue"], lToken[nTokenOffset+7]["sValue"]);
    },
    _g_cond_g2_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+6]["sValue"], lToken[nTokenOffset+8]["sValue"]);
    },
    _g_sugg_g2_15: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+6]["sValue"], lToken[nTokenOffset+8]["sValue"]);
    },
    _g_cond_g2_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_sugg_g2_16: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g2_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+5]["sValue"]);
    },
    _g_sugg_g2_17: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g2_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +av(?:ant|) +J(?:C|ésus-Christ)") && ! checkDay(lToken[nTokenOffset+1]["sValue"], lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+5]["sValue"], lToken[nTokenOffset+6]["sValue"]);
    },
    _g_sugg_g2_18: function (lToken, nTokenOffset, nLastToken) {
        return getDay(lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+5]["sValue"], lToken[nTokenOffset+6]["sValue"]);
    },
    _g_cond_g2_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NB]", ":V0e") && ! g_value(lToken[nLastToken+1], "|où|");
    },
    _g_cond_g2_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NB]", ":V0e");
    },
    _g_cond_g2_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NB]");
    },
    _g_cond_g2_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|aequo|nihilo|cathedra|absurdo|abrupto|");
    },
    _g_cond_g2_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|aequo|nihilo|cathedra|absurdo|abrupto|") && ! g_value(lToken[nTokenOffset], "|l’|");
    },
    _g_cond_g2_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|drive|plug|sit|");
    },
    _g_cond_g2_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|a|dièse|");
    },
    _g_cond_g2_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D");
    },
    _g_cond_g2_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[WA]", ":N", 6);
    },
    _g_sugg_g2_19: function (lToken, nTokenOffset, nLastToken) {
        return "quasi " + lToken[nTokenOffset+1]["sValue"].slice(6);
    },
    _g_cond_g2_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":");
    },
    _g_cond_g2_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && (g_morph(lToken[nTokenOffset+2], ":N") || g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":"));
    },
    _g_cond_g2_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D|<start>|>[(,]") && g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":");
    },
    _g_cond_g2_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_cond_g2_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D") && g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":");
    },
    _g_cond_g2_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return !(lToken[nTokenOffset+2]["sValue"] == "forme" && g_value(lToken[nLastToken+1], "|de|d’|")) && g_morph(lToken[nTokenOffset], ":D") && g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":");
    },
    _g_da_g2_2: function (lToken, nTokenOffset, nLastToken) {
        return g_definefrom(lToken[nTokenOffset+1], 7);
    },
    _g_cond_g2_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":[GYB]") && g_morph(lToken[nTokenOffset], ":(?:D|V.e)|<start>|>[(,]") && g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":N");
    },
    _g_cond_g2_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V") && g_morph2(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], "-", ":V");
    },
    _g_cond_g2_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":V") && g_morph2(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], "-", ":V") && ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_g2_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:D|V0e)|<start>|>[(,]") && g_morph2(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], "-", ":N");
    },
    _g_cond_g2_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":[WA]");
    },
    _g_cond_g2_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|si|s’|");
    },
    _g_cond_g2_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nLastToken+1], "|et|") && g_morph(g_token(lToken, nLastToken+2), ":N"));
    },
    _g_cond_g2_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":G");
    },
    _g_cond_g2_57: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].endsWith("s") || lToken[nTokenOffset+2]["sValue"].endsWith("S");
    },
    _g_cond_g2_58: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">arrière/");
    },
    _g_cond_g2_59: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset], "|par|") && g_value(g_token(lToken, nTokenOffset+1-2), "|un|"));
    },
    _g_cond_g2_60: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset] , ":D");
    },
    _g_cond_g2_61: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D", ">d[e’]/");
    },
    _g_cond_g2_62: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_cond_g2_63: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":A.*:[me]:[si]");
    },
    _g_cond_g2_64: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D", ":R");
    },
    _g_cond_g2_65: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|elle|iel|ne|n’|tu|je|j’|me|m’|te|t’|");
    },
    _g_cond_g2_66: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":O[sv]");
    },
    _g_cond_g2_67: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|elle|on|iel|je|tu|ne|n’|");
    },
    _g_cond_g2_68: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[DR]|<start>|>[(,]");
    },
    _g_cond_g2_69: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! ( g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|que|qu’|") );
    },
    _g_cond_g2_70: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|de|d’|");
    },
    _g_cond_g2_71: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ">en/|:D");
    },
    _g_cond_g2_72: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|guerre|guerres|");
    },
    _g_cond_g2_73: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>") && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1);
    },
    _g_cond_g2_74: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|<start>|") && g_morph(lToken[nTokenOffset+2], ":M");
    },
    _g_cond_g2_75: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|quatre|");
    },
    _g_cond_g2_76: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":B:.:p");
    },
    _g_sugg_g2_20: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/-/g, " ");
    },
    _g_sugg_g2_21: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/-/g, " ");
    },
    _g_cond_g2_77: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|centre|aile|") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "équipe");
    },
    _g_cond_g2_78: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "équipe");
    },
    _g_cond_g2_79: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[Pp]ar[ -]ci ?,? *$");
    },
    _g_cond_g2_80: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V0", "", 2);
    },
    _g_sugg_g2_22: function (lToken, nTokenOffset, nLastToken) {
        return "y " + lToken[nTokenOffset+1]["sValue"].slice(2);
    },
    _g_sugg_g2_23: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/-/g, "");
    },
    _g_cond_g2_81: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|dès|des|");
    },
    _g_sugg_g2_24: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/’/g, "-");
    },
    _g_tp_g2_1: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/’/g, "-");
    },
    _g_cond_g2_82: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nLastToken-2+1], lToken[nLastToken-2+2], 1, 1) && g_morph(lToken[nLastToken-2+1], ":V.*:1p", ":[GW]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1p_");
    },
    _g_cond_g2_83: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillons|sachons|");
    },
    _g_cond_g2_84: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillons|sachons|allons|venons|partons|");
    },
    _g_cond_g2_85: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nLastToken-2+1], lToken[nLastToken-2+2], 1, 1) && g_morph(lToken[nLastToken-2+1], ":V.*:2p", ":[GW]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2p_");
    },
    _g_cond_g2_86: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillez|sachez|");
    },
    _g_cond_g2_87: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillez|sachez|allez|venez|partez|");
    },
    _g_cond_g2_88: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":E", "", 0, -4);
    },
    _g_cond_g2_89: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":E", "", 0, -3);
    },
    _g_cond_g2_90: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1);
    },
    _g_sugg_g2_25: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"]+"’";
    },
    _g_cond_g2_91: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|t’|priori|posteriori|postériori|contrario|capella|fortiori|giorno|a|");
    },
    _g_cond_g2_92: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+4], "|il|ils|elle|elles|iel|iels|on|ont|");
    },
    _g_sugg_g2_26: function (lToken, nTokenOffset, nLastToken) {
        return "É"+lToken[nTokenOffset+1]["sValue"].slice(1);
    },
    _g_tp_g2_2: function (lToken, nTokenOffset, nLastToken) {
        return "É"+lToken[nTokenOffset+1]["sValue"].slice(1);
    },
    _g_cond_g2_93: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_cond_g2_94: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase();
    },
    _g_sugg_g2_27: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[si]", true);
    },
    _g_cond_g2_95: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset], "|tel|telle|");
    },
    _g_sugg_g2_28: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[pi]", true);
    },
    _g_cond_g2_96: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset], "|tels|telles|");
    },
    _g_cond_g2_97: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|entre|");
    },
    _g_cond_g2_98: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|");
    },
    _g_cond_g2_99: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|peu|") || ! g_value(lToken[nTokenOffset+2], "|sous|");
    },
    _g_cond_g2_100: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " en (?:a|aie|aies|ait|eut|eût|aura|aurait|avait)\\b");
    },
    _g_cond_g2_101: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|nuit|");
    },
    _g_cond_g2_102: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":D");
    },
    _g_cond_g2_103: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|en|");
    },
    _g_cond_g2_104: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":(?:A.*:[fe]:[pi]|W)");
    },
    _g_cond_g2_105: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":A.*:[me]:[si]");
    },
    _g_sugg_g2_29: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_sugg_g2_30: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/vrai/g, "exact");
    },
    _g_cond_g2_106: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|de|des|du|d’|");
    },
    _g_sugg_g2_31: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbFrom("faire", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_sugg_g2_32: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbFrom("choisir", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g2_107: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nLastToken-1+1], ":[PQ]") && g_morph(lToken[nTokenOffset], ":V0.*:1s"));
    },
    _g_sugg_g2_33: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":1s");
    },
    _g_cond_g2_108: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nLastToken-1+1], "|est|es|");
    },
    _g_cond_g2_109: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|soussigné|soussignée|leurs|") && ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! g_morph(lToken[nTokenOffset], ":1s|>pronom/");
    },
    _g_cond_g2_110: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[WX]") && ! hasSimil(lToken[nLastToken-1+1]["sValue"], ":(?:1s|Ov)");
    },
    _g_sugg_g2_34: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":(?:1s|Ov)", false);
    },
    _g_sugg_g2_35: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":(?:1s|Ov)", false);
    },
    _g_cond_g2_111: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V0");
    },
    _g_sugg_g2_36: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":2s");
    },
    _g_cond_g2_112: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! g_morph(lToken[nTokenOffset], ":(?:2s|V0)|>(?:pronom|à)/");
    },
    _g_cond_g2_113: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[WX]") && ! hasSimil(lToken[nLastToken-1+1]["sValue"], ":(?:2s|Ov)");
    },
    _g_sugg_g2_37: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":(?:2s|Ov)", false);
    },
    _g_cond_g2_114: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nTokenOffset+2], ":[PQ]") && g_morph(lToken[nTokenOffset], ":V0.*:3s"));
    },
    _g_sugg_g2_38: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+2]["sValue"], ":3s");
    },
    _g_cond_g2_115: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":3p");
    },
    _g_sugg_g2_39: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":3s");
    },
    _g_cond_g2_116: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":3p");
    },
    _g_cond_g2_117: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s") && ! g_value(lToken[nTokenOffset], "|t’|") && ! g_value(lToken[nLastToken-1+1], "|c’|ce|ou|si|") && ! g_tag(lToken[nTokenOffset+1], "eg1mot");
    },
    _g_cond_g2_118: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[WX]") && ! hasSimil(lToken[nLastToken-1+1]["sValue"], ":(?:3s|Ov)");
    },
    _g_sugg_g2_40: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":(?:3s|Ov)", false);
    },
    _g_cond_g2_119: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s") && ! g_value(lToken[nTokenOffset], "|t’|") && ! g_value(lToken[nLastToken-1+1], "|c’|ce|");
    },
    _g_sugg_g2_41: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":(?:3s|Ov)", false);
    },
    _g_cond_g2_120: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s") && ! g_value(lToken[nTokenOffset], "|n’|m’|t’|s’|") && ! g_value(lToken[nLastToken-1+1], "|c’|ce|si|") && ! g_tag(lToken[nTokenOffset+1], "eg1mot");
    },
    _g_cond_g2_121: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s") && ! g_value(lToken[nTokenOffset], "|n’|m’|t’|s’|") && ! g_value(lToken[nLastToken-1+1], "|c’|ce|");
    },
    _g_cond_g2_122: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V.*:3s") && ! look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "’$");
    },
    _g_cond_g2_123: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VR]|<start>") && ! g_morph(lToken[nLastToken+1], ":(?:3s|Ov)");
    },
    _g_cond_g2_124: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|il|ils|elle|elles|iel|iels|");
    },
    _g_sugg_g2_42: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1);
    },
    _g_cond_g2_125: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && ! g_value(lToken[nTokenOffset+2], "|soit|") && g_morph(lToken[nTokenOffset+2], ":3s") && ! (g_tag(lToken[nLastToken-1+1], "eg1mot") && g_morph(lToken[nTokenOffset+2], ">écrire/"));
    },
    _g_cond_g2_126: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot");
    },
    _g_sugg_g2_43: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":3s", false);
    },
    _g_cond_g2_127: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ">(?:être|devoir|devenir|pouvoir|vouloir|savoir)/:V", ":3s");
    },
    _g_sugg_g2_44: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s");
    },
    _g_cond_g2_128: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[YP]") || g_morph(lToken[nTokenOffset+3], ":V", ">(?:être|devoir|devenir|pouvoir|vouloir|savoir)/");
    },
    _g_cond_g2_129: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[123]p");
    },
    _g_cond_g2_130: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|je|tu|il|elle|on|nous|vous|ils|elles|iel|iels|");
    },
    _g_sugg_g2_45: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":1p");
    },
    _g_sugg_g2_46: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":1p");
    },
    _g_sugg_g2_47: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":2p");
    },
    _g_sugg_g2_48: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":2p");
    },
    _g_cond_g2_131: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nTokenOffset+2], ":[PQ]") && g_morph(lToken[nTokenOffset], ":V0.*:3p"));
    },
    _g_sugg_g2_49: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+2]["sValue"], ":3p");
    },
    _g_cond_g2_132: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":3s");
    },
    _g_sugg_g2_50: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":3p");
    },
    _g_cond_g2_133: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":3s");
    },
    _g_cond_g2_134: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") && ! g_value(lToken[nTokenOffset], "|t’|") && ! g_tag(lToken[nTokenOffset+1], "eg1mot");
    },
    _g_cond_g2_135: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[WX]") && ! hasSimil(lToken[nLastToken-1+1]["sValue"], ":(?:3p|Ov)");
    },
    _g_sugg_g2_51: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":(?:3p|Ov)", false);
    },
    _g_cond_g2_136: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") && ! g_value(lToken[nTokenOffset], "|t’|");
    },
    _g_sugg_g2_52: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":(?:3p|Ov)", false);
    },
    _g_cond_g2_137: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":1s") && lToken[nLastToken-1+1]["sValue"].endsWith("ai");
    },
    _g_sugg_g2_53: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"]+"t|"+suggVerb(lToken[nLastToken-1+1]["sValue"], ":3s");
    },
    _g_cond_g2_138: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":[12]s");
    },
    _g_cond_g2_139: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":1p");
    },
    _g_cond_g2_140: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":2p");
    },
    _g_sugg_g2_54: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g2_141: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V");
    },
    _g_sugg_g2_55: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+4]["sValue"], ":(?:[IKE].*[123][sp]|Y)", false);
    },
    _g_sugg_g2_56: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[IKE].*[123][sp]|Y)", false);
    },
    _g_sugg_g2_57: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[IK].*3[sp]|Y)", false);
    },
    _g_cond_g2_142: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">pronom/|:R");
    },
    _g_sugg_g2_58: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":(?:[IKE].*[123][sp]|Y)", false);
    },
    _g_sugg_g2_59: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":(?:[IK].*3[sp]|Y)", false);
    },
    _g_cond_g2_143: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && g_morph(lToken[nLastToken-1+1], ":1s", ":[GW]");
    },
    _g_cond_g2_144: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_1s_") && ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nLastToken-1+1], ":1s", ":[GW]");
    },
    _g_cond_g2_145: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && g_morph(lToken[nTokenOffset+1], ":1s", ":[GWMNAQ]") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_sugg_g2_60: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"]+"t|"+suggVerb(lToken[nTokenOffset+1]["sValue"], ":3s");
    },
    _g_cond_g2_146: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && g_morph(lToken[nLastToken-1+1], ":2s", ":(?:E|G|W|M|J|3[sp]|1p)");
    },
    _g_cond_g2_147: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_2s_") && g_morph(lToken[nLastToken-1+1], ":2s", ":(?:E|G|W|M|J|3[sp]|1p)");
    },
    _g_cond_g2_148: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_2s_") && ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nLastToken-1+1], ":2s", ":(?:E|G|W|M|J|3[sp]|2p|1p)");
    },
    _g_cond_g2_149: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && g_morph(lToken[nTokenOffset+1], ":2s", ":(?:E|G|W|M|J|3[sp]|N|A|Q|1p)") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_sugg_g2_61: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":3s");
    },
    _g_cond_g2_150: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && g_morph(lToken[nLastToken-1+1], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)");
    },
    _g_cond_g2_151: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_1s_") && ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_2s_") && g_morph(lToken[nLastToken-1+1], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)");
    },
    _g_cond_g2_152: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nLastToken-1+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nLastToken-1+1], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p)");
    },
    _g_cond_g2_153: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]")) && ! g_morph(lToken[nTokenOffset], ":[DA].*:p");
    },
    _g_cond_g2_154: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && g_morph(lToken[nTokenOffset+1], ":[12]s", ":(?:E|G|W|M|J|3[sp]|2p|1p|V0e|N|A|Q)") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_cond_g2_155: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_");
    },
    _g_cond_g2_156: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]")) && ! g_morph(lToken[nTokenOffset], ":(?:R|D.*:p)");
    },
    _g_cond_g2_157: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_cond_g2_158: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":1p", ":[EGMNAJ]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1p_") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_sugg_g2_62: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+1]["sValue"], ":3p");
    },
    _g_cond_g2_159: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":2p", ":[EGMNAJ]") && ! g_tagbefore(lToken[nTokenOffset+2], dTags, "_2p_") && ! (lToken[nTokenOffset+1]["sValue"].gl_isTitle() && look(sSentence0.slice(0,lToken[1+nTokenOffset]["nStart"]), "[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆᴀ-ᶿ]"));
    },
    _g_cond_g2_160: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":K:1s", ">(?:aimer|vouloir)/");
    },
    _g_sugg_g2_63: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+4]["sValue"].slice(0,-1);
    },
    _g_cond_g2_161: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":K:1s", ">(?:aimer|vouloir)/");
    },
    _g_sugg_g2_64: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+5]["sValue"].slice(0,-1);
    },
    _g_cond_g2_162: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+6], ":K:1s", ">(?:aimer|vouloir)/");
    },
    _g_sugg_g2_65: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+6]["sValue"].slice(0,-1);
    },
    _g_cond_g2_163: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+7], ":K:1s", ">(?:aimer|vouloir)/");
    },
    _g_sugg_g2_66: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+7]["sValue"].slice(0,-1);
    },
    _g_cond_g2_164: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_165: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase();
    },
    _g_cond_g2_166: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+3]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g2_67: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[fe]:[si]", true);
    },
    _g_cond_g2_167: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset], "|le|la|les|") && hasSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[fe]:[si]");
    },
    _g_cond_g2_168: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], "V.....[pqx]");
    },
    _g_cond_g2_169: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":V0") && hasSimil(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_68: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:s");
    },
    _g_sugg_g2_69: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA]:[fe]:[si]", true);
    },
    _g_cond_g2_170: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! ( g_morph(lToken[nLastToken-1+1], ":V[023].*:Y") && ( g_morph(lToken[nTokenOffset], ":V0a|>(?:jamais|pas)") || g_tag(lToken[nTokenOffset], "_VCint_") ) );
    },
    _g_sugg_g2_70: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[me]:[si]", true);
    },
    _g_cond_g2_171: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset], "|le|la|les|");
    },
    _g_cond_g2_172: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset+2], "|sortir|");
    },
    _g_cond_g2_173: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset+2], "|faire|sont|soit|fut|fût|serait|sera|seront|soient|furent|fussent|seraient|peut|pouvait|put|pût|pourrait|pourra|doit|dut|dût|devait|devrait|devra|") && hasSimil(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_174: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèiîouyh]");
    },
    _g_cond_g2_175: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g2_71: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[me]:[si]", true);
    },
    _g_cond_g2_176: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|dont|l’|d’|sauf|excepté|qu’|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bun à +$") && ! g_morph(lToken[nTokenOffset+2], ":V0");
    },
    _g_sugg_g2_72: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NAQ].*:[me]:[si]", true);
    },
    _g_cond_g2_177: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":1p");
    },
    _g_cond_g2_178: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && hasSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[pi]");
    },
    _g_cond_g2_179: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":2p");
    },
    _g_sugg_g2_73: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[me]:[pi]", true);
    },
    _g_cond_g2_180: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset], "|le|la|les|") && hasSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[fe]:[pi]");
    },
    _g_sugg_g2_74: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[fe]:[pi]", true);
    },
    _g_cond_g2_181: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset+2], "|soient|soit|sois|puisse|puisses|puissent|");
    },
    _g_sugg_g2_75: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[si]", true)+"|"+suggVerbInfi(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_g2_76: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[si]", true)+"|"+suggVerbInfi(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_g2_77: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[pi]", true);
    },
    _g_sugg_g2_78: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[si]", true);
    },
    _g_cond_g2_182: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|un|");
    },
    _g_cond_g2_183: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|une|");
    },
    _g_sugg_g2_79: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[si]", true);
    },
    _g_cond_g2_184: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isTitle() && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset+2], "|jure|") && ! g_tag(lToken[nTokenOffset+2], "eg1mot");
    },
    _g_sugg_g2_80: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[NA]", true)+"|"+suggVerbInfi(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_185: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+3]["sValue"].gl_isTitle() && ! lToken[nTokenOffset+3]["sValue"].gl_isUpperCase();
    },
    _g_cond_g2_186: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 1) && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:[me]", ":[YG]") && ! lToken[nTokenOffset+3]["sValue"].gl_isTitle() && ! (g_value(lToken[nTokenOffset+3], "|mal|") && g_morph(lToken[nLastToken+1], ":Y"));
    },
    _g_cond_g2_187: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123][sp]");
    },
    _g_sugg_g2_81: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g2_188: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123][sp]", ":[NAQ]") && ! lToken[nTokenOffset+3]["sValue"].gl_isTitle();
    },
    _g_cond_g2_189: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V1.*:(?:Iq|Ip:2p)", ":1p");
    },
    _g_cond_g2_190: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[NA].*:[fe]:[si])");
    },
    _g_sugg_g2_82: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[NA].*:[fe]:[si])", true);
    },
    _g_cond_g2_191: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+3]["sValue"].gl_isTitle() && ! g_value(lToken[nTokenOffset], "|plus|moins|");
    },
    _g_cond_g2_192: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nLastToken-1+1], "_Maj_");
    },
    _g_sugg_g2_83: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[DMO]");
    },
    _g_sugg_g2_84: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NADMG]", true);
    },
    _g_cond_g2_193: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nLastToken-1+1], "_Maj_") && ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_sugg_g2_85: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[me]:[si]", true);
    },
    _g_sugg_g2_86: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[fe]:[si]", true);
    },
    _g_sugg_g2_87: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[si]", true);
    },
    _g_sugg_g2_88: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[pi]", true);
    },
    _g_cond_g2_194: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! (g_tag(lToken[nTokenOffset+1], "eg1mot") && g_value(lToken[nTokenOffset], "|pronom|"));
    },
    _g_sugg_g2_89: function (lToken, nTokenOffset, nLastToken) {
        return "ne "+lToken[nTokenOffset+1]["sValue"].slice(0,1)+"’";
    },
    _g_cond_g2_195: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V[123].*:[123][sp]|>(?:pouvoir|vouloir|falloir)/");
    },
    _g_sugg_g2_90: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g2_196: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA]", ":P");
    },
    _g_cond_g2_197: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nTokenOffset+2], ":[NA]", ":[PG]");
    },
    _g_cond_g2_198: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3p");
    },
    _g_sugg_g2_91: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+3]["sValue"], ":P", ":P");
    },
    _g_cond_g2_199: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|m’|t’|s’|");
    },
    _g_sugg_g2_92: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,1) + "’en";
    },
    _g_cond_g2_200: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_g2_201: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset+3], "|importe|");
    },
    _g_cond_g2_202: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|n’|");
    },
    _g_cond_g2_203: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset], "|l’|");
    },
    _g_sugg_g2_93: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":P", ":P");
    },
    _g_cond_g2_204: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":Q") && ! g_morph(lToken[nTokenOffset], ":(?:V0a|R)");
    },
    _g_sugg_g2_94: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:s")+"|"+suggVerbInfi(lToken[nLastToken-1+1]["sValue"])+"|"+suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":3s");
    },
    _g_sugg_g2_95: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:s")+"|"+suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":3s");
    },
    _g_sugg_g2_96: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA]", true);
    },
    _g_cond_g2_205: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_value(lToken[nTokenOffset], "|ou|");
    },
    _g_sugg_g2_97: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_206: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isTitle() && ! g_morph(lToken[nTokenOffset], ":[NA]:[me]:si");
    },
    _g_cond_g2_207: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+3], ":V.e");
    },
    _g_cond_g2_208: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:p", ":[si]");
    },
    _g_sugg_g2_98: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_209: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":(?:Y|[123][sp])", ":[AQ]");
    },
    _g_sugg_g2_99: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":s");
    },
    _g_cond_g2_210: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[fp]", ":[me]:[si]");
    },
    _g_sugg_g2_100: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_101: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":m:s");
    },
    _g_cond_g2_211: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[mp]", ":[fe]:[si]");
    },
    _g_sugg_g2_102: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_103: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":f:s");
    },
    _g_cond_g2_212: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:s", ":[pi]");
    },
    _g_sugg_g2_104: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_105: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":p");
    },
    _g_cond_g2_213: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[sf]", ":[me]:[pi]");
    },
    _g_sugg_g2_106: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_107: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":m:p");
    },
    _g_cond_g2_214: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[sm]", ":[fe]:[pi]");
    },
    _g_sugg_g2_108: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g2_109: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":f:p");
    },
    _g_cond_g2_215: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_morph(lToken[nTokenOffset], ":V[123]");
    },
    _g_sugg_g2_110: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"])+"|"+suggVerbInfi(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_216: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|envie|");
    },
    _g_cond_g2_217: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V1.*:Y", ":[AW]");
    },
    _g_cond_g2_218: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+4], "|soie|soies|");
    },
    _g_cond_g2_219: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":V", ":3[sp]");
    },
    _g_cond_g2_220: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:p", ":[is]");
    },
    _g_cond_g2_221: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:s", ":[ip]");
    },
    _g_cond_g2_222: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", "*") && !(g_morph(lToken[nTokenOffset+2], ":A") && g_morph(lToken[nTokenOffset+3], ":N"));
    },
    _g_sugg_g2_111: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g2_223: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", ":(?:G|V0|Y|W)");
    },
    _g_cond_g2_224: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "eg1mot") && ! g_value(lToken[nLastToken+1], "|moins|plus|mieux|");
    },
    _g_cond_g2_225: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nLastToken+1], "|côté|coup|pic|peine|marre|peu|plat|propos|valoir|");
    },
    _g_cond_g2_226: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nLastToken+1], "|côté|coup|pic|peine|marre|peu|plat|propos|valoir|") && ! g_morph(lToken[nTokenOffset], ">venir/");
    },
    _g_cond_g2_227: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") && ! g_morph(lToken[nLastToken+1], ":Ov|>quo?i/");
    },
    _g_cond_g2_228: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_cond_g2_229: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && ! g_value(lToken[nLastToken-1+1], "|coté|sont|peu|");
    },
    _g_cond_g2_230: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":(?:V.......[_z][az].*:Q|V1.*:Ip:2p)", ":[MGWNY]");
    },
    _g_cond_g2_231: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Ip:2p|Q)", ":N") && ! g_value(lToken[nTokenOffset], "|il|elle|on|n’|les|l’|m’|t’|s’|d’|en|y|lui|nous|vous|leur|");
    },
    _g_cond_g2_232: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":[123][sp]", "*") && ! g_value(lToken[nLastToken-1+1], "|tord|tords|");
    },
    _g_cond_g2_233: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V(?:2.*:I[pqs]:3s|1.*:I[pq]:[123]s)", "*");
    },
    _g_cond_g2_234: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && ! g_value(lToken[nLastToken-1+1], "|sont|peu|") && ! g_value(lToken[nTokenOffset+2], "|peu|tout|toute|tous|toutes|maintenant|");
    },
    _g_cond_g2_235: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|elle|iel|on|n’|m’|t’|l’|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bqu[e’] |n’(?:en|y) +$");
    },
    _g_cond_g2_236: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":N", ":Ov");
    },
    _g_cond_g2_237: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[fe]:[si]|>en/");
    },
    _g_cond_g2_238: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VN]|<start>", "*");
    },
    _g_cond_g2_239: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":Ov|>(?:il|elle)/");
    },
    _g_cond_g2_240: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+3], "|sur|") && g_value(lToken[nTokenOffset], "|tout|par|") && g_value(lToken[nTokenOffset+2], "|coup|"));
    },
    _g_cond_g2_241: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+1], "|à|") && g_value(lToken[nTokenOffset+2], "|tue-tête|"));
    },
    _g_cond_g2_242: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|n’|il|elle|on|y|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)n’en +$");
    },
    _g_cond_g2_243: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|n’|il|elle|on|y|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)n’en +$") && g_morph(lToken[nTokenOffset], ":N");
    },
    _g_cond_g2_244: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset+3], "|accès|bel|bon|bonne|beau|besoin|charge|confiance|connaissance|conscience|crainte|droit|envie|été|faim|force|garde|grand|grande|hâte|honte|interdiction|intérêt|lieu|mauvaise|marre|peine|peur|raison|rapport|recours|soif|tendance|terre|tort|trait|vent|vocation|") && g_morph(lToken[nTokenOffset+1], ":N", "*");
    },
    _g_cond_g2_245: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ">(?:falloir|aller|pouvoir)/", ">que/");
    },
    _g_cond_g2_246: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V.e");
    },
    _g_cond_g2_247: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|d’|") && ! g_tag(lToken[nTokenOffset], "_en_");
    },
    _g_cond_g2_248: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", "*") && ! g_tag(lToken[nTokenOffset], "_en_");
    },
    _g_cond_g2_249: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|du|");
    },
    _g_cond_g2_250: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|les|des|");
    },
    _g_sugg_g2_112: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/scé/g, "cé").replace(/SCÉ/g, "CÉ");
    },
    _g_sugg_g2_113: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/cé/g, "scé").replace(/CÉ/g, "SCÉ");
    },
    _g_sugg_g2_114: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_cond_g2_251: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|,|:D");
    },
    _g_sugg_g2_115: function (lToken, nTokenOffset, nLastToken) {
        return "à "+ lToken[nTokenOffset+2]["sValue"].replace(/on/g, "es").replace(/ON/g, "ES").replace(/otre/g, "os").replace(/OTRE/g, "OS").replace(/eur/g, "eurs").replace(/EUR/g, "EURS") + " dépens";
    },
    _g_sugg_g2_116: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/é/g, "ée").replace(/É/g, "ÉE");
    },
    _g_cond_g2_252: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|du|");
    },
    _g_cond_g2_253: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:cadeau|offrande|présent)");
    },
    _g_cond_g2_254: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|guerre|révolution|");
    },
    _g_da_g2_3: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":N");
    },
    _g_cond_g2_255: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:appeler|considérer|trouver)/");
    },
    _g_cond_g2_256: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|ou|") && g_value(lToken[nLastToken+1], "|son|ses|")) && g_morph(lToken[nTokenOffset+1], ":D");
    },
    _g_cond_g2_257: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] != "SA";
    },
    _g_cond_g2_258: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|oh|ah|") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +et là");
    },
    _g_cond_g2_259: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 0, 0) && ! (g_value(lToken[nTokenOffset+2], "|a|") && g_value(lToken[nLastToken+1], "|été|"));
    },
    _g_cond_g2_260: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nLastToken+1], "|été|");
    },
    _g_cond_g2_261: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken+1], ":[NA].*:f");
    },
    _g_cond_g2_262: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_g2_263: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +en +heure");
    },
    _g_sugg_g2_117: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/o/g, "a").replace(/O/g, "A");
    },
    _g_cond_g2_264: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nTokenOffset+1], "eg1mot") && g_value(lToken[nTokenOffset], "|pronom|"));
    },
    _g_cond_g2_265: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ":[NA]");
    },
    _g_cond_g2_266: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! (g_value(lToken[nTokenOffset], "|pour|") && g_value(lToken[nTokenOffset+2], "|faire|"));
    },
    _g_cond_g2_267: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset+2], "|quelques|");
    },
    _g_cond_g2_268: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|que|qu’|");
    },
    _g_cond_g2_269: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_sugg_g2_118: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/œ/g, "hœ").replace(/Œ/g, "HŒ");
    },
    _g_cond_g2_270: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:D.*:[me]:[si]|R)") && ! g_value(lToken[nTokenOffset], "|à|");
    },
    _g_cond_g2_271: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:D.*:[me]:[pi]|R)", ">à/");
    },
    _g_cond_g2_272: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (lToken[nTokenOffset+3]["sValue"] == "ce" && g_value(lToken[nLastToken+1], "|moment|"));
    },
    _g_sugg_g2_119: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/tt/g, "t").replace(/TT/g, "T");
    },
    _g_cond_g2_273: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":Q|>(?:profiter|bénéficier|nombre|tant|sorte|type)/") && ! g_morph(lToken[nLastToken+1], ">(?:financi[eè]re?|pécuni(?:er|aire)|sociaux)s?/");
    },
    _g_cond_g2_274: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morphVC(lToken[nTokenOffset+1], ">(?:profiter|bénéficier)/") && ! g_morph(lToken[nLastToken+1], ">(?:financière|pécuni(?:er|aire)|sociale)/");
    },
    _g_sugg_g2_120: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/nud/g, "nu").replace(/NUD/g, "NU");
    },
    _g_cond_g2_275: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:D.*:p|B)|>de/");
    },
    _g_cond_g2_276: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|un|une|les|ces|mes|tes|ses|nos|vos|leurs|quelques|plusieurs|");
    },
    _g_cond_g2_277: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasSimil(lToken[nTokenOffset+2]["sValue"], ":[NA].*:[pi]");
    },
    _g_cond_g2_278: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|%|") && ! g_morph(lToken[nTokenOffset], ":B|>(?:pourcent|barre|seuil|aucun|plusieurs|certaine?s|une?)/");
    },
    _g_cond_g2_279: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:approcher|anniversaire|cap|célébration|commémoration|occasion|passage|programme|terme|classe|délai|échéance|autour|celui|ceux|celle|celles)/") && ! g_value(lToken[nLastToken+1], "|de|du|des|d’|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "% +$");
    },
    _g_cond_g2_280: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:approcher|cap|passage|programme|terme|classe|autour|celui|ceux|celle|celles|au-delà)/") && ! g_value(lToken[nLastToken+1], "|de|du|des|d’|") && ! g_value(lToken[nTokenOffset+2], "|35|39|40|48|");
    },
    _g_cond_g2_281: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:approcher|cap|passage|programme|terme|classe|autour|celui|ceux|celle|celles)/") && ! g_value(lToken[nLastToken+1], "|de|du|des|d’|");
    },
    _g_cond_g2_282: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":E");
    },
    _g_sugg_g2_121: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/que/g, "c").replace(/QUE/g, "C");
    },
    _g_cond_g2_283: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":W", ":D");
    },
    _g_sugg_g2_122: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/nd/g, "nt").replace(/ND/g, "NT");
    },
    _g_sugg_g2_123: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/nd/g, "nt").replace(/ND/g, "NT");
    },
    _g_cond_g2_284: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[NA].*:[fe]:[pi]", ":G");
    },
    _g_cond_g2_285: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[DB]") && g_morph(lToken[nTokenOffset+2], ":N", ":[GAWM]");
    },
    _g_cond_g2_286: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|de|d’|des|du|") && ! g_value(g_token(lToken, nLastToken+2), "|de|d’|des|du|");
    },
    _g_cond_g2_287: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D") && g_morph(lToken[nLastToken+1], ":|<end>", ":[NA].*:[me]");
    },
    _g_cond_g2_288: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|que|qu’|sûr|davantage|entendu|d’|avant|souvent|longtemps|des|moins|plus|trop|loin|au-delà|") && ! g_morph(lToken[nLastToken+1], ":[YAW]");
    },
    _g_cond_g2_289: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|j’|il|elle|iel|n’|homme|femme|enfant|bébé|");
    },
    _g_cond_g2_290: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+1], "|emballé|") && g_value(lToken[nLastToken-1+1], "|pesé|")) && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]");
    },
    _g_cond_g2_291: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ">(?:être|voyager|surprendre|venir|arriver|partir|aller)/") || look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "-(?:ils?|elles?|on|je|tu|nous|vous|iels?) +$");
    },
    _g_cond_g2_292: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|avec|sans|quel|quelle|quels|quelles|cet|votre|notre|mon|leur|l’|d’|");
    },
    _g_cond_g2_293: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", ":A");
    },
    _g_cond_g2_294: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|n’|") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2p_");
    },
    _g_sugg_g2_124: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/aim/g, "in").replace(/AIM/g, "IN");
    },
    _g_cond_g2_295: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|ils|ne|n’|en|y|leur|lui|nous|vous|me|te|se|m’|t’|s’|la|le|les|qui|<start>|,|");
    },
    _g_sugg_g2_125: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/f/g, "ph").replace(/F/g, "PH");
    },
    _g_sugg_g2_126: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ph/g, "f").replace(/PH/g, "F").replace(/Ph/g, "F");
    },
    _g_sugg_g2_127: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/c/g, "").replace(/C/g, "");
    },
    _g_sugg_g2_128: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/an/g, "anc").replace(/AN/g, "ANC");
    },
    _g_sugg_g2_129: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/au/g, "o").replace(/AU/g, "O");
    },
    _g_sugg_g2_130: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/o/g, "au").replace(/O/g, "AU");
    },
    _g_cond_g2_296: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", "*");
    },
    _g_cond_g2_297: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "", ":D");
    },
    _g_cond_g2_298: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nLastToken-1+1], "eg1mot") && g_morph(lToken[nTokenOffset+2], ">écrire/"));
    },
    _g_cond_g2_299: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nLastToken-1+1], "eg1mot") && g_morph(lToken[nTokenOffset+3], ">écrire/"));
    },
    _g_cond_g2_300: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nLastToken-1+1], "eg1mot") && g_morph(lToken[nTokenOffset+4], ">écrire/"));
    },
    _g_cond_g2_301: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nLastToken-1+1], "eg1mot") && g_morph(lToken[nTokenOffset+1], ">écrire/"));
    },
    _g_cond_g2_302: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:[123][sp]|Y)", "*") && ! g_value(lToken[nLastToken+1], "|civile|commerciale|froide|mondiale|nucléaire|préventive|psychologique|sainte|totale|") && ! (g_tag(lToken[nTokenOffset+1], "eg1mot") && g_morph(lToken[nTokenOffset], ">écrire/"));
    },
    _g_cond_g2_303: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:f:s");
    },
    _g_sugg_g2_131: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/û/g, "u").replace(/Û/g, "U");
    },
    _g_cond_g2_304: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[123][sp]", ":[GQ]");
    },
    _g_cond_g2_305: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":[123][sp]", ":[GQ]");
    },
    _g_cond_g2_306: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":[123][sp]", ":[GQ]");
    },
    _g_cond_g2_307: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_morph(lToken[nTokenOffset], ":E|>le/");
    },
    _g_sugg_g2_132: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,-2)+"là";
    },
    _g_sugg_g2_133: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-2)+"là";
    },
    _g_cond_g2_308: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":[NA]", 0, -3);
    },
    _g_cond_g2_309: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V...t");
    },
    _g_sugg_g2_134: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-3)+"-la|" + lToken[nTokenOffset+1]["sValue"].slice(0,-3)+" là";
    },
    _g_sugg_g2_135: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-3)+" là";
    },
    _g_sugg_g2_136: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/la-/g, "là-").replace(/LA-/g, "LÀ-");
    },
    _g_cond_g2_310: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D|<start>|,");
    },
    _g_cond_g2_311: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V") && ! g_tag(lToken[nTokenOffset], "_en_");
    },
    _g_cond_g2_312: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">[ld]es/|:R");
    },
    _g_cond_g2_313: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3s");
    },
    _g_cond_g2_314: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C|>[(,]/");
    },
    _g_cond_g2_315: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C|>[(,]/") && g_morph0(lToken[nLastToken-1+1], ":(?:Q|V1.*:Y)", ":N.*:[fe]");
    },
    _g_cond_g2_316: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":(?:Q|V1.*:Y)", ":N.*:[fe]");
    },
    _g_cond_g2_317: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|D)");
    },
    _g_cond_g2_318: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return (lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() || g_value(lToken[nTokenOffset], "|<start>|,|")) && lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_319: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[fe]");
    },
    _g_sugg_g2_137: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ch/g, "g").replace(/CH/g, "G");
    },
    _g_sugg_g2_138: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_cond_g2_320: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|père|");
    },
    _g_cond_g2_321: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|la|les|du|des|au|aux|");
    },
    _g_cond_g2_322: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m:[si]");
    },
    _g_cond_g2_323: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D") && ! g_value(lToken[nLastToken+1], "|depuis|à|");
    },
    _g_cond_g2_324: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]|>(?:grand|petit)/");
    },
    _g_cond_g2_325: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset], ":A.*:m");
    },
    _g_cond_g2_326: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-3+1], ":V");
    },
    _g_cond_g2_327: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V");
    },
    _g_cond_g2_328: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Os|<start>|>[(,]");
    },
    _g_sugg_g2_139: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/o/g, "au").replace(/O/g, "AU");
    },
    _g_cond_g2_329: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ">(?:,|en)/|:D.*:e|<start>");
    },
    _g_sugg_g2_140: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/pé/g, "pê").replace(/Pé/g, "Pê").replace(/PÉ/g, "PÊ");
    },
    _g_sugg_g2_141: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/pé/g, "pê").replace(/Pé/g, "Pê").replace(/PÉ/g, "PÊ");
    },
    _g_cond_g2_330: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":C|<start>");
    },
    _g_cond_g2_331: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|quelqu’|l’|d’|sauf|");
    },
    _g_cond_g2_332: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ">(?:seul|beau)/") && ! g_value(lToken[nTokenOffset], "|je|tu|il|on|ne|n’|");
    },
    _g_cond_g2_333: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:très|en|un|de|du)/");
    },
    _g_sugg_g2_142: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/n/g, "nt").replace(/N/g, "NT");
    },
    _g_cond_g2_334: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":[AQ]");
    },
    _g_cond_g2_335: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[123][sp]", ":V0a");
    },
    _g_cond_g2_336: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|la|en|une|") && ! g_value(lToken[nLastToken+1], "|position|dance|");
    },
    _g_sugg_g2_143: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/o/g, "ô").replace(/O/g, "Ô");
    },
    _g_cond_g2_337: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":[AW]");
    },
    _g_cond_g2_338: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":Y|<start>");
    },
    _g_sugg_g2_144: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/om/g, "au").replace(/OM/g, "AU");
    },
    _g_sugg_g2_145: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/au/g, "om").replace(/AU/g, "OM");
    },
    _g_sugg_g2_146: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/t/g, "g").replace(/T/g, "G");
    },
    _g_cond_g2_339: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A") && g_morph(lToken[nTokenOffset], ":D");
    },
    _g_sugg_g2_147: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/t/g, "g").replace(/T/g, "G");
    },
    _g_sugg_g2_148: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/g/g, "t").replace(/G/g, "T");
    },
    _g_cond_g2_340: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D|<start>|>[(,]");
    },
    _g_cond_g2_341: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|peu|de|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bau plus $");
    },
    _g_cond_g2_342: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D") && ! g_morph(g_token(lToken, nTokenOffset+1-2), ">obtenir/");
    },
    _g_cond_g2_343: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[pm]");
    },
    _g_cond_g2_344: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[mp]|<start>|>[(,]");
    },
    _g_cond_g2_345: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:arriver|venir|à|revenir|partir|repartir|aller|de)/") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +([mts]on|[nv]otre|leur) tour[, ]");
    },
    _g_cond_g2_346: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:arriver|venir|à|revenir|partir|repartir|aller|de)/");
    },
    _g_cond_g2_347: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|à|au|aux|");
    },
    _g_cond_g2_348: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ ne s(?:ai[st]|u[ts]|avai(?:s|t|ent)|urent) ");
    },
    _g_cond_g2_349: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ">(?:déduire|penser)/");
    },
    _g_cond_g2_350: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|en|ne|n’|") && g_morph(lToken[nLastToken+1], ":V0e")) && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ *(?:a|avait|eut|eût|aura|aurait) +(?:pas|) +été");
    },
    _g_cond_g2_351: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! (g_morph(lToken[nTokenOffset+2], ">(?:pouvoir|devoir|aller)/") && (g_morph(lToken[nLastToken+1], ":V0e") || g_morph(g_token(lToken, nLastToken+2), ":V0e"))) && ! (g_morph(lToken[nTokenOffset+2], ":V0a") && g_value(lToken[nLastToken+1], "|été|"));
    },
    _g_cond_g2_352: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|en|ne|") && g_morph(lToken[nLastToken+1], ":V0e"));
    },
    _g_sugg_g2_149: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/éson/g, "aison").replace(/ÉSON/g, "AISON");
    },
    _g_sugg_g2_150: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/è/g, "ai").replace(/È/g, "AI");
    },
    _g_sugg_g2_151: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/ai/g, "è").replace(/AI/g, "È");
    },
    _g_sugg_g2_152: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ai/g, "è").replace(/AI/g, "È");
    },
    _g_cond_g2_353: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[me]:[pi]");
    },
    _g_cond_g2_354: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:R|[123][sp])|<start>");
    },
    _g_sugg_g2_153: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/cen/g, "sen").replace(/Cen/g, "Sen").replace(/CEN/g, "SEN");
    },
    _g_cond_g2_355: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":(?:[123]s|Q)");
    },
    _g_cond_g2_356: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":(?:[123]p|Y|P)");
    },
    _g_cond_g2_357: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset], "|ne|il|ils|on|");
    },
    _g_sugg_g2_154: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[AWGT]", true);
    },
    _g_cond_g2_358: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && ! g_value(lToken[nTokenOffset], "|ne|il|ils|on|") && ! (g_morph(lToken[nTokenOffset+2], ":V0") && g_morph(lToken[nTokenOffset+3], ":[QY]"));
    },
    _g_cond_g2_359: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-2+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+2], ":M");
    },
    _g_cond_g2_360: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]");
    },
    _g_cond_g2_361: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]");
    },
    _g_cond_g2_362: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":3p");
    },
    _g_cond_g2_363: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nLastToken-1+1], "|soit|") && look(sSentence.slice(lToken[nLastToken]["nEnd"]), " soit "));
    },
    _g_cond_g2_364: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":[GY]|<end>", ">à/") && ! g_value(lToken[nTokenOffset], "|il|on|elle|iel|n’|m’|t’|s’|nous|vous|lui|leur|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)quel(?:s|les?|) qu[’ ]$") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " soit ");
    },
    _g_cond_g2_365: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " soit ");
    },
    _g_cond_g2_366: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[YQ]|>(?:avec|contre|par|pour|sur)/|<start>|>[(,]");
    },
    _g_cond_g2_367: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], "[123][sp]");
    },
    _g_cond_g2_368: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:V|Cs|R)", ":(?:[NA].*:[pi]|Ov)") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_cond_g2_369: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ils|elles|iels|leur|lui|nous|vous|m’|t’|s’|l’|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_g2_370: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m:s");
    },
    _g_cond_g2_371: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[me]:[si]");
    },
    _g_cond_g2_372: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[DA].*:[fe]:[si]");
    },
    _g_sugg_g2_155: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/u/g, "û").replace(/U/g, "Û");
    },
    _g_sugg_g2_156: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/u/g, "û").replace(/U/g, "Û");
    },
    _g_sugg_g2_157: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-2+1]["sValue"].replace(/u/g, "û").replace(/U/g, "Û");
    },
    _g_cond_g2_373: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|temps|") && g_value(lToken[nTokenOffset], "|temps|"));
    },
    _g_cond_g2_374: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nLastToken+1], "|tel|tels|telle|telles|");
    },
    _g_cond_g2_375: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|tu|il|elle|iel|on|ne|n’|le|la|les|l’|me|m’|te|t’|se|s’|");
    },
    _g_sugg_g2_158: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/au/g, "ô").replace(/AU/g, "Ô");
    },
    _g_sugg_g2_159: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/è/g, "ê").replace(/È/g, "Ê");
    },
    _g_cond_g2_376: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nTokenOffset+2], ">trait/") && g_morph(lToken[nTokenOffset+3], ">(?:facial|vertical|horizontal|oblique|diagonal)/"));
    },
    _g_cond_g2_377: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:D|A.*:m)");
    },
    _g_cond_g2_378: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isTitle() && ! g_morph(lToken[nTokenOffset], ":(?:O[vs]|X)|>(?:aller|falloir|pouvoir|savoir|vouloir|préférer|faire|penser|imaginer|souhaiter|désirer|espérer|de|à)/");
    },
    _g_cond_g2_379: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|part|");
    },
    _g_cond_g2_380: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">agir/");
    },
    _g_cond_g2_381: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "eg1mot") && ! g_morph(lToken[nLastToken-1+1], ">chose/");
    },
    _g_cond_g2_382: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|j’|n’|il|elle|on|tu|");
    },
    _g_cond_g2_383: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|avenu|");
    },
    _g_cond_g2_384: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|avenue|");
    },
    _g_cond_g2_385: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|avenus|");
    },
    _g_cond_g2_386: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|avenues|");
    },
    _g_cond_g2_387: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].toLowerCase() != lToken[nLastToken-1+1]["sValue"].toLowerCase();
    },
    _g_cond_g2_388: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].toLowerCase() != lToken[nLastToken-2+1]["sValue"].toLowerCase();
    },
    _g_sugg_g2_160: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g2_161: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,-1);
    },
    _g_cond_g2_389: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_value(lToken[nLastToken+1], "|saint|");
    },
    _g_sugg_g2_162: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].toLowerCase();
    },
    _g_cond_g2_390: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && ! g_value(lToken[nLastToken+1], "|gras|saint|");
    },
    _g_cond_g2_391: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":M1") && ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase();
    },
    _g_cond_g2_392: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].gl_isUpperCase();
    },
    _g_cond_g2_393: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] == "assemblée";
    },
    _g_cond_g2_394: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset], ":[DA]") && ! g_morph(lToken[nLastToken+1], ":A|>(?:d[eu’]|des)/");
    },
    _g_cond_g2_395: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_396: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] == "état";
    },
    _g_cond_g2_397: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"] == "états";
    },
    _g_cond_g2_398: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"] == "état";
    },
    _g_cond_g2_399: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"] == "état";
    },
    _g_cond_g2_400: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,1) == "é";
    },
    _g_sugg_g2_163: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/é/g, "É");
    },
    _g_cond_g2_401: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_402: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|<start>|");
    },
    _g_cond_g2_403: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0e");
    },
    _g_cond_g2_404: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isTitle() && g_morph(lToken[nTokenOffset], ":N", ":(?:A|V0e|D|R|B|X)");
    },
    _g_sugg_g2_164: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].toLowerCase();
    },
    _g_cond_g2_405: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() && ! g_value(lToken[nTokenOffset+1], "|canadienne|canadiennes|malaise|malaises|avare|avares|") && ( g_value(lToken[nTokenOffset], "|certains|certaines|maints|maintes|ce|cet|cette|ces|des|les|nos|vos|leurs|quelques|plusieurs|chaque|une|aux|la|ma|ta|sa|quel|quelle|quels|quelles|") || ( g_value(lToken[nTokenOffset], "|le|") && g_morph(lToken[nTokenOffset+1], ":N.*:[me]:[si]", "#L") ) || ( g_value(lToken[nTokenOffset], "|l’|") && g_morph(lToken[nTokenOffset+1], ":N.*:[si]", "#L") ) || ( g_value(lToken[nTokenOffset], "|de|d’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ">(?:action|armée|assassinat|attente|bataillon|beaucoup|bus|car|centaine|combien|communauté|complot|couple|descendant|dizaine|douzaine|duel|désir|d[eé]sid[eé]rata|enlèvement|émigration|énormément|équipe|exigence|famille|groupe|génération|immigration|invasion|majorité|meurtre|millier|million|moins|multitude|parole|pas|photo|plus|poignée|portrait|pourcentage|proportion|quart|rassemblement|rencontre|reportage|souhait|tant|tellement|tiers|trio|trop|témoignage|vie|viol|volonté|vote)/") ) || ( g_value(lToken[nTokenOffset], "|un|") && ! g_value(g_token(lToken, nTokenOffset+1-2), "|dans|numéro|") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "(?:aisé|approximatif|argotique|baragouiné|correct|courant|facile|haché|impeccable|incompréhensible|parfait|prononcé)") ) || ( g_morph(lToken[nTokenOffset], ":B:.:p") && ! g_morph(g_token(lToken, nTokenOffset+1-2), ">numéro/") ) );
    },
    _g_sugg_g2_165: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].gl_toCapitalize();
    },
    _g_cond_g2_406: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+3]["sValue"].gl_isUpperCase();
    },
    _g_sugg_g2_166: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].toLowerCase();
    },
    _g_cond_g2_407: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+2]["sValue"].gl_isUpperCase()) && (lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() || ! lToken[nTokenOffset+2]["sValue"].gl_isLowerCase());
    },
    _g_sugg_g2_167: function (lToken, nTokenOffset, nLastToken) {
        return "Homo " + lToken[nTokenOffset+2]["sValue"].toLowerCase();
    },
    _g_cond_g2_408: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|idaltu|sapiens|") && ! (lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+2]["sValue"].gl_isUpperCase()) && (lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() || ! lToken[nTokenOffset+2]["sValue"].gl_isLowerCase());
    },
    _g_cond_g2_409: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (lToken[nTokenOffset+1]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+2]["sValue"].gl_isUpperCase() && lToken[nTokenOffset+3]["sValue"].gl_isUpperCase()) && (lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() || ! lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() || ! lToken[nTokenOffset+3]["sValue"].gl_isLowerCase());
    },
    _g_sugg_g2_168: function (lToken, nTokenOffset, nLastToken) {
        return "Homo " + lToken[nTokenOffset+2]["sValue"].toLowerCase() + " " + lToken[nTokenOffset+3]["sValue"].toLowerCase();
    },
    _g_sugg_g2_169: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].gl_toCapitalize();
    },
    _g_sugg_g2_170: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+4]["sValue"].gl_toCapitalize();
    },
    _g_cond_g2_410: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() && lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g2_171: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].gl_toCapitalize();
    },
    _g_cond_g2_411: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g2_412: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:D.*:p|R|C)");
    },
    _g_cond_g2_413: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>,|:(?:[NA]|[12]s)", ":(?:3[sp]|[12]p)");
    },
    _g_cond_g2_414: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|du|avant|après|malgré|");
    },
    _g_cond_g2_415: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasFemForm(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_sugg_g2_172: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_cond_g2_416: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":", ":(?:R|3[sp]|[12]p|Q)|>(?:[nv]ous|eux)/");
    },
    _g_cond_g2_417: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasFemForm(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g2_173: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_sugg_g2_174: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_sugg_g2_175: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_sugg_g2_176: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_cond_g2_418: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":R", ":D.*:p");
    },
    _g_sugg_g2_177: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g2_419: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":R");
    },
    _g_sugg_g2_178: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_sugg_g2_179: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_cond_g2_420: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:p");
    },
    _g_sugg_g2_180: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g2_421: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:p");
    },
    _g_cond_g2_422: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f:s");
    },
    _g_sugg_g2_181: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g2_423: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:s");
    },
    _g_cond_g2_424: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+1], "|que|qu’|") && g_value(lToken[nLastToken-1+1], "|jamais|")) && ! (g_value(lToken[nLastToken-1+1], "|pas|") && g_value(lToken[nLastToken+1], "|mal|"));
    },
    _g_cond_g2_425: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ">[aâeéêiîoôuœæ]");
    },
    _g_cond_g2_426: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+1], "|que|qu’|") && g_value(lToken[nLastToken-1+1], "|jamais|")) && ! (g_value(lToken[nLastToken-1+1], "|pas|") && g_value(lToken[nLastToken+1], "|mal|")) && g_morph(lToken[nTokenOffset+3], ">[aâeéêiîoôuœæ]");
    },
    _g_cond_g2_427: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|guerre|guerres|");
    },
    _g_cond_g2_428: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":V");
    },
    _g_sugg_g2_182: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+3]["sValue"], ":E", ":2p");
    },
    _g_sugg_g2_183: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:p");
    },
    _g_sugg_g2_184: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:s");
    },
    _g_sugg_g2_185: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:p");
    },
    _g_cond_g2_429: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V[123].*:Iq.*:[32]s");
    },
    _g_sugg_g2_186: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g2_430: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|n’importe|ce|se|") && ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_sugg_g2_187: function (lToken, nTokenOffset, nLastToken) {
        return "l’a " + suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:s") + "|la " + lToken[nTokenOffset+3]["sValue"].slice(0,-2) + "ait";
    },
    _g_cond_g2_431: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-2+1]["sValue"].gl_isDigit() && lToken[nLastToken-2+1]["sValue"] != "1" && lToken[nLastToken-2+1]["sValue"] != "01";
    },
    _g_cond_g2_432: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":A.*:[me]:[pi]");
    },
    _g_cond_g2_433: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":A.*:[fe]:[pi]") && ! (g_value(lToken[nLastToken-1+1], "|année|") && re.search("^[0-9]+$", lToken[nLastToken+1]["sValue"]));
    },
    _g_cond_g2_434: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":A.*:[fe]:[pi]");
    },
    _g_cond_g2_435: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|d’|") && ( g_morph(lToken[nLastToken+1], ">[,)]|<end>|:(?:Ov|3[sp])", ":D") || ( g_value(lToken[nLastToken+1], "|le|la|l’|leur|les|") && g_morph(g_token(lToken, nLastToken+2), ":V", ":[NAQ]") ) );
    },
    _g_cond_g2_436: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nLastToken+1], "|fait|") && g_value(g_token(lToken, nLastToken+2), "|de|d’|") && g_morph(lToken[nTokenOffset], ">avoir/"));
    },
    _g_da_g2_4: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":LP");
    },
    _g_da_g2_5: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":G:R:ÉR");
    },
    _g_cond_g2_437: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|que|qu’|");
    },
    _g_cond_g2_438: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ne|n’|");
    },
    _g_da_g2_6: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":GN:m:p");
    },
    _g_cond_g2_439: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NV]", ":A:[em]:[is]");
    },
    _g_da_g2_7: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], "", ":N");
    },
    _g_cond_g2_440: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|une|la|cet|cette|ma|ta|sa|notre|votre|leur|de|quelque|certaine|");
    },
    _g_cond_g2_441: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":E");
    },
    _g_da_g2_8: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ">numéro/:N:f:s");
    },
    _g_cond_g2_442: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[NA]", ":G", 0, -3);
    },
    _g_tp_g2_3: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-3);
    },
    _g_da_g2_9: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":B:e:p");
    },
    _g_da_g2_10: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":B:m:p");
    },
    _g_da_g2_11: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":B:f:p");
    },
    _g_cond_g2_443: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|d’|");
    },
    _g_cond_g2_444: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NAQR]|>que/");
    },
    _g_cond_g2_445: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":V0");
    },
    _g_cond_g2_446: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":V0") && ! g_morph(lToken[nLastToken+1], ":(?:Ov|3s)");
    },
    _g_cond_g2_447: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":V0") && ! g_morph(lToken[nLastToken+1], ":(?:Ov|1p)");
    },
    _g_cond_g2_448: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":V0") && ! g_morph(lToken[nLastToken+1], ":(?:Ov|2p)");
    },
    _g_cond_g2_449: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":V0") && ! g_morph(lToken[nLastToken+1], ":(?:Ov|3p)");
    },
    _g_cond_g2_450: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V[123]");
    },
    _g_cond_g2_451: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]:[si]");
    },
    _g_cond_g2_452: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":A");
    },
    _g_cond_g2_453: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":Ov|>(?:il|on|elle)|>d’");
    },
    _g_cond_g2_454: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|en|de|d’|");
    },
    _g_cond_g2_455: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:X|Ov)") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_2s_");
    },
    _g_cond_g2_456: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[me]:[si]");
    },
    _g_cond_g2_457: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[fe]:[si]");
    },
    _g_cond_g2_458: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[me]:[pi]");
    },
    _g_cond_g2_459: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[fe]:[pi]");
    },
    _g_cond_g2_460: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:D.*:p|N|V)");
    },
    _g_cond_g2_461: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:f:[si]");
    },
    _g_cond_g2_462: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:R|C[sc])");
    },
    _g_cond_g2_463: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[AW]") && ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_cond_g2_464: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:V|N:f)", ":G");
    },
    _g_cond_g2_465: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NV]", ":D.*:[fe]:[si]");
    },
    _g_cond_g2_466: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset], "|recettes|réponses|solutions|");
    },
    _g_cond_g2_467: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":N") && ! g_morph(lToken[nTokenOffset], ":Os");
    },
    _g_da_g2_12: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":[NA]");
    },
    _g_da_g2_13: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":N");
    },
    _g_cond_g2_468: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":G") && ! g_morph(lToken[nLastToken+1], ":A.*:[me]:[si]");
    },
    _g_cond_g2_469: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":G") && ! g_morph(lToken[nLastToken+1], ":A.*:[fe]:[si]");
    },
    _g_cond_g2_470: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:N|A|Q|W|V0e)", ":D");
    },
    _g_cond_g2_471: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[NA]", ":D");
    },
    _g_cond_g2_472: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset], ":D|>(?:être|devenir|redevenir|rester|sembler|demeurer|para[îi]tre)");
    },
    _g_da_g2_14: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+1], ":A:e:i");
    },
    _g_cond_g2_473: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isTitle() && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) || re.search("^[MDCLXVI]+$", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g2_474: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isTitle();
    },
    _g_cond_g2_475: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"].gl_isTitle();
    },
    _g_cond_g2_476: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isTitle() && lToken[nTokenOffset+4]["sValue"].gl_isTitle();
    },
    _g_cond_g2_477: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"] != "1" && g_morph(lToken[nTokenOffset+1], ":M[12]");
    },
    _g_cond_g2_478: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":M[12]") && g_morph(lToken[nTokenOffset+3], ":M[12]");
    },
    _g_cond_g2_479: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":1s");
    },
    _g_cond_g2_480: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":2s");
    },
    _g_cond_g2_481: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":3s");
    },
    _g_cond_g2_482: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":3p");
    },
    _g_da_g2_15: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":ÉV");
    },
    _g_da_g2_16: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+3], ":ÉV");
    },
    _g_cond_g2_483: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|rester)/");
    },
    _g_cond_g2_484: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":[QY]");
    },
    _g_cond_g2_485: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|rester)") && g_morph(lToken[nLastToken+1], ":[QY]");
    },
    _g_cond_g2_486: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:V0e|N)") && g_morph(lToken[nLastToken+1], ":[AQ]");
    },
    _g_cond_g2_487: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0a");
    },
    _g_cond_g2_488: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0a") && g_morph(lToken[nLastToken+1], ":[QY]");
    },
    _g_cond_g2_489: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VW]", ":G");
    },
    _g_cond_g2_490: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return !(g_value(lToken[nTokenOffset+2], "|fois|") && g_value(lToken[nTokenOffset], "|à|"));
    },
    _g_cond_g2_491: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V");
    },
    _g_cond_g2_492: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|de|d’|des|du|");
    },
    _g_cond_g2_493: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":[AQW]");
    },
    _g_cond_g2_494: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|un|le|ce|du|mon|ton|son|notre|votre|leur|");
    },
    _g_cond_g2_495: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|bien|") && g_value(lToken[nLastToken+1], "|que|qu’|")) && ! g_value(lToken[nTokenOffset+2], "|tant|");
    },
    _g_cond_g2_496: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":Q:A");
    },
    _g_da_g2_17: function (lToken, nTokenOffset, nLastToken) {
        return g_rewrite(lToken[nTokenOffset+2], ":V[^:]+:Q", "", true);
    },
    _g_cond_g2_497: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":A", ":G");
    },
    _g_cond_g2_498: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":A", ":(?:A.*:[me]:[si]|G)");
    },
    _g_cond_g2_499: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:(?:m:s|[me]:p)");
    },
    _g_cond_g2_500: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":W", ":3p");
    },
    _g_cond_g2_501: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":W", ":A");
    },
    _g_cond_g2_502: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:m");
    },
    _g_cond_g2_503: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":W", ":(?:3p|N)");
    },
    _g_cond_g2_504: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":W", "*");
    },
    _g_cond_ig12a_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":C");
    },
    _g_da_ig12a_1: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":V");
    },
    _g_cond_ig12a_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":D");
    },
    _g_cond_ig12a_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_ig12a_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":V");
    },
    _g_cond_ig12a_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":N");
    },
    _g_cond_ig12a_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", ":G");
    },
    _g_cond_ig12a_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|tu|n’|il|on|elle|iel|");
    },
    _g_cond_ig12a_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|j’|tu|il|elle|iel|on|n’|");
    },
    _g_cond_ig12a_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|de|du|d’|des|");
    },
    _g_cond_ig12a_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_cond_ig12a_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ça|cela|ceci|me|m’|te|t’|lui|nous|vous|leur|ne|n’|");
    },
    _g_cond_ig12a_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|il|ne|n’|");
    },
    _g_cond_ig12a_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D") && ! g_morph(lToken[nLastToken+1], ":A.*:[fe]:[si]");
    },
    _g_cond_ig12a_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[123]p") || (lToken[nTokenOffset+1]["sValue"] == "fait" && g_value(lToken[nTokenOffset], "|on|"));
    },
    _g_cond_ig12a_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[123]p");
    },
    _g_cond_ig12a_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[123]s");
    },
    _g_cond_ig12b_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", ":(?:G|123[sp]|P|A)") && g_morph(lToken[nTokenOffset+4], ":N", ":(?:G|123[sp]|P|A)") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_da_ig12b_1: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], queryNamesPOS(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+4]["sValue"]));
    },
    _g_cond_ig12b_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_cond_ig12b_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", ":(?:G|123[sp]|P)") && g_morph(lToken[nTokenOffset+4], ":N", ":(?:G|123[sp]|P)") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_cond_ig12b_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N", ":G") && g_morph(lToken[nTokenOffset+4], ":N", ":G") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_cond_ig12b_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[me]:[pi]", ":(?:G|[23]p)") && g_morph(lToken[nTokenOffset+4], ":N.*:[me]:[pi]", ":(?:G|[23]p)") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_da_ig12b_2: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":N:m:p");
    },
    _g_cond_ig12b_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[me]:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":N.*:[me]:[pi]", ":G") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_cond_ig12b_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[fe]:[pi]", ":(?:G|[23]p)") && g_morph(lToken[nTokenOffset+4], ":N.*:[fe]:[pi]", ":(?:G|[23]p)") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_da_ig12b_3: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":N:f:p");
    },
    _g_cond_ig12b_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[fe]:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":N.*:[fe]:[pi]", ":G") && ! g_morph(lToken[nLastToken+1], ":[NA]");
    },
    _g_cond_ig12b_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|que|qu’|");
    },
    _g_cond_ig12b_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-3+1], ":[123][sp]");
    },
    _g_da_ig12b_4: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-2+1], ":D") && g_select(lToken[nLastToken-1+1], "", ":[123][sp]");
    },
    _g_cond_ig12b_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]", ":(?:G|V0)") && g_morph(lToken[nTokenOffset+4], ":[NA]", ":(?:[PG]|V[023])");
    },
    _g_da_ig12b_5: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+4], "", ":V");
    },
    _g_cond_ig12b_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":p") && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":(?:G|V0)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", ":(?:[PGQ]|V[023])");
    },
    _g_cond_ig12b_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":s") && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", ":(?:G|V0)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:s", ":(?:[PGQ]|V[023])") && ! g_morph(lToken[nTokenOffset+5], ":A.*:[si]");
    },
    _g_cond_ig12b_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NAY]") && ! (g_morph(lToken[nLastToken-1+1], ":Y") && g_morph(lToken[nLastToken-2+1], ":Ov"));
    },
    _g_da_ig12b_6: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], ":[NAY]") && g_select(lToken[nLastToken-1+1], ":[NA]");
    },
    _g_cond_ig12b_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]") && g_morph(lToken[nTokenOffset+4], ":[NA]") && ! (g_morph(lToken[nLastToken-1+1], ":Y") && g_morph(lToken[nLastToken-2+1], ":Ov"));
    },
    _g_da_ig12b_7: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], "", ":V");
    },
    _g_cond_ig12b_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), ":O[vs]");
    },
    _g_da_ig12b_8: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":A") && g_select(lToken[nTokenOffset+3], "", ":V");
    },
    _g_da_ig12b_9: function (lToken, nTokenOffset, nLastToken) {
        return g_define(lToken[nTokenOffset+2], ":ÉV");
    },
    _g_cond_ig12b_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|avoir|avoirs|") && ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_da_ig12b_10: function (lToken, nTokenOffset, nLastToken) {
        return g_rewrite(lToken[nTokenOffset+2], ":A", "");
    },
    _g_cond_ig12b_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|être|êtres|") && ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_da_ig12b_11: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], "", ":A");
    },
    _g_cond_ig12b_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V") && ! g_value(lToken[nLastToken+1], "|qui|de|d’|ne|n’|");
    },
    _g_cond_ig12b_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|qui|de|d’|");
    },
    _g_cond_ig12b_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nTokenOffset], ":V0a") && g_value(lToken[nLastToken+1], "|fait|"));
    },
    _g_da_g3_1: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Q") && g_select(lToken[nTokenOffset+3], ":Q");
    },
    _g_da_g3_2: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Y");
    },
    _g_da_g3_3: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":V") && g_select(lToken[nTokenOffset+2], ":Q") && g_select(lToken[nLastToken-1+1], ":Y");
    },
    _g_da_g3_4: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Q");
    },
    _g_cond_g3_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0");
    },
    _g_da_g3_5: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":Q");
    },
    _g_da_g3_6: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Os") && g_select(lToken[nLastToken-3+1], ":Ov") && g_select(lToken[nLastToken-1+1], ":Q");
    },
    _g_da_g3_7: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":Ov");
    },
    _g_da_g3_8: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":V");
    },
    _g_da_g3_9: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-2+1], ":V") && g_select(lToken[nLastToken-1+1], ":Q");
    },
    _g_da_g3_10: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], "", ":E");
    },
    _g_da_g3_11: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Os") && g_select(lToken[nLastToken-1+1], ":[ISK].*:1p");
    },
    _g_da_g3_12: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Os") && g_select(lToken[nLastToken-1+1], ":[ISK].*:2p");
    },
    _g_da_g3_13: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-2+1], ":Ov") && g_select(lToken[nLastToken-1+1], ":3s");
    },
    _g_da_g3_14: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":V");
    },
    _g_da_g3_15: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ">être");
    },
    _g_cond_g3_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V");
    },
    _g_da_g3_16: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+1], ":X");
    },
    _g_da_g3_17: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nLastToken-1+1], ":R");
    },
    _g_cond_g3_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ">avoir/");
    },
    _g_cond_g3_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"] != "A" && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_àCOI_") && ! g_value(lToken[nLastToken+1], "|été|");
    },
    _g_cond_g3_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_propsub_") && ! g_morph(lToken[nTokenOffset+1], ":[YNA]") && ! g_value(lToken[nLastToken+1], "|été|");
    },
    _g_cond_g3_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"] != "A" && ! g_tag(lToken[nLastToken-1+1], "eg1mot") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_propsub_") && ! g_morph(lToken[nLastToken+1], ":Q");
    },
    _g_cond_g3_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|rendez-vous|");
    },
    _g_cond_g3_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]");
    },
    _g_cond_g3_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_value(lToken[nTokenOffset], "|tout|d’|l’|");
    },
    _g_cond_g3_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_1s_");
    },
    _g_cond_g3_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_sugg_g3_1: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/â/g, "a").replace(/Â/g, "A");
    },
    _g_sugg_g3_2: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_sugg_g3_3: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/oc/g, "o");
    },
    _g_sugg_g3_4: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/oc/g, "o");
    },
    _g_sugg_g3_5: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/ro/g, "roc");
    },
    _g_cond_g3_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">faire");
    },
    _g_sugg_g3_6: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ai/g, "è").replace(/Ai/g, "È").replace(/AI/g, "È");
    },
    _g_cond_g3_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":Y");
    },
    _g_sugg_g3_7: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/auspice/g, "hospice");
    },
    _g_sugg_g3_8: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/auspice/g, "hospice").replace(/Auspice/g, "Hospice");
    },
    _g_sugg_g3_9: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/âill/g, "ay").replace(/aill/g, "ay").replace(/ÂILL/g, "AY").replace(/AILL/g, "AY");
    },
    _g_sugg_g3_10: function (lToken, nTokenOffset, nLastToken) {
        return "arrière-"+lToken[nTokenOffset+2]["sValue"].replace(/c/g, "").replace(/C/g, "");
    },
    _g_sugg_g3_11: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/c/g, "").replace(/C/g, "");
    },
    _g_cond_g3_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +des accusés");
    },
    _g_sugg_g3_12: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/an/g, "anc").replace(/AN/g, "ANC");
    },
    _g_sugg_g3_13: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/an/g, "anc").replace(/AN/g, "ANC");
    },
    _g_cond_g3_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return (g_morph(lToken[nLastToken+1], ":[AQR]") || g_morph(lToken[nTokenOffset], ":V", ":V.e")) && ! g_value(lToken[nLastToken+1], "|que|qu’|sûr|");
    },
    _g_cond_g3_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_propsub_") && g_morph(lToken[nTokenOffset], ":V");
    },
    _g_sugg_g3_14: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ite/g, "itte");
    },
    _g_sugg_g3_15: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/itte/g, "ite");
    },
    _g_sugg_g3_16: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/itte/g, "ite");
    },
    _g_sugg_g3_17: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ane/g, "anne");
    },
    _g_sugg_g3_18: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+4]["sValue"].replace(/ane/g, "anne");
    },
    _g_cond_g3_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|Cannes|CANNES|");
    },
    _g_cond_g3_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>[,(]");
    },
    _g_cond_g3_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|>[,(]") && ! (g_value(lToken[nTokenOffset+1], "|c’|") && g_value(lToken[nTokenOffset+2], "|en|"));
    },
    _g_cond_g3_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":C|<start>|>[,(]");
    },
    _g_cond_g3_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A");
    },
    _g_sugg_g3_19: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/omp/g, "on").replace(/OMP/g, "ON");
    },
    _g_sugg_g3_20: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/omt/g, "ompt").replace(/OMT/g, "OMPT").replace(/ont/g, "ompt").replace(/ONT/g, "OMPT");
    },
    _g_cond_g3_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|ils|elles|iels|ne|eux|");
    },
    _g_sugg_g3_21: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/nt/g, "mp").replace(/NT/g, "MP");
    },
    _g_cond_g3_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:avoir|accorder|donner|laisser|offrir)/");
    },
    _g_sugg_g3_22: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ô/g, "o").replace(/Ô/g, "O");
    },
    _g_cond_g3_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|un|les|des|ces|");
    },
    _g_sugg_g3_23: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/sens/g, "cens").replace(/Sens/g, "Cens").replace(/SENS/g, "CENS");
    },
    _g_sugg_g3_24: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/cens/g, "sens").replace(/Cens/g, "Sens").replace(/CENS/g, "SENS");
    },
    _g_cond_g3_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VR]");
    },
    _g_sugg_g3_25: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/o/g, "ô").replace(/tt/g, "t");
    },
    _g_cond_g3_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":Q");
    },
    _g_sugg_g3_26: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ô/g, "o").replace(/tt/g, "t");
    },
    _g_sugg_g3_27: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ô/g, "o").replace(/t/g, "tt");
    },
    _g_cond_g3_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|ces|");
    },
    _g_sugg_g3_28: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/t/g, "tt").replace(/T/g, "TT");
    },
    _g_cond_g3_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:f");
    },
    _g_sugg_g3_29: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/tt/g, "t").replace(/TT/g, "T");
    },
    _g_sugg_g3_30: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ssa/g, "ça").replace(/ss/g, "c").replace(/SSA/g, "ÇA").replace(/SS/g, "C");
    },
    _g_cond_g3_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":Q");
    },
    _g_sugg_g3_31: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/ssa/g, "ça").replace(/ss/g, "c").replace(/SSA/g, "ÇA").replace(/SS/g, "C");
    },
    _g_sugg_g3_32: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/nud/g, "nu").replace(/NUD/g, "NU");
    },
    _g_sugg_g3_33: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/escell/g, "écel").replace(/essell/g, "écel").replace(/ESCELL/g, "ÉCEL").replace(/ESSELL/g, "ÉCEL");
    },
    _g_sugg_g3_34: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/escell/g, "écel").replace(/essell/g, "écel").replace(/ESCELL/g, "ÉCEL").replace(/ESSELL/g, "ÉCEL");
    },
    _g_cond_g3_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g3_35: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/imm/g, "ém").replace(/Imm/g, "Ém");
    },
    _g_cond_g3_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D");
    },
    _g_sugg_g3_36: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/imm/g, "ém").replace(/Imm/g, "Ém");
    },
    _g_sugg_g3_37: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/émi/g, "immi").replace(/Émi/g, "Immi");
    },
    _g_sugg_g3_38: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/end/g, "ind").replace(/End/g, "Ind").replace(/END/g, "IND");
    },
    _g_sugg_g3_39: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/end/g, "ind").replace(/End/g, "Ind").replace(/END/g, "IND");
    },
    _g_sugg_g3_40: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ind/g, "end").replace(/Ind/g, "End").replace(/IND/g, "END");
    },
    _g_cond_g3_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && g_morph(lToken[nTokenOffset+2], ":N", ":[AG]");
    },
    _g_cond_g3_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && g_morph(lToken[nTokenOffset+2], ":N.*:[fe]");
    },
    _g_cond_g3_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && g_morph(lToken[nTokenOffset+2], ":N", ":A.*:[me]:[si]");
    },
    _g_cond_g3_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+3], ":N", ":[AG]");
    },
    _g_cond_g3_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]");
    },
    _g_cond_g3_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:C||>[(,]/") && ( (g_morph(lToken[nTokenOffset+2], ":N", "*") && g_morph(lToken[nTokenOffset+3], ":A")) || (g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+3], ":N", ":A.*:[me]:[si]")) );
    },
    _g_cond_g3_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:abandonner|céder|résister)/") && ! g_value(lToken[nLastToken+1], "|de|d’|");
    },
    _g_cond_g3_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[is]", ":G") && g_morph(lToken[nLastToken-2+1], ":[QA]", ":M") && lToken[nLastToken-2+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:[is]", ":[GA]") && g_morph(lToken[nLastToken-2+1], ":[QA]", ":M") && lToken[nLastToken-2+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M", ":[GA]") && g_morph(lToken[nLastToken-2+1], ":[QA]", ":M") && lToken[nLastToken-2+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:m:[si]", ":(?:[AWG]|V0a)") && g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]");
    },
    _g_cond_g3_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:f:[si]", ":(?:[AWG]|V0a)") && g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]");
    },
    _g_cond_g3_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:[pi]", ":(?:[AWG]|V0a)") && g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]");
    },
    _g_cond_g3_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_g3_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:[me]:[sp]");
    },
    _g_sugg_g3_41: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/î/g, "i");
    },
    _g_sugg_g3_42: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/o/g, "au").replace(/O/g, "AU");
    },
    _g_cond_g3_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ">septique/");
    },
    _g_sugg_g3_43: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/o/g, "au").replace(/O/g, "AU");
    },
    _g_sugg_g3_44: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/n/g, "nc").replace(/N/g, "NC");
    },
    _g_sugg_g3_45: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/and/g, "ant").replace(/AND/g, "ANT");
    },
    _g_cond_g3_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset], "|une|") && look(sSentence.slice(lToken[nLastToken]["nEnd"]), "(?i)^ +pour toute") );
    },
    _g_cond_g3_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:(?:f|e:p)");
    },
    _g_sugg_g3_46: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/iai/g, "iè").replace(/IAI/g, "IÈ");
    },
    _g_sugg_g3_47: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/iè/g, "iai").replace(/IÈ/g, "IAI");
    },
    _g_sugg_g3_48: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/û/g, "u").replace(/t/g, "tt").replace(/Û/g, "U").replace(/T/g, "TT");
    },
    _g_cond_g3_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-2+1], "|de|");
    },
    _g_sugg_g3_49: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/outt/g, "oût").replace(/OUTT/g, "OÛT");
    },
    _g_sugg_g3_50: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/out/g, "outt").replace(/OUT/g, "OUTT").replace(/oût/g, "outt").replace(/OÛT/g, "OUTT");
    },
    _g_sugg_g3_51: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/outt/g, "oût").replace(/OUTT/g, "OÛT");
    },
    _g_cond_g3_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-1+1], ":1p");
    },
    _g_cond_g3_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-1+1], ":2p");
    },
    _g_sugg_g3_52: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/û/g, "u").replace(/Û/g, "U");
    },
    _g_sugg_g3_53: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/û/g, "u").replace(/Û/g, "U");
    },
    _g_sugg_g3_54: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/u/g, "û").replace(/U/g, "Û");
    },
    _g_sugg_g3_55: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(3);
    },
    _g_sugg_g3_56: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].toLowerCase().replace(/chass/g, "lâch");
    },
    _g_cond_g3_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 4);
    },
    _g_sugg_g3_57: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ât/g, "at").replace(/ÂT/g, "AT");
    },
    _g_sugg_g3_58: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/at/g, "ât").replace(/AT/g, "ÂT");
    },
    _g_sugg_g3_59: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/u/g, "û").replace(/U/g, "Û");
    },
    _g_cond_g3_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D", ">de/");
    },
    _g_sugg_g3_60: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ens/g, "ans").replace(/ENS/g, "ANS");
    },
    _g_sugg_g3_61: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ans/g, "ens").replace(/ANS/g, "ENS");
    },
    _g_sugg_g3_62: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_cond_g3_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q") && ! g_value(lToken[nTokenOffset], "|se|s’|");
    },
    _g_cond_g3_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-3+1], ":V");
    },
    _g_sugg_g3_63: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbFrom("pécher", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_sugg_g3_64: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/êch/g, "éch").replace(/er/g, "é").replace(/ÊCH/g, "ÉCH").replace(/ER/g, "É");
    },
    _g_sugg_g3_65: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/éch/g, "êch").replace(/èch/g, "êch").replace(/ÉCH/g, "ÊCH").replace(/ÈCH/g, "ÊCH");
    },
    _g_cond_g3_57: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|je|tu|il|elle|on|ne|n’|") && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 3);
    },
    _g_cond_g3_58: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N");
    },
    _g_cond_g3_59: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nLastToken-1+1], ":V1..t") && g_morph(lToken[nLastToken+1], ":(?:Ov|[123][sp]|P)|<end>|>(?:,|par)/");
    },
    _g_sugg_g3_66: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:s");
    },
    _g_sugg_g3_67: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:s");
    },
    _g_sugg_g3_68: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":s");
    },
    _g_cond_g3_60: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]") && g_morph(lToken[nTokenOffset+4], ":[NA]", ":V0");
    },
    _g_cond_g3_61: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":V", ":[NAQGM]");
    },
    _g_cond_g3_62: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1);
    },
    _g_cond_g3_63: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_cequi_") && ! g_value(lToken[nTokenOffset], "|idée|");
    },
    _g_cond_g3_64: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|n’|");
    },
    _g_cond_g3_65: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1);
    },
    _g_sugg_g3_69: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/out/g, "oot").replace(/OUT/g, "OOT");
    },
    _g_sugg_g3_70: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/etr/g, "ebr").replace(/ETR/g, "EBR").replace(/dét/g, "reb").replace(/Dét/g, "Reb").replace(/DÉT/g, "REB");
    },
    _g_sugg_g3_71: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/od/g, "ôd").replace(/OD/g, "ÔD");
    },
    _g_sugg_g3_72: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ale/g, "alle").replace(/ALE/g, "ALLE");
    },
    _g_sugg_g3_73: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/alle/g, "ale").replace(/ALLE/g, "ALE");
    },
    _g_cond_g3_66: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D.*:[me]");
    },
    _g_sugg_g3_74: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/scep/g,"sep").replace(/SCEP/g,"SEP");
    },
    _g_cond_g3_67: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">plaie/");
    },
    _g_sugg_g3_75: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/sep/g, "scep").replace(/SEP/g, "SCEP");
    },
    _g_cond_g3_68: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nTokenOffset+3], ":N.*:[me]:[si]", ":Y");
    },
    _g_cond_g3_69: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nTokenOffset+3], ":[NA]", ":[YP]");
    },
    _g_cond_g3_70: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " soit ");
    },
    _g_sugg_g3_76: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/lé/g, "let").replace(/LÉ/g, "LET");
    },
    _g_sugg_g3_77: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/et/g, "é").replace(/ET/g, "É");
    },
    _g_sugg_g3_78: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/et/g, "é").replace(/ET/g, "É");
    },
    _g_cond_g3_71: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|lourde|lourdes|") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[aA]ccompl|[dD]él[éè]gu");
    },
    _g_sugg_g3_79: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/â/g, "a").replace(/Â/g, "A");
    },
    _g_sugg_g3_80: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/âc/g, "ac").replace(/ÂC/g, "AC");
    },
    _g_sugg_g3_81: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/â/g, "a").replace(/Â/g, "A");
    },
    _g_sugg_g3_82: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_sugg_g3_83: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ac/g, "âc").replace(/AC/g, "ÂC");
    },
    _g_sugg_g3_84: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].replace(/a/g, "â").replace(/A/g, "Â");
    },
    _g_cond_g3_72: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D", ":R");
    },
    _g_sugg_g3_85: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/au/g, "ô").replace(/AU/g, "Ô");
    },
    _g_cond_g3_73: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":[AW]");
    },
    _g_cond_g3_74: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nLastToken-1+1], ":[123]s");
    },
    _g_sugg_g3_86: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/énén/g, "enim").replace(/ÉNÉN/g, "ENIM");
    },
    _g_sugg_g3_87: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/enim/g, "énén").replace(/ENIM/g, "ÉNÉN");
    },
    _g_cond_g3_75: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ">,|<start>|:V", ":D");
    },
    _g_cond_g3_76: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[DA].*:[fe]");
    },
    _g_cond_g3_77: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]", ":[GAVW]") && ! g_tag(lToken[nLastToken-1+1], "egxmot");
    },
    _g_cond_g3_78: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", ":A");
    },
    _g_cond_g3_79: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N") && g_morph(lToken[nTokenOffset+5], ":N.*:[me]:[si]");
    },
    _g_cond_g3_80: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N") && g_morph(lToken[nTokenOffset+6], ":N.*:[me]:[si]");
    },
    _g_cond_g3_81: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N") && g_morph(lToken[nTokenOffset+6], ":N.*:[me]:[si]");
    },
    _g_cond_g3_82: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N") && g_morph(lToken[nTokenOffset+7], ":N.*:[me]:[si]");
    },
    _g_cond_g3_83: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":N.*:m") && g_morph(lToken[nTokenOffset+6], ":N.*:[fe]");
    },
    _g_cond_g3_84: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m") && g_morph(lToken[nTokenOffset+7], ":N.*:[fe]");
    },
    _g_cond_g3_85: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:[fe]") && g_morph(lToken[nTokenOffset+7], ":N.*:[fe]");
    },
    _g_cond_g3_86: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*");
    },
    _g_sugg_g3_88: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_87: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*") || ( g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[si]") && g_morph(lToken[nTokenOffset+1], ":[RCY]", ">(?:e[tn]|ou)/") && ! (g_morph(lToken[nTokenOffset+1], ":Rv") && g_morph(lToken[nTokenOffset+3], ":Y")) );
    },
    _g_cond_g3_88: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[siGW]");
    },
    _g_cond_g3_89: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|de|") && ! g_value(lToken[nTokenOffset+2], "|air|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_90: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":m", "*") && g_morph(lToken[nTokenOffset+3], ":f", "*")) || (g_morph(lToken[nTokenOffset+2], ":f", "*") && g_morph(lToken[nTokenOffset+3], ":m", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_89: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+3]["sValue"], false);
    },
    _g_cond_g3_91: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasFemForm(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g3_90: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_92: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[si]", "*") && g_morph(lToken[nTokenOffset+3], ":p", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_93: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+3], "|air|") && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_94: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+3], ":m", "*") && g_morph(lToken[nTokenOffset+4], ":f", "*")) || (g_morph(lToken[nTokenOffset+3], ":f", "*") && g_morph(lToken[nTokenOffset+4], ":m", "*")) ) && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]) && ! g_morph(lToken[nTokenOffset], ":[NA]");
    },
    _g_sugg_g3_91: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+4]["sValue"], false);
    },
    _g_cond_g3_95: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasFemForm(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_92: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_96: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[si]", "*") && g_morph(lToken[nTokenOffset+4], ":p", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]) && ! g_morph(lToken[nTokenOffset], ":[NA]");
    },
    _g_sugg_g3_93: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_97: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":3[sp]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_sugg_g3_94: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nTokenOffset+5], lToken[nTokenOffset+3]);
    },
    _g_cond_g3_98: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":3[sp]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_99: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset], "<start>|:V", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_100: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", "*") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", "*");
    },
    _g_sugg_g3_95: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_101: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", "*") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", "*");
    },
    _g_sugg_g3_96: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_102: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", "*") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", "*");
    },
    _g_cond_g3_103: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[si]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_104: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[me]:[si]");
    },
    _g_sugg_g3_97: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_105: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[me]:[si]");
    },
    _g_cond_g3_106: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[me]:[si]") && g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[me]:[si]");
    },
    _g_sugg_g3_98: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+5]["sValue"], true);
    },
    _g_cond_g3_107: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[fe]:[si]");
    },
    _g_sugg_g3_99: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g3_108: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[fe]:[si]");
    },
    _g_sugg_g3_100: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_cond_g3_109: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[fe]:[si]") && g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[fe]:[si]");
    },
    _g_sugg_g3_101: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+5]["sValue"], true);
    },
    _g_cond_g3_110: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[si]");
    },
    _g_cond_g3_111: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:m:[si]", ":A.*:p") && g_morph(lToken[nTokenOffset+4], ":A.*:f:[si]", ":A.*:p");
    },
    _g_cond_g3_112: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_sugg_g3_102: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_cond_g3_113: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:f:[si]", ":A.*:p") && g_morph(lToken[nTokenOffset+4], ":A.*:m:[si]", ":A.*:p");
    },
    _g_sugg_g3_103: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_sugg_g3_104: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_114: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D");
    },
    _g_cond_g3_115: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)");
    },
    _g_sugg_g3_105: function (lToken, nTokenOffset, nLastToken) {
        return suggLesLa(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_116: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasMasForm(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_106: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_cond_g3_117: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":(?:[siPGWY]|[123][sp])");
    },
    _g_sugg_g3_107: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_118: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":(?:e|m|P|G|W|[123][sp]|Y)") || ( g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":[me]") && g_morph(lToken[nTokenOffset+1], ":[RCY]", ">(?:e[tn]|ou)/") && ! (g_morph(lToken[nTokenOffset+1], ":Rv") && g_morph(lToken[nTokenOffset+3], ":Y")) );
    },
    _g_cond_g3_119: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*") || ( g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[si]") && g_morph(lToken[nTokenOffset+1], ":[RCY]", ">(?:e[tn]|ou)/") && ! (g_morph(lToken[nTokenOffset+1], ":Rv") && g_morph(lToken[nTokenOffset+3], ":Y")) );
    },
    _g_cond_g3_120: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":[emPGWMY]");
    },
    _g_cond_g3_121: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[siGW]");
    },
    _g_cond_g3_122: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && ! g_value(lToken[nTokenOffset], "|et|ou|de|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_123: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]", ":(?:B|G|V0)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:f", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_124: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":A.*:e:[si]");
    },
    _g_cond_g3_125: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_126: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D") && ! g_morph(lToken[nTokenOffset], ":[NA]") && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_127: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":(?:B|G|V0|f)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_128: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+3], ":A.*:e:[si]");
    },
    _g_cond_g3_129: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+4]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_130: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":3[sp]");
    },
    _g_sugg_g3_108: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_131: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":3[sp]") && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_132: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|") && g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[fp]", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_133: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[me]:[si]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0|A.*:[me]:[si])|;C");
    },
    _g_cond_g3_134: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[me]:[si]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_135: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":(?:e|f|P|G|W|M|[1-3][sp]|Y)");
    },
    _g_sugg_g3_109: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_sugg_g3_110: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_136: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":(?:e|f|P|G|W|M|[1-3][sp]|Y)") || ( g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":[Mfe]") && g_morph(lToken[nTokenOffset+1], ":[RCY]", ">(?:e[tn]|ou)/") && ! (g_morph(lToken[nTokenOffset+1], ":(?:Rv|C)") && g_morph(lToken[nTokenOffset+3], ":Y")) );
    },
    _g_cond_g3_137: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*") || ( g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[Msi]") && g_morph(lToken[nTokenOffset+1], ":[RCY]", ">(?:e[tn]|ou)/") && ! (g_morph(lToken[nTokenOffset+1], ":Rv") && g_morph(lToken[nTokenOffset+3], ":Y")) );
    },
    _g_cond_g3_138: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":[efPGWMY]");
    },
    _g_cond_g3_139: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && ! g_value(lToken[nTokenOffset], "|et|ou|de|d’|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_140: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]", ":(?:B|G|V0)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:m", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_141: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":A.*:e:[si]") && ! g_value(lToken[nTokenOffset], "|à|");
    },
    _g_cond_g3_142: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D") && ! g_morph(lToken[nTokenOffset], ":[NA]|>(?:et|ou)/") && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_143: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":(?:B|G|V0|m)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_144: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_145: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+3], ":A.*:e:[si]") && ! hasFemForm(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_146: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":3[sp]");
    },
    _g_sugg_g3_111: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_147: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":3[sp]") && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_148: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|") && g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G|P)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[mp]", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_149: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[fe]:[si]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0|A.*:[fe]:[si])|;C");
    },
    _g_cond_g3_150: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[fe]:[si]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_151: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ((g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":(?:B|e|G|V0|f)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:f", "*")) || (g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":(?:B|e|G|V0|m)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:m", "*"))) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_112: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+2]["sValue"], false);
    },
    _g_cond_g3_152: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":(?:G|V0)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_153: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:i");
    },
    _g_cond_g3_154: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ((g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":(?:B|e|G|V0|f)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", "*")) || (g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":(?:B|e|G|V0|m)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", "*"))) && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_155: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":(?:G|V0)") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_156: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:i");
    },
    _g_cond_g3_157: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[GWme]");
    },
    _g_cond_g3_158: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && hasMasForm(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_159: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:p", ":[siGW]");
    },
    _g_cond_g3_160: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[efGW]");
    },
    _g_sugg_g3_113: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_161: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":(?:e|m|G|W|V0|3s|Y)");
    },
    _g_cond_g3_162: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":(?:e|m|G|W|V0|3s)");
    },
    _g_sugg_g3_114: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_cond_g3_163: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":(?:e|f|G|W|V0|3s|P)") && ! ( lToken[nTokenOffset+2]["sValue"] == "demi" && g_morph(lToken[nLastToken+1], ":N.*:f", "*") );
    },
    _g_cond_g3_164: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":(?:e|f|G|W|V0|3s)");
    },
    _g_sugg_g3_115: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_cond_g3_165: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|d’|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_166: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_167: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[NA]|>(?:et|ou)/") && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_168: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_169: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]");
    },
    _g_cond_g3_170: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]") && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_171: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"] != "fois" && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NA].*:p", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_172: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"] != "fois" && g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_173: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]");
    },
    _g_cond_g3_174: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]") && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_175: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":[GWpi]|;é");
    },
    _g_cond_g3_176: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":(?:3s|[GWme])");
    },
    _g_cond_g3_177: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[GWme]") && g_morph(lToken[nTokenOffset+2], ":3s");
    },
    _g_cond_g3_178: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[bcçdfgjklmnpqrstvwxz].+:[NA].*:m", ":[efGW]");
    },
    _g_sugg_g3_116: function (lToken, nTokenOffset, nLastToken) {
        return suggCeOrCet(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_179: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:s", ":[GWme]");
    },
    _g_cond_g3_180: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":[GWpi]");
    },
    _g_cond_g3_181: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:p", ":[GWsi]");
    },
    _g_cond_g3_182: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|de|d’|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_183: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_cond_g3_184: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_185: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[pf]", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_186: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D");
    },
    _g_cond_g3_187: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[bcçdfgjklmnpqrstvwxz].*:[NA].*:f", ":[GWme]");
    },
    _g_sugg_g3_117: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/on/g, "a").replace(/ON/g, "A");
    },
    _g_sugg_g3_118: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_188: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":(?:B|G|e|V0|f)") && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:f", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_189: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuûyœæ].*:[NAQ].*:f", ":(?:B|G|e|V0|m)") && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:m", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_190: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_191: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":(?:B|G|e|V0|f)") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:f", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_192: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ">[aâeéèêiîoôuûyœæ].*:[NA].*:f", ":(?:B|G|e|V0|m)") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:m", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_193: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_194: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_cond_g3_195: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ">[bcçdfgjklmnpqrstvwxz].*:[NA].*:[me]:[si]");
    },
    _g_cond_g3_196: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ">[aâeéèêiîoôuûyœæh]");
    },
    _g_cond_g3_197: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_198: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_199: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[bcçdfgjklmnpqrstvwxz].*:[NA].*:[me]:[si]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:[pf]", "*");
    },
    _g_cond_g3_200: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return re.search("^[aâeéèêiîoôuûyœæ]", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_201: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:[pf]", "*");
    },
    _g_cond_g3_202: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G|P|B)") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:[pm]", "*");
    },
    _g_cond_g3_203: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:p", "*");
    },
    _g_cond_g3_204: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nTokenOffset+1], "_CAP_") && g_morph(lToken[nTokenOffset+1], ":N")) && ! (g_tag(lToken[nTokenOffset+1], "eg1mot") && g_morph(lToken[nTokenOffset+2], ":V.[ea].:3[sp]"));
    },
    _g_sugg_g3_119: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1)+"on";
    },
    _g_cond_g3_205: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && ! re.search("(?i)^[aâeéèêiîoôuûyœæ]", lToken[nTokenOffset+2]["sValue"]) && hasFemForm(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_206: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NAQ].*:[fe]", ":(?:B|G|V0)") && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:m", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_207: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NAQ].*:[si]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NAQ].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_208: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[NAQ]|>(?:et|ou)/") && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_209: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NAQ].*:[fe]", ":(?:B|G|V0|m)") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:m", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_210: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NAQ].*:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:p", ":[GWsi]") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_211: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_cond_g3_212: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_213: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[pm]", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_214: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:p", ":[siG]") && ! g_value(lToken[nLastToken+1], "|que|qu’|");
    },
    _g_cond_g3_215: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", "*");
    },
    _g_cond_g3_216: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", "*");
    },
    _g_cond_g3_217: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NA].*:p", "*");
    },
    _g_cond_g3_218: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_sugg_g3_120: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_219: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D") && ( g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") || (g_morph(lToken[nTokenOffset+3], ":[NA].*:s", ":[pi]|>avoir/") && g_morph(lToken[nTokenOffset+1], ":[RC]", ">(?:e[tn]|ou|puis)/") && ! (g_morph(lToken[nTokenOffset+1], ":Rv") && g_morph(lToken[nTokenOffset+3], ":Y"))) ) && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]")) && ! (g_value(lToken[nTokenOffset+1], "|que|") && g_morph(lToken[nTokenOffset], ">tel/") && g_morph(lToken[nTokenOffset+3], ":3[sp]"));
    },
    _g_cond_g3_220: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:s", ":[ipYPGW]") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_sugg_g3_121: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+3]["sValue"], true);
    },
    _g_sugg_g3_122: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g3_221: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A"));
    },
    _g_cond_g3_222: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":D") && ! g_morph(lToken[nTokenOffset], ":[NA]") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_sugg_g3_123: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_cond_g3_223: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]") && g_morph(lToken[nTokenOffset+4], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A"));
    },
    _g_sugg_g3_124: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_224: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":3[sp]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_cond_g3_225: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":3[sp]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_value(lToken[nLastToken-1+1], "|et|") && ( (g_morph(lToken[nLastToken-2+1], "#G") && g_morph(lToken[nLastToken+1], "#G")) || (g_morph(lToken[nLastToken-2+1], ";C") && g_morph(lToken[nLastToken+1], ";C")) ) ) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_226: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":(?:[ipGW]|[123][sp])") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_sugg_g3_125: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_227: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":[ipGW]") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_cond_g3_228: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:p", ":[mGW]");
    },
    _g_sugg_g3_126: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g3_127: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ts/g, "tes").replace(/TS/g, "TES");
    },
    _g_cond_g3_229: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:m:p", ":[fGW]");
    },
    _g_sugg_g3_128: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g3_129: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/tes/g, "ts").replace(/TES/g, "TS");
    },
    _g_cond_g3_230: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ">[bcçdfgjklmnpqrstvwxz].*:m", ":f");
    },
    _g_cond_g3_231: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].endsWith("x") || lToken[nTokenOffset+1]["sValue"].endsWith("X");
    },
    _g_cond_g3_232: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[emGWP]");
    },
    _g_sugg_g3_130: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g3_233: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":(?:[ipGWP]|V0)") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_cond_g3_234: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":[emGW]");
    },
    _g_cond_g3_235: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[efGWP]");
    },
    _g_sugg_g3_131: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+2]["sValue"], true);
    },
    _g_cond_g3_236: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:s", ":[ipGWP]") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":[NA]"));
    },
    _g_cond_g3_237: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":[efGW]");
    },
    _g_cond_g3_238: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|et|ou|de|d’|au|aux|") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_cond_g3_239: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]") && g_morph(lToken[nTokenOffset+4], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A")) && ! (g_value(lToken[nTokenOffset+1], "|de|d’|") && g_value(lToken[nTokenOffset], "|un|une|"));
    },
    _g_cond_g3_240: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_cond_g3_241: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_242: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":G") && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A"));
    },
    _g_sugg_g3_132: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_243: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[NA]|>(?:et|ou)/") && ! g_morph(lToken[nTokenOffset+3], ">seul/");
    },
    _g_sugg_g3_133: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_cond_g3_244: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+4]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A")) && ! (g_value(lToken[nTokenOffset+1], "|de|d’|") && g_value(lToken[nTokenOffset], "|un|une|"));
    },
    _g_sugg_g3_134: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_245: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_sugg_g3_135: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_246: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_sugg_g3_136: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_137: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+4]["sValue"], true);
    },
    _g_sugg_g3_138: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_247: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]);
    },
    _g_sugg_g3_139: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_248: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]") && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+5]) && ! ( g_morph(lToken[nLastToken-1+1], ":N") && g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) );
    },
    _g_cond_g3_249: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:et|ou)/|:R") && ! g_morph(lToken[nTokenOffset+3], ">(?:seul|minimum|maximum)/");
    },
    _g_cond_g3_250: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":(?:B|G|V0)") && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A"));
    },
    _g_sugg_g3_140: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+3]);
    },
    _g_cond_g3_251: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return (g_morph(lToken[nTokenOffset], ":(?:[VRBXÉ]|Cs)|>comme/|<start>|>[(,]", "*") || g_morph(lToken[nTokenOffset+3], ":N", ":[AQ]")) && ! g_morph(lToken[nTokenOffset+3], ">(?:seul|minimum|maximum)/");
    },
    _g_cond_g3_252: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:f", "*")) || (g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:m", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_253: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+3], ":G|>a/") && g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]);
    },
    _g_da_g3_18: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+3], "", ":V");
    },
    _g_cond_g3_254: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && ! g_morph(lToken[nTokenOffset+2], ":[123][sp]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset+4], ">seul/");
    },
    _g_cond_g3_255: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[pi]", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:f", "*");
    },
    _g_cond_g3_256: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[pi]", ":[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:m", "*");
    },
    _g_cond_g3_257: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:s", "*");
    },
    _g_cond_g3_258: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_259: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[me]:[pi]");
    },
    _g_cond_g3_260: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[me]:[pi]");
    },
    _g_cond_g3_261: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[me]:[pi]") && g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[me]:[pi]");
    },
    _g_sugg_g3_141: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+5]["sValue"], true);
    },
    _g_cond_g3_262: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[fe]:[pi]");
    },
    _g_cond_g3_263: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[fe]:[pi]");
    },
    _g_cond_g3_264: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":A.*:[fe]:[pi]") && g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[fe]:[pi]");
    },
    _g_sugg_g3_142: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+5]["sValue"], true);
    },
    _g_cond_g3_265: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":A.*:[pi]");
    },
    _g_cond_g3_266: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:m:[pi]", ":A.*:s") && g_morph(lToken[nTokenOffset+4], ":A.*:f:[pi]", ":A.*:s");
    },
    _g_cond_g3_267: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:f:[pi]", ":A.*:s") && g_morph(lToken[nTokenOffset+4], ":A.*:m:[pi]", ":A.*:s");
    },
    _g_sugg_g3_143: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+5]["sValue"]);
    },
    _g_cond_g3_268: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && ! g_morph(lToken[nTokenOffset+2], ":[123][sp]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset+4], ">seul/") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bune? de +$");
    },
    _g_cond_g3_269: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset+4], ">seul/") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bune? de +$") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[pi]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:[fs]", "*");
    },
    _g_cond_g3_270: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[me]:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0|A.*:[me]:[pi])|;C");
    },
    _g_cond_g3_271: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[me]:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_272: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset+4], ">seul/") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bune? de +$") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[pi]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":(?:[123][sp]|G|P|B)|;C") && g_morph(lToken[nTokenOffset+4], ":[NAQ].*:[ms]", "*");
    },
    _g_cond_g3_273: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[fe]:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0|A.*:[fe]:[pi])|;C");
    },
    _g_cond_g3_274: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":D") && g_morph(lToken[nTokenOffset+2], ":A.*:[fe]:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_275: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], "<start>|:V", "*") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && ! g_morph(lToken[nTokenOffset+4], ">seul/") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bune? de +$");
    },
    _g_cond_g3_276: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:[pi]", ":(?:G|W|V0)|;C") && g_morph(lToken[nTokenOffset+4], ":A", ":(?:G|W|V0)|;C");
    },
    _g_cond_g3_277: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:p", ":(?:V0|Oo|[NA].*:[me]:[si])");
    },
    _g_cond_g3_278: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:p", ":(?:V0|Oo|[NA].*:[me]:[si])");
    },
    _g_cond_g3_279: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":(?:V0|Oo|[NA].*:[me]:[si])");
    },
    _g_cond_g3_280: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:s", ":(?:V0|Oo|[NA].*:[me]:[pi])");
    },
    _g_cond_g3_281: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:s", ":(?:V0|Oo|[NA].*:[me]:[pi])");
    },
    _g_cond_g3_282: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[pi]", ":(?:V0|Oo|[NA].*:[me]:[pi])");
    },
    _g_cond_g3_283: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:p", ":(?:V0|Oo|[NA].*:[fe]:[si])");
    },
    _g_cond_g3_284: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:p", ":(?:V0|Oo|[NA].*:[fe]:[si])");
    },
    _g_cond_g3_285: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":(?:V0|Oo|[NA].*:[fe]:[si])");
    },
    _g_cond_g3_286: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:s", ":(?:V0|Oo|[NA].*:[fe]:[pi])");
    },
    _g_cond_g3_287: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:s", ":(?:V0|Oo|[NA].*:[fe]:[pi])");
    },
    _g_cond_g3_288: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[pi]", ":(?:V0|Oo|[NA].*:[fe]:[pi])");
    },
    _g_cond_g3_289: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tel|telle|");
    },
    _g_cond_g3_290: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tels|telles|");
    },
    _g_sugg_g3_144: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1);
    },
    _g_cond_g3_291: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tel|telle|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[fe]", ":m");
    },
    _g_cond_g3_292: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tel|telle|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", ":[me]");
    },
    _g_cond_g3_293: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tel|telle|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:[me]", ":f");
    },
    _g_cond_g3_294: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tel|telle|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", ":[fe]");
    },
    _g_cond_g3_295: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tels|telles|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:f", ":[me]");
    },
    _g_cond_g3_296: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|tels|telles|") && g_morph(lToken[nTokenOffset+4], ":[NA].*:m", ":[fe]");
    },
    _g_cond_g3_297: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[NA].*:m", ":[fe]");
    },
    _g_cond_g3_298: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":[NA].*:f", ":[me]");
    },
    _g_cond_g3_299: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"] != "cents";
    },
    _g_cond_g3_300: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":A.*:f");
    },
    _g_sugg_g3_145: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_cond_g3_301: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":A.*:p");
    },
    _g_sugg_g3_146: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_302: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":A.*:m");
    },
    _g_sugg_g3_147: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_sugg_g3_148: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_g3_149: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_cond_g3_303: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":A.*:s");
    },
    _g_sugg_g3_150: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_g3_151: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_sugg_g3_152: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_304: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|neuf|mille|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:s", "*") && ! g_morph(lToken[nTokenOffset], ":D.*:s") && ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|") && ! re.search("^[IVXLDM]+$", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g3_305: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fs]", "*") && ! g_morph(lToken[nTokenOffset], ":D.*:s") && ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|") && ! re.search("^[IVXLDM]+$", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g3_306: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[me]");
    },
    _g_cond_g3_307: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[ms]", "*") && ! g_morph(lToken[nTokenOffset], ":D.*:s") && ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|") && ! re.search("^[IVXLDM]+$", lToken[nTokenOffset+1]["sValue"]);
    },
    _g_cond_g3_308: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]");
    },
    _g_cond_g3_309: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:s", "*") && ! g_morph(lToken[nTokenOffset], ":N.*:m:[is]") && ! g_morph(lToken[nTokenOffset], ":D.*:s") && ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|");
    },
    _g_cond_g3_310: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:s", "*") && ! g_morph(lToken[nTokenOffset], ":D.*:s");
    },
    _g_cond_g3_311: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_value(lToken[nTokenOffset+2], "|Rois|Corinthiens|Thessaloniciens|") && ! (g_value(lToken[nTokenOffset], "|à|") && g_meta(g_token(lToken, nTokenOffset+1-2), "NUM"));
    },
    _g_cond_g3_312: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_value(lToken[nTokenOffset], "|/|") && ! re.search("^0*[01](?:[,.][0-9]+|)$", lToken[nTokenOffset+1]["sValue"]) && g_morph(lToken[nTokenOffset+2], ":[NA].*:s", "*") && ! g_morph(lToken[nTokenOffset], ":(?:N|D.*:s)") && ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|");
    },
    _g_cond_g3_313: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|maximum|minimum|fois|multiplié|divisé|janvier|février|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|rue|route|ruelle|place|boulevard|avenue|allée|chemin|sentier|square|impasse|cour|quai|chaussée|côte|vendémiaire|brumaire|frimaire|nivôse|pluviôse|ventôse|germinal|floréal|prairial|messidor|thermidor|fructidor|") && ! re.search("^0*[01](?:,[0-9]+|)$", lToken[nTokenOffset+1]["sValue"]) && ! g_morph(lToken[nTokenOffset], ">(?:et|ou)/|:(?:N|D.*:[si])") && ! g_morph(lToken[nTokenOffset+3], ">(?:seul|maximum|minimum)/|:(?:[BG]|V0)");
    },
    _g_cond_g3_314: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", "*") && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", "*") && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|,|") && g_morph(g_token(lToken, nLastToken+2), ":A"));
    },
    _g_cond_g3_315: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[me]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_sugg_g3_153: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"]) + "|" + suggMasPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_316: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[me]:[si]", ":(?:>[aâeéèêiîoôuh].*:[ef]|V0|G)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_317: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:m:[si]", ":(?:[fe]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_318: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_sugg_g3_154: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"]) + "|" + suggFemPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_319: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_320: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_321: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_322: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_323: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_324: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_325: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_326: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_327: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_sugg_g3_155: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"]) + "|" + suggMasPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_328: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_329: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":V0") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_330: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":(?:[fe]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_331: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":(?:[fe]|V0)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_332: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":(?:[fe]|V0)") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_333: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":(?:>[aâeéèêiîoôuh].*:[ef]|V0|G)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]:[si]", ":V0") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_334: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":(?:>[aâeéèêiîoôuh].*:[ef]|V0|G)") && g_morph(lToken[nTokenOffset+5], ":[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_335: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":(?:>[aâeéèêiîoôuh].*:[ef]|V0|G)") && g_morph(lToken[nTokenOffset+5], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":(?:[me]|V0)") && ! (g_value(lToken[nTokenOffset], "|,|de|d’|du|des|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":[NA]"));
    },
    _g_cond_g3_336: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-1+1], ">(?:matin|matinée|après-midi|soir|soirée|nuit|jour|journée|semaine|mois|trimestre|semestre|année|décennie|siècle|millénaire)/");
    },
    _g_cond_g3_337: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-1+1], ">(?:matin|matinée|après-midi|soir|soirée|nuit|jour|journée|semaine|mois|trimestre|semestre|année|décennie|siècle|millénaire)/") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " et ");
    },
    _g_sugg_g3_156: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,-1);
    },
    _g_cond_g3_338: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M1.*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":[NA]", ":[me]:[si]");
    },
    _g_cond_g3_339: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":M1.*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":[NA]", ":[fe]:[si]");
    },
    _g_cond_g3_340: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ((g_morph(lToken[nTokenOffset+2], ":m", "*") && g_morph(lToken[nTokenOffset+3], ":f", "*")) || (g_morph(lToken[nTokenOffset+2], ":f", "*") && g_morph(lToken[nTokenOffset+3], ":m", "*"))) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_341: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ((g_morph(lToken[nTokenOffset+2], ":s", "*") && g_morph(lToken[nTokenOffset+3], ":p", "*")) || (g_morph(lToken[nTokenOffset+2], ":p", "*") && g_morph(lToken[nTokenOffset+3], ":s", "*"))) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_157: function (lToken, nTokenOffset, nLastToken) {
        return switchPlural(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_g3_158: function (lToken, nTokenOffset, nLastToken) {
        return switchPlural(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_342: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":p") && g_morph(lToken[nTokenOffset+3], ":[pi]") && g_morph(lToken[nTokenOffset+4], ":s", ":[pi]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g3_159: function (lToken, nTokenOffset, nLastToken) {
        return switchPlural(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_343: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":i") && g_morph(lToken[nTokenOffset+3], ":p")    && g_morph(lToken[nTokenOffset+4], ":s", ":[pi]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_344: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":s") && g_morph(lToken[nTokenOffset+3], ":[si]") && g_morph(lToken[nTokenOffset+4], ":p", ":[si]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_345: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":i") && g_morph(lToken[nTokenOffset+3], ":s")    && g_morph(lToken[nTokenOffset+4], ":p", ":[si]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_346: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":m", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":[me]") && g_morph(lToken[nTokenOffset+4], ":f", ":[me]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_sugg_g3_160: function (lToken, nTokenOffset, nLastToken) {
        return switchGender(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_347: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":f", ":[me]") && g_morph(lToken[nTokenOffset+3], ":[fe]") && g_morph(lToken[nTokenOffset+4], ":m", ":[fe]") && lToken[nTokenOffset+4]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_348: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":G") && g_morph(lToken[nTokenOffset+4], ":A", ":G");
    },
    _g_cond_g3_349: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[me]:[si]|G|W)|;C");
    },
    _g_cond_g3_350: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[me]:[si]|G|W)|;C");
    },
    _g_cond_g3_351: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[fe]:[si]|G|W)|;C");
    },
    _g_cond_g3_352: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[fe]:[si]|G|W)|;C");
    },
    _g_cond_g3_353: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[si]|G|W)|;C");
    },
    _g_cond_g3_354: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[si]|G|W)|;C");
    },
    _g_cond_g3_355: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[me]:[pi]|G|W)|;C");
    },
    _g_cond_g3_356: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[me]:[pi]|G|W)|;C");
    },
    _g_cond_g3_357: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[fe]:[pi]|G|W)|;C");
    },
    _g_cond_g3_358: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[fe]:[pi]|G|W)|;C");
    },
    _g_cond_g3_359: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":(?:A.*:[pi]|G|W)|;C");
    },
    _g_cond_g3_360: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":A", ":(?:A.*:[pi]|G|W)|;C");
    },
    _g_cond_g3_361: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A", ":[ISKYPEGW]|;C") && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+4], false);
    },
    _g_sugg_g3_161: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nTokenOffset+2], lToken[nTokenOffset+4]);
    },
    _g_sugg_g3_162: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nTokenOffset+4], lToken[nTokenOffset+2]);
    },
    _g_cond_g3_362: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":p", "*") && g_morph(lToken[nTokenOffset+3], ":s", "*")) || (g_morph(lToken[nTokenOffset+2], ":s", "*") && g_morph(lToken[nTokenOffset+3], ":p", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_363: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":m", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":f", "*")) || (g_morph(lToken[nTokenOffset+2], ":f", ":[me]") && g_morph(lToken[nTokenOffset+3], ":m", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_364: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":p", ":[si]") && g_morph(lToken[nTokenOffset+3], ":s", "*")) || (g_morph(lToken[nTokenOffset+2], ":s", ":[pi]") && g_morph(lToken[nTokenOffset+3], ":p", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_365: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":m", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":f", "*")) || (g_morph(lToken[nTokenOffset+2], ":f", ":[me]") && g_morph(lToken[nTokenOffset+3], ":m", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! g_morph(lToken[nTokenOffset], ":[NA]|>(?:et|ou)/");
    },
    _g_cond_g3_366: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":p", ":[si]") && g_morph(lToken[nTokenOffset+3], ":s", "*")) || (g_morph(lToken[nTokenOffset+2], ":s", ":[pi]") && g_morph(lToken[nTokenOffset+3], ":p", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && ! g_morph(lToken[nTokenOffset], ":[NA]|>(?:et|ou)/");
    },
    _g_cond_g3_367: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":m", ":[fe]") && g_morph(lToken[nTokenOffset+3], ":f", "*")) || (g_morph(lToken[nTokenOffset+2], ":f", ":[me]") && g_morph(lToken[nTokenOffset+3], ":m", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && g_morph(lToken[nTokenOffset], ":[VRX]|<start>");
    },
    _g_cond_g3_368: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( (g_morph(lToken[nTokenOffset+2], ":p", ":[si]") && g_morph(lToken[nTokenOffset+3], ":s", "*")) || (g_morph(lToken[nTokenOffset+2], ":s", ":[pi]") && g_morph(lToken[nTokenOffset+3], ":p", "*")) ) && ! apposition(lToken[nTokenOffset+2]["sValue"], lToken[nTokenOffset+3]["sValue"]) && g_morph(lToken[nTokenOffset], ":[VRX]|<start>");
    },
    _g_cond_g3_369: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_370: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[NA].*:[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_371: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], "[NA].*:[me]", ":[NA].*:f|>[aâeéèêiîoôuh].*:e") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_372: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], "[NA].*:m:[si]", ":[NA].*:[fe]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_373: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":G|>[aâeéèêiîoôuh].*:[ef]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_374: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":G|>[aâeéèêiîoôuh].*:[ef]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[me]:[si]", ":[NA].*:f|>[aâeéèêiîoôuh].*:e") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_375: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":G|>[aâeéèêiîoôuh].*:[ef]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:m:[si]", ":[NA].*:[fe]:[si]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_376: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_377: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:m:[si]", ":[NA].*:f|>[aâeéèêiîoôuh].*:e") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_378: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-2+1], "[NA].*:m:[si]", ":[NA].*:[fe]:[si]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_379: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[NA].*:[fe]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_380: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_381: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_382: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[fe]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_383: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_384: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_385: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[fe]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_386: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ">[aâeéèêiîoôuh].*:[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_387: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:f:[si]", ":[me]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_g3_163: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nLastToken-1+1]["sValue"], true);
    },
    _g_cond_g3_388: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":[fp]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[pi]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_164: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nLastToken-2+1]) + "|" + suggMasSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_389: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":[mp]") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[pi]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_165: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nLastToken-2+1]) + "|" + suggFemSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_390: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":p") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[pi]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_166: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nLastToken-2+1]) + "|" + g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+2]);
    },
    _g_cond_g3_391: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[bcçdfgjklmnpqrstvwxz].*:[NA].*:[me]:[si]");
    },
    _g_sugg_g3_167: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nLastToken-2+1]) + "|" + suggMasSing(lToken[nLastToken-1+1]["sValue"], lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_392: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]");
    },
    _g_cond_g3_393: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":s") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[me]:[si]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_168: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"]) + "|" + g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+2]);
    },
    _g_cond_g3_394: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":s") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[fe]:[si]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_169: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"]) + "|" + g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+2]);
    },
    _g_cond_g3_395: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":s") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[si]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_cond_g3_396: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ">[bcçdfgjklmnpqrstvwxz].*:[NA].*:[me]:[si]");
    },
    _g_sugg_g3_170: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"], lToken[nLastToken-2+1]["sValue"]) + "|" + g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+2]);
    },
    _g_cond_g3_397: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-2+1], ":[NA].*:[si]");
    },
    _g_cond_g3_398: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":s") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[pi]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! g_agreement(lToken[nLastToken-2+1], lToken[nLastToken-1+1]) && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1]);
    },
    _g_sugg_g3_171: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nLastToken-2+1]);
    },
    _g_cond_g3_399: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]", ":s") && g_morph(lToken[nLastToken-2+1], ":[NA].*:[pi]") && ! apposition(lToken[nLastToken-2+1]["sValue"], lToken[nLastToken-1+1]["sValue"]) && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":A.*:[si]"));
    },
    _g_sugg_g3_172: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_400: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+4], "|bâtiment|collège|corps|culte|établissement|groupe|journal|lycée|pays|régiment|vaisseau|village|");
    },
    _g_sugg_g3_173: function (lToken, nTokenOffset, nLastToken) {
        return "leurs " + suggPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_g3_401: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+4], "|armée|cité|compagnie|entreprise|église|fac|nation|université|planète|promotion|religion|unité|ville|");
    },
    _g_cond_g3_402: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[si]", ":f") && g_morph(lToken[nTokenOffset+4], ":R", ">à/");
    },
    _g_cond_g3_403: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[si]", ":m") && g_morph(lToken[nTokenOffset+4], ":R", ">à/");
    },
    _g_cond_g3_404: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[pi]", ":f") && g_morph(lToken[nTokenOffset+4], ":R", ">à/");
    },
    _g_cond_g3_405: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[pi]", ":m") && g_morph(lToken[nTokenOffset+4], ":R", ">à/");
    },
    _g_cond_g3_406: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[si]", ":f");
    },
    _g_cond_g3_407: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[si]", ":f:[si]");
    },
    _g_cond_g3_408: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[si]", ":m");
    },
    _g_cond_g3_409: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[pi]");
    },
    _g_cond_g3_410: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[pi]", ":m");
    },
    _g_cond_g3_411: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":R") && g_morph(lToken[nTokenOffset+4], ":N.*:m:[pi]", ":f:[pi]");
    },
    _g_cond_g3_412: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":R") && g_morph(lToken[nTokenOffset+4], ":N.*:f:[pi]", ":m:[pi]");
    },
    _g_cond_g3_413: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[pi]", ":f:[pi]");
    },
    _g_cond_g3_414: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[pi]", ":m:[pi]");
    },
    _g_cond_g3_415: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":[GAVWM]");
    },
    _g_cond_g3_416: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":D") && (! g_morph(lToken[nTokenOffset+1], ":[me]:[si]") || g_morph(lToken[nTokenOffset+2], ":[pf]"));
    },
    _g_sugg_g3_174: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+1]["sValue"]) + " " + suggMasSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g3_175: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+1]["sValue"]) + " " + suggMasSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_417: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":D") && (! g_morph(lToken[nTokenOffset+1], ":[me]:[si]") || g_morph(lToken[nTokenOffset+2], ":p"));
    },
    _g_sugg_g3_176: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+1]["sValue"]) + " " + suggSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_g3_177: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+1]["sValue"]) + " " + suggSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_418: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D");
    },
    _g_sugg_g3_178: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nLastToken-2+1]["sValue"]);
    },
    _g_cond_g3_419: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":[NA].*:s");
    },
    _g_cond_g3_420: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|quatre|");
    },
    _g_cond_g3_421: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":B") && ! g_morph(lToken[nTokenOffset], ">(?:numéro|page|chapitre|référence|année|test|série)/");
    },
    _g_sugg_g3_179: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/ingts/g, "ingt").replace(/INGTS/g, "INGT");
    },
    _g_cond_g3_422: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":B:.:p|>une?") && ! g_morph(lToken[nTokenOffset], ">(?:numéro|page|chapitre|référence|année|test|série)/");
    },
    _g_cond_g3_423: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":B:.:p|>une?");
    },
    _g_cond_g3_424: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[VR]|<start>", ":B");
    },
    _g_cond_g3_425: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":(?:B:.:p|N.*:p)", ":[QA]") || (g_morph(lToken[nTokenOffset], ":B") && g_morph(lToken[nLastToken+1], ":[NA]", ":W"));
    },
    _g_cond_g3_426: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:s", ":[ip]|>o(?:nde|xydation|r)/") && g_morph(lToken[nTokenOffset], ":(?:G|[123][sp])|<start>|>[(,]", ":[AD]");
    },
    _g_cond_g3_427: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:V|R|[NAQ].*:s)|<start>|>[(,]", ":(?:[NA].*:[pi]|V.e.*:[123]p)");
    },
    _g_cond_g3_428: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":[NA].*:s", ":[ip]|>(?:bénéfice|fraude|large|long|profondeur|hauteur|perte)/");
    },
    _g_cond_g3_429: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":(?:N|MP)");
    },
    _g_cond_g3_430: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 3);
    },
    _g_sugg_g3_180: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,-2)+"s";
    },
    _g_cond_g3_431: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:lit|fauteuil|armoire|commode|guéridon|tabouret|chaise)s?\\b") && ! g_morph(lToken[nLastToken+1], ">sculpter/");
    },
    _g_cond_g3_432: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":D.*:f:s");
    },
    _g_cond_g3_433: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|clair|Claire|") && g_morph(lToken[nTokenOffset+1], ":(?:[123][sp]|P|Y)");
    },
    _g_cond_g3_434: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V");
    },
    _g_cond_g3_435: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", ":[AN].*:[me]:[pi]|>(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre|appara[îi]tre)/.*:(?:[123]p|P|Q|Y)|>(?:affirmer|trouver|croire|désirer|estimer|préférer|penser|imaginer|voir|vouloir|aimer|adorer|rendre|souhaiter)/") && ! g_morph(lToken[nLastToken+1], ":A.*:[me]:[pi]");
    },
    _g_cond_g3_436: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", ":[AN].*:[me]:[pi]|>(?:être|sembler|devenir|re(?:ster|devenir)|para[îi]tre|appara[îi]tre)/.*:(?:[123]p|P|Q|Y)");
    },
    _g_cond_g3_437: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V", ":[DA].*:p");
    },
    _g_cond_g3_438: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":V.*:[123]|>(?:tou(?:te|)s|pas|rien|guère|jamais|toujours|souvent)/", ":[DRB]");
    },
    _g_cond_g3_439: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset], ":V", ":[DA]") && ! g_morph(lToken[nLastToken+1], ":[NA].*:[pi]") && ! (g_morph(lToken[nTokenOffset], ">(?:être|sembler|devenir|rester|demeurer|redevenir|para[îi]tre|trouver)/.*:[123]p") && g_morph(lToken[nLastToken+1], ":G|<end>|>[(,]/"));
    },
    _g_cond_g3_440: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V0e.*:3p") || g_morph(lToken[nLastToken+1], ":[AQ]");
    },
    _g_cond_g3_441: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]");
    },
    _g_cond_g3_442: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]");
    },
    _g_cond_g3_443: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]");
    },
    _g_cond_g3_444: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+7], ":[NA].*:[fe]");
    },
    _g_cond_g3_445: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]");
    },
    _g_cond_g3_446: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]");
    },
    _g_cond_g3_447: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]");
    },
    _g_cond_g3_448: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[fe]") && g_morph(lToken[nTokenOffset+7], ":[NA].*:[fe]");
    },
    _g_cond_g3_449: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[me]");
    },
    _g_cond_g3_450: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+3], ":[NA]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[me]");
    },
    _g_cond_g3_451: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[me]");
    },
    _g_cond_g3_452: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA]") && g_morph(lToken[nTokenOffset+3], ":[NA]") && g_morph(lToken[nTokenOffset+6], ":[NA].*:[me]") && g_morph(lToken[nTokenOffset+7], ":[NA].*:[me]");
    },
    _g_cond_g3_453: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":3[sp]");
    },
    _g_sugg_g3_181: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+2]["sValue"], ":3s");
    },
    _g_cond_g3_454: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+3], ":3[sp]");
    },
    _g_sugg_g3_182: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s");
    },
    _g_sugg_g3_183: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p");
    },
    _g_cond_g3_455: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[me]:[si]", ":3s");
    },
    _g_sugg_g3_184: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+4]["sValue"], ":3s");
    },
    _g_cond_g3_456: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[si]", ">être/") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[me]:[si]", ":3s");
    },
    _g_cond_g3_457: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[si]") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[fe]:[si]", ":3s");
    },
    _g_cond_g3_458: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[si]", ":3s");
    },
    _g_cond_g3_459: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[pi]", ":3s");
    },
    _g_cond_g3_460: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":3p") &&  g_morph(lToken[nTokenOffset+4], ":Q.*:[pi]", ":3s");
    },
    _g_cond_g3_461: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nLastToken-1+1]["sValue"], ":(?:[123][sp]|P)");
    },
    _g_sugg_g3_185: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[123][sp]");
    },
    _g_cond_g3_462: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nTokenOffset+3], ":[NA]", ">plus/|:(?:[123][sp]|P)") && hasSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[123][sp])");
    },
    _g_sugg_g3_186: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[123][sp]");
    },
    _g_cond_g3_463: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nTokenOffset+3], ":[NA]", ":(?:[123][sp]|P)") && hasSimil(lToken[nTokenOffset+3]["sValue"], ":(?:[123][sp])");
    },
    _g_cond_g3_464: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nTokenOffset+2], ":[NA]", ":(?:[123][sp]|P)") && hasSimil(lToken[nTokenOffset+2]["sValue"], ":(?:[123][sp])");
    },
    _g_sugg_g3_187: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+2]["sValue"], ":[123][sp]");
    },
    _g_cond_g3_465: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">être/");
    },
    _g_cond_g3_466: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":D", "*");
    },
    _g_cond_g3_467: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nLastToken-1+1], ":V", ":[YM]" );
    },
    _g_sugg_g3_188: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_g3_468: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nLastToken-1+1], ":V", ":[NYM]" );
    },
    _g_cond_g3_469: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nLastToken-1+1], ":V", ":[YEM]");
    },
    _g_cond_g3_470: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":V", ":M") && ! (lToken[nLastToken-1+1]["sValue"].endsWith("ez") && g_value(lToken[nLastToken+1], "|vous|"));
    },
    _g_cond_g3_471: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|[123][sp])");
    },
    _g_cond_g3_472: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|[12][sp])", ":N");
    },
    _g_cond_g3_473: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V1", ":M");
    },
    _g_sugg_g3_189: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_g3_474: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":V1.*:(?:Q|[123][sp])", ":[NM]");
    },
    _g_cond_g3_475: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:passer|tenir)/") && g_morph0(lToken[nLastToken-1+1], ":V1.*:(?:Q|[123][sp])", ":[NM]");
    },
    _g_cond_g3_476: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nLastToken-1+1]["sValue"].slice(0,1).gl_isUpperCase();
    },
    _g_cond_g3_477: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"].gl_isLowerCase();
    },
    _g_cond_g3_478: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].slice(0,1).gl_isUpperCase() && ! g_morph(lToken[nTokenOffset], ">(?:en|passer|qualifier)/") && ! g_morph(lToken[nTokenOffset+2], ">(?:fieffer|sacrer)/") && ! g_tag(lToken[nTokenOffset], "_rien_") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)(?:quelqu(?:e chose|’une?)|qu’y a-t-il |\\b(?:l(?:es?|a)|nous|vous|me|te|se) trait|personne|points? +$|autant +$|ça +|rien d(?:e |’)|rien(?: +[a-zéèêâîûù]+|) +$)") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_sugg_g3_190: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_479: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":N") && (g_morph0(lToken[nLastToken-1+1], ":V1.*:Q", ":(?:M|Oo)") || g_morph0(lToken[nLastToken-1+1], ":[123][sp]", ":[MNGA]"));
    },
    _g_cond_g3_480: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":(?:Q|2p)", ":M");
    },
    _g_cond_g3_481: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":(?:Q|2p)", ":[MN]");
    },
    _g_cond_g3_482: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":(?:Q|2p)", ":M") && (g_value(lToken[nTokenOffset], "|me|m’|te|t’|se|s’|") || (g_value(lToken[nTokenOffset], "|nous|") && g_value(g_token(lToken, nTokenOffset+1-2), "|nous|")) || (g_value(lToken[nTokenOffset], "|vous|") && g_value(g_token(lToken, nTokenOffset+1-2), "|vous|")));
    },
    _g_cond_g3_483: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|une|la|cette|ma|ta|sa|notre|votre|leur|quelle|de|d’|") && g_morph0(lToken[nLastToken-1+1], ":(?:Q|2p)", ":M");
    },
    _g_cond_g3_484: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":(?:Q|2p)", ":M") && ! (lToken[nLastToken-1+1]["sValue"].endsWith("ez") && g_value(lToken[nLastToken+1], "|vous|"));
    },
    _g_cond_g3_485: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1", ":(?:M|N.*:[me]:[si])");
    },
    _g_cond_g3_486: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1", ":(?:M|N.*:[fe]:[si])");
    },
    _g_cond_g3_487: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1", ":(?:M|N.*:[si])");
    },
    _g_cond_g3_488: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1", ":(?:M|N.*:[pi])");
    },
    _g_cond_g3_489: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1", ":M");
    },
    _g_cond_g3_490: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V", ":M");
    },
    _g_cond_g3_491: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 3) && g_morph(lToken[nTokenOffset+2], ":Q") && ! g_morph(lToken[nTokenOffset], "V0.*:1p");
    },
    _g_cond_g3_492: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 3) && g_morph(lToken[nTokenOffset+2], ":Q") && ! g_morph(lToken[nTokenOffset], "V0.*:2p");
    },
    _g_sugg_g3_191: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbInfi(lToken[nTokenOffset+2]["sValue"])+"|"+suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":Ip", ":2p");
    },
    _g_cond_g3_493: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+2], ":V", ":[123][sp]");
    },
    _g_cond_g3_494: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|devoirs|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D")) && ! (g_value(lToken[nTokenOffset+1], "|devant|") && g_morph(lToken[nLastToken-1+1], ":N"));
    },
    _g_cond_g3_495: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|devoirs|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D")) && ! (g_value(lToken[nTokenOffset+1], "|devant|") && g_morph(lToken[nLastToken-1+1], ":N")) && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_cond_g3_496: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ">puis/") && g_morph(lToken[nLastToken-1+1], ":V", ":M");
    },
    _g_cond_g3_497: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ">puis/") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_cond_g3_498: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":M") && ! g_value(lToken[nTokenOffset], "|me|m’|te|t’|se|s’|nous|vous|le|la|l’|les|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D"));
    },
    _g_cond_g3_499: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":M") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D"));
    },
    _g_cond_g3_500: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":M") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D")) && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_cond_g3_501: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|vouloirs|") && ! g_value(lToken[nTokenOffset], "|me|m’|te|t’|se|s’|nous|vous|le|la|l’|les|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D"));
    },
    _g_cond_g3_502: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|vouloirs|") && g_morph(lToken[nLastToken-1+1], ":V", ":[MN]") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D"));
    },
    _g_cond_g3_503: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|vouloirs|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D"));
    },
    _g_cond_g3_504: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|vouloirs|") && g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset], ":D")) && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_");
    },
    _g_cond_g3_505: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:devoir|savoir|pouvoir|vouloir)/") && g_morph(lToken[nLastToken-1+1], ":(?:Q|A|[123][sp])", ":[GYW]") && !( g_tag(lToken[nTokenOffset+1], "_upron_") && g_morphVC(lToken[nTokenOffset+1], ">(?:savoir|vouloir)/") && g_morph(lToken[nLastToken-1+1], ":[AQ]") );
    },
    _g_cond_g3_506: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:devoir|savoir|pouvoir|vouloir)/") && g_morph(lToken[nLastToken-1+1], ":(?:Q|A|[123][sp])", ":[GYWN]");
    },
    _g_cond_g3_507: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:devoir|savoir|pouvoir|vouloir)/") && g_morph(lToken[nLastToken-1+1], ":(?:Q|A|[123][sp])", ":[GYW]");
    },
    _g_cond_g3_508: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_") && g_morph(lToken[nLastToken-1+1], ":3[sp]"));
    },
    _g_cond_g3_509: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ">(?:en|[mtsnd][e’]|être)/") && g_morph(lToken[nTokenOffset+2], ":V", ":[MG]") && ! (g_morph(lToken[nTokenOffset+1], ":N") && g_morph(lToken[nTokenOffset+2], ":Q.*:m:[sp]"));
    },
    _g_cond_g3_510: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V", ":M") && ! g_value(lToken[nLastToken-1+1], "|varié|variée|variés|variées|");
    },
    _g_cond_g3_511: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":1p");
    },
    _g_cond_g3_512: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":2p");
    },
    _g_cond_g3_513: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V1.*:(?:Q|Ip.*:2p|Iq.*:[123]s)", ">désemparer/.*:Q");
    },
    _g_cond_g3_514: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2p|Iq.*:[123]s)", ">désemparer/.*:Q|:N");
    },
    _g_cond_g3_515: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2p|Iq.*:[123]s)", ">désemparer/.*:Q");
    },
    _g_cond_g3_516: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":N") && g_morph(lToken[nTokenOffset+3], ":V1.*:(?:Q|Ip.*:2p)", ">désemparer/.*:Q");
    },
    _g_cond_g3_517: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":N") && g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2p|Iq.*:[123]s)", ">désemparer/.*:Q|:N");
    },
    _g_cond_g3_518: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":N") && g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2p|Iq.*:[123]s)", ">désemparer/.*:Q");
    },
    _g_cond_g3_519: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">laisser") && (g_morph(lToken[nTokenOffset+2], ":V1.*:(?:Q|Ip.*:2[sp])", ">désemparer/.*:Q") || (! g_morph(lToken[nTokenOffset], ":D") && g_morph(lToken[nLastToken-1+1], ":V1.*:Iq.*:[123]s", ">désemparer/.*:Q")));
    },
    _g_cond_g3_520: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">laisser") && (g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2[sp])", ">désemparer/.*:Q|:N") || (! g_morph(lToken[nTokenOffset], ":D") && g_morph(lToken[nLastToken-1+1], ":V1.*:Iq.*:[123]s", ">désemparer/.*:Q|:N")));
    },
    _g_cond_g3_521: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">laisser") && (g_morph(lToken[nLastToken-1+1], ":V1.*:(?:Q|Ip.*:2[sp])", ">désemparer/.*:Q") || (! g_morph(lToken[nTokenOffset], ":D") && g_morph(lToken[nLastToken-1+1], ":V1.*:Iq.*:[123]s", ">désemparer/.*:Q")));
    },
    _g_cond_g3_522: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph0(lToken[nLastToken-1+1], ":V1.*:(?:Q|[123][sp])", ":[GM]");
    },
    _g_cond_g3_523: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":", ":[GN]") && g_morph(lToken[nTokenOffset+2], ":V", ":M");
    },
    _g_cond_g3_524: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":", ":[GN]") && g_morph(lToken[nTokenOffset+2], ":V", ":M") && ! g_value(lToken[nTokenOffset], "|le|la|l’|les|");
    },
    _g_cond_g3_525: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":", ":[GN]") && g_morph(lToken[nLastToken-1+1], ":V", ":M|>(?:accompagner|affubler|armer|armurer|attifer|casquer|débrailler|déguiser|épuiser)/") && ! g_value(lToken[nLastToken+1], "|par|");
    },
    _g_cond_g3_526: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":", ":[GN]") && g_morph(lToken[nLastToken-1+1], ":V", ":M|>(?:accompagner|affubler|armer|armurer|attifer|casquer|débrailler|déguiser|épuiser)/") && ! g_value(lToken[nLastToken+1], "|par|") && ! g_value(lToken[nTokenOffset], "|me|m’|te|t’|se|s’|lui|");
    },
    _g_cond_g3_527: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V1");
    },
    _g_cond_g3_528: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|que|qu’|");
    },
    _g_cond_g3_529: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], 1, 1);
    },
    _g_sugg_g3_192: function (lToken, nTokenOffset, nLastToken) {
        return "a "+suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":m:s");
    },
    _g_sugg_g3_193: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":m:s");
    },
    _g_cond_g3_530: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+4], lToken[nTokenOffset+4+1], 1, 1);
    },
    _g_sugg_g3_194: function (lToken, nTokenOffset, nLastToken) {
        return "a "+suggVerbPpas(lToken[nTokenOffset+5]["sValue"], ":m:s");
    },
    _g_sugg_g3_195: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+5]["sValue"], ":m:s");
    },
    _g_cond_g3_531: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+5], lToken[nTokenOffset+5+1], 1, 1);
    },
    _g_sugg_g3_196: function (lToken, nTokenOffset, nLastToken) {
        return "a "+suggVerbPpas(lToken[nTokenOffset+6]["sValue"], ":m:s");
    },
    _g_sugg_g3_197: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+6]["sValue"], ":m:s");
    },
    _g_cond_g3_532: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V1.*:Y");
    },
    _g_sugg_g3_198: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_g3_533: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|restent|");
    },
    _g_cond_g3_534: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|restaient|");
    },
    _g_cond_g3_535: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+2], "|resteraient|");
    },
    _g_cond_g3_536: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+3], "|restent|");
    },
    _g_cond_g3_537: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+3], "|restaient|");
    },
    _g_cond_g3_538: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+3], "|resteraient|");
    },
    _g_cond_g3_539: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+4], "|restent|");
    },
    _g_cond_g3_540: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+4], "|restaient|");
    },
    _g_cond_g3_541: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nTokenOffset+4], "|resteraient|");
    },
    _g_cond_g3_542: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! ( g_morph(lToken[nLastToken-1+1], ":Ov") && g_morph(lToken[nLastToken+1], ":(?:Ov|Y)") );
    },
    _g_cond_g3_543: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nLastToken-1+1], "|nous|vous|") && g_morph(lToken[nLastToken+1], ":Y"));
    },
    _g_cond_g3_544: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:p", ":(?:[NA].*:[si]|G)");
    },
    _g_cond_g3_545: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:s", ":(?:[NA].*:[pi]|G)");
    },
    _g_cond_g3_546: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|été|");
    },
    _g_cond_g3_547: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N", ":A") && g_morph(lToken[nTokenOffset+2], ":A");
    },
    _g_cond_g3_548: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|la|le|du|au|");
    },
    _g_cond_g3_549: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|les|des|aux|");
    },
    _g_cond_g3_550: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|le|la|du|au|");
    },
    _g_cond_g3_551: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|autres|");
    },
    _g_cond_g3_552: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_g3_553: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_g3_554: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ">(?:être|demeurer|devenir|redevenir|sembler|para[îi]tre|rester)/");
    },
    _g_cond_g3_555: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|en|");
    },
    _g_cond_g3_556: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|j’|n’|tu|il|on|");
    },
    _g_cond_g3_557: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":M") && g_morph(lToken[nTokenOffset+3], ":M") && g_morph(lToken[nTokenOffset+3], ":M");
    },
    _g_cond_g3_558: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M") && g_morph(lToken[nTokenOffset+4], ":M");
    },
    _g_da_pg_gv1_1: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":Q");
    },
    _g_cond_pg_gv1_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]") && g_morph(lToken[nTokenOffset+5], ":[NA].*:[si]");
    },
    _g_cond_pg_gv1_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":V");
    },
    _g_cond_pg_gv1_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V[0-3]e");
    },
    _g_cond_pg_gv1_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">avoir/");
    },
    _g_cond_pg_gv1_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|sembler|demeurer|para[îi]tre|appara[îi]tre)/");
    },
    _g_cond_pg_gv1_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|sembler)/");
    },
    _g_cond_pg_gv1_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:aller|adorer|affirmer|aimer|croire|déclarer|désirer|détester|devoir|dire|estimer|imaginer|para[îi]tre|penser|pouvoir|préférer|risquer|savoir|sembler|souhaiter|vouloir)/");
    },
    _g_cond_pg_gv1_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:adorer|affirmer|aimer|croire|déclarer|désirer|détester|devoir|dire|estimer|imaginer|para[îi]tre|penser|pouvoir|préférer|risquer|savoir|sembler|souhaiter|vouloir)/");
    },
    _g_cond_pg_gv1_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:arriver|commencer|continuer|parvenir|renoncer|réussir|travailler)/");
    },
    _g_cond_pg_gv1_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:cesser|continuer|craindre|demander|exiger|redouter|rêver|refuser|risquer|venir)/");
    },
    _g_cond_pg_gv1_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V[0-3]e");
    },
    _g_cond_pg_gv1_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nLastToken-1+1], ">(?:avouer|faire|montrer|penser|révéler|savoir|sentir|tenir|voir|vouloir)/");
    },
    _g_cond_pg_gv1_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">efforcer/");
    },
    _g_cond_gv1_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[QA]") && g_agreement(lToken[nTokenOffset+1], lToken[nLastToken-1+1]);
    },
    _g_cond_gv1_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|êtres|");
    },
    _g_cond_gv1_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].endsWith("e") && g_morph(lToken[nTokenOffset+2], ":V1.*:Ip.*:[13]s", ":[GMA]") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\belle +(?:ne +|n’|)$");
    },
    _g_sugg_gv1_1: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":m:s");
    },
    _g_cond_gv1_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && lToken[nTokenOffset+2]["sValue"].endsWith("s") && g_morph(lToken[nTokenOffset+2], ":V1.*:Ip.*:2s", ":[GMA]") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\belles +(?:ne +|n’|)$");
    },
    _g_sugg_gv1_2: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":m:p");
    },
    _g_cond_gv1_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|avoirs|");
    },
    _g_cond_gv1_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].endsWith("e") && g_morph(lToken[nTokenOffset+2], ":V1.*:Ip.*:[13]s", ":[GM]|>envie/");
    },
    _g_cond_gv1_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && lToken[nTokenOffset+2]["sValue"].endsWith("s") && g_morph(lToken[nTokenOffset+2], ":V1.*:Ip.*:2s", ":[GM]");
    },
    _g_cond_gv1_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":G");
    },
    _g_cond_gv1_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA]", ":G");
    },
    _g_cond_gv1_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V.*:3p", ":[GPY]") && ! g_value(lToken[nLastToken+1], "|ils|elles|iel|iels|") && ( (g_morph(lToken[nTokenOffset+3], ":V...t_") && g_value(lToken[nLastToken+1], "le|la|l’|un|une|ce|cet|cette|mon|ton|son|ma|ta|sa|leur") && ! g_tag(lToken[nLastToken+1], "_enum_")) || g_morph(lToken[nTokenOffset+3], ":V..i__") );
    },
    _g_sugg_gv1_3: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":1p");
    },
    _g_cond_gv1_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_value(lToken[nLastToken-1+1], "|somme|");
    },
    _g_cond_gv1_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_sugg_gv1_4: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":1p");
    },
    _g_sugg_gv1_5: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":2p");
    },
    _g_cond_gv1_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|que|qu’|") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_sugg_gv1_6: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":s");
    },
    _g_sugg_gv1_7: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:s");
    },
    _g_cond_gv1_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]", ":[fe]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[bcçdfghjklmnpqrstvwxz].*:[NA].*:m:[si]", ":[fe]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>qu[e’]/") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_sugg_gv1_8: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:s");
    },
    _g_cond_gv1_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]", ":[me]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ">[aâeéèêiîoôuûyœæh].*:[NA].*:f:[si]", ":[me]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:e:[si]", ":[mf]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>qu[e’]/") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e_", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_sugg_gv1_9: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":p");
    },
    _g_cond_gv1_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|que|qu’|") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e_", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_sugg_gv1_10: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":m:p");
    },
    _g_sugg_gv1_11: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"], ":f:p");
    },
    _g_cond_gv1_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1], false) && ! g_morph(lToken[nLastToken-1+1], ">(?:dire|parler)/") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[pi]", ":[fe]");
    },
    _g_cond_gv1_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[pi]", ":[me]");
    },
    _g_cond_gv1_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:e:[pi]");
    },
    _g_cond_gv1_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[pi]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_cond_gv1_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[pi]") && ! g_morph(lToken[nTokenOffset], ":[RV]") && ( g_value(lToken[nLastToken+1], "|<end>|") || g_morph(lToken[nLastToken-1+1], ":V[123]_.__p_e", "*") || ( g_tag(lToken[nLastToken-1+1], "_COI_") && g_morph(lToken[nLastToken-1+1], ":V[123]_.t.q", "*") ) );
    },
    _g_sugg_gv1_12: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[123]s");
    },
    _g_cond_gv1_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[123]p");
    },
    _g_cond_gv1_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[123]s") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\bon (?:ne |)$");
    },
    _g_sugg_gv1_13: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-2+1], ">(?:matin|soir|soirée|nuit|après-midi|jour|année|semaine|mois|seconde|minute|heure|siècle|millénaire|fois)/");
    },
    _g_sugg_gv1_14: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nLastToken-4+1]["sValue"], ":m:s");
    },
    _g_cond_gv1_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V0");
    },
    _g_sugg_gv1_15: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_sugg_gv1_16: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_gv1_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! lToken[nTokenOffset+2]["sValue"].endsWith("ons");
    },
    _g_cond_gv1_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V.e");
    },
    _g_sugg_gv1_17: function (lToken, nTokenOffset, nLastToken) {
        return suggSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/");
    },
    _g_sugg_gv1_18: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":s");
    },
    _g_cond_gv1_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/") && ! g_morph(lToken[nTokenOffset+2], ":Y");
    },
    _g_cond_gv1_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_");
    },
    _g_cond_gv1_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_");
    },
    _g_cond_gv1_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_sugg_gv1_19: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|question|") && g_morphVC(lToken[nTokenOffset+1], ":V.e.*:[123]s");
    },
    _g_sugg_gv1_20: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|question|");
    },
    _g_cond_gv1_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/.*:[123]s");
    },
    _g_cond_gv1_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/.*:[123]s") && ! g_morph(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_gv1_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_LVEID_") && g_morphVC(lToken[nTokenOffset+1], ":3s") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|question|");
    },
    _g_cond_gv1_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_") && g_morphVC(lToken[nTokenOffset+2], ":3s") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|question|");
    },
    _g_cond_gv1_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_") && g_morphVC(lToken[nTokenOffset+2], ":3s") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|question|");
    },
    _g_cond_gv1_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0e.*:3s") && g_morph(lToken[nTokenOffset+2], ":[QA].*:p");
    },
    _g_cond_gv1_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":V0e.*:3p") && g_morph(lToken[nTokenOffset+2], ":[QA].*:s");
    },
    _g_sugg_gv1_21: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0e.*:3s");
    },
    _g_cond_gv1_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morphVC(lToken[nTokenOffset+1], ":V0e.*:3p");
    },
    _g_sugg_gv1_22: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":p");
    },
    _g_cond_gv1_57: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && g_morph(lToken[nTokenOffset+2], ":(?:3s|P)") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_58: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && g_morph(lToken[nTokenOffset+3], ":(?:3s|P)") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_59: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && g_morph(lToken[nTokenOffset+4], ":(?:3s|P)") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_60: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && g_morph(lToken[nTokenOffset+5], ":(?:3s|P)") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_61: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], "[123][sp]");
    },
    _g_cond_gv1_62: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], "[123][sp]");
    },
    _g_cond_gv1_63: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], "[123][sp]");
    },
    _g_cond_gv1_64: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+6], "[123][sp]");
    },
    _g_cond_gv1_65: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_66: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+6], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_67: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_gv1_68: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)");
    },
    _g_cond_gv1_69: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+4], ":(?:[123]s|P)");
    },
    _g_cond_gv1_70: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+5], ":(?:[123]s|P)");
    },
    _g_cond_gv1_71: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+6], ":(?:[123]s|P)");
    },
    _g_cond_gv1_72: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+7], ":(?:[123]s|P)");
    },
    _g_cond_gv1_73: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && g_morph(lToken[nTokenOffset+2], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_sugg_gv1_23: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_74: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_75: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && g_morph(lToken[nTokenOffset+4], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_76: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_enum_") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:et|ou)/") && g_morph(lToken[nTokenOffset+5], ":(?:[123]s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_77: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V.e.*:[123]s") && ! g_value(lToken[nTokenOffset], "|se|s’|");
    },
    _g_sugg_gv1_24: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_sugg_gv1_25: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"], ":f:s");
    },
    _g_cond_gv1_78: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_LVEID_") && g_morphVC(lToken[nTokenOffset+1], ":3s") && ! g_value(lToken[nLastToken-1+1], "|néant|");
    },
    _g_cond_gv1_79: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_") && g_morphVC(lToken[nTokenOffset+2], ":3s") && ! g_value(lToken[nLastToken-1+1], "|néant|");
    },
    _g_cond_gv1_80: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_") && g_morphVC(lToken[nTokenOffset+2], ":3s") && ! g_value(lToken[nLastToken-1+1], "|néant|");
    },
    _g_cond_gv1_81: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|néant|") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)");
    },
    _g_cond_gv1_82: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|néant|") && g_morph(lToken[nTokenOffset+4], ":(?:[123]s|P)");
    },
    _g_cond_gv1_83: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|néant|") && g_morph(lToken[nTokenOffset+5], ":(?:[123]s|P)");
    },
    _g_cond_gv1_84: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|néant|") && g_morph(lToken[nTokenOffset+6], ":(?:[123]s|P)");
    },
    _g_cond_gv1_85: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|néant|") && g_morph(lToken[nTokenOffset+7], ":(?:[123]s|P)");
    },
    _g_sugg_gv1_26: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_86: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/") && ! g_morph(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_gv1_87: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+2], ":(?:3s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_88: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+3], ":(?:3s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_89: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+4], ":(?:3s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_90: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+5], ":(?:3s|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_91: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V.e.*:[123]s");
    },
    _g_cond_gv1_92: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":3s");
    },
    _g_cond_gv1_93: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_") && g_morphVC(lToken[nTokenOffset+2], ":3s");
    },
    _g_cond_gv1_94: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_") && g_morphVC(lToken[nTokenOffset+2], ":3s");
    },
    _g_cond_gv1_95: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:ne|nous)/") && g_morph(lToken[nTokenOffset+2], ":(?:1p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_sugg_gv1_27: function (lToken, nTokenOffset, nLastToken) {
        return suggPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_96: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:ne|nous)/") && g_morph(lToken[nTokenOffset+3], ":(?:1p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_97: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:ne|nous)/") && g_morph(lToken[nTokenOffset+4], ":(?:1p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_98: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:ne|nous)/") && g_morph(lToken[nTokenOffset+5], ":(?:1p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_99: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V.e.*:1p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_value(lToken[nTokenOffset], "|nous|");
    },
    _g_cond_gv1_100: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_101: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/.*:1p");
    },
    _g_cond_gv1_102: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/.*:1p") && ! g_morph(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_gv1_103: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_LVEID_") && g_morphVC(lToken[nTokenOffset+1], ":1p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_104: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_") && g_morphVC(lToken[nTokenOffset+2], ":1p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_105: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_") && g_morphVC(lToken[nTokenOffset+2], ":1p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_106: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|rendez-vous|") && g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/");
    },
    _g_cond_gv1_107: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|rendez-vous|") && g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/") && ! g_morph(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_gv1_108: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_sugg_gv1_28: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_cond_gv1_109: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V.e.*:3p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_value(lToken[nTokenOffset], "|se|s’|");
    },
    _g_sugg_gv1_29: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_110: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/.*:3p");
    },
    _g_cond_gv1_111: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:sembler|rester|demeurer|para[îi]tre)/.*:3p") && ! g_morph(lToken[nLastToken-1+1], ":Y");
    },
    _g_cond_gv1_112: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_LVEID_") && g_morphVC(lToken[nTokenOffset+1], ":3p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_113: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_VEPI_") && g_morphVC(lToken[nTokenOffset+2], ":3p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_114: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_LVEPID_") && g_morphVC(lToken[nTokenOffset+2], ":3p") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_cond_gv1_115: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+2], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_116: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+3], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_117: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+4], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_118: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+5], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_119: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_120: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_121: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_122: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+6], ":(?:3p|P)") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_123: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|");
    },
    _g_sugg_gv1_30: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nLastToken-1+1]["sValue"]);
    },
    _g_sugg_gv1_31: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv1_124: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">(?:être|devenir|redevenir)/.*:3p") && ! g_value(lToken[nTokenOffset], "|se|s’|");
    },
    _g_cond_gv1_125: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+2], ":(?:3p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_126: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+3], ":(?:3p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_127: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+4], ":(?:3p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_128: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset], ":[RV]") && g_morph(lToken[nTokenOffset+5], ":(?:3p|P)") && ! g_tag(lToken[nTokenOffset], "_ceque_");
    },
    _g_cond_gv1_129: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123]s", ":[GNAQWY]");
    },
    _g_sugg_gv1_32: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_gv1_130: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "[çcCÇ]’$|[cC][eE] n’$|[çÇ][aA] (?:[nN]’|)$") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)^ *ne pas ") && ! g_morph(lToken[nTokenOffset], ":Y");
    },
    _g_cond_gv1_131: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":Y", ":[AN]");
    },
    _g_cond_gv1_132: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V1..t.*:Y", ":[AN]") && ! g_morph(lToken[nLastToken+1], ":D");
    },
    _g_cond_gv1_133: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nLastToken+1], "|et|ou|comme|") && g_value(g_token(lToken, nLastToken+2), "|hivers|automnes|printemps|"));
    },
    _g_cond_gv1_134: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+2], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_135: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+3], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_136: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+4], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_137: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+5], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_138: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_139: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_140: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_141: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":[123]s", ":(?:C|N.*:p|[123]p)");
    },
    _g_cond_gv1_142: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+2], ":[13]p");
    },
    _g_cond_gv1_143: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+3], ":[13]p");
    },
    _g_cond_gv1_144: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+4], ":[13]p");
    },
    _g_cond_gv1_145: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && ! g_morph(lToken[nTokenOffset+1], ":G") && g_morph(lToken[nTokenOffset+5], ":[13]p");
    },
    _g_cond_gv1_146: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+2], ":[13]p");
    },
    _g_cond_gv1_147: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[13]p");
    },
    _g_cond_gv1_148: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+4], ":[13]p");
    },
    _g_cond_gv1_149: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+5], ":[13]p");
    },
    _g_cond_gv1_150: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_agreement(lToken[nTokenOffset+1], lToken[nLastToken-1+1]);
    },
    _g_cond_gv1_151: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":[GW]") && (g_morph(lToken[nTokenOffset+4], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+4], ":P")));
    },
    _g_cond_gv1_152: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":[GW]") && (g_morph(lToken[nTokenOffset+5], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+5], ":P")));
    },
    _g_cond_gv1_153: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":[GW]") && (g_morph(lToken[nTokenOffset+6], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+6], ":P")));
    },
    _g_cond_gv1_154: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":[GW]") && (g_morph(lToken[nTokenOffset+7], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+7], ":P")));
    },
    _g_cond_gv1_155: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":[GW]") && (g_morph(lToken[nTokenOffset+8], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+8], ":P")));
    },
    _g_cond_gv1_156: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":[GW]") && (g_morph(lToken[nTokenOffset+4], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+4], ":P")));
    },
    _g_cond_gv1_157: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":[GW]") && (g_morph(lToken[nTokenOffset+5], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+5], ":P")));
    },
    _g_cond_gv1_158: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":[GW]") && (g_morph(lToken[nTokenOffset+6], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+6], ":P")));
    },
    _g_cond_gv1_159: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":[GW]") && (g_morph(lToken[nTokenOffset+7], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+7], ":P")));
    },
    _g_cond_gv1_160: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":[GW]") && (g_morph(lToken[nTokenOffset+8], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+8], ":P")));
    },
    _g_cond_gv1_161: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+4], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+4], ":P")));
    },
    _g_cond_gv1_162: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":m", ":[fe]");
    },
    _g_cond_gv1_163: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":f", ":[me]");
    },
    _g_cond_gv1_164: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:[si]") && g_morph(lToken[nLastToken-1+1], ":p", ":[si]");
    },
    _g_cond_gv1_165: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+5], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+5], ":P")));
    },
    _g_cond_gv1_166: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+6], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+6], ":P")));
    },
    _g_cond_gv1_167: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+7], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+7], ":P")));
    },
    _g_cond_gv1_168: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+8], ":[123]s") || (! g_tag(lToken[nTokenOffset+3], "_enum_") && g_morph(lToken[nTokenOffset+8], ":P")));
    },
    _g_cond_gv1_169: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+4], ":(?:[123]p|P)");
    },
    _g_cond_gv1_170: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":m", ":[fe]");
    },
    _g_cond_gv1_171: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":f", ":[me]");
    },
    _g_cond_gv1_172: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":s", ":[pi]");
    },
    _g_cond_gv1_173: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+5], ":(?:[123]p|P)");
    },
    _g_cond_gv1_174: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+6], ":(?:[123]p|P)");
    },
    _g_cond_gv1_175: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+7], ":(?:[123]p|P)");
    },
    _g_cond_gv1_176: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+8], ":(?:[123]p|P)");
    },
    _g_cond_gv1_177: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+4], ":(?:[123]p|P)");
    },
    _g_cond_gv1_178: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+5], ":(?:[123]p|P)");
    },
    _g_cond_gv1_179: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+6], ":(?:[123]p|P)");
    },
    _g_cond_gv1_180: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+7], ":(?:[123]p|P)");
    },
    _g_cond_gv1_181: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+8], ":(?:[123]p|P)");
    },
    _g_cond_gv1_182: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+4], ":(?:[123]p|P)");
    },
    _g_cond_gv1_183: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+5], ":(?:[123]p|P)");
    },
    _g_cond_gv1_184: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+6], ":(?:[123]p|P)");
    },
    _g_cond_gv1_185: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+7], ":(?:[123]p|P)");
    },
    _g_cond_gv1_186: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":[GW]") && g_morph(lToken[nTokenOffset+8], ":(?:[123]p|P)");
    },
    _g_cond_gv1_187: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+3], ":[123]s") || (! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+3], ":P")));
    },
    _g_cond_gv1_188: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M.*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":[AQ].*:m", ":[fe]");
    },
    _g_cond_gv1_189: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":M.*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":[AQ].*:f", ":[me]");
    },
    _g_cond_gv1_190: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":p", ":[AQ].*:[si]");
    },
    _g_cond_gv1_191: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+4], ":[123]s") || (! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+4], ":P")));
    },
    _g_cond_gv1_192: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+5], ":[123]s") || (! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+5], ":P")));
    },
    _g_cond_gv1_193: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+6], ":[123]s") || (! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+6], ":P")));
    },
    _g_cond_gv1_194: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && ! g_value(lToken[nLastToken-1+1], "|légion|pléthore|néant|réalité|") && (g_morph(lToken[nTokenOffset+7], ":[123]s") || (! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+7], ":P")));
    },
    _g_cond_gv1_195: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:[fp]", ":(?:G|:m:[si])") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)");
    },
    _g_cond_gv1_196: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:[mp]", ":(?:G|:f:[si])") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)");
    },
    _g_cond_gv1_197: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:[fs]", ":(?:G|:m:[pi])") && g_morph(lToken[nTokenOffset+3], ":(?:[123]p|P)");
    },
    _g_cond_gv1_198: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:[ms]", ":(?:G|:f:[pi])") && g_morph(lToken[nTokenOffset+3], ":(?:[123]p|P)");
    },
    _g_cond_gv1_199: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":[NA]:f", ":[me]");
    },
    _g_cond_gv1_200: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[AQ].*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":[NA]:m", ":[fe]");
    },
    _g_cond_gv1_201: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ].*:p", ":[Gsi]") && g_morph(lToken[nTokenOffset+3], ":(?:[123]s|P)");
    },
    _g_cond_gv1_202: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[AQ].*:s", ":[Gpi]") && g_morph(lToken[nTokenOffset+3], ":(?:[123]p|P)");
    },
    _g_cond_gv1_203: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[AQ].*:(?:[me]:p|f)", ":(?:G|Y|V0|P|[AQ].*:m:[si])") && ! (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+3], ":3s"));
    },
    _g_sugg_gv1_33: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_gv1_204: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[AQ].*:(?:[fe]:p|m)", ":(?:G|Y|V0|P|[AQ].*:f:[si])") && ! (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+2], ":3s"));
    },
    _g_sugg_gv1_34: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_gv1_205: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[AQ].*:s", ":(?:G|Y|V0|P|[AQ].*:[ip])") && ! (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+3], ":3s"));
    },
    _g_cond_gv1_206: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[AQ].*:p", ":(?:G|Y|V0|P|[AQ].*:[si])") && ! (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+3], ":3s"));
    },
    _g_cond_gv1_207: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3s") && g_morph(lToken[nTokenOffset+4], ":[AQ].*:[fp]", ":(?:G|Y|V0|P|[AQ].*:m:[si])");
    },
    _g_sugg_gv1_35: function (lToken, nTokenOffset, nLastToken) {
        return suggMasSing(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_gv1_208: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3s") && g_morph(lToken[nTokenOffset+4], ":[AQ].*:[mp]", ":(?:G|Y|V0|P|[AQ].*:f:[si])") && ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_sugg_gv1_36: function (lToken, nTokenOffset, nLastToken) {
        return suggFemSing(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_gv1_209: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3p") && g_morph(lToken[nTokenOffset+4], ":[AQ].*:[fs]", ":(?:G|Y|V0|P|[AQ].*:m:[pi])");
    },
    _g_sugg_gv1_37: function (lToken, nTokenOffset, nLastToken) {
        return suggMasPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_gv1_210: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3p") && g_morph(lToken[nTokenOffset+4], ":[AQ].*:[ms]", ":(?:G|Y|V0|P|[AQ].*:f:[pi])") && ! g_morph(lToken[nTokenOffset], ":R");
    },
    _g_sugg_gv1_38: function (lToken, nTokenOffset, nLastToken) {
        return suggFemPlur(lToken[nTokenOffset+4]["sValue"]);
    },
    _g_cond_gv1_211: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":3s") && g_morph(lToken[nTokenOffset+3], ":[AQ].*:p", ":(?:G|Y|V0|P|[AQ].*:[si])");
    },
    _g_cond_gv1_212: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":3p") && g_morph(lToken[nTokenOffset+3], ":[AQ].*:s", ":(?:G|Y|V0|[AQ].*:[pi])");
    },
    _g_cond_gv1_213: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ( ! g_morph(lToken[nTokenOffset+2], ":1p") || (g_morph(lToken[nTokenOffset+2], ":1p") && g_value(lToken[nTokenOffset], "|nous|ne|")) ) && g_morph(lToken[nTokenOffset+3], ":[AQ].*:s", ":(?:G|Y|V0|P|[AQ].*:[ip])") && ! (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+3], ":3s"));
    },
    _g_cond_gv1_214: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|d’|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:m:[si]");
    },
    _g_cond_gv1_215: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|d’|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:f:[si]");
    },
    _g_cond_gv1_216: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|d’|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]");
    },
    _g_cond_gv1_217: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":[NA].*:[fs]", ":[me]:[pi]");
    },
    _g_cond_gv1_218: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":[NA].*:[ms]", ":[fe]:[pi]");
    },
    _g_cond_gv1_219: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":[NA].*:s", ":[pi]");
    },
    _g_cond_gv1_220: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[AQ]", ":G|;C") && ! g_agreement(lToken[nTokenOffset+2], lToken[nLastToken-1+1], false);
    },
    _g_sugg_gv1_39: function (lToken, nTokenOffset, nLastToken) {
        return g_suggAgree(lToken[nLastToken-1+1], lToken[nTokenOffset+2]);
    },
    _g_cond_gv1_221: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|l’|") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_");
    },
    _g_cond_gv1_222: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q|>soit/") && (g_morph(lToken[nTokenOffset+2], ":Y", ":[NAQ]") || g_morph(lToken[nTokenOffset+2], ">(?:aller|manger)/")) && ! g_morph(lToken[nTokenOffset], ":Y|>ce/") && ! g_value(lToken[nTokenOffset], "|c’|") && ! g_value(g_token(lToken, nTokenOffset+1-2), "|ce|") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_sujinfi_");
    },
    _g_cond_gv1_223: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[123]s");
    },
    _g_cond_gv1_224: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+1], ":[123]p");
    },
    _g_cond_gv1_225: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q|>soit/") && g_morph(lToken[nTokenOffset+2], ":2p", ":[NAQ]");
    },
    _g_cond_gv1_226: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q|>soit/") && g_morph(lToken[nTokenOffset+2], ":2s", ":[NAQ]");
    },
    _g_cond_gv1_227: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q|>soit/") && g_morph(lToken[nTokenOffset+2], ":V(?:2.*:Ip.*:3s|3.*:Is.*:3s)", ":[NAQ]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_sujinfi_");
    },
    _g_cond_gv1_228: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":Q|>soit/") && g_morph(lToken[nTokenOffset+2], ":V3.*:Is.*:3s", ":[NAQ]") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_ceque_") && ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_sujinfi_");
    },
    _g_cond_gv1_229: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:et|ou)/");
    },
    _g_cond_gv1_230: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]", ":f");
    },
    _g_cond_gv1_231: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]", ":m");
    },
    _g_cond_gv1_232: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M.*:m", ":M.*:[fe]");
    },
    _g_cond_gv1_233: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NA].*:m:[pi]", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":[NA].*:f");
    },
    _g_cond_gv1_234: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+3], ":[NA].*:f:[pi]", ":[me]") && g_morph(lToken[nLastToken-1+1], ":[NA].*:(?:m:p|f:s)");
    },
    _g_cond_gv1_235: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V0a.*:[123]s") && g_morph(lToken[nLastToken-1+1], ":A.*:p") && ! g_value(lToken[nTokenOffset], "|on|");
    },
    _g_cond_gv1_236: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+1], ":V0a.*:[123]p") && g_morph(lToken[nLastToken-1+1], ":A.*:s");
    },
    _g_cond_gv1_237: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ":V0a");
    },
    _g_cond_gv1_238: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_sugg_gv1_40: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+3]["sValue"].slice(0,-1);
    },
    _g_cond_gv1_239: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|") && ! g_value(lToken[nTokenOffset], "|m’|t’|l’|nous|vous|les|");
    },
    _g_cond_gv1_240: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|figure|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|") && (g_value(lToken[nTokenOffset], "|<start>|,|comme|comment|et|lorsque|lorsqu’|mais|où|ou|quand|qui|pourquoi|puisque|puisqu’|quoique|quoiqu’|si|s’|sinon|") || (g_value(lToken[nTokenOffset], "|que|qu’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":V|<start>", ":[NA]"))) && lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nLastToken-1+1], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    _g_cond_gv1_241: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|figure|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|") && (g_value(lToken[nTokenOffset], "|<start>|,|comme|comment|et|lorsque|lorsqu’|mais|où|ou|quand|qui|pourquoi|puisque|puisqu’|quoique|quoiqu’|si|s’|sinon|") || (g_value(lToken[nTokenOffset], "|que|qu’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":V|<start>", ":[NA]"))) && lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nLastToken-1+1], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|N|Q.*:m:[si])");
    },
    _g_cond_gv1_242: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|figure|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|") && (g_value(lToken[nTokenOffset], "|<start>|,|comme|comment|et|lorsque|lorsqu’|mais|où|ou|quand|qui|pourquoi|puisque|puisqu’|quoique|quoiqu’|si|s’|sinon|") || (g_value(lToken[nTokenOffset], "|que|qu’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":V|<start>", ":[NA]"))) && lToken[nLastToken-1+1]["sValue"].gl_isLowerCase() && g_morph(lToken[nLastToken-1+1], ":(?:[123][sp])", ":[GWQ]");
    },
    _g_cond_gv1_243: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":Os") && ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|garde|peine|prise|crainte|cure|affaire|hâte|force|recours|") && (g_value(lToken[nTokenOffset], "|<start>|,|comme|comment|et|lorsque|lorsqu’|mais|où|ou|quand|qui|pourquoi|puisque|puisqu’|quoique|quoiqu’|si|s’|sinon|") || (g_value(lToken[nTokenOffset], "|que|qu’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":V|<start>", ":[NA]"))) && ! lToken[nLastToken-1+1]["sValue"].gl_isUpperCase() && g_morph(lToken[nLastToken-1+1], ":(?:[123][sp]|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])");
    },
    _g_cond_gv1_244: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|barre|confiance|charge|cours|envie|garde|peine|prise|crainte|cure|affaire|hâte|force|recours|") && (g_value(lToken[nTokenOffset], "|<start>|,|comme|comment|et|lorsque|lorsqu’|mais|où|ou|quand|qui|pourquoi|puisque|puisqu’|quoique|quoiqu’|si|s’|sinon|") || (g_value(lToken[nTokenOffset], "|que|qu’|") && g_morph(g_token(lToken, nTokenOffset+1-2), ":V|<start>", ":[NA]"))) && g_morph(lToken[nTokenOffset+2], ":[NA]", ":G") && ! lToken[nLastToken-1+1]["sValue"].gl_isUpperCase() && g_morph(lToken[nLastToken-1+1], ":(?:[123][sp]|Y|Q.*:[fp])", ":(?:G|W|Q.*:m:[si])") && ! (g_value(lToken[nLastToken-2+1], "|avions|") && g_morph(lToken[nLastToken-1+1], ":3[sp]"));
    },
    _g_cond_gv1_245: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V0a");
    },
    _g_cond_gv1_246: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V0a", ":1p") && g_morph(lToken[nTokenOffset+3], ":V[0-3]..t_.*:Q.*:s", ":[GWpi]") && g_morph(lToken[nTokenOffset], ":(?:M|Os|N)", ":R") && ! g_value(g_token(lToken, nTokenOffset+1-2), "|que|qu’|");
    },
    _g_cond_gv1_247: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tagbefore(lToken[nTokenOffset+1], dTags, "_que_") || g_morph(lToken[nTokenOffset+3], ":V[0-3]..t_");
    },
    _g_cond_gv1_248: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|confiance|charge|cours|envie|garde|peine|prise|crainte|cure|affaire|hâte|force|recours|");
    },
    _g_cond_gv1_249: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|confiance|charge|cours|envie|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|pouvoir|");
    },
    _g_cond_gv1_250: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+2], ":N.*:[si]");
    },
    _g_cond_gv1_251: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|confiance|charge|cours|envie|garde|marre|peine|prise|crainte|cure|affaire|hâte|force|recours|");
    },
    _g_cond_gv1_252: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|A|avions|avoirs|") && g_morph(lToken[nTokenOffset+2], ":(?:Y|2p)");
    },
    _g_cond_gv1_253: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && lToken[nTokenOffset+1]["sValue"] == "a" && lToken[nTokenOffset+2]["sValue"].endsWith("r") && ! g_value(lToken[nTokenOffset], "|n’|m’|t’|l’|il|on|elle|");
    },
    _g_cond_gv1_254: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|A|avions|avoirs|") && g_morph(lToken[nTokenOffset+2], ":V(?:2.*:Ip.*:3s|3.*:Is.*:3s)", ":[NAQ]");
    },
    _g_cond_gv1_255: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|A|avions|avoirs|") && g_morph(lToken[nTokenOffset+2], ":V3.*:I[ps].*:[12]s", ":[NAQ]");
    },
    _g_cond_gv1_256: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|A|avions|avoirs|") && g_morph(lToken[nTokenOffset+2], ":V3.*:Is.*:3s", ":[NAQ]");
    },
    _g_cond_gv1_257: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]");
    },
    _g_cond_gv1_258: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]", ">(?:fois|impression)/") && ! g_morph(lToken[nLastToken+1], ":(?:Y|Ov|D|ÉV)|>qu[e’]/") && ! ((g_value(lToken[nLastToken-1+1], "|commencé|décidé|essayé|fini|imaginé|ordonné|oublié|recommencé|supplié|tenté|") && g_value(lToken[nLastToken+1], "|de|d’|")) || (g_value(lToken[nLastToken-1+1], "|commencé|recommencé|réussi|pensé|échoué|") && g_value(lToken[nLastToken+1], "|à|")));
    },
    _g_cond_gv1_259: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":(?:Y|Ov|D|ÉV)|>qu[e’]/");
    },
    _g_cond_gv1_260: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]|>impression/") && g_morph(lToken[nLastToken-1+1], ":Q.*:[fp]", ":[me]:[si]");
    },
    _g_cond_gv1_261: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":Q.*:[mp]", ":[fe]:[si]");
    },
    _g_cond_gv1_262: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]") && g_morph(lToken[nLastToken-1+1], ":Q.*:p", ":[si]");
    },
    _g_cond_gv1_263: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|<end>|)|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]");
    },
    _g_cond_gv1_264: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|<end>|)|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]", ">(?:fois|impression)/");
    },
    _g_cond_gv1_265: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|<end>|)|") && g_morph(lToken[nTokenOffset+2], ":[NA]");
    },
    _g_cond_gv1_266: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":Q.*:[fp]", ":[me]:[si]");
    },
    _g_cond_gv1_267: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":(?:Y|Ov|D|LV|ÉV)") && ! ((g_value(lToken[nLastToken-1+1], "|commencé|décidé|essayé|fini|imaginé|ordonné|oublié|recommencé|supplié|tenté|") && g_value(lToken[nLastToken+1], "|de|d’|")) || (g_value(lToken[nLastToken-1+1], "|commencé|recommencé|réussi|pensé|échoué|") && g_value(lToken[nLastToken+1], "|à|"))) && g_morph(lToken[nTokenOffset+2], ":[NA]");
    },
    _g_cond_gv1_268: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NA].*:m", ":[fe]") && g_morph(lToken[nLastToken-1+1], ":Q.*:[fs]", ":[me]:[pi]");
    },
    _g_cond_gv1_269: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:f", ":[me]") && g_morph(lToken[nLastToken-1+1], ":Q.*:[ms]", ":[fe]:[pi]");
    },
    _g_cond_gv1_270: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[NA].*:[pi]") && g_morph(lToken[nLastToken-1+1], ":Q.*:s", ":[pi]");
    },
    _g_cond_gv1_271: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":(?:Y|Ov|D|LV|ÉV)") && ! ((g_value(lToken[nLastToken-1+1], "|commencé|décidé|essayé|fini|imaginé|ordonné|oublié|recommencé|supplié|tenté|") && g_value(lToken[nLastToken+1], "|de|d’|")) || (g_value(lToken[nLastToken-1+1], "|commencé|recommencé|réussi|pensé|échoué|") && g_value(lToken[nLastToken+1], "|à|"))) && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[pi]");
    },
    _g_cond_gv1_272: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken+1], ":(?:Y|Ov|D|LV|ÉV)") && ! ((g_value(lToken[nLastToken-1+1], "|commencé|décidé|essayé|fini|imaginé|ordonné|oublié|recommencé|supplié|tenté|") && g_value(lToken[nLastToken+1], "|de|d’|")) || (g_value(lToken[nLastToken-1+1], "|commencé|recommencé|réussi|pensé|échoué|") && g_value(lToken[nLastToken+1], "|à|"))) && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[pi]");
    },
    _g_cond_gv1_273: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|<end>|)|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[pi]");
    },
    _g_cond_gv1_274: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && g_value(lToken[nLastToken+1], "|<end>|)|") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[pi]");
    },
    _g_cond_gv1_275: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|pouvoir|");
    },
    _g_cond_gv1_276: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ":V0a") && ! g_value(lToken[nTokenOffset+3], "|barre|charge|confiance|cours|envie|garde|peine|marre|prise|crainte|cure|affaire|hâte|force|recours|");
    },
    _g_cond_gv1_277: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":(?:Y|[123][sp])", ":[QMG]");
    },
    _g_sugg_gv1_41: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+3]["sValue"], ":m:s");
    },
    _g_cond_gv1_278: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_value(lToken[nTokenOffset+1], "|les|l’|m’|t’|nous|vous|en|") && g_morph(lToken[nTokenOffset+3], ":Q.*:[fp]", ":m:[si]") && ! g_morph(lToken[nTokenOffset+1], ":[NA].*:[fp]") && ! look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:quel(?:le|)s?|combien) ");
    },
    _g_cond_gv1_279: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nLastToken-2+1], ":V0a") && ! g_value(lToken[nLastToken-1+1], "|barre|charge|confiance|cours|envie|garde|peine|marre|prise|crainte|cure|affaire|hâte|force|recours|");
    },
    _g_cond_gv1_280: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":(?:Y|[123][sp])", ":[QMG]");
    },
    _g_cond_gv1_281: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nLastToken-1+1], ":Q.*:[fp]", ":m:[si]");
    },
    _g_cond_gv1_282: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ":V0a") && g_morph(lToken[nTokenOffset+3], ":(?:Y|2p|Q.*:p|3[sp])", ":[GWsi]");
    },
    _g_cond_gv1_283: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+2], ":V0a") && g_morph(lToken[nTokenOffset+3], ":(?:Y|2p|Q.*:s|3[sp])", ":[GWpi]");
    },
    _g_sugg_gv1_42: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+3]["sValue"], ":p");
    },
    _g_cond_gv1_284: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:p", ":[GEMWPsi]") && ! g_tag(lToken[nTokenOffset+2], "_exctx_");
    },
    _g_cond_gv1_285: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|bref|désolé|désolée|pire|")  && ! g_tag(lToken[nTokenOffset+2], "_exctx_") && g_morph(lToken[nTokenOffset+2], ":A.*:[fp]", ":(?:G|E|M1|W|P|m:[si])") && ! g_morph(lToken[nLastToken+1], ">falloir/") && ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), "^ +(?:y (?:a|aura|avait|eut)|d(?:ut|oit|evait|evra) y avoir|s’agi(?:ssait|t|ra))[, .]");
    },
    _g_cond_gv1_286: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|bref|désolé|désolée|pire|") && ! g_tag(lToken[nTokenOffset+2], "_exctx_") && g_morph(lToken[nTokenOffset+2], ":A.*:[mp]", ":(?:G|E|M1|W|P|f:[si])");
    },
    _g_cond_gv1_287: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|bref|désolé|désolée|pire|") && ! g_tag(lToken[nTokenOffset+2], "_exctx_") && g_morph(lToken[nTokenOffset+2], ":A.*:[fs]", ":(?:G|E|M1|W|P|m:[pi])");
    },
    _g_cond_gv1_288: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+2], "|bref|désolé|désolée|pire|") && ! g_tag(lToken[nTokenOffset+2], "_exctx_") && g_morph(lToken[nTokenOffset+2], ":A.*:[ms]", ":(?:G|E|M1|W|P|f:[pi])");
    },
    _g_cond_gv1_289: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":A.*:s", ":[GEMWPpi]") && ! g_tag(lToken[nTokenOffset+2], "_exctx_");
    },
    _g_cond_gv1_290: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":(?:V1.*:[YQ]|Iq.*:[123]s)");
    },
    _g_sugg_gv1_43: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":E", ":2p") + "-" + lToken[nTokenOffset+3]["sValue"];
    },
    _g_cond_gv1_291: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":(?:V1.*:[YQ]|Iq.*:[123]s)") && g_morph(lToken[nTokenOffset+4], ":[ORC]", ":[NA]|>plupart/");
    },
    _g_cond_gv1_292: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":(?:V1.*:[YQ]|Iq.*:[123]s)") && g_morph(lToken[nTokenOffset+4], ":[ORC]", ":[NA]");
    },
    _g_cond_gv1_293: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":(?:V1.*:[YQ]|Iq.*:[123]s)") && g_morph(lToken[nTokenOffset+4], ":[ORCD]", ":Y");
    },
    _g_cond_gv1_294: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! look(sSentence.slice(lToken[nLastToken]["nEnd"]), " soit ");
    },
    _g_cond_gv1_295: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|je|");
    },
    _g_cond_gv1_296: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[MYO]", ":A|>et/");
    },
    _g_cond_gv1_297: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|tu|");
    },
    _g_cond_gv1_298: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V[13].*:Ip.*:2s", ":G") && ! g_value(lToken[nLastToken+1], "|tu|");
    },
    _g_sugg_gv1_44: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].slice(0,-1);
    },
    _g_cond_gv1_299: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-1+1], ":V[13].*:Ip.*:2s", ":[GNAM]") && ! g_value(lToken[nLastToken+1], "|tu|");
    },
    _g_cond_gv1_300: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|il|elle|on|ils|elles|iel|iels|") && ! g_value(lToken[nLastToken-1+1], "|provient|") && ! (g_value(lToken[nLastToken-1+1], "|vient|dit|surgit|survient|périt|") && g_morph(lToken[nLastToken+1], ":(?:[MD]|Oo)|>[A-Z]/")) && g_morph(lToken[nLastToken-1+1], ":V[23].*:Ip.*:3s", ":G|>(?:devoir|suffire|para[îi]tre)/") && analyse(lToken[nLastToken-1+1]["sValue"].slice(0,-1)+"s", ":E:2s");
    },
    _g_sugg_gv1_45: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].slice(0,-1)+"s";
    },
    _g_cond_gv1_301: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|il|elle|on|ils|elles|iel|iels|") && ! g_value(lToken[nLastToken-1+1], "|provient|") && ! (g_value(lToken[nLastToken-1+1], "|vient|dit|surgit|survient|périt|") && g_morph(lToken[nLastToken+1], ":(?:[MDR]|Oo)|>[A-Z]/")) && g_morph(lToken[nLastToken-1+1], ":V[23].*:Ip.*:3s", ":[GNA]|>(?:devoir|suffire|para[îi]tre)/") && analyse(lToken[nLastToken-1+1]["sValue"].slice(0,-1)+"s", ":E:2s");
    },
    _g_cond_gv1_302: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|il|elle|on|") && ! ( g_value(lToken[nLastToken-1+1], "|répond|") && (g_morph(lToken[nLastToken+1], ":[MD]|>[A-Z]/") || g_value(lToken[nLastToken+1], "|l’|d’|")) ) && g_morph(lToken[nLastToken-1+1], ":V3.*:Ip.*:3s", ":G");
    },
    _g_cond_gv1_303: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|il|elle|on|") && ! ( g_value(lToken[nLastToken-1+1], "|répond|") && (g_morph(lToken[nLastToken+1], ":[MD]|>[A-Z]/") || g_value(lToken[nLastToken+1], "|l’|d’|")) ) && g_morph(lToken[nLastToken-1+1], ":V3.*:Ip.*:3s", ":[GNA]");
    },
    _g_cond_gv1_304: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]|>(?:venir|aller|partir)/") && ! g_value(lToken[nTokenOffset], "|de|d’|le|la|les|l’|je|j’|me|m’|te|t’|se|s’|nous|vous|lui|leur|");
    },
    _g_cond_gv1_305: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V(?:1.*:Ip.*:2s|[23].*:Ip.*:3s)", ":[GM]|>(?:venir|aller|partir)/");
    },
    _g_sugg_gv1_46: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":E", ":2s")+"-moi";
    },
    _g_cond_gv1_306: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E:2s", ":[GM]|>(?:venir|aller|partir)/") && ! g_value(lToken[nTokenOffset], "|de|d’|le|la|les|l’|me|m’|te|t’|se|s’|nous|vous|lui|leur|");
    },
    _g_sugg_gv1_47: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":E", ":2s")+"-toi";
    },
    _g_cond_gv1_307: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]|>(?:venir|aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>", ":(?:Y|3[sp]|Oo)|>(?:en|y)/") && g_morph(lToken[nTokenOffset], ":Cc|<start>|>[(,]");
    },
    _g_cond_gv1_308: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V(?:1.*:Ip.*:2s|[23].*:Ip.*:3s)", ":[GM]|>(?:venir|aller|partir)/") && ! g_morph(lToken[nLastToken+1], ":Y");
    },
    _g_sugg_gv1_48: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":E", ":2s")+"-"+lToken[nTokenOffset+3]["sValue"];
    },
    _g_cond_gv1_309: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]") && g_morph(lToken[nLastToken+1], ":|<end>", ":(?:Y|3[sp]|Oo)|>en/") && g_morph(lToken[nTokenOffset], ":Cc|<start>|>[(,]");
    },
    _g_cond_gv1_310: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+1]["sValue"].endsWith("e") || lToken[nTokenOffset+1]["sValue"].endsWith("E");
    },
    _g_cond_gv1_311: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]|>(?:venir|aller|partir)") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Y|B|3[sp])|>(?:pour|plus|moins|mieux|peu|trop|très|en|y)/") && g_morph(lToken[nTokenOffset], ":Cc|<start>|>[(,]");
    },
    _g_cond_gv1_312: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V(?:1.*:Ip.*:2s|[23].*:Ip.*:3s)", ":[GM]|>(?:venir|aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Y|B|3[sp])|>(?:pour|plus|moins|mieux|peu|trop|très|en|y)/");
    },
    _g_sugg_gv1_49: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+2]["sValue"], ":E", ":2s")+"-les";
    },
    _g_cond_gv1_313: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]|>(?:venir|aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Q|B|Y|MP|H|T)|>(?:pour|plus|moins|mieux|peu|plupart|trop|très|en|y|une?|leur|lui)/") && g_morph(lToken[nTokenOffset], ":Cc|<start>|>[(,]");
    },
    _g_cond_gv1_314: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V(?:1.*:Ip.*:2s|[23].*:Ip.*:3s)", ":[GM]|>(?:venir|aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Y|B|T|MP|3[sp])|>(?:pour|plus|moins|mieux|peu|plupart|trop|très|en|y|une?|leur|lui)/");
    },
    _g_cond_gv1_315: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[GM]|>(?:aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Q|Y|M|P|B|H|T|D|Ov)|>(?:plus|moins|mieux|peu|trop|très|une?)/") && g_morph(lToken[nTokenOffset], ":Cc|<start>|>[(,]");
    },
    _g_cond_gv1_316: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V(?:1.*:Ip.*:2s|[23].*:Ip.*:3s)", ":[GME]|>(?:aller|partir)/") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:N|A|Y|M|P|B|3[sp]|D|Ov)|>(?:plus|moins|mieux|peu|trop|très|une?)/");
    },
    _g_cond_gv1_317: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":V1");
    },
    _g_cond_gv1_318: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+3], ":(?:Y|Ov)", ":[NAB]") && ! g_morph(lToken[nTokenOffset], ":O[sv]");
    },
    _g_sugg_gv1_50: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-3)+"’en";
    },
    _g_cond_gv1_319: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken+1], "|guerre|");
    },
    _g_cond_gv1_320: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset], "|va|") && g_value(lToken[nLastToken+1], "|guerre|"));
    },
    _g_cond_gv1_321: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morph(lToken[nTokenOffset+1], ":E", ":[MG]") && g_morph(lToken[nLastToken+1], ":|<end>|>[(,]", ":(?:Y|[123][sp])");
    },
    _g_cond_gv1_322: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morphVC(lToken[nTokenOffset+1], ":E");
    },
    _g_cond_gv1_323: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morphVC(lToken[nTokenOffset+1], ":E") && g_morph(lToken[nLastToken+1], ":[RC]|<end>|>[(,]", ":Y");
    },
    _g_cond_gv1_324: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && g_morphVC(lToken[nTokenOffset+1], ":E") && g_morph(lToken[nLastToken+1], ":[RC]|<end>|>[(,]", ":[NAY]");
    },
    _g_cond_gv1_325: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_morph(lToken[nLastToken+1], ":Y");
    },
    _g_cond_gv1_326: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_value(lToken[nTokenOffset], "|tu|il|elle|on|ne|n’|") && ! g_morph(lToken[nLastToken+1], ":Y");
    },
    _g_cond_gv1_327: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 1) && ! g_value(lToken[nLastToken+1], "|partie|");
    },
    _g_cond_gv1_328: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[me]:[si]");
    },
    _g_sugg_gv1_51: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[me]:[si]", true);
    },
    _g_cond_gv1_329: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[si]");
    },
    _g_sugg_gv1_52: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[si]", true);
    },
    _g_cond_gv1_330: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[si]");
    },
    _g_sugg_gv1_53: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[si]", true);
    },
    _g_cond_gv1_331: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[pi]");
    },
    _g_sugg_gv1_54: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[pi]", true);
    },
    _g_cond_gv1_332: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[me]:[pi]");
    },
    _g_sugg_gv1_55: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[me]:[pi]", true);
    },
    _g_cond_gv1_333: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return hasSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[pi]");
    },
    _g_sugg_gv1_56: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nTokenOffset+3]["sValue"], ":[NA].*:[fe]:[pi]", true);
    },
    _g_sugg_gv1_57: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[me]:[si]", true);
    },
    _g_sugg_gv1_58: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[fe]:[si]", true);
    },
    _g_sugg_gv1_59: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[si]", true);
    },
    _g_sugg_gv1_60: function (lToken, nTokenOffset, nLastToken) {
        return suggSimil(lToken[nLastToken-1+1]["sValue"], ":[NA].*:[pi]", true);
    },
    _g_cond_gv1_334: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset+1], "|rendez-vous|entre-nous|entre-vous|entre-elles|") && ! g_morphVC(lToken[nTokenOffset+1], ":V0");
    },
    _g_cond_gv1_335: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:m:[si]", ":G|>verbe/") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_61: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":m:s");
    },
    _g_cond_gv1_336: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:f:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_62: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":f:s");
    },
    _g_cond_gv1_337: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:e:[si]", ":G") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_63: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":s");
    },
    _g_cond_gv1_338: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_64: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":p");
    },
    _g_cond_gv1_339: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:[me]:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_65: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":m:p");
    },
    _g_cond_gv1_340: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+4]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":[NA].*:[fe]:[pi]", ":G") && g_morph(lToken[nTokenOffset+4], ":V1.*:Y", ":M");
    },
    _g_sugg_gv1_66: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbPpas(lToken[nTokenOffset+4]["sValue"], ":f:p");
    },
    _g_cond_gv1_341: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]");
    },
    _g_sugg_gv1_67: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].replace(/ut/g, "ût").replace(/UT/g, "ÛT");
    },
    _g_cond_gv1_342: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morphVC(lToken[nTokenOffset+1], ">avoir/");
    },
    _g_sugg_gv1_68: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbFrom("être", lToken[nLastToken-2+1]["sValue"]);
    },
    _g_cond_gv1_343: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase();
    },
    _g_cond_gv1_344: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! (g_value(lToken[nTokenOffset+2], "|attendant|admettant|") && g_value(lToken[nLastToken+1], "|que|qu’|"));
    },
    _g_cond_gv1_345: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! (g_morph(lToken[nTokenOffset], ":1p") && ! g_value(lToken[nTokenOffset], "|sachons|veuillons|allons|venons|partons|") && g_value(g_token(lToken, nTokenOffset+1-2), "|<start>|,|"));
    },
    _g_cond_gv1_346: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+2]["sValue"].gl_isLowerCase() && ! (g_morph(lToken[nTokenOffset], ":2p") && ! g_value(lToken[nTokenOffset], "|sachez|veuillez|allez|venez|partez|") && g_value(g_token(lToken, nTokenOffset+1-2), "|<start>|,|"));
    },
    _g_cond_gv1_347: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[123]s") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_348: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[123]s") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_349: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[123]s") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_350: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[123]s") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_351: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[123]s") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_352: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[123]s|V0)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_353: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[123]s|V0)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_354: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[123]s|V0)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_355: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[123]s|V0)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_356: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:[123]s|V0)") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_357: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_358: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_359: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_360: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_361: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3s|R)") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_362: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_363: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_364: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_365: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_366: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:1p|R)") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_367: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_368: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_369: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_370: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_371: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:2p|R)") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_372: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_373: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_374: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_375: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_376: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":3p") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_377: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[me]:[si]");
    },
    _g_cond_gv1_378: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[fe]:[si]");
    },
    _g_cond_gv1_379: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[si]");
    },
    _g_cond_gv1_380: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)") || ! g_morph(lToken[nTokenOffset+3], ":N.*:[pi]");
    },
    _g_cond_gv1_381: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:3p|R)") || ! g_morph(lToken[nTokenOffset+3], ":[NA]");
    },
    _g_cond_gv1_382: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":V0");
    },
    _g_cond_gv1_383: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":(?:R|3s)");
    },
    _g_cond_gv1_384: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+3], ":2s") || g_value(lToken[nTokenOffset], "|je|j’|tu|il|elle|on|nous|vous|ils|elles|iel|iels|");
    },
    _g_cond_gv1_385: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":N", ":V");
    },
    _g_cond_gv1_386: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[NAM]");
    },
    _g_cond_gv1_387: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[NAM]");
    },
    _g_cond_gv1_388: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":N");
    },
    _g_da_gv1_1: function (lToken, nTokenOffset, nLastToken) {
        return g_select(lToken[nTokenOffset+2], ":V");
    },
    _g_cond_gv2_1: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nLastToken-1+1]["sValue"] != "A";
    },
    _g_cond_gv2_2: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":[123][sp]", ":[NAGW]");
    },
    _g_cond_gv2_3: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":(?:[123][sp]|P)") && g_morph(lToken[nTokenOffset+5], ":Q");
    },
    _g_cond_gv2_4: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":(?:[123][sp]|P)") && g_morph(lToken[nTokenOffset+5], ":[QA]");
    },
    _g_cond_gv2_5: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return (g_morph(lToken[nTokenOffset+2], ":M") && g_morph(lToken[nTokenOffset+4], ":M")) || (g_morph(lToken[nTokenOffset+2], ":Y") && g_morph(lToken[nTokenOffset+4], ":Y"));
    },
    _g_cond_gv2_6: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123][sp]") && g_morph(lToken[nTokenOffset+6], ":[123][sp]");
    },
    _g_cond_gv2_7: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":[QA]");
    },
    _g_cond_gv2_8: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken-2+1], ":Q");
    },
    _g_cond_gv2_9: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":([123][sp]|P)");
    },
    _g_cond_gv2_10: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":([123][sp]|P)") && g_morph(lToken[nTokenOffset+4], ":[QA]");
    },
    _g_cond_gv2_11: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":([123][sp]|P)") && g_morph(lToken[nTokenOffset+4], ":Q");
    },
    _g_cond_gv2_12: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":M", ":G") && lToken[nTokenOffset+3]["sValue"].gl_isLowerCase() && g_morph(lToken[nTokenOffset+3], ":3s", ":G");
    },
    _g_cond_gv2_13: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1[sŝś]", ":[GW]");
    },
    _g_sugg_gv2_1: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+2]["sValue"].slice(0,-1)+"é-je";
    },
    _g_cond_gv2_14: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1[sŝś]", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|je|j’|il|elle|");
    },
    _g_cond_gv2_15: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1s", ":[GW]");
    },
    _g_cond_gv2_16: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1);
    },
    _g_cond_gv2_17: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1s", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|je|j’|tu|");
    },
    _g_cond_gv2_18: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2s", ":[GW]");
    },
    _g_cond_gv2_19: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2s", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|je|j’|tu|");
    },
    _g_cond_gv2_20: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:3s", ":[GW]");
    },
    _g_cond_gv2_21: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:3s", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|ce|il|elle|on|");
    },
    _g_cond_gv2_22: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:3s", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|ce|c’|ça|ç’|il|elle|on|iel|");
    },
    _g_cond_gv2_23: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillons|sachons|");
    },
    _g_cond_gv2_24: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:1p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillons|sachons|allons|venons|partons|");
    },
    _g_cond_gv2_25: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && ( (g_value(lToken[nTokenOffset+2], "|avions|") && ! g_morph(lToken[nTokenOffset+1], ":A.*:[me]:[sp]") && ! g_morph(lToken[nLastToken-1+1], ":(:?3[sp]|Ov)")) || (g_morph(lToken[nTokenOffset+2], ":V.*:1p", ":[GNW]") && ! g_morph(lToken[nTokenOffset+1], ":Os")) );
    },
    _g_cond_gv2_26: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillez|sachez|");
    },
    _g_cond_gv2_27: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2p", ":[GW]") && ! g_value(lToken[nTokenOffset+2], "|veuillez|sachez|allez|venez|partez|");
    },
    _g_cond_gv2_28: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:2p", ":[GNW]") && ! g_value(lToken[nTokenOffset+2], "|veuillez|") && ! g_morph(lToken[nTokenOffset+1], ":Os");
    },
    _g_cond_gv2_29: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:3p", ":[GW]");
    },
    _g_cond_gv2_30: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 1, 1) && g_morph(lToken[nTokenOffset+2], ":V.*:3p", ":[GNW]") && ! g_value(lToken[nTokenOffset+1], "|ce|ils|elles|iels|");
    },
    _g_cond_gv2_31: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[si]", ":[fe]:[si]");
    },
    _g_sugg_gv2_2: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/-elle/g, "-il").replace(/-Elle/g, "-Il").replace(/-ELLE/g, "-IL");
    },
    _g_cond_gv2_32: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[si]", ":[me]:[si]");
    },
    _g_sugg_gv2_3: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/-il/g, "-elle").replace(/-Il/g, "-Elle").replace(/-IL/g, "-ELLE");
    },
    _g_cond_gv2_33: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:m:[pi]", ":[fe]:[pi]");
    },
    _g_sugg_gv2_4: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/-elles/g, "-ils").replace(/-Elles/g, "-Ils").replace(/-ELLES/g, "-ILS");
    },
    _g_cond_gv2_34: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":N.*:f:[pi]", ":[me]:[pi]");
    },
    _g_sugg_gv2_5: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nLastToken-1+1]["sValue"].replace(/-ils/g, "-elles").replace(/-Ils/g, "-Elles").replace(/-ILS/g, "-ELLES");
    },
    _g_cond_gv2_35: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return lToken[nTokenOffset+3]["sValue"] == "est" || lToken[nTokenOffset+3]["sValue"] == "es";
    },
    _g_cond_gv2_36: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo;
    },
    _g_sugg_gv2_6: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":1s");
    },
    _g_sugg_gv2_7: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":2s");
    },
    _g_cond_gv2_37: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:et|ou)") && ! (g_morph(lToken[nTokenOffset+2], ":Q") && g_morph(lToken[nTokenOffset], ":V0.*:3s"));
    },
    _g_sugg_gv2_8: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+2]["sValue"], ":3s");
    },
    _g_cond_gv2_38: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":3p");
    },
    _g_cond_gv2_39: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R|>(?:et|ou)");
    },
    _g_sugg_gv2_9: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s");
    },
    _g_cond_gv2_40: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+3], ":3p");
    },
    _g_cond_gv2_41: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VR]");
    },
    _g_cond_gv2_42: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[123]p");
    },
    _g_sugg_gv2_10: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/e-/g, "es-").replace(/E-/g, "ES-");
    },
    _g_cond_gv2_43: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123]p");
    },
    _g_sugg_gv2_11: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":3s");
    },
    _g_cond_gv2_44: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VRD]");
    },
    _g_cond_gv2_45: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":(?:P|Q|[123][sp]|R)|>ni/");
    },
    _g_cond_gv2_46: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[CRV]|<start>|>[(,]", ":D");
    },
    _g_cond_gv2_47: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "neg") && g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]", ":(?:Y|P|Q|[123][sp]|R)") && !(g_morph(lToken[nTokenOffset+2], ":Y") && g_value(lToken[nTokenOffset], "|ne|"));
    },
    _g_cond_gv2_48: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":[CRV]|<start>|>[(,]");
    },
    _g_cond_gv2_49: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]", ":(?:Y|P|Q|[123][sp]|R)");
    },
    _g_cond_gv2_50: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":(?:Cs|R|V)|<start>|>[(,]");
    },
    _g_cond_gv2_51: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_value(lToken[nTokenOffset+2], "|avoir|croire|être|devenir|redevenir|voir|sembler|paraître|paraitre|sentir|rester|retrouver|") && g_morph(lToken[nTokenOffset+3], ":[NA]"));
    },
    _g_cond_gv2_52: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":[YP]") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && ! ( (g_value(lToken[nTokenOffset+2], "|dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|partie|poignée|tas|paquet|moitié|") || g_tagbefore(lToken[nTokenOffset+1], dTags, "_ni_") || g_value(lToken[nTokenOffset], "|et|ou|")) && g_morph(lToken[nTokenOffset+3], ":3?p") ) && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]) && ! ( g_morph(lToken[nTokenOffset+2], "(?:[123][sp]|P)") && ! g_value(lToken[nTokenOffset], "|<start>|,|") );
    },
    _g_cond_gv2_53: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nLastToken-1+1], "_ngn_") && (g_morph(lToken[nTokenOffset+3], ":A.*:p") || (g_morph(lToken[nTokenOffset+3], ":N.*:p") && g_morph(lToken[nTokenOffset+2], ":A")));
    },
    _g_sugg_gv2_12: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s", false, suggMasSing);
    },
    _g_sugg_gv2_13: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s", false, suggFemSing);
    },
    _g_sugg_gv2_14: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3s", false, suggSing);
    },
    _g_cond_gv2_54: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":[YP]") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && ! ( (g_value(lToken[nTokenOffset+2], "|dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|partie|poignée|tas|paquet|moitié|") || g_tagbefore(lToken[nTokenOffset+1], dTags, "_ni_") || g_value(lToken[nTokenOffset], "|et|ou|")) && g_morph(lToken[nTokenOffset+4], ":3p") );
    },
    _g_sugg_gv2_15: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+4]["sValue"], ":3s");
    },
    _g_cond_gv2_55: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":[YP]|>et/") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[me]:[si]", ":G") && ! ( (g_value(lToken[nTokenOffset+2], "|dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|partie|poignée|tas|paquet|moitié|nombre|") || g_tagbefore(lToken[nTokenOffset+1], dTags, "_ni_") || g_value(lToken[nTokenOffset], "|et|ou|")) && g_morph(lToken[nTokenOffset+3], ":3?p") ) && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]);
    },
    _g_cond_gv2_56: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":[YP]|>et/") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[fe]:[si]", ":G") && ! ( (g_value(lToken[nTokenOffset+2], "|dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|partie|poignée|tas|paquet|moitié|") || g_tagbefore(lToken[nTokenOffset+1], dTags, "_ni_") || g_value(lToken[nTokenOffset], "|et|ou|")) && g_morph(lToken[nTokenOffset+3], ":3?p") ) && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]);
    },
    _g_cond_gv2_57: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":[YP]|>et/") && g_morph(lToken[nTokenOffset+2], ":[NA].*:[si]", ":G") && ! ( (g_value(lToken[nTokenOffset+2], "|dizaine|douzaine|quinzaine|vingtaine|trentaine|quarantaine|cinquantaine|soixantaine|centaine|majorité|minorité|millier|partie|poignée|tas|paquet|moitié|") || g_tagbefore(lToken[nTokenOffset+1], dTags, "_ni_") || g_value(lToken[nTokenOffset], "|et|ou|")) && g_morph(lToken[nTokenOffset+4], ":3p") );
    },
    _g_cond_gv2_58: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_un_des_") && g_morph(lToken[nTokenOffset], ":C|<start>|>(?:,|dont)", ":(?:Y|P|Q|[123][sp]|R)̉|>(?:sauf|excepté|et|ou)/");
    },
    _g_cond_gv2_59: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_un_des_") && g_morph(lToken[nTokenOffset], "<start>|>(?:,|dont)/|:R");
    },
    _g_cond_gv2_60: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_un_des_") && g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":(?:Y|P|Q|[123][sp]|R)");
    },
    _g_cond_gv2_61: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":C|<start>|>[(,]", ":(?:Y|P|Q|[123][sp]|R)");
    },
    _g_cond_gv2_62: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_morph(lToken[nTokenOffset], ":R") && g_morph(lToken[nLastToken-1+1], ":3p"));
    },
    _g_sugg_gv2_16: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":1p");
    },
    _g_sugg_gv2_17: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":2p");
    },
    _g_cond_gv2_63: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":R") && ! (g_morph(lToken[nTokenOffset+2], ":Q") && g_morph(lToken[nTokenOffset], ":V0.*:3p"));
    },
    _g_sugg_gv2_18: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+2]["sValue"], ":3p");
    },
    _g_cond_gv2_64: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":3s");
    },
    _g_sugg_gv2_19: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p");
    },
    _g_cond_gv2_65: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+3], ":3s");
    },
    _g_cond_gv2_66: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":3s");
    },
    _g_cond_gv2_67: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[123]s");
    },
    _g_cond_gv2_68: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && g_morph(lToken[nTokenOffset+2], ":[123]s");
    },
    _g_sugg_gv2_20: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].replace(/s/g, "").replace(/S/g, "");
    },
    _g_cond_gv2_69: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_bcp_plur_") && ! g_morph(lToken[nTokenOffset+2], ":3p");
    },
    _g_cond_gv2_70: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_tag(lToken[nTokenOffset+1], "_bcp_sing_") && ! g_morph(lToken[nTokenOffset+2], ":3s");
    },
    _g_cond_gv2_71: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && lToken[nTokenOffset+2]["sValue"] != "a" && ! g_tag(lToken[nTokenOffset+1], "_bcp_sing_") && ! g_morph(lToken[nTokenOffset+2], ":3p") && ! (g_space(lToken[nTokenOffset+1], lToken[nTokenOffset+1+1], 1, 2) && g_morph(lToken[nTokenOffset+2], ":V0"));
    },
    _g_cond_gv2_72: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VR]") && ! (g_tag(lToken[nTokenOffset+2], "_plupart_sg_") && g_morph(lToken[nLastToken-1+1], ":3s"));
    },
    _g_sugg_gv2_21: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nLastToken-1+1]["sValue"], ":3p");
    },
    _g_cond_gv2_73: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VR]") && ! (g_tag(lToken[nTokenOffset+1], "_d_entre_nous_") && g_morph(lToken[nLastToken-1+1], ":1p")) && ! (g_tag(lToken[nTokenOffset+1], "_d_entre_vous_") && g_morph(lToken[nLastToken-1+1], ":2p"));
    },
    _g_cond_gv2_74: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! (g_tag(lToken[nTokenOffset+1], "_d_entre_nous_") && g_morph(lToken[nLastToken-1+1], ":1p")) && ! (g_tag(lToken[nTokenOffset+1], "_d_entre_vous_") && g_morph(lToken[nLastToken-1+1], ":2p"));
    },
    _g_cond_gv2_75: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":[12]p");
    },
    _g_cond_gv2_76: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[VR]|>(?:et|ou)/");
    },
    _g_cond_gv2_77: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]") && !( g_morph(lToken[nTokenOffset+3], ":3s") && look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:l[ea] |l’|une? |ce(?:tte|t|) |[mts](?:on|a) |[nv]otre ).+ entre .+ et ") );
    },
    _g_cond_gv2_78: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nLastToken-1+1], "_ngn_") && (g_morph(lToken[nTokenOffset+3], ":A.*:s") || (g_morph(lToken[nTokenOffset+3], ":N.*:s") && g_morph(lToken[nTokenOffset+2], ":A")));
    },
    _g_sugg_gv2_22: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p", false, suggAgree, lToken[nTokenOffset+3]["sValue"], lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv2_79: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]") && !( g_morph(lToken[nTokenOffset+4], ":3s") && look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:l[ea] |l’|une? |ce(?:tte|t|) |[mts](?:on|a) |[nv]otre ).+ entre .+ et ") );
    },
    _g_sugg_gv2_23: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+4]["sValue"], ":3p");
    },
    _g_cond_gv2_80: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]") && ! ( g_morph(lToken[nTokenOffset+3], ":3s") && look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:l[ea] |l’|une? |ce(?:tte|t|) |[mts](?:on|a) |[nv]otre ).+ entre .+ et ") ) && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]) && ! ( g_morph(lToken[nTokenOffset+2], "(?:[123][sp]|P)") && ! g_value(lToken[nTokenOffset], "|<start>|,|") );
    },
    _g_cond_gv2_81: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset], ":Cs|<start>|>[(,]") && !( g_morph(lToken[nTokenOffset+3], ":3s") && look(sSentence.slice(0,lToken[1+nTokenOffset]["nStart"]), "(?i)\\b(?:l[ea] |l’|une? |ce(?:tte|t|) |[mts](?:on|a) |[nv]otre ).+ entre .+ et ") ) && ! g_agreement(lToken[nTokenOffset+2], lToken[nTokenOffset+3]) && ! ( g_morph(lToken[nTokenOffset+2], "(?:[123][sp]|P)") && ! g_value(lToken[nTokenOffset], "|<start>|,|") );
    },
    _g_sugg_gv2_24: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p", false, suggMasPlur);
    },
    _g_sugg_gv2_25: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p", false, suggFemPlur);
    },
    _g_sugg_gv2_26: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+3]["sValue"], ":3p", false, suggPlur);
    },
    _g_cond_gv2_82: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nLastToken+1], ":(?:R|D.*:p)|>au/|<end>|>[(,]");
    },
    _g_cond_gv2_83: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+4], ":[NA]");
    },
    _g_cond_gv2_84: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && ! g_agreement(lToken[nTokenOffset+3], lToken[nTokenOffset+4]);
    },
    _g_sugg_gv2_27: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+4]["sValue"], ":3p", false, suggPlur);
    },
    _g_sugg_gv2_28: function (lToken, nTokenOffset, nLastToken) {
        return suggVerb(lToken[nTokenOffset+5]["sValue"], ":3p");
    },
    _g_cond_gv2_85: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":[VR]", ":[NA]");
    },
    _g_cond_gv2_86: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+2], "_enum_") && g_morph(lToken[nTokenOffset+2], ":M");
    },
    _g_cond_gv2_87: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":M") && g_morph(lToken[nTokenOffset+3], ":M") && ! g_morph(lToken[nTokenOffset], ":[RV]|>(?:des?|du|et|ou|ni)/");
    },
    _g_cond_gv2_88: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset], ":[RV]");
    },
    _g_cond_gv2_89: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3s|G|W|3p!)") && ! g_value(lToken[nTokenOffset+4], "|plupart|majorité|groupe|") && ! g_tag(lToken[nTokenOffset+4], "_enum_") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":D")) && ! (g_value(g_token(lToken, nLastToken+2), "|et|ou|") && g_morph(g_token(lToken, nLastToken+3), ":D"));
    },
    _g_cond_gv2_90: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3s|G|W|3p!)") && ! g_value(lToken[nTokenOffset+4], "|plupart|majorité|groupe|") && ! g_tag(lToken[nTokenOffset+4], "_enum_") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":D")) && ! (g_value(g_token(lToken, nLastToken+2), "|et|ou|") && g_morph(g_token(lToken, nLastToken+3), ":D")) && ! g_morph(lToken[nTokenOffset+4], ":Y");
    },
    _g_cond_gv2_91: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3s|G|W|3p!)") && ! g_value(lToken[nTokenOffset+4], "|plupart|majorité|groupe|") && ! g_tag(lToken[nTokenOffset+4], "_enum_") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":D")) && ! (g_value(g_token(lToken, nLastToken+2), "|et|ou|") && g_morph(g_token(lToken, nLastToken+3), ":D")) && ! g_morph(lToken[nTokenOffset], ":[NA]");
    },
    _g_cond_gv2_92: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3s|G|W|3p!)") && ! g_value(lToken[nTokenOffset+4], "|plupart|majorité|groupe|") && ! g_tag(lToken[nTokenOffset+4], "_enum_") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":D")) && ! (g_value(g_token(lToken, nLastToken+2), "|et|ou|") && g_morph(g_token(lToken, nLastToken+3), ":D")) && ! g_morph(lToken[nTokenOffset+4], ":Y") && ! g_morph(lToken[nTokenOffset], ":[NA]");
    },
    _g_cond_gv2_93: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3s|G|W|3p!)") && g_morph(lToken[nTokenOffset], ":R") && ! g_value(lToken[nTokenOffset+4], "|plupart|majorité|groupe|") && ! g_tag(lToken[nTokenOffset+4], "_enum_") && ! (g_value(lToken[nLastToken+1], "|et|ou|") && g_morph(g_token(lToken, nLastToken+2), ":D")) && ! (g_value(g_token(lToken, nLastToken+2), "|et|ou|") && g_morph(g_token(lToken, nLastToken+3), ":D"));
    },
    _g_cond_gv2_94: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3p|G|W)");
    },
    _g_cond_gv2_95: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3p|G|W)") && ! g_morph(lToken[nTokenOffset], ":[NA]");
    },
    _g_cond_gv2_96: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[123][sp]", ":(?:3p|G|W)") && g_morph(lToken[nTokenOffset], ":R");
    },
    _g_cond_gv2_97: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+2], ":[12]s") && ! g_value(lToken[nLastToken+1], "|je|tu|");
    },
    _g_cond_gv2_98: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! bCondMemo && g_morph(lToken[nTokenOffset+2], ":[12]p") && ! g_value(lToken[nLastToken+1], "|nous|vous|");
    },
    _g_cond_gv2_99: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V0e", ":3s") && ! ( g_morph(lToken[nTokenOffset+3], ":3p") && (g_value(lToken[nLastToken+1], "|et|") || g_tag(lToken[nTokenOffset+5], "_enum_")) );
    },
    _g_cond_gv2_100: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! ( g_morph(lToken[nTokenOffset+3], ":3p") && (g_value(lToken[nLastToken+1], "|et|") || g_tag(lToken[nTokenOffset+5], "_enum_")) );
    },
    _g_sugg_gv2_29: function (lToken, nTokenOffset, nLastToken) {
        return lToken[nTokenOffset+1]["sValue"].slice(0,-1);
    },
    _g_cond_gv2_101: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo && ! g_morph(lToken[nTokenOffset+3], ":3s");
    },
    _g_cond_gv2_102: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+3], ":V0e", ":3p");
    },
    _g_sugg_gv2_30: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":1s");
    },
    _g_sugg_gv2_31: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":2s");
    },
    _g_sugg_gv2_32: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":3s");
    },
    _g_sugg_gv2_33: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":1p");
    },
    _g_sugg_gv2_34: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":2p");
    },
    _g_sugg_gv2_35: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nLastToken-1+1]["sValue"], ":Iq", ":3p");
    },
    _g_sugg_gv2_36: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":I", lToken[nLastToken-2+1]["sValue"]);
    },
    _g_cond_gv2_103: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+4], ":K");
    },
    _g_sugg_gv2_37: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":1s");
    },
    _g_sugg_gv2_38: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":2s");
    },
    _g_sugg_gv2_39: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":3s");
    },
    _g_sugg_gv2_40: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":1p");
    },
    _g_sugg_gv2_41: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":2p");
    },
    _g_sugg_gv2_42: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":Iq", ":3p");
    },
    _g_cond_gv2_104: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+6], ":K");
    },
    _g_sugg_gv2_43: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+6]["sValue"], ":Iq", ":3p");
    },
    _g_cond_gv2_105: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+5], ":K");
    },
    _g_sugg_gv2_44: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+5]["sValue"], ":Iq", ":3s");
    },
    _g_sugg_gv2_45: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+5]["sValue"], ":Iq", ":3p");
    },
    _g_sugg_gv2_46: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":I", ":3s");
    },
    _g_sugg_gv2_47: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":I", ":3p");
    },
    _g_cond_gv2_106: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|pût|");
    },
    _g_cond_gv2_107: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nLastToken-1+1], "|pussent|");
    },
    _g_cond_gv2_108: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_morph(lToken[nTokenOffset+1], ":V", ":N") && ! g_tag(lToken[nTokenOffset+1], "_VCOD_");
    },
    _g_sugg_gv2_48: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":S", lToken[nLastToken-2+1]["sValue"]);
    },
    _g_sugg_gv2_49: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":S", ":3s");
    },
    _g_sugg_gv2_50: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":S", ":3p");
    },
    _g_cond_gv2_109: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":Q");
    },
    _g_cond_gv2_110: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+1], "_upron_");
    },
    _g_cond_gv2_111: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_VCOD_") && ! g_value(lToken[nTokenOffset], "|ça|cela|ceci|réussite|succès|victoire|échec|");
    },
    _g_cond_gv2_112: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nTokenOffset+1], ":N");
    },
    _g_cond_gv2_113: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_tag(lToken[nTokenOffset+1], "_upron_") && ! g_tag(lToken[nTokenOffset+1], "neg") && g_morph(lToken[nTokenOffset+1], ":V", ":N");
    },
    _g_cond_gv2_114: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_tag(lToken[nTokenOffset+2], "_upron_");
    },
    _g_sugg_gv2_51: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":S", lToken[nTokenOffset+2]["sValue"]);
    },
    _g_cond_gv2_115: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_value(lToken[nTokenOffset], "|de|d’|");
    },
    _g_sugg_gv2_52: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbMode(lToken[nLastToken-1+1]["sValue"], ":S", lToken[nTokenOffset+3]["sValue"]);
    },
    _g_cond_gv2_116: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return ! g_morph(lToken[nLastToken-1+1], ">(?:hériter|recevoir|donner|offrir)/") && ! (g_morph(lToken[nLastToken-1+1], ":V0a") && g_morph(lToken[nLastToken+1], ">(?:hériter|recevoir|donner|offrir)/"));
    },
    _g_cond_gv2_117: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0);
    },
    _g_cond_gv2_118: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return bCondMemo;
    },
    _g_sugg_gv2_53: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+4]["sValue"], ":E", ":2s");
    },
    _g_cond_gv2_119: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+2], lToken[nTokenOffset+2+1], 0, 0) && g_morph(lToken[nTokenOffset+4], ">(?:être|devenir|redevenir|sembler|para[iî]tre)/");
    },
    _g_cond_gv2_120: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], 0, 0);
    },
    _g_sugg_gv2_54: function (lToken, nTokenOffset, nLastToken) {
        return suggVerbTense(lToken[nTokenOffset+5]["sValue"], ":E", ":2s");
    },
    _g_cond_gv2_121: function (lToken, nTokenOffset, nLastToken, sCountry, bCondMemo, dTags, sSentence, sSentence0) {
        return g_space(lToken[nTokenOffset+3], lToken[nTokenOffset+3+1], 0, 0) && g_morph(lToken[nTokenOffset+5], ">(?:être|devenir|redevenir|sembler|para[iî]tre)/");
    },

}


if (typeof(exports) !== 'undefined') {
    exports.load = gc_functions.load;
}
