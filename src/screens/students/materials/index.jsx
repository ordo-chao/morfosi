// Materials.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Layout from '../../../layout.jsx';

/* -------------------- sample data -------------------- */

const CATEGORIES = [
  { key: 'all',         label: 'ALL',         icon: 'grid-outline' },
  { key: 'notes',       label: 'NOTES',       icon: 'document-text-outline' },
  { key: 'slides',      label: 'SLIDES',      icon: 'easel-outline' },
  { key: 'papers',      label: 'PAST PAPERS', icon: 'newspaper-outline' },
  { key: 'videos',      label: 'VIDEOS',      icon: 'play-circle-outline' },
];

const SAMPLE_MATERIALS = [
  { id: '1', category: 'notes',  title: 'Cell Structure — Chapter 3',  size: '1.2 MB', format: 'PDF', updated: '2 days ago',  teacher: 'Mr. Otieno' },
  { id: '2', category: 'slides', title: 'Photosynthesis Overview',     size: '4.8 MB', format: 'PPTX', updated: '5 days ago', teacher: 'Mr. Otieno' },
  { id: '3', category: 'papers', title: 'Mid-Term 2025 — Biology',     size: '680 KB', format: 'PDF', updated: '1 week ago', teacher: 'Mr. Otieno' },
  { id: '4', category: 'notes',  title: 'Genetics Notes (Wk 4–5)',     size: '920 KB', format: 'PDF', updated: '1 week ago', teacher: 'Mr. Otieno' },
  { id: '5', category: 'videos', title: 'Mitosis Walkthrough',         size: '48 MB',  format: 'MP4', updated: '2 weeks ago', teacher: 'Mr. Otieno', duration: '12:34' },
  { id: '6', category: 'papers', title: 'End-Term 2024 — Biology',     size: '710 KB', format: 'PDF', updated: '3 weeks ago', teacher: 'Mr. Otieno' },
  { id: '7', category: 'slides', title: 'Enzymes & Metabolism',        size: '3.1 MB', format: 'PPTX', updated: '3 weeks ago', teacher: 'Mr. Otieno' },
  { id: '8', category: 'notes',  title: 'Lab Safety Rules',            size: '340 KB', format: 'PDF', updated: '1 month ago', teacher: 'Mr. Otieno' },
];

/* -------------------- icons by format -------------------- */

function FileIcon({ format, color }) {
  const map = {
    PDF:  'file-text',
    PPTX: 'file',
    MP4:  'video',
  };
  return (
    <Feather name={map[format] ?? 'file'} size={18} color={color} />
  );
}

/* -------------------- components -------------------- */

function CategoryChip({ cat, active, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
<TouchableOpacity
  style={[styles.chip, active && styles.chipActive]}
  onPress={onPress}
  activeOpacity={0.7}
  hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}   // ← add
>
  <Ionicons
    name={cat.icon}
    size={11}                                            // ← was 12
    color={active ? colors.accentContrast : colors.fgMuted}
  />
  <Text style={[styles.chipText, active && styles.chipTextActive]} numberOfLines={1}>
    {cat.label}
  </Text>
</TouchableOpacity>
  );
}

function MaterialRow({ item, onOpen }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onOpen?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.rowIconWrap}>
        <FileIcon format={item.format} color={colors.fg} />
      </View>

      <View style={styles.rowBody}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rowMeta} numberOfLines={1}>
          {item.format} · {item.size}
          {item.duration ? ` · ${item.duration}` : ''} · {item.updated}
        </Text>
      </View>

      <Ionicons name="download-outline" size={18} color={colors.accent} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function Materials({ route, navigation }) {
  // route.params.subject may be passed from Classes → SubjectDetail → Materials
  const subject = route?.params?.subject ?? {
    name: 'Biology',
    teacher: 'Mr. Otieno',
    room: 'Lab 2',
  };

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return SAMPLE_MATERIALS.filter((m) => {
      const matchesCat = category === 'all' || m.category === category;
      const matchesQuery =
        query.trim() === '' ||
        m.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MATERIALS</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Subject banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>// SUBJECT</Text>
        <Text style={styles.bannerTitle}>{subject.name}</Text>
        <Text style={styles.bannerMeta}>
          {subject.teacher} · {subject.room}
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={16} color={colors.fgMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search materials…"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={16} color={colors.fgMuted} />
          </TouchableOpacity>
        )}
      </View>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.chipsRow}
  style={styles.chipsScroll}          // ← add this line
>
  {CATEGORIES.map((cat) => (
    <CategoryChip
      key={cat.key}
      cat={cat}
      active={category === cat.key}
      onPress={() => setCategory(cat.key)}
    />
  ))}
</ScrollView>

      {/* List */}
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
            <Text style={styles.emptyText}>No materials found</Text>
            <Text style={styles.emptySub}>
              Try a different category or search term.
            </Text>
          </View>
        ) : (
          <View style={styles.listBlock}>
            {filtered.map((item) => (
              <MaterialRow
                key={item.id}
                item={item}
                onOpen={(m) => navigation?.navigate('Student-Materials-Detail', { material: m })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
    </Layout>
  );
}