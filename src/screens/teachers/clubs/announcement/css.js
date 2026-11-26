// src/pages/teachers/clubs/announcements/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    gap: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 10,
  },

  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    marginBottom: 6,
  },
  searchInput: { flex: 1, color: c.fg, fontSize: 13, paddingVertical: 0 },

  card: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 6,
  },
  cardHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  pinBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi,
  },
  pinBadgeText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  cardTime: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginLeft: 'auto',
  },
  cardTitle: { fontSize: 13, fontWeight: '700', color: c.fg, lineHeight: 18 },
  cardBody: {
    fontSize: 12, color: c.fgMuted, lineHeight: 17,
  },
  cardFoot: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, marginTop: 4, borderTopWidth: 1, borderTopColor: c.border,
  },
  cardAuthor: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, letterSpacing: 0.3,
  },

  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyText: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted },
});