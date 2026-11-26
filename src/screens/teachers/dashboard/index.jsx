// TeacherDashboard.jsx
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
      <Text style={styles.scheduleRoom}>
        {item.room}{item.size ? ` · ${item.size}` : ''}
      </Text>
    </View>
  );
}

/* ---------- Action Required widget ---------- */

function ActionRow({ item, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dotColor =
    item.urgency === 'overdue' ? '#e25b5b' :
    item.urgency === 'today'   ? colors.accent :
    colors.fgFaint;

  return (
    <TouchableOpacity
      style={styles.actionRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.actionDot, { backgroundColor: dotColor }]} />
      <View style={styles.actionBody}>
        <Text style={styles.actionTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.actionMeta,
            item.urgency === 'overdue' && { color: '#e25b5b' },
            item.urgency === 'today' && { color: colors.accent },
          ]}
          numberOfLines={1}
        >
          {item.meta}
        </Text>
      </View>
      <View style={styles.actionChip}>
        <Text style={styles.actionChipText}>{item.cta}</Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function ActionRequiredWidget({ items, totalCount, onSeeAll, onItemPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const capped = items.slice(0, 4);
  const isEmpty = items.length === 0;

  return (
    <View style={styles.dueWidget}>
      <View style={styles.dueHeader}>
        <Text style={styles.dueHeaderTitle}>ACTION REQUIRED</Text>
        {totalCount > 0 && (
          <View style={styles.dueCountPill}>
            <Text style={styles.dueCountText}>{totalCount}</Text>
          </View>
        )}
      </View>

      {isEmpty ? (
        <View style={styles.dueEmpty}>
          <Text style={styles.dueEmptyEmoji}>✅</Text>
          <Text style={styles.dueEmptyTitle}>All caught up</Text>
          <Text style={styles.dueEmptySub}>Nothing pending your review.</Text>
        </View>
      ) : (
        <>
          <View style={styles.dueList}>
            {capped.map((item) => (
              <ActionRow
                key={item.id}
                item={item}
                onPress={() => onItemPress?.(item)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.dueSeeAll}
            onPress={onSeeAll}
            activeOpacity={0.7}
          >
            <Text style={styles.dueSeeAllText}>
              SEE ALL {totalCount} ITEMS →
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/* ---------- My Classes horizontal strip ---------- */

function ClassCard({ item, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.classCard} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.classCode}>{item.code}</Text>
      <Text style={styles.className} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.classMeta}>{item.students} students</Text>
      <View style={styles.classFooter}>
        <Text style={styles.classFooterText}>{item.nextLabel}</Text>
        <Ionicons name="chevron-forward" size={12} color={colors.fgMuted} />
      </View>
    </TouchableOpacity>
  );
}

/* ---------- Quick Actions ---------- */

function QuickAction({ icon, label, onPress, accent }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.quickAction, accent && styles.quickActionAccent]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={18} color={accent ? colors.accent : colors.fg} />
      <Text style={[styles.quickActionText, accent && { color: colors.accent }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------- sample data ---------- */

const SAMPLE_TEACHING_SCHEDULE = [
  { time: '08:00–08:40', subject: 'Biology · 10A', room: 'Lab 2', size: 32, status: 'past'    },
  { time: '08:45–09:25', subject: 'Biology · 10B', room: 'Lab 2', size: 30, status: 'past'    },
  { time: '09:30–10:10', subject: 'Biology · 11A', room: 'Rm 4',  size: 28, status: 'current' },
  { time: '10:25–11:05', subject: 'Free period',   room: '—',     size: null, status: 'upcoming'},
];

const SAMPLE_MY_CLASSES = [
  { id: 'c1', code: 'BIO-10A', name: 'Biology · Grade 10A', students: 32, nextLabel: 'Period 2 · 08:45' },
  { id: 'c2', code: 'BIO-10B', name: 'Biology · Grade 10B', students: 30, nextLabel: 'Period 3 · 09:30' },
  { id: 'c3', code: 'BIO-11A', name: 'Biology · Grade 11A', students: 28, nextLabel: 'Tomorrow · 08:00' },
];

const SAMPLE_ACTIONS = [
  { id: 'a1', title: 'Grade Lab Report — 10A',   meta: '18 of 32 graded · due today', urgency: 'today',   cta: 'GRADE'   },
  { id: 'a2', title: 'Mark attendance — 10B',    meta: 'Period 2 · 08:45',           urgency: 'today',   cta: 'MARK'    },
  { id: 'a3', title: 'Grade Quiz 3 — 11A',       meta: 'Overdue by 2 days',           urgency: 'overdue', cta: 'GRADE'   },
  { id: 'a4', title: 'Publish Assignment 5',     meta: 'Draft · due tomorrow',        urgency: 'today',   cta: 'PUBLISH' },
  { id: 'a5', title: 'Parent message — J. Doe',  meta: 'Unread',                      urgency: 'today',   cta: 'REPLY'   },
];

const SAMPLE_ANNOUNCEMENTS = [
  'Sports Day moved to Friday',
  'Term 2 exams start Nov 3',
];

export default function TeacherDashboard({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [scheduleView, setScheduleView] = useState('day');

  const actions = useMemo(() => SAMPLE_ACTIONS, []);
  const totalActions = actions.length;

  const handleActionPress = (item) => {
    switch (item.cta) {
      case 'GRADE':
        navigation?.navigate('Teacher-Task-Detail', { taskId: item.id });
        break;
      case 'MARK':
        navigation?.navigate('Teacher-Attendance-Mark', { classId: 'BIO-10B' });
        break;
      case 'PUBLISH':
        navigation?.navigate('Teacher-Task-Detail', { taskId: item.id });
        break;
      case 'REPLY':
        navigation?.navigate('Teacher-Messages', { threadId: item.id });
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== NEXT CLASS TO TEACH ===== */}
        <View style={styles.nextCard}>
          <Text style={styles.nextLabel}>NEXT CLASS TO TEACH</Text>
          <Text style={styles.nextTitle}>Biology · 11A</Text>
          <Text style={styles.nextMeta}>Rm 4 · in 8 min · 28 students</Text>

          <View style={styles.nextActionsRow}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() =>
                navigation?.navigate('Teacher-Attendance-Mark', { classId: 'BIO-11A' })
              }
            >
              <Text style={styles.nextButtonText}>MARK ATTENDANCE →</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButtonGhost}
              onPress={() =>
                navigation?.navigate('Teacher-Class-Detail', { classId: 'BIO-11A' })
              }
            >
              <Text style={styles.nextButtonText}>OPEN CLASS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== STATS ===== */}
        <View style={styles.statsRow}>
          <StatCard value="18" label="TO GRADE" accent />
          <StatCard value="2"  label="ATT DUE"  accent />
          <StatCard value="3"  label="CLASSES" />
          <StatCard value="5"  label="MSGS" />
        </View>

        {/* ===== QUICK ACTIONS ===== */}
        <View style={styles.quickActionRow}>
          <QuickAction
            icon="checkbox-outline"
            label="Attendance"
            accent
            onPress={() => navigation?.navigate('Teacher-Attendance')}
          />
          <QuickAction
            icon="add-circle-outline"
            label="New task"
            onPress={() => navigation?.navigate('Teacher-Tasks-Create')}
          />
          <QuickAction
            icon="cloud-upload-outline"
            label="Upload"
            onPress={() => navigation?.navigate('Teacher-Materials-Form')}
          />
        </View>

        {/* ===== ACTION REQUIRED ===== */}
        <ActionRequiredWidget
          items={actions}
          totalCount={totalActions}
          onSeeAll={() => navigation?.navigate('Teacher-Notifications')}
          onItemPress={handleActionPress}
        />

        {/* ===== TODAY'S TEACHING SCHEDULE ===== */}
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
          {SAMPLE_TEACHING_SCHEDULE.map((item, idx) => (
            <ScheduleRow key={idx} item={item} />
          ))}
        </View>

        {/* ===== MY CLASSES ===== */}
        <SectionHeader
          title="MY CLASSES"
          action="SEE ALL →"
          onActionPress={() => navigation?.navigate('Teacher-Classes')}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.classStrip}
        >
          {SAMPLE_MY_CLASSES.map((c) => (
            <ClassCard
              key={c.id}
              item={c}
              onPress={() =>
                navigation?.navigate('Teacher-Class-Detail', { classId: c.id })
              }
            />
          ))}
        </ScrollView>

        {/* ===== ANNOUNCEMENTS ===== */}
        <SectionHeader
          title="ANNOUNCEMENTS"
          action="+ COMPOSE"
          onActionPress={() => navigation?.navigate('Teacher-Announcements-Create')}
        />

        <View style={styles.listBlock}>
          {SAMPLE_ANNOUNCEMENTS.map((text, idx) => (
            <View key={idx} style={styles.listRow}>
              <View style={styles.bullet} />
              <Text style={styles.listText} numberOfLines={2}>
                {text}
              </Text>
              <Ionicons name="pencil" size={12} color={colors.fgMuted} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}