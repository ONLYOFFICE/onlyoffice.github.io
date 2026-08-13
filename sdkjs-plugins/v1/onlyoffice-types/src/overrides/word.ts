// Manual overrides for Word classes/typedefs that generate-types.js can't resolve from this
// package's own sources (word/apiBuilder.js, word/plugin-events.js): sdkjs's own JSDoc for these
// documents them fully (verified against sdkjs/deploy/sdkjs/word/sdk-all.js, "@since 9.5.0"), but
// the individual source file(s) that declare them aren't present in a plain sdkjs checkout - only
// the prebuilt bundle carries them. Loaded by generate-types.js (see loadOverrides) and spliced into
// generated/word.ts in place of a blind `unknown` stub. Hand-maintained: if sdkjs changes these
// classes' real shape, this file goes stale silently - re-derive from a current sdk-all.js.
//
// This import (and the type aliases below it) exist only so this file type-checks on its own
// (it's included directly in tsconfig.typecheck.json for exactly that reason) - loadOverrides in
// generate-types.js only picks up `export interface`/`export type` blocks, so neither the import
// nor the aliases are ever spliced into generated/word.ts; there, `ApiDocument`/`ApiRange` are
// already in scope as sibling declarations inside `namespace Word`.
import type { Word } from "../generated/word";

type ApiDocument = Word.ApiDocument;
type ApiRange = Word.ApiRange;

/** The leader type in a table of contents/figures (the fill character before the page number). */
export type TocLeader = "dot" | "dash" | "underline" | "none";

/** The table of contents style type. */
export type TocStyle = "simple" | "online" | "standard" | "modern" | "classic";

/** The table of figures style type. */
export type TofStyle = "simple" | "online" | "classic" | "distinctive" | "centered" | "formal";

/** The caption label a table of figures can be built from. */
export type CaptionLabel = "Table" | "Equation" | "Figure";

export interface TocStyleLvl {
  /** Style name, e.g. `"Heading 1"`. */
  Name: string;
  /** Level which will be applied to the specified style in the table of contents. */
  Lvl: number;
}

/** Specifies whether to generate a table of contents from outline levels or from specific styles. */
export interface TocBuildFromPr {
  /** The highest heading level included in the table of contents (start of the outline range). Default: `1`. */
  OutlineLvlStart?: number;
  /** The lowest heading level included in the table of contents (end of the outline range). Default: `9`. */
  OutlineLvls?: number;
  /** Style levels, e.g. `[{Name: "Heading 1", Lvl: 2}]`. If non-empty, `OutlineLvls` is ignored. */
  StylesLvls?: TocStyleLvl[];
}

/** Table of contents properties, passed to `ApiTableOfContents.SetPr`/`ApiDocument.AddTableOfContents`. */
export interface TocPr {
  /** Specifies whether to show page numbers in the table of contents. Default: `true`. */
  ShowPageNums?: boolean;
  /** Specifies whether to right-align page numbers in the table of contents. Default: `true`. */
  RightAlgn?: boolean;
  /** The leader type in the table of contents. Default: `"dot"`. */
  LeaderType?: TocLeader;
  /** Specifies whether to format the table of contents as links. Default: `true`. */
  FormatAsLinks?: boolean;
  /** Specifies whether to generate the table of contents from outline levels or specified styles. */
  BuildFrom?: TocBuildFromPr;
  /** The table of contents style type. Default: `"standard"`. */
  TocStyle?: TocStyle;
}

/** Table of figures properties, passed to `ApiTableOfFigures.SetPr`/`ApiDocument.AddTableOfFigures`. */
export interface TofPr {
  /** Specifies whether to show page numbers in the table of figures. Default: `true`. */
  ShowPageNums?: boolean;
  /** Specifies whether to right-align page numbers in the table of figures. Default: `true`. */
  RightAlgn?: boolean;
  /** The leader type in the table of figures. Default: `"dot"`. */
  LeaderType?: TocLeader;
  /** Specifies whether to format the table of figures as links. Default: `true`. */
  FormatAsLinks?: boolean;
  /** The caption label (e.g. `"Figure"`) or paragraph style name (e.g. `"Heading 1"`) to build the table of figures from. Default: `"Figure"`. */
  BuildFrom?: CaptionLabel | string;
  /** Specifies whether to include the label and number in the table of figures entries. Default: `true`. */
  LabelNumber?: boolean;
  /** The table of figures style type. Default: `"distinctive"`. */
  TofStyle?: TofStyle;
}

/** A table of contents field in a Word document. Returned by `ApiDocument.AddTableOfContents`/`GetTableOfContents`. */
export interface ApiTableOfContents {
  /** Returns a type of the ApiTableOfContents class. */
  GetClassType(): "tableOfContents";
  /** Updates the table of contents. */
  Update(bOnlyPageNumbers?: boolean): boolean;
  /** Removes the table of contents from the document. */
  Delete(): boolean;
  /** Returns the document that contains the table of contents. */
  GetParent(): ApiDocument | null;
  /** Returns a range that covers the entire table of contents. */
  GetRange(): ApiRange | null;
  /** Returns whether page numbers are shown in the table of contents. */
  GetIncludePageNumbers(): boolean;
  /** Specifies whether page numbers are shown in the table of contents. */
  SetIncludePageNumbers(isInclude: boolean): boolean;
  /** Returns whether page numbers are right-aligned in the table of contents. */
  GetRightAlignPageNumbers(): boolean;
  /** Specifies whether page numbers are right-aligned in the table of contents. */
  SetRightAlignPageNumbers(isRightAlign: boolean): boolean;
  /** Returns whether entries are formatted as hyperlinks. */
  GetUseHyperlinks(): boolean;
  /** Specifies whether entries are formatted as hyperlinks. */
  SetUseHyperlinks(isUseHyperlinks: boolean): boolean;
  /** Returns the highest (outermost) heading level included in the table of contents. */
  GetUpperHeadingLevel(): number;
  /** Sets the highest (outermost) heading level included in the table of contents. */
  SetUpperHeadingLevel(nLevel: number): boolean;
  /** Returns the lowest (innermost) heading level included in the table of contents. */
  GetLowerHeadingLevel(): number;
  /** Sets the lowest (innermost) heading level included in the table of contents. */
  SetLowerHeadingLevel(nLevel: number): boolean;
  /** Applies the specified properties to the table of contents and rebuilds it. */
  SetPr(oTocPr: TocPr): boolean;
}

/** A table of figures field in a Word document. Returned by `ApiDocument.AddTableOfFigures`. */
export interface ApiTableOfFigures {
  /** Returns a type of the ApiTableOfFigures class. */
  GetClassType(): "tableOfFigures";
  /** Updates the table of figures. */
  Update(bOnlyPageNumbers?: boolean): boolean;
  /** Removes the table of figures from the document. */
  Delete(): boolean;
  /** Returns the document that contains the table of figures. */
  GetParent(): ApiDocument | null;
  /** Returns a range that covers the entire table of figures. */
  GetRange(): ApiRange | null;
  /** Returns whether page numbers are shown in the table of figures. */
  GetIncludePageNumbers(): boolean;
  /** Specifies whether page numbers are shown in the table of figures. */
  SetIncludePageNumbers(isInclude: boolean): boolean;
  /** Returns whether page numbers are right-aligned in the table of figures. */
  GetRightAlignPageNumbers(): boolean;
  /** Specifies whether page numbers are right-aligned in the table of figures. */
  SetRightAlignPageNumbers(isRightAlign: boolean): boolean;
  /** Returns whether entries are formatted as hyperlinks. */
  GetUseHyperlinks(): boolean;
  /** Specifies whether entries are formatted as hyperlinks. */
  SetUseHyperlinks(isUseHyperlinks: boolean): boolean;
  /** Returns the caption label that the table of figures is built from (for example, "Figure"). */
  GetCaption(): string | null;
  /** Sets the caption label that the table of figures is built from (for example, "Figure"). */
  SetCaption(sCaption: string): boolean;
  /** Returns whether the caption label and number are included in the table of figures entries. */
  GetIncludeLabel(): boolean;
  /** Specifies whether the caption label and number are included in the table of figures entries. */
  SetIncludeLabel(isInclude: boolean): boolean;
  /** Applies the specified properties to the table of figures and rebuilds it. */
  SetPr(oTofPr: TofPr): boolean;
}

/**
 * A grammar/spellcheck-style annotation range attached to a paragraph - the payload of
 * `onBlurAnnotation`/`onFocusAnnotation`/`onClickAnnotation`. Kept in sync by hand with the
 * identical shape `scripts/generate-plugin-methods.js` derives independently for the same concept
 * from a different sdkjs source (word/api_plugins.js) - see src/generated/word-methods.ts.
 */
export interface TextAnnotation {
  /** ID of the paragraph containing the annotation. */
  paragraphId: string;
  /** ID of the annotation range. */
  rangeId: string;
  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}

/** A text range within a paragraph associated with an annotation - see {@link TextAnnotation}. */
export interface TextAnnotationRange {
  /** Unique identifier for the range. */
  id: string;
  /** Starting index of the text range. */
  start: number;
  /** Length of the text range. */
  length: number;
  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}
