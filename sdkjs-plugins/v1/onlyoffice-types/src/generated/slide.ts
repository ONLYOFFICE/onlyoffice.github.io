export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: slide

export interface ApiSlide {
  CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
  CreateBullet(sSymbol: string): ApiBullet;
  CreateChart(sType?: ChartType, aSeries: any[], aSeriesNames: any[], aCatNames: any[], nWidth: number, nHeight: number, nStyleIndex: number, aNumFormats: NumFormat[] | String[]): ApiChart;
  CreateGradientStop(uniColor: ApiUniColor, pos: PositivePercentage): ApiGradientStop;
  CreateGroup(aDrawings: DrawingForGroup[]): ApiGroup;
  CreateImage(sImageSrc: string, nWidth: number, nHeight: number): ApiImage;
  CreateLayout(oMaster?: ApiMaster): ApiLayout;
  CreateLinearGradientFill(gradientStops: any[], angle: PositiveFixedAngle): ApiFill;
  CreateMaster(oTheme?: ApiTheme): ApiMaster;
  CreateNoFill(): ApiFill;
  CreateOleObject(sImageSrc: string, nWidth: number, nHeight: number, sData: string, sAppId: string): ApiOleObject;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType: PatternType, bgColor: ApiUniColor, fgColor: ApiUniColor): ApiFill;
  CreatePlaceholder(sType: string): ApiPlaceholder;
  CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
  CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops: any[]): ApiFill;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
  CreateShape(sType?: ShapeType, nWidth?: number, nHeight?: number, oFill?: ApiFill, oStroke?: ApiStroke): ApiShape;
  CreateSlide(): ApiSlide;
  CreateSolidFill(uniColor: ApiUniColor): ApiFill;
  CreateStroke(width: number, fill: ApiFill): ApiStroke;
  CreateTable(nCols: any, nRows: any): ApiTable;
  CreateTextPr(): ApiTextPr;
  CreateTheme(sName: string, oMaster: ApiMaster, oClrScheme: ApiThemeColorScheme, oFormatScheme: ApiThemeFormatScheme, oFontScheme: ApiThemeFontScheme): ApiTheme | null;
  CreateThemeColorScheme(arrColors: ApiUniColor[] | ApiRGBColor[], sName: string): ApiThemeColorScheme;
  CreateThemeFontScheme(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string, sName: string): ApiThemeFontScheme;
  CreateThemeFormatScheme(arrFill: ApiFill[], arrBgFill: ApiFill[], arrLine: ApiStroke[], sName: string): ApiThemeFormatScheme;
  CreateWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nIndLeft?: number, nIndTop?: number): ApiDrawing;
  FromJSON(sMessage: JSON): void;
  GetFullName(): string;
  GetPresentation(): ApiPresentation;
  GetSelection(): ApiSelection;
  ReplaceTextSmart(textStrings: any[], tab?: string, newLine?: string): void;
  Save(): void;
  attachEvent(eventName: string, callback: function): void;
  detachEvent(eventName: string): void;
}

/** Class representing a paragraph bullet. */
interface ApiBullet {
  GetClassType(): "bullet";
}

/** Class representing a chart. */
interface ApiChart {
  ApplyChartStyle(nStyleId: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetSeries(nIdx: number): ApiChartSeries;
  RemoveSeria(nSeria: number): boolean;
  SetAxieNumFormat(sFormat: NumFormat | string, sAxiePos: AxisPos): boolean;
  SetCategoryName(sName: string, nCategory: number): boolean;
  SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
  SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;
  SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;
  SetHorAxisMajorTickMark(sTickMark: TickMark): void;
  SetHorAxisMinorTickMark(sTickMark: TickMark): void;
  SetHorAxisOrientation(bIsMinMax: boolean): void;
  SetHorAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): void;
  SetHorAxisTitle(sTitle: string, nFontSize: number, bIsBold: bool): void;
  SetLegendFill(oFill: ApiFill): boolean;
  SetLegendFontSize(nFontSize: number): void;
  SetLegendOutLine(oStroke: ApiStroke): boolean;
  SetLegendPos(sLegendPos: "left" | "top" | "right" | "bottom" | "none"): void;
  SetMajorHorizontalGridlines(oStroke: ApiStroke): void;
  SetMajorVerticalGridlines(oStroke: ApiStroke): void;
  SetMarkerFill(oFill: ApiFill, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
  SetMarkerOutLine(oStroke: ApiStroke, nSeries: number, nMarker: number, bAllMarkers?: boolean): boolean;
  SetMinorHorizontalGridlines(oStroke: ApiStroke): void;
  SetMinorVerticalGridlines(oStroke: ApiStroke): void;
  SetPlotAreaFill(oFill: ApiFill): boolean;
  SetPlotAreaOutLine(oStroke: ApiStroke): boolean;
  SetSeriaName(sName: string, nSeria: number): boolean;
  SetSeriaNumFormat(sFormat: NumFormat | string, nSeria: number): boolean;
  SetSeriaValues(aValues: number[], nSeria: number): boolean;
  SetSeriesFill(oFill: ApiFill, nSeries: number, bAll?: boolean): boolean;
  SetSeriesOutLine(oStroke: ApiStroke, nSeries: number, bAll?: boolean): boolean;
  SetShowDataLabels(bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): void;
  SetShowPointDataLabel(nSeriesIndex: number, nPointIndex: number, bShowSerName: boolean, bShowCatName: boolean, bShowVal: boolean, bShowPercent: boolean): void;
  SetTitle(sTitle: string, nFontSize: number, bIsBold: bool): void;
  SetTitleFill(oFill: ApiFill): boolean;
  SetTitleOutLine(oStroke: ApiStroke): boolean;
  SetVerAxisOrientation(bIsMinMax: boolean): void;
  SetVerAxisTitle(sTitle: string, nFontSize: number, bIsBold: bool): void;
  SetVertAxisMajorTickMark(sTickMark: TickMark): void;
  SetVertAxisMinorTickMark(sTickMark: TickMark): void;
  SetVertAxisTickLabelPosition(sTickLabelPosition: TickLabelPosition): void;
  SetXValues(aValues: string[]): boolean;
}

/** Class representing a chart series. */
interface ApiChartSeries {
  ChangeChartType(sType: ChartType): boolean;
  GetChartType(): ChartType;
  GetClassType(): "chartSeries";
}

/** Class representing a comment. */
interface ApiComment {
  AddReply(sText: string, sAuthorName: string, sUserId: string, nPos?: number): ApiComment;
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
  SetAuthorName(sAuthorName: string): ApiComment;
  SetSolved(bSolved: boolean): ApiComment;
  SetText(sText: string): ApiComment;
  SetTime(nTimeStamp: number | string): ApiComment;
  SetTimeUTC(nTimeStamp: number | string): ApiComment;
  SetUserId(sUserId: string): ApiComment;
}

/** Class representing a comment reply. */
interface ApiCommentReply {
  GetAuthorName(): string;
  GetClassType(): "commentReply";
  GetText(): string;
  SetAuthorName(sAuthorName: string): ApiCommentReply;
  SetText(sText: string): ApiCommentReply;
  SetUserId(sUserId: string): ApiCommentReply;
}

/** Class representing a container for paragraphs and tables. */
interface ApiDocumentContent {
  AddElement(nPos: number, oElement: DocumentElement): void;
  GetClassType(): "documentContent";
  GetElement(nPos: number): DocumentElement;
  GetElementsCount(): number;
  Push(oElement: DocumentElement): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos: number): void;
}

/** Class representing a graphical object. */
interface ApiDrawing {
  Copy(): ApiDrawing;
  Delete(): boolean;
  GetClassType(): "drawing";
  GetHeight(): number;
  GetLockValue(sType: DrawingLockType): bool;
  GetParent(): ApiSlide | ApiLayout | ApiMaster | null;
  GetParentLayout(): ApiLayout | null;
  GetParentMaster(): ApiMaster | null;
  GetParentSlide(): ApiSlide | null;
  GetPlaceholder(): ApiPlaceholder | null;
  GetWidth(): number;
  Select(): void;
  SetLockValue(sType: DrawingLockType, bValue: bool): bool;
  SetPlaceholder(oPlaceholder: ApiPlaceholder): boolean;
  SetPosition(nPosX: number, nPosY: number): void;
  SetSize(nWidth: number, nHeight: number): void;
  ToJSON(): JSON;
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
  GetElement(nPos: number): ParagraphContent;
  GetElementsCount(): number;
  GetLinkedText(): string;
  GetScreenTipText(): string;
  SetDefaultStyle(): boolean;
  SetDisplayedText(sDisplay: string): boolean;
  SetLink(sLink: string): boolean;
  SetScreenTipText(sScreenTipText: string): boolean;
}

/** Class representing an image. */
interface ApiImage {
  GetClassType(): "image";
}

/** Class representing a slide layout. */
interface ApiLayout {
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
  GetClassType(): "layout";
  GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
  GetMaster(): ApiMaster;
  GetName(): string;
  GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
  MoveTo(nPos: number): boolean;
  RemoveObject(nPos: number, nCount?: number): boolean;
  SetBackground(oApiFill: ApiFill): boolean;
  SetName(sName: string): boolean;
  ToJSON(bWriteMaster?: bool, bWriteTableStyles?: bool): JSON;
}

/** Class representing a slide master. */
interface ApiMaster {
  AddLayout(nPos?: number, oLayout: ApiLayout): boolean;
  AddObject(oDrawing: ApiDrawing): boolean;
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
  GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
  GetLayout(nPos: number): ApiLayout | null;
  GetLayoutsCount(): number;
  GetTheme(): ApiTheme | null;
  GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
  RemoveLayout(nPos: number, nCount?: number): boolean;
  RemoveObject(nPos: number, nCount?: number): boolean;
  SetBackground(oApiFill: ApiFill): boolean;
  SetTheme(oTheme: ApiTheme): boolean;
  ToJSON(bWriteTableStyles?: bool): JSON;
}

/** Class representing an OLE object. */
interface ApiOleObject {
  GetApplicationId(): string;
  GetClassType(): "oleObject";
  GetData(): string;
  SetApplicationId(sAppId: string): boolean;
  SetData(sData: string): boolean;
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
  SetBullet(oBullet: ApiBullet): void;
  SetIndFirstLine(nValue: number): void;
  SetIndLeft(nValue: number): void;
  SetIndRight(nValue: number): void;
  SetJc(sJc: "left" | "right" | "both" | "center"): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): void;
  SetTabs(aPos: twips[], aVal: TabJc[]): void;
}

/** Class representing a paragraph. */
interface ApiParagraph {
  AddElement(oElement: ParagraphContent, nPos?: number): boolean;
  AddLineBreak(): ApiRun;
  AddTabStop(): ApiRun;
  AddText(sText?: string): ApiRun;
  Copy(): ApiParagraph;
  Delete(): boolean;
  GetClassType(): "paraPr";
  GetElement(nPos: number): ParagraphContent;
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
  RemoveElement(nPos: number): void;
  SetBullet(oBullet: ApiBullet): void;
  SetHighlight(sColor: highlightColor): ApiParagraph;
  SetIndFirstLine(nValue: number): void;
  SetIndLeft(nValue: number): void;
  SetIndRight(nValue: number): void;
  SetJc(sJc: "left" | "right" | "both" | "center"): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): void;
  SetTabs(aPos: twips[], aVal: TabJc[]): void;
}

/** Class representing a placeholder. */
interface ApiPlaceholder {
  GetClassType(): "placeholder";
  GetIndex(): number | undefined;
  GetType(): PlaceholderType;
  SetIndex(nIdx: number): boolean;
  SetType(sType: PlaceholderType): boolean;
}

/** Class representing a presentation. */
interface ApiPresentation {
  AddMaster(nPos?: number, oApiMaster: ApiMaster): boolean;
  AddSlide(oSlide: ApiSlide): void;
  ApplyTheme(oApiTheme: ApiTheme): boolean;
  CreateNewHistoryPoint(): void;
  GetAllComments(): ApiComment[];
  GetAllSlideMasters(): ApiMaster[];
  GetAllSlides(): ApiSlide[];
  GetClassType(): "presentation";
  GetCurSlideIndex(): number;
  GetCurrentSlide(): ApiSlide;
  GetDocumentInfo(): object;
  GetHeight(): number;
  GetMaster(nPos: number): ApiMaster | null;
  GetMastersCount(): number;
  GetSlideByIndex(nIndex: number): ApiSlide;
  GetSlidesCount(): number;
  GetWidth(): number;
  RemoveSlides(nStart?: number, nCount?: number): boolean;
  ReplaceCurrentImage(sImageUrl: string, Width: number, Height: number): void;
  SetLanguage(sLangId: string): boolean;
  SetSizes(nWidth: number, nHeight: number): void;
  SlidesToJSON(nStart?: bool, nStart?: bool, bWriteLayout?: bool, bWriteMaster?: bool, bWriteAllMasLayouts?: bool, bWriteTableStyles?: bool): JSON[];
  ToJSON(bWriteTableStyles?: bool): JSON;
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
  AddText(sText: string): void;
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
  SetBold(isBold: boolean): ApiTextPr;
  SetCaps(isCaps: boolean): ApiTextPr;
  SetColor(r: number, g: number, b: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
  SetFill(oApiFill: ApiFill): ApiTextPr;
  SetFontFamily(sFontFamily: string): ApiTextPr;
  SetFontSize(nSize: hps): ApiTextPr;
  SetHighlight(sColor: highlightColor): ApiTextPr;
  SetItalic(isItalic: boolean): ApiTextPr;
  SetLanguage(sLangId: string): ApiTextPr;
  SetOutLine(oStroke: ApiStroke): ApiTextPr;
  SetPosition(nPosition: hps): ApiTextPr;
  SetShd(sType: ShdType, r: number, g: number, b: number): ApiTextPr;
  SetSmallCaps(isSmallCaps: boolean): ApiTextPr;
  SetSpacing(nSpacing: number): ApiTextPr;
  SetStrikeout(isStrikeout: boolean): ApiTextPr;
  SetStyle(oStyle: ApiStyle): ApiTextPr;
  SetTextFill(oApiFill: ApiFill): ApiTextPr;
  SetTextPr(oTextPr: ApiTextPr): ApiTextPr;
  SetUnderline(isUnderline: boolean): ApiTextPr;
  SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
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
  SetVerticalTextAlign(VerticalAlign: VerticalTextAlign): void;
}

/** Class representing a slide. */
interface ApiSlide {
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
  GetClassType(): "slide";
  GetDrawingsByPlaceholderType(sType: PlaceholderType): Drawing[];
  GetHeight(): number;
  GetLayout(): ApiLayout | null;
  GetSlideIndex(): number;
  GetTheme(): ApiTheme;
  GetVisible(): boolean;
  GetWidth(): number;
  GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
  MoveTo(nPos: number): boolean;
  RemoveAllObjects(): void;
  RemoveObject(nPos: number, nCount?: number): boolean;
  Select(): void;
  SetBackground(oApiFill: ApiFill): boolean;
  SetVisible(value: boolean): boolean;
  ToJSON(bWriteLayout?: bool, bWriteMaster?: bool, bWriteAllMasLayouts?: bool, bWriteTableStyles?: bool): JSON;
}

/** Class representing a stroke. */
interface ApiStroke {
  GetClassType(): "stroke";
}

/** Class representing a table. */
interface ApiTable {
  AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;
  AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): void;
  AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
  Copy(): ApiTable;
  GetClassType(): "table";
  GetRow(nIndex: number): ApiTableRow;
  MergeCells(aCells: ApiTableCell[]): ApiTableCell;
  RemoveColumn(oCell: ApiTableCell): boolean;
  RemoveRow(oCell: ApiTableCell): boolean;
  SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;
  SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): void;
  ToJSON(bWriteTableStyles?: bool): JSON;
}

/** Class representing a table cell. */
interface ApiTableCell {
  GetClassType(): "tableCell";
  GetContent(): ApiDocumentContent;
  SetCellBorderBottom(fSize: number, oApiFill: ApiFill): void;
  SetCellBorderLeft(fSize: number, oApiFill: ApiFill): void;
  SetCellBorderRight(fSize: number, oApiFill: ApiFill): void;
  SetCellBorderTop(fSize: number, oApiFill: ApiFill): void;
  SetCellMarginBottom(nValue: number): void;
  SetCellMarginLeft(nValue: number): void;
  SetCellMarginRight(nValue: number): void;
  SetCellMarginTop(nValue: number): void;
  SetShd(sType: ShdType | ApiFill, r: number, g: number, b: number): void;
  SetTextDirection(sType: "lrtb" | "tbrl" | "btlr"): void;
  SetVerticalAlign(sType: "top" | "center" | "bottom"): void;
}

/** Class representing a table row. */
interface ApiTableRow {
  GetCell(nPos: number): ApiTableCell;
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

/** Class representing a presentation theme. */
interface ApiTheme {
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
interface ApiThemeColorScheme {
  ChangeColor(nPos: number, oColor: ApiUniColor | ApiRGBColor): boolean;
  Copy(): ApiThemeColorScheme;
  GetClassType(): "themeColorScheme";
  SetSchemeName(sName: string): boolean;
  ToJSON(): JSON;
}

/** Class representing a theme font scheme. */
interface ApiThemeFontScheme {
  Copy(): ApiThemeFontScheme;
  GetClassType(): "themeFontScheme";
  SetFonts(mjLatin: string, mjEa: string, mjCs: string, mnLatin: string, mnEa: string, mnCs: string): void;
  SetSchemeName(sName: string): boolean;
  ToJSON(): JSON;
}

/** Class representing a theme format scheme. */
interface ApiThemeFormatScheme {
  ChangeBgFillStyles(arrBgFill: ApiFill[]): void;
  ChangeFillStyles(arrFill: ApiFill[]): void;
  ChangeLineStyles(arrLine: ApiStroke[]): void;
  Copy(): ApiThemeFormatScheme;
  GetClassType(): "themeFormatScheme";
  SetSchemeName(sName: string): boolean;
  ToJSON(): JSON;
}

/** Class representing a base class for color types. */
interface ApiUniColor {
  GetClassType(): "uniColor";
}

/** Class representing an unsupported element. */
interface ApiUnsupported {
  GetClassType(): "unsupported";
}

