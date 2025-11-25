import React, { useState } from "react";
import { StyleSheet, View, Pressable, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GradientButton } from "@/components/GradientButton";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { ScreenScrollView } from "@/components/ScreenScrollView";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  present: boolean;
}

export default function AttendanceScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isStaffOrAdmin = user?.role === "admin" || user?.role === "staff";

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alice Johnson", rollNo: "CS001", present: false },
    { id: "2", name: "Bob Smith", rollNo: "CS002", present: false },
    { id: "3", name: "Charlie Brown", rollNo: "CS003", present: false },
    { id: "4", name: "Diana Prince", rollNo: "CS004", present: false },
    { id: "5", name: "Eve Adams", rollNo: "CS005", present: false },
  ]);

  const toggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student,
      ),
    );
  };

  const submitAttendance = () => {
    const presentCount = students.filter((s) => s.present).length;
    alert(`Attendance submitted: ${presentCount}/${students.length} present`);
  };

  if (isStaffOrAdmin) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="h2">Mark Attendance</ThemedText>
          <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
            Select present students
          </ThemedText>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toggleAttendance(item.id)}
              style={[
                styles.studentItem,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: item.present ? theme.success : theme.border,
                  borderWidth: item.present ? 2 : 1,
                },
              ]}
            >
              <View style={styles.studentInfo}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: item.present
                        ? theme.success
                        : "transparent",
                      borderColor: item.present
                        ? theme.success
                        : theme.textSecondary,
                    },
                  ]}
                >
                  {item.present && (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color={theme.buttonText}
                    />
                  )}
                </View>
                <View style={styles.studentDetails}>
                  <ThemedText type="body">{item.name}</ThemedText>
                  <ThemedText
                    type="caption"
                    style={{ color: theme.textSecondary }}
                  >
                    Roll No: {item.rollNo}
                  </ThemedText>
                </View>
              </View>
              {item.present && <Badge label="Present" variant="success" />}
            </Pressable>
          )}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <View
          style={[styles.footer, { backgroundColor: theme.backgroundRoot }]}
        >
          <GradientButton onPress={submitAttendance}>
            Submit Attendance ({students.filter((s) => s.present).length}/
            {students.length})
          </GradientButton>
        </View>
      </ThemedView>
    );
  }

  return (
    <ScreenScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="h2">My Attendance</ThemedText>
          <View style={styles.statCard}>
            <View
              style={[styles.progressCircle, { borderColor: theme.success }]}
            >
              <ThemedText type="h1" style={{ color: theme.success }}>
                88%
              </ThemedText>
            </View>
            <ThemedText
              type="bodySmall"
              style={[styles.statLabel, { color: theme.textSecondary }]}
            >
              Overall Attendance
            </ThemedText>
          </View>
        </View>

        <ThemedText type="h2" style={styles.sectionTitle}>
          Subject-wise Breakdown
        </ThemedText>

        <SubjectAttendance
          subject="Data Structures"
          percentage={92}
          present={23}
          total={25}
        />
        <SubjectAttendance
          subject="Algorithms"
          percentage={85}
          present={17}
          total={20}
        />
        <SubjectAttendance
          subject="Database Systems"
          percentage={90}
          present={18}
          total={20}
        />
        <SubjectAttendance
          subject="Web Development"
          percentage={78}
          present={14}
          total={18}
        />
      </View>
    </ScreenScrollView>
  );
}

function SubjectAttendance({ subject, percentage, present, total }: any) {
  const { theme } = useTheme();
  const color =
    percentage >= 85
      ? theme.success
      : percentage >= 75
        ? theme.warning
        : theme.error;

  return (
    <View
      style={[
        styles.subjectCard,
        { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
      ]}
    >
      <View style={styles.subjectHeader}>
        <ThemedText type="body">{subject}</ThemedText>
        <ThemedText type="h2" style={{ color }}>
          {percentage}%
        </ThemedText>
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
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
      <ThemedText type="caption" style={{ color: theme.textSecondary }}>
        {present}/{total} classes attended
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  statCard: {
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  statLabel: {
    textAlign: "center",
  },
  sectionTitle: {
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  subjectCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: Spacing.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  list: {
    flex: 1,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  studentDetails: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
});
