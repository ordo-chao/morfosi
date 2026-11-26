// campus/views/dorms/index.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, Pressable, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../../theme/themeContext.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const DORM = {
  name: 'Kilimanjaro House',
  room: 'Room 14',
  bed: 'Bed 2',
  matron: 'Mrs. Kamau',
  phone: '+254 722 111 222',
  location: 'East Block · 2nd Floor',
  capacity: 24,
  occupied: 22,
  isBoarder: true,
  roommates: [
    { bed: 1, name: 'Grace Njeri', form: 'Form 3B' },
    { bed: 2, name: 'Amina Wanjiku', form: 'Form 3A', isYou: true },
    { bed: 3, name: 'Fatuma Ali', form: 'Form 3A' },
    { bed: 4, name: null },
  ],
  rules: [
    'Curfew: 9:30 PM on weekdays, 10:30 PM Fridays',
    'Quiet hours: 10 PM – 6 AM',
    'Visitors: common room only, until 8 PM',
    'No cooking appliances in rooms',
  ],
  announcements: [
    { id: 'a1', text: 'Water outage · Tomorrow 6 AM – 9 AM', when: '1d' },
    { id: 'a2', text: 'Dorm inspection · Friday 4 PM',        when: '3d' },
  ],
};

const CATEGORIES = [
  { key: 'maintenance', label: 'Maintenance',   sub: 'Broken light, tap, etc.' },
  { key: 'cleanliness', label: 'Cleanliness',   sub: null },
  { key: 'roommate',    label: 'Roommate issue', sub: null },
  { key: 'safety',      label: 'Safety concern', sub: null },
  { key: 'other',       label: 'Other',         sub: null },
];

/* -------------------- Report modal -------------------- */

function ReportSheet({ visible, onClose, colors }) {
  const styles = makeStyles(colors);
  const [category, setCategory] = useState('maintenance');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const canSubmit = description.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    Alert.alert('Report submitted', 'The matron will be notified.');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalSheet} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>REPORT AN ISSUE</Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons name="close" size={20} color={colors.fg} />
            </TouchableOpacity>
          </View>

          {/* Category */}
          <Text style={styles.fieldLabel}>CATEGORY</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setOpen((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownValue}>
              {CATEGORIES.find((c) => c.key === category)?.label}
            </Text>
            <Ionicons
              name={open ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={colors.fgMuted}
            />
          </TouchableOpacity>
          {open && (
            <View style={styles.dropdownMenu}>
              {CATEGORIES.map((c) => {
                const active = c.key === category;
                return (
                  <TouchableOpacity
                    key={c.key}
                    style={[
                      styles.dropdownItem,
                      active && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setCategory(c.key);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        active && styles.dropdownItemTextActive,
                      ]}
                    >
                      {c.label}
                    </Text>
                    {c.sub ? (
                      <Text style={styles.dropdownItemSub}>{c.sub}</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Description */}
          <Text style={styles.fieldLabel}>DESCRIBE THE ISSUE</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Describe what's wrong…"
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            style={styles.photoBtn}
            onPress={() => Alert.alert('Add photo', 'Coming soon')}
            activeOpacity={0.7}
          >
            <Ionicons name="camera-outline" size={14} color={colors.fg} />
            <Text style={styles.photoBtnText}>ADD PHOTO (OPTIONAL)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.submitBtnText,
                !canSubmit && styles.submitBtnTextDisabled,
              ]}
            >
              SUBMIT REPORT
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* -------------------- Dorms view -------------------- */

export default function DormsView({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors);

  const [reportVisible, setReportVisible] = useState(false);
  const [rulesExpanded, setRulesExpanded] = useState(false);

  const dorm = DORM;

  /* Day scholar state */
  if (!dorm.isBoarder) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 24 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🚌</Text>
          <Text style={styles.emptyTitle}>Day Scholar</Text>
          <Text style={styles.emptySub}>
            You're not assigned to a dorm. If you'd like to board, contact
            the school office or your class teacher.
          </Text>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Alert.alert('Contact', 'Opening school office details')}
            activeOpacity={0.7}
          >
            <Text style={styles.contactBtnText}>CONTACT SCHOOL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 24 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== HERO ===== */}
        <Text style={styles.sectionTitle}>MY DORM</Text>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>🏠</Text>
          </View>
          <Text style={styles.heroName}>{dorm.name}</Text>
          <Text style={styles.heroRoom}>
            {dorm.room} · {dorm.bed}
          </Text>

          <View style={styles.heroDivider} />

          <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>👩‍🏫</Text>
              <Text style={styles.infoLabel}>Matron</Text>
              <Text style={styles.infoValue}>{dorm.matron}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📞</Text>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>{dorm.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{dorm.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🛏</Text>
              <Text style={styles.infoLabel}>Capacity</Text>
              <Text style={styles.infoValue}>
                {dorm.capacity} beds · {dorm.occupied} occupied
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.reportBtn}
            onPress={() => setReportVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="alert-circle-outline" size={14} color={colors.fg} />
            <Text style={styles.reportBtnText}>REPORT AN ISSUE</Text>
          </TouchableOpacity>
        </View>

        {/* ===== ROOMMATES ===== */}
        <Text style={styles.sectionTitle}>MY ROOMMATES</Text>
        <View style={styles.roommatesBlock}>
          {dorm.roommates.map((r) => (
            <View key={r.bed} style={styles.roommateRow}>
              <Text style={styles.roommateBed}>BED {r.bed}</Text>
              {r.name ? (
                <>
                  <Text style={styles.roommateName}>
                    {r.name}
                    {r.isYou ? <Text style={styles.youTag}> (You)</Text> : null}
                  </Text>
                  <Text style={styles.roommateForm}>{r.form}</Text>
                </>
              ) : (
                <Text style={styles.roommateVacant}>Vacant</Text>
              )}
            </View>
          ))}
        </View>

        {/* ===== RULES ===== */}
        <Text style={styles.sectionTitle}>DORM RULES</Text>
        <View style={styles.rulesBlock}>
          {dorm.rules
            .slice(0, rulesExpanded ? dorm.rules.length : 2)
            .map((rule, i) => (
              <View key={i} style={styles.ruleRow}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          {dorm.rules.length > 2 && (
            <TouchableOpacity
              onPress={() => setRulesExpanded((v) => !v)}
              hitSlop={6}
            >
              <Text style={styles.expandLink}>
                {rulesExpanded ? 'SHOW LESS' : `SHOW ALL ${dorm.rules.length} RULES`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ===== ANNOUNCEMENTS ===== */}
        {dorm.announcements.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>ANNOUNCEMENTS</Text>
            <View style={styles.announcementsBlock}>
              {dorm.announcements.map((a) => (
                <View key={a.id} style={styles.announcementRow}>
                  <Text style={styles.announcementIcon}>📢</Text>
                  <Text style={styles.announcementText} numberOfLines={2}>
                    {a.text}
                  </Text>
                  <Text style={styles.announcementWhen}>{a.when}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <ReportSheet
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        colors={colors}
      />
    </>
  );
}