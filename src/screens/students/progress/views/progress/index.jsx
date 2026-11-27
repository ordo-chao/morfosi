// revision/progress/views/progress/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const OVERALL = {
  grade: 'B+',
  pct: 78,
  rank: 2,
  outOf: 42,
  deltaFromLast: 4,
  term: 'Term 2',
};

const SUBJECTS = [
  { name: 'Math',      grade: 'A-', pct: 85, trend: 'up',   delta: 3 },
  { name: 'English',   grade: 'B+', pct: 79, trend: 'flat', delta: 0 },
  { name: 'Biology',   grade: 'A',  pct: 88, trend: 'up',   delta: 5 },
  { name: 'Chemistry', grade: 'B',  pct: 74, trend: 'down', delta: -2 },
  { name: 'Physics',   grade: 'B-', pct: 71, trend: 'flat', delta: 0 },
  { name: 'History',   grade: 'A-', pct: 84, trend: 'up',   delta: 4 },
  { name: 'Geography', grade: 'B+', pct: 78, trend: 'flat', delta: 0 },
  { name: 'Kiswahili', grade: 'A',  pct: 90, trend: 'up',   delta: 2 },
];

const STRENGTHS = ['Kiswahili', 'Cell biology', 'Algebra'];
const WEAK_HIGH = ['Organic chemistry', 'Quadratic equations'];
const WEAK_MED  = ['Waves', 'Probability'];

const SUGGESTIONS = [
  {
    id: 's1',
    title: 'Practice 10 organic chemistry questions',
    sub: null,
  },
  {
    id: 's2',
    title: 'Review KCSE 2023 Math Paper 2 · Q30–40',
    sub: 'Quadratic equations',
  },
];

/* -------------------- helpers -------------------- */

function trendTint(trend, colors) {
  if (trend === 'up') return '#4caf7d';
  if (trend === 'down') return '#e25b5b';
  return colors.fgMuted;
}

function trendGlyph(trend) {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}

/* -------------------- components -------------------- */

function SubjectRow({ s, colors }) {
  const styles = makeStyles(colors);
  const tint = trendTint(s.trend, colors);
  const barPct = Math.max(0, Math.min(100, s.pct));

  return (
    <View style={styles.subjectRow}>
      <Text style={styles.subjectName} numberOfLines={1}>
        {s.name}
      </Text>
      <Text style={styles.subjectGrade}>{s.grade}</Text>
      <Text style={styles.subjectPct}>{s.pct}%</Text>
      <View style={styles.subjectBarWrap}>
        <View style={styles.subjectBarTrack}>
          <View
            style={[
              styles.subjectBarFill,
              { width: `${barPct}%`, backgroundColor: colors.accent },
            ]}
          />
        </View>
      </View>
      <Text style={[styles.subjectTrend, { color: tint }]}>
        {trendGlyph(s.trend)} {s.delta > 0 ? '+' : ''}{s.delta}
      </Text>
    </View>
  );
}

/* -------------------- view -------------------- */

export default function ProgressView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const handleStartSuggestion = (s) => {
    Alert.alert('Practice', s.title);
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
      {/* ===== OVERALL ===== */}
      <Text style={styles.sectionTitle}>OVERALL</Text>
      <View style={styles.overallCard}>
        <View style={styles.overallTopRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.gradeLine}>
              <Text style={styles.overallGrade}>{OVERALL.grade}</Text>
              <Text style={styles.overallDot}>·</Text>
              <Text style={styles.overallPct}>{OVERALL.pct}%</Text>
            </View>
            <Text style={styles.rankLine}>
              Rank {OVERALL.rank} / {OVERALL.outOf}
            </Text>
          </View>
          <View style={styles.deltaPill}>
            <Text style={styles.deltaPillText}>
              ▲ +{OVERALL.deltaFromLast}% from last term
            </Text>
          </View>
        </View>
      </View>

      {/* ===== BY SUBJECT ===== */}
      <Text style={styles.sectionTitle}>BY SUBJECT</Text>
      <View style={styles.subjectBlock}>
        {SUBJECTS.map((s) => (
          <SubjectRow key={s.name} s={s} colors={colors} />
        ))}
      </View>

      {/* ===== STRENGTHS ===== */}
      <Text style={styles.sectionTitle}>STRENGTHS</Text>
      <View style={styles.chipBlock}>
        {STRENGTHS.map((s) => (
          <View key={s} style={styles.chipGood}>
            <Text style={styles.chipGoodText}>✅ {s}</Text>
          </View>
        ))}
      </View>

      {/* ===== NEEDS WORK ===== */}
      <Text style={styles.sectionTitle}>NEEDS WORK</Text>
      <View style={styles.chipBlock}>
        {WEAK_HIGH.map((s) => (
          <View key={s} style={styles.chipBad}>
            <Text style={styles.chipBadText}>🔴 {s}</Text>
          </View>
        ))}
        {WEAK_MED.map((s) => (
          <View key={s} style={styles.chipWarn}>
            <Text style={styles.chipWarnText}>🟠 {s}</Text>
          </View>
        ))}
      </View>

      {/* ===== STUDY SUGGESTIONS ===== */}
      <Text style={styles.sectionTitle}>STUDY SUGGESTIONS</Text>
      <View style={styles.suggestionsBlock}>
        {SUGGESTIONS.map((s) => (
          <View key={s.id} style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>{s.title}</Text>
            {s.sub ? (
              <Text style={styles.suggestionSub}>({s.sub})</Text>
            ) : null}
            <TouchableOpacity
              style={styles.suggestionBtn}
              onPress={() => handleStartSuggestion(s)}
              activeOpacity={0.7}
            >
              <Text style={styles.suggestionBtnText}>START →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ===== FULL REPORT ===== */}
      <TouchableOpacity
        style={styles.fullReportBtn}
        onPress={() => navigation?.navigate('Student-Full-Report')}
        activeOpacity={0.7}
      >
        <Ionicons name="stats-chart-outline" size={16} color={colors.fg} />
        <Text style={styles.fullReportBtnText}>FULL REPORT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}