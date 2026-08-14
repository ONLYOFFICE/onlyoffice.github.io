// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: cell

export namespace Cell {
  /**
   * A numeric value that specifies which function should be used to aggregate identical time values in
   * the timeline data range.
   * **1** (or omitted) - AVERAGE.
   * **2** - COUNT.
   * **3** - COUNTA.
   * **4** - MAX.
   * **5** - MEDIAN.
   * **6** - MIN.
   * **7** - SUM.
   */
  export type Aggregation = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /** Specifies the range angle. */
  export type Angle = "xlDownward" | "xlHorizontal" | "xlUpward" | "xlVertical";

  /** Animation effect type. */
  export type AnimationEffectType = "entranceAppear" | "entranceFade" | "entranceFlyIn" | "entranceFloatIn" | "entranceSplit" | "entranceWipe" | "entranceCircle" | "entranceBox" | "entranceDiamond" | "entrancePlus" | "entranceWheel" | "entranceRandomBars" | "entranceGrowAndTurn" | "entranceZoom" | "entranceSwivel" | "entranceBounce" | "entranceBlinds" | "entranceCheckerboard" | "entrancePeekIn" | "entranceStrips" | "entranceExpand" | "entranceRiseUp" | "entranceCenterRevolve" | "entranceSpinner" | "entranceFloatUp" | "entranceFloatDown" | "entranceSpiralIn" | "entranceWedge" | "entranceDissolveIn" | "entrancePinwheel" | "exitDisappear" | "exitFadeOut" | "exitFlyOut" | "exitFloatOut" | "exitSplitOut" | "exitWipeOut" | "exitCircleOut" | "exitBoxOut" | "exitDiamondOut" | "exitPlusOut" | "exitWheelOut" | "exitRandomBarsOut" | "exitShrinkAndTurn" | "exitZoomOut" | "exitSwivelOut" | "exitBounceOut" | "exitSpiralOut" | "exitCollapse" | "emphasisPulse" | "emphasisColorPulse" | "emphasisTeeter" | "emphasisSpin" | "emphasisGrowShrink" | "emphasisDesaturate" | "emphasisDarken" | "emphasisLighten" | "emphasisTransparency" | "emphasisObjectColor" | "emphasisComplementaryColor" | "emphasisLineColor" | "emphasisFillColor" | "emphasisFontColor" | "emphasisBlink" | "emphasisShimmer" | "emphasisWave" | "pathCircle" | "pathSquare" | "pathDiamond" | "pathHeart" | "pathStar" | "pathHexagon" | "pathOctagon" | "pathRight" | "pathLeft" | "pathUp" | "pathDown";

  /** Animation trigger type. */
  export type AnimationTriggerType = "onclick" | "withprevious" | "afterprevious";

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

  /** A border type. */
  export type BorderType = "none" | "single";

  /** Specifies the cell border position. */
  export type BordersIndex = "DiagonalDown" | "DiagonalUp" | "Bottom" | "Left" | "Right" | "Top" | "InsideHorizontal" | "InsideVertical";

  /** A bullet type which will be added to the paragraph in spreadsheet or presentation. */
  export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

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

  /** The type of calculation to perform on the data field items. */
  export type DataConsolidateFunctionType = "Average" | "CountNumbers" | "Count" | "Max" | "Min" | "Product" | "StdDev" | "StdDevP" | "Sum" | "Var" | "VarP";

  /** Specifies how to shift cells to replace deleted cells. */
  export type DeleteShiftDirection = "up" | "left";

  /** Specifies the direction of end in the specified range. */
  export type Direction = "xlUp" | "xlDown" | "xlToRight" | "xlToLeft";

  /** Any valid element which can be added to the document structure. */
  export type DocumentElement = ApiParagraph;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiOleObject | ApiChart | ApiGroup | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock. */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available slide transition effects (similar to PowerPoint VBA ppEffect). */
  export type EntryEffect = "effectAppear" | "effectBlindsHorizontal" | "effectBlindsVertical" | "effectBoxDown" | "effectBoxIn" | "effectBoxLeft" | "effectBoxOut" | "effectBoxRight" | "effectBoxUp" | "effectCheckerboardAcross" | "effectCheckerboardDown" | "effectCircleOut" | "effectCombHorizontal" | "effectCombVertical" | "effectConveyorLeft" | "effectConveyorRight" | "effectCoverDown" | "effectCoverLeft" | "effectCoverLeftDown" | "effectCoverLeftUp" | "effectCoverRight" | "effectCoverRightDown" | "effectCoverRightUp" | "effectCoverUp" | "effectCubeDown" | "effectCubeLeft" | "effectCubeRight" | "effectCubeUp" | "effectCut" | "effectCutThroughBlack" | "effectDiamondOut" | "effectDissolve" | "effectDoorsHorizontal" | "effectDoorsVertical" | "effectFade" | "effectFadeSmoothly" | "effectFerrisWheelLeft" | "effectFerrisWheelRight" | "effectFlashbulb" | "effectFlipDown" | "effectFlipLeft" | "effectFlipRight" | "effectFlipUp" | "effectFlyThroughIn" | "effectFlyThroughInBounce" | "effectFlyThroughOut" | "effectFlyThroughOutBounce" | "effectGalleryLeft" | "effectGalleryRight" | "effectGlitterDiamondDown" | "effectGlitterDiamondLeft" | "effectGlitterDiamondRight" | "effectGlitterDiamondUp" | "effectGlitterHexagonDown" | "effectGlitterHexagonLeft" | "effectGlitterHexagonRight" | "effectGlitterHexagonUp" | "effectHoneycomb" | "effectNewsflash" | "effectOrbitDown" | "effectOrbitLeft" | "effectOrbitRight" | "effectOrbitUp" | "effectPanDown" | "effectPanLeft" | "effectPanRight" | "effectPanUp" | "effectPlusOut" | "effectPushDown" | "effectPushLeft" | "effectPushRight" | "effectPushUp" | "effectRandom" | "effectRandomBarsHorizontal" | "effectRandomBarsVertical" | "effectRevealBlackLeft" | "effectRevealBlackRight" | "effectRevealSmoothLeft" | "effectRevealSmoothRight" | "effectRippleCenter" | "effectRippleLeftDown" | "effectRippleLeftUp" | "effectRippleRightDown" | "effectRippleRightUp" | "effectRotateDown" | "effectRotateLeft" | "effectRotateRight" | "effectRotateUp" | "effectShredRectangleIn" | "effectShredRectangleOut" | "effectShredStripsIn" | "effectShredStripsOut" | "effectSplitHorizontalIn" | "effectSplitHorizontalOut" | "effectSplitVerticalIn" | "effectSplitVerticalOut" | "effectStripsDownLeft" | "effectStripsDownRight" | "effectStripsLeftDown" | "effectStripsLeftUp" | "effectStripsRightDown" | "effectStripsRightUp" | "effectStripsUpLeft" | "effectStripsUpRight" | "effectSwitchDown" | "effectSwitchLeft" | "effectSwitchRight" | "effectSwitchUp" | "effectUncoverDown" | "effectUncoverLeft" | "effectUncoverLeftDown" | "effectUncoverLeftUp" | "effectUncoverRight" | "effectUncoverRightDown" | "effectUncoverRightUp" | "effectUncoverUp" | "effectVortexDown" | "effectVortexLeft" | "effectVortexRight" | "effectVortexUp" | "effectWarpIn" | "effectWarpOut" | "effectWedge" | "effectWheel1Spoke" | "effectWheel2Spokes" | "effectWheel3Spokes" | "effectWheel4Spokes" | "effectWheel8Spokes" | "effectWheelReverse1Spoke" | "effectWindowHorizontal" | "effectWindowVertical" | "effectWipeDown" | "effectWipeLeft" | "effectWipeRight" | "effectWipeUp" | "effectNone" | "effectCrawlFromDown" | "effectCrawlFromLeft" | "effectCrawlFromRight" | "effectCrawlFromUp" | "effectFlashOnceFast" | "effectFlashOnceMedium" | "effectFlashOnceSlow" | "effectFlyFromBottom" | "effectFlyFromBottomLeft" | "effectFlyFromBottomRight" | "effectFlyFromLeft" | "effectFlyFromRight" | "effectFlyFromTop" | "effectFlyFromTopLeft" | "effectFlyFromTopRight" | "effectMixed" | "effectPeekFromDown" | "effectPeekFromLeft" | "effectPeekFromRight" | "effectPeekFromUp" | "effectSpiral" | "effectStretchAcross" | "effectStretchDown" | "effectStretchLeft" | "effectStretchRight" | "effectStretchUp" | "effectSwivel" | "effectZoomBottom" | "effectZoomCenter" | "effectZoomIn" | "effectZoomInSlightly" | "effectZoomOut" | "effectZoomOutSlightly";

  /**
   * The error value.
   * * **"#NULL!"** - 1
   * * **"#DIV/0!"** - 2
   * * **"#VALUE!"** - 3
   * * **"#REF!"** - 4
   * * **"#NAME?"** - 5
   * * **"#NUM!"** - 6
   * * **"#N/A"** - 7
   * * **"#GETTING_DATA"** - 8
   * * **"Other"** - "#N/A"
   */
  export type ErrorValue = "#NULL!" | "#DIV/0!" | "#VALUE!" | "#REF!" | "#NAME?" | "#NUM!" | "#N/A" | "#GETTING_DATA";

  /** Specifies how the report filter fields are located. */
  export type FieldsInReportFilterType = "OverThenDown" | "DownThenOver";

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

  /** Specifies a type of freeze panes. */
  export type FreezePaneType = "row" | "column" | "cell" | null;

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

  /** The layout subtotal location. */
  export type LayoutSubtotalLocationType = "Top" | "Bottom";

  /** Available layout types. */
  export type LayoutType = "blank" | "chart" | "chartAndTx" | "clipArtAndTx" | "clipArtAndVertTx" | "cust" | "dgm" | "fourObj" | "mediaAndTx" | "obj" | "objAndTwoObj" | "objAndTx" | "objOnly" | "objOverTx" | "objTx" | "picTx" | "secHead" | "tbl" | "title" | "titleOnly" | "twoColTx" | "twoObj" | "twoObjAndObj" | "twoObjAndTx" | "twoObjOverTx" | "twoTxTwoObj" | "tx" | "txAndChart" | "txAndClipArt" | "txAndMedia" | "txAndObj" | "txAndTwoObj" | "txOverObj" | "vertTitleAndTx" | "vertTitleAndTxOverChart" | "vertTx";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Specifies the line style used to form the cell border. */
  export type LineStyle = "None" | "Double" | "Hair" | "DashDotDot" | "DashDot" | "Dotted" | "Dashed" | "Thin" | "MediumDashDotDot" | "SlantDashDot" | "MediumDashDot" | "MediumDashed" | "Medium" | "Thick";

  /**
   * The match type.
   * * **-1** - The values must be sorted in descending order. If the exact match is not found, the
   * function will return the smallest value that is greater than the searched value.
   * * **0** - The values can be sorted in any order. If the exact match is not found, the function will
   * return the *#N/A* error.
   * * **1** (or omitted) - The values must be sorted in ascending order. If the exact match is not
   * found, the function will return the largest value that is less than the searched value.
   */
  export type MatchType = "-1" | "0" | "1";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The page orientation type. */
  export type PageOrientation = "xlLandscape" | "xlPortrait";

  /** The paper size, specified as a value of the Excel **xlPaperSize** enumeration. */
  export type PaperSize = "xlPaperLetter" | "xlPaperLetterSmall" | "xlPaperTabloid" | "xlPaperLedger" | "xlPaperLegal" | "xlPaperStatement" | "xlPaperExecutive" | "xlPaperA3" | "xlPaperA4" | "xlPaperA4Small" | "xlPaperA5" | "xlPaperB4" | "xlPaperB5" | "xlPaperFolio" | "xlPaperQuarto" | "xlPaper10x14" | "xlPaper11x17" | "xlPaperNote" | "xlPaperEnvelope9" | "xlPaperEnvelope10" | "xlPaperEnvelope11" | "xlPaperEnvelope12" | "xlPaperEnvelope14" | "xlPaperCsheet" | "xlPaperDsheet" | "xlPaperEsheet" | "xlPaperEnvelopeDL" | "xlPaperEnvelopeC5" | "xlPaperEnvelopeC3" | "xlPaperEnvelopeC4" | "xlPaperEnvelopeC6" | "xlPaperEnvelopeC65" | "xlPaperEnvelopeB4" | "xlPaperEnvelopeB5" | "xlPaperEnvelopeB6" | "xlPaperEnvelopeItaly" | "xlPaperEnvelopeMonarch" | "xlPaperEnvelopePersonal" | "xlPaperFanfoldUS" | "xlPaperFanfoldStdGerman" | "xlPaperFanfoldLegalGerman";

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

  /**
   * A paragraph-like container that can directly hold inline-level content (Hyperlink, InlineLvlSdt,
   * etc.).
   */
  export type ParagraphLikeContainer = ApiParagraph | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

  /** The mathematical operation which will be applied to the copied data. */
  export type PasteSpecialOperation = "xlPasteSpecialOperationAdd" | "xlPasteSpecialOperationDivide" | "xlPasteSpecialOperationMultiply" | "xlPasteSpecialOperationNone" | "xlPasteSpecialOperationSubtract";

  /** Specifies the part of the range to be pasted. */
  export type PasteType = "xlPasteAll" | "xlPasteAllExceptBorders" | "xlPasteColumnWidths" | "xlPasteComments" | "xlPasteFormats" | "xlPasteFormulas" | "xlPasteFormulasAndNumberFormats" | "xlPasteValues" | "xlPasteValuesAndNumberFormats";

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill. */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** The pivot field orientation type. */
  export type PivotFieldOrientationType = "Rows" | "Columns" | "Filters" | "Values" | "Hidden";

  /** Subtotal pivot field types (functions for subtotals). */
  export interface PivotFieldSubtotals {
    /** Specififes whether the SUM function will be used. */
    Sum: boolean;

    /** Specififes whether the COUNTA function will be used. */
    Count: boolean;

    /** Specififes whether the AVERAGE function will be used. */
    Average: boolean;

    /** Specififes whether the MAX function will be used. */
    Max: boolean;

    /** Specififes whether the MIN function will be used. */
    Min: boolean;

    /** Specififes whether the PRODUCT function will be used. */
    Product: boolean;

    /** Specififes whether the COUNT function will be used. */
    CountNumbers: boolean;

    /** Specififes whether the STDEV function will be used. */
    StdDev: boolean;

    /** Specififes whether the STDEV.P function will be used. */
    StdDevP: boolean;

    /** Specififes whether the VAR function will be used. */
    Var: boolean;

    /** Specififes whether the VAR.P function will be used. */
    VarP: boolean;
  }

  /** The layout type of the pivot table report. */
  export type PivotLayoutType = "Tabular" | "Outline";

  /** The direction to move the pivot table field. */
  export type PivotMoveFieldType = "Up" | "Down" | "Begin" | "End";

  /** The type of the pivot table subtotal layout. */
  export type PivotSubtotalLayoutType = "Hidden" | "Top" | "Bottom";

  /** The settings for adding row, column, and page fields to the pivot table report. */
  export interface PivotTableFieldOptions {
    /** An array of field names or IDs to be added as rows or added to the category axis. */
    rows?: number | string | number[] | string[];

    /** An array of field names or IDs to be added as columns or added to the series axis. */
    columns?: number | string | number[] | string[];

    /** An array of field names or IDs to be added as pages or added to the page area. */
    pages?: number | string | number[] | string[];

    /**
     * Specifies whether to apply fields only to the pivot table reports. If `true`, the specified fields
     * will be added to the report
     * without replacing existing fields. If `false`, existing fields will be replaced with the new fields.
     */
    addToTable?: boolean;
  }

  /** The report filter area settings. */
  export interface PivotTableFilterAreaInfo {
    /** Specifies how the report filter fields are located. */
    Type: FieldsInReportFilterType;

    /** Defines the number of the report filter fields. */
    ReportFilterFields: number;
  }

  /** Available placeholder types. */
  export type PlaceholderType = "body" | "chart" | "clipArt" | "ctrTitle" | "diagram" | "date" | "footer" | "header" | "media" | "object" | "picture" | "sldImage" | "sldNumber" | "subTitle" | "table" | "title";

  /** 60000th of a degree (5400000 = 90 degrees). */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%). */
  export type PositivePercentage = number;

  /** The available preset color names. */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** Specifies the user type of the protected range. */
  export type ProtectedRangeUserType = "CanEdit" | "CanView" | "NotView";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** The cell reference type. */
  export type ReferenceStyle = 'xlA1' | 'xlR1C1';

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

  /** Properties to make search and replace. */
  export interface ReplaceData {
    /** The data to search for. */
    What: string | undefined;

    /** The replacement string. */
    Replacement: string;

    /** Specifies whether the whole search text or any part of the search text is matched. */
    LookAt: XlLookAt;

    /** Range search order - by rows or by columns. */
    SearchOrder: XlSearchOrder;

    /** Range search direction - next match or previous match. */
    SearchDirection: XlSearchDirection;

    /** Case sensitive or not. The default value is "false". */
    MatchCase: boolean;

    /** Specifies if all the found data will be replaced or not. The default value is "true". */
    ReplaceAll: boolean;
  }

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

  /** Properties to make search. */
  export interface SearchData {
    /** The data to search for. */
    What: string | undefined;

    /**
     * The cell after which you want the search to begin. If this argument is not specified, the search
     * starts after the cell in the upper-left corner of the range.
     */
    After: ApiRange;

    /** Search data type (formulas or values). */
    LookIn: XlFindLookIn;

    /** Specifies whether the whole search text or any part of the search text is matched. */
    LookAt: XlLookAt;

    /** Range search order - by rows or by columns. */
    SearchOrder: XlSearchOrder;

    /** Range search direction - next match or previous match. */
    SearchDirection: XlSearchDirection;

    /** Case sensitive or not. The default value is "false". */
    MatchCase: boolean;
  }

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

  /** Represents the type of objects in a selection. */
  export type SelectionType = "none" | "shapes" | "slides" | "text";

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

  /** Specifies whether the first row of the sort range contains the header information. */
  export type SortHeader = "xlNo" | "xlYes";

  /** Specifies the sort order. */
  export type SortOrder = "xlAscending" | "xlDescending";

  /** Specifies if the sort should be by row or column. */
  export type SortOrientation = "xlSortColumns" | "xlSortRows";

  /**
   * A numeric value between 1 and 8 that specifies which statistic will be returned.
   * **1** - Alpha parameter of ETS algorithm - the base value parameter.
   * **2** - Beta parameter of ETS algorithm - the trend value parameter.
   * **3** - Gamma parameter of ETS algorithm - the seasonality value parameter.
   * **4** - MASE (mean absolute scaled error) metric - a measure of the accuracy of forecasts.
   * **5** - SMAPE (symmetric mean absolute percentage error) metric - a measure of the accuracy based on
   * percentage errors.
   * **6** - MAE (mean absolute error) metric - a measure of the accuracy of forecasts.
   * **7** - RMSE (root mean squared error) metric - a measure of the differences between predicted and
   * observed values.
   * **8** - Step size detected in the timeline.
   */
  export type StatisticType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /** The style type used for the document element. */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Types of custom tab. */
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
   * **"none"** - does not display the selected tick labels.
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

  /** The available slide transition speed values (similar to PowerPoint VBA ppTransitionSpeed). */
  export type TransitionSpeed = "slow" | "medium" | "fast";

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

  /** The validation alert style. */
  export type ValidationAlertStyle = "xlValidAlertStop" | "xlValidAlertWarning" | "xlValidAlertInformation";

  /** The validation operator. */
  export type ValidationOperator = "xlBetween" | "xlNotBetween" | "xlEqual" | "xlNotEqual" | "xlGreater" | "xlLess" | "xlGreaterEqual" | "xlLessEqual";

  /** The validation type. */
  export type ValidationType = "xlValidateInputOnly" | "xlValidateWholeNumber" | "xlValidateDecimal" | "xlValidateList" | "xlValidateDate" | "xlValidateTime" | "xlValidateTextLength" | "xlValidateCustom";

  /**
   * The available text vertical alignment (used to align text in a shape with a placement for text
   * inside it).
   */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction. */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type. */
  export type WatermarkType = "none" | "text" | "image";

  /** Filter type. */
  export type XlAutoFilterOperator = "xlAnd" | "xlBottom10Items" | "xlBottom10Percent" | "xlFilterCellColor" | "xlFilterDynamic" | "xlFilterFontColor" | "xlFilterValues" | "xlOr" | "xlTop10Items" | "xlTop10Percent";

  /** The calculation scope for pivot table conditional formatting. */
  export type XlCalcFor = "xlAllValues" | "xlColItems" | "xlRowItems";

  /** The condition value types for color scale conditional formatting criteria. */
  export type XlConditionValueTypes = "xlConditionValueAutomaticMax" | "xlConditionValueAutomaticMin" | "xlConditionValueHighestValue" | "xlConditionValueLowestValue" | "xlConditionValueNone" | "xlConditionValueNumber" | "xlConditionValuePercent" | "xlConditionValuePercentile" | "xlConditionValueFormula";

  /** The operator for text-based conditional formatting. */
  export type XlContainsOperator = "xlContains" | "xlDoesNotContain" | "xlBeginsWith" | "xlEndsWith";

  /** The data bar axis position. */
  export type XlDataBarAxisPosition = "xlDataBarAxisAutomatic" | "xlDataBarAxisMidpoint" | "xlDataBarAxisNone";

  /** The data bar fill type. */
  export type XlDataBarFillType = "xlDataBarFillSolid" | "xlDataBarFillGradient";

  /** Specifies whether to format duplicate or unique values. */
  export type XlDuplicateValues = "xlDuplicate" | "xlUnique";

  /** Specifies the filter criterion. */
  export type XlDynamicFilterCriteria = "xlFilterAboveAverage" | "xlFilterAllDatesInPeriodApril" | "xlFilterAllDatesInPeriodAugust" | "xlFilterAllDatesInPeriodDecember" | "xlFilterAllDatesInPeriodFebruary" | "xlFilterAllDatesInPeriodJanuary" | "xlFilterAllDatesInPeriodJuly" | "xlFilterAllDatesInPeriodJune" | "xlFilterAllDatesInPeriodMarch" | "xlFilterAllDatesInPeriodMay" | "xlFilterAllDatesInPeriodNovember" | "xlFilterAllDatesInPeriodOctober" | "xlFilterAllDatesInPeriodQuarter1" | "xlFilterAllDatesInPeriodQuarter2" | "xlFilterAllDatesInPeriodQuarter3" | "xlFilterAllDatesInPeriodQuarter4" | "xlFilterBelowAverage" | "xlFilterLastMonth" | "xlFilterLastQuarter" | "xlFilterLastWeek" | "xlFilterLastYear" | "xlFilterNextMonth" | "xlFilterNextQuarter" | "xlFilterNextWeek" | "xlFilterNextYear" | "xlFilterThisMonth" | "xlFilterThisQuarter" | "xlFilterThisWeek" | "xlFilterThisYear" | "xlFilterToday" | "xlFilterTomorrow" | "xlFilterYearToDate" | "xlFilterYesterday";

  /** Search data type (formulas or values). */
  export type XlFindLookIn = "xlFormulas" | "xlValues";

  /** The format condition operator. */
  export type XlFormatConditionOperator = "xlBetween" | "xlNotBetween" | "xlEqual" | "xlNotEqual" | "xlGreater" | "xlLess" | "xlGreaterEqual" | "xlLessEqual" | "xlBeginsWith" | "xlEndsWith" | "xlContains" | "xlNotContains";

  /** The conditional formatting type. */
  export type XlFormatConditionType = "xlCellValue" | "xlExpression" | "xlTop10" | "xlAboveAverageCondition" | "xlUniqueValues" | "xlTextString" | "xlBlanksCondition" | "xlNoBlanksCondition" | "xlTimePeriod" | "xlErrorsCondition" | "xlNoErrorsCondition" | "xlColorScale" | "xlDataBar" | "xlIconSet";

  /** The icon constants for conditional formatting. */
  export type XlIcon = "xlIcon0Bars" | "xlIcon0FilledBoxes" | "xlIcon1Bar" | "xlIcon1FilledBox" | "xlIcon2Bars" | "xlIcon2FilledBoxes" | "xlIcon3Bars" | "xlIcon3FilledBoxes" | "xlIcon4Bars" | "xlIcon4FilledBoxes" | "xlIconBlackCircle" | "xlIconBlackCircleWithBorder" | "xlIconCircleWithOneWhiteQuarter" | "xlIconCircleWithThreeWhiteQuarters" | "xlIconCircleWithTwoWhiteQuarters" | "xlIconGoldStar" | "xlIconGrayCircle" | "xlIconGrayDownArrow" | "xlIconGrayDownInclineArrow" | "xlIconGraySideArrow" | "xlIconGrayUpArrow" | "xlIconGrayUpInclineArrow" | "xlIconGreenCheck" | "xlIconGreenCheckSymbol" | "xlIconGreenCircle" | "xlIconGreenFlag" | "xlIconGreenTrafficLight" | "xlIconGreenUpArrow" | "xlIconGreenUpTriangle" | "xlIconHalfGoldStar" | "xlIconNoCellIcon" | "xlIconPinkCircle" | "xlIconRedCircle" | "xlIconRedCircleWithBorder" | "xlIconRedCross" | "xlIconRedCrossSymbol" | "xlIconRedDiamond" | "xlIconRedDownArrow" | "xlIconRedDownTriangle" | "xlIconRedFlag" | "xlIconRedTrafficLight" | "xlIconSilverStar" | "xlIconWhiteCircleAllWhiteQuarters" | "xlIconYellowCircle" | "xlIconYellowDash" | "xlIconYellowDownInclineArrow" | "xlIconYellowExclamation" | "xlIconYellowExclamationSymbol" | "xlIconYellowFlag" | "xlIconYellowSideArrow" | "xlIconYellowTrafficLight" | "xlIconYellowTriangle" | "xlIconYellowUpInclineArrow";

  /** The icon set types for conditional formatting. */
  export type XlIconSet = "xl3Arrows" | "xl3ArrowsGray" | "xl3Flags" | "xl3TrafficLights1" | "xl3TrafficLights2" | "xl3Signs" | "xl3Symbols" | "xl3Symbols2" | "xl4Arrows" | "xl4ArrowsGray" | "xl4RedToBlack" | "xl4CRV" | "xl4TrafficLights" | "xl5Arrows" | "xl5ArrowsGray" | "xl5CRV" | "xl5Quarters" | "xl3Stars" | "xl3Triangles" | "xl5Boxes";

  /** Specifies whether the whole search text or any part of the search text is matched. */
  export type XlLookAt = "xlWhole" | "xlPart";

  /** The scope for pivot table conditional formatting rules. */
  export type XlPivotConditionScope = "xlFieldsScope" | "xlSelectionScope" | "xlDataFieldScope";

  /** The pivot filter type. */
  export type XlPivotFilterType = "xlAfter" | "xlAfterOrEqualTo" | "xlAllDatesInPeriodApril" | "xlAllDatesInPeriodAugust" | "xlAllDatesInPeriodDecember" | "xlAllDatesInPeriodFebruary" | "xlAllDatesInPeriodJanuary" | "xlAllDatesInPeriodJuly" | "xlAllDatesInPeriodJune" | "xlAllDatesInPeriodMarch" | "xlAllDatesInPeriodMay" | "xlAllDatesInPeriodNovember" | "xlAllDatesInPeriodOctober" | "xlAllDatesInPeriodQuarter1" | "xlAllDatesInPeriodQuarter2" | "xlAllDatesInPeriodQuarter3" | "xlAllDatesInPeriodQuarter4" | "xlAllDatesInPeriodSeptember" | "xlBefore" | "xlBeforeOrEqualTo" | "xlBottomCount" | "xlBottomPercent" | "xlBottomSum" | "xlCaptionBeginsWith" | "xlCaptionContains" | "xlCaptionDoesNotBeginWith" | "xlCaptionDoesNotContain" | "xlCaptionDoesNotEndWith" | "xlCaptionDoesNotEqual" | "xlCaptionEndsWith" | "xlCaptionEquals" | "xlCaptionIsBetween" | "xlCaptionIsGreaterThan" | "xlCaptionIsGreaterThanOrEqualTo" | "xlCaptionIsLessThan" | "xlCaptionIsLessThanOrEqualTo" | "xlCaptionIsNotBetween" | "xlDateBetween" | "xlDateLastMonth" | "xlDateLastQuarter" | "xlDateLastWeek" | "xlDateLastYear" | "xlDateNextMonth" | "xlDateNextQuarter" | "xlDateNextWeek" | "xlDateNextYear" | "xlDateThisMonth" | "xlDateThisQuarter" | "xlDateThisWeek" | "xlDateThisYear" | "xlDateToday" | "xlDateTomorrow" | "xlDateYesterday" | "xlNotSpecificDate" | "xlSpecificDate" | "xlTopCount" | "xlTopPercent" | "xlTopSum" | "xlValueDoesNotEqual" | "xlValueEquals" | "xlValueIsBetween" | "xlValueIsGreaterThan" | "xlValueIsGreaterThanOrEqualTo" | "xlValueIsLessThan" | "xlValueIsLessThanOrEqualTo" | "xlValueIsNotBetween" | "xlYearToDate";

  /** The reading order for data bars. */
  export type XlReadingOrder = "xlLTR" | "xlRTL" | "xlContext";

  /** Range search direction - next match or previous match. */
  export type XlSearchDirection = "xlNext" | "xlPrevious";

  /** Range search order - by rows or by columns. */
  export type XlSearchOrder = "xlByRows" | "xlByColumns";

  /** The time period for conditional formatting. */
  export type XlTimePeriods = "xlToday" | "xlYesterday" | "xlTomorrow" | "xlLast7Days" | "xlLastWeek" | "xlThisWeek" | "xlNextWeek" | "xlLastMonth" | "xlThisMonth" | "xlNextMonth";

  /** The top/bottom type for conditional formatting rules. */
  export type XlTopBottom = "xlTop10Top" | "xlTop10Bottom";

  /** Underline type. */
  export type XlUnderlineStyle = "xlUnderlineStyleDouble" | "xlUnderlineStyleDoubleAccounting" | "xlUnderlineStyleNone" | "xlUnderlineStyleSingle" | "xlUnderlineStyleSingleAccounting";

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

  // Manual overrides (see src/overrides/cell.ts) for types sdkjs's own JSDoc doesn't
  // resolve from this package's usual sources
  /**
   * `ApiWorksheet.GetHyperlinks`/`ApiRange.GetHyperlinks` are documented with `@returns {ApiHyperlinks}`,
   * but there is no `ApiHyperlinks` class anywhere in sdkjs (checked out or the deploy bundle) - a
   * naming mistake in sdkjs's own JSDoc. Both implementations actually
   * `.map(elem => new ApiHyperlink(elem, ws))`, i.e. a plain array of the real (singular) `ApiHyperlink`
   * class already generated in this file.
   */
  export type ApiHyperlinks = ApiHyperlink[];
  export interface ApiListObject {
    /** Returns whether the active cell is within the range of the table. */
    GetActive(): boolean;
    /** Returns the alternative text for the table. */
    GetAlternativeText(): string;
    /** Sets the alternative text for the table. */
    SetAlternativeText(sAltText: string): void;
    /** Returns the comment (summary alternative text) for the table. */
    GetComment(): string;
    /** Sets the comment (summary alternative text) for the table. */
    SetComment(sComment: string): void;
    /** Returns the name of the table. */
    GetName(): string;
    /** Sets the name of the table. Equivalent to SetDisplayName. Returns false if the name is invalid or already used by another table. */
    SetName(name: string): boolean;
    /** Returns the worksheet that is the parent of the table. */
    GetParent(): ApiWorksheet;
    /** Returns the display name of the table. */
    GetDisplayName(): string;
    /** Sets the display name of the table. Returns false if the name is invalid or already used by another table. */
    SetDisplayName(sDisplayName: string): boolean;
    /** Returns the range of the table, or null if the table has no range. */
    GetRange(): ApiRange | null;
    /** Returns the range of the header row, or null if the table has no header row. */
    GetHeaderRowRange(): ApiRange | null;
    /** Returns whether the AutoFilter dropdown buttons are displayed on the header row. Defaults to true for a new table. */
    GetShowAutoFilter(): boolean;
    /** Sets whether the AutoFilter is present on the table. Setting to false removes it entirely; true creates it if not present. */
    SetShowAutoFilter(show: boolean): void;
    /** Returns whether the AutoFilter dropdown arrows are displayed on the header row. Defaults to true for a new table. */
    GetShowAutoFilterDropDown(): boolean;
    /** Sets whether the AutoFilter dropdown arrows are displayed; does not remove the AutoFilter itself. */
    SetShowAutoFilterDropDown(bShow: boolean): void;
    /** Returns whether the header row is displayed for the table. */
    GetShowHeaders(): boolean;
    /** Sets whether the header row is displayed for the table. */
    SetShowHeaders(show: boolean): void;
    /** Returns the AutoFilter object for the table, or null if the table has no autofilter. */
    GetAutoFilter(): ApiAutoFilter | null;
    /** Returns the range of the data rows, excluding the header and totals rows; null if the table has no data rows. */
    GetDataBodyRange(): ApiRange | null;
    /** Returns whether banded column formatting is applied to the table. */
    GetShowTableStyleColumnStripes(): boolean;
    /** Sets whether banded column formatting is applied to the table. */
    SetShowTableStyleColumnStripes(show: boolean): void;
    /** Returns whether the first-column style is applied to the table. */
    GetShowTableStyleFirstColumn(): boolean;
    /** Sets whether the first-column style is applied to the table. */
    SetShowTableStyleFirstColumn(show: boolean): void;
    /** Returns whether the last-column style is applied to the table. */
    GetShowTableStyleLastColumn(): boolean;
    /** Sets whether the last-column style is applied to the table. */
    SetShowTableStyleLastColumn(show: boolean): void;
    /** Returns whether banded row formatting is applied to the table. */
    GetShowTableStyleRowStripes(): boolean;
    /** Sets whether banded row formatting is applied to the table. */
    SetShowTableStyleRowStripes(show: boolean): void;
    /** Returns whether the totals row is displayed for the table. */
    GetShowTotals(): boolean;
    /** Sets whether the totals row is displayed for the table. */
    SetShowTotals(show: boolean): void;
    /** Deletes the table and clears the cell formatting. */
    Delete(): void;
    /** Removes the list functionality from the table and converts it to a regular data range; cell data/formatting/formulas remain. */
    Unlist(): void;
    /** Resizes the table to a new range (as an ApiRange or an address string, e.g. `"A1:D10"`). Cells are not inserted or moved. */
    Resize(Range: ApiRange | string): void;
    /** Returns the source type of the table. Always `"xlSrcRange"` for range-based tables. */
    GetSourceType(): string;
    /** Returns the name of the table style applied to the table. */
    GetTableStyle(): string;
    /** Sets the table style by name. */
    SetTableStyle(styleName: string): void;
    /** Returns the range of the totals row, or null if the table has no totals row. */
    GetTotalsRowRange(): ApiRange | null;
    /** Returns the summary description (alternative text summary) for the table. */
    GetSummary(): string;
    /** Sets the summary description (alternative text summary) for the table. */
    SetSummary(summary: string): void;
    /** Returns all columns in the table. */
    GetListColumns(): ApiListColumn[];
    /** Adds a new column at the specified 1-based position (appended at the end if omitted). Returns null if the position is invalid. */
    AddListColumn(nPosition?: number): ApiListColumn | null;
    /** Returns all data rows in the table, excluding the header and totals rows. */
    GetListRows(): ApiListRow[];
    /** Adds a new data row at the specified 1-based position within the data body (appended at the end if omitted). `bAlwaysInsert` (default true) specifies whether cells outside the table are shifted. Returns null if the position is invalid. */
    AddListRow(nPosition?: number, bAlwaysInsert?: boolean): ApiListRow | null;
    /** Returns the Sort object for this table. */
    GetSort(): ApiSort;
  }
  /**
   * `ApiFormatCondition`/`ApiAboveAverage` etc.'s `GetPTCondition()` (and the `PTCondition` property
   * alias) return `this.rule.pivot` directly - an internal pivot-table rule object with no public
   * `Api*` wrapper class anywhere in sdkjs, checked-out or bundled. There is nothing to model here;
   * `unknown` is the honest type, not a resolution gap to eventually fill in.
   */
  export type PTCondition = unknown;

  // Cross-file type stubs
  export type ApiListColumn = unknown;
  export type ApiListRow = unknown;
  export type ApiSort = unknown;

  /**
   * Base class.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/
   */
  export interface Api {
    /**
     * Returns an array of ApiComment objects.
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name (optional).
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor: string): ApiComment | null;

    /**
     * Creates a new custom function.
     * The description of the function parameters and result is specified using JSDoc. The
     * *@customfunction* tag is required in JSDoc.
     * Parameters and results can be specified as the *number / string / boolean / any / number[][] /
     * string[][] / boolean[][] / any[][]* types.
     * Parameters can be required or optional. A user can also set a default value.
     * The passed function can be asynchronous (async function or function returning a Promise).
     * Inside the passed function, you can access the current cell address where the calculation is
     * performed using *this.address*.
     * You can also access the addresses of function arguments using *this.args[0].address*,
     * *this.args[1].address*, etc.
     * This method is not used in ONLYOFFICE Document Builder. Use AddCustomFunctionLibrary instead.
     *
     * @param fCustom - A new function for calculating. Can be synchronous or asynchronous.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/AddCustomFunction/
     */
    AddCustomFunction(fCustom: (...args: unknown[]) => unknown): void;

    /**
     * Registers a new custom functions library (see the **SetCustomFunctions** plugin method).
     * The description of the function parameters and result is specified using JSDoc. The
     * *@customfunction* tag is required in JSDoc.
     * Parameters and results can be specified as the *number / string / boolean / any / number[][] /
     * string[][] / boolean[][] / any[][]* types.
     * Parameters can be required or optional. A user can also set a default value.
     *
     * @param sName - The library name.
     * @param Func - The custom functions library code.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/AddCustomFunctionLibrary/
     */
    AddCustomFunctionLibrary(sName: string, Func: (...args: unknown[]) => unknown): void;

    /**
     * Adds a new name to a range of cells.
     *
     * @param sName - The range name.
     * @param sRef - The reference to the specified range. It must contain the sheet name, followed by sign ! and a
     *   range of cells. Example: "Sheet1!$A$1:$B$2".
     * @param isHidden - Defines if the range name is hidden or not.
     * @returns returns false if sName or sRef are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/AddDefName/
     */
    AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;

    /**
     * Creates a new worksheet. The new worksheet becomes the active sheet.
     *
     * @param sName - The name of a new worksheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/AddSheet/
     */
    AddSheet(sName: string): ApiWorksheet;

    /**
     * Recalculates the cells that need recalculation (changed, added or volatile) across the active
     * workbook, similar to Application.Calculate in VBA. Forces the recalc that is otherwise deferred
     * until a macro finishes, so up-to-date formula results can be read within the same macro.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Calculate/
     */
    Calculate(): boolean;

    /**
     * Converts centimeters to points.
     *
     * @param cm - The number of centimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CentimetersToPoints/
     */
    CentimetersToPoints(cm: number): number;

    /**
     * Clears all custom functions.
     *
     * @returns returns false if such functions do not exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/ClearCustomFunctions/
     */
    ClearCustomFunctions(): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Color/
     */
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;

    /**
     * Creates a blip fill to apply to the object using the selected image as the object background.
     *
     * @param imageUrl - The path to the image used for the blip fill (currently only internet URL or Base64 encoded
     *   images are supported).
     * @param blipFillType - The type of the fill used for the blip fill (tile or stretch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateBlipFill/
     */
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;

    /**
     * Creates a bullet for a paragraph with the character or symbol specified with the sSymbol parameter.
     *
     * @param sSymbol - The character or symbol which will be used to create the bullet for the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateBullet/
     */
    CreateBullet(sSymbol: string): ApiBullet;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param sPresetColor - A preset selected from the list of the available color preset names.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateColorByName/
     */
    CreateColorByName(sPresetColor: PresetColor): ApiColor;

    /**
     * Creates an RGB color setting the appropriate values for the red, green and blue color components.
     *
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateColorFromRGB/
     */
    CreateColorFromRGB(r: number, g: number, b: number): ApiColor;

    /**
     * Creates a new custom geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateCustomGeometry/
     */
    CreateCustomGeometry(): ApiGeometry;

    /**
     * Creates a gradient stop used for different types of gradients.
     *
     * @param color - The color used for the gradient stop.
     * @param pos - The position of the gradient stop measured in 1000th of percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateGradientStop/
     */
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;

    /**
     * Creates a linear gradient fill to apply to the object using the selected linear gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     * @param angle - The angle measured in 60000th of a degree that will define the gradient direction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateLinearGradientFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateMath/
     */
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;

    /**
     * Creates a new history point.
     *
     * @returns returns true if the history point was created successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateNewHistoryPoint/
     */
    CreateNewHistoryPoint(): boolean;

    /**
     * Creates no fill and removes the fill from the element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateNoFill/
     */
    CreateNoFill(): ApiFill;

    /**
     * Creates a bullet for a paragraph with the numbering character or symbol specified with the numType
     * parameter.
     *
     * @param numType - The numbering type the paragraphs will be numbered with.
     * @param startAt - The number the first numbered paragraph will start with.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateNumbering/
     */
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;

    /**
     * Creates a new paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateParagraph/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreatePatternFill/
     */
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param presetColor - A preset selected from the list of the available color preset names.
     * @returns ;
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreatePresetColor/
     */
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;

    /**
     * Creates a geometry using one of the available preset shapes.
     *
     * @param preset - The preset name.
     * @default preset = "rect"
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreatePresetGeometry/
     */
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;

    /**
     * Creates an RGB color setting the appropriate values for the red, green and blue color components.
     *
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateRGBColor/
     */
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;

    /**
     * Creates a radial gradient fill to apply to the object using the selected radial gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateRadialGradientFill/
     */
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;

    /**
     * Creates a new smaller text block to be inserted to the current paragraph or table.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateRun/
     */
    CreateRun(): ApiRun;

    /**
     * Creates a complex color scheme selecting from one of the available schemes.
     *
     * @param schemeColorId - The color scheme identifier.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateSchemeColor/
     */
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;

    /**
     * Creates a shadow which can be applied to a graphic object.
     *
     * @param settings - The shadow properties.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateShadow/
     */
    CreateShadow(settings: ShadowSettings): ApiShadow;

    /**
     * Creates a solid fill to apply to the object using a selected solid color as the object background.
     *
     * @param color - The color used for the element fill.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateSolidFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateStroke/
     */
    CreateStroke(width: EMU, fill: ApiFill, sDash?: DashType): ApiStroke;

    /**
     * Creates the empty text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/CreateTextPr/
     */
    CreateTextPr(): ApiTextPr;

    /**
     * Converts English Metric Units (EMUs) to millimeters.
     *
     * @param emu - The value in English Metric Units (EMUs).
     * @returns The value in millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/EmusToMillimeters/
     */
    EmusToMillimeters(emu: EMU): mm;

    /**
     * Converts EMUs (English Metric Units) to points.
     *
     * @param emu - The number of EMUs to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/EmusToPoints/
     */
    EmusToPoints(emu: number): number;

    /**
     * Returns a class formatted according to the instructions contained in the format expression.
     *
     * @param expression - Any valid expression.
     * @param format - A valid named or user-defined format expression.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Format/
     */
    Format(expression: string, format?: string): string;

    /**
     * Returns an object that represents the active sheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetActiveSheet/
     */
    GetActiveSheet(): ApiWorksheet;

    /**
     * Returns an object that represents the active workbook.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetActiveWorkbook/
     */
    GetActiveWorkbook(): ApiWorkbook;

    /**
     * Returns all comments from the current workbook including comments from all worksheets.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetAllComments/
     */
    GetAllComments(): ApiComment[];

    /**
     * Returns all pivot tables.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetAllPivotTables/
     */
    GetAllPivotTables(): ApiPivotTable[];

    /**
     * Returns a comment from the current document by its ID.
     *
     * @param sId - The comment ID.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetCommentById/
     */
    GetCommentById(sId: string): ApiComment;

    /**
     * Returns all comments related to the whole workbook.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetComments/
     */
    GetComments(): ApiComment[];

    /**
     * Returns the core properties interface for the workbook.
     * This method is used to view or modify standard metadata such as title, author, and keywords.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetCore/
     */
    GetCore(): ApiCore;

    /**
     * Returns the workbook custom properties.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetCustomProperties/
     */
    GetCustomProperties(): ApiCustomProperties;

    /**
     * Returns the ApiName object by the range name.
     *
     * @param defName - The range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetDefName/
     */
    GetDefName(defName: string): ApiName;

    /**
     * Returns the document information:
     * **Application** - the application the document has been created with.
     * **CreatedRaw** - the date and time when the file was created.
     * **Created** - the parsed date and time when the file was created.
     * **LastModifiedRaw** - the date and time when the file was last modified.
     * **LastModified** - the parsed date and time when the file was last modified.
     * **LastModifiedBy** - the name of the user who has made the latest change to the document.
     * **Authors** - the persons who has created the file.
     * **Title** - this property allows you to simplify your documents classification.
     * **Tags** - this property allows you to simplify your documents classification.
     * **Subject** - this property allows you to simplify your documents classification.
     * **Comment** - this property allows you to simplify your documents classification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetDocumentInfo/
     */
    GetDocumentInfo(): object;

    /**
     * Returns the freeze panes type.
     *
     * @returns FreezePaneType - The freeze panes type ("null" if there are no freeze panes).
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetFreezePanesType/
     */
    GetFreezePanesType(): FreezePaneType;

    /**
     * Returns the full name of the currently opened file.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Returns the current locale ID.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetLocale/
     */
    GetLocale(): number;

    /**
     * Returns the mail merge data.
     *
     * @param nSheet - The sheet index.
     * @param bWithFormat - Specifies that the data will be received with the format.
     * @default bWithFormat = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetMailMergeData/
     */
    GetMailMergeData(nSheet: number, bWithFormat?: boolean): string[][];

    /**
     * Returns a pivot table by its name, or null if it does not exist.
     *
     * @param name - The pivot table name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetPivotByName/
     */
    GetPivotByName(name: string): ApiPivotTable | null;

    /**
     * Returns the ApiRange object by the range reference.
     *
     * @param sRange - The range of cells from the current sheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetRange/
     */
    GetRange(sRange: string): ApiRange;

    /**
     * Returns the cell reference style.
     *
     * @returns The cell reference style.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetReferenceStyle/
     */
    GetReferenceStyle(): ReferenceStyle;

    /**
     * Returns an object that represents the selected range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetSelection/
     */
    GetSelection(): ApiRange;

    /**
     * Returns an object that represents a sheet.
     *
     * @param nameOrIndex - Sheet name or sheet index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetSheet/
     */
    GetSheet(nameOrIndex: string | number): ApiWorksheet | null;

    /**
     * Returns a sheet collection that represents all the sheets in the active workbook.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetSheets/
     */
    GetSheets(): ApiWorksheet[];

    /**
     * Returns a list of all the available theme colors for the spreadsheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetThemesColors/
     */
    GetThemesColors(): string[];

    /**
     * Returns the ApiWorksheetFunction object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/GetWorksheetFunction/
     */
    GetWorksheetFunction(): ApiWorksheetFunction;

    /**
     * Creates a color from a HEX string.
     *
     * @param hexString - The HEX string representing a color.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/HexColor/
     */
    HexColor(hexString: string): ApiColor;

    /**
     * Converts inches to points.
     *
     * @param inches - The number of inches to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/InchesToPoints/
     */
    InchesToPoints(inches: number): number;

    /**
     * Inserts the specified pivot table into an existing worksheet.
     *
     * @param dataRef - The source data range.
     * @param pivotRef - A range in which the pivot table will be located.
     * @param confirmation - Specifies whether to replace the data in the specified pivot table range (if it exists) or
     *   create a dialog box for this (if it exists).
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/InsertPivotExistingWorksheet/
     */
    InsertPivotExistingWorksheet(dataRef: ApiRange, pivotRef: ApiRange, confirmation: boolean): ApiPivotTable;

    /**
     * Inserts the specified pivot table into a new worksheet.
     *
     * @param dataRef - The source data range.
     * @param newSheetName - A new worksheet name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/InsertPivotNewWorksheet/
     */
    InsertPivotNewWorksheet(dataRef: ApiRange, newSheetName?: ApiRange): ApiPivotTable;

    /**
     * Returns the ApiRange object that represents the rectangular intersection of two or more ranges. If
     * one or more ranges from a different worksheet are specified, an error will be returned.
     *
     * @param Range1 - One of the intersecting ranges. At least two Range objects must be specified.
     * @param Range2 - One of the intersecting ranges. At least two Range objects must be specified.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Intersect/
     */
    Intersect(Range1: ApiRange, Range2: ApiRange): ApiRange | null;

    /**
     * Converts lines to points (1 line = 12 points).
     *
     * @param lines - The number of lines to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/LinesToPoints/
     */
    LinesToPoints(lines: number): number;

    /**
     * Converts millimeters to English Metric Units (EMUs).
     * The result is an integer value.
     *
     * @param mm - The value in millimeters.
     * @returns The value in English Metric Units (EMUs), as an integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/MillimetersToEmus/
     */
    MillimetersToEmus(mm: mm): EMU;

    /**
     * Converts millimeters to pixels.
     *
     * @param mm - The number of millimeters to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/MillimetersToPixels/
     */
    MillimetersToPixels(mm: number): number;

    /**
     * Converts millimeters to points.
     *
     * @param mm - The number of millimeters to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/MillimetersToPoints/
     */
    MillimetersToPoints(mm: number): number;

    /**
     * Converts picas to points.
     *
     * @param pc - The number of picas to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PicasToPoints/
     */
    PicasToPoints(pc: number): number;

    /**
     * Converts pixels to EMUs (English Metric Units).
     *
     * @param px - The number of pixels to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PixelsToEmu/
     */
    PixelsToEmus(px: number): number;

    /**
     * Converts pixels to points.
     *
     * @param px - The number of pixels to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PixelsToPoints/
     */
    PixelsToPoints(px: number): number;

    /**
     * Converts points to centimeters.
     *
     * @param pt - The number of points to convert to centimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToCentimeters/
     */
    PointsToCentimeters(pt: number): number;

    /**
     * Converts points to EMUs (English Metric Units).
     *
     * @param pt - The number of points to convert to EMUs.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToEmus/
     */
    PointsToEmus(pt: number): number;

    /**
     * Converts points to inches.
     *
     * @param pt - The number of points to convert to inches.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToInches/
     */
    PointsToInches(pt: number): number;

    /**
     * Converts points to lines (1 line = 12 points).
     *
     * @param pt - The number of points to convert to lines.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToLines/
     */
    PointsToLines(pt: number): number;

    /**
     * Converts points to millimeters.
     *
     * @param pt - The number of points to convert to millimeters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToMillimeters/
     */
    PointsToMillimeters(pt: number): number;

    /**
     * Converts points to picas (1 pica = 12 points).
     *
     * @param pt - The number of points to convert to picas.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToPicas/
     */
    PointsToPicas(pt: number): number;

    /**
     * Converts points to pixels.
     *
     * @param pt - The number of points to convert to pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToPixels/
     */
    PointsToPixels(pt: number): number;

    /**
     * Converts points to twips.
     *
     * @param pt - The number of points to convert to twips.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/PointsToTwips/
     */
    PointsToTwips(pt: number): number;

    /**
     * Creates an RGB color from red, green and blue components.
     *
     * @param r - Red component (0-255).
     * @param g - Green component (0-255).
     * @param b - Blue component (0-255).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/RGB/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/RGBA/
     */
    RGBA(r: number, g: number, b: number, a: number): ApiColor;

    /**
     * Recalculates all formulas in the active workbook.
     *
     * @param fLogger - A function which specifies the logger object for checking recalculation of formulas.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/RecalculateAllFormulas/
     */
    RecalculateAllFormulas(fLogger?: (...args: unknown[]) => unknown): boolean;

    /**
     * Redraws the editor screen, making the changes already made by a macro visible without waiting for it
     * to finish. Observable from asynchronous code only. Repaints without recalculating: call
     * {@link Api#Calculate} first if formula results must be up to date.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Redraw/
     */
    Redraw(): boolean;

    /**
     * Refreshes all pivot tables.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/RefreshAllPivots/
     */
    RefreshAllPivots(): void;

    /**
     * Removes a custom function.
     *
     * @param sName - The name of a custom function.
     * @returns returns false if such a function does not exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/RemoveCustomFunction/
     */
    RemoveCustomFunction(sName: string): boolean;

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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/ReplaceTextSmart/
     */
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;

    /**
     * Saves changes to the specified document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/Save/
     */
    Save(): boolean;

    /**
     * Sets a type to the freeze panes.
     *
     * @param FreezePaneType - The freeze panes type ("null" to unfreeze).
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/SetFreezePanesType/
     */
    SetFreezePanesType(FreezePaneType: FreezePaneType): void;

    /**
     * Sets a locale to the document.
     *
     * @param LCID - The locale specified.
     * @returns returns true if the locale was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/SetLocale/
     */
    SetLocale(LCID: number): boolean;

    /**
     * Sets the cell reference style.
     *
     * @param sReferenceStyle - The cell reference style.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/SetReferenceStyle/
     */
    SetReferenceStyle(sReferenceStyle: ReferenceStyle): void;

    /**
     * Sets the theme colors to the current spreadsheet.
     *
     * @param sTheme - The color scheme that will be set to the current spreadsheet.
     * @returns returns false if sTheme isn't a string.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/SetThemeColors/
     */
    SetThemeColors(sTheme: string): boolean;

    /**
     * Creates a theme color.
     *
     * @param name - The theme color name. If the provided name is not supported, the 'tx1' color will be used.
     * @default name = "tx1"
     * @returns Instance of ApiColor with 'theme' type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/ThemeColor/
     */
    ThemeColor(name?: SchemeColorId): ApiColor;

    /**
     * Converts twips to points.
     *
     * @param twips - The number of twips to convert to points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/TwipsToPoints/
     */
    TwipsToPoints(twips: number): number;

    /**
     * Subscribes to the specified event and calls the callback function when the event fires.
     *
     * @param eventName - The event name.
     * @param callback - Function to be called when the event fires.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/attachEvent/
     */
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): void;

    /**
     * Unsubscribes from the specified event.
     *
     * @param eventName - The event name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/Api/Methods/detachEvent/
     */
    detachEvent(eventName: string): void;
  }

  /**
   * Class representing an above average conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/
   */
  export interface ApiAboveAverage extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns whether the rule is configured to detect values above or below the average.
     *
     * @returns True if the rule targets above-average values; false if it targets below-average values.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/Methods/GetAboveBelow/
     */
    GetAboveBelow(): boolean;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the number of standard deviations from the average.
     *
     * @returns The number of standard deviations from the average.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/Methods/GetNumStdDev/
     */
    GetNumStdDev(): number;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the type of the above average conditional formatting rule.
     *
     * @returns The type of the above average conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets whether the rule targets values above or below the average.
     *
     * @param aboveBelow - True if the rule targets above-average values; false if it targets below-average values.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/Methods/SetAboveBelow/
     */
    SetAboveBelow(aboveBelow: boolean): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number of standard deviations from the average.
     *
     * @param numStdDev - The number of standard deviations (0 for simple average, positive numbers for deviations).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAboveAverage/Methods/SetNumStdDev/
     */
    SetNumStdDev(numStdDev: number): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing an animation effect. */
  export interface ApiAnimationEffect {
  }

  /** Class representing an animation sequence (main sequence or interactive sequence). */
  export interface ApiAnimationSequence {
  }

  /**
   * Class representing the areas.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAreas/
   */
  export interface ApiAreas {
    /**
     * Returns a value that represents the number of objects in the collection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAreas/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns a single object from a collection by its ID.
     *
     * @param ind - The index number of the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAreas/Methods/GetItem/
     */
    GetItem(ind: number): ApiRange;

    /**
     * Returns the parent object for the specified collection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAreas/Methods/GetParent/
     */
    GetParent(): number;
  }

  /**
   * Class representing worksheet autofilters.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/
   */
  export interface ApiAutoFilter {
    /**
     * Reapplies the AutoFilter to the worksheet using the existing filter criteria.
     *
     * This method corresponds to the Excel AutoFilter.ApplyFilter behavior:
     * it does not change the currently defined filter conditions; it only
     * reevaluates which rows should be visible based on the active filters.
     * If no AutoFilter is defined for the worksheet, the method does nothing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/ApplyFilter/
     */
    ApplyFilter(): void;

    /**
     * Returns a value that indicates whether the worksheet has an AutoFilter applied.
     *
     * @returns true if the worksheet has an AutoFilter; otherwise, false.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/GetFilterMode/
     */
    GetFilterMode(): boolean;

    /**
     * Returns the array of ApiFilter objects that represents the filters applied to the AutoFilter range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/GetFilters/
     */
    GetFilters(): ApiFilter[];

    /**
     * Returns the parent object for the AutoFilter — either the ApiWorksheet the filter is applied to,
     * or the ApiListObject if the filter belongs to a table.
     *
     * @returns The parent worksheet or table object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/GetParent/
     */
    GetParent(): ApiWorksheet | ApiListObject;

    /**
     * Returns the ApiRange object that represents the AutoFilter range.
     *
     * @returns The range to which the AutoFilter is applied; null if no AutoFilter is defined.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/GetRange/
     */
    GetRange(): ApiRange | null;

    /**
     * Clears all filters and displays all rows in the AutoFilter range.
     *
     * This method corresponds to the Excel AutoFilter.ShowAllData behavior:
     * it removes any active filtering from the worksheet while preserving the
     * AutoFilter drop-downs on the header row. If no AutoFilter is defined
     * for the worksheet, the method does nothing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiAutoFilter/Methods/ShowAllData/
     */
    ShowAllData(): void;
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
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiBullet/
   */
  export interface ApiBullet {
    /**
     * Returns a type of the ApiBullet class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiBullet/Methods/GetClassType/
     */
    GetClassType(): "bullet";

    /**
     * Converts the ApiBullet object into the JSON object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiBullet/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /**
   * Class representing characters in an object that contains text.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/
   */
  export interface ApiCharacters {
    /**
     * Deletes the ApiCharacters object.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns a string value that represents the text of the specified range of characters.
     *
     * @returns A string value that represents the text of the specified range of characters.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/GetCaption/
     */
    GetCaption(): string;

    /**
     * Returns a value that represents a number of objects in the collection.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns the ApiFont object that represents the font of the specified characters.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/GetFont/
     */
    GetFont(): ApiFont;

    /**
     * Returns the parent object of the specified characters.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the text of the specified range of characters.
     *
     * @returns The text of the specified range of characters.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/GetText/
     */
    GetText(): string;

    /**
     * Inserts a string replacing the specified characters.
     *
     * @param String - The string to insert.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/Insert/
     */
    Insert(String: string): void;

    /**
     * Sets a string value that represents the text of the specified range of characters.
     *
     * @param Caption - A string value that represents the text of the specified range of characters.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/SetCaption/
     */
    SetCaption(Caption: string): void;

    /**
     * Sets the text for the specified characters.
     *
     * @param Text - The text to be set.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCharacters/Methods/SetText/
     */
    SetText(Text: string): void;
  }

  /**
   * Class representing a chart.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/
   */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetTitle"> {
    /**
     * Adds a new series to the current chart.
     *
     * @param sNameRange - The series name. Can be a range of cells or usual text. For example: "'sheet 1'!$A$2:$A$5" -
     *   must be a single cell, row or column, "A1:A5" - must be a single cell, row or column, "Example
     *   series".
     * @param sValuesRange - A range of cells from the sheet with series values. For example: "'sheet 1'!$A$2:$A$5" - must be
     *   a single cell, row or column, "A1:A5" - must be a single cell, row or column.
     * @param sXValuesRange - A range of cells from the sheet with series x-axis values. It is used with the scatter charts
     *   only. For example: "'sheet 1'!$A$2:$A$5" - must be a single cell, row or column, "A1:A5" - must
     *   be a single cell, row or column.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/AddSeria/
     */
    AddSeria(sNameRange: string, sValuesRange: string, sXValuesRange?: string): void;

    /**
     * Sets a style to the current chart by style ID.
     *
     * @param nStyleId - One of the styles available in the editor.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/ApplyChartStyle/
     */
    ApplyChartStyle(nStyleId: unknown): boolean;

    /**
     * Returns all series from the chart space.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetAllSeries/
     */
    GetAllSeries(): ApiChartSeries[];

    /**
     * Returns a type of the chart object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChart class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetClassType/
     */
    GetClassType(): "chart";

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;

    /**
     * Returns the series with a specific index.
     *
     * @param nIdx - Series index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetSeries/
     */
    GetSeries(nIdx: number): ApiChartSeries;

    /**
     * Returns the chart title text.
     *
     * @returns The chart title text or null if the chart has no title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns a type of the chart object using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/GetType/
     */
    GetType(): ChartType;

    /**
     * Removes the specified series from the current chart.
     *
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/RemoveSeria/
     */
    RemoveSeria(nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the axis values.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param sAxisPos - Axis position in the chart.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetAxisNumFormat/
     */
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;

    /**
     * Sets a range with the category values to the current chart.
     *
     * @param sRange - A range of cells from the sheet with the category names. For example: "'sheet 1'!$A$2:$A$5" -
     *   must be a single cell, row or column, "A1:A5" - must be a single cell, row or column.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetCatFormula/
     */
    SetCatFormula(sRange: string): void;

    /**
     * Sets the text properties to the chart data labels.
     *
     * @param textPr - The text properties to apply to the data labels.
     * @returns Returns true if the text properties were applied successfully, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetDataLabelsTextPr/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetDataPointFill/
     */
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;

    /**
     * Sets the outline to the data point in the specified chart series.
     *
     * @param oStroke - The stroke used to create the data point outline.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the outline will be applied to the specified data point in all series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetDataPointOutLine/
     */
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;

    /**
     * Specifies font size for labels of the horizontal axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisLabelsFontSize/
     */
    SetHorAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisMajorTickMark/
     */
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisMinorTickMark/
     */
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies the horizontal axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the horizontal axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisOrientation/
     */
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Spicifies tick labels position for the horizontal axis.
     *
     * @param sTickLabelPosition - The type for the position of chart horizontal tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisTickLabelPosition/
     */
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Specifies the chart horizontal axis title.
     *
     * @param sTitle - The title which will be displayed for the horizontal axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the horizontal axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetHorAxisTitle/
     */
    SetHorAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart legend.
     *
     * @param oFill - The fill type used to fill the legend.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetLegendFill/
     */
    SetLegendFill(oFill: ApiFill): boolean;

    /**
     * Specifies the legend font size.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetLegendFontSize/
     */
    SetLegendFontSize(nFontSize: pt): boolean;

    /**
     * Sets the outline to the chart legend.
     *
     * @param oStroke - The stroke used to create the legend outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetLegendOutLine/
     */
    SetLegendOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the chart legend position.
     *
     * @param sLegendPos - The position of the chart legend inside the chart window.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetLegendPos/
     */
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;

    /**
     * Specifies major horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMajorHorizontalGridlines/
     */
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies major vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMajorVerticalGridlines/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMarkerFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMarkerOutLine/
     */
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Specifies minor horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMinorHorizontalGridlines/
     */
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies minor vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetMinorVerticalGridlines/
     */
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the chart plot area.
     *
     * @param oFill - The fill type used to fill the plot area.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetPlotAreaFill/
     */
    SetPlotAreaFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart plot area.
     *
     * @param oStroke - The stroke used to create the plot area outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetPlotAreaOutLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetPointDataLabelTextPr/
     */
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;

    /**
     * Sets a name to the specified series.
     *
     * @param sNameRange - The series name. Can be a range of cells or usual text. For example: "'sheet 1'!$A$2:$A$5" -
     *   must be a single cell, row or column, "A1:A5" - must be a single cell, row or column, "Example
     *   series".
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetSeriaName/
     */
    SetSeriaName(sNameRange: string, nSeria: number): boolean;

    /**
     * Sets values from the specified range to the specified series.
     *
     * @param sRange - A range of cells from the sheet with series values. For example: "'sheet 1'!$A$2:$A$5" - must be
     *   a single cell, row or column, "A1:A5" - must be a single cell, row or column, "Example series".
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetSeriaValues/
     */
    SetSeriaValues(sRange: string, nSeria: number): boolean;

    /**
     * Sets the x-axis values from the specified range to the specified series. It is used with the scatter
     * charts only.
     *
     * @param sRange - A range of cells from the sheet with series x-axis values. For example: "'sheet 1'!$A$2:$A$5" -
     *   must be a single cell, row or column, "A1:A5" - must be a single cell, row or column, "Example
     *   series".
     * @param nSeria - The index of the chart series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetSeriaXValues/
     */
    SetSeriaXValues(sRange: string, nSeria: number): boolean;

    /**
     * Sets the fill to the specified chart series.
     *
     * @param oFill - The fill type used to fill the series.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the fill will be applied to all series.
     * @default bAll = false
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetSeriesFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetSeriesOutLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetShowDataLabels/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetShowDataTable/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetShowPointDataLabel/
     */
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies the chart title.
     *
     * @param sTitle - The title which will be displayed for the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the chart title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetTitle/
     */
    SetTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart title.
     *
     * @param oFill - The fill type used to fill the title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetTitleFill/
     */
    SetTitleFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart title.
     *
     * @param oStroke - The stroke used to create the title outline.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetTitleOutLine/
     */
    SetTitleOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the vertical axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the vertical axis (from minimum to
     *   maximum).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVerAxisOrientation/
     */
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Specifies the chart vertical axis title.
     *
     * @param sTitle - The title which will be displayed for the vertical axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the vertical axis title is written in bold font or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVerAxisTitle/
     */
    SetVerAxisTitle(sTitle: string, nFontSize: pt, bIsBold: boolean): boolean;

    /**
     * Specifies font size for labels of the vertical axis.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVertAxisLabelsFontSize/
     */
    SetVertAxisLabelsFontSize(nFontSize: pt): boolean;

    /**
     * Specifies major tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVertAxisMajorTickMark/
     */
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVertAxisMinorTickMark/
     */
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Spicifies tick labels position for the vertical axis.
     *
     * @param sTickLabelPosition - The type for the position of chart vertical tick labels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChart/Methods/SetVertAxisTickLabelPosition/
     */
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
  }

  /**
   * Class representing a chart series.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChartSeries/
   */
  export interface ApiChartSeries {
    /**
     * Tries to change the series type. Returns true if successful.
     *
     * @param sType - Chart type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChartSeries/Methods/ChangeChartType/
     */
    ChangeChartType(sType: ChartType): boolean;

    /**
     * Returns a chart type of the current series.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChartSeries/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChartSeries class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChartSeries/Methods/GetClassType/
     */
    GetClassType(): "chartSeries";

    /**
     * Returns a chart type of the current series using the chart type names from the {@link ChartType}
     * enumeration.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiChartSeries/Methods/GetType/
     */
    GetType(): ChartType;
  }

  /**
   * Class representing a document checkbox / radio button.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCheckBoxForm/
   */
  export interface ApiCheckBoxForm extends ApiFormBase {
  }

  /**
   * Class representing a base class for the color types.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/
   */
  export interface ApiColor {
    /**
     * Converts the JSON object into the ApiColor object.
     *
     * @param jsonObject - JSON representation of the color.
     * @returns new ApiColor object if the conversion was successful, null otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/FromJSON/
     */
    FromJSON(jsonObject: string): ApiColor | null;

    /**
     * Returns a type of the ApiColor class.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/GetClassType/
     */
    GetClassType(): "color";

    /**
     * Gets the HEX string representation of the color.
     *
     * @returns A six-digit uppercase hex string, e.g. "FF00AA".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/GetHex/
     */
    GetHex(): string;

    /**
     * Gets the RGB components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/GetRGB/
     */
    GetRGB(): object;

    /**
     * Gets the RGBA components of the color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/GetRGBA/
     */
    GetRGBA(): object;

    /**
     * Gets the theme color name if the color is a theme color.
     *
     * @returns The theme color name or null if not a theme color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/GetThemeName/
     */
    GetThemeName(): SchemeColorId | null;

    /**
     * Returns true if the color is a theme color.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/IsThemeColor/
     */
    IsThemeColor(): boolean;

    /**
     * Converts the ApiColor object into the JSON object.
     *
     * @returns JSON string representation of the color.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColor/Methods/ToJSON/
     */
    ToJSON(): string;
  }

  /**
   * Class representing a color scale conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScale/
   */
  export interface ApiColorScale extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the collection of criteria that define this color scale rule.
     *
     * @returns An array of ApiColorScaleCriterion objects representing the color scale criteria, or `null` if
     *   the rule is not a color scale type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScale/Methods/GetColorScaleCriteria/
     */
    GetColorScaleCriteria(): ApiColorScaleCriterion[] | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the type of the color scale conditional formatting rule.
     *
     * @returns The type of the color scale conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScale/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /**
   * Class representing single criterion in a color scale conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/
   */
  export interface ApiColorScaleCriterion {
    /**
     * Returns the format color of the color scale criterion.
     *
     * @returns An ApiColor object representing the criterion's color, or `null` if no color is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/GetColor/
     */
    GetColor(): ApiColor | null;

    /**
     * Returns the index indicating which threshold the criterion represents.
     *
     * @returns Returns 0 for minimum threshold, 1 for midpoint (3-color scale) or maximum (2-color scale), and
     *   2 for maximum threshold (3-color scale only).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns the type of the color scale criterion.
     *
     * @returns The type of the color scale criterion.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/GetType/
     */
    GetType(): XlConditionValueTypes | null;

    /**
     * Returns the value of the color scale criterion.
     *
     * @returns The value of the color scale criterion, or `null` if not set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/GetValue/
     */
    GetValue(): string | null;

    /**
     * Sets the format color for the color scale criterion.
     *
     * @param oColor - The ApiColor object specifying the color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/SetColor/
     */
    SetColor(oColor: ApiColor): void;

    /**
     * Sets the type for the color scale criterion.
     *
     * @param type - The type of the color scale criterion.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/SetType/
     */
    SetType(type: XlConditionValueTypes): void;

    /**
     * Sets the value for the color scale criterion.
     *
     * @param value - The value of the color scale criterion.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiColorScaleCriterion/Methods/SetValue/
     */
    SetValue(value: string): void;
  }

  /**
   * Class representing a document combo box / drop-down list.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComboBoxForm/
   */
  export interface ApiComboBoxForm extends ApiFormBase {
  }

  /**
   * Class representing a comment.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/
   */
  export interface ApiComment {
    /**
     * Adds a reply to a comment.
     *
     * @param sText - The comment reply text (required).
     * @param sAuthorName - The name of the comment reply author (optional).
     * @param sUserId - The user ID of the comment reply author (optional).
     * @param nPos - The comment reply position.
     * @default nPos = this.GetRepliesCount()
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/AddReply/
     */
    AddReply(sText: string, sAuthorName: string, sUserId: string, nPos?: number): void;

    /**
     * Deletes the ApiComment object.
     *
     * @returns returns true if the comment was deleted successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns the comment author's name.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiComment class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetClassType/
     */
    GetClassType(): "comment";

    /**
     * Returns the current comment ID.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetId/
     */
    GetId(): string;

    /**
     * Returns the quote text of the current comment.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetQuoteText/
     */
    GetQuoteText(): string | null;

    /**
     * Returns a number of the comment replies.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetRepliesCount/
     */
    GetRepliesCount(): number;

    /**
     * Returns the specified comment reply.
     *
     * @param nIndex - The comment reply index.
     * @default nIndex = 0
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetReply/
     */
    GetReply(nIndex?: number): ApiCommentReply;

    /**
     * Returns the comment text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the timestamp of the comment creation in the current time zone format.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetTime/
     */
    GetTime(): number;

    /**
     * Returns the timestamp of the comment creation in UTC format.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetTimeUTC/
     */
    GetTimeUTC(): number;

    /**
     * Returns the user ID of the comment author.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/GetUserId/
     */
    GetUserId(): string;

    /**
     * Checks if a comment is solved or not.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/IsSolved/
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
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/RemoveReplies/
     */
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): void;

    /**
     * Sets the comment author's name.
     *
     * @param sAuthorName - The comment author's name.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): void;

    /**
     * Marks a comment as solved.
     *
     * @param bSolved - Specifies if a comment is solved or not.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetSolved/
     */
    SetSolved(bSolved: boolean): void;

    /**
     * Sets the comment text.
     *
     * @param text - New text for comment.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetText/
     */
    SetText(text: string): void;

    /**
     * Sets the timestamp of the comment creation in the current time zone format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in the current time zone format.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetTime/
     */
    SetTime(nTimeStamp: number | string): void;

    /**
     * Sets the timestamp of the comment creation in UTC format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in UTC format.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetTimeUTC/
     */
    SetTimeUTC(nTimeStamp: number | string): void;

    /**
     * Sets the user ID to the comment author.
     *
     * @param sUserId - The user ID of the comment author.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComment/Methods/SetUserId/
     */
    SetUserId(sUserId: string): void;
  }

  /**
   * Class representing a comment reply.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/
   */
  export interface ApiCommentReply {
    /**
     * Returns the comment reply author's name.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiCommentReply class.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetClassType/
     */
    GetClassType(): "commentReply";

    /**
     * Returns the comment reply text.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the timestamp of the comment reply creation in the current time zone format.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetTime/
     */
    GetTime(): number;

    /**
     * Returns the timestamp of the comment reply creation in UTC format.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetTimeUTC/
     */
    GetTimeUTC(): number;

    /**
     * Returns the user ID of the comment reply author.
     *
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/GetUserId/
     */
    GetUserId(): string;

    /**
     * Sets the comment reply author's name.
     *
     * @param sAuthorName - The comment reply author's name.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): void;

    /**
     * Sets the comment reply text.
     *
     * @param sText - The comment reply text.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/SetText/
     */
    SetText(sText: string): void;

    /**
     * Sets the timestamp of the comment reply creation in the current time zone format.
     *
     * @param nTimeStamp - The timestamp of the comment reply creation in the current time zone format.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/SetTime/
     */
    SetTime(nTimeStamp: number | string): void;

    /**
     * Sets the timestamp of the comment reply creation in UTC format.
     *
     * @param nTimeStamp - The timestamp of the comment reply creation in UTC format.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/SetTimeUTC/
     */
    SetTimeUTC(nTimeStamp: number | string): void;

    /**
     * Sets the user ID to the comment reply author.
     *
     * @param sUserId - The user ID of the comment reply author.
     * @since 7.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCommentReply/Methods/SetUserId/
     */
    SetUserId(sUserId: string): void;
  }

  /**
   * Class representing a complex field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiComplexForm/
   */
  export interface ApiComplexForm extends ApiFormBase {
  }

  /** Class representing a list of values of the combo box / drop-down list content control. */
  export interface ApiContentControlList {
  }

  /** Class representing an entry of the combo box / drop-down list content control. */
  export interface ApiContentControlListEntry {
  }

  /**
   * Class representing document properties (similar to BuiltInDocumentProperties in VBA).
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/
   */
  export interface ApiCore {
    /**
     * Returns the document category.
     *
     * @returns The document category.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetCategory/
     */
    GetCategory(): string;

    /**
     * Returns a type of the ApiCore class.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetClassType/
     */
    GetClassType(): "core";

    /**
     * Returns the document content status.
     *
     * @returns The document content status.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetContentStatus/
     */
    GetContentStatus(): string;

    /**
     * Returns the document creation date.
     *
     * @returns The document creation date.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetCreated/
     */
    GetCreated(): Date;

    /**
     * Returns the document author.
     *
     * @returns The document author.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetCreator/
     */
    GetCreator(): string;

    /**
     * Returns the document description.
     *
     * @returns The document description.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetDescription/
     */
    GetDescription(): string;

    /**
     * Returns the document identifier.
     *
     * @returns The document identifier.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetIdentifier/
     */
    GetIdentifier(): string;

    /**
     * Returns the document keywords.
     *
     * @returns The document keywords in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetKeywords/
     */
    GetKeywords(): string;

    /**
     * Returns the document language.
     *
     * @returns The document language.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the name of the user who last modified the document.
     *
     * @returns The name of the user who last modified the document.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetLastModifiedBy/
     */
    GetLastModifiedBy(): string;

    /**
     * Returns the date when the document was last printed.
     *
     * @returns The date when the document was last printed.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetLastPrinted/
     */
    GetLastPrinted(): Date;

    /**
     * Returns the date when the document was last modified.
     *
     * @returns The date when the document was last modified.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetModified/
     */
    GetModified(): Date;

    /**
     * Returns the document revision.
     *
     * @returns The document revision.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetRevision/
     */
    GetRevision(): string;

    /**
     * Returns the document subject.
     *
     * @returns The document subject.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetSubject/
     */
    GetSubject(): string;

    /**
     * Returns the document title.
     *
     * @returns The document title.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetTitle/
     */
    GetTitle(): string;

    /**
     * Returns the document version.
     *
     * @returns The document version.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/GetVersion/
     */
    GetVersion(): string;

    /**
     * Sets the document category.
     *
     * @param sCategory - The document category.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetCategory/
     */
    SetCategory(sCategory: string): void;

    /**
     * Sets the document content status.
     *
     * @param sStatus - The document content status.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetContentStatus/
     */
    SetContentStatus(sStatus: string): void;

    /**
     * Sets the document creation date.
     *
     * @param oCreated - The document creation date.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetCreated/
     */
    SetCreated(oCreated: Date): void;

    /**
     * Sets the document author.
     *
     * @param sCreator - The document author.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetCreator/
     */
    SetCreator(sCreator: string): void;

    /**
     * Sets the document description.
     *
     * @param sDescription - The document description.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetDescription/
     */
    SetDescription(sDescription: string): void;

    /**
     * Sets the document identifier.
     *
     * @param sIdentifier - The document identifier.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetIdentifier/
     */
    SetIdentifier(sIdentifier: string): void;

    /**
     * Sets the document keywords.
     *
     * @param sKeywords - The document keywords in the string format.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetKeywords/
     */
    SetKeywords(sKeywords: string): void;

    /**
     * Sets the document language.
     *
     * @param sLanguage - The document language.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetLanguage/
     */
    SetLanguage(sLanguage: string): void;

    /**
     * Sets the name of the user who last modified the document.
     *
     * @param sLastModifiedBy - The name of the user who last modified the document.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetLastModifiedBy/
     */
    SetLastModifiedBy(sLastModifiedBy: string): void;

    /**
     * Sets the date when the document was last printed.
     *
     * @param oLastPrinted - The date when the document was last printed.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetLastPrinted/
     */
    SetLastPrinted(oLastPrinted: Date): void;

    /**
     * Sets the date when the document was last modified.
     *
     * @param oModified - The date when the document was last modified.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetModified/
     */
    SetModified(oModified: Date): void;

    /**
     * Sets the document revision.
     *
     * @param sRevision - The document revision.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetRevision/
     */
    SetRevision(sRevision: string): void;

    /**
     * Sets the document subject.
     *
     * @param sSubject - The document subject.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetSubject/
     */
    SetSubject(sSubject: string): void;

    /**
     * Sets the document title.
     *
     * @param sTitle - The document title.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetTitle/
     */
    SetTitle(sTitle: string): void;

    /**
     * Sets the document version.
     *
     * @param sVersion - The document version.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCore/Methods/SetVersion/
     */
    SetVersion(sVersion: string): void;
  }

  /**
   * Class representing custom properties of the document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomProperties/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomProperties/Methods/Add/
     */
    Add(name: string, value: string | number | boolean | Date): boolean;

    /**
     * Returns the value of a custom property by its name.
     *
     * @param name - The custom property name.
     * @returns The value of the custom property or null if the property does not exist.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomProperties/Methods/Get/
     */
    Get(name: string): string | number | Date | boolean | null;

    /**
     * Returns a type of the ApiCustomProperties class.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomProperties/Methods/GetClassType/
     */
    GetClassType(): "customProperties";
  }

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/
   */
  export interface ApiCustomXmlNode {
    /**
     * Creates a child node for the current XML node.
     *
     * @param nodeName - The name of the new child node.
     * @returns The newly created child node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/Add/
     */
    Add(nodeName: string): ApiCustomXmlNode;

    /**
     * Deletes the current XML node.
     *
     * @returns Returns `true` if the node was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/Delete/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/DeleteAttribute/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetAttribute/
     */
    GetAttribute(name: string): string | null;

    /**
     * Returns a list of attributes of the current XML node.
     *
     * @returns An array of attribute objects.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetAttributes/
     */
    GetAttributes(): CustomXmlNodeAttribute[];

    /**
     * Returns a type of the ApiCustomXmlNode class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetClassType/
     */
    GetClassType(): "customXmlNode";

    /**
     * Returns the name of the current XML node.
     *
     * @returns The name of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetNodeName/
     */
    GetNodeName(): string;

    /**
     * Returns the XML string representation of the current node content.
     *
     * @returns The XML string representation of the current node content.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetNodeValue/
     */
    GetNodeValue(): string;

    /**
     * Returns nodes from the custom XML node based on the given XPath.
     *
     * @param xPath - The XPath expression to match nodes.
     * @returns An array of nodes that match the given XPath.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetNodes/
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Returns the parent of the current XML node.
     *
     * @returns The parent node, or `null` if the current node has no parent.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetParent/
     */
    GetParent(): ApiCustomXmlNode | null;

    /**
     * Returns the inner text of the current node and its child nodes.
     * For example: `<text>123<one>4</one></text>` returns `"1234"`.
     *
     * @returns The combined text content of the node and its descendants.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the absolute XPath of the current XML node.
     *
     * @returns The absolute XPath of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetXPath/
     */
    GetXPath(): string;

    /**
     * Returns the XML string of the current node.
     *
     * @returns The XML string representation of the current node.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/GetXml/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/SetAttribute/
     */
    SetAttribute(name: string, value: string): boolean;

    /**
     * Sets the XML content for the current node.
     *
     * @param xml - The XML string to set as the content of the current node.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/SetNodeValue/
     */
    SetNodeValue(xml: string): boolean;

    /**
     * Sets the text content of the current XML node.
     *
     * @param str - The text content to set for the node.
     * @returns Returns `true` if the text was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/SetText/
     */
    SetText(str: string): boolean;

    /**
     * Sets the XML content of the current XML node.
     *
     * @param strXml - The XML string to set as the node content.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/SetXml/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlNode/Methods/UpdateAttribute/
     */
    UpdateAttribute(name: string, value: string): boolean;
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/
   */
  export interface ApiCustomXmlPart {
    /**
     * Deletes the XML from the custom XML manager.
     *
     * @returns True if the XML was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/Delete/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/DeleteAttribute/
     */
    DeleteAttribute(xPath: string, name: string): boolean;

    /**
     * Deletes an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the node to delete.
     * @returns True if the element was successfully deleted.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/DeleteElement/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/GetAttribute/
     */
    GetAttribute(xPath: string, name: string): string | null;

    /**
     * Returns a type of the ApiCustomXmlPart class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/GetClassType/
     */
    GetClassType(): "customXmlPart";

    /**
     * Returns the ID of the custom XML part.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/GetId/
     */
    GetId(): string;

    /**
     * Retrieves nodes from custom XML based on the provided XPath.
     *
     * @param xPath - The XPath expression to search for nodes.
     * @returns An array of ApiCustomXmlNode objects corresponding to the found nodes.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/GetNodes/
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Retrieves the XML string from the custom XML part.
     *
     * @returns The XML string.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/GetXml/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/InsertAttribute/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/InsertElement/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/UpdateAttribute/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlPart/Methods/UpdateElement/
     */
    UpdateElement(xPath: string, xmlStr: string): boolean;
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/
   */
  export interface ApiCustomXmlParts {
    /**
     * Adds a new custom XML part to the XML manager.
     *
     * @param xml - The XML string to be added.
     * @returns The newly created ApiCustomXmlPart object.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/Add/
     */
    Add(xml: string): ApiCustomXmlPart;

    /**
     * Returns all custom XML parts from the XML manager.
     *
     * @returns An array of all custom XML parts.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/GetAll/
     */
    GetAll(): ApiCustomXmlPart[];

    /**
     * Returns a custom XML part by its ID from the XML manager.
     *
     * @param xmlPartId - The XML part ID.
     * @returns The corresponding ApiCustomXmlPart object if found, or null if no match is found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/GetById/
     */
    GetById(xmlPartId: string): ApiCustomXmlPart | null;

    /**
     * Returns custom XML parts by namespace from the XML manager.
     *
     * @param namespace - The namespace of the XML parts.
     * @returns An array of ApiCustomXmlPart objects or null if no matching XML parts are found.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/GetByNamespace/
     */
    GetByNamespace(namespace: string): ApiCustomXmlPart[];

    /**
     * Returns a type of the ApiCustomXmlParts class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/GetClassType/
     */
    GetClassType(): "customXmlParts";

    /**
     * Returns a number of custom XML parts in the XML manager.
     *
     * @returns The number of custom XML parts.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiCustomXmlParts/Methods/GetCount/
     */
    GetCount(): number;
  }

  /**
   * Class representing a data bar conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/
   */
  export interface ApiDatabar extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the axis color of the data bar conditional formatting rule.
     *
     * @returns The axis color as an ApiColor object, or null if no color is specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetAxisColor/
     */
    GetAxisColor(): ApiColor | null;

    /**
     * Returns the axis position of the data bar conditional formatting rule.
     *
     * @returns The axis position setting for the data bar.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetAxisPosition/
     */
    GetAxisPosition(): XlDataBarAxisPosition;

    /**
     * Returns the bar border color of the data bar.
     *
     * @returns Returns the ApiColor object representing the bar border color, or null if not specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetBarBorderColor/
     */
    GetBarBorderColor(): ApiColor | null;

    /**
     * Returns the bar color of the data bar.
     *
     * @returns Returns the ApiColor object representing the bar color, or null if the bar color is not
     *   specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetBarColor/
     */
    GetBarColor(): ApiColor | null;

    /**
     * Returns the bar fill type of the data bar.
     *
     * @returns The fill type setting for the data bar (solid or gradient).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetBarFillType/
     */
    GetBarFillType(): XlDataBarFillType;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the direction of the data bar.
     *
     * @returns The direction setting for the data bar (context, left-to-right, or right-to-left).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetDirection/
     */
    GetDirection(): XlReadingOrder;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the formula of the data bar.
     *
     * @returns Returns the formula string.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetFormula/
     */
    GetFormula(): string;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the type of the maximum value condition for the data bar.
     *
     * @returns The type of the maximum value condition, or null if not specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetMaxPointType/
     */
    GetMaxPointType(): XlConditionValueTypes | null;

    /**
     * Returns the value of the maximum value condition for the data bar.
     *
     * @returns The value of the maximum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetMaxPointValue/
     */
    GetMaxPointValue(): string | number | null;

    /**
     * Returns the type of the minimum value condition for the data bar.
     *
     * @returns The type of the minimum value condition, or null if not specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetMinPointType/
     */
    GetMinPointType(): XlConditionValueTypes | null;

    /**
     * Returns the value of the minimum value condition for the data bar.
     *
     * @returns The value of the minimum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetMinPointValue/
     */
    GetMinPointValue(): string | number | null;

    /**
     * Returns the negative bar color of the data bar.
     *
     * @returns Returns the ApiColor object representing the negative bar color, or null if not specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetNegativeBarColor/
     */
    GetNegativeBarColor(): ApiColor | null;

    /**
     * Returns the negative bar border color of the data bar.
     *
     * @returns Returns the ApiColor object representing the negative bar border color, or null if not
     *   specified.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetNegativeBorderColor/
     */
    GetNegativeBorderColor(): ApiColor | null;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the percent maximum value of the data bar.
     *
     * @returns The maximum length of the data bar in percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetPercentMax/
     */
    GetPercentMax(): number;

    /**
     * Returns the percent minimum value of the data bar.
     *
     * @returns Returns the minimum length of the data bar in percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetPercentMin/
     */
    GetPercentMin(): number;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the data bar displays the cell value.
     *
     * @returns True if the data bar shows the value, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetShowValue/
     */
    GetShowValue(): boolean;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the type of the data bar conditional formatting rule.
     *
     * @returns The type of the data bar conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the axis color for the data bar conditional formatting rule.
     *
     * @param oColor - The axis color as an ApiColor object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetAxisColor/
     */
    SetAxisColor(oColor: ApiColor): void;

    /**
     * Sets the axis position for the data bar conditional formatting rule.
     *
     * @param position - The axis position setting for the data bar.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetAxisPosition/
     */
    SetAxisPosition(position: XlDataBarAxisPosition): void;

    /**
     * Sets the bar border color for the data bar.
     *
     * @param oColor - The ApiColor object for the bar borders.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetBarBorderColor/
     */
    SetBarBorderColor(oColor: ApiColor): void;

    /**
     * Sets the bar color for the data bar.
     *
     * @param oColor - The ApiColor object representing the bar color.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetBarColor/
     */
    SetBarColor(oColor: ApiColor): void;

    /**
     * Sets the bar fill type for the data bar.
     *
     * @param fillType - The fill type setting for the data bar (solid or gradient).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetBarFillType/
     */
    SetBarFillType(fillType: XlDataBarFillType): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the direction for the data bar.
     *
     * @param direction - The direction setting for the data bar (context, left-to-right, or right-to-left).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetDirection/
     */
    SetDirection(direction: XlReadingOrder): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the type for the maximum value condition for the data bar.
     *
     * @param type - The type of the maximum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetMaxPointType/
     */
    SetMaxPointType(type: XlConditionValueTypes): void;

    /**
     * Sets the value for the maximum value condition for the data bar.
     *
     * @param value - The value of the maximum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetMaxPointValue/
     */
    SetMaxPointValue(value: string | number): void;

    /**
     * Sets the type for the minimum value condition for the data bar.
     *
     * @param type - The type of the minimum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetMinPointType/
     */
    SetMinPointType(type: XlConditionValueTypes): void;

    /**
     * Sets the value for the minimum value condition for the data bar.
     *
     * @param value - The value of the minimum value condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetMinPointValue/
     */
    SetMinPointValue(value: string | number): void;

    /**
     * Sets the negative bar color for the data bar.
     *
     * @param oColor - The ApiColor object for the negative bars.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetNegativeBarColor/
     */
    SetNegativeBarColor(oColor: ApiColor): void;

    /**
     * Sets the negative bar border color for the data bar.
     *
     * @param oColor - The ApiColor object for the negative bar borders.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetNegativeBorderColor/
     */
    SetNegativeBorderColor(oColor: ApiColor): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets the percent maximum value for the data bar.
     *
     * @param percent - The maximum length of the data bar in percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetPercentMax/
     */
    SetPercentMax(percent: number): void;

    /**
     * Sets the percent minimum value for the data bar.
     *
     * @param percent - The minimum length of the data bar in percent.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetPercentMin/
     */
    SetPercentMin(percent: number): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Specifies whether the data bar displays the cell value.
     *
     * @param showValue - True to show the value, false to hide it.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDatabar/Methods/SetShowValue/
     */
    SetShowValue(showValue: boolean): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /**
   * Class representing a document date field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDateForm/
   */
  export interface ApiDateForm extends ApiFormBase {
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/
   */
  export interface ApiDocument extends ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a type of the ApiDocumentContent class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetClassType/
     */
    GetClassType(): "documentContent";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetInternalId/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;
  }

  /**
   * Class representing a container for paragraphs and tables.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/
   */
  export interface ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/AddElement/
     */
    AddElement(nPos: number, oElement: DocumentElement): boolean;

    /**
     * Appends the specified text to the end of the document content.
     *
     * @param text - The text to add.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/AddText/
     */
    AddText(text: string): ApiRun;

    /**
     * Returns an array of all paragraphs from the current document content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetAllParagraphs/
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns a type of the ApiDocumentContent class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetClassType/
     */
    GetClassType(): "documentContent";

    /**
     * Returns the current paragraph where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetCurrentParagraph/
     */
    GetCurrentParagraph(): ApiParagraph;

    /**
     * Returns the current run where the cursor is located.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetCurrentRun/
     */
    GetCurrentRun(): ApiRun;

    /**
     * Returns an element by its position in the document.
     *
     * @param nPos - The element position that will be taken from the document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns a number of elements in the current document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns an internal ID of the current document content.
     *
     * @since 9.0.4
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetInternalId/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/GetText/
     */
    GetText(options?: object, options_Numbering?: boolean, options_Math?: boolean, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string, options_NewLineSeparator?: string): string;

    /**
     * Pushes a paragraph or a table to actually add it to the document.
     *
     * @param oElement - The element type which will be pushed to the document.
     * @returns returns false if oElement is unsupported.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Replaces all content of the current document content object with the specified text,
     * preserving the formatting of the first paragraph.
     *
     * @param text - The text to set.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDocumentContent/Methods/SetText/
     */
    SetText(text: string): ApiRun;
  }

  /**
   * Class representing a graphical object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/
   */
  export interface ApiDrawing {
    /**
     * Returns a type of the ApiDrawing class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetClassType/
     */
    GetClassType(): "drawing";

    /**
     * Gets the description of the current drawing.
     *
     * @returns The description of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetDescription/
     */
    GetDescription(): string | null;

    /**
     * Gets the fill formatting properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Get horizontal flip of current drawing.
     *
     * @returns Returns true if the figure is flipped horizontally, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetFlipH/
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetFlipV/
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): EMU;

    /**
     * Gets the outline properties from the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns whether the aspect ratio of the drawing is locked.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetLockAspect/
     */
    GetLockAspect(): boolean;

    /**
     * Returns the lock value for the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetRotation/
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetShadow/
     */
    GetShadow(): ApiShadow | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetTitle/
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): EMU;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @default isReplace = false
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/Select/
     */
    Select(isReplace?: boolean): void;

    /**
     * Sets the description of the current drawing.
     *
     * @param description - The description to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetDescription/
     */
    SetDescription(description: string): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param fill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid or not supported for the current graphic object.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetFill/
     */
    SetFill(fill: ApiFill): boolean;

    /**
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetFlipH/
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetFlipV/
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Sets whether the aspect ratio of the drawing is locked.
     *
     * @param bAspect - Specifies whether the aspect ratio of this drawing is locked.
     * @returns Returns `true` if the lock aspect was successfully set, otherwise returns `false`.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetLockAspect/
     */
    SetLockAspect(bAspect: boolean): boolean;

    /**
     * Sets the lock value to the specified lock type of the current drawing.
     *
     * @param sType - Lock type in the string format.
     * @param bValue - Specifies if the specified lock is applied to the current drawing.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetLockValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetName/
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetOutLine/
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Changes the position for the drawing object.
     * <note>Please note that the horizontal and vertical offsets are calculated within the limits of
     * the specified column and row cells only. If this value exceeds the cell width or height, another
     * vertical/horizontal position will be set.</note>
     *
     * @param nFromCol - The number of the column where the beginning of the drawing object will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the drawing object measured in English
     *   measure units.
     * @param nFromRow - The number of the row where the beginning of the drawing object will be placed.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the drawing object measured in English
     *   measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(nFromCol: number, nColOffset: EMU, nFromRow: number, nRowOffset: EMU): void;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetRotation/
     */
    SetRotation(nRotAngle: number): boolean;

    /**
     * Sets the shadow to the current graphic object.
     *
     * @param shadow - The shadow to apply, or null to remove the current shadow.
     * @returns returns false if the graphic object does not support shadow.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetShadow/
     */
    SetShadow(shadow: ApiShadow): boolean;

    /**
     * Sets a size of the object (image, shape, chart) bounding box.
     *
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: EMU, nHeight: EMU): void;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/SetTitle/
     */
    SetTitle(title: string): boolean;

    /**
     * Removes the current drawing from the selection.
     *
     * @returns Returns false if the drawing or controller is not available, otherwise returns true.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/Unselect/
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
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFill/
   */
  export interface ApiFill {
    /**
     * Returns a type of the ApiFill class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFill/Methods/GetClassType/
     */
    GetClassType(): "fill";

    /**
     * Gets the fill type.
     *
     * @returns returns "solid", "gradient", "pattern", "blip", "nofill" or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFill/Methods/GetType/
     */
    GetType(): FillType;
  }

  /**
   * Class representing a single AutoFilter column.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/
   */
  export interface ApiFilter {
    /**
     * Returns the first criteria associated with the filter for this column.
     *
     * @returns The first criteria for the filter.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/Methods/GetCriteria1/
     */
    GetCriteria1(): string | string[] | number | XlDynamicFilterCriteria | null;

    /**
     * Returns the second criteria associated with the filter for this column.
     *
     * @returns The second criteria for the filter, or null if not applicable.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/Methods/GetCriteria2/
     */
    GetCriteria2(): string | null;

    /**
     * Indicates whether any filter is applied on this column.
     *
     * The property is true when at least one of the following underlying
     * structures is present for the column:
     * - Filters
     * - CustomFiltersObj
     * - DynamicFilter
     * - ColorFilter
     * - Top10
     *
     * @returns True if a filter is applied; otherwise, false.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/Methods/GetOn/
     */
    GetOn(): boolean;

    /**
     * Returns the operator used for the filter on this column.
     *
     * @returns The operator for the current filter.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/Methods/GetOperator/
     */
    GetOperator(): XlAutoFilterOperator | null;

    /**
     * Returns the parent filters collection for this filter column.
     *
     * @returns The parent filters collection.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFilter/Methods/GetParent/
     */
    GetParent(): ApiAutoFilter;
  }

  /**
   * Class that contains the font attributes (font name, font size, color, and so on).
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/
   */
  export interface ApiFont {
    /**
     * Returns the bold property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetBold/
     */
    GetBold(): boolean | null;

    /**
     * Returns the font color property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetColor/
     */
    GetColor(): ApiColor | null;

    /**
     * Returns the italic property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetItalic/
     */
    GetItalic(): boolean | null;

    /**
     * Returns the font name property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetName/
     */
    GetName(): string | null;

    /**
     * Returns the parent ApiCharacters object of the specified font.
     *
     * @returns The parent ApiCharacters object.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetParent/
     */
    GetParent(): ApiCharacters;

    /**
     * Returns the font size property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetSize/
     */
    GetSize(): number | null;

    /**
     * Returns the strikethrough property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetStrikethrough/
     */
    GetStrikethrough(): boolean | null;

    /**
     * Returns the subscript property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetSubscript/
     */
    GetSubscript(): boolean | null;

    /**
     * Returns the superscript property of the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetSuperscript/
     */
    GetSuperscript(): boolean | null;

    /**
     * Returns the type of underline applied to the specified font.
     *
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/GetUnderline/
     */
    GetUnderline(): XlUnderlineStyle | null;

    /**
     * Sets the bold property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param isBold - Specifies that the text characters are displayed bold.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetBold/
     */
    SetBold(isBold: boolean): void;

    /**
     * Sets the font color property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param Color - Font color.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetColor/
     */
    SetColor(Color: ApiColor): void;

    /**
     * Sets the italic property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param isItalic - Specifies that the text characters are displayed italic.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): void;

    /**
     * Sets the font name property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param FontName - Font name.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetName/
     */
    SetName(FontName: string): void;

    /**
     * Sets the font size property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param Size - Font size.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetSize/
     */
    SetSize(Size: number): void;

    /**
     * Sets the strikethrough property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param isStrikethrough - Specifies that the text characters are displayed strikethrough.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetStrikethrough/
     */
    SetStrikethrough(isStrikethrough: boolean): void;

    /**
     * Sets the subscript property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param isSubscript - Specifies that the text characters are displayed subscript.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetSubscript/
     */
    SetSubscript(isSubscript: boolean): void;

    /**
     * Sets the superscript property to the specified font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param isSuperscript - Specifies that the text characters are displayed superscript.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetSuperscript/
     */
    SetSuperscript(isSuperscript: boolean): void;

    /**
     * Sets an underline of the type specified in the request to the current font.
     * <note>This method will work only with the text format of the cell.</note>
     *
     * @param Underline - Underline type.
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFont/Methods/SetUnderline/
     */
    SetUnderline(Underline: XlUnderlineStyle): void;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
  }

  /**
   * Class representing a single format condition.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/
   */
  export interface ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the format condition type.
     *
     * @returns The format condition type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /**
   * Class representing a collection of format conditions.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/
   */
  export interface ApiFormatConditions {
    /**
     * Adds a new format condition to the collection.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The created format condition, or null if the operation failed.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/Add/
     */
    Add(Type: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Adds a new above average conditional formatting rule to the collection.
     *
     * @returns The created above average rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddAboveAverage/
     */
    AddAboveAverage(): ApiAboveAverage | null;

    /**
     * Adds a new color scale conditional formatting rule to the collection.
     *
     * @param ColorScaleType - The type of color scale (2 for two-color scale, 3 for three-color scale).
     * @default ColorScaleType = 3
     * @returns The created color scale rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddColorScale/
     */
    AddColorScale(ColorScaleType?: number): ApiColorScale | null;

    /**
     * Adds a new data bar conditional formatting rule to the collection.
     *
     * @returns The created data bar rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddDatabar/
     */
    AddDatabar(): ApiDatabar | null;

    /**
     * Adds a new icon set conditional formatting rule to the collection.
     *
     * @returns The created icon set rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddIconSetCondition/
     */
    AddIconSetCondition(): ApiIconSetCondition | null;

    /**
     * Adds a new top 10 conditional formatting rule to the collection.
     *
     * @returns The created top 10 rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddTop10/
     */
    AddTop10(): ApiTop10 | null;

    /**
     * Adds a new unique values conditional formatting rule to the collection.
     *
     * @returns The created unique values rule, or null if the operation fails.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/AddUniqueValues/
     */
    AddUniqueValues(): ApiUniqueValues | null;

    /**
     * Deletes all format conditions from the collection.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the number of conditional formatting rules in the collection.
     *
     * @returns The number of conditional formatting rules in the collection.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns a format condition by its index.
     *
     * @param index - The index of the format condition (1-based).
     * @returns The format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/GetItem/
     */
    GetItem(index: number): ApiFormatCondition | null;

    /**
     * Returns the parent range object associated with the current conditional formatting collection.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatConditions/Methods/GetParent/
     */
    GetParent(): ApiRange;
  }

  /**
   * Class representing freeze panes.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/
   */
  export interface ApiFreezePanes {
    /**
     * Sets the frozen cells in the active worksheet view. The range provided corresponds to the cells that
     * will be frozen in the top- and left-most pane.
     *
     * @param frozenRange - A range that represents the cells to be frozen.
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/Methods/FreezeAt/
     */
    FreezeAt(frozenRange: ApiRange | string): void;

    /**
     * Freezes the first column or columns of the current worksheet.
     *
     * @param count - Optional number of columns to freeze, or zero to unfreeze all columns.
     * @default count = 0
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/Methods/FreezeColumns/
     */
    FreezeColumns(count?: number): void;

    /**
     * Freezes the top row or rows of the current worksheet.
     *
     * @param count - Optional number of rows to freeze, or zero to unfreeze all rows.
     * @default count = 0
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/Methods/FreezeRows/
     */
    FreezeRows(count?: number): void;

    /**
     * Returns a range that describes the frozen cells in the active worksheet view.
     *
     * @returns Returns null if there is no frozen pane.
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/Methods/GetLocation/
     */
    GetLocation(): ApiRange | null;

    /**
     * Removes all frozen panes in the current worksheet.
     *
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFreezePanes/Methods/Unfreeze/
     */
    Unfreeze(): void;
  }

  /**
   * Class representing the shape geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/
   */
  export interface ApiGeometry {
    /**
     * Adds a new adjustment parameter to the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/AddAdj/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/AddConnectionPoint/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/AddGuide/
     */
    AddGuide(sName: string, sFormula: GeometryFormulaType, sX: string, sY: string, sZ: string): boolean;

    /**
     * Adds a new path to the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/AddPath/
     */
    AddPath(): ApiPath | null;

    /**
     * Returns the adjustment value by its name from the current geometry.
     *
     * @param sName - The adjustment name.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetAdjValue/
     */
    GetAdjValue(sName: string): number | null;

    /**
     * Returns a type of the ApiGeometry class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetClassType/
     */
    GetClassType(): "geometry";

    /**
     * Returns a geometry path by its index.
     *
     * @param nIndex - The path index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetPath/
     */
    GetPath(nIndex: number): ApiPath;

    /**
     * Returns the number of paths in the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetPathCount/
     */
    GetPathCount(): number;

    /**
     * Returns all paths of the current geometry.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetPaths/
     */
    GetPaths(): ApiPath[];

    /**
     * Returns the name of the preset shape if the current geometry is based on a preset.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/GetPreset/
     */
    GetPreset(): ShapeType;

    /**
     * Checks whether the current geometry is custom.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/IsCustom/
     */
    IsCustom(): boolean;

    /**
     * Sets the specified adjustment parameter for the current geometry.
     *
     * @param sName - The adjustment name.
     * @param nValue - The adjustment value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/SetAdjValue/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGeometry/Methods/SetTextRect/
     */
    SetTextRect(sLeft: string, sTop: string, sRight: string, sBottom: string): boolean;
  }

  /**
   * Class representing gradient stop.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGradientStop/
   */
  export interface ApiGradientStop {
    /**
     * Returns a type of the ApiGradientStop class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGradientStop/Methods/GetClassType/
     */
    GetClassType(): "gradientStop";
  }

  /**
   * Class representing a group of drawings.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGroup/
   */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiGroup class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGroup/Methods/GetClassType/
     */
    GetClassType(): "group";

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;

    /**
     * Ungroups the current group of drawings.
     * <note>This method is not supported in the document builder and works only in the editor.</note>
     *
     * @returns The array of the ungrouped objects, or null if the group is not in the document, cannot be
     *   ungrouped, or when called in the document builder.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiGroup/Methods/Ungroup/
     */
    Ungroup(): ApiDrawing[] | null;
  }

  /**
   * Class representing a single header or footer section (left, center or right) of a page.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHeaderFooter/
   */
  export interface ApiHeaderFooter {
    /**
     * Returns the text of this header or footer section.
     *
     * @returns The section text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHeaderFooter/Methods/GetText/
     */
    GetText(): string;

    /**
     * Sets the text of this header or footer section, preserving the other two sections.
     *
     * @param sText - The section text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHeaderFooter/Methods/SetText/
     */
    SetText(sText: string): boolean;
  }

  /**
   * Class representing a hyperlink.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/
   */
  export interface ApiHyperlink {
    /**
     * Deletes the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the address of the target document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetAddress/
     */
    GetAddress(): string;

    /**
     * Returns a type of the ApiHyperlink class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetClassType/
     */
    GetClassType(): "hyperlink";

    /**
     * Returns the hyperlink element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns the hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetLinkedText/
     */
    GetLinkedText(): string;

    /**
     * Returns the name of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the range the hyperlink is attached to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetRange/
     */
    GetRange(): ApiRange;

    /**
     * Returns the screen tip text for the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetScreenTip/
     */
    GetScreenTip(): string;

    /**
     * Returns the screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetScreenTipText/
     */
    GetScreenTipText(): string;

    /**
     * Returns the subaddress of the target document.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetSubAddress/
     */
    GetSubAddress(): string;

    /**
     * Returns the text displayed for the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetTextToDisplay/
     */
    GetTextToDisplay(): string;

    /**
     * Returns the type of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/GetType/
     */
    GetType(): number;

    /**
     * Sets the address of the target document.
     *
     * @param sAddress - The hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetAddress/
     */
    SetAddress(sAddress: string): void;

    /**
     * Sets the hyperlink address.
     *
     * @param sLink - The hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetLink/
     */
    SetLink(sLink: string): boolean;

    /**
     * Sets the screen tip text for the hyperlink.
     *
     * @param sScreenTip - The screen tip text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetScreenTip/
     */
    SetScreenTip(sScreenTip: string): void;

    /**
     * Sets the screen tip text of the hyperlink.
     *
     * @param sScreenTipText - The screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetScreenTipText/
     */
    SetScreenTipText(sScreenTipText: string): boolean;

    /**
     * Sets the subaddress of the target document.
     *
     * @param sSubAddress - The subaddress in "Sheet1!A1" format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetSubAddress/
     */
    SetSubAddress(sSubAddress: string): void;

    /**
     * Sets the text to be displayed for the hyperlink.
     *
     * @param sText - The text to display.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiHyperlink/Methods/SetTextToDisplay/
     */
    SetTextToDisplay(sText: string): void;
  }

  /**
   * Class representing a single icon criterion.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/
   */
  export interface ApiIconCriterion {
    /**
     * Returns the icon associated with the current icon criterion.
     *
     * @returns The icon constant, or null if not available.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/GetIcon/
     */
    GetIcon(): XlIcon | null;

    /**
     * Returns the index of the icon criterion in the collection.
     *
     * @returns The 1-based index of the icon criterion.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns the comparison operator of the icon criterion.
     *
     * @returns The operator ("xlGreaterEqual" or "xlGreater"), or null if not available.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/GetOperator/
     */
    GetOperator(): string | null;

    /**
     * Returns the condition value type for the icon criterion.
     *
     * @returns The condition value type, or null if not available.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/GetType/
     */
    GetType(): XlConditionValueTypes | null;

    /**
     * Returns the threshold value for the icon criterion.
     *
     * @returns The threshold value, or null if not available.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/GetValue/
     */
    GetValue(): string | number | null;

    /**
     * Sets the icon for the current icon criterion.
     *
     * @param icon - The icon constant to set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/SetIcon/
     */
    SetIcon(icon: XlIcon): void;

    /**
     * Sets the comparison operator for the icon criterion.
     *
     * @param operator - The operator to set ("xlGreaterEqual" or "xlGreater").
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/SetOperator/
     */
    SetOperator(operator: string): void;

    /**
     * Sets the condition value type for the icon criterion.
     *
     * @param type - The condition value type. Only "xlConditionValueNumber", "xlConditionValuePercent",
     *   "xlConditionValuePercentile", or "xlConditionValueFormula" are supported.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/SetType/
     */
    SetType(type: XlConditionValueTypes): void;

    /**
     * Sets the threshold value for the icon criterion.
     *
     * @param value - The threshold value to set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconCriterion/Methods/SetValue/
     */
    SetValue(value: string | number): void;
  }

  /**
   * Class representing an icon set conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/
   */
  export interface ApiIconSetCondition extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the formula associated with the icon set condition.
     *
     * @returns The formula string, or empty string if no formula is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetFormula/
     */
    GetFormula(): string;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns a collection of icon criteria that represent the threshold values and icons for the icon set
     * conditional formatting rule.
     *
     * @returns A collection of icon criteria objects, or null if the rule is not an icon set type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetIconCriteria/
     */
    GetIconCriteria(): ApiIconCriterion[] | null;

    /**
     * Returns the icon set type used in the conditional formatting rule.
     *
     * @returns The icon set type, or null if not applicable.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetIconSet/
     */
    GetIconSet(): XlIconSet | null;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns whether the thresholds for the icon set conditional format are determined by using
     * percentiles.
     *
     * @returns True if all thresholds are set to percentile, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetPercentileValues/
     */
    GetPercentileValues(): boolean;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns whether the icon order in the icon set rule is reversed.
     *
     * @returns True if the icon order is reversed, false otherwise, or null if not applicable.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetReverseOrder/
     */
    GetReverseOrder(): boolean | null;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether only icons are displayed in the icon set rule (without cell values).
     *
     * @returns True if only icons are shown, false if values are also shown, or null if not applicable.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetShowIconOnly/
     */
    GetShowIconOnly(): boolean | null;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the type of the icon set conditional formatting rule.
     *
     * @returns The type of the icon set conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the icon set type for the conditional formatting rule.
     *
     * @param iconSet - The icon set type to apply.
     * @returns True if the icon set was successfully set, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/SetIconSet/
     */
    SetIconSet(iconSet: XlIconSet): boolean;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Specifies whether the thresholds for the icon set conditional format are determined by using
     * percentiles.
     *
     * @param percentileValues - True to set all thresholds to percentile, false otherwise.
     * @returns True if the percentile values were successfully set, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/SetPercentileValues/
     */
    SetPercentileValues(percentileValues: boolean): boolean;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Specifies whether the icon order in the icon set rule is reversed.
     *
     * @param reverse - True to reverse the icon order, false otherwise.
     * @returns True if the setting was successfully applied, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/SetReverseOrder/
     */
    SetReverseOrder(reverse: boolean): boolean;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Specifies whether to display only icons in the icon set rule (without cell values).
     *
     * @param showIconOnly - True to show only icons, false to show both icons and values.
     * @returns True if the setting was successfully applied, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiIconSetCondition/Methods/SetShowIconOnly/
     */
    SetShowIconOnly(showIconOnly: boolean): boolean;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /**
   * Class representing an image.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiImage/
   */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiImage class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiImage/Methods/GetClassType/
     */
    GetClassType(): "image";

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a slide layout. */
  export interface ApiLayout {
  }

  /** Class representing a slide master. */
  export interface ApiMaster {
  }

  /**
   * Class representing a mathematical equation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiMath/
   */
  export interface ApiMath {
    /**
     * Returns a type of the ApiMath class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiMath/Methods/GetClassType/
     */
    GetClassType(): "math";

    /**
     * Returns the inner text of the current math element.
     *
     * @param format - The format the text should be returned in.
     * @default format = "unicode"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiMath/Methods/GetText/
     */
    GetText(format?: "unicode" | "latex"): string;
  }

  /**
   * Class representing a name.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/
   */
  export interface ApiName {
    /**
     * Deletes the DefName object.
     *
     * @returns returns true if the name was deleted successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a type of the ApiName class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a formula that the name is defined to refer to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/GetRefersTo/
     */
    GetRefersTo(): string;

    /**
     * Returns the ApiRange object by its name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/GetRefersToRange/
     */
    GetRefersToRange(): ApiRange;

    /**
     * Sets a string value representing the object name.
     *
     * @param sName - New name for the range.
     * @returns returns false if sName is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/SetName/
     */
    SetName(sName: string): boolean;

    /**
     * Sets a formula that the name is defined to refer to.
     *
     * @param sRef - The range reference which must contain the sheet name, followed by sign ! and a range of cells.
     *   Example: "Sheet1!$A$1:$B$2".
     * @returns returns true if the reference was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiName/Methods/SetRefersTo/
     */
    SetRefersTo(sRef: string): boolean;
  }

  /** Class representing a notes page. */
  export interface ApiNotesPage {
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /**
   * Class representing an OLE object.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/
   */
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns the application ID from the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/Methods/GetApplicationId/
     */
    GetApplicationId(): string;

    /**
     * Returns a type of the ApiOleObject class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/Methods/GetClassType/
     */
    GetClassType(): "oleObject";

    /**
     * Returns the string data from the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/Methods/GetData/
     */
    GetData(): string;

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;

    /**
     * Sets the application ID to the current OLE object.
     *
     * @param sAppId - The application ID associated with the current OLE object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/Methods/SetApplicationId/
     */
    SetApplicationId(sAppId: string): boolean;

    /**
     * Sets the data to the current OLE object.
     *
     * @param sData - The OLE object string data.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiOleObject/Methods/SetData/
     */
    SetData(sData: string): boolean;
  }

  /**
   * Class representing the header and footer of a specific page type (even or first) of a worksheet.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/
   */
  export interface ApiPage {
    /**
     * Returns the center footer section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetCenterFooter/
     */
    GetCenterFooter(): ApiHeaderFooter;

    /**
     * Returns the center header section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetCenterHeader/
     */
    GetCenterHeader(): ApiHeaderFooter;

    /**
     * Returns the left footer section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetLeftFooter/
     */
    GetLeftFooter(): ApiHeaderFooter;

    /**
     * Returns the left header section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetLeftHeader/
     */
    GetLeftHeader(): ApiHeaderFooter;

    /**
     * Returns the right footer section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetRightFooter/
     */
    GetRightFooter(): ApiHeaderFooter;

    /**
     * Returns the right header section of this page type.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPage/Methods/GetRightHeader/
     */
    GetRightHeader(): ApiHeaderFooter;
  }

  /**
   * Class representing the page setup (print layout) of a worksheet.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/
   */
  export interface ApiPageSetup {
    /**
     * Returns whether the header and footer margins are aligned with the page margins.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetAlignMarginsHeaderFooter/
     */
    GetAlignMarginsHeaderFooter(): boolean;

    /**
     * Returns the size of the bottom margin.
     *
     * @returns The bottom margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetBottomMargin/
     */
    GetBottomMargin(): number;

    /**
     * Returns the center part of the footer used when the worksheet is printed.
     *
     * @returns The center footer text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetCenterFooter/
     */
    GetCenterFooter(): string;

    /**
     * Returns the center part of the header used when the worksheet is printed.
     *
     * @returns The center header text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetCenterHeader/
     */
    GetCenterHeader(): string;

    /**
     * Returns whether the worksheet is centered horizontally on the page when printed.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetCenterHorizontally/
     */
    GetCenterHorizontally(): boolean;

    /**
     * Returns whether the worksheet is centered vertically on the page when printed.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetCenterVertically/
     */
    GetCenterVertically(): boolean;

    /**
     * Returns whether a different header and footer is used on the first printed page.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetDifferentFirstPageHeaderFooter/
     */
    GetDifferentFirstPageHeaderFooter(): boolean;

    /**
     * Returns the header and footer of the even pages of the worksheet.
     * The returned object is meaningful when {@link ApiPageSetup#GetOddAndEvenPagesHeaderFooter} is
     * enabled.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetEvenPage/
     */
    GetEvenPage(): ApiPage;

    /**
     * Returns the header and footer of the first page of the worksheet.
     * The returned object is meaningful when {@link ApiPageSetup#GetDifferentFirstPageHeaderFooter} is
     * enabled.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetFirstPage/
     */
    GetFirstPage(): ApiPage;

    /**
     * Returns the first page number used when the worksheet is printed.
     * Returns null when the page numbering is automatic.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetFirstPageNumber/
     */
    GetFirstPageNumber(): number | null;

    /**
     * Returns the number of pages tall the worksheet is scaled to when printed (0 means automatic).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetFitToPagesTall/
     */
    GetFitToPagesTall(): number;

    /**
     * Returns the number of pages wide the worksheet is scaled to when printed (0 means automatic).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetFitToPagesWide/
     */
    GetFitToPagesWide(): number;

    /**
     * Returns the distance from the bottom of the page to the footer.
     *
     * @returns The footer margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetFooterMargin/
     */
    GetFooterMargin(): number;

    /**
     * Returns the distance from the top of the page to the header.
     *
     * @returns The header margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetHeaderMargin/
     */
    GetHeaderMargin(): number;

    /**
     * Returns the left part of the footer used when the worksheet is printed.
     *
     * @returns The left footer text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetLeftFooter/
     */
    GetLeftFooter(): string;

    /**
     * Returns the left part of the header used when the worksheet is printed.
     *
     * @returns The left header text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetLeftHeader/
     */
    GetLeftHeader(): string;

    /**
     * Returns the size of the left margin.
     *
     * @returns The left margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetLeftMargin/
     */
    GetLeftMargin(): number;

    /**
     * Returns whether different headers and footers are used on odd and even printed pages.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetOddAndEvenPagesHeaderFooter/
     */
    GetOddAndEvenPagesHeaderFooter(): boolean;

    /**
     * Returns the page orientation used when the worksheet is printed.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetOrientation/
     */
    GetOrientation(): PageOrientation;

    /**
     * Returns the paper size used when the worksheet is printed.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPaperSize/
     */
    GetPaperSize(): PaperSize;

    /**
     * Returns the worksheet that owns this page setup.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetParent/
     */
    GetParent(): ApiWorksheet;

    /**
     * Returns the range to be printed (the print area) as a string, or an empty string when the whole
     * sheet is printed.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPrintArea/
     */
    GetPrintArea(): string;

    /**
     * Returns whether cell gridlines are printed with the worksheet.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPrintGridlines/
     */
    GetPrintGridlines(): boolean;

    /**
     * Returns whether row and column headings are printed with the worksheet.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPrintHeadings/
     */
    GetPrintHeadings(): boolean;

    /**
     * Returns the columns that are repeated at the left of each printed page, or an empty string if none.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPrintTitleColumns/
     */
    GetPrintTitleColumns(): string;

    /**
     * Returns the rows that are repeated at the top of each printed page, or an empty string if none.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetPrintTitleRows/
     */
    GetPrintTitleRows(): string;

    /**
     * Returns the right part of the footer used when the worksheet is printed.
     *
     * @returns The right footer text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetRightFooter/
     */
    GetRightFooter(): string;

    /**
     * Returns the right part of the header used when the worksheet is printed.
     *
     * @returns The right header text (may contain formatting codes such as &P, &D).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetRightHeader/
     */
    GetRightHeader(): string;

    /**
     * Returns the size of the right margin.
     *
     * @returns The right margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetRightMargin/
     */
    GetRightMargin(): number;

    /**
     * Returns whether the header and footer are scaled with the document when it is scaled for printing.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetScaleWithDocHeaderFooter/
     */
    GetScaleWithDocHeaderFooter(): boolean;

    /**
     * Returns the size of the top margin.
     *
     * @returns The top margin size measured in millimeters.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetTopMargin/
     */
    GetTopMargin(): number;

    /**
     * Returns the scaling factor (in percent) used when the worksheet is printed.
     *
     * @returns The scaling factor measured in percent (10-400).
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/GetZoom/
     */
    GetZoom(): number;

    /**
     * Sets whether the header and footer margins are aligned with the page margins.
     *
     * @param bAlign - Specifies whether the header and footer are aligned with the page margins.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetAlignMarginsHeaderFooter/
     */
    SetAlignMarginsHeaderFooter(bAlign: boolean): boolean;

    /**
     * Sets the size of the bottom margin.
     *
     * @param nMargin - The bottom margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetBottomMargin/
     */
    SetBottomMargin(nMargin: number): boolean;

    /**
     * Sets the center part of the footer used when the worksheet is printed.
     *
     * @param sText - The center footer text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetCenterFooter/
     */
    SetCenterFooter(sText: string): boolean;

    /**
     * Sets the center part of the header used when the worksheet is printed.
     *
     * @param sText - The center header text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetCenterHeader/
     */
    SetCenterHeader(sText: string): boolean;

    /**
     * Sets whether the worksheet is centered horizontally on the page when printed.
     *
     * @param bCenter - Specifies whether the worksheet is centered horizontally on the page.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetCenterHorizontally/
     */
    SetCenterHorizontally(bCenter: boolean): boolean;

    /**
     * Sets whether the worksheet is centered vertically on the page when printed.
     *
     * @param bCenter - Specifies whether the worksheet is centered vertically on the page.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetCenterVertically/
     */
    SetCenterVertically(bCenter: boolean): boolean;

    /**
     * Sets whether a different header and footer is used on the first printed page.
     *
     * @param bDifferent - Specifies whether a different header and footer is used on the first page.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetDifferentFirstPageHeaderFooter/
     */
    SetDifferentFirstPageHeaderFooter(bDifferent: boolean): boolean;

    /**
     * Sets the first page number used when the worksheet is printed.
     *
     * @param nNumber - The first page number.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetFirstPageNumber/
     */
    SetFirstPageNumber(nNumber: number): boolean;

    /**
     * Sets the number of pages tall the worksheet is scaled to when printed (0 means automatic).
     * Setting this property turns on the "fit to page" mode.
     *
     * @param nPages - The number of pages tall (0 for automatic).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetFitToPagesTall/
     */
    SetFitToPagesTall(nPages: number): boolean;

    /**
     * Sets the number of pages wide the worksheet is scaled to when printed (0 means automatic).
     * Setting this property turns on the "fit to page" mode.
     *
     * @param nPages - The number of pages wide (0 for automatic).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetFitToPagesWide/
     */
    SetFitToPagesWide(nPages: number): boolean;

    /**
     * Sets the distance from the bottom of the page to the footer.
     *
     * @param nMargin - The footer margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetFooterMargin/
     */
    SetFooterMargin(nMargin: number): boolean;

    /**
     * Sets the distance from the top of the page to the header.
     *
     * @param nMargin - The header margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetHeaderMargin/
     */
    SetHeaderMargin(nMargin: number): boolean;

    /**
     * Sets the left part of the footer used when the worksheet is printed.
     *
     * @param sText - The left footer text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetLeftFooter/
     */
    SetLeftFooter(sText: string): boolean;

    /**
     * Sets the left part of the header used when the worksheet is printed.
     *
     * @param sText - The left header text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetLeftHeader/
     */
    SetLeftHeader(sText: string): boolean;

    /**
     * Sets the size of the left margin.
     *
     * @param nMargin - The left margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetLeftMargin/
     */
    SetLeftMargin(nMargin: number): boolean;

    /**
     * Sets whether different headers and footers are used on odd and even printed pages.
     *
     * @param bDifferent - Specifies whether different headers and footers are used on odd and even pages.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetOddAndEvenPagesHeaderFooter/
     */
    SetOddAndEvenPagesHeaderFooter(bDifferent: boolean): boolean;

    /**
     * Sets the page orientation used when the worksheet is printed.
     *
     * @param sOrientation - The page orientation type.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetOrientation/
     */
    SetOrientation(sOrientation: PageOrientation): boolean;

    /**
     * Sets the paper size used when the worksheet is printed.
     *
     * @param sPaperSize - The paper size (an xlPaperSize constant name, e.g. "xlPaperA4").
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPaperSize/
     */
    SetPaperSize(sPaperSize: PaperSize): boolean;

    /**
     * Sets the range to be printed (the print area). Pass an empty string to clear it and print the whole
     * sheet.
     *
     * @param sRange - The range address (e.g. "A1:D20"); comma-separated for several areas. Empty clears the print
     *   area.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPrintArea/
     */
    SetPrintArea(sRange: string): boolean;

    /**
     * Sets whether cell gridlines are printed with the worksheet.
     *
     * @param bPrint - Specifies whether the cell gridlines are printed.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPrintGridlines/
     */
    SetPrintGridlines(bPrint: boolean): boolean;

    /**
     * Sets whether row and column headings are printed with the worksheet.
     *
     * @param bPrint - Specifies whether the row and column headings are printed.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPrintHeadings/
     */
    SetPrintHeadings(bPrint: boolean): boolean;

    /**
     * Sets the columns that are repeated at the left of each printed page. Pass an empty string to clear
     * them.
     *
     * @param sRange - The columns to repeat (e.g. "$A:$A"). Empty string clears the print title columns.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPrintTitleColumns/
     */
    SetPrintTitleColumns(sRange: string): boolean;

    /**
     * Sets the rows that are repeated at the top of each printed page. Pass an empty string to clear them.
     *
     * @param sRange - The rows to repeat (e.g. "$1:$1"). Empty string clears the print title rows.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetPrintTitleRows/
     */
    SetPrintTitleRows(sRange: string): boolean;

    /**
     * Sets the right part of the footer used when the worksheet is printed.
     *
     * @param sText - The right footer text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetRightFooter/
     */
    SetRightFooter(sText: string): boolean;

    /**
     * Sets the right part of the header used when the worksheet is printed.
     *
     * @param sText - The right header text (may contain formatting codes such as &P, &D).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetRightHeader/
     */
    SetRightHeader(sText: string): boolean;

    /**
     * Sets the size of the right margin.
     *
     * @param nMargin - The right margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetRightMargin/
     */
    SetRightMargin(nMargin: number): boolean;

    /**
     * Sets whether the header and footer are scaled with the document when it is scaled for printing.
     *
     * @param bScale - Specifies whether the header and footer are scaled with the document.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetScaleWithDocHeaderFooter/
     */
    SetScaleWithDocHeaderFooter(bScale: boolean): boolean;

    /**
     * Sets the size of the top margin.
     *
     * @param nMargin - The top margin size measured in millimeters.
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetTopMargin/
     */
    SetTopMargin(nMargin: number): boolean;

    /**
     * Sets the scaling factor (in percent) used when the worksheet is printed.
     * Setting this property turns off the "fit to page" mode.
     *
     * @param nZoom - The scaling factor measured in percent (10-400).
     * @returns Returns true if the operation is successful.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPageSetup/Methods/SetZoom/
     */
    SetZoom(nZoom: number): boolean;
  }

  /**
   * Class representing the paragraph properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/
   */
  export interface ApiParaPr {
    /**
     * Returns a type of the ApiParaPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetClassType/
     */
    GetClassType(): "paraPr";

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetTabs/
     */
    GetTabs(): TabStop[];

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetBullet/
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetJc/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetOutlineLvl/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingAfter/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingBefore/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;
  }

  /**
   * Class representing a paragraph.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/AddElement/
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /**
     * Adds a line break to the current position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/AddLineBreak/
     */
    AddLineBreak(): ApiRun;

    /**
     * Adds a tab stop to the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/AddTabStop/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): ApiRun;

    /**
     * Creates a paragraph copy. Ingnore comments, footnote references, complex fields.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/Copy/
     */
    Copy(): ApiParagraph;

    /**
     * Deletes the current paragraph.
     *
     * @returns returns false if paragraph haven't parent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a type of the ApiParagraph class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetClassType/
     */
    GetClassType(): "paragraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns all font names from all elements inside the current paragraph.
     *
     * @returns The font names used for the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): twips | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): twips | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): twips | undefined;

    /**
     * Returns an internal ID of the current paragraph.
     *
     * @since 9.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetInternalId/
     */
    GetInternalId(): string;

    /**
     * Returns the paragraph contents justification.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the last Run with text in the current paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetLastRunWithText/
     */
    GetLastRunWithText(): ApiRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetNext/
     */
    GetNext(): ApiParagraph | null;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the paragraph properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetPrevious/
     */
    GetPrevious(): ApiParagraph;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): twips;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): twips;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetSpacingLineValue/
     */
    GetSpacingLineValue(): twips | line240 | undefined;

    /**
     * Returns the custom tab stops of the current paragraph.
     *
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/GetTabs/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/GetText/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/InsertParagraph/
     */
    InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;

    /**
     * Returns true if the paragraph has no content elements (only the paragraph end mark).
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/IsEmpty/
     */
    IsEmpty(): boolean;

    /**
     * Returns the last element of the paragraph.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/Last/
     */
    Last(): ParagraphContent;

    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the oElement
     *   type is not supported by a paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/Push/
     */
    Push(oElement: ParagraphContent): boolean;

    /**
     * Removes all the elements from the current paragraph.
     * <note>When all the elements are removed from the paragraph, a new empty run is automatically
     * created. If you want to add
     * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/RemoveAllElements/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/RemoveElement/
     */
    RemoveElement(nPos: number): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of this paragraph are displayed bold.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiParagraph;

    /**
     * Sets the bullet or numbering to the current paragraph.
     *
     * @param oBullet - The bullet object created with the {@link Api#CreateBullet} or {@link Api#CreateNumbering}
     *   method.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetBullet/
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Specifies that any lowercase characters in this paragraph are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current paragraph are displayed capitalized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiParagraph;

    /**
     * Sets the text color to the current paragraph.
     *
     * @param color - The text color.
     * @returns this
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetColor/
     */
    SetColor(color: ApiColor): ApiParagraph;

    /**
     * Specifies that the contents of this paragraph are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current paragraph are displayed double struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current paragraph.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiParagraph;

    /**
     * Sets the font size to the characters of the current paragraph.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiParagraph;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: twips): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: twips): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: twips): boolean;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current paragraph are displayed italicized.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiParagraph;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that will be applied to the paragraph contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetJc/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetOutlineLvl/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiParagraph;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetSpacing/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingAfter/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingBefore/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: twips | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies that the contents of this paragraph are displayed with a single horizontal line through
     * the center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current paragraph are displayed struck through.
     * @returns this
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetStrikeout/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: twips[], aVal: TabJc[]): boolean;

    /**
     * Replaces the paragraph content with the specified text.
     *
     * @param text - The text to set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetText/
     */
    SetText(text: string): ApiRun;

    /**
     * Sets the paragraph text properties.
     *
     * @param oTextPr - The paragraph text properties.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetTextPr/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiParagraph;

    /**
     * Converts the ApiParagraph object into the JSON object.
     *
     * @param bWriteNumberings - Specifies if the used numberings will be written to the JSON object or not.
     * @param bWriteStyles - Specifies if the used styles will be written to the JSON object or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiParagraph/Methods/ToJSON/
     */
    ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): object;
  }

  /**
   * Class representing a path in geometry.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/ArcTo/
     */
    ArcTo(wR: GeometryCoordinate, hR: GeometryCoordinate, stAng: GeometryCoordinate, swAng: GeometryCoordinate): void;

    /**
     * Closes the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/Close/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/CubicBezTo/
     */
    CubicBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate, x3: GeometryCoordinate, y3: GeometryCoordinate): void;

    /**
     * Returns a specific path command by its index.
     *
     * @param nIndex - The path command index.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetCommand/
     */
    GetCommand(nIndex: number): ApiPathCommand | null;

    /**
     * Returns the number of commands for the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetCommandCount/
     */
    GetCommandCount(): number;

    /**
     * Returns all commands of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetCommands/
     */
    GetCommands(): ApiPathCommand[];

    /**
     * Returns the fill type of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetFill/
     */
    GetFill(): PathFillType;

    /**
     * Returns the height of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns true if the current path is stroked, otherwise false.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetStroke/
     */
    GetStroke(): boolean;

    /**
     * Returns the width of the current path.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Draws a line from the current point to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/LineTo/
     */
    LineTo(x: GeometryCoordinate, y: GeometryCoordinate): void;

    /**
     * Moves the current path to the specified coordinates.
     *
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/MoveTo/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/QuadBezTo/
     */
    QuadBezTo(x1: GeometryCoordinate, y1: GeometryCoordinate, x2: GeometryCoordinate, y2: GeometryCoordinate): void;

    /**
     * Sets the fill type to the current path.
     *
     * @param sFill - The path fill type.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/SetFill/
     */
    SetFill(sFill: PathFillType): void;

    /**
     * Sets the height to the current path.
     *
     * @param nHeight - The path height in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/SetHeight/
     */
    SetHeight(nHeight: number): void;

    /**
     * Sets whether the current path is stroked.
     *
     * @param bStroke - Specifies if the path is stroked (true) or not (false).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/SetStroke/
     */
    SetStroke(bStroke: boolean): void;

    /**
     * Sets the width to the current path.
     *
     * @param nWidth - The path width in EMU.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPath/Methods/SetWidth/
     */
    SetWidth(nWidth: number): void;
  }

  /**
   * Class representing a path command.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/
   */
  export interface ApiPathCommand {
    /**
     * Returns the height radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetHR/
     */
    GetHR(): string | null;

    /**
     * Returns the start angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetStartAngle/
     */
    GetStartAngle(): string | null;

    /**
     * Returns the sweep angle of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetSweepAngle/
     */
    GetSweepAngle(): string | null;

    /**
     * Returns the type of the current path command.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetType/
     */
    GetType(): PathCommandType;

    /**
     * Returns the width radius of the arc.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetWR/
     */
    GetWR(): string | null;

    /**
     * Returns the X coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetX/
     */
    GetX(): string | null;

    /**
     * Returns the X coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetX0/
     */
    GetX0(): string | null;

    /**
     * Returns the X coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetX1/
     */
    GetX1(): string | null;

    /**
     * Returns the X coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetX2/
     */
    GetX2(): string | null;

    /**
     * Returns the Y coordinate for the "moveTo"/"lineTo" path commands.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetY/
     */
    GetY(): string | null;

    /**
     * Returns the Y coordinate of the first control point for the Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetY0/
     */
    GetY0(): string | null;

    /**
     * Returns the Y coordinate of the second control point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetY1/
     */
    GetY1(): string | null;

    /**
     * Returns the Y coordinate of the end point for the cubic Bezier curves.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPathCommand/Methods/GetY2/
     */
    GetY2(): string | null;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPictureForm/
   */
  export interface ApiPictureForm extends ApiFormBase {
  }

  /**
   * Class representing a pivot table data field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/
   */
  export interface ApiPivotDataField extends ApiPivotField {
    /**
     * Establishes automatic field-sorting rules for the pivot table reports.
     *
     * @param order - The sort order.
     * @param field - The name of the field to sort by (pivotField.SourceName, pivotField.Name, dataField.Name).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/AutoSort/
     */
    AutoSort(order: SortOrder, field: string): void;

    /**
     * Deletes all filters currently applied to the pivot field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearAllFilters/
     */
    ClearAllFilters(): void;

    /**
     * Deletes all label filters or all date filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearLabelFilters/
     */
    ClearLabelFilters(): void;

    /**
     * Deletes all manual filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearManualFilters/
     */
    ClearManualFilters(): void;

    /**
     * Deletes all value filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearValueFilters/
     */
    ClearValueFilters(): void;

    /**
     * Returns a value that represents the label text for the data field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetCaption/
     */
    GetCaption(): string;

    /**
     * Returns the current page which is displayed for the page field (valid only for page fields).
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetCurrentPage/
     */
    GetCurrentPage(): string | number;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the column
     * position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToColumn/
     */
    GetDragToColumn(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the data position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToData/
     */
    GetDragToData(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the page position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToPage/
     */
    GetDragToPage(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the row position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToRow/
     */
    GetDragToRow(): boolean;

    /**
     * Returns a function performed in the data field.
     *
     * @returns func - The function performed in the added data field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetFunction/
     */
    GetFunction(): DataConsolidateFunctionType;

    /**
     * Returns an index of the data field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns the setting which specifies whether to insert blank rows after each item.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutBlankLine/
     */
    GetLayoutBlankLine(): boolean;

    /**
     * Returns the setting which specifies whether a pivot table field is compacted.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutCompactRow/
     */
    GetLayoutCompactRow(): boolean;

    /**
     * Returns the way the specified pivot table items appear — in table format or in outline format.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutForm/
     */
    GetLayoutForm(): PivotLayoutType;

    /**
     * Returns the setting which specifies whether to insert a page break after each field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutPageBreak/
     */
    GetLayoutPageBreak(): boolean;

    /**
     * Returns the layout subtotal location.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutSubtotalLocation/
     */
    GetLayoutSubtotalLocation(): LayoutSubtotalLocationType;

    /**
     * Returns the setting which specifies whether to show subtotals.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutSubtotals/
     */
    GetLayoutSubtotals(): boolean;

    /**
     * Returns a value representing the object name.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a value that represents the format code for the object.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string | null;

    /**
     * Returns a data field orientation value that represents the data field location in the specified
     * pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetOrientation/
     */
    GetOrientation(): PivotFieldOrientationType;

    /**
     * Returns the parent object for the current field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetParent/
     */
    GetParent(): ApiPivotTable;

    /**
     * Returns the pivot field from which the data field was created.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetPivotField/
     */
    GetPivotField(): ApiPivotField;

    /**
     * Returns the collection of pivot filters applied to the specified pivot field.
     *
     * @since 9.1.0
     */
    GetPivotFilters(): ApiPivotFilters;

    /**
     * Returns an object that represents either a single pivot table item (the ApiPivotItem object)
     * or a collection of all the visible and hidden items (an array of the ApiPivotItem objects) in the
     * specified field.
     *
     * @param index - The item index.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetPivotItems/
     */
    GetPivotItems(index?: number): ApiPivotItem[] | ApiPivotItem | null;

    /**
     * Returns a value that represents the data field position within a category.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetPosition/
     */
    GetPosition(): number;

    /**
     * Returns the setting which specifies whether to repeat items labels at each row.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetRepeatLabels/
     */
    GetRepeatLabels(): boolean;

    /**
     * Returns the setting which specifies whether to show items with no data.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetShowAllItems/
     */
    GetShowAllItems(): boolean;

    /**
     * Returns the setting which specifies whether the pivot table field is currently visible in the pivot
     * table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetShowingInAxis/
     */
    GetShowingInAxis(): boolean;

    /**
     * Returns a source name for the pivot table field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSourceName/
     */
    GetSourceName(): string;

    /**
     * Returns the text label displayed in the subtotal column or row heading in the specified pivot table
     * report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSubtotalName/
     */
    GetSubtotalName(): string;

    /**
     * Returns an object that represents all subtotals.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSubtotals/
     */
    GetSubtotals(): PivotFieldSubtotals;

    /**
     * Returns the ApiPivotTable object which represents the pivot table for the current field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetTable/
     */
    GetTable(): ApiPivotTable;

    /**
     * Returns a value representing the name of the specified data field in the pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Moves the current pivot field inside the category.
     *
     * @param type - The direction to move the pivot table field, or the pivot field orientation type.
     * @param index - The field index in a new category.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/Move/
     */
    Move(type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;

    /**
     * Removes the current pivot field from the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/Remove/
     */
    Remove(): void;

    /**
     * Sets a value that represents the label text for the pivot field.
     *
     * @param caption - The label text for the pivot field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetCaption/
     */
    SetCaption(caption: string): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the column position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the column position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToColumn/
     */
    SetDragToColumn(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the data position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the data position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToData/
     */
    SetDragToData(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the page position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the page position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToPage/
     */
    SetDragToPage(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the row position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the row position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToRow/
     */
    SetDragToRow(flag: boolean): void;

    /**
     * Sets a function to the current data field.
     *
     * @param func - The function to perform in the added data field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/SetFunction/
     */
    SetFunction(func: DataConsolidateFunctionType): void;

    /**
     * Sets the setting which specifies whether to insert blank rows after each item.
     *
     * @param insert - Specifies whether to insert blank rows after each item.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutBlankLine/
     */
    SetLayoutBlankLine(insert: boolean): void;

    /**
     * Sets the setting which specifies whether a pivot table field is compacted.
     *
     * @param compact - Specifies whether a pivot table field is compacted.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutCompactRow/
     */
    SetLayoutCompactRow(compact: boolean): void;

    /**
     * Sets the way the specified pivot table items appear — in table format or in outline format.
     *
     * @param type - The layout type of the pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutForm/
     */
    SetLayoutForm(type: PivotLayoutType): void;

    /**
     * Sets the setting which specifies whether to insert a page break after each field.
     *
     * @param insert - Specifies whether to insert a page break after each field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutPageBreak/
     */
    SetLayoutPageBreak(insert: boolean): void;

    /**
     * Sets the layout subtotal location.
     *
     * @param type - The layout subtotal location.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutSubtotalLocation/
     */
    SetLayoutSubtotalLocation(type: LayoutSubtotalLocationType): void;

    /**
     * Sets the setting which specifies whether to show subtotals.
     *
     * @param show - Specifies whether to show subtotals.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutSubtotals/
     */
    SetLayoutSubtotals(show: boolean): void;

    /**
     * Sets a value representing the object name.
     *
     * @param name - The object name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetName/
     */
    SetName(name: string): void;

    /**
     * Sets a value that represents the format code for the object.
     *
     * @param format - The format code for the object.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotDataField/Methods/SetNumberFormat/
     */
    SetNumberFormat(format: string): void;

    /**
     * Sets a pivot field orientation value that represents the location
     * of the field in the specified pivot table report.
     *
     * @param type - The pivot field orientation type.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetOrientation/
     */
    SetOrientation(type: PivotFieldOrientationType): void;

    /**
     * Sets a value that represents the position of the field (first, second, third, and so on)
     * among all the fields in its orientation (Rows, Columns, Pages, Data).
     *
     * @param position - The field position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetPosition/
     */
    SetPosition(position: number): void;

    /**
     * Sets the setting which specifies whether to repeat items labels at each row.
     *
     * @param repeat - Specifies whether to repeat items labels at each row.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetRepeatLabels/
     */
    SetRepeatLabels(repeat: boolean): void;

    /**
     * Sets the setting which specifies whether to show items with no data.
     *
     * @param show - Specifies whether to show items with no data.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetShowAllItems/
     */
    SetShowAllItems(show: boolean): void;

    /**
     * Sets the text label displayed in the subtotal column or row heading in the specified pivot table
     * report.
     *
     * @param caption - The text label displayed in the subtotal column or row heading.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetSubtotalName/
     */
    SetSubtotalName(caption: string): void;

    /**
     * Sets an object that represents all subtotals.
     *
     * @param subtotals - An object that represents all subtotals or some of them.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetSubtotals/
     */
    SetSubtotals(subtotals: PivotFieldSubtotals): void;

    /**
     * Sets a value representing the name of the specified field in the pivot table report.
     *
     * @param name - The name of the specified field in the pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetValue/
     */
    SetValue(name: string): void;
  }

  /**
   * Class representing a pivot table field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/
   */
  export interface ApiPivotField {
    /**
     * Establishes automatic field-sorting rules for the pivot table reports.
     *
     * @param order - The sort order.
     * @param field - The name of the field to sort by (pivotField.SourceName, pivotField.Name, dataField.Name).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/AutoSort/
     */
    AutoSort(order: SortOrder, field: string): void;

    /**
     * Deletes all filters currently applied to the pivot field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearAllFilters/
     */
    ClearAllFilters(): void;

    /**
     * Deletes all label filters or all date filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearLabelFilters/
     */
    ClearLabelFilters(): void;

    /**
     * Deletes all manual filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearManualFilters/
     */
    ClearManualFilters(): void;

    /**
     * Deletes all value filters from the pivot filters collection.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/ClearValueFilters/
     */
    ClearValueFilters(): void;

    /**
     * Returns a value that represents the label text for the pivot field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetCaption/
     */
    GetCaption(): string;

    /**
     * Returns the current page which is displayed for the page field (valid only for page fields).
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetCurrentPage/
     */
    GetCurrentPage(): string | number;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the column
     * position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToColumn/
     */
    GetDragToColumn(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the data position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToData/
     */
    GetDragToData(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the page position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToPage/
     */
    GetDragToPage(): boolean;

    /**
     * Returns the setting which specifies whether the specified field can be dragged to the row position.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetDragToRow/
     */
    GetDragToRow(): boolean;

    /**
     * Returns an index for the pivot table field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns the setting which specifies whether to insert blank rows after each item.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutBlankLine/
     */
    GetLayoutBlankLine(): boolean;

    /**
     * Returns the setting which specifies whether a pivot table field is compacted.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutCompactRow/
     */
    GetLayoutCompactRow(): boolean;

    /**
     * Returns the way the specified pivot table items appear — in table format or in outline format.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutForm/
     */
    GetLayoutForm(): PivotLayoutType;

    /**
     * Returns the setting which specifies whether to insert a page break after each field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutPageBreak/
     */
    GetLayoutPageBreak(): boolean;

    /**
     * Returns the layout subtotal location.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutSubtotalLocation/
     */
    GetLayoutSubtotalLocation(): LayoutSubtotalLocationType;

    /**
     * Returns the setting which specifies whether to show subtotals.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetLayoutSubtotals/
     */
    GetLayoutSubtotals(): boolean;

    /**
     * Returns a value representing the object name.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a pivot field orientation value that represents the location
     * of the field in the specified pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetOrientation/
     */
    GetOrientation(): PivotFieldOrientationType;

    /**
     * Returns the parent object for the current field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetParent/
     */
    GetParent(): ApiPivotTable;

    /**
     * Returns the collection of pivot filters applied to the specified pivot field.
     *
     * @since 9.1.0
     */
    GetPivotFilters(): ApiPivotFilters;

    /**
     * Returns an object that represents either a single pivot table item (the ApiPivotItem object)
     * or a collection of all the visible and hidden items (an array of the ApiPivotItem objects) in the
     * specified field.
     *
     * @param index - The item index.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetPivotItems/
     */
    GetPivotItems(index?: number): ApiPivotItem[] | ApiPivotItem | null;

    /**
     * Returns a value that represents the position of the field (first, second, third, and so on)
     * among all the fields in its orientation (Rows, Columns, Pages, Data).
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetPosition/
     */
    GetPosition(): number;

    /**
     * Returns the setting which specifies whether to repeat items labels at each row.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetRepeatLabels/
     */
    GetRepeatLabels(): boolean;

    /**
     * Returns the setting which specifies whether to show items with no data.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetShowAllItems/
     */
    GetShowAllItems(): boolean;

    /**
     * Returns the setting which specifies whether the pivot table field is currently visible in the pivot
     * table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetShowingInAxis/
     */
    GetShowingInAxis(): boolean;

    /**
     * Returns a source name for the pivot table field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSourceName/
     */
    GetSourceName(): string;

    /**
     * Returns the text label displayed in the subtotal column or row heading in the specified pivot table
     * report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSubtotalName/
     */
    GetSubtotalName(): string;

    /**
     * Returns an object that represents all subtotals.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetSubtotals/
     */
    GetSubtotals(): PivotFieldSubtotals;

    /**
     * Returns the ApiPivotTable object which represents the pivot table for the current field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetTable/
     */
    GetTable(): ApiPivotTable;

    /**
     * Returns a value representing the name of the specified field in the pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Moves the current pivot field inside the category.
     *
     * @param type - The direction to move the pivot table field, or the pivot field orientation type.
     * @param index - The field index in a new category.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/Move/
     */
    Move(type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;

    /**
     * Removes the current pivot field from the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/Remove/
     */
    Remove(): void;

    /**
     * Sets a value that represents the label text for the pivot field.
     *
     * @param caption - The label text for the pivot field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetCaption/
     */
    SetCaption(caption: string): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the column position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the column position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToColumn/
     */
    SetDragToColumn(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the data position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the data position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToData/
     */
    SetDragToData(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the page position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the page position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToPage/
     */
    SetDragToPage(flag: boolean): void;

    /**
     * Sets the setting which specifies whether the specified field can be dragged to the row position.
     *
     * @param flag - Specifies whether the specified field can be dragged to the row position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetDragToRow/
     */
    SetDragToRow(flag: boolean): void;

    /**
     * Sets the setting which specifies whether to insert blank rows after each item.
     *
     * @param insert - Specifies whether to insert blank rows after each item.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutBlankLine/
     */
    SetLayoutBlankLine(insert: boolean): void;

    /**
     * Sets the setting which specifies whether a pivot table field is compacted.
     *
     * @param compact - Specifies whether a pivot table field is compacted.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutCompactRow/
     */
    SetLayoutCompactRow(compact: boolean): void;

    /**
     * Sets the way the specified pivot table items appear — in table format or in outline format.
     *
     * @param type - The layout type of the pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutForm/
     */
    SetLayoutForm(type: PivotLayoutType): void;

    /**
     * Sets the setting which specifies whether to insert a page break after each field.
     *
     * @param insert - Specifies whether to insert a page break after each field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutPageBreak/
     */
    SetLayoutPageBreak(insert: boolean): void;

    /**
     * Sets the layout subtotal location.
     *
     * @param type - The layout subtotal location.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutSubtotalLocation/
     */
    SetLayoutSubtotalLocation(type: LayoutSubtotalLocationType): void;

    /**
     * Sets the setting which specifies whether to show subtotals.
     *
     * @param show - Specifies whether to show subtotals.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetLayoutSubtotals/
     */
    SetLayoutSubtotals(show: boolean): void;

    /**
     * Sets a value representing the object name.
     *
     * @param name - The object name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetName/
     */
    SetName(name: string): void;

    /**
     * Sets a pivot field orientation value that represents the location
     * of the field in the specified pivot table report.
     *
     * @param type - The pivot field orientation type.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetOrientation/
     */
    SetOrientation(type: PivotFieldOrientationType): void;

    /**
     * Sets a value that represents the position of the field (first, second, third, and so on)
     * among all the fields in its orientation (Rows, Columns, Pages, Data).
     *
     * @param position - The field position.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetPosition/
     */
    SetPosition(position: number): void;

    /**
     * Sets the setting which specifies whether to repeat items labels at each row.
     *
     * @param repeat - Specifies whether to repeat items labels at each row.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetRepeatLabels/
     */
    SetRepeatLabels(repeat: boolean): void;

    /**
     * Sets the setting which specifies whether to show items with no data.
     *
     * @param show - Specifies whether to show items with no data.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetShowAllItems/
     */
    SetShowAllItems(show: boolean): void;

    /**
     * Sets the text label displayed in the subtotal column or row heading in the specified pivot table
     * report.
     *
     * @param caption - The text label displayed in the subtotal column or row heading.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetSubtotalName/
     */
    SetSubtotalName(caption: string): void;

    /**
     * Sets an object that represents all subtotals.
     *
     * @param subtotals - An object that represents all subtotals or some of them.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetSubtotals/
     */
    SetSubtotals(subtotals: PivotFieldSubtotals): void;

    /**
     * Sets a value representing the name of the specified field in the pivot table report.
     *
     * @param name - The name of the specified field in the pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotField/Methods/SetValue/
     */
    SetValue(name: string): void;
  }

  /**
   * Class representing a collection of pivot filters applied to a pivot field.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotFilters/
   */
  export interface ApiPivotFilters {
    /**
     * Adds a new filter to the pivot field. This method is VBA-compatible and follows the PivotFilters.Add
     * signature from Excel VBA.
     * Supports all major filter types including label filters, value filters, top/bottom filters, and date
     * filters.
     *
     * @param filterType - The type of filter to add. Must match VBA XlPivotFilterType enum values.
     * @param dataField - The data field object to filter by. Required for value filters (xlValue* types) and top/bottom
     *   filters.
     * @param value1 - The first value for the filter condition. Required for comparison, between, and top/bottom count
     *   filters.
     * @param value2 - The second value for "Between" conditions (xlCaptionIsBetween, xlCaptionIsNotBetween,
     *   xlValueIsBetween).
     * @param wholeDayFilter - Specifies whether to filter by whole day for date filters. Reserved for future use, currently
     *   not implemented.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotFilters/Methods/Add/
     */
    Add(filterType: XlPivotFilterType, dataField?: ApiPivotDataField, value1?: string | number | Date, value2?: string | number | Date, wholeDayFilter?: boolean): void;
  }

  /**
   * Class representing a pivot table field item.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/
   */
  export interface ApiPivotItem {
    /**
     * Returns a caption of the pivot item.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/GetCaption/
     */
    GetCaption(): string;

    /**
     * Returns a name of the pivot item.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a parent of the pivot item.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/GetParent/
     */
    GetParent(): ApiPivotField;

    /**
     * Returns a name of the specified item in the pivot table field.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/GetValue/
     */
    GetValue(): string;

    /**
     * Returns the visibility of the pivot item.
     *
     * @returns True if the pivot item is visible, false otherwise.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/GetVisible/
     */
    GetVisible(): boolean;

    /**
     * Sets the visibility of the pivot item.
     * <note> At least one item must remain visible when hiding others. </note>
     *
     * @param visible - Specifies whether the pivot item is visible.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotItem/Methods/SetVisible/
     */
    SetVisible(visible: boolean): void;
  }

  /**
   * Class representing a pivot table.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/
   */
  export interface ApiPivotTable {
    /**
     * Adds a data field to the pivot table report.
     *
     * @param field - The index number or name of the data field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/AddDataField/
     */
    AddDataField(field: number | string): ApiPivotDataField;

    /**
     * Adds the row, column, and page fields to the pivot table report.
     *
     * @param options - The settings for adding row, column, and page fields to the pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/AddFields/
     */
    AddFields(options: PivotTableFieldOptions): void;

    /**
     * Deletes all filters currently applied to the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/ClearAllFilters/
     */
    ClearAllFilters(): void;

    /**
     * Clears the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/ClearTable/
     */
    ClearTable(): void;

    /**
     * Returns a collection that is currently displayed as column fields in the pivot table.
     *
     * @param field - The name or index of the field to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetColumnFields/
     */
    GetColumnFields(field?: number | string): ApiPivotField[];

    /**
     * Returns the **Grand Totals** setting of the pivot table columns.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetColumnGrand/
     */
    GetColumnGrand(): boolean;

    /**
     * Returns a Range object that represents the column area in the pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetColumnRange/
     */
    GetColumnRange(): ApiRange | null;

    /**
     * Returns the value for the data field in a pivot table.
     *
     * @param items - Describes a single cell in the pivot table report. For example, "'Estimated Costs' Tables May",
     *   which shows the estimated costs for tables in May (Data field = Costs, Product = Tables, Month =
     *   May).
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetData/
     */
    GetData(items: string[]): number | null;

    /**
     * Returns a Range object that represents the range of values in the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetDataBodyRange/
     */
    GetDataBodyRange(): ApiRange;

    /**
     * Returns a collection that represents either a single pivot table data field
     * or a collection of all visible data fields.
     *
     * @param field - The name or index of the field to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetDataFields/
     */
    GetDataFields(field?: number | string): ApiPivotDataField[] | ApiPivotDataField | null;

    /**
     * Returns the pivot table description.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetDescription/
     */
    GetDescription(): string;

    /**
     * Returns the setting which specifies whether to display field headers for rows and columns.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetDisplayFieldCaptions/
     */
    GetDisplayFieldCaptions(): boolean;

    /**
     * Returns the pivot table display fields in the report filter area settings.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetDisplayFieldsInReportFilterArea/
     */
    GetDisplayFieldsInReportFilterArea(): PivotTableFilterAreaInfo;

    /**
     * Returns the text string label that is displayed in the grand total column or row heading in the
     * specified pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetGrandTotalName/
     */
    GetGrandTotalName(): string;

    /**
     * Returns an array that represents all the hidden fields in the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetHiddenFields/
     */
    GetHiddenFields(): ApiPivotField[];

    /**
     * Returns the pivot table name.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a collection that represents either a single pivot table page field
     * or a collection of all visible page fields.
     *
     * @param field - The name or index of the field to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetPageFields/
     */
    GetPageFields(field?: number | string): ApiPivotField[];

    /**
     * Returns the parent object for the current pivot table.
     *
     * @returns The parent object for the current pivot table.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetParent/
     */
    GetParent(): ApiWorksheet;

    /**
     * Returns a Range object with information about a data item in the pivot table report.
     *
     * @param dataField - The name of the field containing the data for the PivotTable.
     * @param fieldItemsArray - An array of field items from the pivot table.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetPivotData/
     */
    GetPivotData(dataField?: string, fieldItemsArray?: string[]): ApiRange;

    /**
     * Returns a collection that represents either a single pivot table field
     * or a collection of both the visible and hidden fields in the pivot table report.
     *
     * @param field - The name or index of the field to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetPivotFields/
     */
    GetPivotFields(field?: string | number): ApiPivotField[] | ApiPivotField | ApiPivotDataField | null;

    /**
     * Returns a collection that is currently displayed as row fields in the pivot table.
     *
     * @param field - The name or index of the field to be returned.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetRowFields/
     */
    GetRowFields(field?: number | string): ApiPivotField[];

    /**
     * Returns the **Grand Totals** setting of the pivot table rows.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetRowGrand/
     */
    GetRowGrand(): boolean;

    /**
     * Returns a Range object that represents the row area in the pivot table report.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetRowRange/
     */
    GetRowRange(): ApiRange | null;

    /**
     * Returns the source range for the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetSource/
     */
    GetSource(): ApiRange;

    /**
     * Returns the pivot table style name.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetStyleName/
     */
    GetStyleName(): string;

    /**
     * Returns a Range object that represents the entire pivot table report, but doesn't include page
     * fields.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableRange1/
     */
    GetTableRange1(): ApiRange | null;

    /**
     * Returns a Range object that represents the entire pivot table report, including page fields.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableRange2/
     */
    GetTableRange2(): ApiRange | null;

    /**
     * Returns the setting which specifies whether the column headers of the pivot table will be
     * highlighted with the special formatting.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableStyleColumnHeaders/
     */
    GetTableStyleColumnHeaders(): boolean;

    /**
     * Returns the setting which specifies whether the background color alternation for odd and even
     * columns will be enabled for the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableStyleColumnStripes/
     */
    GetTableStyleColumnStripes(): boolean;

    /**
     * Returns the setting which specifies whether the row headers of the pivot table will be highlighted
     * with the special formatting.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableStyleRowHeaders/
     */
    GetTableStyleRowHeaders(): boolean;

    /**
     * Returns the setting which specifies whether the background color alternation for odd and even rows
     * will be enabled for the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTableStyleRowStripes/
     */
    GetTableStyleRowStripes(): boolean;

    /**
     * Returns the pivot table title.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetTitle/
     */
    GetTitle(): string;

    /**
     * Returns an array that represents all the visible fields in the pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/GetVisibleFields/
     */
    GetVisibleFields(): ApiPivotField[];

    /**
     * Moves the specified field from one category to another.
     *
     * @param identifier - The index number or name of the field.
     * @param type - The direction to move the pivot table field, or the pivot field orientation type.
     * @param index - The field index in a new category.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/MoveField/
     */
    MoveField(identifier: number | string, type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;

    /**
     * Returns the value of a pivot table cell.
     *
     * @param rowLine - The position of the pivot line (a line of rows in the pivot table) on the row area.
     * @param colLine - The position of the pivot line (a line of columns in the pivot table) on the column area.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/PivotValueCell/
     */
    PivotValueCell(rowLine: number, colLine: number): number | string | null;

    /**
     * Refreshes the pivot table report from the source data.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/RefreshTable/
     */
    RefreshTable(): void;

    /**
     * Removes the specified field from all the pivot table categories.
     *
     * @param identifier - The index number or name of the field.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/RemoveField/
     */
    RemoveField(identifier: number | string): void;

    /**
     * Selects the current pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/Select/
     */
    Select(): void;

    /**
     * Sets the **Grand Totals** setting to the pivot table columns.
     *
     * @param show - Specifies whether to display the grand totals for columns.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetColumnGrand/
     */
    SetColumnGrand(show: boolean): void;

    /**
     * Sets the pivot table description.
     *
     * @param description - The pivot table description.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetDescription/
     */
    SetDescription(description: string): void;

    /**
     * Sets whether to display field headers for rows and columns.
     *
     * @param show - Specifies whether to display field headers for rows and columns.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetDisplayFieldCaptions/
     */
    SetDisplayFieldCaptions(show: boolean): void;

    /**
     * Sets the pivot table display fields in the report filter area settings.
     *
     * @param type - Specifies how the report filter fields are located.
     * @param fields - A number of the report filter fields.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetDisplayFieldsInReportFilterArea/
     */
    SetDisplayFieldsInReportFilterArea(type: FieldsInReportFilterType, fields: number): void;

    /**
     * Sets the text string label that is displayed in the grand total column or row heading in the
     * specified pivot table report.
     *
     * @param name - The grand total name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetGrandTotalName/
     */
    SetGrandTotalName(name: string): void;

    /**
     * Sets the setting which specifies whether to insert blank rows after each item.
     *
     * @param insert - Specifies whether to insert blank rows after each item.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetLayoutBlankLine/
     */
    SetLayoutBlankLine(insert: boolean): void;

    /**
     * Sets the setting which specifies whether to show subtotals.
     *
     * @param show - Specifies whether to show subtotals.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetLayoutSubtotals/
     */
    SetLayoutSubtotals(show: boolean): void;

    /**
     * Sets the pivot table name.
     *
     * @param name - The pivot table name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetName/
     */
    SetName(name: string): void;

    /**
     * Specifies whether to repeat item labels for all pivot fields in the specified pivot table.
     *
     * @param repeat - Specifies whether to repeat all field item labels in a pivot table report.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetRepeatAllLabels/
     */
    SetRepeatAllLabels(repeat: boolean): void;

    /**
     * Sets the way the specified pivot table items appear — in table format or in outline format.
     *
     * @param type - The layout type of the pivot table report.
     * @param compact - Specifies whether the pivot table items will be displayed in the compact form.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetRowAxisLayout/
     */
    SetRowAxisLayout(type: PivotLayoutType, compact: boolean): void;

    /**
     * Sets the **Grand Totals** setting to the pivot table rows.
     *
     * @param show - Specifies whether to display the grand totals for rows.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetRowGrand/
     */
    SetRowGrand(show: boolean): void;

    /**
     * Sets the source range for the pivot table.
     *
     * @param source - The range where the pivot table will be located.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetSource/
     */
    SetSource(source: ApiRange): void;

    /**
     * Sets the pivot table style name.
     *
     * @param name - The pivot table style name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetStyleName/
     */
    SetStyleName(name: string): void;

    /**
     * Sets the layout subtotal location in the pivot table.
     *
     * @param type - The type of the pivot table subtotal layout.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetSubtotalLocation/
     */
    SetSubtotalLocation(type: PivotSubtotalLayoutType): void;

    /**
     * Sets the setting which specifies whether the column headers of the pivot table will be highlighted
     * with the special formatting.
     *
     * @param show - Specifies whether the column headers of the pivot table will be highlighted with the special
     *   formatting.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetTableStyleColumnHeaders/
     */
    SetTableStyleColumnHeaders(show: boolean): void;

    /**
     * Sets the setting which specifies whether the background color alternation for odd and even columns
     * will be enabled for the pivot table.
     *
     * @param show - Specifies whether the background color alternation for odd and even columns will be enabled for
     *   the pivot table.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetTableStyleColumnStripes/
     */
    SetTableStyleColumnStripes(show: boolean): void;

    /**
     * Sets the setting which specifies whether the row headers of the pivot table will be highlighted with
     * the special formatting.
     *
     * @param show - Specifies whether the row headers of the pivot table will be highlighted with the special
     *   formatting.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetTableStyleRowHeaders/
     */
    SetTableStyleRowHeaders(show: boolean): void;

    /**
     * Sets the setting which specifies whether the background color alternation for odd and even rows will
     * be enabled for the pivot table.
     *
     * @param show - Specifies whether the background color alternation for odd and even rows will be enabled for the
     *   pivot table.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetTableStyleRowStripes/
     */
    SetTableStyleRowStripes(show: boolean): void;

    /**
     * Sets the pivot table title.
     *
     * @param title - The pivot table title.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/SetTitle/
     */
    SetTitle(title: string): void;

    /**
     * Shows details of the pivot table cell.
     *
     * @param rowLine - The position of the pivot line (a line of rows in the pivot table) on the row area.
     * @param colLine - The position of the pivot line (a line of columns in the pivot table) on the column area.
     * @returns Returns true if the operation is successful.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/ShowDetails/
     */
    ShowDetails(rowLine: number, colLine: number): boolean;

    /**
     * Updates the current pivot table.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPivotTable/Methods/Update/
     */
    Update(): void;
  }

  /** Class representing a placeholder. */
  export interface ApiPlaceholder {
  }

  /** Class representing a presentation. */
  export interface ApiPresentation {
  }

  /**
   * Class representing a Preset Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPresetColor/
   */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiPresetColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiPresetColor/Methods/GetClassType/
     */
    GetClassType(): "presetColor";
  }

  /**
   * Class representing a user-protected range.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/
   */
  export interface ApiProtectedRange {
    /**
     * Sets a user to the current protected range.
     *
     * @param sId - The user ID.
     * @param sName - The user name.
     * @param protectedRangeUserType - The user type of the protected range.
     * @returns Returns null if a user doesn't have permission to modify the protected range.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/AddUser/
     */
    AddUser(sId: string, sName: string, protectedRangeUserType: ProtectedRangeUserType): ApiProtectedRangeUserInfo | null;

    /**
     * Removes a user from the current protected range.
     *
     * @param sId - The user ID.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/DeleteUser/
     */
    DeleteUser(sId: string): boolean;

    /**
     * Returns all users from the current protected range.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/GetAllUsers/
     */
    GetAllUsers(): ApiProtectedRangeUserInfo[] | null;

    /**
     * Returns an object that represents a user from the current protected range.
     *
     * @param sId - The user ID.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/GetUser/
     */
    GetUser(sId: string): ApiProtectedRangeUserInfo | null;

    /**
     * Sets the type of the "Anyone" user to the current protected range.
     *
     * @param protectedRangeUserType - The user type of the protected range.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/SetAnyoneType/
     */
    SetAnyoneType(protectedRangeUserType: ProtectedRangeUserType): boolean;

    /**
     * Sets a range to the current protected range.
     *
     * @param sRange - The cell range which will be set for the current protected range.
     * @returns Returns false if a user doesn't have permission to modify the protected range.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/SetRange/
     */
    SetRange(sRange: string): boolean;

    /**
     * Sets a title to the current protected range.
     *
     * @param sTitle - The title which will be displayed for the current protected range.
     * @returns Returns false if a user doesn't have permission to modify the protected range.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRange/Methods/SetTitle/
     */
    SetTitle(sTitle: string): boolean;
  }

  /**
   * Class representing a user from the current protected range.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRangeUserInfo/
   */
  export interface ApiProtectedRangeUserInfo {
    /**
     * Returns the ID property of the current user's information.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRangeUserInfo/Methods/GetId/
     */
    GetId(): string | null;

    /**
     * Returns the name property of the current user's information.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRangeUserInfo/Methods/GetName/
     */
    GetName(): string | null;

    /**
     * Returns the type property of the current user's information.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiProtectedRangeUserInfo/Methods/GetType/
     */
    GetType(): ProtectedRangeUserType;
  }

  /**
   * Class representing an RGB Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRGBColor/
   */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiRGBColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRGBColor/Methods/GetClassType/
     */
    GetClassType(): "rgbColor";
  }

  /**
   * Class representing a range.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/
   */
  export interface ApiRange {
    /**
     * Adds a comment to the current range.
     *
     * @param sText - The comment text.
     * @param sAuthor - The author's name (optional).
     * @returns returns false if comment can't be added.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/AddComment/
     */
    AddComment(sText: string, sAuthor: string): ApiComment | null;

    /**
     * Changes the width of the columns or the height of the rows in the range to achieve the best fit.
     *
     * @param bRows - Specifies if the width of the columns will be autofit.
     * @param bCols - Specifies if the height of the rows will be autofit.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/AutoFit/
     */
    AutoFit(bRows?: boolean, bCols?: boolean): void;

    /**
     * Clears the current range.
     *
     * @returns returns true if the range was cleared successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Clears all contents from the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/ClearContents/
     */
    ClearContents(): void;

    /**
     * Clears all formatting from the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/ClearFormats/
     */
    ClearFormats(): void;

    /**
     * Clears all hyperlinks from the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/ClearHyperlinks/
     */
    ClearHyperlinks(): void;

    /**
     * Copies the range to the specified range or to the clipboard.
     *
     * @param destination - Specifies the new range to which the specified range will be copied. If this argument is
     *   omitted, the range will be copied to the clipboard.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Copy/
     */
    Copy(destination?: ApiRange): void;

    /**
     * Cuts the range and save it to the clipboard or paste it to the specified range.
     *
     * @param destination - Specifies the new range to which the cut range will be pasted. If this argument is omitted, the
     *   range will be copied to the clipboard.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Cut/
     */
    Cut(destination?: ApiRange): void;

    /**
     * Deletes the Range object.
     *
     * @param shift - Specifies how to shift cells to replace the deleted cells. If omitted, the direction is
     *   determined automatically: _"up"_ if the range has more columns than rows, otherwise _"left"_.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Delete/
     */
    Delete(shift?: DeleteShiftDirection): void;

    /**
     * Returns a Range object that represents the end in the specified direction in the specified range.
     *
     * @param direction - The direction of end in the specified range. *
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/End/
     */
    End(direction: Direction): ApiRange;

    /**
     * Finds specific information in the current range.
     *
     * @param oSearchData - The search data used to make search.
     * @returns Returns null if the current range does not contain such text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Find/
     */
    Find(oSearchData: SearchData): ApiRange | null;

    /**
     * Continues a search that was begun with the {@link ApiRange#Find} method. Finds the next cell that
     * matches those same conditions and returns the ApiRange object that represents that cell. This does
     * not affect the selection or the active cell.
     *
     * @param After - The cell after which the search will start. If this argument is not specified, the search starts
     *   from the last cell found.
     * @returns Returns null if the range does not contain such text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/FindNext/
     */
    FindNext(After: ApiRange): ApiRange | null;

    /**
     * Continues a search that was begun with the {@link ApiRange#Find} method. Finds the previous cell
     * that matches those same conditions and returns the ApiRange object that represents that cell. This
     * does not affect the selection or the active cell.
     *
     * @param Before - The cell before which the search will start. If this argument is not specified, the search
     *   starts from the last cell found.
     * @returns Returns null if the range does not contain such text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/FindPrevious/
     */
    FindPrevious(Before: ApiRange): ApiRange | null;

    /**
     * Executes a provided function once for each cell.
     *
     * @param fCallback - A function which will be executed for each cell.
     * @returns returns true if the callback was executed, false if the callback is not a function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/ForEach/
     */
    ForEach(fCallback: (...args: unknown[]) => unknown): boolean;

    /**
     * Returns the range address.
     *
     * @param RowAbs - Defines if the link to the row is absolute or not.
     * @param ColAbs - Defines if the link to the column is absolute or not.
     * @param RefStyle - The reference style.
     * @param External - Defines if the range is in the current file or not.
     * @param RelativeTo - The range which the current range is relative to.
     * @returns returns address of range as string.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetAddress/
     */
    GetAddress(RowAbs: boolean, ColAbs: boolean, RefStyle: string, External: boolean, RelativeTo: ApiRange): string | null;

    /**
     * Returns a collection of the ranges.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetAreas/
     */
    GetAreas(): ApiAreas;

    /**
     * Returns a Range object that represents all the cells in the specified range or a specified cell.
     *
     * @param row - The row number or the cell number (if only row is defined).
     * @param col - The column number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCells/
     */
    GetCells(row: number, col: number): ApiRange;

    /**
     * Returns a number of cells in the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCellsCount/
     */
    GetCellsCount(): number;

    /**
     * Returns the ApiCharacters object that represents a range of characters within the object text. Use
     * the ApiCharacters object to format characters within a text string.
     *
     * @param Start - The first character to be returned. If this argument is either 1 or omitted, this property
     *   returns a range of characters starting with the first character.
     * @param Length - The number of characters to be returned. If this argument is omitted, this property returns the
     *   remainder of the string (everything after the Start character).
     * @since 7.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCharacters/
     */
    GetCharacters(Start: number, Length: number): ApiCharacters;

    /**
     * Returns a type of the ApiRange class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetClassType/
     */
    GetClassType(): "range";

    /**
     * Returns a column number for the selected cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCol/
     */
    GetCol(): number;

    /**
     * Returns a Range object that represents the columns in the specified range.
     *
     * @param nCol - The column number. *
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCols/
     */
    GetCols(nCol: number): ApiRange | null;

    /**
     * Returns the column width value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetColumnWidth/
     */
    GetColumnWidth(): number;

    /**
     * Returns a number of columns in the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetColumnsCount/
     */
    GetColumnsCount(): number;

    /**
     * Returns the ApiComment object of the current range.
     *
     * @returns returns null if range does not consist of one cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetComment/
     */
    GetComment(): ApiComment | null;

    /**
     * Returns the rows or columns count.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns a range that represents the expanded range around the current range.
     *
     * @returns Returns the expanded range or null if the range cannot be expanded.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetCurrentRegion/
     */
    GetCurrentRegion(): ApiRange | null;

    /**
     * Returns the ApiName object of the current range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetDefName/
     */
    GetDefName(): ApiName;

    /**
     * Returns a Range object that represents the entire column(s) containing the specified range.
     *
     * @returns Returns the entire column range, or null if invalid.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetEntireColumn/
     */
    GetEntireColumn(): ApiRange | null;

    /**
     * Returns a Range object that represents the entire row(s) containing the specified range.
     *
     * @returns Returns the entire row range, or null if invalid.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetEntireRow/
     */
    GetEntireRow(): ApiRange | null;

    /**
     * Returns the background color for the current cell range. Returns 'No Fill' when the color of the
     * background in the cell / cell range is null.
     *
     * @returns return 'No Fill' when the color to the background in the cell / cell range is null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the collection of conditional formatting rules for the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetFormatConditions/
     */
    GetFormatConditions(): ApiFormatConditions;

    /**
     * Returns a formula of the specified range.
     *
     * @returns return Value2 property (value without format) if formula doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetFormula/
     */
    GetFormula(): string | string[][];

    /**
     * Returns an array formula from the current range.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetFormulaArray/
     */
    GetFormulaArray(): string | null;

    /**
     * Returns the value hiding property. The specified range must span an entire column or row.
     *
     * @returns returns true if the values in the range specified are hidden.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetHidden/
     */
    GetHidden(): boolean;

    /**
     * Returns a collection of all the hyperlinks in the range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetHyperlinks/
     */
    GetHyperlinks(): ApiHyperlinks;

    /**
     * Returns a value that represents the format code for the current range.
     *
     * @returns This property returns null if all cells in the specified range don't have the same number
     *   format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string | null;

    /**
     * Returns the current range angle.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetOrientation/
     */
    GetOrientation(): Angle;

    /**
     * Returns the ApiPivotTable object that represents the pivot table report containing the upper-left
     * corner of the specified range.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetPivotTable/
     */
    GetPivotTable(): ApiPivotTable | null;

    /**
     * Returns a Range object that represents a cell or a range of cells.
     * When applied to a Range object, the property is relative to that Range object.
     *
     * @param cell1 - The first cell address (e.g., "A1" or "A1:B2").
     * @param cell2 - The second cell address (optional, defines the corner with "cell1").
     * @returns Returns the range relative to this range, or null if invalid.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetRange/
     */
    GetRange(cell1: string | ApiRange, cell2?: string | ApiRange): ApiRange | null;

    /**
     * Returns a row number for the selected cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetRow/
     */
    GetRow(): number;

    /**
     * Returns the row height value.
     *
     * @returns The row height in the range specified, measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetRowHeight/
     */
    GetRowHeight(): pt;

    /**
     * Returns a Range object that represents the rows in the specified range. If the specified row is
     * outside the Range object, a new Range will be returned that represents the cells between the columns
     * of the original range in the specified row.
     *
     * @param nRow - The row number (starts counting from 1, the 0 value returns an error).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetRows/
     */
    GetRows(nRow: number): ApiRange | null;

    /**
     * Returns a number of rows in the current range.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetRowsCount/
     */
    GetRowsCount(): number;

    /**
     * Returns the text of the specified range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetText/
     */
    GetText(): string | string[][];

    /**
     * Returns the data validation object associated with this range. If no validation object exists yet,
     * it will be created.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetValidation/
     */
    GetValidation(): ApiValidation;

    /**
     * Returns a value of the specified range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetValue/
     */
    GetValue(): string | number | boolean | (string | number | boolean)[][];

    /**
     * Returns the Value2 property (value without format) of the specified range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetValue2/
     */
    GetValue2(): string | string[][];

    /**
     * Returns the Worksheet object that represents the worksheet containing the specified range. It will
     * be available in the read-only mode.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetWorksheet/
     */
    GetWorksheet(): ApiWorksheet;

    /**
     * Returns the information about the wrapping cell style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/GetWrapText/
     */
    GetWrapText(): boolean;

    /**
     * Inserts a cell or a range of cells into the worksheet or macro sheet and shifts other cells away to
     * make space.
     *
     * @param shift - Specifies which way to shift the cells ("right", "down").
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Insert/
     */
    Insert(shift?: string): void;

    /**
     * Merges the selected cell range into a single cell or a cell row.
     *
     * @param isAcross - When set to **true**, the cells within the selected range will be merged along the rows, but
     *   remain split in the columns. When set to **false**, the whole selected range of cells will be
     *   merged into a single cell.
     * @returns returns true if the range was merged successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Merge/
     */
    Merge(isAcross: boolean): boolean;

    /**
     * Returns a Range object offset from the current range.
     *
     * @param rowOffset - The number of rows to offset the range.
     * @param columnOffset - The number of columns to offset the range.
     * @returns Returns the offset range, or null if invalid.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Offset/
     */
    Offset(rowOffset: number, columnOffset: number): ApiRange | null;

    /**
     * Pastes the Range object to the specified range.
     *
     * @param rangeFrom - Specifies the range to be pasted to the current range
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Paste/
     */
    Paste(rangeFrom: ApiRange): void;

    /**
     * Pastes the Range object to the specified range using the special paste options.
     *
     * @param sPasteType - Paste option.
     * @param sPasteSpecialOperation - The mathematical operation which will be applied to the copied data.
     * @param bSkipBlanks - Specifies whether to avoid replacing values in the paste area when blank cells occur in the copy
     *   area.
     * @param bTranspose - Specifies whether the pasted data will be transposed from rows to columns.
     * @default sPasteType = "xlPasteAll"
     * @default sPasteSpecialOperation = "xlPasteSpecialOperationNone"
     * @default bSkipBlanks = false
     * @default bTranspose = false
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/PasteSpecial/
     */
    PasteSpecial(sPasteType?: PasteType, sPasteSpecialOperation?: PasteSpecialOperation, bSkipBlanks?: boolean, bTranspose?: boolean): void;

    /**
     * Replaces specific information to another one in a range.
     *
     * @param oReplaceData - The data used to make search and replace.
     * @returns Returns true if at least one match was found and replacement was initiated, false otherwise.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Replace/
     */
    Replace(oReplaceData: ReplaceData): boolean;

    /**
     * Resizes the current range by changing the number of rows and columns.
     *
     * @param rowSize - The number of rows for the new range.
     * @param columnSize - The number of columns for the new range.
     * @returns Returns the resized range, or null if invalid.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Resize/
     */
    Resize(rowSize: number, columnSize: number): ApiRange | null;

    /**
     * Selects the current range.
     *
     * @returns returns true if the range was selected successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/Select/
     */
    Select(): boolean;

    /**
     * Sets the horizontal alignment of the text in the current cell range.
     *
     * @param sAlignment - The horizontal alignment that will be applied to the cell contents.
     * @returns return false if sAlignment doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetAlignHorizontal/
     */
    SetAlignHorizontal(sAlignment: 'left' | 'right' | 'center' | 'justify'): boolean;

    /**
     * Sets the vertical alignment of the text in the current cell range.
     *
     * @param sAlignment - The vertical alignment that will be applied to the cell contents.
     * @returns return false if sAlignment doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetAlignVertical/
     */
    SetAlignVertical(sAlignment: 'center' | 'bottom' | 'top' | 'distributed' | 'justify'): boolean;

    /**
     * Adds an AutoFilter to the current range.
     *
     * @param Field - The integer offset of the field on which you want to base the filter (from the left of the list;
     *   the leftmost field is field one). If {null} provided, clears the AutoFilter for the range.
     * @param Criteria1 - The criteria (a string; for example, "101"). Use "=" to find blank fields, "<>" to find
     *   non-blank fields, and "><" to select (No Data) fields in data types. If this argument is
     *   omitted, the criteria is All. If Operator is xlTop10Items, Criteria1 specifies the number of
     *   items (for example, "10").
     * @param Operator - An XlAutoFilterOperator constant specifying the type of filter.
     * @param Criteria2 - The second criteria (a string). Used with Criteria1 and Operator to construct compound criteria.
     * @param VisibleDropDown - True to display the AutoFilter drop-down arrow for the filtered field. False to hide the
     *   AutoFilter drop-down arrow for the filtered field. True by default.
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetAutoFilter/
     */
    SetAutoFilter(Field?: number | null, Criteria1?: string | string[] | ApiColor | XlDynamicFilterCriteria, Operator?: XlAutoFilterOperator, Criteria2?: string, VisibleDropDown?: boolean): void;

    /**
     * Sets the bold property to the text characters in the current cell or cell range.
     *
     * @param isBold - Specifies that the contents of the current cell / cell range are displayed bold.
     * @returns returns true if the bold property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetBold/
     */
    SetBold(isBold: boolean): boolean;

    /**
     * Sets the border to the cell / cell range with the parameters specified.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @returns returns true if the borders were set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): boolean;

    /**
     * Sets the width of all the columns in the current range.
     * One unit of column width is equal to the width of one character in the Normal style.
     * For proportional fonts, the width of the character 0 (zero) is used.
     *
     * @param nWidth - The width of the column divided by 7 pixels.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetColumnWidth/
     */
    SetColumnWidth(nWidth: number): void;

    /**
     * Sets the background color to the current cell range with the previously created color object.
     * Sets 'No Fill' when the previously created color object is 'No Fill' or null.
     *
     * @param color - The color object which specifies the color to be set to the background in the cell / cell range.
     *   Pass 'No Fill' or null to clear the background color.
     * @returns returns true if the fill color was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetFillColor/
     */
    SetFillColor(color: ApiColor | 'No Fill' | null): boolean;

    /**
     * Sets the text color to the current cell range with the previously created color object.
     *
     * @param oColor - The color object which specifies the color to be set to the text in the cell / cell range.
     * @returns returns true if the font color was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetFontColor/
     */
    SetFontColor(oColor: ApiColor): boolean;

    /**
     * Sets the specified font family as the font name for the current cell range.
     *
     * @param sName - The font family name used for the current cell range.
     * @returns returns true if the font name was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetFontName/
     */
    SetFontName(sName: string): boolean;

    /**
     * Sets the font size to the characters of the current cell range.
     *
     * @param nSize - The font size value measured in points.
     * @returns returns true if the font size was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetFontSize/
     */
    SetFontSize(nSize: number): boolean;

    /**
     * Sets an array formula to the current range.
     *
     * @param data - The general value for the cell or cell range.
     * @returns Returns false if such a range does not exist.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetFormulaArray/
     */
    SetFormulaArray(data: string | boolean | number): boolean;

    /**
     * Sets the value hiding property. The specified range must span an entire column or row.
     *
     * @param isHidden - Specifies if the values in the current range are hidden or not.
     * @returns returns true if the hidden property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetHidden/
     */
    SetHidden(isHidden: boolean): boolean;

    /**
     * Sets the italic property to the text characters in the current cell or cell range.
     *
     * @param isItalic - Specifies that the contents of the current cell / cell range are displayed italicized.
     * @returns returns true if the italic property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): boolean;

    /**
     * Specifies whether a number in the cell should be treated like number, currency, date, time, etc. or
     * just like text.
     *
     * @param sFormat - Specifies the mask applied to the number in the cell.
     * @returns returns true if the number format was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetNumberFormat/
     */
    SetNumberFormat(sFormat: string): boolean;

    /**
     * Sets the cell offset.
     *
     * @param nRow - The row number.
     * @param nCol - The column number.
     * @returns returns true if the offset was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetOffset/
     */
    SetOffset(nRow: number, nCol: number): boolean;

    /**
     * Sets an angle to the current cell range.
     *
     * @param angle - Specifies the range angle.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetOrientation/
     */
    SetOrientation(angle: Angle): void;

    /**
     * Sets the direction (reading order) of the text in the current cell range.
     *
     * @param direction - The direction (reading order) that will be applied to the cell contents.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetReadingOrder/
     */
    SetReadingOrder(direction: 'context' | 'ltr' | 'rtl'): void;

    /**
     * Sets the row height value.
     *
     * @param nHeight - The row height in the current range measured in points.
     * @returns returns true if the row height was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetRowHeight/
     */
    SetRowHeight(nHeight: pt): boolean;

    /**
     * Sorts the cells in the given range by the parameters specified in the request.
     *
     * @param key1 - First sort field.
     * @param sSortOrder1 - The sort order for the values specified in Key1.
     * @param key2 - Second sort field.
     * @param sSortOrder2 - The sort order for the values specified in Key2.
     * @param key3 - Third sort field.
     * @param sSortOrder3 - The sort order for the values specified in Key3.
     * @param sHeader - Specifies whether the first row contains header information.
     * @param sOrientation - Specifies if the sort should be by row (default) or column.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetSort/
     */
    SetSort(key1: ApiRange | string, sSortOrder1: SortOrder, key2: ApiRange | string, sSortOrder2: SortOrder, key3: ApiRange | string, sSortOrder3: SortOrder, sHeader: SortHeader, sOrientation: SortOrientation): void;

    /**
     * Specifies that the contents of the cell / cell range are displayed with a single horizontal line
     * through the center of the contents.
     *
     * @param isStrikeout - Specifies if the contents of the current cell / cell range are displayed struck through.
     * @returns returns true if the strikeout property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): boolean;

    /**
     * Specifies that the contents of the current cell / cell range are displayed along with a line
     * appearing directly below the character.
     *
     * @param undelineType - Specifies the type of the line displayed under the characters. The following values are
     *   available: **"none"** - for no underlining; **"single"** - for a single line underlining the
     *   cell contents; **"singleAccounting"** - for a single line underlining the cell contents but not
     *   protruding beyond the cell borders; **"double"** - for a double line underlining the cell
     *   contents; **"doubleAccounting"** - for a double line underlining the cell contents but not
     *   protruding beyond the cell borders.
     * @returns returns true if the underline property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetUnderline/
     */
    SetUnderline(undelineType: 'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'): boolean;

    /**
     * Sets a value to the current cell or cell range.
     *
     * @param data - The general value for the cell or cell range.
     * @returns returns false if such a range does not exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetValue/
     */
    SetValue(data: string | boolean | number | (string | boolean | number)[] | (string | boolean | number)[][]): boolean;

    /**
     * Specifies whether the words in the cell must be wrapped to fit the cell size or not.
     *
     * @param isWrap - Specifies if the words in the cell will be wrapped to fit the cell size.
     * @returns returns true if the wrap property was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/SetWrap/
     */
    SetWrap(isWrap: boolean): boolean;

    /**
     * Splits the selected merged cell range into the single cells.
     *
     * @returns returns true if the range was unmerged successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRange/Methods/UnMerge/
     */
    UnMerge(): boolean;
  }

  /** @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/ */
  export interface ApiRangeTextPr extends ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetOutLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetTextFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /**
   * Class representing a small text block called 'run'.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/
   */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType"> {
    /**
     * Adds a line break to the current run position and starts the next element from a new line.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/AddLineBreak/
     */
    AddLineBreak(): boolean;

    /**
     * Adds a tab stop to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/AddTabStop/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): boolean;

    /**
     * Clears the content from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Creates a copy of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/Copy/
     */
    Copy(): ApiRun;

    /**
     * Deletes the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiRun class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/GetClassType/
     */
    GetClassType(): "run";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Returns all font names from all elements inside the current run.
     *
     * @returns The font names used for the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Returns the text properties of the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Removes all the elements from the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetOutLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param oTextPr - The text properties that will be set to the current run.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiRun/Methods/SetTextPr/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /**
   * Class representing a Scheme Color.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiSchemeColor/
   */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiSchemeColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiSchemeColor/Methods/GetClassType/
     */
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing the selection in the presentation. */
  export interface ApiSelection {
  }

  /**
   * Class representing a shadow.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShadow/
   */
  export interface ApiShadow {
    /**
     * Returns a type of the ApiShadow class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShadow/Methods/GetClassType/
     */
    GetClassType(): "shadow";

    /**
     * Returns the settings of the current shadow.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShadow/Methods/GetSettings/
     */
    GetSettings(): ShadowSettings;
  }

  /**
   * Class representing a shape.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/
   */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiShape class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetClassType/
     */
    GetClassType(): "shape";

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetDocContent/
     */
    GetDocContent(): ApiDocumentContent;

    /**
     * Returns the geometry object from the current shape.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetGeometry/
     */
    GetGeometry(): ApiGeometry;

    /**
     * Gets the outline properties from the current shape.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetLine/
     */
    GetLine(): ApiStroke | null;

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;

    /**
     * Gets the vertical alignment from the shape content where a paragraph or text runs can be inserted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/GetVerticalTextAlign/
     */
    GetVerticalTextAlign(): VerticalTextAlign;

    /**
     * Sets a custom geometry for the current shape.
     *
     * @param oGeometry - The geometry to set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/SetGeometry/
     */
    SetGeometry(oGeometry: ApiGeometry): boolean;

    /**
     * Sets the outline properties to the current shape.
     *
     * @param oStroke - The stroke used to create the shape outline.
     * @returns returns false if param is invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/SetLine/
     */
    SetLine(oStroke: ApiStroke): boolean;

    /**
     * Sets the text paddings to the current shape.
     *
     * @param nLeft - Left padding.
     * @param nTop - Top padding.
     * @param nRight - Right padding.
     * @param nBottom - Bottom padding.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/SetPaddings/
     */
    SetPaddings(nLeft: EMU, nTop: EMU, nRight: EMU, nBottom: EMU): boolean;

    /**
     * Sets the vertical alignment to the shape content where a paragraph or text runs can be inserted.
     *
     * @param verticalAlign - The vertical alignment type for the shape inner contents.
     * @returns returns false if shape or aligment doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiShape/Methods/SetVerticalTextAlign/
     */
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /**
   * Class representing a document picture form.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiSignatureForm/
   */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a slide. */
  export interface ApiSlide {
  }

  /** Class representing a slide show transition. */
  export interface ApiSlideShowTransition {
  }

  /**
   * Class representing a smart art.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiSmartArt/
   */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Returns a type of the ApiSmartArt class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiSmartArt/Methods/GetClassType/
     */
    GetClassType(): "smartArt";

    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;
  }

  /**
   * Class representing a stroke.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/
   */
  export interface ApiStroke {
    /**
     * Returns the beginning arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetBeginArrow/
     */
    GetBeginArrow(): object | null;

    /**
     * Returns a type of the ApiStroke class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetClassType/
     */
    GetClassType(): "stroke";

    /**
     * Gets the dash type of the stroke.
     *
     * @returns returns dash type ("solid", "dash", etc.) or null.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetDashType/
     */
    GetDashType(): DashType | null;

    /**
     * Returns the ending arrow properties of the stroke.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetEndArrow/
     */
    GetEndArrow(): object | null;

    /**
     * Gets the fill (color) of the stroke.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetFill/
     */
    GetFill(): ApiFill | null;

    /**
     * Gets the width of the stroke in English Metric Units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/GetWidth/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/SetBeginArrow/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiStroke/Methods/SetEndArrow/
     */
    SetEndArrow(type: LineEndType, width?: LineEndSize, length?: LineEndSize): boolean;
  }

  /** Class representing a style. */
  export interface ApiStyle {
  }

  /**
   * Class representing a table.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/
   */
  export interface ApiTable extends ApiDrawing, ApiTablePr {
    /**
     * Returns the parent sheet of the current drawing.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiDrawing/Methods/GetParentSheet/
     */
    GetParentSheet(): ApiWorksheet;
  }

  /** Class representing a table cell. */
  export interface ApiTableCell {
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
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextForm/
   */
  export interface ApiTextForm extends ApiFormBase {
  }

  /**
   * Class representing the text properties.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/
   */
  export interface ApiTextPr {
    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Returns whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Returns the font family from the current text properties.
     * The method automatically calculates the font from the theme if the font was set via the theme.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Returns whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): twips;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetOutLine/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: twips): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetTextFill/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetUnderline/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a text range within a presentation shape's text frame. */
  export interface ApiTextRange {
  }

  /**
   * Class representing a theme.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTheme/
   */
  export interface ApiTheme {
    /**
     * Returns a type of the ApiTheme class.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTheme/Methods/GetClassType/
     */
    GetClassType(): "theme";

    /**
     * Returns the name of the theme.
     *
     * @returns The theme name.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTheme/Methods/GetName/
     */
    GetName(): string;
  }

  /** Class representing a theme color scheme. */
  export interface ApiThemeColorScheme {
  }

  /** Class representing a theme font scheme. */
  export interface ApiThemeFontScheme {
  }

  /** Class representing a theme format scheme. */
  export interface ApiThemeFormatScheme {
  }

  /** Class representing animation timeline for a slide. */
  export interface ApiTimeLine {
  }

  /**
   * Class representing a top 10 conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/
   */
  export interface ApiTop10 extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns whether the top 10 ranking is percentage-based.
     *
     * @returns True if the ranking is percentage-based, false if count-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/GetPercent/
     */
    GetPercent(): boolean;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the rank value for the top 10 condition.
     *
     * @returns The rank value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/GetRank/
     */
    GetRank(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the "XlTopBottom" constant indicating whether the ranking is evaluated from the top or
     * bottom.
     *
     * @returns The ranking direction.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/GetTopBottom/
     */
    GetTopBottom(): XlTopBottom;

    /**
     * Returns the type of the top 10 conditional formatting rule.
     *
     * @returns The type of the top 10 conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets whether the top 10 ranking is percentage-based.
     *
     * @param percent - True if the ranking is percentage-based, false if count-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/SetPercent/
     */
    SetPercent(percent: boolean): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the rank value for the top 10 condition.
     *
     * @param rank - The rank value.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/SetRank/
     */
    SetRank(rank: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;

    /**
     * Sets the "XlTopBottom" constant indicating whether the ranking is evaluated from the top or bottom.
     *
     * @param topBottom - The ranking direction.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiTop10/Methods/SetTopBottom/
     */
    SetTopBottom(topBottom: XlTopBottom): void;
  }

  /**
   * Class representing a base class for color types.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniColor/
   */
  export interface ApiUniColor {
    /**
     * Returns a type of the ApiUniColor class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniColor/Methods/GetClassType/
     */
    GetClassType(): "uniColor";
  }

  /**
   * Class representing a unique values conditional formatting rule.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniqueValues/
   */
  export interface ApiUniqueValues extends ApiFormatCondition {
    /**
     * Deletes the current format condition.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the range of cells to which the current conditional formatting rule applies.
     *
     * @returns The range of cells affected by the current condition, or null if no range is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetAppliesTo/
     */
    GetAppliesTo(): ApiRange | null;

    /**
     * Returns the date operator for time period conditions.
     *
     * @returns The time period operator that defines how the date condition is evaluated, or null if the rule
     *   is not date-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetDateOperator/
     */
    GetDateOperator(): XlTimePeriods | null;

    /**
     * Returns the setting that specifies whether to format duplicate or unique values for the unique
     * values conditional formatting rule.
     *
     * @returns Specifies whether to format duplicate or unique values.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniqueValues/Methods/GetDupeUnique/
     */
    GetDupeUnique(): XlDuplicateValues;

    /**
     * Returns the background color for the format condition. Returns 'No Fill' when the background color
     * of the format condition is null.
     *
     * @returns The background color applied by the format condition, or 'No Fill' if none is set.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFillColor/
     */
    GetFillColor(): ApiColor | 'No Fill';

    /**
     * Returns the font applied by the current format condition.
     *
     * @returns An ApiFont object representing the font applied by the format condition, or null if no font is
     *   defined.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFont/
     */
    GetFont(): ApiFont | null;

    /**
     * Returns the first formula used by the current conditional formatting rule.
     *
     * @returns The first formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula used by the current conditional formatting rule.
     *
     * @returns The second formula.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @returns The number format.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetNumberFormat/
     */
    GetNumberFormat(): string;

    /**
     * Returns the format condition operator.
     *
     * @returns The format condition operator.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetOperator/
     */
    GetOperator(): XlFormatConditionOperator;

    /**
     * Returns the pivot table condition object.
     *
     * @returns The pivot table condition object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPTCondition/
     */
    GetPTCondition(): PTCondition | null;

    /**
     * Returns the parent range object of the current format condition.
     *
     * @returns The parent range object.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns the priority value of the conditional formatting rule.
     *
     * @returns The priority value of the conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetPriority/
     */
    GetPriority(): number;

    /**
     * Returns the scope type of the conditional formatting rule.
     *
     * @returns Returns "xlSelectionScope" for normal ranges, "xlDataFieldScope" for entire worksheet,
     *   "xlFieldsScope" for pivot tables.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetScopeType/
     */
    GetScopeType(): XlPivotConditionScope;

    /**
     * Returns whether the editor will stop evaluating additional formatting rules if this rule evaluates
     * to true.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetStopIfTrue/
     */
    GetStopIfTrue(): boolean;

    /**
     * Returns the text value used in text-based conditional formatting rules.
     *
     * @returns The text value used in text-based conditional formatting rules.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text operator for text-based conditional formatting rules.
     *
     * @returns The operator defining how the text comparison is performed, or null if the rule is not
     *   text-based.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/GetTextOperator/
     */
    GetTextOperator(): XlContainsOperator | null;

    /**
     * Returns the type of the unique values conditional formatting rule.
     *
     * @returns The type of the unique values conditional formatting rule.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniqueValues/Methods/GetType/
     */
    GetType(): XlFormatConditionType;

    /**
     * Modifies the current format condition with the specified parameters.
     *
     * @param Type - The format condition type.
     * @param Operator - The format condition operator.
     * @param Formula1 - The first formula.
     * @param Formula2 - The second formula.
     * @returns The modified format condition, or null if the rule does not exist.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/Modify/
     */
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;

    /**
     * Sets the cell range to which the current conditional formatting rule applies.
     *
     * @param Range - The range to which the current conditional formatting rule will be applied.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/ModifyAppliesToRange/
     */
    ModifyAppliesToRange(Range: ApiRange): void;

    /**
     * Sets the border style for the conditional formatting rule.
     *
     * @param bordersIndex - Specifies the cell border position.
     * @param lineStyle - Specifies the line style used to form the cell border.
     * @param oColor - The color object which specifies the color to be set to the cell border.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetBorders/
     */
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;

    /**
     * Sets the date operator for time period conditions.
     *
     * @param DateOperator - The date operator for time period conditions.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetDateOperator/
     */
    SetDateOperator(DateOperator: XlTimePeriods): void;

    /**
     * Sets the setting that specifies whether to format duplicate or unique values for the unique values
     * conditional formatting rule.
     *
     * @param dupeUnique - Specifies whether to format duplicate or unique values.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUniqueValues/Methods/SetDupeUnique/
     */
    SetDupeUnique(dupeUnique: XlDuplicateValues): void;

    /**
     * Sets the background color to the format condition with the previously created color object.
     * Sets 'No Fill' when previously created color object is null.
     *
     * @param oColor - The color object that specifies the background color for the format condition.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFillColor/
     */
    SetFillColor(oColor: ApiColor): void;

    /**
     * Sets the priority value for the current conditional formatting rule to "1" so that it will be
     * evaluated before all other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetFirstPriority/
     */
    SetFirstPriority(): void;

    /**
     * Sets the evaluation order for the current conditional formatting rule so it is evaluated after all
     * other rules on the worksheet.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetLastPriority/
     */
    SetLastPriority(): void;

    /**
     * Sets the number format applied to a cell when the conditional formatting rule evaluates to true.
     *
     * @param NumberFormat - The number format code (e.g., "General", "#,##0.00", etc.)
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetNumberFormat/
     */
    SetNumberFormat(NumberFormat: string): void;

    /**
     * Sets the priority value of the conditional formatting rule.
     *
     * @param Priority - The priority value (1-based).
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetPriority/
     */
    SetPriority(Priority: number): void;

    /**
     * Sets the scope type for the conditional formatting rule.
     *
     * @param ScopeType - The scope type: "xlSelectionScope", "xlDataFieldScope", or "xlFieldsScope".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetScopeType/
     */
    SetScopeType(ScopeType: XlPivotConditionScope): void;

    /**
     * Sets whether the editor will stop evaluating additional formatting rules if this rule evaluates to
     * true.
     *
     * @param StopIfTrue - True to stop evaluating additional rules.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetStopIfTrue/
     */
    SetStopIfTrue(StopIfTrue: boolean): void;

    /**
     * Sets the text value used in text-based conditional formatting rules.
     *
     * @param Text - The text value to compare against.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetText/
     */
    SetText(Text: string): void;

    /**
     * Sets the text operator for text-based conditional formatting rules.
     *
     * @param TextOperator - The text operator: "xlContains", "xlDoesNotContain", "xlBeginsWith", "xlEndsWith".
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiFormatCondition/Methods/SetTextOperator/
     */
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /**
   * Class representing an unsupported element.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUnsupported/
   */
  export interface ApiUnsupported {
    /**
     * Returns a type of the ApiUnsupported class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiUnsupported/Methods/GetClassType/
     */
    GetClassType(): "unsupported";
  }

  /**
   * Class representing data validation.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/
   */
  export interface ApiValidation {
    /**
     * Adds data validation to the specified range.
     *
     * @param Type - The validation type.
     * @param AlertStyle - The validation alert style.
     * @param Operator - The data validation operator.
     * @param Formula1 - The first formula in the data validation.
     * @param Formula2 - The second formula in the data validation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/Add/
     */
    Add(Type: ValidationType, AlertStyle?: ValidationAlertStyle, Operator?: ValidationOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiValidation | null;

    /**
     * Deletes the object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/Delete/
     */
    Delete(): void;

    /**
     * Returns the validation alert style.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetAlertStyle/
     */
    GetAlertStyle(): ValidationAlertStyle;

    /**
     * Returns the data validation error message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetErrorMessage/
     */
    GetErrorMessage(): string;

    /**
     * Returns the title of the data-validation error dialog box.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetErrorTitle/
     */
    GetErrorTitle(): string;

    /**
     * Returns the first formula in the data validation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetFormula1/
     */
    GetFormula1(): string;

    /**
     * Returns the second formula in the data validation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetFormula2/
     */
    GetFormula2(): string;

    /**
     * Returns whether blank values are permitted by the range data validation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetIgnoreBlank/
     */
    GetIgnoreBlank(): boolean;

    /**
     * Returns whether data validation displays a drop-down list that contains acceptable values.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetInCellDropdown/
     */
    GetInCellDropdown(): boolean;

    /**
     * Returns the data validation input message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetInputMessage/
     */
    GetInputMessage(): string;

    /**
     * Returns the title of the data-validation input dialog box.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetInputTitle/
     */
    GetInputTitle(): string;

    /**
     * Returns the data validation operator.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetOperator/
     */
    GetOperator(): ValidationOperator;

    /**
     * Returns the parent range object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetParent/
     */
    GetParent(): ApiRange;

    /**
     * Returns whether the data validation error message will be displayed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetShowError/
     */
    GetShowError(): boolean;

    /**
     * Returns whether the data validation input message will be displayed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetShowInput/
     */
    GetShowInput(): boolean;

    /**
     * Returns the validation type.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/GetType/
     */
    GetType(): ValidationType;

    /**
     * Modifies data validation for a range.
     *
     * @param Type - The validation type.
     * @param AlertStyle - The validation alert style.
     * @param Operator - The data validation operator.
     * @param Formula1 - The first formula in the data validation.
     * @param Formula2 - The second formula in the data validation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/Modify/
     */
    Modify(Type?: ValidationType, AlertStyle?: ValidationAlertStyle, Operator?: ValidationOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiValidation | null;

    /**
     * Sets the data validation error message.
     *
     * @param ErrorMessage - The error message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetErrorMessage/
     */
    SetErrorMessage(ErrorMessage: string): void;

    /**
     * Sets the title of the data-validation error dialog box.
     *
     * @param ErrorTitle - The error dialog title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetErrorTitle/
     */
    SetErrorTitle(ErrorTitle: string): void;

    /**
     * Sets whether blank values are permitted by the range data validation.
     *
     * @param IgnoreBlank - Specifies whether blank values are permitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetIgnoreBlank/
     */
    SetIgnoreBlank(IgnoreBlank: boolean): void;

    /**
     * Sets whether data validation displays a drop-down list that contains acceptable values.
     *
     * @param InCellDropdown - Specifies whether to display a drop-down list.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetInCellDropdown/
     */
    SetInCellDropdown(InCellDropdown: boolean): void;

    /**
     * Sets the data validation input message.
     *
     * @param InputMessage - The input message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetInputMessage/
     */
    SetInputMessage(InputMessage: string): void;

    /**
     * Sets the title of the data-validation input dialog box.
     *
     * @param InputTitle - The input dialog title.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetInputTitle/
     */
    SetInputTitle(InputTitle: string): void;

    /**
     * Sets whether the data validation error message will be displayed.
     *
     * @param ShowError - Specifies whether to show error message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetShowError/
     */
    SetShowError(ShowError: boolean): void;

    /**
     * Sets whether the data validation input message will be displayed.
     *
     * @param ShowInput - Specifies whether to show input message.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiValidation/Methods/SetShowInput/
     */
    SetShowInput(ShowInput: boolean): void;
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  /**
   * Class representing the currently active workbook
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/
   */
  export interface ApiWorkbook {
    /**
     * Recalculates the cells that need recalculation (changed, added or volatile) across the workbook.
     * Forces the recalc that is otherwise deferred until a macro finishes, so up-to-date formula results
     * can be read within the same macro.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/Calculate/
     */
    Calculate(): boolean;

    /**
     * Returns the active chart of the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetActiveChart/
     */
    GetActiveChart(): ApiChart | null;

    /**
     * Returns the active sheet of the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetActiveSheet/
     */
    GetActiveSheet(): ApiWorksheet;

    /**
     * Returns all pivot tables in the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetAllPivotTables/
     */
    GetAllPivotTables(): ApiPivotTable[];

    /**
     * Returns the custom properties of the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetCustomProperties/
     */
    GetCustomProperties(): ApiCustomProperties;

    /**
     * Returns drawings with the specified names from the workbook.
     *
     * @param ids - An array of drawing names.
     * @returns Returns an array of drawing obkects filtered by the specified names.
     * @since 9.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetDrawingsByName/
     */
    GetDrawingsByName(ids: string[]): Drawing[];

    /**
     * Returns the name of the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns a sheet collection that represents all the sheets in the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetSheets/
     */
    GetSheets(): ApiWorksheet[];

    /**
     * Returns the theme of the workbook.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/GetTheme/
     */
    GetTheme(): ApiTheme;

    /**
     * Redraws the editor screen, making the changes already made by a macro visible without waiting for it
     * to finish. Observable from asynchronous code only. Repaints without recalculating: call
     * {@link ApiWorkbook#Calculate} first if formula results must be up to date.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/Redraw/
     */
    Redraw(): boolean;

    /**
     * Saves changes to the specified document.
     *
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorkbook/Methods/Save/
     */
    Save(): void;
  }

  /**
   * Class representing a sheet.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/
   */
  export interface ApiWorksheet {
    /**
     * Creates a chart of the specified type from the selected data range of the current sheet.
     * <note>Please note that the horizontal and vertical offsets are calculated within the limits of the
     * specified column and
     * row cells only. If this value exceeds the cell width or height, another vertical/horizontal position
     * will be set.</note>
     * :::note
     * Values of _nStyleIndex_ outside **1 - 48** are interpreted as a chart style id from the
     * _cs:chartStyle_ element (e.g. 201, 215, 284) and are available only for [ONLYOFFICE Docs
     * Enterprise](https://www.onlyoffice.com/docs-enterprise-prices.aspx?from=api) and [ONLYOFFICE Docs
     * Developer](https://www.onlyoffice.com/developer-edition-prices.aspx?from=api).
     * :::
     *
     * @param sDataRange - The selected cell range which will be used to get the data for the chart, formed specifically
     *   and including the sheet name.
     * @param bInRows - Specifies whether to take the data from the rows or from the columns. If true, the data from the
     *   rows will be used.
     * @param sType - The chart type used for the chart display.
     * @param nStyleIndex - The chart color style index (can be **1 - 48**, as described in OOXML specification).
     * @param nExtX - The chart width in English measure units
     * @param nExtY - The chart height in English measure units.
     * @param nFromCol - The number of the column where the beginning of the chart will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the chart measured in English measure
     *   units.
     * @param nFromRow - The number of the row where the beginning of the chart will be placed.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the chart measured in English measure
     *   units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddChart/
     */
    AddChart(sDataRange: string, bInRows: boolean, sType: ChartType, nStyleIndex: number, nExtX: EMU, nExtY: EMU, nFromCol: number, nColOffset: EMU, nFromRow: number, nRowOffset: EMU): ApiChart | null;

    /**
     * Adds a new name to the current worksheet.
     *
     * @param sName - The range name.
     * @param sRef - Must contain the sheet name, followed by sign ! and a range of cells. Example:
     *   "Sheet1!$A$1:$B$2".
     * @param isHidden - Defines if the range name is hidden or not.
     * @returns returns false if sName or sRef are invalid.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddDefName/
     */
    AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;

    /**
     * Adds an image to the current sheet with the parameters specified.
     *
     * @param sImageSrc - The image source where the image to be inserted should be taken from (currently only internet
     *   URL or Base64 encoded images are supported).
     * @param nWidth - The image width in English measure units.
     * @param nHeight - The image height in English measure units.
     * @param nFromCol - The number of the column where the beginning of the image will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the image measured in English measure
     *   units.
     * @param nFromRow - The number of the row where the beginning of the image will be placed.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the image measured in English measure
     *   units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddImage/
     */
    AddImage(sImageSrc: string, nWidth: EMU, nHeight: EMU, nFromCol: number, nColOffset: EMU, nFromRow: number, nRowOffset: EMU): ApiImage | null;

    /**
     * Adds an OLE object to the current sheet with the parameters specified.
     *
     * @param sImageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param nWidth - The OLE object width in English measure units.
     * @param nHeight - The OLE object height in English measure units.
     * @param sData - The OLE object string data.
     * @param sAppId - The application ID associated with the current OLE object.
     * @param nFromCol - The number of the column where the beginning of the OLE object will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the OLE object measured in English
     *   measure units.
     * @param nFromRow - The number of the row where the beginning of the OLE object will be placed.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the OLE object measured in English measure
     *   units.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddOleObject/
     */
    AddOleObject(sImageSrc: string, nWidth: EMU, nHeight: EMU, sData: string, sAppId: string, nFromCol: number, nColOffset: EMU, nFromRow: number, nRowOffset: EMU): ApiOleObject | null;

    /**
     * Creates a protected range of the specified type from the selected data range of the current sheet.
     *
     * @param sTitle - The title which will be displayed for the current protected range.
     * @param sDataRange - The selected cell range which will be used to get the data for the protected range.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddProtectedRange/
     */
    AddProtectedRange(sTitle: string, sDataRange: string): ApiProtectedRange | null;

    /**
     * Adds a shape to the current sheet with the parameters specified.
     * <note>Please note that the horizontal and vertical offsets are
     * calculated within the limits of the specified column and row cells
     * only. If this value exceeds the cell width or height, another vertical/horizontal position will be
     * set.</note>
     *
     * @param sType - The shape type which specifies the preset shape geometry.
     * @param nWidth - The shape width in English measure units.
     * @param nHeight - The shape height in English measure units.
     * @param oFill - The color or pattern used to fill the shape. If not specified, the default shape style fill
     *   (theme accent) is used.
     * @param oStroke - The stroke used to draw the shape outline. If not specified, the default shape style outline
     *   (theme accent) is used.
     * @param nFromCol - The number of the column where the beginning of the shape will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the shape measured in English measure
     *   units.
     * @param nFromRow - The number of the row where the beginning of the shape will be placed.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the shape measured in English measure
     *   units.
     * @default sType = "rect"
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddShape/
     */
    AddShape(sType?: ShapeType, nWidth?: EMU, nHeight?: EMU, oFill?: ApiFill, oStroke?: ApiStroke, nFromCol?: number, nColOffset?: EMU, nFromRow?: number, nRowOffset?: EMU): ApiShape | null;

    /**
     * Adds a Text Art object to the current sheet with the parameters specified.
     *
     * @param oTextPr - The text properties.
     * @param sText - The text for the Text Art object.
     * @param sTransform - Text transform type.
     * @param oFill - The color or pattern used to fill the Text Art object.
     * @param oStroke - The stroke used to create the Text Art object shadow.
     * @param nRotAngle - Rotation angle.
     * @param nWidth - The Text Art width measured in English measure units.
     * @param nHeight - The Text Art heigth measured in English measure units.
     * @param nFromCol - The column number where the beginning of the Text Art object will be placed.
     * @param nFromRow - The row number where the beginning of the Text Art object will be placed.
     * @param nColOffset - The offset from the nFromCol column to the left part of the Text Art object measured in English
     *   measure units.
     * @param nRowOffset - The offset from the nFromRow row to the upper part of the Text Art object measured in English
     *   measure units.
     * @default oTextPr = Api.CreateTextPr()
     * @default sText = "Your text here"
     * @default sTransform = "textNoShape"
     * @default oFill = Api.CreateNoFill()
     * @default oStroke = Api.CreateStroke(0, Api.CreateNoFill())
     * @default nRotAngle = 0
     * @default nWidth = 1828800
     * @default nHeight = 1828800
     * @default nFromCol = 0
     * @default nFromRow = 0
     * @default nColOffset = 0
     * @default nRowOffset = 0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/AddWordArt/
     */
    AddWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: EMU, nHeight?: EMU, nFromCol?: number, nFromRow?: number, nColOffset?: EMU, nRowOffset?: EMU): ApiDrawing | null;

    /**
     * Deletes the current worksheet.
     *
     * @returns returns true if the sheet was deleted successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Formats the selected range of cells from the current sheet as a table (with the first row formatted
     * as a header).
     * <note>As the first row is always formatted as a table header, you need to select at least two rows
     * for the table to be formed correctly.</note>
     *
     * @param sRange - The range of cells from the current sheet which will be formatted as a table.
     * @returns returns true if the range was formatted as a table successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/FormatAsTable/
     */
    FormatAsTable(sRange: string): boolean;

    /**
     * Returns an object that represents an active cell.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetActiveCell/
     */
    GetActiveCell(): ApiRange;

    /**
     * Returns all charts from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns all drawings from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllDrawings/
     */
    GetAllDrawings(): Drawing[];

    /**
     * Returns all images from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns all OLE objects from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns all pivot tables from the current worksheet.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllPivotTables/
     */
    GetAllPivotTables(): ApiPivotTable[];

    /**
     * Returns all protected ranges from the current worksheet.
     *
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllProtectedRanges/
     */
    GetAllProtectedRanges(): ApiProtectedRange[] | null;

    /**
     * Returns all shapes from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns the instante of ApiAutoFilter object that represents the worksheet AutoFilter.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetAutoFilter/
     */
    GetAutoFilter(): ApiAutoFilter;

    /**
     * Returns the bottom margin of the sheet.
     *
     * @returns The bottom margin size measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetBottomMargin/
     */
    GetBottomMargin(): number;

    /**
     * Returns the ApiRange that represents all the cells on the worksheet (not just the cells that are
     * currently in use).
     *
     * @param row - The row number or the cell number (if only row is defined).
     * @param col - The column number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetCells/
     */
    GetCells(row: number, col: number): ApiRange | null;

    /**
     * Returns the ApiRange object that represents all the cells on the columns range.
     *
     * @param sRange - Specifies the columns range in the string format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetCols/
     */
    GetCols(sRange: string): ApiRange;

    /**
     * Returns all comments from the current worksheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetComments/
     */
    GetComments(): ApiComment[];

    /**
     * Retrieves the custom XML manager associated with the current sheet.
     * This manager allows manipulation and access to custom XML parts within the current sheet.
     *
     * @returns Returns an instance of ApiCustomXmlParts if the custom XML manager exists, otherwise returns
     *   null.
     * @since 9.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetCustomXmlParts/
     */
    GetCustomXmlParts(): ApiCustomXmlParts | null;

    /**
     * Returns the ApiName object by the worksheet name.
     *
     * @param defName - The worksheet name.
     * @returns returns null if definition name doesn't exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetDefName/
     */
    GetDefName(defName: string): ApiName | null;

    /**
     * Returns an array of ApiName objects.
     *
     * @returns Returns an empty array if no defined names are found.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetDefNames/
     */
    GetDefNames(): ApiName[];

    /**
     * Returns the freeze panes from the current worksheet.
     *
     * @since 8.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetFreezePanes/
     */
    GetFreezePanes(): ApiFreezePanes;

    /**
     * Returns a collection of all the hyperlinks on the worksheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetHyperlinks/
     */
    GetHyperlinks(): ApiHyperlinks;

    /**
     * Returns a sheet index.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetIndex/
     */
    GetIndex(): number;

    /**
     * Returns the left margin of the sheet.
     *
     * @returns The left margin size measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetLeftMargin/
     */
    GetLeftMargin(): number;

    /**
     * Returns a sheet name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetName/
     */
    GetName(): string;

    /**
     * Returns the page orientation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetPageOrientation/
     */
    GetPageOrientation(): PageOrientation;

    /**
     * Returns the page setup object that represents the print layout settings of the current worksheet.
     *
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetPageSetup/
     */
    GetPageSetup(): ApiPageSetup;

    /**
     * Returns a pivot table by its name from the current worksheet, or null if it does not exist.
     *
     * @param name - The pivot table name.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetPivotByName/
     */
    GetPivotByName(name: string): ApiPivotTable | null;

    /**
     * Returns the page PrintGridlines property which specifies whether the current sheet gridlines must be
     * printed or not.
     *
     * @returns True if cell gridlines are printed on this page.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetPrintGridlines/
     */
    GetPrintGridlines(): boolean;

    /**
     * Returns the page PrintHeadings property which specifies whether the current sheet row/column
     * headings must be printed or not.
     *
     * @returns Specifies whether the current sheet row/column headings must be printed or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetPrintHeadings/
     */
    GetPrintHeadings(): boolean;

    /**
     * Returns a protected range object by its title.
     *
     * @param sTitle - The title of the protected range that will be returned.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetProtectedRange/
     */
    GetProtectedRange(sTitle: string): ApiProtectedRange | null;

    /**
     * Returns an object that represents the selected range of the current sheet. Can be a single cell -
     * **A1**, or cells
     * from a single row - **A1:E1**, or cells from a single column - **A1:A10**, or cells from several
     * rows and columns - **A1:E10**.
     *
     * @param Range1 - The range of cells from the current sheet.
     * @param Range2 - The range of cells from the current sheet.
     * @returns returns null if such a range does not exist.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetRange/
     */
    GetRange(Range1: string | ApiRange, Range2: string | ApiRange): ApiRange | null;

    /**
     * Returns an object that represents the selected range of the current sheet using the **row/column**
     * coordinates for the cell selection.
     *
     * @param nRow - The row number.
     * @param nCol - The column number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetRangeByNumber/
     */
    GetRangeByNumber(nRow: number, nCol: number): ApiRange;

    /**
     * Returns the right margin of the sheet.
     *
     * @returns The right margin size measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetRightMargin/
     */
    GetRightMargin(): number;

    /**
     * Returns the ApiRange object that represents all the cells on the rows range.
     *
     * @param value - Specifies the rows range in the string or number format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetRows/
     */
    GetRows(value: string | number): ApiRange | null;

    /**
     * Returns selected drawings from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetSelectedDrawings/
     */
    GetSelectedDrawings(): Drawing[];

    /**
     * Returns selected shapes from the current sheet.
     *
     * @returns .
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetSelectedShapes/
     */
    GetSelectedShapes(): ApiShape[];

    /**
     * Returns an object that represents the selected range.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetSelection/
     */
    GetSelection(): ApiRange;

    /**
     * Returns the top margin of the sheet.
     *
     * @returns The top margin size measured in points.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetTopMargin/
     */
    GetTopMargin(): number;

    /**
     * Returns the ApiRange object that represents the used range on the specified worksheet.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetUsedRange/
     */
    GetUsedRange(): ApiRange;

    /**
     * Returns the state of sheet visibility.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GetVisible/
     */
    GetVisible(): boolean;

    /**
     * Groups an array of drawings in the current sheet.
     * <note>This method is not supported in the document builder and works only in the editor.</note>
     *
     * @param aDrawings - An array of drawings to group.
     * @returns Returns null if the drawings cannot be grouped or when called in the document builder.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/GroupDrawings/
     */
    GroupDrawings(aDrawings: ApiDrawing[]): ApiGroup | null;

    /**
     * Moves the current sheet to another location in the workbook.
     *
     * @param before - The sheet before which the current sheet will be placed. You cannot specify "before" if you
     *   specify "after".
     * @param after - The sheet after which the current sheet will be placed. You cannot specify "after" if you
     *   specify "before".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/Move/
     */
    Move(before: ApiWorksheet, after: ApiWorksheet): void;

    /**
     * Pastes the contents of the clipboard to the current sheet.
     *
     * @param destination - The cell range where the clipboard contents should be pasted. If this argument is omitted, the
     *   current selection is used.
     * @since 8.1.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/Paste/
     */
    Paste(destination?: ApiRange): void;

    /**
     * Refreshes all pivot tables on the current worksheet.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/RefreshAllPivots/
     */
    RefreshAllPivots(): void;

    /**
     * Replaces the current image with a new one.
     *
     * @param sImageUrl - The image source where the image to be inserted should be taken from (currently only internet
     *   URL or Base64 encoded images are supported).
     * @param nWidth - The image width in English measure units.
     * @param nHeight - The image height in English measure units.
     * @returns returns true if the image was replaced successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/ReplaceCurrentImage/
     */
    ReplaceCurrentImage(sImageUrl: string, nWidth: EMU, nHeight: EMU): boolean;

    /**
     * Makes the current sheet active.
     *
     * @returns returns true if the sheet was made active successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetActive/
     */
    SetActive(): boolean;

    /**
     * Sets the bottom margin of the sheet.
     *
     * @param nPoints - The bottom margin size measured in points.
     * @returns returns true if the bottom margin was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetBottomMargin/
     */
    SetBottomMargin(nPoints: number): boolean;

    /**
     * Sets the width of the specified column.
     * One unit of column width is equal to the width of one character in the Normal style.
     * For proportional fonts, the width of the character 0 (zero) is used.
     *
     * @param nColumn - The number of the column to set the width to.
     * @param nWidth - The width of the column divided by 7 pixels.
     * @param bWithotPaddings - Specifies whether nWidth will be set without standard paddings.
     * @default bWithotPaddings = false
     * @returns returns true if the column width was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetColumnWidth/
     */
    SetColumnWidth(nColumn: number, nWidth: number, bWithotPaddings?: boolean): boolean;

    /**
     * Specifies whether the current sheet gridlines must be displayed or not.
     *
     * @param isDisplayed - Specifies whether the current sheet gridlines must be displayed or not. The default value is
     *   **true**.
     * @returns returns true if the display of gridlines was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetDisplayGridlines/
     */
    SetDisplayGridlines(isDisplayed: boolean): boolean;

    /**
     * Specifies whether the current sheet row/column headers must be displayed or not.
     *
     * @param isDisplayed - Specifies whether the current sheet row/column headers must be displayed or not. The default
     *   value is **true**.
     * @returns returns true if the display of headings was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetDisplayHeadings/
     */
    SetDisplayHeadings(isDisplayed: boolean): boolean;

    /**
     * Adds a hyperlink to the specified range.
     *
     * @param sRange - The range where the hyperlink will be added to.
     * @param sAddress - The link address.
     * @param subAddress - The link subaddress to insert internal sheet hyperlinks.
     * @param sScreenTip - The screen tip text.
     * @param sTextToDisplay - The link text that will be displayed on the sheet.
     * @returns returns true if the hyperlink was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetHyperlink/
     */
    SetHyperlink(sRange: string, sAddress: string, subAddress?: string, sScreenTip?: string, sTextToDisplay?: string): boolean;

    /**
     * Sets the left margin of the sheet.
     *
     * @param nPoints - The left margin size measured in points.
     * @returns returns true if the left margin was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetLeftMargin/
     */
    SetLeftMargin(nPoints: number): boolean;

    /**
     * Sets a name to the current active sheet.
     *
     * @param sName - The name which will be displayed for the current sheet at the sheet tab.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetName/
     */
    SetName(sName: string): void;

    /**
     * Sets the page orientation.
     *
     * @param sPageOrientation - The page orientation type.
     * @returns returns true if the page orientation was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetPageOrientation/
     */
    SetPageOrientation(sPageOrientation: PageOrientation): boolean;

    /**
     * Specifies whether the current sheet gridlines must be printed or not.
     *
     * @param bPrint - Defines if cell gridlines are printed on this page or not.
     * @returns returns true if the print gridlines option was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetPrintGridlines/
     */
    SetPrintGridlines(bPrint: boolean): boolean;

    /**
     * Specifies whether the current sheet row/column headers must be printed or not.
     *
     * @param bPrint - Specifies whether the current sheet row/column headers must be printed or not.
     * @returns returns true if the print headings option was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetPrintHeadings/
     */
    SetPrintHeadings(bPrint: boolean): boolean;

    /**
     * Sets the right margin of the sheet.
     *
     * @param nPoints - The right margin size measured in points.
     * @returns returns true if the right margin was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetRightMargin/
     */
    SetRightMargin(nPoints: number): boolean;

    /**
     * Sets the height of the specified row measured in points.
     * A point is 1/72 inch.
     *
     * @param nRow - The number of the row to set the height to.
     * @param nHeight - The height of the row measured in points.
     * @returns returns true if the row height was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetRowHeight/
     */
    SetRowHeight(nRow: number, nHeight: number): boolean;

    /**
     * Sets the top margin of the sheet.
     *
     * @param nPoints - The top margin size measured in points.
     * @returns returns true if the top margin was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetTopMargin/
     */
    SetTopMargin(nPoints: number): boolean;

    /**
     * Sets the state of sheet visibility.
     *
     * @param isVisible - Specifies if the sheet is visible or not.
     * @returns returns true if the visibility state was set successfully.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheet/Methods/SetVisible/
     */
    SetVisible(isVisible: boolean): boolean;
  }

  /**
   * Class representing a worksheet function.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/
   */
  export interface ApiWorksheetFunction {
    /**
     * Returns the absolute value of a number, a number without its sign.
     *
     * @param arg1 - The real number for which the absolute value will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ABS/
     */
    ABS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the accrued interest for a security that pays periodic interest.
     *
     * @param arg1 - The issue date of the security, expressed as a serial date number.
     * @param arg2 - The date when the first interest is paid, expressed as a serial date number.
     * @param arg3 - The security settlement date, expressed as a serial date number.
     * @param arg4 - The annual coupon rate of the security.
     * @param arg5 - The par value of the security.
     * @param arg6 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg7 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     * @param arg8 - A logical value: **true** (1) or omitted returns the accrued interest from the issue date to the
     *   settlement date. **false** (0) returns the accrued interest from the first interest date to the
     *   settlement date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACCRINT/
     */
    ACCRINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number): number;

    /**
     * Returns the accrued interest for a security that pays interest at maturity.
     *
     * @param arg1 - The issue date of the security, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The annual coupon rate of the security.
     * @param arg4 - The par value of the security.
     * @param arg5 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACCRINTM/
     */
    ACCRINTM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the arccosine of a number, in radians in the range from 0 to Pi. The arccosine is the angle
     * whose cosine is a number specified in the parameters.
     *
     * @param arg1 - The angle cosine. It must be from -1 to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACOS/
     */
    ACOS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse hyperbolic cosine of a number.
     *
     * @param arg1 - Any real number equal to or greater than 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACOSH/
     */
    ACOSH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the arccotangent of a number, in radians in the range from 0 to Pi.
     *
     * @param arg1 - The angle cotangent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACOT/
     */
    ACOT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse hyperbolic cotangent of a number.
     *
     * @param arg1 - The angle hyperbolic cotangent. It must be less than -1 or greater than 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ACOTH/
     */
    ACOTH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns an aggregate in a list or database.
     *
     * @param arg1 - A numeric value that specifies which function to use: **1** - AVERAGE, **2** - COUNT, **3** -
     *   COUNTA, **4** - MAX, **5** - MIN, **6** - PRODUCT, **7** - STDEV.S, **8** - STDEV.P, **9** -
     *   SUM, **10** - VAR.S, **11** - VAR.P, **12** - MEDIAN, **13** - MODE.SNGL, **14** - LARGE, **15**
     *   - SMALL, **16** - PERCENTILE.INC, **17** - QUARTILE.INC, **18** - PERCENTILE.EXC, **19** -
     *   QUARTILE.EXC.
     * @param arg2 - A numeric value that specifies which values should be ignored: **0** or omitted - nested
     *   SUBTOTAL and AGGREGATE functions, **1** - hidden rows, nested SUBTOTAL and AGGREGATE functions,
     *   **2** - error values, nested SUBTOTAL and AGGREGATE functions, **3** - hidden rows, error
     *   values, nested SUBTOTAL and AGGREGATE functions, **4** - nothing, **5** - hidden rows, **6** -
     *   error values, **7** - hidden rows and error values.
     * @param arg3 - The first numeric value for which the aggregate value will be returned.
     * @param args - Up to 253 numeric values or a range of cells containing the values for which the aggregate value
     *   will be returned. Arguments can be numbers, ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AGGREGATE/
     */
    AGGREGATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: number | ApiRange | number[], args: number | ApiRange | number[]): number;

    /**
     * Returns the prorated linear depreciation of an asset for each accounting period.
     *
     * @param arg1 - The cost of the asset.
     * @param arg2 - The date when asset is purchased.
     * @param arg3 - The date when the first period ends.
     * @param arg4 - The salvage value of the asset at the end of its lifetime.
     * @param arg5 - The period for which the depreciation will be calculated.
     * @param arg6 - The rate of depreciation.
     * @param arg7 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AMORDEGRC/
     */
    AMORDEGRC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;

    /**
     * Returns the prorated linear depreciation of an asset for each accounting period.
     *
     * @param arg1 - The cost of the asset.
     * @param arg2 - The date when asset is purchased.
     * @param arg3 - The date when the first period ends.
     * @param arg4 - The salvage value of the asset at the end of its lifetime.
     * @param arg5 - The period for which the depreciation will be calculated.
     * @param arg6 - The rate of depreciation.
     * @param arg7 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AMORLINC/
     */
    AMORLINC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;

    /**
     * Checks whether all conditions in a test are **true**.
     *
     * @param args - A condition to check.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AND/
     */
    AND(args: number | string | ApiRange | boolean | ApiName): boolean;

    /**
     * Converts a Roman numeral to Arabic.
     *
     * @param arg1 - The Roman numeral to convert.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ARABIC/
     */
    ARABIC(arg1: ApiRange | ApiName | string): number;

    /**
     * For double-byte character set (DBCS) languages, the function changes full-width (double-byte)
     * characters to half-width (single-byte) characters.
     *
     * @param arg1 - The text or a reference to a cell containing the text to change.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ASC/
     */
    ASC(arg1: ApiRange | ApiName | string): string;

    /**
     * Returns the arcsine of a number in radians, in the range from *-Pi/2* to *Pi/2*.
     *
     * @param arg1 - The angle sine. It must be from -1 to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ASIN/
     */
    ASIN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse hyperbolic sine of a number.
     *
     * @param arg1 - Any real number equal to or greater than 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ASINH/
     */
    ASINH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the arctangent of a number in radians, in the range from *-Pi/2* to *Pi/2*.
     *
     * @param arg1 - The angle tangent.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ATAN/
     */
    ATAN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the arctangent of the specified x and y coordinates, in radians between -Pi and Pi,
     * excluding -Pi.
     *
     * @param arg1 - The x coordinate of the point.
     * @param arg2 - The y coordinate of the point.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ATAN2/
     */
    ATAN2(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse hyperbolic tangent of a number.
     *
     * @param arg1 - Any real number between -1 and 1 excluding -1 and 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ATANH/
     */
    ATANH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the average of the absolute deviations of data points from their mean.
     *
     * @param args - Up to 255 numeric values for which the average of the absolute deviations will be returned. The
     *   first argument is required, subsequent arguments are optional. Arguments can be numbers, names,
     *   or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AVEDEV/
     */
    AVEDEV(args: ApiRange | ApiName | number | number[]): number;

    /**
     * Returns the average (arithmetic mean) of the specified arguments.
     *
     * @param args - Up to 255 numeric values for which the average value will be returned. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, or arrays of
     *   numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AVERAGE/
     */
    AVERAGE(args: ApiRange | ApiName | number | number[]): number;

    /**
     * Returns the average (arithmetic mean) of the specified arguments, evaluating text and **false** in
     * arguments as 0; **true** evaluates as 1.
     *
     * @param args - Up to 255 numeric values for which the average value will be returned. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, text, or logical values,
     *   such as **true** and **false**, names, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AVERAGEA/
     */
    AVERAGEA(args: ApiRange | ApiName | number | string | number[]): number;

    /**
     * Finds the average (arithmetic mean) for the cells specified by a given condition or criteria.
     *
     * @param arg1 - The range of cells which will be evaluated.
     * @param arg2 - The condition or criteria in the form of a number, expression, or text that defines which cells
     *   will be used to find the average.
     * @param arg3 - The actual cells to be used to find the average. If omitted, the cells in the range are used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AVERAGEIF/
     */
    AVERAGEIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;

    /**
     * Finds the average (arithmetic mean) for the cells specified by a given set of conditions or
     * criteria.
     *
     * @param arg1 - The range of cells which will be evaluated.
     * @param arg2 - The first condition or criteria in the form of a number, expression, or text that defines which
     *   cells will be used to find the average.
     * @param arg3 - The actual cells to be used to find the average. If omitted, the cells in the range are used.
     * @param arg4 - Up to 127 additional conditions or criteria in the form of a number, expression, or text that
     *   defines which cells will be used to find the average. These arguments are optional.
     * @param arg5 - Up to 127 actual ranges to be used to find the average. If omitted, the cells in the range are
     *   used. These arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/AVERAGEIFS/
     */
    AVERAGEIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;

    /**
     * Converts a number into a text representation with the given radix (base).
     *
     * @param arg1 - The number to convert.
     * @param arg2 - The base radix into which the number will be converted. An integer greater than or equal to 2
     *   and less than or equal to 36.
     * @param arg3 - The minimum length of the returned string. An integer greater than or equal to 0 and less than
     *   256. If omitted, leading zeros are not added to the result.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BASE/
     */
    BASE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the modified Bessel function In(x).
     *
     * @param arg1 - The value at which to evaluate the function.
     * @param arg2 - The order of the Bessel function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BESSELI/
     */
    BESSELI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the Bessel function Jn(x).
     *
     * @param arg1 - The value at which to evaluate the function.
     * @param arg2 - The order of the Bessel function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BESSELJ/
     */
    BESSELJ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the modified Bessel function Kn(x).
     *
     * @param arg1 - The value at which to evaluate the function.
     * @param arg2 - The order of the function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BESSELK/
     */
    BESSELK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the Bessel function Yn(x).
     *
     * @param arg1 - The value at which to evaluate the function.
     * @param arg2 - The order of the function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BESSELY/
     */
    BESSELY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the cumulative beta probability density function.
     *
     * @param arg1 - The value between A and B at which to evaluate the function.
     * @param arg2 - The alpha parameter of the distribution which must be greater than 0.
     * @param arg3 - The beta parameter of the distribution which must be greater than 0.
     * @param arg4 - An optional lower bound to the interval of x (A). If omitted, it is equal to 0.
     * @param arg5 - An optional upper bound to the interval of x (B). If omitted, it is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BETADIST/
     */
    BETADIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the cumulative beta probability density function for a specified beta
     * distribution (BETADIST).
     *
     * @param arg1 - A probability associated with the beta distribution.
     * @param arg2 - The alpha parameter of the distribution which must be greater than 0.
     * @param arg3 - The beta parameter of the distribution which must be greater than 0.
     * @param arg4 - An optional lower bound to the interval of x (A). If omitted, it is equal to 0.
     * @param arg5 - An optional upper bound to the interval of x (B). If omitted, it is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BETAINV/
     */
    BETAINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the beta probability distribution function.
     *
     * @param arg1 - The value between A and B at which to evaluate the function.
     * @param arg2 - The alpha parameter of the distribution which must be greater than 0.
     * @param arg3 - The beta parameter of the distribution which must be greater than 0.
     * @param arg4 - Specifies if this is the cumulative distribution function (**true**) or the probability density
     *   function (**false**).
     * @param arg5 - An optional lower bound to the interval of x (A). If omitted, it is equal to 0.
     * @param arg6 - An optional upper bound to the interval of x (B). If omitted, it is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BETA_DIST/
     */
    BETA_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the cumulative beta probability density function (BETA_DIST).
     *
     * @param arg1 - A probability associated with the beta distribution.
     * @param arg2 - The alpha parameter of the distribution which must be greater than 0.
     * @param arg3 - The beta parameter of the distribution which must be greater than 0.
     * @param arg4 - An optional lower bound to the interval of x (A). If omitted, it is equal to 0.
     * @param arg5 - An optional upper bound to the interval of x (B). If omitted, it is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BETA_INV/
     */
    BETA_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Converts a binary number to decimal.
     *
     * @param arg1 - The binary number which will be convertrd.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BIN2DEC/
     */
    BIN2DEC(arg1: ApiRange | ApiName | number): number;

    /**
     * Converts a binary number to hexadecimal.
     *
     * @param arg1 - The binary number which will be convertrd.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BIN2HEX/
     */
    BIN2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts a binary number to octal.
     *
     * @param arg1 - The binary number which will be convertrd.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BIN2OCT/
     */
    BIN2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the individual term binomial distribution probability.
     *
     * @param arg1 - The number of successes in trials.
     * @param arg2 - The number of independent trials.
     * @param arg3 - The probability of success on each trial.
     * @param arg4 - Specifies if this is the cumulative distribution function (**true**) or the probability mass
     *   function (**false**).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BINOMDIST/
     */
    BINOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the individual term binomial distribution probability.
     *
     * @param arg1 - The number of successes in trials.
     * @param arg2 - The number of independent trials.
     * @param arg3 - The probability of success on each trial.
     * @param arg4 - Specifies if this is the cumulative distribution function (**true**) or the probability mass
     *   function (**false**).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BINOM_DIST/
     */
    BINOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the probability of a trial result using a binomial distribution.
     *
     * @param arg1 - The number of independent trials.
     * @param arg2 - The probability of success on each trial.
     * @param arg3 - The minimum number of successes in the trials to calculate probability for, a numeric value
     *   greater than or equal to 0.
     * @param arg4 - The maximum number of successes in the trials to calculate probability for, a numeric value
     *   greater than the minimum number of successes and less than or equal to trials.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BINOM_DIST_RANGE/
     */
    BINOM_DIST_RANGE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the smallest value for which the cumulative binomial distribution is greater than or equal
     * to a criterion value.
     *
     * @param arg1 - The number of Bernoulli trials.
     * @param arg2 - The probability of success on each trial, a number between 0 and 1 inclusive.
     * @param arg3 - The criterion value, a number between 0 and 1 inclusive.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BINOM_INV/
     */
    BINOM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns a bitwise "AND" of two numbers.
     *
     * @param arg1 - The first decimal representation of the binary number to evaluate.
     * @param arg2 - The second decimal representation of the binary number to evaluate.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BITAND/
     */
    BITAND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns a number shifted left by the specified number of bits.
     *
     * @param arg1 - The decimal representation of the binary number to evaluate.
     * @param arg2 - The number of bits by which the number will be shifted left.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BITLSHIFT/
     */
    BITLSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns a bitwise "OR" of two numbers.
     *
     * @param arg1 - The first decimal representation of the binary number to evaluate.
     * @param arg2 - The second decimal representation of the binary number to evaluate.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BITOR/
     */
    BITOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns a number shifted right by the specified number of bits.
     *
     * @param arg1 - The decimal representation of the binary number to evaluate.
     * @param arg2 - The number of bits by which the number will be shifted right.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BITRSHIFT/
     */
    BITRSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns a bitwise "XOR" (Exclusive Or) of two numbers.
     *
     * @param arg1 - The first decimal representation of the binary number to evaluate.
     * @param arg2 - The second decimal representation of the binary number to evaluate.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/BITXOR/
     */
    BITXOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Rounds a number up, to the nearest multiple of significance.
     *
     * @param arg1 - The value to round up.
     * @param arg2 - The multiple of significance to round up to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CEILING/
     */
    CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Rounds a number up, to the nearest integer or to the nearest multiple of significance.
     *
     * @param arg1 - The value to round up.
     * @param arg2 - The multiple of significance to round up to. If it is omitted, the default value of 1 is used.
     * @param arg3 - Specifies if negative numbers are rounded towards or away from zero. If it is omitted or set to
     *   0, negative numbers are rounded towards zero. If any other numeric value is specified, negative
     *   numbers are rounded away from zero.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CEILING_MATH/
     */
    CEILING_MATH(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns a number that is rounded up to the nearest integer or to the nearest multiple of
     * significance. The number is always rounded up regardless of its sing.
     *
     * @param arg1 - The value to round up.
     * @param arg2 - The multiple of significance to round up to. If it is omitted, the default value of 1 is used.
     *   If it is set to zero, the function returns 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CEILING_PRECISE/
     */
    CEILING_PRECISE(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the character specified by the code number from your computer's character set.
     *
     * @param arg1 - A number between 1 and 255 specifying a character from the computer character set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHAR/
     */
    CHAR(arg1: ApiRange | ApiName | number): string;

    /**
     * Returns the right-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - The value at which the distribution will be evaluated, a nonnegative number.
     * @param arg2 - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHIDIST/
     */
    CHIDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the right-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - A probability associated with the chi-squared distribution, a value between 0 and 1 inclusive.
     * @param arg2 - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHIINV/
     */
    CHIINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the left-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - The value at which the distribution will be evaluated, a nonnegative number.
     * @param arg2 - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - A logical value that determines the form of the function. If this argument is equal to **true**,
     *   the cumulative distribution function is returned; if it is equal to **false**, the probability
     *   density function is returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHISQ_DIST/
     */
    CHISQ_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the right-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - The value at which the distribution will be evaluated, a nonnegative number.
     * @param arg2 - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHISQ_DIST_RT/
     */
    CHISQ_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the left-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - A probability associated with the chi-squared distribution, a value between 0 and 1 inclusive.
     * @param arg2_ - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHISQ_INV/
     */
    CHISQ_INV(arg1: ApiRange | ApiName | number, arg2_: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the right-tailed probability of the chi-squared distribution.
     *
     * @param arg1 - A probability associated with the chi-squared distribution, a value between 0 and 1 inclusive.
     * @param arg2 - The number of degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHISQ_INV_RT/
     */
    CHISQ_INV_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the test for independence: the value from the chi-squared distribution for the statistic and
     * the appropriate degrees of freedom.
     *
     * @param arg1 - The range of data that contains observations to test against expected values.
     * @param arg2 - The range of data that contains the ratio of the product of row totals and column totals to the
     *   grand total.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHITEST/
     */
    CHITEST(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number;

    /**
     * Chooses a value or action to perform from a list of values, based on an index number.
     *
     * @param arg1 - The position of the value in the list of values, a numeric value greater than or equal to 1 but
     *   less than the number of values in the list of values.
     * @param args - Up to 254 values or the selected range of cells to analyze. The first argument is required,
     *   subsequent arguments are optional. Arguments can be numbers, ranges, names, or text strings.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CHOOSE/
     */
    CHOOSE(arg1: ApiRange | ApiName | number, args: number | string | ApiRange | ApiName): number;

    /**
     * Removes all the nonprintable characters from the text.
     *
     * @param arg1 - A string from which nonprintable characters will be removed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CLEAN/
     */
    CLEAN(arg1: ApiRange | ApiName | string): string;

    /**
     * Returns the code number from your computer's character set for the first character in the specified
     * text string.
     *
     * @param arg1 - The text for which to get the code of the first character.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CODE/
     */
    CODE(arg1: ApiRange | ApiName | string): number;

    /**
     * Returns the number of columns in the cell range.
     *
     * @param arg1 - A range or array of cells for which the number of columns will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COLUMNS/
     */
    COLUMNS(arg1: ApiRange | ApiName | number[]): number;

    /**
     * Returns the number of combinations for a given number of items.
     *
     * @param arg1 - The total number of items, a numeric value greater than or equal to 0.
     * @param arg2 - The number of items in each combination, a numeric value greater than or equal to 0 but less
     *   than the total number of items.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COMBIN/
     */
    COMBIN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the number of combinations with repetitions for a given number of items.
     *
     * @param arg1 - The total number of items, a numeric value greater than or equal to 0.
     * @param arg2 - The number of items in each combination, a numeric value greater than or equal to 0 but less
     *   than the total number of items.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COMBINA/
     */
    COMBINA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Converts real and imaginary coefficients into a complex number.
     *
     * @param arg1 - The real coefficient of the complex number.
     * @param arg2 - The imaginary coefficient of the complex number.
     * @param arg3 - The suffix for the imaginary component of the complex number. It can be either "i" or "j" in
     *   lowercase. If it is omitted, the function will assume suffix to be "i".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COMPLEX/
     */
    COMPLEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | string): number;

    /**
     * Combines multiple text strings into one text string.
     *
     * @param arg_n - Up to 255 data values that will be combined.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CONCATENATE/
     */
    CONCATENATE(arg_n: ApiRange | ApiName | string): string;

    /**
     * Returns the confidence interval for a population mean, using a normal distribution.
     *
     * @param arg1 - The significance level used to compute the confidence level, a number greater than 0 and less
     *   than 1.
     * @param arg2 - The population standard deviation for the data range and is assumed to be known. This value must
     *   be greater than 0.
     * @param arg3 - The sample size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CONFIDENCE/
     */
    CONFIDENCE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the confidence interval for a population mean, using a normal distribution.
     *
     * @param arg1 - The significance level used to compute the confidence level, a number greater than 0 and less
     *   than 1.
     * @param arg2 - The population standard deviation for the data range and is assumed to be known. This value must
     *   be greater than 0.
     * @param arg3 - The sample size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CONFIDENCE_NORM/
     */
    CONFIDENCE_NORM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the confidence interval for a population mean, using a Student's t distribution.
     *
     * @param arg1 - The significance level used to compute the confidence level, a number greater than 0 and less
     *   than 1.
     * @param arg2 - The population standard deviation for the data range and is assumed to be known. This value must
     *   be greater than 0.
     * @param arg3 - The sample size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CONFIDENCE_T/
     */
    CONFIDENCE_T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Converts a number from one measurement system to another.
     *
     * @param arg1 - The value in the specified units to be converted.
     * @param arg2 - The original measurement unit.
     * @param arg3 - The units for the result.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CONVERT/
     */
    CONVERT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string): number;

    /**
     * Returns the cosine of an angle.
     *
     * @param arg1 - The angle in radians for which the cosine will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COS/
     */
    COS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic cosine of a number.
     *
     * @param arg1 - Any real number for which the hyperbolic cosine will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COSH/
     */
    COSH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the cotangent of an angle.
     *
     * @param arg1 - The angle in radians for which the cotangent will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COT/
     */
    COT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic cotangent of a number.
     *
     * @param arg1 - The angle in radians for which the hyperbolic cotangent will be calculated. Its absolute value
     *   must be less than *2^27*.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COTH/
     */
    COTH(arg1: ApiRange | ApiName | number): number;

    /**
     * Counts a number of cells in a range that contains numbers ignoring empty cells or those contaning
     * text.
     *
     * @param args - Up to 255 items, or ranges to count numbers. The first argument is required, subsequent
     *   arguments are optional. Arguments can be numbers, logical values and text representations of
     *   numbers, ranges, names, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUNT/
     */
    COUNT(args: string | number | boolean | (string | number | boolean)[] | ApiRange | ApiName): number;

    /**
     * Counts a number of cells in a range that are not empty.
     *
     * @param args - Up to 255 items, or ranges to count values. The first argument is required, subsequent arguments
     *   are optional. Arguments can be numbers, logical values, text strings, ranges, names, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUNTA/
     */
    COUNTA(args: string | number | boolean | (string | number | boolean)[] | ApiRange | ApiName): number;

    /**
     * Counts a number of empty cells in a specified range of cells.
     *
     * @param arg1 - The range to count the empty cells.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUNTBLANK/
     */
    COUNTBLANK(arg1: ApiRange | ApiName): number;

    /**
     * Counts a number of cells within a range that meet the given condition.
     *
     * @param arg1 - The range of cells to count nonblank cells.
     * @param arg2 - The condition in the form of a number, expression, or text that defines which cells will be
     *   counted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUNTIF/
     */
    COUNTIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string): number;

    /**
     * Counts a number of cells specified by a given set of conditions or criteria.
     *
     * @param arg1 - The first range of cells to count nonblank cells.
     * @param arg2 - The first condition in the form of a number, expression, or text that defines which cells will
     *   be counted.
     * @param arg3 - Up to 127 additional ranges of cells to count nonblank cells. This argument is optional.
     * @param arg4 - Up to 127 additional conditions in the form of a number, expression, or text that define which
     *   cells will be counted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUNTIFS/
     */
    COUNTIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string): number;

    /**
     * Returns the number of days from the beginning of the coupon period to the settlement date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPDAYBS/
     */
    COUPDAYBS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the number of days in the coupon period that contains the settlement date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPDAYS/
     */
    COUPDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the number of days from the settlement date to the next coupon date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPDAYSNC/
     */
    COUPDAYSNC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the next coupon date after the settlement date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPNCD/
     */
    COUPNCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the number of coupons payable between the settlement date and maturity date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPNUM/
     */
    COUPNUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the previous coupon date before the settlement date.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg4 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/COUPPCD/
     */
    COUPPCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the smallest value for which the cumulative binomial distribution is greater than or equal
     * to a criterion value.
     *
     * @param arg1 - The number of Bernoulli trials.
     * @param arg2 - The probability of success on each trial, a number between 0 and 1 inclusive.
     * @param arg3 - The criterion value, a number between 0 and 1 inclusive.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CRITBINOM/
     */
    CRITBINOM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the cosecant of an angle.
     *
     * @param arg1 - The angle in radians for which the cosecant will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CSC/
     */
    CSC(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic cosecant of an angle.
     *
     * @param arg1 - The angle in radians for which the hyperbolic cosecant will be calculated. Its absolute value
     *   must be less than *2^27*.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CSCH/
     */
    CSCH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the cumulative interest paid between two periods.
     *
     * @param arg1 - The interest rate for the investment.
     * @param arg2 - The total number of payment periods.
     * @param arg3 - A present value of the payments.
     * @param arg4 - The first period included into the calculation.
     * @param arg5 - The last period included into the calculation.
     * @param arg6 - The timing of the payment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CUMIPMT/
     */
    CUMIPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;

    /**
     * Returns the cumulative principal paid on a loan between two periods.
     *
     * @param arg1 - The interest rate for the investment.
     * @param arg2 - The total number of payment periods.
     * @param arg3 - A present value of the payments.
     * @param arg4 - The first period included into the calculation.
     * @param arg5 - The last period included into the calculation.
     * @param arg6 - The timing of the payment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/CUMPRINC/
     */
    CUMPRINC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;

    /**
     * Returns a number that represents the date in the date-time code.
     *
     * @param arg1 - A number from 1900 or 1904 (depending on the workbook's date system) to 9999.
     * @param arg2 - A number from 1 to 12 representing the month of the year.
     * @param arg3 - A number from 1 to 31 representing the day of the month.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DATE/
     */
    DATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Converts a date in the form of text to a number that represents the date in the date-time code.
     *
     * @param arg1 - The text that represents a date, between 1/1/1900 or 1/1/1904 (depending on the workbook's date
     *   system) and 12/31/9999.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DATEVALUE/
     */
    DATEVALUE(arg1: ApiRange | ApiName | string): number;

    /**
     * Averages the values in a field (column) of records in a list or database that match conditions you
     * specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DAVERAGE/
     */
    DAVERAGE(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Returns the day of the date given in the numerical format, a number from 1 to 31.
     *
     * @param arg1 - A number in the date-time code.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DAY/
     */
    DAY(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the number of days between the two dates.
     *
     * @param arg1 - Start date from which days will be counted.
     * @param arg2 - End date until which days will be counted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DAYS/
     */
    DAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the number of days between two dates based on a 360-day year (twelve 30-day months).
     *
     * @param arg1 - Start date from which days will be counted.
     * @param arg2 - End date until which days will be counted.
     * @param arg3 - A logical value that specifies whether to use the U.S. (NASD) (false or omitted) or European
     *   (true) method in the calculation. According to the European method, the start and end dates that
     *   occur on the 31st of a month become equal to the 30th of the same month. According to the U.S.
     *   method, the start date is the last day of a month, it becomes equal to the 30th of the same
     *   month. If the end date is the last day of a month and the start date is earlier than the 30th of
     *   a month, the end date becomes equal to the 1st of the next month. Otherwise the end date becomes
     *   equal to the 30th of the same month.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DAYS360/
     */
    DAYS360(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the depreciation of an asset for a specified period using the fixed-declining balance
     * method.
     *
     * @param arg1 - The initial cost of the asset.
     * @param arg2 - The salvage value of the asset at the end of its lifetime.
     * @param arg3 - The number of periods over which the asset is being depreciated (sometimes called the useful
     *   life of the asset).
     * @param arg4 - The period for which the depreciation will be calculated. Period must use the same units as the
     *   useful life of the asset.
     * @param arg5 - The number of months in the first year. If this parameter is omitted, it is assumed to be 12.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DB/
     */
    DB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Counts the cells containing numbers in the field (column) of records in the database that match the
     * conditions you specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DCOUNT/
     */
    DCOUNT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Counts nonblank cells in the field (column) of records in the database that match the conditions you
     * specify.
     *
     * @param arg1_ - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DCOUNTA/
     */
    DCOUNTA(arg1_: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Returns the depreciation of an asset for a specified period using the double-declining balance
     * method or some other method you specify.
     *
     * @param arg1 - The initial cost of the asset.
     * @param arg2 - The salvage value of the asset at the end of its lifetime.
     * @param arg3 - The number of periods over which the asset is being depreciated (sometimes called the useful
     *   life of the asset).
     * @param arg4 - The period for which the depreciation will be calculated. Period must use the same units as the
     *   useful life of the asset.
     * @param arg5 - The rate at which the balance declines. If this parameter is omitted, it is assumed to be 2 (the
     *   double-declining balance method).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DDB/
     */
    DDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Converts a decimal number to binary.
     *
     * @param arg1 - The decimal integer to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DEC2BIN/
     */
    DEC2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts a decimal number to hexadecimal.
     *
     * @param arg1 - The decimal integer to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DEC2HEX/
     */
    DEC2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts a decimal number to octal.
     *
     * @param arg1 - Te decimal integer to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DEC2OCT/
     */
    DEC2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts a text representation of a number in a given base into a decimal number.
     *
     * @param arg1 - The number to convert. The string lenght must be less than or equal to 255 characters.
     * @param arg2 - The base Radix of the number that is converting. An integer greater than or equal to 2 and less
     *   than or equal to 36.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DECIMAL/
     */
    DECIMAL(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): number;

    /**
     * Converts radians to degrees.
     *
     * @param arg1 - The angle in radians to convert.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DEGREES/
     */
    DEGREES(arg1: ApiRange | ApiName | number): number;

    /**
     * Tests whether two numbers are equal. The function returns 1 if the numbers are equal and 0
     * otherwise.
     *
     * @param arg1 - The first number.
     * @param arg2 - The second number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DELTA/
     */
    DELTA(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the sum of squares of deviations of data points from their sample mean.
     *
     * @param args - Up to 255 numerical values for which to find the sum of squares of deviations. The first
     *   argument is required, subsequent arguments are optional. Arguments can be numbers, names, or
     *   arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DEVSQ/
     */
    DEVSQ(args: ApiRange | ApiName | number | number[]): number;

    /**
     * Extracts from a database a single record that matches the conditions you specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DGET/
     */
    DGET(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Returns the discount rate for a security.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The purchase price of the security, per $100 par value.
     * @param arg4 - The redemption value of the security, per $100 par value.
     * @param arg5 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DISC/
     */
    DISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the largest number in the field (column) of records in the database that match the
     * conditions you specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DMAX/
     */
    DMAX(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Returns the smallest number in the field (column) of records in the database that match the
     * conditions you specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DMIN/
     */
    DMIN(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Converts a number to text, using a currency format $#.##.
     *
     * @param arg1 - A number, a reference to a cell containing a number, or a formula that returns a number.
     * @param arg2 - A number of digits to the right of the decimal point. The number is rounded as necessary. If it
     *   is omitted, the function will assume it to be 2.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DOLLAR/
     */
    DOLLAR(arg1: ApiRange | ApiName | number | string, arg2?: ApiRange | ApiName | number): string;

    /**
     * Converts a dollar price, expressed as a fraction, into a dollar price, expressed as a decimal
     * number.
     *
     * @param arg1 - A number expressed as a fraction.
     * @param arg2 - The integer to use in the denominator of the fraction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DOLLARDE/
     */
    DOLLARDE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Converts a dollar price, expressed as a decimal number, into a dollar price, expressed as a
     * fraction.
     *
     * @param arg1 - A decimal number.
     * @param arg2 - The integer to use in the denominator of a fraction.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DOLLARFR/
     */
    DOLLARFR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Multiplies the values in the field (column) of records in the database that match the conditions you
     * specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DPRODUCT/
     */
    DPRODUCT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Estimates the standard deviation based on a sample from the selected database entries.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DSTDEV/
     */
    DSTDEV(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Calculates the standard deviation based on the entire population of the selected database entries.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DSTDEVP/
     */
    DSTDEVP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Adds the numbers in the field (column) of records in the database that match the conditions you
     * specify.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DSUM/
     */
    DSUM(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Returns the annual duration of a security with periodic interest payments.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The annual coupon rate of the security.
     * @param arg4 - The annual yield of the security.
     * @param arg5 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DURATION/
     */
    DURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Estimates variance based on a sample from the selected database entries.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DVAR/
     */
    DVAR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Calculates variance based on the entire population of the selected database entries.
     *
     * @param arg1 - The range of cells that makes up the list or database. A database is a list of related data.
     * @param arg2 - The column which is used in the function. Either the label of the column in double quotation
     *   marks or a number that represents the column's position in the list.
     * @param arg3 - The range of cells that contains the conditions you specify. The range includes at least one
     *   column label and at least one cell below the column label for a condition.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/DVARP/
     */
    DVARP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;

    /**
     * Rounds the number up to the nearest multiple of significance. Negative numbers are rounded towards
     * zero.
     *
     * @param arg1 - The value to round up.
     * @param arg2 - The multiple of significance to round up to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ECMA_CEILING/
     */
    ECMA_CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the serial number of the date which comes the indicated number of months before or after the
     * start date.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - The number of months before or after the start date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EDATE/
     */
    EDATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the effective annual interest rate.
     *
     * @param arg1 - The nominal interest rate.
     * @param arg2 - The number of compounding periods per year.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EFFECT/
     */
    EFFECT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the serial number of the last day of the month before or after the specified number of
     * months.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - The number of months before or after the start date.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EOMONTH/
     */
    EOMONTH(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the error function integrated between the specified lower and upper limits.
     *
     * @param arg1 - The lower bound for integrating the error function.
     * @param arg2 - The upper bound for integrating the error function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ERF/
     */
    ERF(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the complementary error function integrated between the specified lower limit and infinity.
     *
     * @param arg1 - The lower bound for integrating the complementary error function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ERFC/
     */
    ERFC(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the complementary error function integrated between the specified lower limit and infinity.
     *
     * @param arg1 - The lower bound for integrating the complementary error function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ERFC_PRECISE/
     */
    ERFC_PRECISE(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the error function integrated between 0 and the specified lower limit.
     *
     * @param arg1 - The lower bound for integrating the error function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ERF_PRECISE/
     */
    ERF_PRECISE(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a number matching an error value.
     *
     * @param arg1 - The error value for which the identifying number will be returned. It can be an actual error
     *   value or a reference to a cell containing an error value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ERROR_TYPE/
     */
    ERROR_TYPE(arg1: ErrorValue | ApiRange | ApiName): number;

    /**
     * Rounds a positive number up and negative number down to the nearest even integer.
     *
     * @param arg1 - The value to round up.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EVEN/
     */
    EVEN(arg1: ApiRange | ApiName | number): number;

    /**
     * Checks whether two text strings are exactly the same, and returns **true** or **false**. This
     * function is case-sensitive.
     *
     * @param arg1 - The first text string.
     * @param arg2 - The second text string.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EXACT/
     */
    EXACT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string): boolean;

    /**
     * Returns the **e** constant raised to the power of a given number. The **e** constant is equal to
     * **2.71828182845904**, the base of the natural logarithm.
     *
     * @param arg1 - The exponent applied to the base **e**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EXP/
     */
    EXP(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the exponential distribution.
     *
     * @param arg1 - The value of the x function, a nonnegative number.
     * @param arg2 - The lambda parameter value, a positive number.
     * @param arg3 - A logical value that determines the function form. If this parameter is **true**, the function
     *   will return the cumulative distribution function, if it is **false**, it will return the
     *   probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EXPONDIST/
     */
    EXPONDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the exponential distribution.
     *
     * @param arg1 - The value of the x function, a nonnegative number.
     * @param arg2 - The lambda parameter value, a positive number.
     * @param arg3 - A logical value that determines the function form. If this parameter is **true**, the function
     *   will return the cumulative distribution function, if it is **false**, it will return the
     *   probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/EXPON_DIST/
     */
    EXPON_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the factorial of a number, which is equal to *1*2*3*...** number.
     *
     * @param arg1 - The nonnegative number for which the factorial will be calculated.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FACT/
     */
    FACT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the double factorial of a number.
     *
     * @param arg1 - The value for which to return the double factorial.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FACTDOUBLE/
     */
    FACTDOUBLE(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the **false** logical value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FALSE/
     */
    FALSE(): boolean;

    /**
     * Returns the (right-tailed) F probability distribution (degree of diversity) for two data sets.
     *
     * @param arg1 - The value at which to evaluate the function, a nonnegative number.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FDIST/
     */
    FDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the starting position of one text string within another text string. This function is
     * case-sensitive.
     *
     * @param arg1 - The text to find. Use double quotes (empty text) to match the first character in the search
     *   string. Wildcard characters are not allowed.
     * @param arg2 - The text containing the text to find.
     * @param arg3 - Specifies the character at which to start the search. The first character in the search string
     *   is character number 1. If omitted, this parameter is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FIND/
     */
    FIND(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;

    /**
     * Finds the specified substring within another string and is intended for languages that use the
     * double-byte character set (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text to find. Use double quotes (empty text) to match the first character in the search
     *   string. Wildcard characters are not allowed.
     * @param arg2 - The text containing the text to find.
     * @param arg3 - Specifies the character at which to start the search. The first character in the search string
     *   is character number 1. If omitted, this parameter is equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FINDB/
     */
    FINDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the (right-tailed) F probability distribution: if p = FDIST(x,...), then
     * FINV(p,...) = x.
     *
     * @param arg1 - A probability associated with the F cumulative distribution, a number between 0 and 1 inclusive.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FINV/
     */
    FINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the Fisher transformation.
     *
     * @param arg1 - The value for the transformation, a number between -1 and 1, excluding -1 and 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FISHER/
     */
    FISHER(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the Fisher transformation: if y = FISHER(x), then FISHERINV(y) = x.
     *
     * @param arg1 - The value to perform the inverse of the transformation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FISHERINV/
     */
    FISHERINV(arg1: ApiRange | ApiName | number): number;

    /**
     * Rounds a number to the specified number of decimals and returns the result as text with or without
     * commas.
     *
     * @param arg1 - The number to round and convert to text.
     * @param arg2 - The number of digits to the right of the decimal point. If omitted, the function will assume it
     *   to be 2.
     * @param arg3 - Specifies whether do display commas in the returned text (**false** or omitted) or not
     *   (**true**).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FIXED/
     */
    FIXED(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): string;

    /**
     * Rounds a number down to the nearest multiple of significance.
     *
     * @param arg1 - The numeric value to round down.
     * @param arg2 - The multiple of significance to round down to. The number to round down and the multiple of
     *   significance must have the same sign.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FLOOR/
     */
    FLOOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Rounds a number down, to the nearest integer or to the nearest multiple of significance.
     *
     * @param arg1 - The numeric value to round down.
     * @param arg2 - The multiple of significance to round down to. If it is omitted, the default value of 1 is used.
     * @param arg3 - Specifies if negative numbers are rounded towards or away from zero. If it is omitted or set to
     *   0, negative numbers are rounded away from zero. If any other numeric value is specified,
     *   negative numbers are rounded towards zero.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FLOOR_MATH/
     */
    FLOOR_MATH(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns a number that is rounded down to the nearest integer or to the nearest multiple of
     * significance. The number is always rounded down regardless of its sign.
     *
     * @param arg1 - The numeric value to round down.
     * @param arg2 - The multiple of significance to round down to. If it is omitted, the default value of 1 is used.
     *   If it is set to zero, the function returns 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FLOOR_PRECISE/
     */
    FLOOR_PRECISE(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Calculates or predicts a future value based on existing (historical) values by using the AAA version
     * of the Exponential Smoothing (ETS) algorithm.
     *
     * @param arg1 - A date for which a new value will be predicted. Must be after the last date in the timeline.
     * @param arg2 - A range or an array of numeric data that determines the historical values for which a new point
     *   will be predicted.
     * @param arg3 - A range of date/time values that correspond to the historical values. The timeline range must be
     *   of the same size as the second argument. Date/time values must have a constant step between them
     *   and can't be zero.
     * @param arg4 - An optional numeric value that specifies the length of the seasonal pattern. The default value
     *   of 1 indicates seasonality is detected automatically. The 0 value means no seasonality.
     * @param arg5 - An optional numeric value to handle missing values. The default value of 1 replaces missing
     *   values by interpolation, and 0 replaces them with zeros.
     * @param arg6 - An optional numeric value to aggregate multiple values with the same time stamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FORECAST_ETS/
     */
    FORECAST_ETS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns a confidence interval for the forecast value at the specified target date.
     *
     * @param arg1 - A date for which a new value will be predicted. Must be after the last date in the timeline.
     * @param arg2 - A range or an array of numeric data that determines the historical values for which a new point
     *   will be predicted.
     * @param arg3 - A range of date/time values that correspond to the historical values. The timeline range must be
     *   of the same size as the second argument. Date/time values must have a constant step between them
     *   and can't be zero.
     * @param arg4 - A number between 0 and 1 that shows the confidence level for the calculated confidence interval.
     *   The default value is .95.
     * @param arg5 - An optional numeric value that specifies the length of the seasonal pattern. The default value
     *   of 1 indicates seasonality is detected automatically. The 0 value means no seasonality.
     * @param arg6 - An optional numeric value to handle missing values. The default value of 1 replaces missing
     *   values by interpolation, and 0 replaces them with zeros.
     * @param arg7 - An optional numeric value to aggregate multiple values with the same time stamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FORECAST_ETS_CONFINT/
     */
    FORECAST_ETS_CONFINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;

    /**
     * Returns the length of the repetitive pattern an application detects for the specified time series.
     *
     * @param arg1 - A range or an array of numeric data that determines the historical values for which a new point
     *   will be predicted.
     * @param arg2 - A range of date/time values that correspond to the historical values. The timeline range must be
     *   of the same size as the second argument. Date/time values must have a constant step between them
     *   and can't be zero.
     * @param arg3 - An optional numeric value to handle missing values. The default value of 1 replaces missing
     *   values by interpolation, and 0 replaces them with zeros.
     * @param arg4 - An optional numeric value to aggregate multiple values with the same time stamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FORECAST_ETS_SEASONALITY/
     */
    FORECAST_ETS_SEASONALITY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;

    /**
     * Returns the requested statistic for the forecast.
     *
     * @param arg1 - A range or an array of numeric data that determines the historical values for which a new point
     *   will be predicted.
     * @param arg2 - A range of date/time values that correspond to the historical values. The timeline range must be
     *   of the same size as the second argument. Date/time values must have a constant step between them
     *   and can't be zero.
     * @param arg3 - A number between 1 and 8, indicating which statistic will be returned for the calculated
     *   forecast.
     * @param arg4 - An optional numeric value that specifies the length of the seasonal pattern. The default value
     *   of 1 indicates seasonality is detected automatically. The 0 value means no seasonality.
     * @param arg5 - An optional numeric value to handle missing values. The default value of 1 replaces missing
     *   values by interpolation, and 0 replaces them with zeros.
     * @param arg6 - An optional numeric value to aggregate multiple values with the same time stamp.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FORECAST_ETS_STAT/
     */
    FORECAST_ETS_STAT(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Calculates how often values occur within a range of values and then returns the first value of the
     * returned vertical array of numbers.
     *
     * @param arg1 - An array of values or the selected range for which the frequencies will be counted (blanks and
     *   text are ignored).
     * @param arg2 - An array of intervals or the selected range into which the values in the first range will be
     *   grouped.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FREQUENCY/
     */
    FREQUENCY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number[]): number;

    /**
     * Returns the future value of an investment based on periodic, constant payments and a constant
     * interest rate.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The total number of payment periods in the investment.
     * @param arg3 - The payment made each period; it cannot change over the life of the investment.
     * @param arg4 - The present value, or the lump-sum amount that a series of future payments is worth now. If
     *   omitted, it is equal to 0.
     * @param arg5 - A value representing the timing of payment: payment at the beginning of the period = 1; payment
     *   at the end of the period = 0 or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FV/
     */
    FV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the future value of an initial principal after applying a series of compound interest rates.
     *
     * @param arg1 - The present value of an investment.
     * @param arg2 - An array of interest rates to apply.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/FVSCHEDULE/
     */
    FVSCHEDULE(arg1: ApiRange | ApiName | number, arg2: number[] | ApiRange | ApiName): number;

    /**
     * Returns the (left-tailed) F probability distribution (degree of diversity) for two data sets.
     *
     * @param arg1 - The value at which to evaluate the function, a nonnegative number.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg4 - A logical value that determines the function form. If this parameter is **true**, the function
     *   will return the cumulative distribution function, if it is **false**, it will return the
     *   probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/F_DIST/
     */
    F_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the (right-tailed) F probability distribution (degree of diversity) for two data sets.
     *
     * @param arg1 - The value at which to evaluate the function, a nonnegative number.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/F_DIST_RT/
     */
    F_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the (left-tailed) F probability distribution: if p = F.DIST(x,...), then
     * F.INV(p,...) = x.
     *
     * @param arg1 - A probability associated with the F cumulative distribution, a number between 0 and 1 inclusive.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/F_INV/
     */
    F_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the (right-tailed) F probability distribution: if p = F.DIST.RT(x,...), then
     * F.INV.RT(p,...) = x.
     *
     * @param arg1 - A probability associated with the F cumulative distribution, a number between 0 and 1 inclusive.
     * @param arg2 - The numerator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     * @param arg3 - The denominator degrees of freedom, a number between 1 and 10^10, excluding 10^10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/F_INV_RT/
     */
    F_INV_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the gamma function value.
     *
     * @param arg1 - The value for which the gamma function will be calculated.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMA/
     */
    GAMMA(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the gamma distribution.
     *
     * @param arg1 - The value at which the distribution will be calculated, a nonnegative number.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number. If this parameter is equal to 1, the
     *   function returns the standard gamma distribution.
     * @param arg4 - A logical value (**true**> or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMADIST/
     */
    GAMMADIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the gamma cumulative distribution: if p = GAMMADIST(x,...), then
     * GAMMAINV(p,...) = x.
     *
     * @param arg1 - The probability associated with the gamma distribution, a number between 0 and 1, inclusive.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number. If this parameter is equal to 1, the
     *   function returns the standard gamma distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMAINV/
     */
    GAMMAINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the natural logarithm of the gamma function.
     *
     * @param arg1 - The value for which the natural logarithm of the gamma function will be calculated, a positive
     *   number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMALN/
     */
    GAMMALN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the natural logarithm of the gamma function.
     *
     * @param arg1 - The value for which the natural logarithm of the gamma function will be calculated, a positive
     *   number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMALN_PRECISE/
     */
    GAMMALN_PRECISE(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the gamma distribution.
     *
     * @param arg1 - The value at which the distribution will be calculated, a nonnegative number.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number. If this parameter is equal to 1, the
     *   function returns the standard gamma distribution.
     * @param arg4 - A logical value (**true**> or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMA_DIST/
     */
    GAMMA_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the gamma cumulative distribution: if p = GAMMA.DIST(x,...), then
     * GAMMA.INV(p,...) = x.
     *
     * @param arg1 - The probability associated with the gamma distribution, a number between 0 and 1, inclusive.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number. If this parameter is equal to 1, the
     *   function returns the standard gamma distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAMMA_INV/
     */
    GAMMA_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Calculates the probability that a member of a standard normal population will fall between the mean
     * and arg1 standard deviations from the mean.
     *
     * @param arg1 - The value for which the distribution will be calculated.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GAUSS/
     */
    GAUSS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the greatest common divisor.
     *
     * @param args - Up to 255 numeric values for which the greatest common divisor will be returned. The first
     *   argument is required, subsequent arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GCD/
     */
    GCD(args: ApiRange | ApiName | number): number;

    /**
     * Returns the geometric mean of positive numeric data.
     *
     * @param args - Up to 255 numeric values for which the geometric mean will be calculated. Arguments can be
     *   numbers, names, ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GEOMEAN/
     */
    GEOMEAN(args: ApiRange | number[] | ApiName): number;

    /**
     * Tests whether a number is greater than a threshold value. The function returns 1 if the number is
     * greater than or equal to the threshold value and 0 otherwise.
     *
     * @param arg1 - The value to test against step.
     * @param arg2 - The threshold value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GESTEP/
     */
    GESTEP(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Calculates predicted exponential growth by using existing data.
     *
     * @param arg1 - The set of y-values from the *y = b*m^x* equation, an array or range of positive numbers.
     * @param arg2 - An optional set of x-values from the *y = b*m^x* equation, an array or range of positive numbers
     *   that has the same size as the set of y-values.
     * @param arg3 - New x-values for which the function will return the corresponding y-values.
     * @param arg4 - A logical value: the constant *b* is calculated normally if this parameter is set to **true**,
     *   and *b* is set equal to 1 if the parameter is **false** or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/GROWTH/
     */
    GROWTH(arg1: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the harmonic mean of a data set of positive numbers: the reciprocal of the arithmetic mean
     * of reciprocals.
     *
     * @param args - Up to 255 numeric values for which the harmonic mean will be calculated. Arguments can be
     *   numbers, names, ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HARMEAN/
     */
    HARMEAN(args: ApiRange | number[] | ApiName): number;

    /**
     * Converts a hexadecimal number to binary.
     *
     * @param arg1 - The hexadecimal number to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HEX2BIN/
     */
    HEX2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts a hexadecimal number to decimal.
     *
     * @param arg1 - The hexadecimal number to convert.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HEX2DEC/
     */
    HEX2DEC(arg1: ApiRange | ApiName | number): number;

    /**
     * Converts a hexadecimal number to octal.
     *
     * @param arg1 - The hexadecimal number to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HEX2OCT/
     */
    HEX2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Looks for a value in the top row of a table or array of values and returns the value in the same
     * column from the specified row.
     *
     * @param arg1 - The value to be found in the first row of the table and can be a value, a reference, or a text
     *   string.
     * @param arg2 - A table of text, numbers, or logical values in which data is looked up. The data is sorted in
     *   ascending order. This argument can be a range of cells or a range name.
     * @param arg3 - The row number in data table from which the matching value should be returned. The first row of
     *   values in the table is row 1.
     * @param arg4 - A logical value which specifies whether to find the closest match in the top row (sorted in
     *   ascending order) (**true** or omitted) or find an exact match (**false**).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HLOOKUP/
     */
    HLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;

    /**
     * Returns the hour as a number from 0 (12:00 A.M.) to 23 (11:00 P.M.).
     *
     * @param arg1 - A number in the date-time code, or text in the time format, such as "16:48:00" or "4:48:00 PM",
     *   or a result of other formulas or functions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HOUR/
     */
    HOUR(arg1: ApiRange | ApiName | number | string): number;

    /**
     * Creates a shortcut that jumps to another location in the current workbook, or opens a document
     * stored on your hard drive, a network server, or on the Internet.
     *
     * @param arg1 - The text giving the path and file name to the document to be opened, a hard drive location, UNC
     *   address, or URL path.
     * @param arg2 - Text or a number that is displayed in the cell. If omitted, the cell displays the link location
     *   text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HYPERLINK/
     */
    HYPERLINK(arg1: string | ApiRange | ApiName, arg2?: string | ApiRange | number | ApiName): string;

    /**
     * Returns the hypergeometric distribution.
     *
     * @param arg1 - The number of successes in the sample.
     * @param arg2 - The size of the sample.
     * @param arg3 - The number of successes in the population.
     * @param arg4 - The population size.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HYPGEOMDIST/
     */
    HYPGEOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;

    /**
     * Returns the hypergeometric distribution.
     *
     * @param arg1 - The number of successes in the sample.
     * @param arg2 - The size of the sample.
     * @param arg3 - The number of successes in the population.
     * @param arg4 - The population size.
     * @param arg5 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/HYPGEOM_DIST/
     */
    HYPGEOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | boolean): number;

    /**
     * Checks whether a condition is met, and returns one value if **true**, and another value if
     * **false**.
     *
     * @param arg1 - Any value or expression that can be evaluated to **true** or **false**.
     * @param arg2 - The value that is returned if the condition is **true**. If omitted, **true** is returned. You
     *   can nest up to seven IF functions.
     * @param arg3 - The value that is returned if the condition is **false**. If omitted, **false** is returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IF/
     */
    IF(arg1: number | string | ApiRange | ApiName | boolean, arg2: number | string | ApiRange | ApiName | boolean, arg3?: ApiRange | ApiName | number | string | boolean): number | string | boolean;

    /**
     * Checks if there is an error in the formula in the first argument. The function returns the result of
     * the formula if there is no error, or the value specified in the second argument if there is one.
     *
     * @param arg1 - The value, expression, or reference that is checked for an error.
     * @param arg2 - The value to be returned if the formula evaluates to an error. The following errors are
     *   evaluated: **#N/A**, **#VALUE!**, **#REF!**, **#DIV/0!**, **#NUM!**, **#NAME?**, **#NULL!**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IFERROR/
     */
    IFERROR(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number | string | boolean;

    /**
     * Checks if there is an error in the formula in the first argument. The function returns the specified
     * value if the formula returns the *#N/A* error value, otherwise returns the result of the formula.
     *
     * @param arg1 - The value, expression, or reference that is checked for an error.
     * @param arg2 - The value to return if the formula evaluates to the *#N/A* error value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IFNA/
     */
    IFNA(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number | string | boolean;

    /**
     * Returns the absolute value (modulus) of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMABS/
     */
    IMABS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the imaginary coefficient of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMAGINARY/
     */
    IMAGINARY(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the argument Theta, an angle expressed in radians.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMARGUMENT/
     */
    IMARGUMENT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the complex conjugate of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCONJUGATE/
     */
    IMCONJUGATE(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the cosine of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCOS/
     */
    IMCOS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic cosine of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCOSH/
     */
    IMCOSH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the cotangent of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCOT/
     */
    IMCOT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the cosecant of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCSC/
     */
    IMCSC(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic cosecant of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMCSCH/
     */
    IMCSCH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the quotient of two complex numbers.
     *
     * @param arg1 - The complex numerator or dividend in the *x + yi* or *x + yj* form.
     * @param arg2 - The complex denominator or divisor in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMDIV/
     */
    IMDIV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the exponential of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMEXP/
     */
    IMEXP(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the natural logarithm of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMLN/
     */
    IMLN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the base-10 logarithm of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMLOG10/
     */
    IMLOG10(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the base-2 logarithm of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMLOG2/
     */
    IMLOG2(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a complex number raised to an integer power.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     * @param arg2 - The power to which the complex number will be raised.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMPOWER/
     */
    IMPOWER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the product of the specified complex numbers.
     *
     * @param args - Up to 255 complex numbers expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMPRODUCT/
     */
    IMPRODUCT(args: ApiRange | ApiName | string): number;

    /**
     * Returns the real coefficient of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMREAL/
     */
    IMREAL(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the secant of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSEC/
     */
    IMSEC(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic secant of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSECH/
     */
    IMSECH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the sine of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSIN/
     */
    IMSIN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic sine of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSINH/
     */
    IMSINH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the square root of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSQRT/
     */
    IMSQRT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the difference of two complex numbers expressed in the *x + yi* or *x + yj* form.
     *
     * @param arg1 - The complex number from which to subtract the second number.
     * @param arg2 - The complex number to subtract from the first number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSUB/
     */
    IMSUB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the sum of the specified complex numbers.
     *
     * @param args - Up to 255 complex numbers expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMSUM/
     */
    IMSUM(args: ApiRange | ApiName | string): number;

    /**
     * Returns the tangent of a complex number.
     *
     * @param arg1 - A complex number expressed in the *x + yi* or *x + yj* form.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IMTAN/
     */
    IMTAN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a value or reference of the cell at the intersection of a particular row and column, in a
     * given range.
     *
     * @param arg1 - A range of cells or an array constant.
     * @param arg2 - The row in the range from which to return a value. If omitted, the column number is required.
     * @param arg3 - The column in the range from which to return a value. If omitted, the row number is required.
     * @param arg4 - An area to use in case the range contains several ranges. If it is omitted, the function will
     *   assume argument to be 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/INDEX/
     */
    INDEX(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number | string;

    /**
     * Rounds a number down to the nearest integer.
     *
     * @param arg1 - The real number to round down to an integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/INT/
     */
    INT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the interest rate for a fully invested security.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The amount invested in the security.
     * @param arg4 - The amount to be received at maturity.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/INTRATE/
     */
    INTRATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the interest payment for a given period for an investment, based on periodic, constant
     * payments and a constant interest rate.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The period for which the interest will be returned. It must be in the range from 1 to the total
     *   number of payments.
     * @param arg3 - The total number of payment periods in an investment.
     * @param arg4 - The present value, or the lump-sum amount that a series of future payments is worth now.
     * @param arg5 - The future value, or a cash balance which will be attained after the last payment is made. If
     *   omitted, it is equal to 0.
     * @param arg6 - A logical value representing the timing of payment: at the end of the period = 0 or omitted, at
     *   the beginning of the period = 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IPMT/
     */
    IPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the internal rate of return for a series of cash flows.
     *
     * @param arg1 - A range or array of cells that contain numbers for which the internal rate of return will be
     *   calculated.
     * @param arg2 - An estimate at what the internal rate of return will be. If it is omitted, the function will
     *   assume guess to be 0.1 (10 percent).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/IRR/
     */
    IRR(arg1: number[] | ApiRange, arg2?: ApiRange | ApiName | number): number;

    /**
     * Checks whether a value is an error other than *#N/A*, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISERR/
     */
    ISERR(arg1: number | string | boolean | ApiRange | ApiName): boolean;

    /**
     * Checks whether a value is an error, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISERROR/
     */
    ISERROR(arg1: number | string | boolean | ApiRange | ApiName): boolean;

    /**
     * Returns **true** if a number is even.
     *
     * @param arg1 - The value to test.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISEVEN/
     */
    ISEVEN(arg1: ApiRange | ApiName | number): boolean;

    /**
     * Checks whether a reference to a cell contains a formula, and returns **true** or **false**.
     *
     * @param arg1 - A cell range to test. This argument can be a range or a range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISFORMULA/
     */
    ISFORMULA(arg1: ApiRange | ApiName): boolean;

    /**
     * Checks whether a value is a logical value (**true** or **false**), and returns **true** or
     * **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISLOGICAL/
     */
    ISLOGICAL(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Checks whether a value is *#N/A*, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISNA/
     */
    ISNA(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Checks whether a value is not text (blank cells are not text), and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISNONTEXT/
     */
    ISNONTEXT(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Checks whether a value is a number, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISNUMBER/
     */
    ISNUMBER(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Returns **true** if a number is odd.
     *
     * @param arg1 - The value to test.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISODD/
     */
    ISODD(arg1: ApiRange | ApiName | number): boolean;

    /**
     * Returns the ISO week number in the year for a given date.
     *
     * @param arg1 - The date-time code used for date and time calculation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISOWEEKNUM/
     */
    ISOWEEKNUM(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a number that is rounded up to the nearest integer or to the nearest multiple of
     * significance regardless of the sign of the number.
     * The number is always rounded up regardless of its sing.
     *
     * @param arg1 - The numeric value to round up.
     * @param arg2 - The multiple of significance to round up to. If it is omitted, the default value of 1 is used.
     *   If it is set to zero, the function returns 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISO_CEILING/
     */
    ISO_CEILING(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the interest paid during a specific period of an investment.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The period for which the interest will be retuned. It must be in the range from 1 to the total
     *   number of payments.
     * @param arg3 - The total number of payment periods in an investment.
     * @param arg4 - The present value, or the lump-sum amount that a series of future payments is worth now.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISPMT/
     */
    ISPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;

    /**
     * Checks whether a value is a reference, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISREF/
     */
    ISREF(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Checks whether a value is text, and returns **true** or **false**.
     *
     * @param arg1 - The value to test. The value can be an empty cell, error, logical value, text, number, range, or
     *   range name.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ISTEXT/
     */
    ISTEXT(arg1: ApiRange | string | number | boolean | ApiName): boolean;

    /**
     * Returns the kurtosis of a data set.
     *
     * @param args - Up to 255 numeric values for which the kurtosis will be calculated. Arguments can be numbers,
     *   names, ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/KURT/
     */
    KURT(args: ApiRange | number[] | ApiName): number;

    /**
     * Returns the k-th largest value in a data set. For example, the fifth largest number.
     *
     * @param arg1 - The array or range of data for which the k-th largest value will be determined.
     * @param arg2 - The position (from the largest) in the array or cell range of data to return.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LARGE/
     */
    LARGE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the least common multiple.
     *
     * @param args - Up to 255 numeric values for which the least common multiple will be returned. The first
     *   argument is required, subsequent arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LCM/
     */
    LCM(args: ApiRange | ApiName | number): number;

    /**
     * Returns the specified number of characters from the start of a text string.
     *
     * @param arg1 - The text string containing the characters to extract.
     * @param arg2 - A number of the substring characters. It must be greater than or equal to 0.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LEFT/
     */
    LEFT(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;

    /**
     * Extracts the substring from the specified string starting from the left character and is intended
     * for languages that use the double-byte character set (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text string containing the characters to extract.
     * @param arg2 - A number of the substring characters, based on bytes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LEFTB/
     */
    LEFTB(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;

    /**
     * Returns the number of characters in a text string.
     *
     * @param arg1 - The text whose length will be returned. Spaces are considered as characters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LEN/
     */
    LEN(arg1: ApiRange | ApiName | string): number;

    /**
     * Analyses the specified string and returns the number of characters it contains and is intended for
     * languages that use the double-byte character set (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text whose length will be returned. Spaces are considered as characters.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LENB/
     */
    LENB(arg1: ApiRange | ApiName | string): number;

    /**
     * Returns statistics that describe a linear trend matching known data points, by fitting a straight
     * line using the least squares method.
     *
     * @param arg1 - The set of y-values from the *y = mx + b* equation.
     * @param arg2 - An optional set of x-values from the *y = mx + b* equation.
     * @param arg3 - A logical value: the constant *b* is calculated normally if this parameter is set to **true** or
     *   omitted, and *b* is set equal to 0 if the parameter is **false**.
     * @param arg4 - A logical value: return additional regression statistics if this parameter is set to **true**,
     *   and return m-coefficients and the constant *b* if the parameter is **false** or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LINEST/
     */
    LINEST(arg1: ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the natural logarithm of a number.
     *
     * @param arg1 - The positive real number for which the natural logarithm will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LN/
     */
    LN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the logarithm of a number to the specified base.
     *
     * @param arg1 - The positive real number for which the logarithm will be returned.
     * @param arg2 - The logarithm base. If omitted, it is equal to 10.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOG/
     */
    LOG(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the base-10 logarithm of a number.
     *
     * @param arg1 - The positive real number for which the base-10 logarithm will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOG10/
     */
    LOG10(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns statistics that describe an exponential curve matching known data points.
     *
     * @param arg1 - The set of y-values from the *y = b*m^x* equation.
     * @param arg2 - An optional set of x-values from the *y = b*m^x* equation.
     * @param arg3 - A logical value: the constant *b* is calculated normally if this parameter is set to **true** or
     *   omitted, and *b* is set equal to 1 if the parameter is **false**.
     * @param arg4 - A logical value: return additional regression statistics if this parameter is set to **true**,
     *   and return m-coefficients and the constant *b* if the parameter is **false** or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOGEST/
     */
    LOGEST(arg1: ApiRange | ApiName | ApiRange, arg2?: ApiRange | ApiName | ApiRange, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the lognormal cumulative distribution function of x, where ln(x) is normally
     * distributed with the specified parameters.
     *
     * @param arg1 - A probability associated with the lognormal distribution, a number between 0 and 1, inclusive.
     * @param arg2 - The mean of ln(x).
     * @param arg3 - The standard deviation of ln(x), a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOGINV/
     */
    LOGINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the cumulative lognormal distribution of x, where ln(x) is normally distributed with the
     * specified parameters.
     *
     * @param arg1 - The value at which to evaluate the function, a positive number.
     * @param arg2 - The mean of ln(x).
     * @param arg3 - The standard deviation of ln(x), a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOGNORMDIST/
     */
    LOGNORMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the lognormal distribution of x, where ln(x) is normally distributed with the specified
     * parameters.
     *
     * @param arg1 - The value at which to evaluate the function, a positive number.
     * @param arg2 - The mean of ln(x).
     * @param arg3 - The standard deviation of ln(x), a positive number.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOGNORM_DIST/
     */
    LOGNORM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the lognormal cumulative distribution function of x, where ln(x) is normally
     * distributed with the specified parameters.
     *
     * @param arg1 - A probability associated with the lognormal distribution, a number between 0 and 1, inclusive.
     * @param arg2 - The mean of ln(x).
     * @param arg3 - The standard deviation of ln(x), a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOGNORM_INV/
     */
    LOGNORM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Looks up a value either from a one-row or one-column range. Provided for backwards compatibility.
     *
     * @param arg1 - A value that is searched for in the first vector. It can be a number, text, a logical value, or
     *   a name or reference to a value.
     * @param arg2 - A range that contains only one row or one column of text, numbers, or logical values, placed in
     *   ascending order.
     * @param arg3 - A range that contains only one row or column. It must be the same size as the first vector.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOOKUP/
     */
    LOOKUP(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName): number | string | boolean;

    /**
     * Converts all letters in a text string to lowercase.
     *
     * @param arg1 - The text to convert to lowercase. The text characters that are not letters are not changed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/LOWER/
     */
    LOWER(arg1: ApiRange | ApiName | string): string;

    /**
     * Returns the relative position of an item in a range that matches the specified value in the
     * specified order.
     *
     * @param arg1 - The value to be matched in the range. It can be a number, text, or logical value, or a reference
     *   to one of these.
     * @param arg2 - A contiguous range of cells or an array containing possible lookup values.
     * @param arg3 - A number 1, 0, or -1 indicating which value to return.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MATCH/
     */
    MATCH(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName | (number | string | boolean)[], arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the largest value in a set of values. Ignores logical values and text.
     *
     * @param args - Up to 255 numeric values for which the largest number will be returned. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MAX/
     */
    MAX(args: number | number[] | ApiRange | ApiName): number;

    /**
     * Returns the largest value in a set of values. Does not ignore logical values and text.
     *
     * @param args - Up to 255 values (number, text, logical value) for which the largest value will be returned. The
     *   first argument is required, subsequent arguments are optional. Arguments can be numbers, logical
     *   values and text representations of numbers, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MAXA/
     */
    MAXA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;

    /**
     * Returns the modified Macauley duration of a security with an assumed par value of $100.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The annual coupon rate of the security.
     * @param arg4 - The annual yield of the security.
     * @param arg5 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MDURATION/
     */
    MDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the median, or the number in the middle of the set of given numbers.
     *
     * @param args - Up to 255 numeric values for which the median will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MEDIAN/
     */
    MEDIAN(args: number | number[] | ApiRange | ApiName): number;

    /**
     * Returns the characters from the middle of a text string, given a starting position and length.
     *
     * @param arg1 - The text string from which to extract the characters.
     * @param arg2 - The position of the first character to extract. The first text character is 1.
     * @param arg3 - A number of the characters to extract.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MID/
     */
    MID(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;

    /**
     * Extracts the characters from the specified string starting from any position and is intended for
     * languages that use the double-byte character set (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text string from which to extract the characters.
     * @param arg2 - The position of the first character to extract. The first text character is 1.
     * @param arg3 - A number of the characters to extract, based on bytes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MIDB/
     */
    MIDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;

    /**
     * Returns the smallest number in a set of values. Ignores logical values and text.
     *
     * @param args - Up to 255 numeric values for which the smallest number will be returned. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MIN/
     */
    MIN(args: number | number[] | ApiRange | ApiName): number;

    /**
     * Returns the smallest value in a set of values. Does not ignore logical values and text.
     *
     * @param args - Up to 255 values (number, text, logical value) for which the smallest value will be returned.
     *   The first argument is required, subsequent arguments are optional. Arguments can be numbers,
     *   logical values and text representations of numbers, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MINA/
     */
    MINA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;

    /**
     * Returns the minute, a number from 0 to 59.
     *
     * @param arg1 - A number in the date-time code, or text in the time format, such as "16:48:00" or "4:48:00 PM",
     *   or a result of other formulas or functions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MINUTE/
     */
    MINUTE(arg1: ApiRange | ApiName | number | string): number;

    /**
     * Returns the internal rate of return for a series of periodic cash flows, considering both cost of
     * investment and interest on reinvestment of cash.
     *
     * @param arg1 - A range or array of cells that contain numbers that represent a series of payments (negative)
     *   and income (positive) at regular periods.
     * @param arg2 - The interest rate paid on the money used in the cash flows.
     * @param arg3 - The interest rate received on the cash reinvestment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MIRR/
     */
    MIRR(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the remainder after a number is divided by a divisor.
     *
     * @param arg1 - The number to divide and find the remainder.
     * @param arg2 - The number to divide by.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MOD/
     */
    MOD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the month, a number from 1 (January) to 12 (December).
     *
     * @param arg1_ - A number in the date-time code.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MONTH/
     */
    MONTH(arg1_: ApiRange | ApiName | number): number;

    /**
     * Returns a number rounded to the desired multiple.
     *
     * @param arg1 - The value to round.
     * @param arg2 - The multiple to round the number to.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MROUND/
     */
    MROUND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the ratio of the factorial of a sum of numbers to the product of factorials.
     *
     * @param args - Up to 255 numeric values for which the multinomial will be returned. The first argument is
     *   required, subsequent arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MULTINOMIAL/
     */
    MULTINOMIAL(args: ApiRange | ApiName | number): number;

    /**
     * Returns the unit matrix for the specified dimension.
     *
     * @param arg1 - An integer specifying the dimension of the unit matrix to be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/MUNIT/
     */
    MUNIT(arg1: ApiRange | ApiName | number): number;

    /**
     * Converts a value to a number, dates to serial numbers, **true** to 1, error to
     * {@link global#ErrorValue ErrorValue}, anything else to 0 (zero).
     *
     * @param arg1 - The value to be converted. The value can be a logical value, text, or number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/N/
     */
    N(arg1: ApiRange | ApiName | number | string | boolean): number;

    /**
     * Returns the *#N/A* error value which means "no value is available".
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NA/
     */
    NA(): string;

    /**
     * Returns the negative binomial distribution, the probability that there will be the specified number
     * of failures before the last success, with the specified probability of a success.
     *
     * @param arg1 - The number of failures.
     * @param arg2 - The threshold number of successes.
     * @param arg3 - The probability of a success; a number between 0 and 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NEGBINOMDIST/
     */
    NEGBINOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the negative binomial distribution, the probability that there will be the specified number
     * of failures before the last success, with the specified probability of a success.
     *
     * @param arg1 - The number of failures.
     * @param arg2 - The threshold number of successes.
     * @param arg3 - The probability of a success; a number between 0 and 1.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NEGBINOM_DIST/
     */
    NEGBINOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the number of whole workdays between two dates.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - A serial date number that represents the end date.
     * @param arg3 - An optional range or array of one or more serial date numbers to exclude from the working
     *   calendar, such as state and federal holidays and floating holidays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NETWORKDAYS/
     */
    NETWORKDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | number[]): number;

    /**
     * Returns the number of whole workdays between two dates with custom weekend parameters.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - A serial date number that represents the end date.
     * @param arg3 - A number or string specifying when weekends occur.
     * @param arg4 - An optional range or array of one or more serial date numbers to exclude from the working
     *   calendar, such as state and federal holidays and floating holidays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NETWORKDAYS_INTL/
     */
    NETWORKDAYS_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | number[]): number;

    /**
     * Returns the annual nominal interest rate.
     *
     * @param arg1 - The effective interest rate of the security.
     * @param arg2 - The number of compounding periods per year.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NOMINAL/
     */
    NOMINAL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the normal cumulative distribution for the specified mean and standard deviation.
     *
     * @param arg1 - The value for which the distribution will be returned.
     * @param arg2 - The arithmetic mean of the distribution.
     * @param arg3 - The standard deviation of the distribution, a positive number.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORMDIST/
     */
    NORMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the normal cumulative distribution for the specified mean and standard
     * deviation.
     *
     * @param arg1 - A probability corresponding to the normal distribution, a number between 0 and 1 inclusive.
     * @param arg2 - The arithmetic mean of the distribution.
     * @param arg3 - The standard deviation of the distribution, a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORMINV/
     */
    NORMINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the standard normal cumulative distribution (has a mean of zero and a standard deviation of
     * one).
     *
     * @param arg1 - The value for which the distribution will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORMSDIST/
     */
    NORMSDIST(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the inverse of the standard normal cumulative distribution (has a mean of zero and a
     * standard deviation of one).
     *
     * @param arg1 - A probability corresponding to the normal distribution, a number between 0 and 1 inclusive.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORMSINV/
     */
    NORMSINV(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the normal distribution for the specified mean and standard deviation.
     *
     * @param arg1 - The value for which the distribution will be returned.
     * @param arg2 - The arithmetic mean of the distribution.
     * @param arg3 - The standard deviation of the distribution, a positive number.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORM_DIST/
     */
    NORM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the normal cumulative distribution for the specified mean and standard
     * deviation.
     *
     * @param arg1 - A probability corresponding to the normal distribution, a number between 0 and 1 inclusive.
     * @param arg2 - The arithmetic mean of the distribution.
     * @param arg3 - The standard deviation of the distribution, a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORM_INV/
     */
    NORM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the standard normal distribution (has a mean of zero and a standard deviation of one).
     *
     * @param arg1 - The value for which the distribution will be returned.
     * @param arg2 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORM_S_DIST/
     */
    NORM_S_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | boolean): number;

    /**
     * Returns the inverse of the standard normal cumulative distribution (has a mean of zero and a
     * standard deviation of one).
     *
     * @param arg1 - A probability corresponding to the normal distribution, a number between 0 and 1 inclusive.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NORM_S_INV/
     */
    NORM_S_INV(arg1: ApiRange | ApiName | number): number;

    /**
     * Checks if the specified logical value is **true** or **false**. The function returns **true** if the
     * argument is **false** and **false** if the argument is **true**.
     *
     * @param arg1 - A value or expression that can be evaluated to **true** or **false**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NOT/
     */
    NOT(arg1: ApiRange | ApiName | number | string | boolean): boolean;

    /**
     * Returns the current date and time in the *MM/dd/yy hh:mm* format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NOW/
     */
    NOW(): number;

    /**
     * Returns the number of periods for an investment based on periodic, constant payments and a constant
     * interest rate.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The payment made each period; it cannot change over the life of the investment.
     * @param arg3 - Te present value, or the lump-sum amount that a series of future payments is worth now.
     * @param arg4 - The future value, or a cash balance which will be attained after the last payment is made. If
     *   omitted, zero is used.
     * @param arg5 - A logical value: payment at the beginning of the period = 1; payment at the end of the period =
     *   0 or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NPER/
     */
    NPER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the net present value of an investment based on a discount rate and a series of future
     * payments (negative values) and income (positive values).
     *
     * @param arg1 - The discount rate.
     * @param args - Up to 255 arguments representing future payments (negative values) and income (positive values).
     *   The first argument is required, the subsequent values are optional. Arguments can be numbers,
     *   ranges, arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NPV/
     */
    NPV(arg1: ApiRange | ApiName | number, args: number | ApiRange | number[]): number;

    /**
     * Converts text to a number, in a locale-independent way.
     *
     * @param arg1 - The string representing a number to convert.
     * @param arg2 - The character used as the decimal separator in the string.
     * @param arg3 - The character used as the group separator in the string.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/NUMBERVALUE/
     */
    NUMBERVALUE(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | string): number;

    /**
     * Converts an octal number to binary.
     *
     * @param arg1 - The octal number to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/OCT2BIN/
     */
    OCT2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Converts an octal number to decimal.
     *
     * @param arg1 - The octal number to convert.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/OCT2DEC/
     */
    OCT2DEC(arg1: ApiRange | ApiName | number): number;

    /**
     * Converts an octal number to hexadecimal.
     *
     * @param arg1 - The octal number to convert.
     * @param arg2 - The number of characters to use.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/OCT2HEX/
     */
    OCT2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Rounds a positive number up and negative number down to the nearest odd integer.
     *
     * @param arg1 - The value to round.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ODD/
     */
    ODD(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value of a security with an odd first period.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The issue date of the security, expressed as a serial date number.
     * @param arg4 - The first coupon date of the security, expressed as a serial date number.
     * @param arg5 - The interest rate of the security.
     * @param arg6 - The annual yield of the security.
     * @param arg7 - The redemption value of the security, per $100 face value.
     * @param arg8 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg9 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ODDFPRICE/
     */
    ODDFPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;

    /**
     * Returns the yield of a security with an odd first period.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The issue date of the security, expressed as a serial date number.
     * @param arg4 - The first coupon date of the security, expressed as a serial date number.
     * @param arg5 - The interest rate of the security.
     * @param arg6 - The purchase price of the security, per $100 par value.
     * @param arg7 - The redemption value of the security, per $100 par value.
     * @param arg8 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg9 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ODDFYIELD/
     */
    ODDFYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value of a security with an odd last period.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The last coupon date of the security, expressed as a serial date number.
     * @param arg5 - The interest rate of the security.
     * @param arg5_2 - The annual yield of the security.
     * @param arg6 - The redemption value of the security, per $100 par value.
     * @param arg8 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg9 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ODDLPRICE/
     */
    ODDLPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg5_2: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;

    /**
     * Returns the yield of a security with an odd last period.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The last coupon date of the security, expressed as a serial date number.
     * @param arg5 - The interest rate of the security.
     * @param arg6 - The purchase price of the security, per $100 par value.
     * @param arg6_2 - The redemption value of the security, per $100 par value.
     * @param arg8 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg9 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ODDLYIELD/
     */
    ODDLYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg6_2: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;

    /**
     * Checks whether any of the arguments are **true**. Returns **false** only if all arguments are
     * **false**.
     *
     * @param args - A condition to check.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/OR/
     */
    OR(args: number | string | ApiRange | ApiName | boolean): boolean;

    /**
     * Returns the number of periods required by an investment to reach a specified value.
     *
     * @param arg1 - The interest rate per period.
     * @param arg2 - The present value of the investment.
     * @param arg3 - The desired future value of the investment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PDURATION/
     */
    PDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the k-th percentile of values in a range.
     *
     * @param arg1 - The array or range of data that defines relative standing.
     * @param arg2 - The percentile value that is equal to 0 but less than or equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTILE/
     */
    PERCENTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the k-th percentile of values in a range, where k is in the range 0..1, exclusive.
     *
     * @param arg1 - The array or range of data that defines relative standing.
     * @param arg2 - The percentile value that is greater than 0 but less than 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTILE_EXC/
     */
    PERCENTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the k-th percentile of values in a range, where k is in the range 0..1, inclusive.
     *
     * @param arg1 - The array or range of data that defines relative standing.
     * @param arg2 - The percentile value that is equal to 0 but less than or equal to 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTILE_INC/
     */
    PERCENTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the rank of a value in a data set as a percentage of the data set.
     *
     * @param arg1 - The array or range of data with numeric values that defines relative standing.
     * @param arg2 - The value for which the rank will be returned.
     * @param arg3 - An optional value that identifies the number of significant digits for the returned percentage,
     *   three digits if omitted (0.xxx%).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTRANK/
     */
    PERCENTRANK(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the rank of a value in a data set as a percentage (0..1, exclusive) of the data set.
     *
     * @param arg1 - The array or range of data with numeric values that defines relative standing.
     * @param arg2 - The value for which the rank will be returned.
     * @param arg3 - An optional value that identifies the number of significant digits for the returned percentage,
     *   three digits if omitted (0.xxx%).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTRANK_EXC/
     */
    PERCENTRANK_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the rank of a value in a data set as a percentage (0..1, inclusive) of the data set.
     *
     * @param arg1 - The array or range of data with numeric values that defines relative standing.
     * @param arg2 - The value for which the rank will be returned.
     * @param arg3 - An optional value that identifies the number of significant digits for the returned percentage,
     *   three digits if omitted (0.xxx%).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERCENTRANK_INC/
     */
    PERCENTRANK_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the number of permutations for a given number of objects that can be selected from the total
     * objects.
     *
     * @param arg1 - The total number of objects.
     * @param arg2 - The number of objects in each permutation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERMUT/
     */
    PERMUT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the number of permutations for a given number of objects (with repetitions) that can be
     * selected from the total objects.
     *
     * @param arg1 - The total number of objects.
     * @param arg2 - The number of objects in each permutation.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PERMUTATIONA/
     */
    PERMUTATIONA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the value of the density function for a standard normal distribution.
     *
     * @param arg1 - The number for which the density of the standard normal distribution will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PHI/
     */
    PHI(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the mathematical constant **pi**, equal to **3.14159265358979**, accurate to 15 digits.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PI/
     */
    PI(): number;

    /**
     * Calculates the payment for a loan based on constant payments and a constant interest rate.
     *
     * @param arg1 - The interest rate per period for the loan. For example, use 6%/4 for quarterly payments at 6%
     *   APR.
     * @param arg2 - The total number of payments for the loan.
     * @param arg3 - The present value: the total amount that a series of future payments is worth now.
     * @param arg4 - The future value, or a cash balance which will be attained after the last payment is made. If
     *   omitted, it is equal to 0.
     * @param arg5 - A logical value: payment at the beginning of the period = 1; payment at the end of the period =
     *   0 or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PMT/
     */
    PMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the Poisson distribution.
     *
     * @param arg1 - The number of events.
     * @param arg2 - The expected numeric value, a positive number.
     * @param arg3 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative Poisson probability. If it is **false**, the function
     *   returns the Poisson probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/POISSON/
     */
    POISSON(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the Poisson distribution.
     *
     * @param arg1 - The number of events.
     * @param arg2 - The expected numeric value, a positive number.
     * @param arg3 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative Poisson probability. If it is **false**, the function
     *   returns the Poisson probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/POISSON_DIST/
     */
    POISSON_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the result of a number raised to a power.
     *
     * @param arg1 - The base number. It can be any real number.
     * @param arg2 - The exponent to which the base number is raised.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/POWER/
     */
    POWER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the payment on the principal for a given investment based on periodic, constant payments and
     * a constant interest rate.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The period for which the principal payment will be returned. It must be in the range from 1 to
     *   to the total number of payment periods.
     * @param arg3 - The total number of payment periods in an investment.
     * @param arg4 - The present value: the total amount that a series of future payments is worth now.
     * @param arg5 - The future value, or cash balance which will be attained after the last payment is made.
     * @param arg6 - A logical value: payment at the beginning of the period = 1; payment at the end of the period =
     *   0 or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PPMT/
     */
    PPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value for a security that pays periodic interest.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The annual coupon rate of the security.
     * @param arg4 - The annual yield of the security.
     * @param arg5 - The redemption value of the security, per $100 par value.
     * @param arg6 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg7 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PRICE/
     */
    PRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value for a discounted security.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The discount rate of the security.
     * @param arg4 - The redemption value of the security, per $100 par value.
     * @param arg5 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PRICEDISC/
     */
    PRICEDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value for a security that pays interest at maturity.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The issue date of the security, expressed as a serial date number.
     * @param arg4 - The security interest rate at the issue date.
     * @param arg5 - The annual yield of the security.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PRICEMAT/
     */
    PRICEMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Multiplies all the numbers given as arguments.
     *
     * @param args - Up to 255 numeric values that will be multiplied. The first argument is required, subsequent
     *   arguments are optional. Arguments can be numbers, ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PRODUCT/
     */
    PRODUCT(args: number | ApiRange | number[]): number;

    /**
     * Converts a text string to proper case: the first letter in each word to uppercase, and all other
     * letters to lowercase.
     *
     * @param arg1 - The text enclosed in quotation marks, a formula that returns text, or a reference to a cell
     *   containing text to partially capitalize.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PROPER/
     */
    PROPER(arg1: ApiRange | ApiName | string): string;

    /**
     * Returns the present value of an investment: the total amount that a series of future payments is
     * worth now.
     *
     * @param arg1 - The interest rate per period. For example, use 6%/4 for quarterly payments at 6% APR.
     * @param arg2 - The total number of payment periods in an investment.
     * @param arg3 - The payment made each period and cannot change over the life of the investment.
     * @param arg4 - The future value, or a cash balance which will be attained after the last payment is made. If
     *   omitted, it is equal to 0.
     * @param arg5 - A logical value: payment at the beginning of the period = 1; payment at the end of the period =
     *   0 or omitted.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/PV/
     */
    PV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the quartile of a data set.
     *
     * @param arg1 - The array or cell range of numeric values for which the quartile value will be returned.
     * @param arg2 - The quartile value to return: minimum value = 0; 1st quartile = 1; median value = 2; 3rd
     *   quartile = 3; maximum value = 4.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/QUARTILE/
     */
    QUARTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the quartile of a data set, based on percentile values from 0..1, exclusive.
     *
     * @param arg1 - The array or cell range of numeric values for which the quartile value will be returned.
     * @param arg2 - The quartile value to return: 1st quartile = 1; median value = 2; 3rd quartile = 3.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/QUARTILE_EXC/
     */
    QUARTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the quartile of a data set, based on percentile values from 0..1, inclusive.
     *
     * @param arg1 - The array or cell range of numeric values for which the quartile value will be returned.
     * @param arg2 - The quartile value to return: minimum value = 0; 1st quartile = 1; median value = 2; 3rd
     *   quartile = 3; maximum value = 4.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/QUARTILE_INC/
     */
    QUARTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the integer portion of a division.
     *
     * @param arg1 - The dividend, a numeric value.
     * @param arg2 - The divisor, a numeric value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/QUOTIENT/
     */
    QUOTIENT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Converts degrees to radians.
     *
     * @param arg1 - An angle in degrees to convert.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RADIANS/
     */
    RADIANS(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a random number greater than or equal to 0 and less than 1, evenly distributed (changes on
     * recalculation).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RAND/
     */
    RAND(): number;

    /**
     * Returns a random number between the numbers specified.
     *
     * @param arg1 - The smallest integer value.
     * @param arg2 - The largest integer value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RANDBETWEEN/
     */
    RANDBETWEEN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the rank of a number in a list of numbers: its size relative to other values in the list.
     *
     * @param arg1 - The number for which the rank will be returned.
     * @param arg2 - An array or range of numbers. Nonnumeric values are ignored.
     * @param arg3 - The numeric value that specifyes how to order the numbers. If it is 0 or omitted, the rank in
     *   the list will be sorted in descending order. Any other numeric value means that the rank in the
     *   list will be sorted in ascending order.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RANK/
     */
    RANK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the rank of a number in a list of numbers: its size relative to other values in the list. If
     * more than one value has the same rank, the average rank is returned.
     *
     * @param arg1 - The number for which the rank will be returned.
     * @param arg2 - An array or range of numbers. Nonnumeric values are ignored.
     * @param arg3 - The numeric value that specifyes how to order the numbers. If it is 0 or omitted, the rank in
     *   the list will be sorted in descending order. Any other numeric value means that the rank in the
     *   list will be sorted in ascending order.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RANK_AVG/
     */
    RANK_AVG(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the rank of a number in a list of numbers: its size relative to other values in the list. If
     * more than one value has the same rank, the top rank of that set of values is returned.
     *
     * @param arg1 - The number for which the rank will be returned.
     * @param arg2 - An array or range of numbers. Nonnumeric values are ignored.
     * @param arg3 - The numeric value that specifyes how to order the numbers. If it is 0 or omitted, the rank in
     *   the list will be sorted in descending order. Any other numeric value means that the rank in the
     *   list will be sorted in ascending order.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RANK_EQ/
     */
    RANK_EQ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;

    /**
     * Returns the interest rate per period for a loan or an investment. For example, use 6%/4 for
     * quarterly payments at 6% APR.
     *
     * @param arg1 - The total number of payment periods for the loan or investment.
     * @param arg2 - The payment made each period and cannot change over the life of the loan or investment.
     * @param arg3 - The present value: the total amount that a series of future payments is worth now.
     * @param arg4 - The future value, or a cash balance which will be attained after the last payment is made. If
     *   omitted, it is equal to 0.
     * @param arg5 - A logical value: payment at the beginning of the period = 1; payment at the end of the period =
     *   0 or omitted.
     * @param arg6 - An estimate at what the rate will be. If it is omitted, the function will assume guess to be 0.1
     *   (10 percent).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RATE/
     */
    RATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the amount received at maturity for a fully invested security.
     *
     * @param arg1 - The security settlement date, expressed as a serial date number.
     * @param arg2 - The maturity date of the security, expressed as a serial date number.
     * @param arg3 - The amount invested in the security.
     * @param arg4 - The security discount rate.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RECEIVED/
     */
    RECEIVED(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Replaces part of a text string with a different text string.
     *
     * @param arg1 - The text where some characters will be replaced.
     * @param arg2 - The position of the character in the original text that will be replaced with the new text.
     * @param arg3 - The number of characters in the original text that will be replaced.
     * @param arg4 - The text that will replace characters in the original text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/REPLACE/
     */
    REPLACE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;

    /**
     * Replaces a set of characters, based on the number of characters and the start position specified,
     * with a new set of characters and is intended for languages that use the double-byte character set
     * (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text where some characters will be replaced.
     * @param arg2 - The position of the character in the original text that will be replaced with the new text.
     * @param arg3 - The number of characters in the original text that will be replaced, based on bytes.
     * @param arg4 - The text that will replace characters in the original text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/REPLACEB/
     */
    REPLACEB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;

    /**
     * Repeats text a given number of times. Use this function to fill a cell with a number of instances of
     * a text string.
     *
     * @param arg1 - The text that will be repeated.
     * @param arg2 - A positive number specifying the number of times to repeat text.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/REPT/
     */
    REPT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;

    /**
     * Returns the specified number of characters from the end of a text string.
     *
     * @param arg1 - The text string that contains the characters to extract.
     * @param arg2 - A number of the substring characters. If it is omitted, the function will assume it to be 1.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RIGHT/
     */
    RIGHT(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;

    /**
     * Extracts a substring from a string starting from the right-most character, based on the specified
     * number of characters and is intended for languages that use the double-byte character set (DBCS)
     * like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text string that contains the characters to extract.
     * @param arg2 - A number of the substring characters, based on bytes.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RIGHTB/
     */
    RIGHTB(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;

    /**
     * Converts an arabic numeral to a roman numeral in the string format.
     *
     * @param arg1 - A numeric value greater than or equal to 1 and less than 3999.
     * @param arg2 - A roman numeral type: **0** - classic, **1** - more concise, **2** - more concise, **3** - more
     *   concise, **4** - simplified.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ROMAN/
     */
    ROMAN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): string;

    /**
     * Rounds a number to a specified number of digits.
     *
     * @param arg1 - The number to round.
     * @param arg2 - The number of digits to round to. If this argument is negative, the number will be rounded to
     *   the left of the decimal point. If it is equal to zero, the number will be rounded to the nearest
     *   integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ROUND/
     */
    ROUND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Rounds a number down, toward zero.
     *
     * @param arg1 - Any real number that will be rounded down.
     * @param arg2 - The number of digits to round to. If this argument is negative, the number will be rounded to
     *   the left of the decimal point. If it is equal to zero, the number will be rounded to the nearest
     *   integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ROUNDDOWN/
     */
    ROUNDDOWN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Rounds a number up, away from zero.
     *
     * @param arg1 - Any real number that will be rounded up.
     * @param arg2 - The number of digits to round to. If this argument is negative, the number will be rounded to
     *   the left of the decimal point. If it is equal to zero, the number will be rounded to the nearest
     *   integer.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ROUNDUP/
     */
    ROUNDUP(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the number of rows in a range.
     *
     * @param arg1 - A range of cells or an array for which the number of rows will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ROWS/
     */
    ROWS(arg1: ApiRange | ApiName | (number | string | boolean)[]): number;

    /**
     * Returns an equivalent interest rate for the growth of an investment.
     *
     * @param arg1 - The number of periods for the investment.
     * @param arg2 - The present value of the investment.
     * @param arg3 - The future value of the investment.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/RRI/
     */
    RRI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the number of the character at which a specific character or text string is first found,
     * reading left to right (not case-sensitive).
     *
     * @param arg1 - The text to find. The ? and * wildcard characters can be used. Use ~? and ~* to find the ? and *
     *   characters.
     * @param arg2 - The text where to search for the specified text.
     * @param arg3 - The character number in the search text, counting from the left, at which to start searching. If
     *   omitted, 1 is used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SEARCH/
     */
    SEARCH(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the location of the specified substring in a string and is intended for languages that use
     * the double-byte character set (DBCS) like Japanese, Chinese, Korean etc.
     *
     * @param arg1 - The text to find. The ? and * wildcard characters can be used. Use ~? and ~* to find the ? and *
     *   characters.
     * @param arg2 - The text where to search for the specified text.
     * @param arg3 - The character number in the search text, counting from the left, at which to start searching. If
     *   omitted, 1 is used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SEARCHB/
     */
    SEARCHB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the secant of an angle.
     *
     * @param arg1 - The angle in radians for which the secant will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SEC/
     */
    SEC(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic secant of an angle.
     *
     * @param arg1 - The angle in radians for which the hyperbolic secant will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SECH/
     */
    SECH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the second, a number from 0 to 59.
     *
     * @param arg1 - A number in the date-time code, or text in the time format, such as "16:48:00" or "4:48:00 PM",
     *   or a result of other formulas or functions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SECOND/
     */
    SECOND(arg1: ApiRange | ApiName | number | string): number;

    /**
     * Returns the sum of a power series based on the formula.
     *
     * @param arg1 - The input value to the power series.
     * @param arg2 - The initial power to which x will be raised.
     * @param arg3 - The step by which to increase n for each term in the series.
     * @param arg4 - A set of coefficients by which each successive power of x is multiplied.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SERIESSUM/
     */
    SERIESSUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;

    /**
     * Returns the sheet number of the reference sheet.
     *
     * @param arg1 - The name of a sheet or a reference for which the sheet number will be returned. If omitted the
     *   number of the sheet containing the function is returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SHEET/
     */
    SHEET(arg1?: string | ApiRange | ApiName): number;

    /**
     * Returns the number of sheets in a reference.
     *
     * @param arg1 - A reference for which the number of sheets will be returned. If omitted the number of sheets in
     *   the workbook containing the function is returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SHEETS/
     */
    SHEETS(arg1?: ApiRange | ApiName): number;

    /**
     * Returns the sign of a number: **1** if the number is positive, **0** if the number is zero, or
     * **-1** if the number is negative.
     *
     * @param arg1 - Any real number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SIGN/
     */
    SIGN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the sine of an angle.
     *
     * @param arg1 - The angle in radians for which the sine will be returned. If your argument is in degrees,
     *   multiply it by *PI()/180*.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SIN/
     */
    SIN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic sine of a number.
     *
     * @param arg1 - Any real number for which the hyperbolic sine will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SINH/
     */
    SINH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the skewness of a distribution: a characterization of the degree of asymmetry of a
     * distribution around its mean.
     *
     * @param args - Up to 255 numeric values for which the skewness of a distribution will be returned. The first
     *   argument is required, subsequent arguments are optional. Arguments can be numbers, names,
     *   ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SKEW/
     */
    SKEW(args: number | ApiName | number[] | ApiRange): number;

    /**
     * Returns the skewness of a distribution based on a population: a characterization of the degree of
     * asymmetry of a distribution around its mean.
     *
     * @param args - Up to 255 numeric values for which the skewness of a distribution will be returned. The first
     *   argument is required, subsequent arguments are optional. Arguments can be numbers, names,
     *   ranges, or arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SKEW_P/
     */
    SKEW_P(args: number | ApiName | number[] | ApiRange): number;

    /**
     * Returns the straight-line depreciation of an asset for one period.
     *
     * @param arg1 - The initial cost of the asset.
     * @param arg2 - The salvage value of the asset at the end of its lifetime.
     * @param arg3 - The number of periods over which the asset is being depreciated (sometimes called the useful
     *   life of the asset).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SLN/
     */
    SLN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the k-th smallest value in a data set. For example, the fifth smallest number.
     *
     * @param arg1 - An array or range of numerical data for which the k-th smallest value will be determined.
     * @param arg2 - The position (from the smallest) in the range of the value to return.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SMALL/
     */
    SMALL(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the square root of a number.
     *
     * @param arg1 - The number for which the square root will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SQRT/
     */
    SQRT(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the square root of (number * pi).
     *
     * @param arg1 - The number by which pi is multiplied.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SQRTPI/
     */
    SQRTPI(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns a normalised value from a distribution characterised by a mean and standard deviation.
     *
     * @param arg1 - The value to normalize.
     * @param arg2 - The arithmetic mean of the distribution.
     * @param arg3 - The standard deviation of the distribution, a positive number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STANDARDIZE/
     */
    STANDARDIZE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Estimates standard deviation based on a sample (ignores logical values and text in the sample).
     *
     * @param args - Up to 255 numeric values for which the standard deviation will be calculated. The first argument
     *   is required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or
     *   arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEV/
     */
    STDEV(args: number[] | number | ApiName | ApiRange): number;

    /**
     * Estimates standard deviation based on a sample, including logical values and text. Text and the
     * **false** logical value have the value 0; the **true** logical value has the value 1.
     *
     * @param args - Up to 255 values for which the standard deviation will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, logical values, text
     *   strings, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEVA/
     */
    STDEVA(args: number[] | number | string | boolean | ApiRange | ApiName): number;

    /**
     * Calculates standard deviation based on the entire population given as arguments (ignores logical
     * values and text).
     *
     * @param args - Up to 255 numeric values for which the standard deviation will be calculated. The first argument
     *   is required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or
     *   arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEVP/
     */
    STDEVP(args: number[] | number | ApiName | ApiRange): number;

    /**
     * Calculates standard deviation based on the entire population, including logical values and text.
     * Text and the **false** logical value have the value 0; the **true** logical value has the value 1.
     *
     * @param args - Up to 255 values for which the standard deviation will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, logical values, text
     *   strings, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEVPA/
     */
    STDEVPA(args: number[] | number | string | boolean | ApiRange | ApiName): number;

    /**
     * Calculates standard deviation based on the entire population given as arguments (ignores logical
     * values and text).
     *
     * @param args - Up to 255 numeric values for which the standard deviation will be calculated. The first argument
     *   is required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or
     *   arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEV_P/
     */
    STDEV_P(args: number[] | number | ApiName | ApiRange): number;

    /**
     * Estimates standard deviation based on a sample (ignores logical values and text in the sample).
     *
     * @param args - Up to 255 numeric values for which the standard deviation will be calculated. The first argument
     *   is required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or
     *   arrays of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/STDEV_S/
     */
    STDEV_S(args: number[] | number | ApiName | ApiRange): number;

    /**
     * Replaces existing text with new text in a text string.
     *
     * @param arg1 - The text or the reference to a cell containing text in which the characters will be substituted.
     * @param arg2 - The existing text to replace. If the case of the original text does not match the case of text,
     *   the function will not replace the text.
     * @param arg3 - The text to replace the original text with.
     * @param arg4 - Specifies which occurrence of the original text to replace. If omitted, every instance of the
     *   original text will be replaced.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUBSTITUTE/
     */
    SUBSTITUTE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string, arg4?: ApiRange | ApiName | string): string;

    /**
     * Returns a subtotal in a list or database.
     *
     * @param arg1 - A numeric value that specifies which function to use for the subtotal: **1 (101)** - AVERAGE,
     *   **2 (102)** - COUNT, **3 (103)** - COUNTA, **4 (104)** - MAX, **5 (105)** - MIN, **6 (106)** -
     *   PRODUCT, **7 (107)** - STDEV, **8 (108)** - STDEVP, **9 (109)** - SUM, **10 (110)** - VAR, **11
     *   (111)** - VARP. 1-11 includes manually-hidden rows, while 101-111 excludes them; filtered-out
     *   cells are always excluded.
     * @param args - Up to 255 ranges containing the values for which the subtotal will be returned. The first
     *   argument is required, subsequent arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUBTOTAL/
     */
    SUBTOTAL(arg1: ApiRange | ApiName | number, args: ApiRange | ApiName): number;

    /**
     * Adds all the numbers in a range of cells.
     *
     * @param args - Up to 255 numeric values to add. The first argument is required, subsequent arguments are
     *   optional. Arguments can be numbers, logical values, text representations of numbers, ranges, or
     *   arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUM/
     */
    SUM(args: ApiRange | ApiName | string | number | boolean | (string | number | boolean)[]): number;

    /**
     * Adds the cells specified by a given condition or criteria.
     *
     * @param arg1 - The range of cells to be evaluated.
     * @param arg2 - The condition or criteria in the form of a number, expression, or text that defines which cells
     *   will be added.
     * @param arg3 - The range to sum. If omitted, the cells in range are used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUMIF/
     */
    SUMIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;

    /**
     * Adds the cells specified by a given set of conditions or criteria.
     *
     * @param arg1 - The range of cells to be evaluated.
     * @param arg2 - The first condition or criteria in the form of a number, expression, or text that defines which
     *   cells will be added.
     * @param arg3 - The first range to sum. If omitted, the cells in range are used.
     * @param arg4 - Up to 127 additional conditions or criteria in the form of a number, expression, or text that
     *   defines which cells will be added. These arguments are optional.
     * @param arg5 - Up to 127 actual ranges to be used to be added. If omitted, the cells in the range are used.
     *   These arguments are optional.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUMIFS/
     */
    SUMIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg4: ApiRange | ApiName | number | string): number;
    SUMIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;

    /**
     * Returns the sum of the squares of the arguments.
     *
     * @param args - Up to 255 numeric values for which the sum of the squares will be calculated. The first argument
     *   is required, subsequent arguments are optional. The arguments can be numbers, names, logical
     *   values or text representations of numbers, ranges of cells that contain numbers, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SUMSQ/
     */
    SUMSQ(args: ApiRange | ApiName | number | string | boolean | (number | string | boolean)[]): number;

    /**
     * Returns the sum-of-years' digits depreciation of an asset for a specified period.
     *
     * @param arg1 - The initial cost of the asset.
     * @param arg2 - The salvage value of the asset at the end of its lifetime.
     * @param arg3 - The number of periods over which the asset is being depreciated (sometimes called the useful
     *   life of the asset).
     * @param arg4 - The period for which the depreciation will be calculated. It must use the same units as the
     *   useful life of the asset.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/SYD/
     */
    SYD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;

    /**
     * Checks whether a value is text, and returns the text if it is, or returns double quotes (empty text)
     * if it is not.
     *
     * @param arg1 - The value to test.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T/
     */
    T(arg1: ApiRange | ApiName | number | string | boolean): ApiRange | ApiName | string;

    /**
     * Returns the tangent of an angle.
     *
     * @param arg1 - The angle in radians for which the tangent will be returned. If the argument is in degrees,
     *   multiply it by *PI()/180*.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TAN/
     */
    TAN(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the hyperbolic tangent of a number.
     *
     * @param arg1 - Any real number for which the hyperbolic tangent will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TANH/
     */
    TANH(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the bond-equivalent yield for a treasury bill.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The discount rate of the Treasury bill.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TBILLEQ/
     */
    TBILLEQ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the price per $100 face value for a Treasury bill.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The discount rate of the Treasury bill.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TBILLPRICE/
     */
    TBILLPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the yield for a Treasury bill.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The purchase price of the Treasury bill, per $100 par value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TBILLYIELD/
     */
    TBILLYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Returns the Student's t-distribution.
     *
     * @param arg1 - The numeric value at which to evaluate the distribution.
     * @param arg2 - An integer indicating the number of degrees of freedom that characterize the distribution.
     * @param arg3 - Specifies the number of distribution tails to return: one-tailed distribution = 1; two-tailed
     *   distribution = 2.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TDIST/
     */
    TDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Converts a value to text in a specific number format.
     *
     * @param arg1 - A number, a formula that evaluates to a numeric value, or a reference to a cell containing a
     *   numeric value.
     * @param arg2 - A number format in the text form from the **Number format** combo box on the **Home** tab.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TEXT/
     */
    TEXT(arg1: ApiRange | ApiName | number | string, arg2: ApiRange | ApiName | string): string;

    /**
     * Converts hours, minutes and seconds given as numbers to a serial number, formatted with the time
     * format.
     *
     * @param arg1 - A number from 0 to 23 representing the hour.
     * @param arg2 - A number from 0 to 59 representing the minute.
     * @param arg3 - A number from 0 to 59 representing the second.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TIME/
     */
    TIME(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;

    /**
     * Converts a text time to a serial number for a time, a number from 0 (12:00:00 AM) to 0.999988426
     * (11:59:59 PM). Format the number with a time format after entering the formula.
     *
     * @param arg1 - A text string that represents a time in one of the time formats (date information in the string
     *   is ignored).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TIMEVALUE/
     */
    TIMEVALUE(arg1: ApiRange | ApiName | string): number;

    /**
     * Returns the two-tailed inverse of the Student's t-distribution.
     *
     * @param arg1 - The probability associated with the two-tailed Student's t-distribution, a number between 0 and
     *   1 inclusive.
     * @param arg2 - A positive integer indicating the number of degrees of freedom to characterize the distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TINV/
     */
    TINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the current date in the *MM/dd/yy* format.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TODAY/
     */
    TODAY(): number;

    /**
     * Converts a vertical range of cells to a horizontal range, or vice versa.
     *
     * @param arg1 - A range of cells on a worksheet or an array that will be transposed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TRANSPOSE/
     */
    TRANSPOSE(arg1: ApiRange | ApiName | (number | string | boolean)[]): ApiRange;

    /**
     * Returns numbers in a linear trend matching known data points, using the least squares method.
     *
     * @param arg1 - A range or array of y-values from the *y = mx + b* equation.
     * @param arg2 - An optional range or array of x-values from the *y = mx + b* equation, an array of the same size
     *   as an array of y-values.
     * @param arg3 - A range or array of new x-values for which this function will return corresponding y-values.
     * @param arg4 - A logical value: the constant *b* is calculated normally if this parameter is set to **true** or
     *   omitted, and *b* is set equal to 0 if the parameter is **false**.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TREND/
     */
    TREND(arg1: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;

    /**
     * Removes all spaces from a text string except for single spaces between words.
     *
     * @param arg1 - The text from which the spaces will be removed.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TRIM/
     */
    TRIM(arg1: ApiRange | ApiName | string): string;

    /**
     * Returns the mean of the interior portion of a set of data values.
     *
     * @param arg1 - The array or range of values to trim and average.
     * @param arg2 - The fractional number of data points to exclude from the top and bottom of the data set.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TRIMMEAN/
     */
    TRIMMEAN(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the **true** logical value.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TRUE/
     */
    TRUE(): boolean;

    /**
     * Truncates a number to an integer by removing the decimal, or fractional, part of the number.
     *
     * @param arg1 - The number which will be truncated.
     * @param arg2 - A number specifying the precision of the truncation. If this argument is omitted, it is equal to
     *   0 (zero).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TRUNC/
     */
    TRUNC(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns an integer representing the data type of a value: number = 1; text = 2; logical value = 4;
     * error value = 16; array = 64; compound data = 128.
     *
     * @param arg1 - A value to test.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/TYPE/
     */
    TYPE(arg1: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;

    /**
     * Returns the left-tailed Student's t-distribution.
     *
     * @param arg1 - The numeric value at which to evaluate the distribution.
     * @param arg2 - An integer indicating the number of degrees of freedom that characterize the distribution.
     * @param arg3 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability density function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T_DIST/
     */
    T_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;

    /**
     * Returns the two-tailed Student's t-distribution.
     *
     * @param arg1 - The numeric value at which to evaluate the distribution.
     * @param arg2 - An integer indicating the number of degrees of freedom that characterize the distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T_DIST_2T/
     */
    T_DIST_2T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the right-tailed Student's t-distribution.
     *
     * @param arg1 - The numeric value at which to evaluate the distribution.
     * @param arg2 - An integer indicating the number of degrees of freedom that characterize the distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T_DIST_RT/
     */
    T_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the left-tailed inverse of the Student's t-distribution.
     *
     * @param arg1 - The probability associated with the two-tailed Student's t-distribution, a number between 0 and
     *   1 inclusive.
     * @param arg2 - A positive integer indicating the number of degrees of freedom to characterize the distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T_INV/
     */
    T_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the two-tailed inverse of the Student's t-distribution.
     *
     * @param arg1 - The probability associated with the two-tailed Student's t-distribution, a number between 0 and
     *   1 inclusive.
     * @param arg2 - A positive integer indicating the number of degrees of freedom to characterize the distribution.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/T_INV_2T/
     */
    T_INV_2T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;

    /**
     * Returns the Unicode character referenced by the given numeric value.
     *
     * @param arg1 - The Unicode number representing a character.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/UNICHAR/
     */
    UNICHAR(arg1: ApiRange | ApiName | number): string;

    /**
     * Returns the number (code point) corresponding to the first character of the text.
     *
     * @param arg1 - The character for which the Unicode value will be returned.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/UNICODE/
     */
    UNICODE(arg1: ApiRange | ApiName | string): number;

    /**
     * Converts a text string to all uppercase letters.
     *
     * @param arg1 - The text which will be converted to uppercase, a reference or a text string.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/UPPER/
     */
    UPPER(arg1: ApiRange | ApiName | string): string;

    /**
     * Converts a text string that represents a number to a number.
     *
     * @param arg1 - The text enclosed in quotation marks or a reference to a cell containing the text which will be
     *   converted to a number.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VALUE/
     */
    VALUE(arg1: ApiRange | ApiName | string): number;

    /**
     * Estimates variance based on a sample (ignores logical values and text in the sample).
     *
     * @param args - Up to 255 numeric values for which the variance will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VAR/
     */
    VAR(args: number | ApiName | ApiRange | number[]): number;

    /**
     * Estimates variance based on a sample, including logical values and text. Text and the **false**
     * logical value have the value 0; the **true** logical value has the value 1.
     *
     * @param args - Up to 255 values for which the variance will be calculated. The first argument is required,
     *   subsequent arguments are optional. Arguments can be numbers, logical values or text
     *   representations of numbers, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VARA/
     */
    VARA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;

    /**
     * Calculates variance based on the entire population (ignores logical values and text in the
     * population).
     *
     * @param args - Up to 255 numeric values for which the variance will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VARP/
     */
    VARP(args: number | ApiName | ApiRange | number[]): number;

    /**
     * Calculates variance based on the entire population, including logical values and text. Text and the
     * **false** logical value have the value 0; the **true** logical value has the value 1.
     *
     * @param args - Up to 255 values for which the variance will be calculated. The first argument is required,
     *   subsequent arguments are optional. Arguments can be numbers, logical values or text
     *   representations of numbers, names, ranges, or arrays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VARPA/
     */
    VARPA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;

    /**
     * Calculates variance based on the entire population (ignores logical values and text in the
     * population).
     *
     * @param args - Up to 255 numeric values for which the variance will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VAR_P/
     */
    VAR_P(args: number | ApiName | ApiRange | number[]): number;

    /**
     * Estimates variance based on a sample (ignores logical values and text in the sample).
     *
     * @param args - Up to 255 numeric values for which the variance will be calculated. The first argument is
     *   required, subsequent arguments are optional. Arguments can be numbers, names, ranges, or arrays
     *   of numbers.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VAR_S/
     */
    VAR_S(args: number | ApiName | ApiRange | number[]): number;

    /**
     * Returns the depreciation of an asset for any specified period, including partial periods, using the
     * double-declining balance method or some other method specified.
     *
     * @param arg1 - The initial cost of the asset.
     * @param arg2 - The salvage value of the asset at the end of its lifetime.
     * @param arg3 - The number of periods over which the asset is being depreciated (sometimes called the useful
     *   life of the asset).
     * @param arg4 - The starting period for which the depreciation will be calculated, in the same units as the
     *   useful life of the asset.
     * @param arg5 - The ending period for which the depreciation will be calculated, in the same units as the useful
     *   life of the asset.
     * @param arg6 - The rate at which the balance declines. If it is omitted, the function will assume it to be 2
     * @param arg7 - Specifies whether to use straight-line depreciation when depreciation is greater than the
     *   declining balance calculation (**false** or omitted). If it is set to **true**, the function
     *   uses the declining balance method.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VDB/
     */
    VDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | boolean): number;

    /**
     * Looks for a value in the leftmost column of a table and then returns a value in the same row from
     * the specified column. By default, the table must be sorted in an ascending order.
     *
     * @param arg1 - The value to be found in the first column of the table. It can be a value, a reference, or a
     *   text string.
     * @param arg2 - A table of text, numbers, or logical values, in which data is retrieved. It can be a range of
     *   cells.
     * @param arg3 - The column number in the data table from which the matching value should be returned. The first
     *   column of values in the table is column 1.
     * @param arg4 - A logical value that specifies whether to find the closest match in the first column (sorted in
     *   ascending order) (**true** or omitted) or find an exact match (**false**).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/VLOOKUP/
     */
    VLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;

    /**
     * Returns a number from 1 to 7 identifying the day of the week of the specified date.
     *
     * @param arg1 - A number that represents a date, or a result of other formulas or functions.
     * @param arg2 - A number that determines the type of return value: **1** - returns a number from 1 (Sunday) to 7
     *   (Saturday); **2** - returns a number from 1 (Monday) to 7 (Sunday); **3** - returns a number
     *   from 0 (Monday) to 6 (Sunday).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WEEKDAY/
     */
    WEEKDAY(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the week number in the year.
     *
     * @param arg1 - The date-time code used for date and time calculation.
     * @param arg2 - A number (1 or 2) that determines the type of the return value: Sunday (1) or Monday (2).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WEEKNUM/
     */
    WEEKNUM(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;

    /**
     * Returns the Weibull distribution.
     *
     * @param arg1 - The value at which to evaluate the function, a nonnegative number.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WEIBULL/
     */
    WEIBULL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the Weibull distribution.
     *
     * @param arg1 - The value at which to evaluate the function, a nonnegative number.
     * @param arg2 - The alpha parameter of the distribution, a positive number.
     * @param arg3 - The beta parameter of the distribution, a positive number.
     * @param arg4 - A logical value (**true** or **false**) that determines the function form. If it is **true**,
     *   the function returns the cumulative distribution function. If it is **false**, the function
     *   returns the probability mass function.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WEIBULL_DIST/
     */
    WEIBULL_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;

    /**
     * Returns the serial number of the date before or after a specified number of workdays.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - The number of nonweekend and non-holiday days before or after the start date. A positive value
     *   for days yields a future date; a negative value yields a past date.
     * @param arg3 - An optional range or array of one or more serial date numbers to exclude from the working
     *   calendar, such as state and federal holidays and floating holidays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WORKDAY/
     */
    WORKDAY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number[]): number;

    /**
     * Returns the serial number of the date before or after a specified number of workdays with custom
     * weekend parameters.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - The number of nonweekend and non-holiday days before or after the start date. A positive value
     *   for days yields a future date; a negative value yields a past date.
     * @param arg3 - A number or string specifying when weekends occur.
     * @param arg4 - An optional range or array of one or more serial date numbers to exclude from the working
     *   calendar, such as state and federal holidays and floating holidays.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/WORKDAY_INTL/
     */
    WORKDAY_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | ApiName | number[]): number;

    /**
     * Returns the internal rate of return for a schedule of cash flows.
     *
     * @param arg1 - A range that contains the series of cash flows that corresponds to a schedule of payments in
     *   dates.
     * @param arg2 - A range that contains the schedule of payment dates that corresponds to the cash flow payments.
     * @param arg3 - An estimate at what the internal rate of return will be. If it is omitted, the function will
     *   assume guess to be 0.1 (10 percent).
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/XIRR/
     */
    XIRR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the net present value for a schedule of cash flows.
     *
     * @param arg1 - The discount rate to apply to the cash flows.
     * @param arg2 - A range that contains the series of cash flows that corresponds to a schedule of payments in
     *   dates.
     * @param arg3 - A range that contains the schedule of payment dates that corresponds to the cash flow payments.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/XNPV/
     */
    XNPV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName): number;

    /**
     * Returns the logical **Exclusive Or** value of all arguments. The function returns **true** when the
     * number of **true** inputs is odd and **false** when the number of **true** inputs is even.
     *
     * @param args - The conditions to check.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/XOR/
     */
    XOR(args: ApiRange | ApiName | boolean | boolean[]): boolean;

    /**
     * Returns the year of a date, an integer in the range 1900-9999.
     *
     * @param arg1 - A number in the date-time code, or a result of other formulas or functions.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/YEAR/
     */
    YEAR(arg1: ApiRange | ApiName | number): number;

    /**
     * Returns the year fraction representing the number of whole days between the start date and end date.
     *
     * @param arg1 - A serial date number that represents the start date.
     * @param arg2 - A serial date number that represents the end date.
     * @param arg3 - The type of day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual;
     *   **2** - Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/YEARFRAC/
     */
    YEARFRAC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the yield on a security that pays periodic interest.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The annual coupon rate of the security.
     * @param arg4 - The purchase price of the security, per $100 par value.
     * @param arg5 - The redemption value of the security, per $100 par value.
     * @param arg6 - The number of interest payments per year. The possible values are: 1 for annual payments, 2 for
     *   semiannual payments, 4 for quarterly payments.
     * @param arg7 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/YIELD/
     */
    YIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;

    /**
     * Returns the annual yield for a discounted security. For example, a Treasury bill.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The purchase price of the security, per $100 par value.
     * @param arg4 - The redemption value of the security, per $100 par value.
     * @param arg5 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/YIELDDISC/
     */
    YIELDDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;

    /**
     * Returns the annual yield of a security that pays interest at maturity.
     *
     * @param arg1 - The settlement date of the Treasury bill, expressed as a serial date number.
     * @param arg2 - The maturity date of the Treasury bill, expressed as a serial date number.
     * @param arg3 - The issue date of the security, expressed as a serial date number.
     * @param arg4 - The interest rate of the security at the issue date.
     * @param arg5 - The purchase price of the security, per $100 par value.
     * @param arg6 - The day count basis to use: **0** or omitted - US (NASD) 30/360; **1** - Actual/actual; **2** -
     *   Actual/360; **3** - Actual/365; **4** - European 30/360.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/YIELDMAT/
     */
    YIELDMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;

    /**
     * Returns the one-tailed P-value of a z-test.
     *
     * @param arg1 - The array or range of data against which to test X.
     * @param arg2 - The value to test.
     * @param arg3 - The population (known) standard deviation. If omitted, the sample standard deviation is used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/ZTEST/
     */
    ZTEST(arg1: number[] | ApiRange | ApiName, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;

    /**
     * Returns the one-tailed P-value of a z-test.
     *
     * @param arg1 - The array or range of data against which to test X.
     * @param arg2 - The value to test.
     * @param arg3 - The population (known) standard deviation. If omitted, the sample standard deviation is used.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/spreadsheet-api/ApiWorksheetFunction/Methods/Z_TEST/
     */
    Z_TEST(arg1: number[] | ApiRange, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  }

  /** Class representing an animation effect. */
  export interface g_nApiEffectIdCounter {
  }

  export type EditorEventArgs = {
    /** The function called when the current sheet has changed. */
    onChangeCurrentSheet: [index: number];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
