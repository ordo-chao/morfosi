// src/pages/teachers/tasks/task-detail/rubric/index.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const LEVELS = ['Excellent', 'Good', 'Needs Improvement'];

const DEFAULT_RUBRIC = [
  { name: 'Content',   weight: '60%', max: 60, levels: {} },
  { name: 'Structure', weight: '20%', max: 20, levels: {} },
  { name: 'Accuracy',  weight: '20%', max: 20, levels: {} },
];

/* =========================================================
 * Segmented control
 * ======================================================= */
function SegmentedTabs({ tabs, active, onChange, colors, styles }) {
  return (
    <View style={styles.segmentWrap}>
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <TouchableOpacity
            key={t.key}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onChange(t.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/* =========================================================
 * Shared state hook — one rubric for all sub-views
 * ======================================================= */
function useRubricState(task) {
  const [rubric, setRubric] = useState(() =>
    Array.isArray(task.rubric) && task.rubric.length ? task.rubric : DEFAULT_RUBRIC,
  );
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (Array.isArray(task.rubric) && task.rubric.length > 0) {
      setRubric(task.rubric);
    }
  }, [task.rubric]);

  const update = (idx, key, value) =>
    setRubric((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));

  const addRow = () =>
    setRubric((prev) => [
      ...prev,
      { name: 'New criterion', weight: '0%', max: 10, levels: {} },
    ]);

  const removeRow = (idx) => {
    if (rubric.length <= 1) {
      Alert.alert('Cannot remove', 'A rubric needs at least one criterion.');
      return;
    }
    setRubric((prev) => prev.filter((_, i) => i !== idx));
  };

  const total = rubric.reduce((s, r) => s + (Number(r.max) || 0), 0);

  return { rubric, setRubric, editing, setEditing, update, addRow, removeRow, total };
}

/* =========================================================
 * CRITERIA VIEW (list of criteria with weight + max)
 * ======================================================= */
function CriteriaView({ rubric, editing, update, addRow, removeRow, total, colors, styles }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.sectionTitle}>
        CRITERIA · {rubric.length} rows · {total} PTS
      </Text>

      {rubric.map((r, i) => (
        <View key={i} style={styles.rubricCard}>
          <View style={styles.rubricTop}>
            {editing ? (
              <TextInput
                style={styles.rubricNameInput}
                value={String(r.name ?? '')}
                onChangeText={(v) => update(i, 'name', v)}
                placeholder="Criterion"
                placeholderTextColor={colors.placeholder}
              />
            ) : (
              <Text style={styles.rubricName}>{r.name || '—'}</Text>
            )}
            <TextInput
              style={styles.rubricWeightInput}
              value={String(r.weight ?? '')}
              editable={editing}
              onChangeText={(v) => update(i, 'weight', v)}
            />
            <TextInput
              style={styles.rubricMaxInput}
              keyboardType="numeric"
              value={String(r.max ?? '')}
              editable={editing}
              onChangeText={(v) => update(i, 'max', v.replace(/[^0-9]/g, ''))}
            />
            {editing && (
              <TouchableOpacity onPress={() => removeRow(i)} hitSlop={6}>
                <Feather name="x" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      {editing && (
        <TouchableOpacity style={styles.addBtn} onPress={addRow}>
          <Feather name="plus" size={14} color={colors.accent} />
          <Text style={styles.addBtnText}>ADD CRITERION</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* =========================================================
 * LEVELS VIEW (per-criterion performance descriptions)
 * ======================================================= */
function LevelsView({ rubric, editing, update, colors, styles }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.sectionTitle}>PERFORMANCE LEVELS</Text>

      {rubric.map((r, i) => (
        <View key={i} style={styles.rubricCard}>
          <View style={styles.rubricTop}>
            <Text style={styles.rubricName}>{r.name || '—'}</Text>
            <Text style={styles.levelMax}>{r.max ?? 0} pts</Text>
          </View>

          {LEVELS.map((lvl) => (
            <View key={lvl} style={styles.levelRow}>
              <Text style={styles.levelLabel}>{lvl.toUpperCase()}</Text>
              {editing ? (
                <TextInput
                  style={styles.levelInput}
                  placeholder={`Describe ${lvl.toLowerCase()} performance`}
                  placeholderTextColor={colors.placeholder}
                  value={r.levels?.[lvl] ?? ''}
                  onChangeText={(v) =>
                    update(i, 'levels', { ...(r.levels ?? {}), [lvl]: v })
                  }
                />
              ) : (
                <Text style={styles.levelText}>{r.levels?.[lvl] ?? '—'}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/* =========================================================
 * WEIGHTS VIEW (visual breakdown of scoring weight)
 * ======================================================= */
function WeightsView({ rubric, total, colors, styles }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.sectionTitle}>WEIGHT BREAKDOWN · {total} PTS</Text>

      <View style={styles.weightBlock}>
        {rubric.map((r, i) => {
          const pct = total > 0 ? Math.round(((Number(r.max) || 0) / total) * 100) : 0;
          return (
            <View key={i} style={styles.weightRow}>
              <Text style={styles.weightName} numberOfLines={1}>
                {r.name || '—'}
              </Text>
              <View style={styles.weightTrack}>
                <View style={[styles.weightFill, { width: `${pct}%` }]} />
              </View>
              <Text style={styles.weightPct}>{pct}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* =========================================================
 * QUIZ ANALYTICS VIEW
 * ======================================================= */
function QuizAnalytics({ task, colors, styles }) {
  const [page, setPage] = useState(0);
  const PAGE = 5;
  const questions = task.questions ?? [];
  const totalPages = Math.max(1, Math.ceil(questions.length / PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * PAGE;
  const slice = questions.slice(start, start + PAGE);
  const analytics = task.analytics ?? {};

  if (questions.length === 0) {
    return (
      <View style={styles.noticeBlock}>
        <Ionicons name="information-circle-outline" size={16} color={colors.accent} />
        <Text style={styles.noticeText}>
          No quiz questions yet — analytics will appear once questions are added.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      {slice.map((q, idx) => {
        const a = analytics[q.id] ?? { correct: 0, wrong: 0, unanswered: 0 };
        const totalResponses = a.correct + a.wrong + a.unanswered;
        const rate = totalResponses > 0 ? Math.round((a.correct / totalResponses) * 100) : 0;
        const number = start + idx + 1;
        const correctText = q.type === 'mcq'
          ? q.options?.find((o) => o.id === q.correct)?.text ?? q.correct
          : q.correct;

        return (
          <View key={q.id ?? number} style={styles.keyCard}>
            <View style={styles.keyHeader}>
              <Text style={styles.keyNumber}>Q{number}</Text>
              <Text style={styles.keyType}>{q.type === 'mcq' ? 'MCQ' : 'SHORT'}</Text>
              <Text style={styles.keyPoints}>{q.points ?? 0} pts</Text>
            </View>
            <Text style={styles.keyPrompt}>{q.prompt ?? '(no prompt)'}</Text>

            <View style={styles.analyticsRow}>
              <View style={styles.analyticsCell}>
                <Text style={[styles.analyticsValue, { color: '#4caf7d' }]}>{a.correct}</Text>
                <Text style={styles.analyticsLabel}>CORRECT</Text>
              </View>
              <View style={styles.analyticsCell}>
                <Text style={[styles.analyticsValue, { color: '#e25b5b' }]}>{a.wrong}</Text>
                <Text style={styles.analyticsLabel}>WRONG</Text>
              </View>
              <View style={styles.analyticsCell}>
                <Text style={styles.analyticsValue}>{a.unanswered}</Text>
                <Text style={styles.analyticsLabel}>SKIPPED</Text>
              </View>
              <View style={styles.analyticsCell}>
                <Text style={[styles.analyticsValue, { color: colors.accent }]}>{rate}%</Text>
                <Text style={styles.analyticsLabel}>SUCCESS</Text>
              </View>
            </View>

            <View style={styles.keyShortAnswer}>
              <Text style={styles.keyShortLabel}>ANSWER</Text>
              <Text style={styles.keyShortText}>{correctText || '—'}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.pagerRow}>
        <TouchableOpacity
          style={[styles.pagerBtn, safePage === 0 && styles.pagerBtnDisabled]}
          disabled={safePage === 0}
          onPress={() => setPage((p) => Math.max(0, p - 1))}
        >
          <Ionicons name="chevron-back" size={14} color={colors.fg} />
          <Text style={styles.pagerBtnText}>PREV</Text>
        </TouchableOpacity>
        <Text style={styles.pagerMeta}>{safePage + 1} / {totalPages}</Text>
        <TouchableOpacity
          style={[styles.pagerBtn, safePage >= totalPages - 1 && styles.pagerBtnDisabled]}
          disabled={safePage >= totalPages - 1}
          onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        >
          <Text style={styles.pagerBtnText}>NEXT</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.fg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =========================================================
 * ENTRY
 * ======================================================= */
export default function RubricTab({ task }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const isQuiz = task.mode === 'quiz';

  const FILE_TABS = [
    { key: 'criteria', label: 'CRITERIA' },
    { key: 'levels',   label: 'LEVELS'   },
    { key: 'weights',  label: 'WEIGHTS'  },
  ];
  const QUIZ_TABS = [
    { key: 'analytics', label: 'ANALYTICS' },
    { key: 'criteria',  label: 'CRITERIA'  },
  ];

  const TABS = isQuiz ? QUIZ_TABS : FILE_TABS;
  const [view, setView] = useState(TABS[0].key);

  const rubricState = useRubricState(task);

  const showEditButton = view === 'criteria' || view === 'levels';

  return (
    <View style={{ gap: 14 }}>
      {/* Segmented control */}
      <SegmentedTabs
        tabs={TABS}
        active={view}
        onChange={setView}
        colors={colors}
        styles={styles}
      />

      {/* Edit toggle (only on editable views) */}
      {showEditButton && (
        <View style={styles.editBar}>
          <TouchableOpacity
            onPress={() => {
              if (rubricState.editing) Alert.alert('Saved', 'Rubric updated');
              rubricState.setEditing((v) => !v);
            }}
          >
            <Text style={styles.rubricEditToggle}>
              {rubricState.editing ? 'SAVE' : 'EDIT'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Body */}
      {view === 'analytics' && (
        <QuizAnalytics task={task} colors={colors} styles={styles} />
      )}
      {view === 'criteria' && (
        <CriteriaView
          rubric={rubricState.rubric}
          editing={rubricState.editing}
          update={rubricState.update}
          addRow={rubricState.addRow}
          removeRow={rubricState.removeRow}
          total={rubricState.total}
          colors={colors}
          styles={styles}
        />
      )}
      {view === 'levels' && (
        <LevelsView
          rubric={rubricState.rubric}
          editing={rubricState.editing}
          update={rubricState.update}
          colors={colors}
          styles={styles}
        />
      )}
      {view === 'weights' && (
        <WeightsView
          rubric={rubricState.rubric}
          total={rubricState.total}
          colors={colors}
          styles={styles}
        />
      )}
    </View>
  );
}