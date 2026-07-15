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

const PluginCardUI = {
    /** @type {HTMLDivElement | undefined} */
    _loader: undefined,
    /** @type {HTMLSpanElement} */
    version: /** @type {HTMLSpanElement} */ (document.getElementById('span_version')),
    /** @type {HTMLSpanElement} */
    spanOnlyOfficeBadge: /** @type {HTMLSpanElement} */ (document.querySelector('.pc-badge')),
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
    /** @type {HTMLButtonElement} */
    btnDownload: /** @type {HTMLButtonElement} */ (document.getElementById('btn_download')),
    /** @type {HTMLSpanElement} */
    spanSelectedDescr: /** @type {HTMLSpanElement} */ (document.getElementById('span_selected_description')),
    /** @type {HTMLAnchorElement} */
    linkGithub: /** @type {HTMLAnchorElement} */ (document.getElementById('link_plugin')),
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
    divEditorBadges: /** @type {HTMLDivElement} */ (document.getElementById('div_editor_badges')),
    /** @type {HTMLDivElement} */
    divReadme: /** @type {HTMLDivElement} */ (document.getElementById('div_readme_link')),
    /** @type {HTMLDivElement} */
    divSelectedImage: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_image')),
    /** @type {HTMLDivElement} */
    divSelectedPreview: /** @type {HTMLDivElement} */ (document.getElementById('div_selected_preview')),
    /** @type {HTMLDivElement} */
    divStarsColored: /** @type {HTMLDivElement} */ (document.getElementById('stars_colored')),
    /** @type {HTMLAnchorElement} */
    linkReadme: /** @type {HTMLAnchorElement} */ (document.getElementById('link_readme')),
    /** @type {HTMLSpanElement} */
    spanLanguages: /** @type {HTMLSpanElement} */ (document.getElementById('span_langs')),
    /** @type {HTMLSpanElement} */
    spanMinVersion: /** @type {HTMLSpanElement} */ (document.getElementById('span_min_ver')),
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
    /** @type {HTMLDivElement} */
    defaultPluginIcon: /** @type {HTMLDivElement} */ (document.querySelector('.default-plugin-icon')),

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
        let rule = '.pc-rating-count,\n';
        rule += '#div_changelog_preview li,\n';
        rule += '.pc .span_notification,\n';
        rule += '.pc-sub,\n';
        rule += '.pc-editor-badges-label,\n';
        rule += '.pc .span_caption{color: ' + (theme["text-secondary"] || 'rgba(0,0,0,0.6)') + ';}\n';
        rule += '#div_changelog_preview li::before{color: ' + (theme["text-tertiary"] || 'rgba(0,0,0,0.4)') + ';}\n';
        rule += '.pc .span_caption:hover{color: ' + (theme["text-normal"] || 'rgba(0,0,0,0.8)') + ';}\n';
        rule += '.pc-header, .pc-tabs{border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';
        rule += '.pc .span_caption.span_selected{color: ' + (theme["text-normal"] || 'rgba(0,0,0,0.8)') + ';}\n';
        rule += '.pc .span_caption.span_selected{border-bottom-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';
        rule += '.pc .dot{background-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';
        rule += '.pc .dot.active, .pc .dot:hover{background-color: ' + (theme["border-toolbar"] || '#111111') + ';}\n';
        rule += '.pc .prev, .pc .next {background-color: ' + (theme["background-normal"] || '#fff') + '; color: ' + (theme["text-normal"] || 'rgba(0,0,0,0.8)') + ';}\n';
        rule += '.pc .info-block {border-color: ' + (theme["border-regular-control"] || '#c0c0c0') + ';}\n';

        rule += '.pc button.btn_update,\n' +
            '.pc button.btn_update:active{color: ' + (theme["text-contrast-background"] || '#fff') + ';}\n';
        rule += '.pc .stars span{color: ' + (theme["canvas-anim-pane-effect-bar-emphasis-outline"] || '#c49a2a') + ';}\n';
        
        if (themeType.includes('light')) {
            document.body.classList.add('white_bg');
            rule += '.pc a.link:visited,\n';
            rule += '.pc a.link{color: ' + ('#00645b') + ' !important;}\n';    
            rule += '.pc a.link:hover{color: ' + ('#0e8a7e') + ' !important;}\n';   
            rule += '.pc button.btn_update:active{background-color: ' + ('#00645b') + ' !important;}\n';    
            rule += '.pc button.btn_update{border-color: ' + ('#0e8a7e') + ';}\n';    
            rule += '.pc button.btn_update:hover{background-color: ' + ('#007a6f') + ';}\n';    
            rule += '.pc button.btn_update{background-color: ' + ('#0e8a7e') + ';}\n'; 
            rule += '.pc .btn_install{background-color: #444 !important; color: #fff !important}\n';
            rule += '.pc .btn_install:hover{background-color: #1c1c1c !important;}\n';
            rule += '.pc .btn_install:active{background-color: #1c1c1c !important;}\n';
            rule += '.pc .div_offered_votes{color: rgba(0,0,0,0.45) !important;}\n';
            rule += '.pc .btn_install[disabled]:hover,.pc .btn_install.disabled:hover,.pc .btn_install[disabled]:active,.pc .btn_install[disabled].active,.pc .btn_install.disabled:active,.pc .btn_install.disabled.active{background-color: #444 !important; color: #fff !important; border:1px solid #444 !important;}\n';
            style = style.replace(/#445799/g, 'rgba(0, 0, 0, 0.8)');
            rule += '.pc .ti-circle-check{background-color: ' + ('#0e8a7e') + ';}\n';    
            
            rule += '.pc-badge{color: ' + ('#0e8a7e') + ' !important;}\n';   
            rule += '.pc-badge{background-color: ' + ('#e8f5f1') + ';}\n';

        } else {
            document.body.classList.remove('white_bg');
            rule += '.pc a.link:visited,\n';
            rule += '.pc a.link{color: ' + ('#60ddc0') + ' !important;}\n';
            rule += '.pc a.link:hover{color: ' + ('#39bda0') + ' !important;}\n';
            rule += '.pc button.btn_update:active{background-color: ' + ('#60ddc0') + ' !important;}\n';    
            rule += '.pc button.btn_update{border-color: ' + ('#39bda0') + ';}\n';    
            rule += '.pc button.btn_update:hover{background-color: ' + ('#26b094') + ';}\n';    
            rule += '.pc button.btn_update{background-color: ' + ('#39bda0') + ';}\n';  
            rule += '.pc .btn_install{background-color: #e0e0e0 !important; color: #333 !important}\n';
            rule += '.pc .btn_install:hover{background-color: #fcfcfc !important;}\n';
            rule += '.pc .btn_install:active{background-color: #fcfcfc !important;}\n';
            rule += '.pc .div_offered_votes{color: rgba(255,255,255,0.8) !important;}\n';
            rule += '.pc .btn_install[disabled]:hover,.pc .btn_install.disabled:hover,.pc .btn_install[disabled]:active,.pc .btn_install[disabled].active,.pc .btn_install.disabled:active,.pc .btn_install.disabled.active{background-color: #e0e0e0 !important; color: #333 !important; border:1px solid #e0e0e0 !important;}\n';
            style = style.replace(/#b5e4ff/g, 'rgba(255, 255, 255, 0.8)');
            rule += '.pc .ti-circle-check{background-color: ' + ('#39bda0') + ';}\n';  

            rule += '.pc-badge{color: ' + ('#60ddc0') + ' !important;}\n';   
            rule += '.pc-badge{background-color: ' + ('rgba(96, 221, 192, 0.1)') + ';}\n'; 

        }

        let styleTheme = document.getElementById('plugin_card_style');
        if (!styleTheme) {
            styleTheme = document.createElement('style');
            styleTheme.id = 'plugin_card_style';
            document.head.appendChild(styleTheme);
            styleTheme.innerHTML = style + rule;
            return false;
        } else {
            styleTheme.innerHTML = style + rule;
            return themeType == 'light' ? "#F5F5F5" : '#555555';
        }
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

            result += '</div> <span>' + rating.average + '</span> <span>(' + rating.total + ')</span>'
        }

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
            this._loader && (this._loader.remove ? this._loader.remove() : loaderContainer.removeChild(this._loader));
            this._loader = undefined;	
        } else if (!this._loader) {
            loaderContainer.classList.remove('hidden');
            const translatedText = text ? Utils.getTranslated(text) : '';
            // @ts-ignore
            this._loader = showLoader(loaderContainer, translatedText + '...');
        }
    },
}