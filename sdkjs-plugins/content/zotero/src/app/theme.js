/*
 * (c) Copyright Ascensio System SIA 2010-2025
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
/// <reference path="./types-global.js" />

const Theme = {
    /**
     * @param {ThemeColors} theme
     */
    addStylesForComponents: function (theme) {
        let styles = "";
        /*
        if (!theme.RulersButton) {}
        if (!theme.NavigationButtons) {}
        */
        /*if (theme.STYLE_THUMBNAIL_WIDTH && theme.STYLE_THUMBNAIL_HEIGHT) {}*/
        /*if (theme.THEMES_THUMBNAIL_WIDTH && theme.THEMES_THUMBNAIL_HEIGHT) {}
        if (theme.THEMES_LAYOUT_THUMBNAIL_HEIGHT) {}*/
        //if (theme.PageOutline) {}
        /*if (theme.RulerDark) {}
        if (theme.RulerLight) {}
        if (theme.RulerOutline) {}
        if (theme.RulerMarkersOutlineColor && theme.RulerMarkersFillColor) {}
        if (theme.RulerTextColor) {}
        if (theme.RulerTabsColor) {}*/
        //if (theme.RulerMarkersOutlineColorOld) {}
        //if (theme.RulerMarkersFillColorOld) {}
        //if (theme.RulerTabsColorOld) {}
        //if (theme.RulerTableColor1 && theme.RulerTableColor2) {}

        /*if (theme.ScrollBackgroundColor && theme.ScrollOutlineColor) {}
        if (theme.ScrollOutlineHoverColor) {}
        if (theme.ScrollOutlineActiveColor) {}
        if (theme.ScrollerColor) {}
        if (theme.ScrollerHoverColor) {}
        if (theme.ScrollerActiveColor) {}
        if (theme.ScrollArrowColor) {}
        if (theme.ScrollArrowHoverColor) {}
        if (theme.ScrollArrowActiveColor) {}
        if (theme.ScrollerTargetColor) {}
        if (theme.ScrollerTargetHoverColor) {}
        if (theme.ScrollerTargetActiveColor) {}*/

        /*if (theme.ContentControlsBack && theme.ContentControlsText) {}
        if (theme.ContentControlsActive && theme.ContentControlsText) {}
        if (theme.ContentControlsHover) {}
        if (theme.ContentControlsAnchorActive) {}*/
        /*if (theme.FormsContentControlsOutlineBorderRadiusHover) {}
        if (theme.FormsContentControlsOutlineBorderRadiusActive) {}
        if (theme.FormsContentControlsOutlineHover) {}
        if (theme.FormsContentControlsOutlineActive) {}
        if (theme.FormsContentControlsMarkersBackground) {}
        if (theme.FormsContentControlsMarkersBackgroundHover) {}
        if (theme.FormsContentControlsMarkersBackgroundActive) {}
        if (theme.FormsContentControlsOutlineMoverHover) {}
        if (theme.FormsContentControlsOutlineMoverActive) {}*/

        /*if (theme.BackgroundColorThumbnails) {}
        if (theme.BackgroundColorThumbnailsActive) {}
        if (theme.BackgroundColorThumbnailsHover) {}
        if (theme.ThumbnailsPageOutlineActive) {}
        if (theme.ThumbnailsPageOutlineHover) {}
        if (theme.ThumbnailsPageNumberText) {}
        if (theme.ThumbnailsPageNumberTextActive) {}
        if (theme.ThumbnailsPageNumberTextHover) {}
        if (theme.ThumbnailsLockColor) {}*/
        /*if (theme.ThumbnailScrollWidthNullIfNoScrolling) {}*/
        /*if (theme.BackgroundColorNotes) {}*/
        /*
        if (theme.AnimPaneTimelineScrollerOpacity) {}
        if (theme.AnimPaneTimelineScrollerOpacityHovered) {}
        if (theme.AnimPaneTimelineScrollerOpacityActive) {}
        if (theme.AnimPaneBackground) {}
        if (theme.AnimPaneItemFillSelected) {}
        if (theme.AnimPaneItemFillHovered) {}
        if (theme.AnimPaneButtonFill) {}
        if (theme.AnimPaneButtonFillHovered) {}
        if (theme.AnimPaneButtonFillDisabled) {}
        if (theme.AnimPanePlayButtonFill && theme.AnimPanePlayButtonOutline) {}
        if (
            theme.AnimPaneEffectBarFillEntrance &&
            theme.AnimPaneEffectBarOutlineEntrance
        ) {}
        if (
            theme.AnimPaneEffectBarFillEmphasis &&
            theme.AnimPaneEffectBarOutlineEmphasis
        ) {}
        if (
            theme.AnimPaneEffectBarFillExit &&
            theme.AnimPaneEffectBarOutlineExit
        ) {}
        if (
            theme.AnimPaneEffectBarFillPath &&
            theme.AnimPaneEffectBarOutlinePath
        ) {}
        if (theme.AnimPaneTimelineRulerOutline) {}
        if (theme.AnimPaneTimelineRulerTick) {}
        if (
            theme.AnimPaneTimelineScrollerFill &&
            theme.AnimPaneTimelineScrollerOutline
        ) {}
        if (theme.AnimPaneText) {}
        if (theme.AnimPaneTextActive) {}
        if (theme.AnimPaneTextHover) {}
        */
        /*
        if (theme.DemBackgroundColor && theme.DemTextColor) {}
        if (
            theme.DemButtonBackgroundColor &&
            theme.DemButtonBorderColor &&
            theme.DemButtonTextColor
        ) {}
        if (
            theme.DemButtonBackgroundColorActive &&
            theme.DemButtonTextColorActive
        ) {}
        if (theme.DemButtonBackgroundColorHover) {}
        if (theme.DemSplitterColor) {}
        */
        /*
        if (theme.SplitterWidthMM) {}
        if (theme.BorderSplitterColor) {}
        */
        /*
        if (theme.BackgroundColor) {}
        if (theme.Background) {}
        */
        //if (theme.BackgroundActive) {}
        /*
        if (theme.BackgroundHighlighted) {}
        if (theme.Border) {}
        if (theme.BorderActive) {}
        if (theme.BorderHighlighted) {}
        if (theme.Color) {}
        if (theme.ColorActive) {}
        if (theme.ColorHighlighted) {}
        if (theme.ColorFiltering) {}
        */
        /*
        if (theme.SheetViewCellBackground) {}
        if (theme.SheetViewCellBackgroundPressed) {}
        if (theme.SheetViewCellBackgroundHover) {}
        if (theme.SheetViewCellTitleLabel) {}
        */
        /*
        if (theme.ColorDark) {}
        if (theme.ColorDarkActive) {}
        if (theme.ColorDarkHighlighted) {}
        if (theme.ColorDarkFiltering) {}
        if (theme.GroupDataBorder) {}
        if (theme.EditorBorder) {}
        if (theme.SelectAllIcon) {}
        */
        /*
        if (theme.SheetViewSelectAllIcon) {}
        if (theme["SheetViewSelectAllIcon"]) {}
        */
        /*
        if (theme["toolbar-header-document"]) {}
        if (theme["toolbar-header-spreadsheet"]) {}
        if (theme["toolbar-header-presentation"]) {}
        if (theme["toolbar-header-pdf"]) {}
        if (theme["toolbar-header-visio"]) {}
        if (theme["text-toolbar-header-on-background-document"]) {}
        if (theme["text-toolbar-header-on-background-spreadsheet"]) {}
        if (theme["text-toolbar-header-on-background-presentation"]) {}
        if (theme["text-toolbar-header-on-background-pdf"]) {}
        if (theme["text-toolbar-header-on-background-visio"]) {}
        */
        /*
        if (theme["background-toolbar"]) {}
        if (theme["background-notification-popover"]) {}
        if (theme["background-notification-badge"]) {}
        if (theme["background-scrim"]) {}

        if (theme["background-accent-button"]) {}
        if (theme["background-contrast-popover"]) {}
        */
        // if (theme["shadow-contrast-popover"]) {}
        /*
        if (theme["highlight-button-pressed-hover"]) {}
        if (theme["highlight-header-button-hover"]) {}
        if (theme["highlight-header-button-pressed"]) {}
        if (theme["highlight-text-select"]) {}
        if (theme["highlight-accent-button-hover"]) {}
        if (theme["highlight-accent-button-pressed"]) {}
        if (theme["highlight-toolbar-tab-underline-document"]) {}
        if (theme["highlight-toolbar-tab-underline-spreadsheet"]) {}
        if (theme["highlight-toolbar-tab-underline-presentation"]) {}
        if (theme["highlight-toolbar-tab-underline-pdf"]) {}
        if (theme["highlight-toolbar-tab-underline-visio"]) {}
        if (theme["highlight-header-tab-underline-document"]) {}
        if (theme["highlight-header-tab-underline-spreadsheet"]) {}
        if (theme["highlight-header-tab-underline-presentation"]) {}
        if (theme["highlight-header-tab-underline-pdf"]) {}
        if (theme["highlight-header-tab-underline-visio"]) {}
        */
        /*
        if (theme["border-toolbar"]) {}
        if (theme["border-divider"]) {}
        if (theme["border-toolbar-button-hover"]) {}
        if (theme["border-preview-hover"]) {}
        if (theme["border-preview-select"]) {}
        if (theme["border-color-shading"]) {}
        if (theme["border-contrast-popover"]) {}
        */

        /*
        if (theme["text-normal-pressed"]) {}
        if (theme["text-link"]) {}
        if (theme["text-link-hover"]) {}
        if (theme["text-link-active"]) {}
        if (theme["text-link-visited"]) {}
        if (theme["text-toolbar-header"]) {}
        if (theme["text-contrast-background"]) {}
        if (theme["text-alt-key-hint"]) {}
        */
        /*
        if (theme["icon-normal"]) {}
        if (theme["icon-normal-pressed"]) {}
        if (theme["icon-inverse"]) {}
        if (theme["icon-toolbar-header"]) {}
        if (theme["icon-notification-badge"]) {}
        if (theme["icon-contrast-popover"]) {}
        if (theme["icon-success"]) {}
        */
        /*
        if (theme["canvas-background"]) {}
        if (theme["canvas-content-background"]) {}
        if (theme["canvas-page-border"]) {}
        if (theme["canvas-ruler-background"]) {}
        if (theme["canvas-ruler-border"]) {}
        if (theme["canvas-ruler-margins-background"]) {}
        if (theme["canvas-ruler-mark"]) {}
        if (theme["canvas-ruler-handle-border"]) {}
        if (theme["canvas-ruler-handle-border-disabled"]) {}
        if (theme["canvas-high-contrast"]) {}
        if (theme["canvas-high-contrast-disabled"]) {}
        if (theme["canvas-cell-border"]) {}
        if (theme["canvas-cell-title-background"]) {}
        if (theme["canvas-cell-title-background-hover"]) {}
        if (theme["canvas-cell-title-background-selected"]) {}
        if (theme["canvas-cell-title-border"]) {}
        if (theme["canvas-cell-title-border-hover"]) {}
        if (theme["canvas-cell-title-border-selected"]) {}
        if (theme["canvas-cell-title-text"]) {}
        if (theme["canvas-dark-cell-title"]) {}
        if (theme["canvas-dark-cell-title-hover"]) {}
        if (theme["canvas-dark-cell-title-selected"]) {}
        if (theme["canvas-dark-cell-title-border"]) {}
        if (theme["canvas-dark-cell-title-border-hover"]) {}
        if (theme["canvas-dark-cell-title-border-selected"]) {}
        if (theme["canvas-dark-content-background"]) {}
        if (theme["canvas-dark-page-border"]) {}
        if (theme["canvas-scroll-thumb-hover"]) {}
        if (theme["canvas-scroll-thumb-pressed"]) {}
        if (theme["canvas-scroll-thumb-border"]) {}
        if (theme["canvas-scroll-arrow"]) {}
        if (theme["canvas-scroll-arrow-hover"]) {}
        if (theme["canvas-scroll-arrow-pressed"]) {}
        if (theme["canvas-scroll-thumb-target"]) {}
        if (theme["canvas-scroll-thumb-target-hover"]) {}
        if (theme["canvas-scroll-thumb-target-pressed"]) {}
        if (theme["canvas-sheet-view-cell-background"]) {}
        if (theme["canvas-sheet-view-cell-background-hover"]) {}
        if (theme["canvas-sheet-view-cell-background-pressed"]) {}
        if (theme["canvas-sheet-view-cell-title-label"]) {}
        if (theme["canvas-freeze-line-1px"]) {}
        if (theme["canvas-freeze-line-2px"]) {}
        if (theme["canvas-select-all-icon"]) {}
        if (theme["canvas-anim-pane-background"]) {}
        if (theme["canvas-anim-pane-item-fill-selected"]) {}
        if (theme["canvas-anim-pane-item-fill-hovered"]) {}
        if (theme["canvas-anim-pane-button-fill"]) {}
        if (theme["canvas-anim-pane-button-fill-hovered"]) {}
        if (theme["canvas-anim-pane-button-fill-disabled"]) {}
        if (theme["canvas-anim-pane-play-button-fill"]) {}
        if (theme["canvas-anim-pane-play-button-outline"]) {}
        if (theme["canvas-anim-pane-effect-bar-entrance-fill"]) {}
        if (theme["canvas-anim-pane-effect-bar-entrance-outline"]) {}
        if (theme["canvas-anim-pane-effect-bar-emphasis-fill"]) {}
        if (theme["canvas-anim-pane-effect-bar-emphasis-outline"]) {}
        if (theme["canvas-anim-pane-effect-bar-exit-fill"]) {}
        if (theme["canvas-anim-pane-effect-bar-exit-outline"]) {}
        if (theme["canvas-anim-pane-effect-bar-path-fill"]) {}
        if (theme["canvas-anim-pane-effect-bar-path-outline"]) {}
        if (theme["canvas-anim-pane-timeline-ruler-outline"]) {}
        if (theme["canvas-anim-pane-timeline-ruler-tick"]) {}
        if (theme["canvas-anim-pane-timeline-scroller-fill"]) {}
        if (theme["canvas-anim-pane-timeline-scroller-outline"]) {}
        if (theme["canvas-anim-pane-timeline-scroller-opacity"]) {}
        if (theme["canvas-anim-pane-timeline-scroller-opacity-hovered"]) {}
        if (theme["canvas-anim-pane-timeline-scroller-opacity-active"]) {}
        */

        if (theme["background-toolbar"]) {
            styles +=
                ".loader-body,\n" +
                ".loader-bg { background-color: " +
                theme["background-toolbar"] +
                "; }\n";
            styles +=
                ".loader-body {     box-shadow: 0 0 99px 99px " +
                theme["background-toolbar"] +
                "; }\n";
        }
        if (theme["background-loader"]) {
            styles +=
                ".loader-image { color: " +
                theme["background-loader"] +
                "; }\n";
        }
        if (theme["background-normal"]) {
            styles +=
                ".custom-button-secondary-icon,\n" +
                ".custom-button-secondary,\n" +
                ".input-field-element,\n" +
                ".selectbox-search-input,\n" +
                ".selectbox-header,\n" +
                ".selectbox-dropdown,\n" +
                ".radio-visual, \n" +
                ".checkbox-visual, \n" +
                ".message { background-color: " +
                theme["background-normal"] +
                "; }\n";
        }
        if (theme["text-inverse"]) {
            styles +=
                ".custom-button-primary { color: " +
                theme["text-inverse"] +
                "; }\n";
        }
        if (theme["border-regular-control"]) {
            styles +=
                ".custom-button-icon-only:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:active:not(.custom-button-disabled),\n" +
                ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary,\n" +
                ".custom-button-secondary-icon,\n" +
                ".input-field-element,\n" +
                ".checkbox-visual,\n" +
                ".radio-visual,\n" +
                ".selectbox-header,\n" +
                ".selectbox-dropdown,\n" +
                ".selectbox-search-input:focus,\n" +
                ".message { border-color: " +
                theme["border-regular-control"] +
                "; }\n";
            styles +=
                ".selectbox-search,\n" +
                ".selectbox-option-divider { border-color: " +
                theme["border-regular-control"] +
                " !important; }\n";
        }
        if (theme["border-error"]) {
            styles +=
                ".input-field-invalid .input-field-element { border-color: " +
                theme["border-error"] +
                "; }\n";
        }
        if (theme["border-control-focus"]) {
            styles +=
                ".custom-button-icon-only:focus:not(:active):not(:hover),\n" +
                ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" +
                ".custom-button-secondary:focus:not(:active):not(:hover),\n" +
                ".input-field-element:focus,\n" +
                ".input-field-focused .input-field-element,\n" +
                ".selectbox-header:active,\n" +
                ".selectbox-header:focus,\n" +
                ".selectbox-header-open { border-color: " +
                theme["border-control-focus"] +
                "; }\n";
        }
        if (theme["highlight-button-hover"]) {
            styles +=
                ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:hover:not(.custom-button-disabled),\n" +
                ".selectbox-custom-option:hover,\n" +
                ".selectbox-option:hover { background-color: " +
                theme["highlight-button-hover"] +
                "; }\n";
        }
        if (theme["highlight-button-pressed"]) {
            styles +=
                ".custom-button-icon-only:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:active:not(.custom-button-disabled),\n" +
                ".selectbox-option-selected:hover,\n" +
                ".selectbox-option-selected { background-color: " +
                theme["highlight-button-pressed"] +
                "; }\n";
            styles +=
                ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " +
                theme["highlight-button-pressed"] +
                "; }\n";
        }
        if (theme["highlight-primary-dialog-button-hover"]) {
            styles +=
                ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; border-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; }\n";
        }
        if (theme["background-primary-dialog-button"]) {
            styles +=
                ".checkbox-indeterminate,\n" +
                ".custom-button-primary { background-color: " +
                theme["background-primary-dialog-button"] +
                "; border-color: " +
                theme["background-primary-dialog-button"] +
                "; }\n";
        }
        if (theme["background-toolbar-additional"]) {
            styles +=
                ".custom-button-secondary-icon:disabled,\n" +
                ".custom-button-secondary-icon.custom-button-disabled,\n" +
                ".custom-button-secondary:disabled,\n" +
                ".custom-button-secondary.custom-button-disabled { background-color: " +
                theme["background-toolbar-additional"] +
                "; border-color: " +
                theme["background-toolbar-additional"] +
                "; }\n";
        }
        if (theme["text-normal"]) {
            styles +=
                ".custom-button-secondary-icon,\n" +
                ".custom-button-secondary,\n" +
                ".custom-button-secondary-icon,\n" +
                ".custom-button-icon-only,\n" +
                ".selectbox-search-input,\n" +
                ".loader-image,\n" +
                ".input-field-element { color: " +
                theme["text-normal"] +
                "; }\n";
            styles +=
                ".input-field-search-icon svg { fill: " +
                theme["text-normal"] +
                "; }\n";
        }
        if (theme["text-secondary"]) {
            styles +=
                ".message-close:hover,\n" +
                ".input-field-clear:hover { color: " +
                theme["text-secondary"] +
                "; }\n";
        }
        if (theme["text-tertiary"]) {
            styles +=
                ".input-field-clear,\n" +
                ".message-container:hover .message-close,\n" +
                ".custom-button-secondary-icon:disabled,\n" +
                ".custom-button-secondary-icon.custom-button-disabled,\n" +
                ".custom-button-secondary:disabled,\n" +
                ".custom-button-secondary.custom-button-disabled,\n" +
                ".input-field-element::placeholder,\n" +
                ".selectbox-search-input::placeholder { color: " +
                theme["text-tertiary"] +
                "; }\n";
        }
        let fontSize = "11px";
        if (
            ["theme-white", "theme-night"].indexOf(theme.name) !== -1 ||
            ["theme-white", "theme-night"].indexOf(theme.Name) !== -1
        ) {
            fontSize = "12px";
            styles +=
                ".message,\n" +
                ".custom-button,\n" +
                ".selectbox-header,\n" +
                ".input-field-element { border-radius: 4px; }\n";
            styles += ".radio--checked .radio-visual { border-width: 4px; }\n";
            styles +=
                ".checkbox-checkmark { color: " +
                theme["text-inverse"] +
                "; }\n";
            styles +=
                ".checkbox--checked .checkbox-visual { background-color: " +
                theme["background-primary-dialog-button"] +
                "; }\n";
            styles +=
                ".radio--checked .radio-visual,\n" +
                ".checkbox--checked .checkbox-visual { border-color: " +
                theme["background-primary-dialog-button"] +
                "; }\n";
            styles +=
                ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n" +
                ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " +
                theme["highlight-button-hover"] +
                "; }\n";
            styles +=
                ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; background-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; }\n";
            styles +=
                ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; }\n";
            styles += "body { font-size: 12px; }\n";
        } else {
            styles +=
                ".checkbox-checkmark { color: " +
                theme["text-normal"] +
                "; }\n";
            styles +=
                ".radio--checked .radio-visual { background-color: " +
                theme["text-normal"] +
                ";\n box-shadow: 0 0 0 2px" +
                theme["background-normal"] +
                " inset; }\n";
            styles +=
                ".radio-button-container:hover .radio-visual,\n" +
                ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " +
                theme["border-control-focus"] +
                "; }\n";
        }
        styles +=
            "body, input, textarea, select, button { font-size: " +
            fontSize +
            "; }\n";

        let styleTheme = document.getElementById("componentsStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "componentsStyles";
            styleTheme.innerHTML = styles;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
            return styles;
        }
        styleTheme.innerHTML = styles;
        return styles;
    },

    /**
     * @param {ThemeColors} theme
     */
    fixThemeForIE: function (theme) {
        if (!theme["background-toolbar"]) {
            theme["background-toolbar"] = "#f7f7f7";
        }
        if (!theme["text-normal"]) {
            theme["text-normal"] = "rgb(51, 51, 51)";
        }
        if (!theme["text-secondary"]) {
            theme["text-secondary"] = "#848484";
        }
        if (!theme["highlight-button-hover"]) {
            theme["highlight-button-hover"] = "#e0e0e0";
        }
        if (!theme["background-normal"]) {
            theme["background-normal"] = "white";
        }
        if (!theme["background-loader"]) {
            theme["background-loader"] = "rgba(24, 24, 24, 0.9)";
        }
        if (!theme["highlight-button-pressed"]) {
            theme["highlight-button-pressed"] = "#cbcbcb";
        }
        if (!theme["text-inverse"]) {
            theme["text-inverse"] = "white";
        }
        if (!theme["border-regular-control"]) {
            theme["border-regular-control"] = "#c0c0c0";
        }
        if (!theme["border-error"]) {
            theme["border-error"] = "#f62211";
        }
        if (!theme["border-control-focus"]) {
            theme["border-control-focus"] = "#848484";
        }
        if (!theme["highlight-primary-dialog-button-hover"]) {
            theme["highlight-primary-dialog-button-hover"] = "#1c1c1c";
        }
        if (!theme["background-primary-dialog-button"]) {
            theme["background-primary-dialog-button"] = "#444444";
        }
        if (!theme["background-toolbar-additional"]) {
            theme["background-toolbar-additional"] = "#efefef";
        }
        if (!theme["text-tertiary"]) {
            theme["text-tertiary"] = "#bdbdbd";
        }

        return theme;
    },
};

export { Theme };
