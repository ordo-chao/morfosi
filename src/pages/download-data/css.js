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

  /* ===== REQUEST VIEW ===== */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },
  intro: {
    fontSize: 13,
    lineHeight: 19,
    color: c.fgMuted,
    marginBottom: 4,
  },

  /* Included list */
  includedBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 8,
  },
  includedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  includedText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    lineHeight: 18,
  },

  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 6,
    marginBottom: 8,
  },

  /* Format */
  formatBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  formatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  formatLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  formatSub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
  },

  /* Radio */
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

  /* Delivery */
  deliveryBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 6,
  },
  deliveryText: {
    fontSize: 12,
    color: c.fgMuted,
  },
  deliveryEmail: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  deliveryHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 4,
  },

  /* Primary button */
  primaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
    marginTop: 8,
  },
  primaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },

  /* Recent requests */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  requestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  requestBody: {
    flex: 1,
    gap: 2,
  },
  requestDate: {
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
  },
  requestMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.accent,
  },
  downloadText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },
  statusExpired: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fgMuted,
  },
  statusProcessing: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },

  /* ===== PROGRESS VIEW ===== */
  progressWrap: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  progressIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  progressBody: {
    fontSize: 13,
    lineHeight: 19,
    color: c.fgMuted,
    textAlign: 'center',
  },
  progressEmail: {
    fontFamily: 'monospace',
    fontWeight: '700',
    color: c.fg,
  },
  progressStarted: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
    marginTop: 8,
  },
  cancelBtn: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  cancelBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
});