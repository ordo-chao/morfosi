// src/pages/teachers/clubs/views/roster/index.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ROSTER = {
  c1: [
    { id: 'p1', name: 'Amina Wanjiku',   role: 'Chair',   attendance: 0.96, atRisk: false },
    { id: 'p2', name: 'Brian Otieno',    role: 'Member',  attendance: 0.82, atRisk: true  },
    { id: 'p3', name: 'Cynthia Njeri',   role: 'Secretary', attendance: 0.98, atRisk: false },
    { id: 'p4', name: 'David Mwangi',    role: 'Member',  attendance: 0.74, atRisk: true  },
    { id: 'p5', name: 'Esther Achieng',  role: 'Treasurer', attendance: 0.92, atRisk: false },
    { id: 'p6', name: 'Farid Kariuki',   role: 'Member',  attendance: 0.89, atRisk: false },
  ],
  c2: [
    { id: 'p1', name: 'Amina Wanjiku',   role: 'Member',  attendance: 0.95, atRisk: false },
    { id: 'p7', name: 'Grace Muthoni',   role: 'Member',  attendance: 0.88, atRisk: false },
    { id: 'p8', name: 'Henry Omondi',    role: 'Chair',   attendance: 0.65, atRisk: true  },
  ],
};

export default function RosterView({ clubs, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [activeClubId, setActiveClubId] = useState(clubs[0]?.id ?? null);
  const [query, setQuery] = useState('');

  const activeClub = clubs.find((c) => c.id === activeClubId) ?? clubs[0];
  const baseRoster = ROSTER[activeClub?.id] ?? [];
  const filtered = !query.trim()
    ? baseRoster
    : baseRoster.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()));

  if (clubs.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>👥</Text>
          <Text style={styles.emptyTitle}>No patroned clubs</Text>
          <Text style={styles.emptySub}>
            Once you're assigned as patron, member rosters and attendance will appear here.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.tabBody}>
        {/* Club switcher */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.switcherRow}>
          {clubs.map((c) => {
            const isActive = c.id === activeClub?.id;
            return (
              <TouchableOpacity
                key={c.id}
                style={[styles.clubChip, isActive && styles.clubChipActive]}
                onPress={() => setActiveClubId(c.id)}
              >
                <Text style={[styles.clubChipText, isActive && styles.clubChipTextActive]}>
                  {c.emoji} {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search" size={14} color={colors.fgMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members…"
            placeholderTextColor={colors.placeholder}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={6}>
              <Ionicons name="close-circle" size={14} color={colors.fgMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statRow}>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>{baseRoster.length}</Text>
            <Text style={styles.statLabel}>MEMBERS</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={[styles.statValue, { color: '#e25b5b' }]}>
              {baseRoster.filter((s) => s.atRisk).length}
            </Text>
            <Text style={styles.statLabel}>AT RISK</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={[styles.statValue, { color: '#4caf7d' }]}>
              {Math.round(
                baseRoster.reduce((a, s) => a + s.attendance, 0) /
                  Math.max(1, baseRoster.length) * 100
              )}%
            </Text>
            <Text style={styles.statLabel}>AVG ATTEND</Text>
          </View>
        </View>

        {/* Roster rows */}
        <View style={styles.rosterBlock}>
          {filtered.length === 0 ? (
            <View style={styles.rosterEmpty}>
              <Text style={styles.rosterEmptyText}>No members match</Text>
            </View>
          ) : (
            filtered.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.memberRow}
                onPress={() =>
                  navigation?.navigate('Teacher-Student-Detail', {
                    classId: activeClub?.id,
                    student: s,
                  })
                }
              >
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberInitial}>{s.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName} numberOfLines={1}>{s.name}</Text>
                  <Text style={styles.memberMeta} numberOfLines={1}>
                    {s.role} · Attendance {Math.round(s.attendance * 100)}%
                  </Text>
                </View>
                {s.atRisk && (
                  <View style={styles.riskBadge}>
                    <Text style={styles.riskBadgeText}>AT RISK</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}