// src/pages/teachers/resources/materials/create/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60, gap: 8 },

  sectionLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 6,
  },
  input: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 12, paddingVertical: 12,
  },
  inputMultiline: { minHeight: 100, paddingTop: 12 },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  chipActive: { borderColor: c.accent, backgroundColor: c.accent },
  chipText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  chipTextActive: { color: c.accentContrast },

  attachBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 14, borderWidth: 1, borderStyle: 'dashed',
    borderColor: c.border, backgroundColor: c.surface,
  },
  attachBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.accent,
  },
  attachmentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  attachmentName: { flex: 1, fontSize: 12, color: c.fg, fontWeight: '700' },
  attachmentSize: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  switchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, marginTop: 8,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.border,
  },
  switchLabel: { fontSize: 13, fontWeight: '700', color: c.fg },
  switchHint: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },

  footerRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  draftBtn: {
    flex: 1, paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  draftBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.2,
    fontWeight: '900', color: c.fg,
  },
  primaryBtn: {
    flex: 2, paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  primaryBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.2,
    fontWeight: 'bold', color: c.buttonFg,
  },
});