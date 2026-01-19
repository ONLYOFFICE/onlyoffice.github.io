/**
 * @typedef {Object} localStorageCustomAssistantItem
 * @property {string} id
 * @property {string} name
 * @property {number} type
 * @property {string} query
 */

/**
 * @typedef {Object} CorrectionAiResponse
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
 * @typedef {Object} CorrectionInfoForPopup
 * @property {string} original
 * @property {string} suggested
 * @property {string} explanation
 */

/**
 * @typedef {Object} HintInfoForPopup
 * @property {string} original
 * @property {string} reason
 */

/**
 * @typedef {Object} ReplacementInfoForPopup
 * @property {string} original
 * @property {string} suggested
 * @property {string} explanation
 */

/**
 * @typedef {ReplacementInfoForPopup | HintInfoForPopup | CorrectionInfoForPopup} InfoForPopup
 */

