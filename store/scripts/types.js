
/**
 * @typedef {Object} Rating
 * @property {number} percent
 * @property {string} average
 * @property {number} total
 */

/**
 * @typedef {Object} PluginInfo
 * @property {string} name
 * @property {string} guid
 * @property {string} url
 * @property {string} baseUrl
 * @property {Object<string, string>} [nameLocale]
 * @property {boolean} [bHasUpdate]
 * @property {boolean} [isConnector]
 * @property {Rating} [rating]
 * @property {string} [offered]
 * @property {unknown} [onlyofficeScheme]
 * @property {string} [minVersion]
 * @property {string} [changelog]
 * @property {string} [discussion]
 * @property {string} [discussionUrl]
 * @property {string} [version]
 * @property {any} [variations]
 * @property {Array<string>} languages
 */

/**
 * @typedef {Object} InstalledPluginInfo
 * @property {string} baseUrl
 * @property {string} guid
 * @property {boolean} canRemoved
 * @property {PluginInfo} obj
 * @property {boolean} removed
 */

/**
 * @typedef {(InstalledPluginInfo | PluginInfo)[]} Plugins
 */ 

/**
 * @typedef { "marketplace" | "installed" | "updates" } InstalledFilter
 */
/**
 * @typedef { "all" | "onlyoffice" | "ai" | "integrations" | "devTools" | "productivity" | "writing" | "translation" | "media" | "utilities"} CategoryFilter
 */