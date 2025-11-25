import React from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { GradientButton } from "@/components/GradientButton";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { ScreenScrollView } from "@/components/ScreenScrollView";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case "admin":
        return "shield-account";
      case "staff":
        return "briefcase";
      default:
        return "school";
    }
  };

  const getRoleBadgeVariant = () => {
    switch (user?.role) {
      case "admin":
        return "primary";
      case "staff":
        return "info";
      default:
        return "success";
    }
  };

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={theme.gradientPrimary as [string, string]}
            style={styles.avatarContainer}
          >
            <MaterialCommunityIcons
              name={getRoleIcon() as any}
              size={48}
              color={theme.buttonText}
            />
          </LinearGradient>
          <ThemedText type="h1" style={styles.name}>
            {user?.name}
          </ThemedText>
          <ThemedText
            type="body"
            style={[styles.email, { color: theme.textSecondary }]}
          >
            {user?.email}
          </ThemedText>
          <View style={styles.badgeContainer}>
            <Badge
              label={user?.role?.toUpperCase() || ""}
              variant={getRoleBadgeVariant() as any}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="h2" style={styles.sectionTitle}>
            Account Settings
          </ThemedText>

          <SettingItem
            icon="account-edit"
            label="Edit Profile"
            onPress={() => {}}
          />
          <SettingItem icon="bell" label="Notifications" onPress={() => {}} />
          <SettingItem
            icon="lock"
            label="Privacy & Security"
            onPress={() => {}}
          />
          <SettingItem
            icon="help-circle"
            label="Help & Support"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="h2" style={styles.sectionTitle}>
            App Settings
          </ThemedText>

          <SettingItem
            icon="theme-light-dark"
            label="Appearance"
            onPress={() => {}}
          />
          <SettingItem icon="translate" label="Language" onPress={() => {}} />
          <SettingItem icon="information" label="About" onPress={() => {}} />
        </View>

        <GradientButton
          onPress={handleLogout}
          variant="accent"
          style={styles.logoutButton}
        >
          Logout
        </GradientButton>
      </View>
    </ScreenScrollView>
  );
}

function SettingItem({ icon, label, onPress }: any) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingItem,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.settingLeft}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.textSecondary}
          style={styles.settingIcon}
        />
        <ThemedText type="body">{label}</ThemedText>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={theme.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  name: {
    marginBottom: Spacing.xs,
  },
  email: {
    marginBottom: Spacing.md,
  },
  badgeContainer: {
    marginTop: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  logoutButton: {
    marginBottom: Spacing.xxl,
  },
});
