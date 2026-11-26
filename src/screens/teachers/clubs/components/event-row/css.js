// src/pages/teachers/clubs/components/event-row/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  emojiWrap: {
    width: 36, height: 36, borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 13, fontWeight: '700', color: c.fg, flexShrink: 1 },
  ownedPill: {
    paddingVertical: 2, paddingHorizontal: 6,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi,
  },
  ownedPillText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  meta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
});