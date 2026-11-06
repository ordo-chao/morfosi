// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== TAB BAR ===== */
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: c.accent,
  },
  tabText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fgMuted,
  },
  tabTextActive: {
    color: c.accent,
  },

  /* ===== SCROLL / TAB BODY ===== */
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

  /* ===== CATEGORY CHIPS ===== */
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

  /* ===== CLUB CARD ===== */
  clubCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  clubHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  clubEmojiWrap: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubEmoji: {
    fontSize: 20,
  },
  clubName: {
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.2,
  },
  clubPatron: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  clubMeet: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  clubNext: {
    fontSize: 11,
    color: c.fg,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },

  /* Status / Role */
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusRole: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: c.accent,
  },
  pendingText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  approvalNote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* Actions */
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  openBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  joinBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  joinBtnDisabled: {
    backgroundColor: c.surface,
    borderColor: c.border,
  },
  joinBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.buttonFg,
  },
  joinBtnTextDisabled: {
    color: c.fgMuted,
  },
  cancelBtn: {
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  cancelBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== EVENTS ===== */
  eventsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  eventEmojiWrap: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventEmoji: {
    fontSize: 16,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  eventMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  eventVenue: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgFaint,
    marginTop: 2,
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