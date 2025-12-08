// @ts-check

/// <reference path="../../services/translate-service.js" />
/// <reference path="../../types-global.js" />
/// <reference path="../ui/input.js" />
/// <reference path="../ui/selectbox.js" />
/// <reference path="../ui/button.js" />

function SearchFilterComponents() {
    this._searchField = new InputField("searchField", {
        type: "text",
        autofocus: true,
        showClear: true,
    });
    this._filterButton = new Button("filterButton", {
        variant: "secondary-icon",
        size: "small",
    });
    this._librarySelectList = new SelectBox("librarySelectList", {
        // TODO: add translation
        placeholder: translate("No items selected"),
        multiple: true,
    });
    /** @type {Function[]} */
    this._subscribers = [];

    this._addEventListeners();
}

SearchFilterComponents.prototype._addEventListeners = function () {
    const self = this;
    this._searchField.subscribe(function (e) {
        if (e.type === "inputfield:blur" || e.type === "inputfield:submit") {
            const selectedGroups = self._getSelectedGroups();
            self._subscribers.forEach(function (cb) {
                cb(e.detail.value, selectedGroups);
            });
        }
    });
    this._filterButton.subscribe(function (e) {
        if (e.type === "button:click") {
            if (!self._librarySelectList.isOpen) {
                if (e.detail.originalEvent) {
                    e.detail.originalEvent.stopPropagation();
                }
                self._librarySelectList.openDropdown();
            }
        }
    });
};

/**
 * @param {Array<UserGroupInfo>} groups
 */
SearchFilterComponents.prototype.addGroups = function (groups) {
    const self = this;
    const savedGroups = localStorage.getItem("selectedGroups");
    /** @type {Array<string>} */
    let selectedItems = savedGroups
        ? JSON.parse(savedGroups).map(function (
              /** @type {string|number}*/ id
          ) {
              return id.toString();
          })
        : ["my_library", "group_libraries"];
    let hasSelected = false;
    groups.forEach(function (group) {
        group.id = String(group.id);
    });

    const customGroups = [
        { id: "my_library", name: translate("My Library") },
        {
            id: "group_libraries",
            name: translate("Group Libraries"),
        },
    ];
    !hasSelected &&
        customGroups.forEach(function (group) {
            if (selectedItems.indexOf(group.id) !== -1) {
                hasSelected = true;
            }
        });
    !hasSelected &&
        groups.forEach(function (group) {
            if (selectedItems.indexOf(group.id.toString()) !== -1) {
                hasSelected = true;
            }
        });
    if (!hasSelected) {
        // if local storage data is invalid, select both My Library and Group Libraries
        selectedItems = ["my_library", "group_libraries"];
    }

    /**
     * @param {string|number} id
     * @param {string} name
     * @param {boolean} selected
     */
    const addGroupToSelectBox = function (id, name, selected) {
        if (typeof id === "number") {
            id = id.toString();
        }
        if (self._librarySelectList instanceof SelectBox)
            self._librarySelectList.addItem(id, name, selected);
    };

    for (var i = 0; i < customGroups.length; i++) {
        const id = customGroups[i].id;
        const name = customGroups[i].name;
        addGroupToSelectBox(id, name, selectedItems.indexOf(id) !== -1);
    }

    if (groups.length === 0) {
        return;
    }
    this._librarySelectList.addSeparator();
    let selected = selectedItems.indexOf("group_libraries") !== -1;
    for (var i = 0; i < groups.length; i++) {
        const id = groups[i].id;
        const name = groups[i].name;
        addGroupToSelectBox(
            id,
            name,
            selected || selectedItems.indexOf(id.toString()) !== -1
        );
    }
    this._selectedGroupsWatcher(customGroups, groups);
};

/**
 * @return {Array<string|"my_library"|"group_libraries">}
 */
SearchFilterComponents.prototype._getSelectedGroups = function () {
    const self = this;
    const ids = this._librarySelectList.getSelectedValues();
    if (Array.isArray(ids) === false || ids.length === 0) {
        setTimeout(function () {
            self._librarySelectList.openDropdown();
        }, 500);
    }
    if (ids === null || typeof ids === "string") {
        return [];
    }
    return ids;
};

/**
 * @param {function(string, Array<string|"my_library"|"group_libraries">): void} callback
 * @returns {Object}
 */
SearchFilterComponents.prototype.subscribe = function (callback) {
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
 * @param {Array<{id: string, name: string}>} customGroups
 * @param {Array<UserGroupInfo>} groups
 * @returns
 */
SearchFilterComponents.prototype._selectedGroupsWatcher = function (
    customGroups,
    groups
) {
    const self = this;
    if (this._librarySelectList instanceof SelectBox === false) {
        return;
    }
    this._librarySelectList.subscribe(function (event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        /** @type {Array<string|number>} */
        let aGroupsToSave = [];
        const values = event.detail.values;
        const current = event.detail.current;
        const bEnabled = event.detail.enabled;
        const customIds = customGroups.map(function (group) {
            return group.id;
        });
        /** @type {Array<string>} */
        let ids = groups.map(function (group) {
            return group.id.toString();
        });

        let bWasCustom = customIds.indexOf(String(current)) !== -1;

        if (bWasCustom) {
            if (current === "group_libraries") {
                if (bEnabled) {
                    aGroupsToSave.push("group_libraries");
                    self._librarySelectList.selectItems(ids, true);
                } else {
                    self._librarySelectList.unselectItems(ids, true);
                }
                if (values.indexOf("my_library") !== -1) {
                    aGroupsToSave.push("my_library");
                }
            } else {
                if (values.indexOf("group_libraries") !== -1) {
                    aGroupsToSave.push("group_libraries");
                    if (bEnabled) {
                        aGroupsToSave.push(current);
                    }
                } else {
                    aGroupsToSave = values.slice();
                }
            }
        } else if (!bWasCustom) {
            let bAllGroupsSelected = ids.every(function (id) {
                return values.indexOf(id) !== -1;
            });
            if (bAllGroupsSelected) {
                self._librarySelectList.selectItems("group_libraries", true);
                aGroupsToSave.push("group_libraries");
                if (values.indexOf("my_library") !== -1) {
                    aGroupsToSave.push("my_library");
                }
            } else {
                self._librarySelectList.unselectItems("group_libraries", true);
                aGroupsToSave = values.filter(function (value) {
                    return value !== "group_libraries";
                });
            }
        }
        if (aGroupsToSave.length === 0) {
            localStorage.removeItem("selectedGroups");
        } else {
            localStorage.setItem(
                "selectedGroups",
                JSON.stringify(aGroupsToSave)
            );
        }
    });
};
