// src/pages/teachers/resources/question-bank/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- config -------------------- */

const SUBJECTS = [
  { key: 'all', label: 'ALL' },
  { key: 'bio', label: 'BIOLOGY' },
  { key: 'chem', label: 'CHEMISTRY' },
  { key: 'sci', label: 'SCIENCE' },
];

const TYPES = [
  { key: 'all',   label: 'ALL' },
  { key: 'mcq',   label: 'MCQ' },
  { key: 'short', label: 'SHORT' },
  { key: 'long',  label: 'LONG' },
];

const DIFFICULTY = [
  { key: 'all',    label: 'ALL' },
  { key: 'easy',   label: 'EASY' },
  { key: 'medium', label: 'MEDIUM' },
  { key: 'hard',   label: 'HARD' },
];

const SAMPLE = [
  {
    id: 'q1', subject: 'bio', type: 'mcq', difficulty: 'easy', points: 5,
    prompt: 'Which organelle produces ATP?',
    options: [
      { id: 'a', text: 'Nucleus' },
      { id: 'b', text: 'Mitochondria' },
      { id: 'c', text: 'Ribosome' },
    ],
    correct: 'b',
    tags: ['cells', 'organelles'],
    usedIn: 3,
  },
  {
    id: 'q2', subject: 'bio', type: 'short', difficulty: 'medium', points: 10,
    prompt: 'Define osmosis in one sentence.',
    correct: 'Movement of water across a semi-permeable membrane from low to high solute concentration.',
    tags: ['transport', 'membranes'],
    usedIn: 1,
  },
  {
    id: 'q3', subject: 'bio', type: 'mcq', difficulty: 'medium', points: 5,
    prompt: 'What is the powerhouse of the cell?',
    options: [
      { id: 'a', text: 'Nucleus' },
      { id: 'b', text: 'Mitochondria' },
      { id: 'c', text: 'Chloroplast' },
    ],
    correct: 'b',
    tags: ['cells'],
    usedIn: 2,
  },
  {
    id: 'q4', subject: 'bio', type: 'long', difficulty: 'hard', points: 20,
    prompt: 'Explain the process of photosynthesis including both light-dependent and light-independent reactions.',
    tags: ['photosynthesis', 'metabolism'],
    usedIn: 0,
  },
];

const DIFF_COLOR = { easy: '#4caf7d', medium: '#e0a93a', hard: '#e25b5b' };

/* -------------------- components -------------------- */

function QuestionRow({ item, onPress, onMenu, colors }) {
  const styles = makeStyles(colors);
  const diff = DIFF_COLOR[item.difficulty] ?? colors.fgMuted;

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{item.type.toUpperCase()}</Text>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.rowPrompt} numberOfLines={2}>{item.prompt}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.diffPill, { borderColor: diff }]}>
            <Text style={[styles.diffPillText, { color: diff }]}>
              {item.difficulty.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.metaText}>{item.points} pts</Text>
          <Text style={styles.metaText}>Used in {item.usedIn}</Text>
        </View>
        {item.tags.length > 0 && (
          <Text style={styles.tagText} numberOfLines={1}>
            {item.tags.map((t) => `#${t}`).join(' · ')}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onMenu(item)} hitSlop={8}>
        <Ionicons name="ellipsis-vertical" size={16} color={colors.fgMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function QuestionBank({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [type, setType] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const filtered = useMemo(() => {
    return SAMPLE.filter((q) => {
      const matchSubj = subject === 'all' || q.subject === subject;
      const matchType = type === 'all' || q.type === type;
      const matchDiff = difficulty === 'all' || q.difficulty === difficulty;
      const matchQuery =
        !query.trim() ||
        q.prompt.toLowerCase().includes(query.trim().toLowerCase()) ||
        q.tags.some((t) => t.includes(query.trim().toLowerCase()));
      return matchSubj && matchType && matchDiff && matchQuery;
    });
  }, [query, subject, type, difficulty]);

  const openCreate = () => navigation?.navigate('Teacher-Question-Form');
  const openEdit = (q) => navigation?.navigate('Teacher-Question-Form', { question: q });

  const openMenu = (q) => {
    Alert.alert(q.prompt.slice(0, 60), 'Choose an action', [
      { text: 'Edit', onPress: () => openEdit(q) },
      { text: 'Duplicate', onPress: () => Alert.alert('Duplicated') },
      { text: 'Add to quiz', onPress: () => Alert.alert('Add', 'Pick a quiz to add this question to.') },
      { text: 'Delete', style: 'destructive', onPress: () =>
          Alert.alert('Delete?', 'This question will be removed from the bank.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive' },
          ]),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={16} color={colors.fgMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search questions or tags…"
            placeholderTextColor={colors.placeholder}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={6}>
              <Ionicons name="close-circle" size={16} color={colors.fgMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={openCreate} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color={colors.accentContrast} />
          <Text style={styles.addBtnText}>NEW</Text>
        </TouchableOpacity>
      </View>

      {/* Subject chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.chipRow}
      >
        {SUBJECTS.map((s) => {
          const active = subject === s.key;
          return (
            <TouchableOpacity
              key={s.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSubject(s.key)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{s.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Type + difficulty */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>TYPE</Text>
        {TYPES.map((t) => {
          const active = type === t.key;
          return (
            <TouchableOpacity key={t.key} onPress={() => setType(t.key)} hitSlop={6}>
              <Text style={[styles.filterOption, active && styles.filterOptionActive]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>LEVEL</Text>
        {DIFFICULTY.map((d) => {
          const active = difficulty === d.key;
          return (
            <TouchableOpacity key={d.key} onPress={() => setDifficulty(d.key)} hitSlop={6}>
              <Text style={[styles.filterOption, active && styles.filterOptionActive]}>{d.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.countLabel}>
          {filtered.length} {filtered.length === 1 ? 'QUESTION' : 'QUESTIONS'}
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="help-circle-outline" size={28} color={colors.fgFaint} />
            <Text style={styles.emptyText}>No questions match</Text>
          </View>
        ) : (
          <View style={styles.listBlock}>
            {filtered.map((q) => (
              <QuestionRow
                key={q.id}
                item={q}
                onPress={() => openEdit(q)}
                onMenu={openMenu}
                colors={colors}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}