import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface BadgeProps {
  label: string;
  variant?: "primary" | "success" | "warning" | "error" | "info";
}

export function Badge({ label, variant = "primary" }: BadgeProps) {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "success":
        return theme.success;
      case "warning":
        return theme.warning;
      case "error":
        return theme.error;
      case "info":
        return theme.accent;
      default:
        return theme.primary;
    }
  };

  return (
    <View
      style={[styles.badge, { backgroundColor: getBackgroundColor() + "30" }]}
    >
      <ThemedText
        type="caption"
        style={[styles.text, { color: getBackgroundColor() }]}
      >
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
  },
});
