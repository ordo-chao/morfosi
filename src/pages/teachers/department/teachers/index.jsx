// src/pages/teachers/department/teachers/index.jsx
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

const DEPARTMENT = {
  name: 'Biology Department',
  teachers: [
    {
      id: 't1', name: 'You', role: 'HOD · Biology',
      classes: ['Biology · 10A', 'Biology · 10B'],
      coverage: 0.82, gradedOnTime: 0.91,
      learners: 62, avg: 78,
    },
    {
      id: 't2', name: 'Ms. Achieng', role: 'Biology Teacher',
      classes: ['Biology · 11A', 'Chemistry · 10A'],
      coverage: 0.94, gradedOnTime: 0.88,
      learners: 58, avg: 81,
    },
    {
      id: 't3', name: 'Mr. Kimani', role: 'Science Teacher',
      classes: ['Science · 8', 'Science · 9'],
      coverage: 0.71, gradedOnTime: 0.66,
      learners: 68, avg: 72,
    },
    {
      id: 't4', name: 'Mr. Otieno', role: 'Biology Teacher',
      classes: ['Biology · 9A', 'Biology · 9B'],
      coverage: 0.88, gradedOnTime: 0.94,
      learners: 64, avg: 75,
    },
  ],
};

/* -------------------- components -------------------- */

function CoverageBar({ value, tone, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.coverageTrack}>
      <View
        style={[
          styles.coverageFill,
          { width: `${Math.round(value * 100)}%`, backgroundColor: tone },
        ]}
      />
    </View>
  );
}

function TeacherCard({ teacher, onPress, colors }) {
  const styles = makeStyles(colors);
  const coverage = Math.round(teacher.coverage * 100);
  const onTime = Math.round(teacher.gradedOnTime * 100);
  const coverageTone =
    coverage >= 85 ? '#4caf7d' :
    coverage >= 70 ? '#e0a93a' : '#e25b5b';
  const onTimeTone =
    onTime >= 85 ? '#4caf7d' :
    onTime >= 70 ? '#e0a93a' : '#e25b5b';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHead}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {teacher.name.replace('Mr. ', '').replace('Ms. ', '').replace('Mrs. ', '').slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>{teacher.name}</Text>
          <Text style={styles.role} numberOfLines={1}>{teacher.role}</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </View>

      <View style={styles.classChips}>
        {teacher.classes.map((c, i) => (
          <View key={i} style={styles.classChip}>
            <Text style={styles.classChipText} numberOfLines={1}>{c}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsBlock}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Syllabus coverage</Text>
          <Text style={[styles.statValue, { color: coverageTone }]}>{coverage}%</Text>
        </View>
        <CoverageBar value={teacher.coverage} tone={coverageTone} colors={colors} />

        <View style={[styles.statRow, { marginTop: 8 }]}>
          <Text style={styles.statLabel}>Graded on time</Text>
          <Text style={[styles.statValue, { color: onTimeTone }]}>{onTime}%</Text>
        </View>
        <CoverageBar value={teacher.gradedOnTime} tone={onTimeTone} colors={colors} />

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{teacher.learners} learners</Text>
          <Text style={styles.metaText}>Avg {teacher.avg}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherDepartmentTeachers({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return DEPARTMENT.teachers;
    const q = query.trim().toLowerCase();
    return DEPARTMENT.teachers.filter((t) =>
      t.name.toLowerCase().includes(q) ||
      t.role.toLowerCase().includes(q) ||
      t.classes.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  const summary = useMemo(() => {
    const count = DEPARTMENT.teachers.length;
    const learners = DEPARTMENT.teachers.reduce((a, t) => a + t.learners, 0);
    const avg = Math.round(
      DEPARTMENT.teachers.reduce((a, t) => a + t.avg, 0) / count
    );
    const coverage = Math.round(
      (DEPARTMENT.teachers.reduce((a, t) => a + t.coverage, 0) / count) * 100
    );
    return { count, learners, avg, coverage };
  }, []);

  const invite = () => {
    Alert.alert(
      'Invite teacher',
      'Send a request to the administration to add a teacher to this department?',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Send' }]
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DEPARTMENT TEACHERS</Text>
          <TouchableOpacity onPress={invite} hitSlop={8}>
            <Ionicons name="add" size={22} color={colors.accent} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary */}
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}>// {DEPARTMENT.name.toUpperCase()}</Text>
            <Text style={styles.bannerTitle}>{summary.count} teachers</Text>
            <Text style={styles.bannerMeta}>
              {summary.learners} learners · avg {summary.avg}% · {summary.coverage}% coverage
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchRow}>
            <Ionicons name="search" size={14} color={colors.fgMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, role or class…"
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

          {/* Teachers */}
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Feather name="users" size={28} color={colors.fgFaint} />
              <Text style={styles.emptyText}>No teachers match</Text>
            </View>
          ) : (
            filtered.map((t) => (
              <TeacherCard
                key={t.id}
                teacher={t}
                onPress={() =>
                  navigation?.navigate('Teacher-Teacher-Detail', { teacher: t })
                }
                colors={colors}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}