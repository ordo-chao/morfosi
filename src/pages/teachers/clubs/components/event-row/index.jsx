// src/pages/teachers/clubs/components/event-row/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventRow({ event, onPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.emojiWrap}>
        <Text style={styles.emoji}>{event.emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
          {event.owned && (
            <View style={styles.ownedPill}>
              <Text style={styles.ownedPillText}>YOURS</Text>
            </View>
          )}
        </View>
        <Text style={styles.meta} numberOfLines={1}>
          {event.club} · {event.date} · {event.time}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>{event.venue}</Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}