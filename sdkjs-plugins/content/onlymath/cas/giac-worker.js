/* eslint-disable no-restricted-globals */
(() => {
  /** ES2018-safe replaceAll for untranspiled worker script. */
  function replaceAll(str, search, replacement) {
    if (!search) return str;
    return String(str).split(search).join(replacement);
  }

  /** Resolvers waiting for WASM to become ready (replaces PING-poll loop). */
  const readyWaiters = [];
  let caseval = null;
  let initError = null;

  /**
   * Single source-of-truth for locale normalization + implicit multiplication.
   * Called only here; giac-cas.ts sends the raw expression to keep things DRY.
   */
  function normalizeForCas(expr) {
    let s = (expr || "").toString();

    // Common math symbols → Giac tokens
    s = replaceAll(replaceAll(s, "π", "pi"), "∞", "infinity");

    // Strip ONLYOFFICE math-editor control glyphs that are never valid input.
    // When ∫ is inserted from the toolbar it carries an empty placeholder slot;
    // typing the integrand into it leaves a placeholder glyph (eg ∫▨f(x)dx) that
    // would otherwise reach Giac as integrate(▨(…),x) and echo unevaluated. The
    // codepoint varies by build/font (Private Use Area or a box/geometric glyph),
    // so every empty-slot class is removed. Mirrors solve-engine.ts.
    //   U+200B–U+200D,U+2060,U+FEFF zero-width;  U+2061–U+2064 invisible ops;
    //   U+2500–U+25FF box/shapes;  U+2B00–U+2BFF symbols;  U+E000–U+F8FF PUA;
    //   U+FFFC/U+FFFD replacement.
    s = s.replace(/[\u200B-\u200D\u2060-\u2064\u2500-\u25FF\u2B00-\u2BFF\uE000-\uF8FF\uFEFF\uFFFC\uFFFD]/g, "");

    // normBound converts Unicode bound notation to plain ASCII numbers.
    // ONLYOFFICE encodes: lower bound → subscript digits (U+2080–U+2089),
    //                     upper bound → superscript digits (U+00B2, U+00B3,
    //                                   U+00B9, U+2070, U+2074–U+2079).
    function normBound(b) {
      const sub = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4",
                    "₅":"5","₆":"6","₇":"7","₈":"8","₉":"9" };
      const sup = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4",
                    "⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9" };
      let s = String(b).trim()
        .replace(/−/g, "-")
        .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => sub[c] || c)
        .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => sup[c] || c)
        .replace(/(\d)\s*,\s*(\d)/g, "$1.$2");
      // Append "." to pure integers so the decimal-comma normalization
      // rule "(\d),(\d)→\1.\2" cannot merge adjacent Giac arguments:
      //   integrate(f,x,2,3) → "2,3" → "2.3"  WRONG
      //   integrate(f,x,2.,3.) → ".," → no match  CORRECT
      if (/^-?\d+$/.test(s)) s += ".";
      return s;
    }

    // Strip one or more redundant outer paren pairs wrapping the whole integrand
    // ("(2x+6)" → "2x+6"), but leave "(a)(b)" intact. This Giac build does not
    // evaluate the double-parenthesised form integrate((expr),x).
    function stripOuterParens(str) {
      let t = String(str).trim();
      while (t.charAt(0) === "(") {
        let depth = 0, matchEnd = -1;
        for (let i = 0; i < t.length; i++) {
          if (t.charAt(i) === "(") depth++;
          else if (t.charAt(i) === ")") { if (--depth === 0) { matchEnd = i; break; } }
        }
        if (matchEnd === t.length - 1) t = t.slice(1, -1).trim();
        else break;
      }
      return t;
    }

    // Subscript/superscript digit sets used in bound regexes below.
    const SUB  = "₀₁₂₃₄₅₆₇₈₉";
    const SUPR = "⁰¹²³⁴⁵⁶⁷⁸⁹";

    // Format 1: ONLYOFFICE Unicode bounds — subscript lower, superscript upper
    //   ∫₁³ f(x) dx  →  integrate(f(x),x,1,3)
    s = s.replace(
      new RegExp(
        "∫([" + SUB + "]+)([" + SUPR + "]+)\\s*([\\s\\S]+?)\\s*d\\s*([A-Za-z])\\b",
        "g"
      ),
      (_m, lo, hi, integrand, v) =>
        `integrate(${stripOuterParens(integrand)},${v},${normBound(lo)},${normBound(hi)})`
    );

    // Format 2: ASCII _a^b or _(a)^(b), e.g. ∫_1^3 f(x) dx  or  ∫_(1)^(3) f(x) dx
    s = s.replace(
      /∫\s*_\s*\(?\s*([0-9.,+\-]+)\s*\)?\s*\^\s*\(?\s*([0-9.,+\-]+)\s*\)?\s*([\s\S]+?)\s*d\s*([A-Za-z])\b/g,
      (_m, lo, hi, integrand, v) =>
        `integrate(${stripOuterParens(integrand)},${v},${normBound(lo)},${normBound(hi)})`
    );

    // Indefinite: ∫ expr d x  →  integrate(expr,x)
    s = s.replace(/∫\s*([\s\S]+?)\s*d\s*([A-Za-z])\b/g, (_m, integrand, v) =>
      `integrate(${stripOuterParens(integrand)},${v})`
    );

    // Unicode operator variants
    s = replaceAll(replaceAll(replaceAll(replaceAll(s, "−", "-"), "·", "*"), "×", "*"), "÷", "/");

    // Unicode superscripts: x²³ → x^23 (multi-digit handled correctly)
    const superMap = {
      "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
      "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"
    };
    s = s.replace(/([A-Za-z0-9\)])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_m, base, sup) => {
      const digits = sup.split("").map(ch => (superMap[ch] != null ? superMap[ch] : "")).join("");
      return digits ? `${base}^${digits}` : `${base}${sup}`;
    });

    // Implicit multiplication: 2x → 2*x, x2 → x*2, 2( → 2*(, )x → )*x
    s = s
      .replace(/(\d)\s*([A-Za-z])/g, "$1*$2")
      .replace(/([A-Za-z])\s*(\d)/g, "$1*$2")
      .replace(/(\d|\))\s*\(/g, "$1*(")
      .replace(/\)\s*([A-Za-z0-9])/g, ")*$1");

    // Remove spaces used as DK/DE thousands separators: "10 000" → "10000"
    s = s.replace(/(\d)\s+(\d)/g, "$1$2");

    // DK/DE thousands + decimal: "30.406,22" → "30406.22"
    s = s.replace(/\b\d{1,3}(\.\d{3})+,\d+\b/g, m => replaceAll(m, ".", "").replace(",", "."));

    // Decimal comma: "99,50" → "99.50"
    s = s.replace(/(\d)\s*,\s*(\d)/g, "$1.$2");

    return s.trim();
  }

  /**
   * Post a response back to the main thread.
   * If postMessage itself throws (e.g. non-cloneable payload), we send a
   * structured error instead of silently dropping the response (which would
   * leave the caller hanging indefinitely).
   */
  function respond(id, payload) {
    try {
      postMessage({ id, ...payload });
    } catch (e) {
      try {
        postMessage({ id, ok: false, error: "POSTMESSAGE_FAILED: " + String(e) });
      } catch (_) {
        // Nothing more we can do
      }
    }
  }

  /**
   * Choose the angle unit per evaluation:
   *   1 = radians, 0 = degrees.
   *
   * Symbolic calculus (diff / integrate) uses RADIANS so the results are the
   * standard forms taught in class — d/dx sin(x)=cos(x), d/dx cos(x)=-sin(x),
   * ∫cos(x)dx=sin(x) — instead of the degree-mode chain-rule factor
   * (e.g. -(pi/180)*sin(x)). Everything else — plain numeric evaluation
   * (cos(60)=0.5) and equation solving (root values like x=90) — uses DEGREES.
   *
   * `solve(`/`cSolve(` wins over diff/integrate so solving stays in degrees even
   * when a derivative appears inside (e.g. solve(diff(...))=… for extrema).
   */
  function angleRadianFor(normalized) {
    if (/solve\s*\(/i.test(normalized)) return 0;
    if (/\b(?:diff|integrate)\s*\(/i.test(normalized)) return 1;
    return 0;
  }

  function doEval(id, expr) {
    if (typeof caseval !== "function") {
      respond(id, { ok: false, error: initError || "CAS_NOT_READY" });
      return;
    }
    const normalized = normalizeForCas(expr);
    try {
      // Set the angle unit for THIS evaluation (CAS context is persistent, so we
      // set it explicitly every time rather than relying on a global default).
      try { caseval("angle_radian:=" + angleRadianFor(normalized)); } catch (_) { /* keep going */ }
      const out = caseval(normalized);
      respond(id, { ok: true, normalized, result: (out || "").toString().trim() });
    } catch (e) {
      respond(id, { ok: false, normalized, error: String(e) });
    }
  }

  // Emscripten Module overrides must be defined before importScripts.
  self.Module = {
    noInitialRun: true,
    print: () => {},
    printErr: () => {},
    onRuntimeInitialized() {
      try {
        caseval = self.Module.cwrap("caseval", "string", ["string"]);
        // Default angle unit = DEGREES (Giac defaults to radians). Each EVAL also
        // sets the unit explicitly via angleRadianFor(), so calculus runs in
        // radians while numeric/solve runs in degrees; this is just a safe default.
        try { caseval("angle_radian:=0"); } catch (_) { /* keep init resilient */ }
        // Notify the main thread via a one-shot READY message instead of
        // requiring repeated PING polling.
        postMessage({ type: "READY" });
        // Drain requests that arrived before WASM was ready.
        for (const { id, expr } of readyWaiters) doEval(id, expr);
        readyWaiters.length = 0;
      } catch (e) {
        initError = String(e);
        postMessage({ type: "READY_ERROR", error: initError });
        // Drain with error responses so callers don't hang.
        for (const { id } of readyWaiters) {
          respond(id, { ok: false, error: initError });
        }
        readyWaiters.length = 0;
      }
    }
  };

  // Giac engine loader.
  //
  // The ~18 MB Emscripten single-file build (giacwasm.js, WASM base64-embedded)
  // is deliberately NOT shipped inside the marketplace package, which must stay
  // small. It is loaded at runtime: a same-origin local copy is preferred when
  // present (dev builds / full installs), otherwise we fall back to a copy
  // served from the public GitHub repo via the jsDelivr CDN.
  //
  // ENGINE_CDN is pinned to an immutable commit so the fetched engine can never
  // drift from the code that expects it. Hosted in the public OpenMath-eu org
  // repo (the mr-mathiasen user account is an Enterprise Managed User and its
  // repos are never anonymously reachable). Update it only when the engine
  // binary is intentionally rebuilt (also update docs/ENGINE_NOTES.md).
  var ENGINE_LOCAL = "./giac/giacwasm.js";
  var ENGINE_CDN =
    "https://cdn.jsdelivr.net/gh/OpenMath-eu/onlymath-engine" +
    "@7d3ccf044bd7fdd9468299ba03b8ff01b1981d39" +
    "/giacwasm.js";

  function loadEngine() {
    // importScripts throws synchronously on a 404 / network error, so a missing
    // local copy simply falls through to the CDN. If both fail we surface a
    // structured READY_ERROR instead of letting callers hang until timeout.
    try {
      importScripts(ENGINE_LOCAL);
      return;
    } catch (localErr) {
      try {
        importScripts(ENGINE_CDN);
        return;
      } catch (cdnErr) {
        initError =
          "ENGINE_LOAD_FAILED: local=" + String(localErr) +
          " cdn=" + String(cdnErr);
        try { postMessage({ type: "READY_ERROR", error: initError }); } catch (_) { /* nothing more */ }
      }
    }
  }

  loadEngine();

  addEventListener("message", event => {
    const msg = event && event.data;
    if (!msg || typeof msg !== "object") return;
    const { id, type, expr } = msg;

    if (type === "EVAL") {
      if (caseval === null && initError === null) {
        readyWaiters.push({ id, expr: expr || "" });
      } else {
        doEval(id, expr || "");
      }
    }
    // PING kept for backwards-compat with any old callers
    if (type === "PING") {
      respond(id, { ok: true, ready: caseval !== null });
    }
  });
})();
