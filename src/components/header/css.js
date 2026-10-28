// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: c.bg,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 5,
  },

  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    color: c.fg,
    fontSize: 18,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontWeight: '600',
    color: c.fgMuted,
    fontSize: 12,
    letterSpacing: 0.3,
    marginTop: 2,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
  },

  /* Count badge — sits at the top-right corner of the icon button */
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: c.accent,
    borderWidth: 1.5,
    borderColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: c.accentContrast,
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
    lineHeight: 12,
    textAlign: 'center',
  },
});