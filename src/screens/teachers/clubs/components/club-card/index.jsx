// src/pages/teachers/clubs/components/club-card/index.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ClubCard({ club, onOpen, onRequest, onCancel, onManage }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const isPatron = club.role === 'Patron';
  const isPending = club.requestStatus === 'pending';
  const isFull = club.joinStatus === 'full';

  return (
    <TouchableOpacity style={styles.card} onPress={onOpen} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{club.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{club.name}</Text>
            {isPatron && (
              <View style={styles.patronPill}>
                <Text style={styles.patronPillText}>PATRON</Text>
              </View>
            )}
          </View>
          <Text style={styles.meta} numberOfLines={1}>
            {club.patron} · {club.meet}
          </Text>
          <Text style={styles.stats} numberOfLines={1}>
            {club.members}{club.capacity ? `/${club.capacity}` : ''} members
            {club.nextEvent ? ` · ${club.nextEvent}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        {isPatron ? (
          <TouchableOpacity style={styles.btn} onPress={() => onManage?.(club)}>
            <Ionicons name="settings-outline" size={12} color={colors.accent} />
            <Text style={[styles.btnText, { color: colors.accent }]}>MANAGE</Text>
          </TouchableOpacity>
        ) : isPending ? (
          <TouchableOpacity style={styles.btn} onPress={() => onCancel?.(club)}>
            <Ionicons name="close-circle-outline" size={12} color="#e0a93a" />
            <Text style={[styles.btnText, { color: '#e0a93a' }]}>CANCEL REQUEST</Text>
          </TouchableOpacity>
        ) : isFull ? (
          <View style={styles.btnDisabled}>
            <Text style={styles.btnDisabledText}>CLUB FULL</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => onRequest?.(club)}>
            <Ionicons name="person-add-outline" size={12} color={colors.accent} />
            <Text style={[styles.btnText, { color: colors.accent }]}>
              REQUEST TO PATRON
            </Text>
          </TouchableOpacity>
        )}
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      </View>
    </TouchableOpacity>
  );
}