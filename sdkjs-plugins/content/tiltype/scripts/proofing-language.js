/**
 * Определяет язык проверки фрагментов смешанного абзаца по алфавиту и Hunspell.
 * Возвращает диапазоны для Office API в позициях Unicode, не меняя документ.
 */
"use strict";

/** @typedef {{ start: number, end: number, locale: "en-US" | "ru-RU" | "kk-KZ" }} ProofingSpan */

const proofingLanguage = (() => {
  /** @type {Record<DictionaryLanguage, ProofingSpan["locale"]>} */
  const locales = { en: "en-US", ru: "ru-RU", kk: "kk-KZ" };
  const wordPattern = /[\p{L}\p{M}\d_]+(?:[’'-][\p{L}\p{M}\d_]+)*/gu;
  const kazakhLetters = /[әғқңөұүһі]/iu;

  /**
   * Сопоставляет слова с языками и объединяет соседние однородные фрагменты.
   * @param {string} text Текст одного абзаца.
   * @param {Spellcheckers} engines Загруженные словари.
   * @returns {ProofingSpan[]} Диапазоны с распознанным языком.
   */
  function detect(text, engines) {
    const words = Array.from(text.matchAll(wordPattern), (match) => {
      const word = match[0];
      return {
        start: match.index,
        end: match.index + word.length,
        cyrillic: /^[а-яёәғқңөұүһі'-]+$/iu.test(word),
        language: identify(word, engines),
      };
    });

    /** @type {{ start: number, end: number, locale: ProofingSpan["locale"] }[]} */
    const spans = [];
    for (const [index, word] of words.entries()) {
      const language = word.language ?? (word.cyrillic ? nearbyCyrillic(words, index) : null);
      if (!language) continue;
      const locale = locales[language];
      const last = spans.at(-1);
      if (last?.locale === locale && /^\s+$/u.test(text.slice(last.end, word.start))) {
        last.end = word.end;
      } else {
        spans.push({ start: word.start, end: word.end, locale });
      }
    }
    let previousEnd = 0;
    let position = 0;
    return spans.map(({ start, end, locale }) => {
      const first = position + Array.from(text.slice(previousEnd, start)).length;
      position = first + Array.from(text.slice(start, end)).length;
      previousEnd = end;
      return { start: first, end: position, locale };
    });
  }

  /** @param {string} word @param {Spellcheckers} engines @returns {DictionaryLanguage|null} */
  function identify(word, engines) {
    if (/^[a-z]+(?:[’'-][a-z]+)*$/iu.test(word)) return "en";
    if (!/^[а-яёәғқңөұүһі'-]+$/iu.test(word)) return null;
    if (kazakhLetters.test(word)) return "kk";
    if (!engines.ru || !engines.kk) return null;
    const ru = engines.ru.spell(word) || engines.ru.spell(word.toLowerCase());
    const kk = engines.kk.spell(word) || engines.kk.spell(word.toLowerCase());
    if (ru === kk) return null;
    return ru ? "ru" : "kk";
  }

  /** @param {{ cyrillic: boolean, language: DictionaryLanguage | null }[]} words @param {number} index */
  function nearbyCyrillic(words, index) {
    const left = findAnchor(words, index, -1);
    const right = findAnchor(words, index, 1);
    if (!left) return right?.language ?? null;
    if (!right || left.distance < right.distance) return left.language;
    if (right.distance < left.distance) return right.language;
    return left.language === right.language ? left.language : null;
  }

  /** @param {{ cyrillic: boolean, language: DictionaryLanguage | null }[]} words @param {number} index @param {number} step */
  function findAnchor(words, index, step) {
    const limit = 4;
    for (let distance = 1; distance <= limit; distance += 1) {
      const word = words[index + distance * step];
      if (!word?.cyrillic) break;
      if (word.language === "ru" || word.language === "kk") return { language: word.language, distance };
    }
    return null;
  }

  return { detect };
})();
