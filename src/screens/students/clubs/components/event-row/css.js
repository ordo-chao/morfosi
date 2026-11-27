// clubs/components/event-row/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
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
});