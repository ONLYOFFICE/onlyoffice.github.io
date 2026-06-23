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

/// <reference path="./types.js" />

const MarketplaceStorage = {
    /** @type {CategoryFilter} */
    categoryFilter: "onlyoffice",
    /** @type {string} */
    searchQuery: "",
    /** @type {Map<string, number>} */
    _categories: new Map(),

    /** @type {Array<AvailablePluginInfo>} */
    _availablePlugins: [], // list of installed and custom plugins
    /** @type {Array<PluginInfo>} */
    _marketplacePlugins: [], // list of plugins from config
    /** @type {Array<PluginInfo>} */
    _installedPlugins: [], // list of installed plugins
    /** @type {Array<PluginInfo>} */
    _allPlugins: [], // list of all plugins


    /** @param {AvailablePluginInfo} plugin */
    addAvailablePlugin: function(plugin) {
        this._availablePlugins.push(plugin);
        if (!plugin.removed) {
            this._installedPlugins.push(plugin.obj);
        }
    },
    /** @param {PluginInfo} plugin */
    addInstalledPlugin: function(plugin) {
        this._installedPlugins.push(plugin);
    },

    /**
     * @param {string} guid 
     * @returns {AvailablePluginInfo | undefined}
     */
    findAvailablePlugin: function(guid) {
        return this._availablePlugins.find(function(el){return el.guid === guid});
    },
    /**
     * @param {string} guid 
     * @returns {PluginInfo | undefined}
     */
    findInstalledPlugin: function(guid) {
        return this._installedPlugins.find(function(el){return el.guid === guid});
    },
    /**
     * @param {string} guid 
     * @returns {PluginInfo | undefined}
     */
    findPlugin: function(guid) {
        let res = this._allPlugins.find(function(el){return el.guid === guid});
        return res;
    },

    getAllPlugins: function() {
        return this._allPlugins;
    },
    getCategories: function() {
        return this._categories;
    },
    /**
     * @param {function(PluginInfo): string} translateName
     * @returns {Array<PluginInfo>}
     */
    getFilteredPlugins: function(translateName) {
        const self = this;
        const category = this.categoryFilter;
        const searchQuery = this.searchQuery;

        /** @type {Array<PluginInfo>} */
        let plugins = this._allPlugins;
        if (category === 'installed') {
            plugins = this._installedPlugins;
        } else if (category === 'updates') {
            plugins = this.getPluginsToUpdate();
        } else if (category === "onlyoffice") {
            plugins = plugins.filter(function(plugin) {
                return !(plugin && plugin.offered);
            });
        } else if (category != "all") {
            plugins = plugins.filter(function(plugin) {
                /** @type {VariationConfig[]} */
                let variations = /** @type {VariationConfig[]} */(plugin.variations);
                let variation = variations[0];
                let arrCat = (variation.store && variation.store.categories) ? variation.store.categories : [];
                return arrCat.includes(category);
            });
        }

        plugins = plugins.filter(function(plugin) {
            let name = translateName(plugin);
            return name.toLowerCase().includes(searchQuery);
        });

        return plugins;
    },
    /** @returns {Array<PluginInfo>} */
    getInstalledPlugins: function() {
        return this._installedPlugins;
    },
    /** @returns {number} */
    getNumOfInstalledPlugins: function() {
        return this._installedPlugins.length;
    },
    getNumOfPluginsToUpdate: function() {
        const self = this;
        return this._allPlugins.reduce(function(acc, plugin) {
            const installed = self.findAvailablePlugin(plugin.guid);
            if (installed && installed.obj && installed.obj.bHasUpdate) {
                return acc + 1;
            }
            return plugin.bHasUpdate ? acc + 1 : acc;
        }, 0);
    },
    getPluginsToUpdate: function() {
        return this._allPlugins.filter(function(el) {
            return el.bHasUpdate;
        });
    },

    hasAllPlugins: function() {
        return this._allPlugins.length > 0;
    },
    /** @returns {boolean} */
    hasAvailablePlugins: function() {
        return this._availablePlugins.length > 0;
    },

    /** @param {string} guid */
    removeInstalledPlugin: function(guid) {
        this._installedPlugins = this._installedPlugins.filter(function(p) {
            return p.guid !== guid;
        });
    },

    /** @param {Array<AvailablePluginInfo>} plugins */
    setAvailablePlugins: function(plugins) {
        this.sortPlugins(plugins, 'start');
        this._availablePlugins = plugins;
        this._installedPlugins = plugins.filter(function(plugin) {
            return !plugin.removed;
        }).map(function(plugin) {
            return plugin.obj;
        });
        const aAllPluginsGuids = this._allPlugins.map(function(p) { return p.guid; });
        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            const index = aAllPluginsGuids.indexOf(plugin.guid);
            if (index === -1) {
                this._allPlugins.push(plugin.obj);
            }
        }
    },
    /**
     * @param {Array<PluginInfo>} plugins
     */
    setMarketplacePlugins: function(plugins) {
		this.sortPlugins(plugins, 'name');
        /** @type {string[]} */
        const oldMarketplacePluginsGuids = this._marketplacePlugins.map(function(p) { return p.guid; });
        this._allPlugins = this._allPlugins.filter(function(p) { return !oldMarketplacePluginsGuids.includes(p.guid); });
        this._marketplacePlugins = plugins;
        const aAllPluginsGuids = this._allPlugins.map(function(p) { return p.guid; });
        for (let i = plugins.length - 1; i >= 0; i--) {
            const plugin = plugins[i];
            const index = aAllPluginsGuids.indexOf(plugin.guid);
            if (index === -1) {
                this._allPlugins.unshift(plugin);
            } else {
                this._allPlugins[index] = plugin;
            }
        }
    },
    /**
     * @param {PluginInfo[] | AvailablePluginInfo[]} arrPlugins 
     * @param {"rating" | "installations" | "start" | "name"} type 
     */
    sortPlugins: function(arrPlugins, type) {
        if (!arrPlugins || !arrPlugins.length) {
            return arrPlugins;
        }
        /** @type {Array<AvailablePluginInfo>} */
        let installedPluginsToSort = [];
        /** @type {Array<PluginInfo>} */
        let allPluginsToSort = [];
        if (Object.hasOwnProperty.call(arrPlugins[0], 'obj')) {
            installedPluginsToSort = /** @type {Array<AvailablePluginInfo>} */(arrPlugins);
        } else {
            allPluginsToSort = /** @type {Array<PluginInfo>} */(arrPlugins);
        }
        switch (type) {
            case 'rating':
                // todo
                break;
            case 'installations':
                // todo
                break;
            case 'start':
                if (installedPluginsToSort.length) {
                    /** @type {Array<AvailablePluginInfo>} */
                    let guarded = [];
                    /** @type {Array<AvailablePluginInfo>} */
                    let removed = [];
                    /** @type {Array<AvailablePluginInfo>} */
                    let arr = [];
                    installedPluginsToSort.forEach(function(pl) {
                        if (!pl.canRemoved)
                            guarded.push(pl);
                        else if (pl.removed)
                            removed.push(pl);
                        else
                            arr.push(pl);
                    });
                    return guarded.concat(arr, removed);
                }
                break;
            case 'name':
                if (allPluginsToSort.length) {
                    return allPluginsToSort.sort(function(a, b) {
                        return a.name.localeCompare(b.name);
                    });
                } else {
                    return installedPluginsToSort.sort(function(a, b) {
                        return a.obj.name.localeCompare(b.obj.name);
                    });
                }
                break;
            default:
                break;
        }
    },

    updateCategories: function() {
        const self = this;
	    this._resetCategories();
        this._allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
            self._addPluginCategory(plugin);
        });
    },
    /** @param {PluginInfo} config */
    _addPluginCategory: function(config) {
        const self = this;
        let num = Number(this._categories.get('all'));
		this._categories.set('all', num + 1);
        const plugin = this.findPlugin(config.guid);
        const installed = this.findAvailablePlugin(config.guid);

        const variations = config.variations || (plugin && plugin.variations) || (installed && installed.obj && installed.obj.variations);
        if (!variations) {
            return;
        }

		if (!config.offered && !(plugin && plugin.offered) && !(installed && installed.obj && installed.obj.offered)) {
			let category = 'onlyoffice';
			if (this._categories.has(category)) {
				let num = Number(this._categories.get(category));
				this._categories.set(category, num + 1);
			}
		}
		variations.forEach(function(variation) {
			if (!variation.store || !variation.store.categories) {
				return;
			}
			variation.store.categories.forEach(function(/** @type {string} */category) {
				if (self._categories.has(category)) {
					let num = Number(self._categories.get(category));
					self._categories.set(category, num + 1);
				} else {
					self._categories.set(category, 1);
				}
			})
		});
    },
    _resetCategories: function() {
        this._categories = new Map();
        this._categories.set('all', 0);
        this._categories.set('onlyoffice', 0);
    },
};
