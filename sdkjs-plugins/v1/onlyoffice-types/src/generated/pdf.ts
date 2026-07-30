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

  /** The type of a fill which uses an image as a background.<b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface.<b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface. */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type which will be added to the document element.<b>"none"</b> - no border will be added to the created element or the selected element side.<b>"single"</b> - a single border will be added to the created element or the selected element side. */
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

  /** Possible values for the caption numbering format.<b>"ALPHABETIC"</b> - upper letter.<b>"alphabetic"</b> - lower letter.<b>"Roman"</b> - upper Roman.<b>"roman"</b> - lower Roman.<b>"Arabic"</b> - arabic. */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator.<b>"hyphen"</b> - the "-" punctuation mark.<b>"period"</b> - the "." punctuation mark.<b>"colon"</b> - the ":" punctuation mark.<b>"longDash"</b> - the "—" punctuation mark.<b>"dash"</b> - the "-" punctuation mark. */
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
    value: string;
    label: string;
  }

  /** A dictionary of users and their comments. */
  export interface CommentReport {
    username?: UserComments;
  }

  /** Represents a single comment record. */
  export interface CommentReportRecord {
    IsAnswer: boolean;
    CommentMessage: string;
    Date: number;
    DateUTC: number;
    QuoteText?: string;
  }

  /** The checkbox content control properties */
  export interface ContentControlCheckBoxPr {
    checked?: boolean;
    checkedSymbol?: string;
    uncheckedSymbol?: string;
  }

  /** The date picker content control properties. */
  export interface ContentControlDatePr {
    format: string;
    lang: string;
  }

  /** The object representing the items in the combo box or drop-down list. */
  export interface ContentControlListItem {
    display: string;
    value: string;
  }

  /** Represents an attribute of an XML node. */
  export interface CustomXmlNodeAttribute {
    name: string;
    value: string;
  }

  /** Available dash type for line. */
  export type DashType = "dash" | "dashDot" | "dot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "solid" | "sysDash" | "sysDashDot" | "sysDashDotDot" | "sysDot";

  /** Degree defines an angle in degrees.Can be any finite number (positive or negative). */
  export type Degree = number;

  /** The available display types. */
  export type DisplayType = "visible" | "hidden" | "noPrint" | "noView";

  export interface DocQuads {
    pageIndex?: Quad[];
  }

  export interface DocSelection {
    start: PagePoint;
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
    key: string;
    value: string | boolean;
    tag: string;
    type: FormSpecificType;
    role?: string;
    roleColor?: string;
    options?: ChoiceOption[] | CheckboxOption[];
    label?: string;
    format?: string;
    lang?: string;
  }

  /** The specific form type. */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /** Form type.The available form types. */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** FreeText callout coordinates (Array of 3 points). */
  export interface FreeTextCallout {
    0: Point;
    1: Point;
    2: Point;
  }

  /** The available free text annot intent. */
  export type FreeTextIntent = "freeText" | "freeTextCallout";

  /** The coordinate value for the geometry paths.Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections.<b>"default"</b> - a header or footer which can be applied to any default page.<b>"title"</b> - a header or footer which is applied to the title page.<b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default). */
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
    0: string;
    1: string;
  }

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** NumberNegStyle defines the formatting style for negative numbers:- "black-minus" — "-1,234.56" (black minus sign)- "red-minus"   — "-1,234.56" (red minus sign)- "black-parens" — "(1,234.56)"" (black parentheses)- "red-parens"   — "(1,234.56)"" (red parentheses) */
  export type NumberNegStyle = "black-minus" | "red-minus" | "black-parens" | "red-parens";

  /** NumberSepStyle — defines number formatting style:- "us"        — 1,234.56   (English style)- "plain"     — 1234.56    (No separators)- "euro"      — 1.234,56   (European style)- "europlain" — 1234,56    (European without separators)- "ch"        — 1'234.56   (Swiss style) */
  export type NumberSepStyle = "us" | "plain" | "euro" | "europlain" | "ch";

  export interface PagePoint {
    page: number;
    point: Point;
  }

  export interface PageSelection {
    start: Point;
    end: Point;
  }

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

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
    x: number;
    y: number;
  }

  /** 60000th of a degree (5400000 = 90 degrees). */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%). */
  export type PositivePercentage = number;

  /** The available preset color names. */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** PsfFormat defines the type of formatting to apply:- "zip"       — ZIP code (e.g., 12345)- "zip+4"     — ZIP+4 (e.g., 12345-6789)- "phone"     — Phone number (e.g., (123) 456-7890)- "ssn"       — Social Security Number (e.g., 123-45-6789) */
  export type PsfFormat = "zip" | "zip+4" | "phone" | "ssn";

  /** Quadrilateral represented as a flat tuple of vertices.Vertices order is fixed: · left-top → right-top → left-bottom → right-bottomInvariants: · x1 <= x2 (top edge goes left → right) · x3 <= x4 (bottom edge goes left → right) · y1 <= y3 (left edge goes top → bottom) · y2 <= y4 (right edge goes top → bottom) */
  export interface Quad {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
  }

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** Axis-aligned rectangle represented as a tuple.Invariants: - rect[0] < rect[2] (x1 < x2) - rect[1] < rect[3] (y1 < y2) */
  export interface Rect {
    0: number;
    1: number;
    2: number;
    3: number;
  }

  /** Axis-aligned rectangle difference represented as a tuple.Describes coordinate-wise deltas between two rectangles (B - A).Invariants: - diff[0] = x1B - x1A - diff[1] = y1B - y1A - diff[2] = x2B - x2A - diff[3] = y2B - y2A */
  export interface RectDiff {
    0: number;
    1: number;
    2: number;
    3: number;
  }

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from. */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from. */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** A dictionary of users and their review changes. */
  export interface ReviewReport {
    username?: UserReviewChanges;
  }

  /** Represents a single review change record. */
  export interface ReviewReportRecord {
    Type: ReviewReportRecordType;
    Value?: string;
    Date: number;
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
    text: string;
    matchCase: boolean;
    wholeWords: boolean;
  }

  /** Represents a collection of search results. */
  export type SearchResults = SearchMatch[];

  /** The section break type which defines how the contents of the current section are placed relative to the previous section.WordprocessingML supports five distinct types of section breaks:<b>Next page</b> ("nextPage") - starts a new section on the next page (the default value).<b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page.<b>Even</b> ("evenPage") - starts a new section on the next even-numbered page.<b>Continuous</b> ("continuous") - starts a new section in the next paragraph.This means that continuous section breaks might not specify certain page-level section properties,since they shall be inherited from the following section.However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings.<b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
  export type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

  /** Properties used to create a shadow. */
  export interface ShadowSettings {
    color?: ApiUniColor;
    transparency?: number;
    offsetX?: number;
    offsetY?: number;
    size?: number;
    rotateWithShape?: boolean;
  }

  /** This type specifies the preset shape geometry that will be used for a shape. */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    Type: ShdType;
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element. */
  export type ShdType = "nil" | "clear";

  /** The possible values for the base which the relative horizontal size of an object will be calculated from. */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical size of an object will be calculated from. */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The available stamp types. */
  export type StampType = "D_Approved" | "D_Revised" | "D_Reviewed" | "D_Received" | "SB_Approved" | "SB_NotApproved" | "SB_Revised" | "SB_Confidential" | "SB_ForComment" | "SB_ForPublicRelease" | "SB_NotForPublicRelease" | "SB_PreliminaryResults" | "SB_InformationOnly" | "SB_Draft" | "SB_Completed" | "SB_Final" | "SB_Void" | "SH_SignHere" | "SH_Witness" | "SH_InitialHere" | "Expired";

  /** The style type used for the document element. */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Custom tab types. */
  export type TabJc = "clear" | "left" | "right" | "center";

  /** A paragraph tab stop. */
  export interface TabStop {
    Pos: number;
    Val: TabJc;
    Leader: "none" | "dot" | "heavy" | "hyphen" | "middleDot" | "underscore";
  }

  export interface TableLook {
    firstCol: boolean;
    firstRow: boolean;
    lastCol: boolean;
    lastRow: boolean;
    bandHor: boolean;
    bandVer: boolean;
  }

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used.<b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell.<b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell.<b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell.<b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell.<b>"firstRow"</b> - specifies that the table formatting is applied to the first row.<b>"lastRow"</b> - specifies that the table formatting is applied to the last row.<b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format.<b>"lastColumn"</b> - specifies that the table formatting is applied to the last column.<b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows.<b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows.<b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns.<b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns.<b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table. */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property.<b>"auto"</b> - sets the table or table cell width to auto width.<b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point.<b>"nul"</b> - sets the table or table cell width to be of a zero value.<b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container. */
  export type TableWidth = "auto" | "twips" | "nul" | "percent";

  /** The available text autofit types inside a shape. */
  export type TextFitType = "noAutoFit" | "normAutoFit" | "autoFit";

  /** The available text direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    type: "none" | "digit" | "letter" | "mask" | "regExp";
    value?: string;
  }

  /** The available text annot icon types. */
  export type TextIconType = "check" | "circle" | "comment" | "cross" | "crossH" | "help" | "insert" | "key" | "newParagraph" | "note" | "paragraph" | "rightArrow" | "rightPointer" | "star" | "upArrow" | "upLeftArrow";

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** The available vertical text alignment. */
  export type TextVertAlign = "baseline" | "subscript" | "superscript";

  /** Possible values for the position of chart tick labels (either horizontal or vertical).<b>"none"</b> - not display the selected tick labels.<b>"nextTo"</b> - sets the position of the selected tick labels next to the main label.<b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values.<b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values. */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance. */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Time format options:- "HH:MM" — 24-hour format, hours and minutes (e.g., "14:30")- "h:MM tt" — 12-hour format with AM/PM, hours and minutes (e.g., "2:30 PM")- "HH:MM:ss" — 24-hour format, hours, minutes, and seconds (e.g., "14:30:15")- "h:MM:ss tt" — 12-hour format with AM/PM, hours, minutes, and seconds (e.g., "2:30:15 PM") */
  export type TimeFormat = 'HH:MM' | 'h:MM tt' | 'HH:MM:ss' | 'h:MM:ss tt';

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    HtmlHeadings?: boolean;
    Base64img?: boolean;
    DemoteHeadings?: boolean;
    RenderHTMLTags?: boolean;
  }

  /** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles. */
  export interface TocBuildFromPr {
    OutlineLvlStart?: number;
    OutlineLvls?: number;
    StylesLvls: TocStyleLvl[];
  }

  /** Possible values for the table of contents leader:<b>"dot"</b> - "......."<b>"dash"</b> - "-------"<b>"underline"</b> - "_______" */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties. */
  export interface TocPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: TocBuildFromPr;
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style. */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels. */
  export interface TocStyleLvl {
    Name: string;
    Lvl: number;
  }

  /** Table of figures properties. */
  export interface TofPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: CaptionLabel | string;
    LabelNumber?: boolean;
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style. */
  export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

  /** Represents a user's comment history. */
  export interface UserComments {
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    reviews: ReviewReportRecord[];
  }

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it). */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction. */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type. */
  export type WatermarkType = "none" | "text" | "image";

  /** The available widget border styles. */
  export type WidgetBorderStyle = "solid" | "beveled" | "dashed" | "inset" | "underline";

  /** The available widget border width. */
  export type WidgetBorderWidth = "none" | "thin" | "medium" | "thick";

  /** This element specifies the information which shall be used to establish a mapping to an XML element stored within a Custom XML. */
  export interface XmlMapping {
    prefixMapping: string;
    xpath: string;
    storeItemID: string;
  }

  /** Available values of the "bookmark" reference type:<b>"text"</b> - the entire bookmark text;<b>"pageNum"</b> - the bookmark page number;<b>"paraNum"</b> - the bookmark paragraph number;<b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only);<b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1";<b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255. */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type:<b>"entireCaption"</b>- the entire caption text;<b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1";<b>"captionText"</b> - the caption text only;<b>"pageNum"</b> - the page number containing the referenced object;<b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** Available values of the "endnote" reference type:<b>"endnoteNum"</b> - the endnote number;<b>"pageNum"</b> - the endnote page number;<b>"aboveBelow"</b> - the words "above" or "below" depending on the item position;<b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected. */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type:<b>"footnoteNum"</b> - the footnote number;<b>"pageNum"</b> - the page number of the footnote;<b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item;<b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected. */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type:<b>"text"</b> - the entire heading text;<b>"pageNum"</b> - the heading page number;<b>"headingNum"</b> - the heading sequence number;<b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only;<b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section;<b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors. */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point). */
  export type hps = number;

  /** 240ths of a line. */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre. */
  export type mm = number;

  /** Available values of the "numbered" reference type:<b>"pageNum"</b> - the numbered item page number;<b>"paraNum"</b> - the numbered item paragraph number;<b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only);<b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1";<b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only;<b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100. */
  export type percentage = number;

  /** A point. */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points). */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch). */
  export type twips = number;

  // Cross-file type stubs
  export type BulletType = unknown;

  export interface Api {
    CentimetersToPoints(cm: number): number;
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
    CreateBullet(sSymbol: string): ApiBullet;
    CreateCaretAnnot(rect: Rect | Quad[]): ApiCaretAnnotation;
    CreateChart(chartType?: ChartType, series?: number[][], seriesNames?: number[] | string[], categoryNames?: number[] | string[], width?: number, height?: number, styleIndex?: number, numFormats?: NumFormat[] | string[]): ApiChart;
    CreateCheckboxField(rect: Rect): ApiCheckboxField;
    CreateCircleAnnot(rect: Rect): ApiCircleAnnotation;
    CreateComboboxField(rect: Rect): ApiComboboxField;
    CreateCustomGeometry(): ApiGeometry;
    CreateDateField(rect: Rect): ApiTextField;
    CreateFreeTextAnnot(rect: Rect): ApiFreeTextAnnotation;
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;
    CreateHighlightAnnot(rect: Rect | Quad[]): ApiHighlightAnnotation;
    CreateImage(imageSrc: string, width: number, height: number): ApiImage;
    CreateImageField(rect: Rect): ApiButtonField;
    CreateInkAnnot(rect: Rect, inkPaths: PathList): ApiInkAnnotation;
    CreateLineAnnot(rect: Rect, startPoint: Point, endPoint: Point): ApiLineAnnotation;
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;
    CreateListboxField(rect: Rect): ApiListboxField;
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;
    CreateNoFill(): ApiFill;
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;
    CreateParagraph(): ApiParagraph;
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;
    CreatePolyLineAnnot(rect: Rect, path: Path): ApiPolyLineAnnotation;
    CreatePolygonAnnot(rect: Rect, path: Path): ApiPolygonAnnotation;
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;
    CreateRadiobuttonField(rect: Rect): ApiRadiobuttonField;
    CreateRedactAnnot(rect: Rect | Quad[]): ApiRedactAnnotation;
    CreateRichParaPr(): ApiParaPr;
    CreateRichParagraph(): ApiRichParagraph;
    CreateRichRun(): ApiRichRun;
    CreateRichTextPr(): ApiTextPr;
    CreateRun(): ApiRun;
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
    CreateShadow(settings: ShadowSettings): ApiShadow;
    CreateShape(shapeType?: ShapeType, width?: number, height?: number, fill?: ApiFill, stroke?: ApiStroke): ApiShape;
    CreateSolidFill(color: ApiColor): ApiFill;
    CreateSquareAnnot(rect: Rect): ApiSquareAnnotation;
    CreateStampAnnot(rect: Rect, type: StampType, author?: string, creationDate?: number): ApiStampAnnotation;
    CreateStrikeoutAnnot(rect: Rect | Quad[]): ApiStrikeoutAnnotation;
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;
    CreateTable(rows: number, cols: number): ApiTable;
    CreateTableRowPr(): ApiTableRowPr;
    CreateTextAnnot(rect: Rect): ApiTextAnnotation;
    CreateTextField(rect: Rect): ApiTextField;
    CreateTextPr(): ApiTextPr;
    CreateUnderlineAnnot(rect: Rect | Quad[]): ApiUnderlineAnnotation;
    EmusToMillimeters(emu: number): number;
    EmusToPoints(emu: number): number;
    GetDocument(): ApiDocument;
    GetFullName(): string;
    HexColor(hexString: string): ApiColor;
    InchesToPoints(inches: number): number;
    LinesToPoints(lines: number): number;
    MillimetersToEmus(mm: number): number;
    MillimetersToPixels(mm: number): number;
    MillimetersToPoints(mm: number): number;
    PicasToPoints(pc: number): number;
    PixelsToEmus(px: number): number;
    PixelsToPoints(px: number): number;
    PointsToCentimeters(pt: number): number;
    PointsToEmus(pt: number): number;
    PointsToInches(pt: number): number;
    PointsToLines(pt: number): number;
    PointsToMillimeters(pt: number): number;
    PointsToPicas(pt: number): number;
    PointsToPixels(pt: number): number;
    PointsToTwips(pt: number): number;
    RGB(r: number, g: number, b: number): ApiColor;
    RGBA(r: number, g: number, b: number, a: number): ApiColor;
    ThemeColor(name?: SchemeColorId): ApiColor;
    TwipsToPoints(twips: number): number;
  }

  /** Class representing a base annotation. */
  export interface ApiBaseAnnotation {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a base field. */
  export interface ApiBaseField {
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;
    Delete(): boolean;
    GetAllWidgets(): ApiWidget[];
    GetFullName(): string;
    GetPartialName(): string;
    GetValue(): string | string[];
    IsReadOnly(): boolean;
    IsRequired(): boolean;
    SetFullName(name: string): boolean;
    SetPartialName(name: string): boolean;
    SetReadOnly(readOnly: boolean): boolean;
    SetRequired(required: boolean): boolean;
    SetValue(value: string): boolean;
  }

  /** Class representing a base list field. */
  export interface ApiBaseListField extends Omit<ApiBaseField, "SetFullName" | "GetFullName" | "SetPartialName" | "GetPartialName" | "SetRequired" | "IsRequired" | "SetReadOnly" | "IsReadOnly" | "SetValue" | "GetValue" | "AddWidget" | "GetAllWidgets" | "Delete"> {
    AddOption(option: ListOption, index?: number): boolean;
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;
    Delete(): boolean;
    GetAllWidgets(): ApiWidget[];
    GetFullName(): string;
    GetOption(index: number): ListOption;
    GetOptions(): ListOption[];
    GetPartialName(): string;
    GetValue(): string | string[];
    GetValueIndexes(): number[];
    IsCommitOnSelChange(): boolean;
    IsReadOnly(): boolean;
    IsRequired(): boolean;
    MoveOption(currentIndex: number, newIndex: number): boolean;
    RemoveOption(index: number): boolean;
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;
    SetFullName(name: string): boolean;
    SetPartialName(name: string): boolean;
    SetReadOnly(readOnly: boolean): boolean;
    SetRequired(required: boolean): boolean;
    SetValue(value: string): boolean;
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a base markup annotation. */
  export interface ApiBaseMarkupAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetQuads(): Quad[];
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetQuads(quads: Quad[]): boolean;
    SetRect(rect: Rect): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a base field widget. */
  export interface ApiBaseWidget {
    Delete(): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetBorderStyle(): WidgetBorderStyle;
    GetBorderWidth(): WidgetBorderWidth;
    GetClassType(): "baseWidget";
    GetPosition(): Point;
    GetRect(): Rect;
    GetTextColor(): ApiColor;
    GetTextSize(): number;
    IsAutoFit(): boolean;
    SetAutoFit(auto: boolean): boolean;
    SetBackgroundColor(color: ApiColor): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetTextColor(color: ApiColor): boolean;
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
    GetClassType(): "bullet";
    ToJSON(): object;
  }

  /** Class representing a button field. */
  export interface ApiButtonField extends Omit<ApiBaseField, "SetFullName" | "GetFullName" | "SetPartialName" | "GetPartialName" | "SetRequired" | "IsRequired" | "SetReadOnly" | "IsReadOnly" | "SetValue" | "GetValue" | "AddWidget" | "GetAllWidgets" | "Delete"> {
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;
    Delete(): boolean;
    GetAllWidgets(): ApiWidget[];
    GetClassType(): "buttonField";
    GetFullName(): string;
    GetPartialName(): string;
    GetValue(): string | string[];
    IsReadOnly(): boolean;
    IsRequired(): boolean;
    SetFullName(name: string): boolean;
    SetPartialName(name: string): boolean;
    SetReadOnly(readOnly: boolean): boolean;
    SetRequired(required: boolean): boolean;
    SetValue(value: string): boolean;
  }

  /** Class representing a button widget. */
  export interface ApiButtonWidget extends Omit<ApiBaseWidget, "GetClassType" | "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetBackgroundColor" | "GetBackgroundColor" | "SetTextColor" | "GetTextColor" | "SetTextSize" | "GetTextSize" | "SetAutoFit" | "IsAutoFit" | "Delete"> {
    Delete(): boolean;
    GetBackgroundColor(): ApiColor;
    GetBehavior(): ButtonBehavior;
    GetBorderColor(): ApiColor;
    GetBorderStyle(): WidgetBorderStyle;
    GetBorderWidth(): WidgetBorderWidth;
    GetClassType(): "buttonWidget";
    GetIconXPos(): percentage;
    GetIconYPos(): percentage;
    GetLabel(appearance?: ButtonAppearance): string;
    GetLayout(): ButtonLayout;
    GetPosition(): Point;
    GetRect(): Rect;
    GetScaleHow(): ButtonScaleHow;
    GetScaleWhen(): ButtonScaleWhen;
    GetTextColor(): ApiColor;
    GetTextSize(): number;
    IsAutoFit(): boolean;
    IsFitBounds(): boolean;
    SetAutoFit(auto: boolean): boolean;
    SetBackgroundColor(color: ApiColor): boolean;
    SetBehavior(behavior: ButtonBehavior): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;
    SetFitBounds(fit: boolean): boolean;
    SetIconXPos(posX: percentage): boolean;
    SetIconYPos(posY: percentage): boolean;
    SetImage(imageUrl?: string, appearance?: ButtonAppearance): boolean;
    SetLabel(label: string, appearance?: ButtonAppearance): boolean;
    SetLayout(layout: ButtonLayout): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetScaleHow(scaleHow: ButtonScaleHow): boolean;
    SetScaleWhen(scaleWhen: ButtonScaleWhen): boolean;
    SetTextColor(color: ApiColor): boolean;
    SetTextSize(size: number): boolean;
  }

  /** Class representing a caret annotation. */
  export interface ApiCaretAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "caretAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a chart. */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY" | "SetTitle" | "GetTitle"> {
    ApplyChartStyle(nStyleId: unknown): boolean;
    GetAllSeries(): ApiChartSeries[];
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chart";
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    GetSeries(nIdx: number): ApiChartSeries;
    GetTitle(): string | null;
    GetType(): ChartType;
    RemoveSeria(nSeria: number): boolean;
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;
    SetCategoryName(sName: string, nCategory: number): boolean;
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
    SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetHorAxisLabelsFontSize(nFontSize: number): boolean;
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
    SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetLegendFill(oFill: ApiFill): boolean;
    SetLegendFontSize(nFontSize: number): boolean;
    SetLegendOutLine(oStroke: ApiStroke): boolean;
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;
    SetMajorVerticalGridlines(oStroke: ApiStroke): boolean;
    SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;
    SetPlotAreaFill(oFill: ApiFill): boolean;
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
    SetSeriaName(sName: string, nSeria: number): boolean;
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;
    SetSeriaValues(aValues: number[], nSeria: number): boolean;
    SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;
    SetSeriesOutLine(oStroke: ApiStroke, nSeries: number, bAll?: boolean): boolean;
    SetShowDataLabels(bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;
    SetShowDataTable(bShow: boolean, bShowKeys?: boolean): boolean;
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;
    SetTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetTitleFill(oFill: ApiFill): boolean;
    SetTitleOutLine(oStroke: ApiStroke): boolean;
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;
    SetVerAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetVertAxisLabelsFontSize(nFontSize: number): boolean;
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
    SetXValues(aValues: string[]): boolean;
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
    ChangeChartType(sType: ChartType): boolean;
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chartSeries";
    GetType(): ChartType;
  }

  /** Class representing a document checkbox / radio button. */
  export interface ApiCheckBoxForm extends ApiFormBase {
  }

  /** Class representing a checkbox field. */
  export interface ApiCheckboxField extends Omit<ApiBaseField, "SetFullName" | "GetFullName" | "SetPartialName" | "GetPartialName" | "SetRequired" | "IsRequired" | "SetReadOnly" | "IsReadOnly" | "SetValue" | "GetValue" | "AddWidget" | "GetAllWidgets" | "Delete"> {
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;
    Delete(): boolean;
    GetAllWidgets(): ApiWidget[];
    GetClassType(): "checkboxField";
    GetFullName(): string;
    GetPartialName(): string;
    GetValue(): string | string[];
    IsReadOnly(): boolean;
    IsRequired(): boolean;
    IsToggleToOff(): boolean;
    SetFullName(name: string): boolean;
    SetPartialName(name: string): boolean;
    SetReadOnly(readOnly: boolean): boolean;
    SetRequired(required: boolean): boolean;
    SetToggleToOff(allowToggleOff: boolean): boolean;
    SetValue(value: string): boolean;
  }

  /** Class representing a checkbox field widget. */
  export interface ApiCheckboxWidget extends Omit<ApiBaseWidget, "GetClassType" | "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetBackgroundColor" | "GetBackgroundColor" | "SetTextColor" | "GetTextColor" | "SetTextSize" | "GetTextSize" | "SetAutoFit" | "IsAutoFit" | "Delete"> {
    Delete(): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetBorderStyle(): WidgetBorderStyle;
    GetBorderWidth(): WidgetBorderWidth;
    GetCheckStyle(): CheckStyle;
    GetClassType(): "checkboxWidget";
    GetExportValue(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetTextColor(): ApiColor;
    GetTextSize(): number;
    IsAutoFit(): boolean;
    IsChecked(): boolean;
    IsCheckedByDefault(): boolean;
    SetAutoFit(auto: boolean): boolean;
    SetBackgroundColor(color: ApiColor): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderStyle(borderStyle: WidgetBorderStyle): boolean;
    SetBorderWidth(borderWidth: WidgetBorderWidth): boolean;
    SetCheckStyle(style: CheckStyle): boolean;
    SetChecked(checked: boolean): boolean;
    SetCheckedByDefault(checked: boolean): boolean;
    SetExportValue(value: string): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetTextColor(color: ApiColor): boolean;
    SetTextSize(size: number): boolean;
  }

  /** Class representing a circle annotation. */
  export interface ApiCircleAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "circleAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetRectDiff(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetRectDiff(rectDiff: RectDiff): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
    FromJSON(jsonObject: string): ApiColor | null;
    GetClassType(): "color";
    GetHex(): string;
    GetRGB(): object;
    GetRGBA(): object;
    GetThemeName(): SchemeColorId | null;
    IsThemeColor(): boolean;
    ToJSON(): string;
  }

  /** Class representing a document combo box / drop-down list. */
  export interface ApiComboBoxForm extends ApiFormBase {
  }

  /** Class representing a combobox field. */
  export interface ApiComboboxField extends Omit<ApiBaseListField, "AddOption" | "RemoveOption" | "MoveOption" | "GetOption" | "GetOptions" | "SetCommitOnSelChange" | "IsCommitOnSelChange" | "SetValueIndexes" | "GetValueIndexes"> {
    AddOption(option: ListOption, index?: number): boolean;
    ClearFormat(): boolean;
    GetClassType(): "comboboxField";
    GetFormattedValue(): string;
    GetOption(index: number): ListOption;
    GetOptions(): ListOption[];
    GetPlaceholder(): string;
    GetRegularExp(): boolean;
    GetValueIndexes(): number[];
    IsCommitOnSelChange(): boolean;
    IsEditable(): boolean;
    MoveOption(currentIndex: number, newIndex: number): boolean;
    RemoveOption(index: number): boolean;
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;
    SetDateFormat(format: string): boolean;
    SetEditable(allowCustomText: boolean): boolean;
    SetMask(inputMask: string): boolean;
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;
    SetPlaceholder(sPlaceholder: string): boolean;
    SetRegularExp(regularExpression: string): boolean;
    SetSpecialFormat(format: PsfFormat): boolean;
    SetTimeFormat(format: TimeFormat): boolean;
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;
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

  /** Class representing a custom XML node. */
  export interface ApiCustomXmlNode {
  }

  /** Class representing a custom XML part. */
  export interface ApiCustomXmlPart {
  }

  /** Class representing a custom XML manager, which provides methods to manage custom XML parts in the document. */
  export interface ApiCustomXmlParts {
  }

  /** Class representing a document date field. */
  export interface ApiDateForm extends ApiFormBase {
  }

  /** Class representing a document. */
  export interface ApiDocument {
    AddElement(nPos: number, oElement: DocumentElement): boolean;
    AddPage(index?: number, width?: number, height?: number): ApiPage;
    AddText(text: string): ApiRun;
    ApplyRedact(): boolean;
    GetAllFields(): ApiField[];
    GetAllParagraphs(): ApiParagraph[];
    GetClassType(): "document";
    GetCurrentParagraph(): ApiParagraph;
    GetCurrentRun(): ApiRun;
    GetElement(nPos: number): DocumentElement;
    GetElementsCount(): number;
    GetFieldByName(name: string): ApiField;
    GetInternalId(): string;
    GetPage(index: number): ApiPage;
    GetPagesCount(): number;
    GetSelectedText(): string;
    GetSelection(): DocSelection;
    GetSelectionQuads(): DocQuads;
    GetStyle(sStyleName: string): ApiStyle | null;
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;
    Push(oElement: DocumentElement): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    RemovePage(index: number): boolean;
    SearchAndRedact(props: SearchProps): ApiRedactAnnotation[];
    SetSelection(selection: DocSelection): boolean;
    SetText(text: string): ApiRun;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
    AddElement(nPos: number, oElement: DocumentElement): boolean;
    AddText(text: string): ApiRun;
    GetAllParagraphs(): ApiParagraph[];
    GetClassType(): "documentContent";
    GetCurrentParagraph(): ApiParagraph;
    GetCurrentRun(): ApiRun;
    GetElement(nPos: number): DocumentElement;
    GetElementsCount(): number;
    GetInternalId(): string;
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;
    Push(oElement: DocumentElement): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    SetText(text: string): ApiRun;
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
    Copy(): ApiDrawing;
    Delete(): boolean;
    GetClassType(): "drawing";
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    Select(isReplace?: boolean): boolean;
    SetDescription(description: string): boolean;
    SetFill(fill: ApiFill): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetLine(stroke: ApiStroke): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
    SetRotation(rotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(width: number, height: number): boolean;
    SetTitle(title: string): boolean;
    Unselect(): boolean;
  }

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into aseparate framed paragraph. */
  export interface ApiDropCap {
  }

  /** Class representing a base class for fill. */
  export interface ApiFill {
    GetClassType(): "fill";
    GetType(): FillType;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
  }

  /** Class representing a freeText annotation. */
  export interface ApiFreeTextAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetCallout(): FreeTextCallout;
    GetClassType(): "freeTextAnnot";
    GetContent(): ApiRichContent;
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetIntent(): FreeTextIntent;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetRectDiff(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetCallout(callout: FreeTextCallout): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetIntent(intentType: FreeTextIntent): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetRectDiff(rectDiff: RectDiff): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing the shape geometry. */
  export interface ApiGeometry {
    AddAdj(sName: string, nValue: number): boolean;
    AddConnectionPoint(sAngle: string, sX: string, sY: string): boolean;
    AddGuide(sName: string, sFormula: GeometryFormulaType, sX: string, sY: string, sZ: string): boolean;
    AddPath(): ApiPath | null;
    GetAdjValue(sName: string): number | null;
    GetClassType(): "geometry";
    GetPath(nIndex: number): ApiPath;
    GetPathCount(): number;
    GetPaths(): ApiPath[];
    GetPreset(): ShapeType;
    IsCustom(): boolean;
    SetAdjValue(sName: string, nValue: number): void;
    SetTextRect(sLeft: string, sTop: string, sRight: string, sBottom: string): boolean;
  }

  /** Class representing gradient stop. */
  export interface ApiGradientStop {
    GetClassType(): "gradientStop";
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY"> {
    GetClassType(): "group";
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a highlight annotation. */
  export interface ApiHighlightAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "highlightAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
    GetClassType(): "hyperlink";
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetLinkedText(): string;
    GetScreenTipText(): string;
    SetLink(sLink: string): boolean;
    SetScreenTipText(sScreenTipText: string): boolean;
  }

  /** Class representing an image. */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY"> {
    GetClassType(): "image";
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a ink annotation. */
  export interface ApiInkAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "inkAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPathList(): PathList;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPathList(inkPaths: PathList): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a line annotation. */
  export interface ApiLineAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "lineAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetEndPoint(): Point;
    GetEndStyle(): LineEndStyle;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetStartPoint(): Point;
    GetStartStyle(): LineEndStyle;
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetEndPoint(point: Point): boolean;
    SetEndStyle(style: LineEndStyle): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetStartPoint(point: Point): boolean;
    SetStartStyle(style: LineEndStyle): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a link annotation. */
  export interface ApiLinkAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "linkAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a listbox field. */
  export interface ApiListboxField extends Omit<ApiBaseListField, "AddOption" | "RemoveOption" | "MoveOption" | "GetOption" | "GetOptions" | "SetCommitOnSelChange" | "IsCommitOnSelChange" | "SetValueIndexes" | "GetValueIndexes"> {
    AddOption(option: ListOption, index?: number): boolean;
    GetClassType(): "listboxField";
    GetOption(index: number): ListOption;
    GetOptions(): ListOption[];
    GetValueIndexes(): number[];
    IsCommitOnSelChange(): boolean;
    IsMultipleSelection(): boolean;
    MoveOption(currentIndex: number, newIndex: number): boolean;
    RemoveOption(index: number): boolean;
    SetCommitOnSelChange(commitOnSelectionChange: boolean): boolean;
    SetMultipleSelection(allowMultipleSelection: boolean): boolean;
    SetValueIndexes(valueIndexes: number[]): boolean;
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
    GetClassType(): "math";
    GetText(format?: "unicode" | "latex"): string;
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an Ole object. */
  export interface ApiOleObject extends Omit<ApiDrawing, "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY"> {
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a document page. */
  export interface ApiPage {
    AddObject(object: FloatObject): FloatObject;
    GetAllAnnots(): ApiBaseAnnotation[];
    GetAllDrawings(): Drawing[];
    GetAllWidgets(): ApiWidget[];
    GetClassType(): "page";
    GetIndex(): number;
    GetRotation(): number;
    GetSelectedText(): string;
    GetSelection(): PageSelection;
    GetSelectionQuads(): Quad[];
    RecognizeContent(): Drawing[];
    Search(props: SearchProps): SearchResults;
    SetRotation(angle: number): boolean;
    SetSelection(selection: PageSelection | Rect | Quad | Quad[]): boolean;
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
    GetClassType(): "paraPr";
    GetIndFirstLine(): number | undefined;
    GetIndLeft(): number | undefined;
    GetIndRight(): number | undefined;
    GetJc(): "left" | "right" | "both" | "center" | undefined;
    GetOutlineLvl(): number | undefined;
    GetSpacingAfter(): number;
    GetSpacingBefore(): number;
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
    GetSpacingLineValue(): number | line240 | undefined;
    GetTabs(): TabStop[];
    SetBullet(oBullet: ApiBullet): void;
    SetIndFirstLine(nValue: number): boolean;
    SetIndLeft(nValue: number): boolean;
    SetIndRight(nValue: number): boolean;
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;
    SetOutlineLvl(lvl?: number | null): boolean;
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType" | "SetIndLeft" | "GetIndLeft" | "SetIndRight" | "GetIndRight" | "SetIndFirstLine" | "GetIndFirstLine" | "SetJc" | "GetJc" | "SetSpacingLine" | "GetSpacingLineValue" | "GetSpacingLineRule" | "SetSpacingBefore" | "GetSpacingBefore" | "SetSpacingAfter" | "GetSpacingAfter" | "SetTabs" | "GetTabs" | "SetBullet" | "SetOutlineLvl" | "GetOutlineLvl"> {
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;
    AddLineBreak(): ApiRun;
    AddTabStop(): ApiRun;
    AddText(text: string | number[], widths?: number[]): ApiRun;
    Copy(): ApiParagraph;
    Delete(): boolean;
    GetClassType(): "paragraph";
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetFontNames(): string[];
    GetIndFirstLine(): number | undefined;
    GetIndLeft(): number | undefined;
    GetIndRight(): number | undefined;
    GetInternalId(): string;
    GetJc(): "left" | "right" | "both" | "center" | undefined;
    GetLastRunWithText(): ApiRun;
    GetNext(): ApiParagraph | null;
    GetOutlineLvl(): number | undefined;
    GetParaPr(): ApiParaPr;
    GetPrevious(): ApiParagraph;
    GetSpacingAfter(): number;
    GetSpacingBefore(): number;
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
    GetSpacingLineValue(): number | line240 | undefined;
    GetTabs(): TabStop[];
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TabSymbol?: string): string;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;
    IsEmpty(): boolean;
    Last(): ParagraphContent;
    Push(oElement: ParagraphContent): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    Select(): boolean;
    SetBold(isBold: boolean): ApiParagraph;
    SetBullet(oBullet: ApiBullet): void;
    SetCaps(isCaps: boolean): ApiParagraph;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;
    SetFontFamily(sFontFamily: string): ApiParagraph;
    SetFontSize(nSize: hps): ApiParagraph;
    SetHighlight(sColor: highlightColor): ApiParagraph;
    SetIndFirstLine(nValue: number): boolean;
    SetIndLeft(nValue: number): boolean;
    SetIndRight(nValue: number): boolean;
    SetItalic(isItalic: boolean): ApiParagraph;
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;
    SetOutlineLvl(lvl?: number | null): boolean;
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;
    SetSpacing(nSpacing: number): ApiParagraph;
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;
    SetStrikeout(isStrikeout: boolean): ApiParagraph;
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
    SetText(text: string): ApiRun;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    SetUnderline(isUnderline: boolean): ApiParagraph;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /** Class representing a path in geometry. */
  export interface ApiPath {
    ArcTo(wR: GeometryCoordinate, hR: GeometryCoordinate, stAng: GeometryCoordinate, swAng: GeometryCoordinate): void;
    Close(): void;
    CubicBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate, x3: GeometryCoordinate, y3: GeometryCoordinate): void;
    GetCommand(nIndex: number): ApiPathCommand | null;
    GetCommandCount(): number;
    GetCommands(): ApiPathCommand[];
    GetFill(): PathFillType;
    GetHeight(): number;
    GetStroke(): boolean;
    GetWidth(): number;
    LineTo(x: GeometryCoordinate, y: GeometryCoordinate): void;
    MoveTo(x: GeometryCoordinate, y: GeometryCoordinate): void;
    QuadBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate): void;
    SetFill(sFill: PathFillType): void;
    SetHeight(nHeight: number): void;
    SetStroke(bStroke: boolean): void;
    SetWidth(nWidth: number): void;
  }

  /** Class representing a path command. */
  export interface ApiPathCommand {
    GetHR(): string | null;
    GetStartAngle(): string | null;
    GetSweepAngle(): string | null;
    GetType(): PathCommandType;
    GetWR(): string | null;
    GetX(): string | null;
    GetX0(): string | null;
    GetX1(): string | null;
    GetX2(): string | null;
    GetY(): string | null;
    GetY0(): string | null;
    GetY1(): string | null;
    GetY2(): string | null;
  }

  /** Class representing a document picture form. */
  export interface ApiPictureForm extends ApiFormBase {
  }

  /** Class representing a polyline annotation. */
  export interface ApiPolyLineAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "polyLineAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetEndStyle(): LineEndStyle;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetStartStyle(): LineEndStyle;
    GetSubject(): string;
    GetUniqueName(): string;
    GetVertices(): Path;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetEndStyle(style: LineEndStyle): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetStartStyle(style: LineEndStyle): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
    SetVertices(path: Path): boolean;
  }

  /** Class representing a polygon annotation. */
  export interface ApiPolygonAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "polygonAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    GetVertices(): Path;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
    SetVertices(path: Path): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    GetClassType(): "presetColor";
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    GetClassType(): "rgbColor";
  }

  /** Class representing a radiobutton field. */
  export interface ApiRadiobuttonField extends Omit<ApiCheckboxField, "GetClassType" | "SetToggleToOff" | "IsToggleToOff" | "AddOption"> {
    AddOption(pageIndex: number, rect: Rect, exportValue?: string): ApiCheckboxWidget;
    GetClassType(): "radiobuttonField";
    IsCheckInUnison(): boolean;
    IsToggleToOff(): boolean;
    SetCheckInUnison(checkInUnison: boolean): boolean;
    SetToggleToOff(allowToggleOff: boolean): boolean;
  }

  /** Class representing a continuous region in a document. Each Range object is determined by the position of the start and end characters. */
  export interface ApiRange {
  }

  export interface ApiRangeTextPr extends Omit<ApiTextPr, "GetClassType" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetVertAlign" | "SetHighlight" | "GetHighlight" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetFill" | "GetFill" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine"> {
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "textPr";
    GetDoubleStrikeout(): boolean;
    GetFill(): ApiFill;
    GetFontFamily(): string;
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetOutLine(): ApiStroke;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetTextFill(): ApiFill;
    GetUnderline(): boolean;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFill(oApiFill: ApiFill): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a redact annotation. */
  export interface ApiRedactAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "redactAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a rich content. */
  export interface ApiRichContent {
    AddElement(pos: number, richPara: ApiRichParagraph): boolean;
    GetClassType(): "richContent";
    GetContent(getCopies: boolean): ApiRichParagraph[];
    GetCurrentParagraph(): ApiRichParagraph;
    GetCurrentRun(): ApiRichRun;
    GetElement(pos: number): ApiRichParagraph;
    Push(richPara: ApiRichParagraph): boolean;
  }

  /** Class representing the rich paragraph properties. */
  export interface ApiRichParaPr {
    GetClassType(): "richParaPr";
  }

  /** Class representing a rich paragraph. */
  export interface ApiRichParagraph extends Omit<ApiRichParaPr, "GetClassType"> {
    AddElement(richRun: ApiRichRun, pos?: number): boolean;
    AddText(text: string): ApiRichRun;
    Copy(): ApiRichParagraph;
    GetClassType(): "richParagraph";
    GetElement(pos: number): ApiRichRun;
    GetNext(): ApiRichParagraph;
    GetParaPr(): ApiRichParaPr;
    GetPrevious(): ApiRichParagraph;
    Last(): ApiRichRun;
    Push(richRun: ParagraphContent): boolean;
    SetParaPr(paraPr: ApiRichParaPr): boolean;
    SetReadingOrder(readingOrder?: ReadingOrder): ApiRichParagraph;
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRichRun extends Omit<ApiRichTextPr, "GetClassType"> {
    Copy(): ApiRichRun;
    GetClassType(): "richRun";
    GetParentParagraph(): ApiRichParagraph;
    GetTextPr(): ApiRichTextPr;
    SetTextPr(textPr: ApiRichTextPr): ApiRichTextPr;
  }

  /** Class representing the rich text properties. */
  export interface ApiRichTextPr {
    GetClassType(): "richTextPr";
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetVertAlign" | "SetHighlight" | "GetHighlight" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetFill" | "GetFill" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine"> {
    AddLineBreak(): boolean;
    AddTabStop(): boolean;
    AddText(text: string | number[], widths?: number[]): boolean;
    ClearContent(): boolean;
    Copy(): ApiRun;
    Delete(): boolean;
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "run";
    GetDoubleStrikeout(): boolean;
    GetFill(): ApiFill;
    GetFontFamily(): string;
    GetFontNames(): string[];
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetOutLine(): ApiStroke;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetTextFill(): ApiFill;
    GetTextPr(): ApiTextPr;
    GetUnderline(): boolean;
    RemoveAllElements(): boolean;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFill(oApiFill: ApiFill): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetTextPr(oTextPr: ApiTextPr): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
    GetClassType(): "shadow";
    GetSettings(): ShadowSettings;
  }

  /** Class representing a shape. */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY" | "SetFill" | "GetFill" | "SetLine" | "GetLine"> {
    GetClassType(): "shape";
    GetContent(): ApiDocumentContent;
    GetDocContent(): ApiDocumentContent;
    GetFill(): ApiFill | null;
    GetGeometry(): ApiGeometry;
    GetLine(): ApiStroke | null;
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    GetTextFit(): TextFitType;
    GetVerticalTextAlign(): VerticalTextAlign;
    SetFill(fill: ApiFill): boolean;
    SetGeometry(geometry: ApiGeometry): boolean;
    SetLine(stroke: ApiStroke): boolean;
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
    SetTextFit(fitType: TextFitType): boolean;
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a group of drawings. */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY"> {
    GetClassType(): "smartArt";
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
  }

  /** Class representing a square annotation. */
  export interface ApiSquareAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "squareAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetRectDiff(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetRectDiff(rectDiff: RectDiff): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a stamp annotation. */
  export interface ApiStampAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "stampAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetRotation(): Degree;
    GetScale(): number;
    GetSubject(): string;
    GetType(): StampType;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetRotation(angle: Degree): boolean;
    SetScale(scale: number): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a strikeout annotation. */
  export interface ApiStrikeoutAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "strikeoutAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a stroke. */
  export interface ApiStroke {
    GetBeginArrow(): object | null;
    GetClassType(): "stroke";
    GetDashType(): DashType | null;
    GetEndArrow(): object | null;
    GetFill(): ApiFill | null;
    GetWidth(): number | null;
    SetBeginArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;
    SetEndArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /** Class representing a table. */
  export interface ApiTable extends Omit<ApiDrawing, "GetClassType" | "GetParentPage" | "SetSize" | "SetPosition" | "SetPosX" | "GetPosX" | "SetPosY" | "GetPosY"> {
    AddColumn(referenceCell?: ApiTableCell, before?: boolean): boolean;
    AddColumns(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable;
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;
    AddRow(referenceCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
    AddRows(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable;
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell;
    GetClassType(): "table";
    GetColumnWidth(columnIndex: number): number | null;
    GetParentPage(): ApiPage;
    GetPosX(): number;
    GetPosY(): number;
    GetRow(rowIndex: number): ApiTableRow;
    GetRowsCount(): number;
    GetSelectedCells(): ApiTableCell[];
    GetSelectedColumnsCells(): ApiTableCell[];
    GetSelectedRows(): ApiTableRow[];
    GetTableDescription(): string;
    GetTableLook(): TableLook;
    GetTableTitle(): string;
    MergeCells(cells: ApiTableCell[]): ApiTableCell;
    RemoveColumn(columnCell: ApiTableCell): boolean;
    RemoveRow(rowCell: ApiTableCell): boolean;
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetColumnWidth(columnIndex: number, width: number): number | null;
    SetHeight(nValue: number): number | null;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(posX: number, posY: number): boolean;
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;
    SetSize(width: number, height: number): boolean;
    SetStyle(oStyle: ApiStyle): boolean;
    SetTableDescription(sDescr: string): boolean;
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): boolean;
    SetTableTitle(sTitle: string): boolean;
  }

  /** Class representing a table cell. */
  export interface ApiTableCell {
    AddText(text: string): ApiRun;
    GetBackgroundColor(): ApiColor | null;
    GetClassType(): "tableCell";
    GetContent(): ApiDocumentContent;
    GetNext(): ApiTableCell | null;
    GetParentRow(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableCell | null;
    GetRowIndex(): number | null;
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;
    Select(): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetCellBorderBottom(borderWidth: number, fill: ApiFill): boolean;
    SetCellBorderLeft(borderWidth: number, fill: ApiFill): boolean;
    SetCellBorderRight(borderWidth: number, fill: ApiFill): boolean;
    SetCellBorderTop(borderWidth: number, fill: ApiFill): boolean;
    SetCellMarginBottom(margin: number): boolean;
    SetCellMarginLeft(margin: number): boolean;
    SetCellMarginRight(margin: number): boolean;
    SetCellMarginTop(margin: number): boolean;
    SetColumnBackgroundColor(color?: ApiColor): boolean;
    SetShd(shadingType: ShdType | ApiFill, r: number, g: number, b: number): boolean;
    SetText(text: string): ApiRun;
    SetTextDirection(textDirection: TextFlowDirection): boolean;
    SetVerticalAlign(verticalAlign: VerticalTextAlign): boolean;
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
    GetCell(cellIndex: number): ApiTableCell;
    GetCellsCount(): number;
    GetClassType(): "tableRow";
    GetHeight(): number;
    GetNext(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableRow | null;
    SetHeight(height: number): boolean;
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
  }

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a tablewhich match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
  }

  /** Class representing a text annotation. */
  export interface ApiTextAnnotation extends Omit<ApiBaseAnnotation, "SetRect" | "GetRect" | "SetPosition" | "GetPosition" | "SetBorderColor" | "GetBorderColor" | "SetFillColor" | "GetFillColor" | "SetBorderWidth" | "GetBorderWidth" | "SetBorderStyle" | "GetBorderStyle" | "SetAuthorName" | "GetAuthorName" | "SetContents" | "GetContents" | "SetCreationDate" | "GetCreationDate" | "SetModDate" | "GetModDate" | "SetUniqueName" | "GetUniqueName" | "SetOpacity" | "GetOpacity" | "SetSubject" | "GetSubject" | "SetDisplay" | "GetDisplay" | "SetDashPattern" | "GetDashPattern" | "SetBorderEffectStyle" | "GetBorderEffectStyle" | "SetBorderEffectIntensity" | "GetBorderEffectIntensity" | "AddReply" | "GetReplies" | "Delete"> {
    AddReply(textAnnot: ApiTextAnnotation): boolean;
    Delete(): boolean;
    GetAuthorName(): string;
    GetBorderColor(): ApiColor;
    GetBorderEffectIntensity(): number;
    GetBorderEffectStyle(): AnnotBorderEffectStyle;
    GetBorderStyle(): AnnotBorderStyle;
    GetBorderWidth(): number;
    GetClassType(): "textAnnot";
    GetContents(): string;
    GetCreationDate(): number;
    GetDashPattern(): number[];
    GetDisplay(): DisplayType;
    GetFillColor(): ApiColor;
    GetIconType(): TextIconType;
    GetModDate(): number;
    GetOpacity(): string;
    GetPosition(): Point;
    GetRect(): Rect;
    GetReplies(): ApiTextAnnotation[];
    GetSubject(): string;
    GetUniqueName(): string;
    SetAuthorName(name: string): boolean;
    SetBorderColor(color: ApiColor): boolean;
    SetBorderEffectIntensity(value: number): boolean;
    SetBorderEffectStyle(style: AnnotBorderEffectStyle): boolean;
    SetBorderStyle(borderStyle: AnnotBorderStyle): boolean;
    SetBorderWidth(width: number): boolean;
    SetContents(contents: string): boolean;
    SetCreationDate(timeStamp: number): boolean;
    SetDashPattern(pattern: number[]): boolean;
    SetDisplay(display: DisplayType): boolean;
    SetFillColor(color: ApiColor): boolean;
    SetIconType(iconType: TextIconType): boolean;
    SetModDate(timeStamp: number): boolean;
    SetOpacity(value: percentage): boolean;
    SetPosition(position: Point): boolean;
    SetRect(rect: Rect): boolean;
    SetSubject(subject: string): boolean;
    SetUniqueName(name: string): boolean;
  }

  /** Class representing a text field. */
  export interface ApiTextField extends Omit<ApiBaseField, "SetFullName" | "GetFullName" | "SetPartialName" | "GetPartialName" | "SetRequired" | "IsRequired" | "SetReadOnly" | "IsReadOnly" | "SetValue" | "GetValue" | "AddWidget" | "GetAllWidgets" | "Delete"> {
    AddWidget(pageIndex: number, rect: Rect): ApiWidget;
    ClearFormat(): boolean;
    Delete(): boolean;
    GetAllWidgets(): ApiWidget[];
    GetCharLimit(): number;
    GetClassType(): "textField";
    GetFormattedValue(): string;
    GetFullName(): string;
    GetPartialName(): string;
    GetPlaceholder(): string;
    GetRegularExp(): boolean;
    GetValue(): string | string[];
    IsComb(): boolean;
    IsMultiline(): boolean;
    IsReadOnly(): boolean;
    IsRequired(): boolean;
    IsScrollLongText(): boolean;
    SetCharLimit(charLimit: number): boolean;
    SetComb(comb: boolean): boolean;
    SetDateFormat(format: string): boolean;
    SetFullName(name: string): boolean;
    SetMask(inputMask: string): boolean;
    SetMultiline(multiline: boolean): boolean;
    SetNumberFormat(decimalPlaces: number, separatorStyle: NumberSepStyle, negativeStyle: NumberNegStyle, currency: string, currencyPrepend: boolean): boolean;
    SetPartialName(name: string): boolean;
    SetPercentageFormat(decimalPlaces: number, separatorStyle: NumberSepStyle): boolean;
    SetPlaceholder(sPlaceholder: string): boolean;
    SetReadOnly(readOnly: boolean): boolean;
    SetRegularExp(regularExpression: string): boolean;
    SetRequired(required: boolean): boolean;
    SetScrollLongText(allowScroll: boolean): boolean;
    SetSpecialFormat(format: PsfFormat): boolean;
    SetTimeFormat(format: TimeFormat): boolean;
    SetValidateRange(greaterThan?: boolean, greaterThanValue?: number, lessThan?: boolean, lessThanValue?: number): boolean;
    SetValue(value: string): boolean;
  }

  /** Class representing a document text field. */
  export interface ApiTextForm extends ApiFormBase {
  }

  /** Class representing the text properties. */
  export interface ApiTextPr {
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "textPr";
    GetDoubleStrikeout(): boolean;
    GetFill(): ApiFill;
    GetFontFamily(): string;
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetOutLine(): ApiStroke;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetTextFill(): ApiFill;
    GetUnderline(): boolean;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFill(oApiFill: ApiFill): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a underline annotation. */
  export interface ApiUnderlineAnnotation extends Omit<ApiBaseMarkupAnnotation, "SetQuads" | "GetQuads"> {
    GetClassType(): "underlineAnnot";
    GetQuads(): Quad[];
    SetQuads(quads: Quad[]): boolean;
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
    GetClassType(): "uniColor";
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
    GetClassType(): "unsupported";
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
