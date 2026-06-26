
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

/// <reference path="../types.js" />
/// <reference path="../shared/utils.js" />
/// <reference path="../shared/checkbox.js" />
/// <reference path="./plugin-icons.js" />
/// <reference path="./scale.js" />

const UI = {
    /** @type {HTMLDivElement | undefined} */
    _loader: undefined,
    //_mainFilterInputs: /** @type {NodeListOf<HTMLInputElement>} */(document.querySelectorAll('#plugins input[name="main-filter"]')),
    _categoryFilterInputs: /** @type {NodeListOf<HTMLInputElement>} */(document.querySelectorAll('#plugins input[name="category-filter"]')),
    linkNewPlugin: /** @type {HTMLAnchorElement} */(document.getElementById('link_newPlugin')),
    linkNewPluginText: /** @type {HTMLSpanElement} */(document.querySelector('#link_newPlugin .link-text')),
    pluginsList: /** @type {HTMLDivElement} */(document.getElementById('plugins')),
    _toolbarSecondaryText: /** @type {HTMLElement} */(document.querySelector('.toolbar h1')),
    divMain: /** @type {HTMLDivElement} */(document.getElementById('div_main')),
    _toolbarTools: /** @type {HTMLDivElement} */(document.getElementById('toolbar_tools')),
    _btnUpdateAll: /** @type {HTMLButtonElement} */(document.getElementById('btn_updateAll')),
    inpSearch: /** @type {HTMLInputElement} */(document.getElementById('inp_search')),
    _aside: /** @type {HTMLElement} */(document.querySelector('aside')),
    _toolbar: /** @type {HTMLDivElement} */(document.querySelector('.toolbar')),
    _main: /** @type {HTMLElement} */(document.querySelector('main')),
    _filterByEditorTypeContainer: /** @type {HTMLDivElement} */(document.querySelector('.filter-by-editor')),
    _inputCurrentEditor: /** @type {HTMLInputElement} */ (document.getElementById('filter-current-editor')),
    /** @type {null | Checkbox} */
    _checkboxCurrentEditor: null,
    /** @type {Object<string, HTMLDivElement>} */
    _plugins: {},

    /** @param {CategoryFilter} value */
    onChangeCategoryFilter: function(value) {},
    /** @param {string} searchInput */
    onChangeSearchInput: function(searchInput) {},
    /** @param {boolean} filterByCurrentEditor */
    onChangeCurrentEditor: function(filterByCurrentEditor) {},

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
     * @param {'light' | string} themeType
     * */
    init: function(themeType) {
        const self = this;
        let rule = '\n.asc-plugin-loader{background-color:' + (themeType == 'light' ? '#ffffff' : '#333333') + ';padding: 10px;display: flex;justify-content: center;align-items: center;border-radius: 5px;}\n'
        rule += '.asc-plugin-loader{color:' + (themeType == 'light' ? '#444444' : 'rgba(255,255,255,0.8)') + '}\n';
        let styleTheme = document.createElement('style');
        styleTheme.innerHTML = rule;
        document.head.appendChild(styleTheme);

        for (let i = 0; i < this._categoryFilterInputs.length; i++) {
            const input = this._categoryFilterInputs[i];
            if (input instanceof HTMLInputElement === false) {
                continue;
            }
            input.onchange = function(event) {
                const target = event.currentTarget;
                if (!target || target instanceof HTMLInputElement === false) {
                    return;
                }
                const value = /** @type {CategoryFilter} */(target.value);
                self.onChangeCategoryFilter(value);
                const label = input.nextElementSibling;
                if (!label) {
                    return;
                }
                const categoryNameDiv = label.querySelector('.category-name');
                if (!categoryNameDiv) {
                    return;
                }
                const text = categoryNameDiv.textContent;
                self._toolbarSecondaryText.textContent = text;
            };
        }

        this.inpSearch.addEventListener('input', this._debounce(function(/** @type {Event} */ event) {
            if (!event.target || event.target instanceof HTMLInputElement === false) {
                return;
            }
            self.onChangeSearchInput(event.target.value.trim().toLowerCase());
        }, 500));

        if (!!window.AscDesktopEditor) {
			this.linkNewPluginText.textContent = Utils.getTranslatedMessage('installed');
			this.linkNewPlugin.href = "#";
			this.linkNewPlugin.onclick = function (e) {
				e.preventDefault();
				installPluginManually();
			}
		} else {
			this.linkNewPluginText.textContent = Utils.getTranslatedMessage('marketplace');
			this.linkNewPlugin.href = (OOIO + "pulls");
			this.linkNewPlugin.onclick = null;
		}

    },


    /**
     * @param {AscTheme} theme
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

        rule += '.plugin-plate .name .plugin-name,\n' +
            '.filter-by label{color: ' + (theme["text-normal"] || 'rgba(0,0,0,0.8)') + ';}\n';
        rule += '.plugin-plate .description,\n' +
            '.filter-by label > span:last-of-type{color: ' + (theme["text-secondary"] || 'rgba(0,0,0,0.6)') + ';}\n';
        rule += '.categories-header,\n' +
            '.toolbar .search span,\n' +
            '.plugin-plate .manufacturer,\n' +
            '.toolbar .search input::placeholder,\n' +
            '.filter-by label>span:first-of-type,\n' +
            '.plugin-plate .rating{color: ' + (theme["text-tertiary"] || 'rgba(0,0,0,0.4)') + ';}\n';
        rule += '.filter-by span.onlyoffice{background-color: ' + 
            (theme["text-tertiary"] || 'rgba(0,0,0,0.4)') +
             '; color: ' + (theme["background-normal"] || '#fff') + ';}\n';

        rule += '.plugin-plate{background-color: ' + (theme["background-normal"] || '#fff') + '; border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';
        //rule += 'main{background-color: ' + theme["background-pane"] + ';}\n';

        rule += '.plugin-plate{border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';

        rule += '.plugin-plate .stars{color: ' + (theme["canvas-anim-pane-effect-bar-emphasis-outline"] || '#c49a2a') + ';}\n';
        rule += '.filter-by>label:hover{background-color: ' + (theme["highlight-button-hover"] || '#e0e0e0') + ';}\n';
        rule += '.filter-by>input:checked + label{background-color: ' + (theme["highlight-button-pressed"] || '#DCDBDB') + ';}\n';
        rule += '.filter-by>label > span.mark{color: ' + (theme["text-inverse"] || '#fff') + ';}\n';
        rule += 'aside,\n' +
            '.plugin-plate .management,\n' +
            '.toolbar{border-color: ' + (theme["border-divider"] || '#dfdfdf') + ';}\n';

        rule += 'button.btn_update,\n' +
            'button.btn_update:active{color: ' + (theme["text-contrast-background"] || '#fff') + ';}\n';
        
        if (theme.name === 'theme-classic-light') {
            rule += '.filter-by input:checked + label .category-name,\n';
            rule += '.filter-by input:checked + label > span:last-of-type{color: ' + (theme["text-inverse"] || '#fff') + ';}\n';
            rule += '.filter-by input:checked + label{background-color: ' + ('#7d858c') + ';}\n';
        }

        /** checkbox styles */
        rule += ".checkbox-visual { background-color: " + (theme["background-normal"] || '#fff') + "; }\n";
        rule += ".checkbox-visual { border-color: " + (theme["border-regular-control"] || "#c0c0c0") + "; }\n";
        rule += ".checkbox-indeterminate { background-color: " +
                (theme["background-primary-dialog-button"] || "#444444") +
                "; border-color: " +
                (theme["background-primary-dialog-button"] || "#444444") +
                "; }\n";

        if (
            ["theme-white", "theme-night"].indexOf(theme.name) !== -1 ||
            ["theme-white", "theme-night"].indexOf(theme.Name) !== -1
        ) {
            rule += ".checkbox-checkmark { color: " + theme["text-inverse"] + "; }\n";
            rule += ".checkbox--checked .checkbox-visual { background-color: " +
                (theme["background-primary-dialog-button"] || "#444444") + "; }\n";
            rule +=
                ".checkbox--checked .checkbox-visual { border-color: " +
                (theme["background-primary-dialog-button"] || "#444444") + "; }\n";
            rule +=
                ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " +
                (theme["highlight-button-hover"] || "#e0e0e0") +
                "; }\n";
            rule +=
                ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " +
                (theme["highlight-primary-dialog-button-hover"] || "#1c1c1c") +
                "; background-color: " +
                (theme["highlight-primary-dialog-button-hover"] || "#1c1c1c") +
                "; }\n";

        } else {
            rule +=
                ".checkbox-checkmark { color: " +
                (theme["text-normal"] || 'rgba(0,0,0,0.8)') +
                "; }\n";
            rule +=
                ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " +
                (theme["border-control-focus"] || "#848484") +
                "; }\n";
        }
        /** end checkbox styles */

        if (themeType.includes('light')) {
            rule += '.filter-by input:checked + label>span:first-of-type{color: ' + '#00645b' + ' !important;}\n';
            rule += 'a.link:visited,\n';
            rule += 'a.link{color: ' + ('#00645b') + ' !important;}\n';    
            rule += 'a.link:hover{color: ' + ('#0e8a7e') + ' !important;}\n';    
            rule += 'button.btn_update:active{background-color: ' + ('#00645b') + ' !important;}\n';    
            rule += 'button.btn_update{border-color: ' + ('#0e8a7e') + ';}\n';    
            rule += 'button.btn_update:hover{background-color: ' + ('#007a6f') + ';}\n';    
            rule += 'button.btn_update{background-color: ' + ('#0e8a7e') + ';}\n'; 
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
            rule += 'a.link:visited,\n';
            rule += 'a.link{color: ' + ('#60ddc0') + ' !important;}\n';
            rule += 'a.link:hover{color: ' + ('#39bda0') + ' !important;}\n';
            rule += 'button.btn_update:active{background-color: ' + ('#60ddc0') + ' !important;}\n';    
            rule += 'button.btn_update{border-color: ' + ('#39bda0') + ';}\n';    
            rule += 'button.btn_update:hover{background-color: ' + ('#26b094') + ';}\n';    
            rule += 'button.btn_update{background-color: ' + ('#39bda0') + ';}\n';
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
            if (pluginDiv.parentNode) pluginDiv.parentNode.removeChild(pluginDiv);
        }
    },

    /** @param {CategoryFilter} value */
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
     * @param {Map<string, number>} categories
     * @param {number} numOfAllPlugins 
     * @param {number} numOfInstalledPlugins 
     * @param {number} numOfPluginsToUpdate 
     */
    updateCategories: function(categories, numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate) {
        const self = this;
        const installedCounter = this.pluginsList.querySelector('.filter-by-installed .installed .amount');
        const updatesCounter = this.pluginsList.querySelector('.filter-by-installed .updates .amount');
        const updates = this.pluginsList.querySelector('.filter-by-installed .updates');

        if (installedCounter) {
            installedCounter.textContent = numOfInstalledPlugins.toString();
        }
        if (updatesCounter && updates) {
            if (numOfPluginsToUpdate) {
                updatesCounter.classList.add('mark');
                updatesCounter.textContent = numOfPluginsToUpdate.toString();
            } else {
                updatesCounter.classList.remove('mark');
                updatesCounter.textContent = '0';
            }
        }
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
        this.divMain.appendChild(div);
        div = document.createElement('div');
        this.divMain.appendChild(div);
    },

    /**
     * This function creates div (preview) for plugins
     * @param {string} guid
     * @param {boolean} isLocal
     * @param {string} defaultBG
     * @param {PluginPlateState} state
     * @returns {HTMLDivElement}
     */
    createPluginPlate: function(guid, isLocal, defaultBG, state) {
        const pluginPlate = document.createElement('div');
        pluginPlate.id = guid;
        pluginPlate.setAttribute('data-guid', guid);
        pluginPlate.className = 'plugin-plate form-control noselect';
        let zoom = 1;
        if (Scale.devicePR < 1)
            zoom = (1 / devicePixelRatio);
        else if (Scale.devicePR > 2)
            zoom = (1 / devicePixelRatio) * 2;
        pluginPlate.style.borderStyle = 'solid';
        pluginPlate.style.borderWidth = (zoom > 1 ? 1 : zoom) + 'px';
        pluginPlate.innerHTML = this._buildPluginPlateHtml(guid, state.config, state, isLocal, defaultBG);
                
        return pluginPlate;
    },

    /**
     * @param {string} guid
     * @param {PluginInfo} config
     * @param {PluginPlateState} state
     * @param {boolean} isLocal
     * @param {string} defaultBG
     * @returns {string}
     */
    _buildPluginPlateHtml: function(guid, config, state, isLocal, defaultBG) {
        if (!config.variations) {
            return '<div>Invalid plugin configuration</div>';
        }
        const variation = config.variations[0];
        const name = Utils.getTranslatedName(config);
        const description = Utils.getTranslatedDescription(variation);
        const bg = variation.store && variation.store.background ? variation.store.background[Utils.themeType] : defaultBG;
        const offered = config.offered || 'ONLYOFFICE';
        const imgSrc = PluginIcons.getImageUrl(guid, isLocal);

        let intro = '<div class="introduction">' +
            '<div class="image" style="background: ' + bg + '">' +
                '<img id="img_' + guid + '" class="plugin_icon" data-guid="' + guid + '" src="' + imgSrc.src + '" srcset="' + imgSrc.srcset + '">' +
            '</div>' +
            '<div class="name">' +
                '<div class="plugin-name">' + name + '</div>' +
                '<div class="manufacturer">' +
                    offered +
                    (!config.offered ? '<span class="by-onlyoffice">✓</span>' : '') +
                '</div>' +
            '</div>' +
            '</div>' +
            '<div class="description">' + description + '</div>' +
            '<div class="management">';

        if (state.config.local || (state.installed && state.installed.local)) {
            intro += '<span class="default-plugin-icon" title="' + Utils.getTranslated('Local') + '">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>' +
                '<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>' +
                '<line x1="12" y1="22.08" x2="12" y2="12"></line>' +
                '</svg></span>';
        }
        intro += '<div class="rating">' +
                    this._makeRatingElements(config.rating, Utils.getTranslated('Not rated')) +
                '</div>' +
                this._makeActionButtons(guid, state) +
            '</div>' +
        '</div>';

        return intro;
    },

	/**
	 * @param {PluginInfo} plugin
	 */
	showRating: function(plugin) {
		if (!plugin.rating) return;
		const pluginPlate = this.getPlugin(plugin.guid);
		if (!pluginPlate) {
			return;
		}
		const div = pluginPlate.querySelector('.rating');
		if (!div) return;
		div.innerHTML = this._makeRatingElements(plugin.rating, Utils.getTranslated("Not rated"));
	},
    /**
     * @param {Rating} [rating]
     * @param {string} [notRatedText]
     * @returns {string}
     */
    _makeRatingElements: function(rating, notRatedText) {
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
    /** @param {boolean} filterByCurrentEditor */
    showFilterByEditorType: function(filterByCurrentEditor) {
        const self = this;
        this._checkboxCurrentEditor = new Checkbox(this._inputCurrentEditor, {
            label: Utils.getTranslated("For this editor"),
            checked: filterByCurrentEditor
        });

        this._checkboxCurrentEditor.subscribe(function(event) {
            if (event.type === 'change') {
                const checked = event.detail.checked;
                self.onChangeCurrentEditor(checked);
            }
        });
        //this._filterByEditorTypeContainer.classList.remove('hidden');
    },
    /**
     * @param {string} guid 
     * @param {PluginPlateState} state
     * @returns {string}
     */
    _makeActionButtons: function(guid, state) {
        let additional = state.bNotAvailable ? 'disabled title="' + Utils.getTranslatedMessage('versionWarning') + '"'  : '';
        let result = '<button class="btn-text-default ';
        if (state.bNeedUpdateButton) {
            result += 'btn_update" onclick="onClickUpdate(\'' + guid + '\', event)" ' + additional + '>' + Utils.getTranslated("Update");
        } else if (state.bNeedRemoveButton) {
            result += 'btn_remove" onclick="onClickRemove(\'' + guid + '\', event)" ' + (state.bNotAvailable ? 'dataDisabled="disabled"' : "") +'>';
            result += Utils.getTranslated("Remove");
        } else if (state.bNeedInstallButton) {
            result += 'btn_install" onclick="onClickInstall(\'' + guid + '\', event)" ' + additional + '>'  + Utils.getTranslated("Install");
        } else {
            return '';
        }
        result += '</button>';
        return result;
    },
    makeSidebarToggleButton: function() {
        const self = this;
        if (!this._aside || !this._toolbar) {
            return;
        }
        let isVisible = MarketplaceStorage.isSidebarVisible;

        const showIcon = '' +
            '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<g transform="scale(-1,1) translate(-24,0) rotate(90,12,12)">' +
                '<path d="M20,24H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v16C24,22.2,22.2,24,20,24z M4,2C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2H4z"/>' +
                '<path d="M23,9H1C0.4,9,0,8.6,0,8s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,9,23,9z"/>' +
                '<g transform="rotate(180,12,15)">' +
                '<path d="M15,18c-0.3,0-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3c0.4,0.4,0.4,1,0,1.4C15.5,17.9,15.3,18,15,18z"/>' +
                '<path d="M9,18c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l3-3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-3,3C9.5,17.9,9.3,18,9,18z"/>' +
                '</g>' +
            '</g>' +
            '</svg>';
        const closeIcon = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<g transform="scale(-1,1) translate(-24,0) rotate(90,12,12)">' +
                '<path d="M20,24H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h16c2.2,0,4,1.8,4,4v16C24,22.2,22.2,24,20,24z M4,2C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2H4z"/>' +
                '<path d="M23,9H1C0.4,9,0,8.6,0,8s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,9,23,9z"/>' +
                '<path d="M15,18c-0.3,0-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3c0.4,0.4,0.4,1,0,1.4C15.5,17.9,15.3,18,15,18z"/>' +
                '<path d="M9,18c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l3-3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-3,3C9.5,17.9,9.3,18,9,18z"/>' +
            '</g>' +
            '</svg>';
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'toggle-sidebar-full';
        toggleBtn.className = 'btn-text-default i18n';

        if (!isVisible) {
            this._main.classList.add('full-width');
            this._aside.classList.add('collapsed');
            toggleBtn.title = Utils.getTranslated('Show panel');
            toggleBtn.innerHTML = showIcon;
        } else {
            toggleBtn.title = Utils.getTranslated('Hide panel');
            toggleBtn.innerHTML = closeIcon;
        }
        this._toolbar.insertBefore(toggleBtn, this._toolbar.children[0]);

        setTimeout(function() {
            self._aside.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 1000);

        toggleBtn.onclick = function() {
            isVisible = !isVisible;
            MarketplaceStorage.saveSidebarVisibleState(isVisible);

            toggleBtn.innerHTML = isVisible ? closeIcon : showIcon;
            if (isVisible) {
                self._main.classList.remove('full-width');
                self._aside.classList.remove('collapsed');
                toggleBtn.title = Utils.getTranslated('Hide panel');
            } else {
                self._main.classList.add('full-width');
                self._aside.classList.add('collapsed');
                toggleBtn.title = Utils.getTranslated('Show panel');
            }
        };

    },
	
	/**
	 * @param {number} numOfPluginsToUpdate 
	 * @param {CategoryFilter} category 
	 */
	updateToolbar: function(numOfPluginsToUpdate, category) {
		if (!!numOfPluginsToUpdate && category === 'updates') {
			this._toolbarTools.classList.remove('hidden');
            this._btnUpdateAll.setAttribute('data-count', String(numOfPluginsToUpdate));
		} else {
			this._toolbarTools.classList.add('hidden');
            this._btnUpdateAll.setAttribute('data-count', "0");
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
            loaderContainer.classList.add('hidden');
            this._loader && (this._loader.remove ? this._loader.remove() : loaderContainer.removeChild(this._loader));
            this._loader = undefined;	
        } else if (!this._loader) {
            loaderContainer.classList.remove('hidden');
            // @ts-ignore - global function
            this._loader = showLoader(loaderContainer, ( Utils.getTranslated(text || '') ) + '...');
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