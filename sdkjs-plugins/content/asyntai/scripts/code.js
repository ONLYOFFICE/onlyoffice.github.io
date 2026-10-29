/*
 * Asyntai AI Assistant for ONLYOFFICE
 * Copyright (c) Asyntai. Licensed under the GNU AGPL v3.
 *
 * Panel logic: connect with an API key, ask the knowledge base, insert the
 * answer, and add the selection or the whole document to the knowledge base.
 */
(function (window) {
	"use strict";

	var STORAGE_KEY = "asyntai-onlyoffice";

	var state = {
		apiKey: "",
		websiteId: null,
		websites: [],
		sessionId: newSessionId(),
		selectedText: "",
		answer: "",
		busy: false
	};

	var el = {};
	var ready = false;

	function newSessionId() {
		var random = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
		return "onlyoffice-" + random;
	}

	function tr(text) {
		var plugin = window.Asc && window.Asc.plugin;
		return plugin && typeof plugin.tr === "function" ? plugin.tr(text) : text;
	}

	// ---------- storage ----------

	function loadSettings() {
		try {
			var raw = window.localStorage.getItem(STORAGE_KEY);
			if (!raw) { return {}; }
			var data = JSON.parse(raw);
			return data && typeof data === "object" ? data : {};
		} catch (e) {
			return {};
		}
	}

	function saveSettings() {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
				apiKey: state.apiKey,
				websiteId: state.websiteId
			}));
		} catch (e) {
			// Storage can be off in some desktop builds. The panel still works
			// for this session, it only asks for the key again next time.
		}
	}

	function clearSettings() {
		try {
			window.localStorage.removeItem(STORAGE_KEY);
		} catch (e) { /* see saveSettings */ }
	}

	// ---------- small view helpers ----------

	function show(node, visible) {
		node.classList.toggle("hidden", !visible);
	}

	function setStatus(node, message, isError) {
		node.textContent = message || "";
		node.classList.toggle("error", !!isError);
		show(node, !!message);
	}

	function setBusy(busy) {
		state.busy = busy;
		[el.connectBtn, el.askBtn, el.kbBtn, el.insertBtn].forEach(function (b) {
			if (b) { b.disabled = busy; }
		});
	}

	function client() {
		return window.AsyntaiApi.createClient(state.apiKey);
	}

	function editorType() {
		var info = window.Asc.plugin.info || {};
		return info.editorType || "word";
	}

	function isViewMode() {
		var info = window.Asc.plugin.info || {};
		return !!info.isViewMode;
	}

	// The PDF editor reports editorType "word", but PDF text does not live in
	// document paragraphs, so the file extension tells the two apart.
	function canReadWholeDocument() {
		var info = window.Asc.plugin.info || {};
		var isPdf = /\.pdf$/i.test(info.documentTitle || "");
		return editorType() === "word" && !isPdf;
	}

	function documentTitle() {
		var info = window.Asc.plugin.info || {};
		var title = info.documentTitle || "";
		return title.replace(/\.[A-Za-z0-9]{2,5}$/, "");
	}

	// ---------- connect ----------

	function showConnect(message, isError) {
		show(el.mainView, false);
		show(el.connectView, true);
		setStatus(el.connectStatus, message, isError);
	}

	function renderWebsites() {
		el.website.innerHTML = "";
		state.websites.forEach(function (site) {
			var option = document.createElement("option");
			option.value = String(site.id);
			option.textContent = site.domain || ("#" + site.id);
			el.website.appendChild(option);
		});
		var known = state.websites.some(function (s) { return String(s.id) === String(state.websiteId); });
		if (!known) {
			state.websiteId = state.websites.length ? state.websites[0].id : null;
		}
		if (state.websiteId !== null) {
			el.website.value = String(state.websiteId);
		}
		show(el.websiteRow, state.websites.length > 1);
	}

	function showMain(account) {
		show(el.connectView, false);
		show(el.mainView, true);
		el.accountEmail.textContent = account && account.email ? account.email : "";
		renderWebsites();
		show(el.insertBtn, !isViewMode());
		// Reading the whole file is supported in the text editor only. In the
		// other editors the selection is the source.
		var canReadWhole = canReadWholeDocument();
		show(el.kbWholeLabel, canReadWhole);
		if (!canReadWhole) {
			el.kbSourceSelection.checked = true;
		}
		if (!el.kbTitle.value) {
			el.kbTitle.value = documentTitle();
		}
	}

	function connect(apiKey, silent) {
		state.apiKey = (apiKey || "").trim();
		if (!state.apiKey) {
			showConnect(silent ? "" : tr("Enter your Asyntai API key first."), !silent);
			return Promise.resolve(false);
		}
		setBusy(true);
		if (!silent) {
			setStatus(el.connectStatus, tr("Connecting..."), false);
		}
		var api = client();
		var account = null;
		return api.account().then(function (data) {
			account = data.account || {};
			return api.websites();
		}).then(function (websites) {
			if (!websites.length) {
				throw new window.AsyntaiApi.AsyntaiError(tr("This Asyntai account has no website yet. Add one in your Asyntai dashboard."));
			}
			state.websites = websites;
			saveSettings();
			setStatus(el.connectStatus, "", false);
			showMain(account);
			return true;
		}).catch(function (err) {
			// A saved key that stopped working sends the user back to the
			// connect screen with the reason, and the key field stays filled.
			el.apiKey.value = state.apiKey;
			showConnect(err.message, true);
			return false;
		}).then(function (ok) {
			setBusy(false);
			return ok;
		});
	}

	function disconnect() {
		clearSettings();
		state.apiKey = "";
		state.websiteId = null;
		state.websites = [];
		state.answer = "";
		state.sessionId = newSessionId();
		el.apiKey.value = "";
		el.question.value = "";
		show(el.answerBox, false);
		setStatus(el.askStatus, "", false);
		setStatus(el.kbStatus, "", false);
		showConnect("", false);
	}

	// ---------- ask ----------

	function ask() {
		if (state.busy) { return; }
		var question = el.question.value.trim();
		if (!question) {
			setStatus(el.askStatus, tr("Write a question first."), true);
			return;
		}
		setBusy(true);
		setStatus(el.askStatus, tr("Asking..."), false);
		client().ask(question, state.websiteId, state.sessionId).then(function (result) {
			state.answer = result.answer;
			if (result.sessionId) { state.sessionId = result.sessionId; }
			el.answerText.textContent = result.answer;
			el.answerDisclosure.textContent = result.disclosure;
			show(el.answerDisclosure, !!result.disclosure);
			show(el.answerBox, true);
			setStatus(el.askStatus, "", false);
		}).catch(function (err) {
			setStatus(el.askStatus, err.message, true);
		}).then(function () {
			setBusy(false);
		});
	}

	function insertAnswer() {
		if (!state.answer) { return; }
		window.Asc.plugin.executeMethod("PasteText", [state.answer], function () {
			setStatus(el.askStatus, tr("The answer is in the document."), false);
			// Give the keyboard back to the document, so the user keeps
			// typing there and Enter does not press the Insert button again.
			el.insertBtn.blur();
			window.Asc.plugin.executeMethod("FocusEditor");
		});
	}

	function copyAnswer() {
		if (!state.answer) { return; }
		var done = function () { setStatus(el.askStatus, tr("Copied."), false); };
		var fallback = function () {
			var area = document.createElement("textarea");
			area.value = state.answer;
			area.style.position = "fixed";
			area.style.opacity = "0";
			document.body.appendChild(area);
			area.select();
			try { document.execCommand("copy"); } catch (e) { /* nothing more to try */ }
			document.body.removeChild(area);
			done();
		};
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(state.answer).then(done, fallback);
		} else {
			fallback();
		}
	}

	function useSelection() {
		readSelection().then(function (text) {
			if (text) {
				el.question.value = text;
				el.question.focus();
				setStatus(el.askStatus, "", false);
			} else {
				setStatus(el.askStatus, tr("Select some text in the document first."), true);
			}
		});
	}

	// ---------- read the document ----------

	function readSelection() {
		return new Promise(function (resolve) {
			window.Asc.plugin.executeMethod("GetSelectedText", [{
				Numbering: false, Math: false, TableCellSeparator: "\t", ParaSeparator: "\n"
			}], function (data) {
				var text = typeof data === "string" ? data : "";
				resolve(text.replace(/\r/g, "\n").trim() || state.selectedText.trim());
			});
		});
	}

	function readWholeDocument() {
		return new Promise(function (resolve) {
			window.Asc.plugin.callCommand(function () {
				var doc = Api.GetDocument();
				var parts = [];
				var count = doc.GetElementsCount();
				for (var i = 0; i < count; i++) {
					var item = doc.GetElement(i);
					if (item && typeof item.GetText === "function") {
						parts.push(item.GetText());
					}
				}
				return parts.join("\n");
			}, false, false, function (result) {
				resolve(typeof result === "string" ? result.trim() : "");
			});
		});
	}

	function addToKnowledgeBase() {
		if (state.busy) { return; }
		var title = el.kbTitle.value.trim();
		if (!title) {
			setStatus(el.kbStatus, tr("Give the document a title."), true);
			return;
		}
		var whole = el.kbSourceDocument.checked && canReadWholeDocument();
		setBusy(true);
		setStatus(el.kbStatus, tr("Reading the document..."), false);
		(whole ? readWholeDocument() : readSelection()).then(function (text) {
			if (!text) {
				throw new window.AsyntaiApi.AsyntaiError(whole
					? tr("The document is empty.")
					: tr("Select some text in the document first."));
			}
			setStatus(el.kbStatus, tr("Adding to the knowledge base..."), false);
			return client().addText(title, text, state.websiteId);
		}).then(function (result) {
			var message = tr("Added to the knowledge base") + ": " + (result.title || title);
			setStatus(el.kbStatus, message, false);
		}).catch(function (err) {
			setStatus(el.kbStatus, err.message, true);
		}).then(function () {
			setBusy(false);
		});
	}

	// ---------- wiring ----------

	function bind() {
		var $ = function (id) { return document.getElementById(id); };
		el.connectView = $("connect-view");
		el.mainView = $("main-view");
		el.apiKey = $("api-key");
		el.connectBtn = $("connect-btn");
		el.connectStatus = $("connect-status");
		el.websiteRow = $("website-row");
		el.website = $("website");
		el.question = $("question");
		el.askBtn = $("ask-btn");
		el.useSelection = $("use-selection");
		el.askStatus = $("ask-status");
		el.answerBox = $("answer-box");
		el.answerText = $("answer-text");
		el.answerDisclosure = $("answer-disclosure");
		el.insertBtn = $("insert-btn");
		el.copyBtn = $("copy-btn");
		el.newChat = $("new-chat");
		el.kbTitle = $("kb-title");
		el.kbSourceSelection = document.querySelector('input[name="kb-source"][value="selection"]');
		el.kbSourceDocument = document.querySelector('input[name="kb-source"][value="document"]');
		el.kbWholeLabel = $("kb-whole-label");
		el.kbBtn = $("kb-btn");
		el.kbStatus = $("kb-status");
		el.accountEmail = $("account-email");
		el.disconnect = $("disconnect");

		el.question.placeholder = tr("For example: What is our refund policy?");
		el.apiKey.placeholder = tr("Paste the API key");

		el.connectBtn.addEventListener("click", function () { connect(el.apiKey.value, false); });
		el.apiKey.addEventListener("keydown", function (e) {
			if (e.key === "Enter") { connect(el.apiKey.value, false); }
		});
		el.website.addEventListener("change", function () {
			state.websiteId = el.website.value ? Number(el.website.value) : null;
			state.sessionId = newSessionId();
			saveSettings();
		});
		el.askBtn.addEventListener("click", ask);
		el.question.addEventListener("keydown", function (e) {
			if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { ask(); }
		});
		el.useSelection.addEventListener("click", function (e) { e.preventDefault(); useSelection(); });
		el.insertBtn.addEventListener("click", insertAnswer);
		el.copyBtn.addEventListener("click", copyAnswer);
		el.newChat.addEventListener("click", function (e) {
			e.preventDefault();
			state.sessionId = newSessionId();
			state.answer = "";
			el.question.value = "";
			show(el.answerBox, false);
			setStatus(el.askStatus, tr("New conversation started."), false);
		});
		el.kbBtn.addEventListener("click", addToKnowledgeBase);
		el.disconnect.addEventListener("click", function (e) { e.preventDefault(); disconnect(); });
	}

	function start() {
		if (ready) { return; }
		ready = true;
		bind();
		var saved = loadSettings();
		state.websiteId = saved.websiteId || null;
		if (saved.apiKey) {
			el.apiKey.value = saved.apiKey;
			connect(saved.apiKey, true);
		} else {
			showConnect("", false);
		}
	}

	window.Asc.plugin.init = function (text) {
		// init runs on open and again on every selection change, because
		// initOnSelectionChanged is on. Only the first call builds the panel.
		state.selectedText = typeof text === "string" ? text : "";
		start();
	};

	window.Asc.plugin.button = function () {
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onThemeChanged = function (theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		var color = theme && theme["text-normal"];
		if (color) {
			document.querySelectorAll(".link").forEach(function (node) {
				node.style.color = color;
			});
		}
	};

	window.Asc.plugin.onTranslate = function () {
		document.querySelectorAll(".i18n").forEach(function (node) {
			if (node.childElementCount === 0 && node.textContent.trim()) {
				node.textContent = tr(node.textContent.trim());
			}
		});
	};

	// Exposed for the test rig only.
	window.AsyntaiPanel = { state: state, connect: connect, disconnect: disconnect };
})(window);
