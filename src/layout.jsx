// Layout.jsx
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
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
  'Student-Full-Report', 'Student-Clubs', 'Student-Clubs-Detail', 'Member-List', 
  'Student-Ai-Tutor' , 'Student-Past-Papers' , 'Student-Past-Papers-Detail',
  'Student-Past-Papers-Attempt' , 'Student-Past-Papers-Review' , 'Student-Revision-Progress',
  'Student-Revision' , 'Student-Campus' , 'Team-Detail' , 'Fixtures'
];
const NO_HEADER_ROUTES = ['Student-Past-Papers', 'Student-Ai-Tutor' , 
  'Student-Past-Papers-Detail' , 'Student-Past-Papers-Attempt' , 
  'Student-Past-Papers-Review' , 'Student-Revision-Progress' , 'Team-Detail' , 'Fixtures'];

const MENU_TAB_ROUTES = {
  academic:   'Student-Dashboard',
  clubs:      'Student-Clubs',
  revision:   'Student-Revision',
  activities: 'Student-Campus',
};

const ROUTE_TO_MENU_TAB = {
  'Student-Dashboard':  'academic',
  'Student-Clubs':      'clubs',
  'Student-Revision':   'revision',
  'Student-Campus': 'activities',
};

const { width: SCREEN_W } = Dimensions.get('window');
const DRAWER_W = Math.min(SCREEN_W * 0.78, 320);

const DRAWER_MS = 260;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Layout({ children }) {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [menuOpen, setMenuOpen] = useState(false);
  const isNavigatingRef = useRef(false);

  const progress = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
    if (isNavigatingRef.current) return;
    setMenuOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: DRAWER_MS,
      easing: easeOutCubic,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const closeDrawer = useCallback(
    (onDone) => {
      Animated.timing(progress, {
        toValue: 0,
        duration: DRAWER_MS,
        easing: easeInOutCubic,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) return;
        setMenuOpen(false);
        if (onDone) onDone();
      });
    },
    [progress]
  );

  const toggleDrawer = (nextOpen) => (nextOpen ? openDrawer() : closeDrawer());

  const mainTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, DRAWER_W],
  });

  const drawerTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_W, 0],
  });

  const scrimOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.32],
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

  const activeMenuTab = ROUTE_TO_MENU_TAB[currentRouteName] ?? null;

  const handleNavigate = useCallback(
    (routeName) => {
      if (!routeName || routeName === currentRouteName) {
        if (menuOpen) closeDrawer();
        return;
      }

      if (menuOpen) {
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        closeDrawer(() => {
          requestIdleCallback(
            () => {
              navigation.navigate(routeName);
              isNavigatingRef.current = false;
            },
            { timeout: 500 }
          );
        });
      } else {
        navigation.navigate(routeName);
      }
    },
    [menuOpen, currentRouteName, closeDrawer, navigation]
  );

  const handleSignOut = useCallback(() => {
    closeDrawer(() => {
      requestIdleCallback(
        () => {
          // await signOut();
          // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
        { timeout: 500 }
      );
    });
  }, [closeDrawer]);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
        translucent={false}
      />

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

        <Animated.View
          pointerEvents={menuOpen ? 'auto' : 'none'}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: '#000', opacity: scrimOpacity },
          ]}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => closeDrawer()}
        />
      </Animated.View>

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
              const route = MENU_TAB_ROUTES[tabKey];
              if (route) {
                handleNavigate(route);
              } else {
                closeDrawer();
              }
            }}
            onNavigate={handleNavigate}
            onClose={() => closeDrawer()}
            onPressSignOut={handleSignOut}
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