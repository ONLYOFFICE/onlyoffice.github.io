// JavaScript

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



//// Default Suggestions

const _dSugg = new Map ([
    ["bcp", "beaucoup"],
    ["ca", "ça"],
    ["cad", "c’est-à-dire"],
    ["cb", "combien|CB"],
    ["cdlt", "cordialement"],
    ["construirent", "construire|construisirent|construisent|construiront"],
    ["càd", "c’est-à-dire"],
    ["chai", "j’sais|je sais"],
    ["chais", "j’sais|je sais"],
    ["chui", "j’suis|je suis"],
    ["chuis", "j’suis|je suis"],
    ["dc", "de|donc"],
    ["done", "donc|donne"],
    ["email", "courriel|e-mail|émail"],
    ["emails", "courriels|e-mails"],
    ["ete", "êtes|été"],
    ["Etes-vous", "Êtes-vous"],
    ["Etiez-vous", "Étiez-vous"],
    ["Etions-vous", "Étions-nous"],
    ["loins", "loin"],
    ["mn", "min"],
    ["mns", "min"],
    ["online", "en ligne"],
    ["parce-que", "parce que"],
    ["pcq", "parce que"],
    ["pd", "pendant|pédé"],
    ["pdq", "pendant que"],
    ["pdt", "pendant"],
    ["pdtq", "pendant que"],
    ["pécunier", "pécuniaire"],
    ["pécuniers", "pécuniaires"],
    ["pk", "pourquoi"],
    ["pkoi", "pourquoi"],
    ["pq", "pourquoi|PQ"],
    ["prq", "presque"],
    ["prsq", "presque"],
    ["qcq", "quiconque"],
    ["qd", "quand"],
    ["qq", "quelque"],
    ["qqch", "quelque chose"],
    ["qqn", "quelqu’un"],
    ["qqne", "quelqu’une"],
    ["qqs", "quelques"],
    ["qqunes", "quelques-unes"],
    ["qquns", "quelques-uns"],
    ["tdq", "tandis que"],
    ["tj", "toujours"],
    ["tjs", "toujours"],
    ["tq", "tant que|tandis que"],
    ["ts", "tous"],
    ["tt", "tant|tout"],
    ["tte", "toute"],
    ["ttes", "toutes"],

    ["Iier", "Iᵉʳ"],
    ["Iière", "Iʳᵉ"],
    ["IIième", "IIᵉ"],
    ["IIIième", "IIIᵉ"],
    ["IVième", "IVᵉ"],
    ["Vième", "Vᵉ"],
    ["VIième", "VIᵉ"],
    ["VIIième", "VIIᵉ"],
    ["VIIIième", "VIIIᵉ"],
    ["IXième", "IXᵉ"],
    ["Xième", "Xᵉ"],
    ["XIième", "XIᵉ"],
    ["XIIième", "XIIᵉ"],
    ["XIIIième", "XIIIᵉ"],
    ["XIVième", "XIVᵉ"],
    ["XVième", "XVᵉ"],
    ["XVIième", "XVIᵉ"],
    ["XVIIième", "XVIIᵉ"],
    ["XVIIIième", "XVIIIᵉ"],
    ["XIXième", "XIXᵉ"],
    ["XXième", "XXᵉ"],
    ["XXIième", "XXIᵉ"],
    ["XXIIième", "XXIIᵉ"],
    ["XXIIIième", "XXIIIᵉ"],
    ["XXIVième", "XXIVᵉ"],
    ["XXVième", "XXVᵉ"],
    ["XXVIième", "XXVIᵉ"],
    ["XXVIIième", "XXVIIᵉ"],
    ["XXVIIIième", "XXVIIIᵉ"],
    ["XXIXième", "XXIXᵉ"],
    ["XXXième", "XXXᵉ"],

    ["Ier", "Iᵉʳ"],
    ["Ière", "Iʳᵉ"],
    ["IIème", "IIᵉ"],
    ["IIIème", "IIIᵉ"],
    ["IVème", "IVᵉ"],
    ["Vème", "Vᵉ"],
    ["VIème", "VIᵉ"],
    ["VIIème", "VIIᵉ"],
    ["VIIIème", "VIIIᵉ"],
    ["IXème", "IXᵉ"],
    ["Xème", "Xᵉ"],
    ["XIème", "XIᵉ"],
    ["XIIème", "XIIᵉ"],
    ["XIIIème", "XIIIᵉ"],
    ["XIVème", "XIVᵉ"],
    ["XVème", "XVᵉ"],
    ["XVIème", "XVIᵉ"],
    ["XVIIème", "XVIIᵉ"],
    ["XVIIIème", "XVIIIᵉ"],
    ["XIXème", "XIXᵉ"],
    ["XXème", "XXᵉ"],
    ["XXIème", "XXIᵉ"],
    ["XXIIème", "XXIIᵉ"],
    ["XXIIIème", "XXIIIᵉ"],
    ["XXIVème", "XXIVᵉ"],
    ["XXVème", "XXVᵉ"],
    ["XXVIème", "XXVIᵉ"],
    ["XXVIIème", "XXVIIᵉ"],
    ["XXVIIIème", "XXVIIIᵉ"],
    ["XXIXème", "XXIXᵉ"],
    ["XXXème", "XXXᵉ"]
]);



//// Lexicographer

window.grammalecte["lexgraph_fr"] = {

    dSugg: _dSugg,

    // Préfixes et suffixes
    aPfx1: new Set([
        "anti", "archi", "contre", "hyper", "mé", "méta", "im", "in", "ir", "par", "proto",
        "pseudo", "pré", "re", "ré", "sans", "sous", "supra", "sur", "ultra"
    ]),

    aPfx2: new Set([
        "belgo", "franco", "génito", "gynéco", "médico", "russo"
    ]),

    // Étiquettes
    dTag: new Map([
            [':N', [" nom,", "Nom"]],
            [':A', [" adjectif,", "Adjectif"]],
            [':M1', [" prénom,", "Prénom"]],
            [':M2', [" patronyme,", "Patronyme, matronyme, nom de famille…"]],
            [':MP', [" nom propre,", "Nom propre"]],
            [':W', [" adverbe,", "Adverbe"]],
            [':J', [" interjection,", "Interjection"]],
            [':B', [" nombre,", "Nombre"]],
            [':Br', [" nombre romain,", "Nombre romain"]],
            [':T', [" titre,", "Titre de civilité"]],

            [':e', [" épicène", "épicène"]],
            [':m', [" masculin", "masculin"]],
            [':f', [" féminin", "féminin"]],
            [':s', [" singulier", "singulier"]],
            [':p', [" pluriel", "pluriel"]],
            [':i', [" invariable", "invariable"]],

            [':V1_', [" verbe (1ᵉʳ gr.),", "Verbe du 1ᵉʳ groupe"]],
            [':V2_', [" verbe (2ᵉ gr.),", "Verbe du 2ᵉ groupe"]],
            [':V3_', [" verbe (3ᵉ gr.),", "Verbe du 3ᵉ groupe"]],
            [':V1e', [" verbe (1ᵉʳ gr.),", "Verbe du 1ᵉʳ groupe"]],
            [':V2e', [" verbe (2ᵉ gr.),", "Verbe du 2ᵉ groupe"]],
            [':V3e', [" verbe (3ᵉ gr.),", "Verbe du 3ᵉ groupe"]],
            [':V0e', [" verbe,", "Verbe auxiliaire être"]],
            [':V0a', [" verbe,", "Verbe auxiliaire avoir"]],

            [':Y', [" infinitif,", "infinitif"]],
            [':P', [" participe présent,", "participe présent"]],
            [':Q', [" participe passé,", "participe passé"]],
            [':Ip', [" présent,", "indicatif présent"]],
            [':Iq', [" imparfait,", "indicatif imparfait"]],
            [':Is', [" passé simple,", "indicatif passé simple"]],
            [':If', [" futur,", "indicatif futur"]],
            [':K', [" conditionnel présent,", "conditionnel présent"]],
            [':Sp', [" subjonctif présent,", "subjonctif présent"]],
            [':Sq', [" subjonctif imparfait,", "subjonctif imparfait"]],
            [':E', [" impératif,", "impératif"]],

            [':1s', [" 1ʳᵉ p. sg.,", "verbe : 1ʳᵉ personne du singulier"]],
            [':1ŝ', [" présent interr. 1ʳᵉ p. sg.,", "verbe : 1ʳᵉ personne du singulier (présent interrogatif)"]],
            [':1ś', [" présent interr. 1ʳᵉ p. sg.,", "verbe : 1ʳᵉ personne du singulier (présent interrogatif)"]],
            [':2s', [" 2ᵉ p. sg.,", "verbe : 2ᵉ personne du singulier"]],
            [':3s', [" 3ᵉ p. sg.,", "verbe : 3ᵉ personne du singulier"]],
            [':1p', [" 1ʳᵉ p. pl.,", "verbe : 1ʳᵉ personne du pluriel"]],
            [':2p', [" 2ᵉ p. pl.,", "verbe : 2ᵉ personne du pluriel"]],
            [':3p', [" 3ᵉ p. pl.,", "verbe : 3ᵉ personne du pluriel"]],
            [':3p!', [" 3ᵉ p. pl.,", "verbe : 3ᵉ personne du pluriel"]],

            [':G', ["[mot grammatical]", "Mot grammatical"]],
            [':X', [" adverbe de négation,", "Adverbe de négation"]],
            [':U', [" adverbe interrogatif,", "Adverbe interrogatif"]],
            [':R', [" préposition,", "Préposition"]],
            [':Rv', [" préposition verbale,", "Préposition verbale"]],
            [':D', [" déterminant,", "Déterminant"]],
            [':Dd', [" déterminant démonstratif,", "Déterminant démonstratif"]],
            [':De', [" déterminant exclamatif,", "Déterminant exclamatif"]],
            [':Dp', [" déterminant possessif,", "Déterminant possessif"]],
            [':Di', [" déterminant indéfini,", "Déterminant indéfini"]],
            [':Dn', [" déterminant négatif,", "Déterminant négatif"]],
            [':Od', [" pronom démonstratif,", "Pronom démonstratif"]],
            [':Oi', [" pronom indéfini,", "Pronom indéfini"]],
            [':On', [" pronom indéfini négatif,", "Pronom indéfini négatif"]],
            [':Ot', [" pronom interrogatif,", "Pronom interrogatif"]],
            [':Or', [" pronom relatif,", "Pronom relatif"]],
            [':Ow', [" pronom adverbial,", "Pronom adverbial"]],
            [':Os', [" pronom personnel sujet,", "Pronom personnel sujet"]],
            [':Oo', [" pronom personnel objet,", "Pronom personnel objet"]],
            [':Ov', [" préverbe,", "Préverbe"]],
            [':O1', [" 1ʳᵉ pers.,", "Pronom : 1ʳᵉ personne"]],
            [':O2', [" 2ᵉ pers.,", "Pronom : 2ᵉ personne"]],
            [':O3', [" 3ᵉ pers.,", "Pronom : 3ᵉ personne"]],
            [':C', [" conjonction,", "Conjonction"]],
            [':Cc', [" conjonction de coordination,", "Conjonction de coordination"]],
            [':Cs', [" conjonction de subordination,", "Conjonction de subordination"]],

            [':ÉC', [" élément de conjonction,", "Élément de conjonction"]],
            [':ÉCs', [" élément de conjonction de subordination,", "Élément de conjonction de subordination"]],
            [':ÉN', [" élément de locution nominale,", "Élément de locution nominale"]],
            [':ÉA', [" élément de locution adjectivale,", "Élément de locution adjectivale"]],
            [':ÉV', [" élément de locution verbale,", "Élément de locution verbale"]],
            [':ÉW', [" élément de locution adverbiale,", "Élément de locution adverbiale"]],
            [':ÉR', [" élément de locution prépositive,", "Élément de locution prépositive"]],
            [':ÉJ', [" élément de locution interjective,", "Élément de locution interjective"]],

            [':L', [" locution", "Locution"]],
            [':LN', [" locution nominale", "Locution nominale"]],
            [':LA', [" locution adjectivale", "Locution adjectivale"]],
            [':LV', [" locution verbale", "Locution verbale"]],
            [':LW', [" locution adverbiale", "Locution adverbiale"]],
            [':LR', [" locution prépositive", "Locution prépositive"]],
            [':LRv', [" locution prépositive verbale", "Locution prépositive verbale"]],
            [':LO', [" locution pronominale", "Locution pronominale"]],
            [':LC', [" locution conjonctive", "Locution conjonctive"]],
            [':LJ', [" locution interjective", "Locution interjective"]],

            [':Zp', [" préfixe,", "Préfixe"]],
            [':Zs', [" suffixe,", "Suffixe"]],

            [':H', ["", "<Hors-norme, inclassable>"]],
            [':HEL', [" lettre ‹l› euphonique", "Lettre ‹l› euphonique"]],

            [':@',  ["", "<Caractère non alpha-numérique>"]],
            [':@p', [" signe de ponctuation", "Signe de ponctuation"]],
            [':@s', [" signe", "Signe divers"]],

            [';S', [" : symbole (unité de mesure)", "Symbole (unité de mesure)"]],
            [';C', [" : couleur", "Couleur"]],
            [';É', ["", "Élision requise"]],
            [';é', ["", "Pas d’élision"]],

            ['#G', [" : gentilé", "Gentilé"]],
            ['#L', ["", "Langue"]],
            ['#C', [" : cité", "Cité"]],
            ['#P', [" : pays", "Pays"]],

            ['/*', ["", "Sous-dictionnaire <Commun>"]],
            ['/C', [" <classique>", "Sous-dictionnaire <Classique>"]],
            ['/M', ["", "Sous-dictionnaire <Moderne>"]],
            ['/R', [" <réforme>", "Sous-dictionnaire <Réforme 1990>"]],
            ['/A', ["", "Sous-dictionnaire <Annexe>"]],
            ['/X', ["", "Sous-dictionnaire <Contributeurs>"]]
        ]),

    dValues: new Map([
            ['-je', " pronom personnel sujet, 1ʳᵉ pers. sing."],
            ['-tu', " pronom personnel sujet, 2ᵉ pers. sing."],
            ['-il', " pronom personnel sujet, 3ᵉ pers. masc. sing."],
            ['-iel', " pronom personnel sujet, 3ᵉ pers. sing."],
            ['-on', " pronom personnel sujet, 3ᵉ pers. sing. ou plur."],
            ['-ce', " pronom personnel sujet, 3ᵉ pers. sing. ou plur."],
            ['-elle', " pronom personnel sujet, 3ᵉ pers. fém. sing."],
            ['-t-il', " “t” euphonique + pronom personnel sujet, 3ᵉ pers. masc. sing."],
            ['-t-on', " “t” euphonique + pronom personnel sujet, 3ᵉ pers. sing. ou plur."],
            ['-t-elle', " “t” euphonique + pronom personnel sujet, 3ᵉ pers. fém. sing."],
            ['-t-iel', " “t” euphonique + pronom personnel sujet, 3ᵉ pers. sing."],
            ['-nous', " pronom personnel sujet/objet, 1ʳᵉ pers. plur.  ou  COI (à nous), plur."],
            ['-vous', " pronom personnel sujet/objet, 2ᵉ pers. plur.  ou  COI (à vous), plur."],
            ['-ils', " pronom personnel sujet, 3ᵉ pers. masc. plur."],
            ['-elles', " pronom personnel sujet, 3ᵉ pers. masc. plur."],
            ['-iels', " pronom personnel sujet, 3ᵉ pers. plur."],

            ["-là", " particule démonstrative (là)"],
            ["-ci", " particule démonstrative (ci)"],

            ['-le', " COD, masc. sing."],
            ['-la', " COD, fém. sing."],
            ['-les', " COD, plur."],

            ['-moi', " COI (à moi), sing."],
            ['-toi', " COI (à toi), sing."],
            ['-lui', " COI (à lui ou à elle), sing."],
            ['-nous2', " COI (à nous), plur."],
            ['-vous2', " COI (à vous), plur."],
            ['-leur', " COI (à eux ou à elles), plur."],

            ['-le-moi', " COD, masc. sing. + COI (à moi), sing."],
            ['-le-toi', " COD, masc. sing. + COI (à toi), sing."],
            ['-le-lui', " COD, masc. sing. + COI (à lui ou à elle), sing."],
            ['-le-nous', " COD, masc. sing. + COI (à nous), plur."],
            ['-le-vous', " COD, masc. sing. + COI (à vous), plur."],
            ['-le-leur', " COD, masc. sing. + COI (à eux ou à elles), plur."],

            ['-la-moi', " COD, fém. sing. + COI (à moi), sing."],
            ['-la-toi', " COD, fém. sing. + COI (à toi), sing."],
            ['-la-lui', " COD, fém. sing. + COI (à lui ou à elle), sing."],
            ['-la-nous', " COD, fém. sing. + COI (à nous), plur."],
            ['-la-vous', " COD, fém. sing. + COI (à vous), plur."],
            ['-la-leur', " COD, fém. sing. + COI (à eux ou à elles), plur."],

            ['-les-moi', " COD, plur. + COI (à moi), sing."],
            ['-les-toi', " COD, plur. + COI (à toi), sing."],
            ['-les-lui', " COD, plur. + COI (à lui ou à elle), sing."],
            ['-les-nous', " COD, plur. + COI (à nous), plur."],
            ['-les-vous', " COD, plur. + COI (à vous), plur."],
            ['-les-leur', " COD, plur. + COI (à eux ou à elles), plur."],

            ['-y', " pronom adverbial"],
            ["-m’y", " (me) pronom personnel objet + (y) pronom adverbial"],
            ["-t’y", " (te) pronom personnel objet + (y) pronom adverbial"],
            ["-s’y", " (se) pronom personnel objet + (y) pronom adverbial"],

            ['-en', " pronom adverbial"],
            ["-m’en", " (me) pronom personnel objet + (en) pronom adverbial"],
            ["-t’en", " (te) pronom personnel objet + (en) pronom adverbial"],
            ["-s’en", " (se) pronom personnel objet + (en) pronom adverbial"],

            ['.', "point"],
            ['·', "point médian"],
            ['…', "points de suspension"],
            [':', "deux-points"],
            [';', "point-virgule"],
            [',', "virgule"],
            ['?', "point d’interrogation"],
            ['!', "point d’exclamation"],
            ['(', "parenthèse ouvrante"],
            [')', "parenthèse fermante"],
            ['[', "crochet ouvrant"],
            [']', "crochet fermant"],
            ['{', "accolade ouvrante"],
            ['}', "accolade fermante"],
            ['-', "tiret"],
            ['—', "tiret cadratin"],
            ['–', "tiret demi-cadratin"],
            ['«', "guillemet ouvrant (chevrons)"],
            ['»', "guillemet fermant (chevrons)"],
            ['“', "guillemet ouvrant double"],
            ['”', "guillemet fermant double"],
            ['‘', "guillemet ouvrant"],
            ['’', "guillemet fermant"],
            ['"', "guillemets droits (déconseillé en typographie)"],
            ['/', "signe de la division"],
            ['+', "signe de l’addition"],
            ['*', "signe de la multiplication"],
            ['=', "signe de l’égalité"],
            ['<', "inférieur à"],
            ['>', "supérieur à"],
            ['⩽', "inférieur ou égal à"],
            ['⩾', "supérieur ou égal à"],
            ['%', "signe de pourcentage"],
            ['‰', "signe pour mille"],
        ]),

    _zPartDemForm: new RegExp("([a-zA-Zà-ö0-9À-Öø-ÿØ-ßĀ-ʯ]+)-(là|ci)$", "i"),
    _aPartDemExceptList: new Set(["celui", "celle", "ceux", "celles", "de", "jusque", "par", "marie-couche-toi"]),
    _zInterroVerb: new RegExp("([a-zA-Zà-ö0-9À-Öø-ÿØ-ßĀ-ʯ]+)(-(?:t-(?:ie?l|elle|on)|je|tu|ie?ls?|elles?|on|[nv]ous))$", "i"),
    _zImperatifVerb: new RegExp("([a-zA-Zà-ö0-9À-Öø-ÿØ-ßĀ-ʯ]+)(-(?:l(?:es?|a)-(?:moi|toi|lui|[nv]ous|leur)|y|en|[mts]['’ʼ‘‛´`′‵՚ꞌꞋ](?:y|en)|les?|la|[mt]oi|leur|lui))$", "i"),
    _zTag: new RegExp("[:;/#][a-zA-Z0-9É@*!][^:;/#]*", "g"),

    split: function (sWord) {
        // returns an arry of strings (prefix, trimed_word, suffix)
        let sPrefix = "";
        let sSuffix = "";
        // préfixe élidé
        let m = /^([ldmtsnjcç]|lorsqu|presqu|jusqu|puisqu|quoiqu|quelqu|qu)['’ʼ‘‛´`′‵՚ꞌꞋ]([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ-]+)/i.exec(sWord);
        if (m) {
            sPrefix = m[1] + "’";
            sWord = m[2];
        }
        // mots composés
        m = /^([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯﬁ-ﬆ]+)(-(?:(?:les?|la)-(?:moi|toi|lui|[nv]ous|leur)|t-(?:il|elle|on)|y|en|[mts]’(?:y|en)|les?|l[aà]|[mt]oi|leur|lui|je|tu|ils?|elles?|on|[nv]ous|ce))$/i.exec(sWord);
        if (m) {
            sWord = m[1];
            sSuffix = m[2];
        }
        // split word in 3 parts: prefix, root, suffix
        return [sPrefix, sWord, sSuffix];
    },

    analyze: function (sWord) {
        // return meaning of <sWord> if found else an empty string
        sWord = sWord.toLowerCase();
        if (this.dValues.has(sWord)) {
            return this.dValues.get(sWord);
        }
        return "";
    },

    readableMorph: function (sMorph) {
        if (!sMorph) {
            return " mot inconnu";
        }
        let sRes = "";
        let sVType = "";
        if (sMorph.includes(":V")) {
            sMorph = sMorph.replace(/:V([0-3][ea_])[itpqnmr_eaxz]+/, ":V$1");
        }
        if (sMorph.includes(":Q")) {
            let nVerbTag = sMorph.indexOf(":V")
            sVType = sMorph.slice(nVerbTag, nVerbTag+4);
            sMorph = sMorph.replace(/:V[0123]./, "").replace(/:1[ŝś]/, "");
        }
        let m;
        while ((m = this._zTag.exec(sMorph)) !== null) {
            sRes += this._readableTag(m[0]);
        }
        if ((sRes.startsWith(" verbe") && !sRes.includes("infinitif")) || sRes.startsWith(" participe")) {
            if (sVType) {
                sRes += " [" + sMorph.slice(1, sMorph.indexOf("/")) + " : " + this._readableTag(sVType).gl_trimRight(",") + "]";
            } else {
                sRes += " [" + sMorph.slice(1, sMorph.indexOf("/")) + "]";
            }
        }
        if (!sRes) {
            return " [" + sMorph + "]: étiquettes inconnues";
        }
        return sRes.gl_trimRight(",");
    },

    _readableTag: function (sTag) {
        if (this.dTag.has(sTag)) {
            return this.dTag.get(sTag)[0];
        }
        return " [" + sTag + "]?";
    },

    setLabelsOnToken (oToken) {
        // Token: .sType, .sValue, .nStart, .nEnd, .lMorph
        let m = null;
        try {
            switch (oToken.sType) {
                case 'PUNC':
                case 'SIGN':
                    oToken["aLabels"] = [this.dValues.gl_get(oToken["sValue"], "signe de ponctuation divers")];
                    break;
                case 'SYMB':
                    oToken["aLabels"] = ["symbole"];
                    break;
                case 'EMOJI':
                    oToken["aLabels"] = ["émoji"];
                    break;
                case 'NUM':
                    oToken["aLabels"] = ["nombre"];
                    break;
                case 'LINK':
                    oToken["aLabels"] = ["hyperlien"];
                    break;
                case 'TAG':
                    oToken["aLabels"] = ["étiquette (hashtag)"];
                    break;
                case 'HTML':
                    oToken["aLabels"] = ["balise HTML"];
                    break;
                case 'PSEUDOHTML':
                    oToken["aLabels"] = ["balise pseudo-HTML"];
                    break;
                case 'HTMLENTITY':
                    oToken["aLabels"] = ["entité caractère XML/HTML"];
                    break;
                case 'HOUR':
                    oToken["aLabels"] = ["heure"];
                    break;
                case 'WORD_ORDINAL':
                    oToken["aLabels"] = ["nombre ordinal"];
                    break;
                case 'FOLDERUNIX':
                    oToken["aLabels"] = ["dossier UNIX (et dérivés)"];
                    break;
                case 'FOLDERWIN':
                    oToken["aLabels"] = ["dossier Windows"];
                    break;
                case 'WORD_ACRONYM':
                    oToken["aLabels"] = ["sigle ou acronyme"];
                    break;
                case 'WORDELD':
                case 'WORDORD':
                case 'WORD':
                    if (oToken.hasOwnProperty("lMorph")  &&  oToken["lMorph"].length > 0) {
                        // with morphology
                        oToken["aLabels"] = [];
                        for (let sMorph of oToken["lMorph"]) {
                            oToken["aLabels"].push(this.readableMorph(sMorph));
                        }
                    } else {
                        // no morphology, guessing
                        if (oToken["sValue"].gl_count("-") > 4) {
                            oToken["aLabels"] = ["élément complexe indéterminé"];
                        }
                        else if (m = this._zPartDemForm.exec(oToken["sValue"])) {
                            // mots avec particules démonstratives
                            oToken["aLabels"] = ["mot avec particule démonstrative"];
                        }
                        else if (m = this._zImperatifVerb.exec(oToken["sValue"])) {
                            // formes interrogatives
                            oToken["aLabels"] = ["forme verbale impérative"];
                        }
                        else if (m = this._zInterroVerb.exec(oToken["sValue"])) {
                            // formes interrogatives
                            oToken["aLabels"] = ["forme verbale interrogative"];
                        }
                        else {
                            oToken["aLabels"] = ["mot inconnu du dictionnaire"];
                        }
                    }
                    if (oToken.hasOwnProperty("lSubTokens")) {
                        for (let oSubToken of oToken["lSubTokens"]) {
                            if (oSubToken["sValue"]) {
                                if (this.dValues.has(oSubToken["sValue"])) {
                                    oSubToken["lMorph"] = [ "" ];
                                    oSubToken["aLabels"] = [ this.dValues.get(oSubToken["sValue"]) ];
                                }
                                else {
                                    oSubToken["aLabels"] = oSubToken["lMorph"].map((sMorph) => this.readableMorph(sMorph));
                                }
                            }
                        }
                    }
                    break;
                default:
                    oToken["aLabels"] = ["token de nature inconnue"];
            }
        } catch (e) {
            console.error(e);
        }
    },


    // Other functions

    isValidSugg: function (sSugg, oSpellChecker) {
        "return True if <sSugg> is valid"
        if (sSugg.endsWith("è") || sSugg.endsWith("È")) {
            return false;
        }
        if (sSugg.includes("’")) {
            if (sSugg.search(/^[dD]’/) == 0 && !oSpellChecker.morph(sSugg.slice(2), ":[YNAW]")) {
                return false;
            }
            if (sSugg.search(/^[nmtsNMTS]’/) == 0 && !oSpellChecker.morph(sSugg.slice(2), ":V")) {
                return false;
            }
            if (sSugg.search(/^[jJ]’/) == 0 && !oSpellChecker.morph(sSugg.slice(2), ":(?:Y|[123][sp])")) {
                return false;
            }
            if (sSugg.search(/^[cçCÇ]’/) == 0  && !oSpellChecker.morph(sSugg.slice(2), ":3[sp]")) {
                return false;
            }
        }
        return true;
    }
}



if (typeof(exports) !== 'undefined') {
    exports.lexgraph_fr = lexgraph_fr;
}
