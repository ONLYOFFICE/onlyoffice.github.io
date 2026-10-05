/*
 * Helpers shared by the BIQUOTE and BIQUOTE_CONVERT custom functions.
 *
 * Custom functions run inside the spreadsheet editor, not in the plugin
 * frame, and the editor stores each one as a self-contained source string
 * (localStorage "cell-custom-functions-library"). So this file is
 * concatenated into each function's source by scripts/code.js and must not
 * reference anything outside itself. Function declarations are hoisted, so
 * this text is placed after the @customfunction declaration it serves.
 *
 * The logic mirrors apps/sheets-addon/src (Aliases.js, Rates.js) in the
 * biquote repository.
 */

var BQ_API = "https://biquote.io";
var BQ_TTL_MS = 60 * 1000;
var BQ_CACHE = {};      // SYMBOL -> { t: fetchedAt, q: tick | null }
var BQ_INFLIGHT = {};   // SYMBOL -> Promise

function bqNormalize(s) {
  return String(s)
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[’'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

var BQ_PRODUCTS = {
  "gram altin": "GRAMALTINTRY_HRM", "gram": "GRAMALTINTRY_HRM",
  "has altin": "ALTINTRY_HRM", "has": "ALTINTRY_HRM",
  "ceyrek": "CEYREKYENI_HRM", "ceyrek altin": "CEYREKYENI_HRM", "yeni ceyrek": "CEYREKYENI_HRM", "eski ceyrek": "CEYREKESKI_HRM",
  "yarim": "YARIMYENI_HRM", "yarim altin": "YARIMYENI_HRM", "yeni yarim": "YARIMYENI_HRM", "eski yarim": "YARIMESKI_HRM",
  "tam": "TAMYENI_HRM", "tam altin": "TAMYENI_HRM", "yeni tam": "TAMYENI_HRM", "eski tam": "TAMESKI_HRM",
  "ata": "ATAYENI_HRM", "ata altin": "ATAYENI_HRM", "cumhuriyet": "ATAYENI_HRM", "cumhuriyet altini": "ATAYENI_HRM", "eski ata": "ATAESKI_HRM",
  "ata besli": "ATA5YENI_HRM", "besli": "ATA5YENI_HRM", "eski ata besli": "ATA5ESKI_HRM",
  "gremse": "GREMSEYENI_HRM", "eski gremse": "GREMSEESKI_HRM",
  "22 ayar": "AYAR22TRY_HRM", "22 ayar altin": "AYAR22TRY_HRM", "bilezik": "AYAR22TRY_HRM",
  "14 ayar": "AYAR14TRY_HRM", "14 ayar altin": "AYAR14TRY_HRM",
  "gumus": "GUMUSTRY_HRM", "gram gumus": "GUMUSTRY_HRM"
};

var BQ_CURRENCIES = {
  "tl": "TRY", "lira": "TRY", "turk lirasi": "TRY",
  "dolar": "USD", "amerikan dolari": "USD",
  "euro": "EUR", "avro": "EUR",
  "sterlin": "GBP", "pound": "GBP",
  "frank": "CHF", "isvicre frangi": "CHF",
  "yen": "JPY", "japon yeni": "JPY",
  "riyal": "SAR", "suudi riyali": "SAR",
  "ons": "XAU", "ons altin": "XAU", "ons gumus": "XAG",
  "bitcoin": "BTC", "ethereum": "ETH"
};

function bqIsProductSymbol(code) {
  for (var k in BQ_PRODUCTS) if (BQ_PRODUCTS[k] === code) return true;
  return false;
}

function bqResolveSymbol(input) {
  if (input === null || input === undefined || String(input).trim() === "") throw new Error("Missing symbol");
  var n = bqNormalize(input);
  if (BQ_PRODUCTS[n]) return BQ_PRODUCTS[n];
  var c = BQ_CURRENCIES[n];
  if (c && c !== "TRY") {
    if (c === "XAU") return "XAUUSD_HRM";
    if (c === "XAG") return "XAGUSD_HRM";
    if (c === "BTC" || c === "ETH") return c + "USDT";
    return c + "TRY_HRM";
  }
  return String(input).trim().toUpperCase().replace(/\s+/g, "");
}

function bqResolveUnit(input) {
  if (input === null || input === undefined || String(input).trim() === "") throw new Error("Missing currency");
  var n = bqNormalize(input);
  if (BQ_PRODUCTS[n]) return { kind: "product", symbol: BQ_PRODUCTS[n] };
  if (BQ_CURRENCIES[n]) return { kind: "ccy", code: BQ_CURRENCIES[n] };
  var code = String(input).trim().toUpperCase();
  if (bqIsProductSymbol(code)) return { kind: "product", symbol: code };
  if (/^[A-Z0-9]{2,6}$/.test(code)) return { kind: "ccy", code: code };
  throw new Error("Unknown currency " + input);
}

function bqMarket(m) {
  var v = m === undefined || m === null || m === "" ? "market" : bqNormalize(m).replace(/\s/g, "");
  if (v === "kc" || v === "harem" || v === "grandbazaar") v = "kapalicarsi";
  if (v !== "market" && v !== "kapalicarsi") throw new Error("Unknown market " + m);
  return v;
}

function bqPrice(q) {
  if (!q) return undefined;
  var p = q.mid || q.last || q.bid;
  return typeof p === "number" && isFinite(p) && p > 0 ? p : undefined;
}

// Latest quotes as { SYMBOL: tick }, one request for everything not cached.
async function bqFetch(symbols) {
  var now = Date.now();
  var out = {};
  var missing = [];
  symbols.forEach(function (s) {
    s = String(s).toUpperCase();
    var c = BQ_CACHE[s];
    if (c && now - c.t < BQ_TTL_MS) { if (c.q) out[s] = c.q; }
    else if (missing.indexOf(s) < 0) missing.push(s);
  });
  if (!missing.length) return out;

  var key = missing.slice().sort().join(",");
  if (!BQ_INFLIGHT[key]) {
    var qs = missing.map(function (s) { return "symbols=" + encodeURIComponent(s); }).join("&");
    BQ_INFLIGHT[key] = fetch(BQ_API + "/api/latest?" + qs)
      .then(function (r) {
        if (!r.ok) throw new Error(r.status === 429 ? "biquote rate limit" : "biquote HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        var t = Date.now();
        missing.forEach(function (s) { BQ_CACHE[s] = { t: t, q: data[s] || null }; });
        return data;
      })
      .catch(function (e) {
        // Keep showing the last good quote instead of turning cells into errors.
        var served = false;
        missing.forEach(function (s) { if (BQ_CACHE[s] && BQ_CACHE[s].q) served = true; });
        if (!served) throw e;
        return {};
      })
      .finally(function () { delete BQ_INFLIGHT[key]; });
  }
  await BQ_INFLIGHT[key];
  missing.forEach(function (s) { var c = BQ_CACHE[s]; if (c && c.q) out[s] = c.q; });
  return out;
}

function bqSuffix(market) { return market === "kapalicarsi" ? "_HRM" : ""; }

function bqLegs(from, to, market) {
  var sfx = bqSuffix(market);
  var out = {};
  [from, to].forEach(function (u) {
    if (u.kind === "product") { out[u.symbol] = 1; out["USDTRY" + sfx] = 1; return; }
    if (u.code === "USD") return;
    out[u.code + "USD" + sfx] = 1;
    out["USD" + u.code + sfx] = 1;
    if (market === "kapalicarsi") out[u.code + "TRY_HRM"] = 1;
  });
  if (from.kind === "ccy" && to.kind === "ccy" && from.code !== to.code) {
    out[from.code + to.code + sfx] = 1;
    out[to.code + from.code + sfx] = 1;
  }
  if (market === "kapalicarsi") out["USDTRY_HRM"] = 1;
  return Object.keys(out);
}

function bqUsdValue(u, market, q) {
  var sfx = bqSuffix(market);
  var usdTry = bqPrice(q["USDTRY" + sfx]);
  if (u.kind === "product") {
    var p = bqPrice(q[u.symbol]);
    return p && usdTry ? p / usdTry : undefined;
  }
  var c = u.code;
  if (c === "USD") return 1;
  var d = bqPrice(q[c + "USD" + sfx]); if (d) return d;
  var i = bqPrice(q["USD" + c + sfx]); if (i) return 1 / i;
  if (market === "kapalicarsi") {
    if (c === "TRY") return usdTry ? 1 / usdTry : undefined;
    var t = bqPrice(q[c + "TRY_HRM"]);
    if (t && usdTry) return t / usdTry;
  }
  return undefined;
}

function bqRate(from, to, market, q) {
  if (from.kind === "ccy" && to.kind === "ccy") {
    if (from.code === to.code) return 1;
    var sfx = bqSuffix(market);
    var pair = bqPrice(q[from.code + to.code + sfx]); if (pair) return pair;
    var rev = bqPrice(q[to.code + from.code + sfx]); if (rev) return 1 / rev;
  }
  if (from.kind === "product" && to.kind === "ccy" && to.code === "TRY") {
    var p = bqPrice(q[from.symbol]); if (p) return p;
  }
  var a = bqUsdValue(from, market, q);
  var b = bqUsdValue(to, market, q);
  if (!a || !b) throw new Error("No " + market + " price");
  return a / b;
}

var BQ_FIELDS = {
  price: "mid", mid: "mid", fiyat: "mid",
  bid: "bid", alis: "bid",
  ask: "ask", satis: "ask",
  high: "high", yuksek: "high",
  low: "low", dusuk: "low",
  change: "dayDiffPercent", degisim: "dayDiffPercent",
  spread: "spread",
  time: "lastQuoteAt", zaman: "lastQuoteAt",
  stale: "stale",
  name: "description", ad: "description"
};
