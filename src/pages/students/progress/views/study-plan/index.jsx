// revision/progress/views/study-plan/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const PLAN = {
  daysUntilExam: 12,
  examLabel: 'KCSE',
  today: {
    label: 'Today · Tue 27 Oct',
    items: [
      { id: 'p1', status: 'done',    duration: 30, type: 'Biology · Cell division' },
      { id: 'p2', status: 'done',    duration: 20, type: 'Flashcards · Chemistry' },
      { id: 'p3', status: 'current', duration: 45, type: 'Past paper · Math Q1–10' },
      { id: 'p4', status: 'upcoming', duration: 30, type: 'AI Tutor · Quadratic equations' },
    ],
  },
  tomorrow: {
    label: 'Tomorrow · Wed 28 Oct',
    items: [
      { id: 'p5', status: 'upcoming', duration: 30, type: 'Biology · Genetics' },
      { id: 'p6', status: 'upcoming', duration: 20, type: 'Flashcards · Chemistry' },
      { id: 'p7', status: 'upcoming', duration: 45, type: 'Past paper · English P1' },
    ],
  },
  week: [
    { day: 'MON', filled: 4, total: 5 },
    { day: 'TUE', filled: 2, total: 5 },
    { day: 'WED', filled: 0, total: 5 },
    { day: 'THU', filled: 0, total: 5 },
    { day: 'FRI', filled: 0, total: 5 },
    { day: 'SAT', filled: 0, total: 5 },
    { day: 'SUN', filled: 0, total: 5 },
  ],
};

/* -------------------- components -------------------- */

function PlanItem({ item, colors }) {
  const styles = makeStyles(colors);

  const icon =
    item.status === 'done' ? '✅' :
    item.status === 'current' ? '▶' : '○';

  const tint =
    item.status === 'done' ? '#4caf7d' :
    item.status === 'current' ? colors.accent :
    colors.fgMuted;

  return (
    <View style={[styles.planRow, { borderLeftColor: tint }]}>
      <Text style={styles.planIcon}>{icon}</Text>
      <Text style={styles.planDuration}>{item.duration} min</Text>
      <Text style={styles.planText} numberOfLines={2}>
        {item.type}
      </Text>
    </View>
  );
}

/* -------------------- view -------------------- */

export default function StudyPlanView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: 24 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== DAYS UNTIL ===== */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownNum}>{PLAN.daysUntilExam}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.countdownLabel}>
            DAYS UNTIL {PLAN.examLabel}
          </Text>
          <Text style={styles.countdownSub}>
            Stay on plan to finish all topics.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => Alert.alert('Edit plan', 'Coming soon')}
          hitSlop={6}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil" size={12} color={colors.fg} />
          <Text style={styles.editBtnText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* ===== TODAY ===== */}
      <Text style={styles.sectionTitle}>{PLAN.today.label.toUpperCase()}</Text>
      <View style={styles.planBlock}>
        {PLAN.today.items.map((it) => (
          <PlanItem key={it.id} item={it} colors={colors} />
        ))}
      </View>

      {/* ===== TOMORROW ===== */}
      <Text style={styles.sectionTitle}>{PLAN.tomorrow.label.toUpperCase()}</Text>
      <View style={styles.planBlock}>
        {PLAN.tomorrow.items.map((it) => (
          <PlanItem key={it.id} item={it} colors={colors} />
        ))}
      </View>

      {/* ===== THIS WEEK ===== */}
      <Text style={styles.sectionTitle}>THIS WEEK</Text>
      <View style={styles.weekRow}>
        {PLAN.week.map((d) => {
          const pct = Math.min(1, d.filled / d.total);
          return (
            <View key={d.day} style={styles.weekCol}>
              <View style={styles.weekBarTrack}>
                <View
                  style={[
                    styles.weekBarFill,
                    {
                      height: `${Math.max(4, pct * 100)}%`,
                      backgroundColor: pct === 0 ? c.surfaceHi : colors.accent,
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekDayLabel}>{d.day}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}