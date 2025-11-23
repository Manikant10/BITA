import React, { useState } from "react";
import { StyleSheet, View, Pressable, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface FeeRecord {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
}

const MOCK_FEES: FeeRecord[] = [
  {
    id: "1",
    type: "Tuition Fee - Semester 1",
    amount: 5000,
    dueDate: "Jan 15, 2024",
    status: "paid",
    paidDate: "Jan 10, 2024",
  },
  {
    id: "2",
    type: "Lab Fee",
    amount: 500,
    dueDate: "Dec 30, 2024",
    status: "pending",
  },
  {
    id: "3",
    type: "Library Fee",
    amount: 200,
    dueDate: "Dec 25, 2024",
    status: "pending",
  },
];

export default function FeesScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [fees] = useState<FeeRecord[]>(MOCK_FEES);
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");

  const filteredFees = fees.filter((fee) => {
    if (filter === "all") return true;
    return fee.status === filter;
  });

  const totalPending = fees
    .filter((f) => f.status === "pending")
    .reduce((sum, f) => sum + f.amount, 0);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.summaryCard,
            { backgroundColor: theme.backgroundDefault, borderColor: theme.border },
            Shadows.small,
          ]}
        >
          <ThemedText type="bodySmall" style={{ color: theme.textSecondary }}>
            Total Pending
          </ThemedText>
          <ThemedText type="display" style={{ color: theme.warning }}>
            ${totalPending}
          </ThemedText>
        </View>

        <View style={styles.filterContainer}>
          <FilterButton
            label="All"
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <FilterButton
            label="Paid"
            active={filter === "paid"}
            onPress={() => setFilter("paid")}
          />
          <FilterButton
            label="Pending"
            active={filter === "pending"}
            onPress={() => setFilter("pending")}
          />
        </View>
      </View>

      <FlatList
        data={filteredFees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.feeCard,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
              },
              Shadows.small,
            ]}
          >
            <View style={styles.feeHeader}>
              <View style={styles.feeIcon}>
                <MaterialCommunityIcons
                  name="cash"
                  size={24}
                  color={
                    item.status === "paid"
                      ? theme.success
                      : item.status === "pending"
                        ? theme.warning
                        : theme.error
                  }
                />
              </View>
              <View style={styles.feeInfo}>
                <ThemedText type="body" style={styles.feeType}>
                  {item.type}
                </ThemedText>
                <View style={styles.feeDetails}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={14}
                    color={theme.textSecondary}
                  />
                  <ThemedText type="caption" style={{ color: theme.textSecondary }}>
                    Due: {item.dueDate}
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={styles.feeFooter}>
              <ThemedText type="h2">${item.amount}</ThemedText>
              <Badge label={item.status.toUpperCase()} variant={getStatusBadgeVariant(item.status) as any} />
            </View>

            {item.paidDate && (
              <ThemedText type="caption" style={[styles.paidDate, { color: theme.success }]}>
                Paid on {item.paidDate}
              </ThemedText>
            )}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

function FilterButton({ label, active, onPress }: any) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterButton,
        {
          backgroundColor: active ? theme.primary : theme.backgroundSecondary,
          borderColor: active ? theme.primary : theme.border,
        },
      ]}
    >
      <ThemedText
        type="bodySmall"
        style={{ color: active ? theme.buttonText : theme.textSecondary }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.md,
  },
  summaryCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  filterButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    alignItems: "center",
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: 0,
  },
  feeCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  feeHeader: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  feeIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  feeInfo: {
    flex: 1,
  },
  feeType: {
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  feeDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  feeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paidDate: {
    marginTop: Spacing.sm,
    fontSize: 12,
  },
});
