
/** @typedef {import("../../sdkjs-plugins/v1/onlyoffice-types").PluginWindow} PluginWindow */
/** @typedef {import("../../sdkjs-plugins/v1/onlyoffice-types").VariationConfig} VariationConfig */
/** @typedef {import("../../sdkjs-plugins/v1/onlyoffice-types").AscTheme} AscTheme */

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
 * @property {string} ioUrl
 * @property {PluginInfo} [installed]
 * @property {AvailablePluginInfo} [available]
 * @property {PluginInfo} [plugin]
 * @property {string} iconBackground
 * @property {{src: string, srcset: string}} iconSrc
 * @property {boolean} isLocal
 * @property {number} editorVersion
 * @property {boolean} bHasUpdate
 * @property {boolean} bActionDisabled
 * @property {boolean} removed
 * @property {boolean} canRemoved
 * @property {boolean} independentMode
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
 * @typedef {Object} PluginCardIframeMessage
 * @property {'PluginReady' | 'Error' | 'Theme' | 'onExternalMouseUp'} type
 * @property {{message: string}} error
 * @property {AscTheme} theme
 * @property {string} style
 * @property {PluginCardWindowParams} data
 */

/** @typedef {'word' | 'slide' | 'cell' | 'pdf'} EditorType */

/**
 * @typedef {Object} PluginReadyMessage
 * @property {'PluginReady'} type
 * @property {string} version
 * @property {string} pluginVersion
 * @property {EditorType} editorType
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
 * @property {Array<VariationConfig>} [variations]
 * @property {any} [backup]
 * @property {boolean} [local] - If "true", then the plugin is not being downloaded from GitHub.
 */

/**
 * @typedef {Object} AvailablePluginInfo
 * @property {string} baseUrl
 * @property {string} guid
 * @property {boolean} canRemoved
 * @property {PluginInfo} obj
 * @property {boolean} removed
 */

/**
 * @typedef {Object} PluginPlateState
 * @property {PluginInfo} config
 * @property {PluginInfo | undefined} installed
 * @property {boolean} bHasUpdate
 * @property {boolean} bRemoved
 * @property {boolean} bNotAvailable
 * @property {boolean} bNeedUpdateButton
 * @property {boolean} bNeedRemoveButton
 * @property {boolean} bNeedInstallButton
 * @property {boolean} independentMode
 */

/**
 * @typedef { "installed" | "updates" |"all" | "onlyoffice" | "ai" | "integrations" | "devTools" | "productivity" | "writing" | "translation" | "media" | "utilities"} CategoryFilter
 */