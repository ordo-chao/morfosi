// src/pages/teachers/department/schemes/index.jsx
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

const SCHEMES = [
  {
    id: 's1', teacher: 'You', classes: ['Biology · 10A', 'Biology · 10B'],
    term: 'Term 2', weeksPlanned: 12, weeksCovered: 10,
    lastUpdated: '3 days ago', status: 'on-track',
  },
  {
    id: 's2', teacher: 'Ms. Achieng', classes: ['Biology · 11A'],
    term: 'Term 2', weeksPlanned: 12, weeksCovered: 11,
    lastUpdated: '1 week ago', status: 'on-track',
  },
  {
    id: 's3', teacher: 'Mr. Kimani', classes: ['Science · 8', 'Science · 9'],
    term: 'Term 2', weeksPlanned: 12, weeksCovered: 8,
    lastUpdated: '2 weeks ago', status: 'behind',
  },
  {
    id: 's4', teacher: 'Mr. Otieno', classes: ['Biology · 9A', 'Biology · 9B'],
    term: 'Term 2', weeksPlanned: 12, weeksCovered: 12,
    lastUpdated: 'today', status: 'complete',
  },
];

const STATUS_TINT = {
  'on-track': '#4caf7d',
  'behind':   '#e25b5b',
  'complete': '#4d7cff',
};

const STATUS_LABEL = {
  'on-track': 'ON TRACK',
  'behind':   'BEHIND',
  'complete': 'COMPLETE',
};

/* -------------------- components -------------------- */

function SchemeCard({ scheme, onPress, onView, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((scheme.weeksCovered / scheme.weeksPlanned) * 100);
  const tint = STATUS_TINT[scheme.status] ?? colors.fgMuted;
  const behindWeeks = Math.max(0, scheme.weeksPlanned - scheme.weeksCovered);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHead}>
        <View style={{ flex: 1 }}>
          <Text style={styles.teacherName} numberOfLines={1}>{scheme.teacher}</Text>
          <Text style={styles.classes} numberOfLines={1}>
            {scheme.classes.join(' · ')}
          </Text>
        </View>
        <View style={[styles.statusPill, { borderColor: tint }]}>
          <Text style={[styles.statusPillText, { color: tint }]}>
            {STATUS_LABEL[scheme.status]}
          </Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: tint }]} />
        </View>
        <Text style={styles.progressPct}>{pct}%</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {scheme.weeksCovered}/{scheme.weeksPlanned} weeks covered
        </Text>
        <Text style={styles.metaText}>Updated {scheme.lastUpdated}</Text>
      </View>

      {behindWeeks > 0 && (
        <Text style={styles.warning}>
          ⚠ {behindWeeks} week{behindWeeks > 1 ? 's' : ''} behind schedule
        </Text>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onView} activeOpacity={0.7}>
          <Feather name="eye" size={12} color={colors.accent} />
          <Text style={styles.actionBtnText}>VIEW SCHEME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
          <Feather name="message-circle" size={12} color={colors.accent} />
          <Text style={styles.actionBtnText}>REVIEW</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherDepartmentSchemes({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [term, setTerm] = useState('Term 2');

  const filtered = useMemo(
    () => SCHEMES.filter((s) => s.term === term),
    [term],
  );

  const summary = useMemo(() => {
    const total = filtered.length;
    const onTrack = filtered.filter((s) => s.status === 'on-track').length;
    const behind = filtered.filter((s) => s.status === 'behind').length;
    const complete = filtered.filter((s) => s.status === 'complete').length;
    return { total, onTrack, behind, complete };
  }, [filtered]);

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SCHEMES OF WORK</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Export', 'Generate PDF of all schemes?')}
            hitSlop={8}
          >
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

          {/* Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCell}>
              <Text style={styles.summaryValue}>{summary.total}</Text>
              <Text style={styles.summaryLabel}>SCHEMES</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: '#4caf7d' }]}>{summary.onTrack}</Text>
              <Text style={styles.summaryLabel}>ON TRACK</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: '#e25b5b' }]}>{summary.behind}</Text>
              <Text style={styles.summaryLabel}>BEHIND</Text>
            </View>
            <View style={styles.summaryCell}>
              <Text style={[styles.summaryValue, { color: '#4d7cff' }]}>{summary.complete}</Text>
              <Text style={styles.summaryLabel}>COMPLETE</Text>
            </View>
          </View>

          {/* Schemes */}
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Feather name="file-text" size={28} color={colors.fgFaint} />
              <Text style={styles.emptyText}>No schemes for {term}</Text>
            </View>
          ) : (
            filtered.map((s) => (
              <SchemeCard
                key={s.id}
                scheme={s}
                onPress={() => navigation?.navigate('Teacher-Department-Teacher-Detail', { teacherId: s.id })}
                onView={() => Alert.alert('View scheme', `${s.teacher} · ${term}`)}
                colors={colors}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}