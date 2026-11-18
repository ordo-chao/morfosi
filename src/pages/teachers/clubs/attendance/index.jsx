// src/pages/teachers/clubs/attendance/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

const CLUB = { id: 'c1', name: 'Debate Club', emoji: '🎭', members: 6 };

const PAST_SESSIONS = [
  { id: 's1', date: 'Oct 24, 2026', present: 4, absent: 2, topic: 'Motion: This house believes…' },
  { id: 's2', date: 'Oct 17, 2026', present: 5, absent: 1, topic: 'Practice round' },
  { id: 's3', date: 'Oct 10, 2026', present: 3, absent: 3, topic: 'Guest speaker' },
];

const ROSTER = [
  { id: 'm1', name: 'James Otieno',   form: 'Form 4B', role: 'Chair' },
  { id: 'm2', name: 'Amina Wanjiku',  form: 'Form 3A', role: 'Secretary' },
  { id: 'm3', name: 'Grace Njeri',    form: 'Form 3A', role: 'Treasurer' },
  { id: 'm4', name: 'Brian Kimani',   form: 'Form 3B', role: 'Member' },
  { id: 'm5', name: 'Faith Mutua',    form: 'Form 4A', role: 'Member' },
  { id: 'm6', name: 'Daniel Mwangi',  form: 'Form 2A', role: 'Member' },
];

const STATUS = { PRESENT: 'present', ABSENT: 'absent', LATE: 'late', EXCUSED: 'excused' };

const STATUS_COLOR = {
  present: '#4caf7d',
  absent:  '#e25b5b',
  late:    '#e0a93a',
  excused: '#4d7cff',
};

/* -------------------- components -------------------- */

function StatusButton({ state, onPress, colors }) {
  const styles = makeStyles(colors);
  const map = {
    present: { label: 'P', icon: 'check' },
    absent:  { label: 'A', icon: 'x' },
    late:    { label: 'L', icon: 'clock' },
    excused: { label: 'E', icon: 'shield' },
  };
  const tint = STATUS_COLOR[state] ?? colors.fgMuted;
  const { label, icon } = map[state] ?? map.absent;
  return (
    <TouchableOpacity
      style={[styles.statusBtn, { borderColor: tint, backgroundColor: `${tint}18` }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather name={icon} size={11} color={tint} />
      <Text style={[styles.statusBtnText, { color: tint }]}>{label}</Text>
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
        <Text style={styles.studentMeta} numberOfLines={1}>
          {student.form} · {student.role}
        </Text>
      </View>
      <StatusButton state={state} onPress={() => onCycle(student.id)} colors={colors} />
    </View>
  );
}

function SessionRow({ session, onEdit, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((session.present / (session.present + session.absent)) * 100);
  return (
    <TouchableOpacity style={styles.sessionRow} onPress={() => onEdit(session)} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sessionDate}>{session.date}</Text>
        <Text style={styles.sessionMeta} numberOfLines={1}>{session.topic}</Text>
      </View>
      <Text style={styles.sessionStat}>
        {session.present}/{session.present + session.absent} · {pct}%
      </Text>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClubAttendance({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const club = useMemo(() => ({ ...CLUB, ...(route?.params ?? {}) }), [route?.params]);

  const [tab, setTab] = useState('mark'); // 'mark' | 'history'
  const [date, setDate] = useState('Oct 31, 2026');
  const [topic, setTopic] = useState('');
  const [states, setStates] = useState(() =>
    Object.fromEntries(ROSTER.map((s) => [s.id, 'present']))
  );

  const cycle = (id) => {
    setStates((prev) => {
      const order = ['present', 'absent', 'late', 'excused'];
      const current = prev[id] ?? 'present';
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [id]: next };
    });
  };

  const bulkSet = (val) => {
    setStates(Object.fromEntries(ROSTER.map((s) => [s.id, val])));
  };

  const counts = useMemo(() => {
    const c = { present: 0, absent: 0, late: 0, excused: 0 };
    Object.values(states).forEach((s) => { c[s] = (c[s] ?? 0) + 1; });
    return c;
  }, [states]);

  const submit = () => {
    // TODO: POST /api/teacher/clubs/:id/attendance
    Alert.alert(
      'Save attendance',
      `${date} · ${counts.present} present, ${counts.absent} absent`,
      [{ text: 'OK', onPress: () => setTab('history') }],
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {club.name} · Attendance
          </Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { key: 'mark',    label: 'MARK' },
            { key: 'history', label: 'HISTORY' },
          ].map((t) => {
            const active = tab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setTab(t.key)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {tab === 'mark' ? (
            <>
              {/* Session info */}
              <View style={styles.sessionBlock}>
                <Text style={styles.blockLabel}>SESSION</Text>
                <TextInput
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholder="Date"
                  placeholderTextColor={colors.placeholder}
                />
                <TextInput
                  style={styles.input}
                  value={topic}
                  onChangeText={setTopic}
                  placeholder="Topic (optional)"
                  placeholderTextColor={colors.placeholder}
                />
              </View>

              {/* Summary */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryCell}>
                  <Text style={[styles.summaryValue, { color: STATUS_COLOR.present }]}>{counts.present}</Text>
                  <Text style={styles.summaryLabel}>PRESENT</Text>
                </View>
                <View style={styles.summaryCell}>
                  <Text style={[styles.summaryValue, { color: STATUS_COLOR.absent }]}>{counts.absent}</Text>
                  <Text style={styles.summaryLabel}>ABSENT</Text>
                </View>
                <View style={styles.summaryCell}>
                  <Text style={[styles.summaryValue, { color: STATUS_COLOR.late }]}>{counts.late}</Text>
                  <Text style={styles.summaryLabel}>LATE</Text>
                </View>
                <View style={styles.summaryCell}>
                  <Text style={[styles.summaryValue, { color: STATUS_COLOR.excused }]}>{counts.excused}</Text>
                  <Text style={styles.summaryLabel}>EXCUSED</Text>
                </View>
              </View>

              {/* Bulk actions */}
              <View style={styles.bulkRow}>
                <Text style={styles.bulkLabel}>BULK</Text>
                <TouchableOpacity style={styles.bulkBtn} onPress={() => bulkSet('present')}>
                  <Text style={styles.bulkBtnText}>ALL PRESENT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bulkBtn} onPress={() => bulkSet('absent')}>
                  <Text style={styles.bulkBtnText}>ALL ABSENT</Text>
                </TouchableOpacity>
              </View>

              {/* Roster */}
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
            </>
          ) : (
            <>
              <Text style={styles.blockLabel}>PAST SESSIONS</Text>
              <View style={styles.listBlock}>
                {PAST_SESSIONS.map((s) => (
                  <SessionRow
                    key={s.id}
                    session={s}
                    onEdit={(sess) => Alert.alert('Edit session', sess.date)}
                    colors={colors}
                  />
                ))}
              </View>

              <Text style={styles.footnote}>
                Attendance can be edited within 14 days of a session.
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}