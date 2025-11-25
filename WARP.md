# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Core workflows

This is an Expo React Native app. Use `npm` to install dependencies and run scripts.

### Install dependencies

- `npm install`

### Run the app

- Start Metro / development server: `npm run dev` (Replit-style env) or `npm start`
- Run on Android emulator/device: `npm run android`
- Run on iOS simulator/device (on macOS): `npm run ios`
- Run web build: `npm run web`

### Linting and formatting

- Lint the project with Expo/ESLint: `npm run lint`
- Check formatting with Prettier: `npm run check:format`
- Auto-format the codebase: `npm run format`

### Testing

There is no test runner configured in `package.json`. If you add one (e.g. Jest), also add:

- A script entry under `scripts` (e.g. `"test": "jest"`)
- Any additional commands here for running a single test file or test pattern

## Project architecture

### Entry points and shell

- `index.js` registers the root component with Expo via `registerRootComponent(App)`.
- `App.tsx` composes the top-level providers:
  - `ErrorBoundary` from `components/ErrorBoundary.tsx` wraps the whole app.
  - `SafeAreaProvider` from `react-native-safe-area-context`.
  - `GestureHandlerRootView` and `KeyboardProvider` for gesture handling and keyboard-aware UI.
  - `AuthProvider` from `contexts/AuthContext.tsx` for authentication state.
  - `NavigationContainer` from `@react-navigation/native` hosting `RootNavigator`.

### Navigation

Navigation is structured with React Navigation using a root stack and nested navigators:

- `navigation/RootNavigator.tsx`
  - Decides between the auth flow and the main app based on `useAuth().user` from `AuthContext`.
  - Defines a native stack (`RootStackParamList`) with:
    - `Auth`: entry to `AuthNavigator` (unauthenticated flow).
    - `Main`: entry to `MainTabNavigator` (authenticated tabbed experience).
    - Detail stacks: `Fees`, `LiveAttendance`, `AITimetable`, `StudentRegistration` screens.
  - Applies theme-driven header styles via `useTheme()`.

- `navigation/AuthNavigator.tsx`
  - Native stack for onboarding/auth screens:
    - `WelcomeScreen`
    - `LoginScreen`
    - `RegisterScreen`
  - Hides headers and uses `slide_from_right` animation.

- `navigation/MainTabNavigator.tsx`
  - Bottom tab navigator for the main app experience.
  - Screens:
    - `DashboardScreen`
    - `AttendanceScreen`
    - Optional `ManageScreen` (only for `admin`/`staff`).
    - `EventsScreen`
    - `ProfileScreen`
  - Uses `useAuth()` to compute `isStaffOrAdmin` and conditionally show the `Manage` tab.
  - Uses `useTheme()` to style tab bar and headers, with an iOS-only `BlurView` background.

### Theming and layout primitives

The app centralizes visual design in `constants/theme.ts` and custom hooks/components:

- `constants/theme.ts`
  - Exposes `Colors.light` and `Colors.dark` palettes with semantic tokens (primary, background*, accent, status colors, text, link, tab icon colors, borders, gradients).
  - Layout tokens: `Spacing` (including `tabBarHeight`, `headerHeight`, button sizes), `BorderRadius`, `Shadows`.
  - Typography styles in `Typography` (display, h1, h2, body, etc.).
  - `Fonts` platform map for iOS, web, and default/native fonts.

- `hooks/useTheme.ts`
  - Provides the `theme` object and `isDark` flag, derived from color scheme and `Colors`.
  - All UI components and screens should pull colors and typography from here rather than hardcoding values.

- Themed primitives in `components/`:
  - `ThemedView.tsx`
    - Wraps `View` and chooses a background color from `useTheme()`.
    - Accepts optional `lightColor` / `darkColor` overrides.
  - `ThemedText.tsx`
    - Wraps `Text` and applies `Typography` styles based on a `type` prop (`display`, `h1`, `body`, `caption`, `button`, `link`, etc.).
    - Chooses text color via `useTheme()` and the `type` (e.g. `link` uses `theme.link`).
  - Layout helpers like `ScreenScrollView`, `ScreenKeyboardAwareScrollView`, `ScreenFlatList`, `Spacer`, and UI elements (`Button`, `GradientButton`, `Card`, `MetricCard`, `FAB`, `TextInput`, `HeaderTitle`) share spacing, radius, and shadow tokens.

When adding new screens or components, prefer these primitives and theme tokens for consistency.

### Authentication and user role model

- `contexts/AuthContext.tsx`
  - Defines `UserRole` (`"admin" | "staff" | "student"`) and `User` shape (id, name, email, role).
  - Persists the `user` object to `AsyncStorage` under the key `"user"`.
  - API exposed via context:
    - `user: User | null`
    - `isLoading: boolean` (initial load from storage)
    - `login(email, password, role)` – creates a mock user (no backend) and saves it.
    - `register(name, email, password, role)` – same pattern as `login`, creating a user.
    - `logout()` – clears the `user` from storage.
  - On mount, `loadUser()` hydrates `user` from `AsyncStorage`.

- `useAuth()` hook
  - Throws if used outside `AuthProvider`.
  - Used by navigators and screens to gate flows and personalize UI.

Key flows that depend on roles:

- `RootNavigator` – chooses auth vs main navigation based on `user`.
- `MainTabNavigator` – exposes the `Manage` tab only for `admin` or `staff`.
- `DashboardScreen` – changes metrics and labels (e.g. total students vs student-focused cards) based on `user.role`.

### Example feature flows

#### Onboarding and login

- `WelcomeScreen.tsx`
  - Shows branding (logo from `assets/images/icon.png`) and app title/subtitle.
  - Uses `GradientButton` and `Button` to navigate to `Login` and `Register` screens via the `AuthNavigator` stack (`navigation/AuthNavigator.tsx`).

- `LoginScreen.tsx`
  - Controlled inputs using shared `TextInput` component for email/password.
  - Allows selecting role (`student`, `staff`, `admin`) via styled `Pressable` buttons.
  - On submit, calls `useAuth().login(email, password, role)` and relies on context to transition to the main app.
  - Uses `ScreenKeyboardAwareScrollView` and a `LinearGradient` background.

#### Dashboard and quick actions

- `DashboardScreen.tsx`
  - Wraps content in `ScreenScrollView`.
  - Uses `MetricCard` grid to show key stats; cards navigate to deeper screens (Manage, LiveAttendance, Fees, Events) using React Navigation.
  - Shows different metric sets for staff/admin vs students.
  - Renders role-gated floating `FAB` with multiple actions, each navigating to a target screen (Events, Attendance, Fees, AITimetable).

## Adding new functionality

When implementing new features, align with the existing patterns:

- New screens
  - Place under `screens/` and wire up via the appropriate navigator (`RootNavigator`, `MainTabNavigator`, or nested stacks).
  - Use `ThemedView`, `ThemedText`, and spacing/typography tokens for layout and styling.
  - Use `ScreenScrollView` or other `Screen*` wrappers for consistent paddings and safe-area handling.

- Role-aware features
  - Use `useAuth()` to read `user.role` and conditionally show UI or tabs.
  - If navigation access should be restricted, gate it at the navigator level (similar to the `Manage` tab and Root stack gating) rather than only inside a screen.

- Persistent state
  - For auth-like or global state, prefer a context in `contexts/` and back it with `AsyncStorage` where persistence is needed.

## Notes for Warp agents

- There is currently no dedicated README or AI-instructions file in this repo; use this `WARP.md` as the primary source of project context.
- When adding new tools (testing, CI, EAS, etc.), update `package.json` scripts and extend the **Core workflows** section accordingly.
