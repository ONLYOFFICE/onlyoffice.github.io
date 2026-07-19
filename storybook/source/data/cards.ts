export const cardThemeOptions = [
  "Light",
  "Light Classic",
  "Modern Light",
  "Modern Dark",
  "Dark",
  "Dark Contrast",
] as const;

export type CardTheme = (typeof cardThemeOptions)[number];
export type CardType = "close" | "openWithButton" | "openWithText";
export type CardState = "default" | "hover";

type CardThemeTokens = {
  background: string;
  border: string;
  radius: number;
  closeHoverBackground: string;
  textColor: string;
  subTextColor: string;
  iconColor: string;
  chipBackground: string;
  chipBorder: string;
  chipTextColor: string;
  actionHeight: number;
  actionPrimaryBackground: string;
  actionPrimaryHoverBackground: string;
  actionPrimaryTextColor: string;
  actionSecondaryBackground: string;
  actionSecondaryHoverBackground: string;
  actionSecondaryBorder: string;
  actionSecondaryTextColor: string;
};

export const cardsByTheme: Record<CardTheme, CardThemeTokens> = {
  Light: {
    background: "#FFFFFF",
    border: "#C0C0C0",
    radius: 2,
    closeHoverBackground: "#E0E0E0",
    textColor: "rgba(0, 0, 0, 0.80)",
    subTextColor: "rgba(0, 0, 0, 0.40)",
    iconColor: "rgba(0, 0, 0, 0.80)",
    chipBackground: "#FFFFFF",
    chipBorder: "#C0C0C0",
    chipTextColor: "rgba(0, 0, 0, 0.80)",
    actionHeight: 22,
    actionPrimaryBackground: "#444444",
    actionPrimaryHoverBackground: "#1C1C1C",
    actionPrimaryTextColor: "#FFFFFF",
    actionSecondaryBackground: "#FFFFFF",
    actionSecondaryHoverBackground: "#E0E0E0",
    actionSecondaryBorder: "#C0C0C0",
    actionSecondaryTextColor: "rgba(0, 0, 0, 0.80)",
  },
  "Light Classic": {
    background: "#FFFFFF",
    border: "#CFCFCF",
    radius: 2,
    closeHoverBackground: "#D8DADC",
    textColor: "#444444",
    subTextColor: "#A5A5A5",
    iconColor: "#444444",
    chipBackground: "#FFFFFF",
    chipBorder: "#CFCFCF",
    chipTextColor: "#444444",
    actionHeight: 22,
    actionPrimaryBackground: "#7D858C",
    actionPrimaryHoverBackground: "#666D73",
    actionPrimaryTextColor: "#FFFFFF",
    actionSecondaryBackground: "#FFFFFF",
    actionSecondaryHoverBackground: "#FFFFFF",
    actionSecondaryBorder: "#CFCFCF",
    actionSecondaryTextColor: "#444444",
  },
  "Modern Light": {
    background: "#FFFFFF",
    border: "#E1E1E1",
    radius: 4,
    closeHoverBackground: "#F9F9F9",
    textColor: "#383838",
    subTextColor: "rgba(0, 0, 0, 0.60)",
    iconColor: "#383838",
    chipBackground: "#FFFFFF",
    chipBorder: "#E1E1E1",
    chipTextColor: "#383838",
    actionHeight: 24,
    actionPrimaryBackground: "#4473CA",
    actionPrimaryHoverBackground: "#2A5BB9",
    actionPrimaryTextColor: "#FFFFFF",
    actionSecondaryBackground: "#FFFFFF",
    actionSecondaryHoverBackground: "#F9F9F9",
    actionSecondaryBorder: "#E1E1E1",
    actionSecondaryTextColor: "#383838",
  },
  "Modern Dark": {
    background: "#404040",
    border: "#686868",
    radius: 4,
    closeHoverBackground: "#585858",
    textColor: "#F3F3F3",
    subTextColor: "#969696",
    iconColor: "#F3F3F3",
    chipBackground: "#404040",
    chipBorder: "#686868",
    chipTextColor: "#F3F3F3",
    actionHeight: 24,
    actionPrimaryBackground: "#4A7BE0",
    actionPrimaryHoverBackground: "#366CDA",
    actionPrimaryTextColor: "#FFFFFF",
    actionSecondaryBackground: "#404040",
    actionSecondaryHoverBackground: "#585858",
    actionSecondaryBorder: "#686868",
    actionSecondaryTextColor: "#F3F3F3",
  },
  Dark: {
    background: "#333333",
    border: "#666666",
    radius: 2,
    closeHoverBackground: "#555555",
    textColor: "rgba(255, 255, 255, 0.80)",
    subTextColor: "rgba(255, 255, 255, 0.40)",
    iconColor: "rgba(255, 255, 255, 0.80)",
    chipBackground: "#333333",
    chipBorder: "#666666",
    chipTextColor: "rgba(255, 255, 255, 0.80)",
    actionHeight: 22,
    actionPrimaryBackground: "#DDDDDD",
    actionPrimaryHoverBackground: "#FCFCFC",
    actionPrimaryTextColor: "#333333",
    actionSecondaryBackground: "#333333",
    actionSecondaryHoverBackground: "#555555",
    actionSecondaryBorder: "#666666",
    actionSecondaryTextColor: "rgba(255, 255, 255, 0.80)",
  },
  "Dark Contrast": {
    background: "#1E1E1E",
    border: "#696969",
    radius: 2,
    closeHoverBackground: "#424242",
    textColor: "#E8E8E8",
    subTextColor: "#B8B8B8",
    iconColor: "#E8E8E8",
    chipBackground: "#1E1E1E",
    chipBorder: "#696969",
    chipTextColor: "#E8E8E8",
    actionHeight: 22,
    actionPrimaryBackground: "#E6E6E6",
    actionPrimaryHoverBackground: "#A6A6A6",
    actionPrimaryTextColor: "#121212",
    actionSecondaryBackground: "#1E1E1E",
    actionSecondaryHoverBackground: "#424242",
    actionSecondaryBorder: "#696969",
    actionSecondaryTextColor: "#E8E8E8",
  },
};

const THEME_ALIASES: Record<string, CardTheme> = {
  light: "Light",
  lightclassic: "Light Classic",
  modernlight: "Modern Light",
  moderndark: "Modern Dark",
  dark: "Dark",
  darkcontrast: "Dark Contrast",
};

export const resolveCardTheme = (theme?: string): CardTheme => {
  if (!theme) return "Light";
  const compact = theme.replace(/[\s_-]+/g, "").toLowerCase();
  return THEME_ALIASES[compact] ?? "Light";
};
