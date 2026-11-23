/**
 * Загрузка словарей из установочного пакета.
 * Один Promise на язык позволяет начать поиск сразу после загрузки доступного словаря.
 */
"use strict";

/** @type {DictionaryLanguage[]} */
const dictionaryLanguages = ["ru", "kk", "en"];

/**
 * Читает словарь из локальных ресурсов плагина.
 * @param {DictionaryLanguage} language Язык словаря.
 * @returns {Promise<DictionaryEntry[]>} Индекс для поиска. Отклоняется при ошибке чтения.
 */
function loadDictionary(language) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", `dictionaries/${language}.txt`);
    request.overrideMimeType("text/plain; charset=utf-8");
    request.onload = () => {
      if ((request.status === 0 || request.status === 200) && request.responseText) {
        resolve(completion.indexDictionary(request.responseText));
        return;
      }
      reject(new Error(`Dictionary ${language}: HTTP status ${request.status}`));
    };
    request.onerror = () => reject(new Error(`Dictionary ${language}: read failed`));
    request.send();
  });
}
