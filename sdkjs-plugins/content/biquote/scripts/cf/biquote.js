/**
 * Live market price from biquote.io: forex, metals, crypto, stocks, indices and Grand Bazaar (Kapalıçarşı) gold. Turkish names such as "çeyrek" or "gram altın" work too.
 * @customfunction
 * @param {string} symbol Symbol, e.g. "EURUSD", "XAUUSD", "BTCUSDT", or a Turkish name like "çeyrek".
 * @param {?string} field Optional: "mid" (default), "bid", "ask", "high", "low", "change", "spread", "time", "stale" or "name".
 * @returns {any} The requested value.
 */
async function BIQUOTE(symbol, field) {
  var f = BQ_FIELDS[bqNormalize(field || "mid")];
  if (!f) throw new Error("Unknown field " + field);
  var s = bqResolveSymbol(symbol);
  var q = (await bqFetch([s]))[s];
  if (!q) throw new Error("Unknown symbol " + s);
  if (f === "mid") return bqPrice(q);
  var v = q[f];
  return v === undefined || v === null ? "" : v;
}
