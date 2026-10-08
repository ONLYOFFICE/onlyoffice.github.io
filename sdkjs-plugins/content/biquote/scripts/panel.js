/*
 * Side panel: symbol search with live prices, formula builder, refresh.
 * Talks to biquote.io directly (public endpoints allow any origin) and asks
 * the background plugin to write formulas / recalculate via sendToPlugin.
 */
(function (window) {
  var API = "https://biquote.io";
  var $ = function (id) { return document.getElementById(id); };
  var selected = null, timer = null, debounce = null, searchSeq = 0;
  var tr = function (s) { return window.Asc.plugin.tr ? window.Asc.plugin.tr(s) : s; };

  function say(id, text, err) {
    var el = $(id);
    el.textContent = text || "";
    el.className = "msg" + (err ? " err" : "");
  }

  function q(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }

  function fmt(n) {
    if (n === undefined || n === null || !isFinite(n)) return "";
    var a = Math.abs(n), d = a >= 100 ? 2 : a >= 1 ? 4 : 6;
    return n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function fold(s) {
    return String(s).toLocaleLowerCase("tr-TR")
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u");
  }

  async function getJson(path) {
    var r = await fetch(API + path);
    if (!r.ok) throw new Error(r.status === 429 ? tr("Rate limit reached, try again in a minute.") : "HTTP " + r.status);
    return r.json();
  }

  async function search() {
    var text = $("q").value.trim(), cat = $("cat").value, seq = ++searchSeq;
    if (!text && cat !== "kapalicarsi") { render([]); say("m1", ""); return; }
    say("m1", tr("Searching…"));
    try {
      var list;
      if (cat === "kapalicarsi") {
        var all = await getJson("/api/symbols?exchange=kapalicarsi");
        var n = fold(text);
        list = all.filter(function (s) { return !n || fold(s.name + " " + (s.description || "")).indexOf(n) >= 0; });
      } else {
        list = await getJson("/api/symbols/search?liveOnly=true&limit=50&q=" + encodeURIComponent(text));
        if (cat) list = list.filter(function (s) { return String(s.type).toLowerCase() === cat; });
      }
      if (seq !== searchSeq) return;
      list = list.slice(0, 50);
      render(list);
      say("m1", list.length ? "" : tr("No matches."));
      if (list.length) prices(list.map(function (s) { return s.name; }));
    } catch (e) {
      if (seq === searchSeq) say("m1", e.message, true);
    }
  }

  function render(list) {
    var ul = $("results");
    ul.innerHTML = "";
    selected = null;
    $("insertPrice").disabled = true;
    list.forEach(function (s) {
      var li = document.createElement("li");
      li.dataset.sym = s.name;
      var left = document.createElement("div");
      left.style.minWidth = "0";
      var sym = document.createElement("div"); sym.className = "sym"; sym.textContent = s.name;
      var desc = document.createElement("div"); desc.className = "desc"; desc.textContent = s.description || "";
      left.appendChild(sym); left.appendChild(desc);
      var px = document.createElement("div"); px.className = "px";
      li.appendChild(left); li.appendChild(px);
      li.onclick = function () {
        Array.prototype.forEach.call(ul.children, function (x) { x.classList.remove("sel"); });
        li.classList.add("sel");
        selected = s.name;
        $("insertPrice").disabled = false;
      };
      li.ondblclick = insertPrice;
      ul.appendChild(li);
    });
  }

  async function prices(names) {
    try {
      var qs = names.map(function (n) { return "symbols=" + encodeURIComponent(n); }).join("&");
      var data = await getJson("/api/latest?" + qs);
      Array.prototype.forEach.call($("results").children, function (li) {
        var t = data[li.dataset.sym];
        if (!t) return;
        var el = li.querySelector(".px");
        el.textContent = fmt(t.mid || t.last || t.bid);
        el.classList.toggle("stale", !!t.stale);
      });
    } catch (e) { /* prices are a nicety; search results stand on their own */ }
  }

  // A number as a formula literal that reads the same in every locale: no
  // decimal separator (0.5 -> (5/10)) and parenthesised, because "100," is
  // misparsed where the comma is the decimal separator (tr, de, fr…).
  function formulaNumber(n) {
    if (!isFinite(n)) n = 1;
    var s = String(Math.abs(n));
    if (/e/i.test(s)) s = Math.abs(n).toFixed(10).replace(/0+$/, "").replace(/\.$/, "");
    var sign = n < 0 ? "-" : "";
    var dot = s.indexOf(".");
    if (dot < 0) return "(" + sign + s + ")";
    var digits = s.replace(".", "").replace(/^0+(?=\d)/, "");
    return "(" + sign + digits + "/1" + new Array(s.length - dot).join("0") + ")";
  }

  function insert(formula, msgId) {
    window.__bqLastMsg = msgId;
    window.Asc.plugin.sendToPlugin("onInsertFormula", formula);
  }

  function insertPrice() {
    if (!selected) return;
    insert("=BIQUOTE(" + q(selected) + "," + q($("field").value) + ")", "m1");
  }

  function refresh() {
    window.Asc.plugin.sendToPlugin("onRefresh", {});
  }

  window.Asc.plugin.init = function () {
    $("q").addEventListener("input", function () { clearTimeout(debounce); debounce = setTimeout(search, 300); });
    $("cat").addEventListener("change", search);
    $("insertPrice").addEventListener("click", insertPrice);
    $("insertConv").addEventListener("click", function () {
      var amt = formulaNumber($("amt").value === "" ? 1 : Number($("amt").value));
      insert("=BIQUOTE_CONVERT(" + amt + "," + q($("from").value.trim()) + "," + q($("to").value.trim()) + "," + q($("mkt").value) + ")", "m2");
    });
    $("now").addEventListener("click", refresh);
    $("live").addEventListener("change", function () {
      clearInterval(timer);
      timer = null;
      var min = Number($("live").value);
      if (min > 0) {
        timer = setInterval(refresh, min * 60000);
        say("m3", tr("Auto refresh is on while this panel is open."));
      } else {
        say("m3", "");
      }
    });

    window.Asc.plugin.attachEvent("onInserted", function (address) {
      say(window.__bqLastMsg || "m1", address ? tr("Inserted in") + " " + address + "." : tr("Inserted."));
    });
    // Theme switches while the panel is open, forwarded by scripts/code.js.
    window.Asc.plugin.attachEvent("onThemeChanged", function (theme) {
      if (window.Asc.plugin.onThemeChangedBase) window.Asc.plugin.onThemeChangedBase(theme);
    });
    window.Asc.plugin.attachEvent("onRefreshed", function (time) {
      say("m3", tr("Refreshed at") + " " + time + ".");
    });
  };

  window.Asc.plugin.onTranslate = function () {
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      el.textContent = tr(el.getAttribute("data-i18n"));
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-placeholder]"), function (el) {
      el.placeholder = tr(el.getAttribute("data-i18n-placeholder"));
    });
  };

  window.Asc.plugin.onThemeChanged = function (theme) {
    if (window.Asc.plugin.onThemeChangedBase) window.Asc.plugin.onThemeChangedBase(theme);
  };
})(window);
