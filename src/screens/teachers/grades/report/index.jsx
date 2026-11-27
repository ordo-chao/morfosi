// src/pages/teachers/grades/report/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- data -------------------- */

const BASE_CLASS = { id: 'BIO-10A', name: 'Biology · 10A', term: 'Term 2', subject: 'Biology' };

const STUDENTS = [
  { id: 's1', name: 'Cynthia Njeri',   score: 92, grade: 'A'  },
  { id: 's2', name: 'Amina Wanjiku',   score: 84, grade: 'B+' },
  { id: 's3', name: 'Farid Kariuki',   score: 81, grade: 'B+' },
  { id: 's4', name: 'Esther Achieng',  score: 78, grade: 'B'  },
  { id: 's5', name: 'Grace Muthoni',   score: 74, grade: 'B'  },
  { id: 's6', name: 'Brian Otieno',    score: 72, grade: 'C+' },
  { id: 's7', name: 'David Mwangi',    score: 58, grade: 'D'  },
  { id: 's8', name: 'Henry Omondi',    score: 49, grade: 'E'  },
];

const TOPICS = [
  { name: 'Cell Structure',        classAvg: 82, schoolAvg: 76 },
  { name: 'Photosynthesis',        classAvg: 74, schoolAvg: 71 },
  { name: 'Cellular Respiration',  classAvg: 68, schoolAvg: 72 },
  { name: 'Mitosis & Meiosis',     classAvg: 71, schoolAvg: 69 },
  { name: 'Genetics',              classAvg: 58, schoolAvg: 66 },
];

const BANDS = [
  { label: 'A',  range: '80–100', test: (s) => s >= 80, color: '#4caf7d' },
  { label: 'B',  range: '70–79',  test: (s) => s >= 70 && s < 80, color: '#4d7cff' },
  { label: 'C',  range: '60–69',  test: (s) => s >= 60 && s < 70, color: '#e0a93a' },
  { label: 'D',  range: '50–59',  test: (s) => s >= 50 && s < 60, color: '#e88a3a' },
  { label: 'E',  range: '0–49',   test: (s) => s < 50, color: '#e25b5b' },
];

/* -------------------- components -------------------- */

function StatCell({ value, label, tone, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, tone && { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function BandRow({ band, count, total, colors }) {
  const styles = makeStyles(colors);
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <View style={styles.bandRow}>
      <Text style={[styles.bandLabel, { color: band.color }]}>{band.label}</Text>
      <Text style={styles.bandRange}>{band.range}</Text>
      <View style={styles.bandTrack}>
        <View style={[styles.bandFill, { width: `${pct}%`, backgroundColor: band.color }]} />
      </View>
      <Text style={styles.bandCount}>{count}</Text>
    </View>
  );
}

function StudentRow({ student, rank, onPress, colors }) {
  const styles = makeStyles(colors);
  const tint =
    student.score >= 80 ? '#4caf7d' :
    student.score >= 70 ? '#4d7cff' :
    student.score >= 60 ? '#e0a93a' :
    student.score >= 50 ? '#e88a3a' : '#e25b5b';

  return (
    <TouchableOpacity style={styles.studentRow} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.rank}>#{rank}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
        <Text style={styles.studentMeta}>{student.score}%</Text>
      </View>
      <View style={[styles.gradePill, { borderColor: tint }]}>
        <Text style={[styles.gradePillText, { color: tint }]}>{student.grade}</Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function TopicRow({ topic, colors }) {
  const styles = makeStyles(colors);
  const diff = topic.classAvg - topic.schoolAvg;
  const tone = diff >= 0 ? '#4caf7d' : '#e25b5b';
  const sign = diff >= 0 ? '+' : '';

  return (
    <View style={styles.topicRow}>
      <Text style={styles.topicName} numberOfLines={1}>{topic.name}</Text>
      <View style={styles.topicBarTrack}>
        <View style={[styles.topicBarFill, { width: `${topic.classAvg}%` }]} />
      </View>
      <Text style={styles.topicAvg}>{topic.classAvg}%</Text>
      <Text style={[styles.topicDiff, { color: tone }]}>{sign}{diff}</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherGradesReport({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const cls = useMemo(() => ({ ...BASE_CLASS, ...(route?.params ?? {}) }), [route?.params]);

  const stats = useMemo(() => {
    const scores = STUDENTS.map((s) => s.score);
    const sorted = [...scores].sort((a, b) => a - b);
    const sum = scores.reduce((a, b) => a + b, 0);
    const mean = sum / scores.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const highest = sorted[sorted.length - 1];
    const lowest = sorted[0];
    const atRisk = scores.filter((s) => s < 50).length;
    const passing = scores.filter((s) => s >= 50).length;
    return {
      mean: Math.round(mean),
      median: Math.round(median),
      highest,
      lowest,
      atRisk,
      passRate: Math.round((passing / scores.length) * 100),
    };
  }, []);

  const rankedStudents = useMemo(
    () => [...STUDENTS].sort((a, b) => b.score - a.score),
    [],
  );

  const bandCounts = useMemo(
    () => BANDS.map((b) => ({
      band: b,
      count: STUDENTS.filter((s) => b.test(s.score)).length,
    })),
    [],
  );

  const topStreak = useMemo(() => {
    const sorted = [...TOPICS].sort((a, b) => (b.classAvg - b.schoolAvg) - (a.classAvg - a.schoolAvg));
    return {
      strongest: sorted[0],
      weakest: sorted[sorted.length - 1],
    };
  }, []);

  const exportCsv = () => {
    // TODO: generate and share CSV
    Alert.alert(
      'Export report',
      `Export ${cls.name} · ${cls.term} as CSV?`,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Export' }]
    );
  };

  const viewStudent = (student) => {
    navigation?.navigate('Teacher-Student-Detail', { student, classId: cls.id });
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CLASS REPORT</Text>
          <TouchableOpacity onPress={exportCsv} hitSlop={8}>
            <Feather name="download" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Class banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}>// REPORT</Text>
            <Text style={styles.bannerTitle}>{cls.name}</Text>
            <Text style={styles.bannerMeta}>{cls.subject} · {cls.term} · {STUDENTS.length} students</Text>
          </View>

          {/* Headline stats */}
          <View style={styles.statRow}>
            <StatCell value={`${stats.mean}%`}    label="MEAN"    tone={colors.accent} colors={colors} />
            <StatCell value={`${stats.median}%`}  label="MEDIAN"  colors={colors} />
            <StatCell value={`${stats.highest}%`} label="HIGH"    tone="#4caf7d"        colors={colors} />
            <StatCell value={`${stats.lowest}%`}  label="LOW"     tone="#e25b5b"        colors={colors} />
          </View>

          {/* Secondary stats */}
          <View style={styles.statRow}>
            <StatCell value={`${stats.passRate}%`} label="PASS RATE" colors={colors} />
            <StatCell value={stats.atRisk}          label="AT RISK"   tone={stats.atRisk > 0 ? '#e25b5b' : undefined} colors={colors} />
          </View>

          {/* Grade distribution */}
          <Text style={styles.sectionTitle}>GRADE DISTRIBUTION</Text>
          <View style={styles.bandsBlock}>
            {bandCounts.map(({ band, count }) => (
              <BandRow key={band.label} band={band} count={count} total={STUDENTS.length} colors={colors} />
            ))}
          </View>

          {/* Topic performance */}
          <Text style={styles.sectionTitle}>TOPIC PERFORMANCE</Text>
          <View style={styles.topicsBlock}>
            {TOPICS.map((t, i) => (
              <TopicRow key={i} topic={t} colors={colors} />
            ))}
          </View>

          {/* Strongest / weakest */}
          <View style={styles.insightRow}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>STRONGEST</Text>
              <Text style={styles.insightValue} numberOfLines={2}>{topStreak.strongest.name}</Text>
              <Text style={styles.insightMeta}>{topStreak.strongest.classAvg}% avg</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>NEEDS WORK</Text>
              <Text style={styles.insightValue} numberOfLines={2}>{topStreak.weakest.name}</Text>
              <Text style={styles.insightMeta}>{topStreak.weakest.classAvg}% avg</Text>
            </View>
          </View>

          {/* Ranked students */}
          <Text style={styles.sectionTitle}>RANKING</Text>
          <View style={styles.studentsBlock}>
            {rankedStudents.map((s, i) => (
              <StudentRow
                key={s.id}
                student={s}
                rank={i + 1}
                onPress={() => viewStudent(s)}
                colors={colors}
              />
            ))}
          </View>

          {/* Export */}
          <TouchableOpacity style={styles.exportBtn} onPress={exportCsv} activeOpacity={0.7}>
            <Feather name="download" size={16} color={colors.buttonFg} />
            <Text style={styles.exportBtnText}>EXPORT CSV</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}