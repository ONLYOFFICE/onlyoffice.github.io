
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
/// <reference path="./utils.js" />

const UI = {
    /** @type {HTMLDivElement | undefined} */
    loader: undefined,
    /** @type {HTMLAnchorElement} */
    linkNewPlugin: document.getElementById('link_newPlugin'),
    /** @type {HTMLSpanElement} */
    linkNewPluginText: document.querySelector('#link_newPlugin .link-text'),
    /** @type {HTMLDivElement} */
    pluginsList: document.getElementById('plugins'),
    /** @type {HTMLDivElement} */
    toolbar: document.getElementById('toolbar_tools'),
    /** @type {HTMLDivElement} */
    toolbarMainText: document.querySelector('.toolbar .place-name'),
    /** @type {HTMLElement} */
    toolbarSecondaryText: document.querySelector('.toolbar h1'),
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
    addPlugin: function(guid, element) {
	    this.divMain.appendChild(element);
        this._plugins[guid] = element;
    },
    /**
     * @param {string} guid 
     * @returns {HTMLDivElement | undefined}
     */
    getPlugin: function(guid) {
        return this._plugins[guid];
    },
    /**
     * @param {string} guid 
     * @returns {HTMLButtonElement | undefined}
     */
    getPluginButton: function(guid) {
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
    getSelectedPlugin: function(guid) {
        if (!guid) {
            return null;
        }
		const div = this._plugins[guid];
		return div;
    },
    /** @param {'light' | string} themeType */
    init: function(themeType) {
        const self = this;
        let rule = '\n.asc-plugin-loader{background-color:' + (themeType == 'light' ? '#ffffff' : '#333333') + ';padding: 10px;display: flex;justify-content: center;align-items: center;border-radius: 5px;}\n'
        rule += '.asc-plugin-loader{color:' + (themeType == 'light' ? '#444444' : 'rgba(255,255,255,0.8)') + '}\n';
        let styleTheme = document.createElement('style');
        styleTheme.innerHTML = rule;
        document.head.appendChild(styleTheme);

        let inputNodes = this.pluginsList.querySelectorAll('input[name="main-filter"]');
        for (let i = 0; i < inputNodes.length; i++) {
            const input = inputNodes[i];
            if (input instanceof HTMLInputElement === false) {
                continue;
            }
            input.onchange = function(event) {
                if (!event.currentTarget || event.currentTarget instanceof HTMLInputElement === false) {
                    return;
                }

                /** @type {MainFilter} */
                const installedFilter = event.currentTarget.value;
                self.onChangeMainFilter(installedFilter);
                const text = input.nextElementSibling.querySelector('.main-filter-category').textContent;
                self.toolbarMainText.textContent = text;
            }
        }

        inputNodes = document.querySelectorAll('input[name="category-filter"]');
        for (let i = 0; i < inputNodes.length; i++) {
            const input = inputNodes[i];
            if (input instanceof HTMLInputElement === false) {
                continue;
            }
            input.onchange = function(event) {
                const value = event.currentTarget.value;
                self.onChangeCategoryFilter(value);
                const text = input.nextElementSibling.querySelector('.category-name').textContent;
                self.toolbarSecondaryText.textContent = text;
            };
        }

        this.inpSearch.addEventListener('input', this._debounce(function(/** @type {Event} */ event) {
            if (!event.target || event.target instanceof HTMLInputElement === false) {
                return;
            }
            self.onChangeSearchInput(event.target.value.trim().toLowerCase());
        }, 500));
    },
    /** @param {MainFilter} installedFilter */
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
        let rule = '';
        //console.log(theme);
        /*Object.keys(theme).forEach(function(key) {
            if (typeof theme[key] === 'string' && (theme[key].indexOf('#') === 0 || theme[key].indexOf('rgb') === 0)) {
                console.log(key + ": %c" + theme[key], 'color: ' + theme[key]);
            }
        });*/

        rule += '.plugin-plate .name span:first-child,\n' +
            '.filter-by label{color: ' + (theme["text-normal"] || 'rgba(0,0,0,0.8)') + ';}\n';
        rule += '.plugin-plate .description,\n' +
            '.toolbar .place-name,\n' +
            '.filter-by label > span:last-of-type{color: ' + (theme["text-secondary"] || 'rgba(0,0,0,0.6)') + ';}\n';
        rule += '.categories-header,\n' +
            '.toolbar .search span,\n' +
            '.plugin-plate .manufacturer,\n' +
            '.toolbar .search input::placeholder,\n' +
            '.filter-by label>span:first-of-type,\n' +
            '.plugin-plate .rating{color: ' + (theme["text-tertiary"] || 'rgba(0,0,0,0.4)') + ';}\n';

        rule += '.plugin-plate{background-color: ' + (theme["background-normal"] || '#fff') + '; border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';
        //rule += 'main{background-color: ' + theme["background-pane"] + ';}\n';

        rule += '.plugin-plate{border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';

        rule += '.plugin-plate .stars{color: ' + (theme["canvas-anim-pane-effect-bar-emphasis-outline"] || '#c49a2a') + ';}\n';
        rule += '.filter-by label:hover{background-color: ' + (theme["highlight-button-hover"] || '#e0e0e0') + ';}\n';
        rule += '.filter-by input:checked + label{background-color: ' + (theme["highlight-button-pressed"] || '#DCDBDB') + ';}\n';
        rule += '.filter-by label > span.mark{color: ' + (theme["text-inverse"] || '#fff') + ';}\n';
        rule += 'aside,\n' +
            '.plugin-plate .management,\n' +
            '.toolbar{border-color: ' + (theme["border-divider"] || '#dfdfdf') + ';}\n';

        rule += 'button.btn_update,\n' +
            'button.btn_update:active{color: ' + (theme["text-contrast-background"] || '#fff') + ';}\n';
        
        if (theme.name === 'theme-classic-light') {
            rule += '.filter-by input:checked + label .category-name,\n' +
                '.filter-by input:checked + label .main-filter-category{color: ' + (theme["text-inverse"] || '#fff') + ';}\n';
            rule += '.filter-by input:checked + label > span:last-of-type{color: ' + (theme["text-inverse"] || '#fff') + ';}\n';
            rule += '.filter-by input:checked + label{background-color: ' + ('#7d858c') + ';}\n';
        }

        if (themeType.includes('light')) {
            rule += '.filter-by input:checked + label>span:first-of-type{color: ' + '#00645b' + ' !important;}\n';    
            rule += '.submit-own-plugin a:visited,\n';
            rule += '.submit-own-plugin a{color: ' + ('#00645b') + ' !important;}\n';    
            rule += '.submit-own-plugin a:hover{color: ' + ('#0e8a7e') + ' !important;}\n';    
            rule += 'button.btn_update:active{background-color: ' + ('#00645b') + ' !important;}\n';    
            rule += 'button.btn_update{border-color: ' + ('#0e8a7e') + ';}\n';    
            rule += 'button.btn_update:hover{background-color: ' + ('#007a6f') + ';}\n';    
            rule += 'button.btn_update,\n';    
            rule += '.plugin-plate .by-onlyoffice,\n';    
            rule += '.filter-by input:checked + label span.onlyoffice,\n';    
            rule += '.filter-by label span.mark{background-color: ' + ('#0e8a7e') + ' !important;}\n';    

            document.body.classList.add('white_bg');
            rule += '.btn_install{background-color: #444 !important; color: #fff !important}\n';
            rule += '.btn_install:hover{background-color: #1c1c1c !important;}\n';
            rule += '.btn_install:active{background-color: #1c1c1c !important;}\n';
            rule += '.div_offered_votes{color: rgba(0,0,0,0.45) !important;}\n';
            rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #444 !important; color: #fff !important; border:1px solid #444 !important;}\n';
            style = style.replace(/#445799/g, 'rgba(0, 0, 0, 0.8)');
        } else {
            document.body.classList.remove('white_bg');
            rule += '.filter-by input:checked + label>span:first-of-type{color: ' + '#60ddc0' + ' !important;}\n';    
            rule += '.submit-own-plugin a:visited,\n';
            rule += '.submit-own-plugin a{color: ' + ('#60ddc0') + ' !important;}\n';    
            rule += '.submit-own-plugin a:hover{color: ' + ('#39bda0') + ' !important;}\n';    
            rule += 'button.btn_update:active{background-color: ' + ('#60ddc0') + ' !important;}\n';    
            rule += 'button.btn_update{border-color: ' + ('#39bda0') + ';}\n';    
            rule += 'button.btn_update:hover{background-color: ' + ('#26b094') + ';}\n';    
            rule += 'button.btn_update,\n';    
            rule += '.plugin-plate .by-onlyoffice,\n';    
            rule += '.filter-by input:checked + label span.onlyoffice,\n';    
            rule += '.filter-by label span.mark{background-color: ' + ('#39bda0') + ' !important;}\n';    

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
            return themeType == 'light' ? "#F5F5F5" : '#555555';
        }
    },
    /** @param {string} guid */
    removePlugin: function(guid) {
        const pluginDiv = this._plugins[guid];
        if (pluginDiv) {
            pluginDiv.remove();
        }
    },

    /** @param {MainFilter} value */
    clickMainFilter: function(value) {
        const current = this.pluginsList.querySelector('input[value="' + value + '"]');
        if (!current || current instanceof HTMLInputElement === false) {
            return;
        }
        current.click();
    },
    /**
     * @param {string} guid 
     * @param {string} bg 
     * @param {{src: string, srcset: string} | null} src 
     */
    setPluginImage: function(guid, bg, src) {
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
            image.setAttribute('src', src.src);
            if (src.srcset) {
                image.setAttribute('srcset', src.srcset);
            } else {
                image.removeAttribute('srcset');
            }
        }
    },
    /**
     * @param {number} numOfAllPlugins 
     * @param {number} numOfInstalledPlugins 
     * @param {number} numOfPluginsToUpdate 
     */
    updateMainCategories: function(numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate) {
        const mainCounter = this.pluginsList.querySelector('.filter-by-installed .marketplace .amount');
        const installedCounter = this.pluginsList.querySelector('.filter-by-installed .installed .amount');
        const updatesCounter = this.pluginsList.querySelector('.filter-by-installed .updates .amount');
        const updates = this.pluginsList.querySelector('.filter-by-installed .updates');
        if (mainCounter) {
            mainCounter.textContent = numOfAllPlugins.toString();
        }
        if (installedCounter) {
            installedCounter.textContent = numOfInstalledPlugins.toString();
        }
        if (updatesCounter && updates) {
            if (numOfPluginsToUpdate) {
                updates.classList.remove('hidden');
                updatesCounter.textContent = numOfPluginsToUpdate.toString();
            } else {
                updates.classList.add('hidden');
                if (updates.querySelector('input:checked')) {

                }
            }
        }
    },
    /**
     * @param {Map<string, number>} categories
     */
    updateCategories: function(categories) {
        const self = this;
        const amountNodes = this.pluginsList.querySelectorAll('.filter-by-category .amount');
        for (let i = 0; i < amountNodes.length; i++) {
            amountNodes[i].textContent = '0';
        }
        /** @type {NodeListOf<HTMLInputElement>} */
        const inputs = this.pluginsList.querySelectorAll('.filter-by-category input[name="category-filter"]');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
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

            const labelFor = cat.getAttribute('for');
            if (!labelFor) {
                return;
            }

            let input = document.getElementById(labelFor);
            if (input) {
                input.removeAttribute('disabled');
            }
        };
        if (categories.size) {
            categories.forEach(function(value, key) {
                makeCategoryItem(value, key);
            });
        }
    },
    /**
     * @param {string} header 
     * @param {string} caption
     * @param {boolean} [bWarning] 
     */
    createNotification: function(header, caption, bWarning) {
        // creates any notification for user inside UI.divMain window (you should clear this element before making notification)
        let div = document.createElement('div');
        div.className = 'div_notification';
        if (bWarning) {
            let icon = document.createElement('div');
            icon.className = 'icon_warning';
            div.appendChild(icon);
        } else {
            let icon = document.createElement('div');
            icon.textContent = '◌';
            icon.className = 'icon_notification';
            div.appendChild(icon);
        }
        let spanMessage = document.createElement('span');
        spanMessage.className = 'message_caption';
        spanMessage.textContent = caption;
        div.appendChild(spanMessage);
        let spanNot = document.createElement('span');
        spanNot.className = 'span_notification';
        spanNot.textContent = header;
        div.appendChild(spanNot);
        UI.divMain.appendChild(div);
        div = document.createElement('div');
        UI.divMain.appendChild(div);
    },
    
    /**
     * @param {Rating} [rating]
     * @param {string} [notRatedText]
     * @returns {string}
     */
    makeRatingElements: function(rating, notRatedText) {
        let result = '';
        if (!rating) {
            result = '<em class="i18n">' + notRatedText + '</em>';
        } else {
            result = '<div class="stars">';
            let percents = rating.percent;
            for (let i = 0; i < 5; i++) {
                let opacity = percents >= 20 ? 1 : percents === 0 ? 0.1 : percents / 20;
                if (opacity === 1) {
                    result += '<span>★</span>';
                } else {
                    result += '<span style="opacity: ' + opacity + '">★</span>';
                }
                if (percents >= 20) {
                    percents -= 20;
                } else {
                    percents = 0;
                }
            }

            result += '</div> <span>' + rating.average + '</span><span>(' + rating.total + ')</span>'
        }

        return result;
    },
    
    /**
     * @param {string} guid 
     * @param {boolean} bNeedUpdateButton 
     * @param {boolean} bNeedRemoveButton 
     * @param {boolean} bNeedInstallButton
     * @param {boolean} [bNotAvailable] 
     * @returns {string}
     */
    makeActionButtons: function(guid, bNeedUpdateButton, bNeedRemoveButton, bNeedInstallButton, bNotAvailable) {
        let additional = bNotAvailable ? 'disabled title="' + Utils.getTranslatedMessage('versionWarning') + '"'  : '';
        let result = '<button class="btn-text-default ';
        if (bNeedUpdateButton) {
            result += 'btn_update" onclick="onClickUpdate(\'' + guid + '\', event)" ' + additional + '>' + Utils.getTranslated("Update");
        } else if (bNeedRemoveButton) {
            result += 'btn_remove" onclick="onClickRemove(\'' + guid + '\', event)" ' + (bNotAvailable ? 'dataDisabled="disabled"' : "") +'>';
            result += Utils.getTranslated("Remove");
        } else if (bNeedInstallButton) {
            result += 'btn_install" onclick="onClickInstall(\'' + guid + '\', event)" ' + additional + '>'  + Utils.getTranslated("Install");
        } else {
            return '';
        }
        result += '</button>';
        return result;
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
    _debounce: function(fn, delay) {
        /** @type {ReturnType<typeof setTimeout> | null} */
        let timeoutId = null;
        /** @this {any} */
        return function() {
            const args = Array.prototype.slice.call(arguments);
            const ctx = this;
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(function() {
                timeoutId = null;
                fn.apply(ctx, args);
            }, delay);
        };
    },

}