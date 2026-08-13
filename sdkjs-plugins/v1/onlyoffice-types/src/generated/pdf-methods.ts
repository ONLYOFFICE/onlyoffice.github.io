// Auto-generated from ONLYOFFICE/sdkjs JSDoc (common/apiBase_plugins.js + per-editor api_plugins.js).
// executeMethod names/args/returns for Pdf. Run `npm run generate-plugin-methods` to regenerate.

/**
 * The skinnable plugin button used in the plugin interface (used for visual plugins with their own
 * window only, i.e. isVisual == true and isInsideMode == false).
 */
interface Button {
  /** The label which is displayed on the button. */
  text: string;

  /** Defines if the button is primary or not. The primary flag affects the button skin only. */
  primary?: boolean;

  /** Defines if the button is shown in the viewer mode only or not. */
  isViewer?: boolean;

  /**
   * Translations for the text field. The object keys are the two letter language codes (ru, de, it,
   * etc.) and the values are the button label translation for each language.
   */
  textLocale?: localeTranslate;
}

/** The context menu item. */
interface ContextMenuItem {
  /** The item ID. */
  id: string;

  /** The item text. */
  text: string;

  /** The item data (this data will be sent to the click event callback). */
  data?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} documentation).
   */
  icons?: string;

  /** An array containing the context menu items for the current item. */
  items: ContextMenuItem[];
}

/**
 * Plugin event ("onDocumentContentReady", "onTargetPositionChanged", onClick", "onInputHelperClear",
 * "onInputHelperInput", etc.).
 */
type EventType = string;

/** An object containing the font information. */
interface FontInfo {
  /** The font name. */
  m_wsFontName: string;

  /** The path to the file with the current font. */
  m_wsFontPath: string;

  /** The font number in the file if there is more than one font in the file. */
  m_lIndex: number;

  /** Specifies if the font characters are bold or not. */
  m_bBold: boolean;

  /** Specifies if the font characters are italic or not. */
  m_bItalic: boolean;

  /** Specifies if the current font is monospaced or not. */
  m_bIsFixed: boolean;

  /**
   * The PANOSE Typeface Classification Number, a compact 10-byte description of the font critical visual
   * characteristics, such as contrast, weight, and serif style.
   */
  m_aPanose: number[];

  /** The Unicode range encompassed by the font file (Bits 0-31). */
  m_ulUnicodeRange1: number;

  /** The Unicode range encompassed by the font file (Bits 32-63). */
  m_ulUnicodeRange2: number;

  /** The Unicode range encompassed by the font file (Bits 64-95). */
  m_ulUnicodeRange3: number;

  /** The Unicode range encompassed by the font file (Bits 96-127). */
  m_ulUnicodeRange4: number;

  /** The code pages encompassed by the font file (Bits 0-31). */
  m_ulCodePageRange1: number;

  /** The code pages encompassed by the font file (Bits 32-63). */
  m_ulCodePageRange2: number;

  /** The visual weight (stroke blackness or thickness) of the font characters (1-1000). */
  m_usWeigth: number;

  /** The relative change from the normal aspect ratio (width to height ratio). */
  m_usWidth: number;

  /** The font family class which values are assigned by IBM to each font family. */
  m_sFamilyClass: number;

  /**
   * The specific file type(s) used to store font data: **0** - *.fon, **1** - *.ttf, **2** - *.ttf,
   * *.otf (CFF), **3** - unknown font format.
   */
  m_eFontFormat: number;

  /** The arithmetic average of the escapement (width) of all non-zero width glyphs in the font. */
  m_shAvgCharWidth: number;

  /** The height above the baseline for a clipping region. */
  m_shAscent: number;

  /** The vertical extent below the baseline for a clipping region. */
  m_shDescent: number;

  /** The typographic line gap for the current font. */
  m_shLineGap: number;

  /**
   * The distance between the baseline and the approximate height of non-ascending lowercase letters
   * measured in FUnits.
   */
  m_shXHeight: number;

  /**
   * The distance between the baseline and the approximate height of uppercase letters measured in
   * FUnits.
   */
  m_shCapHeight: number;
}

/** An object containing the information about the base64 encoded *png* image. */
interface ImageData {
  /** The image source in the base64 format. */
  src: string;

  /** The image width in pixels. */
  width: number;

  /** The image height in pixels. */
  height: number;

  /** Specifies how to adjust the image object in case of replacing the selected image. */
  replaceMode?: ReplaceImageMode;
}

/** An object containing the data about all the macros from the document. */
interface Macros {
  /** An array of macros codes (*[{"name": "Macros1", "value": "{macrosCode}"}]*). */
  macrosArray: string[];

  /** A current macro index. */
  current: number;
}

/** The OLE object properties */
interface OLEProperties {
  /** OLE object data (internal format). */
  data?: string;

  /** A link to the image (its visual representation) stored in the OLE object and used by the plugin. */
  imgSrc?: string;

  /**
   * An identifier of the plugin which can edit the current OLE object and must be of the *asc.{UUID}*
   * type.
   */
  guid?: string;

  /** The OLE object width measured in millimeters. */
  width?: number;

  /** The OLE object height measured in millimeters. */
  height?: number;

  /** The OLE object image width in pixels. */
  widthPix?: number;

  /** The OLE object image height in pixels. */
  heightPix?: number;
}

/** The plugin object. */
interface PluginData {
  /** The URL to plugin config. */
  url: string;

  /** The plugin identifier. It must be of the *asc.{UUID}* type. */
  guid: string;

  /** Specifies if the plugin can be removed (**true**) or not (**false**). */
  canRemoved: boolean;

  /**
   * The {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} of the
   * installed plugin. The version is taken from the config and compared with the current one to check
   * for updates.
   */
  obj: object;
}

/** The plugin options. */
interface PluginOptions {
  /** The parameters which will be set for all plugins ({ "all" : { key, value } }). */
  all: object;

  /**
   * The parameters which will be set for a specific plugin. The plugin must be specified with the plugin
   * GUID of the asc.{UUID} type ({ "plugin_guid" : { keyForSpecificPlugin : valueForSpecificPlugin } }).
   */
  plugin_guid: object;
}

/**
 * Axis-aligned rectangle represented as a tuple.
 *
 * Invariants:
 * - rect[0] < rect[2] (x1 < x2)
 * - rect[1] < rect[3] (y1 < y2)
 */
interface Rect {
  /** x1 (left) */
  "0": pt;

  /** y1 (top) */
  "1": pt;

  /** x2 (right) */
  "2": pt;

  /** y2 (bottom) */
  "3": pt;
}

/** Options to replace the HTML page content. */
interface ReplaceHtmlOptions {
  /** The HTML content to replace. */
  content: string;

  /** Specifies whether each paragraph will be created in a separate shape. */
  separateParagraphs?: boolean;
}

/** Specifies how to adjust the image object in case of replacing the selected image. */
type ReplaceImageMode = "fill" | "fit" | "original" | "stretch";

/** Options to replace the XML page content. */
interface ReplaceXmlOptions {
  /** An array with XML shapes to be replaced. */
  content: string[];
}

/** The current selection type ("none", "text", "drawing", or "slide"). */
type SelectionType = "none" | "text" | "drawing" | "slide" | "image";

/** This type specifies the preset shape geometry that will be used for a shape. */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/** The toolbar menu item. */
interface ToolbarMenuItem {
  /** The item ID. */
  id: string;

  /** The item type. */
  type: ToolbarMenuItemType;

  /** The item text. */
  text: string;

  /** The item hint. */
  hint: string;

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config} documentation).
   */
  icons?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /** Specifies if an item toggle is enabled or not. */
  enableToggle?: boolean;

  /** Specifies if the current item is locked in the view mode or not. */
  lockInViewMode?: boolean;

  /** Specifies if a separator is used between the toolbar menu items or not. */
  separator?: boolean;

  /** Specifies if the toolbar menu items are split or not. */
  split?: boolean;

  /** An array containing the context menu items for the current item. */
  items?: ContextMenuItem[];
}

/**
 * The possible values of the base which the relative vertical position of the toolbar menu item will
 * be calculated from.
 */
type ToolbarMenuItemType = "button" | "...";

/** The main toolbar menu item. */
interface ToolbarMenuMainItem {
  /** The plugin guid. */
  guid: string;

  /** An array containing the toolbar menu tabs for the current item. */
  tabs: ToolbarMenuTab[];
}

/** The toolbar menu tab. */
interface ToolbarMenuTab {
  /** The tab ID. */
  id: string;

  /** The tab text. */
  text: string;

  /** An array containing the toolbar menu items for the current tab. */
  items?: ToolbarMenuItem[];
}

/** The main window header item. */
interface WindowHeaderMainItem {
  /** The plugin guid. */
  guid: string;

  /** The plugin child window ID. When omitted, the items are placed on the plugin's main frame header. */
  windowID?: string;

  /** An array containing the window header items. */
  items: WindowHeaderMenuItem[];
}

/** The window header menu item. */
interface WindowHeaderMenuItem {
  /** The item ID. */
  id: string;

  /** The item type. */
  type: "button";

  /** The item text. */
  text?: string;

  /** The item hint. */
  hint?: string;

  /** The item alignment in the window header. */
  align?: "left" | "right";

  /**
   * The item icons (see the plugins
   * {@link https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/ config}
   * documentation).
   */
  icons?: string;

  /** Specifies if the current item is disabled or not. */
  disabled?: boolean;

  /** Specifies if an item toggle is enabled or not. */
  enableToggle?: boolean;

  /** Specifies if the button is split (button + dropdown arrow) or not. */
  split?: boolean;

  /** Specifies if the item replaces the window title or not. */
  isTitle?: boolean;

  /** Specifies if the item must be removed from the header. */
  removed?: boolean;

  /** An array containing the dropdown menu items for the current header item. */
  items?: ContextMenuItem[];
}

/**
 * The editors which the plugin is available for:
 * **word** - text document editor,
 * **cell** - spreadsheet editor,
 * **slide** - presentation editor,
 * **pdf** - pdf editor.
 */
type editorType = "word" | "cell" | "slide" | "pdf";

/** An object containing the form properties. */
interface fillForms {
  /** The form tags which specify the content for each form type with such a tag. */
  tags: { text: string; checkBox: string; picture: string; comboBox: string };
}

/**
 * The data type selected in the editor and sent to the plugin:
 * **text** - the text data,
 * **html** - HTML formatted code,
 * **ole** - OLE object data,
 * **desktop** - the desktop editor data,
 * **desktop-external** - the main page data of the desktop app (system messages),
 * **none** - no data will be send to the plugin from the editor,
 * **sign** - the sign for the keychain plugin.
 */
type initDataType = "text" | "html" | "ole" | "desktop" | "desktop-external" | "none" | "sign";

/** A point. */
type pt = number;

/** An object containing the watermark properties. */
interface watermark_on_draw {
  /** The watermark transparency degree. */
  transparent: number;

  /** The type which specifies the preset shape geometry for the current watermark. */
  type: ShapeType;

  /** The watermark width measured in millimeters. */
  width: number;

  /** The watermark height measured in millimeters. */
  height: number;

  /** The watermark rotation angle measured in degrees. */
  rotate: number;

  /** The text margins measured in millimeters in the watermark shape. */
  margins: number[];

  /**
   * The watermark fill color in the RGB format, or the URL to image (base64 support:
   * data:image/png;...). The empty array [] means that the watermark has no fill.
   */
  fill: number[] | string;

  /** The watermark stroke width measured in millimeters. */
  "stroke-width": number;

  /**
   * The watermark stroke color in the RGB format. The empty array [] means that the watermark stroke has
   * no fill.
   */
  stroke: number[];

  /** The vertical text align in the watermark shape: **0** - bottom, **1** - center, **4** - top. */
  align: number;

  /** The array with paragraphs from the current watermark with their properties. */
  paragraphs: { align: number; fill: number[]; linespacing: number; runs: object[] };
}

// Cross-file type stubs
type comment = unknown;
type localeTranslate = unknown;

type PdfMethodArgs = {
  /**
   * Sends a message to the co-authoring chat.
   *
   * @param sText - Message text.
   */
  CoAuthoringChatSendMessage: [sText: string];
  /**
   * Specifies the end action for long operations.
   *
   * @param type - The action type: **"Information"** - ends a non-blocking informational action, **"Block"** -
   *   ends a blocking interaction action.
   * @param description - A string description displayed during the action.
   * @param status - The error status code. If no error occurs, then an empty string is passed.
   */
  EndAction: [type: "Information" | "Block", description?: string, status?: string];
  /** Returns focus to the editor. */
  FocusEditor: [];
  /**
   * Returns all the comments from the document.
   *
   * @returns An array of comment objects containing the comment data.
   */
  GetAllComments: [];
  /** Returns the current page index. */
  GetCurrentPage: [];
  /**
   * Returns the current file to download in the specified format.
   *
   * @param format - A format in which you need to download a file.
   * @returns URL to download the file in the specified format or error.
   * @since 7.2.0
   */
  GetFileToDownload: [format?: string];
  /**
   * Returns the fonts list.
   *
   * @returns An array of the FontInfo objects containing the data about the used fonts.
   */
  GetFontList: [];
  /**
   * Returns all the installed plugins.
   *
   * @returns An array of all the installed plugins.
   * @since 7.2.0
   */
  GetInstalledPlugins: [];
  /**
   * Returns the document macros.
   *
   * @returns The Macros object containing the data about all the macros from the document
   */
  GetMacros: [oContent?: string];
  /**
   * Returns the page image.
   *
   * @param nPage - The page index.
   * @param oParams - The image parameters.
   */
  GetPageImage: [nPage: number, oParams?: { maxSize?: number; annotations?: boolean; fields?: boolean; drawings?: boolean; withInfo?: boolean }];
  /**
   * Returns the selected text from the document.
   *
   * @param prop - The resulting string display properties.
   * @returns Selected text.
   * @since 7.1.0
   */
  GetSelectedText: [prop?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; TableRowSeparator?: string; ParaSeparator?: string; TabSymbol?: string; NewLineSeparator?: string }];
  /**
   * Returns the editor version.
   *
   * @returns The editor version.
   */
  GetVersion: [];
  /**
   * Moves to specified page.
   *
   * @param pageIndex - Zero-based page index to navigate to.
   * @param rect - If specified only x1, y1 (ex. [10, 10]) - then moves to them with inherited zoom, if specified
   *   whole rect (ex. [10, 10, 100, 100]) then zoom to rect
   */
  GoToPage: [pageIndex: number, rect?: Rect];
  /**
   * Installs a plugin using the specified plugin config.
   *
   * @param config - The plugin {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config}.
   * @returns An object with the result information.
   * @since 7.2.0
   */
  InstallPlugin: [config?: object];
  /**
   * Sends an event to the plugin when the mouse button is moved inside the plugin iframe.
   *
   * @param frameId - The frame ID.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @since 7.4.0
   */
  MouseMoveWindow: [frameId: string, x: number, y: number];
  /**
   * Sends an event to the plugin when the mouse button is released inside the plugin iframe.
   *
   * @param frameId - The frame ID.
   * @param x - The X coordinate.
   * @param y - The Y coordinate.
   * @since 7.4.0
   */
  MouseUpWindow: [frameId: string, x: number, y: number];
  /**
   * Implements the external drag&drop emulation.
   *
   * @param obj - The drag&drop emulation properties.
   * @since 7.3.0
   */
  OnDropEvent: [obj: { type?: string; x?: number; y?: number; html?: string; text?: string }];
  /**
   * Pastes text in the HTML format into the document.
   *
   * @param htmlText - A string value that specifies the text in the *HTML* format to be pasted into the document.
   */
  PasteHtml: [htmlText: string];
  /**
   * Pastes text into the document.
   *
   * @param text - A string value that specifies the text to be pasted into the document.
   */
  PasteText: [text: string];
  /**
   * Removes a plugin with the specified GUID.
   *
   * @param guid - The plugin identifier. It must be of the *asc.{UUID}* type.
   * @param backup - The plugin backup. This parameter is used when working with the desktop editors.
   * @returns An object with the result information.
   * @since 7.2.0
   */
  RemovePlugin: [guid: string, backup: string];
  /**
   * Replaces the page content with the specified parameters.
   *
   * @param nPage - The page index.
   * @param oParams - The replacement parameters.
   */
  ReplacePageContent: [nPage: number, oParams: { type?: "xml" | "html"; options?: ReplaceXmlOptions | ReplaceHtmlOptions }];
  /**
   * Sets macros to the document.
   *
   * @param data - The *Macros* object containing the data about all the macros from the document.
   */
  SetMacros: [data: string];
  /**
   * Configures plugins from an external source. The settings can be set for all plugins or for a
   * specific plugin.
   * For example, this method can be used to pass an authorization token to the plugin. This method can
   * be used only with the connector class.
   *
   * @param options - Plugin options.
   * @since 8.1.1
   */
  SetPluginsOptions: [options: PluginOptions];
  /**
   * Sets the properties to the document.
   *
   * @param obj - The document properties.
   */
  SetProperties: [obj: { copyoutenabled?: boolean; hideContentControlTrack?: boolean; watermark_on_draw?: string; disableAutostartMacros?: boolean; fillForms?: string }];
  /**
   * Shows or hides buttons in the header.
   *
   * @param id - The button ID.
   * @param bShow - The flag specifies whether the button is shown (**true**) or hidden (**false**).
   * @param align - The parameter indicates whether the button will be displayed on the right side of the window or
   *   on the left. The default value is "left".
   * @since 7.2.0
   */
  ShowButton: [id: string, bShow: boolean, align: string];
  /**
   * Shows an error/warning message.
   *
   * @param error - The error text.
   * @param level - -1 or 0 for error or warning.
   * @since 8.3.0
   */
  ShowError: [error: string, level: number];
  /**
   * Shows the input helper.
   *
   * @param guid - A string value which specifies a plugin identifier which must be of the *asc.{UUID}* type.
   * @param w - A number which specifies the window width measured in millimeters.
   * @param h - A number which specifies the window height measured in millimeters.
   * @param isKeyboardTake - Defines if the keyboard is caught (**true**) or not (**false**).
   */
  ShowInputHelper: [guid: string, w: number, h: number, isKeyboardTake: boolean];
  /**
   * Specifies the start action for long operations.
   *
   * @param type - The action type: **"Information"** - a non-blocking informational action, **"Block"** - a
   *   blocking interaction action.
   * @param description - A string description displayed during the action.
   */
  StartAction: [type: "Information" | "Block", description?: string];
  /**
   * Unshows the input helper.
   *
   * @param guid - A string value which specifies a plugin identifier which must be of the *asc.{UUID}* type.
   * @param isclear - Defines if the input context will be cleared (**true**) or not (**false**).
   */
  UnShowInputHelper: [guid: string, isclear: boolean];
  /**
   * Updates a plugin using the specified plugin config.
   *
   * @param config - The plugin {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config}.
   * @returns An object with the result information.
   * @since 7.3.0
   */
  UpdatePlugin: [config?: object];
};

type PdfMethodName = keyof PdfMethodArgs;

type PdfMethodReturnMap = {
  CoAuthoringChatSendMessage: any;
  EndAction: any;
  FocusEditor: any;
  GetAllComments: comment[];
  GetCurrentPage: number;
  GetFileToDownload: string;
  GetFontList: FontInfo[];
  GetInstalledPlugins: PluginData[];
  GetMacros: string;
  GetPageImage: string | object;
  GetSelectedText: string;
  GetVersion: string;
  GoToPage: boolean;
  InstallPlugin: object;
  MouseMoveWindow: any;
  MouseUpWindow: any;
  OnDropEvent: any;
  PasteHtml: any;
  PasteText: any;
  RemovePlugin: object;
  ReplacePageContent: boolean;
  SetMacros: any;
  SetPluginsOptions: any;
  SetProperties: any;
  ShowButton: any;
  ShowError: any;
  ShowInputHelper: any;
  StartAction: any;
  UnShowInputHelper: any;
  UpdatePlugin: object;
};

type PdfMethodReturn<T extends PdfMethodName> = PdfMethodReturnMap[T];

export type { PdfMethodArgs, PdfMethodName, PdfMethodReturn };
