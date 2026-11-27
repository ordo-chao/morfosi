// src/pages/teachers/clubs/announcements/create/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    gap: 12, paddingHorizontal: 16, paddingVertical: 12,
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

  scrollContent: {
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60, gap: 10,
  },

  sectionLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 4,
  },

  templateRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  templateChip: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  templateChipText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },

  input: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 12, paddingVertical: 12,
  },
  inputMultiline: { minHeight: 140, paddingTop: 12 },
  helper: {
    fontFamily: 'monospace', fontSize: 9, color: c.fgMuted,
    textAlign: 'right', marginTop: 2,
  },

  optionBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  optionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  optionLabel: { fontSize: 13, fontWeight: '700', color: c.fg },
  optionHint: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2, lineHeight: 14,
  },

  draftBtn: {
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, marginTop: 8,
  },
  draftBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.fg,
  },
});