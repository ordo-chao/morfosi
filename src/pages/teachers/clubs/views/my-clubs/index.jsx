// src/pages/teachers/clubs/views/my-clubs/index.jsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import ClubCard from '../../components/club-card/index.jsx';

export default function MyClubsView({ clubs, onOpen, onCancel, onBrowse, onManage }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const patroned = clubs.filter((c) => c.role === 'Patron');
  const pendingRequests = clubs.filter((c) => c.requestStatus === 'pending');

  if (patroned.length === 0 && pendingRequests.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.empty}>
          <View style={styles.emptyEmojiWrap}>
            <Text style={styles.emptyEmoji}>🎭</Text>
          </View>
          <Text style={styles.emptyTitle}>You're not a patron yet</Text>
          <Text style={styles.emptySub}>
            Ask a Head of Department to assign you as patron of a club. You can
            then manage members, events and attendance from here.
          </Text>
          <TouchableOpacity style={styles.linkButton} onPress={onBrowse} activeOpacity={0.7}>
            <Text style={styles.linkButtonText}>BROWSE CLUBS →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.tabBody}>
        {patroned.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>CLUBS I PATRON ({patroned.length})</Text>
            {patroned.map((c) => (
              <ClubCard
                key={c.id}
                club={c}
                onOpen={() => onOpen(c)}
                onRequest={() => {}}
                onCancel={() => {}}
                onManage={() => onManage?.(c)}
              />
            ))}
          </>
        )}

        {pendingRequests.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PENDING REQUESTS ({pendingRequests.length})</Text>
            {pendingRequests.map((c) => (
              <ClubCard
                key={c.id}
                club={c}
                onOpen={() => onOpen(c)}
                onRequest={() => {}}
                onCancel={() => onCancel(c)}
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}