
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

const UI = {
    /** @type {HTMLAnchorElement} */
    linkNewPlugin: document.getElementById('link_newPlugin'),
    /** @type {HTMLDivElement} */
    pluginsList: document.getElementById('plugins'),
    /** @type {HTMLDivElement} */
    divMain: document.getElementById('div_main'),
    /** @type {HTMLDivElement} */
    divSelected: document.getElementById('div_selected_toolbar'),
    /** @type {HTMLDivElement} */
    divSelectedMain: document.getElementById('div_selected_main'),
    /** @type {HTMLImageElement} */
    imgIcon: document.getElementById('img_icon'),
    /** @type {HTMLSpanElement} */
    spanName: document.getElementById('span_name'),
    /** @type {HTMLSpanElement} */
    spanOffered: document.getElementById('span_offered'),
    /** @type {HTMLButtonElement} */
    btnUpdate: document.getElementById('btn_update'),
    /** @type {HTMLButtonElement} */
    btnRemove: document.getElementById('btn_remove'),
    /** @type {HTMLButtonElement} */
    btnInstall: document.getElementById('btn_install'),
    /** @type {HTMLSpanElement} */
    spanSelectedDescr: document.getElementById('span_selected_description'),
    /** @type {HTMLAnchorElement} */
    linkPlugin: document.getElementById('link_plugin'),
    /** @type {HTMLSpanElement} */
    arrowNext: document.getElementById('next_arrow'),
    /** @type {HTMLSpanElement} */
    arrowPrev: document.getElementById('prev_arrow'),
    /** @type {HTMLButtonElement} */
    btnUpdateAll: document.getElementById('btn_updateAll'),
    /** @type {HTMLAnchorElement} */
    discussionLink: document.getElementById('discussion_link'),
    /** @type {HTMLDivElement} */
    divDescriptionSelected: document.getElementById('div_description_selected'),
    /** @type {HTMLDivElement} */
    divGitLink: document.getElementById('div_github_link'),
    /** @type {HTMLDivElement} */
    divLanguages: document.getElementById('div_languages'),
    /** @type {HTMLDivElement} */
    divMinVersion: document.getElementById('div_min_version'),
    /** @type {HTMLDivElement} */
    divRatingLink: document.getElementById('div_rating_link'),
    /** @type {HTMLDivElement} */
    divReadme: document.getElementById('div_readme_link'),
    /** @type {HTMLDivElement} */
    divSelectedImage: document.getElementById("div_selected_image"),
    /** @type {HTMLDivElement} */
    divSelectedPreview: document.getElementById("div_selected_preview"),
    /** @type {HTMLDivElement} */
    divStarsColored: document.getElementById("stars_colored"),
    /** @type {HTMLDivElement} */
    divVersion: document.getElementById('div_version'),
    /** @type {HTMLDivElement} */
    divVotes: document.getElementById('div_votes'),
    /** @type {HTMLInputElement} */
    inpSearch: document.getElementById('inp_search'),
    /** @type {HTMLAnchorElement} */
    linkReadme: document.getElementById('link_readme'),
    /** @type {HTMLDivElement} */
    ratingStars: document.getElementById('div_rating_stars'),
    /** @type {HTMLSpanElement} */
    spanLanguages: document.getElementById('span_langs'),
    /** @type {HTMLSpanElement} */
    spanMinVersion: document.getElementById('span_min_ver'),
    /** @type {HTMLSpanElement} */
    spanVersion: document.getElementById('span_ver'),
    /** @type {HTMLSpanElement} */
    totalVotes: document.getElementById('total_votes'),
    /** @type {Object<string, HTMLDivElement>} */
    _plugins: {},

    /**
     * @param {string} guid
     * @param {HTMLDivElement} element
     */
    addPlugin(guid, element) {
	    this.divMain.appendChild(element);
        this._plugins[guid] = element;
    },
    /**
     * @param {string} guid 
     * @returns {HTMLDivElement | undefined}
     */
    getPlugin(guid) {
        return this._plugins[guid];
    },
    /**
     * @param {string} guid 
     * @returns {HTMLButtonElement | undefined}
     */
    getPluginButton(guid) {
        const pluginPlate = this._plugins[guid];
	    if (!pluginPlate) return;
        const button = this._plugins[guid].querySelector('.management button');
        if (button instanceof HTMLButtonElement) {
            return button;
        }
    },
    /** @returns {HTMLDivElement | null} */
    getSelectedPlugin() {
        let guid = this.divSelected.getAttribute('data-guid');
        if (!guid) {
            return null;
        }
		const div = this._plugins[guid];
		return div;
    },
    /** @param {'light' | string} themeType */
    init(themeType) {
        const self = this;
        let rule = '\n.asc-plugin-loader{background-color:' + (themeType == 'light' ? '#ffffff' : '#333333') + ';padding: 10px;display: flex;justify-content: center;align-items: center;border-radius: 5px;}\n'
        rule += '.asc-plugin-loader{color:' + (themeType == 'light' ? '#444444' : 'rgba(255,255,255,0.8)') + '}\n';
        let styleTheme = document.createElement('style');
        styleTheme.innerHTML = rule;
        document.head.appendChild(styleTheme);

        this.pluginsList.querySelectorAll('input[name="main-filter"]').forEach(function(input) {
            input.onchange = function(event) {
                if (!event.currentTarget || event.currentTarget instanceof HTMLInputElement === false) {
                    return;
                }

                /** @type {InstalledFilter} */
                const installedFilter = event.currentTarget.value;
                self.onChangeMainFilter(installedFilter);
            }
        });

        document.querySelectorAll('input[name="category-filter"]').forEach(function(input) {
            input.onchange = function(event) {
                const value = event.currentTarget.value;
                self.onChangeCategoryFilter(value);
            };
        });

        this.inpSearch.addEventListener('input', this._debounce(function(/** @type {Event} */ event) {
            if (!event.target || event.target instanceof HTMLInputElement === false) {
                return;
            }
            self.onChangeSearchInput(event.target.value.trim().toLowerCase());
        }, 500));
    },
    /** @param {InstalledFilter} installedFilter */
    onChangeMainFilter: function(installedFilter) {},
    /** @param {CategoryFilter} value */
    onChangeCategoryFilter: function(value) {},
    /** @param {string} searchInput */
    onChangeSearchInput: function(searchInput) {},
    /**
     * @param {*} theme
     * @param {'light'|string} themeType
     * @param {string} style
     */
    onChangeTheme: function(theme, themeType, style) {

        let rule = '.text-secondary{color:'+theme["text-secondary"]+';}\n';

        if (themeType.includes('light')) {
            document.body.classList.add('white_bg');
            rule += '.btn_install{background-color: #444 !important; color: #fff !important}\n';
            rule += '.btn_install:hover{background-color: #1c1c1c !important;}\n';
            rule += '.btn_install:active{background-color: #1c1c1c !important;}\n';
            rule += '.div_offered_votes{color: rgba(0,0,0,0.45) !important;}\n';
            rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #444 !important; color: #fff !important; border:1px solid #444 !important;}\n';
            rule += '.select2-container--default .select2-results__option[aria-selected=true] { color: black;}\n'
            style = style.replace(/#445799/g, 'rgba(0, 0, 0, 0.8)');
        } else {
            document.body.classList.remove('white_bg');
            rule += '.btn_install{background-color: #e0e0e0 !important; color: #333 !important}\n';
            rule += '.btn_install:hover{background-color: #fcfcfc !important;}\n';
            rule += '.btn_install:active{background-color: #fcfcfc !important;}\n';
            rule += '.div_offered_votes{color: rgba(255,255,255,0.8) !important;}\n';
            rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #e0e0e0 !important; color: #333 !important; border:1px solid #e0e0e0 !important;}\n';
            rule += '.select2-container--default .select2-results__option--highlighted[aria-selected] { background-color : #555 !important; color: white !important;}';
            style = style.replace('.select2-container--default .select2-results__option--highlighted[aria-selected] {background-color : #555 !important; }','.select2-container--default .select2-results__option--highlighted[aria-selected] { background-color : #555 !important; color: white !important;}');
            style = style.replace(/#b5e4ff/g, 'rgba(255, 255, 255, 0.8)');
        }

        let styleTheme = document.getElementById('theme_style');
        if (!styleTheme) {
            styleTheme = document.createElement('style');
            styleTheme.id = 'theme_style';
            document.head.appendChild(styleTheme);
            styleTheme.innerHTML = style + rule;
            return false;
        } else {
            styleTheme.innerHTML = style + rule;
            defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';
            return defaultBG;
        }
    },
    /** @param {string} guid */
    removePlugin(guid) {
        const pluginDiv = this._plugins[guid];
        if (pluginDiv) {
            pluginDiv.remove();
        }
    },

    /** @param {string} guid */
    removeUpdateButton(guid) {
        const pluginDiv = this._plugins[guid];
        const updateBtn = pluginDiv.querySelector('button.update');
        if (updateBtn) {
            updateBtn.remove();
        }
    },
    /** @param {string} value */
    setCheckedInstalledFilter(value) {
        const current = this.pluginsList.querySelector('input[value="' + value + '"]');
        if (!current || current instanceof HTMLInputElement === false) {
            return;
        }
        current.checked = true;
    },
    /**
     * @param {string} guid 
     * @param {string} src 
     * @param {string} bg 
     */
    setPluginImage(guid, bg, src) {
        const pluginDiv = this._plugins[guid];
        if (!pluginDiv) {
            return;
        }
        const imgDiv = pluginDiv.querySelector('.image');
        if (!imgDiv) {
            return;
        }
        imgDiv.setAttribute('style', ('background:' + bg) );
        const image = imgDiv.firstChild;
        if (src && image && image instanceof HTMLImageElement) {
            image.setAttribute('src', src);
        }
    },

    /**
     * @param {Function} fn
     * @param {number} delay
     * @returns {(...args: any[]) => void}
     */
    _debounce(fn, delay) {
        /** @type {ReturnType<typeof setTimeout> | null} */
        let timeoutId = null;
        return function(/** @type {any[]} */ ...args) {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(function() {
                timeoutId = null;
                fn.apply(null, args);
            }, delay);
        };
    },

}