// clubs/index.jsx
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TabBar, { TABS } from './components/tab-bar/index.jsx';
import MyClubsView from './views/my-clubs/index.jsx';
import AllClubsView from './views/all-clubs/index.jsx';
import EventsView from './views/events/index.jsx';

/* -------------------- data -------------------- */

const CLUBS = [
  {
    id: 'c1', emoji: '🎭', name: 'Debate Club', category: 'academic',
    patron: 'Mrs. Wanjiru', meet: 'Thu · 4:00 PM · Rm 12',
    members: 24, memberStatus: 'member', role: 'Member',
    joinStatus: 'open', nextEvent: 'Inter-school Debate · Sat 2 Nov',
  },
  {
    id: 'c2', emoji: '♟️', name: 'Chess Club', category: 'academic',
    patron: 'Mr. Kariuki', meet: 'Tue · 3:30 PM · Library',
    members: 16, memberStatus: 'member', role: 'Secretary',
    joinStatus: 'open', nextEvent: 'Club Tournament · Fri 1 Nov',
  },
  {
    id: 'c3', emoji: '🤖', name: 'Robotics Club', category: 'academic',
    patron: 'Ms. Achieng', meet: 'Wed · 3:30 PM · Lab 3',
    members: 12, memberStatus: 'pending', role: null,
    joinStatus: 'approval', requestedAt: '2 days ago',
  },
  {
  id: 'c4', emoji: '🎤', name: 'Maths Club', category: 'academic',
  patron: 'Ms. Achieng', meet: 'Wed · 3:30 PM · Lab 3',
  members: 12, memberStatus: 'none', role: null,   // ← changed from 'pending'
  joinStatus: 'approval',
},
  {
    id: 'c5', emoji: '🎤', name: 'Music Club', category: 'arts',
    patron: 'Mr. Mwangi', meet: 'Fri · 4:00 PM · Music Room',
    members: 24, memberStatus: 'none', joinStatus: 'open',
  },
  {
    id: 'c6', emoji: '⚽', name: 'Football Club', category: 'sports',
    patron: 'Coach Wekesa', meet: 'Tue/Thu · 4:00 PM · Field',
    members: 30, memberStatus: 'member', role: 'Member', joinStatus: 'open',
  },
  {
    id: 'c7', emoji: '🎬', name: 'Drama Club', category: 'arts',
    patron: 'Mrs. Wairimu', meet: 'Mon · 4:00 PM · Hall',
    members: 40, capacity: 40, memberStatus: 'none', joinStatus: 'full',
  },
  {
    id: 'c8', emoji: '🌱', name: 'Environmental Club', category: 'service',
    patron: 'Mr. Odhiambo', meet: 'Sat · 9:00 AM · Gate 2',
    members: 18, memberStatus: 'none', joinStatus: 'open',
  },
];

const EVENTS = [
  {
    id: 'e1', clubId: 'c1', club: 'Debate Club', emoji: '🎭',
    title: 'Inter-school Debate', date: 'Sat 2 Nov', time: '10:00 AM',
    venue: 'Main Hall', status: 'upcoming',
  },
  {
    id: 'e2', clubId: 'c2', club: 'Chess Club', emoji: '♟️',
    title: 'Club Tournament', date: 'Fri 1 Nov', time: '3:30 PM',
    venue: 'Library', status: 'upcoming',
  },
  {
    id: 'e3', clubId: 'c5', club: 'Football Club', emoji: '⚽',
    title: 'Friendly vs. Form 2A', date: 'Wed 30 Oct', time: '4:00 PM',
    venue: 'Main Field', status: 'upcoming',
  },
];

/* -------------------- screen -------------------- */

const TAB_INDEX = { my: 0, all: 1, events: 2 };

export default function Clubs({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const pagerRef = useRef(null);

  const [tab, setTab] = useState('my');
  const [category, setCategory] = useState('all');
  const [clubs, setClubs] = useState(CLUBS);

  /* Tab tap → jump pager */
  const handleTabChange = (key) => {
    setTab(key);
    pagerRef.current?.setPage(TAB_INDEX[key]);
  };

  /* Swipe → sync tab indicator */
  const handlePageSelected = (e) => {
    setTab(TABS[e.nativeEvent.position].key);
  };

  /* Actions */
  const handleJoin = (club) => {
    setClubs((list) =>
      list.map((c) =>
        c.id === club.id
          ? {
              ...c,
              memberStatus: c.joinStatus === 'approval' ? 'pending' : 'member',
              role: c.joinStatus === 'approval' ? c.role : 'Member',
              requestedAt: 'just now',
            }
          : c
      )
    );
  };

  const handleCancel = (club) => {
    setClubs((list) =>
      list.map((c) =>
        c.id === club.id
          ? { ...c, memberStatus: 'none', role: null, requestedAt: null }
          : c
      )
    );
  };

  const handleOpen = (club) => {
    navigation?.navigate('Student-Clubs-Detail', { clubId: club.id });
  };

  const handleOpenEvent = (event) => {
    navigation?.navigate('Student-ClubEvent', { eventId: event.id });
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CLUBS & SOCIETIES</Text>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Search')}
            hitSlop={8}
          >
            <Ionicons name="search" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        {/* Tab bar */}
        <TabBar active={tab} onChange={handleTabChange} />

        {/* Swipeable pager */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={handlePageSelected}
          overdrag
        >
          <View key="my" style={{ flex: 1 }}>
            <MyClubsView
              clubs={clubs}
              onOpen={handleOpen}
              onCancel={handleCancel}
              onBrowse={() => handleTabChange('all')}
            />
          </View>

          <View key="all" style={{ flex: 1 }}>
            <AllClubsView
              clubs={clubs}
              category={category}
              setCategory={setCategory}
              onOpen={handleOpen}
              onJoin={handleJoin}
            />
          </View>

          <View key="events" style={{ flex: 1 }}>
            <EventsView events={EVENTS} onOpen={handleOpenEvent} />
          </View>
        </PagerView>
      </View>
    </Layout>
  );
}