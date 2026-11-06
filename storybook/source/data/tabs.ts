import type { PluginTheme } from "../components/shared/pluginTheme.ts";

type TabsTypography = {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

export type TabsThemeTokens = {
  border: string;
  text: string;
  unselectedBg: string;
  selectedBg: string;
  hoverBg: string;
  typography: TabsTypography;
  indicatorColor?: string;
  indicatorHeight?: number;
};

export const tabsByTheme: Record<PluginTheme, TabsThemeTokens> = {
  Light: {
    border: "#C0C0C0",
    text: "rgba(0, 0, 0, 0.8)",
    unselectedBg: "#EFEFEF",
    selectedBg: "#F7F7F7",
    hoverBg: "#F9F9F9",
    typography: { fontSize: 11, fontWeight: 400, lineHeight: 16, letterSpacing: 0.22 },
  },
  "Light Classic": {
    border: "#CFCFCF",
    text: "#444444",
    unselectedBg: "#F1F1F1",
    selectedBg: "#F1F1F1",
    hoverBg: "#D8DADC",
    typography: { fontSize: 11, fontWeight: 400, lineHeight: 16, letterSpacing: 0.22 },
  },
  Dark: {
    border: "#666666",
    text: "rgba(255, 255, 255, 0.8)",
    unselectedBg: "#505050",
    selectedBg: "#404040",
    hoverBg: "#555555",
    typography: { fontSize: 11, fontWeight: 400, lineHeight: 16, letterSpacing: 0.22 },
  },
  "Dark Contrast": {
    border: "#696969",
    text: "#E8E8E8",
    unselectedBg: "#2A2A2A",
    selectedBg: "#2A2A2A",
    hoverBg: "#424242",
    typography: { fontSize: 11, fontWeight: 400, lineHeight: 16, letterSpacing: 0.22 },
  },
  "Modern Light": {
    border: "#EAEAEA",
    text: "#383838",
    unselectedBg: "#F3F3F3",
    selectedBg: "#FFFFFF",
    hoverBg: "#F9F9F9",
    typography: { fontSize: 12, fontWeight: 500, lineHeight: 20, letterSpacing: 0.24 },
    indicatorColor: "#4473CA",
    indicatorHeight: 3,
  },
  "Modern Dark": {
    border: "#585858",
    text: "#F3F3F3",
    unselectedBg: "#222222",
    selectedBg: "#404040",
    hoverBg: "#585858",
    typography: { fontSize: 12, fontWeight: 500, lineHeight: 20, letterSpacing: 0.24 },
    indicatorColor: "#4A7BE0",
    indicatorHeight: 3,
  },
};

