import SelectBox from "./selectbox.js";

class AdvancedSelectBox extends SelectBox {
    constructor(container, options = {}) {
        super(container, options);
        this.groups = new Map();
    }

    addGroup(name, label) {
        this.groups.set(name, { label, items: [] });
    }

    addItemToGroup(groupName, value, text, selected = false) {
        if (!this.groups.has(groupName)) {
            this.addGroup(groupName, groupName);
        }

        const group = this.groups.get(groupName);
        group.items.push({ value, text, selected });

        this.addItem(value, text, selected);
    }

    renderOptions(searchTerm = "") {
        if (!this.optionsContainer) return;

        let html = "";

        for (const [groupName, group] of this.groups) {
            const groupItems = group.items.filter(
                (item) =>
                    !searchTerm || item.text.toLowerCase().includes(searchTerm)
            );

            if (groupItems.length > 0) {
                html += `<div class="selectbox-group">
                    <div class="selectbox-group-label">${group.label}</div>
                    <div class="selectbox-group-items">
                        ${groupItems
                            .map((item) => this.renderOption(item))
                            .join("")}
                    </div>
                </div>`;
            }
        }

        const ungroupedItems = this.items.filter(
            (item) =>
                !Array.from(this.groups.values()).some((group) =>
                    group.items.some(
                        (groupItem) => groupItem.value === item.value
                    )
                ) &&
                (!searchTerm || item.text.toLowerCase().includes(searchTerm))
        );

        if (ungroupedItems.length > 0) {
            html += ungroupedItems
                .map((item) => this.renderOption(item))
                .join("");
        }

        this.optionsContainer.innerHTML =
            html || '<div class="selectbox-no-results">No results found</div>';
        this.bindOptionEvents();
    }

    renderOption(item) {
        return `
            <div class="selectbox-option ${
                this.selectedValues.has(item.value)
                    ? "selectbox-option-selected"
                    : ""
            }" data-value="${item.value}">
                ${
                    this.options.multiple
                        ? `
                    <input type="checkbox" ${
                        this.selectedValues.has(item.value) ? "checked" : ""
                    } class="selectbox-checkbox">
                `
                        : ""
                }
                <span class="selectbox-option-text">${item.text}</span>
            </div>
        `;
    }

    bindOptionEvents() {
        this.optionsContainer
            .querySelectorAll(".selectbox-option")
            .forEach((option) => {
                option.addEventListener("click", (e) =>
                    this.handleOptionClick(e, option)
                );
            });
    }
}
