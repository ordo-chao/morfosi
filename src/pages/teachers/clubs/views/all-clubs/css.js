// src/pages/teachers/clubs/views/all-clubs/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  tabBody: { gap: 12 },
  hint: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted,
    lineHeight: 16, letterSpacing: 0.2,
    padding: 10, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
});