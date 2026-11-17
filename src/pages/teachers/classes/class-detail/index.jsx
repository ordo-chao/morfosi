// src/pages/teachers/classes/class-detail/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, TextInput,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

const CLASS_INFO = {
  stream: 'Biology · 10A',
  year: '2025/2026',
  term: 'Term 2',
  room: 'Lab 2 · Block B',
  classTeacher: {
    name: 'Mr. Otieno',
    role: 'Class Teacher',
    email: 'otieno@school.ac.ke',
    phone: '+254 711 222 333',
  },
  studentCount: 32,
  subjectTeachers: [
    { name: 'Biology', teacher: 'You' },
    { name: 'Math',    teacher: 'Mr. Kimani' },
    { name: 'English', teacher: 'Ms. Wanjiku' },
    { name: 'Chemistry', teacher: 'Ms. Achieng' },
  ],
  roster: [
    { id: 'p1', name: 'Amina Wanjiku',   attendance: 0.96, avg: 84, risk: false },
    { id: 'p2', name: 'Brian Otieno',    attendance: 0.88, avg: 72, risk: true  },
    { id: 'p3', name: 'Cynthia Njeri',   attendance: 0.98, avg: 91, risk: false },
    { id: 'p4', name: 'David Mwangi',    attendance: 0.74, avg: 58, risk: true  },
    { id: 'p5', name: 'Esther Achieng',  attendance: 0.92, avg: 78, risk: false },
    { id: 'p6', name: 'Farid Kariuki',   attendance: 0.89, avg: 81, risk: false },
    { id: 'p7', name: 'Grace Muthoni',   attendance: 0.85, avg: 74, risk: false },
    { id: 'p8', name: 'Henry Omondi',    attendance: 0.65, avg: 49, risk: true  },
  ],
  announcements: [
    { title: 'Lab coat required for Friday', date: 'Oct 27' },
    { title: 'Mid-term exams start Nov 3',   date: 'Oct 25' },
  ],
};

function InfoRow({ icon, label, value, onPress, colors }) {
  const styles = makeStyles(colors);
  const inner = (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      {onPress ? <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} /> : null}
    </View>
  );
  if (!onPress) return inner;
  return <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{inner}</TouchableOpacity>;
}

function TeacherCard({ teacher, colors }) {
  const styles = makeStyles(colors);
  const initials = teacher.name
    .replace('Mr. ', '').replace('Ms. ', '')
    .split(' ').map((s) => s[0]).slice(0, 2).join('');
  return (
    <View style={styles.teacherCard}>
      <View style={styles.teacherAvatar}>
        <Text style={styles.teacherInitials}>{initials}</Text>
      </View>
      <View style={styles.teacherBody}>
        <Text style={styles.teacherName}>{teacher.name}</Text>
        <Text style={styles.teacherRole}>{teacher.role}</Text>
      </View>
    </View>
  );
}

function RosterRow({ student, colors, onPress }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.rosterRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rosterAvatar}>
        <Text style={styles.rosterInitial}>{student.name.charAt(0)}</Text>
      </View>
      <View style={styles.rosterBody}>
        <Text style={styles.rosterName} numberOfLines={1}>{student.name}</Text>
        <Text style={styles.rosterMeta} numberOfLines={1}>
          Attendance {Math.round(student.attendance * 100)}% · Avg {student.avg}%
        </Text>
      </View>
      {student.risk && (
        <View style={styles.riskBadge}>
          <Text style={styles.riskBadgeText}>AT RISK</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClassDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { classId, className } = route?.params ?? {};
  const cls = useMemo(() => ({
    ...CLASS_INFO,
    stream: className ?? CLASS_INFO.stream,
  }), [className]);

  const [query, setQuery] = useState('');
  const filteredRoster = useMemo(() => {
    if (!query.trim()) return cls.roster;
    const q = query.trim().toLowerCase();
    return cls.roster.filter((s) => s.name.toLowerCase().includes(q));
  }, [cls.roster, query]);

  const onEmailTeacher = () => Alert.alert('Email', cls.classTeacher.email);
  const onCallTeacher  = () => Alert.alert('Call',  cls.classTeacher.phone);
  const onOpenStudent  = (s) => {
    navigation?.navigate('Teacher-Student-Detail', { classId, student: s });
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
          <TouchableOpacity
            hitSlop={8}
            onPress={() => Alert.alert('Options', 'Coming soon')}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}
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

          {/* QUICK ACTIONS */}
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation?.navigate('Teacher-Attendance-Mark', { classId })}
            >
              <Ionicons name="checkbox-outline" size={18} color={colors.accent} />
              <Text style={styles.quickBtnText}>ATTENDANCE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation?.navigate('Teacher-Tasks-Create', { classId })}
            >
              <Ionicons name="add-circle-outline" size={18} color={colors.accent} />
              <Text style={styles.quickBtnText}>NEW TASK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation?.navigate('Teacher-Materials-Create', { classId })}
            >
              <Ionicons name="cloud-upload-outline" size={18} color={colors.accent} />
              <Text style={styles.quickBtnText}>UPLOAD</Text>
            </TouchableOpacity>
          </View>

          {/* CLASS INFO */}
          <Text style={styles.sectionTitle}>CLASS INFO</Text>
          <View style={styles.infoBlock}>
            <InfoRow icon="home-outline"     label="Room" value={cls.room} colors={colors} />
            <InfoRow icon="people-outline"   label="Size" value={`${cls.studentCount} students`} colors={colors} />
            <InfoRow icon="calendar-outline" label="Term" value={`${cls.term} · ${cls.year}`} colors={colors} />
          </View>

          {/* CLASS TEACHER */}
          <Text style={styles.sectionTitle}>CLASS TEACHER</Text>
          <View style={styles.infoBlock}>
            <TeacherCard teacher={cls.classTeacher} colors={colors} />
            <InfoRow icon="mail-outline" label="Email" value={cls.classTeacher.email} onPress={onEmailTeacher} colors={colors} />
            <InfoRow icon="call-outline" label="Phone" value={cls.classTeacher.phone} onPress={onCallTeacher} colors={colors} />
          </View>

          {/* SUBJECT TEACHERS */}
          <Text style={styles.sectionTitle}>SUBJECTS · TEACHERS</Text>
          <View style={styles.subjectsGrid}>
            {cls.subjectTeachers.map((s, i) => (
              <View key={i} style={styles.subjectChip}>
                <Text style={styles.subjectName}>{s.name}</Text>
                <Text style={styles.subjectTeacher}>{s.teacher}</Text>
              </View>
            ))}
          </View>

          {/* ROSTER */}
          <View style={styles.rosterHeaderRow}>
            <Text style={styles.sectionTitle}>ROSTER · {cls.roster.length}</Text>
          </View>

          <View style={styles.searchRow}>
            <Ionicons name="search" size={14} color={colors.fgMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search students…"
              placeholderTextColor={colors.placeholder}
              value={query}
              onChangeText={setQuery}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} hitSlop={6}>
                <Ionicons name="close-circle" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.rosterBlock}>
            {filteredRoster.length === 0 ? (
              <View style={styles.rosterEmpty}>
                <Text style={styles.rosterEmptyText}>No students match</Text>
              </View>
            ) : (
              filteredRoster.map((s) => (
                <RosterRow
                  key={s.id}
                  student={s}
                  colors={colors}
                  onPress={() => onOpenStudent(s)}
                />
              ))
            )}
          </View>

          {/* ANNOUNCEMENTS */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>ANNOUNCEMENTS</Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('Teacher-Announcements-Create', { classId })}
            >
              <Text style={styles.sectionAction}>+ POST</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.announcementBlock}>
            {cls.announcements.map((a, i) => (
              <View key={i} style={styles.announcementRow}>
                <View style={styles.announcementBullet} />
                <Text style={styles.announcementText} numberOfLines={2}>{a.title}</Text>
                <Text style={styles.announcementDate}>{a.date}</Text>
              </View>
            ))}
          </View>

          {/* NOTE */}
          <View style={styles.noteBlock}>
            <Ionicons name="information-circle-outline" size={14} color={colors.fgMuted} />
            <Text style={styles.noteText}>
              Class assignments are managed by the school office. Contact the class teacher
              or the office to request a change.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}