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

/**
 * The marks of a tree of checkboxes. A node with children is checked when
 * all of them are, unchecked when none is, and indeterminate otherwise;
 * marking it marks its whole subtree. Children may be loaded later: until
 * then the node keeps a mark of its own, and the children it gets inherit it.
 */
class CheckTree {
    /** @type {Array<CheckTreeNode>} */
    #roots = [];
    /** @type {Map<string, CheckTreeNode>} */
    #byId = new Map();

    /**
     * Replaces the whole tree; every node starts unchecked.
     * @param {Array<CheckTreeNodeSpec>} specs
     */
    setRoots(specs) {
        this.#byId.clear();
        this.#roots = specs.map((spec) => this.#create(spec, null, false));
    }

    /** @returns {Array<CheckTreeNode>} */
    getRoots() {
        return this.#roots;
    }

    /**
     * @param {string} id
     * @returns {CheckTreeNode|null}
     */
    getNode(id) {
        return this.#byId.get(id) || null;
    }

    /**
     * Gives a node its children. They take its mark; under an indeterminate
     * node (children given again) the marks inside are kept where the ids
     * are still there.
     * @param {string} id
     * @param {Array<CheckTreeNodeSpec>} specs
     */
    setChildren(id, specs) {
        const node = this.#byId.get(id);
        if (!node) {
            return;
        }
        const state = this.getState(node);
        const keep =
            state === "indeterminate"
                ? this.#checkedAmong(node.children || [])
                : [];
        this.#forget(node);
        const checked = state === "checked";
        node.checked = checked;
        node.children = specs.map((spec) =>
            this.#create(spec, node, checked)
        );
        keep.forEach((keptId) => {
            const kept = this.#byId.get(keptId);
            if (kept) {
                this.#mark(kept, true);
            }
        });
    }

    /**
     * @param {CheckTreeNode|string} nodeOrId
     * @returns {CheckState}
     */
    getState(nodeOrId) {
        const node =
            typeof nodeOrId === "string" ? this.#byId.get(nodeOrId) : nodeOrId;
        if (!node) {
            return "unchecked";
        }
        if (!node.children || node.children.length === 0) {
            return node.checked ? "checked" : "unchecked";
        }
        let all = true;
        let none = true;
        for (let i = 0; i < node.children.length; i++) {
            const state = this.getState(node.children[i]);
            if (state !== "checked") all = false;
            if (state !== "unchecked") none = false;
            if (!all && !none) {
                return "indeterminate";
            }
        }
        return all ? "checked" : "unchecked";
    }

    /**
     * Checks or unchecks a node with its whole subtree.
     * @param {string} id
     * @param {boolean} checked
     */
    setChecked(id, checked) {
        const node = this.#byId.get(id);
        if (node) {
            this.#mark(node, checked);
        }
    }

    /**
     * A checked node is unchecked; an unchecked or indeterminate one is
     * checked whole.
     * @param {string} id
     * @returns {boolean} whether the node is checked now
     */
    toggle(id) {
        const checked = this.getState(id) !== "checked";
        this.setChecked(id, checked);
        return checked;
    }

    /**
     * Checks exactly the given nodes with their subtrees. Unknown ids are
     * skipped.
     * @param {Array<string>} ids
     */
    setCheckedIds(ids) {
        this.#roots.forEach((root) => this.#mark(root, false));
        ids.forEach((id) => this.setChecked(id, true));
    }

    /**
     * The checked nodes nearest the roots: a checked node stands for its
     * subtree, so its children are not listed. setCheckedIds() takes the
     * list back.
     * @returns {Array<string>}
     */
    getCheckedIds() {
        return this.#checkedAmong(this.#roots);
    }

    /**
     * @param {CheckTreeNodeSpec} spec
     * @param {CheckTreeNode|null} parent
     * @param {boolean} checked
     * @returns {CheckTreeNode}
     */
    #create(spec, parent, checked) {
        /** @type {CheckTreeNode} */
        const node = {
            id: spec.id,
            text: spec.text,
            data: spec.data,
            parent: parent,
            children: null,
            checked: checked,
        };
        this.#byId.set(node.id, node);
        if (spec.children) {
            node.children = spec.children.map((child) =>
                this.#create(child, node, checked)
            );
        } else if (!spec.lazy) {
            node.children = [];
        }
        return node;
    }

    /**
     * @param {CheckTreeNode} node
     * @param {boolean} checked
     */
    #mark(node, checked) {
        node.checked = checked;
        if (node.children) {
            node.children.forEach((child) => this.#mark(child, checked));
        }
    }

    /**
     * The checked nodes nearest the given ones, the given ones included.
     * @param {Array<CheckTreeNode>} nodes
     * @returns {Array<string>}
     */
    #checkedAmong(nodes) {
        /** @type {Array<string>} */
        const ids = [];
        nodes.forEach((node) => {
            const state = this.getState(node);
            if (state === "checked") {
                ids.push(node.id);
            } else if (state === "indeterminate" && node.children) {
                Array.prototype.push.apply(
                    ids,
                    this.#checkedAmong(node.children)
                );
            }
        });
        return ids;
    }

    /**
     * Drops the descendants of a node from the index.
     * @param {CheckTreeNode} node
     */
    #forget(node) {
        (node.children || []).forEach((child) => {
            this.#forget(child);
            this.#byId.delete(child.id);
        });
    }
}

export { CheckTree };
