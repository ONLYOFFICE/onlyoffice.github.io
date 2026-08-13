// Auto-generated from ONLYOFFICE/sdkjs JSDoc
// Editor type: form

export namespace Forms {
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
   * A border type which will be added to the document element.
   * **"none"** - no border will be added to the created element or the selected element side.
   * **"single"** - a single border will be added to the created element or the selected element side.
   *
   * @example
   * ```js
   * paraPr.SetBottomBorder("single", 24, 0, 0, 255, 0);
   * ```
   */
  export type BorderType = "none" | "single";

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

  /**
   * Checkbox / radio button properties.
   *
   * @example
   * ```js
   * let checkBoxFormPr = {"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true};
   * let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPr);
   * ```
   */
  export type CheckBoxFormPr = FormPrBase | CheckBoxFormPrBase;

  /**
   * Specific checkbox / radio button properties.
   *
   * @example
   * ```js
   * let checkBoxFormPrBase = {"radio": true};
   * let checkBoxForm = Api.CreateCheckBoxForm(checkBoxFormPrBase)
   * ```
   */
  export interface CheckBoxFormPrBase {
    /**
     * Specifies if the current checkbox is a radio button. In this case, the key parameter is considered
     * as an identifier for the group of radio buttons.
     */
    radio: boolean;
  }

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
   * Combo box / dropdown list properties.
   *
   * @example
   * ```js
   * let comboBoxFormPr = {"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]};
   * let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr);
   * ```
   */
  export type ComboBoxFormPr = FormPrBase | ComboBoxFormPrBase;

  /**
   * Specific combo box / dropdown list properties.
   *
   * @example
   * ```js
   * let comboBoxFormPrBase = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]};
   * let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPrBase);
   * ```
   */
  export interface ComboBoxFormPrBase {
    /** Specifies if the combo box text can be edited. */
    editable: boolean;

    /**
     * Specifies if the combo box form content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;

    /**
     * The combo box items.
     * This array consists of strings or arrays of two strings where the first string is the displayed
     * value and the second one is its meaning.
     * If the array consists of single strings, then the displayed value and its meaning are the same.
     * Example: ["First", ["Second", "2"], ["Third", "3"], "Fourth"].
     */
    items: (string | string[])[];
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
   * Date form properties.
   *
   * @example
   * ```js
   * let dateFormPr = {"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"};
   * let dateForm = Api.CreateDateForm(dateFormPr);
   * ```
   */
  export type DateFormPr = FormPrBase | DateFormPrBase;

  /**
   * Specific date form properties.
   *
   * @example
   * ```js
   * let dateFormPrBase = {"format": "mm.dd.yyyy", "lang": "en-US"};
   * let dateForm = Api.CreateDateForm(dateFormPrBase);
   * ```
   */
  export interface DateFormPrBase {
    /** The date format, ex: mm.dd.yyyy */
    format: string;

    /**
     * The date language. Possible value for this parameter is a language identifier as defined by
     * RFC 4646/BCP 47. Example: "en-CA".
     */
    lang: string;
  }

  /**
   * Any valid element which can be added to the document structure.
   *
   * @example
   * ```js
   * doc.AddElement(paragraph);
   * ```
   */
  export type DocumentElement = ApiParagraph | ApiTable | ApiBlockLvlSdt;

  /** Any valid drawing element. */
  export type Drawing = ApiShape | ApiImage | ApiGroup | ApiOleObject | ApiChart | ApiSmartArt;

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
   * Form insertion specific properties.
   *
   * @example
   * ```js
   * let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false};
   * doc.InsertTextForm(textFormInsertPr);
   * ```
   */
  export interface FormInsertPr {
    /** Specifies if the currently selected text should be saved as a placeholder of the inserted form. */
    placeholderFromSelection?: boolean;

    /** Specifies if the currently selected text should be saved as the content of the inserted form. */
    keepSelectedTextInForm?: boolean;
  }

  /**
   * Common form properties.
   *
   * @example
   * ```js
   * let formPrBase = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name"};
   * let textForm = Api.CreateTextForm(formPrBase);
   * ```
   */
  export interface FormPrBase {
    /** Form key. */
    key: string;

    /** Form tip text. */
    tip: string;

    /** Form tag. */
    tag: string;

    /** The role to fill out form. */
    role: string;

    /** Specifies if the form is required or not. */
    required: boolean;

    /** Form placeholder text. */
    placeholder: string;
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
  export type ParagraphContent = ApiUnsupported | ApiRun | ApiInlineLvlSdt | ApiHyperlink | ApiFormBase | ApiMath;

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

  /**
   * Picture form properties.
   *
   * @example
   * ```js
   * let pictureFormPr = {"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50};
   * let pictureForm = Api.CreatePictureForm(pictureFormPr);
   * ```
   */
  export type PictureFormPr = FormPrBase | PictureFormPrBase;

  /**
   * Specific picture form properties.
   *
   * @example
   * ```js
   * let comboBoxFormPr = {"editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]};
   * let comboBoxForm = Api.CreateComboBoxForm(comboBoxFormPr);
   * ```
   */
  export interface PictureFormPrBase {
    /** The condition to scale an image in the picture form: "always", "never", "tooBig" or "tooSmall". */
    scaleFlag: ScaleFlag;

    /** Specifies if the aspect ratio of the picture form is locked or not. */
    lockAspectRatio: boolean;

    /** Specifies if the form border width is respected or not when scaling the image. */
    respectBorders: boolean;

    /**
     * Horizontal picture position inside the picture form measured in percent:
     * **0** - the picture is placed on the left;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the right.
     */
    shiftX: percentage;

    /**
     * Vertical picture position inside the picture form measured in percent:
     * **0** - the picture is placed on top;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the bottom.
     */
    shiftY: percentage;
  }

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

  /** The role properties. */
  export interface RoleProperties {
    /** The role color. */
    color: string;
  }

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
   * Custom tab types.
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
   * Properties for inserting a text field.
   *
   * @example
   * ```js
   * let textFormInsertPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "Name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false, "placeholderFromSelection": true, "keepSelectedTextInForm": false};
   * doc.InsertTextForm(textFormInsertPr);
   * ```
   */
  export type TextFormInsertPr = FormPrBase | TextFormPrBase | FormInsertPr;

  /**
   * Text field properties.
   *
   * @example
   * ```js
   * let textFormPr = {"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false};
   * let textForm = Api.CreateTextForm(textFormPr);
   * ```
   */
  export type TextFormPr = FormPrBase | TextFormPrBase;

  /**
   * Specific text field properties.
   *
   * @example
   * ```js
   * let textFormPrBase = {"comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false};
   * let textForm = Api.CreateTextForm(textFormPrBase);
   * ```
   */
  export interface TextFormPrBase {
    /**
     * Specifies if the text field should be a comb of characters with the same cell width. The maximum
     * number of characters must be set to a positive value.
     */
    comb: boolean;

    /** The maximum number of characters in the text field. */
    maxCharacters: number;

    /**
     * The cell width for each character measured in millimeters. If this parameter is not specified or
     * equal to 0 or less, then the width will be set automatically.
     */
    cellWidth: number;

    /** Specifies if the current fixed size text field is multiline or not. */
    multiLine: boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     */
    autoFit: boolean;
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
   * **"nextTo"** - sets the position of the selected tick labels next to the main label.
   * **"low"** - sets the position of the selected tick labels in the part of the chart with lower
   * values.
   * **"high"** - sets the position of the selected tick labels in the part of the chart with higher
   * values.
   *
   * @example
   * ```js
   * chart.SetVertAxisTickLabelPosition("nextTo");
   * ```
   */
  export type TickLabelPosition = "none" | "nextTo" | "low" | "high";

  /**
   * The type of tick mark appearance.
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

  /**
   * Base class
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/
   */
  export interface Api {
    /**
     * Converts a document to Markdown or HTML text.
     *
     * @param convertType - Conversion type.
     * @param htmlHeadings - Defines if the HTML headings and IDs will be generated when the Markdown renderer of your target
     *   platform does not handle Markdown-style IDs.
     * @param base64img - Defines if the images will be created in the base64 format.
     * @param demoteHeadings - Defines if all heading levels in your document will be demoted to conform with the following
     *   standard: single H1 as title, H2 as top-level heading in the text body.
     * @param renderHTMLTags - Defines if HTML tags will be preserved in your Markdown. If you just want to use an occasional
     *   HTML tag, you can avoid using the opening angle bracket in the following way: \<tag>text\</tag>.
     *   By default, the opening angle brackets will be replaced with the special characters.
     */
    ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;

    /**
     * Creates a checkbox / radio button with the specified checkbox / radio button properties.
     *
     * @param formPr - Checkbox / radio button properties.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateCheckBoxForm/
     */
    CreateCheckBoxForm(formPr: CheckBoxFormPr): ApiCheckBoxForm;

    /**
     * Creates a combo box / dropdown list with the specified combo box / dropdown list properties.
     *
     * @param formPr - Combo box / dropdown list properties.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComboBoxForm/
     */
    CreateComboBoxForm(formPr: ComboBoxFormPr): ApiComboBoxForm;

    /**
     * Creates a complex form with the specified complex form properties.
     *
     * @param formPr - Complex form properties.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateComplexForm/
     */
    CreateComplexForm(formPr: FormPrBase): ApiComplexForm;

    /**
     * Creates a date form with the specified date form properties.
     *
     * @param formPr - Date form properties.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateDateForm/
     */
    CreateDateForm(formPr: DateFormPr): ApiDateForm;

    /**
     * Creates a picture form with the specified picture form properties.
     *
     * @param formPr - Picture form properties.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreatePictureForm/
     */
    CreatePictureForm(formPr: PictureFormPr): ApiPictureForm;

    /**
     * Creates a signature form with the specified form properties.
     *
     * @param formPr - Signature form properties.
     * @since 9.4.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateSignatureForm/
     */
    CreateSignatureForm(formPr: FormPrBase): ApiSignatureForm;

    /**
     * Creates a text field with the specified text field properties.
     *
     * @param formPr - Text field properties.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/Api/Methods/CreateTextForm/
     */
    CreateTextForm(formPr: TextFormPr): ApiTextForm;

    /**
     * Replaces each paragraph (or text in cell) in the select with the corresponding text from an array of
     * strings.
     *
     * @param textStrings - An array of replacement strings.
     * @param tab - A character which is used to specify the tab in the source text.
     * @param newLine - A character which is used to specify the line break character in the source text.
     */
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
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns the choice name of the current radio button.
     *
     * @since 8.3.2
     */
    GetChoiceName(): string;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "checkBoxForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns the choice name of the currently selected radio button in the group.
     * Returns an empty string if the current form is not a radio button or nothing is selected.
     *
     * @since 9.4.0
     */
    GetGroupValue(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the label of the current check box.
     *
     * @since 9.2.0
     */
    GetLabel(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the radio group key if the current checkbox is a radio button.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Radio group name of the radio buttons in this document: " + radioGroup);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/GetRadioGroup/
     */
    GetRadioGroup(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current state of the checkbox form as a boolean value.
     *
     * @since 9.4.0
     */
    GetValue(): boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Returns the state of the current checkbox (checked or not).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * checkBoxForm.SetChecked(true);
     * let checked = checkBoxForm.IsChecked();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second radio button from this document is checked: " + checked);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/IsChecked/
     */
    IsChecked(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current checkbox is a radio button.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioButton = checkBoxForm.IsRadioButton();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The second form from this document is a radio button: " + radioButton);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/IsRadioButton/
     */
    IsRadioButton(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Checks the current checkbox.
     *
     * @param isChecked - Specifies if the current checkbox will be checked (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"key": "Marital status", "tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * checkBoxForm.SetChecked(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetChecked/
     */
    SetChecked(isChecked: boolean): boolean;

    /**
     * Sets the choice name for the current radio button.
     *
     * @param choiceName - The radio button choice name.
     * @since 8.3.2
     */
    SetChoiceName(choiceName: string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Selects the radio button with the specified choice name in the group.
     *
     * @param value - The choice name of the radio button to select.
     * @since 9.4.0
     */
    SetGroupValue(value: string): boolean;

    /**
     * Sets the label for the current check box.
     *
     * @param label - The label.
     * @since 9.2.0
     */
    SetLabel(label: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Sets the radio group key to the current radio button.
     *
     * @param sKey - Radio group key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Married");
     * paragraph.AddLineBreak();
     * checkBoxForm = Api.CreateCheckBoxForm({"tip": "Specify your marital status", "required": true, "placeholder": "Marital status", "radio": true});
     * checkBoxForm.SetRadioGroup("Marital status");
     * paragraph.AddElement(checkBoxForm);
     * paragraph.AddText(" Single");
     * let radioGroup = checkBoxForm.GetRadioGroup();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Radio group name of the radio buttons in this document: " + radioGroup);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiCheckBoxForm/Methods/SetRadioGroup/
     */
    SetRadioGroup(sKey: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the state of the checkbox form.
     *
     * @param value - Specifies if the checkbox will be checked (true) or not (false).
     * @since 9.4.0
     */
    SetValue(value: boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Represents a color that can be applied to text. */
  export interface ApiColor {
  }

  /** Class representing a document combo box / dropdown list. */
  export interface ApiComboBoxForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "comboBoxForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the list values from the current combo box.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["Latvia", "USA", "UK"]);
     * let listValues = comboBoxForm.GetListValues();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Combo box list values: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < listValues.length; i++ ){
     * 	paragraph.AddText(listValues[i]);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/GetListValues/
     */
    GetListValues(): string[];

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the combo box form.
     *
     * @since 9.4.0
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the combo box text can be edited. If it is not editable, then this form is a dropdown
     * list.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let editable = comboBoxForm.IsEditable();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first combo box from this document is editable: " + editable);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/IsEditable/
     */
    IsEditable(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Selects the specified value from the combo box list values.
     *
     * @param sValue - The combo box list value that will be selected.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SelectListValue("USA");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SelectListValue/
     */
    SelectListValue(sValue: string): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the list values to the current combo box.
     *
     * @param aListString - The combo box list values.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetListValues(["Latvia", "USA", "UK"]);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SetListValues/
     */
    SetListValues(aListString: string[]): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current combo box.
     * Available only for editable combo box forms.*
     *
     * @param sText - The combo box text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": true, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * comboBoxForm.SetText("France");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiComboBoxForm/Methods/SetText/
     */
    SetText(sText: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the combo box form. Selects a list item if the value matches one,
     * otherwise sets it as free text (only for editable combo boxes).
     *
     * @param value - The value to set.
     * @since 9.4.0
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
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
    /**
     * Appends the text content of the given form to the end of the current complex form.
     *
     * @param value - The text or the form to add.
     * @since 9.0.0
     */
    Add(value: string | ApiDateForm | ApiPictureForm | ApiCheckBoxForm | ApiComboBoxForm | ApiTextForm): boolean;

    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Clears all content from the current complex form, resetting it to its placeholder state.
     *
     * @since 9.0.0
     */
    ClearContent(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns an ordered list of subforms.
     *
     * @since 9.0.0
     */
    GetSubForms(): ApiForm[];

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the complex form.
     *
     * @since 9.4.0
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
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

  /**
   * Class representing a custom XML node.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlNode {
  }

  /**
   * Class representing a custom XML part.
   *
   * @since 9.0.0
   */
  export interface ApiCustomXmlPart {
  }

  /**
   * Class representing a custom XML manager, which provides methods to manage custom XML parts in the
   * document.
   */
  export interface ApiCustomXmlParts {
  }

  /** Class representing a document date field. */
  export interface ApiDateForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "dateForm";

    /**
     * Returns the date of the current form.
     *
     * @returns The date object, or undefined if the form is a placeholder.
     * @since 9.0.0
     */
    GetDate(): undefined | Date;

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Gets the date format of the current form.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetFormat("dddd, dd MMMM yyyy");
     * let format = dateForm.GetFormat();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has format: " + format);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetFormat/
     */
    GetFormat(): string;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Gets the used date language of the current form.
     *
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetLanguage("en-CA");
     * let langId = dateForm.GetLanguage();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted language: " + langId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetLanguage/
     */
    GetLanguage(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the timestamp of the current form.
     *
     * @returns The Unix timestamp in milliseconds, or undefined if the form is a placeholder.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetTime(new Date().getTime());
     * let timeStamp = dateForm.GetTime();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + new Date(timeStamp));
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/GetTime/
     */
    GetTime(): undefined | number;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the date of the current form.
     *
     * @since 9.4.0
     */
    GetValue(): Date | undefined;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the date to the current form.
     *
     * @param date - The date object or the date in the string format.
     * @since 9.0.0
     */
    SetDate(date: Date | string): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the date format to the current form.
     *
     * @param sFormat - The date format. For example, mm.dd.yyyy
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetFormat("dddd, dd MMMM yyyy");
     * let format = dateForm.GetFormat();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has format: " + format);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetFormat/
     */
    SetFormat(sFormat: string): boolean;

    /**
     * Sets the date language to the current form.
     *
     * @param sLangId - The date language. The possible value for this parameter is a language identifier as defined in
     *   RFC 4646/BCP 47. Example: "en-CA".
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetLanguage("en-CA");
     * let langId = dateForm.GetLanguage();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted language: " + langId);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetLanguage/
     */
    SetLanguage(sLangId: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the timestamp to the current form.
     *
     * @param nTimeStamp - The timestamp that will be set to the current date form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let dateForm = Api.CreateDateForm({"key": "Nowadays", "tip": "Enter current date", "required": true, "placeholder": "Your date here", "format": "mm.dd.yyyy", "lang": "en-US"});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(dateForm);
     * dateForm.SetTime(new Date().getTime());
     * let timeStamp = dateForm.GetTime();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first date form from this document has setted time: " + new Date(timeStamp));
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDateForm/Methods/SetTime/
     */
    SetTime(nTimeStamp: number): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the date of the current form.
     *
     * @param value - The date object or the date in the string format.
     * @since 9.4.0
     */
    SetValue(value: Date | string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a document.
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/
   */
  export interface ApiDocument extends ApiDocumentContent {
    /** Clears all forms in the document. */
    ClearAllFields(): boolean;

    /** Returns all existing forms in the document. */
    GetAllForms(): ApiForm[];

    /**
     * Returns a list of all form keys attached to the specified role.
     *
     * @param role - The form role.
     * @returns A list of all form keys attached to the specified role.
     * @since 9.0.0
     */
    GetFormKeysByRole(role: string): string[];

    /**
     * Returns a collection of form roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/GetFormRoles/
     */
    GetFormRoles(): ApiFormRoles;

    /**
     * Returns the form value for the specified key. For a group of radio buttons returns Choice, i.e. the
     * name of the selected item.
     *
     * @param key - The form key.
     * @returns Returns true/false for checkboxes and string for other form types. Returns null if there is no
     *   form with the specified key.
     * @since 9.0.0
     */
    GetFormValueByKey(key: string): null | boolean | string;

    /**
     * Returns a list of all forms in the document with the specified key.
     *
     * @param key - The form key.
     * @since 9.0.0
     */
    GetFormsByKey(key: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified role name.
     *
     * @param role - The form role.
     * @since 9.0.0
     */
    GetFormsByRole(role: string): ApiForm[];

    /**
     * Returns a list of all forms in the document with the specified tag name.
     *
     * @param sTag - Form tag.
     */
    GetFormsByTag(sTag: string): ApiForm[];

    /**
     * Returns the data from all forms present in the current document.
     * If a form was created and not assigned to any part of the document, it won't appear in this list.
     *
     * @since 8.0.0
     */
    GetFormsData(): FormData[];

    /**
     * Returns the highlight color of the forms in the document.
     *
     * @returns Returns the highlight color, or _null_ if the highlight is disabled.
     * @since 9.4.0
     */
    GetFormsHighlight(): ApiColor | null;

    /** Returns a list of all tags that are used for all forms in the document. */
    GetTagsOfAllForms(): string[];

    /**
     * Inserts a text box with the specified text box properties over the selected text.
     *
     * @param formPr - Properties for inserting a text field.
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiDocument/Methods/InsertTextForm/
     */
    InsertTextForm(formPr: TextFormInsertPr): ApiTextForm;

    /**
     * Sets the data to the specified forms.
     *
     * @param arrData - An array of form data to set to the specified forms.
     * @since 8.0.0
     */
    SetFormsData(arrData: FormData[]): boolean;

    /**
     * Sets the highlight to the forms in the document.
     *
     * @param color - The highlight color for the forms.
     * @since 9.1.0
     */
    SetFormsHighlight(color: ApiColor): boolean;
  }

  /** Class representing a container for paragraphs and tables. */
  export interface ApiDocumentContent {
  }

  /** Class representing a graphical object. */
  export interface ApiDrawing {
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
  }

  /** Class representing a document form base. */
  export interface ApiFormBase {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "form";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current value of the form field.
     *
     * @since 9.4.0
     */
    GetValue(): string | boolean;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the value of the form field.
     *
     * @param value - The value to set.
     * @since 9.4.0
     */
    SetValue(value: string | boolean): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /**
   * Class representing a collection of form roles.
   *
   * @since 9.0.0
   *
   * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/
   */
  export interface ApiFormRoles {
    /**
     * Adds a new form role.
     *
     * @param name - The name of role being added.
     * @param props - The role properties.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Add/
     */
    Add(name: string, props: RoleProperties): boolean;

    /**
     * Lists all available roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetAllRoles/
     */
    GetAllRoles(): string[];

    /**
     * Returns a number of form roles.
     *
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetCount/
     */
    GetCount(): number;

    /**
     * Returns the RGB color of the specified role.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/GetRoleColor/
     */
    GetRoleColor(name: string): null | object;

    /**
     * Checks if a role with the specified name exists.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/HaveRole/
     */
    HaveRole(name: string): boolean;

    /**
     * Moves a role down in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveDown/
     */
    MoveDown(name: string): boolean;

    /**
     * Moves a role up in filling order.
     *
     * @param name - The role name.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/MoveUp/
     */
    MoveUp(name: string): boolean;

    /**
     * Removes a role with the specified name.
     *
     * @param name - The name of role to be removed.
     * @param delegateRole - The name of the role to which all forms bound to this role will be delegated.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/Remove/
     */
    Remove(name: string, delegateRole?: string): boolean;

    /**
     * Sets the color for the specified role.
     *
     * @param name - The role name.
     * @param color - The role color.
     * @since 9.0.0
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/form-api/ApiFormRoles/Methods/SetRoleColor/
     */
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
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "pictureForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /**
     * Returns an image in the base64 format from the current picture form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
     * let base64img = pictureForm.GetImage();
     * let drawing = Api.CreateImage(base64img, 60 * 36000, 35 * 36000);
     * paragraph.AddDrawing(drawing);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetImage/
     */
    GetImage(): Base64Img;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the picture position inside the current form.
     *
     * @returns Array of two numbers [shiftX, shiftY]
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetPicturePosition(70, 70);
     * let position = pictureForm.GetPicturePosition();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture position: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < position.length; i++ ){
     * 	let shift = position[i];
     * 	paragraph.AddText("" + shift);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetPicturePosition/
     */
    GetPicturePosition(): percentage[];

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the current scaling condition of the picture form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * let scaleFlag = pictureForm.GetScaleFlag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture scale flag: " + scaleFlag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/GetScaleFlag/
     */
    GetScaleFlag(): ScaleFlag;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current image of the picture form as a base64 encoded string.
     *
     * @since 9.4.0
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the aspect ratio of the current picture form is locked or not.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetLockAspectRatio(true);
     * let lock = pictureForm.IsLockAspectRatio();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The aspect ratio of the first picture form in this document is locked: " + lock);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/IsLockAspectRatio/
     */
    IsLockAspectRatio(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Checks if the form border width is respected or not.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetRespectBorders(true);
     * let respectBorders = pictureForm.IsRespectBorders();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The borders of the first picture form in this document are respected when scaling the image: " + respectBorders);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/IsRespectBorders/
     */
    IsRespectBorders(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets an image to the current picture form.
     *
     * @param imageSrc - The image source where the image to be inserted should be taken from (currently, only internet
     *   URL or base64 encoded images are supported).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetImage/
     */
    SetImage(imageSrc: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Locks the aspect ratio of the current picture form.
     *
     * @param isLock - Specifies if the aspect ratio of the current picture form will be locked (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetLockAspectRatio(true);
     * let lock = pictureForm.IsLockAspectRatio();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The aspect ratio of the first picture form in this document is locked: " + lock);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetLockAspectRatio/
     */
    SetLockAspectRatio(isLock?: boolean): boolean;

    /**
     * Sets the picture position inside the current form:
     * **0** - the picture is placed on the left/top;
     * **50** - the picture is placed in the center;
     * **100** - the picture is placed on the right/bottom.
     *
     * @param nShiftX - Horizontal position measured in percent.
     * @param nShiftY - Vertical position measured in percent.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "respectBorders": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetPicturePosition(70, 70);
     * let position = pictureForm.GetPicturePosition();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture position: ");
     * paragraph.AddLineBreak();
     * for (let i = 0; i < position.length; i++ ){
     * 	let shift = position[i];
     * 	paragraph.AddText("" + shift);
     * 	paragraph.AddLineBreak();
     * }
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetPicturePosition/
     */
    SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Respects the form border width when scaling the image.
     *
     * @param isRespect - Specifies if the form border width will be respected (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "scaleFlag": "tooBig", "lockAspectRatio": true, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetRespectBorders(true);
     * let respectBorders = pictureForm.IsRespectBorders();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The borders of the first picture form in this document are respected when scaling the image: " + respectBorders);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetRespectBorders/
     */
    SetRespectBorders(isRespect?: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the scaling condition to the current picture form.
     *
     * @param sScaleFlag - Picture scaling condition: "always", "never", "tooBig" or "tooSmall".
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let pictureForm = Api.CreatePictureForm({"key": "Personal information", "tip": "Upload your photo", "required": true, "placeholder": "Photo", "lockAspectRatio": true, "respectBorders": false, "shiftX": 50, "shiftY": 50});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(pictureForm);
     * pictureForm.SetImage("https://api.onlyoffice.com/content/img/docbuilder/examples/user-profile.png");
     * pictureForm.SetScaleFlag("tooBig");
     * let scaleFlag = pictureForm.GetScaleFlag();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Picture scale flag: " + scaleFlag);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiPictureForm/Methods/SetScaleFlag/
     */
    SetScaleFlag(sScaleFlag: ScaleFlag): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the picture form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
    ToInline(): boolean;
  }

  /** Class representing a Preset Color. */
  export interface ApiPresetColor extends ApiUniColor {
  }

  /** Class representing an RGB Color. */
  export interface ApiRGBColor extends ApiUniColor {
  }

  /**
   * Class representing a continuous region in a document.
   * Each Range object is determined by the position of the start and end characters.
   */
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
    /** Clears the current form. */
    Clear(): boolean;

    /** Copies the current form (copies with the shape if it exists). */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a type of the ApiSignatureForm class.
     *
     * @since 9.4.0
     */
    GetClassType(): "signatureForm";

    /** Returns the current form key. */
    GetFormKey(): string;

    /** Returns a type of the current form. */
    GetFormType(): FormType;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /** Returns the text from the current form. */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * *Used if possible for this type of form*
     */
    GetTextPr(): ApiTextPr;

    /** Returns the tip text of the current form. */
    GetTipText(): string;

    /**
     * Returns the current image of the signature form as a base64 encoded string.
     *
     * @since 9.4.0
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /** Checks if the current form is fixed size. */
    IsFixed(): boolean;

    /** Checks if the current form is required. */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * *Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text properties to the current form.
     * *Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets an image to the signature form.
     *
     * @param value - The image source (URL or base64 encoded image).
     * @since 9.4.0
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * *Picture form can't be converted to an inline form, it's always a fixed size object.*
     */
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

  /**
   * Class representing a set of formatting properties which shall be conditionally applied to the parts
   * of a table
   * which match the requirement specified on the `Type`.
   */
  export interface ApiTableStylePr {
  }

  /** Class representing a document text field. */
  export interface ApiTextForm extends Omit<ApiFormBase, "GetClassType" | "GetInternalId" | "GetFormType" | "GetFormKey" | "SetFormKey" | "GetTipText" | "SetTipText" | "IsRequired" | "SetRequired" | "IsFixed" | "ToFixed" | "ToInline" | "SetBorderColor" | "GetBorderColor" | "SetBackgroundColor" | "GetBackgroundColor" | "GetText" | "IsFilled" | "Clear" | "GetWrapperShape" | "SetPlaceholderText" | "GetPlaceholderText" | "SetTextPr" | "GetTextPr" | "MoveCursorOutside" | "Copy" | "GetTag" | "SetTag" | "GetRole" | "SetRole" | "Delete" | "SetLock" | "GetLock" | "GetValue" | "SetValue"> {
    /**
     * Clears the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * textForm.Clear();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document was cleared.");
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Clear/
     */
    Clear(): boolean;

    /**
     * Copies the current form (copies with the shape if it exists).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let copyTextForm = textForm.Copy();
     * paragraph.AddLineBreak();
     * paragraph.AddElement(copyTextForm);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/Copy/
     */
    Copy(): ApiForm;

    /**
     * Removes a form and its content. If keepContent is true, the content is not deleted.
     *
     * @param keepContent - Specifies if the content will be deleted or not.
     * @returns returns false if form wasn't added to the document.
     * @since 9.2.0
     */
    Delete(keepContent: boolean): boolean;

    /** Returns the allowed symbols for the current text field. */
    GetAllowedSymbols(): string;

    /**
     * Returns the background color of the current form.
     *
     * @since 9.1.0
     */
    GetBackgroundColor(): ApiColor;

    /**
     * Returns the border color of the current form.
     *
     * @since 9.1.0
     */
    GetBorderColor(): ApiColor;

    /**
     * Returns a limit of the text field characters.
     *
     * @returns if this method returns -1 -> the form has no limit for characters
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetCharactersLimit(5);
     * textForm.SetText("John Smith");
     * let limit = textForm.GetCharactersLimit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Characters limit: " + limit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/GetCharactersLimit/
     */
    GetCharactersLimit(): number;

    /**
     * Returns a type of the ApiFormBase class.
     *
     * @since 9.0.4
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let classType = textForm.GetClassType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Class type: " + classType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetClassType/
     */
    GetClassType(): "textForm";

    /**
     * Returns the current form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let key = comboBoxForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormKey/
     */
    GetFormKey(): string;

    /**
     * Returns a type of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let formType = textForm.GetFormType();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form type: " + formType);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetFormType/
     */
    GetFormType(): FormType;

    /** Returns the format of the current text field. */
    GetFormat(): TextFormFormat;

    /**
     * Returns an internal id of the current form.
     *
     * @since 9.2.0
     */
    GetInternalId(): string;

    /**
     * Returns the lock state of the current form.
     *
     * @since 9.3.0
     */
    GetLock(): boolean;

    /**
     * Returns the placeholder text from the current form.
     *
     * @since 9.1.0
     */
    GetPlaceholderText(): string;

    /**
     * Returns the role of the current form.
     *
     * @since 9.0.0
     */
    GetRole(): string;

    /**
     * Returns the tag attribute for the current form.
     *
     * @since 9.0.0
     */
    GetTag(): string;

    /**
     * Returns the text from the current form.
     * Returns the value as a string if possible for the given form type*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let text = textForm.GetText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form text: " + text);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetText/
     */
    GetText(): string;

    /**
     * Returns the text properties from the current form.
     * Used if possible for this type of form*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * let formTextPr = textForm.GetTextPr();
     * formTextPr.SetItalic(true);
     * textForm.SetTextPr(formTextPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTextPr/
     */
    GetTextPr(): ApiTextPr;

    /**
     * Returns the tip text of the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let comboBoxForm = Api.CreateComboBoxForm({"key": "Personal information", "tip": "Choose your country", "required": true, "placeholder": "Country", "editable": false, "autoFit": false, "items": ["Latvia", "USA", "UK"]});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(comboBoxForm);
     * let tipText = comboBoxForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetTipText/
     */
    GetTipText(): string;

    /**
     * Returns the current text value of the text form.
     *
     * @since 9.4.0
     */
    GetValue(): string;

    /**
     * Returns a shape in which the form is placed to control the position and size of the fixed size form
     * frame.
     * The null value will be returned for the inline forms.
     *
     * @returns returns the shape in which the form is placed.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let shape = textForm.GetWrapperShape();
     * let stroke = Api.CreateStroke(36000, Api.CreateSolidFill(Api.CreateRGBColor(255, 111, 61)));
     * shape.SetOutLine(stroke);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/GetWrapperShape/
     */
    GetWrapperShape(): ApiShape;

    /**
     * Checks if the text field content is autofit, i.e. whether the font size adjusts to the size of the
     * fixed size form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let autoFit = textForm.IsAutoFit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is autofit: " + autoFit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsAutoFit/
     */
    IsAutoFit(): boolean;

    /**
     * Checks if the text field is a comb of characters with the same cell width.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * let comb = textForm.IsComb();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is comb: " + comb);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsComb/
     */
    IsComb(): boolean;

    /**
     * Checks if the current form is filled.
     *
     * @since 9.4.0
     */
    IsFilled(): boolean;

    /**
     * Checks if the current form is fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is fixed: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsFixed/
     */
    IsFixed(): boolean;

    /**
     * Checks if the current text field is multiline.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let multiline = textForm.IsMultiline();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is multiline: " + multiline);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/IsMultiline/
     */
    IsMultiline(): boolean;

    /**
     * Checks if the current form is required.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/IsRequired/
     */
    IsRequired(): boolean;

    /**
     * Places a cursor before/after the current form.
     *
     * @param isAfter - Specifies whether a cursor will be placed before (false) or after (true) the current form.
     * @since 8.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("The cursor will be placed after the current form.");
     * textForm.MoveCursorOutside(true);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/MoveCursorOutside/
     */
    MoveCursorOutside(isAfter?: boolean): boolean;

    /**
     * Sets the allowed symbols for the current text field. Only the specified characters will be accepted
     * as input.
     *
     * @param symbols - A string of allowed characters.
     */
    SetAllowedSymbols(symbols: string): boolean;

    /**
     * Specifies if the text field content should be autofit, i.e. whether the font size adjusts to the
     * size of the fixed size form.
     *
     * @param bAutoFit - Defines if the text field content is autofit (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "multiLine": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(6 * 240, 2 * 240);
     * textForm.SetAutoFit(true);
     * let autoFit = textForm.IsAutoFit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is autofit: " + autoFit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetAutoFit/
     */
    SetAutoFit(bAutoFit: boolean): boolean;

    /**
     * Sets the background color to the current form.
     *
     * @param color - The background color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBackgroundColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBackgroundColor/
     */
    SetBackgroundColor(color?: ApiColor): boolean;

    /**
     * Sets the border color to the current form.
     *
     * @param color - The border color.
     * @since 9.1.0
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetBorderColor(255, 111, 61);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetBorderColor/
     */
    SetBorderColor(color?: ApiColor): boolean;

    /**
     * Sets the cell width to the applied comb of characters.
     *
     * @param nCellWidth - The cell width measured in millimeters.
     *   If this parameter is not specified or equal to 0 or less, then the width will be set
     *   automatically. Must be >= 1 and <= 558.8.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * textForm.SetCellWidth(7);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetCellWidth/
     */
    SetCellWidth(nCellWidth?: number): boolean;

    /**
     * Sets a limit to the text field characters.
     *
     * @param nChars - The maximum number of characters in the text field. If this parameter is equal to -1, no limit
     *   will be set.
     *   A limit is required to be set if a comb of characters is applied.
     *   Maximum value for this parameter is 1000000.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetCharactersLimit(5);
     * textForm.SetText("John Smith");
     * let limit = textForm.GetCharactersLimit();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Characters limit: " + limit);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetCharactersLimit/
     */
    SetCharactersLimit(nChars: number): boolean;

    /**
     * Specifies if the text field should be a comb of characters with the same cell width.
     * The maximum number of characters must be set to a positive value.
     *
     * @param bComb - Defines if the text field is a comb of characters (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "maxCharacters": 10, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetComb(true);
     * let comb = textForm.IsComb();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is comb: " + comb);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetComb/
     */
    SetComb(bComb: boolean): boolean;

    /**
     * Sets a key to the current form.
     *
     * @param sKey - Form key.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetFormKey("Personal information");
     * let key = textForm.GetFormKey();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Form key: " + key);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetFormKey/
     */
    SetFormKey(sKey: string): boolean;

    /**
     * Sets the format for the current text field.
     *
     * @param format - The format to set.
     */
    SetFormat(format: TextFormFormat): boolean;

    /**
     * Sets the lock state of the current form.
     *
     * @param isLock - Specifies whether to lock the form (true) or unlock it (false).
     * @returns Returns true if the operation is successful.
     * @since 9.3.0
     */
    SetLock(isLock: boolean): boolean;

    /**
     * Specifies if the current text field should be miltiline.
     *
     * @param bMultiline - Defines if the current text field is multiline (true) or not (false).
     * @returns return false, if the text field is not fixed size.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(3 * 240, 3 * 240);
     * textForm.SetMultiline(true);
     * let multiline = textForm.IsMultiline();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first text form from this document is multiline: " + multiline);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetMultiline/
     */
    SetMultiline(bMultiline: boolean): boolean;

    /**
     * Sets the placeholder text to the current form.
     * Can't be set to checkbox or radio button.*
     *
     * @param sText - The text that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetPlaceholderText("First name");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetPlaceholderText/
     */
    SetPlaceholderText(sText: string): boolean;

    /**
     * Specifies if the current form should be required.
     *
     * @param bRequired - Defines if the current form is required (true) or not (false).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetRequired(true);
     * let required = textForm.IsRequired();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document is required: " + required);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetRequired/
     */
    SetRequired(bRequired: boolean): boolean;

    /**
     * Sets the role to the current form.
     *
     * @param role - The role which will be attached to the current form.
     * @since 9.0.0
     */
    SetRole(role: string): boolean;

    /**
     * Sets the tag attribute to the current form.
     *
     * @param tag - The tag which will be added to the current container.
     * @since 9.0.0
     */
    SetTag(tag: string): boolean;

    /**
     * Sets the text to the current text field.
     *
     * @param text - The text that will be set to the current text field.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetText("John Smith");
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiTextForm/Methods/SetText/
     */
    SetText(text: string): boolean;

    /**
     * Sets the text properties to the current form.
     * Used if possible for this type of form*
     *
     * @param textPr - The text properties that will be set to the current form.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * let textPr = Api.CreateTextPr();
     * textPr.SetFontSize(30);
     * textPr.SetBold(true);
     * textForm.SetTextPr(textPr);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTextPr/
     */
    SetTextPr(textPr: ApiTextPr): boolean;

    /**
     * Sets the tip text to the current form.
     *
     * @param sText - Tip text.
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.SetTipText("Enter your first name");
     * let tipText = textForm.GetTipText();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("Tip text: " + tipText);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/SetTipText/
     */
    SetTipText(sText: string): boolean;

    /**
     * Sets the text value of the text form.
     *
     * @param value - The text value to set.
     * @since 9.4.0
     */
    SetValue(value: string): boolean;

    /**
     * Converts the current form to a fixed size form.
     *
     * @param width - The wrapper shape width measured in twentieths of a point (1/1440 of an inch).
     * @param height - The wrapper shape height measured in twentieths of a point (1/1440 of an inch).
     * @param keepPosition - Save position on the page (it can be a little bit slow, because it runs the document
     *   calculation).
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let fixed = textForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToFixed/
     */
    ToFixed(width: number, height: number, keepPosition: boolean): boolean;

    /**
     * Converts the current form to an inline form.
     * Picture form can't be converted to an inline form, it's always a fixed size object.*
     *
     * @example
     * ```js
     * let doc = Api.GetDocument();
     * let textForm = Api.CreateTextForm({"key": "Personal information", "tip": "Enter your first name", "required": true, "placeholder": "First name", "comb": true, "maxCharacters": 10, "cellWidth": 3, "multiLine": false, "autoFit": false});
     * let paragraph = doc.GetElement(0);
     * paragraph.AddElement(textForm);
     * textForm.ToFixed(10 * 240, 2 * 240);
     * let copyForm = textForm.Copy();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddElement(copyForm);
     * doc.Push(paragraph);
     * copyForm.ToInline();
     * let fixed = textForm.IsFixed();
     * let fixedCopy = copyForm.IsFixed();
     * paragraph = Api.CreateParagraph();
     * paragraph.AddText("The first form from this document has a fixed size: " + fixed);
     * paragraph.AddLineBreak();
     * paragraph.AddText("The second form from this document has a fixed size: " + fixedCopy);
     * doc.Push(paragraph);
     * ```
     *
     * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiFormBase/Methods/ToInline/
     */
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
