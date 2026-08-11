// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: slide

export namespace Slide {
  /** Animation effect type. */
  export type AnimationEffectType = "entranceAppear" | "entranceFade" | "entranceFlyIn" | "entranceFloatIn" | "entranceSplit" | "entranceWipe" | "entranceCircle" | "entranceBox" | "entranceDiamond" | "entrancePlus" | "entranceWheel" | "entranceRandomBars" | "entranceGrowAndTurn" | "entranceZoom" | "entranceSwivel" | "entranceBounce" | "entranceBlinds" | "entranceCheckerboard" | "entrancePeekIn" | "entranceStrips" | "entranceExpand" | "entranceRiseUp" | "entranceCenterRevolve" | "entranceSpinner" | "entranceFloatUp" | "entranceFloatDown" | "entranceSpiralIn" | "entranceWedge" | "entranceDissolveIn" | "entrancePinwheel" | "exitDisappear" | "exitFadeOut" | "exitFlyOut" | "exitFloatOut" | "exitSplitOut" | "exitWipeOut" | "exitCircleOut" | "exitBoxOut" | "exitDiamondOut" | "exitPlusOut" | "exitWheelOut" | "exitRandomBarsOut" | "exitShrinkAndTurn" | "exitZoomOut" | "exitSwivelOut" | "exitBounceOut" | "exitSpiralOut" | "exitCollapse" | "emphasisPulse" | "emphasisColorPulse" | "emphasisTeeter" | "emphasisSpin" | "emphasisGrowShrink" | "emphasisDesaturate" | "emphasisDarken" | "emphasisLighten" | "emphasisTransparency" | "emphasisObjectColor" | "emphasisComplementaryColor" | "emphasisLineColor" | "emphasisFillColor" | "emphasisFontColor" | "emphasisBlink" | "emphasisShimmer" | "emphasisWave" | "pathCircle" | "pathSquare" | "pathDiamond" | "pathHeart" | "pathStar" | "pathHexagon" | "pathOctagon" | "pathRight" | "pathLeft" | "pathUp" | "pathDown";

  /** Animation trigger type. */
  export type AnimationTriggerType = "onclick" | "withprevious" | "afterprevious";

  /** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "slide"} let copyTextForm = textForm.Copy(); ``` */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetAxieNumFormat("top", "0.00"); ``` */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "slide"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
  export type BorderType = "none" | "single";

  /** A bullet type which will be added to the paragraph in spreadsheet or presentation.  ## Try it   ```js document-builder={"documentType": "slide"} // The paragraph will be starting with the Arabic numeral which has parenthesis let bullet = Api.CreateNumbering("ArabicParenR"); ``` */
  export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

  /** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "slide"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
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

  /** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "slide"} let commentsReport = oDocument.GetCommentsReport(); ``` */
  export interface CommentReport {
    username?: UserComments;
  }

  /** Record of one comment.  ## Try it   ```js document-builder={"documentType": "slide"} let commentsReport = oDocument.GetCommentsReport(); ``` */
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

  /** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "slide"} doc.AddElement(paragraph); ``` */
  export type DocumentElement = ApiParagraph;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiTable | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "slide"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available slide transition effects (similar to PowerPoint VBA ppEffect). */
  export type EntryEffect = "effectAppear" | "effectBlindsHorizontal" | "effectBlindsVertical" | "effectBoxDown" | "effectBoxIn" | "effectBoxLeft" | "effectBoxOut" | "effectBoxRight" | "effectBoxUp" | "effectCheckerboardAcross" | "effectCheckerboardDown" | "effectCircleOut" | "effectCombHorizontal" | "effectCombVertical" | "effectConveyorLeft" | "effectConveyorRight" | "effectCoverDown" | "effectCoverLeft" | "effectCoverLeftDown" | "effectCoverLeftUp" | "effectCoverRight" | "effectCoverRightDown" | "effectCoverRightUp" | "effectCoverUp" | "effectCubeDown" | "effectCubeLeft" | "effectCubeRight" | "effectCubeUp" | "effectCut" | "effectCutThroughBlack" | "effectDiamondOut" | "effectDissolve" | "effectDoorsHorizontal" | "effectDoorsVertical" | "effectFade" | "effectFadeSmoothly" | "effectFerrisWheelLeft" | "effectFerrisWheelRight" | "effectFlashbulb" | "effectFlipDown" | "effectFlipLeft" | "effectFlipRight" | "effectFlipUp" | "effectFlyThroughIn" | "effectFlyThroughInBounce" | "effectFlyThroughOut" | "effectFlyThroughOutBounce" | "effectGalleryLeft" | "effectGalleryRight" | "effectGlitterDiamondDown" | "effectGlitterDiamondLeft" | "effectGlitterDiamondRight" | "effectGlitterDiamondUp" | "effectGlitterHexagonDown" | "effectGlitterHexagonLeft" | "effectGlitterHexagonRight" | "effectGlitterHexagonUp" | "effectHoneycomb" | "effectNewsflash" | "effectOrbitDown" | "effectOrbitLeft" | "effectOrbitRight" | "effectOrbitUp" | "effectPanDown" | "effectPanLeft" | "effectPanRight" | "effectPanUp" | "effectPlusOut" | "effectPushDown" | "effectPushLeft" | "effectPushRight" | "effectPushUp" | "effectRandom" | "effectRandomBarsHorizontal" | "effectRandomBarsVertical" | "effectRevealBlackLeft" | "effectRevealBlackRight" | "effectRevealSmoothLeft" | "effectRevealSmoothRight" | "effectRippleCenter" | "effectRippleLeftDown" | "effectRippleLeftUp" | "effectRippleRightDown" | "effectRippleRightUp" | "effectRotateDown" | "effectRotateLeft" | "effectRotateRight" | "effectRotateUp" | "effectShredRectangleIn" | "effectShredRectangleOut" | "effectShredStripsIn" | "effectShredStripsOut" | "effectSplitHorizontalIn" | "effectSplitHorizontalOut" | "effectSplitVerticalIn" | "effectSplitVerticalOut" | "effectStripsDownLeft" | "effectStripsDownRight" | "effectStripsLeftDown" | "effectStripsLeftUp" | "effectStripsRightDown" | "effectStripsRightUp" | "effectStripsUpLeft" | "effectStripsUpRight" | "effectSwitchDown" | "effectSwitchLeft" | "effectSwitchRight" | "effectSwitchUp" | "effectUncoverDown" | "effectUncoverLeft" | "effectUncoverLeftDown" | "effectUncoverLeftUp" | "effectUncoverRight" | "effectUncoverRightDown" | "effectUncoverRightUp" | "effectUncoverUp" | "effectVortexDown" | "effectVortexLeft" | "effectVortexRight" | "effectVortexUp" | "effectWarpIn" | "effectWarpOut" | "effectWedge" | "effectWheel1Spoke" | "effectWheel2Spokes" | "effectWheel3Spokes" | "effectWheel4Spokes" | "effectWheel8Spokes" | "effectWheelReverse1Spoke" | "effectWindowHorizontal" | "effectWindowVertical" | "effectWipeDown" | "effectWipeLeft" | "effectWipeRight" | "effectWipeUp" | "effectNone" | "effectCrawlFromDown" | "effectCrawlFromLeft" | "effectCrawlFromRight" | "effectCrawlFromUp" | "effectFlashOnceFast" | "effectFlashOnceMedium" | "effectFlashOnceSlow" | "effectFlyFromBottom" | "effectFlyFromBottomLeft" | "effectFlyFromBottomRight" | "effectFlyFromLeft" | "effectFlyFromRight" | "effectFlyFromTop" | "effectFlyFromTopLeft" | "effectFlyFromTopRight" | "effectMixed" | "effectPeekFromDown" | "effectPeekFromLeft" | "effectPeekFromRight" | "effectPeekFromUp" | "effectSpiral" | "effectStretchAcross" | "effectStretchDown" | "effectStretchLeft" | "effectStretchRight" | "effectStretchUp" | "effectSwivel" | "effectZoomBottom" | "effectZoomCenter" | "effectZoomIn" | "effectZoomInSlightly" | "effectZoomOut" | "effectZoomOutSlightly";

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Form data.  ## Try it   ```js document-builder={"documentType": "slide"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
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

  /** The specific form type.  ## Try it   ```js document-builder={"documentType": "slide"} let formsData = doc.GetFormsData(); ``` */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "slide"} let formType = textForm.GetFormType(); ``` */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** The coordinate value for the geometry paths. Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "slide"} let docContent = finalSection.RemoveHeader("title"); ``` */
  export type HdrFtrType = "default" | "title" | "even";

  /** Available layout types. */
  export type LayoutType = "blank" | "chart" | "chartAndTx" | "clipArtAndTx" | "clipArtAndVertTx" | "cust" | "dgm" | "fourObj" | "mediaAndTx" | "obj" | "objAndTwoObj" | "objAndTx" | "objOnly" | "objOverTx" | "objTx" | "picTx" | "secHead" | "tbl" | "title" | "titleOnly" | "twoColTx" | "twoObj" | "twoObjAndObj" | "twoObjAndTx" | "twoObjOverTx" | "twoTxTwoObj" | "tx" | "txAndChart" | "txAndClipArt" | "txAndMedia" | "txAndObj" | "txAndTwoObj" | "txOverObj" | "vertTitleAndTx" | "vertTitleAndTxOverChart" | "vertTx";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "slide"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddElement(run, 0); ``` */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "slide"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** Available placeholder types. */
  export type PlaceholderType = "body" | "chart" | "clipArt" | "ctrTitle" | "diagram" | "date" | "footer" | "header" | "media" | "object" | "picture" | "sldImage" | "sldNumber" | "subTitle" | "table" | "title";

  /** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "slide"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "slide"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
  export type PositivePercentage = number;

  /** The available preset color names.  ## Try it   ```js document-builder={"documentType": "slide"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetHorAlign("page", "center"); ``` */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetVerAlign("page", "center"); ``` */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
  export interface ReviewReport {
    username?: UserReviewChanges;
  }

  /** Record of one review change.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export interface ReviewReportRecord {
    Type: ReviewReportRecordType;
    Value?: string;
    Date: number;
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "slide"} pictureForm.SetScaleFlag("tooBig"); ``` */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "slide"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "slide"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
  export type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

  /** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
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

  /** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "slide"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    Type: ShdType;
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "slide"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
  export type ShdType = "nil" | "clear";

  /** The possible values for the base which the relative horizontal size of an object will be calculated from. */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical size of an object will be calculated from. */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "slide"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Types of custom tab.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
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

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "slide"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "slide"} tableCell.SetWidth("twips", 2000); ``` */
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

  /** Text transform type.  ## Try it   ```js document-builder={"documentType": "slide"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - set the position of the selected tick labels next to the main label. <b>"low"</b> - set the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - set the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The available types of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetVertAxisMajorTickMark("cross"); ``` */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    HtmlHeadings?: boolean;
    Base64img?: boolean;
    DemoteHeadings?: boolean;
    RenderHTMLTags?: boolean;
  }

  /** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "slide"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocBuildFromPr {
    OutlineLvlStart?: number;
    OutlineLvls?: number;
    StylesLvls: TocStyleLvl[];
  }

  /** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "slide"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "slide"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: TocBuildFromPr;
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "slide"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "slide"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocStyleLvl {
    Name: string;
    Lvl: number;
  }

  /** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "slide"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
  export interface TofPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: CaptionLabel | string;
    LabelNumber?: boolean;
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "slide"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
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

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetVerticalTextAlign("top"); ``` */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction.  ## Try it   ```js document-builder={"documentType": "slide"} watermarkSettings.SetDirection("clockwise45"); ``` */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type.  ## Try it   ```js document-builder={"documentType": "slide"} watermarkSettings.SetType("text"); ``` */
  export type WatermarkType = "none" | "text" | "image";

  /** This element specifies the information which shall be used to establish a mapping to an XML element stored within a Custom XML. */
  export interface XmlMapping {
    prefixMapping: string;
    xpath: string;
    storeItemID: string;
  }

  /** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "slide"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.SetHighlight("green"); ``` */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "slide"} textPr.SetFontSize(22); ``` */
  export type hps = number;

  /** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetSpacingLine(240, "auto"); ``` */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "slide"} textForm.SetCellWidth(7); ``` */
  export type mm = number;

  /** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "slide"} pictureForm.SetPicturePosition(70, 70); ``` */
  export type percentage = number;

  /** A point.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.SetEqualColumns(2, 720); ``` */
  export type twips = number;

  export interface Api {
    CentimetersToPoints(cm: number): number;
    Color(r: number | string | number | SchemeColorId | PresetColor, g?: number, b?: number, a?: number): ApiColor;
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
    CreateBullet(sSymbol: string): ApiBullet;
    CreateChart(sType?: ChartType, aSeries?: number[][], aSeriesNames?: number[] | string[], aCatNames?: number[] | string[], nWidth?: number, nHeight?: number, nStyleIndex?: number, aNumFormats?: NumFormat[] | string[]): ApiChart;
    CreateCustomGeometry(): ApiGeometry;
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;
    CreateGroup(drawings: DrawingForGroup[]): ApiGroup;
    CreateHyperlink(link: string, tooltip: string): ApiHyperlink;
    CreateImage(sImageSrc: string, nWidth: number, nHeight: number): ApiImage;
    CreateLayout(oMaster?: ApiMaster): ApiLayout;
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;
    CreateMaster(oTheme?: ApiTheme): ApiMaster;
    CreateMath(text: string, format?: "unicode" | "latex" | "mathml"): ApiMath;
    CreateNoFill(): ApiFill;
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;
    CreateOleObject(sImageSrc: string, nWidth: number, nHeight: number, sData: string, sAppId: string): ApiOleObject;
    CreateParagraph(): ApiParagraph;
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;
    CreatePlaceholder(sType: string): ApiPlaceholder;
    CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
    CreatePresetGeometry(preset?: ShapeType): ApiGeometry;
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;
    CreateRun(): ApiRun;
    CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
    CreateShadow(settings: ShadowSettings): ApiShadow;
    CreateShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke): ApiShape;
    CreateSlide(): ApiSlide;
    CreateSlideShowTransition(): ApiSlideShowTransition;
    CreateSolidFill(color: ApiColor): ApiFill;
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;
    CreateTable(rows: unknown, cols: unknown): ApiTable;
    CreateTableRowPr(): ApiTableRowPr;
    CreateTextPr(): ApiTextPr;
    CreateTheme(sName: string, oMaster: ApiMaster, oClrScheme: ApiThemeColorScheme, oFormatScheme: ApiThemeFormatScheme, oFontScheme: ApiThemeFontScheme): ApiTheme | null;
    CreateThemeColorScheme(arrColors: ApiUniColor[] | ApiRGBColor[] | ApiColor[], sName: string): ApiThemeColorScheme;
    CreateThemeFontScheme(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string, sName: string): ApiThemeFontScheme;
    CreateThemeFormatScheme(arrFill: ApiFill[], arrBgFill: ApiFill[], arrLine: ApiStroke[], sName: string): ApiThemeFormatScheme;
    CreateWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nIndLeft?: number, nIndTop?: number): ApiDrawing;
    EmusToMillimeters(emu: number): number;
    EmusToPoints(emu: number): number;
    FromJSON(sMessage: object): void;
    GetFullName(): string;
    GetPresentation(): ApiPresentation;
    GetSelection(): ApiSelection;
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
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;
    Save(): void;
    ThemeColor(name?: SchemeColorId): ApiColor;
    TwipsToPoints(twips: number): number;
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): void;
    detachEvent(eventName: string): void;
  }

  /** Class representing an animation effect. */
  export interface ApiAnimationEffect {
    Delete(): boolean;
    GetClassType(): "animationEffect";
    GetDelay(): number;
    GetDuration(): number;
    GetEffectType(): AnimationEffectType | null;
    GetRepeatCount(): number;
    GetShape(): ApiDrawing | null;
    GetTriggerType(): AnimationTriggerType;
    MoveTo(index: number): boolean;
    SetDelay(delay: number): boolean;
    SetDuration(duration: number): boolean;
    SetRepeatCount(count: number): boolean;
    SetTriggerType(trigger: AnimationTriggerType): boolean;
  }

  /** Class representing an animation sequence (main sequence or interactive sequence). */
  export interface ApiAnimationSequence {
    AddEffect(drawing: ApiDrawing, effectType: AnimationEffectType, trigger?: AnimationTriggerType): ApiAnimationEffect | null;
    GetClassType(): "animationSequence";
    GetCount(): number;
    GetEffect(index: number): ApiAnimationEffect | null;
    RemoveAllEffects(): boolean;
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

  /** Class representing a chart. */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "SetTitle" | "GetTitle" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    ApplyChartStyle(nStyleId: unknown): boolean;
    CreateTextRange(): ApiTextRange | null;
    GetAllSeries(): ApiChartSeries[];
    GetChartType(): ChartTypeLegacy;
    GetClassType(): "chart";
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetSeries(nIdx: number): ApiChartSeries;
    GetTextRange(): ApiTextRange | null;
    GetTitle(): string | null;
    GetType(): ChartType;
    IsTextRange(): boolean;
    RemoveSeria(nSeria: number): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetAxisNumFormat(sFormat: NumFormat | string, sAxisPos: AxisPos): boolean;
    SetCategoryName(sName: string, nCategory: number): boolean;
    SetDataLabelsTextPr(textPr: ApiTextPr): boolean;
    SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
    SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;
    SetHorAxisLabelsFontSize(nFontSize: number): boolean;
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;
    SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
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
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPlotAreaFill(oFill: ApiFill): boolean;
    SetPlotAreaOutLine(oStroke: ApiStroke): boolean;
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
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

  /** Class representing a comment. */
  export interface ApiComment {
    AddReply(sText: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;
    Delete(): boolean;
    GetAuthorName(): string;
    GetClassType(): "comment";
    GetPosition(): object;
    GetQuoteText(): number;
    GetRepliesCount(): number;
    GetText(): string;
    GetTime(): number;
    GetTimeUTC(): number;
    GetUserId(): string;
    IsSolved(): boolean;
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): ApiComment;
    SetAuthorName(sAuthorName: string): ApiComment;
    SetPosition(x: number, y: number): void;
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
    SetAuthorName(sAuthorName: string): ApiCommentReply;
    SetText(sText: string): ApiCommentReply;
    SetUserId(sUserId: string): ApiCommentReply;
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
  export interface ApiDateForm extends ApiFormBase {
  }

  /** Class representing a document. */
  export interface ApiDocument extends Omit<ApiDocumentContent, "GetClassType" | "GetInternalId" | "GetElementsCount" | "GetElement" | "AddElement" | "Push" | "RemoveAllElements" | "RemoveElement" | "GetAllParagraphs" | "GetText" | "SetText" | "GetCurrentParagraph" | "GetCurrentRun" | "AddText"> {
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
    Copy(): ApiDrawing;
    CreateTextRange(): ApiTextRange | null;
    Delete(): boolean;
    Fill(oFill: ApiFill): boolean;
    GetClassType(): "drawing";
    GetDescription(): string | null;
    GetFill(): ApiFill | null;
    GetFlipH(): boolean | null;
    GetFlipV(): boolean | null;
    GetHeight(): number;
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetLine(): ApiStroke | null;
    GetLockAspect(): boolean;
    GetLockValue(sType: DrawingLockType): boolean;
    GetName(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetRotation(): number;
    GetShadow(): ApiShadow | null;
    GetTextRange(): ApiTextRange | null;
    GetTitle(): string | null;
    GetWidth(): number;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    Select(isReplace?: boolean): boolean;
    SetDescription(description: string): boolean;
    SetFlipH(bFlip: boolean): boolean;
    SetFlipV(bFlip: boolean): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetLockAspect(bAspect: boolean): boolean;
    SetLockValue(sType: DrawingLockType, bValue: boolean): boolean;
    SetName(name: string): boolean;
    SetOutLine(stroke: ApiStroke): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
    SetRotation(nRotAngle: number): boolean;
    SetShadow(shadow: ApiShadow): boolean;
    SetSize(nWidth: number, nHeight: number): boolean;
    SetTitle(title: string): boolean;
    ToJSON(): object;
    Unselect(): boolean;
  }

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into a separate framed paragraph. */
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
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    CreateTextRange(): ApiTextRange | null;
    GetClassType(): "group";
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetTextRange(): ApiTextRange | null;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
    Ungroup(): ApiDrawing[] | null;
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
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    CreateTextRange(): ApiTextRange | null;
    GetClassType(): "image";
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetTextRange(): ApiTextRange | null;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a slide layout. */
  export interface ApiLayout {
    AddObject(oDrawing: ApiDrawing): boolean;
    ClearBackground(): boolean;
    Copy(): ApiLayout | null;
    Delete(): boolean;
    Duplicate(nPos?: number): ApiLayout | null;
    FollowMasterBackground(): boolean;
    GetAllCharts(): ApiChart[];
    GetAllDrawings(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllShapes(): ApiShape[];
    GetAllTables(): ApiTable[];
    GetBackground(): ApiFill | null;
    GetClassType(): "layout";
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
    GetLayoutType(): LayoutType;
    GetMaster(): ApiMaster;
    GetName(): string;
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
    MoveTo(nPos: number): boolean;
    RemoveObject(nPos: number, nCount?: number): boolean;
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];
    SetBackground(oApiFill: ApiFill): boolean;
    SetName(sName: string): boolean;
    ToJSON(bWriteMaster?: boolean, bWriteTableStyles?: boolean): object;
  }

  /** Class representing a slide master. */
  export interface ApiMaster {
    AddLayout(nPos?: number, oLayout?: ApiLayout): boolean;
    AddObject(oDrawing: ApiDrawing): boolean;
    ClearBackground(): boolean;
    Copy(): ApiMaster | null;
    Delete(): boolean;
    Duplicate(nPos?: number): ApiMaster | null;
    GetAllCharts(): ApiChart[];
    GetAllDrawings(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllLayouts(): ApiLayout[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllShapes(): ApiShape[];
    GetAllTables(): ApiTable[];
    GetBackground(): ApiFill | null;
    GetClassType(): "master";
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
    GetLayout(nPos: number): ApiLayout | null;
    GetLayoutByType(sType: LayoutType): ApiLayout | null;
    GetLayoutsCount(): number;
    GetTheme(): ApiTheme | null;
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
    RemoveLayout(nPos: number, nCount?: number): boolean;
    RemoveObject(nPos: number, nCount?: number): boolean;
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];
    SetBackground(oApiFill: ApiFill): boolean;
    SetTheme(oTheme: ApiTheme): boolean;
    ToJSON(bWriteTableStyles?: boolean): object;
  }

  /** Class representing a mathematical equation. */
  export interface ApiMath {
    GetClassType(): "math";
    GetText(format?: "unicode" | "latex"): string;
  }

  /** Class representing a notes page. */
  export interface ApiNotesPage {
    AddBodyShapeText(sText: string): boolean;
    GetBodyShape(): ApiShape | null;
    GetBodyShapeText(): string;
    GetClassType(): "notesPage";
    GetTheme(): ApiTheme | null;
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an OLE object. */
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    CreateTextRange(): ApiTextRange | null;
    GetApplicationId(): string;
    GetClassType(): "oleObject";
    GetData(): string;
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetTextRange(): ApiTextRange | null;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetApplicationId(sAppId: string): boolean;
    SetData(sData: string): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
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
    SetColor(color: ApiColor): ApiParagraph;
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

  /** Class representing a placeholder. */
  export interface ApiPlaceholder {
    GetClassType(): "placeholder";
    GetIndex(): number | undefined;
    GetType(): PlaceholderType;
    SetIndex(nIdx: number): boolean;
    SetType(sType: PlaceholderType): boolean;
  }

  /** Class representing a presentation. */
  export interface ApiPresentation {
    AddMaster(pos?: number, apiMaster?: ApiMaster): boolean;
    AddMathEquation(sText: string, sFormat: string): boolean;
    AddSlide(oSlide: ApiSlide, nIndex: number): void;
    ApplyTheme(oApiTheme: ApiTheme): boolean;
    CreateNewHistoryPoint(): void;
    EnterText(sText: string): boolean;
    GetActiveShape(): ApiShape | null;
    GetActiveTable(): ApiTable | null;
    GetAllCharts(): ApiChart[];
    GetAllComments(): ApiComment[];
    GetAllDrawings(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllShapes(): ApiShape[];
    GetAllSlideMasters(): ApiMaster[];
    GetAllSlides(): ApiSlide[];
    GetAllTables(): ApiTable[];
    GetClassType(): "presentation";
    GetCore(): ApiCore;
    GetCurSlideIndex(): number;
    GetCurrentSlide(): ApiSlide;
    GetCurrentVisibleSlide(): ApiSlide | null;
    GetCustomProperties(): ApiCustomProperties;
    GetCustomXmlParts(): ApiCustomXmlParts | null;
    GetDocumentInfo(): object;
    GetDrawingsByName(ids: string[]): Drawing[];
    GetHeight(): number;
    GetLoopUntilStopped(): boolean;
    GetMaster(nPos: number): ApiMaster | null;
    GetMastersCount(): number;
    GetSlideByIndex(nIndex: number): ApiSlide;
    GetSlidesCount(): number;
    GetStyle(sStyleName: string): ApiStyle | null;
    GetWidth(): number;
    InsertParagraphBreak(): boolean;
    MoveCursorDown(count?: number, addToSelect?: boolean): boolean;
    MoveCursorLeft(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;
    MoveCursorRight(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;
    MoveCursorUp(count?: number, addToSelect?: boolean): boolean;
    RemoveSlides(nStart?: number, nCount?: number): boolean;
    ReplaceCurrentImage(sImageUrl: string, Width: number, Height: number): void;
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];
    SearchAndReplace(properties: object, properties_searchString: string, properties_replaceString: string, properties_matchCase?: boolean, properties_wholeWords?: boolean): boolean;
    SetLanguage(sLangId: string): boolean;
    SetLoopUntilStopped(loopUntilStopped: boolean): boolean;
    SetSizes(nWidth: number, nHeight: number): void;
    SlidesToJSON(nStart?: number, nEnd?: number, bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object[];
    ToJSON(bWriteTableStyles?: boolean): object;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    GetClassType(): "presetColor";
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    GetClassType(): "rgbColor";
  }

  /** Class representing a continuous region in a document.  Each Range object is determined by the position of the start and end characters. */
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

  /** Class representing the selection in the presentation. */
  export interface ApiSelection {
    GetShapes(): ApiDrawing[];
    GetSlides(): ApiSlide[];
    GetType(): SelectionType;
    IsEmpty(): boolean;
  }

  /** Class representing a shadow. */
  export interface ApiShadow {
    GetClassType(): "shadow";
    GetSettings(): ShadowSettings;
  }

  /** Class representing a shape. */
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetFill" | "GetLine" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    CreateTextRange(): ApiTextRange | null;
    GetClassType(): "shape";
    GetContent(): ApiDocumentContent;
    GetDocContent(): ApiDocumentContent;
    GetFill(): ApiFill | null;
    GetGeometry(): ApiGeometry;
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetLine(): ApiStroke | null;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetTextFit(): TextFitType;
    GetTextRange(): ApiTextRange | null;
    GetVerticalTextAlign(): VerticalTextAlign;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetFill(oFill: ApiFill): boolean;
    SetGeometry(oGeometry: ApiGeometry): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetLine(oStroke: ApiStroke): boolean;
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
    SetTextFit(fitType: TextFitType): boolean;
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a slide. */
  export interface ApiSlide {
    AddComment(posX: number, posY: number, text: string, author?: string, userId?: string): boolean;
    AddNotesText(sText: string): boolean;
    AddObject(oDrawing: ApiDrawing): boolean;
    ApplyLayout(oLayout: ApiLayout): boolean;
    ApplyTheme(oApiTheme: ApiTheme): boolean;
    ClearBackground(): boolean;
    Copy(): ApiSlide | null;
    Delete(): boolean;
    Duplicate(nPos?: number): ApiSlide | null;
    FollowLayoutBackground(): boolean;
    FollowMasterBackground(): boolean;
    GetAllCharts(): ApiChart[];
    GetAllDrawings(): Drawing[];
    GetAllImages(): ApiImage[];
    GetAllOleObjects(): ApiOleObject[];
    GetAllShapes(): ApiShape[];
    GetAllTables(): ApiTable[];
    GetBackground(): ApiFill | null;
    GetClassType(): "slide";
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
    GetHeight(): number;
    GetLayout(): ApiLayout | null;
    GetNotesPage(): ApiNotesPage | null;
    GetSlideIndex(): number;
    GetSlideShowTransition(): ApiSlideShowTransition | null;
    GetTheme(): ApiTheme | null;
    GetTimeLine(): ApiTimeLine;
    GetVisible(): boolean;
    GetWidth(): number;
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
    MoveTo(nPos: number): boolean;
    RemoveAllObjects(): void;
    RemoveObject(nPos: number, nCount?: number): boolean;
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];
    Select(): void;
    SetBackground(oApiFill: ApiFill): boolean;
    SetSlideShowTransition(transition: ApiSlideShowTransition): boolean;
    SetVisible(value: boolean): boolean;
    ToJSON(bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object;
  }

  /** Class representing a slide show transition. */
  export interface ApiSlideShowTransition {
    GetAdvanceOnClick(): boolean;
    GetAdvanceOnTime(): boolean;
    GetAdvanceTime(): number | undefined;
    GetClassType(): "slideShowTransition";
    GetDuration(): number;
    GetEntryEffect(): EntryEffect;
    GetSpeed(): TransitionSpeed;
    SetAdvanceOnClick(advanceOnClick: boolean): boolean;
    SetAdvanceOnTime(advanceOnTime: boolean): boolean;
    SetAdvanceTime(advanceTime: number): boolean;
    SetDuration(duration: number): boolean;
    SetEntryEffect(entryEffectName: EntryEffect): boolean;
    SetSpeed(speed: TransitionSpeed): boolean;
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange"> {
    CreateTextRange(): ApiTextRange | null;
    GetClassType(): "smartArt";
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetTextRange(): ApiTextRange | null;
    IsTextRange(): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
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
  export interface ApiTable extends Omit<ApiDrawing, "GetClassType" | "SetSize" | "SetPosition" | "GetParent" | "GetParentSlide" | "GetParentLayout" | "GetParentMaster" | "SetPlaceholder" | "GetPlaceholder" | "ToJSON" | "GetPosX" | "GetPosY" | "SetPosX" | "SetPosY" | "ReplacePlaceholder" | "GetInternalId" | "SetHyperlink" | "GetHyperlink" | "GetTextRange" | "IsTextRange" | "CreateTextRange">, Omit<ApiTablePr, "GetClassType" | "SetStyleColBandSize" | "SetStyleRowBandSize" | "SetJc" | "SetShd" | "SetTableBorderTop" | "SetTableBorderBottom" | "SetTableBorderLeft" | "SetTableBorderRight" | "SetTableBorderInsideH" | "SetTableBorderInsideV" | "SetTableBorderAll" | "SetTableCellMarginBottom" | "SetTableCellMarginLeft" | "SetTableCellMarginRight" | "SetTableCellMarginTop" | "SetCellSpacing" | "SetTableInd" | "SetWidth" | "SetTableLayout" | "SetTableTitle" | "GetTableTitle" | "SetTableDescription" | "GetTableDescription" | "ToJSON"> {
    AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;
    AddColumns(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable | null;
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;
    AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
    AddRows(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable | null;
    CreateTextRange(): ApiTextRange | null;
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell | null;
    GetClassType(): "table";
    GetColumnWidth(columnIndex: number): number | null;
    GetHyperlink(): ApiHyperlink | null;
    GetInternalId(): string;
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
    GetParentLayout(): ApiLayout | null;
    GetParentMaster(): ApiMaster | null;
    GetParentSlide(): ApiSlide | null;
    GetPlaceholder(): ApiPlaceholder | null;
    GetPosX(): number;
    GetPosY(): number;
    GetRow(nIndex: number): ApiTableRow;
    GetRowsCount(): number;
    GetSelectedCells(): ApiTableCell[];
    GetSelectedColumnsCells(): ApiTableCell[];
    GetSelectedRows(): ApiTableRow[];
    GetTableDescription(): string;
    GetTableLook(): TableLook;
    GetTableTitle(): string;
    GetTextRange(): ApiTextRange | null;
    IsTextRange(): boolean;
    MergeCells(aCells: ApiTableCell[]): ApiTableCell;
    RemoveColumn(oCell: ApiTableCell): boolean;
    RemoveRow(oCell: ApiTableCell): boolean;
    ReplacePlaceholder(drawing: Drawing): boolean;
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetCellSpacing(nValue: number): boolean;
    SetColumnWidth(columnIndex: number, width: number): number | null;
    SetHeight(nValue: number): number | null;
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;
    SetJc(sJcType: "left" | "right" | "center"): boolean;
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
    SetPosX(posX: number): boolean;
    SetPosY(posY: number): boolean;
    SetPosition(nPosX: number, nPosY: number): void;
    SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;
    SetSize(width: number, height: number): boolean;
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
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): void;
    SetTableTitle(sTitle: string): boolean;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
    ToJSON(bWriteTableStyles?: boolean): object;
  }

  /** Class representing a table cell. */
  export interface ApiTableCell {
    AddText(text: string): ApiRun;
    GetBackgroundColor(): ApiColor | null;
    GetClassType(): "tableCell";
    GetContent(): ApiDocumentContent;
    GetIndex(): number;
    GetInternalId(): string;
    GetNext(): ApiTableCell | null;
    GetParentRow(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableCell | null;
    GetRowIndex(): number | null;
    GetText(pr?: object, pr_Numbering?: boolean, pr_Math?: boolean, pr_TableCellSeparator?: string, pr_TableRowSeparator?: string, pr_ParaSeparator?: string, pr_TabSymbol?: string, pr_NewLineSeparator?: string): string;
    GetTextRange(): ApiTextRange | null;
    Select(): void;
    SetBackgroundColor(color?: ApiColor): boolean;
    SetCellBorderBottom(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;
    SetCellBorderLeft(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;
    SetCellBorderRight(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;
    SetCellBorderTop(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;
    SetCellMarginBottom(nValue: number): void;
    SetCellMarginLeft(nValue: number): void;
    SetCellMarginRight(nValue: number): void;
    SetCellMarginTop(nValue: number): void;
    SetColumnBackgroundColor(color?: ApiColor): boolean;
    SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;
    SetText(text: string): ApiRun;
    SetTextDirection(sType: TextFlowDirection): void;
    SetVerticalAlign(sType: VerticalTextAlign): void;
    SetWidth(sType: TableWidth, nValue?: number): boolean;
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
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
  export interface ApiTableRow extends ApiTableRowPr {
    GetCell(nPos: number): ApiTableCell;
    GetCellsCount(): number;
    GetClassType(): "tableRow";
    GetHeight(): number | null;
    GetNext(): ApiTableRow | null;
    GetParentTable(): ApiTable | null;
    GetPrevious(): ApiTableRow | null;
    SetHeight(nValue?: number): number | null;
  }

  /** Class representing the table row properties. */
  export interface ApiTableRowPr {
  }

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
    SetTablePr(oTablePr: ApiTablePr): boolean;
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

  /** Class representing a text range within a presentation shape's text frame. */
  export interface ApiTextRange {
    AddText(text: string, position?: "after" | "before"): boolean;
    Delete(): boolean;
    ExpandTo(oRange: ApiTextRange): ApiTextRange | null;
    Find(sFindWhat: string, nAfter?: number, bMatchCase?: boolean, bWholeWords?: boolean): ApiTextRange | null;
    GetAllParagraphs(): ApiParagraph[];
    GetClassType(): "textRange";
    GetEndPos(): number;
    GetParagraph(nIndex: number): ApiParagraph | null;
    GetRange(nStart?: number, nEnd?: number): ApiTextRange | null;
    GetStartPos(): number;
    GetText(options?: object, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;
    GetTextPr(): ApiTextPr;
    IntersectWith(oRange: ApiTextRange): ApiTextRange | null;
    MoveCursorToPos(nPos?: number): boolean;
    Replace(sFindWhat: string, sReplaceWith: string, bMatchCase?: boolean, bWholeWords?: boolean): ApiTextRange;
    Select(update?: boolean): boolean;
    SetBold(isBold: boolean): ApiTextRange;
    SetCaps(isCaps: boolean): ApiTextRange;
    SetColor(color: ApiColor): ApiTextRange;
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextRange;
    SetEndPos(nPos: number): boolean;
    SetFontFamily(sFontFamily: string): ApiTextRange | null;
    SetFontSize(FontSize: hps): ApiTextRange | null;
    SetHighlight(sColor: highlightColor): ApiTextRange | null;
    SetItalic(isItalic: boolean): ApiTextRange;
    SetPosition(nPosition: hps): ApiTextRange | null;
    SetSmallCaps(isSmallCaps: boolean): ApiTextRange;
    SetSpacing(nSpacing: number): ApiTextRange | null;
    SetStartPos(nPos: number): boolean;
    SetStrikeout(isStrikeout: boolean): ApiTextRange;
    SetText(sText: string): ApiTextRange;
    SetTextPr(oTextPr: ApiTextPr): ApiTextRange | null;
    SetUnderline(isUnderline: boolean): ApiTextRange;
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextRange | null;
  }

  /** Class representing a presentation theme. */
  export interface ApiTheme {
    GetClassType(): "theme";
    GetColorScheme(): ApiThemeColorScheme;
    GetFontScheme(): ApiThemeFontScheme;
    GetFormatScheme(): ApiThemeFormatScheme;
    GetMaster(): ApiMaster | null;
    SetColorScheme(oApiColorScheme: ApiThemeColorScheme): boolean;
    SetFontScheme(oApiFontScheme: ApiThemeFontScheme): boolean;
    SetFormatScheme(oApiFormatScheme: ApiThemeFormatScheme): boolean;
  }

  /** Class representing a theme color scheme. */
  export interface ApiThemeColorScheme {
    ChangeColor(nPos: number, oColor: ApiUniColor | ApiRGBColor): boolean;
    Copy(): ApiThemeColorScheme;
    GetClassType(): "themeColorScheme";
    SetSchemeName(sName: string): boolean;
    ToJSON(): object;
  }

  /** Class representing a theme font scheme. */
  export interface ApiThemeFontScheme {
    Copy(): ApiThemeFontScheme;
    GetClassType(): "themeFontScheme";
    SetFonts(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string): void;
    SetSchemeName(sName: string): boolean;
    ToJSON(): object;
  }

  /** Class representing a theme format scheme. */
  export interface ApiThemeFormatScheme {
    ChangeBgFillStyles(arrBgFill: ApiFill[]): void;
    ChangeFillStyles(arrFill: ApiFill[]): void;
    ChangeLineStyles(arrLine: ApiStroke[]): void;
    Copy(): ApiThemeFormatScheme;
    GetClassType(): "themeFormatScheme";
    SetSchemeName(sName: string): boolean;
    ToJSON(): object;
  }

  /** Class representing animation timeline for a slide. */
  export interface ApiTimeLine {
    AddInteractiveSequence(drawing: ApiDrawing): ApiAnimationSequence | null;
    GetAllEffects(): ApiAnimationEffect[];
    GetClassType(): "timeLine";
    GetInteractiveSequences(): ApiAnimationSequence[];
    GetMainSequence(): ApiAnimationSequence;
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

  /** Class representing an animation effect. */
  export interface g_nApiEffectIdCounter {
  }

  export type EditorEventArgs = {
    /** The function called when the current slide has changed. */
    onChangeCurrentSlide: [index: number];
    /** The function called when a slide show presentation starts. */
    onSlideShowBegin: [];
    /** The function called when a slide show presentation ends. */
    onSlideShowEnd: [];
    /** The function called after a slide has been changed and displayed during a slide show presentation. Fires before the slide content is actually displayed. */
    onSlideShowNextSlide: [];
    /** The function called when slide changes during a slide show presentation. Provides information about both the current and previous slide. */
    onSlideShowSlideChanged: [data: { slideIndex: number; previousSlideIndex: number }];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
