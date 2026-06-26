export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: word

/** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "word"} let copyTextForm = textForm.Copy(); ``` */
type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm;

/** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetAxieNumFormat("top", "0.00"); ``` */
type AxisPos = "top" | "bottom" | "right" | "left";

/** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "word"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
type BlipFillType = "tile" | "stretch";

/** A border type which will be added to the document element. <b>"none"</b> - no border will be added to the created element or the selected element side. <b>"single"</b> - a single border will be added to the created element or the selected element side.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
type BorderType = "none" | "single";

/** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
type CaptionLabel = "Table" | "Equation" | "Figure";

/** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

/** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

/** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "word"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
type ChartType = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboBarLine" | "comboBarLineSecondary" | "comboCustom" | "unknown";

/** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "word"} let commentsReport = oDocument.GetCommentsReport(); ``` */
type CommentReport = Record<string, CommentReportRecord[]>;

/** Record of one comment.  ## Try it   ```js document-builder={"documentType": "word"} let commentsReport = oDocument.GetCommentsReport(); ``` */
interface CommentReportRecord {
  IsAnswer?: boolean;
  CommentMessage: string;
  Date: number;
  DateUTC: number;
  QuoteText?: string;
}

/** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "word"} doc.AddElement(paragraph); ``` */
type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

/** Any valid drawing element. */
type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart;

/** Available drawing element for grouping. */
type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

/** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "word"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

/** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
type EMU = number;

/** Form data.  ## Try it   ```js document-builder={"documentType": "word"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
interface FormData {
  key: string;
  value: string | boolean;
  tag: string;
  type: FormSpecificType;
}

/** The specific form type.  ## Try it   ```js document-builder={"documentType": "word"} let formsData = doc.GetFormsData(); ``` */
type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio";

/** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "word"} let formType = textForm.GetFormType(); ``` */
type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm";

/** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "word"} let docContent = finalSection.RemoveHeader("title"); ``` */
type HdrFtrType = "default" | "title" | "even";

/** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "word"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

/** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddElement(run, 0); ``` */
type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase;

/** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "word"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

/** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "word"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
type PositiveFixedAngle = number;

/** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "word"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
type PositivePercentage = number;

/** The available preset color names.  ## Try it   ```js document-builder={"documentType": "word"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

/** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetHorAlign("page", "center"); ``` */
type RelFromH = "character" | "column" | "leftMargin" | "rightMargin" | "margin" | "page";

/** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetVerAlign("page", "center"); ``` */
type RelFromV = "bottomMargin" | "topMargin" | "margin" | "page" | "line" | "paragraph";

/** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "word"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
type ReviewReport = Record<string, ReviewReportRecord[]>;

/** Record of one review change.  ## Try it   ```js document-builder={"documentType": "word"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
interface ReviewReportRecord {
  Type: ReviewReportRecordType;
  Value?: string;
  Date: number;
  ReviewedElement: ApiParagraph | ApiTable;
}

/** Review record type.  ## Try it   ```js document-builder={"documentType": "word"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

/** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "word"} pictureForm.SetScaleFlag("tooBig"); ``` */
type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

/** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "word"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

/** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "word"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

/** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

/** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "word"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "word"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
type ShdType = "nil" | "clear";

/** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "word"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
type StyleType = "paragraph" | "table" | "run" | "numbering";

/** Custom tab types.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
type TabJc = "clear" | "left" | "right" | "center";

/** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "word"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

/** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "word"} tableCell.SetWidth("twips", 2000); ``` */
type TableWidth = "auto" | "twips" | "nul" | "percent";

/** Text transform type.  ## Try it   ```js document-builder={"documentType": "word"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

/** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
type TickLabelPosition = "none" | "nextTo" | "low" | "high";

/** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "word"} chart.SetVertAxisMajorTickMark("cross"); ``` */
type TickMark = "cross" | "in" | "none" | "out";

/** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "word"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocBuildFromPr {
  OutlineLvls?: number;
  StylesLvls: TocStyleLvl[];
}

/** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "word"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
type TocLeader = "dot" | "dash" | "underline" | "none";

/** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "word"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: TocBuildFromPr;
  TocStyle?: TocStyle;
}

/** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "word"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

/** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "word"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocStyleLvl {
  Name: string;
  Lvl: number;
}

/** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "word"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
interface TofPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: CaptionLabel | string;
  LabelNumber?: boolean;
  TofStyle?: TofStyle;
}

/** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "word"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

/** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "word"} drawing.SetVerticalTextAlign("top"); ``` */
type VerticalTextAlign = "top" | "center" | "bottom";

/** The watermark direction.  ## Try it   ```js document-builder={"documentType": "word"} watermarkSettings.SetDirection("clockwise45"); ``` */
type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45";

/** The watermark type.  ## Try it   ```js document-builder={"documentType": "word"} watermarkSettings.SetType("text"); ``` */
type WatermarkType = "none" | "text" | "image";

/** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

/** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "word"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
type byte = number;

/** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

/** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

/** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

/** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

/** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.SetHighlight("green"); ``` */
type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

/** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "word"} textPr.SetFontSize(22); ``` */
type hps = number;

/** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetSpacingLine(240, "auto"); ``` */
type line240 = number;

/** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "word"} textForm.SetCellWidth(7); ``` */
type mm = number;

/** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "word"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

/** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "word"} pictureForm.SetPicturePosition(70, 70); ``` */
type percentage = number;

/** A point.  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
type pt = number;

/** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "word"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
type pt_8 = number;

/** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "word"} paragraph.SetEqualColumns(2, 720); ``` */
type twips = number;

// Cross-file type stubs
type ALPHABETIC = any;
type AM = any;
type ApiBullet = any;
type Arabic = any;
type BulletType = any;
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
  AddComment(element?: ApiRun[] | DocumentElement, text?: string, author?: string, userId?: string): ApiComment;
  ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;
  CreateBlipFill(imageUrl?: string, blipFillType?: BlipFillType): ApiFill;
  CreateBlockLvlSdt(): ApiBlockLvlSdt;
  CreateChart(chartType?: ChartType, series?: any[], seriesNames?: any[], catNames?: any[], width?: number, height?: number, styleIndex?: number, numFormats?: NumFormat[] | string[]): ApiChart;
  CreateGradientStop(uniColor?: ApiUniColor, pos?: PositivePercentage): ApiGradientStop;
  CreateGroup(drawings?: DrawingForGroup[]): ApiGroup;
  CreateHyperlink(link?: string, display?: string, screenTipText?: string): ApiHyperlink;
  CreateImage(imageSrc?: string, width?: number, height?: number): ApiImage;
  CreateInlineLvlSdt(): ApiInlineLvlSdt;
  CreateLinearGradientFill(gradientStops?: any[], angle?: PositiveFixedAngle): ApiFill;
  CreateNoFill(): ApiFill;
  CreateNumbering(numType?: BulletType, startAt?: number): ApiBullet;
  CreateOleObject(imageSrc?: string, width?: number, height?: number, data?: string, appId?: string): ApiOleObject;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType?: PatternType, bgColor?: ApiUniColor, fgColor?: ApiUniColor): ApiFill;
  CreatePresetColor(presetColor?: PresetColor): ApiPresetColor;
  CreateRGBColor(r?: number, g?: number, b?: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops?: any[]): ApiFill;
  CreateRange(element?: any, start?: any, end?: any): ApiRange | null;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId?: SchemeColorId): ApiSchemeColor;
  CreateShape(shapeType?: ShapeType, width?: number, height?: number, fill?: ApiFill, stroke?: ApiStroke): ApiShape;
  CreateSolidFill(uniColor?: ApiUniColor): ApiFill;
  CreateStroke(width?: number, fill?: ApiFill): ApiStroke;
  CreateTable(cols?: number, rows?: number): ApiTable;
  CreateTextPr(): ApiTextPr;
  CreateWordArt(textPr?: ApiTextPr, text?: string, transform?: TextTransform, fill?: ApiFill, stroke?: ApiStroke, rotAngle?: number, width?: number, height?: number): ApiDrawing;
  FromJSON(message?: object): void;
  GetDocument(): ApiDocument;
  GetFullName(): string;
  GetMailMergeReceptionsCount(): number;
  GetMailMergeTemplateDocContent(): ApiDocumentContent;
  LoadMailMergeData(data?: string[][]): boolean;
  MailMerge(startIndex?: number, endIndex?: number): boolean;
  ReplaceDocumentContent(documentContent?: ApiDocumentContent): void;
  ReplaceTextSmart(textStrings?: any[], tab?: string, newLine?: string): void;
  Save(): void;
  attachEvent(eventName?: string, callback?: (...args: any[]) => any): void;
  detachEvent(eventName?: string): void;
}

/** Class representing a container for the document content. */
interface ApiBlockLvlSdt {
  AddCaption(additionalText?: string, label?: CaptionLabel | string, excludeLabel?: boolean, numFormat?: CaptionNumberingFormat, isBefore?: boolean, headingLvl?: number, captionSep?: CaptionSep): boolean;
  AddComment(text?: string, author?: string, userId?: string): ApiComment;
  AddElement(element?: DocumentElement, pos?: number): boolean;
  AddText(text?: string): boolean;
  Copy(): ApiBlockLvlSdt;
  Delete(keepContent?: boolean): boolean;
  GetAlias(): string;
  GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetAllDrawingObjects(): Drawing[];
  GetAllParagraphs(): ApiParagraph[];
  GetAllTablesOnPage(page?: any): ApiTable[];
  GetClassType(): "blockLvlSdt";
  GetContent(): ApiDocumentContent;
  GetDropdownList(): ApiContentControlList;
  GetInternalId(): string;
  GetLabel(): string;
  GetLock(): SdtLock;
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPlaceholderText(): string;
  GetPosInParent(): number;
  GetRange(start?: number, end?: number): ApiRange;
  GetTag(): string;
  MoveCursorOutside(isAfter?: boolean): void;
  Push(element?: DocumentElement): boolean;
  RemoveAllElements(): boolean;
  ReplaceByElement(oElement?: DocumentElement): boolean;
  Search(text?: string, isMatchCase?: boolean): ApiRange[];
  Select(): void;
  SetAlias(alias?: string): void;
  SetLabel(sLabel?: string): void;
  SetLock(lockType?: "contentLocked" | "sdtContentLocked" | "sdtLocked"): void;
  SetPlaceholderText(text?: string): boolean;
  SetTag(tag?: string): void;
  SetTextPr(textPr?: ApiTextPr): void;
  ToJSON(bWriteNumberings?: boolean, bWriteStyles?: boolean): object;
}

/** Class representing a bookmark in the document. */
interface ApiBookmark {
  Delete(): boolean;
  GetName(): string;
  GetRange(): ApiRange;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TableCellSeparator?: string, oPr_TableRowSeparator?: string, oPr_ParaSeparator?: string, oPr_TabSymbol?: string): string;
  GoTo(): boolean;
  Select(): boolean;
  SetName(sNewName?: string): boolean;
  SetText(sText?: string): boolean;
}

/** Class representing a chart. */
interface ApiChart {
  ApplyChartStyle(nStyleId?: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetNextChart(): ApiChart | null;
  GetPrevChart(): ApiChart | null;
  GetSeries(nIdx?: number): ApiChartSeries;
  RemoveSeria(nSeria?: number): boolean;
  SetAxieNumFormat(sFormat?: NumFormat | string, sAxiePos?: AxisPos): boolean;
  SetCategoryName(sName?: string, nCategory?: number): boolean;
  SetDataPointFill(oFill?: ApiFill, nSeries?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetDataPointNumFormat(sFormat?: NumFormat | string, nSeria?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetDataPointOutLine(oStroke?: ApiStroke, nSeries?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
  SetHorAxisLablesFontSize(nFontSize?: number): void;
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
  SetVertAxisLablesFontSize(nFontSize?: number): void;
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

/** Class representing a comment. */
interface ApiComment {
  AddReply(sText?: string, sAuthorName?: string, sUserId?: string, nPos?: number): ApiComment;
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
  GetUserId(): string;
  SetAuthorName(sAuthorName?: string): ApiCommentReply;
  SetText(sText?: string): ApiCommentReply;
  SetUserId(sUserId?: string): ApiCommentReply;
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

/** Class representing a list of values of the combo box / dropdown list content control. */
interface ApiContentControlList {
  Add(sText?: string, sValue?: string, nIndex?: number): boolean;
  Clear(): void;
  GetAllItems(): ApiContentControlListEntry[];
  GetClassType(): "contentControlList";
  GetElementsCount(): number;
  GetItem(nIndex?: number): ApiContentControlListEntry;
  GetParent(): ApiInlineLvlSdt | ApiBlockLvlSdt;
}

/** Class representing an entry of the combo box / dropdown list content control. */
interface ApiContentControlListEntry {
  Delete(): boolean;
  GetClassType(): "contentControlList";
  GetIndex(): number;
  GetParent(): ApiContentControlList;
  GetText(): string;
  GetValue(): string;
  MoveDown(): boolean;
  MoveUp(): boolean;
  Select(): boolean;
  SetIndex(nIndex?: number): boolean;
  SetText(sText?: string): boolean;
  SetValue(sValue?: string): boolean;
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

/** Class representing a document. */
interface ApiDocument {
  AcceptAllRevisionChanges(): void;
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddDrawingToPage(oDrawing?: ApiDrawing, nPage?: number, x?: number, y?: number): boolean;
  AddElement(nPos?: number, oElement?: DocumentElement): void;
  AddEndnote(): ApiDocumentContent;
  AddFootnote(): ApiDocumentContent;
  AddMathEquation(sText?: string, sFormat?: "unicode" | "latex"): void;
  AddTableOfContents(oTocPr?: TocPr): void;
  AddTableOfFigures(oTofPr?: TofPr, bReplace?: boolean): boolean;
  ClearAllFields(): void;
  CreateNewHistoryPoint(): void;
  CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;
  CreateSection(oParagraph?: ApiParagraph): ApiSection | null;
  CreateStyle(sStyleName?: string, sType?: StyleType): ApiStyle;
  DeleteBookmark(sName?: string): boolean;
  GetAllBookmarksNames(): string[];
  GetAllCaptionParagraphs(sCaption?: CaptionLabel | string): ApiParagraph[];
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
  GetAllTables(): ApiParagraph[];
  GetAllTablesOnPage(nPage?: number): ApiTable[];
  GetBookmark(sBookmarkName?: string): ApiBookmark;
  GetBookmarkRange(sName?: string): ApiRange | null;
  GetClassType(): "documentContent";
  GetCommentById(sId?: string): ApiComment;
  GetCommentsReport(): CommentReport;
  GetContent(bGetCopies?: boolean): any[];
  GetContentControlsByTag(sTag?: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetCurrentPage(): number;
  GetCurrentSentence(sPart?: undefined | "before" | "after"): string;
  GetCurrentVisiblePages(): number[];
  GetCurrentWord(sWordPart?: undefined | "before" | "after"): string;
  GetDefaultParaPr(): ApiParaPr;
  GetDefaultStyle(sStyleType?: StyleType): ApiStyle;
  GetDefaultTextPr(): ApiTextPr;
  GetDocumentInfo(): object;
  GetElement(nPos?: number): DocumentElement;
  GetElementsCount(): number;
  GetEndNotesFirstParagraphs(): ApiParagraph[];
  GetFinalSection(): ApiSection;
  GetFootnotesFirstParagraphs(): ApiParagraph[];
  GetFormsByTag(sTag?: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetFormsData(): FormData[];
  GetPageCount(): number;
  GetRange(Start?: number, End?: number): ApiRange;
  GetRangeBySelect(): ApiRange | null;
  GetReviewReport(): ReviewReport;
  GetSections(): ApiSection[];
  GetSelectedDrawings(): ApiShape[] | ApiImage[] | ApiChart[] | ApiDrawing[];
  GetStatistics(): object;
  GetStyle(sStyleName?: string): ApiStyle;
  GetTagsOfAllContentControls(): string[];
  GetTagsOfAllForms(): string[];
  GetText(oProps?: object, oProps_Numbering?: boolean, oProps_Math?: boolean, oProps_TableCellSeparator?: string, oProps_TableRowSeparator?: string, oProps_ParaSeparator?: string, oProps_TabSymbol?: string, oProps_NewLineSeparator?: string): string;
  GetWatermarkSettings(): ApiWatermarkSettings;
  GroupDrawings(aDrawings?: DrawingForGroup[]): ApiGroup;
  InsertContent(arrContent?: DocumentElement[], isInline?: boolean, oPr?: object): boolean;
  InsertWatermark(sText?: string, bIsDiagonal?: boolean): ApiDrawing;
  IsTrackRevisions(): boolean;
  Last(): DocumentElement;
  Push(oElement?: DocumentElement): boolean;
  RejectAllRevisionChanges(): void;
  RemoveAllElements(): void;
  RemoveElement(nPos?: number): void;
  RemoveSelection(): void;
  RemoveWatermark(): void;
  ReplaceCurrentImage(sImageUrl?: string, Width?: number, Height?: number): void;
  ReplaceCurrentSentence(sReplace?: string, sPart?: undefined | "before" | "after"): boolean;
  ReplaceCurrentWord(sReplace?: string, sPart?: undefined | "before" | "after"): boolean;
  ReplaceDrawing(oOldDrawing?: ApiDrawing, oNewDrawing?: ApiDrawing, bSaveOldDrawingPr?: boolean): boolean;
  Search(sText?: string, isMatchCase?: boolean): ApiRange[];
  SearchAndReplace(oProperties?: object, oProperties_searchString?: string, oProperties_replaceString?: string, oProperties_matchCase?: string): void;
  SelectCurrentWord(): object;
  SetControlsHighlight(r?: number, g?: number, b?: number, bNone?: boolean): void;
  SetEvenAndOddHdrFtr(isEvenAndOdd?: boolean): void;
  SetFormsData(arrData?: FormData[]): void;
  SetFormsHighlight(r?: number, g?: number, b?: number, bNone?: boolean): void;
  SetTrackRevisions(isTrack?: boolean): void;
  SetWatermarkSettings(Settings?: ApiWatermarkSettings): ApiDrawing;
  ToHtml(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
  ToJSON(isWriteNumberings?: boolean, isWriteStyles?: boolean): object;
  ToMarkdown(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
  UpdateAllFields(bBySelection?: boolean): void;
  UpdateAllTOC(bOnlyPageNumbers?: boolean): void;
  UpdateAllTOF(bOnlyPageNumbers?: boolean): void;
}

/** Class representing a container for paragraphs and tables. */
interface ApiDocumentContent {
  AddElement(nPos?: number, oElement?: DocumentElement): void;
  GetAllCharts(): ApiChart[];
  GetAllDrawingObjects(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllParagraphs(): ApiParagraph[];
  GetAllShapes(): ApiShape[];
  GetAllTables(): ApiParagraph[];
  GetClassType(): "documentContent";
  GetContent(bGetCopies?: boolean): any[];
  GetElement(nPos?: number): DocumentElement;
  GetElementsCount(): number;
  GetRange(Start?: number, End?: number): ApiRange;
  GetText(oProps?: object, oProps_Numbering?: boolean, oProps_Math?: boolean, oProps_TableCellSeparator?: string, oProps_TableRowSeparator?: string, oProps_ParaSeparator?: string, oProps_TabSymbol?: string, oProps_NewLineSeparator?: string): string;
  Push(oElement?: DocumentElement): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos?: number): void;
  ToJSON(isWriteNumberings?: boolean, isWriteStyles?: boolean): object;
}

/** Class representing a graphical object. */
interface ApiDrawing {
  AddBreak(breakType?: number, position?: string): boolean;
  Copy(): ApiDrawing;
  Delete(): boolean;
  Fill(oFill?: ApiFill): boolean;
  GetClassType(): "drawing";
  GetContent(): ApiDocumentContent;
  GetHeight(): number;
  GetLockValue(sType?: DrawingLockType): boolean;
  GetNextDrawing(): ApiDrawing | null;
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentParagraph(): ApiParagraph | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPrevDrawing(): ApiDrawing | null;
  GetWidth(): number;
  InsertInContentControl(nType?: number): ApiDrawing | ApiBlockLvlSdt;
  InsertParagraph(paragraph?: string | ApiParagraph, sPosition?: string, beRNewPara?: boolean): ApiParagraph | ApiDrawing;
  ScaleHeight(coefficient?: number): boolean;
  ScaleWidth(coefficient?: number): boolean;
  Select(): void;
  SetDistances(nLeft?: number, nTop?: number, nRight?: number, nBottom?: number): void;
  SetDrawingPrFromDrawing(oAnotherDrawing?: ApiDrawing): boolean;
  SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): void;
  SetHorFlip(bFlip?: boolean): void;
  SetHorPosition(sRelativeFrom?: RelFromH, nDistance?: number): void;
  SetLockValue(sType?: DrawingLockType, bValue?: boolean): boolean;
  SetOutLine(oStroke?: ApiStroke): boolean;
  SetSize(nWidth?: number, nHeight?: number): void;
  SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): void;
  SetVerPosition(sRelativeFrom?: RelFromV, nDistance?: number): void;
  SetVertFlip(bFlip?: boolean): boolean;
  SetWrappingStyle(sType?: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): void;
  ToJSON(bWriteNumberings?: boolean, bWriteStyles?: boolean): object;
}

/** Class representing a base class for fill. */
interface ApiFill {
  GetClassType(): "fill";
  ToJSON(): object;
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

/** Class representing gradient stop. */
interface ApiGradientStop {
  GetClassType(): "gradientStop";
  ToJSON(): object;
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
  GetRange(Start?: number, End?: number): ApiRange;
  GetScreenTipText(): string;
  SetDefaultStyle(): boolean;
  SetDisplayedText(sDisplay?: string): boolean;
  SetLink(sLink?: string): boolean;
  SetScreenTipText(sScreenTipText?: string): boolean;
  ToJSON(bWriteStyles?: boolean): object;
}

/** Class representing an image. */
interface ApiImage {
  GetClassType(): "image";
  GetNextImage(): ApiImage | null;
  GetPrevImage(): ApiImage | null;
}

/** Class representing a container for the paragraph elements. */
interface ApiInlineLvlSdt {
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddElement(oElement?: ParagraphContent, nPos?: number): boolean;
  AddText(sText?: string): boolean;
  Copy(): ApiInlineLvlSdt;
  Delete(keepContent?: boolean): boolean;
  GetAlias(): string;
  GetClassType(): "inlineLvlSdt";
  GetDropdownList(): ApiContentControlList;
  GetElement(nPos?: number): ParagraphContent;
  GetElementsCount(): number;
  GetInternalId(): string;
  GetLabel(): string;
  GetLock(): SdtLock;
  GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
  GetParentParagraph(): ApiParagraph | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPlaceholderText(): string;
  GetRange(Start?: number, End?: number): ApiRange;
  GetTag(): string;
  IsForm(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  Push(oElement?: DocumentElement): boolean;
  RemoveAllElements(): boolean;
  RemoveElement(nPos?: number): boolean;
  SetAlias(sAlias?: string): void;
  SetLabel(sLabel?: string): void;
  SetLock(sLockType?: "contentLocked" | "sdtContentLocked" | "sdtLocked"): void;
  SetPlaceholderText(sText?: string): boolean;
  SetTag(sTag?: string): void;
  SetTextPr(oTextPr?: ApiTextPr): ApiInlineLvlSdt;
  ToJSON(bWriteStyles?: boolean): object;
}

/** Class representing the numbering properties. */
interface ApiNumbering {
  GetClassType(): "numbering";
  GetLevel(nLevel?: number): ApiNumberingLevel;
  ToJSON(): object;
}

/** Class representing a reference to a specified level of the numbering. */
interface ApiNumberingLevel {
  GetClassType(): "numberingLevel";
  GetLevelIndex(): number;
  GetNumbering(): ApiNumbering;
  GetParaPr(): ApiParaPr;
  GetTextPr(): ApiTextPr;
  LinkWithStyle(oStyle?: ApiStyle): void;
  SetCustomType(sType?: "none" | "bullet" | "decimal" | "lowerRoman" | "upperRoman" | "lowerLetter" | "upperLetter" | "decimalZero", sTextFormatString?: string, sAlign?: "left" | "right" | "center"): void;
  SetRestart(isRestart?: boolean): void;
  SetStart(nStart?: number): void;
  SetSuff(sType?: "space" | "tab" | "none"): void;
  SetTemplateType(sType?: "none" | "bullet" | "1)" | "1." | "I." | "A." | "a)" | "a." | "i.", sSymbol?: string): void;
}

/** Class representing an Ole object. */
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
  GetShd(): ApiRGBColor;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  GetStyle(): ApiStyle;
  SetBetweenBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetBottomBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetContextualSpacing(isContextualSpacing?: boolean): void;
  SetIndFirstLine(nValue?: number): void;
  SetIndLeft(nValue?: number): void;
  SetIndRight(nValue?: number): void;
  SetJc(sJc?: "left" | "right" | "both" | "center"): void;
  SetKeepLines(isKeepLines?: boolean): void;
  SetKeepNext(isKeepNext?: boolean): void;
  SetLeftBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetNumPr(oNumPr?: ApiNumbering, nLvl?: number): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetPageBreakBefore(isPageBreakBefore?: boolean): void;
  SetRightBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetSpacingAfter(nAfter?: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore?: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine?: number | line240, sLineRule?: "auto" | "atLeast" | "exact"): void;
  SetStyle(oStyle?: ApiStyle): void;
  SetTabs(aPos?: number[], aVal?: TabJc[]): void;
  SetTopBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetWidowControl(isWidowControl?: boolean): void;
  ToJSON(bWriteStyles?: boolean): object;
}

/** Class representing a paragraph. */
interface ApiParagraph {
  AddBookmarkCrossRef(sRefTo?: bookmarkRefTo, sBookmarkName?: string, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
  AddCaption(sAdditional?: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
  AddCaptionCrossRef(sCaption?: CaptionLabel | string, sRefType?: captionRefTo, oParaTo?: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddColumnBreak(): ApiRun;
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddDrawing(oDrawing?: ApiDrawing): ApiRun;
  AddElement(oElement?: ParagraphContent, nPos?: number): boolean;
  AddEndnoteCrossRef(sRefType?: endnoteRefTo, oParaTo?: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddFootnoteCrossRef(sRefType?: footnoteRefTo, oParaTo?: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddHeadingCrossRef(sRefType?: headingRefTo, oParaTo?: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddHyperlink(sLink?: string, sScreenTipText?: string): ApiHyperlink | null;
  AddInlineLvlSdt(oSdt?: ApiInlineLvlSdt): ApiInlineLvlSdt;
  AddLineBreak(): ApiRun;
  AddNumberedCrossRef(sRefType?: numberedRefTo, oParaTo?: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
  AddPageBreak(): ApiRun;
  AddPageNumber(): ApiRun;
  AddPagesCount(): ApiRun;
  AddTabStop(): ApiRun;
  AddText(sText?: string): ApiRun;
  Copy(): ApiParagraph;
  Delete(): boolean;
  GetAllCharts(): ApiChart[];
  GetAllContentControls(): ApiInlineLvlSdt[];
  GetAllDrawingObjects(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllShapes(): ApiShape[];
  GetClassType(): "paraPr";
  GetElement(nPos?: number): ParagraphContent;
  GetElementsCount(): number;
  GetFontNames(): string[];
  GetIndFirstLine(): number | undefined;
  GetIndLeft(): number | undefined;
  GetIndRight(): number | undefined;
  GetJc(): "left" | "right" | "both" | "center" | undefined;
  GetLastRunWithText(): ApiRun;
  GetNext(): ApiParagraph | null;
  GetNumbering(): ApiNumberingLevel;
  GetOutlineLvl(): number;
  GetParaPr(): ApiParaPr;
  GetParagraphMarkTextPr(): ApiTextPr;
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPosInParent(): number;
  GetPrevious(): ApiParagraph;
  GetRange(Start?: number, End?: number): ApiRange;
  GetSection(): ApiSection;
  GetShd(): ApiRGBColor;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  GetStyle(): ApiStyle;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TabSymbol?: string): string;
  GetTextPr(): ApiTextPr;
  InsertInContentControl(nType?: number): ApiParagraph | ApiBlockLvlSdt;
  InsertParagraph(paragraph?: string | ApiParagraph, sPosition?: string, beRNewPara?: boolean): ApiParagraph | null;
  Last(): ParagraphContent;
  Push(oElement?: ParagraphContent): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos?: number): void;
  ReplaceByElement(oElement?: DocumentElement): boolean;
  Search(sText?: string, isMatchCase?: boolean): ApiRange[];
  Select(): boolean;
  SetBetweenBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetBold(isBold?: boolean): ApiParagraph;
  SetBottomBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCaps(isCaps?: boolean): ApiParagraph;
  SetColor(r?: number, g?: number, b?: number, isAuto?: boolean): ApiParagraph;
  SetContextualSpacing(isContextualSpacing?: boolean): void;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiParagraph;
  SetFontFamily(sFontFamily?: string): ApiParagraph;
  SetFontSize(nSize?: hps): ApiParagraph;
  SetHighlight(sColor?: highlightColor): ApiParagraph;
  SetIndFirstLine(nValue?: number): void;
  SetIndLeft(nValue?: number): void;
  SetIndRight(nValue?: number): void;
  SetItalic(isItalic?: boolean): ApiParagraph;
  SetJc(sJc?: "left" | "right" | "both" | "center"): void;
  SetKeepLines(isKeepLines?: boolean): void;
  SetKeepNext(isKeepNext?: boolean): void;
  SetLeftBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetNumPr(oNumPr?: ApiNumbering, nLvl?: number): void;
  SetNumbering(oNumberingLevel?: ApiNumberingLevel): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetPageBreakBefore(isPageBreakBefore?: boolean): void;
  SetPosition(nPosition?: hps): ApiParagraph;
  SetRightBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetSection(oSection?: ApiSection): boolean;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetSmallCaps(isSmallCaps?: boolean): ApiParagraph;
  SetSpacing(nSpacing?: number): ApiParagraph;
  SetSpacingAfter(nAfter?: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore?: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine?: number | line240, sLineRule?: "auto" | "atLeast" | "exact"): void;
  SetStrikeout(isStrikeout?: boolean): ApiParagraph;
  SetStyle(oStyle?: ApiStyle): void;
  SetTabs(aPos?: number[], aVal?: TabJc[]): void;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetTopBorder(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetUnderline(isUnderline?: boolean): ApiParagraph;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiParagraph | null;
  SetWidowControl(isWidowControl?: boolean): void;
  ToJSON(bWriteStyles?: boolean): object;
  WrapInMailMergeField(): void;
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

/** Class representing a Preset Color. */
interface ApiPresetColor {
  GetClassType(): "presetColor";
  ToJSON(): object;
}

/** Class representing an RGB Color. */
interface ApiRGBColor {
  GetClassType(): "rgbColor";
  ToJSON(): object;
}

/** Class representing a continuous region in a document.  Each Range object is determined by the position of the start and end characters. */
interface ApiRange {
  AddBookmark(sName?: string): boolean;
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddHyperlink(sLink?: string, sScreenTipText?: string): ApiHyperlink | null;
  AddText(sText?: string, sPosition?: string): boolean;
  Delete(): boolean;
  ExpandTo(oRange?: ApiRange): ApiRange | null;
  GetAllParagraphs(): ApiParagraph[];
  GetClassType(): "range";
  GetEndPage(): number;
  GetEndPos(): number;
  GetParagraph(nPos?: number): ApiParagraph | null;
  GetRange(Start?: number, End?: number): ApiRange;
  GetStartPage(): number;
  GetStartPos(): number;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TableCellSeparator?: string, oPr_TableRowSeparator?: string, oPr_ParaSeparator?: string, oPr_TabSymbol?: string): string;
  GetTextPr(): ApiTextPr;
  IntersectWith(oRange?: ApiRange): ApiRange | null;
  Select(): void;
  SetBold(isBold?: boolean): ApiRange | null;
  SetCaps(isCaps?: boolean): ApiRange | null;
  SetColor(r?: number, g?: number, b?: number, isAuto?: boolean): ApiRange | null;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiRange | null;
  SetEndPos(nPos?: number): boolean;
  SetFontFamily(sFontFamily?: string): ApiRange | null;
  SetFontSize(FontSize?: hps): ApiRange | null;
  SetHighlight(sColor?: highlightColor): ApiRange | null;
  SetItalic(isItalic?: boolean): ApiRange | null;
  SetPosition(nPosition?: hps): ApiRange | null;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number): ApiRange | null;
  SetSmallCaps(isSmallCaps?: boolean): ApiRange | null;
  SetSpacing(nSpacing?: number): ApiRange | null;
  SetStartPos(nPos?: number): boolean;
  SetStrikeout(isStrikeout?: boolean): ApiRange | null;
  SetStyle(oStyle?: ApiStyle): ApiRange | null;
  SetTextPr(oTextPr?: ApiTextPr): ApiRange | null;
  SetUnderline(isUnderline?: boolean): ApiRange | null;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiRange | null;
  ToJSON(bWriteNumberings?: boolean, bWriteStyles?: boolean): object;
}

/** Class representing a small text block called 'run'. */
interface ApiRun {
  AddColumnBreak(): void;
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddDrawing(oDrawing?: ApiDrawing): boolean;
  AddHyperlink(sLink?: string, sScreenTipText?: string): ApiHyperlink | null;
  AddLineBreak(): void;
  AddPageBreak(): void;
  AddTabStop(): void;
  AddText(sText?: string): void;
  ClearContent(): void;
  Copy(): ApiRun;
  Delete(): void;
  GetBold(): boolean;
  GetCaps(): boolean;
  GetClassType(): "textPr";
  GetColor(): ApiRGBColor;
  GetDoubleStrikeout(): boolean;
  GetFontFamily(): string;
  GetFontNames(): string[];
  GetFontSize(): hps;
  GetHighlight(): string;
  GetItalic(): boolean;
  GetLanguage(): string;
  GetOutLine(): ApiStroke;
  GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPosition(): hps;
  GetRange(Start?: number, End?: number): ApiRange;
  GetShd(): ApiRGBColor;
  GetSmallCaps(): boolean;
  GetSpacing(): number;
  GetStrikeout(): boolean;
  GetStyle(): ApiStyle;
  GetText(oPr?: object, oPr_NewLineSeparator?: string, oPr_TabSymbol?: string): string;
  GetTextFill(): ApiFill;
  GetTextPr(): ApiTextPr;
  GetUnderline(): boolean;
  GetVertAlign(): string;
  MoveCursorToPos(nPos?: number): boolean;
  RemoveAllElements(): void;
  Select(): boolean;
  SetBold(isBold?: boolean): ApiTextPr;
  SetCaps(isCaps?: boolean): ApiTextPr;
  SetColor(r?: number, g?: number, b?: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiTextPr;
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
  ToJSON(bWriteStyles?: boolean): object;
  WrapInMailMergeField(): void;
}

/** Class representing a Scheme Color. */
interface ApiSchemeColor {
  GetClassType(): "schemeColor";
  ToJSON(): object;
}

/** Class representing a document section. */
interface ApiSection {
  GetClassType(): "section";
  GetFooter(sType?: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
  GetHeader(sType?: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
  GetNext(): ApiSection | null;
  GetPageHeight(): number;
  GetPageWidth(): number;
  GetPrevious(): ApiSection | null;
  GetStartPageNumber(): number;
  GetType(): SectionBreakType;
  RemoveFooter(sType?: HdrFtrType): void;
  RemoveHeader(sType?: HdrFtrType): void;
  SetEqualColumns(nCount?: number, nSpace?: number): void;
  SetFooterDistance(nDistance?: number): void;
  SetHeaderDistance(nDistance?: number): void;
  SetNotEqualColumns(aWidths?: number[], aSpaces?: number[]): void;
  SetPageMargins(nLeft?: number, nTop?: number, nRight?: number, nBottom?: number): void;
  SetPageSize(nWidth?: number, nHeight?: number, isPortrait?: boolean): void;
  SetStartPageNumber(nStartNumber?: number): boolean;
  SetTitlePage(isTitlePage?: boolean): void;
  SetType(sType?: SectionBreakType): void;
  ToJSON(bWriteNumberings?: boolean, bWriteStyles?: boolean): object;
}

/** Class representing a shape. */
interface ApiShape {
  GetClassType(): "shape";
  GetDocContent(): ApiDocumentContent;
  GetNextShape(): ApiShape | null;
  GetPrevShape(): ApiShape | null;
  SetPaddings(nLeft?: number, nTop?: number, nRight?: number, nBottom?: number): void;
  SetVerticalTextAlign(VerticalAlign?: VerticalTextAlign): void;
}

/** Class representing a stroke. */
interface ApiStroke {
  GetClassType(): "stroke";
  ToJSON(): object;
}

/** Class representing a style. */
interface ApiStyle {
  GetClassType(): "style";
  GetConditionalTableStyle(sType?: TableStyleOverrideType): ApiTableStylePr;
  GetName(): string;
  GetParaPr(): ApiParaPr;
  GetTableCellPr(): ApiTableCellPr;
  GetTablePr(): ApiTablePr;
  GetTableRowPr(): ApiTableRowPr;
  GetTextPr(): ApiTextPr;
  GetType(): StyleType;
  SetBasedOn(oStyle?: ApiStyle): void;
  SetName(sStyleName?: string): void;
  ToJSON(bWriteNumberings?: boolean): object;
}

/** Class representing a table. */
interface ApiTable {
  AddCaption(sAdditional?: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
  AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;
  AddColumns(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): void;
  AddComment(sText?: string, sAuthor?: string, sUserId?: string): ApiComment;
  AddElement(oCell?: ApiTableCell, nPos?: number, oElement?: DocumentElement): void;
  AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
  AddRows(oCell?: ApiTableCell, nCount?: number, isBefore?: boolean): ApiTable;
  Clear(): boolean;
  Copy(): ApiTable;
  Delete(): boolean;
  GetCell(nRow?: number, nCell?: number): ApiTableCell | null;
  GetClassType(): "tablePr";
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPosInParent(): number;
  GetRange(Start?: number, End?: number): ApiRange;
  GetRow(nPos?: number): ApiTableRow | null;
  GetRowsCount(): number;
  GetTableDescription(): string;
  GetTableTitle(): string;
  GetTables(): ApiTable[];
  InsertInContentControl(nType?: number): ApiTable | ApiBlockLvlSdt;
  MergeCells(aCells?: ApiTableCell[]): ApiTableCell;
  RemoveColumn(oCell?: ApiTableCell): boolean;
  RemoveRow(oCell?: ApiTableCell): boolean;
  ReplaceByElement(oElement?: DocumentElement): boolean;
  Search(sText?: string, isMatchCase?: boolean): ApiRange[];
  Select(): boolean;
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetCellSpacing(nValue?: number): void;
  SetHAlign(sType?: string): boolean;
  SetJc(sJcType?: "left" | "right" | "center"): void;
  SetPaddings(nLeft?: number, nTop?: number, nRight?: number, nBottom?: number): boolean;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetStyle(oStyle?: ApiStyle): boolean;
  SetStyleColBandSize(nCount?: number): void;
  SetStyleRowBandSize(nCount?: number): void;
  SetTableBorderBottom(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderInsideH(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderInsideV(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderLeft(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderRight(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderTop(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableCellMarginBottom(nValue?: number): void;
  SetTableCellMarginLeft(nValue?: number): void;
  SetTableCellMarginRight(nValue?: number): void;
  SetTableCellMarginTop(nValue?: number): void;
  SetTableDescription(sDescr?: string): boolean;
  SetTableInd(nValue?: number): void;
  SetTableLayout(sType?: "autofit" | "fixed"): void;
  SetTableLook(isFirstColumn?: boolean, isFirstRow?: boolean, isLastColumn?: boolean, isLastRow?: boolean, isHorBand?: boolean, isVerBand?: boolean): void;
  SetTableTitle(sTitle?: string): boolean;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetVAlign(sType?: string): boolean;
  SetWidth(sType?: TableWidth, nValue?: number): void;
  SetWrappingStyle(isFlow?: boolean): boolean;
  Split(oCell?: ApiTableCell, nRow?: number, nCol?: number): ApiTable | null;
  ToJSON(): object;
}

/** Class representing a table cell. */
interface ApiTableCell {
  AddColumns(nCount?: number, isBefore?: boolean): ApiTable | null;
  AddElement(nPos?: number, oElement?: DocumentElement): boolean;
  AddRows(nCount?: number, isBefore?: boolean): ApiTable | null;
  Clear(): boolean;
  GetClassType(): "tableCellPr";
  GetContent(): ApiDocumentContent;
  GetIndex(): number;
  GetNext(): ApiTableCell | null;
  GetParentRow(): ApiTableRow | null;
  GetParentTable(): ApiTable | null;
  GetPrevious(): ApiTableCell | null;
  GetRowIndex(): number;
  RemoveColumn(): boolean | null;
  RemoveRow(): boolean;
  Search(sText?: string, isMatchCase?: boolean): ApiRange[];
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetCellBorderBottom(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderLeft(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderRight(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderTop(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellMarginBottom(nValue?: number): void;
  SetCellMarginLeft(nValue?: number): void;
  SetCellMarginRight(nValue?: number): void;
  SetCellMarginTop(nValue?: number): void;
  SetCellPr(oApiTableCellPr?: ApiTableCellPr): boolean;
  SetColumnBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetNoWrap(isNoWrap?: boolean): void;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetTextDirection(sType?: "lrtb" | "tbrl" | "btlr"): void;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  SetVerticalAlign(sType?: "top" | "center" | "bottom"): void;
  SetWidth(sType?: TableWidth, nValue?: number): void;
  Split(nRow?: number, nCol?: number): ApiTable | null;
  ToJSON(): object;
}

/** Class representing the table cell properties. */
interface ApiTableCellPr {
  GetClassType(): "tableCellPr";
  SetCellBorderBottom(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderLeft(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderRight(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellBorderTop(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetCellMarginBottom(nValue?: number): void;
  SetCellMarginLeft(nValue?: number): void;
  SetCellMarginRight(nValue?: number): void;
  SetCellMarginTop(nValue?: number): void;
  SetNoWrap(isNoWrap?: boolean): void;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetTextDirection(sType?: "lrtb" | "tbrl" | "btlr"): void;
  SetVerticalAlign(sType?: "top" | "center" | "bottom"): void;
  SetWidth(sType?: TableWidth, nValue?: number): void;
  ToJSON(): object;
}

/** Class representing the table properties. */
interface ApiTablePr {
  GetClassType(): "tablePr";
  GetTableDescription(): string;
  GetTableTitle(): string;
  SetCellSpacing(nValue?: number): void;
  SetJc(sJcType?: "left" | "right" | "center"): void;
  SetShd(sType?: ShdType, r?: number, g?: number, b?: number, isAuto?: boolean): void;
  SetStyleColBandSize(nCount?: number): void;
  SetStyleRowBandSize(nCount?: number): void;
  SetTableBorderBottom(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderInsideH(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderInsideV(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderLeft(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderRight(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableBorderTop(sType?: BorderType, nSize?: pt_8, nSpace?: number, r?: number, g?: number, b?: number): void;
  SetTableCellMarginBottom(nValue?: number): void;
  SetTableCellMarginLeft(nValue?: number): void;
  SetTableCellMarginRight(nValue?: number): void;
  SetTableCellMarginTop(nValue?: number): void;
  SetTableDescription(sDescr?: string): boolean;
  SetTableInd(nValue?: number): void;
  SetTableLayout(sType?: "autofit" | "fixed"): void;
  SetTableTitle(sTitle?: string): boolean;
  SetWidth(sType?: TableWidth, nValue?: number): void;
  ToJSON(): object;
}

/** Class representing a table row. */
interface ApiTableRow {
  AddRows(nCount?: number, isBefore?: boolean): ApiTable | null;
  Clear(): boolean;
  GetCell(nPos?: number): ApiTableCell;
  GetCellsCount(): number;
  GetClassType(): "tableRowPr";
  GetIndex(): number;
  GetNext(): ApiTableRow | null;
  GetParentTable(): ApiTable | null;
  GetPrevious(): ApiTableRow | null;
  MergeCells(): ApiTableCell | null;
  Remove(): boolean;
  Search(sText?: string, isMatchCase?: boolean): ApiRange[];
  SetBackgroundColor(r?: number, g?: number, b?: number, bNone?: boolean): boolean;
  SetHeight(sHRule?: "auto" | "atLeast", nValue?: number): void;
  SetTableHeader(isHeader?: boolean): void;
  SetTextPr(oTextPr?: ApiTextPr): boolean;
  ToJSON(): object;
}

/** Class representing the table row properties. */
interface ApiTableRowPr {
  GetClassType(): "tableRowPr";
  SetHeight(sHRule?: "auto" | "atLeast", nValue?: number): void;
  SetTableHeader(isHeader?: boolean): void;
  ToJSON(): object;
}

/** Class representing a set of formatting properties which shall be conditionally applied to the parts of a table which match the requirement specified on the <code>Type</code>. */
interface ApiTableStylePr {
  GetClassType(): "tableStylePr";
  GetParaPr(): ApiParaPr;
  GetTableCellPr(): ApiTableCellPr;
  GetTablePr(): ApiTablePr;
  GetTableRowPr(): ApiTableRowPr;
  GetTextPr(): ApiTextPr;
  GetType(): TableStyleOverrideType;
  ToJSON(): object;
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

/** Class representing the text properties. */
interface ApiTextPr {
  GetBold(): boolean;
  GetCaps(): boolean;
  GetClassType(): "textPr";
  GetColor(): ApiRGBColor;
  GetDoubleStrikeout(): boolean;
  GetFontFamily(): string;
  GetFontSize(): hps;
  GetHighlight(): string;
  GetItalic(): boolean;
  GetLanguage(): string;
  GetOutLine(): ApiStroke;
  GetPosition(): hps;
  GetShd(): ApiRGBColor;
  GetSmallCaps(): boolean;
  GetSpacing(): number;
  GetStrikeout(): boolean;
  GetStyle(): ApiStyle;
  GetTextFill(): ApiFill;
  GetUnderline(): boolean;
  GetVertAlign(): string;
  SetBold(isBold?: boolean): ApiTextPr;
  SetCaps(isCaps?: boolean): ApiTextPr;
  SetColor(r?: number, g?: number, b?: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout?: boolean): ApiTextPr;
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
  SetUnderline(isUnderline?: boolean): ApiTextPr;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiTextPr;
  ToJSON(bWriteStyles?: boolean): object;
}

/** Class representing a base class for color types. */
interface ApiUniColor {
  GetClassType(): "uniColor";
  GetRGB(): number;
  ToJSON(): object;
}

/** Class representing an unsupported element. */
interface ApiUnsupported {
  GetClassType(): "unsupported";
}

/** Class representing the settings which are used to create a watermark. */
interface ApiWatermarkSettings {
  GetClassType(): "watermarkSettings";
  GetDirection(): WatermarkDirection;
  GetImageHeight(): number | null;
  GetImageURL(): string | null;
  GetImageWidth(): number | null;
  GetOpacity(): number;
  GetText(): string | null;
  GetTextPr(): ApiTextPr;
  GetType(): WatermarkType;
  SetDirection(sDirection?: WatermarkDirection): void;
  SetImageSize(nWidth?: number, nHeight?: number): void;
  SetImageURL(sURL?: string): void;
  SetOpacity(nOpacity?: number): void;
  SetText(sText?: string): void;
  SetTextPr(oTextPr?: ApiTextPr): void;
  SetType(sType?: WatermarkType): void;
}

