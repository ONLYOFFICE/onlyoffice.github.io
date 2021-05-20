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
 * Class represents a continuous region in a document. 
 * Each Range object is determined by the position of the start and end characters
 * @param oElement - may be Document, Table, Paragraph, Run, Hyperlink
 * @param {Number} Start - start element of Range in current Element
 * @param {Number} End - end element of Range in current Element
 * @constructor
 */
function ApiRange(oElement, Start, End){}
ApiRange.prototype.constructor = ApiRange;

/**
 * Get the type of this class.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @returns {"range"}
 */
ApiRange.prototype.GetClassType = function(){ return ""; };

/**
 * Get a paragraph from all paragraphs that are in the range
 * @param {Number} nPos - position 
 * @returns {ApiParagraph | null} - returns null if position is invalid.
 */
ApiRange.prototype.GetParagraph = function(nPos){ return new ApiParagraph(); };

/**
 * Added text in the specified position
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {String} sText
 * @param {string} [sPosition = "after"] - can be "before" or "after"
 * @returns {bool} - returns false if range is empty or sText isn't text.
 */
ApiRange.prototype.AddText = function(sText, sPosition){ return true; };

/**
 * Added the bookmark to the specified range
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {String} sName
 * @returns {bool} - returns false if range is empty.
 */
ApiRange.prototype.AddBookmark = function(sName){ return true; };

/**
 * Add a hyperlink to a range. 
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {string} sLink - link to be add.
 * @param {string} sScreenTipText - ScreenTip text
 * @returns {ApiHyperlink | null}  - returns null if range contains more then one paragraph or sLink is invalid. 
 */
ApiRange.prototype.AddHyperlink = function(sLink, sScreenTipText){ return new ApiHyperlink(); };

/**
 * Get text in the specified range
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @returns {String} - returns "" if range is empty.
 */
ApiRange.prototype.GetText = function(){ return ""; };

/**
 * Gets a collection of paragraphs that represents all paragraphs in the specified range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @returns {ApiParagraph[]}
 */
ApiRange.prototype.GetAllParagraphs = function(){ return [new ApiParagraph()]; };

/**
 * Set the selection to the specified range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {bool} [bUpdate = true]
 * @typeofeditors ["CDE"]
 */
ApiRange.prototype.Select = function(bUpdate){};

/**
 * Returns a new range that goes beyond that range in any direction and spans a different range. The current range has not changed. Throws an error if the two ranges do not have a union.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {ApiRange} oRange 
 * @returns {ApiRange | null} - returns null if can't expand. 
 */
ApiRange.prototype.ExpandTo = function(oRange){ return new ApiRange(); };

/**
 * Returns a new range as the intersection of this range with another range. The current range has not changed. Throws an error if the two ranges do not overlap or are not adjacent.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {ApiRange} oRange 
 * @returns {ApiRange | null} - returns null if can't intersect.
 */
ApiRange.prototype.IntersectWith = function(oRange){ return new ApiRange(); };

/**
 * Set the bold property to the text character.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {bool} isBold - Specifies that the contents of this Range are displayed bold.
 * @returns {ApiRange | null} - returns null if can't apply bold.
 */
ApiRange.prototype.SetBold = function(isBold){ return new ApiRange(); };

/**
 * Specify that any lowercase characters in this text Range are formatted for display only as their capital letter character equivalents.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {bool} isCaps - Specifies that the contents of the current Range are displayed capitalized.
 * @returns {ApiRange | null} - returns null if can't apply caps.
 */
ApiRange.prototype.SetCaps = function(isCaps){ return new ApiRange(); };

/**
 * Set the text color for the current text Range in the RGB format.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiRange | null} - returns null if can't apply color.
 */
ApiRange.prototype.SetColor = function(r, g, b, isAuto){ return new ApiRange(); };

/**
 * Specify that the contents of this Range is displayed with two horizontal lines through each character displayed on the line.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {boolean} isDoubleStrikeout - Specifies that the contents of the current Range are displayed double struck through.
 * @returns {ApiRange | null} - returns null if can't apply double strikeout.
 */
ApiRange.prototype.SetDoubleStrikeout = function(isDoubleStrikeout){ return new ApiRange(); };

/**
 * Specify a highlighting color in the RGB format which is applied as a background for the contents of the current Range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {bool} [isNone=false] If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiRange | null} - returns null if can't apply highlight.
 */
ApiRange.prototype.SetHighlight = function(r, g, b, isNone){ return new ApiRange(); };

/**
 * Specify the shading applied to the contents of the current text Range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type applied to the contents of the current text Range.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @returns {ApiRange | null} - returns null if can't apply shadow.
 */
ApiRange.prototype.SetShd = function(sType, r, g, b){ return new ApiRange(); };

/**
 * Set the italic property to the text character.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {boolean} isItalic - Specifies that the contents of the current Range are displayed italicized.
 * @returns {ApiRange | null} - returns null if can't apply italic.
 */
ApiRange.prototype.SetItalic = function(isItalic){ return new ApiRange(); };

/**
 * Specify that the contents of this Range are displayed with a single horizontal line through the center of the line.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {boolean} isStrikeout - Specifies that the contents of the current Range are displayed struck through.
 * @returns {ApiRange | null} - returns null if can't apply strikeout.
 */
ApiRange.prototype.SetStrikeout = function(isStrikeout){ return new ApiRange(); };

/**
 * Specify that all small letter characters in this text Range are formatted for display only as their capital
 * letter character equivalents in a font size two points smaller than the actual font size specified for this text.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {boolean} isSmallCaps - Specifies that the contents of the current Range are displayed capitalized two points smaller.
 * @returns {ApiRange | null} - returns null if can't apply small caps.
 */
ApiRange.prototype.SetSmallCaps = function(isSmallCaps){ return new ApiRange(); };

/**
 * Set text spacing measured in twentieths of a point.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {twips} nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
 * @returns {ApiRange | null} - returns null if can't apply spacing.
 */
ApiRange.prototype.SetSpacing = function(nSpacing){ return new ApiRange(); };

/**
 * Specify that the contents of this Range are displayed along with a line appearing directly below the character
 * (less than all the spacing above and below the characters on the line).
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {boolean} isUnderline - Specifies that the contents of the current Range are displayed underlined.
 * @returns {ApiRange | null} - returns null if can't apply underline.
 */
ApiRange.prototype.SetUnderline = function(isUnderline){ return new ApiRange(); };

/**
 * Specify the alignment which will be applied to the contents of this Range in relation to the default appearance of the Range text:
 * * <b>"baseline"</b> - the characters in the current text Range will be aligned by the default text baseline.
 * * <b>"subscript"</b> - the characters in the current text Range will be aligned below the default text baseline.
 * * <b>"superscript"</b> - the characters in the current text Range will be aligned above the default text baseline.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {("baseline" | "subscript" | "superscript")} sType - The vertical alignment type applied to the text contents.
 * @returns {ApiRange | null} - returns null if can't apply align.
 */
ApiRange.prototype.SetVertAlign = function(sType){ return new ApiRange(); };

/**
 * Specify the amount by which text is raised or lowered for this Range in relation to the default
 * baseline of the surrounding non-positioned text.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {hps} nPosition - Specifies a positive (raised text) or negative (lowered text)
 * measurement in half-points (1/144 of an inch).
 * @returns {ApiRange | null} - returns null if can't set position.
 */
ApiRange.prototype.SetPosition = function(nPosition){ return new ApiRange(); };

/**
 * Set the font size for the characters of the current text Range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {hps} nSize - The text size value measured in half-points (1/144 of an inch).
 * @returns {ApiRange | null} - returns null if can't set font size.
 */
ApiRange.prototype.SetFontSize = function(FontSize){ return new ApiRange(); };

/**
 * Set all 4 font slots with the specified font family.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {string} sFontFamily - The font family or families used for the current text Range.
 * @returns {ApiRange | null} - returns null if can't set font family.
 */
ApiRange.prototype.SetFontFamily = function(sFontFamily){ return new ApiRange(); };

/**
 * Set the style for the current Range
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {ApiStyle} oStyle - The style which must be applied to the text character.
 * @returns {ApiRange | null} - returns null if can't set style.
 */
ApiRange.prototype.SetStyle = function(oStyle){ return new ApiRange(); };

/**
 * Sets the text properties of the current Range.
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr}
 * @returns {ApiRange | null} - returns null if can't set text properties.
 */
ApiRange.prototype.SetTextPr = function(oTextPr){ return new ApiRange(); };

/**
 * Delete all contents of the current range
 * @memberof ApiRange
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if range is empty.
 */
ApiRange.prototype.Delete = function(){ return true; };

/**
 * Class representing a document.
 * @constructor
 * @extends {ApiDocumentContent}
 */
function ApiDocument(Document){}
ApiDocument.prototype = Object.create(ApiDocumentContent.prototype);
ApiDocument.prototype.constructor = ApiDocument;

/**
 * Class representing a paragraph properties.
 * @constructor
 */
function ApiParaPr(Parent, ParaPr){}

/**
 * Class representing paragraph bullet
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
 * Class representing a table properties.
 * @constructor
 */
function ApiTablePr(Parent, TablePr){}

/**
 * Class representing a table.
 * @constructor
 * @extends {ApiTablePr}
 */
function ApiTable(Table){}
ApiTable.prototype = Object.create(ApiTablePr.prototype);
ApiTable.prototype.constructor = ApiTable;

/**
 * Class representing a text properties.
 * @constructor
 */
function ApiTextPr(Parent, TextPr){}

/**
 * Class representing a small text block calling 'run'.
 * @constructor
 * @extends {ApiTextPr}
 */
function ApiRun(Run){}
ApiRun.prototype = Object.create(ApiTextPr.prototype);
ApiRun.prototype.constructor = ApiRun;

/**
 * Class representing a hyperlink of Paragraph
 * @constructor
 */
function ApiHyperlink(ParaHyperlink){}
ApiHyperlink.prototype.constructor = ApiHyperlink;

/**
 * Get the type of this class.
 * @memberof ApiHyperlink
 * @typeofeditors ["CDE"]
 * @returns {"hyperlink"}
 */
ApiHyperlink.prototype.GetClassType = function(){ return ""; };

/**
 * Sets the hyperlink address.
 * @typeofeditors ["CDE"]
 * @param {string} sLink - start character in current element
 * @returns {bool} 
 * */
ApiHyperlink.prototype.SetLink = function(sLink){ return true; };

/**
 * Sets the display text of the hyperlink.
 * @typeofeditors ["CDE"]
 * @param {string} sDisplay
 * @returns {bool} 
 * */
ApiHyperlink.prototype.SetDisplayedText = function(sDisplay){ return true; };

/**
 * Sets the screen tip text of the hyperlink.
 * @typeofeditors ["CDE"]
 * @param {string} sScreenTipText - start character in current element
 * @returns {bool} 
 * */
ApiHyperlink.prototype.SetScreenTipText = function(sScreenTipText){ return true; };

/**
 * Gets the link text of the hyperlink.
 * @typeofeditors ["CDE"]
 * @returns {string} 
 * */
ApiHyperlink.prototype.GetLinkedText = function(){ return ""; };

/**
 * Gets the displayed text of the hyperlink.
 * @typeofeditors ["CDE"]
 * @returns {string} 
 * */
ApiHyperlink.prototype.GetDisplayedText = function(){ return ""; };

/**
 * Gets the ScreenTip text of the hyperlink.
 * @typeofeditors ["CDE"]
 * @returns {string} 
 * */
ApiHyperlink.prototype.GetScreenTipText = function(){ return ""; };

/**
 * Get the element of the hyperlink using the position specified.
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
 * Sets default hyperlink style.
 * @typeofeditors ["CDE"]
 * @returns {bool} 
 * */
ApiHyperlink.prototype.SetDefaultStyle = function(){ return true; };

/**
 * Returns a Range object that represents the part of the document contained in the specified hyperlink.
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiHyperlink.prototype.GetRange = function(Start, End){ return new ApiRange(); };

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
 * Class representing a table row properties.
 * @constructor
 */
function ApiTableRowPr(Parent, RowPr){}

/**
 * Class representing a table row.
 * @constructor
 * @extends {ApiTableRowPr}
 */
function ApiTableRow(Row){}
ApiTableRow.prototype = Object.create(ApiTableRowPr.prototype);
ApiTableRow.prototype.constructor = ApiTableRow;

/**
 * Class representing a table cell proprties.
 * @constructor
 */
function ApiTableCellPr(Parent, CellPr){}

/**
 * Class representing a table cell.
 * @constructor
 * @extends {ApiTableCellPr}
 */
function ApiTableCell(Cell){}
ApiTableCell.prototype = Object.create(ApiTableCellPr.prototype);
ApiTableCell.prototype.constructor = ApiTableCell;

/**
 * Class representing a numbering properties.
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
 * Class representing a graphical object.
 * @constructor
 */
function ApiDrawing(Drawing){}

/**
 * Class representing a image.
 * @constructor
 */
function ApiImage(Image){}
ApiImage.prototype = Object.create(ApiDrawing.prototype);
ApiImage.prototype.constructor = ApiImage;

/**
 * Class representing a shape.
 * @constructor
 * */
function ApiShape(Shape){}
ApiShape.prototype = Object.create(ApiDrawing.prototype);
ApiShape.prototype.constructor = ApiShape;

/**
 * Class representing a Chart.
 * @constructor
 *
 */
function ApiChart(Chart){}
ApiChart.prototype = Object.create(ApiDrawing.prototype);
ApiChart.prototype.constructor = ApiChart;

/**
 * Class representing a base class for color types
 * @constructor
 */
function ApiUniColor(Unicolor){}

/**
 * Class representing RGB color
 * @constructor
 */
function ApiRGBColor(r, g, b){}
ApiRGBColor.prototype = Object.create(ApiUniColor.prototype);
ApiRGBColor.prototype.constructor = ApiRGBColor;

/**
 * Class representing a Scheme Color
 * @constructor
 */
function ApiSchemeColor(sColorId){}
ApiSchemeColor.prototype = Object.create(ApiUniColor.prototype);
ApiSchemeColor.prototype.constructor = ApiSchemeColor;

/**
 * Class representing a Preset Color
 * @constructor
 * */
function ApiPresetColor(sPresetColor){}
ApiPresetColor.prototype = Object.create(ApiUniColor.prototype);
ApiPresetColor.prototype.constructor = ApiPresetColor;

/**
 * Class represent a base class fill
 * @constructor
 * */
function ApiFill(UniFill){}

/**
 * Class represent a stroke class
 * @constructor
 */
function ApiStroke(oLn){}

/**
 * Class represent gradient stop
 * @constructor
 * */
function ApiGradientStop(oApiUniColor, pos){}

/**
 * Class represent a container for the elements of a paragraph
 * @constructor
 */
function ApiInlineLvlSdt(Sdt){}

/**
 * Class represent a container for the content of the document
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
 * A 60000th of a degree (5400000 = 90 degrees).
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
 * * **"topLeftCell"** - specifies that the table formatting applies to the top left cell.
 * * **"topRightCell"** - specifies that the table formatting applies to the top right cell.
 * * **"bottomLeftCell"** - specifies that the table formatting applies to the bottom left cell.
 * * **"bottomRightCell"** - specifies that the table formatting applies to the bottom right cell.
 * * **"firstRow"** - specifies that the table formatting applies to the first row.
 * * **"lastRow"** - specifies that the table formatting applies to the last row.
 * * **"firstColumn"** - specifies that the table formatting applies to the first column. Any subsequent row which is in *table header* ({@link ApiTableRowPr#SetTableHeader}) will also use this conditional format.
 * * **"lastColumn"** - specifies that the table formatting applies to the last column.
 * * **"bandedColumn"** - specifies that the table formatting applies to odd numbered groupings of rows.
 * * **"bandedColumnEven"** - specifies that the table formatting applies to even numbered groupings of rows.
 * * **"bandedRow"** - specifies that the table formatting applies to odd numbered groupings of columns.
 * * **"bandedRowEven"** - specifies that the table formatting applies to even numbered groupings of columns.
 * * **"wholeTable"** - specifies that the conditional formatting applies to the whole table.
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
 * Get the main document
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {ApiDocument}
 */
ApiInterface.prototype.GetDocument = function(){ return new ApiDocument(); };

/**
 * Create a new paragraph.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE"]
 * @returns {ApiParagraph}
 */
ApiInterface.prototype.CreateParagraph = function(){ return new ApiParagraph(); };

/**
 * Create a new paragraph.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {ApiParagraph}
 */
ApiInterface.prototype.CreateRange = function(oElement, Start, End){ return new ApiParagraph(); };

/**
 * Create a new table with a specified number of rows and columns.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {number} nCols - Number of columns.
 * @param {number} nRows - Number of rows.
 * @returns {ApiTable}
 */
ApiInterface.prototype.CreateTable = function(nCols, nRows){ return new ApiTable(); };

/**
 * Create a new smaller text block to be inserted to the current paragraph or table.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiInterface.prototype.CreateRun = function(){ return new ApiRun(); };

/**
 * Create a new hyperlink text block to be inserted to the current paragraph or table.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {string} sLink - link to 
 * @param {string} sDisplay - display text
 * @param {string} sScreenTipText - ScreenTip text
 * @returns {ApiHyperlink}
 */
ApiInterface.prototype.CreateHyperlink = function(sLink, sDisplay, sScreenTipText){ return new ApiHyperlink(); };

/**
 * Create an image with the parameters specified.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {string} sImageSrc - The image source where the image to be inserted should be taken from (currently only internet URL or Base64 encoded images are supported).
 * @param {EMU} nWidth - The image width in English measure units.
 * @param {EMU} nHeight - The image height in English measure units.
 * @returns {ApiImage}
 */
ApiInterface.prototype.CreateImage = function(sImageSrc, nWidth, nHeight){ return new ApiImage(); };

/**
 * Create a shape with the parameters specified.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {ShapeType} [sType="rect"] - The shape type which specifies the preset shape geometry.
 * @param {EMU} [nWidth = 914400] - The shape width in English measure units.
 * @param {EMU} [nHeight = 914400] - The shape height in English measure units.
 * @param {ApiFill} [oFill = Api.CreateNoFill()] - The color or pattern used to fill the shape.
 * @param {ApiStroke} [oStroke = Api.CreateStroke(0, Api.CreateNoFill())] - The stroke used to create the element shadow.
 * @returns {ApiShape}
 * */
ApiInterface.prototype.CreateShape = function(sType, nWidth, nHeight, oFill, oStroke){ return new ApiShape(); };

/**
 * Create a chart with the parameters specified.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {ChartType} [sType="bar"] - The chart type used for the chart display.
 * @param {Array} aSeries - The array of the data used to build the chart from.
 * @param {Array} aSeriesNames - The array of the names (the source table column names) used for the data which the chart will be build from.
 * @param {Array} aCatNames - The array of the names (the source table row names) used for the data which the chart will be build from.
 * @param {EMU} nWidth - The chart width in English measure units.
 * @param {EMU} nHeight - The chart height in English measure units.
 * @param {number} nStyleIndex - The chart color style index (can be 1 - 48, as described in OOXML specification).
 * @returns {ApiChart}
 * */
ApiInterface.prototype.CreateChart = function(sType, aSeries, aSeriesNames, aCatNames, nWidth, nHeight, nStyleIndex){ return new ApiChart(); };

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
 * Create a solid fill which allows to fill the object using a selected solid color as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiUniColor} oUniColor - The color used for the element fill.
 * @returns {ApiFill}
 * */
ApiInterface.prototype.CreateSolidFill = function(oUniColor){ return new ApiFill(); };

/**
 * Create a linear gradient fill which allows to fill the object using a selected linear gradient as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {Array} aGradientStop - The array of gradient color stops measured in 1000th of percent.
 * @param {PositiveFixedAngle} Angle - The angle measured in 60000th of a degree that will define the gradient direction.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreateLinearGradientFill = function(aGradientStop, Angle){ return new ApiFill(); };

/**
 * Create a radial gradient fill which allows to fill the object using a selected radial gradient as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {Array} aGradientStop - The array of gradient color stops measured in 1000th of percent.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreateRadialGradientFill = function(aGradientStop){ return new ApiFill(); };

/**
 * Create a pattern fill which allows to fill the object using a selected pattern as the object background.
 * @memberof ApiInterface
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {PatternType} sPatternType - The pattern type used for the fill selected from one of the available pattern types.
 * @param {ApiUniColor} BgColor - The background color used for the pattern creation.
 * @param {ApiUniColor} FgColor - The foreground color used for the pattern creation.
 * @returns {ApiFill}
 */
ApiInterface.prototype.CreatePatternFill = function(sPatternType, BgColor, FgColor){ return new ApiFill(); };

/**
 * Create a blip fill which allows to fill the object using a selected image as the object background.
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
 * Create a new inline container
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {ApiInlineLvlSdt}
 */
ApiInterface.prototype.CreateInlineLvlSdt = function(){ return new ApiInlineLvlSdt(); };

/**
 * Create a new block level container
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt}
 */
ApiInterface.prototype.CreateBlockLvlSdt = function(){ return new ApiBlockLvlSdt(); };

/**
 * Saves changes to the specified document.
 * @typeofeditors ["CDE"]
 * @memberof ApiInterface
 */
ApiInterface.prototype.Save = function () {};

/**
 * Loads data for the mail merge. 
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {String[][]} aList - mail merge data. The first element of the array is the array with names of the merge fields.
 * The rest of the array elements are arrays with values for the merge fields.
 * @typeofeditors ["CDE"]
 * @returns {bool}  
 */
ApiInterface.prototype.LoadMailMergeData = function(aList){ return true; };

/**
 * Gets the mail merge template doc.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {ApiDocumentContent}  
 */
ApiInterface.prototype.GetMailMergeTemplateDocContent = function(){ return new ApiDocumentContent(); };

/**
 * Gets the mail merge receptions count.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @returns {number}  
 */
ApiInterface.prototype.GetMailMergeReceptionsCount = function(){ return 0; };

/**
 * Replaces the content of the main document with the another document content.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {ApiDocumentContent} 
 */
ApiInterface.prototype.ReplaceDocumentContent = function(oApiDocumentContent){};

/**
 * Starts the mail merge process
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {number} nStartIndex
 * @param {number} nEndIndex
 * @param {bool} bAll - if true -> be mail merge all recipients 
 * @returns {bool}
 */
ApiInterface.prototype.MailMerge = function(nStartIndex, nEndIndex){ return true; };

/**
 * Get the type of this class.
 * @typeofeditors ["CDE"]
 * @returns {"unsupported"}
 */
ApiUnsupported.prototype.GetClassType = function(){ return ""; };

/**
 * Adds a comment to the desired element or array of elements.
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {Array | ApiParagraph | ApiDocument} oElement - may be Document, Paragraph or Run[]
 * @param {string} Comment - comment
 * @param {string} Autor - autor's name (not obligatory)
 * @returns {bool} - returns false if params are invalid.
 */
ApiInterface.prototype.AddComment = function(oElement, Comment, Autor){ return true; };

/**
 * Get the Run that is first in position
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {Array} Runs - Array of Runs
 * @returns {ApiRun | null} - returns null if param is invalid 
 */
ApiInterface.prototype.GetFirstRunInArray = function(arrRuns){ return new ApiRun(); };

/**
 * Get the Run that is last in position
 * @memberof ApiInterface
 * @typeofeditors ["CDE"]
 * @param {Array} Runs - Array of Runs
 * @returns {ApiRun | null} - returns null if param is invalid. 
 */
ApiInterface.prototype.GetLastRunInArray = function(arrRuns){ return new ApiRun(); };

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
 * @param {DocumentElement} oElement - The type of the element which will be pushed to the document.
 */
ApiDocumentContent.prototype.Push = function(oElement){};

/**
 * Remove all elements from the current document or from the current document element.
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
 * Returns a Range object that represents the part of the document contained in the document content.
 * @memberof ApiDocumentContent
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiDocumentContent.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Get the type of this class.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {"document"}
 */
ApiDocument.prototype.GetClassType = function(){ return ""; };

/**
 * Create new history point.
 * @memberof ApiDocument
 */
ApiDocument.prototype.CreateNewHistoryPoint = function(){};

/**
 * Get a style by the style name.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} sStyleName - The name using which it is possible to address the style.
 * @returns {ApiStyle}
 */
ApiDocument.prototype.GetStyle = function(sStyleName){ return new ApiStyle(); };

/**
 * Create a new style with the specified type and name. If there is a style with the same name it will be replaced with a new one.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} sStyleName - The name of the style which will be created.
 * @param {StyleType} [sType="paragraph"] - The document element which the style will be applied to.
 * @returns {ApiStyle}
 */
ApiDocument.prototype.CreateStyle = function(sStyleName, sType){ return new ApiStyle(); };

/**
 * Get the default style parameters for the specified document element.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {StyleType} sStyleType - The document element which we want to get the style for.
 * @returns {ApiStyle}
 */
ApiDocument.prototype.GetDefaultStyle = function(sStyleType){ return new ApiStyle(); };

/**
 * Get a set of default properties for the text run in the current document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}
 */
ApiDocument.prototype.GetDefaultTextPr = function(){ return new ApiTextPr(); };

/**
 * Get a set of default paragraph properties in the current document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiParaPr}
 */
ApiDocument.prototype.GetDefaultParaPr = function(){ return new ApiParaPr(); };

/**
 * Get the document final section
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiSection}
 */
ApiDocument.prototype.GetFinalSection = function(){ return new ApiSection(); };

/**
 * Create a new document section which ends at the specified paragraph. Allows to set local parameters for the current
 * section - page size, footer, header, columns, etc.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {ApiParagraph} oParagraph - The paragraph after which the new document section will be inserted.
 * @returns {ApiSection}
 */
ApiDocument.prototype.CreateSection = function(oParagraph){ return new ApiSection(); };

/**
 * Specify whether sections in this document will have different headers and footers for even and
 * odd pages (one header/footer for odd pages and another header/footer for even pages).
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {boolean} isEvenAndOdd - If true the header/footer will be different for odd and even pages, if false they will be the same.
 */
ApiDocument.prototype.SetEvenAndOddHdrFtr = function(isEvenAndOdd){};

/**
 * Create an abstract multilevel numbering with a specified type.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {("bullet" | "numbered")} [sType="bullet"] - The type of the numbering which will be created.
 * @returns {ApiNumbering}
 */
ApiDocument.prototype.CreateNumbering = function(sType){ return new ApiNumbering(); };

/**
 * Insert an array of elements in the current position of the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {DocumentElement[]} arrContent - An array of elements to insert.
 * @param {boolean} [isInline=false] - Inline insert or not (works only for the last and the first element and only if it's a paragraph)
 * @param {object} [oPr=undefined]
 * @returns {boolean} Success?
 */
ApiDocument.prototype.InsertContent = function(arrContent, isInline, oPr){ return new boolean(); };

/**
 * Get a report about all the comments added to the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {object}
 */
ApiDocument.prototype.GetCommentsReport = function(){ return new object(); };

/**
 * Get a report about every change which was made to the document in the review mode.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {object}
 */
ApiDocument.prototype.GetReviewReport = function(){ return new object(); };

/**
 * Find and replace text.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {Object} oProperties The properties for find and replace.
 * @param {string} oProperties.searchString Search string.
 * @param {string} oProperties.replaceString Replacement string.
 * @param {string} [oProperties.matchCase=true]
 *
 */
ApiDocument.prototype.SearchAndReplace = function(oProperties){};

/**
 * Get the list of all content controls in the document
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt[] | ApiInlineLvlSdt[]}
 */
ApiDocument.prototype.GetAllContentControls = function(){ return [new ApiBlockLvlSdt()]; };

/**
 * Set to track changes or not
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param isTrack {boolean}
 */
ApiDocument.prototype.SetTrackRevisions = function(isTrack){};

/**
 * Is change tracking enabled
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {boolean}
 */
ApiDocument.prototype.IsTrackRevisions = function(){ return new boolean(); };

/**
 * Returns a Range object that represents the part of the document contained in the specified document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiDocument.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Gets a range object by the current selection.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiRange | null} - returns null if selection doesn't exist.
 * */
ApiDocument.prototype.GetRangeBySelect = function(){ return new ApiRange(); };

/**
 * Get the last element of document. 
 * @memberof ApiDocument
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {DocumentElement}
 */
ApiDocument.prototype.Last = function(){ return new DocumentElement(); };

/**
 * Removes a bookmark from the document, if one exists.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} sName - bookmark name
 * @returns {bool} - returns false if param is invalid.
 */
ApiDocument.prototype.DeleteBookmark = function(sName){ return true; };

/**
 * Adds a comment to the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} Comment - comment
 * @param {string} Autor - autor's name (not obligatory)
 * @returns {bool} - returns false if params are invalid.
 */
ApiDocument.prototype.AddComment = function(Comment, Autor){ return true; };

/**
 * Gets a bookmark's range.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} sName - bookmark name
 * @returns {ApiRange | null} - returns null if sName is invalid.
 */
ApiDocument.prototype.GetBookmarkRange = function(sName){ return new ApiRange(); };

/**
 * Gets the collection of section objects in the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiSection[]}  
 */
ApiDocument.prototype.GetSections = function(){ return [new ApiSection()]; };

/**
 * Get the collection of tables on a given absolute page
 * <note>This method can be a little bit slow, because it runs the document calculation
 * process to arrange tables on the specified page</note>
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param nPage - page number
 * @returns {ApiTable[]}  
 */
ApiDocument.prototype.GetAllTablesOnPage = function(nPage){ return [new ApiTable()]; };

/**
 * Remove current selection
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 */
ApiDocument.prototype.RemoveSelection = function(){};

/**
 * Gets the collection of drawing objects in the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing[]}  
 */
ApiDocument.prototype.GetAllDrawingObjects = function(){ return [new ApiDrawing()]; };

/**
 * Gets the collection of shapes objects in the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiShape[]}  
 */
ApiDocument.prototype.GetAllShapes = function(){ return [new ApiShape()]; };

/**
 * Gets the collection of image objects in the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiImage[]}  
 */
ApiDocument.prototype.GetAllImages = function(){ return [new ApiImage()]; };

/**
 * Gets the collection of chart objects in the document.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @returns {ApiChart[]}  
 */
ApiDocument.prototype.GetAllCharts = function(){ return [new ApiChart()]; };

/**
 * Searches for the scope of a document object. The search results are a collection of ApiRange objects.
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiDocument.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Insert watermark on each page of document
 * @memberof ApiDocument
 * @typeofeditors ["CDE"]
 * @param {?string} [sText="WATERMARK"]
 * @param {?boolean} [bIsDiagonal=true]
 */
ApiDocument.prototype.InsertWatermark = function(sText, bIsDiagonal){};

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
 * Add page break and start the next element from the next page.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddPageBreak = function(){ return new ApiRun(); };

/**
 * Add line break to the current position and start the next element from a new line.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddLineBreak = function(){ return new ApiRun(); };

/**
 * Add column break to the current position and start the next element from a new column.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddColumnBreak = function(){ return new ApiRun(); };

/**
 * Insert the number of the current document page into the paragraph.
 * <note>This method works for the paragraphs in the document header/footer only.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddPageNumber = function(){ return new ApiRun(); };

/**
 * Insert the number of pages in the current document into the paragraph.
 * <note>This method works for the paragraphs in the document header/footer only.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddPagesCount = function(){ return new ApiRun(); };

/**
 * Get the text properties of the paragraph mark which is used to mark the paragraph end. The mark can also acquire
 * common text properties like bold, italic, underline, etc.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}
 */
ApiParagraph.prototype.GetParagraphMarkTextPr = function(){ return new ApiTextPr(); };

/**
 * Get paragraph properties.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParaPr}
 */
ApiParagraph.prototype.GetParaPr = function(){ return new ApiParaPr(); };

/**
 * Get a numbering definition and numbering level for the numbered list.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiNumberingLevel}
 */
ApiParagraph.prototype.GetNumbering = function(){ return new ApiNumberingLevel(); };

/**
 * Specify that the current paragraph references a numbering definition instance in the current document.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @see Same as {@link ApiParagraph#SetNumPr}
 * @param {ApiNumberingLevel} oNumberingLevel - The numbering level which will be used for assigning the numbers to the paragraph.
 */
ApiParagraph.prototype.SetNumbering = function(oNumberingLevel){};

/**
 * Get the number of elements in the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {number}
 */
ApiParagraph.prototype.GetElementsCount = function(){ return 0; };

/**
 * Get the element of the paragraph using the position specified.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position where the element which content we want to get must be located.
 * @returns {ParagraphContent}
 */
ApiParagraph.prototype.GetElement = function(nPos){ return new ParagraphContent(); };

/**
 * Remove the element using the position specified.
 * <note>If the element you remove is the last paragraph element (i.e. all elements are removed from the paragraph),
 * a new empty run is automatically created. If you want to add
 * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position of the element which we want to remove in the paragraph.
 */
ApiParagraph.prototype.RemoveElement = function(nPos){};

/**
 * Remove all elements from the current paragraph.
 * <note>When all elements are removed from the paragraph, a new empty run is automatically created. If you want to add
 * content to this run, use the {@link ApiParagraph#GetElement} method.</note>
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiParagraph.prototype.RemoveAllElements = function(){};

/**
 * Deletes current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {bool} - returns false if paragraph haven't parent.
 */
ApiParagraph.prototype.Delete = function(){ return true; };

/**
 * Gets the next paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParagraph | null} - returns null if paragraph is last.
 */
ApiParagraph.prototype.GetNext = function(){ return new ApiParagraph(); };

/**
 * Gets the Previous paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiParagraph} - returns null if paragraph is first.
 */
ApiParagraph.prototype.GetPrevious = function(){ return new ApiParagraph(); };

/**
 * Create a copy of the paragraph. Ingonore comments, footnote references, complex fields
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
 * @param {number} [nPos] The number of the paragraph where the current element will be added. If this value is not
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
 * Add an object (image, shape or chart) to the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {ApiDrawing} oDrawing - The object which will be added to the current paragraph.
 * @returns {ApiRun}
 */
ApiParagraph.prototype.AddDrawing = function(oDrawing){ return new ApiRun(); };

/**
 * Add a inline container
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {ApiInlineLvlSdt?} oSdt - if undefined or null, then new class ApiInlineLvlSdt will be created and added to paragraph.
 * @returns {ApiInlineLvlSdt}
 */
ApiParagraph.prototype.AddInlineLvlSdt = function(oSdt){ return new ApiInlineLvlSdt(); };

/**
 * Adds a comment to the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {string} Comment - comment
 * @param {string} Autor - autor's name (not obligatory)
 * @returns {bool} - returns false if params are invalid.
 */
ApiParagraph.prototype.AddComment = function(Comment, Autor){ return true; };

/**
 * Add a hyperlink to a paragraph. 
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {string} sLink - link to be add.
 * @param {string} sScreenTipText - ScreenTip text
 * @returns {ApiHyperlink | null} - returns null if params are invalid.
 */
ApiParagraph.prototype.AddHyperlink = function(sLink, sScreenTipText){ return new ApiHyperlink(); };

/**
 * Returns a Range object that represents the part of the document contained in the specified paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiParagraph.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Add an element to the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {ParagraphContent} oElement - The document element which will be added at the current position. Returns false if the
 * type of oElement is not supported by a paragraph.
 * @returns {boolean} Returns <code>false</code> if the type of <code>oElement</code> is not supported by paragraph
 * content.
 */
ApiParagraph.prototype.Push = function(oElement){ return new boolean(); };

/**
 * Get last Run with text in the current paragraph
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiRun} Returns <code>false</code> if the paragraph doesn't containt the required run.
 */
ApiParagraph.prototype.GetLastRunWithText = function(){ return new ApiRun(); };

/**
 * Set the bold property to the text character.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isBold - Specifies that the contents of this paragraph are displayed bold.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetBold = function(isBold){ return new ApiParagraph(); };

/**
 * Specify that any lowercase characters in this paragraph are formatted for display only as their capital letter character equivalents.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isCaps - Specifies that the contents of the current paragraph are displayed capitalized.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetCaps = function(isCaps){ return new ApiParagraph(); };

/**
 * Set the text color for the current paragraph in the RGB format.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetColor = function(r, g, b, isAuto){ return new ApiParagraph(); };

/**
 * Specify that the contents of this paragraph is displayed with two horizontal lines through each character displayed on the line.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isDoubleStrikeout - Specifies that the contents of the current paragraph are displayed double struck through.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetDoubleStrikeout = function(isDoubleStrikeout){ return new ApiParagraph(); };

/**
 * Set all 4 font slots with the specified font family.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {string} sFontFamily - The font family or families used for the current paragraph.
 * @returns {ApiParagraph | false} 
 */
ApiParagraph.prototype.SetFontFamily = function(sFontFamily){ return new ApiParagraph(); };

/**
 * Set the font size for the characters of the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {hps} nSize - The text size value measured in half-points (1/144 of an inch).
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetFontSize = function(nSize){ return new ApiParagraph(); };

/**
 * Specify a highlighting color in the RGB format which is applied as a background for the contents of the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isNone=false] If this parameter is set to "true", then r,g,b parameters will be ignored.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetHighlight = function(r, g, b, isNone){ return new ApiParagraph(); };

/**
 * Set the italic property to the text character.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isItalic - Specifies that the contents of the current paragraph are displayed italicized.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetItalic = function(isItalic){ return new ApiParagraph(); };

/**
 * Specify the amount by which text is raised or lowered for this paragraph in relation to the default
 * baseline of the surrounding non-positioned text.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {hps} nPosition - Specifies a positive (raised text) or negative (lowered text)
 * measurement in half-points (1/144 of an inch).
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetPosition = function(nPosition){ return new ApiParagraph(); };

/**
 * Specify the shading applied to the contents of the current paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type applied to the contents of the current paragraph.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetShd = function(sType, r, g, b){ return new ApiParagraph(); };

/**
 * Specify that all small letter characters in this paragraph are formatted for display only as their capital
 * letter character equivalents in a font size two points smaller than the actual font size specified for this text.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isSmallCaps - Specifies that the contents of the current paragraph are displayed capitalized two points smaller.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetSmallCaps = function(isSmallCaps){ return new ApiParagraph(); };

/**
 * Set text spacing measured in twentieths of a point.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {twips} nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetSpacing = function(nSpacing){ return new ApiParagraph(); };

/**
 * Specify that the contents of this paragraph are displayed with a single horizontal line through the center of the line.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isStrikeout - Specifies that the contents of the current paragraph are displayed struck through.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetStrikeout = function(isStrikeout){ return new ApiParagraph(); };

/**
 * Specify that the contents of this paragraph are displayed along with a line appearing directly below the character
 * (less than all the spacing above and below the characters on the line).
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {boolean} isUnderline - Specifies that the contents of the current paragraph are displayed underlined.
 * @returns {ApiParagraph} this
 */
ApiParagraph.prototype.SetUnderline = function(isUnderline){ return new ApiParagraph(); };

/**
 * Specify the alignment which will be applied to the contents of this paragraph in relation to the default appearance of the paragraph text:
 * * <b>"baseline"</b> - the characters in the current paragraph will be aligned by the default text baseline.
 * * <b>"subscript"</b> - the characters in the current paragraph will be aligned below the default text baseline.
 * * <b>"superscript"</b> - the characters in the current paragraph will be aligned above the default text baseline.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {("baseline" | "subscript" | "superscript")} sType - The vertical alignment type applied to the text contents.
 * @returns {ApiParagraph | null} - returns null is sType is invalid.
 */
ApiParagraph.prototype.SetVertAlign = function(sType){ return new ApiParagraph(); };

/**
 * Get the last no empty element of the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ParagraphContent}
 */
ApiParagraph.prototype.Last = function(){ return new ParagraphContent(); };

/**
 * Gets the collection of content control objects in the Paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiInlineLvlSdt[]}   
 */
ApiParagraph.prototype.GetAllContentControls = function(){ return [new ApiInlineLvlSdt()]; };

/**
 * Gets the collection of drawing objects in the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing[]}  
 */
ApiParagraph.prototype.GetAllDrawingObjects = function(){ return [new ApiDrawing()]; };

/**
 * Gets the collection of shapes objects in the Paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiShape[]}  
 */
ApiParagraph.prototype.GetAllShapes = function(){ return [new ApiShape()]; };

/**
 * Gets the collection of image objects in the Paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiImage[]}  
 */
ApiParagraph.prototype.GetAllImages = function(){ return [new ApiImage()]; };

/**
 * Gets the collection of chart objects in the Paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiChart[]}  
 */
ApiParagraph.prototype.GetAllCharts = function(){ return [new ApiChart()]; };

/**
 * Gets the content control that contains the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | null} - returns null is parent content control doesn't exist.  
 */
ApiParagraph.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Gets the table that contains the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.  
 */
ApiParagraph.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the table cell that contains the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null if parent cell doesn't exist.  
 */
ApiParagraph.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Gets text of the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {string}  
 */
ApiParagraph.prototype.GetText = function(){ return ""; };

/**
 * Gets text properties of the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}  
 */
ApiParagraph.prototype.GetTextPr = function(){ return new ApiTextPr(); };

/**
 * Sets text properties of the paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 * @returns {bool} - returns false if param is invalid.
 */
ApiParagraph.prototype.SetTextPr = function(oTextPr){ return true; };

/**
 * Wraps the paragraph object with a rich text content control.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {number} nType - if nType === 1 -> returns ApiBlockLvlSdt  
 * @returns {ApiParagraph | ApiBlockLvlSdt}  
 */
ApiParagraph.prototype.InsertInContentControl = function(nType){ return new ApiParagraph(); };

/**
 * Inserts a paragraph at the specified position.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {string | ApiParagraph} paragraph - text or paragraph
 * @param {string} sPosition - can be "after" or "before"
 * @param {bool} beRNewPara - if "true" - returns new paragraph, else returns this paragraph.
 * @returns {ApiParagraph | null} - returns null if param paragraph is invalid. 
 */
ApiParagraph.prototype.InsertParagraph = function(paragraph, sPosition, beRNewPara){ return new ApiParagraph(); };

/**
 * Select a paragraph.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @returns {bool} 
 */
ApiParagraph.prototype.Select = function(){ return true; };

/**
 * Searches for the scope of a paragraph object. The search results are a collection of ApiRange objects.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiParagraph.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Wrap paragraph content in a mail merge field.
 * @memberof ApiParagraph
 * @typeofeditors ["CDE"]
 */
ApiParagraph.prototype.WrapInMailMergeField = function(){};

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
 * Remove all content from the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.ClearContent = function(){};

/**
 * Remove all content from the current run.
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
 * Add a page break and start the next element from a new page.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 */
ApiRun.prototype.AddPageBreak = function(){};

/**
 * Add a line break to the current run position and start the next element from a new line.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.AddLineBreak = function(){};

/**
 * Add a column break to the current run position and start the next element from a new column.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 */
ApiRun.prototype.AddColumnBreak = function(){};

/**
 * Add a tab stop to the current run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 */
ApiRun.prototype.AddTabStop = function(){};

/**
 * Add an object (image, shape or chart) to the current text run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @param {ApiDrawing} oDrawing - The object which will be added to the current run.
 * @returns {bool} - returns false if param is invalid.
 */
ApiRun.prototype.AddDrawing = function(oDrawing){ return true; };

/**
 * Select a run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @returns {bool} 
 */
ApiRun.prototype.Select = function(){ return true; };

/**
 * Add a hyperlink to a run. 
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @param {string} sLink - link to be add.
 * @param {string} sScreenTipText - ScreenTip text
 * @returns {ApiHyperlink | null} - returns false if params are invalid.
 */
ApiRun.prototype.AddHyperlink = function(sLink, sScreenTipText){ return new ApiHyperlink(); };

/**
 * Create a copy of the run.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiRun}
 */
ApiRun.prototype.Copy = function(){ return new ApiRun(); };

/**
 * Returns a Range object that represents the part of the document contained in the specified run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiRun.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Gets the content control that contains the run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | ApiInlineLvlSdt | null} - returns null if parent content control doesn't exist.  
 */
ApiRun.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Gets the table that contains the run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiRun.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the table cell that contains the run.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null is parent cell doesn't exist.  
 */
ApiRun.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Sets text properties of the paragraph.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {ApiTextPr} oTextPr
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
 * Specify that the contents of this run is displayed with two horizontal lines through each character displayed on the line.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isDoubleStrikeout - Specifies that the contents of the current run are displayed double struck through.
 * @returns {ApiTextPr}
 */
ApiRun.prototype.SetDoubleStrikeout = function(isDoubleStrikeout){ return new ApiTextPr(); };

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
 * Specify that all small letter characters in this text run are formatted for display only as their capital
 * letter character equivalents in a font size two points smaller than the actual font size specified for this text.
 * @memberof ApiRun
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isSmallCaps - Specifies that the contents of the current run are displayed capitalized two points smaller.
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
 * Wrap run in a mail merge field.
 * @memberof ApiRun
 * @typeofeditors ["CDE"]
 */
ApiRun.prototype.WrapInMailMergeField = function(){};

/**
 * Get the type of this class.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @returns {"section"}
 */
ApiSection.prototype.GetClassType = function(){ return ""; };

/**
 * Specify the type of the current section. The section type defines how the contents of the current 
 * section are placed relative to the previous section.<br/>
 * WordprocessingML supports five distinct types of section breaks:
 *   * <b>Next page</b> section breaks (the default if type is not specified), which begin the new section on the
 *   following page.
 *   * <b>Odd</b> page section breaks, which begin the new section on the next odd-numbered page.
 *   * <b>Even</b> page section breaks, which begin the new section on the next even-numbered page.
 *   * <b>Continuous</b> section breaks, which begin the new section on the following paragraph. This means that
 *   continuous section breaks might not specify certain page-level section properties, since they shall be
 *   inherited from the following section. These breaks, however, can specify other section properties, such
 *   as line numbering and footnote/endnote settings.
 *   * <b>Column</b> section breaks, which begin the new section on the next column on the page.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {("nextPage" | "oddPage" | "evenPage" | "continuous" | "nextColumn")} sType - Type of the section break
 */
ApiSection.prototype.SetType = function(sType){};

/**
 * Specify that all text columns in the current section are of equal width.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {number} nCount - Number of columns.
 * @param {twips} nSpace - Distance between columns measured in twentieths of a point (1/1440 of an inch).
 */
ApiSection.prototype.SetEqualColumns = function(nCount, nSpace){};

/**
 * Specify that all columns in the current section are of a different width. Number of columns is equal 
 * to the length of the aWidth array. The length of the aSpaces array MUST BE equal to (aWidth.length - 1).
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {twips[]} aWidths - An array of column width values measured in twentieths of a point (1/1440 of an inch).
 * @param {twips[]} aSpaces - An array of distances values between the columns measured in twentieths of a point (1/1440 of an inch).
 */
ApiSection.prototype.SetNotEqualColumns = function(aWidths, aSpaces){};

/**
 * Specify the properties (size and orientation) for all pages in the current section.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {twips} nWidth - The page width measured in twentieths of a point (1/1440 of an inch).
 * @param {twips} nHeight - The page height measured in twentieths of a point (1/1440 of an inch).
 * @param {boolean} [isPortrait=false] - Specifies the orientation of all pages in this section (if set to true then the portrait orientation is chosen).
 */
ApiSection.prototype.SetPageSize = function(nWidth, nHeight, isPortrait){};

/**
 * Specify the page margins for all pages in this section.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {twips} nLeft - The left margin width measured in twentieths of a point (1/1440 of an inch).
 * @param {twips} nTop - The top margin height measured in twentieths of a point (1/1440 of an inch).
 * @param {twips} nRight - The right margin width measured in twentieths of a point (1/1440 of an inch).
 * @param {twips} nBottom - The bottom margin height measured in twentieths of a point (1/1440 of an inch).
 */
ApiSection.prototype.SetPageMargins = function(nLeft, nTop, nRight, nBottom){};

/**
 * Specify the distance from the top edge of the page to the top edge of the header.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {twips} nDistance - The distance from the top edge of the page to the top edge of the header measured in twentieths of a point (1/1440 of an inch).
 */
ApiSection.prototype.SetHeaderDistance = function(nDistance){};

/**
 * Specify the distance from the bottom edge of the page to the bottom edge of the footer.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {twips} nDistance - The distance from the bottom edge of the page to the bottom edge of the footer measured
 * in twentieths of a point (1/1440 of an inch).
 */
ApiSection.prototype.SetFooterDistance = function(nDistance){};

/**
 * Get the content for the specified header type.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {HdrFtrType} sType - Type of header to get the content from.
 * @param {boolean} [isCreate=false] - Whether to create a new header or not with the specified header type in case
 * no header with such a type could be found in the current section.
 * @returns {ApiDocumentContent}
 */
ApiSection.prototype.GetHeader = function(sType, isCreate){ return new ApiDocumentContent(); };

/**
 * Remove the header of the specified type from the current section. After removal the header will be inherited from
 * the previous section or, if this is the first section in the document, no header of the specified type will be present.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {HdrFtrType} sType - Type of header to be removed.
 */
ApiSection.prototype.RemoveHeader = function(sType){};

/**
 * Get the content for the specified footer type.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {HdrFtrType} sType - Type of footer to get the content from.
 * @param {boolean} [isCreate=false] - Whether to create a new footer or not with the specified footer type in case
 * no footer with such a type could be found in the current section.
 * @returns {ApiDocumentContent}
 */
ApiSection.prototype.GetFooter = function(sType, isCreate){ return new ApiDocumentContent(); };

/**
 * Remove the footer of the specified type from the current section. After removal the footer will be inherited from 
 * the previous section or, if this is the first section in the document, no footer of the specified type will be present.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {HdrFtrType} sType - Type of footer.
 */
ApiSection.prototype.RemoveFooter = function(sType){};

/**
 * Specify whether the current section in this document have different header and footer for the section first page.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @param {boolean} isTitlePage - If true the first page of the section will have header and footer that will differ from the other pages of the same section.
 */
ApiSection.prototype.SetTitlePage = function(isTitlePage){};

/**
 * Gets next sections if exists.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @returns {ApiSection | null} - returns null if section is last.
 */
ApiSection.prototype.GetNext = function(){ return new ApiSection(); };

/**
 * Gets preious sections if exists.
 * @memberof ApiSection
 * @typeofeditors ["CDE"]
 * @returns {ApiSection | null} - returns null if section is first.
 */
ApiSection.prototype.GetPrevious = function(){ return new ApiSection(); };

/**
 * Get the type of this class.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {"table"}
 */
ApiTable.prototype.GetClassType = function(){ return ""; };

/**
 * Get the number of rows in the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {number}
 */
ApiTable.prototype.GetRowsCount = function(){ return 0; };

/**
 * Get the table row by its position in the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The row position within the table.
 * @returns {ApiTableRow | null} - returns null if param is invalid.
 */
ApiTable.prototype.GetRow = function(nPos){ return new ApiTableRow(); };

/**
 * Get the cell by its position.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {number} nRow - The row position in the current table.
 * @param {number} Cell - The cell position in the current table.
 * @returns {ApiTableCell | null} - returns null if params are invalid.
 */
ApiTable.prototype.GetCell = function(nRow, nCell){ return new ApiTableCell(); };

/**
 * Merge an array of cells. If the merge is done successfully it will return the resulting merged cell, otherwise the result will be "null".
 * <note><b>Please note</b>: the number of cells in any row and the number of rows in the current table may be changed.</note>
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell[]} aCells - The array of cells to be merged.
 * @returns {ApiTableCell}
 */
ApiTable.prototype.MergeCells = function(aCells){ return new ApiTableCell(); };

/**
 * Set the style for the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiStyle} oStyle - The style which will be applied to the current table.
 * @returns {bool} - returns false if param is invalid.
 */
ApiTable.prototype.SetStyle = function(oStyle){ return true; };

/**
 * Specify the components of the conditional formatting of the referenced table style (if one exists) 
 * which will be applied to the set of table rows with the current table-level property exceptions. A table style 
 * can specify up to six different optional conditional formats, for example, different formatting for first column, 
 * which then can be applied or omitted from individual table rows in the parent table.
 * 
 * The default setting is to apply the row and column banding formatting, but not the first row, last row, first 
 * column, or last column formatting.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {boolean} isFirstColumn - Specifies that the first column conditional formatting will be applied to the table.
 * @param {boolean} isFirstRow - Specifies that the first row conditional formatting will be applied to the table.
 * @param {boolean} isLastColumn - Specifies that the last column conditional formatting will be applied to the table.
 * @param {boolean} isLastRow - Specifies that the last row conditional formatting will be applied to the table.
 * @param {boolean} isHorBand - Specifies that the horizontal banding conditional formatting will not be applied to the table.
 * @param {boolean} isVerBand - Specifies that the vertical banding conditional formatting will not be applied to the table.
 */
ApiTable.prototype.SetTableLook = function(isFirstColumn, isFirstRow, isLastColumn, isLastRow, isHorBand, isVerBand){};

/**
 * Split the cell into a given number of rows and columns.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} [oCell] - The cell which be split.
 * @param {Number} [nRow=1] - count of rows which the cell will be split.
 * @param {Number} [nCol=1] - count of columns which the cell will be split.
 * @returns {ApiTable | null} - returns null if can't split.
 */
ApiTable.prototype.Split = function(oCell, nRow, nCol){ return new ApiTable(); };

/**
 * Add a new row to the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} [oCell] - The cell after which the new row will be added. If not specified the new row will
 * be added at the end of the table.
 * @param {boolean} [isBefore=false] - Add a new row before or after the specified cell. If no cell is specified then
 * this parameter will be ignored.
 * @returns {ApiTableRow}
 */
ApiTable.prototype.AddRow = function(oCell, isBefore){ return new ApiTableRow(); };

/**
 * Add a new rows to the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} [oCell] - The cell after which the new rows will be added. If not specified the new rows will
 * be added at the end of the table.
 * @param {Number} nCount - count of rows to be added.
 * @param {boolean} [isBefore=false] - Add a new rows before or after the specified cell. If no cell is specified then
 * this parameter will be ignored.
 * @returns {ApiTable}
 */
ApiTable.prototype.AddRows = function(oCell, nCount, isBefore){ return new ApiTable(); };

/**
 * Add a new column to the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} [oCell] - The cell after which the new column will be added. If not specified the new column will be added at the end of the table.
 * @param {boolean} [isBefore=false] - Add a new column before or after the specified cell. If no cell is specified
 * then this parameter will be ignored.
 */
ApiTable.prototype.AddColumn = function(oCell, isBefore){};

/**
 * Add a new columns to the current table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} [oCell] - The cell after which the new columns will be added. If not specified the new columns will be added at the end of the table.
 * @param {Number} nCount - count of columns to be added
 * @param {boolean} [isBefore=false] - Add a new columns before or after the specified cell. If no cell is specified
 * then this parameter will be ignored.
 */
ApiTable.prototype.AddColumns = function(oCell, nCount, isBefore){};

/**
 * Add a paragraph or a table or a blockLvl content control using its position in the cell.
 * @memberof ApiTable
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {number} nPos - The position where the current element will be added.
 * @param {DocumentElement} oElement - The document element which will be added at the current position.
 */
ApiTable.prototype.AddElement = function(oCell, nPos, oElement){};

/**
 * Remove the table row with a specified cell.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} oCell - The cell which is present in the row that will be removed.
 * @returns {boolean} Is the table empty after removing.
 */
ApiTable.prototype.RemoveRow = function(oCell){ return new boolean(); };

/**
 * Remove the table column with a specified cell.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTableCell} oCell - The cell which is present in the column that will be removed.
 * @returns {boolean} Is the table empty after removing.
 */
ApiTable.prototype.RemoveColumn = function(oCell){ return new boolean(); };

/**
 * Create a copy of the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {ApiTable}
 */
ApiTable.prototype.Copy = function(){ return new ApiTable(); };

/**
 * Select a table.
 * @memberof ApiTable
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {bool}
 */
ApiTable.prototype.Select = function(){ return true; };

/**
 * Returns a Range object that represents the part of the document contained in the specified table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiTable.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Sets horizontal alignment for a table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {String} sType - may be "left" or "center" or "right"
 * @returns {bool} - returns false if param is invalid.
 * */
ApiTable.prototype.SetHAlign = function(sType){ return true; };

/**
 * Sets vertical alignment for a table.
 * @typeofeditors ["CDE"]
 * @param {String} sType - may be "top" or "center" or "bottom"
 * @returns {bool} - returns false if param is invalid.
 * */
ApiTable.prototype.SetVAlign = function(sType){ return true; };

/**
 * Sets table paddings.
 * If table is inline -> only left padding applies.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {Number} nLeft
 * @param {Number} nTop 
 * @param {Number} nRight 
 * @param {Number} nBottom  
 * @returns {bool} - returns true.
 * */
ApiTable.prototype.SetPaddings = function(nLeft, nTop, nRight, nBottom){ return true; };

/**
 * Set table wrapping style
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {bool} isFlow
 * @returns {bool} - returns false if param is invalid. 
 * */
ApiTable.prototype.SetWrappingStyle = function(isFlow){ return true; };

/**
 * Gets the content control that contains the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | null} - return null is parent content control doesn't exist.
 */
ApiTable.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Wraps the table object with a content control.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {number} nType - if nType === 1 -> returns ApiBlockLvlSdt, else return ApiTable 
 * @returns {ApiTable | ApiBlockLvlSdt}  
 */
ApiTable.prototype.InsertInContentControl = function(nType){ return new ApiTable(); };

/**
 * Gets the table that contains the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.  
 */
ApiTable.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the tables that contains the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiTable[]}  
 */
ApiTable.prototype.GetTables = function(){ return [new ApiTable()]; };

/**
 * Gets the next table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if table is last.  
 */
ApiTable.prototype.GetNext = function(){ return new ApiTable(); };

/**
 * Gets the previous table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if table is first.  
 */
ApiTable.prototype.GetPrevious = function(){ return new ApiTable(); };

/**
 * Gets the table cell that contains the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null if parent cell doesn't exist.  
 */
ApiTable.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Deletes the table. 
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if parent of table doesn't exist.
 */
ApiTable.prototype.Delete = function(){ return true; };

/**
 * Clears the content of the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns true.
 */
ApiTable.prototype.Clear = function(){ return true; };

/**
 * Searches for the scope of a table object. The search results are a collection of ApiRange objects.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiTable.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Applies text settings to the entire contents of the table.
 * @memberof ApiTable
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 * @returns {bool} - returns true. 
 */
ApiTable.prototype.SetTextPr = function(oTextPr){ return true; };

/**
 * Get the type of this class.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {"tableRow"}
 */
ApiTableRow.prototype.GetClassType = function(){ return ""; };

/**
 * Get the number of cells in the current row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {number}
 */
ApiTableRow.prototype.GetCellsCount = function(){ return 0; };

/**
 * Get the cell by its position.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The cell position in the current table.
 * @returns {ApiTableCell}
 */
ApiTableRow.prototype.GetCell = function(nPos){ return new ApiTableCell(); };

/**
 * Get the row index.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {Number}
 */
ApiTableRow.prototype.GetIndex = function(){ return 0; };

/**
 * Get parent table of the row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableRow.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Get the next row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {ApiTableRow | null} - returns null if row is last.
 */
ApiTableRow.prototype.GetNext = function(){ return new ApiTableRow(); };

/**
 * Get the previous row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {ApiTableRow | null} - returns null if row is first.
 */
ApiTableRow.prototype.GetPrevious = function(){ return new ApiTableRow(); };

/**
 * Add a new rows to the current table.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @param {Number} nCount - count of rows to be added.
 * @param {boolean} [isBefore=false] - Add a new rows before or after the row. 
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableRow.prototype.AddRows = function(nCount, isBefore){ return new ApiTable(); };

/**
 * Merge cells in the row. 
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - return null if can't merge.
 */
ApiTableRow.prototype.MergeCells = function(){ return new ApiTableCell(); };

/**
 * Clears the content of row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if parent table doesn't exist.
 */
ApiTableRow.prototype.Clear = function(){ return true; };

/**
 * Remove the table row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @returns {bool} - return false if parent table doesn't exist.
 */
ApiTableRow.prototype.Remove = function(){ return true; };

/**
 * Sets text properties for the row.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 * @returns {bool} - returns false if parent table doesn't exist or param is invalid.
 */
ApiTableRow.prototype.SetTextPr = function(oTextPr){ return true; };

/**
 * Searches for the scope of a table row object. The search results are a collection of ApiRange objects.
 * @memberof ApiTableRow
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiTableRow.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Get the type of this class.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {"tableCell"}
 */
ApiTableCell.prototype.GetClassType = function(){ return ""; };

/**
 * Get the cell content.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {ApiDocumentContent}
 */
ApiTableCell.prototype.GetContent = function(){ return new ApiDocumentContent(); };

/**
 * Get the cell index.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {Number}
 */
ApiTableCell.prototype.GetIndex = function(){ return 0; };

/**
 * Gets the index of the parent row.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {number}
 */
ApiTableCell.prototype.GetRowIndex = function(){ return 0; };

/**
 * Gets the parent row of the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {ApiTableRow | null} - returns null if parent row doesn't exist.
 */
ApiTableCell.prototype.GetParentRow = function(){ return new ApiTableRow(); };

/**
 * Gets the parent table of the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Add a new rows to the current table.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {Number} nCount - count of rows to be added.
 * @param {boolean} [isBefore=false] - Add a new rows before or after the cell. 
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.AddRows = function(nCount, isBefore){ return new ApiTable(); };

/**
 * Add a new columns to the current table.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {Number} nCount - count of columns to be added
 * @param {boolean} [isBefore=false] - Add a new columns before or after the cell. 
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.AddColumns = function(nCount, isBefore){ return new ApiTable(); };

/**
 * Remove the column containing the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {bool | null} Is the table empty after removing. Returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.RemoveColumn = function(){ return true; };

/**
 * Remove the row containing the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {bool | null} Is the table empty after removing. Returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.RemoveRow = function(){ return true; };

/**
 * Searches for the scope of a cell object. The search results are a collection of ApiRange objects.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiTableCell.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Get the next cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null if cell is last.
 */
ApiTableCell.prototype.GetNext = function(){ return new ApiTableCell(); };

/**
 * Get the previous cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null is cell is first. 
 */
ApiTableCell.prototype.GetPrevious = function(){ return new ApiTableCell(); };

/**
 * Split the cell into a given number of rows and columns.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {Number} [nRow=1] - count of rows which the cell will be split.
 * @param {Number} [nCol=1] - count of columns which the cell will be split.
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiTableCell.prototype.Split = function(nRow, nCol){ return new ApiTable(); };

/**
 * Sets properties of the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {ApiTableCellPr} oApiTableCellPr 
 * @returns {bool} - returns false if param is invalid.
 */
ApiTableCell.prototype.SetCellPr = function(oApiTableCellPr){ return true; };

/**
 * Applies text settings to the entire contents of the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 * @returns {bool} - returns false if param is invalid.
 */
ApiTableCell.prototype.SetTextPr = function(oTextPr){ return true; };

/**
 * Clears the content of the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if parent row is invalid.
 */
ApiTableCell.prototype.Clear = function(){ return true; };

/**
 * Add a paragraph or a table or a blockLvl content control using its position in the cell.
 * @memberof ApiTableCell
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The position where the current element will be added.
 * @param {DocumentElement} oElement - The document element which will be added at the current position.
 * @returns {bool} - returns false if oElement is invalid.
 */
ApiTableCell.prototype.AddElement = function(nPos, oElement){ return true; };

/**
 * Get the type of this class.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {"style"}
 */
ApiStyle.prototype.GetClassType = function(){ return ""; };

/**
 * Get the name of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiStyle.prototype.GetName = function(){ return ""; };

/**
 * Set the name of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @param {string} sStyleName - The name which will be used for the current style.
 */
ApiStyle.prototype.SetName = function(sStyleName){};

/**
 * Get the type of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {StyleType}
 */
ApiStyle.prototype.GetType = function(){ return new StyleType(); };

/**
 * Get the text properties of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}
 */
ApiStyle.prototype.GetTextPr = function(){ return new ApiTextPr(); };

/**
 * Get the paragraph properties of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {ApiParaPr}
 */
ApiStyle.prototype.GetParaPr = function(){ return new ApiParaPr(); };

/**
 * Get the table properties of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {ApiTablePr} If the type of this style is not a <code>"table"</code> then it will return
 *     <code>null</code>.
 */
ApiStyle.prototype.GetTablePr = function(){ return new ApiTablePr(); };

/**
 * Get the table row properties of the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {ApiTableRowPr} If the type of this style is not a <code>"table"</code> then it will return
 *     <code>null</code>.
 */
ApiStyle.prototype.GetTableRowPr = function(){ return new ApiTableRowPr(); };

/**
 * Get the table cell properties for the current style.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCellPr}
 */
ApiStyle.prototype.GetTableCellPr = function(){ return new ApiTableCellPr(); };

/**
 * Specify the reference to the parent style which this style inherits from in the style hierarchy.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @param {ApiStyle} oStyle - The parent style which the style inherits properties from.
 */
ApiStyle.prototype.SetBasedOn = function(oStyle){};

/**
 * Get a set of formatting properties which will be conditionally applied to the parts of a table that match the 
 * requirement specified in the sType parameter.
 * @memberof ApiStyle
 * @typeofeditors ["CDE"]
 * @param {TableStyleOverrideType} [sType="wholeTable"] - The part of the table which the formatting properties must be applied to.
 * @returns {ApiTableStylePr}
 */
ApiStyle.prototype.GetConditionalTableStyle = function(sType){ return new ApiTableStylePr(); };

/**
 * Get the type of this class.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"textPr"}
 */
ApiTextPr.prototype.GetClassType = function(){ return ""; };

/**
 * The text style base method.
 * <note>This method is not used by itself, as it only forms the basis for the {@link ApiRun#SetStyle} method which sets
 * the selected or created style for the text.</note>
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {ApiStyle} oStyle - The style which must be applied to the text character.
 */
ApiTextPr.prototype.SetStyle = function(oStyle){};

/**
 * Set the bold property to the text character.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isBold - Specifies that the contents of this run are displayed bold.
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
 * Specify that the contents of this run are displayed with a single horizontal line through the center of the line.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isStrikeout - Specifies that the contents of the current run are displayed struck through.
 */
ApiTextPr.prototype.SetStrikeout = function(isStrikeout){};

/**
 * Specify that the contents of this run are displayed along with a line appearing directly below the character
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
 * Set the text color for the current text run in the RGB format.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - If this parameter is set to "true", then r,g,b parameters will be ignored.
 */
ApiTextPr.prototype.SetColor = function(r, g, b, isAuto){};

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
 * Specify a highlighting color in the RGB format which is applied as a background for the contents of the current run.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isNone=false] If this parameter is set to "true", then r,g,b parameters will be ignored.
 */
ApiTextPr.prototype.SetHighlight = function(r, g, b, isNone){};

/**
 * Set text spacing measured in twentieths of a point.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nSpacing - The value of the text spacing measured in twentieths of a point (1/1440 of an inch).
 */
ApiTextPr.prototype.SetSpacing = function(nSpacing){};

/**
 * Specify that the contents of this run is displayed with two horizontal lines through each character displayed on the line.
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
 * Specify that all small letter characters in this text run are formatted for display only as their capital
 * letter character equivalents in a font size two points smaller than the actual font size specified for this text.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {boolean} isSmallCaps - Specifies that the contents of the current run are displayed capitalized two points smaller.
 */
ApiTextPr.prototype.SetSmallCaps = function(isSmallCaps){};

/**
 * Specify the amount by which text is raised or lowered for this run in relation to the default
 * baseline of the surrounding non-positioned text.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {hps} nPosition - Specifies a positive (raised text) or negative (lowered text)
 * measurement in half-points (1/144 of an inch).
 */
ApiTextPr.prototype.SetPosition = function(nPosition){};

/**
 * Specify the languages which will be used to check spelling and grammar (if requested) when processing
 * the contents of this text run.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {string} sLangId - The possible value for this parameter is a language identifier as defined by
 * RFC 4646/BCP 47. Example: "en-CA".
 */
ApiTextPr.prototype.SetLanguage = function(sLangId){};

/**
 * Specify the shading applied to the contents of the current text run.
 * @memberof ApiTextPr
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type applied to the contents of the current text run.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTextPr.prototype.SetShd = function(sType, r, g, b){};

/**
 * Get the type of this class.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {"paraPr"}
 */
ApiParaPr.prototype.GetClassType = function(){ return ""; };

/**
 * The paragraph style base method.
 * <note>This method is not used by itself, as it only forms the basis for the {@link ApiParagraph#SetStyle} method which sets the selected or created style for the paragraph.</note>
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {ApiStyle} oStyle - The style of the paragraph to be set.
 */
ApiParaPr.prototype.SetStyle = function(oStyle){};

/**
 * Gets the paragraph style method.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @returns {ApiStyle} - The style of the paragraph.
 */
ApiParaPr.prototype.GetStyle = function(){ return new ApiStyle(); };

/**
 * Specify that any space before or after this paragraph set using the 
 * {@link ApiParaPr#SetSpacingBefore} or {@link ApiParaPr#SetSpacingAfter} spacing element, should not be applied when the preceding and 
 * following paragraphs are of the same paragraph style, affecting the top and bottom spacing respectively.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isContextualSpacing - The true value will enable the paragraph contextual spacing.
 */
ApiParaPr.prototype.SetContextualSpacing = function(isContextualSpacing){};

/**
 * Set the paragraph left side indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {twips} nValue - The paragraph left side indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.SetIndLeft = function(nValue){};

/**
 * Gets the paragraph left side indentation.
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
 * Gets the paragraph right side indentation.
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
 * Gets the paragraph first line indentation.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {twips | undefined} - The paragraph first line indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiParaPr.prototype.GetIndFirstLine = function(){ return new twips(); };

/**
 * Set paragraph contents justification.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @param {("left" | "right" | "both" | "center")} sJc - The parameters will define the justification type that
 * will be applied to the paragraph contents.
 */
ApiParaPr.prototype.SetJc = function(sJc){};

/**
 * Gets paragraph contents justification.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE", "CSE", "CPE"]
 * @returns {("left" | "right" | "both" | "center" | undefined)} 
 */
ApiParaPr.prototype.GetJc = function(){ return ""; };

/**
 * Specify that when rendering this document using a page view, all lines of this paragraph are maintained on a single page whenever possible.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isKeepLines - The true value will enable the option to keep lines of the paragraph on a single page.
 */
ApiParaPr.prototype.SetKeepLines = function(isKeepLines){};

/**
 * Specify that when rendering this document using a paginated view, the contents of this paragraph are at least
 * partly rendered on the same page as the following paragraph whenever possible.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isKeepNext - The true value will enable the option to keep lines of the paragraph on the same
 * page as the following paragraph.
 */
ApiParaPr.prototype.SetKeepNext = function(isKeepNext){};

/**
 * Specify that when rendering this document using a paginated view, the contents of this paragraph are rendered at
 * the beginning of a new page in the document.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isPageBreakBefore - The true value will enable the option to render the contents of the paragraph
 * at the beginning of the a new page in the document.
 */
ApiParaPr.prototype.SetPageBreakBefore = function(isPageBreakBefore){};

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
 * Specify the shading applied to the contents of the paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type which will be applied to the contents of the current paragraph.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - The true value will disable paragraph contents shading.
 */
ApiParaPr.prototype.SetShd = function(sType, r, g, b, isAuto){};

/**
 * Gets the shading applied to the contents of the paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @returns {ApiRGBColor}
 */
ApiParaPr.prototype.GetShd = function(){ return new ApiRGBColor(); };

/**
 * Specify the border which will be displayed below a set of paragraphs which have the same paragraph border settings.
 * <note>The paragraphs of the same style going one by one are considered as a single block, so the border is added
 * to the whole block rather than to every paragraph in this block.</note>
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The border style.
 * @param {pt_8} nSize - The width of the current bottom border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset below the paragraph measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiParaPr.prototype.SetBottomBorder = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed at the left side of the page around the specified paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The border style.
 * @param {pt_8} nSize - The width of the current left border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset to the left of the paragraph measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiParaPr.prototype.SetLeftBorder = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed at the right side of the page around the specified paragraph.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The border style.
 * @param {pt_8} nSize - The width of the current right border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset to the right of the paragraph measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiParaPr.prototype.SetRightBorder = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed above a set of paragraphs which have the same set of paragraph border settings.
 * <note>The paragraphs of the same style going one by one are considered as a single block, so the border is added to the whole block rather than to every paragraph in this block.</note>
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The border style.
 * @param {pt_8} nSize - The width of the current top border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset above the paragraph measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiParaPr.prototype.SetTopBorder = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed between each paragraph in a set of paragraphs which have the same set of paragraph border settings.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The border style.
 * @param {pt_8} nSize - The width of the current border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset between the paragraphs measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiParaPr.prototype.SetBetweenBorder = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify whether a single line of this paragraph will be prevented from being displayed on a separate page from the remaining content at display time by moving the line onto the following page.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isWidowControl - The true value will enable the SetWidowControl method use.
 */
ApiParaPr.prototype.SetWidowControl = function(isWidowControl){};

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
 * Specify that the current paragraph references a numbering definition instance in the current document.
 * @memberof ApiParaPr
 * @typeofeditors ["CDE"]
 * @param {ApiNumbering} oNumPr - Specifies a numbering definition.
 * @param {number} [nLvl=0] - Specifies a numbering level reference. If the current instance of the ApiParaPr class is direct
 * formatting of a paragraph, then this parameter MUST BE specified. Otherwise if the current instance of the ApiParaPr class
 * is the part of ApiStyle properties, this parameter will be ignored.
 */
ApiParaPr.prototype.SetNumPr = function(oNumPr, nLvl){};

/**
 * Get the type of this class.
 * @memberof ApiNumbering
 * @typeofeditors ["CDE"]
 * @returns {"numbering"}
 */
ApiNumbering.prototype.GetClassType = function(){ return ""; };

/**
 * Get the specified level of the current numbering.
 * @memberof ApiNumbering
 * @typeofeditors ["CDE"]
 * @param {number} nLevel - The numbering level index. This value MUST BE from 0 to 8.
 * @returns {ApiNumberingLevel}
 */
ApiNumbering.prototype.GetLevel = function(nLevel){ return new ApiNumberingLevel(); };

/**
 * Get the type of this class.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @returns {"numberingLevel"}
 */
ApiNumberingLevel.prototype.GetClassType = function(){ return ""; };

/**
 * Get the numbering definition.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @returns {ApiNumbering}
 */
ApiNumberingLevel.prototype.GetNumbering = function(){ return new ApiNumbering(); };

/**
 * Get the level index.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @returns {number}
 */
ApiNumberingLevel.prototype.GetLevelIndex = function(){ return 0; };

/**
 * Specify the text properties which will be applied to the text in the current numbering level itself, not to the text in the subsequent paragraph.
 * <note>To change the text style for the paragraph, a style must be applied to it using the {@link ApiRun#SetStyle} method.</note>
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}
 */
ApiNumberingLevel.prototype.GetTextPr = function(){ return new ApiTextPr(); };

/**
 * The paragraph properties which are applied to any numbered paragraph that references the given numbering definition and numbering level.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @returns {ApiParaPr}
 */
ApiNumberingLevel.prototype.GetParaPr = function(){ return new ApiParaPr(); };

/**
 * Set one of the existing predefined numbering templates.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @param {("none" | "bullet" | "1)" | "1." | "I." | "A." | "a)" | "a." | "i." )} sType - Set one of the existing predefined numbering templates.
 * @param {string} [sSymbol=""] - The symbol used for the list numbering. This parameter have a meaning only if the sType="bullet" property is selected.
 */
ApiNumberingLevel.prototype.SetTemplateType = function(sType, sSymbol){};

/**
 * Set your own customized numbering type.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @param {("none" | "bullet" | "decimal" | "lowerRoman" | "upperRoman" | "lowerLetter" | "upperLetter" |
 *     "decimalZero")} sType - The custom numbering type used for the current numbering definition.
 * @param {string} sTextFormatString - Any text in this parameter will be taken as literal text to be repeated in each instance of this numbering level, except for any use of the percent symbol (%) followed by a number, which will be used to indicate the one-based index of the number to be used at this level. Any number of a level higher than this level will be ignored.
 * @param {("left" | "right" | "center")} sAlign - Type of justification applied to the text run in the current numbering level.
 */
ApiNumberingLevel.prototype.SetCustomType = function(sType, sTextFormatString, sAlign){};

/**
 * Specify a one-based index which determines when a numbering level should restart to its starting value. A numbering level restarts when an instance of the specified numbering level, which will be higher (earlier than the this level) is used in the given document contents. By default this value is true.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @param {boolean} isRestart - The true value will enable the SetRestart method use.
 */
ApiNumberingLevel.prototype.SetRestart = function(isRestart){};

/**
 * Specify the starting value for the numbering used by the parent numbering level within a given numbering level definition. By default this value is 1.
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @param {number} nStart - The starting value for the numbering used by the parent numbering level.
 */
ApiNumberingLevel.prototype.SetStart = function(nStart){};

/**
 * Specify the content which will be added between a given numbering level text and the text of every numbered paragraph which references that numbering level. By default this value is "tab".
 * @memberof ApiNumberingLevel
 * @typeofeditors ["CDE"]
 * @param {("space" | "tab" | "none")} sType - The content added between the numbering level text and the text in the numbered paragraph.
 */
ApiNumberingLevel.prototype.SetSuff = function(sType){};

/**
 * Get the type of this class.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @returns {"tablePr"}
 */
ApiTablePr.prototype.GetClassType = function(){ return ""; };

/**
 * Specify the number of columns which will comprise each table column band for this table style.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {number} nCount - The number of columns measured in positive integers.
 */
ApiTablePr.prototype.SetStyleColBandSize = function(nCount){};

/**
 * Specify the number of rows which will comprise each table row band for this table style.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {number} nCount - The number of rows measured in positive integers.
 */
ApiTablePr.prototype.SetStyleRowBandSize = function(nCount){};

/**
 * Specify the alignment of the current table with respect to the text margins in the current section.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {("left" | "right" | "center")} sJcType - The alignment type used for the current table placement.
 */
ApiTablePr.prototype.SetJc = function(sJcType){};

/**
 * Specify the shading which is applied to the extents of the current table.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type applied to the extents of the current table.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - The true value will disable the SetShd method use.
 */
ApiTablePr.prototype.SetShd = function(sType, r, g, b, isAuto){};

/**
 * Set the border which will be displayed at the top of the current table.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The top border style.
 * @param {pt_8} nSize - The width of the current top border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the top part of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderTop = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed at the bottom of the current table.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The bottom border style.
 * @param {pt_8} nSize - The width of the current bottom border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the bottom part of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderBottom = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed on the left of the current table.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The left border style.
 * @param {pt_8} nSize - The width of the current left border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the left part of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderLeft = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed on the right of the current table.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The right border style.
 * @param {pt_8} nSize - The width of the current right border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the right part of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderRight = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed on all horizontal table cell borders which are not on an outmost edge
 * of the parent table (all horizontal borders which are not the topmost or bottommost border).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The horizontal table cell border style.
 * @param {pt_8} nSize - The width of the current border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the horizontal table cells of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderInsideH = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the border which will be displayed on all vertical table cell borders which are not on an outmost edge
 * of the parent table (all vertical borders which are not the leftmost or rightmost border).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The vertical table cell border style.
 * @param {pt_8} nSize - The width of the current border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the vertical table cells of the table measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTablePr.prototype.SetTableBorderInsideV = function(sType, nSize, nSpace, r, g, b){};

/**
 * Specify the amount of space which will be left between the bottom extent of the cell contents and the border
 * of all table cells within the parent table (or table row).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {twips} nValue - The value for the amount of space below the bottom extent of the cell measured in
 * twentieths of a point (1/1440 of an inch).
 */
ApiTablePr.prototype.SetTableCellMarginBottom = function(nValue){};

/**
 * Specify the amount of space which will be present between the left extent of the cell contents and the left
 * border of all table cells within the parent table (or table row).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {twips} nValue - The value for the amount of space to the left extent of the cell measured in twentieths of a point (1/1440 of an inch).
 */
ApiTablePr.prototype.SetTableCellMarginLeft = function(nValue){};

/**
 * Specify the amount of space which will be present between the right extent of the cell contents and the right
 * border of all table cells within the parent table (or table row).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {twips} nValue - The value for the amount of space to the right extent of the cell measured in twentieths of a point (1/1440 of an inch).
 */
ApiTablePr.prototype.SetTableCellMarginRight = function(nValue){};

/**
 * Specify the amount of space which will be present between the top extent of the cell contents and the top border
 * of all table cells within the parent table (or table row).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {twips} nValue - The value for the amount of space above the top extent of the cell measured in twentieths of a point (1/1440 of an inch).
 */
ApiTablePr.prototype.SetTableCellMarginTop = function(nValue){};

/**
 * Specify the default table cell spacing (the spacing between adjacent cells and the edges of the table).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {?twips} nValue - Spacing value measured in twentieths of a point (1/1440 of an inch). <code>"Null"</code> means no spacing will be applied.
 */
ApiTablePr.prototype.SetCellSpacing = function(nValue){};

/**
 * Specify the indentation which will be added before the leading edge of the current table in the document
 * (the left edge in a left-to-right table, and the right edge in a right-to-left table).
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {twips} nValue - The indentation value measured in twentieths of a point (1/1440 of an inch).
 */
ApiTablePr.prototype.SetTableInd = function(nValue){};

/**
 * Set the preferred width for this table.
 * <note>Tables are created with the {@link ApiTable#SetWidth} method properties set by default, which always override the {@link ApiTablePr#SetWidth} method properties. That is why there is no use to try and apply {@link ApiTablePr#SetWidth}, we recommend that you use the  {@link ApiTablePr#SetWidth}  method instead.</note>
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {TableWidth} sType - Type of the width value from one of the available width values types.
 * @param {number} [nValue] - The table width value measured in positive integers.
 */
ApiTablePr.prototype.SetWidth = function(sType, nValue){};

/**
 * Specify the algorithm which will be used to lay out the contents of this table within the document.
 * @memberof ApiTablePr
 * @typeofeditors ["CDE"]
 * @param {("autofit" | "fixed")} sType - The type of the table layout in the document.
 */
ApiTablePr.prototype.SetTableLayout = function(sType){};

/**
 * Get the type of this class.
 * @memberof ApiTableRowPr
 * @typeofeditors ["CDE"]
 * @returns {"tableRowPr"}
 */
ApiTableRowPr.prototype.GetClassType = function(){ return ""; };

/**
 * Set the height of the current table row within the current table.
 * @memberof ApiTableRowPr
 * @typeofeditors ["CDE"]
 * @param {("auto" | "atLeast")} sHRule - The rule to either apply or ignore the height value to the current table row. Use the <code>"atLeast"</code> value to enable the <code>SetHeight</code> method use.
 * @param {twips} [nValue] - The height for the current table row measured in twentieths of a point (1/1440 of an inch). This value will be ignored if <code>sHRule="auto"<code>.
 */
ApiTableRowPr.prototype.SetHeight = function(sHRule, nValue){};

/**
 * Specify that the current table row will be repeated at the top of each new page 
 * wherever this table is displayed. This gives this table row the behavior of a 'header' row on 
 * each of these pages. This element can be applied to any number of rows at the top of the 
 * table structure in order to generate multi-row table headers.
 * @memberof ApiTableRowPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isHeader - The true value will enable the SetTableHeader method use.
 */
ApiTableRowPr.prototype.SetTableHeader = function(isHeader){};

/**
 * Get the type of this class.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @returns {"tableCellPr"}
 */
ApiTableCellPr.prototype.GetClassType = function(){ return ""; };

/**
 * Specify the shading applied to the contents of the table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {ShdType} sType - The shading type which will be applied to the contents of the current table cell.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 * @param {boolean} [isAuto=false] - The true value will disable table cell contents shading.
 */
ApiTableCellPr.prototype.SetShd = function(sType, r, g, b, isAuto){};

/**
 * Specify the amount of space which will be left between the bottom extent of the cell contents and the border
 * of a specific table cell within a table.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {?twips} nValue - The value for the amount of space below the bottom extent of the cell measured in twentieths
 * of a point (1/1440 of an inch). If this value is <code>null</code>, then default table cell bottom margin will be used, otherwise
 * the table cell bottom margin will be overridden with the specified value for the current cell.
 */
ApiTableCellPr.prototype.SetCellMarginBottom = function(nValue){};

/**
 * Specify the amount of space which will be left between the left extent of the cell contents and 
 * the border of a specific table cell within a table.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {?twips} nValue - The value for the amount of space to the left extent of the cell measured in twentieths
 * of a point (1/1440 of an inch). If this value is <code>null<c/ode>, then default table cell left margin will be used, otherwise
 * the table cell left margin will be overridden with the specified value for the current cell.
 */
ApiTableCellPr.prototype.SetCellMarginLeft = function(nValue){};

/**
 * Specify the amount of space which will be left between the right extent of the cell contents and the border of a specific table cell within a table.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {?twips} nValue - The value for the amount of space to the right extent of the cell measured in twentieths
 * of a point (1/1440 of an inch). If this value is <code>null</code>, then default table cell right margin will be used, otherwise
 * the table cell right margin will be overridden with the specified value for the current cell.
 */
ApiTableCellPr.prototype.SetCellMarginRight = function(nValue){};

/**
 * Specify the amount of space which will be left between the upper extent of the cell contents
 * and the border of a specific table cell within a table.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {?twips} nValue - The value for the amount of space above the upper extent of the cell measured in twentieths
 * of a point (1/1440 of an inch). If this value is <code>null</code>, then default table cell top margin will be used, otherwise
 * the table cell top margin will be overridden with the specified value for the current cell.
 */
ApiTableCellPr.prototype.SetCellMarginTop = function(nValue){};

/**
 * Set the border which will be displayed at the bottom of the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The cell bottom border style.
 * @param {pt_8} nSize - The width of the current cell bottom border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the bottom part of the table cell measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTableCellPr.prototype.SetCellBorderBottom = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed to the left of the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The cell left border style.
 * @param {pt_8} nSize - The width of the current cell left border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the left part of the table cell measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTableCellPr.prototype.SetCellBorderLeft = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed to the right of the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The cell right border style.
 * @param {pt_8} nSize - The width of the current cell right border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the right part of the table cell measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTableCellPr.prototype.SetCellBorderRight = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the border which will be displayed at the top of the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {BorderType} sType - The cell top border style.
 * @param {pt_8} nSize - The width of the current cell top border measured in eighths of a point.
 * @param {pt} nSpace - The spacing offset in the top part of the table cell measured in points used to place this border.
 * @param {byte} r - Red color component value.
 * @param {byte} g - Green color component value.
 * @param {byte} b - Blue color component value.
 */
ApiTableCellPr.prototype.SetCellBorderTop = function(sType, nSize, nSpace, r, g, b){};

/**
 * Set the preferred width for the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {TableWidth} sType - Type of the width value from one of the available width values types.
 * @param {number} [nValue] - The table cell width value measured in positive integers.
 */
ApiTableCellPr.prototype.SetWidth = function(sType, nValue){};

/**
 * Specify the vertical alignment for text contents within the current table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {("top" | "center" | "bottom")} sType - The available types of the vertical alignment for the text contents of the current table cell.
 */
ApiTableCellPr.prototype.SetVerticalAlign = function(sType){};

/**
 * Specify the direction of the text flow for this table cell.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {("lrtb" | "tbrl" | "btlr")} sType - The available types of the text direction in the table cell: <code>"lrtb"</code>
 * - text direction left-to-right moving from top to bottom, <code>"tbrl"</code> - text direction top-to-bottom moving from right
 * to left, <code>"btlr"</code> - text direction bottom-to-top moving from left to right.
 */
ApiTableCellPr.prototype.SetTextDirection = function(sType){};

/**
 * Specify how this table cell is laid out when the parent table is displayed in a document. This setting
 * only affects the behavior of the cell when the {@link ApiTablePr#SetTableLayout} table layout for this table is set to use the <code>"autofit"</code> algorithm.
 * @memberof ApiTableCellPr
 * @typeofeditors ["CDE"]
 * @param {boolean} isNoWrap - The true value will enable the <code>SetNoWrap</code> method use.
 */
ApiTableCellPr.prototype.SetNoWrap = function(isNoWrap){};

/**
 * Get the type of this class.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {"tableStylePr"}
 */
ApiTableStylePr.prototype.GetClassType = function(){ return ""; };

/**
 * Get the type of the current table conditional style.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {TableStyleOverrideType}
 */
ApiTableStylePr.prototype.GetType = function(){ return new TableStyleOverrideType(); };

/**
 * Get the set of the text run properties which will be applied to all the text runs within the table which match the conditional formatting type.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {ApiTextPr}
 */
ApiTableStylePr.prototype.GetTextPr = function(){ return new ApiTextPr(); };

/**
 * Get the set of the paragraph properties which will be applied to all the paragraphs within a table which match the conditional formatting type.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {ApiParaPr}
 */
ApiTableStylePr.prototype.GetParaPr = function(){ return new ApiParaPr(); };

/**
 * Get the set of the table properties which will be applied to all the regions within a table which match the conditional formatting type.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {ApiTablePr}
 */
ApiTableStylePr.prototype.GetTablePr = function(){ return new ApiTablePr(); };

/**
 * Get the set of the table row properties which will be applied to all the rows within a table which match the conditional formatting type.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {ApiTableRowPr}
 */
ApiTableStylePr.prototype.GetTableRowPr = function(){ return new ApiTableRowPr(); };

/**
 * Get the set of the table cell properties which will be applied to all the cells within a table which match the conditional formatting type.
 * @memberof ApiTableStylePr
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCellPr}
 */
ApiTableStylePr.prototype.GetTableCellPr = function(){ return new ApiTableCellPr(); };

/**
 * Get the type of the class based on this base class.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE", "CPE"]
 * @returns {"drawing"}
 */
ApiDrawing.prototype.GetClassType = function(){ return ""; };

/**
 * Set the size of the object (image, shape, chart) bounding box.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {EMU} nWidth - The object width measured in English measure units.
 * @param {EMU} nHeight - The object height measured in English measure units.
 */
ApiDrawing.prototype.SetSize = function(nWidth, nHeight){};

/**
 * Set the wrapping type of this object (image, shape, chart). One of the following wrapping style types can be set:
 * * <b>"inline"</b> - the object is considered to be a part of the text, like a character, so when the text moves, the object moves as well. In this case the positioning options are inaccessible.
 * If one of the following styles is selected, the object can be moved independently of the text and positioned on the page exactly:
 * * <b>"square"</b> - the text wraps the rectangular box that bounds the object.
 * * <b>"tight"</b> - the text wraps the actual object edges.
 * * <b>"through"</b> - the text wraps around the object edges and fills in the open white space within the object.
 * * <b>"topAndBottom"</b> - the text is only above and below the object.
 * * <b>"behind"</b> - the text overlaps the object.
 * * <b>"inFront"</b> - the object overlaps the text.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {"inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"} sType - The wrapping style type available for the object.
 */
ApiDrawing.prototype.SetWrappingStyle = function(sType){};

/**
 * Specify how the floating object will be horizontally aligned.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {RelFromH} [sRelativeFrom="page"] - The document element which will be taken as a countdown point for the object horizontal alignment.
 * @param {("left" | "right" | "center")} [sAlign="left"] - The alingment type which will be used for the object horizontal alignment.
 */
ApiDrawing.prototype.SetHorAlign = function(sRelativeFrom, sAlign){};

/**
 * Specify how the floating object will be vertically aligned.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {RelFromV} [sRelativeFrom="page"] - The document element which will be taken as a countdown point for the object vertical alignment.
 * @param {("top" | "bottom" | "center")} [sAlign="top"] - The alingment type which will be used for the object vertical alignment.
 */
ApiDrawing.prototype.SetVerAlign = function(sRelativeFrom, sAlign){};

/**
 * Set an absolute measurement for the horizontal positioning of the floating object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {RelFromH} sRelativeFrom - The document element which will be taken as a countdown point for the object horizontal alignment.
 * @param {EMU} nDistance - The distance from the right side of the document element to the floating object measured in English measure units.
 */
ApiDrawing.prototype.SetHorPosition = function(sRelativeFrom, nDistance){};

/**
 * Set an absolute measurement for the vertical positioning of the floating object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {RelFromV} sRelativeFrom - The document element which will be taken as a countdown point for the object vertical alignment.
 * @param {EMU} nDistance - The distance from the bottom part of the document element to the floating object measured in English measure units.
 */
ApiDrawing.prototype.SetVerPosition = function(sRelativeFrom, nDistance){};

/**
 * Specify the minimum distance which will be maintained between the edges of this drawing object and any
 * subsequent text.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {EMU} nLeft - The distance from the left side of the current object and the subsequent text run measured in English measure units.
 * @param {EMU} nTop - The distance from the top side of the current object and the preceding text run measured in English measure units.
 * @param {EMU} nRight - The distance from the right side of the current object and the subsequent text run measured in English measure units.
 * @param {EMU} nBottom - The distance from the bottom side of the current object and the subsequent text run measured in English measure units.
 */
ApiDrawing.prototype.SetDistances = function(nLeft, nTop, nRight, nBottom){};

/**
 * Gets the parent paragraph that contains the graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiParagraph | null} - returns null if parent paragraph doesn't exist.
 */
ApiDrawing.prototype.GetParentParagraph = function(){ return new ApiParagraph(); };

/**
 * Gets the parent content control that contains the graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | null} - returns null if parent content control doesn't exist.
 */
ApiDrawing.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Gets the parent table that contains the graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.
 */
ApiDrawing.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the parent table cell that contains the graphic object.
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null if parent cell doesn't exist.
 */
ApiDrawing.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Deletes the graphic object. 
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if drawing object haven't parent.
 */
ApiDrawing.prototype.Delete = function(){ return true; };

/**
 * Copy the graphic object. 
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing}
 */
ApiDrawing.prototype.Copy = function(){ return new ApiDrawing(); };

/**
 * Wraps the graphic object with a rich text content control.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {number} nType - if nType === 1 -> returns ApiBlockLvlSdt, else -> return ApiDrawing
 * @returns {ApiDrawing | ApiBlockLvlSdt}  
 */
ApiDrawing.prototype.InsertInContentControl = function(nType){ return new ApiDrawing(); };

/**
 * Inserts a paragraph at the specified position.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {string | ApiParagraph} paragraph - text or paragraph
 * @param {string} sPosition - can be "after" or "before"
 * @param {bool} beRNewPara - if "true" - returns new paragraph, else returns this ApiDrawing.
 * @returns {ApiParagraph | ApiDrawing} - returns null if parent paragraph doesn't exist.
 */
ApiDrawing.prototype.InsertParagraph = function(paragraph, sPosition, beRNewPara){ return new ApiParagraph(); };

/**
 * Selects the graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 */
ApiDrawing.prototype.Select = function(){};

/**
 * Inserts a break at the specified location in the main document.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {number}breakType - 0 -> page break, 1 -> line break.
 * @param {string}position  - can bet "after" or "before" 
 * @returns {bool}  - returns false if drawing object haven't parent run or params are invalid.
 */
ApiDrawing.prototype.AddBreak = function(breakType, position){ return true; };

/**
 * Horizontal Reflection.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {bool} bFlip 
 */
ApiDrawing.prototype.SetHorFlip = function(bFlip){};

/**
 * Vertical reflection.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {bool} bFlip 
 * @returns {bool} - returns false if param is invalid.
 */
ApiDrawing.prototype.SetVertFlip = function(bFlip){ return true; };

/**
 * Scales the height of the figure using the specified coefficient.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {number} coefficient 
 * @returns {bool} - return false if param is invalid.
 */
ApiDrawing.prototype.ScaleHeight = function(coefficient){ return true; };

/**
 * Scales the width of the graphic object using the specified ratio.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {number} coefficient
 * @returns {bool} - return false if param is invali.
 */
ApiDrawing.prototype.ScaleWidth = function(coefficient){ return true; };

/**
 * Sets the fill formatting properties for the specified graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {ApiFill} oFill
 * @returns {bool} - returns false if param is invalid.
 */
ApiDrawing.prototype.Fill = function(oFill){ return true; };

/**
 * Sets the outline properties for the specified graphic object.
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @param {ApiStroke} oStroke
 * @returns {bool} - returns false if param is invalid.
 */
ApiDrawing.prototype.SetOutLine = function(oStroke){ return true; };

/**
 * Gets the next inline drawing object. 
 *  @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing | null} - returns null if drawing object is last.
 */
ApiDrawing.prototype.GetNextDrawing = function(){ return new ApiDrawing(); };

/**
 * Gets the previous inline drawing object. 
 * @memberof ApiDrawing
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing | null} - returns null if drawing object is first.
 */
ApiDrawing.prototype.GetPrevDrawing = function(){ return new ApiDrawing(); };

/**
 * Get the type of this class.
 * @memberof ApiImage
 * @typeofeditors ["CDE", "CPE"]
 * @returns {"image"}
 */
ApiImage.prototype.GetClassType = function(){ return ""; };

/**
 * Gets the next inline image. 
 * @memberof ApiImage
 * @typeofeditors ["CDE"]
 * @returns {ApiImage | null} - returns null if image is last.
 */
ApiImage.prototype.GetNextImage= function(){ return new ApiImage(); };

/**
 * Gets the previous inline image. 
 * @memberof ApiImage
 * @typeofeditors ["CDE"]
 * @returns {ApiImage | null} - returns null if image is first.
 */
ApiImage.prototype.GetPrevImage= function(){ return new ApiImage(); };

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
 * @param {?EMU} nLeft
 * @param {?EMU} nTop
 * @param {?EMU} nRight
 * @param {?EMU} nBottom
 */
ApiShape.prototype.SetPaddings = function(nLeft, nTop, nRight, nBottom){};

/**
 * Gets the next inline shape. 
 * @memberof ApiShape
 * @typeofeditors ["CDE"]
 * @returns {ApiShape | null} - returns null if shape is last.
 */
ApiShape.prototype.GetNextShape = function(){ return new ApiShape(); };

/**
 * Gets the previous inline shape. 
 * @memberof ApiShape
 * @typeofeditors ["CDE"]
 * @returns {ApiShape | null} - returns null is shape is first.
 */
ApiShape.prototype.GetPrevShape= function(){ return new ApiShape(); };

/**
 * Get the type of this class.
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @returns {"chart"}
 */
ApiChart.prototype.GetClassType = function(){ return ""; };

/**
 *  Specify the chart title.
 *  @memberof ApiChart
 *  @typeofeditors ["CDE"]
 *  @param {string} sTitle - The title which will be displayed for the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the chart title is written in bold font or not.
 */
ApiChart.prototype.SetTitle = function (sTitle, nFontSize, bIsBold){};

/**
 *  Specify the chart horizontal axis title.
 *  @memberof ApiChart
 *  @typeofeditors ["CDE"]
 *  @param {string} sTitle - The title which will be displayed for the horizontal axis of the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the horizontal axis title is written in bold font or not.
 * */
ApiChart.prototype.SetHorAxisTitle = function (sTitle, nFontSize, bIsBold){};

/**
 *  Specify the chart vertical axis title.
 *  @memberof ApiChart
 *  @typeofeditors ["CDE"]
 *  @param {string} sTitle - The title which will be displayed for the vertical axis of the current chart.
 *  @param {pt} nFontSize - The text size value measured in points.
 *  @param {?bool} bIsBold - Specifies if the vertical axis title is written in bold font or not.
 * */
ApiChart.prototype.SetVerAxisTitle = function (sTitle, nFontSize, bIsBold){};

/**
 * Specifies a  vertical axis orientation
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {bool} bIsMinMax
 * */
ApiChart.prototype.SetVerAxisOrientation = function(bIsMinMax){};

/**
 * Specifies a  horizontal axis orientation
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {bool} bIsMinMax
 * */
ApiChart.prototype.SetHorAxisOrientation = function(bIsMinMax){};

/**
 * Specify the chart legend position.
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {"left" | "top" | "right" | "bottom" | "none"} sLegendPos - The position of the chart legend inside the chart window.
 * */
ApiChart.prototype.SetLegendPos = function(sLegendPos){};

/**
 * Specifies a legend position
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @number nFontSize
 * */
ApiChart.prototype.SetLegendFontSize = function(nFontSize){};

/**
 * Specifies which chart data labels are shown for the chart.
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {boolean} bShowSerName - Whether to show or hide the source table column names used for the data which the chart will be build from.
 * @param {boolean} bShowCatName - Whether to show or hide the source table row names used for the data which the chart will be build from.
 * @param {boolean} bShowVal - Whether to show or hide the chart data values.
 * @param {boolean} bShowPercent - Whether to show or hide the percent for the data values (works with stacked chart types).
 * */
ApiChart.prototype.SetShowDataLabels = function(bShowSerName, bShowCatName, bShowVal, bShowPercent){};

/**
 * Spicifies a show options for data labels
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {number} nSeriesIndex
 * @param {number} nPointIndex
 * @param {boolean} bShowSerName
 * @param {boolean} bShowCatName
 * @param {boolean} bShowVal
 * @param {boolean} bShowPercent
 * */
ApiChart.prototype.SetShowPointDataLabel = function(nSeriesIndex, nPointIndex, bShowSerName, bShowCatName, bShowVal, bShowPercent){};

/**
 * Spicifies tick labels position vertical axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickLabelPosition} sTickLabelPosition
 * */
ApiChart.prototype.SetVertAxisTickLabelPosition = function(sTickLabelPosition){};

/**
 * Spicifies tick labels position horizontal axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickLabelPosition} sTickLabelPosition
 * */
ApiChart.prototype.SetHorAxisTickLabelPosition = function(sTickLabelPosition){};

/**
 * Specifies major tick mark for horizontal axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickMark} sTickMark
 * */
ApiChart.prototype.SetHorAxisMajorTickMark = function(sTickMark){};

/**
 * Specifies minor tick mark for horizontal axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickMark} sTickMark
 * */
ApiChart.prototype.SetHorAxisMinorTickMark = function(sTickMark){};

/**
 * Specifies major tick mark for vertical axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickMark} sTickMark
 * */
ApiChart.prototype.SetVertAxisMajorTickMark = function(sTickMark){};

/**
 * Specifies minor tick mark for vertical axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {TickMark} sTickMark
 * */
ApiChart.prototype.SetVertAxisMinorTickMark = function(sTickMark){};

/**
 * Specifies major vertical gridline's visual properties
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {?ApiStroke} oStroke
 * */
ApiChart.prototype.SetMajorVerticalGridlines = function(oStroke){};

/**
 * Specifies minor vertical gridline's visual properties
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {?ApiStroke} oStroke
 * */
ApiChart.prototype.SetMinorVerticalGridlines = function(oStroke){};

/**
 * Specifies major horizontal gridline's visual properties
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {?ApiStroke} oStroke
 * */
ApiChart.prototype.SetMajorHorizontalGridlines = function(oStroke){};

/**
 * Specifies minor vertical gridline's visual properties
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {?ApiStroke} oStroke
 * */
ApiChart.prototype.SetMinorHorizontalGridlines = function(oStroke){};

/**
 * Specifies font size for labels of horizontal axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {number} nFontSize
 */
ApiChart.prototype.SetHorAxisLablesFontSize = function(nFontSize){};

/**
 * Specifies font size for labels of vertical axis
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @param {number} nFontSize
 */
ApiChart.prototype.SetVertAxisLablesFontSize = function(nFontSize){};

/**
 * Gets the next inline chart.
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @returns {ApiChart | null} - returns null if chart is last.
 */
ApiChart.prototype.GetNextChart = function(){ return new ApiChart(); };

/**
 * Gets the previous inline chart. 
 * @memberof ApiChart
 * @typeofeditors ["CDE"]
 * @returns {ApiChart | null} - return null if char if first.
 */
ApiChart.prototype.GetPrevChart= function(){ return new ApiChart(); };

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
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {"inlineLvlSdt"}
 */
ApiInlineLvlSdt.prototype.GetClassType = function(){ return ""; };

/**
 * Set the lock to the current inline text content control.
 * <b>"contentLocked"</b> - content cannot be edited
 * <b>"sdtContentLocked"</b> - content cannot be edited and BlockLvlSdt cannot be deleted.
 * <b>"sdtLocked"</b> - BlockLvlSdt cannot be deleted.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {"contentLocked" | "sdtContentLocked" | "sdtLocked"} sLockType - The type of the lock applied to the inline text content control.
 */
ApiInlineLvlSdt.prototype.SetLock = function(sLockType){};

/**
 * Get the lock type of this container
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {SdtLock}
 */
ApiInlineLvlSdt.prototype.GetLock = function(){ return new SdtLock(); };

/**
 * Add a string tag to the current inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sTag - The tag which will be added to the current inline text content control.
 */
ApiInlineLvlSdt.prototype.SetTag = function(sTag){};

/**
 * Get the tag attribute for this container
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiInlineLvlSdt.prototype.GetTag = function(){ return ""; };

/**
 * Add a string label to the current inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sLabel - The label which will be added to the current inline text content control. Can be a positive or negative integer from **-2147483647** to **2147483647**.
 */
ApiInlineLvlSdt.prototype.SetLabel = function(sLabel){};

/**
 * Get the label attribute for this container
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiInlineLvlSdt.prototype.GetLabel = function(){ return ""; };

/**
 * Set the alias attribute for this container
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sAlias
 */
ApiInlineLvlSdt.prototype.SetAlias = function(sAlias){};

/**
 * Get the alias attribute for this container
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiInlineLvlSdt.prototype.GetAlias = function(){ return ""; };

/**
 * Get the number of elements in the current inline text content control. The text content 
 * control is created with one text run present in it by default, so any even without any 
 * element added this method will return the value of '1'.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {number}
 */
ApiInlineLvlSdt.prototype.GetElementsCount = function(){ return 0; };

/**
 * Get the element of the current inline text content control using the position specified.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The position where the element which content we want to get must be located.
 * @returns {ParagraphContent}
 */
ApiInlineLvlSdt.prototype.GetElement = function(nPos){ return new ParagraphContent(); };

/**
 * Remove the element using the position specified from the current inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The position of the element which we want to remove from the current inline text content control.
 */
ApiInlineLvlSdt.prototype.RemoveElement = function(nPos){};

/**
 * Remove all the elements from the current inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns false if control haven't elements.
 */
ApiInlineLvlSdt.prototype.RemoveAllElements = function(){ return true; };

/**
 * Add an element to the inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {ParagraphContent} oElement - The document element which will be added at the position specified. Returns **false** if the type of *oElement* is not supported by an inline text content control.
 * @param {number} [nPos] - The position of the element where it will be added to the current inline text content control. If this value is not specified then the element will be added to the end of the current inline text content control.
 * @returns {bool} - returns false if oElement unsupported.
 */
ApiInlineLvlSdt.prototype.AddElement = function(oElement, nPos){ return true; };

/**
 * Add an element to the end of inline text content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {number} nPos - The position where the current element will be added.
 * @param {DocumentElement} oElement - The document element which will be added at the current position.
 * @returns {bool} - returns false if oElement unsupported.
 */
ApiInlineLvlSdt.prototype.Push = function(oElement){ return true; };

/**
 * Adds text to the current content control. 
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {String} sText - The text which will be add to the content control.
 * @returns {bool} - returns false if param is invalid.
 */
ApiInlineLvlSdt.prototype.AddText = function(sText){ return true; };

/**
 * Removes content control and content. If keepContent is true, the content is not deleted.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {bool} keepContent
 * @returns {bool} - returns false if control haven't parent paragraph.
 */
ApiInlineLvlSdt.prototype.Delete = function(keepContent){ return true; };

/**
 * Applies text settings to content of content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 * @returns {ApiInlineLvlSdt} this.
 */
ApiInlineLvlSdt.prototype.SetTextPr = function(oTextPr){ return new ApiInlineLvlSdt(); };

/**
 * Gets the content control that contains the current content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | null} - returns null if parent content control doesn't exist.
 */
ApiInlineLvlSdt.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Gets the table that contains the content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null if parent table doesn't exist.  
 */
ApiInlineLvlSdt.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the table cell that contains the content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - return null if parent cell doesn't exist.  
 */
ApiInlineLvlSdt.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Returns a Range object that represents the part of the document contained in the specified content control.
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiInlineLvlSdt.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Create a copy of the inline content control. Ingonore comments, footnote references, complex fields
 * @memberof ApiInlineLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiInlineLvlSdt}
 */
ApiInlineLvlSdt.prototype.Copy = function(){ return new ApiInlineLvlSdt(); };

/**
 * Get the type of this class.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {"blockLvlSdt"}
 */
ApiBlockLvlSdt.prototype.GetClassType = function(){ return ""; };

/**
 * Set the lock to the current inline text content control.
 * <b>"contentLocked"</b> - content cannot be edited
 * <b>"sdtContentLocked"</b> - content cannot be edited and BlockLvlSdt cannot be deleted.
 * <b>"sdtLocked"</b> - BlockLvlSdt cannot be deleted.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {"contentLocked" | "sdtContentLocked" | "sdtLocked"} sLockType - The type of the lock applied to the inline text content control.
 */
ApiBlockLvlSdt.prototype.SetLock = function(sLockType){};

/**
 * Get the lock type of this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {SdtLock}
 */
ApiBlockLvlSdt.prototype.GetLock = function(){ return new SdtLock(); };

/**
 * Set the tag attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sTag
 */
ApiBlockLvlSdt.prototype.SetTag = function(sTag){};

/**
 * Get the tag attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiBlockLvlSdt.prototype.GetTag = function(){ return ""; };

/**
 * Set the label attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sLabel
 */
ApiBlockLvlSdt.prototype.SetLabel = function(sLabel){};

/**
 * Get the label attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiBlockLvlSdt.prototype.GetLabel = function(){ return ""; };

/**
 * Set the alias attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sAlias
 */
ApiBlockLvlSdt.prototype.SetAlias = function(sAlias){};

/**
 * Get the alias attribute for this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {string}
 */
ApiBlockLvlSdt.prototype.GetAlias = function(){ return ""; };

/**
 * Get the content of this container
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiDocumentContent}
 */
ApiBlockLvlSdt.prototype.GetContent = function(){ return new ApiDocumentContent(); };

/**
 * Gets the collection of content control objects in the content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt[] | ApiInlineLvlSdt[]}
 */
ApiBlockLvlSdt.prototype.GetAllContentControls = function(){ return [new ApiBlockLvlSdt()]; };

/**
 * Get a collection of paragraph objects in a content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiParagraph[]}
 */
ApiBlockLvlSdt.prototype.GetAllParagraphs = function(){ return [new ApiParagraph()]; };

/**
 * Get the collection of tables on a given absolute page.
 * <note>This method can be a little bit slow, because it runs the document calculation
 * process to arrange tables on the specified page</note>
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param nPage - page number
 * @returns {ApiTable[]}  
 */
ApiBlockLvlSdt.prototype.GetAllTablesOnPage = function(nPage){ return [new ApiTable()]; };

/**
 * Clears the contents of a content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {bool} - returns true.
 */
ApiBlockLvlSdt.prototype.RemoveAllElements = function(){ return true; };

/**
 * Removes content control and content. If keepContent is true, the content is not deleted.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {bool} keepContent
 * @returns {bool} - returns false if content control haven't parent.
 */
ApiBlockLvlSdt.prototype.Delete = function(keepContent){ return true; };

/**
 * Applies text settings to content of content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {ApiTextPr} oTextPr
 */
ApiBlockLvlSdt.prototype.SetTextPr = function(oTextPr){};

/**
 * Gets the collection of drawing objects in the document.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiDrawing[]}  
 */
ApiBlockLvlSdt.prototype.GetAllDrawingObjects = function(){ return [new ApiDrawing()]; };

/**
 * Gets the content control that contains the current content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiBlockLvlSdt | null} - returns null if parent content control doesn't exist.  
 */
ApiBlockLvlSdt.prototype.GetParentContentControl = function(){ return new ApiBlockLvlSdt(); };

/**
 * Gets the table that contains the content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiTable | null} - returns null is parent table does'n exist.  
 */
ApiBlockLvlSdt.prototype.GetParentTable = function(){ return new ApiTable(); };

/**
 * Gets the table cell that contains the content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @returns {ApiTableCell | null} - returns null if parent cell doesn't exist.  
 */
ApiBlockLvlSdt.prototype.GetParentTableCell = function(){ return new ApiTableCell(); };

/**
 * Push a paragraph or a table or BlockLvl content control to actually add it to the document.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {DocumentElement} oElement - The type of the element which will be pushed to the document.
 * @returns {bool} - returns false if oElement unsupported.
 */
ApiBlockLvlSdt.prototype.Push = function(oElement){ return true; };

/**
 * Push a paragraph or a table or a blocklvl content control to actually add it to the document.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {DocumentElement} oElement - The type of the element which will be pushed to the document.
 * @param {Number} nPos - The specified position.
 * @returns {bool} - returns false if oElement unsupported.
 */
ApiBlockLvlSdt.prototype.AddElement = function(oElement, nPos){ return true; };

/**
 * Adds a text to the current content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {String} sText - The text which will be add to the content control.
 * @returns {bool} - returns false if param is invalid.
 */
ApiBlockLvlSdt.prototype.AddText = function(sText){ return true; };

/**
 * Returns a Range object that represents the part of the document contained in the specified content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {Number} Start - start character in current element
 * @param {Number} End - end character in current element
 * @returns {ApiRange} 
 * */
ApiBlockLvlSdt.prototype.GetRange = function(Start, End){ return new ApiRange(); };

/**
 * Searches for the scope of a content control object. The search results are a collection of ApiRange objects.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 * @param {string} sText 
 * @param {bool} isMatchCase - is case sensitive. 
 * @returns {ApiRange[]}  
 */
ApiBlockLvlSdt.prototype.Search = function(sText, isMatchCase){ return [new ApiRange()]; };

/**
 * Select a content control.
 * @memberof ApiBlockLvlSdt
 * @typeofeditors ["CDE"]
 */
ApiBlockLvlSdt.prototype.Select = function(){};


