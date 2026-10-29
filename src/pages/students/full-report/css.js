// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },

  /* ===== SUMMARY ===== */
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryTile: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 2,
  },
  summaryTileAccent: {
    borderColor: c.accent,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  summaryValueAccent: {
    color: c.accent,
  },
  summaryLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    color: c.fgMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  summarySub: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgFaint,
    letterSpacing: 0.3,
    marginTop: 2,
  },

  /* ===== SECTION TITLES ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 8,
  },
  subLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
    marginTop: 16,
    marginBottom: 8,
  },

  /* ===== CHART BLOCK ===== */
  chartBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 12,
  },
  chartWrap: {
    alignItems: 'center',
  },
  termChartWrap: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    padding: 8,
    marginVertical: 8,
  },
  barTopLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '900',
    color: c.fg,
    marginBottom: 4,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  chartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chartLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chartLegendText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  /* Sparkline fallback */
  sparkEmpty: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
    paddingVertical: 12,
  },

  /* ===== BEST TERM ===== */
  bestTermCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bestTermLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
    marginBottom: 2,
  },
  bestTermText: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },

  /* ===== YEAR BLOCK ===== */
  yearBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 8,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  yearHeaderLeft: {
    flex: 1,
    gap: 2,
  },
  yearTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.2,
  },
  yearClass: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  yearHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  yearAverage: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
  },
  currentPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.accent,
  },
  currentPillText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.accentContrast,
  },
  yearBody: {
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  /* ===== YEAR STATS ===== */
  yearStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  yearStat: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 2,
  },
  yearStatValue: {
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
  },
  yearStatLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    color: c.fgMuted,
    fontWeight: '700',
  },

  /* ===== TERM BLOCK ===== */
  termBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    padding: 12,
    marginBottom: 8,
    gap: 8,
  },
  termHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  termName: {
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
  },
  termAverage: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '900',
    color: c.accent,
  },
  termPillInProgress: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: c.fgMuted,
  },
  termPillInProgressText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.fgMuted,
  },
  termStatsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  termStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  termStatValue: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fg,
  },
  termStatLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    color: c.fgMuted,
    fontWeight: '700',
  },

  /* ===== GRADES LIST ===== */
  gradesList: {
    gap: 6,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  gradeSubject: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },
  gradeScore: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    minWidth: 42,
    textAlign: 'right',
  },
  gradeLetter: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fg,
    minWidth: 30,
    textAlign: 'right',
  },

  /* ===== NOTE ===== */
  noteBlock: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    padding: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },

  /* ===== EXPORT ===== */
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
  },
  exportBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
});