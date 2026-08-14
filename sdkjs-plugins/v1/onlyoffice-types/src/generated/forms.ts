// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: form

export namespace Forms {
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

  /** Checkbox / radio button properties. */
  export type CheckBoxFormPr = FormPrBase | CheckBoxFormPrBase;

  /** Specific checkbox / radio button properties. */
  export interface CheckBoxFormPrBase {
    /**
     * Specifies if the current checkbox is a radio button. In this case, the key parameter is considered
     * as an identifier for the group of radio buttons.
     */
    radio: boolean;
  }

  /** Option for checkbox */
  export type CheckboxOption = boolean;

  /** Option for radio groups, dropdowns and combo boxes. */
  export interface ChoiceOption {
    /** Stored value. */
    value: string;

    /** Display text. */
    label: string;
  }

  /** Combo box / dropdown list properties. */
  export type ComboBoxFormPr = FormPrBase | ComboBoxFormPrBase;

  /** Specific combo box / dropdown list properties. */
  export interface ComboBoxFormPrBase {
    /** Specifies if the combo box text can be edited. */
    editable: boolean;

    /**
     * Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;

    /**
     * The combo box items.
     * This array consists of strings or arrays of two strings where the first string is the displayed
     * value and the second one is its meaning.
     * If the array consists of single strings, then the displayed value and its meaning are the same.
     * Example: ["First", ["Second", "2"], ["Third", "3"], "Fourth"].
     */
    items: (string | string[])[];
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

  /** The date form properties. */
  export type DateFormPr = FormPrBase | DateFormPrBase;

  /** Specific date form properties. */
  export interface DateFormPrBase {
    /** The date format, ex: mm.dd.yyyy */
    format: string;

    /**
     * The date language. Possible value for this parameter is a language identifier as defined by
     * RFC 4646/BCP 47. Example: "en-CA".
     */
    lang: string;
  }

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

  /** Form insertion specific properties. */
  export interface FormInsertPr {
    /** Specifies if the currently selected text should be saved as a placeholder of the inserted form. */
    placeholderFromSelection?: boolean;

    /** Specifies if the currently selected text should be saved as the content of the inserted form. */
    keepSelectedTextInForm?: boolean;
  }

  /** Common form properties. */
  export interface FormPrBase {
    /** The form key. */
    key: string;

    /** The form tip text. */
    tip: string;

    /** The form tag. */
    tag: string;

    /** The role to fill out form. */
    role: string;

    /** Specifies if the form is required or not. */
    required: boolean;

    /** The form placeholder text. */
    placeholder: string;
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

  /** Picture form properties. */
  export type PictureFormPr = FormPrBase | PictureFormPrBase;

  /** Specific picture form properties. */
  export interface PictureFormPrBase {
    /** The condition to scale an image in the picture form: "always", "never", "tooBig" or "tooSmall". */
    scaleFlag: ScaleFlag;

    /** Specifies if the aspect ratio of the picture form is locked or not. */
    lockAspectRatio: boolean;

    /** Specifies if the form border width is respected or not when scaling the image. */
    respectBorders: boolean;

    /**
     * Horizontal picture position inside the picture form measured in percent:
     * **0** - the picture is placed on the left;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the right.
     */
    shiftX: percentage;

    /**
     * Vertical picture position inside the picture form measured in percent:
     * **0** - the picture is placed on top;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the bottom.
     */
    shiftY: percentage;
  }

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

  /** The role properties. */
  export interface RoleProperties {
    /** The role color. */
    color: string;
  }

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

  /** Properties for inserting a text field. */
  export type TextFormInsertPr = FormPrBase | TextFormPrBase | FormInsertPr;

  /** Text field properties. */
  export type TextFormPr = FormPrBase | TextFormPrBase;

  /** Specific text field properties. */
  export interface TextFormPrBase {
    /**
     * Specifies if the text field should be a comb of characters with the same cell width. The maximum
     * number of characters must be set to a positive value.
     */
    comb: boolean;

    /** The maximum number of characters in the text field. */
    maxCharacters: number;

    /**
     * The cell width for each character measured in millimeters. If this parameter is not specified or
     * equal to 0 or less, then the width will be set automatically.
     */
    cellWidth: number;

    /** Specifies if the current fixed size text field is multiline or not. */
    multiLine: boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;
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

  /**
   * Base class
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/
   */
  export interface Api {
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/ConvertDocument/
     */
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;

    /**
     * Creates a checkbox / radio button with the specified checkbox / radio button properties.
     *
     * @param formPr - Checkbox / radio button properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateCheckBoxForm/
     */
    CreateCheckBoxForm(formPr: CheckBoxFormPr): ApiCheckBoxForm;

    /**
     * Creates a combo box / dropdown list with the specified combo box / dropdown list properties.
     *
     * @param formPr - Combo box / dropdown list properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComboBoxForm/
     */
    CreateComboBoxForm(formPr: ComboBoxFormPr): ApiComboBoxForm;

    /**
     * Creates a complex form with the specified complex form properties.
     *
     * @param formPr - Complex form properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComplexForm/
     */
    CreateComplexForm(formPr: FormPrBase): ApiComplexForm;

    /**
     * Creates a date form with the specified date form properties.
     *
     * @param formPr - Date form properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateDateForm/
     */
    CreateDateForm(formPr: DateFormPr): ApiDateForm;

    /**
     * Creates a picture form with the specified picture form properties.
     *
     * @param formPr - Picture form properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreatePictureForm/
     */
    CreatePictureForm(formPr: PictureFormPr): ApiPictureForm;

    /**
     * Creates a signature form with the specified form properties.
     *
     * @param formPr - Signature form properties.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateSignatureForm/
     */
    CreateSignatureForm(formPr: FormPrBase): ApiSignatureForm;

    /**
     * Creates a text field with the specified text field properties.
     *
     * @param formPr - Text field properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateTextForm/
     */
    CreateTextForm(formPr: TextFormPr): ApiTextForm;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/ReplaceTextSmart/
     */
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;
  }

  /** Class representing a container for the document content. */
  export interface ApiBlockLvlSdt {
  }

  /** Class representing a bookmark in the document. */
  export interface ApiBookmark {
  }

  /** Class representing a paragraph bullet. */
  export interface ApiBullet {
  }

  /** Class representing a chart. */
  export interface ApiChart extends ApiDrawing {
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
  }

  /**
   * Class representing a document checkbox / radio button.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/
   */
  export interface ApiCheckBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns the choice name of the current radio button.
     *
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetChoiceName/
     */
    GetChoiceName(): string;

    /**
     * Returns a type of the ApiCheckBoxForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetClassType/
     */
    GetClassType(): "checkBoxForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the choice name of the currently selected radio button in the group.
     * Returns an empty string if the current form is not a radio button or nothing is selected.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetGroupValue/
     */
    GetGroupValue(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the label of the current check box.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetLabel/
     */
    GetLabel(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the radio group key if the current checkbox is a radio button.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetRadioGroup/
     */
    GetRadioGroup(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current state of the checkbox form as a boolean value.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/GetValue/
     */
    GetValue(): boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Returns the state of the current checkbox (checked or not).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/IsChecked/
     */
    IsChecked(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current checkbox is a radio button.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/IsRadioButton/
     */
    IsRadioButton(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Checks the current checkbox.
     *
     * @param isChecked - Specifies if the current checkbox will be checked (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetChecked/
     */
    SetChecked(isChecked: boolean): boolean;

    /**
     * Sets the choice name for the current radio button.
     *
     * @param choiceName - The radio button choice name.
     * @since 8.3.2
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetChoiceName/
     */
    SetChoiceName(choiceName: string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Selects the radio button with the specified choice name in the group.
     *
     * @param value - The choice name of the radio button to select.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetGroupValue/
     */
    SetGroupValue(value: string): boolean;

    /**
     * Sets the label for the current check box.
     *
     * @param label - The label.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetLabel/
     */
    SetLabel(label: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Sets the radio group key to the current radio button.
     *
     * @param sKey - Radio group key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetRadioGroup/
     */
    SetRadioGroup(sKey: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the state of the checkbox form.
     *
     * @param value - Specifies if the checkbox will be checked (true) or not (false).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiCheckBoxForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
  }

  /**
   * Class representing a document combo box / drop-down list.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/
   */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComboBoxForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetClassType/
     */
    GetClassType(): "comboBoxForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the list values from the current combo box.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetListValues/
     */
    GetListValues(): string[];

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the combo box form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the combo box text can be edited. If it is not editable, then this form is a drop-down
     * list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/IsEditable/
     */
    IsEditable(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Selects the specified value from the combo box list values.
     *
     * @param sValue - The combo box list value that will be selected.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SelectListValue/
     */
    SelectListValue(sValue: string): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the list values to the current combo box.
     *
     * @param aListString - The combo box list values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetListValues/
     */
    SetListValues(aListString: string[]): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current combo box.
     * *Available only for editable combo box forms.*
     *
     * @param sText - The combo box text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the combo box form. Selects a list item if the value matches one,
     * otherwise sets it as free text (only for editable combo boxes).
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComboBoxForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
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
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/
   */
  export interface ApiComplexForm extends Omit<ApiFormBase, "GetValue"> {
    /**
     * Appends the text content of the given form to the end of the current complex form.
     *
     * @param value - The text or the form to add.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/Add/
     */
    Add(value: string | ApiDateForm | ApiPictureForm | ApiCheckBoxForm | ApiComboBoxForm | ApiTextForm): boolean;

    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Clears all content from the current complex form, resetting it to its placeholder state.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiComplexForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns an ordered list of subforms.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetSubForms/
     */
    GetSubForms(): ApiForm[];

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the complex form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiComplexForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
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
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/
   */
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiDateForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetClassType/
     */
    GetClassType(): "dateForm";

    /**
     * Returns the date of the current form.
     *
     * @returns The date object, or undefined if the form is a placeholder.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetDate/
     */
    GetDate(): undefined | Date;

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Gets the date format of the current form.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetFormat/
     */
    GetFormat(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Gets the used date language of the current form.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the timestamp of the current form.
     *
     * @returns The Unix timestamp in milliseconds, or undefined if the form is a placeholder.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetTime/
     */
    GetTime(): undefined | number;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the date of the current form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/GetValue/
     */
    GetValue(): Date | undefined;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the date to the current form.
     *
     * @param date - The date object or the date in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetDate/
     */
    SetDate(date: Date | string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the date format to the current form.
     *
     * @param sFormat - The date format. For example, mm.dd.yyyy
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetFormat/
     */
    SetFormat(sFormat: string): boolean;

    /**
     * Sets the date language to the current form.
     *
     * @param sLangId - The date language. The possible value for this parameter is a language identifier as defined in
     *   RFC 4646/BCP 47. Example: "en-CA".
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the timestamp to the current form.
     *
     * @param nTimeStamp - The timestamp that will be set to the current date form.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetTime/
     */
    SetTime(nTimeStamp: number): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the date of the current form.
     *
     * @param value - The date object or the date in the string format.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDateForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/
   */
  export interface ApiDocument extends ApiDocumentContent {
    /**
     * Clears all forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/ClearAllFields/
     */
    ClearAllFields(): boolean;

    /**
     * Returns all existing forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetAllForms/
     */
    GetAllForms(): ApiForm[];

    /**
     * Returns a list of all form keys attached to the specified role.
     *
     * @param role - The form role.
     * @returns A list of all form keys attached to the specified role.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormKeysByRole/
     */
    GetFormKeysByRole(role: string): string[];

    /**
     * Returns a collection of form roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormRoles/
     */
    GetFormRoles(): ApiFormRoles;

    /**
     * Returns the form value for the specified key. For a group of radio buttons returns Choice, i.e. the
     * name of the selected item.
     *
     * @param key - The form key.
     * @returns Returns true/false for checkboxes and string for other form types. Returns null if there is no
     *   form with the specified key.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormValueByKey/
     */
    GetFormValueByKey(key: string): null | boolean | string;

    /**
     * Returns a list of all forms in the document with the specified key.
     *
     * @param key - The form key.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByKey/
     */
    GetFormsByKey(key: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified role name.
     *
     * @param role - The form role.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByRole/
     */
    GetFormsByRole(role: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified tag name.
     *
     * @param sTag - Form tag.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsByTag/
     */
    GetFormsByTag(sTag: string): ApiForm[];

    /**
     * Returns the data from all forms present in the current document.
     * If a form was created and not assigned to any part of the document, it won't appear in this list.
     *
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsData/
     */
    GetFormsData(): FormData[];

    /**
     * Returns the highlight color of the forms in the document.
     *
     * @returns Returns the highlight color, or _null_ if the highlight is disabled.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormsHighlight/
     */
    GetFormsHighlight(): ApiColor | null;

    /**
     * Returns a list of all tags that are used for all forms in the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetTagsOfAllForms/
     */
    GetTagsOfAllForms(): string[];

    /**
     * Inserts a text box with the specified text box properties over the selected text.
     *
     * @param formPr - Properties for inserting a text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/InsertTextForm/
     */
    InsertTextForm(formPr: TextFormInsertPr): ApiTextForm;

    /**
     * Sets the data to the specified forms.
     *
     * @param arrData - An array of form data to set to the specified forms.
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/SetFormsData/
     */
    SetFormsData(arrData: FormData[]): boolean;

    /**
     * Sets the highlight to the forms in the document.
     *
     * @param color - The highlight color for the forms.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/SetFormsHighlight/
     */
    SetFormsHighlight(color: ApiColor): boolean;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
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
  }

  /**
   * Class representing a document form base.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/
   */
  export interface ApiFormBase {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current value of the form field.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetValue/
     */
    GetValue(): string | boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a collection of form roles.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/
   */
  export interface ApiFormRoles {
    /**
     * Adds a new form role.
     *
     * @param name - The name of role being added.
     * @param props - The role properties.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Add/
     */
    Add(name: string, props: RoleProperties): boolean;

    /**
     * Lists all available roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetAllRoles/
     */
    GetAllRoles(): string[];

    /**
     * Returns a number of form roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns the RGB color of the specified role.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetRoleColor/
     */
    GetRoleColor(name: string): null | object;

    /**
     * Checks if a role with the specified name exists.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/HaveRole/
     */
    HaveRole(name: string): boolean;

    /**
     * Moves a role down in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveDown/
     */
    MoveDown(name: string): boolean;

    /**
     * Moves a role up in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveUp/
     */
    MoveUp(name: string): boolean;

    /**
     * Removes a role with the specified name.
     *
     * @param name - The name of role to be removed.
     * @param delegateRole - The name of the role to which all forms bound to this role will be delegated.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Remove/
     */
    Remove(name: string, delegateRole?: string): boolean;

    /**
     * Sets the color for the specified role.
     *
     * @param name - The role name.
     * @param color - The role color.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/SetRoleColor/
     */
    SetRoleColor(name: string, color: string): boolean;
  }

  /** Class representing the shape geometry. */
  export interface ApiGeometry {
  }

  /** Class representing gradient stop. */
  export interface ApiGradientStop {
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup extends ApiDrawing {
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
  }

  /** Class representing an image. */
  export interface ApiImage extends ApiDrawing {
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an Ole object. */
  export interface ApiOleObject extends ApiDrawing {
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph extends ApiParaPr {
  }

  /** Class representing a path in geometry. */
  export interface ApiPath {
  }

  /** Class representing a path command. */
  export interface ApiPathCommand {
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/
   */
  export interface ApiPictureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiPictureForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetClassType/
     */
    GetClassType(): "pictureForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an image in the base64 format from the current picture form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetImage/
     */
    GetImage(): Base64Img;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the picture position inside the current form.
     *
     * @returns Array of two numbers [shiftX, shiftY]
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetPicturePosition/
     */
    GetPicturePosition(): percentage[];

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the current scaling condition of the picture form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetScaleFlag/
     */
    GetScaleFlag(): ScaleFlag;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the picture form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the aspect ratio of the current picture form is locked or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/IsLockAspectRatio/
     */
    IsLockAspectRatio(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if the form border width is respected or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/IsRespectBorders/
     */
    IsRespectBorders(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets an image to the current picture form.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or base64 encoded images are supported).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetImage/
     */
    SetImage(imageSrc: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Locks the aspect ratio of the current picture form.
     *
     * @param isLock - Specifies if the aspect ratio of the current picture form will be locked (true) or not (false).
     * @default isLock = true
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetLockAspectRatio/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetPicturePosition/
     */
    SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Respects the form border width when scaling the image.
     *
     * @param isRespect - Specifies if the form border width will be respected (true) or not (false).
     * @default isRespect = true
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetRespectBorders/
     */
    SetRespectBorders(isRespect?: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the scaling condition to the current picture form.
     *
     * @param sScaleFlag - Picture scaling condition: "always", "never", "tooBig" or "tooSmall".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetScaleFlag/
     */
    SetScaleFlag(sScaleFlag: ScaleFlag): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the picture form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiPictureForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends ApiUniColor {
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends ApiUniColor {
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   */
  export interface ApiRange {
  }

  export interface ApiRangeTextPr extends ApiTextPr {
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun extends ApiTextPr {
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor extends ApiUniColor {
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
  }

  /** Class representing a shape. */
  export interface ApiShape extends ApiDrawing {
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/
   */
  export interface ApiSignatureForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiSignatureForm class.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/GetClassType/
     */
    GetClassType(): "signatureForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the signature form as a base64 encoded string.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the signature form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiSignatureForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt extends ApiDrawing {
  }

  /** Class representing a stroke. */
  export interface ApiStroke {
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /** Class representing a table. */
  export interface ApiTable extends ApiTablePr {
  }

  /** Class representing a table cell. */
  export interface ApiTableCell extends ApiTableCellPr {
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
  }

  /** Class representing a table row. */
  export interface ApiTableRow extends ApiTableRowPr {
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
   * Class representing a document text field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/
   */
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/Delete/
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the allowed symbols for the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetAllowedSymbols/
     */
    GetAllowedSymbols(): string;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBackgroundColor/
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetBorderColor/
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a limit of the text field characters.
     *
     * @returns if this method returns -1 -> the form has no limit for characters
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetCharactersLimit/
     */
    GetCharactersLimit(): number;

    /**
     * Returns a type of the ApiTextForm class.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetClassType/
     */
    GetClassType(): "textForm";

    /**
     * Returns the current form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the format of the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetFormat/
     */
    GetFormat(): TextFormFormat;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetLock/
     */
    GetLock(): boolean;

    /**
     * Returns the parent element (a paragraph or an inline content control) that directly contains the
     * current form.
     *
     * @returns returns null if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetParent/
     */
    GetParent(): ParagraphLikeContainer;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPlaceholderText/
     */
    GetPlaceholderText(): string;

    /**
     * Returns the position (index) of the current form within its parent element.
     *
     * @returns returns -1 if the form has no parent.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetPosInParent/
     */
    GetPosInParent(): number;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetRole/
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTag/
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the text form.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the text field content is autofit, i.e. whether the font size adjusts to the size of the
     * fixed size form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if the text field is a comb of characters with the same cell width.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsComb/
     */
    IsComb(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFilled/
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current text field is multiline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/IsMultiline/
     */
    IsMultiline(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @default isAfter = true
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the allowed symbols for the current text field. Only the specified characters will be accepted
     * as input.
     *
     * @param symbols - A string of allowed characters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetAllowedSymbols/
     */
    SetAllowedSymbols(symbols: string): boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     *
     * @param bAutoFit - Defines if the text field content is autofit (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetAutoFit/
     */
    SetAutoFit(bAutoFit: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the cell width to the applied comb of characters.
     *
     * @param nCellWidth - The cell width measured in millimeters. If this parameter is not specified or equal to 0 or
     *   less, then the width will be set automatically. Must be >= 1 and <= 558.8.
     * @default nCellWidth = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetCellWidth/
     */
    SetCellWidth(nCellWidth?: mm): boolean;

    /**
     * Sets a limit to the text field characters.
     *
     * @param nChars - The maximum number of characters in the text field. If this parameter is equal to -1, no limit
     *   will be set. A limit is required to be set if a comb of characters is applied. Maximum value for
     *   this parameter is 1000000.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetCharactersLimit/
     */
    SetCharactersLimit(nChars: number): boolean;

    /**
     * Specifies if the text field should be a comb of characters with the same cell width.
     * The maximum number of characters must be set to a positive value.
     *
     * @param bComb - Defines if the text field is a comb of characters (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetComb/
     */
    SetComb(bComb: boolean): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the format for the current text field.
     *
     * @param format - The format to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetFormat/
     */
    SetFormat(format: TextFormFormat): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetLock/
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Specifies if the current text field should be miltiline.
     *
     * @param bMultiline - Defines if the current text field is multiline (true) or not (false).
     * @returns return false, if the text field is not fixed size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetMultiline/
     */
    SetMultiline(bMultiline: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetRole/
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTag/
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current text field.
     *
     * @param text - The text that will be set to the current text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetText/
     */
    SetText(text: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the text value of the text form.
     *
     * @param value - The text value to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiTextForm/Methods/SetValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: twips, height: twips, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing the text properties. */
  export interface ApiTextPr {
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  export type EditorEventArgs = {
    /** The function called when the user clicks the "Complete & Submit" button. */
    onSubmitForm: [];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
