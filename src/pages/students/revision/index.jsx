// revision/index.jsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const GREETING = {
  name: 'Amina',
  examIn: 12,
  coverage: 68,          // 0-100
  examLabel: 'Exams start in 12 days',
};

const QUICK_START = [
  { key: 'papers',     emoji: '📄', label: 'Past Papers', route: 'Student-Past-Papers' },
  { key: 'tutor',      emoji: '💬', label: 'AI Tutor',    route: 'Student-Ai-Tutor'    },
  { key: 'flashcards', emoji: '🃏', label: 'Flashcards',  route: 'Student-Flashcards' },
  { key: 'progress',   emoji: '📊', label: 'My Progress', route: 'Student-Revision-Progress' },
];

const RESUME = [
  {
    id: 'r1',
    icon: 'document-text-outline',
    title: 'KCSE 2023 · Biology Paper 1',
    meta: 'Question 14 of 50 · 38 min elapsed',
    action: 'Resume',
    kind: 'paper',
  },
  {
    id: 'r2',
    icon: 'chatbubble-ellipses-outline',
    title: '"Explain photosynthesis in simple terms"',
    meta: 'Biology · Yesterday',
    action: 'Continue chat',
    kind: 'chat',
  },
];

const WEAK_TOPICS = [
  {
    id: 'w1',
    subject: 'Chemistry',
    topic: 'Organic reactions',
    pct: 52,
    urgency: 'high',
  },
  {
    id: 'w2',
    subject: 'Math',
    topic: 'Quadratic equations',
    pct: 68,
    urgency: 'medium',
  },
];

/* -------------------- helpers -------------------- */

function urgencyColor(urgency, colors) {
  if (urgency === 'high') return '#e25b5b';
  if (urgency === 'medium') return '#e0a93a';
  return colors.fgMuted;
}

/* -------------------- components -------------------- */

function GreetingCard({ data, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.max(0, Math.min(100, data.coverage));

  return (
    <View style={styles.greetCard}>
      <Text style={styles.greetTitle}>
        👋  Ready to study, {data.name}?
      </Text>
      <Text style={styles.greetMeta}>
        {data.examLabel}
      </Text>

      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{pct}% covered</Text>
      </View>
    </View>
  );
}

function QuickTile({ item, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.quickTile}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={item.label}
    >
      <Text style={styles.quickEmoji}>{item.emoji}</Text>
      <Text style={styles.quickLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
}

function ResumeCard({ item, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.resumeCard}>
      <View style={styles.resumeHeader}>
        <Ionicons name={item.icon} size={16} color={colors.accent} />
        <Text style={styles.resumeTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <Text style={styles.resumeMeta}>{item.meta}</Text>
      <TouchableOpacity
        style={styles.resumeBtn}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.resumeBtnText}>{item.action.toUpperCase()}</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </TouchableOpacity>
    </View>
  );
}

function WeakTopicCard({ item, onPractice, colors }) {
  const styles = makeStyles(colors);
  const tint = urgencyColor(item.urgency, colors);

  return (
    <View style={styles.weakCard}>
      <View style={styles.weakHeader}>
        <View style={[styles.weakDot, { backgroundColor: tint }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.weakTitle} numberOfLines={1}>
            {item.subject} · {item.topic}
          </Text>
        </View>
        <Text style={[styles.weakPct, { color: tint }]}>
          {item.pct}%
        </Text>
      </View>

      <TouchableOpacity
        style={styles.weakBtn}
        onPress={() => onPractice(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.weakBtnText}>PRACTICE 10 QUESTIONS →</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Revision({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handleQuickStart = (item) => {
    if (!item.route) {
      Alert.alert(item.label, 'Coming soon');
      return;
    }
    navigation?.navigate(item.route);
  };

  const handleResume = (item) => {
    Alert.alert('Resume', item.title);
  };

  const handlePractice = (item) => {
    Alert.alert(
      'Practice',
      `${item.subject} · ${item.topic} — 10 questions`
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>REVISION</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== GREETING ===== */}
          <GreetingCard data={GREETING} colors={colors} />

          {/* ===== QUICK START ===== */}
          <Text style={styles.sectionTitle}>QUICK START</Text>
          <View style={styles.quickGrid}>
            {QUICK_START.map((item) => (
              <QuickTile
                key={item.key}
                item={item}
                onPress={() => handleQuickStart(item)}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== CONTINUE ===== */}
          {RESUME.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                CONTINUE WHERE YOU LEFT OFF
              </Text>
              <View style={styles.resumeList}>
                {RESUME.map((item) => (
                  <ResumeCard
                    key={item.id}
                    item={item}
                    onPress={() => handleResume(item)}
                    colors={colors}
                  />
                ))}
              </View>
            </>
          )}

          {/* ===== WEAK TOPICS ===== */}
          {WEAK_TOPICS.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>
                WEAK TOPICS (FROM YOUR GRADES)
              </Text>
              <View style={styles.weakList}>
                {WEAK_TOPICS.map((item) => (
                  <WeakTopicCard
                    key={item.id}
                    item={item}
                    onPractice={handlePractice}
                    colors={colors}
                  />
                ))}
              </View>
            </>
          )}

          {/* ===== FOOTNOTE ===== */}
          <Text style={styles.footnote}>
            Weak topics are detected from your recent assessment scores.
            Practice questions adapt as your performance improves.
          </Text>
        </ScrollView>
      </View>
    </Layout>
  );
}