import React, { useState, useRef } from 'react';
import { View, StatusBar, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from './components/header/index.jsx';
import Navigation from './components/navigation/index.jsx';
import MenuDropdown from './components/header/menu/index.jsx';
import { useTheme } from './theme/themeContext.jsx';

const NO_NAV_ROUTES = [
  'Student-Materials', 'Student-Grades', 'Student-Tasks-Detail',
  'Student-Profile-Edit', 'Student-Notifications', 'Language', 'Theme',
  'Help & Support', 'Privacy Policy', 'About', 'Student-Materials-Detail',
  'Student-Attendance', 'Download my data', 'Student-Classes-Detail',
  'Student-Full-Report',
];
const NO_HEADER_ROUTES = ['ChatDetail', 'NewChat'];

const { width: SCREEN_W } = Dimensions.get('window');
const DRAWER_W = Math.min(SCREEN_W * 0.78, 320);

/* Easing that feels "iOS-like": fast start, soft settle */
const EASE = { duration: 280 };

export default function Layout({ children, navigation }) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('academic');

  const progress = useRef(new Animated.Value(0)).current; // 0 closed → 1 open

  const openDrawer = () => {
    setMenuOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
      useNativeDriver: true,
      ...EASE,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(progress, {
      toValue: 0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      useNativeDriver: true,
      ...EASE,
    }).start(({ finished }) => {
      if (finished) setMenuOpen(false);
    });
  };

  const toggleDrawer = (nextOpen) => (nextOpen ? openDrawer() : closeDrawer());

  /* Main column: shifts RIGHT so the left drawer has room. No width animation. */
  const mainTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DRAWER_W],
  });

  /* Drawer: slides in from off-screen left */
  const drawerTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_W, 0],
  });

  const scrimOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.28],
  });

  const currentRouteName = useNavigationState((state) => {
    if (!state) return null;
    let route = state.routes[state.index];
    while (route.state) {
      route = route.state.routes[route.state.index];
    }
    return route.name;
  });

  const shouldHideNavigation = NO_NAV_ROUTES.includes(currentRouteName);
  const shouldHideHeader = NO_HEADER_ROUTES.includes(currentRouteName);

  const handleNavigate = (routeName) => {
    closeDrawer();
    // wait for the slide-out so the push doesn't feel stacked
    setTimeout(() => {
      navigation?.navigate(routeName);
    }, 220);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
        translucent={false}
      />

      {/* ===== MAIN COLUMN (slides right) ===== */}
      <Animated.View
        style={[styles.mainColumn, { transform: [{ translateX: mainTranslateX }] }]}
      >
        <View style={{ height: insets.top, backgroundColor: colors.bg }} />

        {!shouldHideHeader && (
          <Header menuOpen={menuOpen} onMenuPress={toggleDrawer} />
        )}

        <View
          style={[
            styles.contentWrapper,
            !shouldHideNavigation && styles.contentWithNav,
          ]}
        >
          {children}
        </View>

        {!shouldHideNavigation && (
          <View style={styles.navWrap}>
            <Navigation />
          </View>
        )}

        {shouldHideNavigation && (
          <View style={{ height: insets.bottom, backgroundColor: colors.bg }} />
        )}

        {/* Scrim over the shifted column */}
        <Animated.View
          pointerEvents={menuOpen ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: '#000', opacity: scrimOpacity },
          ]}
          onStartShouldSetResponder={() => true}
          onResponderRelease={closeDrawer}
        />
      </Animated.View>

      {/* ===== DRAWER (left) ===== */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.drawer,
            {
              width: DRAWER_W,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              backgroundColor: colors.surface,
              borderRightColor: colors.border,
              transform: [{ translateX: drawerTranslateX }],
            },
          ]}
        >
          <MenuDropdown
            visible={menuOpen}
            activeTab={activeMenuTab}
            user={{
              name: 'Prince',
              role: 'Student',
              term: 'Term 2',
              academicYear: '2025/2026',
              avatar: null,
            }}
            onSelectTab={(tabKey) => {
              setActiveMenuTab(tabKey);
              closeDrawer();
            }}
            onNavigate={handleNavigate}
            onClose={closeDrawer}
            onPressSignOut={() => {
              closeDrawer();
              // navigation?.reset({ index: 0, routes: [{ name: 'Login' }] });
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  mainColumn: { flex: 1, overflow: 'hidden' },
  contentWrapper: { flex: 1 },
  contentWithNav: { paddingBottom: 70 },
  navWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 12,
  },
});