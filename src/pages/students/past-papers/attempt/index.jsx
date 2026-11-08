// revision/past-papers/attempt/index.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Pressable, KeyboardAvoidingView, Platform,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const BASE_PAPER = {
  id: 'p1',
  title: 'Biology Paper 1',
  subject: 'Biology',
  durationSeconds: 2 * 60 * 60, // 2 hours
  currentQuestion: 14,           // resume index
  totalQuestions: 50,
  mode: 'timed',                 // 'timed' | 'untimed' | 'practice'
};

const SAMPLE_QUESTIONS = [
  { id: 1,  section: 'Section A', marks: 1, text: 'Define the term ecosystem.', type: 'text' },
  { id: 2,  section: 'Section A', marks: 1, text: 'State two characteristics of living organisms.', type: 'text' },
  { id: 3,  section: 'Section A', marks: 2, text: 'Explain the role of chlorophyll in photosynthesis.', type: 'text' },
  { id: 4,  section: 'Section A', marks: 1, text: 'Name the organ responsible for filtering blood.', type: 'text' },
  { id: 5,  section: 'Section A', marks: 2, text: 'Describe the process of osmosis.', type: 'text' },
  { id: 6,  section: 'Section A', marks: 1, text: 'What is the role of red blood cells?', type: 'text' },
  { id: 7,  section: 'Section A', marks: 2, text: 'State two functions of the cell membrane.', type: 'text' },
  { id: 8,  section: 'Section A', marks: 2, text: 'Differentiate between mitosis and meiosis.', type: 'text' },
  { id: 9,  section: 'Section A', marks: 1, text: 'Name the process of cell division in bacteria.', type: 'text' },
  { id: 10, section: 'Section A', marks: 1, text: 'What is a trophic level?', type: 'text' },
  { id: 11, section: 'Section A', marks: 2, text: 'Outline the role of decomposers in an ecosystem.', type: 'text' },
  { id: 12, section: 'Section A', marks: 1, text: 'Name one sexually transmitted disease.', type: 'text' },
  { id: 13, section: 'Section A', marks: 1, text: 'What is a vector in biology?', type: 'text' },
  {
    id: 14,
    section: 'Section A',
    marks: 2,
    text: 'Name the process by which plants lose water vapour through their leaves.',
    type: 'text',
  },
  { id: 15, section: 'Section A', marks: 2, text: 'State two adaptations of xerophytes.', type: 'text' },
  // ...
];

/* -------------------- helpers -------------------- */

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* -------------------- components -------------------- */

function TimerBadge({ seconds, colors }) {
  const styles = makeStyles(colors);
  const isUrgent = seconds <= 5 * 60; // under 5 minutes
  const isVeryUrgent = seconds <= 60;

  return (
    <View
      style={[
        styles.timerBadge,
        isUrgent && styles.timerBadgeUrgent,
        isVeryUrgent && styles.timerBadgeCritical,
      ]}
    >
      <Ionicons
        name="time-outline"
        size={14}
        color={isVeryUrgent ? '#e25b5b' : isUrgent ? '#e0a93a' : colors.fg}
      />
      <Text
        style={[
          styles.timerText,
          isUrgent && styles.timerTextUrgent,
          isVeryUrgent && styles.timerTextCritical,
        ]}
      >
        {formatTime(seconds)}
      </Text>
    </View>
  );
}

function ProgressBar({ current, total, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((current / total) * 100);

  return (
    <View style={styles.progressBlock}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.progressLabel}>
        Q{current} of {total} · {pct}%
      </Text>
    </View>
  );
}

function QuestionNavigator({
  total,
  current,
  answered,
  flagged,
  onJump,
  colors,
}) {
  const styles = makeStyles(colors);

  return (
    <View style={styles.navBlock}>
      <Text style={styles.navLabel}>QUESTION NAVIGATOR</Text>
      <ScrollView
        style={{ maxHeight: 160 }}
        contentContainerStyle={styles.navGrid}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
          const isCurrent = n === current;
          const isAnswered = answered.has(n);
          const isFlagged = flagged.has(n);

          return (
            <TouchableOpacity
              key={n}
              style={[
                styles.navCell,
                isCurrent && styles.navCellCurrent,
                isAnswered && !isCurrent && styles.navCellAnswered,
                isFlagged && styles.navCellFlagged,
              ]}
              onPress={() => onJump(n)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.navCellText,
                  isCurrent && styles.navCellTextCurrent,
                  isAnswered && !isCurrent && styles.navCellTextAnswered,
                ]}
              >
                {n}
              </Text>
              {isFlagged && !isCurrent ? (
                <View style={styles.flagDot} />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4caf7d' }]} />
          <Text style={styles.legendText}>Answered</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>Current</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#e0a93a' }]} />
          <Text style={styles.legendText}>Flagged</Text>
        </View>
      </View>
    </View>
  );
}

/* -------------------- time's up modal -------------------- */

function TimesUpModal({ visible, answered, total, onSubmit, onSaveDraft, colors }) {
  const styles = makeStyles(colors);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalSheet}>
          <Ionicons name="time-outline" size={32} color="#e25b5b" />
          <Text style={styles.modalTitle}>Time's up</Text>
          <Text style={styles.modalBody}>
            You answered {answered} of {total} questions.
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalSecondary}
              onPress={onSaveDraft}
              activeOpacity={0.7}
            >
              <Text style={styles.modalSecondaryText}>SAVE DRAFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalPrimary}
              onPress={onSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.modalPrimaryText}>SUBMIT ANSWERS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* -------------------- screen -------------------- */

export default function PastPaperAttempt({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const paper = useMemo(
    () => ({
      ...BASE_PAPER,
      ...(route?.params?.paper ?? {}),
    }),
    [route?.params?.paper]
  );

  const questions = SAMPLE_QUESTIONS;

  const [current, setCurrent] = useState(paper.currentQuestion);
  const [answers, setAnswers] = useState(() => ({}));
  const [flagged, setFlagged] = useState(() => new Set());
  const [timeLeft, setTimeLeft] = useState(paper.durationSeconds);
  const [timesUpVisible, setTimesUpVisible] = useState(false);

  const currentQ = questions.find((q) => q.id === current) ?? questions[0];

  const answered = useMemo(
    () => new Set(
      Object.keys(answers).filter((k) => String(answers[k] ?? '').trim().length > 0).map(Number)
    ),
    [answers]
  );

  /* ---- Timer ---- */
  useEffect(() => {
    if (paper.mode !== 'timed') return;
    if (timeLeft <= 0) {
      setTimesUpVisible(true);
      return;
    }
    const t = setInterval(() => {
      setTimeLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [paper.mode, timeLeft]);

  /* ---- Auto-save (silent) every 10s ---- */
  useEffect(() => {
    const t = setInterval(() => {
      // api.post('/attempts/:id/autosave', { answers });
    }, 10000);
    return () => clearInterval(t);
  }, [answers]);

  /* ---- Answer input ---- */
  const onAnswerChange = (text) => {
    setAnswers((a) => ({ ...a, [currentQ.id]: text }));
  };

  /* ---- Flag toggle ---- */
  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) next.delete(currentQ.id);
      else next.add(currentQ.id);
      return next;
    });
  };

  /* ---- Navigation ---- */
  const goTo = (n) => {
    if (n < 1 || n > questions.length) return;
    setCurrent(n);
  };
  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  /* ---- Save & exit ---- */
  const handleSaveExit = () => {
    Alert.alert(
      'Save & exit',
      'Your answers are saved. You can resume later from the paper page.',
      [
        { text: 'Stay', style: 'cancel' },
        {
          text: 'Save & exit',
          onPress: () => {
            // api.post('/attempts/:id/save', { answers });
            navigation?.goBack();
          },
        },
      ]
    );
  };

  /* ---- Time's up actions ---- */
  const handleSubmit = () => {
    setTimesUpVisible(false);
    // api.post('/attempts/:id/submit', { answers });
    Alert.alert('Submitted', 'Your paper has been submitted for marking.');
    navigation?.goBack();
  };

  const handleSaveDraft = () => {
    setTimesUpVisible(false);
    // api.post('/attempts/:id/save', { answers });
    Alert.alert('Saved', 'Your draft has been saved.');
    navigation?.goBack();
  };

  /* ---- Submit anytime (from header) ---- */
  const handleManualSubmit = () => {
    const answeredCount = answered.size;
    const unansweredCount = questions.length - answeredCount;
    Alert.alert(
      'Submit paper?',
      `You have answered ${answeredCount} of ${questions.length}.` +
        (unansweredCount > 0
          ? ` ${unansweredCount} question${unansweredCount === 1 ? '' : 's'} still unanswered.`
          : ''),
      [
        { text: 'Keep working', style: 'cancel' },
        { text: 'Submit', onPress: handleSubmit },
      ]
    );
  };

  return (
    <Layout>
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSaveExit} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {paper.title}
        </Text>
        {paper.mode === 'timed' ? (
          <TimerBadge seconds={timeLeft} colors={colors} />
        ) : (
          <View style={{ width: 22 }} />
        )}
      </View>

      {/* ===== PROGRESS BAR ===== */}
      <ProgressBar
        current={current}
        total={questions.length}
        colors={colors}
      />

      {/* ===== QUESTION SCROLL ===== */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Section + question header */}
        <View style={styles.questionHeader}>
          <Text style={styles.sectionLabel}>
            {currentQ.section} · Question {currentQ.id}
          </Text>
          <Text style={styles.marksLabel}>
            ({currentQ.marks} {currentQ.marks === 1 ? 'mark' : 'marks'})
          </Text>
        </View>

        {/* Question text */}
        <Text style={styles.questionText}>{currentQ.text}</Text>

        {/* Answer input */}
        <Text style={styles.answerLabel}>YOUR ANSWER</Text>
        <TextInput
          style={styles.answerInput}
          placeholder="Type your answer…"
          placeholderTextColor={colors.placeholder}
          value={answers[currentQ.id] ?? ''}
          onChangeText={onAnswerChange}
          multiline
          textAlignVertical="top"
        />

        {/* Options */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => Alert.alert('Insert image', 'Wire to ImagePicker')}
            activeOpacity={0.7}
          >
            <Ionicons name="image-outline" size={14} color={colors.fg} />
            <Text style={styles.optionBtnText}>INSERT IMAGE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => Alert.alert('Attach file', 'Wire to DocumentPicker')}
            activeOpacity={0.7}
          >
            <Ionicons name="attach-outline" size={14} color={colors.fg} />
            <Text style={styles.optionBtnText}>ATTACH FILE</Text>
          </TouchableOpacity>
        </View>

        {/* Flag */}
        <TouchableOpacity
          style={[
            styles.flagBtn,
            flagged.has(currentQ.id) && styles.flagBtnActive,
          ]}
          onPress={toggleFlag}
          activeOpacity={0.7}
        >
          <Ionicons
            name={flagged.has(currentQ.id) ? 'flag' : 'flag-outline'}
            size={14}
            color={flagged.has(currentQ.id) ? '#e0a93a' : colors.fg}
          />
          <Text
            style={[
              styles.flagBtnText,
              flagged.has(currentQ.id) && styles.flagBtnTextActive,
            ]}
          >
            {flagged.has(currentQ.id) ? 'FLAGGED FOR REVIEW' : 'FLAG FOR REVIEW'}
          </Text>
        </TouchableOpacity>

        {/* Prev / Next */}
        <View style={styles.navButtonsRow}>
          <TouchableOpacity
            style={[styles.navBtn, current === 1 && styles.navBtnDisabled]}
            onPress={goPrev}
            disabled={current === 1}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={14}
              color={current === 1 ? colors.fgMuted : colors.fg}
            />
            <Text
              style={[
                styles.navBtnText,
                current === 1 && styles.navBtnTextDisabled,
              ]}
            >
              PREVIOUS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navBtn,
              current === questions.length && styles.navBtnDisabled,
            ]}
            onPress={goNext}
            disabled={current === questions.length}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.navBtnText,
                current === questions.length && styles.navBtnTextDisabled,
              ]}
            >
              NEXT
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color={current === questions.length ? colors.fgMuted : colors.fg}
            />
          </TouchableOpacity>
        </View>

        {/* Save & exit */}
        <TouchableOpacity
          style={styles.saveExitBtn}
          onPress={handleSaveExit}
          activeOpacity={0.7}
        >
          <Text style={styles.saveExitBtnText}>SAVE & EXIT</Text>
        </TouchableOpacity>

        {/* Manual submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleManualSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.submitBtnText}>SUBMIT PAPER</Text>
        </TouchableOpacity>

        {/* Question navigator */}
        <QuestionNavigator
          total={questions.length}
          current={current}
          answered={answered}
          flagged={flagged}
          onJump={goTo}
          colors={colors}
        />
      </ScrollView>

      {/* ===== TIME'S UP MODAL ===== */}
      <TimesUpModal
        visible={timesUpVisible}
        answered={answered.size}
        total={questions.length}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        colors={colors}
      />
    </KeyboardAvoidingView>
    </Layout>
  );
}