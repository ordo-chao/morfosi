// campus/views/events/index.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const CATEGORIES = [
  { key: 'all',      label: 'ALL' },
  { key: 'academic', label: 'ACADEMIC' },
  { key: 'cultural', label: 'CULTURAL' },
  { key: 'sports',   label: 'SPORTS' },
];

const EVENTS = [
  {
    id: 'e1',
    day: 'WED 30 OCT',
    category: 'cultural',
    emoji: '🎭',
    title: 'School Play — "The Lion and the Jewel"',
    time: '6:00 PM',
    venue: 'School Hall',
    host: 'Drama Club',
    group: 'This week',
  },
  {
    id: 'e2',
    day: 'SAT 2 NOV',
    category: 'sports',
    emoji: '🏆',
    title: 'Inter-school Football Match',
    time: '2:00 PM',
    venue: 'Nairobi School · Away',
    host: 'Sports Department',
    group: 'This week',
  },
  {
    id: 'e3',
    day: 'MON 4 NOV',
    category: 'academic',
    emoji: '🎓',
    title: 'Career Day',
    time: 'All day',
    venue: 'Main Hall',
    host: 'Guest speakers from 8 universities',
    mandatory: true,
    group: 'Next week',
  },
  {
    id: 'e4',
    day: 'FRI 8 NOV',
    category: 'cultural',
    emoji: '🎉',
    title: 'Cultural Day',
    time: '9:00 AM – 4:00 PM',
    venue: 'School Grounds',
    host: 'Music, dance, food, traditional dress',
    group: 'Next week',
  },
];

/* -------------------- components -------------------- */

function EventCard({ event, onOpen, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onOpen(event)}
      activeOpacity={0.7}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.eventDay}>{event.emoji} {event.day}</Text>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>
            {event.category.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventMeta}>
        {event.time} · {event.venue}
      </Text>
      <Text style={styles.eventHost}>Hosted by: {event.host}</Text>

      {event.mandatory ? (
        <View style={styles.mandatoryPill}>
          <Text style={styles.mandatoryText}>🔴 MANDATORY FOR FORM 3–4</Text>
        </View>
      ) : null}

      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.eventActionBtn}
          onPress={(e) => {
            e.stopPropagation?.();
            Alert.alert('Added to calendar', event.title);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.eventActionText}>ADD TO CALENDAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eventActionBtn}
          onPress={(e) => {
            e.stopPropagation?.();
            Alert.alert('Reminder set', event.title);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.eventActionText}>REMIND ME</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- view -------------------- */

export default function EventsView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const [category, setCategory] = useState('all');

  const filtered = category === 'all'
    ? EVENTS
    : EVENTS.filter((e) => e.category === category);

  const grouped = filtered.reduce((acc, e) => {
    if (!acc[e.group]) acc[e.group] = [];
    acc[e.group].push(e);
    return acc;
  }, {});

  const handleOpenEvent = (event) => {
    navigation?.navigate('Student-EventDetail', { event });
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: 24 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ===== CHIPS ===== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 8 }}
        contentContainerStyle={styles.chipsRow}
      >
        {CATEGORIES.map((c) => {
          const active = c.key === category;
          return (
            <TouchableOpacity
              key={c.key}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setCategory(c.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ===== EVENTS GROUPED ===== */}
      {Object.entries(grouped).map(([group, groupEvents]) => (
        <View key={group}>
          <Text style={styles.sectionTitle}>{group.toUpperCase()}</Text>
          {groupEvents.map((e) => (
            <EventCard
              key={e.id}
              event={e}
              onOpen={handleOpenEvent}
              colors={colors}
            />
          ))}
        </View>
      ))}

      {filtered.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📅</Text>
          <Text style={styles.emptyTitle}>No events match this filter</Text>
          <Text style={styles.emptySub}>
            Try a different category.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}