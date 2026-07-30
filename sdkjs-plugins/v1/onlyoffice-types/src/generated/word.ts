// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: word

export namespace Word {
  /** Types of all supported forms. */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

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

  /** Any valid element which can be added to the document structure. */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock. */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

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

  /** The coordinate value for the geometry paths.Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections.<b>"default"</b> - a header or footer which can be applied to any default page.<b>"title"</b> - a header or footer which is applied to the title page.<b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default). */
  export type HdrFtrType = "default" | "title" | "even";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill. */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** 60000th of a degree (5400000 = 90 degrees). */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%). */
  export type PositivePercentage = number;

  /** The available preset color names. */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

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

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    type: "none" | "digit" | "letter" | "mask" | "regExp";
    value?: string;
  }

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical).<b>"none"</b> - not display the selected tick labels.<b>"nextTo"</b> - sets the position of the selected tick labels next to the main label.<b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values.<b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values. */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance. */
  export type TickMark = "cross" | "in" | "none" | "out";

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
  export type ALPHABETIC = any;
  export type AM = any;
  export type ApiTableOfContents = any;
  export type ApiTableOfFigures = any;
  export type Arabic = any;
  export type Area = any;
  export type AreaStacked = any;
  export type AreaStacked100 = any;
  export type BarClustered = any;
  export type BarStacked = any;
  export type BarStacked100 = any;
  export type ColumnClustered = any;
  export type ColumnStacked = any;
  export type ColumnStacked100 = any;
  export type Combo = any;
  export type ComboColumnClusteredLine = any;
  export type ComboColumnClusteredLineSecondaryAxis = any;
  export type Doughnut = any;
  export type Equation = any;
  export type Figure = any;
  export type General = any;
  export type Line = any;
  export type LineMarkers = any;
  export type LineMarkersStacked = any;
  export type LineMarkersStacked100 = any;
  export type LineStacked = any;
  export type LineStacked100 = any;
  export type PM = any;
  export type ParaAdd = any;
  export type ParaPr = any;
  export type ParaRem = any;
  export type Pie = any;
  export type Radar = any;
  export type RadarFilled = any;
  export type RadarMarkers = any;
  export type Red = any;
  export type Roman = any;
  export type StockHLC = any;
  export type StockOHLC = any;
  export type StockVHLC = any;
  export type StockVOHLC = any;
  export type Table = any;
  export type TextAdd = any;
  export type TextPr = any;
  export type TextRem = any;
  export type Unknown = any;
  export type XYScatter = any;
  export type XYScatterLines = any;
  export type XYScatterLinesNoMarkers = any;
  export type XYScatterSmooth = any;
  export type XYScatterSmoothNoMarkers = any;

  /** Base class */
  export interface Api {
    AddComment(element: ApiRun[] | DocumentElement, text: string, author?: string, userId?: string): ApiComment;
    AutoColor(): ApiColor;
    CentimetersToPoints(cm: number): number;
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;
    CompareDocuments(file: object): void;
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
    CreateBlockLvlSdt(): ApiBlockLvlSdt;
    CreateChart(chartType?: ChartType, series?: number[][], seriesNames?: number[] | string[], catNames?: number[] | string[], width?: number, height?: number, styleIndex?: number, numFormats?: NumFormat[] | string[]): ApiChart;
    CreateCheckBoxContentControl(checkBoxPr: ContentControlCheckBoxPr): ApiInlineLvlSdt;
    CreateComboBoxContentControl(list?: ContentControlListItem[], selected?: number): ApiInlineLvlSdt;
    CreateCustomGeometry(): ApiGeometry;
    CreateDatePickerContentControl(datePickerPr?: ContentControlDatePr): ApiInlineLvlSdt;
    CreateDropDownListContentControl(list?: ContentControlListItem[], selected?: number): ApiInlineLvlSdt;
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;
    CreateGroup(drawings: DrawingForGroup[]): ApiGroup;
    CreateHyperlink(link: string, display: string, screenTipText: string): ApiHyperlink;
    CreateImage(imageSrc: string, width: number, height: number): ApiImage;
    CreateInlineLvlSdt(): ApiInlineLvlSdt;
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;
    CreateNoFill(): ApiFill;
    CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;
    CreateOleObject(imageSrc: string, width: number, height: number, data: string, appId: string): ApiOleObject;
    CreateParaPr(): ApiParaPr;
    CreateParagraph(): ApiParagraph;
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;
    CreatePictureContentControl(width?: number, height?: number): ApiInlineLvlSdt;
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;
    CreateRange(element: any, start: any, end: any): ApiRange | null;
    CreateRun(): ApiRun;
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
    CreateShadow(settings: ShadowSettings): ApiShadow;
    CreateShape(shapeType?: ShapeType, width?: number, height?: number, fill?: ApiFill, stroke?: ApiStroke): ApiShape;
    CreateSolidFill(color: ApiColor): ApiFill;
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;
    CreateTable(rows: number, cols: number): ApiTable;
    CreateTableCellPr(): ApiTableCellPr;
    CreateTablePr(): ApiTablePr;
    CreateTableRowPr(): ApiTableRowPr;
    CreateTableStylePr(sType: TableStyleOverrideType): ApiTableStylePr;
    CreateTextPr(): ApiTextPr;
    CreateWordArt(textPr?: ApiTextPr, text?: string, transform?: TextTransform, fill?: ApiFill, stroke?: ApiStroke, rotAngle?: number, width?: number, height?: number): ApiDrawing;
    EmusToMillimeters(emu: number): number;
    EmusToPoints(emu: number): number;
    FromJSON(message: object): object;
    GetByInternalId(id: string): object;
    GetDocument(): ApiDocument;
    GetFullName(): string;
    GetMailMergeReceptionsCount(): number;
    GetMailMergeTemplateDocContent(): ApiDocumentContent;
    HexColor(hexString: string): ApiColor;
    InchesToPoints(inches: number): number;
    LinesToPoints(lines: number): number;
    LoadMailMergeData(data: string[][]): boolean;
    MailMerge(startIndex?: number, endIndex?: number): boolean;
    MergeDocuments(file: object): void;
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
    ReplaceDocumentContent(documentContent: ApiDocumentContent): boolean;
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;
    Save(): boolean;
    ThemeColor(name?: SchemeColorId): ApiColor;
    TwipsToPoints(twips: number): number;
    attachEvent(eventName: string, callback: (...args: any[]) => any): boolean;
    detachEvent(eventName: string): boolean;
  }

  /** Class representing a container for the document content. */
  export interface ApiBlockLvlSdt {
    AddCaption(additionalText: string, label?: CaptionLabel | string, excludeLabel?: boolean, numFormat?: CaptionNumberingFormat, isBefore?: boolean, headingLvl?: number, captionSep?: CaptionSep): boolean;
    AddComment(text: string, author?: string, userId?: string): ApiComment;
    AddElement(element: DocumentElement, pos: number): boolean;
    AddText(text: string): boolean;
    Copy(): ApiBlockLvlSdt;
    Delete(keepContent: boolean): boolean;
    GetAlias(): string;
    GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
    GetAllDrawingObjects(): Drawing[];
    GetAllParagraphs(): ApiParagraph[];
    GetAllTablesOnPage(page: any): ApiTable[];
    GetAppearance(): "boundingBox" | "hidden";
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "blockLvlSdt";
    GetContent(): ApiDocumentContent;
    GetDataBinding(): XmlMapping;
    GetDataForXmlMapping(): string;
    GetDropdownList(): ApiContentControlList;
    GetId(): string;
    GetInternalId(): string;
    GetLabel(): number;
    GetLock(): SdtLock;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPlaceholderText(): string;
    GetPosInParent(): number;
    GetRange(start: number, end: number): ApiRange;
    GetTag(): string;
    IsPicture(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    Push(element: DocumentElement): boolean;
    RemoveAllElements(): boolean;
    ReplaceByElement(oElement: DocumentElement): boolean;
    Search(text: string, isMatchCase: boolean): ApiRange[];
    Select(): boolean;
    SetAlias(alias: string): boolean;
    SetAppearance(type: "boundingBox" | "hidden"): void;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetDataBinding(xmlMapping: XmlMapping | null): boolean;
    SetId(id: number): void;
    SetLabel(label: number): boolean;
    SetLock(lockType: "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked"): boolean;
    SetPicture(imageUrl: string): boolean;
    SetPlaceholderText(text: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    UpdateFromXmlMapping(): boolean;
  }

  /** Class representing a bookmark in the document. */
  export interface ApiBookmark {
    Delete(): boolean;
    GetName(): string;
    GetRange(): ApiRange;
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;
    GoTo(): boolean;
    Select(): boolean;
    SetName(sNewName: string): boolean;
    SetText(sText: string): boolean;
  }

  /** Class representing a paragraph bullet. */
  export interface ApiBullet {
  }

  /** Class representing a chart. */
  export interface ApiChart {
    AddBreak(breakType: number, position: string): boolean;
    ApplyChartStyle(nStyleId: any): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllSeries(): ApiChartSeries[];
    GetAllowOverlap(): boolean;
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chart";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextChart(): ApiChart | null;
    GetNextDrawing(): ApiDrawing | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevChart(): ApiChart | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetRotation(): number;
    GetSeries(nIdx: number): ApiChartSeries;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetType(): ChartType;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    RemoveSeria(nSeria: number): boolean;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;
    SetCategoryName(sName: string, nCategory: number): boolean;
    SetDataLabelsTextPr(textPr: ApiTextPr): boolean;
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
    SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorAxisLabelsFontSize(nFontSize: number): boolean;
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
    SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLegendFill(oFill: ApiFill): boolean;
    SetLegendFontSize(nFontSize: number): boolean;
    SetLegendOutLine(oStroke: ApiStroke): boolean;
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;
    SetMajorVerticalGridlines(oStroke: ApiStroke): boolean;
    SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetPlotAreaFill(oFill: ApiFill): boolean;
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetSeriaName(sName: string, nSeria: number): boolean;
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;
    SetSeriaValues(aValues: number[], nSeria: number): boolean;
    SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;
    SetSeriesOutLine(oStroke: ApiStroke, nSeries: number, bAll?: boolean): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetShowDataLabels(bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;
    SetShowDataTable(bShow: boolean, bShowKeys?: boolean): boolean;
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetTitleFill(oFill: ApiFill): boolean;
    SetTitleOutLine(oStroke: ApiStroke): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;
    SetVerAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertAxisLabelsFontSize(nFontSize: number): boolean;
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    SetXValues(aValues: string[]): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
    ChangeChartType(sType: ChartType): boolean;
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chartSeries";
    GetType(): ChartType;
  }

  /** Class representing a document checkbox / radio button. */
  export interface ApiCheckBoxForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetChoiceName(): string;
    GetClassType(): "checkBoxForm";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetGroupValue(): string;
    GetInternalId(): string;
    GetLabel(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRadioGroup(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): boolean;
    GetWrapperShape(): ApiShape;
    IsChecked(): boolean;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRadioButton(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetChecked(isChecked: boolean): boolean;
    SetChoiceName(choiceName: string): boolean;
    SetFormKey(sKey: string): boolean;
    SetGroupValue(value: string): boolean;
    SetLabel(label: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRadioGroup(sKey: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: boolean): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
    FromJSON(jsonObject: string): ApiColor | null;
    GetClassType(): "color";
    GetHex(): string;
    GetRGB(): object;
    GetRGBA(): object;
    GetThemeName(): SchemeColorId | null;
    IsAutoColor(): boolean;
    IsThemeColor(): boolean;
    ToJSON(): string;
  }

  /** Class representing a document combo box / drop-down list. */
  export interface ApiComboBoxForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "comboBoxForm";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetInternalId(): string;
    GetListValues(): string[];
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string;
    GetWrapperShape(): ApiShape;
    IsEditable(): boolean;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SelectListValue(sValue: string): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetFormKey(sKey: string): boolean;
    SetListValues(aListString: string[]): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetText(sText: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing a comment. */
  export interface ApiComment {
    AddReply(sText: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;
    Delete(): boolean;
    GetAuthorName(): string;
    GetClassType(): "comment";
    GetId(): string;
    GetQuoteText(): number;
    GetRepliesCount(): number;
    GetReply(nIndex?: number): ApiCommentReply;
    GetText(): string;
    GetTime(): number;
    GetTimeUTC(): number;
    GetUserId(): string;
    IsSolved(): boolean;
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): ApiComment;
    SetAuthorName(sAuthorName: string): ApiComment;
    SetSolved(bSolved: boolean): ApiComment;
    SetText(sText: string): ApiComment;
    SetTime(nTimeStamp: number | string): ApiComment;
    SetTimeUTC(nTimeStamp: number | string): ApiComment;
    SetUserId(sUserId: string): ApiComment;
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
    GetAuthorName(): string;
    GetClassType(): "commentReply";
    GetText(): string;
    GetUserId(): string;
    SetAuthorName(sAuthorName: string): ApiCommentReply;
    SetText(sText: string): ApiCommentReply;
    SetUserId(sUserId: string): ApiCommentReply;
  }

  /** Class representing a complex field. */
  export interface ApiComplexForm {
    Add(value: string | ApiDateForm | ApiPictureForm | ApiCheckBoxForm | ApiComboBoxForm | ApiTextForm): boolean;
    Clear(): boolean;
    ClearContent(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "form";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetInternalId(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetSubForms(): ApiForm[];
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string;
    GetWrapperShape(): ApiShape;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetFormKey(sKey: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string | boolean): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing a list of values of the combo box / drop-down list content control. */
  export interface ApiContentControlList {
    Add(sText: string, sValue: string, nIndex?: number): boolean;
    Clear(): boolean;
    GetAllItems(): ApiContentControlListEntry[];
    GetClassType(): "contentControlList";
    GetElementsCount(): number;
    GetItem(nIndex: number): ApiContentControlListEntry;
    GetParent(): ApiInlineLvlSdt | ApiBlockLvlSdt;
  }

  /** Class representing an entry of the combo box / drop-down list content control. */
  export interface ApiContentControlListEntry {
    Delete(): boolean;
    GetClassType(): "contentControlList";
    GetIndex(): number;
    GetParent(): ApiContentControlList;
    GetText(): string;
    GetValue(): string;
    MoveDown(): boolean;
    MoveUp(): boolean;
    Select(): boolean;
    SetIndex(nIndex: number): boolean;
    SetText(sText: string): boolean;
    SetValue(sValue: string): boolean;
  }

  /** Class representing document properties (similar to BuiltInDocumentProperties in VBA). */
  export interface ApiCore {
    GetCategory(): string;
    GetClassType(): "core";
    GetContentStatus(): string;
    GetCreated(): Date;
    GetCreator(): string;
    GetDescription(): string;
    GetIdentifier(): string;
    GetKeywords(): string;
    GetLanguage(): string;
    GetLastModifiedBy(): string;
    GetLastPrinted(): Date;
    GetModified(): Date;
    GetRevision(): string;
    GetSubject(): string;
    GetTitle(): string;
    GetVersion(): string;
    SetCategory(sCategory: string): void;
    SetContentStatus(sStatus: string): void;
    SetCreated(oCreated: Date): void;
    SetCreator(sCreator: string): void;
    SetDescription(sDescription: string): void;
    SetIdentifier(sIdentifier: string): void;
    SetKeywords(sKeywords: string): void;
    SetLanguage(sLanguage: string): void;
    SetLastModifiedBy(sLastModifiedBy: string): void;
    SetLastPrinted(oLastPrinted: Date): void;
    SetModified(oModified: Date): void;
    SetRevision(sRevision: string): void;
    SetSubject(sSubject: string): void;
    SetTitle(sTitle: string): void;
    SetVersion(sVersion: string): void;
  }

  /** Class representing custom properties of the document. */
  export interface ApiCustomProperties {
    Add(name: string, value: string | number | boolean | Date): boolean;
    Get(name: string): string | number | Date | boolean | null;
    GetClassType(): "customProperties";
  }

  /** Class representing a custom XML node. */
  export interface ApiCustomXmlNode {
    Add(nodeName: string): ApiCustomXmlNode;
    Delete(): boolean;
    DeleteAttribute(name: string): boolean;
    GetAttribute(name: string): string | null;
    GetAttributes(): CustomXmlNodeAttribute[];
    GetClassType(): "customXmlNode";
    GetNodeName(): string;
    GetNodeValue(): string;
    GetNodes(xPath: string): ApiCustomXmlNode[];
    GetParent(): ApiCustomXmlNode | null;
    GetText(): string;
    GetXPath(): string;
    GetXml(): string;
    SetAttribute(name: string, value: string): boolean;
    SetNodeValue(xml: string): boolean;
    SetText(str: string): boolean;
    SetXml(strXml: string): boolean;
    UpdateAttribute(name: string, value: string): boolean;
  }

  /** Class representing a custom XML part. */
  export interface ApiCustomXmlPart {
    Delete(): boolean;
    DeleteAttribute(xPath: string, name: string): boolean;
    DeleteElement(xPath: string): boolean;
    GetAttribute(xPath: string, name: string): string | null;
    GetClassType(): "customXmlPart";
    GetId(): string;
    GetNodes(xPath: string): ApiCustomXmlNode[];
    GetXml(): string;
    InsertAttribute(xPath: string, name: string, value: string): boolean;
    InsertElement(xPath: string, xmlStr: string, index?: number): boolean;
    UpdateAttribute(xPath: string, name: string, value: string): boolean;
    UpdateElement(xPath: string, xmlStr: string): boolean;
  }

  /** Class representing a custom XML manager, which provides methods to manage custom XML parts in the document. */
  export interface ApiCustomXmlParts {
    Add(xml: string): ApiCustomXmlPart;
    GetAll(): ApiCustomXmlPart[];
    GetById(xmlPartId: string): ApiCustomXmlPart | null;
    GetByNamespace(namespace: string): ApiCustomXmlPart[];
    GetClassType(): "customXmlParts";
    GetCount(): number;
  }

  /** Class representing a document date field. */
  export interface ApiDateForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "dateForm";
    GetDate(): undefined | Date;
    GetFormKey(): string;
    GetFormType(): FormType;
    GetFormat(): string;
    GetInternalId(): string;
    GetLanguage(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTime(): undefined | number;
    GetTipText(): string;
    GetValue(): Date | undefined;
    GetWrapperShape(): ApiShape;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetDate(date: Date | string): boolean;
    SetFormKey(sKey: string): boolean;
    SetFormat(sFormat: string): boolean;
    SetLanguage(sLangId: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTime(nTimeStamp: number): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: Date | string): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing a document. */
  export interface ApiDocument {
    AcceptAllRevisionChanges(): boolean;
    AddCheckBoxContentControl(checkBoxPr: ContentControlCheckBoxPr): ApiInlineLvlSdt;
    AddComboBoxContentControl(list?: ContentControlListItem[], selected?: string): ApiInlineLvlSdt;
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddDatePickerContentControl(datePickerPr?: ContentControlDatePr): ApiInlineLvlSdt;
    AddDrawingToPage(oDrawing: ApiDrawing, nPage: number, x: number, y: number): boolean;
    AddDropDownListContentControl(list?: ContentControlListItem[], selected?: string): ApiInlineLvlSdt;
    AddElement(nPos: number, oElement: DocumentElement): boolean;
    AddEndnote(): ApiDocumentContent;
    AddFootnote(): ApiDocumentContent;
    AddMathEquation(sText: string, sFormat?: "unicode" | "latex" | "mathml"): boolean;
    AddParagraph(): ApiParagraph;
    AddPictureContentControl(width?: number, height?: number): ApiInlineLvlSdt;
    AddTableOfContents(oTocPr?: TocPr, oRange?: ApiRange): ApiTableOfContents;
    AddTableOfFigures(oTofPr?: TofPr, oRange?: ApiRange): ApiTableOfFigures;
    AddText(text: string): ApiRun;
    ClearAllFields(): boolean;
    CreateNewHistoryPoint(): boolean;
    CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;
    CreateParagraph(): ApiParagraph;
    CreateSection(oParagraph: ApiParagraph): ApiSection | null;
    CreateStyle(styleName: string, type?: StyleType): ApiStyle;
    CreateTable(rows: number, cols: number): ApiTable;
    DeleteBookmark(sName: string): boolean;
    EnterText(sText: string): boolean;
    GetActiveTable(): ApiTable | null;
    GetAllBookmarksNames(): string[];
    GetAllCaptionParagraphs(sCaption: CaptionLabel | string): ApiParagraph[];
    GetAllCharts(): ApiChart[];
    GetAllComments(): ApiComment[];
    GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
    GetAllDrawingObjects(): Drawing[];
    GetAllForms(): ApiForm[];
    GetAllHeadingParagraphs(): ApiParagraph[];
    GetAllImages(): ApiImage[];
    GetAllNumberedParagraphs(): ApiParagraph[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllParagraphs(): ApiParagraph[];
    GetAllShapes(): ApiShape[];
    GetAllStyles(): ApiStyle[];
    GetAllTables(): ApiTable[];
    GetAllTablesOnPage(nPage: number): ApiTable[];
    GetBookmark(sBookmarkName: string): ApiBookmark;
    GetBookmarkRange(sName: string): ApiRange | null;
    GetClassType(): "document";
    GetCommentById(sId: string): ApiComment;
    GetCommentsReport(): CommentReport;
    GetContent(bGetCopies: boolean): DocumentElement[];
    GetContentControlsByTag(sTag: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
    GetControlsHighlight(): ApiColor | null;
    GetCore(): ApiCore;
    GetCurrentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
    GetCurrentFootEndnote(): ApiDocumentContent;
    GetCurrentPage(): number;
    GetCurrentParagraph(): ApiParagraph;
    GetCurrentRun(): ApiRun;
    GetCurrentSentence(sPart?: "before" | "after"): string;
    GetCurrentVisiblePages(): number[];
    GetCurrentWord(sWordPart?: "before" | "after"): string;
    GetCustomProperties(): ApiCustomProperties;
    GetCustomXmlParts(): ApiCustomXmlParts | null;
    GetDefaultParaPr(): ApiParaPr;
    GetDefaultStyle(sStyleType: StyleType): ApiStyle;
    GetDefaultTextPr(): ApiTextPr;
    GetDocumentInfo(): object;
    GetDrawingsByName(ids: string[]): ApiDrawing[];
    GetElement(nPos: number): DocumentElement;
    GetElementsCount(): number;
    GetEndNotesFirstParagraphs(): ApiParagraph[];
    GetFinalSection(): ApiSection;
    GetFootnotesFirstParagraphs(): ApiParagraph[];
    GetFormKeysByRole(role: string): string[];
    GetFormValueByKey(key: string): null | boolean | string;
    GetFormsByKey(key: string): ApiForm[];
    GetFormsByRole(role: string): ApiForm[];
    GetFormsByTag(sTag: string): ApiForm[];
    GetFormsData(): FormData[];
    GetFormsHighlight(): ApiColor | null;
    GetInternalId(): string;
    GetPageCount(): number;
    GetRange(Start: number, End: number): ApiRange;
    GetRangeBySelect(): ApiRange | null;
    GetReviewReport(): ReviewReport;
    GetSections(): ApiSection[];
    GetSelectedDrawings(): Drawing[];
    GetStatistics(): object;
    GetStyle(styleName: string): ApiStyle | null;
    GetTagsOfAllContentControls(): string[];
    GetTagsOfAllForms(): string[];
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;
    GetWatermarkSettings(): ApiWatermarkSettings;
    GoToPage(index: number): boolean;
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
    InsertBlankPage(): boolean;
    InsertContent(content: (DocumentElement | ParagraphContent | ApiDrawing | string | number)[], isInline?: boolean, pr?: object): boolean;
    InsertParagraphBreak(): boolean;
    InsertWatermark(sText?: string, bIsDiagonal?: boolean): boolean;
    IsEndnote(): boolean;
    IsFootnote(): boolean;
    IsTrackRevisions(): boolean;
    Last(): DocumentElement;
    MoveCursorDown(count?: number, addToSelect?: boolean): boolean;
    MoveCursorLeft(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;
    MoveCursorRight(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;
    MoveCursorToEnd(): boolean;
    MoveCursorToFooter(page?: number): boolean;
    MoveCursorToHeader(page?: number): boolean;
    MoveCursorToMainDocument(): boolean;
    MoveCursorToNoteReference(isBefore: boolean): boolean;
    MoveCursorToPos(nPos?: number): boolean;
    MoveCursorToStart(): boolean;
    MoveCursorUp(count?: number, addToSelect?: boolean): boolean;
    Push(oElement: DocumentElement): boolean;
    RejectAllRevisionChanges(): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    RemoveSelection(): boolean;
    RemoveWatermark(): boolean;
    ReplaceCurrentImage(sImageUrl: string, Width: number, Height: number): boolean;
    ReplaceCurrentSentence(sReplace: string, sPart?: "before" | "after"): boolean;
    ReplaceCurrentWord(sReplace: string, sPart?: "before" | "after"): boolean;
    ReplaceDrawing(oOldDrawing: ApiDrawing, oNewDrawing: ApiDrawing, bSaveOldDrawingPr?: boolean): boolean;
    Search(sText: string, isMatchCase: boolean): ApiRange[];
    SearchAndReplace(oProperties: object, oProperties_searchString: string, oProperties_replaceString: string, oProperties_matchCase?: string): boolean;
    SelectCurrentWord(): object;
    SelectNoteReference(): boolean;
    SetAssistantTrackRevisions(isTrack: boolean, assistantName: string): boolean;
    SetControlsHighlight(color: ApiColor): boolean;
    SetEvenAndOddHdrFtr(isEvenAndOdd: boolean): boolean;
    SetFormsData(arrData: FormData[]): boolean;
    SetFormsHighlight(color: ApiColor): boolean;
    SetText(text: string): ApiRun;
    SetTrackRevisions(isTrack: boolean): boolean;
    SetWatermarkSettings(Settings: ApiWatermarkSettings): ApiDrawing;
    ShowComment(commentId: string | string[]): boolean;
    ToHtml(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
    ToJSON(bWriteDefaultTextPr: boolean, bWriteDefaultParaPr: boolean, bWriteTheme: boolean, bWriteSectionPr: boolean, bWriteNumberings: boolean, bWriteStyles: boolean): object;
    ToMarkdown(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
    UpdateAllFields(bBySelection?: boolean): boolean;
    UpdateAllTOC(bOnlyPageNumbers?: boolean): boolean;
    UpdateAllTOF(bOnlyPageNumbers?: boolean): boolean;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
    AddElement(nPos: number, oElement: DocumentElement): boolean;
    AddParagraph(): ApiParagraph;
    AddText(text: string): ApiRun;
    GetAllCharts(): ApiChart[];
    GetAllDrawingObjects(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllParagraphs(): ApiParagraph[];
    GetAllShapes(): ApiShape[];
    GetAllTables(): ApiTable[];
    GetClassType(): "documentContent";
    GetContent(bGetCopies: boolean): DocumentElement[];
    GetCurrentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
    GetCurrentParagraph(): ApiParagraph;
    GetCurrentRun(): ApiRun;
    GetElement(nPos: number): DocumentElement;
    GetElementsCount(): number;
    GetInternalId(): string;
    GetRange(Start: number, End: number): ApiRange;
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;
    IsEndnote(): boolean;
    IsFootnote(): boolean;
    MoveCursorToNoteReference(isBefore: boolean): boolean;
    Push(oElement: DocumentElement): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    SelectNoteReference(): boolean;
    SetText(text: string): ApiRun;
    ToJSON(isWriteNumberings: boolean, isWriteStyles: boolean): object;
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetClassType(): "drawing";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
  }

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into aseparate framed paragraph. */
  export interface ApiDropCap {
    Clear(): boolean;
    GetClassType(): "dropCap";
    GetDistanceFromText(): number;
    GetLinesToDrop(): number;
    GetParent(): ApiParagraph;
    GetPosition(): "none" | "drop" | "margin";
    SetDistanceFromText(distance: number): ApiDropCap;
    SetFontFamily(fontFamily: string): ApiDropCap;
    SetLinesToDrop(lines: number): ApiDropCap;
    SetPosition(position: "none" | "drop" | "margin"): ApiDropCap;
  }

  /** Class representing a base class for fill. */
  export interface ApiFill {
    GetClassType(): "fill";
    GetType(): FillType;
    ToJSON(): object;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "form";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetInternalId(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string | boolean;
    GetWrapperShape(): ApiShape;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetFormKey(sKey: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string | boolean): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
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
    ToJSON(): object;
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetClassType(): "group";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Ungroup(): ApiDrawing[] | null;
    Unselect(): boolean;
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
    GetClassType(): "hyperlink";
    GetDisplayedText(): string;
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetLinkedText(): string;
    GetRange(Start: number, End: number): ApiRange;
    GetScreenTipText(): string;
    SetDefaultStyle(): boolean;
    SetDisplayedText(sDisplay: string): boolean;
    SetLink(sLink: string): boolean;
    SetScreenTipText(sScreenTipText: string): boolean;
    ToJSON(bWriteStyles: boolean): object;
  }

  /** Class representing an image. */
  export interface ApiImage {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetClassType(): "image";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetNextImage(): ApiImage | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetPrevImage(): ApiImage | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;
    AddListItem(name: string, value: string, pos?: number): boolean;
    AddText(text: string): ApiRun;
    Copy(): ApiInlineLvlSdt;
    Delete(keepContent: boolean): boolean;
    GetAlias(): string;
    GetAppearance(): "boundingBox" | "hidden";
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "inlineLvlSdt";
    GetColor(): ApiColor | null;
    GetDataBinding(): XmlMapping;
    GetDataForXmlMapping(): string;
    GetDate(): undefined | Date;
    GetDropdownList(): ApiContentControlList;
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetId(): string;
    GetInternalId(): string;
    GetLabel(): number;
    GetLock(): SdtLock;
    GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPlaceholderText(): string;
    GetRange(Start: number, End: number): ApiRange;
    GetTag(): string;
    IsCheckBox(): boolean;
    IsCheckBoxChecked(): boolean;
    IsComboBox(): boolean;
    IsDatePicker(): boolean;
    IsDropDownList(): boolean;
    IsForm(): boolean;
    IsPicture(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    Push(oElement: DocumentElement): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    RemoveListItem(value: string): boolean;
    Select(): boolean;
    SelectListItem(name: string): boolean;
    SetAlias(sAlias: string): boolean;
    SetAppearance(type: "boundingBox" | "hidden"): void;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetCheckBoxChecked(isChecked: boolean): boolean;
    SetColor(color: ApiColor | null): boolean;
    SetDataBinding(xmlMapping: XmlMapping | null): boolean;
    SetDate(date: Date): boolean;
    SetDateFormat(dateFormat: string): boolean;
    SetId(id: number): boolean;
    SetLabel(label: number): boolean;
    SetLock(lockType: "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked"): boolean;
    SetPicture(imageUrl: string): boolean;
    SetPictureSize(width: number, height: number): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetTag(sTag: string): boolean;
    SetTextPr(oTextPr: ApiTextPr): ApiInlineLvlSdt;
    ToJSON(bWriteStyles: boolean): object;
    UpdateFromXmlMapping(): boolean;
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
    GetClassType(): "math";
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
    GetClassType(): "numbering";
    GetLevel(nLevel: number): ApiNumberingLevel;
    ToJSON(): object;
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
    GetClassType(): "numberingLevel";
    GetLevelIndex(): number;
    GetNumbering(): ApiNumbering;
    GetParaPr(): ApiParaPr;
    GetTextPr(): ApiTextPr;
    LinkWithStyle(oStyle: ApiStyle): boolean;
    SetCustomType(sType: "none" | "bullet" | "decimal" | "lowerRoman" | "upperRoman" | "lowerLetter" | "upperLetter" | "decimalZero", sTextFormatString: string, sAlign: "left" | "right" | "center"): boolean;
    SetRestart(isRestart: boolean): boolean;
    SetStart(nStart: number): boolean;
    SetSuff(sType: "space" | "tab" | "none"): boolean;
    SetTemplateType(sType: "none" | "bullet" | "1)" | "1." | "I." | "A." | "a)" | "a." | "i.", sSymbol?: string): boolean;
  }

  /** Class representing an Ole object. */
  export interface ApiOleObject {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetApplicationId(): string;
    GetClassType(): "oleObject";
    GetContent(): ApiDocumentContent;
    GetData(): string;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetApplicationId(sAppId: string): boolean;
    SetData(sData: string): boolean;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
    GetBetweenBorder(): Border | undefined;
    GetBottomBorder(): Border | undefined;
    GetClassType(): "paraPr";
    GetContextualSpacing(): boolean | undefined;
    GetIndFirstLine(): number | undefined;
    GetIndLeft(): number | undefined;
    GetIndRight(): number | undefined;
    GetJc(): "left" | "right" | "both" | "center" | undefined;
    GetKeepLines(): boolean | undefined;
    GetKeepNext(): boolean | undefined;
    GetLeftBorder(): Border | undefined;
    GetNumPr(): ApiNumberingLevel | undefined;
    GetOutlineLvl(): number | undefined;
    GetPageBreakBefore(): boolean | undefined;
    GetRightBorder(): Border | undefined;
    GetShd(): Shd | undefined;
    GetSpacingAfter(): number;
    GetSpacingBefore(): number;
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
    GetSpacingLineValue(): number | line240 | undefined;
    GetStyle(): ApiStyle;
    GetTabs(): TabStop[];
    GetTopBorder(): Border | undefined;
    GetWidowControl(): boolean | undefined;
    SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetContextualSpacing(isContextualSpacing: boolean): boolean;
    SetIndFirstLine(nValue: number): boolean;
    SetIndLeft(nValue: number): boolean;
    SetIndRight(nValue: number): boolean;
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;
    SetKeepLines(isKeepLines: boolean): boolean;
    SetKeepNext(isKeepNext: boolean): boolean;
    SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetNumPr(oNumPr: ApiNumbering, nLvl?: number): boolean;
    SetOutlineLvl(lvl?: number | null): boolean;
    SetPageBreakBefore(isPageBreakBefore: boolean): boolean;
    SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetShd(type: ShdType, color: ApiColor): boolean;
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;
    SetStyle(oStyle: ApiStyle): boolean;
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
    SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetWidowControl(isWidowControl: boolean): boolean;
    ToJSON(bWriteStyles: boolean): object;
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph {
    AddBookmarkCrossRef(sRefTo: bookmarkRefTo, sBookmarkName: string, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
    AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
    AddCaptionCrossRef(sCaption: CaptionLabel | string, sRefType: captionRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
    AddColumnBreak(): ApiRun;
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddDrawing(oDrawing: ApiDrawing): ApiRun;
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;
    AddEndnoteCrossRef(sRefType: endnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
    AddFootnoteCrossRef(sRefType: footnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
    AddHeadingCrossRef(sRefType: headingRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;
    AddInlineLvlSdt(oSdt: ApiInlineLvlSdt): ApiInlineLvlSdt;
    AddLineBreak(): ApiRun;
    AddNumberedCrossRef(sRefType: numberedRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
    AddPageBreak(): ApiRun;
    AddPageBreakBefore(): ApiParagraph;
    AddPageNumber(): ApiRun;
    AddPagesCount(): ApiRun;
    AddTabStop(): ApiRun;
    AddText(text: string | number[], widths?: number[]): ApiRun;
    Copy(): ApiParagraph;
    Delete(): boolean;
    GetAllCharts(): ApiChart[];
    GetAllContentControls(): ApiInlineLvlSdt[];
    GetAllDrawingObjects(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllShapes(): ApiShape[];
    GetBetweenBorder(): Border | undefined;
    GetBottomBorder(): Border | undefined;
    GetClassType(): "paragraph";
    GetContextualSpacing(): boolean | undefined;
    GetDropCap(): ApiDropCap;
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetFontNames(): string[];
    GetIndFirstLine(): number | undefined;
    GetIndLeft(): number | undefined;
    GetIndRight(): number | undefined;
    GetInternalId(): string;
    GetJc(): "left" | "right" | "both" | "center" | undefined;
    GetKeepLines(): boolean | undefined;
    GetKeepNext(): boolean | undefined;
    GetLastRunWithText(): ApiRun;
    GetLeftBorder(): Border | undefined;
    GetNext(): ApiParagraph | null;
    GetNumPr(): ApiNumberingLevel | undefined;
    GetNumbering(): ApiNumberingLevel;
    GetOutlineLvl(): number | undefined;
    GetPageBreakBefore(): boolean | undefined;
    GetParaId(): number;
    GetParaPr(): ApiParaPr;
    GetParagraphMarkTextPr(): ApiTextPr;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPosInParent(): number;
    GetPrevious(): ApiParagraph;
    GetRange(Start: number, End: number): ApiRange | null;
    GetRightBorder(): Border | undefined;
    GetSection(): ApiSection;
    GetShd(): Shd | undefined;
    GetSpacingAfter(): number;
    GetSpacingBefore(): number;
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
    GetSpacingLineValue(): number | line240 | undefined;
    GetStyle(): ApiStyle;
    GetTabs(): TabStop[];
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TabSymbol?: string): string;
    GetTextPr(): ApiTextPr;
    GetTopBorder(): Border | undefined;
    GetWidowControl(): boolean | undefined;
    InsertInContentControl(nType: number): ApiParagraph | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;
    IsEmpty(): boolean;
    Last(): ParagraphContent;
    Push(oElement: ParagraphContent): boolean;
    RemoveAllElements(): boolean;
    RemoveElement(nPos: number): boolean;
    ReplaceByElement(oElement: DocumentElement): boolean;
    Search(sText: string, isMatchCase: boolean): ApiRange[];
    Select(): boolean;
    SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetBold(isBold: boolean): ApiParagraph;
    SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCaps(isCaps: boolean): ApiParagraph;
    SetColor(color: ApiColor): ApiParagraph;
    SetContextualSpacing(isContextualSpacing: boolean): boolean;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;
    SetDropCap(position: "none" | "drop" | "margin"): ApiDropCap;
    SetFontFamily(sFontFamily: string): ApiParagraph;
    SetFontSize(nSize: hps): ApiParagraph;
    SetHighlight(sColor: highlightColor): ApiParagraph;
    SetIndFirstLine(nValue: number): boolean;
    SetIndLeft(nValue: number): boolean;
    SetIndRight(nValue: number): boolean;
    SetItalic(isItalic: boolean): ApiParagraph;
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;
    SetKeepLines(isKeepLines: boolean): boolean;
    SetKeepNext(isKeepNext: boolean): boolean;
    SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetNumPr(oNumPr: ApiNumbering, nLvl?: number): boolean;
    SetNumbering(oNumberingLevel: ApiNumberingLevel): boolean;
    SetOutlineLvl(lvl?: number | null): boolean;
    SetPageBreakBefore(isPageBreakBefore: boolean): boolean;
    SetParaId(paraId: number): boolean;
    SetPosition(nPosition: hps): ApiParagraph;
    SetReadingOrder(readingOrder?: ReadingOrder): ApiParagraph;
    SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetSection(oSection: ApiSection): boolean;
    SetShd(type: ShdType, color: ApiColor): boolean;
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;
    SetSpacing(nSpacing: number): ApiParagraph;
    SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): boolean;
    SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): boolean;
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;
    SetStrikeout(isStrikeout: boolean): ApiParagraph;
    SetStyle(oStyle: ApiStyle): boolean;
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
    SetText(text: string): ApiRun;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetUnderline(isUnderline: boolean): ApiParagraph;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiParagraph | null;
    SetWidowControl(isWidowControl: boolean): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    WrapInMailMergeField(): boolean;
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
  export interface ApiPictureForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "pictureForm";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetImage(): Base64Img;
    GetInternalId(): string;
    GetLock(): boolean;
    GetPicturePosition(): percentage[];
    GetPlaceholderText(): string;
    GetRole(): string;
    GetScaleFlag(): ScaleFlag;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string;
    GetWrapperShape(): ApiShape;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsLockAspectRatio(): boolean;
    IsRequired(): boolean;
    IsRespectBorders(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetFormKey(sKey: string): boolean;
    SetImage(imageSrc: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetLockAspectRatio(isLock?: boolean): boolean;
    SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRespectBorders(isRespect?: boolean): boolean;
    SetRole(role: string): boolean;
    SetScaleFlag(sScaleFlag: ScaleFlag): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor {
    GetClassType(): "presetColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor {
    GetClassType(): "rgbColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing a continuous region in a document. Each Range object is determined by the position of the start and end characters. */
  export interface ApiRange {
    AddBookmark(sName: string): boolean;
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddField(sCode: string): boolean;
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;
    AddText(text: string, position?: "after" | "before"): boolean;
    Delete(): boolean;
    ExpandTo(oRange: ApiRange): ApiRange | null;
    GetAllParagraphs(): ApiParagraph[];
    GetClassType(): "range";
    GetEndPage(): number;
    GetEndPos(): number;
    GetParagraph(nPos: number): ApiParagraph | null;
    GetRange(Start?: number, End?: number): ApiRange;
    GetStartPage(): number;
    GetStartPos(): number;
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;
    GetTextPr(): ApiTextPr;
    IntersectWith(oRange: ApiRange): ApiRange | null;
    MoveCursorToPos(nPos?: number): boolean;
    Select(): boolean;
    SetBold(isBold: boolean): ApiRange | null;
    SetCaps(isCaps: boolean): ApiRange | null;
    SetColor(color: ApiColor): ApiRange | null;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiRange | null;
    SetEndPos(nPos: number): boolean;
    SetFontFamily(sFontFamily: string): ApiRange | null;
    SetFontSize(FontSize: hps): ApiRange | null;
    SetHighlight(sColor: highlightColor): ApiRange | null;
    SetItalic(isItalic: boolean): ApiRange | null;
    SetPosition(nPosition: hps): ApiRange | null;
    SetShd(type: ShdType, color: ApiColor): ApiRange | null;
    SetSmallCaps(isSmallCaps: boolean): ApiRange | null;
    SetSpacing(nSpacing: number): ApiRange | null;
    SetStartPos(nPos: number): boolean;
    SetStrikeout(isStrikeout: boolean): ApiRange | null;
    SetStyle(oStyle: ApiStyle): ApiRange | null;
    SetTextPr(oTextPr: ApiTextPr): ApiRange | null;
    SetUnderline(isUnderline: boolean): ApiRange | null;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiRange | null;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  export interface ApiRangeTextPr {
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "textPr";
    GetColor(): ApiColor;
    GetDoubleStrikeout(): boolean;
    GetFontFamily(): string;
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetLanguage(): string;
    GetOutLine(): ApiStroke;
    GetPosition(): hps;
    GetShd(): Shd | undefined;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetStyle(): ApiStyle;
    GetTextFill(): ApiFill;
    GetUnderline(): boolean;
    GetVertAlign(): string;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetColor(color: ApiColor): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetLanguage(sLangId: string): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetPosition(nPosition: hps): ApiTextPr;
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetStyle(oStyle: ApiStyle): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
    ToJSON(bWriteStyles: boolean): object;
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun {
    AddColumnBreak(): boolean;
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddDrawing(oDrawing: ApiDrawing): boolean;
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;
    AddLineBreak(): boolean;
    AddPageBreak(): boolean;
    AddTabStop(): boolean;
    AddText(text: string | number[], widths?: number[]): boolean;
    ClearContent(): boolean;
    Copy(): ApiRun;
    Delete(): boolean;
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "run";
    GetColor(): ApiColor;
    GetDoubleStrikeout(): boolean;
    GetFontFamily(): string;
    GetFontNames(): string[];
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetLanguage(): string;
    GetOutLine(): ApiStroke;
    GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
    GetParentParagraph(): ApiParagraph;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPosition(): hps;
    GetRange(Start: number, End: number): ApiRange;
    GetShd(): Shd | undefined;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetStyle(): ApiStyle;
    GetText(options?: object, options_NewLineSeparator?: string, options_TabSymbol?: string): string;
    GetTextFill(): ApiFill;
    GetTextPr(): ApiTextPr;
    GetUnderline(): boolean;
    GetVertAlign(): string;
    MoveCursorToPos(nPos?: number): boolean;
    RemoveAllElements(): boolean;
    Select(): boolean;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetColor(color: ApiColor): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetLanguage(sLangId: string): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetPosition(nPosition: hps): ApiTextPr;
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetStyle(oStyle: ApiStyle): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetTextPr(oTextPr: ApiTextPr): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
    ToJSON(bWriteStyles: boolean): object;
    WrapInMailMergeField(): boolean;
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor {
    GetClassType(): "schemeColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing a document section. */
  export interface ApiSection {
    GetClassType(): "section";
    GetColumnsCount(): number;
    GetColumnsSpaces(): number[];
    GetColumnsWidths(): number[];
    GetFooter(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
    GetFooterDistance(): number;
    GetHeader(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
    GetHeaderDistance(): number;
    GetNext(): ApiSection | null;
    GetPageHeight(): number;
    GetPageMarginBottom(): number;
    GetPageMarginLeft(): number;
    GetPageMarginRight(): number;
    GetPageMarginTop(): number;
    GetPageWidth(): number;
    GetPrevious(): ApiSection | null;
    GetStartPageNumber(): number;
    GetType(): SectionBreakType;
    RemoveFooter(sType: HdrFtrType): boolean;
    RemoveHeader(sType: HdrFtrType): boolean;
    SetEqualColumns(nCount: number, nSpace: number): boolean;
    SetFooterDistance(nDistance: number): boolean;
    SetHeaderDistance(nDistance: number): boolean;
    SetMargins(left: number, top: number, right: number, bottom: number): boolean;
    SetNotEqualColumns(aWidths: number[], aSpaces: number[]): boolean;
    SetPageMargins(left: number, top: number, right: number, bottom: number): boolean;
    SetPageSize(nWidth: number, nHeight: number, isPortrait?: boolean): boolean;
    SetStartPageNumber(nStartNumber: number): boolean;
    SetTitlePage(isTitlePage: boolean): boolean;
    SetType(sType: SectionBreakType): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
    GetClassType(): "shadow";
    GetSettings(): ShadowSettings;
  }

  /** Class representing a shape. */
  export interface ApiShape {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetClassType(): "shape";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetDocContent(): ApiDocumentContent;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetGeometry(): ApiGeometry;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetNextShape(): ApiShape | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetPrevShape(): ApiShape | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetVerticalTextAlign(): VerticalTextAlign;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFill(oFill: ApiFill): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetGeometry(oGeometry: ApiGeometry): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLine(oStroke: ApiStroke): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetClassType(): "signatureForm";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetInternalId(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string;
    GetWrapperShape(): ApiShape;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetFormKey(sKey: string): boolean;
    SetLock(isLock: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt {
    AddBreak(breakType: number, position: string): boolean;
    Copy(): ApiDrawing | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetAllowOverlap(): boolean;
    GetClassType(): "smartArt";
    GetContent(): ApiDocumentContent;
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetNextDrawing(): ApiDrawing | null;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentParagraph(): ApiParagraph | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPrevDrawing(): ApiDrawing | null;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
    ScaleHeight(coefficient: number): boolean;
    ScaleWidth(coefficient: number): boolean;
    Select(isReplace?: boolean): boolean;
    SetAllowOverlap(bOverlap: boolean): void;
    SetDescription(description: string): boolean;
    SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;
    SetHorFlip(bFlip: boolean): boolean;
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: number | number, bPercent?: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(oStroke: ApiStroke): boolean;
    SetRelativeHeight(relativeFrom?: SizeRelFromV, percent?: percentage): boolean;
    SetRelativeWidth(relativeFrom?: SizeRelFromH, percent?: percentage): boolean;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: number | number, bPercent?: boolean): boolean;
    SetVertFlip(bFlip: boolean): boolean;
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
    Unselect(): boolean;
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
    ToJSON(): object;
  }

  /** Class representing a style. */
  export interface ApiStyle {
    GetClassType(): "style";
    GetConditionalTableStyle(sType?: TableStyleOverrideType): ApiTableStylePr;
    GetName(): string;
    GetParaPr(): ApiParaPr;
    GetTableCellPr(): ApiTableCellPr;
    GetTablePr(): ApiTablePr;
    GetTableRowPr(): ApiTableRowPr;
    GetTextPr(): ApiTextPr;
    GetType(): StyleType;
    SetBasedOn(oStyle: ApiStyle): boolean;
    SetConditionalTableStyle(oTableStylePr: ApiTableStylePr): ApiStyle;
    SetName(sStyleName: string): boolean;
    SetParaPr(paraPr: ApiParaPr): ApiStyle;
    SetTableCellPr(tableCellPr: ApiTableCellPr): ApiStyle;
    SetTablePr(tablePr: ApiTablePr): ApiStyle;
    SetTableRowPr(tableRowPr: ApiTableRowPr): ApiStyle;
    SetTextPr(textPr: ApiTextPr): ApiStyle;
    ToJSON(bWriteNumberings: boolean): object;
  }

  /** Class representing a table. */
  export interface ApiTable {
    AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
    AddColumn(oCell?: ApiTableCell, isBefore?: boolean): boolean;
    AddColumns(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable;
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;
    AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
    AddRows(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable;
    Clear(): boolean;
    Copy(): ApiTable;
    Delete(): boolean;
    GetAllCells(): ApiTableCell[];
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell;
    GetClassType(): "table";
    GetColumnWidth(columnIndex: number): number | null;
    GetInternalId(): string;
    GetParentContentControl(): ApiBlockLvlSdt | null;
    GetParentTable(): ApiTable | null;
    GetParentTableCell(): ApiTableCell | null;
    GetPosInParent(): number;
    GetRange(Start: number, End: number): ApiRange;
    GetRow(rowIndex: number): ApiTableRow;
    GetRowsCount(): number;
    GetSelectedColumnsCells(): ApiTableCell[];
    GetSelectedRows(): ApiTableRow[];
    GetTableDescription(): string;
    GetTableLook(): TableLook;
    GetTableTitle(): string;
    GetTables(): ApiTable[];
    InsertInContentControl(nType: number): ApiTable | ApiBlockLvlSdt;
    MergeCells(aCells: ApiTableCell[]): ApiTableCell;
    RemoveColumn(oCell: ApiTableCell): boolean;
    RemoveRow(oCell: ApiTableCell): boolean;
    ReplaceByElement(oElement: DocumentElement): boolean;
    Search(sText: string, isMatchCase: boolean): ApiRange[];
    Select(): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetCellSpacing(nValue: number): boolean;
    SetColumnWidth(columnIndex: number, width: number): number | null;
    SetHAlign(sType: string): boolean;
    SetHeight(nValue: number): number | null;
    SetJc(sJcType: "left" | "right" | "center"): boolean;
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;
    SetStyle(oStyle: ApiStyle): boolean;
    SetStyleColBandSize(nCount: number): boolean;
    SetStyleRowBandSize(nCount: number): boolean;
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableCellMarginBottom(nValue: number): boolean;
    SetTableCellMarginLeft(nValue: number): boolean;
    SetTableCellMarginRight(nValue: number): boolean;
    SetTableCellMarginTop(nValue: number): boolean;
    SetTableDescription(sDescr: string): boolean;
    SetTableInd(nValue: number): boolean;
    SetTableLayout(sType: "autofit" | "fixed"): boolean;
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): boolean;
    SetTableTitle(sTitle: string): boolean;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    SetVAlign(sType: string): boolean;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
    SetWrappingStyle(isFlow: boolean): boolean;
    Split(oCell?: ApiTableCell, nRow?: number, nCol?: number): ApiTable | null;
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /** Class representing a table cell. */
  export interface ApiTableCell {
    AddColumns(nCount: number, isBefore?: boolean): ApiTable | null;
    AddElement(nPos: number, oElement: DocumentElement): boolean;
    AddRows(nCount: number, isBefore?: boolean): ApiTable | null;
    AddText(text: string): ApiRun;
    Clear(): boolean;
    GetBackgroundColor(): ApiColor;
    GetClassType(): "tableCell";
    GetContent(): ApiDocumentContent;
    GetIndex(): number;
    GetInternalId(): string;
    GetNext(): ApiTableCell | null;
    GetParentRow(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableCell | null;
    GetRowIndex(): number;
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;
    RemoveColumn(): boolean;
    RemoveRow(): boolean;
    Search(sText: string, isMatchCase: boolean): ApiRange[];
    SetBackgroundColor(color?: ApiColor): boolean;
    SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellMarginBottom(nValue: number): boolean;
    SetCellMarginLeft(nValue: number): boolean;
    SetCellMarginRight(nValue: number): boolean;
    SetCellMarginTop(nValue: number): boolean;
    SetCellPr(oApiTableCellPr: ApiTableCellPr): boolean;
    SetColumnBackgroundColor(color?: ApiColor): boolean;
    SetNoWrap(isNoWrap: boolean): boolean;
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;
    SetText(text: string): ApiRun;
    SetTextDirection(sType: TextFlowDirection): boolean;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    SetVerticalAlign(sType: "top" | "center" | "bottom"): boolean;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
    Split(nRow?: number, nCol?: number): ApiTable | null;
    ToJSON(): object;
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
    GetClassType(): "tableCellPr";
    SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetCellMarginBottom(nValue: number): boolean;
    SetCellMarginLeft(nValue: number): boolean;
    SetCellMarginRight(nValue: number): boolean;
    SetCellMarginTop(nValue: number): boolean;
    SetNoWrap(isNoWrap: boolean): boolean;
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;
    SetTextDirection(sType: TextFlowDirection): boolean;
    SetVerticalAlign(sType: "top" | "center" | "bottom"): boolean;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
    ToJSON(): object;
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
    GetClassType(): "tablePr";
    GetTableDescription(): string;
    GetTableTitle(): string;
    SetCellSpacing(nValue: number): boolean;
    SetJc(sJcType: "left" | "right" | "center"): boolean;
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;
    SetStyleColBandSize(nCount: number): boolean;
    SetStyleRowBandSize(nCount: number): boolean;
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;
    SetTableCellMarginBottom(nValue: number): boolean;
    SetTableCellMarginLeft(nValue: number): boolean;
    SetTableCellMarginRight(nValue: number): boolean;
    SetTableCellMarginTop(nValue: number): boolean;
    SetTableDescription(sDescr: string): boolean;
    SetTableInd(nValue: number): boolean;
    SetTableLayout(sType: "autofit" | "fixed"): boolean;
    SetTableTitle(sTitle: string): boolean;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
    ToJSON(): object;
  }

  /** Class representing a table row. */
  export interface ApiTableRow {
    AddRows(nCount: number, isBefore?: boolean): ApiTable | null;
    Clear(): boolean;
    GetCell(cellIndex: number): ApiTableCell;
    GetCellsCount(): number;
    GetClassType(): "tableRow";
    GetHeight(): number | null;
    GetIndex(): number;
    GetInternalId(): string;
    GetNext(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableRow | null;
    MergeCells(): ApiTableCell | null;
    Remove(): boolean;
    Search(sText: string, isMatchCase: boolean): ApiRange[];
    SetBackgroundColor(color?: ApiColor): boolean;
    SetHeight(sHRule: "auto" | "atLeast", nValue?: number): boolean;
    SetRowPr(oApiTableRowPr: ApiTableRowPr): boolean;
    SetTableHeader(isHeader: boolean): boolean;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    ToJSON(): object;
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
    GetClassType(): "tableRowPr";
    SetHeight(sHRule: "auto" | "atLeast", nValue?: number): boolean;
    SetTableHeader(isHeader: boolean): boolean;
    ToJSON(): object;
  }

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a tablewhich match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
    GetClassType(): "tableStylePr";
    GetParaPr(): ApiParaPr;
    GetTableCellPr(): ApiTableCellPr;
    GetTablePr(): ApiTablePr;
    GetTableRowPr(): ApiTableRowPr;
    GetTextPr(): ApiTextPr;
    GetType(): TableStyleOverrideType;
    SetParaPr(oParaPr: ApiParaPr): ApiTableStylePr;
    SetTableCellPr(oTableCellPr: ApiTableCellPr): ApiTableStylePr;
    SetTablePr(oTablePr: ApiTablePr): ApiTableStylePr;
    SetTableRowPr(oTableRowPr: ApiTableRowPr): ApiTableStylePr;
    SetTextPr(oTextPr: ApiTextPr): ApiTableStylePr;
    ToJSON(): object;
  }

  /** Class representing a document text field. */
  export interface ApiTextForm {
    Clear(): boolean;
    Copy(): ApiForm;
    Delete(keepContent: boolean): boolean;
    GetAllowedSymbols(): string;
    GetBackgroundColor(): ApiColor;
    GetBorderColor(): ApiColor;
    GetCharactersLimit(): number;
    GetClassType(): "textForm";
    GetFormKey(): string;
    GetFormType(): FormType;
    GetFormat(): TextFormFormat;
    GetInternalId(): string;
    GetLock(): boolean;
    GetPlaceholderText(): string;
    GetRole(): string;
    GetTag(): string;
    GetText(): string;
    GetTextPr(): ApiTextPr;
    GetTipText(): string;
    GetValue(): string;
    GetWrapperShape(): ApiShape;
    IsAutoFit(): boolean;
    IsComb(): boolean;
    IsFilled(): boolean;
    IsFixed(): boolean;
    IsMultiline(): boolean;
    IsRequired(): boolean;
    MoveCursorOutside(isAfter?: boolean): boolean;
    SetAllowedSymbols(symbols: string): boolean;
    SetAutoFit(bAutoFit: boolean): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetBorderColor(color?: ApiColor): boolean;
    SetCellWidth(nCellWidth?: number): boolean;
    SetCharactersLimit(nChars: number): boolean;
    SetComb(bComb: boolean): boolean;
    SetFormKey(sKey: string): boolean;
    SetFormat(format: TextFormFormat): boolean;
    SetLock(isLock: boolean): boolean;
    SetMultiline(bMultiline: boolean): boolean;
    SetPlaceholderText(sText: string): boolean;
    SetRequired(bRequired: boolean): boolean;
    SetRole(role: string): boolean;
    SetTag(tag: string): boolean;
    SetText(text: string): boolean;
    SetTextPr(textPr: ApiTextPr): boolean;
    SetTipText(sText: string): boolean;
    SetValue(value: string): boolean;
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;
    ToInline(): boolean;
  }

  /** Class representing the text properties. */
  export interface ApiTextPr {
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "textPr";
    GetColor(): ApiColor;
    GetDoubleStrikeout(): boolean;
    GetFontFamily(): string;
    GetFontSize(): hps;
    GetHighlight(): string;
    GetItalic(): boolean;
    GetLanguage(): string;
    GetOutLine(): ApiStroke;
    GetPosition(): hps;
    GetShd(): Shd | undefined;
    GetSmallCaps(): boolean;
    GetSpacing(): number;
    GetStrikeout(): boolean;
    GetStyle(): ApiStyle;
    GetTextFill(): ApiFill;
    GetUnderline(): boolean;
    GetVertAlign(): string;
    SetBold(isBold: boolean): ApiTextPr;
    SetCaps(isCaps: boolean): ApiTextPr;
    SetColor(color: ApiColor): ApiTextPr;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
    SetFontFamily(sFontFamily: string): ApiTextPr;
    SetFontSize(nSize: hps): ApiTextPr;
    SetHighlight(sColor: highlightColor): ApiTextPr;
    SetItalic(isItalic: boolean): ApiTextPr;
    SetLanguage(sLangId: string): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetPosition(nPosition: hps): ApiTextPr;
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetStyle(oStyle: ApiStyle): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
    ToJSON(bWriteStyles: boolean): object;
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
    GetClassType(): "uniColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
    GetClassType(): "unsupported";
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
    GetClassType(): "watermarkSettings";
    GetDirection(): WatermarkDirection;
    GetImageHeight(): number | null;
    GetImageURL(): string | null;
    GetImageWidth(): number | null;
    GetOpacity(): number;
    GetText(): string | null;
    GetTextPr(): ApiTextPr;
    GetType(): WatermarkType;
    SetDirection(sDirection: WatermarkDirection): boolean;
    SetImageSize(nWidth: number, nHeight: number): boolean;
    SetImageURL(sURL: string): boolean;
    SetOpacity(opacity: number): boolean;
    SetText(sText: string): boolean;
    SetTextPr(oTextPr: ApiTextPr): boolean;
    SetType(sType: WatermarkType): boolean;
  }

}
