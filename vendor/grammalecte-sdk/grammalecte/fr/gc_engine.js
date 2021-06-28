// Grammar checker engine

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console */

"use strict";



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

var gc_options     = window.grammalecte.gc_options;
var gc_rules       = window.grammalecte.gc_rules;
var cregex         = window.grammalecte.cregex;
var text           = window.grammalecte.text;

function capitalizeArray (aArray) {
    // can’t map on user defined function??
    let aNew = [];
    for (let i = 0; i < aArray.length; i = i + 1) {
        aNew[i] = aArray[i].slice(0,1).toUpperCase() + aArray[i].slice(1);
    }
    return aNew;
}


window.grammalecte["gc_engine"] = {

    //// Informations

    lang: "fr",
    locales: {'fr-FR': ['fr', 'FR', ''], 'fr-BE': ['fr', 'BE', ''], 'fr-CA': ['fr', 'CA', ''], 'fr-CH': ['fr', 'CH', ''], 'fr-LU': ['fr', 'LU', ''], 'fr-BF': ['fr', 'BF', ''], 'fr-BJ': ['fr', 'BJ', ''], 'fr-CD': ['fr', 'CD', ''], 'fr-CI': ['fr', 'CI', ''], 'fr-CM': ['fr', 'CM', ''], 'fr-MA': ['fr', 'MA', ''], 'fr-ML': ['fr', 'ML', ''], 'fr-MU': ['fr', 'MU', ''], 'fr-NE': ['fr', 'NE', ''], 'fr-RE': ['fr', 'RE', ''], 'fr-SN': ['fr', 'SN', ''], 'fr-TG': ['fr', 'TG', '']},
    pkg: "grammalecte",
    name: "Grammalecte",
    version: "2.1.2",
    author: "Olivier R.",

    //// Tools
    oSpellChecker: null,
    oTokenizer: null,

    //// Data
    aIgnoredRules: new Set(),
    oOptionsColors: null,

    //// Initialization

    load: function (sContext="JavaScript", sColorType="aRGB", sPath="") {
        try {
            if (typeof(process) !== 'undefined') {
                this.oSpellChecker = new spellchecker.SpellChecker("fr", "", "fr-allvars.json", "", "");
            } else {
                this.oSpellChecker = new SpellChecker("fr", sPath, "fr-allvars.json", "", "");
            }

            this.oSpellChecker.activateStorage();
            this.oTokenizer = this.oSpellChecker.getTokenizer();

            window.grammalecte.gc_functions.load(sContext, this.oSpellChecker);
            gc_options.load(sContext)
            this.oOptionsColors = gc_options.getOptionsColors(sContext, sColorType);
        }
        catch (e) {
            console.error(e);
        }
    },

    getSpellChecker: function () {
        return this.oSpellChecker;
    },

    //// Rules

    getRules: function (bParagraph) {
        if (!bParagraph) {
            return window.grammalecte.gc_rules.lSentenceRules;
        }
        return window.grammalecte.gc_rules.lParagraphRules;
    },

    ignoreRule: function (sRuleId) {
        this.aIgnoredRules.add(sRuleId);
    },

    resetIgnoreRules: function () {
        this.aIgnoredRules.clear();
    },

    reactivateRule: function (sRuleId) {
        this.aIgnoredRules.delete(sRuleId);
    },

    listRules: function* (sFilter=null) {
        // generator: returns tuple (sOption, sLineId, sRuleId)
        try {
            for (let [sOption, lRuleGroup] of this.getRules(true)) {
                for (let [,, sLineId, sRuleId,,] of lRuleGroup) {
                    if (!sFilter || sRuleId.test(sFilter)) {
                        yield [sOption, sLineId, sRuleId];
                    }
                }
            }
            for (let [sOption, lRuleGroup] of this.getRules(false)) {
                for (let [,, sLineId, sRuleId,,] of lRuleGroup) {
                    if (!sFilter || sRuleId.test(sFilter)) {
                        yield [sOption, sLineId, sRuleId];
                    }
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    },

    //// Options

    setOption: function (sOpt, bVal) {
        gc_options.setOption(sOpt, bVal);
    },

    setOptions: function (dOpt) {
        gc_options.setOptions(dOpt);
    },

    getOptions: function () {
        return gc_options.getOptions();
    },

    getDefaultOptions: function () {
        return gc_options.getDefaultOptions();
    },

    resetOptions: function () {
        gc_options.resetOptions();
    },

    //// Parsing

    parse: function (sText, sCountry="FR", bDebug=false, dOptions=null, bContext=false, bFullInfo=false) {
        // init point to analyse <sText> and returns an iterable of errors or (with option <bFullInfo>) a list of sentences with tokens and errors
        let oText = new TextParser(sText);
        return oText.parse(sCountry, bDebug, dOptions, bContext, bFullInfo);
    }
};


class TextParser {

    constructor (sText) {
        this.sText = sText;
        this.sText0 = sText;
        this.sSentence = "";
        this.sSentence0 = "";
        this.nOffsetWithinParagraph = 0;
        this.lToken = [];
        this.dTokenPos = new Map();         // {position: token}
        this.dTags = new Map();             // {position: tags}
        this.dError = new Map();            // {position: error}
        this.dSentenceError = new Map();    // {position: error} (for the current sentence only)
        this.dErrorPriority = new Map();    // {position: priority of the current error}
    }

    asString () {
        let s = "===== TEXT =====\n";
        s += "sentence: " + this.sSentence0 + "\n";
        s += "now:      " + this.sSentence  + "\n";
        for (let dToken of this.lToken) {
            s += `#${dToken["i"]}\t${dToken["nStart"]}:${dToken["nEnd"]}\t${dToken["sValue"]}\t${dToken["sType"]}`;
            if (dToken.hasOwnProperty("lMorph")) {
                s += "\t" + dToken["lMorph"].toString();
            }
            if (dToken.hasOwnProperty("aTags")) {
                s += "\t" + dToken["aTags"].toString();
            }
            s += "\n";
        }
        return s;
    }

    parse (sCountry="FR", bDebug=false, dOptions=null, bContext=false, bFullInfo=false) {
        // analyses <sText> and returns an iterable of errors or (with option <bFullInfo>) a list of sentences with tokens and errors
        let dOpt = dOptions || gc_options.dOptions;
        let bShowRuleId = option('idrule');
        // parse paragraph
        try {
            this.parseText(this.sText, this.sText0, true, 0, sCountry, dOpt, bShowRuleId, bDebug, bContext);
        }
        catch (e) {
            console.error(e);
        }
        this.lTokens = null;
        this.lTokens0 = null;
        let lParagraphErrors = null;
        if (bFullInfo) {
            lParagraphErrors = Array.from(this.dError.values());
            this.dSentenceError.clear();
        }
        // parse sentence
        let sText = this._getCleanText();
        let lSentences = [];
        let oSentence = null;
        for (let [iStart, iEnd] of window.grammalecte.text.getSentenceBoundaries(sText)) {
            try {
                this.sSentence = sText.slice(iStart, iEnd);
                this.sSentence0 = this.sText0.slice(iStart, iEnd);
                this.nOffsetWithinParagraph = iStart;
                this.lTokens = Array.from(window.grammalecte.gc_engine.oTokenizer.genTokens(this.sSentence, true));
                this.dTokenPos.clear();
                for (let dToken of this.lTokens) {
                    if (dToken["sType"] != "INFO") {
                        this.dTokenPos.set(dToken["nStart"], dToken);
                    }
                }
                if (bFullInfo) {
                    this.lTokens0 = Array.from(this.lTokens);
                    // the list of tokens is duplicated, to keep tokens from being deleted when analysis
                }
                this.parseText(this.sSentence, this.sSentence0, false, iStart, sCountry, dOpt, bShowRuleId, bDebug, bContext);
                if (bFullInfo) {
                    for (let oToken of this.lTokens0) {
                        window.grammalecte.gc_engine.oSpellChecker.setLabelsOnToken(oToken);
                    }
                    lSentences.push({
                        "nStart": iStart,
                        "nEnd": iEnd,
                        "sSentence": this.sSentence0,
                        "lTokens": this.lTokens0,
                        "lGrammarErrors": Array.from(this.dSentenceError.values())
                    });
                    this.dSentenceError.clear();
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (bFullInfo) {
            // Grammar checking and sentence analysis
            return [lParagraphErrors, lSentences];
        } else {
            // Grammar checking only
            return Array.from(this.dError.values());
        }
    }

    _getCleanText () {
        let sText = this.sText;
        if (sText.includes(" ")) {
            sText = sText.replace(/ /g, ' '); // nbsp
        }
        if (sText.includes(" ")) {
            sText = sText.replace(/ /g, ' '); // snbsp
        }
        if (sText.includes("'")) {
            sText = sText.replace(/'/g, "’");
        }
        if (sText.includes("‐")) {
            sText = sText.replace(/‐/g, "-"); // Hyphen (U+2010)
        }
        if (sText.includes("‑")) {
            sText = sText.replace(/‑/g, "-"); // Non-Breaking Hyphen (U+2011)
        }
        if (sText.includes("@@")) {
            sText = sText.replace(/@@+/g, (sMatch, nOffest, sSource) => { return " ".repeat(sMatch.length) });
            // function as replacement: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        }
        return sText;
    }

    parseText (sText, sText0, bParagraph, nOffset, sCountry, dOptions, bShowRuleId, bDebug, bContext) {
        let bChange = false;
        let m;

        for (let [sOption, lRuleGroup] of window.grammalecte.gc_engine.getRules(bParagraph)) {
            if (sOption == "@@@@") {
                // graph rules
                if (!bParagraph && bChange) {
                    this.update(sText, bDebug);
                    bChange = false;
                }
                for (let [sGraphName, sLineId] of lRuleGroup) {
                    if (!dOptions.has(sGraphName) || dOptions.get(sGraphName)) {
                        if (bDebug) {
                            console.log(">>>> GRAPH: " + sGraphName + " " + sLineId);
                        }
                        sText = this.parseGraph(window.grammalecte.gc_rules_graph.dAllGraph[sGraphName], sCountry, dOptions, bShowRuleId, bDebug, bContext);
                    }
                }
            }
            else if (!sOption || option(sOption)) {
                for (let [zRegex, bUppercase, sLineId, sRuleId, nPriority, lActions, lGroups, lNegLookBefore] of lRuleGroup) {
                    if (!window.grammalecte.gc_engine.aIgnoredRules.has(sRuleId)) {
                        while ((m = zRegex.gl_exec2(sText, lGroups, lNegLookBefore)) !== null) {
                            let bCondMemo = null;
                            for (let [sFuncCond, cActionType, sWhat, ...eAct] of lActions) {
                                // action in lActions: [ condition, action type, replacement/suggestion/action[, iGroup[, message, URL]] ]
                                try {
                                    bCondMemo = (!sFuncCond || window.grammalecte.gc_functions[sFuncCond](sText, sText0, m, this.dTokenPos, sCountry, bCondMemo));
                                    if (bCondMemo) {
                                        switch (cActionType) {
                                            case "-":
                                                // grammar error
                                                //console.log("-> error detected in " + sLineId + "\nzRegex: " + zRegex.source);
                                                let nErrorStart = nOffset + m.start[eAct[0]];
                                                if (!this.dError.has(nErrorStart) || nPriority > this.dErrorPriority.get(nErrorStart)) {
                                                    this.dError.set(nErrorStart, this._createErrorFromRegex(sText, sText0, sWhat, nOffset, m, eAct[0], sLineId, sRuleId, bUppercase, eAct[1], eAct[2], bShowRuleId, sOption, bContext));
                                                    this.dErrorPriority.set(nErrorStart, nPriority);
                                                    this.dSentenceError.set(nErrorStart, this.dError.get(nErrorStart));
                                                }
                                                break;
                                            case "~":
                                                // text processor
                                                //console.log("-> text processor by " + sLineId + "\nzRegex: " + zRegex.source);
                                                sText = this.rewriteText(sText, sWhat, eAct[0], m, bUppercase);
                                                bChange = true;
                                                if (bDebug) {
                                                    console.log("~ " + sText + "  -- " + m[eAct[0]] + "  # " + sLineId);
                                                }
                                                break;
                                            case "=":
                                                // disambiguation
                                                //console.log("-> disambiguation by " + sLineId + "\nzRegex: " + zRegex.source);
                                                window.grammalecte.gc_functions[sWhat](sText, m, this.dTokenPos);
                                                if (bDebug) {
                                                    console.log("= " + m[0] + "  # " + sLineId, "\nDA:", this.dTokenPos);
                                                }
                                                break;
                                            case ">":
                                                // we do nothing, this test is just a condition to apply all following actions
                                                break;
                                            default:
                                                console.log("# error: unknown action at " + sLineId);
                                        }
                                    } else {
                                        if (cActionType == ">") {
                                            break;
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log(sText);
                                    console.log("# line id: " + sLineId + "\n# rule id: " + sRuleId);
                                    console.error(e);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (bChange) {
            if (bParagraph) {
                this.sText = sText;
            } else {
                this.sSentence = sText;
            }
        }
    }

    update (sSentence, bDebug=false) {
        // update <sSentence> and retokenize
        this.sSentence = sSentence;
        let lNewToken = Array.from(window.grammalecte.gc_engine.oTokenizer.genTokens(sSentence, true));
        for (let oToken of lNewToken) {
            if (this.dTokenPos.gl_get(oToken["nStart"], {}).hasOwnProperty("lMorph")) {
                oToken["lMorph"] = this.dTokenPos.get(oToken["nStart"])["lMorph"];
            }
            if (this.dTokenPos.gl_get(oToken["nStart"], {}).hasOwnProperty("aTags")) {
                oToken["aTags"] = this.dTokenPos.get(oToken["nStart"])["aTags"];
            }
        }
        this.lTokens = lNewToken;
        this.dTokenPos.clear();
        for (let oToken of this.lTokens) {
            if (oToken["sType"] != "INFO") {
                this.dTokenPos.set(oToken["nStart"], oToken);
            }
        }
        if (bDebug) {
            console.log("UPDATE:");
            console.log(this.asString());
        }
    }

    * _getMatches (oGraph, oToken, oNode, bKeep=false) {
        // generator: return matches where <oToken> “values” match <oNode> arcs
        try {
            let bTokenFound = false;
            // token value
            if (oNode.hasOwnProperty(oToken["sValue"])) {
                yield [" ", oToken["sValue"], oNode[oToken["sValue"]]];
                bTokenFound = true;
            }
            if (oToken["sValue"].slice(0,2).gl_isTitle()) {
                let sValue = oToken["sValue"].toLowerCase();
                if (oNode.hasOwnProperty(sValue)) {
                    yield [" ", sValue, oNode[sValue]];
                    bTokenFound = true;
                }
            }
            else if (oToken["sValue"].gl_isUpperCase()) {
                let sValue = oToken["sValue"].toLowerCase();
                if (oNode.hasOwnProperty(sValue)) {
                    yield [" ", sValue, oNode[sValue]];
                    bTokenFound = true;
                }
                sValue = oToken["sValue"].gl_toCapitalize();
                if (oNode.hasOwnProperty(sValue)) {
                    yield [" ", sValue, oNode[sValue]];
                    bTokenFound = true;
                }
            }
            // regex value arcs
            if (oToken["sType"] != "INFO"  &&  oToken["sType"] != "PUNC"  &&  oToken["sType"] != "SIGN") {
                if (oNode.hasOwnProperty("<re_value>")) {
                    for (let sRegex in oNode["<re_value>"]) {
                        if (!sRegex.includes("¬")) {
                            // no anti-pattern
                            if (oToken["sValue"].search(sRegex) !== -1) {
                                yield ["~", sRegex, oNode["<re_value>"][sRegex]];
                                bTokenFound = true;
                            }
                        } else {
                            // there is an anti-pattern
                            let [sPattern, sNegPattern] = sRegex.split("¬", 2);
                            if (sNegPattern && oToken["sValue"].search(sNegPattern) !== -1) {
                                continue;
                            }
                            if (!sPattern || oToken["sValue"].search(sPattern) !== -1) {
                                yield ["~", sRegex, oNode["<re_value>"][sRegex]];
                                bTokenFound = true;
                            }
                        }
                    }
                }
            }
            // analysable tokens
            if (oToken["sType"].slice(0,4) == "WORD") {
                // token lemmas
                if (oNode.hasOwnProperty("<lemmas>")) {
                    for (let sLemma of window.grammalecte.gc_engine.oSpellChecker.getLemma(oToken["sValue"])) {
                        if (oNode["<lemmas>"].hasOwnProperty(sLemma)) {
                            yield [">", sLemma, oNode["<lemmas>"][sLemma]];
                            bTokenFound = true;
                        }
                    }
                }
                // phonetic similarity
                if (oNode.hasOwnProperty("<phonet>")) {
                    for (let sPhonet in oNode["<phonet>"]) {
                        if (sPhonet.endsWith("!")) {
                            let sPhon = sPhonet.slice(0,-1);
                            if (oToken["sValue"] == sPhon) {
                                continue;
                            }
                            if (oToken["sValue"].slice(0,1).gl_isUpperCase()) {
                                if (oToken["sValue"].toLowerCase() == sPhon) {
                                    continue;
                                }
                                if (oToken["sValue"].gl_isUpperCase() && oToken["sValue"].gl_toCapitalize() == sPhon) {
                                    continue;
                                }
                            }
                        }
                        if (phonet.isSimilAs(oToken["sValue"], sPhonet.gl_trimRight("!"))) {
                            yield ["#", sPhonet, oNode["<phonet>"][sPhonet]];
                            bTokenFound = true;
                        }
                    }
                }
                // morph arcs
                if (oNode.hasOwnProperty("<morph>")) {
                    let lMorph = (oToken.hasOwnProperty("lMorph")) ? oToken["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
                    if (lMorph.length > 0) {
                        for (let sSearch in oNode["<morph>"]) {
                            if (!sSearch.includes("¬")) {
                                // no anti-pattern
                                if (lMorph.some(sMorph  =>  (sMorph.includes(sSearch)))) {
                                    yield ["$", sSearch, oNode["<morph>"][sSearch]];
                                    bTokenFound = true;
                                }
                            } else {
                                // there is an anti-pattern
                                let [sPattern, sNegPattern] = sSearch.split("¬", 2);
                                if (sNegPattern == "*") {
                                    // all morphologies must match with <sPattern>
                                    if (sPattern) {
                                        if (lMorph.every(sMorph  =>  (sMorph.includes(sPattern)))) {
                                            yield ["$", sSearch, oNode["<morph>"][sSearch]];
                                            bTokenFound = true;
                                        }
                                    }
                                } else {
                                    if (sNegPattern  &&  lMorph.some(sMorph  =>  (sMorph.includes(sNegPattern)))) {
                                        continue;
                                    }
                                    if (!sPattern  ||  lMorph.some(sMorph  =>  (sMorph.includes(sPattern)))) {
                                        yield ["$", sSearch, oNode["<morph>"][sSearch]];
                                        bTokenFound = true;
                                    }
                                }
                            }
                        }
                    }
                }
                // regex morph arcs
                if (oNode.hasOwnProperty("<re_morph>")) {
                    let lMorph = (oToken.hasOwnProperty("lMorph")) ? oToken["lMorph"] : window.grammalecte.gc_engine.oSpellChecker.getMorph(oToken["sValue"]);
                    if (lMorph.length > 0) {
                        for (let sRegex in oNode["<re_morph>"]) {
                            if (!sRegex.includes("¬")) {
                                // no anti-pattern
                                if (lMorph.some(sMorph  =>  (sMorph.search(sRegex) !== -1))) {
                                    yield ["@", sRegex, oNode["<re_morph>"][sRegex]];
                                    bTokenFound = true;
                                }
                            } else {
                                // there is an anti-pattern
                                let [sPattern, sNegPattern] = sRegex.split("¬", 2);
                                if (sNegPattern == "*") {
                                    // all morphologies must match with <sPattern>
                                    if (sPattern) {
                                        if (lMorph.every(sMorph  =>  (sMorph.search(sPattern) !== -1))) {
                                            yield ["@", sRegex, oNode["<re_morph>"][sRegex]];
                                            bTokenFound = true;
                                        }
                                    }
                                } else {
                                    if (sNegPattern  &&  lMorph.some(sMorph  =>  (sMorph.search(sNegPattern) !== -1))) {
                                        continue;
                                    }
                                    if (!sPattern  ||  lMorph.some(sMorph  =>  (sMorph.search(sPattern) !== -1))) {
                                        yield ["@", sRegex, oNode["<re_morph>"][sRegex]];
                                        bTokenFound = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // token tags
            if (oToken.hasOwnProperty("aTags") && oNode.hasOwnProperty("<tags>")) {
                for (let sTag of oToken["aTags"]) {
                    if (oNode["<tags>"].hasOwnProperty(sTag)) {
                        yield ["/", sTag, oNode["<tags>"][sTag]];
                        bTokenFound = true;
                    }
                }
            }
            // meta arc (for token type)
            if (oNode.hasOwnProperty("<meta>")) {
                for (let sMeta in oNode["<meta>"]) {
                    // no regex here, we just search if <oNode["sType"]> exists within <sMeta>
                    if (sMeta == "*" || oToken["sType"] == sMeta) {
                        yield ["*", sMeta, oNode["<meta>"][sMeta]];
                        bTokenFound = true;
                    }
                    else if (sMeta.includes("¬")) {
                        if (!sMeta.includes(oToken["sType"])) {
                            yield ["*", sMeta, oNode["<meta>"][sMeta]];
                            bTokenFound = true;
                        }
                    }
                }
            }
            if (!bTokenFound && bKeep) {
                yield [null, "", -1];
            }
            // JUMP
            // Warning! Recurssion!
            if (oNode.hasOwnProperty("<>")) {
                yield* this._getMatches(oGraph, oToken, oGraph[oNode["<>"]], bKeep=true);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    parseGraph (oGraph, sCountry="FR", dOptions=null, bShowRuleId=false, bDebug=false, bContext=false) {
        // parse graph with tokens from the text and execute actions encountered
        let lPointer = [];
        let bTagAndRewrite = false;
        try {
            for (let [iToken, oToken] of this.lTokens.entries()) {
                if (bDebug) {
                    console.log("TOKEN: " + oToken["sValue"]);
                }
                // check arcs for each existing pointer
                let lNextPointer = [];
                for (let oPointer of lPointer) {
                    for (let [cActionType, sMatch, iNode] of this._getMatches(oGraph, oToken, oGraph[oPointer["iNode"]])) {
                        if (cActionType === null) {
                            lNextPointer.push(oPointer);
                            continue;
                        }
                        if (bDebug) {
                            console.log("  MATCH: " + cActionType + sMatch);
                        }
                        lNextPointer.push({ "iToken1": oPointer["iToken1"], "iNode": iNode });
                    }
                }
                lPointer = lNextPointer;
                // check arcs of first nodes
                for (let [cActionType, sMatch, iNode] of this._getMatches(oGraph, oToken, oGraph[0])) {
                    if (cActionType === null) {
                        continue;
                    }
                    if (bDebug) {
                        console.log("  MATCH: " + cActionType + sMatch);
                    }
                    lPointer.push({ "iToken1": iToken, "iNode": iNode });
                }
                // check if there is rules to check for each pointer
                for (let oPointer of lPointer) {
                    if (oGraph[oPointer["iNode"]].hasOwnProperty("<rules>")) {
                        let bChange = this._executeActions(oGraph, oGraph[oPointer["iNode"]]["<rules>"], oPointer["iToken1"]-1, iToken, dOptions, sCountry, bShowRuleId, bDebug, bContext);
                        if (bChange) {
                            bTagAndRewrite = true;
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
        if (bTagAndRewrite) {
            this.rewriteFromTags(bDebug);
        }
        if (bDebug) {
            console.log(this.asString());
        }
        return this.sSentence;
    }

    _executeActions (oGraph, oNode, nTokenOffset, nLastToken, dOptions, sCountry, bShowRuleId, bDebug, bContext) {
        // execute actions found in the DARG
        let bChange = false;
        for (let [sLineId, nextNodeKey] of Object.entries(oNode)) {
            let bCondMemo = null;
            for (let sRuleId of oGraph[nextNodeKey]) {
                try {
                    if (bDebug) {
                        console.log("   >TRY: " + sRuleId + " " + sLineId);
                    }
                    let [_, sOption, sFuncCond, cActionType, sWhat, ...eAct] = window.grammalecte.gc_rules_graph.dRule[sRuleId];
                    // Suggestion    [ option, condition, "-", replacement/suggestion/action, iTokenStart, iTokenEnd, cStartLimit, cEndLimit, bCaseSvty, nPriority, sMessage, iURL ]
                    // TextProcessor [ option, condition, "~", replacement/suggestion/action, iTokenStart, iTokenEnd, bCaseSvty ]
                    // Disambiguator [ option, condition, "=", replacement/suggestion/action ]
                    // Tag           [ option, condition, "/", replacement/suggestion/action, iTokenStart, iTokenEnd ]
                    // Immunity      [ option, condition, "!", "",                            iTokenStart, iTokenEnd ]
                    // Test          [ option, condition, ">", "" ]
                    if (!sOption || dOptions.gl_get(sOption, false)) {
                        bCondMemo = !sFuncCond || window.grammalecte.gc_functions[sFuncCond](this.lTokens, nTokenOffset, nLastToken, sCountry, bCondMemo, this.dTags, this.sSentence, this.sSentence0);
                        if (bCondMemo) {
                            if (cActionType == "-") {
                                // grammar error
                                let [iTokenStart, iTokenEnd, cStartLimit, cEndLimit, bCaseSvty, nPriority, sMessage, iURL] = eAct;
                                let nTokenErrorStart = (iTokenStart > 0) ? nTokenOffset + iTokenStart : nLastToken + iTokenStart;
                                if (!this.lTokens[nTokenErrorStart].hasOwnProperty("sImmunity") || (this.lTokens[nTokenErrorStart]["sImmunity"] != "*" && !this.lTokens[nTokenErrorStart]["sImmunity"].includes(sOption))) {
                                    let nTokenErrorEnd = (iTokenEnd > 0) ? nTokenOffset + iTokenEnd : nLastToken + iTokenEnd;
                                    let nErrorStart = this.nOffsetWithinParagraph + ((cStartLimit == "<") ? this.lTokens[nTokenErrorStart]["nStart"] : this.lTokens[nTokenErrorStart]["nEnd"]);
                                    let nErrorEnd = this.nOffsetWithinParagraph + ((cEndLimit == ">") ? this.lTokens[nTokenErrorEnd]["nEnd"] : this.lTokens[nTokenErrorEnd]["nStart"]);
                                    if (!this.dError.has(nErrorStart) || nPriority > this.dErrorPriority.gl_get(nErrorStart, -1)) {
                                        this.dError.set(nErrorStart, this._createErrorFromTokens(sWhat, nTokenOffset, nLastToken, nTokenErrorStart, nErrorStart, nErrorEnd, sLineId, sRuleId, bCaseSvty,
                                                                                                 sMessage, window.grammalecte.gc_rules_graph.dURL[iURL], bShowRuleId, sOption, bContext));
                                        this.dErrorPriority.set(nErrorStart, nPriority);
                                        this.dSentenceError.set(nErrorStart, this.dError.get(nErrorStart));
                                        if (bDebug) {
                                            console.log("    NEW_ERROR: ",  this.dError.get(nErrorStart));
                                        }
                                    }
                                }
                            }
                            else if (cActionType == "~") {
                                // text processor
                                let nTokenStart = (eAct[0] > 0) ? nTokenOffset + eAct[0] : nLastToken + eAct[0];
                                let nTokenEnd = (eAct[1] > 0) ? nTokenOffset + eAct[1] : nLastToken + eAct[1];
                                this._tagAndPrepareTokenForRewriting(sWhat, nTokenStart, nTokenEnd, nTokenOffset, nLastToken, eAct[2], bDebug);
                                bChange = true;
                                if (bDebug) {
                                    console.log(`    TEXT_PROCESSOR: [${this.lTokens[nTokenStart]["sValue"]}:${this.lTokens[nTokenEnd]["sValue"]}]  > ${sWhat}`);
                                }
                            }
                            else if (cActionType == "=") {
                                // disambiguation
                                window.grammalecte.gc_functions[sWhat](this.lTokens, nTokenOffset, nLastToken);
                                if (bDebug) {
                                    console.log(`    DISAMBIGUATOR: (${sWhat})  [${this.lTokens[nTokenOffset+1]["sValue"]}:${this.lTokens[nLastToken]["sValue"]}]`);
                                }
                            }
                            else if (cActionType == ">") {
                                // we do nothing, this test is just a condition to apply all following actions
                                if (bDebug) {
                                    console.log("    COND_OK");
                                }
                            }
                            else if (cActionType == "/") {
                                // Tag
                                let nTokenStart = (eAct[0] > 0) ? nTokenOffset + eAct[0] : nLastToken + eAct[0];
                                let nTokenEnd = (eAct[1] > 0) ? nTokenOffset + eAct[1] : nLastToken + eAct[1];
                                for (let i = nTokenStart; i <= nTokenEnd; i++) {
                                    if (this.lTokens[i].hasOwnProperty("aTags")) {
                                        this.lTokens[i]["aTags"].add(...sWhat.split("|"))
                                    } else {
                                        this.lTokens[i]["aTags"] = new Set(sWhat.split("|"));
                                    }
                                }
                                if (bDebug) {
                                    console.log(`    TAG:  ${sWhat} > [${this.lTokens[nTokenStart]["sValue"]}:${this.lTokens[nTokenEnd]["sValue"]}]`);
                                }
                                for (let sTag of sWhat.split("|")) {
                                    if (!this.dTags.has(sTag)) {
                                        this.dTags.set(sTag, [nTokenStart, nTokenEnd]);
                                    } else {
                                        this.dTags.set(sTag, [Math.min(nTokenStart, this.dTags.get(sTag)[0]), Math.max(nTokenEnd, this.dTags.get(sTag)[1])]);
                                    }
                                }
                            }
                            else if (cActionType == "!") {
                                // immunity
                                if (bDebug) {
                                    console.log("    IMMUNITY: " + sLineId + " / " + sRuleId);
                                }
                                let nTokenStart = (eAct[0] > 0) ? nTokenOffset + eAct[0] : nLastToken + eAct[0];
                                let nTokenEnd = (eAct[1] > 0) ? nTokenOffset + eAct[1] : nLastToken + eAct[1];
                                let sImmunity = sWhat || "*";
                                if (nTokenEnd - nTokenStart == 0) {
                                    this.lTokens[nTokenStart]["sImmunity"] = sImmunity;
                                    let nErrorStart = this.nOffsetWithinParagraph + this.lTokens[nTokenStart]["nStart"];
                                    if (this.dError.has(nErrorStart)) {
                                        this.dError.delete(nErrorStart);
                                    }
                                } else {
                                    for (let i = nTokenStart;  i <= nTokenEnd;  i++) {
                                        this.lTokens[i]["sImmunity"] = sImmunity;
                                        let nErrorStart = this.nOffsetWithinParagraph + this.lTokens[i]["nStart"];
                                        if (this.dError.has(nErrorStart)) {
                                            this.dError.delete(nErrorStart);
                                        }
                                    }
                                }
                            } else {
                                console.log("# error: unknown action at " + sLineId);
                            }
                        }
                        else if (cActionType == ">") {
                            if (bDebug) {
                                console.log("    COND_BREAK");
                            }
                            break;
                        }
                    }
                }
                catch (e) {
                    console.log("Error: ", sLineId, sRuleId, this.sSentence);
                    console.error(e);
                }
            }
        }
        return bChange;
    }

    _createErrorFromRegex (sText, sText0, sSugg, nOffset, m, iGroup, sLineId, sRuleId, bCaseSvty, sMsg, sURL, bShowRuleId, sOption, bContext) {
        let nStart = nOffset + m.start[iGroup];
        let nEnd = nOffset + m.end[iGroup];
        // suggestions
        let lSugg = [];
        if (sSugg.startsWith("=")) {
            sSugg = window.grammalecte.gc_functions[sSugg.slice(1)](sText, m);
            lSugg = (sSugg) ? sSugg.replace(/ /g, " ").split("|") : [];
        } else if (sSugg == "_") {
            lSugg = [];
        } else {
            lSugg = sSugg.gl_expand(m).replace(/ /g, " ").split("|");
        }
        if (bCaseSvty && lSugg.length > 0 && m[iGroup].slice(0,1).gl_isUpperCase()) {
            lSugg = (m[iGroup].gl_isUpperCase()) ? lSugg.map((s) => s.toUpperCase()) : capitalizeArray(lSugg);
        }
        // Message
        let sMessage = (sMsg.startsWith("=")) ? window.grammalecte.gc_functions[sMsg.slice(1)](sText, m) : sMsg.gl_expand(m);
        if (bShowRuleId) {
            sMessage += "  #" + sLineId + " / " + sRuleId;
        }
        //
        return this._createError(nStart, nEnd, sLineId, sRuleId, sOption, sMessage, lSugg, sURL, bContext);
    }

    _createErrorFromTokens (sSugg, nTokenOffset, nLastToken, iFirstToken, nStart, nEnd, sLineId, sRuleId, bCaseSvty, sMsg, sURL, bShowRuleId, sOption, bContext) {
        // suggestions
        let lSugg = [];
        if (sSugg.startsWith("=")) {
            sSugg = window.grammalecte.gc_functions[sSugg.slice(1)](this.lTokens, nTokenOffset, nLastToken);
            lSugg = (sSugg) ? sSugg.replace(/ /g, " ").split("|") : [];
        } else if (sSugg == "_") {
            lSugg = [];
        } else {
            lSugg = this._expand(sSugg, nTokenOffset, nLastToken).replace(/ /g, " ").split("|");
        }
        if (bCaseSvty && lSugg.length > 0 && this.lTokens[iFirstToken]["sValue"].slice(0,1).gl_isUpperCase()) {
            lSugg = (this.sSentence.slice(nStart, nEnd).gl_isUpperCase()) ? lSugg.map((s) => s.toUpperCase()) : capitalizeArray(lSugg);
        }
        // Message
        let sMessage = (sMsg.startsWith("=")) ? window.grammalecte.gc_functions[sMsg.slice(1)](this.lTokens, nTokenOffset, nLastToken) : this._expand(sMsg, nTokenOffset, nLastToken);
        if (bShowRuleId) {
            sMessage += "  #" + sLineId + " / " + sRuleId;
        }
        //
        return this._createError(nStart, nEnd, sLineId, sRuleId, sOption, sMessage, lSugg, sURL, bContext);
    }

    _createError (nStart, nEnd, sLineId, sRuleId, sOption, sMessage, lSugg, sURL, bContext) {
        let oErr = {
            "nStart": nStart,
            "nEnd": nEnd,
            "sLineId": sLineId,
            "sRuleId": sRuleId,
            "sType": sOption || "notype",
            "aColor": window.grammalecte.gc_engine.oOptionsColors[sOption],
            "sMessage": sMessage,
            "aSuggestions": lSugg,
            "URL": sURL
        }
        if (bContext) {
            oErr['sUnderlined'] = this.sText0.slice(nStart, nEnd);
            oErr['sBefore'] = this.sText0.slice(Math.max(0,nStart-80), nStart);
            oErr['sAfter'] = this.sText0.slice(nEnd, nEnd+80);
        }
        return oErr;
    }

    _expand (sText, nTokenOffset, nLastToken) {
        let m;
        while ((m = /\\(-?[0-9]+)/.exec(sText)) !== null) {
            if (m[1].slice(0,1) == "-") {
                sText = sText.replace(m[0], this.lTokens[nLastToken+parseInt(m[1],10)+1]["sValue"]);
            } else {
                sText = sText.replace(m[0], this.lTokens[nTokenOffset+parseInt(m[1],10)]["sValue"]);
            }
        }
        return sText;
    }

    rewriteText (sText, sRepl, iGroup, m, bUppercase) {
        // text processor: write sRepl in sText at iGroup position"
        let ln = m.end[iGroup] - m.start[iGroup];
        let sNew = "";
        if (sRepl === "*") {
            sNew = " ".repeat(ln);
        }
        else if (sRepl === "_") {
            sNew = "_".repeat(ln);
        }
        else if (sRepl === "@") {
            sNew = "@".repeat(ln);
        }
        else if (sRepl.slice(0,1) === "=") {
            sNew = window.grammalecte.gc_functions[sRepl.slice(1)](sText, m);
            sNew = sNew + " ".repeat(ln-sNew.length);
            if (bUppercase && m[iGroup].slice(0,1).gl_isUpperCase()) {
                sNew = sNew.gl_toCapitalize();
            }
        } else {
            sNew = sRepl.gl_expand(m);
            sNew = sNew + " ".repeat(ln-sNew.length);
        }
        //console.log(sText+"\nstart: "+m.start[iGroup]+" end:"+m.end[iGroup]);
        return sText.slice(0, m.start[iGroup]) + sNew + sText.slice(m.end[iGroup]);
    }

    _tagAndPrepareTokenForRewriting (sWhat, nTokenRewriteStart, nTokenRewriteEnd, nTokenOffset, nLastToken, bCaseSvty, bDebug) {
        // text processor: rewrite tokens between <nTokenRewriteStart> and <nTokenRewriteEnd> position
        if (sWhat === "*") {
            // purge text
            if (nTokenRewriteEnd - nTokenRewriteStart == 0) {
                this.lTokens[nTokenRewriteStart]["bToRemove"] = true;
            } else {
                for (let i = nTokenRewriteStart;  i <= nTokenRewriteEnd;  i++) {
                    this.lTokens[i]["bToRemove"] = true;
                }
            }
        }
        else if (sWhat === "␣") {
            // merge tokens
            this.lTokens[nTokenRewriteStart]["nMergeUntil"] = nTokenRewriteEnd;
        }
        else if (sWhat.startsWith("␣")) {
            sWhat = this._expand(sWhat, nTokenOffset, nLastToken);
            this.lTokens[nTokenRewriteStart]["nMergeUntil"] = nTokenRewriteEnd;
            this.lTokens[nTokenRewriteStart]["sMergedValue"] = sWhat.slice(1);
        }
        else if (sWhat === "_") {
            // neutralized token
            if (nTokenRewriteEnd - nTokenRewriteStart == 0) {
                this.lTokens[nTokenRewriteStart]["sNewValue"] = "_";
            } else {
                for (let i = nTokenRewriteStart;  i <= nTokenRewriteEnd;  i++) {
                    this.lTokens[i]["sNewValue"] = "_";
                }
            }
        }
        else {
            if (sWhat.startsWith("=")) {
                sWhat = window.grammalecte.gc_functions[sWhat.slice(1)](this.lTokens, nTokenOffset, nLastToken);
            } else {
                sWhat = this._expand(sWhat, nTokenOffset, nLastToken);
            }
            let bUppercase = bCaseSvty && this.lTokens[nTokenRewriteStart]["sValue"].slice(0,1).gl_isUpperCase();
            if (nTokenRewriteEnd - nTokenRewriteStart == 0) {
                // one token
                if (bUppercase) {
                    sWhat = sWhat.gl_toCapitalize();
                }
                this.lTokens[nTokenRewriteStart]["sNewValue"] = sWhat;
            }
            else {
                // several tokens
                let lTokenValue = sWhat.split("|");
                if (lTokenValue.length != (nTokenRewriteEnd - nTokenRewriteStart + 1)) {
                    if (bDebug) {
                        console.log("Error. Text processor: number of replacements != number of tokens.");
                    }
                    return;
                }
                let j = 0;
                for (let i = nTokenRewriteStart;  i <= nTokenRewriteEnd;  i++) {
                    let sValue = lTokenValue[j];
                    if (!sValue || sValue === "*") {
                        this.lTokens[i]["bToRemove"] = true;
                    } else {
                        if (bUppercase) {
                            sValue = sValue.gl_toCapitalize();
                        }
                        this.lTokens[i]["sNewValue"] = sValue;
                    }
                    j++;
                }
            }
        }
    }

    rewriteFromTags (bDebug=false) {
        // rewrite the sentence, modify tokens, purge the token list
        if (bDebug) {
            console.log("REWRITE");
        }
        let lNewToken = [];
        let nMergeUntil = 0;
        let oMergingToken = null;
        for (let [iToken, oToken] of this.lTokens.entries()) {
            let bKeepToken = true;
            if (oToken["sType"] != "INFO") {
                if (nMergeUntil && iToken <= nMergeUntil) {
                    oMergingToken["sValue"] += " ".repeat(oToken["nStart"] - oMergingToken["nEnd"]) + oToken["sValue"];
                    oMergingToken["nEnd"] = oToken["nEnd"];
                    if (bDebug) {
                        console.log("  MERGED TOKEN: " + oMergingToken["sValue"]);
                    }
                    oToken["bMerged"] = true;
                    bKeepToken = false;
                    if (iToken == nMergeUntil && oMergingToken.hasOwnProperty("sMergedValue")) {
                        oMergingToken["sValue"] = oMergingToken["sMergedValue"];
                        let sSpaceFiller = " ".repeat(oToken["nEnd"] - oMergingToken["nStart"] - oMergingToken["sMergedValue"].length);
                        this.sSentence = this.sSentence.slice(0, oMergingToken["nStart"]) + oMergingToken["sMergedValue"] + sSpaceFiller + this.sSentence.slice(oToken["nEnd"]);
                    }
                }
                if (oToken.hasOwnProperty("nMergeUntil")) {
                    if (iToken > nMergeUntil) { // this token is not already merged with a previous token
                        oMergingToken = oToken;
                    }
                    if (oToken["nMergeUntil"] > nMergeUntil) {
                        nMergeUntil = oToken["nMergeUntil"];
                    }
                    delete oToken["nMergeUntil"];
                }
                else if (oToken.hasOwnProperty("bToRemove")) {
                    if (bDebug) {
                        console.log("  REMOVED: " + oToken["sValue"]);
                    }
                    this.sSentence = this.sSentence.slice(0, oToken["nStart"]) + " ".repeat(oToken["nEnd"] - oToken["nStart"]) + this.sSentence.slice(oToken["nEnd"]);
                    bKeepToken = false;
                }
            }
            //
            if (bKeepToken) {
                lNewToken.push(oToken);
                if (oToken.hasOwnProperty("sNewValue")) {
                    // rewrite token and sentence
                    if (bDebug) {
                        console.log(oToken["sValue"] + " -> " + oToken["sNewValue"]);
                    }
                    oToken["sRealValue"] = oToken["sValue"];
                    oToken["sValue"] = oToken["sNewValue"];
                    let nDiffLen = oToken["sRealValue"].length - oToken["sNewValue"].length;
                    let sNewRepl = (nDiffLen >= 0) ? oToken["sNewValue"] + " ".repeat(nDiffLen) : oToken["sNewValue"].slice(0, oToken["sRealValue"].length);
                    this.sSentence = this.sSentence.slice(0,oToken["nStart"]) + sNewRepl + this.sSentence.slice(oToken["nEnd"]);
                    delete oToken["sNewValue"];
                }
            }
        }
        if (bDebug) {
            console.log("  TEXT REWRITED: " + this.sSentence);
        }
        this.lTokens.length = 0;
        this.lTokens = lNewToken;
    }
};


if (typeof(exports) !== 'undefined') {
    exports.lang = window.grammalecte.gc_engine.lang;
    exports.locales = window.grammalecte.gc_engine.locales;
    exports.pkg = window.grammalecte.gc_engine.pkg;
    exports.name = window.grammalecte.gc_engine.name;
    exports.version = window.grammalecte.gc_engine.version;
    exports.author = window.grammalecte.gc_engine.author;
    // init
    exports.load = window.grammalecte.gc_engine.load;
    exports.parse = window.grammalecte.gc_engine.parse;
    exports.getSpellChecker = window.grammalecte.gc_engine.getSpellChecker;
    // rules
    exports.ignoreRule = window.grammalecte.gc_engine.ignoreRule;
    exports.resetIgnoreRules = window.grammalecte.gc_engine.resetIgnoreRules;
    exports.reactivateRule = window.grammalecte.gc_engine.reactivateRule;
    exports.listRules = window.grammalecte.gc_engine.listRules;
    exports.getRules = window.grammalecte.gc_engine.getRules;
    // options
    exports.setOption = window.grammalecte.gc_engine.setOption;
    exports.setOptions = window.grammalecte.gc_engine.setOptions;
    exports.getOptions = window.grammalecte.gc_engine.getOptions;
    exports.getDefaultOptions = window.grammalecte.gc_engine.getDefaultOptions;
    exports.resetOptions = window.grammalecte.gc_engine.resetOptions;
    // other
    exports.TextParser = TextParser;
}
