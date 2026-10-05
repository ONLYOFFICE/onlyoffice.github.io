# biquote

Live market prices and currency conversion in the ONLYOFFICE spreadsheet editor, powered by the free [biquote.io](https://biquote.io) market data API. No account, no API key.

## Formulas

```
=BIQUOTE("EURUSD")
=BIQUOTE("XAUUSD", "ask")
=BIQUOTE("BTCUSDT", "change")
```

`BIQUOTE(symbol, [field])`: forex pairs, gold and silver, crypto, stocks, indices and commodities. `field` is one of `mid` (default), `bid`, `ask`, `high`, `low`, `change` (daily %), `spread`, `time`, `stale`, `name`.

```
=BIQUOTE_CONVERT(100, "USD", "EUR")
=BIQUOTE_CONVERT(1, "XAU", "TRY")
=BIQUOTE_CONVERT(0.25, "BTC", "GBP")
```

`BIQUOTE_CONVERT(amount, from, to, [market])` uses the direct pair when one is quoted and otherwise converts through USD. `market` is `"market"` (default, broker rates) or `"kapalicarsi"` (Istanbul Grand Bazaar dealer rates).

### Istanbul Grand Bazaar (Kapalıçarşı) gold

Turkish product names work in both functions:

```
=BIQUOTE("gram altın")
=BIQUOTE("çeyrek", "ask")
=BIQUOTE_CONVERT(2, "çeyrek", "EUR", "kapalicarsi")
```

Recognised names: gram altın, has altın, çeyrek, yarım, tam, ata, ata beşli, gremse, 22 ayar, 14 ayar, gümüş, ons, plus dolar, euro, sterlin and TL.

## Panel

Open it from the **biquote** toolbar tab → **Market data**. You can:

- search symbols with live prices and insert a `BIQUOTE` formula into the selected cell;
- build a `BIQUOTE_CONVERT` formula;
- recalculate on demand, or every 1, 5 or 15 minutes while the panel is open.

## Notes

- Requires ONLYOFFICE Docs / Desktop Editors 9.0 or later (custom functions that fetch data are asynchronous).
- The functions are registered when the plugin starts. Enable it once under **Plugins → Background plugins**, and it will load with the spreadsheet editor from then on.
- Prices are indicative and may be delayed. They come from third-party sources and are not investment advice. See the [Terms of Use](https://biquote.io/terms.html) and [Privacy Policy](https://biquote.io/privacy.html).
- Only symbol names and currency codes are sent to biquote.io. Spreadsheet content is never sent.

Guide and support: https://biquote.io
