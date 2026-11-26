// clubs/components/join-request-sheet/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  flex: { flex: 1 },

  /* ===== BACKDROP / SHEET ===== */
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: c.bg,
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
    maxHeight: '92%',
    flexShrink: 0,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.borderStrong,
    marginBottom: 6,
    flexShrink: 0,
  },

  /* ===== HEADER ===== */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    flexShrink: 0,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },

  body: {
    gap: 12,
    paddingVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    color: c.fgMuted,
    lineHeight: 19,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginTop: 4,
  },

  /* ===== INSTANT JOIN INFO ===== */
  infoBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: c.fg,
    fontWeight: '600',
  },

  /* ===== REASON INPUT ===== */
  input: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    color: c.fg,
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 96,
  },
  counter: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'right',
    marginTop: -6,
  },

  /* ===== CHECKBOX ===== */
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: c.borderStrong,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxOn: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  checkLabel: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: c.fg,
  },

  divider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 12,
  },

  /* ===== PATRON ===== */
  patronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 12,
  },
  patronIcon: {
    fontSize: 20,
  },
  patronName: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  patronRole: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },

  /* ===== ACTIONS ===== */
  actions: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
    flexShrink: 0,
  },
  dualRow: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
    minHeight: 48,
  },
  primaryBtnDisabled: {
    backgroundColor: c.surface,
    borderColor: c.border,
  },
  primaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  primaryBtnTextDisabled: {
    color: c.fgMuted,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    minHeight: 48,
  },
  secondaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.fg,
  },
});