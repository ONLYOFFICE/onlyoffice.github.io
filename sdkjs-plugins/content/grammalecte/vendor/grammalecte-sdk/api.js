/*
    ! Grammalecte, grammar checker !
    API pour faciliter l'utilisation de Grammalecte.
*/

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console */

"use strict";
function SplitText(sText) {
    var allParasInSelection = sText.split(/\n/);
    var allParsedParas = [];

    for (var nStr = 0; nStr < allParasInSelection.length; nStr++) {
        if (allParasInSelection[nStr].search(/	/) === 0) {
            allParsedParas.push("");
            allParasInSelection[nStr] = allParasInSelection[nStr].replace(/	/, "");
        }
        var sSplited = allParasInSelection[nStr].split(/	/);

        sSplited.forEach(function(item, i, sSplited) {
            allParsedParas.push(item.replace(/\r\n?/g, ''));
        });
    }

    return allParsedParas;
};

class GrammarChecker {

    constructor(sPathRoot, aInit, sLangCode = "fr", sContext = "Javascript") {
        this.sLangCode = sLangCode;
        this.sContext = sContext;
        this.sPathRoot = sPathRoot;
        //Importation des fichiers nécessaire
        this.sPathRoot = sPathRoot;
        this._helpers = window.grammalecte.helpers;

        this.isInit = {
            Grammalecte: false,
            Graphspell: false,
            Tokenizer: false,
            TextFormatter: false,
            Lexicographer: false
        };

        if (aInit){
            this.load(aInit);
        }
    }

    //Auto-chargement avec dépendence
    load(aInit = ["Grammalecte", "Graphspell", "TextFormatter", "Lexicographer", "Tokenizer"]){
        //aInit permet de charger que certain composant
        // => évite de charger toutes données si par exemple on a besoin que du lexigraphe
        // => sorte de gestionnaire de dépendence (peut être amélioré)
        this.isInit = {};
        if ( aInit.indexOf("Grammalecte") !== false ){
            //console.log('init Grammalecte');
            this._oGce = window.grammalecte.gc_engine;
            this._oGce.load(this.sContext);
            this.isInit.Grammalecte = true;
            this.oSpellChecker = this._oGce.getSpellChecker();
            this.isInit.Graphspell = true;
            this.oTokenizer = this.oSpellChecker.getTokenizer();
            this.isInit.Tokenizer = true;
        }

        if ( !this.isInit.Graphspell && (aInit.indexOf("Graphspell") !== false || aInit.indexOf("Lexicographer") !== false)){
            //console.log('init Graphspell');
            this.oSpellChecker = new SpellChecker(this.sLangCode, this.sPathRoot + "/graphspell/dictionaries");
            this.isInit.Graphspell = true;
            this.oTokenizer = this.oSpellChecker.getTokenizer();
            this.isInit.Tokenizer = true;
        }

        if ( !this.isInit.Tokenizer && aInit.indexOf("Tokenizer") !== false ){
            //console.log('init Tokenizer');
            this.oTokenizer = new Tokenizer(this.sLangCode);
            this.isInit.Tokenizer = true;
        }

        if ( aInit.indexOf("TextFormatter") !== false ){
            //console.log('init TextFormatter');
            this.oTextFormatter = new TextFormatter();
            this.isInit.TextFormatter = true;
        }

        /*if ( aInit.indexOf("Lexicographer") !== false ){
            //console.log('init Lexicographer');
            this._oLex = require(this.sPathRoot + "/graphspell/lexgraph_fr.js");
            this.oLexicographer = new this._oLex.Lexicographe(
                this.oSpellChecker,
                this.oTokenizer,
                this._helpers.loadFile(this.sPathRoot + "/fr/locutions_data.json")
            );
            this.isInit.Lexicographer = true;
        }*/
    }

    //Fonctions concernant: Grammalecte
    getGrammalecte(){
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        return this._oGce;
    }

    gramma(sText){
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        return Array.from(this._oGce.parse(sText, this.sLangCode));
    }

    getGceOptions () {
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        return this._helpers.mapToObject(this._oGce.getOptions());
    }

    getGceDefaultOptions () {
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        return this._helpers.mapToObject(this._oGce.getDefaultOptions());
    }

    setGceOptions (dOptions) {
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        if (!(dOptions instanceof Map)) {
            dOptions = this._helpers.objectToMap(dOptions);
        }
        this._oGce.setOptions(dOptions);
        return this._helpers.mapToObject(this._oGce.getOptions());
    }

    setGceOption (sOptName, bValue) {
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        if (sOptName) {
            this._oGce.setOption(sOptName, bValue);
            return this._helpers.mapToObject(this._oGce.getOptions());
        }
        return false;
    }

    resetGceOptions () {
        if (!this.isInit.Grammalecte) {
            this.load(["Grammalecte"]);
        }
        this._oGce.resetOptions();
        return this._helpers.mapToObject(this._oGce.getOptions());
    }

    //Fonctions concernant: Graphspell
    getGraphspell(){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        return this.oSpellChecker;
    }

    spellParagraph(sText, bSuggest = true){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        if (bSuggest){
            let lError = this.oSpellChecker.parseParagraph(sText);
            for (let token of lError) {
                token.aSuggestions = this.suggest(token.sValue);
            }
            return lError;
        } else {
            return this.oSpellChecker.parseParagraph(sText);
        }
    }

    spell(sWord){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        return this.oSpellChecker.isValid(sWord);
    }

    suggest(sWord, nbLimit = 10, bMerge = true){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        let lSuggest = this.oSpellChecker.suggest(sWord, nbLimit);
        if (bMerge){
            let lSuggestRep = [];
            for (let lSuggestTmp of lSuggest) {
                for (let word of lSuggestTmp) {
                    lSuggestRep.push(word);
                }
            }
            return lSuggestRep;
        } else {
            return Array.from(lSuggest);
        }

    }

    lemma(sWord){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        return this.oSpellChecker.getLemma(sWord);
    }

    morph(sWord){
        if (!this.isInit.Graphspell) {
            this.load(["Graphspell"]);
        }
        return this.oSpellChecker.getMorph(sWord);
    }

    //Fonctions concernant: Lexicographer
    getLexicographer(){
        if (!this.isInit.Lexicographer) {
            this.load(["Lexicographer"]);
        }
        return this.oLexicographer;
    }

    lexique(sText){
        if (!this.isInit.Lexicographer) {
            this.load(["Lexicographer"]);
        }
        return this.oLexicographer.getListOfTokensReduc(sText);
    }

    //Fonctions concernant: TextFormatter
    getTextFormatter(){
        if (!this.isInit.TextFormatter) {
            this.load(["TextFormatter"]);
        }
        return this.oTextFormatter;
    }

    formatText(sText){
        if (!this.isInit.TextFormatter) {
            this.load(["TextFormatter"]);
        }
        return this.oTextFormatter.formatText(sText);
    }

    setTfOptions(dOptions) {
        if (!this.isInit.TextFormatter) {
            this.load(["TextFormatter"]);
        }
        this.oTextFormatter.setOptions(dOptions);
        return this._helpers.mapToObject(this.oTextFormatter.getOptions());
    }

    setTfOption(sOptName, bValue) {
        if (!this.isInit.TextFormatter) {
            this.load(["TextFormatter"]);
        }
        if (sOptName) {
            let optionsTF = this.oTextFormatter.getOptions();
            optionsTF.set(sOptName, bValue);
            return this._helpers.mapToObject(this.oTextFormatter.getOptions());
        }
        return false;
    }

    resetTfOptions() {
        if (!this.isInit.TextFormatter) {
            this.load(["TextFormatter"]);
        }
        let optionsTF = this.oTextFormatter.getDefaultOptions();
        this.oTextFormatter.setOptions(optionsTF);
        return this._helpers.mapToObject(this.oTextFormatter.getOptions());
    }

    //fonctions concernant plussieurs parties
    verifParagraph(sText, bSuggest = true){
        if (!this.isInit.Grammalecte || !this.isInit.Graphspell) {
            this.load(["Grammalecte"]);
        }
        return {
            lGrammarErrors: Array.from(this._oGce.parse(sText, this.sLangCode)),
            lSpellingErrors: this.spellParagraph(sText, bSuggest)
        };
    }

    parseAndSpellcheck (sText, sCountry, bDebug, bContext) {
        //sText, "FR", false, false, oInfo={}
        var i = 0;
        var arrParagraphs = SplitText(sText);
        var arrMistakes = [];
        sText = sText.replace(/­/g, "").normalize("NFC");
        for (var sParagraph of arrParagraphs) {
            var aGrammErr = this._oGce.parse(sParagraph, "FR", false, null, false);
            var aSpellErr = this.oSpellChecker.parseParagraph(sParagraph);
            for (var nSpellErr = 0; nSpellErr < aSpellErr.length; nSpellErr++) {
                aSpellErr[nSpellErr]["aSuggestions"] = this.suggest(aSpellErr[nSpellErr].sValue);
            }
            arrMistakes.push({sParagraph: sParagraph, iParaNum: i, aGrammErr: aGrammErr, aSpellErr: aSpellErr});
            i += 1;
        }
        return arrMistakes;
    }

}

if (typeof exports !== "undefined") {
    exports.GrammarChecker = GrammarChecker;
}
