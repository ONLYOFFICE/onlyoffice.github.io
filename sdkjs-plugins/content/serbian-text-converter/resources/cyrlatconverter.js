(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.cyrlatconverter = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Serbian dictionary (loaded async)
    var serbianDict = null;
    var dictLoading = false;
    var dictLoadCallbacks = [];

    var CYR_LOWER = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'đ', 'е': 'e', 'ж': 'ž',
        'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n',
        'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ћ': 'ć', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š'
    };

    var CYR_UPPER = {};
    var LAT_TO_CYR = {};

    for (var cyr in CYR_LOWER) {
        if (!Object.prototype.hasOwnProperty.call(CYR_LOWER, cyr)) continue;
        var lat = CYR_LOWER[cyr];
        CYR_UPPER[cyr.toUpperCase()] = lat.charAt(0).toUpperCase() + lat.slice(1);
        if (lat.length === 1) {
            LAT_TO_CYR[lat] = cyr;
            LAT_TO_CYR[lat.toUpperCase()] = cyr.toUpperCase();
        }
    }

    // Unicode ligatures for digraphs, e.g. from older documents and font mapping.
    var LIGATURES = {
        'Ǆ': 'Џ', 'ǅ': 'Џ', 'ǆ': 'џ',
        'Ǉ': 'Љ', 'ǈ': 'Љ', 'ǉ': 'љ',
        'Ǌ': 'Њ', 'ǋ': 'Њ', 'ǌ': 'њ'
    };

    for (var lig in LIGATURES) {
        if (Object.prototype.hasOwnProperty.call(LIGATURES, lig)) LAT_TO_CYR[lig] = LIGATURES[lig];
    }

    var DIGRAPHS = { 'lj': 'љ', 'nj': 'њ', 'dž': 'џ' };
    var ASCII_DIGRAPHS = { 'dj': 'ђ', 'dz': 'џ' };

    // Words where letters don't merge into a digraph (nad-živeti, in-jekcija).
    var DIGRAPH_EXCEPTIONS = [
        'adjektiv', 'adjunkt', 'anjon', 'budzašto', 'injekc', 'injekt', 'injicir',
        'konjug', 'konjunk', 'lindzi', 'nadjača', 'nadjaha', 'nadzemn', 'nadzida',
        'nadzir', 'nadzor', 'nadzv', 'nadždrel', 'nadžet', 'nadživ', 'nadžnje',
        'nadžup', 'odjav', 'odjaha', 'odjaš', 'odjeb', 'odjedanput', 'odjedared',
        'odjednom', 'odjedri', 'odjek', 'odjeci', 'odjezdi', 'odjur', 'odziv',
        'odzvanja', 'odzvoni', 'odžali', 'odžari', 'odžive', 'odživlj', 'odžubor',
        'odžvaka', 'podjamči', 'podjar', 'podjedn', 'podjezič', 'podzadat',
        'podzakon', 'podzemlj', 'podzemn', 'podzida', 'podznak', 'podznaci',
        'podžanr', 'predjel', 'predzadnj', 'predznak', 'predznanj', 'predznaci',
        'predželuda', 'predživot', 'razdje', 'tanjug', 'vanjezič'
    ];

    // Fallback list: acronyms + brands that exist in Serbian dict but should stay Latin
    var KEEP_WORDS = [
        'api', 'cpu', 'css', 'gpu', 'hdd', 'html', 'http', 'https', 'ide', 'ios',
        'json', 'pdf', 'php', 'ram', 'sdk', 'sql', 'ssd', 'url', 'usb', 'xml',
        'lg', 'hp', 'ibm', 'bmw', 'vw', 'kfc', 'dm', 'jbl', 'asus', 'msi', 'amd',
        'htc', 'zte', 'acer', 'dell', 'eset', 'sap', 'ups', 'dhl', 'lidl', 'ikea',
        'adidas', 'lego', 'microsoft', 'nike', 'nokia', 'tesla'
    ];

    var LAT_LETTERS = 'A-Za-z\u010C\u010D\u0106\u0107\u0110\u0111\u0160\u0161\u017D\u017E\u01C4-\u01CC';
    var TOKEN_RE = new RegExp('([0-9_' + LAT_LETTERS + '\u0400-\u04FF-]+)');
    var CYR_COUNT_RE = /[\u0400-\u04FF]/g;
    var LAT_COUNT_RE = new RegExp('[' + LAT_LETTERS + ']', 'g');
    var LAT_LETTER_RE = new RegExp('[' + LAT_LETTERS + ']');
    var LAT_UPPER_RE = new RegExp('[A-Z\u010C\u0106\u0110\u0160\u017D]');
    var FOREIGN_RE = /[qwxyQWXY]/;
    var CAMEL_RE = /[a-z\u010D\u0107\u017E\u0161\u0111][A-Z\u010C\u0106\u017D\u0160\u0110]|[A-Z\u010C\u0106\u017D\u0160\u0110]{2,}[a-z\u010D\u0107\u017E\u0161\u0111]/;
    var ENGLISH_CLUSTER_RE = /ck|ph|wh|tion|sion|ough|ght|igh|wr/i;

    var KEEP_SET = {};
    for (var ki = 0; ki < KEEP_WORDS.length; ki++) {
        KEEP_SET[KEEP_WORDS[ki]] = true;
    }

    var defaults = { ascii: false, keepForeign: true };

    // Default options
    function withDefaults(options) {
        var merged = { ascii: defaults.ascii, keepForeign: defaults.keepForeign };
        if (options) {
            if (typeof options.ascii !== 'undefined') merged.ascii = !!options.ascii;
            if (typeof options.keepForeign !== 'undefined') merged.keepForeign = !!options.keepForeign;
        }
        return merged;
    }

    // Active digraphs
    function activeDigraphs(options) {
        if (!options.ascii) return DIGRAPHS;
        var all = { 'lj': DIGRAPHS.lj, 'nj': DIGRAPHS.nj, 'dž': DIGRAPHS['dž'] };
        for (var pair in ASCII_DIGRAPHS) {
            if (Object.prototype.hasOwnProperty.call(ASCII_DIGRAPHS, pair)) all[pair] = ASCII_DIGRAPHS[pair];
        }
        return all;
    }

    
     //Cyrillic digraph in uppercase: Живот -> Život 
    function cyrDigraphCase(pair, text, index) {
        var next = text.charAt(index + 1);
        var prev = index > 0 ? text.charAt(index - 1) : '';
        if (CYR_UPPER[next]) return pair.toUpperCase();
        if (CYR_LOWER[next]) return pair;
        return CYR_UPPER[prev] ? pair.toUpperCase() : pair;
    }

    // Convert Cyrillic to Latin
    function toLatin(text) {
        if (!text) return text;
        var out = '';
        for (var i = 0; i < text.length; i++) {
            var ch = text.charAt(i);
            if (CYR_LOWER[ch]) {
                out += CYR_LOWER[ch];
            } else if (CYR_UPPER[ch]) {
                var mapped = CYR_UPPER[ch];
                out += mapped.length > 1 ? cyrDigraphCase(mapped, text, i) : mapped;
            } else {
                out += ch;
            }
        }
        return out;
    }
    
    // Find the first digraph index in a word
    function firstDigraphIndex(word, digraphs) {
        for (var i = 0; i < word.length - 1; i++) {
            if (digraphs[word.substr(i, 2)]) return i;
        }
        return -1;
    }

    /**
     * Positions where digraph merging should be skipped.
     * Only the first digraph from the base is blocked, so "odživlj" will split dž,
     * but keep lj as a digraph ("odživljavati" -> "одживљавати").
     */
    function blockedPositions(lowerWord, digraphs) {
        var blocked = {};
        for (var i = 0; i < DIGRAPH_EXCEPTIONS.length; i++) {
            var base = DIGRAPH_EXCEPTIONS[i];
            if (lowerWord.indexOf(base) !== 0) continue;
            var at = firstDigraphIndex(base, digraphs);
            if (at !== -1) blocked[at] = true;
        }
        return blocked;
    }

    function isKeptWord(word) {
        // Fast heuristics (no dictionary needed)
        if (FOREIGN_RE.test(word)) return true;
        if (CAMEL_RE.test(word)) return true;
        if (ENGLISH_CLUSTER_RE.test(word)) return true;

        var lower = word.toLowerCase();

        // Fallback list for acronyms/short words
        if (KEEP_SET[lower]) return true;

        // Check hyphenated words
        var parts = lower.split('-');
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] && isKeptWord(parts[i])) return true;
            }
        }

        // The word list decides the remaining words. Until it is ready, keep the
        // word unchanged: guessing would turn Google into Гоогле, then leave it
        // Latin once the same option has a loaded list.
        if (serbianDict === null) return true;

        // Check if any part of the word (for compound words with digits)
        var baseWord = lower.replace(/[0-9]+$/g, '');
        if (!serbianDict.has(baseWord) && !serbianDict.has(lower)) {
            return true; // Not in Serbian dictionary = foreign
        }

        return false;
    }

    // c/s/z + caron and c + acute are č/š/ž/ć. Compose only those pairs so a
    // different mark, and the rest of the selection, stay as written.
    function composeSerbianLetters(text) {
        return text.replace(/[CcSsZz]\u030C|[Cc]\u0301/g, function (pair) {
            return pair.normalize('NFC');
        });
    }
    
    // Convert a word to Cyrillic
    function wordToCyrillic(word, options, digraphs) {
        if (options.keepForeign && isKeptWord(word)) return word;
        var blocked = blockedPositions(word.toLowerCase(), digraphs);
        var out = '';
        for (var i = 0; i < word.length; i++) {
            var ch = word.charAt(i);
            if (i < word.length - 1 && !blocked[i]) {
                var mapped = digraphs[(ch + word.charAt(i + 1)).toLowerCase()];
                if (mapped) {
                    out += LAT_UPPER_RE.test(ch) ? mapped.toUpperCase() : mapped;
                    i++;
                    continue;
                }
            }
            out += LAT_TO_CYR[ch] || ch;
        }
        return out;
    }
    
    // Convert text to Cyrillic
    function toCyrillic(text, options) {
        if (!text) return text;
        text = composeSerbianLetters(text);
        var opts = withDefaults(options);
        var digraphs = activeDigraphs(opts);
        var tokens = text.split(TOKEN_RE);
        for (var i = 1; i < tokens.length; i += 2) {
            tokens[i] = wordToCyrillic(tokens[i], opts, digraphs);
        }
        return tokens.join('');
    }

    // Count matches of a regex in a text
    function countMatches(text, regex) {
        var matches = text.match(regex);
        return matches ? matches.length : 0;
    }

    // Foreign words stay Latin on purpose.
    function textWithoutKeptWords(text) {
        var composed = composeSerbianLetters(String(text));
        var tokens = composed.split(TOKEN_RE);
        for (var i = 1; i < tokens.length; i += 2) {
            var word = tokens[i];
            if (CYR_COUNT_RE.test(word)) {
                CYR_COUNT_RE.lastIndex = 0;
                continue;
            }
            CYR_COUNT_RE.lastIndex = 0;
            if (isKeptWord(word)) tokens[i] = '';
        }
        return tokens.join('');
    }
   
    // Detect the script of the text
    function detectScript(text, options) {
        if (!text) return 'unknown';
        var sample = text;
        if (options && options.keepForeign) sample = textWithoutKeptWords(text);
        var cyrillic = countMatches(sample, CYR_COUNT_RE);
        var latin = countMatches(sample, LAT_COUNT_RE);
        if (cyrillic === 0 && latin === 0) return 'unknown';
        return cyrillic >= latin ? 'cyrillic' : 'latin';
    }

    // Auto convert the text to the appropriate script
    function autoConvert(text, options) {
        var script = detectScript(text, options);
        if (script === 'cyrillic') return toLatin(text);
        if (script === 'latin') return toCyrillic(text, options);
        return text;
    }

    /**
     * Load Serbian dictionary for improved foreign word detection.
     * @param {string} [dictPath] - Path to sr-Latn.dic file
     * @param {function} [callback] - Optional callback(error, success)
     */
    function loadDictionary(dictPath, callback) {
        if (serbianDict !== null) {
            if (callback) callback(null, true);
            return;
        }

        if (dictLoading) {
            if (callback) dictLoadCallbacks.push(callback);
            return;
        }

        dictLoading = true;
        if (callback) dictLoadCallbacks.push(callback);

        var path = dictPath || 'resources/dict/sr-Latn.dic';

        // Node.js (check first since modern Node has global fetch)
        if (typeof require === 'function' && typeof process !== 'undefined' && process.versions && process.versions.node) {
            try {
                var fs = require('fs');
                var nodePath = require('path');
                // Try relative to cwd first
                var fullPath = nodePath.resolve(process.cwd(), path);
                fs.readFile(fullPath, 'utf8', function(err, text) {
                    if (err) {
                        console.warn('cyrlatconverter: Could not load dictionary:', err.message);
                        notifyCallbacks(err, false);
                        return;
                    }
                    parseDictionary(text);
                    notifyCallbacks(null, true);
                });
            } catch (e) {
                console.warn('cyrlatconverter: Could not load dictionary:', e.message);
                notifyCallbacks(e, false);
            }
        }
        // Browser fetch
        else if (typeof fetch === 'function') {
            fetch(path)
                .then(function(response) {
                    if (!response.ok) throw new Error('Dictionary not found: ' + path);
                    return response.text();
                })
                .then(function(text) {
                    parseDictionary(text);
                    notifyCallbacks(null, true);
                })
                .catch(function(err) {
                    console.warn('cyrlatconverter: Could not load dictionary:', err.message);
                    notifyCallbacks(err, false);
                });
        } else {
            notifyCallbacks(new Error('No fetch or fs available'), false);
        }
    }
    
    // Parse the dictionary file
    function parseDictionary(text) {
        var lines = text.split(/\r?\n/);
        serbianDict = new Set();
        // Skip first line (word count) and empty lines
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i].trim().toLowerCase();
            if (line) serbianDict.add(line);
        }
    }

    // Notify the callbacks
    function notifyCallbacks(err, success) {
        dictLoading = false;
        var cbs = dictLoadCallbacks;
        dictLoadCallbacks = [];
        for (var i = 0; i < cbs.length; i++) {
            try { cbs[i](err, success); } catch (e) {}
        }
    }

    // Check if the dictionary is loaded
    function isDictionaryLoaded() {
        return serbianDict !== null;
    }

    return {
        toLatin: toLatin,
        toCyrillic: toCyrillic,
        detectScript: detectScript,
        autoConvert: autoConvert,
        loadDictionary: loadDictionary,
        isDictionaryLoaded: isDictionaryLoaded,
        defaults: defaults,
        exceptions: DIGRAPH_EXCEPTIONS,
        keepWords: KEEP_WORDS
    };
}));
