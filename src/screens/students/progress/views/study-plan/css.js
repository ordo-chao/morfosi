// revision/progress/views/study-plan/css.js
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

  /* ===== COUNTDOWN ===== */
  countdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.surface,
    padding: 16,
  },
  countdownNum: {
    fontSize: 42,
    fontWeight: '900',
    color: c.accent,
    letterSpacing: -1.5,
    lineHeight: 46,
  },
  countdownLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
  },
  countdownSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  editBtnText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== PLAN BLOCK ===== */
  planBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    borderLeftWidth: 3,
  },
  planIcon: {
    fontSize: 14,
    width: 20,
    marginTop: 1,
  },
  planDuration: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    color: c.fgMuted,
    minWidth: 48,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  planText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    lineHeight: 17,
    fontWeight: '600',
  },

  /* ===== WEEK ===== */
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 14,
    paddingHorizontal: 12,
    height: 130,
  },
  weekCol: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    height: '100%',
    justifyContent: 'flex-end',
  },
  weekBarTrack: {
    flex: 1,
    width: 12,
    backgroundColor: c.surfaceHi,
    justifyContent: 'flex-end',
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekBarFill: {
    width: '100%',
    borderRadius: 2,
  },
  weekDayLabel: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '900',
    color: c.fgMuted,
    letterSpacing: 0.5,
  },
});