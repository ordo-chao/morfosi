// src/pages/teachers/clubs/views/roster/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  tabBody: { gap: 12 },

  switcherRow: { gap: 6, paddingVertical: 4 },
  clubChip: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  clubChipActive: { borderColor: c.accent, backgroundColor: c.accent },
  clubChipText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  clubChipTextActive: { color: c.accentContrast },

  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  searchInput: { flex: 1, color: c.fg, fontSize: 13, paddingVertical: 0 },

  statRow: {
    flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  statCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  statValue: { fontSize: 18, fontWeight: '900', color: c.fg },
  statLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  rosterBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  memberRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  memberAvatar: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  memberInitial: {
    fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.fg,
  },
  memberName: { fontSize: 13, fontWeight: '700', color: c.fg },
  memberMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  riskBadge: {
    paddingVertical: 2, paddingHorizontal: 6,
    borderWidth: 1, borderColor: '#e25b5b',
  },
  riskBadgeText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 0.5,
    fontWeight: '900', color: '#e25b5b',
  },
  rosterEmpty: { paddingVertical: 24, alignItems: 'center' },
  rosterEmptyText: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted },

  empty: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyEmoji: { fontSize: 28 },
  emptyTitle: { fontSize: 15, fontWeight: '900', color: c.fg },
  emptySub: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted,
    textAlign: 'center', lineHeight: 18, paddingHorizontal: 32,
  },
});