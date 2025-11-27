// @ts-check

function LocalesManager() {
    this._isOnlineAvailable = false;
    this._isDesktopAvailable = false;

    this._LOCALES_URL =
        "https://raw.githubusercontent.com/citation-style-language/locales/master/";
    this._LOCALES_PATH = "./resources/csl/locales/";

    this._lastLanguageKey = "zoteroLang";

    /** @type {string | null} */
    this._selectedLanguage = null;

    /** @type {Object<string, string>} */
    this._cache = {};
}

/**
 * Get locale data
 * @param {string} langTag
 * @returns {Promise<string>}
 */
LocalesManager.prototype.loadLocale = function (langTag) {
    const self = this;
    this._selectedLanguage = langTag;
    if (this._cache[langTag]) {
        return Promise.resolve(this._cache[langTag]);
    }
    var url = this._getLocalesUrl() + "locales-" + langTag + ".xml";
    return fetch(url).then(function (response) {
        return response.text();
    }).then(function (text) {
        self._cache[langTag] = text;
        return text;
    });
};

/**
 * @returns {string}
 */
LocalesManager.prototype.getLastUsedLanguage = function () {
    this._selectedLanguage =
        this._selectedLanguage ||
        localStorage.getItem(this._lastLanguageKey) ||
        "en-US";
    return this._selectedLanguage;
};

/**
 * @param {string} [localeId]
 * @returns {string|null}
 */
LocalesManager.prototype.getLocale = function (localeId) {
    if (localeId) {
        if (this._cache[localeId]) {
            return this._cache[localeId];
        }
        return null;
    }
    if (this._selectedLanguage && this._cache[this._selectedLanguage]) {
        return this._cache[this._selectedLanguage];
    }
    return null;
};

/**
 * @param {string} language
 */
LocalesManager.prototype.saveLastUsedLanguage = function (language) {
    this._selectedLanguage = language;
    localStorage.setItem(this._lastLanguageKey, language);
};

/**
 * Get locales URL based on online/offline mode
 */
LocalesManager.prototype._getLocalesUrl = function () {
    return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};

/**
 * @param {boolean} isApiAvailable
 */
LocalesManager.prototype.setDesktopApiAvailable = function (isApiAvailable) {
    this._isDesktopAvailable = isApiAvailable;
};
/**
 * @param {boolean} isApiAvailable
 */
LocalesManager.prototype.setRestApiAvailable = function (isApiAvailable) {
    this._isOnlineAvailable = isApiAvailable;
};
