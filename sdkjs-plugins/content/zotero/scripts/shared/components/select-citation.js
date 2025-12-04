// @ts-check

/// <reference path="../../types-global.js" />

/**
 * @param {string} displayNoneClass
 * @param {function(): void} fLoadMore
 * @param {function(HTMLElement): boolean} fShouldLoadMore
 */
function SelectCitationsComponent(
    displayNoneClass,
    fLoadMore,
    fShouldLoadMore
) {
    /** @type {Object<string|number, SearchResultItem>} */
    this._items = {};
    /** @type {Object<string|number, HTMLElement>} */
    this._html = {};
    /** @type {Object<string|number, HTMLInputElement>} */
    this._checks = {};

    this._cancelBtn = document.getElementById("cancelBtn");

    this._docsHolder = document.getElementById("docsHolder");
    this._docsThumb = document.getElementById("docsThumb");
    this._selectedWrapper = document.getElementById("selectedWrapper");
    this._selectedHolder = document.getElementById("selectedHolder");
    this._selectedInfo = document.getElementById("selectedInfo");
    this._selectedCount = document.getElementById("selectedCount");
    this._selectedThumb = document.getElementById("selectedThumb");

    if (this._selectedHolder && this._selectedThumb) {
        /** @type {Scroller} */
        this._selectedScroller = this._initScrollBox(
            this._selectedHolder,
            this._selectedThumb
        );
    }
    if (this._docsHolder && this._docsThumb) {
        /** @type {Scroller} */
        this._docsScroller = this._initScrollBox(
            this._docsHolder,
            this._docsThumb,
            this._checkDocsScroll.bind(this)
        );
    }
    /** @type {Function[]} */
    this._subscribers = [];
    this._displayNoneClass = displayNoneClass;
    this._fShouldLoadMore = fShouldLoadMore;
    this._fLoadMore = fLoadMore;
    /** @type {number} */
    this._loadTimeout;
    this._init();
}

SelectCitationsComponent.prototype._init = function () {
    const self = this;
    if (this._cancelBtn) {
        this._cancelBtn.onclick = function (e) {
            var ids = [];
            for (var id in self._items) {
                ids.push(id);
            }
            for (var i = 0; i < ids.length; i++) {
                self._removeSelected(ids[i]);
            }
        };
    }
};
SelectCitationsComponent.prototype.clearLibrary = function () {
    var holder = this._docsHolder;
    while (holder && holder.lastChild) {
        holder.removeChild(holder.lastChild);
    }
    if (holder) holder.scrollTop = 0;
    this._docsScroller.onscroll();
};

/**
 * @param {boolean} append
 * @param {SearchResult | null} res
 * @param {Error | null} err
 * @param {boolean} showNotFound
 * @param {boolean} first
 * @returns {Promise<boolean>}
 */
SelectCitationsComponent.prototype.displaySearchItems = function (
    append,
    res,
    err,
    showNotFound,
    first
) {
    const self = this;
    var holder = this._docsHolder;

    if (!append) {
        this.clearLibrary();
    }

    var page = document.createElement("div");
    if (holder) page.classList.add("page" + holder.children.length);

    return new Promise((resolve, reject) => {
        if (res && res.items && res.items.length > 0) {
            for (let index = 0; index < res.items.length; index++) {
                let item = res.items[index];
                page.appendChild(self._buildDocElement(item));
            }
        } else if (err || first) {
            if (err) {
                reject(err);
            } else if (showNotFound) {
                var notFound = document.createElement("div");
                notFound.textContent = translate("Nothing found");
                notFound.classList.add("searchInfo");
                page.appendChild(notFound);
            }
        }
        if (holder) holder.appendChild(page);

        this._docsScroller.onscroll();
        resolve(true);
    });
};

/** @returns {Object<string|number, SearchResultItem>} */
SelectCitationsComponent.prototype.getItems = function () {
    return this._items;
};

/**
 *
 * @param {Array<string|number>} keys
 */
SelectCitationsComponent.prototype.removeItems = function (keys) {
    const self = this;
    keys.forEach(function (key) {
        self._removeSelected(key);
    });
};

/**
 * @param {function(number): void} callback
 * @returns {Object}
 */
SelectCitationsComponent.prototype.subscribe = function (callback) {
    var self = this;
    this._subscribers.push(callback);

    return {
        unsubscribe: function () {
            self._subscribers = self._subscribers.filter(function (cb) {
                return cb !== callback;
            });
        },
    };
};

/**
 * @param {SearchResultItem} item
 * @returns {HTMLElement}
 */
SelectCitationsComponent.prototype._buildDocElement = function (item) {
    const self = this;
    var root = document.createElement("div");
    root.classList.add("doc");

    var checkHolder = document.createElement("div");
    var checkWrapper = document.createElement("div");
    checkWrapper.classList.add("checkbox");
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    if (this._items[item.id]) {
        check.checked = true;
        this._checks[item.id] = check;
    }
    checkWrapper.appendChild(check);
    checkWrapper.appendChild(document.createElement("span"));
    checkHolder.appendChild(checkWrapper);

    var docInfo = document.createElement("div");
    docInfo.classList.add("docInfo");

    var title = document.createElement("div");
    title.textContent = item.title;
    title.classList.add("truncate-text");
    docInfo.appendChild(title);

    if (item.author && item.author.length > 0) {
        var authors = document.createElement("div");
        authors.textContent = item.author
            .map(function (a) {
                return a.family + ", " + a.given;
            })
            .join("; ");
        authors.setAttribute("title", authors.textContent);
        authors.classList.add("secondary-text");
        authors.classList.add("truncate-text");
        authors.classList.add("nowrap");
        docInfo.appendChild(authors);
    }

    var source = document.createElement("div");
    if (item.publisher || item["publisher-place"]) {
        source.textContent = item.publisher || item["publisher-place"] || "";
    }
    if (item.issued && item.issued["date-parts"]) {
        var date = item.issued["date-parts"][0];
        if (source.textContent) {
            source.textContent += " (" + date.join("-") + ")";
        } else {
            source.textContent = date.join("-");
        }
    }
    source.setAttribute("title", source.textContent);
    source.classList.add("secondary-text");
    source.classList.add("truncate-text");
    source.classList.add("nowrap");
    docInfo.appendChild(source);

    root.appendChild(checkHolder);
    root.appendChild(docInfo);

    /**
     * @param {HTMLInputElement} input
     * @param {SearchResultItem} item
     * @returns
     */
    function selectItem(input, item) {
        return function () {
            input.checked = !input.checked;
            if (input.checked) {
                self._addSelected(item, input);
            } else {
                self._removeSelected(item.id);
            }
        };
    }

    var f = selectItem(check, item);
    checkWrapper.onclick = f;
    docInfo.onclick = f;

    return root;
};

/**
 * @param {SearchResultItem} item
 * @returns {HTMLElement}
 */
SelectCitationsComponent.prototype._buildSelectedElement = function (item) {
    const self = this;
    var root = document.createElement("div");
    root.classList.add("selDoc");

    var name = document.createElement("span");
    name.textContent = item.title;
    name.setAttribute("title", item.title);

    var year = document.createElement("span");
    if (item.issued && item.issued["date-parts"]) {
        year.textContent = item.issued["date-parts"][0].join("-");
    }

    var remove = document.createElement("span");
    remove.onclick = function () {
        self._removeSelected(item.id);
    };
    remove.textContent = "×";

    root.appendChild(name);
    root.appendChild(year);
    root.appendChild(remove);

    return root;
};

/**
 * @param {SearchResultItem} item
 * @param {HTMLInputElement} input
 */
SelectCitationsComponent.prototype._addSelected = function (item, input) {
    /** @type {HTMLElement} */
    var el = this._buildSelectedElement(item);
    this._items[item.id] = item;
    this._html[item.id] = el;
    this._checks[item.id] = input;
    if (this._selectedHolder) {
        this._selectedHolder.appendChild(el);
    }
    this._docsScroller.onscroll();
    this._selectedScroller.onscroll();
    this._checkSelected();
};

/**
 * @param {HTMLElement} holder - The element that contains the document list.
 * @param {HTMLElement} [thumb]
 */
SelectCitationsComponent.prototype._checkDocsScroll = function (holder, thumb) {
    const self = this;
    if (this._fShouldLoadMore(holder)) {
        if (this._loadTimeout) {
            clearTimeout(this._loadTimeout);
        }

        if (
            !lastSearch.obj &&
            !lastSearch.text.trim() &&
            !lastSearch.groups.length
        )
            return;

        this._loadTimeout = setTimeout(function () {
            if (self._fShouldLoadMore(holder)) {
                self._fLoadMore();
            }
        }, 500);
    }
};

/**
 * @param {HTMLElement} holder
 * @param {HTMLElement} thumb
 * @param {function(HTMLElement): void} [onscroll]
 * @returns {Scroller}
 */
SelectCitationsComponent.prototype._initScrollBox = function (
    holder,
    thumb,
    onscroll
) {
    var scroller = {};
    scroller.onscroll = this._checkScroll(holder, thumb, onscroll);

    holder.onwheel = function (e) {
        holder.scrollTop +=
            e.deltaY > 10 || e.deltaY < -10 ? e.deltaY : e.deltaY * 20;
        scroller.onscroll();
    };

    thumb.onmousedown = function (e) {
        thumb.classList.add("scrolling");
        var y = e.clientY;
        var initialPos = holder.scrollTop;

        window.onmouseup = function (e) {
            thumb.classList.remove("scrolling");
            window.onmouseup = null;
            window.onmousemove = null;
        };
        window.onmousemove = function (e) {
            var delta = e.clientY - y;

            var percMoved = delta / holder.clientHeight;
            var deltaScroll = holder.scrollHeight * percMoved;
            holder.scrollTop = initialPos + deltaScroll;

            scroller.onscroll();
        };
    };

    document.body.addEventListener("resize", function () {
        scroller.onscroll();
    });

    return scroller;
};

/**
 * @param {HTMLElement} holder
 * @param {HTMLElement} thumb
 * @param {function} [func] - an optional function to be called with the holder and thumb as arguments.
 * @returns {function} - a function that checks the scroll state and updates the thumb accordingly.
 * */
SelectCitationsComponent.prototype._checkScroll = function (
    holder,
    thumb,
    func
) {
    const displayNoneClass = this._displayNoneClass;
    return function () {
        if (holder.scrollHeight <= holder.clientHeight) {
            thumb.classList.add(displayNoneClass);
        } else {
            thumb.classList.remove(displayNoneClass);
            var height =
                (holder.clientHeight / holder.scrollHeight) *
                holder.clientHeight;
            height = height < 40 ? 40 : height;
            thumb.style.height = height + "px";

            var scroll = holder.scrollHeight - holder.clientHeight;
            var percScrolled = holder.scrollTop / scroll;

            var margin = percScrolled * (holder.clientHeight - height);
            thumb.style.marginTop = margin + "px";
        }

        if (func) func(holder, thumb);
    };
};

/** @param {string|number} id */
SelectCitationsComponent.prototype._removeSelected = function (id) {
    var el = this._html[id];
    delete this._items[id];
    delete this._html[id];
    if (this._checks[id]) {
        this._checks[id].checked = false;
        delete this._checks[id];
    }
    if (this._selectedHolder) {
        this._selectedHolder.removeChild(el);
    }
    this._docsScroller.onscroll();
    this._selectedScroller.onscroll();
    this._checkSelected();
};

SelectCitationsComponent.prototype._checkSelected = function () {
    const numOfSelected = this._count();
    if (!this._selectedInfo || !this._selectedCount) {
        return;
    }
    if (numOfSelected <= 0) {
        this._selectedInfo.classList.add(this._displayNoneClass);
    } else {
        this._selectedInfo.classList.remove(this._displayNoneClass);
        this._selectedCount.textContent =
            numOfSelected + " " + translate("selected");
    }
    this._subscribers.forEach(function (cb) {
        cb(numOfSelected);
    });
};

SelectCitationsComponent.prototype._count = function () {
    var k = 0;
    for (var i in this._items) k++;
    return k;
};
