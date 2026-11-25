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

/// <reference path="./types.js" />

import { CheckTree } from "./check-tree.js";

/**
 * A drop-down of checkboxes arranged in a tree, styled as a multiple
 * SelectBox. A branch opens with its arrow; one whose children are not
 * known yet asks loadChildren for them. The marks follow CheckTree.
 */
class TreeSelectBox {
    /** Indent of one tree level, px. */
    static #INDENT = 16;

    static #MIN_LIST_HEIGHT = 157;
    static #WINDOW_MARGIN = 54;

    #tree = new CheckTree();
    /** @type {Set<string>} */
    #expanded = new Set();
    /** @type {Map<string, Promise<void>>} */
    #loading = new Map();
    /** @type {Array<function(TreeSelectBoxEventType): void>} */
    #subscribers = [];
    /** @type {TreeSelectBoxOptionsType} */
    #options;
    #container;
    #header = document.createElement("div");
    #selectedText = document.createElement("span");
    #arrow = document.createElement("span");
    #dropdown = document.createElement("div");
    #optionsContainer = document.createElement("div");

    #onOutsideClick = (/** @type {MouseEvent} */ e) => {
        if (
            !(e.target instanceof Node) ||
            !this.#container.contains(e.target)
        ) {
            this.closeDropdown();
        }
    };
    #onResize = () => {
        this.#fitHeight();
    };
    #onKeydown = (/** @type {KeyboardEvent} */ e) => {
        const key = e.key || e.keyCode;
        if (key === "Escape" || key === 27 || key === "Tab" || key === 9) {
            this.closeDropdown();
        }
    };

    /**
     * @param {string|HTMLElement} container
     * @param {TreeSelectBoxOptionsType} options
     */
    constructor(container, options) {
        const element =
            typeof container === "string"
                ? document.getElementById(container)
                : container;
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid container");
        }
        this.#container = element;
        this.#options = options;
        this.isOpen = false;
        this.#createDOM();
        this.#updateSelectedText();
    }

    /**
     * Replaces the tree. Branches stay open where their ids are still there.
     * @param {Array<CheckTreeNodeSpec>} specs
     */
    setNodes(specs) {
        this.#tree.setRoots(specs);
        this.#loading.clear();
        this.#expanded.forEach((id) => {
            if (!this.#tree.getNode(id)) {
                this.#expanded.delete(id);
            }
        });
        this.#refresh();
    }

    /**
     * @param {string} id
     * @returns {CheckTreeNode|null}
     */
    getNode(id) {
        return this.#tree.getNode(id);
    }

    /** @returns {Array<CheckTreeNode>} */
    getRoots() {
        return this.#tree.getRoots();
    }

    /**
     * @param {string} id
     * @returns {CheckState}
     */
    getState(id) {
        return this.#tree.getState(id);
    }

    /**
     * See CheckTree.getCheckedIds.
     * @returns {Array<string>}
     */
    getCheckedIds() {
        return this.#tree.getCheckedIds();
    }

    /**
     * Checks exactly the given nodes; no change event.
     * @param {Array<string>} ids
     */
    setCheckedIds(ids) {
        this.#tree.setCheckedIds(ids);
        this.#refresh();
    }

    /**
     * Makes sure the children of a lazy node are known, without opening it.
     * @param {string} id
     * @returns {Promise<void>} rejects if they could not be loaded
     */
    load(id) {
        const node = this.#tree.getNode(id);
        if (!node || node.children) {
            return Promise.resolve();
        }
        const pending = this.#loading.get(id);
        if (pending) {
            return pending;
        }
        if (!this.#options.loadChildren) {
            return Promise.resolve();
        }
        const loading = this.#options.loadChildren(id).then(
            (specs) => {
                // The tree may have been replaced meanwhile.
                if (this.#tree.getNode(id) === node) {
                    this.#tree.setChildren(id, specs);
                }
                this.#loading.delete(id);
                this.#refresh();
            },
            (error) => {
                this.#loading.delete(id);
                this.#expanded.delete(id);
                this.#refresh();
                throw error;
            }
        );
        this.#loading.set(id, loading);
        this.#refresh();
        return loading;
    }

    openDropdown() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        document.addEventListener("click", this.#onOutsideClick);
        window.addEventListener("resize", this.#onResize);
        this.#dropdown.style.display = "block";
        this.#arrow.classList.add("selectbox-arrow-open");
        this.#header.classList.add("selectbox-header-open");
        this.#render();
        this.#fitHeight();
    }

    closeDropdown() {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        document.removeEventListener("click", this.#onOutsideClick);
        window.removeEventListener("resize", this.#onResize);
        this.#dropdown.style.display = "none";
        this.#dropdown.classList.remove("selectbox-dropdown-top");
        this.#arrow.classList.remove("selectbox-arrow-open");
        this.#header.classList.remove("selectbox-header-open");
    }

    /**
     * @param {function(TreeSelectBoxEventType): void} callback
     * @returns {{unsubscribe: function(): void}}
     */
    subscribe(callback) {
        this.#subscribers.push(callback);
        return {
            unsubscribe: () => {
                this.#subscribers = this.#subscribers.filter(
                    (cb) => cb !== callback
                );
            },
        };
    }

    #createDOM() {
        this.#container.textContent = "";
        this.#container.classList.add("selectbox-container");
        this.#container.classList.add("tree-select");

        const select = document.createElement("div");
        select.className = "selectbox selectbox-multiple";
        this.#container.appendChild(select);

        this.#header.className = "selectbox-header";
        this.#header.setAttribute("tabindex", "0");
        this.#selectedText.className = "selectbox-selected-text";
        this.#header.appendChild(this.#selectedText);
        this.#arrow.className = "selectbox-arrow";
        this.#arrow.appendChild(document.createElement("b"));
        this.#header.appendChild(this.#arrow);
        select.appendChild(this.#header);

        this.#dropdown.className = "selectbox-dropdown";
        if (this.#options.description) {
            const description = document.createElement("div");
            description.className = "selectbox-description";
            description.textContent = this.#options.description;
            this.#dropdown.appendChild(description);
        }
        this.#optionsContainer.className = "selectbox-options";
        this.#dropdown.appendChild(this.#optionsContainer);
        select.appendChild(this.#dropdown);

        this.#header.addEventListener("click", (e) => {
            e.stopPropagation();
            this.isOpen ? this.closeDropdown() : this.openDropdown();
        });
        this.#header.addEventListener("keydown", this.#onKeydown);
        this.#dropdown.addEventListener("keydown", this.#onKeydown);
        this.#dropdown.addEventListener("click", (e) => this.#onClick(e));
        this.#dropdown.addEventListener("wheel", (e) => e.stopPropagation());
    }

    /**
     * Lets the list reach down to the bottom of the window: a library with
     * its collections opened takes many rows.
     */
    #fitHeight() {
        if (!this.isOpen) {
            return;
        }
        const options = this.#optionsContainer;
        this.#dropdown.classList.remove("selectbox-dropdown-top");
        this.#dropdown.style.maxHeight = "none";
        const room =
            window.innerHeight -
            options.getBoundingClientRect().top -
            TreeSelectBox.#WINDOW_MARGIN;
        if (room >= TreeSelectBox.#MIN_LIST_HEIGHT) {
            options.style.maxHeight = Math.floor(room) + "px";
        } else {
            options.style.maxHeight = TreeSelectBox.#MIN_LIST_HEIGHT + "px";
            this.#dropdown.classList.add("selectbox-dropdown-top");
        }
    }

    /**
     * @param {MouseEvent} e
     */
    #onClick(e) {
        // The rows are drawn anew on every change, so the clicked one is
        // gone by the time the click reaches the document.
        e.stopPropagation();
        let target = e.target instanceof HTMLElement ? e.target : null;
        const onExpander =
            !!target && target.classList.contains("tree-select-expander");
        while (target && target !== this.#dropdown && !target.dataset.id) {
            target = target.parentElement;
        }
        const id = target && target.dataset.id;
        if (!id) {
            return;
        }
        if (onExpander) {
            this.#toggleExpanded(id);
            return;
        }
        const enabled = this.#tree.toggle(id);
        this.#refresh();
        const detail = {
            ids: this.#tree.getCheckedIds(),
            current: id,
            enabled: enabled,
        };
        this.#subscribers.forEach((cb) =>
            cb({ type: "treeselect:change", detail: detail })
        );
    }

    /**
     * @param {string} id
     */
    #toggleExpanded(id) {
        if (this.#expanded.has(id)) {
            this.#expanded.delete(id);
            this.#render();
            return;
        }
        this.#expanded.add(id);
        this.#render();
        this.load(id).catch((error) => {
            console.error("Failed to load " + id + ":", error);
        });
    }

    #refresh() {
        this.#updateSelectedText();
        if (this.isOpen) {
            this.#render();
        }
    }

    #updateSelectedText() {
        const ids = this.#tree.getCheckedIds();
        if (ids.length === 0) {
            this.#selectedText.textContent = this.#options.placeholder || "";
        } else if (ids.length === 1) {
            const node = this.#tree.getNode(ids[0]);
            this.#selectedText.textContent = node ? node.text : "";
        } else {
            this.#selectedText.textContent = ids.length + " items selected";
        }
    }

    #render() {
        const scrollTop = this.#optionsContainer.scrollTop;
        const fragment = document.createDocumentFragment();
        /**
         * @param {Array<CheckTreeNode>} nodes
         * @param {number} depth
         */
        const add = (nodes, depth) => {
            nodes.forEach((node) => {
                fragment.appendChild(this.#createRow(node, depth));
                if (!this.#expanded.has(node.id)) {
                    return;
                }
                if (this.#loading.has(node.id)) {
                    fragment.appendChild(this.#createLoadingRow(depth + 1));
                } else if (node.children) {
                    add(node.children, depth + 1);
                }
            });
        };
        add(this.#tree.getRoots(), 0);
        this.#optionsContainer.textContent = "";
        this.#optionsContainer.appendChild(fragment);
        this.#optionsContainer.scrollTop = scrollTop;
    }

    /**
     * @param {CheckTreeNode} node
     * @param {number} depth
     * @returns {HTMLElement}
     */
    #createRow(node, depth) {
        const row = document.createElement("div");
        row.className =
            "selectbox-option selectbox-option-checkbox tree-select-option";
        row.dataset.id = node.id;
        row.style.paddingLeft = 6 + depth * TreeSelectBox.#INDENT + "px";
        const state = this.#tree.getState(node);
        if (state === "checked") {
            row.classList.add("checkbox--checked");
        } else if (state === "indeterminate") {
            row.classList.add("checkbox--indeterminate");
        }

        const expander = document.createElement("span");
        expander.className = "tree-select-expander";
        // Lazy children are unknown, so such a node may have some.
        if (!node.children || node.children.length) {
            expander.appendChild(document.createElement("b"));
            if (this.#expanded.has(node.id)) {
                expander.classList.add("tree-select-expander-open");
            }
        } else {
            expander.classList.add("tree-select-expander-none");
        }
        row.appendChild(expander);

        row.appendChild(this.#createCheckbox());

        const label = document.createElement("label");
        label.className = "selectbox-option-text";
        label.textContent = node.text;
        label.title = node.text;
        row.appendChild(label);
        return row;
    }

    /**
     * @param {number} depth
     * @returns {HTMLElement}
     */
    #createLoadingRow(depth) {
        const row = document.createElement("div");
        row.className = "tree-select-loading";
        row.style.paddingLeft =
            6 + depth * TreeSelectBox.#INDENT + TreeSelectBox.#INDENT + "px";
        row.textContent = this.#options.loadingText || "...";
        return row;
    }

    /** @returns {HTMLElement} the look of a Checkbox, without the input */
    #createCheckbox() {
        const visual = document.createElement("span");
        visual.className = "checkbox-visual";
        visual.setAttribute("aria-hidden", "true");

        const svgNS = "http://www.w3.org/2000/svg";
        const checkmark = document.createElementNS(svgNS, "svg");
        checkmark.setAttribute("viewBox", "0 0 10 8");
        checkmark.setAttribute("class", "checkbox-checkmark");
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        checkmark.appendChild(path);
        visual.appendChild(checkmark);

        const line = document.createElement("span");
        line.className = "checkbox-indeterminate";
        visual.appendChild(line);
        return visual;
    }
}

export { TreeSelectBox };
