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
/// <reference path="./card/plugin-card.js" />
/// <reference path="./marketplace/scale.js" />

const PluginCardController = {
    _isPluginCardHistoryPushed: false,

    /**
     * for v1.0.5
     * Dynamically loads CSS and JS assets needed for the inline plugin card.
     * @returns {Promise<void>}
     */
    loadPluginCardAssets: function () {
        return new Promise(function(resolve) {
            var loaded = 0;
            var scripts = [
                'vendor/marked/marked.min.js',
                'scripts/card/plugin-card-ui.js',
                'scripts/card/plugin-card.js'
            ];

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'resources/css/plugin-card.css';
            document.head.appendChild(link);

            function onScriptLoad() {
                loaded++;
                if (loaded === scripts.length) resolve();
            }

            scripts.forEach(function(src) {
                var s = document.createElement('script');
                s.src = src;
                s.onload = onScriptLoad;
                s.onerror = onScriptLoad;
                document.head.appendChild(s);
            });
        });
    },

    /** @returns {boolean} whether the plugin card should render as a centered popup instead of taking over the full page */
    _isPluginCardModalMode: function() {
        const documentElement = document.documentElement;
        const width = window.innerWidth || documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || documentElement.clientHeight || document.body.clientHeight;
        return width >= 721 && height >= 601;
    },

    /** @param {boolean} independentMode */
    syncPluginCardModalState: function(independentMode) {
        let pluginCardDiv = document.getElementById('plugin_card_panel');
        let marketplaceDiv = document.getElementById('plugins');
        let overlayDiv = document.getElementById('plugin_card_overlay');
        if (!pluginCardDiv || !marketplaceDiv || !overlayDiv || pluginCardDiv.classList.contains('hidden')) {
            return;
        }
        const needModal = this._isPluginCardModalMode() && independentMode;
        if (needModal) {
            marketplaceDiv.classList.remove('hidden');
            overlayDiv.classList.remove('hidden');
        } else {
            marketplaceDiv.classList.add('hidden');
            overlayDiv.classList.add('hidden');
        }
    },

    /**
     * @param {PluginCardWindowParams} data
     */
    showPluginCard: function(data) {
        let pluginCardDiv = document.getElementById('plugin_card_panel');
        let marketplaceDiv = document.getElementById('plugins');
        if (pluginCardDiv && marketplaceDiv) {
            pluginCardDiv.classList.remove('hidden');
        }
        this.syncPluginCardModalState(data.independentMode);

        PluginCard.init(data);

        this._isPluginCardHistoryPushed = true;
        window.history.pushState({ pluginCardOpen: true }, '');
    },
    // for v1.0.5
    /** @param {boolean} [blockForwardHistory] - discard the forward history entry left by history.back(), so the user can't navigate forward to reopen the card */
    hidePluginCard: function(blockForwardHistory) {
        let pluginCardDiv = document.getElementById('plugin_card_panel');
        let marketplaceDiv = document.getElementById('plugins');
        let overlayDiv = document.getElementById('plugin_card_overlay');
        if (pluginCardDiv && marketplaceDiv) {
            pluginCardDiv.classList.add('hidden');
            marketplaceDiv.classList.remove('hidden');
            if (overlayDiv) {
                overlayDiv.classList.add('hidden');
            }
        }
        window.onresize = Scale.onResize.bind(Scale, false);
        if (blockForwardHistory) {
            window.history.pushState(null, '');
        }
    },

    goBackToMarketplace: function() {
        if (this._isPluginCardHistoryPushed) {
            // consume the history entry pushed by showPluginCard,
            // the actual hiding is done by the popstate handler
            window.history.back();
        } else {
            this.hidePluginCard();
        }
    }
};

window.addEventListener('popstate', function() {
	if (PluginCardController._isPluginCardHistoryPushed) {
		PluginCardController._isPluginCardHistoryPushed = false;
		PluginCardController.hidePluginCard(true);
	}
});

window.addEventListener('keydown', function(e) {
    if (e && e.key === 'Escape') {
        MarketplacePluginService.closePluginCard();
        PluginCardController.goBackToMarketplace();
    }
});