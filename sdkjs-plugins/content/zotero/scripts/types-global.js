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
 */

/** ------------------------------------------------ */

/**
 * @typedef {Object} CustomField
 * @property {string} Value
 * @property {string} Content
 * @property {string} [FieldId]
 */

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
 * @typedef {Object} SupSubPositions
 * @property {'sup'|'sub'} type
 * @property {number} start
 * @property {number} end
 * @property {string} content
 * @property {string} originalMatch
 */

/**
 * @typedef {Object} AscPluginTheme
 * @property {string} `text-normal`
 * @property {string} `background-normal`
 * @property {string} `highlight-button-hover`
 * @property {string} `highlight-button-pressed`
 * @property {string} `border-regular-control`
 * @property {string} `border-toolbar`
 * @property {string} `border-divider`
 * @property {string} `background-toolbar`
 * @property {string} RulerLight
 * @property {string} Color - text color
 * @property {string} type - light/dark
 */

/**
 * @callback ExecuteCommandCallback
 * @param {string} command
 * @param {any} [value]
 * @param {function} [callback]
 * @returns {void}
 */

/**
 * @callback CallCommandCallback
 * @param {function} command
 * @param {boolean} [isClose]
 * @param {boolean} [isCalc]
 * @param {function} [callback]
 * @returns {void}
 */

/**
 * @typedef {Object} Theme
 * @property {'light'|'dark'} type
 */

/**
 * @typedef {Object} AscPlugin
 * @property {function(string, Array<any>|null, function(any): void): void} executeMethod
 * @property {ExecuteCommandCallback} executeCommand
 * @property {CallCommandCallback} callCommand
 * @property {function(): void} init
 * @property {object} info
 * @property {function(string): void} sendToPlugin
 * @property {function} onTranslate
 * @property {function(string, function): void} attachEvent
 * @property {function(Theme): void} onThemeChanged
 * @property {function(Theme): void} onThemeChangedBase
 * @property {AscPluginTheme} theme
 * @property {function(string): string} tr
 */

/**
 * @typedef {Object} Asc
 * @property {AscPlugin} plugin
 * @property {{positions: Array<SupSubPositions>}} scope
 */

/** @type {Asc} */
var Asc = window.Asc;

/** ------------------------------------------------ */

/**
 * @typedef {Object} Api
 * @property {function(): any} GetDocument
 */

/** @type {Api} */
var Api = window.Api;

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
