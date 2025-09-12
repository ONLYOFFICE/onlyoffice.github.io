class Theme {
  static onThemeChanged(theme) {
    window.Asc.plugin.onThemeChangedBase(theme);

    const themeType = theme.type || "light";

    const body = document.body;
    body.classList.remove("dark");
    body.classList.remove("light");
    body.classList.add(themeType);
  }
}

export { Theme };
