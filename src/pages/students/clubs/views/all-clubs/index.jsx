// clubs/views/all-clubs-view/index.jsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';

import CategoryChips from '../../components/category-chips/index.jsx';
import ClubCard from '../../components/club-card/index.jsx';
import JoinRequestSheet from '../../components/join-request-sheet/index.jsx';

export default function AllClubsView({
  clubs,
  category,
  setCategory,
  onOpen,
  onJoin,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [joinTarget, setJoinTarget] = useState(null);

  const filtered =
    category === 'all' ? clubs : clubs.filter((c) => c.category === category);

  const handleSheetSubmit = ({ clubId, needsApproval, reason }) => {
    setJoinTarget(null);
    onJoin?.({ clubId, needsApproval, reason });
  };

  return (
    <>
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
              onJoin={() => setJoinTarget(c)}
              onCancel={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      <JoinRequestSheet
        visible={!!joinTarget}
        club={joinTarget}
        onClose={() => setJoinTarget(null)}
        onSubmit={handleSheetSubmit}
      />
    </>
  );
}