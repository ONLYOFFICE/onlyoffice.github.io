import { type PluginTheme } from "../components/shared/pluginTheme.ts";

type SliderThumb = {
  size: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  shadow?: string;
};

type SliderLabel = {
  color: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

type SliderThemeTokens = {
  offTrack: string;
  onTrack: string;
  thumb: SliderThumb;
  label: SliderLabel;
};

export const sliderTokens: Record<PluginTheme, SliderThemeTokens> = {
  Light: {
    offTrack: "#C0C0C0",
    onTrack: "rgba(0, 0, 0, 0.80)",
    thumb: {
      size: 12,
      fill: "#FFFFFF",
      stroke: "rgba(0, 0, 0, 0.80)",
      strokeWidth: 1,
    },
    label: {
      color: "rgba(0, 0, 0, 0.80)",
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.22,
    },
  },
  "Light Classic": {
    offTrack: "#CFCFCF",
    onTrack: "#444444",
    thumb: {
      size: 12,
      fill: "#FFFFFF",
      stroke: "rgba(0, 0, 0, 0.80)",
      strokeWidth: 1,
    },
    label: {
      color: "#444444",
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.22,
    },
  },
  Dark: {
    offTrack: "#666666",
    onTrack: "rgba(255, 255, 255, 0.80)",
    thumb: {
      size: 12,
      fill: "#333333",
      stroke: "#FFFFFF",
      strokeWidth: 1,
    },
    label: {
      color: "rgba(255, 255, 255, 0.80)",
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.22,
    },
  },
  "Dark Contrast": {
    offTrack: "#696969",
    onTrack: "#E8E8E8",
    thumb: {
      size: 12,
      fill: "#1E1E1E",
      stroke: "#FFFFFF",
      strokeWidth: 1,
    },
    label: {
      color: "#E8E8E8",
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 0.22,
    },
  },
  "Modern Light": {
    offTrack: "#E1E1E1",
    onTrack: "#4473CA",
    thumb: {
      size: 18,
      fill: "#4473CA",
      stroke: "#FFFFFF",
      strokeWidth: 3,
      shadow: "0 4px 12px rgba(0, 32, 51, 0.10), 0 8px 100px rgba(0, 32, 51, 0.14)",
    },
    label: {
      color: "#383838",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.24,
    },
  },
  "Modern Dark": {
    offTrack: "#686868",
    onTrack: "#4A7BE0",
    thumb: {
      size: 18,
      fill: "#4A7BE0",
      stroke: "#FFFFFF",
      strokeWidth: 3,
      shadow: "0 4px 12px rgba(0, 32, 51, 0.10), 0 8px 100px rgba(0, 32, 51, 0.14)",
    },
    label: {
      color: "#F3F3F3",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.24,
    },
  },
};

