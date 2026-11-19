export type TypographyToken = {
  id: string;
  role: "Head1" | "Head2" | "Head3" | "Head4" | "Body" | "Caption";
  sizeLabel: string;
  weightLabel: "Regular" | "Medium" | "Bold";
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
};

export const typographyTokens: TypographyToken[] = [
  {
    id: "head1-regular",
    role: "Head1",
    sizeLabel: "15/20",
    weightLabel: "Regular",
    fontFamily: "Segoe UI",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  {
    id: "head1-bold",
    role: "Head1",
    sizeLabel: "14/20",
    weightLabel: "Bold",
    fontFamily: "Segoe UI",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20,
    letterSpacing: 0.28,
  },
  {
    id: "head2-bold",
    role: "Head2",
    sizeLabel: "14/16",
    weightLabel: "Bold",
    fontFamily: "Segoe UI",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20,
    letterSpacing: 0.28,
  },
  {
    id: "head3-medium",
    role: "Head3",
    sizeLabel: "12/16",
    weightLabel: "Medium",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 20,
    letterSpacing: 0.24,
  },
  {
    id: "head3-regular",
    role: "Head3",
    sizeLabel: "12/16",
    weightLabel: "Regular",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.24,
  },
  {
    id: "head4-bold",
    role: "Head4",
    sizeLabel: "11/16",
    weightLabel: "Bold",
    fontFamily: "Segoe UI",
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 16,
    letterSpacing: 0.22,
  },
  {
    id: "body-regular-16",
    role: "Body",
    sizeLabel: "11/16",
    weightLabel: "Regular",
    fontFamily: "Segoe UI",
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.22,
  },
  {
    id: "body-regular-14",
    role: "Body",
    sizeLabel: "11/14",
    weightLabel: "Regular",
    fontFamily: "Segoe UI",
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 14,
    letterSpacing: 0.22,
  },
  {
    id: "caption-regular-11",
    role: "Caption",
    sizeLabel: "11/12",
    weightLabel: "Regular",
    fontFamily: "Segoe UI",
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 12,
    letterSpacing: 0.22,
  },
  {
    id: "caption-regular-10",
    role: "Caption",
    sizeLabel: "10/14",
    weightLabel: "Regular",
    fontFamily: "Segoe UI",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 12,
    letterSpacing: 0.2,
  },
];

export const typographyContentExample = {
  light: {
    titleColor: "#333333",
    bodyColor: "#333333",
    captionColor: "#A3A9AE",
    background: "#FFFFFF",
  },
  dark: {
    titleColor: "rgba(255, 255, 255, 0.8)",
    bodyColor: "rgba(255, 255, 255, 0.8)",
    captionColor: "rgba(255, 255, 255, 0.6)",
    background: "#333333",
  },
} as const;
