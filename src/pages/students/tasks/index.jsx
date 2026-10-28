// Tasks.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

// Status: 'overdue' | 'today' | 'week' | 'submitted' | 'graded'
const TASKS = [
  {
    id: '1', status: 'overdue', title: 'Math Worksheet',
    subject: 'Math', teacher: 'Mr. Kariuki',
    due: 'Oct 25, 4:30 PM', overdueBy: '1d', action: 'SUBMIT NOW',
  },
  {
    id: '2', status: 'overdue', title: 'English Essay',
    subject: 'English', teacher: 'Mrs. Wanjiru',
    due: 'Oct 26, 6:00 PM', overdueBy: '2h', action: 'SUBMIT NOW',
  },
  {
    id: '3', status: 'today', title: 'Biology Lab Report',
    subject: 'Biology', teacher: 'Mr. Otieno',
    due: 'Today, 5:00 PM', countdown: '4h 12m', action: 'OPEN',
  },
  {
    id: '4', status: 'week', title: 'Chemistry Problem Set',
    subject: 'Chemistry', teacher: 'Ms. Achieng',
    due: 'Thu, 3:00 PM', action: 'OPEN',
  },
  {
    id: '5', status: 'week', title: 'History Timeline Project',
    subject: 'History', teacher: 'Mr. Mwangi',
    due: 'Fri, 9:00 AM', group: '2 members', action: 'OPEN',
  },
  {
    id: '6', status: 'week', title: 'Geography Map Exercise',
    subject: 'Geography', teacher: 'Ms. Njeri',
    due: 'Sun, 11:59 PM', action: 'OPEN',
  },
  {
    id: '7', status: 'submitted', title: 'Physics Quiz',
    subject: 'Physics', teacher: 'Mr. Wekesa',
    due: 'Submitted Oct 24, 5:02 PM', action: 'VIEW SUBMISSION',
  },
  {
    id: '8', status: 'graded', title: 'Math Quiz 3',
    subject: 'Math', teacher: 'Mr. Kariuki',
    due: 'Graded Oct 22', grade: 'B+', score: '82%', action: 'VIEW FEEDBACK',
  },
];

const FILTERS = [
  { key: 'all',       label: 'ALL' },
  { key: 'due',       label: 'DUE' },
  { key: 'overdue',   label: 'OVERDUE' },
  { key: 'submitted', label: 'SUBMITTED' },
  { key: 'graded',    label: 'GRADED' },
];

// Groups in urgency order
const GROUPS = [
  { key: 'overdue',   label: 'OVERDUE',       colorKey: 'danger', emoji: '🔴' },
  { key: 'today',     label: 'DUE TODAY',     colorKey: 'accent', emoji: '🟠' },
  { key: 'week',      label: 'DUE THIS WEEK', colorKey: 'warning', emoji: '🟡' },
  { key: 'submitted', label: 'SUBMITTED',     colorKey: 'success', emoji: '🟢' },
  { key: 'graded',    label: 'GRADED',        colorKey: 'muted',  emoji: '⚪' },
];

/* -------------------- helpers -------------------- */

function matchesFilter(task, filter) {
  if (filter === 'all') return true;
  if (filter === 'due') return task.status === 'today' || task.status === 'week';
  return task.status === filter;
}

function groupColor(colorKey, colors) {
  switch (colorKey) {
    case 'danger':  return '#e25b5b';
    case 'accent':  return colors.accent;
    case 'warning': return '#e0a93a';
    case 'success': return '#4caf7d';
    default:        return colors.fgMuted;
  }
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
    task.status === 'overdue'   ? '#e25b5b' :
    task.status === 'today'     ? colors.accent :
    task.status === 'week'      ? '#e0a93a' :
    task.status === 'submitted' ? '#4caf7d' :
    colors.fgMuted;

  const badgeText =
    task.status === 'overdue'   ? `⚠ OVERDUE ${task.overdueBy}` :
    task.status === 'today'     ? `DUE ${task.countdown}` :
    task.status === 'submitted' ? '✓ SUBMITTED' :
    task.status === 'graded'    ? `${task.grade} · ${task.score}` :
    null;

  return (
    <TouchableOpacity
      style={[styles.taskCard, { borderLeftColor: accent }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {task.title}
        </Text>
        {badgeText && (
          <View style={[styles.taskBadge, { borderColor: accent }]}>
            <Text style={[styles.taskBadgeText, { color: accent }]}>
              {badgeText}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.taskMeta} numberOfLines={1}>
        {task.subject} · {task.teacher} · {task.due}
        {task.group ? ` · ${task.group}` : ''}
      </Text>

      <View style={styles.taskFooter}>
        <Text style={[styles.taskAction, { color: accent }]}>
          {task.action}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
      </View>
    </TouchableOpacity>
  );
}

function GroupHeader({ group, count, colors }) {
  const styles = makeStyles(colors);
  const tint = groupColor(group.colorKey, colors);
  return (
    <View style={styles.groupHeader}>
      <Text style={styles.groupEmoji}>{group.emoji}</Text>
      <Text style={[styles.groupLabel, { color: tint }]}>
        {group.label}
      </Text>
      <Text style={styles.groupCount}>({count})</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Tasks({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredTasks = useMemo(
    () => TASKS.filter((t) => matchesFilter(t, filter)),
    [filter]
  );

  // Group by status, keeping only groups that have items
  const grouped = useMemo(() => {
    return GROUPS
      .map((g) => ({
        group: g,
        items: filteredTasks.filter((t) => t.status === g.key),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredTasks]);

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
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="options-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter chips */}
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
        {grouped.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="checkmark-done-outline" size={32} color={colors.fgFaint} />
            <Text style={styles.emptyText}>Nothing here</Text>
            <Text style={styles.emptySub}>
              {filter === 'all'
                ? 'No tasks assigned yet.'
                : 'No tasks match this filter.'}
            </Text>
          </View>
        ) : (
          grouped.map(({ group, items }) => (
            <View key={group.key} style={styles.groupBlock}>
              <GroupHeader group={group} count={items.length} colors={colors} />
              {items.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() =>
                    navigation?.navigate('Student-Tasks-Detail', { task })
                  }
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
    </Layout>
  );
}