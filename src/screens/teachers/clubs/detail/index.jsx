// src/pages/teachers/clubs/detail/index.jsx
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

  // Teacher-specific
  isPatron: true,                 // flip to false to test the request flow
  requestStatus: null,            // 'pending' | null (only relevant when !isPatron)
  requestedAt: '2 days ago',

  health: 'healthy',              // 'healthy' | 'low-members' | 'inactive'
  pendingRequests: 4,             // join requests awaiting approval
  avgAttendance: 0.88,

  events: [
    {
      id: 'e1', emoji: '🏆', title: 'Inter-school Debate',
      date: 'Sat 2 Nov', time: '9:00 AM', venue: 'Nairobi High',
      mandatory: true, owned: true, rsvps: 22,
    },
    {
      id: 'e2', emoji: '📅', title: 'Weekly meeting',
      date: 'Thu 31 Oct', time: '4:00 PM', venue: 'Room 12',
      owned: true, rsvps: 18,
    },
    {
      id: 'e3', emoji: '📅', title: 'Weekly meeting',
      date: 'Thu 7 Nov', time: '4:00 PM', venue: 'Room 12',
      owned: true, rsvps: 0,
    },
  ],
  leadership: [
    { id: 'l1', name: 'James Otieno',  role: 'Chair',     form: 'Form 4B' },
    { id: 'l2', name: 'Amina Wanjiku', role: 'Secretary', form: 'Form 3A' },
    { id: 'l3', name: 'Grace Njeri',   role: 'Treasurer', form: 'Form 3A' },
  ],
  memberList: [
    { id: 'm1', name: 'James Otieno',   role: 'Chair',     form: 'Form 4B', attendance: 0.96, atRisk: false },
    { id: 'm2', name: 'Amina Wanjiku',  role: 'Secretary', form: 'Form 3A', attendance: 0.98, atRisk: false },
    { id: 'm3', name: 'Grace Njeri',    role: 'Treasurer', form: 'Form 3A', attendance: 0.94, atRisk: false },
    { id: 'm4', name: 'Brian Kimani',   role: 'Member',    form: 'Form 3B', attendance: 0.82, atRisk: true  },
    { id: 'm5', name: 'Faith Mutua',    role: 'Member',    form: 'Form 4A', attendance: 0.90, atRisk: false },
    { id: 'm6', name: 'Daniel Mwangi',  role: 'Member',    form: 'Form 2A', attendance: 0.68, atRisk: true  },
    { id: 'm7', name: 'Cynthia Akinyi', role: 'Member',    form: 'Form 3A', attendance: 0.85, atRisk: false },
    { id: 'm8', name: 'George Wekesa',  role: 'Member',    form: 'Form 2B', attendance: 0.72, atRisk: true  },
  ],
  announcements: [
    { id: 'a1', text: 'Inter-school team announced',  time: '2d ago', pinned: true  },
    { id: 'a2', text: 'Debate motions for this week', time: '5d ago', pinned: false },
  ],
  attendanceHistory: [
    { date: 'Oct 24', present: 28, total: 34 },
    { date: 'Oct 17', present: 31, total: 34 },
    { date: 'Oct 10', present: 25, total: 34 },
    { date: 'Oct 3',  present: 30, total: 34 },
  ],
};

/* -------------------- components -------------------- */

function StatusPill({ isPatron, requestStatus, colors }) {
  const styles = makeStyles(colors);
  if (isPatron) {
    return (
      <View style={styles.statusPillPatron}>
        <Ionicons name="shield-checkmark" size={14} color={colors.accent} />
        <Text style={styles.statusPillPatronText}>PATRON</Text>
      </View>
    );
  }
  if (requestStatus === 'pending') {
    return (
      <View style={styles.statusPillPending}>
        <Ionicons name="hourglass-outline" size={14} color={colors.fgMuted} />
        <Text style={styles.statusPillPendingText}>REQUEST PENDING</Text>
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

function StatCell({ value, label, tone, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.statCell}>
      <Text style={[styles.statValue, tone && { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function EventCard({ event, onAddToCalendar, onManage, isPatron, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventEmoji}>{event.emoji}</Text>
        <View style={{ flex: 1 }}>
          <View style={styles.eventTitleRow}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            {event.owned && isPatron && (
              <View style={styles.ownedPill}>
                <Text style={styles.ownedPillText}>YOURS</Text>
              </View>
            )}
          </View>
          <Text style={styles.eventMeta}>
            {event.date} · {event.time} · {event.venue}
          </Text>
          {event.mandatory && (
            <View style={styles.mandatoryPill}>
              <Text style={styles.mandatoryText}>🔴 MANDATORY</Text>
            </View>
          )}
          {isPatron && typeof event.rsvps === 'number' && (
            <Text style={styles.eventMeta}>{event.rsvps} RSVPs</Text>
          )}
        </View>
      </View>

      {isPatron ? (
        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => onManage(event)}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={14} color={colors.fg} />
          <Text style={styles.calendarBtnText}>MANAGE EVENT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => onAddToCalendar(event)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={14} color={colors.fg} />
          <Text style={styles.calendarBtnText}>ADD TO CALENDAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function LeaderRow({ leader, isPatron, onReassign, colors }) {
  const styles = makeStyles(colors);
  const icon =
    leader.role === 'Chair' ? '👑' :
    leader.role === 'Secretary' ? '🖊️' :
    leader.role === 'Treasurer' ? '💰' : '⭐';
  return (
    <View style={styles.leaderRow}>
      <Text style={styles.leaderIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.leaderName}>{leader.name}</Text>
        <Text style={styles.leaderMeta}>{leader.role} · {leader.form}</Text>
      </View>
      {isPatron && (
        <TouchableOpacity onPress={() => onReassign(leader)} hitSlop={6}>
          <Text style={styles.reassignBtn}>REASSIGN</Text>
        </TouchableOpacity>
      )}
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
      <Text style={styles.announcementIcon}>{announcement.pinned ? '📌' : '📢'}</Text>
      <Text style={styles.announcementText} numberOfLines={1}>{announcement.text}</Text>
      <Text style={styles.announcementTime}>{announcement.time}</Text>
      <Ionicons name="chevron-forward" size={14} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function MemberRow({ member, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.memberRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.memberAvatar}>
        <Text style={styles.memberAvatarText}>
          {member.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.memberName} numberOfLines={1}>{member.name}</Text>
        <Text style={styles.memberMeta} numberOfLines={1}>
          {[member.role, member.form].filter(Boolean).join(' · ')}
          {typeof member.attendance === 'number' ? ` · ${Math.round(member.attendance * 100)}%` : ''}
        </Text>
      </View>
      {member.atRisk && (
        <View style={styles.riskBadge}>
          <Text style={styles.riskBadgeText}>AT RISK</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function AttendanceBar({ session, colors }) {
  const styles = makeStyles(colors);
  const pct = Math.round((session.present / session.total) * 100);
  return (
    <View style={styles.attendanceRow}>
      <Text style={styles.attendanceDate}>{session.date}</Text>
      <View style={styles.attendanceTrack}>
        <View style={[styles.attendanceFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.attendanceValue}>{pct}%</Text>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherClubDetail({ route, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const club = useMemo(() => {
    const passed = route?.params?.club;
    return { ...BASE_CLUB, ...(passed ?? {}) };
  }, [route?.params?.club]);

  const { isPatron } = club;
  const [requestStatus, setRequestStatus] = useState(club.requestStatus);
  const isPending = requestStatus === 'pending';

  const handleRequestPatron = () => {
    Alert.alert(
      'Request to patron',
      `Send a request to the Head of Co-curricular Activities to patron ${club.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => setRequestStatus('pending'),
        },
      ]
    );
  };

  const handleCancelRequest = () => {
    Alert.alert('Cancel request', 'Withdraw your request?', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Withdraw',
        style: 'destructive',
        onPress: () => setRequestStatus(null),
      },
    ]);
  };

  const handleAddToCalendar = (event) => {
    Alert.alert('Added to calendar', `${event.title} · ${event.date}`);
  };

  const handleManageEvent = (event) => {
    navigation?.navigate('Teacher-Club-Event', { eventId: event.id, owned: true });
  };

  const handleReassign = (leader) => {
    Alert.alert(
      'Reassign role',
      `Choose a new ${leader.role} from the roster.`,
      [{ text: 'OK' }]
    );
  };

  const handleOpenAnnouncement = (announcement) => {
    Alert.alert('Announcement', announcement.text);
  };

  const handleViewMembers = () => {
    navigation?.navigate('Member-List', {
      title: `${club.name} Members`,
      members: club.memberList ?? [],
      isAdmin: isPatron,
    });
  };

  const handleOpenMember = (member) => {
    navigation?.navigate('Teacher-Student-Detail', {
      classId: club.id,
      student: member,
    });
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{club.name}</Text>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}
          <View style={styles.hero}>
            <View style={styles.heroEmojiWrap}>
              <Text style={styles.heroEmoji}>{club.emoji}</Text>
            </View>
            <Text style={styles.heroName}>{club.name}</Text>
            <Text style={styles.heroMeta}>
              {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
              {' · '}
              {club.members}{club.capacity ? `/${club.capacity}` : ''} members
            </Text>

            {(isPatron || isPending) && (
              <StatusPill
                isPatron={isPatron}
                requestStatus={requestStatus}
                colors={colors}
              />
            )}
          </View>

          {/* PENDING REQUEST NOTE (non-patron) */}
          {!isPatron && isPending && (
            <View style={styles.pendingCard}>
              <Text style={styles.pendingText}>
                Your request was sent {club.requestedAt}. You'll be notified when
                the Head of Co-curricular Activities reviews it.
              </Text>
            </View>
          )}

          {/* DESCRIPTION */}
          <Text style={styles.description}>{club.description}</Text>

          {/* PATRON SNAPSHOT */}
          {isPatron && (
            <>
              <Text style={styles.sectionTitle}>AT A GLANCE</Text>
              <View style={styles.statRow}>
                <StatCell value={club.members}       label="MEMBERS"  colors={colors} />
                <StatCell value={club.pendingRequests} label="REQUESTS" tone={colors.accent} colors={colors} />
                <StatCell value={`${Math.round(club.avgAttendance * 100)}%`} label="ATTEND"  colors={colors} />
                <StatCell
                  value={club.health === 'healthy' ? 'OK' : 'WATCH'}
                  label="HEALTH"
                  tone={club.health === 'healthy' ? '#4caf7d' : '#e0a93a'}
                  colors={colors}
                />
              </View>
            </>
          )}

          {/* DETAILS */}
          <Text style={styles.sectionTitle}>DETAILS</Text>
          <View style={styles.detailsBlock}>
            <DetailRow
              icon="👩‍🏫"
              label="Patron"
              value={club.patron.subject
                ? `${club.patron.name} (${club.patron.subject})`
                : club.patron.name}
              colors={colors}
            />
            <DetailRow icon="📅" label="Meets"    value={club.meet}        colors={colors} />
            <DetailRow icon="📍" label="Location" value={club.location}    colors={colors} />
            <DetailRow icon="👥" label="Members"  value={`${club.members} / ${club.capacity}`} colors={colors} />
            <DetailRow icon="📆" label="Founded"  value={String(club.founded)} colors={colors} />
            <DetailRow icon="🏫" label="Open to"  value={club.openTo}      colors={colors} />
          </View>

          {/* PENDING REQUESTS (patron only) */}
          {isPatron && club.pendingRequests > 0 && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>JOIN REQUESTS · {club.pendingRequests}</Text>
                <TouchableOpacity onPress={handleViewMembers}>
                  <Text style={styles.sectionAction}>REVIEW →</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pendingRequestsCard}>
                <Ionicons name="person-add" size={18} color={colors.accent} />
                <Text style={styles.pendingRequestsText}>
                  {club.pendingRequests} students want to join. Review their profiles
                  and approve or decline.
                </Text>
              </View>
            </>
          )}

          {/* UPCOMING EVENTS */}
          {club.events.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>UPCOMING EVENTS</Text>
                {isPatron && (
                  <TouchableOpacity
                    onPress={() => navigation?.navigate('Teacher-Club-Event-Create', { clubId: club.id })}
                  >
                    <Text style={styles.sectionAction}>+ CREATE</Text>
                  </TouchableOpacity>
                )}
              </View>
              {club.events.slice(0, 3).map((e) => (
                <EventCard
                  key={e.id}
                  event={e}
                  onAddToCalendar={handleAddToCalendar}
                  onManage={handleManageEvent}
                  isPatron={isPatron}
                  colors={colors}
                />
              ))}
            </>
          )}

          {/* LEADERSHIP */}
          {club.leadership.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>LEADERSHIP</Text>
              <View style={styles.leadershipBlock}>
                {club.leadership.map((l) => (
                  <LeaderRow
                    key={l.id}
                    leader={l}
                    isPatron={isPatron}
                    onReassign={handleReassign}
                    colors={colors}
                  />
                ))}
              </View>
            </>
          )}

          {/* MEMBERS PREVIEW */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>MEMBERS ({club.members})</Text>
            <TouchableOpacity onPress={handleViewMembers}>
              <Text style={styles.sectionAction}>VIEW ALL →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.membersBlock}>
            {(club.memberList ?? []).slice(0, 4).map((m) => (
              <MemberRow key={m.id} member={m} onPress={() => handleOpenMember(m)} colors={colors} />
            ))}
          </View>

          {/* ANNOUNCEMENTS */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>ANNOUNCEMENTS</Text>
            {isPatron && (
              <TouchableOpacity
                onPress={() => navigation?.navigate('Teacher-Club-Announcements-Form', { clubId: club.id })}
              >
                <Text style={styles.sectionAction}>+ POST</Text>
              </TouchableOpacity>
            )}
          </View>
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

          {/* ATTENDANCE HISTORY (patron only) */}
          {isPatron && club.attendanceHistory?.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>ATTENDANCE · LAST 4 MEETINGS</Text>
                <TouchableOpacity
                  onPress={() => navigation?.navigate('Teacher-Club-Attendance', { clubId: club.id })}
                >
                  <Text style={styles.sectionAction}>MARK →</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.attendanceBlock}>
                {club.attendanceHistory.map((s, i) => (
                  <AttendanceBar key={i} session={s} colors={colors} />
                ))}
              </View>
            </>
          )}

          {/* ACTION AREA */}
          <View style={styles.actions}>
            {isPatron && (
              <>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() =>
                    navigation?.navigate('Teacher-Club-Manage', { clubId: club.id })
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons name="settings-outline" size={16} color={colors.buttonFg} />
                  <Text style={styles.primaryBtnText}>MANAGE CLUB</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => Alert.alert('Step down', 'Contact admin to resign as patron.')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryBtnText}>STEP DOWN AS PATRON</Text>
                </TouchableOpacity>
              </>
            )}

            {!isPatron && isPending && (
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={handleCancelRequest}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryBtnText}>CANCEL REQUEST</Text>
              </TouchableOpacity>
            )}

            {!isPatron && !isPending && (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleRequestPatron}
                activeOpacity={0.7}
              >
                <Ionicons name="hand-left-outline" size={16} color={colors.buttonFg} />
                <Text style={styles.primaryBtnText}>REQUEST TO PATRON</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NOTE */}
          {!isPatron && (
            <View style={styles.noteBlock}>
              <Ionicons name="information-circle-outline" size={14} color={colors.fgMuted} />
              <Text style={styles.noteText}>
                Teachers cannot create clubs. To patron a new club, request a
                patron assignment from the Head of Co-curricular Activities.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}