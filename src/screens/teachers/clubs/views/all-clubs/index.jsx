// src/pages/teachers/clubs/views/all-clubs/index.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import CategoryChips from '../../components/category-chips/index.jsx';
import ClubCard from '../../components/club-card/index.jsx';

export default function AllClubsView({
  clubs, category, setCategory, onOpen, onRequest, onCancelRequest,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const filtered =
    category === 'all' ? clubs : clubs.filter((c) => c.category === category);

  const handleRequest = (club) => {
    Alert.alert(
      'Request to patron',
      `Send a request to ${club.patron} to be added to ${club.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => onRequest?.(club) },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.tabBody}>
        <CategoryChips active={category} onChange={setCategory} />

        <Text style={styles.hint}>
          You cannot create a club. If you want to patron a new club, contact the
          Head of Co-curricular Activities.
        </Text>

        {filtered.map((c) => (
          <ClubCard
            key={c.id}
            club={c}
            onOpen={() => onOpen(c)}
            onRequest={handleRequest}
            onCancel={onCancelRequest}
          />
        ))}
      </View>
    </ScrollView>
  );
}