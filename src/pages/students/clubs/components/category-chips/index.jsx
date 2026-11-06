// clubs/components/CategoryChips.jsx
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';

export const CATEGORIES = [
  { key: 'all',      label: 'ALL' },
  { key: 'academic', label: 'ACADEMIC' },
  { key: 'sports',   label: 'SPORTS' },
  { key: 'arts',     label: 'ARTS' },
  { key: 'service',  label: 'SERVICE' },
];

export default function CategoryChips({ active, onChange }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.chipsScroll}
      contentContainerStyle={styles.chipsRow}
    >
      {CATEGORIES.map((c) => {
        const isActive = c.key === active;
        return (
          <TouchableOpacity
            key={c.key}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onChange(c.key)}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}