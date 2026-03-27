export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: cell

/** Base class. */
export interface ApiCell {
  AddComment(sText: string, sAuthor: string): ApiComment | null;
  AddCustomFunction(fCustom: function): void;
  AddCustomFunctionLibrary(sName: string, Func: function): void;
  AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;
  AddSheet(sName: string): void;
  ClearCustomFunctions(): boolean;
  CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
  CreateBullet(sSymbol: string): ApiBullet;
  CreateColorByName(sPresetColor: PresetColor): ApiColor;
  CreateColorFromRGB(r: number, g: number, b: number): ApiColor;
  CreateGradientStop(uniColor: ApiUniColor, pos: PositivePercentage): ApiGradientStop;
  CreateLinearGradientFill(gradientStops: any[], angle: PositiveFixedAngle): ApiFill;
  CreateNewHistoryPoint(): void;
  CreateNoFill(): ApiFill;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType: PatternType, bgColor: ApiUniColor, fgColor: ApiUniColor): ApiFill;
  CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
  CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops: any[]): ApiFill;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
  CreateSolidFill(uniColor: ApiUniColor): ApiFill;
  CreateStroke(width: number, fill: ApiFill): ApiStroke;
  CreateTextPr(): ApiTextPr;
  Format(expression: string, format?: string): string;
  GetActiveSheet(): ApiWorksheet;
  GetAllComments(): ApiComment[];
  GetAllPivotTables(): ApiPivotTable[];
  GetCommentById(sId: string): ApiComment;
  GetComments(): ApiComment[];
  GetDefName(defName: string): ApiName;
  GetDocumentInfo(): object;
  GetFreezePanesType(): FreezePaneType;
  GetFullName(): string;
  GetLocale(): number;
  GetMailMergeData(nSheet: number, bWithFormat?: boolean): Array.<string[]>;
  GetPivotByName(name: string): ApiPivotTable | null;
  GetRange(sRange: string): ApiRange;
  GetReferenceStyle(): ReferenceStyle;
  GetSelection(): ApiRange;
  GetSheet(nameOrIndex: string | number): ApiWorksheet | null;
  GetSheets(): ApiWorksheet[];
  GetThemesColors(): string[];
  GetWorksheetFunction(): ApiWorksheetFunction;
  InsertPivotExistingWorksheet(dataRef: ApiRange, pivotRef: ApiRange, confirmation: bool): ApiPivotTable;
  InsertPivotNewWorksheet(dataRef: ApiRange, newSheetName?: ApiRange): ApiPivotTable;
  Intersect(Range1: ApiRange, Range2: ApiRange): ApiRange | null;
  RecalculateAllFormulas(fLogger: function): boolean;
  RefreshAllPivots(): void;
  RemoveCustomFunction(sName: string): boolean;
  ReplaceTextSmart(textStrings: any[], tab?: string, newLine?: string): void;
  Save(): void;
  SetFreezePanesType(FreezePaneType: FreezePaneType): void;
  SetLocale(LCID: number): void;
  SetReferenceStyle(sReferenceStyle: ReferenceStyle): void;
  SetThemeColors(sTheme: string): boolean;
  attachEvent(eventName: string, callback: function): void;
  detachEvent(eventName: string): void;
}

/** Class representing the areas. */
interface ApiAreas {
  GetCount(): number;
  GetItem(ind: number): ApiRange;
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
  Insert(String: string): void;
  SetCaption(Caption: string): void;
  SetText(Text: string): void;
}

/** Class representing a chart. */
interface ApiChart {
  AddSeria(sNameRange: string, sValuesRange: string, sXValuesRange?: string): void;
  ApplyChartStyle(nStyleId: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetSeries(nIdx: number): ApiChartSeries;
  RemoveSeria(nSeria: number): boolean;
  SetAxieNumFormat(sFormat: NumFormat | string, sAxiePos: AxisPos): boolean;
  SetCatFormula(sRange: string): void;
  SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
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
  SetSeriaName(sNameRange: string, nSeria: number): boolean;
  SetSeriaValues(sRange: string, nSeria: number): boolean;
  SetSeriaXValues(sRange: string, nSeria: number): boolean;
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
}

/** Class representing a chart series. */
interface ApiChartSeries {
  ChangeChartType(sType: ChartType): boolean;
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
  AddReply(sText: string, sAuthorName: string, sUserId: string, nPos?: number): void;
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
  SetAuthorName(sAuthorName: string): void;
  SetSolved(bSolved: boolean): void;
  SetText(text: string): void;
  SetTime(nTimeStamp: number | string): void;
  SetTimeUTC(nTimeStamp: number | string): void;
  SetUserId(sUserId: string): void;
}

/** Class representing a comment reply. */
interface ApiCommentReply {
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
  GetClassType(): "drawing";
  GetContent(): ApiDocumentContent;
  GetHeight(): number;
  GetLockValue(sType: DrawingLockType): bool;
  GetParentSheet(): ApiWorksheet;
  GetWidth(): number;
  SetLockValue(sType: DrawingLockType, bValue: bool): bool;
  SetPosition(nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): void;
  SetSize(nWidth: number, nHeight: number): void;
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

/** Class representing freeze panes. */
interface ApiFreezePanes {
  FreezeAt(frozenRange: ApiRange | string): void;
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

/** Class representing a name. */
interface ApiName {
  Delete(): void;
  GetName(): string;
  GetRefersTo(): string;
  GetRefersToRange(): ApiRange;
  SetName(sName: string): boolean;
  SetRefersTo(sRef: string): void;
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
  Move(type: PivotMoveFieldType | PivotFieldOrientationType, index: number | undefined): void;
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
  Move(type: PivotMoveFieldType | PivotFieldOrientationType, index: number | undefined): void;
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

/** Class representing a pivot table field item. */
interface ApiPivotItem {
  GetCaption(): string;
  GetName(): string;
  GetParent(): ApiPivotField;
  GetValue(): string;
}

/** Class representing a pivot table. */
interface ApiPivotTable {
  AddDataField(field: number | string): ApiPivotDataField;
  AddFields(options: PivotTableFieldOptions): void;
  ClearAllFilters(): void;
  ClearTable(): void;
  GetColumnFields(field: number | string | undefined): ApiPivotField[];
  GetColumnGrand(): boolean;
  GetColumnRange(): ApiRange | null;
  GetData(items: string[]): number | null;
  GetDataBodyRange(): ApiRange;
  GetDataFields(field: number | string | undefined): ApiPivotDataField[] | ApiPivotDataField | null;
  GetDescription(): string;
  GetDisplayFieldCaptions(): boolean;
  GetDisplayFieldsInReportFilterArea(): PivotTableFilterAreaInfo;
  GetGrandTotalName(): string;
  GetHiddenFields(): ApiPivotField[];
  GetName(): string;
  GetPageFields(field: number | string | undefined): ApiPivotField[];
  GetParent(): ApiWorksheet;
  GetPivotData(dataField?: string, fieldItemsArray?: string[]): ApiRange;
  GetPivotFields(field?: string | number): ApiPivotField[] | ApiPivotField | ApiPivotDataField | null;
  GetRowFields(field: number | string | undefined): ApiPivotField[];
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

/** Class representing a Preset Color. */
interface ApiPresetColor {
  GetClassType(): "presetColor";
}

/** Class representing a user-protected range. */
interface ApiProtectedRange {
  AddUser(sId: string, sName: string, protectedRangeUserType: ProtectedRangeUserType): ApiProtectedRangeUserInfo | null;
  DeleteUser(sId: string): bool;
  GetAllUsers(): ApiProtectedRangeUserInfo[] | null;
  GetUser(sId: string): ApiProtectedRangeUserInfo | null;
  SetAnyoneType(protectedRangeUserType: ProtectedRangeUserType): bool;
  SetRange(sRange: string): boolean;
  SetTitle(sTitle: string): boolean;
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
  AddComment(sText: string, sAuthor: string): ApiComment | null;
  AutoFit(bRows: bool, bCols: bool): void;
  Clear(): void;
  Copy(destination?: ApiRange): void;
  Cut(destination?: ApiRange): void;
  Delete(shift: DeleteShiftDirection): void;
  End(direction: Direction): ApiRange;
  Find(What: string | undefined, After: ApiRange, LookIn: XlFindLookIn, LookAt: XlLookAt, SearchOrder: XlSearchOrder, SearchDirection: XlSearchDirection, MatchCase: boolean): ApiRange | null;
  FindNext(After: ApiRange): ApiRange | null;
  FindPrevious(Before: ApiRange): ApiRange | null;
  ForEach(fCallback: function): void;
  GetAddress(RowAbs: boolean, ColAbs: boolean, RefStyle: string, External: boolean, RelativeTo: range): string | null;
  GetAreas(): ApiAreas;
  GetCells(row: number, col: number): ApiRange;
  GetCharacters(Start: number, Length: number): ApiCharacters;
  GetClassType(): "range";
  GetCol(): number;
  GetCols(nCol: number): ApiRange | null;
  GetColumnWidth(): number;
  GetComment(): ApiComment | null;
  GetCount(): number;
  GetDefName(): ApiName;
  GetFillColor(): ApiColor | 'No Fill';
  GetFormula(): string | Array.<string[]>;
  GetHidden(): boolean;
  GetNumberFormat(): string | null;
  GetOrientation(): Angle;
  GetPivotTable(): ApiPivotTable | null;
  GetRow(): number;
  GetRowHeight(): number;
  GetRows(nRow: number): ApiRange | null;
  GetText(): string | Array.<string[]>;
  GetValue(): string | Array.<string[]>;
  GetValue2(): string | Array.<string[]>;
  GetWorksheet(): ApiWorksheet;
  GetWrapText(): boolean;
  Insert(shift: string): void;
  Merge(isAcross: boolean): void;
  Paste(rangeFrom: ApiRange): void;
  PasteSpecial(sPasteType?: PasteType, sPasteSpecialOperation?: PasteSpecialOperation, bSkipBlanks: boolean, bTranspose: boolean): void;
  Replace(What: string | undefined, Replacement: string, LookAt: XlLookAt, SearchOrder: XlSearchOrder, SearchDirection: XlSearchDirection, MatchCase: boolean, ReplaceAll: boolean): void;
  Select(): void;
  SetAlignHorizontal(sAlignment: 'left' | 'right' | 'center' | 'justify'): boolean;
  SetAlignVertical(sAligment: 'center' | 'bottom' | 'top' | 'distributed' | 'justify'): boolean;
  SetAutoFilter(Field: number, Criteria1: string | string[] | ApiColor | XlDynamicFilterCriteria, Operator: XlAutoFilterOperator, Criteria2: string, VisibleDropDown: boolean): void;
  SetBold(isBold: boolean): void;
  SetBorders(bordersIndex: BordersIndex, lineStyle: LineStyle, oColor: ApiColor): void;
  SetColumnWidth(nWidth: number): void;
  SetFillColor(oColor: ApiColor): void;
  SetFontColor(oColor: ApiColor): void;
  SetFontName(sName: string): void;
  SetFontSize(nSize: number): void;
  SetHidden(isHidden: boolean): void;
  SetItalic(isItalic: boolean): void;
  SetNumberFormat(sFormat: string): void;
  SetOffset(nRow: number, nCol: number): void;
  SetOrientation(angle: Angle): void;
  SetRowHeight(nHeight: number): void;
  SetSort(key1: ApiRange | string, sSortOrder1: SortOrder, key2: ApiRange | string, sSortOrder2: SortOrder, key3: ApiRange | string, sSortOrder3: SortOrder, sHeader: SortHeader, sOrientation: SortOrientation): void;
  SetStrikeout(isStrikeout: boolean): void;
  SetUnderline(undelineType: 'none' | 'single' | 'singleAccounting' | 'double' | 'doubleAccounting'): void;
  SetValue(data: string | bool | number | Array[] | Array.<Array[]>): boolean;
  SetWrap(isWrap: boolean): void;
  UnMerge(): void;
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

/** Class representing a shape. */
interface ApiShape {
  GetClassType(): "shape";
  GetContent(): ApiDocumentContent;
  GetDocContent(): ApiDocumentContent;
  SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): void;
  SetVerticalTextAlign(sVerticalAlign: "top" | "center" | "bottom"): boolean;
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
  AddChart(sDataRange: string, bInRows: boolean, sType: ChartType, nStyleIndex: number, nExtX: number, nExtY: number, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiChart;
  AddDefName(sName: string, sRef: string, isHidden: boolean): boolean;
  AddImage(sImageSrc: string, nWidth: number, nHeight: number, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiImage;
  AddOleObject(sImageSrc: string, nWidth: number, nHeight: number, sData: string, sAppId: string, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiOleObject;
  AddProtectedRange(sTitle: string, sDataRange: string): ApiProtectedRange | null;
  AddShape(sType?: ShapeType, nWidth: number, nHeight: number, oFill: ApiFill, oStroke: ApiStroke, nFromCol: number, nColOffset: number, nFromRow: number, nRowOffset: number): ApiShape;
  AddWordArt(oTextPr?: ApiTextPr, sText?: string, sTransform?: TextTransform, oFill?: ApiFill, oStroke?: ApiStroke, nRotAngle?: number, nWidth?: number, nHeight?: number, nFromCol?: number, nFromRow?: number, nColOffset?: number, nRowOffset?: number): ApiDrawing;
  Delete(): void;
  FormatAsTable(sRange: string): void;
  GetActiveCell(): ApiRange;
  GetAllCharts(): ApiChart[];
  GetAllDrawings(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllPivotTables(): ApiPivotTable[];
  GetAllProtectedRanges(): ApiProtectedRange[] | null;
  GetAllShapes(): ApiShape[];
  GetBottomMargin(): number;
  GetCells(row: number, col: number): ApiRange | null;
  GetCols(sRange: string): ApiRange;
  GetComments(): ApiComment[];
  GetDefName(defName: string): ApiName | null;
  GetDefNames(): ApiName[];
  GetFreezePanes(): ApiFreezePanes;
  GetIndex(): number;
  GetLeftMargin(): number;
  GetName(): string;
  GetPageOrientation(): PageOrientation;
  GetPivotByName(name: string): ApiPivotTable | null;
  GetPrintGridlines(): boolean;
  GetPrintHeadings(): boolean;
  GetProtectedRange(sTitle: string): ApiProtectedRange | null;
  GetRange(Range1: string | ApiRange, Range2: string | ApiRange): ApiRange | null;
  GetRangeByNumber(nRow: number, nCol: number): ApiRange;
  GetRightMargin(): number;
  GetRows(value: string | number): ApiRange | null;
  GetSelection(): ApiRange;
  GetTopMargin(): number;
  GetUsedRange(): ApiRange;
  GetVisible(): boolean;
  GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
  Move(before: ApiWorksheet, after: ApiWorksheet): void;
  Paste(destination?: ApiRange): void;
  RefreshAllPivots(): void;
  ReplaceCurrentImage(sImageUrl: string, nWidth: number, nHeight: number): void;
  SetActive(): void;
  SetBottomMargin(nPoints: number): void;
  SetColumnWidth(nColumn: number, nWidth: number, bWithotPaddings?: boolean): void;
  SetDisplayGridlines(isDisplayed: boolean): void;
  SetDisplayHeadings(isDisplayed: boolean): void;
  SetHyperlink(sRange: string, sAddress: string, subAddress: string, sScreenTip: string, sTextToDisplay: string): void;
  SetLeftMargin(nPoints: number): void;
  SetName(sName: string): void;
  SetPageOrientation(sPageOrientation: PageOrientation): void;
  SetPrintGridlines(bPrint: boolean): void;
  SetPrintHeadings(bPrint: boolean): void;
  SetRightMargin(nPoints: number): void;
  SetRowHeight(nRow: number, nHeight: number): void;
  SetTopMargin(nPoints: number): void;
  SetVisible(isVisible: boolean): void;
}

/** Class representing a worksheet function. */
interface ApiWorksheetFunction {
  ABS(arg1: ApiRange | ApiName | number): number;
  ACCRINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number): number;
  ACCRINTM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  ACOS(arg1: ApiRange | ApiName | number): number;
  ACOSH(arg1: ApiRange | ApiName | number): number;
  ACOT(arg1: ApiRange | ApiName | number): number;
  ACOTH(arg1: ApiRange | ApiName | number): number;
  AGGREGATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: number | ApiRange | number[], args: number | ApiRange | number[]): number;
  AMORDEGRC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number): number;
  AMORLINC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number): number;
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
  AVERAGEIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  AVERAGEIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string, arg5: ApiRange | ApiName): number;
  BASE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  BESSELI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BESSELJ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BESSELK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BESSELY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BETADIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  BETAINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  BETA_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  BETA_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  BIN2DEC(arg1: ApiRange | ApiName | number): number;
  BIN2HEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BIN2OCT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BINOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
  BINOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
  BINOM_DIST_RANGE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  BINOM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  BITAND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BITLSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BITOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BITRSHIFT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  BITXOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  CEILING_MATH(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  CEILING_PRECISE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
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
  COMPLEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | string): number;
  CONCATENATE(arg_n: ApiRange | ApiName | string): string;
  CONFIDENCE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  CONFIDENCE_NORM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  CONFIDENCE_T(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  CONVERT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string): number;
  COS(arg1: ApiRange | ApiName | number): number;
  COSH(arg1: ApiRange | ApiName | number): number;
  COT(arg1: ApiRange | ApiName | number): number;
  COTH(arg1: ApiRange | ApiName | number): number;
  COUNT(args: string | number | boolean | ApiRange | array | ApiName): number;
  COUNTA(args: string | number | boolean | ApiRange | array | ApiName): number;
  COUNTBLANK(arg1: ApiRange | ApiName): number;
  COUNTIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string): number;
  COUNTIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string): number;
  COUPDAYBS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  COUPDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  COUPDAYSNC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  COUPNCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  COUPNUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  COUPPCD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
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
  DAYS360(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
  DB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  DCOUNT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DCOUNTA(arg1_: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  DEC2BIN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DEC2HEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DEC2OCT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DECIMAL(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): number;
  DEGREES(arg1: ApiRange | ApiName | number): number;
  DELTA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DEVSQ(args: ApiRange | ApiName | number | number[]): number;
  DGET(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  DMAX(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DMIN(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DOLLAR(arg1: ApiRange | ApiName | number | string, arg2: ApiRange | ApiName | number): string;
  DOLLARDE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DOLLARFR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  DPRODUCT(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DSTDEV(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DSTDEVP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DSUM(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  DVAR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  DVARP(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  ECMA_CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  EDATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  EFFECT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  EOMONTH(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ERF(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
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
  FIND(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | number): number;
  FINDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | number): number;
  FINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  FISHER(arg1: ApiRange | ApiName | number): number;
  FISHERINV(arg1: ApiRange | ApiName | number): number;
  FIXED(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): string;
  FLOOR(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  FLOOR_MATH(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  FLOOR_PRECISE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  FORECAST_ETS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  FORECAST_ETS_CONFINT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number): number;
  FORECAST_ETS_SEASONALITY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  FORECAST_ETS_STAT(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  FREQUENCY(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number[]): number;
  FV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
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
  GESTEP(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  GROWTH(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | ?Array.<number>, arg3: ApiRange | ApiName | ?Array.<number>, arg4: ApiRange | ApiName | boolean): number;
  HARMEAN(args: ApiRange | number[] | ApiName): number;
  HEX2BIN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  HEX2DEC(arg1: ApiRange | ApiName | number): number;
  HEX2OCT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  HLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number | string;
  HOUR(arg1: ApiRange | ApiName | number | string): number;
  HYPERLINK(arg1: string | ApiRange | ApiName, arg2: string | ApiRange | number | ApiName): string;
  HYPGEOMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  HYPGEOM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | boolean): number;
  IF(arg1: number | string | ApiRange | ApiName | boolean, arg2: number | string | ApiRange | ApiName | boolean, arg3: ApiRange | ApiName | number | string | boolean): number | string | boolean;
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
  INDEX(arg1: ApiRange | ApiName | array, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number | string;
  INT(arg1: ApiRange | ApiName | number): number;
  INTRATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  IPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  IRR(arg1: number[] | ApiRange, arg2: ApiRange | ApiName | number): number;
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
  ISO_CEILING(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ISPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  ISREF(arg1: ApiRange | string | number | boolean | ApiName): boolean;
  ISTEXT(arg1: ApiRange | string | number | boolean | ApiName): boolean;
  KURT(args: ApiRange | number[] | ApiName): number;
  LARGE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  LCM(args: ApiRange | ApiName | number): number;
  LEFT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
  LEFTB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
  LEN(arg1: ApiRange | ApiName | string): number;
  LENB(arg1: ApiRange | ApiName | string): number;
  LINEST(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | boolean, arg4: ApiRange | ApiName | boolean): number;
  LN(arg1: ApiRange | ApiName | number): number;
  LOG(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  LOG10(arg1: ApiRange | ApiName | number): number;
  LOGEST(arg1: ApiRange | ApiName | ApiRange, arg2: ApiRange | ApiName | ApiRange, arg3: ApiRange | ApiName | boolean, arg4: ApiRange | ApiName | boolean): number;
  LOGINV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  LOGNORMDIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  LOGNORM_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
  LOGNORM_INV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  LOOKUP(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName): number | string | boolean;
  LOWER(arg1: ApiRange | ApiName | string): string;
  MATCH(arg1: number | string | boolean | ApiRange | ApiName, arg2: ApiRange | ApiName | array, arg3: ApiRange | ApiName | number): number;
  MAX(args: number | array | ApiRange | ApiName): number;
  MAXA(args: number | string | boolean | ApiRange | array | ApiName): number;
  MDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  MEDIAN(args: number | ApiRange | array | ApiName): number;
  MID(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;
  MIDB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): string;
  MIN(args: number | ApiRange | array | ApiName): number;
  MINA(args: number | string | boolean | ApiRange | array | ApiName): number;
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
  NETWORKDAYS(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | number[]): number;
  NETWORKDAYS_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number | string, arg4: ApiRange | number[]): number;
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
  NPER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  NPV(arg1: ApiRange | ApiName | number, args: number | ApiRange | number[]): number;
  NUMBERVALUE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string): number;
  OCT2BIN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  OCT2DEC(arg1: ApiRange | ApiName | number): number;
  OCT2HEX(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ODD(arg1: ApiRange | ApiName | number): number;
  ODDFPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9: ApiRange | ApiName | number): number;
  ODDFYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9: ApiRange | ApiName | number): number;
  ODDLPRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9: ApiRange | ApiName | number): number;
  ODDLYIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg8: ApiRange | ApiName | number, arg9: ApiRange | ApiName | number): number;
  OR(args: number | string | ApiRange | ApiName | boolean): boolean;
  PDURATION(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  PERCENTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  PERCENTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  PERCENTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  PERCENTRANK(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  PERCENTRANK_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  PERCENTRANK_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  PERMUT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  PERMUTATIONA(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  PHI(arg1: ApiRange | ApiName | number): number;
  PI(): number;
  PMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  POISSON(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
  POISSON_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | boolean): number;
  POWER(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  PPMT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  PRICE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number): number;
  PRICEDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  PRICEMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  PRODUCT(args: number | ApiRange | number[]): number;
  PROPER(arg1: ApiRange | ApiName | string): string;
  PV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  QUARTILE(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  QUARTILE_EXC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  QUARTILE_INC(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  QUOTIENT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  RADIANS(arg1: ApiRange | ApiName | number): number;
  RAND(): number;
  RANDBETWEEN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  RANK(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName | boolean): number;
  RANK_AVG(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName | boolean): number;
  RANK_EQ(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName | boolean): number;
  RATE(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  RECEIVED(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  REPLACE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;
  REPLACEB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | string): string;
  REPT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
  RIGHT(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
  RIGHTB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | number): string;
  ROMAN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): string;
  ROUND(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ROUNDDOWN(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ROUNDUP(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  ROWS(arg1: ApiRange | ApiName | array): number;
  RRI(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  SEARCH(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | number): number;
  SEARCHB(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | number): number;
  SEC(arg1: ApiRange | ApiName | number): number;
  SECH(arg1: ApiRange | ApiName | number): number;
  SECOND(arg1: ApiRange | ApiName | number | string): number;
  SERIESSUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number): number;
  SHEET(arg1: string | ApiRange | ApiName): number;
  SHEETS(arg1: ApiRange | ApiName): number;
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
  SUBSTITUTE(arg1: ApiRange | ApiName | string, arg2: ApiRange | ApiName | string, arg3: ApiRange | ApiName | string, arg4: ApiRange | ApiName | string): string;
  SUBTOTAL(arg1: ApiRange | ApiName | number, args: ApiRange | ApiName): number;
  SUM(args: ApiRange | ApiName | string | number | boolean | array): number;
  SUMIF(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName): number;
  SUMIFS(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName | number | string, arg3: ApiRange | ApiName, arg4: ApiRange | ApiName | number | string, arg5: ApiRange | ApiName): number;
  SUMSQ(args: ApiRange | number | string | boolean | ApiName | array): number;
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
  TRANSPOSE(arg1: ApiRange | ApiName | array): ApiRange;
  TREND(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number[], arg3: ApiRange | ApiName | number[], arg4: ApiRange | ApiName | boolean): number;
  TRIM(arg1: ApiRange | ApiName | string): string;
  TRIMMEAN(arg1: ApiRange | ApiName | number[], arg2: ApiRange | ApiName | number): number;
  TRUE(): boolean;
  TRUNC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  TYPE(arg1: number | string | boolean | array | ApiRange | ApiName): number;
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
  VARA(args: number | string | boolean | ApiRange | array | ApiName): number;
  VARP(args: number | ApiName | ApiRange | number[]): number;
  VARPA(args: number | string | boolean | ApiRange | array | ApiName): number;
  VAR_P(args: number | ApiName | ApiRange | number[]): number;
  VAR_S(args: number | ApiName | ApiRange | number[]): number;
  VDB(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | boolean): number;
  VLOOKUP(arg1: number | string | ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number | string;
  WEEKDAY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  WEEKNUM(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number): number;
  WEIBULL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
  WEIBULL_DIST(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | boolean): number;
  WORKDAY(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number[]): number;
  WORKDAY_INTL(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number | string, arg4: ApiRange | ApiName | ?Array.<number>): number;
  XIRR(arg1: ApiRange | ApiName, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName | number): number;
  XNPV(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName, arg3: ApiRange | ApiName): number;
  XOR(args: ApiRange | ApiName | boolean | array): boolean;
  YEAR(arg1: ApiRange | ApiName | number): number;
  YEARFRAC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  YIELD(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number, arg7: ApiRange | ApiName | number): number;
  YIELDDISC(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number): number;
  YIELDMAT(arg1: ApiRange | ApiName | number, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number, arg4: ApiRange | ApiName | number, arg5: ApiRange | ApiName | number, arg6: ApiRange | ApiName | number): number;
  ZTEST(arg1: number[] | ApiRange | ApiName, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
  Z_TEST(arg1: number[] | ApiRange, arg2: ApiRange | ApiName | number, arg3: ApiRange | ApiName | number): number;
}

