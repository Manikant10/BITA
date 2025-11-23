import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { MetricCard } from "@/components/MetricCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { ScreenScrollView } from "@/components/ScreenScrollView";

export default function ManageScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="h2">Management</ThemedText>
          <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
            Manage students, staff, and campus resources
          </ThemedText>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="Total Students"
            value="450"
            icon="account-group"
            color={theme.primary}
          />
          <MetricCard
            title="Teaching Staff"
            value="45"
            icon="account-tie"
            color={theme.accent}
          />
          <MetricCard
            title="Classes"
            value="24"
            icon="google-classroom"
            color={theme.success}
          />
          <MetricCard
            title="Departments"
            value="8"
            icon="office-building"
            color={theme.warning}
          />
        </View>

        <ThemedText type="h2" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>

        <ManagementAction
          icon="account-plus"
          title="Register New Student"
          description="Add a new student to the system"
          onPress={() => navigation.navigate("StudentRegistration" as never)}
        />
        <ManagementAction
          icon="account-multiple-plus"
          title="Manage Students"
          description="View and edit student information"
          onPress={() => {}}
        />
        <ManagementAction
          icon="account-tie"
          title="Manage Staff"
          description="Add or edit staff details"
          onPress={() => {}}
        />
        <ManagementAction
          icon="google-classroom"
          title="Manage Classes"
          description="Create and manage class schedules"
          onPress={() => {}}
        />
        <ManagementAction
          icon="brain"
          title="AI Timetable"
          description="Generate optimized timetables"
          onPress={() => navigation.navigate("AITimetable" as never)}
        />
        <ManagementAction
          icon="chart-bar"
          title="Live Attendance"
          description="Monitor real-time attendance"
          onPress={() => navigation.navigate("LiveAttendance" as never)}
        />
      </View>
    </ScreenScrollView>
  );
}

function ManagementAction({ icon, title, description, onPress }: any) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionCard,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={[styles.actionIcon, { backgroundColor: theme.primary + "20" }]}>
        <MaterialCommunityIcons name={icon} size={24} color={theme.primary} />
      </View>
      <View style={styles.actionContent}>
        <ThemedText type="body" style={styles.actionTitle}>
          {title}
        </ThemedText>
        <ThemedText type="caption" style={[styles.actionDescription, { color: theme.textSecondary }]}>
          {description}
        </ThemedText>
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
  header: {
    marginBottom: Spacing.lg,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  actionDescription: {
    fontSize: 12,
  },
});
