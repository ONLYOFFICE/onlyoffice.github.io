import type { PluginTheme } from "../components/shared/pluginTheme.ts";

export type ScrollVisualState = "default" | "hover" | "pressed";
export type ScrollSize = "XS" | "S" | "M";

export type ScrollLiftTokens = {
  bg: string;
  border: string;
  notch: string;
};

export type ScrollStateTokens = {
  lift: Record<ScrollSize, ScrollLiftTokens>;
  button: {
    bg: string;
    border: string;
    arrow: string;
  };
};

type ScrollThemeTokens = Record<ScrollVisualState, ScrollStateTokens>;

export const scrollByTheme: Record<PluginTheme, ScrollThemeTokens> = {
  Light: {
    default: {
      lift: {
        M: { bg: "#F7F7F7", border: "rgba(224, 224, 224, 0.93)", notch: "rgba(224, 224, 224, 0.93)" },
        S: { bg: "#F7F7F7", border: "#E0E0E0", notch: "rgba(224, 224, 224, 0.93)" },
        XS: { bg: "rgba(224, 224, 224, 0.93)", border: "rgba(224, 224, 224, 0.93)", notch: "rgba(224, 224, 224, 0.93)" },
      },
      button: { bg: "#F7F7F7", border: "rgba(224, 224, 224, 0.93)", arrow: "#ADADAD" },
    },
    hover: {
      lift: {
        M: { bg: "#C0C0C0", border: "#CBCBCB", notch: "#F7F7F7" },
        S: { bg: "#C0C0C0", border: "#CBCBCB", notch: "#F7F7F7" },
        XS: { bg: "#CBCBCB", border: "#CBCBCB", notch: "#CBCBCB" },
      },
      button: { bg: "#C0C0C0", border: "rgba(224, 224, 224, 0.93)", arrow: "#F7F7F7" },
    },
    pressed: {
      lift: {
        M: { bg: "#ADADAD", border: "#ADADAD", notch: "#F7F7F7" },
        S: { bg: "#ADADAD", border: "#ADADAD", notch: "#F7F7F7" },
        XS: { bg: "#ADADAD", border: "#ADADAD", notch: "#ADADAD" },
      },
      button: { bg: "#ADADAD", border: "#ADADAD", arrow: "#F7F7F7" },
    },
  },
  "Light Classic": {
    default: {
      lift: {
        M: { bg: "#F1F1F1", border: "#CFCFCF", notch: "#CBCBCB" },
        S: { bg: "#F1F1F1", border: "#CFCFCF", notch: "#CBCBCB" },
        XS: { bg: "#CFCFCF", border: "#CFCFCF", notch: "#CFCFCF" },
      },
      button: { bg: "#F1F1F1", border: "#CFCFCF", arrow: "#ADADAD" },
    },
    hover: {
      lift: {
        M: { bg: "#CFCFCF", border: "#CBCBCB", notch: "#F1F1F1" },
        S: { bg: "#CFCFCF", border: "#CBCBCB", notch: "#F1F1F1" },
        XS: { bg: "#CFCFCF", border: "#CFCFCF", notch: "#CFCFCF" },
      },
      button: { bg: "#CFCFCF", border: "#CFCFCF", arrow: "#F1F1F1" },
    },
    pressed: {
      lift: {
        M: { bg: "#ADADAD", border: "#ADADAD", notch: "#F1F1F1" },
        S: { bg: "#ADADAD", border: "#ADADAD", notch: "#F1F1F1" },
        XS: { bg: "#ADADAD", border: "#ADADAD", notch: "#ADADAD" },
      },
      button: { bg: "#ADADAD", border: "#ADADAD", arrow: "#F1F1F1" },
    },
  },
  Dark: {
    default: {
      lift: {
        M: { bg: "#404040", border: "#616161", notch: "#616161" },
        S: { bg: "#404040", border: "#616161", notch: "#616161" },
        XS: { bg: "#616161", border: "#616161", notch: "#616161" },
      },
      button: { bg: "#404040", border: "#616161", arrow: "#ADADAD" },
    },
    hover: {
      lift: {
        M: { bg: "#666666", border: "#616161", notch: "#404040" },
        S: { bg: "#666666", border: "#616161", notch: "#404040" },
        XS: { bg: "#999999", border: "#999999", notch: "#999999" },
      },
      button: { bg: "#666666", border: "#616161", arrow: "#404040" },
    },
    pressed: {
      lift: {
        M: { bg: "#ADADAD", border: "#999999", notch: "#404040" },
        S: { bg: "#ADADAD", border: "#999999", notch: "#404040" },
        XS: { bg: "#ADADAD", border: "#ADADAD", notch: "#ADADAD" },
      },
      button: { bg: "#ADADAD", border: "#999999", arrow: "#404040" },
    },
  },
  "Dark Contrast": {
    default: {
      lift: {
        M: { bg: "#2A2A2A", border: "#616161", notch: "#616161" },
        S: { bg: "#2A2A2A", border: "#616161", notch: "#616161" },
        XS: { bg: "#616161", border: "#616161", notch: "#616161" },
      },
      button: { bg: "#2A2A2A", border: "#616161", arrow: "#4D4D4D" },
    },
    hover: {
      lift: {
        M: { bg: "#696969", border: "#616161", notch: "#2A2A2A" },
        S: { bg: "#696969", border: "#616161", notch: "#2A2A2A" },
        XS: { bg: "#424242", border: "#424242", notch: "#424242" },
      },
      button: { bg: "#696969", border: "#616161", arrow: "#2A2A2A" },
    },
    pressed: {
      lift: {
        M: { bg: "#4D4D4D", border: "#7D7D7D", notch: "#2A2A2A" },
        S: { bg: "#4D4D4D", border: "#7D7D7D", notch: "#2A2A2A" },
        XS: { bg: "#4D4D4D", border: "#4D4D4D", notch: "#4D4D4D" },
      },
      button: { bg: "#4D4D4D", border: "#7D7D7D", arrow: "#2A2A2A" },
    },
  },
  "Modern Light": {
    default: {
      lift: {
        M: { bg: "#F7F7F7", border: "#E1E1E1", notch: "#E1E1E1" },
        S: { bg: "#F7F7F7", border: "#E1E1E1", notch: "#E1E1E1" },
        XS: { bg: "#F7F7F7", border: "#F7F7F7", notch: "#F7F7F7" },
      },
      button: { bg: "#F7F7F7", border: "#E1E1E1", arrow: "#969696" },
    },
    hover: {
      lift: {
        M: { bg: "#C0C0C0", border: "#E1E1E1", notch: "#F7F7F7" },
        S: { bg: "#C0C0C0", border: "#E1E1E1", notch: "#F7F7F7" },
        XS: { bg: "#C0C0C0", border: "#C0C0C0", notch: "#C0C0C0" },
      },
      button: { bg: "#C0C0C0", border: "#E1E1E1", arrow: "#F7F7F7" },
    },
    pressed: {
      lift: {
        M: { bg: "#ADADAD", border: "#ADADAD", notch: "#F7F7F7" },
        S: { bg: "#ADADAD", border: "#ADADAD", notch: "#F7F7F7" },
        XS: { bg: "#ADADAD", border: "#ADADAD", notch: "#ADADAD" },
      },
      button: { bg: "#ADADAD", border: "#ADADAD", arrow: "#ADADAD" },
    },
  },
  "Modern Dark": {
    default: {
      lift: {
        M: { bg: "#404040", border: "#686868", notch: "#686868" },
        S: { bg: "#404040", border: "#686868", notch: "#686868" },
        XS: { bg: "#686868", border: "#686868", notch: "#686868" },
      },
      button: { bg: "#404040", border: "#686868", arrow: "#969696" },
    },
    hover: {
      lift: {
        M: { bg: "#686868", border: "#686868", notch: "#404040" },
        S: { bg: "#686868", border: "#686868", notch: "#404040" },
        XS: { bg: "#686868", border: "#686868", notch: "#686868" },
      },
      button: { bg: "#686868", border: "#686868", arrow: "#404040" },
    },
    pressed: {
      lift: {
        M: { bg: "#686868", border: "#686868", notch: "#404040" },
        S: { bg: "#686868", border: "#686868", notch: "#404040" },
        XS: { bg: "#686868", border: "#686868", notch: "#686868" },
      },
      button: { bg: "#686868", border: "#686868", arrow: "#404040" },
    },
  },
};

export const scrollSizePixels: Record<
  ScrollSize,
  {
    railOuter: number;
    railInner: number;
    notch: number;
    radius: number;
    frameCross: number;
    button: number;
    gap: number;
    hasNotching: boolean;
  }
> = {
  M: { railOuter: 13, railInner: 13, notch: 5, radius: 1, frameCross: 13, button: 13, gap: 1, hasNotching: true },
  S: { railOuter: 8, railInner: 8, notch: 3, radius: 1, frameCross: 8, button: 13, gap: 1, hasNotching: true },
  XS: { railOuter: 9, railInner: 5, notch: 0, radius: 20, frameCross: 8, button: 13, gap: 1, hasNotching: false },
};
