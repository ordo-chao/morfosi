// Language.jsx
import React, { useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const LANGUAGES = [
  { key: 'en', label: 'English',   rtl: false },
  { key: 'sw', label: 'Kiswahili', rtl: false },
  { key: 'fr', label: 'Français',  rtl: false },
  { key: 'ar', label: 'العربية',   rtl: true  },
  { key: 'so', label: 'Somali',    rtl: false },
];

const DATE_FORMATS = [
  { key: 'DMY', label: 'DD/MM/YYYY' },
  { key: 'MDY', label: 'MM/DD/YYYY' },
  { key: 'YMD', label: 'YYYY-MM-DD' },
];

const FIRST_DAY = [
  { key: 'mon', label: 'Monday' },
  { key: 'sun', label: 'Sunday' },
];

const PREFERRED_NAME = [
  { key: 'full',  label: 'Amina Wanjiku', sub: 'Full name' },
  { key: 'first', label: 'Amina',         sub: 'First name' },
];

/* -------------------- helpers -------------------- */

function formatExample(fmt) {
  const d = new Date(2026, 9, 27); // 27 Oct 2026
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  if (fmt === 'MDY') return `${mm}/${dd}/${yyyy}`;
  if (fmt === 'YMD') return `${yyyy}-${mm}-${dd}`;
  return `${dd}/${mm}/${yyyy}`;
}

/* -------------------- small components -------------------- */

function Radio({ selected, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected ? <View style={styles.radioInner} /> : null}
    </View>
  );
}

function RadioRow({ label, sub, selected, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.radioRow}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Radio selected={selected} colors={colors} />
      <View style={styles.radioBody}>
        <Text style={styles.radioLabel}>{label}</Text>
        {sub ? <Text style={styles.radioSub}>{sub}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

function Dropdown({ value, options, onChange, colors }) {
  const styles = makeStyles(colors);
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownText}>
          {current ? current.label : '—'}
        </Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={colors.fgMuted}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownMenu}>
          {options.map((opt) => {
            const active = opt.key === value;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[styles.dropdownItem, active && styles.dropdownItemActive]}
                onPress={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    active && styles.dropdownItemTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
                {active && (
                  <Ionicons name="checkmark" size={14} color={colors.accent} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Language({ navigation, route }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // Language + preferred name apply instantly. Regional block requires Save.
  const [lang, setLang]               = useState(route?.params?.lang ?? 'sw');
  const [dateFormat, setDateFormat]   = useState(route?.params?.dateFormat ?? 'DMY');
  const [timeFormat, setTimeFormat]   = useState(route?.params?.timeFormat ?? '24');
  const [firstDay, setFirstDay]       = useState(route?.params?.firstDay ?? 'mon');
  const [preferred, setPreferred]     = useState(route?.params?.preferred ?? 'first');

  const exampleDate = useMemo(() => formatExample(dateFormat), [dateFormat]);

  /* ---- actions ---- */

  const onLangChange = (key) => {
    setLang(key);
    // Apply immediately — no save needed. Wire this to your i18n context:
    // i18n.changeLanguage(key);
    // Also: if (LANGUAGES.find(l => l.key === key)?.rtl) I18nManager.forceRTL(true);

    const isRTL = LANGUAGES.find((l) => l.key === key)?.rtl;
    if (isRTL) {
      Alert.alert(
        'Restart required',
        'Right-to-left languages require an app restart to apply layout changes. Restart now?',
        [
          { text: 'Later', style: 'cancel' },
          // { text: 'Restart', onPress: () => Updates.reloadAsync() },
        ]
      );
    }
  };

  const onPreferredChange = (key) => {
    setPreferred(key);
    // Persist immediately too — this is an identity preference, not a regional one.
    // updateProfile({ preferredName: key });
  };

  const onSave = () => {
    const payload = {
      lang,
      dateFormat,
      timeFormat,
      firstDay,
      preferred,
    };
    // TODO: persist
    Alert.alert('Saved', 'Regional format and preferences updated.', [
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
        <Text style={styles.headerTitle}>LANGUAGE</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== APP LANGUAGE ===== */}
        <Text style={styles.sectionTitle}>APP LANGUAGE</Text>
        <View style={styles.listBlock}>
          {LANGUAGES.map((l) => (
            <RadioRow
              key={l.key}
              label={l.label}
              selected={lang === l.key}
              onPress={() => onLangChange(l.key)}
              colors={colors}
            />
          ))}
        </View>
        <Text style={styles.hintText}>
          Changes apply instantly across the app.
        </Text>

        {/* ===== REGIONAL FORMAT ===== */}
        <Text style={styles.sectionTitle}>REGIONAL FORMAT</Text>

        <View style={styles.formatBlock}>
          {/* Date format */}
          <View style={styles.formatField}>
            <Text style={styles.formatLabel}>DATE FORMAT</Text>
            <Dropdown
              value={dateFormat}
              options={DATE_FORMATS}
              onChange={setDateFormat}
              colors={colors}
            />
            <Text style={styles.formatHint}>Example: {exampleDate}</Text>
          </View>

          <View style={styles.divider} />

          {/* Time format */}
          <View style={styles.formatField}>
            <Text style={styles.formatLabel}>TIME FORMAT</Text>
            <RadioRow
              label="12-hour (4:30 PM)"
              selected={timeFormat === '12'}
              onPress={() => setTimeFormat('12')}
              colors={colors}
            />
            <RadioRow
              label="24-hour (16:30)"
              selected={timeFormat === '24'}
              onPress={() => setTimeFormat('24')}
              colors={colors}
            />
          </View>

          <View style={styles.divider} />

          {/* First day of week */}
          <View style={styles.formatField}>
            <Text style={styles.formatLabel}>FIRST DAY OF WEEK</Text>
            <Dropdown
              value={firstDay}
              options={FIRST_DAY}
              onChange={setFirstDay}
              colors={colors}
            />
          </View>
        </View>

        {/* ===== PREFERRED NAME ===== */}
        <Text style={styles.sectionTitle}>PREFERRED NAME IN ANNOUNCEMENTS</Text>
        <Text style={styles.hintText}>
          Schools may address you formally or informally.
        </Text>

        <View style={styles.listBlock}>
          {PREFERRED_NAME.map((p) => (
            <RadioRow
              key={p.key}
              label={p.label}
              sub={p.sub}
              selected={preferred === p.key}
              onPress={() => onPreferredChange(p.key)}
              colors={colors}
            />
          ))}
        </View>

        {/* ===== SAVE ===== */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={onSave}
          activeOpacity={0.7}
        >
          <Text style={styles.saveText}>SAVE REGIONAL PREFERENCES</Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          Language and preferred name are saved automatically. Regional format needs a Save tap.
        </Text>
      </ScrollView>
    </View>
    </Layout>
  );
}