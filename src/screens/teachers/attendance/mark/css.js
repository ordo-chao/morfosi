// src/pages/teachers/attendance/mark/css.js
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },

  /* Class banner */
  banner: {
    padding: 16, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, gap: 2,
  },
  bannerLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, fontWeight: '900',
    color: c.accent, marginBottom: 4,
  },
  bannerTitle: { fontSize: 20, fontWeight: '900', color: c.fg, letterSpacing: -0.3 },
  bannerMeta: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, marginTop: 2 },

  sectionLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 4,
  },
  input: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 12, paddingVertical: 10,
  },

  /* Summary */
  summaryRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, marginTop: 8,
  },
  summaryCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  summaryValue: { fontSize: 20, fontWeight: '900' },
  summaryLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  /* Bulk */
  bulkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bulkLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted,
  },
  bulkBtn: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  bulkBtnText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },

  /* Roster */
  listBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  studentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.fg },
  studentName: { fontSize: 13, fontWeight: '700', color: c.fg },
  studentMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },

  statusBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, minWidth: 48, justifyContent: 'center',
  },
  statusBtnText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  /* Save */
  saveBtn: {
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  saveBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});