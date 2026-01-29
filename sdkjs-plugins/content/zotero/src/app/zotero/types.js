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
 * @typedef {Object} UserGroupInfo
 * @property {number|string} id
 * @property {string} name
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} SearchResult
 * @property {Array<SearchResultItem>} items
 * @property {number|string} id
 * @property {function(): Promise<SearchResult>} [next]
 */

/**
 * @typedef {Object} SearchResultItem
 * @property {string} [abstract]
 * @property {string} [archive]
 * @property {string} [archive_location]
 * @property {Array<{family: string, given: string}>} [author]
 * @property {string} [event-place]
 * @property {number|string} [groupID]
 * @property {string} [call-number]
 * @property {string} [collection-number]
 * @property {string} [collection-title]
 * @property {string} [container-title]
 * @property {string} [edition]
 * @property {string} [event-place]
 * @property {string} id
 * @property {string} [ISBN]
 * @property {{'date-parts': number[][]}} [issued]
 * @property {string} [language]
 * @property {string} [note]
 * @property {string} [number-of-pages]
 * @property {string} [number-of-volumes]
 * @property {number} [page]
 * @property {string} [publisher]
 * @property {string} [publisher-place]
 * @property {string} [shortTitle]
 * @property {string} title
 * @property {string} type
 * @property {Array<string>} [uris]
 * @property {string} [URL]
 * @property {number|string} [userID]
 * @property {string} [volume]
 * @property {string} [prefix]
 * @property {string} [suffix]
 * @property {string} [label]
 * @property {string} [locator]
 * @property {boolean} [suppress-author]
 */
