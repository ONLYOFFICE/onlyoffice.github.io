export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: slide

/** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "slide"} let copyTextForm = textForm.Copy(); ``` */
type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm;

/** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetAxieNumFormat("top", "0.00"); ``` */
type AxisPos = "top" | "bottom" | "right" | "left";

/** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "slide"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
type BlipFillType = "tile" | "stretch";

/** A border type.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
type BorderType = "none" | "single";

/** A bullet type which will be added to the paragraph in spreadsheet or presentation.  ## Try it   ```js document-builder={"documentType": "slide"} // The paragraph will be starting with the Arabic numeral which has parenthesis let bullet = Api.CreateNumbering("ArabicParenR"); ``` */
type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

/** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
type CaptionLabel = "Table" | "Equation" | "Figure";

/** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

/** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

/** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "slide"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
type ChartType = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboBarLine" | "comboBarLineSecondary" | "comboCustom" | "unknown";

/** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "slide"} let commentsReport = oDocument.GetCommentsReport(); ``` */
type CommentReport = Record<string, CommentReportRecord[]>;

/** Record of one comment.  ## Try it   ```js document-builder={"documentType": "slide"} let commentsReport = oDocument.GetCommentsReport(); ``` */
interface CommentReportRecord {
  IsAnswer?: boolean;
  CommentMessage: string;
  Date: number;
  DateUTC: number;
  QuoteText?: string;
}

/** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "slide"} doc.AddElement(paragraph); ``` */
type DocumentElement = ApiParagraph;

/** Any valid drawing element. */
type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiTable | ApiChart;

/** Available drawing element for grouping. */
type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

/** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "slide"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

/** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
type EMU = number;

/** Form data.  ## Try it   ```js document-builder={"documentType": "slide"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
interface FormData {
  key: string;
  value: string | boolean;
  tag: string;
  type: FormSpecificType;
}

/** The specific form type.  ## Try it   ```js document-builder={"documentType": "slide"} let formsData = doc.GetFormsData(); ``` */
type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio";

/** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "slide"} let formType = textForm.GetFormType(); ``` */
type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm";

/** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "slide"} let docContent = finalSection.RemoveHeader("title"); ``` */
type HdrFtrType = "default" | "title" | "even";

/** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "slide"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

/** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddElement(run, 0); ``` */
type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

/** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "slide"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

/** Available placeholder types. */
type PlaceholderType = "body" | "chart" | "clipArt" | "ctrTitle" | "diagram" | "date" | "footer" | "header" | "media" | "object" | "picture" | "sldImage" | "sldNumber" | "subTitle" | "table" | "title";

/** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "slide"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
type PositiveFixedAngle = number;

/** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "slide"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
type PositivePercentage = number;

/** The available preset color names.  ## Try it   ```js document-builder={"documentType": "slide"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

/** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetHorAlign("page", "center"); ``` */
type RelFromH = "character" | "column" | "leftMargin" | "rightMargin" | "margin" | "page";

/** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetVerAlign("page", "center"); ``` */
type RelFromV = "bottomMargin" | "topMargin" | "margin" | "page" | "line" | "paragraph";

/** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
type ReviewReport = Record<string, ReviewReportRecord[]>;

/** Record of one review change.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
interface ReviewReportRecord {
  Type: ReviewReportRecordType;
  Value?: string;
  Date: number;
  ReviewedElement: ApiParagraph | ApiTable;
}

/** Review record type.  ## Try it   ```js document-builder={"documentType": "slide"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

/** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "slide"} pictureForm.SetScaleFlag("tooBig"); ``` */
type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

/** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "slide"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

/** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "slide"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

/** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

/** Represents the type of objects in a selection. */
type SelectionType = "none" | "shapes" | "slides" | "text";

/** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "slide"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "slide"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
type ShdType = "nil" | "clear";

/** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "slide"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
type StyleType = "paragraph" | "table" | "run" | "numbering";

/** Types of custom tab.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
type TabJc = "clear" | "left" | "right" | "center";

/** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "slide"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

/** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "slide"} tableCell.SetWidth("twips", 2000); ``` */
type TableWidth = "auto" | "twips" | "nul" | "percent";

/** Text transform type.  ## Try it   ```js document-builder={"documentType": "slide"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

/** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - set the position of the selected tick labels next to the main label. <b>"low"</b> - set the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - set the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
type TickLabelPosition = "none" | "nextTo" | "low" | "high";

/** The available types of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "slide"} chart.SetVertAxisMajorTickMark("cross"); ``` */
type TickMark = "cross" | "in" | "none" | "out";

/** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "slide"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocBuildFromPr {
  OutlineLvls?: number;
  StylesLvls: TocStyleLvl[];
}

/** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "slide"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
type TocLeader = "dot" | "dash" | "underline" | "none";

/** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "slide"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: TocBuildFromPr;
  TocStyle?: TocStyle;
}

/** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "slide"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

/** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "slide"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocStyleLvl {
  Name: string;
  Lvl: number;
}

/** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "slide"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
interface TofPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: CaptionLabel | string;
  LabelNumber?: boolean;
  TofStyle?: TofStyle;
}

/** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "slide"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

/** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "slide"} drawing.SetVerticalTextAlign("top"); ``` */
type VerticalTextAlign = "top" | "center" | "bottom";

/** The watermark direction.  ## Try it   ```js document-builder={"documentType": "slide"} watermarkSettings.SetDirection("clockwise45"); ``` */
type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45";

/** The watermark type.  ## Try it   ```js document-builder={"documentType": "slide"} watermarkSettings.SetType("text"); ``` */
type WatermarkType = "none" | "text" | "image";

/** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

/** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "slide"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
type byte = number;

/** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

/** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

/** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

/** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

/** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.SetHighlight("green"); ``` */
type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

/** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "slide"} textPr.SetFontSize(22); ``` */
type hps = number;

/** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetSpacingLine(240, "auto"); ``` */
type line240 = number;

/** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "slide"} textForm.SetCellWidth(7); ``` */
type mm = number;

/** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

/** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "slide"} pictureForm.SetPicturePosition(70, 70); ``` */
type percentage = number;

/** A point.  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
type pt = number;

/** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "slide"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
type pt_8 = number;

/** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "slide"} paragraph.SetEqualColumns(2, 720); ``` */
type twips = number;

// Cross-file type stubs
type ALPHABETIC = any;
type AM = any;
type AlphaLcParenR = any;
type AlphaLcPeriod = any;
type AlphaUcParenR = any;
type AlphaUcPeriod = any;
type ApiCheckBoxForm = any;
type ApiComboBoxForm = any;
type ApiComplexForm = any;
type ApiDateForm = any;
type ApiPictureForm = any;
type ApiStyle = any;
type ApiTextForm = any;
type Arabic = any;
type ArabicParenR = any;
type ArabicPeriod = any;
type Equation = any;
type Figure = any;
type General = any;
type None = any;
type PM = any;
type ParaAdd = any;
type ParaPr = any;
type ParaRem = any;
type Red = any;
type Roman = any;
type RomanLcPeriod = any;
type RomanUcPeriod = any;
type Table = any;
type TextAdd = any;
type TextPr = any;
type TextRem = any;
type Unknown = any;

interface Api {
  CreateBlipFill(imageUrl?: string, blipFillType?: BlipFillType): ApiFill;
  CreateBullet(sSymbol?: string): ApiBullet;
  CreateChart(sType?: ChartType, aSeries?: any[], aSeriesNames?: any[], aCatNames?: any[], nWidth?: number, nHeight?: number, nStyleIndex?: number, aNumFormats?: NumFormat[] | string[]): ApiChart;
  CreateGradientStop(uniColor?: ApiUniColor, pos?: PositivePercentage): ApiGradientStop;
  CreateGroup(aDrawings?: DrawingForGroup[]): ApiGroup;
  CreateImage(sImageSrc?: string, nWidth?: number, nHeight?: number): ApiImage;
  CreateLayout(oMaster?: ApiMaster): ApiLayout;
  CreateLinearGradientFill(gradientStops?: any[], angle?: PositiveFixedAngle): ApiFill;
  CreateMaster(oTheme?: ApiTheme): ApiMaster;
  CreateNoFill(): ApiFill;
  CreateOleObject(sImageSrc?: string, nWidth?: number, nHeight?: number, sData?: string, sAppId?: string): ApiOleObject;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType?: PatternType, bgColor?: ApiUniColor, fgColor?: ApiUniColor): ApiFill;
  CreatePlaceholder(sType?: string): ApiPlaceholder;
  CreatePresetColor(presetColor?: PresetColor): ApiPresetColor;
  CreateRGBColor(r?: number, g?: number, b?: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops?: any[]): ApiFill;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId?: SchemeColorId): ApiSchemeColor;
  CreateShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke): ApiShape;
  CreateSlide(): ApiSlide;
  CreateSolidFill(uniColor?: ApiUniColor): ApiFill;
  CreateStroke(width?: number, fill?: ApiFill): ApiStroke;
  CreateTable(nCols?: any, nRows?: any): ApiTable;
  CreateTextPr(): ApiTextPr;
  CreateTheme(sName?: string, oMaster?: ApiMaster, oClrScheme?: ApiThemeColorScheme, oFormatScheme?: ApiThemeFormatScheme, oFontScheme?: ApiThemeFontScheme): ApiTheme | null;
  CreateThemeColorScheme(arrColors?: ApiUniColor[] | ApiRGBColor[], sName?: string): ApiThemeColorScheme;
  CreateThemeFontScheme(mjLatin?: string, mjEa?: string, mjCs?: string, mnLatin?: string, mnEa?: string, mnCs?: string, sName?: string): ApiThemeFontScheme;
  CreateThemeFormatScheme(arrFill?: ApiFill[], arrBgFill?: ApiFill[], arrLine?: ApiStroke[], sName?: string): ApiThemeFormatScheme;
  CreateWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nIndLeft?: number, nIndTop?: number): ApiDrawing;
  FromJSON(sMessage?: object): void;
  GetFullName(): string;
  GetPresentation(): ApiPresentation;
  GetSelection(): ApiSelection;
  ReplaceTextSmart(textStrings?: any[], tab?: string, newLine?: string): void;
  Save(): void;
  attachEvent(eventName?: string, callback?: (...args: any[]) => any): void;
  detachEvent(eventName?: string): void;
}

/** Class representing a paragraph bullet. */
interface ApiBullet {
  GetClassType(): "bullet";
}

/** Class representing a chart. */
interface ApiChart {
  ApplyChartStyle(nStyleId?: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetSeries(nIdx?: number): ApiChartSeries;
  RemoveSeria(nSeria?: number): boolean;
  SetAxieNumFormat(sFormat?: NumFormat | string, sAxiePos?: AxisPos): boolean;
  SetCategoryName(sName?: string, nCategory?: number): boolean;
  SetDataPointFill(oFill?: ApiFill, nSeries?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetDataPointNumFormat(sFormat?: NumFormat | string, nSeria?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetDataPointOutLine(oStroke?: ApiStroke, nSeries?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetHorAxisMajorTickMark(sTickMark?: TickMark): void;
  SetHorAxisMinorTickMark(sTickMark?: TickMark): void;
  SetHorAxisOrientation(bIsMinMax?: boolean): void;
  SetHorAxisTickLabelPosition(sTickLabelPosition?: TickLabelPosition): void;
  SetHorAxisTitle(sTitle?: string, nFontSize?: number, bIsBold?: boolean): void;
  SetLegendFill(oFill?: ApiFill): boolean;
  SetLegendFontSize(nFontSize?: number): void;
  SetLegendOutLine(oStroke?: ApiStroke): boolean;
  SetLegendPos(sLegendPos?: "left" | "top" | "right" | "bottom" | "none"): void;
  SetMajorHorizontalGridlines(oStroke?: ApiStroke): void;
  SetMajorVerticalGridlines(oStroke?: ApiStroke): void;
  SetMarkerFill(oFill?: ApiFill, nSeries?: number, nMarker?: number, bAllMarkers?: boolean): boolean;
  SetMarkerOutLine(oStroke?: ApiStroke, nSeries?: number, nMarker?: number, bAllMarkers?: boolean): boolean;
  SetMinorHorizontalGridlines(oStroke?: ApiStroke): void;
  SetMinorVerticalGridlines(oStroke?: ApiStroke): void;
  SetPlotAreaFill(oFill?: ApiFill): boolean;
  SetPlotAreaOutLine(oStroke?: ApiStroke): boolean;
  SetSeriaName(sName?: string, nSeria?: number): boolean;
  SetSeriaNumFormat(sFormat?: NumFormat | string, nSeria?: number): boolean;
  SetSeriaValues(aValues?: number[], nSeria?: number): boolean;
  SetSeriesFill(oFill?: ApiFill, nSeries?: number, bAll?: boolean): boolean;
  SetSeriesOutLine(oStroke?: ApiStroke, nSeries?: number, bAll?: boolean): boolean;
  SetShowDataLabels(bShowSerName?: boolean, bShowCatName?: boolean, bShowVal?: boolean, bShowPercent?: boolean): void;
  SetShowPointDataLabel(nSeriesIndex?: number, nPointIndex?: number, bShowSerName?: boolean, bShowCatName?: boolean, bShowVal?: boolean, bShowPercent?: boolean): void;
  SetTitle(sTitle?: string, nFontSize?: number, bIsBold?: boolean): void;
  SetTitleFill(oFill?: ApiFill): boolean;
  SetTitleOutLine(oStroke?: ApiStroke): boolean;
  SetVerAxisOrientation(bIsMinMax?: boolean): void;
  SetVerAxisTitle(sTitle?: string, nFontSize?: number, bIsBold?: boolean): void;
  SetVertAxisMajorTickMark(sTickMark?: TickMark): void;
  SetVertAxisMinorTickMark(sTickMark?: TickMark): void;
  SetVertAxisTickLabelPosition(sTickLabelPosition?: TickLabelPosition): void;
  SetXValues(aValues?: string[]): boolean;
}

/** Class representing a chart series. */
interface ApiChartSeries {
  ChangeChartType(sType?: ChartType): boolean;
  GetChartType(): ChartType;
  GetClassType(): "chartSeries";
}

/** Class representing a comment. */
interface ApiComment {
  AddReply(sText?: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;
  Delete(): boolean;
  GetAuthorName(): string;
  GetClassType(): "comment";
  GetQuoteText(): number;
  GetRepliesCount(): number;
  GetText(): string;
  GetTime(): number;
  GetTimeUTC(): number;
  IsSolved(): boolean;
  RemoveReplies(nPos?: number, nCount?: number, bRemoveAll?: boolean): ApiComment;
  SetAuthorName(sAuthorName?: string): ApiComment;
  SetSolved(bSolved?: boolean): ApiComment;
  SetText(sText?: string): ApiComment;
  SetTime(nTimeStamp?: number | string): ApiComment;
  SetTimeUTC(nTimeStamp?: number | string): ApiComment;
  SetUserId(sUserId?: string): ApiComment;
}

/** Class representing a comment reply. */
interface ApiCommentReply {
  GetAuthorName(): string;
  GetClassType(): "commentReply";
  GetText(): string;
  SetAuthorName(sAuthorName?: string): ApiCommentReply;
  SetText(sText?: string): ApiCommentReply;
  SetUserId(sUserId?: string): ApiCommentReply;
}

/** Class representing a container for paragraphs and tables. */
interface ApiDocumentContent {
  AddElement(nPos?: number, oElement?: DocumentElement): void;
  GetClassType(): "documentContent";
  GetElement(nPos?: number): DocumentElement;
  GetElementsCount(): number;
  Push(oElement?: DocumentElement): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos?: number): void;
}

/** Class representing a graphical object. */
interface ApiDrawing {
  Copy(): ApiDrawing;
  Delete(): boolean;
  GetClassType(): "drawing";
  GetHeight(): number;
  GetLockValue(sType?: DrawingLockType): boolean;
  GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
  GetParentLayout(): ApiLayout | null;
  GetParentMaster(): ApiMaster | null;
  GetParentSlide(): ApiSlide | null;
  GetPlaceholder(): ApiPlaceholder | null;
  GetWidth(): number;
  Select(): void;
  SetLockValue(sType?: DrawingLockType, bValue?: boolean): boolean;
  SetPlaceholder(oPlaceholder?: ApiPlaceholder): boolean;
  SetPosition(nPosX?: number, nPosY?: number): void;
  SetSize(nWidth?: number, nHeight?: number): void;
  ToJSON(): object;
}

/** Class representing a base class for fill. */
interface ApiFill {
  GetClassType(): "fill";
}

/** Class representing gradient stop. */
interface ApiGradientStop {
  GetClassType(): "gradientStop";
}

/** Class representing a group of drawings. */
interface ApiGroup {
  GetClassType(): "group";
  Ungroup(): boolean;
}

/** Class representing a Paragraph hyperlink. */
interface ApiHyperlink {
  GetClassType(): "hyperlink";
  GetDisplayedText(): string;
  GetElement(nPos?: number): ParagraphContent;
  GetElementsCount(): number;
  GetLinkedText(): string;
  GetScreenTipText(): string;
  SetDefaultStyle(): boolean;
  SetDisplayedText(sDisplay?: string): boolean;
  SetLink(sLink?: string): boolean;
  SetScreenTipText(sScreenTipText?: string): boolean;
}

/** Class representing an image. */
interface ApiImage {
  GetClassType(): "image";
}

/** Class representing a slide layout. */
interface ApiLayout {
  AddObject(oDrawing?: ApiDrawing): boolean;
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
  GetClassType(): "layout";
  GetDrawingsByPlaceholderType(sType?: PlaceholderType): Drawing[];
  GetMaster(): ApiMaster;
  GetName(): string;
  GroupDrawings(aDrawings?: DrawingForGroup[]): ApiGroup;
  MoveTo(nPos?: number): boolean;
  RemoveObject(nPos?: number, nCount?: number): boolean;
  SetBackground(oApiFill?: ApiFill): boolean;
  SetName(sName?: string): boolean;
  ToJSON(bWriteMaster?: boolean, bWriteTableStyles?: boolean): object;
}

/** Class representing a slide master. */
interface ApiMaster {
  AddLayout(nPos?: number, oLayout?: ApiLayout): boolean;
  AddObject(oDrawing?: ApiDrawing): boolean;
  ClearBackground(): boolean;
  Copy(): ApiMaster | null;
  Delete(): boolean;
  Duplicate(nPos?: number): ApiMaster | null;
  GetAllCharts(): ApiChart[];
  GetAllDrawings(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllShapes(): ApiShape[];
  GetClassType(): "master";
  GetDrawingsByPlaceholderType(sType?: PlaceholderType): Drawing[];
  GetLayout(nPos?: number): ApiLayout | null;
  GetLayoutsCount(): number;
  GetTheme(): ApiTheme | null;
  GroupDrawings(aDrawings?: DrawingForGroup[]): ApiGroup;
  RemoveLayout(nPos?: number, nCount?: number): boolean;
  RemoveObject(nPos?: number, nCount?: number): boolean;
  SetBackground(oApiFill?: ApiFill): boolean;
  SetTheme(oTheme?: ApiTheme): boolean;
  ToJSON(bWriteTableStyles?: boolean): object;
}

/** Class representing an OLE object. */
interface ApiOleObject {
  GetApplicationId(): string;
  GetClassType(): "oleObject";
  GetData(): string;
  SetApplicationId(sAppId?: string): boolean;
  SetData(sData?: string): boolean;
}

/** Class representing the paragraph properties. */
interface ApiParaPr {
  GetClassType(): "paraPr";
  GetIndFirstLine(): number | undefined;
  GetIndLeft(): number | undefined;
  GetIndRight(): number | undefined;
  GetJc(): "left" | "right" | "both" | "center" | undefined;
  GetOutlineLvl(): number;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  SetBullet(oBullet?: ApiBullet): void;
  SetIndFirstLine(nValue?: number): void;
  SetIndLeft(nValue?: number): void;
  SetIndRight(nValue?: number): void;
  SetJc(sJc?: "left" | "right" | "both" | "center"): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetSpacingAfter(nAfter?: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore?: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine?: number | line240, sLineRule?: "auto" | "atLeast" | "exact"): void;
  SetTabs(aPos?: number[], aVal?: TabJc[]): void;
}

/** Class representing a paragraph. */
interface ApiParagraph {
  AddElement(oElement?: ParagraphContent, nPos?: number): boolean;
  AddLineBreak(): ApiRun;
  AddTabStop(): ApiRun;
  AddText(sText?: string): ApiRun;
  Copy(): ApiParagraph;
  Delete(): boolean;
  GetClassType(): "paraPr";
  GetElement(nPos?: number): ParagraphContent;
  GetElementsCount(): number;
  GetIndFirstLine(): number | undefined;
  GetIndLeft(): number | undefined;
  GetIndRight(): number | undefined;
  GetJc(): "left" | "right" | "both" | "center" | undefined;
  GetNext(): ApiParagraph | null;
  GetOutlineLvl(): number;
  GetParaPr(): ApiParaPr;
  GetPrevious(): ApiParagraph;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  RemoveAllElements(): void;
  RemoveElement(nPos?: number): void;
  SetBullet(oBullet?: ApiBullet): void;
  SetHighlight(sColor?: highlightColor): ApiParagraph;
  SetIndFirstLine(nValue?: number): void;
  SetIndLeft(nValue?: number): void;
  SetIndRight(nValue?: number): void;
  SetJc(sJc?: "left" | "right" | "both" | "center"): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetSpacingAfter(nAfter?: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore?: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine?: number | line240, sLineRule?: "auto" | "atLeast" | "exact"): void;
  SetTabs(aPos?: number[], aVal?: TabJc[]): void;
}

/** Class representing a placeholder. */
interface ApiPlaceholder {
  GetClassType(): "placeholder";
  GetIndex(): number | undefined;
  GetType(): PlaceholderType;
  SetIndex(nIdx?: number): boolean;
  SetType(sType?: PlaceholderType): boolean;
}

/** Class representing a presentation. */
interface ApiPresentation {
  AddMaster(nPos?: number, oApiMaster?: ApiMaster): boolean;
  AddSlide(oSlide?: ApiSlide): void;
  ApplyTheme(oApiTheme?: ApiTheme): boolean;
  CreateNewHistoryPoint(): void;
  GetAllComments(): ApiComment[];
  GetAllSlideMasters(): ApiMaster[];
  GetAllSlides(): ApiSlide[];
  GetClassType(): "presentation";
  GetCurSlideIndex(): number;
  GetCurrentSlide(): ApiSlide;
  GetDocumentInfo(): object;
  GetHeight(): number;
  GetMaster(nPos?: number): ApiMaster | null;
  GetMastersCount(): number;
  GetSlideByIndex(nIndex?: number): ApiSlide;
  GetSlidesCount(): number;
  GetWidth(): number;
  RemoveSlides(nStart?: number, nCount?: number): boolean;
  ReplaceCurrentImage(sImageUrl?: string, Width?: number, Height?: number): void;
  SetLanguage(sLangId?: string): boolean;
  SetSizes(nWidth?: number, nHeight?: number): void;
  SlidesToJSON(nStart?: boolean, nStart_2?: boolean, bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object[];
  ToJSON(bWriteTableStyles?: boolean): object;
}

/** Class representing a Preset Color. */
interface ApiPresetColor {
  GetClassType(): "presetColor";
}

/** Class representing an RGB Color. */
interface ApiRGBColor {
  GetClassType(): "rgbColor";
}

/** Class representing a small text block called 'run'. */
interface ApiRun {
  AddLineBreak(): void;
  AddTabStop(): void;
  AddText(sText?: string): void;
  ClearContent(): void;
  Copy(): ApiRun;
  Delete(): void;
  GetBold(): boolean;
  GetCaps(): boolean;
  GetClassType(): "textPr";
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
  RemoveAllElements(): void;
  SetBold(isBold?: boolean): ApiTextPr;
  SetCaps(isCaps?: boolean): ApiTextPr;
  SetColor(r?: number, g?: number, b?: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiTextPr;
  SetFill(oApiFill?: ApiFill): ApiTextPr;
  SetFontFamily(sFontFamily?: string): ApiTextPr;
  SetFontSize(nSize?: hps): ApiTextPr;
  SetHighlight(sColor?: highlightColor): ApiTextPr;
  SetItalic(isItalic?: boolean): ApiTextPr;
  SetLanguage(sLangId?: string): ApiTextPr;
  SetOutLine(oStroke?: ApiStroke): ApiTextPr;
  SetPosition(nPosition?: hps): ApiTextPr;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number): ApiTextPr;
  SetSmallCaps(isSmallCaps?: boolean): ApiTextPr;
  SetSpacing(nSpacing?: number): ApiTextPr;
  SetStrikeout(isStrikeout?: boolean): ApiTextPr;
  SetStyle(oStyle?: ApiStyle): ApiTextPr;
  SetTextFill(oApiFill?: ApiFill): ApiTextPr;
  SetTextPr(oTextPr?: ApiTextPr): ApiTextPr;
  SetUnderline(isUnderline?: boolean): ApiTextPr;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiTextPr;
}

/** Class representing a Scheme Color. */
interface ApiSchemeColor {
  GetClassType(): "schemeColor";
}

/** Class representing the selection in the presentation. */
interface ApiSelection {
  GetShapes(): ApiDrawing[];
  GetSlides(): ApiSlide[];
  GetType(): SelectionType;
  IsEmpty(): boolean;
}

/** Class representing a shape. */
interface ApiShape {
  GetClassType(): "shape";
  GetContent(): ApiDocumentContent;
  GetDocContent(): ApiDocumentContent;
  SetVerticalTextAlign(VerticalAlign?: VerticalTextAlign): void;
}

/** Class representing a slide. */
export interface ApiSlide {
  AddObject(oDrawing?: ApiDrawing): boolean;
  ApplyLayout(oLayout?: ApiLayout): boolean;
  ApplyTheme(oApiTheme?: ApiTheme): boolean;
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
  GetClassType(): "slide";
  GetDrawingsByPlaceholderType(sType?: PlaceholderType): Drawing[];
  GetHeight(): number;
  GetLayout(): ApiLayout | null;
  GetSlideIndex(): number;
  GetTheme(): ApiTheme;
  GetVisible(): boolean;
  GetWidth(): number;
  GroupDrawings(aDrawings?: DrawingForGroup[]): ApiGroup;
  MoveTo(nPos?: number): boolean;
  RemoveAllObjects(): void;
  RemoveObject(nPos?: number, nCount?: number): boolean;
  Select(): void;
  SetBackground(oApiFill?: ApiFill): boolean;
  SetVisible(value?: boolean): boolean;
  ToJSON(bWriteLayout?: boolean, bWriteMaster?: boolean, bWriteAllMasLayouts?: boolean, bWriteTableStyles?: boolean): object;
}

/** Class representing a stroke. */
interface ApiStroke {
  GetClassType(): "stroke";
}

/** Class representing a table. */
interface ApiTable {
  AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;
  AddElement(oCell?: ApiTableCell, nPos?: number, oElement?: DocumentElement): void;
  AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
  Copy(): ApiTable;
  GetClassType(): "table";
  GetRow(nIndex?: number): ApiTableRow;
  MergeCells(aCells?: ApiTableCell[]): ApiTableCell;
  RemoveColumn(oCell?: ApiTableCell): boolean;
  RemoveRow(oCell?: ApiTableCell): boolean;
  SetShd(sType?: ShdType | ApiFill, r?: number, g?: number, b?: number): void;
  SetTableLook(isFirstColumn?: boolean, isFirstRow?: boolean, isLastColumn?: boolean, isLastRow?: boolean, isHorBand?: boolean, isVerBand?: boolean): void;
  ToJSON(bWriteTableStyles?: boolean): object;
}

/** Class representing a table cell. */
interface ApiTableCell {
  GetClassType(): "tableCell";
  GetContent(): ApiDocumentContent;
  SetCellBorderBottom(fSize?: number, oApiFill?: ApiFill): void;
  SetCellBorderLeft(fSize?: number, oApiFill?: ApiFill): void;
  SetCellBorderRight(fSize?: number, oApiFill?: ApiFill): void;
  SetCellBorderTop(fSize?: number, oApiFill?: ApiFill): void;
  SetCellMarginBottom(nValue?: number): void;
  SetCellMarginLeft(nValue?: number): void;
  SetCellMarginRight(nValue?: number): void;
  SetCellMarginTop(nValue?: number): void;
  SetShd(sType?: ShdType | ApiFill, r?: number, g?: number, b?: number): void;
  SetTextDirection(sType?: "lrtb" | "tbrl" | "btlr"): void;
  SetVerticalAlign(sType?: "top" | "center" | "bottom"): void;
}

/** Class representing a table row. */
interface ApiTableRow {
  GetCell(nPos?: number): ApiTableCell;
  GetCellsCount(): number;
  GetClassType(): "tableRow";
  SetHeight(nValue?: number): void;
}

/** Class representing the text properties. */
interface ApiTextPr {
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
  SetBold(isBold?: boolean): ApiTextPr;
  SetCaps(isCaps?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiTextPr;
  SetFill(oApiFill?: ApiFill): ApiTextPr;
  SetFontFamily(sFontFamily?: string): ApiTextPr;
  SetFontSize(nSize?: hps): ApiTextPr;
  SetHighlight(sColor?: highlightColor): ApiTextPr;
  SetItalic(isItalic?: boolean): ApiTextPr;
  SetOutLine(oStroke?: ApiStroke): ApiTextPr;
  SetSmallCaps(isSmallCaps?: boolean): ApiTextPr;
  SetSpacing(nSpacing?: number): ApiTextPr;
  SetStrikeout(isStrikeout?: boolean): ApiTextPr;
  SetTextFill(oApiFill?: ApiFill): ApiTextPr;
  SetUnderline(isUnderline?: boolean): ApiTextPr;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiTextPr;
}

/** Class representing a presentation theme. */
interface ApiTheme {
  GetClassType(): "theme";
  GetColorScheme(): ApiThemeColorScheme;
  GetFontScheme(): ApiThemeFontScheme;
  GetFormatScheme(): ApiThemeFormatScheme;
  GetMaster(): ApiMaster | null;
  SetColorScheme(oApiColorScheme?: ApiThemeColorScheme): boolean;
  SetFontScheme(oApiFontScheme?: ApiThemeFontScheme): boolean;
  SetFormatScheme(oApiFormatScheme?: ApiThemeFormatScheme): boolean;
}

/** Class representing a theme color scheme. */
interface ApiThemeColorScheme {
  ChangeColor(nPos?: number, oColor?: ApiUniColor | ApiRGBColor): boolean;
  Copy(): ApiThemeColorScheme;
  GetClassType(): "themeColorScheme";
  SetSchemeName(sName?: string): boolean;
  ToJSON(): object;
}

/** Class representing a theme font scheme. */
interface ApiThemeFontScheme {
  Copy(): ApiThemeFontScheme;
  GetClassType(): "themeFontScheme";
  SetFonts(mjLatin?: string, mjEa?: string, mjCs?: string, mnLatin?: string, mnEa?: string, mnCs?: string): void;
  SetSchemeName(sName?: string): boolean;
  ToJSON(): object;
}

/** Class representing a theme format scheme. */
interface ApiThemeFormatScheme {
  ChangeBgFillStyles(arrBgFill?: ApiFill[]): void;
  ChangeFillStyles(arrFill?: ApiFill[]): void;
  ChangeLineStyles(arrLine?: ApiStroke[]): void;
  Copy(): ApiThemeFormatScheme;
  GetClassType(): "themeFormatScheme";
  SetSchemeName(sName?: string): boolean;
  ToJSON(): object;
}

/** Class representing a base class for color types. */
interface ApiUniColor {
  GetClassType(): "uniColor";
}

/** Class representing an unsupported element. */
interface ApiUnsupported {
  GetClassType(): "unsupported";
}

