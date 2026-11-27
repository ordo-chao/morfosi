// revision/flashcards/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const TABS = [
  { key: 'my',     label: 'MY DECKS' },
  { key: 'school', label: 'SCHOOL DECKS' },
  { key: 'create', label: 'CREATE' },
];

const DECKS = [
  {
    id: 'd1',
    emoji: '🎴',
    subject: 'Biology',
    name: 'Cell Division',
    total: 12,
    due: 12,
    reviewedToday: 8,
    lastStudied: null,
    section: 'due',
  },
  {
    id: 'd2',
    emoji: '🎴',
    subject: 'Chemistry',
    name: 'Organic reactions',
    total: 2,
    due: 2,
    reviewedToday: 0,
    lastStudied: null,
    section: 'due',
  },
  {
    id: 'd3',
    emoji: '🎴',
    subject: 'Math',
    name: 'Trigonometry',
    total: 24,
    due: 0,
    reviewedToday: 0,
    lastStudied: '2 days ago',
    section: 'all',
  },
  {
    id: 'd4',
    emoji: '🎴',
    subject: 'Physics',
    name: 'Forces',
    total: 18,
    due: 0,
    reviewedToday: 0,
    lastStudied: '5 days ago',
    section: 'all',
  },
];

/* -------------------- components -------------------- */

function DeckCard({ deck, onReview, colors }) {
  const styles = makeStyles(colors);
  const isDue = deck.section === 'due';

  return (
    <View style={styles.deckCard}>
      <View style={styles.deckHeader}>
        <View style={styles.deckEmojiWrap}>
          <Text style={styles.deckEmoji}>{deck.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.deckSubject}>{deck.subject}</Text>
          <Text style={styles.deckName}>{deck.name}</Text>
        </View>
        {!isDue && (
          <View style={styles.countPill}>
            <Text style={styles.countPillText}>{deck.total}</Text>
          </View>
        )}
      </View>

      <View style={styles.deckStats}>
        {isDue ? (
          <>
            <Text style={styles.deckMeta}>
              <Text style={styles.deckMetaStrong}>{deck.due}</Text> cards due
            </Text>
            <Text style={styles.deckMeta}>
              <Text style={styles.deckMetaStrong}>{deck.reviewedToday}</Text> reviewed today
            </Text>
          </>
        ) : (
          <Text style={styles.deckMeta}>
            Last studied {deck.lastStudied}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.reviewBtn}
        onPress={() => onReview(deck)}
        activeOpacity={0.7}
      >
        <Text style={styles.reviewBtnText}>REVIEW →</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Flashcards({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const [tab, setTab] = useState('my');

  const dueDecks = useMemo(
    () => DECKS.filter((d) => d.section === 'due'),
    []
  );
  const allDecks = useMemo(
    () => DECKS.filter((d) => d.section === 'all'),
    []
  );
  const totalDue = dueDecks.reduce((s, d) => s + d.due, 0);

  const handleReview = (deck) => {
    navigation?.navigate('Student-Flashcards-Review', { deck });
  };

  const handleNewDeck = () => {
    Alert.alert('New deck', 'Deck creation coming soon');
  };

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FLASHCARDS</Text>
        <TouchableOpacity onPress={handleNewDeck} hitSlop={8}>
          <Ionicons name="add" size={22} color={colors.fg} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setTab(t.key)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {tab === 'my' && (
          <>
            {/* Due today */}
            {dueDecks.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>
                  DUE TODAY ({totalDue} CARDS)
                </Text>
                <View style={styles.deckList}>
                  {dueDecks.map((d) => (
                    <DeckCard
                      key={d.id}
                      deck={d}
                      onReview={handleReview}
                      colors={colors}
                    />
                  ))}
                </View>
              </>
            )}

            {/* All decks */}
            {allDecks.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>ALL DECKS</Text>
                <View style={styles.deckList}>
                  {allDecks.map((d) => (
                    <DeckCard
                      key={d.id}
                      deck={d}
                      onReview={handleReview}
                      colors={colors}
                    />
                  ))}
                </View>
              </>
            )}

            {dueDecks.length === 0 && allDecks.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyEmoji}>🎴</Text>
                <Text style={styles.emptyTitle}>No decks yet</Text>
                <Text style={styles.emptySub}>
                  Create your first deck to start learning.
                </Text>
              </View>
            )}
          </>
        )}

        {tab === 'school' && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🏫</Text>
            <Text style={styles.emptyTitle}>No school decks</Text>
            <Text style={styles.emptySub}>
              Decks shared by your teachers will appear here.
            </Text>
          </View>
        )}

        {tab === 'create' && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>✨</Text>
            <Text style={styles.emptyTitle}>Create a new deck</Text>
            <Text style={styles.emptySub}>
              Build your own cards or import from a subject.
            </Text>
            <TouchableOpacity
              style={styles.createBtn}
              onPress={handleNewDeck}
              activeOpacity={0.7}
            >
              <Text style={styles.createBtnText}>NEW DECK</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}