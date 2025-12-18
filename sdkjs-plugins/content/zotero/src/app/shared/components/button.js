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
        this._button = button;
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

Button.prototype = /** @lends Button.prototype */ {
    constructor: Button,

    /**
     * @type {HTMLButtonElement}
     */
    // @ts-ignore
    _button: null,
    /**
     * @type {HTMLSpanElement | null}
     * @private
     */
    _buttonText: null,
    /**
     * @type {HTMLSpanElement | null}
     * @private
     */
    _spinner: null,
    /**
     * @private
     * @type {HTMLSpanElement | null}
     */
    _badgeElement: null,

    /**
     * @private
     */
    _createDOM: function () {
        var parent = this._button.parentNode;

        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " custom-button-container";

        this._button.className += " custom-button";
        this._button.className += " custom-button-" + this._options.variant;
        this._button.className += " custom-button-" + this._options.size;

        if (this._options.disabled) {
            this._button.className += " custom-button-disabled";
        }
        if (this._options.loading) {
            this._container.className += " custom-button-loading";
        }
        if (this._options.type) {
            this._button.type = this._options.type;
        }

        if (this._options.tooltip) {
            this._button.title = this._options.tooltip;
        }

        if (this._options.disabled) {
            this._button.disabled = true;
        }

        if (this._options.text) {
            this._button.textContent = "";
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = this._options.text || "";

            if (this._options.icon) {
                var iconSpan = document.createElement("span");
                iconSpan.className = "custom-button-icon";

                if (this._options.iconPosition === "left") {
                    iconSpan.className += " custom-button-icon-left";
                    this._button.appendChild(iconSpan);
                    this._button.appendChild(this._buttonText);
                } else {
                    iconSpan.className += " custom-button-icon-right";
                    this._button.appendChild(this._buttonText);
                    this._button.appendChild(iconSpan);
                }
                iconSpan.innerHTML = this._options.icon;
            } else {
                this._button.appendChild(this._buttonText);
            }
        }

        if (this._options.loading) {
            this._spinner = document.createElement("span");
            this._spinner.className = "custom-button-spinner";
            this._button.appendChild(this._spinner);
        }

        if (this._options.badge) {
            this._badgeElement = document.createElement("span");
            this._badgeElement.className = "custom-button-badge";
            this._badgeElement.textContent = this._options.badge;
            this._button.appendChild(this._badgeElement);
        }

        if (parent) {
            parent.insertBefore(fragment, this._button);
        }
        this._container.appendChild(this._button);
    },
    /** @private */
    _bindEvents: function () {
        var self = this;

        this._button.addEventListener("click", this._boundHandles.click);

        this._button.addEventListener(
            "mouseenter",
            this._boundHandles.mouseenter
        );

        this._button.addEventListener(
            "mouseleave",
            this._boundHandles.mouseleave
        );

        this._button.addEventListener("focus", this._boundHandles.focus);

        this._button.addEventListener("blur", this._boundHandles.blur);

        this._button.addEventListener("keydown", this._boundHandles.keydown);
    },

    /**
     * @param {Event} e
     * @private
     */
    _handleClick: function (e) {
        if (this._options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.triggerClickEvent(e);
    },
    /** @private */
    _handleMouseEnter: function () {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-hover") === -1) {
            this._button.className += " custom-button-hover";
        }
        this.triggerEvent("mouseenter");
    },
    /** @private */
    _handleMouseLeave: function () {
        this._button.className = this._button.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "custom-button-hover";
            })
            .join(" ");
        this.triggerEvent("mouseleave");
    },
    /** @private */
    _handleFocus: function () {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-focused") === -1) {
            this._button.className += " custom-button-focused";
        }
        this.triggerEvent("focus");
    },
    /** @private */
    _handleBlur: function () {
        this._button.className = this._button.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "custom-button-focused";
            })
            .join(" ");
        this.triggerEvent("blur");
    },
    /**
     * @param {KeyboardEvent} e
     * @private
     */
    _handleKeydown: function (e) {
        var key = e.key || e.keyCode;

        if (key === " " || key === "Enter" || key === 32 || key === 13) {
            if (this._button.tagName === "BUTTON") {
            } else {
                e.preventDefault();
                this._button.click();
            }
        } else if (key === "Escape" || key === 27) {
            this._button.blur();
        }

        this.triggerEvent("keydown", { key: key });
    },
    /** @param {function(InputEventType): void} callback */
    subscribe: function (callback) {
        var self = this;
        this._subscribers.push(callback);

        return {
            unsubscribe: function () {
                self._subscribers = self._subscribers.filter(function (cb) {
                    return cb !== callback;
                });
            },
        };
    },
    /** @param {ButtonOptionsType['text']} text */
    setText: function (text) {
        if (typeof text === "undefined") return;
        this._options.text = text;
        if (!this._buttonText) {
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = "";
            this._button.appendChild(this._buttonText);
        }
        this._buttonText.textContent = text;
    },
    /**
     * @param {string} icon
     * @param {ButtonOptionsType['iconPosition']} position
     */
    setIcon: function (icon, position) {
        this._options.icon = icon;
        this._options.iconPosition = position || "left";
    },
    /** @param {ButtonOptionsType['badge']} badge */
    setBadge: function (badge) {
        if (typeof badge === "undefined") return;
        this._options.badge = badge;
        if (this._badgeElement) {
            this._badgeElement.textContent = badge;
            this._badgeElement.style.display = badge ? "flex" : "none";
        } else if (badge) {
            //  rebuild()
        }
    },
    /** @param {ButtonOptionsType['variant']} variant */
    setVariant: function (variant) {
        if (typeof variant === "undefined") return;

        var oldClass = "custom-button-" + this._options.variant;
        var newClass = "custom-button-" + variant;

        this._button.className =
            this._button.className
                .split(" ")
                .filter(function (cls) {
                    return cls !== oldClass;
                })
                .join(" ") +
            " " +
            newClass;

        this._options.variant = variant;
    },

    /** @param {ButtonOptionsType['size']} size */
    setSize: function (size) {
        if (typeof size === "undefined") return;

        var oldClass = "custom-button-" + this._options.size;
        var newClass = "custom-button-" + size;

        this._button.className =
            this._button.className
                .split(" ")
                .filter(function (cls) {
                    return cls !== oldClass;
                })
                .join(" ") +
            " " +
            newClass;

        this._options.size = size;
    },

    enable: function () {
        this._options.disabled = false;
        this._button.disabled = false;

        this._button.className = this._button.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "custom-button-disabled";
            })
            .join(" ");
    },

    disable: function () {
        this._options.disabled = true;
        this._button.disabled = true;

        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-disabled") === -1) {
            this._button.className += " custom-button-disabled";
        }
    },

    startLoading: function () {
        this.isLoading = true;
        if (typeof this._options.text !== "undefined")
            this._originalText = this._options.text;

        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("custom-button-loading") === -1) {
            this._container.className += " custom-button-loading";
        }

        if (this._spinner) {
            this._spinner.style.display = "inline-block";
        }

        if (this._buttonText) {
            this._buttonText.textContent = "Loading...";
        }

        this._button.disabled = true;
    },

    stopLoading: function () {
        this.isLoading = false;

        this._container.className = this._container.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "custom-button-loading";
            })
            .join(" ");

        if (this._spinner) {
            this._spinner.style.display = "none";
        }

        if (this._buttonText) {
            this._buttonText.textContent = this._originalText;
        }

        this._button.disabled = !!this._options.disabled;
    },
    /** @param {ButtonOptionsType['tooltip']} tooltip */
    setTooltip: function (tooltip) {
        if (typeof tooltip === "undefined") return;
        this._options.tooltip = tooltip;
        this._button.title = tooltip || "";
    },
    /** @param {Event} e */
    triggerClickEvent: function (e) {
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
    },

    /**
     * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
     * @param {any} [detail]
     */
    triggerEvent: function (eventName, detail) {
        detail = detail || {};
        detail.button = this;

        this._subscribers.forEach(function (cb) {
            cb({
                type: "button:" + eventName,
                detail: detail,
            });
        });
    },

    updateState: function () {
        if (this._options.disabled) {
            this.disable();
        } else {
            this.enable();
        }

        if (this._options.loading) {
            this.startLoading();
        }
    },

    destroy: function () {
        this._subscribers = [];

        if (this._boundHandles) {
            try {
                this._button.removeEventListener(
                    "click",
                    this._boundHandles.click
                );
                this._button.removeEventListener(
                    "mouseenter",
                    this._boundHandles.mouseenter
                );
                this._button.removeEventListener(
                    "mouseleave",
                    this._boundHandles.mouseleave
                );
                this._button.removeEventListener(
                    "focus",
                    this._boundHandles.focus
                );
                this._button.removeEventListener(
                    "blur",
                    this._boundHandles.blur
                );
                this._button.removeEventListener(
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
    },
};

export { Button };
