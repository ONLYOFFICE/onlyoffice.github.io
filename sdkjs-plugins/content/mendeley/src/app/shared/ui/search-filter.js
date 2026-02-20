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

import { Button, SelectBox, InputField } from "../components";
import { translate } from "../../services";

function SearchFilterComponents() {
    this._searchField = new InputField("searchField", {
        type: "text",
        autofocus: true,
        showClear: false,
    });
    this._filterButton = new Button("filterButton", {
        variant: "secondary-icon",
        size: "small",
        disabled: true
    });
    this._librarySelectList = new SelectBox("librarySelectList", {
        // TODO: add translation
        placeholder: translate("No items selected"),
        multiple: true,
        description: translate("Search in:"),
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
        : ["all_collections"];
    let hasSelected = false;
    groups.forEach(function (group) {
        group.id = String(group.id);
    });

    const customGroups = [
        {
            id: "all_collections",
            name: translate("All collections"),
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
        // if local storage data is invalid, select All collections
        selectedItems = ["all_collections"];
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
    let selected = selectedItems.indexOf("all_collections") !== -1;
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
 * @return {Array<string|"all_collections">}
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
 * @param {function(string, Array<string|"all_collections">): void} callback
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
            if (current === "all_collections") {
                if (bEnabled) {
                    aGroupsToSave.push("all_collections");
                    self._librarySelectList.selectItems(ids, true);
                } else {
                    self._librarySelectList.unselectItems(ids, true);
                }
            } else {
                if (values.indexOf("all_collections") !== -1) {
                    aGroupsToSave.push("all_collections");
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
                self._librarySelectList.selectItems("all_collections", true);
                aGroupsToSave.push("all_collections");
            } else {
                self._librarySelectList.unselectItems("all_collections", true);
                aGroupsToSave = values.filter(function (value) {
                    return value !== "all_collections";
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

export { SearchFilterComponents };
