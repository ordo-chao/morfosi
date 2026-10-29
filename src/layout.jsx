import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from './components/header/index.jsx';
import Navigation from './components/navigation/index.jsx';
import { useTheme } from './theme/themeContext.jsx';

const NO_NAV_ROUTES = ['Student-Materials' , 'Student-Grades' , 
                       'Student-Tasks-Detail' , 'Student-Profile-Edit',
                        'Student-Notifications' , 'Language' , 'Theme',
                        'Help & Support' , 'Privacy Policy' , 'About' , 
                        'Student-Materials-Detail' , 'Student-Attendance',
                        'Download my data'
                      ];
const NO_HEADER_ROUTES = ['ChatDetail', 'NewChat'];

export default function Layout({ children }) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

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

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bg}
        translucent={false}
      />

      <View style={{ height: insets.top, backgroundColor: colors.bg }} />

      {!shouldHideHeader && <Header />}

      <View
        style={[
          styles.contentWrapper,
          !shouldHideNavigation && styles.contentWithNav,
        ]}
      >
        {children}
      </View>

      {!shouldHideNavigation && (
        <View
          style={[
            styles.navigationOverlay,
            {
              paddingBottom: insets.bottom,
              backgroundColor: colors.bg,
              borderTopColor: colors.border,
            },
          ]}
        >
          <Navigation />
        </View>
      )}

      {shouldHideNavigation && (
        <View style={{ height: insets.bottom, backgroundColor: colors.bg }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  contentWithNav: {
    paddingBottom: 70, // only when nav is visible
  },
  navigationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopWidth: 1,
  },
});