// MenuDropdown.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MENU_TABS = [
  { key: 'academic',   label: 'Academic',          sub: 'Current Term',            icon: 'school-outline',      lib: 'ion' },
  { key: 'clubs',      label: 'Clubs',             sub: 'Societies & Activities',  icon: 'people-outline',      lib: 'ion' },
  { key: 'revision',   label: 'Revision',          sub: 'Past Papers & Notes',     icon: 'book-open-outline',   lib: 'material' },
  { key: 'activities', label: 'School Activities', sub: 'Sports & Events',         icon: 'trophy-outline',      lib: 'ion' },
];

const NAV_LINKS = [
  { key: 'Student-Notifications', label: 'Notifications',  icon: 'notifications-outline' },
  { key: 'Student-Profile-Edit',  label: 'Edit Profile',   icon: 'person-outline' },
  { key: 'Student-Full-Report',   label: 'Full Report',    icon: 'document-text-outline' },
  { key: 'Language',              label: 'Language',       icon: 'language-outline' },
  { key: 'Theme',                 label: 'Theme',          icon: 'color-palette-outline' },
  { key: 'Help & Support',        label: 'Help & Support', icon: 'help-circle-outline' },
  { key: 'Privacy Policy',        label: 'Privacy Policy', icon: 'shield-checkmark-outline' },
  { key: 'About',                 label: 'About',          icon: 'information-circle-outline' },
];

const DEFAULT_USER = {
  name: 'Prince',
  role: 'Student',
  term: 'Term 2',
  academicYear: '2025/2026',
  avatar: null,
};

function InitialAvatar({ name, colors, size = 56 }) {
  const styles = makeStyles(colors);
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return (
    <View style={[styles.avatarFallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarInitial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

export default function MenuDropdown({
  visible,
  activeTab,
  onSelectTab,
  onClose,
  onNavigate,
  onPressSignOut,
  user = DEFAULT_USER,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ===== PROFILE HEADER ===== */}
        <View style={styles.profileRow}>
          {user.avatar ? (
            <Image
              source={typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar}
              style={styles.avatar}
            />
          ) : (
            <InitialAvatar name={user.name} colors={colors} />
          )}

          <View style={styles.profileText}>
            <Text style={styles.profileName} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={styles.profileMeta} numberOfLines={1}>
              {user.term} · {user.academicYear}
            </Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{user.role}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.closeBtn}
            accessibilityLabel="Close menu"
          >
            <Ionicons name="close" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* ===== VIEW SWITCHER ===== */}
        <Text style={styles.sectionHeading}>SWITCH VIEW</Text>

        {MENU_TABS.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.menuItem, isSelected && styles.menuItemActive]}
              onPress={() => onSelectTab(tab.key)}
            >
              <View style={styles.iconBox}>
                {tab.lib === 'material' ? (
                  <MaterialCommunityIcons
                    name={tab.icon}
                    size={18}
                    color={isSelected ? colors.accent : colors.fg}
                  />
                ) : (
                  <Ionicons
                    name={tab.icon}
                    size={18}
                    color={isSelected ? colors.accent : colors.fg}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.label, isSelected && styles.labelActive]}>
                  {tab.label}
                </Text>
                <Text style={styles.subLabel}>{tab.sub}</Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
              )}
            </TouchableOpacity>
          );
        })}

        <View style={styles.dividerSpaced} />

        {/* ===== NAVIGATION LINKS ===== */}
        <Text style={styles.sectionHeading}>MORE</Text>

        {NAV_LINKS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.quickItem}
            onPress={() => onNavigate?.(item.key)}
          >
            <Ionicons name={item.icon} size={18} color={colors.fgMuted} />
            <Text style={styles.quickLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== FOOTER ===== */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutBtn} onPress={onPressSignOut}>
          <Ionicons name="log-out-outline" size={18} color={colors.accent} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}