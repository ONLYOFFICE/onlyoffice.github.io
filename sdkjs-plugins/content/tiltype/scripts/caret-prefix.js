/**
 * Читает оставшуюся часть слова после сброса буфера ввода ONLYOFFICE.
 * Команда Office API проверяет обе стороны курсора без изменения документа.
 */
"use strict";

/**
 * Возвращает слово при редактировании его конца.
 * Передаётся в редактор через callCommand и использует глобальный Office API.
 * @returns {string} Буквы слева от курсора или пустая строка.
 */
function readCaretPrefix() {
  const editor = typeof Api.GetDocument === "function" ? Api.GetDocument() : Api.GetPresentation?.();
  if (!editor || typeof editor.GetCurrentWord !== "function" || editor.GetCurrentWord("after")) return "";
  return editor.GetCurrentWord("before") || "";
}
