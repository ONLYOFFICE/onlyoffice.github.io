import { type PluginTheme } from "../components/shared/pluginTheme.ts";

type TextAreaTypography = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export type TextAreaTokens = {
  background: string;
  border: string;
  hoverBorder: string;
  disabledBackground: string;
  disabledOpacity: number;
  textColor: string;
  disabledTextColor: string;
  textTypography: TextAreaTypography;
  labelColor: string;
  labelWeight: number;
  labelTypography: TextAreaTypography;
  captionColor: string;
  captionTypography: TextAreaTypography;
  copyIconColor: string;
  copyIconStyle: "classic" | "modern";
  scrollTrack: string;
  scrollThumb: string;
  radius: number;
};

export const textAreaTokens: Record<PluginTheme, TextAreaTokens> = {
  Light: {
    background: "#FFFFFF",
    border: "#C0C0C0",
    hoverBorder: "#848484",
    disabledBackground: "#EFEFEF",
    disabledOpacity: 0.5,
    textColor: "rgba(0, 0, 0, 0.8)",
    disabledTextColor: "rgba(0, 0, 0, 0.8)",
    textTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
    labelColor: "rgba(0, 0, 0, 0.8)",
    labelWeight: 700,
    labelTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionColor: "rgba(0, 0, 0, 0.4)",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "rgba(0, 0, 0, 0.8)",
    copyIconStyle: "classic",
    scrollTrack: "transparent",
    scrollThumb: "#E0E0E0",
    radius: 2,
  },
  "Light Classic": {
    background: "#FFFFFF",
    border: "#CFCFCF",
    hoverBorder: "#848484",
    disabledBackground: "#F1F1F1",
    disabledOpacity: 0.5,
    textColor: "#444444",
    disabledTextColor: "#444444",
    textTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
    labelColor: "#444444",
    labelWeight: 700,
    labelTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionColor: "#A5A5A5",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "#444444",
    copyIconStyle: "classic",
    scrollTrack: "transparent",
    scrollThumb: "#CFCFCF",
    radius: 2,
  },
  Dark: {
    background: "#333333",
    border: "#666666",
    hoverBorder: "#CCCCCC",
    disabledBackground: "#505050",
    disabledOpacity: 0.5,
    textColor: "rgba(255, 255, 255, 0.8)",
    disabledTextColor: "rgba(255, 255, 255, 0.8)",
    textTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
    labelColor: "rgba(255, 255, 255, 0.8)",
    labelWeight: 700,
    labelTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionColor: "rgba(255, 255, 255, 0.4)",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "rgba(255, 255, 255, 0.8)",
    copyIconStyle: "classic",
    scrollTrack: "transparent",
    scrollThumb: "#616161",
    radius: 2,
  },
  "Dark Contrast": {
    background: "#1E1E1E",
    border: "#696969",
    hoverBorder: "#B8B8B8",
    disabledBackground: "#2A2A2A",
    disabledOpacity: 0.5,
    textColor: "#E8E8E8",
    disabledTextColor: "#E8E8E8",
    textTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
    labelColor: "#E8E8E8",
    labelWeight: 700,
    labelTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22 },
    captionColor: "#B8B8B8",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "#E8E8E8",
    copyIconStyle: "classic",
    scrollTrack: "transparent",
    scrollThumb: "#616161",
    radius: 2,
  },
  "Modern Light": {
    background: "#FFFFFF",
    border: "#E1E1E1",
    hoverBorder: "#4473CA",
    disabledBackground: "#F3F3F3",
    disabledOpacity: 1,
    textColor: "#383838",
    disabledTextColor: "rgba(0, 0, 0, 0.2)",
    textTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    labelColor: "#383838",
    labelWeight: 400,
    labelTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    captionColor: "rgba(0, 0, 0, 0.2)",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "#383838",
    copyIconStyle: "modern",
    scrollTrack: "transparent",
    scrollThumb: "#E1E1E1",
    radius: 2,
  },
  "Modern Dark": {
    background: "#404040",
    border: "#686868",
    hoverBorder: "#4A7BE0",
    disabledBackground: "#2A2A2A",
    disabledOpacity: 1,
    textColor: "#F3F3F3",
    disabledTextColor: "rgba(243, 243, 243, 0.4)",
    textTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    labelColor: "#F3F3F3",
    labelWeight: 400,
    labelTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
    captionColor: "rgba(243, 243, 243, 0.4)",
    captionTypography: { fontSize: 10, lineHeight: 12, letterSpacing: 0.2 },
    copyIconColor: "#EAEAEA",
    copyIconStyle: "modern",
    scrollTrack: "transparent",
    scrollThumb: "#686868",
    radius: 2,
  },
};
