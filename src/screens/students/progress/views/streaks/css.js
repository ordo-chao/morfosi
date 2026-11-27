// revision/progress/views/streaks/css.js
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

  /* ===== HERO ===== */
  heroBlock: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 4,
  },
  flameEmoji: {
    fontSize: 52,
    lineHeight: 60,
  },
  streakNum: {
    fontSize: 64,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -2,
    lineHeight: 68,
  },
  streakLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fgMuted,
  },

  /* ===== CALENDAR ===== */
  calendarBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  weekHeader: {
    flexDirection: 'row',
    gap: 4,
  },
  weekHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '900',
    color: c.fgMuted,
    letterSpacing: 0.5,
  },
  weekGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  dayCell: {
    width: '13.4%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  dayCellDone: {
    backgroundColor: '#4caf7d15',
    borderColor: '#4caf7d',
  },
  dayCellCurrent: {
    borderColor: c.accent,
    borderWidth: 2,
  },
  dayCellText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fgMuted,
  },
  dayCellTextDone: {
    color: '#4caf7d',
    fontWeight: '900',
  },
  dayCellTextCurrent: {
    color: c.accent,
    fontWeight: '900',
  },

  /* ===== ACHIEVEMENTS ===== */
  achievementsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  achievementEmoji: {
    fontSize: 16,
  },
  achievementLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: c.fg,
  },

  /* ===== TODAY ===== */
  todayCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 16,
    gap: 12,
  },
  todayText: {
    fontSize: 13,
    lineHeight: 19,
    color: c.fg,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  startBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
});