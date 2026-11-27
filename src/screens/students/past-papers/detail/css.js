// revision/past-papers/detail/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },

  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 10,
    marginBottom: 8,
  },

  /* ===== PAPER INFO ===== */
  infoBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  infoIcon: {
    fontSize: 14,
    width: 20,
  },
  infoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 90,
  },
  infoValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'right',
  },

  /* ===== DESCRIPTION ===== */
  descriptionBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: c.fg,
  },

  /* ===== ATTEMPT MODE ===== */
  modeBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  modeRowSelected: {
    backgroundColor: c.surfaceHi,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: c.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: c.accent,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: c.accent,
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: c.fg,
  },
  modeLabelSelected: {
    fontWeight: '900',
  },
  modeSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },

  /* ===== ATTEMPTS ===== */
  attemptList: {
    gap: 8,
  },
  attemptCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  attemptHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  attemptDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  attemptTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  attemptMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  attemptProgress: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.accent,
    fontWeight: '700',
    marginTop: 2,
  },
  attemptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  attemptBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== DOWNLOADS ===== */
  downloadsBlock: {
    gap: 8,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  downloadBtnDisabled: {
    opacity: 0.6,
  },
  downloadBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  downloadBtnTextDisabled: {
    color: c.fgMuted,
  },

  /* ===== START ===== */
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
    marginTop: 16,
  },
  startBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
    marginTop: 8,
  },
});