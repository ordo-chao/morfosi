// revision/progress/views/streaks/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const STREAK = 14;
const DAYS_GRID = [
  // 2 weeks of Mon–Sun, current day is the last one
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: true },
  { day: 'S', done: true },
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: true },
  { day: 'S', done: true, current: true },
];

const ACHIEVEMENTS = [
  { emoji: '🏆', label: '7-day streak' },
  { emoji: '🏆', label: '10 past papers completed' },
  { emoji: '🏆', label: '100 flashcards reviewed' },
];

/* -------------------- view -------------------- */

export default function StreaksView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const handleStartSession = () => {
    Alert.alert('Start session', '15-minute study session started.');
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: 24 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== HERO STREAK ===== */}
      <View style={styles.heroBlock}>
        <Text style={styles.flameEmoji}>🔥</Text>
        <Text style={styles.streakNum}>{STREAK}</Text>
        <Text style={styles.streakLabel}>DAY STREAK</Text>
      </View>

      {/* ===== CALENDAR ===== */}
      <View style={styles.calendarBlock}>
        <View style={styles.weekHeader}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <Text key={`h${i}`} style={styles.weekHeaderCell}>{d}</Text>
          ))}
        </View>
        <View style={styles.weekGrid}>
          {DAYS_GRID.map((d, i) => (
            <View
              key={i}
              style={[
                styles.dayCell,
                d.done && styles.dayCellDone,
                d.current && styles.dayCellCurrent,
              ]}
            >
              <Text
                style={[
                  styles.dayCellText,
                  d.done && styles.dayCellTextDone,
                  d.current && styles.dayCellTextCurrent,
                ]}
              >
                {d.done ? '✓' : d.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ===== ACHIEVEMENTS ===== */}
      <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
      <View style={styles.achievementsBlock}>
        {ACHIEVEMENTS.map((a, i) => (
          <View key={i} style={styles.achievementRow}>
            <Text style={styles.achievementEmoji}>{a.emoji}</Text>
            <Text style={styles.achievementLabel}>{a.label}</Text>
          </View>
        ))}
      </View>

      {/* ===== TODAY ===== */}
      <Text style={styles.sectionTitle}>TODAY</Text>
      <View style={styles.todayCard}>
        <Text style={styles.todayText}>
          Study 15 more minutes to keep your streak.
        </Text>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={handleStartSession}
          activeOpacity={0.7}
        >
          <Ionicons name="flash" size={14} color={colors.buttonFg} />
          <Text style={styles.startBtnText}>START 15-MIN SESSION</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}