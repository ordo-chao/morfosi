// src/pages/teachers/clubs/manage/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

/* -------------------- sample data -------------------- */

const BASE_CLUB = {
  id: 'c1',
  emoji: '🎭',
  name: 'Debate Club',
  category: 'academic',
  description:
    'Sharpen your public speaking, argumentation, and critical thinking. We compete in inter-school tournaments and host weekly debates.',
  meetDay: 'Thursday',
  meetTime: '4:00 PM',
  location: 'Room 12',
  members: 34,
  capacity: 40,
  openTo: 'All forms',
  joinPolicy: 'approval',      // 'open' | 'approval' | 'invite-only'
  autoApproveReturning: true,
  pinnedAnnouncementId: 'a1',
  founded: 2023,
};

const BASE_REQUESTS = [
  { id: 'r1', name: 'Faith Mutua',   form: 'Form 4A', reason: 'Debate experience in middle school', requestedAt: '2d ago' },
  { id: 'r2', name: 'Daniel Mwangi', form: 'Form 2A', reason: 'Interested in public speaking',      requestedAt: '3d ago' },
  { id: 'r3', name: 'Cynthia Akinyi',form: 'Form 3A', reason: '',                                    requestedAt: '5d ago' },
  { id: 'r4', name: 'George Wekesa', form: 'Form 2B', reason: 'Friend recommended it',               requestedAt: '1w ago' },
];

const BASE_MEMBERS = [
  { id: 'm1', name: 'James Otieno',   role: 'Chair',     form: 'Form 4B', attendance: 0.96 },
  { id: 'm2', name: 'Amina Wanjiku',  role: 'Secretary', form: 'Form 3A', attendance: 0.98 },
  { id: 'm3', name: 'Grace Njeri',    role: 'Treasurer', form: 'Form 3A', attendance: 0.94 },
  { id: 'm4', name: 'Brian Kimani',   role: 'Member',    form: 'Form 3B', attendance: 0.82 },
  { id: 'm5', name: 'Peter Njoroge',  role: 'Member',    form: 'Form 3A', attendance: 0.90 },
  { id: 'm6', name: 'Lucy Achieng',   role: 'Member',    form: 'Form 2A', attendance: 0.85 },
];

const ROLES = ['Member', 'Chair', 'Secretary', 'Treasurer'];

/* -------------------- small components -------------------- */

function Section({ title, hint, action, onAction, children, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action ? (
          <TouchableOpacity onPress={onAction} hitSlop={6}>
            <Text style={styles.sectionAction}>{action}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
      {children}
    </View>
  );
}

function Field({ label, value, onChangeText, colors, keyboardType, multiline, locked, hint }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline, locked && styles.inputLocked]}
        value={value}
        onChangeText={onChangeText}
        editable={!locked}
        keyboardType={keyboardType}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {hint ? <Text style={styles.fieldHint}>{hint}</Text> : null}
    </View>
  );
}

function SelectRow({ label, value, options, onChange, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.selectRow}>
      <Text style={styles.selectLabel}>{label}</Text>
      <View style={styles.selectOptions}>
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.selectChip, active && styles.selectChipActive]}
              onPress={() => onChange(opt.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectText, active && styles.selectTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function RequestRow({ req, onApprove, onDecline, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.requestRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {req.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.memberName} numberOfLines={1}>{req.name}</Text>
        <Text style={styles.memberMeta} numberOfLines={1}>
          {req.form} · {req.requestedAt}
        </Text>
        {req.reason ? (
          <Text style={styles.reasonText} numberOfLines={2}>“{req.reason}”</Text>
        ) : null}
      </View>
      <TouchableOpacity style={styles.acceptBtn} onPress={() => onApprove(req)} hitSlop={6}>
        <Feather name="check" size={14} color="#4caf7d" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.declineBtn} onPress={() => onDecline(req)} hitSlop={6}>
        <Feather name="x" size={14} color="#e25b5b" />
      </TouchableOpacity>
    </View>
  );
}

function MemberRow({ member, onSetRole, onRemove, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.memberRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {member.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.memberName} numberOfLines={1}>{member.name}</Text>
        <Text style={styles.memberMeta} numberOfLines={1}>
          {member.form} · Attendance {Math.round(member.attendance * 100)}%
        </Text>
        <View style={styles.rolePillRow}>
          <View style={styles.rolePill}>
            <Text style={styles.rolePillText}>{member.role.toUpperCase()}</Text>
          </View>
          <TouchableOpacity onPress={() => onSetRole(member)} hitSlop={6}>
            <Text style={styles.roleChange}>CHANGE ROLE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove(member)} hitSlop={6}>
        <Feather name="trash-2" size={14} color={colors.fgMuted} />
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClubManage({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const initial = useMemo(() => {
    const passed = route?.params?.club;
    return { ...BASE_CLUB, ...(passed ?? {}) };
  }, [route?.params?.club]);

  const [name, setName]                     = useState(initial.name);
  const [emoji, setEmoji]                   = useState(initial.emoji);
  const [description, setDescription]       = useState(initial.description);
  const [meetDay, setMeetDay]               = useState(initial.meetDay);
  const [meetTime, setMeetTime]             = useState(initial.meetTime);
  const [location, setLocation]             = useState(initial.location);
  const [capacity, setCapacity]             = useState(String(initial.capacity));
  const [openTo, setOpenTo]                 = useState(initial.openTo);
  const [joinPolicy, setJoinPolicy]         = useState(initial.joinPolicy);
  const [autoApproveReturning, setAutoApproveReturning] = useState(initial.autoApproveReturning);

  const [requests, setRequests] = useState(BASE_REQUESTS);
  const [members, setMembers]   = useState(BASE_MEMBERS);

  const dirty = useMemo(() => (
    name !== initial.name ||
    emoji !== initial.emoji ||
    description !== initial.description ||
    meetDay !== initial.meetDay ||
    meetTime !== initial.meetTime ||
    location !== initial.location ||
    capacity !== String(initial.capacity) ||
    openTo !== initial.openTo ||
    joinPolicy !== initial.joinPolicy ||
    autoApproveReturning !== initial.autoApproveReturning
  ), [name, emoji, description, meetDay, meetTime, location, capacity, openTo, joinPolicy, autoApproveReturning, initial]);

  const onSave = () => {
    // TODO: PATCH /api/teacher/clubs/:id
    Alert.alert('Saved', 'Club settings updated.', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ]);
  };

  const onCancel = () => {
    if (!dirty) { navigation?.goBack(); return; }
    Alert.alert('Discard changes?', 'Your edits will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: () => navigation?.goBack() },
    ]);
  };

  const approveRequest = (req) => {
    setRequests((list) => list.filter((r) => r.id !== req.id));
    setMembers((list) => [
      ...list,
      { id: `m-${req.id}`, name: req.name, role: 'Member', form: req.form, attendance: 0 },
    ]);
  };

  const declineRequest = (req) => {
    Alert.alert('Decline request?', `${req.name}'s request will be declined.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => setRequests((list) => list.filter((r) => r.id !== req.id)),
      },
    ]);
  };

  const setRole = (member) => {
    Alert.alert(
      `Change role for ${member.name}`,
      'Select the new role.',
      ROLES.map((r) => ({
        text: r,
        onPress: () =>
          setMembers((list) =>
            list.map((m) => (m.id === member.id ? { ...m, role: r } : m))
          ),
      })).concat([{ text: 'Cancel', style: 'cancel' }])
    );
  };

  const removeMember = (member) => {
    Alert.alert(
      `Remove ${member.name}?`,
      'They can request to re-join later.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setMembers((list) => list.filter((m) => m.id !== member.id)),
        },
      ]
    );
  };

  const postAnnouncement = () => {
    navigation?.navigate('Teacher-Club-Announcement-Create', { clubId: initial.id });
  };

  const archiveClub = () => {
    Alert.alert(
      'Archive club',
      'The club will be hidden from students and become read-only. This can be reversed by an admin.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          style: 'destructive',
          onPress: () => Alert.alert('Archived', 'Club moved to archives.'),
        },
      ]
    );
  };

  const transferPatronage = () => {
    Alert.alert(
      'Transfer patronage',
      'Send a request to the Head of Co-curricular Activities to assign a new patron.',
      [{ text: 'OK' }]
    );
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} hitSlop={8}>
            <Ionicons name="close" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MANAGE CLUB</Text>
          <TouchableOpacity onPress={onSave} disabled={!dirty} hitSlop={8}>
            <Text style={[styles.headerAction, !dirty && { opacity: 0.4 }]}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* IDENTITY */}
          <Section title="IDENTITY" colors={colors}>
            <View style={styles.emojiRow}>
              <TextInput
                style={styles.emojiInput}
                value={emoji}
                onChangeText={setEmoji}
                maxLength={2}
              />
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Club name"
                  placeholderTextColor={colors.placeholder}
                />
              </View>
            </View>
            <Field
              label="DESCRIPTION"
              value={description}
              onChangeText={setDescription}
              multiline
              colors={colors}
              hint="Shown to students browsing clubs"
            />
          </Section>

          {/* MEETING */}
          <Section title="MEETING" colors={colors}>
            <Field label="DAY"      value={meetDay}  onChangeText={setMeetDay}  colors={colors} />
            <Field label="TIME"     value={meetTime} onChangeText={setMeetTime} colors={colors} />
            <Field label="LOCATION" value={location} onChangeText={setLocation} colors={colors} />
            <Field
              label="CAPACITY"
              value={capacity}
              onChangeText={(v) => setCapacity(v.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              colors={colors}
              hint="Maximum members allowed"
            />
            <Field
              label="OPEN TO"
              value={openTo}
              onChangeText={setOpenTo}
              colors={colors}
              hint="e.g. All forms, Form 3+, Seniors only"
            />
          </Section>

          {/* MEMBERSHIP */}
          <Section title="MEMBERSHIP" colors={colors}>
            <SelectRow
              label="JOIN POLICY"
              value={joinPolicy}
              onChange={setJoinPolicy}
              options={[
                { key: 'open',        label: 'OPEN' },
                { key: 'approval',    label: 'APPROVAL' },
                { key: 'invite-only', label: 'INVITE ONLY' },
              ]}
              colors={colors}
            />
            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Auto-approve returning members</Text>
                <Text style={styles.switchHint}>
                  Students who left and re-apply are approved automatically
                </Text>
              </View>
              <Switch
                value={autoApproveReturning}
                onValueChange={setAutoApproveReturning}
                trackColor={{ false: colors.border, true: colors.accent }}
                thumbColor="#fff"
              />
            </View>
          </Section>

          {/* JOIN REQUESTS */}
          <Section
            title={`JOIN REQUESTS (${requests.length})`}
            hint={requests.length === 0 ? 'No pending requests' : undefined}
            colors={colors}
          >
            <View style={styles.listBlock}>
              {requests.length === 0 ? (
                <View style={styles.emptyList}>
                  <Text style={styles.emptyListText}>All caught up</Text>
                </View>
              ) : (
                requests.map((r) => (
                  <RequestRow
                    key={r.id}
                    req={r}
                    onApprove={approveRequest}
                    onDecline={declineRequest}
                    colors={colors}
                  />
                ))
              )}
            </View>
          </Section>

          {/* ROSTER */}
          <Section
            title={`ROSTER (${members.length}/${capacity || '—'})`}
            action="ADD MEMBER"
            onAction={() =>
              Alert.alert('Add member', 'Pick a student from the school directory.')
            }
            colors={colors}
          >
            <View style={styles.listBlock}>
              {members.map((m) => (
                <MemberRow
                  key={m.id}
                  member={m}
                  onSetRole={setRole}
                  onRemove={removeMember}
                  colors={colors}
                />
              ))}
            </View>
          </Section>

          {/* ANNOUNCEMENTS */}
          <Section
            title="ANNOUNCEMENTS"
            action="+ POST"
            onAction={postAnnouncement}
            hint="Posts are visible to all members and pinned in the club detail"
            colors={colors}
          >
            <View style={styles.listBlock}>
              <TouchableOpacity style={styles.quickRow} onPress={postAnnouncement} activeOpacity={0.7}>
                <Ionicons name="megaphone-outline" size={16} color={colors.accent} />
                <Text style={styles.quickRowText}>Compose new announcement</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            </View>
          </Section>

          {/* ATTENDANCE SHORTCUT */}
          <Section title="ATTENDANCE" colors={colors}>
            <View style={styles.listBlock}>
              <TouchableOpacity
                style={styles.quickRow}
                onPress={() =>
                  navigation?.navigate('Teacher-Club-Attendance', { clubId: initial.id })
                }
                activeOpacity={0.7}
              >
                <Ionicons name="checkbox-outline" size={16} color={colors.accent} />
                <Text style={styles.quickRowText}>Mark this week's meeting</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            </View>
          </Section>

          {/* DANGER ZONE */}
          <Section title="DANGER ZONE" colors={colors}>
            <View style={styles.dangerBlock}>
              <TouchableOpacity style={styles.dangerRow} onPress={transferPatronage} activeOpacity={0.7}>
                <Ionicons name="swap-horizontal-outline" size={16} color={colors.fg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.dangerLabel}>Transfer patronage</Text>
                  <Text style={styles.dangerHint}>
                    Request the Head of Co-curricular Activities to reassign patronage
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.dangerRow} onPress={archiveClub} activeOpacity={0.7}>
                <Ionicons name="archive-outline" size={16} color="#e25b5b" />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.dangerLabel, { color: '#e25b5b' }]}>Archive club</Text>
                  <Text style={styles.dangerHint}>
                    Hide from students; club becomes read-only
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
              </TouchableOpacity>
            </View>
          </Section>

          {/* SAVE BAR */}
          {dirty && (
            <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.7}>
              <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}