/**
 * Выбирает исправление для завершённого слова.
 * Проверяет варианты Hunspell и использует частоту для разрешения неоднозначности.
 */
"use strict";

/** @typedef {Partial<Record<DictionaryLanguage, DictionaryEntry[]>>} Dictionaries */

const corrections = (() => {
  const WORD_PATTERNS = {
    en: /^[a-z]+$/,
    ru: /^[а-яё]+$/,
    kk: /^[а-яёәғқңөұүһі]+$/,
  };
  const MAX_WORD_LENGTH = 32;
  /** @type {Record<DictionaryLanguage, Map<string, string>>} */
  const COMMON_TYPOS = {
    en: new Map([["teh", "the"], ["adn", "and"], ["recieve", "receive"], ["definately", "definitely"]]),
    ru: new Map([["превет", "привет"], ["пожалуста", "пожалуйста"], ["спосибо", "спасибо"]]),
    kk: new Map([["рақметт", "рақмет"], ["қазақсатан", "қазақстан"], ["салеметсіз", "сәлеметсіз"]]),
  };

  /**
   * Возвращает исправленное слово и направление раскладки либо null.
   * @param {string} word Набранное целиком слово.
   * @param {CorrectionSettings} options Настройки исправлений.
   * @param {Dictionaries} dictionaries Индексы частотных списков.
   * @param {Spellcheckers} spellcheckers Подключённые словари Hunspell.
   * @param {LayoutLanguage | null} [previousLayout] Направление предыдущей замены.
   * @returns {WordCorrection | null}
   */
  function suggest(word, options, dictionaries, spellcheckers, previousLayout = null) {
    if (!word || word.length > MAX_WORD_LENGTH) return null;
    const normalized = word.toLowerCase();
    const uppercase = word === word.toUpperCase();
    const titleCase = word === normalized[0].toUpperCase() + normalized.slice(1);
    if (word !== normalized && !uppercase && !titleCase) return null;

    const isLatin = WORD_PATTERNS.en.test(normalized);
    const isCyrillic = WORD_PATTERNS.kk.test(normalized);
    if (!isLatin && !isCyrillic) return null;
    if (options.layout) {
      const layout = layoutCorrection.convert(normalized, isLatin ? "en" : "ru", options.language,
        previousLayout, spellcheckers, dictionaries);
      if (layout) return { ...layout, text: applyCase(layout.text, uppercase, titleCase) };
    }

    if (!options.spelling || uppercase || normalized.length < 3) return null;
    /** @type {DictionaryLanguage[]} */
    const languages = isLatin ? ["en"] : WORD_PATTERNS.ru.test(normalized) ? ["ru", "kk"] : ["kk"];
    const targets = options.language === "auto" ? languages : languages.filter((language) => language === options.language);
    const spelling = correctSpelling(normalized, titleCase, targets, dictionaries, spellcheckers);
    return spelling ? { text: applyCase(spelling, false, titleCase), layout: null } : null;
  }

  /** @param {string} word @param {boolean} uppercase @param {boolean} titleCase */
  function applyCase(word, uppercase, titleCase) {
    if (uppercase) return word.toUpperCase();
    return titleCase ? word[0].toUpperCase() + word.slice(1) : word;
  }

  /**
   * @param {string} word
   * @param {boolean} titleCase Слово может быть именем или названием.
   * @param {DictionaryLanguage[]} targets
   * @param {Dictionaries} dictionaries
   * @param {Spellcheckers} spellcheckers
   */
  function correctSpelling(word, titleCase, targets, dictionaries, spellcheckers) {
    for (const target of targets) {
      const known = COMMON_TYPOS[target].get(word);
      if (known) return known;
    }
    // Для имён оставляем только явные соответствия из списка частых опечаток.
    if (titleCase || word.length < 4) return "";
    if (targets.some((language) =>
      spellcheckers[language]?.spell(word) || Number.isFinite(completion.getRank(dictionaries[language], word)))) return "";

    const maxDistance = word.length >= 6 ? 2 : 1;
    /** @type {Map<string, { word: string, distance: number, score: number }>} */
    const candidates = new Map();
    for (const target of targets) {
      const engine = spellcheckers[target];
      if (!engine) continue;
      for (const [index, suggestion] of engine.suggest(word).entries()) {
        const candidate = suggestion.toLowerCase();
        if (candidate === word || !WORD_PATTERNS[target].test(candidate)) continue;
        // Не отбрасываем конец незнакомого слова, кроме очевидного повтора буквы.
        if (word.startsWith(candidate) && ![...word.slice(candidate.length)].every((letter) => letter === candidate.at(-1))) continue;
        const distance = editDistance(word, candidate);
        if (distance > maxDistance) continue;
        const rank = completion.getRank(dictionaries[target], candidate);
        const score = Math.log2(Math.min(rank, 150_000) + 1) + index;
        if (score < (candidates.get(candidate)?.score ?? Infinity)) {
          candidates.set(candidate, { word: candidate, distance, score });
        }
      }
    }
    const [best, alternative] = [...candidates.values()].sort((left, right) =>
      left.distance - right.distance || left.score - right.score);
    if (!best || (alternative && best.distance === alternative.distance && alternative.score - best.score < 2)) return "";
    return best.word;
  }

  /** @param {string} left @param {string} right */
  function editDistance(left, right) {
    let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    let earlier = previous;
    for (let row = 1; row <= left.length; row += 1) {
      const current = [row];
      for (let col = 1; col <= right.length; col += 1) {
        const cost = Number(left[row - 1] !== right[col - 1]);
        current[col] = Math.min(previous[col] + 1, current[col - 1] + 1, previous[col - 1] + cost);
        if (row > 1 && col > 1 && left[row - 1] === right[col - 2] && left[row - 2] === right[col - 1]) {
          current[col] = Math.min(current[col], earlier[col - 2] + 1);
        }
      }
      earlier = previous;
      previous = current;
    }
    return previous[right.length];
  }

  return { suggest };
})();
