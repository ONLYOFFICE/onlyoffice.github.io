import { type PluginTheme } from "../components/shared/pluginTheme.ts";

type InfoBlockTypography = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: number;
};

export type InfoBlockTokens = {
  background: string;
  border: string;
  radius: number;
  titleColor: string;
  descriptionColor: string;
  closeColor: string;
  alertBackground: string;
  alertMark: string;
  titleTypography: InfoBlockTypography;
  descriptionTypography: InfoBlockTypography;
};

export const infoBlockTokens: Record<PluginTheme, InfoBlockTokens> = {
  Light: {
    background: "#FFFFFF",
    border: "#C0C0C0",
    radius: 1,
    titleColor: "rgba(0, 0, 0, 0.8)",
    descriptionColor: "rgba(0, 0, 0, 0.6)",
    closeColor: "rgba(0, 0, 0, 0.8)",
    alertBackground: "#F62211",
    alertMark: "#FFFFFF",
    titleTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22, fontWeight: 700 },
    descriptionTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22, fontWeight: 400 },
  },
  "Light Classic": {
    background: "#FFFFFF",
    border: "#CFCFCF",
    radius: 1,
    titleColor: "#444444",
    descriptionColor: "#A5A5A5",
    closeColor: "#444444",
    alertBackground: "#D9534F",
    alertMark: "#FFFFFF",
    titleTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22, fontWeight: 700 },
    descriptionTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22, fontWeight: 400 },
  },
  Dark: {
    background: "#333333",
    border: "#666666",
    radius: 1,
    titleColor: "rgba(255, 255, 255, 0.8)",
    descriptionColor: "rgba(255, 255, 255, 0.6)",
    closeColor: "rgba(255, 255, 255, 0.8)",
    alertBackground: "#F62211",
    alertMark: "rgba(255, 255, 255, 0.8)",
    titleTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22, fontWeight: 700 },
    descriptionTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22, fontWeight: 400 },
  },
  "Dark Contrast": {
    background: "#1E1E1E",
    border: "#696969",
    radius: 1,
    titleColor: "#E8E8E8",
    descriptionColor: "#B8B8B8",
    closeColor: "#E8E8E8",
    alertBackground: "#F62211",
    alertMark: "#E8E8E8",
    titleTypography: { fontSize: 11, lineHeight: 16, letterSpacing: 0.22, fontWeight: 700 },
    descriptionTypography: { fontSize: 11, lineHeight: 14, letterSpacing: 0.22, fontWeight: 400 },
  },
  "Modern Light": {
    background: "#FFFFFF",
    border: "#E1E1E1",
    radius: 4,
    titleColor: "#383838",
    descriptionColor: "rgba(0, 0, 0, 0.6)",
    closeColor: "#383838",
    alertBackground: "rgba(242, 61, 61, 0.8)",
    alertMark: "#FFFFFF",
    titleTypography: { fontSize: 12, lineHeight: 20, letterSpacing: 0.24, fontWeight: 500 },
    descriptionTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24, fontWeight: 400 },
  },
  "Modern Dark": {
    background: "#404040",
    border: "#686868",
    radius: 4,
    titleColor: "#F3F3F3",
    descriptionColor: "#969696",
    closeColor: "#EAEAEA",
    alertBackground: "rgba(242, 61, 61, 0.8)",
    alertMark: "#222222",
    titleTypography: { fontSize: 12, lineHeight: 20, letterSpacing: 0.24, fontWeight: 500 },
    descriptionTypography: { fontSize: 12, lineHeight: 16, letterSpacing: 0.24, fontWeight: 400 },
  },
};

