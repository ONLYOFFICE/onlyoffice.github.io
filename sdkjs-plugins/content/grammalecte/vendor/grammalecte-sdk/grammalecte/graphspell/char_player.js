// list of similar chars
// useful for suggestion mechanism

/* jshint esversion:6 */
/* jslint esversion:6 */


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



window.grammalecte["char_player"] = {
    /*
        oDistanceBetweenChars:
            - with Jaro-Winkler, values between 1 and 10
            - with Damerau-Levenshtein, values / 10 (between 0 and 1: 0.1, 0.2 ... 0.9)
    */
    oDistanceBetweenChars: {
        //"a": {},
        "e": {"é": 5},
        //"é": {"e": 5},
        "i": {"y": 2},
        //"o": {},
        //"u": {},
        "y": {"i": 3},
        "b": {"d": 8, "h": 9},
        "c": {"ç": 1, "k": 5, "q": 5, "s": 5, "x": 5, "z": 8},
        "d": {"b": 8},
        "f": {"v": 8},
        "g": {"j": 5},
        "h": {"b": 9},
        "j": {"g": 5, "i": 9},
        "k": {"c": 5, "q": 1, "x": 5},
        "l": {"i": 9},
        "m": {"n": 8},
        "n": {"m": 8, "r": 9},
        "p": {"q": 9},
        "q": {"c": 5, "k": 1, "p": 9},
        "r": {"n": 9, "j": 9},
        "s": {"c": 5, "ç": 1, "x": 5, "z": 5},
        "t": {"d": 9},
        "v": {"f": 8, "w": 1},
        "w": {"v": 1},
        "x": {"c": 5, "k": 5, "q": 5, "s": 5},
        "z": {"s": 5}
    },

    distanceBetweenChars: function (c1, c2) {
        if (c1 == c2) {
            return 0;
        }
        if (this.oDistanceBetweenChars.hasOwnProperty(c1) && this.oDistanceBetweenChars[c1].hasOwnProperty(c2)) {
            return this.oDistanceBetweenChars[c1][c2];
        }
        return 1;
    },


    aVowel: new Set("aáàâäāeéèêëēiíìîïīoóòôöōuúùûüūyýỳŷÿȳœæAÁÀÂÄĀEÉÈÊËĒIÍÌÎÏĪOÓÒÔÖŌUÚÙÛÜŪYÝỲŶŸȲŒÆ"),
    aConsonant: new Set("bcçdfghjklmnñpqrstvwxzBCÇDFGHJKLMNÑPQRSTVWXZ"),
    aDouble: new Set("bcdfjklmnprstzBCDFJKLMNPRSTZ"),  // letters that may be used twice successively


    // Similar chars

    d1to1: new Map([
        ["'", "'’"],    // U+0027: apostrophe droite
        ["’", "’"],     // U+2019: apostrophe typographique  (sera utilisée par défaut)
        ["ʼ", "ʼ’"],    // U+02BC: Lettre modificative apostrophe
        ["‘", "‘’"],    // U+2018: guillemet-apostrophe culbuté
        ["‛", "‛’"],    // U+201B: guillemet-virgule supérieur culbuté
        ["´", "´’"],    // U+00B4: accent aigu
        ["`", "`’"],    // U+0060: accent grave
        ["′", "′’"],    // U+2032: prime
        ["‵", "‵’"],    // U+2035: prime réfléchi
        ["՚", "՚’"],    // U+055A: apostrophe arménienne
        ["ꞌ", "ꞌ’"],    // U+A78C: latin minuscule saltillo
        ["Ꞌ", "Ꞌ’"],    // U+A78B: latin majuscule saltillo

        ["1", "1₁liîLIÎ"],
        ["2", "2₂zZ"],
        ["3", "3₃eéèêEÉÈÊ"],
        ["4", "4₄aàâAÀÂ"],
        ["5", "5₅sgSG"],
        ["6", "6₆bdgBDG"],
        ["7", "7₇ltLT"],
        ["8", "8₈bB"],
        ["9", "9₉gbdGBD"],
        ["0", "0₀oôOÔ"],

        ["a", "aAàÀâÂáÁäÄāĀæÆ"],
        ["A", "AaÀàÂâÁáÄäĀāÆæ"],
        ["à", "aAàÀâÂáÁäÄāĀæÆ"],
        ["À", "AaÀàÂâÁáÄäĀāÆæ"],
        ["â", "aAàÀâÂáÁäÄāĀæÆ"],
        ["Â", "AaÀàÂâÁáÄäĀāÆæ"],
        ["á", "aAàÀâÂáÁäÄāĀæÆ"],
        ["Á", "AaÀàÂâÁáÄäĀāÆæ"],
        ["ä", "aAàÀâÂáÁäÄāĀæÆ"],
        ["Ä", "AaÀàÂâÁáÄäĀāÆæ"],

        ["æ", "æÆéÉaA"],
        ["Æ", "ÆæÉéAa"],

        ["b", "bB"],
        ["B", "Bb"],

        ["c", "cCçÇsSkKqQśŚŝŜ"],
        ["C", "CcÇçSsKkQqŚśŜŝ"],
        ["ç", "cCçÇsSkKqQśŚŝŜ"],
        ["Ç", "CcÇçSsKkQqŚśŜŝ"],

        ["d", "dDðÐ"],
        ["D", "DdÐð"],

        ["e", "eEéÉèÈêÊëËēĒœŒ"],
        ["E", "EeÉéÈèÊêËëĒēŒœ"],
        ["é", "eEéÉèÈêÊëËēĒœŒ"],
        ["É", "EeÉéÈèÊêËëĒēŒœ"],
        ["ê", "eEéÉèÈêÊëËēĒœŒ"],
        ["Ê", "EeÉéÈèÊêËëĒēŒœ"],
        ["è", "eEéÉèÈêÊëËēĒœŒ"],
        ["È", "EeÉéÈèÊêËëĒēŒœ"],
        ["ë", "eEéÉèÈêÊëËēĒœŒ"],
        ["Ë", "EeÉéÈèÊêËëĒēŒœ"],

        ["f", "fF"],
        ["F", "Ff"],

        ["g", "gGjJĵĴ"],
        ["G", "GgJjĴĵ"],

        ["h", "hH"],
        ["H", "Hh"],

        ["i", "iIîÎïÏyYíÍìÌīĪÿŸ"],
        ["I", "IiÎîÏïYyÍíÌìĪīŸÿ"],
        ["î", "iIîÎïÏyYíÍìÌīĪÿŸ"],
        ["Î", "IiÎîÏïYyÍíÌìĪīŸÿ"],
        ["ï", "iIîÎïÏyYíÍìÌīĪÿŸ"],
        ["Ï", "IiÎîÏïYyÍíÌìĪīŸÿ"],
        ["í", "iIîÎïÏyYíÍìÌīĪÿŸ"],
        ["Í", "IiÎîÏïYyÍíÌìĪīŸÿ"],
        ["ì", "iIîÎïÏyYíÍìÌīĪÿŸ"],
        ["Ì", "IiÎîÏïYyÍíÌìĪīŸÿ"],

        ["j", "jJgGĵĴ"],
        ["J", "JjGgĴĵ"],

        ["k", "kKcCqQ"],
        ["K", "KkCcQq"],

        ["l", "lLłŁ"],
        ["L", "LlŁł"],

        ["m", "mMḿḾ"],
        ["M", "MmḾḿ"],

        ["n", "nNñÑńŃǹǸ"],
        ["N", "NnÑñŃńǸǹ"],

        ["o", "oOôÔóÓòÒöÖōŌœŒ"],
        ["O", "OoÔôÓóÒòÖöŌōŒœ"],
        ["ô", "oOôÔóÓòÒöÖōŌœŒ"],
        ["Ô", "OoÔôÓóÒòÖöŌōŒœ"],
        ["ó", "oOôÔóÓòÒöÖōŌœŒ"],
        ["Ó", "OoÔôÓóÒòÖöŌōŒœ"],
        ["ò", "oOôÔóÓòÒöÖōŌœŒ"],
        ["Ò", "OoÔôÓóÒòÖöŌōŒœ"],
        ["ö", "oOôÔóÓòÒöÖōŌœŒ"],
        ["Ö", "OoÔôÓóÒòÖöŌōŒœ"],

        ["œ", "œŒoOôÔeEéÉèÈêÊëË"],
        ["Œ", "ŒœOoÔôEeÉéÈèÊêËë"],

        ["p", "pPṕṔ"],
        ["P", "PpṔṕ"],

        ["q", "qQcCkK"],
        ["Q", "QqCcKk"],

        ["r", "rRŕŔ"],
        ["R", "RrŔŕ"],

        ["s", "sScCçÇśŚŝŜ"],
        ["S", "SsCcÇçŚśŜŝ"],
        ["ś", "sScCçÇśŚŝŜ"],
        ["Ś", "SsCcÇçŚśŜŝ"],
        ["ŝ", "sScCçÇśŚŝŜ"],
        ["Ŝ", "SsCcÇçŚśŜŝ"],

        ["t", "tT"],
        ["T", "Tt"],

        ["u", "uUûÛùÙüÜúÚūŪ"],
        ["U", "UuÛûÙùÜüÚúŪū"],
        ["û", "uUûÛùÙüÜúÚūŪ"],
        ["Û", "UuÛûÙùÜüÚúŪū"],
        ["ù", "uUûÛùÙüÜúÚūŪ"],
        ["Ù", "UuÛûÙùÜüÚúŪū"],
        ["ü", "uUûÛùÙüÜúÚūŪ"],
        ["Ü", "UuÛûÙùÜüÚúŪū"],
        ["ú", "uUûÛùÙüÜúÚūŪ"],
        ["Ú", "UuÛûÙùÜüÚúŪū"],

        ["v", "vVwW"],
        ["V", "VvWw"],

        ["w", "wWvV"],
        ["W", "WwVv"],

        ["x", "xXcCkK"],
        ["X", "XxCcKk"],

        ["y", "yYiIîÎÿŸŷŶýÝỳỲȳȲ"],
        ["Y", "YyIiÎîŸÿŶŷÝýỲỳȲȳ"],
        ["ÿ", "yYiIîÎÿŸŷŶýÝỳỲȳȲ"],
        ["Ÿ", "YyIiÎîŸÿŶŷÝýỲỳȲȳ"],
        ["ŷ", "yYiIîÎÿŸŷŶýÝỳỲȳȲ"],
        ["Ŷ", "YyIiÎîŸÿŶŷÝýỲỳȲȳ"],
        ["ý", "yYiIîÎÿŸŷŶýÝỳỲȳȲ"],
        ["Ý", "YyIiÎîŸÿŶŷÝýỲỳȲȳ"],
        ["ỳ", "yYiIîÎÿŸŷŶýÝỳỲȳȲ"],
        ["Ỳ", "YyIiÎîŸÿŶŷÝýỲỳȲȳ"],

        ["z", "zZsSẑẐźŹ"],
        ["Z", "ZzSsẐẑŹź"],
    ]),

    d1toX: new Map([
        ["æ", ["ae",]],
        ["Æ", ["AE",]],
        ["b", ["bb",]],
        ["B", ["BB",]],
        ["c", ["cc", "ss", "qu", "ch"]],
        ["C", ["CC", "SS", "QU", "CH"]],
        ["d", ["dd",]],
        ["D", ["DD",]],
        ["é", ["ai", "ei"]],
        ["É", ["AI", "EI"]],
        ["f", ["ff", "ph"]],
        ["F", ["FF", "PH"]],
        ["g", ["gu", "ge", "gg", "gh"]],
        ["G", ["GU", "GE", "GG", "GH"]],
        ["j", ["jj", "dj"]],
        ["J", ["JJ", "DJ"]],
        ["k", ["qu", "ck", "ch", "cu", "kk", "kh"]],
        ["K", ["QU", "CK", "CH", "CU", "KK", "KH"]],
        ["l", ["ll",]],
        ["L", ["LL",]],
        ["m", ["mm", "mn"]],
        ["M", ["MM", "MN"]],
        ["n", ["nn", "nm", "mn"]],
        ["N", ["NN", "NM", "MN"]],
        ["o", ["au", "eau"]],
        ["O", ["AU", "EAU"]],
        ["œ", ["oe", "eu"]],
        ["Œ", ["OE", "EU"]],
        ["p", ["pp", "ph"]],
        ["P", ["PP", "PH"]],
        ["q", ["qu", "ch", "cq", "ck", "kk"]],
        ["Q", ["QU", "CH", "CQ", "CK", "KK"]],
        ["r", ["rr",]],
        ["R", ["RR",]],
        ["s", ["ss", "sh"]],
        ["S", ["SS", "SH"]],
        ["t", ["tt", "th"]],
        ["T", ["TT", "TH"]],
        ["x", ["cc", "ct", "xx"]],
        ["X", ["CC", "CT", "XX"]],
        ["z", ["ss", "zh"]],
        ["Z", ["SS", "ZH"]],
    ]),

    get1toXReplacement: function (cPrev, cCur, cNext) {
        if (this.aConsonant.has(cCur)  &&  (this.aConsonant.has(cPrev)  ||  this.aConsonant.has(cNext))) {
            return [];
        }
        return this.d1toX.gl_get(cCur, []);
    },

    d2toX: new Map([
        ["am", ["an", "en", "em"]],
        ["AM", ["AN", "EN", "EM"]],
        ["an", ["am", "en", "em"]],
        ["AN", ["AM", "EN", "EM"]],
        ["au", ["eau", "o", "ô"]],
        ["AU", ["EAU", "O", "Ô"]],
        ["em", ["an", "am", "en"]],
        ["EM", ["AN", "AM", "EN"]],
        ["en", ["an", "am", "em"]],
        ["EN", ["AN", "AM", "EM"]],
        ["ae", ["æ", "é"]],
        ["AE", ["Æ", "É"]],
        ["ai", ["ei", "é", "è", "ê", "ë"]],
        ["AI", ["EI", "É", "È", "Ê", "Ë"]],
        ["ei", ["ai", "é", "è", "ê", "ë"]],
        ["EI", ["AI", "É", "È", "Ê", "Ë"]],
        ["ch", ["sh", "c", "ss"]],
        ["CH", ["SH", "C", "SS"]],
        ["ck", ["qu", "q"]],
        ["CK", ["QU", "Q"]],
        ["ct", ["x", "cc"]],
        ["CT", ["X", "CC"]],
        ["oa", ["oi",]],
        ["OA", ["OI",]],
        ["oe", ["œ",]],
        ["OE", ["Œ",]],
        ["oi", ["oa", "oie"]],
        ["OI", ["OA", "OIE"]],
        ["gg", ["gu",]],
        ["GG", ["GU",]],
        ["gu", ["gg",]],
        ["GU", ["GG",]],
        ["ph", ["f",]],
        ["PH", ["F",]],
        ["qu", ["q", "cq", "ck", "c", "k"]],
        ["QU", ["Q", "CQ", "CK", "C", "K"]],
        ["ss", ["c", "ç"]],
        ["SS", ["C", "Ç"]],
        ["un", ["ein",]],
        ["UN", ["EIN",]],
    ]),

    // End of word
    dFinal1: new Map([
        ["a", ["as", "at", "ant", "ah"]],
        ["A", ["AS", "AT", "ANT", "AH"]],
        ["c", ["ch", "que"]],
        ["C", ["CH", "QUE"]],
        ["e", ["et", "er", "ets", "ée", "ez", "ai", "ais", "ait", "ent", "eh"]],
        ["E", ["ET", "ER", "ETS", "ÉE", "EZ", "AI", "AIS", "AIT", "ENT", "EH"]],
        ["é", ["et", "er", "ets", "ée", "ez", "ai", "ais", "ait"]],
        ["É", ["ET", "ER", "ETS", "ÉE", "EZ", "AI", "AIS", "AIT"]],
        ["è", ["et", "er", "ets", "ée", "ez", "ai", "ais", "ait"]],
        ["È", ["ET", "ER", "ETS", "ÉE", "EZ", "AI", "AIS", "AIT"]],
        ["ê", ["et", "er", "ets", "ée", "ez", "ai", "ais", "ait"]],
        ["Ê", ["ET", "ER", "ETS", "ÉE", "EZ", "AI", "AIS", "AIT"]],
        ["ë", ["et", "er", "ets", "ée", "ez", "ai", "ais", "ait"]],
        ["Ë", ["ET", "ER", "ETS", "ÉE", "EZ", "AI", "AIS", "AIT"]],
        ["g", ["gh",]],
        ["G", ["GH",]],
        ["i", ["is", "it", "ie", "in"]],
        ["I", ["IS", "IT", "IE", "IN"]],
        ["k", ["que"]],
        ["K", ["QUE"]],
        ["n", ["nt", "nd", "ns", "nh"]],
        ["N", ["NT", "ND", "NS", "NH"]],
        ["o", ["aut", "ot", "os"]],
        ["O", ["AUT", "OT", "OS"]],
        ["ô", ["aut", "ot", "os"]],
        ["Ô", ["AUT", "OT", "OS"]],
        ["ö", ["aut", "ot", "os"]],
        ["Ö", ["AUT", "OT", "OS"]],
        ["p", ["ph",]],
        ["P", ["PH",]],
        ["s", ["sh",]],
        ["S", ["SH",]],
        ["t", ["th",]],
        ["T", ["TH",]],
        ["u", ["ut", "us", "uh"]],
        ["U", ["UT", "US", "UH"]],
    ]),

    dFinal2: new Map([
        ["ai", ["aient", "ais", "et"]],
        ["AI", ["AIENT", "AIS", "ET"]],
        ["an", ["ant", "ent"]],
        ["AN", ["ANT", "ENT"]],
        ["en", ["ent", "ant", "ène", "enne"]],
        ["EN", ["ENT", "ANT", "ÈNE", "ENNE"]],
        ["ei", ["ait", "ais"]],
        ["EI", ["AIT", "AIS"]],
        ["on", ["ons", "ont"]],
        ["ON", ["ONS", "ONT"]],
        ["oi", ["ois", "oit", "oix"]],
        ["OI", ["OIS", "OIT", "OIX"]],
    ])
};


if (typeof(exports) !== 'undefined') {
    exports.aVowel = char_player.aVowel;
    exports.aConsonant = char_player.aConsonant;
    exports.aDouble = char_player.aDouble;
    exports.d1to1 = char_player.d1to1;
    exports.d1toX = char_player.d1toX;
    exports.get1toXReplacement = char_player.get1toXReplacement;
    exports.d2toX = char_player.d2toX;
    exports.dFinal1 = char_player.dFinal1;
    exports.dFinal2 = char_player.dFinal2;
    exports.aPfx1 = char_player.aPfx1;
    exports.aPfx2 = char_player.aPfx2;
}
