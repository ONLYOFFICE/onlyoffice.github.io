// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: form

export namespace Forms {
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
