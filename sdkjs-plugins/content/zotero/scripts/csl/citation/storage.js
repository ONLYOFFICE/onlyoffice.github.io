var CSLCitationStorage = {
    /** @type {Array<CSLCitationItem>} */
    _items: [],
    /** @type {Array<string>} */
    _ids: [],
    size: 0,
    /** @returns {CSLCitationItem} */
    get: function (id) {
        id = id.toString();
        var id = this._ids.indexOf(id);
        if (id >= 0) return this._items[id];
        return null;
    },
    getIndex: function (id) {
        id = id.toString();
        return this._ids.indexOf(id);
    },
    clear: function () {
        this._items = [];
        this._ids = [];
        this.size = 0;
    },
    delete: function (id) {
        id = id.toString();
        const index = this._ids.indexOf(id);
        if (index >= 0) {
            this._items.splice(index, 1);
            this._ids.splice(index, 1);
            this.size--;
        }
    },
    forEach: function (callback) {
        for (var i = 0; i < this.size; i++) {
            callback(this._items[i], this._ids[i], this);
        }
    },
    has: function (id) {
        id = id.toString();
        return this._ids.indexOf(id) >= 0;
    },
    set: function (id, item) {
        id = id.toString();
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
