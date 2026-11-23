/**
 * Хранит настройки автокоррекции в профиле редактора.
 * Проверяет данные перед использованием и задаёт подписи для окна настроек.
 */
"use strict";

/** @typedef {{ spelling: boolean, layout: boolean, proofing: boolean, punctuation: boolean, spaceAfterEnter: boolean, language: DictionaryLanguage | "auto" }} CorrectionSettings */

const correctionSettings = (() => {
  const storageKey = "autocomplete-ru-kk-en.corrections";
  /** @type {CorrectionSettings} */
  let current = { spelling: false, layout: false, proofing: true, punctuation: true, spaceAfterEnter: false, language: "auto" };

  /**
   * Проверяет настройки при чтении из хранилища или получении из окна.
   * @param {unknown} value Данные профиля или формы.
   * @returns {CorrectionSettings | null} Допустимые настройки или null.
   */
  function parse(value) {
    if (typeof value !== "object" || value === null) return null;
    if (!("spelling" in value && "layout" in value && "language" in value)) return null;
    const { spelling, layout, language } = value;
    if (typeof spelling !== "boolean" || typeof layout !== "boolean") return null;
    if (language !== "auto" && language !== "ru" && language !== "kk" && language !== "en") return null;
    const proofing = !("proofing" in value) || value.proofing === true;
    const punctuation = !("punctuation" in value) || value.punctuation === true;
    const spaceAfterEnter = "spaceAfterEnter" in value && value.spaceAfterEnter === true;
    return { spelling, layout, language, proofing, punctuation, spaceAfterEnter };
  }

  /** Возвращает текущие настройки профиля редактора. */
  function read() {
    try {
      const text = localStorage.getItem(storageKey);
      if (text) current = parse(JSON.parse(text)) ?? current;
    } catch (error) {
      console.warn("Autocomplete: unable to read preferences", error);
    }
    return current;
  }

  /**
   * Сохраняет настройки для всех документов профиля.
   * @param {CorrectionSettings} settings Проверенные данные формы.
   * @throws При недоступности хранилища редактора.
   */
  function save(settings) {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    current = settings;
  }

  return { parse, read, save };
})();

const settingsLabels = {
  en: {
    title: "TilType settings",
    spelling: "Correct common spelling mistakes",
    layout: "Correct text typed in the wrong layout (RU ↔ EN)",
    proofing: "Detect the spell-check language for each part of the text",
    punctuation: "Suggest punctuation corrections in the context menu",
    spaceAfterEnter: "Add a space after accepting a suggestion with Enter",
    language: "Preferred language for corrections",
    auto: "Automatic",
    detail: "Corrections apply in text documents after a space. The system keyboard layout stays the same.",
    save: "Save",
    cancel: "Cancel",
    error: "Could not save settings.",
  },
  ru: {
    title: "Настройки TilType",
    spelling: "Исправлять частые опечатки",
    layout: "Исправлять набор в неверной раскладке (RU ↔ EN)",
    proofing: "Определять язык проверки для фрагментов текста",
    punctuation: "Предлагать исправления пунктуации в контекстном меню",
    spaceAfterEnter: "Ставить пробел после вставки подсказки клавишей Enter",
    language: "Предпочтительный язык исправлений",
    auto: "Автоматически",
    detail: "Исправления работают в текстовых документах после пробела. Раскладка клавиатуры Windows остаётся прежней.",
    save: "Сохранить",
    cancel: "Отмена",
    error: "Не удалось сохранить настройки.",
  },
  kk: {
    title: "TilType баптаулары",
    spelling: "Жиі кездесетін теру қателерін түзету",
    layout: "Қате пернетақта жаймасымен терілген мәтінді түзету (RU ↔ EN)",
    proofing: "Мәтін бөліктерінің емле тексеру тілін анықтау",
    punctuation: "Мәтінмәндік мәзірде тыныс белгілерін түзетуді ұсыну",
    spaceAfterEnter: "Ұсынысты Enter пернесімен енгізгеннен кейін бос орын қосу",
    language: "Түзетуге арналған тіл",
    auto: "Автоматты түрде",
    detail: "Түзету мәтіндік құжаттарда бос орыннан кейін орындалады. Жүйелік пернетақта жаймасы өзгермейді.",
    save: "Сақтау",
    cancel: "Болдырмау",
    error: "Баптауларды сақтау мүмкін болмады.",
  },
};

/**
 * Определяет язык подписей по локали интерфейса ONLYOFFICE.
 * @param {string | undefined} locale Код локали редактора.
 * @returns {DictionaryLanguage} Поддерживаемый язык интерфейса.
 */
function getSettingsLanguage(locale) {
  const language = locale?.split("-")[0].toLowerCase();
  return language === "ru" || language === "kk" ? language : "en";
}
