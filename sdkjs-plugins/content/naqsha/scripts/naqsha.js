// Naqsha for ONLYOFFICE: shows the Naqsha editor (the browser version at nixpx.com) in the plugin
// window and keeps each diagram in the document as an OLE object — its picture is what the
// document shows and prints, and its data is the whole diagram, so double-clicking it opens it
// here again for editing.
//
// The editor and this page talk with postMessage (see src/embed.rs in the Naqsha repo):
//   editor → plugin  {naqsha: "ready"}                      editor is running
//   plugin → editor  {naqsha: "load", doc}                  the diagram to edit ("" for a new one)
//   plugin → editor  {naqsha: "export"}                     Insert was pressed
//   editor → plugin  {naqsha: "exported", doc, png, width, height}  or  {naqsha: "error", message}
(function (window) {
	"use strict";

	// a different editor (a local build, a staging site) can be given as ?editor=… on the plugin URL
	var EDITOR = new URLSearchParams(location.search).get("editor") || "https://nixpx.com/naqsha/app/";
	var EDITOR_ORIGIN = new URL(EDITOR, location.href).origin;
	// widest a new diagram is placed, in millimetres (the text width of an A4 page)
	var MAX_WIDTH_MM = 160;

	var frame, status, ready = false, inserting = false, stored = "", timer;

	var slow = false;
	function tr(t) { return window.Asc.plugin.tr ? window.Asc.plugin.tr(t) : t; }
	// the loading message, in the editor's language once the translations are in
	function message() {
		if (ready || !status) return;
		status.textContent = "";
		if (!slow) { status.textContent = tr("Loading Naqsha…"); return; }
		var a = document.createElement("a");
		a.href = "https://nixpx.com/naqsha"; a.target = "_blank"; a.textContent = "nixpx.com";
		// one span: inside the flex box, loose text and the link would lose the space between them
		var line = document.createElement("span");
		line.append(tr("Naqsha is taking a while to load. It needs an internet connection to") + " ", a, ".");
		status.append(line);
	}
	function close() { window.Asc.plugin.executeCommand("close", ""); }
	function send(msg) { frame.contentWindow.postMessage(msg, EDITOR_ORIGIN); }

	window.Asc.plugin.init = function (data) {
		frame = document.getElementById("naqsha");
		status = document.getElementById("status");
		// the OLE data of the object being edited (empty when inserting a new diagram)
		stored = typeof data === "string" ? data : "";
		window.addEventListener("message", onMessage);
		frame.src = EDITOR + (EDITOR.indexOf("?") < 0 ? "?" : "&") + "embed=onlyoffice";
		message();
		timer = setTimeout(function () { slow = true; message(); }, 20000);
	};

	function onMessage(e) {
		if (e.source !== frame.contentWindow || e.origin !== EDITOR_ORIGIN) return;
		var m = e.data;
		if (typeof m === "string") { try { m = JSON.parse(m); } catch (_) { return; } }
		if (!m || typeof m.naqsha !== "string") return;
		if (m.naqsha === "ready") {
			ready = true;
			clearTimeout(timer);
			status.classList.add("hidden");
			send({ naqsha: "load", doc: stored || null });
		} else if (m.naqsha === "exported") {
			insert(m);
		} else if (m.naqsha === "error") {
			inserting = false;
		}
	}

	function insert(m) {
		var info = window.Asc.plugin.info;
		var editing = info.objectId !== undefined;
		var aspect = m.height / m.width;
		// CSS pixels are 96 per inch
		var w = m.width * 25.4 / 96;
		if (editing && info.width) w = info.width;           // keep the size it was given in the document
		else if (w > MAX_WIDTH_MM) w = MAX_WIDTH_MM;
		var param = {
			guid: info.guid,
			data: m.doc,
			imgSrc: m.png,
			width: w,
			height: w * aspect,
			widthPix: Math.round(m.width * 2),
			heightPix: Math.round(m.height * 2),
			objectId: info.objectId,
			resize: info.resize
		};
		window.Asc.plugin.executeMethod(editing ? "EditOleObject" : "AddOleObject", [param], close);
	}

	window.Asc.plugin.button = function (id) {
		// Insert (0): ask the editor for the diagram; Cancel or the window's ×: just close
		if (id === 0 && ready) {
			if (inserting) return;
			inserting = true;
			send({ naqsha: "export" });
			// if the editor never answers, don't leave the window stuck
			setTimeout(function () { inserting = false; }, 15000);
		} else {
			close();
		}
	};

	// mouse released outside the plugin window while dragging in the editor
	window.Asc.plugin.onExternalMouseUp = function () {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.dispatchEvent(evt);
	};

	window.Asc.plugin.onTranslate = message;

	window.Asc.plugin.onThemeChanged = function (theme) {
		if (window.Asc.plugin.onThemeChangedBase) window.Asc.plugin.onThemeChangedBase(theme);
	};
})(window);
