// clubs/components/club-card/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== CARD ===== */
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

  /* ===== STATUS / ROLE ===== */
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

  /* ===== ACTIONS ===== */
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
});