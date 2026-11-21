// src/pages/teachers/resources/question-bank/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  toolbar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  searchWrap: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  searchInput: { flex: 1, color: c.fg, fontSize: 13, fontFamily: 'monospace', padding: 0 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 10, paddingHorizontal: 12,
    backgroundColor: c.accent, borderWidth: 1, borderColor: c.accent,
  },
  addBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accentContrast,
  },

  chipRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 6 },
  chip: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  chipActive: { borderColor: c.accent, backgroundColor: c.accent },
  chipText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  chipTextActive: { color: c.accentContrast },

  filterRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingBottom: 8,
  },
  filterLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted, width: 46,
  },
  filterOption: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  filterOptionActive: { color: c.accent },

  listContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 },
  countLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    color: c.fgMuted, marginBottom: 8,
  },
  listBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  row: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  typeBadge: {
    paddingVertical: 3, paddingHorizontal: 6,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    minWidth: 40, alignItems: 'center',
  },
  typeBadgeText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  rowPrompt: { fontSize: 13, fontWeight: '700', color: c.fg, lineHeight: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  diffPill: { paddingVertical: 2, paddingHorizontal: 6, borderWidth: 1 },
  diffPillText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1, fontWeight: '900',
  },
  metaText: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },
  tagText: { fontFamily: 'monospace', fontSize: 10, color: c.accent, marginTop: 2 },

  empty: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyText: { fontSize: 14, fontWeight: '700', color: c.fg },
});