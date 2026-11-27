// src/pages/teachers/clubs/event/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

const BASE_EVENT = {
  id: 'e1',
  emoji: '🏆',
  title: 'Inter-school Debate',
  club: 'Debate Club',
  date: 'Sat 2 Nov 2026',
  time: '9:00 AM – 12:00 PM',
  venue: 'Nairobi High · Main Hall',
  description:
    'Annual inter-school debate. Teams of 3 from each school, 3 rounds, elimination. Transport leaves the school gate at 7:30 AM sharp.',
  mandatory: true,
  owned: true,
  capacity: 30,
  rsvps: 22,
  resultsPosted: false,

  rsvpList: [
    { id: 'r1', name: 'James Otieno',   form: 'Form 4B', status: 'going' },
    { id: 'r2', name: 'Amina Wanjiku',  form: 'Form 3A', status: 'going' },
    { id: 'r3', name: 'Grace Njeri',    form: 'Form 3A', status: 'going' },
    { id: 'r4', name: 'Brian Kimani',   form: 'Form 3B', status: 'maybe' },
    { id: 'r5', name: 'Faith Mutua',    form: 'Form 4A', status: 'going' },
    { id: 'r6', name: 'Daniel Mwangi',  form: 'Form 2A', status: 'declined' },
  ],
};

const STATUS_COLOR = {
  going:    '#4caf7d',
  maybe:    '#e0a93a',
  declined: '#e25b5b',
};

const STATUS_LABEL = {
  going:    'GOING',
  maybe:    'MAYBE',
  declined: 'DECLINED',
};

/* -------------------- component -------------------- */

function RsvpRow({ item, colors }) {
  const styles = makeStyles(colors);
  const tint = STATUS_COLOR[item.status] ?? colors.fgMuted;
  return (
    <View style={styles.rsvpRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rsvpName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.rsvpMeta} numberOfLines={1}>{item.form}</Text>
      </View>
      <View style={[styles.rsvpBadge, { borderColor: tint }]}>
        <Text style={[styles.rsvpBadgeText, { color: tint }]}>
          {STATUS_LABEL[item.status] ?? '—'}
        </Text>
      </View>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClubEvent({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const event = useMemo(
    () => ({ ...BASE_EVENT, ...(route?.params ?? {}) }),
    [route?.params],
  );

  const [tab, setTab] = useState('overview');
  const [resultsText, setResultsText] = useState('');

  const counts = useMemo(() => {
    const c = { going: 0, maybe: 0, declined: 0 };
    event.rsvpList.forEach((r) => { c[r.status] = (c[r.status] ?? 0) + 1; });
    return c;
  }, [event.rsvpList]);

  const remindAll = () => {
    Alert.alert('Reminder sent', `Push notification sent to ${counts.going} going members.`);
  };

  const markDone = () => {
    Alert.alert(
      'Mark event as complete',
      'Members can still see the event but it moves to past events.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Mark complete', onPress: () => navigation?.goBack() },
      ]
    );
  };

  const postResults = () => {
    if (!resultsText.trim()) {
      Alert.alert('No results', 'Type results first.');
      return;
    }
    Alert.alert('Results posted', 'Members have been notified.');
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
          <TouchableOpacity
            hitSlop={8}
            onPress={() => navigation?.navigate('Teacher-Club-Event-Create', { event })}
          >
            <Feather name="edit-2" size={18} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroEmojiWrap}>
              <Text style={styles.heroEmoji}>{event.emoji}</Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <Text style={styles.heroMeta}>
              {event.club} · {event.date} · {event.time}
            </Text>
            <Text style={styles.heroMeta}>{event.venue}</Text>
            {event.mandatory && (
              <View style={styles.mandatoryPill}>
                <Text style={styles.mandatoryText}>🔴 MANDATORY</Text>
              </View>
            )}
          </View>

          {/* RSVP summary */}
          <View style={styles.statRow}>
            <View style={styles.statCell}>
              <Text style={[styles.statValue, { color: STATUS_COLOR.going }]}>{counts.going}</Text>
              <Text style={styles.statLabel}>GOING</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={[styles.statValue, { color: STATUS_COLOR.maybe }]}>{counts.maybe}</Text>
              <Text style={styles.statLabel}>MAYBE</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={[styles.statValue, { color: STATUS_COLOR.declined }]}>{counts.declined}</Text>
              <Text style={styles.statLabel}>DECLINED</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statValue}>{event.capacity ?? '—'}</Text>
              <Text style={styles.statLabel}>CAPACITY</Text>
            </View>
          </View>

          {/* Quick actions */}
          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} onPress={remindAll} activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={16} color={colors.accent} />
              <Text style={styles.quickBtnText}>REMIND</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={markDone} activeOpacity={0.7}>
              <Ionicons name="checkmark-done-outline" size={16} color={colors.accent} />
              <Text style={styles.quickBtnText}>MARK DONE</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {[
              { key: 'overview', label: 'OVERVIEW' },
              { key: 'rsvps',    label: `RSVPS (${event.rsvpList.length})` },
              { key: 'results',  label: 'RESULTS' },
            ].map((t) => {
              const active = tab === t.key;
              return (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.tab, active && styles.tabActive]}
                  onPress={() => setTab(t.key)}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {tab === 'overview' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>DESCRIPTION</Text>
              <Text style={styles.bodyText}>{event.description}</Text>
            </View>
          )}

          {tab === 'rsvps' && (
            <>
              <Text style={styles.sectionTitle}>RSVP LIST</Text>
              <View style={styles.listBlock}>
                {event.rsvpList.map((r) => (
                  <RsvpRow key={r.id} item={r} colors={colors} />
                ))}
              </View>
            </>
          )}

          {tab === 'results' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>RESULTS</Text>
              {event.resultsPosted ? (
                <Text style={styles.bodyText}>Results posted.</Text>
              ) : (
                <>
                  <TextInput
                    style={[styles.input, styles.inputMultiline]}
                    value={resultsText}
                    onChangeText={setResultsText}
                    placeholder="e.g. 1st place — Nairobi High; 2nd place — Morfosi…"
                    placeholderTextColor={colors.placeholder}
                    multiline
                    textAlignVertical="top"
                  />
                  <TouchableOpacity style={styles.primaryBtn} onPress={postResults} activeOpacity={0.7}>
                    <Text style={styles.primaryBtnText}>POST RESULTS</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}