// src/pages/teachers/tasks/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* =========================================================
   * PAGE
   * ======================================================= */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 10,
  },

  /* =========================================================
   * HEADER
   * ======================================================= */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.bg,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  /* =========================================================
   * FILTER CHIPS
   * ======================================================= */
  chipsScroll: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  chipActive: {
    borderColor: c.accent,
    backgroundColor: c.accent,
  },
  chipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fgMuted,
  },
  chipTextActive: {
    color: c.accentContrast,
  },

  /* =========================================================
   * TASK CARD
   * ======================================================= */
  taskCard: {
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 3,
    backgroundColor: c.surface,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 6,
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
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  taskBadgeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
  },
  taskMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  taskAction: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
  },

  /* =========================================================
   * PROGRESS (submission ratio in list card)
   * ======================================================= */
  progressRow: {
    marginTop: 8,
    gap: 4,
  },
  progressTrack: {
    height: 4,
    backgroundColor: c.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: c.accent,
  },
  progressText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.5,
    color: c.fgMuted,
  },

  /* =========================================================
   * EMPTY STATE
   * ======================================================= */
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
    marginTop: 6,
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
    maxWidth: 240,
  },
});