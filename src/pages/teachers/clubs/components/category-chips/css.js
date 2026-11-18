// src/pages/teachers/clubs/components/category-chips/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  row: { gap: 6, paddingVertical: 4 },
  chip: {
    paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  chipActive: { borderColor: c.accent, backgroundColor: c.accent },
  label: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  labelActive: { color: c.accentContrast },
});