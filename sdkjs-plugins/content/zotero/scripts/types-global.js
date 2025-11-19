// @ts-check

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
 * @typedef {Object} AscPlugin
 * @property {function(string, Array<any>|null, function(any): void): void} executeMethod
 * @property {ExecuteCommandCallback} executeCommand
 * @property {CallCommandCallback} callCommand
 * @property {function(): void} init
 * @property {object} info
 * @property {function(string): void} sendToPlugin
 * @property {function} onTranslate
 * @property {function(string, function): void} attachEvent
 * @property {string} onThemeChanged
 * @property {function(string): void} onThemeChangedBase
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
 * @property {function(): Promise<Object>} json
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