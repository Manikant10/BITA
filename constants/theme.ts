import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#6C63FF",
    primaryDark: "#4A42D6",
    primaryLight: "#8F87FF",
    
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F2F2F2",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
    
    accent: "#00A8E8",
    success: "#00C853",
    warning: "#FFB300",
    error: "#D32F2F",
    
    text: "#11181C",
    textSecondary: "#687076",
    textDisabled: "#9BA1A6",
    buttonText: "#FFFFFF",
    
    tabIconDefault: "#687076",
    tabIconSelected: "#6C63FF",
    link: "#6C63FF",
    
    gradientPrimary: ["#6C63FF", "#4A42D6"],
    gradientAccent: ["#00A8E8", "#6C63FF"],
    
    border: "#E0E0E0",
    borderLight: "#F0F0F0",
  },
  dark: {
    primary: "#6C63FF",
    primaryDark: "#4A42D6",
    primaryLight: "#8F87FF",
    
    backgroundRoot: "#0A0E27",
    backgroundDefault: "#151B3D",
    backgroundSecondary: "#1E2749",
    backgroundTertiary: "#1E2749",
    
    accent: "#00F5FF",
    success: "#00E676",
    warning: "#FFD740",
    error: "#FF5252",
    
    text: "#FFFFFF",
    textSecondary: "#A8B2D1",
    textDisabled: "#4A5A7F",
    buttonText: "#FFFFFF",
    
    tabIconDefault: "#A8B2D1",
    tabIconSelected: "#00F5FF",
    link: "#00F5FF",
    
    gradientPrimary: ["#6C63FF", "#4A42D6"],
    gradientAccent: ["#00F5FF", "#6C63FF"],
    
    border: "#1E2749",
    borderLight: "#2A3454",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  inputHeight: 56,
  buttonHeight: 48,
  fabSize: 56,
  tabBarHeight: 56,
  headerHeight: 56,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 40,
  full: 9999,
};

export const Typography = {
  display: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h1: {
    fontSize: 24,
    fontWeight: "500" as const,
  },
  h2: {
    fontSize: 20,
    fontWeight: "500" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
  button: {
    fontSize: 16,
    fontWeight: "500" as const,
  },
};

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  fab: {
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
