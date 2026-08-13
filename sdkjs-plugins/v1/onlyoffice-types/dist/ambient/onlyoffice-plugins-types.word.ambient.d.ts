// AUTO-GENERATED - do not edit by hand. Run `npm run generate-ambient` to regenerate.
// A flattened, non-module ambient bundle of @onlyoffice/plugins-types for tools (e.g. a Monaco
// editor's addExtraLib()) that want one global-scope .d.ts blob instead of an installable,
// module-based npm package. Source of truth is still the modular package under src/ - this is a
// build artifact, not something to hand-edit.

// ---- src/generated/word.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: word

declare namespace Word {
  /** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "word"} let copyTextForm = textForm.Copy(); ``` */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetAxieNumFormat("top", "0.00"); ``` */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "word"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type which will be added to the document element. <b>"none"</b> - no border will be added to the created element or the selected element side. <b>"single"</b> - a single border will be added to the created element or the selected element side.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
  export type BorderType = "none" | "single";

  /** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "word"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
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

  /** The comment data. */
  export interface CommentData {
    UserName: string;
    Text: string;
    Time: string;
    Solved: boolean;
    Replies: CommentData[];
  }

  /** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "word"} let commentsReport = oDocument.GetCommentsReport(); ``` */
  export interface CommentReport {
    username?: UserComments;
  }

  /** Record of one comment.  ## Try it   ```js document-builder={"documentType": "word"} let commentsReport = oDocument.GetCommentsReport(); ``` */
  export interface CommentReportRecord {
    IsAnswer: boolean;
    CommentMessage: string;
    Date: number;
    DateUTC: number;
    QuoteText?: string;
  }

  /** The content control object. */
  export interface ContentControl {
    Tag: string;
    Id: string;
    Lock: ContentControlLock;
    InternalId: string;
    Alias: string;
    Appearance: 1 | 2;
    FormKey?: string;
    RadioGroup?: string;
    FormValue?: string | boolean | Date;
    Color?: object;
    Border?: object;
    Shd?: object;
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

  /** Defines the access restrictions for a content control. Possible values: <b>0</b> - only deleting, <b>1</b> - disable deleting or editing, <b>2</b> - only editing, <b>3</b> - full access. */
  export type ContentControlLock = 0 | 1 | 2 | 3;

  /** Represents an attribute of an XML node. */
  export interface CustomXmlNodeAttribute {
    name: string;
    value: string;
  }

  /** Available dash type for line. */
  export type DashType = "dash" | "dashDot" | "dot" | "lgDash" | "lgDashDot" | "lgDashDotDot" | "solid" | "sysDash" | "sysDashDot" | "sysDashDotDot" | "sysDot";

  /** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "word"} doc.AddElement(paragraph); ``` */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "word"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Form data.  ## Try it   ```js document-builder={"documentType": "word"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
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

  /** The specific form type.  ## Try it   ```js document-builder={"documentType": "word"} let formsData = doc.GetFormsData(); ``` */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "word"} let formType = textForm.GetFormType(); ``` */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** The coordinate value for the geometry paths. Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "word"} let docContent = finalSection.RemoveHeader("title"); ``` */
  export type HdrFtrType = "default" | "title" | "even";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "word"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddElement(run, 0); ``` */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "word"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "word"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "word"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
  export type PositivePercentage = number;

  /** The available preset color names.  ## Try it   ```js document-builder={"documentType": "word"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetHorAlign("page", "center"); ``` */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetVerAlign("page", "center"); ``` */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "word"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
  export interface ReviewReport {
    username?: UserReviewChanges;
  }

  /** Record of one review change.  ## Try it   ```js document-builder={"documentType": "word"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export interface ReviewReportRecord {
    Type: ReviewReportRecordType;
    Value?: string;
    Date: number;
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type.  ## Try it   ```js document-builder={"documentType": "word"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "word"} pictureForm.SetScaleFlag("tooBig"); ``` */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "word"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "word"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
  export type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

  /** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
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

  /** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "word"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    Type: ShdType;
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "word"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
  export type ShdType = "nil" | "clear";

  /** The possible values for the base which the relative horizontal size of an object will be calculated from. */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical size of an object will be calculated from. */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "word"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Custom tab types.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
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

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "word"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "word"} tableCell.SetWidth("twips", 2000); ``` */
  export type TableWidth = "auto" | "twips" | "nul" | "percent";

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    type: "none" | "digit" | "letter" | "mask" | "regExp";
    value?: string;
  }

  /** Text transform type.  ## Try it   ```js document-builder={"documentType": "word"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetVertAxisMajorTickMark("cross"); ``` */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    HtmlHeadings?: boolean;
    Base64img?: boolean;
    DemoteHeadings?: boolean;
    RenderHTMLTags?: boolean;
  }

  /** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "word"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocBuildFromPr {
    OutlineLvlStart?: number;
    OutlineLvls?: number;
    StylesLvls: TocStyleLvl[];
  }

  /** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "word"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "word"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: TocBuildFromPr;
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "word"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "word"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocStyleLvl {
    Name: string;
    Lvl: number;
  }

  /** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "word"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
  export interface TofPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: CaptionLabel | string;
    LabelNumber?: boolean;
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "word"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
  export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

  /** Represents a user's comment history. */
  export interface UserComments {
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    reviews: ReviewReportRecord[];
  }

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetVerticalTextAlign("top"); ``` */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction.  ## Try it   ```js document-builder={"documentType": "word"} watermarkSettings.SetDirection("clockwise45"); ``` */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type.  ## Try it   ```js document-builder={"documentType": "word"} watermarkSettings.SetType("text"); ``` */
  export type WatermarkType = "none" | "text" | "image";

  /** This element specifies the information which shall be used to establish a mapping to an XML element stored within a Custom XML. */
  export interface XmlMapping {
    prefixMapping: string;
    xpath: string;
    storeItemID: string;
  }

  /** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "word"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** The comment object. */
  export interface comment {
    Id: string;
    Data: CommentData;
  }

  /** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.SetHighlight("green"); ``` */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "word"} textPr.SetFontSize(22); ``` */
  export type hps = number;

  /** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetSpacingLine(240, "auto"); ``` */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "word"} textForm.SetCellWidth(7); ``` */
  export type mm = number;

  /** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "word"} pictureForm.SetPicturePosition(70, 70); ``` */
  export type percentage = number;

  /** A point.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "word"} paragraph.SetEqualColumns(2, 720); ``` */
  export type twips = number;

  // Cross-file type stubs
  export type ApiTableOfContents = unknown;
  export type ApiTableOfFigures = unknown;
  export type TextAnnotation = unknown;
  export type TextAnnotationRange = unknown;

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
    CreateRange(element: unknown, start: unknown, end: unknown): ApiRange | null;
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
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): boolean;
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
    GetAllTablesOnPage(page: unknown): ApiTable[];
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
    Search(text: string | RegExp, isMatchCase: boolean): ApiRange[];
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
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
    AddBreak(breakType: number, position: string): boolean;
    ApplyChartStyle(nStyleId: unknown): boolean;
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
    SetOutLine(stroke: ApiStroke): boolean;
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
  export interface ApiCheckBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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

  /** Class representing a document combo box / dropdown list. */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiComplexForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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

  /** Class representing a list of values of the combo box / dropdown list content control. */
  export interface ApiContentControlList {
    Add(sText: string, sValue: string, nIndex?: number): boolean;
    Clear(): boolean;
    GetAllItems(): ApiContentControlListEntry[];
    GetClassType(): "contentControlList";
    GetElementsCount(): number;
    GetItem(nIndex: number): ApiContentControlListEntry;
    GetParent(): ApiInlineLvlSdt | ApiBlockLvlSdt;
  }

  /** Class representing an entry of the combo box / dropdown list content control. */
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
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiDocument extends Omit<ApiDocumentContent, "GetClassType" | "GetInternalId" | "GetElementsCount" | "GetElement" | "AddElement" | "Push" | "RemoveAllElements" | "RemoveElement" | "GetRange" | "ToJSON" | "GetContent" | "GetAllDrawingObjects" | "GetAllShapes" | "GetAllImages" | "GetAllCharts" | "GetAllOleObjects" | "GetAllParagraphs" | "GetAllTables" | "GetText" | "SetText" | "GetCurrentParagraph" | "GetCurrentRun" | "GetCurrentContentControl" | "IsFootnote" | "IsEndnote" | "SelectNoteReference" | "MoveCursorToNoteReference" | "AddParagraph" | "AddText"> {
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
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];
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
    SetOutLine(stroke: ApiStroke): boolean;
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

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into a separate framed paragraph. */
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
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
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
    SetOutLine(stroke: ApiStroke): boolean;
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
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
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
    SetOutLine(stroke: ApiStroke): boolean;
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
    GetText(format?: "unicode" | "latex"): string;
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
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
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
    SetOutLine(stroke: ApiStroke): boolean;
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
  export interface ApiParagraph extends Omit<ApiParaPr, "GetClassType" | "SetStyle" | "GetStyle" | "SetContextualSpacing" | "GetContextualSpacing" | "SetIndLeft" | "GetIndLeft" | "SetIndRight" | "GetIndRight" | "SetIndFirstLine" | "GetIndFirstLine" | "SetJc" | "GetJc" | "SetKeepLines" | "GetKeepLines" | "SetKeepNext" | "GetKeepNext" | "SetPageBreakBefore" | "GetPageBreakBefore" | "SetSpacingLine" | "GetSpacingLineValue" | "GetSpacingLineRule" | "SetSpacingBefore" | "GetSpacingBefore" | "SetSpacingAfter" | "GetSpacingAfter" | "SetShd" | "GetShd" | "SetBottomBorder" | "GetBottomBorder" | "SetLeftBorder" | "GetLeftBorder" | "SetRightBorder" | "GetRightBorder" | "SetTopBorder" | "GetTopBorder" | "SetBetweenBorder" | "GetBetweenBorder" | "SetWidowControl" | "GetWidowControl" | "SetTabs" | "GetTabs" | "SetNumPr" | "GetNumPr" | "SetOutlineLvl" | "GetOutlineLvl" | "ToJSON"> {
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
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];
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
  export interface ApiPictureForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType" | "ToJSON" | "GetRGB"> {
    GetClassType(): "presetColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType" | "ToJSON" | "GetRGB"> {
    GetClassType(): "rgbColor";
    GetRGB(): number;
    ToJSON(): object;
  }

  /** Class representing a continuous region in a document.  Each Range object is determined by the position of the start and end characters. */
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

  export interface ApiRangeTextPr extends Omit<ApiTextPr, "GetClassType" | "SetStyle" | "GetStyle" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetColor" | "GetColor" | "SetVertAlign" | "GetVertAlign" | "SetHighlight" | "GetHighlight" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetPosition" | "GetPosition" | "SetLanguage" | "GetLanguage" | "SetShd" | "GetShd" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine" | "ToJSON"> {
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
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType" | "SetStyle" | "GetStyle" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetColor" | "GetColor" | "SetVertAlign" | "GetVertAlign" | "SetHighlight" | "GetHighlight" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetPosition" | "GetPosition" | "SetLanguage" | "GetLanguage" | "SetShd" | "GetShd" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine" | "ToJSON"> {
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
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType" | "ToJSON" | "GetRGB"> {
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
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
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
    SetOutLine(stroke: ApiStroke): boolean;
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
  export interface ApiSignatureForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType" | "GetContent" | "SetSize" | "SetRelativeHeight" | "SetRelativeWidth" | "SetWrappingStyle" | "SetHorAlign" | "SetVerAlign" | "SetHorPosition" | "SetVerPosition" | "SetDistances" | "GetParentParagraph" | "GetParentContentControl" | "GetParentTable" | "GetParentTableCell" | "Delete" | "Copy" | "InsertInContentControl" | "InsertParagraph" | "Select" | "Unselect" | "AddBreak" | "GetFlipH" | "GetFlipV" | "SetFlipH" | "SetFlipV" | "SetHorFlip" | "SetVertFlip" | "ScaleHeight" | "ScaleWidth" | "Fill" | "GetFill" | "SetOutLine" | "GetLine" | "SetShadow" | "GetShadow" | "GetNextDrawing" | "GetPrevDrawing" | "SetTitle" | "GetTitle" | "SetDescription" | "GetDescription" | "ToJSON" | "GetWidth" | "GetHeight" | "GetName" | "SetName" | "GetLockValue" | "SetLockValue" | "SetDrawingPrFromDrawing" | "SetRotation" | "GetRotation" | "SetLockAspect" | "GetLockAspect" | "SetAllowOverlap" | "GetAllowOverlap"> {
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
    SetOutLine(stroke: ApiStroke): boolean;
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
  export interface ApiTable extends Omit<ApiTablePr, "GetClassType" | "SetStyleColBandSize" | "SetStyleRowBandSize" | "SetJc" | "SetShd" | "SetTableBorderTop" | "SetTableBorderBottom" | "SetTableBorderLeft" | "SetTableBorderRight" | "SetTableBorderInsideH" | "SetTableBorderInsideV" | "SetTableBorderAll" | "SetTableCellMarginBottom" | "SetTableCellMarginLeft" | "SetTableCellMarginRight" | "SetTableCellMarginTop" | "SetCellSpacing" | "SetTableInd" | "SetWidth" | "SetTableLayout" | "SetTableTitle" | "GetTableTitle" | "SetTableDescription" | "GetTableDescription" | "ToJSON"> {
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
    GetSelectedCells(): ApiTableCell[];
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
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];
    Select(): boolean;
    SelectRange(startCellIndex: number, startRowIndex: number, endCellIndex: number, endRowIndex: number): boolean;
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
  export interface ApiTableCell extends Omit<ApiTableCellPr, "GetClassType" | "SetShd" | "SetCellMarginBottom" | "SetCellMarginLeft" | "SetCellMarginRight" | "SetCellMarginTop" | "SetCellBorderBottom" | "SetCellBorderLeft" | "SetCellBorderRight" | "SetCellBorderTop" | "SetWidth" | "SetVerticalAlign" | "SetTextDirection" | "SetNoWrap" | "ToJSON"> {
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
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];
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
  export interface ApiTableRow extends Omit<ApiTableRowPr, "GetClassType" | "SetHeight" | "SetTableHeader" | "ToJSON"> {
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
    Search(sText: string | RegExp, isMatchCase: boolean): ApiRange[];
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

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
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
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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

  export type EditorEventArgs = {
    /** The function called when a comment is added to the document with the {@link /docs/plugins/interacting-with-editors/document-api/Methods/AddComment AddComment} method. */
    onAddComment: [comment: comment];
    /** The function called when an annotation loses focus. */
    onBlurAnnotation: [annotation: TextAnnotation];
    /** The function called to show which content control has been blurred. */
    onBlurContentControl: [control: ContentControl];
    /** The function called when the specified comment is changed with the {@link /docs/plugins/interacting-with-editors/document-api/Methods/ChangeComment ChangeComment} method. */
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
    /** The function called when the specified comment is removed with the {@link /docs/plugins/interacting-with-editors/document-api/Methods/RemoveComments RemoveComments} method. */
    onRemoveComment: [comment: comment];
    /** The function called when the content control receives focus and its track appears. */
    onShowContentControlTrack: [ids: string[]];
    /** The function called when the user clicks the "Complete & Submit" button. */
    onSubmitForm: [];
  };

  export type EditorEventName = keyof EditorEventArgs;

}

// ---- src/generated/cell.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: cell

declare namespace Cell {
  /** A numeric value that specifies which function should be used to aggregate identical time values in the timeline data range. <b>1</b> (or omitted) - AVERAGE. <b>2</b> - COUNT. <b>3</b> - COUNTA. <b>4</b> - MAX. <b>5</b> - MEDIAN. <b>6</b> - MIN. <b>7</b> - SUM. */
  export type Aggregation = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /** Specifies the range angle.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
  export type Angle = "xlDownward" | "xlHorizontal" | "xlUpward" | "xlVertical";

  /** Animation effect type. */
  export type AnimationEffectType = "entranceAppear" | "entranceFade" | "entranceFlyIn" | "entranceFloatIn" | "entranceSplit" | "entranceWipe" | "entranceCircle" | "entranceBox" | "entranceDiamond" | "entrancePlus" | "entranceWheel" | "entranceRandomBars" | "entranceGrowAndTurn" | "entranceZoom" | "entranceSwivel" | "entranceBounce" | "entranceBlinds" | "entranceCheckerboard" | "entrancePeekIn" | "entranceStrips" | "entranceExpand" | "entranceRiseUp" | "entranceCenterRevolve" | "entranceSpinner" | "entranceFloatUp" | "entranceFloatDown" | "entranceSpiralIn" | "entranceWedge" | "entranceDissolveIn" | "entrancePinwheel" | "exitDisappear" | "exitFadeOut" | "exitFlyOut" | "exitFloatOut" | "exitSplitOut" | "exitWipeOut" | "exitCircleOut" | "exitBoxOut" | "exitDiamondOut" | "exitPlusOut" | "exitWheelOut" | "exitRandomBarsOut" | "exitShrinkAndTurn" | "exitZoomOut" | "exitSwivelOut" | "exitBounceOut" | "exitSpiralOut" | "exitCollapse" | "emphasisPulse" | "emphasisColorPulse" | "emphasisTeeter" | "emphasisSpin" | "emphasisGrowShrink" | "emphasisDesaturate" | "emphasisDarken" | "emphasisLighten" | "emphasisTransparency" | "emphasisObjectColor" | "emphasisComplementaryColor" | "emphasisLineColor" | "emphasisFillColor" | "emphasisFontColor" | "emphasisBlink" | "emphasisShimmer" | "emphasisWave" | "pathCircle" | "pathSquare" | "pathDiamond" | "pathHeart" | "pathStar" | "pathHexagon" | "pathOctagon" | "pathRight" | "pathLeft" | "pathUp" | "pathDown";

  /** Animation trigger type. */
  export type AnimationTriggerType = "onclick" | "withprevious" | "afterprevious";

  /** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "cell"} let copyTextForm = textForm.Copy(); ``` */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetAxieNumFormat("top", "0.00"); ``` */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "cell"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
  export type BorderType = "none" | "single";

  /** Specifies the cell border position.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("E2").SetBorders("Bottom", "Dotted", Api.CreateColorFromRGB(0, 0, 0)); ``` */
  export type BordersIndex = "DiagonalDown" | "DiagonalUp" | "Bottom" | "Left" | "Right" | "Top" | "InsideHorizontal" | "InsideVertical";

  /** A bullet type which will be added to the paragraph in spreadsheet or presentation.  ## Try it   ```js document-builder={"documentType": "cell"} // The paragraph will be starting with the Arabic numeral which has parenthesis let bullet = Api.CreateNumbering("ArabicParenR"); ``` */
  export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

  /** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "cell"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
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

  /** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "cell"} let commentsReport = oDocument.GetCommentsReport(); ``` */
  export interface CommentReport {
    username?: UserComments;
  }

  /** Record of one comment.  ## Try it   ```js document-builder={"documentType": "cell"} let commentsReport = oDocument.GetCommentsReport(); ``` */
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

  /** Specifies the direction of end in the specified range.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("C4:D5").End("xlToLeft").SetFillColor(Api.CreateColorFromRGB(255, 224, 204)); ``` */
  export type Direction = "xlUp" | "xlDown" | "xlToRight" | "xlToLeft";

  /** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "cell"} doc.AddElement(paragraph); ``` */
  export type DocumentElement = ApiParagraph;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiOleObject | ApiChart | ApiGroup | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "cell"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available slide transition effects (similar to PowerPoint VBA ppEffect). */
  export type EntryEffect = "effectAppear" | "effectBlindsHorizontal" | "effectBlindsVertical" | "effectBoxDown" | "effectBoxIn" | "effectBoxLeft" | "effectBoxOut" | "effectBoxRight" | "effectBoxUp" | "effectCheckerboardAcross" | "effectCheckerboardDown" | "effectCircleOut" | "effectCombHorizontal" | "effectCombVertical" | "effectConveyorLeft" | "effectConveyorRight" | "effectCoverDown" | "effectCoverLeft" | "effectCoverLeftDown" | "effectCoverLeftUp" | "effectCoverRight" | "effectCoverRightDown" | "effectCoverRightUp" | "effectCoverUp" | "effectCubeDown" | "effectCubeLeft" | "effectCubeRight" | "effectCubeUp" | "effectCut" | "effectCutThroughBlack" | "effectDiamondOut" | "effectDissolve" | "effectDoorsHorizontal" | "effectDoorsVertical" | "effectFade" | "effectFadeSmoothly" | "effectFerrisWheelLeft" | "effectFerrisWheelRight" | "effectFlashbulb" | "effectFlipDown" | "effectFlipLeft" | "effectFlipRight" | "effectFlipUp" | "effectFlyThroughIn" | "effectFlyThroughInBounce" | "effectFlyThroughOut" | "effectFlyThroughOutBounce" | "effectGalleryLeft" | "effectGalleryRight" | "effectGlitterDiamondDown" | "effectGlitterDiamondLeft" | "effectGlitterDiamondRight" | "effectGlitterDiamondUp" | "effectGlitterHexagonDown" | "effectGlitterHexagonLeft" | "effectGlitterHexagonRight" | "effectGlitterHexagonUp" | "effectHoneycomb" | "effectNewsflash" | "effectOrbitDown" | "effectOrbitLeft" | "effectOrbitRight" | "effectOrbitUp" | "effectPanDown" | "effectPanLeft" | "effectPanRight" | "effectPanUp" | "effectPlusOut" | "effectPushDown" | "effectPushLeft" | "effectPushRight" | "effectPushUp" | "effectRandom" | "effectRandomBarsHorizontal" | "effectRandomBarsVertical" | "effectRevealBlackLeft" | "effectRevealBlackRight" | "effectRevealSmoothLeft" | "effectRevealSmoothRight" | "effectRippleCenter" | "effectRippleLeftDown" | "effectRippleLeftUp" | "effectRippleRightDown" | "effectRippleRightUp" | "effectRotateDown" | "effectRotateLeft" | "effectRotateRight" | "effectRotateUp" | "effectShredRectangleIn" | "effectShredRectangleOut" | "effectShredStripsIn" | "effectShredStripsOut" | "effectSplitHorizontalIn" | "effectSplitHorizontalOut" | "effectSplitVerticalIn" | "effectSplitVerticalOut" | "effectStripsDownLeft" | "effectStripsDownRight" | "effectStripsLeftDown" | "effectStripsLeftUp" | "effectStripsRightDown" | "effectStripsRightUp" | "effectStripsUpLeft" | "effectStripsUpRight" | "effectSwitchDown" | "effectSwitchLeft" | "effectSwitchRight" | "effectSwitchUp" | "effectUncoverDown" | "effectUncoverLeft" | "effectUncoverLeftDown" | "effectUncoverLeftUp" | "effectUncoverRight" | "effectUncoverRightDown" | "effectUncoverRightUp" | "effectUncoverUp" | "effectVortexDown" | "effectVortexLeft" | "effectVortexRight" | "effectVortexUp" | "effectWarpIn" | "effectWarpOut" | "effectWedge" | "effectWheel1Spoke" | "effectWheel2Spokes" | "effectWheel3Spokes" | "effectWheel4Spokes" | "effectWheel8Spokes" | "effectWheelReverse1Spoke" | "effectWindowHorizontal" | "effectWindowVertical" | "effectWipeDown" | "effectWipeLeft" | "effectWipeRight" | "effectWipeUp" | "effectNone" | "effectCrawlFromDown" | "effectCrawlFromLeft" | "effectCrawlFromRight" | "effectCrawlFromUp" | "effectFlashOnceFast" | "effectFlashOnceMedium" | "effectFlashOnceSlow" | "effectFlyFromBottom" | "effectFlyFromBottomLeft" | "effectFlyFromBottomRight" | "effectFlyFromLeft" | "effectFlyFromRight" | "effectFlyFromTop" | "effectFlyFromTopLeft" | "effectFlyFromTopRight" | "effectMixed" | "effectPeekFromDown" | "effectPeekFromLeft" | "effectPeekFromRight" | "effectPeekFromUp" | "effectSpiral" | "effectStretchAcross" | "effectStretchDown" | "effectStretchLeft" | "effectStretchRight" | "effectStretchUp" | "effectSwivel" | "effectZoomBottom" | "effectZoomCenter" | "effectZoomIn" | "effectZoomInSlightly" | "effectZoomOut" | "effectZoomOutSlightly";

  /** The error value. * <b>"#NULL!"</b> - 1 * <b>"#DIV/0!"</b> - 2 * <b>"#VALUE!"</b> - 3 * <b>"#REF!"</b> - 4 * <b>"#NAME?"</b> - 5 * <b>"#NUM!"</b> - 6 * <b>"#N/A"</b> - 7 * <b>"#GETTING_DATA"</b> - 8 * <b>"Other"</b> - "#N/A" */
  export type ErrorValue = "#NULL!" | "#DIV/0!" | "#VALUE!" | "#REF!" | "#NAME?" | "#NUM!" | "#N/A" | "#GETTING_DATA";

  /** Specifies how the report filter fields are located. */
  export type FieldsInReportFilterType = "OverThenDown" | "DownThenOver";

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Form data.  ## Try it   ```js document-builder={"documentType": "cell"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
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

  /** The specific form type.  ## Try it   ```js document-builder={"documentType": "cell"} let formsData = doc.GetFormsData(); ``` */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "cell"} let formType = textForm.GetFormType(); ``` */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** Specifies a type of freeze panes.  ## Try it   ```js document-builder={"documentType": "cell"} builder.CreateFile("xlsx"); Api.SetFreezePanesType('column'); let worksheet = Api.GetActiveSheet(); let freezePanes = worksheet.GetFreezePanes(); let range = freezePanes.GetLocation(); worksheet.GetRange("A1").SetValue("Location: "); worksheet.GetRange("B1").SetValue(range.GetAddress()); builder.SaveFile("xlsx", "FreezePanes.xlsx"); builder.CloseFile(); ``` */
  export type FreezePaneType = "row" | "column" | "cell" | null;

  /** The coordinate value for the geometry paths. Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "cell"} let docContent = finalSection.RemoveHeader("title"); ``` */
  export type HdrFtrType = "default" | "title" | "even";

  /** The layout subtotal location. */
  export type LayoutSubtotalLocationType = "Top" | "Bottom";

  /** Available layout types. */
  export type LayoutType = "blank" | "chart" | "chartAndTx" | "clipArtAndTx" | "clipArtAndVertTx" | "cust" | "dgm" | "fourObj" | "mediaAndTx" | "obj" | "objAndTwoObj" | "objAndTx" | "objOnly" | "objOverTx" | "objTx" | "picTx" | "secHead" | "tbl" | "title" | "titleOnly" | "twoColTx" | "twoObj" | "twoObjAndObj" | "twoObjAndTx" | "twoObjOverTx" | "twoTxTwoObj" | "tx" | "txAndChart" | "txAndClipArt" | "txAndMedia" | "txAndObj" | "txAndTwoObj" | "txOverObj" | "vertTitleAndTx" | "vertTitleAndTxOverChart" | "vertTx";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Specifies the line style used to form the cell border.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("E2").SetBorders("Bottom", "Dotted", Api.CreateColorFromRGB(0, 0, 0)); ``` */
  export type LineStyle = "None" | "Double" | "Hair" | "DashDotDot" | "DashDot" | "Dotted" | "Dashed" | "Thin" | "MediumDashDotDot" | "SlantDashDot" | "MediumDashDot" | "MediumDashed" | "Medium" | "Thick";

  /** The match type. * <b>-1</b> - The values must be sorted in descending order. If the exact match is not found, the function will return the smallest value that is greater than the searched value. * <b>0</b> - The values can be sorted in any order. If the exact match is not found, the function will return the <em>#N/A</em> error. * <b>1</b> (or omitted) - The values must be sorted in ascending order. If the exact match is not found, the function will return the largest value that is less than the searched value. */
  export type MatchType = "-1" | "0" | "1";

  /** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The page orientation type.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.SetPageOrientation("xlPortrait"); ``` */
  export type PageOrientation = "xlLandscape" | "xlPortrait";

  /** The paper size, specified as a value of the Excel <b>xlPaperSize</b> enumeration. */
  export type PaperSize = "xlPaperLetter" | "xlPaperLetterSmall" | "xlPaperTabloid" | "xlPaperLedger" | "xlPaperLegal" | "xlPaperStatement" | "xlPaperExecutive" | "xlPaperA3" | "xlPaperA4" | "xlPaperA4Small" | "xlPaperA5" | "xlPaperB4" | "xlPaperB5" | "xlPaperFolio" | "xlPaperQuarto" | "xlPaper10x14" | "xlPaper11x17" | "xlPaperNote" | "xlPaperEnvelope9" | "xlPaperEnvelope10" | "xlPaperEnvelope11" | "xlPaperEnvelope12" | "xlPaperEnvelope14" | "xlPaperCsheet" | "xlPaperDsheet" | "xlPaperEsheet" | "xlPaperEnvelopeDL" | "xlPaperEnvelopeC5" | "xlPaperEnvelopeC3" | "xlPaperEnvelopeC4" | "xlPaperEnvelopeC6" | "xlPaperEnvelopeC65" | "xlPaperEnvelopeB4" | "xlPaperEnvelopeB5" | "xlPaperEnvelopeB6" | "xlPaperEnvelopeItaly" | "xlPaperEnvelopeMonarch" | "xlPaperEnvelopePersonal" | "xlPaperFanfoldUS" | "xlPaperFanfoldStdGerman" | "xlPaperFanfoldLegalGerman";

  /** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddElement(run, 0); ``` */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

  /** The mathematical operation which will be applied to the copied data.  ## Try it   ```js document-builder={"documentType": "cell"} range.PasteSpecial("xlPasteAll", "xlPasteSpecialOperationAdd"); ``` */
  export type PasteSpecialOperation = "xlPasteSpecialOperationAdd" | "xlPasteSpecialOperationDivide" | "xlPasteSpecialOperationMultiply" | "xlPasteSpecialOperationNone" | "xlPasteSpecialOperationSubtract";

  /** Specifies the part of the range to be pasted.  ## Try it   ```js document-builder={"documentType": "cell"} range.PasteSpecial("xlPasteAll"); ``` */
  export type PasteType = "xlPasteAll" | "xlPasteAllExceptBorders" | "xlPasteColumnWidths" | "xlPasteComments" | "xlPasteFormats" | "xlPasteFormulas" | "xlPasteFormulasAndNumberFormats" | "xlPasteValues" | "xlPasteValuesAndNumberFormats";

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "cell"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
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

  /** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "cell"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "cell"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
  export type PositivePercentage = number;

  /** The available preset color names.  ## Try it   ```js document-builder={"documentType": "cell"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** Specifies the user type of the protected range.  ## Try it   ```js document-builder={"documentType": "cell"} protectedRange.SetAnyoneType("NotView"); ``` */
  export type ProtectedRangeUserType = "CanEdit" | "CanView" | "NotView";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** The cell reference type.  ## Try it   ```js document-builder={"documentType": "cell"} builder.CreateFile("xlsx"); let worksheet = Api.GetActiveSheet(); worksheet.GetRange("A1").SetValue(Api.GetReferenceStyle()); builder.SaveFile("xlsx", "ReferenceStyle.xlsx"); builder.CloseFile(); ``` */
  export type ReferenceStyle = 'xlA1' | 'xlR1C1';

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetHorAlign("page", "center"); ``` */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetVerAlign("page", "center"); ``` */
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

  /** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
  export interface ReviewReport {
    username?: UserReviewChanges;
  }

  /** Record of one review change.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export interface ReviewReportRecord {
    Type: ReviewReportRecordType;
    Value?: string;
    Date: number;
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "cell"} pictureForm.SetScaleFlag("tooBig"); ``` */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "cell"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "cell"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
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

  /** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "cell"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    Type: ShdType;
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "cell"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
  export type ShdType = "nil" | "clear";

  /** The possible values for the base which the relative horizontal size of an object will be calculated from. */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical size of an object will be calculated from. */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** Specifies whether the first row of the sort range contains the header information.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
  export type SortHeader = "xlNo" | "xlYes";

  /** Specifies the sort order.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
  export type SortOrder = "xlAscending" | "xlDescending";

  /** Specifies if the sort should be by row or column.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
  export type SortOrientation = "xlSortColumns" | "xlSortRows";

  /** A numeric value between 1 and 8 that specifies which statistic will be returned. <b>1</b> - Alpha parameter of ETS algorithm - the base value parameter. <b>2</b> - Beta parameter of ETS algorithm - the trend value parameter. <b>3</b> - Gamma parameter of ETS algorithm - the seasonality value parameter. <b>4</b> - MASE (mean absolute scaled error) metric - a measure of the accuracy of forecasts. <b>5</b> - SMAPE (symmetric mean absolute percentage error) metric - a measure of the accuracy based on percentage errors. <b>6</b> - MAE (mean absolute error) metric - a measure of the accuracy of forecasts. <b>7</b> - RMSE (root mean squared error) metric - a measure of the differences between predicted and observed values. <b>8</b> - Step size detected in the timeline. */
  export type StatisticType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "cell"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Types of custom tab.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
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

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "cell"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "cell"} tableCell.SetWidth("twips", 2000); ``` */
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

  /** Text transform type.  ## Try it   ```js document-builder={"documentType": "cell"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - does not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetVertAxisMajorTickMark("cross"); ``` */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    HtmlHeadings?: boolean;
    Base64img?: boolean;
    DemoteHeadings?: boolean;
    RenderHTMLTags?: boolean;
  }

  /** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "cell"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocBuildFromPr {
    OutlineLvlStart?: number;
    OutlineLvls?: number;
    StylesLvls: TocStyleLvl[];
  }

  /** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "cell"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "cell"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: TocBuildFromPr;
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "cell"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "cell"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocStyleLvl {
    Name: string;
    Lvl: number;
  }

  /** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "cell"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
  export interface TofPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: CaptionLabel | string;
    LabelNumber?: boolean;
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "cell"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
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

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetVerticalTextAlign("top"); ``` */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction.  ## Try it   ```js document-builder={"documentType": "cell"} watermarkSettings.SetDirection("clockwise45"); ``` */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type.  ## Try it   ```js document-builder={"documentType": "cell"} watermarkSettings.SetType("text"); ``` */
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

  /** Search data type (formulas or values).  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
  export type XlFindLookIn = "xlFormulas" | "xlValues";

  /** The format condition operator. */
  export type XlFormatConditionOperator = "xlBetween" | "xlNotBetween" | "xlEqual" | "xlNotEqual" | "xlGreater" | "xlLess" | "xlGreaterEqual" | "xlLessEqual" | "xlBeginsWith" | "xlEndsWith" | "xlContains" | "xlNotContains";

  /** The conditional formatting type. */
  export type XlFormatConditionType = "xlCellValue" | "xlExpression" | "xlTop10" | "xlAboveAverageCondition" | "xlUniqueValues" | "xlTextString" | "xlBlanksCondition" | "xlNoBlanksCondition" | "xlTimePeriod" | "xlErrorsCondition" | "xlNoErrorsCondition" | "xlColorScale" | "xlDataBar" | "xlIconSet";

  /** The icon constants for conditional formatting. */
  export type XlIcon = "xlIcon0Bars" | "xlIcon0FilledBoxes" | "xlIcon1Bar" | "xlIcon1FilledBox" | "xlIcon2Bars" | "xlIcon2FilledBoxes" | "xlIcon3Bars" | "xlIcon3FilledBoxes" | "xlIcon4Bars" | "xlIcon4FilledBoxes" | "xlIconBlackCircle" | "xlIconBlackCircleWithBorder" | "xlIconCircleWithOneWhiteQuarter" | "xlIconCircleWithThreeWhiteQuarters" | "xlIconCircleWithTwoWhiteQuarters" | "xlIconGoldStar" | "xlIconGrayCircle" | "xlIconGrayDownArrow" | "xlIconGrayDownInclineArrow" | "xlIconGraySideArrow" | "xlIconGrayUpArrow" | "xlIconGrayUpInclineArrow" | "xlIconGreenCheck" | "xlIconGreenCheckSymbol" | "xlIconGreenCircle" | "xlIconGreenFlag" | "xlIconGreenTrafficLight" | "xlIconGreenUpArrow" | "xlIconGreenUpTriangle" | "xlIconHalfGoldStar" | "xlIconNoCellIcon" | "xlIconPinkCircle" | "xlIconRedCircle" | "xlIconRedCircleWithBorder" | "xlIconRedCross" | "xlIconRedCrossSymbol" | "xlIconRedDiamond" | "xlIconRedDownArrow" | "xlIconRedDownTriangle" | "xlIconRedFlag" | "xlIconRedTrafficLight" | "xlIconSilverStar" | "xlIconWhiteCircleAllWhiteQuarters" | "xlIconYellowCircle" | "xlIconYellowDash" | "xlIconYellowDownInclineArrow" | "xlIconYellowExclamation" | "xlIconYellowExclamationSymbol" | "xlIconYellowFlag" | "xlIconYellowSideArrow" | "xlIconYellowTrafficLight" | "xlIconYellowTriangle" | "xlIconYellowUpInclineArrow";

  /** The icon set types for conditional formatting. */
  export type XlIconSet = "xl3Arrows" | "xl3ArrowsGray" | "xl3Flags" | "xl3TrafficLights1" | "xl3TrafficLights2" | "xl3Signs" | "xl3Symbols" | "xl3Symbols2" | "xl4Arrows" | "xl4ArrowsGray" | "xl4RedToBlack" | "xl4CRV" | "xl4TrafficLights" | "xl5Arrows" | "xl5ArrowsGray" | "xl5CRV" | "xl5Quarters" | "xl3Stars" | "xl3Triangles" | "xl5Boxes";

  /** Specifies whether the whole search text or any part of the search text is matched.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
  export type XlLookAt = "xlWhole" | "xlPart";

  /** The scope for pivot table conditional formatting rules. */
  export type XlPivotConditionScope = "xlFieldsScope" | "xlSelectionScope" | "xlDataFieldScope";

  /** The pivot filter type. */
  export type XlPivotFilterType = "xlAfter" | "xlAfterOrEqualTo" | "xlAllDatesInPeriodApril" | "xlAllDatesInPeriodAugust" | "xlAllDatesInPeriodDecember" | "xlAllDatesInPeriodFebruary" | "xlAllDatesInPeriodJanuary" | "xlAllDatesInPeriodJuly" | "xlAllDatesInPeriodJune" | "xlAllDatesInPeriodMarch" | "xlAllDatesInPeriodMay" | "xlAllDatesInPeriodNovember" | "xlAllDatesInPeriodOctober" | "xlAllDatesInPeriodQuarter1" | "xlAllDatesInPeriodQuarter2" | "xlAllDatesInPeriodQuarter3" | "xlAllDatesInPeriodQuarter4" | "xlAllDatesInPeriodSeptember" | "xlBefore" | "xlBeforeOrEqualTo" | "xlBottomCount" | "xlBottomPercent" | "xlBottomSum" | "xlCaptionBeginsWith" | "xlCaptionContains" | "xlCaptionDoesNotBeginWith" | "xlCaptionDoesNotContain" | "xlCaptionDoesNotEndWith" | "xlCaptionDoesNotEqual" | "xlCaptionEndsWith" | "xlCaptionEquals" | "xlCaptionIsBetween" | "xlCaptionIsGreaterThan" | "xlCaptionIsGreaterThanOrEqualTo" | "xlCaptionIsLessThan" | "xlCaptionIsLessThanOrEqualTo" | "xlCaptionIsNotBetween" | "xlDateBetween" | "xlDateLastMonth" | "xlDateLastQuarter" | "xlDateLastWeek" | "xlDateLastYear" | "xlDateNextMonth" | "xlDateNextQuarter" | "xlDateNextWeek" | "xlDateNextYear" | "xlDateThisMonth" | "xlDateThisQuarter" | "xlDateThisWeek" | "xlDateThisYear" | "xlDateToday" | "xlDateTomorrow" | "xlDateYesterday" | "xlNotSpecificDate" | "xlSpecificDate" | "xlTopCount" | "xlTopPercent" | "xlTopSum" | "xlValueDoesNotEqual" | "xlValueEquals" | "xlValueIsBetween" | "xlValueIsGreaterThan" | "xlValueIsGreaterThanOrEqualTo" | "xlValueIsLessThan" | "xlValueIsLessThanOrEqualTo" | "xlValueIsNotBetween" | "xlYearToDate";

  /** The reading order for data bars. */
  export type XlReadingOrder = "xlLTR" | "xlRTL" | "xlContext";

  /** Range search direction - next match or previous match.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
  export type XlSearchDirection = "xlNext" | "xlPrevious";

  /** Range search order - by rows or by columns.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
  export type XlSearchOrder = "xlByRows" | "xlByColumns";

  /** The time period for conditional formatting. */
  export type XlTimePeriods = "xlToday" | "xlYesterday" | "xlTomorrow" | "xlLast7Days" | "xlLastWeek" | "xlThisWeek" | "xlNextWeek" | "xlLastMonth" | "xlThisMonth" | "xlNextMonth";

  /** The top/bottom type for conditional formatting rules. */
  export type XlTopBottom = "xlTop10Top" | "xlTop10Bottom";

  /** Underline type.  ## Try it   ```js document-builder={"documentType": "cell"} font.SetUnderline("xlUnderlineStyleSingle"); ``` */
  export type XlUnderlineStyle = "xlUnderlineStyleDouble" | "xlUnderlineStyleDoubleAccounting" | "xlUnderlineStyleNone" | "xlUnderlineStyleSingle" | "xlUnderlineStyleSingleAccounting";

  /** This element specifies the information which shall be used to establish a mapping to an XML element stored within a Custom XML. */
  export interface XmlMapping {
    prefixMapping: string;
    xpath: string;
    storeItemID: string;
  }

  /** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "cell"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.SetHighlight("green"); ``` */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "cell"} textPr.SetFontSize(22); ``` */
  export type hps = number;

  /** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetSpacingLine(240, "auto"); ``` */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "cell"} textForm.SetCellWidth(7); ``` */
  export type mm = number;

  /** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "cell"} pictureForm.SetPicturePosition(70, 70); ``` */
  export type percentage = number;

  /** A point.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.SetEqualColumns(2, 720); ``` */
  export type twips = number;

  // Cross-file type stubs
  export type ApiHyperlinks = unknown;
  export type ApiListObject = unknown;
  export type PTCondition = unknown;

  /** Base class. */
  export interface Api {
    AddComment(sText: string, sAuthor: string): ApiComment | null;
    AddCustomFunction(fCustom: (...args: unknown[]) => unknown): void;
    AddCustomFunctionLibrary(sName: string, Func: (...args: unknown[]) => unknown): void;
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
    RecalculateAllFormulas(fLogger?: (...args: unknown[]) => unknown): boolean;
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
    attachEvent(eventName: string, callback: (...args: unknown[]) => unknown): void;
    detachEvent(eventName: string): void;
  }

  /** Class representing an above average conditional formatting rule. */
  export interface ApiAboveAverage extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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
  export interface ApiChart extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet" | "SetTitle" | "GetTitle"> {
    AddSeria(sNameRange: string, sValuesRange: string, sXValuesRange?: string): void;
    ApplyChartStyle(nStyleId: unknown): boolean;
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
  export interface ApiCheckBoxForm extends ApiFormBase {
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
  export interface ApiColorScale extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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
  export interface ApiComboBoxForm extends ApiFormBase {
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

  /** Class representing a data bar conditional formatting rule. */
  export interface ApiDatabar extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into a separate framed paragraph. */
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
  export interface ApiGroup extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet"> {
    GetClassType(): "group";
    GetParentSheet(): ApiWorksheet;
    Ungroup(): ApiDrawing[] | null;
  }

  /** Class representing a single header or footer section (left, center or right) of a page. */
  export interface ApiHeaderFooter {
    GetText(): string;
    SetText(sText: string): boolean;
  }

  /** Class representing a Paragraph hyperlink. */
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
  export interface ApiIconSetCondition extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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
  export interface ApiImage extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet"> {
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
  export interface ApiOleObject extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet"> {
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
  export interface ApiPictureForm extends ApiFormBase {
  }

  /** Class representing a pivot table data field. */
  export interface ApiPivotDataField extends Omit<ApiPivotField, "ClearAllFilters" | "ClearLabelFilters" | "ClearManualFilters" | "ClearValueFilters" | "GetPivotItems" | "Move" | "Remove" | "GetPosition" | "SetPosition" | "GetOrientation" | "SetOrientation" | "GetValue" | "SetValue" | "GetCaption" | "SetCaption" | "GetName" | "SetName" | "GetSourceName" | "GetIndex" | "GetTable" | "GetParent" | "GetLayoutCompactRow" | "SetLayoutCompactRow" | "GetLayoutForm" | "SetLayoutForm" | "GetLayoutPageBreak" | "SetLayoutPageBreak" | "GetShowingInAxis" | "GetRepeatLabels" | "SetRepeatLabels" | "GetLayoutBlankLine" | "SetLayoutBlankLine" | "GetShowAllItems" | "SetShowAllItems" | "GetLayoutSubtotals" | "SetLayoutSubtotals" | "GetLayoutSubtotalLocation" | "SetLayoutSubtotalLocation" | "GetSubtotalName" | "SetSubtotalName" | "GetSubtotals" | "SetSubtotals" | "GetDragToColumn" | "SetDragToColumn" | "GetDragToRow" | "SetDragToRow" | "GetDragToData" | "SetDragToData" | "GetDragToPage" | "SetDragToPage" | "GetCurrentPage" | "GetPivotFilters" | "AutoSort"> {
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
  export interface ApiPresetColor extends Omit<ApiUniColor, "GetClassType"> {
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
  export interface ApiRGBColor extends Omit<ApiUniColor, "GetClassType"> {
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
    ForEach(fCallback: (...args: unknown[]) => unknown): boolean;
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

  export interface ApiRangeTextPr extends Omit<ApiTextPr, "GetClassType" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetVertAlign" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetFill" | "GetFill" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine"> {
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
  export interface ApiRun extends Omit<ApiTextPr, "GetClassType" | "SetBold" | "GetBold" | "SetItalic" | "GetItalic" | "SetStrikeout" | "GetStrikeout" | "SetUnderline" | "GetUnderline" | "SetFontFamily" | "GetFontFamily" | "SetFontSize" | "GetFontSize" | "SetVertAlign" | "SetSpacing" | "GetSpacing" | "SetDoubleStrikeout" | "GetDoubleStrikeout" | "SetCaps" | "GetCaps" | "SetSmallCaps" | "GetSmallCaps" | "SetFill" | "GetFill" | "SetTextFill" | "GetTextFill" | "SetOutLine" | "GetOutLine"> {
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
  export interface ApiSchemeColor extends Omit<ApiUniColor, "GetClassType"> {
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
  export interface ApiShape extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet" | "GetLine"> {
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
  export interface ApiSignatureForm extends ApiFormBase {
  }

  /** Class representing a slide. */
  export interface ApiSlide {
  }

  /** Class representing a slide show transition. */
  export interface ApiSlideShowTransition {
  }

  /** Class representing a smart art. */
  export interface ApiSmartArt extends Omit<ApiDrawing, "GetClassType" | "GetParentSheet"> {
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
  export interface ApiTable extends Omit<ApiDrawing, "GetParentSheet">, ApiTablePr {
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

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
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
  export interface ApiTop10 extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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
  export interface ApiUniqueValues extends Omit<ApiFormatCondition, "Delete" | "Modify" | "ModifyAppliesToRange" | "SetFirstPriority" | "SetLastPriority" | "GetAppliesTo" | "GetFont" | "GetType" | "GetFormula1" | "GetFormula2" | "SetNumberFormat" | "GetNumberFormat" | "GetOperator" | "GetParent" | "GetPTCondition" | "GetPriority" | "SetPriority" | "GetScopeType" | "SetScopeType" | "GetText" | "SetText" | "GetTextOperator" | "SetTextOperator" | "GetDateOperator" | "SetDateOperator" | "SetBorders" | "SetFillColor" | "GetFillColor"> {
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

// ---- src/generated/slide.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: slide

declare namespace Slide {
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

// ---- src/generated/forms.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: form

declare namespace Forms {
  /** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "pdf"} let copyTextForm = textForm.Copy(); ``` */
  export type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm | ApiSignatureForm;

  /** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetAxieNumFormat("top", "0.00"); ``` */
  export type AxisPos = "top" | "bottom" | "right" | "left";

  /** The Base64 image string. */
  export type Base64Img = string;

  /** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "pdf"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type which will be added to the document element. <b>"none"</b> - no border will be added to the created element or the selected element side. <b>"single"</b> - a single border will be added to the created element or the selected element side.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
  export type BorderType = "none" | "single";

  /** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
  export type CaptionLabel = "Table" | "Equation" | "Figure";

  /** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
  export type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

  /** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "pdf"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
  export type ChartType = "ColumnClustered" | "ColumnStacked" | "ColumnStacked100" | "3DColumnClustered" | "3DColumnStacked" | "3DColumnStacked100" | "3DColumn" | "BarClustered" | "BarStacked" | "BarStacked100" | "3DBarClustered" | "3DBarStacked" | "3DBarStacked100" | "Line" | "LineStacked" | "LineStacked100" | "LineMarkers" | "LineMarkersStacked" | "LineMarkersStacked100" | "3DLine" | "Pie" | "3DPie" | "Doughnut" | "XYScatter" | "XYScatterLines" | "XYScatterLinesNoMarkers" | "XYScatterSmooth" | "XYScatterSmoothNoMarkers" | "StockHLC" | "StockOHLC" | "StockVHLC" | "StockVOHLC" | "Area" | "AreaStacked" | "AreaStacked100" | "Combo" | "ComboColumnClusteredLine" | "ComboColumnClusteredLineSecondaryAxis" | "Radar" | "RadarMarkers" | "RadarFilled" | "unknown";

  /** This type specifies the legacy chart type names which are kept for backward compatibility. */
  export type ChartTypeLegacy = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "lineNormalMarker" | "lineStackedMarker" | "lineStackedPerMarker" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "scatterLine" | "scatterLineMarker" | "scatterSmooth" | "scatterSmoothMarker" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboCustom" | "comboBarLine" | "comboBarLineSecondary" | "radar" | "radarMarker" | "radarFilled" | "unknown";

  /** Checkbox / radio button properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let checkBoxFormPr = {"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true}; let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPr); ``` */
  export type CheckBoxFormPr = FormPrBase | CheckBoxFormPrBase;

  /** Specific checkbox / radio button properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let checkBoxFormPrBase = {"radio": true}; let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPrBase) ``` */
  export interface CheckBoxFormPrBase {
    radio: boolean;
  }

  /** Option for checkbox */
  export type CheckboxOption = boolean;

  /** Option for radio groups, dropdowns and combo boxes. */
  export interface ChoiceOption {
    value: string;
    label: string;
  }

  /** Combo box / dropdown list properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPr = {"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr); ``` */
  export type ComboBoxFormPr = FormPrBase | ComboBoxFormPrBase;

  /** Specific combo box / dropdown list properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPrBase = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPrBase); ``` */
  export interface ComboBoxFormPrBase {
    editable: boolean;
    autoFit: boolean;
    items: (string | string[])[];
  }

  /** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "pdf"} let commentsReport = oDocument.GetCommentsReport(); ``` */
  export interface CommentReport {
    username?: UserComments;
  }

  /** Record of one comment.  ## Try it   ```js document-builder={"documentType": "pdf"} let commentsReport = oDocument.GetCommentsReport(); ``` */
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

  /** Date form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let dateFormPr = {"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"}; let dateForm = Api.CreateDateForm(dateFormPr); ``` */
  export type DateFormPr = FormPrBase | DateFormPrBase;

  /** Specific date form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let dateFormPrBase = {"format": "mm.dd.yyyy", "lang": "en-US"}; let dateForm = Api.CreateDateForm(dateFormPrBase); ``` */
  export interface DateFormPrBase {
    format: string;
    lang: string;
  }

  /** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "pdf"} doc.AddElement(paragraph); ``` */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart | ApiSmartArt;

  /** Available drawing element for grouping. */
  export type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

  /** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "pdf"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
  export type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

  /** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
  export type EMU = number;

  /** The available fill types. */
  export type FillType = "solid" | "gradient" | "pattern" | "blip" | "nofill";

  /** Form data.  ## Try it   ```js document-builder={"documentType": "pdf"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
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

  /** Form insertion specific properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false}; doc.InsertTextForm(textFormInsertPr); ``` */
  export interface FormInsertPr {
    placeholderFromSelection?: boolean;
    keepSelectedTextInForm?: boolean;
  }

  /** Common form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let formPrBase = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name"}; let textForm = Api.CreateTextForm(formPrBase); ``` */
  export interface FormPrBase {
    key: string;
    tip: string;
    tag: string;
    role: string;
    required: boolean;
    placeholder: string;
  }

  /** The specific form type.  ## Try it   ```js document-builder={"documentType": "pdf"} let formsData = doc.GetFormsData(); ``` */
  export type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio" | "complex" | "signature";

  /** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "pdf"} let formType = textForm.GetFormType(); ``` */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** The coordinate value for the geometry paths. Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "pdf"} let docContent = finalSection.RemoveHeader("title"); ``` */
  export type HdrFtrType = "default" | "title" | "even";

  /** The line end size. */
  export type LineEndSize = "large" | "medium" | "small";

  /** The line end type. */
  export type LineEndType = "none" | "arrow" | "diamond" | "oval" | "stealth" | "triangle";

  /** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "pdf"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
  export type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

  /** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddElement(run, 0); ``` */
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

  /** The path command types. */
  export type PathCommandType = "moveTo" | "lineTo" | "bezier3" | "bezier4" | "arcTo" | "close";

  /** The path fill type. */
  export type PathFillType = "none" | "norm" | "lighten" | "lightenLess" | "darken" | "darkenLess";

  /** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "pdf"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
  export type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

  /** Picture form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let pictureFormPr = {"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50}; let pictureForm = Api.CreatePictureForm(pictureFormPr); ``` */
  export type PictureFormPr = FormPrBase | PictureFormPrBase;

  /** Specific picture form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPr = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr); ``` */
  export interface PictureFormPrBase {
    scaleFlag: ScaleFlag;
    lockAspectRatio: boolean;
    respectBorders: boolean;
    shiftX: percentage;
    shiftY: percentage;
  }

  /** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "pdf"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
  export type PositiveFixedAngle = number;

  /** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "pdf"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
  export type PositivePercentage = number;

  /** The available preset color names.  ## Try it   ```js document-builder={"documentType": "pdf"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
  export type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

  /** The reading order (left-to-right or right-to-left). */
  export type ReadingOrder = "ltr" | "rtl";

  /** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetHorAlign("page", "center"); ``` */
  export type RelFromH = "character" | "column" | "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetVerAlign("page", "center"); ``` */
  export type RelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page" | "line" | "paragraph";

  /** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
  export interface ReviewReport {
    username?: UserReviewChanges;
  }

  /** Record of one review change.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export interface ReviewReportRecord {
    Type: ReviewReportRecordType;
    Value?: string;
    Date: number;
    ReviewedElement: ApiParagraph | ApiTable;
  }

  /** Review record type.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
  export type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

  /** The role properties. */
  export interface RoleProperties {
    color: string;
  }

  /** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "pdf"} pictureForm.SetScaleFlag("tooBig"); ``` */
  export type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

  /** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "pdf"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
  export type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

  /** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "pdf"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
  export type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

  /** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
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

  /** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "pdf"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
  export type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

  /** The shading information object. */
  export interface Shd {
    Type: ShdType;
    Color: ApiColor;
  }

  /** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "pdf"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
  export type ShdType = "nil" | "clear";

  /** The possible values for the base which the relative horizontal size of an object will be calculated from. */
  export type SizeRelFromH = "insideMargin" | "leftMargin" | "rightMargin" | "margin" | "outsideMargin" | "page";

  /** The possible values for the base which the relative vertical size of an object will be calculated from. */
  export type SizeRelFromV = "bottomMargin" | "insideMargin" | "topMargin" | "margin" | "outsideMargin" | "page";

  /** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "pdf"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
  export type StyleType = "paragraph" | "table" | "run" | "numbering";

  /** Custom tab types.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
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

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "pdf"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "pdf"} tableCell.SetWidth("twips", 2000); ``` */
  export type TableWidth = "auto" | "twips" | "nul" | "percent";

  /** The available text flow direction inside a drawing content. */
  export type TextFlowDirection = "lrtb" | "tbrl" | "btlr";

  /** The text field format data. */
  export interface TextFormFormat {
    type: "none" | "digit" | "letter" | "mask" | "regExp";
    value?: string;
  }

  /** Properties for inserting a text field.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false}; doc.InsertTextForm(textFormInsertPr); ``` */
  export type TextFormInsertPr = FormPrBase | TextFormPrBase | FormInsertPr;

  /** Text field properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false}; let textForm = Api.CreateTextForm(textFormPr); ``` */
  export type TextFormPr = FormPrBase | TextFormPrBase;

  /** Specific text field properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormPrBase = {"comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false}; let textForm = Api.CreateTextForm(textFormPrBase); ``` */
  export interface TextFormPrBase {
    comb: boolean;
    maxCharacters: number;
    cellWidth: number;
    multiLine: boolean;
    autoFit: boolean;
  }

  /** Text transform type.  ## Try it   ```js document-builder={"documentType": "pdf"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
  export type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

  /** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetVertAxisMajorTickMark("cross"); ``` */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Options for converting document content to an HTML string. */
  export interface ToHtmlOptions {
    HtmlHeadings?: boolean;
    Base64img?: boolean;
    DemoteHeadings?: boolean;
    RenderHTMLTags?: boolean;
  }

  /** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocBuildFromPr {
    OutlineLvlStart?: number;
    OutlineLvls?: number;
    StylesLvls: TocStyleLvl[];
  }

  /** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "pdf"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export type TocLeader = "dot" | "dash" | "underline" | "none";

  /** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: TocBuildFromPr;
    TocStyle?: TocStyle;
  }

  /** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
  export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

  /** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
  export interface TocStyleLvl {
    Name: string;
    Lvl: number;
  }

  /** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
  export interface TofPr {
    ShowPageNums?: boolean;
    RightAlgn?: boolean;
    LeaderType?: TocLeader;
    FormatAsLinks?: boolean;
    BuildFrom?: CaptionLabel | string;
    LabelNumber?: boolean;
    TofStyle?: TofStyle;
  }

  /** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "pdf"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
  export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

  /** Represents a user's comment history. */
  export interface UserComments {
    comments: CommentReportRecord[];
  }

  /** Represents a user's review history. */
  export interface UserReviewChanges {
    reviews: ReviewReportRecord[];
  }

  /** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetVerticalTextAlign("top"); ``` */
  export type VerticalTextAlign = "top" | "center" | "bottom";

  /** The watermark direction.  ## Try it   ```js document-builder={"documentType": "pdf"} watermarkSettings.SetDirection("clockwise45"); ``` */
  export type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45" | "clockwise90" | "counterclockwise90";

  /** The watermark type.  ## Try it   ```js document-builder={"documentType": "pdf"} watermarkSettings.SetType("text"); ``` */
  export type WatermarkType = "none" | "text" | "image";

  /** This element specifies the information which shall be used to establish a mapping to an XML element stored within a Custom XML. */
  export interface XmlMapping {
    prefixMapping: string;
    xpath: string;
    storeItemID: string;
  }

  /** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "pdf"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.SetHighlight("green"); ``` */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "pdf"} textPr.SetFontSize(22); ``` */
  export type hps = number;

  /** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetSpacingLine(240, "auto"); ``` */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "pdf"} textForm.SetCellWidth(7); ``` */
  export type mm = number;

  /** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
  export type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

  /** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "pdf"} pictureForm.SetPicturePosition(70, 70); ``` */
  export type percentage = number;

  /** A point.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
  export type pt = number;

  /** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
  export type pt_8 = number;

  /** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.SetEqualColumns(2, 720); ``` */
  export type twips = number;

  /** Base class */
  export interface Api {
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;
    CreateCheckBoxForm(formPr: CheckBoxFormPr): ApiCheckBoxForm;
    CreateComboBoxForm(formPr: ComboBoxFormPr): ApiComboBoxForm;
    CreateComplexForm(formPr: FormPrBase): ApiComplexForm;
    CreateDateForm(formPr: DateFormPr): ApiDateForm;
    CreatePictureForm(formPr: PictureFormPr): ApiPictureForm;
    CreateSignatureForm(formPr: FormPrBase): ApiSignatureForm;
    CreateTextForm(formPr: TextFormPr): ApiTextForm;
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

  /** Class representing a document checkbox / radio button. */
  export interface ApiCheckBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  }

  /** Class representing a document combo box / dropdown list. */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  }

  /** Class representing a comment reply. */
  export interface ApiCommentReply {
  }

  /** Class representing a complex field. */
  export interface ApiComplexForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiDocument extends ApiDocumentContent {
    ClearAllFields(): boolean;
    GetAllForms(): ApiForm[];
    GetFormKeysByRole(role: string): string[];
    GetFormRoles(): ApiFormRoles;
    GetFormValueByKey(key: string): null | boolean | string;
    GetFormsByKey(key: string): ApiForm[];
    GetFormsByRole(role: string): ApiForm[];
    GetFormsByTag(sTag: string): ApiForm[];
    GetFormsData(): FormData[];
    GetFormsHighlight(): ApiColor | null;
    GetTagsOfAllForms(): string[];
    InsertTextForm(formPr: TextFormInsertPr): ApiTextForm;
    SetFormsData(arrData: FormData[]): boolean;
    SetFormsHighlight(color: ApiColor): boolean;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
  }

  /** Class representing a drop cap. A drop cap is a large initial letter that is split off from a paragraph into a separate framed paragraph. */
  export interface ApiDropCap {
  }

  /** Class representing a base class for fill. */
  export interface ApiFill {
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

  /** Class representing a collection of form roles. */
  export interface ApiFormRoles {
    Add(name: string, props: RoleProperties): boolean;
    GetAllRoles(): string[];
    GetCount(): number;
    GetRoleColor(name: string): null | object;
    HaveRole(name: string): boolean;
    MoveDown(name: string): boolean;
    MoveUp(name: string): boolean;
    Remove(name: string, delegateRole?: string): boolean;
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

  /** Class representing a document picture form. */
  export interface ApiPictureForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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
  export interface ApiPresetColor extends ApiUniColor {
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends ApiUniColor {
  }

  /** Class representing a continuous region in a document.  Each Range object is determined by the position of the start and end characters. */
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

  /** Class representing a document picture form. */
  export interface ApiSignatureForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
  export interface ApiTableStylePr {
  }

  /** Class representing a document text field. */
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
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

// ---- src/generated/pdf.ts ----
// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: pdf

declare namespace Pdf {
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

  /** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface. */
  export type BlipFillType = "tile" | "stretch";

  /** The border properties object. */
  export interface Border {
    Type: BorderType;
    Size: pt_8;
    Space: number;
    Color: ApiColor;
  }

  /** A border type which will be added to the document element. <b>"none"</b> - no border will be added to the created element or the selected element side. <b>"single"</b> - a single border will be added to the created element or the selected element side. */
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

  /** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic. */
  export type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

  /** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark. */
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

  /** Degree defines an angle in degrees. Can be any finite number (positive or negative). */
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

  /** Form type. The available form types. */
  export type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm" | "complexForm" | "dateForm" | "signatureForm";

  /** FreeText callout coordinates (Array of 3 points). */
  export interface FreeTextCallout {
    0: Point;
    1: Point;
    2: Point;
  }

  /** The available free text annot intent. */
  export type FreeTextIntent = "freeText" | "freeTextCallout";

  /** The coordinate value for the geometry paths. Can be a guide name from "gdLst", a numeric value, or a string representation of a number. */
  export type GeometryCoordinate = string | number;

  /** This type specifies the formula type that will be used for a geometry guide. */
  export type GeometryFormulaType = "*/" | "+-" | "+/" | "?:" | "abs" | "at2" | "cat2" | "cos" | "max" | "min" | "mod" | "pin" | "sat2" | "sin" | "sqrt" | "tan" | "val";

  /** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default). */
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

  /** NumberNegStyle defines the formatting style for negative numbers:  - "black-minus" — "-1,234.56" (black minus sign) - "red-minus"   — "-1,234.56" (red minus sign) - "black-parens" — "(1,234.56)"" (black parentheses) - "red-parens"   — "(1,234.56)"" (red parentheses) */
  export type NumberNegStyle = "black-minus" | "red-minus" | "black-parens" | "red-parens";

  /** NumberSepStyle — defines number formatting style: - "us"        — 1,234.56   (English style) - "plain"     — 1234.56    (No separators) - "euro"      — 1.234,56   (European style) - "europlain" — 1234,56    (European without separators) - "ch"        — 1'234.56   (Swiss style) */
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

  /** PsfFormat defines the type of formatting to apply:  - "zip"       — ZIP code (e.g., 12345) - "zip+4"     — ZIP+4 (e.g., 12345-6789) - "phone"     — Phone number (e.g., (123) 456-7890) - "ssn"       — Social Security Number (e.g., 123-45-6789) */
  export type PsfFormat = "zip" | "zip+4" | "phone" | "ssn";

  /** Quadrilateral represented as a flat tuple of vertices. Vertices order is fixed:  · left-top → right-top → left-bottom → right-bottom  Invariants:  · x1 <= x2 (top edge goes left → right)  · x3 <= x4 (bottom edge goes left → right)  · y1 <= y3 (left edge goes top → bottom)  · y2 <= y4 (right edge goes top → bottom) */
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

  /** Axis-aligned rectangle represented as a tuple.  Invariants:  - rect[0] < rect[2] (x1 < x2)  - rect[1] < rect[3] (y1 < y2) */
  export interface Rect {
    0: number;
    1: number;
    2: number;
    3: number;
  }

  /** Axis-aligned rectangle difference represented as a tuple. Describes coordinate-wise deltas between two rectangles (B - A).  Invariants:  - diff[0] = x1B - x1A  - diff[1] = y1B - y1A  - diff[2] = x2B - x2A  - diff[3] = y2B - y2A */
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

  /** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
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

  /** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table. */
  export type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

  /** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container. */
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

  /** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values. */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /** The type of tick mark appearance. */
  export type TickMark = "cross" | "in" | "none" | "out";

  /** Time format options: - "HH:MM" — 24-hour format, hours and minutes (e.g., "14:30") - "h:MM tt" — 12-hour format with AM/PM, hours and minutes (e.g., "2:30 PM") - "HH:MM:ss" — 24-hour format, hours, minutes, and seconds (e.g., "14:30:15") - "h:MM:ss tt" — 12-hour format with AM/PM, hours, minutes, and seconds (e.g., "2:30:15 PM") */
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

  /** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______" */
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

  /** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

  /** A numeric value from 0 to 255. */
  export type byte = number;

  /** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

  /** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected. */
  export type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

  /** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected. */
  export type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

  /** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
  export type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

  /** Available highlight colors. */
  export type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

  /** Half-points (2 half-points = 1 point). */
  export type hps = number;

  /** 240ths of a line. */
  export type line240 = number;

  /** 1 millimetre equals 1/10th of a centimetre. */
  export type mm = number;

  /** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position. */
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

  /** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
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

// ---- src/word-methods.d.ts ----
/**
 * ONLYOFFICE Text Document API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/
 */

interface CommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: CommentReply[];
}

interface CommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface Color {
    A: number;
    B: number;
    G: number;
    R: number;
}

type ContentControlLock = 0 | 1 | 2 | 3;

interface ContentControlProperties {
    Id?: number;
    Tag: string;
    Remove?: number;
    Alias?: string;
    Appearance?: number;
    Border?: {Color: Color};
    Color?: Color;
    InternalId?: string;
    Lock?: ContentControlLock;
    PlaceHolderText?: string;
    Shd?: {Color: Color};
}

interface ContentControlListItem {
    Text: string;
    Value: string;
}

interface ContentControlCheckBoxProperties {
    Checked?: boolean;
    CheckedSymbol?: number;
    UncheckedSymbol?: number;
    Id?: number;
    Tag?: string;
    Lock?: number;
}

interface ContentControlDatePickerProperties {
    DateFormat?: string;
    Date?: string | Date;
    Id?: number;
    Tag?: string;
    Lock?: number;
}

interface AddinFieldData {
    FieldId: string;
    Value: string;
    Content: string;
}

interface ContentControlListElement {
    Display: string;
    Value: string;
}

interface TextAnnotationRange {
    start: number;
    length: number;
    id: string;
}

interface OLEProperties {
    data?: string;
    imgSrc?: string;
    guid?: string;
    width?: number;
    height?: number;
    widthPix?: number;
    heightPix?: number;
    Data?: string;
    ImageData?: string;
    ApplicationId?: string;
    InternalId?: string;
    ParaDrawingId?: string;
    Width?: number;
    Height?: number;
    WidthPix?: number;
    HeightPix?: number;
}

interface InstallPluginConfig {
    guid: string;
    name: string;
    nameLocale?: Record<string, string>;
    description?: string;
    descriptionLocale?: Record<string, string>;
    version?: string;
    url?: string;
    icons?: string;
    isVisual?: boolean;
    isModal?: boolean;
    isInsideMode?: boolean;
    Variations?: any[];
}

interface OleObjectData {
    Data: string;
    InternalId: string;
    Width?: number;
    Height?: number;
    ImageUrl?: string;
    AppId?: string;
}

interface SearchAndReplaceOptions {
    ReplaceStr?: string;
    IsMatchCase?: boolean;
    IsWholeWord?: boolean;
}

interface SetEditingRestrictionsOptions {
    Type: "readOnly" | "comments" | "formFields" | "trackedChanges" | "contentTypes" | "nothing";
}

interface SetPropertiesOptions {
    Title?: string;
    Author?: string;
    Creator?: string;
    Description?: string;
    Keywords?: string;
    Subject?: string;
    Category?: string;
    Version?: string;
}

interface InputTextOptions {
    Text: string;
}

interface GetFileToDownloadOptions {
    Url?: string;
    Format?: "docx" | "pdf" | "odt" | "rtf" | "txt" | "html" | "doc" | "xlsx" | "pptx";
    Name?: string;
}

interface ConvertDocumentOptions {
    To: "html" | "markdown";
    async?: boolean;
}

interface GetFormValueOptions {
    Tag: string;
    CheckBoxValue?: boolean;
    DatePickerValue?: string;
    DropDownValue?: string;
    TextValue?: string;
}

interface SetFormValueOptions {
    Tag: string;
    CheckBoxValue?: boolean;
    DatePickerValue?: string;
    DropDownValue?: string;
    TextValue?: string;
}

interface InsertAndReplaceContentControlsOptions {
    Items: ContentControlProperties[];
}

interface GetFormsByTagOptions {
    Tag: string;
}

interface ChangeOleObjectOptions {
    Data: string;
    InternalId: string;
}

interface ChangeCommentOptions {
    Id: string;
    CommentData: CommentData;
}

interface MoveToCommentOptions {
    Id: string;
}

interface RemoveCommentsOptions {
    Id?: string;
}

interface ReplaceTextSmartOptions {
    Text: string[];
}

interface MouseMoveWindowOptions {
    X: number;
    Y: number;
    Event: MouseEvent;
}

interface MouseUpWindowOptions {
    X: number;
    Y: number;
    Event: MouseEvent;
}

interface OnDropEventOptions {
    X: number;
    Y: number;
    Effect: number;
    DropAction: number;
    Html: string;
    Text: string;
    Files: any[];
}

interface ShowInputHelperOptions {
    Name: string;
    Items: InputHelperItem[];
    AtX?: number;
    AtY?: number;
}

interface InputHelperItem {
    Name: string;
    Text: string;
    Value?: string;
    id?: string;
}

interface SetPluginsOptions {
    plugins?: Record<string, any>;
    pluginName?: string;
}

interface SetMacrosOptions {
    Libs?: string[];
    Name?: string;
    Macros?: string;
}

interface InstallPluginOptions {
    guid: string;
    Variations?: any[];
    name: string;
    nameLocale?: Record<string, string>;
    description?: string;
    descriptionLocale?: Record<string, string>;
    version?: string;
    url?: string;
    icons?: string;
    isVisual?: boolean;
    isModal?: boolean;
    isInsideMode?: boolean;
}

interface RemovePluginOptions {
    guid: string;
}

interface StartActionOptions {
    Type: "StartFilling" | "StopFilling";
}

interface ShowButtonOptions {
    Name: string;
    Visible: boolean;
}

interface ShowErrorOptions {
    Type: "info" | "warning" | "error";
    Description: string;
    Method?: string;
}

interface OpenFileOptions {
    Url: string;
}

interface OnEncryptionOptions {
    Type: "encrypt" | "decrypt" | "protect" | "unprotect";
    Password?: string;
}

interface PutImageDataToSelectionOptions {
    ImageData: ImageData;
    Width?: number;
    Height?: number;
}

interface ImageData {
    Data: string;
    Width?: number;
    Height?: number;
    FromUrl?: boolean;
}

interface AnnotateParagraphOptions {
    Text: string;
    Username?: string;
    UserId?: string;
}

interface SetDisplayModeInReviewOptions {
    Mode: "final" | "original" | "markup";
}

interface RemoveAnnotationRangeOptions {
    Id: string;
    Start: number;
    End: number;
}

interface SelectAnnotationRangeOptions {
    Id: string;
    Start: number;
    End: number;
}

interface UpdateAddinFieldsOptions {
    Data: Record<string, any>;
}

type WordMethodArgs = {
    // Methods A
    AcceptReviewChanges: [boolean?];
    AddAddinField: [AddinFieldData];
    AddComment: [CommentData];
    AddContentControl: [type: 1 | 2 | 3 | 4, commonPr?: ContentControlProperties];
    AddContentControlCheckBox: [checkBoxPr?: ContentControlCheckBoxProperties, commonPr?: ContentControlProperties];
    AddContentControlDatePicker: [datePickerPr?: ContentControlDatePickerProperties, commonPr?: ContentControlProperties];
    AddContentControlList: [type: 0 | 1, List?: ContentControlListElement[], commonPr?: ContentControlProperties];
    AddContentControlPicture: [commonPr?: ContentControlProperties];
    AddOleObject: [data: OLEProperties];
    AnnotateParagraph: [data: {
        type: string;
        name?: string;
        paragraphId: string;
        recalcId: string;
        ranges?: TextAnnotationRange[];
    }];
    
    // Methods C
    CanRedo: [];
    CanUndo: [];
    ChangeComment: [id: string, commentData: CommentData];
    ChangeOleObject: [data: OLEProperties];
    ChangeOleObjects: [data: OLEProperties[]];
    CoAuthoringChatSendMessage: [message: any];
    ConvertDocument: [sConvertType: "markdown" | "html", bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean];
    
    // Methods E
    EditOleObject: [data: OLEProperties];
    EndAction: [sType: string, description?: string | {scrollToTarget?: boolean}, sCustomMessage?: string];
    
    // Methods F
    FocusEditor: [];
    
    // Methods G
    GetAllAddinFields: [];
    GetAllComments: [null?];
    GetAllContentControls: [];
    GetAllForms: [];
    GetAllOleObjects: [sPluginId: string];
    GetCurrentAddinField: [];
    GetCurrentBookmark: [];
    GetCurrentContentControl: [];
    GetCurrentContentControlPr: [];
    GetCurrentSentence: [sScope?: string];
    GetCurrentWord: [sScope?: string];
    GetDocumentLang: [];
    GetFields: [null?];
    GetFileHTML: [null?];
    GetFileToDownload: [sFormat: string];
    GetFontList: [null?];
    GetFormValue: [sInternalId: string];
    GetFormsByTag: [sTag: string];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?] | null;
    GetMacros: [];
    GetSelectedContent: [];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; ParaSeparator?: string; TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [] | null;
    
    // Methods I
    InputText: [sText: string, sText2?: string];
    InsertAndReplaceContentControls: [aDocuments: any[]];
    InsertOleObject: [oOleObj: OLEProperties, bIsAdd?: boolean];
    InstallPlugin: [oConfig?: any];
    
    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];
    MoveCursorOutsideField: [fieldId: string, isBegin?: boolean];
    MoveCursorToContentControl: [sInternalId: string, bMoveToContentControl?: boolean];
    MoveCursorToEnd: [bMoveToEnd?: boolean];
    MoveCursorToField: [fieldId: string, isBegin?: boolean];
    MoveCursorToStart: [bMoveToStart?: boolean];
    MoveToComment: [sId: string];
    MoveToNextReviewChange: [bAccept?: boolean];
    
    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];
    OpenFile: [aBytes: any, aParams: any[]];
    
    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];
    
    // Methods R
    Redo: [];
    RejectReviewChanges: [bIsAll?: boolean];
    RemoveAnnotationRange: [oData: { paragraphId: string; rangeId: string; name: string }];
    RemoveComments: [aIds: string[]];
    RemoveContentControl: [sInternalId: string];
    RemoveContentControls: [aIds: any[]];
    RemoveFieldWrapper: [sFieldId: string];
    ResizeWindow: [sWindowId: string, aSize: number[]];
    RemoveOleObject: [sInternalId: string];
    RemoveOleObjects: [aIds: any[]];
    RemovePlugin: [sGuid: string, sBackup: string];
    RemoveSelectedContent: [];
    ReplaceCurrentSentence: [sText: string, sScope?: string];
    ReplaceCurrentWord: [sText: string, sScope?: string];
    ReplaceTextSmart: [aStrings: string[], sParaSeparator?: string, sTabSymbol?: string];
    
    // Methods S
    SearchAndReplace: [oProps: { searchString: string; replaceString: string; matchCase?: boolean }];
    SearchNext: [oProps: { searchString: string; matchCase?: boolean }, bSelect?: boolean];
    SelectAddinField: [sInternalId: string];
    SelectAnnotationRange: [oData: { paragraphId: string; rangeId: string; name: string }];
    SelectContentControl: [sInternalId: string];
    SelectOleObject: [sInternalId: string];
    SetDisplayModeInReview: [sMode: string];
    SetEditingRestrictions: [sType: string];
    SetFormValue: [sInternalId: string, value: string | boolean];
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: string, description: string | { lockScroll?: boolean, keepSelection?: boolean }];
    
    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    Undo: [];
    UpdateAddinFields: [aData: AddinFieldData[]];
    UpdatePlugin: [oConfig?: any];

    // Common plugin methods
    CloseWindow: [windowId: string | number];
};

type WordMethodName = keyof WordMethodArgs;

type WordMethodReturn<T extends WordMethodName> = 
    T extends "AddComment" ? string | null :
    T extends "CanRedo" | "CanUndo" | "SearchNext" | "ReplaceTextSmart" ? boolean :
    T extends "GetSelectedText" | "GetCurrentWord" | "GetCurrentSentence" | "GetDocumentLang" | "GetFields" | "GetFileHTML" | "GetFileToDownload" | "ConvertDocument" | "GetSelectedContent" | "GetVBAMacros" | "GetVersion" ? string :
    T extends "GetFormValue" ? null | string | boolean :
    T extends "GetCurrentContentControl" ? string :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    T extends "RemoveContentControl" ? any :
    T extends "InsertAndReplaceContentControls" ? any[] :
    /** Raw JSON string - the caller must JSON.parse() it into { current: number, macrosArray: {...}[] } */
    T extends "GetMacros" ? string : any;

// ---- src/cell-methods.d.ts ----
/**
 * ONLYOFFICE Spreadsheet API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/spreadsheet-api/Methods/
 */

interface CellCommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: CellCommentReply[];
}

interface CellCommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface CellOLEProperties {
    data?: string;
    imgSrc?: string;
    guid?: string;
    width?: number;
    height?: number;
    widthPix?: number;
    heightPix?: number;
    Data?: string;
    ImageData?: string;
    ApplicationId?: string;
    InternalId?: string;
    Width?: number;
    Height?: number;
    WidthPix?: number;
    HeightPix?: number;
}

interface CellInstallPluginConfig {
    guid: string;
    name: string;
    nameLocale?: Record<string, string>;
    description?: string;
    descriptionLocale?: Record<string, string>;
    version?: string;
    url?: string;
    icons?: string;
    isVisual?: boolean;
    isModal?: boolean;
    isInsideMode?: boolean;
    Variations?: any[];
}

interface CellImageData {
    src: string;
    width: number;
    height: number;
    fromUrl?: boolean;
}

/** "none" - nothing selected, "text" - cell(s) selected, "drawing" - drawing selected */
type CellSelectionType = "none" | "text" | "drawing";

type CellMethodArgs = {
    // Methods A
    AddComment: [oCommentData: CellCommentData];
    AddOleObject: [data: CellOLEProperties];

    // Methods C
    ChangeComment: [sCommentId: string, oCommentData: CellCommentData];
    CoAuthoringChatSendMessage: [message: any];

    // Methods E
    EditOleObject: [data: CellOLEProperties];
    EndAction: [sType: string, description?: string | {scrollToTarget?: boolean}, sCustomMessage?: string];

    // Methods F
    FocusEditor: [];

    // Methods G
    GetAllComments: [null?];
    GetCustomFunctions: [];
    GetFileToDownload: [sFormat: "xlsx" | "pdf" | "csv" | "ods" | "xls" | "txt" | "html" | string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    /**
     * The docs Parameters section says this method takes no parameters, but the
     * page's own Example passes [JSON.stringify(Content)] as the first arg
     * (verified against both the live docs page and the source .md in
     * ONLYOFFICE/api.onlyoffice.com - looks like a copy/paste leftover from the
     * SetMacros example). Made optional so both the documented no-arg usage and
     * the real (if likely erroneous) doc example type-check.
     */
    GetMacros: [data?: any];
    /** docs: `prop` is a required object; `prop.type` ("text" | "html", default "text") is optional */
    GetSelectedContent: [prop: { type?: "text" | "html" }];
    GetSelectedOleObjects: [];
    GetSelectedText: [oPr?: { Numbering?: boolean; Math?: boolean; TableCellSeparator?: string; ParaSeparator?: string; TabSymbol?: string }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [];

    // Methods I
    InputText: [sText: string, sText2?: string];
    InstallPlugin: [oConfig?: CellInstallPluginConfig];

    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];

    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];
    OpenFile: [aBytes: any, aParams: any[]];

    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];

    // Methods R
    RemoveComments: [aIds: string[]];
    RemoveOleObject: [sInternalId: string];
    RemovePlugin: [sGuid: string, sBackup: string];
    ReplaceTextSmart: [aStrings: string[], sTabSymbol?: string, sNewLineSeparator?: string];
    ResizeWindow: [sWindowId: string, aSize: number[]];

    // Methods S
    SetCustomFunctions: [sCode: string];
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    ShowError: [sType: string, sDescription: string, sMethod?: string];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: "Information" | "Block" | "GroupActions", description?: string | { lockScroll?: boolean; keepSelection?: boolean }];

    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    UpdatePlugin: [oConfig?: CellInstallPluginConfig];
};

type CellMethodName = keyof CellMethodArgs;

type CellMethodReturn<T extends CellMethodName> =
    T extends "AddComment" ? string | null :
    T extends "ChangeComment" ? boolean :
    T extends "GetSelectedText" | "GetCustomFunctions" | "GetFileToDownload" | "GetVersion" | "GetSelectedContent" ? string :
    T extends "GetVBAMacros" ? string | null :
    T extends "GetSelectionType" ? CellSelectionType :
    /** Raw JSON string - the caller must JSON.parse() it into { current: number, macrosArray: {...}[] } */
    T extends "GetMacros" ? string :
    T extends "GetImageDataFromSelection" ? CellImageData :
    T extends "GetSelectedOleObjects" ? CellOLEProperties[] :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    T extends "ReplaceTextSmart" ? boolean :
    any;

// ---- src/slide-methods.d.ts ----
/**
 * ONLYOFFICE Presentation API Methods Type Definitions
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/
 */

interface SlideCommentData {
    UserName: string;
    Text: string;
    QuoteText?: string;
    Time?: string;
    Solved?: boolean;
    Replies?: SlideCommentReply[];
}

interface SlideCommentReply {
    UserName: string;
    Text: string;
    Time?: string;
    Solved?: boolean;
}

interface SlideOLEProperties {
    data?: string;
    imgSrc?: string;
    guid?: string;
    /** Used by EditOleObject's example to reference the existing OLE object being edited. */
    objectId?: string;
    width?: number;
    height?: number;
    widthPix?: number;
    heightPix?: number;
    Data?: string;
    ImageData?: string;
    ApplicationId?: string;
    InternalId?: string;
    Width?: number;
    Height?: number;
    WidthPix?: number;
    HeightPix?: number;
}

interface SlideInstallPluginConfig {
    guid: string;
    name: string;
    nameLocale?: Record<string, string>;
    description?: string;
    descriptionLocale?: Record<string, string>;
    version?: string;
    url?: string;
    icons?: string;
    isVisual?: boolean;
    isModal?: boolean;
    isInsideMode?: boolean;
    Variations?: any[];
}

/**
 * Shape returned by GetImageDataFromSelection - verified against
 * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/GetImageDataFromSelection/
 * whose example reads `result.src`/`result.width`/`result.height` (lowercase),
 * matching PutImageDataToSelection's input shape - not the capitalized
 * Data/Width/Height/FromUrl this interface previously declared.
 */
interface SlideImageData {
    src: string;
    width?: number;
    height?: number;
    fromUrl?: boolean;
}

/** "none" - nothing selected, "text" - text selected, "shape"/"image"/"chart"/"table" - drawing selected */
type SlideSelectionType = "none" | "text" | "shape" | "image" | "chart" | "table" | string;

type SlideMethodArgs = {
    // Methods A
    AddComment: [oCommentData: SlideCommentData];
    AddOleObject: [data: SlideOLEProperties];
    ApplyTheme: [themeIndexOrName: number | string];

    // Methods C
    ChangeComment: [sCommentId: string, oCommentData: SlideCommentData];
    CoAuthoringChatSendMessage: [message: any];

    // Methods E
    EditOleObject: [data: SlideOLEProperties];
    EndAction: [sType: string, description?: string | { scrollToTarget?: boolean }, sCustomMessage?: string];
    EndSlideShow: [];

    // Methods F
    FocusEditor: [];

    // Methods G
    GetAllComments: [null?];
    GetDocumentLang: [];
    GetEditorThemes: [null?];
    /** format is Optional per docs (default " "), not Required as previously declared - see GetFileToDownload doc page. */
    GetFileToDownload: [sFormat?: "pptx" | "pdf" | "odp" | "png" | "jpg" | string];
    GetFontList: [null?];
    GetImageDataFromSelection: [];
    GetInstalledPlugins: [null?];
    /**
     * The Parameters table says "no parameters", but the doc page's own example calls
     * `executeMethod("GetMacros", [JSON.stringify(Content)], ...)` - widened to accept
     * that optional arg so the real example type-checks. See:
     * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/GetMacros/
     */
    GetMacros: [oContent?: string];
    /**
     * Parameters table on the doc page requires a `prop` object (`{ type?: "text" | "html" }`);
     * previously declared with no params at all. No live example exists for this method.
     */
    GetSelectedContent: [prop: { type?: "text" | "html" }];
    GetSelectedOleObjects: [];
    /**
     * Widened to match all fields shown in the doc page's Parameters table and used by its
     * example object literal (Numbering, Math, TableCellSeparator, etc.) - the previous shape
     * only had ParaSeparator/TabSymbol, which caused excess-property errors on the real example.
     */
    GetSelectedText: [oPr?: {
        Numbering?: boolean;
        Math?: boolean;
        TableCellSeparator?: string;
        TableRowSeparator?: string;
        ParaSeparator?: string;
        TabSymbol?: string;
        NewLineSeparator?: string;
    }];
    GetSelectionType: [];
    GetVBAMacros: [];
    GetVersion: [];
    GoToNextSlideInSlideShow: [];
    GoToPreviousSlideInSlideShow: [];
    GoToSlide: [slideNumber: number];
    GoToSlideInSlideShow: [nSlideIndex: number];

    // Methods I
    InputText: [sText: string, sText2?: string];
    InstallPlugin: [oConfig?: SlideInstallPluginConfig];

    // Methods M
    MouseMoveWindow: [sGuid: string, X: number, Y: number];
    MouseUpWindow: [sGuid: string, X: number, Y: number];

    // Methods O
    OnDropEvent: [oData: { type?: string; x?: number; y?: number; html?: string; text?: string; files?: any[] }];
    OnEncryption: [oData: { type: string; password?: string; docinfo?: string; hash?: string }];

    // Methods P
    PasteHtml: [sHtml: string];
    PasteText: [sText: string];
    PauseSlideShow: [];
    PutImageDataToSelection: [oImageData: { src: string; width: number; height: number; fromUrl?: boolean }];

    // Methods R
    RemoveComments: [aIds: string[]];
    RemoveOleObject: [sInternalId: string];
    RemovePlugin: [sGuid: string, sBackup: string];
    /** Param order/names per doc page: arrString, then tab separator, then paragraph/newline separator. */
    ReplaceTextSmart: [aStrings: string[], sParaTab?: string, sParaNewLine?: string];
    ResumeSlideShow: [];

    // Methods S
    SetMacros: [sData: string];
    SetPluginsOptions: [oData: any];
    SetProperties: [oProps: any];
    ShowButton: [sBtn: string, bVisible: boolean, sAlign?: string];
    /**
     * Previous shape (sType, sDescription, sMethod?) didn't match the docs at all - the real
     * signature is (error message string, numeric level: -1 or 0). See:
     * https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/ShowError/
     */
    ShowError: [sError: string, nLevel: number];
    ShowInputHelper: [sGuid: string, w: number, h: number, isKeyboardTake: boolean];
    StartAction: [sType: string, description?: string | { lockScroll?: boolean; keepSelection?: boolean }];
    StartSlideShow: [];

    // Methods U
    UnShowInputHelper: [sGuid: string, bIsKeyboardTake?: boolean];
    UpdatePlugin: [oConfig?: SlideInstallPluginConfig];
};

type SlideMethodName = keyof SlideMethodArgs;

type SlideMethodReturn<T extends SlideMethodName> =
    T extends "AddComment" ? string | null :
    T extends "ApplyTheme" | "ReplaceTextSmart" ? boolean :
    T extends "ChangeComment" ? boolean :
    T extends "GetSelectedText" | "GetFileToDownload" | "GetVersion" | "GetSelectedContent" | "GetDocumentLang" ? string :
    T extends "GetVBAMacros" ? string | null :
    T extends "GetSelectionType" ? SlideSelectionType :
    /** Raw JSON string - the caller must JSON.parse() it into { current: number, macrosArray: {...}[] } */
    T extends "GetMacros" ? string :
    T extends "GetImageDataFromSelection" ? SlideImageData :
    T extends "GetSelectedOleObjects" ? SlideOLEProperties[] :
    T extends "GetAllComments" ? SlideCommentData[] :
    T extends "GetEditorThemes" ? object[] :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    any;

// ---- src/pdf-methods.d.ts ----
/**
 * ONLYOFFICE PDF Plugin API method definitions.
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/pdf-api/Methods/
 */

interface PdfPageImageOptions {
    maxSize?: number;
    annotations?: boolean;
    fields?: boolean;
    drawings?: boolean;
}

interface PdfReplaceXmlOptions {
    content: string[];
}

interface PdfReplaceHtmlOptions {
    content: string;
    separateParagraphs: boolean;
}

interface PdfReplacePageContentOptions {
    type: "xml" | "html";
    options: PdfReplaceXmlOptions | PdfReplaceHtmlOptions;
}

type PdfMethodArgs = {
    CoAuthoringChatSendMessage: [message: unknown];
    EndAction: [type: string, description?: string | {scrollToTarget?: boolean}, customMessage?: string];
    FocusEditor: [];
    GetAllComments: [null?];
    GetCurrentPage: [];
    GetFileToDownload: [format?: string];
    GetFontList: [null?];
    GetInstalledPlugins: [null?];
    GetMacros: [content?: string];
    GetPageImage: [page: number, options?: PdfPageImageOptions];
    GetSelectedText: [options?: {
        Numbering?: boolean;
        Math?: boolean;
        TableCellSeparator?: string;
        TableRowSeparator?: string;
        ParaSeparator?: string;
        TabSymbol?: string;
        NewLineSeparator?: string;
    }];
    GetVersion: [];
    GoToPage: [page: number, rect?: number[]];
    InstallPlugin: [config?: Record<string, unknown>];
    MouseMoveWindow: [guid: string, x: number, y: number];
    MouseUpWindow: [guid: string, x: number, y: number];
    OnDropEvent: [data: Record<string, unknown>];
    PasteHtml: [html: string];
    PasteText: [text: string];
    RemovePlugin: [guid: string, backup: string];
    ReplacePageContent: [page: number, options: PdfReplacePageContentOptions];
    SetMacros: [data: string];
    SetPluginsOptions: [data: unknown];
    SetProperties: [properties: unknown];
    ShowButton: [button: string, visible: boolean, align?: string];
    ShowError: [error: string, level: number];
    ShowInputHelper: [guid: string, width: number, height: number, isKeyboardTake: boolean];
    StartAction: [type: string, description?: string | {lockScroll?: boolean; keepSelection?: boolean}];
    UnShowInputHelper: [guid: string, isKeyboardTake?: boolean];
    UpdatePlugin: [config?: Record<string, unknown>];
};

type PdfMethodName = keyof PdfMethodArgs;

type PdfMethodReturn<T extends PdfMethodName> =
    T extends "GetCurrentPage" ? number :
    T extends "GetFileToDownload" | "GetSelectedText" | "GetVersion" ? string :
    T extends "GetPageImage" ? HTMLCanvasElement :
    T extends "GoToPage" | "ReplacePageContent" ? boolean :
    T extends "GetAllComments" | "GetFontList" | "GetInstalledPlugins" ? unknown[] :
    T extends "GetMacros" ? string :
    T extends "InstallPlugin" | "UpdatePlugin" | "RemovePlugin" ? object :
    unknown;

// ---- src/theme/index.d.ts ----
// Editor theme (Asc.plugin.theme / onThemeChanged) - split out of index.d.ts since it's a large,
// self-contained block of CSS-variable-style theme tokens with no dependencies on other modules.

type KnownThemeName = "theme-night" | "theme-light" | "theme-dark" | "theme-gray" | "theme-white" | "theme-classic-light" | "theme-contrast-dark";

interface AscTheme {
    /** Theme name */
    Name: KnownThemeName | string;
    /** @deprecated Theme name (duplicate for compatibility) */
    name: KnownThemeName | string;
    /** Theme type (light/dark) */
    Type: "light" | "dark";
    /** @deprecated Theme type (light/dark) */
    type: "light" | "dark";
    /** Show rulers button */
    RulersButton: boolean;
    /** Show navigation buttons */
    NavigationButtons: boolean;
    /** Set thumbnail scroll width to null if no scrolling */
    ThumbnailScrollWidthNullIfNoScrolling: boolean;
    /** Need to invert on active */
    isNeedInvertOnActive: boolean;
    /** Support notes */
    SupportNotes: boolean;
    /** Style thumbnail width */
    STYLE_THUMBNAIL_WIDTH: number;
    /** Style thumbnail height */
    STYLE_THUMBNAIL_HEIGHT: number;
    /** Forms content controls outline border radius hover */
    FormsContentControlsOutlineBorderRadiusHover: number;
    /** Forms content controls outline border radius active */
    FormsContentControlsOutlineBorderRadiusActive: number;
    /** Themes thumbnail width */
    THEMES_THUMBNAIL_WIDTH: number;
    /** Themes thumbnail height */
    THEMES_THUMBNAIL_HEIGHT: number;
    /** Themes layout thumbnail height */
    THEMES_LAYOUT_THUMBNAIL_HEIGHT: number;
    /** Splitter width in mm */
    SplitterWidthMM: number;
    /** Animation pane timeline scroller opacity */
    AnimPaneTimelineScrollerOpacity: number;
    /** Animation pane timeline scroller hover opacity */
    AnimPaneTimelineScrollerOpacityHovered: number;
    /** Animation pane timeline scroller active opacity */
    AnimPaneTimelineScrollerOpacityActive: number;
    /** Background color */
    BackgroundColor: string;
    /** Page outline color */
    PageOutline: string;
    /** Dark ruler color */
    RulerDark: string;
    /** Light ruler color */
    RulerLight: string;
    /** Ruler outline color */
    RulerOutline: string;
    /** Ruler markers outline color */
    RulerMarkersOutlineColor: string;
    /** Old ruler markers outline color */
    RulerMarkersOutlineColorOld: string;
    /** Ruler markers fill color */
    RulerMarkersFillColor: string;
    /** Old ruler markers fill color */
    RulerMarkersFillColorOld: string;
    /** Ruler text color */
    RulerTextColor: string;
    /** Ruler tabs color */
    RulerTabsColor: string;
    /** Old ruler tabs color */
    RulerTabsColorOld: string;
    /** Ruler table color 1 */
    RulerTableColor1: string;
    /** Ruler table color 2 */
    RulerTableColor2: string;
    /** Scroll background color */
    ScrollBackgroundColor: string;
    /** Scroll outline color */
    ScrollOutlineColor: string;
    /** Scroll outline hover color */
    ScrollOutlineHoverColor: string;
    /** Scroll outline active color */
    ScrollOutlineActiveColor: string;
    /** Scroller color */
    ScrollerColor: string;
    /** Scroller hover color */
    ScrollerHoverColor: string;
    /** Scroller active color */
    ScrollerActiveColor: string;
    /** Scroll arrow color */
    ScrollArrowColor: string;
    /** Scroll arrow hover color */
    ScrollArrowHoverColor: string;
    /** Scroll arrow active color */
    ScrollArrowActiveColor: string;
    /** Scroller target color */
    ScrollerTargetColor: string;
    /** Scroller target hover color */
    ScrollerTargetHoverColor: string;
    /** Scroller target active color */
    ScrollerTargetActiveColor: string;
    /** Content controls background */
    ContentControlsBack: string;
    /** Content controls hover background */
    ContentControlsHover: string;
    /** Content controls active background */
    ContentControlsActive: string;
    /** Content controls text color */
    ContentControlsText: string;
    /** Content controls active text color */
    ContentControlsTextActive: string;
    /** Content controls anchor active color */
    ContentControlsAnchorActive: string;
    /** Forms content controls outline hover */
    FormsContentControlsOutlineHover: string;
    /** Forms content controls outline active */
    FormsContentControlsOutlineActive: string;
    /** Forms content controls markers background */
    FormsContentControlsMarkersBackground: string;
    /** Forms content controls markers background hover */
    FormsContentControlsMarkersBackgroundHover: string;
    /** Forms content controls markers background active */
    FormsContentControlsMarkersBackgroundActive: string;
    /** Forms content controls outline mover hover */
    FormsContentControlsOutlineMoverHover: string;
    /** Forms content controls outline mover active */
    FormsContentControlsOutlineMoverActive: string;
    /** Thumbnails background color */
    BackgroundColorThumbnails: string;
    /** Thumbnails active background color */
    BackgroundColorThumbnailsActive: string;
    /** Thumbnails hover background color */
    BackgroundColorThumbnailsHover: string;
    /** Thumbnails page active outline color */
    ThumbnailsPageOutlineActive: string;
    /** Thumbnails page hover outline color */
    ThumbnailsPageOutlineHover: string;
    /** Thumbnails page number text color */
    ThumbnailsPageNumberText: string;
    /** Thumbnails page number active text color */
    ThumbnailsPageNumberTextActive: string;
    /** Thumbnails page number hover text color */
    ThumbnailsPageNumberTextHover: string;
    /** Thumbnails lock color */
    ThumbnailsLockColor: string;
    /** Notes background color */
    BackgroundColorNotes: string;
    /** Border splitter color */
    BorderSplitterColor: string;
    /** Animation pane background */
    AnimPaneBackground: string;
    /** Animation pane selected item fill */
    AnimPaneItemFillSelected: string;
    /** Animation pane hovered item fill */
    AnimPaneItemFillHovered: string;
    /** Animation pane button fill */
    AnimPaneButtonFill: string;
    /** Animation pane button hover fill */
    AnimPaneButtonFillHovered: string;
    /** Animation pane button disabled fill */
    AnimPaneButtonFillDisabled: string;
    /** Animation pane play button fill */
    AnimPanePlayButtonFill: string;
    /** Animation pane play button outline */
    AnimPanePlayButtonOutline: string;
    /** Animation pane entrance effect bar fill */
    AnimPaneEffectBarFillEntrance: string;
    /** Animation pane entrance effect bar outline */
    AnimPaneEffectBarOutlineEntrance: string;
    /** Animation pane emphasis effect bar fill */
    AnimPaneEffectBarFillEmphasis: string;
    /** Animation pane emphasis effect bar outline */
    AnimPaneEffectBarOutlineEmphasis: string;
    /** Animation pane exit effect bar fill */
    AnimPaneEffectBarFillExit: string;
    /** Animation pane exit effect bar outline */
    AnimPaneEffectBarOutlineExit: string;
    /** Animation pane path effect bar fill */
    AnimPaneEffectBarFillPath: string;
    /** Animation pane path effect bar outline */
    AnimPaneEffectBarOutlinePath: string;
    /** Animation pane timeline ruler outline */
    AnimPaneTimelineRulerOutline: string;
    /** Animation pane timeline ruler tick */
    AnimPaneTimelineRulerTick: string;
    /** Animation pane timeline scroller fill */
    AnimPaneTimelineScrollerFill: string;
    /** Animation pane timeline scroller outline */
    AnimPaneTimelineScrollerOutline: string;
    /** Animation pane text color */
    AnimPaneText: string;
    /** Animation pane active text color */
    AnimPaneTextActive: string;
    /** Animation pane hover text color */
    AnimPaneTextHover: string;
    /** DEM background color */
    DemBackgroundColor: string;
    /** DEM button background color */
    DemButtonBackgroundColor: string;
    /** DEM button hover background color */
    DemButtonBackgroundColorHover: string;
    /** DEM button active background color */
    DemButtonBackgroundColorActive: string;
    /** DEM button border color */
    DemButtonBorderColor: string;
    /** DEM button text color */
    DemButtonTextColor: string;
    /** DEM button active text color */
    DemButtonTextColorActive: string;
    /** DEM splitter color */
    DemSplitterColor: string;
    /** DEM text color */
    DemTextColor: string;
    /** General background color */
    Background: string;
    /** Active background color */
    BackgroundActive: string;
    /** Highlighted background color */
    BackgroundHighlighted: string;
    /** General border color */
    Border: string;
    /** Active border color */
    BorderActive: string;
    /** Highlighted border color */
    BorderHighlighted: string;
    /** General text color */
    Color: string;
    /** Active text color */
    ColorActive: string;
    /** Highlighted text color */
    ColorHighlighted: string;
    /** Filtering text color */
    ColorFiltering: string;
    /** Sheet view cell background */
    SheetViewCellBackground: string;
    /** Sheet view cell pressed background */
    SheetViewCellBackgroundPressed: string;
    /** Sheet view cell hover background */
    SheetViewCellBackgroundHover: string;
    /** Sheet view cell title label color */
    SheetViewCellTitleLabel: string;
    /** Dark text color */
    ColorDark: string;
    /** Dark active text color */
    ColorDarkActive: string;
    /** Dark highlighted text color */
    ColorDarkHighlighted: string;
    /** Dark filtering text color */
    ColorDarkFiltering: string;
    /** Group data border color */
    GroupDataBorder: string;
    /** Editor border color */
    EditorBorder: string;
    /** Select all icon color */
    SelectAllIcon: string;
    /** Sheet view select all icon color */
    SheetViewSelectAllIcon: string;
    /** Document toolbar header background */
    "toolbar-header-document": string;
    /** Spreadsheet toolbar header background */
    "toolbar-header-spreadsheet": string;
    /** Presentation toolbar header background */
    "toolbar-header-presentation": string;
    /** PDF toolbar header background */
    "toolbar-header-pdf": string;
    /** Visio toolbar header background */
    "toolbar-header-visio": string;
    /** Document toolbar header text on background */
    "text-toolbar-header-on-background-document": string;
    /** Spreadsheet toolbar header text on background */
    "text-toolbar-header-on-background-spreadsheet": string;
    /** Presentation toolbar header text on background */
    "text-toolbar-header-on-background-presentation": string;
    /** PDF toolbar header text on background */
    "text-toolbar-header-on-background-pdf": string;
    /** Visio toolbar header text on background */
    "text-toolbar-header-on-background-visio": string;
    /** Normal background color */
    "background-normal": string;
    /** Toolbar background color */
    "background-toolbar": string;
    /** Additional toolbar background color */
    "background-toolbar-additional": string;
    /** Primary dialog button background color */
    "background-primary-dialog-button": string;
    /** Notification popover background color */
    "background-notification-popover": string;
    /** Notification badge background color */
    "background-notification-badge": string;
    /** Scrim background color */
    "background-scrim": string;
    /** Loader background color */
    "background-loader": string;
    /** Accent button background color */
    "background-accent-button": string;
    /** Contrast popover background color */
    "background-contrast-popover": string;
    /** Contrast popover shadow */
    "shadow-contrast-popover": string;
    /** Button hover highlight */
    "highlight-button-hover": string;
    /** Button pressed highlight */
    "highlight-button-pressed": string;
    /** Button pressed hover highlight */
    "highlight-button-pressed-hover": string;
    /** Primary dialog button hover highlight */
    "highlight-primary-dialog-button-hover": string;
    /** Header button hover highlight */
    "highlight-header-button-hover": string;
    /** Header button pressed highlight */
    "highlight-header-button-pressed": string;
    /** Text select highlight */
    "highlight-text-select": string;
    /** Accent button hover highlight */
    "highlight-accent-button-hover": string;
    /** Accent button pressed highlight */
    "highlight-accent-button-pressed": string;
    /** Document toolbar tab underline */
    "highlight-toolbar-tab-underline-document": string;
    /** Spreadsheet toolbar tab underline */
    "highlight-toolbar-tab-underline-spreadsheet": string;
    /** Presentation toolbar tab underline */
    "highlight-toolbar-tab-underline-presentation": string;
    /** PDF toolbar tab underline */
    "highlight-toolbar-tab-underline-pdf": string;
    /** Visio toolbar tab underline */
    "highlight-toolbar-tab-underline-visio": string;
    /** Document header tab underline */
    "highlight-header-tab-underline-document": string;
    /** Spreadsheet header tab underline */
    "highlight-header-tab-underline-spreadsheet": string;
    /** Presentation header tab underline */
    "highlight-header-tab-underline-presentation": string;
    /** PDF header tab underline */
    "highlight-header-tab-underline-pdf": string;
    /** Visio header tab underline */
    "highlight-header-tab-underline-visio": string;
    /** Toolbar border color */
    "border-toolbar": string;
    /** Divider border color */
    "border-divider": string;
    /** Regular control border color */
    "border-regular-control": string;
    /** Toolbar button hover border */
    "border-toolbar-button-hover": string;
    /** Preview hover border */
    "border-preview-hover": string;
    /** Preview select border */
    "border-preview-select": string;
    /** Control focus border */
    "border-control-focus": string;
    /** Color shading border */
    "border-color-shading": string;
    /** Error border color */
    "border-error": string;
    /** Contrast popover border */
    "border-contrast-popover": string;
    /** Normal text color */
    "text-normal": string;
    /** Normal pressed text color */
    "text-normal-pressed": string;
    /** Secondary text color */
    "text-secondary": string;
    /** Tertiary text color */
    "text-tertiary": string;
    /** Link text color */
    "text-link": string;
    /** Link hover text color */
    "text-link-hover": string;
    /** Link active text color */
    "text-link-active": string;
    /** Link visited text color */
    "text-link-visited": string;
    /** Inverse text color */
    "text-inverse": string;
    /** Toolbar header text color */
    "text-toolbar-header": string;
    /** Contrast background text color */
    "text-contrast-background": string;
    /** Alt key hint text color */
    "text-alt-key-hint": string;
    /** Normal icon color */
    "icon-normal": string;
    /** Normal pressed icon color */
    "icon-normal-pressed": string;
    /** Inverse icon color */
    "icon-inverse": string;
    /** Toolbar header icon color */
    "icon-toolbar-header": string;
    /** Notification badge icon color */
    "icon-notification-badge": string;
    /** Contrast popover icon color */
    "icon-contrast-popover": string;
    /** Success icon color */
    "icon-success": string;
    /** Canvas background color */
    "canvas-background": string;
    /** Canvas content background color */
    "canvas-content-background": string;
    /** Canvas page border color */
    "canvas-page-border": string;
    /** Canvas ruler background color */
    "canvas-ruler-background": string;
    /** Canvas ruler border color */
    "canvas-ruler-border": string;
    /** Canvas ruler margins background color */
    "canvas-ruler-margins-background": string;
    /** Canvas ruler mark color */
    "canvas-ruler-mark": string;
    /** Canvas ruler handle border color */
    "canvas-ruler-handle-border": string;
    /** Canvas ruler disabled handle border color */
    "canvas-ruler-handle-border-disabled": string;
    /** Canvas high contrast color */
    "canvas-high-contrast": string;
    /** Canvas disabled high contrast color */
    "canvas-high-contrast-disabled": string;
    /** Canvas cell border color */
    "canvas-cell-border": string;
    /** Canvas cell title background color */
    "canvas-cell-title-background": string;
    /** Canvas cell title hover background color */
    "canvas-cell-title-background-hover": string;
    /** Canvas cell title selected background color */
    "canvas-cell-title-background-selected": string;
    /** Canvas cell title border color */
    "canvas-cell-title-border": string;
    /** Canvas cell title hover border color */
    "canvas-cell-title-border-hover": string;
    /** Canvas cell title selected border color */
    "canvas-cell-title-border-selected": string;
    /** Canvas cell title text color */
    "canvas-cell-title-text": string;
    /** Canvas dark cell title color */
    "canvas-dark-cell-title": string;
    /** Canvas dark cell title hover color */
    "canvas-dark-cell-title-hover": string;
    /** Canvas dark cell title selected color */
    "canvas-dark-cell-title-selected": string;
    /** Canvas dark cell title border color */
    "canvas-dark-cell-title-border": string;
    /** Canvas dark cell title hover border color */
    "canvas-dark-cell-title-border-hover": string;
    /** Canvas dark cell title selected border color */
    "canvas-dark-cell-title-border-selected": string;
    /** Canvas dark content background color */
    "canvas-dark-content-background": string;
    /** Canvas dark page border color */
    "canvas-dark-page-border": string;
    /** Canvas scroll thumb color */
    "canvas-scroll-thumb": string;
    /** Canvas scroll thumb hover color */
    "canvas-scroll-thumb-hover": string;
    /** Canvas scroll thumb pressed color */
    "canvas-scroll-thumb-pressed": string;
    /** Canvas scroll thumb border color */
    "canvas-scroll-thumb-border": string;
    /** Canvas scroll thumb hover border color */
    "canvas-scroll-thumb-border-hover": string;
    /** Canvas scroll thumb pressed border color */
    "canvas-scroll-thumb-border-pressed": string;
    /** Canvas scroll arrow color */
    "canvas-scroll-arrow": string;
    /** Canvas scroll arrow hover color */
    "canvas-scroll-arrow-hover": string;
    /** Canvas scroll arrow pressed color */
    "canvas-scroll-arrow-pressed": string;
    /** Canvas scroll thumb target color */
    "canvas-scroll-thumb-target": string;
    /** Canvas scroll thumb target hover color */
    "canvas-scroll-thumb-target-hover": string;
    /** Canvas scroll thumb target pressed color */
    "canvas-scroll-thumb-target-pressed": string;
    /** Canvas sheet view cell background color */
    "canvas-sheet-view-cell-background": string;
    /** Canvas sheet view cell hover background color */
    "canvas-sheet-view-cell-background-hover": string;
    /** Canvas sheet view cell pressed background color */
    "canvas-sheet-view-cell-background-pressed": string;
    /** Canvas sheet view cell title label color */
    "canvas-sheet-view-cell-title-label": string;
    /** Canvas 1px freeze line color */
    "canvas-freeze-line-1px": string;
    /** Canvas 2px freeze line color */
    "canvas-freeze-line-2px": string;
    /** Canvas select all icon color */
    "canvas-select-all-icon": string;
    /** Canvas animation pane background color */
    "canvas-anim-pane-background": string;
    /** Canvas animation pane selected item fill color */
    "canvas-anim-pane-item-fill-selected": string;
    /** Canvas animation pane hovered item fill color */
    "canvas-anim-pane-item-fill-hovered": string;
    /** Canvas animation pane button fill color */
    "canvas-anim-pane-button-fill": string;
    /** Canvas animation pane button hover fill color */
    "canvas-anim-pane-button-fill-hovered": string;
    /** Canvas animation pane button disabled fill color */
    "canvas-anim-pane-button-fill-disabled": string;
    /** Canvas animation pane play button fill color */
    "canvas-anim-pane-play-button-fill": string;
    /** Canvas animation pane play button outline color */
    "canvas-anim-pane-play-button-outline": string;
    /** Canvas animation pane entrance effect bar fill color */
    "canvas-anim-pane-effect-bar-entrance-fill": string;
    /** Canvas animation pane entrance effect bar outline color */
    "canvas-anim-pane-effect-bar-entrance-outline": string;
    /** Canvas animation pane emphasis effect bar fill color */
    "canvas-anim-pane-effect-bar-emphasis-fill": string;
    /** Canvas animation pane emphasis effect bar outline color */
    "canvas-anim-pane-effect-bar-emphasis-outline": string;
    /** Canvas animation pane exit effect bar fill color */
    "canvas-anim-pane-effect-bar-exit-fill": string;
    /** Canvas animation pane exit effect bar outline color */
    "canvas-anim-pane-effect-bar-exit-outline": string;
    /** Canvas animation pane path effect bar fill color */
    "canvas-anim-pane-effect-bar-path-fill": string;
    /** Canvas animation pane path effect bar outline color */
    "canvas-anim-pane-effect-bar-path-outline": string;
    /** Canvas animation pane timeline ruler outline color */
    "canvas-anim-pane-timeline-ruler-outline": string;
    /** Canvas animation pane timeline ruler tick color */
    "canvas-anim-pane-timeline-ruler-tick": string;
    /** Canvas animation pane timeline scroller fill color */
    "canvas-anim-pane-timeline-scroller-fill": string;
    /** Canvas animation pane timeline scroller outline color */
    "canvas-anim-pane-timeline-scroller-outline": string;
    /** Canvas animation pane timeline scroller opacity */
    "canvas-anim-pane-timeline-scroller-opacity": string;
    /** Canvas animation pane timeline scroller hover opacity */
    "canvas-anim-pane-timeline-scroller-opacity-hovered": string;
    /** Canvas animation pane timeline scroller active opacity */
    "canvas-anim-pane-timeline-scroller-opacity-active": string;
    /** Toolbar height controls value */
    "toolbar-height-controls": string;
    /** Sprite button icons UID */
    "sprite-button-icons-uid": string;
}

// ---- src/config/plugin-config.d.ts ----
// config.json shape - ButtonConfig/VariationConfig/PluginConfig and their supporting types.
// PluginInfo is not here even though it also describes config-shaped data: it's a runtime-plugin
// concept (window.Asc.plugin.info), not a static config.json shape, so it lives in ./src/plugin/plugin.d.ts.

interface ButtonConfig {
    isViewer?: boolean;
    primary?: boolean;
    text: string;
    textLocale?: Record<string, string>;
}

type EditorType = 'word' | 'cell' | 'slide' | 'pdf';

type IconScale = '100%' | '125%' | '150%' | '175%' | '200%';

type IconScaleEntry = {
    active?: string;
    hover?: string;
    normal: string;
};

type IconConfig = {
    [K in IconScale]?: IconScaleEntry;
} & {
    /** Light/dark icon set variant - real-world config.json files pair this with `theme`. */
    style?: 'light' | 'dark';
    /** Icon theme name, e.g. `"flat"`/`"flatDark"` - not a fixed enum in practice. */
    theme?: string;
    /** Fallback used for any scale not otherwise listed. */
    default?: IconScaleEntry;
};

type InitDataType = 'text' | 'html' | 'ole' | 'desktop' | 'desktop-external' | 'none' | 'sign';

type MenuType = 'left' | 'right';

interface PluginConfig {
    baseUrl?: string;
    description?: string;
    discussion?: string;
    guid: string;
    /** A help/support link for the plugin. */
    help?: string;
    /** Marks the plugin as belonging to ONLYOFFICE's own scheme/catalog rather than a third party. */
    onlyofficeScheme?: boolean;
    /** Version of the config.json format itself, distinct from the plugin's own `version`. */
    manifestVersion?: string;
    minVersion?: string;
    name: string;
    nameLocale?: Record<string, string>;
    offered: string;
    url?: string;
    variations: VariationConfig[];
    version: string;
}

interface InstalledPluginInfo {
    baseUrl: string;
    canRemoved: boolean;
    guid: string;
    obj: PluginConfig;
    removed?: boolean;
}

interface StoreConfig {
    background?: {
        dark: string;
        light: string;
    };
    categories?: string[];
    icons?: {
        dark: string;
        light: string;
    };
    screenshots?: string[];
}

interface VariationConfig {
    /** Defaults to no buttons (an empty toolbar) when omitted - routinely omitted in practice. */
    buttons?: ButtonConfig[];
    cryptoDisabledForExternalCloud?: string;
    cryptoDisabledForInternalCloud?: string;
    cryptoDisabledOnStart?: string;
    cryptoMode?: string;
    description: string;
    descriptionLocale?: Record<string, string>;
    EditorsSupport: EditorType[];
    events?: string[];
    fixedSize?: boolean;
    /** Some plugins use the same rich per-scale shape here as `icons2` instead of a plain path/map. */
    icons?: Record<string, string> | string[] | string | IconConfig[];
    icons2?: IconConfig[];
    initData?: string;
    initDataType?: InitDataType;
    initOnSelectionChanged?: boolean;
    isCanDocked?: boolean;
    isCustomWindow?: boolean;
    isDisplayedInViewer?: boolean;
    isInsideMode?: boolean;
    isModal?: boolean;
    /** Whether the variation's content needs sequential numbering (used by some panel plugins). */
    isNeedNumbering?: boolean;
    isSystem?: boolean;
    isTargeted?: boolean;
    isUpdateOleOnResize?: boolean;
    isViewer?: boolean;
    /** Omitted in practice about as often as it's set explicitly. */
    isVisual?: boolean;
    menu?: MenuType;
    /** executeMethod names this variation calls - purely descriptive/documentation, not enforced. */
    methods?: string[];
    name?: string;
    nameLocale?: Record<string, string>;
    /** Store listing screenshots for this specific variation (see also StoreConfig.screenshots). */
    screens?: string[];
    size?: number[];
    store?: StoreConfig;
    type?: VariationType;
    url: string;
}

type VariationType = 'window' | 'panel' | 'panelRight' | 'background' | 'system';

// ---- src/plugin/events.d.ts ----
// Plugin-window-level events (Asc.plugin.attachEvent/onContextMenuShow/onWindowResize/...) - a
// distinct registry from the per-editor content events (paragraph/page changes) declared in
// ./plugin.d.ts alongside attachEditorEvent/detachEditorEvent. Self-contained: no cross-module imports.

interface ContextMenuShowEvent {
    /** The context type used by the editor, for example `All`. */
    type: string;
}

/** Event arguments are tuples so events with no payload can be represented as `[]`. */
type PluginEventMap = {
    onContextMenuShow: [event: ContextMenuShowEvent];
    /** Payload is not documented consistently across editor versions. */
    onWindowResize: [event: unknown];
    /** Payload is not documented consistently across editor versions. */
    onInputHelperInput: [event: unknown];
    onInputHelperClear: [];
    onExternalMouseUp: [];
    onClickBack: [];
    onDocumentContentReady: [];
    onTargetPositionChanged: [];
    /** Payload shape is not documented consistently across editor versions. */
    onClick: [event: unknown];
    /** Payload shape is not documented consistently across editor versions. */
    onKeyDown: [event: unknown];
};

type PluginEventName = keyof PluginEventMap | (string & {});
type PluginEventCallback<T = unknown> = (...args: T[]) => void;
type PluginEventHandler<K extends keyof PluginEventMap> = (...args: PluginEventMap[K]) => void;

/** Editor content events (paragraph/page changes) - a distinct registry from PluginEventName, which covers plugin-window-level events (theme, resize, ...) */
type PluginEditorEventName = 'onChangeCurrentPage' | 'onParagraphText' | 'onPargraphAdd' | 'onParagraphRemove' | string;

type PluginEditorEventCallback<T = unknown> = (...args: T[]) => void;

// ---- src/plugin/buttons.d.ts ----
// Plugin menu buttons (Asc.Buttons and the context-menu/toolbar/window-header/content-control
// button classes) - split out of index.d.ts since it's a self-contained group referencing only
// config types (EditorType/IconConfig), not the plugin runtime itself.

type CustomMenuClickCallback = (data?: string) => void;

type ToolbarButtonType = "button" | "big-button";

interface ButtonMenuItem {
    id: string;
    text: string;
    hint?: string;
    items?: ButtonMenuItem[];
    onclick?: CustomMenuClickCallback;
}

interface ButtonBase {
    id: string;
    editors: EditorType[];
    icons: IconConfig | string[] | string | null;
    text: string;
    hint: string | null;
    data: string;
    separator: boolean;
    lockInViewMode: boolean;
    enableToggle: boolean;
    disabled: boolean;
    removed: boolean;
    parent: ButtonBase | null;
    childs: ButtonBase[] | null;
    menu?: ButtonMenuItem[];
    split?: boolean;
    pressed?: boolean;
    attachOnClick: (callback: CustomMenuClickCallback) => void;
    copy?: () => ButtonBase;
}

interface ButtonContextMenu extends ButtonBase {
    showOnOptionsType: string[];
    addCheckers: (...keys: string[]) => void;
}

interface ButtonToolbar extends ButtonBase {
    type: ToolbarButtonType;
    tab: string;
}

interface ButtonContentControl extends ButtonBase {
    checker?: (contentControlId: string) => boolean | Promise<boolean>;
    addChecker: (checker: (contentControlId: string) => boolean | Promise<boolean>) => void;
}

interface ButtonWindowHeader extends ButtonBase {
    align: "left" | "center" | "right" | string;
    isLabel: boolean;
    isTitle: boolean;
}

interface Buttons {
    registerContextMenu: () => void;
    registerToolbarMenu: () => void;
    updateToolbarMenu: (id: string, text: string, buttons: ButtonToolbar[]) => void;
    registerWindowHeader: (id: string, buttons: ButtonWindowHeader[], frame?: WindowHeaderFrameOptions) => void;
    updateWindowHeader: (id: string, buttons: ButtonWindowHeader[], add?: boolean, frame?: WindowHeaderFrameOptions) => void;
    registerContentControl: () => void;
}

interface WindowHeaderFrameOptions {
    align?: "left" | "center" | "right" | string;
    isLabel?: boolean;
    isTitle?: boolean;
}

// ---- src/plugin/plugin.d.ts ----
// The plugin runtime itself: Asc (the window.Asc entry point), AscPlugin (window.Asc.plugin),
// PluginWindow, PluginScope, and PluginInfo. This is the hub module - it cross-imports the
// per-editor namespaces/method types, theme, config, events, and buttons to assemble AscPlugin's
// executeMethod/attachEditorEvent overloads and Asc's button constructors.











interface PluginScope {
    [key: string]: any;
    /**
     * Only present on the initial `Asc.scope` the runtime bootstraps (`plugins.dev.js` sets it once
     * at startup as a convenience for plugin authors - the runtime itself never calls it). Plugins
     * routinely replace `Asc.scope` wholesale with a plain data payload before `callCommand`
     * (`window.Asc.scope = { foo: 1 }`) so that data is readable inside the sandboxed callback -
     * that payload has no reason to carry `prototype.clear`, so it must stay optional here.
     */
    prototype?: {
        clear(): void;
    };
}

interface Asc {
    plugin: AscPlugin;
    scope: PluginScope;
    PluginWindow: new () => PluginWindow;
    ButtonContextMenu: new (parent?: ButtonBase | null, id?: string) => ButtonContextMenu;
    ButtonToolbar: new (parent?: ButtonBase | null, id?: string) => ButtonToolbar;
    ButtonContentControl: new (parent?: ButtonBase | null, id?: string) => ButtonContentControl;
    ButtonWindowHeader: new (parent?: ButtonBase | null, id?: string) => ButtonWindowHeader;
    Buttons: Buttons;
}

interface AscPlugin {
    /** Plugin GUID from config.json. */
    guid?: string;
    /** Window identifier assigned when the plugin is opened in a separate window. */
    windowID?: string;
    /** Handler for context-menu item clicks registered with attachContextMenuClickEvent. */
    event_onContextMenuClick?: (id?: string) => void;
    /** Handler for toolbar-menu item clicks registered with attachToolbarMenuClickEvent. */
    event_onToolbarMenuClick?: (id?: string) => void;
    /** Handler for window-header item clicks registered with attachWindowHeaderMenuClickEvent. */
    event_onWindowHeaderMenuClick?: (id?: string) => void;
    /**
     * Per-editor overloads (typed from each editor's own plugin-events.js) come first so a known
     * event name gets its real payload type; the final overload is a loose fallback for events
     * not modeled yet (e.g. the low-level common/UI ones - onContextMenuShow, onClick, onKeyDown, ...).
     */
    attachEditorEvent: (<T extends Word.EditorEventName>(eventName: T, callback: (...args: Word.EditorEventArgs[T]) => void) => void) &
        (<T extends Cell.EditorEventName>(eventName: T, callback: (...args: Cell.EditorEventArgs[T]) => void) => void) &
        (<T extends Slide.EditorEventName>(eventName: T, callback: (...args: Slide.EditorEventArgs[T]) => void) => void) &
        (<T extends Forms.EditorEventName>(eventName: T, callback: (...args: Forms.EditorEventArgs[T]) => void) => void) &
        (<T extends Pdf.EditorEventName>(eventName: T, callback: (...args: Pdf.EditorEventArgs[T]) => void) => void) &
        ((eventName: PluginEditorEventName, callback: PluginEditorEventCallback) => void);
    attachContextMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachEvent: (<T extends keyof PluginEventMap>(eventName: T, callback: (...args: PluginEventMap[T]) => void) => void) &
        ((eventName: string, callback: (...args: unknown[]) => void) => void);
    attachToolbarMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    attachWindowHeaderMenuClickEvent: (id: string, callback: CustomMenuClickCallback) => void;
    button: (id: number, text: string) => void;
    callCommand: (command: () => void, isClose?: boolean, isCalc?: boolean, callback?: (value?: any) => void) => void;
    detachEditorEvent: (<T extends Word.EditorEventName>(eventName: T) => void) &
        (<T extends Cell.EditorEventName>(eventName: T) => void) &
        (<T extends Slide.EditorEventName>(eventName: T) => void) &
        (<T extends Forms.EditorEventName>(eventName: T) => void) &
        (<T extends Pdf.EditorEventName>(eventName: T) => void) &
        ((eventName: PluginEditorEventName) => void);
    detachEvent: (<T extends keyof PluginEventMap>(eventName: T) => void) &
        ((eventName: string) => void);
    event_onContextMenuShow?: PluginEventHandler<"onContextMenuShow">;
    event_onWindowResize?: PluginEventHandler<"onWindowResize">;
    event_onInputHelperInput?: PluginEventHandler<"onInputHelperInput">;
    event_onInputHelperClear?: PluginEventHandler<"onInputHelperClear">;
    event_onExternalMouseUp?: PluginEventHandler<"onExternalMouseUp">;
    event_onClickBack?: PluginEventHandler<"onClickBack">;
    event_onDocumentContentReady?: PluginEventHandler<"onDocumentContentReady">;
    event_onTargetPositionChanged?: PluginEventHandler<"onTargetPositionChanged">;
    event_onClick?: PluginEventHandler<"onClick">;
    event_onKeyDown?: PluginEventHandler<"onKeyDown">;
    onDestroy?: () => void;
    onEvent: (eventName: string, payload?: unknown) => void;
    executeMethod: ((methodName: 'CloseWindow', args?: [windowId: number]) => void) &
        ((methodName: 'ShowButton', args?: [buttonId: string, visible: boolean, align?: string]) => void) &
        (<T extends WordMethodName>(methodName: T, args?: WordMethodArgs[T], callback?: (result: WordMethodReturn<T>) => void) => void) &
        (<T extends CellMethodName>(methodName: T, args?: CellMethodArgs[T], callback?: (result: CellMethodReturn<T>) => void) => void) &
        (<T extends SlideMethodName>(methodName: T, args?: SlideMethodArgs[T], callback?: (result: SlideMethodReturn<T>) => void) => void) &
        (<T extends PdfMethodName>(methodName: T, args?: PdfMethodArgs[T], callback?: (result: PdfMethodReturn<T>) => void) => void);
    executeCommand: ExecuteCommandCallback;
    info: PluginInfo;
    init: () => void;
    onExternalMouseUp: () => void;
    onThemeChanged: (theme: AscTheme) => void;
    onThemeChangedBase: (theme: AscTheme) => void;
    onTranslate(): void;
    resizeWindow: (width: number, height: number, minWidth?: number, minHeight?: number, maxWidth?: number, maxHeight?: number) => void;
    sendEvent: (eventName: string, eventData?: unknown) => void;
    sendToPlugin(message: string, payload?: unknown): void;
    theme: AscTheme;
    tr: (key: string) => string;
    /** Set to `true` after `tr` is first initialized */
    tr_init?: boolean;
    /** Translation map for the current language, populated by `pluginInitTranslateManager` */
    translateManager?: Record<string, string>;
    trigger: (eventName: string, eventData?: unknown) => void;
    version: string;
}

interface PluginWindow {
    id: string;
    show: (variation: VariationConfig) => void;
    close: () => void;
    attachEvent: (eventName: string, callback: PluginEventCallback) => void;
    // detachEvent: (eventName: string) => void;
    command: (methodName: string, payload?: unknown) => void;
}

interface ExecuteCommandCallback {
    (command: string, value?: unknown, callback?: () => void): void;
}

interface PluginInfo {
    editorType: EditorType;
    documentCallbackUrl: string;
    documentId: string;
    documentTitle: string;
    guid: string;
    isEmbedMode: boolean;
    isMobileMode: boolean;
    isViewMode: boolean;
    jwt: string;
    lang: string;
    mmToPx: number;
    theme: AscTheme;
    userId: string;
    userName: string;
}

// ---- src/services/desktop-editor.d.ts ----
// Native C++ object injected by OnlyOffice Desktop Editor into the browser window.

type DesktopDialogType = 'plugin' | 'images' | 'cell' | 'word' | 'slide';

interface AscDesktopEditor {
    // Plugin management
    GetInstallPlugins(): string;
    GetBackupPlugins(): string;
    PluginInstall(path: string): boolean;

    // File dialogs
    OpenFilenameDialog(type: DesktopDialogType, multiple: boolean, callback: (file: string | string[]) => void): void;

    // Local file operations
    LocalStartOpen(): void;
    LocalFileSave(params: string, password: string, docinfo?: unknown, fileType?: number, jsonOptions?: string, passwordOld?: string): void;
    LocalFileSaveChanges(changes: string, deleteIndex: number, count: number): void;
    LocalFileGetSaved(): boolean;
    LocalFileGetSourcePath(): string;
    LocalFileGetRelativePath(path: string): string;
    LocalFileGetOpenChangesCount(): number;
    LocalFileGetImageUrl(path: string): string;
    LocalFileGetImageUrlCorrect(path: string): string;
    IsLocalFileExist(path: string): boolean;
    GetOpenedFile(path: string): ArrayBuffer | null;
    AddChanges(type: number, base64: string): void;

    // Document state
    SetDocumentName(name: string): void;
    onDocumentModifiedChanged(isModified: boolean): void;
    SetLocalRestrictions(value: number): void;
    SetAdvancedOptions(xml: string): void;
    NativeViewerOpen(password: string): void;
    CheckUserId(): string;

    // Encryption
    buildCryptedEnd(success: boolean): void;

    // External conversions
    startExternalConvertation(type: string, params: string): void;
}

// ---- src/services/simple-request.d.ts ----
// window.AscSimpleRequest - a small cross-origin request helper injected alongside window.Asc.

interface AscSimpleRequestOptions {
    url: string;
    crossOrigin?: boolean;
    crossDomain?: boolean;
    timeout?: number;
    headers?: string;
    complete?: (response: any, status: string) => void;
    error?: (response: any, status: string, error: any) => void;
}

interface AscSimpleRequest {
    createRequest(options: AscSimpleRequestOptions): void;
}

// ---- window.Asc / window.AscDesktopEditor / window.AscSimpleRequest ----
interface Window {
        Asc: Asc;
        AscDesktopEditor?: AscDesktopEditor;
        AscSimpleRequest?: AscSimpleRequest;
    }
    declare var Asc: Asc;
    declare var AscDesktopEditor: AscDesktopEditor | undefined;
    declare var AscSimpleRequest: AscSimpleRequest | undefined;

// ---- src/editors/word.d.ts (global Api for the "word" editor) ----
interface Window {
        Api: Word.Api;
    }

    declare var Api: Word.Api;
