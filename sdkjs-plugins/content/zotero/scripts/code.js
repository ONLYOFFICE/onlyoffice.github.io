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
	var counter = 0; // счетчик отправленных запросов (используется чтобы знать показывать "not found" или нет)
    var displayNoneClass = "display-none";
    var blurClass = "blur";
	var formatter = null;
	var cslItems = {count: 0};
	var citPrefix = "ZOTERO_CITATION ";
	var bibPrefix = "ZOTERO_BIBLIOGRAPHY";
    var repeatTimeout = null;
    var loadTimeout = null;
	var loadingStyle = false;
	var loadingLocale = false;
	var bNumFormat = false;
	let bibPlaceholder = "Please insert some citation into the document.";
	var bUserItemsUpdated = false;
	var bGroupsItemsUpdated = false;
	// TODO добавить варианты сохранения для совместимости с другими редакторами (ms, libre, google, мой офис), пока есть вариант сохранить как текст
	// TODO добавить ещё обработку событий (удаление линков) их не нужно удалять из библиографии автоматически (это делать только при обновлении библиографии или refresh), но их точно нужно удалить из formatter!
	// TODO добавить ещё обработку события (изменения линков), предлать пользователю обновить их или сохранить ручное форматирование (при ручном форматировании не меняем внешний вид цитаты при refresh (да и вообще не меняем))
	// TODO сейчас всегда делаем полный refresh при каждом действии (обновлении, вставке линков, вставке библиографии), потому что мы не знаем что поменялось без событий (потом добавить ещё сравнение контента)
	// TODO ms меняет линки (если стиль с нумерацией bNumFormat) делает их по порядку как документе (для этого нужно знать где именно в документе мы вставляем цитату, какая цитата сверху и снизу от текущего курсора)

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

    var lastSearch = {
        text: "",
        obj: null,
		groups: []
    };
    var elements = {
        loader: document.getElementById("loader"),
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

        styleWrapper: document.getElementById("styleWrapper"),
        styleSelectList: document.getElementById("styleSelectList"),
        styleSelectListOther: document.getElementById("styleSelectedListOther"),
        styleSelect: document.getElementById("styleSelect"),
        styleLang: document.getElementById("styleLang"),

        insertBibBtn: document.getElementById("insertBibBtn"),
        insertLinkBtn: document.getElementById("insertLinkBtn"),
        cancelBtn: document.getElementById("cancelBtn"),
		tempDiv: document.getElementById('div_temp'),
		refreshBtn: document.getElementById('refreshBtn'),
		saveAsTextBtn: document.getElementById('saveAsTextBtn'),
		synchronizeBtn: document.getElementById('synchronizeBtn'),
		checkOmitAuthor: document.getElementById('omitAuthor')
    };

    var selectedScroller;
    var docsScroller;

    window.Asc.plugin.init = function () {
		showLoader(true);
		updateCslItems(true, false, false, false);
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
			lastSearch.obj = null;
			lastSearch.groups = [];
            clearLibrary();
			var groups = sdk.getUserGropus();
            loadLibrary(sdk.items(text), true, true, !groups.length, false, true);
			if (groups.length) {
				for (var i = 0; i < groups.length; i++) {
					loadLibrary(sdk.groups(lastSearch.text, groups[i]), true, false, (i == groups.length -1), true, true );
				}
			}
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

		elements.refreshBtn.onclick = function() {
			showLoader(true);
			updateCslItems(true, true, false, false);
		};

		elements.synchronizeBtn.onclick = function() {
			synchronizeData();
		};

        elements.insertBibBtn.onclick = function() { 
			showLoader(true);
			// TODO #there
			// updateCslItems(true, false, true, false);
			updateCslItems(true, true, true, false);
		};

		elements.insertLinkBtn.onclick = function() {
			showLoader(true);
			updateCslItems(true, false, false, true);
		};

		elements.saveAsTextBtn.onclick = function() {
			showLoader(true);
			saveAs();
		}

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
                };

				var openOtherStyleList = function (list) {
                    return function (ev) {
                        elements.styleSelectListOther.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
                        ev.stopPropagation();
                        openList(list);
                    }
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
                        newEl.onclick = onStyleSelect(onClickListElement(elements.styleSelectList, elements.styleSelect));
                        var event = new Event("click");
                        newEl.dispatchEvent(event);
                        openList(null);
                    }
                };

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
                        selectInput(elements.styleSelect, el, elements.styleSelectList, false);
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
                    selectInput(elements.styleSelect, first, elements.styleSelectList, false);
                }
            })
            .catch(function (err) { });

        elements.styleSelect.oninput = function (e, filter) {
            var input = elements.styleSelect;
            var filter = filter !== undefined ? filter : input.value.toLowerCase();
            var list = (elements.styleSelectList.classList.contains(displayNoneClass)) ? elements.styleSelectListOther : elements.styleSelectList;

            for (var i = 0; i < list.children.length; i++) {
                var text = list.children[i].textContent || list.children[i].innerText;
                var hide = true;
                if (!filter || text.toLowerCase().indexOf(filter) > -1) {
                    hide = false;
                }
                switchClass(list.children[i], displayNoneClass, hide);
            }
        };

        elements.styleSelect.onselectchange = function (inp, val, isClick) {
			showLoader(true);
            getStyle(val)
			.then(function(style) {
				bNumFormat = (style.indexOf('citation-format="numeric"') !== -1);
				if (isClick)
					updateCslItems(true, true, false, false);
			})
			.catch(function () { })
			.finally(function() {
				if (locales[selectedLocale] && styles[selectedStyle]) showLoader(false);
			});
            selectedStyle = val;
			elements.styleSelect.oninput(null, '');
        };

        elements.styleLang.onselectchange = function (inp, val, isClick) {
			showLoader(true);
			saveLanguage(val);
            getLocale(val)
			.then(function() {
				if (isClick)
					updateCslItems(true, true, false, false);
			})
			.catch(function () { })
			.finally(function() {
				if (locales[selectedLocale] && styles[selectedStyle]) showLoader(false);
			});
            selectedLocale = val;
        };

        initSelectBoxes();
        elements.styleSelectList.onopen = function () {
            elements.styleSelectList.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
        }

        if (sdk.hasSettings()) {
            switchAuthState('main');
        } else {
            switchAuthState('config');
        }
    };

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        var rules = '.selectArrow > span { background-color: ' + window.Asc.plugin.theme['text-normal'] + '}\n';
        rules += '.link { color : ' + window.Asc.plugin.theme['text-normal'] + ';}\n';
        rules += '.control.select { background-color : ' + window.Asc.plugin.theme['background-normal'] + ';}\n';
        rules += '.control { color : ' + window.Asc.plugin.theme['text-normal'] + '; border-color : ' + window.Asc.plugin.theme['border-regular-control'] + '}\n';
        rules += '.selectList > span { background-color: ' + window.Asc.plugin.theme['background-normal'] + '; ';
        rules += 'color : ' + window.Asc.plugin.theme['text-normal'] + '; }\n';
        rules += '.selectList > span:hover { background-color : ' + window.Asc.plugin.theme['highlight-button-hover'] + '; color : ' + window.Asc.plugin.theme['text-normal'] + '}\n';
        rules += '.selectList > span[selected=""] { background-color : ' + window.Asc.plugin.theme['highlight-button-pressed'] + ';' + '; color : ' + window.Asc.plugin.theme['text-normal'] + '}';
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rules;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
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
		var savedLang = restoreLanguage();
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
                        if (list.children[j].getAttribute("data-value") == savedLang) {
							list.children[j].setAttribute("selected", "");
                            selectInput(input, list.children[j], list, false);
                            def = true;
                        }

                        list.children[j].onclick = onClickListElement(list, input);
                    }
                    if (!def) {
                        selectInput(input, list.children[0], list, false);
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
    };

    function openList(el) {
        for (var i = 0; i < selectLists.length; i++) {
            var close = true;
            if (selectLists[i] === el) {
                close = false;
            }
			if (close && selectLists[i] === elements.styleSelectList)
				elements.styleSelect.oninput(null, '');

            switchClass(selectLists[i], displayNoneClass, close);
        }
    };

    function selectInput(input, el, list, isClick) {
        input.value = el.textContent;
        var val = el.getAttribute("data-value");
        input.setAttribute("data-value", val);
        input.setAttribute("title", el.textContent);
        if (input.onselectchange) {
            input.onselectchange(input, val, isClick);
        }
        switchClass(list, displayNoneClass, true);
    };

    function onClickListElement(list, input) {
        return function (ev) {
            var sel = ev.target.getAttribute("data-value");
            for (var i = 0; i < list.children.length; i++) {
                if (list.children[i].getAttribute("data-value") == sel) {
                    list.children[i].setAttribute("selected", "");
                    selectInput(input, list.children[i], list, true);
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
            if (el.attributes["title"]) el.attributes["title"].value = getMessage(el.attributes["title"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    };

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    };

    function saveLastUsedStyle(id) {
        localStorage.setItem("zoteroStyleId", id);
    };

    function getLastUsedStyle() {
        return localStorage.getItem("zoteroStyleId");
    };

	function saveLanguage(id) {
		localStorage.setItem("zoteroLang", id);
	};

	function restoreLanguage() {
		return localStorage.getItem("zoteroLang") || "en-US";
	};

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
    };

	function showLoader(show) {
        switchClass(elements.loader, displayNoneClass, !show);
        switchClass(elements.contentHolder, blurClass, show);
    };

    function showLibLoader(show) {
        switchClass(elements.libLoader, displayNoneClass, !show);
    };

    function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    };

    function configState(hide) {
        switchClass(elements.configState, displayNoneClass, hide);
    };

    function mainState(hide) {
        switchClass(elements.mainState, displayNoneClass, hide);
        switchClass(elements.logoutLink, displayNoneClass, hide);
    };

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
    };

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
    };

    function checkDocsScroll(holder) {
        if (shouldLoadMore(holder)) {

            if (loadTimeout) {
                clearTimeout(loadTimeout);
            }

            if (!lastSearch.obj && !lastSearch.text.trim() && !lastSearch.groups.length) return;

            loadTimeout = setTimeout(function () {
                if (shouldLoadMore(holder)) {
                    loadLibrary(lastSearch.obj.next(), true, true, !lastSearch.groups.length, false, false);
					for (var i = 0; (i < lastSearch.groups.length && lastSearch.groups[i].next); i++) {
						loadLibrary(sdk.groups(lastSearch.groups[i].next()), true, false, ( i == (lastSearch.groups.length -1) ), true, false, lastSearch.groups[i] );
					}
                } else {
                }
            }, 500);

        }
    };

    function shouldLoadMore(holder) {
        if (currentAuthState != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) return false;
		var flag = true;
		lastSearch.groups.forEach(function(el) {
			if (el.next) flag = false;
		});
        if (!lastSearch.obj || !lastSearch.obj.next || !flag) return false;

        return true;
    };

    function clearLibrary() {
        var holder = elements.docsHolder;
        while (holder.lastChild) {
            holder.removeChild(holder.lastChild);
        }
        holder.scrollTop = 0;
        docsScroller.onscroll();
    };

    function loadLibrary(promise, append, showLoader, hideLoader, isGroup, bCount) {
		if (showLoader) showLibLoader(true);
		if (bCount) counter++;
        promise
            .then(function (res) {
				if (bCount) counter--;
                displaySearchItems(append, res, null, hideLoader, isGroup, (bCount && !counter) );
            })
            .catch(function (err) {
				if (bCount) counter--;
                displaySearchItems(append, {}, err.message, hideLoader, isGroup, (bCount && !counter) );
            })
            .finally(function () {	
				if (hideLoader) {
					showLibLoader(false);
				}
            });
    };

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
    };

    function getLocale(langTag) {
        return new Promise(function (res, rej) {
            if (locales[langTag] != null) {
                res(locales[langTag]);
            } else {
                loadingLocale = true;
				// https://raw.githubusercontent.com/citation-style-language/locales/master/locales-af-ZA.xml
				// https://cdn.jsdelivr.net/gh/citation-style-language/locales@master/locales-
                fetch("https://raw.githubusercontent.com/citation-style-language/locales/master/locales-" + langTag + ".xml")
                    .then(function (resp) { return resp.text(); })
                    .then(function (text) { locales[langTag] = text; res(text); loadingLocale = false; })
                    .catch(function (err) { rej(err); loadingLocale = false; });
            }
        });
    };

    function displaySearchItems(append, res, err, hideLoader, isGroup, showNotFound) {
        var holder = elements.docsHolder;

        if (!append) {
            clearLibrary();
        }

        var first = false;
        if (!lastSearch.obj && (res && res.items.items && !res.items.items.length) ) first = true;
        if (err) {
            if (first) {
				lastSearch.obj = null;
				lastSearch.groups = [];
			} 
            lastSearch.obj.next = null;
        } else {
			if (isGroup && res && res.next)
				lastSearch.groups.push(res);
			else
            	lastSearch.obj = (res && res.items.items.length ? res : null);
        }

        var page = document.createElement("div");
        page.classList.add("page" + holder.children.length);
        if (res && res.items.items.length > 0) {
			for (let index = 0; index < res.items.items.length; index++) {
				let item = res.items.items[index];
				item[ (isGroup ? "groupID" : "userID") ] = res.id;
				var pos = item.id.indexOf("/") + 1;
				if (pos)
					item.id = item.id.substring(pos)

                page.appendChild(buildDocElement(item));
            }
        } else if (err || first) {
            if (err) {
                showError(err);
            } else if (showNotFound) {
                var notFound = document.createElement("div");
                notFound.textContent = getMessage("Nothing found");
                notFound.classList.add("searchInfo");
                page.appendChild(notFound);
            }
        }
        holder.appendChild(page);

        docsScroller.onscroll();
    };

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

        if (item.author && item.author.length > 0) {
            var authors = document.createElement("div");
            authors.textContent = item.author
                .map(function (a) {
                    return a.family + ", " + a.given;
                })
                .join("; ");
            authors.setAttribute("title", authors.textContent);
            authors.classList.add("secondary-text");
            authors.classList.add("truncate-text");
            authors.classList.add("nowrap");
            docInfo.appendChild(authors);
        }

        var source = document.createElement("div");
        if (item.publisher || item["publisher-place"]) {
            source.textContent = item.publisher || item["publisher-place"];
        }
        if (item.issued && item.issued['date-parts']) {
			var date = item.issued['date-parts'][0];
            if (source.textContent) {
                source.textContent += " (" + date.join("-") + ")";
            } else {
                source.textContent = date.join("-");
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
    };

    function addSelected(item, input) {
        var el = buildSelectedElement(item);
        selected.items[item.id] = item;
        selected.html[item.id] = el;
        selected.checks[item.id] = input;
        elements.selectedHolder.appendChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    };

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
    };

    function buildSelectedElement(item) {
        var root = document.createElement("div");
        root.classList.add("selDoc");

        var name = document.createElement("span");
        name.textContent = item.title;
        name.setAttribute("title", item.title);

        var year = document.createElement("span");
        if (item.issued && item.issued['date-parts']) {
            year.textContent = item.issued['date-parts'][0].join("-");
        }

        var remove = document.createElement("span");
        remove.onclick = function () {
            removeSelected(item.id);
        };
        remove.textContent = '×';

        root.appendChild(name);
        root.appendChild(year);
        root.appendChild(remove);

        return root;
    };

    function checkSelected() {
		if (selected.count() <= 0) {
			elements.insertLinkBtn.setAttribute('disabled', '');
			elements.cancelBtn.setAttribute('disabled', '');
		} else {
			elements.insertLinkBtn.removeAttribute('disabled', '');
			elements.cancelBtn.removeAttribute('disabled', '');
		}
    };

	function updateAllOrAddBib(bUpadteAll, bPastBib, bSyncronize) {
		if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }
		window.Asc.plugin.executeMethod("GetAllAddinFields", null, function(arrFields) {
			if (arrFields.length) {
				var updatedFields = [];
				var bibField = null;
				elements.tempDiv.innerHTML = formatter.makeBibliography()[1].join('');
				var bibliography = elements.tempDiv.innerText;
				arrFields.forEach(function(field) {
					if (bUpadteAll && ( field.Value.indexOf(citPrefix) !== -1 ) ) {
						var citationItems = JSON.parse(field.Value.slice(citPrefix.length)).citationItems;
						var keysL = [];
						citationItems = citationItems.map(function(item) {
							keysL.push({id:item.id, "suppress-author":item["suppress-author"]});
							return cslItems[item.id];
						});
						elements.tempDiv.innerHTML = formatter.makeCitationCluster(keysL);
						field["Content"] = elements.tempDiv.innerText;
						if (bSyncronize) {
							// if we make synchronization we must update value too
							field['Value'] = citPrefix + JSON.stringify( { citationItems: citationItems } );
						}
						updatedFields.push(field);
					} else if (field.Value.indexOf(bibPrefix) !== -1) {
						bibField = field;
					}
				});
				if (bibField) {
					bibField["Content"] = bibliography;
					updatedFields.push(bibField);
				} else if (bPastBib) {
					bibField = {
						"Value" : bibPrefix,
						"Content" : bibliography
					};
					window.Asc.plugin.executeMethod("AddAddinField", [bibField], function() {
						if (!updatedFields.length) {
							showLoader(false);
						}
					});
				}
				
				if (updatedFields.length) {
					window.Asc.plugin.executeMethod("UpdateAddinFields", [updatedFields], function() {
						showLoader(false);
					});
				}
			} else {
				showLoader(false);
			}
		});
	};

	function updateFormatter(bUpadteAll, bPastBib, bPastLink, bSyncronize) {
		clearTimeout(repeatTimeout);
        if (loadingStyle || loadingLocale || !styles[selectedStyle] || !locales[selectedLocale]) {
            repeatTimeout = setTimeout( function() {
				updateFormatter(bUpadteAll, bPastBib, bPastLink, bSyncronize);
			}, 100);
            return;
        }

		var arrItems = [];
		for (var item in cslItems) {
			if (item !== "count")
				arrItems.push(item);
		}

		formatter = new CSL.Engine({ retrieveLocale: function (id) { return locales[id]; }, retrieveItem: function (id) { return cslItems[id]; } }, styles[selectedStyle], selectedLocale, true);
		if (arrItems.length) {
			formatter.updateItems(arrItems);
		}
		if (bUpadteAll || bPastBib)
			updateAllOrAddBib(bUpadteAll, bPastBib, bSyncronize);
		
		if (bPastLink) {
			formatInsertLink();
		}
	};

	function updateCslItems(bUpdadeFormatter, bUpadteAll, bPastBib, bPastLink) {
		cslItems = {count: 0};
		window.Asc.plugin.executeMethod("GetAllAddinFields", null, function(arrFields) {
			if (arrFields.length) {
				var arrItems = [];
				var tmpObj = {};
				var bibField = null;
				arrFields.forEach(function(field) {
					if (field.Value.indexOf(citPrefix) !== -1) {
						var citationItems = JSON.parse(field.Value.slice(citPrefix.length)).citationItems;
						citationItems.forEach(function(item) {
							if (!tmpObj[item.id]) {
								tmpObj[item.id] = 1;
								arrItems.push(item);
							}
						});
					} else if(field.Value.indexOf(bibPrefix) !== -1) {
						bibField = field;
					}
				});

				if (arrItems.length) {
					arrItems.sort( function(itemA, itemB) { return (itemA.index > itemB.index ? 1 : -1) } );
					arrItems.forEach(function(item) {
						item.index = ++cslItems.count;
						cslItems[item.id] = item;
					});
				} else if (bUpdadeFormatter && bibField && bUpadteAll) {
					// нет смысла ещё раз искать поле библиографии
					bUpdadeFormatter = false;
					bibField["Content"] = getMessage(bibPlaceholder);
					window.Asc.plugin.executeMethod("UpdateAddinFields", [[bibField]], function() {
						showLoader(false);
					});
				}
			} else if (bUpdadeFormatter && bPastBib) {
				bibField = {
					"Value" : bibPrefix,
					"Content" : getMessage(bibPlaceholder)
				};
				window.Asc.plugin.executeMethod("AddAddinField", [bibField], function() {
					showLoader(false);
				});
			}
			if (bUpdadeFormatter)
				updateFormatter(bUpadteAll, bPastBib, bPastLink, false);
		});
	};

	function formatInsertLink() {
        if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }

		var bUpdateItems = false;
        var keys = [];
        var keysL = [];
        for (var item in selected.items) {
			if (!cslItems[item]) {
				cslItems.count++;
				cslItems[item] = convertToCSL(selected.items[item]);
				bUpdateItems = true;
			}
            keys.push(item);
			keysL.push({id:item, "suppress-author": cslItems[item]["suppress-author"]});
        }

        try {
			if (bUpdateItems) {
				var arrItems = [];
				for (var item in cslItems) {
					if (item !== "count")
						arrItems.push(item);
				}
				formatter.updateItems(arrItems);
			}

			var obj = {
				citationItems : []
			};
			keys.forEach(function(element) {
				removeSelected(element);
				obj.citationItems.push(cslItems[element]);
			});
			// TODO может ещё очистить поиск (подумать над этим)
			elements.tempDiv.innerHTML = formatter.makeCitationCluster(keysL);
			var field = {
				"Value" : citPrefix + JSON.stringify(obj),
				"Content" : elements.tempDiv.innerText
			};
			window.Asc.plugin.executeMethod("AddAddinField", [field], function() {
				showLoader(false);
				// TODO есть проблема, что в плагине мы индексы обновили, а вот в документе нет (по идее надо обновить и индексы в документе перед вставкой)
				// но тогда у нас уедет селект и новое поле вставится не там, поэтому пока обновлять приходитсяя в конце
				// такая же проблем с вставкой библиографии (при обнолении индексов в плагине надо бы их обновлять и в документе тоже)
				updateCslItems(true, true, false, false);
			});
        } catch (e) {
            showError(e);
        }
    };

    function convertToCSL(item) {
        var cslData = item;
		cslData.index = cslItems.count;
		cslData["short-title"] = item.shortTitle;
		cslData["title-short"] = item.shortTitle;
		cslData["suppress-author"] = elements.checkOmitAuthor.checked;

        return cslData;
    };

	function syncronizeCSLItem(item) {
		var pos = item.id.indexOf("/") + 1;
		if (pos)
			item.id = item.id.substring(pos);
		
		var cslItem = cslItems[item.id];
		item["short-title"] = item.shortTitle;
		item["title-short"] = item.shortTitle;

		for (var key in item) {
			if (Object.hasOwnProperty.call(item, key)) {
				cslItem[key] = item[key];
			}
		}
    };

	function saveAs() {
		// TODO потом добавить ещё форматы, пока только как текст
		window.Asc.plugin.executeMethod("GetAllAddinFields", null, function(arrFields) {
			let count = 0;
			arrFields.forEach(function(field) {
				if ( ( field.Value.indexOf(bibPrefix) !== -1 ) || ( field.Value.indexOf(citPrefix) !== -1 ) ) {
					count++;
					window.Asc.plugin.executeMethod("RemoveFieldWrapper", [field.FieldId], function() {
						count--;
						if (!count)
							window.Asc.plugin.executeCommand("close", "");
					});
				}
			});

			if (!arrFields.length)
				window.Asc.plugin.executeCommand("close", "");
		});
	};

	function synchronizeData() {
		// form an array for request (one array for user and other for groups)
		// todo now we should make full update (because when we make refresh, we check fields into the document). Fix it in new version (when we change refreshing and updating processes)
		if (!cslItems.count)
			return;

		showLoader(true);
		bGroupsItemsUpdated = false;
		bUserItemsUpdated = false;
		var bHasGroupsItems = false;
		var arrUsrItems = [];
		var arrGroupsItems = {};
		for (var id in cslItems) {
			if (Object.hasOwnProperty.call(cslItems, id)) {
				if (id !== 'count') {
					var item = cslItems[id];
					if (item.userID) {
						arrUsrItems.push(item.id)
					} else if (item.groupID) {
						if (!arrGroupsItems[item.groupID])
							arrGroupsItems[item.groupID] = [];
						
						arrGroupsItems[item.groupID].push(item.id);
					}
				}
			}
		}
		if (arrUsrItems.length) {
			sdk.items(null, arrUsrItems)
			.then(function(res) {
				var items = ( (res.items ? res.items.items : []) || [] );
				items.forEach(function(item) {
					syncronizeCSLItem(item);
				});
			})
			.catch(function(err) {
				console.error(err);
			})
			.finally(function() {
				bUserItemsUpdated = true;
				if (bGroupsItemsUpdated)
					updateAfterSync();
			});
		} else {
			bUserItemsUpdated = true;
		}
		
		for (var groupID in arrGroupsItems) {
			if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
				bHasGroupsItems = true;
				sdk.groups(null, groupID, arrGroupsItems[groupID])
				.then(function(res) {
					var items = ( (res.items ? res.items.items : []) || [] );
					items.forEach(function(item) {
						syncronizeCSLItem(item);
					})
				})
				.catch(function(err) {
					console.error(err);
				})
				.finally(function() {
					bGroupsItemsUpdated = true;
					if (bUserItemsUpdated)
						updateAfterSync();
				});
			}
		}
		if (!bHasGroupsItems) {
			bGroupsItemsUpdated = true;
		}
		if (bGroupsItemsUpdated && bUserItemsUpdated)
			updateAfterSync();
	};

	function updateAfterSync() {
		// todo now we should make full update (because when we make refresh, we check fields into the document). Fix it in new version (when we change refreshing and updating processes)
		updateFormatter(true, false, false, true);
	};
})();
