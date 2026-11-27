// src/pages/teachers/classes/index.jsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, Pressable, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../../layout.jsx';
import { useNavigation } from '@react-navigation/native';

/* -------------------- sample data -------------------- */

const CLASSES = [
  { id: 'bio10a', name: 'Biology · 10A', room: 'Lab 2', color: 'core',     size: 32 },
  { id: 'bio10b', name: 'Biology · 10B', room: 'Lab 2', color: 'core',     size: 30 },
  { id: 'bio11a', name: 'Biology · 11A', room: 'Rm 4',  color: 'core',     size: 28 },
  { id: 'sci8',   name: 'Science · 8',   room: 'Lab 1', color: 'elective', size: 35 },
  { id: 'sci9',   name: 'Science · 9',   room: 'Lab 1', color: 'elective', size: 33 },
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

// week[dayIndex][periodIndex] = classId | 'free' | 'lunch' | 'break' | 'live:<id>'
const WEEK_GRID = [
  ['bio10a', 'bio10b', 'live:bio11a', 'sci8',  'lunch', 'free',    'sci9'],
  ['bio11a', 'sci8',   'bio10a',      'bio10b','lunch', 'sci9',    'free'],
  ['free',   'bio10b', 'sci9',        'bio11a','lunch', 'bio10a',  'sci8'],
  ['bio10a', 'bio11a', 'bio10b',      'sci8',  'lunch', 'free',    'sci9'],
  ['sci9',   'bio10a', 'break',       'bio11a','lunch', 'bio10b',  'free'],
];

const TODAY_INDEX = 0;
const LIVE_PERIOD = 2;

/* -------------------- helpers -------------------- */

function classById(id) {
  return CLASSES.find((c) => c.id === id) ?? null;
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
            <Text style={[styles.dayHeaderText, i === TODAY_INDEX && styles.dayHeaderTextToday]}>
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
              const isFree  = cell === 'free';
              const liveId  = isLive ? cell.split(':')[1] : null;
              const cls = !isBreak && !isFree ? classById(isLive ? liveId : cell) : null;

              if (isBreak) {
                return (
                  <View key={dIdx} style={[styles.cell, styles.cellBreak]}>
                    <Text style={styles.breakText}>{isLunch ? '🍎 LUNCH' : 'BREAK'}</Text>
                  </View>
                );
              }

              if (isFree) {
                return (
                  <View key={dIdx} style={[styles.cell, styles.cellFree]}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={dIdx}
                  style={[
                    styles.cell,
                    cls?.color === 'elective' && styles.cellElective,
                    isLive && styles.cellLive,
                  ]}
                  onPress={() => cls && onBlockPress(cls, period)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.cellSubject, isLive && styles.cellSubjectLive]} numberOfLines={1}>
                    {cls?.name ?? ''}
                  </Text>
                  <Text style={[styles.cellRoom, isLive && styles.cellRoomLive]}>
                    {isLive ? '● NOW' : cls?.room ?? ''}
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
        const isFree  = cell === 'free';
        const isPast  = pIdx < LIVE_PERIOD;
        const liveId  = isLive ? cell.split(':')[1] : null;
        const cls = !isBreak && !isFree ? classById(isLive ? liveId : cell) : null;

        if (isBreak) {
          return (
            <View key={period} style={styles.agendaRow}>
              <Text style={styles.agendaTime}>{period.split('–')[0]}</Text>
              <Text style={styles.agendaBreak}>🍎 LUNCH</Text>
            </View>
          );
        }

        if (isFree) {
          return (
            <View key={period} style={styles.agendaRow}>
              <Text style={styles.agendaTime}>{period.split('–')[0]}</Text>
              <Text style={styles.agendaStatus}>·</Text>
              <Text style={styles.agendaFree} numberOfLines={1}>Free period</Text>
            </View>
          );
        }

        if (isLive) {
          return (
            <TouchableOpacity
              key={period}
              style={styles.agendaLiveCard}
              onPress={() => onBlockPress(cls, period)}
              activeOpacity={0.8}
            >
              <Text style={styles.agendaLiveLabel}>▶ TEACHING NOW · {period}</Text>
              <Text style={styles.agendaLiveSubject}>
                {cls.name} · {cls.room} · {cls.size} students
              </Text>
              <Text style={styles.agendaLiveMeta}>32 min left</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={period}
            style={styles.agendaRow}
            onPress={() => onBlockPress(cls, period)}
            activeOpacity={0.7}
          >
            <Text style={styles.agendaTime}>{period.split('–')[0]}</Text>
            <Text style={styles.agendaStatus}>{isPast ? '✅' : '○'}</Text>
            <Text style={styles.agendaSubject} numberOfLines={1}>
              {cls.name} · {cls.room}
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
                  <Text style={[
                    styles.monthCellNum,
                    isToday && styles.monthCellNumToday,
                    isSelected && styles.monthCellNumSelected,
                  ]}>
                    {dayNum}
                  </Text>
                  {dayData && (
                    <View style={styles.dotsRow}>
                      {dayData.classes > 0 && <View style={[styles.dot, styles.dotClass]} />}
                      {dayData.dueToGrade > 0 && <View style={[styles.dot, styles.dotAssign]} />}
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
            <Text style={styles.monthDayPanelRow}>📚 {days[selectedDay].classes} classes to teach</Text>
            {days[selectedDay].dueToGrade > 0 && (
              <Text style={styles.monthDayPanelRow}>
                📝 {days[selectedDay].dueToGrade} submission{days[selectedDay].dueToGrade > 1 ? 's' : ''} to grade
              </Text>
            )}
            {days[selectedDay].event && (
              <Text style={styles.monthDayPanelRow}>📢 {days[selectedDay].event}</Text>
            )}
          </>
        ) : (
          <Text style={styles.monthDayPanelEmpty}>Nothing scheduled</Text>
        )}
      </View>
    </View>
  );
}

/* -------------------- block detail modal -------------------- */

function ClassBlockDetail({ visible, cls, period, onClose, navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const goToRoster = () => {
    if (!cls) return;
    onClose();
    navigation?.navigate('Teacher-Class-Detail', { classId: cls.id, className: cls.name });
  };
  const goToAttendance = () => {
    if (!cls) return;
    onClose();
    navigation?.navigate('Teacher-Attendance-Mark', { classId: cls.id });
  };
  const goToTasks = () => {
    if (!cls) return;
    onClose();
    navigation?.navigate('Teacher-Tasks-Create', { classId: cls.id });
  };
  const goToMaterials = () => {
    if (!cls) return;
    onClose();
    navigation?.navigate('Teacher-Materials-Form', { classId: cls.id });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalSheet} onPress={() => {}}>
          {cls && (
            <>
              <Text style={styles.modalLabel}>// CLASS BLOCK</Text>
              <Text style={styles.modalTitle}>{cls.name}</Text>
              <Text style={styles.modalMeta}>{cls.room} · {cls.size} students</Text>
              <Text style={styles.modalMeta}>{period}</Text>

              <View style={styles.modalDivider} />

              <TouchableOpacity style={styles.modalAction} onPress={goToRoster}>
                <Ionicons name="people-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>VIEW CLASS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalAction} onPress={goToAttendance}>
                <Ionicons name="checkbox-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>MARK ATTENDANCE</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalAction} onPress={goToTasks}>
                <Ionicons name="add-circle-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>ASSIGN TASK</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalAction} onPress={goToMaterials}>
                <Ionicons name="cloud-upload-outline" size={16} color={colors.fg} />
                <Text style={styles.modalActionText}>UPLOAD MATERIAL</Text>
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
    const classes = (d * 5) % 5;
    const dueToGrade = d % 4 === 0 ? 1 + (d % 3) : 0;
    const event = d === 31 ? 'Staff meeting' : null;
    if (classes || dueToGrade || event) out[d] = { classes, dueToGrade, event };
  }
  return out;
})();

/* -------------------- screen -------------------- */

export default function TeacherClasses() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const [view, setView] = useState('week');
  const [detail, setDetail] = useState({ visible: false, cls: null, period: null });
  const [selectedDay, setSelectedDay] = useState(27);

  const openDetail = (cls, period) => {
    if (!cls) return;
    setDetail({ visible: true, cls, period });
  };
  const closeDetail = () => setDetail((d) => ({ ...d, visible: false }));

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY CLASSES</Text>
          <TouchableOpacity
            hitSlop={8}
            onPress={() => Alert.alert('Options', 'Coming soon')}
          >
            <Ionicons name="options-outline" size={20} color={colors.fg} />
          </TouchableOpacity>
        </View>

        <Text style={styles.weekLabel}>OCT 27 – 31, 2026</Text>

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
          {view === 'week'  && <WeekGrid      onBlockPress={openDetail} />}
          {view === 'day'   && <DayAgenda     onBlockPress={openDetail} />}
          {view === 'month' && (
            <MonthCalendar
              onDayPress={setSelectedDay}
              selectedDay={selectedDay}
              days={MONTH_DAYS}
            />
          )}
        </ScrollView>

        <ClassBlockDetail
          visible={detail.visible}
          cls={detail.cls}
          period={detail.period}
          onClose={closeDetail}
          navigation={navigation}
        />
      </View>
    </Layout>
  );
}