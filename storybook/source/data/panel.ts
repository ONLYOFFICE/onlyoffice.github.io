export type PanelTheme =
  | "Light"
  | "Light Classic"
  | "Dark"
  | "Dark Contrast"
  | "Modern Light"
  | "Modern Dark";

export type PanelSizePreset = "Basic" | "Wide";

export type PanelThemeTokens = {
  surface: string;
  headerSurface: string;
  border: string;
  title: string;
  body: string;
  link: string;
};

export const panelBaseMetrics = {
  heights: {
    panel: 646,
    header: 44,
  },
  paddings: {
    headerX: 12,
    contentY: 12,
    contentX: 12,
  },
} as const;

export const panelSizeMetrics: Record<
  PanelTheme,
  Record<PanelSizePreset, { width: number; height: number }>
> = {
  Light: {
    Basic: { width: 260, height: 646 },
    Wide: { width: 555, height: 646 },
  },
  "Light Classic": {
    Basic: { width: 260, height: 646 },
    Wide: { width: 555, height: 646 },
  },
  Dark: {
    Basic: { width: 260, height: 646 },
    Wide: { width: 555, height: 646 },
  },
  "Dark Contrast": {
    Basic: { width: 260, height: 646 },
    Wide: { width: 555, height: 646 },
  },
  "Modern Light": {
    Basic: { width: 257, height: 808 },
    Wide: { width: 553, height: 808 },
  },
  "Modern Dark": {
    Basic: { width: 257, height: 808 },
    Wide: { width: 553, height: 808 },
  },
};

export const panelThemeTokens: Record<PanelTheme, PanelThemeTokens> = {
  Light: {
    surface: "#F7F7F7",
    headerSurface: "#F7F7F7",
    border: "#CBCBCB",
    title: "rgba(0, 0, 0, 0.80)",
    body: "rgba(0, 0, 0, 0.80)",
    link: "rgba(0, 0, 0, 0.80)",
  },
  "Light Classic": {
    surface: "#F1F1F1",
    headerSurface: "#F1F1F1",
    border: "#CBCBCB",
    title: "#444444",
    body: "#444444",
    link: "#444444",
  },
  Dark: {
    surface: "#404040",
    headerSurface: "#404040",
    border: "#616161",
    title: "rgba(255, 255, 255, 0.80)",
    body: "rgba(255, 255, 255, 0.80)",
    link: "rgba(255, 255, 255, 0.80)",
  },
  "Dark Contrast": {
    surface: "#2A2A2A",
    headerSurface: "#2A2A2A",
    border: "#616161",
    title: "#E8E8E8",
    body: "#E8E8E8",
    link: "#E8E8E8",
  },
  "Modern Light": {
    surface: "#FFFFFF",
    headerSurface: "#FFFFFF",
    border: "#EAEAEA",
    title: "#383838",
    body: "#383838",
    link: "#383838",
  },
  "Modern Dark": {
    surface: "#404040",
    headerSurface: "#404040",
    border: "#585858",
    title: "#F3F3F3",
    body: "#F3F3F3",
    link: "#F3F3F3",
  },
};
