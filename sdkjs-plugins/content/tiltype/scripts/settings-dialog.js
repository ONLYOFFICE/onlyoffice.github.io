/**
 * Синхронизирует форму настроек с фоновым плагином через события окон SDK.
 * Обновляет документ только через отправку настроек, без доступа к его содержимому.
 */
"use strict";

(() => {
  const plugin = Reflect.get(window, "Asc").plugin;
  const form = /** @type {HTMLFormElement} */ (document.getElementById("preferences"));
  const spelling = /** @type {HTMLInputElement} */ (document.getElementById("spelling"));
  const layout = /** @type {HTMLInputElement} */ (document.getElementById("layout"));
  const proofing = /** @type {HTMLInputElement} */ (document.getElementById("proofing"));
  const punctuation = /** @type {HTMLInputElement} */ (document.getElementById("punctuation"));
  const spaceAfterEnter = /** @type {HTMLInputElement} */ (document.getElementById("space-after-enter"));
  const language = /** @type {HTMLSelectElement} */ (document.getElementById("language"));
  const errorMessage = /** @type {HTMLElement} */ (document.getElementById("error"));

  plugin.init = () => {
    plugin.attachEditorEvent("preferencesData", (/** @type {{ options: CorrectionSettings, language: DictionaryLanguage }} */ data) => {
      const labels = settingsLabels[data.language];
      document.documentElement.lang = data.language;
      for (const element of document.querySelectorAll("[data-text]")) {
        const key = /** @type {keyof typeof labels} */ (element.getAttribute("data-text"));
        element.textContent = labels[key];
      }
      spelling.checked = data.options.spelling;
      layout.checked = data.options.layout;
      proofing.checked = data.options.proofing;
      punctuation.checked = data.options.punctuation;
      spaceAfterEnter.checked = data.options.spaceAfterEnter;
      language.value = data.options.language;
      form.hidden = false;
    });
    plugin.attachEditorEvent("preferencesError", () => { errorMessage.hidden = false; });
    plugin.sendToPlugin("preferencesReady", {});
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    plugin.sendToPlugin("preferencesSave", {
      spelling: spelling.checked,
      layout: layout.checked,
      proofing: proofing.checked,
      punctuation: punctuation.checked,
      spaceAfterEnter: spaceAfterEnter.checked,
      language: language.value,
    });
  });
  document.getElementById("cancel")?.addEventListener("click", () => {
    plugin.sendToPlugin("preferencesCancel", {});
  });
})();
