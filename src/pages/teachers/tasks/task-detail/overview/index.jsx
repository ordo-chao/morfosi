// src/pages/teachers/tasks/task-detail/overview/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

function StatCell({ label, value, tone, styles }) {
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, tone && { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MetaRow({ label, value, styles }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value ?? '—'}</Text>
    </View>
  );
}

export default function OverviewTab({ task = {} }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const stats = task.stats ?? {
    submitted: 0, total: 0, graded: 0, flagged: 0, meanGrade: null, autoGraded: 0,
  };

  const submittedPct = stats.total > 0 ? Math.round((stats.submitted / stats.total) * 100) : 0;
  const gradedPct   = stats.submitted > 0 ? Math.round((stats.graded / stats.submitted) * 100) : 0;

  const perf = task.performance ?? {
    highest: 96, lowest: 42, median: 78, atRisk: 4,
  };

  const isQuiz = task.mode === 'quiz';

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AT A GLANCE</Text>
        <View style={styles.statGrid}>
          <StatCell label="SUBMITTED" value={`${stats.submitted}/${stats.total}`} styles={styles} />
          <StatCell label="GRADED"    value={`${stats.graded}`}        tone="#4caf7d" styles={styles} />
          <StatCell label="FLAGGED"   value={`${stats.flagged}`}       tone={stats.flagged > 0 ? '#e25b5b' : undefined} styles={styles} />
          <StatCell label="MEAN"      value={stats.meanGrade == null ? '—' : `${Math.round(stats.meanGrade)}%`} tone={colors.accent} styles={styles} />
        </View>

        <View style={styles.progressBlock}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>SUBMISSION RATE</Text>
            <Text style={styles.progressPct}>{submittedPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${submittedPct}%` }]} />
          </View>
        </View>

        <View style={styles.progressBlock}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>GRADING PROGRESS</Text>
            <Text style={styles.progressPct}>{gradedPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${gradedPct}%`, backgroundColor: '#4caf7d' }]} />
          </View>
        </View>

        {stats.autoGraded > 0 && (
          <View style={styles.autoPill}>
            <Ionicons name="sparkles-outline" size={12} color={colors.accent} />
            <Text style={styles.autoPillText}>{stats.autoGraded} auto-graded by system</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERFORMANCE</Text>
        <View style={styles.statGrid}>
          <StatCell label="HIGHEST" value={`${perf.highest}%`} tone="#4caf7d" styles={styles} />
          <StatCell label="MEDIAN"  value={`${perf.median}%`}                     styles={styles} />
          <StatCell label="LOWEST"  value={`${perf.lowest}%`}  tone="#e25b5b"    styles={styles} />
          <StatCell label="AT RISK" value={`${perf.atRisk}`}   tone={perf.atRisk > 0 ? '#e0a93a' : undefined} styles={styles} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
        <Text style={styles.bodyText}>{task.instructions || 'No instructions provided.'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DEADLINE & CONFIGURATION</Text>
        <View style={styles.metaBlock}>
          <MetaRow label="OPENS"         value={task.opensAt ?? 'Nov 10, 2026'} styles={styles} />
          <MetaRow label="DUE"           value={task.dueAt ?? '—'}            styles={styles} />
          <MetaRow label="LATE WORK"     value={task.allowLate ? `Allowed · ${task.latePenalty ?? 10}% penalty` : 'Not allowed'} styles={styles} />
          <MetaRow label="RESUBMISSIONS" value={task.allowResubmit ? 'Allowed' : 'Not allowed'} styles={styles} />
          <MetaRow label="MAX ATTEMPTS"  value={task.maxAttempts ?? 1}        styles={styles} />
          <MetaRow label="FILE TYPES"    value={isQuiz ? 'N/A (quiz)' : (task.allowedTypes ?? 'PDF, DOCX')} styles={styles} />
          <MetaRow label="MAX SIZE"      value={isQuiz ? 'N/A' : (task.maxSize ?? '20 MB')} styles={styles} />
          <MetaRow label="CREATED"       value={task.createdAt ?? 'Nov 1, 2026'} styles={styles} />
          <MetaRow label="LAST EDITED"   value={task.updatedAt ?? 'Nov 8, 2026'} styles={styles} />
        </View>
      </View>

      {!isQuiz && task.attachments?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ATTACHMENTS</Text>
          {task.attachments.map((a) => (
            <View key={a.id} style={styles.attachmentRow}>
              <Feather name="file-text" size={16} color={colors.fg} />
              <View style={styles.attachmentBody}>
                <Text style={styles.attachmentName} numberOfLines={1}>{a.name}</Text>
                <Text style={styles.attachmentMeta}>{a.size}</Text>
              </View>
              <TouchableOpacity hitSlop={6} onPress={() => Alert.alert('Download', a.name)}>
                <Feather name="download" size={14} color={colors.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {isQuiz && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUIZ</Text>
          <View style={styles.quizMetaRow}>
            <View style={styles.quizMetaCell}>
              <Text style={styles.quizMetaValue}>{task.questions?.length ?? 0}</Text>
              <Text style={styles.quizMetaLabel}>QUESTIONS</Text>
            </View>
            <View style={styles.quizMetaCell}>
              <Text style={styles.quizMetaValue}>{task.points ?? '—'}</Text>
              <Text style={styles.quizMetaLabel}>TOTAL PTS</Text>
            </View>
            <View style={styles.quizMetaCell}>
              <Text style={styles.quizMetaValue}>
                {task.questions ? task.questions.filter((q) => q.type === 'mcq').length : 0}
              </Text>
              <Text style={styles.quizMetaLabel}>MULTIPLE CHOICE</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}