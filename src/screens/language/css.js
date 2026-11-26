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
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },

  /* ===== SECTION ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 6,
    marginBottom: 8,
  },
  hintText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
    marginBottom: 8,
  },

  /* ===== RADIO LIST ===== */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  radioBody: {
    flex: 1,
    gap: 2,
  },
  radioLabel: {
    fontSize: 13,
    color: c.fg,
    fontWeight: '500',
  },
  radioSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* Radio circle */
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

  /* ===== FORMAT BLOCK ===== */
  formatBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  formatField: {
    paddingVertical: 10,
    gap: 8,
  },
  formatLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  formatHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 4,
  },

  /* ===== DROPDOWN ===== */
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  dropdownText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: c.fg,
    fontWeight: '700',
  },
  dropdownMenu: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  dropdownItemActive: {
    backgroundColor: c.surfaceHi,
  },
  dropdownItemText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: c.fg,
  },
  dropdownItemTextActive: {
    color: c.accent,
    fontWeight: '900',
  },

  /* ===== SAVE ===== */
  saveBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
    marginTop: 16,
  },
  saveText: {
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