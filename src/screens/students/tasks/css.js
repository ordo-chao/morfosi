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
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },

  /* Filter chips */
  chipsScroll: {
    flexGrow: 0,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
    alignItems: 'center',
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

  /* Content */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Group */
  groupBlock: {
    marginBottom: 20,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  groupEmoji: {
    fontSize: 10,
  },
  groupLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  groupCount: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* Task card */
  taskCard: {
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 4,
    backgroundColor: c.surface,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    gap: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
  },
  taskBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  taskBadgeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
  },
  taskMeta: {
    fontSize: 11,
    color: c.fgMuted,
    fontFamily: 'monospace',
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  taskAction: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  /* Empty */
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
  },
  emptySub: {
    fontSize: 12,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});