// src/pages/teachers/dorm/inspection/css.js
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

  tabs: {
    flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.border,
    backgroundColor: c.surface,
  },
  tab: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: c.accent },
  tabText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted,
  },
  tabTextActive: { color: c.accent },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12 },

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
  inputMultiline: { minHeight: 100, paddingTop: 12 },

  scoreBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  scoreLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted,
  },
  scoreValue: { fontSize: 24, fontWeight: '900' },

  criteriaBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  criterionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  criterionLabel: { flex: 1, fontSize: 12, fontWeight: '700', color: c.fg, lineHeight: 17 },
  scoreBtnRow: { flexDirection: 'row', gap: 6 },
  scoreBtn: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  scoreBtnText: { fontFamily: 'monospace', fontSize: 13, fontWeight: '900' },

  listBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  recentDate: { fontSize: 13, fontWeight: '700', color: c.fg },
  recentNote: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  recentScore: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900',
    width: 44, textAlign: 'right',
  },

  saveBtn: {
    paddingVertical: 14, alignItems: 'center', marginTop: 8,
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  saveBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});