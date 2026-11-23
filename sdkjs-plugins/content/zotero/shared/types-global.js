// @ts-check

/**
 * @typedef {Object} CslJsonObjectItem
 * @property {CslJsonObjectData} data
 * @property {string} key
 * @property {CslJsonObjectLibrary} library
 * @property {CslJsonObjectLinks} links
 * @property {CslJsonObjectMeta} meta
 * @property {number} version
 */

/**
 * @typedef {Object} CslJsonObjectData
 * @property {string} ISBN
 * @property {string} abstractNote
 * @property {string} accessDate
 * @property {string} archive
 * @property {string} archiveLocation
 * @property {string} callNumber
 * @property {Array<any>} collections
 * @property {{creatorType: string, firstName: string, lastName: string}[]} creators
 * @property {string} date
 * @property {string} dateAdded
 * @property {string} dateModified
 * @property {string} edition
 * @property {string} extra
 * @property {string} itemType
 * @property {string} key
 * @property {string} language
 * @property {string} libraryCatalog
 * @property {string} numPages
 * @property {string} numberOfVolumes
 * @property {string} place
 * @property {string} publisher
 * @property {Object} relations
 * @property {string} rights
 * @property {string} series
 * @property {string} seriesNumber
 * @property {string} shortTitle
 * @property {Array<string>} tags
 * @property {string} title
 * @property {string} url
 * @property {number} version
 * @property {string} volume
 */

/**
 * @typedef {Object} CslJsonObjectLink
 * @property {string} href
 * @property {string} type
 */

/**
 * @typedef {Object} CslJsonObjectMeta
 * @property {{id:number,name:string,username:string,links:{alternate:CslJsonObjectLink}}} createdByUser
 * @property {string} creatorSummary
 * @property {number} numChildren
 * @property {string} parsedDate
 */

/**
 * @typedef {Object} CslJsonObjectLinks
 * @property {CslJsonObjectLink} alternate
 * @property {CslJsonObjectLink} self
 */

/**
 * @typedef {Object} CslJsonObjectLibrary
 * @property {number} id
 * @property {{alternate:CslJsonObjectLink}} links
 * @property {string} name
 * @property {string} type
 */

/** ------------------------------------------------ */

/** @typedef {import("@onlyoffice/doceditor-plugin-types").ContentControlProperties} ContentControlProperties */
/** @typedef {import("@onlyoffice/doceditor-plugin-types").AddinFieldData} AddinFieldData */

/** ------------------------------------------------ */

/**
 * @typedef {Object} AscSimpleRequestParams
 * @property {string} url
 * @property {"GET"|"POST"} method
 * @property {object} headers
 * @property {string} [body]
 * @property {function(AscSimpleResponse, string): void} complete
 * @property {function(AscSimpleResponse, string, Error): void} error
 */

/**
 * @typedef {Object} AscSimpleRequest
 * @property {function(AscSimpleRequestParams): void} createRequest
 */

/**
 * @typedef {Object} AscSimpleResponse
 * @property {number} responseStatus
 * @property {string} responseText
 * @property {string} [message]
 * @property {string} status
 * @property {number} statusCode
 */

/** @type {AscSimpleRequest} */
var AscSimpleRequest = window.AscSimpleRequest;

/** ------------------------------------------------ */

/**
 * @typedef {Object} BibliographyStyles
 * @property {number} entryspacing
 * @property {number} linespacing
 * @property {number} maxoffset
 * @property {boolean} [hangingindent]
 * @property {"margin"|'flush'|false} `second-field-align`
 */

/**
 * @typedef {'i'|'u'|'b'|'sc'|'sup'|'sub'|string} AllowedTags
 */

/**
 * @typedef {Object} FormattingPositions
 * @property {AllowedTags} type
 * @property {number} start
 * @property {number} end
 * @property {string} [text]
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} FetchResponse
 * @property {function(): Promise<ArrayBuffer>} arrayBuffer
 * @property {function(): Promise<Blob>} blob
 * @property {function(): Promise<any>} json
 * @property {function(): Promise<string>} text
 * @property {boolean} ok
 * @property {number} status
 * @property {string} statusText
 * @property {Headers} headers
 * @property {string} type
 * @property {string} url
 * @property {boolean} redirected
 */

/**
 * @typedef {Promise<FetchResponse>} FetchPromise
 */

/** ------------------------------------------------ */

/**
 * Where to search in one library.
 * @typedef {Object} LibraryScope
 * @property {string|null} groupId - null for the user library
 * @property {Array<string>|null} collections - the keys of the collections
 *  to search in; null for the whole library
 */

/**
 * A link that carries Zotero's data in a document Zotero converted for
 * moving it between word processors: a field code or the document
 * preferences as its text.
 * @typedef {Object} TransferLink
 * @property {"body" | "footnote" | "endnote"} location
 * @property {number} paragraph - the index of the paragraph in its location
 * @property {number} element - the index of the link in its paragraph
 * @property {string} text
 */

/**
 * @typedef {Object} SearchResult
 * @property {Array<SearchResultItem>} items
 * @property {number|string} [id] - the library or group searched
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
/**
 * @typedef {Object} LastSearch
 * @property {string} text
 * @property {SearchResult | null} obj
 * @property {Array<SearchResult>} groups
 * @property {Array<string|number>} groupOrder - the searched groups in the order of the library filter
 * @property {string} groupsHash
 */
