// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
  },

  termLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 2,
    color: c.accent,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },

  /* ===== SUMMARY ===== */
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryTile: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 2,
  },
  summaryTileAccent: {
    borderColor: c.accent,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  summaryValueAccent: {
    color: c.accent,
  },
  summaryLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    color: c.fgMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  summarySub: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgFaint,
    letterSpacing: 0.3,
    marginTop: 2,
  },

  /* ===== SECTION TITLE ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 8,
  },

  /* ===== CALENDAR ===== */
  calendarBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 12,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.5,
    color: c.fgMuted,
    fontWeight: '700',
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calCell: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  calCellToday: {
    borderWidth: 1,
    borderColor: c.accent,
  },
  calDay: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
  },
  calDayEmpty: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgFaint,
  },
  calDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },

  /* Legend */
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.3,
    color: c.fgMuted,
  },

  /* ===== ABSENCE LIST ===== */
  absenceList: {
    gap: 8,
  },
  absenceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  absenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  absenceBody: {
    flex: 1,
    gap: 4,
  },
  absenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  absenceDate: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  reasonTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
  },
  reasonTagText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
  },
  absenceStatus: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.8,
    color: c.fgMuted,
  },
  absenceReason: {
    fontSize: 12,
    lineHeight: 17,
    color: c.fg,
    marginTop: 2,
  },
  absenceReasonMissing: {
    color: c.fgMuted,
    fontStyle: 'italic',
  },

  /* ===== EMPTY ===== */
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 4,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  /* ===== POLICY ===== */
  policyBlock: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    padding: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginTop: 8,
  },
  policyText: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    color: c.fgMuted,
    letterSpacing: 0.2,
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
    gap: 12,
  },
  modalLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.4,
  },
  modalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 10,
    borderLeftWidth: 3,
    paddingVertical: 6,
  },
  modalStatus: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  modalSectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginTop: 4,
  },
  modalReasonBlock: {
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#888888',
    gap: 8,
  },
  modalReasonText: {
    fontSize: 13,
    lineHeight: 19,
    color: c.fg,
  },
  modalReasonMissing: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
    fontStyle: 'italic',
  },
  modalBody: {
    fontSize: 13,
    lineHeight: 19,
    color: c.fgMuted,
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
});