(function (window) {
  const HISTORY_KEY = "typst.history";
  const MAX_HISTORY_SIZE = 30;

  /**
   * Loads the history from localStorage.
   * @returns {string[]} An array of saved Typst code snippets.
   */
  function loadHistory() {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  }

  /**
   * Saves a new code snippet to the history.
   * @param {string} code The Typst code to save.
   */
  function saveToHistory(code) {
    if (!code || !code.trim()) {
      return;
    }
    let history = loadHistory();
    // Remove existing entry to move it to the top
    const existingIndex = history.indexOf(code);
    if (existingIndex > -1) {
      history.splice(existingIndex, 1);
    }
    // Add to the top
    history.unshift(code);
    // Trim history to max size
    if (history.length > MAX_HISTORY_SIZE) {
      history = history.slice(0, MAX_HISTORY_SIZE);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  window.TypstHistory = {
    load: loadHistory,
    save: saveToHistory,
  };
})(window);
