// clubs/views/AllClubsView.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';
import CategoryChips from '../../components/category-chips/index.jsx';
import ClubCard from '../../components/club-card/index.jsx';

export default function AllClubsView({
  clubs, category, setCategory, onOpen, onJoin,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const filtered = category === 'all'
    ? clubs
    : clubs.filter((c) => c.category === category);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tabBody}>
        <CategoryChips active={category} onChange={setCategory} />
        {filtered.map((c) => (
          <ClubCard
            key={c.id}
            club={c}
            onOpen={() => onOpen(c)}
            onJoin={() => onJoin(c)}
            onCancel={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
}