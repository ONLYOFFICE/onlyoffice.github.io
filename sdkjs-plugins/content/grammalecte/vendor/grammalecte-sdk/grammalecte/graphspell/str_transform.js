// STRING TRANSFORMATION

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global exports, console */

"use strict";


if (typeof(process) !== 'undefined') {
    var char_player = require("./char_player.js");
}



// Note: 48 is the ASCII code for "0"

window.grammalecte["str_transform"] = {

    getNgrams: function (sWord, n=2) {
        let lNgrams = [];
        for (let i=0;  i <= sWord.length - n;  i++) {
            lNgrams.push(sWord.slice(i, i+n));
        }
        return lNgrams;
    },

    _xTransCharsForSpelling: new Map([
        ['ſ', 's'],  ['ﬃ', 'ffi'],  ['ﬄ', 'ffl'],  ['ﬀ', 'ff'],  ['ﬅ', 'ft'],  ['ﬁ', 'fi'],  ['ﬂ', 'fl'],  ['ﬆ', 'st'],
        ["'", '’']
    ]),

    spellingNormalization: function (sWord) {
        let sNewWord = "";
        for (let c of sWord) {
            sNewWord += this._xTransCharsForSpelling.gl_get(c, c);
        }
        return sNewWord.normalize("NFC");
    },

    _xTransCharsForSimplification: new Map([
        ['à', 'a'],  ['é', 'é'],  ['î', 'i'],  ['ô', 'o'],  ['û', 'u'],  ['ÿ', 'y'],
        ['â', 'a'],  ['è', 'é'],  ['ï', 'i'],  ['ö', 'o'],  ['ù', 'u'],  ['ŷ', 'y'],
        ['ä', 'a'],  ['ê', 'é'],  ['í', 'i'],  ['ó', 'o'],  ['ü', 'u'],  ['ý', 'y'],
        ['á', 'a'],  ['ë', 'é'],  ['ì', 'i'],  ['ò', 'o'],  ['ú', 'u'],  ['ỳ', 'y'],
        ['ā', 'a'],  ['ē', 'é'],  ['ī', 'i'],  ['ō', 'o'],  ['ū', 'u'],  ['ȳ', 'y'],
        ['ç', 'c'],  ['ñ', 'n'],
        ['œ', 'oe'], ['æ', 'ae'],
        ['ſ', 's'],  ['ﬃ', 'ffi'],  ['ﬄ', 'ffl'],  ['ﬀ', 'ff'],  ['ﬅ', 'ft'],  ['ﬁ', 'fi'],  ['ﬂ', 'fl'],  ['ﬆ', 'st'],
        ["⁰", "0"], ["¹", "1"], ["²", "2"], ["³", "3"], ["⁴", "4"], ["⁵", "5"], ["⁶", "6"], ["⁷", "7"], ["⁸", "8"], ["⁹", "9"],
        ["₀", "0"], ["₁", "1"], ["₂", "2"], ["₃", "3"], ["₄", "4"], ["₅", "5"], ["₆", "6"], ["₇", "7"], ["₈", "8"], ["₉", "9"],
        ["’", ""], ["'", ""], ["ʼ", ""], ["‘", ""], ["‛", ""], ["´", ""], ["`", ""], ["′", ""], ["‵", ""], ["՚", ""], ["ꞌ", ""], ["Ꞌ", ""],
        ["-", ""]
    ]),

    simplifyWord: function (sWord) {
        // word simplication before calculating distance between words
        sWord = sWord.toLowerCase();
        sWord = [...sWord].map(c => this._xTransCharsForSimplification.gl_get(c, c)).join('');
        let sNewWord = "";
        let i = 1;
        for (let c of sWord) {
            if (c != sWord.slice(i, i+1) || (c == 'e' && sWord.slice(i, i+2) != "ee")) {  // exception for <e> to avoid confusion between crée / créai
                sNewWord += c;
            }
            i++;
        }
        return sNewWord.replace(/eau/g, "o").replace(/au/g, "o").replace(/ai/g, "éi").replace(/ei/g, "é").replace(/ph/g, "f");
    },

    cleanWord: function (sWord) {
        // word clean for the user who make commun and preditive error help suggest
        // remove letters repeated more than 2 times
        return sWord.replace(/(.)\1{2,}/ig,'$1$1');
    },

    _xTransNumbersToExponent: new Map([
        ["0", "⁰"], ["1", "¹"], ["2", "²"], ["3", "³"], ["4", "⁴"], ["5", "⁵"], ["6", "⁶"], ["7", "⁷"], ["8", "⁸"], ["9", "⁹"]
    ]),

    numbersToExponent: function (sWord) {
        let sNewWord = "";
        for (let c of sWord) {
            sNewWord += this._xTransNumbersToExponent.gl_get(c, c);
        }
        return sNewWord;
    },

    longestCommonSubstring: function (string1, string2) {
        // https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring
        // untested

        // init max value
        let longestCommonSubstring = 0;
        // init 2D array with 0
        let table = [],
            len1 = string1.length,
            len2 = string2.length,
            row, col;
        for (row = 0; row <= len1; row++) {
            table[row] = [];
            for (col = 0; col <= len2; col++) {
                table[row][col] = 0;
            }
        }
        // fill table
        let i, j;
        for (i = 0;  i < len1;  i++) {
            for (j = 0;  j < len2;  j++) {
                if (string1[i] === string2[j]) {
                    if (table[i][j] === 0){
                        table[i+1][j+1] = 1;
                    } else {
                        table[i+1][j+1] = table[i][j] + 1;
                    }
                    if (table[i+1][j+1] > longestCommonSubstring) {
                        longestCommonSubstring = table[i+1][j+1];
                    }
                } else {
                    table[i+1][j+1] = 0;
                }
            }
        }
        return longestCommonSubstring;
    },

    distanceDamerauLevenshtein: function (s1, s2) {
        // distance of Damerau-Levenshtein between <s1> and <s2>
        // https://fr.wikipedia.org/wiki/Distance_de_Damerau-Levenshtein
        try {
            let nLen1 = s1.length;
            let nLen2 = s2.length;
            let matrix = [];
            for (let i = 0;  i <= nLen1+1;  i++) {
                matrix[i] = new Array(nLen2 + 2);
            }
            for (let i = 0;  i <= nLen1+1;  i++) {
                matrix[i][0] = i;
            }
            for (let j = 0;  j <= nLen2+1;  j++) {
                matrix[0][j] = j;
            }
            for (let i = 1;  i <= nLen1;  i++) {
                for (let j = 1;  j <= nLen2;  j++) {
                    //let nCost = (s1[i-1] === s2[j-1]) ? 0 : 1;
                    let nCost = char_player.distanceBetweenChars(s1[i-1], s2[j-1]);
                    matrix[i][j] = Math.min(
                        matrix[i-1][j] + 1,         // Deletion
                        matrix[i][j-1] + 1,         // Insertion
                        matrix[i-1][j-1] + nCost    // Substitution
                    );
                    if (i > 1 && j > 1 && s1[i] == s2[j-1] && s1[i-1] == s2[j]) {
                        matrix[i][j] = Math.min(matrix[i][j], matrix[i-2][j-2] + nCost);  // Transposition
                    }
                }
            }
            return matrix[nLen1][nLen2];
        }
        catch (e) {
            console.error(e);
        }
    },

    distanceJaroWinkler: function(a, b, boost = .666) {
        // https://github.com/thsig/jaro-winkler-JS
        //if (a == b) { return 1.0; }
        let a_len = a.length;
        let b_len = b.length;
        let a_flag = [];
        let b_flag = [];
        let search_range = Math.floor(Math.max(a_len, b_len) / 2) - 1;
        let minv = Math.min(a_len, b_len);

        // Looking only within the search range, count and flag the matched pairs.
        let Num_com = 0;
        let yl1 = b_len - 1;
        for (let i = 0; i < a_len; i++) {
          let lowlim = (i >= search_range) ? i - search_range : 0;
          let hilim  = ((i + search_range) <= yl1) ? (i + search_range) : yl1;
          for (let j = lowlim; j <= hilim; j++) {
            if (b_flag[j] !== 1 && a[j] === b[i]) {
              a_flag[j] = 1;
              b_flag[i] = 1;
              Num_com++;
              break;
            }
          }
        }

        // Return if no characters in common
        if (Num_com === 0) { return 0.0; }

        // Count the number of transpositions
        let k = 0;
        let N_trans = 0;
        for (let i = 0; i < a_len; i++) {
          if (a_flag[i] === 1) {
            let j;
            for (j = k; j < b_len; j++) {
              if (b_flag[j] === 1) {
                k = j + 1;
                break;
              }
            }
            if (a[i] !== b[j]) { N_trans++; }
          }
        }
        N_trans = Math.floor(N_trans / 2);

        // Adjust for similarities in nonmatched characters
        let N_simi = 0;
        let adjwt = char_player.oDistanceBetweenChars;
        if (minv > Num_com) {
          for (let i = 0; i < a_len; i++) {
            if (!a_flag[i]) {
              for (let j = 0; j < b_len; j++) {
                if (!b_flag[j]) {
                  if (adjwt[a[i]] && adjwt[a[i]][b[j]]) {
                    N_simi += adjwt[a[i]][b[j]];
                    b_flag[j] = 2;
                    break;
                  }
                }
              }
            }
          }
        }

        let Num_sim = (N_simi / 10.0) + Num_com;

        // Main weight computation
        let weight = Num_sim / a_len + Num_sim / b_len + (Num_com - N_trans) / Num_com;
        weight = weight / 3;

        // Continue to boost the weight if the strings are similar
        if (weight > boost) {
          // Adjust for having up to the first 4 characters in common
          let j = (minv >= 4) ? 4 : minv;
          let i;
          for (i = 0; (i < j) && a[i] === b[i]; i++) { }
          if (i) { weight += i * 0.1 * (1.0 - weight) };

          // Adjust for long strings.
          // After agreeing beginning chars, at least two more must agree
          // and the agreeing characters must be more than half of the
          // remaining characters.
          if (minv > 4 && Num_com > i + 1 && 2 * Num_com >= minv + i) {
            weight += (1 - weight) * ((Num_com - i - 1) / (a_len * b_len - i*2 + 2));
          }
        }

        return weight;
    },

    showDistance (s1, s2) {
        console.log(`Distance Jaro-Winkler: ${s1} / ${s2} = ${this.distanceJaroWinkler(s1, s2)})`);
        console.log(`Distance Damerau-Levenshtein: ${s1} / ${s2} = ${this.distanceDamerauLevenshtein(s1, s2)})`);
    },

    // Suffix only
    defineSuffixCode: function (sFlex, sStem) {
        /*
            Returns a string defining how to get stem from flexion
                "n(sfx)"
            with n: a char with numeric meaning, "0" = 0, "1" = 1, ... ":" = 10, etc. (See ASCII table.) Says how many letters to strip from flexion.
                 sfx [optional]: string to add on flexion
            Examples:
                "0": strips nothing, adds nothing
                "1er": strips 1 letter, adds "er"
                "2": strips 2 letters, adds nothing
        */
        if (sFlex == sStem) {
            return "0";
        }
        let jSfx = 0;
        for (let i = 0;  i < Math.min(sFlex.length, sStem.length);  i++) {
            if (sFlex[i] !== sStem[i]) {
                break;
            }
            jSfx += 1;
        }
        return String.fromCharCode(sFlex.length-jSfx+48) + sStem.slice(jSfx);
    },

    changeWordWithSuffixCode: function (sWord, sSfxCode) {
        if (sSfxCode == "0") {
            return sWord;
        }
        return sSfxCode[0] == '0' ? sWord + sSfxCode.slice(1) : sWord.slice(0, -(sSfxCode.charCodeAt(0)-48)) + sSfxCode.slice(1);
    },

    // Prefix and suffix
    defineAffixCode: function (sFlex, sStem) {
        /*
            UNTESTED!
            Returns a string defining how to get stem from flexion. Examples:
                "0" if stem = flexion
                "stem" if no common substring
                "n(pfx)/m(sfx)"
            with n and m: chars with numeric meaning, "0" = 0, "1" = 1, ... ":" = 10, etc. (See ASCII table.) Says how many letters to strip from flexion.
                pfx [optional]: string to add before the flexion
                sfx [optional]: string to add after the flexion
        */
        if (sFlex == sStem) {
            return "0";
        }
        // is stem a substring of flexion?
        let n = sFlex.indexOf(sStem);
        if (n >= 0) {
            return String.fromCharCode(n+48) + "/" + String.fromCharCode(sFlex.length-(sStem.length+n)+48);
        }
        // no, so we are looking for common substring
        let sSubs = this.longestCommonSubstring(sFlex, sStem);
        if (sSubs.length > 1) {
            let iPos = sStem.indexOf(sSubs);
            let sPfx = sStem.slice(0, iPos);
            let sSfx = sStem.slice(iPos+sSubs.length);
            let n = sFlex.indexOf(sSubs);
            let m = sFlex.length - (sSubs.length+n);
            return String.fromCharCode(n+48) + sPfx + "/" + String.fromCharCode(m+48) + sSfx;
        }
        return sStem;
    },

    changeWordWithAffixCode: function (sWord, sAffCode) {
        if (sAffCode == "0") {
            return sWord;
        }
        if (!sAffCode.includes("/")) {
            return sAffCode;
        }
        let [sPfxCode, sSfxCode] = sAffCode.split('/');
        sWord = sPfxCode.slice(1) + sWord.slice(sPfxCode.charCodeAt(0)-48);
        return sSfxCode[0] == '0' ? sWord + sSfxCode.slice(1) : sWord.slice(0, -(sSfxCode.charCodeAt(0)-48)) + sSfxCode.slice(1);
    }
};


if (typeof(exports) !== 'undefined') {
    exports.simplifyWord = str_transform.simplifyWord;
    exports.numbersToExponent = str_transform.numbersToExponent;
    exports.spellingNormalization = str_transform.spellingNormalization;
    exports.longestCommonSubstring = str_transform.longestCommonSubstring;
    exports.distanceDamerauLevenshtein = str_transform.distanceDamerauLevenshtein;
    exports.distanceJaroWinkler = str_transform.distanceJaroWinkler;
    exports.showDistance = str_transform.showDistance;
    exports.changeWordWithSuffixCode = str_transform.changeWordWithSuffixCode;
    exports.changeWordWithAffixCode = str_transform.changeWordWithAffixCode;
    exports.defineAffixCode = str_transform.defineAffixCode;
    exports.defineSuffixCode = str_transform.defineSuffixCode;
}
