// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== TERM SELECTOR ===== */
  termRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  termBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: c.surface,
  },
  termBtnActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  termText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    color: c.fgMuted,
    fontWeight: '700',
  },
  termTextActive: {
    color: c.accentContrast,
    fontWeight: '900',
  },

  /* ===== SUMMARY ===== */
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    color: c.fgMuted,
    fontWeight: '700',
  },

  /* ===== LIST ===== */
  countLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    marginBottom: 8,
  },
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 12,
  },
  rowGradePill: {
    minWidth: 42,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
  },
  rowGradeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  rowMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rowScore: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
  },

  /* ===== EMPTY ===== */
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
  },
  emptySub: {
    fontSize: 12,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  /* ===== MODAL ===== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: c.bg,
    borderTopWidth: 1,
    borderTopColor: c.border,
    padding: 24,
    gap: 6,
  },
  modalLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.5,
  },
  modalMeta: {
    fontSize: 12,
    color: c.fgMuted,
  },
  modalSectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalDivider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 14,
  },

  /* Assessments */
  assessmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  assessmentName: {
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
    marginBottom: 4,
  },
  barTrack: {
    height: 4,
    backgroundColor: c.surfaceHi,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: 4,
    backgroundColor: c.accent,
    borderRadius: 2,
  },
  assessmentScore: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
    fontWeight: '700',
    minWidth: 48,
    textAlign: 'right',
  },
  assessmentWeight: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    minWidth: 36,
    textAlign: 'right',
  },
  modalEmpty: {
    fontSize: 12,
    color: c.fgMuted,
    fontStyle: 'italic',
    paddingVertical: 12,
  },

  /* Modal stats */
  modalStatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalStat: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  modalStatValue: {
    fontSize: 16,
    fontWeight: '900',
    color: c.fg,
  },
  modalStatLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    color: c.fgMuted,
    fontWeight: '700',
  },

  modalClose: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: c.buttonBg,
  },
  modalCloseText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
    /* Highlighted row (came in from a subject) */
  rowHighlighted: {
    borderLeftWidth: 3,
    borderLeftColor: c.accent,
    backgroundColor: c.surfaceHi,
  },

  /* Focus banner above the list */
  focusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.surface,
  },
  focusBannerText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    color: c.accent,
    fontWeight: '900',
  },
  
});