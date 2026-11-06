// clubs/views/MyClubsView.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';
import ClubCard from '../../components/club-card/index.jsx';

export default function MyClubsView({ clubs, onOpen, onCancel, onBrowse }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const myClubs = clubs.filter(
    (c) => c.memberStatus === 'member' || c.memberStatus === 'pending'
  );

  if (myClubs.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.empty}>
          <View style={styles.emptyEmojiWrap}>
            <Text style={styles.emptyEmoji}>🎭</Text>
          </View>
          <Text style={styles.emptyTitle}>No clubs joined yet</Text>
          <Text style={styles.emptySub}>
            Clubs are a great way to meet people, learn new skills, and stand
            out on applications.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={onBrowse}
            activeOpacity={0.7}
          >
            <Text style={styles.linkButtonText}>BROWSE ALL CLUBS →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const members = myClubs.filter((c) => c.memberStatus === 'member');
  const pending = myClubs.filter((c) => c.memberStatus === 'pending');

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tabBody}>
        {members.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              MY CLUBS ({members.length})
            </Text>
            {members.map((c) => (
              <ClubCard
                key={c.id}
                club={c}
                onOpen={() => onOpen(c)}
                onJoin={() => {}}
                onCancel={() => {}}
              />
            ))}
          </>
        )}

        {pending.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              PENDING ({pending.length})
            </Text>
            {pending.map((c) => (
              <ClubCard
                key={c.id}
                club={c}
                onOpen={() => onOpen(c)}
                onJoin={() => {}}
                onCancel={() => onCancel(c)}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}