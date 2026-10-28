// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: c.bg,
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingTop: 8,
    paddingBottom: 20,        // extra for iOS home indicator
    paddingHorizontal: 12,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 28,
  },

  activeDot: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.accent,
  },

  label: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '600',
    color: c.fgMuted,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: c.accent,
    fontWeight: '900',
  },
});