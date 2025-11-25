import React, { useState } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "@/components/TextInput";
import { GradientButton } from "@/components/GradientButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

export default function AITimetableScreen() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState("");
  const [subjects, setSubjects] = useState("");
  const [teachers, setTeachers] = useState("");
  const [constraints, setConstraints] = useState("");

  const handleGenerate = async () => {
    if (!classes || !subjects || !teachers) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Success",
        "AI Timetable generated successfully!\n\nThis is a demo. In production, this would use OpenAI API to generate an optimized timetable based on your constraints.",
        [{ text: "OK" }],
      );
    }, 3000);
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.container}>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
            },
          ]}
        >
          <ThemedText type="h2" style={styles.infoTitle}>
            AI-Powered Timetable Generator
          </ThemedText>
          <ThemedText
            type="bodySmall"
            style={[styles.infoText, { color: theme.textSecondary }]}
          >
            Our AI analyzes your inputs and generates an optimized timetable
            considering teacher availability, room capacity, and subject
            requirements.
          </ThemedText>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Classes/Sections *"
            value={classes}
            onChangeText={setClasses}
            placeholder="e.g., CS-A, CS-B, IT-A"
            icon="google-classroom"
            multiline
          />

          <TextInput
            label="Subjects *"
            value={subjects}
            onChangeText={setSubjects}
            placeholder="e.g., Math, Physics, Chemistry"
            icon="book-open-variant"
            multiline
          />

          <TextInput
            label="Teachers *"
            value={teachers}
            onChangeText={setTeachers}
            placeholder="e.g., Dr. Smith, Prof. Johnson"
            icon="account-tie"
            multiline
          />

          <TextInput
            label="Special Constraints (Optional)"
            value={constraints}
            onChangeText={setConstraints}
            placeholder="e.g., No classes after 4 PM, Lab sessions need 2 hours"
            icon="information"
            multiline
            numberOfLines={3}
          />

          <GradientButton
            onPress={handleGenerate}
            disabled={loading}
            style={styles.generateButton}
          >
            {loading ? "Generating..." : "Generate Timetable"}
          </GradientButton>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <ThemedText
                type="body"
                style={[styles.loadingText, { color: theme.textSecondary }]}
              >
                AI is analyzing your inputs and creating an optimized
                schedule...
              </ThemedText>
            </View>
          )}
        </View>

        <View
          style={[
            styles.tipCard,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.accent,
            },
          ]}
        >
          <ThemedText
            type="bodySmall"
            style={[styles.tipText, { color: theme.textSecondary }]}
          >
            💡 Tip: Provide detailed constraints for better results. The AI
            considers factors like teacher preferences, room availability, and
            student workload distribution.
          </ThemedText>
        </View>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
  },
  infoCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    marginBottom: Spacing.sm,
  },
  infoText: {
    lineHeight: 20,
  },
  form: {
    marginBottom: Spacing.lg,
  },
  generateButton: {
    marginTop: Spacing.lg,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: Spacing.lg,
    padding: Spacing.lg,
  },
  loadingText: {
    marginTop: Spacing.md,
    textAlign: "center",
  },
  tipCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginBottom: Spacing.xxl,
  },
  tipText: {
    lineHeight: 20,
  },
});
