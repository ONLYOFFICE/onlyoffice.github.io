/**
 * Поиск продолжений в частотных словарях русского, казахского и английского.
 * Не зависит от SDK редактора. Словари поступают в порядке убывания частоты.
 */
"use strict";

/** @typedef {{ word: string, rank: number }} DictionaryEntry */
/** @typedef {"en" | "ru" | "kk"} DictionaryLanguage */

const completion = (() => {
  const MIN_PREFIX_LENGTH = 3;
  const MAX_SUGGESTIONS = 10;
  const ENGLISH = /^[a-z]+$/;
  const CYRILLIC = /^[а-яёәғқңөұүһі]+$/;
  const KAZAKH_LETTERS = /[әғқңөұүһі]/;

  /**
   * Возвращает буквенный фрагмент у курсора в исходном регистре.
   * @param {string} text Буфер ввода редактора.
   */
  function getPrefix(text) {
    return text.match(/\p{L}+$/u)?.[0] ?? "";
  }

  /**
   * Индексирует строки словаря для поиска по префиксу с сохранением частотного ранга.
   * @param {string} text Словоформы в порядке убывания частоты, по одной на строку.
   * @returns {DictionaryEntry[]} Записи в порядке лексикографического сравнения JS.
   */
  function indexDictionary(text) {
    return text.trim().split(/\r?\n/)
      .filter((word) => ENGLISH.test(word) || CYRILLIC.test(word))
      .map((word, rank) => ({ word, rank }))
      .sort(compareWords);
  }

  /** @param {DictionaryEntry} left @param {DictionaryEntry} right */
  function compareWords(left, right) {
    if (left.word < right.word) return -1;
    if (left.word > right.word) return 1;
    return 0;
  }

  /** @param {DictionaryEntry[]} dictionary @param {string} word */
  function lowerBound(dictionary, word) {
    let first = 0;
    let end = dictionary.length;
    while (first < end) {
      const middle = Math.floor((first + end) / 2);
      if (dictionary[middle].word < word) {
        first = middle + 1;
      } else {
        end = middle;
      }
    }
    return first;
  }

  /**
   * Возвращает частотный ранг слова. Для отсутствующего слова возвращает Infinity.
   * @param {DictionaryEntry[] | undefined} dictionary Индекс выбранного языка.
   * @param {string} word Слово в нижнем регистре.
   */
  function getRank(dictionary, word) {
    if (!dictionary) return Infinity;
    const entry = dictionary[lowerBound(dictionary, word)];
    return entry?.word === word ? entry.rank : Infinity;
  }

  /** @param {DictionaryEntry[]} dictionary @param {string} prefix */
  function findMatches(dictionary, prefix) {
    const matches = [];
    for (let index = lowerBound(dictionary, prefix); index < dictionary.length; index += 1) {
      const entry = dictionary[index];
      if (!entry.word.startsWith(prefix)) break;
      if (entry.word !== prefix) matches.push(entry);
    }

    return matches.sort((left, right) => left.rank - right.rank);
  }

  /**
   * Возвращает до десяти уникальных продолжений, сохраняя регистр набранных букв.
   * @param {string} prefix Буквы, набранные пользователем.
   * @param {Partial<Record<DictionaryLanguage, DictionaryEntry[]>>} dictionaries Загруженные индексы.
   * @returns {string[]} Подсказки в порядке отображения.
   */
  function suggest(prefix, dictionaries) {
    const normalized = prefix.toLowerCase();
    if (normalized.length < MIN_PREFIX_LENGTH) return [];

    /** @type {DictionaryLanguage[]} */
    const languages = ENGLISH.test(normalized) ? ["en"] : cyrillicLanguages(normalized);
    const matches = languages.map((language) => findMatches(dictionaries[language] ?? [], normalized));
    const uppercase = prefix === prefix.toUpperCase();
    const words = new Set();

    // Чередование даёт обоим кириллическим словарям место в коротком списке.
    const longestList = Math.max(0, ...matches.map((list) => list.length));
    for (let index = 0; index < longestList && words.size < MAX_SUGGESTIONS; index += 1) {
      for (const list of matches) {
        if (index >= list.length || words.size >= MAX_SUGGESTIONS) continue;
        const suffix = list[index].word.slice(normalized.length);
        words.add(prefix + (uppercase ? suffix.toUpperCase() : suffix));
      }
    }
    return [...words];
  }

  /** @param {string} prefix @returns {DictionaryLanguage[]} */
  function cyrillicLanguages(prefix) {
    if (!CYRILLIC.test(prefix)) return [];
    return KAZAKH_LETTERS.test(prefix) ? ["kk"] : ["ru", "kk"];
  }

  return { getPrefix, indexDictionary, getRank, suggest };
})();
