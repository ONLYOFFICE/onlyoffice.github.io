(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.UiControls = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";
    var switchClass = (Helpers && Helpers.switchClass) || function (el, cls, add) {
        if (!el) return;
        if (add) el.classList.add(cls); else el.classList.remove(cls);
    };

    var scrollBoxes = [];
    var selectLists = [];

    function checkScroll(holder, thumb, func) {
        return function () {
            if (thumb) {
                if (holder.scrollHeight <= holder.clientHeight) {
                    switchClass(thumb, displayNoneClass, true);
                } else {
                    switchClass(thumb, displayNoneClass, false);
                    var height = holder.clientHeight / holder.scrollHeight * holder.clientHeight;
                    height = height < 40 ? 40 : height;
                    thumb.style.height = height + "px";

                    var scroll = holder.scrollHeight - holder.clientHeight;
                    var percScrolled = holder.scrollTop / scroll;

                    var margin = percScrolled * (holder.clientHeight - height);
                    thumb.style.marginTop = margin + "px";
                }
            }

            if (func) func(holder, thumb);
        };
    }

    function initScrollBox(holder, thumb, onscroll) {
        if (!holder) return { onscroll: function () {} };
        var scroller = {};
        scroller.onscroll = checkScroll(holder, thumb, onscroll);

        holder.addEventListener("scroll", function () {
            scroller.onscroll();
        }, { passive: true });

        if (thumb) {
            thumb.onmousedown = function (e) {
                switchClass(thumb, "scrolling", true);
                var y = e.clientY;
                var initialPos = holder.scrollTop;

                window.onmouseup = function (e) {
                    switchClass(thumb, "scrolling", false);
                    window.onmouseup = null;
                    window.onmousemove = null;
                };
                window.onmousemove = function (e) {
                    var delta = e.clientY - y;
                    var percMoved = delta / holder.clientHeight;
                    var deltaScroll = holder.scrollHeight * percMoved;
                    holder.scrollTop = initialPos + deltaScroll;

                    scroller.onscroll();
                };
            };
        }

        scrollBoxes.push(scroller);

        if (typeof document !== "undefined" && document.body) {
            document.body.onresize = function () {
                for (var i = 0; i < scrollBoxes.length; i++) {
                    scrollBoxes[i].onscroll();
                }
            };
        }

        return scroller;
    }

    function openList(el) {
        for (var i = 0; i < selectLists.length; i++) {
            var close = true;
            if (selectLists[i] === el) {
                close = false;
            }
            switchClass(selectLists[i], displayNoneClass, close);
        }
    }

    function selectInput(input, el, list) {
        if (!input || !el) return;
        input.value = el.textContent;
        var val = el.getAttribute("data-value");
        input.setAttribute("data-value", val);
        input.setAttribute("title", el.textContent);
        if (input.onselectchange) {
            input.onselectchange(input, val);
        }
        if (list) {
            switchClass(list, displayNoneClass, true);
        }
    }

    function onClickListElement(list, input) {
        return function (ev) {
            var sel = ev.target.getAttribute("data-value");
            for (var i = 0; i < list.children.length; i++) {
                if (list.children[i].getAttribute("data-value") == sel) {
                    list.children[i].setAttribute("selected", "");
                    selectInput(input, list.children[i], list);
                } else {
                    if (list.children[i].hasAttribute("selected")) {
                        list.children[i].attributes.removeNamedItem("selected");
                    }
                }
            }
        };
    }

    function initSelectBoxes() {
        if (typeof document === "undefined") return;
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var select = document.getElementsByClassName("control select");

        for (var i = 0; i < select.length; i++) {
            var input = select[i];
            var holder = input.parentElement;
            var arrow = document.createElement("span");
            arrow.classList.add("selectArrow");
            arrow.appendChild(document.createElement("span"));
            arrow.appendChild(document.createElement("span"));
            holder.appendChild(arrow);

            var lists = holder.getElementsByClassName("selectList");
            for (var k = 0; k < lists.length; k++) {
                var list = lists[k];
                if (list.children.length > 0) {
                    var def = false;
                    for (var j = 0; j < list.children.length; j++) {
                        if (list.children[j].hasAttribute("selected")) {
                            selectInput(input, list.children[j], list);
                            def = true;
                        }
                        list.children[j].onclick = onClickListElement(list, input);
                    }
                    if (!def) {
                        selectInput(input, list.children[0], list);
                    }
                }

                var f = (function (l, inp) {
                    return function (ev) {
                        ev.stopPropagation();
                        if (elements.styleSelectListOther && !elements.styleSelectListOther.classList.contains(displayNoneClass)) {
                            return true;
                        }
                        if (l.onopen) {
                            l.onopen();
                        }
                        if (!inp.hasAttribute("readonly")) {
                            inp.select();
                        }
                        openList(l);
                        return true;
                    };
                })(list, input);

                if (k !== 1) {
                    input.onclick = f;
                    arrow.onclick = f;
                }
                selectLists.push(list);
            }
        }

        window.onclick = function () {
            openList(null);
        };
    }

    return {
        initScrollBox: initScrollBox,
        checkScroll: checkScroll,
        initSelectBoxes: initSelectBoxes,
        openList: openList,
        selectInput: selectInput,
        onClickListElement: onClickListElement,
        scrollBoxes: scrollBoxes,
        selectLists: selectLists
    };
});
