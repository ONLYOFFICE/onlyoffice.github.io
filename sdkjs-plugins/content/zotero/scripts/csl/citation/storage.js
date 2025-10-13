var CSLCitationStorage = {
    /** @type {Array<CSLCitation>} */
    _items: [],
    /** @type {Array<string>} */
    _ids: [],
    size: 0,
    /** @returns {CSLCitation} */
    get: function (id) {
        var id = this._ids.indexOf(id);
        if (id >= 0) return this._items[id];
        return null;
    },
    clear: function () {
        this._items = [];
        this._ids = [];
        this.size = 0;
    },
    delete: function (id) {
        var id = this._ids.indexOf(id);
        if (id >= 0) {
            this._items.splice(id, 1);
            this._ids.splice(id, 1);
            this.size--;
        }
    },
    forEach: function (callback) {
        for (var i = 0; i < this.size; i++) {
            callback(this._items[i], this._ids[i], this);
        }
    },
    has: function (id) {
        return this._ids.indexOf(id) >= 0;
    },
    set: function (id, item) {
        var index = this._ids.indexOf(id);
        if (index >= 0) {
            this._items[index] = item;
            return;
        }
        this._items.push(item);
        this._ids.push(id);
        this.size++;
    },
};
