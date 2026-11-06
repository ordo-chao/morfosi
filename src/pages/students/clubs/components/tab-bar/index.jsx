// clubs/components/TabBar.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';

const TABS = [
  { key: 'my',     label: 'MY CLUBS' },
  { key: 'all',    label: 'ALL CLUBS' },
  { key: 'events', label: 'EVENTS' },
];

export { TABS };

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