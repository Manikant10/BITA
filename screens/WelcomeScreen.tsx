import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GradientButton } from "@/components/GradientButton";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthNavigator";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[theme.backgroundRoot, theme.backgroundDefault]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <ThemedText type="display" style={styles.title}>
              BITA
            </ThemedText>
            <ThemedText type="body" style={[styles.subtitle, { color: theme.textSecondary }]}>
              Smart Campus Assistant
            </ThemedText>
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton onPress={() => navigation.navigate("Login")} variant="primary">
              Login
            </GradientButton>
            <Button onPress={() => navigation.navigate("Register")} style={styles.registerButton}>
              Create Account
            </Button>
          </View>
        </View>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl * 2,
    paddingBottom: Spacing.xxl,
  },
  logoContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
    letterSpacing: 2,
  },
  subtitle: {
    textAlign: "center",
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  registerButton: {
    marginTop: Spacing.sm,
  },
});
