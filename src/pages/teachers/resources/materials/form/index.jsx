// src/pages/teachers/resources/materials/create/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Layout from '../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const CATEGORIES = [
  { key: 'notes',  label: 'NOTES' },
  { key: 'slides', label: 'SLIDES' },
  { key: 'papers', label: 'PAST PAPERS' },
  { key: 'videos', label: 'VIDEO' },
  { key: 'links',  label: 'LINK' },
];

const CLASSES = [
  'Biology · 10A', 'Biology · 10B', 'Biology · 11A',
  'Science · 8', 'Science · 9',
];

const BASE = {
  title: '',
  description: '',
  category: 'notes',
  classes: [],
  publishNow: true,
  teacherNote: '',
  attachment: null, // { name, size }
};

export default function TeacherMaterialCreate({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const editing = route?.params?.material;
  const initial = useMemo(() => ({ ...BASE, ...(editing ?? {}) }), [editing]);

  const [title, setTitle]           = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [category, setCategory]     = useState(initial.category);
  const [classes, setClasses]       = useState(initial.classes);
  const [publishNow, setPublishNow] = useState(initial.publishNow);
  const [teacherNote, setTeacherNote] = useState(initial.teacherNote);
  const [attachment, setAttachment] = useState(initial.attachment);

  const isEdit = !!editing;
  const isValid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    (attachment || category === 'links');

  const toggleClass = (cls) =>
    setClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );

  const attachFile = () => {
    // Wire DocumentPicker
    setAttachment({ name: 'cell_structure.pdf', size: '1.2 MB' });
  };

  const onSave = (publish) => {
    if (!isValid) return;
    // TODO: POST/PATCH /api/teacher/materials
    Alert.alert(
      publish ? (isEdit ? 'Updated & published' : 'Published') : 'Saved as draft',
      title,
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
            {isEdit ? 'EDIT MATERIAL' : 'NEW MATERIAL'}
          </Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>TITLE</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Cell Structure — Chapter 3"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={styles.sectionLabel}>DESCRIPTION</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Brief summary for students"
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.sectionLabel}>CATEGORY</Text>
          <View style={styles.chipsWrap}>
            {CATEGORIES.map((c) => {
              const active = category === c.key;
              return (
                <TouchableOpacity
                  key={c.key}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setCategory(c.key)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {c.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>
            {category === 'links' ? 'URL' : 'FILE'}
          </Text>
          {category === 'links' ? (
            <TextInput
              style={styles.input}
              placeholder="https://…"
              placeholderTextColor={colors.placeholder}
              autoCapitalize="none"
            />
          ) : (
            <>
              {attachment ? (
                <View style={styles.attachmentRow}>
                  <Feather name="paperclip" size={14} color={colors.fg} />
                  <Text style={styles.attachmentName} numberOfLines={1}>{attachment.name}</Text>
                  <Text style={styles.attachmentSize}>{attachment.size}</Text>
                  <TouchableOpacity onPress={() => setAttachment(null)} hitSlop={6}>
                    <Feather name="x" size={14} color={colors.fgMuted} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.attachBtn} onPress={attachFile} activeOpacity={0.7}>
                  <Feather name="upload" size={14} color={colors.accent} />
                  <Text style={styles.attachBtnText}>CHOOSE FILE</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <Text style={styles.sectionLabel}>ASSIGN TO CLASSES</Text>
          <View style={styles.chipsWrap}>
            {CLASSES.map((cls) => {
              const active = classes.includes(cls);
              return (
                <TouchableOpacity
                  key={cls}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleClass(cls)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{cls}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>TEACHER'S NOTE (OPTIONAL)</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={teacherNote}
            onChangeText={setTeacherNote}
            placeholder="Instructions for students before they open this material"
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.switchLabel}>Publish now</Text>
              <Text style={styles.switchHint}>Students see this immediately</Text>
            </View>
            <Switch
              value={publishNow}
              onValueChange={setPublishNow}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.draftBtn}
              onPress={() => onSave(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.draftBtnText}>SAVE DRAFT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryBtn, !isValid && { opacity: 0.4 }]}
              disabled={!isValid}
              onPress={() => onSave(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryBtnText}>
                {isEdit ? 'UPDATE' : 'PUBLISH'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}