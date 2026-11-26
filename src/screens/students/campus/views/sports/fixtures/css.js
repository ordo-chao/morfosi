// campus/views/sports/fixtures/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 10,
  },

  teamLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginBottom: 4,
  },

  /* Filters */
  filtersRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: c.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: c.surface,
  },
  filterChipActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  filterChipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
  },
  filterChipTextActive: {
    color: c.accentContrast,
    fontWeight: '900',
  },

  /* Fixture card */
  fixtureCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  fixtureCardPast: {
    opacity: 0.75,
  },
  fixtureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fixtureDay: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
  resultPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  resultPillText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.fgMuted,
  },
  fixtureDivider: {
    height: 1,
    backgroundColor: c.border,
  },
  fixtureBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  fixtureEmoji: {
    fontSize: 20,
  },
  fixtureTeam: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
  fixtureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
    marginTop: 2,
  },
  fixtureMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  fixtureBus: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.accent,
    fontWeight: '700',
    marginTop: 4,
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  calendarBtnText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fg,
  },

  /* Empty */
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 6,
  },
  emptyEmoji: { fontSize: 32 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
  },
});