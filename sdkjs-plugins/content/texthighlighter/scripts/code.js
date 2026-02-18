(function (window) {
  "use strict";

  // === 1) Dropdown toggle bindings (run once on DOM load)
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dropdown-header").forEach((header) => {
      header.addEventListener("click", () => {
        header.parentElement.classList.toggle("open");
      });
    });
  });

  // 2) Theme change handler
  function onThemeChanged(theme) {
    // Let OnlyOffice apply its base styling
    window.Asc.plugin.onThemeChangedBase(theme);

    // Toggle our dark-mode class
    document.body.classList.toggle("dark-mode", theme.type === "dark");
  }
  window.Asc.plugin.attachEvent?.("onThemeChanged", onThemeChanged);
  window.Asc.plugin.onThemeChanged = onThemeChanged;

  // UI elements (filled in init)
  let searchInput, ignoreCaseBox, applyBtn;
  let stateInput, stateNo, stateDone;
  let loader, foundCountSpan;
  let highlightMore1, highlightMore2, revertBtn;

  window.Asc.plugin.init = function (text) {
    // Cache DOM nodes
    searchInput = document.getElementById("searchText");
    ignoreCaseBox = document.getElementById("ignoreCase");
    applyBtn = document.getElementById("ApplyButton");
    stateInput = document.getElementById("state-input");
    stateNo = document.getElementById("state-no-results");
    stateDone = document.getElementById("state-done");
    loader = document.getElementById("loader");
    foundCountSpan = document.getElementById("foundCount");
    highlightMore1 = document.getElementById("HighlightMore1");
    highlightMore2 = document.getElementById("HighlightMore2");
    revertBtn = document.getElementById("RevertToOriginal");

    Asc.scope.textColor = "#000000";
    const pickrEl = document.getElementById("textColorPicker");
    if (pickrEl) {
      const pickr = Pickr.create({
        el: pickrEl,
        theme: "classic",
        default: "#000000",
        components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            hex: true,
            rgba: false,
            input: true,
            clear: false,
            save: true,
          },
        },
      });

      pickr.on("init", (instance) => {
        const hex = instance.getColor().toHEXA().toString();
        Asc.scope.textColor = hex;
        Asc.scope.lastTxtColor = hex;
      });

      pickr.on("save", (color) => {
        const hex = color.toHEXA().toString();
        Asc.scope.textColor = hex;
        Asc.scope.lastTxtColor = hex;
        pickr.hide();
      });
    }

    // Simple state-switchers
    function showInput() {
      stateInput.style.display = "";
      stateNo.style.display = "none";
      stateDone.style.display = "none";
      loader.style.display = "none";
    }

    // Wire up UI
    applyBtn.disabled = true;
    searchInput.addEventListener("input", () => {
      applyBtn.disabled = !searchInput.value.trim();
      Asc.scope.appliedToSelection = false;
    });

    applyBtn.addEventListener("click", onApply);
    highlightMore1.addEventListener("click", showInput);
    highlightMore2.addEventListener("click", showInput);
    revertBtn.addEventListener("click", onRevert);

    // If the plugin was opened with a selection, use it
    if (text && text.trim()) {
      searchInput.value = text.trim();
      applyBtn.disabled = false;
    }

    // React when user changes selection in the document
    if (window.Asc.plugin.attachEvent) {
      window.Asc.plugin.attachEvent("onSelectionChanged", (sel) => {
        if (sel && sel.text) {
          searchInput.value = sel.text;
          applyBtn.disabled = false;
        }
      });
    }

    // Initialize last-term storage
    Asc.scope.lastTerm = "";
    Asc.scope.lastCaseSens = false;

    // Show the initial state
    showInput();
  };

  // 3) Apply highlights
  function onApply() {
    // Reset undo count for each new apply action
    Asc.scope.undoCount = 1;
    
    const caseSens = !ignoreCaseBox.checked;
    const hlColor = document.getElementById("highlightColor").value;
    const txtColor = Asc.scope.textColor || "#000000";
    const doBold = document.getElementById("boldCheckbox").checked;
    const doItalic = document.getElementById("italicCheckbox").checked;
    const doUnder = document.getElementById("underlineCheckbox").checked;
    const doStrike = document.getElementById("strikeCheckbox").checked;

    // Store properties in Asc.scope
    Asc.scope.caseSens = caseSens;
    Asc.scope.hlColor = hlColor;
    Asc.scope.txtColor = txtColor;
    Asc.scope.doBold = doBold;
    Asc.scope.doItalic = doItalic;
    Asc.scope.doUnder = doUnder;
    Asc.scope.doStrike = doStrike;
    Asc.scope.lastTerm = searchInput.value.trim();

    // Transition UI
    stateInput.style.display = "none";
    stateNo.style.display = "none";
    stateDone.style.display = "none";
    loader.style.display = "";

    window.Asc.plugin.callCommand(function () {
      const doc = Api.GetDocument();
      const core = doc.GetCore();
      core.SetLanguage("fr-FR");

      const language = core.GetLanguage();

      const range = doc.GetRangeBySelect();
      const textPr = Api.CreateTextPr();

      // Set all text properties
      textPr.SetHighlight(Asc.scope.hlColor);
      if (Asc.scope.doBold) textPr.SetBold(true);
      if (Asc.scope.doItalic) textPr.SetItalic(true);
      if (Asc.scope.doUnder) textPr.SetUnderline(true);
      if (Asc.scope.doStrike) textPr.SetStrikeout(true);

      if (Asc.scope.txtColor !== "#000000") {
        const rgb = Asc.scope.txtColor
          .slice(1)
          .match(/.{2}/g)
          .map((h) => parseInt(h, 16));
        textPr.SetColor(rgb[0], rgb[1], rgb[2], false);
      }

      if (range && range.GetText && range.GetText() !== "") {
        // Apply to selected range
        range.SetTextPr(textPr);
        Asc.scope.appliedViaSelection = true;
        return 1;
      } else if (Asc.scope.lastTerm) {
        // Search mode if no selection
        const results = doc.Search(Asc.scope.lastTerm, Asc.scope.caseSens);
        results.forEach((result) => {
          result.SetTextPr(textPr);
        });
        Asc.scope.appliedViaSelection = false;
        return results.length;
      } else {
        // Apply to entire document
        const paragraphs = doc.GetAllParagraphs();
        paragraphs.forEach((para) => {
          para.SetTextPr(textPr);
        });
        Asc.scope.appliedViaSelection = true;
        return paragraphs.length;
      }
    }, false);
  }

  // 4) Revert highlights

  function onRevert() {
    // If nothing was applied, exit safely
    if (!Asc.scope.undoCount || Asc.scope.undoCount <= 0) {
      resetToMainView();
      return;
    }

    loader.style.display = "";

    const performUndo = (stepsRemaining) => {
      if (stepsRemaining <= 0) {
        // Done undoing → clean state
        Asc.scope.undoCount = 0;
        Asc.scope.lastTerm = "";
        Asc.scope.appliedViaSelection = false;

        loader.style.display = "none";

        // Show clean UI again
        resetToMainView();
        return;
      }

      // Perform 1 undo → then recursively undo the rest
      window.Asc.plugin.executeMethod("Undo", null, () => {
        setTimeout(() => performUndo(stepsRemaining - 1), 100);
      });
    };

    // Start the undo chain
    performUndo(Asc.scope.undoCount);
  }
  function resetToMainView() {
    stateInput.style.display = "";
    stateNo.style.display = "none";
    stateDone.style.display = "none";
    loader.style.display = "none";
  }

  // 5) After each callCommand
  window.Asc.plugin.onCommandCallback = function (count) {
    const n = Number(count) || 0;
    loader.style.display = "none";

    if (n === 0) {
      stateNo.style.display = "";
      stateDone.style.display = "none";
      stateInput.style.display = "none";
    } else if (Asc.scope.appliedViaSelection) {
      // show input again, so user can immediately re‐apply or revert
      stateInput.style.display = "none";
      stateDone.style.display = "";
      stateNo.style.display = "";
    } else {
      // regular search‐based Done UI
      foundCountSpan.textContent = n;
      stateDone.style.display = "";
      stateInput.style.display = "none";
      stateNo.style.display = "none";
    }
  };

  Asc.scope.undoCount = 1; // one full operation to undo

  // 6) Translation hookup
  window.Asc.plugin.onTranslate = function () {
    const $ = (id) => document.getElementById(id);
    const trSafe = (key) => {
      const t = window.Asc.plugin.tr(key);
      return t && t !== key ? t : null; // null → fallback to English text from HTML
    };

    // Simple text replacements
    const applyTr = (id) => {
      const el = $(id);
      if (!el) return;
      const translated = trSafe(id);
      if (translated) el.innerHTML = translated; // fallback happens automatically
    };

    // IDs to translate
    const idsToTranslate = [
      "PluginInstructions",
      "TextToSearch",
      "IgnoreCase",
      "HighlightColor",
      "HighlightYellow",
      "HighlightGreen",
      "HighlightBlue",
      "HighlightRed",
      "HighlightNone",
      "TextColorHeader",
      "TextFormattingHeader",
      "FormatBold",
      "FormatItalic",
      "FormatUnderline",
      "FormatStrike",
      "ApplyButton",
      "SearchNoResults",
      "SearchDone",
      "MatchesFound",
      "HighlightMore1",
      "HighlightMore2",
      "RevertToOriginal",
      "LoadingMessage",
    ];

    idsToTranslate.forEach(applyTr);

    // Placeholder translation
    const input = $("searchText");
    if (input) {
      const placeholder = trSafe("SearchPlaceholder");
      if (placeholder) input.placeholder = placeholder;
    }
  };
})(window);
