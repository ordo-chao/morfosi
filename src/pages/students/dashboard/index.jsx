// Dashboard.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
/* ---------- tiny presentational helpers ---------- */

function SectionHeader({ title, action, onActionPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
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

/* ---------- screen ---------- */

const SAMPLE_SCHEDULE = [
  { time: '08:00–08:40', subject: 'Math',    room: 'Rm 5',  status: 'past' },
  { time: '08:45–09:25', subject: 'English', room: 'Rm 2',  status: 'past' },
  { time: '09:30–10:10', subject: 'Biology', room: 'Lab 2', status: 'current' },
  { time: '10:25–11:05', subject: 'History', room: 'Rm 7',  status: 'upcoming' },
];

const SAMPLE_ASSIGNMENTS = [
  { title: 'Math Worksheet',  due: '4:30 PM', urgency: 'high' },
  { title: 'English Essay',   due: '6:00 PM', urgency: 'high' },
];

const SAMPLE_ANNOUNCEMENTS = [
  'Sports Day moved to Friday',
  'Term 2 exams start Nov 3',
];

export default function Dashboard({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [scheduleView, setScheduleView] = useState('day'); // 'day' | 'week'

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
          onPress={() => navigation?.navigate('Timetable')}
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
      <SectionHeader
        title="TODAY'S SCHEDULE"
        action={null}
      />

      {/* Day / Week toggle */}
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

      {/* ===== ASSIGNMENTS DUE TODAY ===== */}
      <SectionHeader
        title="ASSIGNMENTS DUE TODAY"
        action="SEE ALL →"
        onActionPress={() => navigation?.navigate('Tasks')}
      />

      <View style={styles.listBlock}>
        {SAMPLE_ASSIGNMENTS.map((a, idx) => (
          <View key={idx} style={styles.listRow}>
            <View style={styles.bullet} />
            <Text style={styles.listText} numberOfLines={1}>
              {a.title}
            </Text>
            <Text style={styles.listMeta}>{a.due}</Text>
            <View
              style={[
                styles.urgencyDot,
                a.urgency === 'high'
                  ? styles.urgencyHigh
                  : styles.urgencyNormal,
              ]}
            />
          </View>
        ))}
      </View>

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