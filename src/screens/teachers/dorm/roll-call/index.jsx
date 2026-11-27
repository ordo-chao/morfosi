// src/pages/teachers/dorm/roll-call/index.jsx
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

const BASE_DORM = {
  id: 'kilimanjaro',
  name: 'Kilimanjaro House',
  type: 'Boys',
  capacity: 48,
  houseMaster: 'You',
};

const ROSTER = [
  { id: 'p1', name: 'Brian Otieno',   form: 'Form 3A', bed: 'A-01' },
  { id: 'p2', name: 'David Mwangi',   form: 'Form 3A', bed: 'A-02' },
  { id: 'p3', name: 'Farid Kariuki',  form: 'Form 3A', bed: 'A-03' },
  { id: 'p4', name: 'Henry Omondi',   form: 'Form 3A', bed: 'A-04' },
  { id: 'p5', name: 'James Otieno',   form: 'Form 4B', bed: 'B-01' },
  { id: 'p6', name: 'Daniel Mwangi',  form: 'Form 2A', bed: 'B-02' },
  { id: 'p7', name: 'George Wekesa',  form: 'Form 2B', bed: 'B-03' },
  { id: 'p8', name: 'Peter Njoroge',  form: 'Form 3A', bed: 'B-04' },
];

const STATUS = {
  present: { label: 'P', icon: 'check',  color: '#4caf7d' },
  absent:  { label: 'A', icon: 'x',      color: '#e25b5b' },
  sickbay: { label: 'S', icon: 'plus',   color: '#4d7cff' },
  leave:   { label: 'L', icon: 'clock',  color: '#e0a93a' },
};

const ORDER = ['present', 'absent', 'sickbay', 'leave'];

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
      <View style={styles.bedBadge}>
        <Text style={styles.bedBadgeText}>{student.bed}</Text>
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

export default function TeacherDormRollCall({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dorm = useMemo(() => ({ ...BASE_DORM, ...(route?.params ?? {}) }), [route?.params]);

  const [session, setSession] = useState('Evening · 9:30 PM');
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
    const c = { present: 0, absent: 0, sickbay: 0, leave: 0 };
    Object.values(states).forEach((s) => { c[s] = (c[s] ?? 0) + 1; });
    return c;
  }, [states]);

  const submit = () => {
    Alert.alert(
      'Roll call saved',
      `${dorm.name} · ${session}\n${counts.present} present · ${counts.absent} absent · ${counts.sickbay} sick bay · ${counts.leave} on leave`,
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
          <Text style={styles.headerTitle}>ROLL CALL</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Dorm banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}>// DORMITORY</Text>
            <Text style={styles.bannerTitle}>{dorm.name}</Text>
            <Text style={styles.bannerMeta}>
              {dorm.type} · {ROSTER.length}/{dorm.capacity} occupied · Master: {dorm.houseMaster}
            </Text>
          </View>

          {/* Session */}
          <Text style={styles.sectionLabel}>SESSION</Text>
          <TextInput
            style={styles.input}
            value={session}
            onChangeText={setSession}
            placeholder="Evening · 9:30 PM"
            placeholderTextColor={colors.placeholder}
          />

          {/* Counts */}
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
              <Text style={[styles.summaryValue, { color: STATUS.sickbay.color }]}>{counts.sickbay}</Text>
              <Text style={styles.summaryLabel}>SICK BAY</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: STATUS.leave.color }]}>{counts.leave}</Text>
              <Text style={styles.summaryLabel}>ON LEAVE</Text>
            </View>
          </View>

          {/* Bulk */}
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
            <Text style={styles.saveBtnText}>SAVE ROLL CALL</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}