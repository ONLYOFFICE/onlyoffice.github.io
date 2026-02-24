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

/** ********************** */

/**
 * @typedef {Object} CheckboxOptionsType
 * @property {boolean} [checked]
 * @property {boolean} [disabled]
 * @property {boolean} [indeterminate]
 * @property {string} [label]
 * @property {string} [name]
 * @property {string} [value]
 * @property {string} [id]
 * @property {boolean} [title]
 */

/**
 * @typedef {Object} CheckboxEventType
 * @property {string} type
 * @property {Event} [originalEvent]
 * @property {{value: string, disabled: boolean, checked: boolean}} detail
 */

/** ********************** */

/**
 * @typedef {Object} RadioOptionsType
 * @property {boolean} [checked]
 * @property {boolean} [disabled]
 * @property {string} [label]
 * @property {string} [name]
 * @property {string} [value]
 * @property {string} [id]
 */

/**
 * @typedef {Object} RadioEventType
 * @property {string} type
 * @property {Event} [originalEvent]
 * @property {{value: string, disabled: boolean, checked: boolean}} detail
 */

/** ********************** */

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

/** ********************** */
/**
 * @typedef {Object} SelectboxOptionsType
 * @property {string} placeholder
 * @property {boolean} [searchable]
 * @property {boolean} [multiple]
 * @property {string} [description]
 */

/**
 * @typedef {Object} SelectboxEventType
 * @property {string} type
 * @property {SelectboxEventDetail} detail
 */

/**
 * @typedef {Object} SelectboxEventDetail
 * @property {Array<string|number>} values
 * @property {string|number} current
 * @property {boolean} enabled
 * @property {Array<SelectboxItem>} [items]
 */

/** ********************** */

/**
 * @typedef {Object} MessageOptionsType
 * @property {"error"|"warning"|"info"|"success"} type
 * @property {string} [title]
 * @property {string} [text]
 * @property {number} [duration]
 * @property {boolean} [closeButton]
 * @property {boolean} [autoClose]
 * @property {boolean} [closeOnClickOutside]
 */
