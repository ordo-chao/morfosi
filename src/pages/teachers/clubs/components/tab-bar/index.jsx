// src/pages/teachers/clubs/components/tab-bar/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';

export const TABS = [
  { key: 'my',     label: 'MY CLUBS' },
  { key: 'all',    label: 'ALL CLUBS' },
  { key: 'events', label: 'EVENTS' },
  { key: 'roster', label: 'ROSTER' },
];


export default function TabBar({ active, onChange }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.tabBar}>
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(t.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}