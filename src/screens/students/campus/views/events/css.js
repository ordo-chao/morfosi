// campus/views/events/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
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

  /* Chips */
  chipsRow: {
    gap: 6,
    paddingVertical: 2,
  },
  chip: {
    borderWidth: 1,
    borderColor: c.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: c.surface,
  },
  chipActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  chipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
  },
  chipTextActive: {
    color: c.accentContrast,
    fontWeight: '900',
  },

  /* Event card */
  eventCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
    marginBottom: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  eventDay: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  categoryPillText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.fgMuted,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
    lineHeight: 19,
  },
  eventMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  eventHost: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  mandatoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#e25b5b',
    marginTop: 4,
  },
  mandatoryText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: '#e25b5b',
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  eventActionBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  eventActionText: {
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
    textAlign: 'center',
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
  },
});