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

const MarketplaceUrlManager = {
	
	STORAGE_KEY: 'DeveloperMarketplaceUrl',

	/** @returns {string} the address set through the developer window, it lives in this browser only */
	getDeveloperUrl: function() {
		try {
			// for incognito mode
			return localStorage.getItem(this.STORAGE_KEY) || '';
		} catch (err) {
			return '';
		}
	},

	/** @param {string} url an empty value forgets the stored address */
	setDeveloperUrl: function(url) {
		try {
			// for incognito mode
			if (url)
				localStorage.setItem(this.STORAGE_KEY, url);
			else
				localStorage.removeItem(this.STORAGE_KEY);
		} catch (err) {
		}
	},

	/** @param {object} options editorConfig.plugins.options as delivered to the plugin */
	isDevModeAllowed: function(options) {
		return options.developerMode !== false;
	},

	/** @param {object} options */
	getAdminUrl: function(options) {
		const url = options.marketplaceUrl;
		return typeof url === 'string' ? url : '';
	},

	/**
	 * The developer address overrides the administrator one, but only while the developer mode
	 * is allowed - the ban applies to everyone, whatever was stored earlier.
	 * @param {object} options
	 * @param {string} defaultUrl
	 * @returns {string}
	 */
	resolve: function(options, defaultUrl) {
		const developerUrl = this.isDevModeAllowed(options) ? this.getDeveloperUrl() : '';
		return developerUrl || this.getAdminUrl(options) || defaultUrl;
	},

	/**
	 * Points a store address at another page of the same store.
	 * @param {string} url
	 * @param {string} page
	 * @param {string} defaultUrl
	 * @returns {string}
	 */
	toStorePage: function(url, page, defaultUrl) {
		const storeIndex = url.indexOf('/store/');
		return -1 !== storeIndex ? url.substring(0, storeIndex) + '/store/' + page : defaultUrl;
	}
};
