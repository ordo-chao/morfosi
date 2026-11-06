// clubs/components/join-request-sheet/index.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { makeStyles } from './css.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

const MAX_REASON = 500;

export default function JoinRequestSheet({
  visible,
  club,
  onClose,
  onSubmit,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const needsApproval = club?.joinStatus === 'approval';

  const [reason, setReason] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Reset state every time the sheet opens with a new club
  useEffect(() => {
    if (visible) {
      setReason('');
      setAgreed(false);
    }
  }, [visible, club?.id]);

  const canSubmit = useMemo(() => {
    if (needsApproval) return agreed; // approval requires the checkbox
    return true;                     // instant join is always allowed
  }, [needsApproval, agreed]);

  if (!club) return null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      clubId: club.id,
      needsApproval,
      reason: needsApproval ? reason.trim() : undefined,
      agreed,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.title} numberOfLines={2}>
                {needsApproval
                  ? `Request to join: ${club.name}`
                  : `Join ${club.name}?`}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={8}
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={20} color={colors.fg} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ maxHeight: 460 }}
              contentContainerStyle={styles.body}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* ===== INSTANT JOIN ===== */}
              {!needsApproval && (
                <>
                  <Text style={styles.subtitle}>
                    You'll become a member immediately.
                  </Text>
                  <View style={styles.infoBlock}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoIcon}>📅</Text>
                      <Text style={styles.infoValue} numberOfLines={2}>
                        {club.meet}
                        {club.location ? ` · ${club.location}` : ''}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {/* ===== APPROVAL FLOW ===== */}
              {needsApproval && (
                <>
                  {/* Reason */}
                  <Text style={styles.label}>Why do you want to join? (optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tell the patron why you'd like to join…"
                    placeholderTextColor={colors.placeholder}
                    value={reason}
                    onChangeText={(t) => setReason(t.slice(0, MAX_REASON))}
                    multiline
                    textAlignVertical="top"
                    maxLength={MAX_REASON}
                  />
                  <Text style={styles.counter}>
                    {reason.length} / {MAX_REASON} characters
                  </Text>

                  {/* Agreement checkbox */}
                  <TouchableOpacity
                    style={styles.checkRow}
                    onPress={() => setAgreed((v) => !v)}
                    activeOpacity={0.7}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: agreed }}
                  >
                    <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
                      {agreed ? (
                        <Ionicons
                          name="checkmark"
                          size={12}
                          color={colors.accentContrast}
                        />
                      ) : null}
                    </View>
                    <Text style={styles.checkLabel}>
                      I understand that membership requires meeting attendance
                      and participation in competitions.
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.divider} />

                  {/* Patron */}
                  <Text style={styles.label}>Your request will go to:</Text>
                  <View style={styles.patronRow}>
                    <Text style={styles.patronIcon}>👩‍🏫</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.patronName}>
                        {club.patron?.name ?? 'Club Patron'}
                      </Text>
                      <Text style={styles.patronRole}>Patron</Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

            {/* Actions */}
            <View style={styles.actions}>
              {needsApproval ? (
                <TouchableOpacity
                  style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.primaryBtnText,
                      !canSubmit && styles.primaryBtnTextDisabled,
                    ]}
                  >
                    SEND REQUEST
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.dualRow}>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.secondaryBtnText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.primaryBtnText}>JOIN CLUB</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}