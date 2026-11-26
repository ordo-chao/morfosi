// src/pages/teachers/resources/question-bank/create/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Layout from '../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const TYPES = [
  { key: 'mcq',   label: 'MULTIPLE CHOICE' },
  { key: 'short', label: 'SHORT ANSWER' },
  { key: 'long',  label: 'LONG ANSWER' },
];

const DIFF = [
  { key: 'easy',   label: 'EASY' },
  { key: 'medium', label: 'MEDIUM' },
  { key: 'hard',   label: 'HARD' },
];

const BASE = {
  type: 'mcq',
  difficulty: 'medium',
  points: 5,
  prompt: '',
  options: [
    { id: 'a', text: '' },
    { id: 'b', text: '' },
    { id: 'c', text: '' },
    { id: 'd', text: '' },
  ],
  correct: 'a',
  correctText: '',
  tags: '',
};

export default function TeacherQuestionCreate({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const editing = route?.params?.question;
  const initial = useMemo(() => ({ ...BASE, ...(editing ?? {}) }), [editing]);

  const [type, setType]             = useState(initial.type);
  const [difficulty, setDifficulty] = useState(initial.difficulty);
  const [points, setPoints]         = useState(String(initial.points));
  const [prompt, setPrompt]         = useState(initial.prompt);
  const [options, setOptions]       = useState(initial.options);
  const [correct, setCorrect]       = useState(initial.correct);
  const [correctText, setCorrectText] = useState(initial.correctText);
  const [tags, setTags]             = useState(
    Array.isArray(initial.tags) ? initial.tags.join(', ') : (initial.tags ?? '')
  );

  const isEdit = !!editing;

  const isValid =
    prompt.trim().length > 0 &&
    (type === 'mcq'
      ? options.every((o) => o.text.trim().length > 0) && correct
      : correctText.trim().length > 0);

  const updateOption = (id, text) =>
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)));

  const addOption = () =>
    setOptions((prev) => [
      ...prev,
      { id: String.fromCharCode(97 + prev.length), text: '' },
    ]);

  const removeOption = (id) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  const onSave = () => {
    if (!isValid) return;
    const payload = {
      type, difficulty, points: Number(points) || 0, prompt,
      options: type === 'mcq' ? options : [],
      correct: type === 'mcq' ? correct : undefined,
      correctText: type !== 'mcq' ? correctText : undefined,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    // TODO: POST/PATCH /api/teacher/questions
    Alert.alert(
      isEdit ? 'Question updated' : 'Question added',
      `Saved ${payload.type.toUpperCase()} (${payload.points} pts)`,
      [{ text: 'OK', onPress: () => navigation?.goBack() }],
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="close" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {isEdit ? 'EDIT QUESTION' : 'NEW QUESTION'}
          </Text>
          <TouchableOpacity onPress={onSave} disabled={!isValid} hitSlop={8}>
            <Text style={[styles.headerAction, !isValid && { opacity: 0.4 }]}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>TYPE</Text>
          <View style={styles.chipsWrap}>
            {TYPES.map((t) => {
              const active = type === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setType(t.key)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{t.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>DIFFICULTY</Text>
          <View style={styles.chipsWrap}>
            {DIFF.map((d) => {
              const active = difficulty === d.key;
              return (
                <TouchableOpacity
                  key={d.key}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setDifficulty(d.key)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{d.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>POINTS</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={points}
            onChangeText={(v) => setPoints(v.replace(/[^0-9]/g, ''))}
          />

          <Text style={styles.sectionLabel}>QUESTION PROMPT</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Write the question…"
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
          />

          {type === 'mcq' ? (
            <>
              <Text style={styles.sectionLabel}>OPTIONS</Text>
              {options.map((o) => (
                <View key={o.id} style={styles.optionRow}>
                  <TouchableOpacity
                    style={[styles.correctBtn, correct === o.id && styles.correctBtnActive]}
                    onPress={() => setCorrect(o.id)}
                  >
                    <Text style={[styles.correctBtnText, correct === o.id && styles.correctBtnTextActive]}>
                      {correct === o.id ? '✓' : o.id.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.optionInput}
                    value={o.text}
                    onChangeText={(v) => updateOption(o.id, v)}
                    placeholder={`Option ${o.id.toUpperCase()}`}
                    placeholderTextColor={colors.placeholder}
                  />
                  {options.length > 2 && (
                    <TouchableOpacity onPress={() => removeOption(o.id)} hitSlop={6}>
                      <Feather name="x" size={14} color={colors.fgMuted} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addOptionBtn} onPress={addOption}>
                <Feather name="plus" size={14} color={colors.accent} />
                <Text style={styles.addOptionText}>ADD OPTION</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.sectionLabel}>CORRECT ANSWER / MODEL ANSWER</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={correctText}
                onChangeText={setCorrectText}
                placeholder="Expected answer"
                placeholderTextColor={colors.placeholder}
                multiline
                textAlignVertical="top"
              />
            </>
          )}

          <Text style={styles.sectionLabel}>TAGS</Text>
          <TextInput
            style={styles.input}
            value={tags}
            onChangeText={setTags}
            placeholder="cells, organelles (comma-separated)"
            placeholderTextColor={colors.placeholder}
          />

          <TouchableOpacity
            style={[styles.saveBtn, !isValid && { opacity: 0.4 }]}
            onPress={onSave}
            disabled={!isValid}
            activeOpacity={0.7}
          >
            <Text style={styles.saveBtnText}>{isEdit ? 'UPDATE QUESTION' : 'ADD TO BANK'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
}