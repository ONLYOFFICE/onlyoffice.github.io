export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: cell

/** A numeric value that specifies which function should be used to aggregate identical time values in the timeline data range. <b>1</b> (or omitted) - AVERAGE. <b>2</b> - COUNT. <b>3</b> - COUNTA. <b>4</b> - MAX. <b>5</b> - MEDIAN. <b>6</b> - MIN. <b>7</b> - SUM. */
type Aggregation = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Specifies the range angle.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
type Angle = "xlDownward" | "xlHorizontal" | "xlUpward" | "xlVertical";

/** Types of all supported forms.  ## Try it   ```js document-builder={"documentType": "cell"} let copyTextForm = textForm.Copy(); ``` */
type ApiForm = ApiTextForm | ApiComboBoxForm | ApiCheckBoxForm | ApiPictureForm | ApiDateForm | ApiComplexForm;

/** Axis position in the chart.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetAxieNumFormat("top", "0.00"); ``` */
type AxisPos = "top" | "bottom" | "right" | "left";

/** The type of a fill which uses an image as a background. <b>"tile"</b> - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface. <b>"stretch"</b> - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.  ## Try it   ```js document-builder={"documentType": "cell"} let blipFill = Api.CreateBlipFill("https://example.com/myimage.png", "tile"); ``` */
type BlipFillType = "tile" | "stretch";

/** A border type.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0); ``` */
type BorderType = "none" | "single";

/** Specifies the cell border position.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("E2").SetBorders("Bottom", "Dotted", Api.CreateColorFromRGB(0, 0, 0)); ``` */
type BordersIndex = "DiagonalDown" | "DiagonalUp" | "Bottom" | "Left" | "Right" | "Top" | "InsideHorizontal" | "InsideVertical";

/** A bullet type which will be added to the paragraph in spreadsheet or presentation.  ## Try it   ```js document-builder={"documentType": "cell"} // The paragraph will be starting with the Arabic numeral which has parenthesis let bullet = Api.CreateNumbering("ArabicParenR"); ``` */
type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

/** Possible values for the caption label.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaptionCrossRef("Table", "pageNum", caption); ``` */
type CaptionLabel = "Table" | "Equation" | "Figure";

/** Possible values for the caption numbering format. <b>"ALPHABETIC"</b> - upper letter. <b>"alphabetic"</b> - lower letter. <b>"Roman"</b> - upper Roman. <b>"roman"</b> - lower Roman. <b>"Arabic"</b> - arabic.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionNumberingFormat = "ALPHABETIC" | "alphabetic" | "Roman" | "roman" | "Arabic";

/** Possible values for the caption separator. <b>"hyphen"</b> - the "-" punctuation mark. <b>"period"</b> - the "." punctuation mark. <b>"colon"</b> - the ":" punctuation mark. <b>"longDash"</b> - the "—" punctuation mark. <b>"dash"</b> - the "-" punctuation mark.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaption("", "Figure", false, "Arabic", false, undefined, "hyphen"); ``` */
type CaptionSep = "hyphen" | "period" | "colon" | "longDash" | "dash";

/** This type specifies the available chart types which can be used to create a new chart.  ## Try it   ```js document-builder={"documentType": "cell"} // ChartType used in text documents // The resulting chart will have a 'bar3D' type: var chart = Api.CreateChart("bar3D", [[200, 240, 280],[250, 260, 280]], ["Projected Revenue", "Estimated Costs"], [2014, 2015, 2016], 4051300, 2347595, 24);  // ChartType used in spreadsheets // The resulting chart will have a 'bar3D' type: var chart = worksheet.AddChart("'Sheet1'!$A$1:$D$3", true, "bar3D", 2, 100 * 36000, 70 * 36000, 0, 2 * 36000, 7, 3 * 36000); ``` */
type ChartType = "bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" | "area" | "areaStacked" | "areaStackedPercent" | "comboBarLine" | "comboBarLineSecondary" | "comboCustom" | "unknown";

/** Report on all comments. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "cell"} let commentsReport = oDocument.GetCommentsReport(); ``` */
type CommentReport = Record<string, CommentReportRecord[]>;

/** Record of one comment.  ## Try it   ```js document-builder={"documentType": "cell"} let commentsReport = oDocument.GetCommentsReport(); ``` */
interface CommentReportRecord {
  IsAnswer?: boolean;
  CommentMessage: string;
  Date: number;
  DateUTC: number;
  QuoteText?: string;
}

/** The type of calculation to perform on the data field items. */
type DataConsolidateFunctionType = "Average" | "CountNumbers" | "Count" | "Max" | "Min" | "Product" | "StdDev" | "StdDevP" | "Sum" | "Var" | "VarP";

/** Specifies how to shift cells to replace deleted cells. */
type DeleteShiftDirection = "up" | "left";

/** Specifies the direction of end in the specified range.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("C4:D5").End("xlToLeft").SetFillColor(Api.CreateColorFromRGB(255, 224, 204)); ``` */
type Direction = "xlUp" | "xlDown" | "xlToRight" | "xlToLeft";

/** Any valid element which can be added to the document structure.  ## Try it   ```js document-builder={"documentType": "cell"} doc.AddElement(paragraph); ``` */
type DocumentElement = ApiParagraph;

/** Any valid drawing element. */
type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart;

/** Available drawing element for grouping. */
type DrawingForGroup = ApiShape | ApiGroup | ApiImage | ApiChart;

/** This type specifies the type of drawing lock.  ## Try it   ```js document-builder={"documentType": "cell"} let lockValue = drawing.GetLockValue("noSelect"); ``` */
type DrawingLockType = "noGrp" | "noUngrp" | "noSelect" | "noRot" | "noChangeAspect" | "noMove" | "noResize" | "noEditPoints" | "noAdjustHandles" | "noChangeArrowheads" | "noChangeShapeType" | "noDrilldown" | "noTextEdit" | "noCrop" | "txBox";

/** English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs. */
type EMU = number;

/** The error value. * <b>"#NULL!"</b> - 1 * <b>"#DIV/0!"</b> - 2 * <b>"#VALUE!"</b> - 3 * <b>"#REF!"</b> - 4 * <b>"#NAME?"</b> - 5 * <b>"#NUM!"</b> - 6 * <b>"#N/A"</b> - 7 * <b>"#GETTING_DATA"</b> - 8 * <b>"Other"</b> - "#N/A" */
type ErrorValue = "#NULL!" | "#DIV/0!" | "#VALUE!" | "#REF!" | "#NAME?" | "#NUM!" | "#N/A" | "#GETTING_DATA";

/** Specifies how the report filter fields are located. */
type FieldsInReportFilterType = "OverThenDown" | "DownThenOver";

/** Form data.  ## Try it   ```js document-builder={"documentType": "cell"} let formData = {key: "CompanyName", value: "OnlyOffice", type: "text"}; ``` */
interface FormData {
  key: string;
  value: string | boolean;
  tag: string;
  type: FormSpecificType;
}

/** The specific form type.  ## Try it   ```js document-builder={"documentType": "cell"} let formsData = doc.GetFormsData(); ``` */
type FormSpecificType = "text" | "checkBox" | "picture" | "comboBox" | "dropDownList" | "dateTime" | "radio";

/** Form type. The available form types.  ## Try it   ```js document-builder={"documentType": "cell"} let formType = textForm.GetFormType(); ``` */
type FormType = "textForm" | "comboBoxForm" | "dropDownForm" | "checkBoxForm" | "radioButtonForm" | "pictureForm";

/** Specifies a type of freeze panes.  ## Try it   ```js document-builder={"documentType": "cell"} builder.CreateFile("xlsx"); Api.SetFreezePanesType('column'); let worksheet = Api.GetActiveSheet(); let freezePanes = worksheet.GetFreezePanes(); let range = freezePanes.GetLocation(); worksheet.GetRange("A1").SetValue("Location: "); worksheet.GetRange("B1").SetValue(range.GetAddress()); builder.SaveFile("xlsx", "FreezePanes.xlsx"); builder.CloseFile(); ``` */
type FreezePaneType = "row" | "column" | "cell" | null;

/** Header and footer types which can be applied to the document sections. <b>"default"</b> - a header or footer which can be applied to any default page. <b>"title"</b> - a header or footer which is applied to the title page. <b>"even"</b> - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).  ## Try it   ```js document-builder={"documentType": "cell"} let docContent = finalSection.RemoveHeader("title"); ``` */
type HdrFtrType = "default" | "title" | "even";

/** The layout subtotal location. */
type LayoutSubtotalLocationType = "Top" | "Bottom";

/** Specifies the line style used to form the cell border.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("E2").SetBorders("Bottom", "Dotted", Api.CreateColorFromRGB(0, 0, 0)); ``` */
type LineStyle = "None" | "Double" | "Hair" | "DashDotDot" | "DashDot" | "Dotted" | "Dashed" | "Thin" | "MediumDashDotDot" | "SlantDashDot" | "MediumDashDot" | "MediumDashed" | "Medium" | "Thick";

/** The match type. * <b>-1</b> - The values must be sorted in descending order. If the exact match is not found, the function will return the smallest value that is greater than the searched value. * <b>0</b> - The values can be sorted in any order. If the exact match is not found, the function will return the <em>#N/A</em> error. * <b>1</b> (or omitted) - The values must be sorted in ascending order. If the exact match is not found, the function will return the largest value that is less than the searched value. */
type MatchType = "-1" | "0" | "1";

/** Standard numeric format.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1").SetOrientation("xlUpward"); ``` */
type NumFormat = "General" | "0" | "0.00" | "#,##0" | "#,##0.00" | "0%" | "0.00%" | "0.00E+00" | "# ?/?" | "# ??/??" | "m/d/yyyy" | "d-mmm-yy" | "d-mmm" | "mmm-yy" | "h:mm AM/PM" | "h:mm:ss AM/PM" | "h:mm" | "h:mm:ss" | "m/d/yyyy h:mm" | "#,##0_);(#,##0)" | "#,##0_);[Red](#,##0)" | "#,##0.00_);(#,##0.00)" | "#,##0.00_);[Red](#,##0.00)" | "mm:ss" | "[h]:mm:ss" | "mm:ss.0" | "##0.0E+0" | "@";

/** The page orientation type.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.SetPageOrientation("xlPortrait"); ``` */
type PageOrientation = "xlLandscape" | "xlPortrait";

/** The types of elements that can be added to the paragraph structure.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddElement(run, 0); ``` */
type ParagraphContent = ApiUnsupported | ApiRun | ApiHyperlink;

/** The mathematical operation which will be applied to the copied data.  ## Try it   ```js document-builder={"documentType": "cell"} range.PasteSpecial("xlPasteAll", "xlPasteSpecialOperationAdd"); ``` */
type PasteSpecialOperation = "xlPasteSpecialOperationAdd" | "xlPasteSpecialOperationDivide" | "xlPasteSpecialOperationMultiply" | "xlPasteSpecialOperationNone" | "xlPasteSpecialOperationSubtract";

/** Specifies the part of the range to be pasted.  ## Try it   ```js document-builder={"documentType": "cell"} range.PasteSpecial("xlPasteAll"); ``` */
type PasteType = "xlPasteAll" | "xlPasteAllExceptBorders" | "xlPasteColumnWidths" | "xlPasteComments" | "xlPasteFormats" | "xlPasteFormulas" | "xlPasteFormulasAndNumberFormats" | "xlPasteValues" | "xlPasteValuesAndNumberFormats";

/** The available preset patterns which can be used for the fill.  ## Try it   ```js document-builder={"documentType": "cell"} let fill = Api.CreatePatternFill("dashDnDiag", Api.CreateRGBColor(0, 225, 0), Api.CreateRGBColor(255, 0, 0)); ``` */
type PatternType = "cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag";

/** The pivot field orientation type. */
type PivotFieldOrientationType = "Rows" | "Columns" | "Filters" | "Values" | "Hidden";

/** Subtotal pivot field types (functions for subtotals). */
interface PivotFieldSubtotals {
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
type PivotLayoutType = "Tabular" | "Outline";

/** The direction to move the pivot table field. */
type PivotMoveFieldType = "Up" | "Down" | "Begin" | "End";

/** The type of the pivot table subtotal layout. */
type PivotSubtotalLayoutType = "Hidden" | "Top" | "Bottom";

/** The settings for adding row, column, and page fields to the pivot table report. */
interface PivotTableFieldOptions {
  rows?: number | string | number[] | string[];
  columns?: number | string | number[] | string[];
  pages?: number | string | number[] | string[];
  addToTable?: boolean;
}

/** The report filter area settings. */
interface PivotTableFilterAreaInfo {
  Type: FieldsInReportFilterType;
  ReportFilterFields: number;
}

/** Available placeholder types. */
type PlaceholderType = "body" | "chart" | "clipArt" | "ctrTitle" | "diagram" | "date" | "footer" | "header" | "media" | "object" | "picture" | "sldImage" | "sldNumber" | "subTitle" | "table" | "title";

/** 60000th of a degree (5400000 = 90 degrees).  ## Try it   ```js document-builder={"documentType": "cell"} let fill = Api.CreateLinearGradientFill([gs1, gs2], 5400000); ``` */
type PositiveFixedAngle = number;

/** The 1000th of a percent (100000 = 100%).  ## Try it   ```js document-builder={"documentType": "cell"} let gs = Api.CreateGradientStop(Api.CreateRGBColor(255, 164, 101), 100000); ``` */
type PositivePercentage = number;

/** The available preset color names.  ## Try it   ```js document-builder={"documentType": "cell"} let schemeColor = Api.CreatePresetColor("lightYellow"); ``` */
type PresetColor = "aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen";

/** Specifies the user type of the protected range.  ## Try it   ```js document-builder={"documentType": "cell"} protectedRange.SetAnyoneType("NotView"); ``` */
type ProtectedRangeUserType = "CanEdit" | "CanView" | "NotView";

/** The cell reference type.  ## Try it   ```js document-builder={"documentType": "cell"} builder.CreateFile("xlsx"); let worksheet = Api.GetActiveSheet(); worksheet.GetRange("A1").SetValue(Api.GetReferenceStyle()); builder.SaveFile("xlsx", "ReferenceStyle.xlsx"); builder.CloseFile(); ``` */
type ReferenceStyle = 'xlA1' | 'xlR1C1';

/** The possible values for the base which the relative horizontal positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetHorAlign("page", "center"); ``` */
type RelFromH = "character" | "column" | "leftMargin" | "rightMargin" | "margin" | "page";

/** The possible values for the base which the relative vertical positioning of an object will be calculated from.  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetVerAlign("page", "center"); ``` */
type RelFromV = "bottomMargin" | "topMargin" | "margin" | "page" | "line" | "paragraph";

/** Properties to make search and replace. */
interface ReplaceData {
  What: string | undefined;
  Replacement: string;
  LookAt: XlLookAt;
  SearchOrder: XlSearchOrder;
  SearchDirection: XlSearchDirection;
  MatchCase: boolean;
  ReplaceAll: boolean;
}

/** Report on all review changes. This is a dictionary where the keys are usernames.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewRecord = { 	"John Smith" : [{Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}, 					{Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}], 	"Mark Pottato" : [{Type: "ParaRem", Date: 1679941755942}, 					{Type: "TextPr", Date: 1679941757832}] } ``` */
type ReviewReport = Record<string, ReviewReportRecord[]>;

/** Record of one review change.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
interface ReviewReportRecord {
  Type: ReviewReportRecordType;
  Value?: string;
  Date: number;
  ReviewedElement: ApiParagraph | ApiTable;
}

/** Review record type.  ## Try it   ```js document-builder={"documentType": "cell"} let reviewReportRecord1 = {Type: "TextRem", Value: "Hello, Mark!", Date: 1679941734161}; let reviewReportRecord2 = {Type: "TextAdd", Value: "Dear Mr. Pottato.", Date: 1679941736189}; let reviewReportRecord3 = {Type: "ParaRem", Date: 1679941755942}; let reviewReportRecord4 = {Type: "TextPr", Date: 1679941757832}; let reviewRecord = { 	"John Smith" : [reviewReportRecord1, reviewReportRecord2], 	"Mark Pottato" : [reviewReportRecord3, reviewReportRecord4] }; ``` */
type ReviewReportRecordType = "TextAdd" | "TextRem" | "ParaAdd" | "ParaRem" | "TextPr" | "ParaPr" | "Unknown";

/** The condition to scale an image in the picture form.  ## Try it   ```js document-builder={"documentType": "cell"} pictureForm.SetScaleFlag("tooBig"); ``` */
type ScaleFlag = "always" | "never" | "tooBig" | "tooSmall";

/** The available color scheme identifiers.  ## Try it   ```js document-builder={"documentType": "cell"} let schemeColor = Api.CreateSchemeColor("accent2"); ``` */
type SchemeColorId = "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2";

/** The lock type of the content control.  ## Try it   ```js document-builder={"documentType": "cell"} inlineLvlSdt.SetLock("sdtContentLocked"); ``` */
type SdtLock = "unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked";

/** Properties to make search. */
interface SearchData {
  What: string | undefined;
  After: ApiRange;
  LookIn: XlFindLookIn;
  LookAt: XlLookAt;
  SearchOrder: XlSearchOrder;
  SearchDirection: XlSearchDirection;
  MatchCase: boolean;
}

/** The section break type which defines how the contents of the current section are placed relative to the previous section. WordprocessingML supports five distinct types of section breaks: <b>Next page</b> ("nextPage") - starts a new section on the next page (the default value). <b>Odd</b> ("oddPage") - starts a new section on the next odd-numbered page. <b>Even</b> ("evenPage") - starts a new section on the next even-numbered page. <b>Continuous</b> ("continuous") - starts a new section in the next paragraph. This means that continuous section breaks might not specify certain page-level section properties, since they shall be inherited from the following section. However, these breaks can specify other section properties, such as line numbering and footnote/endnote settings. <b>Column</b> ("nextColumn") - starts a new section in the next column on the page. */
type SectionBreakType = "nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn";

/** Represents the type of objects in a selection. */
type SelectionType = "none" | "shapes" | "slides" | "text";

/** This type specifies the preset shape geometry that will be used for a shape.  ## Try it   ```js document-builder={"documentType": "cell"} let drawing = Api.CreateShape("diamond", 100 * 36000, 100 * 36000, fill, stroke); ``` */
type ShapeType = "accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout";

/** A shade type which can be added to the document element.  ## Try it   ```js document-builder={"documentType": "cell"} tablePr.SetShd("clear", 0, 255, 0, false); ``` */
type ShdType = "nil" | "clear";

/** Specifies whether the first row of the sort range contains the header information.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
type SortHeader = "xlNo" | "xlYes";

/** Specifies the sort order.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
type SortOrder = "xlAscending" | "xlDescending";

/** Specifies if the sort should be by row or column.  ## Try it   ```js document-builder={"documentType": "cell"} worksheet.GetRange("A1:C5").SetSort("A1:A5", "xlAscending", "B1:B5", "xlDescending", "C1:C5", "xlAscending", "xlYes", "xlSortColumns"); ``` */
type SortOrientation = "xlSortColumns" | "xlSortRows";

/** A numeric value between 1 and 8 that specifies which statistic will be returned. <b>1</b> - Alpha parameter of ETS algorithm - the base value parameter. <b>2</b> - Beta parameter of ETS algorithm - the trend value parameter. <b>3</b> - Gamma parameter of ETS algorithm - the seasonality value parameter. <b>4</b> - MASE (mean absolute scaled error) metric - a measure of the accuracy of forecasts. <b>5</b> - SMAPE (symmetric mean absolute percentage error) metric - a measure of the accuracy based on percentage errors. <b>6</b> - MAE (mean absolute error) metric - a measure of the accuracy of forecasts. <b>7</b> - RMSE (root mean squared error) metric - a measure of the differences between predicted and observed values. <b>8</b> - Step size detected in the timeline. */
type StatisticType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** The style type used for the document element.  ## Try it   ```js document-builder={"documentType": "cell"} let normalStyle = doc.GetDefaultStyle("paragraph"); ``` */
type StyleType = "paragraph" | "table" | "run" | "numbering";

/** Types of custom tab.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetTabs([1000, 1500, 3000], ["center", "left", "right"]); ``` */
type TabJc = "clear" | "left" | "right" | "center";

/** This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used. <b>"topLeftCell"</b> - specifies that the table formatting is applied to the top left cell. <b>"topRightCell"</b> - specifies that the table formatting is applied to the top right cell. <b>"bottomLeftCell"</b> - specifies that the table formatting is applied to the bottom left cell. <b>"bottomRightCell"</b> - specifies that the table formatting is applied to the bottom right cell. <b>"firstRow"</b> - specifies that the table formatting is applied to the first row. <b>"lastRow"</b> - specifies that the table formatting is applied to the last row. <b>"firstColumn"</b> - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format. <b>"lastColumn"</b> - specifies that the table formatting is applied to the last column. <b>"bandedColumn"</b> - specifies that the table formatting is applied to odd numbered groupings of rows. <b>"bandedColumnEven"</b> - specifies that the table formatting is applied to even numbered groupings of rows. <b>"bandedRow"</b> - specifies that the table formatting is applied to odd numbered groupings of columns. <b>"bandedRowEven"</b> - specifies that the table formatting is applied to even numbered groupings of columns. <b>"wholeTable"</b> - specifies that the conditional formatting is applied to the whole table.  ## Try it   ```js document-builder={"documentType": "cell"} tableStyle.GetConditionalTableStyle("topLeftCell").GetTableCellPr().SetShd("clear", 255, 0, 0); ``` */
type TableStyleOverrideType = "topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" | "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" | "wholeTable";

/** The possible values for the units of the width property are defined by a specific table or table cell width property. <b>"auto"</b> - sets the table or table cell width to auto width. <b>"twips"</b> - sets the table or table cell width to be measured in twentieths of a point. <b>"nul"</b> - sets the table or table cell width to be of a zero value. <b>"percent"</b> - sets the table or table cell width to be measured in percent to the parent container.  ## Try it   ```js document-builder={"documentType": "cell"} tableCell.SetWidth("twips", 2000); ``` */
type TableWidth = "auto" | "twips" | "nul" | "percent";

/** Text transform type.  ## Try it   ```js document-builder={"documentType": "cell"} let textArt = Api.CreateWordArt(oTextPr, "onlyoffice", "textArchUp", fill, stroke, 0, 150 * 36000, 50 * 36000); ``` */
type TextTransform = "textArchDown" | "textArchDownPour" | "textArchUp" | "textArchUpPour" | "textButton" | "textButtonPour" | "textCanDown" | "textCanUp" | "textCascadeDown" | "textCascadeUp" | "textChevron" | "textChevronInverted" | "textCircle" | "textCirclePour" | "textCurveDown" | "textCurveUp" | "textDeflate" | "textDeflateBottom" | "textDeflateInflate" | "textDeflateInflateDeflate" | "textDeflateTop" | "textDoubleWave1" | "textFadeDown" | "textFadeLeft" | "textFadeRight" | "textFadeUp" | "textInflate" | "textInflateBottom" | "textInflateTop" | "textPlain" | "textRingInside" | "textRingOutside" | "textSlantDown" | "textSlantUp" | "textStop" | "textTriangle" | "textTriangleInverted" | "textWave1" | "textWave2" | "textWave4" | "textNoShape";

/** Possible values for the position of chart tick labels (either horizontal or vertical). <b>"none"</b> - does not display the selected tick labels. <b>"nextTo"</b> - sets the position of the selected tick labels next to the main label. <b>"low"</b> - sets the position of the selected tick labels in the part of the chart with lower values. <b>"high"</b> - sets the position of the selected tick labels in the part of the chart with higher values.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetVertAxisTickLabelPosition("nextTo"); ``` */
type TickLabelPosition = "none" | "nextTo" | "low" | "high";

/** The type of tick mark appearance.  ## Try it   ```js document-builder={"documentType": "cell"} chart.SetVertAxisMajorTickMark("cross"); ``` */
type TickMark = "cross" | "in" | "none" | "out";

/** Table of contents properties which specify whether to generate the table of contents from the outline levels or the specified styles.  ## Try it   ```js document-builder={"documentType": "cell"} let tocBuildFromPr = {"OutlineLvls": 9}; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": tocBuildFromPr, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocBuildFromPr {
  OutlineLvls?: number;
  StylesLvls: TocStyleLvl[];
}

/** Possible values for the table of contents leader: <b>"dot"</b> - "......." <b>"dash"</b> - "-------" <b>"underline"</b> - "_______"  ## Try it   ```js document-builder={"documentType": "cell"} let tocLeader = "dot"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": tocLeader, "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
type TocLeader = "dot" | "dash" | "underline" | "none";

/** Table of contents properties.  ## Try it   ```js document-builder={"documentType": "cell"} let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: TocBuildFromPr;
  TocStyle?: TocStyle;
}

/** Possible values for the table of contents style.  ## Try it   ```js document-builder={"documentType": "cell"} let tocStyle = "standard"; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"OutlineLvls": 9}, "TocStyle": tocStyle}; doc.AddTableOfContents(tocPr); ``` */
type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

/** Table of contents style levels.  ## Try it   ```js document-builder={"documentType": "cell"} let tocStyleLvl = [{Name: "Heading 1", Lvl: 2}, {Name: "Heading 2", Lvl: 3}]; let tocPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": {"StylesLvls": tocStyleLvl}, "TocStyle": "standard"}; doc.AddTableOfContents(tocPr); ``` */
interface TocStyleLvl {
  Name: string;
  Lvl: number;
}

/** Table of figures properties.  ## Try it   ```js document-builder={"documentType": "cell"} let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": "distinctive"}; doc.AddTableOfFigures(tofPr); ``` */
interface TofPr {
  ShowPageNums?: boolean;
  RightAlgn?: boolean;
  LeaderType?: TocLeader;
  FormatAsLinks?: boolean;
  BuildFrom?: CaptionLabel | string;
  LabelNumber?: boolean;
  TofStyle?: TofStyle;
}

/** Possible values for the table of figures style.  ## Try it   ```js document-builder={"documentType": "cell"} let tofStyle = "distinctive"; let tofPr = {"ShowPageNums": true, "RightAlgn": true, "LeaderType": "dot", "FormatAsLinks": true, "BuildFrom": "Figure", "LabelNumber": true, "TofStyle": tofStyle}; doc.AddTableOfFigures(tofPr); ``` */
type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

/** The available text vertical alignment (used to align text in a shape with a placement for text inside it).  ## Try it   ```js document-builder={"documentType": "cell"} drawing.SetVerticalTextAlign("top"); ``` */
type VerticalTextAlign = "top" | "center" | "bottom";

/** The watermark direction.  ## Try it   ```js document-builder={"documentType": "cell"} watermarkSettings.SetDirection("clockwise45"); ``` */
type WatermarkDirection = "horizontal" | "clockwise45" | "counterclockwise45";

/** The watermark type.  ## Try it   ```js document-builder={"documentType": "cell"} watermarkSettings.SetType("text"); ``` */
type WatermarkType = "none" | "text" | "image";

/** Filter type. */
type XlAutoFilterOperator = "xlAnd" | "xlBottom10Items" | "xlBottom10Percent" | "xlFilterCellColor" | "xlFilterDynamic" | "xlFilterFontColor" | "xlFilterValues" | "xlOr" | "xlTop10Items" | "xlTop10Percent";

/** Specifies the filter criterion. */
type XlDynamicFilterCriteria = "xlFilterAboveAverage" | "xlFilterAllDatesInPeriodApril" | "xlFilterAllDatesInPeriodAugust" | "xlFilterAllDatesInPeriodDecember" | "xlFilterAllDatesInPeriodFebruary" | "xlFilterAllDatesInPeriodJanuary" | "xlFilterAllDatesInPeriodJuly" | "xlFilterAllDatesInPeriodJune" | "xlFilterAllDatesInPeriodMarch" | "xlFilterAllDatesInPeriodMay" | "xlFilterAllDatesInPeriodNovember" | "xlFilterAllDatesInPeriodOctober" | "xlFilterAllDatesInPeriodQuarter1" | "xlFilterAllDatesInPeriodQuarter2" | "xlFilterAllDatesInPeriodQuarter3" | "xlFilterAllDatesInPeriodQuarter4" | "xlFilterBelowAverage" | "xlFilterLastMonth" | "xlFilterLastQuarter" | "xlFilterLastWeek" | "xlFilterLastYear" | "xlFilterNextMonth" | "xlFilterNextQuarter" | "xlFilterNextWeek" | "xlFilterNextYear" | "xlFilterThisMonth" | "xlFilterThisQuarter" | "xlFilterThisWeek" | "xlFilterThisYear" | "xlFilterToday" | "xlFilterTomorrow" | "xlFilterYearToDate" | "xlFilterYesterday";

/** Search data type (formulas or values).  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
type XlFindLookIn = "xlFormulas" | "xlValues";

/** Specifies whether the whole search text or any part of the search text is matched.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
type XlLookAt = "xlWhole" | "xlPart";

/** Range search direction - next match or previous match.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
type XlSearchDirection = "xlNext" | "xlPrevious";

/** Range search order - by rows or by columns.  ## Try it   ```js document-builder={"documentType": "cell"} let searchRange = range.Find( { What: "200", After: oWorksheet.GetRange("B1"), LookIn: "xlValues", LookAt: "xlWhole",	SearchOrder: "xlByColumns", SearchDirection: "xlNext", MatchCase: true } ); ``` */
type XlSearchOrder = "xlByRows" | "xlByColumns";

/** Underline type.  ## Try it   ```js document-builder={"documentType": "cell"} font.SetUnderline("xlUnderlineStyleSingle"); ``` */
type XlUnderlineStyle = "xlUnderlineStyleDouble" | "xlUnderlineStyleDoubleAccounting" | "xlUnderlineStyleNone" | "xlUnderlineStyleSingle" | "xlUnderlineStyleSingleAccounting";

/** Available values of the "bookmark" reference type: <b>"text"</b> - the entire bookmark text; <b>"pageNum"</b> - the bookmark page number; <b>"paraNum"</b> - the bookmark paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum</b> - the full paragraph number, e.g. "4.1.1"; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddBookmarkCrossRef("pageNum", bookmark); ``` */
type bookmarkRefTo = "text" | "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "aboveBelow";

/** A numeric value from 0 to 255.  ## Try it   ```js document-builder={"documentType": "cell"} // The resulting color is green, the bytes are measured in decimal numbers: let rgbColorGreen = Api.CreateRGBColor(0, 255, 0); // The resulting color is red, the bytes are measured in hexadecimal numbers: let rgbColorRed = Api.CreateRGBColor(0xff, 0, 0); ``` */
type byte = number;

/** Available values of the "equation"/"figure"/"table" reference type: <b>"entireCaption"</b>- the entire caption text; <b>"labelNumber"</b> - the label and object number only, e.g. "Table 1.1"; <b>"captionText"</b> - the caption text only; <b>"pageNum"</b> - the page number containing the referenced object; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddCaptionCrossRef("table", "pageNum", caption); ``` */
type captionRefTo = "entireCaption" | "labelNumber" | "captionText" | "pageNum" | "aboveBelow";

/** Available values of the "endnote" reference type: <b>"endnoteNum"</b> - the endnote number; <b>"pageNum"</b> - the endnote page number; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position; <b>"formEndnoteNum"</b> - the form number formatted as an endnote. The numbering of the actual endnotes is not affected.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddEndnoteCrossRef("pageNum", endnoteParagraph); ``` */
type endnoteRefTo = "endnoteNum" | "pageNum" | "aboveBelow" | "formEndnoteNum";

/** Available values of the "footnote" reference type: <b>"footnoteNum"</b> - the footnote number; <b>"pageNum"</b> - the page number of the footnote; <b>"aboveBelow"</b> - the words "above" or "below" depending on the position of the item; <b>"formFootnoteNum"</b> - the form number formatted as a footnote. The numbering of the actual footnotes is not affected.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddFootnoteCrossRef("pageNum", footnoteParagraph); ``` */
type footnoteRefTo = "footnoteNum" | "pageNum" | "aboveBelow" | "formFootnoteNum";

/** Available values of the "heading" reference type: <b>"text"</b> - the entire heading text; <b>"pageNum"</b> - the heading page number; <b>"headingNum"</b> - the heading sequence number; <b>"noCtxHeadingNum"</b> - the abbreviated heading number. Make sure the cursor pointer is in the section you are referencing to, e.g. you are in section 4 and you wish to refer to heading 4.B, so instead of "4.B" you receive "B" only; <b>"fullCtxHeadingNum"</b> - the full heading number even if the cursor pointer is in the same section; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddHeadingCrossRef("pageNum", headingParagraph); ``` */
type headingRefTo = "text" | "pageNum" | "headingNum" | "noCtxHeadingNum" | "fullCtxHeadingNum" | "aboveBelow";

/** Available highlight colors.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.SetHighlight("green"); ``` */
type highlightColor = "black" | "blue" | "cyan" | "green" | "magenta" | "red" | "yellow" | "white" | "darkBlue" | "darkCyan" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "darkGray" | "lightGray" | "none";

/** Half-points (2 half-points = 1 point).  ## Try it   ```js document-builder={"documentType": "cell"} textPr.SetFontSize(22); ``` */
type hps = number;

/** 240ths of a line.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetSpacingLine(240, "auto"); ``` */
type line240 = number;

/** 1 millimetre equals 1/10th of a centimetre.  ## Try it   ```js document-builder={"documentType": "cell"} textForm.SetCellWidth(7); ``` */
type mm = number;

/** Available values of the "numbered" reference type: <b>"pageNum"</b> - the numbered item page number; <b>"paraNum"</b> - the numbered item paragraph number; <b>"noCtxParaNum"</b> - the abbreviated paragraph number (the specific item only, e.g. instead of "4.1.1" you refer to "1" only); <b>"fullCtxParaNum"</b> - the full paragraph number, e.g. "4.1.1"; <b>"text"</b> - the paragraph text value, e.g. if you have "4.1.1. Terms and Conditions", you refer to "Terms and Conditions" only; <b>"aboveBelow"</b> - the words "above" or "below" depending on the item position.  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.AddNumberedCrossRef("pageNum", numberedParagraph, true, true); ``` */
type numberedRefTo = "pageNum" | "paraNum" | "noCtxParaNum" | "fullCtxParaNum" | "text" | "aboveBelow";

/** Value from 0 to 100.  ## Try it   ```js document-builder={"documentType": "cell"} pictureForm.SetPicturePosition(70, 70); ``` */
type percentage = number;

/** A point.  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 24, 1, 0, 255, 0); ``` */
type pt = number;

/** Eighths of a point (24 eighths of a point = 3 points).  ## Try it   ```js document-builder={"documentType": "cell"} paraPr.SetBottomBorder("single", 48, 0, 0, 255, 0); ``` */
type pt_8 = number;

/** Twentieths of a point (equivalent to 1/1440th of an inch).  ## Try it   ```js document-builder={"documentType": "cell"} paragraph.SetEqualColumns(2, 720); ``` */
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
type ApiTable = any;
type ApiTextForm = any;
type Arabic = any;
type ArabicParenR = any;
type ArabicPeriod = any;
type Average = any;
type Begin = any;
type Bottom = any;
type CanEdit = any;
type CanView = any;
type Columns = any;
type Count = any;
type CountNumbers = any;
type DIV = any;
type DashDot = any;
type DashDotDot = any;
type Dashed = any;
type DiagonalDown = any;
type DiagonalUp = any;
type Dotted = any;
type Double = any;
type Down = any;
type DownThenOver = any;
type End = any;
type Equation = any;
type Figure = any;
type Fill = any;
type Filters = any;
type General = any;
type Hair = any;
type Hidden = any;
type InsideHorizontal = any;
type InsideVertical = any;
type Left = any;
type Max = any;
type Medium = any;
type MediumDashDot = any;
type MediumDashDotDot = any;
type MediumDashed = any;
type Min = any;
type NAME = any;
type NULL = any;
type NUM = any;
type No = any;
type None = any;
type NotView = any;
type Outline = any;
type OverThenDown = any;
type PM = any;
type ParaAdd = any;
type ParaPr = any;
type ParaRem = any;
type Product = any;
type REF = any;
type Red = any;
type Right = any;
type Roman = any;
type RomanLcPeriod = any;
type RomanUcPeriod = any;
type Rows = any;
type SlantDashDot = any;
type StdDev = any;
type StdDevP = any;
type Sum = any;
type Table = any;
type Tabular = any;
type TextAdd = any;
type TextPr = any;
type TextRem = any;
type Thick = any;
type Thin = any;
type Top = any;
type Unknown = any;
type Up = any;
type VALUE = any;
type Values = any;
type Var = any;
type VarP = any;

/** Base class. */
interface Api {
  AddComment(sText?: string, sAuthor?: string): ApiComment | null;
  AddCustomFunction(fCustom?: (...args: any[]) => any): void;
  AddCustomFunctionLibrary(sName?: string, Func?: (...args: any[]) => any): void;
  AddDefName(sName?: string, sRef?: string, isHidden?: boolean): boolean;
  AddSheet(sName?: string): void;
  ClearCustomFunctions(): boolean;
  CreateBlipFill(imageUrl?: string, blipFillType?: BlipFillType): ApiFill;
  CreateBullet(sSymbol?: string): ApiBullet;
  CreateColorByName(sPresetColor?: PresetColor): ApiColor;
  CreateColorFromRGB(r?: number, g?: number, b?: number): ApiColor;
  CreateGradientStop(uniColor?: ApiUniColor, pos?: PositivePercentage): ApiGradientStop;
  CreateLinearGradientFill(gradientStops?: any[], angle?: PositiveFixedAngle): ApiFill;
  CreateNewHistoryPoint(): void;
  CreateNoFill(): ApiFill;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType?: PatternType, bgColor?: ApiUniColor, fgColor?: ApiUniColor): ApiFill;
  CreatePresetColor(presetColor?: PresetColor): ApiPresetColor;
  CreateRGBColor(r?: number, g?: number, b?: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops?: any[]): ApiFill;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId?: SchemeColorId): ApiSchemeColor;
  CreateSolidFill(uniColor?: ApiUniColor): ApiFill;
  CreateStroke(width?: number, fill?: ApiFill): ApiStroke;
  CreateTextPr(): ApiTextPr;
  Format(expression?: string, format?: string): string;
  GetActiveSheet(): ApiWorksheet;
  GetAllComments(): ApiComment[];
  GetAllPivotTables(): ApiPivotTable[];
  GetCommentById(sId?: string): ApiComment;
  GetComments(): ApiComment[];
  GetDefName(defName?: string): ApiName;
  GetDocumentInfo(): object;
  GetFreezePanesType(): FreezePaneType;
  GetFullName(): string;
  GetLocale(): number;
  GetMailMergeData(nSheet?: number, bWithFormat?: boolean): string[][];
  GetPivotByName(name?: string): ApiPivotTable | null;
  GetRange(sRange?: string): ApiRange;
  GetReferenceStyle(): ReferenceStyle;
  GetSelection(): ApiRange;
  GetSheet(nameOrIndex?: string | number): ApiWorksheet | null;
  GetSheets(): ApiWorksheet[];
  GetThemesColors(): string[];
  GetWorksheetFunction(): ApiWorksheetFunction;
  InsertPivotExistingWorksheet(dataRef?: ApiRange, pivotRef?: ApiRange, confirmation?: boolean): ApiPivotTable;
  InsertPivotNewWorksheet(dataRef?: ApiRange, newSheetName?: ApiRange): ApiPivotTable;
  Intersect(Range1?: ApiRange, Range2?: ApiRange): ApiRange | null;
  RecalculateAllFormulas(fLogger?: (...args: any[]) => any): boolean;
  RefreshAllPivots(): void;
  RemoveCustomFunction(sName?: string): boolean;
  ReplaceTextSmart(textStrings?: any[], tab?: string, newLine?: string): void;
  Save(): void;
  SetFreezePanesType(FreezePaneType?: FreezePaneType): void;
  SetLocale(LCID?: number): void;
  SetReferenceStyle(sReferenceStyle?: ReferenceStyle): void;
  SetThemeColors(sTheme?: string): boolean;
  attachEvent(eventName?: string, callback?: (...args: any[]) => any): void;
  detachEvent(eventName?: string): void;
}

/** Class representing the areas. */
interface ApiAreas {
  GetCount(): number;
  GetItem(ind?: number): ApiRange;
  GetParent(): number;
}

/** Class representing a paragraph bullet. */
interface ApiBullet {
  GetClassType(): "bullet";
}

/** Class representing characters in an object that contains text. */
interface ApiCharacters {
  Delete(): void;
  GetCaption(): string;
  GetCount(): number;
  GetFont(): ApiFont;
  GetParent(): ApiRange;
  GetText(): string;
  Insert(String?: string): void;
  SetCaption(Caption?: string): void;
  SetText(Text?: string): void;
}

/** Class representing a chart. */
interface ApiChart {
  AddSeria(sNameRange?: string, sValuesRange?: string, sXValuesRange?: string): void;
  ApplyChartStyle(nStyleId?: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetSeries(nIdx?: number): ApiChartSeries;
  RemoveSeria(nSeria?: number): boolean;
  SetAxieNumFormat(sFormat?: NumFormat | string, sAxiePos?: AxisPos): boolean;
  SetCatFormula(sRange?: string): void;
  SetDataPointFill(oFill?: ApiFill, nSeries?: number, nDataPoint?: number, bAllSeries?: boolean): boolean;
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
  SetSeriaName(sNameRange?: string, nSeria?: number): boolean;
  SetSeriaValues(sRange?: string, nSeria?: number): boolean;
  SetSeriaXValues(sRange?: string, nSeria?: number): boolean;
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
}

/** Class representing a chart series. */
interface ApiChartSeries {
  ChangeChartType(sType?: ChartType): boolean;
  GetChartType(): ChartType;
  GetClassType(): "chartSeries";
}

/** Class representing a base class for the color types. */
interface ApiColor {
  GetClassType(): "color";
  GetRGB(): number;
}

/** Class representing a comment. */
interface ApiComment {
  AddReply(sText?: string, sAuthorName?: string, sUserId?: string, nPos?: number): void;
  Delete(): void;
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
  SetAuthorName(sAuthorName?: string): void;
  SetSolved(bSolved?: boolean): void;
  SetText(text?: string): void;
  SetTime(nTimeStamp?: number | string): void;
  SetTimeUTC(nTimeStamp?: number | string): void;
  SetUserId(sUserId?: string): void;
}

/** Class representing a comment reply. */
interface ApiCommentReply {
  GetAuthorName(): string;
  GetClassType(): "commentReply";
  GetText(): string;
  GetTime(): number;
  GetTimeUTC(): number;
  GetUserId(): string;
  SetAuthorName(sAuthorName?: string): void;
  SetText(sText?: string): void;
  SetTime(nTimeStamp?: number | string): void;
  SetTimeUTC(nTimeStamp?: number | string): void;
  SetUserId(sUserId?: string): void;
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
  GetClassType(): "drawing";
  GetContent(): ApiDocumentContent;
  GetHeight(): number;
  GetLockValue(sType?: DrawingLockType): boolean;
  GetParentSheet(): ApiWorksheet;
  GetWidth(): number;
  SetLockValue(sType?: DrawingLockType, bValue?: boolean): boolean;
  SetPosition(nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): void;
  SetSize(nWidth?: number, nHeight?: number): void;
}

/** Class representing a base class for fill. */
interface ApiFill {
  GetClassType(): "fill";
}

/** Class that contains the font attributes (font name, font size, color, and so on). */
interface ApiFont {
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
  SetBold(isBold?: boolean): void;
  SetColor(Color?: ApiColor): void;
  SetItalic(isItalic?: boolean): void;
  SetName(FontName?: string): void;
  SetSize(Size?: number): void;
  SetStrikethrough(isStrikethrough?: boolean): void;
  SetSubscript(isSubscript?: boolean): void;
  SetSuperscript(isSuperscript?: boolean): void;
  SetUnderline(Underline?: XlUnderlineStyle): void;
}

/** Class representing freeze panes. */
interface ApiFreezePanes {
  FreezeAt(frozenRange?: ApiRange | string): void;
  FreezeColumns(count?: number): void;
  FreezeRows(count?: number): void;
  GetLocation(): ApiRange | null;
  Unfreeze(): void;
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

/** Class representing a name. */
interface ApiName {
  Delete(): void;
  GetName(): string;
  GetRefersTo(): string;
  GetRefersToRange(): ApiRange;
  SetName(sName?: string): boolean;
  SetRefersTo(sRef?: string): void;
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

/** Class representing a pivot table data field. */
interface ApiPivotDataField {
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
  Move(type?: PivotMoveFieldType | PivotFieldOrientationType, index?: number | undefined): void;
  Remove(): void;
  SetCaption(caption?: string): void;
  SetDragToColumn(flag?: boolean): void;
  SetDragToData(flag?: boolean): void;
  SetDragToPage(flag?: boolean): void;
  SetDragToRow(flag?: boolean): void;
  SetFunction(func?: DataConsolidateFunctionType): void;
  SetLayoutBlankLine(insert?: boolean): void;
  SetLayoutCompactRow(compact?: boolean): void;
  SetLayoutForm(type?: PivotLayoutType): void;
  SetLayoutPageBreak(insert?: boolean): void;
  SetLayoutSubtotalLocation(type?: LayoutSubtotalLocationType): void;
  SetLayoutSubtotals(show?: boolean): void;
  SetName(name?: string): void;
  SetNumberFormat(format?: string): void;
  SetOrientation(type?: PivotFieldOrientationType): void;
  SetPosition(position?: number): void;
  SetRepeatLabels(repeat?: boolean): void;
  SetShowAllItems(show?: boolean): void;
  SetSubtotalName(caption?: string): void;
  SetSubtotals(subtotals?: PivotFieldSubtotals): void;
  SetValue(name?: string): void;
}

/** Class representing a pivot table field. */
interface ApiPivotField {
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
  Move(type?: PivotMoveFieldType | PivotFieldOrientationType, index?: number | undefined): void;
  Remove(): void;
  SetCaption(caption?: string): void;
  SetDragToColumn(flag?: boolean): void;
  SetDragToData(flag?: boolean): void;
  SetDragToPage(flag?: boolean): void;
  SetDragToRow(flag?: boolean): void;
  SetLayoutBlankLine(insert?: boolean): void;
  SetLayoutCompactRow(compact?: boolean): void;
  SetLayoutForm(type?: PivotLayoutType): void;
  SetLayoutPageBreak(insert?: boolean): void;
  SetLayoutSubtotalLocation(type?: LayoutSubtotalLocationType): void;
  SetLayoutSubtotals(show?: boolean): void;
  SetName(name?: string): void;
  SetOrientation(type?: PivotFieldOrientationType): void;
  SetPosition(position?: number): void;
  SetRepeatLabels(repeat?: boolean): void;
  SetShowAllItems(show?: boolean): void;
  SetSubtotalName(caption?: string): void;
  SetSubtotals(subtotals?: PivotFieldSubtotals): void;
  SetValue(name?: string): void;
}

/** Class representing a pivot table field item. */
interface ApiPivotItem {
  GetCaption(): string;
  GetName(): string;
  GetParent(): ApiPivotField;
  GetValue(): string;
}

/** Class representing a pivot table. */
interface ApiPivotTable {
  AddDataField(field?: number | string): ApiPivotDataField;
  AddFields(options?: PivotTableFieldOptions): void;
  ClearAllFilters(): void;
  ClearTable(): void;
  GetColumnFields(field?: number | string | undefined): ApiPivotField[];
  GetColumnGrand(): boolean;
  GetColumnRange(): ApiRange | null;
  GetData(items?: string[]): number | null;
  GetDataBodyRange(): ApiRange;
  GetDataFields(field?: number | string | undefined): ApiPivotDataField[] | ApiPivotDataField | null;
  GetDescription(): string;
  GetDisplayFieldCaptions(): boolean;
  GetDisplayFieldsInReportFilterArea(): PivotTableFilterAreaInfo;
  GetGrandTotalName(): string;
  GetHiddenFields(): ApiPivotField[];
  GetName(): string;
  GetPageFields(field?: number | string | undefined): ApiPivotField[];
  GetParent(): ApiWorksheet;
  GetPivotData(dataField?: string, fieldItemsArray?: string[]): ApiRange;
  GetPivotFields(field?: string | number): ApiPivotField[] | ApiPivotField | ApiPivotDataField | null;
  GetRowFields(field?: number | string | undefined): ApiPivotField[];
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
  MoveField(identifier?: number | string, type?: PivotMoveFieldType | PivotFieldOrientationType, index?: number): void;
  PivotValueCell(rowLine?: number, colLine?: number): number | string | null;
  RefreshTable(): void;
  RemoveField(identifier?: number | string): void;
  Select(): void;
  SetColumnGrand(show?: boolean): void;
  SetDescription(description?: string): void;
  SetDisplayFieldCaptions(show?: boolean): void;
  SetDisplayFieldsInReportFilterArea(type?: FieldsInReportFilterType, fields?: number): void;
  SetGrandTotalName(name?: string): void;
  SetLayoutBlankLine(insert?: boolean): void;
  SetLayoutSubtotals(show?: boolean): void;
  SetName(name?: string): void;
  SetRepeatAllLabels(repeat?: boolean): void;
  SetRowAxisLayout(type?: PivotLayoutType, compact?: boolean): void;
  SetRowGrand(show?: boolean): void;
  SetSource(source?: ApiRange): void;
  SetStyleName(name?: string): void;
  SetSubtotalLocation(type?: PivotSubtotalLayoutType): void;
  SetTableStyleColumnHeaders(show?: boolean): void;
  SetTableStyleColumnStripes(show?: boolean): void;
  SetTableStyleRowHeaders(show?: boolean): void;
  SetTableStyleRowStripes(show?: boolean): void;
  SetTitle(title?: string): void;
  ShowDetails(rowLine?: number, colLine?: number): boolean;
  Update(): void;
}

/** Class representing a Preset Color. */
interface ApiPresetColor {
  GetClassType(): "presetColor";
}

/** Class representing a user-protected range. */
interface ApiProtectedRange {
  AddUser(sId?: string, sName?: string, protectedRangeUserType?: ProtectedRangeUserType): ApiProtectedRangeUserInfo | null;
  DeleteUser(sId?: string): boolean;
  GetAllUsers(): ApiProtectedRangeUserInfo[] | null;
  GetUser(sId?: string): ApiProtectedRangeUserInfo | null;
  SetAnyoneType(protectedRangeUserType?: ProtectedRangeUserType): boolean;
  SetRange(sRange?: string): boolean;
  SetTitle(sTitle?: string): boolean;
}

/** Class representing a user from the current protected range. */
interface ApiProtectedRangeUserInfo {
  GetId(): string | null;
  GetName(): string | null;
  GetType(): ProtectedRangeUserType;
}

/** Class representing an RGB Color. */
interface ApiRGBColor {
  GetClassType(): "rgbColor";
}

/** Class representing a range. */
interface ApiRange {
  AddComment(sText?: string, sAuthor?: string): ApiComment | null;
  AutoFit(bRows?: boolean, bCols?: boolean): void;
  Clear(): void;
  Copy(destination?: ApiRange): void;
  Cut(destination?: ApiRange): void;
  Delete(shift?: DeleteShiftDirection): void;
  End(direction?: Direction): ApiRange;
  Find(What?: string | undefined, After?: ApiRange, LookIn?: XlFindLookIn, LookAt?: XlLookAt, SearchOrder?: XlSearchOrder, SearchDirection?: XlSearchDirection, MatchCase?: boolean): ApiRange | null;
  FindNext(After?: ApiRange): ApiRange | null;
  FindPrevious(Before?: ApiRange): ApiRange | null;
  ForEach(fCallback?: (...args: any[]) => any): void;
  GetAddress(RowAbs?: boolean, ColAbs?: boolean, RefStyle?: string, External?: boolean, RelativeTo?: any): string | null;
  GetAreas(): ApiAreas;
  GetCells(row?: number, col?: number): ApiRange;
  GetCharacters(Start?: number, Length?: number): ApiCharacters;
  GetClassType(): "range";
  GetCol(): number;
  GetCols(nCol?: number): ApiRange | null;
  GetColumnWidth(): number;
  GetComment(): ApiComment | null;
  GetCount(): number;
  GetDefName(): ApiName;
  GetFillColor(): ApiColor | 'No Fill';
  GetFormula(): string | string[][];
  GetHidden(): boolean;
  GetNumberFormat(): string | null;
  GetOrientation(): Angle;
  GetPivotTable(): ApiPivotTable | null;
  GetRow(): number;
  GetRowHeight(): number;
  GetRows(nRow?: number): ApiRange | null;
  GetText(): string | string[][];
  GetValue(): string | string[][];
  GetValue2(): string | string[][];
  GetWorksheet(): ApiWorksheet;
  GetWrapText(): boolean;
  Insert(shift?: string): void;
  Merge(isAcross?: boolean): void;
  Paste(rangeFrom?: ApiRange): void;
  PasteSpecial(sPasteType?: PasteType, sPasteSpecialOperation?: PasteSpecialOperation, bSkipBlanks?: boolean, bTranspose?: boolean): void;
  Replace(What?: string | undefined, Replacement?: string, LookAt?: XlLookAt, SearchOrder?: XlSearchOrder, SearchDirection?: XlSearchDirection, MatchCase?: boolean, ReplaceAll?: boolean): void;
  Select(): void;
  SetAlignHorizontal(sAlignment?: 'left' | 'right' | 'center' | 'justify'): boolean;
  SetAlignVertical(sAligment?: 'center' | 'bottom' | 'top' | 'distributed' | 'justify'): boolean;
  SetAutoFilter(Field?: number, Criteria1?: string | string[] | ApiColor | XlDynamicFilterCriteria, Operator?: XlAutoFilterOperator, Criteria2?: string, VisibleDropDown?: boolean): void;
  SetBold(isBold?: boolean): void;
  SetBorders(bordersIndex?: BordersIndex, lineStyle?: LineStyle, oColor?: ApiColor): void;
  SetColumnWidth(nWidth?: number): void;
  SetFillColor(oColor?: ApiColor): void;
  SetFontColor(oColor?: ApiColor): void;
  SetFontName(sName?: string): void;
  SetFontSize(nSize?: number): void;
  SetHidden(isHidden?: boolean): void;
  SetItalic(isItalic?: boolean): void;
  SetNumberFormat(sFormat?: string): void;
  SetOffset(nRow?: number, nCol?: number): void;
  SetOrientation(angle?: Angle): void;
  SetRowHeight(nHeight?: number): void;
  SetSort(key1?: ApiRange | string, sSortOrder1?: SortOrder, key2?: ApiRange | string, sSortOrder2?: SortOrder, key3?: ApiRange | string, sSortOrder3?: SortOrder, sHeader?: SortHeader, sOrientation?: SortOrientation): void;
  SetStrikeout(isStrikeout?: boolean): void;
  SetUnderline(undelineType?: 'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'): void;
  SetValue(data?: string | boolean | number | any[][] | any[][][]): boolean;
  SetWrap(isWrap?: boolean): void;
  UnMerge(): void;
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

/** Class representing a shape. */
interface ApiShape {
  GetClassType(): "shape";
  GetContent(): ApiDocumentContent;
  GetDocContent(): ApiDocumentContent;
  SetPaddings(nLeft?: number, nTop?: number, nRight?: number, nBottom?: number): void;
  SetVerticalTextAlign(sVerticalAlign?: "top" | "center" | "bottom"): boolean;
}

/** Class representing a stroke. */
interface ApiStroke {
  GetClassType(): "stroke";
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
  SetItalic(isItalic?: boolean): ApiTextPr;
  SetOutLine(oStroke?: ApiStroke): ApiTextPr;
  SetSmallCaps(isSmallCaps?: boolean): ApiTextPr;
  SetSpacing(nSpacing?: number): ApiTextPr;
  SetStrikeout(isStrikeout?: boolean): ApiTextPr;
  SetTextFill(oApiFill?: ApiFill): ApiTextPr;
  SetUnderline(isUnderline?: boolean): ApiTextPr;
  SetVertAlign(sType?: "baseline" | "subscript" | "superscript"): ApiTextPr;
}

/** Class representing a base class for color types. */
interface ApiUniColor {
  GetClassType(): "uniColor";
}

/** Class representing an unsupported element. */
interface ApiUnsupported {
  GetClassType(): "unsupported";
}

/** Class representing a sheet. */
interface ApiWorksheet {
  AddChart(sDataRange?: string, bInRows?: boolean, sType?: ChartType, nStyleIndex?: number, nExtX?: number, nExtY?: number, nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): ApiChart;
  AddDefName(sName?: string, sRef?: string, isHidden?: boolean): boolean;
  AddImage(sImageSrc?: string, nWidth?: number, nHeight?: number, nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): ApiImage;
  AddOleObject(sImageSrc?: string, nWidth?: number, nHeight?: number, sData?: string, sAppId?: string, nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): ApiOleObject;
  AddProtectedRange(sTitle?: string, sDataRange?: string): ApiProtectedRange | null;
  AddShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke, nFromCol?: number, nColOffset?: number, nFromRow?: number, nRowOffset?: number): ApiShape;
  AddWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nFromCol?: number, nFromRow?: number, nColOffset?: number, nRowOffset?: number): ApiDrawing;
  Delete(): void;
  FormatAsTable(sRange?: string): void;
  GetActiveCell(): ApiRange;
  GetAllCharts(): ApiChart[];
  GetAllDrawings(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllPivotTables(): ApiPivotTable[];
  GetAllProtectedRanges(): ApiProtectedRange[] | null;
  GetAllShapes(): ApiShape[];
  GetBottomMargin(): number;
  GetCells(row?: number, col?: number): ApiRange | null;
  GetCols(sRange?: string): ApiRange;
  GetComments(): ApiComment[];
  GetDefName(defName?: string): ApiName | null;
  GetDefNames(): ApiName[];
  GetFreezePanes(): ApiFreezePanes;
  GetIndex(): number;
  GetLeftMargin(): number;
  GetName(): string;
  GetPageOrientation(): PageOrientation;
  GetPivotByName(name?: string): ApiPivotTable | null;
  GetPrintGridlines(): boolean;
  GetPrintHeadings(): boolean;
  GetProtectedRange(sTitle?: string): ApiProtectedRange | null;
  GetRange(Range1?: string | ApiRange, Range2?: string | ApiRange): ApiRange | null;
  GetRangeByNumber(nRow?: number, nCol?: number): ApiRange;
  GetRightMargin(): number;
  GetRows(value?: string | number): ApiRange | null;
  GetSelection(): ApiRange;
  GetTopMargin(): number;
  GetUsedRange(): ApiRange;
  GetVisible(): boolean;
  GroupDrawings(aDrawings?: DrawingForGroup[]): ApiGroup;
  Move(before?: ApiWorksheet, after?: ApiWorksheet): void;
  Paste(destination?: ApiRange): void;
  RefreshAllPivots(): void;
  ReplaceCurrentImage(sImageUrl?: string, nWidth?: number, nHeight?: number): void;
  SetActive(): void;
  SetBottomMargin(nPoints?: number): void;
  SetColumnWidth(nColumn?: number, nWidth?: number, bWithotPaddings?: boolean): void;
  SetDisplayGridlines(isDisplayed?: boolean): void;
  SetDisplayHeadings(isDisplayed?: boolean): void;
  SetHyperlink(sRange?: string, sAddress?: string, subAddress?: string, sScreenTip?: string, sTextToDisplay?: string): void;
  SetLeftMargin(nPoints?: number): void;
  SetName(sName?: string): void;
  SetPageOrientation(sPageOrientation?: PageOrientation): void;
  SetPrintGridlines(bPrint?: boolean): void;
  SetPrintHeadings(bPrint?: boolean): void;
  SetRightMargin(nPoints?: number): void;
  SetRowHeight(nRow?: number, nHeight?: number): void;
  SetTopMargin(nPoints?: number): void;
  SetVisible(isVisible?: boolean): void;
}

/** Class representing a worksheet function. */
interface ApiWorksheetFunction {
  ABS(arg1?: ApiRange | ApiName | number): number;
  ACCRINT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number): number;
  ACCRINTM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  ACOS(arg1?: ApiRange | ApiName | number): number;
  ACOSH(arg1?: ApiRange | ApiName | number): number;
  ACOT(arg1?: ApiRange | ApiName | number): number;
  ACOTH(arg1?: ApiRange | ApiName | number): number;
  AGGREGATE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: number | ApiRange | number[], args?: number | ApiRange | number[]): number;
  AMORDEGRC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
  AMORLINC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
  AND(args?: number | string | ApiRange | boolean | ApiName): boolean;
  ARABIC(arg1?: ApiRange | ApiName | string): number;
  ASC(arg1?: ApiRange | ApiName | string): string;
  ASIN(arg1?: ApiRange | ApiName | number): number;
  ASINH(arg1?: ApiRange | ApiName | number): number;
  ATAN(arg1?: ApiRange | ApiName | number): number;
  ATAN2(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ATANH(arg1?: ApiRange | ApiName | number): number;
  AVEDEV(args?: ApiRange | ApiName | number | number[]): number;
  AVERAGE(args?: ApiRange | ApiName | number | number[]): number;
  AVERAGEA(args?: ApiRange | ApiName | number | string | number[]): number;
  AVERAGEIF(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  AVERAGEIFS(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;
  BASE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  BESSELI(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BESSELJ(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BESSELK(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BESSELY(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BETADIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  BETAINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  BETA_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  BETA_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  BIN2DEC(arg1?: ApiRange | ApiName | number): number;
  BIN2HEX(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BIN2OCT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BINOMDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  BINOM_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  BINOM_DIST_RANGE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  BINOM_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  BITAND(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BITLSHIFT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BITOR(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BITRSHIFT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  BITXOR(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CEILING(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CEILING_MATH(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  CEILING_PRECISE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CHAR(arg1?: ApiRange | ApiName | number): string;
  CHIDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CHIINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CHISQ_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  CHISQ_DIST_RT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CHISQ_INV(arg1?: ApiRange | ApiName | number, arg2_?: ApiRange | ApiName | number): number;
  CHISQ_INV_RT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  CHITEST(arg1?: ApiRange | ApiName | number | string | boolean, arg2?: ApiRange | ApiName | number | string | boolean): number;
  CHOOSE(arg1?: ApiRange | ApiName | number, args?: number | string | ApiRange | ApiName): number;
  CLEAN(arg1?: ApiRange | ApiName | string): string;
  CODE(arg1?: ApiRange | ApiName | string): number;
  COLUMNS(arg1?: ApiRange | ApiName | number[]): number;
  COMBIN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  COMBINA(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  COMPLEX(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | string): number;
  CONCATENATE(arg_n?: ApiRange | ApiName | string): string;
  CONFIDENCE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  CONFIDENCE_NORM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  CONFIDENCE_T(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  CONVERT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | string): number;
  COS(arg1?: ApiRange | ApiName | number): number;
  COSH(arg1?: ApiRange | ApiName | number): number;
  COT(arg1?: ApiRange | ApiName | number): number;
  COTH(arg1?: ApiRange | ApiName | number): number;
  COUNT(args?: string | number | boolean | ApiRange | any[] | ApiName): number;
  COUNTA(args?: string | number | boolean | ApiRange | any[] | ApiName): number;
  COUNTBLANK(arg1?: ApiRange | ApiName): number;
  COUNTIF(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string): number;
  COUNTIFS(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string): number;
  COUPDAYBS(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  COUPDAYS(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  COUPDAYSNC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  COUPNCD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  COUPNUM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  COUPPCD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  CRITBINOM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  CSC(arg1?: ApiRange | ApiName | number): number;
  CSCH(arg1?: ApiRange | ApiName | number): number;
  CUMIPMT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  CUMPRINC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  DATE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  DATEVALUE(arg1?: ApiRange | ApiName | string): number;
  DAVERAGE(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DAY(arg1?: ApiRange | ApiName | number): number;
  DAYS(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DAYS360(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  DB(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  DCOUNT(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DCOUNTA(arg1_?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DDB(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  DEC2BIN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DEC2HEX(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DEC2OCT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DECIMAL(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): number;
  DEGREES(arg1?: ApiRange | ApiName | number): number;
  DELTA(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DEVSQ(args?: ApiRange | ApiName | number | number[]): number;
  DGET(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DISC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  DMAX(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DMIN(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DOLLAR(arg1?: ApiRange | ApiName | number | string, arg2?: ApiRange | ApiName | number): string;
  DOLLARDE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DOLLARFR(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  DPRODUCT(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DSTDEV(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DSTDEVP(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DSUM(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DURATION(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  DVAR(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  DVARP(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  ECMA_CEILING(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  EDATE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  EFFECT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  EOMONTH(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ERF(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ERFC(arg1?: ApiRange | ApiName | number): number;
  ERFC_PRECISE(arg1?: ApiRange | ApiName | number): number;
  ERF_PRECISE(arg1?: ApiRange | ApiName | number): number;
  ERROR_TYPE(arg1?: ErrorValue | ApiRange | ApiName): number;
  EVEN(arg1?: ApiRange | ApiName | number): number;
  EXACT(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string): boolean;
  EXP(arg1?: ApiRange | ApiName | number): number;
  EXPONDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  EXPON_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  FACT(arg1?: ApiRange | ApiName | number): number;
  FACTDOUBLE(arg1?: ApiRange | ApiName | number): number;
  FALSE(): boolean;
  FDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  FIND(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
  FINDB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
  FINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  FISHER(arg1?: ApiRange | ApiName | number): number;
  FISHERINV(arg1?: ApiRange | ApiName | number): number;
  FIXED(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): string;
  FLOOR(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  FLOOR_MATH(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  FLOOR_PRECISE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  FORECAST_ETS(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  FORECAST_ETS_CONFINT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
  FORECAST_ETS_SEASONALITY(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  FORECAST_ETS_STAT(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  FREQUENCY(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[]): number;
  FV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  FVSCHEDULE(arg1?: ApiRange | ApiName | number, arg2?: number[] | ApiRange | ApiName): number;
  F_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  F_DIST_RT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  F_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  F_INV_RT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  GAMMA(arg1?: ApiRange | ApiName | number): number;
  GAMMADIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  GAMMAINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  GAMMALN(arg1?: ApiRange | ApiName | number): number;
  GAMMALN_PRECISE(arg1?: ApiRange | ApiName | number): number;
  GAMMA_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  GAMMA_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  GAUSS(arg1?: ApiRange | ApiName | number): number;
  GCD(args?: ApiRange | ApiName | number): number;
  GEOMEAN(args?: ApiRange | number[] | ApiName): number;
  GESTEP(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  GROWTH(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;
  HARMEAN(args?: ApiRange | number[] | ApiName): number;
  HEX2BIN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  HEX2DEC(arg1?: ApiRange | ApiName | number): number;
  HEX2OCT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  HLOOKUP(arg1?: number | string | ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;
  HOUR(arg1?: ApiRange | ApiName | number | string): number;
  HYPERLINK(arg1?: string | ApiRange | ApiName, arg2?: string | ApiRange | number | ApiName): string;
  HYPGEOMDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  HYPGEOM_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | boolean): number;
  IF(arg1?: number | string | ApiRange | ApiName | boolean, arg2?: number | string | ApiRange | ApiName | boolean, arg3?: ApiRange | ApiName | number | string | boolean): number | string | boolean;
  IFERROR(arg1?: ApiRange | ApiName | number | string | boolean, arg2?: ApiRange | ApiName | number | string | boolean): number | string | boolean;
  IFNA(arg1?: ApiRange | ApiName | number | string | boolean, arg2?: ApiRange | ApiName | number | string | boolean): number | string | boolean;
  IMABS(arg1?: ApiRange | ApiName | number): number;
  IMAGINARY(arg1?: ApiRange | ApiName | number): number;
  IMARGUMENT(arg1?: ApiRange | ApiName | number): number;
  IMCONJUGATE(arg1?: ApiRange | ApiName | number): number;
  IMCOS(arg1?: ApiRange | ApiName | number): number;
  IMCOSH(arg1?: ApiRange | ApiName | number): number;
  IMCOT(arg1?: ApiRange | ApiName | number): number;
  IMCSC(arg1?: ApiRange | ApiName | number): number;
  IMCSCH(arg1?: ApiRange | ApiName | number): number;
  IMDIV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  IMEXP(arg1?: ApiRange | ApiName | number): number;
  IMLN(arg1?: ApiRange | ApiName | number): number;
  IMLOG10(arg1?: ApiRange | ApiName | number): number;
  IMLOG2(arg1?: ApiRange | ApiName | number): number;
  IMPOWER(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  IMPRODUCT(args?: ApiRange | ApiName | string): number;
  IMREAL(arg1?: ApiRange | ApiName | number): number;
  IMSEC(arg1?: ApiRange | ApiName | number): number;
  IMSECH(arg1?: ApiRange | ApiName | number): number;
  IMSIN(arg1?: ApiRange | ApiName | number): number;
  IMSINH(arg1?: ApiRange | ApiName | number): number;
  IMSQRT(arg1?: ApiRange | ApiName | number): number;
  IMSUB(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  IMSUM(args?: ApiRange | ApiName | string): number;
  IMTAN(arg1?: ApiRange | ApiName | number): number;
  INDEX(arg1?: ApiRange | ApiName | any[], arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number | string;
  INT(arg1?: ApiRange | ApiName | number): number;
  INTRATE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  IPMT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  IRR(arg1?: number[] | ApiRange, arg2?: ApiRange | ApiName | number): number;
  ISERR(arg1?: number | string | boolean | ApiRange | ApiName): boolean;
  ISERROR(arg1?: number | string | boolean | ApiRange | ApiName): boolean;
  ISEVEN(arg1?: ApiRange | ApiName | number): boolean;
  ISFORMULA(arg1?: ApiRange | ApiName): boolean;
  ISLOGICAL(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  ISNA(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  ISNONTEXT(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  ISNUMBER(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  ISODD(arg1?: ApiRange | ApiName | number): boolean;
  ISOWEEKNUM(arg1?: ApiRange | ApiName | number): number;
  ISO_CEILING(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ISPMT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  ISREF(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  ISTEXT(arg1?: ApiRange | string | number | boolean | ApiName): boolean;
  KURT(args?: ApiRange | number[] | ApiName): number;
  LARGE(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  LCM(args?: ApiRange | ApiName | number): number;
  LEFT(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
  LEFTB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
  LEN(arg1?: ApiRange | ApiName | string): number;
  LENB(arg1?: ApiRange | ApiName | string): number;
  LINEST(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;
  LN(arg1?: ApiRange | ApiName | number): number;
  LOG(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  LOG10(arg1?: ApiRange | ApiName | number): number;
  LOGEST(arg1?: ApiRange | ApiName | ApiRange, arg2?: ApiRange | ApiName | ApiRange, arg3?: ApiRange | ApiName | boolean, arg4?: ApiRange | ApiName | boolean): number;
  LOGINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  LOGNORMDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  LOGNORM_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  LOGNORM_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  LOOKUP(arg1?: number | string | boolean | ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName): number | string | boolean;
  LOWER(arg1?: ApiRange | ApiName | string): string;
  MATCH(arg1?: number | string | boolean | ApiRange | ApiName, arg2?: ApiRange | ApiName | any[], arg3?: ApiRange | ApiName | number): number;
  MAX(args?: number | any[] | ApiRange | ApiName): number;
  MAXA(args?: number | string | boolean | ApiRange | any[] | ApiName): number;
  MDURATION(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  MEDIAN(args?: number | ApiRange | any[] | ApiName): number;
  MID(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): string;
  MIDB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): string;
  MIN(args?: number | ApiRange | any[] | ApiName): number;
  MINA(args?: number | string | boolean | ApiRange | any[] | ApiName): number;
  MINUTE(arg1?: ApiRange | ApiName | number | string): number;
  MIRR(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  MOD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  MONTH(arg1_?: ApiRange | ApiName | number): number;
  MROUND(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  MULTINOMIAL(args?: ApiRange | ApiName | number): number;
  MUNIT(arg1?: ApiRange | ApiName | number): number;
  N(arg1?: ApiRange | ApiName | number | string | boolean): number;
  NA(): string;
  NEGBINOMDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  NEGBINOM_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  NETWORKDAYS(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | number[]): number;
  NETWORKDAYS_INTL(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | number[]): number;
  NOMINAL(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  NORMDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  NORMINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  NORMSDIST(arg1?: ApiRange | ApiName | number): number;
  NORMSINV(arg1?: ApiRange | ApiName | number): number;
  NORM_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  NORM_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  NORM_S_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | boolean): number;
  NORM_S_INV(arg1?: ApiRange | ApiName | number): number;
  NOT(arg1?: ApiRange | ApiName | number | string | boolean): boolean;
  NOW(): number;
  NPER(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  NPV(arg1?: ApiRange | ApiName | number, args?: number | ApiRange | number[]): number;
  NUMBERVALUE(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | string): number;
  OCT2BIN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  OCT2DEC(arg1?: ApiRange | ApiName | number): number;
  OCT2HEX(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ODD(arg1?: ApiRange | ApiName | number): number;
  ODDFPRICE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
  ODDFYIELD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
  ODDLPRICE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg5_2?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
  ODDLYIELD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg6_2?: ApiRange | ApiName | number, arg8?: ApiRange | ApiName | number, arg9?: ApiRange | ApiName | number): number;
  OR(args?: number | string | ApiRange | ApiName | boolean): boolean;
  PDURATION(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  PERCENTILE(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  PERCENTILE_EXC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  PERCENTILE_INC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  PERCENTRANK(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  PERCENTRANK_EXC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  PERCENTRANK_INC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  PERMUT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  PERMUTATIONA(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  PHI(arg1?: ApiRange | ApiName | number): number;
  PI(): number;
  PMT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  POISSON(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  POISSON_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  POWER(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  PPMT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  PRICE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
  PRICEDISC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  PRICEMAT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  PRODUCT(args?: number | ApiRange | number[]): number;
  PROPER(arg1?: ApiRange | ApiName | string): string;
  PV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  QUARTILE(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  QUARTILE_EXC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  QUARTILE_INC(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  QUOTIENT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  RADIANS(arg1?: ApiRange | ApiName | number): number;
  RAND(): number;
  RANDBETWEEN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  RANK(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
  RANK_AVG(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
  RANK_EQ(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | boolean): number;
  RATE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  RECEIVED(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  REPLACE(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | string): string;
  REPLACEB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | string): string;
  REPT(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
  RIGHT(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
  RIGHTB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | number): string;
  ROMAN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): string;
  ROUND(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ROUNDDOWN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ROUNDUP(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  ROWS(arg1?: ApiRange | ApiName | any[]): number;
  RRI(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  SEARCH(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
  SEARCHB(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | number): number;
  SEC(arg1?: ApiRange | ApiName | number): number;
  SECH(arg1?: ApiRange | ApiName | number): number;
  SECOND(arg1?: ApiRange | ApiName | number | string): number;
  SERIESSUM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  SHEET(arg1?: string | ApiRange | ApiName): number;
  SHEETS(arg1?: ApiRange | ApiName): number;
  SIGN(arg1?: ApiRange | ApiName | number): number;
  SIN(arg1?: ApiRange | ApiName | number): number;
  SINH(arg1?: ApiRange | ApiName | number): number;
  SKEW(args?: number | ApiName | number[] | ApiRange): number;
  SKEW_P(args?: number | ApiName | number[] | ApiRange): number;
  SLN(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  SMALL(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  SQRT(arg1?: ApiRange | ApiName | number): number;
  SQRTPI(arg1?: ApiRange | ApiName | number): number;
  STANDARDIZE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  STDEV(args?: number[] | number | ApiName | ApiRange): number;
  STDEVA(args?: number[] | number | string | boolean | ApiRange | ApiName): number;
  STDEVP(args?: number[] | number | ApiName | ApiRange): number;
  STDEVPA(args?: number[] | number | string | boolean | ApiRange | ApiName): number;
  STDEV_P(args?: number[] | number | ApiName | ApiRange): number;
  STDEV_S(args?: number[] | number | ApiName | ApiRange): number;
  SUBSTITUTE(arg1?: ApiRange | ApiName | string, arg2?: ApiRange | ApiName | string, arg3?: ApiRange | ApiName | string, arg4?: ApiRange | ApiName | string): string;
  SUBTOTAL(arg1?: ApiRange | ApiName | number, args?: ApiRange | ApiName): number;
  SUM(args?: ApiRange | ApiName | string | number | boolean | any[]): number;
  SUMIF(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName): number;
  SUMIFS(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName | number | string, arg3?: ApiRange | ApiName, arg4?: ApiRange | ApiName | number | string, arg5?: ApiRange | ApiName): number;
  SUMSQ(args?: ApiRange | number | string | boolean | ApiName | any[]): number;
  SYD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number): number;
  T(arg1?: ApiRange | ApiName | number | string | boolean): ApiRange | ApiName | string;
  TAN(arg1?: ApiRange | ApiName | number): number;
  TANH(arg1?: ApiRange | ApiName | number): number;
  TBILLEQ(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  TBILLPRICE(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  TBILLYIELD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  TDIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  TEXT(arg1?: ApiRange | ApiName | number | string, arg2?: ApiRange | ApiName | string): string;
  TIME(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  TIMEVALUE(arg1?: ApiRange | ApiName | string): number;
  TINV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  TODAY(): number;
  TRANSPOSE(arg1?: ApiRange | ApiName | any[]): ApiRange;
  TREND(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number[], arg3?: ApiRange | ApiName | number[], arg4?: ApiRange | ApiName | boolean): number;
  TRIM(arg1?: ApiRange | ApiName | string): string;
  TRIMMEAN(arg1?: ApiRange | ApiName | number[], arg2?: ApiRange | ApiName | number): number;
  TRUE(): boolean;
  TRUNC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  TYPE(arg1?: number | string | boolean | any[] | ApiRange | ApiName): number;
  T_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | boolean): number;
  T_DIST_2T(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  T_DIST_RT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  T_INV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  T_INV_2T(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  UNICHAR(arg1?: ApiRange | ApiName | number): string;
  UNICODE(arg1?: ApiRange | ApiName | string): number;
  UPPER(arg1?: ApiRange | ApiName | string): string;
  VALUE(arg1?: ApiRange | ApiName | string): number;
  VAR(args?: number | ApiName | ApiRange | number[]): number;
  VARA(args?: number | string | boolean | ApiRange | any[] | ApiName): number;
  VARP(args?: number | ApiName | ApiRange | number[]): number;
  VARPA(args?: number | string | boolean | ApiRange | any[] | ApiName): number;
  VAR_P(args?: number | ApiName | ApiRange | number[]): number;
  VAR_S(args?: number | ApiName | ApiRange | number[]): number;
  VDB(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | boolean): number;
  VLOOKUP(arg1?: number | string | ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number | string;
  WEEKDAY(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  WEEKNUM(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number): number;
  WEIBULL(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  WEIBULL_DIST(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | boolean): number;
  WORKDAY(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number[]): number;
  WORKDAY_INTL(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number | string, arg4?: ApiRange | ApiName | number[]): number;
  XIRR(arg1?: ApiRange | ApiName, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName | number): number;
  XNPV(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName, arg3?: ApiRange | ApiName): number;
  XOR(args?: ApiRange | ApiName | boolean | any[]): boolean;
  YEAR(arg1?: ApiRange | ApiName | number): number;
  YEARFRAC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  YIELD(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number, arg7?: ApiRange | ApiName | number): number;
  YIELDDISC(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number): number;
  YIELDMAT(arg1?: ApiRange | ApiName | number, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number, arg4?: ApiRange | ApiName | number, arg5?: ApiRange | ApiName | number, arg6?: ApiRange | ApiName | number): number;
  ZTEST(arg1?: number[] | ApiRange | ApiName, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
  Z_TEST(arg1?: number[] | ApiRange, arg2?: ApiRange | ApiName | number, arg3?: ApiRange | ApiName | number): number;
}

