class ToggleButton extends Button {
    constructor(container, options = {}) {
        super(container, {
            toggled: options.toggled || false,
            toggleOnClick: options.toggleOnClick !== false,
            ...options,
        });

        this.isToggled = this.options.toggled;
    }

    createDOM() {
        super.createDOM();
        this.updateToggleState();
    }

    handleClick(e) {
        if (
            this.options.toggleOnClick &&
            !this.options.disabled &&
            !this.isLoading
        ) {
            this.toggle();
        }
        super.handleClick(e);
    }

    toggle() {
        this.isToggled = !this.isToggled;
        this.updateToggleState();
        this.triggerToggleEvent();
    }

    setToggled(toggled) {
        this.isToggled = toggled;
        this.updateToggleState();
    }

    updateToggleState() {
        if (this.isToggled) {
            this.container.classList.add("custom-button-toggled");
        } else {
            this.container.classList.remove("custom-button-toggled");
        }
    }

    triggerToggleEvent() {
        const event = new CustomEvent("button:toggle", {
            detail: {
                toggled: this.isToggled,
                button: this,
            },
        });
        this.container.dispatchEvent(event);
    }
}
