// revision/past-papers/detail/index.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- defaults -------------------- */

const BASE_PAPER = {
  id: 'p1',
  title: 'KCSE 2024 · Biology Paper 1',
  subject: 'Biology',
  year: 2024,
  paperNumber: 1,
  durationLabel: '2 hours',
  durationMinutes: 120,
  totalMarks: 80,
  questionCount: 50,
  sections: 'Section A · Section B',
  hasMarkingScheme: true,
  description:
    'KCSE 2024 Biology Paper 1 covering cell biology, genetics, and ecology. Includes multiple-choice and structured questions.',
  attempts: [
    {
      id: 'a1',
      status: 'in-progress',
      startedLabel: 'Resume · 38 min elapsed',
      progress: { current: 14, total: 50 },
    },
    {
      id: 'a2',
      status: 'completed',
      score: 71,
      completedAt: 'Oct 20, 2026',
    },
  ],
  paperPdfUrl: 'https://example.com/kcse2024-bio-p1.pdf',
  schemePdfUrl: 'https://example.com/kcse2024-bio-p1-scheme.pdf',
};

/* -------------------- attempt modes -------------------- */

const ATTEMPT_MODES = [
  {
    key: 'timed',
    label: 'Timed',
    sub: (paper) => `${paper.durationLabel} — exam conditions`,
  },
  {
    key: 'untimed',
    label: 'Untimed',
    sub: () => 'Take as long as you need',
  },
  {
    key: 'practice',
    label: 'Practice',
    sub: () => '10 questions at a time',
  },
];

/* -------------------- components -------------------- */

function InfoRow({ icon, label, value, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function AttemptModeOption({ option, selected, onPress, paper, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[
        styles.modeRow,
        selected && styles.modeRowSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.modeLabel, selected && styles.modeLabelSelected]}>
          {option.label}
        </Text>
        <Text style={styles.modeSub}>{option.sub(paper)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function AttemptCard({ attempt, onResume, onReview, colors }) {
  const styles = makeStyles(colors);
  const isInProgress = attempt.status === 'in-progress';
  const isCompleted = attempt.status === 'completed';

  return (
    <View style={styles.attemptCard}>
      <View style={styles.attemptHeader}>
        <View
          style={[
            styles.attemptDot,
            {
              backgroundColor: isInProgress
                ? '#e0a93a'
                : isCompleted
                ? '#4caf7d'
                : colors.fgMuted,
            },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.attemptTitle}>
            {isInProgress
              ? 'In progress'
              : isCompleted
              ? `Completed · ${attempt.score}%`
              : 'Attempt'}
          </Text>
          <Text style={styles.attemptMeta}>
            {isInProgress && attempt.startedLabel}
            {isCompleted && `Completed ${attempt.completedAt}`}
          </Text>
          {isInProgress && attempt.progress && (
            <Text style={styles.attemptProgress}>
              Question {attempt.progress.current} of {attempt.progress.total}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.attemptBtn}
        onPress={() => (isInProgress ? onResume(attempt) : onReview(attempt))}
        activeOpacity={0.7}
      >
        <Text style={styles.attemptBtnText}>
          {isInProgress ? 'RESUME' : 'REVIEW ANSWERS'}
        </Text>
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function PastPaperDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const paper = { ...BASE_PAPER, ...(route?.params?.paper ?? {}) };
  const [mode, setMode] = useState('timed');

  const inProgressAttempt = paper.attempts.find((a) => a.status === 'in-progress');

  const handleStart = () => {
    navigation?.navigate('Student-Past-Papers-Attempt', {
      paperId: paper.id,
      mode,
    });
  };

  const handleResume = (attempt) => {
    navigation?.navigate('Student-Past-Papers-Attempt', {
      paperId: paper.id,
      attemptId: attempt.id,
      questionIndex: attempt.progress?.current,
    });
  };

  const handleReview = (attempt) => {
    navigation?.navigate('Student-PastPaperReview', {
      paperId: paper.id,
      attemptId: attempt.id,
    });
  };

  const handleDownloadPaper = () => {
    Alert.alert('Download', `Paper PDF: ${paper.paperPdfUrl}`);
  };

  const handleDownloadScheme = () => {
    if (!paper.hasMarkingScheme) {
      Alert.alert('Not available', 'Marking scheme for this paper is not yet available.');
      return;
    }
    Alert.alert('Download', `Marking scheme PDF: ${paper.schemePdfUrl}`);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {paper.title}
          </Text>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== PAPER INFO ===== */}
          <Text style={styles.sectionTitle}>PAPER INFO</Text>
          <View style={styles.infoBlock}>
            <InfoRow icon="📚" label="Subject"    value={paper.subject}               colors={colors} />
            <InfoRow icon="📅" label="Year"       value={String(paper.year)}           colors={colors} />
            <InfoRow icon="📝" label="Paper"      value={`Paper ${paper.paperNumber}`} colors={colors} />
            <InfoRow icon="⏱" label="Duration"   value={paper.durationLabel}          colors={colors} />
            <InfoRow icon="🏆" label="Total marks" value={String(paper.totalMarks)}    colors={colors} />
            <InfoRow
              icon="📄"
              label="Questions"
              value={`${paper.questionCount} (${paper.sections})`}
              colors={colors}
            />
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>
                {paper.hasMarkingScheme ? '✅' : '⚠'}
              </Text>
              <Text style={styles.infoLabel}>Marking</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: paper.hasMarkingScheme ? '#4caf7d' : '#e0a93a',
                  },
                ]}
              >
                {paper.hasMarkingScheme
                  ? 'Scheme available'
                  : 'Not yet available'}
              </Text>
            </View>
          </View>

          {/* ===== ABOUT ===== */}
          <Text style={styles.sectionTitle}>ABOUT THIS PAPER</Text>
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionText}>{paper.description}</Text>
          </View>

          {/* ===== ATTEMPT MODE ===== */}
          <Text style={styles.sectionTitle}>ATTEMPT MODE</Text>
          <View style={styles.modeBlock}>
            {ATTEMPT_MODES.map((option) => (
              <AttemptModeOption
                key={option.key}
                option={option}
                selected={mode === option.key}
                onPress={() => setMode(option.key)}
                paper={paper}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== ATTEMPTS ===== */}
          {paper.attempts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                ATTEMPTS ({paper.attempts.length})
              </Text>
              <View style={styles.attemptList}>
                {paper.attempts.map((attempt) => (
                  <AttemptCard
                    key={attempt.id}
                    attempt={attempt}
                    onResume={handleResume}
                    onReview={handleReview}
                    colors={colors}
                  />
                ))}
              </View>
            </>
          )}

          {/* ===== DOWNLOADS ===== */}
          <Text style={styles.sectionTitle}>DOWNLOADS</Text>
          <View style={styles.downloadsBlock}>
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={handleDownloadPaper}
              activeOpacity={0.7}
            >
              <Ionicons name="download-outline" size={16} color={colors.fg} />
              <Text style={styles.downloadBtnText}>DOWNLOAD PAPER PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.downloadBtn,
                !paper.hasMarkingScheme && styles.downloadBtnDisabled,
              ]}
              onPress={handleDownloadScheme}
              disabled={!paper.hasMarkingScheme}
              activeOpacity={0.7}
            >
              <Ionicons
                name="download-outline"
                size={16}
                color={paper.hasMarkingScheme ? colors.fg : colors.fgMuted}
              />
              <Text
                style={[
                  styles.downloadBtnText,
                  !paper.hasMarkingScheme && styles.downloadBtnTextDisabled,
                ]}
              >
                DOWNLOAD MARKING SCHEME
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== START ===== */}
          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleStart}
            activeOpacity={0.7}
          >
            <Ionicons name="rocket-outline" size={16} color={colors.buttonFg} />
            <Text style={styles.startBtnText}>
              {inProgressAttempt ? 'START NEW ATTEMPT' : 'START ATTEMPT'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footnote}>
            Your timer starts only when you tap Start. Previous attempts remain
            accessible.
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
}