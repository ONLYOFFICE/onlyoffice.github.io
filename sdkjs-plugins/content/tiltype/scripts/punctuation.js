/**
 * Находит однозначные пунктуационные исправления в одном абзаце.
 * Возвращает точные фрагменты для контекстного меню, не изменяя текст.
 */
"use strict";

/** @typedef {"before" | "after" | "spacing" | "repeated" | "because"} PunctuationRule */
/** @typedef {{ rule: PunctuationRule, start: number, end: number, original: string, replacement: string }} PunctuationFix */

/**
 * Проверяет пробелы, повторные знаки и пропущенную запятую перед «потому что».
 * @param {string} text Текст абзаца без служебных знаков редактора.
 * @returns {PunctuationFix[]} Локальные правки в порядке текста.
 */
function findPunctuationFixes(text) {
  /** @type {PunctuationFix[]} */
  const fixes = [];
  const protectedSpans = [...text.matchAll(/(?:https?:\/\/|www\.)\S+|[^\s@]+@[^\s@]+/giu)];

  /** @param {PunctuationRule} rule @param {number} offset @param {string} original @param {string} replacement */
  function add(rule, offset, original, replacement) {
    if (protectedSpans.some((span) => offset < span.index + span[0].length && offset + original.length > span.index)) return;
    fixes.push({
      rule,
      start: Array.from(text.slice(0, offset)).length,
      end: Array.from(text.slice(0, offset + original.length)).length,
      original,
      replacement,
    });
  }

  for (const match of text.matchAll(/(?<=[\p{L}\p{N}»”\])])([ \t]+)([,.;:!?])(?![,.;:!?])/gu)) {
    const needsSpaceAfter = /^\p{L}/u.test(text.slice(match.index + match[0].length));
    add(needsSpaceAfter ? "spacing" : "before", match.index, match[0], match[2] + (needsSpaceAfter ? " " : ""));
  }
  for (const match of text.matchAll(/(?<=\p{L})([,;:!?])(?=\p{L})/gu)) {
    add("after", match.index, match[0], match[0] + " ");
  }
  for (const match of text.matchAll(/(?<=\p{L})([,;])\1+(?=\s|$)/gu)) {
    add("repeated", match.index, match[0], match[1]);
  }
  for (const match of text.matchAll(/(?<!\p{L})([а-яё]+)( +)(?=потому +что(?!\p{L}))/giu)) {
    if (["не", "ни", "лишь", "только", "именно", "просто", "особенно", "как", "отчасти", "исключительно", "даже"].includes(match[1].toLowerCase())) continue;
    add("because", match.index + match[1].length, match[2], ", ");
  }

  return fixes.sort((left, right) => left.start - right.start);
}
