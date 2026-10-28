// Theme.jsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, AccessibilityInfo,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const THEME_OPTIONS = [
  { key: 'light',  label: 'Light',  swatch: ['#ffffff', '#e8e8e8'] },
  { key: 'dark',   label: 'Dark',   swatch: ['#0a0a0a', '#2a2a2a'] },
  { key: 'system', label: 'System', swatch: ['#ffffff', '#0a0a0a'] },
];

const TEXT_SIZES = [14, 16, 18, 20, 22];
const TEXT_LABELS = ['SMALL', 'COMPACT', 'DEFAULT', 'LARGE', 'XL'];
const DEFAULT_STEP = 2;

const STORAGE_KEYS = {
  themeMode: 'pref.themeMode',
  textSize:  'pref.textSizeIndex',
  contrast:  'pref.highContrast',
  bold:      'pref.boldText',
  motion:    'pref.reduceMotion',
};

/* -------------------- small components -------------------- */

function ThemeSwatch({ option, selected, onPress, colors, resolvedLabel }) {
  const styles = makeStyles(colors);
  const isSystem = option.key === 'system';

  return (
    <TouchableOpacity
      style={[styles.swatchWrap, selected && styles.swatchWrapSelected]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={
        isSystem && resolvedLabel
          ? `${option.label}, currently ${resolvedLabel}`
          : option.label
      }
    >
      <View style={styles.swatchPreview}>
        <View style={[styles.swatchTop, { backgroundColor: option.swatch[0] }]} />
        <View style={[styles.swatchBottom, { backgroundColor: option.swatch[1] }]} />
      </View>
      <Text style={[styles.swatchLabel, selected && styles.swatchLabelSelected]}>
        {option.label}
      </Text>
      <View style={[styles.swatchRadio, selected && styles.swatchRadioSelected]}>
        {selected ? <View style={styles.swatchRadioDot} /> : null}
      </View>
    </TouchableOpacity>
  );
}

function TextSizeSlider({ valueIndex, onChange, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={styles.sliderWrap}>
      <View style={styles.sliderTrack}>
        <View
          style={[
            styles.sliderFill,
            { width: `${(valueIndex / (TEXT_SIZES.length - 1)) * 100}%` },
          ]}
        />
        {TEXT_SIZES.map((size, i) => {
          const active = i <= valueIndex;
          const isCurrent = i === valueIndex;
          return (
            <TouchableOpacity
              key={size}
              onPress={() => onChange(i)}
              style={[
                styles.sliderStep,
                { left: `${(i / (TEXT_SIZES.length - 1)) * 100}%` },
              ]}
              hitSlop={10}
              accessibilityRole="adjustable"
              accessibilityValue={{ min: 0, max: TEXT_SIZES.length - 1, now: valueIndex }}
            >
              <View
                style={[
                  styles.sliderDot,
                  active && styles.sliderDotActive,
                  isCurrent && styles.sliderDotCurrent,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabelSmall}>A</Text>
        <Text style={styles.sliderLabelCurrent}>
          {TEXT_LABELS[valueIndex]} · {TEXT_SIZES[valueIndex]}PT
        </Text>
        <Text style={styles.sliderLabelLarge}>A</Text>
      </View>
    </View>
  );
}

function ToggleRow({ label, sub, value, onChange, disabled, colors }) {
  const styles = makeStyles(colors);
  return (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.rowBody}>
        <Text style={[styles.rowLabel, disabled && styles.rowLabelDisabled]}>
          {label}
        </Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      <TouchableOpacity
        onPress={() => !disabled && onChange(!value)}
        activeOpacity={0.7}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        style={[styles.toggle, value && styles.toggleOn]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={[styles.knob, value && styles.knobOn]} />
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen -------------------- */

export default function Theme({ navigation }) {
  const { colors, mode, resolvedMode, isDark, setMode } = useTheme();
  const styles = makeStyles(colors);

  const [textIndex, setTextIndex]       = useState(DEFAULT_STEP);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [boldText, setBoldText]         = useState(false);

  const [osReduceMotion, setOsReduceMotion] = useState(false);
  const [osBoldText, setOsBoldText]         = useState(false);

  /* ---- Hydrate from storage (mode is the important one) ---- */
  useEffect(() => {
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([
          STORAGE_KEYS.themeMode,
          STORAGE_KEYS.textSize,
          STORAGE_KEYS.contrast,
          STORAGE_KEYS.bold,
          STORAGE_KEYS.motion,
        ]);
        const map = Object.fromEntries(entries);
        if (map[STORAGE_KEYS.themeMode]) setMode(map[STORAGE_KEYS.themeMode]);
        if (map[STORAGE_KEYS.textSize])  setTextIndex(Number(map[STORAGE_KEYS.textSize]));
        if (map[STORAGE_KEYS.contrast])  setHighContrast(map[STORAGE_KEYS.contrast] === '1');
        if (map[STORAGE_KEYS.bold])      setBoldText(map[STORAGE_KEYS.bold] === '1');
        if (map[STORAGE_KEYS.motion])    setReduceMotion(map[STORAGE_KEYS.motion] === '1');
      } catch {}
    })();
  }, [setMode]);

  /* ---- OS accessibility hooks ---- */
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setOsReduceMotion);
    const motionSub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setOsReduceMotion
    );
    AccessibilityInfo.isBoldTextEnabled?.()
      .then((v) => setOsBoldText(!!v))
      .catch(() => {});
    return () => motionSub?.remove?.();
  }, []);

  const effectiveReduceMotion = reduceMotion || osReduceMotion;
  const previewSize = TEXT_SIZES[textIndex];

  /* ---- Change handlers: mutate + persist ---- */
  const onModeChange = useCallback(
    (next) => {
      setMode(next);
      AsyncStorage.setItem(STORAGE_KEYS.themeMode, next).catch(() => {});
      // Optional: sync to server for cross-device persistence
      // api.patch('/me/preferences', { themeMode: next }).catch(() => {});
    },
    [setMode]
  );

  const onTextSizeChange = useCallback((i) => {
    setTextIndex(i);
    AsyncStorage.setItem(STORAGE_KEYS.textSize, String(i)).catch(() => {});
  }, []);

  const onToggle = useCallback((key, storageKey, setter) => (v) => {
    setter(v);
    AsyncStorage.setItem(storageKey, v ? '1' : '0').catch(() => {});
  }, []);

  /* ---- Hint line: describe resolved state ---- */
  const resolvedLabel = resolvedMode === 'dark' ? 'Dark' : 'Light';
  const hint =
    mode === 'system'
      ? `Following your device appearance — currently ${resolvedLabel}.`
      : `${mode === 'light' ? 'Light' : 'Dark'} theme applied across the app.`;

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>APPEARANCE</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== THEME ===== */}
        <Text style={styles.sectionTitle}>THEME</Text>
        <View
          style={styles.swatchesRow}
          accessibilityRole="radiogroup"
          accessibilityLabel="App theme"
        >
          {THEME_OPTIONS.map((opt) => (
            <ThemeSwatch
              key={opt.key}
              option={opt}
              selected={mode === opt.key}
              onPress={() => onModeChange(opt.key)}
              colors={colors}
              resolvedLabel={resolvedLabel}
            />
          ))}
        </View>
        <Text style={styles.hintText}>{hint}</Text>

        {/* ===== DISPLAY ===== */}
        <Text style={styles.sectionTitle}>DISPLAY</Text>

        <View style={styles.block}>
          <Text style={styles.blockLabel}>TEXT SIZE</Text>
          <TextSizeSlider
            valueIndex={textIndex}
            onChange={onTextSizeChange}
            colors={colors}
          />
        </View>

        <Text style={styles.previewLabel}>PREVIEW</Text>
        <View style={styles.previewCard}>
          <Text style={[styles.previewTitle, { fontSize: previewSize }]}>
            Math Worksheet
          </Text>
          <Text style={[styles.previewMeta, { fontSize: previewSize - 3 }]}>
            Due today at 4:30 PM
          </Text>
        </View>

        {/* ===== ACCESSIBILITY ===== */}
        <Text style={styles.sectionTitle}>ACCESSIBILITY</Text>

        <View style={styles.listBlock}>
          <ToggleRow
            label="Reduce motion"
            sub={osReduceMotion ? 'OS setting is on — always honoured' : 'Minimise animations'}
            value={effectiveReduceMotion}
            onChange={onToggle('motion', STORAGE_KEYS.motion, setReduceMotion)}
            disabled={osReduceMotion}
            colors={colors}
          />
          <ToggleRow
            label="High contrast"
            sub="Stronger borders and text"
            value={highContrast}
            onChange={onToggle('contrast', STORAGE_KEYS.contrast, setHighContrast)}
            colors={colors}
          />
          <ToggleRow
            label="Bold text"
            sub={osBoldText ? 'OS setting is on' : 'Heavier font weight'}
            value={boldText}
            onChange={onToggle('bold', STORAGE_KEYS.bold, setBoldText)}
            colors={colors}
          />
        </View>

        <Text style={styles.footnote}>
          Appearance changes are saved automatically.
        </Text>
      </ScrollView>
    </View>
    </Layout>
  );
}