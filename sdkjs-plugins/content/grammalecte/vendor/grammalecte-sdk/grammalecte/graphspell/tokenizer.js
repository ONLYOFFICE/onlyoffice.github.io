// JavaScript
// Very simple tokenizer

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/*global require, exports, console*/

"use strict";


const aTkzPatterns = {
    // All regexps must start with ^.
    "default":
        [
            [/^[   \t]+/, 'SPACE'],
            [/^\/(?:~|bin|boot|dev|etc|home|lib|mnt|opt|root|sbin|tmp|usr|var|Bureau|Documents|Images|Musique|Public|Téléchargements|Vidéos)(?:\/[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.()-]+)*/, 'FOLDERUNIX'],
            [/^[a-zA-Z]:\\(?:Program Files(?: \(x86\)|)|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ.()]+)(?:\\[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.()-]+)*/, 'FOLDERWIN'],
            [/^[,.;:!?…«»“”‘’"(){}\[\]·–—¿¡]/, 'PUNC'],
            [/^[A-Z][.][A-Z][.](?:[A-Z][.])*/, 'WORD_ACRONYM'],
            [/^(?:https?:\/\/|www[.]|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]+[@.][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]{2,}[@.])[a-zA-Z0-9][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.\/?&!%=+*"'@$#-]+/, 'LINK'],
            [/^[#@][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]+/, 'TAG'],
            [/^<[a-zA-Z]+.*?>|^<\/[a-zA-Z]+ *>/, 'HTML'],
            [/^\[\/?[a-zA-Z]+\]/, 'PSEUDOHTML'],
            [/^&\w+;(?:\w+;|)/, 'HTMLENTITY'],
            [/^\d\d?[h:]\d\d(?:[m:]\d\ds?|)\b/, 'HOUR'],
            [/^\d+(?:[.,]\d+|)/, 'NUM'],
            [/^[&%‰€$+±=*/<>⩾⩽#|×¥£§¢฿¬÷@-]/, 'SIGN'],
            [/^[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆᴀ-ᶿ\u0300-\u036fᵉʳˢⁿᵈ]+(?:[’'`-][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆᴀ-ᶿ\u0300-\u036fᵉʳˢⁿᵈ]+)*/, 'WORD'],
            [/^_+/, 'UNDERSCORE'],
            [/^[\u2600-\u26ff\u2700-\u27bf\u1f650-\u1f67f\u1f700-\u1f77f\u1f780-\u1f7ff\u1f800-\u1f8ff]/, 'SYMBOL'],
            [/^[\u1f300-\u1f5ff\u1f600-\u1f64f\u1f680-\u1f6ff\u1f900-\u1f9ff]+/u, "EMOJI"],
            [/^\S/, 'OTHER']
        ],
    "fr":
        [
            [/^[   \t]+/, 'SPACE'],
            [/^\/(?:~|bin|boot|dev|etc|home|lib|mnt|opt|root|sbin|tmp|usr|var|Bureau|Documents|Images|Musique|Public|Téléchargements|Vidéos)(?:\/[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.()-]+)*/, 'FOLDERUNIX'],
            [/^[a-zA-Z]:\\(?:Program Files(?: \(x86\)|)|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ.()]+)(?:\\[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.()-]+)*/, 'FOLDERWIN'],
            [/^[,.;:!?…«»“”‘’"(){}\[\]·–—¿¡]/, 'PUNC'],
            [/^[A-Z][.][A-Z][.](?:[A-Z][.])*/, 'WORD_ACRONYM'],
            [/^(?:https?:\/\/|www[.]|[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]+[@.][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]{2,}[@.])[a-zA-Z0-9][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_.\/?&!%=+*"'@$#-]+/, 'LINK'],
            [/^[#@][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆ_-]+/, 'TAG'],
            [/^<[a-zA-Z]+.*?>|^<\/[a-zA-Z]+ *>/, 'HTML'],
            [/^\[\/?[a-zA-Z]+\]/, 'PSEUDOHTML'],
            [/^&\w+;(?:\w+;|)/, 'HTMLENTITY'],
            [/^(?:l|d|n|m|t|s|j|c|ç|lorsqu|puisqu|jusqu|quoiqu|qu|presqu|quelqu)['’ʼ‘‛´`′‵՚ꞌꞋ]/i, 'WORDELD'],
            [/^\d\d?[h:]\d\d(?:[m:]\d\ds?|)\b/, 'HOUR'],
            [/^\d+(?:ers?\b|res?\b|è[rm]es?\b|i[èe][mr]es?\b|de?s?\b|nde?s?\b|ès?\b|es?\b|ᵉʳˢ?|ʳᵉˢ?|ᵈᵉ?ˢ?|ⁿᵈᵉ?ˢ?|ᵉˢ?)/, 'WORDORD'],
            [/^\d+(?:[.,]\d+|)/, 'NUM'],
            [/^[&%‰€$+±=*/<>⩾⩽#|×¥£§¢฿¬÷@-]/, 'SIGN'],
            [/^[a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆᴀ-ᶿ\u0300-\u036fᵉʳˢⁿᵈ]+(?:[’'`-][a-zA-Zà-öÀ-Ö0-9ø-ÿØ-ßĀ-ʯﬀ-ﬆᴀ-ᶿ\u0300-\u036fᵉʳˢⁿᵈ]+)*/, 'WORD'],
            [/^_+/, 'UNDERSCORE'],
            [/^[\u2600-\u26ff\u2700-\u27bf\u1f650-\u1f67f\u1f700-\u1f77f\u1f780-\u1f7ff\u1f800-\u1f8ff]/, 'SYMBOL'],
            [/^[\u1f300-\u1f5ff\u1f600-\u1f64f\u1f680-\u1f6ff\u1f900-\u1f9ff]+/u, "EMOJI"],
            [/^\S/u, 'OTHER'],
        ]
};


class Tokenizer {

    constructor (sLang) {
        this.sLang = sLang;
        if (!aTkzPatterns.hasOwnProperty(sLang)) {
            this.sLang = "default";
        }
        this.aRules = aTkzPatterns[this.sLang];
    }

    * genTokens (sText, bStartEndToken=false, bWithSpaces=false) {
        let m;
        let iToken = 0;
        let iNext = 0;
        let iEnd = sText.length;
        if (bStartEndToken) {
            yield { "i": 0, "sType": "INFO", "sValue": "<start>", "nStart": 0, "nEnd": 0, "lMorph": ["<start>"] };
        }
        while (sText) {
            let iCut = 1;
            for (let [zRegex, sType] of this.aRules) {
                if (sType !== "SPACE"  ||  bWithSpaces) {
                    try {
                        if ((m = zRegex.exec(sText)) !== null) {
                            iToken += 1;
                            yield { "i": iToken, "sType": sType, "sValue": m[0], "nStart": iNext, "nEnd": iNext + m[0].length };  // m[0].normalize("NFC") not usefull at the moment
                            iCut = m[0].length;
                            break;
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
            iNext += iCut;
            sText = sText.slice(iCut);
        }
        if (bStartEndToken) {
            yield { "i": iToken+1, "sType": "INFO", "sValue": "<end>", "nStart": iEnd, "nEnd": iEnd, "lMorph": ["<end>"] };
        }
    }
}


if (typeof(exports) !== 'undefined') {
    exports.Tokenizer = Tokenizer;
}
