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
    let customStyleNames = localStorage.getItem(self._customStylesKey);
    if (customStyleNames) {
        customStyleNames = JSON.parse(customStyleNames);
    } else {
        customStyleNames = [];
    }
    return customStyleNames;
};

CslStylesStorage.prototype.getStyles = function () {
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
            this.getStyle(customStyleNames[i])
                .then(function (style) {
                    styles.push(style);
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

CslStylesStorage.prototype.setStyle = function (name, jsonData) {
    const self = this;
    let customStyleNames = localStorage.getItem(self._customStylesKey);
    if (customStyleNames) {
        customStyleNames = JSON.parse(customStyleNames);
    } else {
        customStyleNames = [];
    }
    customStyleNames.push(jsonData.name);
    localStorage.setItem(
        self._customStylesKey,
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
                const request = store.put(jsonData, name);

                request.onsuccess = function () {
                    resolve();
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

CslStylesStorage.prototype.deleteStyle = function (name) {
    const self = this;
    return new Promise(function (resolve, reject) {
        const self = this;
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
