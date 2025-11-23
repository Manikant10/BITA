import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "@/components/TextInput";
import { GradientButton } from "@/components/GradientButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

export default function StudentRegistrationScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    class: "",
    department: "",
    guardianName: "",
    guardianPhone: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = ["name", "email", "rollNo", "class", "department"];
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Success",
      `Student ${formData.name} has been registered successfully!`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={[styles.headerCard, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
          <ThemedText type="h2">Student Registration</ThemedText>
          <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
            Add a new student to the system
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="body" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>
          
          <TextInput
            label="Full Name *"
            value={formData.name}
            onChangeText={(value) => updateField("name", value)}
            placeholder="John Doe"
            icon="account"
          />

          <TextInput
            label="Email *"
            value={formData.email}
            onChangeText={(value) => updateField("email", value)}
            placeholder="student@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="email"
          />

          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => updateField("phone", value)}
            placeholder="+1 234 567 8900"
            keyboardType="phone-pad"
            icon="phone"
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="body" style={styles.sectionTitle}>
            Academic Information
          </ThemedText>
          
          <TextInput
            label="Roll Number *"
            value={formData.rollNo}
            onChangeText={(value) => updateField("rollNo", value)}
            placeholder="CS001"
            icon="numeric"
          />

          <TextInput
            label="Class/Section *"
            value={formData.class}
            onChangeText={(value) => updateField("class", value)}
            placeholder="CS-A"
            icon="google-classroom"
          />

          <TextInput
            label="Department *"
            value={formData.department}
            onChangeText={(value) => updateField("department", value)}
            placeholder="Computer Science"
            icon="office-building"
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="body" style={styles.sectionTitle}>
            Guardian Information
          </ThemedText>
          
          <TextInput
            label="Guardian Name"
            value={formData.guardianName}
            onChangeText={(value) => updateField("guardianName", value)}
            placeholder="Jane Doe"
            icon="account-supervisor"
          />

          <TextInput
            label="Guardian Phone"
            value={formData.guardianPhone}
            onChangeText={(value) => updateField("guardianPhone", value)}
            placeholder="+1 234 567 8900"
            keyboardType="phone-pad"
            icon="phone"
          />
        </View>

        <GradientButton onPress={handleSubmit} style={styles.submitButton}>
          Register Student
        </GradientButton>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
  },
  headerCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  submitButton: {
    marginBottom: Spacing.xxl,
  },
});
