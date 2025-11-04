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
window.addEventListener('load', function() {
	var counter = 0; // счетчик отправленных запросов (используется чтобы знать показывать "not found" или нет)
    var displayNoneClass = "display-none";
    var blurClass = "blur";
	var formatter = null;
	var citPrefixNew = "ZOTERO_ITEM";
	var citSuffixNew = "CSL_CITATION";
	var citPrefix = "ZOTERO_CITATION";
	var bibPrefixNew = "ZOTERO_BIBL";
	var bibSuffixNew = "CSL_BIBLIOGRAPHY";
	var bibPrefix = "ZOTERO_BIBLIOGRAPHY";
    var repeatTimeout = null;
    var loadTimeout = null;
	var loadingStyle = false;
	var loadingLocale = false;
	var bNumFormat = false;
	let bibPlaceholder = "Please insert some citation into the document.";
	var bUserItemsUpdated = false;
	var bGroupsItemsUpdated = false;
	// TODO добавить варианты сохранения для совместимости с другими редакторами 
    //     (ms, libre, google, мой офис), пока есть вариант сохранить как текст
	// TODO добавить ещё обработку событий (удаление линков) их не нужно удалять
    //     из библиографии автоматически (это делать только при обновлении библиографии
    //     или refresh), но их точно нужно удалить из formatter!
	// TODO добавить ещё обработку события (изменения линков), предлать пользователю
    //     обновить их или сохранить ручное форматирование (при ручном форматировании
    //     не меняем внешний вид цитаты при refresh (да и вообще не меняем))
	// TODO сейчас всегда делаем полный refresh при каждом действии
    //     (обновлении, вставке линков, вставке библиографии), потому что мы не знаем
    //     что поменялось без событий (потом добавить ещё сравнение контента)
	// TODO ms меняет линки (если стиль с нумерацией bNumFormat) делает их по порядку
    //     как документе (для этого нужно знать где именно в документе мы вставляем цитату,
    //     какая цитата сверху и снизу от текущего курсора)

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

	var locales = {};
    var selectedLocale;
    var selectedStyle;

    var sdk = null;
    var cslStylesManager = null;
    var citationDocService = null;

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
        notesStyleWrapper: document.querySelector(".notesStyle"),
        notesStyleRadios: document.querySelectorAll(".notesStyle input[name=notesAs]"),

        insertBibBtn: document.getElementById("insertBibBtn"),
        insertLinkBtn: document.getElementById("insertLinkBtn"),
        cancelBtn: document.getElementById("cancelBtn"),
		tempDiv: document.getElementById('div_temp'),
		refreshBtn: document.getElementById('refreshBtn'),
		saveAsTextBtn: document.getElementById('saveAsTextBtn'),
		synchronizeBtn: document.getElementById('synchronizeBtn'),
		checkOmitAuthor: document.getElementById('omitAuthor'),
        useDesktopApp: document.getElementById("useDesktopApp"),
        cslFileInput: document.getElementById("cslFileInput"),
    };

    var selectedScroller;
    var docsScroller;

    window.Asc.plugin.init = function () {
		showLoader(true);
        setTimeout(function () { searchField.focus(); },100);
        
        sdk = ZoteroSdk();
        cslStylesManager = new CslStylesManager();
        addEventListeners();
        
        initSdkApis().then(function (availableApis) {
            showLoader(true);
            loadStyles();

            citationDocService = new CitationDocService(
                citPrefixNew,
                citSuffixNew,
                bibPrefixNew,
                bibSuffixNew,
                cslStylesManager.getLastUsedFormat(),
                cslStylesManager.getLastUsedNotesStyle()
            );

            updateCslItems(true, false, false, false);
            addStylesEventListeners();
            initSelectBoxes();
        });

        window.Asc.plugin.onTranslate = applyTranslations;

        selectedScroller = initScrollBox(elements.selectedHolder, elements.selectedThumb);
        docsScroller = initScrollBox(elements.docsHolder, elements.docsThumb, checkDocsScroll);
    };


    function initSdkApis() {
        return new Promise(function (resolve) {
            let hasFirstAnswer = false;
            let onlineZoteroElements =
                document.querySelectorAll(".for-zotero-online");
                
            ZoteroApiChecker.runApisChecker(sdk).subscribe(function (
                /** @type {AvailableApis} */ apis
            ) {
                cslStylesManager.setDesktopApiAvailable(apis.desktop);
                cslStylesManager.setRestApiAvailable(apis.online);
                if (!hasFirstAnswer) {
                    hasFirstAnswer = true;
                    if (!apis.desktopVersion) {
                        elements.useDesktopApp.classList.add("display-none");
                    }
                    showLoader(false);
                    switchAuthState("config");
                }

                if (apis.online) {
                    onlineZoteroElements.forEach(function (element) {
                        element.classList.remove("display-none");
                    });
                } else {
                    onlineZoteroElements.forEach(function (element) {
                        element.classList.add("display-none");
                    });
                }
                if (apis.online && apis.hasKey) {
                    sdk.setIsOnlineAvailable(true);
                    switchAuthState("main");
                    resolve(apis);
                    return;
                } else if (apis.desktop && apis.hasPermission) {
                    sdk.setIsOnlineAvailable(false);
                    elements.logoutLink.style.display = "none";
                    switchAuthState("main");
                    showError(false);
                    resolve(apis);
                    return;
                }
            });
        });
    }

    function loadStyles() {
        cslStylesManager.getStylesInfo()
            .then(function (stylesInfo) {
				var openOtherStyleList = function (list) {
                    return function (ev) {
                        elements.styleSelectListOther.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
                        ev.stopPropagation();
                        openList(list);
                    }
                };

                addStylesToList(stylesInfo);

                if (elements.styleSelectListOther.children.length > 0) {
                    var other = document.createElement("span");
                    other.textContent = "More Styles...";
                    elements.styleSelectList.appendChild(other);
                    other.onclick = openOtherStyleList(elements.styleSelectListOther);
                }
                
                var custom = document.createElement("span");
                custom.setAttribute("class", "select-file");
                var label = document.createElement("label");
                label.setAttribute("for", "cslFileInput");
                label.textContent = "Add custom style...";
                custom.appendChild(label);
                elements.styleSelectList.appendChild(custom);
            })
            .catch(function (err) {
                console.error(err);
             });
    }

    /**
     * @param {object} stylesInfo
     */
    function addStylesToList(stylesInfo) {
        var found = false;
        var lastStyle = cslStylesManager.getLastUsedStyleId();

        var onStyleSelectOther = function (list, other) {
            return function (ev) {
                var tmpEl = list.removeChild(list.children[list.children.length - 3]);
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
                newEl.onclick = onClickListElement(elements.styleSelectList, elements.styleSelect);
                var event = new Event("click");
                newEl.dispatchEvent(event);
                openList(null);
            }
        };

        for (var i = 0; i < stylesInfo.length; i++) {
            var el = document.createElement("span");
            el.setAttribute("data-value", stylesInfo[i].name);
            el.textContent = stylesInfo[i].title;
            if (cslStylesManager.isStyleDefault(stylesInfo[i].name) || stylesInfo[i].name == lastStyle) {
                if (stylesInfo.length == 1)
                    elements.styleSelectList.insertBefore(el, elements.styleSelectList.firstElementChild);
                else
                    elements.styleSelectList.appendChild(el);
                el.onclick = onClickListElement(elements.styleSelectList, elements.styleSelect);
            } else {
                elements.styleSelectListOther.appendChild(el);
                el.onclick = onStyleSelectOther(elements.styleSelectList, elements.styleSelectListOther);
            }
            if (stylesInfo[i].name == lastStyle) {
                el.setAttribute("selected", "");
                selectInput(elements.styleSelect, el, elements.styleSelectList, false);
            }
        }
    }

    function addEventListeners() {
        elements.cslFileInput.onchange = function (e) {
            var file = e.target.files[0];
            if (!file) return;
            //showLoader(true);

            cslStylesManager.addCustomStyle(file).then(function (styleValue) {
                addStylesToList([styleValue]);
            }).catch(function (error) {
                console.error(error);
                showError(getMessage("Failed to upload file"));
            }).finally(function () {
                showLoader(false);
            });
        };

        elements.useDesktopApp.onclick = function () {
            ZoteroApiChecker.checkStatus(sdk).then(function (/** @type {AvailableApis} */ apis) {
                if (apis.desktop && apis.hasPermission) {
                    sdk.setIsOnlineAvailable(false);
                    elements.logoutLink.style.display = "none";
                    switchAuthState("main");
                    showError(false);
                } else if (apis.desktop && !apis.hasPermission) {
                    const errorMessage =
                        "Connection to Zotero failed. " +
                        "Please enable external connections in Zotero: " +
                        'Edit → Settings → Advanced → Check "Allow other ' +
                        'applications on this computer to communicate with Zotero"';
                    showError(getMessage(errorMessage));
                } else if (!apis.desktop) {
                    showError(
                        getMessage(
                            "Connection to Zotero failed. Make sure Zotero is running."
                        )
                    );
                }
            });
        };

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
			var groups = sdk.getUserGroups();
            loadLibrary(sdk.getItems(text), true, true, !groups.length, false, true);
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
                        ZoteroApiChecker.stopApisChecker();
                        switchAuthState("main");
                    })
                    .catch(function (err) {
                        console.error(err);
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
			citationDocService.saveAsText();
        }
	}

    function addStylesEventListeners() {
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
                selectedStyle = val;
				
                onStyleChange();
				if (isClick)
					updateCslItems(true, true, false, false);
			})
			.catch(function (err) {
                console.error(err);
             })
			.finally(function() {
				if (
                    locales[selectedLocale] &&
                    cslStylesManager.cached(selectedStyle)
                )
                    showLoader(false);
			});
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
			.catch(function (error) {
                console.error(error);
            })
			.finally(function() {
				if (locales[selectedLocale] && cslStylesManager.cached(selectedStyle)) showLoader(false);
			});
            selectedLocale = val;
        };

        elements.styleSelectList.onopen = function () {
            elements.styleSelectList.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
        }

        elements.notesStyleRadios.forEach(function(radio) {
            radio.addEventListener('change', function(event)  {
                if (event.target.checked) {
                    cslStylesManager.saveLastUsedNotesStyle(event.target.value);
                }
            });
        });
            
        
    }

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

    function onStyleChange() {
        let styleFormat = cslStylesManager.getLastUsedFormat();
        citationDocService.setStyleFormat(styleFormat);
        bNumFormat = styleFormat == 'numeric';
        if ("note" === styleFormat) {
            elements.notesStyleWrapper.classList.remove(displayNoneClass);
        } else {
            elements.notesStyleWrapper.classList.add(displayNoneClass);
        }

        let notesStyle = cslStylesManager.getLastUsedNotesStyle();
        citationDocService.setNotesStyle(notesStyle);
        elements.notesStyleWrapper.querySelector('input[name="notesAs"][value="' + notesStyle + '"]').checked = true;
    }

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
                console.error(err);
                displaySearchItems(append, {}, err.message, hideLoader, isGroup, (bCount && !counter) );
                showError(err.message);
            })
            .finally(function () {	
				if (hideLoader) {
					showLibLoader(false);
				}
            });
    };

    function getStyle(styleName) {
        return new Promise(function (res, rej) {
            loadingStyle = true;
            cslStylesManager.getStyle(styleName)
                .then(function (text) {
                    res(text); 
                    loadingStyle = false;
                })
                .catch(function (err) { rej(err); loadingStyle = false; });
        });
    };

    function getLocale(langTag) {
        return new Promise(function (res, rej) {
            if (locales[langTag] != null) {
                res(locales[langTag]);
            } else {
                loadingLocale = true;
				sdk.getLocale(langTag)
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
		return citationDocService.getAllAddinFields().then(function(arrFields) {
			if (!arrFields.length) {
				showLoader(false);
                return;
            }
            var updatedFields = [];
            var bibField = null;
            var bibFieldValue = ' ';

            try {
                var bibItems = new Array(CSLCitationStorage.size);
                var bibObject = formatter.makeBibliography();
                // Sort bibliography items
                for (var i = 0; i < bibObject[0].entry_ids.length; i++) {
                    var citationId = bibObject[0].entry_ids[i][0];
                    var citationIndex = CSLCitationStorage.getIndex(citationId);
                    var bibText = bibObject[1][i];
                    while (bibText.indexOf('\n') !== bibText.lastIndexOf('\n')) {
                        bibText = bibText.replace(/\n/, '');
                    }
                    // Check if bibliography item contains <sup> or <sub>
                    if (/<sup[^>]*>|<\/sup>|<sub[^>]*>|<\/sub>/i.test(bibText)) {
                        // Escape <sup> and <sub>
                        bibText = bibText
                            .replace(/<sup\b[^>]*>/gi, '&lt;sup&gt;')
                            .replace(/<\/sup>/gi, '&lt;/sup&gt;')
                            .replace(/<sub\b[^>]*>/gi, '&lt;sub&gt;')
                            .replace(/<\/sub>/gi, '&lt;/sub&gt;');;
                    }
                    bibItems[citationIndex] = bibText;
                }
                elements.tempDiv.innerHTML = bibItems.join('');
            } catch (e) {
                if (
                    false === cslStylesManager.isLastUsedStyleContainBibliography()
                ) {
                    // style does not describe the bibliography
                    elements.tempDiv.textContent = "";
                } else {
                    console.error(e);
                    showError(getMessage("Failed to apply this style."));
                    showLoader(false);
                    return;
                }
            }
            
            var bibliography = elements.tempDiv.innerText;
            arrFields.forEach(function(field) {
                var citationObject;
                    var citationStartIndex = field.Value.indexOf("{");
                    var citationEndIndex = field.Value.lastIndexOf("}");
                    if (citationStartIndex !== -1) {
                        var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
                        citationObject = JSON.parse(citationString);
                    }
                var keysL = [];
                var cslCitation;
                if (bUpadteAll && ( field.Value.indexOf(citPrefixNew) !== -1 || field.Value.indexOf(citPrefix) !== -1 ) ) {
                    var citationID = ""; // old format
                    if (field.Value.indexOf(citPrefix) === -1) { 
                        citationID = citationObject.citationID;
                    }

                    cslCitation = new CSLCitation(keysL.length, citationID);
                    cslCitation.fillFromObject(citationObject);
                    keysL = cslCitation.getSuppressAuthors();
                    elements.tempDiv.innerHTML = formatter.makeCitationCluster(keysL);
                    field["Content"] = elements.tempDiv.innerText;
                    if (bSyncronize && cslCitation) {
                        // if we make synchronization we must update value too
                        field["Value"] = citPrefixNew + ' ' + citSuffixNew + JSON.stringify(cslCitation.toJSON());
                    }
                    updatedFields.push(field);
                } else if (field.Value.indexOf(bibPrefix) !== -1 || field.Value.indexOf(bibPrefixNew) !== -1) {
                    bibField = field;
                    bibField["Content"] = bibliography;
                    if (typeof citationObject === "object" && Object.keys(citationObject).length > 0) {
                        bibFieldValue = JSON.stringify(citationObject);
                    }
                }
            });
            if (bibField) {
                updatedFields.push(bibField);
            } else if (bPastBib) {
                if (cslStylesManager.isLastUsedStyleContainBibliography()) {
                    return citationDocService.addBibliography(bibliography, bibFieldValue)
                        .then(function() {
                            if (!updatedFields.length) {
                                showLoader(false);
                            }
                            return updatedFields;
                        });
                } else {
                    showError(getMessage("The current bibliographic style does not describe the bibliography"));
                }
            }
            return updatedFields;
        }).then(function(updatedFields) {
            if (updatedFields && updatedFields.length) {
                return citationDocService.updateAddinFields(updatedFields).then(function() {
                    showLoader(false);
                });
            } 
        });
	};

	function updateFormatter(bUpadteAll, bPastBib, bPastLink, bSyncronize) {
        // looks like a crutch
		clearTimeout(repeatTimeout);
        if (loadingStyle || loadingLocale || !cslStylesManager.cached(selectedStyle) || !locales[selectedLocale]) {
            repeatTimeout = setTimeout( function() {
				updateFormatter(bUpadteAll, bPastBib, bPastLink, bSyncronize);
			}, 100);
            return;
        }

        var arrIds = [];
        CSLCitationStorage.forEach(function(item, id) {
            arrIds.push(id);
        });
		formatter = new CSL.Engine(
            {
                retrieveLocale: function (id) { return locales[id]; }, 
                retrieveItem: function (id) { 
                    var item = CSLCitationStorage.get(id);
                    let index = CSLCitationStorage.getIndex(id);
                    return item.toFlatJSON(index); 
                } 
            }, 
            cslStylesManager.cached(selectedStyle),
            selectedLocale, 
            true
        );
		if (arrIds.length) {
			formatter.updateItems(arrIds);
		}
		if (bUpadteAll || bPastBib)
			updateAllOrAddBib(bUpadteAll, bPastBib, bSyncronize);
		
		if (bPastLink) {
			insertSelectedCitations();
		}
	};

    // onInit (1,0,0,0)
    // Insert Citation (1,0,0,1)
    // Insert Bibliography (1,1,1,0)
    // Refresh (1,1,0,0)
    /**
     * @param {boolean} bUpdadeFormatter 
     * @param {boolean} bUpadteAll 
     * @param {boolean} bPastBib 
     * @param {boolean} bPastLink 
     * @returns {Promise}
     */
	function updateCslItems(bUpdadeFormatter, bUpadteAll, bPastBib, bPastLink) {
		CSLCitationStorage.clear();

        return citationDocService.getAllAddinFields().then(function(arrFields) {
			if (arrFields.length) {
				var numOfItems = 0;
				var bibField = null;
                var bibFieldValue = ' ';
				arrFields.forEach(function(field) {
                    var citationObject;
                    var citationStartIndex = field.Value.indexOf("{");
                    var citationEndIndex = field.Value.lastIndexOf("}");
                    if (citationStartIndex !== -1 && citationEndIndex !== -1) {
                        var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
                        citationObject = JSON.parse(citationString);
                    }
                    
					if (field.Value.indexOf(citPrefix) !== -1 || field.Value.indexOf(citPrefixNew) !== -1) {
                        var citationID = ""; // old format
                        if (field.Value.indexOf(citPrefix) === -1) {
                            citationID = citationObject.citationID;
                        }
                        var cslCitation = new CSLCitation(numOfItems, citationID);
                        numOfItems += cslCitation.fillFromObject(citationObject);
                        cslCitation.getCitationItems().forEach(function(item) {
                            CSLCitationStorage.set(item.id, item);
                        });
					} else if (field.Value.indexOf(bibPrefix) !== -1 || field.Value.indexOf(bibPrefixNew) !== -1) {
						bibField = field;
                        if (typeof citationObject === "object" && Object.keys(citationObject).length > 0) {
                            bibFieldValue = JSON.stringify(citationObject);
                        }
					}
				});

				if (numOfItems) {
                    // sort?
				} else if (bUpdadeFormatter && bibField && bUpadteAll) {
					// нет смысла ещё раз искать поле библиографии
					bUpdadeFormatter = false;
					bibField["Content"] = getMessage(bibPlaceholder);
                    return citationDocService.updateAddinFields([bibField]).then(function() {
                        showLoader(false);
                        return bUpdadeFormatter;
                    });
				}
			} else if (bUpdadeFormatter && bPastBib) {
                if (cslStylesManager.isLastUsedStyleContainBibliography()) {
                    return citationDocService.addBibliography(
                        getMessage(bibPlaceholder),
                        bibFieldValue
                    ).then(function() {
                        showLoader(false);
                        return bUpdadeFormatter;
                    });
                } else {
                    showError(getMessage("The current bibliographic style does not describe the bibliography"));
                }
                
			}
            return bUpdadeFormatter;
        }).then(function(bUpdadeFormatter) {
            if (bUpdadeFormatter)
				return updateFormatter(bUpadteAll, bPastBib, bPastLink, false);
        });
	};

    function insertSelectedCitations() {
        if (!selectedStyle) {
            showError(getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            showError(getMessage("Language is not selected"));
            return;
        }

        var cslCitation = new CSLCitation(CSLCitationStorage.size, "");
        for (var citationID in selected.items) {
            var item = convertToCSL(selected.items[citationID]);
            cslCitation.fillFromObject(item);
        }
        
        return getSelectedInJsonFormat().then(function(items) {
            items.forEach(function(item) {
                cslCitation.fillFromObject(item);
            });
            return formatInsertLink(cslCitation);
        });
    }

	function formatInsertLink(cslCitation) {
		var bUpdateItems = false;
        var keys = [];
        var keysL = [];

        cslCitation.getCitationItems().forEach(function(item) {
            if (!CSLCitationStorage.has(item.id)) {
                bUpdateItems = true;
            }
            CSLCitationStorage.set(item.id, item);
            keys.push(item.id);
            keysL.push(item.getSuppressAuthor());
        });

        try {
			if (bUpdateItems) {
				var arrIds = [];
                CSLCitationStorage.forEach(function(item, id) {
                    arrIds.push(id);
                });
				formatter.updateItems(arrIds);
			}

            keys.forEach(function(key) {
                removeSelected(key);
            })
			
			// TODO может ещё очистить поиск (подумать над этим)
			elements.tempDiv.innerHTML = formatter.makeCitationCluster(keysL);
            citationDocService.addCitation(
                elements.tempDiv.innerHTML, 
                JSON.stringify(cslCitation.toJSON())
            ).then(function() {
                showLoader(false);
                // TODO есть проблема, что в плагине мы индексы обновили, а вот в документе нет (по идее надо обновить и индексы в документе перед вставкой)
                // но тогда у нас уедет селект и новое поле вставится не там, поэтому пока обновлять приходится в конце
                // такая же проблем с вставкой библиографии (при обнолении индексов в плагине надо бы их обновлять и в документе тоже)
                return updateCslItems(true, true, false, false);
            });

        } catch (e) {
            showError(e);
            console.error(e);
        }
    };

    function convertToCSL(item) {
        var cslData = item;
        cslData["suppress-author"] = elements.checkOmitAuthor.checked;

        return cslData;
    };

	function syncronizeCSLItem(item) {
		var pos = item.id.indexOf("/") + 1;
		if (pos)
			item.id = item.id.substring(pos);
		
		var cslItem = CSLCitationStorage.get(item.id);
        cslItem.fillFromObject(item);

    };

    function getSelectedInJsonFormat() {
		var arrUsrItems = [];
		var arrGroupsItems = {};
        for (var citationID in selected.items) {
            var item = selected.items[citationID];
            var userID = item["userID"];
            var groupID = item["groupID"];
            if (userID) {
                arrUsrItems.push(item.id);
            } else if (groupID) {
                if (!arrGroupsItems[groupID]) {
                    arrGroupsItems[groupID] = [];
                }    
                arrGroupsItems[groupID].push(item.id);
            }
        }

        var promises = [];
        if (arrUsrItems.length) {
            promises.push(
                sdk.getItems(null, arrUsrItems, 'json')
                    .then(function(res) {
                        var items = ( res.items || [] );
                        return items
                    })
                .catch(function(err) {
                    console.error(err);
                })
            );
        }

		for (var groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                promises.push(
                    sdk.groups(null, groupID, arrGroupsItems[groupID], 'json')
                    .then(function(res) {
                        var items = ( res.items || [] );
                        return items
                    })
                    .catch(function(err) {
                        console.error(err);
                    })
                );
            }
        }

        return Promise.all(promises).then(function(res) {
            var items = [];
            res.forEach(function(resItems) {
                items = items.concat(resItems);
            });
            return items;
        });
    };

	function synchronizeData() {
		// form an array for request (one array for user and other for groups)
		// todo now we should make full update (because when we make refresh, we check fields into the document). Fix it in new version (when we change refreshing and updating processes)
		if (!CSLCitationStorage.size)
			return;

		showLoader(true);
		bGroupsItemsUpdated = false;
		bUserItemsUpdated = false;
		var bHasGroupsItems = false;
		var arrUsrItems = [];
		var arrGroupsItems = {};
        CSLCitationStorage.forEach(function(citationItem, id) {
            let index = CSLCitationStorage.getIndex(id);
            let item = citationItem.toFlatJSON(index);
            var userID = citationItem.getProperty("userID");
            var groupID = citationItem.getProperty("groupID");
            if (userID) {
                arrUsrItems.push(citationItem.id);
            } else if (groupID) {
                if (!arrGroupsItems[groupID])
                    arrGroupsItems[groupID] = [];
                    arrGroupsItems[groupID].push(item.id);

            }
        })

		if (arrUsrItems.length) {
			sdk.getItems(null, arrUsrItems)
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
});
