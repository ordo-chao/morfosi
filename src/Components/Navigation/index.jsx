// BottomNav.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

/* Route names below MUST match the names used in Stack.Screen. */
const DEFAULT_TABS = [
  { key: 'Student-Dashboard', label: 'HOME',    icon: 'home-outline',     activeIcon: 'home',     lib: 'ion' },
  { key: 'Student-Classes',   label: 'CLASSES', icon: 'book-outline',     activeIcon: 'book',     lib: 'ion' },
  { key: 'Student-Tasks',     label: 'TASKS',   icon: 'checkbox-outline', activeIcon: 'checkbox', lib: 'ion' },
  { key: 'Student-Profile',   label: 'PROFILE', icon: 'person-outline',   activeIcon: 'person',   lib: 'ion' },
];

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

export default function BottomNav({ tabs = DEFAULT_TABS }) {
  const navigation = useNavigation();
  const currentRouteName = useCurrentRouteName();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handlePress = (tabKey) => {
    if (tabKey === currentRouteName) return; // already here
    navigation.navigate(tabKey);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
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