// src/pages/teachers/department/performance/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx'
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- data -------------------- */

const TERMS = ['Term 1', 'Term 2', 'Term 3'];

const DATA = {
  'Term 2': {
    department: 'Biology Department',
    departmentAvg: 76,
    schoolAvg: 71,
    streams: [
      { name: 'Biology · 10A', avg: 78, students: 32 },
      { name: 'Biology · 10B', avg: 74, students: 30 },
      { name: 'Biology · 11A', avg: 81, students: 28 },
      { name: 'Biology · 9A',  avg: 72, students: 33 },
      { name: 'Biology · 9B',  avg: 69, students: 31 },
    ],
    teachers: [
      { name: 'You',          avg: 78, students: 62, trend: 3 },
      { name: 'Ms. Achieng',  avg: 81, students: 58, trend: 5 },
      { name: 'Mr. Otieno',   avg: 75, students: 64, trend: -1 },
      { name: 'Mr. Kimani',   avg: 72, students: 68, trend: -4 },
    ],
    bands: [
      { label: 'A',  min: 80, color: '#4caf7d' },
      { label: 'B',  min: 70, color: '#4d7cff' },
      { label: 'C',  min: 60, color: '#e0a93a' },
      { label: 'D',  min: 50, color: '#e88a3a' },
      { label: 'E',  min: 0,  color: '#e25b5b' },
    ],
    distribution: [32, 48, 52, 24, 8],
    trend: [
      { term: 'T1 2025', avg: 68 },
      { term: 'T2 2025', avg: 71 },
      { term: 'T3 2025', avg: 73 },
      { term: 'T1 2026', avg: 74 },
      { term: 'T2 2026', avg: 76 },
    ],
  },
};

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

function StreamRow({ stream, colors }) {
  const styles = makeStyles(colors);
  const tone =
    stream.avg >= 80 ? '#4caf7d' :
    stream.avg >= 70 ? '#4d7cff' :
    stream.avg >= 60 ? '#e0a93a' : '#e25b5b';

  return (
    <View style={styles.streamRow}>
      <Text style={styles.streamName} numberOfLines={1}>{stream.name}</Text>
      <View style={styles.streamTrack}>
        <View style={[styles.streamFill, { width: `${stream.avg}%`, backgroundColor: tone }]} />
      </View>
      <Text style={[styles.streamAvg, { color: tone }]}>{stream.avg}%</Text>
    </View>
  );
}

function TeacherRow({ teacher, rank, colors }) {
  const styles = makeStyles(colors);
  const trendTone = teacher.trend >= 0 ? '#4caf7d' : '#e25b5b';
  const trendSign = teacher.trend >= 0 ? '+' : '';

  return (
    <View style={styles.teacherRow}>
      <Text style={styles.rank}>#{rank}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.teacherName} numberOfLines={1}>{teacher.name}</Text>
        <Text style={styles.teacherMeta}>{teacher.students} learners</Text>
      </View>
      <Text style={styles.teacherAvg}>{teacher.avg}%</Text>
      <Text style={[styles.teacherTrend, { color: trendTone }]}>
        {trendSign}{teacher.trend}
      </Text>
    </View>
  );
}

function BandRow({ band, count, total, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((count / total) * 100);
  return (
    <View style={styles.bandRow}>
      <Text style={[styles.bandLabel, { color: band.color }]}>{band.label}</Text>
      <View style={styles.bandTrack}>
        <View style={[styles.bandFill, { width: `${pct}%`, backgroundColor: band.color }]} />
      </View>
      <Text style={styles.bandCount}>{count}</Text>
    </View>
  );
}

function TrendRow({ term, avg, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.trendRow}>
      <Text style={styles.trendTerm}>{term}</Text>
      <View style={styles.trendTrack}>
        <View style={[styles.trendFill, { width: `${avg}%` }]} />
      </View>
      <Text style={styles.trendAvg}>{avg}%</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherDepartmentPerformance({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [term, setTerm] = useState('Term 2');
  const data = DATA[term] ?? DATA['Term 2'];

  const rankedTeachers = useMemo(
    () => [...data.teachers].sort((a, b) => b.avg - a.avg),
    [data],
  );

  const totalStudents = useMemo(
    () => data.streams.reduce((a, s) => a + s.students, 0),
    [data],
  );

  const gap = data.departmentAvg - data.schoolAvg;

  const exportCsv = () => {
    Alert.alert(
      'Export',
      `Export ${data.department} · ${term} performance as CSV?`,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Export' }]
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DEPARTMENT PERFORMANCE</Text>
          <TouchableOpacity onPress={exportCsv} hitSlop={8}>
            <Feather name="download" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Term picker */}
          <View style={styles.termRow}>
            {TERMS.map((t) => {
              const active = term === t;
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.termBtn, active && styles.termBtnActive]}
                  onPress={() => setTerm(t)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.termBtnText, active && styles.termBtnTextActive]}>
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Banner */}
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}>// {data.department.toUpperCase()}</Text>
            <Text style={styles.bannerTitle}>{data.departmentAvg}% avg</Text>
            <Text style={styles.bannerMeta}>
              {totalStudents} learners · School avg {data.schoolAvg}% ·{' '}
              {gap >= 0 ? '+' : ''}{gap}% vs school
            </Text>
          </View>

          {/* Headline */}
          <View style={styles.statRow}>
            <StatCell value={`${data.departmentAvg}%`} label="DEPT AVG"   tone={colors.accent} colors={colors} />
            <StatCell value={`${data.schoolAvg}%`}     label="SCHOOL AVG" colors={colors} />
            <StatCell value={`${gap >= 0 ? '+' : ''}${gap}%`} label="GAP"
              tone={gap >= 0 ? '#4caf7d' : '#e25b5b'} colors={colors} />
            <StatCell value={totalStudents}            label="LEARNERS"   colors={colors} />
          </View>

          {/* Streams */}
          <Text style={styles.sectionTitle}>BY STREAM</Text>
          <View style={styles.block}>
            {data.streams.map((s, i) => (
              <StreamRow key={i} stream={s} colors={colors} />
            ))}
          </View>

          {/* Teachers */}
          <Text style={styles.sectionTitle}>BY TEACHER</Text>
          <View style={styles.block}>
            {rankedTeachers.map((t, i) => (
              <TeacherRow key={i} teacher={t} rank={i + 1} colors={colors} />
            ))}
          </View>

          {/* Grade distribution */}
          <Text style={styles.sectionTitle}>GRADE DISTRIBUTION</Text>
          <View style={styles.block}>
            {data.bands.map((band, i) => (
              <BandRow
                key={band.label}
                band={band}
                count={data.distribution[i]}
                total={data.distribution.reduce((a, b) => a + b, 0)}
                colors={colors}
              />
            ))}
          </View>

          {/* Trend */}
          <Text style={styles.sectionTitle}>TERM-BY-TERM TREND</Text>
          <View style={styles.block}>
            {data.trend.map((t, i) => (
              <TrendRow key={i} term={t.term} avg={t.avg} colors={colors} />
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