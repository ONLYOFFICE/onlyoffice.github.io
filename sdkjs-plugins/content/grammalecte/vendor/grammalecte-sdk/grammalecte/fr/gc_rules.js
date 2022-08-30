// Grammar checker rules

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/*global exports*/

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


// regex
/*jslint esversion: 6*/

if (RegExp.prototype.grammalecte === undefined) {
    RegExp.prototype.gl_exec2 = function (sText, aGroupsPos, aNegLookBefore=null) {
        let m;
        while ((m = this.exec(sText)) !== null) {
            // we have to iterate over sText here too
            // because first match doesn’t imply it’s a valid match according to negative lookbefore assertions,
            // and even if first match is finally invalid, it doesn’t mean the following eligible matchs would be invalid too.
            if (aNegLookBefore !== null) {
                // check negative look before assertions
                if ( !aNegLookBefore.some(sRegEx  =>  (RegExp.leftContext.search(sRegEx) >= 0)) ) {
                    break;
                }
            } else {
                break;
            }
        }
        if (m === null) {
            return null;
        }

        let codePos;
        let iPos = 0;
        m.start = [m.index];
        m.end = [this.lastIndex];
        try {
            if (m.length > 1) {
                // there is subgroup(s)
                if (aGroupsPos !== null) {
                    // aGroupsPos is defined
                    for (let i = 1; i <= m.length-1; i++) {
                        codePos = aGroupsPos[i-1];
                        if (typeof codePos === "number") {
                            // position as a number
                            m.start.push(m.index + codePos);
                            m.end.push(m.index + codePos + m[i].length);
                        } else if (codePos === "$") {
                            // at the end of the pattern
                            m.start.push(this.lastIndex - m[i].length);
                            m.end.push(this.lastIndex);
                        } else if (codePos === "w") {
                            // word in the middle of the pattern
                            iPos = m[0].search("[ ’,()«»“”]"+m[i]+"[ ,’()«»“”]") + 1 + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos === "*") {
                            // anywhere
                            iPos = m[0].indexOf(m[i]) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos === "**") {
                            // anywhere after previous group
                            iPos = m[0].indexOf(m[i], m.end[i-1]-m.index) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else if (codePos.startsWith(">")) {
                            // >x:_
                            // todo: look in substring x
                            iPos = m[0].indexOf(m[i]) + m.index;
                            m.start.push(iPos);
                            m.end.push(iPos + m[i].length);
                        } else {
                            console.error("# Error: unknown positioning code in regex [" + this.source + "], for group[" + i.toString() +"], code: [" + codePos + "]");
                        }
                    }
                } else {
                    // no aGroupsPos
                    for (let subm of m.slice(1)) {
                        iPos = m[0].indexOf(subm) + m.index;
                        m.start.push(iPos);
                        m.end.push(iPos + subm.length);
                    }
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        return m;
    };

    RegExp.prototype.grammalecte = true;
}


window.grammalecte["gc_rules"] = {
    lParagraphRules: [
  ["tab", [
    [/^[      ]+/g, false, "#357p", "tab_début_ligne", 4, [[null, "-", "", 0, "Espace·s en début de ligne à supprimer : utilisez les retraits de paragraphe.", ""]], null, null],
    [/[       ]+$/g, false, "#358p", "tab_fin_ligne", 4, [[null, "-", "", 0, "Espace·s en fin de ligne à supprimer.", ""]], null, null],
  ]],
  ["esp", [
    [/^[   ]+/g, false, "#366p", "esp_début_ligne", 4, [[null, "-", "", 0, "Espace·s en début de ligne à supprimer : utilisez les retraits de paragraphe (ou les tabulations à la rigueur).", ""]], null, null],
    [/[   ]+$/g, false, "#367p", "esp_fin_ligne", 4, [[null, "-", "", 0, "Espace·s en fin de ligne à supprimer.", ""]], null, null],
    [/(?:\b|[.?!,:;%‰‱˚»”])(  +)/g, false, "#368p", "esp_milieu_ligne", 4, [[null, "-", " ", 1, "Espace·s surnuméraire·s à supprimer.", ""]], ["$"], null],
    [/(?:  |  )/g, false, "#378p", "esp_mélangés1", 4, [[null, "-", " | ", 0, "Incohérence : l’espace insécable à côté de l’espace sécable n’a pas d’effet.", ""]], null, null],
    [/(?:\u0009[  ]|[  ]\u0009)/g, false, "#379p", "esp_mélangés2", 4, [[null, "-", " |\t", 0, "Incohérence : espace et tabulation.", ""]], null, null],
    [/[  ][  ]+/g, false, "#386p", "esp_insécables_multiples", 4, [[null, "-", " | ", 0, "Espace·s insécable·s surnuméraire·s à supprimer.", ""]], null, null],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*)( [-–—]|[-–—] )([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#393p", "esp_avant_après_tiret", 4, [["_c_esp_avant_après_tiret_1", ">", ""], ["_c_esp_avant_après_tiret_2", "-", "\\1-\\3|\\1 – \\3|\\1 — \\3", 0, "Espace superflu s’il s’agit bien d’une forme conjuguée interrogative (sinon, il manque un espace à côté du tiret).", ""], ["_c_esp_avant_après_tiret_3", "-", " – | — ", 2, "Il manque un espace à côté du tiret.", ""]], [0, "**", "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["typo", [
    [/([\[(]) /g, false, "#416p", "typo_espace_après_signe_ouvrant", 4, [[null, "-", "\\1", 0, "Pas d’espace après ce signe.", ""]], [0], null],
    [/ ([\]\)])/g, false, "#417p", "typo_espace_avant_signe_fermant", 4, [[null, "-", "\\1", 0, "Pas d’espace avant ce signe.", ""]], [1], null],
    [/[)]\b(?![s¹²³⁴⁵⁶⁷⁸⁹⁰]\b)/g, false, "#427p", "typo_parenthèse_fermante_collée", 4, [["_c_typo_parenthèse_fermante_collée_1", "-", ") ", 0, "Il manque un espace après la parenthèse.", ""]], null, null],
    [/\b[(](?=[^)][^)][^)])/g, false, "#430p", "typo_parenthèse_ouvrante_collée", 4, [[null, "-", " (", 0, "Il manque un espace avant la parenthèse.", ""]], null, null],
    [/[  ]\.(?=[  ])/g, false, "#441p", "typo_point_entre_deux_espaces", 4, [[null, "-", ".", 0, "Pas d’espace avant un point.", ""]], null, null],
    [/[  ]\.(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#442p", "typo_point_collé_à_mot_suivant", 4, [[null, "-", ". |.", 0, "L’espace se place après le point, et non avant (ou bien sert de liant entre deux lettres).", ""]], null, null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+([  ]…)/g, false, "#449p", "typo_points_suspension_après_espace", 4, [[null, "-", "…", 1, "Pas d’espace avant le signe “…”.", ""]], ["$"], null],
    [/[  ],(?=[  ])/g, false, "#457p", "typo_virgule_entre_deux_espaces", 4, [[null, "-", ",", 0, "Pas d’espace avant une virgule.", ""]], null, null],
    [/[  ],(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#458p", "typo_virgule_collée_à_mot_suivant", 4, [[null, "-", ", ", 0, "Pas d’espace avant une virgule. Un espace après.", ""]], null, null],
    [/[  ]”[  ]/g, false, "#465p", "typo_guillemets_fermants_perdus", 4, [[null, "-", "” | “", 0, "Pas d’espace avant ces guillemets ouvrants.", ""]], null, null],
    [/[  ]“[  ]/g, false, "#468p", "typo_guillemets_ouvrants_perdus", 4, [[null, "-", " “|” ", 0, "Pas d’espace après ces guillemets ouvrants.", ""]], null, null],
    [/[   ](?:"|['‘’]['‘’])[   ]/g, false, "#471p", "typo_guillemets_perdus", 4, [[null, "-", " « | » | “|” ", 0, "Guillemets isolés.", ""]], null, null],
    [/^(?:"|['‘’]['‘’])[   ]/g, false, "#474p", "typo_commencement_guillemets", 4, [[null, "-", "« |“", 0, "Guillemets ouvrants.", ""]], null, null],
    [/([   ](?:"|['‘’]['‘’]))(?:$|[.,;?!])/g, false, "#477p", "typo_guillemets_fin", 4, [[null, "-", " »|”", 1, "Guillemets fermants.", ""]], [0], null],
    [/[  ]”(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#488p", "typo_guillemets_fermants_inverses", 4, [[null, "-", " “", 0, "Mettez des guillemets ouvrants plutôt que fermants.", ""]], null, null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]([«“][  ])/g, false, "#491p", "typo_guillemets_ouvrants_inverses1", 4, [[null, "-", " »|”", 1, "Mettez des guillemets fermants plutôt qu’ouvrants.", ""]], [1], null],
    [/([«“])[  ]*$/g, false, "#494p", "typo_guillemets_ouvrants_inverses2", 4, [[null, "-", " »|”", 1, "Mettez des guillemets fermants plutôt qu’ouvrants.", ""]], [0], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]([  ][«“])[  ]?[!?,:;.…](?![  ]?[»”])/g, false, "#497p", "typo_guillemets_ouvrants_inverses3", 4, [[null, "-", " »|”", 1, "Mettez des guillemets fermants plutôt qu’ouvrants.", ""]], [1], null],
  ]],
  ["", [
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.-]*@[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.-]*[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]\.[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+/gi, true, "#524p", "p_email", 4, [[null, "~", "__MAIL__", 0]], null, null],
    [/(?:ht|f)tps?:\/\/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.\/?&!%=+*"'@$#-]+/gi, true, "#528p", "p_URL", 4, [[null, "~", "__URL__", 0]], null, null],
    [/((?:[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*\.)*)([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)(\.(?:com|net|org|info|fr|ca|be|ch|i[ot]|co\.uk|tk|jp|zh|ru|us|nl|xyz))(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#530p", "p_URL2", 4, [[null, "~", "*", 1], [null, "~", "=_p_p_URL2_2", 2], [null, "~", "*", 3]], [0, "**", "$"], null],
    [/^\d+\.[\d.-]*/gi, true, "#537p", "p_chapitre", 4, [[null, "~", "*", 0]], null, null],
    [/^\d+(?:  +|\t+)/gi, true, "#541p", "p_num_chapitre", 4, [[null, "~", "*", 0]], null, null],
    [/[cC](?:f|hap|oll?)(\.)/g, false, "#545p", "p_chap_coll_cf", 4, [[null, "~", "*", 1]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/p\. ?\d+(?:-\d+|)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#546p", "p_page", 4, [[null, "~", "*", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/pp\. ?\d+-\d+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#547p", "p_pages", 4, [[null, "~", "*", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/figure (\d+(?:[.:-]\d+|))(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#548p", "p_figure", 4, [[null, "~", "*", 1]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/art(?:icle|\.) (1(?:er|ᵉʳ)|\d+(?:[.:-][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+|))(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#549p", "p_article", 4, [[null, "~", "*", 1]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/av\./g, false, "#550p", "p_av", 4, [[null, "~", "av", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/vs\./g, false, "#553p", "p_vs", 4, [[null, "-", "vs ", 0, "Pas de point après cette abréviation.", ""], [null, "~", "vs", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/(?:versions?|mises? [àa] jour) ([0-9]+(?:\.[0-9]+[a-z]?)*)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#559p", "p_version_numéro", 4, [[null, "~", "*", 1]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([A-Z]\.[A-Z]\.(?:[A-Z]\.)*) +[A-ZÉÀÂÊÎÈÔ]/g, false, "#563p", "p_sigle1", 4, [[null, "~", "=_p_p_sigle1_1", 1]], [0], null],
    [/[a-zA-Z]\.[a-zA-Z]\.(?:[a-zA-Z]\.)*/g, false, "#565p", "p_sigle2", 4, [["_c_p_sigle2_1", ">", ""], ["_c_p_sigle2_2", "-", "=_s_p_sigle2_2", 0, "Sigle. Il est recommandé d’ôter les points pour les sigles. (S’il s’agit d’un prénom et d’un nom, mettez un espace.)", "https://fr.wikipedia.org/wiki/Sigle#Typographie"], ["_c_p_sigle2_3", "-", "=_s_p_sigle2_3", 0, "Sigle. Il est recommandé d’ôter les points pour les sigles.", "https://fr.wikipedia.org/wiki/Sigle#Typographie"], ["_c_p_sigle2_4", "~", "=_p_p_sigle2_4", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/J\.-[A-Z]\./g, false, "#572p", "p_sigle3", 4, [[null, "~", "=_p_p_sigle3_1", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/(M\.) (?:[A-ZÉÈÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]*|l[ae'’])/g, false, "#576p", "p_M_point", 4, [[null, "~", "Mr", 1]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/MM\./g, false, "#578p", "p_MM_point", 4, [[null, "~", "MM ", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/M(?:r|gr|me) [A-ZÉ](\.)(?=\W+[a-zéèêâîïû])/g, false, "#580p", "p_Mr_Mgr_Mme_point", 4, [[null, "~", "*", 1]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([A-ZÉÈÂÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)[  ][A-ZÉÈÂ](\.)[  ]([A-ZÉÈÂ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#584p", "p_prénom_lettre_point_patronyme", 4, [["_c_p_prénom_lettre_point_patronyme_1", "~", "*", 2]], [0, "*", "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([A-ZÉÈÂÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)[  ][A-ZÉÈÂ](\.)/g, false, "#587p", "p_prénom_lettre_point", 4, [["_c_p_prénom_lettre_point_1", "~", "_", 2]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[A-ZÉÈÂÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[-–—]L(?:es?|a) [A-ZÉÈÂÎ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#592p", "p_patronyme_composé_avec_le_la_les", 4, [[null, "~", "=_p_p_patronyme_composé_avec_le_la_les_1", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/\d+[.:]\d+[.:]\d+[.:]\d+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#596p", "p_adresse_IP", 4, [[null, "~", "*", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/\/(?:bin|boot|dev|etc|home|lib|mnt|opt|root|sbin|tmp|usr|var|Bureau|Documents|Images|Musique|Public|Téléchargements|Vidéos)(?:\/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.()]+)*/g, false, "#600p", "p_arborescence_Linux_Mac", 4, [[null, "~", "*", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-z]:\\(?:Program Files(?: [(]x86[)]|)|[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.()]+)(?:\\[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.()]+)*/gi, true, "#603p", "p_arborescence_Windows", 4, [[null, "~", "*", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/\d+ (m) /g, false, "#607p", "p_chiffres_m", 4, [[null, "~", "_", 1]], ["w"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["apos", [
    [/([ldsncjmç]|jusqu|lorsqu|aujourd|presqu|quelqu|puisqu|qu|prud|entr)['ʼ‘‛´`′‵՚ꞌꞋ](?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ"«<])/gi, true, "#644p", "apostrophe_typographique", 8, [[null, "-", "\\1’", 0, "Apostrophe typographique.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/t['ʼ‘‛´`′‵՚ꞌꞋ](?!ils?|elles?|on)(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ"«<])/gi, true, "#646p", "apostrophe_typographique_après_t", 8, [[null, "-", "t’", 0, "Apostrophe typographique.", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["typo", [
    [/(([ldsncjmtç]|lorsqu|puisqu|presqu|quoiqu|quelqu|jusqu|qu|aujourd|entr)(?:['’ʼ‘‛´`′‵՚ꞌꞋ]['’ʼ‘‛´`′‵՚ꞌꞋ ]|”|“|"| ['’ʼ‘‛´`′‵՚ꞌꞋ] ?))[aeéiouhœæyàîèêôû<]/gi, true, "#655p", "typo_apostrophe_incorrecte", 8, [["_c_typo_apostrophe_incorrecte_1", "-", "\\2’", 1, "Apostrophe incorrecte.", ""]], [0, 0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/((lorsqu|puisqu|presqu|quoiqu|jusqu|qu|aujourd|entr) )[aeéiouhyàîèêôû<]/gi, true, "#666p", "typo_apostrophe_manquante", 8, [[null, "-", "\\2’", 1, "Il manque vraisemblablement une apostrophe.", ""], [null, "~", "\\2’", 1]], [0, 0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/ne ([mtsl] )[aeéiouhyàîèêôû<]/gi, true, "#671p", "typo_apostrophe_manquante_prudence1", 8, [[null, "-", "=_s_typo_apostrophe_manquante_prudence1_1", 1, "Il manque une apostrophe.", ""]], [3], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/(?:je|tu|ie?ls?|nous|vous|on|ça|elles?) ([nmtsl] )([aeéiouhyàîèêôû][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*|<)/gi, true, "#674p", "typo_apostrophe_manquante_prudence2", 8, [["_c_typo_apostrophe_manquante_prudence2_1", "-", "=_s_typo_apostrophe_manquante_prudence2_1", 1, "Il manque probablement une apostrophe.", ""]], ["*", "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([ldsncjmtç] )[aeéiouhAEÉIOUHyîèêôûYÎÈÊÔÛ<]/g, false, "#678p", "typo_apostrophe_manquante_audace1", 8, [["_c_typo_apostrophe_manquante_audace1_1", "-", "=_s_typo_apostrophe_manquante_audace1_1", 1, "Il manque peut-être une apostrophe.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/"(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#702p", "typo_guillemets_typographiques_doubles_ouvrants", 4, [["_c_typo_guillemets_typographiques_doubles_ouvrants_1", "-", "« |“", 0, "Guillemets typographiques ouvrants.", ""]], null, null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.?!…,](")(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#705p", "typo_guillemets_typographiques_doubles_fermants", 4, [[null, "-", " »|”", 1, "Guillemets typographiques fermants.", ""]], ["*"], null],
    [/(?:^|[ –—-])(['’‘]['’‘])(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#713p", "typo_guillemets_typographiques_simples_doubles_ouvrants", 4, [[null, "-", "« |“", 1, "Guillemets typographiques ouvrants.", ""]], ["*"], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.?!…,](['’]['’])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ'’])/g, false, "#716p", "typo_guillemets_typographiques_simples_doubles_fermants", 4, [[null, "-", " »|”", 1, "Guillemets typographiques fermants.", ""]], ["*"], null],
    [/(?:^|[ –—-])(['’])(?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])/g, false, "#726p", "typo_guillemets_typographiques_simples_ouvrants", 4, [[null, "-", "“|‘|‹", 1, "Guillemets typographiques ouvrants.", ""]], ["*"], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.?!](')(?:[   ]|$)/g, false, "#729p", "typo_guillemets_typographiques_simples_fermants", 4, [[null, "-", "”|’|›", 1, "Guillemets typographiques fermants.", ""]], ["*"], null],
  ]],
  ["html", [
    [/<[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+.*?>/gi, true, "#748p", "p_html_balise_ouvrante", 4, [[null, "~", "*", 0]], null, null],
    [/<\/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+ *>/gi, true, "#749p", "p_html_balise_fermante", 4, [[null, "~", "*", 0]], null, null],
    [/&amp;[a-zA-Z]+;/gi, true, "#750p", "p_html_amp_xxx", 4, [[null, "~", "_", 0]], null, null],
    [/&lt;/gi, true, "#751p", "p_html_lt", 4, [[null, "~", "   <", 0]], null, null],
    [/&gt;/gi, true, "#752p", "p_html_gt", 4, [[null, "~", ">", 0]], null, null],
    [/&amp;/gi, true, "#753p", "p_html_amp", 4, [[null, "~", "&", 0]], null, null],
    [/&nbsp;/gi, true, "#754p", "p_html_nbsp", 4, [[null, "~", "@", 0]], null, null],
    [/&#(?:160|8239);/gi, true, "#755p", "p_html_nbsp2", 4, [[null, "~", "@", 0]], null, null],
    [/\[(?:[buiqa]|blockquote|quote)\]/gi, true, "#756p", "p_html_pseudo_balise1", 4, [[null, "~", "*", 0]], null, null],
    [/\[\/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+\]/gi, true, "#757p", "p_html_pseudo_balise2", 4, [[null, "~", "*", 0]], null, null],
  ]],
  ["latex", [
    [/\\[a-z]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#765p", "p_latex1", 4, [[null, "~", "*", 0]], null, null],
    [/\\[,;\/\\]/gi, true, "#766p", "p_latex2", 4, [[null, "~", "*", 0]], null, null],
    [/\{(?:abstract|align|cases|center|description|enumerate|equation|figure|flush(?:left|right)|gather|minipage|multline|quot(?:ation|e)|SaveVerbatim|table|tabular|thebibliography|[vV]erbatim|verse|wrapfigure)\}/g, false, "#767p", "p_latex3", 4, [[null, "~", "*", 0]], null, null],
  ]],
  ["md", [
    [/(?:[   ]|^)([*_]+)[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]/g, false, "#770p", "p_md_span_ouvrant", 4, [[null, "~", "*", 1]], ["*"], null],
    [/[a-z0-9àéîïôûüù]([*_]+)(?:[,.;:!?)   ]|$)/gi, true, "#771p", "p_md_span_fermant", 4, [[null, "~", "*", 1]], [1], null],
    [/^#+/g, false, "#772p", "p_md_titre_début", 4, [[null, "~", "*", 0]], null, null],
    [/#+ *$/g, false, "#773p", "p_md_titre_fin", 4, [[null, "~", "*", 0]], null, null],
    [/^ *[*+] /g, false, "#774p", "p_md_liste", 4, [[null, "~", "*", 0]], null, null],
    [/^>[ >]+ /g, false, "#775p", "p_md_citation", 4, [[null, "~", "*", 0]], null, null],
  ]],
  ["", [
    [/tous?[.(\/·•⋅–—-]te[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#793p", "eepi_écriture_épicène_tous_toutes", 4, [["_c_eepi_écriture_épicène_tous_toutes_1", "-", "tous et toutes|toutes et tous", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_tous_toutes_2", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/c[.\/·•⋅–—-]?eux?[.\/·•⋅–—-]elles(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#803p", "eepi_écriture_épicène_ceux_celles", 4, [["_c_eepi_écriture_épicène_ceux_celles_1", "-", "ceux et celles|celles et ceux", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_ceux_celles_2", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)eurs?[.(\/·•⋅–—-][tdp]?(rice|euse|se|[oe]resse)[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#813p", "eepi_écriture_épicène_pluriel_eur_divers", 4, [["_c_eepi_écriture_épicène_pluriel_eur_divers_1", "-", "\\1eurs et \\1\\2s|\\1\\2s et \\1eurs", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], ["_c_eepi_écriture_épicène_pluriel_eur_divers_2", "-", "\\1eurs et \\1euses|\\1euses et \\1eurs", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_eur_divers_3", 0]], [0, "**"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)eux[.(\/·•⋅–—-](?:[tdsi]?euse|se)[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#825p", "eepi_écriture_épicène_pluriel_eux_euses", 4, [["_c_eepi_écriture_épicène_pluriel_eux_euses_1", "-", "\\1eux et \\1euses|\\1euses et \\1eux", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_eux_euses_2", 0]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)ifs?[.(\/·•⋅–—-][std]?i?ve[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#834p", "eepi_écriture_épicène_pluriel_if_ive", 4, [["_c_eepi_écriture_épicène_pluriel_if_ive_1", "-", "\\1ifs et \\1ives|\\1ives et \\1ifs", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_if_ive_2", 0]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)[eè]rs?[.(\/·•⋅–—-](?:i?è?re|e)[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#844p", "eepi_écriture_épicène_pluriel_er_ère", 4, [["_c_eepi_écriture_épicène_pluriel_er_ère_1", "-", "\\1er·e·s|\\1ers et \\1ères|\\1ères et \\1ers", 0, "Écriture épicène dystypographique et imprononçable. À des fins de lisibilité, il est préférable d’éviter l’abus de graphies épicènes trop complexes.", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_er_ère_2", 0]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)aux[.(\/·•⋅–—-][tnmcpbd]?a?le[.)\/·•⋅–—-]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#856p", "eepi_écriture_épicène_pluriel_aux_ales", 4, [["_c_eepi_écriture_épicène_pluriel_aux_ales_1", "-", "\\1al·e·s|\\1aux et \\1ales|\\1ales et \\1aux", 0, "Écriture épicène dystypographique et imprononçable. Pour ce cas, il peut être intéressant de faire comme si le pluriel masculin était régulier, ce qui rend l’ensemble prononçable…", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_aux_ales_2", 0]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*[éuitsnldf])[-·–—.•⋅(\/]([ntlf]?e)[-·–—.•⋅)\/]?s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#867p", "eepi_écriture_épicène_pluriel_e", 4, [["_c_eepi_écriture_épicène_pluriel_e_1", ">", ""], [null, "~", "=_p_eepi_écriture_épicène_pluriel_e_2", 0], ["_c_eepi_écriture_épicène_pluriel_e_3", ">", ""], ["_c_eepi_écriture_épicène_pluriel_e_4", "-", "\\1·\\2·s|\\1 et \\1\\2s|\\1\\2s et \\1", 0, "Écriture épicène. Utilisez les points médians ou écrivez en toutes lettres.", ""], ["_c_eepi_écriture_épicène_pluriel_e_5", "-", "\\1·\\2·s|\\1s et \\1\\2s|\\1\\2s et \\1s", 0, "Écriture épicène. Utilisez les points médians ou écrivez en toutes lettres.", ""]], [0, "**"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*[éuitsrnldf])([-·–—.•⋅\/][ntl]?e|[(][ntl]?e[)])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#897p", "eepi_écriture_épicène_singulier", 4, [["_c_eepi_écriture_épicène_singulier_1", ">", ""], [null, "~", "=_p_eepi_écriture_épicène_singulier_2", 0], ["_c_eepi_écriture_épicène_singulier_3", "-", "un·e|un ou une|une ou un", 0, "Écriture épicène. Utilisez les points médians ou écrivez en toutes lettres.", ""], ["_c_eepi_écriture_épicène_singulier_4", "-", "=_s_eepi_écriture_épicène_singulier_4", 0, "Écriture épicène. Utilisez un point médian.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])([-·–—.•⋅\/]s|[(]s[)])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#917p", "typo_écriture_invariable", 4, [["_c_typo_écriture_invariable_1", "~", "=_p_typo_écriture_invariable_1", 0], ["_c_typo_écriture_invariable_2", "-", "\\1·s", 0, "Écriture invariable. Utilisez un point médian.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["maj", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)\. ([a-zàâéèêîôç][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]*)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#934p", "majuscule_après_point", 4, [["_c_majuscule_après_point_1", "-", "=_s_majuscule_après_point_1", 2, "Après un point, une majuscule est généralement requise.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/^ *([a-zàâéèêîôç](?:[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[’'`‘]?|[’'`‘]))/g, false, "#943p", "majuscule_début_paragraphe", 4, [["_c_majuscule_début_paragraphe_1", "-", "=_s_majuscule_début_paragraphe_1", 1, "Majuscule en début de phrase, sauf éventuellement lors d’une énumération.", ""]], ["$"], null],
  ]],
  ["poncfin", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*) *$/gi, true, "#959p", "poncfin_règle1", 4, [["_c_poncfin_règle1_1", "-", "\\1.|\\1 !|\\1 ?", 1, "Il semble manquer une ponctuation finale (s’il s’agit d’un titre, le point final n’est pas requis).", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["typo", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)[,:]([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*)/g, false, "#977p", "typo_espace_manquant_après1", 4, [["_c_typo_espace_manquant_après1_1", "-", " \\2", 2, "Il manque un espace.", ""]], [0, "$"], null],
    [/[?!;%‰‱˚»}]([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*|[({[])/g, false, "#979p", "typo_espace_manquant_après2", 4, [[null, "-", " \\1", 1, "Il manque un espace.", ""]], ["$"], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*\.([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*|[({[])/g, false, "#981p", "typo_espace_manquant_après3", 4, [["_c_typo_espace_manquant_après3_1", "-", " \\1", 1, "Il manque un espace.", ""]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[…]([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*|[({[])/g, false, "#984p", "typo_espace_manquant_après4", 4, [["_c_typo_espace_manquant_après4_1", "-", " \\1", 1, "Il manque un espace.", ""]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/etc(?:\.{3,5}|…)/gi, true, "#1018p", "typo_et_cetera", 4, [[null, "-", "etc.", 0, "Un seul point après « etc. »", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/(M(?:me|gr|lle)s?\.) [A-ZÉÈ]/g, false, "#1024p", "typo_point_après_titre", 4, [[null, "-", "=_s_typo_point_après_titre_1", 1, "Pas de point après cette abréviation.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([nN]os?\.)[  ]\d+/g, false, "#1030p", "typo_point_après_numéro", 4, [["_c_typo_point_après_numéro_1", "-", "nᵒˢ", 1, "Pas de point dans l’abréviation de numéro.", ""], ["_c_typo_point_après_numéro_2", "-", "nᵒ", 1, "Pas de point dans l’abréviation de numéro.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/\.{3,5}(?!\.)/g, false, "#1039p", "typo_points_suspension1", 4, [["_c_typo_points_suspension1_1", "-", "…", 0, "Typographie : points de suspension. Utilisez le caractère dédié.", ""]], null, ["\\.$"]],
    [/\.{6,}/g, false, "#1040p", "typo_points_suspension2", 4, [[null, "-", "=_s_typo_points_suspension2_1", 0, "Typographie : succession de points. Utilisez le caractère dédié.", ""]], null, null],
    [/\.\.(?!\.)/g, false, "#1041p", "typo_points_suspension3", 4, [[null, "-", "…|.", 0, "Typographie : un ou trois points ?", ""]], null, ["[.…]$"]],
    [/…\.\.?(?!\.)/g, false, "#1042p", "typo_points_superflus", 4, [[null, "-", "…", 0, "Points superflus.", ""]], null, null],
    [/,[.,]{2,}/g, false, "#1062p", "typo_virgules_points", 4, [[null, "-", "=_s_typo_virgules_points_1", 0, "Erreur de numérisation ? Virgules au lieu de points ?", ""]], null, null],
    [/, ?([.,;:!?])/g, false, "#1069p", "typo_ponctuation_superflue1", 4, [[null, "-", "=_s_typo_ponctuation_superflue1_1", 0, "Une de ces ponctuations est superflue.", ""]], ["$"], null],
    [/; ?([.,;:…!?])/g, false, "#1070p", "typo_ponctuation_superflue2", 4, [[null, "-", "=_s_typo_ponctuation_superflue2_1", 0, "Une de ces ponctuations est superflue.", ""]], ["$"], null],
    [/:[.,;:…!?]/g, false, "#1071p", "typo_ponctuation_superflue3", 4, [[null, "-", "=_s_typo_ponctuation_superflue3_1", 0, "Une de ces ponctuations est superflue.", ""]], null, null],
    [/[?!]\.(?!\.)/g, false, "#1072p", "typo_ponctuation_superflue4", 4, [[null, "-", "=_s_typo_ponctuation_superflue4_1", 0, "Ne mettez pas un point après un point d’interrogation ou d’exclamation.", ""]], null, null],
  ]],
  ["nbsp", [
    [/\b[?!;]/g, false, "#1087p", "nbsp_ajout_avant_double_ponctuation", 4, [["_c_nbsp_ajout_avant_double_ponctuation_1", "-", "=_s_nbsp_ajout_avant_double_ponctuation_1", 0, "Il manque un espace insécable.", ""]], null, null],
    [/ ([?!;])/g, false, "#1089p", "nbsp_avant_double_ponctuation", 4, [[null, "-", " \\1", 0, "Il manque un espace insécable.", ""]], [1], null],
    [/(?: |\b):(?= |$)/g, false, "#1091p", "nbsp_avant_deux_points", 4, [[null, "-", " :", 0, "Il manque un espace insécable.", ""]], null, null],
    [/«(?: |\b)/g, false, "#1093p", "nbsp_après_chevrons_ouvrants", 4, [[null, "-", "« ", 0, "Il manque un espace insécable.", ""]], null, null],
    [/^»(?: |\b)/g, false, "#1095p", "nbsp_après_chevrons_fermants", 4, [[null, "-", "» |« ", 0, "Il manque un espace insécable. Le sens de ce guillemet n’est justifié que si ce paragraphe continue le discours du paragraphe précédent.", ""]], null, null],
    [/(?: |\b)»/g, false, "#1097p", "nbsp_avant_chevrons_fermants1", 4, [[null, "-", " »", 0, "Il manque un espace insécable.", ""]], null, null],
    [/([\].!?\)])»/g, false, "#1099p", "nbsp_avant_chevrons_fermants2", 4, [[null, "-", "\\1 »", 0, "Il manque un espace insécable.", ""]], [0], null],
    [/([:;!?]) (?=[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ«“"])/g, false, "#1101p", "nbsp_après_double_ponctuation", 4, [[null, "-", "\\1 ", 0, "Pas d’espace insécable après le signe “\\1”.", ""]], [0], null],
  ]],
  ["unit", [
    [/((\d+(?:,\d+[⁰¹²³⁴⁵⁶⁷⁸⁹]?|[⁰¹²³⁴⁵⁶⁷⁸⁹]|)) ?)([kcmµn]?(?:[slgJKVΩ]|m[²³]?|Wh?|Hz|dB)|[%‰€$£¥Åℓhj]|min|jours?|semaines|mois|ans?|euros?|heures?|px|MHz|°C|℃)(?![’'])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1117p", "unit_nbsp_avant_unités1", 4, [["_c_unit_nbsp_avant_unités1_1", "-", "=_s_unit_nbsp_avant_unités1_1", 0, "Avec une unité de mesure, mettez un espace insécable.", ""], ["_c_unit_nbsp_avant_unités1_2", "-", "\\2 \\3", 0, "Avec une unité de mesure, mettez un espace insécable.", ""]], [0, 0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/((\d+(?:,\d+[⁰¹²³⁴⁵⁶⁷⁸⁹]?|[⁰¹²³⁴⁵⁶⁷⁸⁹])) ?)([a-zA-Zµ][a-zA-Z0-9Ωℓ⁰¹²³⁴⁵⁶⁷⁸⁹\/·]*)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1122p", "unit_nbsp_avant_unités2", 4, [["_c_unit_nbsp_avant_unités2_1", ">", ""], ["_c_unit_nbsp_avant_unités2_2", "-", "=_s_unit_nbsp_avant_unités2_2", 0, "Si ‹\\3› est une unité de mesure, il manque un espace insécable. Si le nombre se rapporte au mot suivant, c’est aussi valable.", ""], ["_c_unit_nbsp_avant_unités2_3", "-", "\\2 \\3", 0, "Si ‹\\3› est une unité de mesure, il manque un espace insécable. Si le nombre se rapporte au mot suivant, c’est aussi valable.", ""]], [0, 0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/((\d+) )([a-zA-Zµ][a-zA-Z0-9Ωℓ⁰¹²³⁴⁵⁶⁷⁸⁹\/·]*)(?![’'])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1128p", "unit_nbsp_avant_unités3", 4, [["_c_unit_nbsp_avant_unités3_1", ">", ""], ["_c_unit_nbsp_avant_unités3_2", "-", "=_s_unit_nbsp_avant_unités3_2", 0, "Si ‹\\3› est une unité de mesure, il manque un espace insécable. Si le nombre se rapporte au mot suivant, c’est aussi valable.", ""], ["_c_unit_nbsp_avant_unités3_3", "-", "\\2 \\3", 0, "Si ‹\\3› est une unité de mesure, il manque un espace insécable. Si le nombre se rapporte au mot suivant, c’est aussi valable.", ""]], [0, 0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["typo", [
    [/(?:cos|sin|tan|cotan|log|ln)²? [2-9]?[a-zA-Zα-ωΑ-Ω](?![’'])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1159p", "typo_math", 4, [[null, "-", "=_s_typo_math_1", 0, "Mettez des parenthèses (ou éventuellement un espace insécable).", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/^[-_][  ]/g, false, "#1175p", "typo_tiret_début_ligne", 4, [[null, "-", "— |– ", 0, "Dialogues et énumérations : un tiret cadratin [1] ou demi-cadratin [2], suivi d’un espace insécable, est requis.", ""]], null, null],
    [/^ *«[  ](-[  ])/g, false, "#1176p", "typo_tiret_dans_dialogue", 4, [[null, "-", "— |– ", 1, "Dialogues : un tiret cadratin [1] ou demi-cadratin [2], suivi d’un espace insécable, est requis. (Attention : à moins qu’il s’agisse d’un dialogue inclus dans un autre dialogue, cette manière d’écrire est erronée.)", ""]], ["$"], null],
  ]],
  ["nbsp", [
    [/^([—–]) +/g, false, "#1178p", "nbsp_après_tiret1", 4, [[null, "-", "\\1 ", 0, "Dialogues et énumérations : ce tiret doit être suivi d’un espace insécable.", ""]], [0], null],
    [/^([—–-])\d/g, false, "#1179p", "nbsp_après_tiret2", 4, [[null, "-", "— |– |−", 1, "Dialogues et énumérations : il faut tiret cadratin [1] ou demi-cadratin [2] suivi d’un espace insécable. S’il s’agit de représenter un nombre négatif, utilisez le signe “moins” [3].", ""]], [0], null],
    [/^([—–-])[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ«“‘]/g, false, "#1180p", "nbsp_après_tiret3", 4, [[null, "-", "— |– ", 1, "Dialogues et énumérations : il faut tiret cadratin [1] ou demi-cadratin [2] suivi d’un espace insécable.", ""]], [0], null],
  ]],
  ["typo", [
    [/ - (?=[0-9])/g, false, "#1181p", "typo_tiret_incise1", 4, [[null, "-", " – | — | − | −", 0, "Tiret d’incise : un tiret demi-cadratin [1] ou cadratin [2] est requis. (Ou éventuellement le signe “moins” s’il s’agit d’une soustraction [3] ou de représenter un nombre négatif [4].)", ""]], null, null],
    [/ - (?![0-9])/g, false, "#1182p", "typo_tiret_incise2", 4, [[null, "-", " – | — | − ", 0, "Tiret d’incise : un tiret demi-cadratin [1] ou cadratin [2] est requis. (Ou éventuellement le signe “moins” [3], s’il s’agit d’une soustraction.)", ""]], null, null],
    [/-(\d+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1201p", "typo_signe_moins", 4, [["_c_typo_signe_moins_1", "-", "– \\1|— \\1|−\\1", 0, "Pour une incise, utilisez un tiret demi-cadratin [1] ou un tiret cadratin [2]. Pour un nombre négatif, utilisez le signe typographique “moins” [3].", ""]], ["$"], null],
    [/(\d+) ?[x*] ?(\d+)/g, false, "#1208p", "typo_signe_multiplication", 4, [["_c_typo_signe_multiplication_1", "-", "\\1 × \\2", 0, "Signe de multiplication typographique.", ""]], [0, "$"], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ  ](<=)[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ  ]/g, false, "#1217p", "typo_inférieur_ou_égal", 4, [[null, "-", "≤|⩽", 1, "Signe “inférieur ou égal”.", ""]], ["*"], null],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ  ](>=)[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ  ]/g, false, "#1218p", "typo_supérieur_ou_égal", 4, [[null, "-", "≥|⩾", 1, "Signe “supérieur ou égal”.", ""]], ["*"], null],
  ]],
  ["liga", [
    [/[ﬁﬂﬀﬃﬄﬅﬆ]/g, false, "#1225p", "ligatures_typographiques", 4, [[null, "-", "=_s_ligatures_typographiques_1", 0, "Suppression de la ligature typographique.", ""]], null, null],
  ]],
  ["nf", [
    [/[nN][fF][  -]?(?:c|C|e|E|p|P|q|Q|s|S|x|X|z|Z|[eE][nN](?:[  -][iI][sS][oO]|))[  -]?[0-9]+(?:[\/ ‑-][0-9]+|)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1241p", "nf_norme_française", 4, [["_c_nf_norme_française_1", "-", "=_s_nf_norme_française_1", 0, "Norme française. Utilisez les espaces et tirets insécables.", "http://fr.wikipedia.org/wiki/Liste_de_normes_NF"]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["typo", [
    [/(«[  ])[^»“]+?(”)/g, false, "#1256p", "typo_cohérence_guillemets_chevrons_ouvrants", 4, [["_c_typo_cohérence_guillemets_chevrons_ouvrants_1", "-", "“", 1, "Guillemet ouvrant différent du guillemet fermant (”).", ""], ["_c_typo_cohérence_guillemets_chevrons_ouvrants_2", "-", " »", 2, "Guillemet fermant différent du guillemet ouvrant («).", ""]], [0, "$"], null],
    [/(“)[^”«]+?([  ]»)/g, false, "#1260p", "typo_cohérence_guillemets_chevrons_fermants", 4, [["_c_typo_cohérence_guillemets_chevrons_fermants_1", "-", "« ", 1, "Guillemet ouvrant différent du guillemet fermant (»).", ""], ["_c_typo_cohérence_guillemets_chevrons_fermants_2", "-", "”", 2, "Guillemet fermant différent du guillemet ouvrant (“).", ""]], [0, "$"], null],
    [/(“)[^”’“«]+?(’)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ'’)])/g, false, "#1269p", "typo_cohérence_guillemets_doubles_ouvrants", 4, [["_c_typo_cohérence_guillemets_doubles_ouvrants_1", ">", ""], ["_c_typo_cohérence_guillemets_doubles_ouvrants_2", "-", "‘", 1, "Guillemet ouvrant différent du guillemet fermant (’).", ""], ["_c_typo_cohérence_guillemets_doubles_ouvrants_3", "-", "”", 2, "Guillemet fermant différent du guillemet ouvrant (“).", ""]], [0, "$"], null],
    [/(‘)[^’“«]+?(”)/g, false, "#1274p", "typo_cohérence_guillemets_doubles_fermants", 4, [["_c_typo_cohérence_guillemets_doubles_fermants_1", "-", "“", 1, "Guillemet ouvrant différent du guillemet fermant (”).", ""], ["_c_typo_cohérence_guillemets_doubles_fermants_2", "-", "’", 2, "Guillemet fermant différent du guillemet ouvrant (‘).", ""]], [0, "$"], null],
    [/(“)[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][^”"»]+$/gi, true, "#1285p", "typo_guillemets_doubles_ouvrants_non_fermés", 4, [[null, "-", "_", 1, "Guillemets fermants introuvables dans la suite du paragraphe.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/^[^“„«"]+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ](”)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1288p", "typo_guillemets_doubles_fermants_non_ouverts", 4, [[null, "-", "_", 1, "Guillemets ouvrants introuvables dans ce paragraphe.", ""]], ["$"], null],
    [/(‘)[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][^’']+$/gi, true, "#1296p", "typo_guillemet_simple_ouvrant_non_fermé", 4, [["_c_typo_guillemet_simple_ouvrant_non_fermé_1", "-", "_", 1, "Guillemet fermant introuvable dans la suite du paragraphe.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/^[^‘']+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ](’)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1299p", "typo_guillemet_simple_fermant_non_ouvert", 4, [["_c_typo_guillemet_simple_fermant_non_ouvert_1", "-", "_", 1, "Guillemet ouvrant introuvable dans ce paragraphe.", ""]], ["$"], null],
  ]],
  ["num", [
    [/\d\d\d\d+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1317p", "num_grand_nombre_soudé", 4, [["_c_num_grand_nombre_soudé_1", ">", ""], ["_c_num_grand_nombre_soudé_2", "-", "=_s_num_grand_nombre_soudé_2", 0, "Formatage des grands nombres.", ""], ["_c_num_grand_nombre_soudé_3", "-", "=_s_num_grand_nombre_soudé_3", 0, "Formatage des grands nombres.", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/(\d\d\d\d)[  ]([a-zA-Zµ][a-zA-Z0-9Ωℓ⁰¹²³⁴⁵⁶⁷⁸⁹\/·]*)(?![’'])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1325p", "num_nombre_quatre_chiffres", 4, [["_c_num_nombre_quatre_chiffres_1", "-", "=_s_num_nombre_quatre_chiffres_1", 1, "Formatage des grands nombres.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$", ",$"]],
  ]],
  ["", [
    [/\d\d?\d?(?:\.\d\d\d)+(?![0-9])/g, false, "#1352p", "num_grand_nombre_avec_points", 4, [["_c_num_grand_nombre_avec_points_1", "-", "=_s_num_grand_nombre_avec_points_1", 0, "Grands nombres : utilisez des espaces insécables plutôt que des points.", ""], [null, "~", "=_p_num_grand_nombre_avec_points_2", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/\d\d?\d?(?: \d\d\d)+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1360p", "num_grand_nombre_avec_espaces", 4, [["_c_num_grand_nombre_avec_espaces_1", "-", "=_s_num_grand_nombre_avec_espaces_1", 0, "Grands nombres : utilisez des espaces insécables.", ""], [null, "~", "=_p_num_grand_nombre_avec_espaces_2", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["date", [
    [/(\d\d?)([ .\/-])(\d\d?)([ .\/-])(\d\d\d+)(?![ .\/-]\d)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1373p", "date_nombres", 4, [["_c_date_nombres_1", "-", "_", 0, "Cette date est invalide.", ""], [null, "~", "\\1-\\3-\\5", 0]], [0, "*", "w", "**", "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$", "\\d[ .\\/-]$"]],
  ]],
  ["redon1", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])[  ,.;!?:].*[  ](\1)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1392p", "redondances_paragraphe", 4, [["_c_redondances_paragraphe_1", "-", "_", 2, "Dans ce paragraphe, répétition de « \\1 » (à gauche).", ""], ["_c_redondances_paragraphe_2", "-", "_", 1, "Dans ce paragraphe, répétition de « \\1 » (à droite).", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["ocr", [
    [/[  ]7(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1410p", "ocr_point_interrogation", 3, [["_c_ocr_point_interrogation_1", "-", " ?", 0, "Erreur de numérisation ?", ""]], null, null],
    [/[  ]I(?![ ’'][aâeéèêëiîïoôuy])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1419p", "ocr_exclamation1", 3, [[null, "-", " !", 0, "Erreur de numérisation ?", ""]], null, null],
    [/[  ]1(?= [A-ZÉÈÂÎ])(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1422p", "ocr_exclamation2", 3, [["_c_ocr_exclamation2_1", "-", " !", 0, "Erreur de numérisation ?", ""]], null, null],
    [/[\dOI][\dOI]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1433p", "ocr_nombres", 3, [["_c_ocr_nombres_1", "-", "11|Il", 0, "Erreur de numérisation ?", ""], ["_c_ocr_nombres_2", "-", "=_s_ocr_nombres_2", 0, "Erreur de numérisation ?", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+-(On|Ils?|Elles?|Tu|Je|Nous|Vous|Mêmes?|Ci|Là|Une?s|Les?|La|Leur)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1443p", "ocr_casse_pronom_vconj", 3, [[null, "-", "=_s_ocr_casse_pronom_vconj_1", 1, "Erreur de numérisation ? Casse douteuse.", ""]], ["$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+-[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1453p", "mots_composés_inconnus", 3, [["_c_mots_composés_inconnus_1", "-", "_", 0, "Erreur de numérisation ? Mot composé inconnu du dictionnaire.", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)‑([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1467p", "tu_trait_union_conditionnel", 3, [[null, "-", "\\1\\2|\\1-\\2", 0, "Trait d’union conditionnel. Erreur de numérisation ?", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]*[{}<>&*#£^|]+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]*/g, false, "#1475p", "ocr_caractères_rares", 3, [["_c_ocr_caractères_rares_1", "-", "_", 0, "Erreur de numérisation ? Cette chaîne contient un caractère de fréquence rare.", ""]], null, null],
    [/[\]\[({}][\]\[({}]+/g, false, "#1485p", "ocr_doublons_caractères_rares", 3, [[null, "-", "_", 0, "Erreur de numérisation ? Succession douteuse de caractères.", ""]], null, null],
    [/[1[\]][easrnxiocuwàéè](?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1494p", "ocr_le_la_les_regex", 3, [["_c_ocr_le_la_les_regex_1", "-", "le", 0, "Erreur de numérisation ?", ""], ["_c_ocr_le_la_les_regex_2", "-", "la", 0, "Erreur de numérisation ?", ""], ["_c_ocr_le_la_les_regex_3", "-", "la|là", 0, "Erreur de numérisation ?", ""], ["_c_ocr_le_la_les_regex_4", "-", "le|la", 0, "Erreur de numérisation ?", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["conf", [
    [/[1[\]][ea]s?(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1508p", "conf_1e_1a_1es", 5, [["_c_conf_1e_1a_1es_1", "-", "le", 0, "Erreur de frappe ?", ""], ["_c_conf_1e_1a_1es_2", "-", "la", 0, "Erreur de frappe ?", ""], ["_c_conf_1e_1a_1es_3", "-", "les", 0, "Erreur de frappe ?", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["ocr", [
    [/[1[\]][ea]s(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1520p", "ocr_les", 3, [[null, "-", "les", 0, "Erreur de numérisation ?", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([1[][’'`‘])[aâeéèêëiîïoôuyh][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]*(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1528p", "ocr_l_regex", 3, [[null, "-", "l’|L’|j’|J’", 1, "Erreur de numérisation ?", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/1fs?(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1536p", "ocr_il_regex", 3, [["_c_ocr_il_regex_1", "-", "Ils|ils|ifs", 0, "Erreur de numérisation ?", ""], ["_c_ocr_il_regex_2", "-", "Il|il|if", 0, "Erreur de numérisation ?", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["", [
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+‑[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+‑[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1553p", "p_trait_union_conditionnel1", 4, [[null, "~", "=_p_p_trait_union_conditionnel1_1", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+‑[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1554p", "p_trait_union_conditionnel2", 4, [[null, "~", "=_p_p_trait_union_conditionnel2_1", 0]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([?!…][?!…  ]*)[ "'”» ]*,/g, false, "#1557p", "p_fin_dialogue", 4, [[null, "~", "*", 1]], [0], null],
  ]],
],

    lSentenceRules: [
  ["", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+) {1,3}\1(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1621s", "doublon", 4, [["_c_doublon_1", "-", "\\1", 0, "Doublon.", ""]], [0], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["num", [
    [/[\dO]+[O][\dO]+(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1635s", "num_lettre_O_zéro1", 4, [["_c_num_lettre_O_zéro1_1", "-", "=_s_num_lettre_O_zéro1_1", 0, "S’il s’agit d’un nombre, utilisez le chiffre « 0 » plutôt que la lettre « O ».", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/[1-9]O(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/g, false, "#1636s", "num_lettre_O_zéro2", 4, [["_c_num_lettre_O_zéro2_1", "-", "=_s_num_lettre_O_zéro2_1", 0, "S’il s’agit d’un nombre, utilisez le chiffre « 0 » plutôt que la lettre « O ».", ""]], null, ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["", [
    [/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/g, false, "#1646s", "p_exposants", 4, [[null, "~", "*", 0]], null, null],
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+)(\d+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1650s", "p_références_aux_notes", 4, [["_c_p_références_aux_notes_1", "~", "*", 2]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["tu", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)(?:--|—|–|−|⁃)([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1659s", "tu_trait_union_douteux", 7, [["_c_tu_trait_union_douteux_1", "-", "\\1-\\2", 0, "Trait d’union : un tiret simple suffit.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
    [/([-–—− ]t(?:[’' ][-–—−]?|[-–—−][’' ]?))(ie?ls?|elles?|on|tu)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1667s", "tu_t_euphonique_incorrect", 7, [["_c_tu_t_euphonique_incorrect_1", "-", "-", 1, "Le “t” euphonique n’est pas nécessaire avec “\\2”.", "http://bdl.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?T1=t+euphonique&id=2513"], ["_c_tu_t_euphonique_incorrect_2", "-", "-t-", 1, "Pour le “t” euphonique, il faut deux traits d’union. Pas d’apostrophe. Pas d’espace.", ""], ["_c_tu_t_euphonique_incorrect_3", "~", "-t-", 1]], [0, "$"], null],
    [/[td]([- ]t[-’' ])(?:ie?l|elle|on)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1672s", "tu_t_euphonique_superflu", 7, [[null, "-", "-", 1, "Le “t” euphonique est superflu quand le verbe se termine par “t” ou “d”.", "http://bdl.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?T1=t+euphonique&id=2513"], ["_c_tu_t_euphonique_superflu_2", "~", "-t-", 1]], [1], null],
  ]],
  ["eleu", [
    [/[aec](-(ie?l|elle|on))(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#1676s", "eleu_t_euphonique_manquant", 4, [[null, "-", "-t-\\2", 1, "Euphonie. Il faut un “t” euphonique.", "http://bdl.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?T1=t+euphonique&id=2513"]], [1, 2], null],
  ]],
  ["@@@@", [
    ['graphe0', '#1712s'],
    ['graphe1', '#2621s'],
    ['ocr', '#3929s'],
    ['graphe2', '#4888s'],
    ['intergraphe12a', '#20085s'],
    ['intergraphe12b', '#20480s'],
  ]],
  ["redon2", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ-]+[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ])[ ,].* (\1)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#21092s", "redondances_phrase", 4, [["_c_redondances_phrase_1", "-", "_", 2, "Dans cette phrase, répétition de “\\1” (à gauche).", ""], ["_c_redondances_phrase_2", "-", "_", 1, "Dans cette phrase, répétition de “\\1” (à droite).", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["mc", [
    [/([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)-([a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ][a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ]+)(?![a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ–-])/gi, true, "#21106s", "mc_mot_composé", 4, [["_c_mc_mot_composé_1", ">", ""], ["_c_mc_mot_composé_2", "-", "\\1\\2", 0, "Vous pouvez ôter le trait d’union.", ""], ["_c_mc_mot_composé_3", "-", "_", 0, "Mot inconnu du dictionnaire.", ""]], [0, "$"], ["[a-zA-Zà-öÀ-Ö0-9_ø-ÿØ-ßĀ-ʯ.,–-]$"]],
  ]],
  ["@@@@", [
    ['graphe3', '#21126s'],
    ['prégraphe_gv1', '#29822s'],
    ['verbes1', '#30052s'],
    ['verbes2', '#33901s'],
  ]],
]
};


if (typeof(exports) !== 'undefined') {
    exports.lParagraphRules = gc_rules.lParagraphRules;
    exports.lSentenceRules = gc_rules.lSentenceRules;
}
