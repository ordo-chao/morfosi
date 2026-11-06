// components/MemberDetailSheet.jsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- helpers -------------------- */

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function roleTint(role, colors) {
  switch ((role || '').toLowerCase()) {
    case 'chair':
    case 'chairperson':
      return colors.accent;
    case 'secretary':
      return '#4d7cff';
    case 'treasurer':
      return '#4caf7d';
    case 'patron':
    case 'teacher':
    case 'class teacher':
      return '#e0a93a';
    default:
      return colors.fgMuted;
  }
}

function resolveType(member) {
  if (!member) return 'student';
  if (member.type === 'teacher' || member.type === 'staff') return 'teacher';
  if (member.type === 'student') return 'student';
  // Infer if not provided
  const role = (member.role || '').toLowerCase();
  if (['teacher', 'patron', 'class teacher', 'head', 'principal'].includes(role)) {
    return 'teacher';
  }
  if (member.form || member.admNo || member.admissionNo) return 'student';
  if (member.subject || member.department) return 'teacher';
  return 'student';
}

/* -------------------- row -------------------- */

function InfoRow({ icon, label, value, onPress, colors }) {
  const styles = makeStyles(colors);
  const inner = (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={14} color={colors.fgMuted} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value || '—'}
      </Text>
      {onPress ? (
        <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
      ) : null}
    </View>
  );

  if (!onPress) return inner;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {inner}
    </TouchableOpacity>
  );
}

/* -------------------- student / teacher sections -------------------- */

function StudentSection({ member, colors }) {
  const styles = makeStyles(colors);
  return (
    <>
      <Text style={styles.sectionTitle}>STUDENT INFO</Text>
      <View style={styles.infoBlock}>
        <InfoRow icon="school-outline"  label="Class"   value={member.form}         colors={colors} />
        <InfoRow icon="id-card-outline" label="Adm No"  value={member.admNo || member.admissionNo} colors={colors} />
        <InfoRow icon="bed-outline"     label="Dorm"    value={member.dorm}         colors={colors} />
        <InfoRow icon="people-outline"  label="House"   value={member.house}        colors={colors} />
      </View>

      <Text style={styles.sectionTitle}>CONTACT</Text>
      <View style={styles.infoBlock}>
        <InfoRow
          icon="mail-outline"
          label="Email"
          value={member.email}
          onPress={member.email ? () => Linking.openURL(`mailto:${member.email}`) : undefined}
          colors={colors}
        />
        <InfoRow
          icon="call-outline"
          label="Phone"
          value={member.phone}
          onPress={member.phone ? () => Linking.openURL(`tel:${member.phone.replace(/\s+/g, '')}`) : undefined}
          colors={colors}
        />
      </View>
    </>
  );
}

function TeacherSection({ member, colors }) {
  const styles = makeStyles(colors);
  return (
    <>
      <Text style={styles.sectionTitle}>STAFF INFO</Text>
      <View style={styles.infoBlock}>
        <InfoRow icon="briefcase-outline" label="Role"       value={member.role}       colors={colors} />
        <InfoRow icon="book-outline"      label="Subject"    value={member.subject}    colors={colors} />
        <InfoRow icon="albums-outline"    label="Department" value={member.department} colors={colors} />
        <InfoRow icon="calendar-outline"  label="Joined"     value={member.joined}     colors={colors} />
      </View>

      <Text style={styles.sectionTitle}>CONTACT</Text>
      <View style={styles.infoBlock}>
        <InfoRow
          icon="mail-outline"
          label="Email"
          value={member.email}
          onPress={member.email ? () => Linking.openURL(`mailto:${member.email}`) : undefined}
          colors={colors}
        />
        <InfoRow
          icon="call-outline"
          label="Phone"
          value={member.phone}
          onPress={member.phone ? () => Linking.openURL(`tel:${member.phone.replace(/\s+/g, '')}`) : undefined}
          colors={colors}
        />
      </View>
    </>
  );
}

/* -------------------- main sheet -------------------- */

export default function MemberDetailSheet({
  visible,
  member,
  onClose,
  isAdmin = false,
  onMessage,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const type = useMemo(() => resolveType(member), [member]);
  const tint = member ? roleTint(member.role, colors) : colors.fgMuted;

  if (!member) return null;

  const displayName = member.name || 'Unknown';
  const displayRole = member.role || (type === 'teacher' ? 'Teacher' : 'Student');

  const handleMessage = () => {
    if (onMessage) {
      onMessage(member);
      return;
    }
    Alert.alert('Message', `Start a chat with ${displayName}?`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials(displayName)}</Text>
            </View>
            <Text style={styles.heroName}>
              {displayName}
              {member.isYou ? <Text style={styles.youTag}> (You)</Text> : null}
            </Text>
            <View style={[styles.rolePill, { borderColor: tint }]}>
              <Text style={[styles.rolePillText, { color: tint }]}>
                {displayRole.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.typeLabel}>
              {type === 'teacher' ? 'STAFF' : 'STUDENT'}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Scrollable content */}
          <ScrollView
            style={{ maxHeight: 380 }}
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
          >
            {type === 'teacher' ? (
              <TeacherSection member={member} colors={colors} />
            ) : (
              <StudentSection member={member} colors={colors} />
            )}

            {member.bio ? (
              <>
                <Text style={styles.sectionTitle}>ABOUT</Text>
                <Text style={styles.bioText}>{member.bio}</Text>
              </>
            ) : null}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            {isAdmin ? (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleMessage}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={16}
                  color={colors.buttonFg}
                />
                <Text style={styles.primaryBtnText}>SEND MESSAGE</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}