// clubs/views/activity/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  tabBody: {
    gap: 12,
  },

  /* Term meta */
  termLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 4,
  },

  /* Section title */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 4,
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
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 2,
  },
  summaryTileAccent: {
    borderColor: c.accent,
  },
  summaryValue: {
    fontSize: 18,
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

  /* ===== CLUB BLOCK ===== */
  clubBlock: {
    marginTop: 8,
  },

  /* ===== ACTIVITY CARD ===== */
  activityCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  clubName: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.2,
  },
  roleLine: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.accent,
    marginTop: 3,
    fontWeight: '700',
  },

  /* ===== STATS ===== */
  statsList: {
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 92,
  },
  statValue: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    lineHeight: 18,
  },
  statAccent: {
    color: c.accent,
    fontWeight: '900',
  },

  /* ===== CERT BUTTON ===== */
  certBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  certBtnText: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== BULK ===== */
  bulkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
    marginTop: 12,
  },
  bulkBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
    marginTop: 8,
  },
});