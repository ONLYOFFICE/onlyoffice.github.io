/**
 * @typedef {Object} localStorageCustomAssistantItem
 * @property {string} id
 * @property {string} name
 * @property {number} type
 * @property {string} query
 */

/**
 * @typedef {Object} ReplaceHintAiResponse
 * @property {string} origin
 * @property {string} suggestion
 * @property {string} description
 * @property {string} difference
 * @property {number} paragraph
 * @property {number} occurrence
 * @property {number} confidence
 */

/**
 * @typedef {Object} ReplaceAiResponse
 * @property {string} wrong
 * @property {string} correct
 * @property {string} reason
 * @property {number} paragraph
 * @property {number} occurrence
 * @property {number} confidence
 */

/**
 * @typedef {Object} HintAiResponse
 * @property {string} origin
 * @property {string} reason
 * @property {number} paragraph
 * @property {number} occurrence
 * @property {number} confidence
 */

/**
 * @typedef {Object} ReplaceInfoForPopup
 * @property {string} original
 * @property {string} suggested
 * @property {number} type
 */

/**
 * @typedef {Object} HintInfoForPopup
 * @property {string} original
 * @property {string} reason
 * @property {number} type
 */

/**
 * @typedef {Object} ReplaceHintInfoForPopup
 * @property {string} original
 * @property {string} suggested
 * @property {string} explanation
 * @property {number} type
 */

/**
 * @typedef {ReplaceHintInfoForPopup | HintInfoForPopup | ReplaceInfoForPopup} InfoForPopup
 */

