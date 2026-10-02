# Changelog

All notable changes to the OnlyMath plugin are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## 1.1.1

- Security hardening, following a review of 1.1.0:
  - The engine can no longer use the network. Once it has started, web requests from the
    calculation worker are switched off, so text such as `read("https://…")` in a math
    field cannot make the plugin contact a web address. Ordinary calculations are unchanged.
  - The "Defined" list in Settings now shows function definitions as plain text, so text
    in a document can never be interpreted as page markup.
  - Alt+M (empty math field) uses only the plugin API and no longer reaches into the
    editor's own window.

## 1.1.0

- Fixed a wrong answer for roots with an index. A root written with the index
  typed into the radical (for example the index 2 on 16) used to be calculated as
  if the index and the number were added, and showed `3·√2≈4,243` instead of `4`.
  Cube roots and fourth roots, which the editor writes as single characters, used
  to give `undef` and now work too: `∛27=3`, `∜625=5`.
- **Calculate (Alt+C) no longer solves equations.** An equation with an unknown, such
  as `2x+6=10`, is left untouched and the status line tells you to press Alt+L.
  An equation without unknowns, such as `f(1)=1²+2-2`, has its right-hand side
  calculated and the value added: `f(1)=1²+2-2=1`. This works whether or not `f` is
  defined. Function definitions (`f(x):=…`) are still done with Alt+C.
- **Math fields inline with text now work.** Put the cursor inside a field that sits in
  a sentence (or select it) and press Alt+C or Alt+L: only the field is read and
  replaced, and the sentence around it is left alone. If a line holds several equations,
  or the field is a fraction, root or similar, select the equation first (Shift+arrows);
  OnlyMath says so instead of guessing.
- After Alt+C the cursor stays inside the result, so you can keep editing it. An empty
  line below is now added only after Alt+L results that end the document.
- The solve result (label and `⇔ x=…`) is placed directly below the equation instead of at the
  end of the document.
- An indefinite integral no longer shows an empty dotted square between the `∫` and the
  integrand. `∫2x dx` now gives `∫2x dx=x²+c` with the `2x` inside the integral.
- **Live symbols while typing in a math field:** `*` becomes `·` and `'` becomes `′` as you
  type (press space after `f′` and the editor draws the raised prime). This only happens
  at the end of the equation you are typing, never in ordinary text. (`<=` becoming `≤`
  and `+-` becoming `±` are done by the editor itself.)
- Added a link to the OnlyMath YouTube channel
  ([youtube.com/@OnlyMathPlugin](https://www.youtube.com/@OnlyMathPlugin)) at the bottom
  of the Settings panel and in the plugin description, and a first video
  ([2+2](https://www.youtube.com/shorts/kOxe0qzAUoc)) to the README. Clicking the link
  opens your browser; OnlyMath itself still makes no network requests.
- The computer-algebra worker is now loaded from a versioned address, so an updated
  OnlyMath is no longer shadowed by a copy cached by the browser.
- OnlyMath now refuses notation it cannot read, such as a matrix or a root with
  a missing index, and says so, instead of returning a wrong answer.
- The integration constant is now `c` instead of `k`: `∫2x dx=x²+c`.
- Euler's number is displayed as `e` instead of `exp(1)`, so `e` now gives
  `e≈2,718` and solving `ln(x)=1` gives `x=e`.

## 1.0.2

- The **X** on the Settings panel now closes it. Previously nothing happened,
  because the editor asks the plugin to handle its own window-header buttons and
  OnlyMath had no handler for them.
- Closing the Settings panel no longer affects anything else: the shortcuts, the
  toolbar menu and the computer-algebra engine keep running, so reopening
  Settings is instant and closing it never interrupts your work.
- Moved the **OnlyMath** button from the Insert tab to the **Plugins** tab, where
  ONLYOFFICE groups plugin commands. The shortcuts and the right-click menu are
  unchanged, and remain the quickest way to work.

## 1.0.1

- Decimal comma now applies to every result, including symbolic ones such as √20.
  Where Giac returns an exact value and a decimal approximation, they are joined
  with **≈** rather than **=**. Mathematical mode reuses the last chosen decimal
  precision (default 3).
- Rewrote the README for people deciding whether to install, documented the
  **OnlyMath** toolbar button on the Insert tab, and replaced the store
  screenshots (the previous set still showed the retired Alt+B shortcut).
- Added `translations/langs.json` so the plugin manager and store card can report
  the supported languages. The interface is English; no additional translations
  are bundled yet.
- Added `3rd-Party.txt` and a `licenses/` folder listing the bundled third-party
  components (Giac/Xcas and the Emscripten runtime) with their full licence texts.
  Giac's own licence continues to ship at `cas/giac/LICENSE`.

## 1.0.0

Initial public release.

- Insert a math field with **Alt+M** and evaluate mathematics directly in the document.
- **Calculate** (`Alt+C`) expressions, **solve** (`Alt+L`) equations, **differentiate**
  and **integrate** using a built-in Giac/Xcas computer-algebra engine
  (WebAssembly, runs client-side).
- Reach every action three ways: keyboard shortcuts, the **OnlyMath** button on the
  Insert tab, or the right-click menu inside a math field.
- Right-side **Settings** panel with output precision control (including a symbolic
  "Mathematical" mode that keeps results like π and √2 exact).
- Danish high-school notation and locale: decimal comma, integration constant `k`,
  Scandinavian solution formatting.
- Works fully offline; the CAS engine is bundled with the plugin.
