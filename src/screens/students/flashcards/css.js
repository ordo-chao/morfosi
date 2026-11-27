// revision/flashcards/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

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
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },

  /* Tabs */
  tabsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: c.accent,
  },
  tabText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fgMuted,
  },
  tabTextActive: {
    color: c.accent,
  },

  /* Section title */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 8,
  },

  /* Deck list */
  deckList: {
    gap: 8,
  },
  deckCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  deckHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  deckEmojiWrap: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckEmoji: {
    fontSize: 18,
  },
  deckSubject: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
  },
  deckName: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.2,
    marginTop: 2,
  },
  countPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  countPillText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.fg,
  },
  deckStats: {
    flexDirection: 'row',
    gap: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  deckMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
  deckMetaStrong: {
    color: c.fg,
    fontWeight: '900',
  },
  reviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  reviewBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* Empty */
  empty: {
    alignItems: 'center',
    paddingVertical: 56,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },
  emptySub: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
  createBtn: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  createBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.buttonFg,
  },
});