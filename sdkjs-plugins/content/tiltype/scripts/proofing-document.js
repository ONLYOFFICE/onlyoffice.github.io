/**
 * Команды Office API для снимка абзаца, языка проверки и пунктуационных правок.
 * Перед изменением повторно проверяет идентификатор абзаца и точный текст.
 */
"use strict";

/** @typedef {{ id: string, text: string, caret: number | null }} ProofingParagraph */
/** @typedef {{ start: number, end: number, original: string, replacement: string }} DocumentTextFix */
/** @typedef {{ snapshot: ProofingParagraph, fix: DocumentTextFix, atCaret: true }} ReversibleWordEdit */

/**
 * Читает текущий абзац без номеров списков и определяет позицию курсора.
 * @returns {ProofingParagraph | null} Снимок для локальной проверки.
 */
function readProofingParagraph() {
  const doc = Api.GetDocument();
  const paragraph = doc.GetCurrentParagraph();
  if (!paragraph) return null;
  const options = { Numbering: false, Math: false };
  const text = paragraph.GetText(options);
  const selection = doc.GetRangeBySelect();
  const range = paragraph.GetRange();
  const position = selection && range ? selection.GetStartPos() - range.GetStartPos() : null;
  const beforeCaret = position && position > 0 ? paragraph.GetRange(0, position)?.GetText(options) : "";
  const caret = position !== null && position >= 0 && beforeCaret !== undefined ? Array.from(beforeCaret).length : null;
  return { id: paragraph.GetInternalId(), text, caret };
}

/**
 * Назначает языки или применяет выбранное исправление к точному снимку абзаца.
 * @returns {boolean} Абзац совпал со снимком и был обработан.
 */
function applyProofingEdit() {
  const edit = Asc.scope.autocompleteProofingEdit;
  const { snapshot } = edit;
  const doc = Api.GetDocument();
  const paragraph = doc.GetCurrentParagraph();
  const options = { Numbering: false, Math: false };
  if (!paragraph || paragraph.GetInternalId() !== snapshot.id || paragraph.GetText(options) !== snapshot.text) return false;
  const letters = Array.from(snapshot.text);

  /** @param {number} start @param {number} end */
  function exactRange(start, end) {
    if (!paragraph) return null;
    const full = paragraph.GetRange();
    if (!full) return null;
    const max = full.GetEndPos() - full.GetStartPos();

    /** @param {number} length */
    function findBoundary(length) {
      if (!paragraph || length === 0) return 0;
      const expected = letters.slice(0, length).join("");
      let low = 1;
      let high = max;
      // Office API включает позиции между элементами форматирования, которых нет в обычном тексте.
      while (low < high) {
        const position = Math.floor((low + high) / 2);
        const prefix = paragraph.GetRange(0, position)?.GetText(options);
        if (prefix === undefined) return -1;
        if (prefix.length < expected.length) low = position + 1;
        else high = position;
      }
      return paragraph.GetRange(0, low)?.GetText(options) === expected ? low : -1;
    }

    const first = findBoundary(start);
    const last = findBoundary(end);
    if (first < 0 || last <= first) return null;
    const range = paragraph.GetRange(first, last);
    return range?.GetText(options) === letters.slice(start, end).join("") ? range : null;
  }

  if ("fix" in edit) {
    const { fix } = edit;
    if (edit.atCaret) {
      const caret = doc.GetRangeBySelect();
      const full = paragraph.GetRange();
      if (!caret || !full || caret.GetStartPos() !== caret.GetEndPos()) return false;
      const position = caret.GetStartPos() - full.GetStartPos();
      if (position <= 0 || paragraph.GetRange(0, position)?.GetText(options) !== letters.slice(0, fix.end).join("")) {
        return false;
      }
    }
    const range = exactRange(fix.start, fix.end);
    if (!range || range.GetText(options) !== fix.original || !range.Select()) return false;
    const changed = Api.ReplaceTextSmart([fix.replacement]);
    doc.RemoveSelection();
    return changed;
  }

  for (const { start, end, locale } of edit.spans) {
    const range = exactRange(start, end);
    if (!range) continue;
    const language = range.GetTextPr()?.GetLanguage();
    if (typeof language === "string" && language.split("-")[0] === locale.split("-")[0]) continue;
    range.SetLanguage(locale);
  }
  return true;
}
