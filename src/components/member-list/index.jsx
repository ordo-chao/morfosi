// MemberList.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';
import MemberDetailSheet from './detail/index.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- defaults -------------------- */

const DEFAULT_TITLE = 'Members';

const DEFAULT_MEMBERS = [
  { id: '1', name: 'Amina Wanjiku',   role: 'Secretary', form: 'Form 3A', phone: '+254 712 345 678', email: 'amina.w@school.ac.ke' },
  { id: '2', name: 'James Otieno',    role: 'Chair',     form: 'Form 4B', phone: '+254 722 111 222', email: 'james.o@school.ac.ke' },
  { id: '3', name: 'Grace Njeri',     role: 'Treasurer', form: 'Form 3A', phone: '+254 733 444 555', email: 'grace.n@school.ac.ke' },
  { id: '4', name: 'Brian Kimani',    role: 'Member',    form: 'Form 3B', phone: '+254 744 555 666', email: 'brian.k@school.ac.ke' },
  { id: '5', name: 'Faith Mutua',     role: 'Member',    form: 'Form 4A', phone: '+254 755 666 777', email: 'faith.m@school.ac.ke' },
  { id: '6', name: 'Daniel Mwangi',   role: 'Member',    form: 'Form 2A', phone: '+254 766 777 888', email: 'daniel.m@school.ac.ke' },
  { id: '7', name: 'Cynthia Akinyi',  role: 'Member',    form: 'Form 3A', phone: '+254 777 888 999', email: 'cynthia.a@school.ac.ke' },
  { id: '8', name: 'George Wekesa',   role: 'Member',    form: 'Form 2B', phone: '+254 788 999 000', email: 'george.w@school.ac.ke' },
];

/* -------------------- helpers -------------------- */

function initials(name) {
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
      return '#e0a93a';
    default:
      return colors.fgMuted;
  }
}

/* -------------------- components -------------------- */

function MemberRow({ member, onPress, colors }) {
  const styles = makeStyles(colors);
  const tint = roleTint(member.role, colors);
  const isLeader = ['chair', 'chairperson', 'secretary', 'treasurer', 'patron', 'teacher']
    .includes((member.role || '').toLowerCase());

  return (
    <TouchableOpacity
      style={styles.memberRow}
      onPress={() => onPress?.(member)}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials(member.name)}</Text>
      </View>

      <View style={styles.memberBody}>
        <Text style={styles.memberName} numberOfLines={1}>
          {member.name}
          {member.isYou ? <Text style={styles.youTag}> (You)</Text> : null}
        </Text>
        <Text style={styles.memberMeta} numberOfLines={1}>
          {[member.role, member.form].filter(Boolean).join(' · ')}
        </Text>
      </View>

      {isLeader ? (
        <View style={[styles.rolePill, { borderColor: tint }]}>
          <Text style={[styles.rolePillText, { color: tint }]}>
            {member.role.toUpperCase()}
          </Text>
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
      )}
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function MemberList({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const params = route?.params ?? {};
  const title = params.title ?? DEFAULT_TITLE;
  const members = params.members ?? DEFAULT_MEMBERS;
  const isAdmin = Boolean(params.isAdmin);

  const [query, setQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.role?.toLowerCase().includes(q) ||
        m.form?.toLowerCase().includes(q)
    );
  }, [members, query]);

  const handleDownload = () => {
    Alert.alert(
      'Download list',
      `Generate a CSV of ${members.length} members and email it to you?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => {
            // Wire to real export — FileSystem + Share, or a backend endpoint
            Alert.alert('Export started', 'You will receive the file shortly.');
          },
        },
      ]
    );
  };

  const handleMemberPress = (member) => {
    setSelectedMember(member);
  };

  const handleMessage = (member) => {
    setSelectedMember(null);
    Alert.alert('Message', `Start a chat with ${member.name}?`);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title.toUpperCase()}
          </Text>
          {isAdmin ? (
            <TouchableOpacity onPress={handleDownload} hitSlop={8}>
              <Ionicons name="download-outline" size={20} color={colors.fg} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 22 }} />
          )}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ===== SUMMARY ===== */}
          <Text style={styles.countLabel}>
            {filtered.length} {filtered.length === 1 ? 'MEMBER' : 'MEMBERS'}
            {query ? ` · filtered from ${members.length}` : ''}
          </Text>

          {/* ===== SEARCH ===== */}
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={16} color={colors.fgMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, role, or class…"
              placeholderTextColor={colors.placeholder}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
                <Ionicons name="close-circle" size={16} color={colors.fgMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* ===== LIST ===== */}
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="people-outline" size={28} color={colors.fgFaint} />
              <Text style={styles.emptyText}>No members found</Text>
              <Text style={styles.emptySub}>
                Try a different name, role, or class.
              </Text>
            </View>
          ) : (
            <View style={styles.listBlock}>
              {filtered.map((m) => (
                <MemberRow
                  key={m.id}
                  member={m}
                  onPress={handleMemberPress}
                  colors={colors}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* ===== MEMBER DETAIL SHEET ===== */}
        <MemberDetailSheet
          visible={!!selectedMember}
          member={selectedMember}
          isAdmin={isAdmin}
          onClose={() => setSelectedMember(null)}
          onMessage={handleMessage}
        />
      </View>
    </Layout>
  );
}