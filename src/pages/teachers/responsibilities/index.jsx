// src/pages/teachers/profile/responsibilities/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- data -------------------- */

// Every role a teacher might hold. Only the ones flagged `assigned: true`
// become tabs. In production this comes from the API.
const ALL_ROLES = [
  {
    id: 'class-teacher',
    assigned: true,
    icon: 'people',
    title: 'Class Teacher',
    tab: 'CLASS TEACHER',
    subtitle: 'Form 3 East · Class of 32',
    summary: 'General supervisor of students assigned to a particular class.',
    duties: [
      'Maintain class register and monitor attendance',
      'Track academic performance across subjects',
      'Communicate with parents about progress',
      'Coordinate class meetings and announcements',
      'Follow up on discipline and punctuality',
    ],
    quickActions: [
      { key: 'attendance', icon: 'checkbox-outline',          label: 'Mark Attendance', route: 'Teacher-Attendance-Mark', params: { classId: 'BIO-10A' } },
      { key: 'roster',     icon: 'people-outline',            label: 'View Roster',     route: 'Teacher-Class-Detail',   params: { classId: 'BIO-10A' } },
      { key: 'report',     icon: 'document-text-outline',     label: 'Class Report',    route: 'Teacher-Grades-Report',  params: { classId: 'BIO-10A' } },
    ],
  },
  {
    id: 'hod-bio',
    assigned: true,
    icon: 'briefcase',
    title: 'Head of Department',
    tab: 'HOD · BIOLOGY',
    subtitle: 'Biology Department · 5 teachers',
    summary: 'Coordinates teaching, curriculum delivery, and quality within the department.',
    duties: [
      'Coordinate subject teachers',
      'Monitor schemes of work and syllabus coverage',
      'Analyse department academic performance',
      'Moderate examinations and assessments',
      'Mentor and support department teachers',
      'Prepare departmental performance reports',
    ],
    quickActions: [
      { key: 'teachers', icon: 'people-outline',    label: 'View Teachers',     route: 'Teacher-Department-Teachers' },
      { key: 'schemes',  icon: 'document-outline',  label: 'Schemes of Work',   route: 'Teacher-Department-Schemes' },
      { key: 'analysis', icon: 'bar-chart-outline', label: 'Performance',       route: 'Teacher-Department-Performance' },
    ],
  },
  {
    id: 'dorm-master',
    assigned: true,
    icon: 'bed',
    title: 'Dormitory Master',
    tab: 'DORM MASTER',
    subtitle: 'Kilimanjaro House · 48 boarders',
    summary: 'Supervises discipline, safety, cleanliness and welfare of boarders.',
    duties: [
      'Conduct dormitory inspections',
      'Ensure students observe sleeping/waking times',
      'Monitor cleanliness and hygiene',
      'Maintain safety and account for all students',
      'Follow up on sick or distressed students',
      'Report serious welfare concerns',
    ],
    quickActions: [
      { key: 'rollcall',  icon: 'checkbox-outline',          label: 'Roll Call',   route: 'Teacher-Dorm-RollCall',    params: { dormId: 'kilimanjaro' } },
      { key: 'inspect',   icon: 'shield-checkmark-outline',  label: 'Inspection',  route: 'Teacher-Dorm-Inspection',  params: { dormId: 'kilimanjaro' } },
      { key: 'incidents', icon: 'warning-outline',           label: 'Incidents',   route: 'Teacher-Dorm-Incidents',   params: { dormId: 'kilimanjaro' } },
    ],
  },
  {
    id: 'club-patron',
    assigned: true,
    icon: 'ribbon',
    title: 'Club Patron',
    tab: 'CLUB PATRON',
    subtitle: 'Debate Club · 34 members',
    summary: 'Supervises a school club, its activities and its members.',
    duties: [
      'Guide the club leadership',
      'Coordinate meetings and events',
      'Approve members and requests',
      'Supervise club finances and resources',
    ],
    quickActions: [
      { key: 'manage',     icon: 'settings-outline',  label: 'Manage Club', route: 'Teacher-Club-Manage',         params: { clubId: 'c1' } },
      { key: 'attendance', icon: 'checkbox-outline',  label: 'Attendance',  route: 'Teacher-Club-Attendance',     params: { clubId: 'c1' } },
      { key: 'announce',   icon: 'megaphone-outline', label: 'Announce',    route: 'Teacher-Club-Announcements',  params: { clubId: 'c1' } },
    ],
  },
];

/* -------------------- components -------------------- */

function RoleTab({ role, active, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.tabActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather
        name={role.icon}
        size={12}
        color={active ? colors.accentContrast : colors.fgMuted}
      />
      <Text
        style={[styles.tabText, active && styles.tabTextActive]}
        numberOfLines={1}
      >
        {role.tab}
      </Text>
    </TouchableOpacity>
  );
}

function RolePanel({ role, navigation, colors }) {
  const styles = makeStyles(colors);

  const openAction = (action) => {
    if (action.route) navigation?.navigate(action.route, action.params ?? {});
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.panelContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.panelHero}>
        <View style={styles.panelIcon}>
          <Feather name={role.icon} size={26} color={colors.accent} />
        </View>
        <Text style={styles.panelTitle}>{role.title}</Text>
        <Text style={styles.panelSubtitle}>{role.subtitle}</Text>
      </View>

      {/* Summary */}
      <Text style={styles.sectionTitle}>WHAT THIS ROLE MEANS</Text>
      <Text style={styles.summary}>{role.summary}</Text>

      {/* Duties */}
      <Text style={styles.sectionTitle}>MAIN DUTIES</Text>
      <View style={styles.dutiesBlock}>
        {role.duties.map((d, i) => (
          <View key={i} style={styles.dutyRow}>
            <View style={styles.dutyBullet} />
            <Text style={styles.dutyText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Quick actions */}
      <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
      <View style={styles.actionsBlock}>
        {role.quickActions.map((a) => (
          <TouchableOpacity
            key={a.key}
            style={styles.actionRow}
            onPress={() => openAction(a)}
            activeOpacity={0.7}
          >
            <Ionicons name={a.icon} size={16} color={colors.accent} />
            <Text style={styles.actionLabel}>{a.label}</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherResponsibilities({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // In production: fetch the teacher's assigned roles from the API.
  const myRoles = useMemo(() => ALL_ROLES.filter((r) => r.assigned), []);
  const [activeId, setActiveId] = useState(myRoles[0]?.id ?? null);

  const activeRole = myRoles.find((r) => r.id === activeId) ?? myRoles[0];

  if (myRoles.length === 0) {
    return (
      <Layout>
        <View style={styles.page}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
              <Ionicons name="chevron-back" size={22} color={colors.fg} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>MY RESPONSIBILITIES</Text>
            <View style={{ width: 22 }} />
          </View>
          <View style={styles.empty}>
            <Feather name="inbox" size={32} color={colors.fgFaint} />
            <Text style={styles.emptyTitle}>No additional roles</Text>
            <Text style={styles.emptySub}>
              You currently hold no extra school responsibilities beyond teaching.
            </Text>
          </View>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MY RESPONSIBILITIES</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Tabs — one per role the teacher actually holds */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.tabsRow}
        >
          {myRoles.map((role) => (
            <RoleTab
              key={role.id}
              role={role}
              active={activeId === role.id}
              onPress={() => setActiveId(role.id)}
              colors={colors}
            />
          ))}
        </ScrollView>

        {/* Panel — content of the active role */}
        {activeRole && (
          <RolePanel
            role={activeRole}
            navigation={navigation}
            colors={colors}
          />
        )}
      </View>
    </Layout>
  );
}