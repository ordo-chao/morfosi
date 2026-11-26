// TeacherTasks.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

// status: 'draft' | 'published' | 'closed'
const TASKS = [
  {
    id: 't1', status: 'published', title: 'Biology Lab Report',
    class: 'Biology · 10A', due: 'Today, 5:00 PM',
    submitted: 18, total: 32, graded: 12,
  },
  {
    id: 't2', status: 'published', title: 'Quiz 3 — Cell Structure',
    class: 'Biology · 11A', due: 'Yesterday, 3:00 PM',
    submitted: 28, total: 28, graded: 28,
  },
  {
    id: 't3', status: 'published', title: 'Photosynthesis Worksheet',
    class: 'Biology · 10B', due: 'Thu, 9:00 AM',
    submitted: 6, total: 30, graded: 0,
  },
  {
    id: 't4', status: 'draft', title: 'Ecosystem Field Notes',
    class: 'Biology · 10A', due: 'Not set',
    submitted: 0, total: 0, graded: 0,
  },
  {
    id: 't5', status: 'closed', title: 'Mid-Term Exam',
    class: 'Biology · 10A', due: 'Oct 15',
    submitted: 31, total: 32, graded: 31,
  },
];

const FILTERS = [
  { key: 'all',       label: 'ALL' },
  { key: 'published', label: 'PUBLISHED' },
  { key: 'draft',     label: 'DRAFTS' },
  { key: 'needs-grading', label: 'NEEDS GRADING' },
  { key: 'closed',    label: 'CLOSED' },
];

function matchesFilter(task, filter) {
  if (filter === 'all') return true;
  if (filter === 'needs-grading') return task.submitted > task.graded;
  return task.status === filter;
}

/* -------------------- components -------------------- */

function FilterChip({ filter, active, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );
}

function TaskCard({ task, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const accent =
    task.status === 'draft'     ? colors.fgMuted :
    task.status === 'closed'    ? '#4d7cff' :
    task.submitted > task.graded ? colors.accent :
    '#4caf7d';

  const pending = task.submitted - task.graded;

  const badge =
    task.status === 'draft'  ? 'DRAFT' :
    task.status === 'closed' ? 'CLOSED' :
    pending > 0              ? `${pending} TO GRADE` :
    'UP TO DATE';

  return (
    <TouchableOpacity
      style={[styles.taskCard, { borderLeftColor: accent }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
        <View style={[styles.taskBadge, { borderColor: accent }]}>
          <Text style={[styles.taskBadgeText, { color: accent }]}>{badge}</Text>
        </View>
      </View>

      <Text style={styles.taskMeta} numberOfLines={1}>
        {task.class} · Due {task.due}
      </Text>

      {task.total > 0 && (
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round((task.submitted / task.total) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {task.submitted}/{task.total} submitted · {task.graded} graded
          </Text>
        </View>
      )}

      <View style={styles.taskFooter}>
        <Text style={[styles.taskAction, { color: accent }]}>
          {task.status === 'draft'  ? 'CONTINUE EDITING' :
           task.status === 'closed' ? 'VIEW RESULTS' :
           pending > 0              ? 'GRADE SUBMISSIONS' :
           'VIEW SUBMISSIONS'}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherTasks({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(
    () => TASKS.filter((t) => matchesFilter(t, filter)),
    [filter],
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY TASKS</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="search" size={20} color={colors.fg} />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={8}
              onPress={() => navigation?.navigate('Teacher-Tasks-Create')}
            >
              <Ionicons name="add" size={24} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsRow}
        >
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              filter={f}
              active={filter === f.key}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </ScrollView>

        {/* List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
              colors={[colors.accent]}
            />
          }
        >
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="document-text-outline" size={32} color={colors.fgFaint} />
              <Text style={styles.emptyText}>No tasks here</Text>
              <Text style={styles.emptySub}>
                {filter === 'all'
                  ? 'Tap + to create your first task.'
                  : 'No tasks match this filter.'}
              </Text>
            </View>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onPress={() => {
                  if (task.status === 'draft') {
                    navigation?.navigate('Teacher-Tasks-Edit', { task });
                  } else {
                    navigation?.navigate('Teacher-Task-Detail', { task });
                  }
                }}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}