// clubs/views/my-clubs-view/css.js
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
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 4,
  },

  /* ===== EMPTY ===== */
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyEmojiWrap: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyEmoji: {
    fontSize: 28,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: c.fg,
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  linkButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.accent,
  },
});