import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import FeesScreen from "@/screens/FeesScreen";
import LiveAttendanceScreen from "@/screens/LiveAttendanceScreen";
import AITimetableScreen from "@/screens/AITimetableScreen";
import StudentRegistrationScreen from "@/screens/StudentRegistrationScreen";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Fees: undefined;
  LiveAttendance: undefined;
  AITimetable: undefined;
  StudentRegistration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundRoot,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      {user === null ? (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fees"
            component={FeesScreen}
            options={{ title: "Fee Management" }}
          />
          <Stack.Screen
            name="LiveAttendance"
            component={LiveAttendanceScreen}
            options={{ title: "Live Attendance" }}
          />
          <Stack.Screen
            name="AITimetable"
            component={AITimetableScreen}
            options={{ title: "AI Timetable Generator" }}
          />
          <Stack.Screen
            name="StudentRegistration"
            component={StudentRegistrationScreen}
            options={{ title: "Register Student" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
