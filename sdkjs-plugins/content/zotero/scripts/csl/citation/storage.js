// @ts-check
/// <reference path="./citation-item.js" />

const CSLCitationStorage = {
    /** @type {Array<CitationItem>} */
    _items: [],
    /** @type {Array<string>} */
    _ids: [],
    size: 0,
    /** @returns {CitationItem} */
    /**
     * @param {string|number} id
     * @returns {CitationItem|null}
     **/
    get: function (id) {
        id = id.toString();
        const index = this._ids.indexOf(id);
        if (index >= 0) return this._items[index];
        return null;
    },
    /**
     * 
     * @param {string|number} id 
     * @returns {number}
     */
    getIndex: function (id) {
        id = id.toString();
        return this._ids.indexOf(id);
    },
    clear: function () {
        this._items = [];
        this._ids = [];
        this.size = 0;
        return this;
    },
    /**
     * @param {string|number} id 
     * @returns {CSLCitationStorage}
     */
    delete: function (id) {
        id = id.toString();
        const index = this._ids.indexOf(id);
        if (index >= 0) {
            this._items.splice(index, 1);
            this._ids.splice(index, 1);
            this.size--;
        }
        return this;
    },
    /**
     * @param {function(CitationItem, string, CSLCitationStorage?)} callback 
     */
    forEach: function (callback) {
        for (var i = 0; i < this.size; i++) {
            callback(this._items[i], this._ids[i], this);
        }
    },
    /**
     * @param {string|number} id 
     * @returns {boolean}
     */
    has: function (id) {
        id = id.toString();
        return this._ids.indexOf(id) >= 0;
    },
    /**
     * @param {string|number} id 
     * @param {CitationItem} item 
     * @returns {CSLCitationStorage}
     */
    set: function (id, item) {
        id = id.toString();
        const index = this._ids.indexOf(id);
        if (index >= 0) {
            this._items[index] = item;
            return this;
        }
        this._items.push(item);
        this._ids.push(id);
        this.size++;
        return this;
    },
};
