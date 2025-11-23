import React, { useState } from "react";
import { StyleSheet, Pressable, View, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Shadows } from "@/constants/theme";

interface FABProps {
  actions: Array<{
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    onPress: () => void;
  }>;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
  energyThreshold: 0.001,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FAB({ actions }: FABProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  const handlePress = () => {
    setIsOpen(!isOpen);
    rotation.value = withSpring(isOpen ? 0 : 45, springConfig);
  };

  return (
    <>
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.fab,
          {
            bottom: Spacing.tabBarHeight + Spacing.md,
            right: Spacing.md,
          },
          Shadows.fab,
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={theme.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <MaterialCommunityIcons name="plus" size={28} color={theme.buttonText} />
        </LinearGradient>
      </AnimatedPressable>

      <Modal visible={isOpen} transparent onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.actionMenu,
              {
                backgroundColor: theme.backgroundDefault,
                bottom: Spacing.tabBarHeight + Spacing.fabSize + Spacing.lg,
                right: Spacing.md,
              },
              Shadows.large,
            ]}
          >
            {actions.map((action, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.actionItem,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={() => {
                  action.onPress();
                  setIsOpen(false);
                }}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  size={24}
                  color={theme.primary}
                  style={styles.actionIcon}
                />
                <ThemedText type="body">{action.label}</ThemedText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: Spacing.fabSize,
    height: Spacing.fabSize,
    borderRadius: Spacing.fabSize / 2,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionMenu: {
    position: "absolute",
    borderRadius: 12,
    padding: Spacing.sm,
    minWidth: 200,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: 8,
  },
  actionIcon: {
    marginRight: Spacing.md,
  },
});
