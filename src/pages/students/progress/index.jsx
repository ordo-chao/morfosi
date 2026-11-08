// revision/progress/index.jsx
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProgressView from './views/progress/index.jsx';
import StudyPlanView from './views/study-plan/index.jsx';
import StreaksView from './views/streaks/index.jsx';

/* -------------------- config -------------------- */

const TABS = [
  { key: 'progress', label: 'PROGRESS' },
  { key: 'plan',     label: 'STUDY PLAN' },
  { key: 'streaks',  label: 'STREAKS' },
];

const TAB_INDEX = { progress: 0, plan: 1, streaks: 2 };

/* -------------------- screen -------------------- */

export default function MyProgress({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const pagerRef = useRef(null);
  const [tab, setTab] = useState('progress');

  const handleTabChange = (key) => {
    setTab(key);
    pagerRef.current?.setPage(TAB_INDEX[key]);
  };

  const handlePageSelected = (e) => {
    const index = e.nativeEvent.position;
    const key = TABS[index]?.key;
    if (key) setTab(key);
  };

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY PROGRESS</Text>
        <View style={{ width: 22 }} />
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
        initialPage={0}
        onPageSelected={handlePageSelected}
        overdrag
      >
        <View key="progress" style={{ flex: 1 }}>
          <ProgressView navigation={navigation} />
        </View>
        <View key="plan" style={{ flex: 1 }}>
          <StudyPlanView navigation={navigation} />
        </View>
        <View key="streaks" style={{ flex: 1 }}>
          <StreaksView navigation={navigation} />
        </View>
      </PagerView>
    </View>
  );
}