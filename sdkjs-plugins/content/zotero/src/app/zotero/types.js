/**
 * @typedef {Object} AvailableApis
 * @property {boolean} desktop
 * @property {boolean} hasPermission
 * @property {boolean} desktopVersion
 * @property {boolean} online
 * @property {boolean} hasKey
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} ZoteroGroupInfo
 * @property {number} id
 * @property {number} version
 * @property {CslJsonObjectLinks} meta
 * @property {{created: string, lastModified: string, numItems: number}} links
 * @property {{name: string, description: string, id: number, owner: number, type: string}} data
 */

/**
 * A collection of a Zotero library.
 * @typedef {Object} ZoteroCollection
 * @property {string} key
 * @property {string} name
 * @property {string|null} parentCollection - null at the top of the library
 * @property {number} [numItems] - the items right in it, not in its
 *  subcollections; unknown when missing
 */

/**
 * @typedef {Object} UserGroupInfo
 * @property {number|string} id
 * @property {string} name
 */

/** ------------------------------------------------ */

