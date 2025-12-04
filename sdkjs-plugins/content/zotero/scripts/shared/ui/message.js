// @ts-check

/// <reference path="./types.js" />

/**
 * @constructor
 * @param {string | HTMLElement} container
 * @param {MessageOptionsType} options
 */
function Message(container, options) {
    if (typeof container === "string") {
        var temp = document.getElementById(container);
        if (temp instanceof HTMLElement) {
            container = temp;
        }
    }
    if (container instanceof HTMLElement) {
        /** @type {HTMLElement} */
        this.container = container;
    } else {
        throw new Error("Invalid container _element");
    }
    /** @type {MessageOptionsType} */
    this._options = Object.assign(options, {
        type: options.type || "info",
        text: options.text || "",
        duration: options.duration || 0,
        closeButton:
            options.closeButton !== undefined ? options.closeButton : true,
        autoClose: options.autoClose !== undefined ? options.autoClose : true,
        closeOnClickOutside:
            options.closeOnClickOutside !== undefined
                ? options.closeOnClickOutside
                : true,
    });

    this._element = null;
    this._timeoutId = null;
    /** @type {null | function(MouseEvent): void} */
    this._outsideClickListener = null;
}

Message.prototype._create = function () {
    var messageEl = document.createElement("div");
    messageEl.className = "message message-" + this._options.type;
    messageEl.setAttribute("role", "alert");

    var icon = "";
    switch (this._options.type) {
        case "error":
            icon = "✕";
            break;
        case "warning":
            icon = "⚠";
            break;
        case "success":
            icon = "✓";
            break;
        default:
            icon = "ℹ";
    }

    messageEl.innerHTML =
        '<div class="message-content">' +
        '<span class="message-icon">' +
        icon +
        "</span>" +
        '<span class="message-text">' +
        this._options.text +
        "</span>" +
        "</div>";

    if (this._options.closeButton) {
        var closeBtn = document.createElement("button");
        closeBtn.className = "message-close";
        closeBtn.textContent = "×";
        closeBtn.setAttribute("aria-label", "Close");

        closeBtn.onclick = this.close.bind(this);
        messageEl.appendChild(closeBtn);
    }

    return messageEl;
};

Message.prototype.addOutsideClickListener = function () {
    if (this._outsideClickListener) {
        document.removeEventListener("click", this._outsideClickListener);
    }

    const self = this;
    this._outsideClickListener = function (/** @type {MouseEvent} */ e) {
        if (e.target instanceof HTMLElement === false) {
            return;
        }
        if (self._element && !self._element.contains(e.target)) {
            self.close();
        }
    };

    setTimeout(function () {
        if (!self._outsideClickListener) {
            return;
        }
        document.addEventListener("click", self._outsideClickListener);
    }, 10);
};

Message.prototype.removeOutsideClickListener = function () {
    if (this._outsideClickListener) {
        document.removeEventListener("click", this._outsideClickListener);
        this._outsideClickListener = null;
    }
};

/**
 * @param {string} [text]
 * @returns
 */
Message.prototype.show = function (text) {
    if (!this.container.classList.contains("message-container")) {
        this.container.classList.add("message-container");
    }

    if (text) {
        this._options.text = text;
    }

    var messageEl = this._create();
    this._element = messageEl;
    this.container.appendChild(messageEl);

    setTimeout(function () {
        messageEl.style.opacity = "1";
        messageEl.style.transform = "translateY(0)";
    }, 10);

    if (this._options.autoClose && Number(this._options.duration) > 0) {
        this._timeoutId = setTimeout(
            this.close.bind(this),
            this._options.duration
        );
    }

    if (this._options.closeOnClickOutside) {
        this.addOutsideClickListener();
    }

    return this;
};

Message.prototype.close = function () {
    const self = this;
    if (!this._element || !this._element.parentNode) {
        return;
    }

    if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
    }

    this.removeOutsideClickListener();

    var _element = this._element;
    _element.style.opacity = "0";
    _element.style.transform = "translateY(-20px)";

    setTimeout(function () {
        if (_element.parentNode) {
            _element.parentNode.removeChild(_element);
        }
    }, 300);
};
