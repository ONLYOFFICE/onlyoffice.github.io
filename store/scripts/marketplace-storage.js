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

const MarketplaceStorage = {
    /** @type {MainFilter} */
    mainFilter: "marketplace",
    /** @type {CategoryFilter} */
    categoryFilter: "onlyoffice",
    /** @type {string} */
    searchQuery: "",
    /** @type {Map<string, number>} */
    _categories: new Map(),
    /** @type {string} */
    selectedCategory: "",
    /** @type {string} */
    selectedPluginGuid: "",

    /** @type {Array<InstalledPluginInfo>} */
    installedPlugins: [], // list of installed plugins
    /** @type {Array<PluginInfo>} */
    allPlugins: [], // list of all plugins from config

    
    /**
     * @param {string} guid 
     * @returns {PluginInfo | undefined}
     */
    findPlugin: function(guid) {
        let res = this.allPlugins.find(function(el){return el.guid === guid});
        return res;
    },

    /**
     * @param {string} guid 
     * @returns {InstalledPluginInfo | undefined}
     */
    findInstalledPlugin: function(guid) {
        return this.installedPlugins.find(function(el){return el.guid === guid});
    },
    
    /**
     * @param {function(PluginInfo): string} translateName
     * @returns {Plugins}
     */
    getFilteredPlugins: function(translateName) {
        const category = this.categoryFilter;
        const mainFilter = this.mainFilter;
        const searchQuery = this.searchQuery;

        /** @type {Plugins} */
        let plugins = this.allPlugins;
        if (mainFilter === 'installed') {
            plugins = this.installedPlugins;
        } else if (mainFilter === 'updates') {
            plugins = this.getPluginsToUpdate();
        }

        if (category === "onlyoffice") {
            plugins = plugins.filter(function(plugin) {
                if (Object.prototype.hasOwnProperty.call(plugin, 'obj')) {
                    return !plugin.obj.offered;
                }
                return !plugin.offered;
            });
        } else if (category != "all") {
            plugins = plugins.filter(function(plugin) {
                let variations = plugin.variations;
                if (Object.prototype.hasOwnProperty.call(plugin, 'obj')) {
                    variations = plugin.obj.variations;
                }
                let variation = variations[0];
                let arrCat = (variation.store && variation.store.categories) ? variation.store.categories : [];
                return arrCat.includes(category);
            });
        }

        plugins = plugins.filter(function(el) {
            let plugin = el.obj || el;
            let name = translateName(plugin);
            return name.toLowerCase().includes(searchQuery);
        });

        return plugins;
    },

    getNumOfPluginsToUpdate: function() {
        const self = this;
        return this.allPlugins.reduce(function(acc, plugin) {
            const installed = self.findInstalledPlugin(plugin.guid);
            if (installed && installed.obj && installed.obj.bHasUpdate) {
                return acc + 1;
            }
            return plugin.bHasUpdate ? acc + 1 : acc;
        }, 0);
    },
    getPluginsToUpdate: function() {
        return this.allPlugins.filter(function(el) {
            return el.bHasUpdate;
        });
    },
    /** @param {PluginInfo} plugin */
    _addPluginCategory: function(plugin) {
        const self = this;
        let num = Number(this._categories.get('all'));
		this._categories.set('all', num + 1);
		if (!plugin.variations) {
			return;
		}
		if (!plugin.offered) {
			let category = 'onlyoffice';
			if (this._categories.has(category)) {
				let num = Number(this._categories.get(category));
				this._categories.set(category, num + 1);
			}
		}
		plugin.variations.forEach(function(variation) {
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

    updateCategories: function() {
        const self = this;
	    this._resetCategories();
        if (this.mainFilter === 'marketplace') {
            this.allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
                self._addPluginCategory(plugin);
            });
        } else if (this.mainFilter === 'installed') {
            this.installedPlugins.forEach(function(/** @type {InstalledPluginInfo} */ plugin) {
                if (!plugin.obj) {
                    return;
                }
                self._addPluginCategory(plugin.obj);
            });
        } else {
            this.allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
                if (!plugin.bHasUpdate) {
                    return;
                }
                self._addPluginCategory(plugin);
            });
        }
    },
    _resetCategories: function() {
        this._categories = new Map();
        this._categories.set('all', 0);
        this._categories.set('onlyoffice', 0);
    },

    getCategories: function() {
        return this._categories;
    }
};