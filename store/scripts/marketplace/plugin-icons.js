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
/// <reference path="./marketplace/storage.js" />
/// <reference path="../shared/utils.js" />

const PluginIcons = {
	_ICON_SCALES: [
		['100%', '/icon.png',       '1x'],
		['125%', '/icon@1.25x.png', '1.25x'],
		['150%', '/icon@1.5x.png',  '1.5x'],
		['175%', '/icon@1.75x.png', '1.75x'],
		['200%', '/icon@2x.png',    '2x'],
	],
	/**
	 * Returns icon `src` (1x) and `srcset` covering all supported scales for use on <img>.
	 * @param {string} guid
	 * @param {boolean} isLocal
	 * @returns {{src: string, srcset: string}}
	 */
	getImageUrl: function(guid, isLocal) {
		const defaults = this._ICON_SCALES.map(function(s) { return './resources/img/defaults/card' + s[1]; });

		/** @type {PluginInfo | undefined} */
		let plugin;
		/** @type {AvailablePluginInfo | undefined} */
		let availablePlugin = MarketplaceStorage.findAvailablePlugin(guid);
		let baseUrl = '';
		// We have a problem with "http" and "file" routes.
		// In desktop we have a local installed marketplace. It's why we use local routes only for desktop.
		if (MarketplaceStorage.hasAvailablePlugins() && isLocal) {
			// it doesn't work when we use icons from other resource (cors problems)
			// it's why we use local icons only for desktop
			if (availablePlugin) {
				plugin = availablePlugin.obj;
				baseUrl = plugin.baseUrl;
			}
		}
		if ((!plugin || !isLocal) && MarketplaceStorage.hasAllPlugins()) {
			const found = MarketplaceStorage.findPlugin(guid);
			if (found) {
				plugin = found;
				baseUrl = found.baseUrl;
			}
		}
		// github doesn't allow to use "http" or "file" as the URL for an image
		if (!plugin || !(baseUrl.includes('https://') || isLocal)) {
			return this._buildImgAttrs(defaults);
		}

		const variation = plugin.variations && plugin.variations[0];
		if (!variation) {
			return this._buildImgAttrs(defaults);
		}

		if (variation.store && variation.store.icons) {
			// new scheme: folder per theme + scale suffix
			const folder = baseUrl + variation.store.icons[Utils.themeType];
			return this._buildImgAttrs(this._ICON_SCALES.map(function(s) { return folder + s[1]; }));
		}

		if (variation.icons2) {
			// old scheme: array of theme-tagged objects, each with all scale percents
			return this._buildImgAttrs(this._resolveOldThemedIcons(variation.icons2, baseUrl));
		}

		if (variation.icons) {
			if (!Array.isArray(variation.icons)) {
				// new scheme: object { light, dark } with folder paths
				const folder = baseUrl + /** @type {Record<string, string>} */(variation.icons)[Utils.themeType];
				return this._buildImgAttrs(this._ICON_SCALES.map(function(s) { return folder + s[1]; }));
			}
			if (typeof variation.icons[0] === 'object') {
				// old scheme like icons2
				return this._buildImgAttrs(this._resolveOldThemedIcons(/** @type {Array<{style?: string, [key: string]: any}>} */(/** @type {unknown} */(variation.icons)), baseUrl));
			}
			// old scheme: plain string array [normal, retina]
			const normal = baseUrl + variation.icons[0];
			const retina = baseUrl + (variation.icons[1] || variation.icons[0]);
			// follow legacy threshold: scale.value >= 1.2 → retina
			return this._buildImgAttrs([normal, retina, retina, retina, retina]);
		}

		return this._buildImgAttrs(defaults);
	},

	/**
	 * @param {string[]} urls 5 URLs in _ICON_SCALES order
	 * @returns {{src: string, srcset: string}}
	 */
	_buildImgAttrs: function(urls) {
		const parts = [];
		for (let i = 0; i < urls.length; i++) {
			if (urls[i]) parts.push(urls[i] + ' ' + this._ICON_SCALES[i][2]);
		}
		return { src: urls[0], srcset: parts.join(', ') };
	},
	/**
	 * Picks the icon object matching current theme and returns urls for all 5 scales.
	 * @param {Array<{style?: string, [scalePercent: string]: any}>} icons
	 * @param {string} baseUrl
	 * @returns {string[]}
	 */
	_resolveOldThemedIcons: function(icons, baseUrl) {
		let icon = icons[0];
		for (let i = 1; i < icons.length; i++) {
			const style = icons[i].style;
			if (style && Utils.themeType.includes(style)) {
				icon = icons[i];
				break;
			}
		}
		return this._ICON_SCALES.map(function(s) {
			const entry = icon[s[0]];
			return entry && entry.normal ? baseUrl + entry.normal : '';
		});
	}



}
