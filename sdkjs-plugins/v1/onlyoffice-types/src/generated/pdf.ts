// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: pdf

export namespace Pdf {
  /** The available annotation border effect style. */
  export type AnnotBorderEffectStyle = "none" | "cloud";

  /** The available annotation border styles. */
  export type AnnotBorderStyle = "solid" | "dashed";

  /** Any valid field element. */
  export type ApiField = ApiTextField | ApiComboboxField | ApiListboxField | ApiButtonField | ApiCheckboxField | ApiRadiobuttonField;

  /** Types of all supported forms. */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Any valid field element. */
  export type ApiWidget = ApiBaseWidget | ApiCheckboxWidget | ApiButtonWidget;

  /** Axis position in the chart. */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /**
   * The type of a fill which uses an image as a background.
   * **"tile"** - if the image is smaller than the shape which is filled, the image will be tiled all
   * over the created shape surface.
   * **"stretch"** - if the image is smaller than the shape which is filled, the image will be stretched
   * to fit the created shape surface.
   */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    /** The border style. */
    Type: BorderType;

    /** The border width measured in eighths of a point. */
    Size: pt_8;

    /** The spacing offset from the text to the border measured in points. */
    Space: pt;

    /** The border color. */
    Color: ApiColor;
  }

  /**
   * A border type which will be added to the document element.
   * **"none"** - no border will be added to the created element or the selected element side.
   * **"single"** - a single border will be added to the created element or the selected element side.
   */
  export type BorderType = "none" | "single";

  /** The available button widget border appearances types. */
  export type ButtonAppearance = "normal" | "down" | "hover";

  /** The available button widget behavior types. */
  export type ButtonBehavior = "none" | "invert" | "push" | "outline";

  /** The available button widget layout types. */
  export type ButtonLayout = "textOnly" | "iconOnly" | "iconTextV" | "textIconV" | "iconTextH" | "textIconH" | "overlay";

  /** The available button widget scale how types. */
  export type ButtonScaleHow = "proportional" | "anamorphic";

  /** The available button widget scale when types. */
  export type ButtonScaleWhen = "always" | "never" | "tooBig" | "tooSmall";

  /** Possible values for the caption label. */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /**
   * Possible values for the caption numbering format.
   * **"ALPHABETIC"** - upper letter.
   * **"alphabetic"** - lower letter.
   * **"Roman"** - upper Roman.
   * **"roman"** - lower Roman.
   * **"Arabic"** - arabic.
   */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /**
   * Possible values for the caption separator.
   * **"hyphen"** - the "-" punctuation mark.
   * **"period"** - the "." punctuation mark.
   * **"colon"** - the ":" punctuation mark.
   * **"longDash"** - the "—" punctuation mark.
   * **"dash"** - the "-" punctuation mark.
   */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart. */
  export type ChartType = "ColumnClustered" | "ColumnStacked" | "ColumnStacked100" | "3DColumnClustered" | "3DColumnStacked" | "3DColumnStacked100" | "3DColumn" | "BarClustered" | "BarStacked" | "BarStacked100" | "3DBarClustered" | "3DBarStacked" | "3DBarStacked100" | "Line" | "LineStacked" | "LineStacked100" | "LineMarkers" | "LineMarkersStacked" | "LineMarkersStacked100" | "3DLine" | "Pie" | "3DPie" | "Doughnut" | "XYScatter" | "XYScatterLines" | "XYScatterLinesNoMarkers" | "XYScatterSmooth" | "XYScatterSmoothNoMarkers" | "StockHLC" | "StockOHLC" | "StockVHLC" | "StockVOHLC" | "Area" | "AreaStacked" | "AreaStacked100" | "Combo" | "ComboColumnClusteredLine" | "ComboColumnClusteredLineSecondaryAxis" | "Radar" | "RadarMarkers" | "RadarFilled" | "unknown";

  /** This type specifies the legacy chart type names which are kept for backward compatibility. */
  export type ChartTypeLegacy = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "lineNormalMarker" | "lineStackedMarker" | "lineStackedPerMarker" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "scatterLine" | "scatterLineMarker" | "scatterSmooth" | "scatterSmoothMarker" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboCustom" | "comboBarLine" | "comboBarLineSecondary" | "radar" | "radarMarker" | "radarFilled" | "unknown";

  /** The available check styles. */
  export type CheckStyle = "check" | "cross" | "diamond" | "circle" | "star" | "square";

  /** Option for checkbox */
  export type CheckboxOption = boolean;

  /** Option for radio groups, dropdowns and combo boxes. */
  export interface ChoiceOption {
    /** Stored value. */
    value: string;

    /** Display text. */
    label: string;
  }

  /** A dictionary of users and their comments. */
  export interface CommentReport {
    /** The comments grouped by username. */
    username?: UserComments;
  }

  /** Represents a single comment record. */
  export interface CommentReportRecord {
    /** Specifies whether the comment is a response. */
    IsAnswer: boolean;

    /** The comment text. */
    CommentMessage: string;

    /** The comment local timestamp. */
    Date: number;

    /** The comment UTC timestamp. */
    DateUTC: number;

    /** The quoted text (if available). */
    QuoteText?: string;
  }

  /** The checkbox content control properties */
  export interface ContentControlCheckBoxPr {
    /** Indicates whether the checkbox is checked by default. */
    checked?: boolean;

    /** A custom symbol to display when the checkbox is checked (e.g., "☒"). */
    checkedSymbol?: string;

    /** A custom symbol to display when the checkbox is unchecked (e.g., "☐"). */
    uncheckedSymbol?: string;
  }

  /** The date picker content control properties. */
  export interface ContentControlDatePr {
    /** The date format. Example: "mm.dd.yyyy". */
    format: string;

    /**
     * The date language. Possible value for this parameter is a language identifier as defined by
     * RFC 4646/BCP 47. Example: "en-CA".
     */
    lang: string;
  }

  /** The object representing the items in the combo box or drop-down list. */
  export interface ContentControlListItem {
    /** The text to be displayed in the combo box or drop-down list. */
    display: string;

    /** The value associated with the item. */
    value: string;
  }

  /** Represents an attribute of an XML node. */
  export interface CustomXmlNodeAttribute {
    /** The attribute name. */
    name: string;

    /** The attribute value. */
    value: string;
  }

  /** Available dash type for line. */
  export type DashType = "dash" | "dashDot" | "dot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "solid" | "sysDash" | "sysDashDot" | "sysDashDotDot" | "sysDot";

  /**
   * Degree defines an angle in degrees.
   * Can be any finite number (positive or negative).
   */
  export type Degree = number;

  /** The available display types. */
  export type DisplayType = "visible" | "hidden" | "noPrint" | "noView";

  export interface DocQuads {
    /** the key is the index of a page */
    pageIndex?: Quad[];
  }

  export interface DocSelection {
    /** selection start */
    start: PagePoint;

    /** selection end */
    end: PagePoint;
  }

  /** Any valid element which can be added to the document structure. */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing object. */
  export type Drawing = ApiShape | ApiImage | ApiTable | ApiChart;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock. */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Any valid page float object. */
  export type FloatObject = ApiBaseField | ApiBaseAnnotation | Drawing;

  /** Form data. */
  export interface FormData {
    /** The form key. If the current form is a radio button, then this field contains the group key. */
    key: string;

    /** The current field value. */
    value: string | boolean;

    /** The form tag. */
    tag: string;

    /** The form type. */
    type: FormSpecificType;

    /** The form role. */
    role?: string;

    /** The form role color in hex format. */
    roleColor?: string;

    /**
     * The list of available options for the field.
     * Present for checkboxes, radio button groups, dropdown lists, and combo boxes.
     */
    options?: ChoiceOption[] | CheckboxOption[];

    /** The checkbox label. Present only for checkbox fields. */
    label?: string;

    /** The date format string (e.g. **MM/DD/YYYY**). Present only for date picker fields. */
    format?: string;

    /** The date language/locale name (e.g. **en-US**). Present only for date picker fields. */
    lang?: string;
  }

  /** The specific form type. */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /**
   * Form type.
   * The available form types.
   */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** FreeText callout coordinates (Array of 3 points). */
  export interface FreeTextCallout {
    /** The starting point of the callout. */
    0: Point;

    /** The knee/bend point of the callout. */
    1: Point;

    /** The end point attached to the textbox. */
    2: Point;
  }

  /** The available free text annot intent. */
  export type FreeTextIntent = "freeText" | "freeTextCallout";

  /**
   * The coordinate value for the geometry paths.
   * Can be a guide name from "gdLst", a numeric value, or a string representation of a number.
   */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /**
   * The available GoTo action types:
   * - "xyz" — Zoom to a specific position and magnification
   * - "fit" — Fit the entire page in the window
   * - "fitH" — Fit the page horizontally
   * - "fitV" — Fit the page vertically
   * - "fitR" — Fit the specified rectangle
   * - "fitB" — Fit the page bounding box
   * - "fitBH" — Fit the bounding box horizontally
   * - "fitBV" — Fit the bounding box vertically
   */
  export type GoToType = "xyz" | "fit" | "fitH" | "fitV" | "fitR" | "fitB" | "fitBH" | "fitBV";

  /**
   * Header and footer types which can be applied to the document sections.
   * **"default"** - a header or footer which can be applied to any default page.
   * **"title"** - a header or footer which is applied to the title page.
   * **"even"** - a header or footer which can be applied to even pages to distinguish them from the odd
   * ones (which will be considered default).
   */
  export type HdrFtrType = "default" | "title" | "even";

  /** The available horizontal text alignment. */
  export type HorTextAlign = "left" | "right" | "both" | "center";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The available line end styles. */
  export type LineEndStyle = "square" | "circle" | "diamond" | "openArrow" | "closedArrow" | "none" | "butt" | "rOpenArrow" | "rClosedArrow" | "slash";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** A single list option, either a plain string (used as both display and export value) or a tuple. */
  export type ListOption = string | ListOptionTuple;

  /** A tuple representing a list option with a display value and an export value. */
  export interface ListOptionTuple {
    /** The value displayed to the user. */
    0: string;

    /** The value exported when the option is selected. */
    1: string;
  }

  /** The available named action names: */
  export type NamedActionType = "NextPage" | "PrevPage" | "FirstPage" | "LastPage";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /**
   * NumberNegStyle defines the formatting style for negative numbers:
   *
   * - "black-minus" — "-1,234.56" (black minus sign)
   * - "red-minus" — "-1,234.56" (red minus sign)
   * - "black-parens" — "(1,234.56)"" (black parentheses)
   * - "red-parens" — "(1,234.56)"" (red parentheses)
   */
  export type NumberNegStyle = "black-minus" | "red-minus" | "black-parens" | "red-parens";

  /**
   * NumberSepStyle — defines number formatting style:
   * - "us" — 1,234.56 (English style)
   * - "plain" — 1234.56 (No separators)
   * - "euro" — 1.234,56 (European style)
   * - "europlain" — 1234,56 (European without separators)
   * - "ch" — 1'234.56 (Swiss style)
   */
  export type NumberSepStyle = "us" | "plain" | "euro" | "europlain" | "ch";

  export interface PagePoint {
    /** index of a page */
    page: number;

    /** point of a page */
    point: Point;
  }

  export interface PageSelection {
    /** start selection point */
    start: Point;

    /** end selection point */
    end: Point;
  }

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

  /**
   * A paragraph-like container that can directly hold inline-level content (Hyperlink, InlineLvlSdt,
   * etc.).
   */
  export type ParagraphLikeContainer = ApiParagraph | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

  /** An array of points representing a continuous path. */
  export type Path = Point[];

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** An array of InkPath paths. */
  export type PathList = Path[];

  /** The available preset patterns which can be used for the fill. */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** Axis-aligned point. */
  export interface Point {
    /** The horizontal coordinate in points. */
    x: pt;

    /** The vertical coordinate in points. */
    y: pt;
  }

  /** 60000th of a degree (5400000 = 90 degrees). */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%). */
  export type PositivePercentage = number;

  /** The available preset color names. */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /**
   * PsfFormat defines the type of formatting to apply:
   *
   * - "zip" — ZIP code (e.g., 12345)
   * - "zip+4" — ZIP+4 (e.g., 12345-6789)
   * - "phone" — Phone number (e.g., (123) 456-7890)
   * - "ssn" — Social Security Number (e.g., 123-45-6789)
   */
  export type PsfFormat = "zip" | "zip+4" | "phone" | "ssn";

  /**
   * Quadrilateral represented as a flat tuple of vertices.
   * Vertices order is fixed:
   * · left-top → right-top → left-bottom → right-bottom
   *
   * Invariants:
   * · x1 <= x2 (top edge goes left → right)
   * · x3 <= x4 (bottom edge goes left → right)
   * · y1 <= y3 (left edge goes top → bottom)
   * · y2 <= y4 (right edge goes top → bottom)
   */
  export interface Quad {
    /** x1 (left top) */
    0: pt;

    /** y1 (left top) */
    1: pt;

    /** x2 (right top) */
    2: pt;

    /** y2 (right top) */
    3: pt;

    /** x3 (left bottom) */
    4: pt;

    /** y3 (left bottom) */
    5: pt;

    /** x4 (right bottom) */
    6: pt;

    /** y4 (right bottom) */
    7: pt;
  }

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /**
   * Axis-aligned rectangle represented as a tuple.
   *
   * Invariants:
   * - rect[0] < rect[2] (x1 < x2)
   * - rect[1] < rect[3] (y1 < y2)
   */
  export interface Rect {
    /** x1 (left) */
    0: pt;

    /** y1 (top) */
    1: pt;

    /** x2 (right) */
    2: pt;

    /** y2 (bottom) */
    3: pt;
  }

  /**
   * Axis-aligned rectangle difference represented as a tuple.
   * Describes coordinate-wise deltas between two rectangles (B - A).
   *
   * Invariants:
   * - diff[0] = x1B - x1A
   * - diff[1] = y1B - y1A
   * - diff[2] = x2B - x2A
   * - diff[3] = y2B - y2A
   */
  export interface RectDiff {
    /** dx1 (left delta) */
    0: pt;

    /** dy1 (top delta) */
    1: pt;

    /** dx2 (right delta) */
    2: pt;

    /** dy2 (bottom delta) */
    3: pt;
  }

  /**
   * The possible values for the base which the relative horizontal positioning of an object will be
   * calculated from.
   */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /**
   * The possible values for the base which the relative vertical positioning of an object will be
   * calculated from.
   */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** A dictionary of users and their review changes. */
  export interface ReviewReport {
    /** The review changes grouped by username. */
    username?: UserReviewChanges;
  }

  /** Represents a single review change record. */
  export interface ReviewReportRecord {
    /** The review record type. */
    Type: ReviewReportRecordType;

    /** The review change value (only for "TextAdd" and "TextRem" types). */
    Value?: string;

    /** The timestamp of the change. */
    Date: number;

    /** The element that was reviewed. */
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type. */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The condition to scale an image in the picture form. */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers. */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control. */
  export type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

  /** Represents a collection of matched text fragments. */
  export type SearchMatch = Quad[];

  /** Search options used when performing text search operations. */
  export interface SearchProps {
    /** The text to search for. */
    text: string | RegExp;

    /** Whether the search is case-sensitive. */
    matchCase: boolean;

    /** Whether to match whole words only. */
    wholeWords: boolean;
  }

  /** Represents a collection of search results. */
  export type SearchResults = SearchMatch[];

  /**
   * The section break type which defines how the contents of the current section are placed relative to
   * the previous section.
   * WordprocessingML supports five distinct types of section breaks:
   * **Next page** ("nextPage") - starts a new section on the next page (the default value).
   * **Odd** ("oddPage") - starts a new section on the next odd-numbered page.
   * **Even** ("evenPage") - starts a new section on the next even-numbered page.
   * **Continuous** ("continuous") - starts a new section in the next paragraph.
   * This means that continuous section breaks might not specify certain page-level section properties,
   * since they shall be inherited from the following section.
   * However, these breaks can specify other section properties, such as line numbering and
   * footnote/endnote settings.
   * **Column** ("nextColumn") - starts a new section in the next column on the page.
   */
  export type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

  /** Properties used to create a shadow. */
  export interface ShadowSettings {
    /** The shadow color (black by default). */
    color?: ApiUniColor;

    /** The shadow transparency from 0.0 (opaque) to 1.0 (clear). */
    transparency?: number;

    /** The horizontal offset of the shadow measured in points (a positive value offsets to the right). */
    offsetX?: number;

    /** The vertical offset of the shadow measured in points (a positive value offsets downwards). */
    offsetY?: number;

    /** The shadow size as a percentage of the shape size. */
    size?: number;

    /** Specifies whether the shadow rotates together with the shape. */
    rotateWithShape?: boolean;
  }

  /** This type specifies the preset shape geometry that will be used for a shape. */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    /** The shading type: **"nil"** - no shading, **"clear"** - solid fill. */
    Type: ShdType;

    /** The shading color. */
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element. */
  export type ShdType = "nil" | "clear";

  /**
   * The possible values for the base which the relative horizontal size of an object will be calculated
   * from.
   */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /**
   * The possible values for the base which the relative vertical size of an object will be calculated
   * from.
   */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The available stamp types. */
  export type StampType = "D_Approved" | "D_Revised" | "D_Reviewed" | "D_Received" | "SB_Approved" | "SB_NotApproved" | "SB_Revised" | "SB_Confidential" | "SB_ForComment" | "SB_ForPublicRelease" | "SB_NotForPublicRelease" | "SB_PreliminaryResults" | "SB_InformationOnly" | "SB_Draft" | "SB_Completed" | "SB_Final" | "SB_Void" | "SH_SignHere" | "SH_Witness" | "SH_InitialHere" | "Expired";

  /** The style type used for the document element. */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Custom tab types. */
  export type TabJc = "clear" | "left" | "right" | "center";

  /** A paragraph tab stop. */
  export interface TabStop {
    /** The tab stop position measured in twentieths of a point (1/1440 of an inch). */
    Pos: twips;

    /** The tab stop alignment style. */
    Val: TabJc;

    /** The tab leader character. */
    Leader: "none" | "dot" | "heavy" | "hyphen" | "middleDot" | "underscore";
  }

  export interface TableLook {
    /** Specifies that the first column conditional formatting shall be applied to the table. */
    firstCol: boolean;

    /** Specifies that the first row conditional formatting shall be applied to the table. */
    firstRow: boolean;

    /** Specifies that the last column conditional formatting shall be applied to the table. */
    lastCol: boolean;

    /** Specifies that the last row conditional formatting shall be applied to the table. */
    lastRow: boolean;

    /** Specifies that the horizontal banding conditional formatting shall not be applied to the table. */
    bandHor: boolean;

    /** Specifies that the vertical banding conditional formatting shall not be applied to the table. */
    bandVer: boolean;
  }

  /**
   * This simple type specifies possible values for the table sections to which the current conditional
   * formatting properties will be applied when this selected table style is used.
   * **"topLeftCell"** - specifies that the table formatting is applied to the top left cell.
   * **"topRightCell"** - specifies that the table formatting is applied to the top right cell.
   * **"bottomLeftCell"** - specifies that the table formatting is applied to the bottom left cell.
   * **"bottomRightCell"** - specifies that the table formatting is applied to the bottom right cell.
   * **"firstRow"** - specifies that the table formatting is applied to the first row.
   * **"lastRow"** - specifies that the table formatting is applied to the last row.
   * **"firstColumn"** - specifies that the table formatting is applied to the first column. Any
   * subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this
   * conditional format.
   * **"lastColumn"** - specifies that the table formatting is applied to the last column.
   * **"bandedColumn"** - specifies that the table formatting is applied to odd numbered groupings of
   * rows.
   * **"bandedColumnEven"** - specifies that the table formatting is applied to even numbered groupings
   * of rows.
   * **"bandedRow"** - specifies that the table formatting is applied to odd numbered groupings of
   * columns.
   * **"bandedRowEven"** - specifies that the table formatting is applied to even numbered groupings of
   * columns.
   * **"wholeTable"** - specifies that the conditional formatting is applied to the whole table.
   */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /**
   * The possible values for the units of the width property are defined by a specific table or table
   * cell width property.
   * **"auto"** - sets the table or table cell width to auto width.
   * **"twips"** - sets the table or table cell width to be measured in twentieths of a point.
   * **"nul"** - sets the table or table cell width to be of a zero value.
   * **"percent"** - sets the table or table cell width to be measured in percent to the parent
   * container.
   */
  export type TableWidth = "auto" | "twips" | "nul" | "percent";

  /** The available text autofit types inside a shape. */
  export type TextFitType = "noAutoFit" | "normAutoFit" | "autoFit";

  /** The available text direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    /** The format type. */
    type: "none" | "digit" | "letter" | "mask" | "regExp";

    /** The format value. Required for **"mask"** and **"regExp"** types. */
    value?: string;
  }

  /** The available text annot icon types. */
  export type TextIconType = "check" | "circle" | "comment" | "cross" | "crossH" | "help" | "insert" | "key" | "newParagraph" | "note" | "paragraph" | "rightArrow" | "rightPointer" | "star" | "upArrow" | "upLeftArrow";

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** The available vertical text alignment. */
  export type TextVertAlign = "baseline" | "subscript" | "superscript";

  /**
   * Possible values for the position of chart tick labels (either horizontal or vertical).
   * **"none"** - not display the selected tick labels.
   * **"nextTo"** - sets the position of the selected tick labels next to the main label.
   * **"low"** - sets the position of the selected tick labels in the part of the chart with lower
   * values.
   * **"high"** - sets the position of the selected tick labels in the part of the chart with higher
   * values.
   */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance. */
  export type TickMark = "cross" | "in" | "none" | "out";

  /**
   * Time format options:
   * - "HH:MM" — 24-hour format, hours and minutes (e.g., "14:30")
   * - "h:MM tt" — 12-hour format with AM/PM, hours and minutes (e.g., "2:30 PM")
   * - "HH:MM:ss" — 24-hour format, hours, minutes, and seconds (e.g., "14:30:15")
   * - "h:MM:ss tt" — 12-hour format with AM/PM, hours, minutes, and seconds (e.g., "2:30:15 PM")
   */
  export type TimeFormat = 'HH:MM' | 'h:MM tt' | 'HH:MM:ss' | 'h:MM:ss tt';

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    /**
     * Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     * platform does not handle Markdown-style IDs.
     */
    HtmlHeadings?: boolean;

    /** Defines if the images will be created in the base64 format. */
    Base64img?: boolean;

    /**
     * Defines if all heading levels will be demoted to conform with the following standard: single H1 as
     * title, H2 as top-level heading in the text body.
     */
    DemoteHeadings?: boolean;

    /**
     * Defines if HTML tags will be preserved. By default, the opening angle brackets will be replaced with
     * the special characters.
     */
    RenderHTMLTags?: boolean;
  }

  /**
   * Table of contents properties which specify whether to generate the table of contents from the
   * outline levels or the specified styles.
   */
  export interface TocBuildFromPr {
    /** The highest heading level included in the table of contents (the start of the outline range). */
    OutlineLvlStart?: number;

    /** The lowest heading level included in the table of contents (the end of the outline range). */
    OutlineLvls?: number;

    /**
     * Style levels (for example, [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]).
     * <note>If StylesLvls.length > 0, then the OutlineLvls property will be ignored.</note>
     */
    StylesLvls: TocStyleLvl[];
  }

  /**
   * Possible values for the table of contents leader:
   * **"dot"** - "......."
   * **"dash"** - "-------"
   * **"underline"** - "_______"
   */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties. */
  export interface TocPr {
    /** Specifies whether to show page numbers in the table of contents. */
    ShowPageNums?: boolean;

    /** Specifies whether to right-align page numbers in the table of contents. */
    RightAlgn?: boolean;

    /** The leader type in the table of contents. */
    LeaderType?: TocLeader;

    /** Specifies whether to format the table of contents as links. */
    FormatAsLinks?: boolean;

    /** Specifies whether to generate the table of contents from the outline levels or the specified styles. */
    BuildFrom?: TocBuildFromPr;

    /** The table of contents style type. */
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style. */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels. */
  export interface TocStyleLvl {
    /** Style name (for example, "Heading 1"). */
    Name: string;

    /** Level which will be applied to the specified style in the table of contents. */
    Lvl: number;
  }

  /** Table of figures properties. */
  export interface TofPr {
    /** Specifies whether to show page numbers in the table of figures. */
    ShowPageNums?: boolean;

    /** Specifies whether to right-align page numbers in the table of figures. */
    RightAlgn?: boolean;

    /** The leader type in the table of figures. */
    LeaderType?: TocLeader;

    /** Specifies whether to format the table of figures as links. */
    FormatAsLinks?: boolean;

    /**
     * Specifies whether to generate the table of figures based on the specified caption label or the
     * paragraph style name used (for example, "Heading 1").
     */
    BuildFrom?: CaptionLabel | string;

    /** Specifies whether to include the label and number in the table of figures. */
    LabelNumber?: boolean;

    /** The table of figures style type. */
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style. */
  export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

  /** Represents a user's comment history. */
  export interface UserComments {
    /** A list of comments. */
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    /** A list of review records. */
    reviews: ReviewReportRecord[];
  }

  /**
   * The available text vertical alignment (used to align text in a shape with a placement for text
   * inside it).
   */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction. */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type. */
  export type WatermarkType = "none" | "text" | "image";

  /** The available widget border styles. */
  export type WidgetBorderStyle = "solid" | "beveled" | "dashed" | "inset" | "underline";

  /** The available widget border width. */
  export type WidgetBorderWidth = "none" | "thin" | "medium" | "thick";

  /**
   * This element specifies the information which shall be used to establish a mapping to an XML element
   * stored within a Custom XML.
   */
  export interface XmlMapping {
    /** The set of prefix mappings which shall be used to interpret the XPath expression specified in xpath. */
    prefixMapping: string;

    /** The XPath expression. */
    xpath: string;

    /** The custom XML data identifier. */
    storeItemID: string;
  }

  /**
   * Available values of the "bookmark" reference type:
   * **"text"** - the entire bookmark text;
   * **"pageNum"** - the bookmark page number;
   * **"paraNum"** - the bookmark paragraph number;
   * **"noCtxParaNum"** - the abbreviated paragraph number (the specific item only, e.g. instead of
   * "4.1.1" you refer to "1" only);
   * **"fullCtxParaNum** - the full paragraph number, e.g. "4.1.1";
   * **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255. */
  export type byte = number;

  /**
   * Available values of the "equation"/"figure"/"table" reference type:
   * **"entireCaption"**- the entire caption text;
   * **"labelNumber"** - the label and object number only, e.g. "Table 1.1";
   * **"captionText"** - the caption text only;
   * **"pageNum"** - the page number containing the referenced object;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /**
   * Available values of the "endnote" reference type:
   * **"endnoteNum"** - the endnote number;
   * **"pageNum"** - the endnote page number;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position;
   * **"formEndnoteNum"** - the form number formatted as an endnote. The numbering of the actual endnotes
   * is not affected.
   */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /**
   * Available values of the "footnote" reference type:
   * **"footnoteNum"** - the footnote number;
   * **"pageNum"** - the page number of the footnote;
   * **"aboveBelow"** - the words "above" or "below" depending on the position of the item;
   * **"formFootnoteNum"** - the form number formatted as a footnote. The numbering of the actual
   * footnotes is not affected.
   */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /**
   * Available values of the "heading" reference type:
   * **"text"** - the entire heading text;
   * **"pageNum"** - the heading page number;
   * **"headingNum"** - the heading sequence number;
   * **"noCtxHeadingNum"** - the abbreviated heading number. Make sure the cursor pointer is in the
   * section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so
   * instead of "4.B" you receive "B" only;
   * **"fullCtxHeadingNum"** - the full heading number even if the cursor pointer is in the same section;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors. */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point). */
  export type hps = number;

  /** 240ths of a line. */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre. */
  export type mm = number;

  /**
   * Available values of the "numbered" reference type:
   * **"pageNum"** - the numbered item page number;
   * **"paraNum"** - the numbered item paragraph number;
   * **"noCtxParaNum"** - the abbreviated paragraph number (the specific item only, e.g. instead of
   * "4.1.1" you refer to "1" only);
   * **"fullCtxParaNum"** - the full paragraph number, e.g. "4.1.1";
   * **"text"** - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to
   * "Terms and Conditions" only;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position.
   */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100. */
  export type percentage = number;

  /** A point. */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points). */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch). */
  export type twips = number;

  // Manual overrides (see src/overrides/pdf.ts) for types sdkjs's own JSDoc doesn't
  // resolve from this package's usual sources
  /**
   * A paragraph numbering bullet type, referenced by a `word/apiBuilder.js` method also tagged for
   * Pdf - genuinely declared in `slide/apiBuilder.js`, not one of Pdf's own sources
   * (`word/apiBuilder.js`, `pdf/apiBuilder.js`, `pdf/plugin-events.js`). Adding all of
   * `slide/apiBuilder.js` as a Pdf source to resolve this one typedef would pull Slide's entire class
   * set into the Pdf namespace, so it's a one-line override instead.
   */
  export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

  /** @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/ */
  export interface Api {
    /**
     * Converts centimeters to points.
     *
     * @param cm - The number of centimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CentimetersToPoints/
     */
    CentimetersToPoints(cm: number): number;

    /**
     * Creates an ApiColor from a universal input. The method recognizes several call signatures and either
     * delegates to a narrower factory or constructs an ApiColor directly.
     * **Numeric components**: "Api.Color(r, g, b)" or "Api.Color(r, g, b, a)" creates an RGB or RGBA color
     * from byte components (0-255).
     * **Packed integer**: "Api.Color(0xRRGGBB)" creates an RGB color from a 24-bit integer.
     * **Full HEX string**: "Api.Color('#RRGGBB')" or "Api.Color('RRGGBB')" creates a HEX color; the
     * leading "#" is optional.
     * **Short HEX string**: "Api.Color('#RGB')" expands each digit by duplication, so "#F0A" becomes
     * "#FF00AA".
     * **Theme color name**: "Api.Color('accent1')" creates a theme color; any value of SchemeColorId is
     * accepted.
     * **Preset color name**: "Api.Color('aliceBlue')" resolves any value of PresetColor to its RGB
     * equivalent.
     * **Auto color**: "Api.Color('auto')" creates an auto color.
     * For a single string argument, the resolution priority is: "auto", a string starting with "#", a
     * theme name, a preset name, a bare 6-digit HEX. Theme and preset palettes do not overlap. A 3-digit
     * shorthand is accepted only with the leading "#".
     * Unsupported inputs (objects, arrays, an existing ApiColor, unknown strings, no arguments) return a
     * black color (#000000).
     *
     * @param r - The universal color input. With three or four arguments, the red component (0-255).
     * @param g - The green component (0-255). Used only with the (r, g, b) and (r, g, b, a) forms.
     * @param b - The blue component (0-255). Used only with the (r, g, b) and (r, g, b, a) forms.
     * @param a - The alpha component (0-255). Used only with the (r, g, b, a) form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/Color/
     */
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;

    /**
     * Creates a blip fill to apply to the object using the selected image as the object background.
     *
     * @param imageUrl - The path to the image used for the blip fill (currently only internet URL or Base64 encoded
     *   images are supported).
     * @param blipFillType - The type of the fill used for the blip fill (tile or stretch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateBlipFill/
     */
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;

    /**
     * Creates a bullet for a paragraph with the character or symbol specified with the sSymbol parameter.
     *
     * @param sSymbol - The character or symbol which will be used to create the bullet for the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateBullet/
     */
    CreateBullet(sSymbol: string): ApiBullet;

    /**
     * Creates a button field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateButtonField/
     */
    CreateButtonField(rect: Rect): ApiButtonField;

    /**
     * Creates caret annotation.
     *
     * @param rect - region to apply caret.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateCaretAnnot/
     */
    CreateCaretAnnot(rect: Rect | Quad[]): ApiCaretAnnotation;

    /**
     * Creates a chart with the parameters specified.
     * :::note
     * Values of _nStyleIndex_ outside **1 - 48** are interpreted as a chart style id from the
     * _cs:chartStyle_ element (e.g. 201, 215, 284) and are available only for [ONLYOFFICE Docs
     * Enterprise](https://www.onlyoffice.com/docs-enterprise-prices.aspx?from=api) and [ONLYOFFICE Docs
     * Developer](https://www.onlyoffice.com/developer-edition-prices.aspx?from=api).
     * :::
     *
     * @param chartType - The chart type used for the chart display.
     * @param series - The array of the data used to build the chart from.
     * @param seriesNames - The array of the names (the source table column names) used for the data which the chart will be
     *   build from.
     * @param categoryNames - The array of the names (the source table row names) used for the data which the chart will be
     *   build from.
     * @param width - The chart width in English measure units.
     * @param height - The chart height in English measure units.
     * @param styleIndex - The chart color style index (can be **1 - 48**, as described in OOXML specification).
     * @param numFormats - Numeric formats which will be applied to the series (can be custom formats). The default numeric
     *   format is "General".
     * @default chartType = "bar"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateChart/
     */
    CreateChart(series: number[][], seriesNames: number[] | string[], categoryNames: number[] | string[], width: EMU, height: EMU, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;
    CreateChart(chartType: ChartType, series: number[][], seriesNames: number[] | string[], categoryNames: number[] | string[], width: EMU, height: EMU, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;

    /**
     * Creates a checkbox field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateCheckboxField/
     */
    CreateCheckboxField(rect: Rect): ApiCheckboxField;

    /**
     * Creates circle annotation.
     *
     * @param rect - annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateCircleAnnot/
     */
    CreateCircleAnnot(rect: Rect): ApiCircleAnnotation;

    /**
     * Creates a combobox field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateComboboxField/
     */
    CreateComboboxField(rect: Rect): ApiComboboxField;

    /**
     * Creates a new custom geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateCustomGeometry/
     */
    CreateCustomGeometry(): ApiGeometry;

    /**
     * Creates a text date field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateDateField/
     */
    CreateDateField(rect: Rect): ApiTextField;

    /**
     * Creates freeText annotation.
     *
     * @param rect - annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateFreeTextAnnot/
     */
    CreateFreeTextAnnot(rect: Rect): ApiFreeTextAnnotation;

    /**
     * Creates a GoTo action.
     *
     * @param zoom - 1 = 100% (used only for goToType = "xyz")
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateGoToAction/
     */
    CreateGoToAction(page: number, goToType: GoToType, zoom: number, rect: Rect): ApiGoToAction;

    /**
     * Creates a gradient stop used for different types of gradients.
     *
     * @param color - The color used for the gradient stop.
     * @param pos - The position of the gradient stop measured in 1000th of percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateGradientStop/
     */
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;

    /**
     * Creates a hide-show forms action.
     *
     * @param isHidde - to hide - true, to show - false
     * @param names - field names
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateHideShowFormsAction/
     */
    CreateHideShowFormsAction(isHidde: boolean, names: string[]): ApiHideShowFormsAction;

    /**
     * Creates highlight annotation.
     *
     * @param rect - region to apply highlight.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateHighlightAnnot/
     */
    CreateHighlightAnnot(rect: Rect | Quad[]): ApiHighlightAnnotation;

    /**
     * Creates an image with the parameters specified.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param width - The image width in English measure units.
     * @param height - The image height in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateImage/
     */
    CreateImage(imageSrc: string, width: EMU, height: EMU): ApiImage;

    /**
     * Creates a image field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateImageField/
     */
    CreateImageField(rect: Rect): ApiButtonField;

    /**
     * Creates ink annotation.
     *
     * @param rect - annotation rect.
     * @param inkPaths - The ink path list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateInkAnnot/
     */
    CreateInkAnnot(rect: Rect, inkPaths: PathList): ApiInkAnnotation;

    /**
     * Creates a js action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateJsAction/
     */
    CreateJsAction(script: string): ApiJsAction;

    /**
     * Creates line annotation.
     *
     * @param rect - annotation rect.
     * @param startPoint - start line point
     * @param endPoint - end line point
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateLineAnnot/
     */
    CreateLineAnnot(rect: Rect, startPoint: Point, endPoint: Point): ApiLineAnnotation;

    /**
     * Creates a linear gradient fill to apply to the object using the selected linear gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     * @param angle - The angle measured in 60000th of a degree that will define the gradient direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateLinearGradientFill/
     */
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;

    /**
     * Creates a listbox field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateListboxField/
     */
    CreateListboxField(rect: Rect): ApiListboxField;

    /**
     * Creates a math equation from a linear text string. The resulting object can be inserted into
     * a paragraph the same way as a run (e.g. via {@link ApiParagraph#AddElement} or
     * {@link ApiParagraph#Push}).
     *
     * @param text - An equation written as a linear text string.
     * @param format - The format of the specified linear representation.
     * @default format = "unicode"
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateMath/
     */
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;

    /**
     * Creates a named action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateNamedAction/
     */
    CreateNamedAction(name: NamedActionType): ApiNamedAction;

    /**
     * Creates no fill and removes the fill from the element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateNoFill/
     */
    CreateNoFill(): ApiFill;

    /**
     * Creates a bullet for a paragraph with the numbering character or symbol specified with the numType
     * parameter.
     *
     * @param numType - The numbering type the paragraphs will be numbered with.
     * @param startAt - The number the first numbered paragraph will start with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateNumbering/
     */
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;

    /**
     * Creates a new paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateParagraph/
     */
    CreateParagraph(): ApiParagraph;

    /**
     * Creates a pattern fill to apply to the object using the selected pattern as the object background.
     *
     * @param patternType - The pattern type used for the fill selected from one of the available pattern types.
     * @param bgColor - The background color used for the pattern creation.
     * @param fgColor - The foreground color used for the pattern creation.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreatePatternFill/
     */
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;

    /**
     * Creates polyline annotation.
     *
     * @param rect - annotation rect.
     * @param path - polyline path
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreatePolyLineAnnot/
     */
    CreatePolyLineAnnot(rect: Rect, path: Path): ApiPolyLineAnnotation;

    /**
     * Creates polygon annotation.
     *
     * @param rect - annotation rect.
     * @param path - polygon path
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreatePolygonAnnot/
     */
    CreatePolygonAnnot(rect: Rect, path: Path): ApiPolygonAnnotation;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param presetColor - A preset selected from the list of the available color preset names.
     * @returns ;
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreatePresetColor/
     */
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;

    /**
     * Creates a geometry using one of the available preset shapes.
     *
     * @param preset - The preset name.
     * @default preset = "rect"
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreatePresetGeometry/
     */
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;

    /**
     * Creates an RGB color setting the appropriate values for the red, green and blue color components.
     *
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRGBColor/
     */
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;

    /**
     * Creates a radial gradient fill to apply to the object using the selected radial gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRadialGradientFill/
     */
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;

    /**
     * Creates a radiobutton field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRadiobuttonField/
     */
    CreateRadiobuttonField(rect: Rect): ApiRadiobuttonField;

    /**
     * Creates redact annotation.
     *
     * @param rect - region to apply redact.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRedactAnnot/
     */
    CreateRedactAnnot(rect: Rect | Quad[]): ApiRedactAnnotation;

    /**
     * Creates a reset forms action.
     *
     * @param isAllExcept - will all fields be reset except the fields whose names are specified
     * @param names - field names
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateHideShowFormsAction/
     */
    CreateResetFormsAction(isAllExcept: boolean, names: string[]): ApiHideShowFormsAction;

    /**
     * Creates the empty rich paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRichParaPr/
     */
    CreateRichParaPr(): ApiParaPr;

    /**
     * Creates a new rich paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRichParagraph/
     */
    CreateRichParagraph(): ApiRichParagraph;

    /**
     * Creates a new rich run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRichRun/
     */
    CreateRichRun(): ApiRichRun;

    /**
     * Creates the empty rich text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRichTextPr/
     */
    CreateRichTextPr(): ApiTextPr;

    /**
     * Creates a new smaller text block to be inserted to the current paragraph or table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateRun/
     */
    CreateRun(): ApiRun;

    /**
     * Creates a complex color scheme selecting from one of the available schemes.
     *
     * @param schemeColorId - The color scheme identifier.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateSchemeColor/
     */
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;

    /**
     * Creates a shadow which can be applied to a graphic object.
     *
     * @param settings - The shadow properties.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateShadow/
     */
    CreateShadow(settings: ShadowSettings): ApiShadow;

    /**
     * Creates a shape with the parameters specified.
     *
     * @param shapeType - The shape type which specifies the preset shape geometry.
     * @param width - The shape width in English measure units.
     * @param height - The shape height in English measure units.
     * @param fill - The color or pattern used to fill the shape. If not specified, the default shape style fill
     *   (theme accent) is used.
     * @param stroke - The stroke used to draw the shape outline. If not specified, the default shape style outline
     *   (theme accent) is used.
     * @default shapeType = "rect"
     * @default width = 914400
     * @default height = 914400
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateShape/
     */
    CreateShape(shapeType?: ShapeType, width?: EMU, height?: EMU, fill?: ApiFill, stroke?: ApiStroke): ApiShape;

    /**
     * Creates a signature field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateSignatureField/
     */
    CreateSignatureField(rect: Rect): ApiSignatureField;

    /**
     * Creates a solid fill to apply to the object using a selected solid color as the object background.
     *
     * @param color - The color used for the element fill.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateSolidFill/
     */
    CreateSolidFill(color: ApiColor): ApiFill;

    /**
     * Creates square annotation.
     *
     * @param rect - annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateSquareAnnot/
     */
    CreateSquareAnnot(rect: Rect): ApiSquareAnnotation;

    /**
     * Creates stamp annotation.
     *
     * @param rect - annotation rect (only x1, y1 coordinates will be used, since the stamp dimensions are reserved).
     * @param type - stamp type
     * @param author - name of the author
     * @param creationDate - creation date (timeStamp)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateStampAnnot/
     */
    CreateStampAnnot(rect: Rect, type: StampType, author?: string, creationDate?: number): ApiStampAnnotation;

    /**
     * Creates strikeout annotation.
     *
     * @param rect - region to apply strikeout.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateStrikeoutAnnot/
     */
    CreateStrikeoutAnnot(rect: Rect | Quad[]): ApiStrikeoutAnnotation;

    /**
     * Creates a stroke adding shadows to the element.
     *
     * @param width - The width of the shadow measured in English measure units.
     * @param fill - The fill type used to create the shadow.
     * @param sDash - The type of line dash.
     * @default sDash = "solid"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateStroke/
     */
    CreateStroke(width: EMU, fill: ApiFill, sDash?: DashType): ApiStroke;

    /**
     * Creates a table.
     *
     * @param rows - Number of rows.
     * @param cols - Number of columns.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateTable/
     */
    CreateTable(rows: number, cols: number): ApiTable;

    /**
     * Creates the empty table row properties.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateTableRowPr/
     */
    CreateTableRowPr(): ApiTableRowPr;

    /**
     * Creates text annotation.
     *
     * @param rect - annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateTextAnnot/
     */
    CreateTextAnnot(rect: Rect): ApiTextAnnotation;

    /**
     * Creates a text field.
     *
     * @param rect - widget rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateTextField/
     */
    CreateTextField(rect: Rect): ApiTextField;

    /**
     * Creates the empty text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateTextPr/
     */
    CreateTextPr(): ApiTextPr;

    /**
     * Creates underline annotation.
     *
     * @param rect - region to apply underline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateUnderlineAnnot/
     */
    CreateUnderlineAnnot(rect: Rect | Quad[]): ApiUnderlineAnnotation;

    /**
     * Creates an URI action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/CreateUriAction/
     */
    CreateUriAction(uri: string): ApiUriAction;

    /**
     * Converts English Metric Units (EMUs) to millimeters.
     *
     * @param emu - The value in English Metric Units (EMUs).
     * @returns The value in millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/EmusToMillimeters/
     */
    EmusToMillimeters(emu: EMU): mm;

    /**
     * Converts EMUs (English Metric Units) to points.
     *
     * @param emu - The number of EMUs to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/EmusToPoints/
     */
    EmusToPoints(emu: number): number;

    /**
     * Returns the object by it's internal ID.
     *
     * @param id - the object internal ID.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/GetByInternalId/
     */
    GetByInternalId(id: string): FloatObject | ApiDocumentContent | ApiParagraph | ApiTableRow | ApiTableCell;

    /**
     * Creates a text field with the specified text field properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/GetDocument/
     */
    GetDocument(): ApiDocument;

    /**
     * Returns the full name of the currently opened file.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Creates a color from a HEX string.
     *
     * @param hexString - The HEX string representing a color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/HexColor/
     */
    HexColor(hexString: string): ApiColor;

    /**
     * Converts inches to points.
     *
     * @param inches - The number of inches to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/InchesToPoints/
     */
    InchesToPoints(inches: number): number;

    /**
     * Converts lines to points (1 line = 12 points).
     *
     * @param lines - The number of lines to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/LinesToPoints/
     */
    LinesToPoints(lines: number): number;

    /**
     * Converts millimeters to English Metric Units (EMUs).
     * The result is an integer value.
     *
     * @param mm - The value in millimeters.
     * @returns The value in English Metric Units (EMUs), as an integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/MillimetersToEmus/
     */
    MillimetersToEmus(mm: mm): EMU;

    /**
     * Converts millimeters to pixels.
     *
     * @param mm - The number of millimeters to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/MillimetersToPixels/
     */
    MillimetersToPixels(mm: number): number;

    /**
     * Converts millimeters to points.
     *
     * @param mm - The number of millimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/MillimetersToPoints/
     */
    MillimetersToPoints(mm: number): number;

    /**
     * Converts picas to points.
     *
     * @param pc - The number of picas to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PicasToPoints/
     */
    PicasToPoints(pc: number): number;

    /**
     * Converts pixels to EMUs (English Metric Units).
     *
     * @param px - The number of pixels to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PixelsToEmu/
     */
    PixelsToEmus(px: number): number;

    /**
     * Converts pixels to points.
     *
     * @param px - The number of pixels to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PixelsToPoints/
     */
    PixelsToPoints(px: number): number;

    /**
     * Converts points to centimeters.
     *
     * @param pt - The number of points to convert to centimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToCentimeters/
     */
    PointsToCentimeters(pt: number): number;

    /**
     * Converts points to EMUs (English Metric Units).
     *
     * @param pt - The number of points to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToEmus/
     */
    PointsToEmus(pt: number): number;

    /**
     * Converts points to inches.
     *
     * @param pt - The number of points to convert to inches.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToInches/
     */
    PointsToInches(pt: number): number;

    /**
     * Converts points to lines (1 line = 12 points).
     *
     * @param pt - The number of points to convert to lines.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToLines/
     */
    PointsToLines(pt: number): number;

    /**
     * Converts points to millimeters.
     *
     * @param pt - The number of points to convert to millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToMillimeters/
     */
    PointsToMillimeters(pt: number): number;

    /**
     * Converts points to picas (1 pica = 12 points).
     *
     * @param pt - The number of points to convert to picas.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToPicas/
     */
    PointsToPicas(pt: number): number;

    /**
     * Converts points to pixels.
     *
     * @param pt - The number of points to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToPixels/
     */
    PointsToPixels(pt: number): number;

    /**
     * Converts points to twips.
     *
     * @param pt - The number of points to convert to twips.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/PointsToTwips/
     */
    PointsToTwips(pt: number): number;

    /**
     * Creates an RGB color from red, green and blue components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/RGB/
     */
    RGB(r: number, g: number, b: number): ApiColor;

    /**
     * Creates an RGBA color from red, green, blue and alpha components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     * @param a - Alpha component (0-255).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/RGBA/
     */
    RGBA(r: number, g: number, b: number, a: number): ApiColor;

    /**
     * Creates a theme color.
     *
     * @param name - The theme color name. If the provided name is not supported, the 'tx1' color will be used.
     * @default name = "tx1"
     * @returns Instance of ApiColor with 'theme' type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/ThemeColor/
     */
    ThemeColor(name?: SchemeColorId): ApiColor;

    /**
     * Converts twips to points.
     *
     * @param twips - The number of twips to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/Api/Methods/TwipsToPoints/
     */
    TwipsToPoints(twips: number): number;
  }

  /**
   * Class representing a base an action collection.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/
   */
  export interface ApiActionCollection {
    /**
     * Gets Calculate action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetCalculate/
     */
    GetCalculate(): ApiJsAction;

    /**
     * Gets class type of this object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetClassType/
     */
    GetClassType(): "actionCollection";

    /**
     * Gets Format action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetFormat/
     */
    GetFormat(): ApiJsAction;

    /**
     * Gets Keystroke action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetKeystroke/
     */
    GetKeystroke(): ApiJsAction;

    /**
     * Gets MouseDown action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetMouseDown/
     */
    GetMouseDown(): ApiBaseAction;

    /**
     * Gets MouseEnter action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetMouseEnter/
     */
    GetMouseEnter(): ApiBaseAction;

    /**
     * Gets MouseExit action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetMouseExit/
     */
    GetMouseExit(): ApiBaseAction;

    /**
     * Gets MouseUp action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetMouseUp/
     */
    GetMouseUp(): ApiBaseAction;

    /**
     * Gets OnBlur action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetOnBlur/
     */
    GetOnBlur(): ApiBaseAction;

    /**
     * Gets OnFocus action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetOnFocus/
     */
    GetOnFocus(): ApiBaseAction;

    /**
     * Gets Validate action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/GetValidate/
     */
    GetValidate(): ApiJsAction;

    /**
     * Sets the Calculate action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetCalculate/
     */
    SetCalculate(action: ApiJsAction): boolean;

    /**
     * Sets the Format action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetFormat/
     */
    SetFormat(action: ApiJsAction): boolean;

    /**
     * Sets the Keystroke action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetKeystroke/
     */
    SetKeystroke(action: ApiJsAction): boolean;

    /**
     * Sets the MouseDown action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetMouseDown/
     */
    SetMouseDown(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseEnter action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetMouseEnter/
     */
    SetMouseEnter(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseExit action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetMouseExit/
     */
    SetMouseExit(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseUp action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetMouseUp/
     */
    SetMouseUp(action: ApiBaseAction): boolean;

    /**
     * Sets the OnBlur action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetOnBlur/
     */
    SetOnBlur(action: ApiBaseAction): boolean;

    /**
     * Sets the OnFocus action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetOnFocus/
     */
    SetOnFocus(action: ApiBaseAction): boolean;

    /**
     * Sets the Validate action.
     *
     * @param action - The action to set, or `null` to remove it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiActionCollection/Methods/SetValidate/
     */
    SetValidate(action: ApiJsAction): boolean;
  }

  /**
   * Class representing a base pdf action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAction/
   */
  export interface ApiBaseAction {
    /**
     * Returns next action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAction/Methods/GetNext/
     */
    GetNext(): ApiBaseAction;

    /**
     * Sets next action.
     *
     * @returns returns next action
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetNext/
     */
    SetNext(action: ApiBaseAction): ApiBaseAction;
  }

  /**
   * Class representing a base annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/
   */
  export interface ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a base field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/
   */
  export interface ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/AddWidget/
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /**
     * Removes field from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Gets field full name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Gets field partial name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetPartialName/
     */
    GetPartialName(): string;

    /**
     * Gets field value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetValue/
     */
    GetValue(): string | string[];

    /**
     * Checks if field is read only
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsReadOnly/
     */
    IsReadOnly(): boolean;

    /**
     * Checks if field is required
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetFullName/
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetPartialName/
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetReadOnly/
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetRequired/
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetValue/
     */
    SetValue(value: string): boolean;
  }

  /**
   * Class representing a base list field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/
   */
  export interface ApiBaseListField extends ApiBaseField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     * @default index = this.GetOptions().lenght
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/AddOption/
     */
    AddOption(option: ListOption, index?: number): boolean;

    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/AddWidget/
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /**
     * Removes field from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Gets field full name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOption/
     */
    GetOption(index: number): ListOption;

    /**
     * Gets all options from list options.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOptions/
     */
    GetOptions(): ListOption[];

    /**
     * Gets field partial name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetPartialName/
     */
    GetPartialName(): string;

    /**
     * Gets field value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetValue/
     */
    GetValue(): string | string[];

    /**
     * Gets selected value indexes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetValueIndexes/
     */
    GetValueIndexes(): number[];

    /**
     * Checks if field can commit on selection change.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/IsCommitOnSelChange/
     */
    IsCommitOnSelChange(): boolean;

    /**
     * Checks if field is read only
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsReadOnly/
     */
    IsReadOnly(): boolean;

    /**
     * Checks if field is required
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/MoveOption/
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/RemoveOption/
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetCommitOnSelChange/
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetFullName/
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetPartialName/
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetReadOnly/
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetRequired/
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetValueIndexes/
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /**
   * Class representing a base markup annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/
   */
  export interface ApiBaseMarkupAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a base field widget.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/
   */
  export interface ApiBaseWidget {
    /**
     * Removes widget from parent field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets actions collection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetActions/
     */
    GetActions(): ApiActionCollection;

    /**
     * Gets widget background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Gets widget border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets widget border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderStyle/
     */
    GetBorderStyle(): WidgetBorderStyle;

    /**
     * Gets widget border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderWidth/
     */
    GetBorderWidth(): WidgetBorderWidth;

    /**
     * Returns a type of the ApiBaseWidget class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetClassType/
     */
    GetClassType(): "baseWidget";

    /**
     * Gets parent field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetParent/
     */
    GetParent(): ApiField;

    /**
     * Gets widget position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Sets field rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets widget text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextColor/
     */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextSize/
     */
    GetTextSize(): pt;

    /**
     * Checks if text is autofit.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetAutoFit/
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderWidth/
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextColor/
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextSize/
     */
    SetTextSize(size: pt): boolean;
  }

  /** Class representing a container for the document content. */
  export interface ApiBlockLvlSdt {
  }

  /** Class representing a bookmark in the document. */
  export interface ApiBookmark {
  }

  /**
   * Class representing a paragraph bullet.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBullet/
   */
  export interface ApiBullet {
    /**
     * Returns a type of the ApiBullet class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBullet/Methods/GetClassType/
     */
    GetClassType(): "bullet";

    /**
     * Converts the ApiBullet object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBullet/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a button field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonField/
   */
  export interface ApiButtonField extends ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/AddWidget/
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /**
     * Removes field from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Returns a type of the ApiButtonField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonField/Methods/GetClassType/
     */
    GetClassType(): "buttonField";

    /**
     * Gets field full name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Gets field partial name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetPartialName/
     */
    GetPartialName(): string;

    /**
     * Gets field value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetValue/
     */
    GetValue(): string | string[];

    /**
     * Checks if field is read only
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsReadOnly/
     */
    IsReadOnly(): boolean;

    /**
     * Checks if field is required
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetFullName/
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetPartialName/
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetReadOnly/
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetRequired/
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets image for all button field widgets
     *
     * @param imageUrl - The URL of the image to set for the button.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonField/Methods/SetValue/
     */
    SetValue(imageUrl: string): boolean;
  }

  /**
   * Class representing a button widget.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/
   */
  export interface ApiButtonWidget extends Omit<ApiBaseWidget, "GetClassType"> {
    /**
     * Removes widget from parent field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets widget background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Gets button widget behavior.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetBehavior/
     */
    GetBehavior(): ButtonBehavior;

    /**
     * Gets widget border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets widget border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderStyle/
     */
    GetBorderStyle(): WidgetBorderStyle;

    /**
     * Gets widget border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderWidth/
     */
    GetBorderWidth(): WidgetBorderWidth;

    /**
     * Returns a type of the ApiButtonWidget class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetClassType/
     */
    GetClassType(): "buttonWidget";

    /**
     * Gets button widget icon x position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetIconXPos/
     */
    GetIconXPos(): percentage;

    /**
     * Gets button widget icon y position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetIconYPos/
     */
    GetIconYPos(): percentage;

    /**
     * Gets label from button widget field.
     *
     * @param appearance - The appearance state.
     * @default appearance = "normal"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetLabel/
     */
    GetLabel(appearance?: ButtonAppearance): string;

    /**
     * Gets button widget layout type
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetLayout/
     */
    GetLayout(): ButtonLayout;

    /**
     * Gets widget position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Sets field rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets button widget scale when type
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetScaleHow/
     */
    GetScaleHow(): ButtonScaleHow;

    /**
     * Gets button widget scale when type
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/GetScaleWhen/
     */
    GetScaleWhen(): ButtonScaleWhen;

    /**
     * Gets widget text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextColor/
     */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextSize/
     */
    GetTextSize(): pt;

    /**
     * Checks if text is autofit.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if button widget is fit bounds.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/IsFitBounds/
     */
    IsFitBounds(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetAutoFit/
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets button widget behavior.
     *
     * @param behavior - The highlight behavior when the button is clicked.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetBehavior/
     */
    SetBehavior(behavior: ButtonBehavior): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderWidth/
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets button widget fit bounds.
     *
     * @param fit - Specifies whether the icon is scaled to fit the button bounds.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetFitBounds/
     */
    SetFitBounds(fit: boolean): boolean;

    /**
     * Sets button widget icon x position.
     *
     * @param posX - The horizontal position of the icon as a percentage of the button width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetIconXPos/
     */
    SetIconXPos(posX: percentage): boolean;

    /**
     * Sets button widget icon y position.
     *
     * @param posY - The vertical position of the icon as a percentage of the button height.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetIconYPos/
     */
    SetIconYPos(posY: percentage): boolean;

    /**
     * Sets image to button widget field.
     *
     * @param imageUrl - The image URL.
     * @param appearance - The appearance state.
     * @default imageUrl = ""
     * @default appearance = "normal"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetImage/
     */
    SetImage(imageUrl?: string, appearance?: ButtonAppearance): boolean;

    /**
     * Sets label to button widget field.
     *
     * @param label - The button label.
     * @param appearance - The appearance state.
     * @default appearance = "normal"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetLabel/
     */
    SetLabel(label: string, appearance?: ButtonAppearance): boolean;

    /**
     * Sets button widget layout type
     *
     * @param layout - The button layout.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetLayout/
     */
    SetLayout(layout: ButtonLayout): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets button widget scale how type
     *
     * @param scaleHow - The icon scaling mode.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetScaleHow/
     */
    SetScaleHow(scaleHow: ButtonScaleHow): boolean;

    /**
     * Sets button widget scale when type
     *
     * @param scaleWhen - The condition that controls when the icon is scaled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonWidget/Methods/SetScaleWhen/
     */
    SetScaleWhen(scaleWhen: ButtonScaleWhen): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextColor/
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextSize/
     */
    SetTextSize(size: pt): boolean;
  }

  /**
   * Class representing a caret annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCaretAnnotation/
   */
  export interface ApiCaretAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiCaretAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCaretAnnotation/Methods/GetClassType/
     */
    GetClassType(): "caretAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a chart.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/
   */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetTitle"> {
    /**
     * Sets a style to the current chart by style ID.
     *
     * @param nStyleId - One of the styles available in the editor.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/ApplyChartStyle/
     */
    ApplyChartStyle(nStyleId: unknown): boolean;

    /**
     * Returns all series from the chart space.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetAllSeries/
     */
    GetAllSeries(): ApiChartSeries[];

    /**
     * Returns a type of the chart object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChart class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetClassType/
     */
    GetClassType(): "chart";

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Returns the series with a specific index.
     *
     * @param nIdx - Series index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetSeries/
     */
    GetSeries(nIdx: number): ApiChartSeries;

    /**
     * Returns the chart title text.
     *
     * @returns The chart title text or null if the chart has no title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns a type of the chart object using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/GetType/
     */
    GetType(): ChartType;

    /**
     * Removes the specified series from the current chart.
     *
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/RemoveSeria/
     */
    RemoveSeria(nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the axis values.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param sAxisPos - Axis position in the chart.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetAxisNumFormat/
     */
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;

    /**
     * Sets a name to the specified chart category.
     *
     * @param sName - The name which will be set to the specified chart category.
     * @param nCategory - The index of the chart category.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetCategoryName/
     */
    SetCategoryName(sName: string, nCategory: number): boolean;

    /**
     * Sets the fill to the data point in the specified chart series.
     *
     * @param oFill - The fill type used to fill the data point.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the fill will be applied to the specified data point in all series.
     * @default bAllSeries = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetDataPointFill/
     */
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;

    /**
     * Sets the specified numeric format to the chart data point.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the numeric format will be applied to the specified data point in all series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetDataPointNumFormat/
     */
    SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Sets the outline to the data point in the specified chart series.
     *
     * @param oStroke - The stroke used to create the data point outline.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the outline will be applied to the specified data point in all series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetDataPointOutLine/
     */
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Specifies font size for labels of the horizontal axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisLabelsFontSize/
     */
    SetHorAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisMajorTickMark/
     */
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisMinorTickMark/
     */
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies the horizontal axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the horizontal axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisOrientation/
     */
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Spicifies tick labels position for the horizontal axis.
     *
     * @param sTickLabelPosition - The type for the position of chart horizontal tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisTickLabelPosition/
     */
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Specifies the chart horizontal axis title.
     *
     * @param sTitle - The title which will be displayed for the horizontal axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the horizontal axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetHorAxisTitle/
     */
    SetHorAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart legend.
     *
     * @param oFill - The fill type used to fill the legend.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetLegendFill/
     */
    SetLegendFill(oFill: ApiFill): boolean;

    /**
     * Specifies the legend font size.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetLegendFontSize/
     */
    SetLegendFontSize(nFontSize: pt): boolean;

    /**
     * Sets the outline to the chart legend.
     *
     * @param oStroke - The stroke used to create the legend outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetLegendOutLine/
     */
    SetLegendOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the chart legend position.
     *
     * @param sLegendPos - The position of the chart legend inside the chart window.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetLegendPos/
     */
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;

    /**
     * Specifies major horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMajorHorizontalGridlines/
     */
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies major vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMajorVerticalGridlines/
     */
    SetMajorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the marker in the specified chart series.
     *
     * @param oFill - The fill type used to fill the marker.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the fill will be applied to all markers in the specified chart series.
     * @default bAllMarkers = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMarkerFill/
     */
    SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Sets the outline to the marker in the specified chart series.
     *
     * @param oStroke - The stroke used to create the marker outline.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the outline will be applied to all markers in the specified chart series.
     * @default bAllMarkers = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMarkerOutLine/
     */
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Specifies minor horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMinorHorizontalGridlines/
     */
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies minor vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetMinorVerticalGridlines/
     */
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the chart plot area.
     *
     * @param oFill - The fill type used to fill the plot area.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetPlotAreaFill/
     */
    SetPlotAreaFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart plot area.
     *
     * @param oStroke - The stroke used to create the plot area outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetPlotAreaOutLine/
     */
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;

    /**
     * Sets a name to the specified chart series.
     *
     * @param sName - The name which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetSeriaName/
     */
    SetSeriaName(sName: string, nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the chart series.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetSeriaNumFormat/
     */
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;

    /**
     * Sets values to the specified chart series.
     *
     * @param aValues - The array of the data which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetSeriaValues/
     */
    SetSeriaValues(aValues: number[], nSeria: number): boolean;

    /**
     * Sets the fill to the specified chart series.
     *
     * @param oFill - The fill type used to fill the series.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the fill will be applied to all series.
     * @default bAll = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetSeriesFill/
     */
    SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;

    /**
     * Sets the outline to the specified chart series.
     *
     * @param oStroke - The stroke used to create the series outline.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the outline will be applied to all series.
     * @default bAll = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetSeriesOutLine/
     */
    SetSeriesOutLine(oStroke: ApiStroke, nSeries: number, bAll?: boolean): boolean;

    /**
     * Specifies which chart data labels are shown for the chart.
     *
     * @param bShowSerName - Whether to show or hide the source table column names used for the data which the chart will be
     *   build from.
     * @param bShowCatName - Whether to show or hide the source table row names used for the data which the chart will be
     *   build from.
     * @param bShowVal - Whether to show or hide the chart data values.
     * @param bShowPercent - Whether to show or hide the percent for the data values (works with stacked chart types).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetShowDataLabels/
     */
    SetShowDataLabels(bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies whether the data table is displayed below the chart, optionally with the legend keys.
     *
     * @param bShow - Whether to show or hide the data table below the chart.
     * @param bShowKeys - Whether to show the legend keys in the data table.
     * @default bShowKeys = false
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetShowDataTable/
     */
    SetShowDataTable(bShow: boolean, bShowKeys?: boolean): boolean;

    /**
     * Spicifies the show options for data labels.
     *
     * @param nSeriesIndex - The series index from the array of the data used to build the chart from.
     * @param nPointIndex - The point index from this series.
     * @param bShowSerName - Whether to show or hide the source table column names used for the data which the chart will be
     *   build from.
     * @param bShowCatName - Whether to show or hide the source table row names used for the data which the chart will be
     *   build from.
     * @param bShowVal - Whether to show or hide the chart data values.
     * @param bShowPercent - Whether to show or hide the percent for the data values (works with stacked chart types).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetShowPointDataLabel/
     */
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies the chart title.
     *
     * @param sTitle - The title which will be displayed for the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the chart title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetTitle/
     */
    SetTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart title.
     *
     * @param oFill - The fill type used to fill the title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetTitleFill/
     */
    SetTitleFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart title.
     *
     * @param oStroke - The stroke used to create the title outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetTitleOutLine/
     */
    SetTitleOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the vertical axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the vertical axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVerAxisOrientation/
     */
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Specifies the chart vertical axis title.
     *
     * @param sTitle - The title which will be displayed for the vertical axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the vertical axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVerAxisTitle/
     */
    SetVerAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Specifies font size for labels of the vertical axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVertAxisLabelsFontSize/
     */
    SetVertAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVertAxisMajorTickMark/
     */
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVertAxisMinorTickMark/
     */
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Spicifies tick labels position for the vertical axis.
     *
     * @param sTickLabelPosition - The type for the position of chart vertical tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetVertAxisTickLabelPosition/
     */
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Sets the x-axis values to all chart series. It is used with the scatter charts only.
     *
     * @param aValues - The array of the data which will be set to the x-axis data points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChart/Methods/SetXValues/
     */
    SetXValues(aValues: string[]): boolean;
  }

  /**
   * Class representing a chart series.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChartSeries/
   */
  export interface ApiChartSeries {
    /**
     * Tries to change the series type. Returns true if successful.
     *
     * @param sType - Chart type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChartSeries/Methods/ChangeChartType/
     */
    ChangeChartType(sType: ChartType): boolean;

    /**
     * Returns a chart type of the current series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChartSeries/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChartSeries class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChartSeries/Methods/GetClassType/
     */
    GetClassType(): "chartSeries";

    /**
     * Returns a chart type of the current series using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiChartSeries/Methods/GetType/
     */
    GetType(): ChartType;
  }

  /**
   * Class representing a document checkbox / radio button.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckBoxForm/
   */
  export interface ApiCheckBoxForm extends ApiFormBase {
  }

  /**
   * Class representing a checkbox field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/
   */
  export interface ApiCheckboxField extends ApiBaseField {
    /**
     * Adds options to checkbox group.
     *
     * @param pageIndex - The page where the option will be added.
     * @param rect - The option rectangle.
     * @param exportValue - The option checked value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/AddOption/
     */
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;

    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/AddWidget/
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /**
     * Removes field from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Returns a type of the ApiCheckboxField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/GetClassType/
     */
    GetClassType(): "checkboxField";

    /**
     * Gets field full name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Gets field partial name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetPartialName/
     */
    GetPartialName(): string;

    /**
     * Gets field value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetValue/
     */
    GetValue(): string | string[];

    /**
     * Checks if field is read only
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsReadOnly/
     */
    IsReadOnly(): boolean;

    /**
     * Checks if field is required
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if the field can be toggled off.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/IsToggleToOff/
     */
    IsToggleToOff(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetFullName/
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetPartialName/
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetReadOnly/
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetRequired/
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets whether the checked state can be toggled off.
     *
     * @param allowToggleOff - Specifies whether the checked state can be toggled off.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/SetToggleToOff/
     */
    SetToggleToOff(allowToggleOff: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetValue/
     */
    SetValue(value: string): boolean;
  }

  /**
   * Class representing a checkbox field widget.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/
   */
  export interface ApiCheckboxWidget extends Omit<ApiBaseWidget, "GetClassType"> {
    /**
     * Removes widget from parent field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets widget background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Gets widget border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets widget border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderStyle/
     */
    GetBorderStyle(): WidgetBorderStyle;

    /**
     * Gets widget border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetBorderWidth/
     */
    GetBorderWidth(): WidgetBorderWidth;

    /**
     * Gets widget checkbox style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/GetCheckStyle/
     */
    GetCheckStyle(): CheckStyle;

    /**
     * Returns a type of the ApiCheckboxWidget class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/GetClassType/
     */
    GetClassType(): "checkboxWidget";

    /**
     * Gets widget export value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/GetExportValue/
     */
    GetExportValue(): string;

    /**
     * Gets widget position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Sets field rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets widget text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextColor/
     */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/GetTextSize/
     */
    GetTextSize(): pt;

    /**
     * Checks if text is autofit.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if checkbox widget is checked.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/IsChecked/
     */
    IsChecked(): boolean;

    /**
     * Checks if widget is checked by default.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/IsCheckedByDefault/
     */
    IsCheckedByDefault(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetAutoFit/
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetBorderWidth/
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets widget checkbox style.
     *
     * @param style - The checkbox style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/SetCheckStyle/
     */
    SetCheckStyle(style: CheckStyle): boolean;

    /**
     * Sets checkbox widget checked.
     *
     * @param checked - Specifies whether the checkbox is checked.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/SetChecked/
     */
    SetChecked(checked: boolean): boolean;

    /**
     * Sets widget checked by default.
     *
     * @param checked - Specifies whether the checkbox is checked by default.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/SetCheckedByDefault/
     */
    SetCheckedByDefault(checked: boolean): boolean;

    /**
     * Sets widget export value.
     *
     * @param value - The value to be exported when the checkbox is checked.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxWidget/Methods/SetExportValue/
     */
    SetExportValue(value: string): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextColor/
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseWidget/Methods/SetTextSize/
     */
    SetTextSize(size: pt): boolean;
  }

  /**
   * Class representing a circle annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCircleAnnotation/
   */
  export interface ApiCircleAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiCircleAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCircleAnnotation/Methods/GetClassType/
     */
    GetClassType(): "circleAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets annotation rect difference.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCircleAnnotation/Methods/GetRectDiff/
     */
    GetRectDiff(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCircleAnnotation/Methods/SetRectDiff/
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Represents a color that can be applied to text.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/
   */
  export interface ApiColor {
    /**
     * Converts the JSON object into the ApiColor object.
     *
     * @param jsonObject - JSON representation of the color.
     * @returns new ApiColor object if the conversion was successful, null otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/FromJSON/
     */
    FromJSON(jsonObject: string): ApiColor | null;

    /**
     * Returns a type of the ApiColor class.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/GetClassType/
     */
    GetClassType(): "color";

    /**
     * Gets the HEX string representation of the color.
     *
     * @returns A six-digit uppercase hex string, e.g. "FF00AA".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/GetHex/
     */
    GetHex(): string;

    /**
     * Gets the RGB components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/GetRGB/
     */
    GetRGB(): object;

    /**
     * Gets the RGBA components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/GetRGBA/
     */
    GetRGBA(): object;

    /**
     * Gets the theme color name if the color is a theme color.
     *
     * @returns The theme color name or null if not a theme color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/GetThemeName/
     */
    GetThemeName(): SchemeColorId | null;

    /**
     * Returns true if the color is a theme color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/IsThemeColor/
     */
    IsThemeColor(): boolean;

    /**
     * Converts the ApiColor object into the JSON object.
     *
     * @returns JSON string representation of the color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiColor/Methods/ToJSON/
     */
    ToJSON(): string;
  }

  /**
   * Class representing a document combo box / drop-down list.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboBoxForm/
   */
  export interface ApiComboBoxForm extends ApiFormBase {
  }

  /**
   * Class representing a combobox field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/
   */
  export interface ApiComboboxField extends ApiBaseListField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     * @default index = this.GetOptions().lenght
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/AddOption/
     */
    AddOption(option: ListOption, index?: number): boolean;

    /**
     * Clears format of field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/ClearFormat/
     */
    ClearFormat(): boolean;

    /**
     * Returns a type of the ApiComboboxField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/GetClassType/
     */
    GetClassType(): "comboboxField";

    /**
     * Gets formatted value of a field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/GetFormattedValue/
     */
    GetFormattedValue(): string;

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOption/
     */
    GetOption(index: number): ListOption;

    /**
     * Gets all options from list options.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOptions/
     */
    GetOptions(): ListOption[];

    /**
     * Gets text field placeholder.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/GetPlaceholder/
     */
    GetPlaceholder(): string;

    /**
     * Gets text widget regular validate expression.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/GetRegularExp/
     */
    GetRegularExp(): boolean;

    /**
     * Gets selected value indexes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetValueIndexes/
     */
    GetValueIndexes(): number[];

    /**
     * Checks if field can commit on selection change.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/IsCommitOnSelChange/
     */
    IsCommitOnSelChange(): boolean;

    /**
     * Checks if field is editable.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/IsEditable/
     */
    IsEditable(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/MoveOption/
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/RemoveOption/
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetCommitOnSelChange/
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets date format for field.
     *
     * @param format - date format (e.g. "dd.mm.yyyy")
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetDateFormat/
     */
    SetDateFormat(format: string): boolean;

    /**
     * Sets whether custom text can be entered.
     *
     * @param allowCustomText - Specifies whether custom text can be entered.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetEditable/
     */
    SetEditable(allowCustomText: boolean): boolean;

    /**
     * Sets mask for field.
     *
     * @param inputMask - The input mask (e.g. "(999)999-9999").
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetMask/
     */
    SetMask(inputMask: string): boolean;

    /**
     * Sets number format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     * @param negativeStyle - The negative number display style.
     * @param currency - The currency symbol.
     * @param currencyPrepend - If true, places the currency symbol before the number (e.g., $1,234.56); if false, places it
     *   after (e.g., 1,234.56$).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetNumberFormat/
     */
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;

    /**
     * Sets percentage format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetPercentageFormat/
     */
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;

    /**
     * Sets text field placeholder.
     * <note>Makes combobox editable</note>
     *
     * @param sPlaceholder - field placeholder
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetPlaceholder/
     */
    SetPlaceholder(sPlaceholder: string): boolean;

    /**
     * Sets regular expression validate string for field.
     *
     * @param regularExpression - The validation regular expression (e.g. "\\S+@\\S+\\.\\S+")
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetRegularExp/
     */
    SetRegularExp(regularExpression: string): boolean;

    /**
     * Sets special format for field.
     *
     * @param format - the formatting style to apply to the value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetSpecialFormat/
     */
    SetSpecialFormat(format: PsfFormat): boolean;

    /**
     * Sets time format for field.
     *
     * @param format - available time format
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetTimeFormat/
     */
    SetTimeFormat(format: TimeFormat): boolean;

    /**
     * Sets validate range for field.
     * <note> Can only be applied to fields with a percentage or number format. </note>
     *
     * @param greaterThan - If true, enables minimum value validation using `greaterThanValue`.
     * @param greaterThanValue - The minimum allowed value.
     * @param lessThan - If true, enables maximum value validation using `lessThanValue`.
     * @param lessThanValue - The maximum allowed value.
     * @default greaterThan = false
     * @default lessThan = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComboboxField/Methods/SetValidateRange/
     */
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetValueIndexes/
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a comment. */
  export interface ApiComment {
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
  }

  /**
   * Class representing a complex field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiComplexForm/
   */
  export interface ApiComplexForm extends ApiFormBase {
  }

  /** Class representing a list of values of the combo box / drop-down list content control. */
  export interface ApiContentControlList {
  }

  /** Class representing an entry of the combo box / drop-down list content control. */
  export interface ApiContentControlListEntry {
  }

  /** Class representing document properties (similar to BuiltInDocumentProperties in VBA). */
  export interface ApiCore {
  }

  /** Class representing custom properties of the document. */
  export interface ApiCustomProperties {
  }

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlNode {
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlPart {
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   */
  export interface ApiCustomXmlParts {
  }

  /**
   * Class representing a document date field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDateForm/
   */
  export interface ApiDateForm extends ApiFormBase {
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/
   */
  export interface ApiDocument {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new page to document.
     *
     * @param index - The index where the page will be added.
     * @param width - The page width.
     * @param height - The page height.
     * @default index = this.GetPagesCount()
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/AddPage/
     */
    AddPage(index?: number, width?: pt, height?: pt): ApiPage;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Applies added redact.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/ApplyRedact/
     */
    ApplyRedact(): boolean;

    /**
     * Gets list of all fields in document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetAllFields/
     */
    GetAllFields(): ApiField[];

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Gets document calculate fields order
     *
     * @returns order of fields names
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetCalculateOrder/
     */
    GetCalculateOrder(): string[];

    /**
     * Returns a type of the ApiDocument class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetClassType/
     */
    GetClassType(): "document";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Gets field by it's name.
     *
     * @param name - the full name parameter.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetFieldByName/
     */
    GetFieldByName(name: string): ApiField;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Gets page by index from document.
     *
     * @param index - page index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetPage/
     */
    GetPage(index: number): ApiPage;

    /**
     * Gets document pages count
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetPagesCount/
     */
    GetPagesCount(): number;

    /**
     * Gets selected text in document
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetSelectedText/
     */
    GetSelectedText(): string;

    /**
     * Gets document selection info
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetSelection/
     */
    GetSelection(): DocSelection;

    /**
     * Gets document selection quads by page
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetSelectionQuads/
     */
    GetSelectionQuads(): DocQuads;

    /**
     * Returns the document style by its name.
     *
     * @param sStyleName - The name of the table style to look up.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/GetStyle/
     */
    GetStyle(sStyleName: string): ApiStyle | null;

    /**
     * Returns the inner text of the current document content object.
     *
     * @param options - Options for formatting the returned text.
     * @param options_Numbering - Defines if the resulting string will include numbering or not.
     * @param options_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param options_TableCellSeparator - Defines how the table cell separator will be specified in the resulting string. Any symbol can
     *   be used. The default separator is "\t".
     * @param options_TableRowSeparator - Defines how the table row separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_ParaSeparator - Defines how the paragraph separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string. Any symbol can be used. The
     *   default symbol is "\t".
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r".
     * @default options_Numbering = true
     * @default options_Math = true
     * @default options_TableCellSeparator = '\t'
     * @default options_TableRowSeparator = '\r\n'
     * @default options_ParaSeparator = '\r\n'
     * @default options_TabSymbol = '\t'
     * @default options_NewLineSeparator = '\r'
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Removes page by index from document
     * <note> You can't delete last page </note>
     *
     * @param index - page index
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/RemovePage/
     */
    RemovePage(index: number): boolean;

    /**
     * Searchs words and adds redact to it.
     *
     * @param props - The search options.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/SearchAndRedact/
     */
    SearchAndRedact(props: SearchProps): ApiRedactAnnotation[];

    /**
     * Sets document calculate fields order
     *
     * @param names - order of fields names
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/SetCalculateOrder/
     */
    SetCalculateOrder(names: string[]): boolean;

    /**
     * Sets document selection
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocument/Methods/SetSelection/
     */
    SetSelection(selection: DocSelection): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;
  }

  /**
   * Class representing a container for paragraphs and tables.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/
   */
  export interface ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a type of the ApiDocumentContent class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetClassType/
     */
    GetClassType(): "documentContent";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the inner text of the current document content object.
     *
     * @param options - Options for formatting the returned text.
     * @param options_Numbering - Defines if the resulting string will include numbering or not.
     * @param options_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param options_TableCellSeparator - Defines how the table cell separator will be specified in the resulting string. Any symbol can
     *   be used. The default separator is "\t".
     * @param options_TableRowSeparator - Defines how the table row separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_ParaSeparator - Defines how the paragraph separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string. Any symbol can be used. The
     *   default symbol is "\t".
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r".
     * @default options_Numbering = true
     * @default options_Math = true
     * @default options_TableCellSeparator = '\t'
     * @default options_TableRowSeparator = '\r\n'
     * @default options_ParaSeparator = '\r\n'
     * @default options_TabSymbol = '\t'
     * @default options_NewLineSeparator = '\r'
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;
  }

  /**
   * Class representing a graphical object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/
   */
  export interface ApiDrawing {
    /**
     * Creates a copy of the specified drawing object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing;

    /**
     * Deletes the specified drawing object from the parent.
     *
     * @returns false if drawing doesn't exist or drawing hasn't a parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetClassType(): "drawing";

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param fill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid or not supported for the current graphic object.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetFill/
     */
    SetFill(fill: ApiFill): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Sets the outline properties to the current graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid or not supported for the current graphic object.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetLine/
     */
    SetLine(stroke: ApiStroke): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetLockValue/
     */
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;

    /**
     * Sets the name of the current drawing.
     * If another drawing with the same name already exists, that drawing's name will be reset to a default
     * auto-generated name.
     * OLE objects do not support a custom name, so for them this method always returns false.
     *
     * @param name - The name which will be set to the current drawing.
     * @returns Returns true if the name was successfully set, otherwise returns false.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param rotAngle - New drawing rotation angle.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(rotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param width - The object width measured in English measure units.
     * @param height - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(width: EMU, height: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a drop cap. A drop cap is a large initial letter that is split off from a
   * paragraph into a
   * separate framed paragraph.
   */
  export interface ApiDropCap {
  }

  /**
   * Class representing a base class for fill.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFill/
   */
  export interface ApiFill {
    /**
     * Returns a type of the ApiFill class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFill/Methods/GetClassType/
     */
    GetClassType(): "fill";

    /**
     * Gets the fill type.
     *
     * @returns returns "solid", "gradient", "pattern", "blip", "nofill" or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFill/Methods/GetType/
     */
    GetType(): FillType;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
  }

  /**
   * Class representing a freeText annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/
   */
  export interface ApiFreeTextAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Gets annot callout.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/GetCallout/
     */
    GetCallout(): FreeTextCallout;

    /**
     * Returns a type of the ApiFreeTextAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/GetClassType/
     */
    GetClassType(): "freeTextAnnot";

    /**
     * Gets annotation rich content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/GetContent/
     */
    GetContent(): ApiRichContent;

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets intent type of this annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/GetIntent/
     */
    GetIntent(): FreeTextIntent;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets annotation rect difference.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/GetRectDiff/
     */
    GetRectDiff(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annot callout.
     *
     * @param callout - An array of 3 points defining the callout line.
     * @returns returns false if intent is not equal "freeTextCallout"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/SetCallout/
     */
    SetCallout(callout: FreeTextCallout): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets intent type for this annotation.
     *
     * @param intentType - The intent type of the free text annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/SetIntent/
     */
    SetIntent(intentType: FreeTextIntent): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiFreeTextAnnotation/Methods/SetRectDiff/
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing the shape geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/
   */
  export interface ApiGeometry {
    /**
     * Adds a new adjustment parameter to the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/AddAdj/
     */
    AddAdj(sName: string, nValue: number): boolean;

    /**
     * Adds a connection point to the current geometry.
     *
     * @param sAngle - The angle of the connection point.
     * @param sX - The X position.
     * @param sY - The Y position.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/AddConnectionPoint/
     */
    AddConnectionPoint(sAngle: string, sX: string, sY: string): boolean;

    /**
     * Adds a guide (formula) to the current geometry.
     *
     * @param sName - The guide name.
     * @param sFormula - The formula type.
     * @param sX - The X parameter.
     * @param sY - The Y parameter.
     * @param sZ - The Z parameter.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/AddGuide/
     */
    AddGuide(sName: string, sFormula: GeometryFormulaType, sX: string, sY: string, sZ: string): boolean;

    /**
     * Adds a new path to the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/AddPath/
     */
    AddPath(): ApiPath | null;

    /**
     * Returns the adjustment value by its name from the current geometry.
     *
     * @param sName - The adjustment name.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetAdjValue/
     */
    GetAdjValue(sName: string): number | null;

    /**
     * Returns a type of the ApiGeometry class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetClassType/
     */
    GetClassType(): "geometry";

    /**
     * Returns a geometry path by its index.
     *
     * @param nIndex - The path index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetPath/
     */
    GetPath(nIndex: number): ApiPath;

    /**
     * Returns the number of paths in the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetPathCount/
     */
    GetPathCount(): number;

    /**
     * Returns all paths of the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetPaths/
     */
    GetPaths(): ApiPath[];

    /**
     * Returns the name of the preset shape if the current geometry is based on a preset.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/GetPreset/
     */
    GetPreset(): ShapeType;

    /**
     * Checks whether the current geometry is custom.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/IsCustom/
     */
    IsCustom(): boolean;

    /**
     * Sets the specified adjustment parameter for the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/SetAdjValue/
     */
    SetAdjValue(sName: string, nValue: number): void;

    /**
     * Sets the text rectangle for the current geometry.
     *
     * @param sLeft - The left guide name or value.
     * @param sTop - The top guide name or value.
     * @param sRight - The right guide name or value.
     * @param sBottom - The bottom guide name or value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGeometry/Methods/SetTextRect/
     */
    SetTextRect(sLeft: string, sTop: string, sRight: string, sBottom: string): boolean;
  }

  /**
   * Class representing a GoTo action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/
   */
  export interface ApiGoToAction {
    /**
     * Returns a type of the ApiGoToAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/GetClassType/
     */
    GetClassType(): "goToAction";

    /**
     * Gets desctination page index
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/GetPage/
     */
    GetPage(): number;

    /**
     * Gets goto destination rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets goto type
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/GetType/
     */
    GetType(): GoToType;

    /**
     * Gets goto destination rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/GetRect/
     */
    GetZoom(): Rect;

    /**
     * Sets desctination page index
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/SetPage/
     */
    SetPage(page: number): boolean;

    /**
     * Sets goto destination rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets goto type
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGoToAction/Methods/SetType/
     */
    SetType(type: GoToType): boolean;
  }

  /**
   * Class representing gradient stop.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGradientStop/
   */
  export interface ApiGradientStop {
    /**
     * Returns a type of the ApiGradientStop class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGradientStop/Methods/GetClassType/
     */
    GetClassType(): "gradientStop";
  }

  /**
   * Class representing a group of drawings.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGroup/
   */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiGroup class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiGroup/Methods/GetClassType/
     */
    GetClassType(): "group";

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;
  }

  /**
   * Class representing a hide-show action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/
   */
  export interface ApiHideShowFormsAction {
    /**
     * Returns a type of the ApiHideShowFormsAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/Methods/GetClassType/
     */
    GetClassType(): "hideShowAction";

    /**
     * Gets names of fields to hide
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/Methods/GetNames/
     */
    GetNames(): string[];

    /**
     * Checks if action hide fields
     *
     * @returns if false then show fields
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/Methods/IsHide/
     */
    IsHide(): boolean;

    /**
     * Sets action hide fields
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/Methods/SetHide/
     */
    SetHide(isHide: boolean): boolean;

    /**
     * Sets names of fields to hide
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHideShowFormsAction/Methods/GetNames/
     */
    SetNames(names: string[]): boolean;
  }

  /**
   * Class representing a highlight annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHighlightAnnotation/
   */
  export interface ApiHighlightAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiHighlightAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHighlightAnnotation/Methods/GetClassType/
     */
    GetClassType(): "highlightAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a Paragraph hyperlink.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/
   */
  export interface ApiHyperlink {
    /**
     * Returns a type of the ApiHyperlink class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/GetClassType/
     */
    GetClassType(): "hyperlink";

    /**
     * Returns the hyperlink element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns the hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/GetLinkedText/
     */
    GetLinkedText(): string;

    /**
     * Returns the screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/GetScreenTipText/
     */
    GetScreenTipText(): string;

    /**
     * Sets the hyperlink address.
     *
     * @param sLink - The hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/SetLink/
     */
    SetLink(sLink: string): boolean;

    /**
     * Sets the screen tip text of the hyperlink.
     *
     * @param sScreenTipText - The screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiHyperlink/Methods/SetScreenTipText/
     */
    SetScreenTipText(sScreenTipText: string): boolean;
  }

  /**
   * Class representing an image.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiImage/
   */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns the type of the ApiImage class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiImage/Methods/GetClassType/
     */
    GetClassType(): "image";

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;
  }

  /**
   * Class representing a ink annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiInkAnnotation/
   */
  export interface ApiInkAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiInkAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiInkAnnotation/Methods/GetClassType/
     */
    GetClassType(): "inkAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets ink path list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiInkAnnotation/Methods/GetPathList/
     */
    GetPathList(): PathList;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets ink path list.
     *
     * @param inkPaths - ink path list
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiInkAnnotation/Methods/SetPathList/
     */
    SetPathList(inkPaths: PathList): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /**
   * Class representing a js action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiJsAction/
   */
  export interface ApiJsAction {
    /**
     * Returns a type of the ApiJsAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiJsAction/Methods/GetClassType/
     */
    GetClassType(): "jsAction";

    /**
     * Gets action script
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiJsAction/Methods/GetScript/
     */
    GetScript(): string;

    /**
     * Sets action script.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiJsAction/Methods/SetScript/
     */
    SetScript(script: string): boolean;
  }

  /**
   * Class representing a line annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/
   */
  export interface ApiLineAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiLineAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/GetClassType/
     */
    GetClassType(): "lineAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets a line end point.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/GetEndPoint/
     */
    GetEndPoint(): Point;

    /**
     * Gets a line end style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/GetEndStyle/
     */
    GetEndStyle(): LineEndStyle;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets a line start point.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/GetStartPoint/
     */
    GetStartPoint(): Point;

    /**
     * Gets a line start style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/GetStartStyle/
     */
    GetStartStyle(): LineEndStyle;

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets a line end point.
     *
     * @param point - The end point of the line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/SetEndPoint/
     */
    SetEndPoint(point: Point): boolean;

    /**
     * Sets a line end style.
     *
     * @param style - The style of the line end endpoint.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/SetEndStyle/
     */
    SetEndStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets a line start point.
     *
     * @param point - The start point of the line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/SetStartPoint/
     */
    SetStartPoint(point: Point): boolean;

    /**
     * Sets a line start style.
     *
     * @param style - The style of the line start endpoint.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLineAnnotation/Methods/SetStartStyle/
     */
    SetStartStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a link annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLinkAnnotation/
   */
  export interface ApiLinkAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiLinkAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiLinkAnnotation/Methods/GetClassType/
     */
    GetClassType(): "linkAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a listbox field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiListboxField/
   */
  export interface ApiListboxField extends ApiBaseListField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     * @default index = this.GetOptions().lenght
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/AddOption/
     */
    AddOption(option: ListOption, index?: number): boolean;

    /**
     * Returns a type of the ApiListboxField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiListboxField/Methods/GetClassType/
     */
    GetClassType(): "listboxField";

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOption/
     */
    GetOption(index: number): ListOption;

    /**
     * Gets all options from list options.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetOptions/
     */
    GetOptions(): ListOption[];

    /**
     * Gets selected value indexes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/GetValueIndexes/
     */
    GetValueIndexes(): number[];

    /**
     * Checks if field can commit on selection change.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/IsCommitOnSelChange/
     */
    IsCommitOnSelChange(): boolean;

    /**
     * Checks if the field supports multiple selection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiListboxField/Methods/IsMultipleSelection/
     */
    IsMultipleSelection(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/MoveOption/
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/RemoveOption/
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetCommitOnSelChange/
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets whether multiple values can be selected.
     *
     * @param allowMultipleSelection - Specifies whether multiple values can be selected.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiListboxField/Methods/SetMultipleSelection/
     */
    SetMultipleSelection(allowMultipleSelection: boolean): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseListField/Methods/SetValueIndexes/
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /**
   * Class representing a mathematical equation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiMath/
   */
  export interface ApiMath {
    /**
     * Returns a type of the ApiMath class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiMath/Methods/GetClassType/
     */
    GetClassType(): "math";

    /**
     * Returns the inner text of the current math element.
     *
     * @param format - The format the text should be returned in.
     * @default format = "unicode"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiMath/Methods/GetText/
     */
    GetText(format?: "unicode" | "latex"): string;
  }

  /**
   * Class representing a named action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiNamedAction/
   */
  export interface ApiNamedAction {
    /**
     * Returns a type of the ApiNamedAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiNamedAction/Methods/GetClassType/
     */
    GetClassType(): "namedAction";

    /**
     * Gets a name of action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiNamedAction/Methods/GetName/
     */
    GetName(): NamedActionType;

    /**
     * Sets a name of action.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiNamedAction/Methods/SetName/
     */
    SetName(name: NamedActionType): boolean;
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /**
   * Class representing an Ole object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/
   */
  export interface ApiOleObject extends ApiDrawing {
    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;
  }

  /**
   * Class representing a document page.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/
   */
  export interface ApiPage {
    /**
     * Adds an available object to a page.
     *
     * @param object - The annotation, field, or drawing to add to the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/AddObject/
     */
    AddObject(object: FloatObject): FloatObject;

    /**
     * Gets all annots on page
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetAllAnnots/
     */
    GetAllAnnots(): ApiBaseAnnotation[];

    /**
     * Gets all drawing objects from the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetAllDrawings/
     */
    GetAllDrawings(): Drawing[];

    /**
     * Gets page widgets
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Returns a type of the ApiPage class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetClassType/
     */
    GetClassType(): "page";

    /**
     * Gets page index
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Gets page rotation angle
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Gets selected text on page
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetSelectedText/
     */
    GetSelectedText(): string;

    /**
     * Gets page selection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetSelection/
     */
    GetSelection(): PageSelection;

    /**
     * Gets page selection quads
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/GetSelectionQuads/
     */
    GetSelectionQuads(): Quad[];

    /**
     * Recognizes content on the page and returns an array of recognized objects.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/RecognizeContent/
     */
    RecognizeContent(): Drawing[];

    /**
     * Search words and returns their quads.
     *
     * @param props - The search options.
     * @returns for each result there is an array with its coordinates
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/Search/
     */
    Search(props: SearchProps): SearchResults;

    /**
     * Sets page rotation angle
     *
     * @param angle - The rotation angle in degrees. Must be a multiple of 90.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/SetRotation/
     */
    SetRotation(angle: number): boolean;

    /**
     * Sets page selection.
     *
     * @param selection - The selection to apply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPage/Methods/SetSelection/
     */
    SetSelection(selection: PageSelection | Rect | Quad | Quad[]): boolean;
  }

  /**
   * Class representing the paragraph properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/
   */
  export interface ApiParaPr {
    /**
     * Returns a type of the ApiParaPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetClassType/
     */
    GetClassType(): "paraPr";

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetTabs/
     */
    GetTabs(): TabStop[];

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetBullet/
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetJc/
     */
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;

    /**
     * Sets the outline level for the specified properties.
     *
     * @param lvl - The outline level. Possible values: 1-9. The 1The desired functionality is as follows: When
     *   inserting document A into document B using the merge document API during editing, the source of
     *   document A should be visible within document B. By clicking or hovering over the inserted
     *   content of document A in document B, information about the insertion of document A should be
     *   displayed in a pop-up/floating window, preserving the boundaries of document A. Document A
     *   should be able to be inserted between any two characters in document B. To set no outline level,
     *   use this method without a parameter.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetOutlineLvl/
     */
    SetOutlineLvl(lvl?: number | null): boolean;

    /**
     * Sets the spacing after the current paragraph. If the value of the isAfterAuto parameter is true,
     * then
     * any value of the nAfter is ignored. If isAfterAuto parameter is not specified, then it
     * will be interpreted as false.
     *
     * @param nAfter - The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isAfterAuto - The true value disables the spacing after the current paragraph.
     * @default isAfterAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingAfter/
     */
    SetSpacingAfter(nAfter: twips, isAfterAuto?: boolean): boolean;

    /**
     * Sets the spacing before the current paragraph. If the value of the isBeforeAuto parameter is true,
     * then
     * any value of the nBefore is ignored. If isBeforeAuto parameter is not specified, then
     * it will be interpreted as false.
     *
     * @param nBefore - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isBeforeAuto - The true value disables the spacing before the current paragraph.
     * @default isBeforeAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingBefore/
     */
    SetSpacingBefore(nBefore: twips, isBeforeAuto?: boolean): boolean;

    /**
     * Sets the paragraph line spacing. If the value of the sLineRule parameter is either
     * "atLeast" or "exact", then the value of nLine will be interpreted as twentieths of a point. If
     * the value of the sLineRule parameter is "auto", then the value of the
     * nLine parameter will be interpreted as 240ths of a line.
     *
     * @param nLine - The line spacing value measured either in twentieths of a point (1/1440 of an inch) or in 240ths
     *   of a line.
     * @param sLineRule - The rule that determines the measuring units of the line spacing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: twips | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies a sequence of custom tab stops which will be used for any tab characters in the current
     * paragraph.
     * **Warning**: The lengths of aPos array and aVal array **MUST BE** equal to each other.
     *
     * @param aPos - An array of the positions of custom tab stops with respect to the current page margins measured
     *   in twentieths of a point (1/1440 of an inch).
     * @param aVal - An array of the styles of custom tab stops, which determines the behavior of the tab stop and
     *   the alignment which will be applied to text entered at the current custom tab stop.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;
  }

  /**
   * Class representing a paragraph.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/
   */
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType"> {
    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @param nPos - The position where the current element will be added. If this value is not specified, then the
     *   element will be added at the end of the current paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/AddElement/
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /**
     * Adds a line break to the current position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/AddLineBreak/
     */
    AddLineBreak(): ApiRun;

    /**
     * Adds a tab stop to the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/AddTabStop/
     */
    AddTabStop(): ApiRun;

    /**
     * Adds some text to the current paragraph.
     *
     * @param text - The text that we want to insert into the current document element. It can be a string or an
     *   array of Unicode code points.
     * @param widths - An array of character widths (in millimeters). It should be the same length as the array of code
     *   points passed in the "text" parameter. When the widths are specified, the characters are added
     *   preserving these exact widths.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): ApiRun;

    /**
     * Creates a paragraph copy. Ingnore comments, footnote references, complex fields.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/Copy/
     */
    Copy(): ApiParagraph;

    /**
     * Deletes the current paragraph.
     *
     * @returns returns false if paragraph haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a type of the ApiParagraph class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetClassType/
     */
    GetClassType(): "paragraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns all font names from all elements inside the current paragraph.
     *
     * @returns The font names used for the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns an internal ID of the current paragraph.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the last Run with text in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetLastRunWithText/
     */
    GetLastRunWithText(): ApiRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetNext/
     */
    GetNext(): ApiParagraph | null;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetPrevious/
     */
    GetPrevious(): ApiParagraph;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/GetTabs/
     */
    GetTabs(): TabStop[];

    /**
     * Returns the paragraph text.
     *
     * @param options - Options for formatting the returned text.
     * @param options_Numbering - Defines if the resulting string will include numbering or not.
     * @param options_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any string can be
     *   used. The default separator is "\r".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string (does not apply to numbering). Any
     *   string can be used. The default symbol is "\t".
     * @default options_Numbering = false
     * @default options_Math = false
     * @default options_NewLineSeparator = '\r'
     * @default options_TabSymbol = '\t'
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the paragraph
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current paragraph (false).
     * @returns returns null if param paragraph is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;

    /**
     * Returns true if the paragraph has no content elements (only the paragraph end mark).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/IsEmpty/
     */
    IsEmpty(): boolean;

    /**
     * Returns the last element of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/Last/
     */
    Last(): ParagraphContent;

    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/Push/
     */
    Push(oElement: ParagraphContent): boolean;

    /**
     * Removes all the elements from the current paragraph.
     * <note>When all the elements are removed from the paragraph, a new empty run is automatically
     * created. If you want to add
     * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     * <note>If the element you remove is the last paragraph element (i.e. all the elements are removed
     * from the paragraph),
     * a new empty run is automatically created. If you want to add
     * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
     *
     * @param nPos - The element position which we want to remove from the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Selects the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of this paragraph are displayed bold.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiParagraph;

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetBullet/
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Specifies that any lowercase characters in this paragraph are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current paragraph are displayed capitalized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiParagraph;

    /**
     * Specifies that the contents of this paragraph are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current paragraph are displayed double struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current paragraph.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiParagraph;

    /**
     * Sets the font size to the characters of the current paragraph.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiParagraph;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current
     * paragraph.
     *
     * @param sColor - Available highlight color.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiParagraph;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current paragraph are displayed italicized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiParagraph;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetJc/
     */
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;

    /**
     * Sets the outline level for the specified properties.
     *
     * @param lvl - The outline level. Possible values: 1-9. The 1The desired functionality is as follows: When
     *   inserting document A into document B using the merge document API during editing, the source of
     *   document A should be visible within document B. By clicking or hovering over the inserted
     *   content of document A in document B, information about the insertion of document A should be
     *   displayed in a pop-up/floating window, preserving the boundaries of document A. Document A
     *   should be able to be inserted between any two characters in document B. To set no outline level,
     *   use this method without a parameter.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetOutlineLvl/
     */
    SetOutlineLvl(lvl?: number | null): boolean;

    /**
     * Specifies that all the small letter characters in this paragraph are formatted for display only as
     * their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current paragraph are displayed capitalized two points smaller
     *   or not.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiParagraph;

    /**
     * Sets the spacing after the current paragraph. If the value of the isAfterAuto parameter is true,
     * then
     * any value of the nAfter is ignored. If isAfterAuto parameter is not specified, then it
     * will be interpreted as false.
     *
     * @param nAfter - The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isAfterAuto - The true value disables the spacing after the current paragraph.
     * @default isAfterAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingAfter/
     */
    SetSpacingAfter(nAfter: twips, isAfterAuto?: boolean): boolean;

    /**
     * Sets the spacing before the current paragraph. If the value of the isBeforeAuto parameter is true,
     * then
     * any value of the nBefore is ignored. If isBeforeAuto parameter is not specified, then
     * it will be interpreted as false.
     *
     * @param nBefore - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isBeforeAuto - The true value disables the spacing before the current paragraph.
     * @default isBeforeAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingBefore/
     */
    SetSpacingBefore(nBefore: twips, isBeforeAuto?: boolean): boolean;

    /**
     * Sets the paragraph line spacing. If the value of the sLineRule parameter is either
     * "atLeast" or "exact", then the value of nLine will be interpreted as twentieths of a point. If
     * the value of the sLineRule parameter is "auto", then the value of the
     * nLine parameter will be interpreted as 240ths of a line.
     *
     * @param nLine - The line spacing value measured either in twentieths of a point (1/1440 of an inch) or in 240ths
     *   of a line.
     * @param sLineRule - The rule that determines the measuring units of the line spacing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: twips | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed with a single horizontal line through
     * the center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current paragraph are displayed struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiParagraph;

    /**
     * Specifies a sequence of custom tab stops which will be used for any tab characters in the current
     * paragraph.
     * **Warning**: The lengths of aPos array and aVal array **MUST BE** equal to each other.
     *
     * @param aPos - An array of the positions of custom tab stops with respect to the current page margins measured
     *   in twentieths of a point (1/1440 of an inch).
     * @param aVal - An array of the styles of custom tab stops, which determines the behavior of the tab stop and
     *   the alignment which will be applied to text entered at the current custom tab stop.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;

    /**
     * Replaces the paragraph content with the specified text.
     *
     * @param text - The text to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Sets the paragraph text properties.
     *
     * @param oTextPr - The paragraph text properties.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current paragraph are displayed underlined.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiParagraph;

    /**
     * Converts the ApiParagraph object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiParagraph/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /**
   * Class representing a path in geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/
   */
  export interface ApiPath {
    /**
     * Draws an arc from the current point using the specified width and height radii, start angle, and
     * sweep angle.
     *
     * @param wR - The width radius.
     * @param hR - The height radius.
     * @param stAng - The start angle.
     * @param swAng - The sweep angle.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/ArcTo/
     */
    ArcTo(wR: GeometryCoordinate, hR: GeometryCoordinate, stAng: GeometryCoordinate, swAng: GeometryCoordinate): void;

    /**
     * Closes the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/Close/
     */
    Close(): void;

    /**
     * Draws a cubic Bezier curve from the current point to the specified end point using two control
     * points.
     *
     * @param x1 - The X coordinate of the first control point.
     * @param y1 - The Y coordinate of the first control point.
     * @param x2 - The X coordinate of the second control point.
     * @param y2 - The Y coordinate of the second control point.
     * @param x3 - The X coordinate of the end point.
     * @param y3 - The Y coordinate of the end point.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/CubicBezTo/
     */
    CubicBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate, x3: GeometryCoordinate, y3: GeometryCoordinate): void;

    /**
     * Returns a specific path command by its index.
     *
     * @param nIndex - The path command index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetCommand/
     */
    GetCommand(nIndex: number): ApiPathCommand | null;

    /**
     * Returns the number of commands for the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetCommandCount/
     */
    GetCommandCount(): number;

    /**
     * Returns all commands of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetCommands/
     */
    GetCommands(): ApiPathCommand[];

    /**
     * Returns the fill type of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetFill/
     */
    GetFill(): PathFillType;

    /**
     * Returns the height of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns true if the current path is stroked, otherwise false.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetStroke/
     */
    GetStroke(): boolean;

    /**
     * Returns the width of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Draws a line from the current point to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/LineTo/
     */
    LineTo(x: GeometryCoordinate, y: GeometryCoordinate): void;

    /**
     * Moves the current path to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/MoveTo/
     */
    MoveTo(x: GeometryCoordinate, y: GeometryCoordinate): void;

    /**
     * Draws a quadratic Bezier curve from the current point to the specified end point using a control
     * point.
     *
     * @param x1 - The X coordinate of the control point.
     * @param y1 - The Y coordinate of the control point.
     * @param x2 - The X coordinate of the end point.
     * @param y2 - The Y coordinate of the end point.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/QuadBezTo/
     */
    QuadBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate): void;

    /**
     * Sets the fill type to the current path.
     *
     * @param sFill - The path fill type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/SetFill/
     */
    SetFill(sFill: PathFillType): void;

    /**
     * Sets the height to the current path.
     *
     * @param nHeight - The path height in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/SetHeight/
     */
    SetHeight(nHeight: number): void;

    /**
     * Sets whether the current path is stroked.
     *
     * @param bStroke - Specifies if the path is stroked (true) or not (false).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/SetStroke/
     */
    SetStroke(bStroke: boolean): void;

    /**
     * Sets the width to the current path.
     *
     * @param nWidth - The path width in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPath/Methods/SetWidth/
     */
    SetWidth(nWidth: number): void;
  }

  /**
   * Class representing a path command.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/
   */
  export interface ApiPathCommand {
    /**
     * Returns the height radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetHR/
     */
    GetHR(): string | null;

    /**
     * Returns the start angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetStartAngle/
     */
    GetStartAngle(): string | null;

    /**
     * Returns the sweep angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetSweepAngle/
     */
    GetSweepAngle(): string | null;

    /**
     * Returns the type of the current path command.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetType/
     */
    GetType(): PathCommandType;

    /**
     * Returns the width radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetWR/
     */
    GetWR(): string | null;

    /**
     * Returns the X coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetX/
     */
    GetX(): string | null;

    /**
     * Returns the X coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetX0/
     */
    GetX0(): string | null;

    /**
     * Returns the X coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetX1/
     */
    GetX1(): string | null;

    /**
     * Returns the X coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetX2/
     */
    GetX2(): string | null;

    /**
     * Returns the Y coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetY/
     */
    GetY(): string | null;

    /**
     * Returns the Y coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetY0/
     */
    GetY0(): string | null;

    /**
     * Returns the Y coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetY1/
     */
    GetY1(): string | null;

    /**
     * Returns the Y coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPathCommand/Methods/GetY2/
     */
    GetY2(): string | null;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPictureForm/
   */
  export interface ApiPictureForm extends ApiFormBase {
  }

  /**
   * Class representing a polyline annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/
   */
  export interface ApiPolyLineAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiPolyLineAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/GetClassType/
     */
    GetClassType(): "polyLineAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets a line end style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/GetEndStyle/
     */
    GetEndStyle(): LineEndStyle;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets a line start style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/GetStartStyle/
     */
    GetStartStyle(): LineEndStyle;

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Gets ink path list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/GetVertices/
     */
    GetVertices(): Path;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets a line end style.
     *
     * @param style - The style of the polyline end endpoint.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/SetEndStyle/
     */
    SetEndStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets a line start style.
     *
     * @param style - The style of the polyline start endpoint.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/SetStartStyle/
     */
    SetStartStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;

    /**
     * Sets vertices to polyline annot.
     *
     * @param path - polyline path
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolyLineAnnotation/Methods/SetVertices/
     */
    SetVertices(path: Path): boolean;
  }

  /**
   * Class representing a polygon annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolygonAnnotation/
   */
  export interface ApiPolygonAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiPolygonAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolygonAnnotation/Methods/GetClassType/
     */
    GetClassType(): "polygonAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Gets ink path list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolygonAnnotation/Methods/GetVertices/
     */
    GetVertices(): Path;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;

    /**
     * Sets vertices to polygon annot.
     *
     * @param path - polygon path
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPolygonAnnotation/Methods/SetVertices/
     */
    SetVertices(path: Path): boolean;
  }

  /**
   * Class representing a Preset Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPresetColor/
   */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiPresetColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiPresetColor/Methods/GetClassType/
     */
    GetClassType(): "presetColor";
  }

  /**
   * Class representing an RGB Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRGBColor/
   */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiRGBColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRGBColor/Methods/GetClassType/
     */
    GetClassType(): "rgbColor";
  }

  /**
   * Class representing a radiobutton field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRadiobuttonField/
   */
  export interface ApiRadiobuttonField extends Omit<ApiCheckboxField, "GetClassType"> {
    /**
     * Adds options to checkbox group.
     *
     * @param pageIndex - The page where the option will be added.
     * @param rect - The option rectangle.
     * @param exportValue - The option checked value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/AddOption/
     */
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;

    /**
     * Returns a type of the ApiRadiobuttonField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRadiobuttonField/Methods/GetClassType/
     */
    GetClassType(): "radiobuttonField";

    /**
     * Checks if field will check in unison.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRadiobuttonField/Methods/IsCheckInUnison/
     */
    IsCheckInUnison(): boolean;

    /**
     * Checks if the field can be toggled off.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/IsToggleToOff/
     */
    IsToggleToOff(): boolean;

    /**
     * Sets field in unison prop.
     *
     * @param checkInUnison - Specifies whether fields with the same export value are checked together.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRadiobuttonField/Methods/SetCheckInUnison/
     */
    SetCheckInUnison(checkInUnison: boolean): boolean;

    /**
     * Sets whether the checked state can be toggled off.
     *
     * @param allowToggleOff - Specifies whether the checked state can be toggled off.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiCheckboxField/Methods/SetToggleToOff/
     */
    SetToggleToOff(allowToggleOff: boolean): boolean;
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   */
  export interface ApiRange {
  }

  /** @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/ */
  export interface ApiRangeTextPr extends ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies that all the small letter characters in the text run are formatted for display only as
     * their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or
     *   not.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiTextPr;

    /**
     * Specifies the alignment which will be applied to the contents of the run in relation to the default
     * appearance of the run text:
     * **"baseline"** - the characters in the current text run will be aligned by the default text
     * baseline.
     * **"subscript"** - the characters in the current text run will be aligned below the default text
     * baseline.
     * **"superscript"** - the characters in the current text run will be aligned above the default text
     * baseline.
     *
     * @param sType - The vertical alignment type applied to the text contents.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /**
   * Class representing a redact annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRedactAnnotation/
   */
  export interface ApiRedactAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiRedactAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRedactAnnotation/Methods/GetClassType/
     */
    GetClassType(): "redactAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a reset form action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/
   */
  export interface ApiResetFormsAction {
    /**
     * Returns a type of the ApiResetFormsAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/Methods/GetClassType/
     */
    GetClassType(): "resetFormsAction";

    /**
     * Gets names of fields to reset
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/Methods/GetNames/
     */
    GetNames(): string[];

    /**
     * Will all fields be reset except the fields whose names are specified
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/Methods/IsAllExcept/
     */
    IsAllExcept(): boolean;

    /**
     * Sets all fields be reset except the fields whose names are specified
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/Methods/SetAllExcept/
     */
    SetAllExcept(isAllExcept: boolean): boolean;

    /**
     * Sets names of fields to reset
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiResetFormsAction/Methods/GetNames/
     */
    SetNames(names: string[]): boolean;
  }

  /**
   * Class representing a rich content.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/
   */
  export interface ApiRichContent {
    /**
     * Adds a rich paragraph using its position in rich content.
     *
     * @param pos - The position where the rich paragraph will be added.
     * @param richPara - The rich paragraph which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/AddElement/
     */
    AddElement(pos: number, richPara: ApiRichParagraph): boolean;

    /**
     * Returns a type of the ApiRichContent class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/GetClassType/
     */
    GetClassType(): "richContent";

    /**
     * Returns an array of rich paragraphs from the current rich content object.
     *
     * @param getCopies - Specifies if the copies of the document elements will be returned or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/GetContent/
     */
    GetContent(getCopies: boolean): ApiRichParagraph[];

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiRichParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRichRun;

    /**
     * Returns an rich paragraph by its position in the content.
     *
     * @param pos - The element position that will be taken from the content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/GetElement/
     */
    GetElement(pos: number): ApiRichParagraph;

    /**
     * Pushes a rich paragraph to a rich content.
     *
     * @param richPara - The rich paragraph which will be pushed to the rich content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichContent/Methods/Push/
     */
    Push(richPara: ApiRichParagraph): boolean;
  }

  /**
   * Class representing the rich paragraph properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParaPr/
   */
  export interface ApiRichParaPr {
    /**
     * Returns a type of the ApiRichParaPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParaPr/Methods/GetClassType/
     */
    GetClassType(): "richParaPr";
  }

  /**
   * Class representing a rich paragraph.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/
   */
  export interface ApiRichParagraph extends Omit<ApiRichParaPr, "GetClassType"> {
    /**
     * Adds an element to the current paragraph.
     *
     * @param richRun - The element which will be added at the current position.
     * @param pos - The position where the current element will be added. If this value is not specified, then the
     *   element will be added at the end of the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/AddElement/
     */
    AddElement(richRun: ApiRichRun, pos?: number): boolean;

    /**
     * Adds some text to the current paragraph.
     *
     * @param text - The text that we want to insert into the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/AddText/
     */
    AddText(text: string): ApiRichRun;

    /**
     * Creates a paragraph copy.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/Copy/
     */
    Copy(): ApiRichParagraph;

    /**
     * Returns a type of the ApiRichParagraph class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/GetClassType/
     */
    GetClassType(): "richParagraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param pos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/GetElement/
     */
    GetElement(pos: number): ApiRichRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/GetNext/
     */
    GetNext(): ApiRichParagraph;

    /**
     * Returns the paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/GetParaPr/
     */
    GetParaPr(): ApiRichParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/GetPrevious/
     */
    GetPrevious(): ApiRichParagraph;

    /**
     * Returns the last element of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/Last/
     */
    Last(): ApiRichRun;

    /**
     * Adds an element to the current paragraph.
     *
     * @param richRun - The element to add at the end of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/Push/
     */
    Push(richRun: ParagraphContent): boolean;

    /**
     * Sets the paragraph properties.
     *
     * @param paraPr - The paragraph properties to apply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/SetParaPr/
     */
    SetParaPr(paraPr: ApiRichParaPr): boolean;

    /**
     * Specifies the reading order for the current paragraph.
     * Possible values are:
     * **null** - use the standart direction parameter;
     * **"ltr"** - left-to-right text direction;
     * **"rtl"** - right-to-left text direction.
     *
     * @param readingOrder - The reading order.
     * @returns Returns the current paragraph itself (ApiRichParagraph).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichParagraph/Methods/SetReadingOrder/
     */
    SetReadingOrder(readingOrder?: ReadingOrder): ApiRichParagraph;
  }

  /**
   * Class representing a small text block called 'run'.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/
   */
  export interface ApiRichRun extends Omit<ApiRichTextPr, "GetClassType"> {
    /**
     * Creates a copy of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/Methods/Copy/
     */
    Copy(): ApiRichRun;

    /**
     * Returns a type of the ApiRichRun class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/Methods/GetClassType/
     */
    GetClassType(): "richRun";

    /**
     * Returns a parent paragraph of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiRichParagraph;

    /**
     * Returns the text properties of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/Methods/GetTextPr/
     */
    GetTextPr(): ApiRichTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param textPr - The text properties that will be set to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichRun/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiRichTextPr): ApiRichTextPr;
  }

  /**
   * Class representing the rich text properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichTextPr/
   */
  export interface ApiRichTextPr {
    /**
     * Returns a type of the ApiRichTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRichTextPr/Methods/GetClassType/
     */
    GetClassType(): "richTextPr";
  }

  /**
   * Class representing a small text block called 'run'.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/
   */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType"> {
    /**
     * Adds a line break to the current run position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/AddLineBreak/
     */
    AddLineBreak(): boolean;

    /**
     * Adds a tab stop to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/AddTabStop/
     */
    AddTabStop(): boolean;

    /**
     * Adds some text to the current run.
     *
     * @param text - The text which will be added to the current run. It can be a string or an array of Unicode code
     *   points.
     * @param widths - An array of character widths (in millimeters). It should be the same length as the array of code
     *   points passed in the "text" parameter. When the widths are specified, the characters are added
     *   preserving these exact widths.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): boolean;

    /**
     * Clears the content from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Creates a copy of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/Copy/
     */
    Copy(): ApiRun;

    /**
     * Deletes the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiRun class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/GetClassType/
     */
    GetClassType(): "run";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Returns all font names from all elements inside the current run.
     *
     * @returns The font names used for the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Returns the text properties of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Removes all the elements from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies that all the small letter characters in the text run are formatted for display only as
     * their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or
     *   not.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param oTextPr - The text properties that will be set to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiRun/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiTextPr;

    /**
     * Specifies the alignment which will be applied to the contents of the run in relation to the default
     * appearance of the run text:
     * **"baseline"** - the characters in the current text run will be aligned by the default text
     * baseline.
     * **"subscript"** - the characters in the current text run will be aligned below the default text
     * baseline.
     * **"superscript"** - the characters in the current text run will be aligned above the default text
     * baseline.
     *
     * @param sType - The vertical alignment type applied to the text contents.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /**
   * Class representing a Scheme Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSchemeColor/
   */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiSchemeColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSchemeColor/Methods/GetClassType/
     */
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /**
   * Class representing a shadow.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShadow/
   */
  export interface ApiShadow {
    /**
     * Returns a type of the ApiShadow class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShadow/Methods/GetClassType/
     */
    GetClassType(): "shadow";

    /**
     * Returns the settings of the current shadow.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShadow/Methods/GetSettings/
     */
    GetSettings(): ShadowSettings;
  }

  /**
   * Class representing a shape.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/
   */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns the type of the ApiShape class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetClassType/
     */
    GetClassType(): "shape";

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetDocContent/
     */
    GetDocContent(): ApiDocumentContent;

    /**
     * Gets the fill properties from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Returns the geometry object from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetGeometry/
     */
    GetGeometry(): ApiGeometry;

    /**
     * Gets the outline properties from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Returns the text autofit type of the current shape.
     *
     * @returns The text autofit type.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetTextFit/
     */
    GetTextFit(): TextFitType;

    /**
     * Gets the vertical alignment from the shape content where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/GetVerticalTextAlign/
     */
    GetVerticalTextAlign(): VerticalTextAlign;

    /**
     * Sets the fill properties to the current shape.
     *
     * @param fill - The fill type used to fill the shape.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetFill/
     */
    SetFill(fill: ApiFill): boolean;

    /**
     * Sets a custom geometry for the current shape.
     *
     * @param geometry - The geometry to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetGeometry/
     */
    SetGeometry(geometry: ApiGeometry): boolean;

    /**
     * Sets the outline properties to the current shape.
     *
     * @param stroke - The stroke used to create the shape outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetLine/
     */
    SetLine(stroke: ApiStroke): boolean;

    /**
     * Sets the text paddings to the current shape.
     *
     * @param nLeft - Left padding.
     * @param nTop - Top padding.
     * @param nRight - Right padding.
     * @param nBottom - Bottom padding.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetPaddings/
     */
    SetPaddings(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;

    /**
     * Sets the text autofit type to the current shape.
     *
     * @param fitType - The text autofit type.
     * @returns returns false if the type is invalid or the shape doesn't exist.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetTextFit/
     */
    SetTextFit(fitType: TextFitType): boolean;

    /**
     * Sets the vertical alignment to the shape content where a paragraph or text runs can be inserted.
     *
     * @param verticalAlign - The type of the vertical alignment for the shape inner contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiShape/Methods/SetVerticalTextAlign/
     */
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /**
   * Class representing a signature field.
   *
   * @since 9.5.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSignatureField/
   */
  export interface ApiSignatureField extends Omit<ApiButtonField, "GetClassType"> {
    /**
     * Returns a type of the ApiSignatureField class.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSignatureField/Methods/GetClassType/
     */
    GetClassType(): "signatureField";

    /**
     * Sets image for all button field widgets
     *
     * @param imageUrl - The URL of the image to set for the button.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiButtonField/Methods/SetValue/
     */
    SetValue(imageUrl: string): boolean;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSignatureForm/
   */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /**
   * Class representing a group of drawings.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSmartArt/
   */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiSmartArt class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSmartArt/Methods/GetClassType/
     */
    GetClassType(): "smartArt";

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;
  }

  /**
   * Class representing a square annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSquareAnnotation/
   */
  export interface ApiSquareAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiSquareAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSquareAnnotation/Methods/GetClassType/
     */
    GetClassType(): "squareAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets annotation rect difference.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSquareAnnotation/Methods/GetRectDiff/
     */
    GetRectDiff(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiSquareAnnotation/Methods/SetRectDiff/
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a stamp annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/
   */
  export interface ApiStampAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiStampAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/GetClassType/
     */
    GetClassType(): "stampAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets stamp rotate.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/GetRotation/
     */
    GetRotation(): Degree;

    /**
     * Gets stamp size scale.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/GetScale/
     */
    GetScale(): number;

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets stamp type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/GetType/
     */
    GetType(): StampType;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets stamp rotate.
     *
     * @param angle - The rotation angle in degrees.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/SetRotation/
     */
    SetRotation(angle: Degree): boolean;

    /**
     * Sets stamp size scale.
     *
     * @param scale - size scale
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStampAnnotation/Methods/SetScale/
     */
    SetScale(scale: number): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a strikeout annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStrikeoutAnnotation/
   */
  export interface ApiStrikeoutAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiStrikeoutAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStrikeoutAnnotation/Methods/GetClassType/
     */
    GetClassType(): "strikeoutAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a stroke.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/
   */
  export interface ApiStroke {
    /**
     * Returns the beginning arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetBeginArrow/
     */
    GetBeginArrow(): object | null;

    /**
     * Returns a type of the ApiStroke class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetClassType/
     */
    GetClassType(): "stroke";

    /**
     * Gets the dash type of the stroke.
     *
     * @returns returns dash type ("solid", "dash", etc.) or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetDashType/
     */
    GetDashType(): DashType | null;

    /**
     * Returns the ending arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetEndArrow/
     */
    GetEndArrow(): object | null;

    /**
     * Gets the fill (color) of the stroke.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Gets the width of the stroke in English Metric Units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/GetWidth/
     */
    GetWidth(): EMU | null;

    /**
     * Sets the beginning arrow of the stroke.
     *
     * @param type - The type of the beginning arrow.
     * @param width - The width of the beginning arrow.
     * @param length - The length of the beginning arrow.
     * @default width = "medium"
     * @default length = "medium"
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/SetBeginArrow/
     */
    SetBeginArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;

    /**
     * Sets the ending arrow of the stroke.
     *
     * @param type - The type of the ending arrow.
     * @param width - The width of the ending arrow.
     * @param length - The length of the ending arrow.
     * @default width = "medium"
     * @default length = "medium"
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiStroke/Methods/SetEndArrow/
     */
    SetEndArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /**
   * Class representing a table.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/
   */
  export interface ApiTable extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Adds a new column to the end of the current table.
     *
     * @param referenceCell - The cell used as an insertion reference.
     * @param before - Add a new column before or after the specified cell. If no cell is specified, then this
     *   parameter will be ignored.
     * @default before = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/AddColumn/
     */
    AddColumn(referenceCell?: ApiTableCell, before?: boolean): boolean;

    /**
     * Adds the new columns to the current table.
     *
     * @param oCell - The cell after which the new columns will be added. If not specified, the new columns will be
     *   added at the end of the table.
     * @param nCount - Count of columns to be added.
     * @param isBefore - Adds the new columns before (true) or after (false) the specified cell.
     * @default isBefore = false
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/AddColumns/
     */
    AddColumns(nCount: number): ApiTable;
    AddColumns(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;

    /**
     * Adds a paragraph using its position in the cell.
     *
     * @param oCell - The cell where the specified element will be added.
     * @param nPos - The position in the cell where the specified element will be added.
     * @param oElement - The document element which will be added at the current position.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/AddElement/
     */
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new row to the current table.
     *
     * @param referenceCell - The cell used as an insertion reference.
     * @param isBefore - Adds a new row before or after the specified cell. If no cell is specified, then this parameter
     *   will be ignored.
     * @default isBefore = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/AddRow/
     */
    AddRow(referenceCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;

    /**
     * Adds the new rows to the current table.
     *
     * @param oCell - The cell after which the new rows will be added. If not specified, the new rows will be added at
     *   the end of the table.
     * @param nCount - Count of rows to be added.
     * @param isBefore - Adds the new rows before (true) or after (false) the specified cell.
     * @default isBefore = false
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/AddRows/
     */
    AddRows(nCount: number): ApiTable;
    AddRows(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;

    /**
     * Returns a cell by its position.
     *
     * @param rowIndex - The row index in the current table.
     * @param cellIndex - The cell index in the specified row.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetCell/
     */
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell;

    /**
     * Returns the type of the ApiTable object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetClassType/
     */
    GetClassType(): "table";

    /**
     * Returns the width of the specified column (by index) of the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetColumnWidth/
     */
    GetColumnWidth(columnIndex: number): EMU | null;

    /**
     * Returns the type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetClassType/
     */
    GetParentPage(): ApiPage;

    /**
     * Gets the x position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosX/
     */
    GetPosX(): EMU;

    /**
     * Gets the y position of the drawing on the page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/GetPosY/
     */
    GetPosY(): EMU;

    /**
     * Returns a row by its index.
     *
     * @param rowIndex - The zero-based row index in the table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetRow/
     */
    GetRow(rowIndex: number): ApiTableRow;

    /**
     * Returns a number of rows in the current table.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetRowsCount/
     */
    GetRowsCount(): number;

    /**
     * Returns the selected cells of the current table.
     *
     * @returns An array of the currently selected cells (empty if there is no cell selection).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetSelectedCells/
     */
    GetSelectedCells(): ApiTableCell[];

    /**
     * Returns all cells from the columns that contain the currently selected cells.
     * This method identifies which columns contain selected cells and then returns all cells
     * in those columns, not just the selected cells themselves.
     *
     * @returns An array of all cells from the columns that contain selected cells.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetSelectedColumnsCells/
     */
    GetSelectedColumnsCells(): ApiTableCell[];

    /**
     * Returns the rows that contain the currently selected cells of the current table.
     *
     * @returns An array of the rows that contain selected cells (empty if there is no cell selection).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetSelectedRows/
     */
    GetSelectedRows(): ApiTableRow[];

    /**
     * Returns the table description.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetTableDescription/
     */
    GetTableDescription(): string;

    /**
     * Gets table look properties
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetTableLook/
     */
    GetTableLook(): TableLook;

    /**
     * Returns the table title.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/GetTableTitle/
     */
    GetTableTitle(): string;

    /**
     * Merges an array of cells. If merge is successful, it will return merged cell, otherwise "null".
     * **Warning**: The number of cells in any row and the number of rows in the current table may be
     * changed.
     *
     * @param cells - The cells to merge.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/MergeCells/
     */
    MergeCells(cells: ApiTableCell[]): ApiTableCell;

    /**
     * Removes a table column with the specified cell.
     *
     * @param columnCell - A cell from the column to remove.
     * @returns result of deletion
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/RemoveColumn/
     */
    RemoveColumn(columnCell: ApiTableCell): boolean;

    /**
     * Removes a table row with the specified cell.
     *
     * @param rowCell - A cell from the row to remove.
     * @returns result of deletion
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/RemoveRow/
     */
    RemoveRow(rowCell: ApiTableCell): boolean;

    /**
     * Selects a range of cells in the current table.
     *
     * @param startCellIndex - The start cell index within the start row.
     * @param startRowIndex - The start row index.
     * @param endCellIndex - The end cell index within the end row.
     * @param endRowIndex - The end row index.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SelectRange/
     */
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;

    /**
     * Sets the background color for all cells in the current table.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the width of the specified column in the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @param width - The column width measured in English measure units.
     * @returns Returns the actual column width set (in EMU), or null if the column index is invalid.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetColumnWidth/
     */
    SetColumnWidth(columnIndex: number, width: EMU): EMU | null;

    /**
     * Sets the total height of the current table, distributing it evenly among the table rows.
     * The value is applied as a minimum height for each row, so a row can be taller if its content
     * requires more space.
     *
     * @param nValue - The table height in English measure units.
     * @returns Returns the requested height (in EMU), or null if the table has no rows.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetHeight/
     */
    SetHeight(nValue: EMU): EMU | null;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosX/
     */
    SetPosX(posX: EMU): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosY/
     */
    SetPosY(posY: EMU): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(posX: EMU, posY: EMU): boolean;

    /**
     * Specifies the shading which shall be applied to the extents of the current table.
     *
     * @param shadingType - The shading type or fill to apply.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetShd/
     */
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;

    /**
     * Sets the table size.
     *
     * @param width - The table width measured in English measure units.
     * @param height - The table height measured in English measure units.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetSize/
     */
    SetSize(width: EMU, height: EMU): boolean;

    /**
     * Sets the style for the current table.
     *
     * @param oStyle - The table style to apply.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetTableDescription/
     */
    SetTableDescription(sDescr: string): boolean;

    /**
     * Specifies the components of the conditional formatting of the referenced table style (if one exists)
     * which shall be applied to the set of table rows with the current table-level property exceptions. A
     * table style
     * can specify up to six different optional conditional formats [Example: Different formatting for
     * first column],
     * which then can be applied or omitted from individual table rows in the parent table.
     *
     * The default setting is to apply the row and column banding formatting, but not the first row, last
     * row, first
     * column, or last column formatting.
     *
     * @param isFirstColumn - Specifies that the first column conditional formatting shall be applied to the table.
     * @param isFirstRow - Specifies that the first row conditional formatting shall be applied to the table.
     * @param isLastColumn - Specifies that the last column conditional formatting shall be applied to the table.
     * @param isLastRow - Specifies that the last row conditional formatting shall be applied to the table.
     * @param isHorBand - Specifies that the horizontal banding conditional formatting shall not be applied to the table.
     * @param isVerBand - Specifies that the vertical banding conditional formatting shall not be applied to the table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetTableLook/
     */
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): boolean;

    /**
     * Sets the table title.
     *
     * @param sTitle - The table title to be set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTable/Methods/SetTableTitle/
     */
    SetTableTitle(sTitle: string): boolean;
  }

  /**
   * Class representing a table cell.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/
   */
  export interface ApiTableCell {
    /**
     * Appends text to the end of the cell content.
     *
     * @param text - The text to append.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Returns the background color of the current table cell.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor | null;

    /**
     * Returns the type of the ApiTableCell class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetClassType/
     */
    GetClassType(): "tableCell";

    /**
     * Returns the current cell content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the next cell if exists.
     *
     * @returns returns null if cell is last.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetNext/
     */
    GetNext(): ApiTableCell | null;

    /**
     * Returns a parent row of the current cell.
     *
     * @returns returns null if parent row doesn't exist.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetParentRow/
     */
    GetParentRow(): ApiTableRow | null;

    /**
     * Returns a parent table of the current cell.
     *
     * @returns returns null if parent table doesn't exist.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous cell if exists.
     *
     * @returns returns null is cell is first.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetPrevious/
     */
    GetPrevious(): ApiTableCell | null;

    /**
     * Returns an index of the parent row.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetRowIndex/
     */
    GetRowIndex(): number | null;

    /**
     * Returns the inner text of the current table cell.
     *
     * @param pr - Options for formatting the returned text.
     * @param pr_Numbering - Defines if the resulting string will include numbering or not.
     * @param pr_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param pr_TableCellSeparator - Defines how the table cell separator will be specified in the resulting string.
     * @param pr_TableRowSeparator - Defines how the table row separator will be specified in the resulting string.
     * @param pr_ParaSeparator - Defines how the paragraph separator will be specified in the resulting string.
     * @param pr_TabSymbol - Defines how the tab will be specified in the resulting string.
     * @param pr_NewLineSeparator - Defines how the line separator will be specified in the resulting string.
     * @default pr_Numbering = true
     * @default pr_Math = true
     * @default pr_TableCellSeparator = '\t'
     * @default pr_TableRowSeparator = '\r\n'
     * @default pr_ParaSeparator = '\r\n'
     * @default pr_TabSymbol = '\t'
     * @default pr_NewLineSeparator = '\r'
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/GetText/
     */
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;

    /**
     * Selects the current table cell.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the background color of the current cell.
     *
     * @param color - If not passed, the background color will be cleared (see arguments below for RGB triplet form).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border which shall be displayed at the bottom of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellBorderBottom/
     */
    SetCellBorderBottom(borderWidth: mm, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the left of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellBorderLeft/
     */
    SetCellBorderLeft(borderWidth: mm, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the right of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellBorderRight/
     */
    SetCellBorderRight(borderWidth: mm, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the top of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellBorderTop/
     */
    SetCellBorderTop(borderWidth: mm, fill: ApiFill): boolean;

    /**
     * Specifies an amount of space which shall be left between the bottom extent of the cell contents and
     * the border
     * of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell bottom margin with specified value for the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellMarginBottom/
     */
    SetCellMarginBottom(margin: twips): boolean;

    /**
     * Specifies an amount of space which shall be left between the left extent of the current cell
     * contents and the
     * left edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell left margin with specified value for the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellMarginLeft/
     */
    SetCellMarginLeft(margin: twips): boolean;

    /**
     * Specifies an amount of space which shall be left between the right extent of the current cell
     * contents and the
     * right edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell right margin with specified value for the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellMarginRight/
     */
    SetCellMarginRight(margin: twips): boolean;

    /**
     * Specifies an amount of space which shall be left between the top extent of the current cell contents
     * and the
     * top edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell top margin with specified value for the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetCellMarginTop/
     */
    SetCellMarginTop(margin: twips): boolean;

    /**
     * Sets the background color to all cells in the column containing the current cell.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetColumnBackgroundColor/
     */
    SetColumnBackgroundColor(color?: ApiColor): boolean;

    /**
     * Specifies the shading which shall be applied to the extents of the current table cell.
     *
     * @param shadingType - The shading type or fill to apply.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetShd/
     */
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;

    /**
     * Replaces all content of the current table cell with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Specifies the direction of the text flow for the current table cell.
     *
     * @param textDirection - The text flow direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetTextDirection/
     */
    SetTextDirection(textDirection: TextFlowDirection): boolean;

    /**
     * Specifies the vertical alignment for text within the current table cell.
     *
     * @param verticalAlign - The vertical alignment type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetVerticalAlign/
     */
    SetVerticalAlign(verticalAlign: VerticalTextAlign): boolean;

    /**
     * Specifies the preferred width for this cell.
     *
     * @param sType - The type of the width value.
     * @param nValue - The table width value measured in positive integers.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableCell/Methods/SetWidth/
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
  }

  /**
   * Class representing a table row.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/
   */
  export interface ApiTableRow extends ApiTableRowPr {
    /**
     * Returns a cell by its position in the current row.
     *
     * @param cellIndex - The zero-based cell index in the table row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetCell/
     */
    GetCell(cellIndex: number): ApiTableCell;

    /**
     * Returns a number of cells in the current row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetCellsCount/
     */
    GetCellsCount(): number;

    /**
     * Returns the type of the ApiTableRow class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetClassType/
     */
    GetClassType(): "tableRow";

    /**
     * Gets the height from the current table row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Returns the next row if exists.
     *
     * @returns returns null if row is last.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetNext/
     */
    GetNext(): ApiTableRow | null;

    /**
     * Returns the parent table of the current row.
     *
     * @returns returns null if parent table doesn't exist.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous row if exists.
     *
     * @returns returns null if row is first.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/GetPrevious/
     */
    GetPrevious(): ApiTableRow | null;

    /**
     * Sets the height to the current table row.
     *
     * @param height - The row height in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTableRow/Methods/SetHeight/
     */
    SetHeight(height: EMU): boolean;
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
  }

  /**
   * Class representing a set of formatting properties which shall be conditionally applied to the parts
   * of a table
   * which match the requirement specified on the `Type`.
   */
  export interface ApiTableStylePr {
  }

  /**
   * Class representing a text annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextAnnotation/
   */
  export interface ApiTextAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/AddReply/
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /**
     * Removes annotation from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets annotation author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Gets annotation border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Gets annotation border effect intensity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectIntensity/
     */
    GetBorderEffectIntensity(): number;

    /**
     * Gets annotation border effect style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderEffectStyle/
     */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /**
     * Gets annotation border style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderStyle/
     */
    GetBorderStyle(): AnnotBorderStyle;

    /**
     * Gets annotation border width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetBorderWidth/
     */
    GetBorderWidth(): pt;

    /**
     * Returns a type of the ApiTextAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextAnnotation/Methods/GetClassType/
     */
    GetClassType(): "textAnnot";

    /**
     * Gets annotation contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetContents/
     */
    GetContents(): string;

    /**
     * Gets annotation creation date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetCreationDate/
     */
    GetCreationDate(): number;

    /**
     * Gets annotation dash pattern.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDashPattern/
     */
    GetDashPattern(): number[];

    /**
     * Gets annotation display type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetDisplay/
     */
    GetDisplay(): DisplayType;

    /**
     * Gets annotation fill color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor;

    /**
     * Gets icon type of this annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextAnnotation/Methods/GetIconType/
     */
    GetIconType(): TextIconType;

    /**
     * Gets annotation last modification date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetModDate/
     */
    GetModDate(): number;

    /**
     * Gets annotation opacity.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetOpacity/
     */
    GetOpacity(): string;

    /**
     * Gets annotation position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetPosition/
     */
    GetPosition(): Point;

    /**
     * Gets annotation rect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetRect/
     */
    GetRect(): Rect;

    /**
     * Gets replies on this annot.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetReplies/
     */
    GetReplies(): ApiTextAnnotation[];

    /**
     * Gets annotation subject.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Gets annotation unique name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/GetUniqueName/
     */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetAuthorName/
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderColor/
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectIntensity/
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderEffectStyle/
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderStyle/
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetBorderWidth/
     */
    SetBorderWidth(width: pt): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetContents/
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetCreationDate/
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDashPattern/
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetDisplay/
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets icon type for this annotation.
     *
     * @param iconType - The icon type for the text annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextAnnotation/Methods/SetIconType/
     */
    SetIconType(iconType: TextIconType): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetModDate/
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetOpacity/
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetPosition/
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetRect/
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetSubject/
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseAnnotation/Methods/SetUniqueName/
     */
    SetUniqueName(name: string): boolean;
  }

  /**
   * Class representing a text field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/
   */
  export interface ApiTextField extends ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/AddWidget/
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /**
     * Clears format of field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/ClearFormat/
     */
    ClearFormat(): boolean;

    /**
     * Removes field from document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetAllWidgets/
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Gets the text field character limit.
     * <note> Char limit 0 means field doesn't have char limit
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/GetCharLimit/
     */
    GetCharLimit(): number;

    /**
     * Returns a type of the ApiTextField class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/GetClassType/
     */
    GetClassType(): "textField";

    /**
     * Gets formatted value of a field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/GetFormattedValue/
     */
    GetFormattedValue(): string;

    /**
     * Gets field full name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Gets field partial name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetPartialName/
     */
    GetPartialName(): string;

    /**
     * Gets text field placeholder.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/GetPlaceholder/
     */
    GetPlaceholder(): string;

    /**
     * Gets text widget regular validate expression.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/GetRegularExp/
     */
    GetRegularExp(): boolean;

    /**
     * Gets field value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/GetValue/
     */
    GetValue(): string | string[];

    /**
     * Checks if the text field uses comb formatting.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/IsComb/
     */
    IsComb(): boolean;

    /**
     * Checks if text field is multiline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/IsMultiline/
     */
    IsMultiline(): boolean;

    /**
     * Checks if field is read only
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsReadOnly/
     */
    IsReadOnly(): boolean;

    /**
     * Checks if field is required
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if text field can scroll long text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/IsScrollLongText/
     */
    IsScrollLongText(): boolean;

    /**
     * Sets the text field character limit.
     * <note> Character limit 0 means the field doesn't have a character limit.
     *
     * @param charLimit - The maximum number of characters allowed in the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetCharLimit/
     */
    SetCharLimit(charLimit: number): boolean;

    /**
     * Sets whether the text field uses comb formatting.
     * <note>The character limit must be greater than 0.</note>
     *
     * @param comb - Specifies whether comb formatting is enabled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetComb/
     */
    SetComb(comb: boolean): boolean;

    /**
     * Sets date format for field.
     *
     * @param format - date format (e.g. "dd.mm.yyyy")
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetDateFormat/
     */
    SetDateFormat(format: string): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetFullName/
     */
    SetFullName(name: string): boolean;

    /**
     * Sets the input mask for entered text.
     *
     * @param inputMask - The input mask (e.g. "(999)999-9999").
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetMask/
     */
    SetMask(inputMask: string): boolean;

    /**
     * Sets text field multiline prop.
     *
     * @param multiline - will the field be multiline
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetMultiline/
     */
    SetMultiline(multiline: boolean): boolean;

    /**
     * Sets number format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     * @param negativeStyle - The negative number display style.
     * @param currency - The currency symbol.
     * @param currencyPrepend - If true, places the currency symbol before the number (e.g., $1,234.56); if false, places it
     *   after (e.g., 1,234.56$).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetNumberFormat/
     */
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetPartialName/
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets percentage format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetPercentageFormat/
     */
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;

    /**
     * Sets text field placeholder.
     *
     * @param sPlaceholder - field placeholder
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetPlaceholder/
     */
    SetPlaceholder(sPlaceholder: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetReadOnly/
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets regular expression validate string for field.
     *
     * @param regularExpression - The validation regular expression (e.g. "\\S+@\\S+\\.\\S+")
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetRegularExp/
     */
    SetRegularExp(regularExpression: string): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetRequired/
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets whether the text field can scroll long text.
     *
     * @param allowScroll - Specifies whether long text can be scrolled.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetScrollLongText/
     */
    SetScrollLongText(allowScroll: boolean): boolean;

    /**
     * Sets special format for field.
     *
     * @param format - the formatting style to apply to the value
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetSpecialFormat/
     */
    SetSpecialFormat(format: PsfFormat): boolean;

    /**
     * Sets time format for field.
     *
     * @param format - available time format
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetTimeFormat/
     */
    SetTimeFormat(format: TimeFormat): boolean;

    /**
     * Sets validate range for field.
     * <note> Can only be applied to fields with a percentage or number format. </note>
     *
     * @param greaterThan - If true, enables minimum value validation using `greaterThanValue`.
     * @param greaterThanValue - The minimum allowed value.
     * @param lessThan - If true, enables maximum value validation using `lessThanValue`.
     * @param lessThanValue - The maximum allowed value.
     * @default greaterThan = false
     * @default lessThan = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextField/Methods/SetValidateRange/
     */
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseField/Methods/SetValue/
     */
    SetValue(value: string): boolean;
  }

  /**
   * Class representing a document text field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextForm/
   */
  export interface ApiTextForm extends ApiFormBase {
  }

  /**
   * Class representing the text properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/
   */
  export interface ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies that all the small letter characters in the text run are formatted for display only as
     * their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or
     *   not.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiTextPr;

    /**
     * Specifies the alignment which will be applied to the contents of the run in relation to the default
     * appearance of the run text:
     * **"baseline"** - the characters in the current text run will be aligned by the default text
     * baseline.
     * **"subscript"** - the characters in the current text run will be aligned below the default text
     * baseline.
     * **"superscript"** - the characters in the current text run will be aligned above the default text
     * baseline.
     *
     * @param sType - The vertical alignment type applied to the text contents.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /**
   * Class representing a underline annotation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUnderlineAnnotation/
   */
  export interface ApiUnderlineAnnotation extends ApiBaseMarkupAnnotation {
    /**
     * Returns a type of the ApiUnderlineAnnotation class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUnderlineAnnotation/Methods/GetClassType/
     */
    GetClassType(): "underlineAnnot";

    /**
     * Gets quads from current markup annotation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/GetQuads/
     */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiBaseMarkupAnnotation/Methods/SetQuads/
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /**
   * Class representing a base class for color types.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUniColor/
   */
  export interface ApiUniColor {
    /**
     * Returns a type of the ApiUniColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUniColor/Methods/GetClassType/
     */
    GetClassType(): "uniColor";
  }

  /**
   * Class representing an unsupported element.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUnsupported/
   */
  export interface ApiUnsupported {
    /**
     * Returns a type of the ApiUnsupported class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUnsupported/Methods/GetClassType/
     */
    GetClassType(): "unsupported";
  }

  /**
   * Class representing a uri action.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUriAction/
   */
  export interface ApiUriAction {
    /**
     * Returns a type of the ApiUriAction class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUriAction/Methods/GetClassType/
     */
    GetClassType(): "uriAction";

    /**
     * Gets uri string
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUriAction/Methods/GetRect/
     */
    GetUri(): string;

    /**
     * Sets uri to action
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/pdf-api/ApiUriAction/Methods/GetRect/
     */
    SetUri(uri: string): boolean;
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  export type EditorEventArgs = {
    /** The function called was when selection was canceled. */
    onSelectionCancel: [];
    /** The function called to when selection was ended. */
    onSelectionEnd: [page: number, x: pt, y: pt];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
