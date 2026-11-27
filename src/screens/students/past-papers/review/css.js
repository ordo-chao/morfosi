// revision/past-papers/results/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },

  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 10,
    marginBottom: 8,
  },

  /* ===== HERO ===== */
  heroCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },
  heroScore: {
    fontSize: 56,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -2,
    lineHeight: 60,
  },
  heroMarks: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  gradePill: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
  },
  gradeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  heroStatsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: c.border,
    gap: 8,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  heroStatValue: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroStatLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '700',
    color: c.fgMuted,
  },
  heroTime: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
    marginTop: 8,
  },

  /* ===== BREAKDOWN ===== */
  breakdownBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  breakdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: c.fg,
    minWidth: 110,
    flexShrink: 1,
  },
  breakdownTrack: {
    flex: 1,
    height: 6,
    backgroundColor: c.surfaceHi,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: 6,
    borderRadius: 3,
  },
  breakdownPct: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fg,
    minWidth: 38,
    textAlign: 'right',
  },
  topicRow: {
    marginBottom: 4,
  },

  /* ===== PRACTICE WEAK ===== */
  practiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
    marginVertical: 8,
  },
  practiceBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: 'bold',
    color: c.buttonFg,
  },

  /* ===== QUESTION REVIEW ===== */
  reviewList: {
    gap: 10,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 4,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewQ: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.accent,
    letterSpacing: 0.5,
  },
  reviewTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  reviewStatus: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
  },
  answerRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  answerLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 90,
  },
  answerText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    lineHeight: 17,
  },
  answerCorrect: {
    color: '#4caf7d',
    fontWeight: '700',
  },

  explainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    marginTop: 4,
  },
  explainText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  askAiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.bg,
    marginTop: 4,
  },
  askAiText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },

  /* ===== FOOTNOTE ===== */
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
    marginTop: 12,
  },
});