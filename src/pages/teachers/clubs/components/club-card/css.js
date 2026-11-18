// src/pages/teachers/clubs/components/club-card/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  card: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 10,
  },
  header: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  emojiWrap: {
    width: 44, height: 44, borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 14, fontWeight: '900', color: c.fg, flexShrink: 1 },
  patronPill: {
    paddingVertical: 2, paddingHorizontal: 6,
    borderWidth: 1, borderColor: c.accent, backgroundColor: c.surfaceHi,
  },
  patronPillText: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1,
    fontWeight: '900', color: c.accent,
  },
  meta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  stats: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },

  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, borderTopWidth: 1, borderTopColor: c.border,
  },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
  },
  btnText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900', color: c.fg,
  },
  btnDisabled: {
    paddingVertical: 6, paddingHorizontal: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surfaceHi,
  },
  btnDisabledText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
});