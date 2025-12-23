/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

// @ts-check

/// <reference path="../../types-global.js" />
/// <reference path="../../zotero/types.js" />

import { translate } from "../../services";
import { Checkbox, InputField, SelectBox } from "../components";

/**
 * @typedef {Object} Scroller
 * @property {Function} onscroll
 */

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
    this._displayNoneClass = displayNoneClass;
    /** @type {Object<string|number, SearchResultItem>} */
    this._items = {};
    /** @type {Object<string|number, HTMLElement>} */
    this._html = {};
    /** @type {Object<string|number, Checkbox>} */
    this._checks = {};

    this._LOCATOR_VALUES = [
        ["appendix", "Appendix"],
        ["article", "Article"],
        ["book", "Book"],
        ["chapter", "Chapter"],
        ["column", "Column"],
        ["figure", "Figure"],
        ["folio", "Folio"],
        ["issue", "Issue"],
        ["line", "Line"],
        ["note", "Note"],
        ["opus", "Opus"],
        ["page", "Page"],
        ["paragraph", "Paragraph"],
        ["part", "Part"],
        ["rule", "Rule"],
        ["section", "Section"],
        ["sub-verbo", "Sub verbo"],
        ["table", "Table"],
        ["title", "Title"],
        ["verses", "Verses"],
        ["volume", "Volume"],
    ];

    this._cancelSelectBtn = document.getElementById("cancelSelectBtn");

    this._docsHolder = document.getElementById("docsHolder");
    this._nothingFound = document.getElementById("nothingFound");
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
            this._selectedThumb,
            20
        );
    }
    if (this._docsHolder && this._docsThumb) {
        /** @type {Scroller} */
        this._docsScroller = this._initScrollBox(
            this._docsHolder,
            this._docsThumb,
            40,
            this._checkDocsScroll.bind(this)
        );
    }
    /** @type {Function[]} */
    this._subscribers = [];
    this._fShouldLoadMore = fShouldLoadMore;
    this._fLoadMore = fLoadMore;
    /** @type {number} */
    this._loadTimeout;
    this._init();
}

SelectCitationsComponent.prototype._init = function () {
    const self = this;
    if (this._cancelSelectBtn) {
        this._cancelSelectBtn.onclick = function (e) {
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
    this._nothingFound &&
        this._nothingFound.classList.add(this._displayNoneClass);
    var holder = this._docsHolder;
    while (holder && holder.lastChild) {
        holder.removeChild(holder.lastChild);
    }
    if (holder) holder.scrollTop = 0;
    this._docsScroller.onscroll();
};

SelectCitationsComponent.prototype.displayNothingFound = function () {
    this.clearLibrary();
    this._nothingFound &&
        this._nothingFound.classList.remove(this._displayNoneClass);
};

/**
 * @param {SearchResult | null} res
 * @param {Error | null} err
 * @returns {Promise<number>}
 */
SelectCitationsComponent.prototype.displaySearchItems = function (res, err) {
    const self = this;
    var holder = this._docsHolder;

    let numOfShown = 0;

    return new Promise((resolve, reject) => {
        if (res && res.items && res.items.length > 0) {
            const page = document.createElement("div");
            if (holder) page.classList.add("page" + holder.children.length);
            for (let index = 0; index < res.items.length; index++) {
                let item = res.items[index];
                page.appendChild(self._buildDocElement(item));
                numOfShown++;
            }
            if (holder) holder.appendChild(page);
        } else if (err) {
            reject(err);
        }

        this._docsScroller.onscroll();
        resolve(numOfShown);
    });
};

/** @returns {Object<string|number, SearchResultItem>} */
SelectCitationsComponent.prototype.getSelectedItems = function () {
    const items = Object.assign({}, this._items || {});
    return items;
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
    var docInfo = document.createElement("div");
    docInfo.classList.add("docInfo");

    var checkHolder = document.createElement("div");

    let label = "";
    if (item.author && item.author.length > 0) {
        label = item.author
            .map(function (a) {
                if (a.family && a.given) {
                    return a.family.trim() + ", " + a.given.trim();
                } else if (a.family) {
                    return a.family.trim();
                } else if (a.given) {
                    return a.given.trim();
                }
                return "";
            })
            .join("; ");
    }
    const arrow = document.createElement("div");
    arrow.classList.add("selectbox-arrow");
    arrow.innerHTML =
        '<svg width="6" height="6" viewBox="0 0 6 6" ' +
        'fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" clip-rule="evenodd"' +
        ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75' +
        ' 2.24889L3 4.49724L5.25 2.24889L3 0.00053797Z" ' +
        'fill="currentColor"/></svg>';

    var title = document.createElement("div");
    title.textContent = item.title.trim();
    title.classList.add("truncate-text");
    title.classList.add("secondary-text");

    if (item.publisher || item["publisher-place"]) {
        title.textContent +=
            " · " + (item.publisher || item["publisher-place"] || "");
    }
    if (item.issued && item.issued["date-parts"]) {
        var date = item.issued["date-parts"][0];
        if (label.length > 20) {
            title.textContent += " (" + date.join("-") + ")";
        } else {
            if (
                label.length > 0 &&
                label.slice(-1) !== "." &&
                label.slice(-1) !== ","
            )
                label += ".";
            label += " " + date.join("-");
        }
    }
    if (label.length === 0) {
        label = title.textContent;
    }
    title.setAttribute("title", title.textContent);
    docInfo.appendChild(title);

    const check = document.createElement("input");

    checkHolder.appendChild(check);
    const checkInput = new Checkbox(check, {
        checked: !!this._items[item.id],
        label: label,
        title: true,
        id: item.id,
    });
    if (this._items[item.id]) {
        this._checks[item.id] = checkInput;
    }

    checkHolder.appendChild(arrow);
    root.appendChild(checkHolder);
    root.appendChild(docInfo);

    /** @type {DocumentFragment} */
    let params;

    function toggleItem() {
        root.classList.toggle("doc-open");
        if (!params) {
            params = self._buildCitationParams(item);
            root.appendChild(params);
        }
    }

    arrow.onclick = toggleItem;
    checkInput.subscribe(function (event) {
        if (event.type !== "checkbox:change") {
            return;
        }
        if (event.detail.checked) {
            self._addSelected(item, checkInput);
        } else {
            self._removeSelected(item.id);
        }
    });

    return root;
};

/**
 * @param {SearchResultItem} item
 * @returns {DocumentFragment}
 */
SelectCitationsComponent.prototype._buildCitationParams = function (item) {
    const locatorLabel = localStorage.getItem("selectedLocator") || "page";
    item.label = locatorLabel;

    const params = document.createDocumentFragment();
    const prefixSuffixContainer = document.createElement("div");
    const prefix = document.createElement("input");
    const suffix = document.createElement("input");
    const locatorContainer = document.createElement("div");
    const locatorSelect = document.createElement("div");
    const locator = document.createElement("input");
    const omitAuthorContainer = document.createElement("div");
    const omitAuthor = document.createElement("input");

    params.appendChild(prefixSuffixContainer);
    prefixSuffixContainer.appendChild(prefix);
    prefixSuffixContainer.appendChild(suffix);

    params.appendChild(locatorContainer);
    locatorContainer.appendChild(locatorSelect);
    locatorContainer.appendChild(locator);
    let locatorPlaceholder = "";

    params.appendChild(omitAuthorContainer);
    omitAuthorContainer.appendChild(omitAuthor);

    const prefixInput = new InputField(prefix, {
        type: "text",
        placeholder: "Prefix",
    });
    const suffixInput = new InputField(suffix, {
        type: "text",
        placeholder: "Suffix",
    });
    const locatorSelectbox = new SelectBox(locatorSelect, {
        placeholder: "Locator",
    });
    this._LOCATOR_VALUES.forEach(function (info) {
        const selected = info[0] === locatorLabel;
        locatorSelectbox.addItem(info[0], info[1], selected);
        if (selected) {
            locatorPlaceholder = info[1];
        }
    });
    const locatorInput = new InputField(locator, {
        type: "text",
        placeholder: locatorPlaceholder,
    });
    const omitAuthorInput = new Checkbox(omitAuthor, {
        label: "Omit author",
    });

    prefixInput.subscribe(function (event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.prefix = event.detail.value;
    });
    suffixInput.subscribe(function (event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.suffix = event.detail.value;
    });
    locatorInput.subscribe(function (event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.locator = event.detail.value;
    });

    locatorSelectbox.subscribe(function (event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        if (!event.detail.items) {
            return;
        }
        const eventItem = event.detail.items[0];
        locatorInput.setPlaceholder(eventItem.text);
        item.label = event.detail.values[0].toString();
        localStorage.setItem("selectedLocator", item.label);
    });
    omitAuthorInput.subscribe(function (event) {
        if (event.type !== "checkbox:change") {
            return;
        }
        item["suppress-author"] = event.detail.checked;
    });

    return params;
};

/**
 * @param {SearchResultItem} item
 * @returns {HTMLElement}
 */
SelectCitationsComponent.prototype._buildSelectedElement = function (item) {
    const self = this;
    var root = document.createElement("div");
    root.classList.add("selDoc");

    const span = document.createElement("span");
    if (item.author && item.author.length > 0) {
        span.textContent = item.author
            .map(function (a) {
                return a.family + ", " + a.given;
            })
            .join("; ");
    } else {
        span.textContent = item.title;
    }

    if (item.issued && item.issued["date-parts"]) {
        span.textContent += " " + item.issued["date-parts"][0].join("-");
    }
    span.setAttribute("title", span.textContent);
    root.appendChild(span);

    var remove = document.createElement("span");
    remove.onclick = function () {
        self._removeSelected(item.id);
    };
    remove.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829' +
        " 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275" +
        " 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443" +
        " 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162" +
        ' 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z"' +
        ' fill="currentColor" fill-opacity="0.8"/></svg>';
    root.appendChild(remove);

    return root;
};

/**
 * @param {SearchResultItem} item
 * @param {Checkbox} checkbox
 */
SelectCitationsComponent.prototype._addSelected = function (item, checkbox) {
    /** @type {HTMLElement} */
    var el = this._buildSelectedElement(item);
    this._items[item.id] = item;
    this._html[item.id] = el;
    this._checks[item.id] = checkbox;
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
 * @param {number} minThumbHeight
 * @param {function(HTMLElement): void} [onscroll]
 * @returns {Scroller}
 */
SelectCitationsComponent.prototype._initScrollBox = function (
    holder,
    thumb,
    minThumbHeight,
    onscroll
) {
    var scroller = {};
    scroller.onscroll = this._checkScroll(
        holder,
        thumb,
        minThumbHeight,
        onscroll
    );

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
 * @param {number} minThumbHeight
 * @param {function} [func] - an optional function to be called with the holder and thumb as arguments.
 * @returns {function} - a function that checks the scroll state and updates the thumb accordingly.
 * */
SelectCitationsComponent.prototype._checkScroll = function (
    holder,
    thumb,
    minThumbHeight,
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
            height = height < minThumbHeight ? minThumbHeight : height;
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
    if (this._selectedHolder) {
        this._selectedHolder.removeChild(el);
    }

    delete this._items[id];
    delete this._html[id];
    if (this._checks[id]) {
        this._checks[id].uncheck(true);
        delete this._checks[id];
    }

    this._docsScroller.onscroll();
    this._selectedScroller.onscroll();
    this._checkSelected();
};

SelectCitationsComponent.prototype._checkSelected = function () {
    const numOfSelected = this.count();
    if (!this._selectedInfo || !this._selectedCount || !this._selectedWrapper) {
        return;
    }
    if (numOfSelected <= 0) {
        this._selectedWrapper.classList.add(this._displayNoneClass);
        this._selectedInfo.classList.add(this._displayNoneClass);
    } else {
        this._selectedWrapper.classList.remove(this._displayNoneClass);
        this._selectedInfo.classList.remove(this._displayNoneClass);
        this._selectedCount.textContent =
            numOfSelected + " " + translate("selected");
    }
    this._subscribers.forEach(function (cb) {
        cb(numOfSelected);
    });
};

SelectCitationsComponent.prototype.count = function () {
    var k = 0;
    for (var i in this._items) k++;
    return k;
};

export { SelectCitationsComponent };
