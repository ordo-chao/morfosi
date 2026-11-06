// clubs/components/ClubCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from '../../css.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ClubCard({ club, onOpen, onJoin, onCancel }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const isMember = club.memberStatus === 'member';
  const isPending = club.memberStatus === 'pending';
  const isFull = club.joinStatus === 'full';
  const needsApproval = club.joinStatus === 'approval';

  return (
    <View style={styles.clubCard}>
      <View style={styles.clubHeader}>
        <View style={styles.clubEmojiWrap}>
          <Text style={styles.clubEmoji}>{club.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubPatron}>
            Patron · {club.patron} · {club.members} members
          </Text>
          <Text style={styles.clubMeet}>{club.meet}</Text>
        </View>
      </View>

      {isMember && club.role ? (
        <View style={styles.statusRow}>
          <Text style={styles.statusRole}>{club.role}</Text>
        </View>
      ) : null}

      {isPending ? (
        <>
          <Text style={styles.pendingText}>Requested {club.requestedAt}</Text>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnText}>CANCEL REQUEST</Text>
          </TouchableOpacity>
        </>
      ) : isMember ? (
        <>
          {club.nextEvent ? (
            <Text style={styles.clubNext}>⏭ Next: {club.nextEvent}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.openBtn}
            onPress={onOpen}
            activeOpacity={0.7}
          >
            <Text style={styles.openBtnText}>OPEN</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.fg} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {needsApproval && (
            <Text style={styles.approvalNote}>⚠ Requires patron approval</Text>
          )}
          <TouchableOpacity
            style={[styles.joinBtn, isFull && styles.joinBtnDisabled]}
            onPress={isFull ? null : onJoin}
            disabled={isFull}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.joinBtnText, isFull && styles.joinBtnTextDisabled]}
            >
              {isFull ? 'FULL' : needsApproval ? 'REQUEST' : 'JOIN'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}