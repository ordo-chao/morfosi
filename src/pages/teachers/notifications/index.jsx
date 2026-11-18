// src/pages/teachers/notifications/index.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../../theme/themeContext.jsx';
import Layout from '../../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const PUSH_ITEMS = [
  { key: 'new-submission',   label: 'New submissions',        default: true  },
  { key: 'regrade-request',  label: 'Regrade requests',       default: true  },
  { key: 'student-question', label: 'Student questions',      default: true  },
  { key: 'parent-message',   label: 'Parent messages',        default: true  },
  { key: 'announcement',     label: 'School announcements',   default: true  },
  { key: 'staff-meeting',    label: 'Staff meetings',         default: false },
];

const GRADING_ITEMS = [
  { key: 'overdue-grading',   label: 'Overdue grading',       default: true  },
  { key: 'bulk-ready',        label: 'Bulk grading ready',    default: true  },
  { key: 'quiz-auto-graded',  label: 'Quiz auto-graded',      default: true  },
  { key: 'returned-resubmit', label: 'Returned & resubmitted',default: true  },
];

const CLASS_ITEMS = [
  { key: 'attendance-missed', label: 'Attendance not marked', default: true  },
  { key: 'at-risk-student',   label: 'At-risk students',      default: true  },
  { key: 'low-avg',           label: 'Class average drops',   default: false },
  { key: 'full-roster',       label: 'Submission milestone',  default: true  },
];

const EMAIL_ITEMS = [
  { key: 'digest',      label: 'Weekly teaching digest',      default: true  },
  { key: 'grading',     label: 'Grading queue summary',       default: false },
  { key: 'announcements', label: 'Announcements',             default: false },
];

const SMS_ITEMS = [
  { key: 'critical',    label: 'Critical only (overdue grading)', default: false },
];

const REMINDER_OPTIONS = ['1 day', '6h', '2h', 'AT DUE'];

/* -------------------- tiny components -------------------- */

function Toggle({ value, onChange, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      activeOpacity={0.7}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={[styles.toggle, value && styles.toggleOn]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={[styles.knob, value && styles.knobOn]} />
    </TouchableOpacity>
  );
}

function ToggleRow({ label, value, onChange, colors, sub }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.row}>
      <View style={styles.rowBody}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      <Toggle value={value} onChange={onChange} colors={colors} />
    </View>
  );
}

function SectionTitle({ label, colors, hint }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.sectionTitleWrap}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function TeacherNotifications({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const initial = useMemo(() => {
    const out = { push: {}, grading: {}, cls: {}, email: {}, sms: {} };
    PUSH_ITEMS.forEach((i) => (out.push[i.key] = i.default));
    GRADING_ITEMS.forEach((i) => (out.grading[i.key] = i.default));
    CLASS_ITEMS.forEach((i) => (out.cls[i.key] = i.default));
    EMAIL_ITEMS.forEach((i) => (out.email[i.key] = i.default));
    SMS_ITEMS.forEach((i) => (out.sms[i.key] = i.default));
    out.reminders = ['1 day'];
    out.quiet = { from: '09:00 PM', to: '06:00 AM' };
    out.digestDay = 'Friday';
    return out;
  }, []);

  const [push, setPush]               = useState(initial.push);
  const [grading, setGrading]         = useState(initial.grading);
  const [cls, setCls]                 = useState(initial.cls);
  const [email, setEmail]             = useState(initial.email);
  const [sms, setSms]                 = useState(initial.sms);
  const [reminders, setReminders]     = useState(initial.reminders);
  const [quiet, setQuiet]             = useState(initial.quiet);
  const [digestDay, setDigestDay]     = useState(initial.digestDay);

  const togglePush    = (k) => setPush((s)    => ({ ...s, [k]: !s[k] }));
  const toggleGrading = (k) => setGrading((s) => ({ ...s, [k]: !s[k] }));
  const toggleClass   = (k) => setCls((s)     => ({ ...s, [k]: !s[k] }));
  const toggleEmail   = (k) => setEmail((s)   => ({ ...s, [k]: !s[k] }));
  const toggleSms     = (k) => setSms((s)     => ({ ...s, [k]: !s[k] }));

  const toggleReminder = (val) =>
    setReminders((cur) =>
      cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val],
    );

  const anyOn = useMemo(() => {
    const anyMap = (m) => Object.values(m).some(Boolean);
    return anyMap(push) || anyMap(grading) || anyMap(cls) || anyMap(email) || anyMap(sms);
  }, [push, grading, cls, email, sms]);

  const onSave = () => {
    // TODO: PATCH /api/teacher/notification-preferences
    Alert.alert('Saved', 'Notification preferences updated.', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <Layout>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.fg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ===== PUSH ===== */}
          <SectionTitle label="PUSH" colors={colors} />
          <View style={styles.listBlock}>
            {PUSH_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                value={push[item.key]}
                onChange={() => togglePush(item.key)}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== GRADING ===== */}
          <SectionTitle
            label="GRADING ALERTS"
            hint="Never miss a submission to grade"
            colors={colors}
          />
          <View style={styles.listBlock}>
            {GRADING_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                value={grading[item.key]}
                onChange={() => toggleGrading(item.key)}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== CLASS ACTIVITY ===== */}
          <SectionTitle label="CLASS ACTIVITY" colors={colors} />
          <View style={styles.listBlock}>
            {CLASS_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                value={cls[item.key]}
                onChange={() => toggleClass(item.key)}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== TIMING ===== */}
          <SectionTitle label="TIMING" colors={colors} />

          <View style={styles.timingBlock}>
            <Text style={styles.timingLabel}>REMIND ME BEFORE GRADING DEADLINES</Text>
            <View style={styles.chipWrap}>
              {REMINDER_OPTIONS.map((opt) => {
                const active = reminders.includes(opt);
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.timingChip, active && styles.timingChipActive]}
                    onPress={() => toggleReminder(opt)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.timingChipText, active && styles.timingChipTextActive]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.timingLabel, { marginTop: 16 }]}>WEEKLY DIGEST DAY</Text>
            <View style={styles.chipWrap}>
              {['Monday', 'Wednesday', 'Friday'].map((d) => {
                const active = digestDay === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.timingChip, active && styles.timingChipActive]}
                    onPress={() => setDigestDay(d)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.timingChipText, active && styles.timingChipTextActive]}>
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.timingLabel, { marginTop: 16 }]}>QUIET HOURS</Text>
            <View style={styles.quietRow}>
              <TextInput
                style={styles.quietInput}
                value={quiet.from}
                onChangeText={(v) => setQuiet((q) => ({ ...q, from: v }))}
                placeholder="09:00 PM"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
              />
              <Text style={styles.quietTo}>TO</Text>
              <TextInput
                style={styles.quietInput}
                value={quiet.to}
                onChangeText={(v) => setQuiet((q) => ({ ...q, to: v }))}
                placeholder="06:00 AM"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.quietHint}>
              Notifications pause during quiet hours. Critical alerts will still come through.
            </Text>
          </View>

          {/* ===== EMAIL ===== */}
          <SectionTitle label="EMAIL" colors={colors} />
          <View style={styles.listBlock}>
            {EMAIL_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                value={email[item.key]}
                onChange={() => toggleEmail(item.key)}
                colors={colors}
              />
            ))}
          </View>

          {/* ===== SMS ===== */}
          <SectionTitle label="SMS" colors={colors} />
          <View style={styles.listBlock}>
            {SMS_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                value={sms[item.key]}
                onChange={() => toggleSms(item.key)}
                colors={colors}
                sub="Charges may apply. Only used for overdue grading alerts."
              />
            ))}
          </View>

          {/* ===== SAVE ===== */}
          <TouchableOpacity style={styles.saveBtn} onPress={onSave} activeOpacity={0.7}>
            <Text style={styles.saveText}>SAVE PREFERENCES</Text>
          </TouchableOpacity>

          {!anyOn && (
            <Text style={styles.warningNote}>
              ⚠ All notifications are off. You won't be alerted about anything.
            </Text>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}