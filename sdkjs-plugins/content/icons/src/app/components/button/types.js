/**
 * @typedef {Object} ButtonOptionsType
 * @property {string} [text]
 * @property {"button"|"submit"|"reset"} [type]
 * @property {"primary"|"secondary"|"success"|"danger"|"secondary-icon"|"icon-only"} [variant]
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

/**
 * @typedef {Object} ButtonEventType
 * @property {string} type
 * @property {{value: string}} detail
 */
