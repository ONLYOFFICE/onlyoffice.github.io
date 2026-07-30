// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: cell

export namespace Cell {
  /** A numeric value that specifies which function should be used to aggregate identical time values in the timeline data range.<b>1</b> (or omitted) - AVERAGE.<b>2</b> - COUNT.<b>3</b> - COUNTA.<b>4</b> - MAX.<b>5</b> - MEDIAN.<b>6</b> - MIN.<b>7</b> - SUM. */
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

  /** The type of a fill which uses an image as a background.<b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface.<b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface. */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
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

  /** The error value.* <b>"#NULL!"</b> - 1* <b>"#DIV/0!"</b> - 2* <b>"#VALUE!"</b> - 3* <b>"#REF!"</b> - 4* <b>"#NAME?"</b> - 5* <b>"#NUM!"</b> - 6* <b>"#N/A"</b> - 7* <b>"#GETTING_DATA"</b> - 8* <b>"Other"</b> - "#N/A" */
  export type ErrorValue = "#NULL!" | "#DIV/0!" | "#VALUE!" | "#REF!" | "#NAME?" | "#NUM!" | "#N/A" | "#GETTING_DATA";

  /** Specifies how the report filter fields are located. */
  export type FieldsInReportFilterType = "OverThenDown" | "DownThenOver";

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

  /** Specifies a type of freeze panes. */
  export type FreezePaneType = "row" | "column" | "cell" | null;

  /** The coordinate value for the geometry paths.Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections.<b>"default"</b> - a header or footer which can be applied to any default page.<b>"title"</b> - a header or footer which is applied to the title page.<b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default). */
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

  /** The match type.* <b>-1</b> - The values must be sorted in descending order. If the exact match is not found, the function will return the smallest value that is greater than the searched value.* <b>0</b> - The values can be sorted in any order. If the exact match is not found, the function will return the *#N/A* error.* <b>1</b> (or omitted) - The values must be sorted in ascending order. If the exact match is not found, the function will return the largest value that is less than the searched value. */
  export type MatchType = "-1" | "0" | "1";

  /** Standard numeric format. */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The page orientation type. */
  export type PageOrientation = "xlLandscape" | "xlPortrait";

  /** The paper size, specified as a value of the Excel <b>xlPaperSize</b> enumeration. */
  export type PaperSize = "xlPaperLetter" | "xlPaperLetterSmall" | "xlPaperTabloid" | "xlPaperLedger" | "xlPaperLegal" | "xlPaperStatement" | "xlPaperExecutive" | "xlPaperA3" | "xlPaperA4" | "xlPaperA4Small" | "xlPaperA5" | "xlPaperB4" | "xlPaperB5" | "xlPaperFolio" | "xlPaperQuarto" | "xlPaper10x14" | "xlPaper11x17" | "xlPaperNote" | "xlPaperEnvelope9" | "xlPaperEnvelope10" | "xlPaperEnvelope11" | "xlPaperEnvelope12" | "xlPaperEnvelope14" | "xlPaperCsheet" | "xlPaperDsheet" | "xlPaperEsheet" | "xlPaperEnvelopeDL" | "xlPaperEnvelopeC5" | "xlPaperEnvelopeC3" | "xlPaperEnvelopeC4" | "xlPaperEnvelopeC6" | "xlPaperEnvelopeC65" | "xlPaperEnvelopeB4" | "xlPaperEnvelopeB5" | "xlPaperEnvelopeB6" | "xlPaperEnvelopeItaly" | "xlPaperEnvelopeMonarch" | "xlPaperEnvelopePersonal" | "xlPaperFanfoldUS" | "xlPaperFanfoldStdGerman" | "xlPaperFanfoldLegalGerman";

  /** The types of elements that can be added to the paragraph structure. */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

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
    Sum: boolean;
    Count: boolean;
    Average: boolean;
    Max: boolean;
    Min: boolean;
    Product: boolean;
    CountNumbers: boolean;
    StdDev: boolean;
    StdDevP: boolean;
    Var: boolean;
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
    rows?: number | string | number[] | string[];
    columns?: number | string | number[] | string[];
    pages?: number | string | number[] | string[];
    addToTable?: boolean;
  }

  /** The report filter area settings. */
  export interface PivotTableFilterAreaInfo {
    Type: FieldsInReportFilterType;
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

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from. */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from. */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** Properties to make search and replace. */
  export interface ReplaceData {
    What: string | undefined;
    Replacement: string;
    LookAt: XlLookAt;
    SearchOrder: XlSearchOrder;
    SearchDirection: XlSearchDirection;
    MatchCase: boolean;
    ReplaceAll: boolean;
  }

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

  /** Properties to make search. */
  export interface SearchData {
    What: string | undefined;
    After: ApiRange;
    LookIn: XlFindLookIn;
    LookAt: XlLookAt;
    SearchOrder: XlSearchOrder;
    SearchDirection: XlSearchDirection;
    MatchCase: boolean;
  }

  /** The section break type which defines how the contents of the current section are placed relative to the previous section.WordprocessingML supports five distinct types of section breaks:<b>Next page</b> ("nextPage") - starts a new section on the next page (the default value).<b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page.<b>Even</b> ("evenPage") - starts a new section on the next even-numbered page.<b>Continuous</b> ("continuous") - starts a new section in the next paragraph.This means that continuous section breaks might not specify certain page-level section properties,since they shall be inherited from the following section.However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings.<b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
  export type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

  /** Represents the type of objects in a selection. */
  export type SelectionType = "none" | "shapes" | "slides" | "text";

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

  /** Specifies whether the first row of the sort range contains the header information. */
  export type SortHeader = "xlNo" | "xlYes";

  /** Specifies the sort order. */
  export type SortOrder = "xlAscending" | "xlDescending";

  /** Specifies if the sort should be by row or column. */
  export type SortOrientation = "xlSortColumns" | "xlSortRows";

  /** A numeric value between 1 and 8 that specifies which statistic will be returned.<b>1</b> - Alpha parameter of ETS algorithm - the base value parameter.<b>2</b> - Beta parameter of ETS algorithm - the trend value parameter.<b>3</b> - Gamma parameter of ETS algorithm - the seasonality value parameter.<b>4</b> - MASE (mean absolute scaled error) metric - a measure of the accuracy of forecasts.<b>5</b> - SMAPE (symmetric mean absolute percentage error) metric - a measure of the accuracy based on percentage errors.<b>6</b> - MAE (mean absolute error) metric - a measure of the accuracy of forecasts.<b>7</b> - RMSE (root mean squared error) metric - a measure of the differences between predicted and observed values.<b>8</b> - Step size detected in the timeline. */
  export type StatisticType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /** The style type used for the document element. */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Types of custom tab. */
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

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    type: "none" | "digit" | "letter" | "mask" | "regExp";
    value?: string;
  }

  /** Text transform type. */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical).<b>"none"</b> - does not display the selected tick labels.<b>"nextTo"</b> - sets the position of the selected tick labels next to the main label.<b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values.<b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values. */
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

  /** The available slide transition speed values (similar to PowerPoint VBA ppTransitionSpeed). */
  export type TransitionSpeed = "slow" | "medium" | "fast";

  /** Represents a user's comment history. */
  export interface UserComments {
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    reviews: ReviewReportRecord[];
  }

  /** The validation alert style. */
  export type ValidationAlertStyle = "xlValidAlertStop" | "xlValidAlertWarning" | "xlValidAlertInformation";

  /** The validation operator. */
  export type ValidationOperator = "xlBetween" | "xlNotBetween" | "xlEqual" | "xlNotEqual" | "xlGreater" | "xlLess" | "xlGreaterEqual" | "xlLessEqual";

  /** The validation type. */
  export type ValidationType = "xlValidateInputOnly" | "xlValidateWholeNumber" | "xlValidateDecimal" | "xlValidateList" | "xlValidateDate" | "xlValidateTime" | "xlValidateTextLength" | "xlValidateCustom";

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it). */
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
  export type AlphaLcParenR = any;
  export type AlphaLcPeriod = any;
  export type AlphaUcParenR = any;
  export type AlphaUcPeriod = any;
  export type ApiHyperlinks = any;
  export type ApiListObject = any;
  export type Arabic = any;
  export type ArabicParenR = any;
  export type ArabicPeriod = any;
  export type Area = any;
  export type AreaStacked = any;
  export type AreaStacked100 = any;
  export type Average = any;
  export type BarClustered = any;
  export type BarStacked = any;
  export type BarStacked100 = any;
  export type Begin = any;
  export type Bottom = any;
  export type CanEdit = any;
  export type CanView = any;
  export type ColumnClustered = any;
  export type ColumnStacked = any;
  export type ColumnStacked100 = any;
  export type Columns = any;
  export type Combo = any;
  export type ComboColumnClusteredLine = any;
  export type ComboColumnClusteredLineSecondaryAxis = any;
  export type Count = any;
  export type CountNumbers = any;
  export type DIV = any;
  export type DashDot = any;
  export type DashDotDot = any;
  export type Dashed = any;
  export type DiagonalDown = any;
  export type DiagonalUp = any;
  export type Dotted = any;
  export type Double = any;
  export type Doughnut = any;
  export type Down = any;
  export type DownThenOver = any;
  export type End = any;
  export type Equation = any;
  export type Figure = any;
  export type Fill = any;
  export type Filters = any;
  export type General = any;
  export type Hair = any;
  export type Hidden = any;
  export type InsideHorizontal = any;
  export type InsideVertical = any;
  export type Left = any;
  export type Line = any;
  export type LineMarkers = any;
  export type LineMarkersStacked = any;
  export type LineMarkersStacked100 = any;
  export type LineStacked = any;
  export type LineStacked100 = any;
  export type Max = any;
  export type Medium = any;
  export type MediumDashDot = any;
  export type MediumDashDotDot = any;
  export type MediumDashed = any;
  export type Min = any;
  export type NAME = any;
  export type NULL = any;
  export type NUM = any;
  export type No = any;
  export type None = any;
  export type NotView = any;
  export type Outline = any;
  export type OverThenDown = any;
  export type PM = any;
  export type PTCondition = any;
  export type ParaAdd = any;
  export type ParaPr = any;
  export type ParaRem = any;
  export type Pie = any;
  export type Product = any;
  export type REF = any;
  export type Radar = any;
  export type RadarFilled = any;
  export type RadarMarkers = any;
  export type Red = any;
  export type Right = any;
  export type Roman = any;
  export type RomanLcPeriod = any;
  export type RomanUcPeriod = any;
  export type Rows = any;
  export type SlantDashDot = any;
  export type StdDev = any;
  export type StdDevP = any;
  export type StockHLC = any;
  export type StockOHLC = any;
  export type StockVHLC = any;
  export type StockVOHLC = any;
  export type Sum = any;
  export type Table = any;
  export type Tabular = any;
  export type TextAdd = any;
  export type TextPr = any;
  export type TextRem = any;
  export type Thick = any;
  export type Thin = any;
  export type Top = any;
  export type Unknown = any;
  export type Up = any;
  export type VALUE = any;
  export type Values = any;
  export type Var = any;
  export type VarP = any;
  export type XYScatter = any;
  export type XYScatterLines = any;
  export type XYScatterLinesNoMarkers = any;
  export type XYScatterSmooth = any;
  export type XYScatterSmoothNoMarkers = any;

  /** Base class. */
  export interface Api {
    AddComment(sText: string, sAuthor: string): ApiComment | null;
    AddCustomFunction(fCustom: (...args: any[]) => any): void;
    AddCustomFunctionLibrary(sName: string, Func: (...args: any[]) => any): void;
    AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;
    AddSheet(sName: string): ApiWorksheet;
    Calculate(): boolean;
    CentimetersToPoints(cm: number): number;
    ClearCustomFunctions(): boolean;
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
    CreateBullet(sSymbol: string): ApiBullet;
    CreateColorByName(sPresetColor: PresetColor): ApiColor;
    CreateColorFromRGB(r: number, g: number, b: number): ApiColor;
    CreateCustomGeometry(): ApiGeometry;
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;
    CreateNewHistoryPoint(): boolean;
    CreateNoFill(): ApiFill;
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;
    CreateParagraph(): ApiParagraph;
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;
    CreateRun(): ApiRun;
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
    CreateShadow(settings: ShadowSettings): ApiShadow;
    CreateSolidFill(color: ApiColor): ApiFill;
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;
    CreateTextPr(): ApiTextPr;
    EmusToMillimeters(emu: number): number;
    EmusToPoints(emu: number): number;
    Format(expression: string, format?: string): string;
    GetActiveSheet(): ApiWorksheet;
    GetActiveWorkbook(): ApiWorkbook;
    GetAllComments(): ApiComment[];
    GetAllPivotTables(): ApiPivotTable[];
    GetCommentById(sId: string): ApiComment;
    GetComments(): ApiComment[];
    GetCore(): ApiCore;
    GetCustomProperties(): ApiCustomProperties;
    GetDefName(defName: string): ApiName;
    GetDocumentInfo(): object;
    GetFreezePanesType(): FreezePaneType;
    GetFullName(): string;
    GetLocale(): number;
    GetMailMergeData(nSheet: number, bWithFormat?: boolean): string[][];
    GetPivotByName(name: string): ApiPivotTable | null;
    GetRange(sRange: string): ApiRange;
    GetReferenceStyle(): ReferenceStyle;
    GetSelection(): ApiRange;
    GetSheet(nameOrIndex: string | number): ApiWorksheet | null;
    GetSheets(): ApiWorksheet[];
    GetThemesColors(): string[];
    GetWorksheetFunction(): ApiWorksheetFunction;
    HexColor(hexString: string): ApiColor;
    InchesToPoints(inches: number): number;
    InsertPivotExistingWorksheet(dataRef: ApiRange, pivotRef: ApiRange, confirmation: boolean): ApiPivotTable;
    InsertPivotNewWorksheet(dataRef: ApiRange, newSheetName?: ApiRange): ApiPivotTable;
    Intersect(Range1: ApiRange, Range2: ApiRange): ApiRange | null;
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
    RecalculateAllFormulas(fLogger?: (...args: any[]) => any): boolean;
    RefreshAllPivots(): void;
    RemoveCustomFunction(sName: string): boolean;
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;
    Save(): boolean;
    SetFreezePanesType(FreezePaneType: FreezePaneType): void;
    SetLocale(LCID: number): boolean;
    SetReferenceStyle(sReferenceStyle: ReferenceStyle): void;
    SetThemeColors(sTheme: string): boolean;
    ThemeColor(name?: SchemeColorId): ApiColor;
    TwipsToPoints(twips: number): number;
    attachEvent(eventName: string, callback: (...args: any[]) => any): void;
    detachEvent(eventName: string): void;
  }

  /** Class representing an above average conditional formatting rule. */
  export interface ApiAboveAverage {
    Delete(): void;
    GetAboveBelow(): boolean;
    GetAppliesTo(): ApiRange | null;
    GetDateOperator(): XlTimePeriods | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula1(): string;
    GetFormula2(): string;
    GetNumStdDev(): number;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPriority(): number;
    GetScopeType(): XlPivotConditionScope;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetAboveBelow(aboveBelow: boolean): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetNumStdDev(numStdDev: number): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPriority(Priority: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing an animation effect. */
  export interface ApiAnimationEffect {
  }

  /** Class representing an animation sequence (main sequence or interactive sequence). */
  export interface ApiAnimationSequence {
  }

  /** Class representing the areas. */
  export interface ApiAreas {
    GetCount(): number;
    GetItem(ind: number): ApiRange;
    GetParent(): number;
  }

  /** Class representing worksheet autofilters. */
  export interface ApiAutoFilter {
    ApplyFilter(): void;
    GetFilterMode(): boolean;
    GetFilters(): ApiFilter[];
    GetParent(): ApiWorksheet | ApiListObject;
    GetRange(): ApiRange | null;
    ShowAllData(): void;
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

  /** Class representing characters in an object that contains text. */
  export interface ApiCharacters {
    Delete(): void;
    GetCaption(): string;
    GetCount(): number;
    GetFont(): ApiFont;
    GetParent(): ApiRange;
    GetText(): string;
    Insert(String: string): void;
    SetCaption(Caption: string): void;
    SetText(Text: string): void;
  }

  /** Class representing a chart. */
  export interface ApiChart {
    AddSeria(sNameRange: string, sValuesRange: string, sXValuesRange?: string): void;
    ApplyChartStyle(nStyleId: any): boolean;
    GetAllSeries(): ApiChartSeries[];
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chart";
    GetParentSheet(): ApiWorksheet;
    GetSeries(nIdx: number): ApiChartSeries;
    GetTitle(): string | null;
    GetType(): ChartType;
    RemoveSeria(nSeria: number): boolean;
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;
    SetCatFormula(sRange: string): void;
    SetDataLabelsTextPr(textPr: ApiTextPr): boolean;
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
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
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;
    SetSeriaName(sNameRange: string, nSeria: number): boolean;
    SetSeriaValues(sRange: string, nSeria: number): boolean;
    SetSeriaXValues(sRange: string, nSeria: number): boolean;
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
  }

  /** Class representing a base class for the color types. */
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

  /** Class representing a color scale conditional formatting rule. */
  export interface ApiColorScale {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetColorScaleCriteria(): ApiColorScaleCriterion[] | null;
    GetDateOperator(): XlTimePeriods | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula1(): string;
    GetFormula2(): string;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPriority(): number;
    GetScopeType(): XlPivotConditionScope;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPriority(Priority: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing single criterion in a color scale conditional formatting rule. */
  export interface ApiColorScaleCriterion {
    GetColor(): ApiColor | null;
    GetIndex(): number;
    GetType(): XlConditionValueTypes | null;
    GetValue(): string | null;
    SetColor(oColor: ApiColor): void;
    SetType(type: XlConditionValueTypes): void;
    SetValue(value: string): void;
  }

  /** Class representing a document combo box / drop-down list. */
  export interface ApiComboBoxForm {
  }

  /** Class representing a comment. */
  export interface ApiComment {
    AddReply(sText: string, sAuthorName: string, sUserId: string, nPos?: number): void;
    Delete(): boolean;
    GetAuthorName(): string;
    GetClassType(): "comment";
    GetId(): string;
    GetQuoteText(): string | null;
    GetRepliesCount(): number;
    GetReply(nIndex?: number): ApiCommentReply;
    GetText(): string;
    GetTime(): number;
    GetTimeUTC(): number;
    GetUserId(): string;
    IsSolved(): boolean;
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): void;
    SetAuthorName(sAuthorName: string): void;
    SetSolved(bSolved: boolean): void;
    SetText(text: string): void;
    SetTime(nTimeStamp: number | string): void;
    SetTimeUTC(nTimeStamp: number | string): void;
    SetUserId(sUserId: string): void;
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
    GetAuthorName(): string;
    GetClassType(): "commentReply";
    GetText(): string;
    GetTime(): number;
    GetTimeUTC(): number;
    GetUserId(): string;
    SetAuthorName(sAuthorName: string): void;
    SetText(sText: string): void;
    SetTime(nTimeStamp: number | string): void;
    SetTimeUTC(nTimeStamp: number | string): void;
    SetUserId(sUserId: string): void;
  }

  /** Class representing a complex field. */
  export interface ApiComplexForm {
  }

  /** Class representing a list of values of the combo box / drop-down list content control. */
  export interface ApiContentControlList {
  }

  /** Class representing an entry of the combo box / drop-down list content control. */
  export interface ApiContentControlListEntry {
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

  /** Class representing a data bar conditional formatting rule. */
  export interface ApiDatabar {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetAxisColor(): ApiColor | null;
    GetAxisPosition(): XlDataBarAxisPosition;
    GetBarBorderColor(): ApiColor | null;
    GetBarColor(): ApiColor | null;
    GetBarFillType(): XlDataBarFillType;
    GetDateOperator(): XlTimePeriods | null;
    GetDirection(): XlReadingOrder;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula(): string;
    GetFormula1(): string;
    GetFormula2(): string;
    GetMaxPointType(): XlConditionValueTypes | null;
    GetMaxPointValue(): string | number | null;
    GetMinPointType(): XlConditionValueTypes | null;
    GetMinPointValue(): string | number | null;
    GetNegativeBarColor(): ApiColor | null;
    GetNegativeBorderColor(): ApiColor | null;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPercentMax(): number;
    GetPercentMin(): number;
    GetPriority(): number;
    GetScopeType(): XlPivotConditionScope;
    GetShowValue(): boolean;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetAxisColor(oColor: ApiColor): void;
    SetAxisPosition(position: XlDataBarAxisPosition): void;
    SetBarBorderColor(oColor: ApiColor): void;
    SetBarColor(oColor: ApiColor): void;
    SetBarFillType(fillType: XlDataBarFillType): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetDirection(direction: XlReadingOrder): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetMaxPointType(type: XlConditionValueTypes): void;
    SetMaxPointValue(value: string | number): void;
    SetMinPointType(type: XlConditionValueTypes): void;
    SetMinPointValue(value: string | number): void;
    SetNegativeBarColor(oColor: ApiColor): void;
    SetNegativeBorderColor(oColor: ApiColor): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPercentMax(percent: number): void;
    SetPercentMin(percent: number): void;
    SetPriority(Priority: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetShowValue(showValue: boolean): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing a document date field. */
  export interface ApiDateForm {
  }

  /** Class representing a document. */
  export interface ApiDocument {
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
    Fill(fill: ApiFill): boolean;
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
    GetParentSheet(): ApiWorksheet;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTitle(): string | null;
    GetWidth(): number;
    Select(isReplace?: boolean): void;
    SetDescription(description: string): boolean;
    SetFill(fill: ApiFill): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(stroke: ApiStroke): boolean;
    SetPosition(nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): void;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): void;
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

  /** Class representing a single AutoFilter column. */
  export interface ApiFilter {
    GetCriteria1(): string | string[] | number | XlDynamicFilterCriteria | null;
    GetCriteria2(): string | null;
    GetOn(): boolean;
    GetOperator(): XlAutoFilterOperator | null;
    GetParent(): ApiAutoFilter;
  }

  /** Class that contains the font attributes (font name, font size, color, and so on). */
  export interface ApiFont {
    GetBold(): boolean | null;
    GetColor(): ApiColor | null;
    GetItalic(): boolean | null;
    GetName(): string | null;
    GetParent(): ApiCharacters;
    GetSize(): number | null;
    GetStrikethrough(): boolean | null;
    GetSubscript(): boolean | null;
    GetSuperscript(): boolean | null;
    GetUnderline(): XlUnderlineStyle | null;
    SetBold(isBold: boolean): void;
    SetColor(Color: ApiColor): void;
    SetItalic(isItalic: boolean): void;
    SetName(FontName: string): void;
    SetSize(Size: number): void;
    SetStrikethrough(isStrikethrough: boolean): void;
    SetSubscript(isSubscript: boolean): void;
    SetSuperscript(isSuperscript: boolean): void;
    SetUnderline(Underline: XlUnderlineStyle): void;
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
  }

  /** Class representing a single format condition. */
  export interface ApiFormatCondition {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetDateOperator(): XlTimePeriods | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula1(): string;
    GetFormula2(): string;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPriority(): number;
    GetScopeType(): XlPivotConditionScope;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPriority(Priority: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing a collection of format conditions. */
  export interface ApiFormatConditions {
    Add(Type: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    AddAboveAverage(): ApiAboveAverage | null;
    AddColorScale(ColorScaleType?: number): ApiColorScale | null;
    AddDatabar(): ApiDatabar | null;
    AddIconSetCondition(): ApiIconSetCondition | null;
    AddTop10(): ApiTop10 | null;
    AddUniqueValues(): ApiUniqueValues | null;
    Delete(): void;
    GetCount(): number;
    GetItem(index: number): ApiFormatCondition | null;
    GetParent(): ApiRange;
  }

  /** Class representing freeze panes. */
  export interface ApiFreezePanes {
    FreezeAt(frozenRange: ApiRange | string): void;
    FreezeColumns(count?: number): void;
    FreezeRows(count?: number): void;
    GetLocation(): ApiRange | null;
    Unfreeze(): void;
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
  export interface ApiGroup {
    GetClassType(): "group";
    GetParentSheet(): ApiWorksheet;
    Ungroup(): ApiDrawing[] | null;
  }

  /** Class representing a single header or footer section (left, center or right) of a page. */
  export interface ApiHeaderFooter {
    GetText(): string;
    SetText(sText: string): boolean;
  }

  /** Class representing a hyperlink. */
  export interface ApiHyperlink {
    Delete(): void;
    GetAddress(): string;
    GetClassType(): "hyperlink";
    GetElement(nPos: number): ParagraphContent;
    GetElementsCount(): number;
    GetLinkedText(): string;
    GetName(): string;
    GetRange(): ApiRange;
    GetScreenTip(): string;
    GetScreenTipText(): string;
    GetSubAddress(): string;
    GetTextToDisplay(): string;
    GetType(): number;
    SetAddress(sAddress: string): void;
    SetLink(sLink: string): boolean;
    SetScreenTip(sScreenTip: string): void;
    SetScreenTipText(sScreenTipText: string): boolean;
    SetSubAddress(sSubAddress: string): void;
    SetTextToDisplay(sText: string): void;
  }

  /** Class representing a single icon criterion. */
  export interface ApiIconCriterion {
    GetIcon(): XlIcon | null;
    GetIndex(): number;
    GetOperator(): string | null;
    GetType(): XlConditionValueTypes | null;
    GetValue(): string | number | null;
    SetIcon(icon: XlIcon): void;
    SetOperator(operator: string): void;
    SetType(type: XlConditionValueTypes): void;
    SetValue(value: string | number): void;
  }

  /** Class representing an icon set conditional formatting rule. */
  export interface ApiIconSetCondition {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetDateOperator(): XlTimePeriods | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula(): string;
    GetFormula1(): string;
    GetFormula2(): string;
    GetIconCriteria(): ApiIconCriterion[] | null;
    GetIconSet(): XlIconSet | null;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPercentileValues(): boolean;
    GetPriority(): number;
    GetReverseOrder(): boolean | null;
    GetScopeType(): XlPivotConditionScope;
    GetShowIconOnly(): boolean | null;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetIconSet(iconSet: XlIconSet): boolean;
    SetLastPriority(): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPercentileValues(percentileValues: boolean): boolean;
    SetPriority(Priority: number): void;
    SetReverseOrder(reverse: boolean): boolean;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetShowIconOnly(showIconOnly: boolean): boolean;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing an image. */
  export interface ApiImage {
    GetClassType(): "image";
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

  /** Class representing a mathematical equation. */
  export interface ApiMath {
    GetClassType(): "math";
    GetText(format?: "unicode" | "latex"): string;
  }

  /** Class representing a name. */
  export interface ApiName {
    Delete(): boolean;
    GetName(): string;
    GetRefersTo(): string;
    GetRefersToRange(): ApiRange;
    SetName(sName: string): boolean;
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

  /** Class representing an OLE object. */
  export interface ApiOleObject {
    GetApplicationId(): string;
    GetClassType(): "oleObject";
    GetData(): string;
    GetParentSheet(): ApiWorksheet;
    SetApplicationId(sAppId: string): boolean;
    SetData(sData: string): boolean;
  }

  /** Class representing the header and footer of a specific page type (even or first) of a worksheet. */
  export interface ApiPage {
    GetCenterFooter(): ApiHeaderFooter;
    GetCenterHeader(): ApiHeaderFooter;
    GetLeftFooter(): ApiHeaderFooter;
    GetLeftHeader(): ApiHeaderFooter;
    GetRightFooter(): ApiHeaderFooter;
    GetRightHeader(): ApiHeaderFooter;
  }

  /** Class representing the page setup (print layout) of a worksheet. */
  export interface ApiPageSetup {
    GetAlignMarginsHeaderFooter(): boolean;
    GetBottomMargin(): number;
    GetCenterFooter(): string;
    GetCenterHeader(): string;
    GetCenterHorizontally(): boolean;
    GetCenterVertically(): boolean;
    GetDifferentFirstPageHeaderFooter(): boolean;
    GetEvenPage(): ApiPage;
    GetFirstPage(): ApiPage;
    GetFirstPageNumber(): number | null;
    GetFitToPagesTall(): number;
    GetFitToPagesWide(): number;
    GetFooterMargin(): number;
    GetHeaderMargin(): number;
    GetLeftFooter(): string;
    GetLeftHeader(): string;
    GetLeftMargin(): number;
    GetOddAndEvenPagesHeaderFooter(): boolean;
    GetOrientation(): PageOrientation;
    GetPaperSize(): PaperSize;
    GetParent(): ApiWorksheet;
    GetPrintArea(): string;
    GetPrintGridlines(): boolean;
    GetPrintHeadings(): boolean;
    GetPrintTitleColumns(): string;
    GetPrintTitleRows(): string;
    GetRightFooter(): string;
    GetRightHeader(): string;
    GetRightMargin(): number;
    GetScaleWithDocHeaderFooter(): boolean;
    GetTopMargin(): number;
    GetZoom(): number;
    SetAlignMarginsHeaderFooter(bAlign: boolean): boolean;
    SetBottomMargin(nMargin: number): boolean;
    SetCenterFooter(sText: string): boolean;
    SetCenterHeader(sText: string): boolean;
    SetCenterHorizontally(bCenter: boolean): boolean;
    SetCenterVertically(bCenter: boolean): boolean;
    SetDifferentFirstPageHeaderFooter(bDifferent: boolean): boolean;
    SetFirstPageNumber(nNumber: number): boolean;
    SetFitToPagesTall(nPages: number): boolean;
    SetFitToPagesWide(nPages: number): boolean;
    SetFooterMargin(nMargin: number): boolean;
    SetHeaderMargin(nMargin: number): boolean;
    SetLeftFooter(sText: string): boolean;
    SetLeftHeader(sText: string): boolean;
    SetLeftMargin(nMargin: number): boolean;
    SetOddAndEvenPagesHeaderFooter(bDifferent: boolean): boolean;
    SetOrientation(sOrientation: PageOrientation): boolean;
    SetPaperSize(sPaperSize: PaperSize): boolean;
    SetPrintArea(sRange: string): boolean;
    SetPrintGridlines(bPrint: boolean): boolean;
    SetPrintHeadings(bPrint: boolean): boolean;
    SetPrintTitleColumns(sRange: string): boolean;
    SetPrintTitleRows(sRange: string): boolean;
    SetRightFooter(sText: string): boolean;
    SetRightHeader(sText: string): boolean;
    SetRightMargin(nMargin: number): boolean;
    SetScaleWithDocHeaderFooter(bScale: boolean): boolean;
    SetTopMargin(nMargin: number): boolean;
    SetZoom(nZoom: number): boolean;
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
  export interface ApiParagraph {
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
    SetBold(isBold: boolean): ApiParagraph;
    SetBullet(oBullet: ApiBullet): void;
    SetCaps(isCaps: boolean): ApiParagraph;
    SetColor(color: ApiColor): ApiParagraph;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;
    SetFontFamily(sFontFamily: string): ApiParagraph;
    SetFontSize(nSize: hps): ApiParagraph;
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
  export interface ApiPictureForm {
  }

  /** Class representing a pivot table data field. */
  export interface ApiPivotDataField {
    AutoSort(order: SortOrder, field: string): void;
    ClearAllFilters(): void;
    ClearLabelFilters(): void;
    ClearManualFilters(): void;
    ClearValueFilters(): void;
    GetCaption(): string;
    GetCurrentPage(): string | number;
    GetDragToColumn(): boolean;
    GetDragToData(): boolean;
    GetDragToPage(): boolean;
    GetDragToRow(): boolean;
    GetFunction(): DataConsolidateFunctionType;
    GetIndex(): number;
    GetLayoutBlankLine(): boolean;
    GetLayoutCompactRow(): boolean;
    GetLayoutForm(): PivotLayoutType;
    GetLayoutPageBreak(): boolean;
    GetLayoutSubtotalLocation(): LayoutSubtotalLocationType;
    GetLayoutSubtotals(): boolean;
    GetName(): string;
    GetNumberFormat(): string | null;
    GetOrientation(): PivotFieldOrientationType;
    GetParent(): ApiPivotTable;
    GetPivotField(): ApiPivotField;
    GetPivotFilters(): ApiPivotFilters;
    GetPivotItems(index?: number): ApiPivotItem[] | ApiPivotItem | null;
    GetPosition(): number;
    GetRepeatLabels(): boolean;
    GetShowAllItems(): boolean;
    GetShowingInAxis(): boolean;
    GetSourceName(): string;
    GetSubtotalName(): string;
    GetSubtotals(): PivotFieldSubtotals;
    GetTable(): ApiPivotTable;
    GetValue(): string;
    Move(type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;
    Remove(): void;
    SetCaption(caption: string): void;
    SetDragToColumn(flag: boolean): void;
    SetDragToData(flag: boolean): void;
    SetDragToPage(flag: boolean): void;
    SetDragToRow(flag: boolean): void;
    SetFunction(func: DataConsolidateFunctionType): void;
    SetLayoutBlankLine(insert: boolean): void;
    SetLayoutCompactRow(compact: boolean): void;
    SetLayoutForm(type: PivotLayoutType): void;
    SetLayoutPageBreak(insert: boolean): void;
    SetLayoutSubtotalLocation(type: LayoutSubtotalLocationType): void;
    SetLayoutSubtotals(show: boolean): void;
    SetName(name: string): void;
    SetNumberFormat(format: string): void;
    SetOrientation(type: PivotFieldOrientationType): void;
    SetPosition(position: number): void;
    SetRepeatLabels(repeat: boolean): void;
    SetShowAllItems(show: boolean): void;
    SetSubtotalName(caption: string): void;
    SetSubtotals(subtotals: PivotFieldSubtotals): void;
    SetValue(name: string): void;
  }

  /** Class representing a pivot table field. */
  export interface ApiPivotField {
    AutoSort(order: SortOrder, field: string): void;
    ClearAllFilters(): void;
    ClearLabelFilters(): void;
    ClearManualFilters(): void;
    ClearValueFilters(): void;
    GetCaption(): string;
    GetCurrentPage(): string | number;
    GetDragToColumn(): boolean;
    GetDragToData(): boolean;
    GetDragToPage(): boolean;
    GetDragToRow(): boolean;
    GetIndex(): number;
    GetLayoutBlankLine(): boolean;
    GetLayoutCompactRow(): boolean;
    GetLayoutForm(): PivotLayoutType;
    GetLayoutPageBreak(): boolean;
    GetLayoutSubtotalLocation(): LayoutSubtotalLocationType;
    GetLayoutSubtotals(): boolean;
    GetName(): string;
    GetOrientation(): PivotFieldOrientationType;
    GetParent(): ApiPivotTable;
    GetPivotFilters(): ApiPivotFilters;
    GetPivotItems(index?: number): ApiPivotItem[] | ApiPivotItem | null;
    GetPosition(): number;
    GetRepeatLabels(): boolean;
    GetShowAllItems(): boolean;
    GetShowingInAxis(): boolean;
    GetSourceName(): string;
    GetSubtotalName(): string;
    GetSubtotals(): PivotFieldSubtotals;
    GetTable(): ApiPivotTable;
    GetValue(): string;
    Move(type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;
    Remove(): void;
    SetCaption(caption: string): void;
    SetDragToColumn(flag: boolean): void;
    SetDragToData(flag: boolean): void;
    SetDragToPage(flag: boolean): void;
    SetDragToRow(flag: boolean): void;
    SetLayoutBlankLine(insert: boolean): void;
    SetLayoutCompactRow(compact: boolean): void;
    SetLayoutForm(type: PivotLayoutType): void;
    SetLayoutPageBreak(insert: boolean): void;
    SetLayoutSubtotalLocation(type: LayoutSubtotalLocationType): void;
    SetLayoutSubtotals(show: boolean): void;
    SetName(name: string): void;
    SetOrientation(type: PivotFieldOrientationType): void;
    SetPosition(position: number): void;
    SetRepeatLabels(repeat: boolean): void;
    SetShowAllItems(show: boolean): void;
    SetSubtotalName(caption: string): void;
    SetSubtotals(subtotals: PivotFieldSubtotals): void;
    SetValue(name: string): void;
  }

  /** Class representing a collection of pivot filters applied to a pivot field. */
  export interface ApiPivotFilters {
    Add(filterType: XlPivotFilterType, dataField?: ApiPivotDataField, value1?: string | number | Date, value2?: string | number | Date, wholeDayFilter?: boolean): void;
  }

  /** Class representing a pivot table field item. */
  export interface ApiPivotItem {
    GetCaption(): string;
    GetName(): string;
    GetParent(): ApiPivotField;
    GetValue(): string;
    GetVisible(): boolean;
    SetVisible(visible: boolean): void;
  }

  /** Class representing a pivot table. */
  export interface ApiPivotTable {
    AddDataField(field: number | string): ApiPivotDataField;
    AddFields(options: PivotTableFieldOptions): void;
    ClearAllFilters(): void;
    ClearTable(): void;
    GetColumnFields(field?: number | string): ApiPivotField[];
    GetColumnGrand(): boolean;
    GetColumnRange(): ApiRange | null;
    GetData(items: string[]): number | null;
    GetDataBodyRange(): ApiRange;
    GetDataFields(field?: number | string): ApiPivotDataField[] | ApiPivotDataField | null;
    GetDescription(): string;
    GetDisplayFieldCaptions(): boolean;
    GetDisplayFieldsInReportFilterArea(): PivotTableFilterAreaInfo;
    GetGrandTotalName(): string;
    GetHiddenFields(): ApiPivotField[];
    GetName(): string;
    GetPageFields(field?: number | string): ApiPivotField[];
    GetParent(): ApiWorksheet;
    GetPivotData(dataField?: string, fieldItemsArray?: string[]): ApiRange;
    GetPivotFields(field?: string | number): ApiPivotField[] | ApiPivotField | ApiPivotDataField | null;
    GetRowFields(field?: number | string): ApiPivotField[];
    GetRowGrand(): boolean;
    GetRowRange(): ApiRange | null;
    GetSource(): ApiRange;
    GetStyleName(): string;
    GetTableRange1(): ApiRange | null;
    GetTableRange2(): ApiRange | null;
    GetTableStyleColumnHeaders(): boolean;
    GetTableStyleColumnStripes(): boolean;
    GetTableStyleRowHeaders(): boolean;
    GetTableStyleRowStripes(): boolean;
    GetTitle(): string;
    GetVisibleFields(): ApiPivotField[];
    MoveField(identifier: number | string, type: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;
    PivotValueCell(rowLine: number, colLine: number): number | string | null;
    RefreshTable(): void;
    RemoveField(identifier: number | string): void;
    Select(): void;
    SetColumnGrand(show: boolean): void;
    SetDescription(description: string): void;
    SetDisplayFieldCaptions(show: boolean): void;
    SetDisplayFieldsInReportFilterArea(type: FieldsInReportFilterType, fields: number): void;
    SetGrandTotalName(name: string): void;
    SetLayoutBlankLine(insert: boolean): void;
    SetLayoutSubtotals(show: boolean): void;
    SetName(name: string): void;
    SetRepeatAllLabels(repeat: boolean): void;
    SetRowAxisLayout(type: PivotLayoutType, compact: boolean): void;
    SetRowGrand(show: boolean): void;
    SetSource(source: ApiRange): void;
    SetStyleName(name: string): void;
    SetSubtotalLocation(type: PivotSubtotalLayoutType): void;
    SetTableStyleColumnHeaders(show: boolean): void;
    SetTableStyleColumnStripes(show: boolean): void;
    SetTableStyleRowHeaders(show: boolean): void;
    SetTableStyleRowStripes(show: boolean): void;
    SetTitle(title: string): void;
    ShowDetails(rowLine: number, colLine: number): boolean;
    Update(): void;
  }

  /** Class representing a placeholder. */
  export interface ApiPlaceholder {
  }

  /** Class representing a presentation. */
  export interface ApiPresentation {
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor {
    GetClassType(): "presetColor";
  }

  /** Class representing a user-protected range. */
  export interface ApiProtectedRange {
    AddUser(sId: string, sName: string, protectedRangeUserType: ProtectedRangeUserType): ApiProtectedRangeUserInfo | null;
    DeleteUser(sId: string): boolean;
    GetAllUsers(): ApiProtectedRangeUserInfo[] | null;
    GetUser(sId: string): ApiProtectedRangeUserInfo | null;
    SetAnyoneType(protectedRangeUserType: ProtectedRangeUserType): boolean;
    SetRange(sRange: string): boolean;
    SetTitle(sTitle: string): boolean;
  }

  /** Class representing a user from the current protected range. */
  export interface ApiProtectedRangeUserInfo {
    GetId(): string | null;
    GetName(): string | null;
    GetType(): ProtectedRangeUserType;
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor {
    GetClassType(): "rgbColor";
  }

  /** Class representing a range. */
  export interface ApiRange {
    AddComment(sText: string, sAuthor: string): ApiComment | null;
    AutoFit(bRows?: boolean, bCols?: boolean): void;
    Clear(): boolean;
    ClearContents(): void;
    ClearFormats(): void;
    ClearHyperlinks(): void;
    Copy(destination?: ApiRange): void;
    Cut(destination?: ApiRange): void;
    Delete(shift?: DeleteShiftDirection): void;
    End(direction: Direction): ApiRange;
    Find(oSearchData: SearchData): ApiRange | null;
    FindNext(After: ApiRange): ApiRange | null;
    FindPrevious(Before: ApiRange): ApiRange | null;
    ForEach(fCallback: (...args: any[]) => any): boolean;
    GetAddress(RowAbs: boolean, ColAbs: boolean, RefStyle: string, External: boolean, RelativeTo: ApiRange): string | null;
    GetAreas(): ApiAreas;
    GetCells(row: number, col: number): ApiRange;
    GetCellsCount(): number;
    GetCharacters(Start: number, Length: number): ApiCharacters;
    GetClassType(): "range";
    GetCol(): number;
    GetCols(nCol: number): ApiRange | null;
    GetColumnWidth(): number;
    GetColumnsCount(): number;
    GetComment(): ApiComment | null;
    GetCount(): number;
    GetCurrentRegion(): ApiRange | null;
    GetDefName(): ApiName;
    GetEntireColumn(): ApiRange | null;
    GetEntireRow(): ApiRange | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFormatConditions(): ApiFormatConditions;
    GetFormula(): string | string[][];
    GetFormulaArray(): string | null;
    GetHidden(): boolean;
    GetHyperlinks(): ApiHyperlinks;
    GetNumberFormat(): string | null;
    GetOrientation(): Angle;
    GetPivotTable(): ApiPivotTable | null;
    GetRange(cell1: string | ApiRange, cell2?: string | ApiRange): ApiRange | null;
    GetRow(): number;
    GetRowHeight(): number;
    GetRows(nRow: number): ApiRange | null;
    GetRowsCount(): number;
    GetText(): string | string[][];
    GetValidation(): ApiValidation;
    GetValue(): string | number | boolean | (string | number | boolean)[][];
    GetValue2(): string | string[][];
    GetWorksheet(): ApiWorksheet;
    GetWrapText(): boolean;
    Insert(shift?: string): void;
    Merge(isAcross: boolean): boolean;
    Offset(rowOffset: number, columnOffset: number): ApiRange | null;
    Paste(rangeFrom: ApiRange): void;
    PasteSpecial(sPasteType?: PasteType, sPasteSpecialOperation?: PasteSpecialOperation, bSkipBlanks?: boolean, bTranspose?: boolean): void;
    Replace(oReplaceData: ReplaceData): boolean;
    Resize(rowSize: number, columnSize: number): ApiRange | null;
    Select(): boolean;
    SetAlignHorizontal(sAlignment: 'left' | 'right' | 'center' | 'justify'): boolean;
    SetAlignVertical(sAlignment: 'center' | 'bottom' | 'top' | 'distributed' | 'justify'): boolean;
    SetAutoFilter(Field?: number | null, Criteria1?: string | string[] | ApiColor | XlDynamicFilterCriteria, Operator?: XlAutoFilterOperator, Criteria2?: string, VisibleDropDown?: boolean): void;
    SetBold(isBold: boolean): boolean;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): boolean;
    SetColumnWidth(nWidth: number): void;
    SetFillColor(color: ApiColor | 'No Fill' | null): boolean;
    SetFontColor(oColor: ApiColor): boolean;
    SetFontName(sName: string): boolean;
    SetFontSize(nSize: number): boolean;
    SetFormulaArray(data: string | boolean | number): boolean;
    SetHidden(isHidden: boolean): boolean;
    SetItalic(isItalic: boolean): boolean;
    SetNumberFormat(sFormat: string): boolean;
    SetOffset(nRow: number, nCol: number): boolean;
    SetOrientation(angle: Angle): void;
    SetReadingOrder(direction: 'context' | 'ltr' | 'rtl'): void;
    SetRowHeight(nHeight: number): boolean;
    SetSort(key1: ApiRange | string, sSortOrder1: SortOrder, key2: ApiRange | string, sSortOrder2: SortOrder, key3: ApiRange | string, sSortOrder3: SortOrder, sHeader: SortHeader, sOrientation: SortOrientation): void;
    SetStrikeout(isStrikeout: boolean): boolean;
    SetUnderline(undelineType: 'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'): boolean;
    SetValue(data: string | boolean | number | (string | boolean | number)[] | (string | boolean | number)[][]): boolean;
    SetWrap(isWrap: boolean): boolean;
    UnMerge(): boolean;
  }

  export interface ApiRangeTextPr {
    GetBold(): boolean;
    GetCaps(): boolean;
    GetClassType(): "textPr";
    GetDoubleStrikeout(): boolean;
    GetFill(): ApiFill;
    GetFontFamily(): string;
    GetFontSize(): hps;
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
    SetItalic(isItalic: boolean): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a small text block called 'run'. */
  export interface ApiRun {
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
  export interface ApiSchemeColor {
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing the selection in the presentation. */
  export interface ApiSelection {
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
    GetClassType(): "shadow";
    GetSettings(): ShadowSettings;
  }

  /** Class representing a shape. */
  export interface ApiShape {
    GetClassType(): "shape";
    GetContent(): ApiDocumentContent;
    GetDocContent(): ApiDocumentContent;
    GetGeometry(): ApiGeometry;
    GetLine(): ApiStroke | null;
    GetParentSheet(): ApiWorksheet;
    GetVerticalTextAlign(): VerticalTextAlign;
    SetGeometry(oGeometry: ApiGeometry): boolean;
    SetLine(oStroke: ApiStroke): boolean;
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm {
  }

  /** Class representing a slide. */
  export interface ApiSlide {
  }

  /** Class representing a slide show transition. */
  export interface ApiSlideShowTransition {
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt {
    GetClassType(): "smartArt";
    GetParentSheet(): ApiWorksheet;
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
  export interface ApiTable {
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
  export interface ApiTableRow {
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
  }

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a tablewhich match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
  }

  /** Class representing a document text field. */
  export interface ApiTextForm {
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
    SetItalic(isItalic: boolean): ApiTextPr;
    SetOutLine(oStroke: ApiStroke): ApiTextPr;
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
    SetSpacing(nSpacing: number): ApiTextPr;
    SetStrikeout(isStrikeout: boolean): ApiTextPr;
    SetTextFill(oApiFill: ApiFill): ApiTextPr;
    SetUnderline(isUnderline: boolean): ApiTextPr;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a text range within a presentation shape's text frame. */
  export interface ApiTextRange {
  }

  /** Class representing a theme. */
  export interface ApiTheme {
    GetClassType(): "theme";
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

  /** Class representing a top 10 conditional formatting rule. */
  export interface ApiTop10 {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetDateOperator(): XlTimePeriods | null;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula1(): string;
    GetFormula2(): string;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPercent(): boolean;
    GetPriority(): number;
    GetRank(): number;
    GetScopeType(): XlPivotConditionScope;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetTopBottom(): XlTopBottom;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPercent(percent: boolean): void;
    SetPriority(Priority: number): void;
    SetRank(rank: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
    SetTopBottom(topBottom: XlTopBottom): void;
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
    GetClassType(): "uniColor";
  }

  /** Class representing a unique values conditional formatting rule. */
  export interface ApiUniqueValues {
    Delete(): void;
    GetAppliesTo(): ApiRange | null;
    GetDateOperator(): XlTimePeriods | null;
    GetDupeUnique(): XlDuplicateValues;
    GetFillColor(): ApiColor | 'No Fill';
    GetFont(): ApiFont | null;
    GetFormula1(): string;
    GetFormula2(): string;
    GetNumberFormat(): string;
    GetOperator(): XlFormatConditionOperator;
    GetPTCondition(): PTCondition | null;
    GetParent(): ApiRange;
    GetPriority(): number;
    GetScopeType(): XlPivotConditionScope;
    GetText(): string;
    GetTextOperator(): XlContainsOperator | null;
    GetType(): XlFormatConditionType;
    Modify(Type?: XlFormatConditionType, Operator?: XlFormatConditionOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiFormatCondition | null;
    ModifyAppliesToRange(Range: ApiRange): void;
    SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
    SetDateOperator(DateOperator: XlTimePeriods): void;
    SetDupeUnique(dupeUnique: XlDuplicateValues): void;
    SetFillColor(oColor: ApiColor): void;
    SetFirstPriority(): void;
    SetLastPriority(): void;
    SetNumberFormat(NumberFormat: string): void;
    SetPriority(Priority: number): void;
    SetScopeType(ScopeType: XlPivotConditionScope): void;
    SetText(Text: string): void;
    SetTextOperator(TextOperator: XlContainsOperator): void;
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
    GetClassType(): "unsupported";
  }

  /** Class representing data validation. */
  export interface ApiValidation {
    Add(Type: ValidationType, AlertStyle?: ValidationAlertStyle, Operator?: ValidationOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiValidation | null;
    Delete(): void;
    GetAlertStyle(): ValidationAlertStyle;
    GetErrorMessage(): string;
    GetErrorTitle(): string;
    GetFormula1(): string;
    GetFormula2(): string;
    GetIgnoreBlank(): boolean;
    GetInCellDropdown(): boolean;
    GetInputMessage(): string;
    GetInputTitle(): string;
    GetOperator(): ValidationOperator;
    GetParent(): ApiRange;
    GetShowError(): boolean;
    GetShowInput(): boolean;
    GetType(): ValidationType;
    Modify(Type?: ValidationType, AlertStyle?: ValidationAlertStyle, Operator?: ValidationOperator, Formula1?: string | number | ApiRange, Formula2?: string | number | ApiRange): ApiValidation | null;
    SetErrorMessage(ErrorMessage: string): void;
    SetErrorTitle(ErrorTitle: string): void;
    SetIgnoreBlank(IgnoreBlank: boolean): void;
    SetInCellDropdown(InCellDropdown: boolean): void;
    SetInputMessage(InputMessage: string): void;
    SetInputTitle(InputTitle: string): void;
    SetShowError(ShowError: boolean): void;
    SetShowInput(ShowInput: boolean): void;
  }

  /** Class representing the settings which are used to create a watermark. */
  export interface ApiWatermarkSettings {
  }

  /** Class representing the currently active workbook */
  export interface ApiWorkbook {
    Calculate(): boolean;
    GetActiveChart(): ApiChart | null;
    GetActiveSheet(): ApiWorksheet;
    GetAllPivotTables(): ApiPivotTable[];
    GetCustomProperties(): ApiCustomProperties;
    GetDrawingsByName(ids: string[]): Drawing[];
    GetName(): string;
    GetSheets(): ApiWorksheet[];
    GetTheme(): ApiTheme;
    Save(): void;
  }

  /** Class representing a sheet. */
  export interface ApiWorksheet {
    AddChart(sDataRange: string, bInRows: boolean, sType: ChartType, nStyleIndex: number, nExtX: number, nExtY: number, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiChart | null;
    AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;
    AddImage(sImageSrc: string, nWidth: number, nHeight: number, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiImage | null;
    AddOleObject(sImageSrc: string, nWidth: number, nHeight: number, sData: string, sAppId: string, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiOleObject | null;
    AddProtectedRange(sTitle: string, sDataRange: string): ApiProtectedRange | null;
    AddShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke, nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): ApiShape | null;
    AddWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nFromCol?: number, nFromRow?: number, nColOffset?: number, nRowOffset?: number): ApiDrawing | null;
    Delete(): boolean;
    FormatAsTable(sRange: string): boolean;
    GetActiveCell(): ApiRange;
    GetAllCharts(): ApiChart[];
    GetAllDrawings(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllPivotTables(): ApiPivotTable[];
    GetAllProtectedRanges(): ApiProtectedRange[] | null;
    GetAllShapes(): ApiShape[];
    GetAutoFilter(): ApiAutoFilter;
    GetBottomMargin(): number;
    GetCells(row: number, col: number): ApiRange | null;
    GetCols(sRange: string): ApiRange;
    GetComments(): ApiComment[];
    GetCustomXmlParts(): ApiCustomXmlParts | null;
    GetDefName(defName: string): ApiName | null;
    GetDefNames(): ApiName[];
    GetFreezePanes(): ApiFreezePanes;
    GetHyperlinks(): ApiHyperlinks;
    GetIndex(): number;
    GetLeftMargin(): number;
    GetName(): string;
    GetPageOrientation(): PageOrientation;
    GetPageSetup(): ApiPageSetup;
    GetPivotByName(name: string): ApiPivotTable | null;
    GetPrintGridlines(): boolean;
    GetPrintHeadings(): boolean;
    GetProtectedRange(sTitle: string): ApiProtectedRange | null;
    GetRange(Range1: string | ApiRange, Range2: string | ApiRange): ApiRange | null;
    GetRangeByNumber(nRow: number, nCol: number): ApiRange;
    GetRightMargin(): number;
    GetRows(value: string | number): ApiRange | null;
    GetSelectedDrawings(): Drawing[];
    GetSelectedShapes(): ApiShape[];
    GetSelection(): ApiRange;
    GetTopMargin(): number;
    GetUsedRange(): ApiRange;
    GetVisible(): boolean;
    GroupDrawings(aDrawings: ApiDrawing[]): ApiGroup | null;
    Move(before: ApiWorksheet, after: ApiWorksheet): void;
    Paste(destination?: ApiRange): void;
    RefreshAllPivots(): void;
    ReplaceCurrentImage(sImageUrl: string, nWidth: number, nHeight: number): boolean;
    SetActive(): boolean;
    SetBottomMargin(nPoints: number): boolean;
    SetColumnWidth(nColumn: number, nWidth: number, bWithotPaddings?: boolean): boolean;
    SetDisplayGridlines(isDisplayed: boolean): boolean;
    SetDisplayHeadings(isDisplayed: boolean): boolean;
    SetHyperlink(sRange: string, sAddress: string, subAddress?: string, sScreenTip?: string, sTextToDisplay?: string): boolean;
    SetLeftMargin(nPoints: number): boolean;
    SetName(sName: string): void;
    SetPageOrientation(sPageOrientation: PageOrientation): boolean;
    SetPrintGridlines(bPrint: boolean): boolean;
    SetPrintHeadings(bPrint: boolean): boolean;
    SetRightMargin(nPoints: number): boolean;
    SetRowHeight(nRow: number, nHeight: number): boolean;
    SetTopMargin(nPoints: number): boolean;
    SetVisible(isVisible: boolean): boolean;
  }

  /** Class representing a worksheet function. */
  export interface ApiWorksheetFunction {
    ABS(arg1: ApiRange | ApiName | number): number;
    ACCRINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number): number;
    ACCRINTM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    ACOS(arg1: ApiRange | ApiName | number): number;
    ACOSH(arg1: ApiRange | ApiName | number): number;
    ACOT(arg1: ApiRange | ApiName | number): number;
    ACOTH(arg1: ApiRange | ApiName | number): number;
    AGGREGATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: number | ApiRange | number[], args: number | ApiRange | number[]): number;
    AMORDEGRC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
    AMORLINC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
    AND(args: number | string | ApiRange | boolean | ApiName): boolean;
    ARABIC(arg1: ApiRange | ApiName | string): number;
    ASC(arg1: ApiRange | ApiName | string): string;
    ASIN(arg1: ApiRange | ApiName | number): number;
    ASINH(arg1: ApiRange | ApiName | number): number;
    ATAN(arg1: ApiRange | ApiName | number): number;
    ATAN2(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    ATANH(arg1: ApiRange | ApiName | number): number;
    AVEDEV(args: ApiRange | ApiName | number | number[]): number;
    AVERAGE(args: ApiRange | ApiName | number | number[]): number;
    AVERAGEA(args: ApiRange | ApiName | number | string | number[]): number;
    AVERAGEIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
    AVERAGEIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;
    BASE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    BESSELI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BESSELJ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BESSELK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BESSELY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BETADIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    BETAINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    BETA_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    BETA_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    BIN2DEC(arg1: ApiRange | ApiName | number): number;
    BIN2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    BIN2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    BINOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    BINOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    BINOM_DIST_RANGE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    BINOM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    BITAND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BITLSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BITOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BITRSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    BITXOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CEILING_MATH(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    CEILING_PRECISE(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    CHAR(arg1: ApiRange | ApiName | number): string;
    CHIDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CHIINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CHISQ_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    CHISQ_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CHISQ_INV(arg1: ApiRange | ApiName | number, arg2_: ApiRange | ApiName | number): number;
    CHISQ_INV_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    CHITEST(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number;
    CHOOSE(arg1: ApiRange | ApiName | number, args: number | string | ApiRange | ApiName): number;
    CLEAN(arg1: ApiRange | ApiName | string): string;
    CODE(arg1: ApiRange | ApiName | string): number;
    COLUMNS(arg1: ApiRange | ApiName | number[]): number;
    COMBIN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    COMBINA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    COMPLEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | string): number;
    CONCATENATE(arg_n: ApiRange | ApiName | string): string;
    CONFIDENCE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    CONFIDENCE_NORM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    CONFIDENCE_T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    CONVERT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string): number;
    COS(arg1: ApiRange | ApiName | number): number;
    COSH(arg1: ApiRange | ApiName | number): number;
    COT(arg1: ApiRange | ApiName | number): number;
    COTH(arg1: ApiRange | ApiName | number): number;
    COUNT(args: string | number | boolean | (string | number | boolean)[] | ApiRange | ApiName): number;
    COUNTA(args: string | number | boolean | (string | number | boolean)[] | ApiRange | ApiName): number;
    COUNTBLANK(arg1: ApiRange | ApiName): number;
    COUNTIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string): number;
    COUNTIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string): number;
    COUPDAYBS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    COUPDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    COUPDAYSNC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    COUPNCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    COUPNUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    COUPPCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    CRITBINOM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    CSC(arg1: ApiRange | ApiName | number): number;
    CSCH(arg1: ApiRange | ApiName | number): number;
    CUMIPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
    CUMPRINC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
    DATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    DATEVALUE(arg1: ApiRange | ApiName | string): number;
    DAVERAGE(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DAY(arg1: ApiRange | ApiName | number): number;
    DAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    DAYS360(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
    DB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    DCOUNT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DCOUNTA(arg1_: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    DEC2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    DEC2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    DEC2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    DECIMAL(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): number;
    DEGREES(arg1: ApiRange | ApiName | number): number;
    DELTA(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    DEVSQ(args: ApiRange | ApiName | number | number[]): number;
    DGET(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    DMAX(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DMIN(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DOLLAR(arg1: ApiRange | ApiName | number | string, arg2?: ApiRange | ApiName | number): string;
    DOLLARDE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    DOLLARFR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    DPRODUCT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DSTDEV(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DSTDEVP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DSUM(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    DVAR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    DVARP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
    ECMA_CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    EDATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    EFFECT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    EOMONTH(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    ERF(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    ERFC(arg1: ApiRange | ApiName | number): number;
    ERFC_PRECISE(arg1: ApiRange | ApiName | number): number;
    ERF_PRECISE(arg1: ApiRange | ApiName | number): number;
    ERROR_TYPE(arg1: ErrorValue | ApiRange | ApiName): number;
    EVEN(arg1: ApiRange | ApiName | number): number;
    EXACT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string): boolean;
    EXP(arg1: ApiRange | ApiName | number): number;
    EXPONDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    EXPON_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    FACT(arg1: ApiRange | ApiName | number): number;
    FACTDOUBLE(arg1: ApiRange | ApiName | number): number;
    FALSE(): boolean;
    FDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    FIND(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
    FINDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
    FINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    FISHER(arg1: ApiRange | ApiName | number): number;
    FISHERINV(arg1: ApiRange | ApiName | number): number;
    FIXED(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): string;
    FLOOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    FLOOR_MATH(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    FLOOR_PRECISE(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    FORECAST_ETS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    FORECAST_ETS_CONFINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
    FORECAST_ETS_SEASONALITY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
    FORECAST_ETS_STAT(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    FREQUENCY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number[]): number;
    FV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    FVSCHEDULE(arg1: ApiRange | ApiName | number, arg2: number[] | ApiRange | ApiName): number;
    F_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    F_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    F_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    F_INV_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    GAMMA(arg1: ApiRange | ApiName | number): number;
    GAMMADIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    GAMMAINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    GAMMALN(arg1: ApiRange | ApiName | number): number;
    GAMMALN_PRECISE(arg1: ApiRange | ApiName | number): number;
    GAMMA_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    GAMMA_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    GAUSS(arg1: ApiRange | ApiName | number): number;
    GCD(args: ApiRange | ApiName | number): number;
    GEOMEAN(args: ApiRange | number[] | ApiName): number;
    GESTEP(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    GROWTH(arg1: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;
    HARMEAN(args: ApiRange | number[] | ApiName): number;
    HEX2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    HEX2DEC(arg1: ApiRange | ApiName | number): number;
    HEX2OCT(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    HLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;
    HOUR(arg1: ApiRange | ApiName | number | string): number;
    HYPERLINK(arg1: string | ApiRange | ApiName, arg2?: string | ApiRange | number | ApiName): string;
    HYPGEOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
    HYPGEOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | boolean): number;
    IF(arg1: number | string | ApiRange | ApiName | boolean, arg2: number | string | ApiRange | ApiName | boolean, arg3?: ApiRange | ApiName | number | string | boolean): number | string | boolean;
    IFERROR(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number | string | boolean;
    IFNA(arg1: ApiRange | ApiName | number | string | boolean, arg2: ApiRange | ApiName | number | string | boolean): number | string | boolean;
    IMABS(arg1: ApiRange | ApiName | number): number;
    IMAGINARY(arg1: ApiRange | ApiName | number): number;
    IMARGUMENT(arg1: ApiRange | ApiName | number): number;
    IMCONJUGATE(arg1: ApiRange | ApiName | number): number;
    IMCOS(arg1: ApiRange | ApiName | number): number;
    IMCOSH(arg1: ApiRange | ApiName | number): number;
    IMCOT(arg1: ApiRange | ApiName | number): number;
    IMCSC(arg1: ApiRange | ApiName | number): number;
    IMCSCH(arg1: ApiRange | ApiName | number): number;
    IMDIV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    IMEXP(arg1: ApiRange | ApiName | number): number;
    IMLN(arg1: ApiRange | ApiName | number): number;
    IMLOG10(arg1: ApiRange | ApiName | number): number;
    IMLOG2(arg1: ApiRange | ApiName | number): number;
    IMPOWER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    IMPRODUCT(args: ApiRange | ApiName | string): number;
    IMREAL(arg1: ApiRange | ApiName | number): number;
    IMSEC(arg1: ApiRange | ApiName | number): number;
    IMSECH(arg1: ApiRange | ApiName | number): number;
    IMSIN(arg1: ApiRange | ApiName | number): number;
    IMSINH(arg1: ApiRange | ApiName | number): number;
    IMSQRT(arg1: ApiRange | ApiName | number): number;
    IMSUB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    IMSUM(args: ApiRange | ApiName | string): number;
    IMTAN(arg1: ApiRange | ApiName | number): number;
    INDEX(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number | string;
    INT(arg1: ApiRange | ApiName | number): number;
    INTRATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    IPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    IRR(arg1: number[] | ApiRange, arg2?: ApiRange | ApiName | number): number;
    ISERR(arg1: number | string | boolean | ApiRange | ApiName): boolean;
    ISERROR(arg1: number | string | boolean | ApiRange | ApiName): boolean;
    ISEVEN(arg1: ApiRange | ApiName | number): boolean;
    ISFORMULA(arg1: ApiRange | ApiName): boolean;
    ISLOGICAL(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    ISNA(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    ISNONTEXT(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    ISNUMBER(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    ISODD(arg1: ApiRange | ApiName | number): boolean;
    ISOWEEKNUM(arg1: ApiRange | ApiName | number): number;
    ISO_CEILING(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    ISPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
    ISREF(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    ISTEXT(arg1: ApiRange | string | number | boolean | ApiName): boolean;
    KURT(args: ApiRange | number[] | ApiName): number;
    LARGE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    LCM(args: ApiRange | ApiName | number): number;
    LEFT(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
    LEFTB(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
    LEN(arg1: ApiRange | ApiName | string): number;
    LENB(arg1: ApiRange | ApiName | string): number;
    LINEST(arg1: ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;
    LN(arg1: ApiRange | ApiName | number): number;
    LOG(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    LOG10(arg1: ApiRange | ApiName | number): number;
    LOGEST(arg1: ApiRange | ApiName | ApiRange, arg2?: ApiRange | ApiName | ApiRange, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;
    LOGINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    LOGNORMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    LOGNORM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    LOGNORM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    LOOKUP(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName): number | string | boolean;
    LOWER(arg1: ApiRange | ApiName | string): string;
    MATCH(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName | (number | string | boolean)[], arg3?: ApiRange | ApiName | number): number;
    MAX(args: number | number[] | ApiRange | ApiName): number;
    MAXA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;
    MDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    MEDIAN(args: number | number[] | ApiRange | ApiName): number;
    MID(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;
    MIDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;
    MIN(args: number | number[] | ApiRange | ApiName): number;
    MINA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;
    MINUTE(arg1: ApiRange | ApiName | number | string): number;
    MIRR(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    MOD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    MONTH(arg1_: ApiRange | ApiName | number): number;
    MROUND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    MULTINOMIAL(args: ApiRange | ApiName | number): number;
    MUNIT(arg1: ApiRange | ApiName | number): number;
    N(arg1: ApiRange | ApiName | number | string | boolean): number;
    NA(): string;
    NEGBINOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    NEGBINOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    NETWORKDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | number[]): number;
    NETWORKDAYS_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | number[]): number;
    NOMINAL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    NORMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    NORMINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    NORMSDIST(arg1: ApiRange | ApiName | number): number;
    NORMSINV(arg1: ApiRange | ApiName | number): number;
    NORM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    NORM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    NORM_S_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | boolean): number;
    NORM_S_INV(arg1: ApiRange | ApiName | number): number;
    NOT(arg1: ApiRange | ApiName | number | string | boolean): boolean;
    NOW(): number;
    NPER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    NPV(arg1: ApiRange | ApiName | number, args: number | ApiRange | number[]): number;
    NUMBERVALUE(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | string): number;
    OCT2BIN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    OCT2DEC(arg1: ApiRange | ApiName | number): number;
    OCT2HEX(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    ODD(arg1: ApiRange | ApiName | number): number;
    ODDFPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
    ODDFYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
    ODDLPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg5_2: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
    ODDLYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg6_2: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
    OR(args: number | string | ApiRange | ApiName | boolean): boolean;
    PDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    PERCENTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    PERCENTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    PERCENTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    PERCENTRANK(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    PERCENTRANK_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    PERCENTRANK_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    PERMUT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    PERMUTATIONA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    PHI(arg1: ApiRange | ApiName | number): number;
    PI(): number;
    PMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    POISSON(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    POISSON_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    POWER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    PPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    PRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
    PRICEDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    PRICEMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    PRODUCT(args: number | ApiRange | number[]): number;
    PROPER(arg1: ApiRange | ApiName | string): string;
    PV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    QUARTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    QUARTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    QUARTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    QUOTIENT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    RADIANS(arg1: ApiRange | ApiName | number): number;
    RAND(): number;
    RANDBETWEEN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    RANK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
    RANK_AVG(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
    RANK_EQ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
    RATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    RECEIVED(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    REPLACE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;
    REPLACEB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;
    REPT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
    RIGHT(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
    RIGHTB(arg1: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
    ROMAN(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): string;
    ROUND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    ROUNDDOWN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    ROUNDUP(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    ROWS(arg1: ApiRange | ApiName | (number | string | boolean)[]): number;
    RRI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    SEARCH(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
    SEARCHB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
    SEC(arg1: ApiRange | ApiName | number): number;
    SECH(arg1: ApiRange | ApiName | number): number;
    SECOND(arg1: ApiRange | ApiName | number | string): number;
    SERIESSUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
    SHEET(arg1?: string | ApiRange | ApiName): number;
    SHEETS(arg1?: ApiRange | ApiName): number;
    SIGN(arg1: ApiRange | ApiName | number): number;
    SIN(arg1: ApiRange | ApiName | number): number;
    SINH(arg1: ApiRange | ApiName | number): number;
    SKEW(args: number | ApiName | number[] | ApiRange): number;
    SKEW_P(args: number | ApiName | number[] | ApiRange): number;
    SLN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    SMALL(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    SQRT(arg1: ApiRange | ApiName | number): number;
    SQRTPI(arg1: ApiRange | ApiName | number): number;
    STANDARDIZE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    STDEV(args: number[] | number | ApiName | ApiRange): number;
    STDEVA(args: number[] | number | string | boolean | ApiRange | ApiName): number;
    STDEVP(args: number[] | number | ApiName | ApiRange): number;
    STDEVPA(args: number[] | number | string | boolean | ApiRange | ApiName): number;
    STDEV_P(args: number[] | number | ApiName | ApiRange): number;
    STDEV_S(args: number[] | number | ApiName | ApiRange): number;
    SUBSTITUTE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string, arg4?: ApiRange | ApiName | string): string;
    SUBTOTAL(arg1: ApiRange | ApiName | number, args: ApiRange | ApiName): number;
    SUM(args: ApiRange | ApiName | string | number | boolean | (string | number | boolean)[]): number;
    SUMIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
    SUMIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;
    SUMSQ(args: ApiRange | ApiName | number | string | boolean | (number | string | boolean)[]): number;
    SYD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
    T(arg1: ApiRange | ApiName | number | string | boolean): ApiRange | ApiName | string;
    TAN(arg1: ApiRange | ApiName | number): number;
    TANH(arg1: ApiRange | ApiName | number): number;
    TBILLEQ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    TBILLPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    TBILLYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    TDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    TEXT(arg1: ApiRange | ApiName | number | string, arg2: ApiRange | ApiName | string): string;
    TIME(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
    TIMEVALUE(arg1: ApiRange | ApiName | string): number;
    TINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    TODAY(): number;
    TRANSPOSE(arg1: ApiRange | ApiName | (number | string | boolean)[]): ApiRange;
    TREND(arg1: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;
    TRIM(arg1: ApiRange | ApiName | string): string;
    TRIMMEAN(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
    TRUE(): boolean;
    TRUNC(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    TYPE(arg1: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;
    T_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
    T_DIST_2T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    T_DIST_RT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    T_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    T_INV_2T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
    UNICHAR(arg1: ApiRange | ApiName | number): string;
    UNICODE(arg1: ApiRange | ApiName | string): number;
    UPPER(arg1: ApiRange | ApiName | string): string;
    VALUE(arg1: ApiRange | ApiName | string): number;
    VAR(args: number | ApiName | ApiRange | number[]): number;
    VARA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;
    VARP(args: number | ApiName | ApiRange | number[]): number;
    VARPA(args: number | string | boolean | (number | string | boolean)[] | ApiRange | ApiName): number;
    VAR_P(args: number | ApiName | ApiRange | number[]): number;
    VAR_S(args: number | ApiName | ApiRange | number[]): number;
    VDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | boolean): number;
    VLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;
    WEEKDAY(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    WEEKNUM(arg1: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
    WEIBULL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    WEIBULL_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
    WORKDAY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number[]): number;
    WORKDAY_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | ApiName | number[]): number;
    XIRR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName, arg3?: ApiRange | ApiName | number): number;
    XNPV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName): number;
    XOR(args: ApiRange | ApiName | boolean | boolean[]): boolean;
    YEAR(arg1: ApiRange | ApiName | number): number;
    YEARFRAC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
    YIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
    YIELDDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
    YIELDMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
    ZTEST(arg1: number[] | ApiRange | ApiName, arg2: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
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
