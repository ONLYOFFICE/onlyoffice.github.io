/**
 * Convert an amount between currencies, metals, crypto and Grand Bazaar gold products with live biquote.io rates.
 * @customfunction
 * @param {string} amount Amount to convert: a number or a cell.
 * @param {string} from Currency or product, e.g. "USD", "EUR", "XAU", "BTC", "gram altın", "çeyrek".
 * @param {string} to Target currency or product.
 * @param {?string} market Optional: "market" (default, broker rates) or "kapalicarsi" (Grand Bazaar rates).
 * @returns {number} The converted amount.
 */
async function BIQUOTE_CONVERT(amount, from, to, market) {
  var m = bqMarket(market);
  var a = bqResolveUnit(from);
  var b = bqResolveUnit(to);
  var q = await bqFetch(bqLegs(a, b, m));
  // Typed as string so the editor passes the value through untouched; accept
  // either decimal separator.
  var n = amount === "" || amount === undefined || amount === null ? 1
        : Number(typeof amount === "string" ? amount.trim().replace(",", ".") : amount);
  if (!isFinite(n)) throw new Error("Amount must be a number");
  return n * bqRate(a, b, m, q);
}
