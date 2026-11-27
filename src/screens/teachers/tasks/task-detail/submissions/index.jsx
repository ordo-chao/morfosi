// src/pages/teachers/tasks/task-detail/submissions/index.jsx
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const FILTERS = [
  { key: 'all',       label: 'ALL' },
  { key: 'submitted', label: 'TO GRADE' },
  { key: 'graded',    label: 'GRADED' },
  { key: 'missing',   label: 'MISSING' },
  { key: 'flagged',   label: 'FLAGGED' },
];
const SORTS = [
  { key: 'name',   label: 'NAME' },
  { key: 'recent', label: 'RECENT' },
  { key: 'grade',  label: 'GRADE' },
];

function matchesFilter(s, filter) {
  if (filter === 'all') return true;
  if (filter === 'flagged') return !!s.flagged;
  if (filter === 'graded') return s.status === 'graded' || s.status === 'released';
  return s.status === filter;
}

function sortList(list, sort) {
  const copy = [...list];
  if (sort === 'name')   return copy.sort((a, b) => a.student.localeCompare(b.student));
  if (sort === 'recent') return copy.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
  if (sort === 'grade')  return copy.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  return copy;
}

function statusTint(s, colors) {
  if (s.status === 'graded' || s.status === 'released') return '#4caf7d';
  if (s.status === 'missing')  return '#e25b5b';
  if (s.status === 'returned') return '#e0a93a';
  if (s.status === 'submitted') return colors.accent;
  return colors.fgMuted;
}

function SubmissionRow({ sub, colors, onPress }) {
  const styles = makeStyles(colors);
  const tint = statusTint(sub, colors);
  return (
    <TouchableOpacity style={styles.subRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.subAvatar}>
        <Text style={styles.subAvatarText}>{sub.student.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.subBody}>
        <Text style={styles.subName} numberOfLines={1}>{sub.student}</Text>
        <Text style={styles.subMeta} numberOfLines={1}>
          {sub.status === 'missing' ? 'Not submitted' : `${sub.submittedAt}${sub.onTime === false ? ' · late' : ''}`}
        </Text>
      </View>
      {sub.autoGrade != null && (
        <View style={styles.autoBadge}>
          <Ionicons name="sparkles" size={9} color={colors.accent} />
          <Text style={styles.autoBadgeText}>AUTO {sub.autoGrade}%</Text>
        </View>
      )}
      {sub.flagged && (
        <View style={styles.flagDot}>
          <Ionicons name="flag" size={11} color="#e25b5b" />
        </View>
      )}
      <View style={[styles.subBadge, { borderColor: tint }]}>
        <Text style={[styles.subBadgeText, { color: tint }]}>
          {sub.status === 'graded' || sub.status === 'released'
            ? `${sub.grade ?? '—'} · ${sub.score ?? 0}%`
            : sub.status === 'missing'
            ? 'MISSING'
            : sub.status === 'returned'
            ? 'RETURNED'
            : sub.status === 'draft'
            ? 'DRAFT'
            : 'GRADE'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

export default function SubmissionsTab({ task, submissions, onOpenSubmission, onExport }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('name');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = submissions.filter((s) => matchesFilter(s, filter));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => s.student.toLowerCase().includes(q));
    }
    return sortList(list, sort);
  }, [submissions, filter, sort, query]);

  const counts = {
    submitted: submissions.filter((s) => s.status === 'submitted').length,
    graded:    submissions.filter((s) => s.status === 'graded' || s.status === 'released').length,
    missing:   submissions.filter((s) => s.status === 'missing').length,
    flagged:   submissions.filter((s) => s.flagged).length,
    autoGraded: submissions.filter((s) => s.autoGrade != null).length,
  };

  return (
    <View>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCell}>
          <Text style={styles.summaryValue}>{counts.submitted}</Text>
          <Text style={styles.summaryLabel}>TO GRADE</Text>
        </View>
        <View style={styles.summaryCell}>
          <Text style={styles.summaryValue}>{counts.graded}</Text>
          <Text style={styles.summaryLabel}>GRADED</Text>
        </View>
        <View style={styles.summaryCell}>
          <Text style={[styles.summaryValue, counts.flagged > 0 && { color: '#e25b5b' }]}>{counts.flagged}</Text>
          <Text style={styles.summaryLabel}>FLAGGED</Text>
        </View>
        <View style={styles.summaryCell}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>{counts.autoGraded}</Text>
          <Text style={styles.summaryLabel}>AUTO</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={14} color={colors.fgMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search students…"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={6}>
            <Ionicons name="close-circle" size={14} color={colors.fgMuted} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
        <View style={styles.chipRow}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFilter(f.key)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>SORT</Text>
        {SORTS.map((s) => {
          const active = sort === s.key;
          return (
            <TouchableOpacity key={s.key} onPress={() => setSort(s.key)} hitSlop={6}>
              <Text style={[styles.sortOption, active && styles.sortOptionActive]}>{s.label}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.exportBtn} onPress={onExport} hitSlop={6}>
          <Feather name="download" size={12} color={colors.accent} />
          <Text style={styles.exportBtnText}>EXPORT</Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No submissions match</Text>
        </View>
      ) : (
        filtered.map((s) => (
          <SubmissionRow key={s.id} sub={s} colors={colors} onPress={() => onOpenSubmission?.(s)} />
        ))
      )}
    </View>
  );
}