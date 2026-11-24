/**
 * Открывает окно настроек из вкладки «Плагины» в текстовом редакторе.
 * Фоновый плагин читает и сохраняет настройки, окно передаёт только данные формы.
 */
"use strict";

/** @typedef {{ id: string, show: (options: object) => void, close: () => void,
 * activate: () => void, command: (event: string, value: unknown) => void,
 * attachEvent: (event: string, handler: (data: unknown) => void) => void }} SettingsWindow */

/**
 * Регистрирует кнопку и возвращает обработчик закрытия окна.
 * @param {EditorPlugin} plugin Экземпляр фонового плагина.
 * @param {new () => SettingsWindow} WindowClass Класс окна SDK.
 * @param {(options: CorrectionSettings) => void} onSave Подготавливает проверку после включения.
 */
function addSettingsButton(plugin, WindowClass, onSave) {
  const id = "autocomplete-preferences";
  const language = getSettingsLanguage(plugin.info.lang);
  const labels = settingsLabels[language];
  /** @type {SettingsWindow | undefined} */
  let dialog;

  function closeDialog() {
    dialog?.close();
    dialog = undefined;
  }

  plugin.attachEditorEvent("onToolbarMenuClick", (clicked) => {
    if (clicked !== id) return;
    if (dialog) {
      dialog.activate();
      return;
    }
    const opened = new WindowClass();
    dialog = opened;
    opened.attachEvent("preferencesReady", () => {
      opened.command("preferencesData", { options: correctionSettings.read(), language });
    });
    opened.attachEvent("preferencesSave", (data) => {
      const options = correctionSettings.parse(data);
      if (!options) return;
      try {
        correctionSettings.save(options);
        onSave(options);
        closeDialog();
      } catch (error) {
        console.error("Autocomplete: unable to save preferences", error);
        opened.command("preferencesError", null);
      }
    });
    opened.attachEvent("preferencesCancel", closeDialog);
    opened.show({
      url: new URL("settings.html", window.location.href).href,
      description: labels.title,
      type: "window",
      isVisual: true,
      isModal: true,
      EditorsSupport: ["word"],
      size: [485, 350],
      buttons: [],
    });
  });

  plugin.executeMethod("AddToolbarMenuItem", [{
    guid: plugin.guid,
    tabs: [{
      id: "plugins",
      items: [{
        id,
        type: "big-button",
        text: labels.title,
        icons: "resources/%theme-type%(light|dark)/icon%scale%(default|*).png",
        lockInViewMode: true,
      }],
    }],
  }]);

  return closeDialog;
}
