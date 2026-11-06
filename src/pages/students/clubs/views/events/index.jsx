// clubs/views/EventsView.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';
import EventRow from '../../components/event-row/index.jsx';

export default function EventsView({ events, onOpen }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (events.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📅</Text>
          <Text style={styles.emptyTitle}>No upcoming events</Text>
          <Text style={styles.emptySub}>
            Events from your clubs will show up here.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tabBody}>
        <Text style={styles.sectionTitle}>UPCOMING ({events.length})</Text>
        <View style={styles.eventsBlock}>
          {events.map((e) => (
            <EventRow key={e.id} event={e} onPress={() => onOpen(e)} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}