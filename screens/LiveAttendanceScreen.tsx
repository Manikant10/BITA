import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface ClassAttendance {
  id: string;
  className: string;
  subject: string;
  teacher: string;
  total: number;
  present: number;
  status: "complete" | "in-progress" | "not-started";
  time: string;
}

const MOCK_CLASSES: ClassAttendance[] = [
  {
    id: "1",
    className: "CS-A",
    subject: "Data Structures",
    teacher: "Dr. Smith",
    total: 50,
    present: 47,
    status: "complete",
    time: "9:00 AM - 10:00 AM",
  },
  {
    id: "2",
    className: "CS-B",
    subject: "Algorithms",
    teacher: "Prof. Johnson",
    total: 45,
    present: 32,
    status: "in-progress",
    time: "10:00 AM - 11:00 AM",
  },
  {
    id: "3",
    className: "CS-C",
    subject: "Web Development",
    teacher: "Dr. Williams",
    total: 48,
    present: 0,
    status: "not-started",
    time: "11:00 AM - 12:00 PM",
  },
];

export default function LiveAttendanceScreen() {
  const { theme } = useTheme();
  const [classes, setClasses] = useState<ClassAttendance[]>(MOCK_CLASSES);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return theme.success;
      case "in-progress":
        return theme.warning;
      default:
        return theme.textDisabled;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "complete":
        return "success";
      case "in-progress":
        return "warning";
      default:
        return "info";
    }
  };

  const getAttendancePercentage = (present: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText type="h2">Live Attendance Monitor</ThemedText>
          <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
            Real-time attendance tracking
          </ThemedText>
        </View>
        <MaterialCommunityIcons
          name="refresh"
          size={24}
          color={theme.primary}
          style={styles.refreshIcon}
          onPress={onRefresh}
        />
      </View>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        renderItem={({ item }) => {
          const percentage = getAttendancePercentage(item.present, item.total);
          const statusColor = getStatusColor(item.status);

          return (
            <View
              style={[
                styles.classCard,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderLeftColor: statusColor,
                  borderColor: theme.border,
                },
                Shadows.small,
              ]}
            >
              <View style={styles.classHeader}>
                <View>
                  <ThemedText type="body" style={styles.className}>
                    {item.className} - {item.subject}
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    style={{ color: theme.textSecondary }}
                  >
                    {item.teacher}
                  </ThemedText>
                </View>
                <Badge
                  label={item.status.replace("-", " ").toUpperCase()}
                  variant={getStatusBadgeVariant(item.status) as any}
                />
              </View>

              <View style={styles.timeContainer}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color={theme.textSecondary}
                />
                <ThemedText
                  type="caption"
                  style={{ color: theme.textSecondary }}
                >
                  {item.time}
                </ThemedText>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <ThemedText type="h2" style={{ color: statusColor }}>
                    {item.present}/{item.total}
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    style={{ color: theme.textSecondary }}
                  >
                    Present
                  </ThemedText>
                </View>

                <View style={styles.statItem}>
                  <ThemedText type="h2" style={{ color: statusColor }}>
                    {percentage}%
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    style={{ color: theme.textSecondary }}
                  >
                    Attendance
                  </ThemedText>
                </View>

                <View style={styles.statItem}>
                  <ThemedText type="h2" style={{ color: theme.error }}>
                    {item.total - item.present}
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    style={{ color: theme.textSecondary }}
                  >
                    Absent
                  </ThemedText>
                </View>
              </View>

              <View
                style={[
                  styles.progressBar,
                  { backgroundColor: theme.backgroundSecondary },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: statusColor,
                    },
                  ]}
                />
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  refreshIcon: {
    padding: Spacing.sm,
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: 0,
  },
  classCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderLeftWidth: 4,
    marginBottom: Spacing.md,
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  className: {
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: "center",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});
