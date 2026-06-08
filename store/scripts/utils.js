/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

// @ts-check
/// <reference path="./types.js" />

const Utils = {
    /** @type {Object<string, string>} */
    translate: {'Loading': 'Loading'}, // translations for current language (thouse will necessary if we don't get translation file)
    /** @param {string} shortLang */
    init: function(shortLang) {
        switch (shortLang) {
            case 'ru':
                this.translate["Loading"] = "Загрузка"
                break;
            case 'fr':
                this.translate["Loading"] = "Chargement"
                break;
            case 'es':
                this.translate["Loading"] = "Carga"
                break;
            case 'de':
                this.translate["Loading"] = "Laden"
                break;
            case 'cs':
                this.translate["Loading"] = "Načítání"
                break;
            case 'it':
                this.translate["Loading"] = "Caricamento"
                break;
            case 'ja':
                this.translate["Loading"] = "積み込み"
                break;
            case 'pt':
                this.translate["Loading"] = "Carregamento"
                break;
            case 'si':
                this.translate["Loading"] = "පැටවීම"
                break;
            case 'uk':
                this.translate["Loading"] = "Вантаження"
                break;
            case 'zh':
                this.translate["Loading"] = "装载量"
                break;
        }
    },
    /**
     * Resolves after the browser has had a chance to paint a frame.
     * Uses double rAF so DOM mutations made just before the call are visually applied.
     * @returns {Promise<void>}
     */
    waitForRepaint: function() {
        return new Promise(function(resolve) {
            requestAnimationFrame(function() {
                requestAnimationFrame(function() { resolve(); });
            });
        });
    },
    /**
     * @param {string} text
     * @returns {string}
     */
    getTranslated: function(text) {
        text = text.trim().replace(/\s+/g, " ");
        if (this.translate[text]) {
            return this.translate[text];
        }
        if (window.Asc && window.Asc.plugin && window.Asc.plugin.tr) {
            const translated = window.Asc.plugin.tr(text);
            return translated || text;
        }
        return text;
    },
    translateAll: function() {
        const self = this;
        const nodes = document.querySelectorAll(".i18n");
        const attrs = ["placeholder", "title"];
        for (let i = 0; i < nodes.length; i++) {
            const el = nodes[i];
            if (el instanceof HTMLElement === false) continue;

            for (let j = 0; j < attrs.length; j++) {
                const attr = attrs[j];
                if (el.hasAttribute(attr)) {
                    el.setAttribute(
                        attr,
                        self.getTranslated(el.getAttribute(attr) || "")
                    );
                }
            }

            const translated = self.getTranslated(
                (el.textContent || "").trim().replace(/\s+/g, " ")
            );
            if (translated) el.textContent = translated;
        }
    },
    /** @param {Object<string, string>} translations */
    setTranslations: function(translations) {
        this.translate = Object.assign(this.translate, translations);
    },
    /**
     * @param {string} text 
     * @returns {number}
     */
    convertPluginVersionToNumber: function(text) {
        let factor = 1000;
        let major = 1;
        let minor = 0;
        let build = 0;

        if (text && text.split) {
            let arValues = text.split('.');
            let count = arValues.length;
            if (count > 0) major = parseInt(arValues[0]);
            if (count > 1) minor = parseInt(arValues[1]);
            if (count > 2) build = parseInt(arValues[2]);
        }

        return major * factor * factor + minor * factor + build;
    },
    /**
     * @param {*} data 
     * @returns {Rating | null}
     */
    parseRatingPage: function(data) {
        // if we load this page, parse it
        /** @type {Rating | null} */
        let result = null;
        if (data !== 'Not Found') {
            try {
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, "text/html");
                // we will have a problem if github change their page
                let first = Number(doc.getElementById('result-row-1').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
                let second = Number(doc.getElementById('result-row-2').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
                let third = Number(doc.getElementById('result-row-3').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
                let fourth = Number(doc.getElementById('result-row-4').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
                let fifth = Number(doc.getElementById('result-row-5').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
                let total = Number(doc.getElementsByClassName('text-small color-fg-subtle')[0].childNodes[1].firstChild.textContent.replace(/[\n\sa-z]/g,''));
                first = Math.ceil(total * first / 100) * 5;   // it's 5 stars
                second = Math.ceil(total * second / 100) * 4; // it's 4 stars
                third = Math.ceil(total * third / 100) * 3;   // it's 3 stars
                fourth = Math.ceil(total * fourth / 100) * 2; // it's 2 stars
                fifth = Math.ceil(total * fifth / 100);       // it's 1 star
                let average = total === 0 ? 0 : (first + second + third + fourth + fifth) / total;
                let percent = average / 5 * 100;
                result = {
                    total: total,
                    average: average.toFixed(1),
                    percent: percent
                };
            } catch (error) {
                // nothing to do
                return result;
            }
        }
        return result;
    },
    /**
     * @param {string} changelog 
     * @returns {string}
     */
    makeChangeLogHtml: function(changelog) {
        const settings = this._getMarkedSetting();
        let value = this._parseChangelog(changelog);
        let lexed = marked.lexer(value, settings);
        return marked.parser(lexed, settings);
    },
    /** @param {string} data */
    _parseChangelog: function(data) {
        let arr = data.replace('# Change Log', '').split('\n\n## ');
        if (arr[0] == '')
            arr.shift();

        let indLast = arr.length - 1;
        let end = arr[0].indexOf('\n\n');
        let firstVersion = this.convertPluginVersionToNumber( arr[0].slice(0, end) );
        end = arr[indLast].indexOf('\n\n');
        let lastVersion = this.convertPluginVersionToNumber( arr[indLast].slice(0, end) );
        if (lastVersion > firstVersion)
            arr = arr.reverse();

        return ( '## ' + arr.join('\n\n## ') );
    },
    _getMarkedSetting: function() {
        // function for marked librry
        let defaults = {};
        const settings = {};
        if (typeof marked.getDefaults === 'function') {
            defaults = marked.getDefaults();
        } else if ('defaults' in marked) {
            for (let prop in marked.defaults) {
                defaults[prop] = marked.defaults[prop];
            }
        }

        const invalidOptions = [
            'renderer',
            'tokenizer',
            'walkTokens',
            'extensions',
            'highlight',
            'sanitizer'
        ];

        for (let prop in defaults) {
            if (!invalidOptions.includes(prop))
            settings[prop] = defaults[prop]
        }

        return settings;
    },

};