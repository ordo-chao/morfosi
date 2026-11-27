// src/pages/teachers/attendance/mark/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- data -------------------- */

const BASE_CLASS = { id: 'BIO-10A', name: 'Biology · 10A', teacher: 'You', room: 'Lab 2' };

const ROSTER = [
  { id: 'p1', name: 'Amina Wanjiku',   form: 'Form 3A' },
  { id: 'p2', name: 'Brian Otieno',    form: 'Form 3A' },
  { id: 'p3', name: 'Cynthia Njeri',   form: 'Form 3A' },
  { id: 'p4', name: 'David Mwangi',    form: 'Form 3A' },
  { id: 'p5', name: 'Esther Achieng',  form: 'Form 3A' },
  { id: 'p6', name: 'Farid Kariuki',   form: 'Form 3A' },
  { id: 'p7', name: 'Grace Muthoni',   form: 'Form 3A' },
  { id: 'p8', name: 'Henry Omondi',    form: 'Form 3A' },
];

const STATUS = {
  present:  { label: 'P', icon: 'check',  color: '#4caf7d' },
  absent:   { label: 'A', icon: 'x',      color: '#e25b5b' },
  late:     { label: 'L', icon: 'clock',  color: '#e0a93a' },
  excused:  { label: 'E', icon: 'shield', color: '#4d7cff' },
};

const ORDER = ['present', 'absent', 'late', 'excused'];

/* -------------------- components -------------------- */

function StatusButton({ state, onPress, colors }) {
  const styles = makeStyles(colors);
  const meta = STATUS[state] ?? STATUS.absent;
  return (
    <TouchableOpacity
      style={[styles.statusBtn, { borderColor: meta.color, backgroundColor: `${meta.color}18` }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather name={meta.icon} size={11} color={meta.color} />
      <Text style={[styles.statusBtnText, { color: meta.color }]}>{meta.label}</Text>
    </TouchableOpacity>
  );
}

function StudentRow({ student, state, onCycle, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.studentRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {student.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
        <Text style={styles.studentMeta} numberOfLines={1}>{student.form}</Text>
      </View>
      <StatusButton state={state} onPress={() => onCycle(student.id)} colors={colors} />
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherAttendanceMark({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const cls = useMemo(() => ({ ...BASE_CLASS, ...(route?.params ?? {}) }), [route?.params]);

  const [sessionDate, setSessionDate] = useState('Nov 18, 2026');
  const [sessionTopic, setSessionTopic] = useState('');
  const [states, setStates] = useState(() =>
    Object.fromEntries(ROSTER.map((s) => [s.id, 'present']))
  );

  const cycle = (id) => {
    setStates((prev) => {
      const current = prev[id] ?? 'present';
      const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      return { ...prev, [id]: next };
    });
  };

  const bulkSet = (val) =>
    setStates(Object.fromEntries(ROSTER.map((s) => [s.id, val])));

  const counts = useMemo(() => {
    const c = { present: 0, absent: 0, late: 0, excused: 0 };
    Object.values(states).forEach((s) => { c[s] = (c[s] ?? 0) + 1; });
    return c;
  }, [states]);

  const submit = () => {
    // TODO: POST /api/teacher/classes/:id/attendance
    Alert.alert(
      'Attendance saved',
      `${cls.name} · ${sessionDate}\n${counts.present} present, ${counts.absent} absent, ${counts.late} late`,
      [{ text: 'OK', onPress: () => navigation?.goBack() }],
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MARK ATTENDANCE</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Class banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}>// CLASS</Text>
            <Text style={styles.bannerTitle}>{cls.name}</Text>
            <Text style={styles.bannerMeta}>{cls.teacher} · {cls.room}</Text>
          </View>

          {/* Session info */}
          <Text style={styles.sectionLabel}>SESSION</Text>
          <TextInput
            style={styles.input}
            value={sessionDate}
            onChangeText={setSessionDate}
            placeholder="Date"
            placeholderTextColor={colors.placeholder}
          />
          <TextInput
            style={styles.input}
            value={sessionTopic}
            onChangeText={setSessionTopic}
            placeholder="Topic (optional)"
            placeholderTextColor={colors.placeholder}
          />

          {/* Summary counts */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: STATUS.present.color }]}>{counts.present}</Text>
              <Text style={styles.summaryLabel}>PRESENT</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: STATUS.absent.color }]}>{counts.absent}</Text>
              <Text style={styles.summaryLabel}>ABSENT</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: STATUS.late.color }]}>{counts.late}</Text>
              <Text style={styles.summaryLabel}>LATE</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: STATUS.excused.color }]}>{counts.excused}</Text>
              <Text style={styles.summaryLabel}>EXCUSED</Text>
            </View>
          </View>

          {/* Bulk actions */}
          <View style={styles.bulkRow}>
            <Text style={styles.bulkLabel}>BULK</Text>
            <TouchableOpacity style={styles.bulkBtn} onPress={() => bulkSet('present')} activeOpacity={0.7}>
              <Text style={styles.bulkBtnText}>ALL PRESENT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bulkBtn} onPress={() => bulkSet('absent')} activeOpacity={0.7}>
              <Text style={styles.bulkBtnText}>ALL ABSENT</Text>
            </TouchableOpacity>
          </View>

          {/* Roster */}
          <Text style={styles.sectionLabel}>ROSTER ({ROSTER.length})</Text>
          <View style={styles.listBlock}>
            {ROSTER.map((s) => (
              <StudentRow
                key={s.id}
                student={s}
                state={states[s.id]}
                onCycle={cycle}
                colors={colors}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={submit} activeOpacity={0.7}>
            <Text style={styles.saveBtnText}>SAVE ATTENDANCE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}