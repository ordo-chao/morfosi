// campus/views/sports/fixtures/index.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Layout from '../../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const FIXTURES = [
  {
    id: 'f1',
    day: 'SAT 2 NOV',
    emoji: '⚽',
    team: 'Football · U-17',
    title: 'vs Nairobi School',
    time: '2:00 PM',
    venue: 'Away',
    bus: 'Bus departs 11:30 AM',
    status: 'upcoming',
  },
  {
    id: 'f2',
    day: 'THU 7 NOV',
    emoji: '🏀',
    team: 'Basketball · U-17',
    title: 'vs Kiambu High',
    time: '4:00 PM',
    venue: 'Home',
    status: 'upcoming',
  },
  {
    id: 'f3',
    day: 'SAT 9 NOV',
    emoji: '⚽',
    team: 'Football · U-17',
    title: 'vs Alliance High',
    time: '2:00 PM',
    venue: 'Home',
    status: 'upcoming',
  },
  {
    id: 'f4',
    day: 'SAT 16 NOV',
    emoji: '⚽',
    team: 'Football · U-17',
    title: "vs Mang'u High",
    time: '2:00 PM',
    venue: 'Away',
    bus: 'Bus departs 11:30 AM',
    status: 'upcoming',
  },
  {
    id: 'f5',
    day: 'SAT 19 OCT',
    emoji: '⚽',
    team: 'Football · U-17',
    title: 'vs Rift Valley High',
    time: '2:00 PM',
    venue: 'Home',
    result: 'Won 3-1',
    status: 'past',
  },
  {
    id: 'f6',
    day: 'SAT 12 OCT',
    emoji: '⚽',
    team: 'Football · U-17',
    title: "vs St. Mary's",
    time: '2:00 PM',
    venue: 'Away',
    result: 'Drew 2-2',
    status: 'past',
  },
];

const FILTERS = [
  { key: 'all',      label: 'ALL' },
  { key: 'upcoming', label: 'UPCOMING' },
  { key: 'past',     label: 'PAST' },
];

/* -------------------- components -------------------- */

function FixtureCard({ fixture, onAddToCalendar, colors }) {
  const styles = makeStyles(colors);
  const isPast = fixture.status === 'past';

  return (
    <View style={[styles.fixtureCard, isPast && styles.fixtureCardPast]}>
      <View style={styles.fixtureHeader}>
        <Text style={styles.fixtureDay}>🏆 {fixture.day}</Text>
        {isPast && fixture.result ? (
          <View style={styles.resultPill}>
            <Text style={styles.resultPillText}>{fixture.result.toUpperCase()}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.fixtureDivider} />

      <View style={styles.fixtureBody}>
        <Text style={styles.fixtureEmoji}>{fixture.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.fixtureTeam}>{fixture.team}</Text>
          <Text style={styles.fixtureTitle}>{fixture.title}</Text>
          <Text style={styles.fixtureMeta}>
            {fixture.time} · {fixture.venue}
          </Text>
          {fixture.bus ? (
            <Text style={styles.fixtureBus}>🚌 {fixture.bus}</Text>
          ) : null}
        </View>
      </View>

      {!isPast && (
        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => onAddToCalendar(fixture)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={14} color={colors.fg} />
          <Text style={styles.calendarBtnText}>ADD TO CALENDAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* -------------------- view -------------------- */

export default function Fixtures({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const teamId = route?.params?.teamId;
  const teamName = route?.params?.teamName;

  const [filter, setFilter] = useState('all');

  const filtered = FIXTURES.filter((f) => {
    if (filter === 'all') return true;
    return f.status === filter;
  });

  const handleAddToCalendar = (fixture) => {
    Alert.alert('Added to calendar', `${fixture.team} ${fixture.title}`);
  };

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {teamName ? 'FIXTURES' : 'ALL FIXTURES'}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Context */}
        {teamName && (
          <Text style={styles.teamLabel}>{teamName.toUpperCase()}</Text>
        )}

        {/* Filters */}
        <View style={styles.filtersRow}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setFilter(f.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* List */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyTitle}>No fixtures</Text>
            <Text style={styles.emptySub}>
              Try a different filter.
            </Text>
          </View>
        ) : (
          filtered.map((f) => (
            <FixtureCard
              key={f.id}
              fixture={f}
              onAddToCalendar={handleAddToCalendar}
              colors={colors}
            />
          ))
        )}
      </ScrollView>
    </View>
    </Layout>
  );
}