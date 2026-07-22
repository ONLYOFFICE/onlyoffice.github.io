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
/// <reference path="../shared/data-fetcher.js" />
/// <reference path="../shared/utils.js" />
/// <reference path="./plugin-card-ui.js" />
/// <reference path="../marketplace/service.js" />

const PluginCard = {
	/** @type {number} */
	editorVersion: 0,
	/** @type {PluginInfo | undefined} */
    plugin: undefined,
	/** @type {PluginInfo | undefined} */
    installed: undefined,
	/** @type {AvailablePluginInfo | undefined} */
    available: undefined,
    removed: false,
    canRemoved: false,
	/** @type {PluginInfo} */
    // @ts-ignore
    config: null,
    releaseUrl: '',
    /** @type {any} */
    PsChangelog: null,
    slideIndex: 1,  // index for slides
    backup: false,
    LANGUAGES: [
        ['cs-CZ', 'cs', 'Czech'],
        ['de-DE', 'de', 'German'],
        ['es-ES', 'es', 'Spanish'],
        ['fr-FR', 'fr', 'French'],
        ['it-IT', 'it', 'Italian'],
        ['ja-JA', 'ja', 'Japanese'],
        ['nl-NL', 'nl', 'Dutch'],
        ['pt-PT', 'pt', 'Portuguese'],
        ['pt-BR', 'pt', 'Brazilian'],
        ['ru-RU', 'ru', 'Russian'],
        ['si-SI', 'si', 'Sinhala'],
        ['uk-UA', 'uk', 'Ukrainian'],
        ['zh-ZH', 'zh', 'Chinese']
    ],

    /** @param {PluginCardWindowParams} data */
    init: function(data) {
        const self = this;
        window.onresize = function() {
            self.setDivHeight();
            if (typeof _syncPluginCardModalState === 'function') {
                _syncPluginCardModalState(data.independentMode);
            }
        };
        this._resetDom();
        this.plugin = data.plugin;
        this.installed = data.installed;
        this.available = data.available;
        this.releaseUrl = data.releaseUrl;
        // @ts-ignore
        this.config = data.plugin || (data.available && data.available.obj);
        this.editorVersion = data.editorVersion;
        this.backup = data.isLocal && !data.plugin;
        this.PsChangelog = null;
        this.slideIndex = 1;
        this.removed = data.removed;
        this.canRemoved = data.canRemoved;
        Utils.init();
        Utils.setTranslations(data.translate);
        Utils.translateAll();
        PluginCardUI.init(Utils.themeType);
        if (!data.independentMode && (data.pluginVersion && data.pluginVersion > 1000005)) {
            PluginCardUI.toggleLoader(true, 'Loading');
        }
        return Utils.waitForRepaint().then(function() {
            self._show(data);
            PluginCardUI.toggleLoader(false);
        });
    },

    _resetDom: function() {
        if (!this.config && Utils.theme) {
            PluginCardUI.onChangeTheme(Utils.theme, Utils.themeType, '');
        }
        if (PluginCardUI.divSelectedContainer) {
            let slides = PluginCardUI.divSelectedContainer.querySelectorAll('.mySlides');
            for (let i = 0; i < slides.length; i++) {
                const el = slides[i];
                if (el.parentNode) el.parentNode.removeChild(el);
            }
        }
        if (PluginCardUI.divPointsContainer) PluginCardUI.divPointsContainer.innerHTML = '';
        if (PluginCardUI.divChangelogPreview) PluginCardUI.divChangelogPreview.innerHTML = '';
        if (PluginCardUI.spanChangelog) PluginCardUI.spanChangelog.classList.add('hidden');
        if (PluginCardUI.spanOverview) {
            let spans = document.querySelectorAll('.span_caption');
            for (let i = 0; i < spans.length; i++) {
                const el = spans[i];
                el.classList.remove('span_selected');
            }
            PluginCardUI.spanOverview.classList.add('span_selected');
        }
        if (PluginCardUI.divSelectedPreview) PluginCardUI.divSelectedPreview.classList.remove('hidden');
        if (PluginCardUI.divSelectedInfo) PluginCardUI.divSelectedInfo.classList.add('hidden');
        if (PluginCardUI.divSelectedChangelog) PluginCardUI.divSelectedChangelog.classList.add('hidden');
    },

    /**
     * @param {PluginCardWindowParams} data
     */
    _show: function(data) {
		const self = this;

        let divPreview = document.createElement("div");
        divPreview.id = "div_preview";
        divPreview.className = "div_preview";
        /** @type {string} */
        let baseUrl = this._getCorrectBaseUrl(data.plugin, data.installed, data.available);

        this._loadAndShowLanguages(baseUrl, !!this.plugin);

        if (
            this.available &&
            (!this.plugin ||
                (data.isLocal && this.plugin.baseUrl.includes("file:")))
        ) {
            PluginCardUI.divGitLink.classList.add("hidden");
        } else {
            PluginCardUI.divGitLink.classList.remove("hidden");
        }

        let discussionUrl = this.config.discussionUrl || "";

        if (this.config.rating) {
            PluginCardUI.divRatingLink.removeAttribute("title");
            PluginCardUI.divStarsColored.innerHTML = PluginCardUI.makeRatingElements(this.config.rating, Utils.getTranslated("Not rated"));
            PluginCardUI.discussionLink.classList.remove("hidden");
        } else {
            this._loadDiscussion(discussionUrl, data.isLocal).then(function (rating) {
                if (rating) {
                    self.config.rating = rating;
                    // PluginCardUI.divRatingLink.classList.remove('hidden');
                    PluginCardUI.divRatingLink.removeAttribute("title");
                    PluginCardUI.discussionLink.classList.remove("hidden");
                } else {
                    PluginCardUI.divRatingLink.setAttribute(
                        "title",
                        Utils.getTranslated("No disscussion page for this plugin.")
                    );
                    PluginCardUI.discussionLink.classList.add("hidden");
                }
                PluginCardUI.divStarsColored.innerHTML = PluginCardUI.makeRatingElements(self.config.rating, Utils.getTranslated("Not rated"));
            });
        }

        let bWebUrl =
            !baseUrl.includes("http://") &&
            !baseUrl.includes("file:") &&
            !baseUrl.includes("../");
        let bCorrectUrl = data.isLocal || bWebUrl;

        if (
            bCorrectUrl &&
            this.config.variations &&
            this.config.variations[0] &&
            this.config.variations[0].store &&
            this.config.variations[0].store.screenshots &&
            this.config.variations[0].store.screenshots.length
        ) {
            /** @type {VariationConfig} */
            const variation = this.config.variations[0];
            if (!variation.store) {
                return;
            }
            const arrScreens = variation.store.screenshots;
            if (!arrScreens) {
                return;
            }
            arrScreens.forEach(function (screenUrl, ind) {
                let url = self.config.baseUrl + screenUrl;
                let container = document.createElement("div");
                container.className = "mySlides fade";
                let screen = document.createElement("img");
                screen.className = "screen";
                screen.setAttribute("src", url);
                container.appendChild(screen);
                PluginCardUI.divSelectedContainer
                    .insertBefore(container, PluginCardUI.arrowPrev);
                if (arrScreens.length > 1) {
                    let point = document.createElement("span");
                    point.className = "dot";
                    point.onclick = function () {
                        self._currentSlide(ind + 1);
                    };
                    PluginCardUI.divPointsContainer
                        .appendChild(point);
                }
            });
            if (arrScreens.length > 1) {
                PluginCardUI.arrowPrev.classList.remove("hidden");
                PluginCardUI.arrowNext.classList.remove("hidden");
            }
            this.slideIndex = 1;
            this._showSlides(1);
        } else {
            PluginCardUI.arrowPrev.classList.add("hidden");
            PluginCardUI.arrowNext.classList.add("hidden");
        }

        const minVersion = (this.available && this.available.obj && this.available.obj.minVersion) || this.config.minVersion;
        if (minVersion) {
            PluginCardUI.spanMinVersion.textContent = String(minVersion);
            PluginCardUI.divMinVersion.classList.remove("hidden");
        } else {
            PluginCardUI.spanMinVersion.textContent = "";
            PluginCardUI.divMinVersion.classList.add("hidden");
        }

        const editorBadgesHtml = this._buildEditorBadgesHtml(this.config.variations && this.config.variations[0]);
        if (editorBadgesHtml) {
            PluginCardUI.divEditorBadges.innerHTML = editorBadgesHtml;
            PluginCardUI.divEditorBadges.classList.remove("hidden");
        } else {
            PluginCardUI.divEditorBadges.innerHTML = "";
            PluginCardUI.divEditorBadges.classList.add("hidden");
        }

        this._loadAndShowChangelog(baseUrl);

        let pluginUrl = baseUrl.replace(
            data.OOMarketplaceUrl,
            data.OOIO + "tree/master/"
        );
        let githubUrl = pluginUrl;
        if (baseUrl.indexOf(data.OOMarketplaceUrl) === -1) {
            githubUrl = baseUrl.replace(
                data.ioUrl,
                data.OOIO + "tree/master/"
            );
        }

        // TODO problem with plugins icons (different margin from top)
        // we do this, because new icons for store are too big for use it in this window.

        PluginCardUI.divIconInfo.style.background = data.iconBackground;
        PluginCardUI.imgIcon.setAttribute("src", data.iconSrc.src);
        if (data.iconSrc.srcset) {
            PluginCardUI.imgIcon.setAttribute("srcset", data.iconSrc.srcset);
        } else {
            PluginCardUI.imgIcon.removeAttribute("srcset");
        }
        PluginCardUI.spanName.textContent = data.pluginName;
        
        if (this.config.local || (this.available && this.available.obj && this.available.obj.local)) {
            PluginCardUI.defaultPluginIcon.classList.remove("hidden");
        } else {
            PluginCardUI.defaultPluginIcon.classList.add("hidden");
        }
        if (this.config.offered) {
            PluginCardUI.spanOffered.textContent = this.config.offered;
            PluginCardUI.spanOnlyOfficeBadge.classList.add("hidden");
        } else {
            PluginCardUI.spanOnlyOfficeBadge.classList.remove("hidden");
            PluginCardUI.spanOffered.textContent = "Ascensio System SIA";
        }
        const version = this.installed && this.installed.version || this.config.version;
        if (version) {
            PluginCardUI.version.textContent = "· v" + version;
            PluginCardUI.version.title = Utils.getTranslated("Version") + ": " + String(version);
        } else {
            PluginCardUI.version.classList.add('hidden');
        }
        
        
        PluginCardUI.spanSelectedDescr.textContent = data.pluginDescription;
        if (bWebUrl) {
            PluginCardUI.divGitLink.classList.remove("hidden");
            PluginCardUI.linkGithub.setAttribute("href", githubUrl);
            PluginCardUI.linkReadme.setAttribute(
                "href",
                pluginUrl + "README.md"
            );
            PluginCardUI.divReadme.classList.remove("hidden");
        } else {
            PluginCardUI.divGitLink.classList.add("hidden");
            PluginCardUI.linkReadme.setAttribute("href", "");
            PluginCardUI.divReadme.classList.add("hidden");
        }

        if (discussionUrl)
            PluginCardUI.discussionLink.setAttribute("href", discussionUrl);
        else PluginCardUI.discussionLink.removeAttribute("href");

        if (data.bHasUpdate) {
            PluginCardUI.btnUpdate.classList.remove("hidden");
        } else {
            PluginCardUI.btnUpdate.classList.add("hidden");
        }

        if (data.independentMode) {
            PluginCardUI.btnRemove.classList.add("hidden");
            PluginCardUI.btnDownload.classList.remove("hidden");

        } else if (this.installed && !this.removed) {
            if (this.canRemoved) {
                PluginCardUI.btnRemove.classList.remove("hidden");
            } else {
                PluginCardUI.btnRemove.classList.add("hidden");
            }
            PluginCardUI.btnInstall.classList.add("hidden");
        } else {
            PluginCardUI.btnRemove.classList.add("hidden");
            PluginCardUI.btnInstall.classList.remove("hidden");
        }

        if (data.bActionDisabled) {
            PluginCardUI.btnInstall.setAttribute("disabled", "");
            PluginCardUI.btnInstall.setAttribute(
                "title",
                Utils.getTranslatedMessage('versionWarning')
            );
        } else {
            PluginCardUI.btnInstall.removeAttribute("disabled");
            PluginCardUI.btnInstall.removeAttribute("title");
        }

        this.setDivHeight();
    },

    /** @param {string} baseUrl */
    _loadAndShowChangelog: function(baseUrl) {
        const self = this;
        return DataFetcher.makeRequestWithWaitConnectionStrategy(baseUrl + 'CHANGELOG.md', 'GET', null, null)
            .onSuccess(function(/** @type {String} */response) {
                const changelog = Utils.makeChangeLogHtml(response);
				PluginCardUI.spanChangelog.classList.remove("hidden");
				PluginCardUI.divChangelogPreview.innerHTML = changelog;
                self._updateScroll();
			})
            .onFailure(function() {
				console.error('Failed to load changelog', baseUrl);
				PluginCardUI.spanChangelog.classList.add("hidden");
				PluginCardUI.divChangelogPreview.textContent = "";
                self._updateScroll();
			});
    },
    /**
     * @param {string} baseUrl
     * @param {boolean} bStrict
     */
    _loadAndShowLanguages: function(baseUrl, bStrict) {
        const self = this;
        let supportedLangs = [ Utils.getTranslated('English') ];
        PluginCardUI.spanLanguages.textContent = supportedLangs.join(", ") + ".";
        PluginCardUI.divLanguages.classList.remove("hidden");
        return DataFetcher.makeRequestWithWaitConnectionStrategy(baseUrl + 'translations/langs.json', 'GET', null, null)
			.onSuccess(function(/** @type {string} */response) {
                /** @type {Array<string>} */
                let langs = JSON.parse(response);
                langs.forEach(function(full) {
                    let short = full.split('-')[0];
                    for (let i = 0; i < self.LANGUAGES.length; i++) {
                        const lang = Utils.getTranslated( self.LANGUAGES[i][2] );
                        if (supportedLangs.indexOf(lang) !== -1) {
                            continue;
                        }
                        // detect only full language (because we can make mistake with some langs. for instance: "pt-PT" and "pt-BR")
                        if (bStrict && (self.LANGUAGES[i][0] == full /*|| self.LANGUAGES[i][1] == short*/)) {
                            supportedLangs.push( lang );
                        } else if (!bStrict && (self.LANGUAGES[i][0] == short || self.LANGUAGES[i][1] == short)) {
                            supportedLangs.push( lang );
                        }
                    }
                });
                PluginCardUI.spanLanguages.textContent = supportedLangs.join(", ") + ".";
            }).onFailure(function() {
				console.error('Failed to load languages.json');
			});
    },

    _updateScroll: function() {
        // scroll for changelog preview
        if (!this.PsChangelog) {
            // @ts-ignore
            this.PsChangelog = new PerfectScrollbar('#div_selected_changelog', {});
            this.PsChangelog.update();
        }
    },

    /**
     * @param {string} discussionUrl
     * @param {boolean} isLocal
     * @returns {Promise<Rating | null>}
     */
    _loadDiscussion: function(discussionUrl, isLocal) {
        if (discussionUrl) {
            const bDesktopRequest =
                isLocal &&
                !!window.AscSimpleRequest &&
                !!window.AscSimpleRequest.createRequest;
            return DataFetcher.getRating(discussionUrl, bDesktopRequest)
                .then(function (rating) {
                    if (!rating) return null;
                    return rating;
                })
                .catch(function (err) {
                    if (bDesktopRequest) {
                        // TODO: 
                        createError(err.response, false);
                    } else {
                        createError(
                            new Error("Problem with loading rating"),
                            true
                        );
                    }
                    return null;
                });
        } else {
            return Promise.resolve(null);
        }
    },
    
    /** 
     * @param {HTMLSpanElement} target 
     * @param {number} type 
     */
    onSelectPreview: function(target, type) {
        // change mode of preview
        if ( !target.classList.contains('span_selected') ) {
            const selectedSpans = document.querySelectorAll(".span_selected");
            for (let i = 0; i < selectedSpans.length; i++) {
                selectedSpans[i].classList.remove("span_selected");
            }
            target.classList.add("span_selected");
            const selectedPreviews = document.getElementsByClassName("tab-pane");
            for (let i = 0; i < selectedPreviews.length; i++) {
                selectedPreviews[i].classList.add("hidden");
            }

            // type: 1 - Overview; 2 - Info; 3 - Changelog;
            let element = PluginCardUI.divSelectedPreview;
            if (type === 1) {
                this.setDivHeight();
            } else if (type === 2) {
                element = PluginCardUI.divSelectedInfo;
            } else {
                element = PluginCardUI.divSelectedChangelog;
                this.PsChangelog.update();
            }
            element.classList.remove('hidden');
        }
    },

    onClickClose: function() {
        let guid = this.config.guid;
        MarketplacePluginService.close(guid, this.config);
    },

    onClickDownload: function() {
        let baseUrlParts = this.config.baseUrl ? this.config.baseUrl.split('/').filter(Boolean) : [];
        let pluginFileName = baseUrlParts.length ? baseUrlParts[baseUrlParts.length - 1] : '';
        let url = this.config.baseUrl ? (this.releaseUrl + pluginFileName + '.plugin') : '';

        if (!url) {
            createError(new Error('Problem with downloading plugin.'));
            return;
        }

        let link = document.createElement('a');
        link.href = url;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    /** @param {Event} event */
    onClickInstall: function(event) {
        const self = this;
        PluginCardUI.toggleLoader(true, 'Installation');
        return Utils.waitForRepaint().then(function() { self._doInstall() });
    },
    _doInstall: function() {
        if (!this.plugin && !this.available) {
            // if we are here if means that plugin tab is opened, plugin is uninstalled and we don't have internet connection
            this.onClickClose();
        }

        const url = this.config.url;
        const guid = this.config.guid;

        return MarketplacePluginService.doInstall(url, guid, this.config).then(function (message) {
            PluginCardUI.toggleLoader(false);
            if (!message || !message.guid) {
                return;
            }
            PluginCardUI.btnRemove.classList.remove('hidden');
            PluginCardUI.btnInstall.classList.add('hidden');
            
        });
        
    },

    onClickUpdate: function() {
        const self = this;
        PluginCardUI.toggleLoader(true, 'Updating');
        return Utils.waitForRepaint().then(function() { self._doUpdate() });
    },
    _doUpdate: function() {
        const self = this;
        const guid = this.config.guid;
        return MarketplacePluginService.doUpdate(guid, this.config).then(function (message) {
            PluginCardUI.toggleLoader(false);
            if (!message || !message.guid) {
                return;
            }
            PluginCardUI.btnUpdate.classList.add('hidden');
            PluginCardUI.btnRemove.classList.remove('hidden');
            PluginCardUI.version.textContent = "· v" + String(self.config.version);
            PluginCardUI.version.title = Utils.getTranslated("Version") + ": " + String(self.config.version);
        });
    },

    onClickRemove: function() {
        const self = this;
        PluginCardUI.toggleLoader(true, 'Removal');
        return Utils.waitForRepaint().then(function() { self._doRemove() });
    },
    _doRemove: function() {
        const self = this;
        const guid = this.config.guid;

        return MarketplacePluginService.doRemove(guid, this.backup).then(function (message) {
            PluginCardUI.toggleLoader(false);
            if (!message || !message.guid) {
                return;
            }
            PluginCardUI.btnRemove.classList.add('hidden');
            PluginCardUI.btnUpdate.classList.add('hidden');
            PluginCardUI.btnInstall.classList.remove('hidden');
            if (self.plugin) {
                PluginCardUI.version.textContent = "· v" + String(self.plugin.version);
                PluginCardUI.version.title = Utils.getTranslated("Version") + ": " + String(self.plugin.version);
            }
        });
        
    },

    /** @param {number} n */
    plusSlides: function(n) {
        this._showSlides(this.slideIndex += n);
    },

    /** @param {number} n */
    _currentSlide: function(n) {
        this._showSlides(this.slideIndex = n);
    },

    /** @param {number} n */
    _showSlides: function(n) {
        let i;
        /** @type {HTMLCollectionOf<HTMLDivElement>} */
        let slides = /** @type {HTMLCollectionOf<HTMLDivElement>} */(document.getElementsByClassName("mySlides"));
        /** @type {HTMLCollectionOf<HTMLSpanElement>} */
        let dots = /** @type {HTMLCollectionOf<HTMLSpanElement>} */(document.getElementsByClassName("dot"));
        
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (dots[this.slideIndex-1]) {
            dots[this.slideIndex-1].className += " active";
        }

        for (i = 0; i < slides.length; i++) {
            if (slides[i]) {
                slides[i].style.transform = "translateX(-" + (this.slideIndex - 1) * 100 + "%)";
            }
        }
    },
    
    setDivHeight: function() {
        let height = PluginCardUI.divSelectedPreview.clientHeight - PluginCardUI.divDescriptionSelected.clientHeight - 26 + 'px';
        PluginCardUI.divSelectedImage.style.height = height;
        PluginCardUI.divSelectedImage.style.maxHeight = height;

    },

    /**
     * Builds the "supported editor" badge row (Document/Spreadsheet/Presentation/PDF Editor).
     * @param {VariationConfig} [variation]
     * @returns {string}
     */
    _buildEditorBadgesHtml: function(variation) {
        const editorsSupport = variation && variation.store && variation.EditorsSupport;
        if (!editorsSupport || !Array.isArray(editorsSupport) || !editorsSupport.length) {
            return '';
        }
        /** @type {Object<EditorType, {icon: string, title: string}>} */
        const badgesInfo = {
            word: { icon: 'docx', title: Utils.getTranslated('Document Editor') },
            cell: { icon: 'xlsx', title: Utils.getTranslated('Spreadsheet Editor') },
            slide: { icon: 'pptx', title: Utils.getTranslated('Presentation Editor') },
            pdf: { icon: 'pdf', title: Utils.getTranslated('PDF Editor') }
        };
        let icons = '';
        ['word', 'cell', 'slide', 'pdf'].forEach(function(type) {
            if (editorsSupport.indexOf(type) === -1) {
                return;
            }
            const info = badgesInfo[type];
            const title = Utils.getTranslated(info.title);
            icons += '<img class="editor-badge" src="./resources/img/editors/icon_' + info.icon + '.svg" title="' + title + '" alt="' + title + '">';
        });
        if (!icons) {
            return '';
        }
        return '<span class="pc-editor-badges-label i18n">' + Utils.getTranslated('Works with') + '</span>' + icons;
    },

    /**
     * @param {PluginInfo} [plugin]
     * @param {PluginInfo} [installed]
     * @param {AvailablePluginInfo} [available]
     * @returns {string}
     */
    _getCorrectBaseUrl: function(plugin, installed, available) {
        let baseUrl = '';
        let pluginBaseUrl = plugin && plugin.baseUrl;
        let installedBaseUrl = installed && installed.baseUrl;
        let availableBaseUrl = available && available.obj && available.obj.baseUrl;
        if (pluginBaseUrl && pluginBaseUrl !== installedBaseUrl) {
            baseUrl = pluginBaseUrl;
        } else if (installedBaseUrl) {
            baseUrl = installedBaseUrl;
            if (baseUrl.indexOf('../') !== 0) {
                return baseUrl;
            }
            if (!baseUrl.includes("/sdkjs-plugins/content/") && baseUrl.includes('/sdkjs-plugins/')) {
                baseUrl = baseUrl.replace('/sdkjs-plugins/', '/sdkjs-plugins/content/');
            }
        } else if (pluginBaseUrl) {
            baseUrl = pluginBaseUrl;
        } else {
            baseUrl = availableBaseUrl || '';
        }
        
        return baseUrl;
    }
};

window.addEventListener('message', function(event) {
	// getting messages from editor or plugin
	// try to parse message
    /** @type {PluginCardIframeMessage}} */
    let message;
	try {
		message = JSON.parse(event.data);
	} catch (error) {
		// if we have a problem, don't process this message
		console.error('Failed to parse message', event.data);
		return;
	}

	switch (message.type) {
        case 'PluginReady':
            PluginCard.init(message.data);
            break;
		case 'Error':
			createError(message.error);
			PluginCardUI.toggleLoader(false);
			break;
		case 'Theme':
			if (message.theme.type)
				Utils.themeType = message.theme.type;
			PluginCardUI.onChangeTheme(message.theme, Utils.themeType, message.style);
			break;
		case 'onExternalMouseUp':
			let evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.dispatchEvent(evt);
			break;
	};
}, false);