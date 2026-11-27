// revision/past-papers/attempt/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.bg,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },

  /* Timer */
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  timerBadgeUrgent: {
    borderColor: '#e0a93a',
  },
  timerBadgeCritical: {
    borderColor: '#e25b5b',
  },
  timerText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: 0.5,
  },
  timerTextUrgent: {
    color: '#e0a93a',
  },
  timerTextCritical: {
    color: '#e25b5b',
  },

  /* Progress */
  progressBlock: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 6,
  },
  progressTrack: {
    height: 4,
    backgroundColor: c.surfaceHi,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: c.accent,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.5,
  },

  /* Scroll content */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 14,
  },

  /* Question header */
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.accent,
  },
  marksLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  /* Question text */
  questionText: {
    fontSize: 15,
    lineHeight: 22,
    color: c.fg,
    fontWeight: '500',
    marginBottom: 6,
  },

  /* Answer */
  answerLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    color: c.fg,
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 100,
  },

  /* Options row */
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  optionBtnText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fg,
  },

  /* Flag */
  flagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  flagBtnActive: {
    borderColor: '#e0a93a',
    backgroundColor: c.surface,
  },
  flagBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  flagBtnTextActive: {
    color: '#e0a93a',
  },

  /* Nav buttons */
  navButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  navBtnDisabled: {
    opacity: 0.5,
  },
  navBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  navBtnTextDisabled: {
    color: c.fgMuted,
  },

  /* Save & exit */
  saveExitBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  saveExitBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* Submit */
  submitBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  submitBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },

  /* Question navigator */
  navBlock: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 12,
    gap: 10,
  },
  navLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  navCell: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    position: 'relative',
  },
  navCellCurrent: {
    borderColor: c.accent,
    borderWidth: 2,
  },
  navCellAnswered: {
    backgroundColor: '#4caf7d15',
    borderColor: '#4caf7d',
  },
  navCellFlagged: {
    borderColor: '#e0a93a',
  },
  navCellText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
  },
  navCellTextCurrent: {
    color: c.accent,
    fontWeight: '900',
  },
  navCellTextAnswered: {
    color: '#4caf7d',
  },
  flagDot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0a93a',
  },
  legendRow: {
    flexDirection: 'row',
    gap: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },

  /* Time's up modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalSheet: {
    backgroundColor: c.bg,
    borderWidth: 1,
    borderColor: c.border,
    padding: 24,
    gap: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  modalBody: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: c.fgMuted,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    marginTop: 8,
  },
  modalSecondary: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  modalSecondaryText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  modalPrimary: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
  },
  modalPrimaryText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
});