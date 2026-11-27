// src/pages/teachers/tasks/task-detail/overview/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },
  bodyText: { fontSize: 13, lineHeight: 20, color: c.fg },

  statGrid: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, marginBottom: 8,
  },
  statCell: {
    flex: 1, paddingVertical: 14, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  statValue: { fontSize: 18, fontWeight: '900', color: c.fg },
  statLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  progressBlock: { gap: 4, marginTop: 6 },
  progressLabelRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  progressLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  progressPct: { fontFamily: 'monospace', fontSize: 10, fontWeight: '900', color: c.fg },
  progressTrack: { height: 4, backgroundColor: c.border, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: c.accent },

  autoPill: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi, marginTop: 8,
  },
  autoPillText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 0.5,
    fontWeight: '900', color: c.accent,
  },

  metaBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  metaRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: c.border, gap: 10,
  },
  metaLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted, width: 110,
  },
  metaValue: { flex: 1, fontSize: 12, color: c.fg, fontWeight: '700', textAlign: 'right' },

  attachmentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  attachmentBody: { flex: 1, gap: 2 },
  attachmentName: { fontSize: 12, fontWeight: '700', color: c.fg },
  attachmentMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  quizMetaRow: { flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  quizMetaCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  quizMetaValue: { fontSize: 16, fontWeight: '900', color: c.fg },
  quizMetaLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted, marginTop: 2, textAlign: 'center',
  },
});