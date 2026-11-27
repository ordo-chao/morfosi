// src/pages/teachers/grades/report/css.js
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

  /* Banner */
  banner: {
    padding: 16, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, gap: 2,
  },
  bannerLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, fontWeight: '900',
    color: c.accent, marginBottom: 4,
  },
  bannerTitle: { fontSize: 20, fontWeight: '900', color: c.fg, letterSpacing: -0.3 },
  bannerMeta: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, marginTop: 2 },

  /* Stat row */
  statRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, marginTop: 4,
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

  /* Sections */
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginTop: 12, marginBottom: 4,
  },

  /* Grade distribution */
  bandsBlock: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, padding: 12, gap: 8,
  },
  bandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bandLabel: {
    fontFamily: 'monospace', fontSize: 12, fontWeight: '900', width: 18,
  },
  bandRange: {
    fontFamily: 'monospace', fontSize: 9, color: c.fgMuted, width: 52,
  },
  bandTrack: {
    flex: 1, height: 6, backgroundColor: c.border, overflow: 'hidden',
  },
  bandFill: { height: 6 },
  bandCount: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fg, width: 22, textAlign: 'right',
  },

  /* Topics */
  topicsBlock: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, padding: 12, gap: 8,
  },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topicName: { flex: 1, fontSize: 12, fontWeight: '700', color: c.fg },
  topicBarTrack: {
    width: 70, height: 6, backgroundColor: c.border, overflow: 'hidden',
  },
  topicBarFill: { height: 6, backgroundColor: c.accent },
  topicAvg: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fg, width: 34, textAlign: 'right',
  },
  topicDiff: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    width: 32, textAlign: 'right',
  },

  /* Insight cards */
  insightRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  insightCard: {
    flex: 1, padding: 12, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, gap: 4,
  },
  insightLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.2,
    fontWeight: '900', color: c.accent,
  },
  insightValue: { fontSize: 13, fontWeight: '900', color: c.fg, lineHeight: 17 },
  insightMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  /* Students */
  studentsBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  studentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  rank: {
    fontFamily: 'monospace', fontSize: 10, fontWeight: '900',
    color: c.fgMuted, width: 26,
  },
  studentName: { fontSize: 13, fontWeight: '700', color: c.fg },
  studentMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  gradePill: { paddingVertical: 3, paddingHorizontal: 8, borderWidth: 1 },
  gradePillText: { fontFamily: 'monospace', fontSize: 10, fontWeight: '900' },

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