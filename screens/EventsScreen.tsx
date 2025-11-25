import React, { useState } from "react";
import { StyleSheet, View, Pressable, FlatList, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/Badge";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "academic" | "sports" | "cultural" | "other";
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Annual Tech Fest 2024",
    description: "Join us for the biggest tech event of the year",
    date: "Dec 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    type: "academic",
  },
  {
    id: "2",
    title: "Sports Day",
    description: "Inter-departmental sports competition",
    date: "Dec 20, 2024",
    time: "8:00 AM",
    location: "Sports Ground",
    type: "sports",
  },
  {
    id: "3",
    title: "Cultural Night",
    description: "Celebrate diversity with music and dance",
    date: "Dec 22, 2024",
    time: "6:00 PM",
    location: "Open Air Theatre",
    type: "cultural",
  },
];

export default function EventsScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [events] = useState<Event[]>(MOCK_EVENTS);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return theme.primary;
      case "sports":
        return theme.success;
      case "cultural":
        return theme.accent;
      default:
        return theme.textSecondary;
    }
  };

  const handleEventPress = (event: Event) => {
    Alert.alert(
      event.title,
      `${event.description}\n\n📅 ${event.date}\n🕐 ${event.time}\n📍 ${event.location}`,
      [{ text: "Close" }],
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleEventPress(item)}
            style={({ pressed }) => [
              styles.eventCard,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
              },
              Shadows.small,
            ]}
          >
            <View
              style={[
                styles.eventIcon,
                { backgroundColor: getEventTypeColor(item.type) + "20" },
              ]}
            >
              <MaterialCommunityIcons
                name={
                  item.type === "academic"
                    ? "book-open-variant"
                    : item.type === "sports"
                      ? "trophy"
                      : "music"
                }
                size={24}
                color={getEventTypeColor(item.type)}
              />
            </View>

            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <ThemedText type="body" style={styles.eventTitle}>
                  {item.title}
                </ThemedText>
                <Badge
                  label={item.type}
                  variant={
                    item.type === "academic"
                      ? "primary"
                      : item.type === "sports"
                        ? "success"
                        : "info"
                  }
                />
              </View>

              <ThemedText
                type="bodySmall"
                style={[
                  styles.eventDescription,
                  { color: theme.textSecondary },
                ]}
                numberOfLines={2}
              >
                {item.description}
              </ThemedText>

              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={16}
                    color={theme.textSecondary}
                  />
                  <ThemedText
                    type="caption"
                    style={[styles.detailText, { color: theme.textSecondary }]}
                  >
                    {item.date}
                  </ThemedText>
                </View>
                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color={theme.textSecondary}
                  />
                  <ThemedText
                    type="caption"
                    style={[styles.detailText, { color: theme.textSecondary }]}
                  >
                    {item.time}
                  </ThemedText>
                </View>
                <View style={styles.eventDetail}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    color={theme.textSecondary}
                  />
                  <ThemedText
                    type="caption"
                    style={[styles.detailText, { color: theme.textSecondary }]}
                  >
                    {item.location}
                  </ThemedText>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.md,
  },
  eventCard: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: Spacing.xs,
  },
  eventTitle: {
    flex: 1,
    marginRight: Spacing.sm,
    fontWeight: "600",
  },
  eventDescription: {
    marginBottom: Spacing.sm,
  },
  eventDetails: {
    gap: Spacing.xs,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: 12,
  },
});
