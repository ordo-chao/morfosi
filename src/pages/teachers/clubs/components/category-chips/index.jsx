// src/pages/teachers/clubs/components/category-chips/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';

const CATEGORIES = [
  { key: 'all',      label: 'ALL' },
  { key: 'academic', label: 'ACADEMIC' },
  { key: 'arts',     label: 'ARTS' },
  { key: 'sports',   label: 'SPORTS' },
  { key: 'service',  label: 'SERVICE' },
];

export default function CategoryChips({ active, onChange }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CATEGORIES.map((c) => {
        const isActive = c.key === active;
        return (
          <TouchableOpacity
            key={c.key}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onChange(c.key)}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}