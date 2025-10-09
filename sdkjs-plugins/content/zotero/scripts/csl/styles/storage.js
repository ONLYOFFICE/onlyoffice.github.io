// @ts-check

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
        // @ts-ignore for IE11
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
            /** @type {IDBDatabase} */
            // @ts-ignore
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
        return JSON.parse(customStyleNames);
    } else {
        return [];
    }
};

/**
 * @param {string} name
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
 * Returns a list of custom styles.
 * @returns {Promise<Array<StyleInfo>>}
 */
CslStylesStorage.prototype.getStylesInfo = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        const customStyleNamesString = localStorage.getItem(
            self._customStylesKey
        );
        /** @type {Array<string>} */
        let customStyleNames = [];
        if (customStyleNamesString) {
            customStyleNames = JSON.parse(customStyleNamesString);
        }

        /** @type {Array<StyleInfo>} */
        let styles = [];

        if (customStyleNames.length === 0) {
            resolve(styles);
        }

        for (let i = 0; i < customStyleNames.length; i++) {
            self.getStyle(customStyleNames[i])
                .then(function (style) {
                    /** @type {StyleInfo} */
                    const result = CslStylesParser.getStyleInfo(
                        customStyleNames[i],
                        style
                    );
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
 * Add a custom style to the storage.
 * @param {string} name - The name of the style.
 * @param {string} data - The content of the style.
 * @returns {Promise<StyleInfo>}
 */
CslStylesStorage.prototype.setStyle = function (name, data) {
    const self = this;
    let customStyleNamesString = localStorage.getItem(this._customStylesKey);
    /** @type {Array<string>} */
    let customStyleNames = [];
    if (customStyleNamesString) {
        customStyleNames = JSON.parse(customStyleNamesString);
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
                    resolve(CslStylesParser.getStyleInfo(name, value));
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
                    resolve(name);
                };
                transaction.onerror = function () {
                    reject(transaction.error);
                };
            })
            .catch(function (err) {
                reject(err);
            });
    }).then(function (name) {
        const customStyleNamesString = localStorage.getItem(
            self._customStylesKey
        );
        /** @type {Array<string>} */
        let customStyleNames = [];
        if (customStyleNamesString) {
            customStyleNames = JSON.parse(customStyleNamesString);
        }
        customStyleNames = customStyleNames.filter(function (styleName) {
            return styleName !== name;
        });
        localStorage.setItem(
            self._customStylesKey,
            JSON.stringify(customStyleNames)
        );
        return name;
    });
};
