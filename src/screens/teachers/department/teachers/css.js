// src/pages/teachers/department/teachers/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 10 },

  banner: {
    padding: 16, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, gap: 2,
  },
  bannerLabel: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginBottom: 4,
  },
  bannerTitle: { fontSize: 20, fontWeight: '900', color: c.fg, letterSpacing: -0.3 },
  bannerMeta: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, marginTop: 2 },

  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  searchInput: { flex: 1, color: c.fg, fontSize: 13, fontFamily: 'monospace', padding: 0 },

  card: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 10,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: 'monospace', fontSize: 12, fontWeight: '900', color: c.fg },
  name: { fontSize: 14, fontWeight: '900', color: c.fg },
  role: { fontFamily: 'monospace', fontSize: 10, color: c.accent, marginTop: 2, fontWeight: '700' },

  classChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  classChip: {
    paddingVertical: 3, paddingHorizontal: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  classChipText: { fontFamily: 'monospace', fontSize: 9, color: c.fgMuted, fontWeight: '700' },

  statsBlock: { paddingTop: 8, borderTopWidth: 1, borderTopColor: c.border },
  statRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statLabel: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },
  statValue: { fontFamily: 'monospace', fontSize: 11, fontWeight: '900' },
  coverageTrack: { height: 5, backgroundColor: c.border, marginTop: 4, overflow: 'hidden' },
  coverageFill: { height: 5 },

  metaRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: c.border,
  },
  metaText: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  empty: { alignItems: 'center', paddingVertical: 40, gap: 8 },
  emptyText: { fontSize: 14, fontWeight: '700', color: c.fg },
});