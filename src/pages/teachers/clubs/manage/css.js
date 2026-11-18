// src/pages/teachers/clubs/manage/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg,
  },
  headerAction: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.accent,
  },

  scrollContent: {
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 60, gap: 20,
  },

  /* Section */
  section: { gap: 8 },
  sectionHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent,
  },
  sectionAction: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  sectionHint: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, lineHeight: 14,
  },

  /* Fields */
  field: { gap: 6, marginTop: 4 },
  fieldLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },
  fieldHint: {
    fontFamily: 'monospace', fontSize: 9, color: c.fgMuted, letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 12, paddingVertical: 12,
  },
  inputMultiline: { minHeight: 90, paddingTop: 12 },
  inputLocked: { color: c.fgMuted, backgroundColor: c.surfaceHi },

  /* Emoji + name row */
  emojiRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  emojiInput: {
    width: 56, height: 48, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, textAlign: 'center', fontSize: 24,
  },

  /* Select chips */
  selectRow: { gap: 8, marginTop: 4 },
  selectLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },
  selectOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  selectChip: {
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  selectChipActive: { borderColor: c.accent, backgroundColor: c.accent },
  selectText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  selectTextActive: { color: c.accentContrast },

  /* Switch row */
  switchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, marginTop: 8,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.border,
  },
  switchLabel: { fontSize: 13, fontWeight: '700', color: c.fg },
  switchHint: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2, lineHeight: 14,
  },

  /* List blocks */
  listBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  emptyList: { paddingVertical: 20, alignItems: 'center' },
  emptyListText: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted },

  /* Avatar */
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.fg,
  },

  /* Request row */
  requestRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  reasonText: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted,
    marginTop: 4, lineHeight: 14, fontStyle: 'italic',
  },
  acceptBtn: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#4caf7d',
  },
  declineBtn: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#e25b5b',
  },

  /* Member row */
  memberRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  memberName: { fontSize: 13, fontWeight: '700', color: c.fg },
  memberMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  rolePillRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  rolePill: {
    paddingVertical: 2, paddingHorizontal: 6,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  rolePillText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  roleChange: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 0.5,
    fontWeight: '900', color: c.accent,
  },

  /* Quick shortcut row */
  quickRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 14, paddingHorizontal: 12,
  },
  quickRowText: { flex: 1, fontSize: 13, color: c.fg, fontWeight: '700' },

  /* Danger zone */
  dangerBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  dangerRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  dangerLabel: { fontSize: 13, fontWeight: '700', color: c.fg },
  dangerHint: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2, lineHeight: 14,
  },

  /* Save bar */
  saveBtn: {
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg, marginTop: 8,
  },
  saveBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});