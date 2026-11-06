// clubs/detail/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../../theme/themeContext.jsx';
import Layout from '../../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

const BASE_CLUB = {
  id: 'c1',
  emoji: '🎭',
  name: 'Debate Club',
  category: 'academic',
  description:
    'Sharpen your public speaking, argumentation, and critical thinking. We compete in inter-school tournaments and host weekly debates.',
  patron: { name: 'Mrs. Wanjiru', subject: 'English' },
  meet: 'Thursdays · 4:00 PM',
  location: 'Room 12',
  members: 34,
  capacity: 40,
  founded: 2023,
  openTo: 'All forms',
  memberStatus: 'member',   // 'member' | 'pending' | 'none'
  role: 'Secretary',
  requestedAt: '24 Oct',
  events: [
    {
      id: 'e1', emoji: '🏆', title: 'Inter-school Debate',
      date: 'Sat 2 Nov', time: '9:00 AM', venue: 'Nairobi High',
      mandatory: true,
    },
    {
      id: 'e2', emoji: '📅', title: 'Weekly meeting',
      date: 'Thu 31 Oct', time: '4:00 PM', venue: 'Room 12',
    },
    {
      id: 'e3', emoji: '📅', title: 'Weekly meeting',
      date: 'Thu 7 Nov', time: '4:00 PM', venue: 'Room 12',
    },
  ],
  leadership: [
    { name: 'James Otieno',  role: 'Chair',     form: 'Form 4B' },
    { name: 'Amina Wanjiku', role: 'Secretary', form: 'Form 3A', isYou: true },
    { name: 'Grace Njeri',   role: 'Treasurer', form: 'Form 3A' },
  ],
  announcements: [
    { id: 'a1', text: 'Inter-school team announced',  time: '2d ago' },
    { id: 'a2', text: 'Debate motions for this week', time: '5d ago' },
  ],
};

/* -------------------- components -------------------- */

function StatusPill({ status, role, colors }) {
  const styles = makeStyles(colors);
  if (status === 'member') {
    return (
      <View style={styles.statusPillMember}>
        <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
        <Text style={styles.statusPillMemberText}>
          MEMBER{role ? ` · ${role.toUpperCase()}` : ''}
        </Text>
      </View>
    );
  }
  if (status === 'pending') {
    return (
      <View style={styles.statusPillPending}>
        <Ionicons name="hourglass-outline" size={14} color={colors.fgMuted} />
        <Text style={styles.statusPillPendingText}>PENDING APPROVAL</Text>
      </View>
    );
  }
  return null;
}

function DetailRow({ icon, label, value, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

function EventCard({ event, onAddToCalendar, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventEmoji}>{event.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventMeta}>
            {event.date} · {event.time} · {event.venue}
          </Text>
          {event.mandatory ? (
            <View style={styles.mandatoryPill}>
              <Text style={styles.mandatoryText}>🔴 MANDATORY</Text>
            </View>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={styles.calendarBtn}
        onPress={() => onAddToCalendar(event)}
        activeOpacity={0.7}
      >
        <Ionicons name="calendar-outline" size={14} color={colors.fg} />
        <Text style={styles.calendarBtnText}>ADD TO CALENDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

function LeaderRow({ leader, colors }) {
  const styles = makeStyles(colors);
  const icon =
    leader.role === 'Chair' ? '👑' :
    leader.role === 'Secretary' ? '🖊️' :
    leader.role === 'Treasurer' ? '💰' : '⭐';
  return (
    <View style={styles.leaderRow}>
      <Text style={styles.leaderIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.leaderName}>
          {leader.name}
          {leader.isYou ? <Text style={styles.youTag}> (You)</Text> : null}
        </Text>
        <Text style={styles.leaderMeta}>
          {leader.role} · {leader.form}
        </Text>
      </View>
    </View>
  );
}

function AnnouncementRow({ announcement, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.announcementRow}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.announcementIcon}>📢</Text>
      <Text style={styles.announcementText} numberOfLines={1}>
        {announcement.text}
      </Text>
      <Text style={styles.announcementTime}>{announcement.time}</Text>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

/* -------------------- screen -------------------- */

export default function ClubDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const club = useMemo(() => {
    const passed = route?.params?.club;
    return { ...BASE_CLUB, ...(passed ?? {}) };
  }, [route?.params?.club]);

  const [memberStatus, setMemberStatus] = useState(club.memberStatus);

  const isMember = memberStatus === 'member';
  const isPending = memberStatus === 'pending';
  const isFull = club.members >= club.capacity;

  const handleJoin = () => {
    Alert.alert(
      'Join club',
      `Join ${club.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Join',
          onPress: () => {
            setMemberStatus(club.joinStatus === 'approval' ? 'pending' : 'member');
          },
        },
      ]
    );
  };

  const handleLeave = () => {
    Alert.alert(
      'Leave club',
      `Leave ${club.name}? You can re-join later.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => setMemberStatus('none'),
        },
      ]
    );
  };

  const handleCancelRequest = () => {
    Alert.alert(
      'Cancel request',
      'Withdraw your request to join?',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Withdraw',
          style: 'destructive',
          onPress: () => setMemberStatus('none'),
        },
      ]
    );
  };

  const handleAddToCalendar = (event) => {
    Alert.alert('Added to calendar', `${event.title} · ${event.date}`);
  };

  const handleOpenAnnouncement = (announcement) => {
    Alert.alert('Announcement', announcement.text);
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
            {club.name}
          </Text>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== HERO ===== */}
          <View style={styles.hero}>
            <View style={styles.heroEmojiWrap}>
              <Text style={styles.heroEmoji}>{club.emoji}</Text>
            </View>
            <Text style={styles.heroName}>{club.name}</Text>
            <Text style={styles.heroMeta}>
              {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
              {' · '}
              {club.members} members
            </Text>

            {/* Member / pending pill */}
            {isMember || isPending ? (
              <StatusPill
                status={memberStatus}
                role={isMember ? club.role : null}
                colors={colors}
              />
            ) : null}
          </View>

          {/* ===== PENDING MESSAGE ===== */}
          {isPending && (
            <View style={styles.pendingCard}>
              <Text style={styles.pendingText}>
                Your request was sent to {club.patron.name} on {club.requestedAt}.
                You'll be notified when it's reviewed.
              </Text>
            </View>
          )}

          {/* ===== DESCRIPTION ===== */}
          {!isPending && (
            <Text style={styles.description}>{club.description}</Text>
          )}

          {/* ===== DETAILS ===== */}
          <Text style={styles.sectionTitle}>DETAILS</Text>
          <View style={styles.detailsBlock}>
            <DetailRow
              icon="👩‍🏫"
              label="Patron"
              value={
                club.patron.subject
                  ? `${club.patron.name} (${club.patron.subject})`
                  : club.patron.name
              }
              colors={colors}
            />
            <DetailRow icon="📅" label="Meets"    value={club.meet}                 colors={colors} />
            <DetailRow icon="📍" label="Location" value={club.location}             colors={colors} />
            <DetailRow icon="👥" label="Members"  value={`${club.members} / ${club.capacity}`} colors={colors} />
            <DetailRow icon="📆" label="Founded"  value={String(club.founded)}      colors={colors} />
            <DetailRow icon="🏫" label="Open to"  value={club.openTo}               colors={colors} />
          </View>

          {/* ===== UPCOMING EVENTS (member only) ===== */}
          {isMember && club.events.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>UPCOMING EVENTS</Text>
              {club.events.slice(0, 3).map((e) => (
                <EventCard
                  key={e.id}
                  event={e}
                  onAddToCalendar={handleAddToCalendar}
                  colors={colors}
                />
              ))}
              {club.events.length > 3 && (
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={() =>
                    navigation?.navigate('Student-ClubEvents', { clubId: club.id })
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.linkButtonText}>SEE ALL EVENTS →</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {/* ===== NON-MEMBER: single next event ===== */}
          {!isMember && !isPending && club.events.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>UPCOMING EVENTS</Text>
              <View style={styles.detailsBlock}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailValue}>
                    {club.events[0].title} · {club.events[0].date} · {club.events[0].time}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* ===== LEADERSHIP ===== */}
          {club.leadership.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>LEADERSHIP</Text>
              <View style={styles.leadershipBlock}>
                {club.leadership.map((l, i) => (
                  <LeaderRow key={i} leader={l} colors={colors} />
                ))}
              </View>
            </>
          )}

          {/* ===== MEMBERS (member only) ===== */}
          {isMember && (
            <>
              <Text style={styles.sectionTitle}>MEMBERS ({club.members})</Text>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  navigation?.navigate('Student-ClubMembers', { clubId: club.id })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.linkButtonText}>VIEW ALL MEMBERS →</Text>
              </TouchableOpacity>
            </>
          )}

          {/* ===== ANNOUNCEMENTS (member only) ===== */}
          {isMember && club.announcements.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>RECENT ANNOUNCEMENTS</Text>
              <View style={styles.announcementsBlock}>
                {club.announcements.map((a) => (
                  <AnnouncementRow
                    key={a.id}
                    announcement={a}
                    onPress={() => handleOpenAnnouncement(a)}
                    colors={colors}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  navigation?.navigate('Student-ClubAnnouncements', { clubId: club.id })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.linkButtonText}>SEE ALL ANNOUNCEMENTS →</Text>
              </TouchableOpacity>
            </>
          )}

          {/* ===== ACTION AREA ===== */}
          <View style={styles.actions}>
            {isMember && (
              <TouchableOpacity
                style={styles.leaveBtn}
                onPress={handleLeave}
                activeOpacity={0.7}
              >
                <Ionicons name="exit-outline" size={16} color="#e25b5b" />
                <Text style={styles.leaveBtnText}>LEAVE CLUB</Text>
              </TouchableOpacity>
            )}

            {isPending && (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={handleCancelRequest}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>CANCEL REQUEST</Text>
              </TouchableOpacity>
            )}

            {!isMember && !isPending && !isFull && (
              <TouchableOpacity
                style={styles.joinBtn}
                onPress={handleJoin}
                activeOpacity={0.7}
              >
                <Ionicons name="rocket-outline" size={16} color={colors.buttonFg} />
                <Text style={styles.joinBtnText}>
                  {club.joinStatus === 'approval' ? 'REQUEST TO JOIN' : 'JOIN CLUB'}
                </Text>
              </TouchableOpacity>
            )}

            {!isMember && !isPending && isFull && (
              <View style={styles.fullCard}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.fgMuted} />
                <Text style={styles.fullText}>
                  Club is full ({club.members} / {club.capacity} members)
                </Text>
                <TouchableOpacity
                  style={styles.waitlistBtn}
                  onPress={() => Alert.alert('Waitlist', 'You have been added to the waitlist.')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.waitlistBtnText}>JOIN WAITLIST</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}