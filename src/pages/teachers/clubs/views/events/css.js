// src/pages/teachers/clubs/views/events/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  tabBody: { gap: 12 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 4,
  },
  createBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi,
  },
  createBtnText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  eventsBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  empty: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyEmoji: { fontSize: 28 },
  emptyTitle: { fontSize: 15, fontWeight: '900', color: c.fg },
  emptySub: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted,
    textAlign: 'center', lineHeight: 18, paddingHorizontal: 32,
  },
});