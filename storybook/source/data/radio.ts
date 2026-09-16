export const radioThemeOptions = [
  "Light",
  "Light Classic",
  "Modern Light",
  "Modern Dark",
  "Dark",
  "Dark Contrast",
] as const;

export const radioStates = ["default", "hover", "disabled"] as const;
export const radioSelections = ["no", "yes"] as const;

export type RadioTheme = (typeof radioThemeOptions)[number];
export type RadioState = (typeof radioStates)[number];
export type RadioSelection = (typeof radioSelections)[number];

type RadioToken = {
  outerFill: string;
  outerStroke: string;
  dotFill?: string;
  dotOpacity?: number;
  textColor: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export const radioTokens: Record<RadioTheme, Record<RadioState, Record<RadioSelection, RadioToken>>> = {
  "Light": {
    default: {
      no: {
        outerFill: "white",
        outerStroke: "#C0C0C0",
        textColor: "rgba(0, 0, 0, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "white",
        outerStroke: "#C0C0C0",
        dotFill: "black",
        dotOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    hover: {
      no: {
        outerFill: "white",
        outerStroke: "#848484",
        textColor: "rgba(0, 0, 0, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "white",
        outerStroke: "#848484",
        dotFill: "black",
        dotOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    disabled: {
      no: {
        outerFill: "#F7F7F7",
        outerStroke: "#E0E0E0",
        textColor: "rgba(0, 0, 0, 0.40)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#F7F7F7",
        outerStroke: "#E0E0E0",
        dotFill: "black",
        dotOpacity: 0.5,
        textColor: "rgba(0, 0, 0, 0.40)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
  },
  "Light Classic": {
    default: {
      no: {
        outerFill: "white",
        outerStroke: "#CFCFCF",
        textColor: "#444444",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "white",
        outerStroke: "#CFCFCF",
        dotFill: "#444444",
        textColor: "#444444",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    hover: {
      no: {
        outerFill: "white",
        outerStroke: "#848484",
        textColor: "#444444",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "white",
        outerStroke: "#848484",
        dotFill: "#444444",
        textColor: "#444444",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    disabled: {
      no: {
        outerFill: "#F1F1F1",
        outerStroke: "#D8DADC",
        textColor: "#A5A5A5",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#F1F1F1",
        outerStroke: "#D8DADC",
        dotFill: "#A5A5A5",
        textColor: "#A5A5A5",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
  },
  "Modern Light": {
    default: {
      no: {
        outerFill: "#FFFFFF",
        outerStroke: "#7F7F7F",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#FFFFFF",
        outerStroke: "#7F7F7F",
        dotFill: "#383838",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
    hover: {
      no: {
        outerFill: "#F3F3F3",
        outerStroke: "#969696",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#F3F3F3",
        outerStroke: "#969696",
        dotFill: "#383838",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
    disabled: {
      no: {
        outerFill: "white",
        outerStroke: "#969696",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#F3F3F3",
        outerStroke: "#969696",
        dotFill: "white",
        textColor: "#383838",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
  },
  "Modern Dark": {
    default: {
      no: {
        outerFill: "#404040",
        outerStroke: "#969696",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#404040",
        outerStroke: "#969696",
        dotFill: "#EAEAEA",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
    hover: {
      no: {
        outerFill: "#585858",
        outerStroke: "#969696",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#585858",
        outerStroke: "#969696",
        dotFill: "#EAEAEA",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
    disabled: {
      no: {
        outerFill: "#404040",
        outerStroke: "#969696",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
      yes: {
        outerFill: "#4A7BE0",
        outerStroke: "#4A7BE0",
        dotFill: "#404040",
        textColor: "#F3F3F3",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.24,
      },
    },
  },
  "Dark": {
    default: {
      no: {
        outerFill: "#333333",
        outerStroke: "#666666",
        textColor: "rgba(255, 255, 255, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#333333",
        outerStroke: "#666666",
        dotFill: "white",
        dotOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    hover: {
      no: {
        outerFill: "#333333",
        outerStroke: "#CCCCCC",
        textColor: "rgba(255, 255, 255, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#333333",
        outerStroke: "#CCCCCC",
        dotFill: "white",
        dotOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    disabled: {
      no: {
        outerFill: "#404040",
        outerStroke: "#555555",
        textColor: "rgba(255, 255, 255, 0.40)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#404040",
        outerStroke: "#555555",
        dotFill: "white",
        dotOpacity: 0.5,
        textColor: "rgba(255, 255, 255, 0.40)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
  },
  "Dark Contrast": {
    default: {
      no: {
        outerFill: "#1E1E1E",
        outerStroke: "#696969",
        textColor: "#E8E8E8",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#1E1E1E",
        outerStroke: "#696969",
        dotFill: "#E8E8E8",
        textColor: "#E8E8E8",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    hover: {
      no: {
        outerFill: "#1E1E1E",
        outerStroke: "#B8B8B8",
        textColor: "#E8E8E8",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#1E1E1E",
        outerStroke: "#B8B8B8",
        dotFill: "#E8E8E8",
        textColor: "#E8E8E8",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
    disabled: {
      no: {
        outerFill: "#2A2A2A",
        outerStroke: "#424242",
        textColor: "rgba(232, 232, 232, 0.45)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
      yes: {
        outerFill: "#2A2A2A",
        outerStroke: "#424242",
        dotFill: "#8A8A8A",
        textColor: "rgba(232, 232, 232, 0.45)",
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.22,
      },
    },
  },
};

const radioThemeSet = new Set<string>(radioThemeOptions);

export const resolveRadioTheme = (theme: string): RadioTheme => {
  return radioThemeSet.has(theme) ? (theme as RadioTheme) : "Light";
};
