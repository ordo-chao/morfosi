// revision/past-papers/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const CHIPS = [
  { key: 'all',        label: 'ALL' },
  { key: 'year',       label: 'BY YEAR' },
  { key: 'subject',    label: 'BY SUBJECT' },
  { key: 'bookmarked', label: 'BOOKMARKED' },
];

const SUBJECTS = [
  { key: 'all',       label: 'All' },
  { key: 'biology',   label: 'Biology' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'math',      label: 'Math' },
  { key: 'english',   label: 'English' },
];

const YEARS = [
  { key: 'all',  label: 'All' },
  { key: '2025', label: '2025' },
  { key: '2024', label: '2024' },
  { key: '2023', label: '2023' },
];

const LEVELS = [
  { key: 'kcse', label: 'KCSE' },
  { key: 'mock', label: 'Mock' },
];

const PAPERS = [
  {
    id: 'p1',
    year: 2024,
    subject: 'biology',
    subjectLabel: 'Biology',
    level: 'kcse',
    paper: 1,
    title: 'KCSE 2024 · Biology Paper 1',
    subtitle: 'Section A + B',
    marks: 80,
    duration: '2h',
    hasMarkingScheme: true,
    addedDaysAgo: 120,
  },
  {
    id: 'p2',
    year: 2023,
    subject: 'biology',
    subjectLabel: 'Biology',
    level: 'kcse',
    paper: 1,
    title: 'KCSE 2023 · Biology Paper 1',
    subtitle: 'Section A + B',
    marks: 80,
    duration: '2h',
    hasMarkingScheme: true,
    inProgress: { current: 14, total: 50 },
    addedDaysAgo: 400,
  },
  {
    id: 'p3',
    year: 2023,
    subject: 'chemistry',
    subjectLabel: 'Chemistry',
    level: 'kcse',
    paper: 2,
    title: 'KCSE 2023 · Chemistry Paper 2',
    subtitle: null,
    marks: 80,
    duration: '2h',
    hasMarkingScheme: false,
    addedDaysAgo: 400,
  },
  {
    id: 'p4',
    year: 2025,
    subject: 'math',
    subjectLabel: 'Math',
    level: 'mock',
    paper: 1,
    title: 'Mock 2025 · Math Paper 1',
    subtitle: null,
    marks: 100,
    duration: '2h 30m',
    hasMarkingScheme: true,
    addedDaysAgo: 3,
  },
  {
    id: 'p5',
    year: 2024,
    subject: 'chemistry',
    subjectLabel: 'Chemistry',
    level: 'kcse',
    paper: 1,
    title: 'KCSE 2024 · Chemistry Paper 1',
    subtitle: null,
    marks: 80,
    duration: '2h',
    hasMarkingScheme: true,
    addedDaysAgo: 120,
  },
  {
    id: 'p6',
    year: 2023,
    subject: 'math',
    subjectLabel: 'Math',
    level: 'kcse',
    paper: 2,
    title: 'KCSE 2023 · Math Paper 2',
    subtitle: null,
    marks: 100,
    duration: '2h 30m',
    hasMarkingScheme: true,
    bookmarked: true,
    addedDaysAgo: 400,
  },
];

/* -------------------- small components -------------------- */

function FilterChip({ item, active, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

function FilterDropdown({ label, value, options, onChange, colors }) {
  const styles = makeStyles(colors);
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value);

  return (
    <View style={{ flex: 1, gap: 4 }}>
      <Text style={styles.filterLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownValue} numberOfLines={1}>
          {current?.label ?? '—'}
        </Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={12}
          color={colors.fgMuted}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownMenu}>
          {options.map((opt) => {
            const isActive = opt.key === value;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.dropdownItem,
                  isActive && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    isActive && styles.dropdownItemTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

function PaperCard({
  paper,
  bookmarked,
  onToggleBookmark,
  onOpen,
  onResume,
  colors,
}) {
  const styles = makeStyles(colors);
  const isNew = paper.addedDaysAgo <= 7;
  const inProgress = paper.inProgress;

  return (
    <View style={styles.paperCard}>
      <View style={styles.paperHeader}>
        <Ionicons name="document-text-outline" size={18} color={colors.fg} />
        <View style={{ flex: 1 }}>
          <Text style={styles.paperTitle} numberOfLines={2}>
            {paper.title}
          </Text>
          <Text style={styles.paperMeta} numberOfLines={1}>
            {paper.subtitle ? `${paper.subtitle} · ` : ''}
            {paper.marks} marks · {paper.duration}
          </Text>
        </View>
      </View>

      {/* Badges row */}
      <View style={styles.badgeRow}>
        {paper.hasMarkingScheme ? (
          <View style={styles.badgeGreen}>
            <Text style={styles.badgeGreenText}>✓ MARKING SCHEME</Text>
          </View>
        ) : (
          <View style={styles.badgeAmber}>
            <Text style={styles.badgeAmberText}>⚠ NO MARKING SCHEME</Text>
          </View>
        )}

        {inProgress && (
          <View style={styles.badgeNeutral}>
            <Text style={styles.badgeNeutralText}>
              ⏱ Q{inProgress.current}/{inProgress.total}
            </Text>
          </View>
        )}

        {isNew && (
          <View style={styles.badgeAccent}>
            <Text style={styles.badgeAccentText}>NEW</Text>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.paperActions}>
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => onToggleBookmark(paper.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={14}
            color={bookmarked ? colors.accent : colors.fgMuted}
          />
          <Text
            style={[
              styles.bookmarkText,
              bookmarked && { color: colors.accent, fontWeight: '900' },
            ]}
          >
            {bookmarked ? 'BOOKMARKED' : 'BOOKMARK'}
          </Text>
        </TouchableOpacity>

        {inProgress ? (
          <TouchableOpacity
            style={styles.resumeBtn}
            onPress={() => onResume(paper)}
            activeOpacity={0.7}
          >
            <Text style={styles.resumeText}>RESUME</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => onOpen(paper)}
          activeOpacity={0.7}
        >
          <Text style={styles.openText}>OPEN</Text>
          <Ionicons name="chevron-forward" size={12} color={colors.buttonFg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function PastPapers({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [chip, setChip] = useState('all');
  const [subject, setSubject] = useState('all');
  const [year, setYear] = useState('all');
  const [level, setLevel] = useState('kcse');
  const [paperNum, setPaperNum] = useState('all');
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [bookmarks, setBookmarks] = useState(
    () => new Set(PAPERS.filter((p) => p.bookmarked).map((p) => p.id))
  );

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setChip('all');
    setSubject('all');
    setYear('all');
    setLevel('kcse');
    setPaperNum('all');
    setQuery('');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PAPERS
      .filter((p) => {
        if (chip === 'bookmarked' && !bookmarks.has(p.id)) return false;
        if (subject !== 'all' && p.subject !== subject) return false;
        if (year !== 'all' && String(p.year) !== year) return false;
        if (level !== 'all' && p.level !== level) return false;
        if (paperNum !== 'all' && String(p.paper) !== paperNum) return false;
        if (q && !p.title.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => b.year - a.year || b.id.localeCompare(a.id));
  }, [chip, subject, year, level, paperNum, query, bookmarks]);

  const handleOpen = (paper) => {
    navigation?.navigate('Student-Past-Papers-Detail', { paperId: paper.id });
  };

  const handleResume = (paper) => {
    navigation?.navigate('Student-Past-Papers-Detail', {
      paperId: paper.id,
      questionIndex: paper.inProgress?.current,
    });
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PAST PAPERS</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => setShowSearch((v) => !v)}
              hitSlop={8}
            >
              <Ionicons name="search" size={20} color={colors.fg} />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={8}>
              <Ionicons name="options-outline" size={20} color={colors.fg} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ===== SEARCH ===== */}
          {showSearch && (
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={14} color={colors.fgMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by title, year, or subject…"
                placeholderTextColor={colors.placeholder}
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={14} color={colors.fgMuted} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* ===== FILTER CHIPS ===== */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsScroll}
            contentContainerStyle={styles.chipsRow}
          >
            {CHIPS.map((c) => (
              <FilterChip
                key={c.key}
                item={c}
                active={chip === c.key}
                onPress={() => setChip(c.key)}
                colors={colors}
              />
            ))}
          </ScrollView>

          {/* ===== FILTER BLOCK ===== */}
          <View style={styles.filterBlock}>
            <View style={styles.filterRow}>
              <FilterDropdown
                label="SUBJECT"
                value={subject}
                options={SUBJECTS}
                onChange={setSubject}
                colors={colors}
              />
              <FilterDropdown
                label="YEAR"
                value={year}
                options={YEARS}
                onChange={setYear}
                colors={colors}
              />
            </View>
            <View style={styles.filterRow}>
              <FilterDropdown
                label="LEVEL"
                value={level}
                options={LEVELS}
                onChange={setLevel}
                colors={colors}
              />
              <FilterDropdown
                label="PAPER"
                value={paperNum}
                options={[
                  { key: 'all', label: 'All' },
                  { key: '1',   label: 'Paper 1' },
                  { key: '2',   label: 'Paper 2' },
                  { key: '3',   label: 'Paper 3' },
                ]}
                onChange={setPaperNum}
                colors={colors}
              />
            </View>
          </View>

          {/* ===== RESULT COUNT ===== */}
          <Text style={styles.countLabel}>
            {filtered.length} {filtered.length === 1 ? 'PAPER' : 'PAPERS'}
            {query && ` · filtered`}
          </Text>

          {/* ===== LIST or EMPTY ===== */}
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyEmojiWrap}>
                <Text style={styles.emptyEmoji}>📄</Text>
              </View>
              <Text style={styles.emptyTitle}>No papers match your filters</Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={clearFilters}
                activeOpacity={0.7}
              >
                <Text style={styles.emptyBtnText}>CLEAR FILTERS</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.paperList}>
              {filtered.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  bookmarked={bookmarks.has(paper.id)}
                  onToggleBookmark={toggleBookmark}
                  onOpen={handleOpen}
                  onResume={handleResume}
                  colors={colors}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}