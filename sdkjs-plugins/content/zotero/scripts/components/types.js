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
 * @property {{value: string}} detail
 */

/**
 * @typedef {Object} InputBoundHandlesType
 * @property {() => void} focus
 * @property {() => void} blur
 * @property {(ev: Event) => void} input
 * @property {(ev: KeyboardEvent) => void} keydown
 * @property {() => void} clear
 * @property {() => void} validate
 */

/** ********************** */

/**
 * @typedef {Object} ButtonOptionsType
 * @property {string} [text]
 * @property {"button"|"submit"|"reset"} [type]
 * @property {"primary"|"secondary"|"success"|"danger"} [variant]
 * @property {"small"|"medium"|"large"} [size]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [icon]
 * @property {"left"|"right"} [iconPosition]
 * @property {string} [badge]
 * @property {string} [tooltip]
 */

/**
 * @typedef {Object} ButtonBoundHandlesType
 * @property {function(Event): void} click
 * @property {function(): void} mouseenter
 * @property {function(): void} mouseleave
 * @property {function(): void} focus
 * @property {function(): void} blur
 * @property {function(KeyboardEvent): void} keydown
 */

/** ********************** */
/**
 * @typedef {Object} SelectboxOptionsType
 * @property {string} placeholder
 * @property {boolean} [searchable]
 * @property {boolean} [multiple]
 */