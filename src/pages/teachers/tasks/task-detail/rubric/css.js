// src/pages/teachers/tasks/task-detail/rubric/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },

  rubricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rubricEditToggle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  rubricCard: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 8,
  },
  rubricTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rubricName: { flex: 1, fontSize: 13, fontWeight: '700', color: c.fg },
  rubricNameInput: {
    flex: 1, paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontSize: 13,
  },
  rubricWeightInput: {
    width: 56, paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontSize: 11, textAlign: 'center',
  },
  rubricMaxInput: {
    width: 48, paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontSize: 11, textAlign: 'center',
  },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  levelLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted, width: 120,
  },
  levelText: { flex: 1, fontSize: 12, color: c.fg },
  levelInput: {
    flex: 1, paddingVertical: 4, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontSize: 12,
  },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: c.border,
  },
  addBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },

  keyCard: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 8,
  },
  keyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  keyNumber: { fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.accent },
  keyType: {
    flex: 1, fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  keyPoints: { fontFamily: 'monospace', fontSize: 9, fontWeight: '900', color: c.fgMuted },
  keyPrompt: { fontSize: 13, fontWeight: '700', color: c.fg, lineHeight: 18 },
  keyShortAnswer: {
    gap: 4, padding: 10, borderWidth: 1, borderColor: '#4caf7d',
    backgroundColor: 'rgba(76,175,125,0.08)',
  },
  keyShortLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: '#4caf7d',
  },
  keyShortText: { fontSize: 12, color: c.fg, lineHeight: 17 },

  analyticsRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border,
    backgroundColor: c.bg, marginVertical: 6,
  },
  analyticsCell: {
    flex: 1, paddingVertical: 8, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  analyticsValue: { fontSize: 16, fontWeight: '900', color: c.fg },
  analyticsLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  pagerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 12, borderTopWidth: 1, borderTopColor: c.border,
  },
  pagerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  pagerBtnDisabled: { opacity: 0.35 },
  pagerBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },
  pagerMeta: { fontFamily: 'monospace', fontSize: 10, fontWeight: '900', color: c.fgMuted },
  /* =========================================================
 * SEGMENTED CONTROL
 * ======================================================= */
segmentWrap: {
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: c.border,
  backgroundColor: c.surface,
},
segment: {
  flex: 1,
  paddingVertical: 10,
  alignItems: 'center',
  borderRightWidth: 1,
  borderRightColor: c.border,
},
segmentActive: {
  backgroundColor: c.accent,
},
segmentText: {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: 1.2,
  fontWeight: '900',
  color: c.fgMuted,
},
segmentTextActive: {
  color: c.accentContrast,
},

/* =========================================================
 * EDIT BAR
 * ======================================================= */
editBar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
},

/* =========================================================
 * WEIGHTS VIEW
 * ======================================================= */
weightBlock: {
  borderWidth: 1,
  borderColor: c.border,
  backgroundColor: c.surface,
  padding: 12,
  gap: 10,
},
weightRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},
weightName: {
  width: 100,
  fontSize: 12,
  fontWeight: '700',
  color: c.fg,
},
weightTrack: {
  flex: 1,
  height: 6,
  backgroundColor: c.border,
  overflow: 'hidden',
},
weightFill: {
  height: 6,
  backgroundColor: c.accent,
},
weightPct: {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: '900',
  color: c.fgMuted,
  width: 36,
  textAlign: 'right',
},

/* =========================================================
 * LEVELS VIEW — extra bits
 * ======================================================= */
levelMax: {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: '900',
  color: c.fgMuted,
},

/* =========================================================
 * NOTICE BLOCK
 * ======================================================= */
noticeBlock: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: 10,
  borderWidth: 1,
  borderColor: c.accent,
  backgroundColor: c.surfaceHi,
},
noticeText: {
  flex: 1,
  fontFamily: 'monospace',
  fontSize: 11,
  color: c.accent,
  lineHeight: 16,
},
});