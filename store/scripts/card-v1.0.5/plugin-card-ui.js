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
/// <reference path="../types.js" />
/// <reference path="../utils.js" />

const PluginCardUI = {
    /** @type {HTMLDivElement} */
    loader: undefined,
    /** @type {HTMLImageElement} */
    imgIcon: /** @type {HTMLImageElement} */ (document.getElementById('img_icon')),
    /** @type {HTMLSpanElement} */
    spanName: /** @type {HTMLSpanElement} */ (document.getElementById('span_name')),
    /** @type {HTMLSpanElement} */
    spanOffered: /** @type {HTMLSpanElement} */ (document.getElementById('span_offered')),
    /** @type {HTMLButtonElement} */
    btnUpdate: /** @type {HTMLButtonElement} */ (document.getElementById('btn_update')),
    /** @type {HTMLButtonElement} */
    btnRemove: /** @type {HTMLButtonElement} */ (document.getElementById('btn_remove')),
    /** @type {HTMLButtonElement} */
    btnInstall: /** @type {HTMLButtonElement} */ (document.getElementById('btn_install')),
    /** @type {HTMLSpanElement} */
    spanSelectedDescr: /** @type {HTMLSpanElement} */ (document.getElementById('span_selected_description')),
    /** @type {HTMLAnchorElement} */
    linkPlugin: /** @type {HTMLAnchorElement} */ (document.getElementById('link_plugin')),
    /** @type {HTMLSpanElement} */
    arrowNext: /** @type {HTMLSpanElement} */ (document.getElementById('next_arrow')),
    /** @type {HTMLSpanElement} */
    arrowPrev: /** @type {HTMLSpanElement} */ (document.getElementById('prev_arrow')),
    /** @type {HTMLAnchorElement} */
    discussionLink: /** @type {HTMLAnchorElement} */ (document.getElementById('discussion_link')),
    /** @type {HTMLDivElement} */
    divDescriptionSelected: /** @type {HTMLDivElement} */ (document.getElementById('div_description_selected')),
    /** @type {HTMLDivElement} */
    divGitLink: /** @type {HTMLDivElement} */ (document.getElementById('div_github_link')),
    /** @type {HTMLDivElement} */
    divLanguages: /** @type {HTMLDivElement} */ (document.getElementById('div_languages')),
    /** @type {HTMLDivElement} */
    divMinVersion: /** @type {HTMLDivElement} */ (document.getElementById('div_min_version')),
    /** @type {HTMLDivElement} */
    divRatingLink: /** @type {HTMLDivElement} */ (document.getElementById('div_rating_link')),
    /** @type {HTMLDivElement} */
    divReadme: /** @type {HTMLDivElement} */ (document.getElementById('div_readme_link')),
    /** @type {HTMLDivElement} */
    divSelectedImage: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_image')),
    /** @type {HTMLDivElement} */
    divSelectedPreview: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_preview')),
    /** @type {HTMLDivElement} */
    divStarsColored: /** @type {HTMLDivElement} */ (document.getElementById('stars_colored')),
    /** @type {HTMLDivElement} */
    divVersion: /** @type {HTMLDivElement} */ (document.getElementById('div_version')),
    /** @type {HTMLDivElement} */
    divVotes: /** @type {HTMLDivElement} */ (document.getElementById('div_votes')),
    /** @type {HTMLAnchorElement} */
    linkReadme: /** @type {HTMLAnchorElement} */ (document.getElementById('link_readme')),
    /** @type {HTMLSpanElement} */
    spanLanguages: /** @type {HTMLSpanElement} */ (document.getElementById('span_langs')),
    /** @type {HTMLSpanElement} */
    spanMinVersion: /** @type {HTMLSpanElement} */ (document.getElementById('span_min_ver')),
    /** @type {HTMLSpanElement} */
    spanVersion: /** @type {HTMLSpanElement} */ (document.getElementById('span_ver')),
    /** @type {HTMLSpanElement} */
    totalVotes: /** @type {HTMLSpanElement} */ (document.getElementById('total_votes')),
    /** @type {HTMLSpanElement} */
    spanChangelog: /** @type {HTMLSpanElement} */ (document.getElementById('span_changelog')),
    /** @type {HTMLSpanElement} */
    spanOverview: /** @type {HTMLSpanElement} */ (document.getElementById('span_overview')),
    /** @type {HTMLDivElement} */
    divChangelogPreview: /** @type {HTMLDivElement} */ (document.getElementById('div_changelog_preview')),
    /** @type {HTMLDivElement} */
    divSelectedContainer: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_container')),
    /** @type {HTMLDivElement} */
    divPointsContainer: /** @type {HTMLDivElement} */ (document.getElementById('points_container')),
    /** @type {HTMLDivElement} */
    divIconInfo: /** @type {HTMLDivElement} */ (document.getElementById('div_icon_info')),
    /** @type {HTMLDivElement} */
    divSelectedChangelog: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_changelog')),
    /** @type {HTMLDivElement} */
    divSelectedInfo: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_info')),

    /** @param {'light' | string} themeType */
    init: function(themeType) {
        let rule = '\n.asc-plugin-loader{background-color:' + (themeType == 'light' ? '#ffffff' : '#333333') + ';padding: 10px;display: flex;justify-content: center;align-items: center;border-radius: 5px;}\n'
        rule += '.asc-plugin-loader{color:' + (themeType == 'light' ? '#444444' : 'rgba(255,255,255,0.8)') + '}\n';
        let styleTheme = document.createElement('style');
        styleTheme.innerHTML = rule;
        document.head.appendChild(styleTheme);
    },

    /**
     * @param {*} theme
     * @param {'light'|string} themeType
     * @param {string} style
     * @returns {string|false} returns default background color or false if theme is not changed
     */
    onChangeTheme: function(theme, themeType, style) {
        let rule = '.span_notification{color:'+theme["text-secondary"]+';}\n';

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
            return themeType == 'light' ? "#F5F5F5" : '#555555';
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
            this.loader && (this.loader.remove ? this.loader.remove() : loaderContainer.removeChild(this.loader));
            this.loader = undefined;	
        } else if (!this.loader) {
            loaderContainer.classList.remove('hidden');
            const translatedText = text ? Utils.getTranslated(text) : '';
            // @ts-ignore
            this.loader = showLoader(loaderContainer, translatedText + '...');
        }
    },
}