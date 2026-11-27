// campus/views/sports/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const TEAMS = [
  {
    id: 't1',
    emoji: '⚽',
    name: 'Football · Under-17',
    coach: 'Coach Wekesa',
    schedule: 'Tue & Thu · 4:00 PM · Main Field',
    next: { label: 'Match vs Nairobi School', when: 'Sat 2 Nov · 2:00 PM · Away' },
  },
  {
    id: 't2',
    emoji: '🏀',
    name: 'Basketball · Under-17',
    coach: 'Ms. Wairimu',
    schedule: 'Mon & Wed · 3:30 PM · Indoor Court',
    next: { label: 'Training session', when: 'Tomorrow · 3:30 PM' },
  },
];

const MATCHES = [
  {
    id: 'm1',
    day: 'SAT 2 NOV',
    emoji: '⚽',
    title: 'Football vs Nairobi School',
    meta: '2:00 PM · Away · Bus 11:30 AM',
  },
  {
    id: 'm2',
    day: 'THU 7 NOV',
    emoji: '🏀',
    title: 'Basketball vs Kiambu High',
    meta: '4:00 PM · Home',
  },
];

const SPORTS = [
  { id: 's1', emoji: '⚽', name: 'Football',    state: 'joined'  },
  { id: 's2', emoji: '🏀', name: 'Basketball',  state: 'joined'  },
  { id: 's3', emoji: '🏐', name: 'Volleyball',  state: 'join'    },
  { id: 's4', emoji: '🏊', name: 'Swimming',    state: 'request' },
  { id: 's5', emoji: '🏸', name: 'Badminton',   state: 'join'    },
  { id: 's6', emoji: '🏃', name: 'Athletics',   state: 'join'    },
];

/* -------------------- components -------------------- */

function TeamCard({ team, onOpen, onFixtures, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamHeader}>
        <View style={styles.teamEmojiWrap}>
          <Text style={styles.teamEmoji}>{team.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamCoach}>Coach: {team.coach}</Text>
          <Text style={styles.teamSchedule}>📅 {team.schedule}</Text>
        </View>
      </View>

      <View style={styles.nextBlock}>
        <Text style={styles.nextLabel}>⏭ NEXT</Text>
        <Text style={styles.nextTitle}>{team.next.label}</Text>
        <Text style={styles.nextMeta}>{team.next.when}</Text>
      </View>

      <View style={styles.teamActions}>
        <TouchableOpacity
          style={styles.teamActionBtn}
          onPress={() => onOpen(team)}
          activeOpacity={0.7}
        >
          <Text style={styles.teamActionText}>VIEW TEAM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.teamActionBtn}
          onPress={() => onFixtures(team)}
          activeOpacity={0.7}
        >
          <Text style={styles.teamActionText}>FIXTURES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SportTile({ sport, colors }) {
  const styles = makeStyles(colors);
  const isJoined = sport.state === 'joined';
  const isRequest = sport.state === 'request';

  return (
    <View style={styles.sportTile}>
      <Text style={styles.sportEmoji}>{sport.emoji}</Text>
      <Text style={styles.sportName}>{sport.name}</Text>
      {isJoined ? (
        <View style={styles.sportJoinedPill}>
          <Text style={styles.sportJoinedText}>✓ JOINED</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.sportJoinBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.sportJoinBtnText}>
            {isRequest ? 'REQUEST' : 'JOIN'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* -------------------- view -------------------- */

export default function SportsView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const handleOpenTeam = (team) => {
    navigation?.navigate('Team-Detail', { team });
  };

  const handleFixtures = (team) => {
    navigation?.navigate('Fixtures', {
      teamId: team.id,
      teamName: team.name,
    });
  };

  const handleAllFixtures = () => {
    navigation?.navigate('Fixtures');
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
      {/* ===== MY TEAMS ===== */}
      <Text style={styles.sectionTitle}>MY TEAMS</Text>
      {TEAMS.map((t) => (
        <TeamCard
          key={t.id}
          team={t}
          onOpen={handleOpenTeam}
          onFixtures={handleFixtures}
          colors={colors}
        />
      ))}

      {/* ===== UPCOMING MATCHES ===== */}
      <Text style={styles.sectionTitle}>UPCOMING MATCHES</Text>
      <View style={styles.matchesBlock}>
        {MATCHES.map((m) => (
          <View key={m.id} style={styles.matchRow}>
            <Text style={styles.matchDay}>🏆 {m.day}</Text>
            <View style={styles.matchDivider} />
            <View style={styles.matchBody}>
              <Text style={styles.matchTitle}>
                {m.emoji} {m.title}
              </Text>
              <Text style={styles.matchMeta}>{m.meta}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.linkBtn}
        onPress={handleAllFixtures}
        activeOpacity={0.7}
      >
        <Text style={styles.linkBtnText}>SEE ALL FIXTURES →</Text>
      </TouchableOpacity>

      {/* ===== SPORTS AVAILABLE ===== */}
      <Text style={styles.sectionTitle}>SPORTS AVAILABLE</Text>
      <View style={styles.sportsGrid}>
        {SPORTS.map((s) => (
          <SportTile key={s.id} sport={s} colors={colors} />
        ))}
      </View>
    </ScrollView>
  );
}