/**
 * Base class
 * @global
 * @class
 * @name ApiInterface
 */
var ApiInterface = function() {};
var Api = new ApiInterface();

/**
 * Class representing a container for paragraphs and tables.
 * @param Document
 * @constructor
 */
function ApiDocumentContent(Document){}

/**
 * Get a paragraph from all the paragraphs that are in the range.
 * @param {Number} nPos - The paragraph position in the range.
 * @returns {ApiParagraph | null} - returns null if position is invalid.
 */
ApiRange.prototype.GetParagraph = function(nPos){ return new ApiParagraph(); };

/**
 * Class representing a document.
 * @constructor
 * @extends {ApiDocumentContent}
 */
function ApiDocument(Document){}
ApiDocument.prototype = Object.create(ApiDocumentContent.prototype);
ApiDocument.prototype.constructor = ApiDocument;

/**
 * Class representing the paragraph properties.
 * @constructor
 */
function ApiParaPr(Parent, ParaPr){}

/**
 * Class representing a paragraph bullet.
 * @constructor
 */
function ApiBullet(Bullet){}

/**
 * Class representing a paragraph.
 * @constructor
 * @extends {ApiParaPr}
 */
function ApiParagraph(Paragraph){}
ApiParagraph.prototype = Object.create(ApiParaPr.prototype);
ApiParagraph.prototype.constructor = ApiParagraph;

/**
 * Class representing the table properties.
 * @constructor
 */
function ApiTablePr(Parent, TablePr){}

/**
 * Class representing the text properties.
 * @constructor
 */
function ApiTextPr(Parent, TextPr){}

/**
 * Class representing a small text block called 'run'.
 * @constructor
 * @extends {ApiTextPr}
 */
function ApiRun(Run){}
ApiRun.prototype = Object.create(ApiTextPr.prototype);
ApiRun.prototype.constructor = ApiRun;

/**
 * Class representing a Paragraph hyperlink.
 * @constructor
 */
function ApiHyperlink(ParaHyperlink){}
ApiHyperlink.prototype.constructor = ApiHyperlink;

/**
 * Get the hyperlink element using the position specified.
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position where the element which content we want to get must be located.
 * @returns {ParagraphContent}
 */
ApiHyperlink.prototype.GetElement = function(nPos){ return new ParagraphContent(); };

/**
 * Get the number of elements in the current hyperlink.
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {number}
 */
ApiHyperlink.prototype.GetElementsCount = function(){ return 0; };

/**
 * Class representing a style.
 * @constructor
 */
function ApiStyle(Style){}

/**
 * Class representing a document section.
 * @constructor
 */
function ApiSection(Section){}

/**
 * Class representing the table row properties.
 * @constructor
 */
function ApiTableRowPr(Parent, RowPr){}

/**
 * Class representing the table cell properties.
 * @constructor
 */
function ApiTableCellPr(Parent, CellPr){}

/**
 * Class representing the numbering properties.
 * @constructor
 */
function ApiNumbering(Num){}

/**
 * Class representing a reference to a specified level of the numbering.
 * @constructor
 */
function ApiNumberingLevel(Num, Lvl){}

/**
 * Class representing a set of formatting properties which shall be conditionally applied to the parts of a table
 * which match the requirement specified on the <code>Type</code>.
 * @constructor
 */
function ApiTableStylePr(Type, Parent, TableStylePr){}

/**
 * Class representing an unsupported element.
 * @constructor
 */
function ApiUnsupported(){}

/**
 * Class representing a base class for color types.
 * @constructor
 */
function ApiUniColor(Unicolor){}

/**
 * Class representing RGB Color.
 * @constructor
 */
function ApiRGBColor(r, g, b){}
ApiRGBColor.prototype = Object.create(ApiUniColor.prototype);
ApiRGBColor.prototype.constructor = ApiRGBColor;

/**
 * Class representing a Scheme Color.
 * @constructor
 */
function ApiSchemeColor(sColorId){}
ApiSchemeColor.prototype = Object.create(ApiUniColor.prototype);
ApiSchemeColor.prototype.constructor = ApiSchemeColor;

/**
 * Class representing a Preset Color.
 * @constructor
 * */
function ApiPresetColor(sPresetColor){}
ApiPresetColor.prototype = Object.create(ApiUniColor.prototype);
ApiPresetColor.prototype.constructor = ApiPresetColor;

/**
 * Class representing a base class fill.
 * @constructor
 * */
function ApiFill(UniFill){}

/**
 * Class representing a stroke.
 * @constructor
 */
function ApiStroke(oLn){}

/**
 * Class representing gradient stop.
 * @constructor
 * */
function ApiGradientStop(oApiUniColor, pos){}

/**
 * Class representing a container for the paragraph elements.
 * @constructor
 */
function ApiInlineLvlSdt(Sdt){}

/**
 * Class representing a container for the document content.
 * @constructor
 */
function ApiBlockLvlSdt(Sdt){}

/**
 * Twentieths of a point (equivalent to 1/1440th of an inch).
 * @typedef {number} twips
 */

/**
 * Any valid element which can be added to the document structure.
 * @typedef {(ApiParagraph | ApiTable | ApiBlockLvlSdt)} DocumentElement
 */

/**
 * The style type used for the document element.
 * @typedef {("paragraph" | "table" | "run" | "numbering")} StyleType
 */

/**
 * 240ths of a line.
 * @typedef {number} line240
 */

/**
 * Half-points (2 half-points = 1 point).
 * @typedef {number} hps
 */

/**
 * A numeric value from 0 to 255.
 * @typedef {number} byte
 */

/**
 * 60000th of a degree (5400000 = 90 degrees).
 * @typedef {number} PositiveFixedAngle
 * */

/**
 * A border type which will be added to the document element.
 * * **"none"** - no border will be added to the created element or the selected element side.
 * * **"single"** - a single border will be added to the created element or the selected element side.
 * @typedef {("none" | "single")} BorderType
 */

/**
 * A shade type which can be added to the document element.
 * @typedef {("nil" | "clear")} ShdType
 */

/**
 * Custom tab types.
 * @typedef {("clear" | "left" | "right" | "center")} TabJc
 */

/**
 * Eighths of a point (24 eighths of a point = 3 points).
 * @typedef {number} pt_8
 */

/**
 * A point.
 * @typedef {number} pt
 */

/**
 * Header and footer types which can be applied to the document sections.
 * * **"default"** - a header or footer which can be applied to any default page.
 * * **"title"** - a header or footer which is applied to the title page.
 * * **"even"** - a header or footer which can be applied to even pages to distinguish them from the odd ones (which will be considered default).
 * @typedef {("default" | "title" | "even")} HdrFtrType
 */

/**
 * The possible values for the units of the width property are defined by a specific table or table cell width property.
 * * **"auto"** - set the table or table cell width to auto width.
 * * **"twips"** - set the table or table cell width to be measured in twentieths of a point.
 * * **"nul"** - set the table or table cell width to be of a zero value.
 * * **"percent"** - set the table or table cell width to be measured in percent to the parent container.
 * @typedef {("auto" | "twips" | "nul" | "percent")} TableWidth
 */

/**
 * This simple type specifies possible values for the table sections to which the current conditional formatting properties will be applied when this selected table style is used.
 * * **"topLeftCell"** - specifies that the table formatting is applied to the top left cell.
 * * **"topRightCell"** - specifies that the table formatting is applied to the top right cell.
 * * **"bottomLeftCell"** - specifies that the table formatting is applied to the bottom left cell.
 * * **"bottomRightCell"** - specifies that the table formatting is applied to the bottom right cell.
 * * **"firstRow"** - specifies that the table formatting is applied to the first row.
 * * **"lastRow"** - specifies that the table formatting is applied to the last row.
 * * **"firstColumn"** - specifies that the table formatting is applied to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format.
 * * **"lastColumn"** - specifies that the table formatting is applied to the last column.
 * * **"bandedColumn"** - specifies that the table formatting is applied to odd numbered groupings of rows.
 * * **"bandedColumnEven"** - specifies that the table formatting is applied to even numbered groupings of rows.
 * * **"bandedRow"** - specifies that the table formatting is applied to odd numbered groupings of columns.
 * * **"bandedRowEven"** - specifies that the table formatting is applied to even numbered groupings of columns.
 * * **"wholeTable"** - specifies that the conditional formatting is applied to the whole table.
 * @typedef {("topLeftCell" | "topRightCell" | "bottomLeftCell" | "bottomRightCell" | "firstRow" | "lastRow" |
 *     "firstColumn" | "lastColumn" | "bandedColumn" | "bandedColumnEven" | "bandedRow" | "bandedRowEven" |
 *     "wholeTable")} TableStyleOverrideType
 */

/**
 * The types of elements that can be added to the paragraph structure.
 * @typedef {(ApiUnsupported | ApiRun | ApiInlineLvlSdt)} ParagraphContent
 */

/**
 * The possible values for the base which the relative horizontal positioning of an object will be calculated from.
 * @typedef {("character" | "column" | "leftMargin" | "rightMargin" | "margin" | "page")} RelFromH
 */

/**
 * The possible values for the base which the relative vertical positioning of an object will be calculated from.
 * @typedef {("bottomMargin" | "topMargin" | "margin" | "page" | "line" | "paragraph")} RelFromV
 */

/**
 * English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs.
 * @typedef {number} EMU
 */

/**
 * This type specifies the preset shape geometry that will be used for a shape.
 * @typedef {("accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" |
 *     "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" |
 *     "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" |
 *     "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" |
 *     "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" |
 *     "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" |
 *     "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" |
 *     "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" |
 *     "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" |
 *     "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" |
 *     "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout")} ShapeType
 */

/**
 * This type specifies the available chart types which can be used to create a new chart.
 * @typedef {("bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" |
 *     "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent"
 *     | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" |
 *     "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" |
 *     "area" | "areaStacked" | "areaStackedPercent")} ChartType
 */

/**
 * The available text vertical alignment (used to align text in a shape with a placement for text inside it).
 * @typedef {("top" | "center" | "bottom")} VerticalTextAlign
 * */

/**
 * The available color scheme identifiers.
 * @typedef {("accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2"
 *     | "lt1" | "lt2" | "tx1" | "tx2")} SchemeColorId
 * */

/**
 * The available preset color names.
 * @typedef {("aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" |
 *     "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate"
 *     | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" |
 *     "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" |
 *     "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" |
 *     "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" |
 *     "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" |
 *     "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" |
 *     "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" |
 *     "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" |
 *     "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen")} PresetColor
 * */

/**
 * Possible values for the position of chart tick labels (either horizontal or vertical).
 * * **"none"** - not display the selected tick labels.
 * * **"nextTo"** - set the position of the selected tick labels next to the main label.
 * * **"low"** - set the position of the selected tick labels in the part of the chart with lower values.
 * * **"high"** - set the position of the selected tick labels in the part of the chart with higher values.
 * @typedef {("none" | "nextTo" | "low" | "high")} TickLabelPosition
 * **/

/**
 * The type of a fill which uses an image as a background.
 * * **"tile"** - if the image is smaller than the shaped which is filled, the image will be tiled all over the created shape surface.
 * * **"stretch"** - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.
 * @typedef {"tile" | "stretch"} BlipFillType
 * */

/**
 * The available preset patterns which can be used for the fill.
 * @typedef {"cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot"
 *     | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" |
 *     "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert"
 *     | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" |
 *     "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" |
 *     "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag"}
 *     PatternType
 * */

/**
 *
 * @typedef {"unlocked" | "contentLocked" | "sdtContentLocked" | "sdtLocked"} SdtLock
 */

/**
 * The 1000th of a percent (100000 = 100%).
 * @typedef {number} PositivePercentage
 * */

/**
 * @typedef {("cross" | "in" | "none" | "out")} TickMark
 * */

/**
 * Create a new paragraph.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE"]
 * @returns {ApiParagraph}
 */
ApiInterface.prototype.CreateParagraph = function(){ return new ApiParagraph(); };

/**
 * Create a new smaller text block to be inserted to the current paragraph or table.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiInterface.prototype.CreateRun = function(){ return new ApiRun(); };

/**
 * Create an RGB color setting the appropriate values for the red, green and blue color components.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @returns {ApiRGBColor}
 */
ApiInterface.prototype.CreateRGBColor = function(r, g, b){ return new ApiRGBColor(); };

/**
 * Create a complex color scheme selecting from one of the available schemes.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {SchemeColorId} sSchemeColorId - The color scheme identifier.
 * @returns {ApiSchemeColor}
 */
ApiInterface.prototype.CreateSchemeColor = function(sSchemeColorId){ return new ApiSchemeColor(); };

/**
 * Create a color selecting it from one of the available color presets.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {PresetColor} sPresetColor - A preset selected from the list of the available color preset names.
 * @returns {ApiPresetColor};
 * */
ApiInterface.prototype.CreatePresetColor = function(sPresetColor){ return new ApiPresetColor(); };

/**
 * Create a solid fill to apply to the object using a selected solid color as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiUniColor} oUniColor - The color used for the element fill.
 * @returns {ApiFill}
 * */
ApiInterface.prototype.CreateSolidFill = function(oUniColor){ return new ApiFill(); };

/**
 * Create a linear gradient fill to apply to the object using a selected linear gradient as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {Array} aGradientStop - The array of gradient color stops measured in 1000th of percent.
 * @param {PositiveFixedAngle} Angle - The angle measured in 60000th of a degree that will define the gradient direction.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreateLinearGradientFill = function(aGradientStop, Angle){ return new ApiFill(); };

/**
 * Create a radial gradient fill to apply to the object using a selected radial gradient as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {Array} aGradientStop - The array of gradient color stops measured in 1000th of percent.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreateRadialGradientFill = function(aGradientStop){ return new ApiFill(); };

/**
 * Create a pattern fill to apply to fill the object using a selected pattern as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {PatternType} sPatternType - The pattern type used for the fill selected from one of the available pattern types.
 * @param {ApiUniColor} BgColor - The background color used for the pattern creation.
 * @param {ApiUniColor} FgColor - The foreground color used for the pattern creation.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreatePatternFill = function(sPatternType, BgColor, FgColor){ return new ApiFill(); };

/**
 * Create a blip fill to apply to the object using a selected image as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} sImageUrl - The path to the image used for the blip fill (currently only internet URL or Base64 encoded images are supported).
 * @param {BlipFillType} sBlipFillType - The type of the fill used for the blip fill (tile or stretch).
 * @returns {ApiFill}
 * */
ApiInterface.prototype.CreateBlipFill = function(sImageUrl, sBlipFillType){ return new ApiFill(); };

/**
 * Create no fill and remove the fill from the element.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiFill}
 * */
ApiInterface.prototype.CreateNoFill = function(){ return new ApiFill(); };

/**
 * Create a stroke adding shadows to the element.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {EMU} nWidth - The width of the shadow measured in English measure units.
 * @param {ApiFill} oFill - The fill type used to create the shadow.
 * @returns {ApiStroke}
 * */
ApiInterface.prototype.CreateStroke = function(nWidth, oFill){ return new ApiStroke(); };

/**
 * Create a gradient stop used for different types of gradients.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiUniColor} oUniColor - The color used for the gradient stop.
 * @param {PositivePercentage} nPos - The position of the gradient stop measured in 1000th of percent.
 * @returns {ApiGradientStop}
 * */
ApiInterface.prototype.CreateGradientStop = function(oUniColor, nPos){ return new ApiGradientStop(); };

/**
 * Create a bullet for a paragraph with the character or symbol specified with the sBullet parameter.
 * @memberof ApiInterface
 * @typeofeditors ["CSE", "CPE"]
 * @param {string} sSymbol - The character or symbol which will be used to create the bullet for the paragraph.
 * @returns {ApiBullet}
 * */
ApiInterface.prototype.CreateBullet = function(sSymbol){ return new ApiBullet(); };

/**
 * Create a bullet for a paragraph with the character or symbol specified with the sType parameter.
 * @memberof ApiInterface
 * @typeofeditors ["CSE", "CPE"]
 * @param {BulletType} sType - The numbering type the paragraphs will be numbered with.
 * @param {number} nStartAt - The number the first numbered paragraph will start with.
 * @returns {ApiBullet}
 * */
ApiInterface.prototype.CreateNumbering = function(sType, nStartAt){ return new ApiBullet(); };

/**
 * Get the type of the current class. 
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"documentContent"}
 */
ApiDocumentContent.prototype.GetClassType = function(){ return ""; };

/**
 * Get the number of elements in the current document.
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {number}
 */
ApiDocumentContent.prototype.GetElementsCount = function(){ return 0; };

/**
 * Get the element by its position in the document.
 * @memberof ApiDocumentContent
 * @param {number} nPos - The element position that will be taken from the document.
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {DocumentElement}
 */
ApiDocumentContent.prototype.GetElement = function(nPos){ return new DocumentElement(); };

/**
 * Add a paragraph or a table or a blockLvl content control using its position in the document content.
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position where the current element will be added.
 * @param {DocumentElement} oElement - The document element which will be added at the current position.
 */
ApiDocumentContent.prototype.AddElement = function(nPos, oElement){};

/**
 * Push a paragraph or a table to actually add it to the document.
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {DocumentElement} oElement - The element type which will be pushed to the document.
 * @returns {bool} - returns false if oElement is unsupported.
 */
ApiDocumentContent.prototype.Push = function(oElement){ return true; };

/**
 * Remove all the elements from the current document or from the current document element.
 * <note>When all elements are removed, a new empty paragraph is automatically created. If you want to add
 * content to this paragraph, use the {@link ApiDocumentContent#GetElement} method.</note>
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiDocumentContent.prototype.RemoveAllElements = function(){};

/**
 * Remove element using the position specified.
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The element number (position) in the document or inside other element.
 */
ApiDocumentContent.prototype.RemoveElement = function(nPos){};

/**
 * Create new history point.
 * @memberof ApiDocument
 */
ApiDocument.prototype.CreateNewHistoryPoint = function(){};

/**
 * Get the type of this class.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"document"}
 */
ApiParagraph.prototype.GetClassType = function(){ return ""; };

/**
 * Add some text to the element.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} [sText=""] - The text that we want to insert into the current document element.
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddText = function(sText){ return new ApiRun(); };

/**
 * Add line break to the current position and start the next element from a new line.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddLineBreak = function(){ return new ApiRun(); };

/**
 * Get paragraph properties.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParaPr}
 */
ApiParagraph.prototype.GetParaPr = function(){ return new ApiParaPr(); };

/**
 * Get the number of elements in the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {number}
 */
ApiParagraph.prototype.GetElementsCount = function(){ return 0; };

/**
 * Get the paragraph element using the position specified.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position where the element which content we want to get must be located.
 * @returns {ParagraphContent}
 */
ApiParagraph.prototype.GetElement = function(nPos){ return new ParagraphContent(); };

/**
 * Remove the element using the position specified.
 * <note>If the element you remove is the last paragraph element (i.e. all the elements are removed from the paragraph),
 * a new empty run is automatically created. If you want to add
 * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The element position which we want to remove from the paragraph.
 */
ApiParagraph.prototype.RemoveElement = function(nPos){};

/**
 * Remove all the elements from the current paragraph.
 * <note>When all the elements are removed from the paragraph, a new empty run is automatically created. If you want to add
 * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiParagraph.prototype.RemoveAllElements = function(){};

/**
 * Delete current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {bool} - returns false if paragraph haven't parent.
 */
ApiParagraph.prototype.Delete = function(){ return true; };

/**
 * Get the next paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParagraph | null} - returns null if paragraph is last.
 */
ApiParagraph.prototype.GetNext = function(){ return new ApiParagraph(); };

/**
 * Get the previous paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParagraph} - returns null if paragraph is first.
 */
ApiParagraph.prototype.GetPrevious = function(){ return new ApiParagraph(); };

/**
 * Create a paragraph copy. Ingnore comments, footnote references, complex fields.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParagraph}
 */
ApiParagraph.prototype.Copy = function(){ return new ApiParagraph(); };

/**
 * Add an element to the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ParagraphContent} oElement - The document element which will be added at the current position. Returns false if the
 * type of oElement is not supported by a paragraph.
 * @param {number} [nPos] The position where the current element will be added. If this value is not
 * specified then the element will be added at the end of the current paragraph.
 * @returns {boolean} Returns <code>false</code> if the type of <code>oElement</code> is not supported by paragraph
 * content.
 */
ApiParagraph.prototype.AddElement = function(oElement, nPos){ return new boolean(); };

/**
 * Add a tab stop to the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddTabStop = function(){ return new ApiRun(); };

/**
 * Get the type of this class.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"run"}
 */
ApiRun.prototype.GetClassType = function(){ return ""; };

/**
 * Get the text properties of the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiTextPr}
 */
ApiRun.prototype.GetTextPr = function(){ return new ApiTextPr(); };

/**
 * Clear content from the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.ClearContent = function(){};

/**
 * Remove all the elements from the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.RemoveAllElements = function(){};

/**
 * Delete current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.Delete = function(){};

/**
 * Add some text to this run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} sText - The text which will be added to the current run.
 */
ApiRun.prototype.AddText = function(sText){};

/**
 * Add a line break to the current run position and start the next element from a new line.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.AddLineBreak = function(){};

/**
 * Add a tab stop to the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.AddTabStop = function(){};

/**
 * Create a copy of the run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiRun.prototype.Copy = function(){ return new ApiRun(); };

/**
 * Set the text properties for the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiTextPr} oTextPr - The text properties that will be set to the run specified.
 * @returns {ApiTextPr}  
 */
ApiRun.prototype.SetTextPr = function(oTextPr){ return new ApiTextPr(); };

/**
 * Set the bold property to the text character.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isBold - Specifies that the contents of this run are displayed bold.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetBold = function(isBold){ return new ApiTextPr(); };

/**
 * Specify that any lowercase characters in this text run are formatted for display only as their capital letter character equivalents.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isCaps - Specifies that the contents of the current run are displayed capitalized.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetCaps = function(isCaps){ return new ApiTextPr(); };

/**
 * Set the text color for the current text run in the RGB format.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetColor = function(r, g, b, isAuto){ return new ApiTextPr(); };

/**
 * Specify that the contents of this run are displayed with two horizontal lines through each character displayed on the line.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetDoubleStrikeout = function(isDoubleStrikeout){ return new ApiTextPr(); };

/**
 * Set the text color for the current text run.
 * @memberof ApiRun
 * @typeofeditors ["CSE", "CPE"]
 * @param {ApiFill} oApiFill - The color or pattern used to fill the text color.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetFill = function(oApiFill){ return new ApiTextPr(); };

/**
 * Set all 4 font slots with the specified font family.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} sFontFamily - The font family or families used for the current text run.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetFontFamily = function(sFontFamily){ return new ApiTextPr(); };

/**
 * Set the font size for the characters of the current text run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {hps} nSize - The text size value measured in half-points (1/144 of an inch).
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetFontSize = function(nSize){ return new ApiTextPr(); };

/**
 * Specify a highlighting color in the RGB format which is applied as a background for the contents of the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isNone=false] If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetHighlight = function(r, g, b, isNone){ return new ApiTextPr(); };

/**
 * Set the italic property to the text character.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isItalic - Specifies that the contents of the current run are displayed italicized.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetItalic = function(isItalic){ return new ApiTextPr(); };

/**
 * Specify the languages which will be used to check spelling and grammar (if requested) when processing
 * the contents of this text run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} sLangId - The possible value for this parameter is a language identifier as defined by
 * RFC 4646/BCP 47. Example: "en-CA".
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetLanguage = function(sLangId){ return new ApiTextPr(); };

/**
 * Specify the amount by which text is raised or lowered for this run in relation to the default
 * baseline of the surrounding non-positioned text.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {hps} nPosition - Specifies a positive (raised text) or negative (lowered text)
 * measurement in half-points (1/144 of an inch).
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetPosition = function(nPosition){ return new ApiTextPr(); };

/**
 * Specify the shading applied to the contents of the current text run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ShdType} sType - The shading type applied to the contents of the current text run.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetShd = function(sType, r, g, b){ return new ApiTextPr(); };

/**
 * Specify that all the small letter characters in this text run are formatted for display only as their capital
 * letter character equivalents which are two points smaller than the actual font size specified for this text.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or not.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetSmallCaps = function(isSmallCaps){ return new ApiTextPr(); };

/**
 * Set text spacing measured in twentieths of a point.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetSpacing = function(SetSpacing){ return new ApiTextPr(); };

/**
 * Specify that the contents of this run are displayed with a single horizontal line through the center of the line.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isStrikeout - Specifies that the contents of the current run are displayed struck through.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetStrikeout = function(isStrikeout){ return new ApiTextPr(); };

/**
 * Set style for the current Run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiStyle} oStyle - The style which must be applied to the text character.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetStyle = function(oStyle){ return new ApiTextPr(); };

/**
 * Specify that the contents of this run are displayed along with a line appearing directly below the character
 * (less than all the spacing above and below the characters on the line).
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isUnderline - Specifies that the contents of the current run are displayed underlined.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetUnderline = function(isUnderline){ return new ApiTextPr(); };

/**
 * Specify the alignment which will be applied to the contents of this run in relation to the default appearance of the run text:
 * * <b>"baseline"</b> - the characters in the current text run will be aligned by the default text baseline.
 * * <b>"subscript"</b> - the characters in the current text run will be aligned below the default text baseline.
 * * <b>"superscript"</b> - the characters in the current text run will be aligned above the default text baseline.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {("baseline" | "subscript" | "superscript")} sType - The vertical alignment type applied to the text contents.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetVertAlign = function(sType){ return new ApiTextPr(); };

/**
 * Add a paragraph or a table or a blockLvl content control using its position in the cell.
 * @memberof ApiTable
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiTableCell} oCell - The cell where the current element will be added.
 * @param {number} nPos - The position in the cell where the current element will be added.
 * @param {DocumentElement} oElement - The document element which will be added at the current position.
 */
ApiTable.prototype.AddElement = function(oCell, nPos, oElement){};

/**
 * Create a copy of a table.
 * @memberof ApiTable
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiTable}
 */
ApiTable.prototype.Copy = function(){ return new ApiTable(); };

/**
 * Get the type of this class.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"textPr"}
 */
ApiTextPr.prototype.GetClassType = function(){ return ""; };

/**
 * Set the bold property to the text character.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isBold - Specifies that the contents of the run are displayed bold.
 */
ApiTextPr.prototype.SetBold = function(isBold){};

/**
 * Set the italic property to the text character.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isItalic - Specifies that the contents of the current run are displayed italicized.
 */
ApiTextPr.prototype.SetItalic = function(isItalic){};

/**
 * Specify that the contents of the run are displayed with a single horizontal line through the center of the line.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isStrikeout - Specifies that the contents of the current run are displayed struck through.
 */
ApiTextPr.prototype.SetStrikeout = function(isStrikeout){};

/**
 * Specify that the contents of the run are displayed along with a line appearing directly below the character
 * (less than all the spacing above and below the characters on the line).
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isUnderline - Specifies that the contents of the current run are displayed underlined.
 */
ApiTextPr.prototype.SetUnderline = function(isUnderline){};

/**
 * Set all 4 font slots with the specified font family.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {string} sFontFamily - The font family or families used for the current text run.
 */
ApiTextPr.prototype.SetFontFamily = function(sFontFamily){};

/**
 * Set the font size for the characters of the current text run.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {hps} nSize - The text size value measured in half-points (1/144 of an inch).
 */
ApiTextPr.prototype.SetFontSize = function(nSize){};

/**
 * Specify the alignment which will be applied to the contents of this run in relation to the default appearance of the run text:
 * * <b>"baseline"</b> - the characters in the current text run will be aligned by the default text baseline.
 * * <b>"subscript"</b> - the characters in the current text run will be aligned below the default text baseline.
 * * <b>"superscript"</b> - the characters in the current text run will be aligned above the default text baseline.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {("baseline" | "subscript" | "superscript")} sType - The vertical alignment type applied to the text contents.
 */
ApiTextPr.prototype.SetVertAlign = function(sType){};

/**
 * Set text spacing measured in twentieths of a point.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
 */
ApiTextPr.prototype.SetSpacing = function(nSpacing){};

/**
 * Specify that the contents of this run are displayed with two horizontal lines through each character displayed on the line.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
 */
ApiTextPr.prototype.SetDoubleStrikeout = function(isDoubleStrikeout){};

/**
 * Specify that any lowercase characters in this text run are formatted for display only as their capital letter character equivalents.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isCaps - Specifies that the contents of the current run are displayed capitalized.
 */
ApiTextPr.prototype.SetCaps = function(isCaps){};

/**
 * Specify that all the small letter characters in the text run are formatted for display only as their capital
 * letter character equivalents which are two points smaller than the actual font size specified for this text.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isSmallCaps - Specifies if the contents of the current run are displayed capitalized two points smaller or not.
 */
ApiTextPr.prototype.SetSmallCaps = function(isSmallCaps){};

/**
 * Set the text color for the current text run.
 * @memberof ApiTextPr
 * @typeofeditors ["CSE", "CPE"]
 * @param {ApiFill} oApiFill - The color or pattern used to fill the text color.
 */
ApiTextPr.prototype.SetFill = function(oApiFill){};

/**
 * Get the type of this class.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"paraPr"}
 */
ApiParaPr.prototype.GetClassType = function(){ return ""; };

/**
 * Set the paragraph left side indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.SetIndLeft = function(nValue){};

/**
 * Get the paragraph left side indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips | undefined} - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetIndLeft = function(){ return new twips(); };

/**
 * Set the paragraph right side indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nValue - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.SetIndRight = function(nValue){};

/**
 * Get the paragraph right side indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips | undefined} - The paragraph right side indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetIndRight = function(){ return new twips(); };

/**
 * Set the paragraph first line indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nValue - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.SetIndFirstLine = function(nValue){};

/**
 * Get the paragraph first line indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips | undefined} - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetIndFirstLine = function(){ return new twips(); };

/**
 * Set paragraph contents justification.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {("left" | "right" | "both" | "center")} sJc - The justification type that
 * will be applied to the paragraph contents.
 */
ApiParaPr.prototype.SetJc = function(sJc){};

/**
 * Get paragraph contents justification.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {("left" | "right" | "both" | "center" | undefined)} 
 */
ApiParaPr.prototype.GetJc = function(){ return ""; };

/**
 * Set the paragraph line spacing. If the value of the sLineRule parameter is either 
 * "atLeast" or "exact", then the value of nLine will be interpreted as twentieths of a point. If 
 * the value of the sLineRule parameter is "auto", then the value of the 
 * nLine parameter will be interpreted as 240ths of a line.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {(twips | line240)} nLine - The line spacing value measured either in twentieths of a point (1/1440 of an inch) or in 240ths of a line.
 * @param {("auto" | "atLeast" | "exact")} sLineRule - The rule that determines the measuring units of the nLine parameter.
 */
ApiParaPr.prototype.SetSpacingLine = function(nLine, sLineRule){};

/**
 * Get the paragraph line spacing value.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips | line240 | undefined} - to know is twips or line240 use ApiParaPr.prototype.GetSpacingLineRule().
 */
ApiParaPr.prototype.GetSpacingLineValue = function(){ return new twips(); };

/**
 * Get the paragraph line spacing rule.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"auto" | "atLeast" | "exact" | undefined} 
 */
ApiParaPr.prototype.GetSpacingLineRule = function(){ return ""; };

/**
 * Set the spacing before the current paragraph. If the value of the isBeforeAuto parameter is true, then 
 * any value of the nBefore is ignored. If isBeforeAuto parameter is not specified, then 
 * it will be interpreted as false.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nBefore - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440 of an inch).
 * @param {boolean} [isBeforeAuto=false] - The true value will disable the nBefore parameter.
 */
ApiParaPr.prototype.SetSpacingBefore = function(nBefore, isBeforeAuto){};

/**
 * Get the spacing before value of the current paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips} - The value of the spacing before the current paragraph measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetSpacingBefore = function(){ return new twips(); };

/**
 * Set the spacing after the current paragraph. If the value of the isAfterAuto parameter is true, then 
 * any value of the nAfter is ignored. If isAfterAuto parameter is not specified, then it 
 * will be interpreted as false.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nAfter - The value of the spacing after the current paragraph measured in twentieths of a point (1/1440 of an inch).
 * @param {boolean} [isAfterAuto=false] - The true value will disable the nAfter parameter.
 */
ApiParaPr.prototype.SetSpacingAfter = function(nAfter, isAfterAuto){};

/**
 * Get the spacing after value of the current paragraph. 
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips} - The value of the spacing after the current paragraph measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetSpacingAfter = function(){ return new twips(); };

/**
 * Specify a sequence of custom tab stops which will be used for any tab characters in the current paragraph.
 * <b>Warning</b>: The lengths of aPos array and aVal array <b>MUST BE</b> equal to each other.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips[]} aPos - An array of the positions of custom tab stops with respect to the current page margins
 * measured in twentieths of a point (1/1440 of an inch).
 * @param {TabJc[]} aVal - An array of the styles of custom tab stops, which determines the behavior of the tab
 * stop and the alignment which will be applied to text entered at the current custom tab stop.
 */
ApiParaPr.prototype.SetTabs = function(aPos, aVal){};

/**
 * Set the bullet or numbering to the current paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CSE", "CPE"]
 * @param {?ApiBullet} oBullet - The bullet object created using either the {@link Api#CreateBullet} or {@link Api#CreateNumbering} method.
 */
ApiParaPr.prototype.SetBullet = function(oBullet){};

/**
 * Get the type of this class.
 * @memberof ApiShape
 * @typeofeditors ["CDE", "CSE"]
 * @returns {"shape"}
 */
ApiShape.prototype.GetClassType = function(){ return ""; };

/**
 * Get the shape inner contents where a paragraph or text runs can be inserted.
 * @memberof ApiShape
 * @typeofeditors ["CDE", "CSE"]
 * @returns {ApiDocumentContent}
 */
ApiShape.prototype.GetDocContent = function(){ return new ApiDocumentContent(); };

/**
 * Get the shape inner contents where a paragraph or text runs can be inserted.
 * @memberof ApiShape
 * @typeofeditors ["CDE", "CSE"]
 * @returns {ApiDocumentContent}
 */
ApiShape.prototype.GetContent = function(){ return new ApiDocumentContent(); };

/**
 * Set the vertical alignment for the shape content where a paragraph or text runs can be inserted.
 * @memberof ApiShape
 * @typeofeditors ["CDE", "CSE"]
 * @param {VerticalTextAlign} VerticalAlign - The type of the vertical alignment for the shape inner contents.
 */
ApiShape.prototype.SetVerticalTextAlign = function(VerticalAlign){};

/**
 * Set text paddings
 * @memberof ApiShape
 * @typeofeditors ["CDE", "CSE"]
 * @param {?EMU} nLeft - Left padding.
 * @param {?EMU} nTop - Top padding.
 * @param {?EMU} nRight - Right padding.
 * @param {?EMU} nBottom - Bottom padding.
 */
ApiShape.prototype.SetPaddings = function(nLeft, nTop, nRight, nBottom){};

/**
 * Get the type of this class.
 * @memberof ApiFill
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"fill"}
 */
ApiFill.prototype.GetClassType = function(){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiStroke
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"stroke"}
 */
ApiStroke.prototype.GetClassType = function(){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiGradientStop
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"gradientStop"}
 */
ApiGradientStop.prototype.GetClassType = function (){ return ""; };

/**
 * Get the type of the class based on this base class.
 * @memberof ApiUniColor
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"uniColor"}
 */
ApiUniColor.prototype.GetClassType = function (){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiRGBColor
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"rgbColor"}
 */
ApiRGBColor.prototype.GetClassType = function (){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiSchemeColor
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"schemeColor"}
 */
ApiSchemeColor.prototype.GetClassType = function (){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiPresetColor
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"presetColor"}
 */
ApiPresetColor.prototype.GetClassType = function (){ return ""; };

/**
 * Get the type of this class.
 * @memberof ApiBullet
 * @typeofeditors ["CSE", "CPE"]
 * @returns {"bullet"}
 */
ApiBullet.prototype.GetClassType = function(){ return ""; };

/**
 * Class representing a presentation.
 * @constructor
 */

function ApiPresentation(oPresentation){}


/**
 * Class representing a slide.
 * @constructor
 */

function ApiSlide(oSlide){}


/**
 * Class representing a group of drawings.
 * @constructor
 */

function ApiGroup(oGroup){}
ApiGroup.prototype = Object.create(ApiDrawing.prototype);
ApiGroup.prototype.constructor = ApiGroup;


/**
 * Class representing a table.
 * @param oGraphicFrame
 * @constructor
 * */

function ApiTable(oGraphicFrame){}
ApiTable.prototype = Object.create(ApiDrawing.prototype);
ApiTable.prototype.constructor = ApiTable;


/**
 * Class representing a table row.
 * @param oTableRow
 * @constructor
 */

function ApiTableRow(oTableRow){}


/**
 * Class representing a table cell.
 * @param oCell
 * @constructor
 */

function ApiTableCell(oCell){}


/**
 * Twentieths of a point (equivalent to 1/1440th of an inch).
 * @typedef {number} twips
 */



/**
 * 240ths of a line.
 * @typedef {number} line240
 */



/**
 * Half-points (2 half-points = 1 point).
 * @typedef {number} hps
 */



/**
 * A numeric value from 0 to 255.
 * @typedef {number} byte
 */



/**
 * 60000th of a degree (5400000 = 90 degrees).
 * @typedef {number} PositiveFixedAngle
 * */



/**
 * A border type.
 * @typedef {("none" | "single")} BorderType
 */



/**
 * Types of custom tab.
 * @typedef {("clear" | "left" | "right" | "center")} TabJc
 */



/**
 * Eighths of a point (24 eighths of a point = 3 points).
 * @typedef {number} pt_8
 */



/**
 * A point.
 * @typedef {number} pt
 */



/**
 * English measure unit. 1 mm = 36000 EMUs, 1 inch = 914400 EMUs.
 * @typedef {number} EMU
 */



/**
 * This type specifies the preset shape geometry that will be used for a shape.
 * @typedef {("accentBorderCallout1" | "accentBorderCallout2" | "accentBorderCallout3" | "accentCallout1" | "accentCallout2" | "accentCallout3" | "actionButtonBackPrevious" | "actionButtonBeginning" | "actionButtonBlank" | "actionButtonDocument" | "actionButtonEnd" | "actionButtonForwardNext" | "actionButtonHelp" | "actionButtonHome" | "actionButtonInformation" | "actionButtonMovie" | "actionButtonReturn" | "actionButtonSound" | "arc" | "bentArrow" | "bentConnector2" | "bentConnector3" | "bentConnector4" | "bentConnector5" | "bentUpArrow" | "bevel" | "blockArc" | "borderCallout1" | "borderCallout2" | "borderCallout3" | "bracePair" | "bracketPair" | "callout1" | "callout2" | "callout3" | "can" | "chartPlus" | "chartStar" | "chartX" | "chevron" | "chord" | "circularArrow" | "cloud" | "cloudCallout" | "corner" | "cornerTabs" | "cube" | "curvedConnector2" | "curvedConnector3" | "curvedConnector4" | "curvedConnector5" | "curvedDownArrow" | "curvedLeftArrow" | "curvedRightArrow" | "curvedUpArrow" | "decagon" | "diagStripe" | "diamond" | "dodecagon" | "donut" | "doubleWave" | "downArrow" | "downArrowCallout" | "ellipse" | "ellipseRibbon" | "ellipseRibbon2" | "flowChartAlternateProcess" | "flowChartCollate" | "flowChartConnector" | "flowChartDecision" | "flowChartDelay" | "flowChartDisplay" | "flowChartDocument" | "flowChartExtract" | "flowChartInputOutput" | "flowChartInternalStorage" | "flowChartMagneticDisk" | "flowChartMagneticDrum" | "flowChartMagneticTape" | "flowChartManualInput" | "flowChartManualOperation" | "flowChartMerge" | "flowChartMultidocument" | "flowChartOfflineStorage" | "flowChartOffpageConnector" | "flowChartOnlineStorage" | "flowChartOr" | "flowChartPredefinedProcess" | "flowChartPreparation" | "flowChartProcess" | "flowChartPunchedCard" | "flowChartPunchedTape" | "flowChartSort" | "flowChartSummingJunction" | "flowChartTerminator" | "foldedCorner" | "frame" | "funnel" | "gear6" | "gear9" | "halfFrame" | "heart" | "heptagon" | "hexagon" | "homePlate" | "horizontalScroll" | "irregularSeal1" | "irregularSeal2" | "leftArrow" | "leftArrowCallout" | "leftBrace" | "leftBracket" | "leftCircularArrow" | "leftRightArrow" | "leftRightArrowCallout" | "leftRightCircularArrow" | "leftRightRibbon" | "leftRightUpArrow" | "leftUpArrow" | "lightningBolt" | "line" | "lineInv" | "mathDivide" | "mathEqual" | "mathMinus" | "mathMultiply" | "mathNotEqual" | "mathPlus" | "moon" | "nonIsoscelesTrapezoid" | "noSmoking" | "notchedRightArrow" | "octagon" | "parallelogram" | "pentagon" | "pie" | "pieWedge" | "plaque" | "plaqueTabs" | "plus" | "quadArrow" | "quadArrowCallout" | "rect" | "ribbon" | "ribbon2" | "rightArrow" | "rightArrowCallout" | "rightBrace" | "rightBracket" | "round1Rect" | "round2DiagRect" | "round2SameRect" | "roundRect" | "rtTriangle" | "smileyFace" | "snip1Rect" | "snip2DiagRect" | "snip2SameRect" | "snipRoundRect" | "squareTabs" | "star10" | "star12" | "star16" | "star24" | "star32" | "star4" | "star5" | "star6" | "star7" | "star8" | "straightConnector1" | "stripedRightArrow" | "sun" | "swooshArrow" | "teardrop" | "trapezoid" | "triangle" | "upArrowCallout" | "upDownArrow" | "upDownArrow" | "upDownArrowCallout" | "uturnArrow" | "verticalScroll" | "wave" | "wedgeEllipseCallout" | "wedgeRectCallout" | "wedgeRoundRectCallout")} ShapeType
 */



/**
* A bullet type which will be added to the paragraph in spreadsheet or presentation.
* @typedef {("None" | "ArabicPeriod"  | "ArabicParenR"  | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod")} BulletType
*/



/**
 * This type specifies the available chart types which can be used to create a new chart.
 * @typedef {("bar" | "barStacked" | "barStackedPercent" | "bar3D" | "barStacked3D" | "barStackedPercent3D" | "barStackedPercent3DPerspective" | "horizontalBar" | "horizontalBarStacked" | "horizontalBarStackedPercent" | "horizontalBar3D" | "horizontalBarStacked3D" | "horizontalBarStackedPercent3D" | "lineNormal" | "lineStacked" | "lineStackedPercent" | "line3D" | "pie" | "pie3D" | "doughnut" | "scatter" | "stock" | "area" | "areaStacked" | "areaStackedPercent")} ChartType
 */



/**
 * The available text vertical alignment (used to align text in a shape with a placement for text inside it).
 * @typedef {("top" | "center" | "bottom")} VerticalTextAlign
 * */



/**
 * The available color scheme identifiers.
 * @typedef {("accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "bg1" | "bg2" | "dk1" | "dk2" | "lt1" | "lt2" | "tx1" | "tx2")} SchemeColorId
 * */



/**
 * The available preset color names.
 * @typedef {("aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate" | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" | "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" | "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" | "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" | "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" | "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" | "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" | "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" | "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" | "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" | "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" | "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" | "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey" | "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" | "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" | "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" | "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" | "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" | "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip" | "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" | "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" | "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" | "yellowGreen")} PresetColor
 * */



/**
 * Possible values for the position of chart tick labels (either horizontal or vertical).
 * * **"none"** - not display the selected tick labels.
 * * **"nextTo"** - set the position of the selected tick labels next to the main label.
 * * **"low"** - set the position of the selected tick labels in the part of the chart with lower values.
 * * **"high"** - set the position of the selected tick labels in the part of the chart with higher values.
 * @typedef {("none" | "nextTo" | "low" | "high")} TickLabelPosition
 * **/



/**
 * The type of a fill which uses an image as a background.
 * * **"tile"** - if the image is smaller than the shape which is filled, the image will be tiled all over the created shape surface.
 * * **"stretch"** - if the image is smaller than the shape which is filled, the image will be stretched to fit the created shape surface.
 * @typedef {"tile" | "stretch"} BlipFillType
 * */



/**
 * The available preset patterns which can be used for the fill.
 * @typedef {"cross" | "dashDnDiag" | "dashHorz" | "dashUpDiag" | "dashVert" | "diagBrick" | "diagCross" | "divot" | "dkDnDiag" | "dkHorz" | "dkUpDiag" | "dkVert" | "dnDiag" | "dotDmnd" | "dotGrid" | "horz" | "horzBrick" | "lgCheck" | "lgConfetti" | "lgGrid" | "ltDnDiag" | "ltHorz" | "ltUpDiag" | "ltVert" | "narHorz" | "narVert" | "openDmnd" | "pct10" | "pct20" | "pct25" | "pct30" | "pct40" | "pct5" | "pct50" | "pct60" | "pct70" | "pct75" | "pct80" | "pct90" | "plaid" | "shingle" | "smCheck" | "smConfetti" | "smGrid" | "solidDmnd" | "sphere" | "trellis" | "upDiag" | "vert" | "wave" | "wdDnDiag" | "wdUpDiag" | "weave" | "zigZag"} PatternType
 * */



/**
 * The available types of tick mark appearance.
 * @typedef {("cross" | "in" | "none" | "out")} TickMark
 * */



/**
 * The 1000th of a percent (100000 = 100%).
 * @typedef {number} PositivePercentage
 * */



/**
 * Create a group of drawings.
 * @memberof ApiInterface
 * @param {Array} aDrawings - The array of drawings.
 * @returns {ApiGroup}
 * */

ApiInterface.prototype.CreateGroup = function(aDrawings){ return new ApiGroup(); };


/**
 * Create a table.
 * @param nCols - Number of columns.
 * @param nRows - Number of raws.
 * @returns {ApiTable}
 */

ApiInterface.prototype.CreateTable = function(nCols, nRows){ return new ApiTable(); };


/**
 * Get the slide by its position in the presentation.
 * @memberof ApiPresentation
 * @param {number} nIndex - The slide number (position) in the presentation.
 * @returns {ApiSlide}
 */

ApiPresentation.prototype.GetSlideByIndex = function(nIndex){ return new ApiSlide(); };


/**
 * Create new history point.
 */

ApiPresentation.prototype.CreateNewHistoryPoint = function(){};


/**
 * Return type of object.
 * @returns {"table"}
 * */

ApiTable.prototype.GetClassType = function(){ return ""; };


/**
 * Return row by index.
 * @param nIndex {number} - The row number (position) in the table.
 * @returns {ApiTableRow}
 * */

ApiTable.prototype.GetRow = function(nIndex){ return new ApiTableRow(); };


/**
 * Merge array of cells. If merge was done successfully, it will return merged cell, otherwise "null".
 * <b>Warning</b>: The number of cells in any row and the number of rows in the current table may be changed.
 * @param {ApiTableCell[]} aCells - The array of cells.
 * @returns {ApiTableCell}
 */

ApiTable.prototype.MergeCells = function(aCells){ return new ApiTableCell(); };


/**
 * Specify the components of the conditional formatting of the referenced table style (if one exists)
 * which shall be applied to the set of table rows with the current table-level property exceptions. A table style
 * can specify up to six different optional conditional formats [Example: Different formatting for first column],
 * which then can be applied or omitted from individual table rows in the parent table.
 *
 * The default setting is to apply the row and column banding formatting, but not the first row, last row, first
 * column, or last column formatting.
 * @param {boolean} isFirstColumn - Specifies that the first column conditional formatting shall be applied to the
 *     table.
 * @param {boolean} isFirstRow - Specifies that the first row conditional formatting shall be applied to the table.
 * @param {boolean} isLastColumn - Specifies that the last column conditional formatting shall be applied to the
 *     table.
 * @param {boolean} isLastRow - Specifies that the last row conditional formatting shall be applied to the table.
 * @param {boolean} isHorBand - Specifies that the horizontal banding conditional formatting shall not be applied
 *     to the table.
 * @param {boolean} isVerBand - Specifies that the vertical banding conditional formatting shall not be applied to
 *     the table.
 */

ApiTable.prototype.SetTableLook = function(isFirstColumn, isFirstRow, isLastColumn, isLastRow, isHorBand, isVerBand){};


/**
 * Add a new row to the current table.
 * @param {ApiTableCell} [oCell] - If not specified a new row will be added to the end of the table.
 * @param {boolean} [isBefore=false] - Add a new row before or after the specified cell. If no cell is specified,
 * then this parameter will be ignored.
 * @returns {ApiTableRow}
 */

ApiTable.prototype.AddRow = function(oCell, isBefore){ return new ApiTableRow(); };


/**
 * Add a new column to the end of the current table.
 * @param {ApiTableCell} [oCell] - If not specified a new column will be added to the end of the table.
 * @param {boolean} [isBefore=false] - Add a new column before or after the specified cell. If no cell is specified,
 * then this parameter will be ignored.
 */

ApiTable.prototype.AddColumn = function(oCell, isBefore){};


/**
 * Remove the table row with a specified cell.
 * @param {ApiTableCell} oCell - The table cell specified.
 * @returns {boolean} - defines if the table is empty after removing or not.
 */

ApiTable.prototype.RemoveRow = function(oCell){ return new boolean(); };


/**
 * Remove the table column with a specified cell.
 * @param {ApiTableCell} oCell - The table cell specified.
 * @returns {boolean} - defines if the table is empty after removing or not.
 */

ApiTable.prototype.RemoveColumn = function(oCell){ return new boolean(); };


/**
 * Get the type of this class.
 * @returns {"tableRow"}
 */

ApiTableRow.prototype.GetClassType = function(){ return ""; };


/**
 * Get the number of cells in the current row.
 * @returns {number}
 */

ApiTableRow.prototype.GetCellsCount = function(){ return 0; };


/**
 * Get the cell by its position.
 * @param {number} nPos - The cell position in the table row.
 * @returns {ApiTableCell}
 */

ApiTableRow.prototype.GetCell = function(nPos){ return new ApiTableCell(); };


/**
 * Set the height of the current table row within the current table.
 * @param {EMU} [nValue] - The row height in English measure units.
 */

ApiTableRow.prototype.SetHeight = function(nValue){};


/**
 * Get the type of this class.
 * @returns {"tableCell"}
 */

ApiTableCell.prototype.GetClassType = function(){ return ""; };


/**
 * Returns cell content.
 * @returns {ApiDocumentContent}
 */

ApiTableCell.prototype.GetContent = function(){ return new ApiDocumentContent(); };


/**
 * Specify the amount of space which shall be left between the bottom extent of the cell contents and the border
 * of a specific individual table cell within a table.
 * @param {?twips} nValue - If this value is <code>null</code>, then default table cell bottom margin shall be used,
 * otherwise override the table cell bottom margin with specified value for the current cell.
 */

ApiTableCell.prototype.SetCellMarginBottom = function(nValue){};


/**
 * Specify the amount of space which shall be left between the left extent of the current cell contents and the
 * left edge border of a specific individual table cell within a table.
 * @param {?twips} nValue - If this value is <code>null</code>, then default table cell bottom margin shall be used,
 * otherwise override the table cell bottom margin with specified value for the current cell.
 */

ApiTableCell.prototype.SetCellMarginLeft = function(nValue){};


/**
 * Specifies the amount of space which shall be left between the right extent of the current cell contents and the
 * right edge border of a specific individual table cell within a table.
 * @param {?twips} nValue - If this value is <code>null</code>, then default table cell bottom margin shall be used,
 * otherwise override the table cell bottom margin with specified value for the current cell.
 */

ApiTableCell.prototype.SetCellMarginRight = function(nValue){};


/**
 * Specifies the amount of space which shall be left between the top extent of the current cell contents and the
 * top edge border of a specific individual table cell within a table.
 * @param {?twips} nValue - If this value is <code>null</code>, then default table cell bottom margin shall be used,
 * otherwise override the table cell bottom margin with specified value for the current cell.
 */

ApiTableCell.prototype.SetCellMarginTop = function(nValue){};


/**
 * Set the border which shall be displayed at the bottom of the current table cell.
 * @param {mm} fSize - The width of the current border.
 * @param {ApiFill} oApiFill - The color or pattern used to fill the current border.
 */

ApiTableCell.prototype.SetCellBorderBottom = function(fSize, oApiFill){};


/**
 * Set the border which shall be displayed at the left of the current table cell.
 * @param {mm} fSize - The width of the current border.
 * @param {ApiFill} oApiFill - The color or pattern used to fill the current border.
 */

ApiTableCell.prototype.SetCellBorderLeft = function(fSize, oApiFill){};


/**
 * Set the border which shall be displayed at the right of the current table cell.
 * @param {mm} fSize - The width of the current border.
 * @param {ApiFill} oApiFill - The color or pattern used to fill the current border.
 */

ApiTableCell.prototype.SetCellBorderRight = function(fSize, oApiFill){};


/**
 * Set the border which shall be displayed at the top of the current table cell.
 * @param {mm} fSize - The width of the current border.
 * @param {ApiFill} oApiFill - The color or pattern used to fill the current border.
 */

ApiTableCell.prototype.SetCellBorderTop = function(fSize, oApiFill){};


/**
 * Specify the vertical alignment for text within the current table cell.
 * @param {("top" | "center" | "bottom")} sType - The type of the vertical alignment.
 */

ApiTableCell.prototype.SetVerticalAlign = function(sType){};


/**
 * Class representing a sheet.
 * @constructor
 * @property {bool} Visible - Returns or sets the state of sheet visibility.
 * @property {number} Active - Makes the current sheet the active sheet.
 * @property {ApiRange} ActiveCell - Returns an object that represents the active cell.
 * @property {ApiRange} Selection - Returns an object that represents the selection range.
 * @property {ApiRange} Cells - Returns ApiRange that represents all the cells on the worksheet (not just the cells that are currently in use).
 * @property {ApiRange} Rows - Returns ApiRange that represents all the cells of the rows range.
 * @property {ApiRange} Cols - Returns ApiRange that represents all the cells of the columns range.
 * @property {ApiRange} UsedRange - Returns ApiRange that represents the used range on the specified worksheet.
 * @property {string} Name - Returns or sets a name of the active sheet.
 * @property {number} Index - Returns a sheet index.
 * @property {number} LeftMargin - Returns or sets the size of the sheet left margin measured in points.
 * @property {number} RightMargin - Returns or sets the size of the sheet right margin measured in points.
 * @property {number} TopMargin - Returns or sets the size of the sheet top margin measured in points.
 * @property {number} BottomMargin - Returns or sets the size of the sheet bottom margin measured in points.
 * @property {PageOrientation} PageOrientation - Returns or sets the page orientation.
 * @property {bool} PrintHeadings - Returns or sets the page PrintHeadings property.
 * @property {bool} PrintGridlines - Returns or sets the page PrintGridlines property.
 * @property {Array} Defnames - Returns an array of the ApiName objects.
 * @property {Array} Comments - Returns an array of the ApiComment objects.
 */

function ApiWorksheet(worksheet) {}


/**
 * Class representing a range.
 * @constructor
 * @property {number} Row - Returns the row number for the selected cell.
 * @property {number} Col - Returns the column number for the selected cell.
 * @property {ApiRange} Rows - Returns the ApiRange object that represents the rows of the specified range.
 * @property {ApiRange} Cols - Returns the ApiRange object that represents the columns of the specified range.
 * @property {number} Count - Returns the rows or columns count.
 * @property {string} Value - Returns the value from the first cell of the specified range or sets it to this cell.
 * @property {string} Formula - Returns the formula from the first cell of the specified range or sets it to this cell.
 * @property {string} Value2 - Returns the value2 (value without format) from the first cell of the specified range or sets it to this cell.
 * @property {string} Text - Returns the text from the first cell of the specified range or sets it to this cell.
 * @property {ApiColor} FontColor - Sets the text color to the current cell range with the previously created color object.
 * @property {bool} Hidden - Returns or sets the value hiding property.
 * @property {number} ColumnWidth - Returns or sets the width of all the columns in the specified range measured in points.
 * @property {number} Width - Returns a value that represents the range width measured in points.
 * @property {number} RowHeight - Returns or sets the height of the first row in the specified range measured in points.
 * @property {number} Height - Returns a value that represents the range height measured in points.
 * @property {number} FontSize - Sets the font size to the characters of the current cell range.
 * @property {string} FontName - Sets the specified font family as the font name for the current cell range.
 * @property {'center' | 'bottom' | 'top' | 'distributed' | 'justify'} AlignVertical - Sets the text vertical alignment to the current cell range.
 * @property {'left' | 'right' | 'center' | 'justify'} AlignHorizontal - Sets the text horizontal alignment to the current cell range.
 * @property {bool} Bold - Sets the bold property to the text characters from the current cell or cell range.
 * @property {'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'} Underline - Sets the type of underline applied to the font.
 * @property {bool} Strikeout - Sets a value that indicates whether the contents of the current cell or cell range are displayed struck through.
 * @property {ApiColor|'No Fill'} FillColor - Returns or sets the background color of the current cell range.
 * @property {string} NumberFormat - Sets a value that represents the format code for the object.
 * @property {ApiRange} MergeArea - Returns the cell or cell range from the merge area.
 * @property {ApiWorksheet} Worksheet - Returns the ApiWorksheet object that represents the worksheet containing the specified range.
 * @property {ApiName} DefName - Returns the ApiName object.
 * @property {ApiComment | null} Comments - Returns the ApiComment collection that represents all the comments from the specified worksheet.
 * @property {'xlDownward' | 'xlHorizontal' | 'xlUpward' | 'xlVertical'} Orientation - Sets an angle to the current cell range.
 */

function ApiRange(range) {}


/**
 * Class representing a graphical object.
 * @constructor
 */

function ApiDrawing(Drawing){}


/**
 * Class representing a shape.
 * @constructor
 */

function ApiShape(oShape){}
ApiShape.prototype = Object.create(ApiDrawing.prototype);
ApiShape.prototype.constructor = ApiShape;


/**
 * Class representing an image.
 * @constructor
 */

function ApiImage(oImage){}
ApiImage.prototype = Object.create(ApiDrawing.prototype);
ApiImage.prototype.constructor = ApiImage;


/**
 * Class representing a chart.
 * @constructor
 */

function ApiChart(oChart){}
ApiChart.prototype = Object.create(ApiDrawing.prototype);
ApiChart.prototype.constructor = ApiChart;


/**
 * The available preset color names.
 * @typedef {("aliceBlue" | "antiqueWhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" |
 *     "blanchedAlmond" | "blue" | "blueViolet" | "brown" | "burlyWood" | "cadetBlue" | "chartreuse" | "chocolate"
 *     | "coral" | "cornflowerBlue" | "cornsilk" | "crimson" | "cyan" | "darkBlue" | "darkCyan" | "darkGoldenrod" |
 *     "darkGray" | "darkGreen" | "darkGrey" | "darkKhaki" | "darkMagenta" | "darkOliveGreen" | "darkOrange" |
 *     "darkOrchid" | "darkRed" | "darkSalmon" | "darkSeaGreen" | "darkSlateBlue" | "darkSlateGray" |
 *     "darkSlateGrey" | "darkTurquoise" | "darkViolet" | "deepPink" | "deepSkyBlue" | "dimGray" | "dimGrey" |
 *     "dkBlue" | "dkCyan" | "dkGoldenrod" | "dkGray" | "dkGreen" | "dkGrey" | "dkKhaki" | "dkMagenta" |
 *     "dkOliveGreen" | "dkOrange" | "dkOrchid" | "dkRed" | "dkSalmon" | "dkSeaGreen" | "dkSlateBlue" |
 *     "dkSlateGray" | "dkSlateGrey" | "dkTurquoise" | "dkViolet" | "dodgerBlue" | "firebrick" | "floralWhite" |
 *     "forestGreen" | "fuchsia" | "gainsboro" | "ghostWhite" | "gold" | "goldenrod" | "gray" | "green" |
 *     "greenYellow" | "grey" | "honeydew" | "hotPink" | "indianRed" | "indigo" | "ivory" | "khaki" | "lavender" |
 *     "lavenderBlush" | "lawnGreen" | "lemonChiffon" | "lightBlue" | "lightCoral" | "lightCyan" |
 *     "lightGoldenrodYellow" | "lightGray" | "lightGreen" | "lightGrey" | "lightPink" | "lightSalmon" |
 *     "lightSeaGreen" | "lightSkyBlue" | "lightSlateGray" | "lightSlateGrey" | "lightSteelBlue" | "lightYellow" |
 *     "lime" | "limeGreen" | "linen" | "ltBlue" | "ltCoral" | "ltCyan" | "ltGoldenrodYellow" | "ltGray" |
 *     "ltGreen" | "ltGrey" | "ltPink" | "ltSalmon" | "ltSeaGreen" | "ltSkyBlue" | "ltSlateGray" | "ltSlateGrey"|
 *     "ltSteelBlue" | "ltYellow" | "magenta" | "maroon" | "medAquamarine" | "medBlue" | "mediumAquamarine" |
 *     "mediumBlue" | "mediumOrchid" | "mediumPurple" | "mediumSeaGreen" | "mediumSlateBlue" |
 *     "mediumSpringGreen" | "mediumTurquoise" | "mediumVioletRed" | "medOrchid" | "medPurple" | "medSeaGreen" |
 *     "medSlateBlue" | "medSpringGreen" | "medTurquoise" | "medVioletRed" | "midnightBlue" | "mintCream" |
 *     "mistyRose" | "moccasin" | "navajoWhite" | "navy" | "oldLace" | "olive" | "oliveDrab" | "orange" |
 *     "orangeRed" | "orchid" | "paleGoldenrod" | "paleGreen" | "paleTurquoise" | "paleVioletRed" | "papayaWhip"|
 *     "peachPuff" | "peru" | "pink" | "plum" | "powderBlue" | "purple" | "red" | "rosyBrown" | "royalBlue" |
 *     "saddleBrown" | "salmon" | "sandyBrown" | "seaGreen" | "seaShell" | "sienna" | "silver" | "skyBlue" |
 *     "slateBlue" | "slateGray" | "slateGrey" | "snow" | "springGreen" | "steelBlue" | "tan" | "teal" |
 *     "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whiteSmoke" | "yellow" |
 *     "yellowGreen")} PresetColor
 * */



/**
 * Possible values for the position of chart tick labels (either horizontal or vertical).
 * * **"none"** - not display the selected tick labels.
 * * **"nextTo"** - set the position of the selected tick labels next to the main label.
 * * **"low"** - set the position of the selected tick labels in the part of the chart with lower values.
 * * **"high"** - set the position of the selected tick labels in the part of the chart with higher values.
 * @typedef {("none" | "nextTo" | "low" | "high")} TickLabelPosition
 * **/



/**
 * @typedef {("xlLandscape" | "xlPortrait")} PageOrientation
 * */



/**
 * @typedef {("cross" | "in" | "none" | "out")} TickMark
 * */



/**
 * Class representing a base class for color types.
 * @constructor
 */

function ApiColor(color) {}


/**
 * Class representing the names.
 * @constructor
 * @property {string} Name - Sets a name to the active sheet.
 * @property {string} RefersTo - Returns or sets the formula that the name is defined to refer to.
 * @property {apiRange} RefersToRange - Returns the ApiRange object by reference.
 */

function ApiName(DefName) {}


/**
 * Class representing the comments.
 * @constructor
 * @property {string} Text - Returns the text from the first cell in range.
 */

function ApiComment(comment, ws) {}


/**
 * Return a class formatted according to the instructions contained in a format expression.
 * @memberof ApiInterface
 * @param {string} expression - Any valid expression.
 * @param {string} [format] - A valid named or user-defined format expression.
 * @returns {string}
 */

ApiInterface.prototype.Format = function (expression, format) { return ""; };


/**
 * Create a new worksheet. The new worksheet becomes the active sheet.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string} sName - The name of a new worksheet.
 */

ApiInterface.prototype.AddSheet = function (sName) {};


/**
 * Returns a sheet collection that represents all the sheets in the active workbook.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @returns {ApiWorksheet[]}
 */

ApiInterface.prototype.GetSheets = function () { return [new ApiWorksheet()]; };


/**
 * Set locale for the document.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {number} LCID - The locale specified.
 */

ApiInterface.prototype.SetLocale = function(LCID) {};


/**
 * Return current locale id.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiInterface.prototype.GetLocale = function() { return 0; };


/**
 * Get the object that represents the active sheet.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @returns {ApiWorksheet}
 */

ApiInterface.prototype.GetActiveSheet = function () { return new ApiWorksheet(); };


/**
 * Return an object that represents the sheet.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string | number} nameOrIndex Sheet name or sheet index.
 * @returns {ApiWorksheet | null}
 */

ApiInterface.prototype.GetSheet = function (nameOrIndex) { return new ApiWorksheet(); };


/**
 * Get the list of all the available theme colors for the spreadsheet.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @returns {string[]}
 */

ApiInterface.prototype.GetThemesColors = function () { return [""]; };


/**
 * Set the theme colors to the current spreadsheet.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string} sTheme - The color scheme that will be set to the current spreadsheet.
 * @returns {bool} - returns false if sTheme isn't a string.
 */

ApiInterface.prototype.SetThemeColors = function (sTheme) { return true; };


/**
 * Create an RGB color setting the appropriate values for the red, green and blue color components.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @returns {ApiColor}
 */

ApiInterface.prototype.CreateColorFromRGB = function (r, g, b) { return new ApiColor(); };


/**
 * Create a color selecting it from one of the available color presets.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {PresetColor} sPresetColor - A preset selected from the list of the available color preset names.
 * @returns {ApiColor}
 */

ApiInterface.prototype.CreateColorByName = function (sPresetColor) { return new ApiColor(); };


/**
 * Return an ApiRange object that represents the rectangular intersection of two or more ranges. If one or more ranges from a different worksheet are specified, an error will be returned.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {ApiRange} Range1 The intersecting ranges. At least two Range objects must be specified.
 * @param {ApiRange} Range2 The intersecting ranges. At least two Range objects must be specified.
 * @returns {ApiRange | Error}
 */

ApiInterface.prototype.Intersect  = function (Range1, Range2) { return new ApiRange(); };


/**
 * Return an object that represents the selection range.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

ApiInterface.prototype.GetSelection = function () { return new ApiRange(); };


/**
 * Define a new name for a range of cells.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string} sName - The range name.
 * @param {string} sRef - Must contain the sheet name, followed by sign ! and  a range of cells. 
 * Example: "Sheet1!$A$1:$B$2".  
 * @param {bool} isHidden - Defines if the range name is hidden or not.
 * @returns {Error | true} - returns error if sName or sRef are invalid.
 */

ApiInterface.prototype.AddDefName = function (sName, sRef, isHidden) { return new Error(); };


/**
 * Return an ApiName.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string} defName - The range name.
 * @returns {ApiName}
 */

ApiInterface.prototype.GetDefName = function (defName) { return new ApiName(); };


/**
 * Save changes to the specified document.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 */

ApiInterface.prototype.Save = function () {};


/**
 * Return an ApiRange.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {string} sRange - The range of cells from the current sheet.
 * @returns {ApiRange}
 */

ApiInterface.prototype.GetRange = function(sRange) { return new ApiRange(); };


/**
 * Get mail merge data.
 * @memberof ApiInterface
 * @typeofeditors ["CSE"]
 * @param {number} nSheet - The sheet index.
 * @returns {string[][]} 
 */

ApiInterface.prototype.GetMailMergeData = function (nSheet) { return [""]; };


/**
 * Return the state of sheet visibility.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {bool}
 */

ApiWorksheet.prototype.GetVisible = function () { return true; };


/**
 * Set the state of sheet visibility.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {bool} isVisible - Specify if the sheet is visible or not.
 */

ApiWorksheet.prototype.SetVisible = function (isVisible) {};


/**
 * Make the current sheet the active sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 */

ApiWorksheet.prototype.SetActive = function () {};


/**
 * Return an object that represents the active cell.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetActiveCell = function () { return new ApiRange(); };


/**
 * Return an object that represents the selected range.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetSelection = function () { return new ApiRange(); };


/**
 * Return an ApiRange that represents all the cells on the worksheet (not just the cells that are currently in use).
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} row - The row number or the cell number (if only row is defined)
 * @param {number} col - The column number
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetCells = function (row, col) { return new ApiRange(); };


/**
 * Return an ApiRange that represents all the cells on the rows range.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string | number} value - Specify the rows range in the string or number format.
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetRows = function (value) { return new ApiRange(); };


/**
 * Return an ApiRange that represents all the cells on the columns range.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sRange - Specify the columns range in the string format.
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetCols = function (sRange) { return new ApiRange(); };


/**
 * Return an ApiRange that represents the used range on the specified worksheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetUsedRange = function () { return new ApiRange(); };


/**
 * Get a sheet name.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {string}
 */

ApiWorksheet.prototype.GetName = function () { return ""; };


/**
 * Set a name to the current active sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sName - The name which will be displayed for the current sheet at the sheet tab.
 */

ApiWorksheet.prototype.SetName = function (sName) {};


/**
 * Get a sheet index.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiWorksheet.prototype.GetIndex = function () { return 0; };


/**
 * Returns an object that represents the selected range of the current sheet. Can be a single cell - <b>A1</b>, or cells
 * from a single row - <b>A1:E1</b>, or cells from a single column - <b>A1:A10</b>, or cells from several rows and columns - <b>A1:E10</b>.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sRange - The range of cells from the current sheet.
 * @returns {ApiRange | null} - returns null if such a range does not exist.
 */

ApiWorksheet.prototype.GetRange = function (sRange) { return new ApiRange(); };


/**
 * Returns an object that represents the selected range of the current sheet using the <b>row/column</b> coordinates for the cell selection.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nRow - The number of the row to set the cell coordinates.
 * @param {number} nCol - The number of the column to set the cell coordinates.
 * @returns {ApiRange}
 */

ApiWorksheet.prototype.GetRangeByNumber = function (nRow, nCol) { return new ApiRange(); };


/**
 * Format the selected range of cells from the current sheet as a table (with the first row formatted as a header).
 * <note>As the first row is always formatted as a table header, you need to select at least two rows for the table to be formed correctly.</note>
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sRange - The range of cells from the current sheet which will be formatted as a table.
 */

ApiWorksheet.prototype.FormatAsTable = function (sRange) {};


/**
 * Set the width of the specified columns.
 * One unit of column width is equal to the width of one character in the Normal style. 
 * For proportional fonts, the width of the character 0 (zero) is used.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nColumn - The number of the column to set the width to.
 * @param {number} nWidth - The width of the column divided by 7 pixels.
 */

ApiWorksheet.prototype.SetColumnWidth = function (nColumn, nWidth) {};


/**
 * Set the height of the specified row measured in points. 
 * A point is 1/72 inch.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nRow - The number of the row to set the height to.
 * @param {number} nHeight - The height of the column measured in points.
 */

ApiWorksheet.prototype.SetRowHeight = function (nRow, nHeight) {};


/**
 * Specify whether the current sheet gridlines must be displayed or not.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {bool} isDisplayed - Specifies whether the current sheet gridlines must be displayed or not. The default value is <b>true</b>.
 */

ApiWorksheet.prototype.SetDisplayGridlines = function (isDisplayed) {};


/**
 * Specify whether the current sheet row/column headers must be displayed or not.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {bool} isDisplayed - Specifies whether the current sheet row/column headers must be displayed or not. The default value is <b>true</b>.
 */

ApiWorksheet.prototype.SetDisplayHeadings = function (isDisplayed) {};


/**
 * Set the left margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nPoints - The left margin size measured in points.
 */

ApiWorksheet.prototype.SetLeftMargin = function (nPoints) {};


/**
 * Get the left margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {number} - The left margin size measured in points.
 */

ApiWorksheet.prototype.GetLeftMargin = function () { return 0; };


/**
 * Set the right margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nPoints - The right margin size measured in points.
 */

ApiWorksheet.prototype.SetRightMargin = function (nPoints) {};


/**
 * Get the right margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {number} - The right margin size measured in points.
 */

ApiWorksheet.prototype.GetRightMargin = function () { return 0; };


/**
 * Set the top margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nPoints - The top margin size measured in points.
 */

ApiWorksheet.prototype.SetTopMargin = function (nPoints) {};


/**
 * Get the top margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {number} - The top margin size measured in points.
 */

ApiWorksheet.prototype.GetTopMargin = function () { return 0; };


/**
 * Set the bottom margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {number} nPoints - The bottom margin size measured in points.
 */

ApiWorksheet.prototype.SetBottomMargin = function (nPoints) {};


/**
 * Get the bottom margin of the sheet.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {number} - The bottom margin size measured in points.
 */

ApiWorksheet.prototype.GetBottomMargin = function () { return 0; };


/**
 * Set the page orientation.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {PageOrientation} sPageOrientation - The page orientation type.
 * */

ApiWorksheet.prototype.SetPageOrientation = function (sPageOrientation) {};


/**
 * Get the page orientation
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {PageOrientation}
 * */

ApiWorksheet.prototype.GetPageOrientation = function (){ return new PageOrientation(); };


/**
 * Get the page PrintHeadings property.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {bool} - True if row and column headings are printed on this page.
 * */

ApiWorksheet.prototype.GetPrintHeadings = function (){ return true; };


/**
 * Set the page PrintHeadings property.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {bool} bPrint - Defines if row and column headings will be printed on this page or not.
 * */

ApiWorksheet.prototype.SetPrintHeadings = function (bPrint){};


/**
 * Get the page PrintGridlines property.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {bool} - True if cell gridlines are printed on this page.
 * */

ApiWorksheet.prototype.GetPrintGridlines = function (){ return true; };


/**
 * Set the page PrintGridlines property.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {bool} bPrint - Defines if cell gridlines are printed on this page or not.
 * */

ApiWorksheet.prototype.SetPrintGridlines = function (bPrint){};


/**
 * Return an array of ApiName objects.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {ApiName[]}
 */

ApiWorksheet.prototype.GetDefNames = function () { return [new ApiName()]; };


/**
 * Return an ApiName.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} defName - The range name.
 * @returns {ApiName | null} - returns null if definition name doesn't exist.
 */

ApiWorksheet.prototype.GetDefName = function (defName) { return new ApiName(); };


/**
 * Define a new name for a range of cells.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sName - The range name.
 * @param {string} sRef  - Must contain the sheet name, followed by sign ! and a range of cells. 
 * Example: "Sheet1!$A$1:$B$2".  
 * @param {bool} isHidden - Defines if the range name is hidden or not.
 * @returns {Error | true} - returns error if sName or sRef are invalid.
 */

ApiWorksheet.prototype.AddDefName = function (sName, sRef, isHidden) { return new Error(); };


/**
 * Return an ApiComment.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @returns {ApiComment[]}
 */

ApiWorksheet.prototype.GetComments = function () { return [new ApiComment()]; };


/**
 * Delete an ApiWorksheet object.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 */

ApiWorksheet.prototype.Delete = function () {};


/**
 * Add a hyperlink to the specified range.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sRange - The range where the hyperlink will be added to.
 * @param {string} sAddress - The link address.
 * @param {string} ScreenTip - The screen tip text.
 * @param {string} sTextToDisplay - The link text that will be displayed on the sheet.
 * */

ApiWorksheet.prototype.SetHyperlink = function (sRange, sAddress, sScreenTip, sTextToDisplay){};


/**
 * Create a chart of the set type from the selected data range of the current sheet.
 * <note>Please note, that the horizontal nColOffset and vertical nRowOffset offsets are calculated within the limits of the specified nFromCol column and nFromRow
 * row cell only. If this value exceeds the cell width or height, another vertical/horizontal position will be set.</note>
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sDataRange - The selected cell range which will be used to get the data for the chart, formed specifically and including the sheet name.
 * @param {bool} bInRows - Specifies whether to take the data from the rows or from the columns. If true the data from the rows will be used.
 * @param {ChartType} sType - The chart type used for the chart display.
 * @param {number} nStyleIndex - The chart color style index (can be <b>1 - 48</b>, as described in OOXML specification).
 * @param {EMU} nExtX - The chart width in English measure units
 * @param {EMU} nExtY - The chart height in English measure units.
 * @param {number} nFromCol - The number of the column where the beginning of the chart will be placed.
 * @param {EMU} nColOffset - The offset from the nFromCol column to the left part of the chart measured in English measure units.
 * @param {number} nFromRow - The number of the row where the beginning of the chart will be placed.
 * @param {EMU} nRowOffset - The offset from the nFromRow row to the upper part of the chart measured in English measure units.
 * @returns {ApiChart}
 */

ApiWorksheet.prototype.AddChart ={ return new ApiChart(); };


/**
 * Adds the shape to the current sheet with the parameters specified.
 * <note>Please note, that the horizontal <code>nColOffset</code> and vertical <code>nRowOffset</code> offsets are
 * calculated within the limits of the specified <code>nFromCol</code> column and <code>nFromRow</code> row cell
 * only. If this value exceeds the cell width or height, another vertical/horizontal position will be set.</note>
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {ShapeType} [sType="rect"] - The shape type which specifies the preset shape geometry.
 * @param {EMU} nWidth - The shape width in English measure units.
 * @param {EMU} nHeight - The shape height in English measure units.
 * @param {ApiFill} oFill - The color or pattern used to fill the shape.
 * @param {ApiStroke} oStroke - The stroke used to create the element shadow.
 * @param {number} nFromCol - The number of the column where the beginning of the shape will be placed.
 * @param {EMU} nColOffset - The offset from the <code>nFromCol</code> column to the left part of the shape measured in English measure units.
 * @param {number} nFromRow - The number of the row where the beginning of the shape will be placed.
 * @param {EMU} nRowOffset - The offset from the <code>nFromRow</code> row to the upper part of the shape measured in English measure units.
 * @returns {ApiShape}
 * */

ApiWorksheet.prototype.AddShape = function(sType, nWidth, nHeight, oFill, oStroke, nFromCol, nColOffset, nFromRow, nRowOffset){ return new ApiShape(); };


/**
 * Adds the image to the current sheet with the parameters specified.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sImageSrc - The image source where the image to be inserted should be taken from (currently only internet URL or Base64 encoded images are supported).
 * @param {EMU} nWidth - The image width in English measure units.
 * @param {EMU} nHeight - The image height in English measure units.
 * @param {number} nFromCol - The number of the column where the beginning of the image will be placed.
 * @param {EMU} nColOffset - The offset from the <code>nFromCol</code> column to the left part of the image measured in English measure units.
 * @param {number} nFromRow - The number of the row where the beginning of the image will be placed.
 * @param {EMU} nRowOffset - The offset from the <code>nFromRow</code> row to the upper part of the image measured in English measure units.
 * @returns {ApiImage}
 */

ApiWorksheet.prototype.AddImage = function(sImageSrc, nWidth, nHeight, nFromCol, nColOffset, nFromRow, nRowOffset){ return new ApiImage(); };


/**
 * Replace current image.
 * @memberof ApiWorksheet
 * @typeofeditors ["CSE"]
 * @param {string} sImageSrc - The image source where the image to be inserted should be taken from (currently only internet URL or Base64 encoded images are supported).
 * @param {EMU} nWidth - The image width in English measure units.
 * @param {EMU} nHeight - The image height in English measure units.
 */

ApiWorksheet.prototype.ReplaceCurrentImage = function(sImageUrl, Width, Height){};


/**
 * Specifies the cell border position.
 * @typedef {("DiagonalDown" | "DiagonalUp" | "Bottom" | "Left" | "Right" | "Top" | "InsideHorizontal" | "InsideVertical")} BordersIndex
 */



/**
 * Specifies the line style used to form the cell border.
 * @typedef {("None" | "Double" | "Hair" | "DashDotDot" | "DashDot" | "Dotted" | "Dashed" | "Thin" | "MediumDashDotDot" | "SlantDashDot" | "MediumDashDot" | "MediumDashed" | "Medium" | "Thick")} LineStyle
 */



/**
 * Specifies the range angle.
 * @typedef {("xlDownward" | "xlHorizontal" | "xlUpward" | "xlVertical")} Angle
 */



/**
 * Specifies the direction of end in the specified range.
 * @typedef {("xlUp" | "xlDown" | "xlToRight" | "xlToLeft")} Direction
 */



/**
 * Get the type of this class.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {"range"}
 */

ApiRange.prototype.GetClassType = function(){ return ""; };


/**
 * Get the row number for the selected cell.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiRange.prototype.GetRow = function () { return 0; };


/**
 * Get the column number for the selected cell.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiRange.prototype.GetCol = function () { return 0; };


/**
 * Clear the entire object.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 */

ApiRange.prototype.Clear = function () {};


/**
 * Return a Range object that represents the rows in the specified range. If the specified row is outside the Range object, a new Range will be returned that represents the cells between the columns of the original range in the specified row.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} nRow - The row number (starts counting from 1, the 0 value returns an error).
 * @returns {ApiRange}
 */

ApiRange.prototype.GetRows = function (nRow) { return new ApiRange(); };


/**
 * Returns a Range object that represents all the cells on the columns range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} nCol - The column number. * 
 * @returns {ApiRange}
 */

ApiRange.prototype.GetCols = function (nCol) { return new ApiRange(); };


/**
 * Returns a Range object that represents the end in the specified direction in the specified range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {Direction} direction - The direction of end in the specified range. *
 * @returns {ApiRange}
 */

ApiRange.prototype.End = function (direction) { return new ApiRange(); };


/**
 * Returns a Range object that represents all the cells in the specified range or a specified cell.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} row - The row number or the cell number (if only row is defined)
 * @param {number} col - The column number
 * @returns {ApiRange}
 */

ApiRange.prototype.GetCells = function (row, col) { return new ApiRange(); };


/**
 * Set cell offset
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} nRow - The row number.
 * @param {number} nCol - The column number.
 */

ApiRange.prototype.SetOffset = function (nRow, nCol) {};


/**
 * Get cell address.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} RowAbs - Defines if the link to the row is absolute or not.
 * @param {bool} ColAbs - Defines if the link to the column is absolute or not.
 * @param {string} RefStyle - The reference style.
 * @param {bool} External - Defines if the range is in the current file or not.
 * @param {range} RelativeTo - The range which the current range is relative to.
 * @returns {string | null} - returns address of range as string. 
 */

ApiRange.prototype.GetAddress = function (RowAbs, ColAbs, RefStyle, External, RelativeTo) { return ""; };


/**
 * Get rows or columns count.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiRange.prototype.GetCount = function () { return 0; };


/**
 * Get the value of the first cell in range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {string}
 */

ApiRange.prototype.GetValue = function () { return ""; };


/**
 * Set the value for the current cell or a cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {string} sValue - The general value for the cell or cell range in string format.
 * @returns {bool} - returns false if such a range does not exist.
 */

ApiRange.prototype.SetValue = function (sValue) { return true; };


/**
 * Get the formula of the first cell in range.
 * @typeofeditors ["CSE"]
 * @memberof ApiRange
 * @returns {string} - return Value2 property (value without format) if formula doesn't exist.  
 */

ApiRange.prototype.GetFormula = function () { return ""; };


/**
 * Get the Value2 property (value without format) of the first cell in range.
 * @typeofeditors ["CSE"]
 * @memberof ApiRange
 * @returns {string} 
 */

ApiRange.prototype.GetValue2 = function () { return ""; };


/**
 * Get the text of the first cell in range.
 * @typeofeditors ["CSE"]
 * @memberof ApiRange
 * @returns {string} 
 */

ApiRange.prototype.GetText = function () { return ""; };


/**
 * Set the text color for the current cell range with the previously created color object.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {ApiColor} oColor - The color object previously created to set the color to the text in the cell / cell range.
 */

ApiRange.prototype.SetFontColor = function (oColor) {};


/**
 * Get the value hiding property.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {bool} - returns true if the values in the range specified are hidden.
 */

ApiRange.prototype.GetHidden = function () { return true; };


/**
 * Set the value hiding property.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isHidden - Specifies if the values in the range specified are hidden or not.
 */

ApiRange.prototype.SetHidden = function (isHidden) {};


/**
 * Get columns width value.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {number}
 */

ApiRange.prototype.GetColumnWidth = function () { return 0; };


/**
 * Set the width of all the columns in the specified range.
 * One unit of column width is equal to the width of one character in the Normal style. 
 * For proportional fonts, the width of the character 0 (zero) is used. 
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} nWidth The width of the column divided by 7 pixels.
 */

ApiRange.prototype.SetColumnWidth = function (nWidth) {};


/**
 * Get row height value.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {pt} The row height in the range specified, measured in points.
 */

ApiRange.prototype.GetRowHeight = function () { return new pt(); };


/**
* Set row height value.
* @memberof ApiRange
* @typeofeditors ["CSE"]
* @param {pt} nHeight The row height in the range specified, measured in points.
 */

ApiRange.prototype.SetRowHeight = function (nHeight) {};


/**
 * Set the font size for the characters of the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {number} nSize - The font size value measured in points.
 */

ApiRange.prototype.SetFontSize = function (nSize) {};


/**
 * Set the specified font family as the font name for the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {string} sName - The font family name used for the current cell range.
 */

ApiRange.prototype.SetFontName = function (sName) {};


/**
 * Set the vertical alignment of the text in the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {'center' | 'bottom' | 'top' | 'distributed' | 'justify'} sAligment - The parameters will define the vertical alignment that will be applied to the cell contents.
 * @returns {bool} - return false if sAligment doesn't exist.
 */

ApiRange.prototype.SetAlignVertical = function (sAligment) { return true; };


/**
 * Set the horizontal alignment of the text in the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {'left' | 'right' | 'center' | 'justify'} sAlignment - Set the horizontal alignment of the text in the current cell range.
 * @returns {bool} - return false if sAligment doesn't exist.
 */

ApiRange.prototype.SetAlignHorizontal = function (sAlignment) { return true; };


/**
 * Set the bold property to the text characters in the current cell or cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isBold - Specifies that the contents of this cell / cell range are displayed bold.
 */

ApiRange.prototype.SetBold = function (isBold) {};


/**
 * Set the italic property to the text characters in the current cell or cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isItalic - Specifies that the contents of this cell / cell range are displayed italicized.
 */

ApiRange.prototype.SetItalic = function (isItalic) {};


/**
 * Specify that the contents of this cell / cell range are displayed along with a line appearing directly below the character.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'} undelineType - Specifies the type of the
 * line displayed under the characters. The following values are available:
 * * <b>"none"</b> - for no underlining;
 * * <b>"single"</b> - for the single line underlining the cell contents;
 * * <b>"singleAccounting"</b> - for the single line underlining the cell contents but not protruding beyond the cell borders;
 * * <b>"double"</b> - for the double line underlining the cell contents;
 * * <b>"doubleAccounting"</b> - for the double line underlining the cell contents but not protruding beyond the cell borders.
 */

ApiRange.prototype.SetUnderline = function (undelineType) {};


/**
 * Specify that the contents of the cell / cell range are displayed with a single horizontal line through the center of the contents.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isStrikeout - Specifies if the contents of the current cell / cell range are displayed struck through.
 */

ApiRange.prototype.SetStrikeout = function (isStrikeout) {};


/**
 * Specify whether the words in the cell must be wrapped to fit the cell size or not.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isWrap - When set to <b>true</b> the words in the cell will be wrapped to fit the cell size.
 */

ApiRange.prototype.SetWrap = function (isWrap) {};


/**
 * Return the information about the wrapping cell style.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {bool}
 */

ApiRange.prototype.GetWrapText = function () { return true; };


/**
 * Set the background color for the current cell range with the previously created color object.
 * Set 'No Fill' when previously created color object is null.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {ApiColor} oColor - The color object previously created to set the color to the background in the cell / cell range.
 */

ApiRange.prototype.SetFillColor = function (oColor) {};


/**
 * Get the background color for the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {ApiColor|'No Fill'} - return 'No Fill' when the color to the background in the cell / cell range is null.
 */

ApiRange.prototype.GetFillColor = function () { return new ApiColor(); };


/**
 * Specify whether the number in the cell should be treated like number, currency, date, time, etc. or just like text.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {string} sFormat - Specifies the mask applied to the number in the cell.
 */

ApiRange.prototype.SetNumberFormat = function (sFormat) {};


/**
 * Set the border to the cell / cell range with the parameters specified.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {BordersIndex} bordersIndex - Specifies the cell border position.
 * @param {LineStyle} lineStyle - Specifies the line style used to form the cell border.
 * @param {ApiColor} oColor - The color object previously created to set the color to the cell border.
 */

ApiRange.prototype.SetBorders = function (bordersIndex, lineStyle, oColor) {};


/**
 * Merge the selected cell range into a single cell or a cell row.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {bool} isAcross - When set to <b>true</b>, the cells within the selected range will be merged along the rows,
 * but remain split in the columns. When set to <b>false</b>, the whole selected range of cells will be merged into a single cell.
 */

ApiRange.prototype.Merge = function (isAcross) {};


/**
 * Split the selected merged cell range into single cells.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 */

ApiRange.prototype.UnMerge = function () {};


/**
 * Return one cell or cells from the merge area.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

return new ApiRange((bb) ? AscCommonExcel.Range.prototype.createFromBBox(this.range.worksheet, bb) : this.range);{ return new ApiRange(); };


/**
 * Execute a provided function once for each cell.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {Function} fCallback - A function which will be executed for each cell.
 */

ApiRange.prototype.ForEach = function (fCallback) {};


/**
 * Add a comment to the range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {string} sText - The comment text.
 * @returns {bool} - returns false if comment can't be added.
 */

ApiRange.prototype.AddComment = function (sText) { return true; };


/**
 * Return a Worksheet object that represents the worksheet containing the specified range. Read-only.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {ApiWorksheet}
 */

ApiRange.prototype.GetWorksheet = function () { return new ApiWorksheet(); };


/**
 * Return an ApiName.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {ApiName}
 */

ApiRange.prototype.GetDefName = function () { return new ApiName(); };


/**
 * Return an ApiComment.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {ApiComment | null} - returns null if range does not consist of one cell.
 */

ApiRange.prototype.GetComment = function () { return new ApiComment(); };


/**
 * Select the object.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 */

ApiRange.prototype.Select = function () {};


/**
 * Returns the range angle.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @returns {Angle}
 */

ApiRange.prototype.GetOrientation = function() { return new Angle(); };


/**
 * Sets an angle to the current cell range.
 * @memberof ApiRange
 * @typeofeditors ["CSE"]
 * @param {Angle} angle - Specifies the range angle.
 */

ApiRange.prototype.SetOrientation = function(angle) {};


/**
 * Get the type of the class based on this base class.
 * @memberof ApiDrawing
 * @typeofeditors ["CSE"]
 * @returns {"drawing"}
 */

ApiDrawing.prototype.GetClassType = function(){ return ""; };


/**
 * Set the size of the object (image, shape, chart) bounding box.
 * @memberof ApiDrawing
 * @typeofeditors ["CSE"]
 * @param {EMU} nWidth - The object width measured in English measure units.
 * @param {EMU} nHeight - The object height measured in English measure units.
 */

ApiDrawing.prototype.SetSize = function(nWidth, nHeight){};


/**
 * Change the position for the drawing object.
 * <note>Please note, that the horizontal nColOffset and vertical nRowOffset offsets are calculated within the limits of
 * the specified nFromCol column and nFromRow row cell only. If this value exceeds the cell width or height, another vertical/horizontal position will be set.</note>
 * @memberof ApiDrawing
 * @typeofeditors ["CSE"]
 * @param {number} nFromCol - The number of the column where the beginning of the drawing object will be placed.
 * @param {EMU} nColOffset - The offset from the nFromCol column to the left part of the drawing object measured in English measure units.
 * @param {number} nFromRow - The number of the row where the beginning of the drawing object will be placed.
 * @param {EMU} nRowOffset - The offset from the nFromRow row to the upper part of the drawing object measured in English measure units.
* */

ApiDrawing.prototype.SetPosition = function(nFromCol, nColOffset, nFromRow, nRowOffset){};


/**
 * Get the type of this class.
 * @memberof ApiImage
 * @typeofeditors ["CDE", "CSE"]
 * @returns {"image"}
 */

ApiImage.prototype.GetClassType = function(){ return ""; };


/**
 * Get the type of this class.
 * @memberof ApiShape
 * @typeofeditors ["CSE"]
 * @returns {"shape"}
 */

ApiShape.prototype.GetClassType = function(){ return ""; };


/**
 * Get the shape inner contents where a paragraph or text runs can be inserted. 
 * @memberof ApiShape
 * @typeofeditors ["CSE"]
 * @returns {ApiDocumentContent}
 */

ApiShape.prototype.GetDocContent = function(){ return new ApiDocumentContent(); };


/**
 * Get the shape inner contents where a paragraph or text runs can be inserted. 
 * @memberof ApiShape
 * @typeofeditors ["CSE"]
 * @returns {ApiDocumentContent}
 */

ApiShape.prototype.GetContent = function(){ return new ApiDocumentContent(); };


/**
 * Set the vertical alignment for the shape content where a paragraph or text runs can be inserted.
 * @memberof ApiShape
 * @typeofeditors ["CSE"]
 * @param {"top" | "center" | "bottom" } sVerticalAlign - The vertical alignment type for the shape inner contents.
 * @returns {bool} - returns false if shape or aligment doesn't exist. 
 */

ApiShape.prototype.SetVerticalTextAlign = function(sVerticalAlign){ return true; };


/**
 * Get the type of this class.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @returns {"chart"}
 */

ApiChart.prototype.GetClassType = function(){ return ""; };


/**
 *  Specify the chart title.
 *  @memberof ApiChart
 *  @typeofeditors ["CSE"]
 *  @param {string} sTitle - The title which will be displayed for the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the chart title is written in bold font or not.
 */

ApiChart.prototype.SetTitle = function (sTitle, nFontSize, bIsBold){};


/**
 *  Specify the chart horizontal axis title.
 *  @memberof ApiChart
 *  @typeofeditors ["CSE"]
 *  @param {string} sTitle - The title which will be displayed for the horizontal axis of the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the horizontal axis title is written in bold font or not.
 * */

ApiChart.prototype.SetHorAxisTitle = function (sTitle, nFontSize, bIsBold){};


/**
 *  Specify the chart vertical axis title.
 *  @memberof ApiChart
 *  @typeofeditors ["CSE"]
 *  @param {string} sTitle - The title which will be displayed for the vertical axis of the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the vertical axis title is written in bold font or not.
 * */

ApiChart.prototype.SetVerAxisTitle = function (sTitle, nFontSize, bIsBold){};


/**
 * Specify the direction of the data displayed on the vertical axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {bool} bIsMinMax - The <code>true</code> value will set the normal data direction for the vertical axis (from minimum to maximum).
 * The <code>false</code> value will set the inverted data direction for the vertical axis (from maximum to minimum).
 * */

ApiChart.prototype.SetVerAxisOrientation = function(bIsMinMax){};


/**
 * Specify major tick mark for horizontal axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickMark} sTickMark - The type of tick mark appearance.
 * */

ApiChart.prototype.SetHorAxisMajorTickMark = function(sTickMark){};


/**
 * Specify minor tick mark for horizontal axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickMark} sTickMark - The type of tick mark appearance.
 * */

ApiChart.prototype.SetHorAxisMinorTickMark = function(sTickMark){};


/**
 * Specify major tick mark for vertical axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickMark} sTickMark - The type of tick mark appearance.
 * */

ApiChart.prototype.SetVertAxisMajorTickMark = function(sTickMark){};


/**
 * Specify minor tick mark for vertical axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickMark} sTickMark - The type of tick mark appearance.
 * */

ApiChart.prototype.SetVertAxisMinorTickMark = function(sTickMark){};


/**
 * Specify the direction of the data displayed on the horizontal axis.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {bool} bIsMinMax - The <code>true</code> value will set the normal data direction for the horizontal axis
 * (from minimum to maximum). The <code>false</code> value will set the inverted data direction for the horizontal axis (from maximum to minimum).
 * */

ApiChart.prototype.SetHorAxisOrientation = function(bIsMinMax){};


/**
 * Specify the chart legend position.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {"left" | "top" | "right" | "bottom" | "none"} sLegendPos - The position of the chart legend inside the chart window.
 * */

ApiChart.prototype.SetLegendPos = function(sLegendPos){};


/**
 * Specify the legend font size.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {pt} nFontSize - The text size value measured in points.
 * */

ApiChart.prototype.SetLegendFontSize = function(nFontSize){};


/**
 * Specify which chart data labels are shown for the chart.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {bool} bShowSerName - Whether to show or hide the source table column names used for the data which the chart will be build from.
 * @param {bool} bShowCatName - Whether to show or hide the source table row names used for the data which the chart will be build from.
 * @param {bool} bShowVal - Whether to show or hide the chart data values.
 * @param {bool} bShowPercent - Whether to show or hide the percent for the data values (works with stacked chart types).
 * */

ApiChart.prototype.SetShowDataLabels = function(bShowSerName, bShowCatName, bShowVal, bShowPercent){};


/**
 * Spicify the show options for data labels.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {number} nSeriesIndex - The series index from the array of the data used to build the chart from.
 * @param {number} nPointIndex - The point index from this series.
 * @param {bool} bShowSerName - Whether to show or hide the source table column names used for the data which the chart will be build from.
 * @param {bool} bShowCatName - Whether to show or hide the source table row names used for the data which the chart will be build from.
 * @param {bool} bShowVal - Whether to show or hide the chart data values.
 * @param {bool} bShowPercent - Whether to show or hide the percent for the data values (works with stacked chart types).
 * */

ApiChart.prototype.SetShowPointDataLabel = function(nSeriesIndex, nPointIndex, bShowSerName, bShowCatName, bShowVal, bShowPercent){};


/**
 * Set the possible values for the position of the chart tick labels in relation to the main vertical label or the chart data values.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickLabelPosition} sTickLabelPosition - The type for the position of chart vertical tick labels.
 * */

ApiChart.prototype.SetVertAxisTickLabelPosition = function(sTickLabelPosition){};


/**
 * Set the possible values for the position of the chart tick labels in relation to the main horizontal label or the chart data values.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {TickLabelPosition} sTickLabelPosition - The type for the position of chart horizontal tick labels.
 * */

ApiChart.prototype.SetHorAxisTickLabelPosition = function(sTickLabelPosition){};


/**
 * Specify major vertical gridline's visual properties.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {?ApiStroke} oStroke - The stroke used to create the element shadow.
 * */

ApiChart.prototype.SetMajorVerticalGridlines = function(oStroke){};


/**
 * Specify minor vertical gridline's visual properties.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {?ApiStroke} oStroke - The stroke used to create the element shadow.
 * */

ApiChart.prototype.SetMinorVerticalGridlines = function(oStroke){};


/**
 * Specify major horizontal gridline's visual properties.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {?ApiStroke} oStroke - The stroke used to create the element shadow.
 * */

ApiChart.prototype.SetMajorHorizontalGridlines = function(oStroke){};


/**
 * Specify minor vertical gridline's visual properties.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {?ApiStroke} oStroke - The stroke used to create the element shadow.
 */

ApiChart.prototype.SetMinorHorizontalGridlines = function(oStroke){};


/**
 * Specify font size for the horizontal axis labels.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {pt} nFontSize - The text size value measured in points.
*/

ApiChart.prototype.SetHorAxisLablesFontSize = function(nFontSize){};


/**
 * Specify font size for the vertical axis labels.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {pt} nFontSize - The text size value measured in points.
*/

ApiChart.prototype.SetVertAxisLablesFontSize = function(nFontSize){};


/**
 * Apply set of visual settings to the chart.
 * @memberof ApiChart
 * @typeofeditors ["CSE"]
 * @param {number} nStyleIndex - The style index that will be set to the current chart.
*/

ApiChart.prototype.ApplyChartStyle = function(nStyleIndex){};


/**
 * Get the type of this class.
 * @memberof ApiColor
 * @typeofeditors ["CSE"]
 * @returns {"color"}
 */

ApiColor.prototype.GetClassType = function () { return ""; };


/**
 * Return a String value representing the object name.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 * @returns {string} 
 */

ApiName.prototype.GetName = function () { return ""; };


/**
 * Set a String value representing the object name.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 * @param {string} sName - New name for range.
 * @returns {Error | true} - returns error if sName is invalid.
 */

ApiName.prototype.SetName = function (sName) { return new Error(); };


/**
 * Delete the DefName object.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 */

ApiName.prototype.Delete = function () {};


/**
 * Set the formula that the name is defined to refer to.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 * @param {string} sRef- Must contain the sheet name, followed by sign ! and a range of cells. 
 * Example: "Sheet1!$A$1:$B$2".
 */

ApiName.prototype.SetRefersTo = function (sRef) {};


/**
 * Return the formula that the name is defined to refer to.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 * @returns {string} 
 */

ApiName.prototype.GetRefersTo = function () { return ""; };


/**
 * Return an ApiRange object by reference.
 * @memberof ApiName
 * @typeofeditors ["CSE"]
 * @returns {ApiRange}
 */

ApiName.prototype.GetRefersToRange = function () { return new ApiRange(); };


/**
 * Return the comment text.
 * @memberof ApiComment
 * @typeofeditors ["CSE"]
 * @returns {string}
 */

ApiComment.prototype.GetText = function () { return ""; };


/**
 * Delete an ApiComment object.
 * @memberof ApiComment
 * @typeofeditors ["CSE"]
 */

ApiComment.prototype.Delete = function () {};



