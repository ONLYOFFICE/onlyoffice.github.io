// @ts-check

/**
 * @typedef {Object} CslJsonObjectItem
 * @property {CslJsonObjectData} data
 * @property {string} key
 * @property {CslJsonObjectLibrary} library
 * @property {CslJsonObjectLinks} links
 * @property {CslJsonObjectMeta} meta
 * @property {number} version
 */

/**
 * @typedef {Object} CslJsonObjectData
 * @property {string} ISBN
 * @property {string} abstractNote
 * @property {string} accessDate
 * @property {string} archive
 * @property {string} archiveLocation
 * @property {string} callNumber
 * @property {Array<any>} collections
 * @property {{creatorType: string, firstName: string, lastName: string}[]} creators
 * @property {string} date
 * @property {string} dateAdded
 * @property {string} dateModified
 * @property {string} edition
 * @property {string} extra
 * @property {string} itemType
 * @property {string} key
 * @property {string} language
 * @property {string} libraryCatalog
 * @property {string} numPages
 * @property {string} numberOfVolumes
 * @property {string} place
 * @property {string} publisher
 * @property {Object} relations
 * @property {string} rights
 * @property {string} series
 * @property {string} seriesNumber
 * @property {string} shortTitle
 * @property {Array<string>} tags
 * @property {string} title
 * @property {string} url
 * @property {number} version
 * @property {string} volume
 */

/**
 * @typedef {Object} CslJsonObjectLink
 * @property {string} href
 * @property {string} type
 */

/**
 * @typedef {Object} CslJsonObjectMeta
 * @property {{id:number,name:string,username:string,links:{alternate:CslJsonObjectLink}}} createdByUser
 * @property {string} creatorSummary
 * @property {number} numChildren
 * @property {string} parsedDate
 */

/**
 * @typedef {Object} CslJsonObjectLinks
 * @property {CslJsonObjectLink} alternate
 * @property {CslJsonObjectLink} self
 */

/**
 * @typedef {Object} CslJsonObjectLibrary
 * @property {number} id
 * @property {{alternate:CslJsonObjectLink}} links
 * @property {string} name
 * @property {string} type
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} CustomField
 * @property {string} Value
 * @property {string} Content
 * @property {string} [FieldId]
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} AscSimpleRequestParams
 * @property {string} url
 * @property {"GET"|"POST"} method
 * @property {object} headers
 * @property {string} [body]
 * @property {function(AscSimpleResponse, string): void} complete
 * @property {function(AscSimpleResponse, string, Error): void} error
 */

/**
 * @typedef {Object} AscSimpleRequest
 * @property {function(AscSimpleRequestParams): void} createRequest
 */

/**
 * @typedef {Object} AscSimpleResponse
 * @property {number} responseStatus
 * @property {string} responseText
 * @property {string} [message]
 * @property {string} status
 * @property {number} statusCode
 */

/** @type {AscSimpleRequest} */
var AscSimpleRequest = window.AscSimpleRequest;

/** ------------------------------------------------ */

/**
 * @typedef {Object} SupSubPositions
 * @property {'sup'|'sub'} type
 * @property {number} start
 * @property {number} end
 * @property {string} content
 * @property {string} originalMatch
 */

/**
 * @typedef {Object} AscPluginTheme
 * @property {string} `text-normal`
 * @property {string} `background-normal`
 * @property {string} `highlight-button-hover`
 * @property {string} `highlight-button-pressed`
 * @property {string} `border-regular-control`
 * @property {string} `border-toolbar`
 * @property {string} `border-divider`
 * @property {string} `background-toolbar`
 * @property {string} RulerLight
 * @property {string} Color - text color
 * @property {string} type - light/dark
 */

/**
 * @callback ExecuteCommandCallback
 * @param {string} command
 * @param {any} [value]
 * @param {function} [callback]
 * @returns {void}
 */

/**
 * @callback CallCommandCallback
 * @param {function} command
 * @param {boolean} [isClose]
 * @param {boolean} [isCalc]
 * @param {function} [callback]
 * @returns {void}
 */

/**
 * @typedef {Object} ThemeColors
 * @property {string} Name - Theme name
 * @property {"light" | "dark"} type - Theme type (light/dark)
 * @property {boolean} RulersButton - Show rulers button
 * @property {boolean} NavigationButtons - Show navigation buttons
 * @property {boolean} ThumbnailScrollWidthNullIfNoScrolling - Set thumbnail scroll width to null if no scrolling
 * @property {boolean} isNeedInvertOnActive - Need to invert on active
 * @property {boolean} SupportNotes - Support notes
 * @property {number} STYLE_THUMBNAIL_WIDTH - Style thumbnail width
 * @property {number} STYLE_THUMBNAIL_HEIGHT - Style thumbnail height
 * @property {number} FormsContentControlsOutlineBorderRadiusHover - Forms content controls outline border radius hover
 * @property {number} FormsContentControlsOutlineBorderRadiusActive - Forms content controls outline border radius active
 * @property {number} THEMES_THUMBNAIL_WIDTH - Themes thumbnail width
 * @property {number} THEMES_THUMBNAIL_HEIGHT - Themes thumbnail height
 * @property {number} THEMES_LAYOUT_THUMBNAIL_HEIGHT - Themes layout thumbnail height
 * @property {number} SplitterWidthMM - Splitter width in mm
 * @property {number} AnimPaneTimelineScrollerOpacity - Animation pane timeline scroller opacity
 * @property {number} AnimPaneTimelineScrollerOpacityHovered - Animation pane timeline scroller hover opacity
 * @property {number} AnimPaneTimelineScrollerOpacityActive - Animation pane timeline scroller active opacity
 * @property {string} BackgroundColor - Background color
 * @property {string} PageOutline - Page outline color
 * @property {string} RulerDark - Dark ruler color
 * @property {string} RulerLight - Light ruler color
 * @property {string} RulerOutline - Ruler outline color
 * @property {string} RulerMarkersOutlineColor - Ruler markers outline color
 * @property {string} RulerMarkersOutlineColorOld - Old ruler markers outline color
 * @property {string} RulerMarkersFillColor - Ruler markers fill color
 * @property {string} RulerMarkersFillColorOld - Old ruler markers fill color
 * @property {string} RulerTextColor - Ruler text color
 * @property {string} RulerTabsColor - Ruler tabs color
 * @property {string} RulerTabsColorOld - Old ruler tabs color
 * @property {string} RulerTableColor1 - Ruler table color 1
 * @property {string} RulerTableColor2 - Ruler table color 2
 * @property {string} ScrollBackgroundColor - Scroll background color
 * @property {string} ScrollOutlineColor - Scroll outline color
 * @property {string} ScrollOutlineHoverColor - Scroll outline hover color
 * @property {string} ScrollOutlineActiveColor - Scroll outline active color
 * @property {string} ScrollerColor - Scroller color
 * @property {string} ScrollerHoverColor - Scroller hover color
 * @property {string} ScrollerActiveColor - Scroller active color
 * @property {string} ScrollArrowColor - Scroll arrow color
 * @property {string} ScrollArrowHoverColor - Scroll arrow hover color
 * @property {string} ScrollArrowActiveColor - Scroll arrow active color
 * @property {string} ScrollerTargetColor - Scroller target color
 * @property {string} ScrollerTargetHoverColor - Scroller target hover color
 * @property {string} ScrollerTargetActiveColor - Scroller target active color
 * @property {string} ContentControlsBack - Content controls background
 * @property {string} ContentControlsHover - Content controls hover background
 * @property {string} ContentControlsActive - Content controls active background
 * @property {string} ContentControlsText - Content controls text color
 * @property {string} ContentControlsTextActive - Content controls active text color
 * @property {string} ContentControlsAnchorActive - Content controls anchor active color
 * @property {string} FormsContentControlsOutlineHover - Forms content controls outline hover
 * @property {string} FormsContentControlsOutlineActive - Forms content controls outline active
 * @property {string} FormsContentControlsMarkersBackground - Forms content controls markers background
 * @property {string} FormsContentControlsMarkersBackgroundHover - Forms content controls markers background hover
 * @property {string} FormsContentControlsMarkersBackgroundActive - Forms content controls markers background active
 * @property {string} FormsContentControlsOutlineMoverHover - Forms content controls outline mover hover
 * @property {string} FormsContentControlsOutlineMoverActive - Forms content controls outline mover active
 * @property {string} BackgroundColorThumbnails - Thumbnails background color
 * @property {string} BackgroundColorThumbnailsActive - Thumbnails active background color
 * @property {string} BackgroundColorThumbnailsHover - Thumbnails hover background color
 * @property {string} ThumbnailsPageOutlineActive - Thumbnails page active outline color
 * @property {string} ThumbnailsPageOutlineHover - Thumbnails page hover outline color
 * @property {string} ThumbnailsPageNumberText - Thumbnails page number text color
 * @property {string} ThumbnailsPageNumberTextActive - Thumbnails page number active text color
 * @property {string} ThumbnailsPageNumberTextHover - Thumbnails page number hover text color
 * @property {string} ThumbnailsLockColor - Thumbnails lock color
 * @property {string} BackgroundColorNotes - Notes background color
 * @property {string} BorderSplitterColor - Border splitter color
 * @property {string} AnimPaneBackground - Animation pane background
 * @property {string} AnimPaneItemFillSelected - Animation pane selected item fill
 * @property {string} AnimPaneItemFillHovered - Animation pane hovered item fill
 * @property {string} AnimPaneButtonFill - Animation pane button fill
 * @property {string} AnimPaneButtonFillHovered - Animation pane button hover fill
 * @property {string} AnimPaneButtonFillDisabled - Animation pane button disabled fill
 * @property {string} AnimPanePlayButtonFill - Animation pane play button fill
 * @property {string} AnimPanePlayButtonOutline - Animation pane play button outline
 * @property {string} AnimPaneEffectBarFillEntrance - Animation pane entrance effect bar fill
 * @property {string} AnimPaneEffectBarOutlineEntrance - Animation pane entrance effect bar outline
 * @property {string} AnimPaneEffectBarFillEmphasis - Animation pane emphasis effect bar fill
 * @property {string} AnimPaneEffectBarOutlineEmphasis - Animation pane emphasis effect bar outline
 * @property {string} AnimPaneEffectBarFillExit - Animation pane exit effect bar fill
 * @property {string} AnimPaneEffectBarOutlineExit - Animation pane exit effect bar outline
 * @property {string} AnimPaneEffectBarFillPath - Animation pane path effect bar fill
 * @property {string} AnimPaneEffectBarOutlinePath - Animation pane path effect bar outline
 * @property {string} AnimPaneTimelineRulerOutline - Animation pane timeline ruler outline
 * @property {string} AnimPaneTimelineRulerTick - Animation pane timeline ruler tick
 * @property {string} AnimPaneTimelineScrollerFill - Animation pane timeline scroller fill
 * @property {string} AnimPaneTimelineScrollerOutline - Animation pane timeline scroller outline
 * @property {string} AnimPaneText - Animation pane text color
 * @property {string} AnimPaneTextActive - Animation pane active text color
 * @property {string} AnimPaneTextHover - Animation pane hover text color
 * @property {string} DemBackgroundColor - DEM background color
 * @property {string} DemButtonBackgroundColor - DEM button background color
 * @property {string} DemButtonBackgroundColorHover - DEM button hover background color
 * @property {string} DemButtonBackgroundColorActive - DEM button active background color
 * @property {string} DemButtonBorderColor - DEM button border color
 * @property {string} DemButtonTextColor - DEM button text color
 * @property {string} DemButtonTextColorActive - DEM button active text color
 * @property {string} DemSplitterColor - DEM splitter color
 * @property {string} DemTextColor - DEM text color
 * @property {string} Background - General background color
 * @property {string} BackgroundActive - Active background color
 * @property {string} BackgroundHighlighted - Highlighted background color
 * @property {string} Border - General border color
 * @property {string} BorderActive - Active border color
 * @property {string} BorderHighlighted - Highlighted border color
 * @property {string} Color - General text color
 * @property {string} ColorActive - Active text color
 * @property {string} ColorHighlighted - Highlighted text color
 * @property {string} ColorFiltering - Filtering text color
 * @property {string} SheetViewCellBackground - Sheet view cell background
 * @property {string} SheetViewCellBackgroundPressed - Sheet view cell pressed background
 * @property {string} SheetViewCellBackgroundHover - Sheet view cell hover background
 * @property {string} SheetViewCellTitleLabel - Sheet view cell title label color
 * @property {string} ColorDark - Dark text color
 * @property {string} ColorDarkActive - Dark active text color
 * @property {string} ColorDarkHighlighted - Dark highlighted text color
 * @property {string} ColorDarkFiltering - Dark filtering text color
 * @property {string} GroupDataBorder - Group data border color
 * @property {string} EditorBorder - Editor border color
 * @property {string} SelectAllIcon - Select all icon color
 * @property {string} SheetViewSelectAllIcon - Sheet view select all icon color
 * @property {string} `toolbar-header-document` - Document toolbar header background
 * @property {string} `toolbar-header-spreadsheet` - Spreadsheet toolbar header background
 * @property {string} `toolbar-header-presentation` - Presentation toolbar header background
 * @property {string} `toolbar-header-pdf` - PDF toolbar header background
 * @property {string} `toolbar-header-visio` - Visio toolbar header background
 * @property {string} `text-toolbar-header-on-background-document` - Document toolbar header text on background
 * @property {string} `text-toolbar-header-on-background-spreadsheet` - Spreadsheet toolbar header text on background
 * @property {string} `text-toolbar-header-on-background-presentation` - Presentation toolbar header text on background
 * @property {string} `text-toolbar-header-on-background-pdf` - PDF toolbar header text on background
 * @property {string} `text-toolbar-header-on-background-visio` - Visio toolbar header text on background
 * @property {string} `background-normal` - Normal background color
 * @property {string} `background-toolbar` - Toolbar background color
 * @property {string} `background-toolbar-additional` - Additional toolbar background color
 * @property {string} `background-primary-dialog-button` - Primary dialog button background color
 * @property {string} `background-notification-popover` - Notification popover background color
 * @property {string} `background-notification-badge` - Notification badge background color
 * @property {string} `background-scrim` - Scrim background color
 * @property {string} `background-loader` - Loader background color
 * @property {string} `background-accent-button` - Accent button background color
 * @property {string} `background-contrast-popover` - Contrast popover background color
 * @property {string} `shadow-contrast-popover` - Contrast popover shadow
 * @property {string} `highlight-button-hover` - Button hover highlight
 * @property {string} `highlight-button-pressed` - Button pressed highlight
 * @property {string} `highlight-button-pressed-hover` - Button pressed hover highlight
 * @property {string} `highlight-primary-dialog-button-hover` - Primary dialog button hover highlight
 * @property {string} `highlight-header-button-hover` - Header button hover highlight
 * @property {string} `highlight-header-button-pressed` - Header button pressed highlight
 * @property {string} `highlight-text-select` - Text select highlight
 * @property {string} `highlight-accent-button-hover` - Accent button hover highlight
 * @property {string} `highlight-accent-button-pressed` - Accent button pressed highlight
 * @property {string} `highlight-toolbar-tab-underline-document` - Document toolbar tab underline
 * @property {string} `highlight-toolbar-tab-underline-spreadsheet` - Spreadsheet toolbar tab underline
 * @property {string} `highlight-toolbar-tab-underline-presentation` - Presentation toolbar tab underline
 * @property {string} `highlight-toolbar-tab-underline-pdf` - PDF toolbar tab underline
 * @property {string} `highlight-toolbar-tab-underline-visio` - Visio toolbar tab underline
 * @property {string} `highlight-header-tab-underline-document` - Document header tab underline
 * @property {string} `highlight-header-tab-underline-spreadsheet` - Spreadsheet header tab underline
 * @property {string} `highlight-header-tab-underline-presentation` - Presentation header tab underline
 * @property {string} `highlight-header-tab-underline-pdf` - PDF header tab underline
 * @property {string} `highlight-header-tab-underline-visio` - Visio header tab underline
 * @property {string} `border-toolbar` - Toolbar border color
 * @property {string} `border-divider` - Divider border color
 * @property {string} `border-regular-control` - Regular control border color
 * @property {string} `border-toolbar-button-hover` - Toolbar button hover border
 * @property {string} `border-preview-hover` - Preview hover border
 * @property {string} `border-preview-select` - Preview select border
 * @property {string} `border-control-focus` - Control focus border
 * @property {string} `border-color-shading` - Color shading border
 * @property {string} `border-error` - Error border color
 * @property {string} `border-contrast-popover` - Contrast popover border
 * @property {string} `text-normal` - Normal text color
 * @property {string} `text-normal-pressed` - Normal pressed text color
 * @property {string} `text-secondary` - Secondary text color
 * @property {string} `text-tertiary` - Tertiary text color
 * @property {string} `text-link` - Link text color
 * @property {string} `text-link-hover` - Link hover text color
 * @property {string} `text-link-active` - Link active text color
 * @property {string} `text-link-visited` - Link visited text color
 * @property {string} `text-inverse` - Inverse text color
 * @property {string} `text-toolbar-header` - Toolbar header text color
 * @property {string} `text-contrast-background` - Contrast background text color
 * @property {string} `text-alt-key-hint` - Alt key hint text color
 * @property {string} `icon-normal` - Normal icon color
 * @property {string} `icon-normal-pressed` - Normal pressed icon color
 * @property {string} `icon-inverse` - Inverse icon color
 * @property {string} `icon-toolbar-header` - Toolbar header icon color
 * @property {string} `icon-notification-badge` - Notification badge icon color
 * @property {string} `icon-contrast-popover` - Contrast popover icon color
 * @property {string} `icon-success` - Success icon color
 * @property {string} `canvas-background` - Canvas background color
 * @property {string} `canvas-content-background` - Canvas content background color
 * @property {string} `canvas-page-border` - Canvas page border color
 * @property {string} `canvas-ruler-background` - Canvas ruler background color
 * @property {string} `canvas-ruler-border` - Canvas ruler border color
 * @property {string} `canvas-ruler-margins-background` - Canvas ruler margins background color
 * @property {string} `canvas-ruler-mark` - Canvas ruler mark color
 * @property {string} `canvas-ruler-handle-border` - Canvas ruler handle border color
 * @property {string} `canvas-ruler-handle-border-disabled` - Canvas ruler disabled handle border color
 * @property {string} `canvas-high-contrast` - Canvas high contrast color
 * @property {string} `canvas-high-contrast-disabled` - Canvas disabled high contrast color
 * @property {string} `canvas-cell-border` - Canvas cell border color
 * @property {string} `canvas-cell-title-background` - Canvas cell title background color
 * @property {string} `canvas-cell-title-background-hover` - Canvas cell title hover background color
 * @property {string} `canvas-cell-title-background-selected` - Canvas cell title selected background color
 * @property {string} `canvas-cell-title-border` - Canvas cell title border color
 * @property {string} `canvas-cell-title-border-hover` - Canvas cell title hover border color
 * @property {string} `canvas-cell-title-border-selected` - Canvas cell title selected border color
 * @property {string} `canvas-cell-title-text` - Canvas cell title text color
 * @property {string} `canvas-dark-cell-title` - Canvas dark cell title color
 * @property {string} `canvas-dark-cell-title-hover` - Canvas dark cell title hover color
 * @property {string} `canvas-dark-cell-title-selected` - Canvas dark cell title selected color
 * @property {string} `canvas-dark-cell-title-border` - Canvas dark cell title border color
 * @property {string} `canvas-dark-cell-title-border-hover` - Canvas dark cell title hover border color
 * @property {string} `canvas-dark-cell-title-border-selected` - Canvas dark cell title selected border color
 * @property {string} `canvas-dark-content-background` - Canvas dark content background color
 * @property {string} `canvas-dark-page-border` - Canvas dark page border color
 * @property {string} `canvas-scroll-thumb` - Canvas scroll thumb color
 * @property {string} `canvas-scroll-thumb-hover` - Canvas scroll thumb hover color
 * @property {string} `canvas-scroll-thumb-pressed` - Canvas scroll thumb pressed color
 * @property {string} `canvas-scroll-thumb-border` - Canvas scroll thumb border color
 * @property {string} `canvas-scroll-thumb-border-hover` - Canvas scroll thumb hover border color
 * @property {string} `canvas-scroll-thumb-border-pressed` - Canvas scroll thumb pressed border color
 * @property {string} `canvas-scroll-arrow` - Canvas scroll arrow color
 * @property {string} `canvas-scroll-arrow-hover` - Canvas scroll arrow hover color
 * @property {string} `canvas-scroll-arrow-pressed` - Canvas scroll arrow pressed color
 * @property {string} `canvas-scroll-thumb-target` - Canvas scroll thumb target color
 * @property {string} `canvas-scroll-thumb-target-hover` - Canvas scroll thumb target hover color
 * @property {string} `canvas-scroll-thumb-target-pressed` - Canvas scroll thumb target pressed color
 * @property {string} `canvas-sheet-view-cell-background` - Canvas sheet view cell background color
 * @property {string} `canvas-sheet-view-cell-background-hover` - Canvas sheet view cell hover background color
 * @property {string} `canvas-sheet-view-cell-background-pressed` - Canvas sheet view cell pressed background color
 * @property {string} `canvas-sheet-view-cell-title-label` - Canvas sheet view cell title label color
 * @property {string} `canvas-freeze-line-1px` - Canvas 1px freeze line color
 * @property {string} `canvas-freeze-line-2px` - Canvas 2px freeze line color
 * @property {string} `canvas-select-all-icon` - Canvas select all icon color
 * @property {string} `canvas-anim-pane-background` - Canvas animation pane background color
 * @property {string} `canvas-anim-pane-item-fill-selected` - Canvas animation pane selected item fill color
 * @property {string} `canvas-anim-pane-item-fill-hovered` - Canvas animation pane hovered item fill color
 * @property {string} `canvas-anim-pane-button-fill` - Canvas animation pane button fill color
 * @property {string} `canvas-anim-pane-button-fill-hovered` - Canvas animation pane button hover fill color
 * @property {string} `canvas-anim-pane-button-fill-disabled` - Canvas animation pane button disabled fill color
 * @property {string} `canvas-anim-pane-play-button-fill` - Canvas animation pane play button fill color
 * @property {string} `canvas-anim-pane-play-button-outline` - Canvas animation pane play button outline color
 * @property {string} `canvas-anim-pane-effect-bar-entrance-fill` - Canvas animation pane entrance effect bar fill color
 * @property {string} `canvas-anim-pane-effect-bar-entrance-outline` - Canvas animation pane entrance effect bar outline color
 * @property {string} `canvas-anim-pane-effect-bar-emphasis-fill` - Canvas animation pane emphasis effect bar fill color
 * @property {string} `canvas-anim-pane-effect-bar-emphasis-outline` - Canvas animation pane emphasis effect bar outline color
 * @property {string} `canvas-anim-pane-effect-bar-exit-fill` - Canvas animation pane exit effect bar fill color
 * @property {string} `canvas-anim-pane-effect-bar-exit-outline` - Canvas animation pane exit effect bar outline color
 * @property {string} `canvas-anim-pane-effect-bar-path-fill` - Canvas animation pane path effect bar fill color
 * @property {string} `canvas-anim-pane-effect-bar-path-outline` - Canvas animation pane path effect bar outline color
 * @property {string} `canvas-anim-pane-timeline-ruler-outline` - Canvas animation pane timeline ruler outline color
 * @property {string} `canvas-anim-pane-timeline-ruler-tick` - Canvas animation pane timeline ruler tick color
 * @property {string} `canvas-anim-pane-timeline-scroller-fill` - Canvas animation pane timeline scroller fill color
 * @property {string} `canvas-anim-pane-timeline-scroller-outline` - Canvas animation pane timeline scroller outline color
 * @property {string} `canvas-anim-pane-timeline-scroller-opacity` - Canvas animation pane timeline scroller opacity
 * @property {string} `canvas-anim-pane-timeline-scroller-opacity-hovered` - Canvas animation pane timeline scroller hover opacity
 * @property {string} `canvas-anim-pane-timeline-scroller-opacity-active` - Canvas animation pane timeline scroller active opacity
 * @property {string} `toolbar-height-controls` - Toolbar height controls value
 * @property {string} `sprite-button-icons-uid` - Sprite button icons UID
 * @property {string} name - Theme name (duplicate for compatibility)
 */

/**
 * @typedef {Object} AscPlugin
 * @property {function(string, Array<any>|null, function(any): void): void} executeMethod
 * @property {ExecuteCommandCallback} executeCommand
 * @property {CallCommandCallback} callCommand
 * @property {function(): void} init
 * @property {object} info
 * @property {function(string): void} sendToPlugin
 * @property {function} onTranslate
 * @property {function(string, function): void} attachEvent
 * @property {function(ThemeColors): void} onThemeChanged
 * @property {function(ThemeColors): void} onThemeChangedBase
 * @property {AscPluginTheme} theme
 * @property {function(string): string} tr
 */

/**
 * @typedef {Object} Asc
 * @property {AscPlugin} plugin
 * @property {{positions: Array<SupSubPositions>}} scope
 * @property {any} PluginWindow
 */

/** @type {Asc} */
var Asc = window.Asc;

/** ------------------------------------------------ */

/**
 * @typedef {Object} Api
 * @property {function(): any} GetDocument
 */

/** @type {Api} */
var Api = window.Api;

/** ------------------------------------------------ */

/**
 * @typedef {Object} FetchResponse
 * @property {function(): Promise<ArrayBuffer>} arrayBuffer
 * @property {function(): Promise<Blob>} blob
 * @property {function(): Promise<any>} json
 * @property {function(): Promise<string>} text
 * @property {boolean} ok
 * @property {number} status
 * @property {string} statusText
 * @property {Headers} headers
 * @property {string} type
 * @property {string} url
 * @property {boolean} redirected
 */

/**
 * @typedef {Promise<FetchResponse>} FetchPromise
 */

/** ------------------------------------------------ */
