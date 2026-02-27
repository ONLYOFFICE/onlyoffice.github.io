export {};

// Auto-generated from ONLYOFFICE/office-js-api-declarations
// Editor type: word

/** Base class */
export interface ApiWord {
  AddComment(element: ApiRun[] | DocumentElement, text: string, author: string, userId: string): ApiComment;
  ConvertDocument(convertType?: "markdown" | "html", htmlHeadings?: boolean, base64img?: boolean, demoteHeadings?: boolean, renderHTMLTags?: boolean): string;
  CreateBlipFill(imageUrl: string, blipFillType: BlipFillType): ApiFill;
  CreateBlockLvlSdt(): ApiBlockLvlSdt;
  CreateChart(chartType?: ChartType, series: any[], seriesNames: any[], catNames: any[], width: number, height: number, styleIndex: number, numFormats: NumFormat[] | String[]): ApiChart;
  CreateGradientStop(uniColor: ApiUniColor, pos: PositivePercentage): ApiGradientStop;
  CreateGroup(drawings: DrawingForGroup[]): ApiGroup;
  CreateHyperlink(link: string, display: string, screenTipText: string): ApiHyperlink;
  CreateImage(imageSrc: string, width: number, height: number): ApiImage;
  CreateInlineLvlSdt(): ApiInlineLvlSdt;
  CreateLinearGradientFill(gradientStops: any[], angle: PositiveFixedAngle): ApiFill;
  CreateNoFill(): ApiFill;
  CreateNumbering(numType: BulletType, startAt: number): ApiBullet;
  CreateOleObject(imageSrc: string, width: number, height: number, data: string, appId: string): ApiOleObject;
  CreateParagraph(): ApiParagraph;
  CreatePatternFill(patternType: PatternType, bgColor: ApiUniColor, fgColor: ApiUniColor): ApiFill;
  CreatePresetColor(presetColor: PresetColor): ApiPresetColor;
  CreateRGBColor(r: number, g: number, b: number): ApiRGBColor;
  CreateRadialGradientFill(gradientStops: any[]): ApiFill;
  CreateRange(element: any, start: any, end: any): ApiRange | null;
  CreateRun(): ApiRun;
  CreateSchemeColor(schemeColorId: SchemeColorId): ApiSchemeColor;
  CreateShape(shapeType?: ShapeType, width?: number, height?: number, fill?: ApiFill, stroke?: ApiStroke): ApiShape;
  CreateSolidFill(uniColor: ApiUniColor): ApiFill;
  CreateStroke(width: number, fill: ApiFill): ApiStroke;
  CreateTable(cols: number, rows: number): ApiTable;
  CreateTextPr(): ApiTextPr;
  CreateWordArt(textPr?: ApiTextPr, text?: string, transform?: TextTransform, fill?: ApiFill, stroke?: ApiStroke, rotAngle?: number, width?: number, height?: number): ApiDrawing;
  FromJSON(message: JSON): void;
  GetDocument(): ApiDocument;
  GetFullName(): string;
  GetMailMergeReceptionsCount(): number;
  GetMailMergeTemplateDocContent(): ApiDocumentContent;
  LoadMailMergeData(data: Array.<String[]>): boolean;
  MailMerge(startIndex?: number, endIndex?: number): boolean;
  ReplaceDocumentContent(documentContent: ApiDocumentContent): void;
  ReplaceTextSmart(textStrings: any[], tab?: string, newLine?: string): void;
  Save(): void;
  attachEvent(eventName: string, callback: function): void;
  detachEvent(eventName: string): void;
}

/** Class representing a container for the document content. */
interface ApiBlockLvlSdt {
  AddCaption(additionalText: string, label?: CaptionLabel | string, excludeLabel?: boolean, numFormat?: CaptionNumberingFormat, isBefore?: boolean, headingLvl?: number, captionSep?: CaptionSep): boolean;
  AddComment(text: string, author: string, userId: string): ApiComment;
  AddElement(element: DocumentElement, pos: number): boolean;
  AddText(text: string): boolean;
  Copy(): ApiBlockLvlSdt;
  Delete(keepContent: boolean): boolean;
  GetAlias(): string;
  GetAllContentControls(): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetAllDrawingObjects(): Drawing[];
  GetAllParagraphs(): ApiParagraph[];
  GetAllTablesOnPage(page: any): ApiTable[];
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
  GetRange(start: number, end: number): ApiRange;
  GetTag(): string;
  MoveCursorOutside(isAfter?: boolean): void;
  Push(element: DocumentElement): boolean;
  RemoveAllElements(): boolean;
  ReplaceByElement(oElement: DocumentElement): boolean;
  Search(text: string, isMatchCase: boolean): ApiRange[];
  Select(): void;
  SetAlias(alias: string): void;
  SetLabel(sLabel: string): void;
  SetLock(lockType: "contentLocked" | "sdtContentLocked" | "sdtLocked"): void;
  SetPlaceholderText(text: string): boolean;
  SetTag(tag: string): void;
  SetTextPr(textPr: ApiTextPr): void;
  ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): JSON;
}

/** Class representing a bookmark in the document. */
interface ApiBookmark {
  Delete(): boolean;
  GetName(): string;
  GetRange(): ApiRange;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TableCellSeparator?: string, oPr_TableRowSeparator?: string, oPr_ParaSeparator?: string, oPr_TabSymbol?: string): string;
  GoTo(): boolean;
  Select(): boolean;
  SetName(sNewName: string): boolean;
  SetText(sText: string): boolean;
}

/** Class representing a chart. */
interface ApiChart {
  ApplyChartStyle(nStyleId: any): boolean;
  GetAllSeries(): ApiChartSeries[];
  GetChartType(): ChartType;
  GetClassType(): "chart";
  GetNextChart(): ApiChart | null;
  GetPrevChart(): ApiChart | null;
  GetSeries(nIdx: number): ApiChartSeries;
  RemoveSeria(nSeria: number): boolean;
  SetAxieNumFormat(sFormat: NumFormat | string, sAxiePos: AxisPos): boolean;
  SetCategoryName(sName: string, nCategory: number): boolean;
  SetDataPointFill(oFill: ApiFill, nSeries: number, nDataPoint: number, bAllSeries?: boolean): boolean;
  SetDataPointNumFormat(sFormat: NumFormat | string, nSeria: number, nDataPoint: number, bAllSeries: boolean): boolean;
  SetDataPointOutLine(oStroke: ApiStroke, nSeries: number, nDataPoint: number, bAllSeries: boolean): boolean;
  SetHorAxisLablesFontSize(nFontSize: number): void;
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
  SetVertAxisLablesFontSize(nFontSize: number): void;
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
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetChecked(isChecked: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRadioGroup(sKey: string): void;
  SetRequired(bRequired: boolean): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
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
  SelectListValue(sValue: string): boolean;
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetListValues(aListString: string[]): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetText(sText: string): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a comment. */
interface ApiComment {
  AddReply(sText: string, sAuthorName: string, sUserId: string, nPos?: number): ApiComment;
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
  GetUserId(): string;
  SetAuthorName(sAuthorName: string): ApiCommentReply;
  SetText(sText: string): ApiCommentReply;
  SetUserId(sUserId: string): ApiCommentReply;
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
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a list of values of the combo box / dropdown list content control. */
interface ApiContentControlList {
  Add(sText: string, sValue?: string, nIndex?: number): boolean;
  Clear(): void;
  GetAllItems(): ApiContentControlListEntry[];
  GetClassType(): "contentControlList";
  GetElementsCount(): number;
  GetItem(nIndex: number): ApiContentControlListEntry;
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
  SetIndex(nIndex: number): boolean;
  SetText(sText: string): boolean;
  SetValue(sValue: string): boolean;
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
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetFormat(sFormat: string): boolean;
  SetLanguage(sLangId: string): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTime(nTimeStamp: number): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a document. */
interface ApiDocument {
  AcceptAllRevisionChanges(): void;
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddDrawingToPage(oDrawing: ApiDrawing, nPage: number, x: number, y: number): boolean;
  AddElement(nPos: number, oElement: DocumentElement): void;
  AddEndnote(): ApiDocumentContent;
  AddFootnote(): ApiDocumentContent;
  AddMathEquation(sText: string, sFormat?: "unicode" | "latex"): void;
  AddTableOfContents(oTocPr?: TocPr): void;
  AddTableOfFigures(oTofPr?: TofPr, bReplace?: boolean): boolean;
  ClearAllFields(): void;
  CreateNewHistoryPoint(): void;
  CreateNumbering(sType?: "bullet" | "numbered"): ApiNumbering;
  CreateSection(oParagraph: ApiParagraph): ApiSection | null;
  CreateStyle(sStyleName: string, sType?: StyleType): ApiStyle;
  DeleteBookmark(sName: string): boolean;
  GetAllBookmarksNames(): string[];
  GetAllCaptionParagraphs(sCaption: CaptionLabel | string): ApiParagraph[];
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
  GetAllTablesOnPage(nPage: number): ApiTable[];
  GetBookmark(sBookmarkName: string): ApiBookmark;
  GetBookmarkRange(sName: string): ApiRange | null;
  GetClassType(): "documentContent";
  GetCommentById(sId: string): ApiComment;
  GetCommentsReport(): CommentReport;
  GetContent(bGetCopies: boolean): any[];
  GetContentControlsByTag(sTag: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetCurrentFootEndnote(): ApiDocumentContent | null;
  GetCurrentPage(): number;
  GetCurrentParagraph(): ApiParagraph;
  GetCurrentRun(): ApiRun;
  GetCurrentSentence(sPart?: undefined | "before" | "after"): string;
  GetCurrentVisiblePages(): number[];
  GetCurrentWord(sWordPart?: undefined | "before" | "after"): string;
  GetDefaultParaPr(): ApiParaPr;
  GetDefaultStyle(sStyleType: StyleType): ApiStyle;
  GetDefaultTextPr(): ApiTextPr;
  GetDocumentInfo(): object;
  GetElement(nPos: number): DocumentElement;
  GetElementsCount(): number;
  GetEndNotesFirstParagraphs(): ApiParagraph[];
  GetFinalSection(): ApiSection;
  GetFootnotesFirstParagraphs(): ApiParagraph[];
  GetFormsByTag(sTag: string): ApiBlockLvlSdt[] | ApiInlineLvlSdt[];
  GetFormsData(): FormData[];
  GetPageCount(): number;
  GetRange(Start: number, End: number): ApiRange;
  GetRangeBySelect(): ApiRange | null;
  GetReviewReport(): ReviewReport;
  GetSections(): ApiSection[];
  GetSelectedDrawings(): ApiShape[] | ApiImage[] | ApiChart[] | ApiDrawing[];
  GetStatistics(): object;
  GetStyle(sStyleName: string): ApiStyle;
  GetTagsOfAllContentControls(): String[];
  GetTagsOfAllForms(): String[];
  GetText(oProps: object, oProps_Numbering: boolean, oProps_Math: boolean, oProps_TableCellSeparator?: string, oProps_TableRowSeparator?: string, oProps_ParaSeparator?: string, oProps_TabSymbol?: string, oProps_NewLineSeparator?: string): string;
  GetWatermarkSettings(): ApiWatermarkSettings;
  GroupDrawings(aDrawings: DrawingForGroup[]): ApiGroup;
  InsertContent(arrContent: DocumentElement[], isInline?: boolean, oPr?: object): boolean;
  InsertWatermark(sText?: string, bIsDiagonal?: boolean): ApiDrawing;
  IsTrackRevisions(): boolean;
  Last(): DocumentElement;
  MoveCursorToPos(nPos: number): void;
  Push(oElement: DocumentElement): boolean;
  RejectAllRevisionChanges(): void;
  RemoveAllElements(): void;
  RemoveElement(nPos: number): void;
  RemoveSelection(): void;
  RemoveWatermark(): void;
  ReplaceCurrentImage(sImageUrl: string, Width: number, Height: number): void;
  ReplaceCurrentSentence(sReplace: string, sPart: undefined | "before" | "after"): boolean;
  ReplaceCurrentWord(sReplace: string, sPart: undefined | "before" | "after"): boolean;
  ReplaceDrawing(oOldDrawing: ApiDrawing, oNewDrawing: ApiDrawing, bSaveOldDrawingPr?: boolean): boolean;
  Search(sText: string, isMatchCase: boolean): ApiRange[];
  SearchAndReplace(oProperties: object, oProperties_searchString: string, oProperties_replaceString: string, oProperties_matchCase?: string): void;
  SelectCurrentWord(): object;
  SetControlsHighlight(r: number, g: number, b: number, bNone?: boolean): void;
  SetEvenAndOddHdrFtr(isEvenAndOdd: boolean): void;
  SetFormsData(arrData: FormData[]): void;
  SetFormsHighlight(r: number, g: number, b: number, bNone?: boolean): void;
  SetTrackRevisions(isTrack: boolean): void;
  SetWatermarkSettings(Settings: ApiWatermarkSettings): ApiDrawing;
  ToHtml(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
  ToJSON(isWriteNumberings: boolean, isWriteStyles: boolean): JSON;
  ToMarkdown(bHtmlHeadings?: boolean, bBase64img?: boolean, bDemoteHeadings?: boolean, bRenderHTMLTags?: boolean): string;
  UpdateAllFields(bBySelection?: boolean): void;
  UpdateAllTOC(bOnlyPageNumbers?: boolean): void;
  UpdateAllTOF(bOnlyPageNumbers?: boolean): void;
}

/** Class representing a container for paragraphs and tables. */
interface ApiDocumentContent {
  AddElement(nPos: number, oElement: DocumentElement): void;
  GetAllCharts(): ApiChart[];
  GetAllDrawingObjects(): Drawing[];
  GetAllImages(): ApiImage[];
  GetAllOleObjects(): ApiOleObject[];
  GetAllParagraphs(): ApiParagraph[];
  GetAllShapes(): ApiShape[];
  GetAllTables(): ApiParagraph[];
  GetClassType(): "documentContent";
  GetContent(bGetCopies: boolean): any[];
  GetElement(nPos: number): DocumentElement;
  GetElementsCount(): number;
  GetRange(Start: number, End: number): ApiRange;
  GetText(oProps: object, oProps_Numbering: boolean, oProps_Math: boolean, oProps_TableCellSeparator?: string, oProps_TableRowSeparator?: string, oProps_ParaSeparator?: string, oProps_TabSymbol?: string, oProps_NewLineSeparator?: string): string;
  Push(oElement: DocumentElement): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos: number): void;
  ToJSON(isWriteNumberings: boolean, isWriteStyles: boolean): JSON;
  IsFootnote(): boolean;
  IsEndnote(): boolean;
  SelectNoteReference(): boolean;
}

/** Class representing a graphical object. */
interface ApiDrawing {
  AddBreak(breakType: number, position: string): boolean;
  Copy(): ApiDrawing;
  Delete(): boolean;
  Fill(oFill: ApiFill): boolean;
  GetClassType(): "drawing";
  GetContent(): ApiDocumentContent;
  GetHeight(): number;
  GetLockValue(sType: DrawingLockType): bool;
  GetNextDrawing(): ApiDrawing | null;
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentParagraph(): ApiParagraph | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPrevDrawing(): ApiDrawing | null;
  GetWidth(): number;
  InsertInContentControl(nType: number): ApiDrawing | ApiBlockLvlSdt;
  InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | ApiDrawing;
  ScaleHeight(coefficient: number): boolean;
  ScaleWidth(coefficient: number): boolean;
  Select(): void;
  SetDistances(nLeft: number, nTop: number, nRight: number, nBottom: number): void;
  SetDrawingPrFromDrawing(oAnotherDrawing: ApiDrawing): boolean;
  SetHorAlign(sRelativeFrom?: RelFromH, sAlign?: "left" | "right" | "center"): void;
  SetHorFlip(bFlip: boolean): void;
  SetHorPosition(sRelativeFrom: RelFromH, nDistance: number): void;
  SetLockValue(sType: DrawingLockType, bValue: bool): bool;
  SetOutLine(oStroke: ApiStroke): boolean;
  SetSize(nWidth: number, nHeight: number): void;
  SetVerAlign(sRelativeFrom?: RelFromV, sAlign?: "top" | "bottom" | "center"): void;
  SetVerPosition(sRelativeFrom: RelFromV, nDistance: number): void;
  SetVertFlip(bFlip: boolean): boolean;
  SetWrappingStyle(sType: "inline" | "square" | "tight" | "through" | "topAndBottom" | "behind" | "inFront"): void;
  ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): JSON;
}

/** Class representing a base class for fill. */
interface ApiFill {
  GetClassType(): "fill";
  ToJSON(): JSON;
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
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing gradient stop. */
interface ApiGradientStop {
  GetClassType(): "gradientStop";
  ToJSON(): JSON;
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
  GetRange(Start: number, End: number): ApiRange;
  GetScreenTipText(): string;
  SetDefaultStyle(): boolean;
  SetDisplayedText(sDisplay: string): boolean;
  SetLink(sLink: string): boolean;
  SetScreenTipText(sScreenTipText: string): boolean;
  ToJSON(bWriteStyles: boolean): JSON;
}

/** Class representing an image. */
interface ApiImage {
  GetClassType(): "image";
  GetNextImage(): ApiImage | null;
  GetPrevImage(): ApiImage | null;
}

/** Class representing a container for the paragraph elements. */
interface ApiInlineLvlSdt {
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddElement(oElement: ParagraphContent, nPos?: number): boolean;
  AddText(sText: string): boolean;
  Copy(): ApiInlineLvlSdt;
  Delete(keepContent: boolean): boolean;
  GetAlias(): string;
  GetClassType(): "inlineLvlSdt";
  GetDropdownList(): ApiContentControlList;
  GetElement(nPos: number): ParagraphContent;
  GetElementsCount(): number;
  GetInternalId(): string;
  GetLabel(): string;
  GetLock(): SdtLock;
  GetParentContentControl(): ApiBlockLvlSdt | ApiInlineLvlSdt | null;
  GetParentParagraph(): ApiParagraph | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPlaceholderText(): string;
  GetRange(Start: number, End: number): ApiRange;
  GetTag(): string;
  IsForm(): boolean;
  MoveCursorOutside(isAfter?: boolean): void;
  Push(oElement: DocumentElement): boolean;
  RemoveAllElements(): boolean;
  RemoveElement(nPos: number): boolean;
  Select(): boolean;
  SetAlias(sAlias: string): void;
  SetLabel(sLabel: string): void;
  SetLock(sLockType: "contentLocked" | "sdtContentLocked" | "sdtLocked"): void;
  SetPlaceholderText(sText: string): boolean;
  SetTag(sTag: string): void;
  SetTextPr(oTextPr: ApiTextPr): ApiInlineLvlSdt;
  ToJSON(bWriteStyles: boolean): JSON;
}

/** Class representing the numbering properties. */
interface ApiNumbering {
  GetClassType(): "numbering";
  GetLevel(nLevel: number): ApiNumberingLevel;
  ToJSON(): JSON;
}

/** Class representing a reference to a specified level of the numbering. */
interface ApiNumberingLevel {
  GetClassType(): "numberingLevel";
  GetLevelIndex(): number;
  GetNumbering(): ApiNumbering;
  GetParaPr(): ApiParaPr;
  GetTextPr(): ApiTextPr;
  LinkWithStyle(oStyle: ApiStyle): void;
  SetCustomType(sType: "none" | "bullet" | "decimal" | "lowerRoman" | "upperRoman" | "lowerLetter" | "upperLetter" | "decimalZero", sTextFormatString: string, sAlign: "left" | "right" | "center"): void;
  SetRestart(isRestart: boolean): void;
  SetStart(nStart: number): void;
  SetSuff(sType: "space" | "tab" | "none"): void;
  SetTemplateType(sType: "none" | "bullet" | "1)" | "1." | "I." | "A." | "a)" | "a." | "i.", sSymbol?: string): void;
}

/** Class representing an Ole object. */
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
  GetShd(): ApiRGBColor;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  GetStyle(): ApiStyle;
  SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetContextualSpacing(isContextualSpacing: boolean): void;
  SetIndFirstLine(nValue: number): void;
  SetIndLeft(nValue: number): void;
  SetIndRight(nValue: number): void;
  SetJc(sJc: "left" | "right" | "both" | "center"): void;
  SetKeepLines(isKeepLines: boolean): void;
  SetKeepNext(isKeepNext: boolean): void;
  SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetNumPr(oNumPr: ApiNumbering, nLvl?: number): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetPageBreakBefore(isPageBreakBefore: boolean): void;
  SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): void;
  SetStyle(oStyle: ApiStyle): void;
  SetTabs(aPos: twips[], aVal: TabJc[]): void;
  SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetWidowControl(isWidowControl: boolean): void;
  ToJSON(bWriteStyles: boolean): JSON;
}

/** Class representing a paragraph. */
interface ApiParagraph {
  AddBookmarkCrossRef(sRefTo: bookmarkRefTo, sBookmarkName: string, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
  AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
  AddCaptionCrossRef(sCaption: CaptionLabel | string, sRefType: captionRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddColumnBreak(): ApiRun;
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddDrawing(oDrawing: ApiDrawing): ApiRun;
  AddElement(oElement: ParagraphContent, nPos?: number): boolean;
  AddEndnoteCrossRef(sRefType: endnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddFootnoteCrossRef(sRefType: footnoteRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddHeadingCrossRef(sRefType: headingRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean): boolean;
  AddHyperlink(sLink: string, sScreenTipText: string): ApiHyperlink | null;
  AddInlineLvlSdt(oSdt: ApiInlineLvlSdt): ApiInlineLvlSdt;
  AddLineBreak(): ApiRun;
  AddNumberedCrossRef(sRefType: numberedRefTo, oParaTo: ApiParagraph, bLink?: boolean, bAboveBelow?: boolean, sSepWith?: string): boolean;
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
  GetElement(nPos: number): ParagraphContent;
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
  GetRange(Start: number, End: number): ApiRange;
  GetSection(): ApiSection;
  GetShd(): ApiRGBColor;
  GetSpacingAfter(): number;
  GetSpacingBefore(): number;
  GetSpacingLineRule(): "auto" | "atLeast" | "exact" | undefined;
  GetSpacingLineValue(): number | line240 | undefined;
  GetStyle(): ApiStyle;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TabSymbol?: string): string;
  GetTextPr(): ApiTextPr;
  InsertInContentControl(nType: number): ApiParagraph | ApiBlockLvlSdt;
  InsertParagraph(paragraph: string | ApiParagraph, sPosition: string, beRNewPara: boolean): ApiParagraph | null;
  Last(): ParagraphContent;
  Push(oElement: ParagraphContent): boolean;
  RemoveAllElements(): void;
  RemoveElement(nPos: number): void;
  ReplaceByElement(oElement: DocumentElement): boolean;
  Search(sText: string, isMatchCase: boolean): ApiRange[];
  Select(): boolean;
  SetBetweenBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetBold(isBold: boolean): ApiParagraph;
  SetBottomBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCaps(isCaps: boolean): ApiParagraph;
  SetColor(r: number, g: number, b: number, isAuto?: boolean): ApiParagraph;
  SetContextualSpacing(isContextualSpacing: boolean): void;
  SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiParagraph;
  SetFontFamily(sFontFamily: string): ApiParagraph;
  SetFontSize(nSize: hps): ApiParagraph;
  SetHighlight(sColor: highlightColor): ApiParagraph;
  SetIndFirstLine(nValue: number): void;
  SetIndLeft(nValue: number): void;
  SetIndRight(nValue: number): void;
  SetItalic(isItalic: boolean): ApiParagraph;
  SetJc(sJc: "left" | "right" | "both" | "center"): void;
  SetKeepLines(isKeepLines: boolean): void;
  SetKeepNext(isKeepNext: boolean): void;
  SetLeftBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetNumPr(oNumPr: ApiNumbering, nLvl?: number): void;
  SetNumbering(oNumberingLevel: ApiNumberingLevel): void;
  SetOutlineLvl(nLvl?: number): boolean;
  SetPageBreakBefore(isPageBreakBefore: boolean): void;
  SetPosition(nPosition: hps): ApiParagraph;
  SetRightBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetSection(oSection: ApiSection): boolean;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetSmallCaps(isSmallCaps: boolean): ApiParagraph;
  SetSpacing(nSpacing: number): ApiParagraph;
  SetSpacingAfter(nAfter: number, isAfterAuto?: boolean): void;
  SetSpacingBefore(nBefore: number, isBeforeAuto?: boolean): void;
  SetSpacingLine(nLine: number | line240, sLineRule: "auto" | "atLeast" | "exact"): void;
  SetStrikeout(isStrikeout: boolean): ApiParagraph;
  SetStyle(oStyle: ApiStyle): void;
  SetTabs(aPos: twips[], aVal: TabJc[]): void;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTopBorder(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetUnderline(isUnderline: boolean): ApiParagraph;
  SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiParagraph | null;
  SetWidowControl(isWidowControl: boolean): void;
  ToJSON(bWriteStyles: boolean): JSON;
  WrapInMailMergeField(): void;
}

/** Class representing a document picture form. */
interface ApiPictureForm {
  Clear(): void;
  Copy(): ApiForm;
  GetClassType(): "form";
  GetFormKey(): string;
  GetFormType(): FormType;
  GetImage(): base64img;
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
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetImage(sImageSrc: string, nWidth: number, nHeight: number): boolean;
  SetLockAspectRatio(isLock?: boolean): boolean;
  SetPicturePosition(nShiftX: percentage, nShiftY: percentage): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetRespectBorders(isRespect?: boolean): boolean;
  SetScaleFlag(sScaleFlag: ScaleFlag): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
  ToInline(): boolean;
}

/** Class representing a Preset Color. */
interface ApiPresetColor {
  GetClassType(): "presetColor";
  ToJSON(): JSON;
}

/** Class representing an RGB Color. */
interface ApiRGBColor {
  GetClassType(): "rgbColor";
  ToJSON(): JSON;
}

/** Class representing a continuous region in a document.  Each Range object is determined by the position of the start and end characters. */
interface ApiRange {
  AddBookmark(sName: string): boolean;
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddHyperlink(sLink: string, sScreenTipText: string): ApiHyperlink | null;
  AddText(sText: string, sPosition?: string): boolean;
  Delete(): boolean;
  ExpandTo(oRange: ApiRange): ApiRange | null;
  GetAllParagraphs(): ApiParagraph[];
  GetClassType(): "range";
  GetEndPage(): number;
  GetEndPos(): number;
  GetParagraph(nPos: number): ApiParagraph | null;
  GetRange(Start?: number, End?: number): ApiRange;
  GetStartPage(): number;
  GetStartPos(): number;
  GetText(oPr?: object, oPr_Numbering?: boolean, oPr_Math?: boolean, oPr_NewLineSeparator?: string, oPr_TableCellSeparator?: string, oPr_TableRowSeparator?: string, oPr_ParaSeparator?: string, oPr_TabSymbol?: string): string;
  GetTextPr(): ApiTextPr;
  IntersectWith(oRange: ApiRange): ApiRange | null;
  Select(): void;
  SetBold(isBold: boolean): ApiRange | null;
  SetCaps(isCaps: boolean): ApiRange | null;
  SetColor(r: number, g: number, b: number, isAuto?: boolean): ApiRange | null;
  SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiRange | null;
  SetEndPos(nPos: number): boolean;
  SetFontFamily(sFontFamily: string): ApiRange | null;
  SetFontSize(FontSize: hps): ApiRange | null;
  SetHighlight(sColor: highlightColor): ApiRange | null;
  SetItalic(isItalic: boolean): ApiRange | null;
  SetPosition(nPosition: hps): ApiRange | null;
  SetShd(sType: ShdType, r: number, g: number, b: number): ApiRange | null;
  SetSmallCaps(isSmallCaps: boolean): ApiRange | null;
  SetSpacing(nSpacing: number): ApiRange | null;
  SetStartPos(nPos: number): boolean;
  SetStrikeout(isStrikeout: boolean): ApiRange | null;
  SetStyle(oStyle: ApiStyle): ApiRange | null;
  SetTextPr(oTextPr: ApiTextPr): ApiRange | null;
  SetUnderline(isUnderline: boolean): ApiRange | null;
  SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiRange | null;
  ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): JSON;
}

/** Class representing a small text block called 'run'. */
interface ApiRun {
  AddColumnBreak(): void;
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddDrawing(oDrawing: ApiDrawing): boolean;
  AddHyperlink(sLink: string, sScreenTipText: string): ApiHyperlink | null;
  AddLineBreak(): void;
  AddPageBreak(): void;
  AddTabStop(): void;
  AddText(sText: string): void;
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
  GetRange(Start: number, End: number): ApiRange;
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
  SetBold(isBold: boolean): ApiTextPr;
  SetCaps(isCaps: boolean): ApiTextPr;
  SetColor(r: number, g: number, b: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
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
  ToJSON(bWriteStyles: boolean): JSON;
  WrapInMailMergeField(): void;
}

/** Class representing a Scheme Color. */
interface ApiSchemeColor {
  GetClassType(): "schemeColor";
  ToJSON(): JSON;
}

/** Class representing a document section. */
interface ApiSection {
  GetClassType(): "section";
  GetFooter(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
  GetHeader(sType: HdrFtrType, isCreate?: boolean): ApiDocumentContent;
  GetNext(): ApiSection | null;
  GetPageHeight(): number;
  GetPageWidth(): number;
  GetPrevious(): ApiSection | null;
  GetStartPageNumber(): number;
  GetType(): SectionBreakType;
  RemoveFooter(sType: HdrFtrType): void;
  RemoveHeader(sType: HdrFtrType): void;
  SetEqualColumns(nCount: number, nSpace: number): void;
  SetFooterDistance(nDistance: number): void;
  SetHeaderDistance(nDistance: number): void;
  SetNotEqualColumns(aWidths: twips[], aSpaces: twips[]): void;
  SetPageMargins(nLeft: number, nTop: number, nRight: number, nBottom: number): void;
  SetPageSize(nWidth: number, nHeight: number, isPortrait?: boolean): void;
  SetStartPageNumber(nStartNumber: number): boolean;
  SetTitlePage(isTitlePage: boolean): void;
  SetType(sType: SectionBreakType): void;
  ToJSON(bWriteNumberings: boolean, bWriteStyles: boolean): JSON;
}

/** Class representing a shape. */
interface ApiShape {
  GetClassType(): "shape";
  GetDocContent(): ApiDocumentContent;
  GetNextShape(): ApiShape | null;
  GetPrevShape(): ApiShape | null;
  SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): void;
  SetVerticalTextAlign(VerticalAlign: VerticalTextAlign): void;
}

/** Class representing a stroke. */
interface ApiStroke {
  GetClassType(): "stroke";
  ToJSON(): JSON;
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
  SetBasedOn(oStyle: ApiStyle): void;
  SetName(sStyleName: string): void;
  ToJSON(bWriteNumberings: boolean): JSON;
}

/** Class representing a table. */
interface ApiTable {
  AddCaption(sAdditional: string, sLabel?: CaptionLabel | string, bExludeLabel?: boolean, sNumberingFormat?: CaptionNumberingFormat, bBefore?: boolean, nHeadingLvl?: number, sCaptionSep?: CaptionSep): boolean;
  AddColumn(oCell?: ApiTableCell, isBefore?: boolean): void;
  AddColumns(oCell?: ApiTableCell, nCount: number, isBefore?: boolean): void;
  AddComment(sText: string, sAuthor: string, sUserId: string): ApiComment;
  AddElement(oCell: ApiTableCell, nPos: number, oElement: DocumentElement): void;
  AddRow(oCell?: ApiTableCell, isBefore?: boolean): ApiTableRow;
  AddRows(oCell?: ApiTableCell, nCount: number, isBefore?: boolean): ApiTable;
  Clear(): boolean;
  Copy(): ApiTable;
  Delete(): boolean;
  GetCell(nRow: number, nCell: number): ApiTableCell | null;
  GetClassType(): "tablePr";
  GetParentContentControl(): ApiBlockLvlSdt | null;
  GetParentTable(): ApiTable | null;
  GetParentTableCell(): ApiTableCell | null;
  GetPosInParent(): number;
  GetRange(Start: number, End: number): ApiRange;
  GetRow(nPos: number): ApiTableRow | null;
  GetRowsCount(): number;
  GetTableDescription(): string;
  GetTableTitle(): string;
  GetTables(): ApiTable[];
  InsertInContentControl(nType: number): ApiTable | ApiBlockLvlSdt;
  MergeCells(aCells: ApiTableCell[]): ApiTableCell;
  RemoveColumn(oCell: ApiTableCell): boolean;
  RemoveRow(oCell: ApiTableCell): boolean;
  ReplaceByElement(oElement: DocumentElement): boolean;
  Search(sText: string, isMatchCase: boolean): ApiRange[];
  Select(): boolean;
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetCellSpacing(nValue: number): void;
  SetHAlign(sType: string): boolean;
  SetJc(sJcType: "left" | "right" | "center"): void;
  SetPaddings(nLeft: number, nTop: number, nRight: number, nBottom: number): boolean;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetStyle(oStyle: ApiStyle): boolean;
  SetStyleColBandSize(nCount: number): void;
  SetStyleRowBandSize(nCount: number): void;
  SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableCellMarginBottom(nValue: number): void;
  SetTableCellMarginLeft(nValue: number): void;
  SetTableCellMarginRight(nValue: number): void;
  SetTableCellMarginTop(nValue: number): void;
  SetTableDescription(sDescr: string): boolean;
  SetTableInd(nValue: number): void;
  SetTableLayout(sType: "autofit" | "fixed"): void;
  SetTableLook(isFirstColumn: boolean, isFirstRow: boolean, isLastColumn: boolean, isLastRow: boolean, isHorBand: boolean, isVerBand: boolean): void;
  SetTableTitle(sTitle: string): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetVAlign(sType: string): boolean;
  SetWidth(sType: TableWidth, nValue?: number): void;
  SetWrappingStyle(isFlow: boolean): boolean;
  Split(oCell?: ApiTableCell, nRow?: number, nCol?: number): ApiTable | null;
  ToJSON(): JSON;
}

/** Class representing a table cell. */
interface ApiTableCell {
  AddColumns(nCount: number, isBefore?: boolean): ApiTable | null;
  AddElement(nPos: number, oElement: DocumentElement): boolean;
  AddRows(nCount: number, isBefore?: boolean): ApiTable | null;
  Clear(): boolean;
  GetClassType(): "tableCellPr";
  GetContent(): ApiDocumentContent;
  GetIndex(): number;
  GetNext(): ApiTableCell | null;
  GetParentRow(): ApiTableRow | null;
  GetParentTable(): ApiTable | null;
  GetPrevious(): ApiTableCell | null;
  GetRowIndex(): number;
  RemoveColumn(): bool | null;
  RemoveRow(): boolean;
  Search(sText: string, isMatchCase: boolean): ApiRange[];
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellMarginBottom(nValue: number): void;
  SetCellMarginLeft(nValue: number): void;
  SetCellMarginRight(nValue: number): void;
  SetCellMarginTop(nValue: number): void;
  SetCellPr(oApiTableCellPr: ApiTableCellPr): boolean;
  SetColumnBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetNoWrap(isNoWrap: boolean): void;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetTextDirection(sType: "lrtb" | "tbrl" | "btlr"): void;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetVerticalAlign(sType: "top" | "center" | "bottom"): void;
  SetWidth(sType: TableWidth, nValue?: number): void;
  Split(nRow?: number, nCol?: number): ApiTable | null;
  ToJSON(): JSON;
}

/** Class representing the table cell properties. */
interface ApiTableCellPr {
  GetClassType(): "tableCellPr";
  SetCellBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetCellMarginBottom(nValue: number): void;
  SetCellMarginLeft(nValue: number): void;
  SetCellMarginRight(nValue: number): void;
  SetCellMarginTop(nValue: number): void;
  SetNoWrap(isNoWrap: boolean): void;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetTextDirection(sType: "lrtb" | "tbrl" | "btlr"): void;
  SetVerticalAlign(sType: "top" | "center" | "bottom"): void;
  SetWidth(sType: TableWidth, nValue?: number): void;
  ToJSON(): JSON;
}

/** Class representing the table properties. */
interface ApiTablePr {
  GetClassType(): "tablePr";
  GetTableDescription(): string;
  GetTableTitle(): string;
  SetCellSpacing(nValue: number): void;
  SetJc(sJcType: "left" | "right" | "center"): void;
  SetShd(sType: ShdType, r: number, g: number, b: number, isAuto?: boolean): void;
  SetStyleColBandSize(nCount: number): void;
  SetStyleRowBandSize(nCount: number): void;
  SetTableBorderBottom(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderInsideH(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderInsideV(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderLeft(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderRight(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableBorderTop(sType: BorderType, nSize: pt_8, nSpace: number, r: number, g: number, b: number): void;
  SetTableCellMarginBottom(nValue: number): void;
  SetTableCellMarginLeft(nValue: number): void;
  SetTableCellMarginRight(nValue: number): void;
  SetTableCellMarginTop(nValue: number): void;
  SetTableDescription(sDescr: string): boolean;
  SetTableInd(nValue: number): void;
  SetTableLayout(sType: "autofit" | "fixed"): void;
  SetTableTitle(sTitle: string): boolean;
  SetWidth(sType: TableWidth, nValue?: number): void;
  ToJSON(): JSON;
}

/** Class representing a table row. */
interface ApiTableRow {
  AddRows(nCount: number, isBefore?: boolean): ApiTable | null;
  Clear(): boolean;
  GetCell(nPos: number): ApiTableCell;
  GetCellsCount(): number;
  GetClassType(): "tableRowPr";
  GetIndex(): number;
  GetNext(): ApiTableRow | null;
  GetParentTable(): ApiTable | null;
  GetPrevious(): ApiTableRow | null;
  MergeCells(): ApiTableCell | null;
  Remove(): boolean;
  Search(sText: string, isMatchCase: boolean): ApiRange[];
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetHeight(sHRule: "auto" | "atLeast", nValue?: number): void;
  SetTableHeader(isHeader: boolean): void;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  ToJSON(): JSON;
}

/** Class representing the table row properties. */
interface ApiTableRowPr {
  GetClassType(): "tableRowPr";
  SetHeight(sHRule: "auto" | "atLeast", nValue?: number): void;
  SetTableHeader(isHeader: boolean): void;
  ToJSON(): JSON;
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
  ToJSON(): JSON;
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
  SetAutoFit(bAutoFit: boolean): boolean;
  SetBackgroundColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetBorderColor(r: number, g: number, b: number, bNone: boolean): boolean;
  SetCellWidth(nCellWidth?: number): boolean;
  SetCharactersLimit(nChars: number): boolean;
  SetComb(bComb: boolean): boolean;
  SetFormKey(sKey: string): boolean;
  SetMultiline(bMultiline: boolean): boolean;
  SetPlaceholderText(sText: string): boolean;
  SetRequired(bRequired: boolean): boolean;
  SetText(sText: string): boolean;
  SetTextPr(oTextPr: ApiTextPr): boolean;
  SetTipText(sText: string): boolean;
  ToFixed(width: number, height: number, keepPosition: boolean): boolean;
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
  SetBold(isBold: boolean): ApiTextPr;
  SetCaps(isCaps: boolean): ApiTextPr;
  SetColor(r: number, g: number, b: number, isAuto?: boolean): ApiTextPr;
  SetDoubleStrikeout(isDoubleStrikeout: boolean): ApiTextPr;
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
  SetUnderline(isUnderline: boolean): ApiTextPr;
  SetVertAlign(sType: "baseline" | "subscript" | "superscript"): ApiTextPr;
  ToJSON(bWriteStyles: boolean): JSON;
}

/** Class representing a base class for color types. */
interface ApiUniColor {
  GetClassType(): "uniColor";
  GetRGB(): number;
  ToJSON(): JSON;
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
  SetDirection(sDirection: WatermarkDirection): void;
  SetImageSize(nWidth: number, nHeight: number): void;
  SetImageURL(sURL: string): void;
  SetOpacity(nOpacity: number): void;
  SetText(sText: string): void;
  SetTextPr(oTextPr: ApiTextPr): void;
  SetType(sType: WatermarkType): void;
}

