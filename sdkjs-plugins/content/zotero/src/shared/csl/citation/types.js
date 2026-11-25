/**
 * @typedef {Object} OldCitationItem - before version 1.0.5
 * @property {string|number} id
 * @property {string} [type]
 * @property {string} [title]
 * @property {string} [userID]
 * @property {string} [groupID]
 * @property {number} index
 * @property {boolean} [`suppress-author`]
 */

/**
 * @typedef {Object} InfoForCitationCluster
 * @property {string|number} id
 * @property {boolean} `suppress-author`
 * @property {string} [prefix]
 * @property {string} [suffix]
 * @property {string} [label]
 * @property {string} [locator]
 */

/**
 * @typedef {Object} CslJsonItem - a plain CSL JSON item, as returned by
 * Zotero's `csljson` format: the CSL variables sit at the top level, unlike
 * the API "json" shape that nests them under `data`.
 * @property {string|number} [id]
 * @property {string} [type]
 * @property {string} [`citation-key`]
 */
