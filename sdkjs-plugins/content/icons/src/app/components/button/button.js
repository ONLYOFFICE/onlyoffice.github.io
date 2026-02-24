// @ts-check

/// <reference path="./types.js" />

/**
 * @param {string | HTMLButtonElement} button
 * @param {ButtonOptionsType} [options]
 */
function Button(button, options) {
    const self = this;
    if (typeof button === "string") {
        var temp = document.getElementById(button);
        if (temp instanceof HTMLButtonElement) {
            button = temp;
        }
    }
    if (button instanceof HTMLButtonElement) {
        this.button = button;
    } else {
        throw new Error("Invalid button");
    }

    this._container = document.createElement("div");
    this._options = options || {};

    this._options.text = this._options.text || button.textContent.trim();
    this._options.type = this._options.type || "button";
    this._options.variant = this._options.variant || "primary";
    this._options.size = this._options.size || "medium";
    this._options.iconPosition = this._options.iconPosition || "left";

    this.isLoading = false;
    this._originalText = this._options.text;
    /** @type {Function[]} */
    this._subscribers = [];
    /** @type {ButtonBoundHandlesType} */
    this._boundHandles = {
        click: function (e) {
            self._handleClick(e);
        },
        mouseenter: function () {
            self._handleMouseEnter();
        },
        mouseleave: function () {
            self._handleMouseLeave();
        },
        focus: function () {
            self._handleFocus();
        },
        blur: function () {
            self._handleBlur();
        },
        keydown: function (e) {
            self._handleKeydown(e);
        },
    };

    this._createDOM();
    this._bindEvents();
    this.updateState();
}

Button.prototype._createDOM = function () {
    var parent = this.button.parentNode;

    var fragment = document.createDocumentFragment();
    fragment.appendChild(this._container);
    this._container.className += " custom-button-container";

    this.button.className += " custom-button";
    this.button.className += " custom-button-" + this._options.variant;
    this.button.className += " custom-button-" + this._options.size;

    if (this._options.disabled) {
        this.button.className += " custom-button-disabled";
    }
    if (this._options.loading) {
        this._container.className += " custom-button-loading";
    }
    if (this._options.type) {
        this.button.type = this._options.type;
    }

    if (this._options.tooltip) {
        this.button.title = this._options.tooltip;
    }

    if (this._options.disabled) {
        this.button.disabled = true;
    }

    if (this._options.text) {
        this.button.textContent = "";
        this.buttonText = document.createElement("span");
        this.buttonText.className = "custom-button-text";
        this.buttonText.textContent = this._options.text || "";

        if (this._options.icon) {
            var iconSpan = document.createElement("span");
            iconSpan.className = "custom-button-icon";

            if (this._options.iconPosition === "left") {
                iconSpan.className += " custom-button-icon-left";
                this.button.appendChild(iconSpan);
                this.button.appendChild(this.buttonText);
            } else {
                iconSpan.className += " custom-button-icon-right";
                this.button.appendChild(this.buttonText);
                this.button.appendChild(iconSpan);
            }
            iconSpan.innerHTML = this._options.icon;
        } else {
            this.button.appendChild(this.buttonText);
        }
    }

    if (this._options.loading) {
        this.spinner = document.createElement("span");
        this.spinner.className = "custom-button-spinner";
        this.button.appendChild(this.spinner);
    }

    if (this._options.badge) {
        this.badgeElement = document.createElement("span");
        this.badgeElement.className = "custom-button-badge";
        this.badgeElement.textContent = this._options.badge;
        this.button.appendChild(this.badgeElement);
    }

    if (parent) {
        parent.insertBefore(fragment, this.button);
    }
    this._container.appendChild(this.button);
};

Button.prototype._bindEvents = function () {
    var self = this;

    this.button.addEventListener("click", this._boundHandles.click);

    this.button.addEventListener("mouseenter", this._boundHandles.mouseenter);

    this.button.addEventListener("mouseleave", this._boundHandles.mouseleave);

    this.button.addEventListener("focus", this._boundHandles.focus);

    this.button.addEventListener("blur", this._boundHandles.blur);

    this.button.addEventListener("keydown", this._boundHandles.keydown);
};

/** @param {Event} e */
Button.prototype._handleClick = function (e) {
    if (this._options.disabled || this.isLoading) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    this.triggerClickEvent(e);
};

Button.prototype._handleMouseEnter = function () {
    var classes = this.button.className.split(" ");
    if (classes.indexOf("custom-button-hover") === -1) {
        this.button.className += " custom-button-hover";
    }
    this.triggerEvent("mouseenter");
};

Button.prototype._handleMouseLeave = function () {
    this.button.className = this.button.className
        .split(" ")
        .filter(function (cls) {
            return cls !== "custom-button-hover";
        })
        .join(" ");
    this.triggerEvent("mouseleave");
};

Button.prototype._handleFocus = function () {
    var classes = this.button.className.split(" ");
    if (classes.indexOf("custom-button-focused") === -1) {
        this.button.className += " custom-button-focused";
    }
    this.triggerEvent("focus");
};

Button.prototype._handleBlur = function () {
    this.button.className = this.button.className
        .split(" ")
        .filter(function (cls) {
            return cls !== "custom-button-focused";
        })
        .join(" ");
    this.triggerEvent("blur");
};
/** @param {KeyboardEvent} e */
Button.prototype._handleKeydown = function (e) {
    var key = e.key || e.keyCode;

    if (key === " " || key === "Enter" || key === 32 || key === 13) {
        if (this.button.tagName === "BUTTON") {
        } else {
            e.preventDefault();
            this.button.click();
        }
    } else if (key === "Escape" || key === 27) {
        this.button.blur();
    }

    this.triggerEvent("keydown", { key: key });
};
/** @param {function(ButtonEventType): void} callback */
Button.prototype.subscribe = function (callback) {
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
/** @param {ButtonOptionsType['text']} text */
Button.prototype.setText = function (text) {
    if (typeof text === "undefined") return;
    this._options.text = text;
    if (!this.buttonText) {
        this.buttonText = document.createElement("span");
        this.buttonText.className = "custom-button-text";
        this.buttonText.textContent = "";
        this.button.appendChild(this.buttonText);
    }
    this.buttonText.textContent = text;
};
/**
 * @param {string} icon
 * @param {ButtonOptionsType['iconPosition']} position
 */
Button.prototype.setIcon = function (icon, position) {
    this._options.icon = icon;
    this._options.iconPosition = position || "left";
};
/** @param {ButtonOptionsType['badge']} badge */
Button.prototype.setBadge = function (badge) {
    if (typeof badge === "undefined") return;
    this._options.badge = badge;
    if (this.badgeElement) {
        this.badgeElement.textContent = badge;
        this.badgeElement.style.display = badge ? "flex" : "none";
    } else if (badge) {
        //  rebuild()
    }
};
/** @param {ButtonOptionsType['variant']} variant */
Button.prototype.setVariant = function (variant) {
    if (typeof variant === "undefined") return;

    var oldClass = "custom-button-" + this._options.variant;
    var newClass = "custom-button-" + variant;

    this.button.className =
        this.button.className
            .split(" ")
            .filter(function (cls) {
                return cls !== oldClass;
            })
            .join(" ") +
        " " +
        newClass;

    this._options.variant = variant;
};

/** @param {ButtonOptionsType['size']} size */
Button.prototype.setSize = function (size) {
    if (typeof size === "undefined") return;

    var oldClass = "custom-button-" + this._options.size;
    var newClass = "custom-button-" + size;

    this.button.className =
        this.button.className
            .split(" ")
            .filter(function (cls) {
                return cls !== oldClass;
            })
            .join(" ") +
        " " +
        newClass;

    this._options.size = size;
};

Button.prototype.enable = function () {
    this._options.disabled = false;
    this.button.disabled = false;

    this.button.className = this.button.className
        .split(" ")
        .filter(function (cls) {
            return cls !== "custom-button-disabled";
        })
        .join(" ");
};

Button.prototype.disable = function () {
    this._options.disabled = true;
    this.button.disabled = true;

    var classes = this.button.className.split(" ");
    if (classes.indexOf("custom-button-disabled") === -1) {
        this.button.className += " custom-button-disabled";
    }
};

Button.prototype.startLoading = function () {
    this.isLoading = true;
    if (typeof this._options.text !== "undefined")
        this._originalText = this._options.text;

    var containerClasses = this._container.className.split(" ");
    if (containerClasses.indexOf("custom-button-loading") === -1) {
        this._container.className += " custom-button-loading";
    }

    if (this.spinner) {
        this.spinner.style.display = "inline-block";
    }

    if (this.buttonText) {
        this.buttonText.textContent = "Loading...";
    }

    this.button.disabled = true;
};

Button.prototype.stopLoading = function () {
    this.isLoading = false;

    this._container.className = this._container.className
        .split(" ")
        .filter(function (cls) {
            return cls !== "custom-button-loading";
        })
        .join(" ");

    if (this.spinner) {
        this.spinner.style.display = "none";
    }

    if (this.buttonText) {
        this.buttonText.textContent = this._originalText;
    }

    this.button.disabled = !!this._options.disabled;
};
/** @param {ButtonOptionsType['tooltip']} tooltip */
Button.prototype.setTooltip = function (tooltip) {
    if (typeof tooltip === "undefined") return;
    this._options.tooltip = tooltip;
    this.button.title = tooltip || "";
};
/** @param {Event} e */
Button.prototype.triggerClickEvent = function (e) {
    var detail = {
        originalEvent: e,
        button: this,
    };

    this._subscribers.forEach(function (cb) {
        cb({
            type: "button:click",
            detail: detail,
        });
    });
};

/**
 * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
 * @param {any} [detail]
 */
Button.prototype.triggerEvent = function (eventName, detail) {
    detail = detail || {};
    detail.button = this;

    this._subscribers.forEach(function (cb) {
        cb({
            type: "button:" + eventName,
            detail: detail,
        });
    });
};

Button.prototype.updateState = function () {
    if (this._options.disabled) {
        this.disable();
    } else {
        this.enable();
    }

    if (this._options.loading) {
        this.startLoading();
    }
};

Button.prototype.destroy = function () {
    this._subscribers = [];

    if (this._boundHandles) {
        try {
            this.button.removeEventListener("click", this._boundHandles.click);
            this.button.removeEventListener(
                "mouseenter",
                this._boundHandles.mouseenter
            );
            this.button.removeEventListener(
                "mouseleave",
                this._boundHandles.mouseleave
            );
            this.button.removeEventListener("focus", this._boundHandles.focus);
            this.button.removeEventListener("blur", this._boundHandles.blur);
            this.button.removeEventListener(
                "keydown",
                this._boundHandles.keydown
            );
        } catch (error) {
            console.error(error);
        }
    }

    this._container.innerHTML = "";

    var containerClasses = this._container.className
        .split(" ")
        .filter(function (cls) {
            return cls !== "custom-button-container";
        })
        .join(" ");
    this._container.className = containerClasses;
};

export { Button };
