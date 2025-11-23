import React, { useState } from "react";
import { StyleSheet, TextInput as RNTextInput, View, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export function TextInput({ label, error, icon, ...props }: CustomTextInputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText type="bodySmall" style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </ThemedText>
      <View style={[styles.inputContainer, error && { borderColor: theme.error }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={theme.textSecondary}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[
            styles.input,
            {
              color: theme.text,
              borderBottomColor: isFocused
                ? theme.accent
                : error
                  ? theme.error
                  : theme.border,
            },
          ]}
          placeholderTextColor={theme.textDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && (
        <ThemedText type="caption" style={[styles.error, { color: theme.error }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: Spacing.inputHeight,
    fontSize: Typography.body.fontSize,
    borderBottomWidth: 2,
    paddingVertical: Spacing.sm,
  },
  error: {
    marginTop: Spacing.xs,
  },
});
