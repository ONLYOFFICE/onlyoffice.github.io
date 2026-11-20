/**
 * @typedef {Object} StyleInfo
 * @property {{fields: Array<string>, format: string}} categories - An object containing the citation format and fields.
 * @property {number} dependent - A dependent style is one that requires a specific style to be installed.
 * @property {string} [parent] - The URL of the parent style.
 * @property {string} href - The URL of the style.
 * @property {string} name - The name of the style.
 * @property {string} title - The title of the style.
 * @property {string} updated - The date the style was last updated.
 */

/**
 * @typedef {"note"|"numeric"|"author"|"author-date"|"label"} StyleFormat
 */

/**
 * @typedef {"footnotes" | "endnotes"} NoteStyle
 */

/**
 * A copy of a style kept outside the style repository - in the document or in
 * localStorage - so that it stays usable offline.
 * @typedef {Object} StyleCopy
 * @property {string} styleId - The id the style is selected by.
 * @property {string} updated - The style's own `<info><updated>` timestamp.
 * @property {string} content - The CSL, already resolved to its parent for a dependent style.
 */
