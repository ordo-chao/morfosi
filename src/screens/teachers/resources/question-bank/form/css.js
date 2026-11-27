// src/pages/teachers/resources/question-bank/create/css.js
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
  headerAction: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.accent,
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

  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6,
  },
  correctBtn: {
    width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  correctBtnActive: { borderColor: '#4caf7d', backgroundColor: 'rgba(76,175,125,0.1)' },
  correctBtnText: {
    fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.fgMuted,
  },
  correctBtnTextActive: { color: '#4caf7d' },
  optionInput: {
    flex: 1, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 10, paddingVertical: 10,
  },
  addOptionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderWidth: 1, borderStyle: 'dashed',
    borderColor: c.border, backgroundColor: c.surface,
  },
  addOptionText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },

  saveBtn: {
    marginTop: 20, paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  saveBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});