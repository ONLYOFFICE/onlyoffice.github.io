/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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

    var defaultStyles = 
    {
        "American Medical Association 11th edition" : 1, "American Political Science Association" : 1,
        "American Psychological Association 7th edition" : 1, "American Sociological Association 6th edition" : 1,
        "Chicago Manual of Style 17th edition (author-date)" : 1, "Cite Them Right 10th edition - Harvard" : 1,
        "IEEE" : 1, "Modern Humanities Research Association 3rd edition (note with bibliography)" : 1,
        "Modern Language Association 8th edition" : 1, "Nature" : 1
    };

    var locales = {};
    var styles = {};
    var selectedLocale;
    var selectedStyle;

    var sdk = null;

    var loginStateHash = null;

    var redirectUrl;
    var mendAppId;

    var authFlow = {
        authenticate: function () {
            showLoader(true);            

            loginStateHash = new Date().getTime();

            var link = "https://api.mendeley.com/oauth/authorize?client_id=" + mendAppId + "&redirect_uri=" + encodeURI(redirectUrl) + "&response_type=token&scope=all&state=" + loginStateHash;
            if (window.Asc.plugin.mendeley && window.Asc.plugin.mendeley.auth) {
                link = window.Asc.plugin.mendeley.auth();
            }

            var wnd = window.open(link, null, "width=500,height=700");
            var timer = setInterval(function () {
                if (wnd.closed) {
                    clearInterval(timer);
                    showLoader(false);
                }
            }, 500);
        },
        getToken: function () {
            return localStorage.getItem("mendToken");
        },
        refreshToken: function () {
            return false;
        }
    };

    var lastSearch = {
        text: "",
        catObj: null,
        ownObj: null,
    };
    var elements = {
        loader: document.getElementById("loader"),
        libLoader: document.getElementById("libLoader"),
        error: document.getElementById("errorWrapper"),

        contentHolder: document.getElementById("content"),
        docsHolder: document.getElementById("docsHolder"),
        docsThumb: document.getElementById("docsThumb"),

        configState: document.getElementById("configState"),
        redirectConfigUrl: document.getElementById("redirectConfig"),
        redirectUrlCopy: document.getElementById("redirectUrlCopy"),
        reconfigBtn: document.getElementById("reconfigBtn"),
        appIdConfigField: document.getElementById("appIdField"),
        saveConfigBtn: document.getElementById("saveConfigBtn"),

        loginState: document.getElementById("loginState"),

        mainState: document.getElementById("mainState"),
        logoutLink: document.getElementById("logoutLink"),

        loginBtn: document.getElementById("loginBtn"),

        selectedWrapper: document.getElementById("selectedWrapper"),
        selectedHolder: document.getElementById("selectedHolder"),
        selectedThumb: document.getElementById("selectedThumb"),
        buttonsWrapper: document.getElementById("buttonsWrapper"),

        searchLabel: document.getElementById("searchLabel"),
        searchClear: document.getElementById("searchClear"),
        searchField: document.getElementById("searchField"),

        styleWrapper: document.getElementById("styleWrapper"),
        styleSelectList: document.getElementById("styleSelectList"),
        styleSelectListOther: document.getElementById("styleSelectedListOther"),
        styleSelect: document.getElementById("styleSelect"),
        styleLang: document.getElementById("styleLang"),

        insertBibBtn: document.getElementById("insertBibBtn"),
        insertLinkBtn: document.getElementById("insertLinkBtn"),
        cancelBtn: document.getElementById("cancelBtn"),
    };

    var selectedScroller;
    var docsScroller;

    window.Asc.plugin.init = function () {
        sdk = MendeleySDK({
            authFlow: authFlow
        });

        window.Asc.plugin.onTranslate = applyTranslations;

        redirectUrl = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "oauth.html");
        elements.redirectConfigUrl.value = redirectUrl;

        elements.redirectUrlCopy.onclick = function (e) {
            elements.redirectConfigUrl.select();
            document.execCommand("copy");
            window.open("https://dev.mendeley.com/myapps.html", '_blank');
        };

        elements.reconfigBtn.onclick = function (e) {
            clearSettings();
            switchAuthState('config');
        };

        elements.loginBtn.onclick = function (e) {
            if (e.target.classList.contains(displayNoneClass)) return true;
            authFlow.authenticate();
            return true;
        };

        elements.logoutLink.onclick = function (e) {
            if (e.target.classList.contains(displayNoneClass)) return true;
            document.cookie = "mendToken=; max-age=0";
            switchAuthState('login');
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

            loadLibrary(sdk.documents.search({ query: text, limit: 20, view: "bib" }), false, true);
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
            lastSearch.text = "";
            clearLibrary();
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
            var appid = elements.appIdConfigField.value.trim();
            if (appid) {
                saveSettings(appid);
                switchAuthState("login");
            } else {
                showError(getMessage("AppId is empty"));
            }
        };

        elements.insertBibBtn.onclick = formatInsertBibliography;
        elements.insertLinkBtn.onclick = formatInsertLink;

        selectedScroller = initScrollBox(elements.selectedHolder, elements.selectedThumb);
        docsScroller = initScrollBox(elements.docsHolder, elements.docsThumb, checkDocsScroll);

        fetch("https://www.zotero.org/styles-files/styles.json")
            .then(function (resp) { return resp.json(); })
            .then(function (json) {
                var lastStyle = getLastUsedStyle();
                var found = false;

                var onStyleSelect = function (f) {
                    return function (ev) {
                        var sel = ev.target.getAttribute("data-value");
                        saveLastUsedStyle(sel);
                        f(ev);
                    }
                }

                var openOtherStyleList = function (list) {
                    return function (ev) {
                        elements.styleSelectListOther.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
                        ev.stopPropagation();
                        openList(list);
                    }
                }

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
                        newEl.onclick = onStyleSelect(onClickListElement(elements.styleSelectList, elements.styleSelect));
                        var event = new Event("click");
                        newEl.dispatchEvent(event);
                        openList(null);
                    }
                }
                for (var i = 0; i < json.length; i++) {
                    if (json[i].dependent != 0) continue;

                    var el = document.createElement("span");
                    el.setAttribute("data-value", json[i].name);
                    el.textContent = json[i].title;
                    if (defaultStyles[json[i].title] || json[i].name == lastStyle) {
                        if (json[i].name == lastStyle)
                            elements.styleSelectList.insertBefore(el, elements.styleSelectList.firstElementChild);
                        else
                            elements.styleSelectList.appendChild(el);

                        el.onclick = onStyleSelect(onClickListElement(elements.styleSelectList, elements.styleSelect));
                    } else {
                        elements.styleSelectListOther.appendChild(el);
                        el.onclick = onStyleSelectOther(elements.styleSelectList, elements.styleSelectListOther);
                    }
                    if (json[i].name == lastStyle) {
                        el.setAttribute("selected", "");
                        selectInput(elements.styleSelect, el, elements.styleSelectList);
                        found = true;
                    }
                }
                var other = document.createElement("span");
                other.textContent = "More Styles...";
                elements.styleSelectList.appendChild(other);
                other.onclick = openOtherStyleList(elements.styleSelectListOther);

                if (!found) {
                    var first = elements.styleSelectList.children[0];
                    first.setAttribute("selected", "");
                    selectInput(elements.styleSelect, first, elements.styleSelectList);
                }
            })
            .catch(function (err) { });

        elements.styleSelect.onkeyup = function () {
            var input = elements.styleSelect;
            var filter = input.value.toLowerCase();
            var list = (elements.styleSelectList.classList.contains(displayNoneClass)) ? elements.styleSelectListOther : elements.styleSelectList;

            for (var i = 0; i < list.children.length; i++) {
                var text = list.children[i].textContent || list.children[i].innerText;
                var hide = true;
                if (!filter || text.toLowerCase().indexOf(filter) > -1) {
                    hide = false;
                }
                switchClass(list.children[i], displayNoneClass, hide);
            }
        }

        elements.styleSelect.onselectchange = function (inp, val) {
            getStyle(val).catch(function () { });
            selectedStyle = val;
        };
        elements.styleLang.onselectchange = function (inp, val) {
            getLocale(val).catch(function () { });
            selectedLocale = val;
        };

        initSelectBoxes();
        elements.styleSelectList.onopen = function () {
            elements.styleSelectList.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
        }

        if (window.Asc.plugin.mendeley || getSettings()) {
            switchAuthState(authFlow.getToken() ? 'main' : 'login');
        } else {
            switchAuthState('config');
        }

        if (window.Asc.plugin.mendeley) {
            switchClass(elements.reconfigBtn, displayNoneClass, true);
        }
    };

    OAuthError = function (error) {
        showError(error);
    };

    OAuthCallback = function (token, state) {
        if (state != loginStateHash && !window.Asc.plugin.mendeley) {
            OAuthError("State validation failed. Possible CSRF attack.");
            return;
        }
        localStorage.setItem('mendToken', token);
        switchAuthState('main');
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
            var arrow = document.createElement("span");
            arrow.classList.add("selectArrow");
            arrow.appendChild(document.createElement("span"));
            arrow.appendChild(document.createElement("span"));
            holder.appendChild(arrow);

            for (var k = 0; k < holder.getElementsByClassName("selectList").length; k++) {
                var list = holder.getElementsByClassName("selectList")[k];
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

                var f = function (list, input) {
                    return function (ev) {
                        ev.stopPropagation();
                        if (!elements.styleSelectListOther.classList.contains(displayNoneClass))
                        return true;

                        if (list.onopen) {
                            list.onopen();
                        }
                        if (!input.hasAttribute("readonly")) {
                            input.select();
                        }
                        openList(list);
                        return true;
                    };
                };

                if (k !== 1) {
                    input.onclick = f(list, input);
                    arrow.onclick = f(list, input);
                }
                selectLists.push(list);
            }
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

    function saveLastUsedStyle(id) {
        localStorage.setItem("mendStyleId", id);
    }

    function getLastUsedStyle() {
        return localStorage.getItem("mendStyleId");
    }

    function saveSettings(id) {
        mendAppId = id;
        localStorage.setItem("mendAppId", id);
    }

    function getSettings() {
        mendAppId = localStorage.getItem("mendAppId");
        return mendAppId;
    }

    function clearSettings() {
        mendAppId = null;
        localStorage.removeItem("mendAppId");
    }

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    }

    var loadingLocale = false;
    function getLocale(langTag) {
        return new Promise(function (res, rej) {
            if (locales[langTag] != null) {
                res(locales[langTag]);
            } else {
                loadingLocale = true;
				// https://raw.githubusercontent.com/citation-style-language/locales/master/locales-
				// https://cdn.jsdelivr.net/gh/citation-style-language/locales@master/locales-
                fetch("https://raw.githubusercontent.com/citation-style-language/locales/master/locales-" + langTag + ".xml")
                    .then(function (resp) { return resp.text(); })
                    .then(function (text) { locales[langTag] = text; res(text); loadingLocale = false; })
                    .catch(function (err) { rej(err); loadingLocale = false; });
            }
        });
    }

    var loadingStyle = false;
    function getStyle(styleName) {
        return new Promise(function (res, rej) {
            if (styles[styleName] != null) {
                res(styles[styleName]);
            } else {
                loadingStyle = true;
                fetch("https://www.zotero.org/styles/" + styleName)
                    .then(function (resp) { return resp.text(); })
                    .then(function (text) { styles[styleName] = text; res(text); loadingStyle = false; })
                    .catch(function (err) { rej(err); loadingStyle = false; });
            }
        });
    }

    function showLoader(show) {
        switchClass(elements.loader, displayNoneClass, !show);
        switchClass(elements.contentHolder, blurClass, show);
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

    function loginState(hide) {
        switchClass(elements.loginState, displayNoneClass, hide);
    }

    function mainState(hide) {
        switchClass(elements.mainState, displayNoneClass, hide);
        switchClass(elements.logoutLink, displayNoneClass, hide);
    }

    var currentAuthState;
    function switchAuthState(state) {
        currentAuthState = state;
        configState(true);
        loginState(true);
        mainState(true);
        switch (state) {
            case 'config':
                configState(false);
                break;
            case 'login':
                loginState(false);
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

            if (!lastSearch.ownObj && !lastSearch.catObj && !lastSearch.text.trim()) return;

            waitForLoad = true;
            loadTimeout = setTimeout(function () {
                if (shouldLoadMore(holder)) {
                    if (lastSearch.ownObj && lastSearch.ownObj.next) {
                        loadLibrary(lastSearch.ownObj.next(), true, true);
                    } else if (!lastSearch.catObj) {
                        // always error
                        // loadLibrary(sdk.search.catalog({ query: lastSearch.text, limit: 20, view: "bib" }), true, false);
                    } else if (lastSearch.catObj.next) {
                        loadLibrary(lastSearch.catObj.next(), true, false);
                    }
                } else {
                    waitForLoad = false;
                }
            }, 500);

        }
    }

    function shouldLoadMore(holder) {
        if (currentAuthState != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) return false;
        if ((!lastSearch.ownObj || !lastSearch.ownObj.next) && (lastSearch.catObj && !lastSearch.catObj.next)) return false;

        return true;
    }

    function clearLibrary() {
        var holder = elements.docsHolder;
        while (holder.lastChild) {
            holder.removeChild(holder.lastChild);
        }
        holder.scrollTop = 0;
        lastSearch.catObj = null;
        lastSearch.ownObj = null;
        docsScroller.onscroll();
    }

    function loadLibrary(promise, append, own) {
        showLibLoader(true);
        promise
            .then(function (res) {
                displaySearchItems(append, own, res, null);
            })
            .catch(function (err) {
                displaySearchItems(append, own, null, err.message);
            })
            .finally(function () {
                showLibLoader(false);
                waitForLoad = false;
            });
    }

    function displaySearchItems(append, own, res, err) {
        var holder = elements.docsHolder;

        if (!append) {
            clearLibrary();
        }

        var first = false;
        if (own) {
            if (!lastSearch.ownObj) first = true;
            if (err) {
                if (first) lastSearch.ownObj = {};
                lastSearch.ownObj.next = null;
            } else {
                lastSearch.ownObj = res;
            }
        } else {
            if (!lastSearch.catObj) first = true;
            if (err) {
                if (first) lastSearch.catObj = {};
                lastSearch.catObj.next = null;
            } else {
                lastSearch.catObj = res;
            }
        }

        if (!own && first) {
            var divider = document.createElement("div");
            divider.textContent = getMessage("Search in all literature:");
            divider.classList.add("searchDivider");
            divider.classList.add("defaultlable");
            holder.appendChild(divider);
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
                notFound.textContent = own ? getMessage("Nothing found in your library") : getMessage("Nothing found");
                notFound.classList.add("searchInfo");
                notFound.classList.add("defaultlable");
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
        if (selected.items[item.id]) {
            check.checked = true;
            selected.checks[item.id] = check;
        }
        checkWrapper.appendChild(check);
        checkWrapper.appendChild(document.createElement("span"));
        checkHolder.appendChild(checkWrapper);

        var docInfo = document.createElement("div");
        docInfo.classList.add("docInfo");

        var title = document.createElement("div");
        title.textContent = item.title;
        title.classList.add("truncate-text");
        docInfo.appendChild(title);

        if (item.authors && item.authors.length > 0) {
            var authors = document.createElement("div");
            authors.textContent = item.authors
                .map(function (a) { return a.last_name + ", " + a.first_name; })
                .join("; ");
            authors.setAttribute("title", authors.textContent);
            authors.classList.add("secondary-text");
            authors.classList.add("truncate-text");
            authors.classList.add("nowrap");
            docInfo.appendChild(authors);
        }

        var source = document.createElement("div");
        if (item.source || item.publisher) {
            source.textContent = item.source || item.publisher;
        }
        if (item.year) {
            if (source.textContent) {
                source.textContent += " (" + item.year + ")";
            } else {
                source.textContent = item.year;
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
                    removeSelected(item.id);
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
        selected.items[item.id] = item;
        selected.html[item.id] = el;
        selected.checks[item.id] = input;
        elements.selectedHolder.appendChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    }

    function removeSelected(id) {
        var el = selected.html[id];
        delete selected.items[id];
        delete selected.html[id];
        if (selected.checks[id]) {
            selected.checks[id].checked = false;
            delete selected.checks[id];
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
        name.textContent = item.title;
        name.setAttribute("title", item.title);

        var year = document.createElement("span");
        if (item.year) {
            year.textContent = item.year;
        }

        var remove = document.createElement("span");
        remove.innerHTML = "&#xd7";
        remove.classList.add("defaultlable");
        remove.onclick = function () {
            removeSelected(item.id);
        };

        root.appendChild(name);
        root.appendChild(year);
        root.appendChild(remove);

        return root;
    }

    function checkSelected() {
        switchClass(elements.buttonsWrapper, displayNoneClass, selected.count() <= 0);
    }

    var repeatTimeout;
    function formatInsertBibliography() {
        if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }

        clearTimeout(repeatTimeout);
        if (loadingStyle || loadingLocale) {
            repeatTimeout = setTimeout(formatInsertBibliography, 100);
            return;
        }

        var data = {};
        var keys = [];
        for (var item in selected.items) {
            data[item] = convertMendeleyToCSL(selected.items[item]);
            keys.push(item);
        }

        try {
            var formatter = new CSL.Engine({ retrieveLocale: function (id) { return locales[id]; }, retrieveItem: function (id) { return data[id]; } }, styles[selectedStyle], selectedLocale, true);
            formatter.updateItems(keys);

            insertInDocument(formatter.makeBibliography()[1]);
        } catch (e) {
            showError(e);
        }
    }
    function formatInsertLink() {
        if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }

        clearTimeout(repeatTimeout);
        if (loadingStyle || loadingLocale) {
            repeatTimeout = setTimeout(formatInsertLink, 100);
            return;
        }

        var data = {};
        var keys = [];
        var keysL = [];
        for (var item in selected.items) {
            data[item] = convertMendeleyToCSL(selected.items[item]);
            keys.push(item);
            keysL.push({id:item});
        }

        try {
            var formatter = new CSL.Engine({ retrieveLocale: function (id) { return locales[id]; }, retrieveItem: function (id) { return data[id]; } }, styles[selectedStyle], selectedLocale, true);
            formatter.updateItems(keys);

            insertInDocument(formatter.makeCitationCluster(keysL));
        } catch (e) {
            showError(e);
        }
    }

    function insertInDocument(html) {
        if (html) {
            window.Asc.plugin.executeMethod("PasteHtml", [(html.join) ? html.join('') : html]);
        } else {
            showError(getMessage("Bibliography cannot be created with selected style"));
        }
    };

    function convertMendeleyWriter(csl, item, fieldTo, fieldFrom) {
        if (!item[fieldFrom] || item[fieldFrom].length <= 0) return;
        if (!csl[fieldTo]) csl[fieldTo] = [];

        for (var i = 0; i < item[fieldFrom].length; i++) {
            csl[fieldTo].push({
                given: item.first_name,
                family: item.last_name
            });
        }
    }

    function convertMendeleyDate(csl, item, field) {
        if (!item.year) return;

        var date = [item.year];

        if (item.month) {
            date.push(item.month);
            if (item.day) {
                date.push(item.day);
            }
        }

        csl[field] = {
            "date-parts": [
                date
            ]
        };
    }

    function convertMendeleyToCSL(item) {
        var cslData = {};

        if (item.citation_key) {
            cslData.id = item.citation_key;
        } else {
            cslData.id = item.id;
        }

        cslData.type = convertMendeleyTypeToCSLType(item.type);

        convertMendeleyWriter(cslData, item, "author", "authors");

        convertMendeleyWriter(cslData, item, "editor", "editors");
        convertMendeleyWriter(cslData, item, "collection-editor", "editors");
        convertMendeleyWriter(cslData, item, "container-author", "editors");

        convertMendeleyWriter(cslData, item, "collection-editor", "series_editor");
        convertMendeleyWriter(cslData, item, "container-author", "series_editor");

        convertMendeleyWriter(cslData, item, "translators", "translators");

        convertMendeleyDate(cslData, item, "issued");
        convertMendeleyDate(cslData, item, "event-date");

        if (item.revision || item.series_number) {
            cslData.number = item.revision || item.series_number;
        }

        if (item.series || item.source) {
            cslData["container-title"] = item.series || item.source;
            cslData["collection-title"] = item.series || item.source;
        }

        if (item.type == "patent" && item.source) {
            cslData.publisher = item.source;
        } else if (item.publisher) {
            cslData.publisher = item.publisher;
        }

        if (item.identifiers) {
            if (item.identifiers.doi) cslData.DOI = item.identifiers.doi;
            if (item.identifiers.isbn) cslData.ISBN = item.identifiers.isbn;
            if (item.identifiers.issn) cslData.ISSN = item.identifiers.issn;
            if (item.identifiers.pmid) cslData.PMID = item.identifiers.pmid;
        }

        if (item.keywords) {
            cslData.keyword = item.keywords.toString();
        }

        if (item.websites && item.websites.length > 0) {
            cslData.URL = item.websites[0];
        }

        if (item.abstract) cslData.abstract = item.abstract;
        if (item.chapter) cslData["chapter-number"] = item.chapter;
        if (item.city) {
            cslData["event-place"] = item.city;
            cslData["publisher-place"] = item.city;
        }
        if (item.edition) cslData.edition = item.edition;
        if (item.genre) cslData.genre = item.genre;
        if (item.issue) cslData.issue = item.issue;
        if (item.language) cslData.language = item.language;
        if (item.medium) cslData.medium = item.medium;
        if (item.short_title) cslData["short-title"] = item.short_title;
        if (item.title) cslData.title = item.title;
        if (item.volume) cslData.volume = item.volume;

        return cslData;
    }

    function convertMendeleyTypeToCSLType(str) {
        str = str.toLowerCase();
        switch (str) {
            case "bill":
            case "book":
            case "patent":
            case "report":
            case "statute":
            case "thesis":
                return str;
            case "book_section":
                return "chapter";
            case "conference_proceedings":
                return "paper-conference";
            case "encyclopedia_article":
                return "entry-encyclopedia";
            case "film":
                return "motion_picture";
            case "hearing":
                return "speech";
            case "journal":
                return "article-journal";
            case "magazine_article":
                return "article-magazine";
            case "newspaper_article":
                return "article-newspaper";
            case "television_broadcast":
                return "broadcast";
            case "web_page":
                return "webpage";
            case "case":
            case "computer_program":
            case "generic":
            case "working_paper":
            default:
                return "article";
        }
    }

})();
