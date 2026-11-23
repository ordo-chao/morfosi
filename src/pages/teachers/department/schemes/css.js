// src/pages/teachers/department/schemes/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 10 },

  termRow: { flexDirection: 'row', gap: 6 },
  termBtn: {
    flex: 1, paddingVertical: 8, alignItems: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  termBtnActive: { borderColor: c.accent, backgroundColor: c.accent },
  termBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  termBtnTextActive: { color: c.accentContrast },

  summaryRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  summaryCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  summaryValue: { fontSize: 18, fontWeight: '900', color: c.fg },
  summaryLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  card: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 8,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  teacherName: { fontSize: 14, fontWeight: '900', color: c.fg },
  classes: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  statusPill: { paddingVertical: 2, paddingHorizontal: 8, borderWidth: 1 },
  statusPillText: { fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900' },

  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressTrack: { flex: 1, height: 6, backgroundColor: c.border, overflow: 'hidden' },
  progressFill: { height: 6 },
  progressPct: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fg, width: 34, textAlign: 'right',
  },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  warning: {
    fontFamily: 'monospace', fontSize: 10, color: '#e25b5b',
    marginTop: 4, fontWeight: '700',
  },

  actionRow: {
    flexDirection: 'row', gap: 8,
    paddingTop: 8, marginTop: 4, borderTopWidth: 1, borderTopColor: c.border,
  },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, paddingVertical: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  actionBtnText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },

  empty: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 14, fontWeight: '700', color: c.fg },
});