// src/pages/teachers/clubs/announcements/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, TextInput,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

const INITIAL = [
  {
    id: 'a1', text: 'Inter-school team announced — congratulations to all 6 selected!',
    body: 'Team: James O., Amina W., Grace N., Brian K., Faith M., Daniel M. First training Saturday at 9 AM in the Main Hall. Bring your debate notebooks.',
    time: '2d ago', pinned: true, author: 'You',
  },
  {
    id: 'a2', text: 'Debate motions for this week',
    body: 'Topic: "This house believes that social media does more harm than good." Prepare arguments for both sides by Thursday.',
    time: '5d ago', pinned: false, author: 'You',
  },
  {
    id: 'a3', text: 'Reminder: dues for term 2 are now due',
    body: 'KSh 500 per member for competition fees. Pay to the Treasurer (Grace N.) by Friday.',
    time: '1w ago', pinned: false, author: 'You',
  },
];

/* -------------------- component -------------------- */

function AnnouncementCard({ item, onPress, onPin, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHead}>
        {item.pinned && (
          <View style={styles.pinBadge}>
            <Ionicons name="pin" size={10} color={colors.accent} />
            <Text style={styles.pinBadgeText}>PINNED</Text>
          </View>
        )}
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.text}</Text>
      {item.body ? (
        <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
      ) : null}
      <View style={styles.cardFoot}>
        <Text style={styles.cardAuthor}>by {item.author}</Text>
        <TouchableOpacity onPress={() => onPin(item)} hitSlop={6}>
          <Feather
            name={item.pinned ? 'bookmark' : 'bookmark'}
            size={14}
            color={item.pinned ? colors.accent : colors.fgMuted}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClubAnnouncements({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const club = useMemo(
    () => ({ id: 'c1', name: 'Debate Club', ...(route?.params ?? {}) }),
    [route?.params],
  );

  const [announcements, setAnnouncements] = useState(INITIAL);
  const [query, setQuery] = useState('');

  const filtered = !query.trim()
    ? announcements
    : announcements.filter((a) =>
        a.text.toLowerCase().includes(query.trim().toLowerCase())
      );

  const togglePin = (item) => {
    setAnnouncements((list) =>
      list.map((a) => (a.id === item.id ? { ...a, pinned: !a.pinned } : a))
    );
  };

  const goCreate = () => {
    navigation?.navigate('Teacher-Club-Announcement-Create', { clubId: club.id });
  };

  const openAnnouncement = (item) => {
    navigation?.navigate('Teacher-Club-Announcement-Create', {
      clubId: club.id,
      announcement: item,
    });
  };

  return (
    <Layout>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {club.name} · Announcements
          </Text>
          <TouchableOpacity onPress={goCreate} hitSlop={8}>
            <Ionicons name="add" size={22} color={colors.accent} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search */}
          <View style={styles.searchRow}>
            <Ionicons name="search" size={14} color={colors.fgMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search announcements…"
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

          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No announcements match</Text>
            </View>
          ) : (
            filtered.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onPress={() => openAnnouncement(item)}
                onPin={togglePin}
                colors={colors}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}