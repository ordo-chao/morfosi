// Grades.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../../layout.jsx';

/* -------------------- sample data -------------------- */

const TERMS = [
  { key: 't1', label: 'TERM 1' },
  { key: 't2', label: 'TERM 2' },
  { key: 't3', label: 'TERM 3' },
];

const GRADES = {
  t1: [
    { id: 'math', name: 'Math',      teacher: 'Mr. Kimani',  grade: 'A-', score: 88, trend: 'up',   rank: 3,  classAvg: 76 },
    { id: 'eng',  name: 'English',   teacher: 'Ms. Wanjiku', grade: 'B+', score: 82, trend: 'flat', rank: 5,  classAvg: 74 },
    { id: 'bio',  name: 'Biology',   teacher: 'Mr. Otieno',  grade: 'A',  score: 91, trend: 'up',   rank: 1,  classAvg: 72 },
    { id: 'chem', name: 'Chemistry', teacher: 'Ms. Achieng', grade: 'B',  score: 78, trend: 'down', rank: 8,  classAvg: 70 },
    { id: 'hist', name: 'History',   teacher: 'Mr. Mwangi',  grade: 'B+', score: 84, trend: 'up',   rank: 4,  classAvg: 75 },
    { id: 'geo',  name: 'Geography', teacher: 'Ms. Njeri',   grade: 'B-', score: 74, trend: 'flat', rank: 9,  classAvg: 71 },
  ],
  t2: [
    { id: 'math', name: 'Math',      teacher: 'Mr. Kimani',  grade: 'A',  score: 92, trend: 'up',   rank: 2,  classAvg: 77 },
    { id: 'eng',  name: 'English',   teacher: 'Ms. Wanjiku', grade: 'B+', score: 84, trend: 'up',   rank: 4,  classAvg: 75 },
    { id: 'bio',  name: 'Biology',   teacher: 'Mr. Otieno',  grade: 'A',  score: 94, trend: 'up',   rank: 1,  classAvg: 73 },
    { id: 'chem', name: 'Chemistry', teacher: 'Ms. Achieng', grade: 'B+', score: 81, trend: 'up',   rank: 6,  classAvg: 71 },
    { id: 'hist', name: 'History',   teacher: 'Mr. Mwangi',  grade: 'B',  score: 79, trend: 'down', rank: 7,  classAvg: 76 },
    { id: 'geo',  name: 'Geography', teacher: 'Ms. Njeri',   grade: 'B',  score: 77, trend: 'up',   rank: 8,  classAvg: 72 },
  ],
  t3: [],
};

const ASSESSMENTS = {
  math: [
    { name: 'CAT 1',    score: 85, max: 100, weight: '15%' },
    { name: 'CAT 2',    score: 90, max: 100, weight: '15%' },
    { name: 'Mid-Term', score: 88, max: 100, weight: '30%' },
    { name: 'Project',  score: 95, max: 100, weight: '10%' },
    { name: 'End-Term', score: 92, max: 100, weight: '30%' },
  ],
};

/* -------------------- helpers -------------------- */

function gradeToPoints(grade) {
  const map = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0 };
  return map[grade] ?? 0;
}

function scoreColor(score, colors) {
  if (score >= 85) return colors.accent;
  if (score >= 70) return colors.fg;
  return colors.fgMuted;
}

function TrendIcon({ trend, color }) {
  if (trend === 'up') return <Ionicons name="trending-up" size={14} color={color} />;
  if (trend === 'down') return <Ionicons name="trending-down" size={14} color={color} />;
  return <Ionicons name="remove" size={14} color={color} />;
}

/* -------------------- components -------------------- */

function SummaryCard({ avg, gpa, rank, total }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>{avg}%</Text>
        <Text style={styles.summaryLabel}>AVERAGE</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>{gpa}</Text>
        <Text style={styles.summaryLabel}>GPA</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={[styles.summaryValue, { color: colors.accent }]}>
          #{rank}
        </Text>
        <Text style={styles.summaryLabel}>RANK / {total}</Text>
      </View>
    </View>
  );
}

function SubjectRow({ item, onPress, highlight = false }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const trendColor =
    item.trend === 'up'
      ? colors.accent
      : item.trend === 'down'
      ? '#e25b5b'
      : colors.fgMuted;

  return (
    <TouchableOpacity
      style={[styles.row, highlight && styles.rowHighlighted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowGradePill}>
        <Text style={styles.rowGradeText}>{item.grade}</Text>
      </View>

      <View style={styles.rowBody}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {item.teacher} · Class avg {item.classAvg}%
        </Text>
      </View>

      <View style={styles.rowRight}>
        <Text style={[styles.rowScore, { color: scoreColor(item.score, colors) }]}>
          {item.score}%
        </Text>
        <TrendIcon trend={item.trend} color={trendColor} />
      </View>
    </TouchableOpacity>
  );
}

function GradeDetail({ visible, subject, onClose }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (!subject) return null;
  const assessments = ASSESSMENTS[subject.id] ?? [];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalSheet} onPress={() => {}}>
          <Text style={styles.modalLabel}>// GRADE DETAIL</Text>
          <Text style={styles.modalTitle}>{subject.name}</Text>
          <Text style={styles.modalMeta}>
            {subject.teacher} · Final {subject.grade} ({subject.score}%)
          </Text>

          <View style={styles.modalDivider} />

          {assessments.length > 0 ? (
            <>
              <Text style={styles.modalSectionTitle}>ASSESSMENTS</Text>
              {assessments.map((a, i) => {
                const pct = Math.round((a.score / a.max) * 100);
                return (
                  <View key={i} style={styles.assessmentRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.assessmentName}>{a.name}</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${pct}%` }]} />
                      </View>
                    </View>
                    <Text style={styles.assessmentScore}>
                      {a.score}/{a.max}
                    </Text>
                    <Text style={styles.assessmentWeight}>{a.weight}</Text>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.modalEmpty}>
              No assessment breakdown available yet.
            </Text>
          )}

          <View style={styles.modalDivider} />

          <View style={styles.modalStatsRow}>
            <View style={styles.modalStat}>
              <Text style={styles.modalStatValue}>{subject.rank}</Text>
              <Text style={styles.modalStatLabel}>RANK</Text>
            </View>
            <View style={styles.modalStat}>
              <Text style={styles.modalStatValue}>{subject.classAvg}%</Text>
              <Text style={styles.modalStatLabel}>CLASS AVG</Text>
            </View>
            <View style={styles.modalStat}>
              <Text style={[styles.modalStatValue, { color: colors.accent }]}>
                {subject.score > subject.classAvg ? '+' : ''}
                {subject.score - subject.classAvg}
              </Text>
              <Text style={styles.modalStatLabel}>VS CLASS</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>CLOSE</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* -------------------- screen -------------------- */

export default function Grades({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // subject passed from Classes → SubjectDetail
  const focusId = route?.params?.subject?.id;

  const [term, setTerm] = useState('t2');
  const [selected, setSelected] = useState(null);

  // Hoist the focused subject to the top of the list.
  // If no focus, keep the natural order.
  const rows = useMemo(() => {
    const base = GRADES[term] ?? [];
    if (!focusId) return base;
    const idx = base.findIndex((r) => r.id === focusId);
    if (idx <= 0) return base; // not found or already first
    return [base[idx], ...base.slice(0, idx), ...base.slice(idx + 1)];
  }, [term, focusId]);

  const summary = useMemo(() => {
    if (rows.length === 0) return { avg: 0, gpa: 0, rank: 0, total: 0 };
    const avg = Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length);
    const gpa = (
      rows.reduce((s, r) => s + gradeToPoints(r.grade), 0) / rows.length
    ).toFixed(2);
    const rank = Math.min(...rows.map((r) => r.rank));
    return { avg, gpa, rank, total: 42 };
  }, [rows]);

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GRADES</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Term selector */}
        <View style={styles.termRow}>
          {TERMS.map((t) => {
            const active = term === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.termBtn, active && styles.termBtnActive]}
                onPress={() => setTerm(t.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.termText, active && styles.termTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Focus hint — shows which subject the user came from */}
        {focusId && rows.some((r) => r.id === focusId) && (
          <View style={styles.focusBanner}>
            <Ionicons name="locate-outline" size={12} color={colors.accent} />
            <Text style={styles.focusBannerText}>
              VIEWING FROM: {rows.find((r) => r.id === focusId).name.toUpperCase()}
            </Text>
          </View>
        )}

        {/* Summary */}
        {rows.length > 0 && (
          <SummaryCard
            avg={summary.avg}
            gpa={summary.gpa}
            rank={summary.rank}
            total={summary.total}
          />
        )}

        {/* Subject list */}
        {rows.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="stats-chart-outline" size={28} color={colors.fgFaint} />
            <Text style={styles.emptyText}>No grades yet</Text>
            <Text style={styles.emptySub}>
              Grades will appear once assessments are recorded.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.countLabel}>
              {rows.length} {rows.length === 1 ? 'SUBJECT' : 'SUBJECTS'}
            </Text>
            <View style={styles.listBlock}>
              {rows.map((item) => (
                <SubjectRow
                  key={item.id}
                  item={item}
                  highlight={item.id === focusId}
                  onPress={() => setSelected(item)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <GradeDetail
        visible={!!selected}
        subject={selected}
        onClose={() => setSelected(null)}
      />
    </View>
    </Layout>
  );
}