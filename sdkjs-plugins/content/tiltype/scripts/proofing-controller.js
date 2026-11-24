/**
 * Подключает распознавание языка после ввода и пунктуацию в меню редактора.
 * Обрабатывает только активный абзац и передаёт в Office API точный снимок текста.
 */
"use strict";

/**
 * Подключает проверку к текстовому редактору и возвращает планировщик после ввода.
 * @param {EditorPlugin} plugin Экземпляр фонового плагина.
 */
function installProofing(plugin) {
  const sdk = Reflect.get(window, "Asc");
  const pause = 450;
  const maxLength = 8_000;
  const maxMenuItems = 8;
  const language = getSettingsLanguage(plugin.info.lang);
  const labels = {
    ru: {
      menu: "Пунктуация", detect: "Определить язык абзаца",
      before: "Убрать пробел перед", after: "Добавить пробел после", spacing: "Перенести пробел после",
      repeated: "Убрать повтор знака", because: "Поставить запятую перед «потому что»",
    },
    en: {
      menu: "Punctuation", detect: "Detect paragraph language",
      before: "Remove space before", after: "Add space after", spacing: "Move space after",
      repeated: "Remove repeated mark", because: "Insert comma before «потому что»",
    },
    kk: {
      menu: "Тыныс белгілері", detect: "Абзац тілін анықтау",
      before: "Алдындағы бос орынды алып тастау", after: "Кейін бос орын қосу", spacing: "Бос орынды белгіден кейін қою",
      repeated: "Қайталанған белгіні алып тастау", because: "«потому что» алдына үтір қою",
    },
  }[language];
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  let revision = 0;
  /** @type {ProofingParagraph | null} */
  let analyzed = null;
  /** @type {ProofingParagraph | null} */
  let menuSnapshot = null;
  /** @type {PunctuationFix[]} */
  let menuFixes = [];

  /** @param {unknown} result @returns {result is ProofingParagraph} */
  function isSnapshot(result) {
    if (!result || typeof result !== "object" || !("id" in result) || !("text" in result)) return false;
    return typeof result.id === "string" && typeof result.text === "string" && result.text.length <= maxLength &&
      "caret" in result && (result.caret === null || typeof result.caret === "number" && Number.isFinite(result.caret));
  }

  /** @param {ProofingParagraph} snapshot */
  function assignLanguages(snapshot) {
    const spans = proofingLanguage.detect(snapshot.text, spellcheck.dictionaries);
    if (spans.length === 0) return;
    sdk.scope = { ...sdk.scope, autocompleteProofingEdit: { snapshot, spans } };
    plugin.callCommand(applyProofingEdit, false, true, (applied) => {
      if (applied === true) analyzed = snapshot;
    });
  }

  function queueAfterInput() {
    const request = ++revision;
    clearTimeout(timer);
    if (!correctionSettings.read().proofing) return;
    timer = setTimeout(() => {
      if (!correctionSettings.read().proofing) return;
      plugin.callCommand(readProofingParagraph, false, false, (result) => {
        if (request !== revision || !isSnapshot(result)) return;
        if (analyzed?.id === result.id && analyzed.text === result.text) return;
        assignLanguages(result);
      });
    }, pause);
  }

  plugin.attachEditorEvent("onContextMenuShow", (options) => {
    menuSnapshot = null;
    menuFixes = [];
    const settings = correctionSettings.read();
    if ((!settings.punctuation && !settings.proofing) || (options?.type !== "Target" && options?.type !== "Selection")) {
      plugin.executeMethod("AddContextMenuItem", [{ guid: plugin.guid, items: [] }]);
      return;
    }
    plugin.callCommand(readProofingParagraph, false, false, (result) => {
      /** @type {{ id: string, text: string, items?: { id: string, text: string }[] }[]} */
      const items = [];
      if (isSnapshot(result)) {
        menuSnapshot = result;
        const caret = result.caret;
        if (settings.punctuation) {
          menuFixes = findPunctuationFixes(result.text)
            .sort((left, right) => caret === null ? 0 : Math.abs(left.start - caret) - Math.abs(right.start - caret))
            .slice(0, maxMenuItems);
        }
        if (menuFixes.length) {
          items.push({
            id: "autocomplete-punctuation",
            text: labels.menu,
            items: menuFixes.map((fix, index) => ({
              id: `autocomplete-punctuation-${index}`,
              text: fix.rule === "because" ? labels.because : `${labels[fix.rule]} «${fix.original.trim()[0]}»`,
            })),
          });
        }
        if (settings.proofing && result.text.trim()) items.push({ id: "autocomplete-language", text: labels.detect });
      }
      plugin.executeMethod("AddContextMenuItem", [{ guid: plugin.guid, items }]);
    });
  });

  plugin.attachEditorEvent("onContextMenuClick", (id) => {
    if (!menuSnapshot) return;
    if (id === "autocomplete-language") {
      if (correctionSettings.read().proofing) assignLanguages(menuSnapshot);
      return;
    }
    const index = /^autocomplete-punctuation-(\d+)$/.exec(id)?.[1];
    const fix = index === undefined ? null : menuFixes[Number(index)];
    if (!fix || !correctionSettings.read().punctuation) return;
    sdk.scope = { ...sdk.scope, autocompleteProofingEdit: { snapshot: menuSnapshot, fix } };
    plugin.callCommand(applyProofingEdit, false, true, () => {});
  });

  return queueAfterInput;
}
