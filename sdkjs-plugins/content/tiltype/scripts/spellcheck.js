/**
 * Загружает встроенные словари ONLYOFFICE в локальный движок Hunspell.
 * Частотный поиск и ввод работают независимо от загрузки словарей.
 */
"use strict";

/** @typedef {{ spell: (word: string) => boolean, suggest: (word: string) => string[], dispose: () => void }} Spellchecker */
/** @typedef {Partial<Record<DictionaryLanguage, Spellchecker>>} Spellcheckers */
/** @typedef {{ mountBuffer: (data: Uint8Array, name: string) => string, unmount: (path: string) => void,
 * create: (affix: string, dictionary: string) => Spellchecker }} SpellcheckerFactory */

const spellcheck = (() => {
  const locales = { en: "en_US", ru: "ru_RU", kk: "kk_KZ" };
  /** @type {Spellcheckers} */
  const dictionaries = {};
  let started = false;

  /** Загружает словари один раз для текущего экземпляра плагина. */
  async function start() {
    if (started) return;
    started = true;
    /** @type {SpellcheckerFactory} */
    const factory = await Reflect.get(window, "AutocompleteHunspell").loadModule();
    await Promise.all(dictionaryLanguages.map(async (language) => {
      const locale = locales[language];
      const base = `dictionaries/hunspell/${locale}/${locale}`;
      const [affix, dictionary] = await Promise.all([readBinary(base + ".aff"), readBinary(base + ".dic")]);
      const affixPath = factory.mountBuffer(affix, locale + ".aff");
      const dictionaryPath = factory.mountBuffer(dictionary, locale + ".dic");
      try {
        dictionaries[language] = factory.create(affixPath, dictionaryPath);
      } finally {
        factory.unmount(affixPath);
        factory.unmount(dictionaryPath);
      }
    }));
  }

  /** @param {string} path @returns {Promise<Uint8Array>} */
  function readBinary(path) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", path);
      request.responseType = "arraybuffer";
      request.onload = () => {
        if ((request.status === 0 || request.status === 200) && request.response?.byteLength) {
          resolve(new Uint8Array(request.response));
          return;
        }
        reject(new Error(`Cannot read ${path}: HTTP ${request.status}`));
      };
      request.onerror = () => reject(new Error(`Cannot read ${path}`));
      request.send();
    });
  }

  return { dictionaries, start };
})();
