
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
    /** @type {HTMLDivElement | undefined} */
    loader: undefined,
    /** @type {HTMLAnchorElement} */
    linkNewPlugin: document.getElementById('link_newPlugin'),
    /** @type {HTMLDivElement} */
    pluginsList: document.getElementById('plugins'),
    /** @type {HTMLDivElement} */
    divMain: document.getElementById('div_main'),
    /** @type {HTMLButtonElement} */
    btnUpdateAll: document.getElementById('btn_updateAll'),
    /** @type {HTMLInputElement} */
    inpSearch: document.getElementById('inp_search'),
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
    /**
     * @param {string} guid
     * @returns {HTMLDivElement | null} */
    getSelectedPlugin(guid) {
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
            style = style.replace(/#445799/g, 'rgba(0, 0, 0, 0.8)');
        } else {
            document.body.classList.remove('white_bg');
            rule += '.btn_install{background-color: #e0e0e0 !important; color: #333 !important}\n';
            rule += '.btn_install:hover{background-color: #fcfcfc !important;}\n';
            rule += '.btn_install:active{background-color: #fcfcfc !important;}\n';
            rule += '.div_offered_votes{color: rgba(255,255,255,0.8) !important;}\n';
            rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #e0e0e0 !important; color: #333 !important; border:1px solid #e0e0e0 !important;}\n';
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
     * @param {number} numOfAllPlugins 
     * @param {number} numOfInstalledPlugins 
     * @param {number} numOfPluginsToUpdate 
     */
    updateMainCategories(numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate) {
        const mainCounter = this.pluginsList.querySelector('.filter-by-installed .marketplace .amount');
        const installedCounter = this.pluginsList.querySelector('.filter-by-installed .installed .amount');
        const updatesCounter = this.pluginsList.querySelector('.filter-by-installed .updates .amount');
        if (mainCounter) {
            mainCounter.textContent = numOfAllPlugins.toString();
        }
        if (installedCounter) {
            installedCounter.textContent = numOfInstalledPlugins.toString();
        }
        if (updatesCounter) {
            updatesCounter.textContent = numOfPluginsToUpdate.toString();
        }
    },
    /**
     * @param {Map<string, number>} categories
     */
    updateCategories(categories) {
        const self = this;
        this.pluginsList.querySelectorAll('.filter-by-category .amount').forEach(element => {
            element.textContent = '0';
        });
        /**
         * @param {number} value 
         * @param {string} key 
         * @returns 
         */    
        const makeCategoryItem = function(value, key) {
            let cat = self.pluginsList.querySelector('.filter-by-category .' + key);
            if (!cat) {
                return;
            }
            let span = cat.querySelector('.amount');
            if (span) {
                span.textContent = String(value);
            }

        };
        if (categories.size) {
            categories.forEach((value, key) => {
                makeCategoryItem(value, key);
            });
        }
    },
    
    /**
     * @param {boolean} show 
     * @param {string} [text]
     */
    toggleLoader: function(show, text) {
        // show or hide loader (don't use UI for this function)
        let loaderContainer = document.getElementById('loader-container');
        if (!loaderContainer) {
            return;
        }
        if (!show) {
            clearTimeout(timeout);
            loaderContainer.classList.add('hidden');
            this.loader && (this.loader.remove ? this.loader.remove() : loaderContainer.removeChild(this.loader));
            this.loader = undefined;	
        } else if (!this.loader) {
            loaderContainer.classList.remove('hidden');
            this.loader = showLoader(loaderContainer, ( Utils.getTranslated(text || '') ) + '...');
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