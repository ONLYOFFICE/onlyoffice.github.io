function CslStylesStorage() {
    this._dbName = "ZoteroStylesDB";
    this._storeName = "cslFiles";
    this._customStylesKey = "zoteroCustomStyleIds";
}

CslStylesStorage.prototype._getIndexedDB = function () {
    try {
        if (!("indexedDB" in window) && !("msIndexedDB" in window)) {
            return null;
        }
        return window.indexedDB || window.msIndexedDB;
    } catch (e) {
        return null;
    }
};

CslStylesStorage.prototype._openDB = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        const indexedDB = self._getIndexedDB();
        if (!indexedDB) {
            reject(new Error("IndexedDB not supported"));
            return;
        }

        const request = indexedDB.open(self._dbName, 1);

        request.onerror = function () {
            reject(request.error);
        };
        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(self._storeName)) {
                db.createObjectStore(self._storeName);
            }
        };
    });
};

/**
 * @returns {Array<string>}
 */
CslStylesStorage.prototype.getStyleNames = function () {
    let customStyleNames = localStorage.getItem(this._customStylesKey);
    if (customStyleNames) {
        customStyleNames = JSON.parse(customStyleNames);
    } else {
        customStyleNames = [];
    }
    return customStyleNames;
};

/**
 * Returns a list of custom styles.
 * @returns {Promise<Array<{name: string, title: string, dependent: number}>>
 */
CslStylesStorage.prototype.getStyles = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        let customStyleNames = localStorage.getItem(self._customStylesKey);
        if (customStyleNames) {
            customStyleNames = JSON.parse(customStyleNames);
        } else {
            customStyleNames = [];
        }

        let styles = [];

        if (customStyleNames.length === 0) {
            resolve(styles);
        }

        for (let i = 0; i < customStyleNames.length; i++) {
            self.getStyle(customStyleNames[i])
                .then(function (style) {
                    const result = self._parseStyle(customStyleNames[i], style);
                    styles.push(result);
                    if (styles.length === customStyleNames.length) {
                        resolve(styles);
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
        }
    });
};

/**
 * Parse a style object to extract relevant information.
 * @param {{id: string, content: string, timestamp: number}} style - A style object returned from the indexedDB.
 * @returns {Object} An object containing the parsed style information.
 * @property {{fields: Array<string>, format: string}}} categories - An object containing the citation format and fields.
 * @property {number} dependent - A dependent style is one that requires a specific style to be installed.
 * @property {string} href - The URL of the style.
 * @property {string} name - The name of the style.
 * @property {string} title - The title of the style.
 * @property {string} updated - The date the style was last updated.
 */
CslStylesStorage.prototype._parseStyle = function (name, style) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(style.content, "text/xml");
    const title = xmlDoc.querySelector("info title").textContent;
    const href = xmlDoc
        .querySelector('info link[rel="self"]')
        .getAttribute("href");
    const updated = xmlDoc.querySelector("info updated").textContent;
    const categories = {
        fields: [],
        format: xmlDoc
            .querySelector("info category[citation-format]")
            .getAttribute("citation-format"),
    };
    xmlDoc
        .querySelectorAll("info category[field]")
        .forEach(function (category) {
            categories.fields.push(category.getAttribute("field"));
        });

    return {
        categories: categories,
        dependent: 0,
        href: href,
        name: name,
        title: title,
        updated: updated,
    };
};

/**
 * @param {string}} name
 * @returns {Promise<{id: string, content: string, timestamp: number}>}
 */
CslStylesStorage.prototype.getStyle = function (name) {
    const self = this;
    return new Promise(function (resolve, reject) {
        self._openDB()
            .then(function (db) {
                const transaction = db.transaction(
                    [self._storeName],
                    "readonly"
                );
                const store = transaction.objectStore(self._storeName);
                const request = store.get(name);

                request.onsuccess = function () {
                    // self.deleteStyle(name);
                    resolve(request.result);
                };
                request.onerror = function () {
                    reject(request.error);
                };

                transaction.oncomplete = function () {
                    db.close();
                };
            })
            .catch(reject);
    });
};

/**
 * Add a custom style to the storage.
 * @param {string} name - The name of the style.
 * @param {string} data - The content of the style.
 * @returns {Promise<void>}
 */
CslStylesStorage.prototype.setStyle = function (name, data) {
    const self = this;
    let customStyleNames = localStorage.getItem(this._customStylesKey);
    if (customStyleNames) {
        customStyleNames = JSON.parse(customStyleNames);
        if (customStyleNames.indexOf(name) !== -1) {
            customStyleNames = customStyleNames.filter(function (styleName) {
                return styleName !== name;
            });
        }
    } else {
        customStyleNames = [];
    }
    customStyleNames.push(name);

    localStorage.setItem(
        this._customStylesKey,
        JSON.stringify(customStyleNames)
    );

    return new Promise(function (resolve, reject) {
        self._openDB()
            .then(function (db) {
                const transaction = db.transaction(
                    [self._storeName],
                    "readwrite"
                );
                const store = transaction.objectStore(self._storeName);

                const value = {
                    id: name,
                    content: data,
                    timestamp: new Date().getTime(),
                };

                const request = store.put(value, name);

                request.onsuccess = function () {
                    resolve(self._parseStyle(name, value));
                };
                request.onerror = function () {
                    reject(request.error);
                };

                transaction.oncomplete = function () {
                    db.close();
                };
            })
            .catch(reject);
    });
};

/**
 * Delete a custom style from the storage.
 * @param {string} name - The name of the style.
 * @returns {Promise<string>} - A promise that resolves with the name of the deleted style.
 */
CslStylesStorage.prototype.deleteStyle = function (name) {
    const self = this;
    return new Promise(function (resolve, reject) {
        self._openDB()
            .then(function (db) {
                const transaction = db.transaction(
                    [self._storeName],
                    "readwrite"
                );
                const store = transaction.objectStore(self._storeName);
                store.delete(name);
                transaction.oncomplete = function () {
                    resolve();
                };
                transaction.onerror = function () {
                    reject(transaction.error);
                };
            })
            .catch(function (err) {
                reject(err);
            });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            let customStyleNames = localStorage.getItem(self._customStylesKey);
            if (customStyleNames) {
                customStyleNames = JSON.parse(customStyleNames);
            } else {
                customStyleNames = [];
            }
            customStyleNames = customStyleNames.filter(function (styleName) {
                return styleName !== name;
            });
            localStorage.setItem(
                self._customStylesKey,
                JSON.stringify(customStyleNames)
            );
            resolve(name);
        });
    });
};
