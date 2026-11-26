// clubs/components/category-chips/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  chipsScroll: {
    flexGrow: 0,
    marginBottom: 8,
  },
  chipsRow: {
    gap: 6,
    paddingVertical: 4,
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
});