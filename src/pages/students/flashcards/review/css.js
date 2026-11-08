// revision/flashcards/review/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },
  headerMeta: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fgMuted,
    letterSpacing: 0.5,
  },

  /* Progress */
  progressBlock: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  progressTrack: {
    height: 4,
    backgroundColor: c.surfaceHi,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: c.accent,
    borderRadius: 2,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 20,
  },

  /* Card */
  card: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 24,
    gap: 16,
  },
  cardFront: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'center',
  },
  cardDivider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 8,
  },
  cardBack: {
    fontSize: 15,
    lineHeight: 22,
    color: c.fg,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardTip: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.accent,
    letterSpacing: 0.3,
    textAlign: 'center',
    marginTop: 8,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
  },
  tapHintText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },

  /* Prev / Next navigation */
  navRow: {
    flexDirection: 'row',
    gap: 8,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  navBtnDisabled: {
    opacity: 0.5,
  },
  navBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  navBtnTextDisabled: {
    color: c.fgMuted,
  },
});