export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: form

/** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "pdf"} let copyTextForm = textForm.Copy(); ``` */
type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm;

/** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetAxieNumFormat("top", "0.00"); ``` */
type AxisPos = "top" | "bottom" | "right" | "left";

/** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "pdf"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
type BlipFillType = "tile" | "stretch";

/** A border type which will be added to the document element. <b>"none"</b> - no border will be added to the created element or the selected element side. <b>"single"</b> - a single border will be added to the created element or the selected element side.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
type BorderType = "none" | "single";

/** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
type CaptionLabel = "Table" | "Equation" | "Figure";

/** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

/** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

/** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "pdf"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
type ChartType = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboBarLine" | "comboBarLineSecondary" | "comboCustom" | "unknown";

/** Checkbox / radio button properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let checkBoxFormPr = {"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true}; let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPr); ``` */
type CheckBoxFormPr = FormPrBase | CheckBoxFormPrBase;

/** Specific checkbox / radio button properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let checkBoxFormPrBase = {"radio": true}; let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPrBase) ``` */
interface CheckBoxFormPrBase {
  radio: boolean;
}

/** Combo box / dropdown list properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPr = {"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr); ``` */
type ComboBoxFormPr = FormPrBase | ComboBoxFormPrBase;

/** Specific combo box / dropdown list properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPrBase = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPrBase); ``` */
interface ComboBoxFormPrBase {
  editable: boolean;
  autoFit: boolean;
  items: (string|Array.<string>)[];
}

/** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "pdf"} let commentsReport = oDocument.GetCommentsReport(); ``` */
type CommentReport = Record<string, CommentReportRecord[]>;

/** Record of one comment.  ## Try it   ```js document-builder={"documentType": "pdf"} let commentsReport = oDocument.GetCommentsReport(); ``` */
interface CommentReportRecord {
  IsAnswer?: boolean;
  CommentMessage: string;
  Date: number;
  DateUTC: number;
  QuoteText?: string;
}

/** Date form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let dateFormPr = {"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"}; let dateForm = Api.CreateDateForm(dateFormPr); ``` */
type DateFormPr = FormPrBase | DateFormPrBase;

/** Specific date form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let dateFormPrBase = {"format": "mm.dd.yyyy", "lang": "en-US"}; let dateForm = Api.CreateDateForm(dateFormPrBase); ``` */
interface DateFormPrBase {
  format: string;
  lang: string;
}

/** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "pdf"} doc.AddElement(paragraph); ``` */
type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

/** Any valid drawing element. */
type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart;

/** Available drawing element for grouping. */
type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

/** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "pdf"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

/** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
type EMU = number;

/** Form data.  ## Try it   ```js document-builder={"documentType": "pdf"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
interface FormData {
  key: string;
  value: string | boolean;
  tag: string;
  type: FormSpecificType;
}

/** Form insertion specific properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false}; doc.InsertTextForm(textFormInsertPr); ``` */
interface FormInsertPr {
  placeholderFromSelection?: boolean;
  keepSelectedTextInForm?: boolean;
}

/** Common form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let formPrBase = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name"}; let textForm = Api.CreateTextForm(formPrBase); ``` */
interface FormPrBase {
  key: string;
  tip: string;
  tag: string;
  required: boolean;
  placeholder: string;
}

/** The specific form type.  ## Try it   ```js document-builder={"documentType": "pdf"} let formsData = doc.GetFormsData(); ``` */
type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio";

/** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "pdf"} let formType = textForm.GetFormType(); ``` */
type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm";

/** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "pdf"} let docContent = finalSection.RemoveHeader("title"); ``` */
type HdrFtrType = "default" | "title" | "even";

/** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "pdf"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

/** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddElement(run, 0); ``` */
type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

/** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "pdf"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

/** Picture form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let pictureFormPr = {"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50}; let pictureForm = Api.CreatePictureForm(pictureFormPr); ``` */
type PictureFormPr = FormPrBase | PictureFormPrBase;

/** Specific picture form properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let comboBoxFormPr = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]}; let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr); ``` */
interface PictureFormPrBase {
  scaleFlag: ScaleFlag;
  lockAspectRatio: boolean;
  respectBorders: boolean;
  shiftX: percentage;
  shiftY: percentage;
}

/** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "pdf"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
type PositiveFixedAngle = number;

/** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "pdf"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
type PositivePercentage = number;

/** The available preset color names.  ## Try it   ```js document-builder={"documentType": "pdf"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

/** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetHorAlign("page", "center"); ``` */
type RelFromH = "character" | "column" | "leftMargin" | "rightMargin" | "margin" | "page";

/** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetVerAlign("page", "center"); ``` */
type RelFromV = "bottomMargin" | "topMargin" | "margin" | "page" | "line" | "paragraph";

/** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
type ReviewReport = Record<string, ReviewReportRecord[]>;

/** Record of one review change.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
interface ReviewReportRecord {
  Type: ReviewReportRecordType;
  Value?: string;
  Date: number;
  ReviewedElement: ApiParagraph | ApiTable;
}

/** Review record type.  ## Try it   ```js document-builder={"documentType": "pdf"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

/** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "pdf"} pictureForm.SetScaleFlag("tooBig"); ``` */
type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

/** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "pdf"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

/** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "pdf"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

/** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

/** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "pdf"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "pdf"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
type ShdType = "nil" | "clear";

/** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "pdf"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
type StyleType = "paragraph" | "table" | "run" | "numbering";

/** Custom tab types.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
type TabJc = "clear" | "left" | "right" | "center";

/** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "pdf"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

/** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "pdf"} tableCell.SetWidth("twips", 2000); ``` */
type TableWidth = "auto" | "twips" | "nul" | "percent";

/** Properties for inserting a text field.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false}; doc.InsertTextForm(textFormInsertPr); ``` */
type TextFormInsertPr = FormPrBase | TextFormPrBase | FormInsertPr;

/** Text field properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false}; let textForm = Api.CreateTextForm(textFormPr); ``` */
type TextFormPr = FormPrBase | TextFormPrBase;

/** Specific text field properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let textFormPrBase = {"comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false}; let textForm = Api.CreateTextForm(textFormPrBase); ``` */
interface TextFormPrBase {
  comb: boolean;
  maxCharacters: number;
  cellWidth: number;
  multiLine: boolean;
  autoFit: boolean;
}

/** Text transform type.  ## Try it   ```js document-builder={"documentType": "pdf"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

/** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
type TickLabelPosition = "none" | "nextTo" | "low" | "high";

/** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "pdf"} chart.SetVertAxisMajorTickMark("cross"); ``` */
type TickMark = "cross" | "in" | "none" | "out";

/** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocBuildFromPr {
  OutlineLvls?: number;
  StylesLvls: TocStyleLvl[];
}

/** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "pdf"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
type TocLeader = "dot" | "dash" | "underline" | "none";

/** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: TocBuildFromPr;
  TocStyle?: TocStyle;
}

/** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

/** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "pdf"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocStyleLvl {
  Name: string;
  Lvl: number;
}

/** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "pdf"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
interface TofPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: CaptionLabel | string;
  LabelNumber?: boolean;
  TofStyle?: TofStyle;
}

/** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "pdf"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

/** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "pdf"} drawing.SetVerticalTextAlign("top"); ``` */
type VerticalTextAlign = "top" | "center" | "bottom";

/** The watermark direction.  ## Try it   ```js document-builder={"documentType": "pdf"} watermarkSettings.SetDirection("clockwise45"); ``` */
type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45";

/** The watermark type.  ## Try it   ```js document-builder={"documentType": "pdf"} watermarkSettings.SetType("text"); ``` */
type WatermarkType = "none" | "text" | "image";

/** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

/** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "pdf"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
type byte = number;

/** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

/** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

/** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

/** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

/** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.SetHighlight("green"); ``` */
type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

/** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "pdf"} textPr.SetFontSize(22); ``` */
type hps = number;

/** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetSpacingLine(240, "auto"); ``` */
type line240 = number;

/** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "pdf"} textForm.SetCellWidth(7); ``` */
type mm = number;

/** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

/** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "pdf"} pictureForm.SetPicturePosition(70, 70); ``` */
type percentage = number;

/** A point.  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
type pt = number;

/** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "pdf"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
type pt_8 = number;

/** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "pdf"} paragraph.SetEqualColumns(2, 720); ``` */
type twips = number;

// Cross-file type stubs
type ALPHABETIC = any;
type AM = any;
type ApiBlockLvlSdt = any;
type ApiChart = any;
type ApiGroup = any;
type ApiHyperlink = any;
type ApiImage = any;
type ApiInlineLvlSdt = any;
type ApiOleObject = any;
type ApiParagraph = any;
type ApiRun = any;
type ApiShape = any;
type ApiTable = any;
type ApiTextPr = any;
type ApiUnsupported = any;
type Arabic = any;
type Equation = any;
type Figure = any;
type General = any;
type PM = any;
type ParaAdd = any;
type ParaPr = any;
type ParaRem = any;
type Red = any;
type Roman = any;
type Table = any;
type TextAdd = any;
type TextPr = any;
type TextRem = any;
type Unknown = any;

/** Base class */
interface Api {
  CreateCheckBoxForm(oFormPr?: CheckBoxFormPr): ApiCheckBoxForm;
  CreateComboBoxForm(oFormPr?: ComboBoxFormPr): ApiComboBoxForm;
  CreateDateForm(oFormPr?: DateFormPr): ApiDateForm;
  CreatePictureForm(oFormPr?: PictureFormPr): ApiPictureForm;
  CreateTextForm(oFormPr?: TextFormPr): ApiTextForm;
}

/** Class representing a document checkbox / radio button. */
interface ApiCheckBoxForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetRadioGroup(): string;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsChecked(): boolean;
  IsFixed(): boolean;
  IsRadioButton(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetChecked(isChecked?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRadioGroup(sKey?: string): void;
  SetRequired(bRequired?: boolean): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document combo box / dropdown list. */
interface ApiComboBoxForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetListValues(): string[];
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsEditable(): boolean;
  IsFixed(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SelectListValue(sValue?: string): boolean;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetListValues(aListString?: string[]): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetText(sText?: string): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a complex field. */
interface ApiComplexForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsFixed(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document date field. */
interface ApiDateForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetFormat(): string;
  GetLanguage(): string;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTime(): number;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsFixed(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetFormat(sFormat?: string): boolean;
  SetLanguage(sLangId?: string): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTime(nTimeStamp?: number): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document form base. */
interface ApiFormBase {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsFixed(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document picture form. */
interface ApiPictureForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetImage(): string;
  GetPicturePosition(): percentage[];
  GetScaleFlag(): ScaleFlag;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsFixed(): boolean;
  IsLockAspectRatio(): boolean;
  IsRequired(): boolean;
  IsRespectBorders(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetImage(sImageSrc?: string, nWidth?: number, nHeight?: number): boolean;
  SetLockAspectRatio(isLock?: boolean): boolean;
  SetPicturePosition(nShiftX?: percentage, nShiftY?: percentage): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetRespectBorders(isRespect?: boolean): boolean;
  SetScaleFlag(sScaleFlag?: ScaleFlag): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document text field. */
interface ApiTextForm {
  Clear(): void;
  Copy(): ApiForm;
  GetCharactersLimit(): number;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetText(): string;
  GetTextPr(): ApiTextPr;
  GetTipText(): string;
  GetWrapperShape(): ApiShape;
  IsAutoFit(): boolean;
  IsComb(): boolean;
  IsFixed(): boolean;
  IsMultiline(): boolean;
  IsRequired(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  SetAutoFit(bAutoFit?: boolean): boolean;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetBorderColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetCellWidth(nCellWidth?: number): boolean;
  SetCharactersLimit(nChars?: number): boolean;
  SetComb(bComb?: boolean): boolean;
  SetFormKey(sKey?: string): boolean;
  SetMultiline(bMultiline?: boolean): boolean;
  SetPlaceholderText(sText?: string): boolean;
  SetRequired(bRequired?: boolean): boolean;
  SetText(sText?: string): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTipText(sText?: string): boolean;
  ToFixed(width?: number, height?: number, keepPosition?: boolean): boolean;
  ToInline(): boolean;
}

