// campus/index.jsx
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DormsView from './views/dorms/index.jsx';
import SportsView from './views/sports/index.jsx';
import EventsView from './views/events/index.jsx';

const TABS = [
  { key: 'dorms',  label: 'DORMS' },
  { key: 'sports', label: 'SPORTS' },
  { key: 'events', label: 'EVENTS' },
];

const TAB_INDEX = { dorms: 0, sports: 1, events: 2 };

export default function Campus({ route, navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const pagerRef = useRef(null);
  const [tab, setTab] = useState(route?.params?.tab ?? 'dorms');

  const handleTabChange = (key) => {
    setTab(key);
    pagerRef.current?.setPage(TAB_INDEX[key]);
  };

  const handlePageSelected = (e) => {
    const key = TABS[e.nativeEvent.position]?.key;
    if (key) setTab(key);
  };

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CAMPUS LIFE</Text>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <TouchableOpacity
              key={t.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => handleTabChange(t.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Pager */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={TAB_INDEX[tab] ?? 0}
        onPageSelected={handlePageSelected}
        overdrag
      >
        <View key="dorms" style={{ flex: 1 }}>
          <DormsView navigation={navigation} />
        </View>
        <View key="sports" style={{ flex: 1 }}>
          <SportsView navigation={navigation} />
        </View>
        <View key="events" style={{ flex: 1 }}>
          <EventsView navigation={navigation} />
        </View>
      </PagerView>
    </View>
    </Layout>
  );
}