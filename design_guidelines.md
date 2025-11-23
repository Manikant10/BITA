# BITA Smart Campus Assistant - Design Guidelines

## Platform & Core Standards
- **Platform**: React Native (Expo) for Android
- **Design**: Material Design 3, dark mode only, animated gradients
- **Auth**: Multi-role (Admin/Staff/Student) with email/password + Google SSO
- **Safe Areas**: Top: `headerHeight + 16px`, Bottom: `tabBarHeight + 24px`

## Color System
**Primary**: `#6C63FF` (Electric Violet), Dark: `#4A42D6`, Light: `#8F87FF`  
**Backgrounds**: `#0A0E27` (base), `#151B3D` (surface), `#1E2749` (variant)  
**Accents**: Cyan `#00F5FF`, Success `#00E676`, Warning `#FFD740`, Error `#FF5252`  
**Text**: White `#FFFFFF`, Secondary `#A8B2D1`, Disabled `#4A5A7F`  
**Gradients**: Primary (`#6C63FF` → `#4A42D6`), Accent (`#00F5FF` → `#6C63FF`)

## Typography (Roboto)
- **Display**: Bold 32px | **H1**: Medium 24px | **H2**: Medium 20px
- **Body**: Regular 16px | **Body Small**: Regular 14px | **Caption**: Regular 12px
- **Buttons**: Medium 16px (uppercase for primary)

**Spacing**: xs:4px, sm:8px, md:16px, lg:24px, xl:32px, xxl:48px

## Authentication Screens

**Welcome**: Logo with gradient glow, "Login"/"Register" buttons with ripple

**Login**: Email/password, role selector (segmented control), "Remember me", Google SSO, "Forgot Password?" link

**Registration**: 3-step form (Basic Info → Role/ID → Profile), progress indicator, header cancel/save

**Profile**: Role-based avatar (mortarboard/briefcase/shield), name, email, role badge, logout with confirmation. Account deletion: Settings > Account > Delete Account (double confirm)

## Navigation

**Bottom Tabs**:
- **Admin/Staff** (5): Dashboard, Attendance, Manage, Events, Profile
- **Student** (4): Home, Attendance, Events, Profile

**FAB** (Admin/Staff only): 56px circle, primary gradient, positioned `tabBarHeight + 16px` from bottom. Radial menu: Create Event, Mark Attendance, Add Fee, Generate Timetable

## Key Screens

### 1. Dashboard (Admin/Staff)
- Welcome card, 2x2 metric grid (Total Students, Attendance Rate, Pending Fees, Upcoming Events)
- Horizontal quick actions scroll, recent activity feed
- Header: Transparent, notification bell (right)

### 2. Dashboard (Student)
- Today's timetable, attendance summary (circular progress), fee status, events carousel
- Header: "Hi, [Name]", notification bell

### 3. Attendance (Staff)
- Class/subject dropdown, date picker (default: today)
- Searchable student list with checkboxes
- Floating submit button (72px bottom spacing for tab bar + button)
- Filter/search icons in header

### 4. Attendance (Student)
- Circular chart (overall %), subject breakdown (expandable), color-coded calendar, date range filter

### 5. Fee Manager (Staff/Admin)
- TabView: Pending | Paid | All
- Searchable list, status badges (red/green), detail modal on tap

### 6. Fee Status (Student)
- Fee structure card, payment timeline, pending dues with alert, download receipt buttons

### 7. Events
- Calendar (month/week toggle), event list below
- Detail modal: title, description, date/time, location, RSVP
- Create form (staff/admin): same fields + image upload
- Add icon in header (staff/admin only)

### 8. AI Timetable (Admin)
- Form: classes/sections, subjects/teachers, constraints, room availability
- Loading animation during processing
- Result: Drag-to-edit grid timetable

### 9. Live Attendance (Admin)
- Auto-refreshing class grid, color-coded: Green (complete), Yellow (in-progress), Red (not started)
- Tap for student details, refresh icon in header

### 10. Student Registration (Admin)
- Modal with 3-step form (enrollment, personal, documents)
- Progress dots, validation, header cancel/save
- Safe area: Top 16px, Bottom `insets.bottom + 24px` (no tab bar)

## Components

**Buttons**:
- Primary: 48px height, 16px radius, gradient fill, white text, ripple, 200ms scale (0.95)
- Secondary: Outlined, 1px primary border, transparent background
- FAB: 56px circle, shadow (offset: {0, 4}, opacity: 0.3, radius: 8)

**Cards**: Surface bg, 12px radius, 16px padding, 1px border (surface variant or gradient), shadow (offset: {0, 2}, opacity: 0.1, radius: 4)

**Inputs**: Floating labels, 56px height, 2px underline (accent when focused, red on error with text below, green on success with checkmark)

**Lists**: 72px (with avatar) or 56px (icon only), 1px surface variant divider, ripple on press, swipe-delete (admin)

**Tab Bar**: 56px height, surface bg with gradient overlay, active (accent + filled icon), inactive (secondary text + outline), 3px accent underline

**Badges**: Notification (20px circle, error bg, white text), Status (24px pill, role colors: admin primary, staff accent, student success)

## Animations
- Transitions: 300ms ease-in-out slide
- Card entry: 200ms fade + scale from 0.9
- Loading: Shimmer sweep, logo rotation on pull-to-refresh
- Counters: Animated count-up (dashboard metrics)
- Success: Checkmark with expanding circle

## Accessibility
- Touch targets: Minimum 48x48px
- Text contrast: 4.5:1 minimum
- Accessible labels on all interactive elements
- TalkBack support, clear form validation, loading state announcements

## Icons & Assets
- **Icons**: @expo/vector-icons (MaterialCommunityIcons), 24px standard, 20px small, 32px large. No emojis
- **Logo**: Futuristic shield with circuit pattern, gradient fill
- **Avatars**: Geometric gradient style (Student: mortarboard/book/backpack, Staff: briefcase/id-card/presentation, Admin: shield/key/gear)
- **Empty States**: Minimalist gradient line art (no events, no records, no fees)
- **Splash**: Animated logo with pulsing gradient glow

## Critical Rules
- Dark mode only, Material 3 patterns
- All gradients use defined palette
- Role-based feature visibility
- Double confirmation for destructive actions (logout, delete account)
- Form validation with inline errors
- Consistent safe area insets (account for header + tab bar)
- FAB always above tab bar with proper spacing