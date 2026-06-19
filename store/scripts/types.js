
/**
 * @typedef {import("../../sdkjs-plugins/v1/onlyoffice-types").PluginWindow} PluginWindow
 */

/**
 * @typedef {Object} Rating
 * @property {number} percent
 * @property {string} average
 * @property {number} total
 */

/**
 * @typedef {Object} PluginCardWindowParams
 * @property {'showPluginCard'} type
 * @property {string} pluginName
 * @property {string} pluginDescription
 * @property {string} OOMarketplaceUrl
 * @property {string} OOIO
 * @property {InstalledPluginInfo | null} installed
 * @property {PluginInfo | null} plugin
 * @property {string} iconBackground
 * @property {{src: string, srcset: string}} iconSrc
 * @property {boolean} isLocal
 * @property {number} editorVersion
 * @property {boolean} bHasUpdate
 * @property {boolean} bActionDisabled
 * @property {Object<string, string>} translate
 */

/**
 * @typedef {Object} IframeMessage
 * @property {PluginInfo} config
 * @property {'getInstalled' | 'install' | 'remove' | 'update' | 'showPluginCard' | 'hidePluginCard' | 'close' | 'resize' | 'showButton'} type
 * @property {string} guid
 * @property {string} [url]
 * @property {boolean} [updateInstalled]
 * @property {boolean} [backup]
 * @property {number} [width]
 * @property {number} [height]
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
 * @property {string} [minVersion]
 * @property {string} [changelog]
 * @property {string} [discussion]
 * @property {string} [discussionUrl]
 * @property {string} [version]
 * @property {any} [variations]
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
 * @typedef {Object} PluginPlateState
 * @property {PluginInfo} config
 * @property {InstalledPluginInfo | undefined} installed
 * @property {boolean} bHasUpdate
 * @property {boolean} bRemoved
 * @property {boolean} bNotAvailable
 * @property {boolean} bNeedUpdateButton
 * @property {boolean} bNeedRemoveButton
 * @property {boolean} bNeedInstallButton
 */

/**
 * @typedef {(InstalledPluginInfo | PluginInfo)[]} Plugins
 */ 

/**
 * @typedef { "marketplace" | "installed" | "updates" } MainFilter
 */
/**
 * @typedef { "all" | "onlyoffice" | "ai" | "integrations" | "devTools" | "productivity" | "writing" | "translation" | "media" | "utilities"} CategoryFilter
 */