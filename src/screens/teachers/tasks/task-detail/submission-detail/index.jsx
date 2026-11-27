// src/pages/teachers/tasks/task-detail/submission-detail/index.jsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const GRADING_STATES = {
  not_graded: 'Not graded', draft: 'Draft grade', graded: 'Graded',
  returned: 'Returned', resubmitted: 'Resubmitted', released: 'Released',
};

function statusTint(status, colors) {
  if (status === 'graded' || status === 'released') return '#4caf7d';
  if (status === 'returned' || status === 'resubmitted') return '#e0a93a';
  if (status === 'missing') return '#e25b5b';
  return colors.accent;
}

/* -------- sub-components -------- */

function FilePreview({ submission, colors, styles }) {
  if (!submission.fileName) return null;
  return (
    <View style={styles.previewCard}>
      <Feather name="file-text" size={20} color={colors.fg} />
      <View style={{ flex: 1 }}>
        <Text style={styles.previewName} numberOfLines={1}>{submission.fileName}</Text>
        <Text style={styles.previewMeta}>{submission.fileSize ?? '—'} · {submission.submittedAt}</Text>
      </View>
      <TouchableOpacity style={styles.previewBtn} onPress={() => Alert.alert('Preview', 'Open PDF/image viewer')}>
        <Feather name="eye" size={12} color={colors.accent} />
        <Text style={styles.previewBtnText}>VIEW</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.previewBtn} onPress={() => Alert.alert('Download', submission.fileName)}>
        <Feather name="download" size={12} color={colors.accent} />
        <Text style={styles.previewBtnText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

function QuizAnswerReview({ answers, questions, colors, styles, onOverride }) {
  const [showAll, setShowAll] = useState(false);
  const wrongCount = answers.filter((a) => !a.correct).length;
  const visible = showAll ? answers : answers.filter((a) => !a.correct);

  if (answers.length === 0) {
    return <Text style={styles.emptyText}>No quiz answers recorded</Text>;
  }

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.quizHeader}>
        <Text style={styles.quizHeaderText}>{wrongCount} wrong of {answers.length}</Text>
        <TouchableOpacity onPress={() => setShowAll((v) => !v)}>
          <Text style={styles.quizToggle}>{showAll ? 'SHOW WRONG ONLY' : 'SHOW ALL'}</Text>
        </TouchableOpacity>
      </View>
      {visible.map((a) => {
        const q = questions.find((x) => x.id === a.questionId);
        if (!q) return null;
        const correctText = q.type === 'mcq'
          ? q.options?.find((o) => o.id === q.correct)?.text ?? q.correct : q.correct;
        const studentText = q.type === 'mcq'
          ? q.options?.find((o) => o.id === a.value)?.text ?? a.value : a.value;
        const tone = a.correct ? '#4caf7d' : '#e25b5b';
        return (
          <View key={a.questionId} style={[styles.answerCard, { borderLeftColor: tone }]}>
            <Text style={styles.answerPrompt}>{q.prompt}</Text>
            <View style={styles.answerLine}>
              <Text style={[styles.answerLabel, { color: tone }]}>
                {a.correct ? 'STUDENT ✓' : 'STUDENT ✗'}
              </Text>
              <Text style={styles.answerText}>{studentText || '—'}</Text>
            </View>
            {!a.correct && (
              <View style={styles.answerLine}>
                <Text style={[styles.answerLabel, { color: '#4caf7d' }]}>CORRECT</Text>
                <Text style={styles.answerText}>{correctText || '—'}</Text>
              </View>
            )}
            <Text style={styles.answerPoints}>{a.pointsEarned ?? 0}/{q.points ?? 0} pts</Text>
            {q.type === 'short' && (
              <View style={styles.shortGradeRow}>
                <Text style={styles.shortGradeLabel}>OVERRIDE</Text>
                <TextInput
                  style={styles.shortGradeInput}
                  keyboardType="numeric"
                  defaultValue={String(a.pointsEarned ?? '')}
                  onChangeText={(v) => onOverride?.(a.questionId, Number(v) || 0)}
                />
                <Text style={styles.shortGradeMax}>/{q.points ?? 0}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function MissingStudentPanel({ colors, styles, onAction }) {
  const options = [
    { key: 'remind',  icon: 'bell',     label: 'SEND REMINDER' },
    { key: 'extend',  icon: 'clock',    label: 'GRANT EXTENSION' },
    { key: 'excused', icon: 'check',    label: 'MARK EXCUSED' },
    { key: 'zero',    icon: 'x-circle', label: 'RECORD ZERO' },
  ];
  return (
    <View style={styles.missingBlock}>
      <Ionicons name="alert-circle" size={20} color="#e25b5b" />
      <Text style={styles.missingTitle}>Student hasn't submitted</Text>
      <Text style={styles.missingSub}>Choose an action to resolve this submission.</Text>
      <View style={styles.missingActions}>
        {options.map((o) => (
          <TouchableOpacity key={o.key} style={styles.missingBtn} onPress={() => onAction?.(o.key)}>
            <Feather name={o.icon} size={13} color={colors.fg} />
            <Text style={styles.missingBtnText}>{o.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* -------- main view -------- */

export default function SubmissionDetailView({
  task, submissions, currentId, onChangeStudent, onSaveGrade, onBack,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const index = submissions.findIndex((s) => s.id === currentId);
  const current = submissions[index] ?? null;
  const prev = index > 0 ? submissions[index - 1] : null;
  const next = index >= 0 && index < submissions.length - 1 ? submissions[index + 1] : null;

  const isMissing = current?.status === 'missing';
  const isQuiz = task?.mode === 'quiz';

  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState('');
  const [gradingStatus, setGradingStatus] = useState('not_graded');
  const [answers, setAnswers] = useState(current?.answers ?? []);

  /* Reset per-student state — critical bug fix from earlier review */
  useEffect(() => {
    const rubric = task?.rubric ?? [];
    setScores(Object.fromEntries(rubric.map((r) => [r.name, ''])));
    setFeedback(current?.feedback ?? '');
    setGradingStatus(current?.status === 'graded' ? 'graded' : 'not_graded');
    setAnswers(current?.answers ?? []);
  }, [current?.id, task]);

  const total = Object.values(scores).reduce((s, v) => s + (Number(v) || 0), 0);
  const maxTotal = (task?.rubric ?? []).reduce((s, r) => s + r.max, 0);
  const letter =
    total >= 90 ? 'A' : total >= 80 ? 'B+' :
    total >= 70 ? 'B' : total >= 60 ? 'C' : 'D';

  const overrideAnswer = (qid, pts) =>
    setAnswers((prev) => prev.map((a) => (a.questionId === qid ? { ...a, pointsEarned: pts } : a)));

  const commit = (mode) => {
    onSaveGrade(current.id, {
      scores, total, maxTotal, feedback, grade: letter, answers, status: mode,
    });
    setGradingStatus(mode);
    if ((mode === 'graded' || mode === 'released') && next) {
      onChangeStudent(next.id);
    } else if (mode === 'graded' || mode === 'released') {
      onBack();
    }
  };

  if (!current) {
    return <Text style={styles.emptyText}>Submission not found</Text>;
  }

  return (
    <>
      {/* Prev/Next pager */}
      <View style={styles.pagerRow}>
        <TouchableOpacity
          style={[styles.pagerBtn, !prev && styles.pagerBtnDisabled]}
          disabled={!prev}
          onPress={() => onChangeStudent(prev.id)}
        >
          <Ionicons name="chevron-back" size={14} color={colors.fg} />
          <Text style={styles.pagerBtnText} numberOfLines={1}>{prev ? prev.student : 'PREV'}</Text>
        </TouchableOpacity>
        <Text style={styles.pagerMeta}>{index + 1} / {submissions.length}</Text>
        <TouchableOpacity
          style={[styles.pagerBtn, !next && styles.pagerBtnDisabled]}
          disabled={!next}
          onPress={() => onChangeStudent(next.id)}
        >
          <Text style={styles.pagerBtnText} numberOfLines={1}>{next ? next.student : 'NEXT'}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.fg} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.detailScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.statusStrip, { borderLeftColor: statusTint(current.status, colors) }]}>
          <View style={styles.statusRow}>
            <Text style={styles.statusMeta}>
              {isMissing
                ? 'NOT SUBMITTED'
                : `Submitted ${current.submittedAt}${current.onTime === false ? ' · LATE' : ''}`}
            </Text>
            <View style={[styles.statusBadge, { borderColor: statusTint(current.status, colors) }]}>
              <Text style={[styles.statusBadgeText, { color: statusTint(current.status, colors) }]}>
                {GRADING_STATES[gradingStatus] ?? '—'}
              </Text>
            </View>
          </View>
          {current.autoGrade != null && (
            <View style={styles.autoBanner}>
              <Ionicons name="sparkles" size={12} color={colors.accent} />
              <Text style={styles.autoBannerText}>Auto-graded at {current.autoGrade}% — review and confirm</Text>
            </View>
          )}
          {current.flagged && (
            <View style={styles.flagBanner}>
              <Ionicons name="flag" size={12} color="#e25b5b" />
              <Text style={styles.flagBannerText}>{current.flagged.reason} · by {current.flagged.by}</Text>
            </View>
          )}
        </View>

        {isMissing ? (
          <MissingStudentPanel
            colors={colors}
            styles={styles}
            onAction={(key) => Alert.alert('Missing', `Action: ${key}`)}
          />
        ) : (
          <>
            {!isQuiz && <FilePreview submission={current} colors={colors} styles={styles} />}

            {isQuiz && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>ANSWERS</Text>
                <QuizAnswerReview
                  answers={answers}
                  questions={task.questions ?? []}
                  colors={colors}
                  styles={styles}
                  onOverride={overrideAnswer}
                />
              </View>
            )}

            {!isQuiz && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>RUBRIC</Text>
                <View style={styles.rubricBlock}>
                  {(task.rubric ?? []).map((r) => (
                    <View key={r.name} style={styles.rubricRow}>
                      <Text style={styles.rubricName} numberOfLines={1}>{r.name}</Text>
                      <Text style={styles.rubricWeight}>{r.weight}</Text>
                      <TextInput
                        style={styles.rubricInput}
                        keyboardType="numeric"
                        value={String(scores[r.name] ?? '')}
                        onChangeText={(v) =>
                          setScores((prev) => ({ ...prev, [r.name]: v.replace(/[^0-9]/g, '') }))
                        }
                      />
                      <Text style={styles.rubricMax}>/{r.max}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.totalRow}>
                  TOTAL: {total} / {maxTotal || '—'} ({letter})
                </Text>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FEEDBACK</Text>
              <TextInput
                style={styles.feedbackInput}
                multiline
                textAlignVertical="top"
                placeholder="Write feedback for the student…"
                placeholderTextColor={colors.placeholder}
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>
          </>
        )}
      </ScrollView>

      {!isMissing && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtnGhost} onPress={() => commit('draft')}>
            <Text style={styles.footerBtnGhostText}>DRAFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.footerBtnGhost, { borderColor: '#e0a93a' }]}
            onPress={() => commit('returned')}
          >
            <Text style={[styles.footerBtnGhostText, { color: '#e0a93a' }]}>RETURN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn} onPress={() => commit('released')}>
            <Text style={styles.footerBtnText}>{next ? 'RELEASE & NEXT' : 'RELEASE'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}