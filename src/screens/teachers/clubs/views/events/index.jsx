// src/pages/teachers/clubs/views/events/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import EventRow from '../../components/event-row/index.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventsView({ events, onOpen, onCreate }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.tabBody}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>UPCOMING ({events.length})</Text>
          <TouchableOpacity style={styles.createBtn} onPress={onCreate} activeOpacity={0.7}>
            <Ionicons name="add" size={14} color={colors.accent} />
            <Text style={styles.createBtnText}>CREATE EVENT</Text>
          </TouchableOpacity>
        </View>

        {events.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No upcoming events</Text>
            <Text style={styles.emptySub}>
              Create one for a club you patron, or wait for others to publish.
            </Text>
          </View>
        ) : (
          <View style={styles.eventsBlock}>
            {events.map((e) => (
              <EventRow key={e.id} event={e} onPress={() => onOpen(e)} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}