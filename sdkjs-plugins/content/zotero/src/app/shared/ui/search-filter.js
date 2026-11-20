/*
 * (c) Copyright Ascensio System SIA 2010-2026
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

import { Button, TreeSelectBox, InputField } from "../components";
import { translate } from "../../services";

const MY_LIBRARY = "my_library";
const GROUP_LIBRARIES = "group_libraries";
/**
 * The checked nodes of the library filter: "my_library", "group_libraries",
 * group ids and "<library>:<collection key>", where the library is
 * "my_library" or a group id.
 */
const STORAGE_KEY = "selectedGroups";

/**
 * The search field and the filter of where to search: the libraries and
 * their collections, as a tree. A checked node is searched whole, an
 * indeterminate one only in its checked descendants.
 * @param {function(string|null): Promise<Array<ZoteroCollection>>} loadCollections
 *  - the collections of a group library, or of the user library for null
 */
function SearchFilterComponents(loadCollections) {
    const self = this;
    this._loadCollections = loadCollections;
    this._searchField = new InputField("searchField", {
        type: "text",
        autofocus: true,
        showClear: false,
    });
    this._filterButton = new Button("filterButton", {
        variant: "secondary-icon",
        size: "small",
    });
    this._librarySelectList = new TreeSelectBox("librarySelectList", {
        // TODO: add translation
        placeholder: translate("No items selected"),
        description: translate("Search in:"),
        loadingText: translate("Loading..."),
        loadChildren: function (id) {
            return self._loadLibraryCollections(id);
        },
    });
    /**
     * Settles once the saved selection is restored, which may wait for the
     * collections of some libraries.
     * @type {Promise<void>}
     */
    this._ready = Promise.resolve();
    this._restoreGeneration = 0;
    /** @type {Function[]} */
    this._subscribers = [];

    this._addEventListeners();
}

SearchFilterComponents.prototype._addEventListeners = function () {
    const self = this;
    this._searchField.subscribe(function (e) {
        if (e.type === "inputfield:blur" || e.type === "inputfield:submit") {
            const text = e.detail.value;
            self.getScope().then(function (scope) {
                if (scope.length === 0) {
                    setTimeout(function () {
                        self._librarySelectList.openDropdown();
                    }, 500);
                }
                self._subscribers.forEach(function (cb) {
                    cb(text, scope);
                });
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
    this._librarySelectList.subscribe(function (event) {
        if (event.type === "treeselect:change") {
            self._saveSelection();
        }
    });
};

SearchFilterComponents.prototype.clearGroups = function () {
    this._restoreGeneration++;
    this._librarySelectList.setNodes([]);
};

/**
 * Shows the user library and the given groups, each with its collections
 * loaded when opened, and checks what was checked last time.
 * @param {Array<UserGroupInfo>} groups
 */
SearchFilterComponents.prototype.addGroups = function (groups) {
    /** @type {Array<CheckTreeNodeSpec>} */
    const specs = [
        {
            id: MY_LIBRARY,
            text: translate("My Library"),
            lazy: true,
            data: { groupId: null },
        },
    ];
    if (groups.length) {
        specs.push({
            id: GROUP_LIBRARIES,
            text: translate("Group Libraries"),
            children: groups.map(function (group) {
                return {
                    id: String(group.id),
                    text: group.name,
                    lazy: true,
                    data: { groupId: String(group.id) },
                };
            }),
        });
    }
    this._librarySelectList.setNodes(specs);
    this._restoreSelection();
};

/**
 * Where to search, by library: the user library first, then the groups in
 * the order of the filter.
 * @returns {Promise<Array<LibraryScope>>}
 */
SearchFilterComponents.prototype.getScope = function () {
    const self = this;
    return this._ready.then(function () {
        return self._buildScope();
    });
};

/**
 * @param {function(string, Array<LibraryScope>): void} callback
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

/** @returns {Array<LibraryScope>} */
SearchFilterComponents.prototype._buildScope = function () {
    const list = this._librarySelectList;
    /** @type {Array<CheckTreeNode>} */
    const libraries = [];
    const myLibrary = list.getNode(MY_LIBRARY);
    if (myLibrary) {
        libraries.push(myLibrary);
    }
    const groups = list.getNode(GROUP_LIBRARIES);
    if (groups && groups.children) {
        Array.prototype.push.apply(libraries, groups.children);
    }

    /** @type {Array<LibraryScope>} */
    const scope = [];
    libraries.forEach(function (library) {
        const state = list.getState(library.id);
        const groupId = library.data.groupId;
        if (state === "checked") {
            scope.push({ groupId: groupId, collections: null });
            return;
        }
        if (state !== "indeterminate") {
            return;
        }
        // The checked collections, the subcollections of a checked one
        // being checked too; an indeterminate collection is searched only
        // in them, not in the items right in it.
        /** @type {Array<string>} */
        const keys = [];
        /** @param {Array<CheckTreeNode>} nodes */
        const collect = function (nodes) {
            nodes.forEach(function (node) {
                if (
                    list.getState(node.id) === "checked" &&
                    node.data.numItems !== 0
                ) {
                    keys.push(node.data.key);
                }
                if (node.children) {
                    collect(node.children);
                }
            });
        };
        collect(library.children || []);
        if (keys.length) {
            scope.push({ groupId: groupId, collections: keys });
        }
    });
    return scope;
};

/**
 * Checks what was saved. A collection can be checked only once the
 * collections of its library are known, so those libraries load first.
 */
SearchFilterComponents.prototype._restoreSelection = function () {
    const self = this;
    const list = this._librarySelectList;
    const generation = ++this._restoreGeneration;
    const ids = this._getSavedIds();
    list.setCheckedIds(ids);

    /** @type {Array<string>} */
    const libraries = [];
    ids.forEach(function (id) {
        const separator = id.indexOf(":");
        if (separator === -1) {
            return;
        }
        const library = id.substring(0, separator);
        if (libraries.indexOf(library) === -1 && list.getNode(library)) {
            libraries.push(library);
        }
    });
    this._ready = Promise.all(
        libraries.map(function (library) {
            return list.load(library).catch(function (error) {
                console.error(
                    "Failed to load the collections of " + library + ":",
                    error
                );
            });
        })
    ).then(function () {
        // The groups were shown anew meanwhile.
        if (generation !== self._restoreGeneration) {
            return;
        }
        list.setCheckedIds(ids);
        if (list.getCheckedIds().length === 0) {
            // Nothing saved is there any more.
            list.setCheckedIds([MY_LIBRARY, GROUP_LIBRARIES]);
        }
    });
};

/** @returns {Array<string>} */
SearchFilterComponents.prototype._getSavedIds = function () {
    /** @type {any} */
    let saved = null;
    try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
        saved = null;
    }
    if (!Array.isArray(saved) || saved.length === 0) {
        return [MY_LIBRARY, GROUP_LIBRARIES];
    }
    return saved.map(function (/** @type {string|number} */ id) {
        return String(id);
    });
};

SearchFilterComponents.prototype._saveSelection = function () {
    const ids = this._librarySelectList.getCheckedIds();
    if (ids.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
};

/**
 * The collections of a library as tree nodes, sorted by name in each
 * branch as Zotero shows them.
 * @param {string} libraryId - the node id of the library
 * @returns {Promise<Array<CheckTreeNodeSpec>>}
 */
SearchFilterComponents.prototype._loadLibraryCollections = function (
    libraryId
) {
    const node = this._librarySelectList.getNode(libraryId);
    const groupId = node && node.data ? node.data.groupId : null;
    return this._loadCollections(groupId).then(function (collections) {
        /** @type {Map<string, CheckTreeNodeSpec & {children: Array<CheckTreeNodeSpec>}>} */
        const byKey = new Map();
        collections.forEach(function (collection) {
            byKey.set(collection.key, {
                id: libraryId + ":" + collection.key,
                text: collection.name,
                children: [],
                data: {
                    key: collection.key,
                    numItems: collection.numItems,
                },
            });
        });
        /** @type {Array<CheckTreeNodeSpec>} */
        const roots = [];
        collections.forEach(function (collection) {
            const spec = byKey.get(collection.key);
            const parent = collection.parentCollection
                ? byKey.get(collection.parentCollection)
                : null;
            if (spec) {
                (parent ? parent.children : roots).push(spec);
            }
        });
        /** @param {Array<CheckTreeNodeSpec>} specs */
        const sort = function (specs) {
            specs.sort(function (a, b) {
                return a.text.localeCompare(b.text, undefined, {
                    numeric: true,
                    sensitivity: "base",
                });
            });
            specs.forEach(function (spec) {
                if (spec.children) sort(spec.children);
            });
        };
        sort(roots);
        return roots;
    });
};

export { SearchFilterComponents };
