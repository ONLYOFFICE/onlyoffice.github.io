import { type PluginTheme } from "../components/shared/pluginTheme.ts";

type TextFieldTypography = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export type TextFieldTokens = {
  radius: number;
  background: string;
  border: string;
  hoverBorder: string;
  focusBorder: string;
  errorBorder: string;
  disabledBackground: string;
  disabledOpacity: number;
  titleColor: string;
  titleWeight: number;
  captionColor: string;
  errorTextColor: string;
  placeholderColor: string;
  valueColor: string;
  disabledTextColor: string;
  cursorColor: string;
  iconColor: string;
  hiddenDotColor: string;
  typography: TextFieldTypography;
  captionTypography: TextFieldTypography;
};

export const textFieldTokens: Record<PluginTheme, TextFieldTokens> = {
  Light: {
    radius: 1,
    background: "#FFFFFF",
    border: "#C0C0C0",
    hoverBorder: "#848484",
    focusBorder: "#848484",
    errorBorder: "#F62211",
    disabledBackground: "#EFEFEF",
    disabledOpacity: 0.5,
    titleColor: "rgba(0, 0, 0, 0.80)",
    titleWeight: 700,
    captionColor: "rgba(0, 0, 0, 0.40)",
    errorTextColor: "#F62211",
    placeholderColor: "rgba(0, 0, 0, 0.40)",
    valueColor: "rgba(0, 0, 0, 0.80)",
    disabledTextColor: "rgba(0, 0, 0, 0.80)",
    cursorColor: "rgba(0, 0, 0, 0.80)",
    iconColor: "rgba(0, 0, 0, 0.80)",
    hiddenDotColor: "rgba(0, 0, 0, 0.80)",
    typography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
  "Light Classic": {
    radius: 1,
    background: "#FFFFFF",
    border: "#CFCFCF",
    hoverBorder: "#848484",
    focusBorder: "#848484",
    errorBorder: "#D9534F",
    disabledBackground: "#F1F1F1",
    disabledOpacity: 0.5,
    titleColor: "#444444",
    titleWeight: 700,
    captionColor: "#A5A5A5",
    errorTextColor: "#D9534F",
    placeholderColor: "#A5A5A5",
    valueColor: "#444444",
    disabledTextColor: "#444444",
    cursorColor: "#444444",
    iconColor: "#444444",
    hiddenDotColor: "#444444",
    typography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
  Dark: {
    radius: 1,
    background: "#333333",
    border: "#666666",
    hoverBorder: "#CCCCCC",
    focusBorder: "#CCCCCC",
    errorBorder: "#F62211",
    disabledBackground: "#505050",
    disabledOpacity: 0.5,
    titleColor: "rgba(255, 255, 255, 0.80)",
    titleWeight: 700,
    captionColor: "rgba(255, 255, 255, 0.40)",
    errorTextColor: "#F62211",
    placeholderColor: "rgba(255, 255, 255, 0.40)",
    valueColor: "rgba(255, 255, 255, 0.80)",
    disabledTextColor: "rgba(255, 255, 255, 0.80)",
    cursorColor: "rgba(255, 255, 255, 0.80)",
    iconColor: "rgba(255, 255, 255, 0.80)",
    hiddenDotColor: "rgba(255, 255, 255, 0.80)",
    typography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
  "Dark Contrast": {
    radius: 1,
    background: "#1E1E1E",
    border: "#696969",
    hoverBorder: "#B8B8B8",
    focusBorder: "#B8B8B8",
    errorBorder: "#F62211",
    disabledBackground: "#2A2A2A",
    disabledOpacity: 0.5,
    titleColor: "#E8E8E8",
    titleWeight: 700,
    captionColor: "rgba(232, 232, 232, 0.50)",
    errorTextColor: "#F62211",
    placeholderColor: "rgba(232, 232, 232, 0.55)",
    valueColor: "#E8E8E8",
    disabledTextColor: "#E8E8E8",
    cursorColor: "#E8E8E8",
    iconColor: "#E8E8E8",
    hiddenDotColor: "#E8E8E8",
    typography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
  "Modern Light": {
    radius: 4,
    background: "#FFFFFF",
    border: "#E1E1E1",
    hoverBorder: "#4473CA",
    focusBorder: "#4473CA",
    errorBorder: "rgba(242, 61, 61, 0.80)",
    disabledBackground: "#F3F3F3",
    disabledOpacity: 1,
    titleColor: "#383838",
    titleWeight: 400,
    captionColor: "rgba(0, 0, 0, 0.20)",
    errorTextColor: "rgba(242, 61, 61, 0.80)",
    placeholderColor: "rgba(0, 0, 0, 0.20)",
    valueColor: "#383838",
    disabledTextColor: "rgba(0, 0, 0, 0.20)",
    cursorColor: "#383838",
    iconColor: "#383838",
    hiddenDotColor: "#383838",
    typography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
  "Modern Dark": {
    radius: 4,
    background: "#404040",
    border: "#686868",
    hoverBorder: "#4A7BE0",
    focusBorder: "#4A7BE0",
    errorBorder: "rgba(242, 61, 61, 0.80)",
    disabledBackground: "#222222",
    disabledOpacity: 1,
    titleColor: "#F3F3F3",
    titleWeight: 400,
    captionColor: "rgba(243, 243, 243, 0.40)",
    errorTextColor: "rgba(242, 61, 61, 0.80)",
    placeholderColor: "rgba(243, 243, 243, 0.40)",
    valueColor: "#F3F3F3",
    disabledTextColor: "rgba(243, 243, 243, 0.40)",
    cursorColor: "#F3F3F3",
    iconColor: "#EAEAEA",
    hiddenDotColor: "#F3F3F3",
    typography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
  },
};

