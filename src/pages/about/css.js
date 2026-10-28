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
    paddingTop: 24,
    paddingBottom: 40,
    gap: 12,
  },

  /* ===== HERO ===== */
  hero: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 34,
  },
  heroSchool: {
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  heroApp: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.2,
    color: c.fgMuted,
    fontWeight: '700',
  },

  /* ===== VERSION ===== */
  versionBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  versionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  versionValue: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
  },

  /* ===== SECTIONS ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 6,
    marginBottom: 8,
  },

  /* ===== BUILT BY ===== */
  textBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 6,
  },
  builtLine: {
    fontSize: 12,
    color: c.fgMuted,
  },
  builtStrong: {
    color: c.fg,
    fontWeight: '700',
  },

  /* ===== LIST (connect + legal) ===== */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: c.fg,
    minWidth: 70,
  },
  rowValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'right',
  },

  /* ===== ACKNOWLEDGEMENTS ===== */
  ackBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  ackText: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },
  ackMadeWith: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
  },

  /* ===== CHECK FOR UPDATES ===== */
  updateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
  },
  updateBtnDisabled: {
    backgroundColor: c.surface,
    borderColor: c.border,
  },
  updateBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  updateBtnTextDisabled: {
    color: c.fgMuted,
  },

  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgFaint,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginTop: 8,
  },
});