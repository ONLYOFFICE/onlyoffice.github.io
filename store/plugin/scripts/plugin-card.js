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
/// <reference path="../../scripts/types.js" />
/// <reference path="./plugin-card-ui.js" />

const PluginCard = {
	/** @type {number} */
	editorVersion: 0,
	/** @type {PluginInfo} */
    plugin: null,
	/** @type {InstalledPluginInfo | null} */
    installed: null,
    init() {
        console.warn("plugin card init");
    },

    /**
     * @param {{guid: string, plugin: PluginInfo | null, installed: InstalledPluginInfo | null, iconBackground: string, iconUrl: string, bHasUpdate: boolean, bActionDisabled: boolean, isLocal: boolean}} data
     */
    showPluginPlate: function (data) {
        console.log(window);
		const self = this;
        const guid = data.guid;

        // There we will make preview for selected plugin
        let offered = "Ascensio System SIA";
        let hiddenCounter = 0;

        let divPreview = document.createElement("div");
        divPreview.id = "div_preview";
        divPreview.className = "div_preview";
        if (!this.plugin) {
            console.error("Failed to load plugin");
            return;
        }

        let discussionUrl = this.plugin.discussionUrl || "";

        if (this.plugin.rating) {
            PluginCardUI.divRatingLink.removeAttribute("title");
            PluginCardUI.totalVotes.textContent = String(
                this.plugin.rating.total,
            );
            PluginCardUI.divStarsColored.style.width =
                this.plugin.rating.percent + "%";
            PluginCardUI.discussionLink.classList.remove("hidden");
            PluginCardUI.divVotes.classList.remove("hidden");
        } else {
            this._loadDiscussion(discussionUrl, data.isLocal).then(function (rating) {
                if (rating) {
                    self.plugin.rating = rating;
                    PluginCardUI.totalVotes.textContent = String(rating.total);
                    PluginCardUI.divStarsColored.style.width = rating.percent + "%";
                    // PluginCardUI.divRatingLink.classList.remove('hidden');
                    PluginCardUI.divRatingLink.removeAttribute("title");
                    PluginCardUI.divVotes.classList.remove("hidden");
                    PluginCardUI.discussionLink.classList.remove("hidden");
                } else {
                    PluginCardUI.divRatingLink.setAttribute(
                        "title",
                        Utils.getTranslated("No disscussion page for this plugin."),
                    );
                    PluginCardUI.divStarsColored.style.width = "0";
                    PluginCardUI.divVotes.classList.add("hidden");
                    PluginCardUI.discussionLink.classList.add("hidden");
                }
            });
        }

        if (
            this.installed &&
            (!this.plugin ||
                (data.isLocal && this.plugin.baseUrl.includes("file:")))
        ) {
            PluginCardUI.divGitLink.classList.add("hidden");
            this.plugin = this.installed.obj;
        } else {
            PluginCardUI.divGitLink.classList.remove("hidden");
        }
        console.warn(this.plugin);
        if (!this.plugin) {
            console.error("Plugin is null");
            return;
        }
        let bWebUrl =
            !this.plugin.baseUrl.includes("http://") &&
            !this.plugin.baseUrl.includes("file:") &&
            !this.plugin.baseUrl.includes("../");
        let bCorrectUrl = isLocal || bWebUrl;

        if (
            bCorrectUrl &&
            this.plugin.variations[0].store &&
            this.plugin.variations[0].store.screenshots &&
            this.plugin.variations[0].store.screenshots.length
        ) {
            let arrScreens = this.plugin.variations[0].store.screenshots;
            arrScreens.forEach(function (screenUrl, ind) {
                let url = this.plugin.baseUrl + screenUrl;
                let container = document.createElement("div");
                container.className = "mySlides fade";
                let screen = document.createElement("img");
                screen.className = "screen";
                screen.setAttribute("src", url);
                container.appendChild(screen);
                document
                    .getElementById("div_selected_container")
                    .insertBefore(container, PluginCardUI.arrowPrev);
                if (arrScreens.length > 1) {
                    let point = document.createElement("span");
                    point.className = "dot";
                    point.onclick = function () {
                        currentSlide(ind + 1);
                    };
                    document
                        .getElementById("points_container")
                        .appendChild(point);
                }
            });
            if (arrScreens.length > 1) {
                PluginCardUI.arrowPrev.classList.remove("hidden");
                PluginCardUI.arrowNext.classList.remove("hidden");
            }
            slideIndex = 1;
            showSlides(1);
        } else {
            PluginCardUI.arrowPrev.classList.add("hidden");
            PluginCardUI.arrowNext.classList.add("hidden");
        }

        if ((this.installed && this.installed.obj.version) || this.plugin.version) {
            PluginCardUI.spanVersion.textContent = String(
                this.installed && this.installed.obj.version ?
                    this.installed.obj.version
                :   this.plugin.version,
            );
            PluginCardUI.divVersion.classList.remove("hidden");
        } else {
            PluginCardUI.spanVersion.textContent = "";
            PluginCardUI.divVersion.classList.add("hidden");
            hiddenCounter++;
        }

        if (
            (this.installed && this.installed.obj.minVersion) ||
            this.plugin.minVersion
        ) {
            PluginCardUI.spanMinVersion.textContent = String(
                this.installed && this.installed.obj.minVersion ?
                    this.installed.obj.minVersion
                :   this.plugin.minVersion,
            );
            PluginCardUI.divMinVersion.classList.remove("hidden");
        } else {
            PluginCardUI.spanMinVersion.textContent = "";
            PluginCardUI.divMinVersion.classList.add("hidden");
            hiddenCounter++;
        }

        if (this.plugin.languages) {
            PluginCardUI.spanLanguages.textContent =
                this.plugin.languages.join(", ") + ".";
            PluginCardUI.divLanguages.classList.remove("hidden");
        } else {
            PluginCardUI.spanLanguages.textContent = "";
            PluginCardUI.divLanguages.classList.add("hidden");
            hiddenCounter++;
        }

        if (this.plugin.changelog) {
            document
                .getElementById("span_changelog")
                .classList.remove("hidden");
            document.getElementById("div_changelog_preview").innerHTML =
                this.plugin.changelog;
        } else {
            document.getElementById("span_changelog").classList.add("hidden");
            document.getElementById("div_changelog_preview").textContent = "";
        }

        let pluginUrl = this.plugin.baseUrl.replace(
            OOMarketplaceUrl,
            OOIO + "tree/master/",
        );

        // TODO problem with plugins icons (different margin from top)
        // we do this, because new icons for store are too big for use it in this window.

        document.getElementById("div_icon_info").style.background =
            data.iconBackground;
        PluginCardUI.imgIcon.setAttribute("src", data.iconUrl);
        PluginCardUI.spanName.textContent = this.plugin.name;
        PluginCardUI.spanOffered.textContent =
            this.plugin.offered || offered;
        PluginCardUI.spanSelectedDescr.textContent =
            this.plugin.variations[0].description;
        if (bWebUrl) {
            PluginCardUI.linkPlugin.setAttribute("href", pluginUrl);
            PluginCardUI.linkReadme.setAttribute(
                "href",
                pluginUrl + "README.md",
            );
            PluginCardUI.divReadme.classList.remove("hidden");
        } else {
            PluginCardUI.linkPlugin.setAttribute("href", "");
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

        if (this.installed && !this.installed.removed) {
            if (this.installed.canRemoved) {
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
                Utils.getTranslated(MESSAGES.versionWarning),
            );
        } else {
            PluginCardUI.btnInstall.removeAttribute("disabled");
            PluginCardUI.btnInstall.removeAttribute("title");
        }

        if (hiddenCounter == 3) {
            // if versions and languages fields are hidden, we should hide this div
            document.getElementById("div_plugin_info").classList.add("hidden");
        } else {
            document
                .getElementById("div_plugin_info")
                .classList.remove("hidden");
        }

        setDivHeight();
        sendMessage({ type: "showButton", show: true });
        // PluginCardUI.arrow.classList.remove('hidden');
    },

	changeAfterInstallOrRemove() {
		let bCheckUpdate = true;
		if (!this.plugin && this.installed) {
			this.plugin = this.installed.obj;
			bCheckUpdate = false;
		}

		let bNotAvailable = false;
		const minV = (this.plugin.minVersion ? Utils.convertPluginVersionToNumber(this.plugin.minVersion) : -1);
		if (minV > editorVersion) {
			bCheckUpdate = false;
			bNotAvailable = true;
		}

		let bHasUpdate = false;
		let bRemoved = (this.installed && this.installed.removed);
		if (bCheckUpdate && this.installed && this.plugin) {
			const installedV = Utils.convertPluginVersionToNumber(this.installed.obj.version || "0.0.0");
			const lastV = Utils.convertPluginVersionToNumber(this.plugin.version || "0.0.0");
			if (lastV > installedV) {
				bHasUpdate = true;
				this.plugin.bHasUpdate = true;
			}
		}
		const bNeedUpdateButton = bHasUpdate && !bRemoved;
		const bNeedRemoveButton = this.installed && !bRemoved && this.installed.canRemoved;
		const bNeedInstallButton = !this.installed || bRemoved;
	},

    /**
     * @param {string} discussionUrl
     * @param {boolean} isLocal
     * @returns {Promise<Rating | null>}
     */
    _loadDiscussion: function (discussionUrl, isLocal) {
        if (discussionUrl) {
            const bDesktopRequest =
                isLocal &&
                window.AscSimpleRequest &&
                window.AscSimpleRequest.createRequest;
            return DataFetcher.getRating(discussionUrl, bDesktopRequest)
                .then(function (rating) {
                    if (!rating) return null;
                    return rating;
                })
                .catch(function (err) {
                    if (bDesktopRequest) {
                        createError(err.response, false);
                    } else {
                        createError(
                            new Error("Problem with loading rating"),
                            true,
                        );
                    }
                    return null;
                });
        } else {
            return Promise.resolve(null);
        }
    },
};

window.Asc.plugin.init = function () {
    window.Asc.plugin.sendToPlugin("onWindowReady", {});
    //PluginCardUI.init();
    PluginCard.init();
};

window.Asc.plugin.onThemeChanged = function (theme) {
    window.Asc.plugin.onThemeChangedBase(theme);
};

window.Asc.plugin.onTranslate = function () {
    let elements = document.getElementsByClassName("i18n");

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.innerHTML = window.Asc.plugin.tr(element.innerHTML);
    }
};

window.Asc.plugin.attachEvent("onShowPluginCard", function (data) {
    console.log("onShowPluginCard", data);
    PluginCard.plugin = data.plugin;
    PluginCard.installed = data.installed;
	PluginCard.editorVersion = data.editorVersion;
    PluginCard.showPluginPlate(data);
});

window.Asc.plugin.attachEvent("Installed", function (message) {
    try {
        message = JSON.parse(message.data);
    } catch (error) {
        // if we have a problem, don't process this message
        console.error("Failed to parse message");
        return;
    }
    console.error("------- INSTALLED -------");
    if (!message.guid) {
        // somethimes we can receive such message
        toggleLoader(false);
        return;
    }

    changeAfterInstallOrRemove(true, message.guid);
    toggleLoader(false);
});

window.Asc.plugin.attachEvent("Updated", function (message) {
    try {
        message = JSON.parse(message.data);
    } catch (error) {
        // if we have a problem, don't process this message
        console.error("Failed to parse message");
        return;
    }
    console.error("------- INSTALLED -------");
    if (!message.guid) {
        // somethimes we can receive such message
        toggleLoader(false);
        return;
    }

    
});

window.Asc.plugin.attachEvent("Removed", function (message) {
    try {
        message = JSON.parse(message.data);
    } catch (error) {
        // if we have a problem, don't process this message
        console.error("Failed to parse message");
        return;
    }
    console.error("------- INSTALLED -------");
    if (!message.guid) {
        // somethimes we can receive such message
        toggleLoader(false);
        return;
    }

    changeAfterInstallOrRemove(true, message.guid);
    toggleLoader(false);
});
