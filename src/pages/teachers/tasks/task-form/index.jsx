// TeacherTaskForm.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const CLASS_OPTIONS = ['Biology · 10A', 'Biology · 10B', 'Biology · 11A'];

const BASE = {
  title: '',
  className: CLASS_OPTIONS[0],
  instructions: '',
  dueDate: '',
  points: '100',
  allowLate: true,
  visible: false,
  rubric: [
    { name: 'Content',    weight: '60%', max: 60 },
    { name: 'Structure',  weight: '20%', max: 20 },
    { name: 'Accuracy',   weight: '20%', max: 20 },
  ],
  attachments: [],
};

function Field({ label, children, styles }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

export default function TeacherTaskForm({ route, navigation }) {
  const existing = route?.params?.task;
  const isEdit = !!existing;

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [form, setForm] = useState(() => ({ ...BASE, ...(existing ?? {}) }));

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const updateRubric = (idx, key, value) => {
    setForm((f) => {
      const rubric = f.rubric.map((r, i) => (i === idx ? { ...r, [key]: value } : r));
      return { ...f, rubric };
    });
  };
  const addRubricRow = () =>
    setForm((f) => ({ ...f, rubric: [...f.rubric, { name: '', weight: '', max: 10 }] }));
  const removeRubricRow = (idx) =>
    setForm((f) => ({ ...f, rubric: f.rubric.filter((_, i) => i !== idx) }));

  const totalPoints = useMemo(
    () => form.rubric.reduce((s, r) => s + (Number(r.max) || 0), 0),
    [form.rubric],
  );

  const isValid = form.title.trim() && form.instructions.trim();

  const onSubmit = (publish) => {
    if (!isValid) {
      Alert.alert('Missing fields', 'Title and instructions are required.');
      return;
    }
    const payload = { ...form, visible: publish };
    // TODO: POST/PUT to API; then navigation.goBack()
    Alert.alert(
      publish ? (isEdit ? 'Updated & published' : 'Task published') : 'Draft saved',
      `${form.title} · ${form.rubric.length} rubric rows · ${totalPoints} pts`,
      [{ text: 'OK', onPress: () => navigation?.goBack() }],
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
          <Text style={styles.headerTitle}>
            {isEdit ? 'EDIT TASK' : 'NEW TASK'}
          </Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Field label="TITLE" styles={styles}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Biology Lab Report"
              placeholderTextColor={colors.placeholder}
              value={form.title}
              onChangeText={(v) => set('title', v)}
            />
          </Field>

          <Field label="CLASS" styles={styles}>
            <View style={styles.chipsWrap}>
              {CLASS_OPTIONS.map((c) => {
                const active = form.className === c;
                return (
                  <TouchableOpacity
                    key={c}
                    style={[styles.pill, active && styles.pillActive]}
                    onPress={() => set('className', c)}
                  >
                    <Text style={[styles.pillText, active && styles.pillTextActive]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Field>

          <Field label="INSTRUCTIONS" styles={styles}>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="What should students do?"
              placeholderTextColor={colors.placeholder}
              multiline
              textAlignVertical="top"
              value={form.instructions}
              onChangeText={(v) => set('instructions', v)}
            />
          </Field>

          <View style={styles.twoCol}>
            <Field label="DUE DATE" styles={styles}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD HH:mm"
                placeholderTextColor={colors.placeholder}
                value={form.dueDate}
                onChangeText={(v) => set('dueDate', v)}
              />
            </Field>
            <Field label="POINTS" styles={styles}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={form.points}
                onChangeText={(v) => set('points', v.replace(/[^0-9]/g, ''))}
              />
            </Field>
          </View>

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchLabel}>Allow late submissions</Text>
              <Text style={styles.switchHint}>
                Students can submit after the due date
              </Text>
            </View>
            <Switch
              value={form.allowLate}
              onValueChange={(v) => set('allowLate', v)}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>

          {/* Attachments */}
          <Field label="ATTACHMENTS" styles={styles}>
            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => Alert.alert('Attach', 'Wire to DocumentPicker')}
            >
              <Feather name="plus" size={14} color={colors.accent} />
              <Text style={styles.attachBtnText}>ADD FILE</Text>
            </TouchableOpacity>
            {form.attachments.map((a) => (
              <View key={a.id} style={styles.attachRow}>
                <Feather name="paperclip" size={14} color={colors.fg} />
                <Text style={styles.attachName} numberOfLines={1}>{a.name}</Text>
                <TouchableOpacity
                  hitSlop={6}
                  onPress={() =>
                    set('attachments', form.attachments.filter((x) => x.id !== a.id))
                  }
                >
                  <Feather name="x" size={14} color={colors.fgMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </Field>

          {/* Rubric */}
          <Field label={`RUBRIC · ${totalPoints} PTS`} styles={styles}>
            {form.rubric.map((r, i) => (
              <View key={i} style={styles.rubricRow}>
                <TextInput
                  style={[styles.input, styles.rubricNameInput]}
                  placeholder="Criterion"
                  placeholderTextColor={colors.placeholder}
                  value={r.name}
                  onChangeText={(v) => updateRubric(i, 'name', v)}
                />
                <TextInput
                  style={[styles.input, styles.rubricWeightInput]}
                  placeholder="%"
                  placeholderTextColor={colors.placeholder}
                  value={r.weight}
                  onChangeText={(v) => updateRubric(i, 'weight', v)}
                />
                <TextInput
                  style={[styles.input, styles.rubricMaxInput]}
                  placeholder="max"
                  keyboardType="numeric"
                  placeholderTextColor={colors.placeholder}
                  value={String(r.max)}
                  onChangeText={(v) => updateRubric(i, 'max', v.replace(/[^0-9]/g, ''))}
                />
                <TouchableOpacity onPress={() => removeRubricRow(i)} hitSlop={6}>
                  <Feather name="x" size={14} color={colors.fgMuted} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.attachBtn} onPress={addRubricRow}>
              <Feather name="plus" size={14} color={colors.accent} />
              <Text style={styles.attachBtnText}>ADD CRITERION</Text>
            </TouchableOpacity>
          </Field>
        </ScrollView>

        {/* Footer actions */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnGhost}
            onPress={() => onSubmit(false)}
          >
            <Text style={styles.btnGhostText}>SAVE DRAFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, !isValid && { opacity: 0.5 }]}
            onPress={() => onSubmit(true)}
            disabled={!isValid}
          >
            <Text style={styles.btnText}>
              {isEdit ? 'UPDATE & PUBLISH' : 'PUBLISH'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}