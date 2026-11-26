// src/pages/teachers/department/performance/css.js
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 10 },

  /* Term picker */
  termRow: { flexDirection: 'row', gap: 6 },
  termBtn: {
    flex: 1, paddingVertical: 8, alignItems: 'center',
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  termBtnActive: { borderColor: c.accent, backgroundColor: c.accent },
  termBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  termBtnTextActive: { color: c.accentContrast },

  /* Banner */
  banner: {
    padding: 16, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, gap: 2,
  },
  bannerLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginBottom: 4,
  },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: c.fg, letterSpacing: -0.4 },
  bannerMeta: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, marginTop: 2 },

  /* Stat row */
  statRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  statCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  statValue: { fontSize: 16, fontWeight: '900', color: c.fg },
  statLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 4,
  },

  block: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, padding: 12, gap: 8,
  },

  /* Streams */
  streamRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  streamName: { flex: 1, fontSize: 12, fontWeight: '700', color: c.fg },
  streamTrack: { width: 80, height: 6, backgroundColor: c.border, overflow: 'hidden' },
  streamFill: { height: 6 },
  streamAvg: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    width: 34, textAlign: 'right',
  },

  /* Teachers */
  teacherRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rank: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fgMuted, width: 26,
  },
  teacherName: { fontSize: 12, fontWeight: '700', color: c.fg },
  teacherMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  teacherAvg: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900',
    color: c.fg, width: 40, textAlign: 'right',
  },
  teacherTrend: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    width: 32, textAlign: 'right',
  },

  /* Distribution */
  bandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bandLabel: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900', width: 18,
  },
  bandTrack: { flex: 1, height: 6, backgroundColor: c.border, overflow: 'hidden' },
  bandFill: { height: 6 },
  bandCount: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fg, width: 30, textAlign: 'right',
  },

  /* Trend */
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trendTerm: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, width: 60,
  },
  trendTrack: { flex: 1, height: 6, backgroundColor: c.border, overflow: 'hidden' },
  trendFill: { height: 6, backgroundColor: c.accent },
  trendAvg: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fg, width: 34, textAlign: 'right',
  },

  /* Export */
  exportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, marginTop: 16,
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  exportBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});