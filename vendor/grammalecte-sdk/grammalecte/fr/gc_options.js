// Grammar checker options manager

/* jshint esversion:6 */
/* jslint esversion:6 */
/* global exports */


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



window.grammalecte["gc_options"] = {

    dOptions: new Map(),

    sAppContext: "JavaScript",

    load: function (sContext="JavaScript") {
        this.sAppContext = sContext;
        this.dOptions = this.getDefaultOptions(sContext);
    },

    setOption: function (sOpt, bVal) {
        if (this.dOptions.has(sOpt)) {
            this.dOptions.set(sOpt, bVal);
        }
    },

    setOptions: function (dOpt) {
        this.dOptions.gl_updateOnlyExistingKeys(dOpt);
    },

    getOptions: function () {
        return this.dOptions.gl_shallowCopy();
    },

    resetOptions: function () {
        this.dOptions = this.getDefaultOptions(this._sAppContext);
    },

    getDefaultOptions: function (sContext="") {
        if (!sContext) {
            sContext = this.sAppContext;
        }
        if (this.oDefaultOpt.hasOwnProperty(sContext)) {
            return this.oDefaultOpt[sContext].gl_shallowCopy();
        }
        return this.oDefaultOpt["JavaScript"].gl_shallowCopy();
    },

    getOptionLabels: function (sLang="${sLang}") {
        if (this.oOptLabel.hasOwnProperty(sLang)) {
            return this.oOptLabel[sLang];
        }
        return this.oOptLabel["{$sLang}"];
    },

    getOptionsColors: function (sTheme="Default", sColorType="aRGB") {
        let oOptColor = (this.oOptColor.hasOwnProperty(sTheme)) ? this.oOptColor[sTheme] : this.oOptColor["Default"];
        let oColorType = (this.oColorType.hasOwnProperty(sColorType)) ? this.oColorType[sColorType] : this.oColorType["aRGB"];
        let oColor = {};
        try {
            for (let [sOpt, sColor] of Object.entries(oOptColor)) {
                oColor[sOpt] = oColorType[sColor];
            }
            return oColor;
        }
        catch (e) {
            console.error(e);
            return {};
        }
    },

    lStructOpt: [['basic', [['typo', 'apos', 'eepi'], ['esp', 'tab'], ['nbsp', 'unit'], ['tu', 'maj', 'minis'], ['num', 'nf'], ['virg', 'poncfin'], ['ocr', 'chim'], ['liga', 'mapos']]], ['gramm', [['conf', 'loc', 'gn']]], ['verbs', [['infi', 'conj', 'ppas'], ['imp', 'inte', 'vmode']]], ['style', [['bs', 'pleo'], ['eleu', 'neg'], ['redon1', 'redon2']]], ['misc', [['date', 'mc']]], ['debug', [['idrule']]]],

    oDefaultOpt: {
        "JavaScript": new Map ([["typo", true], ["apos", true], ["eepi", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["minis", true], ["num", true], ["virg", true], ["poncfin", false], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", true], ["ocr", false], ["conf", true], ["loc", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["eleu", true], ["neg", false], ["redon1", false], ["redon2", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false], ["md", true]]),
        "Firefox": new Map ([["typo", true], ["apos", true], ["eepi", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["minis", true], ["num", true], ["virg", true], ["poncfin", false], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", true], ["ocr", false], ["conf", true], ["loc", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["eleu", true], ["neg", false], ["redon1", false], ["redon2", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false], ["md", true]]),
        "Thunderbird": new Map ([["typo", true], ["apos", true], ["eepi", true], ["esp", false], ["tab", false], ["nbsp", false], ["tu", true], ["maj", true], ["minis", true], ["num", true], ["virg", true], ["poncfin", false], ["unit", false], ["nf", true], ["liga", false], ["mapos", false], ["chim", true], ["ocr", false], ["conf", true], ["loc", true], ["gn", true], ["infi", true], ["conj", true], ["ppas", true], ["imp", true], ["inte", true], ["vmode", true], ["bs", true], ["pleo", true], ["eleu", true], ["neg", false], ["redon1", false], ["redon2", false], ["date", true], ["mc", false], ["idrule", false], ["html", true], ["latex", false], ["md", false]]),
    },

    oColorType: {'aHSL': {'orange': [30, 70, 50], 'orange2': [40, 90, 50], 'violet': [270, 45, 35], 'bleu': [210, 50, 50], 'bleupr': [240, 40, 60], 'fuchsia': [300, 30, 40], 'cyan': [180, 50, 40], 'grey': [0, 50, 50], 'orange_vif': [30, 100, 60], 'jaune_vif': [55, 100, 40], 'violet_vif': [270, 100, 70], 'bleu_vif': [210, 100, 50], 'vert_vif': [120, 100, 40], 'cyan_vif': [180, 100, 40], 'bleupr_clair': [240, 70, 70]}, 'sCSS': {'orange': 'hsl(30, 70%, 50%)', 'orange2': 'hsl(40, 90%, 50%)', 'violet': 'hsl(270, 45%, 35%)', 'bleu': 'hsl(210, 50%, 50%)', 'bleupr': 'hsl(240, 40%, 60%)', 'fuchsia': 'hsl(300, 30%, 40%)', 'cyan': 'hsl(180, 50%, 40%)', 'grey': 'hsl(0, 50%, 50%)', 'orange_vif': 'hsl(30, 100%, 60%)', 'jaune_vif': 'hsl(55, 100%, 40%)', 'violet_vif': 'hsl(270, 100%, 70%)', 'bleu_vif': 'hsl(210, 100%, 50%)', 'vert_vif': 'hsl(120, 100%, 40%)', 'cyan_vif': 'hsl(180, 100%, 40%)', 'bleupr_clair': 'hsl(240, 70%, 70%)'}, 'aRGB': {'orange': [217, 128, 38], 'orange2': [242, 166, 13], 'violet': [89, 49, 129], 'bleu': [64, 127, 191], 'bleupr': [112, 112, 194], 'fuchsia': [133, 71, 133], 'cyan': [51, 153, 153], 'grey': [191, 64, 64], 'orange_vif': [255, 153, 51], 'jaune_vif': [204, 187, 0], 'violet_vif': [178, 102, 255], 'bleu_vif': [0, 127, 255], 'vert_vif': [0, 204, 0], 'cyan_vif': [0, 204, 204], 'bleupr_clair': [125, 125, 232]}, 'nInt': {'orange': 14254118, 'orange2': 15902221, 'violet': 5845377, 'bleu': 4227007, 'bleupr': 7368898, 'fuchsia': 8734597, 'cyan': 3381657, 'grey': 12533824, 'orange_vif': 16750899, 'jaune_vif': 13417216, 'violet_vif': 11691775, 'bleu_vif': 32767, 'vert_vif': 52224, 'cyan_vif': 52428, 'bleupr_clair': 8224232}},

    oOptColor: {'Default': {'typo': 'orange', 'apos': 'orange2', 'eepi': 'orange2', 'esp': 'orange', 'tab': 'orange', 'nbsp': 'orange', 'tu': 'orange', 'maj': 'orange', 'minis': 'orange', 'num': 'orange', 'virg': 'orange', 'poncfin': 'orange', 'unit': 'orange', 'nf': 'orange', 'liga': 'orange', 'mapos': 'orange', 'chim': 'orange', 'ocr': 'bleupr', 'conf': 'violet', 'loc': 'violet', 'gn': 'bleu', 'infi': 'fuchsia', 'conj': 'fuchsia', 'ppas': 'fuchsia', 'imp': 'fuchsia', 'inte': 'fuchsia', 'vmode': 'fuchsia', 'bs': 'cyan', 'pleo': 'cyan', 'eleu': 'cyan', 'neg': 'cyan', 'redon1': 'cyan', 'redon2': 'cyan', 'date': 'cyan', 'mc': 'cyan'}, 'Writer': {'typo': 'orange_vif', 'apos': 'jaune_vif', 'eepi': 'jaune_vif', 'esp': 'orange_vif', 'tab': 'orange_vif', 'nbsp': 'orange_vif', 'tu': 'orange_vif', 'maj': 'orange_vif', 'minis': 'orange_vif', 'num': 'orange_vif', 'virg': 'orange_vif', 'poncfin': 'orange_vif', 'unit': 'orange_vif', 'nf': 'orange_vif', 'liga': 'orange_vif', 'mapos': 'orange_vif', 'chim': 'orange_vif', 'ocr': 'bleupr_clair', 'conf': 'violet_vif', 'loc': 'violet_vif', 'gn': 'bleu_vif', 'infi': 'vert_vif', 'conj': 'vert_vif', 'ppas': 'vert_vif', 'imp': 'vert_vif', 'inte': 'vert_vif', 'vmode': 'vert_vif', 'bs': 'cyan_vif', 'pleo': 'cyan_vif', 'eleu': 'cyan_vif', 'neg': 'cyan_vif', 'redon1': 'cyan_vif', 'redon2': 'cyan_vif', 'date': 'cyan_vif', 'mc': 'cyan_vif'}},

    oOptLabel: {'fr': {'__optiontitle__': 'Grammalecte (Français)', 'basic': ['Typographie', ''], 'typo': ['Signes typographiques', ''], 'apos': ['Apostrophe typographique', 'Correction des apostrophes droites. Automatisme possible dans le menu Outils > Options d’autocorrection > Options linguistiques > Guillemets simples > Remplacer (à cocher)'], 'eepi': ['Écriture épicène', 'Normalisation de l’écriture épicène avec points médians.'], 'esp': ['Espaces surnuméraires', 'Signale les espaces inutiles entre les mots, en début et en fin de ligne.'], 'tab': ['Tabulations surnuméraires', 'Signale les tabulations inutiles en début et en fin de ligne.'], 'nbsp': ['Espaces insécables', 'Vérifie les espaces insécables avec les ponctuations «\xa0!\xa0?\xa0:\xa0;\xa0» (à désactiver si vous utilisez une police Graphite)'], 'maj': ['Majuscules', 'Vérifie l’utilisation des majuscules et des minuscules (par exemple, «\xa0la raison d’État\xa0», «\xa0les Européens\xa0»).'], 'minis': ['Majuscules pour ministères', 'Majuscules pour les intitulés des ministères.'], 'virg': ['Virgules', 'Virgules manquantes avant “mais”, “car” et “etc.”.'], 'poncfin': ['Ponctuation finale [!]', 'Vérifie s’il manque une ponctuation finale au paragraphe (seulement pour les paragraphes constitués de plusieurs phrases).'], 'tu': ['Traits d’union et soudures', 'Cherche les traits d’union manquants ou inutiles.'], 'num': ['Nombres', 'Espaces insécables sur les grands nombres (> 10 000). Vérifie la présence de «\xa0O\xa0» au lieu de «\xa00\xa0».'], 'unit': ['Espaces insécables avant unités de mesure', ''], 'nf': ['Normes françaises', ''], 'liga': ['Signaler ligatures typographiques', 'Ligatures de fi, fl, ff, ffi, ffl, ft, st.'], 'mapos': ['Apostrophe manquante après lettres isolées [!]', 'Apostrophe manquante après les lettres l d s n c j m t ç. Cette option sert surtout à repérer les défauts de numérisation des textes et est déconseillée pour les textes scientifiques.'], 'chim': ['Chimie', 'Typographie des composés chimiques (H₂O, CO₂, etc.).'], 'ocr': ['Erreurs de numérisation (OCR) [!]', 'Erreurs de reconnaissance optique des caractères. Beaucoup de faux positifs.'], 'gramm': ['Noms et adjectifs', ''], 'conf': ['Confusions et faux-amis', 'Cherche des erreurs souvent dues à l’homonymie (par exemple, les confusions entre «\xa0faîte\xa0» et «\xa0faite\xa0»).'], 'loc': ['Locutions', 'Écriture des locutions usuelles.'], 'gn': ['Accords (genre et nombre)', 'Accords des noms et des adjectifs.'], 'verbs': ['Verbes', ''], 'conj': ['Conjugaisons', 'Accord des verbes avec leur sujet.'], 'infi': ['Infinitif', 'Confusion entre l’infinitif et d’autres formes.'], 'imp': ['Impératif', 'Vérifie notamment la deuxième personne du singulier (par exemple, les erreurs\xa0: «\xa0vas…\xa0», «\xa0prend…\xa0», «\xa0manges…\xa0»).'], 'inte': ['Interrogatif', 'Vérifie les formes interrogatives et suggère de lier les pronoms personnels avec les verbes.'], 'ppas': ['Participes passés, adjectifs', ''], 'vmode': ['Modes verbaux', ''], 'style': ['Style', ''], 'bs': ['Populaire', 'Souligne un langage courant considéré comme erroné, comme «\xa0malgré que\xa0».'], 'pleo': ['Pléonasmes', 'Repère des redondances sémantiques, comme «\xa0au jour d’aujourd’hui\xa0», «\xa0monter en haut\xa0», etc.'], 'eleu': ['Élisions et euphonies', 'Signale les élisions incorrectes et les tournures dysphoniques.'], 'neg': ['Adverbe de négation [!]', 'Ne … pas, ne … jamais, etc.'], 'redon1': ['Répétitions dans le paragraphe [!]', 'Sont exclus les mots grammaticaux, ceux commençant par une majuscule, ainsi que “être” et “avoir”.'], 'redon2': ['Répétitions dans la phrase [!]', 'Sont exclus les mots grammaticaux, ainsi que “être” et “avoir”.'], 'misc': ['Divers', ''], 'mc': ['Mots composés [!]', 'Vérifie si les mots composés à trait d’union existent dans le dictionnaire (hormis ceux commençant par ex-, mi-, quasi-, semi-, non-, demi- et d’autres préfixes communs).'], 'date': ['Validité des dates', ''], 'debug': ['Débogage', ''], 'idrule': ['Identifiant des règles de contrôle [!]', 'Affiche l’identifiant de la règle de contrôle dans les messages d’erreur.']}, 'en': {'__optiontitle__': 'Grammar checking (French)', 'basic': ['Typography', ''], 'typo': ['Typographical glyphs', ''], 'apos': ['Typographical apostrophe', 'Detects typewriter apostrophes. You may get automatically typographical apostrophes in Tools > Autocorrect options > Localized options > Single quote > Replace (checkbox).'], 'eepi': ['Epicene writing', 'Normalization of epicene writing (usage of middle dots).'], 'esp': ['Useless spaces', 'Checks spaces within words and at the beginning and the end of lines.'], 'tab': ['Useless tabulations', 'Checks tabulations at the beginning and the end of lines.'], 'nbsp': ['Non-breakable spaces', 'Checks the use of non-breakable spaces with the following punctuation marks: «\xa0! ? : ;\xa0» (deactivate it if you use a Graphite font).'], 'maj': ['Capitals', 'Checks the use of uppercase and lowercase letters (i.e. «\xa0la raison d’État\xa0», «\xa0les Européens\xa0»).'], 'minis': ['Capitals for ministry', 'Capital letters for ministry.'], 'virg': ['Commas', 'Missing commas before “mais”, “car” and “etc.”.'], 'poncfin': ['Ending punctuation [!]', 'Checks if an ending punctuation is missing on paragraphs (only for multi-sentences paragraphs).'], 'tu': ['Hyphens and junctions', 'Checks missing or useless hyphens.'], 'num': ['Numerals', 'Large numerals and «\xa0O\xa0» instead of «\xa00\xa0».'], 'unit': ['Non-breaking spaces before units of measurement', ''], 'nf': ['French standards', ''], 'liga': ['Report typographical ligatures', 'Ligatures of fi, fl, ff, ffi, ffl, ft, st.'], 'mapos': ['Missing apostrophes after single letters [!]', 'Missing apostrophes after l d s n c j m t ç. This option is mostly useful to detect defects of digitized texts and is not recommended for scientific texts.'], 'chim': ['Chemistry', 'Typography for molecules (H₂O, CO₂, etc.)'], 'ocr': ['OCR errors [!]', 'Warning: many false positives.'], 'gramm': ['Nouns and Adjectives', ''], 'conf': ['Confusions and false friends', 'Seeks errors often due to homonymy (i.e. confusions between «\xa0faîte\xa0» et «\xa0faite\xa0»).'], 'loc': ['Locutions', 'Writing of common locutions.'], 'gn': ['Agreement (gender and number)', 'Agreement between nouns and adjectives.'], 'verbs': ['Verbs', ''], 'conj': ['Conjugation', 'Agreement between verbs and their subject.'], 'infi': ['Infinitive', 'Checks confusions between infinitive forms and other forms.'], 'imp': ['Imperative mood', 'Checks particularly verbs at second person singular (i.e. errors such as: «\xa0vas …\xa0», «\xa0prend …\xa0», «\xa0manges …\xa0»).'], 'inte': ['Interrogative mood', 'Checks interrogative forms and suggests linking the personal pronouns with verbs.'], 'ppas': ['Past participles, adjectives', 'Checks subject agreement with past participles and adjectives.'], 'vmode': ['Verbal modes', ''], 'style': ['Style', ''], 'bs': ['Popular style', 'Underlines misuse of language though informal and commonly used.'], 'pleo': ['Pleonasms', 'Semantic replications, like «\xa0au jour d’aujourd’hui\xa0», «\xa0monter en haut\xa0», etc.'], 'eleu': ['Élisions et euphonies', 'Signale les élisions incorrectes et les tournures dysphoniques.'], 'neg': ['Negation adverb [!]', 'Ne … pas, ne … jamais, etc.'], 'redon1': ['Duplicates in paragraph [!]', 'Are excluded grammatical words, words beginning by a capital letter, and also “être” and “avoir”.'], 'redon2': ['Duplicates in sentence [!]', 'Are excluded grammatical words, and also “être” and “avoir”.'], 'misc': ['Miscellaneous', ''], 'mc': ['Compound words [!]', 'Check if words with hyphen exist in the dictionary (except those beginning by ex-, mi-, quasi-, semi-, non-, demi- and other common prefixes).'], 'date': ['Date validity.', ''], 'debug': ['Debug', ''], 'idrule': ['Display control rule identifier [!]', 'Display control rule identifier in the context menu message.']}}
};


if (typeof(exports) !== 'undefined') {
    exports.dOptions = gc_options.dOptions;
    exports.sAppContext = gc_options.sAppContext;
    exports.load = gc_options.load;
    exports.setOption = gc_options.setOption;
    exports.setOptions = gc_options.setOptions;
    exports.resetOptions = gc_options.resetOptions;
    exports.getDefaultOptions = gc_options.getDefaultOptions;
    exports.getOptions = gc_options.getOptions;
    exports.getOptionsColors = gc_options.getOptionsColors;
    exports.lStructOpt = gc_options.lStructOpt;
    exports.oDefaultOpt = gc_options.oDefaultOpt;
    exports.oColorType = gc_options.oColorType;
    exports.oOptColor = gc_options.oOptColor;
    exports.oOptLabel = gc_options.oOptLabel;
}
