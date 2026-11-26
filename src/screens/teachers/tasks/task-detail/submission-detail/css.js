// src/pages/teachers/tasks/task-detail/submission-detail/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* Pager */
  pagerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.surface,
  },
  pagerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4, maxWidth: '40%',
    paddingVertical: 8, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  pagerBtnDisabled: { opacity: 0.35 },
  pagerBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },
  pagerMeta: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900', color: c.fgMuted,
  },

  /* Scroll */
  detailScroll: {
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120, gap: 18,
  },

  /* Status */
  statusStrip: {
    borderLeftWidth: 3, backgroundColor: c.surfaceHi,
    paddingVertical: 12, paddingHorizontal: 14, gap: 8,
  },
  statusRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', gap: 8,
  },
  statusMeta: { fontFamily: 'monospace', fontSize: 11, color: c.fg, flex: 1 },
  statusBadge: { paddingVertical: 3, paddingHorizontal: 8, borderWidth: 1 },
  statusBadgeText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900',
  },

  autoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    padding: 8, borderWidth: 1, borderColor: c.accent, backgroundColor: c.bg,
  },
  autoBannerText: { fontFamily: 'monospace', fontSize: 11, color: c.accent, flex: 1 },
  flagBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    padding: 8, borderWidth: 1, borderColor: '#e25b5b',
    backgroundColor: 'rgba(226,91,91,0.08)',
  },
  flagBannerText: { fontFamily: 'monospace', fontSize: 11, color: '#e25b5b', flex: 1 },

  /* Section */
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },
  emptyText: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, textAlign: 'center', paddingVertical: 20 },

  /* File preview */
  previewCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 12, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  previewName: { fontSize: 13, fontWeight: '700', color: c.fg },
  previewMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  previewBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.bg,
  },
  previewBtnText: {
    fontFamily: 'monospace', fontSize: 9, fontWeight: '900', color: c.accent,
  },

  /* Quiz answers */
  quizHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4,
  },
  quizHeaderText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '900', color: c.fgMuted },
  quizToggle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  answerCard: {
    borderWidth: 1, borderColor: c.border, borderLeftWidth: 3,
    backgroundColor: c.surface, padding: 12, gap: 6,
  },
  answerPrompt: { fontSize: 13, fontWeight: '700', color: c.fg, lineHeight: 18 },
  answerLine: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  answerLabel: {
    fontFamily: 'monospace', fontSize: 9, fontWeight: '900', width: 70, letterSpacing: 1,
  },
  answerText: { flex: 1, fontSize: 12, color: c.fg },
  answerPoints: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fgMuted, textAlign: 'right',
  },
  shortGradeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderTopColor: c.border,
  },
  shortGradeLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  shortGradeInput: {
    width: 56, paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontFamily: 'monospace', fontSize: 12, textAlign: 'center',
  },
  shortGradeMax: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  /* Rubric */
  rubricBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  rubricRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  rubricName: { flex: 1, fontSize: 13, color: c.fg },
  rubricWeight: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, width: 36 },
  rubricInput: {
    width: 56, paddingVertical: 6, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    color: c.fg, fontFamily: 'monospace', fontSize: 12, textAlign: 'center',
  },
  rubricMax: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, width: 32 },
  totalRow: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900',
    color: c.fg, textAlign: 'right', paddingTop: 8,
  },

  /* Feedback */
  feedbackInput: {
    minHeight: 100, padding: 12, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, color: c.fg, fontSize: 13,
  },

  /* Missing student */
  missingBlock: {
    padding: 16, gap: 8, borderWidth: 1, borderColor: '#e25b5b',
    backgroundColor: 'rgba(226,91,91,0.05)', alignItems: 'flex-start',
  },
  missingTitle: { fontSize: 13, fontWeight: '900', color: c.fg },
  missingSub: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted },
  missingActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  missingBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  missingBtnText: {
    fontFamily: 'monospace', fontSize: 9, fontWeight: '900',
    color: c.fg, letterSpacing: 0.5,
  },

  /* Footer */
  footer: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16,
    borderTopWidth: 1, borderTopColor: c.border, backgroundColor: c.bg,
  },
  footerBtnGhost: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderWidth: 1, borderColor: c.border,
  },
  footerBtnGhostText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },
  footerBtn: { flex: 2, paddingVertical: 12, alignItems: 'center', backgroundColor: c.accent },
  footerBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accentContrast,
  },
});