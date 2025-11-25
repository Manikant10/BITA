import React, { useState } from "react";
import { StyleSheet, View, Alert, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TextInput } from "@/components/TextInput";
import { GradientButton } from "@/components/GradientButton";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "staff" | "student">("student");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password, role);
    } catch (error) {
      Alert.alert("Error", "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <LinearGradient
        colors={[theme.backgroundRoot, theme.backgroundDefault]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="h1">Welcome Back</ThemedText>
            <ThemedText
              type="body"
              style={[styles.subtitle, { color: theme.textSecondary }]}
            >
              Sign in to continue
            </ThemedText>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              icon="lock"
            />

            <View style={styles.roleSelector}>
              <ThemedText
                type="bodySmall"
                style={[styles.roleLabel, { color: theme.textSecondary }]}
              >
                Select Role
              </ThemedText>
              <View style={styles.roleButtons}>
                {(["student", "staff", "admin"] as const).map((r) => (
                  <Pressable
                    key={r}
                    onPress={() => setRole(r)}
                    style={[
                      styles.roleButton,
                      {
                        backgroundColor:
                          role === r
                            ? theme.primary
                            : theme.backgroundSecondary,
                        borderColor: role === r ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <ThemedText
                      type="bodySmall"
                      style={[
                        styles.roleButtonText,
                        {
                          color:
                            role === r ? theme.buttonText : theme.textSecondary,
                        },
                      ]}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>

            <GradientButton
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
            >
              {loading ? "Logging in..." : "Login"}
            </GradientButton>

            <Pressable onPress={() => navigation.navigate("Register")}>
              <ThemedText
                type="body"
                style={[styles.link, { color: theme.accent }]}
              >
                Don't have an account? Sign up
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    minHeight: "100%",
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  subtitle: {
    marginTop: Spacing.sm,
  },
  form: {
    gap: Spacing.md,
  },
  roleSelector: {
    marginTop: Spacing.md,
  },
  roleLabel: {
    marginBottom: Spacing.sm,
  },
  roleButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  roleButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  roleButtonText: {
    fontWeight: "600",
  },
  loginButton: {
    marginTop: Spacing.lg,
  },
  link: {
    textAlign: "center",
    marginTop: Spacing.md,
  },
});
