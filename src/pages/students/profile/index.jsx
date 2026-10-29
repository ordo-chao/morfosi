// Profile.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, Image,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const PROFILE = {
  name: 'Amina Wanjiku',
  form: 'Form 3 A',
  admissionNo: '2024-0731',
  status: 'Active',
  term: 'Term 2',
  year: '2025/2026',
  avatar: null,
  stats: {
    attendance: '96%',
    average: 'B+',
    subjects: 12,
    rank: 2,
  },
  // Each detail now has an optional `onPressKey` that maps to a route.
  details: [
    { icon: 'mail-outline',     label: 'amina.wanjiku@school.ac.ke' },
    { icon: 'call-outline',     label: '+254 712 345 678' },
    { icon: 'calendar-outline', label: '12 March 2009' },
    { icon: 'location-outline', label: 'Nairobi, Kenya' },
    {
      icon: 'school-outline',
      label: 'Form 3 A · Mr. Otieno (Class Teacher)',
      route: 'Student-ClassDetail',
    },
    {
      icon: 'bed-outline',
      label: 'Dorm: Kilimanjaro · Room 14 · Bed 2',
      route: 'Student-DormDetail',
    },
  ],
  guardians: [
    { name: 'James Wanjiku', relation: 'Father', phone: '+254 722 111 222' },
    { name: 'Grace Wanjiku', relation: 'Mother', phone: '+254 733 444 555' },
  ],
  account: [
    { key: 'password',      icon: 'lock-closed-outline',       label: 'Change password' },
    { key: 'notifications', icon: 'notifications-outline',     label: 'Notifications' },
    { key: 'language',      icon: 'globe-outline',             label: 'Language', value: 'English' },
    { key: 'theme',         icon: 'contrast-outline',          label: 'Theme',    value: 'System'  },
    { key: 'data',          icon: 'download-outline',          label: 'Download my data' },
    { key: 'help',          icon: 'help-circle-outline',       label: 'Help & Support' },
    { key: 'privacy',       icon: 'document-text-outline',     label: 'Privacy policy' },
    { key: 'about',         icon: 'information-circle-outline', label: 'About',  value: 'v1.4.2' },
  ],
};

/* -------------------- helpers -------------------- */

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

/* -------------------- components -------------------- */

function Avatar({ uri, name, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.avatarWrap}>
      <View style={styles.avatarCircle}>
        {uri ? (
          <Image source={{ uri }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarInitials}>{initials(name)}</Text>
        )}
      </View>
      <View style={styles.avatarBadge}>
        <Ionicons name="camera" size={12} color={colors.accentContrast} />
      </View>
    </View>
  );
}

/**
 * StatTile now supports an onPress.
 * When onPress is provided the tile is wrapped in a TouchableOpacity;
 * otherwise it renders as a plain View (unchanged behaviour).
 */
function StatTile({ value, label, accent, onPress, colors }) {
  const styles = makeStyles(colors);
  const inner = (
    <View style={[styles.statTile, accent && styles.statTileAccent]}>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  if (!onPress) return inner;
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      {inner}
    </TouchableOpacity>
  );
}

/**
 * DetailRow now supports an optional route + chevron.
 * Rows without a route stay non-interactive, so emails and phone numbers
 * don't accidentally become navigation targets.
 */
function DetailRow({ icon, label, onPress, colors }) {
  const styles = makeStyles(colors);
  const body = (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.detailText}>{label}</Text>
      {onPress ? (
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {body}
    </TouchableOpacity>
  );
}

function GuardianCard({ guardian, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.guardianCard}>
      <View style={styles.guardianInitials}>
        <Text style={styles.guardianInitialsText}>
          {initials(guardian.name)}
        </Text>
      </View>
      <View style={styles.guardianBody}>
        <Text style={styles.guardianName}>
          {guardian.name}
          <Text style={styles.guardianRelation}> ({guardian.relation})</Text>
        </Text>
        <Text style={styles.guardianPhone}>{guardian.phone}</Text>
      </View>
    </View>
  );
}

function AccountRow({ item, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.accountRow}
      onPress={onPress}
      activeOpacity={0.6}
      accessibilityRole="button"
      accessibilityLabel={item.label}
    >
      <Ionicons name={item.icon} size={16} color={colors.fg} />
      <Text style={styles.accountLabel}>{item.label}</Text>
      {item.value ? (
        <Text style={styles.accountValue}>{item.value}</Text>
      ) : null}
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function Profile({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const profile = PROFILE;
  const [avatarUri, setAvatarUri] = useState(profile.avatar);

  const onChangePhoto = () => {
    Alert.alert('Change photo', 'Open image picker');
  };

  const onEdit = () => navigation?.navigate('Student-Profile-Edit');

  const onRequestCorrection = () => {
    navigation?.navigate('ProfileCorrection');
  };

  const onAttendance = () => {
    navigation?.navigate('Student-Attendance');
  };

  const onDetailPress = (detail) => {
    if (!detail?.route) return;
    // Pass the raw label so each detail screen can render it if needed.
    navigation?.navigate(detail.route, { detail });
  };

  const onAccountPress = (key) => {
    switch (key) {
      case 'password':      return navigation?.navigate('SendEmail');
      case 'notifications': return navigation?.navigate('Student-Notifications');
      case 'language':      return navigation?.navigate('Language');
      case 'theme':         return navigation?.navigate('Theme');
      case 'help':          return navigation?.navigate('Help & Support');
      case 'privacy':       return navigation?.navigate('Privacy Policy');
      case 'about':         return navigation?.navigate('About');
      case 'data':          return navigation?.navigate('Download my data');
      default:              return null;
    }
  };

  const onLogout = () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => {
        // navigation?.reset({ index: 0, routes: [{ name: 'Login' }] });
      } },
    ]);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY PROFILE</Text>
          <TouchableOpacity onPress={onEdit} hitSlop={8}>
            <Text style={styles.headerAction}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== HERO ===== */}
          <View style={styles.hero}>
            <TouchableOpacity onPress={onChangePhoto} activeOpacity={0.8}>
              <Avatar uri={avatarUri} name={profile.name} colors={colors} />
            </TouchableOpacity>

            <Text style={styles.heroName}>{profile.name}</Text>
            <Text style={styles.heroLine}>
              {profile.form} · Adm No. {profile.admissionNo}
            </Text>

            <View style={styles.heroStatusRow}>
              <View style={styles.heroStatusDot} />
              <Text style={styles.heroStatusText}>
                {profile.status} · {profile.term} · {profile.year}
              </Text>
            </View>
          </View>

          {/* ===== ACADEMIC SNAPSHOT ===== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACADEMIC SNAPSHOT</Text>

            <View style={styles.statsRow}>
              {/* ATT tile now navigates to attendance */}
              <StatTile
                value={profile.stats.attendance}
                label="ATT"
                accent
                onPress={onAttendance}
                colors={colors}
              />
              <StatTile value={profile.stats.average}           label="AVG"  colors={colors} />
              <StatTile value={String(profile.stats.subjects)}  label="SUBJ" colors={colors} />
              <StatTile value={`#${profile.stats.rank}`}        label="RANK" accent colors={colors} />
            </View>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation?.navigate('Student-Grades')}
            >
              <Text style={styles.linkButtonText}>VIEW FULL REPORT →</Text>
            </TouchableOpacity>
          </View>

          {/* ===== MY DETAILS ===== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MY DETAILS</Text>

            <View style={styles.detailsBlock}>
              {profile.details.map((d, i) => (
                <DetailRow
                  key={i}
                  icon={d.icon}
                  label={d.label}
                  onPress={d.route ? () => onDetailPress(d) : undefined}
                  colors={colors}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={onRequestCorrection}
            >
              <Text style={styles.linkButtonText}>REQUEST CORRECTION →</Text>
            </TouchableOpacity>
          </View>

          {/* ===== PARENTS / GUARDIANS ===== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MY PARENTS / GUARDIANS</Text>

            <View style={styles.guardianList}>
              {profile.guardians.map((g, i) => (
                <GuardianCard key={i} guardian={g} colors={colors} />
              ))}
            </View>
          </View>

          {/* ===== ACCOUNT ===== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>

            <View style={styles.accountBlock}>
              {profile.account.map((item) => (
                <AccountRow
                  key={item.key}
                  item={item}
                  onPress={() => onAccountPress(item.key)}
                  colors={colors}
                />
              ))}
            </View>
          </View>

          {/* ===== LOGOUT ===== */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={16} color={colors.buttonFg} />
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}