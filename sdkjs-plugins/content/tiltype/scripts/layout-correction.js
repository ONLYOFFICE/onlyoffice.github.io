/**
 * Восстанавливает слова, набранные в русской или английской раскладке.
 * Применяет более короткий порог для продолжения уже распознанной фразы.
 */
"use strict";

/** @typedef {"en" | "ru"} LayoutLanguage */
/** @typedef {{ text: string, layout: LayoutLanguage | null }} WordCorrection */

const layoutCorrection = (() => {
  const keys = {
    en: "`qwertyuiop[]asdfghjkl;'zxcvbnm,.",
    ru: "ёйцукенгшщзхъфывапролджэячсмитьбю",
  };
  const shortWords = {
    en: new Set("a i am an as at be by do go he if in is it me my no of oh on or so to up us we and any are but can did for get had has her him his how let may new not now off one our out put see she the too try two use was way who why yes yet you".split(" ")),
    ru: new Set("а в и к о с у я бы во вы да до ее её за из ли мы на не ни но об он от по со то уж без все всё вот где для ему еще ещё как кто мне над нам нас нет она они под при про раз сам так там тем том тут уже чем что это".split(" ")),
  };

  /**
   * Возвращает словарное совпадение после преобразования клавиш или null.
   * @param {string} word Слово в нижнем регистре.
   * @param {LayoutLanguage} source Алфавит набранного слова.
   * @param {CorrectionSettings["language"]} preferred Предпочтительный язык.
   * @param {LayoutLanguage | null} previous Язык предыдущей успешной замены.
   * @param {Spellcheckers} spellcheckers Проверка словоформ.
   * @param {Dictionaries} dictionaries Частотные списки для запуска до загрузки Hunspell.
   * @returns {WordCorrection | null} Исправленное слово и язык.
   */
  function convert(word, source, preferred, previous, spellcheckers, dictionaries) {
    const target = source === "en" ? "ru" : "en";
    if (preferred !== "auto" && preferred !== target) return null;
    if (word.length < 3 && target !== previous) return null;

    let converted = "";
    for (const char of word) {
      const index = keys[source].indexOf(char);
      if (index === -1) return null;
      converted += keys[target][index];
    }

    if (word.length <= 3) {
      if (!shortWords[target].has(converted) || shortWords[source].has(word)) return null;
      if (target !== previous && preferred !== target) return null;
    } else {
      const sourceLanguages = source === "en" ? /** @type {const} */ (["en"]) : /** @type {const} */ (["ru", "kk"]);
      if (sourceLanguages.some((language) => isKnown(word, language, spellcheckers, dictionaries))) return null;
      if (!isKnown(converted, target, spellcheckers, dictionaries)) return null;
    }

    return { text: converted, layout: target };
  }

  /** @param {string} word @param {DictionaryLanguage} language @param {Spellcheckers} engines @param {Dictionaries} dictionaries */
  function isKnown(word, language, engines, dictionaries) {
    if (engines[language]?.spell(word)) return true;
    return completion.getRank(dictionaries[language], word) < 18_000;
  }

  return { convert };
})();
