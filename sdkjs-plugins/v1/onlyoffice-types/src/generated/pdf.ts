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
    Space: number;

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
    x: number;

    /** The vertical coordinate in points. */
    y: number;
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
    0: number;

    /** y1 (left top) */
    1: number;

    /** x2 (right top) */
    2: number;

    /** y2 (right top) */
    3: number;

    /** x3 (left bottom) */
    4: number;

    /** y3 (left bottom) */
    5: number;

    /** x4 (right bottom) */
    6: number;

    /** y4 (right bottom) */
    7: number;
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
    0: number;

    /** y1 (top) */
    1: number;

    /** x2 (right) */
    2: number;

    /** y2 (bottom) */
    3: number;
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
    0: number;

    /** dy1 (top delta) */
    1: number;

    /** dx2 (right delta) */
    2: number;

    /** dy2 (bottom delta) */
    3: number;
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
    Pos: number;

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

  export interface Api {
    /**
     * Converts centimeters to points.
     *
     * @param cm - The number of centimeters to convert to points.
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
     */
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;

    /**
     * Creates a blip fill to apply to the object using the selected image as the object background.
     *
     * @param imageUrl - The path to the image used for the blip fill (currently only internet URL or Base64 encoded
     *   images are supported).
     * @param blipFillType - The type of the fill used for the blip fill (tile or stretch).
     */
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;

    /**
     * Creates a bullet for a paragraph with the character or symbol specified with the sSymbol parameter.
     *
     * @param sSymbol - The character or symbol which will be used to create the bullet for the paragraph.
     */
    CreateBullet(sSymbol: string): ApiBullet;

    /**
     * Creates a button field.
     *
     * @param rect - widget rect
     */
    CreateButtonField(rect: Rect): ApiButtonField;

    /**
     * Creates caret annotation.
     *
     * @param rect - region to apply caret.
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
     */
    CreateChart(series: number[][], seriesNames: number[] | string[], categoryNames: number[] | string[], width: number, height: number, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;
    CreateChart(chartType: ChartType, series: number[][], seriesNames: number[] | string[], categoryNames: number[] | string[], width: number, height: number, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;

    /**
     * Creates a checkbox field.
     *
     * @param rect - widget rect
     */
    CreateCheckboxField(rect: Rect): ApiCheckboxField;

    /**
     * Creates circle annotation.
     *
     * @param rect - annotation rect.
     */
    CreateCircleAnnot(rect: Rect): ApiCircleAnnotation;

    /**
     * Creates a combobox field.
     *
     * @param rect - widget rect
     */
    CreateComboboxField(rect: Rect): ApiComboboxField;

    /**
     * Creates a new custom geometry.
     *
     * @since 9.1.0
     */
    CreateCustomGeometry(): ApiGeometry;

    /**
     * Creates a text date field.
     *
     * @param rect - widget rect
     */
    CreateDateField(rect: Rect): ApiTextField;

    /**
     * Creates freeText annotation.
     *
     * @param rect - annotation rect.
     */
    CreateFreeTextAnnot(rect: Rect): ApiFreeTextAnnotation;

    /**
     * Creates a GoTo action.
     *
     * @param zoom - 1 = 100% (used only for goToType = "xyz")
     */
    CreateGoToAction(page: number, goToType: GoToType, zoom: number, rect: Rect): ApiGoToAction;

    /**
     * Creates a gradient stop used for different types of gradients.
     *
     * @param color - The color used for the gradient stop.
     * @param pos - The position of the gradient stop measured in 1000th of percent.
     * @since 9.1.0
     */
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;

    /**
     * Creates a hide-show forms action.
     *
     * @param isHidde - to hide - true, to show - false
     * @param names - field names
     */
    CreateHideShowFormsAction(isHidde: boolean, names: string[]): ApiHideShowFormsAction;

    /**
     * Creates highlight annotation.
     *
     * @param rect - region to apply highlight.
     */
    CreateHighlightAnnot(rect: Rect | Quad[]): ApiHighlightAnnotation;

    /**
     * Creates an image with the parameters specified.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param width - The image width in English measure units.
     * @param height - The image height in English measure units.
     */
    CreateImage(imageSrc: string, width: number, height: number): ApiImage;

    /**
     * Creates a image field.
     *
     * @param rect - widget rect
     */
    CreateImageField(rect: Rect): ApiButtonField;

    /**
     * Creates ink annotation.
     *
     * @param rect - annotation rect.
     * @param inkPaths - The ink path list.
     */
    CreateInkAnnot(rect: Rect, inkPaths: PathList): ApiInkAnnotation;

    /** Creates a js action. */
    CreateJsAction(script: string): ApiJsAction;

    /**
     * Creates line annotation.
     *
     * @param rect - annotation rect.
     * @param startPoint - start line point
     * @param endPoint - end line point
     */
    CreateLineAnnot(rect: Rect, startPoint: Point, endPoint: Point): ApiLineAnnotation;

    /**
     * Creates a linear gradient fill to apply to the object using the selected linear gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     * @param angle - The angle measured in 60000th of a degree that will define the gradient direction.
     */
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;

    /**
     * Creates a listbox field.
     *
     * @param rect - widget rect
     */
    CreateListboxField(rect: Rect): ApiListboxField;

    /**
     * Creates a math equation from a linear text string. The resulting object can be inserted into
     * a paragraph the same way as a run (e.g. via {@link ApiParagraph#AddElement} or
     * {@link ApiParagraph#Push}).
     *
     * @param text - An equation written as a linear text string.
     * @param format - The format of the specified linear representation.
     * @since 9.5.0
     */
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;

    /** Creates a named action. */
    CreateNamedAction(name: NamedActionType): ApiNamedAction;

    /** Creates no fill and removes the fill from the element. */
    CreateNoFill(): ApiFill;

    /**
     * Creates a bullet for a paragraph with the numbering character or symbol specified with the numType
     * parameter.
     *
     * @param numType - The numbering type the paragraphs will be numbered with.
     * @param startAt - The number the first numbered paragraph will start with.
     */
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;

    /** Creates a new paragraph. */
    CreateParagraph(): ApiParagraph;

    /**
     * Creates a pattern fill to apply to the object using the selected pattern as the object background.
     *
     * @param patternType - The pattern type used for the fill selected from one of the available pattern types.
     * @param bgColor - The background color used for the pattern creation.
     * @param fgColor - The foreground color used for the pattern creation.
     * @since 9.1.0
     */
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;

    /**
     * Creates polyline annotation.
     *
     * @param rect - annotation rect.
     * @param path - polyline path
     */
    CreatePolyLineAnnot(rect: Rect, path: Path): ApiPolyLineAnnotation;

    /**
     * Creates polygon annotation.
     *
     * @param rect - annotation rect.
     * @param path - polygon path
     */
    CreatePolygonAnnot(rect: Rect, path: Path): ApiPolygonAnnotation;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param presetColor - A preset selected from the list of the available color preset names.
     * @returns ;
     */
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;

    /**
     * Creates a geometry using one of the available preset shapes.
     *
     * @param preset - The preset name.
     * @since 9.1.0
     */
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;

    /**
     * Creates an RGB color setting the appropriate values for the red, green and blue color components.
     *
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;

    /**
     * Creates a radial gradient fill to apply to the object using the selected radial gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     */
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;

    /**
     * Creates a radiobutton field.
     *
     * @param rect - widget rect
     */
    CreateRadiobuttonField(rect: Rect): ApiRadiobuttonField;

    /**
     * Creates redact annotation.
     *
     * @param rect - region to apply redact.
     */
    CreateRedactAnnot(rect: Rect | Quad[]): ApiRedactAnnotation;

    /**
     * Creates a reset forms action.
     *
     * @param isAllExcept - will all fields be reset except the fields whose names are specified
     * @param names - field names
     */
    CreateResetFormsAction(isAllExcept: boolean, names: string[]): ApiHideShowFormsAction;

    /** Creates the empty rich paragraph properties. */
    CreateRichParaPr(): ApiParaPr;

    /** Creates a new rich paragraph. */
    CreateRichParagraph(): ApiRichParagraph;

    /** Creates a new rich run. */
    CreateRichRun(): ApiRichRun;

    /** Creates the empty rich text properties. */
    CreateRichTextPr(): ApiTextPr;

    /** Creates a new smaller text block to be inserted to the current paragraph or table. */
    CreateRun(): ApiRun;

    /**
     * Creates a complex color scheme selecting from one of the available schemes.
     *
     * @param schemeColorId - The color scheme identifier.
     */
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;

    /**
     * Creates a shadow which can be applied to a graphic object.
     *
     * @param settings - The shadow properties.
     * @since 9.5.0
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
     */
    CreateShape(shapeType?: ShapeType, width?: number, height?: number, fill?: ApiFill, stroke?: ApiStroke): ApiShape;

    /**
     * Creates a signature field.
     *
     * @param rect - widget rect
     */
    CreateSignatureField(rect: Rect): ApiSignatureField;

    /**
     * Creates a solid fill to apply to the object using a selected solid color as the object background.
     *
     * @param color - The color used for the element fill.
     * @since 9.1.0
     */
    CreateSolidFill(color: ApiColor): ApiFill;

    /**
     * Creates square annotation.
     *
     * @param rect - annotation rect.
     */
    CreateSquareAnnot(rect: Rect): ApiSquareAnnotation;

    /**
     * Creates stamp annotation.
     *
     * @param rect - annotation rect (only x1, y1 coordinates will be used, since the stamp dimensions are reserved).
     * @param type - stamp type
     * @param author - name of the author
     * @param creationDate - creation date (timeStamp)
     */
    CreateStampAnnot(rect: Rect, type: StampType, author?: string, creationDate?: number): ApiStampAnnotation;

    /**
     * Creates strikeout annotation.
     *
     * @param rect - region to apply strikeout.
     */
    CreateStrikeoutAnnot(rect: Rect | Quad[]): ApiStrikeoutAnnotation;

    /**
     * Creates a stroke adding shadows to the element.
     *
     * @param width - The width of the shadow measured in English measure units.
     * @param fill - The fill type used to create the shadow.
     * @param sDash - The type of line dash.
     * @since 9.3.0
     */
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;

    /**
     * Creates a table.
     *
     * @param rows - Number of rows.
     * @param cols - Number of columns.
     */
    CreateTable(rows: number, cols: number): ApiTable;

    /**
     * Creates the empty table row properties.
     *
     * @since 9.5.0
     */
    CreateTableRowPr(): ApiTableRowPr;

    /**
     * Creates text annotation.
     *
     * @param rect - annotation rect.
     */
    CreateTextAnnot(rect: Rect): ApiTextAnnotation;

    /**
     * Creates a text field.
     *
     * @param rect - widget rect
     */
    CreateTextField(rect: Rect): ApiTextField;

    /** Creates the empty text properties. */
    CreateTextPr(): ApiTextPr;

    /**
     * Creates underline annotation.
     *
     * @param rect - region to apply underline.
     */
    CreateUnderlineAnnot(rect: Rect | Quad[]): ApiUnderlineAnnotation;

    /** Creates an URI action. */
    CreateUriAction(uri: string): ApiUriAction;

    /**
     * Converts English Metric Units (EMUs) to millimeters.
     *
     * @param emu - The value in English Metric Units (EMUs).
     * @returns The value in millimeters.
     */
    EmusToMillimeters(emu: number): number;

    /**
     * Converts EMUs (English Metric Units) to points.
     *
     * @param emu - The number of EMUs to convert to points.
     */
    EmusToPoints(emu: number): number;

    /**
     * Returns the object by it's internal ID.
     *
     * @param id - the object internal ID.
     * @since 9.4.0
     */
    GetByInternalId(id: string): FloatObject | ApiDocumentContent | ApiParagraph | ApiTableRow | ApiTableCell;

    /** Creates a text field with the specified text field properties. */
    GetDocument(): ApiDocument;

    /** Returns the full name of the currently opened file. */
    GetFullName(): string;

    /**
     * Creates a color from a HEX string.
     *
     * @param hexString - The HEX string representing a color.
     */
    HexColor(hexString: string): ApiColor;

    /**
     * Converts inches to points.
     *
     * @param inches - The number of inches to convert to points.
     */
    InchesToPoints(inches: number): number;

    /**
     * Converts lines to points (1 line = 12 points).
     *
     * @param lines - The number of lines to convert to points.
     */
    LinesToPoints(lines: number): number;

    /**
     * Converts millimeters to English Metric Units (EMUs).
     * The result is an integer value.
     *
     * @param mm - The value in millimeters.
     * @returns The value in English Metric Units (EMUs), as an integer.
     */
    MillimetersToEmus(mm: number): number;

    /**
     * Converts millimeters to pixels.
     *
     * @param mm - The number of millimeters to convert to pixels.
     */
    MillimetersToPixels(mm: number): number;

    /**
     * Converts millimeters to points.
     *
     * @param mm - The number of millimeters to convert to points.
     */
    MillimetersToPoints(mm: number): number;

    /**
     * Converts picas to points.
     *
     * @param pc - The number of picas to convert to points.
     */
    PicasToPoints(pc: number): number;

    /**
     * Converts pixels to EMUs (English Metric Units).
     *
     * @param px - The number of pixels to convert to EMUs.
     */
    PixelsToEmus(px: number): number;

    /**
     * Converts pixels to points.
     *
     * @param px - The number of pixels to convert to points.
     */
    PixelsToPoints(px: number): number;

    /**
     * Converts points to centimeters.
     *
     * @param pt - The number of points to convert to centimeters.
     */
    PointsToCentimeters(pt: number): number;

    /**
     * Converts points to EMUs (English Metric Units).
     *
     * @param pt - The number of points to convert to EMUs.
     */
    PointsToEmus(pt: number): number;

    /**
     * Converts points to inches.
     *
     * @param pt - The number of points to convert to inches.
     */
    PointsToInches(pt: number): number;

    /**
     * Converts points to lines (1 line = 12 points).
     *
     * @param pt - The number of points to convert to lines.
     */
    PointsToLines(pt: number): number;

    /**
     * Converts points to millimeters.
     *
     * @param pt - The number of points to convert to millimeters.
     */
    PointsToMillimeters(pt: number): number;

    /**
     * Converts points to picas (1 pica = 12 points).
     *
     * @param pt - The number of points to convert to picas.
     */
    PointsToPicas(pt: number): number;

    /**
     * Converts points to pixels.
     *
     * @param pt - The number of points to convert to pixels.
     */
    PointsToPixels(pt: number): number;

    /**
     * Converts points to twips.
     *
     * @param pt - The number of points to convert to twips.
     */
    PointsToTwips(pt: number): number;

    /**
     * Creates an RGB color from red, green and blue components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     */
    RGB(r: number, g: number, b: number): ApiColor;

    /**
     * Creates an RGBA color from red, green, blue and alpha components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     * @param a - Alpha component (0-255).
     */
    RGBA(r: number, g: number, b: number, a: number): ApiColor;

    /**
     * Creates a theme color.
     *
     * @param name - The theme color name. If the provided name is not supported, the 'tx1' color will be used.
     * @returns Instance of ApiColor with 'theme' type.
     */
    ThemeColor(name?: SchemeColorId): ApiColor;

    /**
     * Converts twips to points.
     *
     * @param twips - The number of twips to convert to points.
     */
    TwipsToPoints(twips: number): number;
  }

  /** Class representing a base an action collection. */
  export interface ApiActionCollection {
    /** Gets Calculate action. */
    GetCalculate(): ApiJsAction;

    /** Gets class type of this object. */
    GetClassType(): "actionCollection";

    /** Gets Format action. */
    GetFormat(): ApiJsAction;

    /** Gets Keystroke action. */
    GetKeystroke(): ApiJsAction;

    /** Gets MouseDown action. */
    GetMouseDown(): ApiBaseAction;

    /** Gets MouseEnter action. */
    GetMouseEnter(): ApiBaseAction;

    /** Gets MouseExit action. */
    GetMouseExit(): ApiBaseAction;

    /** Gets MouseUp action. */
    GetMouseUp(): ApiBaseAction;

    /** Gets OnBlur action. */
    GetOnBlur(): ApiBaseAction;

    /** Gets OnFocus action. */
    GetOnFocus(): ApiBaseAction;

    /** Gets Validate action. */
    GetValidate(): ApiJsAction;

    /**
     * Sets the Calculate action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetCalculate(action: ApiJsAction): boolean;

    /**
     * Sets the Format action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetFormat(action: ApiJsAction): boolean;

    /**
     * Sets the Keystroke action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetKeystroke(action: ApiJsAction): boolean;

    /**
     * Sets the MouseDown action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetMouseDown(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseEnter action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetMouseEnter(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseExit action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetMouseExit(action: ApiBaseAction): boolean;

    /**
     * Sets the MouseUp action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetMouseUp(action: ApiBaseAction): boolean;

    /**
     * Sets the OnBlur action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetOnBlur(action: ApiBaseAction): boolean;

    /**
     * Sets the OnFocus action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetOnFocus(action: ApiBaseAction): boolean;

    /**
     * Sets the Validate action.
     *
     * @param action - The action to set, or `null` to remove it.
     */
    SetValidate(action: ApiJsAction): boolean;
  }

  /** Class representing a base pdf action. */
  export interface ApiBaseAction {
    /** Returns next action. */
    GetNext(): ApiBaseAction;

    /**
     * Sets next action.
     *
     * @returns returns next action
     */
    SetNext(action: ApiBaseAction): ApiBaseAction;
  }

  /** Class representing a base annotation. */
  export interface ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a base field. */
  export interface ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /** Removes field from document. */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     */
    GetAllWidgets(): ApiWidget[];

    /** Gets field full name. */
    GetFullName(): string;

    /** Gets field partial name. */
    GetPartialName(): string;

    /** Gets field value */
    GetValue(): string | string[];

    /** Checks if field is read only */
    IsReadOnly(): boolean;

    /** Checks if field is required */
    IsRequired(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     */
    SetValue(value: string): boolean;
  }

  /** Class representing a base list field. */
  export interface ApiBaseListField extends ApiBaseField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     */
    AddOption(option: ListOption, index?: number): boolean;

    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /** Removes field from document. */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     */
    GetAllWidgets(): ApiWidget[];

    /** Gets field full name. */
    GetFullName(): string;

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     */
    GetOption(index: number): ListOption;

    /** Gets all options from list options. */
    GetOptions(): ListOption[];

    /** Gets field partial name. */
    GetPartialName(): string;

    /** Gets field value */
    GetValue(): string | string[];

    /** Gets selected value indexes. */
    GetValueIndexes(): number[];

    /** Checks if field can commit on selection change. */
    IsCommitOnSelChange(): boolean;

    /** Checks if field is read only */
    IsReadOnly(): boolean;

    /** Checks if field is required */
    IsRequired(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     */
    SetValue(value: string): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a base markup annotation. */
  export interface ApiBaseMarkupAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a base field widget. */
  export interface ApiBaseWidget {
    /** Removes widget from parent field. */
    Delete(): boolean;

    /** Gets actions collection. */
    GetActions(): ApiActionCollection;

    /** Gets widget background color. */
    GetBackgroundColor(): ApiColor;

    /** Gets widget border color. */
    GetBorderColor(): ApiColor;

    /** Gets widget border style. */
    GetBorderStyle(): WidgetBorderStyle;

    /** Gets widget border width. */
    GetBorderWidth(): WidgetBorderWidth;

    /** Returns a type of the ApiBaseWidget class. */
    GetClassType(): "baseWidget";

    /** Gets parent field. */
    GetParent(): ApiField;

    /** Gets widget position. */
    GetPosition(): Point;

    /** Sets field rect. */
    GetRect(): Rect;

    /** Gets widget text color. */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     */
    GetTextSize(): number;

    /** Checks if text is autofit. */
    IsAutoFit(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     */
    SetTextSize(size: number): boolean;
  }

  /** Class representing a container for the document content. */
  export interface ApiBlockLvlSdt {
  }

  /** Class representing a bookmark in the document. */
  export interface ApiBookmark {
  }

  /** Class representing a paragraph bullet. */
  export interface ApiBullet {
    /** Returns a type of the ApiBullet class. */
    GetClassType(): "bullet";

    /** Converts the ApiBullet object into the JSON object. */
    ToJSON(): object;
  }

  /** Class representing a button field. */
  export interface ApiButtonField extends ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /** Removes field from document. */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     */
    GetAllWidgets(): ApiWidget[];

    /** Returns a type of the ApiButtonField class. */
    GetClassType(): "buttonField";

    /** Gets field full name. */
    GetFullName(): string;

    /** Gets field partial name. */
    GetPartialName(): string;

    /** Gets field value */
    GetValue(): string | string[];

    /** Checks if field is read only */
    IsReadOnly(): boolean;

    /** Checks if field is required */
    IsRequired(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets image for all button field widgets
     *
     * @param imageUrl - The URL of the image to set for the button.
     * @since 9.4.0
     */
    SetValue(imageUrl: string): boolean;
  }

  /** Class representing a button widget. */
  export interface ApiButtonWidget extends Omit<ApiBaseWidget, "GetClassType"> {
    /** Removes widget from parent field. */
    Delete(): boolean;

    /** Gets widget background color. */
    GetBackgroundColor(): ApiColor;

    /** Gets button widget behavior. */
    GetBehavior(): ButtonBehavior;

    /** Gets widget border color. */
    GetBorderColor(): ApiColor;

    /** Gets widget border style. */
    GetBorderStyle(): WidgetBorderStyle;

    /** Gets widget border width. */
    GetBorderWidth(): WidgetBorderWidth;

    /** Returns a type of the ApiButtonWidget class. */
    GetClassType(): "buttonWidget";

    /** Gets button widget icon x position. */
    GetIconXPos(): percentage;

    /** Gets button widget icon y position. */
    GetIconYPos(): percentage;

    /**
     * Gets label from button widget field.
     *
     * @param appearance - The appearance state.
     */
    GetLabel(appearance?: ButtonAppearance): string;

    /** Gets button widget layout type */
    GetLayout(): ButtonLayout;

    /** Gets widget position. */
    GetPosition(): Point;

    /** Sets field rect. */
    GetRect(): Rect;

    /** Gets button widget scale when type */
    GetScaleHow(): ButtonScaleHow;

    /** Gets button widget scale when type */
    GetScaleWhen(): ButtonScaleWhen;

    /** Gets widget text color. */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     */
    GetTextSize(): number;

    /** Checks if text is autofit. */
    IsAutoFit(): boolean;

    /** Checks if button widget is fit bounds. */
    IsFitBounds(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets button widget behavior.
     *
     * @param behavior - The highlight behavior when the button is clicked.
     */
    SetBehavior(behavior: ButtonBehavior): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets button widget fit bounds.
     *
     * @param fit - Specifies whether the icon is scaled to fit the button bounds.
     */
    SetFitBounds(fit: boolean): boolean;

    /**
     * Sets button widget icon x position.
     *
     * @param posX - The horizontal position of the icon as a percentage of the button width.
     */
    SetIconXPos(posX: percentage): boolean;

    /**
     * Sets button widget icon y position.
     *
     * @param posY - The vertical position of the icon as a percentage of the button height.
     */
    SetIconYPos(posY: percentage): boolean;

    /**
     * Sets image to button widget field.
     *
     * @param imageUrl - The image URL.
     * @param appearance - The appearance state.
     */
    SetImage(imageUrl?: string, appearance?: ButtonAppearance): boolean;

    /**
     * Sets label to button widget field.
     *
     * @param label - The button label.
     * @param appearance - The appearance state.
     */
    SetLabel(label: string, appearance?: ButtonAppearance): boolean;

    /**
     * Sets button widget layout type
     *
     * @param layout - The button layout.
     */
    SetLayout(layout: ButtonLayout): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets button widget scale how type
     *
     * @param scaleHow - The icon scaling mode.
     */
    SetScaleHow(scaleHow: ButtonScaleHow): boolean;

    /**
     * Sets button widget scale when type
     *
     * @param scaleWhen - The condition that controls when the icon is scaled.
     */
    SetScaleWhen(scaleWhen: ButtonScaleWhen): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     */
    SetTextSize(size: number): boolean;
  }

  /** Class representing a caret annotation. */
  export interface ApiCaretAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiCaretAnnotation class. */
    GetClassType(): "caretAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a chart. */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetTitle"> {
    /**
     * Sets a style to the current chart by style ID.
     *
     * @param nStyleId - One of the styles available in the editor.
     */
    ApplyChartStyle(nStyleId: unknown): boolean;

    /** Returns all series from the chart space. */
    GetAllSeries(): ApiChartSeries[];

    /** Returns a type of the chart object. */
    GetChartType(): ChartTypeLegacy;

    /** Returns a type of the ApiChart class. */
    GetClassType(): "chart";

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Returns the series with a specific index.
     *
     * @param nIdx - Series index.
     */
    GetSeries(nIdx: number): ApiChartSeries;

    /**
     * Returns the chart title text.
     *
     * @returns The chart title text or null if the chart has no title.
     */
    GetTitle(): string | null;

    /**
     * Returns a type of the chart object using the chart type names from the {@link ChartType}
     * enumeration.
     */
    GetType(): ChartType;

    /**
     * Removes the specified series from the current chart.
     *
     * @param nSeria - The index of the chart series.
     */
    RemoveSeria(nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the axis values.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param sAxisPos - Axis position in the chart.
     */
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;

    /**
     * Sets a name to the specified chart category.
     *
     * @param sName - The name which will be set to the specified chart category.
     * @param nCategory - The index of the chart category.
     */
    SetCategoryName(sName: string, nCategory: number): boolean;

    /**
     * Sets the fill to the data point in the specified chart series.
     *
     * @param oFill - The fill type used to fill the data point.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the fill will be applied to the specified data point in all series.
     */
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;

    /**
     * Sets the specified numeric format to the chart data point.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the numeric format will be applied to the specified data point in all series.
     */
    SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Sets the outline to the data point in the specified chart series.
     *
     * @param oStroke - The stroke used to create the data point outline.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the outline will be applied to the specified data point in all series.
     */
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Specifies font size for labels of the horizontal axis.
     *
     * @param nFontSize - The text size value measured in points.
     */
    SetHorAxisLabelsFontSize(nFontSize: number): boolean;

    /**
     * Specifies major tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     */
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     */
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies the horizontal axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the horizontal axis (from minimum to
     *   maximum).
     */
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Spicifies tick labels position for the horizontal axis.
     *
     * @param sTickLabelPosition - The type for the position of chart horizontal tick labels.
     */
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Specifies the chart horizontal axis title.
     *
     * @param sTitle - The title which will be displayed for the horizontal axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the horizontal axis title is written in bold font or not.
     */
    SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart legend.
     *
     * @param oFill - The fill type used to fill the legend.
     */
    SetLegendFill(oFill: ApiFill): boolean;

    /**
     * Specifies the legend font size.
     *
     * @param nFontSize - The text size value measured in points.
     */
    SetLegendFontSize(nFontSize: number): boolean;

    /**
     * Sets the outline to the chart legend.
     *
     * @param oStroke - The stroke used to create the legend outline.
     */
    SetLegendOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the chart legend position.
     *
     * @param sLegendPos - The position of the chart legend inside the chart window.
     */
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;

    /**
     * Specifies major horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     */
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies major vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     */
    SetMajorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the marker in the specified chart series.
     *
     * @param oFill - The fill type used to fill the marker.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the fill will be applied to all markers in the specified chart series.
     */
    SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Sets the outline to the marker in the specified chart series.
     *
     * @param oStroke - The stroke used to create the marker outline.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the outline will be applied to all markers in the specified chart series.
     */
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Specifies minor horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     */
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies minor vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     */
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the chart plot area.
     *
     * @param oFill - The fill type used to fill the plot area.
     */
    SetPlotAreaFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart plot area.
     *
     * @param oStroke - The stroke used to create the plot area outline.
     */
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;

    /**
     * Sets a name to the specified chart series.
     *
     * @param sName - The name which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     */
    SetSeriaName(sName: string, nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the chart series.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     */
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;

    /**
     * Sets values to the specified chart series.
     *
     * @param aValues - The array of the data which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     */
    SetSeriaValues(aValues: number[], nSeria: number): boolean;

    /**
     * Sets the fill to the specified chart series.
     *
     * @param oFill - The fill type used to fill the series.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the fill will be applied to all series.
     */
    SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;

    /**
     * Sets the outline to the specified chart series.
     *
     * @param oStroke - The stroke used to create the series outline.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the outline will be applied to all series.
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
     */
    SetShowDataLabels(bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies whether the data table is displayed below the chart, optionally with the legend keys.
     *
     * @param bShow - Whether to show or hide the data table below the chart.
     * @param bShowKeys - Whether to show the legend keys in the data table.
     * @since 9.5.0
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
     */
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies the chart title.
     *
     * @param sTitle - The title which will be displayed for the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the chart title is written in bold font or not.
     */
    SetTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart title.
     *
     * @param oFill - The fill type used to fill the title.
     */
    SetTitleFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart title.
     *
     * @param oStroke - The stroke used to create the title outline.
     */
    SetTitleOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the vertical axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the vertical axis (from minimum to
     *   maximum).
     */
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Specifies the chart vertical axis title.
     *
     * @param sTitle - The title which will be displayed for the vertical axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the vertical axis title is written in bold font or not.
     */
    SetVerAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;

    /**
     * Specifies font size for labels of the vertical axis.
     *
     * @param nFontSize - The text size value measured in points.
     */
    SetVertAxisLabelsFontSize(nFontSize: number): boolean;

    /**
     * Specifies major tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     */
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     */
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Spicifies tick labels position for the vertical axis.
     *
     * @param sTickLabelPosition - The type for the position of chart vertical tick labels.
     */
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Sets the x-axis values to all chart series. It is used with the scatter charts only.
     *
     * @param aValues - The array of the data which will be set to the x-axis data points.
     */
    SetXValues(aValues: string[]): boolean;
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
    /**
     * Tries to change the series type. Returns true if successful.
     *
     * @param sType - Chart type.
     */
    ChangeChartType(sType: ChartType): boolean;

    /** Returns a chart type of the current series. */
    GetChartType(): ChartTypeLegacy;

    /** Returns a type of the ApiChartSeries class. */
    GetClassType(): "chartSeries";

    /**
     * Returns a chart type of the current series using the chart type names from the {@link ChartType}
     * enumeration.
     */
    GetType(): ChartType;
  }

  /** Class representing a document checkbox / radio button. */
  export interface ApiCheckBoxForm extends ApiFormBase {
  }

  /** Class representing a checkbox field. */
  export interface ApiCheckboxField extends ApiBaseField {
    /**
     * Adds options to checkbox group.
     *
     * @param pageIndex - The page where the option will be added.
     * @param rect - The option rectangle.
     * @param exportValue - The option checked value.
     */
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;

    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /** Removes field from document. */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     */
    GetAllWidgets(): ApiWidget[];

    /** Returns a type of the ApiCheckboxField class. */
    GetClassType(): "checkboxField";

    /** Gets field full name. */
    GetFullName(): string;

    /** Gets field partial name. */
    GetPartialName(): string;

    /** Gets field value */
    GetValue(): string | string[];

    /** Checks if field is read only */
    IsReadOnly(): boolean;

    /** Checks if field is required */
    IsRequired(): boolean;

    /** Checks if the field can be toggled off. */
    IsToggleToOff(): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     */
    SetFullName(name: string): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets whether the checked state can be toggled off.
     *
     * @param allowToggleOff - Specifies whether the checked state can be toggled off.
     */
    SetToggleToOff(allowToggleOff: boolean): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     */
    SetValue(value: string): boolean;
  }

  /** Class representing a checkbox field widget. */
  export interface ApiCheckboxWidget extends Omit<ApiBaseWidget, "GetClassType"> {
    /** Removes widget from parent field. */
    Delete(): boolean;

    /** Gets widget background color. */
    GetBackgroundColor(): ApiColor;

    /** Gets widget border color. */
    GetBorderColor(): ApiColor;

    /** Gets widget border style. */
    GetBorderStyle(): WidgetBorderStyle;

    /** Gets widget border width. */
    GetBorderWidth(): WidgetBorderWidth;

    /** Gets widget checkbox style. */
    GetCheckStyle(): CheckStyle;

    /** Returns a type of the ApiCheckboxWidget class. */
    GetClassType(): "checkboxWidget";

    /** Gets widget export value. */
    GetExportValue(): string;

    /** Gets widget position. */
    GetPosition(): Point;

    /** Sets field rect. */
    GetRect(): Rect;

    /** Gets widget text color. */
    GetTextColor(): ApiColor;

    /**
     * Gets widget text size.
     * <note> Text size === 0 means autofit </note>
     */
    GetTextSize(): number;

    /** Checks if text is autofit. */
    IsAutoFit(): boolean;

    /** Checks if checkbox widget is checked. */
    IsChecked(): boolean;

    /** Checks if widget is checked by default. */
    IsCheckedByDefault(): boolean;

    /**
     * Sets text autofit.
     *
     * @param auto - Specifies whether text autofit is enabled.
     */
    SetAutoFit(auto: boolean): boolean;

    /**
     * Sets widget background color.
     *
     * @param color - The background color.
     */
    SetBackgroundColor(color: ApiColor): boolean;

    /**
     * Sets widget border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets widget border style.
     *
     * @param borderStyle - The border style.
     */
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;

    /**
     * Sets widget border width.
     *
     * @param borderWidth - the width to set to the border.
     */
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;

    /**
     * Sets widget checkbox style.
     *
     * @param style - The checkbox style.
     */
    SetCheckStyle(style: CheckStyle): boolean;

    /**
     * Sets checkbox widget checked.
     *
     * @param checked - Specifies whether the checkbox is checked.
     */
    SetChecked(checked: boolean): boolean;

    /**
     * Sets widget checked by default.
     *
     * @param checked - Specifies whether the checkbox is checked by default.
     */
    SetCheckedByDefault(checked: boolean): boolean;

    /**
     * Sets widget export value.
     *
     * @param value - The value to be exported when the checkbox is checked.
     */
    SetExportValue(value: string): boolean;

    /**
     * Sets widget position.
     *
     * @param position - The new position of the widget.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets field rect.
     *
     * @param rect - The new bounding rectangle for the widget.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets widget text color.
     *
     * @param color - The text color.
     */
    SetTextColor(color: ApiColor): boolean;

    /**
     * Sets widget text size.
     * <note> Text size === 0 means autofit </note>
     *
     * @param size - The font size in points.
     */
    SetTextSize(size: number): boolean;
  }

  /** Class representing a circle annotation. */
  export interface ApiCircleAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiCircleAnnotation class. */
    GetClassType(): "circleAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets annotation rect difference. */
    GetRectDiff(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
    /**
     * Converts the JSON object into the ApiColor object.
     *
     * @param jsonObject - JSON representation of the color.
     * @returns new ApiColor object if the conversion was successful, null otherwise.
     * @since 9.3.0
     */
    FromJSON(jsonObject: string): ApiColor | null;

    /**
     * Returns a type of the ApiColor class.
     *
     * @since 9.1.0
     */
    GetClassType(): "color";

    /**
     * Gets the HEX string representation of the color.
     *
     * @returns A six-digit uppercase hex string, e.g. "FF00AA".
     * @since 9.1.0
     */
    GetHex(): string;

    /**
     * Gets the RGB components of the color.
     *
     * @since 9.1.0
     */
    GetRGB(): object;

    /**
     * Gets the RGBA components of the color.
     *
     * @since 9.1.0
     */
    GetRGBA(): object;

    /**
     * Gets the theme color name if the color is a theme color.
     *
     * @returns The theme color name or null if not a theme color.
     * @since 9.3.0
     */
    GetThemeName(): SchemeColorId | null;

    /**
     * Returns true if the color is a theme color.
     *
     * @since 9.1.0
     */
    IsThemeColor(): boolean;

    /**
     * Converts the ApiColor object into the JSON object.
     *
     * @returns JSON string representation of the color.
     * @since 9.3.0
     */
    ToJSON(): string;
  }

  /** Class representing a document combo box / drop-down list. */
  export interface ApiComboBoxForm extends ApiFormBase {
  }

  /** Class representing a combobox field. */
  export interface ApiComboboxField extends ApiBaseListField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     */
    AddOption(option: ListOption, index?: number): boolean;

    /** Clears format of field. */
    ClearFormat(): boolean;

    /** Returns a type of the ApiComboboxField class. */
    GetClassType(): "comboboxField";

    /** Gets formatted value of a field. */
    GetFormattedValue(): string;

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     */
    GetOption(index: number): ListOption;

    /** Gets all options from list options. */
    GetOptions(): ListOption[];

    /** Gets text field placeholder. */
    GetPlaceholder(): string;

    /** Gets text widget regular validate expression. */
    GetRegularExp(): boolean;

    /** Gets selected value indexes. */
    GetValueIndexes(): number[];

    /** Checks if field can commit on selection change. */
    IsCommitOnSelChange(): boolean;

    /** Checks if field is editable. */
    IsEditable(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets date format for field.
     *
     * @param format - date format (e.g. "dd.mm.yyyy")
     */
    SetDateFormat(format: string): boolean;

    /**
     * Sets whether custom text can be entered.
     *
     * @param allowCustomText - Specifies whether custom text can be entered.
     */
    SetEditable(allowCustomText: boolean): boolean;

    /**
     * Sets mask for field.
     *
     * @param inputMask - The input mask (e.g. "(999)999-9999").
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
     */
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;

    /**
     * Sets percentage format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     */
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;

    /**
     * Sets text field placeholder.
     * <note>Makes combobox editable</note>
     *
     * @param sPlaceholder - field placeholder
     */
    SetPlaceholder(sPlaceholder: string): boolean;

    /**
     * Sets regular expression validate string for field.
     *
     * @param regularExpression - The validation regular expression (e.g. "\\S+@\\S+\\.\\S+")
     */
    SetRegularExp(regularExpression: string): boolean;

    /**
     * Sets special format for field.
     *
     * @param format - the formatting style to apply to the value
     */
    SetSpecialFormat(format: PsfFormat): boolean;

    /**
     * Sets time format for field.
     *
     * @param format - available time format
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
     */
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a comment. */
  export interface ApiComment {
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
  }

  /** Class representing a complex field. */
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

  /** Class representing a document date field. */
  export interface ApiDateForm extends ApiFormBase {
  }

  /** Class representing a document. */
  export interface ApiDocument {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new page to document.
     *
     * @param index - The index where the page will be added.
     * @param width - The page width.
     * @param height - The page height.
     */
    AddPage(index?: number, width?: number, height?: number): ApiPage;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     */
    AddText(text: string): ApiRun;

    /** Applies added redact. */
    ApplyRedact(): boolean;

    /** Gets list of all fields in document. */
    GetAllFields(): ApiField[];

    /** Returns an array of all paragraphs from the current document content. */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Gets document calculate fields order
     *
     * @returns order of fields names
     */
    GetCalculateOrder(): string[];

    /** Returns a type of the ApiDocument class. */
    GetClassType(): "document";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     */
    GetElement(nPos: number): DocumentElement;

    /** Returns a number of elements in the current document. */
    GetElementsCount(): number;

    /**
     * Gets field by it's name.
     *
     * @param name - the full name parameter.
     */
    GetFieldByName(name: string): ApiField;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     */
    GetInternalId(): string;

    /**
     * Gets page by index from document.
     *
     * @param index - page index.
     */
    GetPage(index: number): ApiPage;

    /** Gets document pages count */
    GetPagesCount(): number;

    /** Gets selected text in document */
    GetSelectedText(): string;

    /** Gets document selection info */
    GetSelection(): DocSelection;

    /** Gets document selection quads by page */
    GetSelectionQuads(): DocQuads;

    /**
     * Returns the document style by its name.
     *
     * @param sStyleName - The name of the table style to look up.
     * @since 9.5.0
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
     * @since 8.3.0
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Removes page by index from document
     * <note> You can't delete last page </note>
     *
     * @param index - page index
     */
    RemovePage(index: number): boolean;

    /**
     * Searchs words and adds redact to it.
     *
     * @param props - The search options.
     */
    SearchAndRedact(props: SearchProps): ApiRedactAnnotation[];

    /**
     * Sets document calculate fields order
     *
     * @param names - order of fields names
     */
    SetCalculateOrder(names: string[]): boolean;

    /** Sets document selection */
    SetSelection(selection: DocSelection): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     */
    SetText(text: string): ApiRun;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     */
    AddText(text: string): ApiRun;

    /** Returns an array of all paragraphs from the current document content. */
    GetAllParagraphs(): ApiParagraph[];

    /** Returns a type of the ApiDocumentContent class. */
    GetClassType(): "documentContent";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     */
    GetElement(nPos: number): DocumentElement;

    /** Returns a number of elements in the current document. */
    GetElementsCount(): number;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
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
     * @since 8.3.0
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     */
    SetText(text: string): ApiRun;
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
    /** Creates a copy of the specified drawing object. */
    Copy(): ApiDrawing;

    /**
     * Deletes the specified drawing object from the parent.
     *
     * @returns false if drawing doesn't exist or drawing hasn't a parent.
     */
    Delete(): boolean;

    /** Returns the type of the ApiDrawing class. */
    GetClassType(): "drawing";

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.5.0
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.5.0
     */
    GetFlipV(): boolean | null;

    /** Returns the height of the current drawing. */
    GetHeight(): number;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @since 9.5.0
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @since 9.5.0
     */
    GetName(): string;

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /** Returns the rotation angle of the current drawing object. */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     */
    GetTitle(): string | null;

    /** Returns the width of the current drawing. */
    GetWidth(): number;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     */
    SetDescription(description: string): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param fill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid or not supported for the current graphic object.
     * @since 9.5.0
     */
    SetFill(fill: ApiFill): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Sets the outline properties to the current graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid or not supported for the current graphic object.
     * @since 9.5.0
     */
    SetLine(stroke: ApiStroke): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     * @since 9.5.0
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
     */
    SetName(name: string): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param rotAngle - New drawing rotation angle.
     */
    SetRotation(rotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param width - The object width measured in English measure units.
     * @param height - The object height measured in English measure units.
     */
    SetSize(width: number, height: number): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     */
    SetTitle(title: string): boolean;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.5.0
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

  /** Class representing a base class for fill. */
  export interface ApiFill {
    /** Returns a type of the ApiFill class. */
    GetClassType(): "fill";

    /**
     * Gets the fill type.
     *
     * @returns returns "solid", "gradient", "pattern", "blip", "nofill" or null.
     */
    GetType(): FillType;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
  }

  /** Class representing a freeText annotation. */
  export interface ApiFreeTextAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Gets annot callout. */
    GetCallout(): FreeTextCallout;

    /** Returns a type of the ApiFreeTextAnnotation class. */
    GetClassType(): "freeTextAnnot";

    /** Gets annotation rich content. */
    GetContent(): ApiRichContent;

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets intent type of this annotation. */
    GetIntent(): FreeTextIntent;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets annotation rect difference. */
    GetRectDiff(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annot callout.
     *
     * @param callout - An array of 3 points defining the callout line.
     * @returns returns false if intent is not equal "freeTextCallout"
     */
    SetCallout(callout: FreeTextCallout): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets intent type for this annotation.
     *
     * @param intentType - The intent type of the free text annotation.
     */
    SetIntent(intentType: FreeTextIntent): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing the shape geometry. */
  export interface ApiGeometry {
    /**
     * Adds a new adjustment parameter to the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     */
    AddAdj(sName: string, nValue: number): boolean;

    /**
     * Adds a connection point to the current geometry.
     *
     * @param sAngle - The angle of the connection point.
     * @param sX - The X position.
     * @param sY - The Y position.
     * @since 9.1.0
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
     */
    AddGuide(sName: string, sFormula: GeometryFormulaType, sX: string, sY: string, sZ: string): boolean;

    /**
     * Adds a new path to the current geometry.
     *
     * @since 9.1.0
     */
    AddPath(): ApiPath | null;

    /**
     * Returns the adjustment value by its name from the current geometry.
     *
     * @param sName - The adjustment name.
     * @since 9.1.0
     */
    GetAdjValue(sName: string): number | null;

    /** Returns a type of the ApiGeometry class. */
    GetClassType(): "geometry";

    /**
     * Returns a geometry path by its index.
     *
     * @param nIndex - The path index.
     * @since 9.1.0
     */
    GetPath(nIndex: number): ApiPath;

    /**
     * Returns the number of paths in the current geometry.
     *
     * @since 9.1.0
     */
    GetPathCount(): number;

    /**
     * Returns all paths of the current geometry.
     *
     * @since 9.1.0
     */
    GetPaths(): ApiPath[];

    /**
     * Returns the name of the preset shape if the current geometry is based on a preset.
     *
     * @since 9.1.0
     */
    GetPreset(): ShapeType;

    /**
     * Checks whether the current geometry is custom.
     *
     * @since 9.1.0
     */
    IsCustom(): boolean;

    /**
     * Sets the specified adjustment parameter for the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
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
     */
    SetTextRect(sLeft: string, sTop: string, sRight: string, sBottom: string): boolean;
  }

  /** Class representing a GoTo action. */
  export interface ApiGoToAction {
    /** Returns a type of the ApiGoToAction class. */
    GetClassType(): "goToAction";

    /** Gets desctination page index */
    GetPage(): number;

    /** Gets goto destination rect */
    GetRect(): Rect;

    /** Gets goto type */
    GetType(): GoToType;

    /** Gets goto destination rect */
    GetZoom(): Rect;

    /** Sets desctination page index */
    SetPage(page: number): boolean;

    /** Sets goto destination rect */
    SetRect(rect: Rect): boolean;

    /** Sets goto type */
    SetType(type: GoToType): boolean;
  }

  /** Class representing gradient stop. */
  export interface ApiGradientStop {
    /** Returns a type of the ApiGradientStop class. */
    GetClassType(): "gradientStop";
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType"> {
    /** Returns a type of the ApiGroup class. */
    GetClassType(): "group";

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a hide-show action. */
  export interface ApiHideShowFormsAction {
    /** Returns a type of the ApiHideShowFormsAction class. */
    GetClassType(): "hideShowAction";

    /** Gets names of fields to hide */
    GetNames(): string[];

    /**
     * Checks if action hide fields
     *
     * @returns if false then show fields
     */
    IsHide(): boolean;

    /** Sets action hide fields */
    SetHide(isHide: boolean): boolean;

    /** Sets names of fields to hide */
    SetNames(names: string[]): boolean;
  }

  /** Class representing a highlight annotation. */
  export interface ApiHighlightAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiHighlightAnnotation class. */
    GetClassType(): "highlightAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
    /** Returns a type of the ApiHyperlink class. */
    GetClassType(): "hyperlink";

    /**
     * Returns the hyperlink element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     */
    GetElement(nPos: number): ParagraphContent;

    /** Returns a number of elements in the current hyperlink. */
    GetElementsCount(): number;

    /** Returns the hyperlink address. */
    GetLinkedText(): string;

    /** Returns the screen tip text of the hyperlink. */
    GetScreenTipText(): string;

    /**
     * Sets the hyperlink address.
     *
     * @param sLink - The hyperlink address.
     */
    SetLink(sLink: string): boolean;

    /**
     * Sets the screen tip text of the hyperlink.
     *
     * @param sScreenTipText - The screen tip text of the hyperlink.
     */
    SetScreenTipText(sScreenTipText: string): boolean;
  }

  /** Class representing an image. */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType"> {
    /** Returns the type of the ApiImage class. */
    GetClassType(): "image";

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a ink annotation. */
  export interface ApiInkAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiInkAnnotation class. */
    GetClassType(): "inkAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets ink path list. */
    GetPathList(): PathList;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets ink path list.
     *
     * @param inkPaths - ink path list
     */
    SetPathList(inkPaths: PathList): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a js action. */
  export interface ApiJsAction {
    /** Returns a type of the ApiJsAction class. */
    GetClassType(): "jsAction";

    /** Gets action script */
    GetScript(): string;

    /** Sets action script. */
    SetScript(script: string): boolean;
  }

  /** Class representing a line annotation. */
  export interface ApiLineAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiLineAnnotation class. */
    GetClassType(): "lineAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets a line end point. */
    GetEndPoint(): Point;

    /** Gets a line end style. */
    GetEndStyle(): LineEndStyle;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets a line start point. */
    GetStartPoint(): Point;

    /** Gets a line start style. */
    GetStartStyle(): LineEndStyle;

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets a line end point.
     *
     * @param point - The end point of the line.
     */
    SetEndPoint(point: Point): boolean;

    /**
     * Sets a line end style.
     *
     * @param style - The style of the line end endpoint.
     */
    SetEndStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets a line start point.
     *
     * @param point - The start point of the line.
     */
    SetStartPoint(point: Point): boolean;

    /**
     * Sets a line start style.
     *
     * @param style - The style of the line start endpoint.
     */
    SetStartStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a link annotation. */
  export interface ApiLinkAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiLinkAnnotation class. */
    GetClassType(): "linkAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a listbox field. */
  export interface ApiListboxField extends ApiBaseListField {
    /**
     * Adds new option to list options.
     *
     * @param option - list option to add
     * @param index - index to add option.
     */
    AddOption(option: ListOption, index?: number): boolean;

    /** Returns a type of the ApiListboxField class. */
    GetClassType(): "listboxField";

    /**
     * Gets option from list options.
     *
     * @param index - The option index.
     */
    GetOption(index: number): ListOption;

    /** Gets all options from list options. */
    GetOptions(): ListOption[];

    /** Gets selected value indexes. */
    GetValueIndexes(): number[];

    /** Checks if field can commit on selection change. */
    IsCommitOnSelChange(): boolean;

    /** Checks if the field supports multiple selection. */
    IsMultipleSelection(): boolean;

    /**
     * Moves option to specified position in list options.
     *
     * @param currentIndex - The current index of the option to move.
     * @param newIndex - The target index for the option.
     */
    MoveOption(currentIndex: number, newIndex: number): boolean;

    /**
     * Removes option from list options.
     *
     * @param index - The option index.
     */
    RemoveOption(index: number): boolean;

    /**
     * Sets whether the field commits changes immediately after selection changes.
     *
     * @param commitOnSelectionChange - Specifies whether selection changes are committed immediately.
     */
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;

    /**
     * Sets whether multiple values can be selected.
     *
     * @param allowMultipleSelection - Specifies whether multiple values can be selected.
     */
    SetMultipleSelection(allowMultipleSelection: boolean): boolean;

    /**
     * Sets selected value indexes.
     *
     * @param valueIndexes - The indexes of the selected values.
     */
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
    /** Returns a type of the ApiMath class. */
    GetClassType(): "math";

    /**
     * Returns the inner text of the current math element.
     *
     * @param format - The format the text should be returned in.
     */
    GetText(format?: "unicode" | "latex"): string;
  }

  /** Class representing a named action. */
  export interface ApiNamedAction {
    /** Returns a type of the ApiNamedAction class. */
    GetClassType(): "namedAction";

    /** Gets a name of action. */
    GetName(): NamedActionType;

    /** Sets a name of action. */
    SetName(name: NamedActionType): boolean;
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an Ole object. */
  export interface ApiOleObject extends ApiDrawing {
    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a document page. */
  export interface ApiPage {
    /**
     * Adds an available object to a page.
     *
     * @param object - The annotation, field, or drawing to add to the page.
     */
    AddObject(object: FloatObject): FloatObject;

    /** Gets all annots on page */
    GetAllAnnots(): ApiBaseAnnotation[];

    /** Gets all drawing objects from the page. */
    GetAllDrawings(): Drawing[];

    /** Gets page widgets */
    GetAllWidgets(): ApiWidget[];

    /** Returns a type of the ApiPage class. */
    GetClassType(): "page";

    /** Gets page index */
    GetIndex(): number;

    /** Gets page rotation angle */
    GetRotation(): number;

    /** Gets selected text on page */
    GetSelectedText(): string;

    /** Gets page selection. */
    GetSelection(): PageSelection;

    /** Gets page selection quads */
    GetSelectionQuads(): Quad[];

    /** Recognizes content on the page and returns an array of recognized objects. */
    RecognizeContent(): Drawing[];

    /**
     * Search words and returns their quads.
     *
     * @param props - The search options.
     * @returns for each result there is an array with its coordinates
     */
    Search(props: SearchProps): SearchResults;

    /**
     * Sets page rotation angle
     *
     * @param angle - The rotation angle in degrees. Must be a multiple of 90.
     */
    SetRotation(angle: number): boolean;

    /**
     * Sets page selection.
     *
     * @param selection - The selection to apply.
     */
    SetSelection(selection: PageSelection | Rect | Quad | Quad[]): boolean;
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
    /** Returns a type of the ApiParaPr class. */
    GetClassType(): "paraPr";

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    GetIndFirstLine(): number | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    GetIndLeft(): number | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    GetIndRight(): number | undefined;

    /** Returns the paragraph contents justification. */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     */
    GetSpacingAfter(): number;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     */
    GetSpacingBefore(): number;

    /** Returns the paragraph line spacing rule. */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     */
    GetSpacingLineValue(): number | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     */
    GetTabs(): TabStop[];

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    SetIndFirstLine(nValue: number): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    SetIndLeft(nValue: number): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    SetIndRight(nValue: number): boolean;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
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
     */
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;

    /**
     * Sets the spacing before the current paragraph. If the value of the isBeforeAuto parameter is true,
     * then
     * any value of the nBefore is ignored. If isBeforeAuto parameter is not specified, then
     * it will be interpreted as false.
     *
     * @param nBefore - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isBeforeAuto - The true value disables the spacing before the current paragraph.
     */
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;

    /**
     * Sets the paragraph line spacing. If the value of the sLineRule parameter is either
     * "atLeast" or "exact", then the value of nLine will be interpreted as twentieths of a point. If
     * the value of the sLineRule parameter is "auto", then the value of the
     * nLine parameter will be interpreted as 240ths of a line.
     *
     * @param nLine - The line spacing value measured either in twentieths of a point (1/1440 of an inch) or in 240ths
     *   of a line.
     * @param sLineRule - The rule that determines the measuring units of the line spacing.
     */
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies a sequence of custom tab stops which will be used for any tab characters in the current
     * paragraph.
     * **Warning**: The lengths of aPos array and aVal array **MUST BE** equal to each other.
     *
     * @param aPos - An array of the positions of custom tab stops with respect to the current page margins measured
     *   in twentieths of a point (1/1440 of an inch).
     * @param aVal - An array of the styles of custom tab stops, which determines the behavior of the tab stop and
     *   the alignment which will be applied to text entered at the current custom tab stop.
     */
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType"> {
    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @param nPos - The position where the current element will be added. If this value is not specified, then the
     *   element will be added at the end of the current paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /** Adds a line break to the current position and starts the next element from a new line. */
    AddLineBreak(): ApiRun;

    /** Adds a tab stop to the current paragraph. */
    AddTabStop(): ApiRun;

    /**
     * Adds some text to the current paragraph.
     *
     * @param text - The text that we want to insert into the current document element. It can be a string or an
     *   array of Unicode code points.
     * @param widths - An array of character widths (in millimeters). It should be the same length as the array of code
     *   points passed in the "text" parameter. When the widths are specified, the characters are added
     *   preserving these exact widths.
     */
    AddText(text: string | number[], widths?: number[]): ApiRun;

    /** Creates a paragraph copy. Ingnore comments, footnote references, complex fields. */
    Copy(): ApiParagraph;

    /**
     * Deletes the current paragraph.
     *
     * @returns returns false if paragraph haven't parent.
     */
    Delete(): boolean;

    /** Returns a type of the ApiParagraph class. */
    GetClassType(): "paragraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     */
    GetElement(nPos: number): ParagraphContent;

    /** Returns a number of elements in the current paragraph. */
    GetElementsCount(): number;

    /**
     * Returns all font names from all elements inside the current paragraph.
     *
     * @returns The font names used for the current paragraph.
     */
    GetFontNames(): string[];

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    GetIndFirstLine(): number | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    GetIndLeft(): number | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    GetIndRight(): number | undefined;

    /**
     * Returns an internal ID of the current paragraph.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /** Returns the paragraph contents justification. */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /** Returns the last Run with text in the current paragraph. */
    GetLastRunWithText(): ApiRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     */
    GetNext(): ApiParagraph | null;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     */
    GetOutlineLvl(): number | undefined;

    /** Returns the paragraph properties. */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     */
    GetPrevious(): ApiParagraph;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     */
    GetSpacingAfter(): number;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     */
    GetSpacingBefore(): number;

    /** Returns the paragraph line spacing rule. */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     */
    GetSpacingLineValue(): number | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
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
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;

    /**
     * Returns true if the paragraph has no content elements (only the paragraph end mark).
     *
     * @since 9.5.0
     */
    IsEmpty(): boolean;

    /** Returns the last element of the paragraph. */
    Last(): ParagraphContent;

    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     */
    Push(oElement: ParagraphContent): boolean;

    /**
     * Removes all the elements from the current paragraph.
     * <note>When all the elements are removed from the paragraph, a new empty run is automatically
     * created. If you want to add
     * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
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
     */
    RemoveElement(nPos: number): boolean;

    /** Selects the current paragraph. */
    Select(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of this paragraph are displayed bold.
     * @returns this
     */
    SetBold(isBold: boolean): ApiParagraph;

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Specifies that any lowercase characters in this paragraph are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current paragraph are displayed capitalized.
     * @returns this
     */
    SetCaps(isCaps: boolean): ApiParagraph;

    /**
     * Specifies that the contents of this paragraph are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current paragraph are displayed double struck through.
     * @returns this
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current paragraph.
     * @returns this
     */
    SetFontFamily(sFontFamily: string): ApiParagraph;

    /**
     * Sets the font size to the characters of the current paragraph.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this
     */
    SetFontSize(nSize: hps): ApiParagraph;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current
     * paragraph.
     *
     * @param sColor - Available highlight color.
     * @returns this
     */
    SetHighlight(sColor: highlightColor): ApiParagraph;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    SetIndFirstLine(nValue: number): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    SetIndLeft(nValue: number): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     */
    SetIndRight(nValue: number): boolean;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current paragraph are displayed italicized.
     * @returns this
     */
    SetItalic(isItalic: boolean): ApiParagraph;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
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
     */
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this
     */
    SetSpacing(nSpacing: number): ApiParagraph;

    /**
     * Sets the spacing after the current paragraph. If the value of the isAfterAuto parameter is true,
     * then
     * any value of the nAfter is ignored. If isAfterAuto parameter is not specified, then it
     * will be interpreted as false.
     *
     * @param nAfter - The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isAfterAuto - The true value disables the spacing after the current paragraph.
     */
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;

    /**
     * Sets the spacing before the current paragraph. If the value of the isBeforeAuto parameter is true,
     * then
     * any value of the nBefore is ignored. If isBeforeAuto parameter is not specified, then
     * it will be interpreted as false.
     *
     * @param nBefore - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     * @param isBeforeAuto - The true value disables the spacing before the current paragraph.
     */
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;

    /**
     * Sets the paragraph line spacing. If the value of the sLineRule parameter is either
     * "atLeast" or "exact", then the value of nLine will be interpreted as twentieths of a point. If
     * the value of the sLineRule parameter is "auto", then the value of the
     * nLine parameter will be interpreted as 240ths of a line.
     *
     * @param nLine - The line spacing value measured either in twentieths of a point (1/1440 of an inch) or in 240ths
     *   of a line.
     * @param sLineRule - The rule that determines the measuring units of the line spacing.
     */
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed with a single horizontal line through
     * the center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current paragraph are displayed struck through.
     * @returns this
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
     */
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;

    /**
     * Replaces the paragraph content with the specified text.
     *
     * @param text - The text to set.
     */
    SetText(text: string): ApiRun;

    /**
     * Sets the paragraph text properties.
     *
     * @param oTextPr - The paragraph text properties.
     * @returns returns false if param is invalid.
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current paragraph are displayed underlined.
     * @returns this
     */
    SetUnderline(isUnderline: boolean): ApiParagraph;

    /**
     * Converts the ApiParagraph object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /** Class representing a path in geometry. */
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
     */
    ArcTo(wR: GeometryCoordinate, hR: GeometryCoordinate, stAng: GeometryCoordinate, swAng: GeometryCoordinate): void;

    /**
     * Closes the current path.
     *
     * @since 9.1.0
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
     */
    CubicBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate, x3: GeometryCoordinate, y3: GeometryCoordinate): void;

    /**
     * Returns a specific path command by its index.
     *
     * @param nIndex - The path command index.
     * @since 9.1.0
     */
    GetCommand(nIndex: number): ApiPathCommand | null;

    /**
     * Returns the number of commands for the current path.
     *
     * @since 9.1.0
     */
    GetCommandCount(): number;

    /**
     * Returns all commands of the current path.
     *
     * @since 9.1.0
     */
    GetCommands(): ApiPathCommand[];

    /**
     * Returns the fill type of the current path.
     *
     * @since 9.1.0
     */
    GetFill(): PathFillType;

    /**
     * Returns the height of the current path.
     *
     * @since 9.1.0
     */
    GetHeight(): number;

    /**
     * Returns true if the current path is stroked, otherwise false.
     *
     * @since 9.1.0
     */
    GetStroke(): boolean;

    /**
     * Returns the width of the current path.
     *
     * @since 9.1.0
     */
    GetWidth(): number;

    /**
     * Draws a line from the current point to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     */
    LineTo(x: GeometryCoordinate, y: GeometryCoordinate): void;

    /**
     * Moves the current path to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
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
     */
    QuadBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate): void;

    /**
     * Sets the fill type to the current path.
     *
     * @param sFill - The path fill type.
     * @since 9.1.0
     */
    SetFill(sFill: PathFillType): void;

    /**
     * Sets the height to the current path.
     *
     * @param nHeight - The path height in EMU.
     * @since 9.1.0
     */
    SetHeight(nHeight: number): void;

    /**
     * Sets whether the current path is stroked.
     *
     * @param bStroke - Specifies if the path is stroked (true) or not (false).
     * @since 9.1.0
     */
    SetStroke(bStroke: boolean): void;

    /**
     * Sets the width to the current path.
     *
     * @param nWidth - The path width in EMU.
     * @since 9.1.0
     */
    SetWidth(nWidth: number): void;
  }

  /** Class representing a path command. */
  export interface ApiPathCommand {
    /**
     * Returns the height radius of the arc.
     *
     * @since 9.1.0
     */
    GetHR(): string | null;

    /**
     * Returns the start angle of the arc.
     *
     * @since 9.1.0
     */
    GetStartAngle(): string | null;

    /**
     * Returns the sweep angle of the arc.
     *
     * @since 9.1.0
     */
    GetSweepAngle(): string | null;

    /**
     * Returns the type of the current path command.
     *
     * @since 9.1.0
     */
    GetType(): PathCommandType;

    /**
     * Returns the width radius of the arc.
     *
     * @since 9.1.0
     */
    GetWR(): string | null;

    /**
     * Returns the X coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     */
    GetX(): string | null;

    /**
     * Returns the X coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     */
    GetX0(): string | null;

    /**
     * Returns the X coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     */
    GetX1(): string | null;

    /**
     * Returns the X coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     */
    GetX2(): string | null;

    /**
     * Returns the Y coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     */
    GetY(): string | null;

    /**
     * Returns the Y coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     */
    GetY0(): string | null;

    /**
     * Returns the Y coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     */
    GetY1(): string | null;

    /**
     * Returns the Y coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     */
    GetY2(): string | null;
  }

  /** Class representing a document picture form. */
  export interface ApiPictureForm extends ApiFormBase {
  }

  /** Class representing a polyline annotation. */
  export interface ApiPolyLineAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiPolyLineAnnotation class. */
    GetClassType(): "polyLineAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets a line end style. */
    GetEndStyle(): LineEndStyle;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets a line start style. */
    GetStartStyle(): LineEndStyle;

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /** Gets ink path list. */
    GetVertices(): Path;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets a line end style.
     *
     * @param style - The style of the polyline end endpoint.
     */
    SetEndStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets a line start style.
     *
     * @param style - The style of the polyline start endpoint.
     */
    SetStartStyle(style: LineEndStyle): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;

    /**
     * Sets vertices to polyline annot.
     *
     * @param path - polyline path
     */
    SetVertices(path: Path): boolean;
  }

  /** Class representing a polygon annotation. */
  export interface ApiPolygonAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiPolygonAnnotation class. */
    GetClassType(): "polygonAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /** Gets ink path list. */
    GetVertices(): Path;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;

    /**
     * Sets vertices to polygon annot.
     *
     * @param path - polygon path
     */
    SetVertices(path: Path): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    /** Returns a type of the ApiPresetColor class. */
    GetClassType(): "presetColor";
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    /** Returns a type of the ApiRGBColor class. */
    GetClassType(): "rgbColor";
  }

  /** Class representing a radiobutton field. */
  export interface ApiRadiobuttonField extends Omit<ApiCheckboxField, "GetClassType"> {
    /**
     * Adds options to checkbox group.
     *
     * @param pageIndex - The page where the option will be added.
     * @param rect - The option rectangle.
     * @param exportValue - The option checked value.
     */
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;

    /** Returns a type of the ApiRadiobuttonField class. */
    GetClassType(): "radiobuttonField";

    /** Checks if field will check in unison. */
    IsCheckInUnison(): boolean;

    /** Checks if the field can be toggled off. */
    IsToggleToOff(): boolean;

    /**
     * Sets field in unison prop.
     *
     * @param checkInUnison - Specifies whether fields with the same export value are checked together.
     */
    SetCheckInUnison(checkInUnison: boolean): boolean;

    /**
     * Sets whether the checked state can be toggled off.
     *
     * @param allowToggleOff - Specifies whether the checked state can be toggled off.
     */
    SetToggleToOff(allowToggleOff: boolean): boolean;
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   */
  export interface ApiRange {
  }

  export interface ApiRangeTextPr extends ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     */
    GetCaps(): boolean;

    /** Returns a type of the ApiTextPr class. */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     */
    GetSpacing(): number;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
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
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     */
    SetSpacing(nSpacing: number): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
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
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a redact annotation. */
  export interface ApiRedactAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiRedactAnnotation class. */
    GetClassType(): "redactAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a reset form action. */
  export interface ApiResetFormsAction {
    /** Returns a type of the ApiResetFormsAction class. */
    GetClassType(): "resetFormsAction";

    /** Gets names of fields to reset */
    GetNames(): string[];

    /** Will all fields be reset except the fields whose names are specified */
    IsAllExcept(): boolean;

    /** Sets all fields be reset except the fields whose names are specified */
    SetAllExcept(isAllExcept: boolean): boolean;

    /** Sets names of fields to reset */
    SetNames(names: string[]): boolean;
  }

  /** Class representing a rich content. */
  export interface ApiRichContent {
    /**
     * Adds a rich paragraph using its position in rich content.
     *
     * @param pos - The position where the rich paragraph will be added.
     * @param richPara - The rich paragraph which will be added at the current position.
     */
    AddElement(pos: number, richPara: ApiRichParagraph): boolean;

    /** Returns a type of the ApiRichContent class. */
    GetClassType(): "richContent";

    /**
     * Returns an array of rich paragraphs from the current rich content object.
     *
     * @param getCopies - Specifies if the copies of the document elements will be returned or not.
     */
    GetContent(getCopies: boolean): ApiRichParagraph[];

    /** Returns the current paragraph where the cursor is located. */
    GetCurrentParagraph(): ApiRichParagraph;

    /** Returns the current run where the cursor is located. */
    GetCurrentRun(): ApiRichRun;

    /**
     * Returns an rich paragraph by its position in the content.
     *
     * @param pos - The element position that will be taken from the content.
     */
    GetElement(pos: number): ApiRichParagraph;

    /**
     * Pushes a rich paragraph to a rich content.
     *
     * @param richPara - The rich paragraph which will be pushed to the rich content.
     */
    Push(richPara: ApiRichParagraph): boolean;
  }

  /** Class representing the rich paragraph properties. */
  export interface ApiRichParaPr {
    /** Returns a type of the ApiRichParaPr class. */
    GetClassType(): "richParaPr";
  }

  /** Class representing a rich paragraph. */
  export interface ApiRichParagraph extends Omit<ApiRichParaPr, "GetClassType"> {
    /**
     * Adds an element to the current paragraph.
     *
     * @param richRun - The element which will be added at the current position.
     * @param pos - The position where the current element will be added. If this value is not specified, then the
     *   element will be added at the end of the current paragraph.
     */
    AddElement(richRun: ApiRichRun, pos?: number): boolean;

    /**
     * Adds some text to the current paragraph.
     *
     * @param text - The text that we want to insert into the current paragraph.
     */
    AddText(text: string): ApiRichRun;

    /** Creates a paragraph copy. */
    Copy(): ApiRichParagraph;

    /** Returns a type of the ApiRichParagraph class. */
    GetClassType(): "richParagraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param pos - The position where the element which content we want to get must be located.
     */
    GetElement(pos: number): ApiRichRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     */
    GetNext(): ApiRichParagraph;

    /** Returns the paragraph properties. */
    GetParaPr(): ApiRichParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     */
    GetPrevious(): ApiRichParagraph;

    /** Returns the last element of the paragraph. */
    Last(): ApiRichRun;

    /**
     * Adds an element to the current paragraph.
     *
     * @param richRun - The element to add at the end of the paragraph.
     */
    Push(richRun: ParagraphContent): boolean;

    /**
     * Sets the paragraph properties.
     *
     * @param paraPr - The paragraph properties to apply.
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
     */
    SetReadingOrder(readingOrder?: ReadingOrder): ApiRichParagraph;
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRichRun extends Omit<ApiRichTextPr, "GetClassType"> {
    /** Creates a copy of the current run. */
    Copy(): ApiRichRun;

    /** Returns a type of the ApiRichRun class. */
    GetClassType(): "richRun";

    /** Returns a parent paragraph of the current run. */
    GetParentParagraph(): ApiRichParagraph;

    /** Returns the text properties of the current run. */
    GetTextPr(): ApiRichTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param textPr - The text properties that will be set to the current run.
     */
    SetTextPr(textPr: ApiRichTextPr): ApiRichTextPr;
  }

  /** Class representing the rich text properties. */
  export interface ApiRichTextPr {
    /** Returns a type of the ApiRichTextPr class. */
    GetClassType(): "richTextPr";
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType"> {
    /** Adds a line break to the current run position and starts the next element from a new line. */
    AddLineBreak(): boolean;

    /** Adds a tab stop to the current run. */
    AddTabStop(): boolean;

    /**
     * Adds some text to the current run.
     *
     * @param text - The text which will be added to the current run. It can be a string or an array of Unicode code
     *   points.
     * @param widths - An array of character widths (in millimeters). It should be the same length as the array of code
     *   points passed in the "text" parameter. When the widths are specified, the characters are added
     *   preserving these exact widths.
     */
    AddText(text: string | number[], widths?: number[]): boolean;

    /** Clears the content from the current run. */
    ClearContent(): boolean;

    /** Creates a copy of the current run. */
    Copy(): ApiRun;

    /** Deletes the current run. */
    Delete(): boolean;

    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     */
    GetCaps(): boolean;

    /** Returns a type of the ApiRun class. */
    GetClassType(): "run";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     */
    GetFontFamily(): string;

    /**
     * Returns all font names from all elements inside the current run.
     *
     * @returns The font names used for the current run.
     */
    GetFontNames(): string[];

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     */
    GetSpacing(): number;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     */
    GetTextFill(): ApiFill;

    /** Returns the text properties of the current run. */
    GetTextPr(): ApiTextPr;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     */
    GetUnderline(): boolean;

    /** Removes all the elements from the current run. */
    RemoveAllElements(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
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
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     */
    SetSpacing(nSpacing: number): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param oTextPr - The text properties that will be set to the current run.
     */
    SetTextPr(oTextPr: ApiTextPr): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
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
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    /** Returns a type of the ApiSchemeColor class. */
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
    /** Returns a type of the ApiShadow class. */
    GetClassType(): "shadow";

    /**
     * Returns the settings of the current shadow.
     *
     * @since 9.5.0
     */
    GetSettings(): ShadowSettings;
  }

  /** Class representing a shape. */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType"> {
    /** Returns the type of the ApiShape class. */
    GetClassType(): "shape";

    /** Returns the shape inner contents where a paragraph or text runs can be inserted. */
    GetContent(): ApiDocumentContent;

    /** Returns the shape inner contents where a paragraph or text runs can be inserted. */
    GetDocContent(): ApiDocumentContent;

    /** Gets the fill properties from the current shape. */
    GetFill(): ApiFill | null;

    /** Returns the geometry object from the current shape. */
    GetGeometry(): ApiGeometry;

    /** Gets the outline properties from the current shape. */
    GetLine(): ApiStroke | null;

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Returns the text autofit type of the current shape.
     *
     * @returns The text autofit type.
     * @since 9.5.0
     */
    GetTextFit(): TextFitType;

    /** Gets the vertical alignment from the shape content where a paragraph or text runs can be inserted. */
    GetVerticalTextAlign(): VerticalTextAlign;

    /**
     * Sets the fill properties to the current shape.
     *
     * @param fill - The fill type used to fill the shape.
     * @returns returns false if param is invalid.
     */
    SetFill(fill: ApiFill): boolean;

    /**
     * Sets a custom geometry for the current shape.
     *
     * @param geometry - The geometry to set.
     */
    SetGeometry(geometry: ApiGeometry): boolean;

    /**
     * Sets the outline properties to the current shape.
     *
     * @param stroke - The stroke used to create the shape outline.
     * @returns returns false if param is invalid.
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
     */
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;

    /**
     * Sets the text autofit type to the current shape.
     *
     * @param fitType - The text autofit type.
     * @returns returns false if the type is invalid or the shape doesn't exist.
     * @since 9.5.0
     */
    SetTextFit(fitType: TextFitType): boolean;

    /**
     * Sets the vertical alignment to the shape content where a paragraph or text runs can be inserted.
     *
     * @param verticalAlign - The type of the vertical alignment for the shape inner contents.
     */
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /**
   * Class representing a signature field.
   *
   * @since 9.5.0
   */
  export interface ApiSignatureField extends Omit<ApiButtonField, "GetClassType"> {
    /**
     * Returns a type of the ApiSignatureField class.
     *
     * @since 9.5.0
     */
    GetClassType(): "signatureField";

    /**
     * Sets image for all button field widgets
     *
     * @param imageUrl - The URL of the image to set for the button.
     * @since 9.4.0
     */
    SetValue(imageUrl: string): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a group of drawings. */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType"> {
    /** Returns a type of the ApiSmartArt class. */
    GetClassType(): "smartArt";

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a square annotation. */
  export interface ApiSquareAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiSquareAnnotation class. */
    GetClassType(): "squareAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets annotation rect difference. */
    GetRectDiff(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation rect difference.
     *
     * @param rectDiff - A set of four numbers that shall describe the numerical differences between two rectangles.
     */
    SetRectDiff(rectDiff: RectDiff): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a stamp annotation. */
  export interface ApiStampAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiStampAnnotation class. */
    GetClassType(): "stampAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets stamp rotate. */
    GetRotation(): Degree;

    /** Gets stamp size scale. */
    GetScale(): number;

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets stamp type. */
    GetType(): StampType;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets stamp rotate.
     *
     * @param angle - The rotation angle in degrees.
     */
    SetRotation(angle: Degree): boolean;

    /**
     * Sets stamp size scale.
     *
     * @param scale - size scale
     */
    SetScale(scale: number): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a strikeout annotation. */
  export interface ApiStrikeoutAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiStrikeoutAnnotation class. */
    GetClassType(): "strikeoutAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a stroke. */
  export interface ApiStroke {
    /**
     * Returns the beginning arrow properties of the stroke.
     *
     * @since 9.5.0
     */
    GetBeginArrow(): object | null;

    /** Returns a type of the ApiStroke class. */
    GetClassType(): "stroke";

    /**
     * Gets the dash type of the stroke.
     *
     * @returns returns dash type ("solid", "dash", etc.) or null.
     */
    GetDashType(): DashType | null;

    /**
     * Returns the ending arrow properties of the stroke.
     *
     * @since 9.5.0
     */
    GetEndArrow(): object | null;

    /** Gets the fill (color) of the stroke. */
    GetFill(): ApiFill | null;

    /** Gets the width of the stroke in English Metric Units. */
    GetWidth(): number | null;

    /**
     * Sets the beginning arrow of the stroke.
     *
     * @param type - The type of the beginning arrow.
     * @param width - The width of the beginning arrow.
     * @param length - The length of the beginning arrow.
     * @since 9.5.0
     */
    SetBeginArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;

    /**
     * Sets the ending arrow of the stroke.
     *
     * @param type - The type of the ending arrow.
     * @param width - The width of the ending arrow.
     * @param length - The length of the ending arrow.
     * @since 9.5.0
     */
    SetEndArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /** Class representing a table. */
  export interface ApiTable extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Adds a new column to the end of the current table.
     *
     * @param referenceCell - The cell used as an insertion reference.
     * @param before - Add a new column before or after the specified cell. If no cell is specified, then this
     *   parameter will be ignored.
     */
    AddColumn(referenceCell?: ApiTableCell, before?: boolean): boolean;

    /**
     * Adds the new columns to the current table.
     *
     * @param oCell - The cell after which the new columns will be added. If not specified, the new columns will be
     *   added at the end of the table.
     * @param nCount - Count of columns to be added.
     * @param isBefore - Adds the new columns before (true) or after (false) the specified cell.
     * @since 9.5.0
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
     */
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new row to the current table.
     *
     * @param referenceCell - The cell used as an insertion reference.
     * @param isBefore - Adds a new row before or after the specified cell. If no cell is specified, then this parameter
     *   will be ignored.
     */
    AddRow(referenceCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;

    /**
     * Adds the new rows to the current table.
     *
     * @param oCell - The cell after which the new rows will be added. If not specified, the new rows will be added at
     *   the end of the table.
     * @param nCount - Count of rows to be added.
     * @param isBefore - Adds the new rows before (true) or after (false) the specified cell.
     * @since 9.5.0
     */
    AddRows(nCount: number): ApiTable;
    AddRows(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;

    /**
     * Returns a cell by its position.
     *
     * @param rowIndex - The row index in the current table.
     * @param cellIndex - The cell index in the specified row.
     * @since 9.5.0
     */
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell;

    /** Returns the type of the ApiTable object. */
    GetClassType(): "table";

    /**
     * Returns the width of the specified column (by index) of the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @since 9.5.0
     */
    GetColumnWidth(columnIndex: number): number | null;

    /** Returns the type of the ApiDrawing class. */
    GetParentPage(): ApiPage;

    /** Gets the x position of the drawing on the page. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the page. */
    GetPosY(): number;

    /**
     * Returns a row by its index.
     *
     * @param rowIndex - The zero-based row index in the table.
     */
    GetRow(rowIndex: number): ApiTableRow;

    /**
     * Returns a number of rows in the current table.
     *
     * @since 9.5.0
     */
    GetRowsCount(): number;

    /**
     * Returns the selected cells of the current table.
     *
     * @returns An array of the currently selected cells (empty if there is no cell selection).
     * @since 9.5.0
     */
    GetSelectedCells(): ApiTableCell[];

    /**
     * Returns all cells from the columns that contain the currently selected cells.
     * This method identifies which columns contain selected cells and then returns all cells
     * in those columns, not just the selected cells themselves.
     *
     * @returns An array of all cells from the columns that contain selected cells.
     * @since 9.5.0
     */
    GetSelectedColumnsCells(): ApiTableCell[];

    /**
     * Returns the rows that contain the currently selected cells of the current table.
     *
     * @returns An array of the rows that contain selected cells (empty if there is no cell selection).
     * @since 9.5.0
     */
    GetSelectedRows(): ApiTableRow[];

    /**
     * Returns the table description.
     *
     * @since 9.5.0
     */
    GetTableDescription(): string;

    /** Gets table look properties */
    GetTableLook(): TableLook;

    /**
     * Returns the table title.
     *
     * @since 9.5.0
     */
    GetTableTitle(): string;

    /**
     * Merges an array of cells. If merge is successful, it will return merged cell, otherwise "null".
     * **Warning**: The number of cells in any row and the number of rows in the current table may be
     * changed.
     *
     * @param cells - The cells to merge.
     */
    MergeCells(cells: ApiTableCell[]): ApiTableCell;

    /**
     * Removes a table column with the specified cell.
     *
     * @param columnCell - A cell from the column to remove.
     * @returns result of deletion
     */
    RemoveColumn(columnCell: ApiTableCell): boolean;

    /**
     * Removes a table row with the specified cell.
     *
     * @param rowCell - A cell from the row to remove.
     * @returns result of deletion
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
     */
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;

    /**
     * Sets the background color for all cells in the current table.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.5.0
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the width of the specified column in the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @param width - The column width measured in English measure units.
     * @returns Returns the actual column width set (in EMU), or null if the column index is invalid.
     * @since 9.5.0
     */
    SetColumnWidth(columnIndex: number, width: number): number | null;

    /**
     * Sets the total height of the current table, distributing it evenly among the table rows.
     * The value is applied as a minimum height for each row, so a row can be taller if its content
     * requires more space.
     *
     * @param nValue - The table height in English measure units.
     * @returns Returns the requested height (in EMU), or null if the table has no rows.
     * @since 9.5.0
     */
    SetHeight(nValue: number): number | null;

    /**
     * Sets the x position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the page.
     *
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the page.
     *
     * @param posX - The distance from the left side of the page to the left side of the drawing measured in English
     *   measure units.
     * @param posY - The distance from the top side of the page to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(posX: number, posY: number): boolean;

    /**
     * Specifies the shading which shall be applied to the extents of the current table.
     *
     * @param shadingType - The shading type or fill to apply.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;

    /**
     * Sets the table size.
     *
     * @param width - The table width measured in English measure units.
     * @param height - The table height measured in English measure units.
     * @since 9.5.0
     */
    SetSize(width: number, height: number): boolean;

    /**
     * Sets the style for the current table.
     *
     * @param oStyle - The table style to apply.
     * @since 9.5.0
     */
    SetStyle(oStyle: ApiStyle): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     * @since 9.5.0
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
     */
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): boolean;

    /**
     * Sets the table title.
     *
     * @param sTitle - The table title to be set.
     * @since 9.5.0
     */
    SetTableTitle(sTitle: string): boolean;
  }

  /** Class representing a table cell. */
  export interface ApiTableCell {
    /**
     * Appends text to the end of the cell content.
     *
     * @param text - The text to append.
     * @since 9.4.0
     */
    AddText(text: string): ApiRun;

    /**
     * Returns the background color of the current table cell.
     *
     * @since 9.5.0
     */
    GetBackgroundColor(): ApiColor | null;

    /** Returns the type of the ApiTableCell class. */
    GetClassType(): "tableCell";

    /** Returns the current cell content. */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the next cell if exists.
     *
     * @returns returns null if cell is last.
     * @since 9.5.0
     */
    GetNext(): ApiTableCell | null;

    /**
     * Returns a parent row of the current cell.
     *
     * @returns returns null if parent row doesn't exist.
     * @since 9.5.0
     */
    GetParentRow(): ApiTableRow | null;

    /**
     * Returns a parent table of the current cell.
     *
     * @returns returns null if parent table doesn't exist.
     * @since 9.5.0
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous cell if exists.
     *
     * @returns returns null is cell is first.
     * @since 9.5.0
     */
    GetPrevious(): ApiTableCell | null;

    /**
     * Returns an index of the parent row.
     *
     * @since 9.5.0
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
     * @since 9.4.0
     */
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;

    /**
     * Selects the current table cell.
     *
     * @since 9.5.0
     */
    Select(): boolean;

    /**
     * Sets the background color of the current cell.
     *
     * @param color - If not passed, the background color will be cleared (see arguments below for RGB triplet form).
     * @since 9.5.0
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border which shall be displayed at the bottom of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     */
    SetCellBorderBottom(borderWidth: number, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the left of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     */
    SetCellBorderLeft(borderWidth: number, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the right of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     */
    SetCellBorderRight(borderWidth: number, fill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the top of the current table cell.
     *
     * @param borderWidth - The width of the current border.
     * @param fill - The color or pattern used to fill the current border.
     */
    SetCellBorderTop(borderWidth: number, fill: ApiFill): boolean;

    /**
     * Specifies an amount of space which shall be left between the bottom extent of the cell contents and
     * the border
     * of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell bottom margin with specified value for the current cell.
     */
    SetCellMarginBottom(margin: number): boolean;

    /**
     * Specifies an amount of space which shall be left between the left extent of the current cell
     * contents and the
     * left edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell left margin with specified value for the current cell.
     */
    SetCellMarginLeft(margin: number): boolean;

    /**
     * Specifies an amount of space which shall be left between the right extent of the current cell
     * contents and the
     * right edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell right margin with specified value for the current cell.
     */
    SetCellMarginRight(margin: number): boolean;

    /**
     * Specifies an amount of space which shall be left between the top extent of the current cell contents
     * and the
     * top edge border of a specific individual table cell within a table.
     *
     * @param margin - The cell margin. If this value is `null`, the default margin is used. otherwise override the
     *   table cell top margin with specified value for the current cell.
     */
    SetCellMarginTop(margin: number): boolean;

    /**
     * Sets the background color to all cells in the column containing the current cell.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.5.0
     */
    SetColumnBackgroundColor(color?: ApiColor): boolean;

    /**
     * Specifies the shading which shall be applied to the extents of the current table cell.
     *
     * @param shadingType - The shading type or fill to apply.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;

    /**
     * Replaces all content of the current table cell with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     */
    SetText(text: string): ApiRun;

    /**
     * Specifies the direction of the text flow for the current table cell.
     *
     * @param textDirection - The text flow direction.
     */
    SetTextDirection(textDirection: TextFlowDirection): boolean;

    /**
     * Specifies the vertical alignment for text within the current table cell.
     *
     * @param verticalAlign - The vertical alignment type.
     */
    SetVerticalAlign(verticalAlign: VerticalTextAlign): boolean;

    /**
     * Specifies the preferred width for this cell.
     *
     * @param sType - The type of the width value.
     * @param nValue - The table width value measured in positive integers.
     * @since 9.5.0
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
  }

  /** Class representing a table row. */
  export interface ApiTableRow extends ApiTableRowPr {
    /**
     * Returns a cell by its position in the current row.
     *
     * @param cellIndex - The zero-based cell index in the table row.
     */
    GetCell(cellIndex: number): ApiTableCell;

    /** Returns a number of cells in the current row. */
    GetCellsCount(): number;

    /** Returns the type of the ApiTableRow class. */
    GetClassType(): "tableRow";

    /** Gets the height from the current table row. */
    GetHeight(): number;

    /**
     * Returns the next row if exists.
     *
     * @returns returns null if row is last.
     * @since 9.5.0
     */
    GetNext(): ApiTableRow | null;

    /**
     * Returns the parent table of the current row.
     *
     * @returns returns null if parent table doesn't exist.
     * @since 9.5.0
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous row if exists.
     *
     * @returns returns null if row is first.
     * @since 9.5.0
     */
    GetPrevious(): ApiTableRow | null;

    /**
     * Sets the height to the current table row.
     *
     * @param height - The row height in English measure units.
     */
    SetHeight(height: number): boolean;
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

  /** Class representing a text annotation. */
  export interface ApiTextAnnotation extends ApiBaseAnnotation {
    /**
     * Adds reply on this annot.
     *
     * @param textAnnot - The text annotation to use as a reply.
     */
    AddReply(textAnnot: ApiTextAnnotation): boolean;

    /** Removes annotation from document. */
    Delete(): boolean;

    /** Gets annotation author name. */
    GetAuthorName(): string;

    /** Gets annotation border color. */
    GetBorderColor(): ApiColor;

    /** Gets annotation border effect intensity. */
    GetBorderEffectIntensity(): number;

    /** Gets annotation border effect style. */
    GetBorderEffectStyle(): AnnotBorderEffectStyle;

    /** Gets annotation border style. */
    GetBorderStyle(): AnnotBorderStyle;

    /** Gets annotation border width. */
    GetBorderWidth(): number;

    /** Returns a type of the ApiTextAnnotation class. */
    GetClassType(): "textAnnot";

    /** Gets annotation contents. */
    GetContents(): string;

    /** Gets annotation creation date. */
    GetCreationDate(): number;

    /** Gets annotation dash pattern. */
    GetDashPattern(): number[];

    /** Gets annotation display type. */
    GetDisplay(): DisplayType;

    /** Gets annotation fill color. */
    GetFillColor(): ApiColor;

    /** Gets icon type of this annotation. */
    GetIconType(): TextIconType;

    /** Gets annotation last modification date. */
    GetModDate(): number;

    /** Gets annotation opacity. */
    GetOpacity(): string;

    /** Gets annotation position. */
    GetPosition(): Point;

    /** Gets annotation rect. */
    GetRect(): Rect;

    /** Gets replies on this annot. */
    GetReplies(): ApiTextAnnotation[];

    /** Gets annotation subject. */
    GetSubject(): string;

    /** Gets annotation unique name. */
    GetUniqueName(): string;

    /**
     * Sets annotation author name.
     *
     * @param name - The author name.
     */
    SetAuthorName(name: string): boolean;

    /**
     * Sets annotation border color.
     *
     * @param color - The border color.
     */
    SetBorderColor(color: ApiColor): boolean;

    /**
     * Sets annotation border effect intensity.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param value - The border effect intensity. Must be greater than or equal to 0.
     */
    SetBorderEffectIntensity(value: number): boolean;

    /**
     * Sets annotation border effect style.
     * <note> Can be applied to circle, square, freeText and polygon annotations </note>
     *
     * @param style - The border effect style: **"none"** or **"cloud"**.
     */
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;

    /**
     * Sets annotation border style.
     *
     * @param borderStyle - The border style: **"solid"** or **"dashed"**.
     */
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;

    /**
     * Sets annotation border width.
     *
     * @param width - The border width in points.
     */
    SetBorderWidth(width: number): boolean;

    /**
     * Sets annotation contents.
     *
     * @param contents - The annotation text contents.
     */
    SetContents(contents: string): boolean;

    /**
     * Sets annotation creation date.
     *
     * @param timeStamp - The annotation creation date as a numeric timestamp.
     */
    SetCreationDate(timeStamp: number): boolean;

    /**
     * Sets annotation dash pattern.
     * <note> The border style property must be set to "dashed". </note>
     *
     * @param pattern - A dash array defining a pattern of dashes and gaps to be used in drawing a dashed border. For
     *   example, a value of [3, 2] specifies a border drawn with 3-point dashes alternating with 2-point
     *   gaps.
     */
    SetDashPattern(pattern: number[]): boolean;

    /**
     * Sets annotation display type.
     *
     * @param display - The display type for the annotation.
     */
    SetDisplay(display: DisplayType): boolean;

    /**
     * Sets annotation fill color.
     *
     * @param color - color to set fill (omit the argument to set no fill)
     */
    SetFillColor(color: ApiColor): boolean;

    /**
     * Sets icon type for this annotation.
     *
     * @param iconType - The icon type for the text annotation.
     */
    SetIconType(iconType: TextIconType): boolean;

    /**
     * Sets annotation last modification date.
     *
     * @param timeStamp - The annotation last modification date as a numeric timestamp.
     */
    SetModDate(timeStamp: number): boolean;

    /**
     * Sets annotation opacity.
     *
     * @param value - The opacity value from 0 (transparent) to 100 (opaque).
     */
    SetOpacity(value: percentage): boolean;

    /**
     * Sets annotation position.
     *
     * @param position - The new position of the annotation.
     */
    SetPosition(position: Point): boolean;

    /**
     * Sets annotation rect.
     *
     * @param rect - The new bounding rectangle for the annotation.
     */
    SetRect(rect: Rect): boolean;

    /**
     * Sets annotation subject.
     *
     * @param subject - The annotation subject text.
     */
    SetSubject(subject: string): boolean;

    /**
     * Sets annotation unique name.
     *
     * @param name - The unique name for the annotation.
     */
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a text field. */
  export interface ApiTextField extends ApiBaseField {
    /**
     * Adds new widget - visual representation for field
     *
     * @param pageIndex - page index to add widget
     * @param rect - field rect
     */
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;

    /** Clears format of field. */
    ClearFormat(): boolean;

    /** Removes field from document. */
    Delete(): boolean;

    /**
     * Gets array with widgets of the current field.
     *
     * @returns returns emptry array if the field is not added to the document.
     */
    GetAllWidgets(): ApiWidget[];

    /**
     * Gets the text field character limit.
     * <note> Char limit 0 means field doesn't have char limit
     */
    GetCharLimit(): number;

    /** Returns a type of the ApiTextField class. */
    GetClassType(): "textField";

    /** Gets formatted value of a field. */
    GetFormattedValue(): string;

    /** Gets field full name. */
    GetFullName(): string;

    /** Gets field partial name. */
    GetPartialName(): string;

    /** Gets text field placeholder. */
    GetPlaceholder(): string;

    /** Gets text widget regular validate expression. */
    GetRegularExp(): boolean;

    /** Gets field value */
    GetValue(): string | string[];

    /** Checks if the text field uses comb formatting. */
    IsComb(): boolean;

    /** Checks if text field is multiline. */
    IsMultiline(): boolean;

    /** Checks if field is read only */
    IsReadOnly(): boolean;

    /** Checks if field is required */
    IsRequired(): boolean;

    /** Checks if text field can scroll long text. */
    IsScrollLongText(): boolean;

    /**
     * Sets the text field character limit.
     * <note> Character limit 0 means the field doesn't have a character limit.
     *
     * @param charLimit - The maximum number of characters allowed in the field.
     */
    SetCharLimit(charLimit: number): boolean;

    /**
     * Sets whether the text field uses comb formatting.
     * <note>The character limit must be greater than 0.</note>
     *
     * @param comb - Specifies whether comb formatting is enabled.
     */
    SetComb(comb: boolean): boolean;

    /**
     * Sets date format for field.
     *
     * @param format - date format (e.g. "dd.mm.yyyy")
     */
    SetDateFormat(format: string): boolean;

    /**
     * Sets new field name if possible.
     *
     * @param name - The new full name for the field.
     */
    SetFullName(name: string): boolean;

    /**
     * Sets the input mask for entered text.
     *
     * @param inputMask - The input mask (e.g. "(999)999-9999").
     */
    SetMask(inputMask: string): boolean;

    /**
     * Sets text field multiline prop.
     *
     * @param multiline - will the field be multiline
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
     */
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;

    /**
     * Sets new field partial name.
     *
     * @param name - The new partial name for the field.
     */
    SetPartialName(name: string): boolean;

    /**
     * Sets percentage format for field.
     *
     * @param decimalPlaces - The number of digits after the decimal point.
     * @param separatorStyle - The number separator style.
     */
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;

    /**
     * Sets text field placeholder.
     *
     * @param sPlaceholder - field placeholder
     */
    SetPlaceholder(sPlaceholder: string): boolean;

    /**
     * Sets field read only
     *
     * @param readOnly - Specifies whether the field is read-only.
     */
    SetReadOnly(readOnly: boolean): boolean;

    /**
     * Sets regular expression validate string for field.
     *
     * @param regularExpression - The validation regular expression (e.g. "\\S+@\\S+\\.\\S+")
     */
    SetRegularExp(regularExpression: string): boolean;

    /**
     * Sets field required
     *
     * @param required - Specifies whether the field is required.
     */
    SetRequired(required: boolean): boolean;

    /**
     * Sets whether the text field can scroll long text.
     *
     * @param allowScroll - Specifies whether long text can be scrolled.
     */
    SetScrollLongText(allowScroll: boolean): boolean;

    /**
     * Sets special format for field.
     *
     * @param format - the formatting style to apply to the value
     */
    SetSpecialFormat(format: PsfFormat): boolean;

    /**
     * Sets time format for field.
     *
     * @param format - available time format
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
     */
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;

    /**
     * Sets field value
     *
     * @param value - The new value for the field.
     */
    SetValue(value: string): boolean;
  }

  /** Class representing a document text field. */
  export interface ApiTextForm extends ApiFormBase {
  }

  /** Class representing the text properties. */
  export interface ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     */
    GetCaps(): boolean;

    /** Returns a type of the ApiTextPr class. */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     */
    GetSpacing(): number;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
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
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     */
    SetSpacing(nSpacing: number): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed along with a line appearing directly below the
     * character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
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
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a underline annotation. */
  export interface ApiUnderlineAnnotation extends ApiBaseMarkupAnnotation {
    /** Returns a type of the ApiUnderlineAnnotation class. */
    GetClassType(): "underlineAnnot";

    /** Gets quads from current markup annotation. */
    GetQuads(): Quad[];

    /**
     * Sets quads to current markup annotation.
     *
     * @param quads - An array of quadrilaterals defining the highlighted regions.
     */
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
    /** Returns a type of the ApiUniColor class. */
    GetClassType(): "uniColor";
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
    /** Returns a type of the ApiUnsupported class. */
    GetClassType(): "unsupported";
  }

  /** Class representing a uri action. */
  export interface ApiUriAction {
    /** Returns a type of the ApiUriAction class. */
    GetClassType(): "uriAction";

    /** Gets uri string */
    GetUri(): string;

    /** Sets uri to action */
    SetUri(uri: string): boolean;
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  export type EditorEventArgs = {
    /** The function called was when selection was canceled. */
    onSelectionCancel: [];
    /** The function called to when selection was ended. */
    onSelectionEnd: [page: number, x: number, y: number];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
