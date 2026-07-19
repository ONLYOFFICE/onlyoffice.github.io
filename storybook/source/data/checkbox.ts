export const checkboxThemeOptions = [
  "Light",
  "Light Classic",
  "Modern Light",
  "Modern Dark",
  "Dark",
  "Dark Contrast",
] as const;

export const checkboxStates = ["default", "hover", "disabled"] as const;
export const checkboxSelections = ["no", "yes", "partial"] as const;

export type CheckboxTheme = (typeof checkboxThemeOptions)[number];
export type CheckboxState = (typeof checkboxStates)[number];
export type CheckboxSelection = (typeof checkboxSelections)[number];

type CheckboxToken = {
  boxFill: string;
  boxStroke: string;
  boxRadius: number;
  markColor?: string;
  markOpacity?: number;
  textColor: string;
};

export const checkboxTokens: Record<CheckboxTheme, Record<CheckboxState, Record<CheckboxSelection, CheckboxToken>>> = {
  "Light": {
    default: {
      no: {
        boxFill: "white",
        boxStroke: "#C0C0C0",
        boxRadius: 1.5,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
      yes: {
        boxFill: "white",
        boxStroke: "#C0C0C0",
        boxRadius: 1.5,
        markColor: "black",
        markOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
      partial: {
        boxFill: "white",
        boxStroke: "#C0C0C0",
        boxRadius: 1.5,
        markColor: "black",
        markOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
    },
    hover: {
      no: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
      yes: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        markColor: "black",
        markOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
      partial: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        markColor: "black",
        markOpacity: 0.8,
        textColor: "rgba(0, 0, 0, 0.80)",
      },
    },
    disabled: {
      no: {
        boxFill: "#F7F7F7",
        boxStroke: "#E0E0E0",
        boxRadius: 2.5,
        textColor: "rgba(0, 0, 0, 0.40)",
      },
      yes: {
        boxFill: "#F7F7F7",
        boxStroke: "#E0E0E0",
        boxRadius: 2.5,
        markColor: "black",
        markOpacity: 0.5,
        textColor: "rgba(0, 0, 0, 0.40)",
      },
      partial: {
        boxFill: "#F7F7F7",
        boxStroke: "#E0E0E0",
        boxRadius: 2.5,
        markColor: "black",
        markOpacity: 0.5,
        textColor: "rgba(0, 0, 0, 0.40)",
      },
    },
  },
  "Light Classic": {
    default: {
      no: {
        boxFill: "white",
        boxStroke: "#CFCFCF",
        boxRadius: 1.5,
        textColor: "#444444",
      },
      yes: {
        boxFill: "white",
        boxStroke: "#CFCFCF",
        boxRadius: 1.5,
        markColor: "#444444",
        textColor: "#444444",
      },
      partial: {
        boxFill: "white",
        boxStroke: "#CFCFCF",
        boxRadius: 1.5,
        markColor: "#444444",
        textColor: "#444444",
      },
    },
    hover: {
      no: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        textColor: "#444444",
      },
      yes: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        markColor: "#444444",
        textColor: "#444444",
      },
      partial: {
        boxFill: "white",
        boxStroke: "#848484",
        boxRadius: 1.5,
        markColor: "#444444",
        textColor: "#444444",
      },
    },
    disabled: {
      no: {
        boxFill: "#F1F1F1",
        boxStroke: "#D8DADC",
        boxRadius: 2.5,
        textColor: "#A5A5A5",
      },
      yes: {
        boxFill: "#F1F1F1",
        boxStroke: "#D8DADC",
        boxRadius: 2.5,
        markColor: "#A5A5A5",
        textColor: "#A5A5A5",
      },
      partial: {
        boxFill: "#F1F1F1",
        boxStroke: "#D8DADC",
        boxRadius: 2.5,
        markColor: "#A5A5A5",
        textColor: "#A5A5A5",
      },
    },
  },
  "Modern Light": {
    default: {
      no: {
        boxFill: "white",
        boxStroke: "#7F7F7F",
        boxRadius: 1.5,
        textColor: "#383838",
      },
      yes: {
        boxFill: "white",
        boxStroke: "#7F7F7F",
        boxRadius: 1.5,
        markColor: "#383838",
        textColor: "#383838",
      },
      partial: {
        boxFill: "white",
        boxStroke: "#7F7F7F",
        boxRadius: 1.5,
        markColor: "#383838",
        textColor: "#383838",
      },
    },
    hover: {
      no: {
        boxFill: "#F3F3F3",
        boxStroke: "#969696",
        boxRadius: 1.5,
        textColor: "#383838",
      },
      yes: {
        boxFill: "#F3F3F3",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#383838",
        textColor: "#383838",
      },
      partial: {
        boxFill: "#F3F3F3",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#383838",
        textColor: "#383838",
      },
    },
    disabled: {
      no: {
        boxFill: "#F9F9F9",
        boxStroke: "#969696",
        boxRadius: 1.5,
        textColor: "#383838",
      },
      yes: {
        boxFill: "#F9F9F9",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "white",
        textColor: "#383838",
      },
      partial: {
        boxFill: "#F9F9F9",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "white",
        textColor: "#383838",
      },
    },
  },
  "Modern Dark": {
    default: {
      no: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        textColor: "#F3F3F3",
      },
      yes: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
      partial: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
    },
    hover: {
      no: {
        boxFill: "#585858",
        boxStroke: "#969696",
        boxRadius: 1.5,
        textColor: "#F3F3F3",
      },
      yes: {
        boxFill: "#585858",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
      partial: {
        boxFill: "#585858",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
    },
    disabled: {
      no: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        textColor: "#F3F3F3",
      },
      yes: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
      partial: {
        boxFill: "#404040",
        boxStroke: "#969696",
        boxRadius: 1.5,
        markColor: "#EAEAEA",
        textColor: "#F3F3F3",
      },
    },
  },
  "Dark": {
    default: {
      no: {
        boxFill: "#333333",
        boxStroke: "#666666",
        boxRadius: 1.5,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
      yes: {
        boxFill: "#333333",
        boxStroke: "#666666",
        boxRadius: 1.5,
        markColor: "white",
        markOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
      partial: {
        boxFill: "#333333",
        boxStroke: "#666666",
        boxRadius: 1.5,
        markColor: "white",
        markOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
    },
    hover: {
      no: {
        boxFill: "#333333",
        boxStroke: "#CCCCCC",
        boxRadius: 1.5,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
      yes: {
        boxFill: "#333333",
        boxStroke: "#CCCCCC",
        boxRadius: 1.5,
        markColor: "white",
        markOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
      partial: {
        boxFill: "#333333",
        boxStroke: "#CCCCCC",
        boxRadius: 1.5,
        markColor: "white",
        markOpacity: 0.8,
        textColor: "rgba(255, 255, 255, 0.80)",
      },
    },
    disabled: {
      no: {
        boxFill: "#404040",
        boxStroke: "#555555",
        boxRadius: 2.5,
        textColor: "rgba(255, 255, 255, 0.40)",
      },
      yes: {
        boxFill: "#404040",
        boxStroke: "#555555",
        boxRadius: 2.5,
        markColor: "white",
        markOpacity: 0.5,
        textColor: "rgba(255, 255, 255, 0.40)",
      },
      partial: {
        boxFill: "#404040",
        boxStroke: "#555555",
        boxRadius: 2.5,
        markColor: "white",
        markOpacity: 0.5,
        textColor: "rgba(255, 255, 255, 0.40)",
      },
    },
  },
  "Dark Contrast": {
    default: {
      no: {
        boxFill: "#1E1E1E",
        boxStroke: "#696969",
        boxRadius: 1.5,
        textColor: "#E8E8E8",
      },
      yes: {
        boxFill: "#1E1E1E",
        boxStroke: "#696969",
        boxRadius: 1.5,
        markColor: "#E8E8E8",
        textColor: "#E8E8E8",
      },
      partial: {
        boxFill: "#1E1E1E",
        boxStroke: "#696969",
        boxRadius: 1.5,
        markColor: "#E8E8E8",
        textColor: "#E8E8E8",
      },
    },
    hover: {
      no: {
        boxFill: "#1E1E1E",
        boxStroke: "#B8B8B8",
        boxRadius: 1.5,
        textColor: "#E8E8E8",
      },
      yes: {
        boxFill: "#1E1E1E",
        boxStroke: "#B8B8B8",
        boxRadius: 1.5,
        markColor: "#E8E8E8",
        textColor: "#E8E8E8",
      },
      partial: {
        boxFill: "#1E1E1E",
        boxStroke: "#B8B8B8",
        boxRadius: 1.5,
        markColor: "#E8E8E8",
        textColor: "#E8E8E8",
      },
    },
    disabled: {
      no: {
        boxFill: "#2A2A2A",
        boxStroke: "#424242",
        boxRadius: 2.5,
        textColor: "rgba(232, 232, 232, 0.45)",
      },
      yes: {
        boxFill: "#2A2A2A",
        boxStroke: "#424242",
        boxRadius: 2.5,
        markColor: "#8A8A8A",
        textColor: "rgba(232, 232, 232, 0.45)",
      },
      partial: {
        boxFill: "#2A2A2A",
        boxStroke: "#424242",
        boxRadius: 2.5,
        markColor: "#8A8A8A",
        textColor: "rgba(232, 232, 232, 0.45)",
      },
    },
  },
};

const THEME_ALIASES: Record<string, CheckboxTheme> = {
  light: "Light",
  lightclassic: "Light Classic",
  modernlight: "Modern Light",
  moderndark: "Modern Dark",
  dark: "Dark",
  darkcontrast: "Dark Contrast",
};

export const resolveCheckboxTheme = (theme?: string): CheckboxTheme => {
  if (!theme) return "Light";
  const compact = theme.replace(/[\s_-]+/g, "").toLowerCase();
  return THEME_ALIASES[compact] ?? "Light";
};
