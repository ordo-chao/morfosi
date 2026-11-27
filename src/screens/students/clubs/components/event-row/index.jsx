// clubs/components/EventRow.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventRow({ event, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={styles.eventRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.eventEmojiWrap}>
        <Text style={styles.eventEmoji}>{event.emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventMeta}>
          {event.club} · {event.date} · {event.time}
        </Text>
        <Text style={styles.eventVenue}>{event.venue}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}