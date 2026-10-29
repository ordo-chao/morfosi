// ClassDetail.jsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const CLASS_INFO = {
  stream: 'Form 3 A',
  year: '2025/2026',
  term: 'Term 2',
  room: 'Rm 12 · Block B',
  classTeacher: {
    name: 'Mr. Otieno',
    role: 'Class Teacher',
    email: 'otieno@school.ac.ke',
    phone: '+254 711 222 333',
  },
  studentCount: 42,
  subjects: [
    { name: 'Math',      teacher: 'Mr. Kimani'  },
    { name: 'English',   teacher: 'Ms. Wanjiku' },
    { name: 'Biology',   teacher: 'Mr. Otieno'  },
    { name: 'Chemistry', teacher: 'Ms. Achieng' },
    { name: 'History',   teacher: 'Mr. Mwangi'  },
    { name: 'Geography', teacher: 'Ms. Njeri'   },
  ],
  announcements: [
    { title: 'Class prefects meeting — Fri 4 PM', date: 'Oct 27' },
    { title: 'Mid-term exams start Nov 3',         date: 'Oct 25' },
  ],
};

/* -------------------- components -------------------- */

function InfoRow({ icon, label, value, onPress, colors }) {
  const styles = makeStyles(colors);
  const inner = (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      {onPress ? (
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      ) : null}
    </View>
  );
  if (!onPress) return inner;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      {inner}
    </TouchableOpacity>
  );
}

function SubjectChip({ subject, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.subjectChip}>
      <Text style={styles.subjectName}>{subject.name}</Text>
      <Text style={styles.subjectTeacher}>{subject.teacher}</Text>
    </View>
  );
}

function TeacherCard({ teacher, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.teacherCard}>
      <View style={styles.teacherAvatar}>
        <Text style={styles.teacherInitials}>
          {teacher.name.replace('Mr. ', '').replace('Ms. ', '').split(' ')[0][0]}
          {teacher.name.replace('Mr. ', '').replace('Ms. ', '').split(' ')[1]?.[0] ?? ''}
        </Text>
      </View>
      <View style={styles.teacherBody}>
        <Text style={styles.teacherName}>{teacher.name}</Text>
        <Text style={styles.teacherRole}>{teacher.role}</Text>
      </View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function ClassDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const cls = CLASS_INFO;

  /* ---- actions ---- */

  const onEmailTeacher = () => {
    Alert.alert('Email', cls.classTeacher.email);
    // Linking.openURL(`mailto:${cls.classTeacher.email}`);
  };

  const onCallTeacher = () => {
    Alert.alert('Call', cls.classTeacher.phone);
    // Linking.openURL(`tel:${cls.classTeacher.phone.replace(/\s+/g, '')}`);
  };

  const onViewTimetable = () => {
    navigation?.navigate('Student-Classes');
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CLASS DETAIL</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== HERO ===== */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Ionicons name="school-outline" size={28} color={colors.accent} />
            </View>
            <Text style={styles.heroLabel}>// CLASS STREAM</Text>
            <Text style={styles.heroTitle}>{cls.stream}</Text>
            <Text style={styles.heroMeta}>
              {cls.year} · {cls.term} · {cls.studentCount} students
            </Text>
          </View>

          {/* ===== CLASS INFO ===== */}
          <Text style={styles.sectionTitle}>CLASS INFO</Text>
          <View style={styles.infoBlock}>
            <InfoRow
              icon="home-outline"
              label="Room"
              value={cls.room}
              colors={colors}
            />
            <InfoRow
              icon="people-outline"
              label="Size"
              value={`${cls.studentCount} students`}
              colors={colors}
            />
            <InfoRow
              icon="calendar-outline"
              label="Term"
              value={`${cls.term} · ${cls.year}`}
              colors={colors}
            />
          </View>

          {/* ===== CLASS TEACHER ===== */}
          <Text style={styles.sectionTitle}>CLASS TEACHER</Text>
          <View style={styles.infoBlock}>
            <TeacherCard teacher={cls.classTeacher} colors={colors} />
            <InfoRow
              icon="mail-outline"
              label="Email"
              value={cls.classTeacher.email}
              onPress={onEmailTeacher}
              colors={colors}
            />
            <InfoRow
              icon="call-outline"
              label="Phone"
              value={cls.classTeacher.phone}
              onPress={onCallTeacher}
              colors={colors}
            />
          </View>

          {/* ===== SUBJECTS ===== */}
          <Text style={styles.sectionTitle}>SUBJECTS · TEACHERS</Text>
          <View style={styles.subjectsGrid}>
            {cls.subjects.map((s, i) => (
              <SubjectChip key={i} subject={s} colors={colors} />
            ))}
          </View>

          {/* ===== TIMETABLE LINK ===== */}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={onViewTimetable}
            activeOpacity={0.7}
          >
            <Ionicons
              name="calendar-clear-outline"
              size={14}
              color={colors.fg}
            />
            <Text style={styles.linkButtonText}>VIEW FULL TIMETABLE →</Text>
          </TouchableOpacity>

          {/* ===== ANNOUNCEMENTS ===== */}
          <Text style={styles.sectionTitle}>CLASS ANNOUNCEMENTS</Text>
          <View style={styles.announcementBlock}>
            {cls.announcements.map((a, i) => (
              <View key={i} style={styles.announcementRow}>
                <View style={styles.announcementBullet} />
                <Text style={styles.announcementText} numberOfLines={2}>
                  {a.title}
                </Text>
                <Text style={styles.announcementDate}>{a.date}</Text>
              </View>
            ))}
          </View>

          {/* ===== NOTE ===== */}
          <View style={styles.noteBlock}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={colors.fgMuted}
            />
            <Text style={styles.noteText}>
              Class assignments are managed by the school office. Contact the
              class teacher or the office to request a change.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}