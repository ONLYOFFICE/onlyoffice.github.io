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
        throw new Error("Invalid container element");
    }
    /**
     * @type {MessageOptionsType}
     * @private
     */
    this._options = Object.assign(this._options, options);
    this._isShow = false;
}

Message.prototype = {
    constructor: Message,

    _options: {
        type: "info",
        text: "",
        title: "",
        duration: 0,
        closeButton: true,
        autoClose: false,
        closeOnClickOutside: true,
    },
    /**
     * @type {null | function(MouseEvent): void}
     * @private
     */
    _outsideClickListener: null,
    /**
     * @type {null | HTMLElement}
     * @private
     */
    _element: null,
    /**
     * @type {null | number}
     * @private
     */
    _timeoutId: null,

    /**
     * @returns {HTMLElement}
     * @private
     */
    _create: function () {
        var messageEl = document.createElement("div");
        messageEl.className = "message message-" + this._options.type;
        messageEl.setAttribute("role", "alert");

        let title = this._options.title;
        if (!title) {
            title = "Error";
            switch (this._options.type) {
                case "success":
                    title = "Success";
                    break;
                case "warning":
                    title = "Warning";
                    break;
                case "info":
                    title = "Information";
                    break;
            }
        }
        let text = this._options.text;
        if (!text) {
            text = "";
            switch (this._options.type) {
                case "success":
                    text = "Operation completed successfully.";
                    break;
                case "warning":
                    text = "Please be cautious.";
                    break;
                case "error":
                    text = "Something went wrong.";
                    break;
            }
        }

        messageEl.innerHTML =
            '<div class="message-content">' +
            '<span class="message-title">' +
            title +
            "</span>" +
            '<span class="message-text">' +
            text +
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
    },

    addOutsideClickListener: function () {
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
    },

    removeOutsideClickListener: function () {
        if (this._outsideClickListener) {
            document.removeEventListener("click", this._outsideClickListener);
            this._outsideClickListener = null;
        }
    },

    /**
     * @param {string} [text]
     * @param {string} [title]
     * @returns
     */
    show: function (text, title) {
        if (this._isShow) {
            return this;
        }
        this._isShow = true;
        if (!this.container.classList.contains("message-container")) {
            this.container.classList.add("message-container");
        }

        if (title) {
            this._options.title = title;
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
    },

    close: function () {
        const self = this;
        this._isShow = false;
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
    },
};

export { Message };
