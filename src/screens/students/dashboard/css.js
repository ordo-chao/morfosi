// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* =========================================================
   * PAGE
   * ======================================================= */
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

  /* =========================================================
   * SECTION HEADERS
   * ======================================================= */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  sectionBadge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBadgeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    fontWeight: '900',
    color: c.accentContrast,
    lineHeight: 12,
  },

  /* =========================================================
   * NEXT CLASS CARD
   * ======================================================= */
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

  /* =========================================================
   * STATS
   * ======================================================= */
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

  /* =========================================================
   * TOGGLE (Day / Week)
   * ======================================================= */
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

  /* =========================================================
   * SCHEDULE LIST
   * ======================================================= */
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

  /* Status dots (schedule) */
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

  /* =========================================================
   * SIMPLE LIST BLOCK (Announcements)
   * ======================================================= */
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

  /* =========================================================
   * TASKS DUE TODAY WIDGET
   * ======================================================= */
  dueWidget: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  dueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.surfaceHi,
  },
  dueHeaderTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  dueCountPill: {
    minWidth: 22,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueCountText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    color: c.accentContrast,
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  dueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dueTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  dueMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  dueSeeAll: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  dueSeeAllText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },

  /* Empty state */
  dueEmpty: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 4,
  },
  dueEmptyEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  dueEmptyTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: c.fg,
  },
  dueEmptySub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.5,
  },
});