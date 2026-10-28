// Classes.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../../layout.jsx';
import { useNavigation } from '@react-navigation/native';

/* -------------------- sample data -------------------- */

const SUBJECTS = [
  { id: 'math', name: 'Math',      teacher: 'Mr. Kimani',  room: 'Rm 5',  color: 'core' },
  { id: 'eng',  name: 'English',   teacher: 'Ms. Wanjiku', room: 'Rm 2',  color: 'core' },
  { id: 'bio',  name: 'Biology',   teacher: 'Mr. Otieno',  room: 'Lab 2', color: 'core' },
  { id: 'chem', name: 'Chemistry', teacher: 'Ms. Achieng', room: 'Lab 1', color: 'elective' },
  { id: 'hist', name: 'History',   teacher: 'Mr. Mwangi',  room: 'Rm 7',  color: 'elective' },
  { id: 'geo',  name: 'Geography', teacher: 'Ms. Njeri',   room: 'Rm 3',  color: 'elective' },
];

const PERIODS = [
  '08:00–08:40',
  '08:45–09:25',
  '09:30–10:10',
  '10:25–11:05',
  '11:10–11:50', // lunch
  '11:55–12:35',
  '12:40–13:20',
];

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

// week[dayIndex][periodIndex] = subjectId | 'lunch' | 'break' | 'live:<id>'
const WEEK_GRID = [
  ['math', 'eng',  'live:bio', 'hist', 'lunch', 'chem', 'geo'],
  ['eng',  'math', 'bio',      'chem', 'lunch', 'hist', 'geo'],
  ['math', 'eng',  'chem',     'hist', 'lunch', 'bio',  'geo'],
  ['bio',  'hist', 'math',     'eng',  'lunch', 'geo',  'chem'],
  ['chem', 'geo',  'break',    'math', 'lunch', 'eng',  'bio'],
];

const TODAY_INDEX = 0; // Monday
const LIVE_PERIOD = 2; // 09:30–10:10

/* -------------------- helpers -------------------- */

function subjectById(id) {
  return SUBJECTS.find((s) => s.id === id) ?? null;
}

/* -------------------- views -------------------- */

function WeekGrid({ onBlockPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.grid}>
      <View style={styles.gridRow}>
        <View style={styles.timeCol} />
        {DAYS.map((d, i) => (
          <View
            key={d}
            style={[styles.dayHeader, i === TODAY_INDEX && styles.dayHeaderToday]}
          >
            <Text
              style={[
                styles.dayHeaderText,
                i === TODAY_INDEX && styles.dayHeaderTextToday,
              ]}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      {PERIODS.map((period, pIdx) => {
        const isLunch = period === '11:10–11:50';
        return (
          <View key={period} style={styles.gridRow}>
            <View style={styles.timeCol}>
              <Text style={styles.timeLabel}>{period.split('–')[0]}</Text>
              <Text style={styles.timeLabelEnd}>{period.split('–')[1]}</Text>
            </View>

            {DAYS.map((_, dIdx) => {
              const cell = WEEK_GRID[dIdx][pIdx];
              const isLive = typeof cell === 'string' && cell.startsWith('live:');
              const isBreak = cell === 'lunch' || cell === 'break';
              const liveId = isLive ? cell.split(':')[1] : null;
              const subject = !isBreak
                ? subjectById(isLive ? liveId : cell)
                : null;

              if (isBreak) {
                return (
                  <View key={dIdx} style={[styles.cell, styles.cellBreak]}>
                    <Text style={styles.breakText}>
                      {isLunch ? '🍎 LUNCH' : 'BREAK'}
                    </Text>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={dIdx}
                  style={[
                    styles.cell,
                    subject?.color === 'elective' && styles.cellElective,
                    isLive && styles.cellLive,
                  ]}
                  onPress={() => subject && onBlockPress(subject, period)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.cellSubject, isLive && styles.cellSubjectLive]}>
                    {subject?.name ?? ''}
                  </Text>
                  <Text style={[styles.cellRoom, isLive && styles.cellRoomLive]}>
                    {isLive ? '● LIVE' : subject?.room ?? ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function DayAgenda({ onBlockPress }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const today = WEEK_GRID[TODAY_INDEX];

  return (
    <View style={styles.agenda}>
      <View style={styles.agendaHeader}>
        <Text style={styles.agendaHeaderText}>TODAY · MON, OCT 27</Text>
      </View>

      {PERIODS.map((period, pIdx) => {
        const cell = today[pIdx];
        const isLive = typeof cell === 'string' && cell.startsWith('live:');
        const isBreak = cell === 'lunch' || cell === 'break';
        const isPast = pIdx < LIVE_PERIOD;
        const liveId = isLive ? cell.split(':')[1] : null;
        const subject = !isBreak
          ? subjectById(isLive ? liveId : cell)
          : null;

        if (isBreak) {
          return (
            <View key={period} style={styles.agendaRow}>
              <Text style={styles.agendaTime}>{period.split('–')[0]}</Text>
              <Text style={styles.agendaBreak}>🍎 LUNCH</Text>
            </View>
          );
        }

        if (isLive) {
          return (
            <TouchableOpacity
              key={period}
              style={styles.agendaLiveCard}
              onPress={() => onBlockPress(subject, period)}
              activeOpacity={0.8}
            >
              <Text style={styles.agendaLiveLabel}>▶ NOW · {period}</Text>
              <Text style={styles.agendaLiveSubject}>
                {subject.name} · {subject.teacher} · {subject.room}
              </Text>
              <Text style={styles.agendaLiveMeta}>32 min left</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={period}
            style={styles.agendaRow}
            onPress={() => onBlockPress(subject, period)}
            activeOpacity={0.7}
          >
            <Text style={styles.agendaTime}>{period.split('–')[0]}</Text>
            <Text style={styles.agendaStatus}>{isPast ? '✅' : '○'}</Text>
            <Text style={styles.agendaSubject} numberOfLines={1}>
              {subject.name} · {subject.room}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MonthCalendar({ onDayPress, selectedDay, days }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const cells = Array.from({ length: 35 });

  return (
    <View style={styles.monthWrap}>
      <View style={styles.monthHeaderRow}>
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <Text key={d} style={styles.monthDayLabel}>{d}</Text>
        ))}
      </View>

      <View style={styles.monthGrid}>
        {cells.map((_, idx) => {
          const dayNum = idx - 3;
          const isToday = dayNum === 27;
          const valid = dayNum > 0 && dayNum <= 31;
          const isSelected = dayNum === selectedDay;
          const dayData = valid ? days[dayNum] : null;

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.monthCell,
                isToday && styles.monthCellToday,
                isSelected && styles.monthCellSelected,
              ]}
              onPress={() => valid && onDayPress(dayNum)}
              activeOpacity={0.7}
            >
              {valid && (
                <>
                  <Text
                    style={[
                      styles.monthCellNum,
                      isToday && styles.monthCellNumToday,
                      isSelected && styles.monthCellNumSelected,
                    ]}
                  >
                    {dayNum}
                  </Text>
                  {dayData && (
                    <View style={styles.dotsRow}>
                      {dayData.classes > 0 && <View style={[styles.dot, styles.dotClass]} />}
                      {dayData.assignments > 0 && <View style={[styles.dot, styles.dotAssign]} />}
                      {dayData.event && <View style={[styles.dot, styles.dotEvent]} />}
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.monthDayPanel}>
        <Text style={styles.monthDayPanelTitle}>MON, OCT {selectedDay}</Text>
        {days[selectedDay] ? (
          <>
            <Text style={styles.monthDayPanelRow}>
              📚 {days[selectedDay].classes} classes
            </Text>
            {days[selectedDay].assignments > 0 && (
              <Text style={styles.monthDayPanelRow}>
                📝 {days[selectedDay].assignments} assignment
                {days[selectedDay].assignments > 1 ? 's' : ''} due
              </Text>
            )}
            {days[selectedDay].event && (
              <Text style={styles.monthDayPanelRow}>
                📢 {days[selectedDay].event}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.monthDayPanelEmpty}>Nothing scheduled</Text>
        )}
      </View>
    </View>
  );
}

/* -------------------- detail modal -------------------- */

function SubjectDetail({ visible, subject, period, onClose, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const goToMaterials = () => {
    if (!subject) return;
    onClose(); // dismiss the modal before navigating
    navigation?.navigate('Student-Materials', { subject });
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
          {subject && (
            <>
              <Text style={styles.modalLabel}>// CLASS DETAIL</Text>
              <Text style={styles.modalTitle}>{subject.name}</Text>
              <Text style={styles.modalMeta}>{subject.teacher} · {subject.room}</Text>
              <Text style={styles.modalMeta}>{period}</Text>

              <View style={styles.modalDivider} />

              <TouchableOpacity style={styles.modalAction} onPress={goToMaterials}>
                <Ionicons name="document-text-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>VIEW MATERIALS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalAction}
                onPress={() => {
                  onClose();
                  navigation?.navigate('Student-Grades', { subject });
                }}
              >
                <Ionicons name="stats-chart-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>PAST GRADES</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalAction} onPress={onClose}>
                <Ionicons name="notifications-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>ADD REMINDER</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalClose} onPress={onClose}>
                <Text style={styles.modalCloseText}>CLOSE</Text>
              </TouchableOpacity>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* -------------------- month data -------------------- */

const MONTH_DAYS = (() => {
  const out = {};
  for (let d = 1; d <= 31; d++) {
    const classes = (d * 7) % 6;
    const assignments = d % 4 === 0 ? 1 : 0;
    const event = d === 31 ? 'Sports Day' : null;
    if (classes || assignments || event) {
      out[d] = { classes, assignments, event };
    }
  }
  return out;
})();

/* -------------------- screen -------------------- */

export default function Classes() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const [view, setView] = useState('week'); // 'week' | 'day' | 'month'
  const [detail, setDetail] = useState({ visible: false, subject: null, period: null });
  const [selectedDay, setSelectedDay] = useState(27);

  const openDetail = (subject, period) => {
    if (!subject) return;
    setDetail({ visible: true, subject, period });
  };
  const closeDetail = () => setDetail((d) => ({ ...d, visible: false }));

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY TIMETABLE</Text>
          <TouchableOpacity hitSlop={8}>
            <Ionicons name="options-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        {/* Week label */}
        <Text style={styles.weekLabel}>OCT 27 – 31, 2026</Text>

        {/* View toggle */}
        <View style={styles.toggleRow}>
          {['week', 'day', 'month'].map((v) => {
            const active = view === v;
            return (
              <TouchableOpacity
                key={v}
                style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                onPress={() => setView(v)}
              >
                <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
                  {v.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {view === 'week' && <WeekGrid onBlockPress={openDetail} />}
          {view === 'day' && <DayAgenda onBlockPress={openDetail} />}
          {view === 'month' && (
            <MonthCalendar
              onDayPress={setSelectedDay}
              selectedDay={selectedDay}
              days={MONTH_DAYS}
            />
          )}
        </ScrollView>

        <SubjectDetail
          visible={detail.visible}
          subject={detail.subject}
          period={detail.period}
          onClose={closeDetail}
          navigation={navigation}
        />
      </View>
    </Layout>
  );
}