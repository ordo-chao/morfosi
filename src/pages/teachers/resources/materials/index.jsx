// src/pages/teachers/resources/materials/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- config -------------------- */

const CATEGORIES = [
  { key: 'all',     label: 'ALL' },
  { key: 'notes',   label: 'NOTES' },
  { key: 'slides',  label: 'SLIDES' },
  { key: 'papers',  label: 'PAPERS' },
  { key: 'videos',  label: 'VIDEOS' },
  { key: 'links',   label: 'LINKS' },
];

const STATUSES = [
  { key: 'all',       label: 'ALL' },
  { key: 'published', label: 'PUBLISHED' },
  { key: 'draft',     label: 'DRAFTS' },
];

const SAMPLE = [
  {
    id: 'm1', title: 'Cell Structure — Chapter 3', category: 'notes', format: 'PDF',
    size: '1.2 MB', updated: '2 days ago', status: 'published',
    classes: ['Biology · 10A', 'Biology · 10B'],
    views: 84, downloads: 41,
  },
  {
    id: 'm2', title: 'Photosynthesis Overview', category: 'slides', format: 'PPTX',
    size: '4.8 MB', updated: '5 days ago', status: 'published',
    classes: ['Biology · 10A'],
    views: 52, downloads: 28,
  },
  {
    id: 'm3', title: 'Mid-Term 2025 — Biology', category: 'papers', format: 'PDF',
    size: '680 KB', updated: '1 week ago', status: 'published',
    classes: ['Biology · 10A', 'Biology · 10B', 'Biology · 11A'],
    views: 120, downloads: 60,
  },
  {
    id: 'm4', title: 'Genetics Notes (Wk 4–5)', category: 'notes', format: 'PDF',
    size: '920 KB', updated: '1 week ago', status: 'draft',
    classes: [],
    views: 0, downloads: 0,
  },
  {
    id: 'm5', title: 'Mitosis Walkthrough', category: 'videos', format: 'MP4',
    size: '48 MB', updated: '2 weeks ago', status: 'published',
    classes: ['Biology · 10A'],
    views: 96, downloads: 40, duration: '12:34',
  },
];

function formatIcon(format) {
  const map = { PDF: 'file-text', PPTX: 'file', MP4: 'video', DOCX: 'file', XLSX: 'grid' };
  return map[format] ?? 'file';
}

/* -------------------- components -------------------- */

function MaterialRow({ item, onPress, onMenu, colors }) {
  const styles = makeStyles(colors);
  const isDraft = item.status === 'draft';

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Feather name={formatIcon(item.format)} size={18} color={colors.fg} />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {item.format} · {item.size}
          {item.duration ? ` · ${item.duration}` : ''} · {item.updated}
        </Text>
        <View style={styles.rowChips}>
          {isDraft ? (
            <View style={[styles.statusPill, { borderColor: '#e0a93a' }]}>
              <Text style={[styles.statusPillText, { color: '#e0a93a' }]}>DRAFT</Text>
            </View>
          ) : (
            <View style={[styles.statusPill, { borderColor: '#4caf7d' }]}>
              <Text style={[styles.statusPillText, { color: '#4caf7d' }]}>PUBLISHED</Text>
            </View>
          )}
          {item.classes.length > 0 && (
            <Text style={styles.classesText} numberOfLines={1}>
              {item.classes.length} class{item.classes.length > 1 ? 'es' : ''}
            </Text>
          )}
          <Text style={styles.classesText}>
            {item.views} views · {item.downloads} downloads
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => onMenu(item)} hitSlop={8}>
        <Ionicons name="ellipsis-vertical" size={16} color={colors.fgMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherMaterials({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return SAMPLE.filter((m) => {
      const matchCat = category === 'all' || m.category === category;
      const matchStatus = status === 'all' || m.status === status;
      const matchQuery =
        !query.trim() || m.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchCat && matchStatus && matchQuery;
    });
  }, [query, category, status]);

  const openCreate = () => navigation?.navigate('Teacher-Materials-Form');
  const openDetail = (m) => navigation?.navigate('Teacher-Material-Detail', { material: m });

  const openMenu = (m) => {
    Alert.alert(
      m.title,
      'Choose an action',
      [
        { text: 'Edit', onPress: () => navigation?.navigate('Teacher-Materials-Form', { material: m }) },
        { text: m.status === 'published' ? 'Unpublish' : 'Publish', onPress: () => Alert.alert('Toggled', 'Status updated') },
        { text: 'Duplicate', onPress: () => Alert.alert('Duplicated', m.title) },
        { text: 'Delete', style: 'destructive', onPress: () =>
            Alert.alert('Delete', `Delete "${m.title}"?`, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive' },
            ]),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={16} color={colors.fgMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials…"
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
          <Text style={styles.addBtnText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.chipRow}
      >
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <TouchableOpacity
              key={c.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setCategory(c.key)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{c.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Status chips */}
      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>STATUS</Text>
        {STATUSES.map((s) => {
          const active = status === s.key;
          return (
            <TouchableOpacity key={s.key} onPress={() => setStatus(s.key)} hitSlop={6}>
              <Text style={[styles.statusOption, active && styles.statusOptionActive]}>
                {s.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.countLabel}>
          {filtered.length} {filtered.length === 1 ? 'ITEM' : 'ITEMS'}
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={28} color={colors.fgFaint} />
            <Text style={styles.emptyText}>No materials match</Text>
          </View>
        ) : (
          <View style={styles.listBlock}>
            {filtered.map((m) => (
              <MaterialRow
                key={m.id}
                item={m}
                onPress={() => openDetail(m)}
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