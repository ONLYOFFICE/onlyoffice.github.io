// @ts-check

/**
 * @typedef {Object} CustomField
 * @property {string} Value
 * @property {string} Content
 * @property {string} [FieldId]
 */

/**
 * @param {string} citPrefix
 * @param {string} citSuffix
 * @param {string} bibPrefix
 * @param {string} bibSuffix
 * @param {StyleFormat} styleFormat
 */
function CitationDocService(
    citPrefix,
    citSuffix,
    bibPrefix,
    bibSuffix,
    styleFormat
) {
    this._citPrefixOld = "ZOTERO_CITATION";
    this._bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";

    this._citPrefix = citPrefix;
    this._citSuffix = citSuffix;
    this._bibPrefix = bibPrefix;
    this._bibSuffix = bibSuffix;
    this._styleFormat = styleFormat;

    /** @type {number} */
    this._repeatTimeout;
    /**
     * @type {{ updateItems: (arg0: string[]) => void; makeCitationCluster: (arg0: SuppressAuthor[]) => string; makeBibliography: () => any[][]; } | null}
     */
    this._formatter = null;
}

/**
 * @param {string} text
 * @param {string} value
 */
CitationDocService.prototype.addBibliography = function (text, value) {
    /** @type {CustomField} */
    const field = {
        Value: this._bibPrefix + value + this._bibSuffix,
        Content: text,
    };
    return new Promise(function (resolve) {
        window.Asc.plugin.executeMethod("AddAddinField", [field], resolve);
    });
};

/**
 * @param {string} text
 * @param {string} value
 * @returns
 */
CitationDocService.prototype.addCitation = function (text, value) {
    /** @type {CustomField} */
    const field = {
        Value: this._citPrefix + " " + this._citSuffix + value,
        Content: text,
    };
    if (["note", "note-ibid"].indexOf(this._styleFormat) !== -1) {
        window.Asc.plugin.callCommand(function () {
            const oDocument = Api.GetDocument();
            oDocument.AddFootnote();
        });
    }
    return new Promise(function (resolve, reject) {
        window.Asc.plugin.executeMethod("AddAddinField", [field], resolve);
    });
};

/**
 * @returns {Promise<Array<CustomField>>}
 */
CitationDocService.prototype.getAllAddinFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
    });
};

/**
 * @returns {Promise<Array<CustomField>>}
 */
CitationDocService.prototype.getAddinZoteroFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        self.getAllAddinFields().then(function (arrFields) {
            try {
                if (arrFields.length) {
                    arrFields = arrFields.filter(function (field) {
                        return (
                            field.Value.indexOf(self._citPrefix) !== -1 ||
                            field.Value.indexOf(self._bibPrefix) !== -1 ||
                            field.Value.indexOf(self._citPrefixOld) !== -1 ||
                            field.Value.indexOf(self._bibPrefixOld) !== -1
                        );
                    });
                }
            } catch (e) {
                reject(e);
            }
            resolve(arrFields);
        });
    });
};

/**
 * @returns {Promise<boolean>}
 */
CitationDocService.prototype.saveAsText = function () {
    // TODO потом добавить ещё форматы, пока только как текст
    return this.getAddinZoteroFields().then(function (arrFields) {
        let count = arrFields.length;
        if (!count) {
            window.Asc.plugin.executeCommand("close", "");
            return false;
        }

        return new Promise(function (resolve) {
            arrFields.forEach(function (field) {
                window.Asc.plugin.executeMethod(
                    "RemoveFieldWrapper",
                    [field.FieldId],
                    function () {
                        count--;
                        if (!count) {
                            resolve(true);
                            window.Asc.plugin.executeCommand("close", "");
                        }
                    }
                );
            });
        });
    });
};

/**
 * @param {StyleFormat} styleFormat
 */
CitationDocService.prototype.setStyleFormat = function (styleFormat) {
    this._styleFormat = styleFormat;
};

CitationDocService.prototype.updateAddinFields = function (fields) {
    return new Promise(function (resolve, reject) {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [fields], resolve);
    });
};
