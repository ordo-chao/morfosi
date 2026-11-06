// components/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== BACKDROP / SHEET ===== */
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: c.bg,
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
    maxHeight: '90%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.borderStrong,
    marginBottom: 8,
  },

  /* ===== HERO ===== */
  hero: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarText: {
    fontFamily: 'monospace',
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
  },
  heroName: {
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  youTag: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.accent,
    fontWeight: '900',
  },
  rolePill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
  },
  rolePillText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
  },
  typeLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 2,
    color: c.fgMuted,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 8,
  },

  /* ===== SCROLL BODY ===== */
  scrollBody: {
    gap: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 6,
  },

  /* ===== INFO ROWS ===== */
  infoBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  infoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 70,
  },
  infoValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'right',
  },

  bioText: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },

  /* ===== ACTIONS ===== */
  actions: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  primaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  closeBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  closeBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
});