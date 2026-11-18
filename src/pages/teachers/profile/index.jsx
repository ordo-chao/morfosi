// src/pages/teachers/profile/index.jsx
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
  name: 'Mr. Otieno',
  role: 'Biology Teacher',
  staffNo: 'TCH-2019-0142',
  status: 'Active',
  term: 'Term 2',
  year: '2025/2026',
  avatar: null,
  homeroom: { name: 'Form 3 A', route: 'Teacher-Class-Detail', classId: 'bio10a' },
  stats: {
    classes: 5,
    students: 158,
    avgAttendance: '94%',
    avgGrade: 'B+',
  },
  details: [
    { icon: 'mail-outline',      label: 'otieno@school.ac.ke' },
    { icon: 'call-outline',      label: '+254 711 222 333' },
    { icon: 'briefcase-outline', label: 'Joined Aug 2019' },
    { icon: 'location-outline',  label: 'Staff House · Unit 4' },
    {
      icon: 'school-outline',
      label: 'Homeroom: Form 3 A',
      route: 'Teacher-Class-Detail',
      params: { classId: 'bio10a' },
    },
    {
      icon: 'book-outline',
      label: 'Subjects: Biology, General Science',
      route: 'Teacher-Classes',
    },
    {
      icon: 'time-outline',
      label: 'Office hours: Tue & Thu · 3–4 PM',
    },
  ],
  classes: [
    { id: 'bio10a', name: 'Biology · 10A', size: 32, avg: 84 },
    { id: 'bio10b', name: 'Biology · 10B', size: 30, avg: 78 },
    { id: 'bio11a', name: 'Biology · 11A', size: 28, avg: 81 },
    { id: 'sci8',   name: 'Science · 8',   size: 35, avg: 72 },
    { id: 'sci9',   name: 'Science · 9',   size: 33, avg: 75 },
  ],
  account: [
    { key: 'password',      icon: 'lock-closed-outline',        label: 'Change password' },
    { key: 'notifications', icon: 'notifications-outline',      label: 'Notifications' },
    { key: 'language',      icon: 'globe-outline',              label: 'Language', value: 'English' },
    { key: 'theme',         icon: 'contrast-outline',           label: 'Theme',    value: 'System'  },
    { key: 'data',          icon: 'download-outline',           label: 'Download my data' },
    { key: 'help',          icon: 'help-circle-outline',        label: 'Help & Support' },
    { key: 'privacy',       icon: 'document-text-outline',      label: 'Privacy policy' },
    { key: 'about',         icon: 'information-circle-outline', label: 'About',    value: 'v1.4.2' },
  ],
};

/* -------------------- helpers -------------------- */

function initials(name) {
  return name
    .replace('Mr. ', '').replace('Ms. ', '').replace('Mrs. ', '').replace('Dr. ', '')
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

function StatTile({ value, label, accent, onPress, colors }) {
  const styles = makeStyles(colors);
  const inner = (
    <View style={[styles.statTile, accent && styles.statTileAccent]}>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
  if (!onPress) return <View style={{ flex: 1 }}>{inner}</View>;
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

function DetailRow({ icon, label, onPress, colors }) {
  const styles = makeStyles(colors);
  const body = (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.detailText}>{label}</Text>
      {onPress ? <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} /> : null}
    </View>
  );
  if (!onPress) return body;
  return <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{body}</TouchableOpacity>;
}

function ClassCard({ cls, colors, onPress }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.classCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.classCardHeader}>
        <Text style={styles.classCardName} numberOfLines={1}>{cls.name}</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </View>
      <Text style={styles.classCardMeta}>
        {cls.size} students · Avg {cls.avg}%
      </Text>
    </TouchableOpacity>
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
      {item.value ? <Text style={styles.accountValue}>{item.value}</Text> : null}
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherProfile({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const profile = PROFILE;
  const [avatarUri, setAvatarUri] = useState(profile.avatar);

  const onChangePhoto = () => Alert.alert('Change photo', 'Open image picker');
  const onEdit        = () => navigation?.navigate('Teacher-Profile-Edit');

  const onClassesStat = () => navigation?.navigate('Teacher-Classes');
  const onStudentsStat = () => navigation?.navigate('Teacher-Classes');

  const onDetailPress = (detail) => {
    if (!detail?.route) return;
    navigation?.navigate(detail.route, detail.params ?? {});
  };

  const onAccountPress = (key) => {
    switch (key) {
      case 'password':      return navigation?.navigate('SendEmail');
      case 'notifications': return navigation?.navigate('Teacher-Notifications');
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
          {/* HERO */}
          <View style={styles.hero}>
            <TouchableOpacity onPress={onChangePhoto} activeOpacity={0.8}>
              <Avatar uri={avatarUri} name={profile.name} colors={colors} />
            </TouchableOpacity>
            <Text style={styles.heroName}>{profile.name}</Text>
            <Text style={styles.heroLine}>
              {profile.role} · Staff No. {profile.staffNo}
            </Text>
            <View style={styles.heroStatusRow}>
              <View style={styles.heroStatusDot} />
              <Text style={styles.heroStatusText}>
                {profile.status} · {profile.term} · {profile.year}
              </Text>
            </View>
          </View>

          {/* TEACHING SNAPSHOT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TEACHING SNAPSHOT</Text>
            <View style={styles.statsRow}>
              <StatTile value={String(profile.stats.classes)}       label="CLASSES"  onPress={onClassesStat} accent colors={colors} />
              <StatTile value={String(profile.stats.students)}      label="STUDENTS" onPress={onStudentsStat} colors={colors} />
              <StatTile value={profile.stats.avgAttendance}         label="ATT"      colors={colors} />
              <StatTile value={profile.stats.avgGrade}              label="AVG"      accent colors={colors} />
            </View>
          </View>

          {/* MY CLASSES */}
          <View style={styles.section}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>MY CLASSES</Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Teacher-Classes')}>
                <Text style={styles.sectionAction}>SEE ALL →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.classList}>
              {profile.classes.map((c) => (
                <ClassCard
                  key={c.id}
                  cls={c}
                  colors={colors}
                  onPress={() =>
                    navigation?.navigate('Teacher-Class-Detail', {
                      classId: c.id, className: c.name,
                    })
                  }
                />
              ))}
            </View>
          </View>

          {/* MY DETAILS */}
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
          </View>

          {/* ACCOUNT */}
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

          {/* LOGOUT */}
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.7}>
            <Ionicons name="log-out-outline" size={16} color={colors.buttonFg} />
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}