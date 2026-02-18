/**
 * @typedef {Object} InputOptionsType
 * @property {"text"|"search"|"email"|"password"|"number"|"tel"|"url"|"date"|string} [type]
 * @property {string} [placeholder]
 * @property {string|number} [value]
 * @property {boolean} [autofocus]
 * @property {boolean} [disabled]
 * @property {boolean} [readonly]
 * @property {boolean} [required]
 * @property {boolean} [showSearchIcon]
 * @property {number} [maxLength]
 * @property {number} [minLength]
 * @property {number} [minLength]
 * @property {string} [pattern]
 * @property {boolean} [showCounter]
 * @property {boolean} [showClear]
 * @property {function} [validation]
 * @property {AutoFill} [autocomplete]
 */

/**
 * @typedef {Object} InputEventType
 * @property {string} type
 * @property {{value: string, originalEvent?: Event}} detail
 */

/**
 * @typedef {Object} InputBoundHandlesType
 * @property {(ev: Event) => void} focus
 * @property {(ev: Event) => void} blur
 * @property {(ev: Event) => void} input
 * @property {(ev: KeyboardEvent) => void} keydown
 * @property {() => void} [search]
 * @property {() => void} clear
 * @property {() => void} validate
 */
