// Grammalecte - Compiled regular expressions

/* jshint esversion:6 */
/* jslint esversion:6 */


window.grammalecte["cregex"] = {
    ///// Lemme
    _zLemma: new RegExp(">([a-zà-öø-ÿ0-9Ā-ʯ][a-zà-öø-ÿ0-9Ā-ʯ-]+)"),

    ///// Masculin / féminin / singulier / pluriel
    _zGenderNumber: new RegExp(":[mfe]:[spi]"),

    ///// Nom et adjectif
    _zNA: new RegExp(":[NA]"),

    //// nombre
    _zNAs: new RegExp(":[NA].*:s"),
    _zNAp: new RegExp(":[NA].*:p"),
    _zNAi: new RegExp(":[NA].*:i"),
    _zNAsi: new RegExp(":[NA].*:[si]"),
    _zNApi: new RegExp(":[NA].*:[pi]"),

    //// genre
    _zNAm: new RegExp(":[NA].*:m"),
    _zNAf: new RegExp(":[NA].*:f"),
    _zNAe: new RegExp(":[NA].*:e"),
    _zNAme: new RegExp(":[NA].*:[me]"),
    _zNAfe: new RegExp(":[NA].*:[fe]"),

    //// nombre et genre
    // singulier
    _zNAms: new RegExp(":[NA].*:m.*:s"),
    _zNAfs: new RegExp(":[NA].*:f.*:s"),
    _zNAes: new RegExp(":[NA].*:e.*:s"),
    _zNAmes: new RegExp(":[NA].*:[me].*:s"),
    _zNAfes: new RegExp(":[NA].*:[fe].*:s"),

    // singulier et invariable
    _zNAmsi: new RegExp(":[NA].*:m.*:[si]"),
    _zNAfsi: new RegExp(":[NA].*:f.*:[si]"),
    _zNAesi: new RegExp(":[NA].*:e.*:[si]"),
    _zNAmesi: new RegExp(":[NA].*:[me].*:[si]"),
    _zNAfesi: new RegExp(":[NA].*:[fe].*:[si]"),

    // pluriel
    _zNAmp: new RegExp(":[NA].*:m.*:p"),
    _zNAfp: new RegExp(":[NA].*:f.*:p"),
    _zNAep: new RegExp(":[NA].*:e.*:p"),
    _zNAmep: new RegExp(":[NA].*:[me].*:p"),
    _zNAfep: new RegExp(":[NA].*:[me].*:p"),

    // pluriel et invariable
    _zNAmpi: new RegExp(":[NA].*:m.*:[pi]"),
    _zNAfpi: new RegExp(":[NA].*:f.*:[pi]"),
    _zNAepi: new RegExp(":[NA].*:e.*:[pi]"),
    _zNAmepi: new RegExp(":[NA].*:[me].*:[pi]"),
    _zNAfepi: new RegExp(":[NA].*:[fe].*:[pi]"),

    //// Divers
    _zAD: new RegExp(":[AB]"),

    ///// Verbe
    _zVconj: new RegExp(":[123][sp]"),
    _zVconj123: new RegExp(":V[123].*:[123][sp]"),

    ///// Nom | Adjectif | Verbe
    _zNVconj: new RegExp(":(?:N|[123][sp])"),
    _zNAVconj: new RegExp(":(?:N|A|[123][sp])"),

    ///// Spécifique
    _zNnotA: new RegExp(":N(?!:A)"),
    _zPNnotA: new RegExp(":(?:N(?!:A)|Q)"),

    ///// Noms propres
    _zNP: new RegExp(":(?:M[12P]|T)"),
    _zNPm: new RegExp(":(?:M[12P]|T):m"),
    _zNPf: new RegExp(":(?:M[12P]|T):f"),
    _zNPe: new RegExp(":(?:M[12P]|T):e"),


    ///// FONCTIONS

    getLemmaOfMorph: function (sMorph) {
        return this._zLemma.exec(sMorph)[1];
    },

    agreement: function (l1, l2) {
        // returns True if agreement in gender and number is possible between morphologies <l1> and <l2>
        let [sGender1, sNumber1] = this.getGenderNumber(l1);
        let [sGender2, sNumber2] = this.getGenderNumber(l2);
        if (sNumber1 !== ":i" && sNumber2 !== ":i" && sNumber1 !== sNumber2) {
            return false;
        }
        if (sGender1 !== ":e" && sGender2 !== ":e" && sGender1 !== sGender2) {
            return false;
        }
        return true;
    },

    checkConjVerb: function (lMorph, sReqConj) {
        return lMorph.some(s  =>  s.includes(sReqConj));
    },

    getGenderNumber: function (lMorph) {
        // returns tuple (gender, number) of word: (':m', ':f', ':e' or empty string) and (':s', ':p', ':i' or empty string)
        let sGender = "";
        let sNumber = "";
        for (let sMorph of lMorph) {
            let m = this._zGenderNumber.exec(sMorph);
            if (m) {
                let sGenderx = m[0].slice(0,2);
                let sNumberx = m[0].slice(2,4);
                if (!sGender) {
                    sGender = sGenderx;
                }
                else if (sGender != sGenderx) {
                    sGender = ":e";
                }
                if (!sNumber) {
                    sNumber = sNumberx;
                }
                else if (sNumber != sNumberx) {
                    sNumber = ":i";
                }
            }
        }
        return [sGender, sNumber];
    },


    // NOTE :  isWhat (lMorph)    returns true   if lMorph contains nothing else than What
    //         mbWhat (lMorph)    returns true   if lMorph contains What at least once

    //// isXXX = it’s certain

    isNom: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":N"));
    },

    isNomNotAdj: function (lMorph) {
        return lMorph.every(s  =>  this._zNnotA.test(s));
    },

    isAdj: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":A"));
    },

    isNomAdj: function (lMorph) {
        return lMorph.every(s  =>  this._zNA.test(s));
    },

    isNomVconj: function (lMorph) {
        return lMorph.every(s  =>  this._zNVconj.test(s));
    },

    isInv: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":i"));
    },
    isSg: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":s"));
    },
    isPl: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":p"));
    },
    isEpi: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":e"));
    },
    isMas: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":m"));
    },
    isFem: function (lMorph) {
        return lMorph.every(s  =>  s.includes(":f"));
    },


    //// mbXXX = MAYBE XXX

    mbNom: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":N"));
    },

    mbAdj: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":A"));
    },

    mbAdjNb: function (lMorph) {
        return lMorph.some(s  =>  this._zAD.test(s));
    },

    mbNomAdj: function (lMorph) {
        return lMorph.some(s  =>  this._zNA.test(s));
    },

    mbNomNotAdj: function (lMorph) {
        let b = false;
        for (let s of lMorph) {
            if (s.includes(":A")) {
                return false;
            }
            if (s.includes(":N")) {
                b = true;
            }
        }
        return b;
    },

    mbPpasNomNotAdj: function (lMorph) {
        return lMorph.some(s  =>  this._zPNnotA.test(s));
    },

    mbVconj: function (lMorph) {
        return lMorph.some(s  =>  this._zVconj.test(s));
    },

    mbVconj123: function (lMorph) {
        return lMorph.some(s  =>  this._zVconj123.test(s));
    },

    mbMG: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":G"));
    },

    mbInv: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":i"));
    },
    mbSg: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":s"));
    },
    mbPl: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":p"));
    },
    mbEpi: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":e"));
    },
    mbMas: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":m"));
    },
    mbFem: function (lMorph) {
        return lMorph.some(s  =>  s.includes(":f"));
    },

    mbNpr: function (lMorph) {
        return lMorph.some(s  =>  this._zNP.test(s));
    },

    mbNprMasNotFem: function (lMorph) {
        if (lMorph.some(s  =>  this._zNPf.test(s))) {
            return false;
        }
        return lMorph.some(s  =>  this._zNPm.test(s));
    }
};


if (typeof(exports) !== 'undefined') {
    exports._zLemma = cregex._zLemma;
    exports._zNA = cregex._zNA;
    exports._zNAs = cregex._zNAs;
    exports._zNAp = cregex._zNAp;
    exports._zNAi = cregex._zNAi;
    exports._zNAsi = cregex._zNAsi;
    exports._zNApi = cregex._zNApi;
    exports._zNAm = cregex._zNAm;
    exports._zNAf = cregex._zNAf;
    exports._zNAe = cregex._zNAe;
    exports._zNAme = cregex._zNAme;
    exports._zNAfe = cregex._zNAfe;
    exports._zNAms = cregex._zNAms;
    exports._zNAfs = cregex._zNAfs;
    exports._zNAes = cregex._zNAes;
    exports._zNAmes = cregex._zNAmes;
    exports._zNAfes = cregex._zNAfes;
    exports._zNAmsi = cregex._zNAmsi;
    exports._zNAfsi = cregex._zNAfsi;
    exports._zNAesi = cregex._zNAesi;
    exports._zNAmesi = cregex._zNAmesi;
    exports._zNAfesi = cregex._zNAfesi;
    exports._zNAmp = cregex._zNAmp;
    exports._zNAfp = cregex._zNAfp;
    exports._zNAep = cregex._zNAep;
    exports._zNAmep = cregex._zNAmep;
    exports._zNAfep = cregex._zNAfep;
    exports._zNAmpi = cregex._zNAmpi;
    exports._zNAfpi = cregex._zNAfpi;
    exports._zNAepi = cregex._zNAepi;
    exports._zNAmepi = cregex._zNAmepi;
    exports._zNAfepi = cregex._zNAfepi;
    exports._zAD = cregex._zAD;
    exports._zVconj = cregex._zVconj;
    exports._zVconj123 = cregex._zVconj123;
    exports._zNVconj = cregex._zNVconj;
    exports._zNAVconj = cregex._zNAVconj;
    exports._zNnotA = cregex._zNnotA;
    exports._zPNnotA = cregex._zPNnotA;
    exports._zNP = cregex._zNP;
    exports._zNPm = cregex._zNPm;
    exports._zNPf = cregex._zNPf;
    exports._zNPe = cregex._zNPe;
    exports.getLemmaOfMorph = cregex.getLemmaOfMorph;
    exports.agreement = cregex.agreement;
    exports.getGenderNumber = cregex.getGenderNumber;
    exports.checkConjVerb = cregex.checkConjVerb;
    exports.isNom = cregex.isNom;
    exports.isNomNotAdj = cregex.isNomNotAdj;
    exports.isAdj = cregex.isAdj;
    exports.isNomAdj = cregex.isNomAdj;
    exports.isNomVconj = cregex.isNomVconj;
    exports.isInv = cregex.isInv;
    exports.isSg = cregex.isSg;
    exports.isPl = cregex.isPl;
    exports.isEpi = cregex.isEpi;
    exports.isMas = cregex.isMas;
    exports.isFem = cregex.isFem;
    exports.mbNom = cregex.mbNom;
    exports.mbAdj = cregex.mbAdj;
    exports.mbAdjNb = cregex.mbAdjNb;
    exports.mbNomAdj = cregex.mbNomAdj;
    exports.mbNomNotAdj = cregex.mbNomNotAdj;
    exports.mbPpasNomNotAdj = cregex.mbPpasNomNotAdj;
    exports.mbVconj = cregex.mbVconj;
    exports.mbVconj123 = cregex.mbVconj123;
    exports.mbMG = cregex.mbMG;
    exports.mbInv = cregex.mbInv;
    exports.mbSg = cregex.mbSg;
    exports.mbPl = cregex.mbPl;
    exports.mbEpi = cregex.mbEpi;
    exports.mbMas = cregex.mbMas;
    exports.mbFem = cregex.mbFem;
    exports.mbNpr = cregex.mbNpr;
    exports.mbNprMasNotFem = cregex.mbNprMasNotFem;
}
