// revision/progress/views/progress/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
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
    marginTop: 8,
    marginBottom: 8,
  },

  /* ===== OVERALL ===== */
  overallCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 20,
    gap: 8,
  },
  overallTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  gradeLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  overallGrade: {
    fontSize: 36,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -1.2,
    lineHeight: 40,
  },
  overallDot: {
    fontSize: 20,
    color: c.fgMuted,
    fontWeight: '900',
  },
  overallPct: {
    fontSize: 20,
    fontWeight: '700',
    color: c.fgMuted,
  },
  rankLine: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    letterSpacing: 0.3,
    marginTop: 4,
  },
  deltaPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#4caf7d',
  },
  deltaPillText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: '#4caf7d',
  },

  /* ===== BY SUBJECT ===== */
  subjectBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  subjectName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: c.fg,
  },
  subjectGrade: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fg,
    width: 28,
    textAlign: 'center',
  },
  subjectPct: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fgMuted,
    width: 34,
    textAlign: 'right',
  },
  subjectBarWrap: {
    width: 70,
  },
  subjectBarTrack: {
    height: 5,
    backgroundColor: c.surfaceHi,
    borderRadius: 3,
    overflow: 'hidden',
  },
  subjectBarFill: {
    height: 5,
    borderRadius: 3,
  },
  subjectTrend: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    width: 42,
    textAlign: 'right',
    letterSpacing: 0.2,
  },

  /* ===== STRENGTHS / WEAK ===== */
  chipBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chipGood: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#4caf7d',
    backgroundColor: c.surface,
  },
  chipGoodText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#4caf7d',
    fontWeight: '700',
  },
  chipBad: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#e25b5b',
    backgroundColor: c.surface,
  },
  chipBadText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#e25b5b',
    fontWeight: '700',
  },
  chipWarn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#e0a93a',
    backgroundColor: c.surface,
  },
  chipWarnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#e0a93a',
    fontWeight: '700',
  },

  /* ===== SUGGESTIONS ===== */
  suggestionsBlock: {
    gap: 8,
  },
  suggestionCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
    lineHeight: 18,
  },
  suggestionSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
  suggestionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignSelf: 'flex-start',
  },
  suggestionBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== FULL REPORT ===== */
  fullReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  fullReportBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
});