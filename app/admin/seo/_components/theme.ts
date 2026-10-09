// One place for every colour of the admin SEO page (/admin/seo).
// Edit a value here to change the look everywhere. SeoAuditClient applies these as CSS variables
// (--seo-<name>) on the page root, and every component reads them with var(--seo-<name>).
// Scoped to the admin page: public pages and shared site styles are not affected.
import type { CSSProperties } from "react";

export const seoTheme = {
  navy: "#1B3A6B", // Brand navy: top bar, Scan card, headings, active text
  navyDeep: "#0F2347", // Darkest navy: tooltip background
  orange: "#F97316", // Brand orange: accents, Run scan, active tab underline, focus outline
  orangeHover: "#FB8A3C", // Run scan button hover
  scanOrange: "#FB923C", // lighter orange used only in the Scan card
  scanOrangeHover: "#FDA45A", // Scan card Run scan button hover
  onOrange: "#1A1205", // Dark text on orange buttons
  accentHover: "#C2410C", // Link-like hover colour (darker orange)
  onNavy: "#FFFFFF", // White text and outlines on navy
  navyText: "#C9D6EE", // Light blue-grey text on navy (labels, notes)
  navyTextBright: "#E3EBF8", // Brighter text on navy (buttons)
  navyOutline: "#6F8BBE", // Outlines on navy (switch, sign out, help button)
  whiteTint10: "rgba(255,255,255,0.10)", // Hover tint on navy
  whiteTint12: "rgba(255,255,255,0.12)", // Stat tiles on navy
  whiteTint20: "rgba(255,255,255,0.20)", // Progress bar track on navy
  orangeTint30: "rgba(249,115,22,0.30)", // 'With issues' stat tile
  navyRing20: "rgba(27,58,107,0.20)", // Focus ring of text inputs
  backdrop: "rgba(15,35,71,0.60)", // Dimmed backdrop behind the details popup
  pageBg: "#F3F5F9", // Page background and quiet hover backgrounds
  cardBg: "#FFFFFF", // Cards, panels, inputs
  tabBarBg: "#F3F6FB", // Tab row background
  tableHeadBg: "#EDF1F8", // Table header rows
  tintBg: "#EAF0FA", // Site files card background
  greyCard: "#EDEFF3", // Grey cards inside a group and image cards
  greyCardHover: "#DFE3EA", // Grey card hover
  thumbBg: "#D5DAE3", // Thumbnail placeholder
  rowHover: "#FFF4EA", // Menu row hover (light orange)
  toggleOnBg: "#FFEBD9", // Pressed toggle button background
  neutralBg: "#E6EBF5", // Neutral tags and progress track
  border: "#D9DFEA", // Card and tab row borders
  borderStrong: "#B8C2D6", // Input and button borders
  tintBorder: "#C5D0E4", // Site files card border and divider
  divider: "#EEF1F6", // Menu row dividers
  dividerSoft: "#E6EAF2", // Thin section dividers
  previewBorder: "#E1E5EE", // Google result preview border
  ink: "#1A2233", // Main text
  inkSoft: "#2B364D", // Body text
  mutedText: "#4A5670", // Secondary text
  subtleText: "#5A6478", // URLs and small notes
  faintText: "#6B7690", // Tertiary text
  tabText: "#3A4560", // Inactive tab text
  slashText: "#8A94A8", // Breadcrumb slash
  okBg: "#DDF3E4", // OK tags background
  okText: "#0F4A22", // OK tags text
  warnBg: "#FFE8D1", // 'N issues' / 'N to fix' tags background
  warnText: "#7A3300", // 'N issues' / 'N to fix' tags text
  cautionBg: "#FFE9B8", // Check-level chips and Dev mode pill background
  cautionText: "#5A3A00", // Check-level chips and Dev mode pill text
  badBg: "#FAD4D4", // Fix-level chips background
  badText: "#7A1010", // Fix-level chips text and real error text
  errorBg: "#FDECEC", // Error message box background
  errorBorder: "#E8A9A9", // Error message box border
  keywordBg: "#FDE7D3", // Focus keyword chip background
  keywordText: "#6B2C00", // Focus keyword chip text
  highlight: "#FFD9B3", // Search match highlight
  googleGreen: "#2E6B3A", // Preview URL line
  googleBlue: "#1A0DAB", // Preview title
  googleGrey: "#4D5156", // Preview description
} as const;

export type SeoThemeKey = keyof typeof seoTheme;

/** CSS variables for the page root: { "--seo-navy": "#1B3A6B", ... }. */
export const seoThemeVars = Object.fromEntries(Object.entries(seoTheme).map(([k, val]) => [`--seo-${k}`, val])) as CSSProperties;
