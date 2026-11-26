// src/pages/teachers/dorm/inspection/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- data -------------------- */

const BASE_DORM = { id: 'kilimanjaro', name: 'Kilimanjaro House', type: 'Boys' };

const CRITERIA = [
  { id: 'c1', label: 'Beds made & linen clean' },
  { id: 'c2', label: 'Floor swept & mopped' },
  { id: 'c3', label: 'Lockers tidy & locked' },
  { id: 'c4', label: 'Windows & walls clean' },
  { id: 'c5', label: 'Bathrooms & toilets clean' },
  { id: 'c6', label: 'Waste bins emptied' },
  { id: 'c7', label: 'No food or contraband' },
  { id: 'c8', label: 'Electricals in good order' },
];

const RECENT = [
  { id: 'i1', date: 'Nov 16, 2026', score: 88, note: 'Bins not emptied' },
  { id: 'i2', date: 'Nov 9, 2026',  score: 92, note: 'Clean' },
  { id: 'i3', date: 'Nov 2, 2026',  score: 74, note: 'Lockers untidy, waste bins full' },
];

/* -------------------- components -------------------- */

function ScoreButton({ value, active, onPress, colors }) {
  const styles = makeStyles(colors);
  const tint =
    value === 'pass' ? '#4caf7d' :
    value === 'warn' ? '#e0a93a' : '#e25b5b';
  const label = value === 'pass' ? '✓' : value === 'warn' ? '!' : '✗';

  return (
    <TouchableOpacity
      style={[
        styles.scoreBtn,
        active && { borderColor: tint, backgroundColor: `${tint}18` },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.scoreBtnText, { color: tint }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function CriterionRow({ criterion, value, onChange, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.criterionRow}>
      <Text style={styles.criterionLabel} numberOfLines={2}>{criterion.label}</Text>
      <View style={styles.scoreBtnRow}>
        <ScoreButton value="pass" active={value === 'pass'} onPress={() => onChange('pass')} colors={colors} />
        <ScoreButton value="warn" active={value === 'warn'} onPress={() => onChange('warn')} colors={colors} />
        <ScoreButton value="fail" active={value === 'fail'} onPress={() => onChange('fail')} colors={colors} />
      </View>
    </View>
  );
}

function RecentRow({ record, colors }) {
  const styles = makeStyles(colors);
  const tone =
    record.score >= 85 ? '#4caf7d' :
    record.score >= 70 ? '#e0a93a' : '#e25b5b';
  return (
    <View style={styles.recentRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.recentDate}>{record.date}</Text>
        <Text style={styles.recentNote} numberOfLines={1}>{record.note}</Text>
      </View>
      <Text style={[styles.recentScore, { color: tone }]}>{record.score}%</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherDormInspection({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const dorm = useMemo(() => ({ ...BASE_DORM, ...(route?.params ?? {}) }), [route?.params]);

  const [tab, setTab] = useState('now'); // 'now' | 'history'
  const [inspectionDate, setInspectionDate] = useState('Nov 23, 2026');
  const [values, setValues] = useState(() =>
    Object.fromEntries(CRITERIA.map((c) => [c.id, 'pass']))
  );
  const [notes, setNotes] = useState('');

  const score = useMemo(() => {
    const total = CRITERIA.length;
    const points = Object.values(values).reduce(
      (a, v) => a + (v === 'pass' ? 1 : v === 'warn' ? 0.5 : 0),
      0,
    );
    return Math.round((points / total) * 100);
  }, [values]);

  const setValue = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));

  const submit = () => {
    Alert.alert(
      'Inspection saved',
      `${dorm.name} · ${inspectionDate}\nScore: ${score}%`,
      [{ text: 'OK', onPress: () => { setTab('history'); } }],
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DORM INSPECTION</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {[
            { key: 'now',     label: 'INSPECT' },
            { key: 'history', label: 'HISTORY' },
          ].map((t) => {
            const active = tab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setTab(t.key)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {tab === 'now' ? (
            <>
              {/* Banner */}
              <View style={styles.banner}>
                <Text style={styles.bannerLabel}>// INSPECTION</Text>
                <Text style={styles.bannerTitle}>{dorm.name}</Text>
                <Text style={styles.bannerMeta}>{dorm.type} · {CRITERIA.length} criteria</Text>
              </View>

              {/* Date */}
              <Text style={styles.sectionLabel}>DATE</Text>
              <TextInput
                style={styles.input}
                value={inspectionDate}
                onChangeText={setInspectionDate}
                placeholder="Nov 23, 2026"
                placeholderTextColor={colors.placeholder}
              />

              {/* Live score */}
              <View style={styles.scoreBanner}>
                <Text style={styles.scoreLabel}>LIVE SCORE</Text>
                <Text
                  style={[
                    styles.scoreValue,
                    {
                      color:
                        score >= 85 ? '#4caf7d' :
                        score >= 70 ? '#e0a93a' : '#e25b5b',
                    },
                  ]}
                >
                  {score}%
                </Text>
              </View>

              {/* Criteria */}
              <Text style={styles.sectionLabel}>CRITERIA</Text>
              <View style={styles.criteriaBlock}>
                {CRITERIA.map((c) => (
                  <CriterionRow
                    key={c.id}
                    criterion={c}
                    value={values[c.id]}
                    onChange={(v) => setValue(c.id, v)}
                    colors={colors}
                  />
                ))}
              </View>

              {/* Notes */}
              <Text style={styles.sectionLabel}>NOTES</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Damaged furniture, items missing, etc."
                placeholderTextColor={colors.placeholder}
                multiline
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.saveBtn} onPress={submit} activeOpacity={0.7}>
                <Text style={styles.saveBtnText}>SAVE INSPECTION</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.sectionLabel}>RECENT INSPECTIONS</Text>
              <View style={styles.listBlock}>
                {RECENT.map((r) => (
                  <RecentRow key={r.id} record={r} colors={colors} />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}