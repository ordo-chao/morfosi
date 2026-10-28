// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 24,
  },

  /* ===== NEXT CLASS CARD ===== */
  nextCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 20,
    gap: 6,
  },
  nextLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    marginBottom: 4,
  },
  nextTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  nextMeta: {
    fontSize: 13,
    color: c.fgMuted,
  },
  nextButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  nextButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.fg,
  },

  /* ===== STATS ===== */
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  statCardAccent: {
    borderColor: c.accent,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: c.fg,
    marginBottom: 4,
  },
  statValueAccent: {
    color: c.accent,
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    color: c.fgMuted,
    textTransform: 'uppercase',
  },

  /* ===== SECTION HEADERS ===== */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    color: c.fgMuted,
    fontWeight: '700',
  },
  sectionAction: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    color: c.accent,
    fontWeight: '900',
  },

  /* ===== TOGGLE ===== */
  toggleRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    gap: 6,
    marginTop: -4,
    marginBottom: 4,
  },
  toggleBtn: {
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  toggleBtnActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  toggleText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    color: c.fgMuted,
  },
  toggleTextActive: {
    color: c.accentContrast,
    fontWeight: 'bold',
  },

  /* ===== SCHEDULE ===== */
  scheduleList: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 10,
  },
  scheduleRowCurrent: {
    backgroundColor: c.surfaceHi,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPast: {
    backgroundColor: c.fgFaint,
  },
  dotUpcoming: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: c.fgMuted,
  },
  dotCurrent: {
    backgroundColor: c.accent,
  },
  scheduleTime: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    width: 90,
  },
  scheduleSubject: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  scheduleRoom: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgFaint,
  },

  /* ===== LIST BLOCKS (assignments + announcements) ===== */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 10,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.accent,
  },
  listText: {
    flex: 1,
    fontSize: 13,
    color: c.fg,
  },
  listMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  urgencyHigh: {
    backgroundColor: c.accent,
  },
  urgencyNormal: {
    backgroundColor: c.fgFaint,
  },
});