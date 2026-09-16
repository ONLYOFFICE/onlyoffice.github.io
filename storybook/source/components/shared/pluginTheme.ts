import { themeTokens } from "../../data/theme-tokens.ts";

export type PluginTheme = keyof typeof themeTokens;

const THEME_ALIASES: Record<string, PluginTheme> = {
  light: "Light",
  lightclassic: "Light Classic",
  modernlight: "Modern Light",
  moderndark: "Modern Dark",
  dark: "Dark",
  darkcontrast: "Dark Contrast",
};

export const resolveComponentTheme = (theme?: string): PluginTheme => {
  if (!theme) return "Light";
  const compact = theme.replace(/[\s_-]+/g, "").toLowerCase();
  return THEME_ALIASES[compact] ?? "Light";
};

export const pressedBgByTheme: Record<string, string> = {
  Light: "#CBCBCB",
  "Light Classic": "#7D858C",
  Dark: "#666666",
  "Dark Contrast": "#666666",
  "Modern Light": "#DCE7FA",
  "Modern Dark": "#375478",
};

export const getComponentSurface = (theme?: string) => {
  const resolved = resolveComponentTheme(theme);
  const tokens = themeTokens[resolved];

  return {
    theme: resolved,
    bg: tokens.pageBg,
    surface: tokens.pageSurface,
    surfaceAlt: tokens.pageSurfaceAlt,
    border: tokens.pageBorder,
    fg: tokens.pageFg,
    muted: tokens.pageMuted ?? tokens.pageFg,
    accent: resolved === "Dark" || resolved === "Dark Contrast" || resolved === "Modern Dark" ? "#4D9DFF" : "#0B6DFF",
  };
};
