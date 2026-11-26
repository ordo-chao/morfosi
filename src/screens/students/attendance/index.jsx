// Attendance.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- sample data -------------------- */

// status: 'present' | 'absent' | 'late' | 'excused'
// reason: present only on absent/late/excused days
const RECORDS = [
  { day: 1,  status: 'present' },
  { day: 2,  status: 'present' },
  { day: 3,  status: 'present' },
  { day: 6,  status: 'present' },
  { day: 7,  status: 'absent',  reason: 'Sick — flu (medical note submitted)',  reasonType: 'medical' },
  { day: 8,  status: 'absent',  reason: 'Sick — flu (medical note submitted)',  reasonType: 'medical' },
  { day: 9,  status: 'present' },
  { day: 10, status: 'late',    reason: 'Transport delay (matatu breakdown)', reasonType: 'transport' },
  { day: 13, status: 'present' },
  { day: 14, status: 'present' },
  { day: 15, status: 'excused', reason: 'Family function — approved by class teacher', reasonType: 'approved' },
  { day: 16, status: 'present' },
  { day: 17, status: 'present' },
  { day: 20, status: 'present' },
  { day: 21, status: 'absent',  reason: null, reasonType: 'unrecorded' },
  { day: 22, status: 'present' },
  { day: 23, status: 'present' },
  { day: 24, status: 'present' },
  { day: 27, status: 'present' },
  { day: 28, status: 'present' },
  { day: 29, status: 'present' },
  { day: 30, status: 'present' },
  { day: 31, status: 'present' },
];

const TERM = {
  label: 'TERM 2 · 2025/2026',
  month: 'OCTOBER 2026',
  firstWeekday: 4,   // 0=Sun ... 4=Thu (1 Oct 2026 is a Thursday)
  daysInMonth: 31,
};

const STATUS_META = {
  present: { color: '#4caf7d', label: 'Present', icon: 'checkmark' },
  absent:  { color: '#e25b5b', label: 'Absent',  icon: 'close'     },
  late:    { color: '#e0a93a', label: 'Late',    icon: 'time'      },
  excused: { color: '#4d7cff', label: 'Excused', icon: 'shield-checkmark' },
};

/* -------------------- helpers -------------------- */

function reasonTint(type) {
  switch (type) {
    case 'medical':   return '#4caf7d';
    case 'transport': return '#e0a93a';
    case 'approved':  return '#4d7cff';
    default:          return '#888888';
  }
}

function reasonLabel(type) {
  switch (type) {
    case 'medical':   return 'MEDICAL';
    case 'transport': return 'TRANSPORT';
    case 'approved':  return 'APPROVED';
    default:          return 'NO REASON';
  }
}

/* -------------------- components -------------------- */

function SummaryTile({ label, value, sub, accent, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={[styles.summaryTile, accent && styles.summaryTileAccent]}>
      <Text style={[styles.summaryValue, accent && styles.summaryValueAccent]}>
        {value}
      </Text>
      <Text style={styles.summaryLabel}>{label}</Text>
      {sub ? <Text style={styles.summarySub}>{sub}</Text> : null}
    </View>
  );
}

function CalendarCell({ day, record, isToday, onPress, colors }) {
  const styles = makeStyles(colors);
  if (!record) {
    // Days with no record (weekend, holiday) — still tappable but faded
    return (
      <TouchableOpacity
        style={styles.calCell}
        onPress={() => onPress(day, null)}
        activeOpacity={0.6}
      >
        <Text style={styles.calDayEmpty}>{day}</Text>
      </TouchableOpacity>
    );
  }

  const meta = STATUS_META[record.status];
  return (
    <TouchableOpacity
      style={[styles.calCell, isToday && styles.calCellToday]}
      onPress={() => onPress(day, record)}
      activeOpacity={0.7}
    >
      <Text style={[styles.calDay, { color: meta.color }]}>{day}</Text>
      <View style={[styles.calDot, { backgroundColor: meta.color }]} />
    </TouchableOpacity>
  );
}

function AbsenceRow({ record, onPress, colors }) {
  const styles = makeStyles(colors);
  const meta = STATUS_META[record.status];
  const hasReason = !!record.reason;
  const tint = hasReason ? reasonTint(record.reasonType) : '#888888';

  return (
    <TouchableOpacity
      style={styles.absenceRow}
      onPress={() => onPress(record)}
      activeOpacity={0.7}
    >
      <View style={[styles.absenceDot, { backgroundColor: meta.color }]} />

      <View style={styles.absenceBody}>
        <View style={styles.absenceHeader}>
          <Text style={styles.absenceDate}>Oct {record.day}, 2026</Text>
          <View style={[styles.reasonTag, { borderColor: tint }]}>
            <Text style={[styles.reasonTagText, { color: tint }]}>
              {reasonLabel(record.reasonType)}
            </Text>
          </View>
        </View>

        <Text style={styles.absenceStatus}>{meta.label}</Text>

        <Text
          style={[
            styles.absenceReason,
            !hasReason && styles.absenceReasonMissing,
          ]}
          numberOfLines={3}
        >
          {hasReason ? record.reason : 'No reason recorded — contact the school office'}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={colors.fgMuted} />
    </TouchableOpacity>
  );
}

function RecordDetail({ visible, day, record, onClose, colors }) {
  const styles = makeStyles(colors);
  if (!record) {
    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <Pressable style={styles.modalBackdrop} onPress={onClose}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <Text style={styles.modalLabel}>// NO RECORD</Text>
            <Text style={styles.modalTitle}>Oct {day}, 2026</Text>
            <Text style={styles.modalBody}>
              No attendance was recorded for this day — it may have been a
              weekend, public holiday, or school closure.
            </Text>
            <TouchableOpacity style={styles.modalClose} onPress={onClose}>
              <Text style={styles.modalCloseText}>CLOSE</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }

  const meta = STATUS_META[record.status];
  const tint = record.reason ? reasonTint(record.reasonType) : '#888888';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalSheet} onPress={() => {}}>
          <Text style={styles.modalLabel}>// ATTENDANCE RECORD</Text>
          <Text style={styles.modalTitle}>Oct {day}, 2026</Text>

          <View style={[styles.modalStatusRow, { borderLeftColor: meta.color }]}>
            <Ionicons name={meta.icon} size={18} color={meta.color} />
            <Text style={[styles.modalStatus, { color: meta.color }]}>
              {meta.label.toUpperCase()}
            </Text>
          </View>

          {record.reason ? (
            <>
              <Text style={styles.modalSectionLabel}>REASON</Text>
              <View style={[styles.modalReasonBlock, { borderLeftColor: tint }]}>
                <Text style={styles.modalReasonText}>{record.reason}</Text>
                <View style={[styles.reasonTag, { borderColor: tint }]}>
                  <Text style={[styles.reasonTagText, { color: tint }]}>
                    {reasonLabel(record.reasonType)}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalSectionLabel}>REASON</Text>
              <View style={styles.modalReasonBlock}>
                <Text style={styles.modalReasonMissing}>
                  No reason recorded. If this is incorrect, please contact the
                  school office to have the record updated.
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Text style={styles.modalCloseText}>CLOSE</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* -------------------- screen -------------------- */

export default function Attendance({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [selected, setSelected] = useState({ visible: false, day: null, record: null });

  /* ---- stats ---- */
  const stats = useMemo(() => {
    const recorded = RECORDS.length;
    const present = RECORDS.filter((r) => r.status === 'present').length;
    const absent  = RECORDS.filter((r) => r.status === 'absent').length;
    const late    = RECORDS.filter((r) => r.status === 'late').length;
    const excused = RECORDS.filter((r) => r.status === 'excused').length;
    const rate = recorded > 0 ? Math.round((present / recorded) * 100) : 0;
    return { recorded, present, absent, late, excused, rate };
  }, []);

  /* ---- absences / late / excused for the list ---- */
  const irregular = useMemo(
    () =>
      [...RECORDS]
        .filter((r) => r.status !== 'present')
        .sort((a, b) => b.day - a.day), // newest first
    []
  );

  const onDayPress = (day, record) => {
    setSelected({ visible: true, day, record });
  };

  const closeDetail = () => setSelected((s) => ({ ...s, visible: false }));

  /* ---- build calendar grid cells ---- */
  const calendarCells = useMemo(() => {
    const cells = [];
    // Empty leading cells (before 1st of month)
    for (let i = 0; i < TERM.firstWeekday; i++) {
      cells.push({ key: `pad-${i}`, pad: true });
    }
    const recordsByDay = Object.fromEntries(RECORDS.map((r) => [r.day, r]));
    for (let d = 1; d <= TERM.daysInMonth; d++) {
      cells.push({
        key: `day-${d}`,
        day: d,
        record: recordsByDay[d] ?? null,
      });
    }
    return cells;
  }, []);

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ATTENDANCE</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== TERM LABEL ===== */}
          <Text style={styles.termLabel}>{TERM.label}</Text>

          {/* ===== SUMMARY ===== */}
          <View style={styles.summaryRow}>
            <SummaryTile
              value={`${stats.rate}%`}
              label="RATE"
              sub={`${stats.present}/${stats.recorded} days`}
              accent
              colors={colors}
            />
            <SummaryTile
              value={stats.absent}
              label="ABSENT"
              colors={colors}
            />
            <SummaryTile
              value={stats.late}
              label="LATE"
              colors={colors}
            />
            <SummaryTile
              value={stats.excused}
              label="EXCUSED"
              colors={colors}
            />
          </View>

          {/* ===== CALENDAR ===== */}
          <Text style={styles.sectionTitle}>{TERM.month}</Text>
          <View style={styles.calendarBlock}>
            <View style={styles.weekdayRow}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                <Text key={d} style={styles.weekdayLabel}>{d}</Text>
              ))}
            </View>

            <View style={styles.calGrid}>
              {calendarCells.map((c) =>
                c.pad ? (
                  <View key={c.key} style={styles.calCell} />
                ) : (
                  <CalendarCell
                    key={c.key}
                    day={c.day}
                    record={c.record}
                    isToday={c.day === 29}
                    onPress={onDayPress}
                    colors={colors}
                  />
                )
              )}
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              {Object.entries(STATUS_META).map(([key, meta]) => (
                <View key={key} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: meta.color }]} />
                  <Text style={styles.legendText}>{meta.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ===== ABSENCES / ISSUES ===== */}
          <Text style={styles.sectionTitle}>
            DAYS ABSENT / LATE ({irregular.length})
          </Text>

          {irregular.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="checkmark-circle-outline" size={28} color={colors.fgFaint} />
              <Text style={styles.emptyText}>Perfect attendance</Text>
              <Text style={styles.emptySub}>
                No absences or late arrivals this term.
              </Text>
            </View>
          ) : (
            <View style={styles.absenceList}>
              {irregular.map((r) => (
                <AbsenceRow
                  key={r.day}
                  record={r}
                  onPress={() => onDayPress(r.day, r)}
                  colors={colors}
                />
              ))}
            </View>
          )}

          {/* ===== POLICY NOTE ===== */}
          <View style={styles.policyBlock}>
            <Ionicons name="information-circle-outline" size={14} color={colors.fgMuted} />
            <Text style={styles.policyText}>
              Missing reason? Contact the school office within 7 days of the
              absence so the record can be updated.
            </Text>
          </View>
        </ScrollView>

        <RecordDetail
          visible={selected.visible}
          day={selected.day}
          record={selected.record}
          onClose={closeDetail}
          colors={colors}
        />
      </View>
    </Layout>
  );
}