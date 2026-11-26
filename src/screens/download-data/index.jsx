// DownloadData.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { makeStyles } from './css.js';
import { useTheme } from '../../theme/themeContext.jsx';
import Layout from '../../layout.jsx';

import Ionicons from 'react-native-vector-icons/Ionicons';

/* -------------------- config -------------------- */

const USER = {
  email: 'amina.w@school.ac.ke',
};

const INCLUDED = [
  'Profile and account details',
  'Academic records (grades, attendance)',
  'Assignment submissions and feedback',
  'Announcements you received',
  'Learning materials you accessed',
  'Login and activity history',
];

const FORMATS = [
  { key: 'pdf',   label: 'PDF',  sub: 'human-readable' },
  { key: 'json',  label: 'JSON', sub: 'machine-readable' },
  { key: 'both',  label: 'Both', sub: null },
];

// Recent requests (from server). Status: 'ready' | 'processing' | 'failed' | 'expired'
const RECENT = [
  { id: 'r1', date: '24 Oct 2026', format: 'PDF',  status: 'ready',      expires: '31 Oct 2026' },
  { id: 'r2', date: '12 Sep 2026', format: 'JSON', status: 'expired' },
];

/* -------------------- tiny components -------------------- */

function FormatOption({ option, selected, onPress, colors }) {
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      style={styles.formatRow}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${option.label}${option.sub ? ', ' + option.sub : ''}`}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={styles.formatLabel}>{option.label}</Text>
      {option.sub ? <Text style={styles.formatSub}>({option.sub})</Text> : null}
    </TouchableOpacity>
  );
}

function RequestRow({ item, colors, onOpen }) {
  const styles = makeStyles(colors);
  const isReady = item.status === 'ready';
  const isExpired = item.status === 'expired';

  return (
    <TouchableOpacity
      style={styles.requestRow}
      onPress={() => isReady && onOpen(item)}
      activeOpacity={isReady ? 0.7 : 1}
      disabled={!isReady}
    >
      <View style={styles.requestBody}>
        <Text style={styles.requestDate}>{item.date}</Text>
        <Text style={styles.requestMeta}>
          {item.format}
          {item.status === 'ready' ? ` · expires ${item.expires}` : ''}
        </Text>
      </View>
      {isReady ? (
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => onOpen(item)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Download ${item.format} from ${item.date}`}
        >
          <Ionicons name="download-outline" size={14} color={colors.accent} />
          <Text style={styles.downloadText}>DOWNLOAD</Text>
        </TouchableOpacity>
      ) : isExpired ? (
        <Text style={styles.statusExpired}>EXPIRED</Text>
      ) : (
        <Text style={styles.statusProcessing}>PROCESSING</Text>
      )}
    </TouchableOpacity>
  );
}

/* -------------------- screens -------------------- */

function RequestView({ format, setFormat, onRequest, colors, recent }) {
  const styles = makeStyles(colors);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.intro}>
        You can download a copy of the data we hold about you. This includes:
      </Text>

      <View style={styles.includedBlock}>
        {INCLUDED.map((line, i) => (
          <View key={i} style={styles.includedRow}>
            <Ionicons name="checkmark" size={14} color={colors.accent} />
            <Text style={styles.includedText}>{line}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>FORMAT</Text>
      <View style={styles.formatBlock}>
        {FORMATS.map((option) => (
          <FormatOption
            key={option.key}
            option={option}
            selected={format === option.key}
            onPress={() => setFormat(option.key)}
            colors={colors}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>DELIVERY</Text>
      <View style={styles.deliveryBlock}>
        <Text style={styles.deliveryText}>
          We'll email a download link to:
        </Text>
        <Text style={styles.deliveryEmail}>{USER.email}</Text>
        <Text style={styles.deliveryHint}>The link expires in 7 days.</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={onRequest}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryBtnText}>REQUEST MY DATA</Text>
      </TouchableOpacity>

      {recent.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>RECENT REQUESTS</Text>
          <View style={styles.listBlock}>
            {recent.map((item) => (
              <RequestRow
                key={item.id}
                item={item}
                colors={colors}
                onOpen={() => Alert.alert('Download', `Opening ${item.format} export…`)}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

function ProgressView({ startedAt, email, onCancel, colors }) {
  const styles = makeStyles(colors);
  const elapsed = useMemo(() => {
    const mins = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
    return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  }, [startedAt]);

  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressIcon}>
        <Ionicons name="hourglass-outline" size={32} color={colors.accent} />
      </View>

      <Text style={styles.progressTitle}>Preparing your data</Text>
      <Text style={styles.progressBody}>
        We're gathering your records. This usually takes a few minutes.
      </Text>
      <Text style={styles.progressBody}>
        We'll email you at{' '}
        <Text style={styles.progressEmail}>{email}</Text> when it's ready.
      </Text>

      <Text style={styles.progressStarted}>Started {elapsed}</Text>

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={onCancel}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelBtnText}>CANCEL REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- screen shell -------------------- */

export default function DownloadData({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [format, setFormat] = useState('pdf');
  const [phase, setPhase] = useState('request'); // 'request' | 'progress' | 'done'
  const [startedAt, setStartedAt] = useState(null);
  const [recent, setRecent] = useState(RECENT);

  /* ---- simulate "request → in progress → ready" ---- */
  useEffect(() => {
    if (phase !== 'progress' || !startedAt) return;
    const t = setTimeout(() => {
      // In production, poll GET /me/data-exports/:id for status
      const id = `r${Date.now()}`;
      setRecent((list) => [
        {
          id,
          date: new Date().toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
          }),
          format: format === 'both' ? 'PDF + JSON' : format.toUpperCase(),
          status: 'ready',
          expires: new Date(Date.now() + 7 * 864e5).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
          }),
        },
        ...list,
      ]);
      setPhase('done');
    }, 6000); // 6 seconds feels "few minutes" without being painful in demo

    return () => clearTimeout(t);
  }, [phase, startedAt, format]);

  const onRequest = useCallback(() => {
    setStartedAt(Date.now());
    setPhase('progress');
  }, []);

  const onCancel = useCallback(() => {
    Alert.alert(
      'Cancel request?',
      'We will stop preparing your data. You can request again any time.',
      [
        { text: 'Keep waiting', style: 'cancel' },
        { text: 'Cancel', style: 'destructive', onPress: () => {
          setPhase('request');
          setStartedAt(null);
        } },
      ]
    );
  }, []);

  return (
    <Layout>
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.fg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DOWNLOAD MY DATA</Text>
        <View style={{ width: 22 }} />
      </View>

      {phase === 'progress' ? (
        <ProgressView
          startedAt={startedAt}
          email={USER.email}
          onCancel={onCancel}
          colors={colors}
        />
      ) : (
        <RequestView
          format={format}
          setFormat={setFormat}
          onRequest={onRequest}
          colors={colors}
          recent={recent}
        />
      )}
    </View>
    </Layout>
  );
}