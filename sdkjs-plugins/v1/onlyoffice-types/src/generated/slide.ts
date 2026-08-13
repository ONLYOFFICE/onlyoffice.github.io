// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: slide

export namespace Slide {
  /** Animation effect type. */
  export type AnimationEffectType = "entranceAppear" | "entranceFade" | "entranceFlyIn" | "entranceFloatIn" | "entranceSplit" | "entranceWipe" | "entranceCircle" | "entranceBox" | "entranceDiamond" | "entrancePlus" | "entranceWheel" | "entranceRandomBars" | "entranceGrowAndTurn" | "entranceZoom" | "entranceSwivel" | "entranceBounce" | "entranceBlinds" | "entranceCheckerboard" | "entrancePeekIn" | "entranceStrips" | "entranceExpand" | "entranceRiseUp" | "entranceCenterRevolve" | "entranceSpinner" | "entranceFloatUp" | "entranceFloatDown" | "entranceSpiralIn" | "entranceWedge" | "entranceDissolveIn" | "entrancePinwheel" | "exitDisappear" | "exitFadeOut" | "exitFlyOut" | "exitFloatOut" | "exitSplitOut" | "exitWipeOut" | "exitCircleOut" | "exitBoxOut" | "exitDiamondOut" | "exitPlusOut" | "exitWheelOut" | "exitRandomBarsOut" | "exitShrinkAndTurn" | "exitZoomOut" | "exitSwivelOut" | "exitBounceOut" | "exitSpiralOut" | "exitCollapse" | "emphasisPulse" | "emphasisColorPulse" | "emphasisTeeter" | "emphasisSpin" | "emphasisGrowShrink" | "emphasisDesaturate" | "emphasisDarken" | "emphasisLighten" | "emphasisTransparency" | "emphasisObjectColor" | "emphasisComplementaryColor" | "emphasisLineColor" | "emphasisFillColor" | "emphasisFontColor" | "emphasisBlink" | "emphasisShimmer" | "emphasisWave" | "pathCircle" | "pathSquare" | "pathDiamond" | "pathHeart" | "pathStar" | "pathHexagon" | "pathOctagon" | "pathRight" | "pathLeft" | "pathUp" | "pathDown";

  /** Animation trigger type. */
  export type AnimationTriggerType = "onclick" | "withprevious" | "afterprevious";

  /**
   * Types of all supported forms.
   *
   * @example
   * ```js
   * let copyTextForm = textForm.Copy();
   * ```
   */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /**
   * Axis position in the chart.
   *
   * @example
   * ```js
   * chart.SetAxieNumFormat("top", "0.00");
   * ```
   */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /**
   * The type of a fill which uses an image as a background.
   * **"tile"** - if the image is smaller than the shape which is filled, the image will be tiled all
   * over the created shape surface.
   * **"stretch"** - if the image is smaller than the shape which is filled, the image will be stretched
   * to fit the created shape surface.
   *
   * @example
   * ```js
   * let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile");
   * ```
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
   * A border type.
   *
   * @example
   * ```js
   * paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0);
   * ```
   */
  export type BorderType = "none" | "single";

  /**
   * A bullet type which will be added to the paragraph in spreadsheet or presentation.
   *
   * @example
   * ```js
   * // The paragraph will be starting with the Arabic numeral which has parenthesis
   * let bullet = Api.CreateNumbering("ArabicParenR");
   * ```
   */
  export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

  /**
   * Possible values for the caption label.
   *
   * @example
   * ```js
   * paragraph.AddCaptionCrossRef("Table", "pageNum", caption);
   * ```
   */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /**
   * Possible values for the caption numbering format.
   * **"ALPHABETIC"** - upper letter.
   * **"alphabetic"** - lower letter.
   * **"Roman"** - upper Roman.
   * **"roman"** - lower Roman.
   * **"Arabic"** - arabic.
   *
   * @example
   * ```js
   * paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen");
   * ```
   */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /**
   * Possible values for the caption separator.
   * **"hyphen"** - the "-" punctuation mark.
   * **"period"** - the "." punctuation mark.
   * **"colon"** - the ":" punctuation mark.
   * **"longDash"** - the "—" punctuation mark.
   * **"dash"** - the "-" punctuation mark.
   *
   * @example
   * ```js
   * paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen");
   * ```
   */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /**
   * This type specifies the available chart types which can be used to create a new chart.
   *
   * @example
   * ```js
   * // ChartType used in text documents
   * // The resulting chart will have a 'bar3D' type:
   * var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
   *
   * // ChartType used in spreadsheets
   * // The resulting chart will have a 'bar3D' type:
   * var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000);
   * ```
   */
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

  /**
   * Report on all comments.
   * This is a dictionary where the keys are usernames.
   *
   * @example
   * ```js
   * let commentsReport = oDocument.GetCommentsReport();
   * ```
   */
  export interface CommentReport {
    /** The comments grouped by username. */
    username?: UserComments;
  }

  /**
   * Record of one comment.
   *
   * @example
   * ```js
   * let commentsReport = oDocument.GetCommentsReport();
   * ```
   */
  export interface CommentReportRecord {
    /** Specifies whether this is an initial comment or a reply to another comment. */
    IsAnswer: boolean;

    /** The text of the current comment. */
    CommentMessage: string;

    /** The time when this change was made in local time. */
    Date: number;

    /** The time when this change was made in UTC. */
    DateUTC: number;

    /** The text to which this comment is related. */
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
   * Any valid element which can be added to the document structure.
   *
   * @example
   * ```js
   * doc.AddElement(paragraph);
   * ```
   */
  export type DocumentElement = ApiParagraph;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiTable | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /**
   * This type specifies the type of drawing lock.
   *
   * @example
   * ```js
   * let lockValue = drawing.GetLockValue("noSelect");
   * ```
   */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available slide transition effects (similar to PowerPoint VBA ppEffect). */
  export type EntryEffect = "effectAppear" | "effectBlindsHorizontal" | "effectBlindsVertical" | "effectBoxDown" | "effectBoxIn" | "effectBoxLeft" | "effectBoxOut" | "effectBoxRight" | "effectBoxUp" | "effectCheckerboardAcross" | "effectCheckerboardDown" | "effectCircleOut" | "effectCombHorizontal" | "effectCombVertical" | "effectConveyorLeft" | "effectConveyorRight" | "effectCoverDown" | "effectCoverLeft" | "effectCoverLeftDown" | "effectCoverLeftUp" | "effectCoverRight" | "effectCoverRightDown" | "effectCoverRightUp" | "effectCoverUp" | "effectCubeDown" | "effectCubeLeft" | "effectCubeRight" | "effectCubeUp" | "effectCut" | "effectCutThroughBlack" | "effectDiamondOut" | "effectDissolve" | "effectDoorsHorizontal" | "effectDoorsVertical" | "effectFade" | "effectFadeSmoothly" | "effectFerrisWheelLeft" | "effectFerrisWheelRight" | "effectFlashbulb" | "effectFlipDown" | "effectFlipLeft" | "effectFlipRight" | "effectFlipUp" | "effectFlyThroughIn" | "effectFlyThroughInBounce" | "effectFlyThroughOut" | "effectFlyThroughOutBounce" | "effectGalleryLeft" | "effectGalleryRight" | "effectGlitterDiamondDown" | "effectGlitterDiamondLeft" | "effectGlitterDiamondRight" | "effectGlitterDiamondUp" | "effectGlitterHexagonDown" | "effectGlitterHexagonLeft" | "effectGlitterHexagonRight" | "effectGlitterHexagonUp" | "effectHoneycomb" | "effectNewsflash" | "effectOrbitDown" | "effectOrbitLeft" | "effectOrbitRight" | "effectOrbitUp" | "effectPanDown" | "effectPanLeft" | "effectPanRight" | "effectPanUp" | "effectPlusOut" | "effectPushDown" | "effectPushLeft" | "effectPushRight" | "effectPushUp" | "effectRandom" | "effectRandomBarsHorizontal" | "effectRandomBarsVertical" | "effectRevealBlackLeft" | "effectRevealBlackRight" | "effectRevealSmoothLeft" | "effectRevealSmoothRight" | "effectRippleCenter" | "effectRippleLeftDown" | "effectRippleLeftUp" | "effectRippleRightDown" | "effectRippleRightUp" | "effectRotateDown" | "effectRotateLeft" | "effectRotateRight" | "effectRotateUp" | "effectShredRectangleIn" | "effectShredRectangleOut" | "effectShredStripsIn" | "effectShredStripsOut" | "effectSplitHorizontalIn" | "effectSplitHorizontalOut" | "effectSplitVerticalIn" | "effectSplitVerticalOut" | "effectStripsDownLeft" | "effectStripsDownRight" | "effectStripsLeftDown" | "effectStripsLeftUp" | "effectStripsRightDown" | "effectStripsRightUp" | "effectStripsUpLeft" | "effectStripsUpRight" | "effectSwitchDown" | "effectSwitchLeft" | "effectSwitchRight" | "effectSwitchUp" | "effectUncoverDown" | "effectUncoverLeft" | "effectUncoverLeftDown" | "effectUncoverLeftUp" | "effectUncoverRight" | "effectUncoverRightDown" | "effectUncoverRightUp" | "effectUncoverUp" | "effectVortexDown" | "effectVortexLeft" | "effectVortexRight" | "effectVortexUp" | "effectWarpIn" | "effectWarpOut" | "effectWedge" | "effectWheel1Spoke" | "effectWheel2Spokes" | "effectWheel3Spokes" | "effectWheel4Spokes" | "effectWheel8Spokes" | "effectWheelReverse1Spoke" | "effectWindowHorizontal" | "effectWindowVertical" | "effectWipeDown" | "effectWipeLeft" | "effectWipeRight" | "effectWipeUp" | "effectNone" | "effectCrawlFromDown" | "effectCrawlFromLeft" | "effectCrawlFromRight" | "effectCrawlFromUp" | "effectFlashOnceFast" | "effectFlashOnceMedium" | "effectFlashOnceSlow" | "effectFlyFromBottom" | "effectFlyFromBottomLeft" | "effectFlyFromBottomRight" | "effectFlyFromLeft" | "effectFlyFromRight" | "effectFlyFromTop" | "effectFlyFromTopLeft" | "effectFlyFromTopRight" | "effectMixed" | "effectPeekFromDown" | "effectPeekFromLeft" | "effectPeekFromRight" | "effectPeekFromUp" | "effectSpiral" | "effectStretchAcross" | "effectStretchDown" | "effectStretchLeft" | "effectStretchRight" | "effectStretchUp" | "effectSwivel" | "effectZoomBottom" | "effectZoomCenter" | "effectZoomIn" | "effectZoomInSlightly" | "effectZoomOut" | "effectZoomOutSlightly";

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /**
   * Form data.
   *
   * @example
   * ```js
   * let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"};
   * ```
   */
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

  /**
   * The specific form type.
   *
   * @example
   * ```js
   * let formsData = doc.GetFormsData();
   * ```
   */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /**
   * Form type.
   * The available form types.
   *
   * @example
   * ```js
   * let formType = textForm.GetFormType();
   * ```
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
   *
   * @example
   * ```js
   * let docContent = finalSection.RemoveHeader("title");
   * ```
   */
  export type HdrFtrType = "default" | "title" | "even";

  /** Available layout types. */
  export type LayoutType = "blank" | "chart" | "chartAndTx" | "clipArtAndTx" | "clipArtAndVertTx" | "cust" | "dgm" | "fourObj" | "mediaAndTx" | "obj" | "objAndTwoObj" | "objAndTx" | "objOnly" | "objOverTx" | "objTx" | "picTx" | "secHead" | "tbl" | "title" | "titleOnly" | "twoColTx" | "twoObj" | "twoObjAndObj" | "twoObjAndTx" | "twoObjOverTx" | "twoTxTwoObj" | "tx" | "txAndChart" | "txAndClipArt" | "txAndMedia" | "txAndObj" | "txAndTwoObj" | "txOverObj" | "vertTitleAndTx" | "vertTitleAndTxOverChart" | "vertTx";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /**
   * Standard numeric format.
   *
   * @example
   * ```js
   * worksheet.GetRange("A1").SetOrientation("xlUpward");
   * ```
   */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /**
   * The types of elements that can be added to the paragraph structure.
   *
   * @example
   * ```js
   * paragraph.AddElement(run, 0);
   * ```
   */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

  /**
   * A paragraph-like container that can directly hold inline-level content (Hyperlink, InlineLvlSdt,
   * etc.).
   */
  export type ParagraphLikeContainer = ApiParagraph | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /**
   * The available preset patterns which can be used for the fill.
   *
   * @example
   * ```js
   * let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0));
   * ```
   */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** Available placeholder types. */
  export type PlaceholderType = "body" | "chart" | "clipArt" | "ctrTitle" | "diagram" | "date" | "footer" | "header" | "media" | "object" | "picture" | "sldImage" | "sldNumber" | "subTitle" | "table" | "title";

  /**
   * 60000th of a degree (5400000 = 90 degrees).
   *
   * @example
   * ```js
   * let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000);
   * ```
   */
  export type PositiveFixedAngle = number;

  /**
   * The 1000th of a percent (100000 = 100%).
   *
   * @example
   * ```js
   * let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000);
   * ```
   */
  export type PositivePercentage = number;

  /**
   * The available preset color names.
   *
   * @example
   * ```js
   * let schemeColor = Api.CreatePresetColor("lightYellow");
   * ```
   */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /**
   * The possible values for the base which the relative horizontal positioning of an object will be
   * calculated from.
   *
   * @example
   * ```js
   * drawing.SetHorAlign("page", "center");
   * ```
   */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /**
   * The possible values for the base which the relative vertical positioning of an object will be
   * calculated from.
   *
   * @example
   * ```js
   * drawing.SetVerAlign("page", "center");
   * ```
   */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /**
   * Report on all review changes.
   * This is a dictionary where the keys are usernames.
   *
   * @example
   * ```js
   * let reviewRecord = {
   * 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161},
   * 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}],
   * 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942},
   * 					{Type: "TextPr", Date: 1679941757832}]
   * }
   * ```
   */
  export interface ReviewReport {
    /** The review changes grouped by username. */
    username?: UserReviewChanges;
  }

  /**
   * Record of one review change.
   *
   * @example
   * ```js
   * let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161};
   * let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189};
   * let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942};
   * let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832};
   * let reviewRecord = {
   * 	"John Smith" : [reviewReportRecord1, reviewReportRecord2],
   * 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4]
   * };
   * ```
   */
  export interface ReviewReportRecord {
    /** Review record type. */
    Type: ReviewReportRecordType;

    /** Review change value that is set for the "TextAdd" and "TextRem" types only. */
    Value?: string;

    /** The time when this change was made. */
    Date: number;

    /** Element that has been reviewed. */
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /**
   * Review record type.
   *
   * @example
   * ```js
   * let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161};
   * let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189};
   * let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942};
   * let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832};
   * let reviewRecord = {
   * 	"John Smith" : [reviewReportRecord1, reviewReportRecord2],
   * 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4]
   * };
   * ```
   */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /**
   * The condition to scale an image in the picture form.
   *
   * @example
   * ```js
   * pictureForm.SetScaleFlag("tooBig");
   * ```
   */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /**
   * The available color scheme identifiers.
   *
   * @example
   * ```js
   * let schemeColor = Api.CreateSchemeColor("accent2");
   * ```
   */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /**
   * The lock type of the content control.
   *
   * @example
   * ```js
   * inlineLvlSdt.SetLock("sdtContentLocked");
   * ```
   */
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

  /**
   * This type specifies the preset shape geometry that will be used for a shape.
   *
   * @example
   * ```js
   * let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke);
   * ```
   */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    /** The shading type: **"nil"** - no shading, **"clear"** - solid fill. */
    Type: ShdType;

    /** The shading color. */
    Color: ApiColor;
  }

  /**
   * A shade type which can be added to the document element.
   *
   * @example
   * ```js
   * tablePr.SetShd("clear", 0, 255, 0, false);
   * ```
   */
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

  /**
   * The style type used for the document element.
   *
   * @example
   * ```js
   * let normalStyle = doc.GetDefaultStyle("paragraph");
   * ```
   */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /**
   * Types of custom tab.
   *
   * @example
   * ```js
   * paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]);
   * ```
   */
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
   *
   * @example
   * ```js
   * tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0);
   * ```
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
   *
   * @example
   * ```js
   * tableCell.SetWidth("twips", 2000);
   * ```
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

  /**
   * Text transform type.
   *
   * @example
   * ```js
   * let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000);
   * ```
   */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /**
   * Possible values for the position of chart tick labels (either horizontal or vertical).
   * **"none"** - not display the selected tick labels.
   * **"nextTo"** - set the position of the selected tick labels next to the main label.
   * **"low"** - set the position of the selected tick labels in the part of the chart with lower values.
   * **"high"** - set the position of the selected tick labels in the part of the chart with higher
   * values.
   *
   * @example
   * ```js
   * chart.SetVertAxisTickLabelPosition("nextTo");
   * ```
   */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /**
   * The available types of tick mark appearance.
   *
   * @example
   * ```js
   * chart.SetVertAxisMajorTickMark("cross");
   * ```
   */
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
   *
   * @example
   * ```js
   * let tocBuildFromPr = {"OutlineLvls": 9};
   * let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"};
   * doc.AddTableOfContents(tocPr);
   * ```
   */
  export interface TocBuildFromPr {
    /** The highest heading level included in the table of contents (the start of the outline range). */
    OutlineLvlStart?: number;

    /** Maximum number of levels in the table of contents. */
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
   *
   * @example
   * ```js
   * let tocLeader = "dot";
   * let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"};
   * doc.AddTableOfContents(tocPr);
   * ```
   */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /**
   * Table of contents properties.
   *
   * @example
   * ```js
   * let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"};
   * doc.AddTableOfContents(tocPr);
   * ```
   */
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

  /**
   * Possible values for the table of contents style.
   *
   * @example
   * ```js
   * let tocStyle = "standard";
   * let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle};
   * doc.AddTableOfContents(tocPr);
   * ```
   */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /**
   * Table of contents style levels.
   *
   * @example
   * ```js
   * let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}];
   * let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"};
   * doc.AddTableOfContents(tocPr);
   * ```
   */
  export interface TocStyleLvl {
    /** Style name (for example, "Heading 1"). */
    Name: string;

    /** Level which will be applied to the specified style in the table of contents. */
    Lvl: number;
  }

  /**
   * Table of figures properties.
   *
   * @example
   * ```js
   * let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"};
   * doc.AddTableOfFigures(tofPr);
   * ```
   */
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

  /**
   * Possible values for the table of figures style.
   *
   * @example
   * ```js
   * let tofStyle = "distinctive";
   * let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle};
   * doc.AddTableOfFigures(tofPr);
   * ```
   */
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

  /**
   * The available text vertical alignment (used to align text in a shape with a placement for text
   * inside it).
   *
   * @example
   * ```js
   * drawing.SetVerticalTextAlign("top");
   * ```
   */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /**
   * The watermark direction.
   *
   * @example
   * ```js
   * watermarkSettings.SetDirection("clockwise45");
   * ```
   */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /**
   * The watermark type.
   *
   * @example
   * ```js
   * watermarkSettings.SetType("text");
   * ```
   */
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
   *
   * @example
   * ```js
   * paragraph.AddBookmarkCrossRef("pageNum", bookmark);
   * ```
   */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /**
   * A numeric value from 0 to 255.
   *
   * @example
   * ```js
   * // The resulting color is green, the bytes are measured in decimal numbers:
   * let rgbColorGreen = Api.CreateRGBColor(0, 255, 0);
   * // The resulting color is red, the bytes are measured in hexadecimal numbers:
   * let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0);
   * ```
   */
  export type byte = number;

  /**
   * Available values of the "equation"/"figure"/"table" reference type:
   * **"entireCaption"**- the entire caption text;
   * **"labelNumber"** - the label and object number only, e.g. "Table 1.1";
   * **"captionText"** - the caption text only;
   * **"pageNum"** - the page number containing the referenced object;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position.
   *
   * @example
   * ```js
   * paragraph.AddCaptionCrossRef("table", "pageNum", caption);
   * ```
   */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /**
   * Available values of the "endnote" reference type:
   * **"endnoteNum"** - the endnote number;
   * **"pageNum"** - the endnote page number;
   * **"aboveBelow"** - the words "above" or "below" depending on the item position;
   * **"formEndnoteNum"** - the form number formatted as an endnote. The numbering of the actual endnotes
   * is not affected.
   *
   * @example
   * ```js
   * paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph);
   * ```
   */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /**
   * Available values of the "footnote" reference type:
   * **"footnoteNum"** - the footnote number;
   * **"pageNum"** - the page number of the footnote;
   * **"aboveBelow"** - the words "above" or "below" depending on the position of the item;
   * **"formFootnoteNum"** - the form number formatted as a footnote. The numbering of the actual
   * footnotes is not affected.
   *
   * @example
   * ```js
   * paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph);
   * ```
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
   *
   * @example
   * ```js
   * paragraph.AddHeadingCrossRef("pageNum", headingParagraph);
   * ```
   */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /**
   * Available highlight colors.
   *
   * @example
   * ```js
   * paragraph.SetHighlight("green");
   * ```
   */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /**
   * Half-points (2 half-points = 1 point).
   *
   * @example
   * ```js
   * textPr.SetFontSize(22);
   * ```
   */
  export type hps = number;

  /**
   * 240ths of a line.
   *
   * @example
   * ```js
   * paraPr.SetSpacingLine(240, "auto");
   * ```
   */
  export type line240 = number;

  /**
   * 1 millimetre equals 1/10th of a centimetre.
   *
   * @example
   * ```js
   * textForm.SetCellWidth(7);
   * ```
   */
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
   *
   * @example
   * ```js
   * paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true);
   * ```
   */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /**
   * Value from 0 to 100.
   *
   * @example
   * ```js
   * pictureForm.SetPicturePosition(70, 70);
   * ```
   */
  export type percentage = number;

  /**
   * A point.
   *
   * @example
   * ```js
   * paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0);
   * ```
   */
  export type pt = number;

  /**
   * Eighths of a point (24 eighths of a point = 3 points).
   *
   * @example
   * ```js
   * paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0);
   * ```
   */
  export type pt_8 = number;

  /**
   * Twentieths of a point (equivalent to 1/1440th of an inch).
   *
   * @example
   * ```js
   * paragraph.SetEqualColumns(2, 720);
   * ```
   */
  export type twips = number;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateBlipFill("https://api.onlyoffice.com/content/img/docbuilder/examples/icon_DocumentEditors.png", "tile");
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("star10", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oSlide.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateBlipFill/
     */
    CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;

    /**
     * Creates a bullet for a paragraph with the character or symbol specified with the sSymbol parameter.
     *
     * @param sSymbol - The character or symbol which will be used to create the bullet for the paragraph.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oBullet = Api.CreateBullet("-");
     * oParagraph.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the bulleted paragraph.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateBullet/
     */
    CreateBullet(sSymbol: string): ApiBullet;

    /**
     * Creates a chart with the parameters specified.
     *
     * @param sType - The chart type used for the chart display.
     * @param aSeries - The array of the data used to build the chart from.
     * @param aSeriesNames - The array of the names (the source table column names) used for the data which the chart will be
     *   build from.
     * @param aCatNames - The array of the names (the source table row names) used for the data which the chart will be
     *   build from.
     * @param nWidth - The chart width in English measure units.
     * @param nHeight - The chart height in English measure units.
     * @param nStyleIndex - The chart color style index (can be **1 - 48**, as described in OOXML specification).
     * @param aNumFormats - Numeric formats which will be applied to the series (can be custom formats).
     *   The default numeric format is "General".
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24, ["0", "0.00"]);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetShowPointDataLabel(1, 0, false, false, true, false);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateChart/
     */
    CreateChart(aSeries: number[][], aSeriesNames: number[] | string[], aCatNames: number[] | string[], nWidth: number, nHeight: number, nStyleIndex: number, aNumFormats: NumFormat[] | string[]): ApiChart;
    CreateChart(sType: ChartType, aSeries: number[][], aSeriesNames: number[] | string[], aCatNames: number[] | string[], nWidth: number, nHeight: number, nStyleIndex: number, aNumFormats: NumFormat[] | string[]): ApiChart;

    /**
     * Creates a new custom geometry.
     *
     * @since 9.1.0
     */
    CreateCustomGeometry(): ApiGeometry;

    /**
     * Creates a gradient stop used for different types of gradients.
     *
     * @param color - The color used for the gradient stop.
     * @param pos - The position of the gradient stop measured in 1000th of percent.
     * @since 9.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateGradientStop/
     */
    CreateGradientStop(color: ApiColor, pos: PositivePercentage): ApiGradientStop;

    /**
     * Creates a group of drawings.
     *
     * @param drawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape1 = Api.CreateShape("rect", 300 * 36000, 130 * 36000, oFill1, oStroke);
     * let oShape2 = Api.CreateShape("rect", 150 * 36000, 80 * 36000, oFill2, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oShape2.SetPosition(3100000, 1867200);
     * let oGroup = Api.CreateGroup([oShape1, oShape2]);
     * oSlide.AddObject(oGroup);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateGroup/
     */
    CreateGroup(drawings: DrawingForGroup[]): ApiGroup;

    /**
     * Creates a new hyperlink object to be used for setting hyperlinks on drawing objects (shapes or
     * images).
     *
     * @param link - The hyperlink address. Accepts an external URL (http, https, mailto, ftp) or one of the internal
     *   slide actions: "ppaction://hlinkshowjump?jump=firstslide",
     *   "ppaction://hlinkshowjump?jump=lastslide", "ppaction://hlinkshowjump?jump=nextslide",
     *   "ppaction://hlinkshowjump?jump=previousslide", "ppaction://hlinksldjumpslide{N}" (N is the
     *   zero-based slide index), "ppaction://hlinkfile?file={path}" (opens an external file).
     * @param tooltip - The tooltip text.
     */
    CreateHyperlink(link: string, tooltip: string): ApiHyperlink;

    /**
     * Creates an image with the parameters specified.
     *
     * @param sImageSrc - The image source where the image to be inserted should be taken from (currently,
     *   only internet URL or Base64 encoded images are supported).
     * @param nWidth - The image width in English measure units.
     * @param nHeight - The image height in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oShape = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/step2_1.png", 300 * 36000, 150 * 36000);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateImage/
     */
    CreateImage(sImageSrc: string, nWidth: number, nHeight: number): ApiImage;

    /**
     * Creates a new slide layout and adds it to the slide master if it is specified.
     *
     * @param oMaster - Parent slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = Api.CreateLayout(oMaster);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("picture");
     * oShape.SetPlaceholder(oPlaceholder);
     * oLayout.AddObject(oShape);
     * oSlide1.ApplyLayout(oLayout);
     * var oSlide2 = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide2);
     * oSlide2.ApplyLayout(oLayout);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateLayout/
     */
    CreateLayout(oMaster?: ApiMaster): ApiLayout;

    /**
     * Creates a linear gradient fill to apply to the object using the selected linear gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     * @param angle - The angle measured in 60000th of a degree that will define the gradient direction.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateLinearGradientFill/
     */
    CreateLinearGradientFill(gradientStops: number[], angle: PositiveFixedAngle): ApiFill;

    /**
     * Creates a new slide master.
     *
     * @param oTheme - The presentation theme object.
     * @returns returns null if presentation theme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = Api.CreateMaster();
     * var nCountBefore = oPresentation.GetMastersCount();
     * oPresentation.AddMaster(nCountBefore, oMaster);
     * var nCountAfter = oPresentation.GetMastersCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters before adding new master: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of masters after adding new master: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateMaster/
     */
    CreateMaster(oTheme?: ApiTheme): ApiMaster;

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

    /**
     * Creates no fill and removes the fill from the element.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The stroke of this shape is transparent.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateNoFill/
     */
    CreateNoFill(): ApiFill;

    /**
     * Creates a bullet for a paragraph with the numbering character or symbol specified with the numType
     * parameter.
     *
     * @param numType - The numbering type the paragraphs will be numbered with.
     * @param startAt - The number the first numbered paragraph will start with.
     */
    CreateNumbering(numType: BulletType, startAt: number): ApiBullet;

    /**
     * Creates an OLE object with the parameters specified.
     *
     * @param sImageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param nWidth - The OLE object width in English measure units.
     * @param nHeight - The OLE object height in English measure units.
     * @param sData - The OLE object string data.
     * @param sAppId - The application ID associated with the current OLE object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateOleObject/
     */
    CreateOleObject(sImageSrc: string, nWidth: number, nHeight: number, sData: string, sAppId: string): ApiOleObject;

    /**
     * Creates a new paragraph.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is an example of a paragraph inside a shape. Nothing special.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateParagraph/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreatePatternFill/
     */
    CreatePatternFill(patternType: PatternType, bgColor: ApiColor, fgColor: ApiColor): ApiFill;

    /**
     * Creates a new placeholder.
     *
     * @param sType - The placeholder type ("body", "chart", "clipArt", "ctrTitle", "diagram", "date", "footer",
     *   "header", "media", "object", "picture", "sldImage", "sldNumber", "subTitle", "table", "title").
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("picture");
     * oShape.SetPlaceholder(oPlaceholder);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreatePlaceholder/
     */
    CreatePlaceholder(sType: string): ApiPlaceholder;

    /**
     * Creates a color selecting it from one of the available color presets.
     *
     * @param presetColor - A preset selected from the list of the available color preset names.
     * @returns ;
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreatePresetColor("peachPuff"), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreatePresetColor/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oRGBColor = Api.CreateRGBColor(255, 111, 61);
     * var oGs1 = Api.CreateGradientStop(Api.CreatePresetColor("peachPuff"), 0);
     * var oGs2 = Api.CreateGradientStop(oRGBColor, 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateRGBColor/
     */
    CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;

    /**
     * Creates a radial gradient fill to apply to the object using the selected radial gradient as the
     * object background.
     *
     * @param gradientStops - The array of gradient color stops measured in 1000th of percent.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreatePresetColor("peachPuff"), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateRadialGradientFill/
     */
    CreateRadialGradientFill(gradientStops: number[]): ApiFill;

    /**
     * Creates a new smaller text block to be inserted to the current paragraph or table.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.SetFontSize(60);
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetFontSize(60);
     * oRun.SetFontFamily("Comic Sans MS");
     * oRun.AddText("This is a text run with the font family set to 'Comic Sans MS'.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateRun/
     */
    CreateRun(): ApiRun;

    /**
     * Creates a complex color scheme selecting from one of the available schemes.
     *
     * @param schemeColorId - The color scheme identifier.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oSchemeColor = Api.CreateSchemeColor("dk1");
     * var oFill = Api.CreateSolidFill(oSchemeColor);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("curvedUpArrow", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateSchemeColor/
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
     * @param sType - The shape type which specifies the preset shape geometry.
     * @param nWidth - The shape width in English measure units.
     * @param nHeight - The shape height in English measure units.
     * @param oFill - The color or pattern used to fill the shape.
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.SetFontSize(60);
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetFontSize(60);
     * oRun.SetFontFamily("Comic Sans MS");
     * oRun.AddText("This is a text run with the font family set to 'Comic Sans MS'.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateShape/
     */
    CreateShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke): ApiShape;

    /**
     * Creates a new slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateSlide/
     */
    CreateSlide(): ApiSlide;

    /**
     * Creates a new slide show transition object.
     *
     * @returns Name of the transition effect.
     * @since 9.3.0
     */
    CreateSlideShowTransition(): ApiSlideShowTransition;

    /**
     * Creates a solid fill to apply to the object using a selected solid color as the object background.
     *
     * @param color - The color used for the element fill.
     * @since 9.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oRGBColor = Api.CreateRGBColor(255, 111, 61);
     * var oFill = Api.CreateSolidFill(oRGBColor);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oDrawing);
     * oDrawing.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateSolidFill/
     */
    CreateSolidFill(color: ApiColor): ApiFill;

    /**
     * Creates a stroke adding shadows to the element.
     *
     * @param width - The width of the shadow measured in English measure units.
     * @param fill - The fill type used to create the shadow.
     * @param sDash - The type of line dash.
     * @since 9.3.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(3 * 36000, oFill1);
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oSlide.AddObject(oShape);
     * oShape.SetPosition(608400, 1267200);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateStroke/
     */
    CreateStroke(width: number, fill: ApiFill, sDash?: DashType): ApiStroke;

    /**
     * Creates a table.
     *
     * @param rows - Number of rows.
     * @param cols - Number of columns.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateTable/
     */
    CreateTable(rows: unknown, cols: unknown): ApiTable;

    /**
     * Creates the empty table row properties.
     *
     * @since 9.5.0
     */
    CreateTableRowPr(): ApiTableRowPr;

    /**
     * Creates the empty text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oTextPr = Api.CreateTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetBold(true);
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is a sample text with the font size set to 25 points and the font weight set to bold.");
     * oRun.SetTextPr(oTextPr);
     * oParagraph.AddElement(oRun);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateTextPr/
     */
    CreateTextPr(): ApiTextPr;

    /**
     * Creates a new presentation theme.
     *
     * @param sName - Theme name.
     * @param oMaster - Slide master. Required parameter.
     * @param oClrScheme - Theme color scheme. Required parameter.
     * @param oFormatScheme - Theme format scheme. Required parameter.
     * @param oFontScheme - Theme font scheme. Required parameter.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateTheme/
     */
    CreateTheme(sName: string, oMaster: ApiMaster, oClrScheme: ApiThemeColorScheme, oFormatScheme: ApiThemeFormatScheme, oFontScheme: ApiThemeFontScheme): ApiTheme | null;

    /**
     * Creates a new theme color scheme.
     *
     * @param arrColors - Set of colors which are referred to as a color scheme.
     *   The color scheme is responsible for defining a list of twelve colors.
     *   The array should contain a sequence of colors: 2 dark, 2 light, 6 primary, a color for a
     *   hyperlink and a color for the followed hyperlink.
     * @param sName - Theme color scheme name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetColorScheme(oClrScheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * [200, 240, 280],
     * [250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateThemeColorScheme/
     */
    CreateThemeColorScheme(arrColors: ApiUniColor[] | ApiRGBColor[] | ApiColor[], sName: string): ApiThemeColorScheme;

    /**
     * Creates a new theme font scheme.
     *
     * @param mjLatin - The major theme font applied to the latin text.
     * @param mjEa - The major theme font applied to the east asian text.
     * @param mjCs - The major theme font applied to the complex script text.
     * @param mnLatin - The minor theme font applied to the latin text.
     * @param mnEa - The minor theme font applied to the east asian text.
     * @param mnCs - The minor theme font applied to the complex script text.
     * @param sName - Theme font scheme name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This text is written in the Times New Roman font.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateThemeFontScheme/
     */
    CreateThemeFontScheme(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string, sName: string): ApiThemeFontScheme;

    /**
     * Creates a new theme format scheme.
     *
     * @param arrFill - This array contains the fill styles. It should be consist of subtle, moderate and intense fills.
     * @param arrBgFill - This array contains the background fill styles. It should be consist of subtle, moderate and
     *   intense fills.
     * @param arrLine - This array contains the line styles. It should be consist of subtle, moderate and intense lines.
     * @param sName - Theme format scheme name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateThemeFormatScheme/
     */
    CreateThemeFormatScheme(arrFill: ApiFill[], arrBgFill: ApiFill[], arrLine: ApiStroke[], sName: string): ApiThemeFormatScheme;

    /**
     * Creates a Text Art object with the parameters specified.
     *
     * @param oTextPr - The text properties.
     * @param sText - The text for the Text Art object.
     * @param sTransform - Text transform type.
     * @param oFill - The color or pattern used to fill the Text Art object.
     * @param oStroke - The stroke used to create the Text Art object shadow.
     * @param nRotAngle - Rotation angle.
     * @param nWidth - The Text Art width measured in English measure units.
     * @param nHeight - The Text Art heigth measured in English measure units.
     * @param nIndLeft - The Text Art left side indentation value measured in English measure units.
     * @param nIndTop - The Text Art top side indentation value measured in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(72);
     * oTextPr.SetBold(true);
     * oTextPr.SetCaps(true);
     * oTextPr.SetColor(51, 51, 51, false);
     * oTextPr.SetFontFamily("Comic Sans MS");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * var oTextArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", oFill, oStroke, 0, 100 * 36000, 30 * 36000);
     * oSlide.AddObject(oTextArt);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/CreateWordArt/
     */
    CreateWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nIndLeft?: number, nIndTop?: number): ApiDrawing;

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
     * Converts the specified JSON object into the Document Builder object of the corresponding type.
     *
     * @param sMessage - The JSON object to convert.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oThemeMaster = oMaster.GetTheme();
     * var oFontScheme = oThemeMaster.GetFontScheme();
     * oFontScheme.SetFonts("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oFontScheme.SetSchemeName("New font scheme name");
     * var json = oFontScheme.ToJSON();
     * var oFontSchemeFromJSON = Api.FromJSON(json);
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetFontScheme(oFontSchemeFromJSON);
     * var sType = oFontSchemeFromJSON.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/FromJSON/
     */
    FromJSON(sMessage: object): void;

    /**
     * Returns the full name of the currently opened file.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sName = Api.GetFullName();
     * oParagraph.AddText("File name: " + sName);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/GetFullName/
     */
    GetFullName(): string;

    /**
     * Returns the main presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/GetPresentation/
     */
    GetPresentation(): ApiPresentation;

    /**
     * Returns the selection from the current presentation.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/GetSelection/
     */
    GetSelection(): ApiSelection;

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
     * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
     * strings.
     *
     * @param textStrings - An array of replacement strings.
     * @param tab - A character which is used to specify the tab in the source text.
     * @param newLine - A character which is used to specify the line break character in the source text.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oFParagraph = oDocContent.GetElement(0);
     * oFParagraph.AddText("This is the text for the first line. The line break is added after it.");
     * oFParagraph.AddLineBreak();
     * var oSParagraph = Api.CreateParagraph();
     * oSParagraph.AddTabStop();
     * oSParagraph.AddText("This is just a sample text with a tab stop before it.");
     * oDocContent.AddElement(oSParagraph);
     * oSlide.AddObject(oShape);
     * // todo_example problem (how to make select in slide)
     * // var oRange1 = oFParagraph.GetRange();
     * // var oRange2 = oSParagraph.GetRange();
     * // var oRange3 = oRange1.ExpandTo(oRange2);
     * // oRange3.Select();
     * var arr = ["test_1", "test_2"];
     * Api.ReplaceTextSmart(arr, "", "");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/ReplaceTextSmart/
     */
    ReplaceTextSmart(textStrings: string[], tab?: string, newLine?: string): boolean;

    /**
     * Saves changes to the specified document.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This shape with paragraph in it is saved to the document.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * Api.Save();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/Save/
     */
    Save(): void;

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

    /**
     * Subscribes to the specified event and calls the callback function when the event fires.
     *
     * @param eventName - The event name.
     * @param callback - Function to be called when the event fires.
     *
     * @example
     * ```js
     * Api.attachEvent("asc_onHyperlinkClick", function() {
     * 	console.log("HYPERLINK!!!");
     * });
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/attachEvent/
     */
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): void;

    /**
     * Unsubscribes from the specified event.
     *
     * @param eventName - The event name.
     *
     * @example
     * ```js
     * Api.detachEvent("asc_onHyperlinkClick");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/Api/Methods/detachEvent/
     */
    detachEvent(eventName: string): void;
  }

  /** Class representing an animation effect. */
  export interface ApiAnimationEffect {
    /**
     * Deletes the animation effect.
     *
     * @returns True if the effect was deleted successfully.
     * @since 9.3.0
     */
    Delete(): boolean;

    /**
     * Returns the type of the ApiAnimationEffect class.
     *
     * @since 9.3.0
     */
    GetClassType(): "animationEffect";

    /**
     * Returns the delay before the animation effect starts in milliseconds.
     *
     * @returns The delay in milliseconds.
     * @since 9.3.0
     */
    GetDelay(): number;

    /**
     * Returns the duration of the animation effect in milliseconds.
     *
     * @returns The duration in milliseconds.
     * @since 9.3.0
     */
    GetDuration(): number;

    /**
     * Returns the animation effect type.
     *
     * @returns The effect type name (e.g., "entranceFade", "exitFadeOut", "emphasisPulse"), or null if unknown.
     * @since 9.3.0
     */
    GetEffectType(): AnimationEffectType | null;

    /**
     * Returns the repeat count for the animation effect.
     *
     * @returns The repeat count (1 = play once, 2 = play twice, etc.). Returns 1 if not set.
     * @since 9.3.0
     */
    GetRepeatCount(): number;

    /**
     * Returns the animated drawing object.
     *
     * @returns The animated drawing or null if not found.
     * @since 9.3.0
     */
    GetShape(): ApiDrawing | null;

    /**
     * Returns the trigger type for the animation effect.
     *
     * @returns The trigger type: "onclick", "withprevious", or "afterprevious".
     * @since 9.3.0
     */
    GetTriggerType(): AnimationTriggerType;

    /**
     * Moves the animation effect to the specified position in the sequence.
     *
     * @param index - The new zero-based position for the effect.
     * @returns True if the effect was moved successfully.
     * @since 9.3.0
     */
    MoveTo(index: number): boolean;

    /**
     * Sets the delay before the animation effect starts in milliseconds.
     *
     * @param delay - The delay in milliseconds.
     * @returns True if the delay was set successfully.
     * @since 9.3.0
     */
    SetDelay(delay: number): boolean;

    /**
     * Sets the duration of the animation effect in milliseconds.
     *
     * @param duration - The duration in milliseconds.
     * @returns True if the duration was set successfully.
     * @since 9.3.0
     */
    SetDuration(duration: number): boolean;

    /**
     * Sets the repeat count for the animation effect.
     *
     * @param count - The repeat count (1 = play once, 2 = play twice, etc.).
     * @returns True if the repeat count was set successfully.
     * @since 9.3.0
     */
    SetRepeatCount(count: number): boolean;

    /**
     * Sets the trigger type for the animation effect.
     *
     * @param trigger - The trigger type: "onclick", "withprevious", or "afterprevious".
     * @returns True if the trigger type was set successfully.
     * @since 9.3.0
     */
    SetTriggerType(trigger: AnimationTriggerType): boolean;
  }

  /** Class representing an animation sequence (main sequence or interactive sequence). */
  export interface ApiAnimationSequence {
    /**
     * Adds an animation effect to the sequence.
     *
     * @param drawing - The drawing object to animate.
     * @param effectType - The type of animation effect (e.g., "entranceFade", "entranceFlyIn", "emphasisPulse").
     * @param trigger - The trigger type: "onclick", "withprevious", or "afterprevious".
     * @returns The created animation effect, or null if creation failed.
     * @since 9.3.0
     */
    AddEffect(drawing: ApiDrawing, effectType: AnimationEffectType, trigger?: AnimationTriggerType): ApiAnimationEffect | null;

    /**
     * Returns the type of the ApiAnimationSequence class.
     *
     * @since 9.3.0
     */
    GetClassType(): "animationSequence";

    /**
     * Returns the number of effects in the sequence.
     *
     * @returns The number of effects.
     * @since 9.3.0
     */
    GetCount(): number;

    /**
     * Returns the effect at the specified index.
     *
     * @param index - The zero-based index of the effect.
     * @returns The effect at the specified index, or null if not found.
     * @since 9.3.0
     */
    GetEffect(index: number): ApiAnimationEffect | null;

    /**
     * Removes all effects from the sequence.
     *
     * @returns True if effects were removed successfully.
     * @since 9.3.0
     */
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
    /**
     * Returns a type of the ApiBullet class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oBullet = Api.CreateBullet("-");
     * oParagraph.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the bulleted paragraph.");
     * var sClassType = oBullet.GetClassType();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiBullet/Methods/GetClassType/
     */
    GetClassType(): "bullet";

    /** Converts the ApiBullet object into the JSON object. */
    ToJSON(): object;
  }

  /** Class representing a chart. */
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "SetTitle"> {
    /**
     * Sets a style to the current chart by style ID.
     *
     * @param nStyleId - One of the styles available in the editor.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.ApplyChartStyle(2);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oChart.SetSeriesOutLine(oStroke, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oChart.SetSeriesOutLine(oStroke, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/ApplyChartStyle/
     */
    ApplyChartStyle(nStyleId: unknown): boolean;

    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns all series from the chart space.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("comboBarLine", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * var aAllSeries = oChart.GetAllSeries();
     * var oSeries, sSeriesType, sTitle = "";
     * for(var nSeries = 0; nSeries < aAllSeries.length; ++nSeries) {
     * 	oSeries = aAllSeries[nSeries];
     * 	sSeriesType = oSeries.GetChartType();
     * 	sTitle += ((nSeries + 1) + " Series Type = " + sSeriesType + "\n");
     * }
     * oChart.SetTitle(sTitle, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/GetAllSeries/
     */
    GetAllSeries(): ApiChartSeries[];

    /**
     * Returns a type of the chart object.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChart class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * var sClassType = oChart.GetClassType();
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview: Class Type = " + sClassType, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/GetClassType/
     */
    GetClassType(): "chart";

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns the series with a specific index.
     *
     * @param nIdx - Series index.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("comboBarLine", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * var aAllSeries = oChart.GetAllSeries();
     * var oSeries, sSeriesType, sTitle = "";
     * oSeries = oChart.GetSeries(0);
     * sSeriesType = oSeries.GetChartType();
     * sTitle += ("Series Type = " + sSeriesType + "\n");
     * oChart.SetTitle(sTitle, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/GetSeries/
     */
    GetSeries(nIdx: number): ApiChartSeries;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

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
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Removes the specified series from the current chart.
     *
     * @param nSeria - The index of the chart series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.RemoveSeria(1);
     * oChart.SetTitle("The Estimated Costs series was removed from the current chart.");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/RemoveSeria/
     */
    RemoveSeria(nSeria: number): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetCategoryName("2013", 0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetCategoryName/
     */
    SetCategoryName(sName: string, nCategory: number): boolean;

    /**
     * Sets the text properties to the chart data labels.
     *
     * @param textPr - The text properties to apply to the data labels.
     * @returns Returns true if the text properties were applied successfully, false otherwise.
     * @since 9.5.0
     */
    SetDataLabelsTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the fill to the data point in the specified chart series.
     *
     * @param oFill - The fill type used to fill the data point.
     * @param nSeries - The index of the chart series.
     * @param nDataPoint - The index of the data point in the specified chart series.
     * @param bAllSeries - Specifies if the fill will be applied to the specified data point in all series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(128, 128, 128));
     * oChart.SetDataPointFill(oFill, 0, 0, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetDataPointFill/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24, ["0", "0.00"]);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetShowPointDataLabel(1, 0, false, false, true, false);
     * oChart.SetDataPointNumFormat("0.00", 0, 0, true);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetDataPointNumFormat/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetDataPointOutLine(oStroke, 0, 0, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetDataPointOutLine/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetHorAxisMajorTickMark("cross");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetHorAxisMajorTickMark/
     */
    SetHorAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the horizontal axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetHorAxisMinorTickMark("in");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetHorAxisMinorTickMark/
     */
    SetHorAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies the horizontal axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the horizontal axis (from minimum to
     *   maximum).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetHorAxisOrientation(false);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetHorAxisOrientation/
     */
    SetHorAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Spicifies tick labels position for the horizontal axis.
     *
     * @param sTickLabelPosition - The type for the position of chart horizontal tick labels.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetHorAxisTickLabelPosition("high");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetHorAxisTickLabelPosition/
     */
    SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Specifies the chart horizontal axis title.
     *
     * @param sTitle - The title which will be displayed for the horizontal axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the horizontal axis title is written in bold font or not.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetHorAxisTitle/
     */
    SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the fill to the chart legend.
     *
     * @param oFill - The fill type used to fill the legend.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(128, 128, 128));
     * oChart.SetLegendFill(oFill);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetLegendFill/
     */
    SetLegendFill(oFill: ApiFill): boolean;

    /**
     * Specifies the legend font size.
     *
     * @param nFontSize - The text size value measured in points.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetLegendFontSize(16);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetLegendFontSize/
     */
    SetLegendFontSize(nFontSize: number): boolean;

    /**
     * Sets the outline to the chart legend.
     *
     * @param oStroke - The stroke used to create the legend outline.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetLegendOutLine(oStroke);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetLegendOutLine/
     */
    SetLegendOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the chart legend position.
     *
     * @param sLegendPos - The position of the chart legend inside the chart window.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetLegendPos/
     */
    SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): boolean;

    /**
     * Specifies major horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(1 * 15000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMajorHorizontalGridlines(oStroke);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMajorHorizontalGridlines/
     */
    SetMajorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies major vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(1 * 15000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMajorVerticalGridlines(oStroke);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMajorVerticalGridlines/
     */
    SetMajorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the fill to the marker in the specified chart series.
     *
     * @param oFill - The fill type used to fill the marker.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the fill will be applied to all markers in the specified chart series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMarkerFill/
     */
    SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Sets the outline to the marker in the specified chart series.
     *
     * @param oStroke - The stroke used to create the marker outline.
     * @param nSeries - The index of the chart series.
     * @param nMarker - The index of the marker in the specified chart series.
     * @param bAllMarkers - Specifies if the outline will be applied to all markers in the specified chart series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMarkerOutLine/
     */
    SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;

    /**
     * Specifies minor horizontal gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(1 * 10000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMinorHorizontalGridlines(oStroke);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMinorHorizontalGridlines/
     */
    SetMinorHorizontalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Specifies minor vertical gridline visual properties.
     *
     * @param oStroke - The stroke used to create the element shadow.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(1 * 10000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMinorVerticalGridlines(oStroke);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetMinorVerticalGridlines/
     */
    SetMinorVerticalGridlines(oStroke: ApiStroke): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the fill to the chart plot area.
     *
     * @param oFill - The fill type used to fill the plot area.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(128, 128, 128));
     * oChart.SetPlotAreaFill(oFill);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetPlotAreaFill/
     */
    SetPlotAreaFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart plot area.
     *
     * @param oStroke - The stroke used to create the plot area outline.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetPlotAreaOutLine(oStroke);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetPlotAreaOutLine/
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
     */
    SetPointDataLabelTextPr(seriesIndex: number, pointIndex: number, textPr: ApiTextPr): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;

    /**
     * Sets a name to the specified chart series.
     *
     * @param sName - The name which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetSeriaName("Projected Sales", 0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetSeriaName/
     */
    SetSeriaName(sName: string, nSeria: number): boolean;

    /**
     * Sets the specified numeric format to the chart series.
     *
     * @param sFormat - Numeric format (can be custom format).
     * @param nSeria - Series index.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24, ["0", "0.00"]);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetSeriaNumFormat("0.00", 0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetSeriaNumFormat/
     */
    SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;

    /**
     * Sets values to the specified chart series.
     *
     * @param aValues - The array of the data which will be set to the specified chart series.
     * @param nSeria - The index of the chart series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetSeriaValues([260, 270, 300], 1);
     * oChart.SetShowPointDataLabel(1, 0, false, false, true, false);
     * oChart.SetShowPointDataLabel(1, 1, false, false, true, false);
     * oChart.SetShowPointDataLabel(1, 2, false, false, true, false);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetSeriaValues/
     */
    SetSeriaValues(aValues: number[], nSeria: number): boolean;

    /**
     * Sets the fill to the specified chart series.
     *
     * @param oFill - The fill type used to fill the series.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the fill will be applied to all series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetSeriesFill/
     */
    SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;

    /**
     * Sets the outline to the specified chart series.
     *
     * @param oStroke - The stroke used to create the series outline.
     * @param nSeries - The index of the chart series.
     * @param bAll - Specifies if the outline will be applied to all series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oChart.SetSeriesOutLine(oStroke, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oChart.SetSeriesOutLine(oStroke, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetSeriesOutLine/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetShowDataLabels/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetShowPointDataLabel(1, 0, false, false, true, false);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetShowPointDataLabel/
     */
    SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): boolean;

    /**
     * Specifies the chart title.
     *
     * @param sTitle - The title which will be displayed for the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the chart title is written in bold font or not.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetTitle/
     */
    SetTitle(sTitle: string, nFontSize: number, bIsBold: boolean): boolean;

    /**
     * Sets the fill to the chart title.
     *
     * @param oFill - The fill type used to fill the title.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(128, 128, 128));
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetTitleFill(oFill);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetTitleFill/
     */
    SetTitleFill(oFill: ApiFill): boolean;

    /**
     * Sets the outline to the chart title.
     *
     * @param oStroke - The stroke used to create the title outline.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetTitle("Financial Overview", 13);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetTitleOutLine(oStroke);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetTitleOutLine/
     */
    SetTitleOutLine(oStroke: ApiStroke): boolean;

    /**
     * Specifies the vertical axis orientation.
     *
     * @param bIsMinMax - The `true` value will set the normal data direction for the vertical axis (from minimum to
     *   maximum).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetTitle("Financial Overview", 13);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetTitleOutLine(oStroke);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetVerAxisOrientation/
     */
    SetVerAxisOrientation(bIsMinMax: boolean): boolean;

    /**
     * Specifies the chart vertical axis title.
     *
     * @param sTitle - The title which will be displayed for the vertical axis of the current chart.
     * @param nFontSize - The text size value measured in points.
     * @param bIsBold - Specifies if the vertical axis title is written in bold font or not.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetVerAxisTitle/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetVertAxisMajorTickMark("cross");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetVertAxisMajorTickMark/
     */
    SetVertAxisMajorTickMark(sTickMark: TickMark): boolean;

    /**
     * Specifies minor tick mark for the vertical axis.
     *
     * @param sTickMark - The type of tick mark appearance.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetVertAxisMinorTickMark("out");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0.5 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetVertAxisMinorTickMark/
     */
    SetVertAxisMinorTickMark(sTickMark: TickMark): boolean;

    /**
     * Spicifies tick labels position for the vertical axis.
     *
     * @param sTickLabelPosition - The type for the position of chart vertical tick labels.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetVertAxisTickLabelPosition("high");
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetVertAxisTickLabelPosition/
     */
    SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): boolean;

    /**
     * Sets the x-axis values to all chart series. It is used with the scatter charts only.
     *
     * @param aValues - The array of the data which will be set to the x-axis data points.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("scatter", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oChart.SetXValues(["2020", "2021", "2022"]);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oChart.SetMarkerFill(oFill, 0, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 0, 0, true);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(1 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * oChart.SetMarkerFill(oFill, 1, 0, true);
     * oChart.SetMarkerOutLine(oStroke, 1, 0, true);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChart/Methods/SetXValues/
     */
    SetXValues(aValues: string[]): boolean;
  }

  /** Class representing a chart series. */
  export interface ApiChartSeries {
    /**
     * Tries to change the series type. Returns true if successful.
     *
     * @param sType - Chart type.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("comboBarLine", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * var aAllSeries = oChart.GetAllSeries();
     * var oSeries, sSeriesType, sTitle = "";
     * oSeries = oChart.GetSeries(0);
     * sSeriesType = oSeries.GetChartType();
     * sTitle += "Old Series Type = " + sSeriesType + "\n";
     * oSeries.ChangeChartType("area");
     * sSeriesType = oSeries.GetChartType();
     * sTitle += "New Series Type = " + sSeriesType;
     * oChart.SetTitle(sTitle, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChartSeries/Methods/ChangeChartType/
     */
    ChangeChartType(sType: ChartType): boolean;

    /**
     * Returns a chart type of the current series.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("comboBarLine", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * var aAllSeries = oChart.GetAllSeries();
     * var oSeries, sSeriesType, sTitle = "";
     * oSeries = oChart.GetSeries(0);
     * sSeriesType = oSeries.GetChartType();
     * sTitle += "Series Type = " + sSeriesType + "\n";
     * oChart.SetTitle(sTitle, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChartSeries/Methods/GetChartType/
     */
    GetChartType(): ChartTypeLegacy;

    /**
     * Returns a type of the ApiChartSeries class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("comboBarLine", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * var aAllSeries = oChart.GetAllSeries();
     * var oSeries, sClassType, sTitle = "";
     * oSeries = oChart.GetSeries(0);
     * sClassType = oSeries.GetClassType();
     * sTitle += "Class Type = " + sClassType + "\n";
     * oChart.SetTitle(sTitle, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiChartSeries/Methods/GetClassType/
     */
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

  /** Class representing a comment. */
  export interface ApiComment {
    /**
     * Adds a reply to a comment.
     *
     * @param sText - The comment reply text (required).
     * @param sAuthorName - The name of the comment reply author (optional).
     * @param sUserId - The user ID of the comment reply author (optional).
     * @param nPos - The comment reply position.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's reply text: " + oReply.GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/AddReply/
     */
    AddReply(sText: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;

    /**
     * Deletes the current comment from the document.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].Delete();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The comment was just deleted from the current presentation.");
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns the comment author's name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's author: " + arrComments[0].GetAuthorName());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiComment class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var sType = arrComments[0].GetClassType();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Type: " + sType);
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetClassType/
     */
    GetClassType(): "comment";

    /**
     * Returns the position of the comment in the document.
     *
     * @returns An object with the coordinates (in EMU) of the comment position.
     */
    GetPosition(): object;

    /**
     * Returns the quote text of the current comment.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's quote text: " + arrComments[0].GetQuoteText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetQuoteText/
     */
    GetQuoteText(): number;

    /**
     * Returns a number of the comment replies.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment replies count: " + arrComments[0].GetRepliesCount());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetRepliesCount/
     */
    GetRepliesCount(): number;

    /**
     * Returns the comment text.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment: " + arrComments[0].GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the timestamp of the comment creation in the current time zone format.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Timestamp: " + arrComments[0].GetTime());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetTime/
     */
    GetTime(): number;

    /**
     * Returns the timestamp of the comment creation in UTC format.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Timestamp UTC: " + arrComments[0].GetTimeUTC());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/GetTimeUTC/
     */
    GetTimeUTC(): number;

    /** Returns the user ID of the comment author. */
    GetUserId(): string;

    /**
     * Checks if a comment is solved or not.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/IsSolved/
     */
    IsSolved(): boolean;

    /**
     * Removes the specified comment replies.
     *
     * @param nPos - The position of the first comment reply to remove.
     * @param nCount - A number of comment replies to remove.
     * @param bRemoveAll - Specifies whether to remove all comment replies or not.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * arrComments[0].AddReply("Reply 2", "John Smith", "uid-1");
     * arrComments[0].RemoveReplies(0, 1, false);
     * var oReply = arrComments[0].GetReply(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment replies count: " + arrComments[0].GetRepliesCount());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/RemoveReplies/
     */
    RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): ApiComment;

    /**
     * Sets the comment author's name.
     *
     * @param sAuthorName - The comment author's name.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetAuthorName("Mark Potato");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's author: " + arrComments[0].GetAuthorName());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): ApiComment;

    /**
     * Sets the position of the comment in the document.
     *
     * @param x - The X coordinate of the comment position in EMU.
     * @param y - The Y coordinate of the comment position in EMU.
     */
    SetPosition(x: number, y: number): void;

    /**
     * Marks a comment as solved.
     *
     * @param bSolved - Specifies if a comment is solved or not.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetSolved(true);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The comment is solved.");
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetSolved/
     */
    SetSolved(bSolved: boolean): ApiComment;

    /**
     * Sets the comment text.
     *
     * @param sText - The comment text.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetText("New comment text");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment text: " + arrComments[0].GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetText/
     */
    SetText(sText: string): ApiComment;

    /**
     * Sets the timestamp of the comment creation in the current time zone format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in the current time zone format.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetTime(Date.now());
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Timestamp: " + arrComments[0].GetTime());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetTime/
     */
    SetTime(nTimeStamp: number | string): ApiComment;

    /**
     * Sets the timestamp of the comment creation in UTC format.
     *
     * @param nTimeStamp - The timestamp of the comment creation in UTC format.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetTimeUTC(Date.now());
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Timestamp UTC: " + arrComments[0].GetTimeUTC());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetTimeUTC/
     */
    SetTimeUTC(nTimeStamp: number | string): ApiComment;

    /**
     * Sets the user ID to the comment author.
     *
     * @param sUserId - The user ID of the comment author.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].SetUserId("uid-2");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The ID of the user who commented on this presentation is uid-2.");
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiComment/Methods/SetUserId/
     */
    SetUserId(sUserId: string): ApiComment;
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
    /**
     * Returns the comment reply author's name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's reply author: " + oReply.GetAuthorName());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/GetAuthorName/
     */
    GetAuthorName(): string;

    /**
     * Returns a type of the ApiCommentReply class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Type: " + oReply.GetClassType());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/GetClassType/
     */
    GetClassType(): "commentReply";

    /**
     * Returns the comment reply text.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's reply text: " + oReply.GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/GetText/
     */
    GetText(): string;

    /**
     * Sets the comment reply author's name.
     *
     * @param sAuthorName - The comment reply author's name.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * oReply.SetAuthorName("Mark Potato");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's reply author: " + oReply.GetAuthorName());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/SetAuthorName/
     */
    SetAuthorName(sAuthorName: string): ApiCommentReply;

    /**
     * Sets the comment reply text.
     *
     * @param sText - The comment reply text.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * oReply.SetText("New reply text.");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment's reply text: " + oReply.GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/SetText/
     */
    SetText(sText: string): ApiCommentReply;

    /**
     * Sets the user ID to the comment reply author.
     *
     * @param sUserId - The user ID of the comment reply author.
     * @returns this
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * arrComments[0].AddReply("Reply 1", "John Smith", "uid-1");
     * var oReply = arrComments[0].GetReply(0);
     * oReply.SetUserId("uid-2");
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The comment's reply user Id is uid-2.");
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiCommentReply/Methods/SetUserId/
     */
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
    /**
     * Returns the document category.
     *
     * @returns The document category.
     * @since 9.0.0
     */
    GetCategory(): string;

    /**
     * Returns a type of the ApiCore class.
     *
     * @since 9.0.0
     */
    GetClassType(): "core";

    /**
     * Returns the document content status.
     *
     * @returns The document content status.
     * @since 9.0.0
     */
    GetContentStatus(): string;

    /**
     * Returns the document creation date.
     *
     * @returns The document creation date.
     * @since 9.0.0
     */
    GetCreated(): Date;

    /**
     * Returns the document author.
     *
     * @returns The document author.
     * @since 9.0.0
     */
    GetCreator(): string;

    /**
     * Returns the document description.
     *
     * @returns The document description.
     * @since 9.0.0
     */
    GetDescription(): string;

    /**
     * Returns the document identifier.
     *
     * @returns The document identifier.
     * @since 9.0.0
     */
    GetIdentifier(): string;

    /**
     * Returns the document keywords.
     *
     * @returns The document keywords in the string format.
     * @since 9.0.0
     */
    GetKeywords(): string;

    /**
     * Returns the document language.
     *
     * @returns The document language.
     * @since 9.0.0
     */
    GetLanguage(): string;

    /**
     * Returns the name of the user who last modified the document.
     *
     * @returns The name of the user who last modified the document.
     * @since 9.0.0
     */
    GetLastModifiedBy(): string;

    /**
     * Returns the date when the document was last printed.
     *
     * @returns The date when the document was last printed.
     * @since 9.0.0
     */
    GetLastPrinted(): Date;

    /**
     * Returns the date when the document was last modified.
     *
     * @returns The date when the document was last modified.
     * @since 9.0.0
     */
    GetModified(): Date;

    /**
     * Returns the document revision.
     *
     * @returns The document revision.
     * @since 9.0.0
     */
    GetRevision(): string;

    /**
     * Returns the document subject.
     *
     * @returns The document subject.
     * @since 9.0.0
     */
    GetSubject(): string;

    /**
     * Returns the document title.
     *
     * @returns The document title.
     * @since 9.0.0
     */
    GetTitle(): string;

    /**
     * Returns the document version.
     *
     * @returns The document version.
     * @since 9.0.0
     */
    GetVersion(): string;

    /**
     * Sets the document category.
     *
     * @param sCategory - The document category.
     * @since 9.0.0
     */
    SetCategory(sCategory: string): void;

    /**
     * Sets the document content status.
     *
     * @param sStatus - The document content status.
     * @since 9.0.0
     */
    SetContentStatus(sStatus: string): void;

    /**
     * Sets the document creation date.
     *
     * @param oCreated - The document creation date.
     * @since 9.0.0
     */
    SetCreated(oCreated: Date): void;

    /**
     * Sets the document author.
     *
     * @param sCreator - The document author.
     * @since 9.0.0
     */
    SetCreator(sCreator: string): void;

    /**
     * Sets the document description.
     *
     * @param sDescription - The document description.
     * @since 9.0.0
     */
    SetDescription(sDescription: string): void;

    /**
     * Sets the document identifier.
     *
     * @param sIdentifier - The document identifier.
     * @since 9.0.0
     */
    SetIdentifier(sIdentifier: string): void;

    /**
     * Sets the document keywords.
     *
     * @param sKeywords - The document keywords in the string format.
     * @since 9.0.0
     */
    SetKeywords(sKeywords: string): void;

    /**
     * Sets the document language.
     *
     * @param sLanguage - The document language.
     * @since 9.0.0
     */
    SetLanguage(sLanguage: string): void;

    /**
     * Sets the name of the user who last modified the document.
     *
     * @param sLastModifiedBy - The name of the user who last modified the document.
     * @since 9.0.0
     */
    SetLastModifiedBy(sLastModifiedBy: string): void;

    /**
     * Sets the date when the document was last printed.
     *
     * @param oLastPrinted - The date when the document was last printed.
     * @since 9.0.0
     */
    SetLastPrinted(oLastPrinted: Date): void;

    /**
     * Sets the date when the document was last modified.
     *
     * @param oModified - The date when the document was last modified.
     * @since 9.0.0
     */
    SetModified(oModified: Date): void;

    /**
     * Sets the document revision.
     *
     * @param sRevision - The document revision.
     * @since 9.0.0
     */
    SetRevision(sRevision: string): void;

    /**
     * Sets the document subject.
     *
     * @param sSubject - The document subject.
     * @since 9.0.0
     */
    SetSubject(sSubject: string): void;

    /**
     * Sets the document title.
     *
     * @param sTitle - The document title.
     * @since 9.0.0
     */
    SetTitle(sTitle: string): void;

    /**
     * Sets the document version.
     *
     * @param sVersion - The document version.
     * @since 9.0.0
     */
    SetVersion(sVersion: string): void;
  }

  /** Class representing custom properties of the document. */
  export interface ApiCustomProperties {
    /**
     * Adds a custom property to the document with automatic type detection.
     *
     * @param name - The custom property name.
     * @param value - The custom property value.
     * @returns Returns false if the type is unsupported.
     * @since 9.0.0
     */
    Add(name: string, value: string | number | boolean | Date): boolean;

    /**
     * Returns the value of a custom property by its name.
     *
     * @param name - The custom property name.
     * @returns The value of the custom property or null if the property does not exist.
     * @since 9.0.0
     */
    Get(name: string): string | number | Date | boolean | null;

    /**
     * Returns a type of the ApiCustomProperties class.
     *
     * @since 9.0.0
     */
    GetClassType(): "customProperties";
  }

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlNode {
    /**
     * Creates a child node for the current XML node.
     *
     * @param nodeName - The name of the new child node.
     * @returns The newly created child node.
     * @since 9.0.0
     */
    Add(nodeName: string): ApiCustomXmlNode;

    /**
     * Deletes the current XML node.
     *
     * @returns Returns `true` if the node was successfully deleted.
     * @since 9.0.0
     */
    Delete(): boolean;

    /**
     * Deletes an attribute from the custom XML node.
     * If the attribute exists, it will be removed.
     *
     * @param name - The name of the attribute to delete.
     * @returns Returns `true` if the attribute was successfully deleted, `false` if the attribute didn't exist.
     * @since 9.0.0
     */
    DeleteAttribute(name: string): boolean;

    /**
     * Retrieves the attribute value from the custom XML node.
     * If the attribute doesn't exist, it returns `false`.
     *
     * @param name - The name of the attribute to retrieve.
     * @returns The value of the attribute if it exists, or `null` if the attribute is not found.
     * @since 9.0.0
     */
    GetAttribute(name: string): string | null;

    /**
     * Returns a list of attributes of the current XML node.
     *
     * @returns An array of attribute objects.
     * @since 9.0.0
     */
    GetAttributes(): CustomXmlNodeAttribute[];

    /** Returns a type of the ApiCustomXmlNode class. */
    GetClassType(): "customXmlNode";

    /**
     * Returns the name of the current XML node.
     *
     * @returns The name of the current node.
     * @since 9.0.0
     */
    GetNodeName(): string;

    /**
     * Returns the XML string representation of the current node content.
     *
     * @returns The XML string representation of the current node content.
     * @since 9.0.0
     */
    GetNodeValue(): string;

    /**
     * Returns nodes from the custom XML node based on the given XPath.
     *
     * @param xPath - The XPath expression to match nodes.
     * @returns An array of nodes that match the given XPath.
     * @since 9.0.0
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Returns the parent of the current XML node.
     *
     * @returns The parent node, or `null` if the current node has no parent.
     * @since 9.0.0
     */
    GetParent(): ApiCustomXmlNode | null;

    /**
     * Returns the inner text of the current node and its child nodes.
     * For example: `<text>123<one>4</one></text>` returns `"1234"`.
     *
     * @returns The combined text content of the node and its descendants.
     * @since 9.0.0
     */
    GetText(): string;

    /**
     * Returns the absolute XPath of the current XML node.
     *
     * @returns The absolute XPath of the current node.
     * @since 9.0.0
     */
    GetXPath(): string;

    /**
     * Returns the XML string of the current node.
     *
     * @returns The XML string representation of the current node.
     * @since 9.0.0
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
     */
    SetAttribute(name: string, value: string): boolean;

    /**
     * Sets the XML content for the current node.
     *
     * @param xml - The XML string to set as the content of the current node.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
     */
    SetNodeValue(xml: string): boolean;

    /**
     * Sets the text content of the current XML node.
     *
     * @param str - The text content to set for the node.
     * @returns Returns `true` if the text was successfully set.
     * @since 9.0.0
     */
    SetText(str: string): boolean;

    /**
     * Sets the XML content of the current XML node.
     *
     * @param strXml - The XML string to set as the node content.
     * @returns Returns `true` if the XML was successfully set.
     * @since 9.0.0
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
     */
    UpdateAttribute(name: string, value: string): boolean;
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlPart {
    /**
     * Deletes the XML from the custom XML manager.
     *
     * @returns True if the XML was successfully deleted.
     * @since 9.0.0
     */
    Delete(): boolean;

    /**
     * Deletes an attribute from the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node from which to delete the attribute.
     * @param name - The name of the attribute to delete.
     * @returns True if the attribute was successfully deleted.
     * @since 9.0.0
     */
    DeleteAttribute(xPath: string, name: string): boolean;

    /**
     * Deletes an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the node to delete.
     * @returns True if the element was successfully deleted.
     * @since 9.0.0
     */
    DeleteElement(xPath: string): boolean;

    /**
     * Returns an attribute from the XML node at the specified XPath.
     *
     * @param xPath - The XPath of the node from which to get the attribute.
     * @param name - The name of the attribute to find.
     * @returns The attribute value or null if no matching attributes are found.
     * @since 9.0.0
     */
    GetAttribute(xPath: string, name: string): string | null;

    /** Returns a type of the ApiCustomXmlPart class. */
    GetClassType(): "customXmlPart";

    /** Returns the ID of the custom XML part. */
    GetId(): string;

    /**
     * Retrieves nodes from custom XML based on the provided XPath.
     *
     * @param xPath - The XPath expression to search for nodes.
     * @returns An array of ApiCustomXmlNode objects corresponding to the found nodes.
     * @since 9.0.0
     */
    GetNodes(xPath: string): ApiCustomXmlNode[];

    /**
     * Retrieves the XML string from the custom XML part.
     *
     * @returns The XML string.
     * @since 9.0.0
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
     */
    UpdateAttribute(xPath: string, name: string, value: string): boolean;

    /**
     * Updates an XML element at the specified XPath.
     *
     * @param xPath - The XPath of the node to update.
     * @param xmlStr - The XML string to replace the node content with.
     * @returns True if the update was successful.
     * @since 9.0.0
     */
    UpdateElement(xPath: string, xmlStr: string): boolean;
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   */
  export interface ApiCustomXmlParts {
    /**
     * Adds a new custom XML part to the XML manager.
     *
     * @param xml - The XML string to be added.
     * @returns The newly created ApiCustomXmlPart object.
     * @since 9.0.0
     */
    Add(xml: string): ApiCustomXmlPart;

    /**
     * Returns all custom XML parts from the XML manager.
     *
     * @returns An array of all custom XML parts.
     * @since 9.0.0
     */
    GetAll(): ApiCustomXmlPart[];

    /**
     * Returns a custom XML part by its ID from the XML manager.
     *
     * @param xmlPartId - The XML part ID.
     * @returns The corresponding ApiCustomXmlPart object if found, or null if no match is found.
     * @since 9.0.0
     */
    GetById(xmlPartId: string): ApiCustomXmlPart | null;

    /**
     * Returns custom XML parts by namespace from the XML manager.
     *
     * @param namespace - The namespace of the XML parts.
     * @returns An array of ApiCustomXmlPart objects or null if no matching XML parts are found.
     * @since 9.0.0
     */
    GetByNamespace(namespace: string): ApiCustomXmlPart[];

    /** Returns a type of the ApiCustomXmlParts class. */
    GetClassType(): "customXmlParts";

    /**
     * Returns a number of custom XML parts in the XML manager.
     *
     * @returns The number of custom XML parts.
     * @since 9.0.0
     */
    GetCount(): number;
  }

  /** Class representing a document date field. */
  export interface ApiDateForm extends ApiFormBase {
  }

  /** Class representing a document. */
  export interface ApiDocument extends ApiDocumentContent {
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

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the document
     * content.
     *
     * @param nPos - The position where the current element will be added.
     * @param oElement - The document element which will be added at the current position.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it.");
     * oDocContent.AddElement(oParagraph);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/AddElement/
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

    /**
     * Returns a type of the ApiDocumentContent class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oDocContent.GetClassType();
     * oParagraph.AddText("Class Type: " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/GetClassType/
     */
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oBullet = Api.CreateNumbering("ArabicParenR", 1);
     * oParagraph.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the numbered paragraph.");
     * oParagraph = Api.CreateParagraph();
     * oParagraph.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the numbered paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/GetElement/
     */
    GetElement(nPos: number): DocumentElement;

    /**
     * Returns a number of elements in the current document.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("We got the first paragraph inside the shape.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of elements inside the shape: " + oDocContent.GetElementsCount());
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Line breaks are NOT counted into the number of elements.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/GetElementsCount/
     */
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it.");
     * oDocContent.AddElement(oParagraph);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/Push/
     */
    Push(oElement: DocumentElement): boolean;

    /**
     * Removes all the elements from the current document or from the current document element.
     * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to
     * add
     * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is just a sample paragraph.");
     * oDocContent.RemoveAllElements();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Removes an element using the position specified.
     *
     * @param nPos - The element number (position) in the document or inside other element.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is the first paragraph.");
     * oDocContent.RemoveElement(0);
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is the second paragraph. The first paragraph was removed from the document content.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDocumentContent/Methods/RemoveElement/
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
    /**
     * Creates a copy of the specified drawing object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oShape);
     * var oCopyShape = oShape.Copy();
     * oSlide = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide);
     * oSlide.AddObject(oCopyShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/Copy/
     */
    Copy(): ApiDrawing;

    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Deletes the specified drawing object from the parent.
     *
     * @returns false if drawing doesn't exist or drawing hasn't a parent.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing1 = Api.CreateShape("rect", 3212465, 963295, oFill, oStroke);
     * oSlide.AddObject(oDrawing1);
     * var oDrawing2 = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oDrawing2.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oDrawing2.SetHorAxisTitle("Year", 11);
     * oDrawing2.SetLegendPos("bottom");
     * oDrawing2.SetShowDataLabels(false, false, true, false);
     * oDrawing2.SetTitle("Financial Overview", 13);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oDrawing2.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oDrawing2.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oDrawing2);
     * oDrawing2.Delete();
     * var oDocContent = oDrawing1.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The chart was deleted from this slide.");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Sets the fill formatting properties to the current graphic object.
     *
     * @param oFill - The fill type used to fill the graphic object.
     * @returns returns false if param is invalid.
     * @since 9.3.0
     */
    Fill(oFill: ApiFill): boolean;

    /**
     * Returns a type of the ApiDrawing class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawing);
     * var aDrawings = oSlide.GetAllDrawings();
     * var sType = aDrawings[0].GetClassType();
     * var oDocContent = oDrawing.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetClassType/
     */
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
     * @since 9.3.0
     */
    GetFlipH(): boolean | null;

    /**
     * Get vertical flip of current drawing.
     *
     * @returns Returns true if the figure is flipped vertically, false if not, or null if the drawing
     *   properties are not available.
     * @since 9.3.0
     */
    GetFlipV(): boolean | null;

    /**
     * Returns the height of the current drawing.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var nHeight = oShape.GetHeight();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Drawing height: " + nHeight);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetLockValue("noSelect", true);
     * var oDocContent = oShape.GetContent();
     * var bLockValue = oShape.GetLockValue("noSelect");
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This drawing cannot be selected: " + bLockValue);
     * oDocContent.AddElement(0, oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetLockValue/
     */
    GetLockValue(sType: DrawingLockType): boolean;

    /**
     * Returns the name of the current drawing.
     *
     * @since 9.3.0
     */
    GetName(): string;

    /**
     * Returns the drawing parent object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * var oParent = oShape.GetParent();
     * var sType = oParent.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type of the shape parent = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetParent/
     */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oLayout.AddObject(oShape);
     * var oParent = oShape.GetParentLayout();
     * var sType = oParent.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type of the shape parent = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetParentLayout/
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oMaster.AddObject(oShape);
     * var oParent = oShape.GetParentMaster();
     * var sType = oParent.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type of the shape parent = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetParentMaster/
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * var oParent = oShape.GetParentSlide();
     * var sType = oParent.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type of the shape parent = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetParentSlide/
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("chart");
     * oShape.SetPlaceholder(oPlaceholder);
     * oSlide.AddObject(oShape);
     * oPlaceholder = oShape.GetPlaceholder();
     * var sType = oPlaceholder.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type of the element from the shape = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetPlaceholder/
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns the rotation angle of the current drawing object.
     *
     * @since 9.0.0
     */
    GetRotation(): number;

    /**
     * Returns the shadow of the current graphic object.
     *
     * @since 9.5.0
     */
    GetShadow(): ApiShadow | null;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Gets the title of the current drawing.
     *
     * @returns The title of the current drawing, or null if not set.
     * @since 9.5.0
     */
    GetTitle(): string | null;

    /**
     * Returns the width of the current drawing.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var nWidth = oShape.GetWidth();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Drawing width: " + nWidth);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Selects the current graphic object.
     *
     * @param isReplace - Specifies whether the selection should replace the current selection (true) or be added to it
     *   (false).
     * @since 9.3.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var aAllDrawings = oSlide.GetAllDrawings();
     * if(aAllDrawings.length > 0)
     * {
     * 	var oDrawing = aAllDrawings[0];
     * 	oDrawing.Select();
     * }
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/Select/
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
     * Sets the horizontal flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped horizontally or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     */
    SetFlipH(bFlip: boolean): boolean;

    /**
     * Sets the vertical flip of the current drawing.
     *
     * @param bFlip - Specifies if the figure will be flipped vertically or not.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.3.0
     */
    SetFlipV(bFlip: boolean): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetLockValue("noSelect", true);
     * var oDocContent = oShape.GetContent();
     * var bLockValue = oShape.GetLockValue("noSelect");
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This drawing cannot be selected: " + bLockValue);
     * oDocContent.AddElement(0, oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/SetLockValue/
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
     */
    SetName(name: string): boolean;

    /**
     * Sets the outline properties to the specified graphic object.
     *
     * @param stroke - The stroke used to create the graphic object outline.
     * @returns returns false if param is invalid.
     * @since 9.3.0
     */
    SetOutLine(stroke: ApiStroke): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("picture");
     * oShape.SetPlaceholder(oPlaceholder);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/SetPlaceholder/
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is an example of a paragraph inside a shape. Nothing special.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/SetPosition/
     */
    SetPosition(nPosX: number, nPosY: number): void;

    /**
     * Sets the rotation angle to the current drawing object.
     *
     * @param nRotAngle - New drawing rotation angle.
     * @since 9.0.0
     */
    SetRotation(nRotAngle: number): boolean;

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
     * @param nWidth - The object width measured in English measure units.
     * @param nHeight - The object height measured in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is an example of a paragraph inside a shape. Nothing special.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/SetSize/
     */
    SetSize(nWidth: number, nHeight: number): boolean;

    /**
     * Sets the title of the current drawing.
     *
     * @param title - The title to set for the current drawing.
     * @returns Returns true if the operation is successful, false otherwise.
     * @since 9.5.0
     */
    SetTitle(title: string): boolean;

    /**
     * Converts the ApiDrawing object into the JSON object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * var json = oDrawing.ToJSON();
     * var oDrawingFromJSON = Api.FromJSON(json);
     * oDrawingFromJSON.SetPosition(608400, 1267200);
     * oDrawingFromJSON.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawingFromJSON);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiDrawing/Methods/ToJSON/
     */
    ToJSON(): object;

    /**
     * Removes the current graphic object from the selection.
     *
     * @since 9.3.0
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
    /**
     * Returns a type of the ApiFill class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oFill.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiFill/Methods/GetClassType/
     */
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

  /** Class representing gradient stop. */
  export interface ApiGradientStop {
    /**
     * Returns a type of the ApiGradientStop class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oGs1.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiGradientStop/Methods/GetClassType/
     */
    GetClassType(): "gradientStop";
  }

  /** Class representing a group of drawings. */
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns a type of the ApiGroup class.
     *
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * let oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(111, 255, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     *
     * let oShape1 = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill1, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape1);
     *
     * let oShape2 = Api.CreateShape("flowChartOnlineStorage", 100 * 36000, 65 * 36000, oFill2, oStroke);
     * oShape2.SetPosition(304200, 633600);
     * oSlide.AddObject(oShape2);
     *
     * let oGroup = oSlide.GroupDrawings([oShape1, oShape2]);
     * let sClassType = oGroup.GetClassType();
     *
     * let oDocContent1 = oShape1.GetDocContent();
     * let oParagraph1 = oDocContent1.GetElement(0);
     * oParagraph1.AddText("Class Type = " + sClassType);
     *
     * let oDocContent2 = oShape2.GetDocContent();
     * let oParagraph2 = oDocContent2.GetElement(0);
     * oParagraph2.AddText("Class Type = " + sClassType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiGroup/Methods/GetClassType/
     */
    GetClassType(): "group";

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;

    /**
     * Ungroups the current group of drawings.
     *
     * @returns The array of the ungrouped objects, or null if the group is not in the document or cannot be
     *   ungrouped.
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * let oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(111, 255, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     *
     * let oShape1 = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill1, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape1);
     *
     * let oShape2 = Api.CreateShape("flowChartOnlineStorage", 100 * 36000, 65 * 36000, oFill2, oStroke);
     * oShape2.SetPosition(304200, 633600);
     * oSlide.AddObject(oShape2);
     *
     * let oGroup = oSlide.GroupDrawings([oShape1, oShape2]);
     * oGroup.Ungroup();
     *
     * let oDocContent1 = oShape1.GetDocContent();
     * let oParagraph1 = oDocContent1.GetElement(0);
     * oParagraph1.AddText("Shapes are ungrouped");
     *
     * let oDocContent2 = oShape2.GetDocContent();
     * let oParagraph2 = oDocContent2.GetElement(0);
     * oParagraph2.AddText("Shapes are ungrouped");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiGroup/Methods/Ungroup/
     */
    Ungroup(): ApiDrawing[] | null;
  }

  /** Class representing a Paragraph hyperlink. */
  export interface ApiHyperlink {
    /**
     * Returns a type of the ApiHyperlink class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/GetClassType/
     */
    GetClassType(): "hyperlink";

    /**
     * Returns the hyperlink element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/GetElementsCount/
     */
    GetElementsCount(): number;

    /**
     * Returns the hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/GetLinkedText/
     */
    GetLinkedText(): string;

    /**
     * Returns the screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/GetScreenTipText/
     */
    GetScreenTipText(): string;

    /**
     * Sets the hyperlink address.
     *
     * @param sLink - The hyperlink address.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/SetLink/
     */
    SetLink(sLink: string): boolean;

    /**
     * Sets the screen tip text of the hyperlink.
     *
     * @param sScreenTipText - The screen tip text of the hyperlink.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiHyperlink/Methods/SetScreenTipText/
     */
    SetScreenTipText(sScreenTipText: string): boolean;
  }

  /** Class representing an image. */
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns a type of the ApiImage class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oImage = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/step2_1.png", 100 * 36000, 50 * 36000);
     * oSlide.AddObject(oImage);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oImage.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiImage/Methods/GetClassType/
     */
    GetClassType(): "image";

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;
  }

  /** Class representing a container for the paragraph elements. */
  export interface ApiInlineLvlSdt {
  }

  /** Class representing a slide layout. */
  export interface ApiLayout {
    /**
     * Adds an object (image, shape or chart) to the current slide layout.
     *
     * @param oDrawing - The object which will be added to the current slide layout.
     * @returns returns false if slide layout doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oLayout.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This shape was added to the current layout.");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/AddObject/
     */
    AddObject(oDrawing: ApiDrawing): boolean;

    /**
     * Clears the slide layout background.
     *
     * @returns return false if slide layout doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oLayout.SetBackground(oFill);
     * oSlide.FollowLayoutBackground();
     * oSlide = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide);
     * oLayout.ClearBackground();
     * oSlide.FollowLayoutBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/ClearBackground/
     */
    ClearBackground(): boolean;

    /**
     * Creates a copy of the specified slide layout object.
     * Copies without master slide.
     *
     * @returns returns new ApiLayout object that represents the copy of slide layout. Returns null if slide
     *   layout doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oLayout.AddObject(oShape);
     * oSlide = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide);
     * var oCopyLayout = oLayout.Copy();
     * oMaster.AddLayout(1, oCopyLayout);
     * oSlide.ApplyLayout(oCopyLayout);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/Copy/
     */
    Copy(): ApiLayout | null;

    /**
     * Deletes the specified object from the parent slide master if it exists.
     *
     * @returns return false if parent slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oMaster.GetLayoutsCount();
     * var oLayout = oMaster.GetLayout(0);
     * oLayout.Delete();
     * var nCountAfter = oMaster.GetLayoutsCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of layouts before deletion: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of layouts after deletion: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Creates a duplicate of the specified slide layout object, adds the new slide layout to the slide
     * layout collection.
     *
     * @param nPos - Position where the new slide layout will be added.
     * @returns returns new ApiLayout object that represents the copy of slide layout. Returns null if slide
     *   layout doesn't exist or is not in the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oLayout.AddObject(oShape);
     * oSlide = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide);
     * var oDuplicateLayout = oLayout.Duplicate(1);
     * oSlide.ApplyLayout(oDuplicateLayout);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/Duplicate/
     */
    Duplicate(nPos?: number): ApiLayout | null;

    /**
     * Sets the master background as the background of the layout.
     *
     * @returns returns false if master is null or master hasn't background.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oMaster.SetBackground(oFill);
     * var oLayout = oMaster.GetLayout(0);
     * oLayout.FollowMasterBackground();
     * oSlide.FollowLayoutBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/FollowMasterBackground/
     */
    FollowMasterBackground(): boolean;

    /**
     * Returns an array with all the chart objects from the slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oLayout.AddObject(oChart);
     * var aCharts = oLayout.GetAllCharts();
     * var oStroke = Api.CreateStroke(1 * 150, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * aCharts[0].SetMinorHorizontalGridlines(oStroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns an array with all the drawing objects from the slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.RemoveAllObjects();
     * oLayout.AddObject(oDrawing);
     * var aDrawings = oLayout.GetAllDrawings();
     * var oPlaceholder = Api.CreatePlaceholder("picture");
     * aDrawings[0].SetPlaceholder(oPlaceholder);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetAllDrawings/
     */
    GetAllDrawings(): Drawing[];

    /**
     * Returns an array with all the image objects from the slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oImage = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/coordinate_aspects.png", 60 * 36000, 35 * 36000);
     * oLayout.AddObject(oImage);
     * var aImages = oLayout.GetAllImages();
     * var sType = aImages[0].GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(61, 74, 107));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns an array with all the OLE objects from the slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oOleObject = Api.CreateOleObject("https://i.ytimg.com/vi_webp/SKGz4pmnpgY/sddefault.webp", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oLayout.AddObject(oOleObject);
     * var aOleObjects = oLayout.GetAllOleObjects();
     * var sAppId = aOleObjects[0].GetApplicationId();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 224, 204), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The application ID for the current OLE object: " + sAppId);
     * oLayout.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array with all the shape objects from the slide layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.RemoveAllObjects();
     * oLayout.AddObject(oShape);
     * var aShapes = oLayout.GetAllShapes();
     * var oDocContent = aShapes[0].GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is a sample shape which was added to the current layout.");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns an array with all tables from the current slide layout.
     *
     * @returns An array with all tables from the current slide layout.
     * @since 9.1.0
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns the background fill of the current slide layout.
     *
     * @returns returns null if the slide layout doesn't exist or has no background fill.
     * @since 9.5.0
     */
    GetBackground(): ApiFill | null;

    /**
     * Returns the type of the ApiLayout class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var sType = oLayout.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetClassType/
     */
    GetClassType(): "layout";

    /**
     * Returns an array of drawings by the specified placeholder type.
     *
     * @param sType - The placeholder type.
     * @since 8.2.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * let oMaster = oPresentation.GetMaster(0);
     * let oLayout = oMaster.GetLayout(0);
     * let aDrawingsWithPh = oLayout.GetDrawingsByPlaceholderType("ctrTitle");
     * for (let i = 0; i < aDrawingsWithPh.length; i++) {
     *     aDrawingsWithPh[i].Delete();
     * }
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetDrawingsByPlaceholderType/
     */
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];

    /**
     * Returns the type of the current layout.
     *
     * @returns The layout type.
     */
    GetLayoutType(): LayoutType;

    /**
     * Returns the parent slide master of the current layout.
     *
     * @returns returns null if parent slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oLayout = oSlide.GetLayout();
     * var oMaster = oLayout.GetMaster();
     * var sType = oMaster.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetMaster/
     */
    GetMaster(): ApiMaster;

    /**
     * Returns a name of the current layout.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GetName/
     */
    GetName(): string;

    /**
     * Groups an array of drawings in the current layout.
     *
     * @param aDrawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * let oLayout = oSlide.GetLayout();
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(111, 255, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape1 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill1, oStroke);
     * let oShape2 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill2, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oShape2.SetPosition(608400, 1400000);
     * oLayout.AddObject(oShape1);
     * oLayout.AddObject(oShape2);
     * oLayout.GroupDrawings([oShape1, oShape2]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/GroupDrawings/
     */
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;

    /**
     * Moves the specified layout to a specific location within the same collection.
     *
     * @param nPos - Position where the specified slide layout will be moved to.
     * @returns returns false if layout or parent slide master doesn't exist or position is invalid.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout1 = oMaster.GetLayout(3);
     * oSlide1.ApplyLayout(oLayout1);
     * oLayout1.MoveTo(7);
     * var oLayout2 = oMaster.GetLayout(7);
     * var oSlide2 = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide2);
     * oSlide2.ApplyLayout(oLayout2);
     * var oSlide3 = Api.CreateSlide();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide3.AddObject(oShape);
     * var oDocContent = oShape.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The third layout was moved to the seventh position within the same collection.");
     * oPresentation.AddSlide(oSlide3);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/MoveTo/
     */
    MoveTo(nPos: number): boolean;

    /**
     * Removes objects (image, shape or chart) from the current slide layout.
     *
     * @param nPos - Position from which the object will be deleted.
     * @param nCount - The number of elements to delete.
     * @returns returns false if layout doesn't exist or position is invalid or layout hasn't objects.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("cube", 3212465, 963295, oFill, oStroke);
     * oDrawing.SetPosition(30 * 36000, 1267200);
     * oDrawing.SetSize(150 * 36000, 130 * 36000);
     * var oCopyDrawing = oDrawing.Copy();
     * oCopyDrawing.SetPosition(160 * 36000, 1267200);
     * oCopyDrawing.SetSize(150 * 36000, 130 * 36000);
     * oLayout.AddObject(oDrawing);
     * oLayout.AddObject(oCopyDrawing);
     * oLayout.RemoveObject(1, 1);
     * var oDocContent = oDrawing.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The second cube was removed from this layout.");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/RemoveObject/
     */
    RemoveObject(nPos: number, nCount?: number): boolean;

    /**
     * Searches for the specified text within the current slide layout and returns all found occurrences as
     * text ranges.
     *
     * @param text - The text to search for.
     * @param isMatchCase - Case sensitive or not.
     * @param isWholeWords - Whether to search for whole words only.
     * @since 9.5.0
     */
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];

    /**
     * Sets the background to the current slide layout.
     *
     * @param oApiFill - The color or pattern used to fill the presentation slide layout background.\
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oLayout.SetBackground(oFill);
     * oSlide.FollowLayoutBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/SetBackground/
     */
    SetBackground(oApiFill: ApiFill): boolean;

    /**
     * Sets a name to the current layout.
     *
     * @param sName - Layout name to be set.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * oLayout.SetName("New layout");
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("A new name was set to the current layout.");
     * oLayout.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/SetName/
     */
    SetName(sName: string): boolean;

    /**
     * Converts the ApiLayout object into the JSON object.
     *
     * @param bWriteMaster - Specifies if the slide master will be written to the JSON object or not.
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var json = oLayout.ToJSON(true, false);
     * var oLayoutFromJSON = Api.FromJSON(json);
     * oMaster.AddLayout(0, oLayoutFromJSON);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var sType = oLayoutFromJSON.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Class type = " + sType);
     * oLayoutFromJSON.AddObject(oShape);
     * oSlide.ApplyLayout(oLayoutFromJSON);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiLayout/Methods/ToJSON/
     */
    ToJSON(bWriteMaster?: boolean, bWriteTableStyles?: boolean): object;
  }

  /** Class representing a slide master. */
  export interface ApiMaster {
    /**
     * Adds a layout to the specified slide master.
     *
     * @param nPos - Position where a layout will be added.
     * @param oLayout - A layout to be added.
     * @returns returns false if oLayout isn't a layout.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oMaster.GetLayoutsCount();
     * var oLayout = Api.CreateLayout();
     * oMaster.AddLayout(0, oLayout);
     * var nCountAfter = oMaster.GetLayoutsCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of layouts before adding new layout: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of layouts after adding new layout: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/AddLayout/
     */
    AddLayout(oLayout: ApiLayout): boolean;
    AddLayout(nPos: number, oLayout: ApiLayout): boolean;

    /**
     * Adds an object (image, shape or chart) to the current slide master.
     *
     * @param oDrawing - The object which will be added to the current slide master.
     * @returns returns false if slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oMaster.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/AddObject/
     */
    AddObject(oDrawing: ApiDrawing): boolean;

    /**
     * Clears the slide master background.
     *
     * @returns return false if slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * oMaster.ClearBackground();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oMaster.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/ClearBackground/
     */
    ClearBackground(): boolean;

    /**
     * Creates a copy of the specified slide master object.
     *
     * @returns returns new ApiMaster object that represents the copy of slide master. Returns null if slide
     *   doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oPresentation.GetMastersCount();
     * var oCopyMaster = oMaster.Copy();
     * oPresentation.AddMaster(1, oCopyMaster);
     * var nCountAfter = oPresentation.GetMastersCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters before adding the copied master: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of masters after adding the copied master: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/Copy/
     */
    Copy(): ApiMaster | null;

    /**
     * Deletes the specified object from the parent if it exists.
     *
     * @returns return false if master doesn't exist or is not in the presentation or couldn't be deleted (e.g.
     *   the last master).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oPresentation.GetMastersCount();
     * oMaster.Delete();
     * var nCountAfter = oPresentation.GetMastersCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters before deletion: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of masters after deletion: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Creates a duplicate of the specified slide master object, adds the new slide master to the slide
     * masters collection.
     *
     * @param nPos - Position where the new slide master will be added.
     * @returns returns new ApiMaster object that represents the copy of slide master. Returns null if slide
     *   master doesn't exist or is not in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oPresentation.GetMastersCount();
     * oMaster.Duplicate(1);
     * var nCountAfter = oPresentation.GetMastersCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters before duplicating: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of masters after duplicating: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/Duplicate/
     */
    Duplicate(nPos?: number): ApiMaster | null;

    /**
     * Returns an array with all the chart objects from the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oMaster.AddObject(oChart);
     * oSlide.RemoveAllObjects();
     * var aCharts = oMaster.GetAllCharts();
     * var oStroke = Api.CreateStroke(1 * 150, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * aCharts[0].SetMinorHorizontalGridlines(oStroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns an array with all the drawing objects from the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.RemoveAllObjects();
     * oMaster.AddObject(oDrawing);
     * var aDrawings = oMaster.GetAllDrawings();
     * var oPlaceholder = Api.CreatePlaceholder("picture");
     * aDrawings[0].SetPlaceholder(oPlaceholder);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetAllDrawings/
     */
    GetAllDrawings(): Drawing[];

    /**
     * Returns an array with all the image objects from the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oImage = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/coordinate_aspects.png", 60 * 36000, 35 * 36000);
     * oMaster.AddObject(oImage);
     * var aImages = oMaster.GetAllImages();
     * var sType = aImages[0].GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(61, 74, 107));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns all layouts from the slide master.
     *
     * @returns Returns an empty array if the slide master doesn't have layouts.
     * @since 9.0.0
     */
    GetAllLayouts(): ApiLayout[];

    /**
     * Returns an array with all the OLE objects from the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oOleObject = Api.CreateOleObject("https://i.ytimg.com/vi_webp/SKGz4pmnpgY/sddefault.webp", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oMaster.AddObject(oOleObject);
     * var aOleObjects = oMaster.GetAllOleObjects();
     * var sAppId = aOleObjects[0].GetApplicationId();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 224, 204), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The application ID for the current OLE object: " + sAppId);
     * oMaster.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array with all the shape objects from the slide master.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oMaster.AddObject(oShape);
     * var aShapes = oMaster.GetAllShapes();
     * var sType = aShapes[0].GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oShape.SetVerticalTextAlign("center");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns an array with all tables from the slide master.
     *
     * @returns An array with all tables from the slide master.
     * @since 9.1.0
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns the background fill of the current slide master.
     *
     * @returns returns null if the slide master doesn't exist or has no background fill.
     * @since 9.5.0
     */
    GetBackground(): ApiFill | null;

    /**
     * Returns the type of the ApiMaster class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var sType = oMaster.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetClassType/
     */
    GetClassType(): "master";

    /**
     * Returns an array of drawings by the specified placeholder type.
     *
     * @param sType - The placeholder type.
     * @since 8.2.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * let oMaster = oPresentation.GetMaster(0);
     * let aDrawingsWithPh = oMaster.GetDrawingsByPlaceholderType("title");
     * for (let i = 0; i < aDrawingsWithPh.length; i++) {
     *     aDrawingsWithPh[i].Delete();
     * }
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetDrawingsByPlaceholderType/
     */
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];

    /**
     * Returns a layout of the specified slide master by its position.
     *
     * @param nPos - Layout position.
     * @returns returns null if position is invalid.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = Api.CreateLayout();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oLayout.AddObject(oShape);
     * oMaster.AddLayout(0, oLayout);
     * oSlide.ApplyLayout(oMaster.GetLayout(0));
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetLayout/
     */
    GetLayout(nPos: number): ApiLayout | null;

    /**
     * Returns the layout corresponding to the specified layout type of the slide master.
     *
     * @param sType - The layout type.
     * @returns The layout at the specified position, or null if the position is invalid.
     */
    GetLayoutByType(sType: LayoutType): ApiLayout | null;

    /**
     * Returns a number of layout objects.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nLayouts = oMaster.GetLayoutsCount();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of layouts = " + nLayouts);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetLayoutsCount/
     */
    GetLayoutsCount(): number;

    /**
     * Returns a theme of the slide master.
     *
     * @returns returns null if theme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * oTheme.SetColorScheme(oClrScheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GetTheme/
     */
    GetTheme(): ApiTheme | null;

    /**
     * Groups an array of drawings in the current slide master.
     *
     * @param aDrawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * let oLayout = oSlide.GetLayout();
     * let oMaster = oLayout.GetMaster();
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(111, 255, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape1 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill1, oStroke);
     * let oShape2 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill2, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oShape2.SetPosition(608400, 1400000);
     * oMaster.AddObject(oShape1);
     * oMaster.AddObject(oShape2);
     * oMaster.GroupDrawings([oShape1, oShape2]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/GroupDrawings/
     */
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;

    /**
     * Removes the layouts from the current slide master.
     *
     * @param nPos - Position from which a layout will be deleted.
     * @param nCount - Number of layouts to delete.
     * @returns return false if position is invalid.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var nCountBefore = oMaster.GetLayoutsCount();
     * oMaster.RemoveLayout(0, 2);
     * var nCountAfter = oMaster.GetLayoutsCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of layouts before deletion: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of layouts after deletion: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/RemoveLayout/
     */
    RemoveLayout(nPos: number, nCount?: number): boolean;

    /**
     * Removes objects (image, shape or chart) from the current slide master.
     *
     * @param nPos - Position from which the object will be deleted.
     * @param nCount - Number of objects to delete.
     * @returns returns false if master doesn't exist or position is invalid or master hasn't objects.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("cube", 3212465, 963295, oFill, oStroke);
     * oDrawing.SetPosition(30 * 36000, 1267200);
     * oDrawing.SetSize(150 * 36000, 130 * 36000);
     * var oCopyDrawing = oDrawing.Copy();
     * oCopyDrawing.SetPosition(170 * 36000, 1267200);
     * oCopyDrawing.SetSize(150 * 36000, 130 * 36000);
     * oMaster.AddObject(oDrawing);
     * oMaster.AddObject(oCopyDrawing);
     * oMaster.RemoveObject(1, 1);
     * var oDocContent = oDrawing.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("The second cube was removed from this master.");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/RemoveObject/
     */
    RemoveObject(nPos: number, nCount?: number): boolean;

    /**
     * Searches for the specified text within the current slide master and returns all found occurrences as
     * text ranges.
     *
     * @param text - The text to search for.
     * @param isMatchCase - Case sensitive or not.
     * @param isWholeWords - Whether to search for whole words only.
     * @since 9.5.0
     */
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];

    /**
     * Sets the background to the current slide master.
     *
     * @param oApiFill - The color or pattern used to fill the presentation slide master background.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * oMaster.ClearBackground();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oMaster.AddObject(oShape);
     * oMaster.SetBackground(oFill);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/SetBackground/
     */
    SetBackground(oApiFill: ApiFill): boolean;

    /**
     * Sets a theme to the slide master.
     * Sets a copy of the theme object.
     *
     * @param oTheme - Presentation theme.
     * @returns return false if oTheme isn't a theme or slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(0, oFill2);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(0, Api.CreateRGBColor(51, 51, 51));
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(0, oFill1);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oMaster.SetTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/SetTheme/
     */
    SetTheme(oTheme: ApiTheme): boolean;

    /**
     * Converts the ApiMaster object into the JSON object.
     *
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var json = oMaster.ToJSON(true);
     * var oMasterFromJSON = Api.FromJSON(json);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sType = oMasterFromJSON.GetClassType();
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiMaster/Methods/ToJSON/
     */
    ToJSON(bWriteTableStyles?: boolean): object;
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

  /** Class representing a notes page. */
  export interface ApiNotesPage {
    /**
     * Adds a text to the body shape of the current notes page.
     *
     * @param sText - The text to be added to the body shape.
     * @returns Returns true if text was added successfully, otherwise false.
     * @since 9.0.0
     */
    AddBodyShapeText(sText: string): boolean;

    /**
     * Returns a shape with the type="body" attribute from the current notes page.
     *
     * @since 9.0.0
     */
    GetBodyShape(): ApiShape | null;

    /**
     * Returns the text from the body shape of the current notes page.
     *
     * @returns The text from the body shape.
     * @since 9.1.0
     */
    GetBodyShapeText(): string;

    /**
     * Returns the type of the ApiNotesPage class.
     *
     * @since 9.0.0
     */
    GetClassType(): "notesPage";

    /**
     * Returns a theme of the current notes page.
     *
     * @returns Returns null if the notes page master or theme doesn't exist.
     * @since 9.3.0
     */
    GetTheme(): ApiTheme | null;
  }

  /** Class representing the numbering properties. */
  export interface ApiNumbering {
  }

  /** Class representing a reference to a specified level of the numbering. */
  export interface ApiNumberingLevel {
  }

  /** Class representing an OLE object. */
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns the application ID from the current OLE object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * var sAppId = oOleObject.GetApplicationId();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The application ID for the current OLE object: " + sAppId);
     * oSlide.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiOleObject/Methods/GetApplicationId/
     */
    GetApplicationId(): string;

    /**
     * Returns a type of the ApiOleObject class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * var sType = oOleObject.GetClassType();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Class type: " + sType);
     * oSlide.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiOleObject/Methods/GetClassType/
     */
    GetClassType(): "oleObject";

    /**
     * Returns the string data from the current OLE object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * var sData = oOleObject.GetData();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The OLE object data: " + sData);
     * oSlide.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiOleObject/Methods/GetData/
     */
    GetData(): string;

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Sets the application ID to the current OLE object.
     *
     * @param sAppId - The application ID associated with the current OLE object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * oOleObject.SetApplicationId("asc.{E5773A43-F9B3-4E81-81D9-CE0A132470E7}");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiOleObject/Methods/SetApplicationId/
     */
    SetApplicationId(sAppId: string): boolean;

    /**
     * Sets the data to the current OLE object.
     *
     * @param sData - The OLE object string data.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://api.onlyoffice.com/content/img/docbuilder/examples/ole-object-image.png", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * oOleObject.SetData("https://youtu.be/eJxpkjQG6Ew");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiOleObject/Methods/SetData/
     */
    SetData(sData: string): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;
  }

  /** Class representing the paragraph properties. */
  export interface ApiParaPr {
    /**
     * Returns a type of the ApiParaPr class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * var sClassType = oParaPr.GetClassType();
     * oParaPr.SetIndFirstLine(1440);
     * oParagraph.AddText("This is the first paragraph with the indent of 1 inch set to the first line. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Class Type = " + sClassType);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetClassType/
     */
    GetClassType(): "paraPr";

    /**
     * Returns the paragraph first line indentation.
     *
     * @returns The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndFirstLine(1440);
     * oParagraph.AddText("This is the first paragraph with the indent of 1 inch set to the first line. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndFirstLine = oParaPr.GetIndFirstLine();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("First line indent: " + nIndFirstLine);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): number | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndLeft(2880);
     * oParagraph.AddText("This is the first paragraph with the indent of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndLeft = oParaPr.GetIndLeft();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Left indent: " + nIndLeft);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): number | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndRight(2880);
     * oParaPr.SetJc("right");
     * oParagraph.AddText("This is the first paragraph with the right offset of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndRight = oParaPr.GetIndRight();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Right indent: " + nIndRight);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): number | undefined;

    /**
     * Returns the paragraph contents justification.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetJc("center");
     * oParagraph.AddText("This is a paragraph with the text in it aligned by the center. ");
     * oParagraph.AddText("The justification is specified in the paragraph style. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var sJc = oParaPr.GetJc();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Justification: " + sJc);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingAfter(1440);
     * oParagraph.AddText("This is an example of setting a space after a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nSpacingAfter = oParaPr.GetSpacingAfter();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing after : " + nSpacingAfter);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): number;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is an example of setting a space before a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the second paragraph has this offset enabled.");
     * var oParagraph2 = Api.CreateParagraph();
     * oParagraph2.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * var oParaPr = oParagraph2.GetParaPr();
     * oParaPr.SetSpacingBefore(1440);
     * oDocContent.Push(oParagraph2);
     * var nSpacingBefore = oParaPr.GetSpacingBefore();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing before: " + nSpacingBefore);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): number;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * var sSpacingLineRule = oParaPr.GetSpacingLineRule();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing line rule : " + sSpacingLineRule);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * var nSpacingLineValue = oParaPr.GetSpacingLineValue();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing line value : " + nSpacingLineValue);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingLineValue/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * var oBullet = Api.CreateBullet("-");
     * oParaPr.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the bulleted paragraph.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetBullet/
     */
    SetBullet(oBullet: ApiBullet): void;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndFirstLine(1440);
     * oParagraph.AddText("This is the first paragraph with the indent of 1 inch set to the first line. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: number): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndLeft(2880);
     * oParagraph.AddText("This is the first paragraph with the indent of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: number): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndRight(2880);
     * oParagraph.AddText("This is the first paragraph with the right offset of 2 inches set to it. ");
     * oParagraph.AddText("This offset is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndRight/
     */
    SetIndRight(nValue: number): boolean;

    /**
     * Sets the paragraph contents justification.
     *
     * @param sJc - The justification type that
     *   will be applied to the paragraph contents.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetJc("center");
     * oParagraph.AddText("This is a paragraph with the text in it aligned by the center. ");
     * oParagraph.AddText("The justification is specified in the paragraph style. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetJc/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetOutlineLvl/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingAfter(1440);
     * oParagraph.AddText("This is an example of setting a space after a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the first paragraph has this offset enabled.");
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingAfter/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParagraph.AddText("This is an example of setting a space before a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the second paragraph has this offset enabled.");
     * oParagraph = Api.CreateParagraph();
     * oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingBefore(1440);
     * oParagraph.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingBefore/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingLine/
     */
    SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): boolean;

    /**
     * Specifies a sequence of custom tab stops which will be used for any tab characters in the current
     * paragraph.
     * **Warning**: The lengths of aPos array and aVal array **MUST BE** equal to each other.
     *
     * @param aPos - An array of the positions of custom tab stops with respect to the current page margins
     *   measured in twentieths of a point (1/1440 of an inch).
     * @param aVal - An array of the styles of custom tab stops, which determines the behavior of the tab
     *   stop and the alignment which will be applied to text entered at the current custom tab stop.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetTabs([1440, 4320, 7200], ["left", "center", "right"]);
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 1 inch left");
     * oParagraph.AddLineBreak();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 3 inches center");
     * oParagraph.AddLineBreak();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 5 inches right");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetTabs/
     */
    SetTabs(aPos: number[], aVal: TabJc[]): boolean;
  }

  /** Class representing a paragraph. */
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType"> {
    /**
     * Adds an element to the current paragraph.
     *
     * @param oElement - The document element which will be added at the current position. Returns false if the
     *   oElement type is not supported by a paragraph.
     * @param nPos - The position where the current element will be added. If this value is not
     *   specified, then the element will be added at the end of the current paragraph.
     * @returns Returns `false` if the type of `oElement` is not supported by paragraph content.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is the text for a text run. Nothing special.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/AddElement/
     */
    AddElement(oElement: ParagraphContent, nPos?: number): boolean;

    /**
     * Adds a line break to the current position and starts the next element from a new line.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is a text inside the shape aligned left.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("This is a text after the line break.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/AddLineBreak/
     */
    AddLineBreak(): ApiRun;

    /**
     * Adds a tab stop to the current paragraph.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is just a sample text. After it three tab stops will be added.");
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddText("This is the text which starts after the tab stops.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/AddTabStop/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is a text inside the shape aligned left.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("This is a text after the line break.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): ApiRun;

    /**
     * Creates a paragraph copy. Ingnore comments, footnote references, complex fields.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is just a sample text that was copied.");
     * oDocContent.Push(oParagraph);
     * var oCopyParagraph = oParagraph.Copy();
     * oDocContent.Push(oCopyParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/Copy/
     */
    Copy(): ApiParagraph;

    /**
     * Deletes the current paragraph.
     *
     * @returns returns false if paragraph haven't parent.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oDocContent.Push(oParagraph);
     * oParagraph.Delete();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is the second paragraph. The first paragraph was removed from the shape content.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Returns a type of the ApiParagraph class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oParagraph.GetClassType();
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetClassType/
     */
    GetClassType(): "paragraph";

    /**
     * Returns a paragraph element using the position specified.
     *
     * @param nPos - The position where the element which content we want to get must be located.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.RemoveAllElements();
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is the text for the first text run. Do not forget a space at its end to separate from the second one. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the text for the second run. We will set it bold afterwards. It also needs space at its end. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the text for the third run. It ends the paragraph.");
     * oParagraph.AddElement(oRun);
     * oRun = oParagraph.GetElement(2);
     * oRun.SetBold(true);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetElement/
     */
    GetElement(nPos: number): ParagraphContent;

    /**
     * Returns a number of elements in the current paragraph.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.RemoveAllElements();
     * var oRun = Api.CreateRun();
     * oRun.AddText("Number of paragraph elements at this point: ");
     * oRun.AddTabStop();
     * oRun.AddText("" + oParagraph.GetElementsCount());
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * oRun.AddText("Number of paragraph elements after we added a text run: ");
     * oRun.AddTabStop();
     * oRun.AddText("" + oParagraph.GetElementsCount());
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetElementsCount/
     */
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndFirstLine(1440);
     * oParagraph.AddText("This is the first paragraph with the indent of 1 inch set to the first line. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndFirstLine = oParaPr.GetIndFirstLine();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("First line indent: " + nIndFirstLine);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndFirstLine/
     */
    GetIndFirstLine(): number | undefined;

    /**
     * Returns the paragraph left side indentation.
     *
     * @returns The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndLeft(2880);
     * oParagraph.AddText("This is the first paragraph with the indent of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndLeft = oParaPr.GetIndLeft();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Left indent: " + nIndLeft);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndLeft/
     */
    GetIndLeft(): number | undefined;

    /**
     * Returns the paragraph right side indentation.
     *
     * @returns The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndRight(2880);
     * oParaPr.SetJc("right");
     * oParagraph.AddText("This is the first paragraph with the right offset of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nIndRight = oParaPr.GetIndRight();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Right indent: " + nIndRight);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetIndRight/
     */
    GetIndRight(): number | undefined;

    /**
     * Returns an internal ID of the current paragraph.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the paragraph contents justification.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetJc("center");
     * oParagraph.AddText("This is a paragraph with the text in it aligned by the center. ");
     * oParagraph.AddText("The justification is specified in the paragraph style. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var sJc = oParaPr.GetJc();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Justification: " + sJc);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetJc/
     */
    GetJc(): "left" | "right" | "both" | "center" | undefined;

    /** Returns the last Run with text in the current paragraph. */
    GetLastRunWithText(): ApiRun;

    /**
     * Returns the next paragraph.
     *
     * @returns returns null if paragraph is last.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph1 = Api.CreateParagraph();
     * oParagraph1.AddText("This is the first paragraph.");
     * oDocContent.Push(oParagraph1);
     * var oParagraph2 = Api.CreateParagraph();
     * oParagraph2.AddText("This is the second paragraph.");
     * oDocContent.Push(oParagraph2);
     * oSlide.AddObject(oShape);
     * var oNextParagraph = oParagraph1.GetNext();
     * oNextParagraph.SetBold(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetNext/
     */
    GetNext(): ApiParagraph | null;

    /**
     * Returns the outline level of the specified properties.
     *
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetOutlineLvl/
     */
    GetOutlineLvl(): number | undefined;

    /**
     * Returns the paragraph properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingAfter(1440);
     * oParagraph.AddText("This is an example of setting a space after a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the first paragraph has this offset enabled.");
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetParaPr/
     */
    GetParaPr(): ApiParaPr;

    /**
     * Returns the previous paragraph.
     *
     * @returns returns null if paragraph is first.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph1 = Api.CreateParagraph();
     * oParagraph1.AddText("This is the first paragraph.");
     * oDocContent.Push(oParagraph1);
     * var oParagraph2 = Api.CreateParagraph();
     * oParagraph2.AddText("This is the second paragraph.");
     * oDocContent.Push(oParagraph2);
     * oSlide.AddObject(oShape);
     * var oPreviousParagraph = oParagraph2.GetPrevious();
     * oPreviousParagraph.SetBold(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/GetPrevious/
     */
    GetPrevious(): ApiParagraph;

    /**
     * Returns the spacing after value of the current paragraph.
     *
     * @returns The value of the spacing after the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingAfter(1440);
     * oParagraph.AddText("This is an example of setting a space after a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * var nSpacingAfter = oParaPr.GetSpacingAfter();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing after : " + nSpacingAfter);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingAfter/
     */
    GetSpacingAfter(): number;

    /**
     * Returns the spacing before value of the current paragraph.
     *
     * @returns The value of the spacing before the current paragraph measured in twentieths of a point (1/1440
     *   of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is an example of setting a space before a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the second paragraph has this offset enabled.");
     * var oParagraph2 = Api.CreateParagraph();
     * oParagraph2.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * var oParaPr = oParagraph2.GetParaPr();
     * oParaPr.SetSpacingBefore(1440);
     * oDocContent.Push(oParagraph2);
     * var nSpacingBefore = oParaPr.GetSpacingBefore();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing before: " + nSpacingBefore);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingBefore/
     */
    GetSpacingBefore(): number;

    /**
     * Returns the paragraph line spacing rule.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * var sSpacingLineRule = oParaPr.GetSpacingLineRule();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing line rule : " + sSpacingLineRule);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingLineRule/
     */
    GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;

    /**
     * Returns the paragraph line spacing value.
     *
     * @returns to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * var nSpacingLineValue = oParaPr.GetSpacingLineValue();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Spacing line value : " + nSpacingLineValue);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/GetSpacingLineValue/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is the first text run in the current paragraph.");
     * oParagraph.RemoveAllElements();
     * oParagraph.AddText("We removed all the paragraph elements and added a new text run inside it.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/RemoveAllElements/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph = oDocContent.GetElement(0);
     * oParagraph.RemoveAllElements();
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is the first paragraph element. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the second paragraph element. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the third paragraph element (it will be removed from the paragraph and we will not see it). ");
     * oParagraph.AddElement(oRun);
     * oParagraph.AddLineBreak();
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the fourth paragraph element - it became the third, because we removed the previous run from the paragraph. ");
     * oParagraph.AddElement(oRun);
     * oParagraph.AddLineBreak();
     * oRun = Api.CreateRun();
     * oRun.AddText("Please note that line breaks are not counted into paragraph elements!");
     * oParagraph.AddElement(oRun);
     * oParagraph.RemoveElement(3);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/RemoveElement/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * var oBullet = Api.CreateBullet("-");
     * oParaPr.SetBullet(oBullet);
     * oParagraph.AddText(" This is an example of the bulleted paragraph.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetBullet/
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
     * Sets the text color to the current paragraph.
     *
     * @param color - The text color.
     * @returns this
     * @since 9.1.0
     */
    SetColor(color: ApiColor): ApiParagraph;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is just a sample text. ");
     * oParagraph.SetHighlight("lightGray");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParagraph/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiParagraph;

    /**
     * Sets the paragraph first line indentation.
     *
     * @param nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndFirstLine(1440);
     * oParagraph.AddText("This is the first paragraph with the indent of 1 inch set to the first line. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndFirstLine/
     */
    SetIndFirstLine(nValue: number): boolean;

    /**
     * Sets the paragraph left side indentation.
     *
     * @param nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndLeft(2880);
     * oParagraph.AddText("This is the first paragraph with the indent of 2 inches set to it. ");
     * oParagraph.AddText("This indent is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndLeft/
     */
    SetIndLeft(nValue: number): boolean;

    /**
     * Sets the paragraph right side indentation.
     *
     * @param nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an
     *   inch).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetIndRight(2880);
     * oParagraph.AddText("This is the first paragraph with the right offset of 2 inches set to it. ");
     * oParagraph.AddText("This offset is set by the paragraph style. No paragraph inline style is applied. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetIndRight/
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
     * @param sJc - The justification type that
     *   will be applied to the paragraph contents.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetJc("center");
     * oParagraph.AddText("This is a paragraph with the text in it aligned by the center. ");
     * oParagraph.AddText("The justification is specified in the paragraph style. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetJc/
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
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetOutlineLvl/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingAfter(1440);
     * oParagraph.AddText("This is an example of setting a space after a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the first paragraph has this offset enabled.");
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingAfter/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParagraph.AddText("This is an example of setting a space before a paragraph. ");
     * oParagraph.AddText("The second paragraph will have an offset of one inch from the top. ");
     * oParagraph.AddText("This is due to the fact that the second paragraph has this offset enabled.");
     * oParagraph = Api.CreateParagraph();
     * oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingBefore(1440);
     * oParagraph.AddText("This is the second paragraph and it is one inch away from the first paragraph.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingBefore/
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetSpacingLine(3 * 240, "auto");
     * oParagraph.AddText("Paragraph 1. Spacing: 3 times of a common paragraph line spacing.");
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oParagraph.AddText("These sentences are used to add lines for demonstrative purposes. ");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetSpacingLine/
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
     * @param aPos - An array of the positions of custom tab stops with respect to the current page margins
     *   measured in twentieths of a point (1/1440 of an inch).
     * @param aVal - An array of the styles of custom tab stops, which determines the behavior of the tab
     *   stop and the alignment which will be applied to text entered at the current custom tab stop.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oParaPr = oParagraph.GetParaPr();
     * oParaPr.SetTabs([1440, 4320, 7200], ["left", "center", "right"]);
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 1 inch left");
     * oParagraph.AddLineBreak();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 3 inches center");
     * oParagraph.AddLineBreak();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddTabStop();
     * oParagraph.AddText("Custom tab - 5 inches right");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiParaPr/Methods/SetTabs/
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

  /** Class representing a placeholder. */
  export interface ApiPlaceholder {
    /**
     * Returns the type of the ApiPlaceholder class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("chart");
     * oShape.SetPlaceholder(oPlaceholder);
     * var sType = oPlaceholder.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPlaceholder/Methods/GetClassType/
     */
    GetClassType(): "placeholder";

    /**
     * Retuns the placeholder index.
     *
     * @returns Returns the placeholder index.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPlaceholder/Methods/GetIndex/
     */
    GetIndex(): number | undefined;

    /**
     * Returns the placeholder type.
     *
     * @returns Returns the placeholder type.
     * @since 8.2.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * let oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * let oPlaceholder = Api.CreatePlaceholder("chart");
     * oShape.SetPlaceholder(oPlaceholder);
     * let oContent = oShape.GetContent();
     * let oParagraph = oContent.GetElement(0);
     * oParagraph.AddText('Placeholder type in this shape is: "' + oPlaceholder.GetType() + '"');
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPlaceholder/Methods/GetType/
     */
    GetType(): PlaceholderType;

    /**
     * Sets the placeholder index.
     *
     * @param nIdx - The placeholder index.
     * @returns Returns false if the placeholder index wasn't set.
     * @since 8.2.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPlaceholder/Methods/SetIndex/
     */
    SetIndex(nIdx: number): boolean;

    /**
     * Sets the placeholder type.
     *
     * @param sType - Placeholder type
     * @returns returns false if placeholder type doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oPlaceholder = Api.CreatePlaceholder("chart");
     * oShape.SetPlaceholder(oPlaceholder);
     * oPlaceholder.SetType("picture");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPlaceholder/Methods/SetType/
     */
    SetType(sType: PlaceholderType): boolean;
  }

  /** Class representing a presentation. */
  export interface ApiPresentation {
    /**
     * Adds the slide master to the presentation slide masters collection.
     *
     * @param pos - The position where the slide master will be added.
     * @param apiMaster - The slide master to be added.
     * @returns return false if position is invalid or apiMaster doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = Api.CreateMaster();
     * var nCountBefore = oPresentation.GetMastersCount();
     * oPresentation.AddMaster(nCountBefore, oMaster);
     * var nCountAfter = oPresentation.GetMastersCount();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters before adding new master: " + nCountBefore);
     * oParagraph.AddLineBreak();
     * oParagraph.AddText("Number of masters after adding new master: " + nCountAfter);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/AddMaster/
     */
    AddMaster(apiMaster: ApiMaster): boolean;
    AddMaster(pos: number, apiMaster: ApiMaster): boolean;

    /**
     * Adds a math equation to the current presentation.
     *
     * @param sText - The math equation text.
     * @param sFormat - The math equation format. Possible values are "unicode", "latex", and "mathml".
     * @since 9.0.0
     */
    AddMathEquation(sText: string, sFormat: string): boolean;

    /**
     * Appends a new slide to the end of the presentation.
     *
     * @param oSlide - The slide created using the {@link Api#CreateSlide} method.
     * @param nIndex - Index of the slide to be added. If not specified, the slide will be added to the end of the
     *   presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/AddSlide/
     */
    AddSlide(oSlide: ApiSlide, nIndex: number): void;

    /**
     * Applies a theme to all the slides in the presentation.
     *
     * @param oApiTheme - The presentation theme.
     * @returns returns false if param isn't theme or presentation doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/ApplyTheme/
     */
    ApplyTheme(oApiTheme: ApiTheme): boolean;

    /**
     * Creates a new history point.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("This is just a sample text.");
     * oPresentation.CreateNewHistoryPoint();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("New history point was just created.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/CreateNewHistoryPoint/
     */
    CreateNewHistoryPoint(): void;

    /**
     * Add text to the document on the cursor position.
     *
     * @param sText - The text to add to document.
     * @since 9.5.0
     */
    EnterText(sText: string): boolean;

    /**
     * Returns the shape that is currently selected or being edited in the presentation.
     *
     * @returns The active shape object, or null if no shape is currently active.
     * @since 9.5.0
     */
    GetActiveShape(): ApiShape | null;

    /**
     * Returns the table that is currently selected or being edited in the presentation.
     *
     * @returns The active table object, or null if no table is currently active.
     * @since 9.5.0
     */
    GetActiveTable(): ApiTable | null;

    /**
     * Returns an array with all the chart objects from the current presentation.
     *
     * @since 9.0.0
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns all comments from the current presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * Api.pluginMethod_AddComment({"UserName": "John Smith", "Text": "Comment 1"});
     * var arrComments = oPresentation.GetAllComments();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Comment text: " + arrComments[0].GetText());
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetAllComments/
     */
    GetAllComments(): ApiComment[];

    /**
     * Returns an array with all the drawing objects from the current presentation.
     *
     * @since 9.0.0
     */
    GetAllDrawings(): Drawing[];

    /**
     * Returns an array with all the image objects from the current presentation.
     *
     * @since 9.0.0
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns an array with all the OLE objects from the current presentation.
     *
     * @since 9.0.0
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array with all the shape objects from the current presentation.
     *
     * @since 9.0.0
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns an array of all slide masters from the current presentation.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetAllSlideMasters/
     */
    GetAllSlideMasters(): ApiMaster[];

    /**
     * Returns an array of all slides from the current presentation.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetAllSlides/
     */
    GetAllSlides(): ApiSlide[];

    /**
     * Returns an array with all tables from the current presentation (including slide masters and slide
     * layouts).
     *
     * @returns An array with all tables from the current presentation.
     * @since 9.1.0
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns a type of the ApiPresentation class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oPresentation.GetClassType();
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetClassType/
     */
    GetClassType(): "presentation";

    /**
     * Returns the core properties interface for the current presentation.
     * This method is used to view or modify standard metadata such as title, author, and keywords.
     *
     * @since 9.0.0
     */
    GetCore(): ApiCore;

    /**
     * Returns the index for the current slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var nCurrentSlideIndex = oPresentation.GetCurSlideIndex();
     * oParagraph.AddText("Current Slide Index = " + nCurrentSlideIndex);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetCurSlideIndex/
     */
    GetCurSlideIndex(): number;

    /**
     * Returns the current slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetCurrentSlide/
     */
    GetCurrentSlide(): ApiSlide;

    /**
     * Returns the current visible slide.
     *
     * @returns Returns null if the current slide is not found or not visible.
     * @since 9.0.0
     */
    GetCurrentVisibleSlide(): ApiSlide | null;

    /**
     * Returns the custom properties from the current presentation.
     *
     * @since 9.0.0
     */
    GetCustomProperties(): ApiCustomProperties;

    /**
     * Retrieves the custom XML manager associated with the presentation.
     * This manager allows manipulation and access to custom XML parts within the presentation.
     *
     * @returns Returns an instance of ApiCustomXmlParts if the custom XML manager exists, otherwise returns
     *   null.
     * @since 9.1.0
     */
    GetCustomXmlParts(): ApiCustomXmlParts | null;

    /**
     * Returns the document information:
     * **Application** - the application the document has been created with.
     * **CreatedRaw** - the date and time when the file was created.
     * **Created** - the parsed date and time when the file was created.
     * **LastModifiedRaw** - the date and time when the file was last modified.
     * **LastModified** - the parsed date and time when the file was last modified.
     * **LastModifiedBy** - the name of the user who has made the latest change to the document.
     * **Autrors** - the persons who has created the file.
     * **Title** - this property allows you to simplify your documents classification.
     * **Tags** - this property allows you to simplify your documents classification.
     * **Subject** - this property allows you to simplify your documents classification.
     * **Comment** - this property allows you to simplify your documents classification.
     *
     * @example
     * ```js
     * const oPresentation = Api.GetPresentation();
     * const oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * const oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * const oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * const oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * const oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * const oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * const oDocContent = oShape.GetDocContent();
     * const oParagraph = oDocContent.GetElement(0);
     * const oDocInfo = oPresentation.GetDocumentInfo();
     * oParagraph.AddText('This document has been created with: ' + oDocInfo.Application);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetDocumentInfo/
     */
    GetDocumentInfo(): object;

    /**
     * Returns a collection of drawing objects from the document content filtered by their names.
     *
     * @param ids - An array of drawing names to filter by.
     * @since 9.3.0
     */
    GetDrawingsByName(ids: string[]): Drawing[];

    /**
     * Returns the presentation height in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var nHeight = oPresentation.GetHeight();
     * oParagraph.AddText("Height = " + nHeight);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns whether the presentation loops continuously until the user stops it.
     *
     * @returns True if the presentation is set to loop until stopped; otherwise, false.
     * @since 9.3.0
     */
    GetLoopUntilStopped(): boolean;

    /**
     * Returns a slide master by its position in the presentation.
     *
     * @param nPos - Slide master position in the presentation
     * @returns returns null if position is invalid.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var sType = oMaster.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetMaster/
     */
    GetMaster(nPos: number): ApiMaster | null;

    /**
     * Returns a number of slide masters.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var nMasters = oPresentation.GetMastersCount();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of masters = " + nMasters);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetMastersCount/
     */
    GetMastersCount(): number;

    /**
     * Returns a slide by its position in the presentation.
     *
     * @param nIndex - The slide number (position) in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetSlideByIndex/
     */
    GetSlideByIndex(nIndex: number): ApiSlide;

    /**
     * Returns a number of slides.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * var oSlide2 = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide2);
     * var nSlides = oPresentation.GetSlidesCount();
     * oSlide1.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Number of slides = " + nSlides);
     * oSlide1.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetSlidesCount/
     */
    GetSlidesCount(): number;

    /**
     * Returns the presentation style by its name.
     *
     * @param sStyleName - The name of the table style to look up.
     * @since 9.5.0
     */
    GetStyle(sStyleName: string): ApiStyle | null;

    /**
     * Returns the presentation width in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var nHeight = oPresentation.GetWidth();
     * oParagraph.AddText("Height = " + nHeight);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Add paragraph to the document on the cursor position.
     *
     * @since 9.5.0
     */
    InsertParagraphBreak(): boolean;

    /**
     * Moves the cursor down.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @since 9.5.0
     */
    MoveCursorDown(count?: number, addToSelect?: boolean): boolean;

    /**
     * Moves the cursor to the left.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @param byWords - Specifies whether to move by words instead of by character.
     * @since 9.5.0
     */
    MoveCursorLeft(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;

    /**
     * Moves the cursor to the right.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @param byWords - Specifies whether to move by words instead of by character.
     * @since 9.5.0
     */
    MoveCursorRight(count?: number, addToSelect?: boolean, byWords?: boolean): boolean;

    /**
     * Moves the cursor up.
     *
     * @param count - Number of movements.
     * @param addToSelect - Specifies whether to select text during the move.
     * @since 9.5.0
     */
    MoveCursorUp(count?: number, addToSelect?: boolean): boolean;

    /**
     * Removes a range of slides from the presentation.
     * Deletes all the slides from the presentation if no parameters are specified.
     *
     * @param nStart - The starting position for the deletion range.
     * @param nCount - The number of slides to delete.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * oPresentation.RemoveSlides(0, 1);
     * oSlide.RemoveAllObjects();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oPresentation.GetClassType();
     * oParagraph.AddText("A slide with no background was removed from this presentation.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/RemoveSlides/
     */
    RemoveSlides(nStart?: number, nCount?: number): boolean;

    /**
     * Replaces the current image with an image specified.
     *
     * @param sImageUrl - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or Base64 encoded images are supported).
     * @param Width - The image width in English measure units.
     * @param Height - The image height in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oDrawing = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/coordinate_aspects.png", 300 * 36000, 150 * 36000);
     * oSlide.AddObject(oDrawing);
     * oDrawing.Select();
     * oPresentation.ReplaceCurrentImage("https://helpcenter.onlyoffice.com/images/Help/GettingStarted/Documents/big/EditDocument.png", 60 * 36000, 35 * 36000);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/ReplaceCurrentImage/
     */
    ReplaceCurrentImage(sImageUrl: string, Width: number, Height: number): void;

    /**
     * Searches for the specified text in the presentation and returns all found occurrences as text
     * ranges.
     *
     * @param text - The text to search for.
     * @param isMatchCase - Case sensitive or not.
     * @param isWholeWords - Whether to search for whole words only.
     * @since 9.5.0
     */
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];

    /**
     * Finds and replaces the text in the presentation.
     *
     * @param properties - The properties to find and replace.
     * @param properties_searchString - Search string.
     * @param properties_replaceString - Replacement string.
     * @param properties_matchCase - Case sensitive or not.
     * @param properties_wholeWords - Whether to search for whole words only.
     * @since 9.5.0
     */
    SearchAndReplace(properties: object, properties_searchString: string, properties_replaceString: string, properties_matchCase?: boolean, properties_wholeWords?: boolean): boolean;

    /**
     * Specifies the languages which will be used to check spelling and grammar (if requested).
     *
     * @param sLangId - The possible value for this parameter is a language identifier as defined by
     *   RFC 4646/BCP 47. Example: "en-CA".
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetLanguage("en-CA");
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("English (Canada) will be used to check spelling and grammar in this presentation (if requested).");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): boolean;

    /**
     * Sets whether the presentation loops continuously until the user stops it.
     *
     * @param loopUntilStopped - True to set the presentation to loop until stopped; false otherwise.
     * @returns True if the new setting was applied successfully; otherwise, false.
     * @since 9.3.0
     */
    SetLoopUntilStopped(loopUntilStopped: boolean): boolean;

    /**
     * Sets the size to the current presentation.
     *
     * @param nWidth - The presentation width in English measure units.
     * @param nHeight - The presentation height in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The size of this presentation was changed: width - 254 mm, height - 190 mm.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/SetSizes/
     */
    SetSizes(nWidth: number, nHeight: number): void;

    /**
     * Converts the slides from the current ApiPresentation object into the JSON objects.
     *
     * @param nStart - The index to the end slide.
     * @param nEnd - The index to the end slide.
     * @param bWriteLayout - Specifies if the slide layout will be written to the JSON object or not.
     * @param bWriteMaster - Specifies if the slide master will be written to the JSON object or not (bWriteMaster is false
     *   if bWriteLayout === false).
     * @param bWriteAllMasLayouts - Specifies if all child layouts from the slide master will be written to the JSON object or not.
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var json = oPresentation.SlidesToJSON(0, 0, true, true, true, true);
     * var aSlidesFromJSON = Api.FromJSON(json);
     * var oSlideFromJSON = aSlidesFromJSON[0];
     * oPresentation.AddSlide(oSlideFromJSON);
     * var sType = oSlideFromJSON.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawing);
     * var oDocContent = oDrawing.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Class type = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/SlidesToJSON/
     */
    SlidesToJSON(nStart?: number, nEnd?: number, bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object[];

    /**
     * Converts the ApiPresentation object into the JSON object.
     *
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var json = oPresentation.ToJSON(true);
     * var oPresentationFromJSON = Api.FromJSON(json);
     * var oSlide = oPresentationFromJSON.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var sType = oPresentationFromJSON.GetClassType();
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresentation/Methods/ToJSON/
     */
    ToJSON(bWriteTableStyles?: boolean): object;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiPresetColor class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oPresetColor = Api.CreatePresetColor("peachPuff");
     * var oGs1 = Api.CreateGradientStop(oPresetColor, 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oPresetColor.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiPresetColor/Methods/GetClassType/
     */
    GetClassType(): "presetColor";
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiRGBColor class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oRGBColor = Api.CreateRGBColor(255, 213, 191);
     * var oGs1 = Api.CreateGradientStop(oRGBColor, 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oRGBColor.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRGBColor/Methods/GetClassType/
     */
    GetClassType(): "rgbColor";
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

  /** Class representing a small text block called 'run'. */
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType"> {
    /**
     * Adds a line break to the current run position and starts the next element from a new line.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is the text for the first line. Nothing special.");
     * oRun.AddLineBreak();
     * oRun.AddText("This is the text which starts from the beginning of the second line. ");
     * oRun.AddText("It is written in two text runs, you need a space at the end of the first run sentence to separate them.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/AddLineBreak/
     */
    AddLineBreak(): boolean;

    /**
     * Adds a tab stop to the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.SetFontSize(30);
     * oRun.AddText("This is just a sample text. After it three tab stops will be added.");
     * oRun.AddTabStop();
     * oRun.AddTabStop();
     * oRun.AddTabStop();
     * oRun.AddText("This is the text which starts after the tab stops.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/AddTabStop/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.SetFontSize(30);
     * oRun.AddText("This is just a sample text. Nothing special.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/AddText/
     */
    AddText(text: string | number[], widths?: number[]): boolean;

    /**
     * Clears the content from the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.SetFontSize(30);
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("But you will not see it in the resulting document, as it will be cleared.");
     * oParagraph.AddElement(oRun);
     * oRun.ClearContent();
     * oParagraph = Api.CreateParagraph();
     * oRun = Api.CreateRun();
     * oRun.AddText("The text in the previous paragraph cannot be seen, as it has been cleared.");
     * oParagraph.AddElement(oRun);
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/ClearContent/
     */
    ClearContent(): boolean;

    /**
     * Creates a copy of the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text that was copied. ");
     * oParagraph.AddElement(oRun);
     * var oCopyRun = oRun.Copy();
     * oParagraph.AddElement(oCopyRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/Copy/
     */
    Copy(): ApiRun;

    /**
     * Deletes the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun.Delete();
     * oRun = Api.CreateRun();
     * oRun.AddText("This is the second run. The first run was removed from the paragraph.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Gets the bold property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetBold(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bBold = oTextPr.GetBold();
     * oParagraph.AddText("Bold property: " + bBold);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Specifies whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetCaps(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bCaps = oTextPr.GetCaps();
     * oParagraph.AddText("Property of the capitalized letters: " + bCaps);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiRun class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var sClassType = oRun.GetClassType();
     * oRun.SetFontSize(30);
     * oRun.AddText("Class Type = " + sClassType);
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/GetClassType/
     */
    GetClassType(): "run";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetDoubleStrikeout(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bDoubleStrikeout = oTextPr.GetDoubleStrikeout();
     * oParagraph.AddText("Double strikeout property: " + bDoubleStrikeout);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetFill(oFill);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oFill = oTextPr.GetFill();
     * var sType = oFill.GetClassType();
     * oParagraph.AddText("Text color type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Gets the font family from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontFamily("Arial");
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var sFontFamily = oTextPr.GetFontFamily();
     * oParagraph.AddText("Font family: " + sFontFamily);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Returns all font names from all elements inside the current run.
     *
     * @returns The font names used for the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetFontFamily("Comic Sans MS");
     * oRun.AddText("This is a text run with the font family set to 'Comic Sans MS'.");
     * oParagraph.AddElement(oRun);
     * oParagraph.AddLineBreak();
     * var aFontNames = oRun.GetFontNames();
     * oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Run font names: ");
     * oParagraph.AddLineBreak();
     * for (let i = 0; i < aFontNames.length; i++ ){
     * 	oParagraph.AddText(aFontNames[i]);
     * 	oParagraph.AddLineBreak();
     * }
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/GetFontNames/
     */
    GetFontNames(): string[];

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(60);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var nFontSize = oTextPr.GetFontSize();
     * oParagraph.AddText("Font size: " + nFontSize);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetHighlight("lightGray");
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var sHighlight = oTextPr.GetHighlight();
     * oParagraph.AddText("Highlight property: " + sHighlight);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetItalic(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bItalic = oTextPr.GetItalic();
     * oParagraph.AddText("Italic property: " + bItalic);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oStroke = Api.CreateStroke(0.2 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oTextPr.SetOutLine(oStroke);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oStroke = oTextPr.GetOutLine();
     * var sType = oStroke.GetClassType();
     * oParagraph.AddText("Text outline type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Specifies whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetSmallCaps(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bSmallCaps = oTextPr.GetSmallCaps();
     * oParagraph.AddText("Property of the small capitalized letters: " + bSmallCaps);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetSpacing(80);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var nSpacing = oTextPr.GetSpacing();
     * oParagraph.AddText("Text spacing: " + nSpacing);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): number;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetStrikeout(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bStrikeout = oTextPr.GetStrikeout();
     * oParagraph.AddText("Strikeout property: " + bStrikeout);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetTextFill(oFill);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oFill = oTextPr.GetTextFill();
     * var sType = oFill.GetClassType();
     * oParagraph.AddText("Text fill type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Returns the text properties of the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(30);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font size set to 15 points using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetUnderline(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bUnderline = oTextPr.GetUnderline();
     * oParagraph.AddText("Underline property: " + bUnderline);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Removes all the elements from the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text.");
     * oRun.RemoveAllElements();
     * oRun.AddText("All elements from this run were removed before adding this text.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/RemoveAllElements/
     */
    RemoveAllElements(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the current run are displayed bold.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetBold(true);
     * oRun.AddText("This is a text run with the font set to bold.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the current text run are formatted for display only as
     * their capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetCaps(true);
     * oRun.AddText("This is a text run with the font set to capitalized letters.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the current run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetDoubleStrikeout(true);
     * oRun.AddText("This is a text run with the text struck out with two lines.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oRun.SetFill(oFill);
     * oRun.AddText("This is a text run with the font color set to black.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetFontFamily("Comic Sans MS");
     * oRun.AddText("This is a text run with the font family set to 'Comic Sans MS'.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetFontSize(50);
     * oRun.AddText("This is a text run with the font size set to 25 points (50 half-points).");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current run.
     *
     * @param sColor - Available highlight color.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is a text run with the text highlighted with light gray color.");
     * oParagraph.AddElement(oRun);
     * oRun.SetHighlight("lightGray");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetItalic(true);
     * oRun.AddText("This is a text run with the font set to italicized letters.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oStroke = Api.CreateStroke(0.2 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oTextPr.SetOutLine(oStroke);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a text run with the black text outline set using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetOutLine/
     */
    SetOutLine(oStroke: ApiStroke): ApiTextPr;

    /**
     * Specifies that all the small letter characters in this text run are formatted for display only as
     * their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or
     *   not.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetSmallCaps(true);
     * oRun.AddText("This is a text run with the font set to small capitalized letters.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetSpacing(80);
     * oRun.AddText("This is a text run with the text spacing set to 4 points (20 twentieths of a point).");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: number): ApiTextPr;

    /**
     * Specifies that the contents of the current run are displayed with a single horizontal line through
     * the center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetStrikeout(true);
     * oRun.AddText("This is a text run with the text struck out with a single line.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetTextFill(oFill);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the black text fill set using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetTextFill/
     */
    SetTextFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets the text properties to the current run.
     *
     * @param oTextPr - The text properties that will be set to the current run.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is a sample text with the font size set to 15 points and the font weight set to bold.");
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(30);
     * oTextPr.SetBold(true);
     * oRun.SetTextPr(oTextPr);
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetTextPr/
     */
    SetTextPr(oTextPr: ApiTextPr): ApiTextPr;

    /**
     * Specifies that the contents of the current run are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies that the contents of the current run are displayed underlined.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetUnderline(true);
     * oRun.AddText("This is a text run with the text underlined with a single line.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetUnderline/
     */
    SetUnderline(isUnderline: boolean): ApiTextPr;

    /**
     * Specifies the alignment which will be applied to the contents of the current run in relation to the
     * default appearance of the text run:
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetVertAlign("subscript");
     * oRun.AddText("This is a text run with the text aligned below the baseline vertically. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetVertAlign("baseline");
     * oRun.AddText("This is a text run with the text aligned by the baseline vertically. ");
     * oParagraph.AddElement(oRun);
     * oRun = Api.CreateRun();
     * oRun.SetVertAlign("superscript");
     * oRun.AddText("This is a text run with the text aligned above the baseline vertically.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiRun/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a Scheme Color. */
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
    /**
     * Returns a type of the ApiSchemeColor class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oSchemeColor = Api.CreateSchemeColor("dk1");
     * var oFill = Api.CreateSolidFill(oSchemeColor);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oSchemeColor.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSchemeColor/Methods/GetClassType/
     */
    GetClassType(): "schemeColor";
  }

  /** Class representing a document section. */
  export interface ApiSection {
  }

  /** Class representing the selection in the presentation. */
  export interface ApiSelection {
    /**
     * Returns the selected shapes.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSelection/Methods/GetShapes/
     */
    GetShapes(): ApiDrawing[];

    /**
     * Returns the selected slides.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSelection/Methods/GetSlides/
     */
    GetSlides(): ApiSlide[];

    /**
     * Returns the type of the current selection.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSelection/Methods/GetType/
     */
    GetType(): SelectionType;

    /**
     * Specifies whether the current selection is empty or not.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSelection/Methods/IsEmpty/
     */
    IsEmpty(): boolean;
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
    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns the type of the ApiShape class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oShape.GetClassType();
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiShape/Methods/GetClassType/
     */
    GetClassType(): "shape";

    /**
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetContent();
     * oShape.SetVerticalTextAlign("bottom");
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it ");
     * oParagraph.AddText("aligning it vertically by the bottom.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiShape/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Deprecated in 6.2.
     * Returns the shape inner contents where a paragraph or text runs can be inserted.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oShape.SetVerticalTextAlign("bottom");
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it ");
     * oParagraph.AddText("aligning it vertically by the bottom.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiShape/Methods/GetDocContent/
     */
    GetDocContent(): ApiDocumentContent;

    /** Gets the fill properties from the current shape. */
    GetFill(): ApiFill | null;

    /**
     * Returns the geometry object from the current shape.
     *
     * @since 9.1.0
     */
    GetGeometry(): ApiGeometry;

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Gets the outline properties from the current shape. */
    GetLine(): ApiStroke | null;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns the text autofit type of the current shape.
     *
     * @returns The text autofit type.
     * @since 9.5.0
     */
    GetTextFit(): TextFitType;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /** Gets the vertical alignment from the shape content where a paragraph or text runs can be inserted. */
    GetVerticalTextAlign(): VerticalTextAlign;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Sets the fill properties to the current shape.
     *
     * @param oFill - The fill type used to fill the shape.
     * @returns returns false if param is invalid.
     */
    SetFill(oFill: ApiFill): boolean;

    /**
     * Sets a custom geometry for the current shape.
     *
     * @param oGeometry - The geometry to set.
     * @since 9.1.0
     */
    SetGeometry(oGeometry: ApiGeometry): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the outline properties to the current shape.
     *
     * @param oStroke - The stroke used to create the shape outline.
     * @returns returns false if param is invalid.
     */
    SetLine(oStroke: ApiStroke): boolean;

    /**
     * Sets the text paddings to the current shape.
     *
     * @param nLeft - Left padding.
     * @param nTop - Top padding.
     * @param nRight - Right padding.
     * @param nBottom - Bottom padding.
     * @since 9.3.0
     */
    SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;

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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartOnlineStorage", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oShape.SetVerticalTextAlign("bottom");
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("We removed all elements from the shape and added a new paragraph inside it ");
     * oParagraph.AddText("aligning it vertically by the bottom.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiShape/Methods/SetVerticalTextAlign/
     */
    SetVerticalTextAlign(verticalAlign: VerticalTextAlign): boolean;
  }

  /** Class representing a document picture form. */
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a slide. */
  export interface ApiSlide {
    /**
     * Adds a comment to the current slide.
     *
     * @param posX - The X position (in EMU) of the comment (defaults to 0).
     * @param posY - The Y position (in EMU) of the comment (defaults to 0).
     * @param text - The comment text.
     * @param author - The author's name (defaults to the current user name).
     * @param userId - The user ID of the comment author (defaults to the current user ID).
     */
    AddComment(posX: number, posY: number, text: string, author?: string, userId?: string): boolean;

    /**
     * Adds a text to the notes page of the current slide.
     *
     * @param sText - The text to be added to the notes page.
     * @returns Returns true if text was added successfully, otherwise false.
     * @since 9.0.0
     */
    AddNotesText(sText: string): boolean;

    /**
     * Adds an object (image, shape or chart) to the current presentation slide.
     *
     * @param oDrawing - The object which will be added to the current presentation slide.
     * @returns returns false if slide doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/AddObject/
     */
    AddObject(oDrawing: ApiDrawing): boolean;

    /**
     * Applies the specified layout to the current slide.
     * The layout must be in slide master.
     *
     * @param oLayout - Layout to be applied.
     * @returns returns false if slide doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(4);
     * oSlide.ApplyLayout(oLayout);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/ApplyLayout/
     */
    ApplyLayout(oLayout: ApiLayout): boolean;

    /**
     * Applies the specified theme to the current slide.
     *
     * @param oApiTheme - Presentation theme.
     * @returns returns false if master is null or master hasn't background.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oSlide.ApplyTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/ApplyTheme/
     */
    ApplyTheme(oApiTheme: ApiTheme): boolean;

    /**
     * Clears the slide background.
     *
     * @returns return false if slide doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * var oDuplicateSlide = oSlide.Duplicate(1);
     * oDuplicateSlide.ClearBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/ClearBackground/
     */
    ClearBackground(): boolean;

    /**
     * Creates a copy of the current slide object.
     *
     * @returns returns new ApiSlide object that represents the duplicate slide. Returns null if slide doesn't
     *   exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * var oCopySlide = oSlide.Copy();
     * oPresentation.AddSlide(oCopySlide);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/Copy/
     */
    Copy(): ApiSlide | null;

    /**
     * Deletes the current slide from the presentation.
     *
     * @returns returns false if slide doesn't exist or is not in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.Delete();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/Delete/
     */
    Delete(): boolean;

    /**
     * Creates a duplicate of the specified slide object, adds the new slide to the slides collection.
     *
     * @param nPos - Position where the new slide will be added.
     * @returns returns new ApiSlide object that represents the duplicate slide. Returns null if slide doesn't
     *   exist or is not in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * var oDuplicateSlide = oSlide.Duplicate(1);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/Duplicate/
     */
    Duplicate(nPos?: number): ApiSlide | null;

    /**
     * Sets the layout background as the background of the slide.
     *
     * @returns returns false if layout is null or layout hasn't background or slide doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oLayout.SetBackground(oFill);
     * oSlide.FollowLayoutBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/FollowLayoutBackground/
     */
    FollowLayoutBackground(): boolean;

    /**
     * Sets the master background as the background of the slide.
     *
     * @returns returns false if master is null or master hasn't background or slide doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oLayout = oMaster.GetLayout(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oLayout.SetBackground(oFill);
     * oSlide.FollowMasterBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/FollowMasterBackground/
     */
    FollowMasterBackground(): boolean;

    /**
     * Returns an array with all the chart objects from the slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 13);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oChart.SetSeriesFill(oFill, 0, false);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oChart.SetSeriesFill(oFill, 1, false);
     * oSlide.AddObject(oChart);
     * var aCharts = oSlide.GetAllCharts();
     * var oStroke = Api.CreateStroke(1 * 150, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * aCharts[0].SetMinorHorizontalGridlines(oStroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetAllCharts/
     */
    GetAllCharts(): ApiChart[];

    /**
     * Returns an array with all the drawing objects from the slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawing);
     * var aDrawings = oSlide.GetAllDrawings();
     * var oPlaceholder = Api.CreatePlaceholder("chart");
     * aDrawings[0].SetPlaceholder(oPlaceholder);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetAllDrawings/
     */
    GetAllDrawings(): Drawing[];

    /**
     * Returns an array with all the image objects from the slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oImage = Api.CreateImage("https://api.onlyoffice.com/content/img/docbuilder/examples/coordinate_aspects.png", 60 * 36000, 35 * 36000);
     * oSlide.AddObject(oImage);
     * var aImages = oSlide.GetAllImages();
     * var sType = aImages[0].GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetAllImages/
     */
    GetAllImages(): ApiImage[];

    /**
     * Returns an array with all the OLE objects from the slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oOleObject = Api.CreateOleObject("https://i.ytimg.com/vi_webp/SKGz4pmnpgY/sddefault.webp", 130 * 36000, 90 * 36000, "https://youtu.be/SKGz4pmnpgY", "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}");
     * oOleObject.SetSize(200 * 36000, 130 * 36000);
     * oOleObject.SetPosition(70 * 36000, 30 * 36000);
     * oSlide.AddObject(oOleObject);
     * var aOleObjects = oSlide.GetAllOleObjects();
     * var sAppId = aOleObjects[0].GetApplicationId();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("rect", 300 * 36000, 15 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(20 * 36000, 170 * 36000);
     * var oDocContent = oDrawing.GetContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The application ID for the current OLE object: " + sAppId);
     * oSlide.AddObject(oDrawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetAllOleObjects/
     */
    GetAllOleObjects(): ApiOleObject[];

    /**
     * Returns an array with all the shape objects from the slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oShape);
     * var aShapes = oSlide.GetAllShapes();
     * aShapes[0].SetSize(150 * 36000, 65 * 36000);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetAllShapes/
     */
    GetAllShapes(): ApiShape[];

    /**
     * Returns an array with all tables from the current slide.
     *
     * @returns An array with all tables from the current slide.
     * @since 9.1.0
     */
    GetAllTables(): ApiTable[];

    /**
     * Returns the background fill of the current presentation slide.
     *
     * @returns returns null if the slide doesn't exist or has no background fill.
     * @since 9.5.0
     */
    GetBackground(): ApiFill | null;

    /**
     * Returns the type of the ApiSlide class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var sClassType = oSlide.GetClassType();
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetClassType/
     */
    GetClassType(): "slide";

    /**
     * Returns an array of drawings by the specified placeholder type.
     *
     * @param sType - The placeholder type.
     * @since 8.2.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * let oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * let oPlaceholder = Api.CreatePlaceholder("chart");
     * oShape.SetPlaceholder(oPlaceholder);
     * oSlide.AddObject(oShape);
     * let aDrawingsWithPh = oSlide.GetDrawingsByPlaceholderType("chart");
     * for (let i = 0; i < aDrawingsWithPh.length; i++) {
     *     aDrawingsWithPh[i].Delete();
     * }
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetDrawingsByPlaceholderType/
     */
    GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];

    /**
     * Returns the slide height in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("rect", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var nSlideHeight = oSlide.GetHeight();
     * oParagraph.AddText("The slide height = " + nSlideHeight / 36000 + " mm");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetHeight/
     */
    GetHeight(): number;

    /**
     * Returns a layout of the current slide.
     *
     * @returns returns null if slide or layout doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oLayout = oSlide.GetLayout();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oLayout.SetBackground(oFill);
     * oSlide.FollowLayoutBackground();
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetLayout/
     */
    GetLayout(): ApiLayout | null;

    /**
     * Returns the notes page from the current slide.
     *
     * @since 9.0.0
     */
    GetNotesPage(): ApiNotesPage | null;

    /**
     * Returns a position of the current slide in the presentation.
     *
     * @returns returns -1 if slide doesn't exist or is not in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var nIndex = oSlide.GetSlideIndex();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Slide index = " + nIndex);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetSlideIndex/
     */
    GetSlideIndex(): number;

    /**
     * Returns the slide show transition of the current slide.
     *
     * @returns Returns the slide show transition or null if the slide has no transition.
     * @since 9.3.0
     */
    GetSlideShowTransition(): ApiSlideShowTransition | null;

    /**
     * Returns a theme of the current slide.
     *
     * @returns returns null if slide or layout or master or theme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oTheme = oSlide.GetTheme();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * oTheme.SetColorScheme(oClrScheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetTheme/
     */
    GetTheme(): ApiTheme | null;

    /**
     * Returns the animation timeline for the slide.
     *
     * @returns The animation timeline for the slide.
     * @since 9.3.0
     */
    GetTimeLine(): ApiTimeLine;

    /**
     * Returns the visibility of the current presentation slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.SetVisible(false);
     * var bVisible = oSlide.GetVisible();
     * oSlide = oPresentation.GetSlideByIndex(1);
     * oSlide.RemoveAllObjects();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oShape);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("The first slide visibility: " + bVisible);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetVisible/
     */
    GetVisible(): boolean;

    /**
     * Returns the slide width in English measure units.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("rect", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var nSlideWidth = oSlide.GetWidth();
     * oParagraph.AddText("The slide width = " + nSlideWidth / 36000 + " mm");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GetWidth/
     */
    GetWidth(): number;

    /**
     * Groups an array of drawings in the current slide.
     *
     * @param aDrawings - An array of drawings to group.
     * @since 8.3.0
     *
     * @example
     * ```js
     * let oPresentation = Api.GetPresentation();
     * let oSlide = oPresentation.GetSlideByIndex(0);
     * let oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * let oFill2 = Api.CreateSolidFill(Api.CreateRGBColor(111, 255, 61));
     * let oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * let oShape1 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill1, oStroke);
     * let oShape2 = Api.CreateShape("flowChartMagneticTape", 150 * 36000, 60 * 36000, oFill2, oStroke);
     * oShape1.SetPosition(608400, 1267200);
     * oShape2.SetPosition(608400, 1400000);
     * oSlide.AddObject(oShape1);
     * oSlide.AddObject(oShape2);
     * oSlide.GroupDrawings([oShape1, oShape2]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/GroupDrawings/
     */
    GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;

    /**
     * Moves the current slide to a specific location within the same collection.
     *
     * @param nPos - Position where the current slide will be moved to.
     * @returns returns false if slide doesn't exist or position is invalid or slide is not in the presentation.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * oSlide.MoveTo(0);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/MoveTo/
     */
    MoveTo(nPos: number): boolean;

    /**
     * Removes all the objects from the current slide.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(254 * 36000, 190 * 36000);
     * var oSlide = oPresentation.GetCurrentSlide();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("rect", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * oShape = Api.CreateShape("flowChartMagneticTape", 200 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("All objects were removed from this slide before adding this shape.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/RemoveAllObjects/
     */
    RemoveAllObjects(): void;

    /**
     * Removes objects (image, shape or chart) from the current slide.
     *
     * @param nPos - Position from which the object will be deleted.
     * @param nCount - The number of elements to delete.
     * @returns returns false if slide doesn't exist or position is invalid or slide hasn't objects.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("cube", 3212465, 963295, oFill, oStroke);
     * oDrawing.SetPosition(30 * 36000, 1267200);
     * oDrawing.SetSize(150 * 36000, 130 * 36000);
     * var oCopyDrawing = oDrawing.Copy();
     * oCopyDrawing.SetPosition(170 * 36000, 1267200);
     * oCopyDrawing.SetSize(150 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawing);
     * oSlide.AddObject(oCopyDrawing);
     * oSlide.RemoveObject(1, 1);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/RemoveObject/
     */
    RemoveObject(nPos: number, nCount?: number): boolean;

    /**
     * Searches for the specified text within the current slide and returns all found occurrences as text
     * ranges.
     *
     * @param text - The text to search for.
     * @param isMatchCase - Case sensitive or not.
     * @param isWholeWords - Whether to search for whole words only.
     * @since 9.5.0
     */
    Search(text: string, isMatchCase?: boolean, isWholeWords?: boolean): ApiTextRange[];

    /**
     * Selects the current slide.
     *
     * @since 8.3.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/Select/
     */
    Select(): void;

    /**
     * Sets the background to the current presentation slide.
     *
     * @param oApiFill - The color or pattern used to fill the presentation slide background.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * oSlide.SetBackground(oFill);
     * oPresentation.AddSlide(oSlide);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/SetBackground/
     */
    SetBackground(oApiFill: ApiFill): boolean;

    /**
     * Sets the slide show transition to the current slide.
     *
     * @param transition - The slide show transition to be applied.
     * @returns Returns true if the transition was applied successfully, otherwise false.
     * @since 9.3.0
     */
    SetSlideShowTransition(transition: ApiSlideShowTransition): boolean;

    /**
     * Sets the visibility to the current presentation slide.
     *
     * @param value - Slide visibility.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = Api.CreateSlide();
     * oSlide.SetVisible(false);
     * oPresentation.AddSlide(oSlide);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/SetVisible/
     */
    SetVisible(value: boolean): boolean;

    /**
     * Converts the ApiSlide object into the JSON object.
     *
     * @param bWriteLayout - Specifies if the slide layout will be written to the JSON object or not.
     * @param bWriteMaster - Specifies if the slide master will be written to the JSON object or not (bWriteMaster is false
     *   if bWriteLayout === false).
     * @param bWriteAllMasLayouts - Specifies if all child layouts from the slide master will be written to the JSON object or not.
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var json = oSlide.ToJSON(true, true, true, true);
     * var oSlideFromJSON = Api.FromJSON(json);
     * oPresentation.AddSlide(oSlideFromJSON);
     * var sType = oSlideFromJSON.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oDrawing = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oDrawing.SetPosition(608400, 1267200);
     * oDrawing.SetSize(300 * 36000, 130 * 36000);
     * oSlide.AddObject(oDrawing);
     * var oDocContent = oDrawing.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.AddText("Class type = " + sType);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiSlide/Methods/ToJSON/
     */
    ToJSON(bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object;
  }

  /** Class representing a slide show transition. */
  export interface ApiSlideShowTransition {
    /**
     * Returns whether the slide advances on mouse click.
     *
     * @returns True if the slide advances on mouse click; otherwise false.
     * @since 9.3.0
     */
    GetAdvanceOnClick(): boolean;

    /**
     * Returns whether the slide advances after a specified time.
     *
     * @returns True if the slide advances after a specified time; otherwise false.
     * @since 9.3.0
     */
    GetAdvanceOnTime(): boolean;

    /**
     * Returns the slide advance time in milliseconds.
     *
     * @returns The slide advance time in milliseconds if set; otherwise undefined.
     * @since 9.3.0
     */
    GetAdvanceTime(): number | undefined;

    /**
     * Returns the type of the ApiSlideShowTransition class.
     *
     * @since 9.3.0
     */
    GetClassType(): "slideShowTransition";

    /**
     * Returns the transition duration in milliseconds for the slide show transition.
     *
     * @returns The transition duration in milliseconds.
     * @since 9.3.0
     */
    GetDuration(): number;

    /**
     * Returns the entry effect for the slide show transition.
     *
     * @returns The name of the entry effect in string format.
     * @since 9.3.0
     */
    GetEntryEffect(): EntryEffect;

    /**
     * Returns the transition speed (similar to PowerPoint VBA Speed property).
     * Maps duration to speed based on OOXML spd attribute logic:
     * - fast: duration <= 500ms
     * - medium: 500ms < duration <= 750ms
     * - slow: duration > 750ms
     *
     * @returns The transition speed in string format.
     * @since 9.3.0
     */
    GetSpeed(): TransitionSpeed;

    /**
     * Sets whether the slide advances on mouse click.
     *
     * @param advanceOnClick - True to advance the slide on mouse click; otherwise false.
     * @returns True if the value was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetAdvanceOnClick(advanceOnClick: boolean): boolean;

    /**
     * Sets whether the slide advances after a specified time.
     *
     * @param advanceOnTime - True to advance the slide after a specified time; otherwise false.
     * @returns True if the setting was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetAdvanceOnTime(advanceOnTime: boolean): boolean;

    /**
     * Sets the slide advance time in milliseconds.
     *
     * @param advanceTime - The slide advance time in milliseconds.
     * @returns True if the time was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetAdvanceTime(advanceTime: number): boolean;

    /**
     * Sets the transition duration in milliseconds for the slide show transition.
     *
     * @param duration - The transition duration in milliseconds.
     * @returns True if the duration was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetDuration(duration: number): boolean;

    /**
     * Sets the entry effect for the slide show transition.
     *
     * @param entryEffectName - The name of the entry effect in string format.
     * @returns True if the entry effect name is supported and was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetEntryEffect(entryEffectName: EntryEffect): boolean;

    /**
     * Sets the transition speed (similar to PowerPoint VBA Speed property).
     * Converts speed to duration based on standard values:
     * - fast = 500ms
     * - medium = 750ms
     * - slow = 1000ms
     *
     * @param speed - The transition speed in string format.
     * @returns True if the given parameter is valid and was set successfully; otherwise false.
     * @since 9.3.0
     */
    SetSpeed(speed: TransitionSpeed): boolean;
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType"> {
    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /** Returns a type of the ApiSmartArt class. */
    GetClassType(): "smartArt";

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /** Returns an internal ID of the current drawing object. */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

    /**
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;
  }

  /** Class representing a stroke. */
  export interface ApiStroke {
    /**
     * Returns the beginning arrow properties of the stroke.
     *
     * @since 9.5.0
     */
    GetBeginArrow(): object | null;

    /**
     * Returns a type of the ApiStroke class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateLinearGradientFill([oGs1, oGs2], 5400000);
     * var oFill1 = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(3 * 36000, oFill1);
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oStroke.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiStroke/Methods/GetClassType/
     */
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
  export interface ApiTable extends Omit<ApiDrawing, "GetClassType" | "ToJSON">, Omit<ApiTablePr, "GetClassType" | "SetShd" | "ToJSON"> {
    /**
     * Adds a new column to the end of the current table.
     *
     * @param oCell - If not specified, a new column will be added to the end of the table.
     * @param isBefore - Add a new column before or after the specified cell. If no cell is specified,
     *   then this parameter will be ignored.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * oPresentation.SetSizes(300 * 36000, 190 * 36000);
     * var oTable = Api.CreateTable(2, 4);
     * oTable.SetPosition(0 * 36000, 60 * 36000);
     * oTable.AddColumn(1, true);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(1);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("New column was added here.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/AddColumn/
     */
    AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;

    /**
     * Adds the new columns to the current table.
     *
     * @param oCell - The cell after which the new columns will be added. If not specified, the new columns will be
     *   added at the end of the table.
     * @param nCount - Count of columns to be added.
     * @param isBefore - Adds the new columns before (true) or after (false) the specified cell.
     * @since 9.5.0
     */
    AddColumns(nCount: number): ApiTable | null;
    AddColumns(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable | null;

    /**
     * Adds a paragraph or a table or a blockLvl content control using its position in the cell.
     *
     * @param oCell - The cell where the specified element will be added.
     * @param nPos - The position in the cell where the specified element will be added.
     * @param oElement - The document element which will be added at the current position.
     * @since 9.5.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/AddElement/
     */
    AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): boolean;

    /**
     * Adds a new row to the current table.
     *
     * @param oCell - If not specified, a new row will be added to the end of the table.
     * @param isBefore - Adds a new row before or after the specified cell. If no cell is specified,
     *   then this parameter will be ignored.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * oTable.AddRow(1, true);
     * var oRow = oTable.GetRow(1);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("New row was added here.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/AddRow/
     */
    AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;

    /**
     * Adds the new rows to the current table.
     *
     * @param oCell - The cell after which the new rows will be added. If not specified, the new rows will be added at
     *   the end of the table.
     * @param nCount - Count of rows to be added.
     * @param isBefore - Adds the new rows before (true) or after (false) the specified cell.
     * @since 9.5.0
     */
    AddRows(nCount: number): ApiTable | null;
    AddRows(oCell: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable | null;

    /**
     * Creates a text body for the drawing if it does not already exist and returns its full text range.
     *
     * @since 9.5.0
     */
    CreateTextRange(): ApiTextRange | null;

    /**
     * Returns a cell by its position.
     *
     * @param rowIndex - The row index in the current table.
     * @param cellIndex - The cell index in the specified row.
     * @since 9.5.0
     */
    GetCell(rowIndex: number, cellIndex: number): ApiTableCell | null;

    /**
     * Returns the type of the ApiTable object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * var sClassType = oTable.GetClassType();
     * oParagraph.AddText("Class type: " + sClassType);
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/GetClassType/
     */
    GetClassType(): "table";

    /**
     * Returns the width of the specified column (by index) of the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @since 9.4.0
     */
    GetColumnWidth(columnIndex: number): number | null;

    /**
     * Returns the hyperlink from the current drawing object (shape or image).
     *
     * @returns Returns the hyperlink object or null if no hyperlink is set.
     */
    GetHyperlink(): ApiHyperlink | null;

    /**
     * Returns an internal ID of the current table.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /** Returns the drawing parent object. */
    GetParent(): ApiSlide | ApiLayout | ApiMaster | null;

    /**
     * Returns the drawing parent slide layout.
     *
     * @returns return null if parent ins't a slide layout.
     */
    GetParentLayout(): ApiLayout | null;

    /**
     * Returns the drawing parent slide master.
     *
     * @returns return null if parent ins't a slide master.
     */
    GetParentMaster(): ApiMaster | null;

    /**
     * Returns the drawing parent slide.
     *
     * @returns return null if parent ins't a slide.
     */
    GetParentSlide(): ApiSlide | null;

    /**
     * Returns a placeholder from the current drawing object.
     *
     * @returns returns null if placeholder doesn't exist.
     */
    GetPlaceholder(): ApiPlaceholder | null;

    /** Gets the x position of the drawing on the slide. */
    GetPosX(): number;

    /** Gets the y position of the drawing on the slide. */
    GetPosY(): number;

    /**
     * Returns a row by its index.
     *
     * @param nIndex - The row index (position) in the table.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * oTable.AddRow(1, true);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is a sample text in the first row.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/GetRow/
     */
    GetRow(nIndex: number): ApiTableRow;

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
     * Returns an ApiTextRange covering the full text content of the shape, or null if the shape has no
     * text body (use CreateTextRange to create one).
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Checks whether the drawing has an associated text body.
     *
     * @since 9.5.0
     */
    IsTextRange(): boolean;

    /**
     * Merges an array of cells. If merge is successful, it will return merged cell, otherwise "null".
     * **Warning**: The number of cells in any row and the number of rows in the current table may be
     * changed.
     *
     * @param aCells - The array of cells.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell1 = oRow.GetCell(0);
     * var oCell2 = oRow.GetCell(1);
     * oTable.MergeCells([oCell1, oCell2]);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This cell was formed by merging two cells.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/MergeCells/
     */
    MergeCells(aCells: ApiTableCell[]): ApiTableCell;

    /**
     * Removes a table column with the specified cell.
     *
     * @param oCell - The table cell from the column which will be removed.
     * @returns result of deletion
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(1);
     * oTable.RemoveColumn(oCell);
     * oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("The second column was removed.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/RemoveColumn/
     */
    RemoveColumn(oCell: ApiTableCell): boolean;

    /**
     * Removes a table row with the specified cell.
     *
     * @param oCell - The table cell from the row which will be removed.
     * @returns result of deletion
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * oTable.RemoveRow(oCell);
     * oRow = oTable.GetRow(0);
     * oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("The first row was removed.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/RemoveRow/
     */
    RemoveRow(oCell: ApiTableCell): boolean;

    /**
     * Replaces the placeholder by a drawing on the slide.
     *
     * @param drawing - The drawing object that will replace the placeholder.
     */
    ReplacePlaceholder(drawing: Drawing): boolean;

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
     * Specifies the default table cell spacing (the spacing between adjacent cells and the edges of the
     * table).
     *
     * @param nValue - Spacing value measured in twentieths of a point (1/1440 of an inch). `"Null"` means that no
     *   spacing will be applied.
     */
    SetCellSpacing(nValue: number): boolean;

    /**
     * Sets the width of the specified column in the current table.
     *
     * @param columnIndex - The zero-based column index.
     * @param width - The column width measured in English measure units.
     * @returns Returns the actual column width set (in EMU), or null if the column index is invalid.
     * @since 9.4.0
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
     * Sets a hyperlink to the current drawing object (shape or image).
     * Pass null to remove the hyperlink.
     *
     * @param hyperlink - The hyperlink object to be set to the drawing, or null to remove the hyperlink.
     * @returns Returns true if the hyperlink was set or removed successfully.
     */
    SetHyperlink(hyperlink: ApiHyperlink | null): boolean;

    /**
     * Specifies the alignment of the current table with respect to the text margins in the current
     * section.
     *
     * @param sJcType - The alignment type used for the current table placement.
     */
    SetJc(sJcType: "left" | "right" | "center"): boolean;

    /**
     * Sets the specified placeholder to the current drawing object.
     *
     * @param oPlaceholder - Placeholder object.
     * @returns returns false if parameter isn't a placeholder.
     */
    SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;

    /**
     * Sets the x position of the drawing on the slide.
     *
     * @param posX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     */
    SetPosX(posX: number): boolean;

    /**
     * Sets the y position of the drawing on the slide.
     *
     * @param posY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosY(posY: number): boolean;

    /**
     * Sets the position of the drawing on the slide.
     *
     * @param nPosX - The distance from the left side of the slide to the left side of the drawing measured in English
     *   measure units.
     * @param nPosY - The distance from the top side of the slide to the upper side of the drawing measured in English
     *   measure units.
     */
    SetPosition(nPosX: number, nPosY: number): void;

    /**
     * Specifies the shading which shall be applied to the extents of the current table.
     *
     * @param sType - The shading type applied to the contents of the current table. Can be ShdType or ApiFill.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * oTable.SetShd("clear", 255, 111, 61);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/SetShd/
     */
    SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;

    /**
     * Sets the table size.
     *
     * @param width - The table width measured in English measure units.
     * @param height - The table height measured in English measure units.
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
     * Specifies a number of columns which will comprise each table column band for this table style.
     *
     * @param nCount - The number of columns measured in positive integers.
     */
    SetStyleColBandSize(nCount: number): boolean;

    /**
     * Specifies a number of rows which will comprise each table row band for this table style.
     *
     * @param nCount - The number of rows measured in positive integers.
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
     */
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the bottom of the current table.
     *
     * @param sType - The bottom border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

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
     */
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

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
     */
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the left of the current table.
     *
     * @param sType - The left border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the right of the current table.
     *
     * @param sType - The right border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table.
     *
     * @param sType - The top border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch).
     */
    SetTableCellMarginBottom(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and the
     * left
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginLeft(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the right
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginRight(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the top extent of the cell contents and the
     * top border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space above the top extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginTop(nValue: number): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     * @since 9.5.0
     */
    SetTableDescription(sDescr: string): boolean;

    /**
     * Specifies the indentation which will be added before the leading edge of the current table in the
     * document
     * (the left edge in the left-to-right table, and the right edge in the right-to-left table).
     *
     * @param nValue - The indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    SetTableInd(nValue: number): boolean;

    /**
     * Specifies the algorithm which will be used to lay out the contents of the current table within the
     * document.
     *
     * @param sType - The type of the table layout in the document.
     */
    SetTableLayout(sType: "autofit" | "fixed"): boolean;

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
     * @param isFirstColumn - Specifies that the first column conditional formatting shall be applied to the
     *   table.
     * @param isFirstRow - Specifies that the first row conditional formatting shall be applied to the table.
     * @param isLastColumn - Specifies that the last column conditional formatting shall be applied to the
     *   table.
     * @param isLastRow - Specifies that the last row conditional formatting shall be applied to the table.
     * @param isHorBand - Specifies that the horizontal banding conditional formatting shall not be applied
     *   to the table.
     * @param isVerBand - Specifies that the vertical banding conditional formatting shall not be applied to
     *   the table.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * oTable.SetTableLook(true, false, false, false, false, true);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/SetTableLook/
     */
    SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): void;

    /**
     * Sets the table title.
     *
     * @param sTitle - The table title to be set.
     * @since 9.5.0
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
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /**
     * Converts the ApiTable object into the JSON object.
     *
     * @param bWriteTableStyles - Specifies whether to write used table styles to the JSON object (true) or not (false).
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oTable = Api.CreateTable(2, 4);
     * var json = oTable.ToJSON(true);
     * var oTableFromJSON = Api.FromJSON(json);
     * var sType = oTableFromJSON.GetClassType();
     * var oRow = oTableFromJSON.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("Class type = " + sType);
     * oContent.Push(oParagraph);
     * oSlide.AddObject(oTableFromJSON);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTable/Methods/ToJSON/
     */
    ToJSON(bWriteTableStyles?: boolean): object;
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

    /**
     * Returns the type of the ApiTableCell class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * var sClassType = oCell.GetClassType();
     * oParagraph.AddText("Class type: " + sClassType);
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/GetClassType/
     */
    GetClassType(): "tableCell";

    /**
     * Returns the current cell content.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is a sample text in the cell.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/GetContent/
     */
    GetContent(): ApiDocumentContent;

    /**
     * Returns the current cell index.
     *
     * @since 9.5.0
     */
    GetIndex(): number;

    /**
     * Returns an internal id of the current table cell.
     *
     * @since 9.5.0
     */
    GetInternalId(): string;

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
     * Returns an ApiTextRange covering the full text content of the table cell.
     *
     * @since 9.5.0
     */
    GetTextRange(): ApiTextRange | null;

    /**
     * Selects the current table cell in the presentation.
     *
     * @since 9.5.0
     */
    Select(): void;

    /**
     * Sets the background color to the current table cell.
     *
     * @param color - If not passed, the background color will be cleared.
     * @since 9.5.0
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border which shall be displayed at the bottom of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param fSize - The width of the current border.
     * @param oApiFill - The color or pattern used to fill the current border.
     * @since 9.5.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oCell.SetCellBorderBottom(2, oFill);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellBorderBottom/
     */
    SetCellBorderBottom(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the left of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param fSize - The width of the current border.
     * @param oApiFill - The color or pattern used to fill the current border.
     * @since 9.5.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oCell.SetCellBorderLeft(2, oFill);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellBorderLeft/
     */
    SetCellBorderLeft(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the right of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param fSize - The width of the current border.
     * @param oApiFill - The color or pattern used to fill the current border.
     * @since 9.5.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oCell.SetCellBorderRight(2, oFill);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellBorderRight/
     */
    SetCellBorderRight(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;

    /**
     * Sets the border which shall be displayed at the top of the current table cell.
     *
     * @param sType - The cell bottom border style.
     * @param fSize - The width of the current border.
     * @param oApiFill - The color or pattern used to fill the current border.
     * @since 9.5.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oCell.SetCellBorderTop(2, oFill);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellBorderTop/
     */
    SetCellBorderTop(sType: BorderType, fSize: number, oApiFill: ApiFill): boolean;

    /**
     * Specifies an amount of space which shall be left between the bottom extent of the cell contents and
     * the border
     * of a specific individual table cell within a table.
     *
     * @param nValue - If this value is `null`, then default table cell bottom margin shall be used,
     *   otherwise override the table cell bottom margin with specified value for the current cell.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * oCell.SetCellMarginBottom(600);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellMarginBottom/
     */
    SetCellMarginBottom(nValue: number): void;

    /**
     * Specifies an amount of space which shall be left between the left extent of the current cell
     * contents and the
     * left edge border of a specific individual table cell within a table.
     *
     * @param nValue - If this value is `null`, then default table cell left margin shall be used,
     *   otherwise override the table cell left margin with specified value for the current cell.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * oCell.SetCellMarginLeft(720);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellMarginLeft/
     */
    SetCellMarginLeft(nValue: number): void;

    /**
     * Specifies an amount of space which shall be left between the right extent of the current cell
     * contents and the
     * right edge border of a specific individual table cell within a table.
     *
     * @param nValue - If this value is `null`, then default table cell right margin shall be used,
     *   otherwise override the table cell right margin with specified value for the current cell.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * oCell.SetCellMarginRight(600);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellMarginRight/
     */
    SetCellMarginRight(nValue: number): void;

    /**
     * Specifies an amount of space which shall be left between the top extent of the current cell contents
     * and the
     * top edge border of a specific individual table cell within a table.
     *
     * @param nValue - If this value is `null`, then default table cell top margin shall be used,
     *   otherwise override the table cell top margin with specified value for the current cell.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * oCell.SetCellMarginTop(720);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetCellMarginTop/
     */
    SetCellMarginTop(nValue: number): void;

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
     * @param sType - The shading type applied to the contents of the current table. Can be ShdType or ApiFill.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oCell.SetShd(oFill);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetShd/
     */
    SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;

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
     * @param sType - The type of the text flow direction.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * oRow.SetHeight(30 * 36000);
     * var oCell = oRow.GetCell(0);
     * oCell.SetTextDirection("tbrl");
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetTextDirection/
     */
    SetTextDirection(sType: TextFlowDirection): void;

    /**
     * Specifies the vertical alignment for text within the current table cell.
     *
     * @param sType - The type of the vertical alignment.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(1);
     * oRow.SetHeight(30 * 36000);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is just a sample text.");
     * oContent.Push(oParagraph);
     * oCell.SetVerticalAlign("bottom");
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableCell/Methods/SetVerticalAlign/
     */
    SetVerticalAlign(sType: VerticalTextAlign): void;

    /**
     * Specifies the preferred width for this cell.
     *
     * @param sType - The type of the width value.
     * @param nValue - The table width value measured in positive integers.
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;
  }

  /** Class representing the table cell properties. */
  export interface ApiTableCellPr {
  }

  /** Class representing the table properties. */
  export interface ApiTablePr {
    /** Returns a type of the ApiTablePr class. */
    GetClassType(): "tablePr";

    /** Returns the table description. */
    GetTableDescription(): string;

    /** Returns the table title (caption). */
    GetTableTitle(): string;

    /**
     * Specifies the default table cell spacing (the spacing between adjacent cells and the edges of the
     * table).
     *
     * @param nValue - Spacing value measured in twentieths of a point (1/1440 of an inch). `"Null"` means that no
     *   spacing will be applied.
     */
    SetCellSpacing(nValue: number): boolean;

    /**
     * Specifies the alignment of the current table with respect to the text margins in the current
     * section.
     *
     * @param sJcType - The alignment type used for the current table placement.
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
     */
    SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): boolean;

    /**
     * Specifies a number of columns which will comprise each table column band for this table style.
     *
     * @param nCount - The number of columns measured in positive integers.
     */
    SetStyleColBandSize(nCount: number): boolean;

    /**
     * Specifies a number of rows which will comprise each table row band for this table style.
     *
     * @param nCount - The number of rows measured in positive integers.
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
     */
    SetTableBorderAll(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the bottom of the current table.
     *
     * @param sType - The bottom border style.
     * @param nSize - The width of the current bottom border measured in eighths of a point.
     * @param nSpace - The spacing offset in the bottom part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

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
     */
    SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

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
     */
    SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the left of the current table.
     *
     * @param sType - The left border style.
     * @param nSize - The width of the current left border measured in eighths of a point.
     * @param nSpace - The spacing offset in the left part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed on the right of the current table.
     *
     * @param sType - The right border style.
     * @param nSize - The width of the current right border measured in eighths of a point.
     * @param nSpace - The spacing offset in the right part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Sets the border which will be displayed at the top of the current table.
     *
     * @param sType - The top border style.
     * @param nSize - The width of the current top border measured in eighths of a point.
     * @param nSpace - The spacing offset in the top part of the table measured in points used to place this border.
     * @param r - Red color component value.
     * @param g - Green color component value.
     * @param b - Blue color component value.
     */
    SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): boolean;

    /**
     * Specifies an amount of space which will be left between the bottom extent of the cell contents and
     * the border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths of
     *   a point (1/1440 of an inch).
     */
    SetTableCellMarginBottom(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the left extent of the cell contents and the
     * left
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginLeft(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the right extent of the cell contents and
     * the right
     * border of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginRight(nValue: number): boolean;

    /**
     * Specifies an amount of space which will be left between the top extent of the cell contents and the
     * top border
     * of all table cells within the parent table (or table row).
     *
     * @param nValue - The value for the amount of space above the top extent of the cell measured in twentieths of a
     *   point (1/1440 of an inch).
     */
    SetTableCellMarginTop(nValue: number): boolean;

    /**
     * Sets the table description.
     *
     * @param sDescr - The table description to be set.
     */
    SetTableDescription(sDescr: string): boolean;

    /**
     * Specifies the indentation which will be added before the leading edge of the current table in the
     * document
     * (the left edge in the left-to-right table, and the right edge in the right-to-left table).
     *
     * @param nValue - The indentation value measured in twentieths of a point (1/1440 of an inch).
     */
    SetTableInd(nValue: number): boolean;

    /**
     * Specifies the algorithm which will be used to lay out the contents of the current table within the
     * document.
     *
     * @param sType - The type of the table layout in the document.
     */
    SetTableLayout(sType: "autofit" | "fixed"): boolean;

    /**
     * Sets the table title (caption).
     *
     * @param sTitle - The table title to be set.
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
     */
    SetWidth(sType: TableWidth, nValue?: number): boolean;

    /** Converts the ApiTablePr object into the JSON object. */
    ToJSON(): object;
  }

  /** Class representing a table row. */
  export interface ApiTableRow extends ApiTableRowPr {
    /**
     * Returns a cell by its position in the current row.
     *
     * @param nPos - The cell position in the table row.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("This is a sample text in the cell of the first row.");
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableRow/Methods/GetCell/
     */
    GetCell(nPos: number): ApiTableCell;

    /**
     * Returns a number of cells in the current row.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var nCellsCount = oRow.GetCellsCount();
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.AddText("The number of cells in the row: " + nCellsCount);
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableRow/Methods/GetCellsCount/
     */
    GetCellsCount(): number;

    /**
     * Returns the type of the ApiTableRow class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * var oCell = oRow.GetCell(0);
     * var oContent = oCell.GetContent();
     * var oParagraph = Api.CreateParagraph();
     * var sClassType = oRow.GetClassType();
     * oParagraph.AddText("Class type: " + sClassType);
     * oContent.Push(oParagraph);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableRow/Methods/GetClassType/
     */
    GetClassType(): "tableRow";

    /**
     * Returns the height of the current table row.
     *
     * @since 9.4.0
     */
    GetHeight(): number | null;

    /**
     * Returns the next row if exists.
     *
     * @returns returns null if row is last.
     */
    GetNext(): ApiTableRow | null;

    /**
     * Returns the parent table of the current row.
     *
     * @returns returns null if parent table doesn't exist.
     */
    GetParentTable(): ApiTable | null;

    /**
     * Returns the previous row if exists.
     *
     * @returns returns null if row is first.
     */
    GetPrevious(): ApiTableRow | null;

    /**
     * Sets the height to the current table row.
     *
     * @param nValue - The row height in English measure units.
     * @since 5.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oTable = Api.CreateTable(2, 4);
     * var oRow = oTable.GetRow(0);
     * oRow.SetHeight(30 * 36000);
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oTable);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTableRow/Methods/SetHeight/
     */
    SetHeight(nValue?: number): number | null;
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
    /**
     * Sets the table properties to the current table style properties.
     *
     * @param oTablePr - The table properties to apply.
     * @since 9.5.0
     */
    SetTablePr(oTablePr: ApiTablePr): boolean;
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
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetBold(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bBold = oTextPr.GetBold();
     * oParagraph.AddText("Bold property: " + bBold);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetBold/
     */
    GetBold(): boolean;

    /**
     * Specifies whether the text with the current text properties are capitalized.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetCaps(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bCaps = oTextPr.GetCaps();
     * oParagraph.AddText("Property of the capitalized letters: " + bCaps);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetCaps/
     */
    GetCaps(): boolean;

    /**
     * Returns a type of the ApiTextPr class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oParagraph.SetJc("left");
     * var sClassType = oTextPr.GetClassType();
     * oRun.AddText("Class Type = " + sClassType);
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetClassType/
     */
    GetClassType(): "textPr";

    /**
     * Gets the double strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetDoubleStrikeout(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bDoubleStrikeout = oTextPr.GetDoubleStrikeout();
     * oParagraph.AddText("Double strikeout property: " + bDoubleStrikeout);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetDoubleStrikeout/
     */
    GetDoubleStrikeout(): boolean;

    /**
     * Gets the text color from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetFill(oFill);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oFill = oTextPr.GetFill();
     * var sType = oFill.GetClassType();
     * oParagraph.AddText("Text color type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFill/
     */
    GetFill(): ApiFill;

    /**
     * Gets the font family from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontFamily("Arial");
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var sFontFamily = oTextPr.GetFontFamily();
     * oParagraph.AddText("Font family: " + sFontFamily);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFontFamily/
     */
    GetFontFamily(): string;

    /**
     * Gets the font size from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(60);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var nFontSize = oTextPr.GetFontSize();
     * oParagraph.AddText("Font size: " + nFontSize);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetFontSize/
     */
    GetFontSize(): hps;

    /**
     * Gets the highlight property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetHighlight("lightGray");
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var sHighlight = oTextPr.GetHighlight();
     * oParagraph.AddText("Highlight property: " + sHighlight);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetHighlight/
     */
    GetHighlight(): string;

    /**
     * Gets the italic property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetItalic(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bItalic = oTextPr.GetItalic();
     * oParagraph.AddText("Italic property: " + bItalic);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetItalic/
     */
    GetItalic(): boolean;

    /**
     * Gets the text outline from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oStroke = Api.CreateStroke(0.2 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oTextPr.SetOutLine(oStroke);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oStroke = oTextPr.GetOutLine();
     * var sType = oStroke.GetClassType();
     * oParagraph.AddText("Text outline type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetOutLine/
     */
    GetOutLine(): ApiStroke;

    /**
     * Specifies whether the text with the current text properties are displayed capitalized two points
     * smaller than the actual font size.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetSmallCaps(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bSmallCaps = oTextPr.GetSmallCaps();
     * oParagraph.AddText("Property of the small capitalized letters: " + bSmallCaps);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetSmallCaps/
     */
    GetSmallCaps(): boolean;

    /**
     * Gets the text spacing from the current text properties measured in twentieths of a point.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetSpacing(80);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var nSpacing = oTextPr.GetSpacing();
     * oParagraph.AddText("Text spacing: " + nSpacing);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetSpacing/
     */
    GetSpacing(): number;

    /**
     * Gets the strikeout property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetStrikeout(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bStrikeout = oTextPr.GetStrikeout();
     * oParagraph.AddText("Strikeout property: " + bStrikeout);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetStrikeout/
     */
    GetStrikeout(): boolean;

    /**
     * Gets the text fill from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetTextFill(oFill);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * oFill = oTextPr.GetTextFill();
     * var sType = oFill.GetClassType();
     * oParagraph.AddText("Text fill type: " + sType);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetTextFill/
     */
    GetTextFill(): ApiFill;

    /**
     * Gets the underline property from the current text properties.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * oRun.AddText("This is just a sample text. ");
     * oRun.AddText("The text properties are changed and the style is added to the paragraph. ");
     * oRun.AddLineBreak();
     * oParagraph.AddElement(oRun);
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetUnderline(true);
     * oSlide.AddObject(oShape);
     * oParagraph = Api.CreateParagraph();
     * var bUnderline = oTextPr.GetUnderline();
     * oParagraph.AddText("Underline property: " + bUnderline);
     * oDocContent.Push(oParagraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/GetUnderline/
     */
    GetUnderline(): boolean;

    /**
     * Sets the bold property to the text character.
     *
     * @param isBold - Specifies that the contents of the run are displayed bold.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetBold(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font weight set to bold using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetBold/
     */
    SetBold(isBold: boolean): ApiTextPr;

    /**
     * Specifies that any lowercase characters in the text run are formatted for display only as their
     * capital letter character equivalents.
     *
     * @param isCaps - Specifies that the contents of the current run are displayed capitalized.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetCaps(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape set to capital letters using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetCaps/
     */
    SetCaps(isCaps: boolean): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with two horizontal lines through each
     * character displayed on the line.
     *
     * @param isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetDoubleStrikeout(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape struck out with two lines using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetDoubleStrikeout/
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text color to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetFill(oFill);
     * oRun.AddText("This is a text run with the font color set to black using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetFill/
     */
    SetFill(oApiFill: ApiFill): ApiTextPr;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text run.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetFontFamily("Comic Sans MS");
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font family set to 'Comic Sans MS' using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetFontFamily/
     */
    SetFontFamily(sFontFamily: string): ApiTextPr;

    /**
     * Sets the font size to the characters of the current text run.
     *
     * @param nSize - The text size value measured in half-points (1/144 of an inch).
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(30);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font size set to 15 points using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetFontSize/
     */
    SetFontSize(nSize: hps): ApiTextPr;

    /**
     * Specifies a highlighting color which is added to the text properties and applied as a background to
     * the contents of the current run/range/paragraph.
     *
     * @param sColor - Available highlight color.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetHighlight("lightGray");
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the text highlighted with light gray color using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetHighlight/
     */
    SetHighlight(sColor: highlightColor): ApiTextPr;

    /**
     * Sets the italic property to the text character.
     *
     * @param isItalic - Specifies that the contents of the current run are displayed italicized.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetItalic(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font set to italicized letters using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetItalic/
     */
    SetItalic(isItalic: boolean): ApiTextPr;

    /**
     * Sets the text outline to the current text run.
     *
     * @param oStroke - The stroke used to create the text outline.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oStroke = Api.CreateStroke(0.2 * 36000, Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51)));
     * oTextPr.SetOutLine(oStroke);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a text run with the black text outline set using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetOutLine/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetSmallCaps(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the font set to small capitalized letters using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetSmallCaps/
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextPr;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetSpacing(80);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the spacing set to 4 points (80 twentieths of a point) using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetSpacing/
     */
    SetSpacing(nSpacing: number): ApiTextPr;

    /**
     * Specifies that the contents of the run are displayed with a single horizontal line through the
     * center of the line.
     *
     * @param isStrikeout - Specifies that the contents of the current run are displayed struck through.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetStrikeout(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a struck out text inside the shape.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetStrikeout/
     */
    SetStrikeout(isStrikeout: boolean): ApiTextPr;

    /**
     * Sets the text fill to the current text run.
     *
     * @param oApiFill - The color or pattern used to fill the text color.
     * @returns this text properties.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oTextPr.SetTextFill(oFill);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a sample text inside the shape with the black text fill set using the text properties.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetTextFill/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetUnderline(true);
     * oParagraph.SetJc("left");
     * oRun.AddText("This is an underlined text inside the shape.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetUnderline/
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
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * var oRun = Api.CreateRun();
     * var oTextPr = oRun.GetTextPr();
     * oTextPr.SetFontSize(50);
     * oTextPr.SetVertAlign("superscript");
     * oParagraph.SetJc("left");
     * oRun.AddText("This is a text inside the shape with vertical alignment set to 'superscript'.");
     * oParagraph.AddElement(oRun);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTextPr/Methods/SetVertAlign/
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  }

  /** Class representing a text range within a presentation shape's text frame. */
  export interface ApiTextRange {
    /**
     * Adds a text to the specified position. The current range is expanded to include the added text.
     *
     * @param text - The text that will be added.
     * @param position - The position where the text will be added ("before" or "after" the range specified).
     * @returns returns true if the text was successfully added.
     * @since 9.5.0
     */
    AddText(text: string, position?: "after" | "before"): boolean;

    /**
     * Deletes the contents of the current text range.
     *
     * @returns returns false if the range is empty.
     * @since 9.5.0
     */
    Delete(): boolean;

    /**
     * Returns a new range that spans both this range and the given range. The current range is not
     * changed.
     *
     * @since 9.5.0
     */
    ExpandTo(oRange: ApiTextRange): ApiTextRange | null;

    /**
     * Finds the first occurrence of the given text within this range and returns it as a new ApiTextRange.
     * Returns null if the text is not found.
     *
     * @param sFindWhat - Text to search for.
     * @param nAfter - 1-based position within this range to start searching from.
     * @param bMatchCase - Case-sensitive search.
     * @param bWholeWords - Match whole words only.
     * @since 9.5.0
     */
    Find(sFindWhat: string, nAfter?: number, bMatchCase?: boolean, bWholeWords?: boolean): ApiTextRange | null;

    /**
     * Returns all Paragraph objects within this range.
     *
     * @since 9.5.0
     */
    GetAllParagraphs(): ApiParagraph[];

    /**
     * Returns the class type identifier.
     *
     * @since 9.5.0
     */
    GetClassType(): "textRange";

    /**
     * Returns the end position of the current range.
     *
     * @since 9.5.0
     */
    GetEndPos(): number;

    /**
     * Returns the paragraph at the given index within this range.
     * Returns null if the index is out of bounds.
     *
     * @since 9.5.0
     */
    GetParagraph(nIndex: number): ApiParagraph | null;

    /**
     * Returns a new ApiTextRange that represents a sub-range of the current range.
     *
     * @param nStart - Start offset (0-based) relative to the beginning of this range.
     * @param nEnd - End offset relative to the beginning of this range. -1 means the end of this range.
     * @since 9.5.0
     */
    GetRange(nStart?: number, nEnd?: number): ApiTextRange | null;

    /**
     * Returns the start position of the current range.
     *
     * @since 9.5.0
     */
    GetStartPos(): number;

    /**
     * Returns the text content of the range. Paragraph breaks are represented as "\r".
     *
     * @param options - Options for formatting the returned text.
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
     * @since 9.5.0
     */
    GetText(options?: object, options_Math?: boolean, options_NewLineSeparator?: string, options_TableCellSeparator?: string, options_TableRowSeparator?: string, options_ParaSeparator?: string, options_TabSymbol?: string): string;

    /**
     * Returns the merged text properties of the entire range.
     *
     * @since 9.5.0
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns a new range that is the intersection of this range and the given range. The current range is
     * not changed.
     *
     * @since 9.5.0
     */
    IntersectWith(oRange: ApiTextRange): ApiTextRange | null;

    /**
     * Moves a cursor to the specified position within the current range.
     *
     * @param nPos - The desired cursor position.
     * @since 9.5.0
     */
    MoveCursorToPos(nPos?: number): boolean;

    /**
     * Replaces all occurrences of the specified text within this range.
     *
     * @param sFindWhat - Text to search for.
     * @param sReplaceWith - Replacement text.
     * @param bMatchCase - Case-sensitive search.
     * @param bWholeWords - Match whole words only.
     * @returns this
     * @since 9.5.0
     */
    Replace(sFindWhat: string, sReplaceWith: string, bMatchCase?: boolean, bWholeWords?: boolean): ApiTextRange;

    /**
     * Selects the text range in the editor.
     *
     * @since 9.5.0
     */
    Select(): boolean;

    /**
     * Sets bold formatting for the contents of the current text range.
     *
     * @since 9.5.0
     */
    SetBold(isBold: boolean): ApiTextRange;

    /**
     * Specifies that any lowercase characters in the current text Range are formatted for display only as
     * their capital letter character equivalents.
     *
     * @param isCaps - Specifies if the Range contents are displayed capitalized or not.
     * @since 9.5.0
     */
    SetCaps(isCaps: boolean): ApiTextRange;

    /**
     * Sets the text color of the current range.
     *
     * @since 9.5.0
     */
    SetColor(color: ApiColor): ApiTextRange;

    /**
     * Specifies that the contents of the current Range are displayed with two horizontal lines through
     * each character displayed on the line.
     *
     * @since 9.5.0
     */
    SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextRange;

    /**
     * Sets the end position of the current range.
     *
     * @param nPos - End position.
     * @since 9.5.0
     */
    SetEndPos(nPos: number): boolean;

    /**
     * Sets all 4 font slots with the specified font family.
     *
     * @param sFontFamily - The font family or families used for the current text Range.
     * @since 9.5.0
     */
    SetFontFamily(sFontFamily: string): ApiTextRange | null;

    /**
     * Sets the font size to the characters of the current text Range.
     *
     * @param FontSize - The text size value measured in half-points (1/144 of an inch).
     * @since 9.5.0
     */
    SetFontSize(FontSize: hps): ApiTextRange | null;

    /**
     * Specifies a highlighting color which is applied as a background to the contents of the current
     * Range.
     *
     * @since 9.5.0
     */
    SetHighlight(sColor: highlightColor): ApiTextRange | null;

    /**
     * Sets the italic property to the text character.
     *
     * @since 9.5.0
     */
    SetItalic(isItalic: boolean): ApiTextRange;

    /**
     * Specifies the amount by which text is raised or lowered for the current Range in relation to the
     * default
     * baseline of the surrounding non-positioned text.
     *
     * @param nPosition - Specifies a positive (raised text) or negative (lowered text) measurement in half-points (1/144
     *   of an inch).
     * @since 9.5.0
     */
    SetPosition(nPosition: hps): ApiTextRange | null;

    /**
     * Specifies that all the lowercase letter characters in the current text Range are formatted for
     * display only as their capital
     * letter character equivalents which are two points smaller than the actual font size specified for
     * this text.
     *
     * @param isSmallCaps - Specifies if the contents of the current Range are displayed capitalized two points smaller or
     *   not.
     * @since 9.5.0
     */
    SetSmallCaps(isSmallCaps: boolean): ApiTextRange;

    /**
     * Sets the text spacing measured in twentieths of a point.
     *
     * @param nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
     * @since 9.5.0
     */
    SetSpacing(nSpacing: number): ApiTextRange | null;

    /**
     * Sets the start position of the current range.
     *
     * @param nPos - Start position.
     * @since 9.5.0
     */
    SetStartPos(nPos: number): boolean;

    /**
     * Specifies that the contents of the current Range are displayed with a single horizontal line through
     * the range center.
     *
     * @since 9.5.0
     */
    SetStrikeout(isStrikeout: boolean): ApiTextRange;

    /**
     * Replaces all text content with the given string. Use "\r" to separate paragraphs.
     *
     * @param sText - New text value.
     * @returns this
     * @since 9.5.0
     */
    SetText(sText: string): ApiTextRange;

    /**
     * Sets the text properties to the current text range.
     *
     * @param oTextPr - The text properties that will be applied to the current range.
     * @since 9.5.0
     */
    SetTextPr(oTextPr: ApiTextPr): ApiTextRange | null;

    /**
     * Specifies that the contents of the current Range are displayed along with a line appearing directly
     * below the character
     * (less than all the spacing above and below the characters on the line).
     *
     * @param isUnderline - Specifies if the contents of the current Range are displayed underlined or not.
     * @since 9.5.0
     */
    SetUnderline(isUnderline: boolean): ApiTextRange;

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
     * @since 9.5.0
     */
    SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextRange | null;
  }

  /** Class representing a presentation theme. */
  export interface ApiTheme {
    /**
     * Returns the type of the ApiTheme class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var sType = oTheme.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/GetClassType/
     */
    GetClassType(): "theme";

    /**
     * Returns the color scheme of the current theme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oClrScheme = oTheme.GetColorScheme();
     * oClrScheme.ChangeColor(0, Api.CreateRGBColor(255, 111, 61));
     * oClrScheme.ChangeColor(1, Api.CreateRGBColor(51, 51, 51));
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/GetColorScheme/
     */
    GetColorScheme(): ApiThemeColorScheme;

    /**
     * Returns the font scheme of the current theme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFontScheme = oTheme.GetFontScheme();
     * var sType = oFontScheme.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/GetFontScheme/
     */
    GetFontScheme(): ApiThemeFontScheme;

    /**
     * Returns the format scheme of the current theme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * var sType = oFormatScheme.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/GetFormatScheme/
     */
    GetFormatScheme(): ApiThemeFormatScheme;

    /**
     * Returns the slide master of the current theme.
     *
     * @returns returns null if slide master doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oTheme = oSlide.GetTheme();
     * var oMaster = oTheme.GetMaster();
     * var sType = oMaster.GetClassType();
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/GetMaster/
     */
    GetMaster(): ApiMaster | null;

    /**
     * Sets the color scheme to the current presentation theme.
     *
     * @param oApiColorScheme - Theme color scheme.
     * @returns return false if color scheme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetColorScheme(oClrScheme);
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/SetColorScheme/
     */
    SetColorScheme(oApiColorScheme: ApiThemeColorScheme): boolean;

    /**
     * Sets the font scheme to the current presentation theme.
     *
     * @param oApiFontScheme - Theme font scheme.
     * @returns return false if font scheme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetFontScheme(oFontScheme);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * var oDocContent = oShape.GetDocContent();
     * oDocContent.RemoveAllElements();
     * var oParagraph = Api.CreateParagraph();
     * oParagraph.SetJc("left");
     * oParagraph.AddText("This is an example of a paragraph with a new font scheme set.");
     * oDocContent.Push(oParagraph);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/SetFontScheme/
     */
    SetFontScheme(oApiFontScheme: ApiThemeFontScheme): boolean;

    /**
     * Sets the format scheme to the current presentation theme.
     *
     * @param oApiFormatScheme - Theme format scheme.
     * @returns return false if format scheme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetFormatScheme(oFormatScheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiTheme/Methods/SetFormatScheme/
     */
    SetFormatScheme(oApiFormatScheme: ApiThemeFormatScheme): boolean;
  }

  /** Class representing a theme color scheme. */
  export interface ApiThemeColorScheme {
    /**
     * Changes a color in the theme color scheme.
     *
     * @param nPos - Color position in the color scheme which will be changed.
     * @param oColor - New color of the theme color scheme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oClrScheme = oTheme.GetColorScheme();
     * oClrScheme.ChangeColor(0, Api.CreateRGBColor(255, 111, 61));
     * oClrScheme.ChangeColor(1, Api.CreateRGBColor(51, 51, 51));
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeColorScheme/Methods/ChangeColor/
     */
    ChangeColor(nPos: number, oColor: ApiUniColor | ApiRGBColor): boolean;

    /**
     * Creates a copy of the current theme color scheme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme1 = oMaster.GetTheme();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * oTheme1.SetColorScheme(oClrScheme);
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide1.AddObject(oChart);
     * var oCopyClrScheme = oClrScheme.Copy();
     * oSlide1.ApplyTheme(oTheme1);
     * var oSlide2 = Api.CreateSlide();
     * oSlide2.RemoveAllObjects();
     * oPresentation.AddSlide(oSlide2);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme2 = Api.CreateTheme("New theme", oMaster, oCopyClrScheme, oFormatScheme, oFontScheme);
     * oSlide2.ApplyTheme(oTheme2);
     * oSlide2.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeColorScheme/Methods/Copy/
     */
    Copy(): ApiThemeColorScheme;

    /**
     * Returns the type of the ApiThemeColorScheme class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * oTheme.SetColorScheme(oClrScheme);
     * var sType = oClrScheme.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeColorScheme/Methods/GetClassType/
     */
    GetClassType(): "themeColorScheme";

    /**
     * Sets a name to the current theme color scheme.
     *
     * @param sName - Theme color scheme name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * oTheme.SetColorScheme(oClrScheme);
     * oClrScheme.SetSchemeName("New color scheme name");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New name was set to the theme color scheme.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeColorScheme/Methods/SetSchemeName/
     */
    SetSchemeName(sName: string): boolean;

    /**
     * Converts the ApiThemeColorScheme object into the JSON object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var json = oClrScheme.ToJSON();
     * var oClrSchemeFromJSON = Api.FromJSON(json);
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetColorScheme(oClrSchemeFromJSON);
     * var sType = oClrSchemeFromJSON.GetClassType();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Class type = " + sType, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeColorScheme/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /** Class representing a theme font scheme. */
  export interface ApiThemeFontScheme {
    /**
     * Creates a copy of the current theme font scheme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * oSlide1.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme1 = oMaster.GetTheme();
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oTheme1.SetFontScheme(oFontScheme);
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New font scheme was set to this slide.");
     * oSlide1.AddObject(oShape);
     * var oCopyFontScheme = oFontScheme.Copy();
     * oSlide1.ApplyTheme(oTheme1);
     * var oSlide2 = Api.CreateSlide();
     * oSlide2.RemoveAllObjects();
     * oPresentation.AddSlide(oSlide2);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oTheme2 = Api.CreateTheme("New theme", oMaster, oClrScheme, oFormatScheme, oCopyFontScheme);
     * oSlide2.ApplyTheme(oTheme2);
     * oFill = Api.CreateSolidFill(Api.CreateRGBColor(51, 51, 51));
     * oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * oDocContent = oShape.GetDocContent();
     * oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New font scheme was set to this slide.");
     * oSlide2.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFontScheme/Methods/Copy/
     */
    Copy(): ApiThemeFontScheme;

    /**
     * Returns the type of the ApiThemeFontScheme class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster();
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var sType = oFontScheme.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFontScheme/Methods/GetClassType/
     */
    GetClassType(): "themeFontScheme";

    /**
     * Sets the fonts to the current theme font scheme.
     *
     * @param mjLatin - The major theme font applied to the latin text.
     * @param mjEa - The major theme font applied to the east asian text.
     * @param mjCs - The major theme font applied to the complex script text.
     * @param mnLatin - The minor theme font applied to the latin text.
     * @param mnEa - The minor theme font applied to the east asian text.
     * @param mnCs - The minor theme font applied to the complex script text.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFontScheme = oTheme.GetFontScheme();
     * oFontScheme.SetFonts("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New font scheme was set to this slide.");
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFontScheme/Methods/SetFonts/
     */
    SetFonts(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string): void;

    /**
     * Sets a name to the current theme font scheme.
     *
     * @param sName - Theme font scheme name.
     * @returns returns false if font scheme doesn't exist.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFontScheme = oTheme.GetFontScheme();
     * oFontScheme.SetFonts("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oFontScheme.SetSchemeName("New font scheme name");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New name was set to the theme font scheme.");
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFontScheme/Methods/SetSchemeName/
     */
    SetSchemeName(sName: string): boolean;

    /**
     * Converts the ApiThemeFontScheme object into the JSON object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oThemeMaster = oMaster.GetTheme();
     * var oFontScheme = oThemeMaster.GetFontScheme();
     * oFontScheme.SetFonts("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oFontScheme.SetSchemeName("New font scheme name");
     * var json = oFontScheme.ToJSON();
     * var oFontSchemeFromJSON = Api.FromJSON(json);
     * var oTheme = oSlide.GetTheme();
     * oTheme.SetFontScheme(oFontSchemeFromJSON);
     * var sType = oFontSchemeFromJSON.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFontScheme/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /** Class representing a theme format scheme. */
  export interface ApiThemeFormatScheme {
    /**
     * Sets the background fill styles to the current theme format scheme.
     *
     * @param arrBgFill - The array of background fill styles must contains 3 elements - subtle, moderate and intense
     *   fills.
     *   If an array is empty or NoFill elements are in the array, it will be filled with the
     *   Api.CreateNoFill() elements.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oSlide.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oFormatScheme.ChangeBgFillStyles([oBgFill1, oBgFill2, oBgFill3]);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oTheme = Api.CreateTheme("Theme 1", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/ChangeBgFillStyles/
     */
    ChangeBgFillStyles(arrBgFill: ApiFill[]): void;

    /**
     * Sets the fill styles to the current theme format scheme.
     *
     * @param arrFill - The array of fill styles must contain 3 elements - subtle, moderate and intense fills.
     *   If an array is empty or NoFill elements are in the array, it will be filled with the
     *   Api.CreateNoFill() elements.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oSlide.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * oFormatScheme.ChangeFillStyles([oFill1, oFill2, oFill3]);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oTheme = Api.CreateTheme("Theme 1", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Financial Overview", 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/ChangeFillStyles/
     */
    ChangeFillStyles(arrFill: ApiFill[]): void;

    /**
     * Sets the line styles to the current theme format scheme.
     *
     * @param arrLine - The array of line styles must contain 3 elements - subtle, moderate and intense fills.
     *   If an array is empty or ApiStroke elements are with no fill, it will be filled with the
     *   Api.CreateStroke(0, Api.CreateNoFill()) elements.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oSlide.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(3 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(3 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(3 * 36000, oFill3);
     * oFormatScheme.ChangeLineStyles([oStroke1, oStroke2, oFill3]);
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * oTheme = Api.CreateTheme("Theme 1", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme);
     * oSlide.RemoveAllObjects();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Create a shape by yourself to see the stroke style set to this presentation.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/ChangeLineStyles/
     */
    ChangeLineStyles(arrLine: ApiStroke[]): void;

    /**
     * Creates a copy of the current theme format scheme.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oMaster = oPresentation.GetMaster(0);
     * var oSlide1 = oPresentation.GetSlideByIndex(0);
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var oClrScheme = Api.CreateThemeColorScheme([Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51), Api.CreateRGBColor(230, 179, 117), Api.CreateRGBColor(235, 235, 235), Api.CreateRGBColor(163, 21, 21),
     * 	Api.CreateRGBColor(128, 43, 43), Api.CreateRGBColor(0, 0, 0), Api.CreateRGBColor(128, 128, 128), Api.CreateRGBColor(176, 196, 222), Api.CreateRGBColor(65, 105, 225), Api.CreateRGBColor(255, 255, 255), Api.CreateRGBColor(255, 213, 191)], "New color scheme");
     * var oFontScheme = Api.CreateThemeFontScheme("Arial", "Noto Sans Simplified Chinese", "Arabic", "Times New Roman", "Noto Serif Simplified Chinese", "Arabic", "New font scheme");
     * var oTheme1 = Api.CreateTheme("Theme 1", oMaster, oClrScheme, oFormatScheme, oFontScheme);
     * oPresentation.ApplyTheme(oTheme1);
     * var oSlide2 = Api.CreateSlide();
     * oPresentation.AddSlide(oSlide2);
     * oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 218, 185), 0);
     * oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(238, 203, 173), 100000);
     * var oNewBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oNewBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(238, 203, 173), Api.CreateRGBColor(51, 51, 51));
     * var oNewBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(238, 203, 173));
     * var oCopyFormatScheme = oFormatScheme.Copy();
     * oCopyFormatScheme.ChangeBgFillStyles([oNewBgFill1, oNewBgFill2, oNewBgFill3]);
     * var oTheme2 = Api.CreateTheme("Theme 2", oMaster, oClrScheme, oCopyFormatScheme, oFontScheme);
     * oSlide2.ApplyTheme(oTheme2);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/Copy/
     */
    Copy(): ApiThemeFormatScheme;

    /**
     * Returns the type of the ApiThemeFormatScheme class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * var sType = oFormatScheme.GetClassType();
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class type = " + sType);
     * oSlide.RemoveAllObjects();
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/GetClassType/
     */
    GetClassType(): "themeFormatScheme";

    /**
     * Sets a name to the current theme format scheme.
     *
     * @param sName - Theme format scheme name.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oMaster = oPresentation.GetMaster(0);
     * var oTheme = oMaster.GetTheme();
     * var oFormatScheme = oTheme.GetFormatScheme();
     * oFormatScheme.SetSchemeName("New format scheme name");
     * var oFill = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("New name was set to the theme format scheme.");
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/SetSchemeName/
     */
    SetSchemeName(sName: string): boolean;

    /**
     * Converts the ApiThemeFormatScheme object into the JSON object.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oTheme = oSlide.GetTheme();
     * var oGs1 = Api.CreateGradientStop(Api.CreateRGBColor(255, 213, 191), 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oBgFill1 = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke1 = Api.CreateStroke(1 * 36000, oFill1);
     * var oFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oBgFill2 = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(255, 111, 61), Api.CreateRGBColor(51, 51, 51));
     * var oStroke2 = Api.CreateStroke(1 * 36000, oFill2);
     * var oFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oBgFill3 = Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61));
     * var oStroke3 = Api.CreateStroke(1 * 36000, oFill3);
     * var oFormatScheme = Api.CreateThemeFormatScheme([oFill1, oFill2, oFill3], [oBgFill1, oBgFill2, oBgFill3], [oStroke1, oStroke2, oStroke3], "New format scheme");
     * var json = oFormatScheme.ToJSON();
     * var oFormatSchemeFromJSON = Api.FromJSON(json);
     * oTheme.SetFormatScheme(oFormatSchemeFromJSON);
     * var sType = oFormatSchemeFromJSON.GetClassType();
     * var oChart = Api.CreateChart("bar3D", [
     * 	[200, 240, 280],
     * 	[250, 260, 280]
     * ], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);
     * oChart.SetVerAxisTitle("USD In Hundred Thousands", 10);
     * oChart.SetHorAxisTitle("Year", 11);
     * oChart.SetLegendPos("bottom");
     * oChart.SetShowDataLabels(false, false, true, false);
     * oChart.SetTitle("Class type = " + sType, 20);
     * oChart.SetSize(300 * 36000, 130 * 36000);
     * oChart.SetPosition(608400, 1267200);
     * oSlide.AddObject(oChart);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiThemeFormatScheme/Methods/ToJSON/
     */
    ToJSON(): object;
  }

  /** Class representing animation timeline for a slide. */
  export interface ApiTimeLine {
    /**
     * Creates an interactive animation sequence triggered by clicking on a specified object.
     *
     * @param drawing - The drawing object that triggers the sequence when clicked.
     * @returns The interactive animation sequence or null if creation failed.
     * @since 9.3.0
     */
    AddInteractiveSequence(drawing: ApiDrawing): ApiAnimationSequence | null;

    /**
     * Returns all animation effects for the slide.
     *
     * @returns Array of all animation effects.
     * @since 9.3.0
     */
    GetAllEffects(): ApiAnimationEffect[];

    /**
     * Returns the type of the ApiTimeLine class.
     *
     * @since 9.3.0
     */
    GetClassType(): "timeLine";

    /**
     * Returns all interactive animation sequences for the slide.
     *
     * @returns Array of interactive animation sequences.
     * @since 9.3.0
     */
    GetInteractiveSequences(): ApiAnimationSequence[];

    /**
     * Returns the main animation sequence for the slide.
     *
     * @returns The main animation sequence.
     * @since 9.3.0
     */
    GetMainSequence(): ApiAnimationSequence;
  }

  /** Class representing a base class for color types. */
  export interface ApiUniColor {
    /**
     * Returns a type of the ApiUniColor class.
     *
     * @example
     * ```js
     * var oPresentation = Api.GetPresentation();
     * var oSlide = oPresentation.GetSlideByIndex(0);
     * oSlide.RemoveAllObjects();
     * var oPresetColor = Api.CreatePresetColor("lightYellow");
     * var oGs1 = Api.CreateGradientStop(oPresetColor, 0);
     * var oGs2 = Api.CreateGradientStop(Api.CreateRGBColor(255, 111, 61), 100000);
     * var oFill = Api.CreateRadialGradientFill([oGs1, oGs2]);
     * var oStroke = Api.CreateStroke(0, Api.CreateNoFill());
     * var oShape = Api.CreateShape("flowChartMagneticTape", 300 * 36000, 130 * 36000, oFill, oStroke);
     * oShape.SetPosition(608400, 1267200);
     * oShape.SetSize(300 * 36000, 130 * 36000);
     * var oDocContent = oShape.GetDocContent();
     * var sClassType = oPresetColor.GetClassType();
     * var oParagraph = oDocContent.GetElement(0);
     * oParagraph.SetJc("left");
     * oParagraph.AddText("Class Type = " + sClassType);
     * oSlide.AddObject(oShape);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiUniColor/Methods/GetClassType/
     */
    GetClassType(): "uniColor";
  }

  /** Class representing an unsupported element. */
  export interface ApiUnsupported {
    /**
     * Returns a type of the ApiUnsupported class.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/presentation-api/ApiUnsupported/Methods/GetClassType/
     */
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
    /**
     * The function called after a slide has been changed and displayed during a slide show presentation.
     * Fires before the slide content is actually displayed.
     */
    onSlideShowNextSlide: [];
    /**
     * The function called when slide changes during a slide show presentation. Provides information about
     * both the current and previous slide.
     */
    onSlideShowSlideChanged: [data: { slideIndex: number; previousSlideIndex: number }];
  };

  export type EditorEventName = keyof EditorEventArgs;

}
