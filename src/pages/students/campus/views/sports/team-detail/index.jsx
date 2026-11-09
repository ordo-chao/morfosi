// campus/views/sports/team-detail/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Layout from '../../../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const BASE_TEAM = {
  id: 't1',
  emoji: '⚽',
  name: 'Football · Under-17',
  coach: 'Coach Wekesa',
  schedule: 'Tue & Thu · 4:00 PM',
  venue: 'Main Field',
  players: 22,
  capacity: 25,
  league: 'County League · Div 2',
  memberState: 'member', // 'member' | 'pending' | 'none' | 'full'
};

const RECENT_RESULTS = [
  { id: 'r1', status: 'win',  score: '3-1', opponent: 'Rift Valley High', when: 'Sat 19 Oct' },
  { id: 'r2', status: 'draw', score: '2-2', opponent: "St. Mary's",       when: 'Sat 12 Oct' },
  { id: 'r3', status: 'win',  score: '4-0', opponent: 'Kisumu Boys',      when: 'Sat 5 Oct' },
];

const UPCOMING_FIXTURES = [
  { id: 'f1', date: 'Sat 2 Nov',  opponent: 'Nairobi School', venue: 'Away' },
  { id: 'f2', date: 'Sat 9 Nov',  opponent: 'Alliance High',  venue: 'Home' },
  { id: 'f3', date: 'Sat 16 Nov', opponent: "Mang'u High",    venue: 'Away' },
];

const SQUAD = [
  'Brian Kimani', 'Daniel Mwangi', 'Eric Otieno', 'Felix Wekesa',
  'George Mutua', 'Hassan Ali', 'Ian Kariuki', 'James Njoro',
  'Kevin Odhiambo', 'Liam Wanjiru', 'Martin Achieng', 'Nathan Kiptoo',
  'Oscar Maina', 'Peter Mbugua', 'Quincy Ouma', 'Ryan Njoroge',
  'Samuel Kamau', 'Timothy Wekesa', 'Victor Omollo', 'Wilson Barasa',
  'Yusuf Ahmed', 'Zachary Muthoni',
];

/* -------------------- helpers -------------------- */

function resultTint(status, colors) {
  if (status === 'win') return '#4caf7d';
  if (status === 'loss') return '#e25b5b';
  return colors.fgMuted;
}

function resultGlyph(status) {
  if (status === 'win') return '✅';
  if (status === 'loss') return '❌';
  return '➖';
}

/* -------------------- view -------------------- */

export default function TeamDetail({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const team = { ...BASE_TEAM, ...(route?.params?.team ?? {}) };
  const isMember = team.memberState === 'member';

  const handleViewFixtures = () => {
    navigation?.navigate('Fixtures', { teamId: team.id, teamName: team.name });
  };

  const handleViewSquad = () => {
    navigation?.navigate('Student-TeamSquad', { team });
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
          {team.name.toUpperCase()}
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
        {/* ===== HERO ===== */}
        <View style={styles.hero}>
          <View style={styles.heroEmojiWrap}>
            <Text style={styles.heroEmoji}>{team.emoji}</Text>
          </View>
          <Text style={styles.heroName}>{team.name}</Text>
          <Text style={styles.heroMeta}>
            {team.players} players · {team.coach}
          </Text>

          {isMember && (
            <View style={styles.memberPill}>
              <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
              <Text style={styles.memberPillText}>TEAM MEMBER</Text>
            </View>
          )}
        </View>

        {/* ===== DETAILS ===== */}
        <Text style={styles.sectionTitle}>DETAILS</Text>
        <View style={styles.detailsBlock}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👨‍🏫</Text>
            <Text style={styles.detailLabel}>Coach</Text>
            <Text style={styles.detailValue}>{team.coach}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailLabel}>Training</Text>
            <Text style={styles.detailValue}>{team.schedule}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailLabel}>Venue</Text>
            <Text style={styles.detailValue}>{team.venue}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👥</Text>
            <Text style={styles.detailLabel}>Players</Text>
            <Text style={styles.detailValue}>
              {team.players} / {team.capacity}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🏆</Text>
            <Text style={styles.detailLabel}>League</Text>
            <Text style={styles.detailValue}>{team.league}</Text>
          </View>
        </View>

        {/* ===== RECENT RESULTS ===== */}
        {RECENT_RESULTS.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENT RESULTS</Text>
            <View style={styles.resultsBlock}>
              {RECENT_RESULTS.map((r) => (
                <View key={r.id} style={styles.resultRow}>
                  <Text style={styles.resultGlyph}>{resultGlyph(r.status)}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.resultScore}>
                      {r.status === 'win' ? 'Won' : r.status === 'loss' ? 'Lost' : 'Drew'}{' '}
                      <Text style={[styles.resultScoreNum, { color: resultTint(r.status, colors) }]}>
                        {r.score}
                      </Text>{' '}
                      vs {r.opponent}
                    </Text>
                    <Text style={styles.resultWhen}>{r.when}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* ===== UPCOMING FIXTURES ===== */}
        <Text style={styles.sectionTitle}>UPCOMING FIXTURES</Text>
        <View style={styles.fixturesBlock}>
          {UPCOMING_FIXTURES.map((f) => (
            <View key={f.id} style={styles.fixtureRow}>
              <Text style={styles.fixtureDate}>{f.date}</Text>
              <Text style={styles.fixtureText} numberOfLines={1}>
                vs {f.opponent} · {f.venue}
              </Text>
              <TouchableOpacity
                style={styles.calendarIconBtn}
                onPress={() => Alert.alert('Added to calendar', `vs ${f.opponent}`)}
                hitSlop={6}
              >
                <Ionicons name="calendar-outline" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={handleViewFixtures}
          activeOpacity={0.7}
        >
          <Text style={styles.linkBtnText}>VIEW ALL FIXTURES →</Text>
        </TouchableOpacity>

        {/* ===== SQUAD ===== */}
        <Text style={styles.sectionTitle}>SQUAD ({team.players})</Text>
        <TouchableOpacity
          style={styles.squadBtn}
          onPress={handleViewSquad}
          activeOpacity={0.7}
        >
          <Ionicons name="people-outline" size={16} color={colors.fg} />
          <Text style={styles.squadBtnText}>VIEW FULL SQUAD</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
        </TouchableOpacity>

        {/* ===== TRAINING ===== */}
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => Alert.alert('Training schedule', team.schedule)}
          activeOpacity={0.7}
        >
          <Text style={styles.linkBtnText}>VIEW TRAINING SCHEDULE →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </Layout>
  );
}