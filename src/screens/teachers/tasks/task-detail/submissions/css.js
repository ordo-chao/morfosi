// src/pages/teachers/tasks/task-detail/submissions/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  summaryRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, marginBottom: 12,
  },
  summaryCell: {
    flex: 1, paddingVertical: 14, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  summaryValue: { fontSize: 20, fontWeight: '900', color: c.fg },
  summaryLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, marginBottom: 8,
  },
  searchInput: { flex: 1, color: c.fg, fontSize: 13, paddingVertical: 0 },

  chipRow: { flexDirection: 'row', gap: 6, paddingVertical: 8 },
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

  sortRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 8, marginBottom: 4,
  },
  sortLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  sortOption: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  sortOptionActive: { color: c.accent },

  exportBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.accent,
  },
  exportBtnText: {
    fontFamily: 'monospace', fontSize: 9, fontWeight: '900', color: c.accent,
  },

  subRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, marginBottom: 6,
  },
  subAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: c.surfaceHi, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: c.border,
  },
  subAvatarText: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900', color: c.fg,
  },
  subBody: { flex: 1, gap: 2 },
  subName: { fontSize: 13, fontWeight: '700', color: c.fg },
  subMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },
  subBadge: { paddingVertical: 3, paddingHorizontal: 8, borderWidth: 1 },
  subBadgeText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900',
  },

  autoBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 2, paddingHorizontal: 6,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi,
  },
  autoBadgeText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 0.5,
    fontWeight: '900', color: c.accent,
  },
  flagDot: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },

  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyText: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted },
});