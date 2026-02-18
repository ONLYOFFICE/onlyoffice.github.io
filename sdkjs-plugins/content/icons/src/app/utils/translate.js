// @ts-check

/**
 * @param {string} text
 * @returns {string}
 */
function translate(text) {
    const translatedText = window.Asc.plugin.tr(text);

    return translatedText;
}

export { translate };
