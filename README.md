# Morfosi — Student Companion App

A React Native mobile app that gives students a single place to track their classes, assignments, grades, attendance, clubs, and academic records — themed, offline-friendly, and built around a clean editorial design language.

---

## Overview

**Morfosi** is a student companion app built with React Native (CLI). It covers the daily-to-term rhythm of student life — from "what's my next class?" to "what's my cumulative grade across three years?" — in a coherent, minimal interface.

### Core principles

- **One design language** — every screen uses the same monospace labels, 1px borders, ember accent (`#d4663a`), and flat card structure
- **Light + dark out of the box** — theme is derived from OS preference, with manual override
- **Role-agnostic components** — screens like `MemberList`, `TaskDetail`, and `MaterialDetail` accept data through params so the same component serves multiple contexts
- **Data-first layouts** — stats and summaries are always visible before action buttons; nothing is buried
- **Instant feedback** — optimistic UI, skeleton-free loading, immediate state transitions on join/leave/submit

---

## What's been built

### Authentication

- **Login** — email + password, "forgot password" link, Google/Apple social sign-in stubs
- **Sign Up** — email, password with strength hint, confirm password, social sign-up
- **Forgot Password** — 3-step flow: send email → 4-digit OTP (auto-advance, backspace navigation) → set new password
- **Theme-aware**, with `AUTO / DARK / LIGHT` toggle in the login screen (removed from later screens to keep them focused)

### Dashboard (Home)

- **Next class card** — subject, teacher, room, time-to-start, "View timetable" CTA
- **Academic snapshot** — 4 stat tiles: Attendance %, Average, Due tasks, New notifications
- **Today's schedule** — day/week toggle with past/current/upcoming status dots and a highlighted "live" period
- **Tasks due today** — compact widget capped at 3, with:
  - Overdue-first sorting
  - Live countdown
  - Unread badge
  - "See all" link to the full Tasks tab
  - 🎉 empty state when nothing is due
- **Announcements** — latest school-wide notices

### Classes / Timetable

- **Week grid** — 5-day × 7-period grid, subject + room, tap any block for details
- **Day agenda** — today's periods with ✅ past / ▶ live / ○ upcoming states
- **Month calendar** — density dots for classes, assignments, and events with a selected-day summary panel
- **Subject detail sheet** — teacher, room, period, and three actions:
  - **View Materials** → `Student-Materials` (list) → `Student-MaterialDetail` (single file)
  - **Past Grades** → `Student-Grades` (subject highlighted and hoisted to top)
  - **Add Reminder** (stub)

### Materials

- **Subject filter banner**, **search**, and **category chips** (Notes / Slides / Past Papers / Videos)
- **Material row** with file-type icon, size, format, last-updated, and download action
- **`MaterialDetail`** — hero icon, format label, primary action (Open / Play), download + share, file metadata, description, topic list, teacher's note, and a "back to all materials" round-trip

### Grades

- **Term selector** (Term 1 / 2 / 3)
- **Summary tiles** — average %, GPA, rank
- **Subject list** with grade pill, score, trend icon, and class average
- **Focus behaviour** — when entering from a class block, that subject is highlighted (accent left border), hoisted to the top, and marked with a "VIEWING FROM: BIOLOGY" banner
- **Grade detail modal** — assessment breakdown with horizontal progress bars, rank, class avg, and score-vs-class delta

### Full Academic Report

- **Cumulative summary** — all-years average, current average, rank, attendance
- **Average by year** bar chart (`react-native-gifted-charts`) — current year in accent, previous years muted
- **Best term callout** — highest average with a trophy icon
- **Year accordion** — expand any year to see:
  - Year-level stats (average / rank / attendance)
  - Term trend line chart (per-term averages)
  - Per-term blocks with subject grades and a mini line chart
- **Export** — download full report as PDF (stubbed)

### Tasks

- **Filter chips** — All / Due / Overdue / Submitted / Graded
- **Urgency grouping** — 🔴 Overdue → 🟠 Due today → 🟡 Due this week → 🟢 Submitted → ⚪ Graded
- **Task cards** — subject, teacher, due time, urgency badge, action footer, group indicator
- **Task Detail** — supports three states in one screen:
  - **Open** — instructions (300-char "Read more"), attachments with download, rubric preview, submission form (File / Photo / Text)
  - **Submitted** — timestamp, file, quote, resubmit (if deadline not passed)
  - **Graded** — grade pill, score, rubric breakdown bars, teacher feedback with reply
- **Upload lifecycle** — `idle → uploading (progress %) → failed (retry / choose another) → success` with live progress and file retry

### Attendance

- **Term summary tiles** — rate, absent, late, excused
- **Monthly calendar** — every day colour-coded: 🟢 present / 🔴 absent / 🟠 late / 🔵 excused / faded for no-record
- **Legend** below the calendar
- **Absence list** — newest first, with:
  - Status dot
  - Date
  - Colour-coded reason tag (MEDICAL / TRANSPORT / APPROVED / NO REASON)
  - Full reason text, or "No reason recorded — contact the school office" in italic
- **Day detail modal** — full status, reason, and a note about how to request a correction

### Clubs & Societies

Four swipeable tabs via `react-native-pager-view`:

- **My Clubs** — member and pending clubs, with roles, meeting times, next events, and cancel-request for pending
  - Empty state with "🎭 No clubs joined yet" and a "Browse all clubs" CTA
- **All Clubs** — category filter chips, cards with one of four states:
  - **Join** (open)
  - **Request** (approval required)
  - **Joined ✓** (already a member)
  - **🔒 Full** (disabled)
- **Events** — upcoming events across all clubs
- **My Activity** — per-term summary + per-club breakdown of attendance, events, competitions, and achievements, with a **certificate** action per club

**Join Request Sheet** — a bottom sheet that adapts:
- **Open club** — simple confirmation with meeting time
- **Approval club** — reason textarea (500 char), agreement checkbox, patron preview, "Send Request"

**Club Detail** — full state-dependent view:
- **Member** — role pill, description, events with mandatory badges, leadership, member preview (3 rows + "View all"), announcements, Leave Club
- **Non-member** — description, single next event, leadership, Join / Request button
- **Pending** — pending pill, "Your request was sent to…", Cancel Request
- **Full** — 🔒 card with Join Waitlist

### Members (Reusable)

- **`MemberList` screen** — accepts `title`, `members[]`, and `isAdmin`:
  - Search by name / role / class
  - Count + filtered indicator
  - Role-tinted pills for leaders (Chair / Secretary / Treasurer / Patron)
  - `isAdmin: true` → download icon in header + tappable member rows
  - `isAdmin: false` → read-only list
- **`MemberDetailSheet`** — bottom sheet that auto-detects student vs. staff:
  - **Student** — class, adm no, dorm, house
  - **Teacher** — role, subject, department, joined date
  - Tap-to-call / tap-to-email
  - Admin sees a `Send Message` button

### Profile

- **Hero** — avatar with camera badge, name, form + admission no, status · term · year
- **Academic snapshot** — attendance, average, subjects, rank (ATT and RANK navigable to Attendance / Full Report)
- **My Details** — email, phone, DOB, location, and two **navigable** rows:
  - **Class** → `Student-Classes-Detail` (class stream, teacher, subjects, announcements)
  - **Dorm** → `Student-DormDetail` (dorm info, house master, roommates)
  - Request correction CTA for admin-managed fields
- **Guardians** — parent/guardian cards with initials, relation, phone
- **Account** — 9 rows including:
  - **Clubs & Societies** (entry point to the Clubs screen)
  - Change password, Notifications, Language, Theme
  - Download my data, Help & Support, Privacy policy, About

### Edit Profile

- Editable: first name, last name, email (with verify), phone
- **Locked** fields: DOB (lock icon + request-change link), admission no, class stream, parents, dorm — with an explicit "Locked fields" note pointing to the school office
- **Discard changes** confirmation on cancel
- **Disabled save** when nothing changed or fields invalid

### Preferences & Settings

- **Notifications** — per-channel (Push / Email / SMS) toggles with sensible defaults, multi-select reminder timings (24h / 3h / 1h / at due time), and quiet-hours range
- **Language** — 5 languages including RTL (Arabic), date/time/first-day format selectors, preferred name (full vs. first) in announcements
- **Theme** — Light / Dark / System swatch picker, 5-step text size slider with live preview, accessibility toggles:
  - Reduce motion (respects OS setting)
  - High contrast
  - Bold text
  - Persists mode via `AsyncStorage` and hydrates on mount
- **Dynamic app icon** — light and dark icon variants registered as Android `activity-alias` entries; switches automatically via `useColorScheme`

### Help & Support / Privacy / About

- **Help** — 4 quick FAQs, contact channels (chat / email / phone), report a bug (with stub diagnostic context), system block with app version, last-synced time, and clear-cache with confirmation
- **Privacy** — accordion sections (What we collect / How we use / Who we share / Retention / Your rights / Contact), download PDF, effective + last-updated dates, "What changed?" link, "Request my data" and "Request correction" CTAs
- **About** — logo, school name, app name, version (long-press to copy), released date, connect links, legal links, acknowledgements, check-for-updates

### Download My Data

- Full request/in-progress/ready lifecycle:
  - **Request** — includes list, format picker (PDF / JSON / Both), delivery email, 7-day expiry, recent requests
  - **In progress** — ⏳ "Preparing your data", started-N-minutes-ago, Cancel Request
  - **Ready** — download row with expiry date
  - **Expired** — muted status

---

## Navigation architecture

```
AppWrapper
├─ ErrorBoundary
├─ ThemeProvider
└─ LoginContext.Provider
   └─ NavigationContainer
      └─ Stack.Navigator
         ├─ Auth flow (Login, SignUp, Forgot Password × 3)
         ├─ Dashboard, Classes, Materials, Grades, Attendance, Tasks
         ├─ Full Report, Profile, Edit Profile, Notifications
         ├─ Clubs, Club Detail, Club Certificate
         ├─ Member List, Class Detail, Dorm Detail
         └─ Settings (Language, Theme, Help, Privacy, About, Download Data)
```

### Layout shell

Every screen wraps in `<Layout>` which provides:

- **Top safe-area spacer** — painted with `colors.bg` so the status bar blends into the page
- **Header** — greets the user, term/year label, menu button (opens drawer), notifications with count badge
- **Bottom nav** — Home / Classes / Tasks / Profile (tab roots only)
- **Left drawer** — profile card, view switcher (Academic / Clubs / Revision / Activities), quick links (Notifications, Edit Profile, etc.), Sign Out
- **Smart hiding** — `NO_NAV_ROUTES` and `NO_HEADER_ROUTES` arrays tell the shell when to hide chrome (e.g., on full-screen detail views)
- **Graceful drawer animation** — close-then-navigate sequenced with `Animated` completion callbacks + `requestIdleCallback` (not `setTimeout`), guarded by an `isNavigatingRef` to prevent double-taps

### Active tab derivation

The drawer's active tab is **derived** from the current route via a reverse map (`ROUTE_TO_MENU_TAB`), so opening the drawer from any screen always highlights the correct section — no stale state, no prop drilling.

---

## Design system

### Typography

- **Monospace** (`fontFamily: 'monospace'`) for labels, meta lines, section headers, numeric values, and buttons
- **System sans** for body text and titles
- Consistent `fontWeight: '900'` for emphasis, `letterSpacing` scaled with size

### Color tokens

| Token | Dark | Light |
|---|---|---|
| `bg` | `#0a0a0a` | `#ffffff` |
| `surface` | `#0f0f0f` | `#f7f7f7` |
| `surfaceHi` | `#111111` | `#efefef` |
| `fg` | `#f0f0f0` | `#0a0a0a` |
| `fgMuted` | `#888888` | `#555555` |
| `fgFaint` | `#555555` | `#888888` |
| `border` | `#2a2a2a` | `#e2e2e2` |
| `accent` | `#d4663a` (ember) | `#b84f28` |
| `buttonBg` | `#f0f0f0` | `#0a0a0a` |
| `buttonFg` | `#0a0a0a` | `#f0f0f0` |

All screens use `makeStyles(colors)` from the theme context — one source of truth, no hardcoded colors in JSX.

### Component patterns

- **Section headers** — `fontFamily: monospace`, `letterSpacing: 2`, `color: accent`, `fontWeight: 900`
- **Cards** — 1px `border` + `surface` background, no shadows
- **Buttons** — filled `buttonBg`/`buttonFg` for primary, outlined `border`/`surface` for secondary, red border for destructive
- **Modal sheets** — bottom-anchored, dimmed backdrop, `borderTopWidth: 1`, drag handle bar
- **Status pills** — bordered, monospace, colour-tinted (`accent` for member, `fgMuted` for pending, red for mandatory, etc.)

### Status colour semantics

- 🟢 **Green** (`#4caf7d`) — success, submitted, attendance-present
- 🟠 **Amber** (`#e0a93a`) — warning, due-soon, transport-delays
- 🔴 **Red** (`#e25b5b`) — danger, overdue, absent, leave-club
- 🔵 **Blue** (`#4d7cff`) — info, secretary, excused
- ⚪ **Muted** — graded, neutral, no-reason
- 🎨 **Accent (ember)** — brand action, member, current

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.88 |
| Navigation | `@react-navigation/stack` |
| Pager | `react-native-pager-view` |
| Charts | `react-native-gifted-charts`, `react-native-svg`, `react-native-linear-gradient` |
| Icons | `react-native-vector-icons` (Ionicons, MaterialCommunityIcons, Feather, AntDesign) |
| Safe area | `react-native-safe-area-context` |
| Storage | `@react-native-async-storage/async-storage` |
| App icon | `react-native-change-icon` |
| Native config | Android `activity-alias`, adaptive icons |

---

## Current state

### Fully implemented (with sample data)

- All authentication screens
- Dashboard, Classes, Materials, Grades, Attendance, Tasks
- Full academic report with charts
- Clubs (4 tabs + join flow + activity + certificate)
- Club detail, member list, member detail sheet
- Class detail, dorm detail
- Profile, edit profile, full data report
- Notifications, language, theme preferences
- Help, privacy, about, download my data
- Settings drawer, bottom nav, dynamic app icon

### Stubbed for wiring

- Real API endpoints (currently `CLUBS`, `EVENTS`, `RECENT`, etc. are local constants)
- File upload (upload lifecycle works, driver is simulated)
- Certificate PDF generation (alert stub — pattern ready for `expo-print`)
- Download data CSV/PDF generation
- Push notification registration
- Chat / messaging destinations
- `Search` screen (header icons navigate to `'Search'` which isn't registered yet)
- `Student-Revision` and `Student-Activities` (menu tabs exist but screens not yet built)

---

## File structure

```
src/
├── pages/
│   ├── login/
│   ├── signup/
│   ├── forgot-password/   (send-email, enter-otp, change-password)
│   ├── students/
│   │   ├── dashboard/
│   │   ├── classes/       (index, class-detail, css, subject-detail)
│   │   ├── materials/     (index, detail)
│   │   ├── grades/        (index, full-report)
│   │   ├── attendance/
│   │   ├── tasks/         (index, task-detail)
│   │   ├── clubs/         (index, components/, views/, detail/, activity/)
│   │   ├── members/       (index, detail/)
│   │   ├── profile/       (index, edit/, dorm-detail, class-detail)
│   │   ├── notifications/
│   │   └── downloads/
│   ├── language/
│   ├── theme/
│   ├── help/
│   ├── privacy/
│   └── about/
├── theme/
│   ├── tokens.js
│   └── themeContext.jsx
├── hooks/
│   └── use-dynamic-icon.js
├── components/
│   ├── header/
│   │   └── menu/          (MenuDropdown)
│   ├── navigation/        (BottomNav)
│   ├── member-detail/     (MemberDetailSheet)
│   └── join-request/      (JoinRequestSheet)
├── layout.jsx             (shell — drawer, header, bottom nav)
├── loginContext.jsx
├── errorBoundary.jsx
└── app.jsx
```

---

## What makes it feel cohesive

1. **One `makeStyles(colors)` per file** — every screen has its own `css.js`, no global stylesheet, no cascade conflicts
2. **Monospace + ember accent throughout** — the same visual signature across 30+ screens
3. **State-machine screens** — `TaskDetail`, `ClubDetail`, `JoinRequestSheet` all handle multiple states in one component instead of fragmenting into separate screens
4. **Graceful navigation** — drawer closes, waits for the animation callback, then navigates within an idle callback — smooth and predictable
5. **Derived state** — active tab, filtered lists, computed percentages, dirty form checks — all derived from source data rather than duplicated
6. **Defensive `build*` helpers** — `buildTask`, `buildMaterial`, `buildClub` merge route params with `BASE_*` defaults so partial data never crashes a detail screen
7. **Reusable sheets** — `MemberDetailSheet`, `JoinRequestSheet`, `SubjectDetail` — all consumed in multiple contexts

---

## Future work

- Wire real backend (swap sample constants for API calls)
- Build `Search`, `Student-Revision`, `Student-Activities`
- Add exam timetable and results
- Add in-app chat between students, teachers, and patrons
- Add push notification deep-linking
- Add offline-first sync layer (`AsyncStorage` + background fetch)
- Add exam countdown widget on dashboard
- Add calendar export for events
- Add PDF certificate generator with real signature images
- Add teacher-facing app (same design system, different navigation tree)
