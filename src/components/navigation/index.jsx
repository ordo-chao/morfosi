// BottomNav.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import { LoginContext } from '../../../loginContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

/* =========================================================
 * ROLE-BASED TAB SETS
 * Route names MUST match the names used in Stack.Screen.
 * ======================================================= */

export const STUDENT_TABS = [
  { key: 'Student-Dashboard', label: 'HOME',    icon: 'home-outline',     activeIcon: 'home',     lib: 'ion' },
  { key: 'Student-Classes',   label: 'CLASSES', icon: 'book-outline',     activeIcon: 'book',     lib: 'ion' },
  { key: 'Student-Tasks',     label: 'TASKS',   icon: 'checkbox-outline', activeIcon: 'checkbox', lib: 'ion' },
  { key: 'Student-Profile',   label: 'PROFILE', icon: 'person-outline',   activeIcon: 'person',   lib: 'ion' },
];

export const TEACHER_TABS = [
  { key: 'Teacher-Dashboard', label: 'HOME',    icon: 'home-outline',     activeIcon: 'home',     lib: 'ion' },
  { key: 'Teacher-Classes',   label: 'CLASSES', icon: 'book-outline',     activeIcon: 'book',     lib: 'ion' },
  { key: 'Teacher-Tasks',     label: 'TASKS',   icon: 'checkbox-outline', activeIcon: 'checkbox', lib: 'ion' },
  { key: 'Teacher-Profile',   label: 'PROFILE', icon: 'person-outline',   activeIcon: 'person',   lib: 'ion' },
];

export const STAFF_TABS = [
  { key: 'Staff-Dashboard',   label: 'HOME',    icon: 'home-outline',     activeIcon: 'home',     lib: 'ion' },
  { key: 'Staff-Students',    label: 'STUDENTS',icon: 'people-outline',   activeIcon: 'people',   lib: 'ion' },
  { key: 'Staff-Reports',     label: 'REPORTS', icon: 'bar-chart-outline',activeIcon: 'bar-chart',lib: 'ion' },
  { key: 'Staff-Profile',     label: 'PROFILE', icon: 'person-outline',   activeIcon: 'person',   lib: 'ion' },
];

/* Map role → tab set */
const TABS_BY_ROLE = {
  student: STUDENT_TABS,
  teacher: TEACHER_TABS,
  staff:   STAFF_TABS,
};

/* ---------------------------------------------------------
 * DEV OVERRIDE
 * Set to 'student' | 'teacher' | 'staff' | null.
 * When non-null, it wins over the logged-in role.
 * ------------------------------------------------------- */
const DEV_ROLE_OVERRIDE = 'teacher'; // ← flip to null for real role

/* =========================================================
 * Helper: choose tabs
 * ======================================================= */

function resolveTabs(role, explicitTabs) {
  if (explicitTabs) return explicitTabs;
  if (DEV_ROLE_OVERRIDE) return TABS_BY_ROLE[DEV_ROLE_OVERRIDE] ?? STUDENT_TABS;
  return TABS_BY_ROLE[role] ?? STUDENT_TABS;
}

/* =========================================================
 * Internals
 * ======================================================= */

function TabIcon({ tab, isActive, color, size }) {
  const name = isActive ? tab.activeIcon : tab.icon;
  if (tab.lib === 'material') {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
  if (tab.lib === 'feather') {
    return <Feather name={name} size={size} color={color} />;
  }
  return <Ionicons name={name} size={size} color={color} />;
}

/* Resolve the deepest focused route name in the stack. */
function useCurrentRouteName() {
  return useNavigationState((state) => {
    if (!state) return null;
    let route = state.routes[state.index];
    while (route.state) {
      route = route.state.routes[route.state.index];
    }
    return route.name;
  });
}

/* =========================================================
 * Component
 * ======================================================= */

export default function BottomNav({ tabs }) {
  const navigation = useNavigation();
  const currentRouteName = useCurrentRouteName();
  const { role } = React.useContext(LoginContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const resolvedTabs = resolveTabs(role, tabs);

  const handlePress = (tabKey) => {
    if (tabKey === currentRouteName) return; // already here
    navigation.navigate(tabKey);
  };

  return (
    <View style={styles.container}>
      {resolvedTabs.map((tab) => {
        const isActive = tab.key === currentRouteName;
        const tint = isActive ? colors.accent : colors.fgMuted;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => handlePress(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <View style={styles.iconWrap}>
              <TabIcon tab={tab} isActive={isActive} color={tint} size={22} />
              {isActive && <View style={styles.activeDot} />}
            </View>
            <Text
              style={[styles.label, isActive && styles.labelActive]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}