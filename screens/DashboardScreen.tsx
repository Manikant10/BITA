import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { MetricCard } from "@/components/MetricCard";
import { FAB } from "@/components/FAB";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing } from "@/constants/theme";
import { ScreenScrollView } from "@/components/ScreenScrollView";

export default function DashboardScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const isStaffOrAdmin = user?.role === "admin" || user?.role === "staff";

  const fabActions = [
    {
      icon: "calendar-plus" as keyof typeof MaterialCommunityIcons.glyphMap,
      label: "Create Event",
      onPress: () => navigation.navigate("Events" as never),
    },
    {
      icon: "account-check" as keyof typeof MaterialCommunityIcons.glyphMap,
      label: "Mark Attendance",
      onPress: () => navigation.navigate("Attendance" as never),
    },
    {
      icon: "cash" as keyof typeof MaterialCommunityIcons.glyphMap,
      label: "Add Fee",
      onPress: () => navigation.navigate("Fees" as never),
    },
    {
      icon: "brain" as keyof typeof MaterialCommunityIcons.glyphMap,
      label: "Generate Timetable",
      onPress: () => navigation.navigate("AITimetable" as never),
    },
  ];

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
              {isStaffOrAdmin ? "Welcome back" : "Hello"}
            </ThemedText>
            <ThemedText type="h1">{user?.name}</ThemedText>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {isStaffOrAdmin ? (
            <>
              <MetricCard
                title="Total Students"
                value="450"
                icon="account-group"
                color={theme.primary}
                onPress={() => navigation.navigate("Manage" as never)}
              />
              <MetricCard
                title="Attendance Rate"
                value="92%"
                icon="calendar-check"
                color={theme.success}
                onPress={() => navigation.navigate("LiveAttendance" as never)}
              />
              <MetricCard
                title="Pending Fees"
                value="25"
                icon="cash-multiple"
                color={theme.warning}
                onPress={() => navigation.navigate("Fees" as never)}
              />
              <MetricCard
                title="Upcoming Events"
                value="8"
                icon="calendar-star"
                color={theme.accent}
                onPress={() => navigation.navigate("Events" as never)}
              />
            </>
          ) : (
            <>
              <MetricCard
                title="Attendance"
                value="88%"
                icon="calendar-check"
                color={theme.success}
                onPress={() => navigation.navigate("Attendance" as never)}
              />
              <MetricCard
                title="Pending Fees"
                value="$500"
                icon="cash"
                color={theme.warning}
                onPress={() => navigation.navigate("Fees" as never)}
              />
              <MetricCard
                title="Today's Classes"
                value="6"
                icon="book-open-variant"
                color={theme.primary}
              />
              <MetricCard
                title="Events"
                value="3"
                icon="calendar-star"
                color={theme.accent}
                onPress={() => navigation.navigate("Events" as never)}
              />
            </>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="h2" style={styles.sectionTitle}>
            Quick Actions
          </ThemedText>
          <View style={styles.quickActions}>
            <QuickActionButton
              icon="calendar-check"
              label="Attendance"
              onPress={() => navigation.navigate("Attendance" as never)}
            />
            <QuickActionButton
              icon="calendar-star"
              label="Events"
              onPress={() => navigation.navigate("Events" as never)}
            />
            <QuickActionButton
              icon="cash"
              label="Fees"
              onPress={() => navigation.navigate("Fees" as never)}
            />
            {isStaffOrAdmin && (
              <QuickActionButton
                icon="account-group"
                label="Manage"
                onPress={() => navigation.navigate("Manage" as never)}
              />
            )}
          </View>
        </View>
      </View>

      {isStaffOrAdmin && <FAB actions={fabActions} />}
    </ScreenScrollView>
  );
}

function QuickActionButton({ icon, label, onPress }: any) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.quickActionButton,
        { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={32} color={theme.primary} />
      <ThemedText
        type="caption"
        style={[styles.quickActionLabel, { color: theme.textSecondary }]}
      >
        {label}
      </ThemedText>
    </View>
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
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  quickActionButton: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },
  quickActionLabel: {
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
