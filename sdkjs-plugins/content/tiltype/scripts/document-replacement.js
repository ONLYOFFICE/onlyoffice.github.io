/**
 * Заменяет завершённое слово в текущем текстовом документе.
 * Проверка текста у курсора и замена выполняются одной командой Office API.
 */
"use strict";

/**
 * Исправляет слово перед только что набранным пробелом, если курсор ещё там.
 * @param {EditorPlugin} plugin Транспорт команд фонового плагина.
 * @param {string} original Набранное слово.
 * @param {string} replacement Исправленное слово.
 * @param {(success: boolean, undo: ReversibleWordEdit | null) => void} onComplete Результат и данные отмены.
 */
function replaceCompletedWord(plugin, original, replacement, onComplete) {
  const sdk = Reflect.get(window, "Asc");
  sdk.scope = { ...sdk.scope, autocompleteReplacement: { original, replacement } };
  plugin.callCommand(replaceAtCaret, false, true, (result) => {
    const undo = result && typeof result === "object" && "atCaret" in result && result.atCaret === true
      ? /** @type {ReversibleWordEdit} */ (result)
      : null;
    onComplete(result === true || undo !== null, undo);
  });
}

/**
 * Возвращает исходное слово, если курсор всё ещё стоит после исправленного.
 * @param {EditorPlugin} plugin Транспорт команд редактора.
 * @param {ReversibleWordEdit} undo Данные последней автозамены.
 */
function undoCompletedWord(plugin, undo) {
  const sdk = Reflect.get(window, "Asc");
  sdk.scope = { ...sdk.scope, autocompleteProofingEdit: undo };
  plugin.callCommand(applyProofingEdit, false, true, () => {});
}

/** Проверяет положение курсора и редактирует текущий текстовый фрагмент внутри редактора. */
function replaceAtCaret() {
  const { original, replacement } = Asc.scope.autocompleteReplacement;
  const document = Api.GetDocument();
  const selection = document.GetRangeBySelect();
  if (selection && selection.GetStartPos() !== selection.GetEndPos()) return false;

  const before = document.GetCurrentSentence("before");
  const needle = before.slice(-original.length - 1);
  if (needle.toLowerCase() !== original.toLowerCase() + " ") return false;
  const actualWord = needle.slice(0, -1);
  // При завершении первого слова редактор может сам сделать первую букву заглавной.
  const wasCapitalized = actualWord[0] !== original[0] && actualWord[0] === actualWord[0].toUpperCase();
  const adjustedReplacement = wasCapitalized
    ? replacement[0].toUpperCase() + replacement.slice(1)
    : replacement;

  const run = document.GetCurrentRun();
  if (!run) return false;
  const text = run.GetText();
  // Сверяем контекст с обеих сторон, чтобы не затронуть похожее слово в другом месте.
  const after = document.GetCurrentSentence("after");
  let offset = -1;
  for (let found = text.indexOf(needle); found !== -1; found = text.indexOf(needle, found + needle.length)) {
    const throughSpace = text.slice(0, found + needle.length);
    if (!before.endsWith(throughSpace) && !throughSpace.endsWith(before)) continue;
    const runSuffix = text.slice(throughSpace.length);
    if (!after.startsWith(runSuffix) && !runSuffix.startsWith(after)) continue;
    if (offset !== -1) return false;
    offset = found;
  }
  if (offset === -1) return false;

  const start = Array.from(text.slice(0, offset)).length;
  const originalCaret = start + original.length + 1;
  if (!run.MoveCursorToPos(start + Number(actualWord.length > 1))) return false;

  const replaced = document.GetCurrentWord() === actualWord &&
    document.ReplaceCurrentWord(adjustedReplacement);
  if (!replaced) {
    run.MoveCursorToPos(originalCaret);
    return false;
  }
  run.MoveCursorToPos(start + adjustedReplacement.length + 1);

  // Для отмены сохраняем видимый текст, потому что проверка языка может разделить его на другие фрагменты.
  const paragraph = document.GetCurrentParagraph();
  const full = paragraph?.GetRange();
  const caret = document.GetRangeBySelect();
  if (!paragraph || !full || !caret || caret.GetStartPos() !== caret.GetEndPos()) return true;
  const position = caret.GetStartPos() - full.GetStartPos();
  if (position <= 0) return true;
  const options = { Numbering: false, Math: false };
  const paragraphText = paragraph.GetText(options);
  const left = paragraph.GetRange(0, position)?.GetText(options);
  const inserted = adjustedReplacement + " ";
  if (!left?.endsWith(inserted) || !paragraphText.startsWith(left)) return true;
  const end = Array.from(left).length;

  return /** @type {ReversibleWordEdit} */ ({
    snapshot: { id: paragraph.GetInternalId(), text: paragraphText, caret: end },
    fix: { start: end - inserted.length, end, original: inserted, replacement: actualWord + " " },
    atCaret: true,
  });
}
