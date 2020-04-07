(function () {
    var displayNoneClass = "display-none";
    var blurClass = "blur";
    var waitForLoad = false;

    var selected = {
        items: {},
        html: {},
        checks: {},
        count: function () {
            var k = 0;
            for (var i in selected.items) k++;
            return k;
        }
    };

    var selectedLocale;
    var selectedStyle;

    var sdk = null;

    var lastSearch = {
        text: "",
        obj: null,
    };
    var elements = {
        libLoader: document.getElementById("libLoader"),
        error: document.getElementById("errorWrapper"),

        contentHolder: document.getElementById("content"),
        docsHolder: document.getElementById("docsHolder"),
        docsThumb: document.getElementById("docsThumb"),

        configState: document.getElementById("configState"),
        apiKeyConfigField: document.getElementById("apiKeyField"),
        saveConfigBtn: document.getElementById("saveConfigBtn"),

        mainState: document.getElementById("mainState"),
        logoutLink: document.getElementById("logoutLink"),

        selectedWrapper: document.getElementById("selectedWrapper"),
        selectedHolder: document.getElementById("selectedHolder"),
        selectedThumb: document.getElementById("selectedThumb"),
        buttonsWrapper: document.getElementById("buttonsWrapper"),

        searchLabel: document.getElementById("searchLabel"),
        searchClear: document.getElementById("searchClear"),
        searchField: document.getElementById("searchField"),

        styleSelectList: document.getElementById("styleSelectList"),
        styleSelect: document.getElementById("styleSelect"),
        styleLang: document.getElementById("styleLang"),

        insertBibBtn: document.getElementById("insertBibBtn"),
        cancelBtn: document.getElementById("cancelBtn"),
    };

    var selectedScroller;
    var docsScroller;

    window.Asc.plugin.init = function () {
        sdk = window.Asc.plugin.zotero.api({});

        window.Asc.plugin.onTranslate = applyTranslations;

        elements.logoutLink.onclick = function (e) {
            sdk.clearSettings();
            switchAuthState('config');
            return true;
        };

        function searchFor(text) {
            if (elements.mainState.classList.contains(displayNoneClass)) return;
            text = text.trim();
            if (!text) return;
            if (text == lastSearch.text) return;
            lastSearch.text = text;
            lastSearch.catObj = null;
            lastSearch.ownObj = null;

            clearLibrary();

            loadLibrary(sdk.items(text), false);
        };
        elements.searchField.onkeypress = function (e) {
            if (e.keyCode == 13) searchFor(e.target.value);
        };
        elements.searchField.onblur = function (e) {
            setTimeout(function () { searchFor(e.target.value); }, 500);
        };

        elements.searchField.onkeyup = function (e) {
            switchClass(elements.searchClear, displayNoneClass, !e.target.value);
        };
        elements.searchClear.onclick = function (e) {
            if (e.target.classList.contains(displayNoneClass)) return true;
            switchClass(elements.searchClear, displayNoneClass, true);
            elements.searchField.value = "";
            return true;
        };

        elements.cancelBtn.onclick = function (e) {
            var ids = [];
            for (var id in selected.items) {
                ids.push(id);
            }
            for (var i = 0; i < ids.length; i++) {
                removeSelected(ids[i]);
            }
        };

        elements.saveConfigBtn.onclick = function (e) {
            var apikey = elements.apiKeyConfigField.value.trim();
            if (apikey) {
                sdk.setApiKey(apikey)
                    .then(function () {
                        switchAuthState("main");
                    }).catch(function () {
                        showError(getMessage("Invalid API key"));
                    });
            }
        };

        elements.insertBibBtn.onclick = formatInsertBibliography;

        selectedScroller = initScrollBox(elements.selectedHolder, elements.selectedThumb);
        docsScroller = initScrollBox(elements.docsHolder, elements.docsThumb, checkDocsScroll);

        fetch("https://www.zotero.org/styles-files/styles.json")
            .then(function (resp) { return resp.json(); })
            .then(function (json) {
                for (var i = 0; i < json.length; i++) {
                    if (json[i].dependent != 0) continue;

                    var el = document.createElement("span");
                    el.setAttribute("data-value", json[i].name);
                    el.textContent = json[i].title;
                    switchClass(el, displayNoneClass, true);
                    elements.styleSelectList.append(el);
                    el.onclick = onClickListElement(elements.styleSelectList, elements.styleSelect);
                }
            })
            .catch(function (err) { });

        elements.styleSelect.onkeyup = function () {
            var input = elements.styleSelect;
            var filter = input.value.toLowerCase();
            var list = elements.styleSelectList;

            for (var i = 0; i < list.children.length; i++) {
                var text = list.children[i].textContent || list.children[i].innerText;
                var hide = true;
                if (filter && text.toLowerCase().indexOf(filter) > -1) {
                    hide = false;
                }
                switchClass(list.children[i], displayNoneClass, hide);
            }
        }

        elements.styleSelect.onselectchange = function (inp, val) {
            selectedStyle = val;
        };
        elements.styleLang.onselectchange = function (inp, val) {
            selectedLocale = val;
        };

        initSelectBoxes();

        if (sdk.hasSettings()) {
            switchAuthState('main');
        } else {
            switchAuthState('config');
        }
    };

    var scrollBoxes = [];
    function initScrollBox(holder, thumb, onscroll) {
        var scroller = {};
        scroller.onscroll = checkScroll(holder, thumb, onscroll);

        holder.onwheel = function (e) {
            holder.scrollTop += (e.deltaY > 10 || e.deltaY < -10) ? e.deltaY : e.deltaY * 20;
            scroller.onscroll();
        };

        thumb.onmousedown = function (e) {
            switchClass(thumb, "scrolling", true);
            var y = e.clientY;
            var initialPos = holder.scrollTop;

            window.onmouseup = function (e) {
                switchClass(thumb, "scrolling", false);
                window.onmouseup = null;
                window.onmousemove = null;
            }
            window.onmousemove = function (e) {
                var delta = e.clientY - y;

                var percMoved = delta / holder.clientHeight;
                var deltaScroll = holder.scrollHeight * percMoved;
                holder.scrollTop = initialPos + deltaScroll;

                scroller.onscroll();
            }
        }

        scrollBoxes.push(scroller);

        document.body.onresize = function () {
            for (var i = 0; i < scrollBoxes.length; i++) {
                scrollBoxes[i].onscroll();
            }
        }

        return scroller;
    }

    var selectLists = [];
    function initSelectBoxes() {
        var select = document.getElementsByClassName("control select");
        for (var i = 0; i < select.length; i++) {
            var input = select[i];
            var holder = input.parentElement;
            var arrow = null;
            if (input.hasAttribute("readonly")) {
                arrow = document.createElement("span");
                arrow.classList.add("selectArrow");
                arrow.append(document.createElement("span"));
                arrow.append(document.createElement("span"));
                holder.append(arrow);
            }

            var list = holder.getElementsByClassName("selectList")[0];
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

            var f = function (list) {
                return function (ev) {
                    ev.stopPropagation();
                    openList(list);
                    return true;
                };
            };

            input.onclick = f(list);
            if (arrow) {
                arrow.onclick = f(list);
            }
            selectLists.push(list);
        }

        window.onclick = function () {
            openList(null);
        }
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
        input.value = el.textContent;
        var val = el.getAttribute("data-value");
        input.setAttribute("data-value", val);
        input.setAttribute("title", el.textContent);
        if (input.onselectchange) {
            input.onselectchange(input, val);
        }
        switchClass(list, displayNoneClass, true);
    };

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
    };

    function applyTranslations() {
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    }

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    }

    function showError(message) {
        if (message) {
            switchClass(elements.error, displayNoneClass, false);
            elements.error.textContent = message;
            setTimeout(function () { window.onclick = function () { showError(); }; }, 100);
        } else {
            switchClass(elements.error, displayNoneClass, true);
            elements.error.textContent = "";
            window.onclick = null;
        }
    }

    function showLibLoader(show) {
        switchClass(elements.libLoader, displayNoneClass, !show);
    }

    function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    function configState(hide) {
        switchClass(elements.configState, displayNoneClass, hide);
    }

    function mainState(hide) {
        switchClass(elements.mainState, displayNoneClass, hide);
        switchClass(elements.logoutLink, displayNoneClass, hide);
    }

    var currentAuthState;
    function switchAuthState(state) {
        currentAuthState = state;
        configState(true);
        mainState(true);
        switch (state) {
            case 'config':
                configState(false);
                break;
            case 'main':
                mainState(false);
                break;
        }
    }

    function checkScroll(holder, thumb, func) {
        return function () {
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

            if (func) func(holder, thumb);
        }
    }

    var loadTimeout = null;
    function checkDocsScroll(holder) {
        if (shouldLoadMore(holder)) {

            if (loadTimeout) {
                clearTimeout(loadTimeout);
            }

            if (!lastSearch.obj && !lastSearch.text.trim()) return;

            waitForLoad = true;
            loadTimeout = setTimeout(function () {
                if (shouldLoadMore(holder)) {
                    loadLibrary(lastSearch.obj.next(), true, true);
                } else {
                    waitForLoad = false;
                }
            }, 500);

        }
    }

    function shouldLoadMore(holder) {
        if (currentAuthState != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) return false;
        if (!lastSearch.obj || !lastSearch.obj.next) return false;

        return true;
    }

    function clearLibrary() {
        var holder = elements.docsHolder;
        while (holder.lastChild) {
            holder.removeChild(holder.lastChild);
        }
        holder.scrollTop = 0;
    }

    function loadLibrary(promise, append) {
        showLibLoader(true);
        promise
            .then(function (res) {
                displaySearchItems(append, res, null);
            })
            .catch(function (err) {
                displaySearchItems(append, null, err.message);
            })
            .finally(function () {
                showLibLoader(false);
                waitForLoad = false;
            });
    }

    function displaySearchItems(append, res, err) {
        var holder = elements.docsHolder;

        if (!append) {
            clearLibrary();
        }

        var first = false;
        if (!lastSearch.obj) first = true;
        if (err) {
            if (first) lastSearch.obj = {};
            lastSearch.obj.next = null;
        } else {
            lastSearch.obj = res;
        }

        var page = document.createElement("div");
        page.classList.add("page" + holder.children.length);
        if (res && res.items.length > 0) {
            for (var i in res.items) {
                page.appendChild(buildDocElement(res.items[i]));
            }
        } else if (err || first) {
            if (err) {
                showError(err);
            } else {
                var notFound = document.createElement("div");
                notFound.textContent = getMessage("Nothing found");
                notFound.classList.add("searchInfo");
                page.appendChild(notFound);
            }
        }
        holder.appendChild(page);

        docsScroller.onscroll();
    }

    function buildDocElement(item) {
        var root = document.createElement("div");
        root.classList.add("doc");

        var checkHolder = document.createElement("div");
        var checkWrapper = document.createElement("div");
        checkWrapper.classList.add("checkbox");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        if (selected.items[item.key]) {
            check.checked = true;
            selected.checks[item.key] = check;
        }
        checkWrapper.appendChild(check);
        checkWrapper.appendChild(document.createElement("span"));
        checkHolder.appendChild(checkWrapper);

        var docInfo = document.createElement("div");
        docInfo.classList.add("docInfo");

        var title = document.createElement("div");
        title.textContent = item.data.title;
        title.classList.add("truncate-text");
        docInfo.appendChild(title);

        if (item.data.creators && item.data.creators.length > 0) {
            var authors = document.createElement("div");
            authors.textContent = item.data.creators
                .map(function (a) { return a.lastName + ", " + a.firstName; })
                .join("; ");
            authors.setAttribute("title", authors.textContent);
            authors.classList.add("secondary-text");
            authors.classList.add("truncate-text");
            authors.classList.add("nowrap");
            docInfo.appendChild(authors);
        }

        var source = document.createElement("div");
        if (item.data.publisher || item.data.place) {
            source.textContent = item.data.publisher || item.data.place;
        }
        if (item.data.date) {
            if (source.textContent) {
                source.textContent += " (" + item.data.date + ")";
            } else {
                source.textContent = item.data.date;
            }
        }
        source.setAttribute("title", source.textContent);
        source.classList.add("secondary-text");
        source.classList.add("truncate-text");
        source.classList.add("nowrap");
        docInfo.appendChild(source);

        root.appendChild(checkHolder);
        root.appendChild(docInfo);

        function selectItem(input, item) {
            return function (e) {
                input.checked = !input.checked;
                if (input.checked) {
                    addSelected(item, input);
                } else {
                    removeSelected(item.key);
                }
            };
        }

        var f = selectItem(check, item);
        checkWrapper.onclick = f;
        docInfo.onclick = f;

        return root;
    }

    function addSelected(item, input) {
        var el = buildSelectedElement(item);
        selected.items[item.key] = item;
        selected.html[item.key] = el;
        selected.checks[item.key] = input;
        elements.selectedHolder.appendChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    }

    function removeSelected(key) {
        var el = selected.html[key];
        delete selected.items[key];
        delete selected.html[key];
        if (selected.checks[key]) {
            selected.checks[key].checked = false;
            delete selected.checks[key];
        }
        elements.selectedHolder.removeChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    }

    function buildSelectedElement(item) {
        var root = document.createElement("div");
        root.classList.add("selDoc");

        var name = document.createElement("span");
        name.textContent = item.data.title;
        name.setAttribute("title", item.data.title);

        var year = document.createElement("span");
        if (item.data.date) {
            year.textContent = item.data.date;
        }

        var remove = document.createElement("span");
        remove.onclick = function () {
            removeSelected(item.key);
        };

        root.appendChild(name);
        root.appendChild(year);
        root.appendChild(remove);

        return root;
    }

    function checkSelected() {
        switchClass(elements.buttonsWrapper, displayNoneClass, selected.count() <= 0);
    }

    function formatInsertBibliography() {
        if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }

        var keys = [];
        for (var key in selected.items) {
            keys.push(key);
        }
        if (!keys.length) return;

        sdk.format(keys, selectedStyle, selectedLocale)
            .then(function (res) {
                insertInDocument(res);
            })
            .catch(function (err) {
                showError(err);
            });
    }

    function insertInDocument(html) {
        window.Asc.plugin.executeMethod("PasteHtml", [html]);
    };

})();