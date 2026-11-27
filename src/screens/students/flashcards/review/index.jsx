// revision/flashcards/review/index.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- defaults -------------------- */

const BASE_DECK = {
  id: 'd1',
  subject: 'Biology',
  name: 'Cell Division',
};

const SAMPLE_CARDS = [
  {
    id: 'c1',
    front: 'What are the four main stages of mitosis?',
    back: 'Prophase, Metaphase, Anaphase, Telophase\n(PMAT)',
    tip: 'Remember PMAT',
  },
  {
    id: 'c2',
    front: 'What is the role of the spindle fibers?',
    back: 'They pull chromosomes apart during cell division.',
    tip: 'Spindles = the rope, chromosomes = the climbers.',
  },
  {
    id: 'c3',
    front: 'During which phase do chromosomes align at the middle?',
    back: 'Metaphase',
    tip: 'M for Middle.',
  },
];

/* -------------------- screen -------------------- */

export default function FlashcardReview({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const deck = { ...BASE_DECK, ...(route?.params?.deck ?? {}) };
  const cards = SAMPLE_CARDS;

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = cards[index];
  const total = cards.length;
  const pct = Math.round((index / total) * 100);

  const handleReveal = () => setRevealed(true);

  const goPrev = () => {
    if (index === 0) return;
    setIndex((i) => i - 1);
    setRevealed(false);
  };

  const goNext = () => {
    if (index + 1 >= total) {
      navigation?.goBack();
      return;
    }
    setIndex((i) => i + 1);
    setRevealed(false);
  };

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {deck.subject.toUpperCase()} · {deck.name.toUpperCase()}
        </Text>
        <Text style={styles.headerMeta}>
          {index + 1} / {total}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBlock}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 24 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={!revealed ? handleReveal : undefined}
          activeOpacity={revealed ? 1 : 0.9}
        >
          <Text style={styles.cardFront}>{current.front}</Text>

          {revealed && (
            <>
              <View style={styles.cardDivider} />
              <Text style={styles.cardBack}>{current.back}</Text>
              {current.tip ? (
                <Text style={styles.cardTip}>💡 Tip: {current.tip}</Text>
              ) : null}
            </>
          )}

          {!revealed && (
            <View style={styles.tapHint}>
              <Text style={styles.tapHintText}>TAP TO REVEAL</Text>
              <Ionicons name="eye-outline" size={14} color={colors.fgMuted} />
            </View>
          )}
        </TouchableOpacity>

        {/* Prev / Next */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, index === 0 && styles.navBtnDisabled]}
            onPress={goPrev}
            disabled={index === 0}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={14}
              color={index === 0 ? colors.fgMuted : colors.fg}
            />
            <Text
              style={[
                styles.navBtnText,
                index === 0 && styles.navBtnTextDisabled,
              ]}
            >
              PREVIOUS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={goNext}
            activeOpacity={0.7}
          >
            <Text style={styles.navBtnText}>
              {index + 1 >= total ? 'FINISH' : 'NEXT'}
            </Text>
            <Ionicons name="chevron-forward" size={14} color={colors.fg} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}