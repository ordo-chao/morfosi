// MenuDropdown.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MENU_TABS = [
  { key: 'academic',   label: 'Academic',          sub: 'Current Term',            icon: 'school-outline',      lib: 'ion' },
  { key: 'clubs',      label: 'Clubs',             sub: 'Societies & Activities',  icon: 'people-outline',      lib: 'ion' },
  { key: 'revision',   label: 'Revision',          sub: 'Past Papers & Notes',     icon: 'book-open-outline',   lib: 'material' },
  { key: 'activities', label: 'School Activities', sub: 'Sports & Events',         icon: 'trophy-outline',      lib: 'ion' },
];

/* Real screens from your Stack.Screen list — these are the ones that
   actually matter to a student inside the drawer. */
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
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return (
    <View
      style={[
        styles.avatarFallback,
        { width: size, height: size, borderRadius: size / 2,
          backgroundColor: colors.accent + '22',
          borderColor: colors.accent },
      ]}
    >
      <Text style={[styles.avatarInitial, { color: colors.accent, fontSize: size * 0.4 }]}>
        {initial}
      </Text>
    </View>
  );
}

export default function MenuDropdown({
  visible,
  activeTab,
  onSelectTab,
  onClose,
  onNavigate,       // (routeName) => void
  onPressSignOut,   // () => void
  user = DEFAULT_USER,
}) {
  const { colors } = useTheme();
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
              style={[styles.avatar, { borderColor: colors.accent }]}
            />
          ) : (
            <InitialAvatar name={user.name} colors={colors} />
          )}

          <View style={styles.profileText}>
            <Text style={[styles.profileName, { color: colors.fg }]} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={[styles.profileMeta, { color: colors.fgMuted }]} numberOfLines={1}>
              {user.term} · {user.academicYear}
            </Text>

            <View style={[styles.roleBadge, {
              backgroundColor: colors.accent + '18',
              borderColor: colors.accent + '55',
            }]}>
              <Text style={[styles.roleBadgeText, { color: colors.accent }]}>
                {user.role}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.closeBtn, { borderColor: colors.border, backgroundColor: colors.bg }]}
            accessibilityLabel="Close menu"
          >
            <Ionicons name="close" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* ===== VIEW SWITCHER ===== */}
        <Text style={[styles.sectionHeading, { color: colors.fgMuted }]}>SWITCH VIEW</Text>

        {MENU_TABS.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.menuItem, isSelected && { backgroundColor: colors.accent + '15' }]}
              onPress={() => onSelectTab(tab.key)}
            >
              <View style={[styles.iconBox, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                {tab.lib === 'material' ? (
                  <MaterialCommunityIcons name={tab.icon} size={18}
                    color={isSelected ? colors.accent : colors.fg} />
                ) : (
                  <Ionicons name={tab.icon} size={18}
                    color={isSelected ? colors.accent : colors.fg} />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.label, { color: isSelected ? colors.accent : colors.fg }]}>
                  {tab.label}
                </Text>
                <Text style={[styles.subLabel, { color: colors.fgMuted }]}>{tab.sub}</Text>
              </View>
              {isSelected && <Ionicons name="checkmark-circle" size={18} color={colors.accent} />}
            </TouchableOpacity>
          );
        })}

        <View style={[styles.divider, { backgroundColor: colors.border, marginVertical: 12 }]} />

        {/* ===== NAVIGATION LINKS ===== */}
        <Text style={[styles.sectionHeading, { color: colors.fgMuted }]}>MORE</Text>

        {NAV_LINKS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.quickItem}
            onPress={() => onNavigate?.(item.key)}
          >
            <Ionicons name={item.icon} size={18} color={colors.fgMuted} />
            <Text style={[styles.quickLabel, { color: colors.fg }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== FOOTER ===== */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.signOutBtn, { borderColor: colors.border, backgroundColor: colors.bg }]}
          onPress={onPressSignOut}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.accent} />
          <Text style={[styles.signOutText, { color: colors.accent }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 12 },

  /* Profile */
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2 },
  avatarFallback: { alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  avatarInitial: { fontWeight: '900', fontFamily: 'monospace' },
  profileText: { flex: 1, marginLeft: 12 },
  profileName: { fontSize: 16, fontWeight: '900', letterSpacing: -0.3 },
  profileMeta: { fontSize: 11, fontWeight: '600', marginTop: 2, letterSpacing: 0.3 },
  roleBadge: {
    alignSelf: 'flex-start', marginTop: 6, paddingHorizontal: 8,
    paddingVertical: 2, borderRadius: 999, borderWidth: 1,
  },
  roleBadgeText: {
    fontSize: 9, fontWeight: '800', letterSpacing: 1,
    textTransform: 'uppercase', fontFamily: 'monospace',
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', marginLeft: 8,
  },

  /* Shared */
  divider: { height: 1, marginVertical: 14 },
  sectionHeading: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2, fontWeight: '700',
    textTransform: 'uppercase', marginBottom: 8, marginTop: 2,
  },

  /* View switcher */
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, marginVertical: 2,
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 8, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  textContainer: { flex: 1 },
  label: { fontSize: 14, fontWeight: '700' },
  subLabel: { fontSize: 11, fontWeight: '500', marginTop: 1 },

  /* Navigation links */
  quickItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 11, paddingHorizontal: 4,
  },
  quickLabel: { flex: 1, fontSize: 13, fontWeight: '600', marginLeft: 12 },

  /* Footer */
  footer: { borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 10, borderWidth: 1, gap: 8,
  },
  signOutText: {
    fontSize: 13, fontWeight: '800', letterSpacing: 0.5,
    fontFamily: 'monospace', textTransform: 'uppercase',
  },
});