// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: word

export namespace Word {
  /** Types of all supported forms. */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

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

  /** Option for checkbox */
  export type CheckboxOption = boolean;

  /** Option for radio groups, dropdowns and combo boxes. */
  export interface ChoiceOption {
    /** Stored value. */
    value: string;

    /** Display text. */
    label: string;
  }

  /** The comment data. */
  export interface CommentData {
    /** The comment author. */
    UserName: string;

    /** The comment text. */
    Text: string;

    /** The time when the comment was posted (in milliseconds). */
    Time: string;

    /** Specifies if the comment is resolved (**true**) or not (**false**). */
    Solved: boolean;

    /** An array containing the comment replies represented as the *CommentData* object. */
    Replies: CommentData[];
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

  /** The content control object. */
  export interface ContentControl {
    /**
     * A tag assigned to the content control. The same tag can be assigned to several content controls so
     * that you can make reference to them in your code.
     */
    Tag: string;

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

    /** A group key of the radio button. Present only if the content control is a radio button form field . */
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

  /**
   * Defines the access restrictions for a content control.
   * Possible values:
   * **0** - only deleting,
   * **1** - disable deleting or editing,
   * **2** - only editing,
   * **3** - full access.
   */
  export type ContentControlLock = 0 | 1 | 2 | 3;

  /** Represents an attribute of an XML node. */
  export interface CustomXmlNodeAttribute {
    /** The attribute name. */
    name: string;

    /** The attribute value. */
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

  /**
   * The coordinate value for the geometry paths.
   * Can be a guide name from "gdLst", a numeric value, or a string representation of a number.
   */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /**
   * Header and footer types which can be applied to the document sections.
   * **"default"** - a header or footer which can be applied to any default page.
   * **"title"** - a header or footer which is applied to the title page.
   * **"even"** - a header or footer which can be applied to even pages to distinguish them from the odd
   * ones (which will be considered default).
   */
  export type HdrFtrType = "default" | "title" | "even";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

  /**
   * A paragraph-like container that can directly hold inline-level content (Hyperlink, InlineLvlSdt,
   * etc.).
   */
  export type ParagraphLikeContainer = ApiParagraph | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

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

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    /** The format type. */
    type: "none" | "digit" | "letter" | "mask" | "regExp";

    /** The format value. Required for **"mask"** and **"regExp"** types. */
    value?: string;
  }

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

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

  /** The comment object. */
  export interface comment {
    /** The comment ID. */
    Id: string;

    /** An object which contains the comment data. */
    Data: CommentData;
  }

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

  // Manual overrides (see src/overrides/word.ts) for types sdkjs's own JSDoc doesn't
  // resolve from this package's usual sources
  export interface ApiTableOfContents {
    /** Returns a type of the ApiTableOfContents class. */
    GetClassType(): "tableOfContents";
    /** Updates the table of contents. */
    Update(bOnlyPageNumbers?: boolean): boolean;
    /** Removes the table of contents from the document. */
    Delete(): boolean;
    /** Returns the document that contains the table of contents. */
    GetParent(): ApiDocument | null;
    /** Returns a range that covers the entire table of contents. */
    GetRange(): ApiRange | null;
    /** Returns whether page numbers are shown in the table of contents. */
    GetIncludePageNumbers(): boolean;
    /** Specifies whether page numbers are shown in the table of contents. */
    SetIncludePageNumbers(isInclude: boolean): boolean;
    /** Returns whether page numbers are right-aligned in the table of contents. */
    GetRightAlignPageNumbers(): boolean;
    /** Specifies whether page numbers are right-aligned in the table of contents. */
    SetRightAlignPageNumbers(isRightAlign: boolean): boolean;
    /** Returns whether entries are formatted as hyperlinks. */
    GetUseHyperlinks(): boolean;
    /** Specifies whether entries are formatted as hyperlinks. */
    SetUseHyperlinks(isUseHyperlinks: boolean): boolean;
    /** Returns the highest (outermost) heading level included in the table of contents. */
    GetUpperHeadingLevel(): number;
    /** Sets the highest (outermost) heading level included in the table of contents. */
    SetUpperHeadingLevel(nLevel: number): boolean;
    /** Returns the lowest (innermost) heading level included in the table of contents. */
    GetLowerHeadingLevel(): number;
    /** Sets the lowest (innermost) heading level included in the table of contents. */
    SetLowerHeadingLevel(nLevel: number): boolean;
    /** Applies the specified properties to the table of contents and rebuilds it. */
    SetPr(oTocPr: TocPr): boolean;
  }
  export interface ApiTableOfFigures {
    /** Returns a type of the ApiTableOfFigures class. */
    GetClassType(): "tableOfFigures";
    /** Updates the table of figures. */
    Update(bOnlyPageNumbers?: boolean): boolean;
    /** Removes the table of figures from the document. */
    Delete(): boolean;
    /** Returns the document that contains the table of figures. */
    GetParent(): ApiDocument | null;
    /** Returns a range that covers the entire table of figures. */
    GetRange(): ApiRange | null;
    /** Returns whether page numbers are shown in the table of figures. */
    GetIncludePageNumbers(): boolean;
    /** Specifies whether page numbers are shown in the table of figures. */
    SetIncludePageNumbers(isInclude: boolean): boolean;
    /** Returns whether page numbers are right-aligned in the table of figures. */
    GetRightAlignPageNumbers(): boolean;
    /** Specifies whether page numbers are right-aligned in the table of figures. */
    SetRightAlignPageNumbers(isRightAlign: boolean): boolean;
    /** Returns whether entries are formatted as hyperlinks. */
    GetUseHyperlinks(): boolean;
    /** Specifies whether entries are formatted as hyperlinks. */
    SetUseHyperlinks(isUseHyperlinks: boolean): boolean;
    /** Returns the caption label that the table of figures is built from (for example, "Figure"). */
    GetCaption(): string | null;
    /** Sets the caption label that the table of figures is built from (for example, "Figure"). */
    SetCaption(sCaption: string): boolean;
    /** Returns whether the caption label and number are included in the table of figures entries. */
    GetIncludeLabel(): boolean;
    /** Specifies whether the caption label and number are included in the table of figures entries. */
    SetIncludeLabel(isInclude: boolean): boolean;
    /** Applies the specified properties to the table of figures and rebuilds it. */
    SetPr(oTofPr: TofPr): boolean;
  }
  /**
   * A grammar/spellcheck-style annotation range attached to a paragraph - the payload of
   * `onBlurAnnotation`/`onFocusAnnotation`/`onClickAnnotation`. Kept in sync by hand with the
   * identical shape `scripts/generate-plugin-methods.js` derives independently for the same concept
   * from a different sdkjs source (word/api_plugins.js) - see src/generated/word-methods.ts.
   */
  export interface TextAnnotation {
    /** ID of the paragraph containing the annotation. */
    paragraphId: string;
    /** ID of the annotation range. */
    rangeId: string;
    /** Annotation type (e.g., `"grammar"`). */
    name?: string;
  }
  export interface TextAnnotationRange {
    /** Unique identifier for the range. */
    id: string;
    /** Starting index of the text range. */
    start: number;
    /** Length of the text range. */
    length: number;
    /** Annotation type (e.g., `"grammar"`). */
    name?: string;
  }

  /**
   * Base class
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/
   */
  export interface Api {
    /**
     * Adds a comment to the specifed document element or array of Runs.
     *
     * @param element - The element where the comment will be added. It may be applied to any element which has the
     *   *AddComment* method.
     * @param text - The comment text.
     * @param author - The author's name.
     * @param userId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/AddComment/
     */
    AddComment(element: ApiRun[] | DocumentElement, text: string, author?: string, userId?: string): ApiComment;

    /**
     * Creates an auto-color.
     *
     * @returns Instance of ApiColor with 'auto' type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/AutoColor/
     */
    AutoColor(): ApiColor;

    /**
     * Converts centimeters to points.
     *
     * @param cm - The number of centimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CentimetersToPoints/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/Color/
     */
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;

    /**
     * Compares the current document with another document opened via builderJS.OpenTmpFile. Tracked
     * changes between the two documents are produced in the current document.
     *
     * @param file - The second document, returned by builderJS.OpenTmpFile.
     */
    CompareDocuments(file: object): void;

    /**
     * Converts a document to Markdown or HTML text.
     *
     * @param convertType - Conversion type.
     * @param htmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     *   platform does not handle Markdown-style IDs.
     * @param base64img - Defines if the images will be created in the base64 format.
     * @param demoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
     *   standard: single H1 as title, H2 as top-level heading in the text body.
     * @param renderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
     *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
     *   By default, the opening angle brackets will be replaced with the special characters.
     * @default convertType = "markdown"
     * @default htmlHeadings = false
     * @default base64img = false
     * @default demoteHeadings = false
     * @default renderHTMLTags = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/ConvertDocument/
     */
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;

    /**
     * Creates a blip fill to apply to the object using the selected image as the object background.
     *
     * @param imageUrl - The path to the image used for the blip fill (currently only internet URL or Base64 encoded
     *   images are supported).
     * @param blipFillType - The type of the fill used for the blip fill (tile or stretch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateBlipFill/
     */
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;

    /**
     * Creates a new block level container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateBlockLvlSdt/
     */
    CreateBlockLvlSdt(): ApiBlockLvlSdt;

    /**
     * Creates a chart with the parameters specified.
     * :::note
     * Values of _styleIndex_ outside **1 - 48** are interpreted as a chart style id from the
     * _cs:chartStyle_ element (e.g. 201, 215, 284) and are available only for [ONLYOFFICE Docs
     * Enterprise](https://www.onlyoffice.com/docs-enterprise-prices.aspx?from=api) and [ONLYOFFICE Docs
     * Developer](https://www.onlyoffice.com/developer-edition-prices.aspx?from=api).
     * :::
     *
     * @param chartType - The chart type used for the chart display.
     * @param series - The array of the data used to build the chart from.
     * @param seriesNames - The array of the names (the source table column names) used for the data which the chart will be
     *   build from.
     * @param catNames - The array of the names (the source table row names) used for the data which the chart will be
     *   build from.
     * @param width - The chart width in English measure units.
     * @param height - The chart height in English measure units.
     * @param styleIndex - The chart color style index (can be 1 - 48, as described in OOXML specification).
     * @param numFormats - Numeric formats which will be applied to the series (can be custom formats). The default numeric
     *   format is "General".
     * @default chartType = "bar"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateChart/
     */
    CreateChart(series: number[][], seriesNames: number[] | string[], catNames: number[] | string[], width: EMU, height: EMU, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;
    CreateChart(chartType: ChartType, series: number[][], seriesNames: number[] | string[], catNames: number[] | string[], width: EMU, height: EMU, styleIndex: number, numFormats: NumFormat[] | string[]): ApiChart;

    /**
     * Creates a checkbox content control.
     *
     * @param checkBoxPr - The configuration object with the checkbox properties.
     * @returns An inline-level content control that represents a checkbox.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateCheckBoxContentControl/
     */
    CreateCheckBoxContentControl(checkBoxPr: ContentControlCheckBoxPr): ApiInlineLvlSdt;

    /**
     * Creates a new combo box container with the given list of options.
     *
     * @param list - An array of objects representing the items in the combo box.
     * @param selected - The selected item index.
     * @default selected = -1
     * @returns An inline-level content control that represents a combo box.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateComboBoxContentControl/
     */
    CreateComboBoxContentControl(list?: ContentControlListItem[], selected?: number): ApiInlineLvlSdt;

    /**
     * Creates a new custom geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateCustomGeometry/
     */
    CreateCustomGeometry(): ApiGeometry;

    /**
     * Creates a new date picker content control.
     *
     * @param datePickerPr - The optional date picker properties.
     * @returns An inline-level content control that represents a date-time picker.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateDatePickerContentControl/
     */
    CreateDatePickerContentControl(datePickerPr?: ContentControlDatePr): ApiInlineLvlSdt;

    /**
     * Creates a new drop-down list container with the given list of options.
     *
     * @param list - An array of objects representing the items in the drop-down list.
     * @param selected - The selected item index.
     * @default selected = -1
     * @returns An inline-level content control that represents a drop-down list.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateDropDownListContentControl/
     */
    CreateDropDownListContentControl(list?: ContentControlListItem[], selected?: number): ApiInlineLvlSdt;

    /**
     * Creates a gradient stop used for different types of gradients.
     *
     * @param color - The color used for the gradient stop.
     * @param pos - The position of the gradient stop measured in 1000th of percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateGradientStop/
     */
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;

    /**
     * Groups an array of drawings.
     * :::note
     * The drawings must not be added to the document. To group the drawings which are already in the
     * document, use the {@link ApiDocument#GroupDrawings} method.
     * :::
     *
     * @param drawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateGroup/
     */
    CreateGroup(drawings: DrawingForGroup[]): ApiGroup;

    /**
     * Creates a new hyperlink text block to be inserted to the current paragraph or table.
     *
     * @param link - The hyperlink address.
     * @param display - The text to display the hyperlink.
     * @param screenTipText - The screen tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateHyperlink/
     */
    CreateHyperlink(link: string, display: string, screenTipText: string): ApiHyperlink;

    /**
     * Creates an image with the parameters specified.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently only internet
     *   URL or Base64 encoded images are supported).
     * @param width - The image width in English measure units.
     * @param height - The image height in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateImage/
     */
    CreateImage(imageSrc: string, width: EMU, height: EMU): ApiImage;

    /**
     * Creates a new inline container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateInlineLvlSdt/
     */
    CreateInlineLvlSdt(): ApiInlineLvlSdt;

    /**
     * Creates a linear gradient fill to apply to the object using the selected linear gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     * @param angle - The angle measured in 60000th of a degree that will define the gradient direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateLinearGradientFill/
     */
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateMath/
     */
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;

    /**
     * Creates no fill and removes the fill from the element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateNoFill/
     */
    CreateNoFill(): ApiFill;

    /**
     * Creates an abstract multilevel numbering with a specified type.
     *
     * @param sType - The type of the numbering which will be created.
     * @default sType = "bullet"
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateNumbering/
     */
    CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;

    /**
     * Creates an OLE object with the parameters specified.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param width - The OLE object width in English measure units.
     * @param height - The OLE object height in English measure units.
     * @param data - The OLE object string data.
     * @param appId - The application ID associated with the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateOleObject/
     */
    CreateOleObject(imageSrc: string, width: EMU, height: EMU, data: string, appId: string): ApiOleObject;

    /**
     * Creates the empty paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateParaPr/
     */
    CreateParaPr(): ApiParaPr;

    /**
     * Creates a new paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateParagraph/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreatePatternFill/
     */
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;

    /**
     * Creates a new picture container.
     *
     * @param width - The optional image width.
     * @param height - The optional image height.
     * @returns An inline-level content control that represents a picture container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreatePictureContentControl/
     */
    CreatePictureContentControl(width?: EMU, height?: EMU): ApiInlineLvlSdt;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param presetColor - A preset selected from the list of the available color preset names.
     * @returns ;
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreatePresetColor/
     */
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;

    /**
     * Creates a geometry using one of the available preset shapes.
     *
     * @param preset - The preset name.
     * @default preset = "rect"
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreatePresetGeometry/
     */
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;

    /**
     * Creates an RGB color setting the appropriate values for the red, green and blue color components.
     *
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateRGBColor/
     */
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;

    /**
     * Creates a radial gradient fill to apply to the object using the selected radial gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateRadialGradientFill/
     */
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;

    /**
     * Creates an element range.
     * If you do not specify the start and end positions, the range will be taken from the entire element.
     *
     * @param element - The element from which the range will be taken.
     * @param start - Start range position.
     * @param end - End range position.
     * @returns returns null if element isn't supported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateRange/
     */
    CreateRange(element: unknown, start: unknown, end: unknown): ApiRange | null;

    /**
     * Creates a new smaller text block to be inserted to the current paragraph or table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateRun/
     */
    CreateRun(): ApiRun;

    /**
     * Creates a complex color scheme selecting from one of the available schemes.
     *
     * @param schemeColorId - The color scheme identifier.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateSchemeColor/
     */
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;

    /**
     * Creates a shadow which can be applied to a graphic object.
     *
     * @param settings - The shadow properties.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateShadow/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateShape/
     */
    CreateShape(shapeType?: ShapeType, width?: EMU, height?: EMU, fill?: ApiFill, stroke?: ApiStroke): ApiShape;

    /**
     * Creates a solid fill to apply to the object using a selected solid color as the object background.
     *
     * @param color - The color used for the element fill.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateSolidFill/
     */
    CreateSolidFill(color: ApiColor): ApiFill;

    /**
     * Creates a stroke adding shadows to the element.
     *
     * @param width - The width of the shadow measured in English measure units.
     * @param fill - The fill type used to create the shadow.
     * @param sDash - The type of line dash.
     * @default sDash = "solid"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateStroke/
     */
    CreateStroke(width: EMU, fill: ApiFill, sDash?: DashType): ApiStroke;

    /**
     * Creates a new table with a specified number of rows and columns.
     *
     * :::danger[Breaking Change]
     * Starting from version 9.4.0, the parameter order has been changed from `Api.CreateTable(cols, rows)`
     * to `Api.CreateTable(rows, cols)`.
     * :::
     *
     * @param rows - Number of rows. Must be a positive integer.
     * @param cols - Number of columns. Must be a positive integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTable/
     */
    CreateTable(rows: number, cols: number): ApiTable;

    /**
     * Creates the empty table cell properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTableCellPr/
     */
    CreateTableCellPr(): ApiTableCellPr;

    /**
     * Creates the empty table properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTablePr/
     */
    CreateTablePr(): ApiTablePr;

    /**
     * Creates the empty table row properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTableRowPr/
     */
    CreateTableRowPr(): ApiTableRowPr;

    /**
     * Creates the empty table style properties.
     *
     * @param sType - The table part which the formatting properties must be applied to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTableStylePr/
     */
    CreateTableStylePr(sType: TableStyleOverrideType): ApiTableStylePr;

    /**
     * Creates the empty text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateTextPr/
     */
    CreateTextPr(): ApiTextPr;

    /**
     * Creates a Text Art object with the parameters specified.
     *
     * @param textPr - The text properties.
     * @param text - The text for the Text Art object.
     * @param transform - Text transform type.
     * @param fill - The color or pattern used to fill the Text Art object.
     * @param stroke - The stroke used to create the Text Art object shadow.
     * @param rotAngle - Rotation angle.
     * @param width - The Text Art width measured in English measure units.
     * @param height - The Text Art heigth measured in English measure units.
     * @default textPr = Api.CreateTextPr()
     * @default text = "Your text here"
     * @default transform = "textNoShape"
     * @default fill = Api.CreateNoFill()
     * @default stroke = Api.CreateStroke(0, Api.CreateNoFill())
     * @default rotAngle = 0
     * @default width = 1828800
     * @default height = 1828800
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/CreateWordArt/
     */
    CreateWordArt(textPr?: ApiTextPr, text?: string, transform?: TextTransform, fill?: ApiFill, stroke?: ApiStroke, rotAngle?: number, width?: EMU, height?: EMU): ApiDrawing;

    /**
     * Converts English Metric Units (EMUs) to millimeters.
     *
     * @param emu - The value in English Metric Units (EMUs).
     * @returns The value in millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/EmusToMillimeters/
     */
    EmusToMillimeters(emu: EMU): mm;

    /**
     * Converts EMUs (English Metric Units) to points.
     *
     * @param emu - The number of EMUs to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/EmusToPoints/
     */
    EmusToPoints(emu: number): number;

    /**
     * Converts the specified JSON object into the Document Builder object of the corresponding type.
     *
     * @param message - The JSON object to convert.
     * @returns readed api class element
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/FromJSON/
     */
    FromJSON(message: object): object;

    /**
     * Returns the object by it's internal ID.
     *
     * @param id - The object internal ID.
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/GetByInternalId/
     */
    GetByInternalId(id: string): object;

    /**
     * Returns the main document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/GetDocument/
     */
    GetDocument(): ApiDocument;

    /**
     * Returns the full name of the currently opened file.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Returns the mail merge receptions count.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/GetMailMergeReceptionsCount/
     */
    GetMailMergeReceptionsCount(): number;

    /**
     * Returns the mail merge template document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/GetMailMergeTemplateDocContent/
     */
    GetMailMergeTemplateDocContent(): ApiDocumentContent;

    /**
     * Creates a color from a HEX string.
     *
     * @param hexString - The HEX string representing a color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/HexColor/
     */
    HexColor(hexString: string): ApiColor;

    /**
     * Converts inches to points.
     *
     * @param inches - The number of inches to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/InchesToPoints/
     */
    InchesToPoints(inches: number): number;

    /**
     * Converts lines to points (1 line = 12 points).
     *
     * @param lines - The number of lines to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/LinesToPoints/
     */
    LinesToPoints(lines: number): number;

    /**
     * Loads data for the mail merge.
     *
     * @param data - Mail merge data. The first element of the array is the array with names of the merge fields. The
     *   rest of the array elements are arrays with values for the merge fields.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/LoadMailMergeData/
     */
    LoadMailMergeData(data: string[][]): boolean;

    /**
     * Starts the mail merge process.
     *
     * @param startIndex - The start index of the document for mail merge process.
     * @param endIndex - The end index of the document for mail merge process.
     * @default startIndex = 0
     * @default endIndex = Api.GetMailMergeReceptionsCount() - 1
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/MailMerge/
     */
    MailMerge(startIndex?: number, endIndex?: number): boolean;

    /**
     * Merges the current document with another document opened via builderJS.OpenTmpFile. Its contents are
     * merged into the current document.
     *
     * @param file - The second document, returned by builderJS.OpenTmpFile.
     */
    MergeDocuments(file: object): void;

    /**
     * Converts millimeters to English Metric Units (EMUs).
     * The result is an integer value.
     *
     * @param mm - The value in millimeters.
     * @returns The value in English Metric Units (EMUs), as an integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/MillimetersToEmus/
     */
    MillimetersToEmus(mm: mm): EMU;

    /**
     * Converts millimeters to pixels.
     *
     * @param mm - The number of millimeters to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/MillimetersToPixels/
     */
    MillimetersToPixels(mm: number): number;

    /**
     * Converts millimeters to points.
     *
     * @param mm - The number of millimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/MillimetersToPoints/
     */
    MillimetersToPoints(mm: number): number;

    /**
     * Converts picas to points.
     *
     * @param pc - The number of picas to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PicasToPoints/
     */
    PicasToPoints(pc: number): number;

    /**
     * Converts pixels to EMUs (English Metric Units).
     *
     * @param px - The number of pixels to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PixelsToEmu/
     */
    PixelsToEmus(px: number): number;

    /**
     * Converts pixels to points.
     *
     * @param px - The number of pixels to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PixelsToPoints/
     */
    PixelsToPoints(px: number): number;

    /**
     * Converts points to centimeters.
     *
     * @param pt - The number of points to convert to centimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToCentimeters/
     */
    PointsToCentimeters(pt: number): number;

    /**
     * Converts points to EMUs (English Metric Units).
     *
     * @param pt - The number of points to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToEmus/
     */
    PointsToEmus(pt: number): number;

    /**
     * Converts points to inches.
     *
     * @param pt - The number of points to convert to inches.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToInches/
     */
    PointsToInches(pt: number): number;

    /**
     * Converts points to lines (1 line = 12 points).
     *
     * @param pt - The number of points to convert to lines.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToLines/
     */
    PointsToLines(pt: number): number;

    /**
     * Converts points to millimeters.
     *
     * @param pt - The number of points to convert to millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToMillimeters/
     */
    PointsToMillimeters(pt: number): number;

    /**
     * Converts points to picas (1 pica = 12 points).
     *
     * @param pt - The number of points to convert to picas.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToPicas/
     */
    PointsToPicas(pt: number): number;

    /**
     * Converts points to pixels.
     *
     * @param pt - The number of points to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToPixels/
     */
    PointsToPixels(pt: number): number;

    /**
     * Converts points to twips.
     *
     * @param pt - The number of points to convert to twips.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/PointsToTwips/
     */
    PointsToTwips(pt: number): number;

    /**
     * Creates an RGB color from red, green and blue components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/RGB/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/RGBA/
     */
    RGBA(r: number, g: number, b: number, a: number): ApiColor;

    /**
     * Replaces the main document content with another document content.
     *
     * @param documentContent - The document content which the main document content will be replaced with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/ReplaceDocumentContent/
     */
    ReplaceDocumentContent(documentContent: ApiDocumentContent): boolean;

    /**
     * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
     * strings.
     *
     * @param textStrings - An array of replacement strings.
     * @param tab - A character which is used to specify the tab in the source text.
     * @param newLine - A character which is used to specify the line break character in the source text.
     * @default tab = "\t"
     * @default newLine = "\r\n"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/ReplaceTextSmart/
     */
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;

    /**
     * Saves changes to the specified document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/Save/
     */
    Save(): boolean;

    /**
     * Creates a theme color.
     *
     * @param name - The theme color name. If the provided name is not supported, the 'tx1' color will be used.
     * @default name = "tx1"
     * @returns Instance of ApiColor with 'theme' type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/ThemeColor/
     */
    ThemeColor(name?: SchemeColorId): ApiColor;

    /**
     * Converts twips to points.
     *
     * @param twips - The number of twips to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/TwipsToPoints/
     */
    TwipsToPoints(twips: number): number;

    /**
     * Subscribes to the specified event and calls the callback function when the event fires.
     *
     * @param eventName - The event name.
     * @param callback - Function to be called when the event fires.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/attachEvent/
     */
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): boolean;

    /**
     * Unsubscribes from the specified event.
     *
     * @param eventName - The event name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/Api/Methods/detachEvent/
     */
    detachEvent(eventName: string): boolean;
  }

  /**
   * Class representing a container for the document content.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/
   */
  export interface ApiBlockLvlSdt {
    /**
     * Adds a caption paragraph after (or before) the current content control.
     * <note>Please note that the current content control must be in the document (not in the
     * footer/header).
     * And if the current content control is placed in a shape, then a caption is added after (or before)
     * the parent shape.</note>
     *
     * @param additionalText - The additional text.
     * @param label - The caption label.
     * @param excludeLabel - Specifies whether to exclude the label from the caption.
     * @param numFormat - The possible caption numbering format.
     * @param isBefore - Specifies whether to insert the caption before the current content control (true) or after
     *   (false) (after/before the shape if it is placed in the shape).
     * @param headingLvl - The heading level (used if you want to specify the chapter number). <note>If you want to specify
     *   "Heading 1", then nHeadingLvl === 0 and etc.</note>
     * @param captionSep - The caption separator (used if you want to specify the chapter number).
     * @default label = "Table"
     * @default excludeLabel = false
     * @default numFormat = "Arabic"
     * @default isBefore = false
     * @default captionSep = "hyphen"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/AddCaption/
     */
    AddCaption(additionalText: string, label?: CaptionLabel | string, excludeLabel?: boolean, numFormat?: CaptionNumberingFormat, isBefore?: boolean, headingLvl?: number, captionSep?: CaptionSep): boolean;

    /**
     * Adds a comment to the current block content control.
     * <note>Please note that the current block content control must be in the document.</note>
     *
     * @param text - The comment text.
     * @param author - The author's name.
     * @param userId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/AddComment/
     */
    AddComment(text: string, author?: string, userId?: string): ApiComment;

    /**
     * Adds a paragraph or a table or a block content control to the current container.
     *
     * @param element - The type of the element which will be added to the current container.
     * @param pos - The specified position.
     * @returns returns false if element unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/AddElement/
     */
    AddElement(element: DocumentElement, pos: number): boolean;

    /**
     * Adds a text to the current content control.
     *
     * @param text - The text which will be added to the content control.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/AddText/
     */
    AddText(text: string): boolean;

    /**
     * Creates a copy of a block content control. Ignores comments, footnote references, complex fields.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/Copy/
     */
    Copy(): ApiBlockLvlSdt;

    /**
     * Removes a content control and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if content control haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the alias attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAlias/
     */
    GetAlias(): string;

    /**
     * Returns a collection of content control objects in the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAllContentControls/
     */
    GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];

    /**
     * Returns a collection of drawing objects in the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAllDrawingObjects/
     */
    GetAllDrawingObjects(): Drawing[];

    /**
     * Returns a collection of paragraph objects in the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a collection of tables on a given absolute page.
     * <note>This method can be a little bit slow, because it runs the document calculation
     * process to arrange tables on the specified page.</note>
     *
     * @param page - Page number. If it is not specified, an empty array will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAllTablesOnPage/
     */
    GetAllTablesOnPage(page: unknown): ApiTable[];

    /**
     * Gets the visualization of the content control.
     *
     * @returns type - The type of visualization.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetAppearance/
     */
    GetAppearance(): "boundingBox" | "hidden";

    /**
     * Returns the background color of the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiBlockLvlSdt class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetClassType/
     */
    GetClassType(): "blockLvlSdt";

    /**
     * Returns the content of the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Retrieves the data binding of the content control.
     *
     * @returns Returns the data binding of the content control if it exists, otherwise `null`.
     * @since 9.0.0
     */
    GetDataBinding(): XmlMapping;

    /**
     * Returns the content control data for the XML mapping.
     *
     * @returns The string data representing the contents of the current content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetDataForXmlMapping/
     */
    GetDataForXmlMapping(): string;

    /**
     * Returns a list of values of the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetDropdownList/
     */
    GetDropdownList(): ApiContentControlList;

    /**
     * Returns a unique ID for the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetId/
     */
    GetId(): string;

    /**
     * Returns an internal id of the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the label attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetLabel/
     */
    GetLabel(): number;

    /**
     * Returns the lock type of the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetLock/
     */
    GetLock(): SdtLock;

    /**
     * Returns the document content that contains the current content control.
     *
     * @returns returns the main document, a document part (table cell, header/footer, footnote, etc.), or null
     *   if the content control has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetParent/
     */
    GetParent(): ApiDocument | ApiDocumentContent | null;

    /**
     * Returns a content control that contains the current content control.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a table that contains the current content control.
     *
     * @returns returns null is parent table does'n exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a table cell that contains the current content control.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the placeholder text from the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the content control position within its parent element.
     *
     * @returns returns -1 if the content control parent doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns a Range object that represents the part of the document contained in the specified content
     * control.
     *
     * @param start - Start position index in the current element.
     * @param end - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetRange/
     */
    GetRange(start: number, end: number): ApiRange;

    /**
     * Returns the tag attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Checks whether the content control is a picture control.
     * This method verifies if the content control is specifically a picture control.
     *
     * @returns Returns `true` if the content control is a picture, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/IsPicture/
     */
    IsPicture(): boolean;

    /**
     * Places a cursor before/after the current content control.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current content
     *   control.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Pushes a paragraph or a table or a block content control to actually add it to the current
     * container.
     *
     * @param element - The type of the element which will be pushed to the current container.
     * @returns returns false if element unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/Push/
     */
    Push(element: DocumentElement): boolean;

    /**
     * Clears the contents from the current content control.
     *
     * @returns returns true.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Replaces the current content control with a new element.
     *
     * @param oElement - The element to replace the current content control with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/ReplaceByElement/
     */
    ReplaceByElement(oElement: DocumentElement): boolean;

    /**
     * Searches for a scope of a content control object. The search results are a collection of ApiRange
     * objects.
     *
     * @param text - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/Search/
     */
    Search(text: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Selects the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the alias attribute to the current container.
     *
     * @param alias - The alias which will be added to the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetAlias/
     */
    SetAlias(alias: string): boolean;

    /**
     * Sets the visualization of the content control.
     *
     * @param type - The desired type of visualization.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetAppearance/
     */
    SetAppearance(type: "boundingBox" | "hidden"): void;

    /**
     * Sets the background color to the current content control.
     *
     * @param color - The background color.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current content control.
     *
     * @param color - The border color.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the data binding for the content control.
     *
     * @param xmlMapping - The data binding to associate with the content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetDataBinding/
     */
    SetDataBinding(xmlMapping: XmlMapping | null): boolean;

    /**
     * Specifies a unique ID for the current content control.
     *
     * @param id - The numerical ID which will be specified for the current content control.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetId/
     */
    SetId(id: number): void;

    /**
     * Sets the label attribute to the current container.
     *
     * @param label - The label which will be added to the current container. Can be a positive or negative integer
     *   from **-2147483647** to **2147483647**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetLabel/
     */
    SetLabel(label: number): boolean;

    /**
     * Sets the lock to the current block text content control:
     * **"unlocked"** - content can be edited and the container can be deleted.
     * **"contentLocked"** - content cannot be edited.
     * **"sdtContentLocked"** - content cannot be edited and the container cannot be deleted.
     * **"sdtLocked"** - the container cannot be deleted.
     *
     * @param lockType - The type of the lock applied to the block text content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetLock/
     */
    SetLock(lockType: "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked"): boolean;

    /**
     * Sets the content (image) for the picture content control.
     * This method updates the picture inside a content control by setting an image from a provided URL.
     * The URL should be an internet link to the image.
     *
     * @param imageUrl - The URL of the image to be used for the content control. Currently, only internet URLs are
     *   supported.
     * @returns Returns `true` if the image was successfully set, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetPicture/
     */
    SetPicture(imageUrl: string): boolean;

    /**
     * Sets the placeholder text to the current content control.
     *
     * @param text - The text that will be set to the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(text: string): boolean;

    /**
     * Sets the tag attribute to the current container.
     *
     * @param tag - The tag which will be added to the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Applies text settings to the content of the content control.
     *
     * @param textPr - The properties that will be set to the content of the content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Converts the ApiBlockLvlSdt object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Updates the content control using the value from the XML mapping.
     *
     * @returns Returns `true` if the update was successful, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBlockLvlSdt/Methods/UpdateFromXmlMapping/
     */
    UpdateFromXmlMapping(): boolean;
  }

  /**
   * Class representing a bookmark in the document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/
   */
  export interface ApiBookmark {
    /**
     * Deletes the current bookmark from the document.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns the bookmark name.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the bookmark range.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/GetRange/
     */
    GetRange(): ApiRange;

    /**
     * Returns the bookmark text.
     *
     * @param options - Options for formatting the returned text.
     * @param options_Numbering - Defines if the resulting string will include numbering or not.
     * @param options_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r".
     * @param options_TableCellSeparator - Defines how the table cell separator will be specified in the resulting string. Any symbol can
     *   be used. The default separator is "\t".
     * @param options_TableRowSeparator - Defines how the table row separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_ParaSeparator - Defines how the paragraph separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string (does not apply to numbering). Any
     *   symbol can be used. The default symbol is "\t".
     * @default options_Numbering = true
     * @default options_Math = true
     * @default options_NewLineSeparator = '\r'
     * @default options_TableCellSeparator = '\t'
     * @default options_TableRowSeparator = '\r\n'
     * @default options_ParaSeparator = '\r\n'
     * @default options_TabSymbol = '\t'
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Moves a cursor to the current bookmark.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/GoTo/
     */
    GoTo(): boolean;

    /**
     * Selects the current bookmark.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/Select/
     */
    Select(): boolean;

    /**
     * Changes the bookmark name.
     *
     * @param sNewName - A new bookmark name.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/SetName/
     */
    SetName(sNewName: string): boolean;

    /**
     * Sets the bookmark text.
     *
     * @param sText - The bookmark text.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiBookmark/Methods/SetText/
     */
    SetText(sText: string): boolean;
  }

  /** Class representing a paragraph bullet. */
  export interface ApiBullet {
  }

  /**
   * Class representing a chart.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/
   */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetTitle"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Sets a style to the current chart by style ID.
     *
     * @param nStyleId - One of the styles available in the editor.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/ApplyChartStyle/
     */
    ApplyChartStyle(nStyleId: unknown): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns all series from the chart space.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetAllSeries/
     */
    GetAllSeries(): ApiChartSeries[];

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the chart object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChart class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetClassType/
     */
    GetClassType(): "chart";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline chart if exists.
     *
     * @returns returns null if chart is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetNextChart/
     */
    GetNextChart(): ApiChart | null;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline chart if exists.
     *
     * @returns return null if char if first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetPrevChart/
     */
    GetPrevChart(): ApiChart | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the series with a specific index.
     *
     * @param nIdx - Series index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetSeries/
     */
    GetSeries(nIdx: number): ApiChartSeries;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Returns the chart title text.
     *
     * @returns The chart title text or null if the chart has no title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns a type of the chart object using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/GetType/
     */
    GetType(): ChartType;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Removes the specified series from the current chart.
     *
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/RemoveSeria/
     */
    RemoveSeria(nSeria: number): boolean;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the specified numeric format to the axis values.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param sAxisPos - Axis position in the chart.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetAxisNumFormat/
     */
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;

    /**
     * Sets a name to the specified chart category.
     *
     * @param sName - The name which will be set to the specified chart category.
     * @param nCategory - The index of the chart category.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetCategoryName/
     */
    SetCategoryName(sName: string, nCategory: number): boolean;

    /**
     * Sets the text properties to the chart data labels.
     *
     * @param textPr - The text properties to apply to the data labels.
     * @returns Returns true if the text properties were applied successfully, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetDataLabelsTextPr/
     */
    SetDataLabelsTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the fill to the data point in the specified chart series.
     *
     * @param oFill - The fill type used to fill the data point.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the fill will be applied to the specified data point in all series.
     * @default bAllSeries = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetDataPointFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetDataPointNumFormat/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetDataPointOutLine/
     */
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Specifies font size for labels of the horizontal axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisLabelsFontSize/
     */
    SetHorAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisMajorTickMark/
     */
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisMinorTickMark/
     */
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies the horizontal axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the horizontal axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisOrientation/
     */
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Spicifies tick labels position for the horizontal axis.
     *
     * @param sTickLabelPosition - The type for the position of chart horizontal tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisTickLabelPosition/
     */
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Specifies the chart horizontal axis title.
     *
     * @param sTitle - The title which will be displayed for the horizontal axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the horizontal axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetHorAxisTitle/
     */
    SetHorAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets the fill to the chart legend.
     *
     * @param oFill - The fill type used to fill the legend.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetLegendFill/
     */
    SetLegendFill(oFill: ApiFill): boolean;

    /**
     * Specifies the legend font size.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetLegendFontSize/
     */
    SetLegendFontSize(nFontSize: pt): boolean;

    /**
     * Sets the outline to the chart legend.
     *
     * @param oStroke - The stroke used to create the legend outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetLegendOutLine/
     */
    SetLegendOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the chart legend position.
     *
     * @param sLegendPos - The position of the chart legend inside the chart window.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetLegendPos/
     */
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
     */
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;

    /**
     * Specifies major horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMajorHorizontalGridlines/
     */
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies major vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMajorVerticalGridlines/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMarkerFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMarkerOutLine/
     */
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Specifies minor horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMinorHorizontalGridlines/
     */
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies minor vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetMinorVerticalGridlines/
     */
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the name of the current drawing.
     * If another drawing with the same name already exists, that drawing's name will be reset to a default
     * auto-generated name.
     * OLE objects do not support a custom name, so for them this method always returns false.
     *
     * @param name - The name which will be set to the current drawing.
     * @returns Returns true if the name was successfully set, otherwise returns false.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the fill to the chart plot area.
     *
     * @param oFill - The fill type used to fill the plot area.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetPlotAreaFill/
     */
    SetPlotAreaFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart plot area.
     *
     * @param oStroke - The stroke used to create the plot area outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetPlotAreaOutLine/
     */
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;

    /**
     * Sets the text properties to the chart point data label.
     *
     * @param seriesIndex - The series index from the array of the data used to build the chart from.
     * @param pointIndex - The point index from this series.
     * @param textPr - The text properties to apply to the data label.
     * @returns Returns true if the text properties were applied successfully, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetPointDataLabelTextPr/
     */
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets a name to the specified chart series.
     *
     * @param sName - The name which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetSeriaName/
     */
    SetSeriaName(sName: string, nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the chart series.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetSeriaNumFormat/
     */
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;

    /**
     * Sets values to the specified chart series.
     *
     * @param aValues - The array of the data which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetSeriaValues/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetSeriesFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetSeriesOutLine/
     */
    SetSeriesOutLine(oStroke: ApiStroke, nSeries: number, bAll?: boolean): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetShowDataLabels/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetShowDataTable/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetShowPointDataLabel/
     */
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Specifies the chart title.
     *
     * @param sTitle - The title which will be displayed for the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the chart title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetTitle/
     */
    SetTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart title.
     *
     * @param oFill - The fill type used to fill the title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetTitleFill/
     */
    SetTitleFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart title.
     *
     * @param oStroke - The stroke used to create the title outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetTitleOutLine/
     */
    SetTitleOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Specifies the vertical axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the vertical axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVerAxisOrientation/
     */
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Specifies the chart vertical axis title.
     *
     * @param sTitle - The title which will be displayed for the vertical axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the vertical axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVerAxisTitle/
     */
    SetVerAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Specifies font size for labels of the vertical axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVertAxisLabelsFontSize/
     */
    SetVertAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVertAxisMajorTickMark/
     */
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVertAxisMinorTickMark/
     */
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Spicifies tick labels position for the vertical axis.
     *
     * @param sTickLabelPosition - The type for the position of chart vertical tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetVertAxisTickLabelPosition/
     */
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Sets the x-axis values to all chart series. It is used with the scatter charts only.
     *
     * @param aValues - The array of the data which will be set to the x-axis data points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChart/Methods/SetXValues/
     */
    SetXValues(aValues: string[]): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a chart series.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChartSeries/
   */
  export interface ApiChartSeries {
    /**
     * Tries to change the series type. Returns true if successful.
     *
     * @param sType - Chart type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChartSeries/Methods/ChangeChartType/
     */
    ChangeChartType(sType: ChartType): boolean;

    /**
     * Returns a chart type of the current series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChartSeries/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChartSeries class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChartSeries/Methods/GetClassType/
     */
    GetClassType(): "chartSeries";

    /**
     * Returns a chart type of the current series using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiChartSeries/Methods/GetType/
     */
    GetType(): ChartType;
  }

  /**
   * Class representing a document checkbox / radio button.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/
   */
  export interface ApiCheckBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns the choice name of the current radio button.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetChoiceName/
     */
    GetChoiceName(): string;

    /**
     * Returns a type of the ApiCheckBoxForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetClassType/
     */
    GetClassType(): "checkBoxForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the choice name of the currently selected radio button in the group.
     * Returns an empty string if the current form is not a radio button or nothing is selected.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetGroupValue/
     */
    GetGroupValue(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the label of the current check box.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetLabel/
     */
    GetLabel(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the radio group key if the current checkbox is a radio button.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetRadioGroup/
     */
    GetRadioGroup(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current state of the checkbox form as a boolean value.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetValue/
     */
    GetValue(): boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Returns the state of the current checkbox (checked or not).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/IsChecked/
     */
    IsChecked(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current checkbox is a radio button.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/IsRadioButton/
     */
    IsRadioButton(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Checks the current checkbox.
     *
     * @param isChecked - Specifies if the current checkbox will be checked (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetChecked/
     */
    SetChecked(isChecked: boolean): boolean;

    /**
     * Sets the choice name for the current radio button.
     *
     * @param choiceName - The radio button choice name.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetChoiceName/
     */
    SetChoiceName(choiceName: string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Selects the radio button with the specified choice name in the group.
     *
     * @param value - The choice name of the radio button to select.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetGroupValue/
     */
    SetGroupValue(value: string): boolean;

    /**
     * Sets the label for the current check box.
     *
     * @param label - The label.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetLabel/
     */
    SetLabel(label: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Sets the radio group key to the current radio button.
     *
     * @param sKey - Radio group key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetRadioGroup/
     */
    SetRadioGroup(sKey: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the state of the checkbox form.
     *
     * @param value - Specifies if the checkbox will be checked (true) or not (false).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetValue/
     */
    SetValue(value: boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Represents a color that can be applied to text.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/
   */
  export interface ApiColor {
    /**
     * Converts the JSON object into the ApiColor object.
     *
     * @param jsonObject - JSON representation of the color.
     * @returns new ApiColor object if the conversion was successful, null otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/FromJSON/
     */
    FromJSON(jsonObject: string): ApiColor | null;

    /**
     * Returns a type of the ApiColor class.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/GetClassType/
     */
    GetClassType(): "color";

    /**
     * Gets the HEX string representation of the color.
     *
     * @returns A six-digit uppercase hex string, e.g. "FF00AA".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/GetHex/
     */
    GetHex(): string;

    /**
     * Gets the RGB components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/GetRGB/
     */
    GetRGB(): object;

    /**
     * Gets the RGBA components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/GetRGBA/
     */
    GetRGBA(): object;

    /**
     * Gets the theme color name if the color is a theme color.
     *
     * @returns The theme color name or null if not a theme color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/GetThemeName/
     */
    GetThemeName(): SchemeColorId | null;

    /**
     * Returns true if the color is set to auto.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/IsAutoColor/
     */
    IsAutoColor(): boolean;

    /**
     * Returns true if the color is a theme color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/IsThemeColor/
     */
    IsThemeColor(): boolean;

    /**
     * Converts the ApiColor object into the JSON object.
     *
     * @returns JSON string representation of the color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiColor/Methods/ToJSON/
     */
    ToJSON(): string;
  }

  /**
   * Class representing a document combo box / drop-down list.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/
   */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComboBoxForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/GetClassType/
     */
    GetClassType(): "comboBoxForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the list values from the current combo box.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/GetListValues/
     */
    GetListValues(): string[];

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the combo box form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the combo box text can be edited. If it is not editable, then this form is a drop-down
     * list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/IsEditable/
     */
    IsEditable(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Selects the specified value from the combo box list values.
     *
     * @param sValue - The combo box list value that will be selected.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SelectListValue/
     */
    SelectListValue(sValue: string): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the list values to the current combo box.
     *
     * @param aListString - The combo box list values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SetListValues/
     */
    SetListValues(aListString: string[]): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current combo box.
     * *Available only for editable combo box forms.*
     *
     * @param sText - The combo box text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the combo box form. Selects a list item if the value matches one,
     * otherwise sets it as free text (only for editable combo boxes).
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a comment.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/
   */
  export interface ApiComment {
    /**
     * Adds a reply to a comment.
     *
     * @param sText - The comment reply text.
     * @param sAuthorName - The name of the comment reply author.
     * @param sUserId - The user ID of the comment reply author.
     * @param nPos - The comment reply position. If nPos=-1 add to the end.
     * @default nPos = -1
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/AddReply/
     */
    AddReply(sText: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;

    /**
     * Deletes the current comment from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns the comment author's name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiComment class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetClassType/
     */
    GetClassType(): "comment";

    /**
     * Returns the current comment ID. If the comment doesn't have an ID, null is returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetId/
     */
    GetId(): string;

    /**
     * Returns the quote text of the current comment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetQuoteText/
     */
    GetQuoteText(): number;

    /**
     * Returns a number of the comment replies.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetRepliesCount/
     */
    GetRepliesCount(): number;

    /**
     * Returns the specified comment reply.
     *
     * @param nIndex - The comment reply index.
     * @default nIndex = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetReply/
     */
    GetReply(nIndex?: number): ApiCommentReply;

    /**
     * Returns the comment text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the timestamp of the comment creation in the current time zone format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetTime/
     */
    GetTime(): number;

    /**
     * Returns the timestamp of the comment creation in UTC format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetTimeUTC/
     */
    GetTimeUTC(): number;

    /**
     * Returns the user ID of the comment author.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/GetUserId/
     */
    GetUserId(): string;

    /**
     * Checks if a comment is solved or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/IsSolved/
     */
    IsSolved(): boolean;

    /**
     * Removes the specified comment replies.
     *
     * @param nPos - The position of the first comment reply to remove.
     * @param nCount - A number of comment replies to remove.
     * @param bRemoveAll - Specifies whether to remove all comment replies or not.
     * @default nPos = 0
     * @default nCount = 1
     * @default bRemoveAll = false
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/RemoveReplies/
     */
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): ApiComment;

    /**
     * Sets the comment author's name.
     *
     * @param sAuthorName - The comment author's name.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): ApiComment;

    /**
     * Marks a comment as solved.
     *
     * @param bSolved - Specifies if a comment is solved or not.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetSolved/
     */
    SetSolved(bSolved: boolean): ApiComment;

    /**
     * Sets the comment text.
     *
     * @param sText - The comment text.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetText/
     */
    SetText(sText: string): ApiComment;

    /**
     * Sets the timestamp of the comment creation in the current time zone format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in the current time zone format.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetTime/
     */
    SetTime(nTimeStamp: number | string): ApiComment;

    /**
     * Sets the timestamp of the comment creation in UTC format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in UTC format.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetTimeUTC/
     */
    SetTimeUTC(nTimeStamp: number | string): ApiComment;

    /**
     * Sets the user ID to the comment author.
     *
     * @param sUserId - The user ID of the comment author.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComment/Methods/SetUserId/
     */
    SetUserId(sUserId: string): ApiComment;
  }

  /**
   * Class representing a comment reply.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/
   */
  export interface ApiCommentReply {
    /**
     * Returns the comment reply author's name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiCommentReply class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/GetClassType/
     */
    GetClassType(): "commentReply";

    /**
     * Returns the comment reply text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the user ID of the comment reply author.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/GetUserId/
     */
    GetUserId(): string;

    /**
     * Sets the comment reply author's name.
     *
     * @param sAuthorName - The comment reply author's name.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): ApiCommentReply;

    /**
     * Sets the comment reply text.
     *
     * @param sText - The comment reply text.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/SetText/
     */
    SetText(sText: string): ApiCommentReply;

    /**
     * Sets the user ID to the comment reply author.
     *
     * @param sUserId - The user ID of the comment reply author.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCommentReply/Methods/SetUserId/
     */
    SetUserId(sUserId: string): ApiCommentReply;
  }

  /**
   * Class representing a complex field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/
   */
  export interface ApiComplexForm extends Omit<ApiFormBase, "GetValue"> {
    /**
     * Appends the text content of the given form to the end of the current complex form.
     *
     * @param value - The text or the form to add.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/Methods/Add/
     */
    Add(value: string | ApiDateForm | ApiPictureForm | ApiCheckBoxForm | ApiComboBoxForm | ApiTextForm): boolean;

    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Clears all content from the current complex form, resetting it to its placeholder state.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComplexForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns an ordered list of subforms.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/Methods/GetSubForms/
     */
    GetSubForms(): ApiForm[];

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the complex form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComplexForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetValue/
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a list of values of the combo box / drop-down list content control.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/
   */
  export interface ApiContentControlList {
    /**
     * Adds a new value to the combo box / drop-down list content control.
     *
     * @param sText - The display text for the list item.
     * @param sValue - The list item value. By default is equal to sText parameter
     * @param nIndex - A position where a new value will be added. If nIndex=-1 add to the end.
     * @default nIndex = -1
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/Add/
     */
    Add(sText: string, sValue: string, nIndex?: number): boolean;

    /**
     * Clears a list of values of the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Returns a collection of items (the ApiContentControlListEntry objects) of the combo box / drop-down
     * list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/GetAllItems/
     */
    GetAllItems(): ApiContentControlListEntry[];

    /**
     * Returns a type of the ApiContentControlList class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/GetClassType/
     */
    GetClassType(): "contentControlList";

    /**
     * Returns a number of items of the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns an item of the combo box / drop-down list content control by the position specified in the
     * request.
     *
     * @param nIndex - Item position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/GetItem/
     */
    GetItem(nIndex: number): ApiContentControlListEntry;

    /**
     * Returns a parent of the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlList/Methods/GetParent/
     */
    GetParent(): ApiInlineLvlSdt | ApiBlockLvlSdt;
  }

  /**
   * Class representing an entry of the combo box / drop-down list content control.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/
   */
  export interface ApiContentControlListEntry {
    /**
     * Deletes the specified item in the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a type of the ApiContentControlListEntry class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/GetClassType/
     */
    GetClassType(): "contentControlList";

    /**
     * Returns an index of the content control list item in the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns a parent of the content control list item in the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/GetParent/
     */
    GetParent(): ApiContentControlList;

    /**
     * Returns a String that represents the display text of a list item for the combo box / drop-down list
     * content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns a String that represents the value of a list item for the combo box / drop-down list content
     * control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Moves the current item in the parent combo box / drop-down list content control down one element, so
     * that it is after the item that originally followed it.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/MoveDown/
     */
    MoveDown(): boolean;

    /**
     * Moves the current item in the parent combo box / drop-down list content control up one element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/MoveUp/
     */
    MoveUp(): boolean;

    /**
     * Selects the list entry in the combo box / drop-down list content control and sets the text of the
     * content control to the selected item value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets an index to the content control list item in the combo box / drop-down list content control.
     *
     * @param nIndex - An index of the content control list item.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/SetIndex/
     */
    SetIndex(nIndex: number): boolean;

    /**
     * Sets a String that represents the display text of a list item for the combo box / drop-down list
     * content control.
     *
     * @param sText - The display text of a list item.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets a String that represents the value of a list item for the combo box / drop-down list content
     * control.
     *
     * @param sValue - The value of a list item.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiContentControlListEntry/Methods/SetValue/
     */
    SetValue(sValue: string): boolean;
  }

  /**
   * Class representing document properties (similar to BuiltInDocumentProperties in VBA).
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/
   */
  export interface ApiCore {
    /**
     * Returns the document category.
     *
     * @returns The document category.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetCategory/
     */
    GetCategory(): string;

    /**
     * Returns a type of the ApiCore class.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetClassType/
     */
    GetClassType(): "core";

    /**
     * Returns the document content status.
     *
     * @returns The document content status.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetContentStatus/
     */
    GetContentStatus(): string;

    /**
     * Returns the document creation date.
     *
     * @returns The document creation date.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetCreated/
     */
    GetCreated(): Date;

    /**
     * Returns the document author.
     *
     * @returns The document author.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetCreator/
     */
    GetCreator(): string;

    /**
     * Returns the document description.
     *
     * @returns The document description.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetDescription/
     */
    GetDescription(): string;

    /**
     * Returns the document identifier.
     *
     * @returns The document identifier.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetIdentifier/
     */
    GetIdentifier(): string;

    /**
     * Returns the document keywords.
     *
     * @returns The document keywords in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetKeywords/
     */
    GetKeywords(): string;

    /**
     * Returns the document language.
     *
     * @returns The document language.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the name of the user who last modified the document.
     *
     * @returns The name of the user who last modified the document.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetLastModifiedBy/
     */
    GetLastModifiedBy(): string;

    /**
     * Returns the date when the document was last printed.
     *
     * @returns The date when the document was last printed.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetLastPrinted/
     */
    GetLastPrinted(): Date;

    /**
     * Returns the date when the document was last modified.
     *
     * @returns The date when the document was last modified.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetModified/
     */
    GetModified(): Date;

    /**
     * Returns the document revision.
     *
     * @returns The document revision.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetRevision/
     */
    GetRevision(): string;

    /**
     * Returns the document subject.
     *
     * @returns The document subject.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Returns the document title.
     *
     * @returns The document title.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetTitle/
     */
    GetTitle(): string;

    /**
     * Returns the document version.
     *
     * @returns The document version.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/GetVersion/
     */
    GetVersion(): string;

    /**
     * Sets the document category.
     *
     * @param sCategory - The document category.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetCategory/
     */
    SetCategory(sCategory: string): void;

    /**
     * Sets the document content status.
     *
     * @param sStatus - The document content status.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetContentStatus/
     */
    SetContentStatus(sStatus: string): void;

    /**
     * Sets the document creation date.
     *
     * @param oCreated - The document creation date.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetCreated/
     */
    SetCreated(oCreated: Date): void;

    /**
     * Sets the document author.
     *
     * @param sCreator - The document author.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetCreator/
     */
    SetCreator(sCreator: string): void;

    /**
     * Sets the document description.
     *
     * @param sDescription - The document description.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetDescription/
     */
    SetDescription(sDescription: string): void;

    /**
     * Sets the document identifier.
     *
     * @param sIdentifier - The document identifier.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetIdentifier/
     */
    SetIdentifier(sIdentifier: string): void;

    /**
     * Sets the document keywords.
     *
     * @param sKeywords - The document keywords in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetKeywords/
     */
    SetKeywords(sKeywords: string): void;

    /**
     * Sets the document language.
     *
     * @param sLanguage - The document language.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetLanguage/
     */
    SetLanguage(sLanguage: string): void;

    /**
     * Sets the name of the user who last modified the document.
     *
     * @param sLastModifiedBy - The name of the user who last modified the document.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetLastModifiedBy/
     */
    SetLastModifiedBy(sLastModifiedBy: string): void;

    /**
     * Sets the date when the document was last printed.
     *
     * @param oLastPrinted - The date when the document was last printed.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetLastPrinted/
     */
    SetLastPrinted(oLastPrinted: Date): void;

    /**
     * Sets the date when the document was last modified.
     *
     * @param oModified - The date when the document was last modified.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetModified/
     */
    SetModified(oModified: Date): void;

    /**
     * Sets the document revision.
     *
     * @param sRevision - The document revision.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetRevision/
     */
    SetRevision(sRevision: string): void;

    /**
     * Sets the document subject.
     *
     * @param sSubject - The document subject.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetSubject/
     */
    SetSubject(sSubject: string): void;

    /**
     * Sets the document title.
     *
     * @param sTitle - The document title.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetTitle/
     */
    SetTitle(sTitle: string): void;

    /**
     * Sets the document version.
     *
     * @param sVersion - The document version.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCore/Methods/SetVersion/
     */
    SetVersion(sVersion: string): void;
  }

  /**
   * Class representing custom properties of the document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomProperties/
   */
  export interface ApiCustomProperties {
    /**
     * Adds a custom property to the document with automatic type detection.
     *
     * @param name - The custom property name.
     * @param value - The custom property value.
     * @returns Returns false if the type is unsupported.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomProperties/Methods/Add/
     */
    Add(name: string, value: string | number | boolean | Date): boolean;

    /**
     * Returns the value of a custom property by its name.
     *
     * @param name - The custom property name.
     * @returns The value of the custom property or null if the property does not exist.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomProperties/Methods/Get/
     */
    Get(name: string): string | number | Date | boolean | null;

    /**
     * Returns a type of the ApiCustomProperties class.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomProperties/Methods/GetClassType/
     */
    GetClassType(): "customProperties";
  }

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/
   */
  export interface ApiCustomXmlNode {
    /**
     * Creates a child node for the current XML node.
     *
     * @param nodeName - The name of the new child node.
     * @returns The newly created child node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/Add/
     */
    Add(nodeName: string): ApiCustomXmlNode;

    /**
     * Deletes the current XML node.
     *
     * @returns Returns `true` if the node was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Deletes an attribute from the custom XML node.
     * If the attribute exists, it will be removed.
     *
     * @param name - The name of the attribute to delete.
     * @returns Returns `true` if the attribute was successfully deleted, `false` if the attribute didn't exist.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/DeleteAttribute/
     */
    DeleteAttribute(name: string): boolean;

    /**
     * Retrieves the attribute value from the custom XML node.
     * If the attribute doesn't exist, it returns `false`.
     *
     * @param name - The name of the attribute to retrieve.
     * @returns The value of the attribute if it exists, or `null` if the attribute is not found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetAttribute/
     */
    GetAttribute(name: string): string | null;

    /**
     * Returns a list of attributes of the current XML node.
     *
     * @returns An array of attribute objects.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetAttributes/
     */
    GetAttributes(): CustomXmlNodeAttribute[];

    /**
     * Returns a type of the ApiCustomXmlNode class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetClassType/
     */
    GetClassType(): "customXmlNode";

    /**
     * Returns the name of the current XML node.
     *
     * @returns The name of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetNodeName/
     */
    GetNodeName(): string;

    /**
     * Returns the XML string representation of the current node content.
     *
     * @returns The XML string representation of the current node content.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetNodeValue/
     */
    GetNodeValue(): string;

    /**
     * Returns nodes from the custom XML node based on the given XPath.
     *
     * @param xPath - The XPath expression to match nodes.
     * @returns An array of nodes that match the given XPath.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetNodes/
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Returns the parent of the current XML node.
     *
     * @returns The parent node, or `null` if the current node has no parent.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetParent/
     */
    GetParent(): ApiCustomXmlNode | null;

    /**
     * Returns the inner text of the current node and its child nodes.
     * For example: `<text>123<one>4</one></text>` returns `"1234"`.
     *
     * @returns The combined text content of the node and its descendants.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the absolute XPath of the current XML node.
     *
     * @returns The absolute XPath of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetXPath/
     */
    GetXPath(): string;

    /**
     * Returns the XML string of the current node.
     *
     * @returns The XML string representation of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/GetXml/
     */
    GetXml(): string;

    /**
     * Sets an attribute for the custom XML node.
     * If the attribute already exists, it will not be modified.
     *
     * @param name - The name of the attribute to set.
     * @param value - The value to assign to the attribute.
     * @returns Returns `true` if the attribute was successfully set, `false` if the attribute already exists.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/SetAttribute/
     */
    SetAttribute(name: string, value: string): boolean;

    /**
     * Sets the XML content for the current node.
     *
     * @param xml - The XML string to set as the content of the current node.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/SetNodeValue/
     */
    SetNodeValue(xml: string): boolean;

    /**
     * Sets the text content of the current XML node.
     *
     * @param str - The text content to set for the node.
     * @returns Returns `true` if the text was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/SetText/
     */
    SetText(str: string): boolean;

    /**
     * Sets the XML content of the current XML node.
     *
     * @param strXml - The XML string to set as the node content.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/SetXml/
     */
    SetXml(strXml: string): boolean;

    /**
     * Updates the value of an existing attribute in the custom XML node.
     * If the attribute doesn't exist, the update will not occur.
     *
     * @param name - The name of the attribute to update.
     * @param value - The new value to assign to the attribute.
     * @returns Returns `true` if the attribute was successfully updated, `false` if the attribute doesn't
     *   exist.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlNode/Methods/UpdateAttribute/
     */
    UpdateAttribute(name: string, value: string): boolean;
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/
   */
  export interface ApiCustomXmlPart {
    /**
     * Deletes the XML from the custom XML manager.
     *
     * @returns True if the XML was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Deletes an attribute from the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node from which to delete the attribute.
     * @param name - The name of the attribute to delete.
     * @returns True if the attribute was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/DeleteAttribute/
     */
    DeleteAttribute(xPath: string, name: string): boolean;

    /**
     * Deletes an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the node to delete.
     * @returns True if the element was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/DeleteElement/
     */
    DeleteElement(xPath: string): boolean;

    /**
     * Returns an attribute from the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node from which to get the attribute.
     * @param name - The name of the attribute to find.
     * @returns The attribute value or null if no matching attributes are found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/GetAttribute/
     */
    GetAttribute(xPath: string, name: string): string | null;

    /**
     * Returns a type of the ApiCustomXmlPart class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/GetClassType/
     */
    GetClassType(): "customXmlPart";

    /**
     * Returns the ID of the custom XML part.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/GetId/
     */
    GetId(): string;

    /**
     * Retrieves nodes from custom XML based on the provided XPath.
     *
     * @param xPath - The XPath expression to search for nodes.
     * @returns An array of ApiCustomXmlNode objects corresponding to the found nodes.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/GetNodes/
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Retrieves the XML string from the custom XML part.
     *
     * @returns The XML string.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/GetXml/
     */
    GetXml(): string;

    /**
     * Inserts an attribute into the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node to insert the attribute into.
     * @param name - The name of the attribute to insert.
     * @param value - The value of the attribute to insert.
     * @returns True if the attribute was successfully inserted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/InsertAttribute/
     */
    InsertAttribute(xPath: string, name: string, value: string): boolean;

    /**
     * Inserts an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the parent node where the new element will be inserted.
     * @param xmlStr - The XML string to insert.
     * @param index - The position at which to insert the new XML element. If omitted, the element will be appended as
     *   the last child.
     * @returns True if the insertion was successful.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/InsertElement/
     */
    InsertElement(xPath: string, xmlStr: string, index?: number): boolean;

    /**
     * Updates an attribute of the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node whose attribute should be updated.
     * @param name - The name of the attribute to update.
     * @param value - The new value for the attribute.
     * @returns True if the attribute was successfully updated.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/UpdateAttribute/
     */
    UpdateAttribute(xPath: string, name: string, value: string): boolean;

    /**
     * Updates an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the node to update.
     * @param xmlStr - The XML string to replace the node content with.
     * @returns True if the update was successful.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlPart/Methods/UpdateElement/
     */
    UpdateElement(xPath: string, xmlStr: string): boolean;
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/
   */
  export interface ApiCustomXmlParts {
    /**
     * Adds a new custom XML part to the XML manager.
     *
     * @param xml - The XML string to be added.
     * @returns The newly created ApiCustomXmlPart object.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/Add/
     */
    Add(xml: string): ApiCustomXmlPart;

    /**
     * Returns all custom XML parts from the XML manager.
     *
     * @returns An array of all custom XML parts.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/GetAll/
     */
    GetAll(): ApiCustomXmlPart[];

    /**
     * Returns a custom XML part by its ID from the XML manager.
     *
     * @param xmlPartId - The XML part ID.
     * @returns The corresponding ApiCustomXmlPart object if found, or null if no match is found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/GetById/
     */
    GetById(xmlPartId: string): ApiCustomXmlPart | null;

    /**
     * Returns custom XML parts by namespace from the XML manager.
     *
     * @param namespace - The namespace of the XML parts.
     * @returns An array of ApiCustomXmlPart objects or null if no matching XML parts are found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/GetByNamespace/
     */
    GetByNamespace(namespace: string): ApiCustomXmlPart[];

    /**
     * Returns a type of the ApiCustomXmlParts class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/GetClassType/
     */
    GetClassType(): "customXmlParts";

    /**
     * Returns a number of custom XML parts in the XML manager.
     *
     * @returns The number of custom XML parts.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCustomXmlParts/Methods/GetCount/
     */
    GetCount(): number;
  }

  /**
   * Class representing a document date field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/
   */
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiDateForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetClassType/
     */
    GetClassType(): "dateForm";

    /**
     * Returns the date of the current form.
     *
     * @returns The date object, or undefined if the form is a placeholder.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetDate/
     */
    GetDate(): undefined | Date;

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Gets the date format of the current form.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetFormat/
     */
    GetFormat(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Gets the used date language of the current form.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the timestamp of the current form.
     *
     * @returns The Unix timestamp in milliseconds, or undefined if the form is a placeholder.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetTime/
     */
    GetTime(): undefined | number;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the date of the current form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetValue/
     */
    GetValue(): Date | undefined;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the date to the current form.
     *
     * @param date - The date object or the date in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetDate/
     */
    SetDate(date: Date | string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the date format to the current form.
     *
     * @param sFormat - The date format. For example, mm.dd.yyyy
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetFormat/
     */
    SetFormat(sFormat: string): boolean;

    /**
     * Sets the date language to the current form.
     *
     * @param sLangId - The date language. The possible value for this parameter is a language identifier as defined in
     *   RFC 4646/BCP 47. Example: "en-CA".
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the timestamp to the current form.
     *
     * @param nTimeStamp - The timestamp that will be set to the current date form.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetTime/
     */
    SetTime(nTimeStamp: number): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the date of the current form.
     *
     * @param value - The date object or the date in the string format.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetValue/
     */
    SetValue(value: Date | string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/
   */
  export interface ApiDocument extends Omit<ApiDocumentContent, "GetClassType" | "ToJSON"> {
    /**
     * Accepts all changes made in review mode.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AcceptAllRevisionChanges/
     */
    AcceptAllRevisionChanges(): boolean;

    /**
     * Adds a new checkbox content control to the document.
     *
     * @param checkBoxPr - The configuration object for the checkbox.
     * @returns An instance of the ApiInlineLvlSdt object representing the checkbox content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddCheckBoxContentControl/
     */
    AddCheckBoxContentControl(checkBoxPr: ContentControlCheckBoxPr): ApiInlineLvlSdt;

    /**
     * Adds a new combo box content control to the document.
     *
     * @param list - An array of objects representing the items in the combo box.
     * @param selected - The optional value of the item that should be selected by default (must match one of the
     *   ListItem.Value).
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddComboBoxContentControl/
     */
    AddComboBoxContentControl(list?: ContentControlListItem[], selected?: string): ApiInlineLvlSdt;

    /**
     * Adds a comment to the current document selection, or to the current word if no text is selected.
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds a new date picker content control to the document.
     *
     * @param datePickerPr - The optional date picker properties.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddDatePickerContentControl/
     */
    AddDatePickerContentControl(datePickerPr?: ContentControlDatePr): ApiInlineLvlSdt;

    /**
     * Adds a drawing to the specified page.
     * <note>This method can be a little bit slow, because it runs the document calculation
     * process to arrange tables on the specified page.</note>
     *
     * @param oDrawing - A drawing to add to the page.
     * @param nPage - The page index.
     * @param x - The X coordinate in English measure units.
     * @param y - The Y coordinate in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddDrawingToPage/
     */
    AddDrawingToPage(oDrawing: ApiDrawing, nPage: number, x: EMU, y: EMU): boolean;

    /**
     * Adds a new drop-down list content control to the document.
     *
     * @param list - An array of objects representing the items in the drop-down list.
     * @param selected - The optional value of the item that should be selected by default (must match one of the
     *   ListItem.Value).
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddDropDownListContentControl/
     */
    AddDropDownListContentControl(list?: ContentControlListItem[], selected?: string): ApiInlineLvlSdt;

    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds an endnote for the selected text (or the current position if the selection doesn't exist).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddEndnote/
     */
    AddEndnote(): ApiDocumentContent;

    /**
     * Adds a footnote for the selected text (or the current position if the selection doesn't exist).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddFootnote/
     */
    AddFootnote(): ApiDocumentContent;

    /**
     * Adds a math equation to the current document.
     *
     * @param sText - An equation written as a linear text string.
     * @param sFormat - The format of the specified linear representation.
     * @default sFormat = "unicode"
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddMathEquation/
     */
    AddMathEquation(sText: string, sFormat?: "unicode" | "latex" | "mathml"): boolean;

    /**
     * Creates a new paragraph and appends it to the end of the document content.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddParagraph/
     */
    AddParagraph(): ApiParagraph;

    /**
     * Adds a new picture content control to the document.
     *
     * @param width - The optional width of the image.
     * @param height - The optional height of the image.
     * @returns An instance of the ApiInlineLvlSdt object representing the picture content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddPictureContentControl/
     */
    AddPictureContentControl(width?: EMU, height?: EMU): ApiInlineLvlSdt;

    /**
     * Adds a table of content to the current document.
     *
     * @param oTocPr - Table of contents properties.
     * @param oRange - The range that the table of contents replaces. If omitted, the table of contents is inserted at
     *   the current position.
     * @default oTocPr = {}
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddTableOfContents/
     */
    AddTableOfContents(oTocPr?: TocPr, oRange?: ApiRange): ApiTableOfContents;

    /**
     * Adds a table of figures to the current document.
     *
     * @param oTofPr - Table of figures properties. <note>Please note that the table of figures properties will be
     *   filled with the default properties if they are undefined.</note>
     * @param oRange - The range that the table of figures replaces. If omitted, the table of figures is inserted at
     *   the current position.
     * @default oTofPr = {}
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddTableOfFigures/
     */
    AddTableOfFigures(oTofPr?: TofPr, oRange?: ApiRange): ApiTableOfFigures;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Clears all forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ClearAllFields/
     */
    ClearAllFields(): boolean;

    /**
     * Creates a new history point.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateNewHistoryPoint/
     */
    CreateNewHistoryPoint(): boolean;

    /**
     * Creates an abstract multilevel numbering with a specified type.
     *
     * @param sType - The type of the numbering which will be created.
     * @default sType = "bullet"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateNumbering/
     */
    CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;

    /**
     * Creates a new empty paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateParagraph/
     */
    CreateParagraph(): ApiParagraph;

    /**
     * Creates a new document section which ends at the specified paragraph. Allows to set local parameters
     * to the current
     * section - page size, footer, header, columns, etc.
     *
     * @param oParagraph - The paragraph after which a new document section will be inserted. Paragraph must be in a
     *   document.
     * @returns Returns null if parametr is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateSection/
     */
    CreateSection(oParagraph: ApiParagraph): ApiSection | null;

    /**
     * Creates a new style with the specified type and name. If a style with the specified name already
     * exists, it will be returned without creating a new one.
     *
     * @param styleName - The name of the style which will be created.
     * @param type - The document element which the style will be applied to.
     * @default type = "paragraph"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateStyle/
     */
    CreateStyle(styleName: string, type?: StyleType): ApiStyle;

    /**
     * Creates a new table with a specified number of rows and columns.
     *
     * @param rows - Number of rows.
     * @param cols - Number of columns.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/CreateTable/
     */
    CreateTable(rows: number, cols: number): ApiTable;

    /**
     * Removes a bookmark from the document, if one exists.
     *
     * @param sName - The bookmark name.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/DeleteBookmark/
     */
    DeleteBookmark(sName: string): boolean;

    /**
     * Add text to the document on the cursor position.
     *
     * @param sText - The text to add to document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/EnterText/
     */
    EnterText(sText: string): boolean;

    /**
     * Return current table from the current document.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetActiveTable/
     */
    GetActiveTable(): ApiTable | null;

    /**
     * Returns an array with names of all bookmarks in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllBookmarksNames/
     */
    GetAllBookmarksNames(): string[];

    /**
     * Returns all caption paragraphs of the specified type from the current document.
     *
     * @param sCaption - The caption label ("Equation", "Figure", "Table", or another caption label).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllCaptionParagraphs/
     */
    GetAllCaptionParagraphs(sCaption: CaptionLabel | string): ApiParagraph[];

    /**
     * Returns a collection of chart objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns all comments from the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllComments/
     */
    GetAllComments(): ApiComment[];

    /**
     * Returns a list of all the content controls from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllContentControls/
     */
    GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];

    /**
     * Returns a collection of drawing objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllDrawingObjects/
     */
    GetAllDrawingObjects(): Drawing[];

    /**
     * Returns all existing forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllForms/
     */
    GetAllForms(): ApiForm[];

    /**
     * Returns all heading paragraphs from the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllHeadingParagraphs/
     */
    GetAllHeadingParagraphs(): ApiParagraph[];

    /**
     * Returns a collection of image objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns all numbered paragraphs from the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllNumberedParagraphs/
     */
    GetAllNumberedParagraphs(): ApiParagraph[];

    /**
     * Returns a collection of OLE objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a collection of shape objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns all styles of the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllStyles/
     */
    GetAllStyles(): ApiStyle[];

    /**
     * Returns an array of all tables from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllTables/
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns a collection of tables on a given absolute page.
     * <note>This method can be a little bit slow, because it runs the document calculation
     * process to arrange tables on the specified page.</note>
     *
     * @param nPage - The page index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetAllTablesOnPage/
     */
    GetAllTablesOnPage(nPage: number): ApiTable[];

    /**
     * Returns a bookmark by its name from the current document.
     *
     * @param sBookmarkName - The bookmark name.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetBookmark/
     */
    GetBookmark(sBookmarkName: string): ApiBookmark;

    /**
     * Returns a bookmark range.
     *
     * @param sName - The bookmark name.
     * @returns returns null if sName is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetBookmarkRange/
     */
    GetBookmarkRange(sName: string): ApiRange | null;

    /**
     * Returns a type of the ApiDocument class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetClassType/
     */
    GetClassType(): "document";

    /**
     * Returns a comment from the current document by its ID.
     *
     * @param sId - The comment ID.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCommentById/
     */
    GetCommentById(sId: string): ApiComment;

    /**
     * Returns a report about all the comments added to the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCommentsReport/
     */
    GetCommentsReport(): CommentReport;

    /**
     * Returns an array of document elements from the current ApiDocumentContent object.
     *
     * @param bGetCopies - Specifies if the copies of the document elements will be returned or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetContent/
     */
    GetContent(bGetCopies: boolean): DocumentElement[];

    /**
     * Returns a list of all content controls in the document with the specified tag name.
     *
     * @param sTag - Content control tag.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetContentControlsByTag/
     */
    GetContentControlsByTag(sTag: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];

    /**
     * Returns the highlight color of the content controls in the current document.
     *
     * @returns Returns the highlight color, or _null_ if the highlight is disabled.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetControlsHighlight/
     */
    GetControlsHighlight(): ApiColor | null;

    /**
     * Retrieves the core properties interface for the current document.
     * This method is used to view or modify standard metadata such as title, author, and keywords.
     *
     * @returns The core document properties object.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCore/
     */
    GetCore(): ApiCore;

    /**
     * Returns the currently selected content control.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentContentControl/
     */
    GetCurrentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;

    /**
     * Returns the footnote or endnote content if the cursor is currently inside one, otherwise returns
     * null.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCurrentFootEndnote/
     */
    GetCurrentFootEndnote(): ApiDocumentContent;

    /**
     * Returns the index of the current page.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCurrentPage/
     */
    GetCurrentPage(): number;

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns the current sentence or part of the current sentence.
     *
     * @param sPart - The desired part of the current sentence to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCurrentSentence/
     */
    GetCurrentSentence(sPart?: "before" | "after"): string;

    /**
     * Returns the indexes of the currently visible pages.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCurrentVisiblePages/
     */
    GetCurrentVisiblePages(): number[];

    /**
     * Returns the current word or part of the current word.
     *
     * @param sWordPart - The desired part of the current word to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCurrentWord/
     */
    GetCurrentWord(sWordPart?: "before" | "after"): string;

    /**
     * Retrieves the custom properties from the document.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCustomProperties/
     */
    GetCustomProperties(): ApiCustomProperties;

    /**
     * Retrieves the custom XML manager associated with the document.
     * This manager allows manipulation and access to custom XML parts within the document.
     *
     * @returns Returns an instance of ApiCustomXmlParts if the custom XML manager exists, otherwise returns
     *   null.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetCustomXmlParts/
     */
    GetCustomXmlParts(): ApiCustomXmlParts | null;

    /**
     * Returns a set of default paragraph properties in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetDefaultParaPr/
     */
    GetDefaultParaPr(): ApiParaPr;

    /**
     * Returns the default style parameters for the specified document element.
     *
     * @param sStyleType - The document element which we want to get the style for.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetDefaultStyle/
     */
    GetDefaultStyle(sStyleType: StyleType): ApiStyle;

    /**
     * Returns a set of default properties for the text run in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetDefaultTextPr/
     */
    GetDefaultTextPr(): ApiTextPr;

    /**
     * Returns the document information:
     * **Application** - the application the document was created with.
     * **CreatedRaw** - the date and time when the file was created.
     * **Created** - the parsed date and time when the file was created.
     * **LastModifiedRaw** - the date and time when the file was last modified.
     * **LastModified** - the parsed date and time when the file was last modified.
     * **LastModifiedBy** - the name of the user who made the latest change to the document.
     * **Authors** - the persons who created the file.
     * **Title** - the document title (this property allows you to simplify your documents classification).
     * **Tags** - the document tags (this property allows you to simplify your documents classification).
     * **Subject** - the document subject (this property allows you to simplify your documents
     * classification).
     * **Comment** - the comment to the document (this property allows you to simplify your documents
     * classification).
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetDocumentInfo/
     */
    GetDocumentInfo(): object;

    /**
     * Returns a collection of drawing objects from the document filtered by their names.
     *
     * @param ids - An array of drawing names to filter by.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetDrawingsByName/
     */
    GetDrawingsByName(ids: string[]): ApiDrawing[];

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns the position (index) of the specified element within the current document content.
     *
     * @param element - The document element (paragraph, table or block content control) whose index will be returned.
     * @returns returns -1 if the element is not a direct child of the current document content.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElementIndex/
     */
    GetElementIndex(element: DocumentElement): number;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns the first paragraphs from all endnotes in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetEndNotesFirstParagraphs/
     */
    GetEndNotesFirstParagraphs(): ApiParagraph[];

    /**
     * Returns the document final section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFinalSection/
     */
    GetFinalSection(): ApiSection;

    /**
     * Returns the first paragraphs from all footnotes in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFootnotesFirstParagraphs/
     */
    GetFootnotesFirstParagraphs(): ApiParagraph[];

    /**
     * Returns a list of all form keys attached to the specified role.
     *
     * @param role - The form role.
     * @returns A list of all form keys attached to the specified role.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormKeysByRole/
     */
    GetFormKeysByRole(role: string): string[];

    /**
     * Returns the form value for the specified key. For a group of radio buttons returns Choice, i.e. the
     * name of the selected item.
     *
     * @param key - The form key.
     * @returns Returns true/false for checkboxes and string for other form types. Returns null if there is no
     *   form with the specified key.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormValueByKey/
     */
    GetFormValueByKey(key: string): null | boolean | string;

    /**
     * Returns a list of all forms in the document with the specified key.
     *
     * @param key - The form key.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormsByKey/
     */
    GetFormsByKey(key: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified role name.
     *
     * @param role - The form role.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormsByRole/
     */
    GetFormsByRole(role: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified tag name.
     *
     * @param sTag - Form tag.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormsByTag/
     */
    GetFormsByTag(sTag: string): ApiForm[];

    /**
     * Returns the data from all forms present in the current document.
     * If a form was created and not assigned to any part of the document, it won't appear in this list.
     *
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormsData/
     */
    GetFormsData(): FormData[];

    /**
     * Returns the highlight color of the forms in the document.
     *
     * @returns Returns the highlight color, or _null_ if the highlight is disabled.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetFormsHighlight/
     */
    GetFormsHighlight(): ApiColor | null;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns a number of pages in the current document.
     * <note>This method can be slow for large documents because it runs the document calculation
     * process before the full recalculation.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetPageCount/
     */
    GetPageCount(): number;

    /**
     * Returns a Range object that represents the part of the document contained in the specified document.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

    /**
     * Returns a range object by the current selection.
     *
     * @returns returns null if selection doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetRangeBySelect/
     */
    GetRangeBySelect(): ApiRange | null;

    /**
     * Returns a report about every change which was made to the document in the review mode.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetReviewReport/
     */
    GetReviewReport(): ReviewReport;

    /**
     * Returns a collection of section objects in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetSections/
     */
    GetSections(): ApiSection[];

    /**
     * Returns all the selected drawings in the current document.
     *
     * @since 7.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetSelectedDrawings/
     */
    GetSelectedDrawings(): Drawing[];

    /**
     * Returns the document statistics represented as an object with the following parameters:
     * **PageCount** - number of pages;
     * **WordsCount** - number of words;
     * **ParagraphCount** - number of paragraphs;
     * **SymbolsCount** - number of symbols;
     * **SymbolsWSCount** - number of symbols with spaces.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetStatistics/
     */
    GetStatistics(): object;

    /**
     * Returns a style by its name.
     *
     * @param styleName - The style name.
     * @returns Returns the style, or _null_ if no style with the specified name was found.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetStyle/
     */
    GetStyle(styleName: string): ApiStyle | null;

    /**
     * Returns a list of all tags that are used for all content controls in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetTagsOfAllContentControls/
     */
    GetTagsOfAllContentControls(): string[];

    /**
     * Returns a list of all tags that are used for all forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetTagsOfAllForms/
     */
    GetTagsOfAllForms(): string[];

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Returns the watermark settings in the current document.
     *
     * @returns The object which represents the watermark settings.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GetWatermarkSettings/
     */
    GetWatermarkSettings(): ApiWatermarkSettings;

    /**
     * Moves a cursor to the start of the specified page in the document.
     *
     * @param index - The page index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GoToPage/
     */
    GoToPage(index: number): boolean;

    /**
     * Groups an array of drawings in the current document.
     *
     * @param aDrawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/GroupDrawings/
     */
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;

    /**
     * Inserts a blank page to the current location.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/InsertBlankPage/
     */
    InsertBlankPage(): boolean;

    /**
     * Inserts an array of elements into the current position of the document.
     * The array may contain a mix of element types:
     * - {@link DocumentElement} elements are inserted as-is.
     * - {@link ParagraphContent} elements are automatically grouped into paragraphs: consecutive
     * paragraph-level elements
     * share one new paragraph.
     * - Plain strings and numbers are wrapped in a new run and added to the current paragraph (same
     * grouping rules as {@link ParagraphContent}).
     * - {@link ApiDrawing} elements are wrapped in a new run and added to the current paragraph.
     * Elements that are already in use in a document are skipped.
     *
     * @param content - An array of elements to insert.
     * @param isInline - Inline insert or not (works only for the last and the first element and only if it's a
     *   paragraph).
     * @param pr - Specifies that text and paragraph document properties are preserved for the inserted elements.
     *   The object should look like this: {"KeepTextOnly": true}.
     * @default isInline = false
     * @returns Success?
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/InsertContent/
     */
    InsertContent(content: (DocumentElement | ParagraphContent | ApiDrawing | string | number)[], isInline?: boolean, pr?: object): boolean;

    /**
     * Add paragraph to the document on the cursor position.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/InsertParagraphBreak/
     */
    InsertParagraphBreak(): boolean;

    /**
     * Inserts a watermark on each document page.
     *
     * @param sText - Watermark text.
     * @param bIsDiagonal - Specifies if the watermark is placed diagonally (true) or horizontally (false).
     * @default sText = "WATERMARK"
     * @default bIsDiagonal = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/InsertWatermark/
     */
    InsertWatermark(sText?: string, bIsDiagonal?: boolean): boolean;

    /**
     * Check if the current document content is an endnote.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/IsEndnote/
     */
    IsEndnote(): boolean;

    /**
     * Check if the current document content is a footnote.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/IsFootnote/
     */
    IsFootnote(): boolean;

    /**
     * Checks if change tracking mode is enabled or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/IsTrackRevisions/
     */
    IsTrackRevisions(): boolean;

    /**
     * Returns the last document element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/Last/
     */
    Last(): DocumentElement;

    /**
     * Moves the cursor down.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @default count = 1
     * @default addToSelect = false
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorDown/
     */
    MoveCursorDown(count?: number, addToSelect?: boolean): boolean;

    /**
     * Moves the cursor to the left.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @param byWords - Specifies whether to move by words instead of by character.
     * @default count = 1
     * @default addToSelect = false
     * @default byWords = false
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorLeft/
     */
    MoveCursorLeft(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;

    /**
     * Moves the cursor to the right.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @param byWords - Specifies whether to move by words instead of by character.
     * @default count = 1
     * @default addToSelect = false
     * @default byWords = false
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorRight/
     */
    MoveCursorRight(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;

    /**
     * Moves a cursor to the end of the document.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToEnd/
     */
    MoveCursorToEnd(): boolean;

    /**
     * Moves the cursor into the footer of the specified page and switches the document into the footer
     * editing mode. The cursor is positioned at the beginning of the footer.
     *
     * @param page - The page number. If not specified, the current page is used.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToFooter/
     */
    MoveCursorToFooter(page?: number): boolean;

    /**
     * Moves the cursor into the header of the specified page and switches the document into the header
     * editing mode. The cursor is positioned at the beginning of the header.
     *
     * @param page - The page number. If not specified, the current page is used.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToHeader/
     */
    MoveCursorToHeader(page?: number): boolean;

    /**
     * Moves the cursor from the header, footer or any other special part of the document back to the main
     * document content on the current page.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToMainDocument/
     */
    MoveCursorToMainDocument(): boolean;

    /**
     * Moves the cursor to the reference of this footnote/endnote in the main document. If this document
     * content is not a footnote/endnote, does nothing.
     *
     * @param isBefore - Specifies whether to place the cursor before (_true_) or after (_false_) the note reference.
     * @returns Returns _true_ if the cursor was moved to the reference successfully.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/MoveCursorToNoteReference/
     */
    MoveCursorToNoteReference(isBefore: boolean): boolean;

    /**
     * Moves a cursor to a specified position of the current document.
     * If there is any selection in the document, it will be removed.
     *
     * @param nPos - The desired cursor position.
     * @default nPos = 0
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToPos/
     */
    MoveCursorToPos(nPos?: number): boolean;

    /**
     * Moves a cursor to the start of the document.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorToStart/
     */
    MoveCursorToStart(): boolean;

    /**
     * Moves the cursor up.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @default count = 1
     * @default addToSelect = false
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/MoveCursorUp/
     */
    MoveCursorUp(count?: number, addToSelect?: boolean): boolean;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Rejects all changes made in review mode.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/RejectAllRevisionChanges/
     */
    RejectAllRevisionChanges(): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Removes the current selection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/RemoveSelection/
     */
    RemoveSelection(): boolean;

    /**
     * Removes a watermark from the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/RemoveWatermark/
     */
    RemoveWatermark(): boolean;

    /**
     * Replaces the current image with an image specified.
     *
     * @param sImageUrl - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param Width - The image width in English measure units.
     * @param Height - The image height in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ReplaceCurrentImage/
     */
    ReplaceCurrentImage(sImageUrl: string, Width: EMU, Height: EMU): boolean;

    /**
     * Replaces the current sentence or part of the current sentence with the specified text.
     *
     * @param sReplace - The string to replace the current sentence with.
     * @param sPart - The desired part of the current sentence to be replaced.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ReplaceCurrentSentence/
     */
    ReplaceCurrentSentence(sReplace: string, sPart?: "before" | "after"): boolean;

    /**
     * Replaces the current word or part of the current word with the specified text.
     *
     * @param sReplace - The string to replace the current word with.
     * @param sPart - The desired part of the current word to be replaced.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ReplaceCurrentWord/
     */
    ReplaceCurrentWord(sReplace: string, sPart?: "before" | "after"): boolean;

    /**
     * Replaces a drawing with a new drawing.
     *
     * @param oOldDrawing - A drawing which will be replaced.
     * @param oNewDrawing - A drawing to replace the old drawing.
     * @param bSaveOldDrawingPr - Specifies if the old drawing settings will be saved.
     * @default bSaveOldDrawingPr = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ReplaceDrawing/
     */
    ReplaceDrawing(oOldDrawing: ApiDrawing, oNewDrawing: ApiDrawing, bSaveOldDrawingPr?: boolean): boolean;

    /**
     * Searches for a scope of a document object. The search results are a collection of ApiRange objects.
     *
     * @param sText - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/Search/
     */
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Finds and replaces the text.
     *
     * @param oProperties - The properties to find and replace.
     * @param oProperties_searchString - Search string.
     * @param oProperties_replaceString - Replacement string.
     * @param oProperties_matchCase - Case sensitive or not.
     * @default oProperties_matchCase = true
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SearchAndReplace/
     */
    SearchAndReplace(oProperties: object, oProperties_searchString: string, oProperties_replaceString: string, oProperties_matchCase?: string): boolean;

    /**
     * Selects the current word if it is possible.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SelectCurrentWord/
     */
    SelectCurrentWord(): object;

    /**
     * Select the reference to this footnote/endnote. If this document content is not a footnote/endnote,
     * do nothing.
     *
     * @returns Returns true if the reference was selected successfully.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/SelectNoteReference/
     */
    SelectNoteReference(): boolean;

    /**
     * Enables or disables AI-assisted change tracking in the document.
     *
     * @param isTrack - Specifies whether the change tracking mode is set or not.
     * @param assistantName - The AI assistant name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetAssistantTrackRevisions/
     */
    SetAssistantTrackRevisions(isTrack: boolean, assistantName: string): boolean;

    /**
     * Sets the highlight to the content controls from the current document.
     *
     * @param color - The highlight color for the content controls.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetControlsHighlight/
     */
    SetControlsHighlight(color: ApiColor): boolean;

    /**
     * Specifies whether sections in this document will have different headers and footers for even and
     * odd pages (one header/footer for odd pages and another header/footer for even pages).
     *
     * @param isEvenAndOdd - If true the header/footer will be different for odd and even pages, if false they will be the
     *   same.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetEvenAndOddHdrFtr/
     */
    SetEvenAndOddHdrFtr(isEvenAndOdd: boolean): boolean;

    /**
     * Sets the data to the specified forms.
     *
     * @param arrData - An array of form data to set to the specified forms.
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetFormsData/
     */
    SetFormsData(arrData: FormData[]): boolean;

    /**
     * Sets the highlight to the forms in the document.
     *
     * @param color - The highlight color for the forms.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetFormsHighlight/
     */
    SetFormsHighlight(color: ApiColor): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Sets the change tracking mode.
     *
     * @param isTrack - Specifies if the change tracking mode is set or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetTrackRevisions/
     */
    SetTrackRevisions(isTrack: boolean): boolean;

    /**
     * Sets the watermark settings in the current document.
     *
     * @param Settings - The object which represents the watermark settings.
     * @returns The object which represents the watermark drawing if the watermark type in Settings is not
     *   "none".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/SetWatermarkSettings/
     */
    SetWatermarkSettings(Settings: ApiWatermarkSettings): ApiDrawing;

    /**
     * Shows a comment by its ID.
     *
     * @param commentId - The comment ID.
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ShowComment/
     */
    ShowComment(commentId: string | string[]): boolean;

    /**
     * Converts a document to HTML.
     *
     * @param bHtmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     *   platform does not handle Markdown-style IDs.
     * @param bBase64img - Defines if the images will be created in the base64 format.
     * @param bDemoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
     *   standard: single H1 as title, H2 as top-level heading in the text body.
     * @param bRenderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
     *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
     *   By default, the opening angle brackets will be replaced with the special characters.
     * @default bHtmlHeadings = false
     * @default bBase64img = false
     * @default bDemoteHeadings = false
     * @default bRenderHTMLTags = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ToHtml/
     */
    ToHtml(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;

    /**
     * Converts the ApiDocument object into the JSON object.
     *
     * @param bWriteDefaultTextPr - Specifies if the default text properties will be written to the JSON object or not.
     * @param bWriteDefaultParaPr - Specifies if the default paragraph properties will be written to the JSON object or not.
     * @param bWriteTheme - Specifies if the document theme will be written to the JSON object or not.
     * @param bWriteSectionPr - Specifies if the document section properties will be written to the JSON object or not.
     * @param bWriteNumberings - Specifies if the document numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the document styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ToJSON/
     */
    ToJSON(bWriteDefaultTextPr: boolean, bWriteDefaultParaPr: boolean, bWriteTheme: boolean, bWriteSectionPr: boolean, bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Converts a document to Markdown.
     *
     * @param bHtmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     *   platform does not handle Markdown-style IDs.
     * @param bBase64img - Defines if the images will be created in the base64 format.
     * @param bDemoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
     *   standard: single H1 as title, H2 as top-level heading in the text body.
     * @param bRenderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
     *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
     *   By default, the opening angle brackets will be replaced with the special characters.
     * @default bHtmlHeadings = false
     * @default bBase64img = false
     * @default bDemoteHeadings = false
     * @default bRenderHTMLTags = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/ToMarkdown/
     */
    ToMarkdown(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;

    /**
     * Updates all fields in the document.
     *
     * @param bBySelection - Specifies whether all fields will be updated within the selection.
     * @default bBySelection = false
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/UpdateAllFields/
     */
    UpdateAllFields(bBySelection?: boolean): boolean;

    /**
     * Updates all tables of contents in the current document.
     *
     * @param bOnlyPageNumbers - Specifies that only page numbers will be updated.
     * @default bOnlyPageNumbers = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/UpdateAllTOC/
     */
    UpdateAllTOC(bOnlyPageNumbers?: boolean): boolean;

    /**
     * Updates all tables of figures in the current document.
     *
     * @param bOnlyPageNumbers - Specifies that only page numbers will be updated.
     * @default bOnlyPageNumbers = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/UpdateAllTOF/
     */
    UpdateAllTOF(bOnlyPageNumbers?: boolean): boolean;
  }

  /**
   * Class representing a container for paragraphs and tables.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/
   */
  export interface ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Creates a new paragraph and appends it to the end of the document content.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddParagraph/
     */
    AddParagraph(): ApiParagraph;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Returns a collection of chart objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns a collection of drawing objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllDrawingObjects/
     */
    GetAllDrawingObjects(): Drawing[];

    /**
     * Returns a collection of image objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns a collection of OLE objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a collection of shape objects from the document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns an array of all tables from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetAllTables/
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns a type of the ApiDocumentContent class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetClassType/
     */
    GetClassType(): "documentContent";

    /**
     * Returns an array of document elements from the current ApiDocumentContent object.
     *
     * @param bGetCopies - Specifies if the copies of the document elements will be returned or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetContent/
     */
    GetContent(bGetCopies: boolean): DocumentElement[];

    /**
     * Returns the currently selected content control.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentContentControl/
     */
    GetCurrentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns the position (index) of the specified element within the current document content.
     *
     * @param element - The document element (paragraph, table or block content control) whose index will be returned.
     * @returns returns -1 if the element is not a direct child of the current document content.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElementIndex/
     */
    GetElementIndex(element: DocumentElement): number;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns a Range object that represents the part of the document contained in the document content.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Check if the current document content is an endnote.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/IsEndnote/
     */
    IsEndnote(): boolean;

    /**
     * Check if the current document content is a footnote.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/IsFootnote/
     */
    IsFootnote(): boolean;

    /**
     * Moves the cursor to the reference of this footnote/endnote in the main document. If this document
     * content is not a footnote/endnote, does nothing.
     *
     * @param isBefore - Specifies whether to place the cursor before (_true_) or after (_false_) the note reference.
     * @returns Returns _true_ if the cursor was moved to the reference successfully.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/MoveCursorToNoteReference/
     */
    MoveCursorToNoteReference(isBefore: boolean): boolean;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Select the reference to this footnote/endnote. If this document content is not a footnote/endnote,
     * do nothing.
     *
     * @returns Returns true if the reference was selected successfully.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/SelectNoteReference/
     */
    SelectNoteReference(): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Converts the ApiDocumentContent object into the JSON object.
     *
     * @param isWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param isWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocumentContent/Methods/ToJSON/
     */
    ToJSON(isWriteNumberings: boolean, isWriteStyles: boolean): object;
  }

  /**
   * Class representing a graphical object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/
   */
  export interface ApiDrawing {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetClassType/
     */
    GetClassType(): "drawing";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a drop cap. A drop cap is a large initial letter that is split off from a
   * paragraph into a
   * separate framed paragraph.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/
   */
  export interface ApiDropCap {
    /**
     * Removes the drop cap, merging the drop cap letter back into the paragraph text.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Returns the type of the ApiDropCap class.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/GetClassType/
     */
    GetClassType(): "dropCap";

    /**
     * Returns the distance between the drop cap and the paragraph text measured in twentieths of a point
     * (1/1440 of
     * an inch).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/GetDistanceFromText/
     */
    GetDistanceFromText(): twips;

    /**
     * Returns the number of lines that the drop cap occupies.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/GetLinesToDrop/
     */
    GetLinesToDrop(): number;

    /**
     * Returns the parent paragraph that holds the drop cap letter.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/GetParent/
     */
    GetParent(): ApiParagraph;

    /**
     * Returns the drop cap type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/GetPosition/
     */
    GetPosition(): "none" | "drop" | "margin";

    /**
     * Sets the distance between the drop cap and the paragraph text measured in twentieths of a point
     * (1/1440 of an
     * inch).
     *
     * @param distance - The distance between the drop cap and the paragraph text. Must be a non-negative number.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/SetDistanceFromText/
     */
    SetDistanceFromText(distance: twips): ApiDropCap;

    /**
     * Sets the font family of the drop cap letter.
     *
     * @param fontFamily - The font family name used for the drop cap letter.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/SetFontFamily/
     */
    SetFontFamily(fontFamily: string): ApiDropCap;

    /**
     * Sets the number of lines that the drop cap occupies. The drop cap letter is resized accordingly.
     *
     * @param lines - The number of lines that the drop cap occupies. Must be a number greater than 0.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/SetLinesToDrop/
     */
    SetLinesToDrop(lines: number): ApiDropCap;

    /**
     * Sets the drop cap type.
     *
     * @param position - The drop cap type: "none" removes the drop cap, "drop" places it within the text, "margin"
     *   places it in the margin.
     * @returns Returns null if the drop cap was removed with "none".
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDropCap/Methods/SetPosition/
     */
    SetPosition(position: "none" | "drop" | "margin"): ApiDropCap;
  }

  /**
   * Class representing a base class for fill.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFill/
   */
  export interface ApiFill {
    /**
     * Returns a type of the ApiFill class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFill/Methods/GetClassType/
     */
    GetClassType(): "fill";

    /**
     * Gets the fill type.
     *
     * @returns returns "solid", "gradient", "pattern", "blip", "nofill" or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFill/Methods/GetType/
     */
    GetType(): FillType;

    /**
     * Converts the ApiFill object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFill/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a document form base.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/
   */
  export interface ApiFormBase {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current value of the form field.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetValue/
     */
    GetValue(): string | boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetValue/
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing the shape geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/
   */
  export interface ApiGeometry {
    /**
     * Adds a new adjustment parameter to the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/AddAdj/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/AddConnectionPoint/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/AddGuide/
     */
    AddGuide(sName: string, sFormula: GeometryFormulaType, sX: string, sY: string, sZ: string): boolean;

    /**
     * Adds a new path to the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/AddPath/
     */
    AddPath(): ApiPath | null;

    /**
     * Returns the adjustment value by its name from the current geometry.
     *
     * @param sName - The adjustment name.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetAdjValue/
     */
    GetAdjValue(sName: string): number | null;

    /**
     * Returns a type of the ApiGeometry class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetClassType/
     */
    GetClassType(): "geometry";

    /**
     * Returns a geometry path by its index.
     *
     * @param nIndex - The path index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetPath/
     */
    GetPath(nIndex: number): ApiPath;

    /**
     * Returns the number of paths in the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetPathCount/
     */
    GetPathCount(): number;

    /**
     * Returns all paths of the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetPaths/
     */
    GetPaths(): ApiPath[];

    /**
     * Returns the name of the preset shape if the current geometry is based on a preset.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/GetPreset/
     */
    GetPreset(): ShapeType;

    /**
     * Checks whether the current geometry is custom.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/IsCustom/
     */
    IsCustom(): boolean;

    /**
     * Sets the specified adjustment parameter for the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/SetAdjValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGeometry/Methods/SetTextRect/
     */
    SetTextRect(sLeft: string, sTop: string, sRight: string, sBottom: string): boolean;
  }

  /**
   * Class representing gradient stop.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGradientStop/
   */
  export interface ApiGradientStop {
    /**
     * Returns a type of the ApiGradientStop class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGradientStop/Methods/GetClassType/
     */
    GetClassType(): "gradientStop";

    /**
     * Converts the ApiGradientStop object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGradientStop/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a group of drawings.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGroup/
   */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the ApiGroup class.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGroup/Methods/GetClassType/
     */
    GetClassType(): "group";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Ungroups the current group of drawings.
     *
     * @returns The array of the ungrouped objects, or null if the group is not in the document or cannot be
     *   ungrouped.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiGroup/Methods/Ungroup/
     */
    Ungroup(): ApiDrawing[] | null;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a Paragraph hyperlink.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/
   */
  export interface ApiHyperlink {
    /**
     * Returns a type of the ApiHyperlink class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetClassType/
     */
    GetClassType(): "hyperlink";

    /**
     * Returns the hyperlink display text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetDisplayedText/
     */
    GetDisplayedText(): string;

    /**
     * Returns the hyperlink element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns the hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetLinkedText/
     */
    GetLinkedText(): string;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current hyperlink.
     *
     * @returns returns null if the hyperlink has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the position (index) of the current hyperlink within its parent element.
     *
     * @returns returns -1 if the hyperlink has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns a Range object that represents the document part contained in the specified hyperlink.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

    /**
     * Returns the screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/GetScreenTipText/
     */
    GetScreenTipText(): string;

    /**
     * Sets the default hyperlink style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/SetDefaultStyle/
     */
    SetDefaultStyle(): boolean;

    /**
     * Sets the hyperlink display text.
     *
     * @param sDisplay - The text to display the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/SetDisplayedText/
     */
    SetDisplayedText(sDisplay: string): boolean;

    /**
     * Sets the hyperlink address.
     *
     * @param sLink - The hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/SetLink/
     */
    SetLink(sLink: string): boolean;

    /**
     * Sets the screen tip text of the hyperlink.
     *
     * @param sScreenTipText - The screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/SetScreenTipText/
     */
    SetScreenTipText(sScreenTipText: string): boolean;

    /**
     * Converts the ApiHyperlink object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiHyperlink/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;
  }

  /**
   * Class representing an image.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiImage/
   */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the ApiImage class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiImage/Methods/GetClassType/
     */
    GetClassType(): "image";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns the next inline image if exists.
     *
     * @returns returns null if image is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiImage/Methods/GetNextImage/
     */
    GetNextImage(): ApiImage | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the previous inline image if exists.
     *
     * @returns returns null if image is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiImage/Methods/GetPrevImage/
     */
    GetPrevImage(): ApiImage | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a container for the paragraph elements.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/
   */
  export interface ApiInlineLvlSdt {
    /**
     * Adds a comment to the current inline content control.
     * <note>Please note that this inline content control must be in the document.</note>
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds an element to the inline text content control.
     *
     * @param oElement - The document element which will be added at the position specified. Returns **false** if the
     *   type of *oElement* is not supported by an inline text content control.
     * @param nPos - The position of the element where it will be added to the current inline text content control.
     *   If this value is not specified, then the element will be added to the end of the current inline
     *   text content control.
     * @returns returns false if oElement unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/AddElement/
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /**
     * Adds an item to a combo box list or drop-down list.
     *
     * @param name - The name of the item to add to the list.
     * @param value - The value of the item to add to the list.
     * @param pos - The optional position at which to insert the new item in the list.
     * @returns Returns `true` if the item was successfully added, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/AddListItem/
     */
    AddListItem(name: string, value: string, pos?: number): boolean;

    /**
     * Adds text to the current content control.
     *
     * @param text - The text which will be added to the content control.
     * @returns returns null if content control can't be edited.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Creates a copy of an inline content control. Ignores comments, footnote references, complex fields.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/Copy/
     */
    Copy(): ApiInlineLvlSdt;

    /**
     * Removes a content control and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if control haven't parent paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the alias attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetAlias/
     */
    GetAlias(): string;

    /**
     * Returns the visualization type of the content control.
     *
     * @returns type - The visualization type of the content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetAppearance/
     */
    GetAppearance(): "boundingBox" | "hidden";

    /**
     * Returns the background color of the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiInlineLvlSdt class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetClassType/
     */
    GetClassType(): "inlineLvlSdt";

    /**
     * Returns the tag color of the content control.
     *
     * @returns Returns the tag color, or _null_ if no color is set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetColor/
     */
    GetColor(): ApiColor | null;

    /**
     * Retrieves the data binding of the content control.
     *
     * @returns Returns the data binding of the content control if it exists, otherwise `null`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetDataBinding/
     */
    GetDataBinding(): XmlMapping;

    /**
     * Returns the content control data for the XML mapping.
     *
     * @returns The string data representing the contents of the current content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetDataForXmlMapping/
     */
    GetDataForXmlMapping(): string;

    /**
     * Retrieves the selected date value from a date picker content control and returns it as a Date
     * object.
     *
     * Throws: Error if the content control is not a date picker.
     *
     * @returns Date object representing the selected date in the date picker control, or undefined if the form
     *   is a placeholder.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetDate/
     */
    GetDate(): undefined | Date;

    /**
     * Returns a list of values of the combo box / drop-down list content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetDropdownList/
     */
    GetDropdownList(): ApiContentControlList;

    /**
     * Returns an element of the current inline text content control using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns the position (index) of the specified element within the current inline content control.
     *
     * @param element - The inline element (run, inline content control, form, etc.) whose index will be returned.
     * @returns returns -1 if the element is not a direct child of the current inline content control.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetElementIndex/
     */
    GetElementIndex(element: ParagraphContent): number;

    /**
     * Returns a number of elements in the current inline text content control. The text content
     * control is created with one text run present in it by default, so even without any
     * element added this method will return the value of '1'.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns a unique ID for the current content control.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetId/
     */
    GetId(): string;

    /**
     * Returns an internal ID of the current content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the label attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetLabel/
     */
    GetLabel(): number;

    /**
     * Returns the lock type of the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetLock/
     */
    GetLock(): SdtLock;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current inline content control.
     *
     * @returns returns null if the content control has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns a content control that contains the current content control.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;

    /**
     * Returns a paragraph that contains the current content control.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a table that contains the current content control.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a table cell that contains the current content control.
     *
     * @returns return null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the placeholder text from the current inline content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current inline content control within its parent element.
     *
     * @returns returns -1 if the content control has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns a Range object that represents the part of the document contained in the specified content
     * control.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

    /**
     * Returns the tag attribute for the current container.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Checks if the content control is a checkbox.
     *
     * @returns Returns `true` if the content control is a checkbox, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsCheckBox/
     */
    IsCheckBox(): boolean;

    /**
     * Determines whether a checkbox content control is currently checked or unchecked.
     *
     * Throws: Error if the content control is not a checkbox.
     *
     * @returns Returns `true` if the checkbox is checked, `false` if the checkbox is unchecked.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsCheckBoxChecked/
     */
    IsCheckBoxChecked(): boolean;

    /**
     * Checks whether the content control is a combo box list.
     *
     * @returns Returns `true` if the content control is a combo box list, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsComboBox/
     */
    IsComboBox(): boolean;

    /**
     * Checks whether the content control is a datepicker.
     *
     * @returns Returns `true` if the content control is a datepicker, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsDatePicker/
     */
    IsDatePicker(): boolean;

    /**
     * Checks whether the content control is a drop-down list.
     *
     * @returns Returns `true` if the content control is a drop-down list, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsDropDownList/
     */
    IsDropDownList(): boolean;

    /**
     * Checks if the content control is a form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsForm/
     */
    IsForm(): boolean;

    /**
     * Checks whether the content control is a picture control.
     * This method verifies if the content control is specifically a picture control.
     *
     * @returns Returns `true` if the content control is a picture, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/IsPicture/
     */
    IsPicture(): boolean;

    /**
     * Places a cursor before/after the current content control.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current content
     *   control.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Adds an element to the end of inline text content control.
     *
     * @param oElement - The document element which will be added to the end of the container.
     * @returns returns false if oElement unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current inline text content control.
     *
     * @returns returns false if control has not elements.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified from the current inline text content control.
     *
     * @param nPos - The position of the element which we want to remove from the current inline text content
     *   control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Removes an item from a combo box list or drop-down list.
     *
     * @param value - The value of the item to remove from the list.
     * @returns Returns `true` if the item was successfully removed, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/RemoveListItem/
     */
    RemoveListItem(value: string): boolean;

    /**
     * Selects the current content control.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the selected item for a combo box list or drop-down list.
     *
     * @param name - The name of the item to be selected in the list.
     * @returns Returns `true` if the item was successfully selected, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SelectListItem/
     */
    SelectListItem(name: string): boolean;

    /**
     * Sets the alias attribute to the current container.
     *
     * @param sAlias - The alias which will be added to the current inline text content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetAlias/
     */
    SetAlias(sAlias: string): boolean;

    /**
     * Sets the visualization type of the content control.
     *
     * @param type - The desired visualization type.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetAppearance/
     */
    SetAppearance(type: "boundingBox" | "hidden"): void;

    /**
     * Sets the background color to the current content control.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current content control.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the checkbox value for the content control.
     * This method updates the checkbox state of the content control to either checked or unchecked.
     *
     * @param isChecked - The state to set for the checkbox. `true` for checked, `false` for unchecked.
     * @returns Returns `true` if the checkbox value was successfully set, `false` if the content control is not
     *   a checkbox.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetCheckBoxChecked/
     */
    SetCheckBoxChecked(isChecked: boolean): boolean;

    /**
     * Sets the tag color of the content control.
     *
     * @param color - The tag color. Pass _null_ to remove the color.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetColor/
     */
    SetColor(color: ApiColor | null): boolean;

    /**
     * Sets the data binding for the current content control.
     *
     * @param xmlMapping - The data binding to associate with the content control.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetDataBinding/
     */
    SetDataBinding(xmlMapping: XmlMapping | null): boolean;

    /**
     * Sets the value for the datepicker content control.
     *
     * @param date - The date value to set for the datepicker.
     * @returns Returns `true` if the date was successfully set, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetDate/
     */
    SetDate(date: Date): boolean;

    /**
     * Sets the date format for the datepicker content control.
     * This method allows setting the format in which the date should be displayed in the datepicker
     * content control.
     * The format string should be specified using common date format patterns (e.g., "mm.dd.yyyy").
     *
     * @param dateFormat - The desired date format (e.g., "mm.dd.yyyy").
     * @returns Returns `true` if the date format was successfully set, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetDateFormat/
     */
    SetDateFormat(dateFormat: string): boolean;

    /**
     * Specifies a unique ID for the current content control.
     *
     * @param id - The numerical ID which will be specified for the current content control.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetId/
     */
    SetId(id: number): boolean;

    /**
     * Adds a string label to the current inline text content control.
     *
     * @param label - The label which will be added to the current inline text content control. Can be a positive or
     *   negative integer from **-2147483647** to **2147483647**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetLabel/
     */
    SetLabel(label: number): boolean;

    /**
     * Sets the lock to the current inline text content control:
     * **"unlocked"** - content can be edited and the container can be deleted.
     * **"contentLocked"** - content cannot be edited.
     * **"sdtContentLocked"** - content cannot be edited and the container cannot be deleted.
     * **"sdtLocked"** - the container cannot be deleted.
     *
     * @param lockType - The lock type applied to the inline text content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetLock/
     */
    SetLock(lockType: "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked"): boolean;

    /**
     * Sets the content (image) for the picture content control.
     * This method updates the picture inside a content control by setting an image from a provided URL.
     * The URL should be an internet link to the image.
     *
     * @param imageUrl - The URL of the image to be used for the content control. Currently, only internet URLs are
     *   supported.
     * @returns Returns `true` if the image was successfully set, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetPicture/
     */
    SetPicture(imageUrl: string): boolean;

    /**
     * Sets the size for the picture in a content control.
     * This method adjusts the width and height of the image if the content control is a picture.
     *
     * @param width - The desired image width .
     * @param height - The desired image height.
     * @returns Returns `true` if the size was successfully set, or `false` if the content control is not a
     *   picture.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetPictureSize/
     */
    SetPictureSize(width: EMU, height: EMU): boolean;

    /**
     * Sets the placeholder text to the current inline content control.
     * *Can't be set to checkbox or radio button*
     *
     * @param sText - The text that will be set to the current inline content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Adds a string tag to the current inline text content control.
     *
     * @param sTag - The tag which will be added to the current inline text content control.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetTag/
     */
    SetTag(sTag: string): boolean;

    /**
     * Applies text settings to the content of the content control.
     *
     * @param oTextPr - The properties that will be set to the content of the content control.
     * @returns this.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): ApiInlineLvlSdt;

    /**
     * Converts the ApiInlineLvlSdt object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;

    /**
     * Updates the content control using the value from the XML mapping.
     *
     * @returns Returns `true` if the update was successful, otherwise `false`.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiInlineLvlSdt/Methods/UpdateFromXmlMapping/
     */
    UpdateFromXmlMapping(): boolean;
  }

  /**
   * Class representing a mathematical equation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiMath/
   */
  export interface ApiMath {
    /**
     * Returns a type of the ApiMath class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiMath/Methods/GetClassType/
     */
    GetClassType(): "math";

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current math element.
     *
     * @returns returns null if the math element has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiMath/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the position (index) of the current math element within its parent element.
     *
     * @returns returns -1 if the math element has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiMath/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the inner text of the current math element.
     *
     * @param format - The format the text should be returned in.
     * @default format = "unicode"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiMath/Methods/GetText/
     */
    GetText(format?: "unicode" | "latex"): string;
  }

  /**
   * Class representing the numbering properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumbering/
   */
  export interface ApiNumbering {
    /**
     * Returns a type of the ApiNumbering class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumbering/Methods/GetClassType/
     */
    GetClassType(): "numbering";

    /**
     * Returns the specified level of the current numbering.
     *
     * @param nLevel - The numbering level index. This value MUST BE from 0 to 8.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumbering/Methods/GetLevel/
     */
    GetLevel(nLevel: number): ApiNumberingLevel;

    /**
     * Converts the ApiNumbering object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumbering/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a reference to a specified level of the numbering.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/
   */
  export interface ApiNumberingLevel {
    /**
     * Returns a type of the ApiNumberingLevel class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/GetClassType/
     */
    GetClassType(): "numberingLevel";

    /**
     * Returns the level index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/GetLevelIndex/
     */
    GetLevelIndex(): number;

    /**
     * Returns the numbering definition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/GetNumbering/
     */
    GetNumbering(): ApiNumbering;

    /**
     * Returns the paragraph properties which are applied to any numbered paragraph that references the
     * given numbering definition and numbering level.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the text properties which will be applied to the text in the current numbering level itself,
     * not to the text in the subsequent paragraph.
     * <note>To change the text style of the paragraph, a style must be applied to it using the
     * {@link ApiRun#SetStyle} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Links the specified paragraph style with the current numbering level.
     *
     * @param oStyle - The paragraph style.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/LinkWithStyle/
     */
    LinkWithStyle(oStyle: ApiStyle): boolean;

    /**
     * Sets your own customized numbering type.
     *
     * @param sType - The custom numbering type used for the current numbering definition.
     * @param sTextFormatString - Any text in this parameter will be taken as literal text to be repeated in each instance of this
     *   numbering level, except for any use of the percent symbol (%) followed by a number, which will
     *   be used to indicate the one-based index of the number to be used at this level. Any number of a
     *   level higher than this level will be ignored.
     * @param sAlign - Type of justification applied to the text run in the current numbering level.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/SetCustomType/
     */
    SetCustomType(sType: "none" | "bullet" | "decimal" | "lowerRoman" | "upperRoman" | "lowerLetter" | "upperLetter" | "decimalZero", sTextFormatString: string, sAlign: "left" | "right" | "center"): boolean;

    /**
     * Specifies a one-based index which determines when a numbering level should restart to its starting
     * value. A numbering level restarts when an instance of the specified numbering level which is higher
     * (earlier than this level) is used in the given document contents. By default this value is true.
     *
     * @param isRestart - The true value means that a numbering level will be restarted to its starting value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/SetRestart/
     */
    SetRestart(isRestart: boolean): boolean;

    /**
     * Specifies the starting value for the numbering used by the parent numbering level within a given
     * numbering level definition. By default this value is 1.
     *
     * @param nStart - The starting value for the numbering used by the parent numbering level.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/SetStart/
     */
    SetStart(nStart: number): boolean;

    /**
     * Specifies the content which will be added between the given numbering level text and the text of
     * every numbered paragraph which references that numbering level. By default this value is "tab".
     *
     * @param sType - The content added between the numbering level text and the text in the numbered paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/SetSuff/
     */
    SetSuff(sType: "space" | "tab" | "none"): boolean;

    /**
     * Sets one of the existing predefined numbering templates.
     *
     * @param sType - The predefined numbering template.
     * @param sSymbol - The symbol used for the list numbering. This parameter has the meaning only if the predefined
     *   numbering template is "bullet".
     * @default sSymbol = ""
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiNumberingLevel/Methods/SetTemplateType/
     */
    SetTemplateType(sType: "none" | "bullet" | "1)" | "1." | "I." | "A." | "a)" | "a." | "i.", sSymbol?: string): boolean;
  }

  /**
   * Class representing an Ole object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/
   */
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns the application ID from the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/Methods/GetApplicationId/
     */
    GetApplicationId(): string;

    /**
     * Returns a type of the ApiOleObject class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/Methods/GetClassType/
     */
    GetClassType(): "oleObject";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the string data from the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/Methods/GetData/
     */
    GetData(): string;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the application ID to the current OLE object.
     *
     * @param sAppId - The application ID associated with the curent OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/Methods/SetApplicationId/
     */
    SetApplicationId(sAppId: string): boolean;

    /**
     * Sets the data to the current OLE object.
     *
     * @param sData - The OLE object string data.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiOleObject/Methods/SetData/
     */
    SetData(sData: string): boolean;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing the paragraph properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/
   */
  export interface ApiParaPr {
    /**
     * Returns the between border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the between border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetBetweenBorder/
     */
    GetBetweenBorder(): Border | undefined;

    /**
     * Returns the bottom border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the bottom border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetBottomBorder/
     */
    GetBottomBorder(): Border | undefined;

    /**
     * Returns a type of the ApiParaPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetClassType/
     */
    GetClassType(): "paraPr";

    /**
     * Returns the contextual spacing value of the current paragraph.
     *
     * @returns Returns _true_ if the contextual spacing is enabled, _false_ if it is disabled, or _undefined_
     *   if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetContextualSpacing/
     */
    GetContextualSpacing(): boolean | undefined;

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the keep lines value of the current paragraph.
     *
     * @returns Returns _true_ if all lines of the paragraph are kept on a single page, _false_ if they are not,
     *   or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetKeepLines/
     */
    GetKeepLines(): boolean | undefined;

    /**
     * Returns the keep next value of the current paragraph.
     *
     * @returns Returns _true_ if the paragraph is kept on the same page as the following paragraph, _false_ if
     *   it is not, or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetKeepNext/
     */
    GetKeepNext(): boolean | undefined;

    /**
     * Returns the left border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the left border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetLeftBorder/
     */
    GetLeftBorder(): Border | undefined;

    /**
     * Returns the numbering level for the current paragraph referencing the numbering definition instance
     * in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetNumPr/
     */
    GetNumPr(): ApiNumberingLevel | undefined;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the page break before value of the current paragraph.
     *
     * @returns Returns _true_ if the paragraph is rendered at the beginning of a new page, _false_ if it is
     *   not, or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetPageBreakBefore/
     */
    GetPageBreakBefore(): boolean | undefined;

    /**
     * Returns the right border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the right border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetRightBorder/
     */
    GetRightBorder(): Border | undefined;

    /**
     * Returns the shading applied to the contents of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetShd/
     */
    GetShd(): Shd | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the paragraph style method.
     *
     * @returns The style of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetStyle/
     */
    GetStyle(): ApiStyle;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetTabs/
     */
    GetTabs(): TabStop[];

    /**
     * Returns the top border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the top border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetTopBorder/
     */
    GetTopBorder(): Border | undefined;

    /**
     * Returns the widow control value of the current paragraph.
     *
     * @returns Returns _true_ if widow control is enabled, _false_ if it is disabled, or _undefined_ if the
     *   value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetWidowControl/
     */
    GetWidowControl(): boolean | undefined;

    /**
     * Specifies the border which will be displayed between each paragraph in a set of paragraphs which
     * have the same set of paragraph border settings.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset between the paragraphs measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetBetweenBorder/
     */
    SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the border which will be displayed below a set of paragraphs which have the same paragraph
     * border settings.
     * <note>The paragraphs of the same style going one by one are considered as a single block, so the
     * border is added
     * to the whole block rather than to every paragraph in this block.</note>
     *
     * @param sType - The border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset below the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetBottomBorder/
     */
    SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies that any space before or after this paragraph set using the
     * {@link ApiParaPr#SetSpacingBefore} or {@link ApiParaPr#SetSpacingAfter} spacing element, should not
     * be applied when the preceding and
     * following paragraphs are of the same paragraph style, affecting the top and bottom spacing
     * respectively.
     *
     * @param isContextualSpacing - The true value will enable the paragraph contextual spacing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetContextualSpacing/
     */
    SetContextualSpacing(isContextualSpacing: boolean): boolean;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetJc/
     */
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;

    /**
     * Specifies that when rendering the document using a page view, all lines of the current paragraph are
     * maintained on a single page whenever possible.
     *
     * @param isKeepLines - The true value enables the option to keep lines of the paragraph on a single page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetKeepLines/
     */
    SetKeepLines(isKeepLines: boolean): boolean;

    /**
     * Specifies that when rendering the document using a paginated view, the contents of the current
     * paragraph are at least
     * partly rendered on the same page as the following paragraph whenever possible.
     *
     * @param isKeepNext - The true value enables the option to keep lines of the paragraph on the same page as the
     *   following paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetKeepNext/
     */
    SetKeepNext(isKeepNext: boolean): boolean;

    /**
     * Specifies the border which will be displayed at the left side of the page around the specified
     * paragraph.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset to the left of the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetLeftBorder/
     */
    SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies that the current paragraph references a numbering definition instance in the current
     * document.
     *
     * @param oNumPr - Specifies a numbering definition.
     * @param nLvl - Specifies a numbering level reference. If the current instance of the ApiParaPr class is direct
     *   formatting of a paragraph, then this parameter MUST BE specified. Otherwise, if the current
     *   instance of the ApiParaPr class is the part of ApiStyle properties, this parameter will be
     *   ignored.
     * @default nLvl = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetNumPr/
     */
    SetNumPr(oNumPr: ApiNumbering, nLvl?: number): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetOutlineLvl/
     */
    SetOutlineLvl(lvl?: number | null): boolean;

    /**
     * Specifies that when rendering the document using a paginated view, the contents of the current
     * paragraph are rendered at
     * the beginning of a new page in the document.
     *
     * @param isPageBreakBefore - The true value enables the option to render the contents of the paragraph at the beginning of a
     *   new page in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetPageBreakBefore/
     */
    SetPageBreakBefore(isPageBreakBefore: boolean): boolean;

    /**
     * Specifies the border which will be displayed at the right side of the page around the specified
     * paragraph.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset to the right of the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetRightBorder/
     */
    SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the shading applied to the contents of the paragraph.
     *
     * @param type - The shading type which will be applied to the contents of the current paragraph.
     * @param color - The color or pattern used to fill the shading.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingAfter/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingBefore/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: twips | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * The paragraph style base method.
     * <note>This method is not used by itself, as it only forms the basis for the
     * {@link ApiParagraph#SetStyle} method which sets the selected or created style for the
     * paragraph.</note>
     *
     * @param oStyle - The style of the paragraph to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;

    /**
     * Specifies the border which will be displayed above a set of paragraphs which have the same set of
     * paragraph border settings.
     * <note>The paragraphs of the same style going one by one are considered as a single block, so the
     * border is added to the whole block rather than to every paragraph in this block.</note>
     *
     * @param sType - The border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset above the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetTopBorder/
     */
    SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies whether a single line of the current paragraph will be displayed on a separate page from
     * the remaining content at display time by moving the line onto the following page.
     *
     * @param isWidowControl - The true value means that a single line of the current paragraph will be displayed on a separate
     *   page from the remaining content at display time by moving the line onto the following page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetWidowControl/
     */
    SetWidowControl(isWidowControl: boolean): boolean;

    /**
     * Converts the ApiParaPr object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;
  }

  /**
   * Class representing a paragraph.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/
   */
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType" | "ToJSON"> {
    /**
     * Adds a bookmark cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sRefTo - The text or numeric value of a bookmark reference you want to insert.
     * @param sBookmarkName - The name of the bookmark to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (don't used with the "text" and "aboveBelow" sRefType).
     * @param sSepWith - A number separator (used only with the "fullCtxParaNum" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     * @default sSepWith = ""
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddBookmarkCrossRef/
     */
    AddBookmarkCrossRef(sRefTo: bookmarkRefTo, sBookmarkName: string, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;

    /**
     * Adds a caption paragraph after (or before) the current paragraph.
     * <note>Please note that the current paragraph must be in the document (not in the footer/header).
     * And if the current paragraph is placed in a shape, then a caption is added after (or before) the
     * parent shape.</note>
     *
     * @param sAdditional - The additional text.
     * @param sLabel - The caption label.
     * @param bExludeLabel - Specifies whether to exclude the label from the caption.
     * @param sNumberingFormat - The possible caption numbering format.
     * @param bBefore - Specifies whether to insert the caption before the current paragraph (true) or after (false)
     *   (after/before the shape if it is placed in the shape).
     * @param nHeadingLvl - The heading level (used if you want to specify the chapter number). <note>If you want to specify
     *   "Heading 1", then nHeadingLvl === 0 and etc.</note>
     * @param sCaptionSep - The caption separator (used if you want to specify the chapter number).
     * @default sLabel = "Table"
     * @default bExludeLabel = false
     * @default sNumberingFormat = "Arabic"
     * @default bBefore = false
     * @default sCaptionSep = "hyphen"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddCaption/
     */
    AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;

    /**
     * Adds a caption cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sCaption - The caption label ("Equation", "Figure", "Table", or another caption label).
     * @param sRefType - The text or numeric value of a caption reference you want to insert.
     * @param oParaTo - The caption paragraph to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (used only with the "pageNum" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddCaptionCrossRef/
     */
    AddCaptionCrossRef(sCaption: CaptionLabel | string, sRefType: captionRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;

    /**
     * Adds a column break to the current position and starts the next element from a new column.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddColumnBreak/
     */
    AddColumnBreak(): ApiRun;

    /**
     * Adds a comment to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds a drawing object (image, shape or chart) to the current paragraph.
     *
     * @param oDrawing - The object which will be added to the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddDrawing/
     */
    AddDrawing(oDrawing: ApiDrawing): ApiRun;

    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @param nPos - The position where the current element will be added. If this value is not specified, then the
     *   element will be added at the end of the current paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddElement/
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /**
     * Adds an endnote cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sRefType - The text or numeric value of an endnote reference you want to insert.
     * @param oParaTo - The first paragraph from an endnote to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (don't used with the "aboveBelow" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddEndnoteCrossRef/
     */
    AddEndnoteCrossRef(sRefType: endnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;

    /**
     * Adds a footnote cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sRefType - The text or numeric value of a footnote reference you want to insert.
     * @param oParaTo - The first paragraph from a footnote to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (don't used with the "aboveBelow" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddFootnoteCrossRef/
     */
    AddFootnoteCrossRef(sRefType: footnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;

    /**
     * Adds a heading cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sRefType - The text or numeric value of a heading reference you want to insert.
     * @param oParaTo - The heading paragraph to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (don't used with the "text" and "aboveBelow" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddHeadingCrossRef/
     */
    AddHeadingCrossRef(sRefType: headingRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;

    /**
     * Adds a hyperlink to a paragraph.
     *
     * @param sLink - The link address.
     * @param sScreenTipText - The screen tip text.
     * @param sBookmarkName - name of a bookmark
     * @returns returns null if params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddHyperlink/
     */
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;

    /**
     * Adds an inline container.
     *
     * @param oSdt - An inline container. If undefined or null, then new class ApiInlineLvlSdt will be created and
     *   added to the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddInlineLvlSdt/
     */
    AddInlineLvlSdt(oSdt: ApiInlineLvlSdt): ApiInlineLvlSdt;

    /**
     * Adds a line break to the current position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddLineBreak/
     */
    AddLineBreak(): ApiRun;

    /**
     * Adds a numbered cross-reference to the current paragraph.
     * <note>Please note that this paragraph must be in the document.</note>
     *
     * @param sRefType - The text or numeric value of a numbered reference you want to insert.
     * @param oParaTo - The numbered paragraph to be referred to (must be in the document).
     * @param bLink - Specifies if the reference will be inserted as a hyperlink.
     * @param bAboveBelow - Specifies if the above/below words indicating the position of the reference should be included
     *   (don't used with the "text" and "aboveBelow" sRefType).
     * @param sSepWith - A number separator (used only with the "fullCtxParaNum" sRefType).
     * @default bLink = true
     * @default bAboveBelow = false
     * @default sSepWith = ""
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddNumberedCrossRef/
     */
    AddNumberedCrossRef(sRefType: numberedRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;

    /**
     * Adds a page break and starts the next element from the next page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddPageBreak/
     */
    AddPageBreak(): ApiRun;

    /**
     * Forces a page break before the paragraph.
     *
     * @returns this
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddPageBreakBefore/
     */
    AddPageBreakBefore(): ApiParagraph;

    /**
     * Inserts a number of the current document page into the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddPageNumber/
     */
    AddPageNumber(): ApiRun;

    /**
     * Inserts a number of pages in the current document into the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddPagesCount/
     */
    AddPagesCount(): ApiRun;

    /**
     * Adds a tab stop to the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddTabStop/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): ApiRun;

    /**
     * Creates a paragraph copy. Ingnore comments, footnote references, complex fields.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Copy/
     */
    Copy(): ApiParagraph;

    /**
     * Deletes the current paragraph.
     *
     * @returns returns false if paragraph haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a collection of chart objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns a collection of content control objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllContentControls/
     */
    GetAllContentControls(): ApiInlineLvlSdt[];

    /**
     * Returns a collection of drawing objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllDrawingObjects/
     */
    GetAllDrawingObjects(): Drawing[];

    /**
     * Returns a collection of image objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns a collection of OLE objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns a collection of shape objects in the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns the between border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the between border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetBetweenBorder/
     */
    GetBetweenBorder(): Border | undefined;

    /**
     * Returns the bottom border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the bottom border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetBottomBorder/
     */
    GetBottomBorder(): Border | undefined;

    /**
     * Returns a type of the ApiParagraph class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetClassType/
     */
    GetClassType(): "paragraph";

    /**
     * Returns the contextual spacing value of the current paragraph.
     *
     * @returns Returns _true_ if the contextual spacing is enabled, _false_ if it is disabled, or _undefined_
     *   if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetContextualSpacing/
     */
    GetContextualSpacing(): boolean | undefined;

    /**
     * Returns the drop cap related to the current paragraph, if any.
     *
     * @returns The drop cap, or null if the paragraph has no drop cap.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetDropCap/
     */
    GetDropCap(): ApiDropCap;

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns the position (index) of the specified element within the current paragraph.
     *
     * @param element - The inline element (run, inline content control, form, etc.) whose index will be returned.
     * @returns returns -1 if the element is not a direct child of the current paragraph.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetElementIndex/
     */
    GetElementIndex(element: ParagraphContent): number;

    /**
     * Returns a number of elements in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns all font names from all elements inside the current paragraph.
     *
     * @returns The font names used for the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns an internal ID of the current paragraph.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the keep lines value of the current paragraph.
     *
     * @returns Returns _true_ if all lines of the paragraph are kept on a single page, _false_ if they are not,
     *   or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetKeepLines/
     */
    GetKeepLines(): boolean | undefined;

    /**
     * Returns the keep next value of the current paragraph.
     *
     * @returns Returns _true_ if the paragraph is kept on the same page as the following paragraph, _false_ if
     *   it is not, or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetKeepNext/
     */
    GetKeepNext(): boolean | undefined;

    /**
     * Returns the last Run with text in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetLastRunWithText/
     */
    GetLastRunWithText(): ApiRun;

    /**
     * Returns the left border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the left border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetLeftBorder/
     */
    GetLeftBorder(): Border | undefined;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetNext/
     */
    GetNext(): ApiParagraph | null;

    /**
     * Returns the numbering level for the current paragraph referencing the numbering definition instance
     * in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetNumPr/
     */
    GetNumPr(): ApiNumberingLevel | undefined;

    /**
     * Returns the numbering definition and numbering level for the numbered list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetNumbering/
     */
    GetNumbering(): ApiNumberingLevel;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the page break before value of the current paragraph.
     *
     * @returns Returns _true_ if the paragraph is rendered at the beginning of a new page, _false_ if it is
     *   not, or _undefined_ if the value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetPageBreakBefore/
     */
    GetPageBreakBefore(): boolean | undefined;

    /**
     * Returns a unique ID for the current paragraph.
     *
     * @returns 0 if no identifier is specified for the current paragraph.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParaId/
     */
    GetParaId(): number;

    /**
     * Returns the paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the text properties of the paragraph mark which is used to mark the paragraph end. The mark
     * can also acquire
     * common text properties like bold, italic, underline, etc.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParagraphMarkTextPr/
     */
    GetParagraphMarkTextPr(): ApiTextPr;

    /**
     * Returns the document content that contains the current paragraph.
     *
     * @returns returns the main document, a document part (table cell, header/footer, footnote, etc.), or null
     *   if the paragraph has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParent/
     */
    GetParent(): ApiDocument | ApiDocumentContent | null;

    /**
     * Returns a content control that contains the current paragraph.
     *
     * @returns returns null is parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a table that contains the current paragraph.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a table cell that contains the current paragraph.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the paragraph position within its parent element.
     *
     * @returns returns -1 if the paragraph parent doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetPrevious/
     */
    GetPrevious(): ApiParagraph;

    /**
     * Returns a Range object that represents the part of the document contained in the specified
     * paragraph.
     * The paragraph must be attached to the document before calling this method.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange | null;

    /**
     * Returns the right border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the right border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetRightBorder/
     */
    GetRightBorder(): Border | undefined;

    /**
     * Returns the paragraph section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetSection/
     */
    GetSection(): ApiSection;

    /**
     * Returns the shading applied to the contents of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetShd/
     */
    GetShd(): Shd | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the paragraph style method.
     *
     * @returns The style of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetStyle/
     */
    GetStyle(): ApiStyle;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetTabs/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Returns the text properties for a paragraph end mark.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the top border of the current paragraph.
     *
     * @returns Returns the border properties object, or _undefined_ if the top border is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetTopBorder/
     */
    GetTopBorder(): Border | undefined;

    /**
     * Returns the widow control value of the current paragraph.
     *
     * @returns Returns _true_ if widow control is enabled, _false_ if it is disabled, or _undefined_ if the
     *   value is not set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/GetWidowControl/
     */
    GetWidowControl(): boolean | undefined;

    /**
     * Wraps the paragraph object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiParagraph (any value
     *   except 1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiParagraph | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the paragraph
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current paragraph (false).
     * @returns returns null if param paragraph is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;

    /**
     * Returns true if the paragraph has no content elements (only the paragraph end mark).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/IsEmpty/
     */
    IsEmpty(): boolean;

    /**
     * Returns the last element of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Last/
     */
    Last(): ParagraphContent;

    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Push/
     */
    Push(oElement: ParagraphContent): boolean;

    /**
     * Removes all the elements from the current paragraph.
     * <note>When all the elements are removed from the paragraph, a new empty run is automatically
     * created. If you want to add
     * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/RemoveAllElements/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Replaces the current paragraph with a new element.
     *
     * @param oElement - The element to replace the current paragraph with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/ReplaceByElement/
     */
    ReplaceByElement(oElement: DocumentElement): boolean;

    /**
     * Searches for a scope of a paragraph object. The search results are a collection of ApiRange objects.
     *
     * @param sText - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Search/
     */
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Selects the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/Select/
     */
    Select(): boolean;

    /**
     * Specifies the border which will be displayed between each paragraph in a set of paragraphs which
     * have the same set of paragraph border settings.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset between the paragraphs measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetBetweenBorder/
     */
    SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of this paragraph are displayed bold.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiParagraph;

    /**
     * Specifies the border which will be displayed below a set of paragraphs which have the same paragraph
     * border settings.
     * <note>The paragraphs of the same style going one by one are considered as a single block, so the
     * border is added
     * to the whole block rather than to every paragraph in this block.</note>
     *
     * @param sType - The border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset below the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetBottomBorder/
     */
    SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies that any lowercase characters in this paragraph are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current paragraph are displayed capitalized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiParagraph;

    /**
     * Sets the text color to the current paragraph.
     *
     * @param color - The text color.
     * @returns this
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiParagraph;

    /**
     * Specifies that any space before or after this paragraph set using the
     * {@link ApiParaPr#SetSpacingBefore} or {@link ApiParaPr#SetSpacingAfter} spacing element, should not
     * be applied when the preceding and
     * following paragraphs are of the same paragraph style, affecting the top and bottom spacing
     * respectively.
     *
     * @param isContextualSpacing - The true value will enable the paragraph contextual spacing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetContextualSpacing/
     */
    SetContextualSpacing(isContextualSpacing: boolean): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current paragraph are displayed double struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;

    /**
     * Creates a drop cap from the first letter of the current paragraph. A drop cap is a large initial
     * letter that
     * drops down two or more lines.
     *
     * @param position - The drop cap type: "none" removes the drop cap, "drop" places it within the text, "margin"
     *   places it in the margin.
     * @returns The created drop cap, or null if the drop cap could not be created or was removed.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetDropCap/
     */
    SetDropCap(position: "none" | "drop" | "margin"): ApiDropCap;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current paragraph.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiParagraph;

    /**
     * Sets the font size to the characters of the current paragraph.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiParagraph;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current
     * paragraph.
     *
     * @param sColor - Available highlight color.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiParagraph;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current paragraph are displayed italicized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiParagraph;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetJc/
     */
    SetJc(sJc: "left" | "right" | "both" | "center"): boolean;

    /**
     * Specifies that when rendering the document using a page view, all lines of the current paragraph are
     * maintained on a single page whenever possible.
     *
     * @param isKeepLines - The true value enables the option to keep lines of the paragraph on a single page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetKeepLines/
     */
    SetKeepLines(isKeepLines: boolean): boolean;

    /**
     * Specifies that when rendering the document using a paginated view, the contents of the current
     * paragraph are at least
     * partly rendered on the same page as the following paragraph whenever possible.
     *
     * @param isKeepNext - The true value enables the option to keep lines of the paragraph on the same page as the
     *   following paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetKeepNext/
     */
    SetKeepNext(isKeepNext: boolean): boolean;

    /**
     * Specifies the border which will be displayed at the left side of the page around the specified
     * paragraph.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset to the left of the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetLeftBorder/
     */
    SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies that the current paragraph references a numbering definition instance in the current
     * document.
     *
     * @param oNumPr - Specifies a numbering definition.
     * @param nLvl - Specifies a numbering level reference. If the current instance of the ApiParaPr class is direct
     *   formatting of a paragraph, then this parameter MUST BE specified. Otherwise, if the current
     *   instance of the ApiParaPr class is the part of ApiStyle properties, this parameter will be
     *   ignored.
     * @default nLvl = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetNumPr/
     */
    SetNumPr(oNumPr: ApiNumbering, nLvl?: number): boolean;

    /**
     * Specifies that the current paragraph references the numbering definition instance in the current
     * document.
     *
     * @param oNumberingLevel - The numbering level which will be used for assigning the numbers to the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetNumbering/
     */
    SetNumbering(oNumberingLevel: ApiNumberingLevel): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetOutlineLvl/
     */
    SetOutlineLvl(lvl?: number | null): boolean;

    /**
     * Specifies that when rendering the document using a paginated view, the contents of the current
     * paragraph are rendered at
     * the beginning of a new page in the document.
     *
     * @param isPageBreakBefore - The true value enables the option to render the contents of the paragraph at the beginning of a
     *   new page in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetPageBreakBefore/
     */
    SetPageBreakBefore(isPageBreakBefore: boolean): boolean;

    /**
     * Specifies a unique ID for the current paragraph.
     *
     * @param paraId - The numerical ID which will be specified for the current paragraph. Value MUST be greater than 0
     *   and less than 0x80000000.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetParaId/
     */
    SetParaId(paraId: number): boolean;

    /**
     * Specifies an amount by which text is raised or lowered for this paragraph in relation to the default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetPosition/
     */
    SetPosition(nPosition: hps): ApiParagraph;

    /**
     * Specifies the reading order for the current paragraph.
     * Possible values are:
     * **null** - use the standart direction parameter;
     * **"ltr"** - left-to-right text direction;
     * **"rtl"** - right-to-left text direction.
     *
     * @param readingOrder - The reading order.
     * @returns Returns the current paragraph itself (ApiParagraph).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetReadingOrder/
     */
    SetReadingOrder(readingOrder?: ReadingOrder): ApiParagraph;

    /**
     * Specifies the border which will be displayed at the right side of the page around the specified
     * paragraph.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset to the right of the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetRightBorder/
     */
    SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the specified section to the current paragraph.
     *
     * @param oSection - The section which will be set to the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetSection/
     */
    SetSection(oSection: ApiSection): boolean;

    /**
     * Specifies the shading applied to the contents of the paragraph.
     *
     * @param type - The shading type which will be applied to the contents of the current paragraph.
     * @param color - The color or pattern used to fill the shading.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetSpacing/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingAfter/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingBefore/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: twips | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed with a single horizontal line through
     * the center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current paragraph are displayed struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiParagraph;

    /**
     * The paragraph style base method.
     * <note>This method is not used by itself, as it only forms the basis for the
     * {@link ApiParagraph#SetStyle} method which sets the selected or created style for the
     * paragraph.</note>
     *
     * @param oStyle - The style of the paragraph to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;

    /**
     * Replaces the paragraph content with the specified text.
     *
     * @param text - The text to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Sets the paragraph text properties.
     *
     * @param oTextPr - The paragraph text properties.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Specifies the border which will be displayed above a set of paragraphs which have the same set of
     * paragraph border settings.
     * <note>The paragraphs of the same style going one by one are considered as a single block, so the
     * border is added to the whole block rather than to every paragraph in this block.</note>
     *
     * @param sType - The border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset above the paragraph measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetTopBorder/
     */
    SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current paragraph are displayed underlined.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiParagraph;

    /**
     * Specifies the alignment which will be applied to the contents of this paragraph in relation to the
     * default appearance of the paragraph text:
     * **"baseline"** - the characters in the current paragraph will be aligned by the default text
     * baseline.
     * **"subscript"** - the characters in the current paragraph will be aligned below the default text
     * baseline.
     * **"superscript"** - the characters in the current paragraph will be aligned above the default text
     * baseline.
     *
     * @param sType - The vertical alignment type applied to the text contents.
     * @returns returns null is sType is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiParagraph | null;

    /**
     * Specifies whether a single line of the current paragraph will be displayed on a separate page from
     * the remaining content at display time by moving the line onto the following page.
     *
     * @param isWidowControl - The true value means that a single line of the current paragraph will be displayed on a separate
     *   page from the remaining content at display time by moving the line onto the following page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParaPr/Methods/SetWidowControl/
     */
    SetWidowControl(isWidowControl: boolean): boolean;

    /**
     * Converts the ApiParagraph object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Wraps the paragraph content in a mail merge field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiParagraph/Methods/WrapInMailMergeField/
     */
    WrapInMailMergeField(): boolean;
  }

  /**
   * Class representing a path in geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/ArcTo/
     */
    ArcTo(wR: GeometryCoordinate, hR: GeometryCoordinate, stAng: GeometryCoordinate, swAng: GeometryCoordinate): void;

    /**
     * Closes the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/Close/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/CubicBezTo/
     */
    CubicBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate, x3: GeometryCoordinate, y3: GeometryCoordinate): void;

    /**
     * Returns a specific path command by its index.
     *
     * @param nIndex - The path command index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetCommand/
     */
    GetCommand(nIndex: number): ApiPathCommand | null;

    /**
     * Returns the number of commands for the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetCommandCount/
     */
    GetCommandCount(): number;

    /**
     * Returns all commands of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetCommands/
     */
    GetCommands(): ApiPathCommand[];

    /**
     * Returns the fill type of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetFill/
     */
    GetFill(): PathFillType;

    /**
     * Returns the height of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns true if the current path is stroked, otherwise false.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetStroke/
     */
    GetStroke(): boolean;

    /**
     * Returns the width of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Draws a line from the current point to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/LineTo/
     */
    LineTo(x: GeometryCoordinate, y: GeometryCoordinate): void;

    /**
     * Moves the current path to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/MoveTo/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/QuadBezTo/
     */
    QuadBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate): void;

    /**
     * Sets the fill type to the current path.
     *
     * @param sFill - The path fill type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/SetFill/
     */
    SetFill(sFill: PathFillType): void;

    /**
     * Sets the height to the current path.
     *
     * @param nHeight - The path height in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/SetHeight/
     */
    SetHeight(nHeight: number): void;

    /**
     * Sets whether the current path is stroked.
     *
     * @param bStroke - Specifies if the path is stroked (true) or not (false).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/SetStroke/
     */
    SetStroke(bStroke: boolean): void;

    /**
     * Sets the width to the current path.
     *
     * @param nWidth - The path width in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPath/Methods/SetWidth/
     */
    SetWidth(nWidth: number): void;
  }

  /**
   * Class representing a path command.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/
   */
  export interface ApiPathCommand {
    /**
     * Returns the height radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetHR/
     */
    GetHR(): string | null;

    /**
     * Returns the start angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetStartAngle/
     */
    GetStartAngle(): string | null;

    /**
     * Returns the sweep angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetSweepAngle/
     */
    GetSweepAngle(): string | null;

    /**
     * Returns the type of the current path command.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetType/
     */
    GetType(): PathCommandType;

    /**
     * Returns the width radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetWR/
     */
    GetWR(): string | null;

    /**
     * Returns the X coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetX/
     */
    GetX(): string | null;

    /**
     * Returns the X coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetX0/
     */
    GetX0(): string | null;

    /**
     * Returns the X coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetX1/
     */
    GetX1(): string | null;

    /**
     * Returns the X coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetX2/
     */
    GetX2(): string | null;

    /**
     * Returns the Y coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetY/
     */
    GetY(): string | null;

    /**
     * Returns the Y coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetY0/
     */
    GetY0(): string | null;

    /**
     * Returns the Y coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetY1/
     */
    GetY1(): string | null;

    /**
     * Returns the Y coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPathCommand/Methods/GetY2/
     */
    GetY2(): string | null;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/
   */
  export interface ApiPictureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiPictureForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetClassType/
     */
    GetClassType(): "pictureForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an image in the base64 format from the current picture form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetImage/
     */
    GetImage(): Base64Img;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the picture position inside the current form.
     *
     * @returns Array of two numbers [shiftX, shiftY]
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetPicturePosition/
     */
    GetPicturePosition(): percentage[];

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the current scaling condition of the picture form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetScaleFlag/
     */
    GetScaleFlag(): ScaleFlag;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the picture form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the aspect ratio of the current picture form is locked or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/IsLockAspectRatio/
     */
    IsLockAspectRatio(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if the form border width is respected or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/IsRespectBorders/
     */
    IsRespectBorders(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets an image to the current picture form.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or base64 encoded images are supported).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetImage/
     */
    SetImage(imageSrc: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Locks the aspect ratio of the current picture form.
     *
     * @param isLock - Specifies if the aspect ratio of the current picture form will be locked (true) or not (false).
     * @default isLock = true
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetLockAspectRatio/
     */
    SetLockAspectRatio(isLock?: boolean): boolean;

    /**
     * Sets the picture position inside the current form:
     * **0** - the picture is placed on the left/top;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the right/bottom.
     *
     * @param nShiftX - Horizontal position measured in percent.
     * @param nShiftY - Vertical position measured in percent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetPicturePosition/
     */
    SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Respects the form border width when scaling the image.
     *
     * @param isRespect - Specifies if the form border width will be respected (true) or not (false).
     * @default isRespect = true
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetRespectBorders/
     */
    SetRespectBorders(isRespect?: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the scaling condition to the current picture form.
     *
     * @param sScaleFlag - Picture scaling condition: "always", "never", "tooBig" or "tooSmall".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetScaleFlag/
     */
    SetScaleFlag(sScaleFlag: ScaleFlag): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the picture form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a Preset Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPresetColor/
   */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiPresetColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPresetColor/Methods/GetClassType/
     */
    GetClassType(): "presetColor";

    /**
     * Returns a color value in RGB format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/GetRGB/
     */
    GetRGB(): number;

    /**
     * Converts the ApiPresetColor object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPresetColor/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing an RGB Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRGBColor/
   */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiRGBColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRGBColor/Methods/GetClassType/
     */
    GetClassType(): "rgbColor";

    /**
     * Returns a color value in RGB format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/GetRGB/
     */
    GetRGB(): number;

    /**
     * Converts the ApiRGBColor object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRGBColor/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/
   */
  export interface ApiRange {
    /**
     * Adds a bookmark to the specified range.
     *
     * @param sName - The bookmark name.
     * @returns returns false if range is empty.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddBookmark/
     */
    AddBookmark(sName: string): boolean;

    /**
     * Adds a comment to the current range.
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds a field to the specified range by the field instruction code.
     * <note> This method removes text within a range. </note>
     *
     * @param sCode - The field instruction code.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddField/
     */
    AddField(sCode: string): boolean;

    /**
     * Adds a hyperlink to the specified range.
     *
     * @param sLink - The link address.
     * @param sScreenTipText - The screen tip text.
     * @param sBookmarkName - name of a bookmark
     * @returns returns null if range contains more than one paragraph or sLink is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddHyperlink/
     */
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;

    /**
     * Adds a text to the specified position.
     *
     * @param text - The text that will be added.
     * @param position - The position where the text will be added ("before" or "after" the range specified).
     * @default position = "after"
     * @returns returns true if the text was successfully added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddText/
     */
    AddText(text: string, position?: "after" | "before"): boolean;

    /**
     * Deletes all the contents from the current range.
     *
     * @returns returns false if range is empty.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a new range that goes beyond the specified range in any direction and spans a different
     * range. The current range has not changed.
     *
     * @param oRange - The range that will be expanded.
     * @returns returns null if the specified range can't be expanded.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/ExpandTo/
     */
    ExpandTo(oRange: ApiRange): ApiRange | null;

    /**
     * Returns a collection of paragraphs that represents all the paragraphs in the specified range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a type of the ApiRange class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetClassType/
     */
    GetClassType(): "range";

    /**
     * Returns the end page number of the current range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetEndPage/
     */
    GetEndPage(): number;

    /**
     * Returns the end position of the current range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetEndPos/
     */
    GetEndPos(): number;

    /**
     * Returns a paragraph from all the paragraphs that are in the range.
     *
     * @param nPos - The paragraph position in the range.
     * @returns returns null if position is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetParagraph/
     */
    GetParagraph(nPos: number): ApiParagraph | null;

    /**
     * Returns a Range object that represents the document part contained in the specified range.
     *
     * @param Start - Start position index in the current range.
     * @param End - End position index in the current range (if <= 0, then the range is taken to the end).
     * @default Start = 0
     * @default End = -1
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetRange/
     */
    GetRange(Start?: number, End?: number): ApiRange;

    /**
     * Returns the start page number of the current range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetStartPage/
     */
    GetStartPage(): number;

    /**
     * Returns the start position of the current range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetStartPos/
     */
    GetStartPos(): number;

    /**
     * Returns a text from the specified range.
     *
     * @param options - Options for formatting the returned text.
     * @param options_Numbering - Defines if the resulting string will include numbering or not.
     * @param options_Math - Defines if the resulting string will include mathematical expressions or not.
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r".
     * @param options_TableCellSeparator - Defines how the table cell separator will be specified in the resulting string. Any symbol can
     *   be used. The default separator is "\t".
     * @param options_TableRowSeparator - Defines how the table row separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_ParaSeparator - Defines how the paragraph separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r\n".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string (does not apply to numbering). Any
     *   symbol can be used. The default symbol is "\t".
     * @default options_Numbering = true
     * @default options_Math = true
     * @default options_NewLineSeparator = '\r'
     * @default options_TableCellSeparator = '\t'
     * @default options_TableRowSeparator = '\r\n'
     * @default options_ParaSeparator = '\r\n'
     * @default options_TabSymbol = '\t'
     * @returns Returns an empty string if range is empty.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Returns the merged text properties of the entire range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns a new range as the intersection of the current range with another range. The current range
     * has not changed.
     *
     * @param oRange - The range that will be intersected with the current range.
     * @returns returns null if can't intersect.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/IntersectWith/
     */
    IntersectWith(oRange: ApiRange): ApiRange | null;

    /**
     * Moves a cursor to a specified position of the current range object.
     * If there is any selection in the document, it will be removed.
     *
     * @param nPos - The desired cursor position.
     * @default nPos = 0
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/MoveCursorToPos/
     */
    MoveCursorToPos(nPos?: number): boolean;

    /**
     * Sets the selection to the specified range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies if the Range contents are displayed bold or not.
     * @returns returns null if can't apply bold.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiRange | null;

    /**
     * Specifies that any lowercase characters in the current text Range are formatted for display only as
     * their capital letter character equivalents.
     *
     * @param isCaps - Specifies if the Range contents are displayed capitalized or not.
     * @returns returns null if can't apply caps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiRange | null;

    /**
     * Sets the text color to the current text Range.
     *
     * @param color - The text color.
     * @returns returns null if can't apply color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiRange | null;

    /**
     * Specifies that the contents of the current Range are displayed with two horizontal lines through
     * each character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies if the contents of the current Range are displayed double struck through or not.
     * @returns returns null if can't apply double strikeout.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiRange | null;

    /**
     * Sets the end position of the current range object.
     *
     * @param nPos - End position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetEndPos/
     */
    SetEndPos(nPos: number): boolean;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text Range.
     * @returns returns null if can't set font family.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiRange | null;

    /**
     * Sets the font size to the characters of the current text Range.
     *
     * @param FontSize - The text size value measured in half-points (1/144 of an inch).
     * @returns returns null if can't set font size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetFontSize/
     */
    SetFontSize(FontSize: hps): ApiRange | null;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current
     * Range.
     *
     * @param sColor - Available highlight color.
     * @returns returns null if can't apply highlight.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiRange | null;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies if the contents of the current Range are displayed italicized or not.
     * @returns returns null if can't apply italic.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiRange | null;

    /**
     * Specifies the amount by which text is raised or lowered for the current Range in relation to the
     * default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @returns returns null if can't set position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetPosition/
     */
    SetPosition(nPosition: hps): ApiRange | null;

    /**
     * Specifies the shading applied to the contents of the current text Range.
     *
     * @param type - The shading type applied to the contents of the current text Range.
     * @param color - The shading color.
     * @returns returns null if can't apply shadow.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): ApiRange | null;

    /**
     * Specifies that all the lowercase letter characters in the current text Range are formatted for
     * display only as their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current Range are displayed capitalized two points smaller or
     *   not.
     * @returns returns null if can't apply small caps.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiRange | null;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns returns null if can't apply spacing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiRange | null;

    /**
     * Sets the start position of the current range object.
     *
     * @param nPos - Start position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetStartPos/
     */
    SetStartPos(nPos: number): boolean;

    /**
     * Specifies that the contents of the current Range are displayed with a single horizontal line through
     * the range center.
     *
     * @param isStrikeout - Specifies if the contents of the current Range are displayed struck through or not.
     * @returns returns null if can't apply strikeout.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiRange | null;

    /**
     * Sets the style to the current Range.
     *
     * @param oStyle - The style which must be applied to the text character.
     * @returns returns null if can't set style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): ApiRange | null;

    /**
     * Sets the text properties to the current Range.
     *
     * @param oTextPr - The text properties that will be applied to the current range.
     * @returns returns null if can't set text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): ApiRange | null;

    /**
     * Specifies that the contents of the current Range are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies if the contents of the current Range are displayed underlined or not.
     * @returns returns null if can't apply underline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiRange | null;

    /**
     * Specifies the alignment which will be applied to the Range contents in relation to the default
     * appearance of the Range text:
     * **"baseline"** - the characters in the current text Range will be aligned by the default text
     * baseline.
     * **"subscript"** - the characters in the current text Range will be aligned below the default text
     * baseline.
     * **"superscript"** - the characters in the current text Range will be aligned above the default text
     * baseline.
     *
     * @param sType - The vertical alignment type applied to the text contents.
     * @returns returns null if can't apply align.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiRange | null;

    /**
     * Converts the ApiRange object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /** @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/ */
  export interface ApiRangeTextPr extends ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the RGB color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetColor/
     */
    GetColor(): ApiColor;

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the language from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Gets the text position from the current text properties measured in half-points (1/144 of an inch).
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetPosition/
     */
    GetPosition(): hps;

    /**
     * Gets the text shading from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetShd/
     */
    GetShd(): Shd | undefined;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the style of the current text properties.
     *
     * @returns The used style.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStyle/
     */
    GetStyle(): ApiStyle;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Gets the vertical alignment type from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetVertAlign/
     */
    GetVertAlign(): string;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param color - The text color.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Specifies the languages which will be used to check spelling and grammar (if requested) when
     * processing
     * the contents of the text run.
     *
     * @param sLangId - The possible value for this parameter is a language identifier as defined by RFC 4646/BCP 47.
     *   Example: "en-CA".
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies an amount by which text is raised or lowered for this run in relation to the default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetPosition/
     */
    SetPosition(nPosition: hps): ApiTextPr;

    /**
     * Specifies the shading applied to the contents of the current text run.
     *
     * @param type - The shading type applied to the contents of the current text run.
     * @param color - The color or pattern used to fill the shading.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * The text style base method.
     * <note>This method is not used by itself, as it only forms the basis for the {@link ApiRun#SetStyle}
     * method which sets
     * the selected or created style to the text.</note>
     *
     * @param oStyle - The style which must be applied to the text character.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetTextFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;

    /**
     * Converts the ApiTextPr object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;
  }

  /**
   * Class representing a small text block called 'run'.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/
   */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType"> {
    /**
     * Adds a column break to the current run position and starts the next element from a new column.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddColumnBreak/
     */
    AddColumnBreak(): boolean;

    /**
     * Adds a comment to the current run.
     * <note>Please note that this run must be in the document.</note>
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds a drawing object (image, shape or chart) to the current text run.
     *
     * @param oDrawing - The object which will be added to the current run.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddDrawing/
     */
    AddDrawing(oDrawing: ApiDrawing): boolean;

    /**
     * Adds a hyperlink to the current run.
     *
     * @param sLink - The link address.
     * @param sScreenTipText - The screen tip text.
     * @param sBookmarkName - name of a bookmark
     * @returns returns false if params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddHyperlink/
     */
    AddHyperlink(sLink: string, sScreenTipText: string, sBookmarkName: string): ApiHyperlink;

    /**
     * Adds a line break to the current run position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddLineBreak/
     */
    AddLineBreak(): boolean;

    /**
     * Adds a page break and starts the next element from a new page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddPageBreak/
     */
    AddPageBreak(): boolean;

    /**
     * Adds a tab stop to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddTabStop/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): boolean;

    /**
     * Clears the content from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Creates a copy of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/Copy/
     */
    Copy(): ApiRun;

    /**
     * Deletes the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiRun class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetClassType/
     */
    GetClassType(): "run";

    /**
     * Gets the RGB color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetColor/
     */
    GetColor(): ApiColor;

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Returns all font names from all elements inside the current run.
     *
     * @returns The font names used for the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the language from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current run.
     *
     * @returns returns null if the run has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns a content control that contains the current run.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;

    /**
     * Returns a parent paragraph of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph;

    /**
     * Returns a table that contains the current run.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a table cell that contains the current run.
     *
     * @returns returns null is parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the position (index) of the current run within its parent element.
     *
     * @returns returns -1 if the run has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Gets the text position from the current text properties measured in half-points (1/144 of an inch).
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetPosition/
     */
    GetPosition(): hps;

    /**
     * Returns a Range object that represents the part of the document contained in the specified run.
     * The run must be attached to the document before calling this method.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

    /**
     * Gets the text shading from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetShd/
     */
    GetShd(): Shd | undefined;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the style of the current text properties.
     *
     * @returns The used style.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStyle/
     */
    GetStyle(): ApiStyle;

    /**
     * Returns a text from the text run.
     *
     * @param options - Options for formatting the returned text.
     * @param options_NewLineSeparator - Defines how the line separator will be specified in the resulting string. Any symbol can be
     *   used. The default separator is "\r".
     * @param options_TabSymbol - Defines how the tab will be specified in the resulting string. Any symbol can be used. The
     *   default symbol is "\t".
     * @default options_NewLineSeparator = '\r'
     * @default options_TabSymbol = '\t'
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetText/
     */
    GetText(options?: object, options_NewLineSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Returns the text properties of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Gets the vertical alignment type from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetVertAlign/
     */
    GetVertAlign(): string;

    /**
     * Moves a cursor to a specified position of the current text run.
     * If the current run is not assigned to any document part, then **false** is returned. Otherwise, this
     * method returns **true**.
     * If there is any selection in the document, it will be removed.
     *
     * @param nPos - Desired cursor position.
     * @default nPos = 0
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/MoveCursorToPos/
     */
    MoveCursorToPos(nPos?: number): boolean;

    /**
     * Removes all the elements from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Selects the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param color - The text color.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Specifies the languages which will be used to check spelling and grammar (if requested) when
     * processing
     * the contents of the text run.
     *
     * @param sLangId - The possible value for this parameter is a language identifier as defined by RFC 4646/BCP 47.
     *   Example: "en-CA".
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies an amount by which text is raised or lowered for this run in relation to the default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetPosition/
     */
    SetPosition(nPosition: hps): ApiTextPr;

    /**
     * Specifies the shading applied to the contents of the current text run.
     *
     * @param type - The shading type applied to the contents of the current text run.
     * @param color - The color or pattern used to fill the shading.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * The text style base method.
     * <note>This method is not used by itself, as it only forms the basis for the {@link ApiRun#SetStyle}
     * method which sets
     * the selected or created style to the text.</note>
     *
     * @param oStyle - The style which must be applied to the text character.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param oTextPr - The text properties that will be set to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/SetTextPr/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;

    /**
     * Converts the ApiRun object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;

    /**
     * Wraps a run in a mail merge field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRun/Methods/WrapInMailMergeField/
     */
    WrapInMailMergeField(): boolean;
  }

  /**
   * Class representing a Scheme Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSchemeColor/
   */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiSchemeColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSchemeColor/Methods/GetClassType/
     */
    GetClassType(): "schemeColor";

    /**
     * Returns a color value in RGB format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/GetRGB/
     */
    GetRGB(): number;

    /**
     * Converts the ApiSchemeColor object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSchemeColor/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a document section.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/
   */
  export interface ApiSection {
    /**
     * Returns a type of the ApiSection class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetClassType/
     */
    GetClassType(): "section";

    /**
     * Returns number of columns in this section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetColumnsCount/
     */
    GetColumnsCount(): number;

    /**
     * Returns an array of distance values between the columns measured in twentieths of a point (1/1440 of
     * an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetColumnsSpaces/
     */
    GetColumnsSpaces(): twips[];

    /**
     * Returns an array of column width values measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetColumnsWidths/
     */
    GetColumnsWidths(): twips[];

    /**
     * Returns the content for the specified footer type.
     *
     * @param sType - Footer type to get the content from.
     * @param isCreate - Specifies whether to create a new footer or not with the specified footer type in case no footer
     *   with such a type could be found in the current section.
     * @default isCreate = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetFooter/
     */
    GetFooter(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;

    /**
     * Returns the distance from the bottom edge of the page to the bottom edge of the footer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetFooterDistance/
     */
    GetFooterDistance(): twips;

    /**
     * Returns the content for the specified header type.
     *
     * @param sType - Header type to get the content from.
     * @param isCreate - Specifies whether to create a new header or not with the specified header type in case no header
     *   with such a type could be found in the current section.
     * @default isCreate = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetHeader/
     */
    GetHeader(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;

    /**
     * Returns the distance from the top edge of the page to the top edge of the header.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetHeaderDistance/
     */
    GetHeaderDistance(): twips;

    /**
     * Returns the next section if exists.
     *
     * @returns returns null if section is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetNext/
     */
    GetNext(): ApiSection | null;

    /**
     * Gets page height for current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageHeight/
     */
    GetPageHeight(): twips;

    /**
     * Returns the bottom page margin for all pages in the current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageMarginBottom/
     */
    GetPageMarginBottom(): twips;

    /**
     * Returns the left page margin for all pages in the current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageMarginLeft/
     */
    GetPageMarginLeft(): twips;

    /**
     * Returns the right page margin for all pages in the current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageMarginRight/
     */
    GetPageMarginRight(): twips;

    /**
     * Returns the top page margin for all pages in the current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageMarginTop/
     */
    GetPageMarginTop(): twips;

    /**
     * Gets page width for current section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPageWidth/
     */
    GetPageWidth(): twips;

    /**
     * Returns the previous section if exists.
     *
     * @returns returns null if section is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetPrevious/
     */
    GetPrevious(): ApiSection | null;

    /**
     * Returns the start page number of the specified section.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetStartPageNumber/
     */
    GetStartPageNumber(): number;

    /**
     * Returns the section break type.
     *
     * @returns The section break type.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/GetType/
     */
    GetType(): SectionBreakType;

    /**
     * Removes the footer of the specified type from the current section. After removal, the footer will be
     * inherited from
     * the previous section, or if this is the first section in the document, no footer of the specified
     * type will be presented.
     *
     * @param sType - Footer type to be removed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/RemoveFooter/
     */
    RemoveFooter(sType: HdrFtrType): boolean;

    /**
     * Removes the header of the specified type from the current section. After removal, the header will be
     * inherited from
     * the previous section, or if this is the first section in the document, no header of the specified
     * type will be presented.
     *
     * @param sType - Header type to be removed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/RemoveHeader/
     */
    RemoveHeader(sType: HdrFtrType): boolean;

    /**
     * Specifies that all the text columns in the current section are of equal width.
     *
     * @param nCount - Number of columns.
     * @param nSpace - Distance between columns measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetEqualColumns/
     */
    SetEqualColumns(nCount: number, nSpace: twips): boolean;

    /**
     * Specifies the distance from the bottom edge of the page to the bottom edge of the footer.
     *
     * @param nDistance - The distance from the bottom edge of the page to the bottom edge of the footer measured in
     *   twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetFooterDistance/
     */
    SetFooterDistance(nDistance: twips): boolean;

    /**
     * Specifies the distance from the top edge of the page to the top edge of the header.
     *
     * @param nDistance - The distance from the top edge of the page to the top edge of the header measured in twentieths
     *   of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetHeaderDistance/
     */
    SetHeaderDistance(nDistance: twips): boolean;

    /**
     * Specifies the page margins for all the pages in this section. Alias for
     * {@link ApiSection#SetPageMargins}.
     *
     * @param left - The left margin width measured in twentieths of a point (1/1440 of an inch).
     * @param top - The top margin height measured in twentieths of a point (1/1440 of an inch).
     * @param right - The right margin width measured in twentieths of a point (1/1440 of an inch).
     * @param bottom - The bottom margin height measured in twentieths of a point (1/1440 of an inch).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetMargins/
     */
    SetMargins(left: twips, top: twips, right: twips, bottom: twips): boolean;

    /**
     * Specifies that all the columns in the current section have the different widths. Number of columns
     * is equal
     * to the length of the aWidth array. The length of the aSpaces array MUST BE equal to (aWidth.length -
     * 1).
     *
     * @param aWidths - An array of column width values measured in twentieths of a point (1/1440 of an inch).
     * @param aSpaces - An array of distance values between the columns measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetNotEqualColumns/
     */
    SetNotEqualColumns(aWidths: twips[], aSpaces: twips[]): boolean;

    /**
     * Specifies the page margins for all the pages in this section.
     *
     * @param left - The left margin width measured in twentieths of a point (1/1440 of an inch).
     * @param top - The top margin height measured in twentieths of a point (1/1440 of an inch).
     * @param right - The right margin width measured in twentieths of a point (1/1440 of an inch).
     * @param bottom - The bottom margin height measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetPageMargins/
     */
    SetPageMargins(left: twips, top: twips, right: twips, bottom: twips): boolean;

    /**
     * Specifies the properties (size and orientation) for all the pages in the current section.
     *
     * @param nWidth - The page width measured in twentieths of a point (1/1440 of an inch).
     * @param nHeight - The page height measured in twentieths of a point (1/1440 of an inch).
     * @param isPortrait - Specifies the orientation of all the pages in this section (if set to true, then the portrait
     *   orientation is chosen).
     * @default isPortrait = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetPageSize/
     */
    SetPageSize(nWidth: twips, nHeight: twips, isPortrait?: boolean): boolean;

    /**
     * Sets the start page number for the specified section.
     *
     * @param nStartNumber - The start page number.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetStartPageNumber/
     */
    SetStartPageNumber(nStartNumber: number): boolean;

    /**
     * Specifies whether the current section in this document has the different header and footer for the
     * section first page.
     *
     * @param isTitlePage - If true, the first page of the section will have header and footer that will differ from the
     *   other pages of the same section.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetTitlePage/
     */
    SetTitlePage(isTitlePage: boolean): boolean;

    /**
     * Specifies a type of the current section. The section type defines how the contents of the current
     * section are placed relative to the previous section.
     *
     * @param sType - The section break type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/SetType/
     */
    SetType(sType: SectionBreakType): boolean;

    /**
     * Converts the ApiSection object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSection/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /**
   * Class representing a shadow.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShadow/
   */
  export interface ApiShadow {
    /**
     * Returns a type of the ApiShadow class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShadow/Methods/GetClassType/
     */
    GetClassType(): "shadow";

    /**
     * Returns the settings of the current shadow.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShadow/Methods/GetSettings/
     */
    GetSettings(): ShadowSettings;
  }

  /**
   * Class representing a shape.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/
   */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the ApiShape class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetClassType/
     */
    GetClassType(): "shape";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetDocContent/
     */
    GetDocContent(): ApiDocumentContent;

    /**
     * Gets the fill properties from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the geometry object from the current shape.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetGeometry/
     */
    GetGeometry(): ApiGeometry;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns the next inline shape if exists.
     *
     * @returns returns null if shape is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetNextShape/
     */
    GetNextShape(): ApiShape | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the previous inline shape if exists.
     *
     * @returns returns null is shape is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetPrevShape/
     */
    GetPrevShape(): ApiShape | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Gets the vertical alignment from the shape content where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/GetVerticalTextAlign/
     */
    GetVerticalTextAlign(): VerticalTextAlign;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the fill properties to the current shape.
     *
     * @param oFill - The fill type used to fill the shape.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/SetFill/
     */
    SetFill(oFill: ApiFill): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Sets a custom geometry for the current shape.
     *
     * @param oGeometry - The custom geometry.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/SetGeometry/
     */
    SetGeometry(oGeometry: ApiGeometry): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets the outline properties to the current shape.
     *
     * @param oStroke - The stroke used to create the shape outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/SetLine/
     */
    SetLine(oStroke: ApiStroke): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the text paddings to the current shape.
     *
     * @param nLeft - Left padding.
     * @param nTop - Top padding.
     * @param nRight - Right padding.
     * @param nBottom - Bottom padding.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/SetPaddings/
     */
    SetPaddings(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the vertical alignment to the shape content where a paragraph or text runs can be inserted.
     *
     * @param verticalAlign - The type of the vertical alignment for the shape inner contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiShape/Methods/SetVerticalTextAlign/
     */
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSignatureForm/
   */
  export interface ApiSignatureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiSignatureForm class.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSignatureForm/Methods/GetClassType/
     */
    GetClassType(): "signatureForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the signature form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSignatureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the signature form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSignatureForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a smart art.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSmartArt/
   */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Inserts a break at the specified location in the main document.
     *
     * @param breakType - The break type: page break (0) or line break (1).
     * @param position - The position where the page or line break will be inserted ("before" or "after" the current
     *   drawing).
     * @returns returns false if drawing object haven't parent run or params are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/AddBreak/
     */
    AddBreak(breakType: number, position: string): boolean;

    /**
     * Copies the current graphic object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing | null;

    /**
     * Deletes the current graphic object.
     *
     * @returns returns false if drawing object haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Fill/
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns whether the drawing object is allowed to overlap other drawing objects.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetAllowOverlap/
     */
    GetAllowOverlap(): boolean;

    /**
     * Returns a type of the ApiSmartArt class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiSmartArt/Methods/GetClassType/
     */
    GetClassType(): "smartArt";

    /**
     * Returns the drawing inner contents where a paragraph or text runs can be inserted if it exists.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @returns Name of drawing.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the next inline drawing object if exists.
     *
     * @returns returns null if drawing object is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetNextDrawing/
     */
    GetNextDrawing(): ApiDrawing | null;

    /**
     * Returns a parent content control that contains the graphic object.
     *
     * @returns returns null if parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a parent paragraph that contains the graphic object.
     *
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentParagraph/
     */
    GetParentParagraph(): ApiParagraph | null;

    /**
     * Returns a parent table that contains the graphic object.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a parent table cell that contains the graphic object.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the previous inline drawing object if exists.
     *
     * @returns returns null if drawing object is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetPrevDrawing/
     */
    GetPrevDrawing(): ApiDrawing | null;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Wraps the graphic object with a rich text content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiDrawing (any value except
     *   1) object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;

    /**
     * Inserts a paragraph at the specified position.
     *
     * @param paragraph - Text or paragraph.
     * @param sPosition - The position where the text or paragraph will be inserted ("before" or "after" the drawing
     *   specified).
     * @param beRNewPara - Defines if this method returns a new paragraph (true) or the current ApiDrawing (false).
     * @returns returns null if parent paragraph doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;

    /**
     * Scales the height of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure height will be scaled.
     * @returns return false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleHeight/
     */
    ScaleHeight(coefficient: number): boolean;

    /**
     * Scales the width of the figure using the specified coefficient.
     *
     * @param coefficient - The coefficient by which the figure width will be scaled.
     * @returns return false if param is invali.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ScaleWidth/
     */
    ScaleWidth(coefficient: number): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = true
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): boolean;

    /**
     * Sets whether the drawing object is allowed to overlap other drawing objects.
     *
     * @param bOverlap - Specifies whether this drawing object can overlap other drawing objects.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetAllowOverlap/
     */
    SetAllowOverlap(bOverlap: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Specifies the minimum distance which will be maintained between the edges of the current drawing
     * object and any
     * subsequent text.
     *
     * @param nLeft - The distance from the left side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nTop - The distance from the top side of the current object and the preceding text run measured in
     *   English measure units.
     * @param nRight - The distance from the right side of the current object and the subsequent text run measured in
     *   English measure units.
     * @param nBottom - The distance from the bottom side of the current object and the subsequent text run measured in
     *   English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDistances/
     */
    SetDistances(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the properties from another drawing to the current drawing.
     * The following properties will be copied: horizontal and vertical alignment, distance between the
     * edges of the current drawing object and any subsequent text, wrapping style, drawing name, title and
     * description.
     *
     * @param oAnotherDrawing - The drawing which properties will be set to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetDrawingPrFromDrawing/
     */
    SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Specifies how the floating object will be horizontally aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param sAlign - The alignment type which will be used for the object horizontal alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "left"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorAlign/
     */
    SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): boolean;

    /**
     * Flips the current drawing horizontally.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorFlip/
     */
    SetHorFlip(bFlip: boolean): boolean;

    /**
     * Sets the absolute measurement for the horizontal positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal
     *   alignment.
     * @param nDistance - The distance from the right side of the document element to the floating object. Use EMU for
     *   absolute distance or a number for percent (1 = 1%) when bPercent=true.
     * @param bPercent - The option defining whether the horizontal alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetHorPosition/
     */
    SetHorPosition(sRelativeFrom: RelFromH, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetLockValue/
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
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the relative height of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object height.
     * @param percent - The height of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeHeight/
     */
    SetRelativeHeight(percent: percentage): boolean;
    SetRelativeHeight(relativeFrom: SizeRelFromV, percent: percentage): boolean;

    /**
     * Sets the relative width of the object (image, shape, chart) bounding box.
     *
     * @param relativeFrom - The document element which will be taken as a countdown point for the object width.
     * @param percent - The width of the object as a percentage of the specified element.
     * @default relativeFrom = "page"
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRelativeWidth/
     */
    SetRelativeWidth(percent: percentage): boolean;
    SetRelativeWidth(relativeFrom: SizeRelFromH, percent: percentage): boolean;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets the size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Specifies how the floating object will be vertically aligned.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param sAlign - The alingment type which will be used for the object vertical alignment.
     * @default sRelativeFrom = "page"
     * @default sAlign = "top"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerAlign/
     */
    SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): boolean;

    /**
     * Sets the absolute measurement for the vertical positioning of the floating object.
     *
     * @param sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
     * @param nDistance - The distance from the bottom part of the document element to the floating object. Use EMU for
     *   absolute units or a number (1 = 1%) when bPercent=true for percent relative positioning.
     * @param bPercent - The option defining whether the vertical alignment offset is specified in percent.
     * @default bPercent = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVerPosition/
     */
    SetVerPosition(sRelativeFrom: RelFromV, nDistance: EMU | number, bPercent?: boolean): boolean;

    /**
     * Flips the current drawing vertically.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetVertFlip/
     */
    SetVertFlip(bFlip: boolean): boolean;

    /**
     * Sets the wrapping type of the current object (image, shape, chart). One of the following wrapping
     * style types can be set:
     * **"inline"** - the object is considered to be a part of the text, like a character, so when the text
     * moves, the object moves as well. In this case the positioning options are inaccessible.
     * If one of the following styles is selected, the object can be moved independently of the text and
     * positioned on the page exactly:
     * **"square"** - the text wraps the rectangular box that bounds the object.
     * **"tight"** - the text wraps the actual object edges.
     * **"through"** - the text wraps around the object edges and fills in the open white space within the
     * object.
     * **"topAndBottom"** - the text is only above and below the object.
     * **"behind"** - the text overlaps the object.
     * **"inFront"** - the object overlaps the text.
     *
     * @param sType - The wrapping style type available for the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDrawing/Methods/Unselect/
     */
    Unselect(): boolean;
  }

  /**
   * Class representing a stroke.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/
   */
  export interface ApiStroke {
    /**
     * Returns the beginning arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetBeginArrow/
     */
    GetBeginArrow(): object | null;

    /**
     * Returns a type of the ApiStroke class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetClassType/
     */
    GetClassType(): "stroke";

    /**
     * Gets the dash type of the stroke.
     *
     * @returns returns dash type ("solid", "dash", etc.) or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetDashType/
     */
    GetDashType(): DashType | null;

    /**
     * Returns the ending arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetEndArrow/
     */
    GetEndArrow(): object | null;

    /**
     * Gets the fill (color) of the stroke.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Gets the width of the stroke in English Metric Units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/GetWidth/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/SetBeginArrow/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/SetEndArrow/
     */
    SetEndArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;

    /**
     * Converts the ApiStroke object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStroke/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a style.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/
   */
  export interface ApiStyle {
    /**
     * Returns a type of the ApiStyle class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetClassType/
     */
    GetClassType(): "style";

    /**
     * Returns a set of formatting properties which will be conditionally applied to the parts of a table
     * that match the
     * requirement specified in the sType parameter.
     *
     * @param sType - The table part which the formatting properties must be applied to.
     * @default sType = "wholeTable"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetConditionalTableStyle/
     */
    GetConditionalTableStyle(sType?: TableStyleOverrideType): ApiTableStylePr;

    /**
     * Returns a name of the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the paragraph properties of the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the table cell properties of the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetTableCellPr/
     */
    GetTableCellPr(): ApiTableCellPr;

    /**
     * Returns the table properties of the current style.
     *
     * @returns If the type of this style is not a `"table"` then it will return `null`.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetTablePr/
     */
    GetTablePr(): ApiTablePr;

    /**
     * Returns the table row properties of the current style.
     *
     * @returns If the type of this style is not a `"table"` then it will return `null`.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetTableRowPr/
     */
    GetTableRowPr(): ApiTableRowPr;

    /**
     * Returns the text properties of the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns a type of the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/GetType/
     */
    GetType(): StyleType;

    /**
     * Specifies the reference to the parent style which this style inherits from in the style hierarchy.
     *
     * @param oStyle - The parent style which the style inherits properties from.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetBasedOn/
     */
    SetBasedOn(oStyle: ApiStyle): boolean;

    /**
     * Sets conditional formatting properties that are applied to table parts matching the specified table
     * style type.
     *
     * @param oTableStylePr - The conditional table style properties.
     * @returns The current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetConditionalTableStyle/
     */
    SetConditionalTableStyle(oTableStylePr: ApiTableStylePr): ApiStyle;

    /**
     * Sets a name of the current style.
     *
     * @param sStyleName - The name which will be used for the current style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetName/
     */
    SetName(sStyleName: string): boolean;

    /**
     * Sets the paragraph properties to the current style.
     *
     * @param paraPr - The paragraph properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetParaPr/
     */
    SetParaPr(paraPr: ApiParaPr): ApiStyle;

    /**
     * Sets the table cell properties to the current style.
     *
     * @param tableCellPr - The table cell properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetTableCellPr/
     */
    SetTableCellPr(tableCellPr: ApiTableCellPr): ApiStyle;

    /**
     * Sets the table properties to the current style.
     *
     * @param tablePr - The table properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetTablePr/
     */
    SetTablePr(tablePr: ApiTablePr): ApiStyle;

    /**
     * Sets the table row properties to the current style.
     *
     * @param tableRowPr - The table row properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetTableRowPr/
     */
    SetTableRowPr(tableRowPr: ApiTableRowPr): ApiStyle;

    /**
     * Sets the text properties to the current style.
     *
     * @param textPr - The text properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): ApiStyle;

    /**
     * Converts the ApiStyle object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiStyle/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean): object;
  }

  /**
   * Class representing a table.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/
   */
  export interface ApiTable extends Omit<ApiTablePr, "GetClassType" | "ToJSON"> {
    /**
     * Adds a caption paragraph after (or before) the current table.
     * <note>Please note that the current table must be in the document (not in the footer/header).
     * And if the current table is placed in a shape, then a caption is added after (or before) the parent
     * shape.</note>
     *
     * @param sAdditional - The additional text.
     * @param sLabel - The caption label.
     * @param bExludeLabel - Specifies whether to exclude the label from the caption.
     * @param sNumberingFormat - The possible caption numbering format.
     * @param bBefore - Specifies whether to insert the caption before the current table (true) or after (false)
     *   (after/before the shape if it is placed in the shape).
     * @param nHeadingLvl - The heading level (used if you want to specify the chapter number). <note>If you want to specify
     *   "Heading 1", then nHeadingLvl === 0 and etc.</note>
     * @param sCaptionSep - The caption separator (used if you want to specify the chapter number).
     * @default sLabel = "Table"
     * @default bExludeLabel = false
     * @default sNumberingFormat = "Arabic"
     * @default bBefore = false
     * @default sCaptionSep = "hyphen"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddCaption/
     */
    AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;

    /**
     * Adds a new column to the current table.
     *
     * @param oCell - The cell after which a new column will be added. If not specified, a new column will be added at
     *   the end of the table.
     * @param isBefore - Adds a new column before (false) or after (true) the specified cell. If no cell is specified,
     *   then this parameter will be ignored.
     * @default isBefore = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddColumn/
     */
    AddColumn(oCell?: ApiTableCell, isBefore?: boolean): boolean;

    /**
     * Adds the new columns to the current table.
     *
     * @param oCell - The cell after which the new columns will be added. If not specified, the new columns will be
     *   added at the end of the table.
     * @param nCount - Count of columns to be added.
     * @param isBefore - Adds the new columns before (false) or after (true) the specified cell. If no cell is specified,
     *   then this parameter will be ignored.
     * @default isBefore = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddColumns/
     */
    AddColumns(nCount: number): ApiTable;
    AddColumns(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;

    /**
     * Adds a comment to all contents of the current table.
     * <note>Please note that this table must be in the document.</note>
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name.
     * @param sUserId - The user ID of the comment author.
     * @returns Returns null if the comment was not added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;

    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the cell.
     *
     * @param oCell - The cell where the specified element will be added.
     * @param nPos - The position in the cell where the specified element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddElement/
     */
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new row to the current table.
     *
     * @param oCell - The cell after which a new row will be added. If not specified, a new row will be added at the
     *   end of the table.
     * @param isBefore - Adds a new row before (false) or after (true) the specified cell. If no cell is specified, then
     *   this parameter will be ignored.
     * @default isBefore = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddRow/
     */
    AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;

    /**
     * Adds the new rows to the current table.
     *
     * @param oCell - The cell after which the new rows will be added. If not specified, the new rows will be added at
     *   the end of the table.
     * @param nCount - Count of rows to be added.
     * @param isBefore - Adds the new rows before (false) or after (true) the specified cell. If no cell is specified,
     *   then this parameter will be ignored.
     * @default isBefore = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/AddRows/
     */
    AddRows(nCount: number): ApiTable;
    AddRows(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;

    /**
     * Clears the content from the table.
     *
     * @returns returns true.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Creates a copy of the current table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Copy/
     */
    Copy(): ApiTable;

    /**
     * Deletes the current table.
     *
     * @returns returns false if parent of table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a collection of all cells in the table.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetAllCells/
     */
    GetAllCells(): ApiTableCell[];

    /**
     * Returns a cell by its position.
     *
     * @param rowIndex - The row index in the current table.
     * @param cellIndex - The cell index in the specified row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetCell/
     */
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell;

    /**
     * Returns a type of the ApiTable class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetClassType/
     */
    GetClassType(): "table";

    /**
     * Returns the width of the specified column (by index) of the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetColumnWidth/
     */
    GetColumnWidth(columnIndex: number): EMU | null;

    /**
     * Returns an internal ID of the current table.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the document content that contains the current table.
     *
     * @returns returns the main document, a document part (table cell, header/footer, footnote, etc.), or null
     *   if the table has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetParent/
     */
    GetParent(): ApiDocument | ApiDocumentContent | null;

    /**
     * Returns a content control that contains the current table.
     *
     * @returns return null is parent content control doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetParentContentControl/
     */
    GetParentContentControl(): ApiBlockLvlSdt | null;

    /**
     * Returns a table that contains the current table.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns a table cell that contains the current table.
     *
     * @returns returns null if parent cell doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetParentTableCell/
     */
    GetParentTableCell(): ApiTableCell | null;

    /**
     * Returns the table position within its parent element.
     *
     * @returns returns -1 if the table parent doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns a Range object that represents the part of the document contained in the specified table.
     *
     * @param Start - Start position index in the current element.
     * @param End - End position index in the current element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetRange/
     */
    GetRange(Start: number, End: number): ApiRange;

    /**
     * Returns a table row by its position in the table.
     *
     * @param rowIndex - The row index within the table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetRow/
     */
    GetRow(rowIndex: number): ApiTableRow;

    /**
     * Returns a number of rows in the current table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetRowsCount/
     */
    GetRowsCount(): number;

    /**
     * Returns the selected cells of the current table.
     *
     * @returns An array of the currently selected cells (empty if there is no cell selection).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetSelectedCells/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetSelectedColumnsCells/
     */
    GetSelectedColumnsCells(): ApiTableCell[];

    /**
     * Returns all rows that contain the currently selected cells.
     * This method identifies which rows contain selected cells and returns those complete row objects.
     *
     * @returns An array of table row objects that contain at least one selected cell.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetSelectedRows/
     */
    GetSelectedRows(): ApiTableRow[];

    /**
     * Returns the table description.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/GetTableDescription/
     */
    GetTableDescription(): string;

    /**
     * Gets table look properties
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetTableLook/
     */
    GetTableLook(): TableLook;

    /**
     * Returns the table title (caption).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/GetTableTitle/
     */
    GetTableTitle(): string;

    /**
     * Returns an array of tables that represents all the tables nested within the specified table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/GetTables/
     */
    GetTables(): ApiTable[];

    /**
     * Wraps the current table object with a content control.
     *
     * @param nType - Defines if this method returns the ApiBlockLvlSdt (nType === 1) or ApiTable (any value except 1)
     *   object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/InsertInContentControl/
     */
    InsertInContentControl(nType: number): ApiTable | ApiBlockLvlSdt;

    /**
     * Merges an array of cells. If the merge is done successfully, it will return the resulting merged
     * cell, otherwise the result will be "null".
     * <note>The number of cells in any row and the number of rows in the current table may be
     * changed.</note>
     *
     * @param aCells - The array of cells to be merged.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/MergeCells/
     */
    MergeCells(aCells: ApiTableCell[]): ApiTableCell;

    /**
     * Removes a table column with a specified cell.
     *
     * @param oCell - The cell which is placed in the column that will be removed.
     * @returns result of deletion
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/RemoveColumn/
     */
    RemoveColumn(oCell: ApiTableCell): boolean;

    /**
     * Removes a table row with a specified cell.
     *
     * @param oCell - The cell which is placed in the row that will be removed.
     * @returns result of deletion
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/RemoveRow/
     */
    RemoveRow(oCell: ApiTableCell): boolean;

    /**
     * Replaces the current table with a new element.
     *
     * @param oElement - The element to replace the current table with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/ReplaceByElement/
     */
    ReplaceByElement(oElement: DocumentElement): boolean;

    /**
     * Searches for a scope of a table object. The search results are a collection of ApiRange objects.
     *
     * @param sText - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Search/
     */
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Selects the current table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Select/
     */
    Select(): boolean;

    /**
     * Selects a range of cells in the current table.
     *
     * @param startCellIndex - The start cell index within the start row.
     * @param startRowIndex - The start row index.
     * @param endCellIndex - The end cell index within the end row.
     * @param endRowIndex - The end row index.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SelectRange/
     */
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;

    /**
     * Sets the background color to all cells in the current table.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Specifies the default table cell spacing (the spacing between adjacent cells and the edges of the
     * table).
     *
     * @param nValue - Spacing value measured in twentieths of a point (1/1440 of an inch). `"Null"` means that no
     *   spacing will be applied.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetCellSpacing/
     */
    SetCellSpacing(nValue: twips): boolean;

    /**
     * Sets the width of the specified column (by index) of the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @param width - The column width measured in English measure units.
     * @returns Returns the actual column width set (in EMU), or null if the column index is invalid.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetColumnWidth/
     */
    SetColumnWidth(columnIndex: number, width: EMU): EMU | null;

    /**
     * Sets the horizontal alignment to the table.
     *
     * @param sType - Horizontal alignment type: may be "left" or "center" or "right".
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetHAlign/
     */
    SetHAlign(sType: string): boolean;

    /**
     * Sets the total height of the current table, distributing it evenly among the table rows.
     * The value is applied as a minimum height for each row, so a row can be taller if its content
     * requires more space.
     *
     * @param nValue - The table height in English measure units.
     * @returns Returns the requested height (in EMU), or null if the table has no rows.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetHeight/
     */
    SetHeight(nValue: EMU): EMU | null;

    /**
     * Specifies the alignment of the current table with respect to the text margins in the current
     * section.
     *
     * @param sJcType - The alignment type used for the current table placement.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetJc/
     */
    SetJc(sJcType: "left" | "right" | "center"): boolean;

    /**
     * Sets the table paddings.
     * If table is inline, then only left padding is applied.
     *
     * @param nLeft - Left padding.
     * @param nTop - Top padding.
     * @param nRight - Right padding.
     * @param nBottom - Bottom padding.
     * @returns returns true.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetPaddings/
     */
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;

    /**
     * Specifies the shading which is applied to the extents of the current table.
     *
     * @param sType - The shading type applied to the extents of the current table.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @param isAuto - The true value disables the SetShd method use.
     * @default isAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetShd/
     */
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;

    /**
     * Sets a style to the current table.
     *
     * @param oStyle - The style which will be applied to the current table.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): boolean;

    /**
     * Specifies a number of columns which will comprise each table column band for this table style.
     *
     * @param nCount - The number of columns measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetStyleColBandSize/
     */
    SetStyleColBandSize(nCount: number): boolean;

    /**
     * Specifies a number of rows which will comprise each table row band for this table style.
     *
     * @param nCount - The number of rows measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetStyleRowBandSize/
     */
    SetStyleRowBandSize(nCount: number): boolean;

    /**
     * Specifies a border which will be displayed on all table cell borders.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the table cells measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderAll/
     */
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the bottom of the current table.
     *
     * @param sType - The bottom border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderBottom/
     */
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the border which will be displayed on all horizontal table cell borders which are not on
     * the outmost edge
     * of the parent table (all horizontal borders which are not the topmost or bottommost borders).
     *
     * @param sType - The horizontal table cell border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the horizontal table cells of the table measured in points used to place
     *   this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderInsideH/
     */
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the border which will be displayed on all vertical table cell borders which are not on the
     * outmost edge
     * of the parent table (all vertical borders which are not the leftmost or rightmost borders).
     *
     * @param sType - The vertical table cell border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the vertical table cells of the table measured in points used to place
     *   this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderInsideV/
     */
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the left of the current table.
     *
     * @param sType - The left border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderLeft/
     */
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the right of the current table.
     *
     * @param sType - The right border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderRight/
     */
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table.
     *
     * @param sType - The top border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderTop/
     */
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginBottom/
     */
    SetTableCellMarginBottom(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and the
     * left
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginLeft/
     */
    SetTableCellMarginLeft(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the right
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginRight/
     */
    SetTableCellMarginRight(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the top extent of the cell contents and the
     * top border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space above the top extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginTop/
     */
    SetTableCellMarginTop(nValue: twips): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableDescription/
     */
    SetTableDescription(sDescr: string): boolean;

    /**
     * Specifies the indentation which will be added before the leading edge of the current table in the
     * document
     * (the left edge in the left-to-right table, and the right edge in the right-to-left table).
     *
     * @param nValue - The indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableInd/
     */
    SetTableInd(nValue: twips): boolean;

    /**
     * Specifies the algorithm which will be used to lay out the contents of the current table within the
     * document.
     *
     * @param sType - The type of the table layout in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableLayout/
     */
    SetTableLayout(sType: "autofit" | "fixed"): boolean;

    /**
     * Specifies the conditional formatting components of the referenced table style (if one exists)
     * which will be applied to the set of table rows with the current table-level property exceptions. A
     * table style
     * can specify up to six different optional conditional formats, for example, different formatting for
     * the first column,
     * which then can be applied or omitted from individual table rows in the parent table.
     *
     * The default setting is to apply the row and column band formatting, but not the first row, last row,
     * first
     * column, or last column formatting.
     *
     * @param isFirstColumn - Specifies that the first column conditional formatting will be applied to the table.
     * @param isFirstRow - Specifies that the first row conditional formatting will be applied to the table.
     * @param isLastColumn - Specifies that the last column conditional formatting will be applied to the table.
     * @param isLastRow - Specifies that the last row conditional formatting will be applied to the table.
     * @param isHorBand - Specifies that the horizontal band conditional formatting will not be applied to the table.
     * @param isVerBand - Specifies that the vertical band conditional formatting will not be applied to the table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetTableLook/
     */
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): boolean;

    /**
     * Sets the table title (caption).
     *
     * @param sTitle - The table title to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableTitle/
     */
    SetTableTitle(sTitle: string): boolean;

    /**
     * Applies the text settings to the entire contents of the table.
     *
     * @param oTextPr - The text properties that will be set to the current table.
     * @returns returns true.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Sets the vertical alignment to the table.
     *
     * @param sType - Vertical alignment type: may be "top" or "center" or "bottom".
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetVAlign/
     */
    SetVAlign(sType: string): boolean;

    /**
     * Sets the preferred width to the current table.
     * <note>Tables are created with the {@link ApiTable#SetWidth} method properties set by default, which
     * always override the {@link ApiTablePr#SetWidth} method properties. That is why there is no use to
     * try and apply {@link ApiTablePr#SetWidth}. We recommend you to use the {@link ApiTablePr#SetWidth}
     * method instead.</note>
     *
     * @param sType - Type of the width value from one of the available width values types.
     * @param nValue - The table width value measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetWidth/
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /**
     * Sets the table wrapping style.
     *
     * @param isFlow - Specifies if the table is inline or not.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/SetWrappingStyle/
     */
    SetWrappingStyle(isFlow: boolean): boolean;

    /**
     * Splits the cell into a given number of rows and columns.
     *
     * @param oCell - The cell which will be split.
     * @param nRow - Count of rows into which the cell will be split.
     * @param nCol - Count of columns into which the cell will be split.
     * @default nRow = 1
     * @default nCol = 1
     * @returns returns null if can't split.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/Split/
     */
    Split(oCell?: ApiTableCell, nRow?: number, nCol?: number): ApiTable | null;

    /**
     * Converts the ApiTable object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTable/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /**
   * Class representing a table cell.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/
   */
  export interface ApiTableCell extends Omit<ApiTableCellPr, "GetClassType"> {
    /**
     * Adds the new columns to the current table.
     *
     * @param nCount - Count of columns to be added.
     * @param isBefore - Specifies if the new columns will be added before or after the current cell.
     * @default isBefore = false
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/AddColumns/
     */
    AddColumns(nCount: number, isBefore?: boolean): ApiTable | null;

    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the cell.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     * @returns returns false if oElement is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds the new rows to the current table.
     *
     * @param nCount - Count of rows to be added.
     * @param isBefore - Specifies if the new rows will be added before or after the current cell.
     * @default isBefore = false
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/AddRows/
     */
    AddRows(nCount: number, isBefore?: boolean): ApiTable | null;

    /**
     * Appends text to the end of the cell content.
     *
     * @param text - The text to append.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Clears the content from the current cell.
     *
     * @returns returns false if parent row is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Returns the background color of the current table cell.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns a type of the ApiTableCell class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetClassType/
     */
    GetClassType(): "tableCell";

    /**
     * Returns the current cell content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the current cell index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns an internal id of the current table cell.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the next cell if exists.
     *
     * @returns returns null if cell is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetNext/
     */
    GetNext(): ApiTableCell | null;

    /**
     * Returns a parent row of the current cell.
     *
     * @returns returns null if parent row doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetParentRow/
     */
    GetParentRow(): ApiTableRow | null;

    /**
     * Returns a parent table of the current cell.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous cell if exists.
     *
     * @returns returns null is cell is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetPrevious/
     */
    GetPrevious(): ApiTableCell | null;

    /**
     * Returns an index of the parent row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetRowIndex/
     */
    GetRowIndex(): number;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/GetText/
     */
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;

    /**
     * Removes a column containing the current cell.
     *
     * @returns returns false if table doen't exist
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/RemoveColumn/
     */
    RemoveColumn(): boolean;

    /**
     * Removes a row containing the current cell.
     *
     * @returns Is the table empty after removing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/RemoveRow/
     */
    RemoveRow(): boolean;

    /**
     * Searches for a scope of a table cell object. The search results are a collection of ApiRange
     * objects.
     *
     * @param sText - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/Search/
     */
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Sets the background color to the current table cell.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border which will be displayed at the bottom of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param nSize - The width of the current cell bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderBottom/
     */
    SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed to the left of the current table cell.
     *
     * @param sType - The cell left border style.
     * @param nSize - The width of the current cell left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderLeft/
     */
    SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed to the right of the current table cell.
     *
     * @param sType - The cell right border style.
     * @param nSize - The width of the current cell right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderRight/
     */
    SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table cell.
     *
     * @param sType - The cell top border style.
     * @param nSize - The width of the current cell top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderTop/
     */
    SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch). If this value is `null`, then default table cell bottom margin will
     *   be used, otherwise the table cell bottom margin will be overridden with the specified value for
     *   the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginBottom/
     */
    SetCellMarginBottom(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and
     * the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell left margin will be
     *   used, otherwise the table cell left margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginLeft/
     */
    SetCellMarginLeft(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell right margin will be
     *   used, otherwise the table cell right margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginRight/
     */
    SetCellMarginRight(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the upper extent of the cell contents
     * and the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space above the upper extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell top margin will be
     *   used, otherwise the table cell top margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginTop/
     */
    SetCellMarginTop(nValue: twips): boolean;

    /**
     * Sets the cell properties to the current cell.
     *
     * @param oApiTableCellPr - The properties that will be set to the current table cell.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/SetCellPr/
     */
    SetCellPr(oApiTableCellPr: ApiTableCellPr): boolean;

    /**
     * Sets the background color to all cells in the column containing the current cell.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/SetColumnBackgroundColor/
     */
    SetColumnBackgroundColor(color?: ApiColor): boolean;

    /**
     * Specifies how the current table cell is laid out when the parent table is displayed in a document.
     * This setting
     * only affects the behavior of the cell when the {@link ApiTablePr#SetTableLayout} table layout for
     * this table is set to use the `"autofit"` algorithm.
     *
     * @param isNoWrap - The true value means that the current table cell will not be wrapped in the parent table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetNoWrap/
     */
    SetNoWrap(isNoWrap: boolean): boolean;

    /**
     * Specifies the shading applied to the contents of the table cell.
     *
     * @param sType - The shading type which will be applied to the contents of the current table cell.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @param isAuto - The true value disables the table cell contents shading.
     * @default isAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetShd/
     */
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;

    /**
     * Replaces all content of the current table cell with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Specifies the direction of the text flow for this table cell.
     *
     * @param sType - The available types of the text direction in the table cell: `"lrtb"` - text direction
     *   left-to-right moving from top to bottom, `"tbrl"` - text direction top-to-bottom moving from
     *   right to left, `"btlr"` - text direction bottom-to-top moving from left to right.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetTextDirection/
     */
    SetTextDirection(sType: TextFlowDirection): boolean;

    /**
     * Applies the text settings to the entire contents of the current cell.
     *
     * @param oTextPr - The properties that will be set to the current table cell text.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Specifies the vertical alignment for the text contents within the current table cell.
     *
     * @param sType - The available types of the vertical alignment for the text contents of the current table cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetVerticalAlign/
     */
    SetVerticalAlign(sType: "top" | "center" | "bottom"): boolean;

    /**
     * Sets the preferred width to the current table cell.
     *
     * @param sType - Type of the width value from one of the available width values types.
     * @param nValue - The table cell width value measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetWidth/
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /**
     * Splits the cell into a given number of rows and columns.
     *
     * @param nRow - Count of rows into which the cell will be split.
     * @param nCol - Count of columns into which the cell will be split.
     * @default nRow = 1
     * @default nCol = 1
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCell/Methods/Split/
     */
    Split(nRow?: number, nCol?: number): ApiTable | null;

    /**
     * Converts the ApiTableCellPr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing the table cell properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/
   */
  export interface ApiTableCellPr {
    /**
     * Returns a type of the ApiTableCellPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/GetClassType/
     */
    GetClassType(): "tableCellPr";

    /**
     * Sets the border which will be displayed at the bottom of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param nSize - The width of the current cell bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderBottom/
     */
    SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed to the left of the current table cell.
     *
     * @param sType - The cell left border style.
     * @param nSize - The width of the current cell left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderLeft/
     */
    SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed to the right of the current table cell.
     *
     * @param sType - The cell right border style.
     * @param nSize - The width of the current cell right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderRight/
     */
    SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table cell.
     *
     * @param sType - The cell top border style.
     * @param nSize - The width of the current cell top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table cell measured in points used to place this
     *   border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellBorderTop/
     */
    SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch). If this value is `null`, then default table cell bottom margin will
     *   be used, otherwise the table cell bottom margin will be overridden with the specified value for
     *   the current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginBottom/
     */
    SetCellMarginBottom(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and
     * the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell left margin will be
     *   used, otherwise the table cell left margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginLeft/
     */
    SetCellMarginLeft(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell right margin will be
     *   used, otherwise the table cell right margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginRight/
     */
    SetCellMarginRight(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the upper extent of the cell contents
     * and the border of a specific table cell within a table.
     *
     * @param nValue - The value for the amount of space above the upper extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch). If this value is `null`, then default table cell top margin will be
     *   used, otherwise the table cell top margin will be overridden with the specified value for the
     *   current cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetCellMarginTop/
     */
    SetCellMarginTop(nValue: twips): boolean;

    /**
     * Specifies how the current table cell is laid out when the parent table is displayed in a document.
     * This setting
     * only affects the behavior of the cell when the {@link ApiTablePr#SetTableLayout} table layout for
     * this table is set to use the `"autofit"` algorithm.
     *
     * @param isNoWrap - The true value means that the current table cell will not be wrapped in the parent table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetNoWrap/
     */
    SetNoWrap(isNoWrap: boolean): boolean;

    /**
     * Specifies the shading applied to the contents of the table cell.
     *
     * @param sType - The shading type which will be applied to the contents of the current table cell.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @param isAuto - The true value disables the table cell contents shading.
     * @default isAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetShd/
     */
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;

    /**
     * Specifies the direction of the text flow for this table cell.
     *
     * @param sType - The available types of the text direction in the table cell: `"lrtb"` - text direction
     *   left-to-right moving from top to bottom, `"tbrl"` - text direction top-to-bottom moving from
     *   right to left, `"btlr"` - text direction bottom-to-top moving from left to right.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetTextDirection/
     */
    SetTextDirection(sType: TextFlowDirection): boolean;

    /**
     * Specifies the vertical alignment for the text contents within the current table cell.
     *
     * @param sType - The available types of the vertical alignment for the text contents of the current table cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetVerticalAlign/
     */
    SetVerticalAlign(sType: "top" | "center" | "bottom"): boolean;

    /**
     * Sets the preferred width to the current table cell.
     *
     * @param sType - Type of the width value from one of the available width values types.
     * @param nValue - The table cell width value measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/SetWidth/
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /**
     * Converts the ApiTableCellPr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableCellPr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing the table properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/
   */
  export interface ApiTablePr {
    /**
     * Returns a type of the ApiTablePr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/GetClassType/
     */
    GetClassType(): "tablePr";

    /**
     * Returns the table description.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/GetTableDescription/
     */
    GetTableDescription(): string;

    /**
     * Returns the table title (caption).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/GetTableTitle/
     */
    GetTableTitle(): string;

    /**
     * Specifies the default table cell spacing (the spacing between adjacent cells and the edges of the
     * table).
     *
     * @param nValue - Spacing value measured in twentieths of a point (1/1440 of an inch). `"Null"` means that no
     *   spacing will be applied.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetCellSpacing/
     */
    SetCellSpacing(nValue: twips): boolean;

    /**
     * Specifies the alignment of the current table with respect to the text margins in the current
     * section.
     *
     * @param sJcType - The alignment type used for the current table placement.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetJc/
     */
    SetJc(sJcType: "left" | "right" | "center"): boolean;

    /**
     * Specifies the shading which is applied to the extents of the current table.
     *
     * @param sType - The shading type applied to the extents of the current table.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @param isAuto - The true value disables the SetShd method use.
     * @default isAuto = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetShd/
     */
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;

    /**
     * Specifies a number of columns which will comprise each table column band for this table style.
     *
     * @param nCount - The number of columns measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetStyleColBandSize/
     */
    SetStyleColBandSize(nCount: number): boolean;

    /**
     * Specifies a number of rows which will comprise each table row band for this table style.
     *
     * @param nCount - The number of rows measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetStyleRowBandSize/
     */
    SetStyleRowBandSize(nCount: number): boolean;

    /**
     * Specifies a border which will be displayed on all table cell borders.
     *
     * @param sType - The border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the table cells measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderAll/
     */
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the bottom of the current table.
     *
     * @param sType - The bottom border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderBottom/
     */
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the border which will be displayed on all horizontal table cell borders which are not on
     * the outmost edge
     * of the parent table (all horizontal borders which are not the topmost or bottommost borders).
     *
     * @param sType - The horizontal table cell border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the horizontal table cells of the table measured in points used to place
     *   this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderInsideH/
     */
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies the border which will be displayed on all vertical table cell borders which are not on the
     * outmost edge
     * of the parent table (all vertical borders which are not the leftmost or rightmost borders).
     *
     * @param sType - The vertical table cell border style.
     * @param nSize - The width of the current border measured in eighths of a point.
     * @param nSpace - The spacing offset in the vertical table cells of the table measured in points used to place
     *   this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderInsideV/
     */
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the left of the current table.
     *
     * @param sType - The left border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderLeft/
     */
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the right of the current table.
     *
     * @param sType - The right border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderRight/
     */
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table.
     *
     * @param sType - The top border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableBorderTop/
     */
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: pt, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginBottom/
     */
    SetTableCellMarginBottom(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and the
     * left
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginLeft/
     */
    SetTableCellMarginLeft(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the right
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginRight/
     */
    SetTableCellMarginRight(nValue: twips): boolean;

    /**
     * Specifies an amount of space which will be left between the top extent of the cell contents and the
     * top border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space above the top extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableCellMarginTop/
     */
    SetTableCellMarginTop(nValue: twips): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableDescription/
     */
    SetTableDescription(sDescr: string): boolean;

    /**
     * Specifies the indentation which will be added before the leading edge of the current table in the
     * document
     * (the left edge in the left-to-right table, and the right edge in the right-to-left table).
     *
     * @param nValue - The indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableInd/
     */
    SetTableInd(nValue: twips): boolean;

    /**
     * Specifies the algorithm which will be used to lay out the contents of the current table within the
     * document.
     *
     * @param sType - The type of the table layout in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableLayout/
     */
    SetTableLayout(sType: "autofit" | "fixed"): boolean;

    /**
     * Sets the table title (caption).
     *
     * @param sTitle - The table title to be set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetTableTitle/
     */
    SetTableTitle(sTitle: string): boolean;

    /**
     * Sets the preferred width to the current table.
     * <note>Tables are created with the {@link ApiTable#SetWidth} method properties set by default, which
     * always override the {@link ApiTablePr#SetWidth} method properties. That is why there is no use to
     * try and apply {@link ApiTablePr#SetWidth}. We recommend you to use the {@link ApiTablePr#SetWidth}
     * method instead.</note>
     *
     * @param sType - Type of the width value from one of the available width values types.
     * @param nValue - The table width value measured in positive integers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/SetWidth/
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /**
     * Converts the ApiTablePr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTablePr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a table row.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/
   */
  export interface ApiTableRow extends Omit<ApiTableRowPr, "GetClassType"> {
    /**
     * Adds the new rows to the current table.
     *
     * @param nCount - Count of rows to be added.
     * @param isBefore - Specifies if the rows will be added before or after the current row.
     * @default isBefore = false
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/AddRows/
     */
    AddRows(nCount: number, isBefore?: boolean): ApiTable | null;

    /**
     * Clears the content from the current row.
     *
     * @returns returns false if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Returns a cell by its position.
     *
     * @param cellIndex - The cell index in the current row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetCell/
     */
    GetCell(cellIndex: number): ApiTableCell;

    /**
     * Returns a number of cells in the current row.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetCellsCount/
     */
    GetCellsCount(): number;

    /**
     * Returns a type of the ApiTableRow class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetClassType/
     */
    GetClassType(): "tableRow";

    /**
     * Returns the height of the current table row.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetHeight/
     */
    GetHeight(): EMU | null;

    /**
     * Returns the current row index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns an internal id of the current table row.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the next row if exists.
     *
     * @returns returns null if row is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetNext/
     */
    GetNext(): ApiTableRow | null;

    /**
     * Returns the parent table of the current row.
     *
     * @returns returns null if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetParentTable/
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous row if exists.
     *
     * @returns returns null if row is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/GetPrevious/
     */
    GetPrevious(): ApiTableRow | null;

    /**
     * Merges the cells in the current row.
     *
     * @returns return null if can't merge.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/MergeCells/
     */
    MergeCells(): ApiTableCell | null;

    /**
     * Removes the current table row.
     *
     * @returns return false if parent table doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/Remove/
     */
    Remove(): boolean;

    /**
     * Searches for a scope of a table row object. The search results are a collection of ApiRange objects.
     *
     * @param sText - Search string, or a regular expression to match. When a RegExp is passed, the isMatchCase
     *   parameter is ignored (control case sensitivity with the "i" flag instead).
     * @param isMatchCase - Case sensitive or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/Search/
     */
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];

    /**
     * Sets the background color to all cells in the current table row.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the height to the current table row within the current table.
     *
     * @param sHRule - The rule to apply the height value to the current table row or ignore it. Use the `"atLeast"`
     *   value to enable the `SetHeight` method use.
     * @param nValue - The height for the current table row measured in twentieths of a point (1/1440 of an inch). This
     *   value will be ignored if `sHRule="auto"`.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/SetHeight/
     */
    SetHeight(sHRule: "auto" | "atLeast", nValue?: twips): boolean;

    /**
     * Sets the properties to the current table row.
     *
     * @param oApiTableRowPr - The table row properties.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/SetRowPr/
     */
    SetRowPr(oApiTableRowPr: ApiTableRowPr): boolean;

    /**
     * Specifies that the current table row will be repeated at the top of each new page
     * wherever this table is displayed. This gives this table row the behavior of a 'header' row on
     * each of these pages. This element can be applied to any number of rows at the top of the
     * table structure in order to generate multi-row table headers.
     *
     * @param isHeader - The true value means that the current table row will be repeated at the top of each new page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/SetTableHeader/
     */
    SetTableHeader(isHeader: boolean): boolean;

    /**
     * Sets the text properties to the current row.
     *
     * @param oTextPr - The text properties that will be set to the current row.
     * @returns returns false if parent table doesn't exist or param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRow/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Converts the ApiTableRowPr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing the table row properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/
   */
  export interface ApiTableRowPr {
    /**
     * Returns a type of the ApiTableRowPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/GetClassType/
     */
    GetClassType(): "tableRowPr";

    /**
     * Sets the height to the current table row within the current table.
     *
     * @param sHRule - The rule to apply the height value to the current table row or ignore it. Use the `"atLeast"`
     *   value to enable the `SetHeight` method use.
     * @param nValue - The height for the current table row measured in twentieths of a point (1/1440 of an inch). This
     *   value will be ignored if `sHRule="auto"`.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/SetHeight/
     */
    SetHeight(sHRule: "auto" | "atLeast", nValue?: twips): boolean;

    /**
     * Specifies that the current table row will be repeated at the top of each new page
     * wherever this table is displayed. This gives this table row the behavior of a 'header' row on
     * each of these pages. This element can be applied to any number of rows at the top of the
     * table structure in order to generate multi-row table headers.
     *
     * @param isHeader - The true value means that the current table row will be repeated at the top of each new page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/SetTableHeader/
     */
    SetTableHeader(isHeader: boolean): boolean;

    /**
     * Converts the ApiTableRowPr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableRowPr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a set of formatting properties which shall be conditionally applied to the parts
   * of a table
   * which match the requirement specified on the `Type`.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/
   */
  export interface ApiTableStylePr {
    /**
     * Returns a type of the ApiTableStylePr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetClassType/
     */
    GetClassType(): "tableStylePr";

    /**
     * Returns a set of the paragraph properties which will be applied to all the paragraphs within a table
     * which match the conditional formatting type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns a set of the table cell properties which will be applied to all the cells within a table
     * which match the conditional formatting type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetTableCellPr/
     */
    GetTableCellPr(): ApiTableCellPr;

    /**
     * Returns a set of the table properties which will be applied to all the regions within a table which
     * match the conditional formatting type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetTablePr/
     */
    GetTablePr(): ApiTablePr;

    /**
     * Returns a set of the table row properties which will be applied to all the rows within a table which
     * match the conditional formatting type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetTableRowPr/
     */
    GetTableRowPr(): ApiTableRowPr;

    /**
     * Returns a set of the text run properties which will be applied to all the text runs within the table
     * which match the conditional formatting type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns a type of the current table conditional style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/GetType/
     */
    GetType(): TableStyleOverrideType;

    /**
     * Sets the paragraph properties to the current table style properties.
     *
     * @param oParaPr - The paragraph properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/SetParaPr/
     */
    SetParaPr(oParaPr: ApiParaPr): ApiTableStylePr;

    /**
     * Sets the table cell properties to the current table style properties.
     *
     * @param oTableCellPr - The table cell properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/SetTableCellPr/
     */
    SetTableCellPr(oTableCellPr: ApiTableCellPr): ApiTableStylePr;

    /**
     * Sets the table properties to the current table style properties.
     *
     * @param oTablePr - The table properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/SetTablePr/
     */
    SetTablePr(oTablePr: ApiTablePr): ApiTableStylePr;

    /**
     * Sets the table row properties to the current table style properties.
     *
     * @param oTableRowPr - The table row properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/SetTableRowPr/
     */
    SetTableRowPr(oTableRowPr: ApiTableRowPr): ApiTableStylePr;

    /**
     * Sets the text properties to the current table style properties.
     *
     * @param oTextPr - The text properties that will be set.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): ApiTableStylePr;

    /**
     * Converts the ApiTableStylePr object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTableStylePr/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing a document text field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/
   */
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the allowed symbols for the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetAllowedSymbols/
     */
    GetAllowedSymbols(): string;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a limit of the text field characters.
     *
     * @returns if this method returns -1 -> the form has no limit for characters
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetCharactersLimit/
     */
    GetCharactersLimit(): number;

    /**
     * Returns a type of the ApiTextForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetClassType/
     */
    GetClassType(): "textForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the format of the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetFormat/
     */
    GetFormat(): TextFormFormat;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the text form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the text field content is autofit, i.e. whether the font size adjusts to the size of the
     * fixed size form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if the text field is a comb of characters with the same cell width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsComb/
     */
    IsComb(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current text field is multiline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsMultiline/
     */
    IsMultiline(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the allowed symbols for the current text field. Only the specified characters will be accepted
     * as input.
     *
     * @param symbols - A string of allowed characters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetAllowedSymbols/
     */
    SetAllowedSymbols(symbols: string): boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     *
     * @param bAutoFit - Defines if the text field content is autofit (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetAutoFit/
     */
    SetAutoFit(bAutoFit: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the cell width to the applied comb of characters.
     *
     * @param nCellWidth - The cell width measured in millimeters. If this parameter is not specified or equal to 0 or
     *   less, then the width will be set automatically. Must be >= 1 and <= 558.8.
     * @default nCellWidth = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetCellWidth/
     */
    SetCellWidth(nCellWidth?: mm): boolean;

    /**
     * Sets a limit to the text field characters.
     *
     * @param nChars - The maximum number of characters in the text field. If this parameter is equal to -1, no limit
     *   will be set. A limit is required to be set if a comb of characters is applied. Maximum value for
     *   this parameter is 1000000.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetCharactersLimit/
     */
    SetCharactersLimit(nChars: number): boolean;

    /**
     * Specifies if the text field should be a comb of characters with the same cell width.
     * The maximum number of characters must be set to a positive value.
     *
     * @param bComb - Defines if the text field is a comb of characters (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetComb/
     */
    SetComb(bComb: boolean): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the format for the current text field.
     *
     * @param format - The format to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetFormat/
     */
    SetFormat(format: TextFormFormat): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Specifies if the current text field should be miltiline.
     *
     * @param bMultiline - Defines if the current text field is multiline (true) or not (false).
     * @returns return false, if the text field is not fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetMultiline/
     */
    SetMultiline(bMultiline: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current text field.
     *
     * @param text - The text that will be set to the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetText/
     */
    SetText(text: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the text value of the text form.
     *
     * @param value - The text value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetValue/
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing the text properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/
   */
  export interface ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the RGB color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetColor/
     */
    GetColor(): ApiColor;

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the language from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Gets the text position from the current text properties measured in half-points (1/144 of an inch).
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetPosition/
     */
    GetPosition(): hps;

    /**
     * Gets the text shading from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetShd/
     */
    GetShd(): Shd | undefined;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the style of the current text properties.
     *
     * @returns The used style.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetStyle/
     */
    GetStyle(): ApiStyle;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Gets the vertical alignment type from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/GetVertAlign/
     */
    GetVertAlign(): string;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param color - The text color.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Specifies the languages which will be used to check spelling and grammar (if requested) when
     * processing
     * the contents of the text run.
     *
     * @param sLangId - The possible value for this parameter is a language identifier as defined by RFC 4646/BCP 47.
     *   Example: "en-CA".
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies an amount by which text is raised or lowered for this run in relation to the default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetPosition/
     */
    SetPosition(nPosition: hps): ApiTextPr;

    /**
     * Specifies the shading applied to the contents of the current text run.
     *
     * @param type - The shading type applied to the contents of the current text run.
     * @param color - The color or pattern used to fill the shading.
     * @returns this text properties.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetShd/
     */
    SetShd(type: ShdType, color: ApiColor): ApiTextPr;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * The text style base method.
     * <note>This method is not used by itself, as it only forms the basis for the {@link ApiRun#SetStyle}
     * method which sets
     * the selected or created style to the text.</note>
     *
     * @param oStyle - The style which must be applied to the text character.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetStyle/
     */
    SetStyle(oStyle: ApiStyle): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetTextFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;

    /**
     * Converts the ApiTextPr object into the JSON object.
     *
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextPr/Methods/ToJSON/
     */
    ToJSON(bWriteStyles: boolean): object;
  }

  /**
   * Class representing a base class for color types.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/
   */
  export interface ApiUniColor {
    /**
     * Returns a type of the ApiUniColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/GetClassType/
     */
    GetClassType(): "uniColor";

    /**
     * Returns a color value in RGB format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/GetRGB/
     */
    GetRGB(): number;

    /**
     * Converts the ApiUniColor object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUniColor/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing an unsupported element.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUnsupported/
   */
  export interface ApiUnsupported {
    /**
     * Returns a type of the ApiUnsupported class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiUnsupported/Methods/GetClassType/
     */
    GetClassType(): "unsupported";
  }

  /**
   * Class representing the settings which are used to create a watermark.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/
   */
  export interface ApiWatermarkSettings {
    /**
     * Returns a type of the ApiWatermarkSettings class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetClassType/
     */
    GetClassType(): "watermarkSettings";

    /**
     * Returns the direction of the watermark in the document.
     *
     * @returns The watermark direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetDirection/
     */
    GetDirection(): WatermarkDirection;

    /**
     * Returns the height of the watermark image in the document.
     *
     * @returns The watermark image height in EMU.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetImageHeight/
     */
    GetImageHeight(): EMU | null;

    /**
     * Returns the image URL of the watermark in the document.
     *
     * @returns The watermark image URL.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetImageURL/
     */
    GetImageURL(): string | null;

    /**
     * Returns the width of the watermark image in the document.
     *
     * @returns The watermark image width in EMU.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetImageWidth/
     */
    GetImageWidth(): EMU | null;

    /**
     * Returns the opacity of the watermark in the document.
     *
     * @returns The watermark opacity. This value must be from 0 to 255.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetOpacity/
     */
    GetOpacity(): number;

    /**
     * Returns the text of the watermark in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetText/
     */
    GetText(): string | null;

    /**
     * Returns the text properties of the watermark in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the type of the watermark in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/GetType/
     */
    GetType(): WatermarkType;

    /**
     * Sets the direction of the watermark in the document.
     *
     * @param sDirection - The watermark direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetDirection/
     */
    SetDirection(sDirection: WatermarkDirection): boolean;

    /**
     * Sets the size (width and height) of the watermark image in the document.
     *
     * @param nWidth - The watermark image width.
     * @param nHeight - The watermark image height.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetImageSize/
     */
    SetImageSize(nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Sets the image URL of the watermark in the document.
     *
     * @param sURL - The watermark image URL.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetImageURL/
     */
    SetImageURL(sURL: string): boolean;

    /**
     * Sets the opacity of the watermark in the document.
     *
     * @param opacity - The watermark opacity. This value must be from 0 to 255.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetOpacity/
     */
    SetOpacity(opacity: number): boolean;

    /**
     * Sets the text of the watermark in the document.
     *
     * @param sText - The watermark text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets the text properties of the watermark in the document.
     *
     * @param oTextPr - The watermark text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): boolean;

    /**
     * Sets the type of the watermark in the document.
     *
     * @param sType - The watermark type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiWatermarkSettings/Methods/SetType/
     */
    SetType(sType: WatermarkType): boolean;
  }

  export type EditorEventArgs = {
    /**
     * The function called when a comment is added to the document with the
     * {@link https://api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/AddComment AddComment}
     * method.
     */
    onAddComment: [comment: comment];
    /** The function called when an annotation loses focus. */
    onBlurAnnotation: [annotation: TextAnnotation];
    /** The function called to show which content control has been blurred. */
    onBlurContentControl: [control: ContentControl];
    /**
     * The function called when the specified comment is changed with the
     * {@link https://api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/ChangeComment ChangeComment}
     * method.
     */
    onChangeCommentData: [comment: comment];
    /** The function called to show which content control has been changed. */
    onChangeContentControl: [control: ContentControl];
    /** The function called when the current page has changed. */
    onChangeCurrentPage: [index: number];
    /** The function called when the user clicks an annotation. */
    onClickAnnotation: [annotation: TextAnnotation];
    /** Fired when a content control is added to the document. */
    onContentControlAdd: [control: ContentControl];
    /** Fired when a content control is removed from the document. */
    onContentControlRemove: [control: ContentControl];
    /** The function called when an annotation receives focus. */
    onFocusAnnotation: [annotation: TextAnnotation];
    /** The function called to show which content control has been focused. */
    onFocusContentControl: [control: ContentControl];
    /** The function called when the content control loses focus in the document. */
    onHideContentControlTrack: [ids: string[]];
    /** The function called when one or more OLE objects are inserted into the document. */
    onInsertOleObjects: [data: object[]];
    /** Fired when a paragraph is added to the document. */
    onParagraphAdd: [data: { InternalId: string }];
    /** Fired when a paragraph is removed from the document. */
    onParagraphRemove: [data: { InternalId: string }];
    /** The function called when the paragraph text is updated in the document. */
    onParagraphText: [data: { paragraphId: string; recalcId: string; text: string; annotations: TextAnnotationRange[] }];
    /**
     * The function called when the specified comment is removed with the
     * {@link https://api.onlyoffice.com/docs/plugins/interacting-with-editors/document-api/Methods/RemoveComments RemoveComments}
     * method.
     */
    onRemoveComment: [comment: comment];
    /** The function called when the content control receives focus and its track appears. */
    onShowContentControlTrack: [ids: string[]];
    /** The function called when the user clicks the "Complete & Submit" button. */
    onSubmitForm: [];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
