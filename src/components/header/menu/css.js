// components/header/menu/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },

  /* ---- Profile ---- */
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: c.accent,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: c.accent + '22',
    borderColor: c.accent,
  },
  avatarInitial: {
    fontWeight: '900',
    fontFamily: 'monospace',
    color: c.accent,
  },
  profileText: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
    color: c.fg,
  },
  profileMeta: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.3,
    color: c.fgMuted,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: c.accent + '18',
    borderColor: c.accent + '55',
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    color: c.accent,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderColor: c.border,
    backgroundColor: c.bg,
  },

  /* ---- Shared ---- */
  divider: {
    height: 1,
    marginVertical: 14,
    backgroundColor: c.border,
  },
  dividerSpaced: {
    height: 1,
    marginVertical: 12,
    backgroundColor: c.border,
  },
  sectionHeading: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 2,
    color: c.fgMuted,
  },

  /* ---- View switcher ---- */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: c.accent + '15',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: c.bg,
    borderColor: c.border,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
  },
  labelActive: {
    color: c.accent,
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
    color: c.fgMuted,
  },

  /* ---- Navigation links ---- */
  quickItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 4,
  },
  quickLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 12,
    color: c.fg,
  },

  /* ---- Footer ---- */
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopColor: c.border,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    color: c.accent,
  },
});