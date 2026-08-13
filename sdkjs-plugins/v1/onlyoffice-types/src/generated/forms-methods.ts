// Auto-generated from ONLYOFFICE/sdkjs JSDoc (common/apiBase_plugins.js + per-editor api_plugins.js).
// executeMethod names/args/returns for Forms. Run `npm run generate-plugin-methods` to regenerate.

/** The addin field data. */
interface AddinFieldData {
  /** Field identifier. */
  FieldId: string;

  /** Field value. */
  Value: string;

  /** Field text content. */
  Content: string;
}

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

/** Represents an RGBA color with components in the range [0, 255]. */
type Color = unknown;

/** The comment data. */
interface CommentData {
  /** The comment author. */
  UserName: string;

  /** The quote comment text. */
  QuoteText?: string;

  /** The comment text. */
  Text: string;

  /** The time when the comment was posted (in milliseconds). */
  Time?: string;

  /** The user ID of the comment author. */
  UserId?: string;

  /** Specifies if the comment is resolved (**true**) or not (**false**). */
  Solved?: boolean;

  /** An array containing the comment replies represented as the *CommentData* object. */
  Replies?: CommentData[];
}

/** The content control object. */
interface ContentControl {
  /**
   * A tag assigned to the content control. The same tag can be assigned to several content controls so
   * that you can make reference to them in your code.
   */
  Tag: string | number;

  /**
   * A unique content control identifier. It can be used to search for a certain content control and make
   * reference to it in your code.
   */
  Id: string;

  /** A value that defines if it is possible to delete and/or edit the content control or not. */
  Lock: ContentControlLock;

  /**
   * A unique internal identifier of the content control. It is used for all operations with content
   * controls.
   */
  InternalId: string;

  /** An alias of the content control. */
  Alias: string;

  /** The visualization type of the content control: **1** - frame (bounding box), **2** - hidden. */
  Appearance: 1 | 2;

  /** A unique form key. Present only if the content control is a form field. */
  FormKey?: string;

  /** A group key of the radio button. Present only if the content control is a radio button form field. */
  RadioGroup?: string;

  /** The current value of the form field. Present only if the content control is a form field. */
  FormValue?: string | boolean | Date;

  /** The tag color of the content control. Present only if the tag color is set. */
  Color?: object;

  /** The border color of the content control. Present only if the border color is set. */
  Border?: object;

  /** The shading color of the content control. Present only if the shading color is set. */
  Shd?: object;
}

/** The content control checkbox properties. */
interface ContentControlCheckBoxProperties {
  /** Defines if the content control checkbox is checked or not. */
  Checked: boolean;

  /** A symbol in the HTML code format that is used when the checkbox is checked. */
  CheckedSymbol: number;

  /** A symbol in the HTML code format that is used when the checkbox is not checked. */
  UncheckedSymbol: number;
}

/** The content control datepicker properties. */
interface ContentControlDatePickerProperties {
  /**
   * A format in which the date will be displayed.
   * For example: *"MM/DD/YYYY", "dddd\,\ mmmm\ dd\,\ yyyy", "DD\ MMMM\ YYYY", "MMMM\ DD\,\ YYYY",
   * "DD-MMM-YY", "MMMM\ YY", "MMM-YY", "MM/DD/YYYY\ hh:mm\ AM/PM", "MM/DD/YYYY\ hh:mm:ss\ AM/PM",
   * "hh:mm", "hh:mm:ss", "hh:mm\ AM/PM", "hh:mm:ss:\ AM/PM"*.
   */
  DateFormat: string;

  /** The current date and time. */
  Date: object;
}

/** The content control list element. */
interface ContentControlListElement {
  /** The element display text. */
  Display: string;

  /** The element value. */
  Value: string;
}

/**
 * A value that defines if it is possible to delete and/or edit the content control or not:
 * **0** - only deleting
 * **1** - disable deleting or editing
 * **2** - only editing
 * **3** - full access
 */
type ContentControlLock = 0 | 1 | 2 | 3;

/** The content control parent properties. */
interface ContentControlParentPr {
  /** The content control parent. For example, oParagraph. */
  Parent: object;

  /** The content control position within the parent object. */
  Pos: number;

  /** A number of elements in the parent object. */
  Count: number;
}

/** The content control properties. */
interface ContentControlProperties {
  /**
   * A unique identifier of the content control. It can be used to search for a certain content control
   * and make reference to it in the code.
   */
  Id?: number;

  /**
   * A tag assigned to the content control. The same tag can be assigned to several content controls so
   * that it is possible to make reference to them in the code.
   */
  Tag: string;

  /** A value that defines if it is possible to delete and/or edit the content control or not. */
  Lock?: ContentControlLock;

  /** A unique internal identifier of the content control. */
  InternalId?: string;

  /** The alias attribute. */
  Alias?: string;

  /** The content control placeholder text. */
  PlaceHolderText?: string;

  /** Defines if the content control is shown as the bounding box (**1**) or not (**2**). */
  Appearance?: number;

  /** The color for the current content control in RGBA format. */
  Color?: Color;

  /** The background shading properties. */
  Shd?: { Color: Color };

  /** The border properties. */
  Border?: { Color: Color };
}

/** The content control properties and contents. */
interface ContentControlPropertiesAndContent {
  /** The content control properties. */
  ContentControlProperties?: ContentControlProperties;

  /**
   * A script that will be executed to generate the data within the content control (can be replaced with
   * the *Url* parameter).
   */
  Script: string;

  /** A link to the shared file (can be replaced with the *Script* parameter). */
  Url: string;
}

/**
 * A numeric value that specifies the content control type:
 * **1** - block content control
 * **2** - inline content control
 * **3** - row content control
 * **4** - cell content control
 */
type ContentControlType = 1 | 2 | 3 | 4;

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
 * The document editing restrictions:
 * **none** - no editing restrictions,
 * **comments** - allows editing comments,
 * **forms** - allows editing form fields,
 * **readOnly** - does not allow editing.
 */
type DocumentEditingRestrictions = 'none' | 'comments' | 'forms' | 'readOnly';

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

/** The OLE object data. */
interface OLEObjectData {
  /** OLE object data (internal format). */
  Data?: string;

  /** An image in the base64 format stored in the OLE object and used by the plugin. */
  ImageData?: string;

  /**
   * An identifier of the plugin which can edit the current OLE object and must be of the *asc.{UUID}*
   * type.
   */
  ApplicationId?: string;

  /** The OLE object identifier which is used to work with OLE object added to the document. */
  InternalId?: string;

  /** An identifier of the drawing object containing the current OLE object. */
  ParaDrawingId?: string;

  /** The OLE object width measured in millimeters. */
  Width?: number;

  /** The OLE object height measured in millimeters. */
  Height?: number;

  /** The OLE object image width in pixels. */
  WidthPix?: number;

  /** The OLE object image height in pixels. */
  HeightPix?: number;
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

/** Specifies how to adjust the image object in case of replacing the selected image. */
type ReplaceImageMode = "fill" | "fit" | "original" | "stretch";

/** The current selection type ("none", "text", "drawing", or "slide"). */
type SelectionType = "none" | "text" | "drawing" | "slide" | "image";

/** This type specifies the preset shape geometry that will be used for a shape. */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/**
 * Specifies if the whole text or only its part will be returned or replaced:
 * **entirely** - replaces/returns the whole text,
 * **beforeCursor** - replaces/returns only the part of the text before the cursor,
 * **afterCursor** - replaces/returns only the part of the text after the cursor.
 */
type TextPartType = "entirely" | "beforeCursor" | "afterCursor";

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

/** Comment object. */
interface comment {
  /** The comment ID. */
  Id: string;

  /** An object which contains the comment data. */
  Data: CommentData;
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
type localeTranslate = unknown;

type FormsMethodArgs = {
  /**
   * Adds an OLE object to the current document position.
   *
   * @param data - The OLE object properties.
   */
  AddOleObject: [data: OLEProperties];
  /**
   * Sends a message to the co-authoring chat.
   *
   * @param sText - Message text.
   */
  CoAuthoringChatSendMessage: [sText: string];
  /**
   * Converts a document to Markdown or HTML text.
   *
   * @param sConvertType - Conversion type ("markdown" or "html").
   * @param bHtmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
   *   platform does not handle Markdown-style IDs.
   * @param bBase64img - Defines if the images will be created in the base64 format.
   * @param bDemoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
   *   standard: single H1 as title, H2 as top-level heading in the text body.
   * @param bRenderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
   *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
   *   By default, the opening angle brackets will be replaced with the special characters.
   * @returns The Markdown/HTML text.
   */
  ConvertDocument: [sConvertType?: "markdown" | "html", bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean];
  /**
   * Edits an OLE object in the document.
   *
   * @param data - The OLE object properties.
   */
  EditOleObject: [data: OLEProperties];
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
   * Returns information about all the forms that have been added to the document.
   *
   * @returns An array with all the forms from the document.
   */
  GetAllForms: [];
  /**
   * Returns the document language.
   *
   * @returns Document language.
   * @since 7.4.0
   */
  GetDocumentLang: [];
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
   * Returns a value of the specified form.
   *
   * @param internalId - A unique internal identifier of the form.
   * @returns The form value in the string or boolean format depending on the form type. The null value means
   *   that the form is filled with a placeholder.
   */
  GetFormValue: [internalId: string];
  /**
   * Returns information about all the forms that have been added to the document with specified tag.
   *
   * @param tag - The form tag.
   * @returns An array with all the forms from the document with the specified tag.
   */
  GetFormsByTag: [tag: string];
  /**
   * Returns the image data from the first of the selected drawings. If there are no drawings selected,
   * the method returns a white rectangle.
   *
   * @returns The ImageData object containig the information about the base64 encoded png image.
   * @since 7.2.0
   */
  GetImageDataFromSelection: [];
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
   * Returns the current role name for the OForm document.
   *
   * @returns The current role name, or an empty string if no role is set.
   * @since 9.5.0
   */
  GetOFormRole: [];
  /**
   * Returns the selected content in the specified format.
   *
   * @param prop - The returned content properties.
   * @returns The selected content.
   * @since 8.3.1
   */
  GetSelectedContent: [prop: { type?: "text" | "html" }];
  /**
   * Returns an array of the selected OLE objects.
   *
   * @returns An array of the *OLEProperties* objects containing the data about the OLE object parameters.
   */
  GetSelectedOleObjects: [];
  /**
   * Returns the selected text from the document.
   *
   * @param prop - The resulting string display properties.
   * @returns Selected text.
   * @since 7.1.0
   */
  GetSelectedText: [prop?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; TableRowSeparator?: string; ParaSeparator?: string; TabSymbol?: string; NewLineSeparator?: string }];
  /**
   * Returns the type of the current selection.
   *
   * @returns The selection type.
   */
  GetSelectionType: [];
  /**
   * Returns all VBA macros from the document.
   *
   * @returns VBA xml macros.
   * @since 7.3.0
   */
  GetVBAMacros: [];
  /**
   * Returns the editor version.
   *
   * @returns The editor version.
   */
  GetVersion: [];
  /**
   * Inserts text into the document.
   *
   * @param text - A string value that specifies the text to be inserted into the document.
   * @param textReplace - A string value that specifies the text to be replaced with a new text.
   */
  InputText: [text: string, textReplace: string];
  /**
   * Installs a plugin using the specified plugin config.
   *
   * @param config - The plugin {@link https://api.onlyoffice.com/docs/plugins/configuration/configuration config}.
   * @returns An object with the result information.
   * @since 7.2.0
   */
  InstallPlugin: [config?: object];
  /**
   * Checks if the document is in the editing PDF form mode.
   *
   * @returns Returns **true** if the document is in the editing PDF form mode.
   * @since 9.3.0
   */
  IsEditingPdfForm: [];
  /**
   * Checks if the document is in the filling form mode.
   *
   * @returns Returns **true** if the document is in the filling form mode.
   * @since 9.3.0
   */
  IsFillingForm: [];
  /**
   * Checks if the document is in the filling PDF form mode.
   *
   * @returns Returns **true** if the document is in the filling PDF form mode.
   * @since 9.3.0
   */
  IsFillingPdfForm: [];
  /**
   * Checks whether the specified form has been digitally signed.
   *
   * @returns Returns true if the form is signed, false otherwise.
   * @since 9.3.0
   */
  IsFormSigned: [];
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
   * Encrypts the document.
   *
   * @param obj - The encryption properties.
   */
  OnEncryption: [obj: { type?: string; password?: string; data?: string; check?: boolean; docinfo?: string; hash?: string; error?: string }];
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
   * Replaces the first selected drawing with the image specified in the parameters.
   * If there are no drawings selected, the method inserts the image at the current position.
   *
   * @param oImageData - The information about the base64 encoded *png* image.
   * @since 7.2.0
   */
  PutImageDataToSelection: [oImageData: ImageData];
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
   * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
   * strings.
   *
   * @param arrString - An array of replacement strings.
   * @param sParaTab - A character which is used to specify the tab in the source text. Any symbol can be used. The
   *   default separator is "\t".
   * @param sParaNewLine - A character which is used to specify the line break character in the source text. Any symbol can
   *   be used. The default separator is "\r\n".
   * @returns Always returns true.
   * @since 7.1.0
   */
  ReplaceTextSmart: [arrString: string[], sParaTab?: string, sParaNewLine?: string];
  /**
   * Sets a value to the specified form.
   *
   * @param internalId - A unique internal identifier of the form.
   * @param value - Form value to be set. Its type depends on the form type.
   */
  SetFormValue: [internalId: string, value: string | boolean];
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

type FormsMethodName = keyof FormsMethodArgs;

type FormsMethodReturnMap = {
  AddOleObject: any;
  CoAuthoringChatSendMessage: any;
  ConvertDocument: string;
  EditOleObject: any;
  EndAction: any;
  FocusEditor: any;
  GetAllForms: ContentControl[];
  GetDocumentLang: string;
  GetFileToDownload: string;
  GetFontList: FontInfo[];
  GetFormValue: null | string | boolean;
  GetFormsByTag: ContentControl[];
  GetImageDataFromSelection: ImageData;
  GetInstalledPlugins: PluginData[];
  GetMacros: string;
  GetOFormRole: string;
  GetSelectedContent: string;
  GetSelectedOleObjects: OLEProperties[];
  GetSelectedText: string;
  GetSelectionType: SelectionType;
  GetVBAMacros: string | null;
  GetVersion: string;
  InputText: any;
  InstallPlugin: object;
  IsEditingPdfForm: boolean;
  IsFillingForm: boolean;
  IsFillingPdfForm: boolean;
  IsFormSigned: boolean;
  MouseMoveWindow: any;
  MouseUpWindow: any;
  OnDropEvent: any;
  OnEncryption: any;
  PasteHtml: any;
  PasteText: any;
  PutImageDataToSelection: any;
  RemovePlugin: object;
  ReplaceTextSmart: boolean;
  SetFormValue: any;
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

type FormsMethodReturn<T extends FormsMethodName> = FormsMethodReturnMap[T];

export type { FormsMethodArgs, FormsMethodName, FormsMethodReturn };
