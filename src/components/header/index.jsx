// Header.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({
  onMenuPress,
  onNotificationsPress,
  notificationCount = 1,
  userName = 'Prince',
  term = 'Term 2',
  academicYear = '2025/2026',
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [menuOpen, setMenuOpen] = useState(false);

  const showBadge = notificationCount > 0;
  const badgeText = notificationCount > 99 ? '99+' : String(notificationCount);

  const handleMenuPress = () => {
    setMenuOpen((prev) => !prev);
    onMenuPress?.(!menuOpen); // let the parent react to the new state
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleMenuPress}
        accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
        accessibilityState={{ expanded: menuOpen }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <AntDesign
          name={menuOpen ? 'menu-unfold' : 'menu-fold'}
          size={20}
          color={colors.fg}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Hello {userName} 👋
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {term} · {academicYear}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={onNotificationsPress}
        accessibilityLabel={
          showBadge
            ? `Notifications, ${notificationCount} unread`
            : 'Notifications'
        }
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="notifications-outline" size={20} color={colors.fg} />

        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {badgeText}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}