// revision/past-papers/results/index.jsx
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const BASE_RESULT = {
  paperTitle: 'Biology Paper 1',
  scorePct: 71,
  marksObtained: 57,
  marksTotal: 80,
  grade: 'B',
  gradeTone: 'amber',       // 'green' | 'amber' | 'red'
  correct: 41,
  wrong: 6,
  skipped: 3,
  timeUsedLabel: '1h 42m',
  timeTotalLabel: '2h',
  sections: [
    { name: 'Section A', pct: 78 },
    { name: 'Section B', pct: 63 },
  ],
  topics: [
    { name: 'Cell biology', pct: 92, trend: 'good' },
    { name: 'Genetics',     pct: 67, trend: 'ok' },
    { name: 'Ecology',      pct: 48, trend: 'weak' },
  ],
  weakTopicQuestionCount: 12,
  questions: [
    {
      id: 14,
      title: 'Transpiration',
      yourAnswer: 'Transpiration',
      correctAnswer: 'Transpiration',
      marks: 2,
      earned: 2,
      status: 'correct',
    },
    {
      id: 15,
      title: 'Water potential',
      yourAnswer: 'Osmosis',
      correctAnswer: 'Water potential gradient',
      marks: 2,
      earned: 0,
      status: 'wrong',
    },
    {
      id: 16,
      title: null,
      yourAnswer: null,
      correctAnswer: 'Diffusion through the stomata',
      marks: 2,
      earned: 0,
      status: 'skipped',
    },
  ],
};

/* -------------------- helpers -------------------- */

function gradeTint(tone, colors) {
  if (tone === 'green') return '#4caf7d';
  if (tone === 'amber') return '#e0a93a';
  if (tone === 'red')   return '#e25b5b';
  return colors.fg;
}

function topicTint(trend, colors) {
  if (trend === 'good') return '#4caf7d';
  if (trend === 'ok')   return colors.fgMuted;
  if (trend === 'weak') return '#e25b5b';
  return colors.fgMuted;
}

function topicEmoji(trend) {
  if (trend === 'good') return '✅';
  if (trend === 'weak') return '🔴';
  return '';
}

/* -------------------- components -------------------- */

function HeroCard({ result, colors }) {
  const styles = makeStyles(colors);
  const tint = gradeTint(result.gradeTone, colors);

  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroScore}>{result.scorePct}%</Text>
      <Text style={styles.heroMarks}>
        {result.marksObtained} / {result.marksTotal} marks
      </Text>

      <View style={[styles.gradePill, { borderColor: tint }]}>
        <Text style={[styles.gradeText, { color: tint }]}>
          GRADE {result.grade}
        </Text>
      </View>

      <View style={styles.heroStatsBlock}>
        <View style={styles.heroStat}>
          <Text style={[styles.heroStatValue, { color: '#4caf7d' }]}>
            {result.correct}
          </Text>
          <Text style={styles.heroStatLabel}>CORRECT</Text>
        </View>
        <View style={styles.heroStat}>
          <Text style={[styles.heroStatValue, { color: '#e25b5b' }]}>
            {result.wrong}
          </Text>
          <Text style={styles.heroStatLabel}>WRONG</Text>
        </View>
        <View style={styles.heroStat}>
          <Text style={[styles.heroStatValue, { color: colors.fgMuted }]}>
            {result.skipped}
          </Text>
          <Text style={styles.heroStatLabel}>SKIPPED</Text>
        </View>
      </View>

      <Text style={styles.heroTime}>
        Time used · {result.timeUsedLabel} of {result.timeTotalLabel}
      </Text>
    </View>
  );
}

function BreakdownBar({ label, pct, tint, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.breakdownRow}>
      <Text style={styles.breakdownLabel} numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.breakdownTrack}>
        <View
          style={[
            styles.breakdownFill,
            { width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: tint },
          ]}
        />
      </View>
      <Text style={styles.breakdownPct}>{pct}%</Text>
    </View>
  );
}

function QuestionReviewCard({ item, onExplain, onAskAi, colors }) {
  const styles = makeStyles(colors);
  const isCorrect = item.status === 'correct';
  const isWrong = item.status === 'wrong';
  const isSkipped = item.status === 'skipped';

  const statusTint =
    isCorrect ? '#4caf7d' :
    isWrong ? '#e25b5b' :
    colors.fgMuted;

  const statusLabel =
    isCorrect ? `✅ ${item.earned}/${item.marks}` :
    isWrong ? `❌ ${item.earned}/${item.marks}` :
    `⚪ ${item.earned}/${item.marks}`;

  return (
    <View style={[styles.reviewCard, { borderLeftColor: statusTint }]}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewQ}>Q{item.id}</Text>
        <Text style={styles.reviewTitle} numberOfLines={1}>
          {item.title ?? (isSkipped ? '(skipped)' : '')}
        </Text>
        <Text style={[styles.reviewStatus, { color: statusTint }]}>
          {statusLabel}
        </Text>
      </View>

      {!isSkipped && item.yourAnswer ? (
        <View style={styles.answerRow}>
          <Text style={styles.answerLabel}>Your answer</Text>
          <Text style={styles.answerText} numberOfLines={2}>
            {item.yourAnswer}
          </Text>
        </View>
      ) : null}

      {isCorrect ? (
        <View style={styles.answerRow}>
          <Text style={styles.answerLabel}>Correct answer</Text>
          <Text style={styles.answerText} numberOfLines={2}>
            {item.correctAnswer}
          </Text>
        </View>
      ) : (
        <View style={styles.answerRow}>
          <Text style={styles.answerLabel}>Correct answer</Text>
          <Text style={[styles.answerText, styles.answerCorrect]} numberOfLines={2}>
            {item.correctAnswer}
          </Text>
        </View>
      )}

      {isWrong ? (
        <TouchableOpacity
          style={styles.askAiBtn}
          onPress={() => onAskAi(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={14} color={colors.accent} />
          <Text style={styles.askAiText}>ASK AI ABOUT THIS</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.explainBtn}
          onPress={() => onExplain(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.explainText}>VIEW EXPLANATION</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function AttemptResults({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const result = useMemo(
    () => ({ ...BASE_RESULT, ...(route?.params?.result ?? {}) }),
    [route?.params?.result]
  );

  const handlePracticeWeak = () => {
    navigation?.navigate('Student-Practice', {
      paperId: result.paperTitle,
      questionCount: result.weakTopicQuestionCount,
    });
  };

  const handleExplain = (item) => {
    Alert.alert(
      `Q${item.id} explanation`,
      `Correct answer: ${item.correctAnswer}\n\n(Explanation would load here.)`
    );
  };

  const handleAskAi = (item) => {
    navigation?.navigate('Student-Ai-Tutor', {
      seedPrompt: `Explain why the correct answer to Q${item.id} is "${item.correctAnswer}" and why "${item.yourAnswer}" is incorrect.`,
    });
  };

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          RESULTS · {result.paperTitle}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HERO ===== */}
        <HeroCard result={result} colors={colors} />

        {/* ===== BY SECTION ===== */}
        <Text style={styles.sectionTitle}>BREAKDOWN BY SECTION</Text>
        <View style={styles.breakdownBlock}>
          {result.sections.map((s) => (
            <BreakdownBar
              key={s.name}
              label={s.name}
              pct={s.pct}
              tint={colors.accent}
              colors={colors}
            />
          ))}
        </View>

        {/* ===== BY TOPIC ===== */}
        <Text style={styles.sectionTitle}>BREAKDOWN BY TOPIC</Text>
        <View style={styles.breakdownBlock}>
          {result.topics.map((t) => (
            <View key={t.name} style={styles.topicRow}>
              <BreakdownBar
                label={`${t.name}  ${topicEmoji(t.trend)}`}
                pct={t.pct}
                tint={topicTint(t.trend, colors)}
                colors={colors}
              />
            </View>
          ))}
        </View>

        {/* ===== PRACTICE WEAK ===== */}
        <TouchableOpacity
          style={styles.practiceBtn}
          onPress={handlePracticeWeak}
          activeOpacity={0.7}
        >
          <Ionicons name="flash-outline" size={16} color={colors.buttonFg} />
          <Text style={styles.practiceBtnText}>
            PRACTICE WEAK TOPICS ({result.weakTopicQuestionCount} QUESTIONS)
          </Text>
        </TouchableOpacity>

        {/* ===== QUESTION REVIEW ===== */}
        <Text style={styles.sectionTitle}>QUESTION REVIEW</Text>
        <View style={styles.reviewList}>
          {result.questions.map((q) => (
            <QuestionReviewCard
              key={q.id}
              item={q}
              onExplain={handleExplain}
              onAskAi={handleAskAi}
              colors={colors}
            />
          ))}
        </View>

        <Text style={styles.footnote}>
          Only questions with incorrect or skipped answers are shown here.
          Marking follows the official scheme.
        </Text>
      </ScrollView>
    </View>
  );
}