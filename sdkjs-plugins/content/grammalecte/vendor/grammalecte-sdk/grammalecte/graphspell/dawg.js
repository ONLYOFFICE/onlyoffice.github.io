// JavaScript

// FSA DICTIONARY BUILDER
//
// by Olivier R.
// License: MPL 2
//
// This tool encodes lexicon into an indexable binary dictionary
// Input files MUST be encoded in UTF-8.

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console, helpers */

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



if (typeof(process) !== 'undefined') {
    var str_transform = require("./str_transform.js");
}


class DAWG {
    /*  DIRECT ACYCLIC WORD GRAPH
        This code is inspired from Steve Hanov’s DAWG, 2011. (http://stevehanov.ca/blog/index.php?id=115)
        We store suffix/affix codes and tags within the graph after the “real” word.
        A word is a list of numbers [ c1, c2, c3 . . . cN, iAffix, iTags]
        Each arc is an index in this.lArcVal, where are stored characters, suffix/affix codes for stemming and tags.
        Important: As usual, the last node (after ‘iTags’) is tagged final, AND the node after ‘cN’ is ALSO tagged final.
    */

    constructor (lEntrySrc, cStemming, sLangCode, sLangName="", sDicName="", sDescription="", xProgressBarNode=null) {
        console.log("===== Direct Acyclic Word Graph - Minimal Acyclic Finite State Automaton =====");
        let funcStemmingGen = null;
        switch (cStemming.toUpperCase()) {
            case "A":
                funcStemmingGen = str_transform.defineAffixCode; break;
            case "S":
                funcStemmingGen = str_transform.defineSuffixCode; break;
            case "N":
                funcStemmingGen = str_transform.noStemming; break;
            default:
                throw "Error. Unknown stemming code: " + cStemming;
        }

        let lEntry = [];
        let lChar = [''],  dChar = new Map(),  nChar = 1,  dCharOccur = new Map();
        let lAff  = [],    dAff  = new Map(),  nAff  = 0,  dAffOccur = new Map();
        let lTag  = [],    dTag  = new Map(),  nTag  = 0,  dTagOccur = new Map();
        let nErr = 0;

        this.a2grams = new Set();

        // read lexicon
        for (let [sFlex, sStem, sTag] of lEntrySrc) {
            for (let s2grams of str_transform.getNgrams(sFlex)) {
                this.a2grams.add(s2grams);
            }
            addWordToCharDict(sFlex);
            // chars
            for (let c of sFlex) {
                if (!dChar.has(c)) {
                    dChar.set(c, nChar);
                    lChar.push(c);
                    nChar += 1;
                }
                dCharOccur.set(c, dCharOccur.gl_get(c, 0) + 1);
            }
            // affixes to find stem from flexion
            let sAff = funcStemmingGen(sFlex, sStem);
            if (!dAff.has(sAff)) {
                dAff.set(sAff, nAff);
                lAff.push(sAff);
                nAff += 1;
            }
            dAffOccur.set(sAff, dAffOccur.gl_get(sAff, 0) + 1);
            // tags
            if (!dTag.has(sTag)) {
                dTag.set(sTag, nTag);
                lTag.push(sTag);
                nTag += 1;
            }
            dTagOccur.set(sTag, dTagOccur.gl_get(sTag, 0) + 1);
            lEntry.push([sFlex, dAff.get(sAff), dTag.get(sTag)]);
        }
        if (lEntry.length == 0) {
            throw "Error. Empty lexicon";
        }

        lEntry = [...new Set(lEntry.map(e => JSON.stringify(e)))].map(s => JSON.parse(s));
        // Set can’t distinguish similar lists, so we transform list item in string given to the Set
        // then we transform items in list a new.

        // Preparing DAWG
        console.log(" > Preparing list of words");
        let lVal = lChar.concat(lAff).concat(lTag);
        let lWord = [];
        for (let [sFlex, iAff, iTag] of lEntry) {
            let lTemp = [];
            for (let c of sFlex) {
                lTemp.push(dChar.get(c));
            }
            lTemp.push(iAff+nChar);
            lTemp.push(iTag+nChar+nAff);
            lWord.push(lTemp);
        }
        lEntry.length = 0; // clear the array

        // Dictionary of arc values occurrency, to sort arcs of each node
        let lKeyVal = [];
        for (let c of dChar.keys()) { lKeyVal.push([dChar.get(c), dCharOccur.get(c)]); }
        for (let sAff of dAff.keys()) { lKeyVal.push([dAff.get(sAff)+nChar, dAffOccur.get(sAff)]); }
        for (let sTag of dTag.keys()) { lKeyVal.push([dTag.get(sTag)+nChar+nAff, dTagOccur.get(sTag)]); }
        let dValOccur = new Map(lKeyVal);
        lKeyVal.length = 0; // clear the array

        this.sLangCode = sLangCode;
        this.sLangName = sLangName;
        this.sDicName = sDicName;
        this.sDescription = sDescription;
        this.nEntry = lWord.length;
        this.aPreviousEntry = [];
        oNodeCounter.reset();
        this.oRoot = new DawgNode();
        this.lUncheckedNodes = [];          // list of nodes that have not been checked for duplication.
        this.dMinimizedNodes = new Map();   // list of unique nodes that have been checked for duplication.
        this.nNode = 0;
        this.nArc = 0;
        this.dChar = dChar;
        this.nChar = dChar.size;
        this.nAff = nAff;
        this.lArcVal = lVal;
        this.nArcVal = lVal.length;
        this.nTag = this.nArcVal - this.nChar - nAff;
        this.cStemming = cStemming;
        if (cStemming == "A") {
            this.funcStemming = str_transform.changeWordWithAffixCode;
        } else if (cStemming == "S") {
            this.funcStemming = str_transform.changeWordWithSuffixCode;
        } else {
            this.funcStemming = str_transform.noStemming;
        }

        // binary dictionary
        this.sByDic = "";
        this.lByDic = [];

        // build
        lWord.sort();
        if (xProgressBarNode) {
            xProgressBarNode.value = 0;
            xProgressBarNode.max = lWord.length;
        }
        let i = 1;
        for (let aEntry of lWord) {
            this.insert(aEntry);
            if (xProgressBarNode) {
                xProgressBarNode.value = i;
                i += 1;
            }
        }
        this.finish();
        this.countNodes();
        this.countArcs();
        this.sortNodeArcs(dValOccur);
        this.displayInfo();
        this.writeInfo();
        //this.oRoot.display(0, this.lArcVal, true);
    }

    // BUILD DAWG
    insert (aEntry) {
        if (aEntry < this.aPreviousEntry) {
            throw "Error: Words must be inserted in alphabetical order.";
        }

        // find common prefix between word and previous word
        let nCommonPrefix = 0;
        for (let i = 0;  i < Math.min(aEntry.length, this.aPreviousEntry.length);  i++) {
            if (aEntry[i] != this.aPreviousEntry[i]) {
                break;
            }
            nCommonPrefix += 1;
        }
        // Check the lUncheckedNodes for redundant nodes, proceeding from last
        // one down to the common prefix size. Then truncate the list at that point.
        this._minimize(nCommonPrefix);

        // add the suffix, starting from the correct node mid-way through the graph
        let oNode = (this.lUncheckedNodes.length == 0) ? this.oRoot : this.lUncheckedNodes[this.lUncheckedNodes.length-1][2];
        let iChar = nCommonPrefix;
        for (let c of aEntry.slice(nCommonPrefix)) {
            let oNextNode = new DawgNode();
            oNode.arcs.set(c, oNextNode);
            this.lUncheckedNodes.push([oNode, c, oNextNode]);
            if (iChar == (aEntry.length - 2)) {
                oNode.final = true;
            }
            iChar += 1;
            oNode = oNextNode;
        }
        oNode.final = true;
        this.aPreviousEntry = aEntry;
    }

    finish () {
        // minimize unchecked nodes
        this._minimize(0);
    }

    _minimize (nDownTo) {
        // proceed from the leaf up to a certain point
        for (let i = this.lUncheckedNodes.length-1;  i > nDownTo-1;  i--) {
            let [oNode, char, oChildNode] = this.lUncheckedNodes[i];
            if (this.dMinimizedNodes.has(oChildNode.__hash__())) {
                // replace the child with the previously encountered one
                oNode.arcs.set(char, this.dMinimizedNodes.get(oChildNode.__hash__()));
            } else {
                // add the state to the minimized nodes.
                this.dMinimizedNodes.set(oChildNode.__hash__(), oChildNode);
            }
            this.lUncheckedNodes.pop();
        }
    }

    countNodes () {
        this.nNode = this.dMinimizedNodes.size;
    }

    countArcs () {
        this.nArc = this.oRoot.arcs.size;
        for (let oNode of this.dMinimizedNodes.values()) {
            this.nArc += oNode.arcs.size;
        }
    }

    sortNodeArcs (dValOccur) {
        console.log(" > Sort node arcs");
        this.oRoot.sortArcs(dValOccur);
        for (let oNode of this.dMinimizedNodes.values()) {
            oNode.sortArcs(dValOccur);
        }
    }

    lookup (sWord) {
        let oNode = this.oRoot;
        for (let c of sWord) {
            if (!oNode.arcs.has(this.dChar.gl_get(c, ''))) {
                return false;
            }
            oNode = oNode.arcs.get(this.dChar.get(c));
        }
        return oNode.final;
    }

    morph (sWord) {
        let oNode = this.oRoot;
        for (let c of sWord) {
            if (!oNode.arcs.has(this.dChar.get(c, ''))) {
                return '';
            }
            oNode = oNode.arcs.get(this.dChar.get(c));
        }
        if (oNode.final) {
            let s = "* ";
            for (let arc of oNode.arcs.keys()) {
                if (arc >= this.nChar) {
                    s += " [" + this.funcStemming(sWord, this.lArcVal[arc]);
                    let oNode2 = oNode.arcs.get(arc);
                    for (let arc2 of oNode2.arcs.keys()) {
                        s += " / " + this.lArcVal[arc2];
                    }
                    s += "]";
                }
            }
            return s;
        }
        return '';
    }

    displayInfo () {
        console.log("Entries: " + this.nEntry);
        console.log("Characters: " + this.nChar);
        console.log("Affixes: " + this.nAff);
        console.log("Tags: " + this.nTag);
        console.log("Arc values: " + this.nArcVal);
        console.log("Nodes: " + this.nNode);
        console.log("Arcs: " + this.nArc);
        console.log("2grams: " + this.a2grams.size);
        console.log("Stemming: " + this.cStemming + "FX");
    }

    getArcStats () {
        let d = new Map();
        for (let oNode of this.dMinimizedNodes.values()) {
            let n = oNode.arcs.size;
            d.set(n, d.gl_get(n, 0) + 1);
        }
        let s = " * Nodes:\n";
        for (let [nKey, nVal] of d.entries()) {
            s = s + " " + nVal + " nodes have " + nKey + " arcs\n";
        }
        return s;
    }

    writeInfo () {
        console.log(this.getArcStats());
        console.log("\n * Values:\n");
        let i = 0;
        for (let s of this.lArcVal) {
            console.log(i + ": " + s);
            i++;
        }
    }

    * select (sPattern="") {
        // generator: returns all entries which morphology fits <sPattern>
        let zPattern = null;
        if (sPattern !== "") {
            try {
                zPattern = new RegExp(sPattern);
            }
            catch (e) {
                console.log("Error in regex pattern");
                console.log(e.message);
            }
        }
        yield* this._select(zPattern, this.oRoot, "");
    }

    * _select (zPattern, oNode, sWord) {
        // recursive generator
        for (let [nVal, oNextNode] of oNode.arcs.entries()) {
            if (nVal <= this.nChar) {
                // simple character
                yield* this._select(zPattern, oNextNode, sWord + this.lArcVal[nVal]);
            } else {
                let sEntry = sWord + "\t" + this.funcStemming(sWord, this.lArcVal[nVal]);
                for (let [nMorphVal, _] of oNextNode.arcs.entries()) {
                    if (!zPattern || zPattern.test(this.lArcVal[nMorphVal])) {
                        yield sEntry + "\t" + this.lArcVal[nMorphVal];
                    }
                }
            }
        }
    }

    // BINARY CONVERSION
    _calculateBinary () {
        console.log("Write DAWG as an indexable binary dictionary");
        this.nBytesArc = Math.floor( (this.nArcVal.toString(2).length + 2) / 8 ) + 1;     // We add 2 bits. See DawgNode.convToBytes()
        this.nBytesOffset = 0;
        this._calcNumBytesNodeAddress();
        this._calcNodesAddress();
        this.sByDic = this.oRoot.convToBytes(this.nBytesArc, this.nBytesNodeAddress);
        for (let oNode of this.dMinimizedNodes.values()) {
            this.sByDic += oNode.convToBytes(this.nBytesArc, this.nBytesNodeAddress);
        }
        console.log("Arc values (chars, affixes and tags): " + this.nArcVal);
        console.log("Arc size: "+this.nBytesArc+" bytes, Address size: "+this.nBytesNodeAddress+" bytes");
        console.log("-> " + this.nBytesArc+this.nBytesNodeAddress + " * " + this.nArc + " = " + (this.nBytesArc+this.nBytesNodeAddress)*this.nArc + " bytes");
    }

    _calcNumBytesNodeAddress () {
        // how many bytes needed to store all nodes/arcs in the binary dictionary
        this.nBytesNodeAddress = 1;
        while (((this.nBytesArc + this.nBytesNodeAddress) * this.nArc) > (2 ** (this.nBytesNodeAddress * 8))) {
            this.nBytesNodeAddress += 1;
        }
    }

    _calcNodesAddress () {
        let nBytesNode = this.nBytesArc + this.nBytesNodeAddress;
        let iAddr = this.oRoot.arcs.size * nBytesNode;
        for (let oNode of this.dMinimizedNodes.values()) {
            oNode.addr = iAddr;
            iAddr += Math.max(oNode.arcs.size, 1) * nBytesNode;
        }
    }

    _binaryToList () {
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

    createBinaryJSON () {
        this._calculateBinary();
        this._binaryToList();
        let oJSON = {
            "sHeader": "/grammalecte-fsa/",
            "sLangCode": this.sLangCode,
            "sLangName": this.sLangName,
            "sDicName": this.sDicName,
            "sDescription": this.sDescription,
            "sFileName": "[none]",
            "sDate": this._getDate(),
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
            //"sByDic": this.sByDic,    // binary word graph
            "lByDic": this.lByDic,
            "l2grams": Array.from(this.a2grams)
        };
        return oJSON;
    }

    _getDate () {
        let oDate = new Date();
        let sMonth = (oDate.getMonth() + 1).toString().padStart(2, "0"); // Month+1: Because JS always sucks somehow.
        let sDay = (oDate.getDate()).toString().padStart(2, "0");
        let sHours = (oDate.getHours()).toString().padStart(2, "0");
        let sMinutes = (oDate.getMinutes()).toString().padStart(2, "0");
        let sSeconds = (oDate.getSeconds()).toString().padStart(2, "0");
        return `${oDate.getFullYear()}-${sMonth}-${sDay} ${sHours}:${sMinutes}:${sSeconds}`;
    }
}


const oNodeCounter = {
    nNextId: 0,

    getId: function () {
        this.nNextId += 1;
        return this.nNextId-1;
    },

    reset: function () {
        this.nNextId = 0;
    }
};


class DawgNode {

    constructor () {
        this.i = oNodeCounter.getId();
        this.final = false;
        this.arcs = new Map();  // key: arc value; value: a node
        this.addr = 0;          // address in the binary dictionary
    }

    __str__ () {
        // Caution! this function is used for hashing and comparison!
        let sFinalChar = (this.final) ? "1" : "0";
        let l = [sFinalChar];
        for (let [key, node] of this.arcs.entries()) {
            l.push(key.toString());
            l.push(node.i.toString());
        }
        return l.join("_");
    }

    __hash__ () {
        // Used as a key in a python dictionary.
        return this.__str__();
    }

    __eq__ (other) {
        // Used as a key in a python dictionary.
        // Nodes are equivalent if they have identical arcs, and each identical arc leads to identical states.
        return this.__str__() == other.__str__();
    }

    sortArcs (dValOccur) {
        let lTemp = Array.from(this.arcs.entries());
        lTemp.sort(function (a, b) {
            if (dValOccur.get(a[0]) > dValOccur.get(b[0]))
                return -1;
            if (dValOccur.get(a[0]) < dValOccur.get(b[0]))
                return 1;
            return 0;
        });
        this.arcs = new Map(lTemp);
    }

    display (nTab, lArcVal, bRecur=false) {
        let sResult = "    ".repeat(nTab) + "Node: " + this.i + " " + this.final + "\n";
        for (let arc of this.arcs.keys()) {
            sResult += "    ".repeat(nTab) + lArcVal[arc] + "\n";
        }
        console.log(sResult);
        if (bRecur) {
            for (let oNode of this.arcs.values()) {
                oNode.display(nTab+1, lArcVal, bRecur);
            }
        }
    }

    // VERSION 1 =====================================================================================================
    convToBytes (nBytesArc, nBytesNodeAddress) {
        /*
            Node scheme:
            - Arc length is defined by nBytesArc
            - Address length is defined by nBytesNodeAddress

            |                Arc                |                         Address of next node                          |
            |                                   |                                                                       |
             /---------------\ /---------------\ /---------------\ /---------------\ /---------------\ /---------------\
             | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
             \---------------/ \---------------/ \---------------/ \---------------/ \---------------/ \---------------/
             [...]
             /---------------\ /---------------\ /---------------\ /---------------\ /---------------\ /---------------\
             | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
             \---------------/ \---------------/ \---------------/ \---------------/ \---------------/ \---------------/
              ^ ^
              | |
              | |
              |  \___ if 1, last arc of this node
               \_____ if 1, this node is final (only on the first arc)
        */
        let nArc = this.arcs.size;
        let nFinalNodeMask = 1 << ((nBytesArc*8)-1);
        let nFinalArcMask = 1 << ((nBytesArc*8)-2);
        if (this.arcs.size == 0) {
            let nVal = nFinalNodeMask | nFinalArcMask;
            let sBinary = this.convValueToHexString(nVal, nBytesArc);
            sBinary += this.convValueToHexString(0, nBytesNodeAddress);
            return sBinary;
        }
        let sBinary = "";
        let i = 1;
        for (let arc of this.arcs.keys()) {
            let nVal = arc;
            if (i == 1 && this.final) {
                nVal = nVal | nFinalNodeMask;
            }
            if (i == nArc) {
                nVal = nVal | nFinalArcMask;
            }
            i++;
            sBinary += this.convValueToHexString(nVal, nBytesArc);
            sBinary += this.convValueToHexString(this.arcs.get(arc).addr, nBytesNodeAddress);
        }
        return sBinary;
    }

    convValueToHexString (nVal, nByte) {
        // nVal: value to convert, nByte: number of bytes
        let sHexVal = nVal.toString(16); // conversion to hexadecimal string
        //console.log(`value: ${nVal} in ${nByte} bytes`);
        if (sHexVal.length < (nByte*2)) {
            return "0".repeat((nByte*2) - sHexVal.length) + sHexVal;
        } else if (sHexVal.length == (nByte*2)) {
            return sHexVal;
        } else {
            throw "Conversion to byte string: value bigger than allowed.";
        }
    }
}



// Another attempt to sort node arcs

const _dCharOrder = new Map([ ["", new Map()] ]);
// key: previous char, value: dictionary of chars {c: nValue}


function addWordToCharDict (sWord) {
    let cPrevious = "";
    for (let cChar of sWord) {
        if (!_dCharOrder.get(cPrevious)) {
            _dCharOrder.set(cPrevious, new Map());
        }
        _dCharOrder.get(cPrevious).set(cChar, _dCharOrder.get(cPrevious).gl_get(cChar, 0) + 1);
        cPrevious = cChar;
    }
}

function getCharOrderAfterChar (cChar) {
    return _dCharOrder.gl_get(cChar, null);
}

function displayCharOrder () {
    for (let [key, value] of _dCharOrder.entries()) {
        let s = "[" + key + "]: ";
        let lTemp = Array.from(value.entries());
        lTemp.sort(function (a, b) {
            if (a[1] > b[1])
                return -1;
            if (a[1] < b[1])
                return 1;
            return 0;
        });
        for (let [c, n] of lTemp) {
            s += c+":"+n+", ";
        }
        console.log(s);
    }
}
