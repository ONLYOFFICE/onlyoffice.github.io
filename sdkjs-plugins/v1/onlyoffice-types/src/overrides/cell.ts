// Manual overrides for Cell classes/typedefs that generate-types.js can't resolve from this
// package's own sources (word/apiBuilder.js, slide/apiBuilder.js, cell/apiBuilder.js,
// cell/plugin-events.js). See src/overrides/word.ts for the general rationale. `ApiListObject`'s
// real shape was verified against sdkjs/deploy/sdkjs/cell/sdk-all.js; `ApiHyperlinks` and
// `PTCondition` are corrections/documentation for real defects in sdkjs's own JSDoc, not gaps in
// this checkout. Hand-maintained - re-derive `ApiListObject` from a current sdk-all.js if it goes
// stale. `ApiListColumn`/`ApiListRow`/`ApiSort` (returned by some of its methods) aren't modeled
// here yet and fall through to the normal `unknown` stub - a smaller, separate gap.
//
// This import (and the type aliases below it) exist only so this file type-checks on its own
// (it's included directly in tsconfig.typecheck.json for exactly that reason) - loadOverrides in
// generate-types.js only picks up `export interface`/`export type` blocks, so neither the import
// nor the aliases are ever spliced into generated/cell.ts; there, `ApiWorksheet`/`ApiRange`/
// `ApiAutoFilter`/`ApiHyperlink` are already in scope as sibling declarations inside `namespace
// Cell`, and `ApiListColumn`/`ApiListRow`/`ApiSort` resolve to the generic `unknown` stub the
// generator emits for any name nothing else defines - matching the aliases below exactly.
import type { Cell } from "../generated/cell";

type ApiWorksheet = Cell.ApiWorksheet;
type ApiRange = Cell.ApiRange;
type ApiAutoFilter = Cell.ApiAutoFilter;
type ApiHyperlink = Cell.ApiHyperlink;
type ApiListColumn = unknown;
type ApiListRow = unknown;
type ApiSort = unknown;

/**
 * `ApiWorksheet.GetHyperlinks`/`ApiRange.GetHyperlinks` are documented with `@returns {ApiHyperlinks}`,
 * but there is no `ApiHyperlinks` class anywhere in sdkjs (checked out or the deploy bundle) - a
 * naming mistake in sdkjs's own JSDoc. Both implementations actually
 * `.map(elem => new ApiHyperlink(elem, ws))`, i.e. a plain array of the real (singular) `ApiHyperlink`
 * class already generated in this file.
 */
export type ApiHyperlinks = ApiHyperlink[];

/**
 * `ApiFormatCondition`/`ApiAboveAverage` etc.'s `GetPTCondition()` (and the `PTCondition` property
 * alias) return `this.rule.pivot` directly - an internal pivot-table rule object with no public
 * `Api*` wrapper class anywhere in sdkjs, checked-out or bundled. There is nothing to model here;
 * `unknown` is the honest type, not a resolution gap to eventually fill in.
 */
export type PTCondition = unknown;

/** A table (ListObject) on a worksheet. Returned by `ApiWorksheet.GetTables`/similar. */
export interface ApiListObject {
  /** Returns whether the active cell is within the range of the table. */
  GetActive(): boolean;
  /** Returns the alternative text for the table. */
  GetAlternativeText(): string;
  /** Sets the alternative text for the table. */
  SetAlternativeText(sAltText: string): void;
  /** Returns the comment (summary alternative text) for the table. */
  GetComment(): string;
  /** Sets the comment (summary alternative text) for the table. */
  SetComment(sComment: string): void;
  /** Returns the name of the table. */
  GetName(): string;
  /** Sets the name of the table. Equivalent to SetDisplayName. Returns false if the name is invalid or already used by another table. */
  SetName(name: string): boolean;
  /** Returns the worksheet that is the parent of the table. */
  GetParent(): ApiWorksheet;
  /** Returns the display name of the table. */
  GetDisplayName(): string;
  /** Sets the display name of the table. Returns false if the name is invalid or already used by another table. */
  SetDisplayName(sDisplayName: string): boolean;
  /** Returns the range of the table, or null if the table has no range. */
  GetRange(): ApiRange | null;
  /** Returns the range of the header row, or null if the table has no header row. */
  GetHeaderRowRange(): ApiRange | null;
  /** Returns whether the AutoFilter dropdown buttons are displayed on the header row. Defaults to true for a new table. */
  GetShowAutoFilter(): boolean;
  /** Sets whether the AutoFilter is present on the table. Setting to false removes it entirely; true creates it if not present. */
  SetShowAutoFilter(show: boolean): void;
  /** Returns whether the AutoFilter dropdown arrows are displayed on the header row. Defaults to true for a new table. */
  GetShowAutoFilterDropDown(): boolean;
  /** Sets whether the AutoFilter dropdown arrows are displayed; does not remove the AutoFilter itself. */
  SetShowAutoFilterDropDown(bShow: boolean): void;
  /** Returns whether the header row is displayed for the table. */
  GetShowHeaders(): boolean;
  /** Sets whether the header row is displayed for the table. */
  SetShowHeaders(show: boolean): void;
  /** Returns the AutoFilter object for the table, or null if the table has no autofilter. */
  GetAutoFilter(): ApiAutoFilter | null;
  /** Returns the range of the data rows, excluding the header and totals rows; null if the table has no data rows. */
  GetDataBodyRange(): ApiRange | null;
  /** Returns whether banded column formatting is applied to the table. */
  GetShowTableStyleColumnStripes(): boolean;
  /** Sets whether banded column formatting is applied to the table. */
  SetShowTableStyleColumnStripes(show: boolean): void;
  /** Returns whether the first-column style is applied to the table. */
  GetShowTableStyleFirstColumn(): boolean;
  /** Sets whether the first-column style is applied to the table. */
  SetShowTableStyleFirstColumn(show: boolean): void;
  /** Returns whether the last-column style is applied to the table. */
  GetShowTableStyleLastColumn(): boolean;
  /** Sets whether the last-column style is applied to the table. */
  SetShowTableStyleLastColumn(show: boolean): void;
  /** Returns whether banded row formatting is applied to the table. */
  GetShowTableStyleRowStripes(): boolean;
  /** Sets whether banded row formatting is applied to the table. */
  SetShowTableStyleRowStripes(show: boolean): void;
  /** Returns whether the totals row is displayed for the table. */
  GetShowTotals(): boolean;
  /** Sets whether the totals row is displayed for the table. */
  SetShowTotals(show: boolean): void;
  /** Deletes the table and clears the cell formatting. */
  Delete(): void;
  /** Removes the list functionality from the table and converts it to a regular data range; cell data/formatting/formulas remain. */
  Unlist(): void;
  /** Resizes the table to a new range (as an ApiRange or an address string, e.g. `"A1:D10"`). Cells are not inserted or moved. */
  Resize(Range: ApiRange | string): void;
  /** Returns the source type of the table. Always `"xlSrcRange"` for range-based tables. */
  GetSourceType(): string;
  /** Returns the name of the table style applied to the table. */
  GetTableStyle(): string;
  /** Sets the table style by name. */
  SetTableStyle(styleName: string): void;
  /** Returns the range of the totals row, or null if the table has no totals row. */
  GetTotalsRowRange(): ApiRange | null;
  /** Returns the summary description (alternative text summary) for the table. */
  GetSummary(): string;
  /** Sets the summary description (alternative text summary) for the table. */
  SetSummary(summary: string): void;
  /** Returns all columns in the table. */
  GetListColumns(): ApiListColumn[];
  /** Adds a new column at the specified 1-based position (appended at the end if omitted). Returns null if the position is invalid. */
  AddListColumn(nPosition?: number): ApiListColumn | null;
  /** Returns all data rows in the table, excluding the header and totals rows. */
  GetListRows(): ApiListRow[];
  /** Adds a new data row at the specified 1-based position within the data body (appended at the end if omitted). `bAlwaysInsert` (default true) specifies whether cells outside the table are shifted. Returns null if the position is invalid. */
  AddListRow(nPosition?: number, bAlwaysInsert?: boolean): ApiListRow | null;
  /** Returns the Sort object for this table. */
  GetSort(): ApiSort;
}
