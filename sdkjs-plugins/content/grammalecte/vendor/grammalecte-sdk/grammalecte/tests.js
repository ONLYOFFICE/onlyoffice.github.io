// JavaScript

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console */

"use strict";


if (typeof(process) !== 'undefined') {
    var helpers = require("./graphspell/helpers.js");
}


class TestGrammarChecking {

    constructor (gce, spfTests="") {
        this.gce = gce;
        this.spfTests = spfTests;
        this._aRuleTested = new Set();
    }

    * testParse (bDebug=false) {
        const t0 = Date.now();
        let sURL;
        if (typeof(process) !== 'undefined') {
            sURL = (this.spfTests !== "") ? this.spfTests : "./"+this.gce.lang+"/tests_data.json";
        } else {
            sURL = (this.spfTests !== "") ? this.spfTests : "resource://grammalecte/"+this.gce.lang+"/tests_data.json";
        }
        const aData = JSON.parse(helpers.loadFile(sURL)).aData;
        let nInvalid = 0;
        let nTotal = 0;
        let sErrorText;
        let sExpectedSuggs;
        let sExpectedErrors;
        let nTestWithExpectedError = 0;
        let nTestWithExpectedErrorAndSugg = 0;
        let nUnexpectedErrors = 0;
        let sTextToCheck;
        let sFoundErrors;
        let sFoundSuggs;
        let sListErr;
        let sLineNum;
        let i = 1;
        let sUntestedRules = "";
        let bShowUntested = false;
        let zOption = /^__([a-zA-Z0-9]+)__ /;
        let sOption;
        let m;
        yield "Tests [" + this.gce.lang + "]: " + aData.length.toString();
        try {
            for (let sLine of aData) {
                sLineNum = sLine.slice(0,10).trim();
                sLine = sLine.slice(10).trim();
                if (sLine.length > 0 && !sLine.startsWith("#")) {
                    sOption = false;
                    m = zOption.exec(sLine);
                    if (m) {
                        sLine = sLine.slice(sLine.indexOf(" ")+1);
                        sOption = m[1];
                    }
                    if (sLine.includes("->>")) {
                        [sErrorText, sExpectedSuggs] = this._splitTestLine(sLine);
                        nTestWithExpectedErrorAndSugg += 1
                    } else {
                        sErrorText = sLine.trim();
                        sExpectedSuggs = "";
                    }
                    sExpectedErrors = this._getExpectedErrors(sErrorText);
                    if (sExpectedErrors.trim() != "") {
                        nTestWithExpectedError += 1;
                    }
                    sTextToCheck = sErrorText.replace(/\{\{/g, "").replace(/\}\}/g, "");
                    [sFoundErrors, sListErr, sFoundSuggs] = this._getFoundErrors(sTextToCheck, bDebug, sOption);
                    if (sExpectedErrors !== sFoundErrors) {
                        yield "\n" + i.toString() +
                              "\n# Line num: " + sLineNum +
                              "\n> to check: " + sTextToCheck +
                              "\n  expected: " + sExpectedErrors +
                              "\n  found:    " + sFoundErrors +
                              "\n  errors:   \n" + sListErr;
                        nInvalid = nInvalid + 1;
                    }
                    else if (sExpectedSuggs) {
                        if (!this._checkSuggestions(sExpectedSuggs, sFoundSuggs)) {
                            yield  "\n# Line num: " + sLineNum +
                                   "\n> to check: " + sTextToCheck +
                                   "\n  expected: " + sExpectedSuggs +
                                   "\n  found:    " + sFoundSuggs +
                                   "\n  errors:   \n" + sListErr;
                            nUnexpectedErrors += 1;
                        }
                    }
                    nTotal = nTotal + 1;
                }
                i = i + 1;
                if (i % 1000 === 0) {
                    yield i.toString();
                }
            }
            yield "Tests with expected errors: " + nTestWithExpectedError + " and suggestions: " + nTestWithExpectedErrorAndSugg + " > " + nTestWithExpectedErrorAndSugg/nTestWithExpectedError*100 + " %";
            if (nUnexpectedErrors) {
                yield "Unexpected errors: " + nUnexpectedErrors;
            }
            yield* this._showUntestedRules()
        }
        catch (e) {
            console.error(e);
        }
        const t1 = Date.now();
        yield "Tests parse finished in " + ((t1-t0)/1000).toString()
            + " s\nTotal errors: " + nInvalid.toString() + " / " + nTotal.toString();
    }

    * _showUntestedRules () {
        let i = 0;
        for (let [sOpt, sLineId, sRuleId] of this.gce.listRules()) {
            if (sOpt !== "@@@@" && !this._aRuleTested.has(sLineId) && !/^[0-9]+[sp]$|^[pd]_/.test(sRuleId)) {
                sUntestedRules += sLineId + "/" + sRuleId + ", ";
                i += 1;
            }
        }
        if (i > 0) {
            yield sUntestedRules + "\n[" + i.toString() + " untested rules]";
        }
    }

    _splitTestLine (sLine) {
        let [sText, sSugg] = sLine.split("->>");
        sSugg = sSugg.trim().replace(/ /g, " ");
        if (sSugg.startsWith('"') && sSugg.endsWith('"')) {
            sSugg = sSugg.slice(1,-1);
        }
        return [sText.trim(), sSugg];
    }

    _getFoundErrors (sLine, bDebug, sOption) {
        try {
            let aErrs = [];
            if (sOption) {
                this.gce.setOption(sOption, true);
                aErrs = this.gce.parse(sLine, "FR", bDebug);
                this.gce.setOption(sOption, false);
            } else {
                aErrs = this.gce.parse(sLine, "FR", bDebug);
            }
            let sRes = " ".repeat(sLine.length);
            let sListErr = "";
            let lAllSugg = [];
            for (let oErr of aErrs.sort( (a,b) => a["nStart"] - b["nStart"] )) {
                sRes = sRes.slice(0, oErr["nStart"]) + "~".repeat(oErr["nEnd"] - oErr["nStart"]) + sRes.slice(oErr["nEnd"]);
                sListErr += "    * {" + oErr['sLineId'] + " / " + oErr['sRuleId'] + "}  at  " + oErr['nStart'] + ":" + oErr['nEnd'] + "\n";
                lAllSugg.push(oErr["aSuggestions"].join("|"));
                this._aRuleTested.add(oErr["sLineId"]);
            }
            return [sRes, sListErr, lAllSugg.join("|||")];
        }
        catch (e) {
            console.error(e);
        }
        return [" ".repeat(sLine.length), "", ""];
    }

    _getExpectedErrors (sLine) {
        try {
            let sRes = " ".repeat(sLine.length);
            let z = /\{\{.+?\}\}/g;
            let m;
            let i = 0;
            while ((m = z.exec(sLine)) !== null) {
                let nStart = m.index - (4 * i);
                let nEnd = m.index + m[0].length - (4 * (i+1));
                sRes = sRes.slice(0, nStart) + "~".repeat(nEnd - nStart) + sRes.slice(nEnd, -4);
                i = i + 1;
                // Warning! JS sucks: infinite loop if writing directly /\{\{.+?\}\}/g.exec(sLine)
                // lines below to remove when I know why.
                if (i > 10) {
                    console.log("\ninfinite loop?\nline:"+sLine+"\nm: "+ m.toString());
                    break;
                }
            }
            return sRes;
        }
        catch (e) {
            console.error(e);
        }
        return " ".repeat(sLine.length);
    }

    _checkSuggestions (sAllExceptedSuggs, sAllFoundSuggs) {
        let lAllExpectedSuggs = sAllExceptedSuggs.split("|||");
        let lAllFoundSuggs = sAllFoundSuggs.split("|||");
        if (lAllExpectedSuggs.length != lAllFoundSuggs.length) {
            return false;
        }
        for (let i = 0;  i < lAllExpectedSuggs.length;  i++) {
            let lExpectedSuggs = lAllExpectedSuggs[i].split("|");
            let lFoundSuggs = lAllFoundSuggs[i].split("|");
            if (lExpectedSuggs.length != lFoundSuggs.length) {
                return false;
            }
            let aExpectedSuggs = new Set(lExpectedSuggs);
            let aFoundSuggs = new Set(lFoundSuggs);
            if (aExpectedSuggs.size !== aFoundSuggs.size || ![...aExpectedSuggs].every(value => aFoundSuggs.has(value))) {
                return false;
            }
        }
        return true;
    }
}


if (typeof(exports) !== 'undefined') {
    exports.TestGrammarChecking = TestGrammarChecking;
}
