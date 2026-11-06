// clubs/views/activity/index.jsx
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- data -------------------- */

const TERM = {
  label: 'Term 2',
  year: '2025/2026',
};

const SUMMARY = {
  clubs: 2,
  events: 14,
  roles: 1,
  attendance: 92,
};

const ACTIVITY = [
  {
    id: 'a1',
    emoji: '🎭',
    name: 'Debate Club',
    role: 'Member',
    joinedAt: 'Sept 2024',
    attendance: { attended: 24, total: 26 },
    events: { attended: 8, competitions: 2 },
    achievements: ['Regional runner-up · Aug 2026'],
  },
  {
    id: 'a2',
    emoji: '♟️',
    name: 'Chess Club',
    role: 'Secretary',
    joinedAt: 'Jan 2026',
    attendance: { attended: 18, total: 20 },
    events: { attended: 6, competitions: 3 },
    achievements: ['Club champion · 2026'],
  },
];

/* -------------------- components -------------------- */

function SummaryTile({ value, label, accent, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={[styles.summaryTile, accent && styles.summaryTileAccent]}>
      <Text style={[styles.summaryValue, accent && styles.summaryValueAccent]}>
        {value}
      </Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function ActivityCard({ club, onDownloadCertificate, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((club.attendance.attended / club.attendance.total) * 100);
  const roleLabel =
    club.role && club.role !== 'Member'
      ? `${club.role} since ${club.joinedAt}`
      : `Member since ${club.joinedAt}`;

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{club.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.roleLine}>{roleLabel}</Text>
        </View>
      </View>

      <View style={styles.statsList}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Attendance</Text>
          <Text style={styles.statValue}>
            {club.attendance.attended} / {club.attendance.total} meetings
            <Text style={styles.statAccent}>  ({pct}%)</Text>
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Events</Text>
          <Text style={styles.statValue}>
            {club.events.attended} attended · {club.events.competitions} competitions
          </Text>
        </View>
        {club.achievements?.length > 0 && (
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Achievements</Text>
            <Text style={styles.statValue} numberOfLines={2}>
              {club.achievements.join(' · ')}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.certBtn}
        onPress={() => onDownloadCertificate(club)}
        activeOpacity={0.7}
      >
        <Ionicons name="document-text-outline" size={14} color={colors.fg} />
        <Text style={styles.certBtnText}>CERTIFICATE</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- view -------------------- */

export default function ActivityView({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const totals = useMemo(() => SUMMARY, []);

  const handleDownloadCertificate = (club) => {
    navigation?.navigate('Student-Club-Certificate', {
      club,
      term: TERM,
    });
  };

  const handleDownloadAll = () => {
    Alert.alert(
      'Download all certificates',
      `Generate certificates for all ${ACTIVITY.length} clubs and email them to you?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Alert.alert('Export started') },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tabBody}>
        <Text style={styles.termLabel}>
          {TERM.label} · {TERM.year}
        </Text>

        {/* ===== SUMMARY ===== */}
        <Text style={styles.sectionTitle}>THIS TERM</Text>
        <View style={styles.summaryRow}>
          <SummaryTile value={totals.clubs}              label="CLUBS"  accent colors={colors} />
          <SummaryTile value={totals.events}             label="EVENTS" colors={colors} />
          <SummaryTile value={totals.roles}              label="ROLES"  colors={colors} />
          <SummaryTile value={`${totals.attendance}%`}   label="ATTEND" accent colors={colors} />
        </View>

        {/* ===== CLUBS ===== */}
        {ACTIVITY.map((club) => (
          <View key={club.id} style={styles.clubBlock}>
            <Text style={styles.sectionTitle}>
              {club.name.toUpperCase()}
            </Text>
            <ActivityCard
              club={club}
              onDownloadCertificate={handleDownloadCertificate}
              colors={colors}
            />
          </View>
        ))}

        {/* ===== BULK DOWNLOAD ===== */}
        <TouchableOpacity
          style={styles.bulkBtn}
          onPress={handleDownloadAll}
          activeOpacity={0.7}
        >
          <Ionicons name="download-outline" size={16} color={colors.buttonFg} />
          <Text style={styles.bulkBtnText}>DOWNLOAD ALL CERTIFICATES</Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          Certificates are issued per club per term. Older terms remain
          available in your records.
        </Text>
      </View>
    </ScrollView>
  );
}