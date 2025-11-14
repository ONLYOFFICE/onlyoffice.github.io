class ToggleButton extends Button {
    constructor(container, options = {}) {
        super(container, {
            toggled: options.toggled || false,
            toggleOnClick: options.toggleOnClick !== false,
            ...options,
        });

        this.isToggled = this._options.toggled;
    }

    _createDOM() {
        super._createDOM();
        this.updateToggleState();
    }

    _handleClick(e) {
        if (
            this._options.toggleOnClick &&
            !this._options.disabled &&
            !this.isLoading
        ) {
            this.toggle();
        }
        super._handleClick(e);
    }

    toggle() {
        this.isToggled = !this.isToggled;
        this.#updateToggleState();
        this.triggerToggleEvent();
    }

    setToggled(toggled) {
        this.isToggled = toggled;
        this.#updateToggleState();
    }

    #updateToggleState() {
        if (this.isToggled) {
            this._container.classList.add("custom-button-toggled");
        } else {
            this._container.classList.remove("custom-button-toggled");
        }
    }

    triggerToggleEvent() {
        const event = new CustomEvent("button:toggle", {
            detail: {
                toggled: this.isToggled,
                button: this,
            },
        });
        this._container.dispatchEvent(event);
    }
}
