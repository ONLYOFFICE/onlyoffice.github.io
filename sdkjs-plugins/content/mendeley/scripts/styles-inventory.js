(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.StylesInventory = factory(root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Constants, Helpers) {

    function processStylesList(json) {
        if (typeof window !== "undefined") window._allStylesList = json;
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var defaultStyles = (Constants && Constants.defaultStyles) || {};
        var lastStyle = (Helpers && Helpers.getLastUsedStyle && Helpers.getLastUsedStyle()) || "apa";
        var found = false;

        var onStyleSelect = function (f) {
            return function (ev) {
                var sel = ev.target.getAttribute("data-value");
                if (Helpers && Helpers.saveLastUsedStyle) Helpers.saveLastUsedStyle(sel);
                f(ev);
            };
        };

        var openOtherStyleList = function (list) {
            return function (ev) {
                if (elements.styleSelectListOther && elements.styleWrapper) {
                    elements.styleSelectListOther.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
                }
                ev.stopPropagation();
                if (app.UiControls && app.UiControls.openList) app.UiControls.openList(list);
            };
        };

        var onStyleSelectOther = function (list, other) {
            return function (ev) {
                var tmpEl = list.removeChild(list.children[list.children.length - 2]);
                var newEl = document.createElement("span");
                newEl.setAttribute("data-value", tmpEl.getAttribute("data-value"));
                newEl.textContent = tmpEl.textContent;
                other.appendChild(newEl);
                newEl.onclick = onStyleSelectOther(elements.styleSelectList, elements.styleSelectListOther);
                tmpEl = other.removeChild(ev.target);
                newEl = document.createElement("span");
                newEl.setAttribute("data-value", tmpEl.getAttribute("data-value"));
                newEl.textContent = tmpEl.textContent;
                list.insertBefore(newEl, list.firstElementChild);
                newEl.onclick = onStyleSelect(app.UiControls.onClickListElement(elements.styleSelectList, elements.styleSelect));
                var event = new Event("click");
                newEl.dispatchEvent(event);
                if (app.UiControls && app.UiControls.openList) app.UiControls.openList(null);
            };
        };

        if (!elements.styleSelectList) return;

        for (var i = 0; i < json.length; i++) {
            if (json[i].dependent != 0 && json[i].dep != 0) continue;

            var el = document.createElement("span");
            el.setAttribute("data-value", json[i].name);
            el.textContent = json[i].title;
            if (defaultStyles[json[i].title] || json[i].name == lastStyle) {
                if (json[i].name == lastStyle) {
                    elements.styleSelectList.insertBefore(el, elements.styleSelectList.firstElementChild);
                } else {
                    elements.styleSelectList.appendChild(el);
                }
                if (app.UiControls) {
                    el.onclick = onStyleSelect(app.UiControls.onClickListElement(elements.styleSelectList, elements.styleSelect));
                }
            } else if (elements.styleSelectListOther) {
                elements.styleSelectListOther.appendChild(el);
                el.onclick = onStyleSelectOther(elements.styleSelectList, elements.styleSelectListOther);
            }
            if (json[i].name == lastStyle) {
                el.setAttribute("selected", "");
                if (app.UiControls) app.UiControls.selectInput(elements.styleSelect, el, elements.styleSelectList);
                found = true;
            }
        }

        var other = document.createElement("span");
        other.textContent = "More Styles...";
        elements.styleSelectList.appendChild(other);
        other.onclick = openOtherStyleList(elements.styleSelectListOther);

        if (!found && elements.styleSelectList.children.length > 0) {
            var first = elements.styleSelectList.children[0];
            first.setAttribute("selected", "");
            if (app.UiControls) app.UiControls.selectInput(elements.styleSelect, first, elements.styleSelectList);
        }
    }

    return {
        processStylesList: processStylesList
    };
});
