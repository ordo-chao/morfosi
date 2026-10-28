// Dashboard.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* ---------- tiny presentational helpers ---------- */

function SectionHeader({ title, action, onActionPress, badge }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {badge != null && badge > 0 && (
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {action ? (
        <TouchableOpacity onPress={onActionPress} hitSlop={8}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function StatCard({ value, label, accent }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.statCard, accent && styles.statCardAccent]}>
      <Text style={[styles.statValue, accent && styles.statValueAccent]}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ScheduleRow({ item }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dotStyle =
    item.status === 'current'
      ? styles.dotCurrent
      : item.status === 'past'
      ? styles.dotPast
      : styles.dotUpcoming;

  const rowStyle = item.status === 'current' && styles.scheduleRowCurrent;

  return (
    <View style={[styles.scheduleRow, rowStyle]}>
      <View style={[styles.dot, dotStyle]} />
      <Text style={styles.scheduleTime}>{item.time}</Text>
      <Text style={styles.scheduleSubject} numberOfLines={1}>
        {item.subject}
      </Text>
      <Text style={styles.scheduleRoom}>{item.room}</Text>
    </View>
  );
}

/* ---------- Tasks Due Today widget ---------- */

function DueTaskRow({ task, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dotColor =
    task.status === 'overdue' ? '#e25b5b' :
    task.status === 'today'   ? colors.accent :
    colors.fgFaint;

  const meta =
    task.status === 'overdue'
      ? `OVERDUE ${task.overdueBy}`
      : task.status === 'today'
      ? `${task.countdown} left`
      : 'No due time';

  return (
    <TouchableOpacity
      style={styles.dueRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.dueDot, { backgroundColor: dotColor }]} />
      <Text style={styles.dueTitle} numberOfLines={1}>
        {task.title}
      </Text>
      <Text
        style={[
          styles.dueMeta,
          task.status === 'overdue' && { color: '#e25b5b' },
          task.status === 'today' && { color: colors.accent },
        ]}
      >
        {meta}
      </Text>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function DueTodayWidget({ tasks, totalCount, onSeeAll, onTaskPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const capped = tasks.slice(0, 3);
  const isEmpty = tasks.length === 0;

  return (
    <View style={styles.dueWidget}>
      <View style={styles.dueHeader}>
        <Text style={styles.dueHeaderTitle}>TASKS DUE TODAY</Text>
        {totalCount > 0 && (
          <View style={styles.dueCountPill}>
            <Text style={styles.dueCountText}>{totalCount}</Text>
          </View>
        )}
      </View>

      {isEmpty ? (
        <View style={styles.dueEmpty}>
          <Text style={styles.dueEmptyEmoji}>🎉</Text>
          <Text style={styles.dueEmptyTitle}>Nothing due today</Text>
          <Text style={styles.dueEmptySub}>Nice! Take a breather.</Text>
        </View>
      ) : (
        <>
          <View style={styles.dueList}>
            {capped.map((task) => (
              <DueTaskRow
                key={task.id}
                task={task}
                onPress={() => onTaskPress?.(task)}
              />
            ))}
          </View>

          {/* Always present when there's anything to see */}
          <TouchableOpacity
            style={styles.dueSeeAll}
            onPress={onSeeAll}
            activeOpacity={0.7}
          >
            <Text style={styles.dueSeeAllText}>
              SEE ALL {totalCount} TASKS →
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/* ---------- screen ---------- */

const SAMPLE_SCHEDULE = [
  { time: '08:00–08:40', subject: 'Math',    room: 'Rm 5',  status: 'past' },
  { time: '08:45–09:25', subject: 'English', room: 'Rm 2',  status: 'past' },
  { time: '09:30–10:10', subject: 'Biology', room: 'Lab 2', status: 'current' },
  { time: '10:25–11:05', subject: 'History', room: 'Rm 7',  status: 'upcoming' },
];

const SAMPLE_ANNOUNCEMENTS = [
  'Sports Day moved to Friday',
  'Term 2 exams start Nov 3',
];

// Source of truth for the widget: everything *not* done yet.
const SAMPLE_DUE_TASKS = [
  { id: 't1', title: 'Biology Lab Report', status: 'today',   countdown: '4h 12m' },
  { id: 't2', title: 'Math Worksheet',     status: 'today',   countdown: '6h 30m' },
  { id: 't3', title: 'Reading Log',        status: 'no-time', countdown: null       },
];

// Sort: overdue → today → no-time.
function buildDueTasks(tasks) {
  const weight = { overdue: 0, today: 1, 'no-time': 2 };
  return [...tasks].sort((a, b) => {
    const dw = weight[a.status] - weight[b.status];
    if (dw !== 0) return dw;
    return 0;
  });
}

export default function Dashboard({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [scheduleView, setScheduleView] = useState('day');

  const dueTasks = useMemo(() => buildDueTasks(SAMPLE_DUE_TASKS), []);
  const totalCount = dueTasks.length;

  return (
    <Layout>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== NEXT CLASS CARD ===== */}
        <View style={styles.nextCard}>
          <Text style={styles.nextLabel}>NEXT CLASS</Text>
          <Text style={styles.nextTitle}>Biology · Mr. Otieno</Text>
          <Text style={styles.nextMeta}>Lab 2 · in 12 min</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation?.navigate('Student-Classes')}
          >
            <Text style={styles.nextButtonText}>VIEW TIMETABLE →</Text>
          </TouchableOpacity>
        </View>

        {/* ===== STATS ===== */}
        <View style={styles.statsRow}>
          <StatCard value="96%" label="ATT" />
          <StatCard value="B+"  label="AVG" />
          <StatCard value="4"   label="DUE" accent />
          <StatCard value="2"   label="NEW" accent />
        </View>

        {/* ===== TODAY'S SCHEDULE ===== */}
        <SectionHeader title="TODAY'S SCHEDULE" />

        <View style={styles.toggleRow}>
          {['day', 'week'].map((mode) => {
            const active = scheduleView === mode;
            return (
              <TouchableOpacity
                key={mode}
                style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                onPress={() => setScheduleView(mode)}
              >
                <Text
                  style={[styles.toggleText, active && styles.toggleTextActive]}
                >
                  {mode.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.scheduleList}>
          {SAMPLE_SCHEDULE.map((item, idx) => (
            <ScheduleRow key={idx} item={item} />
          ))}
        </View>

        {/* ===== TASKS DUE TODAY (compact widget) ===== */}
        <DueTodayWidget
          tasks={dueTasks}
          totalCount={totalCount}
          onSeeAll={() => navigation?.navigate('Student-Tasks')}
          onTaskPress={(task) =>
            navigation?.navigate('Student-Tasks-Detail', { task })
          }
        />

        {/* ===== ANNOUNCEMENTS ===== */}
        <SectionHeader
          title="ANNOUNCEMENTS"
          action="SEE ALL →"
          onActionPress={() => navigation?.navigate('Announcements')}
        />

        <View style={styles.listBlock}>
          {SAMPLE_ANNOUNCEMENTS.map((text, idx) => (
            <View key={idx} style={styles.listRow}>
              <View style={styles.bullet} />
              <Text style={styles.listText} numberOfLines={2}>
                {text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}